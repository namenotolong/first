import Mock from "mockjs";

const weekData = Mock.mock({
    "visiteData|6": [{
        value: "@natural(0,200)"
    }],
    "userData|6": [{
        value: "@natural(0,30)"
    }],
    "goodsData|6": [{
        value: "@natural(0,30)"
    }],
    "commentData|6": [{
        value: "@natural(0,30)"
    }],
})

const monthData = Mock.mock({
    "visiteData|30": [{
        value: "@natural(0,80)"
    }],
    "userData|30": [{
        value: "@natural(0,80)"
    }],
    "goodsData|30": [{
        value: "@natural(0,80)"
    }],
    "commentData|30": [{
        value: "@natural(0,80)"
    }],
})

export default {
    weekData,
    monthData
}