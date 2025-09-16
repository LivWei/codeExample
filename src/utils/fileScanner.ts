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
    // 根据已知的项目结构创建模拟数据
    const publicStructure: FileInfo[] = [
      {
        name: 'code',
        path: '/public/code',
        isDirectory: true,
        children: [
          {
            name: 'css',
            path: '/public/code/css',
            isDirectory: true,
            children: [
              {
                name: '1.html',
                path: '/public/code/css/1.html',
                isDirectory: false
              }
            ]
          },
          {
            name: 'openlayers',
            path: '/public/code/openlayers',
            isDirectory: true,
            children: [
              {
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              },{
                name: '1.html',
                path: '/public/code/openlayers/1.html',
                isDirectory: false
              }
            ]
          }
        ]
      }
    ];
    
    resolve(publicStructure);
  });
}

/**
 * 递归遍历文件结构并以扁平化数组形式返回
 * @param files 文件信息数组
 * @param result 结果数组
 * @returns 扁平化的文件路径数组
 */
export function flattenFileStructure(files: FileInfo[], result: string[] = []): string[] {
  for (const file of files) {
    result.push(file.path);
    if (file.children && file.children.length > 0) {
      flattenFileStructure(file.children, result);
    }
  }
  return result;
}