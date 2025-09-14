"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { NAV_BY_ROLE, NAV_ITEMS } from "@/constants";
import SideNavFooter from "./SideNavFooter";

type SideNavProps = {
  role: keyof typeof NAV_BY_ROLE;
};

export default function SideNav({ role }: SideNavProps) {
  const navItems = NAV_BY_ROLE[role];
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const renderItems = (items: NAV_ITEMS[], trail: string[] = []) => (
    <ul className="space-y-2">
      {items.map((item, idx) => {
        const id = [...trail, item.title].join("::");
        const hasChildren = !!item.children?.length;
        const isOpen = open.has(id);

        return (
          <li key={id}>
            {hasChildren ? (
              <button
                type="button"
                onClick={() => toggle(id)}
                className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-primary/80 rounded"
                aria-expanded={isOpen}
              >
                <span className="font-semibold">{item.title}</span>
                <svg
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 11.92 1.17l-4.25 3.37a.75.75 0 01-.92 0L5.21 8.4a.75.75 0 01.02-1.19z" />
                </svg>
              </button>
            ) : item.path ? (
              <Link
                href={item.path}
                className="block px-4 py-2 text-white hover:bg-primary/80 rounded"
              >
                {item.title}
              </Link>
            ) : (
              <span className="block px-4 py-2 font-semibold text-white">
                {item.title}
              </span>
            )}

            {hasChildren && (
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
    <aside className="w-full h-screen bg-primary flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">{renderItems(navItems)}</div>
      <SideNavFooter />
    </aside>
  );
}
