import {toast} from "react-hot-toast";

const serverUrl = url => {
    const serverUrl = "http://localhost:5000/api";
    // const serverUrl = process.env.NODE_ENV === 'production' ? getConfig().url_prod : getConfig().url_dev;

    return serverUrl + "/" + url;
}
const setRequestOptions = (method, body) => {
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
}

const handleResponse = (response, resolve, reject, toJson = false) => {
    if (response.status >= 300) {
        if (response.status === 401) {
        }
        response.json().then(err => {
            if (err[0] !== undefined) {
                toast.error("Erreur: " + err[0].message)
            } else {
                toast.error("Erreur: " + err.message)
            }
        })
        reject(response)
    }
    toJson ? resolve(response.json()) : resolve(response)
}
export const requestApi = {
    get: url =>
        new Promise((resolve, reject) => {
            fetch(serverUrl(url), setRequestOptions())
                .then(res => handleResponse(res, resolve, reject, true))
                .catch(err => handleResponse(err, resolve, reject))
        }),
    post: (url, body) =>
        new Promise((resolve, reject) => {
            fetch(serverUrl(url), setRequestOptions('POST', body))
                .then(res => handleResponse(res, resolve, reject))
                .catch(err => handleResponse(err, resolve, reject))
        }),
    put: (url, body) =>
        new Promise((resolve, reject) => {
            fetch(serverUrl(url), setRequestOptions('PUT', body))
                .then(res => handleResponse(res, resolve, reject))
                .catch(err => handleResponse(err, resolve, reject))
        }),
    delete: url =>
        new Promise((resolve, reject) => {
            fetch(serverUrl(url), setRequestOptions('DELETE'))
                .then(res => handleResponse(res, resolve, reject))
                .catch(err => handleResponse(err, resolve, reject))
        })
}