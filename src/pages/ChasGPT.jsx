import Sidebar from "@/components/ChasGPT-Sidebar";
import { model } from "../../util/jan-ai";
import { useState } from "react";

export default function ChasGPT() {
  const [history, setHistory] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }

    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const userMessage = e.target.value.trim();
      e.target.value = "";
      addMessageToHistory("user", userMessage);
      generateChat(userMessage);
    }
  }

  function addMessageToHistory(role, text) {
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        role,
        parts: [{ text }],
      },
    ]);
  }

  function scrollDown() {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  }

  async function generateChat(userInput) {
    setIsThinking(true);
    scrollDown();
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userInput);
    const responseText = result.response.text();

    addMessageToHistory("model", responseText);
    setIsThinking(false);
    scrollDown();
  }

  function processText(text) {
    const parts = text.split(/(\*\*.+?\*\*)/);
    return parts.map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
    );
  }

  return (
    <div className="flex flex-grow flex-col px-4 py-8 leading-relaxed text-gray-800 dark:bg-neutral-900 dark:text-gray-200">
      <div className="navbar">
        <Sidebar />
        <button className="btn btn-ghost">ChasGPT</button>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col">
        <div className="flex max-h-full flex-col gap-4">
          {history.map((entry, index) => (
            <div key={index} className={`chat gap-1 ${entry.role === "user" ? "chat-end" : "chat-start"}`}>
              {entry.role === "model" && (
                <div className="avatar chat-image self-start p-1">
                  <div className="w-8 rounded-full">
                    <img src="/chas-logo-small.png" alt="Chas Logo" />
                  </div>
                </div>
              )}
              <div className={`${entry.role === "user" ? "chat-bubble" : ""} whitespace-pre-wrap px-4 py-2`}>
                {entry.parts.map((part) => processText(part.text))}
              </div>
            </div>
          ))}
          {isThinking && <div className="loading loading-spinner loading-lg mx-auto"></div>}
        </div>
        <div className="sticky bottom-8 mt-auto flex flex-col pt-8">
          {history.length == 0 && <h1 className="mx-auto my-8 text-2xl font-bold">What can I help with?</h1>}{" "}
          <textarea
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            placeholder="Message ChasGPT"
            className="textarea mx-auto !h-24 w-full resize-none rounded-3xl border-none bg-neutral-100 px-5 py-3 text-base placeholder-neutral-600 dark:bg-neutral-800 dark:placeholder-neutral-400"
          />
        </div>
      </div>
    </div>
  );
}
