export interface Message {
  type: "human" | "ai";
  content: string;
}
