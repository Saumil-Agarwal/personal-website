"use client";

import { useEffect, useRef, useState } from "react";
import { commands } from "@/features/terminal/commands";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function openPalette() {
    setQuery("");
    setSelectedIndex(0);
    setOpen(true);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const show = () => openPalette();
    window.addEventListener("open-command-palette", show);
    return () => window.removeEventListener("open-command-palette", show);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const options = commands.filter((command) =>
    `${command.name} ${command.description}`.includes(query.toLowerCase()),
  );
  function execute(index: number) {
    const command = options[index];
    if (!command) return;
    setOpen(false);
    window.dispatchEvent(new CustomEvent("terminal-run-command", { detail: { command: command.name } }));
  }
  if (!open) return null;

  return (
    <div className="palette-backdrop" role="dialog" aria-modal="true" aria-label="Command palette" onClick={() => setOpen(false)}>
      <div className="palette" onClick={(event) => event.stopPropagation()}>
        <label htmlFor="command-search">Search commands</label>
        <input
          id="command-search"
          ref={inputRef}
          value={query}
          onChange={(event) => { setQuery(event.target.value); setSelectedIndex(0); }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
            if (event.key === "ArrowDown") { event.preventDefault(); setSelectedIndex((index) => Math.min(index + 1, options.length - 1)); }
            if (event.key === "ArrowUp") { event.preventDefault(); setSelectedIndex((index) => Math.max(index - 1, 0)); }
            if (event.key === "Enter") { event.preventDefault(); execute(selectedIndex); }
          }}
        />
        <ul className="palette-results" aria-label="Available commands">{options.map((command, index) => <li key={command.name}><button className={index === selectedIndex ? "selected" : ""} onClick={() => execute(index)}><strong>{command.name}</strong><span>{command.description}</span></button></li>)}</ul>
      </div>
    </div>
  );
}
