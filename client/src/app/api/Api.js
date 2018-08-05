export default {

    getUserList(success) {
        fetch('/users')
            .then((res) => res.json())
            .then(success)
            .catch((error) => {
                console.log('error', error)
            })
    },

    getUserById(id, success) {
        fetch('/users/' + id)
            .then((res) => res.json())
            .then(success)
            .catch((error) => {
                console.log('error', error)
            })
    },

    createNewUser(data, success) {
        fetch("/users",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(status)
            .then(json)
            .then(success)
            .catch(function (error) {
                console.log('error', error)
            });
    },

    updateUser(id, data, success) {
        fetch("/users/" + id,
            {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(status)
            .then(json)
            .then(success)
            .catch(function (error) {
                console.log('error', error)
            });
    }
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}