import { z } from "zod";

export const Schema = z.object({
  title: z.string().nonempty("Title is required"),
  amount: z
    .number()
    .int("Amount must be an integer")
    .nonnegative("Amount must be a non-negative value"),
  category: z.string().nonempty("Category is required"),
  date: z.date({ message: "Invalid date format" }),
});

export type SchemaType = z.infer<typeof Schema>;
