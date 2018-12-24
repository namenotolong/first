import Mock from "mockjs";

const articleList = Mock.mock({
    "data|100": [{
        id:"@guid",
        "author|1": ["常伟", "何军", "程强", "孔秀兰", "吴刚", "吕平", "张强"],
        createDate: '@datetime("yyyy年MM月dd日 HH:mm:ss")',
        title: "@title",
        "type|1": ["新闻", "财经", "娱乐", "体育", "科技", "游戏"],
        browseNum: "@natural(1000,9999)"
    }]
})

export default {
    articleList,
}