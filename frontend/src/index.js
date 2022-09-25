import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { io } from "socket.io-client";
import init from './init'
import 'react-toastify/dist/ReactToastify.css';

const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const project = await init(socket);
  root.render(<React.StrictMode>{project}</React.StrictMode>);
};

app();


reportWebVitals();

