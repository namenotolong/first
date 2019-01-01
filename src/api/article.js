import service from "../utils/service.js";

function getArticleList(data) {
    return service({
        url: "/article/articleList",
        method: "post",
        data
    })
}

function getAuthorList() {
    return service({
        url: "/article/authorList",
        method: "get",
    })
}

function getArticleDetail(params) {
    return service({
        url: "/article/articleDetail",
        method: "get",
        params: params
    })
}

function getDraftList(params) {
    return service({
        url: "/article/draftList",
        method: "get",
    })
}

function getRubbishList(params) {
    return service({
        url: "/article/rubbishList",
        method: "get",
    })
}

export {
    getArticleList,
    getAuthorList,
    getArticleDetail,
    getDraftList,
    getRubbishList
}