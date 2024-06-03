import { FETCH_LIMIT_PARAM } from 'consts/consts';
import { applySnapshot, t } from 'mobx-state-tree';

const PageOffsetModel = t
  .model('OffsetModel', {
    offset: t.maybeNull(t.number),
    currentPage: t.maybeNull(t.number),
  })
  .actions((self) => ({
    updatePage(page: number) {
      const newSnapshot = {
        currentPage: page,
        offset: (page - 1) * FETCH_LIMIT_PARAM,
      };
      applySnapshot(self, newSnapshot);
    },
    updateLastPage(prevPage: number) {
      window.location.hash = `#page=${prevPage}`;
    },
    afterCreate() {
      this.updatePage(+window.location.hash.split('=')[1] || 1);
    },
  }));

export default PageOffsetModel;
