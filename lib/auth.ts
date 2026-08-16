
import { apiFetch } from "./api";
import { LoginPayload, RegisterPayload, AuthResponse } from "@/types/auth";
import { ApiEnvelope } from "@/types/api";
import { User } from "@/types/user";

export const login = async (payload: LoginPayload) => {
  const res = await apiFetch<ApiEnvelope<AuthResponse>>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.data;
};

export const register = async (payload: RegisterPayload) => {
  const res = await apiFetch<ApiEnvelope<AuthResponse>>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.data;
};

export const logout = () =>
  apiFetch<void>("/api/auth/logout", { method: "POST", skipJson: true });

export const getCurrentUser = async () => {
  const res = await apiFetch<ApiEnvelope<User>>("/api/auth/me"); 
  return res.data;
};