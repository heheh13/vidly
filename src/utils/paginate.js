const Paginate = (elements, pageSize, currentPage) => {
  const startIndex = (currentPage - 1) * pageSize;

  const newElements = [];
  for (
    let i = startIndex;
    i < Math.min(startIndex + pageSize, elements.length);
    i++
  ) {
    newElements.push(elements[i]);
  }
  return newElements;
};

export default Paginate;
