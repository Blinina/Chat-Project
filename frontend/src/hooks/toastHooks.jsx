import { useContext } from 'react';

import ToastifyContext from '../contexts/ToastifyContext';

const useToastify = () => useContext(ToastifyContext);

export default useToastify;
