export const sortNameCategories = (x, y) => {
  const first = x.name?.toLowerCase();
  const second = y.name?.toLowerCase();

  if (first < second) {
    return -1;
  }
  if (first > second) {
    return 1;
  }
  return 0;
}