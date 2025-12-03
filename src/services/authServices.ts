import { getUserByEmail } from "@/database/queries/userQueries";
import { loginSchema } from "@/lib/zod/schema/authSchema";
import {
  getClientIp,
  hashClientDevice,
  setSessionCookie,
} from "@/utils/authUtils";
import { checkLoginRateLimits } from "@/lib/redis/rateLimits";
import bcrypt from "bcryptjs";
import { insertSession } from "@/database/queries/sessionQueries";
import { NextRequest } from "next/server";

const RATE_LIMIT = {
  SWL_GLOBAL_WINDOW: 60,
  SWL_WINDOW: 60,
  SWL_GLOBAL_LIMIT: 100,
  SWL_IP_LIMIT: 20,
  SWL_DEVICE_LIMIT: 10,
  SWL_EMAIL_LIMIT: 10,
} as const;

export const login = async (req: NextRequest) => {
  //user credentials
  const ip = getClientIp(req);
  const deviceHash = hashClientDevice(req);
  const loginData = await req.json();

  //key defs
  const globalKey = `auth:read:global`;
  const ipKey = `auth:read:ip:${ip}`;
  const deviceKey = `auth:read:device:${deviceHash}`;

  //check if the global, ip, or device exceed the limit
  await checkLoginRateLimits(
    deviceKey,
    ipKey,
    null,
    globalKey,
    RATE_LIMIT
  )

  //input validation
  const contentType = req.headers.get("content-type") || "";
  if (contentType !== "application/json") {
    throw new Error("unsupportedMediaType");
  }

  const { success } = loginSchema.safeParse(loginData);
  if (!success) {
    console.log(success)
    throw new Error("badRequest");
  }

  //find user by email
  const user = await getUserByEmail(loginData.email);
  if (!user) {
    throw new Error("invalidCredentials");
  }

  //check email rate limits
  const emailKey = `auth:read:email:${loginData.email}`;
  await checkLoginRateLimits(null, null, emailKey, null, RATE_LIMIT);

  //compare passwords
  const isPasswordMatch = await bcrypt.compare(
    loginData.password,
    user.passwordHash
  );
  if (!isPasswordMatch) {
    throw new Error("invalidCredentials");
  }

  //set session cookie
  await setSessionCookie(
    await insertSession(ip, deviceHash, user.userId, deviceKey)
  );
  const { passwordHash, ...safeUserData } = user;

  return safeUserData;
};
