import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CheckCircle2, Circle } from "lucide-react";

export function RadioGroup(props: RadioGroupPrimitive.RadioGroupProps) {
  return (
    <RadioGroupPrimitive.RadioGroup
      {...props}
      className="flex flex-col gap-2"
    />
  );
}

export function RadioGroupItem(props: RadioGroupPrimitive.RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.RadioGroupItem
      {...props}
      className="group bg-black border border-zinc-900 rounded-lg px-4 py-2.5 flex items-center justify-between outline-none hover:border-zinc-800 focus-visible:border-cyan-500 focus-visible:ring-4 ring-cyan-500/10 data-[state=checked]:bg-cyan-500/5 data-[state=checked]:border-cyan-500"
    />
  );
}

export function RadioGroupIndicator() {
  return (
    <>
      <Circle className="size-4 text-zinc-600 group-data-[state=checked]:hidden" />
      <CheckCircle2 className="size-4 text-cyan-500 hidden group-data-[state=checked]:inline" />
    </>
  );
}
