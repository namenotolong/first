import { copy } from '@/utils/core';


export default {
  inserted(el, binding) {
    const value = binding.value || el;
    el._conetnt = value;
    el.addEventListener('click', () => copy(el._conetnt));
  },
  update(el, binding) {
    const value = binding.value || el;
    el._conetnt = value;
  }
}



