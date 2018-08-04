# Example create react application with express

## Configuration

`cp db/conn.js.dist db/conn.js`

Set correct login, password and db name

## Configuration MongoDB

* Install MongoDB
* run in console `mongo`
* Configuration from console mongo:
    * Create new db:
    ```
    $ use user
    ```
    * Create login and password:
    ```
    $ db.createUser({user:"admin", pwd:"admin", roles:[{role:"readWrite", db:"user"}]})
    ```
    don't forget change password