export const validateEmail = (email) =>
  email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const applyFilters = (users, filters) => {
  return users.filter((user) => {
    if (
      filters.firstName &&
      !user.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
    )
      return false;
    if (
      filters.lastName &&
      !user.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
    )
      return false;
    if (
      filters.maidenName &&
      !(user.maidenName?.toLowerCase().includes(filters.maidenName.toLowerCase()))
    )
      return false;
    if (filters.ageMax && user.age > filters.ageMax) return false;
    if (filters.gender?.length && !filters.gender.includes(user.gender)) return false;
    if (filters.phone && !user.phone.includes(filters.phone)) return false;
    if (
      filters.email &&
      !user.email.toLowerCase().includes(filters.email.toLowerCase())
    )
      return false;
    if (filters.country?.length && !filters.country.includes(user.address?.country))
      return false;
    if (filters.city?.length && !filters.city.includes(user.address?.city)) return false;
    return true;
  });
};
