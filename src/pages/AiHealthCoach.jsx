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
    provide a concise, practical, and empathetic answer to: ${prompt}. 
    Respond with actionable tips in bullet points, considering the user's specific goals, preferences, and limitations. 
    Keep the tone supportive and motivational while maintaining professionalism.`;

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
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="card w-full max-w-md rounded-lg bg-white shadow-xl">
          <div className="card-body items-center text-center">
            <h1 className="card-title mb-4 text-3xl font-bold text-green-700">Welcome to your AI Health Coach!</h1>

            <p className="mb-6 text-gray-700">
              Tell us what you want to achieve, and we'll give you personalized recommendations.
            </p>

            <div className="card-actions">
              <button
                className="btn btn-lg bg-green-600 text-white hover:bg-green-700"
                onClick={() => setIsStarted(true)}
              >
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="card w-full max-w-xl rounded-lg bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4 text-2xl font-bold text-green-700">AI Health Coach 🌱</h2>

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
                // onKeyPress={(e) => e.key === "Enter" && sendPrompt()}
              />
            </div>
          )}

          <div className="mt-4">
            {isLoading ? (
              <div className="flex justify-center">
                <span className="loading loading-spinner loading-lg text-green-600"></span>
              </div>
            ) : (
              <div className="min-h-[200px] whitespace-pre-line rounded-lg bg-green-50 p-4">
                {answer || "Wait for a response from your personal health coach..."}
              </div>
            )}
          </div>

          <div className="card-actions mt-4 justify-end">
            <button
              className="btn bg-green-600 text-white hover:bg-green-700"
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
