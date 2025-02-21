import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      
      const response = await fetch('YOUR_BACKEND_URL/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      
      const data = await response.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
      setResponse(null);
    }
  };

  const filterOptions = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' }
  ];

  const getFilteredResponse = () => {
    if (!response) return null;
    
    const filtered = {};
    selectedFilters.forEach(filter => {
      filtered[filter] = response[filter];
    });
    return filtered;
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardContent className="p-4">
          <textarea
            className="w-full p-2 border rounded"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"data": ["M","1","334","4","B"]}'
            rows={4}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardContent className="p-4">
            <Select
              isMulti
              options={filterOptions}
              value={selectedFilters.map(f => ({ value: f, label: f }))}
              onChange={(selected) => setSelectedFilters(selected.map(s => s.value))}
              className="mb-4"
            />
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(getFilteredResponse(), null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;
