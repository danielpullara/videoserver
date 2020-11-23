import React from 'react';
import { Route } from 'react-router-dom';

import SignIn from './components/Form/SignIn/SignIn';
import SignUp from './components/Form/SignUp/SignUp';
import Upload from './components/Upload/Upload'
import Dashboard from './components/Dashboard/Dashboard';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import signOut from './components/SignOut/signOut'

function App() { 
  return (
    <React.Fragment>
     
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/video/:videoTitle" component={VideoPlayer}/>
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/upload" component={Upload} />
      <Route exact path="/signOut" render={signOut} />
    </React.Fragment>
  );
}

export default App;
