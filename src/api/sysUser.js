import service from "~/utils/service.js";

export function login(data) {
    return service({
        url: "/sysUser/login",
        method: "post",
        data
    })
}

export function logout(data) {
    return service({
        url: "/sysUser/logout",
        method: "post",
        data
    })
}

export function getUserInfo(params) {
    return service({
        url: "/sysUser/userInfo",
        method: "get",
        params
    })
}