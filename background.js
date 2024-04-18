// 监听来自popup.js的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 检查消息的action是否为'changeBackgroundColor'
  if (message.action === 'changeBackgroundColor') {
    // 获取消息中的颜色值
    const color = message.color;
    // 定义查询条件,获取当前活动的标签页
    const queryInfo = { active: true, currentWindow: true };

    // 查询当前活动的标签页
    chrome.tabs.query(queryInfo, (tabs) => {
      // 获取第一个标签页
      const tab = tabs[0];
      // 如果存在活动标签页
      if (tab) {
        // 首先注入content_script.js文件
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content_script.js']
        }).then(() => {
          // 然后执行一个匿名函数,该函数调用content_script.js中的changeBackgroundColor函数
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (color) => {
              changeBackgroundColor(color);
            },
            args: [color] // 将颜色值作为参数传递给匿名函数
          });
        });
      }
    });
  }
});
