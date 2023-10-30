export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      Note: {
        Row: {
          cells: Json[];
          created_at: string;
          name: string;
          notebook_name: string;
          user_email: string;
        };
        Insert: {
          cells: Json[];
          created_at?: string;
          name: string;
          notebook_name: string;
          user_email: string;
        };
        Update: {
          cells?: Json[];
          created_at?: string;
          name?: string;
          notebook_name?: string;
          user_email?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Note_notebook_name_fkey";
            columns: ["notebook_name"];
            referencedRelation: "Notebooks";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "Note_user_email_fkey";
            columns: ["user_email"];
            referencedRelation: "User";
            referencedColumns: ["email"];
          },
        ];
      };
      Notebooks: {
        Row: {
          created_at: string;
          name: string;
          user_email: string;
        };
        Insert: {
          created_at?: string;
          name: string;
          user_email: string;
        };
        Update: {
          created_at?: string;
          name?: string;
          user_email?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Notebooks_user_email_fkey";
            columns: ["user_email"];
            referencedRelation: "User";
            referencedColumns: ["email"];
          },
        ];
      };
      User: {
        Row: {
          created_at: string;
          email: string;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          name?: string | null;
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
