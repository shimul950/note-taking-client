"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "@/lib/admin";
import { User } from "@/types/user";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (id: string, role: string) => {
    await updateUserRole(id, role);
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role: role as User["role"] } : u)));
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  if (loading) {
    return <p className="px-6 py-16 text-center text-ink/50 dark:text-bone/50">Loading users…</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-8">
        Manage users
      </h1>
      <div className="flex flex-col divide-y divide-ink/10 dark:divide-bone/10 rounded-md border border-ink/10 dark:border-bone/10 bg-paper dark:bg-graphite">
        {users.map((user) => (
          <div key={user._id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-ink/50 dark:text-bone/50">{user.email}</p>
            </div>
            <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-sm">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="rounded-md border border-ink/20 dark:border-bone/20 bg-transparent px-2 py-1"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-ink/40 dark:text-bone/40 hover:text-red-500 transition-colors"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}