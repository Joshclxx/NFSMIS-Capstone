"use client";

import Link from "next/link";
import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "link"
  | "danger"
  | "enroll"
  | "login";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const base =
    "rounded-lg font-semibold transition-colors flex items-center justify-center";

  let variants = "";

  switch (variant) {
    case "primary":
      variants = "bg-primary text-white hover:bg-primary/90 px-6 py-2";
      break;

    case "secondary":
      variants = "bg-secondary text-white hover:bg-secondary/90 px-6 py-2";
      break;

    case "outline":
      variants =
        "border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2";
      break;

    case "login":
      variants =
        "w-full py-3 bg-button text-white hover:bg-blue-700 font-semibold";
      break;

    case "enroll":
      variants =
        "bg-secondary hover:bg-secondary/95 cursor-pointer px-4 py-2 text-background font-bold";
      break;

    case "danger":
      variants = "bg-primary text-white hover:bg-primary/75 px-6 py-2";
      break;

    case "link":
      variants = "text-primary hover:underline px-2 py-1";
      break;

    default:
      variants = "px-6 py-2 bg-gray-300";
  }

  const finalClass = `${base} ${variants} ${className}`;

  // LINK BUTTON
  if (href) {
    return (
      <Link href={href} className={finalClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={finalClass}>
      {children}
    </button>
  );
}
