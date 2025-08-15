import { pgTable, integer, varchar, uniqueIndex, pgEnum } from "drizzle-orm/pg-core"

export const rolesEnum = pgEnum("roles", ["organization", "student", "admin"]);

const user = pgTable('User', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar().notNull(),
    password: varchar("password", { length: 256 }),
    role: rolesEnum().default("student"),
    avatar: varchar("avatar").default("first_char_of_name")
  },
  (table) => [
    uniqueIndex("email_idx").on(table.email)
  ]);

export default user;