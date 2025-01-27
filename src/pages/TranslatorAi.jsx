import { useState } from "react";
import { model } from "../../util/joel-ai";
import { RxCrossCircled } from "react-icons/rx";
import { GrLanguage } from "react-icons/gr";
import { MdOutlineTranslate } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

export default function LanguageTranslator() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [secondLanguage, setSecondLanguage] = useState("");
  const [textArr, setTextArr] = useState([]);
  const [number, setNumber] = useState(1);
  const [showTable, setShowTable] = useState(true);

  // Work on this later
  let warningText = "Warning: You need to write something in the textfield!";

  function handleTextArr(answer2) {
    setTextArr([
      ...textArr,
      {
        id: number,
        translatedFrom: language,
        translatedTo: secondLanguage,
        sentence: prompt,

        translatedSentence: answer2,
      },
    ]);
    setNumber(number + 1);
  }

  function removeRow(id) {
    const newTextArr = textArr.filter((text) => text.id != id);
    setTextArr(newTextArr);
  }

  async function handleAnswer() {
    setLoading(true);
    try {
      const result = await model.generateContent(
        `Översätt från ${language} med ordet ${prompt} till ${secondLanguage}`,
      );

      const answerText = result.response.text();

      setAnswer(() => {
        handleTextArr(answerText);
        return answerText;
      });

      setTimeout(() => {
        setLoading(false);
      }, 700);

      setNumber(number + 1);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <h1 className="absolute left-[18px] top-[18px] text-xl font-semibold">TranslatorAI</h1>
      {warning ? (
        <div role="alert" className="alert alert-warning absolute transition-all duration-500 ease-in">
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
          <span> {warningText} </span>
          <button
            onClick={() => {
              setWarning(false);
            }}
          >
            <RxCrossCircled className="rounded-full transition-all duration-300 hover:text-white" size={20} />
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="m-10 mt-40">
        <h2 className="m-10 flex items-center justify-center gap-4 p-2 text-center text-xl font-bold sm:text-3xl">
          Language Translator AI <GrLanguage />
        </h2>

        <div className="flex w-full flex-col gap-4 lg:flex-row">
          <div className="lg:w-6/12">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex gap-6">
                <select
                  className="select select-bordered w-full max-w-xs"
                  defaultValue="Choose a language"
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                >
                  <option disabled value="Choose a language">
                    Choose a language
                  </option>

                  <option value="Auto Detect">Auto detect</option>
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

                      handleTextArr();
                    } else if (prompt == "") {
                      warningText = "Warning: You need to write something in the textfield!";
                      setWarning(true);
                      setTimeout(() => {
                        setWarning(false);
                      }, 10000);
                    }
                  }}
                >
                  Translate
                </button>
              </div>
            </div>
            <div className="card grid h-32 flex-grow place-items-center rounded-box border-2 border-gray-400 shadow-xl">
              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                name=""
                id=""
                className="h-28 w-full resize-none rounded-2xl bg-base-100 p-2 outline-none"
                placeholder="Write something to translate..."
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p></p>
            {loading ? <span className="loading loading-spinner loading-md top-[27%]"></span> : ""}
          </div>
          <div className="flex flex-col justify-center gap-4 lg:w-6/12">
            <div className="flex justify-start gap-4">
              <select
                className="select select-bordered w-full max-w-xs"
                defaultValue="Choose a language"
                required
                onChange={(e) => {
                  setSecondLanguage(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option disabled value="Choose a language">
                  Choose a language to translate to
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
                  setAnswer("");
                  setPrompt("");
                }}
              >
                Clear All
              </button>
            </div>
            <div className="card grid h-32 flex-grow place-items-center rounded-box border-2 border-gray-400 shadow-xl">
              <textarea
                name=""
                id=""
                disabled
                className="h-28 w-full resize-none rounded-2xl bg-base-100 p-2 outline-none"
                placeholder="Translation..."
                value={answer}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      {/* Later make a varible so they can choose to show translations that they have done // Finished */}
      <div className="overflow-x-auto">
        <label
          className="m-10 flex cursor-pointer justify-end gap-2"
          onChange={() => {
            if (showTable) {
              setShowTable(false);
            } else {
              setShowTable(true);
            }
          }}
        >
          <span className="label-text">Show History</span>
          <input type="checkbox" value="synthwave" className="theme-controller toggle" />
          <span className="label-text">Hide history</span>
        </label>

        {showTable ? (
          <table className="table">
            {/* head */}

            <thead>
              <tr>
                <th></th>
                <th className="text-sm sm:text-xs">Translated from</th>
                <th className="sm: text-sm">Translated to</th>
                <th className="sm: text-sm">Sentence</th>
                <th className="sm: text-sm">Translated Sentence</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {textArr.map((sentence, index) => {
                return (
                  <tr key={index}>
                    <th> {sentence.id} </th>
                    <td> {sentence.translatedFrom}</td>
                    <td> {sentence.translatedTo} </td>
                    <td> {sentence.sentence} </td>
                    <td> {sentence.translatedSentence} </td>
                    <td
                      onClick={(e) => {
                        removeRow(sentence.id);
                      }}
                      className="tooltip text-center font-bold hover:cursor-pointer"
                      data-tip="Delete"
                    >
                      <FaTrashCan size={20} />{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
