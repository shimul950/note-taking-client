"use client";

import { useEffect, useState } from "react";
import { getAllNotes } from "@/lib/admin";
import { Note } from "@/types/note";

export default function AdminNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNotes()
      .then((res) => setNotes(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="px-6 py-16 text-center text-ink/50 dark:text-bone/50">Loading notes…</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-8">
        All notes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="rounded-md border border-ink/10 dark:border-bone/10 bg-paper dark:bg-graphite p-4 shadow-sm"
          >
            <h2 className="font-medium mb-1 line-clamp-1">{note.title}</h2>
            <p className="text-sm text-ink/60 dark:text-bone/60 line-clamp-3">{note.content}</p>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-ink/40 dark:text-bone/40">
              owner: {note.ownerId}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}