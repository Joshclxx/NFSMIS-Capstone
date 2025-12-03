export const USER_PREPARED_STATEMENTS = {
  getUserByEmail: {
    name: "get_user_by_email",
    text: `
      SELECT 
          u.id AS "userId",
          COALESCE(CONCAT_WS(' ', INITCAP(u.first_name), INITCAP(u.middle_name), INITCAP(u.last_name), UPPER(u.suffix) ), 'not-set') AS fullname,
          COALESCE(u.sex::text, 'not-set') AS sex,
          COALESCE(a.email, 'not-set') AS email,
          COALESCE(a.password_hash, 'not-set') AS "passwordHash",
          a.status,
          COALESCE(
              (SELECT STRING_AGG(r.name, ', ')
              FROM auth.user_roles ur
              JOIN auth.roles r ON ur.role_id = r.id
              WHERE ur.user_id = u.id), 
              'not-set'
          ) AS role
      FROM auth.accounts a
      JOIN auth.users u ON a.user_id = u.id
      WHERE a.email = $1;
      `,
  },

  createUser: {
    name: "insert_user",
    text: `
      INSERT INTO auth.users (first_name, middle_name, last_name, suffix, dob, contact_no, sex, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
    `,
  },

  createAddress: {
    name: "insert_address",
    text: `
      INSERT INTO auth.addresses (user_id, unit_no, building, house_no, street, brgy, city, region)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
    `,
  },

  createEmergencyContact: {
    name: "insert_emergency_contact",
    text: `
      INSERT INTO auth.emergency_contacts (user_id, first_name, last_name, contact_no, relationship)
      VALUES ($1, $2, $3, $4, $5) RETURNING id;
    `,
  },
} as const;
