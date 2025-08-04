import React from 'react';

const FilterInput = ({ label, value, onChange, placeholder, error, type = 'text' }) => {
  return (
    <div className="filter-input">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={error ? 'input-error' : ''}
      />
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
};

export default FilterInput;
