import Mock from 'mockjs';
import { getURLParams, guid } from '@/utils/core';

const articleList = Mock.mock({
  'data|113': [{
    id: '@lower(@guid)',
    author: '@cname',
    createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
    title: '@ctitle',
    type: '@pick(["新闻", "财经", "娱乐", "体育", "科技", "游戏"])',
    browseNum: '@natural(1000,9999)',
  }],
})



export default {
  getList(config) {
    const { type, author, pageNumber, pageSize, title } = getURLParams(config.url);
    // const authorsLength = author.length;
    // const typesLength = type.length;
    const filterList = articleList.data.filter(item => {
      return true;
      // let validAuthor = false;
      // let validType = false;
      // let validTitle = false;

      // if (authorsLength === 0) {
      //   validAuthor = true;
      // } else {
      //   validAuthor = author.some(item1 => {
      //     return item.author.includes(item1);
      //   })
      // }

      // if (typesLength === 0) {
      //   validType = true;
      // } else {
      //   validType = type.some(item1 => {
      //     return item.type.includes(item1);
      //   })
      // }

      // validTitle = item.title.includes(title);
      // return validAuthor  && validTitle  && validType;
    })

    const startIndex = (Number(pageNumber) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    return {
      code: 200,
      data: {
        articleList: filterList.slice(startIndex, endIndex),
        total: filterList.length
      }
    }
  },
  getDetail(config) {

    const articleDetail = Mock.mock({
      id: '@lower(@guid)',
      title: '@ctitle',
      author: '@cname',
      date: '@datetime("yyyy-MM-dd HH:mm:ss")',
      imageUrl: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg',
      brief: '@cparagraph(2,5)',
      type: '@pick(["1", "2", "3", "4", "5"])',
      browseNum: '@natural(1000,9999)',
      content: '@cparagraph',
    })
    return {
      code: 200,
      data: { articleDetail }
    }
  }
}
