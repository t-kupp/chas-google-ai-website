import Sidebar from "@/components/Jan-Sidebar";
import { model } from "../../util/ai";

import { useState } from "react";

export default function ChasGPT() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [currentConversation, setCurrentConversation] = [
    {
      prompt: "",
      answer: "",
    },
  ];

  function handleKeyDown(e) {
    if (e.key === "Enter" && prompt.trim() != "") {
      sendPrompt(prompt);
      setPrompt("");
      e.target.value = "";
    }
  }

  async function sendPrompt() {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    setAnswer(result.response.text());
  }

  return (
    <div className="flex min-h-[90vh] flex-col p-4">
      <div className="navbar">
        <Sidebar />
        <button className="btn btn-ghost">ChasGPT</button>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col">
        <div className="mb-12 mt-auto flex flex-col items-center gap-8">
          <div>
            <p>{answer}</p>
          </div>
          <h1 className="mb-8 text-3xl font-bold">What can I help with?</h1>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            placeholder="Message ChasGPT"
            className="input input-lg input-bordered w-full"
          />
        </div>
      </div>
    </div>
  );
}
