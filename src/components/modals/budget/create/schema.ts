import { z } from "zod";

export const Schema = z.object({
  amount: z
    .number()
    .int("Amount must be an integer")
    .nonnegative("Amount must be a non-negative value"),
  month: z.date({ message: "Invalid month format" }),
});

export type SchemaType = z.infer<typeof Schema>;
