import { useState } from "react";
import { model } from "../../util/joel-ai";

export default function LanguageTranslator() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("Översätt ");
  const [loading, setLoading] = useState(false);
  const [secondLanguage, setSecondLanguage] = useState("");

  async function handleAnswer() {
    setLoading(true);
    try {
      const result = await model.generateContent(`Över sätt från ${language} ${prompt} till ${secondLanguage}`);

      const answerText = result.response.text();
      setAnswer(answerText);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <div className="m-10">
        <h2 className="p-2 text-center text-3xl font-bold">Language Translator</h2>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex gap-6">
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue="Chose a language"
              onChange={(e) => {
                setLanguage(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option disabled value="Chose a language">
                Choose a language
              </option>

              <option value="English">English</option>
              <option value="Swedish">Swedish</option>
              <option value="Spanish">Spanish</option>
              <option value="Turkish">Turkish</option>
              <option value="French">French</option>
              <option value="Arabic">Arabic</option>
              <option value="Danish">Danish</option>
              <option value="Norwegian">Norwegian</option>
            </select>
            <button
              className="btn"
              onClick={() => {
                if (prompt == !"") {
                  handleAnswer();
                } else {
                  return (
                    <div role="alert" className="alert alert-warning">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <span>Warning: Invalid email address!</span>
                    </div>
                  );
                }
              }}
            >
              Translate
            </button>
          </div>

          <div>
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue="Chose a language"
              onChange={(e) => {
                setSecondLanguage(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option disabled value="Chose a language">
                Choose a language
              </option>

              <option value="English">English</option>
              <option value="Swedish">Swedish</option>
              <option value="Spanish">Spanish</option>
              <option value="Turkish">Turkish</option>
              <option value="French">French</option>
              <option value="Arabic">Arabic</option>
              <option value="Danish">Danish</option>
              <option value="Norwegian">Norwegian</option>
            </select>
          </div>
        </div>
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card grid h-32 flex-grow place-items-center rounded-box border-2 border-gray-400 shadow-xl">
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              name=""
              id=""
              className="h-28 w-full resize-none rounded-2xl p-2 outline-none"
              placeholder="Write something to translate..."
            ></textarea>
          </div>
          <div className="divider lg:divider-horizontal">
            {loading ? <span className="loading loading-bars loading-md"></span> : <span></span>}
          </div>
          <div className="card grid h-32 flex-grow place-items-center rounded-box border-2 border-gray-400 shadow-xl">
            <textarea
              name=""
              id=""
              disabled
              className="h-28 w-full resize-none rounded-2xl p-2 outline-none"
              placeholder="Translation..."
              value={answer}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
