import { FaArrowUp } from "react-icons/fa";

export default function InputField({ history, handleKeyDown }) {
  return (
    <div className="sticky bottom-4 mt-auto flex flex-col pt-8 md:bottom-8">
      <div className="flex items-center justify-center">
        {history.length == 0 && <h1 className="my-8 text-2xl font-bold">What can I help with?</h1>}
      </div>
      <textarea
        onKeyDown={(e) => handleKeyDown(e)}
        type="text"
        placeholder="Message ChasGPT"
        className="textarea mx-auto !h-24 w-full resize-none rounded-3xl bg-base-200 px-5 py-3 text-base placeholder-neutral-600 shadow dark:placeholder-neutral-400"
      />
      <button
        onClick={() => alert("Under construction")}
        className="btn btn-circle btn-primary btn-sm absolute bottom-2 right-2"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}
