import Mock from 'mockjs';
import { getURLParams, guid } from '@/utils/core';
import { filterField, findById } from '../util';

const articleList = Mock.mock({
  'data|213': [{
    id: '@lower(@guid)',
    title: '@ctitle',
    author: '@cname',
    createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
    type: '@pick(["1", "2", "3", "4", "5"])',
    browseNum: '@natural(1000,9999)',
    imageURL: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg',
    brief: '@cparagraph(2,5)',
    content: '@cparagraph',
  }],
})





export default {
  getList(config) {
    const { type, author, pageNumber, pageSize, title } = getURLParams(config.url);
    const types = type.split(',');
    const typesLength = types.length;
    const result = articleList.data.filter(item => {
      let validAuthor = false;
      let validType = false;
      let validTitle = false;

      if (typesLength === 0) {
        validType = true;
      } else {
        validType = types.some(item1 => {
          return item.type.includes(item1);
        })
      }

      validTitle = item.title.includes(title);
      validAuthor = item.author.includes(author);
      return validAuthor && validTitle && validType;
    })

    const startIndex = (Number(pageNumber) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);

    return {
      code: 200,
      data: {
        articleList: filterField(result.slice(startIndex, endIndex), 'id', 'title', 'author', 'createDate', 'type', 'browseNum'),
        total: result.length
      }
    }
  },
  getDetail(config) {
    const { id } = getURLParams(config.url);
    return {
      code: 200,
      data: findById(articleList.data, id)
    }
  }
}
