import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { deleteGoals } from "../../functions/delete-goal";

export const deleteGoalRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/goal",
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request) => {
      const { goalId } = request.body;

      await deleteGoals({
        goalId,
      });
    }
  );
};
