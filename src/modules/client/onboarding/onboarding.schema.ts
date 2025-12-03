import { z } from "zod";
export const businessFormSchema = z.object({
  company: z.string().min(1, { message: "Company name is required" }),
  startYear: z.string().min(1, { message: "Start year is required" }),
  streetAddress: z.string().min(1, { message: "Street address is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  vatId: z.string().min(1, { message: "VAT ID is required" }),
  contactName: z.string().min(1, { message: "Contact name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
  whatsappNumber: z.string().optional(),
  website: z.url({ message: "Invalid website URL" }),
  facebook: z.union([
    z.literal(""),
    z.url({ message: "Invalid Facebook URL" }),
  ]),
  instagram: z.union([
    z.literal(""),
    z.url({ message: "Invalid Instagram URL" }),
  ]),
  twitter: z.union([z.literal(""), z.url({ message: "Invalid Twitter URL" })]),
  googleBusinessProfileLink: z.union([
    z.literal(""),
    z.url({ message: "Invalid Google Business Profile URL" }),
  ]),
});

export type BusinessFormData = z.infer<typeof businessFormSchema>;

const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;

export const brandingSchema = z.object({
  fontLink: z.union([
    z.literal(""),
    z.string().url({ message: "Invalid Font URL" }),
  ]),
  primaryBrandColor: z
    .string()
    .regex(hexColorRegex, { message: "Invalid Primary Brand Color (Hex)" }),
  secondaryBrandColor: z
    .string()
    .regex(hexColorRegex, { message: "Invalid Secondary Brand Color (Hex)" }),
  logoUrl: z.union([z.literal(""), z.string().url()]),
  teamPhotoUrls: z.array(z.string().url()).default([]),
  teamMembers: z
    .array(
      z.object({
        name: z.string().min(1, "Team member name is required"),
        position: z.string().min(1, "Team member position is required"),
      })
    )
    .min(1, "At least one team member is required"),
  videoCreationOption: z.enum(["upload", "studio", "remote"]),
  ceoVideoUrl: z.union([z.literal(""), z.string().url()]),
  videoTestimonialUrl: z.union([z.literal(""), z.string().url()]),
});

export type BrandingPayload = z.infer<typeof brandingSchema>;

export const websiteSchema = z.object({
  client_id: z.uuid("Invalid Client ID"),
  domain_provider: z
    .string()
    .min(1, "Domain provider is required")
    .optional()
    .or(z.literal("")),
  business_clients_worked: z.array(z.string()).optional(),
  legal_docs: z.array(z.string().url("Invalid Legal Doc URL")).optional(),
  legal_links: z.array(z.string().url("Invalid Legal Link URL")).optional(),
  seo_locations: z.array(z.string().min(1)).optional(),
});

export type WebsiteInput = z.infer<typeof websiteSchema>;
