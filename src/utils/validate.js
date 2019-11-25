// 策略对象，封装校验逻辑
const strategies = {
  empty(value, errorMsg) {
    if (value == "") {
      return errorMsg;
    }
  },
  minLength(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  maxLength(value, length, errorMsg) {
    if (value.length > length) {
      return errorMsg;
    }
  },
  mobile(value, errorMsg) {
    if (!/(^1[345789]\d{9}$)/.test(value)) {
      return errorMsg;
    }
  },
  email(value, errorMsg) {
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
      return errorMsg;
    }
  }
}

// Validator类负责接收用户输入，并委托给strategies对象
class Validator {

  constructor() {
    this.cache = [] // 保存校验规则
  }

  /**
   * 添加检验信息
   * @param value{String}  要校验的值
   *
   * @param rules{Array}要校验的规则。每条规则是一个对象，对象包含两个属性strategy和errorMsg。
   * strategy的值如：
   * 'minLength:6'是一个以冒号隔开的字符串。冒号前面的 minLength 代表挑选的 strategy对象，冒号后面的数字6表示在校验过程中所必需的一些参数。
   * 'minLength:6'的意思就是校验value的最小长度为 6。
   * 如果这个字符串中不包含冒号，说明校验过程中不需要额外的参数信息，比如'empty'。
   * errorMsg为当校验未通过时返回的错误信息。
   *
   */
  add(value, rules, errorMsg) {
    rules.forEach(rule => {
      let info = rule.strategy.split(":");
      this.cache.push(function () {
        let strategy = info.shift(); //获取要校验的strategy名
        info.unshift(value); //要检验的值
        info.push(rule.errorMsg); //错误信息
        return strategies[strategy](...info);
      })
    })
  }

  // 迭代cache数组，调用数组中的每个函数进行校验
  start() {
    const msg = '';
    this.cache.some(item => {
      msg = item();
      if (msg) {
        return true;
      }
    })
    return msg;
  }
}

export default Validator;
