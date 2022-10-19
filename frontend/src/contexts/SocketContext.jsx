import { React, createContext, useContext } from 'react';
import store from '../slices/store';
import { changeChannelID } from '../slices/sliceChannals';

export const SocketContext = createContext({});

export const useSocket = () => useContext(SocketContext);
export function SocketProvider({ children, value }) {
  const { socket } = value;

  const sendNewMessage = (message) => {
    socket.emit('newMessage', message);
  };

  const addNewChannel = (newChannel) => {
    socket.emit('newChannel', newChannel, (res) => {
      console.log(res);
      if (res.status === 'ok') {
        store.dispatch(changeChannelID((res.data.id)));
      }
    });
  };

  const deleteChannel = (currentChannel) => {
    socket.emit('removeChannel', currentChannel);
  };

  const fnRenameChannel = ({ id, name: body }) => {
    socket.emit('renameChannel', { id, name: body });
  };

  return (
    <SocketContext.Provider value={{
      sendNewMessage, addNewChannel, deleteChannel, fnRenameChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
}
