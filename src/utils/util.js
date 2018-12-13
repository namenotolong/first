// 一些公共方法
const util = {
    // 时间处理
    formatDate(date, format) {
        if (date == "") {
            return "";
        }
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        //增加星期功能
        // var weekArr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        // var week = weekArr[date.getDay()]; 
        // format = format + ' ' + week; 
        return format;
    },
    // 权限控制
    permissionCtrl(...roles) {
        const role = sessionStorage.getItem("EISroleName");
        if (roles.includes(role)) {
            return true;
        } else {
            return false;
        }
    },
    //生成ID
    guid() {
        let S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
}

export default util;