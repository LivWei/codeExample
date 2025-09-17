/*
 * @Author: 刘威 893624020@qq.com
 * @Date: 2025-09-17 14:09:03
 * @LastEditors: 刘威 893624020@qq.com
 * @LastEditTime: 2025-09-17 14:30:48
 * @FilePath: \codeExample\src\stores\fileStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFileStore = defineStore('file', () => {
  const currentFileContent = ref<string>('')
  const currentFileName = ref<string>('')
  const currentFileType = ref<string>('')
  const isLoading = ref<boolean>(false)
  const error = ref<string>('')

  // 加载文件内容
  async function loadFile(filePath: string) {
    isLoading.value = true
    error.value = ''
    
    try {
      // 获取文件扩展名
      const extension = filePath.split('.').pop()?.toLowerCase() || ''
      currentFileType.value = extension
      
      // 构建完整的文件URL - 移除路径中的/public前缀
      const fileUrl = filePath.includes('/public') ? filePath.split('/public')[1] : filePath

      // 获取文件内容
      const response = await fetch(fileUrl)
      if (!response.ok) {
        throw new Error(`无法加载文件: ${response.statusText}`)
      }
      
      currentFileContent.value = await response.text()
      currentFileName.value = filePath
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : '加载文件失败'
      currentFileContent.value = ''
      currentFileName.value = ''
    } finally {
      isLoading.value = false
    }
  }

  // 清空当前文件
  function clearFile() {
    currentFileContent.value = ''
    currentFileName.value = ''
    currentFileType.value = ''
    error.value = ''
  }

  return {
    currentFileContent,
    currentFileName,
    currentFileType,
    isLoading,
    error,
    loadFile,
    clearFile
  }
})