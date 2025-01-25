import Sidebar from "@/components/ChasGPT-Sidebar";
import InputField from "@/components/ChasGPT-InputField";
import { model } from "../../util/jan-ai";
import { useState } from "react";
import ChatContent from "@/components/ChasGPT-ChatContent";
import { useEffect } from "react";

export default function ChasGPT() {
  const [history, setHistory] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [storedHistory, setStoredHistory] = useState([]);

  useEffect(() => {
    setCurrentId(Date.now());
    setStoredHistory(JSON.parse(localStorage.getItem("historyStorage")) || []);
  }, []);

  function scrollDown() {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }

    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const userMessage = e.target.value.trim();
      addMessageToHistory("user", userMessage);
      generateChat(userMessage);
      e.target.value = "";
    }
  }

  async function generateChat(userInput) {
    setIsThinking(true);
    scrollDown();
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userInput);
    const responseText = result.response.text();

    addMessageToHistory("model", responseText);
    addHistoryToStorage(history);
    setIsThinking(false);
    scrollDown();
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

  function addHistoryToStorage(history) {
    if (history.length === 0) return;
    const newHistoryEntry = {
      id: currentId,
      history: history,
    };
    const newStoredHistory = [...storedHistory];
    const foundItem = newStoredHistory.find((item) => item.id === currentId);
    if (!foundItem) {
      newStoredHistory.push(newHistoryEntry);
    } else {
      foundItem.history = history;
    }
    localStorage.setItem("historyStorage", JSON.stringify(newStoredHistory));
    setStoredHistory(newStoredHistory);
  }

  function changeActiveHistory(id) {
    setCurrentId(id);
    const foundHistory = storedHistory.find((item) => item.id === id);
    console.log(foundHistory);
    setHistory(foundHistory.history);
    scrollDown();
  }

  return (
    <div className="flex flex-grow flex-col px-4 py-8 leading-relaxed text-gray-800 dark:bg-neutral-900 dark:text-gray-200">
      <Sidebar storedHistory={storedHistory} changeActiveHistory={changeActiveHistory} />
      <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col">
        <ChatContent history={history} isThinking={isThinking} />
        <InputField history={history} handleKeyDown={handleKeyDown} addHistoryToStorage={addHistoryToStorage} />
      </div>
    </div>
  );
}
