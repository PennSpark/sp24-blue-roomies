const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "sql5.freesqldatabase.com", 
    user: "sql5686573", 
    password: "dVx4szlrAB", 
    database: "sql5686573",
    port: 3306
})

app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});

//login should check whetehr username and password match
app.post('/login', (req, res) => {
    const sql = "INSERT INTO login (username, password) VALUES (?, ?)"
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, values, (err, data) => {
        console.log("This is the error" + err)
        console.log("This is the data" + data)
        if (err) return res.json("Login failed");
        return res.json(data);
    })
})

//signup insert into database, ask gabreil
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (username, password) VALUES (?, ?)"
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, values, (err, data) => {
        console.log("This is the error" + err)
        console.log("This is the data" + data)
        if (err) return res.json("Login failed");
        return res.json(data);
    })
})

app.listen(3306, () => {
    console.log("Listening...")
})