import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"; 
import '../style/lunastyle.css';
import axios from 'axios';
import { Label } from '../Label';
import { Trophy } from '../Trophy';
import personal from './PersonalWhite.png'
import group from './group.png'

//doesn't work yet,, just putting a rough structure - must use get and useEffect???

const Profile = () => {
  const navigate = useNavigate();
  const handleClick1 = () => {
    navigate('/profileGroup');
  };



  return (
    <div className="board">
            <div className="header">
                <Label />
                <Trophy />
            </div>
    <div class='parent'>
      <div class='child1'>
        <div className="text-wrapper">profile</div>
        <div className="box1">
        <div className="rectangle" >
          <div className="textBox" >
            <div className="rectangle blue">
              <div className="group">
              <img className="fluent-person" alt="Fluent person" src={personal} />
                <div className="text-wrapper white-text">personal</div>
                
              </div>
            </div>
          </div>
          <div className="textBox">
            <div className="rectangle" onClick={handleClick1}>
            <div className="group" onClick={handleClick1}>
              <img className="fluent-person" alt="Fluent person" src={group} onClick={handleClick1}/>
                <div className="text-wrapper">manage roomies</div>
                
              </div>
              </div>
          </div>
        </div>
        </div>

      </div>
      <div class='child1'>
      <div className="text-wrapper">manage roomies</div>
      </div>
    </div>
    </div>
  );
};

export default Profile;