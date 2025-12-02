"use client";
import React, { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  isFullscreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full rounded-3xl";

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto z-99999 modal">
      {!isFullscreen && (
        <div
          className="fixed inset-0 h-full w-full backdrop-blur-[32px]"
          style={{ backgroundColor: "rgba(35, 31, 23, 0.45)" }}
          onClick={onClose}
        />
      )}

      <div
        ref={modalRef}
        className={`${contentClasses} ${className}`}
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9.5 w-9.5 items-center justify-center rounded-full"
            style={{
              background: "var(--background)",
              color: "var(--foreground)",
            }}
          >
            ✕
          </button>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};
