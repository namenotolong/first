import Mock from "mockjs";

const weekData = Mock.mock({
    "visiteData|6": [{
        value: "@natural(10,100)"
    }],
    "userData|6": [{
        value: "@natural(10,100)"
    }],
    "goodsData|6": [{
        value: "@natural(10,100)"
    }],
    "commentData|6": [{
        value: "@natural(10,100)"
    }],
})

const monthData = Mock.mock({
    "visiteData|30": [{
        value: "@natural(10,100)"
    }],
    "userData|30": [{
        value: "@natural(10,100)"
    }],
    "goodsData|30": [{
        value: "@natural(10,100)"
    }],
    "commentData|30": [{
        value: "@natural(10,100)"
    }],
})

export default {
    weekData,
    monthData
}