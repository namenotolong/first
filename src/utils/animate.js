//常见的动画算法
const tween = {
    linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
};

//定义Animate类	
const Animate = function (elem) {
    this.elem = elem; // 进行运动的 dom 节点 
    this.startTime = 0; // 动画开始时间 
    this.startPos = 0; // 动画开始时，dom 节点的位置，即 dom 的初始位置 
    this.endPos = 0; // 动画结束时，dom 节点的位置，即 dom 的目标位置 
    this.propertyName = null; // dom 节点需要被改变的 css 属性名 
    this.easing = null; // 缓动算法 
    this.duration = null; // 动画持续时间 
};

//启动动画
Animate.prototype.start = function (propertyName, endPos, duration, easing, callback) {
    this.startTime = +new Date;
    this.startPos = parseInt(window.getComputedStyle(this.elem)[propertyName]);
    this.propertyName = propertyName;
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];
    const timer = setInterval(() => {
        const result = this.step();
        if (result === false) {
            clearInterval(timer);
            if (callback) {
                callback();
            }
        }
    }, 20);
};

//小球每次运动要做的事情
Animate.prototype.step = function () {
    const currentTime = +new Date; // 取得当前时间 
    if (currentTime >= this.startTime + this.duration) {
        this.elem.style[this.propertyName] = this.endPos + 'px'; // 时间到了之后将小球位置精确定位到到最终位置
        return false;
    }
    const t = currentTime - this.startTime;
    const b = this.startPos;
    const c = this.endPos - this.startPos;
    const d = this.duration;
    const currentPosition = this.easing(t, b, c, d);
    this.elem.style[this.propertyName] = currentPosition + 'px'; // 更新小球位置 
};

export default Animate;