const ROLE_PREPARED_STATEMENTS = {
  getRoleNames: {
    name: "get_role_names",
    text: `
    SELECT id as "roleId", name AS "roleName"
    FROM auth.roles
    `,
  },

  assignUserRole: {
    text: `
      INSERT INTO auth.user_roles (user_id, role_id, created_by)
      VALUES
    `,
  },

  createRoleFieldValues: {
    text: `
      INSERT INTO auth.user_role_field_values (user_id, role_field_id, value)
      VALUES  
    `,
  },
} as const;

export default ROLE_PREPARED_STATEMENTS;