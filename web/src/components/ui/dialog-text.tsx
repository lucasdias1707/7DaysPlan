import * as Dialog from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { NotebookPen } from "lucide-react";
import { useState } from "react";
import { createGoalCompletionAnnotation } from "../../http/create-goal-completion-annotation";
import { Button } from "./button";
import { DialogDescription } from "./dialog";

interface GoalAnnotationDialogProps {
  goalId: string;
  annotation?: string;
}

const GoalAnnotationDialog: React.FC<GoalAnnotationDialogProps> = ({
  goalId,
  annotation,
}) => {
  const [text, setText] = useState(annotation || ""); // Estado inicial com annotation
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  async function handleCreateGoalCompletionAnnotation(
    id: string,
    goalAnnotation: string
  ) {
    await createGoalCompletionAnnotation(id, goalAnnotation);

    queryClient.invalidateQueries({ queryKey: ["summary"] });

    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" onClick={() => setOpen(true)}>
          <NotebookPen className="size-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 border border-zinc-800 bg-zinc-950 p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-bold">Anotações</Dialog.Title>
          <DialogDescription>
            Anote sobre a conclusão de sua meta.
          </DialogDescription>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite algo..."
            className="textarea-custom w-full min-h-[150px] max-h-[300px] overflow-auto p-2 border border-zinc-800/90 rounded mt-4"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Dialog.Close asChild>
              <Button variant="secondary">Cancelar</Button>
            </Dialog.Close>
            <Button
              onClick={() => handleCreateGoalCompletionAnnotation(goalId, text)}
            >
              Salvar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GoalAnnotationDialog;
