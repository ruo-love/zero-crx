import { Action, aiSearch } from "../js";
import {
  AI_CLOSE,
  AI_OUTPUT,
  AI_SEARCH,
  START_SEARCH,
  STOP,
  ZERO_LOG,
} from "../js/constant";

window.onload = function () {
  // 监听来自插件的消息
  let ctrl = null;
  chrome.runtime.onMessage.addListener(function (action) {
    switch (action.type) {
      case AI_SEARCH:
        const selectedText = action.payload || window.getSelection().toString();
        chrome.runtime.sendMessage(
          new Action(ZERO_LOG, {
            message: "选中文本，开始调用ai",
            data: selectedText,
          })
        );
        const options = {
          onopen: (e) => {
            chrome.runtime.sendMessage(
              new Action(ZERO_LOG, {
                message: "开始请求AI",
                data: e,
              })
            );
            chrome.runtime.sendMessage(
              new Action(START_SEARCH, {
                message: "开始请求",
                data: e,
              })
            );
          },
          onmessage: (msg) => {
            chrome.runtime.sendMessage(
              new Action(AI_OUTPUT, {
                prompt: selectedText,
                data: msg.data,
              })
            );
          },
          onclose: () => {
            chrome.runtime.sendMessage(new Action(ZERO_LOG, "chat close"));
            chrome.runtime.sendMessage(new Action(AI_CLOSE, "chat close"));
          },
          onerror: (err) => {
            chrome.runtime.sendMessage(
              new Action(ZERO_LOG, {
                message: "error",
                data: err,
              })
            );
          },
        };
        ctrl = aiSearch(selectedText, options);
        break;
      case STOP:
        ctrl.abort();
        break;
    }
  });
};
