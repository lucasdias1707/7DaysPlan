import { eq } from "drizzle-orm";
import { db } from "../db";
import { goals } from "../db/schema";

interface DeleteGoalRequest {
  goalId: string;
}

export async function deleteGoals({ goalId }: DeleteGoalRequest) {
  const deleteResult = await db.delete(goals).where(eq(goals.id, goalId));

  const deleteGoal = deleteResult[0];

  return {
    deleteGoal,
  };
}
