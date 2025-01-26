import { PiSidebar } from "react-icons/pi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

export default function Sidebar({ storedHistory, changeActiveHistory, currentId, deleteHistory, startNewChat }) {
  return (
    <div className="drawer sticky top-0 z-50 mr-auto grid">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex items-center gap-2 bg-base-100 py-2 lg:bg-transparent">
        <div className="tooltip text-sm font-semibold" data-tip="Sidebar">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
            <TbLayoutSidebarLeftExpand size={24} />
          </label>
        </div>
        <div className="tooltip text-sm font-semibold" data-tip="New Chat">
          <button className="btn btn-square btn-ghost pb-[2px]" onClick={startNewChat}>
            <FaRegPenToSquare size={20} />
          </button>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="min-h-full w-80 gap-2 bg-base-200 p-4 text-base-content">
          <li className="gap-2 px-4 py-2 font-bold">History</li>
          {storedHistory.map((item) => {
            const latestTextEntry = item.history[item.history.length - 1].parts[0].text;
            return (
              <li
                onClick={() => {
                  changeActiveHistory(item.id);
                }}
                className={`${currentId == item.id && "backdrop-brightness-90 dark:backdrop-brightness-150"} btn btn-ghost flex w-full flex-row flex-nowrap items-center`}
              >
                <p className="block truncate">{latestTextEntry}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHistory(item.id);
                  }}
                  className="btn btn-square btn-outline btn-error btn-sm ml-auto border-none"
                >
                  <TbTrash size={20} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
