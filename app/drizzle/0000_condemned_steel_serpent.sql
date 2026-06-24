CREATE TABLE "actions" (
	"id" text PRIMARY KEY NOT NULL,
	"report_id" text NOT NULL,
	"title" text NOT NULL,
	"due" text NOT NULL,
	"due_variant" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"initials" text NOT NULL,
	"stage_gate" text NOT NULL,
	"stage_gate_short" text NOT NULL,
	"sector" text NOT NULL,
	"capital_ask" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"persona" text PRIMARY KEY NOT NULL,
	"initials" text NOT NULL,
	"short_name" text NOT NULL,
	"full_name" text NOT NULL,
	"role" text NOT NULL,
	"email" text NOT NULL,
	"color" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "actions" ADD CONSTRAINT "actions_report_id_projects_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;