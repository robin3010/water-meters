import { fetchAreaById } from 'api/api';
import { handleErrors, handleStatus } from 'api/lib/handlers';
import {
  SnapshotOut,
  applySnapshot,
  flow,
  getRoot,
  onSnapshot,
  t,
  toGenerator,
} from 'mobx-state-tree';
import { combineAreas, getUniqueAddrToFetch } from 'store/lib/storeUtils';
import { IRootStoreModel } from 'store/types/types';

export const MeterArea = t.model('MeterArea', {
  id: t.identifier,
  number: t.number,
  str_number: t.string,
  str_number_full: t.string,
  house: t.model({
    address: t.string,
    id: t.identifier,
    fias_addrobjs: t.array(t.string),
  }),
});

export const MeterAreaStore = t
  .model('MeterAreaStore', {
    count: t.maybeNull(t.number),
    results: t.array(MeterArea),
    areaIds: t.array(t.string),
  })
  .actions(() => ({
    loadAreaById: flow(function* loadAreaById(id: string) {
      const response = yield* toGenerator(fetchAreaById(id));
      handleStatus(response);

      const data: SnapshotOut<typeof MeterArea>[] = yield response.json();
      return data;
    }),
  }))
  .actions((self) => {
    const { areaIds, results, loadAreaById } = self;

    return {
      loadAreas: flow(function* loadAreas() {
        try {
          const fetches = getUniqueAddrToFetch(results, areaIds).map((id) =>
            loadAreaById(id)
          );
          const getIds = yield* toGenerator(Promise.allSettled(fetches));

          // eslint-disable-next-line array-callback-return, consistent-return
          const fetchedAreas = getIds.map((response) => {
            if (response.status === 'fulfilled') return response.value;
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newSnapshot = combineAreas(fetchedAreas as any, results);
          applySnapshot(results, newSnapshot);
        } catch (e) {
          handleErrors(e);
        }
      }),
      afterCreate() {
        onSnapshot(
          self.areaIds,
          getRoot<IRootStoreModel>(self).areas.loadAreas
        );
      },
    };
  });
