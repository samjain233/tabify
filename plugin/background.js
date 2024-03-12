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
      }
    });

    //function for sending all tabs details to the content.js
    const sendAllTabs = async (id) => {
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

    //function close Extension Menu
    const closeExtensionMenu = () => {
      const tabsData = {
        id: 10,
      };
      port.postMessage(tabsData);
    };
  });


  //function for bookamarking a tab

  const BookamarkParticularTab = (id, tabId) => {
    chrome.tabs.get(tabId, function (tab) {
      if (tab) {
        // Create a bookmark for the tab with the specified title
        chrome.bookmarks.create({ title: title, url: tab.url }, function (bookmark) {
          // Log a message to indicate that the tab has been bookmarked
          console.log("Tab with ID " + tabId + " has been bookmarked as bookmark with ID " + bookmark.id);
        });
      } else {
        console.error("Tab with ID " + tabId + " not found");
      }
    });
  }

  //function for making a tab hibernate
  const HiberNateParticularTab = (id, tabId) => {
    chrome.tabs.discard(tabId, function (discardedTab) {
      // Log a message to indicate that the tab has been discarded
      console.log("Tab with ID " + tabId + " has been hibernated");
    });
  }


})();
