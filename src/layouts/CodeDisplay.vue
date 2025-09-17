<!--
 * @Author: 刘威 893624020@qq.com
 * @Date: 2025-09-12 14:44:26
 * @LastEditors: 刘威 893624020@qq.com
 * @LastEditTime: 2025-09-17 14:00:41
 * @FilePath: \codeExample\src\layouts\CodeDisplay.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="code-display">
    <div class="code-display-header">
      <el-button type="primary" size="small" @click="copyCode">复制</el-button>
      <el-button type="success" size="small" @click="runCode">运行</el-button>
    </div>
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      height="calc(100% - 40px)"
      width="100%"
      ref="cmRef"
      @change="onChange"
      @input="onInput"
      @ready="onReady"
    >
    </Codemirror>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import "codemirror/mode/javascript/javascript.js";
import Codemirror from "codemirror-editor-vue3";
import type { CmComponentRef } from "codemirror-editor-vue3";
import type { Editor, EditorConfiguration } from "codemirror";
import { ElMessage } from "element-plus";

const code = ref(
  `var i = 0;
for (; i < 9; i++) {
    console.log(i);
    // more statements
}
`
);
const cmRef = ref<CmComponentRef>();
const cmOptions: EditorConfiguration = {
  mode: "text/javascript",
  lineWrapping: true,
  lineNumbers: true,
  viewportMargin: Infinity, // 使编辑器自动匹配容器大小
};

const onChange = (val: string, cm: Editor) => {
  // console.log(val);
  // console.log(cm.getValue());
};

const onInput = (val: string) => {
  // console.log(val);
};

const onReady = (cm: Editor) => {
};

onMounted(() => {
});

onUnmounted(() => {
  cmRef.value?.destroy();
});


const copyCode = async () => {
  try {
    if (!cmRef.value) {
      console.error('Codemirror 实例不存在');
      return;
    }

    const editor = cmRef.value.cminstance;
    const content = editor.getValue();
    console.log('复制内容:', content);
    await navigator.clipboard.writeText(content);
    ElMessage({
      message: '已复制到剪贴板',
      type: 'success',
    })
  } catch (err) {
    console.error('复制失败:', err);
  }
};

const runCode = () => {
  try {
    if (!cmRef.value) {
      console.error('Codemirror 实例不存在');
      return;
    }
    const editor = cmRef.value.cminstance;
    const content = editor.getValue();
    console.log('运行代码:', content);
  } catch (err) {
    console.error('运行代码失败:', err);
  }
};
</script>

<style scoped style="scss">
.code-display {
  height: 100%;

  .code-display-header {
    height: 40px;
    background-color: var(--color2);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
