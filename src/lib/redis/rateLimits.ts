import { redis } from "../../../configs/redisConn";

export const checkLoginRateLimits = async (
  deviceKey: string | null,
  ipKey: string | null,
  emailKey: string | null,
  globalKey: string | null,
  RATE_LIMIT: {
    SWL_GLOBAL_WINDOW: number;
    SWL_WINDOW: number;
    SWL_GLOBAL_LIMIT: number;
    SWL_IP_LIMIT: number;
    SWL_DEVICE_LIMIT: number;
    SWL_EMAIL_LIMIT: number;
  }
) => {
  const luaScript = `
    local function check_limit(key, window, limit, now, uniqueValue)
      if key == "" or key == nil then return true end 

      redis.call("ZREMRANGEBYSCORE", key, 0, now - window)

      local count = redis.call("ZCARD", key)
      if count >= limit then return false end

      redis.call("ZADD", key, now, uniqueValue)
      redis.call("EXPIRE", key, window)

      return true
    end

    local now = tonumber(ARGV[7])
    local uniqueValue = ARGV[8]

    if not check_limit(KEYS[1], tonumber(ARGV[1]), tonumber(ARGV[5]), now, uniqueValue) then
      return "device"
    end

    if not check_limit(KEYS[2], tonumber(ARGV[1]), tonumber(ARGV[4]), now, uniqueValue) then
      return "ip"
    end

    if not check_limit(KEYS[4], tonumber(ARGV[2]), tonumber(ARGV[3]), now, uniqueValue) then
      return "global"
    end

    if not check_limit(KEYS[3], tonumber(ARGV[1]), tonumber(ARGV[6]), now, uniqueValue) then
      return "email"
    end

    return "ok"
  `;

  const now = Math.floor(Date.now() / 1000);
  const uniqueValue = `${now}-${Math.random()}`;

  try {
    const result = await redis.eval(
      luaScript,
      [
        deviceKey || "", // KEYS[1]
        ipKey || "", // KEYS[2]
        emailKey || "", // KEYS[3]
        globalKey || "",
      ], // KEYS[4]
      [
        RATE_LIMIT.SWL_WINDOW.toString(), // ARGV[1]
        RATE_LIMIT.SWL_GLOBAL_WINDOW.toString(), // ARGV[2]
        RATE_LIMIT.SWL_GLOBAL_LIMIT.toString(), // ARGV[3]
        RATE_LIMIT.SWL_IP_LIMIT.toString(), // ARGV[4]
        RATE_LIMIT.SWL_DEVICE_LIMIT.toString(), // ARGV[5]
        RATE_LIMIT.SWL_EMAIL_LIMIT.toString(), // ARGV[6]
        now.toString(), // ARGV[7]
        uniqueValue, // ARGV[8]
      ]
    );

    if (result === "ok") return true;
    throw new Error(`rateLimit`);
  } catch (err) {
    console.error("Rate limit check failed:", err);
    return false;
  }
};
