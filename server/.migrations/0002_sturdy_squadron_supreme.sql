ALTER TABLE "goal_completions" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "goal_completions" ADD COLUMN "goal_annotation" text;