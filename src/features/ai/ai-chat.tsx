"use client";

import { useEffect, useRef, useState } from "react";
import { suggestedQuestions } from "@/content/site";
import { scriptedProvider } from "./scripted-provider";

export function AiChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
  }, []);

  function stream(text: string) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnswer(text);
      setAnnouncement(text);
      setLoading(false);
      return;
    }
    let index = 0;
    timerRef.current = window.setInterval(() => {
      index += 3;
      setAnswer(text.slice(0, index));
      if (index >= text.length) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = undefined;
        setLoading(false);
        setAnnouncement(text);
      }
    }, 14);
  }

  async function ask(value = question) {
    if (!value.trim() || loading) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    setLoading(true);
    setAnswer("");
    setError("");
    try {
      const response = await scriptedProvider.answer(value);
      stream(response);
    } catch {
      setError("I couldn't answer that right now. Please try again.");
      setLoading(false);
    }
  }
  return (
    <div className="chat">
      <div className="suggestions">
        {suggestedQuestions.map((prompt) => (
          <button key={prompt} onClick={() => { setQuestion(prompt); void ask(prompt); }} disabled={loading}>{prompt}</button>
        ))}
      </div>
      <p className="chat-scope">A scripted guide to systems work, projects, and interests.</p>
      <div className="chat-answer">
        {loading && !answer ? "Thinking…" : answer || "Ask about Saumil’s systems work, projects, or interests."}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
      {error && <p role="alert">{error}</p>}
      <form onSubmit={(event) => { event.preventDefault(); void ask(); }}>
        <label htmlFor="ask-question">Your question</label>
        <div>
          <input id="ask-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="What did he build?" disabled={loading} />
          <button className="button primary" disabled={loading || !question.trim()}>Ask</button>
        </div>
      </form>
    </div>
  );
}
