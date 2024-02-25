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
    port: 3036
})

app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?"
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, values, (err, data) => {
        if (err) return res.json("Login failed");
        return res.json(data);
    })
})

app.listen(3036, () => {
    console.log("Listening...")
})