import { Action } from "./common";
import { AI_PROMPT_SEARCH, AI_SEARCH, STOP, ZERO_LOG } from "./common/constant";
/**
 * @description 插件标签打开侧边栏
 */
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

/**
 * @description 监听快捷键
 */
chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "open_side_panel":
      chrome.windows.getCurrent((currentWindow) => {
        chrome.sidePanel.open({ windowId: currentWindow.id });
      });
      break;
  }
});

/**
 * @description 创建右键菜单项
 */
chrome.runtime.onInstalled.addListener(function (details) {
  // 创建一级菜单项
  chrome.contextMenus.create({
    id: AI_SEARCH,
    title: "AI搜索",
    contexts: ["selection"],
  });
});

/**
 * @description 右键菜单项点击事件 触发AI搜索
 */
chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId === AI_SEARCH) {
    await chrome.sidePanel.open({ windowId: tab.windowId });
    chrome.tabs.sendMessage(tab.id, new Action(AI_SEARCH, null));
  }
});

/**
 * @description 监听日志输出
 */
chrome.runtime.onMessage.addListener(function (action) {
  switch (action.type) {
    case ZERO_LOG:
      console.log(action.type, action.payload);
  }
});

/**
 * @description 监听Prompt AI搜索
 
 */
chrome.runtime.onMessage.addListener(function (action) {
  switch (action.type) {
    case AI_PROMPT_SEARCH:
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          new Action(AI_SEARCH, action.payload)
        );
      });
  }
});

/**
 * @description 监听停止AI搜索
 
 */
chrome.runtime.onMessage.addListener(function (action) {
  switch (action.type) {
    case STOP:
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, new Action(STOP, action.payload));
      });
  }
});
