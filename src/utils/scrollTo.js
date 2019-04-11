// 缓动公式
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
        return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

// 解决window.requestAnimationFrame()方法的兼容性问题
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    }
})()

// 设置页面要滚动到的位置
function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
}

// 获取页面已经滚动的距离。
function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
}

/**
 * 滚动
 * @param {Number} to 要滚动到的最终位置
 * @param {Number} duration    持续时间
 * @param { Function} callback  滚动完成后的回调函数
 */
export function scrollTo(to, duration, callback) {
    const start = position();
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    duration = (typeof (duration) === 'undefined') ? 500 : duration;
    const animateScroll = function () {
        currentTime += increment;
        const val = Math.easeInOutQuad(currentTime, start, change, duration);
        move(val)
        if (currentTime < duration) {
            requestAnimFrame(animateScroll);
        } else {
            if (callback && typeof (callback) === 'function') {
                callback();
            }
        }
    }
    animateScroll()
}