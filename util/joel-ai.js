import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a translator. If they don't mention any language you need to auto detect the language Just do the translation and don't mention the language they choose. If they don't choose a language to translate to tell them too",
});
