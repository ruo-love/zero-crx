import { Action } from "../../common";
import {
  AI_OUTPUT,
  AI_PROMPT_SEARCH,
  AI_SEARCH,
  START_SEARCH,
  STOP,
} from "../../common/constant";
window.onload = function () {
  const contentWrap = document.getElementById("content-wrap");
  const promptEl = document.getElementById("prompt");
  const stopBtn = document.getElementById("stop-btn");
  chrome.runtime.onMessage.addListener(function (action) {
    switch (action.type) {
      case AI_OUTPUT:
        contentWrap.innerText += action.payload.msg;
        if (promptEl.value !== action.payload.prompt) {
          promptEl.value = action.payload.prompt;
        }
        break;
      case START_SEARCH:
        contentWrap.innerText = "";
    }
  });
  promptEl.addEventListener("blur", function (e) {
    contentWrap.innerText = "";
    chrome.runtime.sendMessage(new Action(AI_PROMPT_SEARCH, e.target.value));
  });
  stopBtn.addEventListener("click", function () {
    chrome.runtime.sendMessage(new Action(STOP, null));
  });
};
