import React, { useEffect, useState } from 'react';
import { getShortUsers, getAllUsers } from '../services/api.js';
import Table from '../components/Table.jsx';
import UserInfo from '../components/UserInfo.jsx';
import Filter from '../components/Filter.jsx';
import { CiFilter } from "react-icons/ci";

const PAGE_LIMIT = 10;

const UserTableContainer = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [shortUsers, setShortUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [error, setError] = useState(null);
  const [usersAmount, setUsersAmount] = useState(0);

  const [uniqueGenders, setUniqueGenders] = useState([]);
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [age, setAge] = useState({ minAge: 0, maxAge: 100 });

  useEffect(() => {
    if (!isFiltered) {
      const fetchShort = async () => {
        const result = await getShortUsers(currentPage, PAGE_LIMIT);
        if (result.error) {
          setError(result.error);
          return;
        }
        setShortUsers(result.users);
      };
      fetchShort();
    }
  }, [currentPage, isFiltered]);

  useEffect(() => {
    const fetchAll = async () => {
      const result = await getAllUsers();
      if (result.error) {
        setError(result.error);
        return;
      }
      setUsersAmount(result.total);

      const resultFull = await getShortUsers(0, result.total);
      if (resultFull.error) {
        setError(resultFull.error);
        return;
      }

      const users = resultFull.users;
      setAllUsers(users);
      setUniqueGenders([...new Set(users.map(u => u.gender))]);
      setUniqueCountries([...new Set(users.map(u => u.address?.country).filter(Boolean))]);
      setUniqueCities([...new Set(users.map(u => u.address?.city).filter(Boolean))]);

      const ages = users.map(u => u.age).filter(Boolean);
      setAge({ minAge: Math.min(...ages), maxAge: Math.max(...ages) });
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (isFiltered) {
      setCurrentPage(1);
    }
  }, [filteredUsers, isFiltered]);

  useEffect(() => {
    if (isFiltered) {
      setIsFiltered(false);
      setFilteredUsers([]);
    }
  }, [currentPage]);

  const handleUserClick = (user) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

  const displayedUsers = isFiltered
    ? filteredUsers.slice((currentPage - 1) * PAGE_LIMIT, currentPage * PAGE_LIMIT)
    : shortUsers;

  const totalUsersCount = isFiltered ? filteredUsers.length : usersAmount;

  const handleFilterApply = (filtered) => {
    setFilteredUsers(filtered);
    setIsFiltered(true);
    setCurrentPage(1);
    setOpenFilter(false);
  };

  const handleFilterReset = () => {
    setIsFiltered(false);
    setFilteredUsers([]);
    setFilters({});
    setCurrentPage(1);
    setOpenFilter(false);
  };

  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

  return (
    <>
      <div className="top-bar">
        <h1>Таблица пользователей</h1>
        <div className='filterButton' onClick={() => setOpenFilter(true)}>
          <CiFilter />
          <p>фильтры</p>
        </div>
      </div>

      {openFilter && (
        <Filter
          onClose={() => setOpenFilter(false)}
          filters={filters}
          setFilters={setFilters}
          genders={uniqueGenders}
          countries={uniqueCountries}
          cities={uniqueCities}
          age={age}
          allUsers={allUsers}
          setFilteredUsers={handleFilterApply}
          onReset={handleFilterReset}
        />
      )}

      <Table
        users={displayedUsers}
        totalUsers={totalUsersCount}
        pageLimit={PAGE_LIMIT}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onUserClick={handleUserClick}
      />

      {selectedUser && (
        <UserInfo user={selectedUser} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default UserTableContainer;
