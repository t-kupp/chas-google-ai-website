import { FaSave } from "react-icons/fa";

export default function InputField({ history, handleKeyDown, addHistoryToStorage }) {
  return (
    <div className="sticky bottom-8 mt-auto flex flex-col pt-8">
      <div className="flex items-center justify-center">
        {history.length == 0 && <h1 className="my-8 text-2xl font-bold">What can I help with?</h1>}
        {/* <button className="btn btn-square btn-primary absolute right-0" onClick={() => addHistoryToStorage(history)}>
          <FaSave size={16} />
        </button> */}
      </div>
      <textarea
        onKeyDown={(e) => handleKeyDown(e)}
        type="text"
        placeholder="Message ChasGPT"
        className="textarea mx-auto !h-24 w-full resize-none border-none px-5 py-3 text-base"
      />
    </div>
  );
}
