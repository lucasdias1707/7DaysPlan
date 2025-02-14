import * as Dialog from "@radix-ui/react-dialog";
import { NotebookPen } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

export default function ExampleDialog() {
  const [text, setText] = useState("");

  const handleSave = () => {
    console.log("Texto salvo:", text);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button">
          <NotebookPen className="size-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 border border-zinc-800 bg-zinc-950 p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-bold">Anotações</Dialog.Title>
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
            <Button>Salvar</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
