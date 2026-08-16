"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNote, updateNote, deleteNote } from "@/lib/notes";
import { TextInput } from "@/components/ui/text-input";

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getNote(id).then((note) => {
      setTitle(note.title);
      setContent(note.content);
      setLoading(false);
    });
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateNote(id, { title, content });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    await deleteNote(id);
    router.push("/notes");
  };

  if (loading) {
    return <p className="px-6 py-16 text-center text-ink/50 dark:text-bone/50">Loading…</p>;
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex flex-col gap-4">
        <TextInput placeholder="Title" value={title} onChange={setTitle} />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="rounded-md border border-ink/20 dark:border-bone/20 bg-transparent px-4 py-2.5 outline-none focus:border-pine dark:focus:border-marker transition-colors resize-none"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-pine text-bone px-6 py-2.5 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <button
            onClick={handleDelete}
            className="rounded-full border border-red-400/40 text-red-500 px-6 py-2.5 font-medium hover:bg-red-500/10 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  );
}