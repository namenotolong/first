import Mock from "mockjs";

const articleData = Mock.mock({
    "articleList|113": [{
        id:"@guid",
        "index|+1":1,
        author: '@pick(["常伟", "何军", "程强", "孔秀兰", "吴刚", "吕平", "张强"])',
        createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
        title: "@title",
        type:'@pick(["新闻", "财经", "娱乐", "体育", "科技", "游戏"])',
        browseNum: "@natural(1000,9999)",
    }],
    authorList:["常伟", "何军", "程强", "孔秀兰", "吴刚", "吕平", "张强"],
    typeList:["新闻", "财经", "娱乐", "体育", "科技", "游戏"]
})

export default {
    articleData,
}