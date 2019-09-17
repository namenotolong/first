import service from "@/utils/service.js";

function getTabList(params) {
    return service({
        url: "/tab/tabList",
        method: "get",
        params: params
    })
}

export {
    getTabList
}
