import type { JSX } from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

type Props = {
  name: string;
  label?: string;
  description?: string;
} & JSX.IntrinsicElements["button"];

export const RHFCheckboxField = (props: Props) => {
  const { name, description, label, ...others } = props;
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
                {...field}
                {...others}
              />
            </FormControl>
            {label && <FormLabel>{label}</FormLabel>}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
