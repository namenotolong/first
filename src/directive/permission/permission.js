export default {
    inserted(el, binding) {
        const roles = binding.value;
        if (roles && roles instanceof Array && roles.length > 0) {
            roles.push("超级管理员"); //超级管理员有所有权限
            const role = sessionStorage.getItem("EISroleName");
            if (!roles.includes(role)) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`need roles! Like v-permission="['admin','editor']"`)
        }

    }
}