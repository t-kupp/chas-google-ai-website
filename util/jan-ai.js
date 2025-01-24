import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "If the user greets you greet them back with your name ChasGPT, otherwise just answer the question. You are a chatbot and help the user with all sorts of matters.",
});
