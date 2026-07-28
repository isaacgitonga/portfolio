import z from "zod";

export const EnquiryTypeSchema = z.enum([
  'architecture_consulting',
  'fractional_cto',
  'legacy_modernization',
  'greenfield_platform',
  'checkout_payments',
  'database_design',
  'dedicated_backend',
  'other'
]);

export const ContactSchema = z.object({
  botCheck: z.string().optional(),
  name: z.string().min(2, "Identifier is required."),
  organization: z.string().optional(),
  workEmail: z.email("Invalid work email destination."),
  inquiryType: EnquiryTypeSchema,
  message: z.string().optional().or(z.literal("")),
});

export type Contact = z.infer<typeof ContactSchema>;
