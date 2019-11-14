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



export {
  getList,
  getDetail
}
