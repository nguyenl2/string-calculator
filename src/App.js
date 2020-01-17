import React from 'react';
import './App.css';
import { parseStringToNums } from './utils/parse-util';
import { generateFormula } from './utils/math-util';

function App() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [altDelimiter, setAltDelimiter] = React.useState('\n');
  const [allowNeg, setAllowNeg] = React.useState(false);
  const [upperBound, setUpperBound] = React.useState(1000);
  const [error, setError] = React.useState(null);
  const handleAltDelimChange = (e) => {
    let newAltDelimiter = e.target.value;
    if(newAltDelimiter === '') {
      newAltDelimiter = '\n'; // reset default
    }
    setAltDelimiter(newAltDelimiter);
  };
  const handleNegClick = () => {
    const newAllowNeg = allowNeg === true ? false : true;
    setAllowNeg(newAllowNeg);
  };
  const handleUpperBndChange = (e) => {
    const newUpperBnd = e.target.value;
    setUpperBound(newUpperBnd);
  }
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let nums;
    try {
      nums = parseStringToNums(input, altDelimiter, allowNeg, upperBound);
    } catch(e) {
      setError(e.message);
      return;
    }
    setOutput(generateFormula(nums));
    setError(null);
  };
  return (
    <div className='app'>
      <header>
        <div className='header-title'>
          <h1>String Calculator</h1>
          <h2>+</h2>
        </div>
      </header>
      <form className='calculator' onSubmit={ handleSubmit }>
        <div className='options'>
          <div>
            <input type='text' name='alt-delimiter' value={ altDelimiter } maxLength='1' onChange={ handleAltDelimChange }></input>
            <label htmlFor='alt-delimiter'>Alternative Delimiter</label>
          </div>
          <div>
            <input type='checkbox' name='allow-negatives' defaultChecked={allowNeg} onClick={ handleNegClick }></input>
            <label htmlFor='allow-negatives'>Allow Negatives</label>
          </div>
          <div>
            <input type='text' name='upper-bound' value={ upperBound } onChange={ handleUpperBndChange }></input>
            <label htmlFor='upper-bound'>Upper Bound</label>
          </div>
        </div>
        <textarea value={ input } onChange={ handleInputChange }></textarea>
        <button type='submit'>Calculate</button>
        <div> Output: { error ? error : output}
        </div>
      </form>
    </div>
  );
}

export default App;
