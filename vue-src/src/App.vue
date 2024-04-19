<template>
  <div>
    <div>
      <input v-model="prompt" @blur="onPromptBlur" /><button @click="stopAi">
        STOP
      </button>
    </div>
    <div id="content-wrap" v-html="md.render(content)"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { mdRender } from "./helper";
import {
  AI_CLOSE,
  AI_OUTPUT,
  AI_PROMPT_SEARCH,
  START_SEARCH,
  STOP,
  ZERO_LOG,
} from "../../common/js/constant";
import { Action } from "../../common/js/index";
const md = mdRender();
const content = ref("");
const prompt = ref("");
onMounted(() => {
  chrome.runtime.onMessage.addListener(function (action) {
    switch (action.type) {
      case AI_OUTPUT:
        const data = JSON.parse(action.payload.data);
        chrome.runtime.sendMessage(new Action(ZERO_LOG, data));
        content.value += data.choices[0].delta.content;
        if (prompt.value !== action.payload.prompt) {
          prompt.value = action.payload.prompt;
        }
        break;
      case START_SEARCH:
        content.value = "";
      case AI_CLOSE:
        console.log("chat close");
        break;
    }
  });
});
function stopAi() {
  chrome.runtime.sendMessage(new Action(STOP, null));
}
function onPromptBlur() {
  chrome.runtime.sendMessage(new Action(AI_PROMPT_SEARCH, prompt.value));
}
</script>
<style lang="scss" scoped></style>
