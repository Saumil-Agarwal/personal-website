import { profile, qa } from "@/content/site";
import type { AskProvider } from "./types";

function words(value: string) {
  return new Set(value.toLowerCase().match(/[a-z0-9]+/g) ?? []);
}

export const scriptedProvider: AskProvider = {
  async answer(question) {
    const query = words(question);
    if (query.size === 0) throw new Error("Please enter a question.");
    const ranked = qa.map((entry) => ({
      entry,
      score: entry.keywords.filter((keyword) => query.has(keyword.toLowerCase())).length,
    })).sort((a, b) => b.score - a.score);
    if (!ranked[0] || ranked[0].score === 0) {
      return `Here's what I know: ${profile.summary} Try asking about systems, projects, or opportunities.`;
    }
    return ranked[0].entry.answer;
  },
};
