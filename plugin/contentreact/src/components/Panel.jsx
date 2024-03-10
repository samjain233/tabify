import React, { useState, useEffect } from "react";

const Panel = () => {
  const [displayPanel, setDisplayPanel] = useState(false);
  const [simultaneousPress, setSimultaneousPress] = useState(false);

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
    if (simultaneousPress) {
      setDisplayPanel((prevState) => !prevState);
    }
  }, [simultaneousPress]);

  return (
    <>
      {displayPanel && (
        <div className="z-[999999] fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div className="h-[80%] w-[80%] backdrop-blur-md bg-white/30 rounded-2xl shadow-md"></div>
        </div>
      )}
    </>
  );
};

export default Panel;
