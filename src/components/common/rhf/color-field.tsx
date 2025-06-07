import { Dices } from "lucide-react";
import type { JSX } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { generateRandomColor } from "~/utils/color";

type Props = {
  name: string;
  label?: string;
  description?: string;
} & JSX.IntrinsicElements["input"];

export const RHFColorField = (props: Props) => {
  const { name, description, label, ...others } = props;
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="flex items-center gap-2">
              <div
                className="size-8 rounded shrink-0"
                style={{ backgroundColor: field.value }}
              />
              <Input {...field} {...others} className="flex-1" />
              <Button
                type="button"
                size={"icon"}
                variant={"outline-solid"}
                onClick={() => field.onChange(generateRandomColor())}
              >
                <Dices />
              </Button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
