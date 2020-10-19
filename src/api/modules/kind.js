import service from '@/utils/service';
import { paramsSerializer } from '@/utils/core';


export const getList = (data) => service.get('/kind/list', data, {
  paramsSerializer(params) {
    return paramsSerializer(params);
  }
});


export const update = (data) => service.post('/kind/updateOrInsert', data);
export const getAllBar = (data) => service.get('/bar/getAll', data);
export const getKinds = (data) => service.get('/kind/getKinds', data);

export const remove = (data) => service.post('/kind/remove', data);
