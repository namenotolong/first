import store from "@/store";

export default {
  inserted(el, binding) {
    const roles = binding.value;
    if (roles && roles instanceof Array && roles.length > 0) {
      const role = store.state.account.role;
      if (!roles.includes(role)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`需要传入像这样格式的指令 v-permission="['admin','editor']"`)
    }

  }
}
