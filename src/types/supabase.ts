export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ads_budget: {
        Row: {
          client_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          monthly_budget: number | null
          seo_locations: string[] | null
          services_provided: string[] | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          monthly_budget?: number | null
          seo_locations?: string[] | null
          services_provided?: string[] | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          monthly_budget?: number | null
          seo_locations?: string[] | null
          services_provided?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_budget_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      branding_assets: {
        Row: {
          brand_color_primary: string | null
          brand_color_secondary: string | null
          ceo_intro_video_url: string | null
          client_id: string | null
          company_logo_url: string | null
          created_at: string | null
          font_link: string | null
          id: string
          team_members: Json | null
          team_photos_url: string[] | null
          total_team_members: number | null
          updated_at: string | null
          video_testimonials_urls: string[] | null
        }
        Insert: {
          brand_color_primary?: string | null
          brand_color_secondary?: string | null
          ceo_intro_video_url?: string | null
          client_id?: string | null
          company_logo_url?: string | null
          created_at?: string | null
          font_link?: string | null
          id?: string
          team_members?: Json | null
          team_photos_url?: string[] | null
          total_team_members?: number | null
          updated_at?: string | null
          video_testimonials_urls?: string[] | null
        }
        Update: {
          brand_color_primary?: string | null
          brand_color_secondary?: string | null
          ceo_intro_video_url?: string | null
          client_id?: string | null
          company_logo_url?: string | null
          created_at?: string | null
          font_link?: string | null
          id?: string
          team_members?: Json | null
          team_photos_url?: string[] | null
          total_team_members?: number | null
          updated_at?: string | null
          video_testimonials_urls?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "branding_assets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      branding_content: {
        Row: {
          ceo_video_url: string
          created_at: string
          font_link: string
          id: string
          logo_url: string
          primary_brand_color: string
          secondary_brand_color: string
          team_members: string[] | null
          team_photo_urls: string[] | null
          updated_at: string
          video_creation_option: string
          video_testimonial_url: string
        }
        Insert: {
          ceo_video_url: string
          created_at?: string
          font_link: string
          id?: string
          logo_url: string
          primary_brand_color: string
          secondary_brand_color: string
          team_members?: string[] | null
          team_photo_urls?: string[] | null
          updated_at?: string
          video_creation_option: string
          video_testimonial_url: string
        }
        Update: {
          ceo_video_url?: string
          created_at?: string
          font_link?: string
          id?: string
          logo_url?: string
          primary_brand_color?: string
          secondary_brand_color?: string
          team_members?: string[] | null
          team_photo_urls?: string[] | null
          updated_at?: string
          video_creation_option?: string
          video_testimonial_url?: string
        }
        Relationships: []
      }
      business_information: {
        Row: {
          address: string | null
          city: string | null
          company_name: string | null
          company_start_year: string | null
          contact_email: string | null
          contact_name: string | null
          contact_number: string | null
          country: string | null
          created_at: string
          currnet_website_url: string | null
          fecbook_url: string | null
          google_profile_link: string | null
          id: string
          instagram_url: string | null
          postal_code: string | null
          state: string | null
          updatd_at: string
          vat_id: string | null
          wabtsapp_number: string | null
          x: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          company_start_year?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_number?: string | null
          country?: string | null
          created_at?: string
          currnet_website_url?: string | null
          fecbook_url?: string | null
          google_profile_link?: string | null
          id?: string
          instagram_url?: string | null
          postal_code?: string | null
          state?: string | null
          updatd_at?: string
          vat_id?: string | null
          wabtsapp_number?: string | null
          x?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          company_start_year?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_number?: string | null
          country?: string | null
          created_at?: string
          currnet_website_url?: string | null
          fecbook_url?: string | null
          google_profile_link?: string | null
          id?: string
          instagram_url?: string | null
          postal_code?: string | null
          state?: string | null
          updatd_at?: string
          vat_id?: string | null
          wabtsapp_number?: string | null
          x?: string | null
        }
        Relationships: []
      }
      client_leads: {
        Row: {
          address: string | null
          city: string | null
          company_name: string | null
          country: string | null
          created_at: string | null
          email: string | null
          id: string
          monthly_payment_excluding_taxes: string | null
          name: string | null
          payment_link: string | null
          payment_status: string | null
          postal_code: string | null
          state: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          vat_id: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          monthly_payment_excluding_taxes?: string | null
          name?: string | null
          payment_link?: string | null
          payment_status?: string | null
          postal_code?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          vat_id?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          monthly_payment_excluding_taxes?: string | null
          name?: string | null
          payment_link?: string | null
          payment_status?: string | null
          postal_code?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          vat_id?: string | null
        }
        Relationships: []
      }
      client_social_links: {
        Row: {
          client_id: string | null
          created_at: string | null
          facebook_link: string | null
          google_business_link: string | null
          id: string
          instagram_link: string | null
          linkedin_link: string | null
          twitter_link: string | null
          youtube_link: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          facebook_link?: string | null
          google_business_link?: string | null
          id?: string
          instagram_link?: string | null
          linkedin_link?: string | null
          twitter_link?: string | null
          youtube_link?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          facebook_link?: string | null
          google_business_link?: string | null
          id?: string
          instagram_link?: string | null
          linkedin_link?: string | null
          twitter_link?: string | null
          youtube_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_social_links_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          city: string | null
          company_name: string
          company_start_year: number | null
          contact_email: string | null
          contact_name: string | null
          contact_number: string | null
          country: string | null
          created_at: string | null
          current_website: string | null
          id: string
          postal_code: string | null
          state: string | null
          street_address: string | null
          updated_at: string | null
          user_id: string | null
          vat_id: string | null
          whatsapp_number: string | null
        }
        Insert: {
          city?: string | null
          company_name: string
          company_start_year?: number | null
          contact_email?: string | null
          contact_name?: string | null
          contact_number?: string | null
          country?: string | null
          created_at?: string | null
          current_website?: string | null
          id?: string
          postal_code?: string | null
          state?: string | null
          street_address?: string | null
          updated_at?: string | null
          user_id?: string | null
          vat_id?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          city?: string | null
          company_name?: string
          company_start_year?: number | null
          contact_email?: string | null
          contact_name?: string | null
          contact_number?: string | null
          country?: string | null
          created_at?: string | null
          current_website?: string | null
          id?: string
          postal_code?: string | null
          state?: string | null
          street_address?: string | null
          updated_at?: string | null
          user_id?: string | null
          vat_id?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      google_integrations: {
        Row: {
          access_token: string | null
          client_id: string | null
          created_at: string | null
          ga4_connected: boolean | null
          ga4_property_id: string | null
          google_ads_account_id: string | null
          google_ads_connected: boolean | null
          gsc_connected: boolean | null
          gsc_site_url: string | null
          gtm_connected: boolean | null
          gtm_container_id: string | null
          id: string
          refresh_token: string | null
          token_expiry: string | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          client_id?: string | null
          created_at?: string | null
          ga4_connected?: boolean | null
          ga4_property_id?: string | null
          google_ads_account_id?: string | null
          google_ads_connected?: boolean | null
          gsc_connected?: boolean | null
          gsc_site_url?: string | null
          gtm_connected?: boolean | null
          gtm_container_id?: string | null
          id?: string
          refresh_token?: string | null
          token_expiry?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          client_id?: string | null
          created_at?: string | null
          ga4_connected?: boolean | null
          ga4_property_id?: string | null
          google_ads_account_id?: string | null
          google_ads_connected?: boolean | null
          gsc_connected?: boolean | null
          gsc_site_url?: string | null
          gtm_connected?: boolean | null
          gtm_container_id?: string | null
          id?: string
          refresh_token?: string | null
          token_expiry?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_integrations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          id: string
          name: string | null
          permissions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          permissions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          permissions?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tools_access: {
        Row: {
          created_at: string
          google_ads: boolean | null
          google_analytics_4: boolean | null
          google_search_console: boolean | null
          google_tag_manager: boolean | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          google_ads?: boolean | null
          google_analytics_4?: boolean | null
          google_search_console?: boolean | null
          google_tag_manager?: boolean | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          google_ads?: boolean | null
          google_analytics_4?: boolean | null
          google_search_console?: boolean | null
          google_tag_manager?: boolean | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tools_access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          password: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      website_info: {
        Row: {
          business_clients_worked: string[] | null
          client_id: string | null
          created_at: string | null
          domain_provider: string | null
          id: string
          legal_docs: string[] | null
          legal_links: string[] | null
          seo_locations: string[] | null
          updated_at: string | null
        }
        Insert: {
          business_clients_worked?: string[] | null
          client_id?: string | null
          created_at?: string | null
          domain_provider?: string | null
          id?: string
          legal_docs?: string[] | null
          legal_links?: string[] | null
          seo_locations?: string[] | null
          updated_at?: string | null
        }
        Update: {
          business_clients_worked?: string[] | null
          client_id?: string | null
          created_at?: string | null
          domain_provider?: string | null
          id?: string
          legal_docs?: string[] | null
          legal_links?: string[] | null
          seo_locations?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "website_info_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      website_setup: {
        Row: {
          access_granted: boolean
          business_clients_worked: string[] | null
          created_at: string
          domain_provider: string
          id: string
          legal_files: string[] | null
          legal_links: string[] | null
          seo_locations: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_granted: boolean
          business_clients_worked?: string[] | null
          created_at?: string
          domain_provider: string
          id?: string
          legal_files?: string[] | null
          legal_links?: string[] | null
          seo_locations?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_granted?: boolean
          business_clients_worked?: string[] | null
          created_at?: string
          domain_provider?: string
          id?: string
          legal_files?: string[] | null
          legal_links?: string[] | null
          seo_locations?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
