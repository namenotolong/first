import service from '@/utils/service';

function getTabList(params) {
    return service({
        url: '/tab/tabList',
        method: 'get',
        params: params
    })
}

export {
    getTabList
}
