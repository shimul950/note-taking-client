"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

import { useAuth } from "@/components/auth-provider";
import { ProfileMenu } from "./ProfileMenu";

export function Navbar() {
    const { user, loading } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${scrolled
                ? "backdrop-blur-md bg-paper/80 dark:bg-graphite/80 border-b border-ink/10 dark:border-bone/10"
                : "border-b border-transparent"
                }`}
        >
            <Link
                href="/"
                className="font-[family-name:var(--font-display)] text-xl font-semibold flex items-center gap-2"
            >
                <span className="inline-block h-2 w-2 rounded-full bg-marker" />
                Notely
            </Link>

            <div className="flex items-center gap-6 font-[family-name:var(--font-mono)] text-sm">
                <Link href="/notes" className="relative group hover:text-pine dark:hover:text-marker transition-colors">
                    notes
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-pine dark:bg-marker transition-all group-hover:w-full" />
                </Link>

                {!loading && user ? (
                    <ProfileMenu />
                ) : (
                    !loading && (
                        <>
                            <Link href="/login" className="relative group hover:text-pine dark:hover:text-marker transition-colors">
                                log in
                                <span className="absolute -bottom-1 left-0 h-px w-0 bg-pine dark:bg-marker transition-all group-hover:w-full" />
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-full bg-pine text-bone px-4 py-1.5 font-medium hover:opacity-90 transition-opacity"
                            >
                                Register
                            </Link>
                        </>
                    )
                )
                }

                <ThemeToggle />
            </div>
        </nav>
    );
}