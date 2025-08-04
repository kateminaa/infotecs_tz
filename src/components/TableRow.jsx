import React from 'react';

const TableRow = ({ user, onUserClick, columnWidths }) => {
  const { lastName, firstName, maidenName, age, gender, phone, email, address } = user;

  return (
    <tr onClick={() => onUserClick(user)} style={{ cursor: 'pointer' }}>
      <td style={{ width: columnWidths?.lastName }}>{lastName}</td>
      <td style={{ width: columnWidths?.firstName }}>{firstName}</td>
      <td style={{ width: columnWidths?.maidenName }}>{maidenName}</td>
      <td style={{ width: columnWidths?.age }}>{age}</td>
      <td style={{ width: columnWidths?.gender }}>{gender}</td>
      <td style={{ width: columnWidths?.phone }}>{phone}</td>
      <td style={{ width: columnWidths?.email }}>{email}</td>
      <td style={{ width: columnWidths?.country }}>{address?.country}</td>
      <td style={{ width: columnWidths?.city }}>{address?.city}</td>
    </tr>
  );
};

export default TableRow;
