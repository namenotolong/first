import { Message } from 'element-ui';


// 复制一段内容到剪切板板
// 参数content可以是一个字符串也可以是一个dom元素
function copy(content) {
  const copyNode = (elem) => {
    const selection = window.getSelection();
    // 如果剪切板中已经有复制了的内容，需要清掉。
    if (selection.rangeCount > 0) selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(elem);
    selection.addRange(range);
    document.execCommand('Copy');
    // 清除选中的内容,也可以使用 window.getSelection().removeAllRanges()
    range.collapse(false);

    Message({
      type: 'success',
      message: '复制成功',
    })
  }

  if (!content) {
    Message({
      type: 'warning',
      message: '没有要复制的内容',
    })
  } else if (content.nodeType === 1) {
    copyNode(content);
  } else if (typeof content === 'string') {
    const wrap = document.createElement('p');
    wrap.innerText = content;
    document.body.appendChild(wrap);
    copyNode(wrap);
    document.body.removeChild(wrap);
  } else {
    Message({
      type: 'warning',
      message: '没有可以复制的内容',
    })
  }
}



export default {
  inserted(el, binding) {
    const value = binding.value;
    el._conetnt = value;
    el.addEventListener('click', () => {
      el.blur()
      copy(el._conetnt)
    });
  },
  update(el, binding) {
    const value = binding.value;
    el._conetnt = value;
  }
}



