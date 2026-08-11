import z from "zod";

export const InquiryTypeSchema = z.enum([
  'architecture_consulting',
  'fractional_cto',
  'dedicated_backend',
  'api_design',
  'database_design',
  'greenfield_platform',
  'ai-automation',
  'data_heavy_ui',
  'general_inquiry'
]);

export const ServiceTypeSchema = z.enum([
  'backend-infra',
  'identity-access',
  'payment-billing',
  'admin-consoles',
  'risk-auditing',
  'deterministic-rag',
]);

export const InquirySchema = z.object({
  botCheck: z.string().nullish(),
  name: z.string().min(2, "Please add your name."),
  organization: z.string().nullish(),
  workEmail: z.email("Invalid contact email."),
  inquiryType: InquiryTypeSchema.nullish(),
  service: ServiceTypeSchema.nullish(),
  message: z.string().nullish().or(z.literal("")),
}).refine((data) => {
  return !!(data.inquiryType || data.service);
}, {
  message: "Please specify the inquiry type or service.",
  path: ["inquiryType"]
});

export type Inquiry = z.infer<typeof InquirySchema>;
export type ServiceType = z.infer<typeof ServiceTypeSchema>;
