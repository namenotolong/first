import service from "../utils/service.js";

function getArticleList() {
    return service({
        url: "/article/articleList",
        method: "get",
    })
}

export {
    getArticleList,
}