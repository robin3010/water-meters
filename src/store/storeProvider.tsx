import { PropsWithChildren } from 'react';
import Reactotron from 'reactotron-react-js';
import { mst } from 'reactotron-mst';
import CreateStore from './store';
import StoreContext from './storeContext';

const rootStore = CreateStore();

const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

export default StoreProvider;

if (import.meta.env.MODE !== 'production') {
  const reactotron = Reactotron.use(mst()).connect();
  reactotron.trackMstNode(rootStore);
}
