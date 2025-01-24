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
      console.log(answerText);
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
                if (prompt != "") {
                  handleAnswer();
                } else {
                  alert("Why");
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
            {loading ? <span className="loading loading-bars loading-md"></span> : ""}
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
