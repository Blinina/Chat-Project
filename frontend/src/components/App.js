import { React, useState, useEffect } from "react";
import LoginPage from "./LoginPage.jsx";
import ChatPage from "./Chat/ChatPage.jsx";
import Navigation from "./Nav.jsx";
import SignUpPage from "./SignUpPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation, useNavigate, Outlet} from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import useAuth from "../hooks/authHooks.jsx";
import SocketContext from "../contexts/SocketContext.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from "../slices/sliceMessage.jsx";
import { addChannel, removeChannel, renameChannel } from "../slices/sliceChannals.jsx";
import ToastifyContext from "../contexts/ToastifyContext.jsx";
import { toast, ToastContainer } from 'react-toastify';

const ToastifyProvider = ({ children }) => {
  const successToast = (message) => toast.success(message);
  const errorToast = (message) => toast.error(message);
 
  return (
    <ToastifyContext.Provider value={{ successToast, errorToast }}>
      <ToastContainer />
      {children}
    </ToastifyContext.Provider>
  );
};

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  const getUsername = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId) {
      return userId.username;
    }
    return null;
  };
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, getUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

const ChatRoute = ({children}) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children :  <Navigate to="login" state={{ from: location }}  />
  );
};


export default function App({ socket }) {
  const dispatch = useDispatch();

  socket.on('newMessage', (messageWithId) => {
    dispatch(addMessage(messageWithId));
  });
  socket.on('newChannel', (channelWithId) => {
    dispatch(addChannel(channelWithId));
  });
  socket.on('removeChannel', (channelWithId) => {
    dispatch(removeChannel(channelWithId));
  });
  socket.on('renameChannel', (channelWithId) => {
    dispatch(renameChannel(channelWithId));
  });
  return (
    <SocketContext.Provider value={{ socket }}>
      <ToastifyProvider>
        <AuthProvider>
          <div className="d-flex flex-column h-100">
            <BrowserRouter>
              <Navigation />
              <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<ChatRoute><ChatPage /></ChatRoute>} />
              </Routes>
            </BrowserRouter>
          </div>
        </AuthProvider>
      </ToastifyProvider>
    </SocketContext.Provider>
  );
}






