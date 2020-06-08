import React, {useState} from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import UserInfo from '../Components/UserInfo'
import UserMap from '../Components/UserMap'
import { Button } from 'react-bootstrap'


function UserProfile() {
  const [mapShow, setMapShow] = useState(true);
  const [timelineShow, setTimelineShow] = useState(false);
  const [galleryShow, setGalleryShow] = useState(false);
  const [followersShow, setFollowersShow] = useState(false);

  const toggleMap = () => {
    setMapShow(!mapShow)
    setTimelineShow(false)
    setGalleryShow(false)
    setFollowersShow(false)
  }
  const toggleTimeline = () => {
    setTimelineShow(!timelineShow)
    setMapShow(false)
    setGalleryShow(false)
    setFollowersShow(false)
  }
  const toggleGallery = () => {
    setGalleryShow(!galleryShow)
    setTimelineShow(false)
    setMapShow(false)
    setFollowersShow(false)
  }
  const toggleFollowers = () => {
    setFollowersShow(!followersShow)
    setTimelineShow(false)
    setGalleryShow(false)
    setMapShow(false)
  }

    return (
      <div className="user-profile">
        <h1>UserProfile</h1>
        <div className="tab-buttons">
          <Button variant="secondary" onClick={toggleMap}>Map</Button>{' '}
          <Button variant="secondary" onClick={toggleTimeline}>Timeline</Button>{' '}
          <Button variant="secondary" onClick={toggleGallery}>Gallery</Button>{' '}
          <Button variant="secondary" onClick={toggleFollowers}>Followers</Button>{' '}
        </div>
        <div>
          <div>
            <UserInfo />
          </div>
          <div>
            {followersShow ? <p>Followers</p> : ""}
            {timelineShow ? <p>Timeline</p> : ""}
            {galleryShow ? <p>Gallery</p> : ""}
            {mapShow ? <UserMap /> : ""}
            {/* <UserInfo />
            <UserMap /> */}
          </div>
        </div>
      </div>
    );
}

export default UserProfile;