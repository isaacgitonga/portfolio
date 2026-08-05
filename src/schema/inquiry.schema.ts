import { z } from "astro/zod";
import { INQUIRY_CATEGORY_MAP, type InquiryCategorySlug } from "@/constants/inquiryCategories";

const categoryKeys = Object.keys(INQUIRY_CATEGORY_MAP) as [InquiryCategorySlug, ...InquiryCategorySlug[]];

export const InquiryTypeSchema = z.enum(categoryKeys);

export const ServiceTypeSchema = z.string();

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
