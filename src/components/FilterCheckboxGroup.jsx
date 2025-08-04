import React from 'react';

const FilterCheckboxGroup = ({
  label,
  options,
  selectedOptions,
  onChange,
  searchable = false,
  searchTerm = '',
  onSearchChange,
  idPrefix
}) => {
  const allSelected = options.length > 0 && options.every((item) => selectedOptions.includes(item));

  return (
    <div className="filter-checkbox-group">
      <label><strong>{label}</strong></label>

      {searchable && (
        <input
          type="text"
          placeholder={`Поиск ${label.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ marginBottom: '5px', width: '100%' }}
        />
      )}

      <div className="scrollable-box" style={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #ccc', padding: '5px' }}>
        <div className="checkbox-item">
          <input
            type="checkbox"
            id={`${idPrefix}-all`}
            checked={allSelected}
            onChange={() => {
              if (allSelected) {
                onChange([]);
              } else {
                onChange(options);
              }
            }}
          />
          <label htmlFor={`${idPrefix}-all`}><strong>Выбрать все</strong></label>
        </div>

        {options.map((opt, index) => (
          <div key={opt} className="checkbox-item">
            <input
              type="checkbox"
              id={`${idPrefix}-${index}`}
              checked={selectedOptions.includes(opt)}
              onChange={() => {
                if (selectedOptions.includes(opt)) {
                  onChange(selectedOptions.filter((o) => o !== opt));
                } else {
                  onChange([...selectedOptions, opt]);
                }
              }}
            />
            <label htmlFor={`${idPrefix}-${index}`}>{opt}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCheckboxGroup;
