import Mock from 'mockjs';
import { getURLParams } from '@/utils/core';
import util from '../util';

const articleList = Mock.mock({
  'table|213': [{
    id: '@lower(@guid)',
    name: '@ctitle',
    author: '@cname',
    createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
    type: '@pick(["1", "2", "3", "4", "5"])',
    browseNum: '@natural(1000,9999)',
    imageURL: 'https://source.unsplash.com/random/200x200',
    brief: '@cparagraph(1,3)',
    content: '@cparagraph',
    accessory: [{
      id: '1',
      name: '图片图片.jpg',
      url: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg'
    }, {
      id: '2',
      name: '营业执照副本.pdf',
      url: 'http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=document.pdf'
    }, {
      id: '3',
      name: '数据采集表',
      url: 'http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=data.xlsx'
    }]
  }],
})



const table = articleList.table;


export default {
  getList(config) {
    const { type, author, pageNumber, pageSize, name } = getURLParams(config.url);
    const types = type.split(',');
    const typesLength = types.length;
    const result = table.filter(item => {
      let validAuthor = false;
      let validType = false;
      let validName = false;

      if (typesLength === 0) {
        validType = true;
      } else {
        validType = types.some(item1 => {
          return item.type.includes(item1);
        })
      }

      validName = item.name.includes(name);
      validAuthor = item.author.includes(author);
      return validAuthor && validName && validType;
    })

    const startIndex = (Number(pageNumber) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);

    return {
      code: 200,
      data: {
        articleList: util.filterFieldByTable(result.slice(startIndex, endIndex), 'id', 'name', 'author', 'createDate', 'type', 'browseNum'),
        total: result.length
      }
    }
  },
  getDetail(config) {
    const { id } = getURLParams(config.url);
    return {
      code: 200,
      data: util.find(table, id)
    }
  },
  update(config) {
    const { detail } = window.JSON.parse(config.body);
    if (!detail.id) {
      const initRow = {
        createDate: Date.now(),
        browseNum: 0
      };
      Object.assign(detail, initRow);
    }
    util.update(table, detail);
    return {
      code: 200,
      data: {}
    }
  },
  remove(config) {
    const { id } = window.JSON.parse(config.body);
    util.remove(table, id);
    return {
      code: 200,
      data: {}
    }
  }
}
