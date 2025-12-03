/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

/**
 *
 */
export const up = (pgm) => {
  pgm.createExtension("uuid-ossp", { ifNotExists: true });
  pgm.createSchema("auth", { ifNotExists: true });
  pgm.createType("sex", ["male", "female"], { ifNotExists: true });
  pgm.createType(
    "session_type",
    ["expired", "rejected", "success", "revoked"],
    { ifNotExists: true }
  );
  pgm.createType("relationship", [
    "parent",
    "sibling",
    "child",
    "spouse",
    "relative",
    "other",
  ]);
  pgm.createType("account_status", [
    "active",
    "inactive",
    "deactivated",
    "locked",
  ]);

  //users PII
  pgm.createTable(
    { schema: "auth", name: "users" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("uuid_generate_v4()"),
      },
      first_name: { type: "varchar(30)", notNull: true },
      middle_name: { type: "varchar(30)" },
      last_name: { type: "varchar(30)", notNull: true },
      suffix: { type: "varchar(10)" },
      dob: { type: "date" },
      sex: { type: "sex" },
      contact_no: { type: "varchar(11)", notNull: true, unique: true },
      created_by: {
        type: "uuid",
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
      updated_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
    }
  );

  //emergency_contacts
  pgm.createTable(
    { schema: "auth", name: "emergency_contacts" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("uuid_generate_v4()"),
      },
      user_id: {
        type: "uuid",
        notNull: true,
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      first_name: { type: "varchar(30)", notNull: true },
      last_name: { type: "varchar(30)", notNull: true },
      contact_no: { type: "varchar(11)", notNull: true },
      relationship: { type: "relationship", notNull: true },
    }
  );

  //accounts
  pgm.createTable(
    { schema: "auth", name: "accounts" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("uuid_generate_v4()"),
      },
      user_id: {
        type: "uuid",
        notNull: true,
        unique: true,
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      email: { type: "varchar(125)", notNull: true, unique: true },
      password_hash: { type: "varchar(255)", notNull: true },
      status: { type: "account_status", notNull: true },
      created_by: {
        type: "uuid",
        notNull: true,
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
      updated_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
      last_activity: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
    }
  );
  //add index
  pgm.createIndex({ schema: "auth", name: "accounts" }, "created_at");

  //user addresses
  pgm.createTable(
    { schema: "auth", name: "addresses" },
    {
      id: { type: "serial", primaryKey: true },
      user_id: {
        type: "uuid",
        notNull: true,
        unique: true,
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      unit_no: { type: "varchar(30)" },
      building: { type: "varchar(50)" },
      house_no: { type: "varchar(30)" },
      street: { type: "varchar(50)", notNull: true },
      brgy: { type: "varchar(50)", notNull: true },
      city: { type: "varchar(50)", notNull: true },
      region: { type: "varchar(80)", notNull: true },
      updated_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
    }
  );

  //session
  pgm.createTable(
    { schema: "auth", name: "sessions" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("uuid_generate_v4()"),
      },
      user_id: {
        type: "uuid",
        notNull: true,
        references: "auth.users(id)",
      },
      session_token: { type: "varchar(255)", notNull: true },
      ip: { type: "inet", notNull: true },
      device_hash: { type: "varchar(255)", notNull: true },
      attempts: { type: "int", notNull: true },
      revoked: { type: "boolean", notNull: true, default: false },
      expired_at: { type: "timestamp", notNull: true },
      login_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
    }
  );

  //session_history
  pgm.createTable(
    { schema: "auth", name: "session_history" },
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("uuid_generate_v4()"),
      },
      user_id: {
        type: "uuid",
        notNull: true,
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      session_token: { type: "varchar(255)", notNull: true },
      ip: { type: "inet", notNull: true },
      device_hash: { type: "varchar(255)", notNull: true },
      attempts: { type: "int", notNull: true },
      event_type: { type: "session_type", notNull: true },
      login_at: { type: "timestamp", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
    }
  );

  //role
  pgm.createTable(
    { schema: "auth", name: "roles" },
    {
      id: { type: "serial", primaryKey: true },
      name: { type: "varchar(30)", notNull: true, unique: true },
      created_by: {
        type: "uuid",
        notNull: true,
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
    }
  );

  //permissions
  pgm.createTable(
    { schema: "auth", name: "permissions" },
    {
      id: { type: "serial", primaryKey: true },
      name: { type: "varchar(30)", notNull: true, unique: true },
      description: { type: "varchar(100)" },
      created_by: {
        type: "uuid",
        notNull: true,
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("CURRENT_TIMESTAMP"),
      },
    }
  );

  //role_permission junction
  pgm.createTable(
    { schema: "auth", name: "roles_permissions" },
    {
      role_id: {
        type: "int",
        notNull: true,
        references: "auth.roles(id)",
        onDelete: "CASCADE",
      },
      permission_id: {
        type: "int",
        notNull: true,
        references: "auth.permissions(id)",
        onDelete: "CASCADE",
      },
      created_by: {
        type: "uuid",
        notNull: true,
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
    }
  );

  //add composition key for role_permission
  pgm.addConstraint(
    { schema: "auth", name: "roles_permissions" },
    "roles_permissions_pkey",
    {
      primaryKey: ["role_id", "permission_id"],
    }
  );

  //user_role
  pgm.createTable(
    { schema: "auth", name: "user_roles" },
    {
      user_id: {
        type: "uuid",
        notNull: true,
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      role_id: {
        type: "int",
        notNull: true,
        references: "auth.roles(id)",
        onDelete: "CASCADE",
      },
      created_by: {
        type: "uuid",
        notNull: true,
        references: "auth.users(id)",
        onDelete: "RESTRICT",
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
    }
  );

  //add constraint to user_role
  pgm.addConstraint({ schema: "auth", name: "user_roles" }, "user_roles_pkey", {
    primaryKey: ["user_id", "role_id"],
  });

  //add index
  pgm.createIndex({schema: "auth", name: "user_roles"}, "user_id")
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropIndex(
    { schema: "auth", name: "user_roles" },
    "user_id",
    { ifExists: true }
  );
  pgm.dropConstraint(
    { schema: "auth", name: "user_roles" },
    "user_roles_pkey",  
    {
      ifExists: true,
    }
  );
  pgm.dropTable({ schema: "auth", name: "user_roles" }, { ifExists: true });

  pgm.dropConstraint(
    { schema: "auth", name: "roles_permissions" },
    "roles_permissions_pkey",
    { ifExists: true }
  );
  pgm.dropTable(
    { schema: "auth", name: "roles_permissions" },
    { ifExists: true }
  );

  pgm.dropTable({ schema: "auth", name: "permissions" }, { ifExists: true });
  pgm.dropTable({ schema: "auth", name: "roles" }, { ifExists: true });
  pgm.dropTable({ schema: "auth", name: "session_history" });
  pgm.dropTable({ schema: "auth", name: "sessions" }, { ifExists: true });
  pgm.dropTable({ schema: "auth", name: "addresses" }, { ifExists: true });
  pgm.dropIndex({schema: "auth", name: "accounts"}, "created_at")
  pgm.dropTable({ schema: "auth", name: "accounts" }, { ifExists: true });
  pgm.dropTable(
    { schema: "auth", name: "emergency_contacts" },
    { ifExists: true }
  );
  pgm.dropTable({ schema: "auth", name: "users" }, { ifExists: true });

  pgm.dropType("account_status", { ifExists: true });
  pgm.dropType("relationship", { ifExists: true });
  pgm.dropType("session_type", { ifExists: true });
  pgm.dropType("sex", { ifExists: true });
  pgm.dropSchema("auth", { ifExists: true, cascade: true });

  //extension
  pgm.dropExtension("uuid-ossp", { ifExists: true });
};
