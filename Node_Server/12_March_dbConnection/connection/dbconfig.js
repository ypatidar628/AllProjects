import mysql from "mysql"

const connection  = mysql.createPool({
    user:'root',
    password:'',
    database:'mynode',
    // port:3306 by default
})

export default connection;