import React, { useState } from 'react';
import Profiles from './profiles';
import { Leaderboard } from './database';
import { Label } from '../Label';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; 
import '../style/lunastyle.css';
import { Trophy } from '../Trophy';
/*

const Board = () => {
  const [period, setPeriod] = useState(0);

  const handleClick = (e) => {
    setPeriod(e.target.dataset.id);
  };

  const  = (data, ) => {
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(today.getDate() - );

    return data.filter(val => {
      let userDate = new Date(val.dt);
      if ( === 0) {
        return true; // Show all time data if period is 0
      }
      return previous <= userDate && userDate <= today;
    }).sort((a, b) => b.score - a.score); // Sort descending by score
  }

  return (
    <div className="board">
      <h1 className="leaderboard">Leaderboard</h1>
      <div className="duration">
        <button onClick={handleClick} data-id="7">7 Days</button>
        <button onClick={handleClick} data-id="30">30 Days</button>
        <button onClick={handleClick} data-id="0">All-Time</button>
      </div>
      <Profiles Leaderboard={(Leaderboard, period)} />
    </div>
  );
}

export default Board;
*/

export default function Board() {

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
            <div className='bodyWrapperBoard' style={{ paddingBottom: '30px' }}>
              <div className="col">
            <h1 className='leaderboard' style={{ marginBottom: '10px', textAlign: 'center' }}>Leaderboard
            </h1>
            <div className='wrapperBoard' style={{ paddingTop: '10px', paddingBottom: '30px' }}>


        
            
            
            {/* <div className="duration">
                
                <button onClick={handleClick} data-id='7'>7 Days</button>
                <button onClick={handleClick} data-id='30'>30 Days</button>
                <button onClick={handleClick} data-id='0'>All time</button>
            </div> */}

            <Profiles Leaderboard={between(Leaderboard, period)}> </Profiles>

            </div>
        </div>
        </div>
        </div>
    )
}

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
