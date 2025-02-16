import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createGoalCompletionAnnotation } from "../../functions/create-goal-completion-annotation";

export const createGoalCompletionAnnotationRoute: FastifyPluginAsyncZod =
  async (app) => {
    app.post(
      "/completion-annotation",
      {
        schema: {
          body: z.object({
            id: z.string(),
            goalAnnotation: z.string(),
          }),
        },
      },
      async (request) => {
        const { id, goalAnnotation } = request.body;

        await createGoalCompletionAnnotation({
          id,
          goalAnnotation,
        });
      }
    );
  };
