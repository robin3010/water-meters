import { FETCH_LIMIT_PARAM } from 'consts/consts';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useMeters, usePageNav } from 'store/lib/useStore';
import './MeterListPagination.css';
import getPageNumbers from './lib/getPageNumbers';
import PageLink from './lib/pageLinks';

const MeterListPagination: React.FC = observer(() => {
  const { reload, count: metersCount } = useMeters();
  const { currentPage, updatePage } = usePageNav();

  const totalPages = Math.ceil((metersCount ?? 0) / FETCH_LIMIT_PARAM);

  const pageSize = FETCH_LIMIT_PARAM;
  const total = metersCount ?? 0;

  useEffect(() => {
    const updateUrl = () => {
      const init = +window.location.hash.split('=')[1] || 1;

      if (currentPage !== init) {
        updatePage(init);
        reload();
      }
    };

    window.addEventListener('popstate', updateUrl);

    return () => {
      window.removeEventListener('popstate', updateUrl);
    };
  });

  const pages = currentPage && getPageNumbers({ currentPage, pageSize, total });

  if (!pages) return null;

  return (
    <div className="pagination-container">
      <div className="pagination-numbers">
        {!totalPages
          ? null
          : pages.map((page) => (
              <PageLink
                pageIdx={page}
                active={
                  typeof page === 'number' && !Math.abs(currentPage - page)
                }
                key={crypto.randomUUID()}
              />
            ))}
      </div>
    </div>
  );
});
export default MeterListPagination;
