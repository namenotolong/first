import service from '@/utils/service';

function getList(params) {
  return service({
    url: '/user/list',
    method: 'get',
    params
  })
}

function getDetail(params) {
  return service({
    url: '/user/detail',
    method: 'get',
    params
  })
}

function save(data) {
  return service({
    url: '/user/save',
    method: 'post',
    data
  })
}


function remove(data) {
  return service({
    url: '/user/remove',
    method: 'post',
    data
  })
}

export {
  getList,
  getDetail,
  save,
  remove
}
