import z from "zod";

export const InquiryTypeSchema = z.enum([
  'architecture_consulting',
  'fractional_cto',
  'legacy_modernization',
  'greenfield_platform',
  'checkout_payments',
  'database_design',
  'dedicated_backend',
  'other'
]);

export const ServiceTypeSchema = z.enum([
  'backend-infra',
  'identity-access',
  'payment-billing',
  'admin-consoles',
  'risk-auditing',
  'deterministic-rag'
]);

export const InquirySchema = z.object({
  botCheck: z.string().nullish(),
  name: z.string().min(2, "Identifier is required."),
  organization: z.string().nullish(),
  workEmail: z.email("Invalid work email destination."),
  inquiryType: InquiryTypeSchema.nullish(),
  service: ServiceTypeSchema.nullish(),
  message: z.string().nullish().or(z.literal("")),
}).refine((data) => {
  return !!(data.inquiryType || data.service);
}, {
  message: "Either inquiry type or service must be specified.",
  path: ["inquiryType"]
});

export type Inquiry = z.infer<typeof InquirySchema>;
// export type InquiryType = z.infer<typeof InquiryTypeSchema>;
export type ServiceType = z.infer<typeof ServiceTypeSchema>;
