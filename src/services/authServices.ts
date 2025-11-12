import { getUserByEmail } from "@/database/queries/userQueries";
import { isValidEmail, isValidPassword } from "@/utils/authUtils";
import { isWithinSlidingWindowLog } from "@/utils/cacheUtils";

const RATE_LIMIT = {
  SWL_GLOBAL_WINDOW: 60,
  SWL_WINDOW: 60,
  SWL_GLOBAL_LIMIT: 100,
  SWL_IP_LIMIT: 20,
  SWL_DEVICE_LIMIT: 10,
  SWL_EMAIL_LIMIT: 10,
} as const;

export const login = async <T>(
  email: T,
  password: T,
  ip: string | undefined,
  deviceHash: string,
  contentType: string
) => {
  //keys
  const globalKey = `swl:auth:login:global`;
  const ipKey = `swl:auth:login:ip:${ip}`;
  const deviceKey = `swl:auth:login:device:${deviceHash}`;
  const emailKey = `swl:auth:login:email:${email}`;

  try {
    if (
      !isWithinSlidingWindowLog(
        globalKey,
        RATE_LIMIT.SWL_GLOBAL_WINDOW,
        RATE_LIMIT.SWL_GLOBAL_LIMIT
      )
    ) {
      throw new Error("Rate limit");
    }

    if (
      !isWithinSlidingWindowLog(
        ipKey,
        RATE_LIMIT.SWL_WINDOW,
        RATE_LIMIT.SWL_IP_LIMIT
      )
    ) {
      throw new Error("Rate limit");
    }

    if (
      !isWithinSlidingWindowLog(
        deviceKey,
        RATE_LIMIT.SWL_WINDOW,
        RATE_LIMIT.SWL_DEVICE_LIMIT
      )
    ) {
      throw new Error("Rate limit");
    }

    if (contentType !== "application/json") {
      throw new Error("Invalid content type")
    }

    if (!isValidPassword(password) || !isValidEmail(email)) {
      throw new Error("Invalid password")
    }

    const user = await getUserByEmail(email)
    if(!isWithinSlidingWindowLog(emailKey, RATE_LIMIT.SWL_EMAIL_LIMIT, RATE_LIMIT.SWL_WINDOW)) {
      throw new Error("Rate limit")
    }

    if(!user) {
      throw new Error("Not found")
    }

    
    return user;
  } catch (err) {
    console.log(err)
    throw new Error("Try");
  }
};
