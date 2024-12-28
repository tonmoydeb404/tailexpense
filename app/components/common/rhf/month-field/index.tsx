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
import Field from "./field";

type Props = {
  name: string;
  label?: string;
  description?: string;
} & JSX.IntrinsicElements["input"];

export const RHFMonthField = (props: Props) => {
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
            <Field
              value={field.value}
              onChange={field.onChange}
              disabled={others.disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
