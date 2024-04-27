import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"; 
import '../style/lunastyle.css';
import axios from 'axios';
import { Label } from '../Label';
import { Trophy } from '../Trophy';
import personal from './personal.png'
import group from './GroupWhite.png'
import Profiles from '../Leaderboard/personalProfiles';
import { Leaderboard } from '../Leaderboard/database';

//doesn't work yet,, just putting a rough structure - must use get and useEffect???

const ProfileGroup = () => {
  const [period, setPeriod] = useState(0);

    const handleClick = (e) =>{
        setPeriod(e.target.dataset.id)
    }

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
                <div className="rectangle">
                  <div className="group">
                  <img className="fluent-person" alt="Fluent person" src={personal} />
                    <div className="text-wrapper">personal</div>
                    
                  </div>
                </div>
              </div>
              <div className="textBox" >
                <div className="rectangle blue">
                <div className="group">
                  <img className="fluent-person" alt="Fluent person" src={group} />
                    <div className="text-wrapper white-text">manage roomies</div>
                    
                  </div>
                  </div>
              </div>
            </div>
            </div>
    
          </div>
          <div class='child1'>
          <div className='bodyWrapperBoard' style={{ paddingBottom: '30px' }}>
              <div className="col">
              <div className="box2">
            <div className="rectangle" >

        
            
            
            {/* <div className="duration">
                
                <button onClick={handleClick} data-id='7'>7 Days</button>
                <button onClick={handleClick} data-id='30'>30 Days</button>
                <button onClick={handleClick} data-id='0'>All time</button>
            </div> */}
            <div className="label1">
              <p className="your-roomies">
                <span className="text-wrapper"> your </span> 
                <span className="span"> room </span> 
                <span className="text-wrapper-2"> i </span> 
                <span className="text-wrapper-3"> es </span> 
              </p>
            </div>

            <Profiles Leaderboard={between(Leaderboard, period)}> </Profiles>
            </div>
            </div>
        </div>
        </div>
          </div>
        </div>
        </div>
      );
    };
    function between(data, between){
      const today = new Date();
      const previous = new Date(today);
      previous.setDate(previous.getDate() - (between + 1));
  
      let filter = data.filter(val => {
          let userDate = new Date(val.dt);
          if (between == 0) return val;
          return previous <= userDate && today >= userDate;
      })
  
      //sort with ascending order
      return filter.sort((a, b) => {
          if (a.score === b.score){
              return b.score - a.score;
          } else{
              return b.score - a.score;
          }
      })
  }
export default ProfileGroup;