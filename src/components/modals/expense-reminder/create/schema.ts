import { z } from "zod";

export const Schema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z
    .number({ required_error: "Amount is required" })
    .int("Amount must be an integer")
    .nonnegative("Amount must be a non-negative value"),
  category: z.string().nullable(), // optional string or null
  isRecurring: z.boolean(),
  date: z.date({ message: "Invalid date format" }),
});

export type SchemaType = z.infer<typeof Schema>;
