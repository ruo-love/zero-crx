<template>
  <FloatButton
    :style="{
      right: '94px',
    }"
  >
    <template #tooltip>
      <div>Documents</div>
    </template>
  </FloatButton>
</template>
<script>
import { FloatButton } from "ant-design-vue";

export default {
  components: {
    FloatButton,
  },
};
</script>
