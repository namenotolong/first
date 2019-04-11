import service from "~/utils/service.js";

function getGridData(params) {
    return service({
        url: "/dashboard/grid",
        method: "get",
        params
    })
}

function getLineChartData(params) {
    return service({
        url: "/dashboard/lineChart",
        method: "get",
        params
    })
}

function getTodoListData(params) {
    return service({
        url: "/dashboard/todoList",
        method: "get",
        params
    })
}
export {
    getGridData,
    getLineChartData,
    getTodoListData
}