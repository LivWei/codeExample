<template>
  <el-sub-menu
    :index="index.toString()"
    v-for="(child, index) in file.children"
    :key="child.path"
  >
    <template #title>
      <span>📁{{ child.name }}</span>
    </template>
    <el-menu-item-group>
      <el-menu-item v-for="(m, n) in child.children" :index="n + m.path"
        >📄{{ m.name }}</el-menu-item
      >
    </el-menu-item-group>
  </el-sub-menu>
</template>

<script setup lang="ts">
interface FileInfo {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileInfo[];
}

defineProps<{
  file: FileInfo;
  level: number;
}>();
</script>

<style scoped></style>
