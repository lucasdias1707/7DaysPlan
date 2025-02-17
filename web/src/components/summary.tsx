import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-BR";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { CheckCircle2, Plus } from "lucide-react";
import { deleteGoalCompletion } from "../http/delete-goal-completion";
import { getSummary } from "../http/get-summary";
import { SevenDaysPlanIcon } from "./7daysplan-icon";
import { PendingGoals } from "./pending-goals";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import GoalAnnotationDialog from "./ui/dialog-text";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";

// Configurar plugins do dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(ptBR);

// Identificar timezone do usuário
const userTimezone =
  Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Sao_Paulo";

export function Summary() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 segundos
  });

  if (!data) {
    return null;
  }

  async function handleDeleteCompleteGoal(goalId: string) {
    await deleteGoalCompletion(goalId);

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  }

  // Converter início e fim da semana para timezone correto
  const firstDayOfWeek = dayjs()
    .tz(userTimezone)
    .startOf("week")
    .format("D MMM YYYY");
  const lastDayOfWeek = dayjs()
    .tz(userTimezone)
    .endOf("week")
    .format("D MMM YYYY");

  const completedPercentage = Math.round((data.completed * 100) / data.total);

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SevenDaysPlanIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{data?.completed}</span> de{" "}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>
      <Separator />
      <PendingGoals />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>
        {data.goalsPerDay &&
          Object.entries(data.goalsPerDay).map(([date, goals]) => {
            // Verificar o que o backend está retornando
            console.log("Data original do backend:", date);

            // Corrigir a data para o timezone correto
            const formattedDate = dayjs
              .utc(date)
              .tz(userTimezone)
              .format("D [de] MMMM YYYY");
            const weekDay = dayjs.utc(date).tz(userTimezone).format("dddd");

            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay}</span>{" "}
                  <span className="text-zinc-400 text-xs">
                    ({formattedDate})
                  </span>
                </h3>
                <ul className="flex flex-col gap-3">
                  {goals.map((goal) => {
                    // Log para validar horário no Safari
                    console.log("Horário original:", goal.completedAt);

                    // Corrigir timezone antes de formatar
                    const time = dayjs
                      .utc(goal.completedAt)
                      .tz(userTimezone)
                      .format("HH:mm");
                    return (
                      <li key={goal.id} className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-cyan-500" />
                          <span className="text-sm text-zinc-400">
                            Você completou "
                            <span className="text-zinc-100">{goal.title}</span>"
                            às <span className="text-zinc-100">{time}h</span>
                          </span>
                          <GoalAnnotationDialog
                            goalId={String(goal.id)}
                            annotation={goal.annotation}
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteCompleteGoal(goal.id)}
                            className="text-sm text-zinc-500 cursor-pointer underline"
                          >
                            Desfazer
                          </button>
                        </div>
                        {goal.annotation && (
                          <p className="text-sm text-zinc-400 italic border-l-2 leading-relaxed border-zinc-600 pl-2 text-wrap max-w-96">
                            {goal.annotation}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}
