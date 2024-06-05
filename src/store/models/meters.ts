import { fetchMeters, removeMeter } from 'api/api';
import { handleErrors, handleStatus } from 'api/lib/handlers';
import {
  SnapshotIn,
  applySnapshot,
  detach,
  flow,
  getParent,
  getRoot,
  getSnapshot,
  t,
  toGenerator,
} from 'mobx-state-tree';
import { getOffset } from 'store/lib/storeUtils';
import { IRootStoreModel } from 'store/types/types';

export const MeterModel = t
  .model('MeterModel', {
    id: t.identifier,
    _type: t.array(t.string),
    area: t.model({
      id: t.identifier,
    }),
    is_automatic: t.maybeNull(t.boolean),
    communication: '',
    description: t.maybeNull(t.string),
    serial_number: '',
    installation_date: '',
    brand_name: t.maybeNull(t.string),
    model_name: t.maybeNull(t.string),
    initial_values: t.array(t.number),
  })
  .actions((self) => ({
    removeFetch: flow(function* removeFetch() {
      try {
        const response = yield* toGenerator(removeMeter(self.id));
        handleStatus(response);

        getParent<typeof MetersStore>(self, 2).remove(self);
      } catch (e) {
        handleErrors(e);
      }
    }),
    beforeDetach() {
      const { pageNav } = getRoot<IRootStoreModel>(self);
      const { currentPage } = getSnapshot(pageNav);
      const { results } = getSnapshot(getParent<typeof MetersStore>(self, 2));

      if (
        typeof currentPage === 'number' &&
        currentPage > 1 &&
        results.length < 2
      ) {
        pageNav.updateLastPage(currentPage - 1);
      }
      getParent<typeof MetersStore>(self, 2).loadMeters();
    },
  }));

export const MetersStore = t
  .model('MetersStore', {
    count: t.maybeNull(t.number),
    results: t.array(MeterModel),
  })
  .actions((self) => {
    let controller: AbortController;

    return {
      loadMeters: flow(function* loadMeters() {
        const { offset } = getSnapshot(getRoot<IRootStoreModel>(self).pageNav);
        const offsetStr = getOffset(offset);

        controller = window.AbortController && new window.AbortController();
        try {
          const response = yield* toGenerator(
            fetchMeters(offsetStr, {
              signal: controller && controller.signal,
            })
          );
          handleStatus(response);

          applySnapshot(self, yield response.json());
        } catch (e) {
          handleErrors(e);
        }
      }),
      remove(item: SnapshotIn<typeof MeterModel>) {
        detach(item);
      },
      reload() {
        if (controller) controller.abort();
        this.loadMeters();
      },
      afterCreate() {
        this.loadMeters();
      },
      beforeDestroy() {
        if (controller) controller.abort();
      },
    };
  });
