<!--
 * @Author: 刘威 893624020@qq.com
 * @Date: 2025-09-12 14:44:44
 * @LastEditors: 刘威 893624020@qq.com
 * @LastEditTime: 2025-09-17 14:44:05
 * @FilePath: \codeExample\src\layouts\Priview.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="priview">
    <div class="preview-header" v-if="currentFileName || showPreview">
      <span class="preview-title">预览: {{ currentFileName || 'HTML预览' }}</span>
    </div>
    <div class="preview-content" v-if="showPreview && previewContent">
      <iframe 
        :srcdoc="previewContent" 
        frameborder="0"
        class="preview-iframe"
      ></iframe>
    </div>
    <div class="no-preview" v-else>
      <el-empty description="点击运行按钮预览HTML效果" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from '@/stores/fileStore';
import { storeToRefs } from 'pinia';
import { ElEmpty } from 'element-plus';

const fileStore = useFileStore();
const { currentFileName, previewContent, showPreview } = storeToRefs(fileStore);
</script>

<style scoped>
.priview {
  height: 100%;
  background: #E7F2EF;
  display: flex;
  flex-direction: column;
}

.preview-header {
  height: 40px;
  background-color: var(--color2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
}

.preview-title {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.preview-content {
  flex: 1;
  overflow: hidden;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: white;
}

.no-preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}
</style>