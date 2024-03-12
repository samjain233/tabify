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
          DeleteParticularTab(id,msg.tabId);
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
          case 6: 
             BookamarkParticularTab(id, msg.tabid);
             break;
          case 7:
             HiberNateParticularTab( id, msg.tabId);
             break;
      }
    })

    //function for sending all tabs details to the content.js
    const sendAllTabs = (id) => {
      chrome.tabs.query({}, function (tabs) {
        const tabsData = {
          id: id,
          data: tabs,
        }
        port.postMessage(tabsData);
      });
    }

    //function for deleting the particular tab
    const DeleteParticularTab = (id, tabId) => {
      chrome.tabs.remove(tabId, function() {
        console.log("Tab with ID " + tabId + " has been removed");
    });
    }

    //function for Pinning the particular tab
    const PinParticularTab = (id,tabId) => {
      chrome.tabs.update(tabId, { pinned: true }, function(updatedTab) {
        console.log("Tab with ID " + tabId + " has been pinned");
    });
    }

    //function for Unpinning the particular tab
    const UnpinParticularTab = (id) => {
    chrome.tabs.update(tabId, { pinned: false }, function(updatedTab) {
      console.log("Tab with ID " + tabId + " has been unpinned");
  });
}
 

    //function for Duplicating the particular tab
const DuplicateParticularTab = (id,tabId) => {
   chrome.tabs.get(tabId, function(tab) {
    if (tab) {
        // Create a new tab with the same URL as the original tab
        chrome.tabs.create({ url: tab.url }, function(duplicatedTab) {
            // Log a message to indicate that the tab has been duplicated
            console.log("Tab with ID " + tabId + " has been duplicated as tab with ID " + duplicatedTab.id);
        });
    } else {
        console.error("Tab with ID " + tabId + " not found");
    }
  });
}

   //function for bookamarking a tab

   const BookamarkParticularTab = (id, tabId) => {
   chrome.tabs.get(tabId, function(tab) {
    if (tab) {
        // Create a bookmark for the tab with the specified title
        chrome.bookmarks.create({ title: title, url: tab.url }, function(bookmark) {
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
    chrome.tabs.discard(tabId, function(discardedTab) {
      // Log a message to indicate that the tab has been discarded
      console.log("Tab with ID " + tabId + " has been hibernated");
  });
}

    
  })
})();

