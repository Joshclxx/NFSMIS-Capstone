import { db } from "../../../configs/pgConn";
import { USER_PREPARED_STATEMENTS } from "../prepared_statements/userStatements";
import { EmergencyContactDTO } from "@/lib/zod/schema/accountSchema";
import { AddressDTO, CreateUser } from "@/lib/zod/schema/userSchema";
import { userRecordSchema, UserRecord } from "@/lib/zod/schema/userSchema";
import { PoolClient } from "pg";
import { redis } from "../../../configs/redisConn";

const ttlSeconds = 3600; //1hr
export const getUserByEmail = async (
  email: string
): Promise<UserRecord | null> => {

  const key = `user:read:email:${email}`;
  try {
    //get data from cache
    const start = Date.now()
    const data = await redis.get(key) as UserRecord;
    console.log(`Duration: ${Date.now() - start}`)
    if (data) {
      //just to make sure it was in a correct format
      const dataObj = {
        ...data,
        role: Array.isArray(data.role) ? data.role : data.role ? [data.role] : [],
      };

      return userRecordSchema.parse(dataObj);
    }

    //get data from db if data not exit in cache
    const { rows } = await db.query(
      USER_PREPARED_STATEMENTS.getUserByEmail,
      [email]
    );

    const user: UserRecord = rows[0];
    if (!user) return null;

    //store data to cache
    await redis.set(key, user, {ex: ttlSeconds})

    //return data
    return user;
  } catch (err) {
    console.error("Error fetching user by email:", err);
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