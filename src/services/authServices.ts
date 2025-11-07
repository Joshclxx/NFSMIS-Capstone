import { isWithinSlidingWindowLog } from "@/utils/cacheUtils";

const RATE_LIMIT = {
  SWL_GLOBAL_WINDOW: 60,
  SWL_WINDOW: 60,
  SWL_GLOBAL_LIMIT: 100,
  SWL_IP_LIMIT: 20,
  SWL_DEVICE_LIMIT: 10,
  SWL_EMAIL_LIMIT: 10,
} as const;

export const login = async (
  email: string,
  password: string,
  ip: string,
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
      throw new Error("Try");
    }

    if (
      !isWithinSlidingWindowLog(
        ipKey,
        RATE_LIMIT.SWL_WINDOW,
        RATE_LIMIT.SWL_IP_LIMIT
      )
    ) {
      throw new Error("Try");
    }

    if (
      !isWithinSlidingWindowLog(
        deviceKey,
        RATE_LIMIT.SWL_WINDOW,
        RATE_LIMIT.SWL_DEVICE_LIMIT
      )
    ) {
      throw new Error("Try");
    }

    if (email !== "admin" || password !== "admin") {
        throw new Error("Try");
    }
    return "login"
  } catch (err) {
    throw new Error("Try");
  }
};
