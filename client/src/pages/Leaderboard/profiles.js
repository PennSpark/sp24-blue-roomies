import React from 'react';

export default function Profiles({ users }) {
  return <div id="profile">{renderUsers(users)}</div>;
}

function renderUsers(users = []) {
  return (
    <>
      {users.map((user, index) => (
        <div className="flex" key={user.id}>
          <div className="label">
            <div className="text-wrapper">#{index + 1}</div>
          </div>
          <div className="item">
            <img src={user.avatar} alt="" />
            <div className="info">
              <h3 className="name text-dark">{user.username}</h3>
            </div>
            <div className="score">
              <span>{user.points}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}