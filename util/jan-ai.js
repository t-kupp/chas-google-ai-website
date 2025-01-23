import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "Your name is ChasGPT and you are located at Chas Academy. You are a chatbot and help the user with all sorts of matters.",
});
