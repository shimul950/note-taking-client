import { apiFetch } from "./api";
import { ApiEnvelope, Paginated } from "@/types/api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export const getAllUsers = async () => {
  const res = await apiFetch<ApiEnvelope<Paginated<User>>>("/api/admin/users");
  return res.data;
};

export const updateUserRole = async (id: string, role: string) => {
  const res = await apiFetch<ApiEnvelope<User>>(`/api/admin/user/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
  return res.data;
};

export const deleteUser = (id: string) =>
  apiFetch<void>(`/api/admin/users/${id}`, { method: "DELETE", skipJson: true });

export const getAllNotes = async () => {
  const res = await apiFetch<ApiEnvelope<Paginated<Note>>>("/api/admin/notes");
  return res.data;
};