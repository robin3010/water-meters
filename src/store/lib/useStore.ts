import { useContext } from 'react';
import StoreContext from 'store/storeContext';

const useStore = () => useContext(StoreContext);

export const useAreas = () => useStore().areas;
export const useMeters = () => useStore().meters;
export const usePageNav = () => useStore().pageNav;
