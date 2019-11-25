import service from '@/utils/service';


// 获取基础数据表
function getBaseTable(params) {
  return service({
    url: '/baseTable',
    method: 'get',
    params
  })
}


export {
  getBaseTable
}
