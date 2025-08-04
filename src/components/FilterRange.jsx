import React from 'react';

const FilterRange = ({ label, min, max, value, onChange }) => {
  return (
    <div className="filter-range">
      <label>{label}: {value} лет</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  );
};

export default FilterRange;
