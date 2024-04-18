import { Action } from "./common";
import { AI_PROMPT_SEARCH, AI_SEARCH, STOP, ZERO_LOG } from "./common/constant";
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
chrome.runtime.onInstalled.addListener(function () {
  // 创建一级菜单项
  chrome.contextMenus.create({
    id: AI_SEARCH,
    title: "AI搜索",
    contexts: ["all"],
  });
});
chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId === AI_SEARCH) {
    await chrome.sidePanel.open({ windowId: tab.windowId });
    chrome.tabs.sendMessage(tab.id, new Action(AI_SEARCH, null));
  }
});

chrome.runtime.onMessage.addListener(function (action) {
  switch (action.type) {
    case ZERO_LOG:
      console.log(action.type, action.payload);
  }
});
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
chrome.runtime.onMessage.addListener(function (action) {
  switch (action.type) {
    case STOP:
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          new Action(STOP, action.payload)
        );
      });
  }
});
