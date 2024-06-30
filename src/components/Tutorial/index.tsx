import React, { useState } from 'react';
import './styles.css';

const Tutorial: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTitleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleGotItClick = () => {
    setIsExpanded(false);
  };

  return (
    <div className="tutorial">
      <div className="tutorial-title" onClick={handleTitleClick}>
        How to Use the Todo App
      </div>
      {isExpanded && (
        <div className="tutorial-content">
          <ul>
            <li>Add a new todo by clicking the "+" button.</li>
            <li>A todo needs a date, and a todo(description)</li>
            <li>Edit an existing todo by clicking the pencil icon.</li>
            <li>Mark a todo as completed by clicking the checkbox.</li>
            <li>Delete a todo by clicking the "X".</li>
            <li>Search, sort, and filter todos using the action bar.</li>
          </ul>
          <button className="got-it-button" onClick={handleGotItClick}>Got it</button>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
