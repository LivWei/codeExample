<!--
 * @Author: 刘威 893624020@qq.com
 * @Date: 2025-09-12 14:46:31
 * @LastEditors: 刘威 893624020@qq.com
 * @LastEditTime: 2025-09-16 15:13:48
 * @FilePath: \codeExample\src\layouts\DefaultLayout.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="default-layout">
    <Header></Header>
    <div class="default-layout-content">
      <Catalog></Catalog>
      <CodeDisplay :style="{ width: `${leftWidth}px` }"></CodeDisplay>
      <div class="resizer" @mousedown="startResize"></div>
      <Priview :style="{ width: `${rightWidth}px` }"></Priview>
    </div>
  </div>
</template>

<script setup lang="ts">
import Catalog from "./Catalog.vue";
import CodeDisplay from "./CodeDisplay.vue";
import Header from "./Header.vue";
import Priview from "./Priview.vue";

import { ref, onMounted, onBeforeUnmount } from "vue";

const leftWidth = ref(500); // 左侧初始宽度(px)
const rightWidth = ref(500); // 右侧初始宽度(px)
const isResizing = ref(false);
const startX = ref(0);
const startLeft = ref(0);
const containerEl = ref<HTMLElement | null>(null);

// 可根据需要调整的约束
const minLeft = 280; // 左侧最小宽度
const minRight = 320; // 右侧最小宽度
const gutter = 6; // 分隔条宽度(px)

onMounted(() => {
  // 初始化容器与左右宽度
  const el = document.querySelector(
    ".default-layout-content"
  ) as HTMLElement | null;
  containerEl.value = el;
  if (el) {
    const total = el.clientWidth;
    const usable = Math.max(total - gutter, 0);
    leftWidth.value = Math.max(Math.floor(usable / 2), minLeft);
    leftWidth.value = Math.min(leftWidth.value, usable - minRight);
    rightWidth.value = usable - leftWidth.value;
  }
  // 全局监听拖拽过程与结束
  window.addEventListener("mousemove", doResize);
  window.addEventListener("mouseup", stopResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", doResize);
  window.removeEventListener("mouseup", stopResize);
});

function startResize(e: MouseEvent) {
  if (!containerEl.value) {
    containerEl.value = document.querySelector(
      ".default-layout-content"
    ) as HTMLElement | null;
  }
  isResizing.value = true;
  startX.value = e.clientX;
  startLeft.value = leftWidth.value;
  // 拖拽体验优化：避免选中文字，显示列调整光标
  document.body.style.userSelect = "none";
  document.body.style.cursor = "col-resize";
}

function doResize(e: MouseEvent) {
  if (!isResizing.value || !containerEl.value) return;
  const delta = e.clientX - startX.value;
  const total = containerEl.value.clientWidth;
  const usable = Math.max(total - gutter, 0);

  let newLeft = startLeft.value + delta;
  // 约束左右最小宽度
  newLeft = Math.max(newLeft, minLeft);
  newLeft = Math.min(newLeft, usable - minRight);

  leftWidth.value = newLeft;
  rightWidth.value = usable - newLeft;
}

function stopResize() {
  if (!isResizing.value) return;
  isResizing.value = false;
  document.body.style.userSelect = "";
  document.body.style.cursor = "";
}
</script>

<style scoped>
.default-layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.default-layout-content {
  flex: 1;
  width: 100%;
  display: flex;
  overflow: hidden; /* 拖拽时避免溢出抖动 */
}
.resizer {
  width: 6px;
  cursor: col-resize;
  background: rgba(0, 0, 0, 0.06);
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  user-select: none;
}

.resizer:hover {
  background: rgba(0, 0, 0, 0.6);
}
</style>
