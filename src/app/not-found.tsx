import GridShape from "@/components/Common/GridShape";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "NFSMIS ERROR 404",
  description:
    "This is NFSMIS Error 404 page - Next.js Tailwind CSS Capstone Project",
};

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center h-[932px] p-6 overflow-hidden z-1">
      {/* <GridShape /> */}
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <p className="not-found-description mb-[40px] max-w-md">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Image
          src="/error/404-page.svg"
          alt="404"
          className="dark:hidden"
          width={472}
          height={152}
        />
        <Image
          src="/error/404-page.svg"
          alt="404"
          className="hidden dark:block"
          width={472}
          height={152}
        />

        <h2 className="not-found-heading mb-4 mt-[20px]">Page Not Found</h2>
        <p className="mt-[32px] mb-[60px] not-found-sub-heading">
          We can’t seem to find the page you are looking for!
        </p>
        <Link
          href="/admin/dashboard"
          className="px-6 py-3 rounded-lg bg-primary text-textWhite font-semibold hover:bg-highlight-1 transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* Footer */}
      <p className="absolute not-found-credits text-center -translate-x-1/2 bottom-6 left-1/2">
        &copy; {new Date().getFullYear()} | NFSMIS
        <br />
        <span>TEAM 404: TEAM NOT FOUND CAPSTONE PROJECT</span>
      </p>
    </div>
  );
}
