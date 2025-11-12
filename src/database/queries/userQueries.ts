import { db } from "@/lib/pgConn";
import { USER_PREPARED_STATEMENTS } from "../prepared_statements/userStatements";
import { localCache } from "@/lib/localcache";

export const getUserByEmail = async <T>(email: T) => {
    if (typeof email !== "string") return null
  let user = localCache.get(email);
  try {
    if (!user) {
      const { rows } = await db.query(USER_PREPARED_STATEMENTS.getUserByEmail, [
        email,
      ]);
      user = rows[0];

      if (!user) return null;
      localCache.set('Test', email);
      return user;
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};
