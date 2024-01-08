export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
          value: string
        }
        Insert: {
          id?: number
          name: string
          value: string
        }
        Update: {
          id?: number
          name?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_value_fkey"
            columns: ["value"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["name"]
          }
        ]
      }
      comments: {
        Row: {
          article_id: number
          author_id: string
          created_at: string
          disliked_by: string[]
          dislikes: number
          id: number
          liked_by: string[]
          likes: number
          text: string
        }
        Insert: {
          article_id: number
          author_id?: string
          created_at?: string
          disliked_by?: string[]
          dislikes?: number
          id?: number
          liked_by?: string[]
          likes?: number
          text: string
        }
        Update: {
          article_id?: number
          author_id?: string
          created_at?: string
          disliked_by?: string[]
          dislikes?: number
          id?: number
          liked_by?: string[]
          likes?: number
          text?: string
        }
        Relationships: []
      }
      forTest: {
        Row: {
          id: number
          text: string
        }
        Insert: {
          id?: number
          text: string
        }
        Update: {
          id?: number
          text?: string
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          author: string
          author_id: string | null
          categories: string[]
          creation_date: string
          id: number
          imgURL: string
          text: string
          title: string
          views: number | null
        }
        Insert: {
          author?: string
          author_id?: string | null
          categories: string[]
          creation_date?: string
          id?: number
          imgURL: string
          text: string
          title: string
          views?: number | null
        }
        Update: {
          author?: string
          author_id?: string | null
          categories?: string[]
          creation_date?: string
          id?: number
          imgURL?: string
          text?: string
          title?: string
          views?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string
          email: string
          id: string
          login: string
          role: string[]
        }
        Insert: {
          avatar?: string
          email: string
          id: string
          login: string
          role?: string[]
        }
        Update: {
          avatar?: string
          email?: string
          id?: string
          login?: string
          role?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      dislike_comment: {
        Args: {
          user_id: string
          comment_id: number
        }
        Returns: string
      }
      like_comment: {
        Args: {
          comment_id: number
          user_id: string
        }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

export type TablesRow<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
