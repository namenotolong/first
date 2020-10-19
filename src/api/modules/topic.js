import service from '@/utils/service';
import { paramsSerializer } from '@/utils/core';


// 获取评论列表
export const getList = (data) => service.get('/topic/list', data, {
  paramsSerializer(params) {
    return paramsSerializer(params);
  }
});

// 获取评论详情
export const getDetail = (data) => service.get('/topic/detail', data);

// 新增/修改评论
export const update = (data) => service.post('/topic/updateOrInsert', data);

// 删除评论
export const remove = (data) => service.post('/topic/remove', data);
