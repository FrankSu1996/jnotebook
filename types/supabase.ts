export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      Notebook: {
        Row: {
          cells: string[];
          created_at: string | null;
          file_name: string;
          user_email: string;
        };
        Insert: {
          cells: string[];
          created_at?: string | null;
          file_name: string;
          user_email: string;
        };
        Update: {
          cells?: string[];
          created_at?: string | null;
          file_name?: string;
          user_email?: string;
        };
        Relationships: [];
      };
      User: {
        Row: {
          created_at: string;
          email: string | null;
          id: number;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      celltype: "code" | "text";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type TableRow<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type Insert<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"];
