import React from "react";
import TabCard from "./TabCard";

const Tabs = ({ tabs , port ,setDisplayPanel }) => {
  return (
    <>
      <div className="w-full grid grid-cols-5 h-[60vh] overflow-y-auto">
        {tabs.map((tab) => {
          return <TabCard tab={tab} port={port} setDisplayPanel={setDisplayPanel}/>;
        })}
      </div>
    </>
  );
};

export default Tabs;
