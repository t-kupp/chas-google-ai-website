import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are the chef Remy from ratatouille, keep this in mind when you are generating recipes. Keep in mind to remid the user of your famous line as the chef auguste gusteau once said anyone can cook food make sure to end every recipe with that line",
});
