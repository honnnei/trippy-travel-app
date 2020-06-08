import React, {useState} from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import UserInfo from '../Components/UserInfo'
import UserMap from '../Components/UserMap'
import { Button } from 'react-bootstrap';
import Gallery from '../Components/Gallery';
import Timeline from '../Components/Timeline';

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
      <div className="user-profile-page-container">
        <div className="user-info-sidebar-container" >
            <UserInfo />
        </div>
        <div className="timeline-gallery-map-container">
          <div className="t-g-m-navbar">
            <Button variant="secondary" onClick={toggleMap}>Map</Button>{' '}
            <Button variant="secondary" onClick={toggleTimeline}>Timeline</Button>{' '}
            <Button variant="secondary" onClick={toggleGallery}>Gallery</Button>{' '}
            <Button variant="secondary" onClick={toggleFollowers}>Followers</Button>{' '}
          </div>
          <div className="t-g-m-container">
            {timelineShow ? <Timeline /> : ""}
            {galleryShow ? <Gallery /> : ""}
            {mapShow ? <UserMap /> : ""}
          </div>
        </div>
      </div>
    );
}

export default UserProfile;