import Mock from "mockjs";


const gridData = Mock.mock({
    visiteNum: "@natural(15000,30000)",
    userNum: "@natural(2500,5000)",
    goodsNum: "@natural(800,1200)",
    commentNum: "@natural(1600,3000)"
})

const weekData = Mock.mock({
    "visiteData|7": [{
        value: "@natural(0,200)"
    }],
    "userData|7": [{
        value: "@natural(0,80)"
    }],
    "goodsData|7": [{
        value: "@natural(0,10)"
    }],
    "commentData|7": [{
        value: "@natural(0,30)"
    }],
})

const monthData = Mock.mock({
    "visiteData|31": [{
        value: "@natural(0,200)"
    }],
    "userData|31": [{
        value: "@natural(0,80)"
    }],
    "goodsData|31": [{
        value: "@natural(0,10)"
    }],
    "commentData|31": [{
        value: "@natural(0,30)"
    }],
})

const todoListData = Mock.mock({
    "data|10": [{
        isCompleted: "@boolean(3,7,true)",
        "content|1-6": "待办事项 "
    }]
})

export default {
    weekData,
    monthData,
    gridData,
    todoListData
}