import { GoogleGenAI } from "@google/genai";

console.log("✅ REAL gemini.js file loaded");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });
  return response.text;
}

export default main;