import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import axios from 'axios';

function Todo() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPoints, setNewPoints] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user information from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAddTodo = () => {
    if (user) {
      axios.post('http://localhost:3000/create-task', {
        title: newTitle,
        description: newDescription,
        points: newPoints,
        groupName: user.group_name
      })
      .then(res => {
        // Fetch the updated tasks for the group
        fetchTasks();
        // Reset input fields
        setNewTitle('');
        setNewDescription('');
        setNewPoints('');
        // Add the new task to the allTodos state
        setTodos(prevTodos => [...prevTodos, res.data.result]);
      })
      .catch(err => {
        console.error("Error creating task", err);
      });
    }
  };

  const handleDeleteTodo = index => {
    // Implement delete functionality
  };

  const handleComplete = index => {
    const taskId = allTodos[index].id;
    axios.put(`http://localhost:3000/tasks/${taskId}/complete`)
      .then(res => {
        // Fetch the updated tasks for the group
        fetchTasks();
      })
      .catch(err => {
        console.error("Error completing task", err);
      });
  };

  const handleDeleteCompletedTodo = index => {
    // Implement delete completed todo functionality
  };

  const fetchTasks = () => {
    if (user) {
      axios.get(`http://localhost:3000/tasks/${user.group_name}`)
        .then(res => {
          const { tasks } = res.data;
          setTodos(tasks.filter(task => !task.completed));
          setCompletedTodos(tasks.filter(task => task.completed));
        })
        .catch(err => {
          console.error("Error fetching tasks", err);
        });
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const handleEdit = (ind, item) => {
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateToDo = () => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  };

  return (
    <div className='bodyWrapper'>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Recurring Chores:</label>
            <div className="input-box">
              <input
                type="text"
                value={newTitle}
                placeholder="What's the task title?"
                onChange={e => setNewTitle(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <div className="input-box">
              <input
                type="text"
                value={newDescription}
                placeholder="What's the task description?"
                onChange={e => setNewDescription(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
          </div>
          <div className="todo-input-item">
            <label>Points:</label>
            <div className="input-box">
              <input
                type="text"
                value={newPoints}
                placeholder="What's the task point value?"
                onChange={e => setNewPoints(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className='edit__wrapper' key={index}>
                    <input
                      placeholder='Updated Title'
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder='Updated Description'
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                    <button
                      type="button"
                      onClick={handleUpdateToDo}
                      className="primaryBtn"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>Points: {item.points}</p>
                    </div>

                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                        title="Complete?"
                      />
                      <AiOutlineEdit
                        className="check-icon"
                        onClick={() => handleEdit(index, item)}
                        title="Edit?"
                      />
                    </div>
                  </div>
                );
              }
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Points: {item.points}</p>
                    <p>
                      <small>Completed on: {item.completed_on}</small>
                    </p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Todo;