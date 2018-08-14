import Util from "./Util"
import _ from 'lodash'

const USER_PREFIX_URL = '/users/'

export default {
    getUserList(searchReq = null) {
        let urlParams = _.isEmpty(searchReq) ? '' : '?' + Util.convertObjToUrl(searchReq)

        return fetch(USER_PREFIX_URL + urlParams)
            .then(handleStatus)
            .then((res) => res.json())
    },

    getUserById(id) {
        return fetch(USER_PREFIX_URL + id)
            .then(handleStatus)
            .then((res) => res.json())
    },

    deleteUser(id) {
        return fetch(USER_PREFIX_URL + id,
            {
                method: "DELETE",
            })
            .then(handleStatus)
            .then((res) => res.json())
    },

    createNewUser(data) {
        return fetch(USER_PREFIX_URL,
            {
                method: "POST",
                headers: getJsonHeader(),
                body: JSON.stringify(data)
            })
            .then(handleStatus)
            .then((res) => res.json())
    },

    updateUser(id, data) {
        return fetch(USER_PREFIX_URL + id,
            {
                method: "PATCH",
                headers: getJsonHeader(),
                body: JSON.stringify(data)
            })
            .then(handleStatus)
            .then((res) => res.json())
    }
}

function getJsonHeader() {
    return {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
}

function handleStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        let error = new Error(response.statusText || response.status)
        error.response = response
        return Promise.reject(error)
    }
}