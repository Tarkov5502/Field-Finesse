import React, { useState } from 'react';

const CustomerSearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Search Customer..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        required 
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default CustomerSearchForm;
