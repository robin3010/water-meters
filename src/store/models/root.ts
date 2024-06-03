import { cast, onSnapshot, t } from 'mobx-state-tree';
import { getUniqueAddrIds } from 'store/lib/storeUtils';
import { MetersStore } from './meters';
import { MeterAreaStore } from './metersArea';
import PageOffsetModel from './offset';

const RootStore = t
  .model({
    meters: t.optional(MetersStore, {}),
    areas: t.optional(MeterAreaStore, {}),
    pageNav: t.optional(PageOffsetModel, {}),
  })
  .actions((self) => ({
    setAreasIds() {
      self.areas.areaIds = cast(getUniqueAddrIds(self.meters.results));
    },
    afterCreate() {
      onSnapshot(self.meters.results, this.setAreasIds);
    },
  }));

export default RootStore;
