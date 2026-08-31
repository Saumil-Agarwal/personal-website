"use client";

import { useRef, useState } from "react";
import { completeCommand, executeCommand } from "./commands";
import { applyCommandResult } from "./result-handler";

type Entry = { input: string; lines: string[] };

export function Terminal() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    const result = executeCommand(command);
    setInput("");
    setHistory((items) => [command, ...items]);
    setHistoryIndex(-1);
    if (result.kind === "clear") return setEntries([]);
    applyCommandResult(result);
    setEntries((items) => [...items, { input: command, lines: result.lines ?? [] }]);
  }
  return (
    <section className="terminal" aria-label="Interactive portfolio terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-bar"><span>● ● ●</span><span>interactive shell</span></div>
      <div className="terminal-output" aria-live="polite">{entries.map((entry, index) => <div key={`${entry.input}-${index}`}><p><span className="accent">saumil@agarwal:~$</span> {entry.input}</p>{entry.lines.map((line, lineIndex) => <p key={`${index}-${lineIndex}`}>{line}</p>)}</div>)}</div>
      <form onSubmit={submit}><label className="sr-only" htmlFor="terminal-command">Terminal command</label><span className="accent">saumil@agarwal:~$</span><input id="terminal-command" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => {
        if (event.key === "Tab") { event.preventDefault(); const completion = completeCommand(input); if (completion) setInput(completion); }
        if (event.key === "ArrowUp") { event.preventDefault(); const next = Math.min(historyIndex + 1, history.length - 1); setHistoryIndex(next); setInput(history[next] ?? ""); }
        if (event.key === "ArrowDown") { event.preventDefault(); const next = Math.max(historyIndex - 1, -1); setHistoryIndex(next); setInput(next < 0 ? "" : history[next]); }
      }} autoComplete="off" spellCheck={false} /></form>
    </section>
  );
}
