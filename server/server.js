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

app.put('/students/:username/points', async (req, res) => {
  const { username } = req.params;
  const { points } = req.body;

  const updatePointsSql = "UPDATE login SET points = points + ? WHERE username = ?";
  db.query(updatePointsSql, [points, username], (err, result) => {
    if (err) {
      console.error("Error updating points", err);
      return res.status(500).json({ message: "Server error: failed to update points" });
    }
    res.status(200).json({ message: "Points updated successfully" });
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the application!');
});

app.post('/create-group', async (req, res) => {
  const { groupName, groupDescription } = req.body;
  const insertGroupSql = "INSERT INTO groups_table (group_name, group_description, group_password) VALUES (?, ?)";
  db.query(insertGroupSql, [groupName, groupDescription], (err, result) => {
    if (err) {
      console.error("Error creating group", err);
      return res.status(500).json({ message: "Server error: failed to create group" });
    }
    res.status(201).json({ message: "Group created successfully", result });
  });
});

app.post('/signup', async (req, res) => {
  const { username, password, groupName, groupDescription, groupPassword } = req.body;
  if (!username || !password || !groupName || !groupPassword) {
    return res.status(400).json({ message: "Please provide username, password, group name, and group password" });
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
        const checkGroupSql = "SELECT * FROM groups_table WHERE group_name = ? AND group_password = ? LIMIT 1";
        db.query(checkGroupSql, [groupName, groupPassword], (err, groupResult) => {
          if (err) {
            console.error("Error checking for group or group code", err);
            return res.status(500).json({ message: "Server error" });
          }

          if (groupResult.length === 0) {
            // If the group doesn't exist, create a new group
            const insertGroupSql = "INSERT INTO groups_table (group_name, group_description, group_password) VALUES (?, ?, ?)";
            db.query(insertGroupSql, [groupName, groupDescription, groupPassword], (err, newGroupResult) => {
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
  const { title, description, points, groupName, todoDate } = req.body;

  const insertTaskSql = "INSERT INTO tasks (title, description, points, group_name, todo_date) VALUES (?, ?, ?, ?, ?)";
  db.query(insertTaskSql, [title, description, points, groupName, todoDate], (err, result) => {
    if (err) {
      console.error("Error creating task", err);
      return res.status(500).json({ message: "Server error: failed to create task" });
    }

    // Retrieve the newly created task data
    const newTaskId = result.insertId;
    const getNewTaskSql = "SELECT * FROM tasks WHERE id = ?";
    db.query(getNewTaskSql, [newTaskId], (err, newTaskResult) => {
      if (err) {
        console.error("Error retrieving new task", err);
        return res.status(500).json({ message: "Server error: failed to retrieve new task" });
      }

      const newTask = newTaskResult[0];
      res.status(201).json({ message: "Task created successfully", newTask });
    });
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
    console.log("Received data:", req.body); // Log incoming request body
    const taskId = req.params.taskId;
    const { username, points } = req.body;
  
    console.log("Completing task with ID:", taskId);
    console.log("Username:", username);
    console.log("Points passed from frontend:", points);
  
    // Update the task as completed
    const updateTaskSql = "UPDATE tasks SET completed = true, completed_on = NOW() WHERE id = ?";
    db.query(updateTaskSql, [taskId], (err, result) => {
      if (err) {
        console.error("Error updating task", err);
        return res.status(500).json({ message: "Server error: failed to update task" });
      }
  
      console.log("Task updated as completed");
  
      // Get the points value for the completed task
      const getPointsSql = "SELECT points FROM tasks WHERE id = ?";
      db.query(getPointsSql, [taskId], (err, pointsResult) => {
        if (err) {
          console.error("Error getting task points", err);
          return res.status(500).json({ message: "Server error: failed to get task points" });
        }
  
        if (pointsResult.length === 0) {
          console.error("Task not found");
          return res.status(404).json({ message: "Task not found" });
        }
  
        const taskPoints = pointsResult[0].points;
        console.log("Task Points from database:", taskPoints);
  
        // Update the user's points
        const updatePointsSql = "UPDATE login SET points = points + ? WHERE username = ?";
        db.query(updatePointsSql, [taskPoints, username], (err, updateResult) => {
          if (err) {
            console.error("Error updating points", err);
            return res.status(500).json({ message: "Server error: failed to update points" });
          }
  
          console.log("User points updated");
          console.log("Affected Rows:", updateResult.affectedRows);
  
          if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
          }
  
          res.status(200).json({ message: "Task completed successfully and points updated" });
        });
      });
    });
  });
  
app.put('/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, points } = req.body;

  const updateTaskSql = "UPDATE tasks SET title = ?, description = ?, points = ? WHERE id = ?";
  db.query(updateTaskSql, [title, description, points, taskId], (err, result) => {
    if (err) {
      console.error("Error updating task", err);
      return res.status(500).json({ message: "Server error: failed to update task" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  });
});

app.delete('/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;

  const deleteTaskSql = "DELETE FROM tasks WHERE id = ?";
  db.query(deleteTaskSql, [taskId], (err, result) => {
    if (err) {
      console.error("Error deleting task", err);
      return res.status(500).json({ message: "Server error: failed to delete task" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  });
});



app.get('/users/:groupName', async (req, res) => {
  const groupName = req.params.groupName;

  const getUsersSql = "SELECT * FROM login WHERE group_name = ? ORDER BY points DESC";
  db.query(getUsersSql, [groupName], (err, users) => {
    if (err) {
      console.error("Error fetching users", err);
      return res.status(500).json({ message: "Server error: failed to fetch users" });
    }
    res.status(200).json({ users });
  });
});

app.get('/users/:username', async (req, res) => {
  const username = req.params.username;

  const getUserSql = "SELECT login.username, login.password, login.group_name, groups_table.group_description, groups_table.group_password FROM login INNER JOIN groups_table ON login.group_name = groups_table.group_name WHERE login.username = ?";
  db.query(getUserSql, [username], (err, user) => {
    if (err) {
      console.error("Error fetching user", err);
      return res.status(500).json({ message: "Server error: failed to fetch user" });
    }
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user[0] }); // The frontend expects this structure
  });
});

app.get('/groups/:groupName', async (req, res) => {
  const groupName = req.params.groupName;

  const getGroupSql = "SELECT * FROM groups_table WHERE group_name = ?";
  db.query(getGroupSql, [groupName], (err, group) => {
    if (err) {
      console.error("Error fetching group", err);
      return res.status(500).json({ message: "Server error: failed to fetch group" });
    }
    if (group.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json({ group: group[0] });
  });
});

app.get('/users/group/:groupName', async (req, res) => {
  const groupName = req.params.groupName;

  const getUsersSql = "SELECT * FROM login WHERE group_name = ?";
  db.query(getUsersSql, [groupName], (err, users) => {
    if (err) {
      console.error("Error fetching users", err);
      return res.status(500).json({ message: "Server error: failed to fetch users" });
    }
    res.status(200).json({ users });
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});