
export type Role = "USER" | "ADMIN"

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin"; 
}