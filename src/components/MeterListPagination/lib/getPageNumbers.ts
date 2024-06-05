interface GetPageNumbersArgs {
  currentPage: number;
  pageSize: number;
  total: number;
  pageNumbersToShow?: number;
}
const offsetGenerator = (page: number, lastPage: number): number => {
  if (page <= 2 || lastPage - page <= 2) return 3;
  if (page === 3 || lastPage - page === 3) return 2;
  return 1;
};

const arrayTemplate = (length: number) => {
  return Array.from(Array(length).keys());
};

const getLastPageNumber = ({
  currentPage,
  pageSize,
  total,
}: Omit<GetPageNumbersArgs, 'pageNumbersToShow'>) => {
  const mathTotal = Math.ceil(total / pageSize);
  if (currentPage === total - pageSize) return mathTotal - 1;
  return mathTotal;
};

const getPageNumbers = ({
  currentPage,
  pageSize,
  total,
  pageNumbersToShow = 3,
}: GetPageNumbersArgs) => {
  const lastPageNumber = getLastPageNumber({ currentPage, pageSize, total });
  const currentPageNumber =
    currentPage <= lastPageNumber ? currentPage : lastPageNumber;
  const maxPagesBeforeCurrentPage = Math.floor(pageNumbersToShow / 2);
  const maxPagesAfterCurrentPage = Math.ceil(pageNumbersToShow / 2) - 1;
  const offset = offsetGenerator(currentPageNumber, lastPageNumber) ?? 3;
  let startPage = 1;
  let endPage = lastPageNumber;

  if (lastPageNumber <= 1) {
    return [];
  }

  if (currentPageNumber <= maxPagesBeforeCurrentPage) {
    // near the start
    startPage = 1;
    endPage = pageNumbersToShow;
  } else if (currentPageNumber + offset >= lastPageNumber) {
    // near the end
    startPage = lastPageNumber - offset - maxPagesAfterCurrentPage;
  } else {
    // somewhere in the middle
    startPage = currentPageNumber - maxPagesBeforeCurrentPage;
    endPage = currentPageNumber + maxPagesAfterCurrentPage;
  }

  let pageNumbers: (string | number)[] = arrayTemplate(
    endPage + offset - startPage
  )
    .map((pageNumber) => startPage + pageNumber)
    .filter((pageNumber) => pageNumber <= lastPageNumber && pageNumber > 0);

  const startNumber = pageNumbers[0];
  if (typeof startNumber === 'number' && startNumber > 1) {
    const addStartNumbers = arrayTemplate(startNumber).filter(
      (pageNumber) => pageNumber > 0 && pageNumber < pageNumbersToShow + offset
    );

    if (startNumber <= 2) {
      pageNumbers = [...addStartNumbers, ...pageNumbers];
    } else {
      const ellipsis = startNumber > 3 ? [1, '...'] : addStartNumbers;
      pageNumbers = [...ellipsis, ...pageNumbers];
    }
  }

  const lastNumber = pageNumbers[pageNumbers.length - 1] as number;

  if (lastNumber < lastPageNumber) {
    const addEndNumbers = arrayTemplate(lastPageNumber - lastNumber + 1)
      .map((pageNumber) => lastNumber + 1 + pageNumber)
      .filter(
        (pageNumber) =>
          pageNumber <= lastPageNumber &&
          pageNumber > lastPageNumber - pageNumbersToShow + offset
      );
    if (lastNumber >= lastPageNumber - 2) {
      pageNumbers = [...pageNumbers, ...addEndNumbers];
    } else {
      const ellipsis =
        lastNumber < lastPageNumber - 1
          ? ['...', lastPageNumber]
          : addEndNumbers;
      pageNumbers = [...pageNumbers, ...ellipsis];
    }
  }

  return pageNumbers;
};

export default getPageNumbers;
