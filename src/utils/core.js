//生成guid
export function guid() {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * 滚动,先慢后快，缓动的效果比easeIn动画明显
 * @param {HTMLDOM} element  要滚动的元素
 * @param {Number} target    目标位置
 * @param {Number} duration  滚动所用的总时间
 * @param {Function} callback  滚动完成之后的回调
 */
export function scroll(element, target, duration = 500, callback = () => { }) {
  const startTime = Date.now();
  const move = () => {
    const passTime = Date.now() - startTime;
    const currentPosition = element.scrollTop;
    const residueDistance = target - currentPosition;
    const step = residueDistance / 10;
    element.scrollTop = currentPosition + step;
    if (passTime < duration) {
      window.requestAnimationFrame(move);
    } else {
      element.scrollTop = target;
      callback();
    }
  }
  move();
}


/**
 * 动画，可改变多个属性
 * @param {HTMLDOM} element  要发生动画的元素
 * @param {Object} properties    要改变的元素属性
 * @param {Number} interval  每次运动的时间间隔
 * @param {Function} callback  动画完成之后的回调
 */
export function animate(element, properties, interval = 20, callback = () => { }) {
  clearInterval(element.timer);
  element.timer = setInterval(() => {
    let flag = true;
    for (const property in properties) {
      const current = parseInt(window.getComputedStyle(element)[property]);
      const target = properties[property];
      let step = (target - current) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      element.style[property] = current + step + "px";
      if (current != target) {
        flag = false;
      }
    };
    if (flag) {
      clearInterval(element.timer);
      callback();
    }
  }, interval);
};


/**
 * 获取url中的查询字符串参数
 * @param {String} url  url字符串
 */
export function getURLParams(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"'
    + decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
    + '"}'
  )
}

// 深克隆
export function deepClone(source) {
  if (typeof source != 'object') {
    return source;
  }
  const target = Array.isArray(source) ? [] : {};
  for (const [key, value] of Object.entries(source)) {
    target[key] = deepClone(value);
  }
  return target;
}


// 经过的模糊时间
export function getSimpleTimePass(date, passText) {
  const now = +new Date();
  const target = +new Date(date);
  const interval = (target - now) / 1000;
  let simpleTime = '';
  if (interval <= 60) {
    simpleTime = passText || '刚刚';
  } else if (60 < interval && interval <= 60 * 60) {
    simpleTime = Math.round((interval / 60)) + '分钟前';
  } else if (60 * 60 < interval && interval <= 60 * 60 * 24) {
    simpleTime = Math.round(interval / (60 * 60)) + '小时前';
  } else if (60 * 60 * 24 < interval && interval <= 60 * 60 * 24 * 30) {
    simpleTime = Math.round(interval / (60 * 60 * 24)) + '天前';
  } else {
    simpleTime = `${target.getFullYear()}-${target.getMonth()}-${target.getDate()}`;
  }
  return simpleTime;
}


// 剩余的模糊时间
export function getSimpleTimeReset(date, overText) {
  const now = +new Date();
  const target = +new Date(date);
  const interval = (target - now) / 1000;
  let simpleTime = '';
  if (interval < 0) {
    simpleTime = overText || '已结束';
  } else if (interval <= 60) {
    simpleTime = Math.round(interval) + "秒";
  } else if (60 < interval && interval <= 60 * 60) {
    simpleTime = Math.round((interval / 60)) + '分钟';
  } else if (60 * 60 < interval && interval <= 60 * 60 * 24) {
    simpleTime = Math.round(interval / (60 * 60)) + '小时';
  } else if (60 * 60 * 24 < interval && interval <= 60 * 60 * 24 * 30) {
    simpleTime = Math.round(interval / (60 * 60 * 24)) + '天';
  } else {
    simpleTime = `${target.getFullYear()}-${target.getMonth()}-${target.getDate()}`;
  }
  return simpleTime;
}

// 将数值使用逗号隔开，一般用于金额的输入
export function getCommaNumber(value) {
  const list = value.toString().split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

