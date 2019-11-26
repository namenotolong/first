import service from '@/utils/service';

function getList(params) {
  return service({
    url: '/tab/list',
    method: 'get',
    params: params
  })
}

export {
  getList
}
