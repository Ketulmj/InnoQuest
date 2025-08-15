CREATE TYPE "public"."roles" AS ENUM('organization', 'student', 'admin');--> statement-breakpoint
CREATE TABLE "User" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "User_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar(256),
	"role" "roles" DEFAULT 'student',
	"avatar" varchar DEFAULT 'first_char_of_name'
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "User" USING btree ("email");