import * as ContextMenu from "@radix-ui/react-context-menu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createGoalCompletion } from "../http/create-goal-completion";
import { deleteGoal } from "../http/delete-goal";
import { getPendingGoals } from "../http/get-pending-goals";
import { OutlineButton } from "./ui/outline-button";

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 segundos
  });

  if (!data) {
    return null;
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  }

  async function handleDeleteGoal(goalId: string, title: string) {
    const response = await deleteGoal(goalId);

    try {
      let { message } = await response.json();
      if (
        message ===
        `update or delete on table "goals" violates foreign key constraint "goal_completions_goal_id_goals_id_fk" on table "goal_completions"`
      ) {
        message = `Não é possível deletar "${title}", pois já foi selecionado!`;
      }
      if (!response.ok) {
        throw new Error(message || "Erro desconhecido ao criar meta");
      }
    } catch (error) {
      if (!response.ok) {
        toast.error(
          error instanceof Error ? error.message : "Erro desconhecido"
        );
      }
    }
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => (
        <ContextMenu.Root key={goal.id}>
          <ContextMenu.Trigger asChild>
            <OutlineButton
              disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
              onClick={() => handleCompleteGoal(goal.id)}
            >
              <Plus className="size-4 text-zinc-600" />
              {goal.title}
            </OutlineButton>
          </ContextMenu.Trigger>

          <ContextMenu.Portal>
            <ContextMenu.Content className="min-w-[180px] bg-zinc-900 text-white rounded-md shadow-lg p-2 text-sm">
              <ContextMenu.Item
                className="flex items-center gap-2 p-2 text-red-400 cursor-pointer hover:bg-red-400 hover:text-white rounded-md"
                onSelect={() => handleDeleteGoal(goal.id, goal.title)}
              >
                <Trash2 className="size-4" />
                Deletar
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      ))}
    </div>
  );
}
