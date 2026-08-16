"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { useAuth } from "@/components/auth-provider";
import { ApiError } from "@/lib/api";
import { TextInput } from "@/components/ui/text-input";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { refresh } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login({ email, password });
      await refresh();
      router.push("/notes");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-xl border border-ink/10 dark:border-bone/10 bg-paper dark:bg-graphite p-8 shadow-sm">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-ink/60 dark:text-bone/60 mb-8">
          Log in to pick up where you left off.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput type="email" placeholder="Email" value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-pine text-bone px-6 py-2.5 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Logging in…" : "Log in"}
          </button>
        </form>
        <p className="mt-6 text-sm text-ink/60 dark:text-bone/60 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-pine dark:text-marker underline">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}