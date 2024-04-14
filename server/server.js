const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "Gabi191271!", 
    database: "roomies",
    port: 3306
})

app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});


app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json("Please provide both username and password");
    }
    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if user exists
    const checkUserSql = "SELECT * FROM login WHERE username = ? LIMIT 1";
    db.query(checkUserSql, [username], (err, result) => {
        if (err) {
            console.error("Error checking for user", err);
            return res.status(500).json("Server error");
        }
        if (result.length > 0) {
            return res.status(409).json("User already exists");
        } else {
            // Insert new user
            const insertSql = "INSERT INTO login (username, password) VALUES (?, ?)";
            db.query(insertSql, [username, hashedPassword], (err, data) => {
                if (err) {
                    console.error("Signup error", err);
                    return res.status(500).json("Signup failed");
                }
                return res.status(201).json({ message: "User created", data });
            });
        }
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json("Please provide both username and password");
    }
    
    // Check if user exists and verify the password
    const querySql = "SELECT * FROM login WHERE username = ?";
    db.query(querySql, [username], async (err, result) => {
        if (err) {
            console.error("Login error", err);
            return res.status(500).json("Server error");
        }
        if (result.length === 0) {
            return res.status(401).json("Invalid credentials");
        }
        
        const user = result[0];
        const passwordIsValid = await bcrypt.compare(password, user.password);
        
        if (!passwordIsValid) {
            return res.status(401).json("Invalid credentials");
        }
        
        // User is authenticated at this point
        // You might want to add a way to handle sessions or tokens here
        res.json({ message: "Login successful" });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})