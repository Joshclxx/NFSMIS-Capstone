// import { redis } from "@/lib/redisConn";
// import { logger } from "@/lib/logger";

// export async function isWithinSlidingWindowLog(
//   key: string,
//   ttlSeconds: number,
//   limit: number
// ): Promise<boolean> {
//   const now = Date.now();
//   const MS = 1000;
//   const windowStart = now - ttlSeconds * MS;

//   const luaScript = `
//       local key = KEYS[1]
//       local windowStart = tonumber(ARGV[1])
//       local limit = tonumber(ARGV[2])
//       local now = tonumber(ARGV[3])
//       local ttlSeconds = tonumber(ARGV[4])
//       local uniqueValue = ARGV[5]

//       -- remove old requests outside window
//       redis.call("ZREMRANGEBYSCORE", key, 0, windowStart)

//       -- count requests in window
//       local currentCount = redis.call("ZCOUNT", key, now, windowStart)
//       if ( currentCount > limit ) then
//         return 0
//       end

//       -- add current request
//       redis.call("ZADD", key, now, uniqueValue)

//       -- set expiration
//       redis.call("PEXPIRE", key, ttlSeconds)

//       return 1
//     `;
//   try {
//     const uniqueValue = `${now}-${Math.random()}`;

//     const result = await redis.eval(
//       luaScript,
//       [key],
//       [
//         windowStart.toString(),
//         limit.toString(),
//         now.toString(),
//         (ttlSeconds * MS).toString(),
//         uniqueValue,
//       ]
//     );

//     return result === 1;
//   } catch (err) {
//     logger.error("Rate limit check is failed due to error:", err);
//     return false;
//   }
// }