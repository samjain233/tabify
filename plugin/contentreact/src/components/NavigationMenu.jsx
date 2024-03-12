import React from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { HiMiniWindow } from "react-icons/hi2";
import { FaRegWindowRestore } from "react-icons/fa";

const NavigationMenu = ({ port, tabs, windowVariable, setMessage }) => {
  const removeDuplicateTabs = () => {
    const removeDupTabs = {
      id: 12,
      tabs: tabs,
    };
    port.postMessage(removeDupTabs);
  };

  const changeCurrentWindowVariable = (value) => {
    const windowVar = {
      id: 13,
      value: value,
    };
    port.postMessage(windowVar);
  };
  return (
    <>
      <div className="flex px-2 mt-1">
        <div
          className="bg-black/60 p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500"
          onClick={removeDuplicateTabs}
          onMouseEnter={() => {
            setMessage("Remove alll Duplicate Tabs");
          }}
          onMouseLeave={() => {
            setMessage("");
          }}
        >
          <RiDeleteBinFill />
        </div>
        <div
          className={`${
            !windowVariable ? "bg-black/60" : "bg-black/80"
          } p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500`}
          onClick={() => changeCurrentWindowVariable(true)}
          onMouseEnter={() => {
            setMessage("Show tabs of current window");
          }}
          onMouseLeave={() => {
            setMessage("");
          }}
        >
          <HiMiniWindow />
        </div>
        <div
          className={`${
            windowVariable ? "bg-black/60" : "bg-black/80"
          } p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500`}
          onClick={() => changeCurrentWindowVariable(false)}
          onMouseEnter={() => {
            setMessage("show all tabs");
          }}
          onMouseLeave={() => {
            setMessage("");
          }}
        >
          <FaRegWindowRestore />
        </div>
        <div className="m-1">a</div>
        <div className="m-1">a</div>
      </div>
    </>
  );
};

export default NavigationMenu;
