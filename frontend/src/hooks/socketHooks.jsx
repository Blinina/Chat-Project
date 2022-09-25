import { useContext } from 'react';

import SocketContext from '../contexts/SocketContext';

const useSocket = () => useContext(authContext);

export default useSocket;