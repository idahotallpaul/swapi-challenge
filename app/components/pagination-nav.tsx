import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export const PaginationNav = (props: PaginationNavProps) => {
  const { currentPage, next, previous, searchParams, totalPages } = props;
  const createPaginationLink = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());

    return `?${newSearchParams.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 5) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 4) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const showFirstPage = pageNumbers[0] > 1;
  const showLeftEllipsis = pageNumbers[0] > 2;
  const showLastPage = pageNumbers[pageNumbers.length - 1] < totalPages;
  const showRightEllipsis =
    totalPages - pageNumbers[pageNumbers.length - 1] > 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size="sm"
            to={createPaginationLink(currentPage - 1)}
            isActive={!previous}
          >
            Prev
          </PaginationPrevious>
        </PaginationItem>
        {showFirstPage && (
          <>
            <PaginationItem>
              <PaginationLink size="sm" to={createPaginationLink(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis size="sm" />
              </PaginationItem>
            )}
          </>
        )}
        {pageNumbers.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              size="sm"
              to={createPaginationLink(pageNum)}
              isActive={pageNum === currentPage}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}
        {showLastPage && (
          <>
            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis size="sm" />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink size="sm" to={createPaginationLink(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            size="sm"
            to={createPaginationLink(currentPage + 1)}
            isActive={!next}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  searchParams: URLSearchParams;
  previous?: string;
  next?: string;
}
