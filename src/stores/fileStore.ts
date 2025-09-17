/*
 * @Author: 刘威 893624020@qq.com
 * @Date: 2025-09-17 14:09:03
 * @LastEditors: 刘威 893624020@qq.com
 * @LastEditTime: 2025-09-17 14:37:48
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
  const previewContent = ref<string>('') // 预览内容
  const showPreview = ref<boolean>(false) // 是否显示预览

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
      // 只提取文件名，不包含路径
      const pathParts = filePath.split('/')
      currentFileName.value = pathParts[pathParts.length - 1] || filePath
      
      // 如果是HTML文件，自动预览
      if (extension === 'html') {
        runHTMLCode(currentFileContent.value)
      }
      
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
    previewContent.value = ''
    showPreview.value = false
  }

  // 运行HTML代码
  function runHTMLCode(content: string) {
    if (currentFileType.value.toLowerCase() === 'html') {
      previewContent.value = content
      showPreview.value = true
    }
  }

  // 关闭预览
  function closePreview() {
    showPreview.value = false
    previewContent.value = ''
  }

  return {
    currentFileContent,
    currentFileName,
    currentFileType,
    isLoading,
    error,
    previewContent,
    showPreview,
    loadFile,
    clearFile,
    runHTMLCode,
    closePreview
  }
})