import service from "~/utils/service.js";

function getGridData() {
    return service({
        url: "/dashboard/grid",
        method: "get",
    })
}

function getLineChartData(params) {
    return service({
        url: "/dashboard/lineChart",
        method: "get",
        params: params
    })
}

function getTodoListData() {
    return service({
        url: "/dashboard/todoList",
        method: "get",
    })
}
export {
    getGridData,
    getLineChartData,
    getTodoListData
}