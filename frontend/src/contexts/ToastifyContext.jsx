import { React, createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const ToastifyContext = createContext({});

export function ToastifyProvider({ children }) {
  const successToast = (message) => toast.success(message);
  const errorToast = (message) => toast.error(message);
  return (
    <ToastifyContext.Provider value={{ successToast, errorToast }}>
      <ToastContainer />
      { children }
    </ToastifyContext.Provider>
  );
}

export const useToastify = () => useContext(ToastifyContext);
