import React from "react";
import LoginPage from "./LoginPage.jsx";
import ChatPage from "./ChatPage.jsx";
import Nav from "./Nav.jsx";
import SignUpPage from "./SignUpPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return ( <div >
    <Router>
      <Nav />
     <Routes>
       <Route path="/" element={ <ChatPage/>}/>
       <Route path="login" element={ <LoginPage />}/>
       <Route path="signup" element={ <SignUpPage />}/>
       <Route path="*" element={ <NotFoundPage/>}/>
       </Routes>
     </Router>
     </div>
);
}




  


export default App;
// {/* <Router>
// <Routes>
//   <Route path="/" element={ <ChatPage/>}/>
//   <Route path="/login" element={ <Login />}/>
//   </Routes>
// </Router> */}