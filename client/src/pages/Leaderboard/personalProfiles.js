import React from 'react'

export default function personalProfiles({ Leaderboard }) {
  return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
  )
}
//!!!!!!!!!!
//note that we don't want to display ourselves in manage roomies page... see how that works backend

function Item(data = []){
    return (
        
        <>
            {
                data.map((value, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <img src={value.img} alt="" />
            
                            <div className="info">
                                <h3 className='name text-dark'>{value.name}</h3>    
                                {/* <span>{value.location}</span> */}
                            </div>            
                        </div>
                    </div>
                    )
                )
            }
        </>
        

        
    )
}