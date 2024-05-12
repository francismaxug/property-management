import React from "react";

const Pagination = ({
  pageNum,
  limit,
  total,
  onPageChange,
}: {
  pageNum: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}) => {
  const totalNumPages = Math.ceil(total / limit);

  const handleOnPageChange = (page: number) => {
    if (page < 1 || page > totalNumPages) return;
    onPageChange(page);
  }
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={pageNum === 1}
        onClick={() => handleOnPageChange(pageNum - 1)}
      >
        Previous
      </button>
      <span className="mx-2">Page {pageNum} of {totalNumPages}</span>
      <button
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        disabled={pageNum === totalNumPages}
        onClick={() => handleOnPageChange(pageNum + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
