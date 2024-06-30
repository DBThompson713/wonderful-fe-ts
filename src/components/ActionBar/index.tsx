import React, { useState } from 'react';
import './styles.css';

interface ActionBarProps {
  onSearch: (searchTerm: string) => void;
  onSort: (sortBy: string) => void;
  onFilter: (filterBy: string) => void;
  onAdd: () => void;
  showAddTodo: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({ onSearch, onSort, onFilter, onAdd, showAddTodo }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSort(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value);
  };

  return (
    <div className="action-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className='action-bar-buttons'>
        <div className='action-bar-buttons-filters'>
          <select onChange={handleSortChange}>
            <option value="dateAsc">Date Ascending</option>
            <option value="dateDesc">Date Descending</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
          <select onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button onClick={onAdd}>{showAddTodo ? "-" : "+"}</button>
      </div>
    </div>
  );
};

export default ActionBar;
