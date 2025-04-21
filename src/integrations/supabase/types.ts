export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cocktail_variations: {
        Row: {
          id: string
          parent_cocktail_id: string | null
          variation_cocktail_id: string | null
        }
        Insert: {
          id?: string
          parent_cocktail_id?: string | null
          variation_cocktail_id?: string | null
        }
        Update: {
          id?: string
          parent_cocktail_id?: string | null
          variation_cocktail_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cocktail_variations_parent_cocktail_id_fkey"
            columns: ["parent_cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cocktail_variations_parent_cocktail_id_fkey"
            columns: ["parent_cocktail_id"]
            isOneToOne: false
            referencedRelation: "makeable_cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cocktail_variations_variation_cocktail_id_fkey"
            columns: ["variation_cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cocktail_variations_variation_cocktail_id_fkey"
            columns: ["variation_cocktail_id"]
            isOneToOne: false
            referencedRelation: "makeable_cocktails"
            referencedColumns: ["id"]
          },
        ]
      }
      cocktails: {
        Row: {
          average_rating: number | null
          color: string | null
          common_ingredients: boolean | null
          complexity: string | null
          contains_dairy: boolean | null
          contains_eggs: boolean | null
          contains_nuts: boolean | null
          date_added: string | null
          description: string | null
          difficulty_level: string | null
          featured: boolean | null
          garnish: string | null
          glass_type: string | null
          gluten_free: boolean | null
          ice_type: string | null
          id: string
          image_url: string | null
          instructions: string
          last_updated: string | null
          make_count: number | null
          method: string | null
          name: string
          occasion: string | null
          origin: string | null
          pack_id: string | null
          popular: boolean | null
          premium_status: string | null
          save_count: number | null
          season: string | null
          serving_temperature: string | null
          spirit_base: string
          stories: string | null
          strength: string | null
          style: string | null
          sugar_level: string | null
          time_of_day: string | null
          total_ratings: number | null
          vegan: boolean | null
          view_count: number | null
        }
        Insert: {
          average_rating?: number | null
          color?: string | null
          common_ingredients?: boolean | null
          complexity?: string | null
          contains_dairy?: boolean | null
          contains_eggs?: boolean | null
          contains_nuts?: boolean | null
          date_added?: string | null
          description?: string | null
          difficulty_level?: string | null
          featured?: boolean | null
          garnish?: string | null
          glass_type?: string | null
          gluten_free?: boolean | null
          ice_type?: string | null
          id?: string
          image_url?: string | null
          instructions: string
          last_updated?: string | null
          make_count?: number | null
          method?: string | null
          name: string
          occasion?: string | null
          origin?: string | null
          pack_id?: string | null
          popular?: boolean | null
          premium_status?: string | null
          save_count?: number | null
          season?: string | null
          serving_temperature?: string | null
          spirit_base: string
          stories?: string | null
          strength?: string | null
          style?: string | null
          sugar_level?: string | null
          time_of_day?: string | null
          total_ratings?: number | null
          vegan?: boolean | null
          view_count?: number | null
        }
        Update: {
          average_rating?: number | null
          color?: string | null
          common_ingredients?: boolean | null
          complexity?: string | null
          contains_dairy?: boolean | null
          contains_eggs?: boolean | null
          contains_nuts?: boolean | null
          date_added?: string | null
          description?: string | null
          difficulty_level?: string | null
          featured?: boolean | null
          garnish?: string | null
          glass_type?: string | null
          gluten_free?: boolean | null
          ice_type?: string | null
          id?: string
          image_url?: string | null
          instructions?: string
          last_updated?: string | null
          make_count?: number | null
          method?: string | null
          name?: string
          occasion?: string | null
          origin?: string | null
          pack_id?: string | null
          popular?: boolean | null
          premium_status?: string | null
          save_count?: number | null
          season?: string | null
          serving_temperature?: string | null
          spirit_base?: string
          stories?: string | null
          strength?: string | null
          style?: string | null
          sugar_level?: string | null
          time_of_day?: string | null
          total_ratings?: number | null
          vegan?: boolean | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cocktails_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "content_packs"
            referencedColumns: ["id"]
          },
        ]
      }
      content_packs: {
        Row: {
          description: string | null
          id: string
          name: string
          premium: boolean | null
          price: number | null
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          premium?: boolean | null
          price?: number | null
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          premium?: boolean | null
          price?: number | null
        }
        Relationships: []
      }
      flavor_profiles: {
        Row: {
          cocktail_id: string | null
          flavor: string
          id: string
        }
        Insert: {
          cocktail_id?: string | null
          flavor: string
          id?: string
        }
        Update: {
          cocktail_id?: string | null
          flavor?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flavor_profiles_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flavor_profiles_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "makeable_cocktails"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          abv: number | null
          category: string
          id: string
          is_common: boolean | null
          name: string
          type: string | null
        }
        Insert: {
          abv?: number | null
          category: string
          id?: string
          is_common?: boolean | null
          name: string
          type?: string | null
        }
        Update: {
          abv?: number | null
          category?: string
          id?: string
          is_common?: boolean | null
          name?: string
          type?: string | null
        }
        Relationships: []
      }
      optional_ingredients: {
        Row: {
          amount: string | null
          cocktail_id: string | null
          id: string
          ingredient_id: string | null
          unit: string | null
        }
        Insert: {
          amount?: string | null
          cocktail_id?: string | null
          id?: string
          ingredient_id?: string | null
          unit?: string | null
        }
        Update: {
          amount?: string | null
          cocktail_id?: string | null
          id?: string
          ingredient_id?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "optional_ingredients_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "optional_ingredients_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "makeable_cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "optional_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      required_ingredients: {
        Row: {
          amount: string
          cocktail_id: string | null
          id: string
          ingredient_id: string | null
          order_index: number
          unit: string | null
        }
        Insert: {
          amount: string
          cocktail_id?: string | null
          id?: string
          ingredient_id?: string | null
          order_index: number
          unit?: string | null
        }
        Update: {
          amount?: string
          cocktail_id?: string | null
          id?: string
          ingredient_id?: string | null
          order_index?: number
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "required_ingredients_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "required_ingredients_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "makeable_cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "required_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      secondary_spirits: {
        Row: {
          cocktail_id: string | null
          id: string
          spirit: string
        }
        Insert: {
          cocktail_id?: string | null
          id?: string
          spirit: string
        }
        Update: {
          cocktail_id?: string | null
          id?: string
          spirit?: string
        }
        Relationships: [
          {
            foreignKeyName: "secondary_spirits_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "secondary_spirits_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "makeable_cocktails"
            referencedColumns: ["id"]
          },
        ]
      }
      special_equipment: {
        Row: {
          cocktail_id: string | null
          equipment: string
          id: string
        }
        Insert: {
          cocktail_id?: string | null
          equipment: string
          id?: string
        }
        Update: {
          cocktail_id?: string | null
          equipment?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "special_equipment_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "special_equipment_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "makeable_cocktails"
            referencedColumns: ["id"]
          },
        ]
      }
      user_inventory: {
        Row: {
          date_added: string | null
          id: string
          ingredient_id: string
          quantity: number | null
          unit: string | null
          user_id: string
        }
        Insert: {
          date_added?: string | null
          id?: string
          ingredient_id: string
          quantity?: number | null
          unit?: string | null
          user_id: string
        }
        Update: {
          date_added?: string | null
          id?: string
          ingredient_id?: string
          quantity?: number | null
          unit?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_inventory_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      makeable_cocktails: {
        Row: {
          id: string | null
          image_url: string | null
          name: string | null
          premium_status: string | null
          required_count: number | null
          spirit_base: string | null
          total_required: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_random_cocktail: {
        Args: { filter_available?: boolean; user_id?: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
