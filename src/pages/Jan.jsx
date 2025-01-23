import Sidebar from "@/components/Jan-Sidebar";
import { model } from "../../util/ai";

import { useState } from "react";

export default function ChasGPT() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayPrompt, setDisplayPrompt] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter" && prompt.trim() != "") {
      sendPrompt(prompt);
      setDisplayPrompt(prompt);
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
    <div className="flex min-h-[90vh] flex-col px-4 py-8">
      <div className="navbar">
        <Sidebar />
        <button className="btn btn-ghost">ChasGPT</button>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col">
        <div className="flex flex-col gap-4">
          <div className="chat chat-start">{displayPrompt && <div className="chat-bubble">{displayPrompt}</div>}</div>
          <div className="chat chat-end">{answer && <div className="chat-bubble">{answer}</div>}</div>
        </div>
        <div className="mt-auto flex flex-col">
          {!displayPrompt && <h1 className="mx-auto my-8 text-2xl font-bold">What can I help with?</h1>}
          <input
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            placeholder="Message ChasGPT"
            className="input input-bordered mx-auto h-16 w-full max-w-xl"
          />
        </div>
      </div>
    </div>
  );
}
