import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../style/lunastyle.css'; // Ensure CSS styles are properly set

const GroupSetupForm = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [tasks, setTasks] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/create-group', {
        groupName,
        groupDescription,
        tasks
      });
      if (response.status === 201) {
        alert('Group created successfully');
        navigate('/dashboard'); // navigate to a dashboard or appropriate page
      }
    } catch (err) {
      console.error("Error creating group: ", err.response.data);
      alert('Failed to create group');
    }
  };

  return (
    <div className='bodyWrapper'>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Create Group</h1>
          <div className="input-box">
            <input type="text" placeholder="Group Name" value={groupName} onChange={e => setGroupName(e.target.value)} required />
          </div>
          <div className="input-box">
            <textarea placeholder="Group Description" value={groupDescription} onChange={e => setGroupDescription(e.target.value)} required />
          </div>
          <div className="input-box">
            <textarea placeholder="Tasks" value={tasks} onChange={e => setTasks(e.target.value)} required />
          </div>
          <button type="submit" className="btn">Create Group</button>
        </form>
      </div>
    </div>
  );
};

export default GroupSetupForm;