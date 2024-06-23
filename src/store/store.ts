import { IRootStoreModel } from 'store/types/types';
import RootStore from './models/root';

const CreateStore = (): IRootStoreModel => RootStore.create({});

export default CreateStore;
