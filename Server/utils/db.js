import mysql from 'mysql2'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Randheer@123",
    database: "employeems"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
        console.log(err);
    } else {
        console.log("Connected")
    }
})

export default con;