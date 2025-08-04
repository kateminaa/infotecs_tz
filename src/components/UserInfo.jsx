import React from 'react';

const UserInfo = ({ user, onClose }) => {
  const {
    lastName, firstName, maidenName, age, address, height, weight, phone, email, image
  } = user;

  return (
    <div className='Modal-backdrop'>
      <div className='Modal-content'>
        <button onClick={onClose} className='Modal-close'>✖</button>
        
        <div className="UserInfo-header">
          <img src={image} alt={`${firstName} ${lastName}`} className="UserInfo-image" />
          <h2>{firstName} {maidenName} {lastName}</h2>
        </div>

        <div className="UserInfo-details">
          <div className="UserInfo-row"><span className="label">Возраст:</span> <span>{age}</span></div>
          <div className="UserInfo-row"><span className="label">Рост:</span> <span>{height} см</span></div>
          <div className="UserInfo-row"><span className="label">Вес:</span> <span>{weight} кг</span></div>
          <div className="UserInfo-row"><span className="label">Телефон:</span> <span>{phone}</span></div>
          <div className="UserInfo-row"><span className="label">Email:</span> <span>{email}</span></div>

          <h3>Адрес</h3>
          <div className="UserInfo-row"><span className="label">Улица:</span> <span>{address?.address}</span></div>
          <div className="UserInfo-row"><span className="label">Город:</span> <span>{address?.city}</span></div>
          <div className="UserInfo-row"><span className="label">Штат:</span> <span>{address?.state} ({address?.stateCode})</span></div>
          <div className="UserInfo-row"><span className="label">Почтовый индекс:</span> <span>{address?.postalCode}</span></div>
          <div className="UserInfo-row"><span className="label">Координаты:</span> <span>lat: {address?.coordinates?.lat}, lng: {address?.coordinates?.lng}</span></div>
          <div className="UserInfo-row"><span className="label">Страна:</span> <span>{address?.country}</span></div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
