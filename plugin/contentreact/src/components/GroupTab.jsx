import React from "react";
import GroupTabCard from "./GroupTabCard";

const GroupTab = ({ groupTabs }) => {
  return (
    <>
      <div className="tabify w-full grid grid-cols-5 gap-2 h-[60vh] overflow-y-auto">
        {groupTabs.map((tab) => {
          return <GroupTabCard tab={tab} />;
        })}
      </div>
    </>
  );
};

export default GroupTab;
