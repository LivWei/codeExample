<template>
  <div class="file-explorer">
    <h3>Public目录文件结构</h3>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else class="file-tree">
      <file-item 
        v-for="file in fileStructure" 
        :key="file.path"
        :file="file"
        :level="0"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { scanPublicDirectory, type FileInfo } from '../utils/fileScanner';
import FileItem from './FileItem.vue';

const fileStructure = ref<FileInfo[]>([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    fileStructure.value = await scanPublicDirectory();
    loading.value = false;
  } catch (err) {
    error.value = '获取文件结构失败';
    loading.value = false;
    console.error(err);
  }
});
</script>

<style scoped>
.file-explorer {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.file-tree {
  list-style-type: none;
  padding-left: 0;
}
</style>