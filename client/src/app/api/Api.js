// Fake API ;)
export default {

    getUserList(success) {
        fetch('/userList.json')
            .then((res) => res.json())
            .then(success)
            .catch((data) => {
                console.log('error', data)
            })
    },

    getUserById(id, success) {
        fetch('/userList.json')
            .then((res) => res.json())
            .then((data) => {
                let result = data.find(x => Number(x.id) === Number(id));
                success(result)
            })
            .catch((data) => {
                console.log('error', data)
            })
    }
}