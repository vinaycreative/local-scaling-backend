import { supabaseAdmin } from "@/config/db";
import {
  BrandingPayload,
  BusinessFormData,
  WebsiteInput,
} from "./onboarding.schema";

function mapToDb(data: BusinessFormData, userId: string) {
  const clientData = {
    company_name: data.company,
    company_start_year: parseInt(data.startYear),
    street_address: data.streetAddress,
    postal_code: data.postalCode,
    city: data.city,
    state: data.state,
    country: data.country,
    vat_id: data.vatId,
    contact_name: data.contactName,
    contact_email: data.email,
    contact_number: data.contactNumber,
    whatsapp_number: data.whatsappNumber || null,
    current_website: data.website,
    user_id: userId,
  };

  const socialsData = {
    facebook_link: data.facebook || null,
    instagram_link: data.instagram || null,
    twitter_link: data.twitter || null,
    google_business_link: data.googleBusinessProfileLink || null,
  };

  return { clientData, socialsData };
}

function mapFromDb(client: any, socials: any): BusinessFormData {
  return {
    company: client.company_name || "",
    startYear: client.company_start_year?.toString() || "",
    streetAddress: client.street_address || "",
    postalCode: client.postal_code || "",
    city: client.city || "",
    state: client.state || "",
    country: client.country || "",
    vatId: client.vat_id || "",
    contactName: client.contact_name || "",
    email: client.contact_email || "",
    contactNumber: client.contact_number || "",
    whatsappNumber: client.whatsapp_number || "",
    website: client.current_website || "",
    facebook: socials?.facebook_link || "",
    instagram: socials?.instagram_link || "",
    twitter: socials?.twitter_link || "",
    googleBusinessProfileLink: socials?.google_business_link || "",
  };
}

function mapBrandingToDb(data: BrandingPayload, clientId: string) {
  return {
    client_id: clientId,
    font_link: data.fontLink,
    brand_color_primary: data.primaryBrandColor,
    brand_color_secondary: data.secondaryBrandColor,
    company_logo_url: data.logoUrl,
    team_photos_url: data.teamPhotoUrls,
    team_members: data.teamMembers,
    ceo_intro_video_url: data.ceoVideoUrl,
    video_testimonials_urls: data.videoTestimonialUrl
      ? [data.videoTestimonialUrl]
      : [],
    updated_at: new Date().toISOString(),
  };
}

function mapBrandingFromDb(data: any): BrandingPayload {
  return {
    fontLink: data.font_link || "",
    primaryBrandColor: data.brand_color_primary || "",
    secondaryBrandColor: data.brand_color_secondary || "",
    logoUrl: data.company_logo_url || "",
    teamPhotoUrls: data.team_photos_url || [],
    teamMembers: data.team_members || [],
    ceoVideoUrl: data.ceo_intro_video_url || "",
    videoTestimonialUrl: data.video_testimonials_urls?.[0] || "",
    videoCreationOption: "upload",
  };
}

export const getBusinessInfoService = async (userId: string) => {
  console.log(`[getBusinessInfo] 🟢 Starting fetch for User ID: ${userId}`);

  const { data: client, error } = await supabaseAdmin
    .from("clients")
    .select("*, client_social_links(*)")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error(
      `[getBusinessInfo] 🔴 DB Error fetching client:`,
      error.message
    );
    throw new Error(`Failed to fetch client info: ${error.message}`);
  }

  if (!client) {
    console.log(
      `[getBusinessInfo] 🟡 No existing client profile found for User ID: ${userId}`
    );
    return null;
  }

  console.log(`[getBusinessInfo] ✅ Client found. ID: ${client.id}`);

  const { client_social_links, ...clientData } = client;
  const socials = Array.isArray(client_social_links)
    ? client_social_links[0]
    : client_social_links;

  const businessInfo = mapFromDb(clientData, socials);

  return businessInfo;
};

