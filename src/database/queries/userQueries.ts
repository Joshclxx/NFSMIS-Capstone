import { db } from "../../../configs/pgConn";
import { USER_PREPARED_STATEMENTS } from "../prepared_statements/userStatements";
import { localCache } from "@/lib/localcache";
import { UserDTO } from "@/lib/schema/userSchema";

export const getUserByEmail = async (
  email: string
): Promise<UserDTO | null> => {
  let user = localCache.get(email) as UserDTO | null;
  try {
    if (!user) {
      const { rows } = await db.query(USER_PREPARED_STATEMENTS.getUserByEmail, [
        email,
      ]);
      user = rows[0];

      if (!user) return null;
      localCache.set(email, user);
      return user;
    }
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
