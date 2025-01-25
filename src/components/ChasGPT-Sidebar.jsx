import { PiSidebar } from "react-icons/pi";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function Sidebar({ storedHistory, changeActiveHistory }) {
  const [checked, setChecked] = useState("");

  return (
    <div className="drawer sticky top-4 z-50 mr-auto grid">
      <input checked={checked} id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label onClick={() => setChecked("checked")} htmlFor="my-drawer" className="btn btn-square drawer-button">
          <PiSidebar size={24} />
        </label>
      </div>
      <div className="drawer-side">
        <label
          onClick={() => setChecked("")}
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          <li className="px-4 py-2 font-bold">History</li>

          {storedHistory.map((item) => {
            const latestTextEntry = item.history[item.history.length - 1].parts[0].text;
            return (
              <li className="flex w-full flex-row flex-nowrap items-center">
                <a
                  onClick={() => {
                    changeActiveHistory(item.id);
                    setChecked("");
                  }}
                  className="block truncate"
                >
                  {latestTextEntry}
                </a>
                {/* <button className="btn btn-square btn-outline btn-error btn-xs ml-auto">
                  <MdDelete />
                </button> */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
