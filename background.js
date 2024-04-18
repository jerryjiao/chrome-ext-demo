chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'changeBackgroundColor') {
    const color = message.color;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        chrome.tabs.executeScript(tab.id, {
          code: `document.body.style.backgroundColor = '${color}';`,
        });
      }
    });
  }
});
