document.addEventListener('DOMContentLoaded', () => {
  const colorOptions = document.querySelectorAll('.color-option');
  const customColorInput = document.getElementById('custom-color-input');
  const customColorButton = document.getElementById('custom-color-button');

  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      const color = option.getAttribute('data-color');
      sendBackgroundColor(color);
    });
  });

  customColorButton.addEventListener('click', () => {
    const color = customColorInput.value;
    if (isValidColor(color)) {
      sendBackgroundColor(color);
    } else {
      alert('请输入有效的颜色代码(例如:#FF0000或red)');
    }
  });

  function sendBackgroundColor(color) {
    // 给background.js发送消息
    chrome.runtime.sendMessage({ action: 'changeBackgroundColor', color });
  }

  function isValidColor(color) {
    const div = document.createElement('div');
    div.style.color = color;
    return div.style.color !== '';
  }
});
