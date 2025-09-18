/*
 * @Author: 刘威 893624020@qq.com
 * @Date: 2025-09-16 16:05:15
 * @LastEditors: 刘威 893624020@qq.com
 * @LastEditTime: 2025-09-18 13:39:45
 * @FilePath: \codeExample\src\utils\fileScanner.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 模拟文件系统结构 - 在实际应用中，这些数据应该从服务器API获取
export interface FileInfo {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileInfo[];
}

/**
 * 模拟扫描public目录下的所有文件和文件夹
 * 注意：在浏览器环境中无法直接访问文件系统，这里提供一个模拟实现
 * 在实际应用中，应该通过API从服务器获取文件列表
 * @returns FileInfo对象数组
 */
export function scanPublicDirectory(): Promise<FileInfo[]> {
  // 模拟异步操作
  return new Promise((resolve) => {
    fetch('/public/catalog.json')
      .then(response => response.json())
      .then(data => {
        // 使用请求到的data作为publicStructure的值
        const publicStructure: FileInfo[] = [data];
        console.log('publicStructure', publicStructure);
        resolve(publicStructure);
      })
      .catch(error => {
        console.error('Error fetching catalog:', error);
        resolve([]);
      });
  });
}