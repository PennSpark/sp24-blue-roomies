import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './board.css';
import { Trophy } from '../Trophy';
import { Label } from '../Label';
import image1 from './1.png'
import image2 from './2.png'
import image3 from './3.png'


function Todo() {
  const [users, setUsers] = useState([]);
  const loggedInUserGroup = localStorage.getItem('userGroup');
  const getImageForUser = (index) => {
    const images = [image1, image2, image3];
    return images[index % images.length];
  };


  useEffect(() => {
    // Fetch users from the server based on the logged-in user's group
    axios.get(`http://localhost:3000/users/${loggedInUserGroup}`)
      .then(res => {
        console.log(res);
        setUsers(res.data.users);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  }, [loggedInUserGroup]);

  return (
    <div className='bodyWrapper2'>
    <div className="header">
      <Label />
      <Trophy />
    </div>
    <div>
      <div className="todo-wrapper">
        <div className="leaderboard-text">
          <label>leaderboard: <span>{loggedInUserGroup}</span></label>
        </div>
        <div className="user-list">
          {users.map((user, index) => (
            <div className="user-list-item" key={user.id}>
              <div className="user-rank" style={{ color: index === 0 ? '#FFB95C' : '#6d6c6c' }}>#{index + 1}</div>
              <div className="user-details">
                <div className="user-image">
                  <img src={getImageForUser(index)} alt="user-icon" /> {/* Inserted image here */}
                </div>
                <span className="user-name">{user.username}</span>
                <span className="user-points">{user.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default Todo;