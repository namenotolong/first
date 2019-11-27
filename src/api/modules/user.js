import service from '@/utils/service';
import { paramsSerializer } from '@/utils/core';


function getList(params) {
  return service({
    url: '/user/list',
    method: 'get',
    params,
    paramsSerializer(params) {
      return paramsSerializer(params);
    }
  })
}

function getDetail(params) {
  return service({
    url: '/user/detail',
    method: 'get',
    params
  })
}


function update(data) {
  return service({
    url: '/user/update',
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
  update,
  remove
}
