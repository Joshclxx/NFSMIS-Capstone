import { getAccounts, insertAccount } from "@/database/queries/accountQueries"
import { fetchSession } from "@/lib/auth";
import { insertAddress, insertEmergencyContact, insertUser } from "@/database/queries/userQueries";
import { db } from "../../configs/pgConn";
import { CreateAccount } from "@/lib/zod/schema/accountSchema";
import { assignRole, insertFieldValues } from "@/database/queries/roleQueries";

export const fetchAccounts = async (limit: number = 20, offset: number = 0) => {
    const userId = await fetchSession();

    try {
        if (!userId) {
          throw Error("unauthenticated");
        }
        const accounts = await getAccounts(limit, offset);
        if (!accounts) {
            throw new Error("notFound");
        }

        return accounts
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const createAccount = async (dataDefs: CreateAccount) => {
  const createdBy = await fetchSession();
  if (!createdBy) throw new Error("unauthenticated");

  const { role, roleFieldValues, personalInfo, addressInfo, emergencyContact } =
    dataDefs;
  const { email, ...personalInfoWithoutEmail } = personalInfo;
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const userId = await insertUser(
      client,
      personalInfoWithoutEmail,
      createdBy
    );

    // FIX: Throw error if insert fails, do not manually rollback here
    const insertAccountResult = await insertAccount(
      client,
      userId,
      email,
      createdBy
    );
    
    if (!insertAccountResult) throw new Error("Failed to insert Account");

    const assignRoleResult = await assignRole(client, role, userId, createdBy);
    if (!assignRoleResult) throw new Error("Failed to assign Role");

    // Assuming this creates custom fields
    await insertFieldValues(client, userId, roleFieldValues);

    const insertAddressResult = await insertAddress(
      client,
      userId,
      addressInfo
    );
    if (!insertAddressResult) throw new Error("Failed to insert Address");

    const insertEContactResult = await insertEmergencyContact(
      client,
      userId,
      emergencyContact
    );
    if (!insertEContactResult)
      throw new Error("Failed to insert Emergency Contact");

    await client.query("COMMIT");
    return true;
  } catch (err) {
    console.error("Transaction failed, rolling back:", err);
    // The catch block handles the rollback for ALL failures above
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};