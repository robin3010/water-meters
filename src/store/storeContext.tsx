import { createContext } from 'react';
import { IRootStoreModel } from 'store/types/types';

const StoreContext = createContext({} as IRootStoreModel);

export default StoreContext;
