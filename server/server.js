const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gabi191271!",
  database: "roomies",
  port: 3306
});

app.get('/', (req, res) => {
  res.send('Welcome to the application!');
});

app.post('/create-group', async (req, res) => {
  const { groupName, groupDescription } = req.body;
  const insertGroupSql = "INSERT INTO groups_table (group_name, group_description) VALUES (?, ?)";
  db.query(insertGroupSql, [groupName, groupDescription], (err, result) => {
    if (err) {
      console.error("Error creating group", err);
      return res.status(500).json({ message: "Server error: failed to create group" });
    }
    res.status(201).json({ message: "Group created successfully", result });
  });
});

app.post('/signup', async (req, res) => {
    const { username, password, groupName, groupDescription } = req.body;
    if (!username || !password || !groupName) {
      return res.status(400).json({ message: "Please provide username, password, and group name" });
    }
  
    try {
      // Hash password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if user exists
      const checkUserSql = "SELECT * FROM login WHERE username = ? LIMIT 1";
      db.query(checkUserSql, [username], (err, result) => {
        if (err) {
          console.error("Error checking for user", err);
          return res.status(500).json({ message: "Server error" });
        }
        if (result.length > 0) {
          return res.status(409).json({ message: "User already exists" });
        } else {
          // Check if the group exists
          const checkGroupSql = "SELECT * FROM groups_table WHERE group_name = ? LIMIT 1";
          db.query(checkGroupSql, [groupName], (err, groupResult) => {
            if (err) {
              console.error("Error checking for group", err);
              return res.status(500).json({ message: "Server error" });
            }
  
            if (groupResult.length === 0) {
              // If the group doesn't exist, create a new group
              const insertGroupSql = "INSERT INTO groups_table (group_name, group_description) VALUES (?, ?)";
              db.query(insertGroupSql, [groupName, groupDescription], (err, newGroupResult) => {
                if (err) {
                  console.error("Error creating new group", err);
                  return res.status(500).json({ message: "Server error" });
                }
              });
            }
  
            // Insert new user with the group name
            const insertUserSql = "INSERT INTO login (username, password, group_name) VALUES (?, ?, ?)";
            db.query(insertUserSql, [username, hashedPassword, groupName], (err, data) => {
              if (err) {
                console.error("Signup error", err);
                return res.status(500).json({ message: "Signup failed" });
              }
              return res.status(201).json({ message: "User created", data });
            });
          });
        }
      });
    } catch (error) {
      console.error("Signup error", error);
      return res.status(500).json({ message: "Server error" });
    }
  });

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please provide both username and password" });
  }

  try {
    // Check if user exists and verify the password
    const querySql = "SELECT * FROM login WHERE username = ?";
    db.query(querySql, [username], async (err, result) => {
      if (err) {
        console.error("Login error", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const user = result[0];
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // User is authenticated at this point
      // You might want to add a way to handle sessions or tokens here
      res.json({ message: "Login successful", user });
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post('/create-task', async (req, res) => {
    const { title, description, points, groupName } = req.body;
  
    const insertTaskSql = "INSERT INTO tasks (title, description, points, group_name) VALUES (?, ?, ?, ?)";
    db.query(insertTaskSql, [title, description, points, groupName], (err, result) => {
      if (err) {
        console.error("Error creating task", err);
        return res.status(500).json({ message: "Server error: failed to create task" });
      }
      res.status(201).json({ message: "Task created successfully", result });
    });
  });

  app.get('/tasks/:groupName', async (req, res) => {
    const groupName = req.params.groupName;
  
    const getTasksSql = "SELECT * FROM tasks WHERE group_name = ?";
    db.query(getTasksSql, [groupName], (err, tasks) => {
      if (err) {
        console.error("Error fetching tasks", err);
        return res.status(500).json({ message: "Server error: failed to fetch tasks" });
      }
      res.status(200).json({ tasks });
    });
  });

app.put('/tasks/:taskId/complete', async (req, res) => {
  const taskId = req.params.taskId;

  const updateTaskSql = "UPDATE tasks SET completed = true, completed_on = NOW() WHERE id = ?";
  db.query(updateTaskSql, [taskId], (err, result) => {
    if (err) {
      console.error("Error updating task", err);
      return res.status(500).json({ message: "Server error: failed to update task" });
    }
    res.status(200).json({ message: "Task completed successfully" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});