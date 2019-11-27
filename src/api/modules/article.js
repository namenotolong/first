import service from '@/utils/service';
import { paramsSerializer } from '@/utils/core';



function getList(params) {
  return service({
    url: '/article/list',
    method: 'get',
    params,
    paramsSerializer(params) {
      return paramsSerializer(params);
    }
  })
}

function getDetail(params) {
  return service({
    url: '/article/detail',
    method: 'get',
    params
  })
}


function update(data) {
  return service({
    url: '/article/update',
    method: 'post',
    data
  })
}


function remove(data) {
  return service({
    url: '/article/remove',
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
