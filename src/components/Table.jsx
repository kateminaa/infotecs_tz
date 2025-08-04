import React, { useState, useMemo, useRef } from 'react';
import TableRow from './TableRow.jsx';
import Pagination from './Pagination.jsx';

const headers = [
  { key: 'lastName', label: 'Фамилия' },
  { key: 'firstName', label: 'Имя' },
  { key: 'maidenName', label: 'Отчество' },
  { key: 'age', label: 'Возраст' },
  { key: 'gender', label: 'Пол' },
  { key: 'phone', label: 'Телефон' },
  { key: 'email', label: 'Email' },
  { key: 'country', label: 'Страна', getValue: user => user.address?.country },
  { key: 'city', label: 'Город', getValue: user => user.address?.city },
];

const MIN_COLUMN_WIDTH = 50;

const Table = ({ users, totalUsers, pageLimit, currentPage, setCurrentPage, onUserClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [columnWidths, setColumnWidths] = useState(() => headers.reduce((acc, h) => {
    acc[h.key] = 150;
    return acc;
  }, {}));

  const resizingCol = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        const nextDirection = prev.direction === 'asc' ? 'desc' : prev.direction === 'desc' ? null : 'asc';
        return { key: nextDirection ? key : null, direction: nextDirection };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleMouseDown = (e, key) => {
    e.preventDefault();
    resizingCol.current = key;
    startX.current = e.clientX;
    startWidth.current = columnWidths[key];
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!resizingCol.current) return;

    const deltaX = e.clientX - startX.current;
    setColumnWidths((prev) => {
      const newWidth = Math.max(MIN_COLUMN_WIDTH, startWidth.current + deltaX);
      return { ...prev, [resizingCol.current]: newWidth };
    });
  };

  const handleMouseUp = () => {
    resizingCol.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const sortedUsers = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return users;
    const header = headers.find(h => h.key === sortConfig.key);
    const getValue = header?.getValue ?? (user => user[sortConfig.key]);

    return [...users].sort((a, b) => {
      const aValue = getValue(a)?.toString().toLowerCase() ?? '';
      const bValue = getValue(b)?.toString().toLowerCase() ?? '';
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, sortConfig]);

  const totalPages = Math.ceil(totalUsers / pageLimit);

  return (
    <div className='table-container'>
      <table className="Table">
        <thead>
          <tr>
            {headers.map(header => (
              <th
                key={header.key}
                className={sortConfig.key === header.key ? `sorted-${sortConfig.direction}` : ''}
                onClick={() => handleSort(header.key)}
                style={{ width: columnWidths[header.key], position: 'relative', userSelect: 'none' }}
              >
                {header.label}
                <div
                  onMouseDown={(e) => handleMouseDown(e, header.key)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '6px',
                    cursor: 'col-resize',
                    userSelect: 'none',
                    zIndex: 10,
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <TableRow
              key={user.id}
              user={user}
              onUserClick={onUserClick}
              columnWidths={columnWidths}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Table;
