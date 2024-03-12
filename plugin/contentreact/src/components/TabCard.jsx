import React, { useEffect, useState } from "react";
import { IoIosOpen } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { GiPin } from "react-icons/gi";
import { IoDuplicate } from "react-icons/io5";
import { TbHexagonLetterA } from "react-icons/tb";
import { RiUnpinFill } from "react-icons/ri";
import { TbHexagonLetterD } from "react-icons/tb";
import { FaWindowClose } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";

const TabCard = ({ tab, port, setDisplayPanel }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleChangeTabClick = () => {
    setDisplayPanel(false);
    const changeActiveTab = {
      id: 7,
      tabId: tab.id,
      windowId: tab.windowId,
    };
    port.postMessage(changeActiveTab);
  };

  const deleteParticluarTabClick = () => {
    const deleteParticularTab = {
      id: 2,
      tabId: tab.id,
    };
    port.postMessage(deleteParticularTab);
  };

  const pinTab = () => {
    const PinParticularTab = {
      id: 3,
      tabId: tab.id,
    };
    port.postMessage(PinParticularTab);
  };

  const unPinTab = () => {
    const UnpinParticularTab = {
      id: 4,
      tabId: tab.id,
    };
    port.postMessage(UnpinParticularTab);
  };

  const duplicateTab = () => {
    const DuplicateParticularTab = {
      id: 5,
      tabId: tab.id,
    };
    port.postMessage(DuplicateParticularTab);
  };

  const arrangeTabsInAlphabeticalOrder = () => {
    const alphabeticalOrder = {
      id: 8,
    };
    port.postMessage(alphabeticalOrder);
  };

  const closeAllTabsExcept = () => {
    const closeAllTabsExcept = {
      id: 9,
      tabId: tab.id,
    };
    port.postMessage(closeAllTabsExcept);
  };

  const moveTabTOExtremeRight = () => {
    const moveTabtoright = {
      id: 11,
      tabId: tab.id,
    };
    port.postMessage(moveTabtoright);
  };

  return (
    <>
      <div
        className="relative bg-black/40 h-[25vh]  m-4 p-2 flex flex-col justify-center items-center rounded-2xl shadow-md cursor-pointer hover:bg-black/50 hover:border hover:border-white transition-colors duration-100"
        onMouseEnter={() => {
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          setIsVisible(false);
        }}
      >
        <div className="p-2 w-full flex justify-center items-center">
          <img src={tab?.favIconUrl} className="w-[50px]" />
        </div>
        <p className="p-2 text-white font-semibold text-lg">{tab.title}</p>

        <div
          className={`text-lg grid grid-cols-5 grid-rows-2 gap-1 absolute bottom-0 left-0 p-2 h-[50%] w-full bg-black/80 rounded-b-2xl transition-all duration-500 text-white ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
            onClick={handleChangeTabClick}
          >
            <IoIosOpen />
          </div>
          {!tab?.pinned && (
            <div
              className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
              onClick={pinTab}
            >
              <GiPin />
            </div>
          )}
          {tab?.pinned && (
            <div
              className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
              onClick={unPinTab}
            >
              <RiUnpinFill />
            </div>
          )}
          <div
            className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
            onClick={duplicateTab}
          >
            <IoDuplicate />
          </div>
          <div
            className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
            onClick={arrangeTabsInAlphabeticalOrder}
          >
            C
          </div>
          <div className="flex justify-center items-center">A</div>
          <div className="flex justify-center items-center">B</div>
          <div className="flex justify-center items-center">A</div>
          <div
            className="flex justify-center items-center  p-2 hover:bg-gray-500 rounded-md"
            onClick={moveTabTOExtremeRight}
          >
            <FaAngleDoubleRight />
          </div>

          <div
            className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
            onClick={deleteParticluarTabClick}
          >
            <IoCloseCircleSharp />
          </div>
          <div
            className="flex justify-center items-center  p-2 hover:bg-gray-500 rounded-md"
            onClick={closeAllTabsExcept}
          >
            <FaWindowClose />
          </div>
        </div>

        <div className="absolute top-0 left-0 p-2 w-full flex flex-wrap text-white">
          {tab?.active && (
            <div className="bg-lime-500 p-1 mx-1 rounded-full flex justify-center items-center">
              <TbHexagonLetterA />
            </div>
          )}
          {tab?.pinned && (
            <div className="bg-amber-500 p-1 mx-1 rounded-full flex justify-center items-center">
              <GiPin />
            </div>
          )}
          {tab?.duplicate && (
            <div className="bg-rose-500 p-1 mx-1 rounded-full flex justify-center items-center">
              <TbHexagonLetterD />
            </div>
          )}
          {tab?.isTabBookMarked && (
            <div className=" bg-blue-500 p-1 mx-1 rounded-full flex justify-center items-center">
              <FaBookmark />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TabCard;
