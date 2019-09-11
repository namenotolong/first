import Mock from 'mockjs';
import { getURLParams } from "@/utils/core";

const gridData = Mock.mock({
  visiteNum: "@natural(15000,30000)",
  userNum: "@natural(2500,5000)",
  goodsNum: "@natural(500,1200)",
  commentNum: "@natural(1600,3000)"
})

const lineChartData = Mock.mock({
  "visiteData|50": [{
    value: "@natural(0,200)"
  }],
  "userData|50": [{
    value: "@natural(0,80)"
  }],
  "goodsData|50": [{
    value: "@natural(0,10)"
  }],
  "commentData|50": [{
    value: "@natural(0,30)"
  }],
})

const todoListData = Mock.mock({
  "todoListData|10": [{
    isCompleted: "@boolean(3,7,true)",
    "content|1-5": "待办事项 "
  }]
})

export default {
  getGridData() {
    return {
      code: 200,
      data: gridData
    }
  },
  getLineChartData(config) {
    const { type } = getURLParams(config.url);
    let data = {};
    if (type == "week") {
      for (let [key, value] of Object.entries(lineChartData)) {
        data[key] = value.slice(-7);
      }
    } else if (type == "month") {
      for (let [key, value] of Object.entries(lineChartData)) {
        data[key] = value.slice(-31);
      }
    }
    return {
      code: 200,
      data: data
    }
  },
  getTodoListData() {
    return {
      code: 200,
      data: gridData
    }
  },
  getTodoListData() {
    return {
      code: 200,
      data: todoListData
    }
  }
}
