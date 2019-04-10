// 时间处理
export function formatDate(date, format) {
    if (!date) {
        return "";
    }
    let o = {
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
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    //增加星期功能
    // let weekArr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    // let week = weekArr[date.getDay()]; 
    // format = format + ' ' + week; 
    return format;
}

// 权限控制
export function permissionCtrl(...roles) {
    const role = sessionStorage.getItem("EISroleName");
    if (roles.includes(role)) {
        return true;
    } else {
        return false;
    }
}

//生成ID
export function guid() {
    let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * 滚动
 * @param {HTMLDOM} element  要滚动的元素
 * @param {Number} target    目标位置
 * @param {Number} duration  持续时间
 */
export function scroll(element, target, interval) {
    clearInterval(element.timer);
    element.timer = setInterval(() => {
        const currentPosition = element.scrollTop;
        const distance = target - currentPosition;
        const step = distance / 10;
        if (Math.abs(distance) > 1) {
            element.scrollTop = currentPosition + step;
        } else {
            clearInterval(element.timer);
            element.scrollTop = target;
        }
    }, interval);
}


/**
 * 动画，可改变多个属性
 * @param {HTMLDOM} element  要发生动画的元素
 * @param {Object} properties    要改变的元素属性
 * @param {Number} interval  每次运动的时间间隔
 * @param {Function} callback  动画完成之后的回调
 */
export function animate(element, properties, interval, callback) {
    clearInterval(element.timer);
    element.timer = setInterval(() => {
        let flag = true;
        for (let property in properties) {
            let current = parseInt(window.getComputedStyle(element)[property]);
            let target = properties[property];
            let step = (target - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            element.style[property] = current + step + "px";
            if (current != target) {
                flag = false;
            }
        };
        if (flag) {
            clearInterval(element.timer);
            if (callback && typeof (callback) === "function") {
                callback();
            }
        }
    }, interval);
};