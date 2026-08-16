"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-pine text-bone text-xs font-semibold hover:opacity-90 transition-opacity"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border border-ink/10 dark:border-bone/10 bg-paper dark:bg-graphite shadow-lg py-2 text-sm">
          <div className="px-4 py-2 border-b border-ink/10 dark:border-bone/10">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-xs text-ink/50 dark:text-bone/50 truncate">{user.email}</p>
            <span className="inline-block mt-1 rounded-full bg-marker/20 text-ink dark:text-bone px-2 py-0.5 text-[10px] font-[family-name:var(--font-mono)] uppercase">
              {user.role}
            </span>
          </div>

          <Link
            href="/notes"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 hover:bg-ink/5 dark:hover:bg-bone/5 transition-colors"
          >
            My notes
          </Link>

          {user.role === "admin" && (
            <Link
              href="/admin/users"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-ink/5 dark:hover:bg-bone/5 transition-colors"
            >
              Admin panel
            </Link>
          )}

          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-500/10 transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}