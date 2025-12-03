import { Client, PoolClient } from "pg";
import { db } from "../../../configs/pgConn"
import  ACCOUNT_PREPARED_STATEMENTS  from "../prepared_statements/accountStatements"
import bcrypt from "bcryptjs";
export const getAccounts = async (limit: number = 20, offset: number = 0) => {
    try {
        const result = await db.query(ACCOUNT_PREPARED_STATEMENTS.getAllAccounts, [limit, offset]);
        if (result.rowCount === 0) {
            return null
        }
        return result.rows
    } catch (err) {
        console.log(err)
        throw null;
    }
}

export const insertAccount = async (client: PoolClient, userId: string, email: string, createdBy: string) => {
    try {
        const password = "Tester123!";
        const passwordHash = await bcrypt.hash(password, 10)
        const result = await client.query(
          ACCOUNT_PREPARED_STATEMENTS.createAccount,
          [userId, email, passwordHash, createdBy, "active"]
        );
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}