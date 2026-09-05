"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [isPaletteTyping, setIsPaletteTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<number | null>(null);
  const cwdRef = useRef<Directory>("/");
  const historyRef = useRef<string[]>([]);
  const isPaletteTypingRef = useRef(false);
  const runCommand = useCallback((command: string) => {
    if (!command) return;
    const commandCwd = cwdRef.current;
    const result = executeCommand(command, commandCwd, [...historyRef.current].reverse());
    setInput("");
    historyRef.current = [command, ...historyRef.current];
    setHistory(historyRef.current);
    setHistoryIndex(-1);
    if (result.kind === "clear") return setEntries([]);
    if (result.cwd) {
      cwdRef.current = result.cwd;
      setCwd(result.cwd);
    }
    applyCommandResult(result);
    setEntries((items) => [...items, { input: command, lines: result.lines ?? [], cwd: commandCwd }]);
  }, []);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (isPaletteTypingRef.current) return;
    runCommand(input.trim());
  }
  useEffect(() => {
    function runFromPalette(event: Event) {
      const command = (event as CustomEvent<{ command: string }>).detail.command;
      document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current?.focus();
      if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
      let position = 0;
      isPaletteTypingRef.current = true;
      setIsPaletteTyping(true);
      setInput("");
      typingTimerRef.current = window.setInterval(() => {
        position += 1;
        setInput(command.slice(0, position));
        if (position >= command.length) {
          if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
          isPaletteTypingRef.current = false;
          setIsPaletteTyping(false);
          runCommand(command);
        }
      }, 35);
    }
    window.addEventListener("terminal-run-command", runFromPalette);
    return () => {
      window.removeEventListener("terminal-run-command", runFromPalette);
      if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
    };
  }, [runCommand]);
  const prompt = (directory: Directory) => `saumil@agarwal:~${directory === "/" ? "" : directory}$`;
  return (
    <section className="terminal" aria-label="Interactive portfolio terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-bar"><span>● ● ●</span><span>interactive shell</span></div>
      <div className="terminal-output" aria-live="polite">{entries.map((entry, index) => <div key={`${entry.input}-${index}`}><p><span className="accent">{prompt(entry.cwd)}</span> <span className="terminal-command">{entry.input}</span></p>{entry.lines.map((line, lineIndex) => <p key={`${index}-${lineIndex}`}>{line}</p>)}</div>)}</div>
      <form onSubmit={submit}><label className="sr-only" htmlFor="terminal-command">Terminal command</label><span className="accent">{prompt(cwd)}</span><input id="terminal-command" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => {
        if (event.key === "Tab") { event.preventDefault(); const completion = completeCommand(input, cwd); if (completion) setInput(completion); }
        if (event.key === "ArrowUp") { event.preventDefault(); const next = Math.min(historyIndex + 1, history.length - 1); setHistoryIndex(next); setInput(history[next] ?? ""); }
        if (event.key === "ArrowDown") { event.preventDefault(); const next = Math.max(historyIndex - 1, -1); setHistoryIndex(next); setInput(next < 0 ? "" : history[next]); }
      }} autoComplete="off" spellCheck={false} readOnly={isPaletteTyping} aria-busy={isPaletteTyping} /></form>
    </section>
  );
}
