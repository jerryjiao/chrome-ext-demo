// 接收消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'changeBackgroundColor') {
    const color = message.color;
    // 改变页面背景色 
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        // 注入脚本
        chrome.tabs.executeScript(tab.id, {
          code: `document.body.style.backgroundColor = '${color}';`,
        });
      }
    });
  }
});
