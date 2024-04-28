import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Label } from '../Label';
import { Trophy } from '../Trophy';

function Todo() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPoints, setNewPoints] = useState('');
  const [newTodoDate, setNewTodoDate] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const loggedInUserGroup = localStorage.getItem('userGroup');

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    // Fetch tasks from the server based on the logged-in user's group
    axios.get(`http://localhost:3000/tasks/${loggedInUserGroup}`)
      .then(res => {
        console.log(res);
        setTodos(res.data.tasks);
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
      });
  }, [loggedInUserGroup]);

  const handleAddTodo = () => {
    axios.post('http://localhost:3000/create-task', {
      title: newTitle,
      description: newDescription,
      points: parseInt(newPoints, 10) || 0,  // Ensure points are integers
      groupName: loggedInUserGroup,
      todoDate: moment(newTodoDate).isValid() ? moment(newTodoDate).format('YYYY-MM-DD') : null // Handle invalid dates
    })
    .then(res => {
      console.log(res);
      // Update the local state with the newly created task
      setTodos([...allTodos, res.data.newTask]);
      // Clear the input fields
      setNewTitle('');
      setNewDescription('');
      setNewPoints('');
      setNewTodoDate('');
    })
    .catch(err => {
      console.error('Error creating task:', err);
    });
  };

  const handleDeleteTodo = index => {
    const taskToDelete = allTodos[index];

    axios.delete(`http://localhost:3000/tasks/${taskToDelete.id}`)
      .then(res => {
        console.log(res);
        // Remove the deleted task from the allTodos array
        const updatedTodos = allTodos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
      })
      .catch(err => {
        console.error('Error deleting task:', err);
      });
  };

  const handleComplete = (index) => {
    const taskToComplete = allTodos[index];
  
    // Get the logged-in user's username
    const loggedInUser = localStorage.getItem('username');
  
    console.log("Completing task:", taskToComplete);
    console.log("Logged in user:", loggedInUser);
  
    axios.put(`http://localhost:3000/tasks/${taskToComplete.id}/complete`, {
      username: loggedInUser,
      points: taskToComplete.points // Pass the points value to the backend
    })
      .then(res => {
        console.log("Task completion response:", res);
        // Remove the completed task from the allTodos array
        const updatedTodos = allTodos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        // Add the completed task to the completedTodos array
        setCompletedTodos([...completedTodos, { ...taskToComplete, completedOn: new Date().toLocaleString() }]);
      })
      .catch(err => {
        console.error('Error completing task:', err);
      });
  };

  const handleDeleteCompletedTodo = index => {
    const taskToDelete = completedTodos[index];

    axios.delete(`http://localhost:3000/tasks/${taskToDelete.id}`)
      .then(res => {
        console.log(res);
        // Remove the deleted task from the completedTodos array
        const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index);
        setCompletedTodos(updatedCompletedTodos);
      })
      .catch(err => {
        console.error('Error deleting completed task:', err);
      });
  };

  const handleEdit = (ind, item) => {
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEdit('');
    setCurrentEditedItem('');
  };

  const handleUpdateTitle = value => {
    setCurrentEditedItem(prev => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = value => {
    setCurrentEditedItem(prev => {
      return { ...prev, description: value };
    });
  };

  const handleUpdatePoints = value => {
    setCurrentEditedItem(prev => {
      return { ...prev, points: value };
    });
  };

  const handleUpdateTodoDate = value => {
    setCurrentEditedItem(prev => {
      return { ...prev, todo_date: value };
    });
  };

  const handleUpdateToDo = () => {
    axios.put(`http://localhost:3000/tasks/${currentEditedItem.id}`, {
      ...currentEditedItem,
      todo_date: moment(currentEditedItem.todo_date).format('YYYY-MM-DD') // Format the date to SQL format
    })
      .then(res => {
        console.log(res);
        // Update the allTodos array with the updated task
        const updatedTodos = allTodos.map(todo => {
          if (todo.id === currentEditedItem.id) {
            return { ...currentEditedItem, todo_date: moment(currentEditedItem.todo_date).format('YYYY-MM-DD') };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setShowModal(false);
        setCurrentEdit('');
        setCurrentEditedItem('');
      })
      .catch(err => {
        console.error('Error updating task:', err);
      });
  };

  return (
    <div className='bodyWrapper2'>
    <div className="header">
                <Label />
                <Trophy />
      </div>
    <div>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              placeholder="Enter task title"
              onChange={e => setNewTitle(e.target.value)}
              required
              style={{ color: 'black', backgroundColor: 'white' }}
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              placeholder="Enter task description"
              onChange={e => setNewDescription(e.target.value)}
              required
              style={{ color: 'black', backgroundColor: 'white' }}
            />
          </div>
          <div className="todo-input-item">
            <label>Points</label>
            <input
              type="number"
              value={newPoints}
              placeholder="Enter task points"
              onChange={e => setNewPoints(e.target.value)}
              required
              style={{ color: 'black', backgroundColor: 'white' }}
            />
          </div>
          <div className="todo-input-item">
            <label>Due Date</label>
            <input
              type="date"
              value={newTodoDate}
              onChange={e => setNewTodoDate(e.target.value)}
              required
              style={{ color: 'black', backgroundColor: 'white' }}
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
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
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Points: {item.points}</p>
                  <p>Due Date: {moment(item.todo_date).format('YYYY-MM-DD')}</p>
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
            ))}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Points: {item.points}</p>
                  <p>Due Date: {moment(item.todo_date).format('YYYY-MM-DD')}</p>
                  <p>
                    <small>Completed on: {item.completedOn}</small>
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
            ))}
        </div>

        <div className="calendar-view">
          <Calendar
            localizer={localizer}
            events={allTodos.map(todo => ({
              title: todo.title,
              start: new Date(todo.todo_date),
              end: new Date(todo.todo_date),
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, color: 'black' }}
          />
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <div className="modal-input-item">
              <label style={{color: '#FF8C83'}}>Title</label>
              <input
                placeholder="Updated Title"
                onChange={e => handleUpdateTitle(e.target.value)}
                value={currentEditedItem.title}
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="modal-input-item">
              <label style={{color: '#FF8C83'}}>Description</label>
              <textarea className='modal-input-item-textarea'
                placeholder="Updated Description"
                rows={4}
                onChange={e => handleUpdateDescription(e.target.value)}
                value={currentEditedItem.description}
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="modal-input-item">
              <label style={{color: '#FF8C83'}}>Points</label>
              <input
                type="number"
                placeholder="Updated Points"
                onChange={e => handleUpdatePoints(e.target.value)}
                value={currentEditedItem.points}
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="modal-input-item">
              <label style={{color: '#FF8C83'}}>Due Date</label>
              <input
                type="date"
                placeholder="Updated Due Date"
                onChange={e => handleUpdateTodoDate(e.target.value)}
                value={moment(currentEditedItem.todo_date).format('YYYY-MM-DD')}
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="modal-buttons">
              <button type="button" onClick={handleUpdateToDo} className="primaryBtn">
                Update
              </button>
              <button type="button" onClick={handleCloseModal} className="secondaryBtn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Todo;