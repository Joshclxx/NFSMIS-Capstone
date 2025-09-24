"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { NAV_BY_ROLE, NAV_ITEMS } from "@/constants";
import Image from "next/image";

type SideNavProps = {
  role: keyof typeof NAV_BY_ROLE;
  minimized?: boolean;
};

export default function SideNav({ role, minimized = false }: SideNavProps) {
  const navItems = NAV_BY_ROLE[role];
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const renderItems = (items: NAV_ITEMS[], trail: string[] = []) => (
    <ul className="space-y-2">
      {items.map((item) => {
        const id = [...trail, item.title].join("::");
        const hasChildren = !!item.children?.length;
        const isOpen = open.has(id);
        const isActive = activeId === id;

        return (
          <li key={id}>
            {hasChildren ? (
              <button
                type="button"
                onClick={() => {
                  toggle(id);
                  setActiveId(id);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2 rounded
                  ${isActive ? "bg-primary/10" : "hover:bg-primary/10"}`}
                aria-expanded={isOpen}
              >
                {item.icon && (
                  <Image
                    src={item.icon as string}
                    alt={item.title}
                    width={32}
                    height={32}
                  />
                )}
                {!minimized && (
                  <span className="font-semibold">{item.title}</span>
                )}
              </button>
            ) : item.path ? (
              <Link
                href={item.path}
                onClick={() => setActiveId(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded
                  ${isActive ? "bg-primary/10" : "hover:bg-primary/10"}`}
              >
                {item.icon && (
                  <Image
                    src={item.icon as string}
                    alt={item.title}
                    width={28}
                    height={28}
                  />
                )}
                {!minimized && item.title}
              </Link>
            ) : (
              !minimized && (
                <span className="flex items-center gap-2 px-4 py-2 font-semibold">
                  {item.title}
                </span>
              )
            )}

            {!minimized && hasChildren && (
              <div
                className={`ml-4 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                  isOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="pt-1">
                  {renderItems(item.children!, [...trail, item.title])}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className="w-full h-screen bg-white flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center justify-center p-4">
        {minimized ? (
          <img
            src="/images/iihc-logo.svg"
            alt="IIHC Logo"
            width={48}
            height={48}
            className="object-contain"
          />
        ) : (
          <img
            src="/images/iihc-logo.svg"
            alt="IIHC Logo"
            width={192}
            height={172}
            className="object-contain"
          />
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto p-4">{renderItems(navItems)}</div>
    </aside>
  );
}
