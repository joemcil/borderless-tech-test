import React from 'react';

const SearchNFilter = ({ onSearchChange, onGenderFilterChange, onCountryFilterChange }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search by name..."
      onChange={onSearchChange}
      className="search-input"
    />
    <select onChange={onGenderFilterChange} className="filter-select">
      <option value="">Filter by Gender</option>
      <option value="men">Men</option>
      <option value="women">Women</option>
    </select>
    <select onChange={onCountryFilterChange} className="filter-select">
      <option value="">Filter by Country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="fr">France</option>
      <option value="de">Germany</option>
      <option value="jp">Japan</option>
    </select>
  </div>
);

export default SearchNFilter;
