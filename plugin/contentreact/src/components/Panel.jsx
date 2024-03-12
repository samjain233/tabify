/*global chrome*/
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Tabs from "./Tabs";

const Panel = () => {
  const [displayPanel, setDisplayPanel] = useState(false);
  const [simultaneousPress, setSimultaneousPress] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedTabs, setSearchedTabs] = useState([]);
  const port = chrome.runtime.connect({ name: "tabify" });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.code === "KeyQ") {
        setSimultaneousPress(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "KeyQ") {
        setSimultaneousPress(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    //getting all tabs
    getAllTabsInfo();
  }, []);

  useEffect(() => {
    port.onMessage.addListener(function (response) {
      console.log(response);
      const { id } = response;
      if (id === 1) {
        const { data } = response;

        const urlMap = {};

        data.forEach((obj) => {
          if (urlMap[obj.url] === undefined) {
            urlMap[obj.url] = true;
            obj.duplicate = false;
          } else {
            obj.duplicate = true;
          }
        });
        setTabs(data);
      } else if (id === 10) {
        setDisplayPanel(false);
      }
    });
  }, [port]);

  useEffect(() => {
    if (simultaneousPress) {
      setDisplayPanel((prevState) => !prevState);
      getAllTabsInfo();
    }
  }, [simultaneousPress]);

  useEffect(() => {
    setEffectiveTabs();
  }, [search, tabs]);

  //content.js to background.js ---------------------------------------------------------
  const getAllTabsInfo = () => {
    const getAllTabs = {
      id: 1,
    };
    port.postMessage(getAllTabs);
  };

  //-------------------------------------------------------------------------------------

  const setEffectiveTabs = () => {
    if (search !== "") {
      let filteredTabs = tabs.filter((tab) => {
        return (
          tab.title.toLowerCase().includes(search.toLowerCase()) ||
          tab.url.toLowerCase().includes(search.toLowerCase())
        );
      });
      setSearchedTabs(filteredTabs);
    } else {
      setSearchedTabs(tabs);
    }
  };

  return (
    <>
      {displayPanel && (
        <div className="z-[999999] fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div className="h-[80%] w-[80%] backdrop-blur-md bg-black/20 rounded-2xl shadow-md">
            <SearchBar search={search} setSearch={setSearch} />
            <Tabs
              tabs={searchedTabs}
              port={port}
              setDisplayPanel={setDisplayPanel}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Panel;
