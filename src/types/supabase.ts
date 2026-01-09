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
      ads_budget_location: {
        Row: {
          budget: number | null
          client_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          seo_locations: string[] | null
          services_provided: string[] | null
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          seo_locations?: string[] | null
          services_provided?: string[] | null
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          seo_locations?: string[] | null
          services_provided?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_budget_location_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      branding_assets: {
        Row: {
          ceo_video_url: string | null
          created_at: string | null
          font_link: string | null
          id: string
          logo_url: string | null
          primary_brand_color: string | null
          secondary_brand_color: string | null
          team_members: Json | null
          team_photo_urls: string[] | null
          updated_at: string | null
          user_id: string | null
          video_creation_option: string | null
          video_testimonial_url: string | null
        }
        Insert: {
          ceo_video_url?: string | null
          created_at?: string | null
          font_link?: string | null
          id?: string
          logo_url?: string | null
          primary_brand_color?: string | null
          secondary_brand_color?: string | null
          team_members?: Json | null
          team_photo_urls?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          video_creation_option?: string | null
          video_testimonial_url?: string | null
        }
        Update: {
          ceo_video_url?: string | null
          created_at?: string | null
          font_link?: string | null
          id?: string
          logo_url?: string | null
          primary_brand_color?: string | null
          secondary_brand_color?: string | null
          team_members?: Json | null
          team_photo_urls?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          video_creation_option?: string | null
          video_testimonial_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "branding_assets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      business_information: {
        Row: {
          address: string | null
          city: string | null
          company_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_number: string | null
          country: string | null
          created_at: string
          facebook: string | null
          google_business_profile_link: string | null
          id: string
          instagram: string | null
          postal_code: string | null
          start_year: string | null
          state: string | null
          updatd_at: string
          user_id: string
          vat_id: string | null
          website: string | null
          whatsapp_number: string | null
          x: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_number?: string | null
          country?: string | null
          created_at?: string
          facebook?: string | null
          google_business_profile_link?: string | null
          id?: string
          instagram?: string | null
          postal_code?: string | null
          start_year?: string | null
          state?: string | null
          updatd_at?: string
          user_id: string
          vat_id?: string | null
          website?: string | null
          whatsapp_number?: string | null
          x?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_number?: string | null
          country?: string | null
          created_at?: string
          facebook?: string | null
          google_business_profile_link?: string | null
          id?: string
          instagram?: string | null
          postal_code?: string | null
          start_year?: string | null
          state?: string | null
          updatd_at?: string
          user_id?: string
          vat_id?: string | null
          website?: string | null
          whatsapp_number?: string | null
          x?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_information_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      client_integrations: {
        Row: {
          client_id: string
          connected_at: string
          created_at: string
          external_account_id: string
          external_account_name: string | null
          id: string
          last_verified_at: string | null
          provider: Database["public"]["Enums"]["integration_provider"]
          scopes: string[] | null
          status: Database["public"]["Enums"]["integration_status"]
          tool: Database["public"]["Enums"]["integration_tool"]
        }
        Insert: {
          client_id: string
          connected_at?: string
          created_at?: string
          external_account_id: string
          external_account_name?: string | null
          id?: string
          last_verified_at?: string | null
          provider: Database["public"]["Enums"]["integration_provider"]
          scopes?: string[] | null
          status?: Database["public"]["Enums"]["integration_status"]
          tool: Database["public"]["Enums"]["integration_tool"]
        }
        Update: {
          client_id?: string
          connected_at?: string
          created_at?: string
          external_account_id?: string
          external_account_name?: string | null
          id?: string
          last_verified_at?: string | null
          provider?: Database["public"]["Enums"]["integration_provider"]
          scopes?: string[] | null
          status?: Database["public"]["Enums"]["integration_status"]
          tool?: Database["public"]["Enums"]["integration_tool"]
        }
        Relationships: [
          {
            foreignKeyName: "client_integrations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: []
      }
      oauth_credentials: {
        Row: {
          access_token: string
          client_integration_id: string
          created_at: string
          expires_at: string | null
          id: string
          provider: Database["public"]["Enums"]["integration_provider"]
          refresh_token: string | null
          token_type: string | null
          updated_at: string
        }
        Insert: {
          access_token: string
          client_integration_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          provider: Database["public"]["Enums"]["integration_provider"]
          refresh_token?: string | null
          token_type?: string | null
          updated_at?: string
        }
        Update: {
          access_token?: string
          client_integration_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          provider?: Database["public"]["Enums"]["integration_provider"]
          refresh_token?: string | null
          token_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "oauth_credentials_client_integration_id_fkey"
            columns: ["client_integration_id"]
            isOneToOne: true
            referencedRelation: "client_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          id: string
          name: string | null
          stage: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          stage?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          stage?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
      tickets: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          files: string[] | null
          id: string
          priority: string | null
          status: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          files?: string[] | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          files?: string[] | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tools_access: {
        Row: {
          created_at: string
          ga4_access_granted: boolean | null
          google_ads_access_granted: boolean | null
          google_search_console_access_granted: boolean | null
          gtm_access_granted: boolean | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          ga4_access_granted?: boolean | null
          google_ads_access_granted?: boolean | null
          google_search_console_access_granted?: boolean | null
          gtm_access_granted?: boolean | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          ga4_access_granted?: boolean | null
          google_ads_access_granted?: boolean | null
          google_search_console_access_granted?: boolean | null
          gtm_access_granted?: boolean | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tools_access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          client_lead_id: string | null
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
          client_lead_id?: string | null
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
          client_lead_id?: string | null
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
            foreignKeyName: "users_client_lead_id_fkey"
            columns: ["client_lead_id"]
            isOneToOne: false
            referencedRelation: "client_leads"
            referencedColumns: ["id"]
          },
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "website_setup_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      integration_provider: "google"
      integration_status: "pending" | "connected" | "revoked" | "error"
      integration_tool: "google_ads" | "ga4" | "gtm" | "search_console"
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
    Enums: {
      integration_provider: ["google"],
      integration_status: ["pending", "connected", "revoked", "error"],
      integration_tool: ["google_ads", "ga4", "gtm", "search_console"],
    },
  },
} as const
