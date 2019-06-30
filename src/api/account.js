import service from "~/utils/service.js";

export function login(data) {
    return service({
        url: "/account/login",
        method: "post",
        data
    })
}

export function logout(data) {
    return service({
        url: "/account/logout",
        method: "post",
        data
    })
}

export function getUserInfo(params) {
    return service({
        url: "/account/userInfo",
        method: "get",
        params
    })
}
