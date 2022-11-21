import {requestApi} from "./request";

export const authApi = {
    login: (username, password) =>
        new Promise((resolve, reject) => {
            requestApi
                .post("auth/signin", { username: username, password: password })
                .then(res => resolve(res))
                .catch(err => reject(err))
        }),
    refresh: refreshToken =>
        new Promise((resolve, reject) => {
            requestApi
                .post("auth/refresh", { refreshToken: refreshToken })
                .then(res =>resolve(res))
                .catch(err => reject(err))
        })
}
