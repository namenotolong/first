import service from "../utils/service.js";

function getArticleList(params) {
    return service({
        url: "/article/articleList",
        method: "get",
        params: params
    })
}

function getAuthorList() {
    return service({
        url: "/article/authorList",
        method: "get",
    })
}

function getArticleDetail(articleId) {
    return service({
        url: "/article/authorList",
        method: "get",
        params: {
            articleId
        }
    })
}

export {
    getArticleList,
    getAuthorList,
    getArticleDetail
}