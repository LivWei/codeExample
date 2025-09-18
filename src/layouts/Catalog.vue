<!--
 * @Author: 刘威 893624020@qq.com
 * @Date: 2025-09-15 15:46:17
 * @LastEditors: 刘威 893624020@qq.com
 * @LastEditTime: 2025-09-18 13:39:57
 * @FilePath: \codeExample\src\layouts\Catalog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
import { useFileStore } from '@/stores/fileStore';

const fileStructure = ref<FileInfo[]>([]);
const loading = ref(true);
const error = ref('');
const activeIndex = ref('');

const fileStore = useFileStore();

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
  
  // 检查是否为HTML文件
  if (path.toLowerCase().endsWith('.html')) {
    fileStore.loadFile(path);
  }
}

</script>

<style scoped>
.catalog {
  height: 100%;
  width: 200px;
  background-color: var(--color3);
  border-right: 1px solid #e5e5e5;
}
</style>