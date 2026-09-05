"use client";

import { useRef, useState } from "react";
import { completeCommand, executeCommand } from "./commands";
import { applyCommandResult } from "./result-handler";
import type { Directory } from "./types";

type Entry = { input: string; lines: string[]; cwd: Directory };

const helpResult = executeCommand("help");
const initialEntries: Entry[] = [{ input: "help", lines: helpResult.lines ?? [], cwd: "/" }];

export function Terminal() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cwd, setCwd] = useState<Directory>("/");
  const inputRef = useRef<HTMLInputElement>(null);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    const result = executeCommand(command, cwd, [...history].reverse());
    setInput("");
    setHistory((items) => [command, ...items]);
    setHistoryIndex(-1);
    if (result.kind === "clear") return setEntries([]);
    if (result.cwd) setCwd(result.cwd);
    applyCommandResult(result);
    setEntries((items) => [...items, { input: command, lines: result.lines ?? [], cwd }]);
  }
  const prompt = (directory: Directory) => `saumil@agarwal:~${directory === "/" ? "" : directory}$`;
  return (
    <section className="terminal" aria-label="Interactive portfolio terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-bar"><span>● ● ●</span><span>interactive shell</span></div>
      <div className="terminal-output" aria-live="polite">{entries.map((entry, index) => <div key={`${entry.input}-${index}`}><p><span className="accent">{prompt(entry.cwd)}</span> <span className="terminal-command">{entry.input}</span></p>{entry.lines.map((line, lineIndex) => <p key={`${index}-${lineIndex}`}>{line}</p>)}</div>)}</div>
      <form onSubmit={submit}><label className="sr-only" htmlFor="terminal-command">Terminal command</label><span className="accent">{prompt(cwd)}</span><input id="terminal-command" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => {
        if (event.key === "Tab") { event.preventDefault(); const completion = completeCommand(input, cwd); if (completion) setInput(completion); }
        if (event.key === "ArrowUp") { event.preventDefault(); const next = Math.min(historyIndex + 1, history.length - 1); setHistoryIndex(next); setInput(history[next] ?? ""); }
        if (event.key === "ArrowDown") { event.preventDefault(); const next = Math.max(historyIndex - 1, -1); setHistoryIndex(next); setInput(next < 0 ? "" : history[next]); }
      }} autoComplete="off" spellCheck={false} /></form>
    </section>
  );
}
