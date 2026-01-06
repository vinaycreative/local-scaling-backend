import z from "zod"

const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i

export const brandingInfoSchema = z.object({
  font_link: z.union([z.literal(""), z.string().url({ message: "Invalid Font URL" })]),
  primary_brand_color: z
    .string()
    .regex(hexColorRegex, { message: "Invalid Primary Brand Color (Hex)" }),
  secondary_brand_color: z
    .string()
    .regex(hexColorRegex, { message: "Invalid Secondary Brand Color (Hex)" }),
  logo_url: z.union([z.literal(""), z.string().url()]),
  team_photo_urls: z.array(z.string().url()).default([]),
  team_members: z
    .array(
      z.object({
        name: z.string().min(1, "Team member name is required"),
        position: z.string().min(1, "Team member position is required"),
      })
    )
    .min(1, "At least one team member is required"),
  video_creation_option: z.enum(["upload", "studio", "remote"]),
  ceo_video_url: z.union([z.literal(""), z.string().url()]),
  video_testimonial_url: z.union([z.literal(""), z.string().url()]),
})

export type BrandingFormData = z.infer<typeof brandingInfoSchema>
