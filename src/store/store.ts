import { IRootStoreModel } from 'store/types/types';
import RootStore from './models/root';
import { getCachedAddr } from './lib/localStorage';

const CreateStore = (): IRootStoreModel =>
  RootStore.create({ areas: { results: getCachedAddr() } });

export default CreateStore;
