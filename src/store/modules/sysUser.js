import {
    login,
    getUserInfo
} from "../../api/sysUser.js"

const user = {
    state: {
        userId: "",
        name: "",
        roles: [],
        avatar: "",
    },
    mutations: {
        setId(state, id) {
            state.userId = id;
        },
        setName(state, name) {
            state.name = name;
        },
        setRoles(state, roles) {
            state.roles = roles;
        },
        setAvatar(state, avatar) {
            state.avatar = avatar;
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
                    commit("setId", res.data.id);
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
                    const data = res.data;
                    commit("setName", data.name);
                    commit("setRoles", data.roles);
                    commit("setAvatar", data.avatar);
                    resolve();
                }).catch((error) => {
                    reject(error);
                })
            })
        }
    }
}

export default user;