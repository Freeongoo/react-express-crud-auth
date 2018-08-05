const USER_PREFIX_URL = '/users/'

export default {

    getUserList() {
        return fetch(USER_PREFIX_URL)
            .then(status)
            .then((res) => res.json())
    },

    getUserById(id) {
        return fetch(USER_PREFIX_URL + id)
            .then(status)
            .then((res) => res.json())
    },

    deleteUser(id) {
        return fetch(USER_PREFIX_URL + id,
            {
                method: "DELETE",
            })
            .then(status)
            .then((res) => res.json())
    },

    createNewUser(data) {
        return fetch(USER_PREFIX_URL,
            {
                method: "POST",
                headers: getJsonHeader(),
                body: JSON.stringify(data)
            })
            .then(status)
            .then((res) => res.json())
    },

    updateUser(id, data) {
        return fetch(USER_PREFIX_URL + id,
            {
                method: "PATCH",
                headers: getJsonHeader(),
                body: JSON.stringify(data)
            })
            .then(status)
            .then((res) => res.json())
    }
}

function getJsonHeader() {
    return {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}