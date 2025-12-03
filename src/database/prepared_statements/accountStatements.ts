const ACCOUNT_PREPARED_STATEMENTS = {
  getAllAccounts: {
    name: "get_all_accounts",
    text: `
      WITH page_slice AS (
        SELECT user_id, id, created_at
        FROM auth.accounts
        ORDER BY created_at
        LIMIT $1 OFFSET $2
      ),
      roles_batch AS (
        SELECT ur.user_id, ARRAY_AGG(r.name ORDER BY r.name) AS role
        FROM auth.user_roles ur
        JOIN auth.roles r ON ur.role_id = r.id
        WHERE ur.user_id IN (SELECT user_id FROM page_slice) 
        GROUP BY ur.user_id
      )
      SELECT 
        COALESCE(CONCAT_WS(' ', INITCAP(u.first_name), INITCAP(u.middle_name), INITCAP(u.last_name), UPPER(u.suffix)), 'not-set') AS fullname,
        a.email,
        to_json(COALESCE(rb.role, ARRAY[]::text[])),
        a.status,
        a.created_at AS "createdAt",
        a.updated_at AS "updatedAt",
        a.last_activity AS "lastSeenAt"
      FROM page_slice ps
      JOIN auth.accounts a ON ps.id = a.id
      LEFT JOIN auth.users u ON ps.user_id = u.id
      LEFT JOIN roles_batch rb ON ps.user_id = rb.user_id
      ORDER BY ps.created_at;
    `,
  },

  createAccount: {
    name: "insert_account",
    text: `
      INSERT INTO auth.accounts (user_id, email, password_hash, created_by, status) 
      VALUES ($1, $2, $3, $4, $5) RETURNING id;
    `,
  },
};

export default ACCOUNT_PREPARED_STATEMENTS;
