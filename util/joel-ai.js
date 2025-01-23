import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a translator, they will write a language and then translate it into that language. If they don't mention a language translate it into swedish. Just do the translation and don't mention the language they choose",
});
