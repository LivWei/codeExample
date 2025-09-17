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
        path: '',
        isDirectory: true,
        children: [
          {
            name: 'css',
            path: '',
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
            name: 'test.html',
            path: '/public/code/test.html',
            isDirectory: false
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