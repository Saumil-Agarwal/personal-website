"use client";

import { type ReactNode, type RefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const focusableSelector = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex='-1'])";

export function AccessibleDialog({
  children,
  label,
  labelledBy,
  onClose,
  panelClassName,
  backdropClassName,
  initialFocusRef,
}: {
  children: ReactNode;
  label?: string;
  labelledBy?: string;
  onClose: () => void;
  panelClassName: string;
  backdropClassName: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const siblings = [...document.body.children].filter((element) => element !== backdropRef.current);
    const previousInert = siblings.map((element) => (element as HTMLElement).inert);
    siblings.forEach((element) => { (element as HTMLElement).inert = true; });
    const panel = panelRef.current;
    const initial = initialFocusRef?.current ?? panel?.querySelector<HTMLElement>(focusableSelector) ?? panel;
    initial?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>(focusableSelector)];
      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey
        ? currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1
        : currentIndex < 0 || currentIndex === focusable.length - 1 ? 0 : currentIndex + 1;
      event.preventDefault();
      focusable[nextIndex]?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      siblings.forEach((element, index) => { (element as HTMLElement).inert = previousInert[index] ?? false; });
      returnFocusRef.current?.focus();
    };
  }, [initialFocusRef, onClose]);

  return createPortal(
    <div ref={backdropRef} className={backdropClassName} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={panelRef}
        className={panelClassName}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>, document.body,
  );
}
