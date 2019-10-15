import service from '@/utils/service';

function getList(data) {
  return service({
    url: '/user/list',
    method: 'post',
    data
  })
}

function getDetail(data) {
  return service({
    url: '/user/detail',
    method: 'post',
    data
  })
}

export {
  getList,
  getDetail
}
