import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Label } from '../Label';
import { Trophy } from '../Trophy';
import './profile.css';

function Profile() {
  const [userDetails, setUserDetails] = useState({ username: '', password: '' });
  const [groupDetails, setGroupDetails] = useState({ name: '', description: '', code: '' });
  const [roomies, setRoomies] = useState([]);

  const loggedInUserGroup = localStorage.getItem('userGroup');
  const loggedInUser = localStorage.getItem('username');

  useEffect(() => {
    // Fetch user details from the server
    axios.get(`http://localhost:3000/users/${loggedInUser}`)
  .then(res => {
    console.log('User data response:', res.data); // Log the response data
    if (res.data && res.data.users && res.data.users.length > 0) {
        // If the response is { users: [user] }
        setUserDetails(res.data.users[0]);
      } else {
        console.log('No user data found');
      }
  })
  .catch(err => {
    console.error('Error fetching user info:', err);
  });
    // Fetch group information and members from the server
    if (loggedInUserGroup) {
      // Fetch group details
      axios.get(`http://localhost:3000/groups/${loggedInUserGroup}`)
        .then(res => {
          if (res.data && res.data.group) {
            setGroupDetails({
              name: res.data.group.group_name,
              description: res.data.group.group_description,
              code: res.data.group.group_password // This should be handled cautiously
            });
          }
        })
        .catch(err => {
          console.error('Error fetching group info:', err);
        });

      // Fetch group members
      axios.get(`http://localhost:3000/users/group/${loggedInUserGroup}`)
        .then(res => {
          if (res.data && res.data.users) {
            setRoomies(res.data.users.map(u => u.username));
          }
        })
        .catch(err => {
          console.error('Error fetching group members:', err);
        });
    }
  }, [loggedInUser, loggedInUserGroup]);

  return (
    <div className='bodyWrapper2'>
      <div className="header">
        <Label />
        <Trophy />
      </div>
      <div className="todo-wrapper">
        <div className="profile-text">
          <label>Your Info</label>
        </div>
        <div className="user-list">
          <div>
            <span className="user-name2">username</span>
            <div className="user-details">
              <span className="user-name">Gabriel</span>
            </div>
          </div>
          <div className="user-name2">
            <span className="user-name2">password</span>
            <div className="user-details">
              {/* Password field should be treated securely, consider not displaying it or using a masked input */}
              <span className="user-name">12345</span>
            </div>
          </div>
        </div>
        <div className="profile-text">
          <label>Room Info</label>
        </div>
        <div className="user-list">
          <div>
            <span className="user-name2">group name</span>
            <div className="user-details">
              <span className="user-name">{groupDetails.name}</span>
            </div>
          </div>
          <div className="user-name2">
            <span className="user-name2">group description</span>
            <div className="user-details">
              <span className="user-name">{groupDetails.description}</span>
            </div>
          </div>
          <div className="user-name2">
            <span className="user-name2">group code</span>
            <div className="user-details">
              {/* Group code field should be treated securely, consider not displaying it or using a masked input */}
              <span className="user-name">{groupDetails.code}</span>
            </div>
          </div>
          <div className="user-name2">
            <span className="user-name2">roomies</span>
            <div className="user-details">
              <span className="user-name">{roomies.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;






