<template>
  <div>
    <div>
      <InputSearch
        allowClear
        @search="onConfirmSearch"
        @keyup.enter="onConfirmSearch"
        v-model:value="prompt"
        placeholder="input search text"
      />
      <div
        style="
          display: flex;
          justify-content: center;
          margin: 6px 0;
          width: 100%;
        "
      >
        <Button v-show="loading" type="primary" shape="circle" @click="stopAi">
          <LoadingOutlined
        /></Button>
      </div>
    </div>
    <Card title="Response"><div v-html="md.render(content)"></div></Card>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { mdRender } from "../helper";
import { InputSearch, Space, Progress, Button, Card } from "ant-design-vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import {
  AI_CLOSE,
  AI_OUTPUT,
  AI_PROMPT_SEARCH,
  START_SEARCH,
  STOP,
  ZERO_LOG,
} from "../../../common/js/constant";
import { Action } from "../../../common/js/index";
const md = mdRender();
const content = ref("");
const prompt = ref("");
const loading = ref(false);
onMounted(() => {
  chrome.runtime.onMessage.addListener(function (action) {
    switch (action.type) {
      case AI_OUTPUT:
        if (action.payload.data !== "[DONE]") {
          loading.value = true;
          const data = JSON.parse(action.payload.data);
          chrome.runtime.sendMessage(new Action(ZERO_LOG, data));
          content.value += data.choices[0].delta.content;
          if (prompt.value !== action.payload.prompt) {
            prompt.value = action.payload.prompt;
          }
        } else {
          console.log("chat [DONE]", loading.value);
        }
        break;
      case START_SEARCH:
        content.value = "";
      case AI_CLOSE:
        prompt.value = "";
        loading.value = false;
        console.log("chat close", loading.value);
        break;
    }
  });
});
onBeforeUnmount(() => {
  stopAi();
});
function stopAi() {
  chrome.runtime.sendMessage(new Action(STOP, null));
}
function onConfirmSearch() {
  chrome.runtime.sendMessage(new Action(AI_PROMPT_SEARCH, prompt.value));
}
</script>
<style lang="scss" scoped></style>
