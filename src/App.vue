<template>
  <div id="app">
    <header>
      <h1>Vue 3 + TypeScript + Vite</h1>
    </header>
    
    <main>
      <p>欢迎使用Vue 3干净模板！</p>
      <p>这是一个最简单的Vue 3 + TypeScript + Vite项目。</p>
      <p>计数器: {{ count }}</p>
      <button @click="increment">点击 +1</button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

header h1 {
  color: #42b883;
  margin-bottom: 2rem;
}

main p {
  margin: 0.5rem 0;
  color: #2c3e50;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #369870;
}
</style>