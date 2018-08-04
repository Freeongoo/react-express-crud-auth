export default {

    getUserList(success) {
        fetch('/users')
            .then((res) => res.json())
            .then(success)
            .catch((data) => {
                console.log('error', data)
            })
    },

    getUserById(id, success) {
        fetch('/users/' + id)
            .then((res) => res.json())
            .then(success)
            .catch((data) => {
                console.log('error', data)
            })
    }
}