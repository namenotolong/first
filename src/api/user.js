import service from "~/utils/service.js";

function getUserList(data) {
    return service({
        url: "/user/userList",
        method: "post",
        data: data
    })
}

function getUserDetail(params) {
    return service({
        url: "/user/userDetail",
        method: "get",
        params: params
    })
}

export {
    getUserList,
    getUserDetail

}