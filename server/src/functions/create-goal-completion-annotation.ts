import { eq } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions } from "../db/schema";

interface CreateGoalCompletionAnnotationRequest {
  id: string;
  goalAnnotation: string;
}

export async function createGoalCompletionAnnotation({
  id,
  goalAnnotation,
}: CreateGoalCompletionAnnotationRequest) {
  const result = await db
    .update(goalCompletions)
    .set({ goalAnnotation })
    .where(eq(goalCompletions.id, id))
    .returning();

  const goal = result[0];

  return {
    goal,
  };
}
