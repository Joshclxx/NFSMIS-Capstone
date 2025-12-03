import { db } from "../../../configs/pgConn";
import { USER_PREPARED_STATEMENTS } from "../prepared_statements/userStatements";
import { localCache } from "@/lib/localcache";
import { EmergencyContactDTO } from "@/lib/zod/schema/accountSchema";
import { AddressDTO, CreateUser } from "@/lib/zod/schema/userSchema";
import { UserRecord, userRecordSchema } from "@/lib/zod/schema/userSchema";
import { PoolClient } from "pg";

export const getUserByEmail = async (
  email: string
): Promise<UserRecord | null> => {
  let user = localCache.get(email) as UserRecord | null;
  try {
    if (!user) {
      const { rows } = await db.query(USER_PREPARED_STATEMENTS.getUserByEmail, [
        email,
      ]);
      user = userRecordSchema.parse(rows[0]);

      if (!user) return null;
      localCache.set(email, user);
      return user;
    }
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const insertUser = async (
  client: PoolClient,
  personalData: CreateUser,
  createdBy: string

) => {
  const {
    firstName,
    lastName,
    middleName,
    suffix,
    dob,
    contactNo,
    sex,
  } = personalData;

  const result = await client.query(USER_PREPARED_STATEMENTS.createUser, [
    firstName,
    lastName,
    middleName,
    suffix,
    dob,
    contactNo,
    sex,
    createdBy,
  ]);

  return result.rows[0].id;
};

export const insertAddress = async (
  client: PoolClient,
  userId: string,
  address: AddressDTO
) => {
  try {
    const result = await client.query(USER_PREPARED_STATEMENTS.createAddress, [
      userId,
      address.unitNo,
      address.houseNo,
      address.building,
      address.street,
      address.barangay,
      address.city,
      address.region,
    ]);
    if (result.rowCount === 0) return null

    return result.rows[0].id
  } catch (err) {
    throw err;
  }
};


export const insertEmergencyContact = async (client: PoolClient, userId: string, eContact: EmergencyContactDTO) => {
    try {
      const result = await client.query(
        USER_PREPARED_STATEMENTS.createEmergencyContact,
        [
          userId,
          eContact.firstName,
          eContact.lastName,
          eContact.contactNo,
          eContact.relationship,
        ]
      );
      if (result.rowCount === 0) return null;

      return result.rows[0].id;
    } catch (err) {
      console.log(err);
      throw err;
    }
}