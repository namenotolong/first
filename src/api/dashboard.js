import service from "../utils/service.js";
function getGridData(){

}

 function getLineChartData(params){
    return service({
        url:"/dashboard/lineChart",
        method:"get",
        params:params
    })
}
export {
    getGridData,
    getLineChartData
}