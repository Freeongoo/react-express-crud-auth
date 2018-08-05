const USER_PREFIX_URL = '/users/'

export default {

    getUserList(success) {
        fetch(USER_PREFIX_URL)
            .then(status)
            .then((res) => res.json())
            .then(success)
            .catch((error) => {
                console.log('error', error)
            })
    },

    getUserById(id, success) {
        fetch(USER_PREFIX_URL + id)
            .then(status)
            .then((res) => res.json())
            .then(success)
            .catch((error) => {
                console.log('error', error)
            })
    },

    deleteUser(id, success) {
        fetch(USER_PREFIX_URL + id,
            {
                method: "DELETE",
            })
            .then(status)
            .then((res) => res.json())
            .then(success)
            .catch(function (error) {
                console.log('error', error)
            });
    },

    createNewUser(data, success) {
        fetch(USER_PREFIX_URL,
            {
                method: "POST",
                headers: getJsonHeader(),
                body: JSON.stringify(data)
            })
            .then(status)
            .then((res) => res.json())
            .then(success)
            .catch(function (error) {
                console.log('error', error)
            });
    },

    updateUser(id, data, success) {
        fetch(USER_PREFIX_URL + id,
            {
                method: "PATCH",
                headers: getJsonHeader(),
                body: JSON.stringify(data)
            })
            .then(status)
            .then((res) => res.json())
            .then(success)
            .catch(function (error) {
                console.log('error', error)
            });
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