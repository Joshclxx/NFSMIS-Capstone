import { db } from "../../../configs/pgConn";
import { localCache } from "@/lib/localcache";
import SESSION_PREPARED_STATEMENTS from "../prepared_statements/sessionStatements";
import { createSessionCookie } from "@/utils/authUtils";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const insertSession = async (ip: string, deviceHash: string, userId: string, deviceKey: string) => {
    try {
        const token = await createSessionCookie();
        // const userSessionKey = `session:user:${userId}`;
        const attempts = localCache.zCard(deviceKey);
        const expiredAt = new Date(Date.now() + SEVEN_DAYS_MS);
        
        const result = await db.query(
        SESSION_PREPARED_STATEMENTS.createSession,
        [userId, token, ip, deviceHash, attempts, expiredAt]
        );

        if(!result || result.rowCount === 0) {
            return null
        }

        return token
    } catch (err) {
        console.error("Failed to insert session:", err);
        return null
    }
}   

export const getSession = async (token: string) => {
    try {
        const result = await db.query(SESSION_PREPARED_STATEMENTS.getSession, [token])

        if (result.rowCount === 0) {
            return null
        }

        return result.rows[0].userId as string
    } catch (err) {
        console.log("failed to fetch session", err) 
        return null
    }
}