import React, { useState, useEffect, useMemo } from 'react';
import { validateEmail, applyFilters } from '../utils/filterUtils';
import FilterCheckboxGroup from './FilterCheckboxGroup.jsx';
import FilterInput from './FilterInput.jsx';
import FilterRange from './FilterRange.jsx';

const Filter = ({
  onClose,
  filters,
  setFilters,
  countries,
  cities,
  genders,
  age,
  allUsers,
  setFilteredUsers,
  onReset
}) => {
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [citySearchTerm, setCitySearchTerm] = useState('');

  const filteredCountries = useMemo(() =>
    countries.filter((c) =>
      c.toLowerCase().includes(countrySearchTerm.toLowerCase())
    ), [countrySearchTerm, countries]);

  const filteredCities = useMemo(() =>
    cities.filter((c) =>
      c.toLowerCase().includes(citySearchTerm.toLowerCase())
    ), [citySearchTerm, cities]);

  const [errors, setErrors] = useState({ email: '' });

  useEffect(() => {
    if ('email' in filters) {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(filters.email) ? '' : 'Некорректный email',
      }));
    }
  }, [filters.email]);

  const isFiltersEmpty = useMemo(() => {
    return Object.values(filters).every((value) => {
      if (Array.isArray(value)) return value.length === 0;
      return !value;
    });
  }, [filters]);

  const filteredCount = useMemo(() => {
    return applyFilters(allUsers, filters).length;
  }, [filters, allUsers]);

  const hasErrors = errors.email !== '';

  const updateFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    if (hasErrors) return;
    const newFilteredUsers = applyFilters(allUsers, filters);
    setFilteredUsers(newFilteredUsers);
  };

  const handleResetFilters = () => {
    setFilters({});
    setFilteredUsers([]);
    setErrors({ email: '' });
    setCountrySearchTerm('');
    setCitySearchTerm('');
    onReset();
  };

  return (
    <div className="FilterModal-backdrop active">
      <div className="FilterModal-content open">
        <button className="FilterModal-close" onClick={onClose} aria-label="Закрыть фильтр">&times;</button>
        <p>Фильтры</p>

        <FilterInput
          label="Фамилия"
          value={filters.lastName || ''}
          onChange={(v) => updateFilter('lastName', v)}
          placeholder="Введите фамилию"
        />

        <FilterInput
          label="Имя"
          value={filters.firstName || ''}
          onChange={(v) => updateFilter('firstName', v)}
          placeholder="Введите имя"
        />

        <FilterInput
          label="Отчество"
          value={filters.maidenName || ''}
          onChange={(v) => updateFilter('maidenName', v)}
          placeholder="Введите отчество"
        />

        <FilterRange
          label="Возраст до"
          min={age.minAge}
          max={age.maxAge}
          value={filters.ageMax || age.maxAge}
          onChange={(v) => updateFilter('ageMax', v)}
        />

        <FilterCheckboxGroup
          label="Пол"
          options={genders}
          selectedOptions={filters.gender || []}
          onChange={(arr) => updateFilter('gender', arr)}
          idPrefix="gender"
        />

        <FilterInput
          label="Телефон"
          value={filters.phone || ''}
          onChange={(v) => updateFilter('phone', v)}
          placeholder="Введите телефон"
        />

        <FilterInput
          label="Email"
          value={filters.email || ''}
          onChange={(v) => updateFilter('email', v)}
          placeholder="example@mail.com"
          error={errors.email}
        />

        <FilterCheckboxGroup
          label="Страна"
          options={filteredCountries}
          selectedOptions={filters.country || []}
          onChange={(arr) => updateFilter('country', arr)}
          searchable
          searchTerm={countrySearchTerm}
          onSearchChange={setCountrySearchTerm}
          idPrefix="country"
        />

        <FilterCheckboxGroup
          label="Город"
          options={filteredCities}
          selectedOptions={filters.city || []}
          onChange={(arr) => updateFilter('city', arr)}
          searchable
          searchTerm={citySearchTerm}
          onSearchChange={setCitySearchTerm}
          idPrefix="city"
        />

        <div className="filter-button-group" style={{ marginTop: 15 }}>
          <button
            className="filter-button apply"
            onClick={handleApplyFilters}
            disabled={isFiltersEmpty || hasErrors}
            style={{ opacity: isFiltersEmpty || hasErrors ? 0.5 : 1 }}
          >
            Показать {filteredCount}{' '}
            {filteredCount === 1
              ? 'результат'
              : filteredCount > 1 && filteredCount < 5
              ? 'результата'
              : 'результатов'}
          </button>
          <button className="filter-button reset" onClick={handleResetFilters} style={{ marginLeft: 10 }}>
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
