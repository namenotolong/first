import {
    login,
    logout,
    getUserInfo
} from "../../api/sysUser.js"

const sysUser = {
    state: {
        userId: sessionStorage.getItem("userId"),
        role: "",
    },
    mutations: {
        setId(state, id) {
            state.userId = id;
        },
        setRole(state, role) {
            state.role = role;
        },
    },
    actions: {
        login({
            commit
        }, loginInfo) {
            const username = loginInfo.username;
            const password = loginInfo.password;
            return new Promise((resolve, reject) => {
                login({
                    username,
                    password
                }).then(res => {
                    commit("setId", res.loginInfo.id);
                    sessionStorage.setItem("userId", res.loginInfo.id);
                    resolve();
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getUserInfo({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                getUserInfo({
                    id: state.userId
                }).then(res => {
                    commit("setRole", res.userInfo.role);
                    resolve();
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        logout({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                logout({
                    id: state.userId
                }).then(res => {
                    commit("setRole", "");
                    sessionStorage.clear();
                    resolve();
                }).catch((error) => {
                    reject(error);
                })
            })
        }
    }
}
export default sysUser;