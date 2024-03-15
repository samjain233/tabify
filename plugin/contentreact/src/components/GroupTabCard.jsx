import React, { useEffect, useState } from "react";

const GroupTabCard = ({ tab }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <div
        className="relative bg-black/40 h-[25vh]  m-4 p-2 grid grid-rows-2 rounded-2xl shadow-md cursor-pointer hover:bg-black/50 hover:border hover:border-white transition-colors duration-100"
        onMouseEnter={() => {
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          setIsVisible(false);
        }}
      >
        <div className="p-2 w-full flex justify-center items-center">
          <img src={tab?.favicon} className="w-[50px]" />
        </div>
        {!isVisible && (
          <p className="p-2 text-white font-semibold text-lg text-center">
            {tab.name.length > 13
              ? tab.name.substring(0, 13) + "..."
              : tab.name}
          </p>
        )}
      </div>
    </>
  );
};

export default GroupTabCard;
