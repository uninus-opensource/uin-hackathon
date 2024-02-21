CREATE TABLE IF NOT EXISTS "activities" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"location" text,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"budget" text,
	"applicant_id" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "department" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"faculty_id" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faculty" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_level" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text,
	"faculty_id" integer,
	"department_id" integer,
	"organization_level_id" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proposal_status" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proposals" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text,
	"file" text,
	"proposal_staus_id" integer,
	"activity_id" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" integer PRIMARY KEY NOT NULL,
	"reviewer_id" integer,
	"proposal_id" integer,
	"is_approved" boolean,
	"commenst" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"permissions" text[],
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_affiliations" (
	"userId" integer NOT NULL,
	"organization_id" integer,
	"faculty_id" integer,
	"department_id" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_affiliations_userId_organization_id_pk" PRIMARY KEY("userId","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"fullname" text,
	"email" text NOT NULL,
	"avatar" text,
	"password" text,
	"role_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_applicant_id_users_id_fk" FOREIGN KEY ("applicant_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "department" ADD CONSTRAINT "department_faculty_id_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_faculty_id_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_organization_level_id_organization_level_id_fk" FOREIGN KEY ("organization_level_id") REFERENCES "organization_level"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proposals" ADD CONSTRAINT "proposals_proposal_staus_id_proposal_status_id_fk" FOREIGN KEY ("proposal_staus_id") REFERENCES "proposal_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proposals" ADD CONSTRAINT "proposals_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_affiliations" ADD CONSTRAINT "user_affiliations_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_affiliations" ADD CONSTRAINT "user_affiliations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_affiliations" ADD CONSTRAINT "user_affiliations_faculty_id_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_affiliations" ADD CONSTRAINT "user_affiliations_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
