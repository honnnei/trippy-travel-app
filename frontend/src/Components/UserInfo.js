import React from 'react';
import { Button } from 'react-bootstrap'

function UserInfo() {
    
    return (
      <div className="user-info">
          <h1>Default Name</h1>
          <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="profile picture" width="200" height="170" />
          <p>Hi, I've just joined trippy!</p>
          <p>I've visited (db) countries and counting!</p>
          <Button>Edit Bio</Button>
      </div>
    );
}

export default UserInfo;