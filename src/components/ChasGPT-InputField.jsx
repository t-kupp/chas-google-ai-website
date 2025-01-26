import { FaSave } from "react-icons/fa";

export default function InputField({ history, handleKeyDown }) {
  return (
    <div className="sticky bottom-8 mt-auto flex flex-col pt-8">
      <div className="flex items-center justify-center">
        {history.length == 0 && <h1 className="my-8 text-2xl font-bold">What can I help with?</h1>}
      </div>
      <textarea
        onKeyDown={(e) => handleKeyDown(e)}
        type="text"
        placeholder="Message ChasGPT"
        className="textarea textarea-bordered mx-auto !h-24 w-full resize-none px-5 py-3 text-base shadow"
      />
    </div>
  );
}
