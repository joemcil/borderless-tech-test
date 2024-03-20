import React from 'react';

const UserCard = ({ user }) => (
  <div className="card">
    <img src={user.image} alt={user.name} className="card-image" />
    <div className="card-info">
      <h2 className="card-name">
        {user.name}
        <img src={user.flag} alt="Country Flag" className="card-flag" />
      </h2>
      <div className="card-verified-badge">BORDERLESS VERIFIED</div>
      <div className="card-detail">
        <span className="card-detail-key">Location</span>
        <span className="card-detail-value">{user.address.city}</span>
      </div>
      <div className="card-detail">
        <span className="card-detail-key">Company</span>
        <span className="card-detail-value">{user.company.name}</span>
      </div>
    </div>
  </div>
);

export default UserCard;
