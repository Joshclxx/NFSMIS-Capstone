import { PoolClient } from "pg";
import { db } from "../../../configs/pgConn";
import ROLE_PREPARED_STATEMENTS from "../prepared_statements/roleStatements";
import { CreateAccount, RoleDTO, RoleFieldValueDTO } from "@/lib/zod/schema/accountSchema";
import { makePlaceholder } from "../../../configs/seed";
export const getRoleData = async () => {
  try {
    const result = await db.query(ROLE_PREPARED_STATEMENTS.getAllRoleRecords);
    if (result.rowCount === 0) {
      return null;
    }

    return result.rows as RoleDTO;
  } catch (err) {
    console.log("Failed to get role names: ", err);
    return null;
  }
};

export const assignRole = async (
  client: PoolClient,
  // FIX 1: Use the Zod type directly.
  // TypeScript now KNOWS this is an Array of objects with 'roleId'.
  role: CreateAccount["role"],
  userId: string,
  createdBy: string
) => {
  // 1. Safety Check
  if (!role || role.length === 0) return true;

  const roleValues = [];
  const rolePlaceholders: string[] = [];
  const columnCount = 3;

  try {
    for (let i = 0; i < role.length; i++) {
      rolePlaceholders.push(makePlaceholder(i, columnCount));
      roleValues.push(userId, role[i].roleId, createdBy);
    }

    const queryText = `${
      ROLE_PREPARED_STATEMENTS.assignUserRole.text
    } ${rolePlaceholders.join(",")} RETURNING user_id;`;

    const result = await client.query(queryText, roleValues);

    if (result.rowCount === 0) return null;


    return result.rows[0].user_id;
  } catch (err) {
    console.error("Detailed Role Assignment Error:", err);
    throw err;
  }
};

export const insertFieldValues = async (
  client: PoolClient,
  userId: string,
  roleFieldValues: RoleFieldValueDTO
) => {
  const fieldValuesPlaceholders = [];
  const fieldValues = [];
  const columnCount = 3;
  try {
    if (roleFieldValues.length < 1) return null
    for (let i = 0; i < roleFieldValues.length; i++) {
      fieldValuesPlaceholders.push(makePlaceholder(i, columnCount));
      fieldValues.push(
        userId,
        roleFieldValues[i].fieldId,
        roleFieldValues[i].value
      );
    }

    const queryText = `${
      ROLE_PREPARED_STATEMENTS.createRoleFieldValues.text
    } ${fieldValuesPlaceholders.join(",")} RETURNING id;`
    
    console.log(fieldValuesPlaceholders)

    const result = await client.query(queryText, fieldValues);

    if (result.rowCount === 0) return null 

    return result.rows[0].id
  } catch (err) {
    throw err;
  }
};
