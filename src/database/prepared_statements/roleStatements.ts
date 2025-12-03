const ROLE_PREPARED_STATEMENTS = {
  getAllRoleRecords: {
    name: "get_all_role_records",
    text: `
      SELECT r.id,
            r.name AS "roleName",
            to_json(COALESCE(rf_labels.field_labels, ARRAY[]::text[])) AS fieldLabels,
            to_json(COALESCE(p_names.permission_names, ARRAY[]::text[])) AS permissions
      FROM auth.roles r
      LEFT JOIN LATERAL (
          SELECT ARRAY_AGG(rf.label ORDER BY rf.label) AS field_labels
          FROM auth.role_fields rf
          WHERE rf.role_id = r.id
      ) rf_labels ON true
      LEFT JOIN LATERAL (
          SELECT ARRAY_AGG(p.name ORDER BY p.name) AS permission_names
          FROM auth.roles_permissions rp
          JOIN auth.permissions p ON p.id = rp.permission_id
          WHERE rp.role_id = r.id
      ) p_names ON true;
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