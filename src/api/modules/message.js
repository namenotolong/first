import service from '@/utils/service';
import { paramsSerializer } from '@/utils/core';


// 获取评论列表
export const getList = (data) => service.get('/event/list', data, {
  paramsSerializer(params) {
    return paramsSerializer(params);
  }
});


// 新增/修改评论
export const update = (data) => service.post('/event/insertSystem', data);

// 删除评论
export const remove = (data) => service.post('/event/remove', data);
