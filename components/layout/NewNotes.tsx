"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/notes";
import { TextInput } from "@/components/ui/text-input";

export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createNote({ title, content });
      router.push("/notes");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-8">
        New note
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput placeholder="Title" value={title} onChange={setTitle} />
        <textarea
          placeholder="Write something…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className="rounded-md border border-ink/20 dark:border-bone/20 bg-transparent px-4 py-2.5 outline-none focus:border-pine dark:focus:border-marker transition-colors resize-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="self-start rounded-full bg-pine text-bone px-6 py-2.5 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save note"}
        </button>
      </form>
    </main>
  );
}