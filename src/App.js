import React, { useState } from 'react';
import axios from 'axios';

import './App.css'; 

function App() {
  const [jsonData, setJsonData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setJsonData(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonData);
      const response = await axios.post('http://localhost:3001/bfhl', parsedData);
      setResponseData(response.data);
      setError(null);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON input: Please ensure your input is correctly formatted JSON.');
      } else {
        setError('Error submitting data: ' + err.message);
      }
      console.error(err);
    }
  };
  

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div className="App">
    <h1> Bajaj Finserv </h1>
      <h6>API INPUT</h6>
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={jsonData}
          onChange={handleInputChange}
          placeholder='Enter JSON data here...'
        />
        <br></br><br></br>
        
        <button className='button' type='submit'>Submit</button>
      </form>

      <br></br><br></br>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {responseData && (
        <>
          <select multiple onChange={handleOptionChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <div>
            {selectedOptions.includes('numbers') && (
              <div>
                <h2>Filtered Response</h2>
                <p>Numbers: {JSON.stringify(responseData.numbers)}</p>
              </div>
            )}
            {selectedOptions.includes('alphabets') && (
              <div>
                <h2>Filtered Response</h2>
                <p>Alphabet:  {JSON.stringify(responseData.alphabets)}</p>
              </div>
            )}
            {selectedOptions.includes('highest_alphabet') && (
              <div>
                <h2>Filtered Response</h2>
                <p>Highest Alphabet: {JSON.stringify(responseData.highest_alphabet)}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;






















