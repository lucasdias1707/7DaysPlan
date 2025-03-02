import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createCompletionRoute } from "./routes/create-completion";
import { createGoalCompletionAnnotationRoute } from "./routes/create-completion-annotation";
import { createGoalRoute } from "./routes/create-goal";
import { deleteCompletionRoute } from "./routes/delete-completion";
import { deleteGoalRoute } from "./routes/delete-goal";
import { getPendingRoute } from "./routes/get-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createCompletionRoute);
app.register(getPendingRoute);
app.register(getWeekSummaryRoute);
app.register(deleteCompletionRoute);
app.register(deleteGoalRoute);
app.register(createGoalCompletionAnnotationRoute);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP server running 🔥");
  });
