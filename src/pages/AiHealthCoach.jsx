import React, { useState } from "react";
import { model } from "../../util/ai";

// Defines the available categories and subcategories for health
const healthCategories = [
  {
    category: "Nutrition",
    subcategories: ["Important Nutrients", "Dietary Advice", "Weight Management", "Meal Planning"],
  },
  {
    category: "Exercise",
    subcategories: ["Strength Training", "Cardio Training", "Stretching", "Home Workouts"],
  },
  {
    category: "Mental Health",
    subcategories: ["Stress Management", "Sleep Routines", "Mindfulness", "Emotional Well-being"],
  },
];

export default function AiHealthCoach() {
  // The states that are used to store the user's choices and AI's response
  const [isStarted, setIsStarted] = useState(false); //if user started using AI
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false); //loading spinner state

  // Function to send the prompt to AI and handle the response
  async function sendPrompt() {
    // All fields must be filled before sending
    if (!selectedCategory || !selectedSubcategory || !prompt.trim()) return;

    setIsLoading(true); // Shows loading spinner
    setAnswer("");

    // Full prompt for the AI
    const fullPrompt = `As a professional health coach in ${selectedCategory} and ${selectedSubcategory}, 
    provide a detailed, actionable, and empathetic response to: ${prompt}. 
    Offer practical tips and advice in simple bullet points (using "-" or "•") with no bold text or markdown formatting. 
    Ensure the response is thorough and doesn't require any follow-up questions, but keep it to the most important information so that the response is not too overwhelming. 
    Maintain a supportive, motivational, and professional tone throughout.`;

    // Send the prompt to the AI and get a text response
    const result = await model.generateContent(fullPrompt);
    setAnswer(result.response.text());
    setIsLoading(false); // Hides the loading spinner
  }

  // Get the subcategories available for the selected category
  const availableSubcategories = healthCategories.find((cat) => cat.category === selectedCategory)?.subcategories || [];

  // Homepage AI Health Coach
  if (!isStarted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 p-6 sm:p-8 dark:bg-neutral-900">
        <div className="card m-8 w-full max-w-lg rounded-2xl bg-gradient-to-tl from-green-100 to-white shadow-2xl">
          <div className="card-body items-center p-10 text-center">
            <h1 className="mb-4 text-4xl font-semibold text-black">
              Your AI Health Coach
              <span className="block text-lg font-medium text-green-600">is Ready to Help You 🌱</span>
            </h1>

            <p className="mx-auto mb-8 max-w-md text-lg text-gray-700">
              Share your goals, and we'll provide personalized recommendations to help you achieve them.
            </p>

            <div className="card-actions">
              <button className="btn btn-lg bg-black text-white hover:bg-green-500" onClick={() => setIsStarted(true)}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Health Coach form
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 p-6 sm:p-8 dark:bg-neutral-900">
      <div className="card w-full max-w-xl rounded-2xl bg-gradient-to-tl from-green-100 to-white shadow-2xl">
        <div className="card-body p-10 text-center">
          <h2 className="card-title mb-4 text-3xl font-semibold text-black">AI Health Coach 🌱 </h2>

          <div className="form-control mb-4 w-full">
            <label className="label text-green-700">
              <span className="label-text">Choose Health Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory("");
              }}
            >
              <option value="">Select Category</option>
              {healthCategories.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div className="form-control mb-4 w-full">
              <label className="label text-green-700">
                <span className="label-text">Choose Specific Area</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">Select Area</option>
                {availableSubcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedSubcategory && (
            <div className="form-control mb-4 w-full">
              <label className="label text-green-700">
                <span className="label-text">Ask Your Specific Question</span>
              </label>
              <input
                type="text"
                placeholder={`Ask about ${selectedSubcategory}`}
                className="input input-bordered w-full"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          )}

          <div className="mt-4">
            {isLoading ? (
              <div className="flex justify-center">
                <span className="loading loading-spinner loading-lg text-green-600"></span>
              </div>
            ) : (
              <div className="min-h-[200px] whitespace-pre-line rounded-lg bg-gray-100 p-4 text-left text-black dark:bg-gray-700 dark:text-white">
                {answer || "Your health coach's response will appear here...."}
              </div>
            )}
          </div>

          <div className="card-actions mt-4 justify-end">
            <button
              className="btn bg-black text-white hover:bg-green-500 disabled:text-gray-500"
              onClick={sendPrompt}
              disabled={!selectedCategory || !selectedSubcategory || !prompt.trim() || isLoading}
            >
              Send Question
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 max-w-xl text-center text-sm text-gray-600">
        <p>Note: This is an AI assistant. Advice should not replace professional medical advice.</p>
      </div>
    </div>
  );
}
