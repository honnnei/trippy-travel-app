import React, {useEffect} from 'react';
import NavbarComponent from '../Components/Navbar';

//import { BrowserRouter as Router } from 'react-router-dom';

function GlobalFeed() {
  //const [users, setUsers ] = useState();
  const getUsers = () => {
    console.log('get users')
  }
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="user-profile">
            <NavbarComponent />

        <h1>GlobalFeed</h1>
    </div>
  );
}

export default GlobalFeed;