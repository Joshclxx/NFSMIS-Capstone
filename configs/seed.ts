import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { db } from "./pgConn";

type SQLParam = string | number | boolean | Date | null;
interface RoleDef {
  role: string;
  permissions: string[];
}

//helper for simple insert
export function makePlaceholder(rowIndex: number, columnCount: number): string {
  const start = rowIndex * columnCount + 1;
  return `(${Array.from(
    { length: columnCount },
    (_, i) => `$${start + i}`
  ).join(",")})`;
}

//GENERATORS
const emailList = new Set<string>();
const phoneSet = new Set<string>();

function generateUniqueEmail(): string {
  let email: string;
  do {
    email = faker.internet.email();
  } while (emailList.has(email));
  emailList.add(email);
  return email;
}

function generateUniquePHPhoneNumber(): string {
  let phone: string;
  do {
    const prefixes = ["0917", "0918", "0919", "0922", "0923", "0927", "0928"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = Math.floor(1000000 + Math.random() * 9000000).toString();
    phone = `${prefix}${suffix}`;
  } while (phoneSet.has(phone));
  phoneSet.add(phone);
  return phone;
}

//DATA DEFINITIONS
const ROLE_DEFINITIONS: RoleDef[] = [
  {
    role: "system_admin",
    permissions: [
      "user:create",
      "user:read:all",
      "user:update:status",
      "user:update:profile",
      "role:assign",
      "system:settings:update",
      "system:backup",
      "log:read:audit",
      "log:read:error",
    ],
  },
  {
    role: "head_registrar",
    permissions: [
      "curriculum:create",
      "curriculum:update",
      "subject:create",
      "subject:archive",
      "class:create",
      "class:dissolve",
      "class:update:logistics",
      "student:create",
      "student:read:all",
      "enrollment:validate",
      "grade:rectify",
      "schedule:publish",
      "records:generate:tor",
      "records:generate:diploma",
      "records:read:all",
    ],
  },
  {
    role: "principal",
    permissions: [
      "user:read:department",
      "class:read:all",
      "class:assign_faculty",
      "class:update:logistics",
      "student:read:shs",
      "grade:validate:shs",
      "evaluation:view:results",
      "schedule:generate",
      "schedule:update:manual",
      "faculty:load:read",
      "faculty:load:update",
      "violation:resolve",
      "violation:read:all",
      "request:approve",
    ],
  },
  {
    role: "college_dean",
    permissions: [
      "user:read:department",
      "faculty:load:read",
      "faculty:load:update",
      "grade:validate:college",
      "request:approve",
      "schedule:update:manual",
      "evaluation:view:results",
    ],
  },
  {
    role: "faculty",
    permissions: [
      "class:read:assigned",
      "grade:input",
      "grade:submit",
      "student:read:assigned_class",
    ],
  },
  {
    role: "student",
    permissions: [
      "enrollment:process",
      "grade:read:own",
      "records:read:own",
      "schedule:read:own",
      "request:create",
      "violation:read:own",
    ],
  },
];


async function populateDatabase() {
  const client = await db.connect();

  try {
    const TOTAL_ROWS = 1000;
    const BATCH_SIZE = 500;

    console.log("Starting database seed...");
    await client.query("BEGIN");

    //CREATE ROOT ADMIN
    console.log("Creating Root Admin...");
    const adminRes = await client.query(
      `INSERT INTO auth.users (first_name, last_name, contact_no, sex, created_by) 
       VALUES ($1, $2, $3, $4::sex, NULL)
       RETURNING id`,
      ["System", "Admin", "09000000000", "male"]
    );

    const adminId: string = adminRes.rows[0].id;
    await client.query(`UPDATE auth.users SET created_by = $1 WHERE id = $1`, [
      adminId,
    ]);

    const hashedPassword = await bcrypt.hash("Admin123!", 10);

    await client.query(
      `INSERT INTO auth.accounts (user_id, email, password_hash, status, created_by)
       VALUES ($1::uuid, $2, $3, 'active', $4::uuid)`,
      [adminId, "admin@gmail.com", hashedPassword, adminId]
    );

    //PERMISSIONS
    console.log("Seeding Permissions...");
    const allPermissions = new Set<string>();
    ROLE_DEFINITIONS.forEach((def) =>
      def.permissions.forEach((p) => allPermissions.add(p))
    );
    const uniquePermsArray = Array.from(allPermissions);

    const permValues: SQLParam[] = [];
    const permPlaceholders: string[] = [];

    uniquePermsArray.forEach((perm, i) => {
      permValues.push(perm, adminId);
      permPlaceholders.push(`($${i * 2 + 1}, $${i * 2 + 2}::uuid)`);
    });

    const permInsertQuery = `
      INSERT INTO auth.permissions (name, created_by) 
      VALUES ${permPlaceholders.join(",")} 
      ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
      RETURNING id, name
    `;
    const permResult = await client.query(permInsertQuery, permValues);

    const permMap = new Map<string, number>();
    permResult.rows.forEach((r: { id: number; name: string }) =>
      permMap.set(r.name, r.id)
    );

    // --- C. SEED ROLES & LINK PERMISSIONS ---
    console.log("Seeding Roles & Linking Permissions...");
    const roleMap = new Map<string, number>();

    for (const def of ROLE_DEFINITIONS) {
      const roleRes = await client.query(
        `INSERT INTO auth.roles (name, created_by) VALUES ($1, $2::uuid) 
         ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
         RETURNING id`,
        [def.role, adminId]
      );

      const roleId: number = roleRes.rows[0].id;
      roleMap.set(def.role, roleId);

      const rolePermValues: SQLParam[] = [];
      const rolePermPlaceholders: string[] = [];
      let counter = 0;

      def.permissions.forEach((permName) => {
        const pId = permMap.get(permName);
        if (pId) {
          rolePermValues.push(roleId, pId, adminId);
          // Explicit cast ::uuid
          rolePermPlaceholders.push(
            `($${counter * 3 + 1}, $${counter * 3 + 2}, $${
              counter * 3 + 3
            }::uuid)`
          );
          counter++;
        }
      });

      if (rolePermValues.length > 0) {
        await client.query(
          `INSERT INTO auth.roles_permissions (role_id, permission_id, created_by)
           VALUES ${rolePermPlaceholders.join(",")}
           ON CONFLICT DO NOTHING`,
          rolePermValues
        );
      }
    }

    // Give Admin the System Admin Role
    const systemAdminRoleId = roleMap.get("system_admin");
    if (systemAdminRoleId) {
      await client.query(
        `INSERT INTO auth.user_roles (user_id, role_id, created_by) VALUES ($1::uuid, $2, $3::uuid)`,
        [adminId, systemAdminRoleId, adminId]
      );
    }

    // --- D. SEED USERS ---
    console.log(`Generating ${TOTAL_ROWS} users...`);
    const commonHash = await bcrypt.hash("Password123!", 10);

    for (let i = 0; i < TOTAL_ROWS; i += BATCH_SIZE) {
      const currentBatchSize = Math.min(BATCH_SIZE, TOTAL_ROWS - i);
      const userValues: SQLParam[] = [];
      const userPlaceholders: string[] = [];
      const batchUserMeta: { targetRole: string }[] = [];

      for (let j = 0; j < currentBatchSize; j++) {
        const sex = faker.person.sexType();
        const phone = generateUniquePHPhoneNumber();

        userValues.push(
          faker.person.firstName(sex),
          faker.person.middleName() || null, // Ensure null, not undefined
          faker.person.lastName(),
          faker.person.suffix() || null, // Ensure null, not undefined
          faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
          sex,
          phone,
          adminId
        );

        // MANUAL PLACEHOLDERS with EXPLICIT CASTING
        const start = j * 8 + 1;
        userPlaceholders.push(`(
          $${start}, 
          $${start + 1}::varchar, 
          $${start + 2}, 
          $${start + 3}::varchar, 
          $${start + 4}::date, 
          $${start + 5}::sex, 
          $${start + 6}, 
          $${start + 7}::uuid
        )`);

        // Role Distribution
        const rand = Math.random();
        let targetRole = "student";
        if (rand < 0.05) targetRole = "college_dean";
        else if (rand < 0.15) targetRole = "faculty";
        else if (rand < 0.16) targetRole = "principal";
        else if (rand < 0.17) targetRole = "head_registrar";

        batchUserMeta.push({ targetRole });
      }

      // Insert Users
      const userInsertQuery = `
        INSERT INTO auth.users (first_name, middle_name, last_name, suffix, dob, sex, contact_no, created_by)
        VALUES ${userPlaceholders.join(",")} RETURNING id
      `;
      const userResult = await client.query(userInsertQuery, userValues);
      const newUsers = userResult.rows;

      // Prepare Child Tables
      const accountValues: SQLParam[] = [];
      const accountPlaceholders: string[] = [];
      const userRoleValues: SQLParam[] = [];
      const userRolePlaceholders: string[] = [];
      const addressValues: SQLParam[] = [];
      const addressPlaceholders: string[] = [];

      newUsers.forEach((user: { id: string }, idx: number) => {
        const userId = user.id;
        const meta = batchUserMeta[idx];

        // 1. Account
        accountValues.push(
          userId,
          generateUniqueEmail().toLowerCase(),
          commonHash,
          "active",
          adminId
        );
        // Explicit Casts for Enums and UUIDs
        const accStart = idx * 5 + 1;
        accountPlaceholders.push(
          `($${accStart}::uuid, $${accStart + 1}, $${accStart + 2}, $${
            accStart + 3
          }::account_status, $${accStart + 4}::uuid)`
        );

        // 2. User Role
        const roleId = roleMap.get(meta.targetRole);
        if (roleId) {
          userRoleValues.push(userId, roleId, adminId);
          // Explicit Casts
          const roleStart = idx * 3 + 1;
          userRolePlaceholders.push(
            `($${roleStart}::uuid, $${roleStart + 1}, $${roleStart + 2}::uuid)`
          );
        }

        // 3. Address
        addressValues.push(
          userId,
          faker.location.street(),
          "Brgy " + faker.location.secondaryAddress(),
          faker.location.city(),
          faker.location.state()
        );
        addressPlaceholders.push(makePlaceholder(idx, 5));
      });

      // Execute Child Inserts
      if (accountValues.length) {
        await client.query(
          `INSERT INTO auth.accounts (user_id, email, password_hash, status, created_by) VALUES ${accountPlaceholders.join(
            ","
          )}`,
          accountValues
        );
      }
      if (userRoleValues.length) {
        await client.query(
          `INSERT INTO auth.user_roles (user_id, role_id, created_by) VALUES ${userRolePlaceholders.join(
            ","
          )}`,
          userRoleValues
        );
      }
      if (addressValues.length) {
        await client.query(
          `INSERT INTO auth.addresses (user_id, street, brgy, city, region) VALUES ${addressPlaceholders.join(
            ","
          )}`,
          addressValues
        );
      }

      console.log(`Processed batch ${i + currentBatchSize}/${TOTAL_ROWS}`);
    }

    await client.query("COMMIT");
    console.log("Seeding complete!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seeding failed:", err);
    throw err;
  } finally {
    client.release();
  }
}

populateDatabase().catch((e) => console.error(e));
