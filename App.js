import React, { useState } from 'react';
import axios from 'axios';
import './style.css';


function App() {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/leave', { name, startDate, endDate });
      alert('Leave request submitted successfully!');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Error submitting leave request. Please try again.');
    }
  };

  return (
    <div>
      <h1>Apply for Leave</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <br />
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
