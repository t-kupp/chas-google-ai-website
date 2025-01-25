import { PiSidebar } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";

export default function Sidebar({ storedHistory, changeActiveHistory, currentId, deleteHistory }) {
  return (
    <div className="drawer sticky top-4 z-50 mr-auto grid">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-square drawer-button">
          <PiSidebar size={24} />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="min-h-full w-80 bg-base-200 p-4 text-base-content">
          <li className="px-4 py-2 font-bold">History</li>
          {storedHistory.map((item) => {
            const latestTextEntry = item.history[item.history.length - 1].parts[0].text;
            return (
              <li
                onClick={() => {
                  changeActiveHistory(item.id);
                }}
                className={`${currentId == item.id && "bg-neutral-300 dark:bg-slate-700"} btn flex w-full flex-row flex-nowrap items-center`}
              >
                <p className="block truncate p-2">{latestTextEntry}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHistory(item.id);
                  }}
                  className="btn btn-square btn-outline btn-error btn-sm ml-auto border-none"
                >
                  <TbTrash size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
