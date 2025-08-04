export const getShortUsers = async (currentPage, PAGE_LIMIT) => {
  try {
    const res = await fetch(`https://dummyjson.com/users?limit=${PAGE_LIMIT}&skip=${(currentPage-1)*PAGE_LIMIT}`);
    const data = await res.json();
    return data;
  } catch (e) {
    return { error: e.message };
  }
};
export const getAllUsers = async () => {
  try {
    const res = await fetch('https://dummyjson.com/users')
    const data = await res.json();
    return data;
  } catch (e) {
    return { error: e.message };
  }
};
