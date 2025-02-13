import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createGoal } from "../../functions/create-goal";
import { getWeekPendingGoals } from "../../functions/get-week-pending-goals";

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/goals",
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async (request) => {
      const { title, desiredWeeklyFrequency } = request.body;

      const { pendingGoals } = await getWeekPendingGoals();

      const existingGoal = pendingGoals.find(
        (goal) => goal.title.toLowerCase() === title.toLowerCase()
      );

      if (
        existingGoal &&
        existingGoal.completionCount < existingGoal.desiredWeeklyFrequency
      ) {
        throw new Error(
          `Objetivo "${title}" já existe e ainda não atingiu a frequência semanal desejada.`
        );
      }

      await createGoal({
        title,
        desiredWeeklyFrequency,
      });
    }
  );
};
