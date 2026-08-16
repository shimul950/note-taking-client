import { apiFetch } from "./api";
import { Note, CreateNotePayload, UpdateNotePayload } from "@/types/note";
import { ApiEnvelope, Paginated } from "@/types/api";

export const getNotes = async () => {
  const res = await apiFetch<ApiEnvelope<Paginated<Note>>>("/api/note");
  return res.data; // { data: Note[], page, total, pages }
};

export const getNote = async (id: string) => {
  const res = await apiFetch<ApiEnvelope<Note>>(`/api/note/${id}`);
  return res.data;
};

export const createNote = async (payload: CreateNotePayload) => {
  const res = await apiFetch<ApiEnvelope<Note>>("/api/note", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.data;
};

export const updateNote = async (id: string, payload: UpdateNotePayload) => {
  const res = await apiFetch<ApiEnvelope<Note>>(`/api/note/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res.data;
};

export const deleteNote = (id: string) =>
  apiFetch<void>(`/api/note/${id}`, { method: "DELETE", skipJson: true });