import React, {useState} from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import UserInfo from '../Components/UserInfo'
import UserMap from '../Components/UserMap'
import { Button, Nav } from 'react-bootstrap'


function UserProfile() {
  const [mapShow, setMapShow] = useState(false);
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
    console.log(localStorage.usertoken);
  }

    return (
      <div className="user-profile">
        <h1>UserProfile</h1>
        <div className="tab-buttons">
          {/* <Button variant="secondary" onClick={toggleMap}>Map</Button>{' '}
          <Button variant="secondary" onClick={toggleTimeline}>Timeline</Button>{' '}
          <Button variant="secondary" onClick={toggleGallery}>Gallery</Button>{' '}
          <Button variant="secondary" onClick={toggleFollowers}>Followers</Button>{' '} */}

          <Nav justify variant="tabs" defaultActiveKey="maps">
            <Nav.Item>
              <Nav.Link eventKey="maps" onClick={toggleMap}> Map </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="timeline" onClick={toggleTimeline}> Timeline </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="gallery" onClick={toggleGallery}> Gallery </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="followers" onClick={toggleFollowers} > Followers </Nav.Link>
            </Nav.Item>
          </Nav>

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
            {followersShow ? <p>Followers</p> : timelineShow ? <p>Timeline</p> : galleryShow ? <p>Gallery</p> : <UserMap />}
            {/* <UserInfo />
            <UserMap /> */}
          </div>
        </div>
      </div>
    );
}

export default UserProfile;