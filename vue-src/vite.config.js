import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  build: {
    // outDir: "../zero/side_panel",
    rollupOptions: {
      input: {
        // 指定多个入口文件
        "main-ai": "src/main-ai.js",
        "main-mine": "src/main-mine.js",
        // 可以根据需要继续添加其他入口文件
      },
      output: {
        entryFileNames: "src/[name].js",
        chunkFileNames: "src/[name].js",
      },
    },
    html: {
      "main-ai": {
        title: "AI",
        template: "index-ai.html",
      },
      "main-mine": {
        title: "Mine",
        template: "index-mine.html",
      },
    },
  },
});
