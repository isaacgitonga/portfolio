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
])

export const BudgetRangeSchema = z.enum([
  'hourly',
  'under_2500',
  'tier_2500_10000',
  'tier_10000_25000',
  'tier_25000_plus',
  'flexible'
]).default('flexible')

export const ContactSchema = z.object({
  botCheck: z.string().optional(),
  name: z.string().min(2, "Identifier is required."),
  organization: z.string().optional(),
  workEmail: z.email("Invalid work email destination."),
  inquiryType: EnquiryTypeSchema,
  timeline: z.enum(['immediate', 'short_term', 'planning', 'flexible']).default('flexible'),
  budgetRange: BudgetRangeSchema,
  message: z.string().min(10, "Please describe the core machine or routing constraints (10 characters min)."),
});

export type Contact = z.infer<typeof ContactSchema>;
