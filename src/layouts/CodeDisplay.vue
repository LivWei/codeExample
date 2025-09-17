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
      <div class="file-info">
        <span v-if="currentFileName" class="file-name">{{ currentFileName }}</span>
        <span v-else class="no-file">未选择文件</span>
        <span v-if="isLoading" class="loading">加载中...</span>
        <span v-if="error" class="error">{{ error }}</span>
      </div>
      <div class="header-buttons">
        <el-button type="primary" size="small" @click="copyCode">复制</el-button>
        <el-button type="success" size="small" @click="runCode">运行</el-button>
      </div>
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
import { ref, onMounted, onUnmounted, watch } from "vue";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import Codemirror from "codemirror-editor-vue3";
import type { CmComponentRef } from "codemirror-editor-vue3";
import type { Editor, EditorConfiguration } from "codemirror";
import { ElMessage } from "element-plus";
import { useFileStore } from '@/stores/fileStore';
import { storeToRefs } from 'pinia';

const fileStore = useFileStore()
const { currentFileContent, currentFileName, currentFileType, isLoading, error, showPreview } = storeToRefs(fileStore)

const code = ref(
  `var i = 0;
for (; i < 9; i++) {
    console.log(i);
    // more statements
}
`
);
const cmRef = ref<CmComponentRef>();

// 根据文件类型获取编辑器模式
const getEditorMode = (fileType: string): string => {
  switch (fileType.toLowerCase()) {
    case 'html':
      return 'text/html'
    case 'css':
      return 'text/css'
    case 'js':
    case 'javascript':
      return 'text/javascript'
    default:
      return 'text/javascript'
  }
}

const cmOptions: EditorConfiguration = {
  mode: getEditorMode(currentFileType.value),
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
  // 监听文件内容变化
  watch(currentFileContent, (newContent) => {
    if (newContent && cmRef.value) {
      const editor = cmRef.value.cminstance
      editor.setValue(newContent)
    }
  })

  // 监听文件类型变化，更新编辑器模式
  watch(currentFileType, (newType) => {
    if (cmRef.value && newType) {
      const editor = cmRef.value.cminstance
      const newMode = getEditorMode(newType)
      editor.setOption('mode', newMode)
    }
  })
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
    
    // 如果是HTML文件，运行并预览
    if (currentFileType.value.toLowerCase() === 'html') {
      fileStore.runHTMLCode(content);
    } else {
      // 对于其他类型的文件，可以在这里添加相应的运行逻辑
      ElMessage({
        message: '暂不支持该文件类型的运行',
        type: 'warning',
      });
    }
  } catch (err) {
    console.error('运行代码失败:', err);
    ElMessage({
      message: '运行代码失败',
      type: 'error',
    });
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
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;

    .file-info {
      display: flex;
      align-items: center;
      gap: 10px;

      .file-name {
        font-weight: 500;
        color: #333;
      }

      .no-file {
        color: #999;
        font-style: italic;
      }

      .loading {
        color: #409eff;
        font-size: 12px;
      }

      .error {
        color: #f56c6c;
        font-size: 12px;
      }
    }

    .header-buttons {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
