/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  // 1. ENUM: Define ALL how a field can behave
  pgm.createType(
    { schema: "auth", name: "field_input_type" },
    [
      "text", // Manual typing
      "number", // Manual number
      "date", // Manual date picker
      "boolean", // Checkbox
      "select", // Automated Dropdown (Single)
      "multi_select", // Automated Dropdown (Multiple)
      "read_only_list", // Virtual: Shows a table of data (ex: Session History)
      "read_only_latest", // Virtual: Shows ONE value from history (ex: Last Enrolled)
    ],
    { ifNotExists: true }
  );

  pgm.createTable(
    { schema: "auth", name: "role_fields" },
    {
      id: { type: "serial", primaryKey: true },
      role_id: {
        type: "int",
        notNull: true,
        references: "auth.roles(id)",
        onDelete: "CASCADE",
      },
      label: { type: "varchar(100)", notNull: true },
      field_key: { type: "varchar(50)", notNull: true },
      type: { type: "auth.field_input_type", notNull: true },
      is_required: { type: "boolean", default: false },
      data_source: { type: "varchar(50)" },
      source_label_key: { type: "varchar(50)" },
      source_value_key: { type: "varchar(50)" },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
    }
  );

  pgm.createConstraint(
    { schema: "auth", name: "role_fields" },
    "role_fields_field_key_role_id",
    {
      unique: ["role_id", "field_key"],
    }
  );

  pgm.createTable(
    { schema: "auth", name: "user_role_values" },
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
        onDelete: "CASCADE",
      },
      role_field_id: {
        type: "int",
        notNull: true,
        references: "auth.role_fields(id)",
        onDelete: "CASCADE",
      },
      value: { type: "text", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("NOW()"),
      },
    }
  );

  pgm.createIndex({ schema: "auth", name: "user_role_values" }, ["user_id"]);
  pgm.createIndex({ schema: "auth", name: "user_role_values" }, [
    "role_field_id",
  ]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable({ schema: "auth", name: "user_role_values" }, { ifExists });
  pgm.dropConstraint(
    { schema: "auth", name: "role_fields" },
    "role_fields_field_key_role_id",
    { ifExists }
  );
  pgm.dropTable({ schema: "auth", name: "role_fields" }, { ifExists });
  pgm.dropType({ schema: "auth", name: "field_input_type" }, { ifExists });
};
