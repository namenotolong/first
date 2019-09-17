import Mock from "mockjs";

const articleList = Mock.mock({
  "list|113": [{
    id: "@lower(@guid)",
    author: '@pick(["常伟", "何军", "程强", "孔秀兰", "吴刚", "吕平", "张强"])',
    createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
    title: "@ctitle",
    type: '@pick(["新闻", "财经", "娱乐", "体育", "科技", "游戏"])',
    browseNum: "@natural(1000,9999)",
  }],
})

const authorList = Mock.mock({
  list: ["常伟", "何军", "程强", "孔秀兰", "吴刚", "吕平", "张强"],
})

const articleDetail = Mock.mock({
  id: "@lower(@guid)",
  author: '@pick(["常伟", "何军", "程强", "孔秀兰", "吴刚", "吕平", "张强"])',
  createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
  title: "@ctitle",
  type: '@pick(["新闻", "财经", "娱乐", "体育", "科技", "游戏"])',
  browseNum: "@natural(1000,9999)",
  content: "@cparagraph",
}
)

export default {
  getArticleList(config) {
    const { type, author, currentPageNum, pageSize, title } = window.JSON.parse(config.body);

    const authorsLength = author.length;
    const typesLength = type.length;
    const filterList = articleList.list.filter(item => {
      let validAuthor = false;
      let validType = false;
      let validTitle = false;

      if (authorsLength === 0) {
        validAuthor = true;
      } else {
        validAuthor = author.some(item1 => {
          return item.author.includes(item1);
        })
      }

      if (typesLength === 0) {
        validType = true;
      } else {
        validType = type.some(item1 => {
          return item.type.includes(item1);
        })
      }

      validTitle = item.title.includes(title);
      return validAuthor && validType && validTitle;
    })


    const startIndex = (Number(currentPageNum) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    return {
      code: 200,
      data: {
        articleList: filterList.slice(startIndex, endIndex),
        articleAmount: filterList.length
      }
    }
  },
  getAuthorList() {
    return {
      code: 200,
      data: {
        authorList: authorList.list
      }
    }
  },
  getArticleDetail() {
    return {
      code: 200,
      data: { articleDetail }
    }
  }
}
