export interface AskProvider {
  answer(question: string): Promise<string>;
}
