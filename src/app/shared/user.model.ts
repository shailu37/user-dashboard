export type Role = "Admin" | "Editor" | "Viewer";

export interface User {
  name: string;
  email: string;
  role: Role;
  id: number;
}
