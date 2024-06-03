import { Instance, SnapshotOut } from 'mobx-state-tree';
import { MeterModel, MetersStore } from 'store/models/meters';
import { MeterArea } from 'store/models/metersArea';
import RootStore from 'store/models/root';

export interface IMeter extends SnapshotOut<typeof MeterModel> {}
export interface IMeterNode extends Instance<typeof MeterModel> {}

export interface IMeterNodeWithIndex extends IMeterNode {
  index: number;
}

export interface IMeterArea extends SnapshotOut<typeof MeterArea> {}

export interface IMetersNode extends Instance<typeof MetersStore> {}

export interface IRootStoreModel extends Instance<typeof RootStore> {}
