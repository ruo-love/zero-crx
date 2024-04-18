import { AI_OUTPUT } from "../../common/constant";
window.onload = function () {
  const contentWrap = document.getElementById("content-wrap");
  chrome.runtime.onMessage.addListener(function (action) {
    switch (action.type) {
      case AI_OUTPUT:
        console.log("AI_OUTPUT", AI_OUTPUT);
        contentWrap.innerText += action.payload;
        break;
    }
  });
};
