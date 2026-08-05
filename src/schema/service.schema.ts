import z from "zod";

export const ServiceSchema = z.object({});

export type Service = z.infer<typeof ServiceSchema>;