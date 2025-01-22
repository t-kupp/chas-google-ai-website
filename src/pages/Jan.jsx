import Sidebar from "@/components/Jan-Sidebar";
import { model } from "../../util/ai";

import { useState } from "react";

export default function ChasGPT() {
  const aiResponse = "Test";
  const [prompt, setPrompt] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter" && prompt.trim() != "") {
      console.log(prompt);
      setPrompt("");
      e.target.value = "";
    }
  }

  return (
    <div className="flex min-h-[90vh] flex-col">
      <div className="navbar">
        <Sidebar />
        <button className="btn btn-ghost">ChasGPT</button>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col items-center justify-center">
        <div>
          <p>{aiResponse}</p>
        </div>
        <div className="flex w-full flex-col items-center">
          <h1 className="mb-8 text-3xl font-bold">What can I help with?</h1>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            placeholder="Message ChasGPT"
            className="input input-lg input-bordered size w-full"
          />
        </div>
      </div>
    </div>
  );
}
