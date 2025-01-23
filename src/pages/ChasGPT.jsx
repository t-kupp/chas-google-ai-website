import Sidebar from "@/components/ChasGPT-Sidebar";
import { model } from "../../util/jan-ai";
import { useState } from "react";

export default function ChasGPT() {
  const [history, setHistory] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  function handleKeyDown(e) {
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

  return (
    <div className="flex min-h-[90vh] flex-col px-4 py-8">
      <div className="navbar">
        <Sidebar />
        <button className="btn btn-ghost">ChasGPT</button>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col">
        <div className="flex max-h-full flex-col gap-4">
          {console.log(history)}
          {history.map((entry, index) => (
            <div key={index} className={`chat ${entry.role === "user" ? "chat-end" : "chat-start"}`}>
              <div className={entry.role === "user" && "chat-bubble"}>
                {entry.parts.map((part) => part.text).join(" ")}
              </div>
            </div>
          ))}
          {isThinking && <div className="loading loading-spinner loading-lg mx-auto"></div>}
        </div>
        <div className="sticky bottom-8 mt-auto flex flex-col pt-8">
          {history.length == 0 && <h1 className="mx-auto my-8 text-2xl font-bold">What can I help with?</h1>}{" "}
          <input
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
