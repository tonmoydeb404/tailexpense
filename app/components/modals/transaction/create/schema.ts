import { z } from "zod";

export const TypeSchema = z.enum(["INCOME", "EXPENSE"]);

export const Schema = z.object({
  title: z.string().default("").optional(),
  type: TypeSchema,
  amount: z
    .number()
    .int("Amount must be an integer")
    .nonnegative("Amount must be a non-negative value"),
  category: z.string().nullable().default(null),
  date: z.date({ message: "Invalid date format" }),
});

export type SchemaType = z.infer<typeof Schema>;
