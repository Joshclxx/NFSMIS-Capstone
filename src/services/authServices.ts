import { getUserByEmail } from "@/database/queries/userQueries";
import { LoginDTO, loginSchema } from "@/lib/schema/authSchema";
import { setSessionCookie } from "@/utils/authUtils";
import { isWithinSlidingWindowLog } from "@/utils/cacheUtils";
import bcrypt from "bcrypt";

const RATE_LIMIT = {
  SWL_GLOBAL_WINDOW: 60,
  SWL_WINDOW: 60,
  SWL_GLOBAL_LIMIT: 100,
  SWL_IP_LIMIT: 20,
  SWL_DEVICE_LIMIT: 10,
  SWL_EMAIL_LIMIT: 10,
} as const;

export const login = async (loginData: LoginDTO) => {
  const { email, password, ip, deviceHash, contentType } = loginData;
  //keys
  const globalKey = `swl:auth:login:global`;
  const ipKey = `swl:auth:login:ip:${ip}`;
  const deviceKey = `swl:auth:login:device:${deviceHash}`;
  const emailKey = `swl:auth:login:email:${email}`;

  try {
    //check if the global, ip, or device exceed the limit
    if (
      !isWithinSlidingWindowLog(
        globalKey,
        RATE_LIMIT.SWL_GLOBAL_WINDOW,
        RATE_LIMIT.SWL_GLOBAL_LIMIT
      ) ||
      !isWithinSlidingWindowLog(
        ipKey,
        RATE_LIMIT.SWL_WINDOW,
        RATE_LIMIT.SWL_IP_LIMIT
      ) ||
      !isWithinSlidingWindowLog(
        deviceKey,
        RATE_LIMIT.SWL_WINDOW,
        RATE_LIMIT.SWL_DEVICE_LIMIT
      )
    ) {
      throw new Error("rateLimit");
    }

    //type check for variables
    const { success } = loginSchema.safeParse({
      email,
      password,
      ip,
      deviceHash,
      contentType,
    });

    if (!success) {
      throw new Error("badRequest");
    }

    if (contentType !== "application/json") {
      throw new Error("unsupportedMediaType");
    }

    //find user by email and validate if its already exceed the limit
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error("invalidCredentials");
    }

    if (
      !isWithinSlidingWindowLog(
        emailKey,
        RATE_LIMIT.SWL_EMAIL_LIMIT,
        RATE_LIMIT.SWL_WINDOW
      )
    ) {
      throw new Error("rateLimit");
    }

    //compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordMatch) {
      throw new Error("invalidCredentials");
    }

    //set session cookie
    await setSessionCookie(user.userId);
    const {passwordHash, ...safeUserData} = user;

    return safeUserData;
  } catch (err) {
    throw err
  }
};