export const saveBusinessInfoService = async (
  userId: string,
  data: BusinessFormData
) => {
  console.log(
    `[saveBusinessInfo] 🟢 Starting save operation for User ID: ${userId}`
  );
  const { clientData, socialsData } = mapToDb(data, userId);

  console.log(`[saveBusinessInfo] ⏳ Upserting core client data...`);

  const { data: client, error: clientError } = await supabaseAdmin
    .from("clients")
    .upsert(clientData, { onConflict: "user_id" })
    .select("id")
    .single();

  if (clientError) {
    console.error(
      `[saveBusinessInfo] 🔴 Error upserting client:`,
      clientError.message
    );
    throw new Error(`Failed to save client info: ${clientError.message}`);
  }

  if (!client) {
    console.error(
      `[saveBusinessInfo] 🔴 Operation failed: Client data returned null.`
    );
    throw new Error("Client operation failed.");
  }

  console.log(
    `[saveBusinessInfo] ✅ Client core data saved. Client ID: ${client.id}`
  );

  console.log(`[saveBusinessInfo] ⏳ Processing social links...`);

  const { error: socialError } = await supabaseAdmin
    .from("client_social_links")
    .upsert(
      {
        client_id: client.id,
        ...socialsData,
      },
      { onConflict: "client_id" }
    );

  if (socialError) {
    console.error(
      `[saveBusinessInfo] 🔴 Error upserting socials:`,
      socialError.message
    );
    throw new Error(`Failed to save social links: ${socialError.message}`);
  }

  console.log(`[saveBusinessInfo] ✅ Social links saved.`);
  console.log(`[saveBusinessInfo] 🏁 Operation complete successfully.`);

  return { clientId: client.id };
};

export const getBrandingService = async (userId: string) => {
  console.log(`[getBranding] 🟢 Fetching for User ID: ${userId}`);

  // 1. Get Client ID
  const { data: client, error: clientError } = await supabaseAdmin
    .from("clients")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (clientError || !client) {
    console.log(`[getBranding] 🟡 Client not found.`);
    return null;
  }

  // 2. Get Branding Assets
  const { data: branding, error: brandingError } = await supabaseAdmin
    .from("branding_assets")
    .select("*")
    .eq("client_id", client.id)
    .single();

  if (brandingError && brandingError.code !== "PGRST116") {
    console.error(`[getBranding] 🔴 DB Error:`, brandingError.message);
    throw new Error(`Failed to fetch branding info`);
  }

  if (!branding) {
    return null;
  }

  // 3. Map to CamelCase
  return mapBrandingFromDb(branding);
};

export const saveBrandingService = async (
  userId: string,
  data: BrandingPayload
) => {
  console.log(`[saveBranding] 🟢 Starting save for User ID: ${userId}`);

  // 1. Find the Client ID first
  const { data: client, error: clientError } = await supabaseAdmin
    .from("clients")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (clientError || !client) {
    throw new Error(
      "Client profile not found. Please complete business info first."
    );
  }

  // 2. Map payload to DB schema
  const dbPayload = mapBrandingToDb(data, client.id);

  console.log(`[saveBranding] ⏳ Upserting branding assets...`);

  const { data: savedData, error } = await supabaseAdmin
    .from("branding_assets")
    .upsert(dbPayload, { onConflict: "client_id" })
    .select()
    .single();

  if (error) {
    console.error(`[saveBranding] 🔴 DB Error:`, error.message);
    throw new Error(`Failed to save branding assets: ${error.message}`);
  }

  console.log(`[saveBranding] ✅ Branding assets saved.`);
  return savedData;
};

export const saveWebsiteInfoService = async (data: WebsiteInput) => {
  const { client_id, ...websiteData } = data;
  const { data: clientExists, error: checkError } = await supabaseAdmin
    .from("clients")
    .select("id")
    .eq("id", client_id)
    .single();

  if (checkError || !clientExists) {
    throw new Error("Client not found. Please start from the beginning.");
  }

  const { data: savedData, error } = await supabaseAdmin
    .from("website_info")
    .upsert(
      {
        client_id,
        ...websiteData,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "client_id" }
    )
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save website info: ${error.message}`);
  }

  return savedData;
};
