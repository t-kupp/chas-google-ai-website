import { model } from "../../util/naayav-ai";
import { useState } from "react";
import { LuCookingPot } from "react-icons/lu";
import { SiCodechef } from "react-icons/si";


export default function RecipePrompt() {
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [country, setCountry] = useState("");
  const [people, setPeople] = useState("");
  const [complexity, setComplexity] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter" && input.trim() !== "") {
      sendRequest();
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  }

  async function sendRequest() {
    setIsThinking(true);
    const promptParts = [`Give me a recipe for ${input}`];

    if (cookingTime) promptParts.push(`that can be cooked in ${cookingTime}`);
    if (country) promptParts.push(`from ${country}`);
    if (people) promptParts.push(`for ${people} people`);
    if (complexity) promptParts.push(`for ${complexity}`);

    const fullPrompt = promptParts.join(", ");

    try {
      const result = await model.generateContent(fullPrompt);
      const recipeText = result.response.text();
      setRecipe(recipeText || "No recipe found.");
      scrollToBottom();
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
    <div className="flex flex-grow flex-col px-4 py-8 bg-base-200 dark:bg-neutral-900">
      <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col">
        <div className="flex max-h-full flex-col gap-4">
          {recipe && (
            <div className="chat chat-start">
              <div className="chat-bubble whitespace-pre-wrap">{recipe}</div>
            </div>
          )}
          {isThinking && <div className="loading loading-spinner loading-lg mx-auto"></div>}
        </div>
        <div className="sticky bottom-8 mt-auto flex flex-col pt-8 ">
          {!recipe && <h1 className="flex flex-col mx-auto my-8 text-2xl place-items-center font-bold p-8"> <SiCodechef className="h-24" size={52} />
            What do you want to eat today?
            </h1>}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            placeholder="Enter a main ingredient"
            className="input input-bordered mx-auto w-full max-w-xl bg-base-100 placeholder-neutral-400"
          />

          <div className="mt-4 flex flex-col gap-4">
            <select
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              className="select select-bordered w-full max-w-xl mx-auto"
            >
              <option value="">Select cooking time (optional)</option>
              <option value="30 minutes">30 minutes</option>
              <option value="45 minutes">45 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1 hour 30 minutes">1 hour 30 minutes</option>
              <option value="2 hours">2 hours</option>
              <option value="2 hours">3 hours</option>
            </select>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="select select-bordered w-full max-w-xl mx-auto"
            >
              <option value="">Select country (optional)</option>
              <option value="Italy">Italy</option>
              <option value="India">India</option>
              <option value="Mexico">Mexico</option>
              <option value="France">France</option>
              <option value="China">China</option>
              <option value="Japan">Japan</option>
              <option value="Spain">Spain</option>
              <option value="Russia">Russia</option>
              <option value="Turkey">Turkey</option>
              <option value="Germany">Germany</option>
              <option value="Brazil">Brazil</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>

            <select
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="select select-bordered w-full max-w-xl mx-auto"
            >
              <option value="">Select number of people (optional)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>

            <select
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              className="select select-bordered w-full max-w-xl mx-auto"
            >
              <option value="">Select the complexity of the dish (optional)</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>

          <button
            onClick={sendRequest}
            className="btn btn-primary mx-auto mt-6 w-full max-w-xl"
          >
            Get Cooking! <LuCookingPot />

          </button>
        </div>
      </div>
    </div>
  );
}
