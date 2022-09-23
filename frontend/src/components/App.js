import {React, useState} from "react";
import LoginPage from "./LoginPage.jsx";
import ChatPage from "./Chat/ChatPage.jsx";
import Navigation from "./Nav.jsx";
import SignUpPage from "./SignUpPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import {BrowserRouter as Router,Routes, Switch, Route,Link, useLocation, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import useAuth from "../hooks/authHooks.jsx";
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn===true ? children : <Navigate  to='login'/>
  );
};

function App() {

  return ( 
  <AuthProvider>
    <div className="d-flex flex-column h-100">
            <Router>
                <Navigation />
              <Routes>
                <Route path="login" element={ <LoginPage />}/>
                <Route path="signup" element={ <SignUpPage />}/>
                <Route path="*" element={ <NotFoundPage/>}/>
                <Route path="/" element={<ChatRoute><ChatPage /></ChatRoute>} />
              </Routes>
             </Router>
     </div>      
   </AuthProvider>

);
}


  


export default App;
// {/* <Router>
// <Routes>
//   <Route path="/" element={ <ChatPage/>}/>
//   <Route path="/login" element={ <Login />}/>
//   </Routes>
// </Router> */}