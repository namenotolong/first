/* 应用配置 */

// 路由权限表
// 如果配置了一级路由，则它之下的所有子路由都可访问。
const permission = {
  admin: ['Icon', 'Chart', 'Form', 'Table', 'Excel', 'Tab', 'AMap', 'Error', 'Permission', 'User', 'Article', 'Other'],
  guest: ['Icon', 'Chart', 'Form', 'Table', 'Excel', 'Tab', 'AMap', 'Other'],
  editor: ['Article', 'Other']
}



const config = {
  permission
}


export default config;
