import './App.css';

import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom'

/* import Login from './components/Auth/Login/Login'; */
import DInteractions from './components/Drug-Interactions/DInteractions';
/*import Profile from './Components/Auth/Profile/Profile';*/
/* import ABuddy from './Components/ABuddy/ABuddy'; */
/*import Medication from './Components/Medication/Medication'; 
import TimezoneApp from './Components/TimeZone/Timezone';
import Logout from './Components/Auth/Logout/Logout'*/

function App() {
  const [ sessionToken, setSessionToken ] = useState('');

  //console.log('App:', sessionToken);

  const updateToken = newToken => {
    localStorage.setItem('token', newToken)
    setSessionToken(newToken)
  }


  /* 
  # useEffect()
  - Allows us to perform side effects in functional components.
  - Accepts two arguments
    -function
    -dependency
      -optional
      -Can denote a specific event to trigger
    
    EXAMPLES:
    useEffect(() => {
      Runs on every render
    });

    useEffect(() => {
      Runs only on the first render
    }, []);

    useEffect(() => {
        Runs on first render
        Runs any time any dependency changes
    }, [state]);
  */

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])
  
  return (
    <div className="App">
     {/*  {
        sessionToken !== '' ?
        <Logout setToken={setSessionToken} /> : null     
      } */}
     <Routes>
     
     {/*  <Route
          path="/"
          element={<Login token={updateToken}/>}
        /> */}
        {/* <Route
          element={<Profile token={sessionToken}/>}
    />*/}
        {/* <Route 
          path='/'
          element={<ABuddy token={sessionToken}/>}
        /> */}
        {/*<Route 
          element={<Medication token={sessionToken}/>}        
        /> */}
        <Route
          path="/"
          element={<DInteractions token={updateToken}/>}
        />
      </Routes>
    </div>
    
  );
}

export default App;

