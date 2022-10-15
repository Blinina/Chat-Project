import { React } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, useLocation, Outlet,
} from 'react-router-dom';
import LoginPage from './loginPage/LoginPage.jsx';
import ChatPage from './Chat/ChatPage.jsx';
import Navigation from './Nav.jsx';
import SignUpPage from './signUpPage/SignUpPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { AuthProvider, useAuth } from '../contexts/AuthContext.jsx';
import { SocketContext } from '../contexts/SocketContext.jsx';
import { ToastifyProvider } from '../contexts/ToastifyContext.jsx';

function ChatRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="login" state={{ from: location }} />
  );
}

function LoggedInRouter() {
  const auth = useAuth();
  return auth.loggedIn ? <Navigate to="/" /> : <Outlet />;
}

export default function App({ socket }) {
  return (
    <SocketContext.Provider value={{ socket }}>
      <ToastifyProvider>
        <AuthProvider>
          <div className="d-flex flex-column h-100">
            <BrowserRouter>
              <Navigation />
              <Routes>
                <Route path="login" element={<LoggedInRouter />}>
                  <Route path="" element={<LoginPage />} />
                </Route>
                <Route path="signup" element={<LoggedInRouter />}>
                  <Route path="" element={<SignUpPage />} />
                </Route>
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
