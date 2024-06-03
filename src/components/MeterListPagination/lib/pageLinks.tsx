interface IPageLink {
  pageIdx: number | string;
  active: boolean;
}

const PageLink: React.FC<IPageLink> = ({ pageIdx, active }) => {
  if (typeof pageIdx !== 'number')
    return (
      <button type="button" disabled className="pagination-numbers-btn">
        ...
      </button>
    );

  return (
    <button
      type="button"
      key={pageIdx}
      className={`pagination-numbers-btn${active ? ' active' : ''}`}
      disabled={active}
    >
      <a href={`#page=${pageIdx}`}>{pageIdx}</a>
    </button>
  );
};

export default PageLink;
