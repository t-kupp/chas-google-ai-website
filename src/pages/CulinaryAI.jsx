import { model } from "../../util/naayav-ai";
import { useState } from "react";

export default function RecipePrompt() {
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter" && input.trim() !== "") {
      const userMessage = input.trim();
      setInput("");
      generateRecipe(userMessage);
    }
  }

  async function generateRecipe(userInput) {
    setIsThinking(true);
    try {
      const result = await model.generateContent(`Give me a recipe for ${userInput}`);
      const recipeText = result.response.text();
      setRecipe(recipeText || "No recipe found.");
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe("An error occurred. Please try again later.");
    } finally {
      setTimeout(() => {
        setIsThinking(false);
      }, 500); 
    }
  }

  return (
    <div className="flex flex-grow flex-col px-4 py-8 bg-base-200">
      <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col">
        <div className="flex max-h-full flex-col gap-4">
          {recipe && (
            <div className="chat chat-start">
              <div className="chat-bubble whitespace-pre-wrap">{recipe}</div>
            </div>
          )}
          {isThinking && <div className="loading loading-spinner loading-lg mx-auto"></div>}
        </div>
        <div className="sticky bottom-8 mt-auto flex flex-col pt-8">
          {!recipe && <h1 className="mx-auto my-8 text-2xl font-bold">What do you want to eat today?</h1>}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            placeholder="Enter a dish or ingredient"
            className="input input-bordered mx-auto h-16 w-full max-w-xl rounded-3xl bg-base-100 placeholder-neutral-400"
          />
        </div>
      </div>
    </div>
  );
}