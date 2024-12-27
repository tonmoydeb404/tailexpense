import { z } from "zod";

export const Schema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .nonempty("Name is required"),
  color: z
    .string()
    .nonempty("Color is required")
    .regex(
      /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
      "Color must be a valid hex code (e.g., #fff or #ffffff)"
    ),
});

export type SchemaType = z.infer<typeof Schema>;
