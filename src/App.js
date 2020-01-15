import React from 'react';
import './App.css';
import { parseStringToNums } from './utils/parse-util';
import { calculateSum } from './utils/math-util';

function App() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    let nums;
    try {
      nums = parseStringToNums(input);
    } catch(e) {
      setError(e.message);
      return;
    }
    setOutput(calculateSum(nums));
    setError(null);
  };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className='app'>
      <form onSubmit={ handleSubmit }>
        <input value={ input } onChange={ handleInputChange }></input>
        <button type='submit'>Calculate</button>
        <div> Output: { error ? error : output}
        </div>
      </form>
    </div>
  );
}

export default App;
