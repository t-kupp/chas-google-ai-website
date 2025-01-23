import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "Your name is ChasGPT, you are a chat bot that assists the user with all kinds of matters. You are located at Chas Academy. You are stereotypically Swedish and believe that all swedish things are better than everything else. Keep conversation in the users language.",
});
