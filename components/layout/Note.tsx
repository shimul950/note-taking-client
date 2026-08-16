"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getNotes, deleteNote } from "@/lib/notes";
import { Note } from "@/types/note";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotes()
      .then((res) => setNotes(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  if (loading) {
    return <p className="px-6 py-16 text-center text-ink/50 dark:text-bone/50">Loading notes…</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
          Your notes
        </h1>
        <Link
          href="/notes/new"
          className="flex items-center gap-1.5 rounded-full bg-pine text-bone px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> New note
        </Link>
      </div>

      {notes.length === 0 ? (
        <p className="text-ink/50 dark:text-bone/50 text-center py-16">
          No notes yet — create your first one.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="group relative rounded-md border border-ink/10 dark:border-bone/10 bg-paper dark:bg-graphite p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/notes/${note._id}`}>
                <h2 className="font-medium mb-1 line-clamp-1">{note.title}</h2>
                <p className="text-sm text-ink/60 dark:text-bone/60 line-clamp-3">{note.content}</p>
                <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-ink/40 dark:text-bone/40">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </p>
              </Link>
              <button
                onClick={() => handleDelete(note._id)}
                className="absolute top-3 right-3 text-xs text-ink/30 dark:text-bone/30 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}