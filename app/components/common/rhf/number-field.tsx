import type { JSX } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type Props = {
  name: string;
  label?: string;
  description?: string;
} & JSX.IntrinsicElements["input"];

export const RHFNumberField = (props: Props) => {
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
            <Input
              type="number"
              {...field}
              {...others}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value ? parseFloat(value) : undefined);
              }}
              value={field.value ?? ""}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};