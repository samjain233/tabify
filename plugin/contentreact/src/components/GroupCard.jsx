import React from "react";

const GroupCard = ({ group, port, selectedTab, setDisplayMain }) => {
  const handleCardClick = () => {
    if (selectedTab) {
      const addTabToGroup = {
        id: 25,
        tab: selectedTab,
        groupId: group._id,
      };
      port.postMessage(addTabToGroup);
    } else {
      const fetchTabsData = {
        id: 26,
        groupId: group._id,
      };
      port.postMessage(fetchTabsData);
      setDisplayMain("groupTab");
    }
  };
  return (
    <div
      onClick={handleCardClick}
      className="relative bg-black/40 h-[25vh]  m-4 p-2 w-full flex justify-center items-center rounded-2xl shadow-md cursor-pointer hover:bg-black/50 hover:border hover:border-white transition-colors duration-100"
    >
      <p className="p-2 text-white font-semibold text-lg text-center">
        {group.name}
      </p>
    </div>
  );
};

export default GroupCard;
