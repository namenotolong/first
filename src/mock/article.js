import Mock from "mockjs";

const articleData = Mock.mock({
    "articleList|20": [{
        id:"@lower(@guid)",
        author: '@pick(["常伟", "何军", "程强", "孔秀兰", "吴刚", "吕平", "张强"])',
        createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
        title: "@ctitle",
        type:'@pick(["新闻", "财经", "娱乐", "体育", "科技", "游戏"])',
        browseNum: "@natural(1000,9999)",
    }],
})

const authorList = Mock.mock({
    authorList:["常伟", "何军", "程强", "孔秀兰", "吴刚", "吕平", "张强"],
})

export default {
    articleData,
    authorList
}