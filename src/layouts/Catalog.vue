<template>
  <div class="catalog">
    <el-scrollbar height="100%">
      <div v-if="loading">加载中...</div>
      <div v-else-if="error">{{ error }}</div>
      <el-menu
        @select="handleSelect"
        v-else
        :default-active="activeIndex"
        :unique-opened="true"
      >
        <template v-for="item in fileStructure" :key="item.path">
          <file-item 
            :file="item"
            :level="0"
          />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FileItem from '@/components/FileItem.vue';
import { scanPublicDirectory, type FileInfo } from '@/utils/fileScanner';

const fileStructure = ref<FileInfo[]>([]);
const loading = ref(true);
const error = ref('');
const activeIndex = ref('');

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

const handleSelect = (path: string) => {
  console.log('选中文件:', path);
}

</script>

<style scoped>
.catalog {
  height: 100%;
  width: 200px;
  background-color: #708993;
  border-right: 1px solid #e5e5e5;
}
</style>