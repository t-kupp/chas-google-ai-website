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
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-base-100 ">
      <h1 className="absolute left-[18px] top-[18px] text-xl font-semibold">CulinaryAI</h1>
      <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col gap-6">
        {recipe && (
          <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-800">
            <h2 className="text-2xl font-bold text-center mb-4">Your Recipe</h2>
            <div className="prose dark:prose-invert mx-auto whitespace-pre-wrap">
              {recipe}
            </div>
          </div>
        )}
        {isThinking && <div className="loading loading-spinner loading-lg mx-auto"></div>}

        <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-base-200">
          {!recipe && (
            <h1 className="flex flex-col mx-auto my-8 text-2xl place-items-center font-bold">
              <SiCodechef className="h-24" size={52} />
              What do you want to eat today?
            </h1>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            placeholder="Enter a main ingredient"
            className="input input-bordered w-full bg-base-100 placeholder-neutral-400 mb-4"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select cooking time (optional)</option>
              <option value="30 minutes">30 minutes</option>
              <option value="45 minutes">45 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1 hour 30 minutes">1 hour 30 minutes</option>
              <option value="2 hours">2 hours</option>
              <option value="3 hours">3 hours</option>
            </select>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="select select-bordered w-full"
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
              className="select select-bordered w-full"
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
              className="select select-bordered w-full"
            >
              <option value="">Select the complexity of the dish (optional)</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>

          <button
            onClick={sendRequest}
            className="btn btn-primary mx-auto mt-6 w-full bg-base hover:bg-base "
          >
            Get Cooking! <LuCookingPot />
          </button>
        </div>
      </div>
    </div>
  );
}
