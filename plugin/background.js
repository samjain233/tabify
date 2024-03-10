function getAllTabs() {
  chrome.tabs.query({}, function (tabs) {
    // Loop through each tab
    tabs.forEach(function (tab) {
      console.log(tab);
    });
  });
}

getAllTabs();

