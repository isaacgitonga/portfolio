import z from "zod";
import { EnquiryTypeSchema } from "./contact.schema.ts";

export const BookingSchema = z.object({
  botCheck: z.string().optional(),
  name: z.string().min(2, "Identifier is required."),
  organization: z.string().optional(),
  workEmail: z.email("Invalid work email destination."),
  inquiryType: EnquiryTypeSchema,
  message: z.string().optional().or(z.literal("")),
});

export type Booking = z.infer<typeof BookingSchema>;
