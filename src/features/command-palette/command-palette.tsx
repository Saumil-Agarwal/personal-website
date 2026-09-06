"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { commands } from "@/features/terminal/commands";
import { AccessibleDialog } from "@/components/accessible-dialog";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPalette = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    setOpen(true);
  }, []);
  const closePalette = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openPalette]);

  useEffect(() => {
    const show = () => openPalette();
    window.addEventListener("open-command-palette", show);
    return () => window.removeEventListener("open-command-palette", show);
  }, [openPalette]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const options = commands.filter((command) =>
    `${command.name} ${command.description}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  function execute(index: number) {
    const command = options[index];
    if (!command) return;
    closePalette();
    window.dispatchEvent(new CustomEvent("terminal-run-command", { detail: { command: command.name } }));
  }
  if (!open) return null;

  return (
    <AccessibleDialog backdropClassName="palette-backdrop" panelClassName="palette" label="Command palette" onClose={closePalette} initialFocusRef={inputRef}>
        <label htmlFor="command-search">Search commands</label>
        <input
          id="command-search"
          ref={inputRef}
          role="combobox"
          aria-expanded="true"
          aria-controls="command-results"
          aria-activedescendant={options[selectedIndex] ? `command-option-${options[selectedIndex].name}` : undefined}
          value={query}
          onChange={(event) => { setQuery(event.target.value); setSelectedIndex(0); }}
          onKeyDown={(event) => {
            if (event.key === "Escape") closePalette();
            if (event.key === "ArrowDown") { event.preventDefault(); setSelectedIndex((index) => Math.min(index + 1, options.length - 1)); }
            if (event.key === "ArrowUp") { event.preventDefault(); setSelectedIndex((index) => Math.max(index - 1, 0)); }
            if (event.key === "Enter") { event.preventDefault(); execute(selectedIndex); }
          }}
        />
        <ul id="command-results" role="listbox" className="palette-results" aria-label="Available commands">{options.map((command, index) => <li role="option" aria-selected={index === selectedIndex} id={`command-option-${command.name}`} key={command.name} onClick={() => execute(index)}><strong>{command.name}</strong><span>{command.description}</span></li>)}</ul>
        {!options.length && <p className="palette-empty" role="status">No matching commands.</p>}
    </AccessibleDialog>
  );
}
