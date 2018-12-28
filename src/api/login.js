import service from "../utils/service.js";

export function login(data) {
    return service({
        url: "/login",
        method: "post",
        data:data
    })
}

