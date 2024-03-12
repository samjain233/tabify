let currentWindow = false;
(async () => {
  chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === "tabify");
    port.onMessage.addListener(function (msg) {
      const { id } = msg;
      switch (id) {
        case 1:
          sendAllTabs(id);
          break;
        case 2:
          DeleteParticularTab(id, msg.tabId);
          break;
        case 3:
          PinParticularTab(id, msg.tabId);
          break;
        case 4:
          UnpinParticularTab(id, msg.tabId);
          break;
        case 5:
          DuplicateParticularTab(id, msg.tabId);
          break;
        case 7:
          changeActiveTab(id, msg.tabId, msg.windowId);
          break;
        case 8:
          ArrangeTabsInAlphabeticalOrder();
          break;
        case 9:
          closeAllTabsExcept(msg.tabId);
          break;
        case 11:
          moveTabTOExtremeRight(msg.tabId);
          break;
        case 12:
          removeDuplicateTabs(msg.tabs);
          break;
        case 13:
          changeCurrentWindowVariable(msg.value);
          break;
        case 14:
          sendCurrentWindowVariable();
          break;
        case 15:
          bookamarkParticularTab(msg.tabId);
          break;
        case 16:
          OpenTabInIncognitoMode(msg.tabId);
          break;
        case 17:
          OpenTabInNewWindow(msg.tabId);
          break;
      }
    });

    //function for sending all tabs details to the content.js
    const sendAllTabs = async (id) => {
      if (currentWindow === false) {
        chrome.tabs.query({}, async function (tabs) {
          const modifiedTabs = await Promise.all(
            tabs.map(async (tab) => {
              const isTabBookMarked = await isTabBookmarked(tab.url);
              return { ...tab, isTabBookMarked };
            })
          );
          const tabsData = {
            id: id,
            data: modifiedTabs,
          };
          port.postMessage(tabsData);
        });
      } else {
        chrome.tabs.query({ currentWindow: true }, async function (tabs) {
          const modifiedTabs = await Promise.all(
            tabs.map(async (tab) => {
              const isTabBookMarked = await isTabBookmarked(tab.url);
              return { ...tab, isTabBookMarked };
            })
          );
          const tabsData = {
            id: id,
            data: modifiedTabs,
          };
          port.postMessage(tabsData);
        });
      }
    };

    //function for deleting the particular tab
    const DeleteParticularTab = (id, tabId) => {
      chrome.tabs.remove(tabId, function () {
        sendAllTabs(1);
      });
    };

    //function for Pinning the particular tab
    const PinParticularTab = (id, tabId) => {
      chrome.tabs.update(tabId, { pinned: true }, function (updatedTab) {
        sendAllTabs(1);
      });
    };

    //function for Unpinning the particular tab
    const UnpinParticularTab = (id, tabId) => {
      chrome.tabs.update(tabId, { pinned: false }, function (updatedTab) {
        sendAllTabs(1);
      });
    };

    //function for Duplicating the particular tab
    const DuplicateParticularTab = (id, tabId) => {
      chrome.tabs.get(tabId, function (tab) {
        if (tab) {
          chrome.tabs.create({ url: tab.url }, function (duplicatedTab) {
            sendAllTabs(1);
          });
        } else {
          console.error("Tab with ID " + tabId + " not found");
        }
      });
    };

    //function for Changing Active Tab
    const changeActiveTab = (id, tabId, windowId) => {
      console.log(windowId);
      chrome.windows.update(windowId, { focused: true });
      chrome.tabs.update(tabId, { active: true });
    };

    //fucntion for Arranging tabs in Alphabetical Order
    const ArrangeTabsInAlphabeticalOrder = () => {
      chrome.tabs.query({}, function (tabs) {
        tabs.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });

        tabs.forEach(function (tab, index) {
          chrome.tabs.move(tab.id, { index: index });
        });
        sendAllTabs(1);
      });
    };

    // Function to close all tabs except for a specific tab
    const closeAllTabsExcept = (tabIdToKeep) => {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          if (tab.id !== tabIdToKeep) {
            chrome.tabs.remove(tab.id);
          }
        });
        closeExtensionMenu();
      });
    };

    //check if bookmarked
    const isTabBookmarked = (tabUrl) => {
      return new Promise((resolve, reject) => {
        chrome.bookmarks.search({ url: tabUrl }, (bookmarkNodes) => {
          const isTabBookMarked = bookmarkNodes.length > 0;
          resolve(isTabBookMarked);
        });
      });
    };

    //move tab to extreme right
    const moveTabTOExtremeRight = (tabId) => {
      chrome.tabs.move(tabId, { index: -1 });
      sendAllTabs(1);
    };

    // function to remove duplicate tabs
    const removeDuplicateTabs = (tabs) => {
      tabs.forEach(function (tab) {
        if (tab.duplicate) {
          chrome.tabs.remove(tab.id);
        }
      });
      closeExtensionMenu();
    };

    //function close Extension Menu
    const closeExtensionMenu = () => {
      const tabsData = {
        id: 10,
      };
      port.postMessage(tabsData);
    };

    //function to change currentWindowVariable
    const changeCurrentWindowVariable = (value) => {
      console.log(value);
      currentWindow = value;
      sendCurrentWindowVariable();
      sendAllTabs(1);
    };

    //function to send value of currentWindowVariable
    const sendCurrentWindowVariable = () => {
      const currentWindowdata = {
        id: 14,
        currentWindow: currentWindow,
      };
      port.postMessage(currentWindowdata);
    };

    //function for bookamarking a tab
    const bookamarkParticularTab = (tabId) => {
      chrome.tabs.get(tabId, function (tab) {
        if (tab) {
          chrome.bookmarks.create(
            { title: tab.title, url: tab.url },
            function (bookmark) {}
          );
          sendAllTabs(1);
        } else {
          console.error("Tab with ID " + tabId + " not found");
        }
      });
    };

    //function for making a tab hibernate
    const HiberNateParticularTab = (tabId) => {
      chrome.tabs.discard(tabId, function (discardedTab) {
        console.log("Tab with ID " + tabId + " has been hibernated");
      });
    };

    const OpenTabInNewWindow = (tabId) => {
      chrome.tabs.get(tabId, function (tab) {
        if (tab) {
          chrome.windows.create({
            url: tab.url,
          });
        }
      });
    };

    const OpenTabInIncognitoMode = (tabId) => {
      chrome.tabs.get(tabId, function (tab) {
        if (tab) {
          chrome.windows.create(
            {
              url: tab.url,
              incognito: true,
            },
            function (newWindow) {}
          );
        }
      });
    };
  });
})();
