import './App.css';
import { useState, useEffect } from 'react';

const URL = "https://api.exchangeratesapi.io/latest";


function App() {

  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then((result) => {
      setRate(result.rates.GBP);
      setError(null);
      setIsLoading(false);
    },(error) => {
      setRate(0);
      setError(error);
      setIsLoading(false);
    })
  }, [])

  function calculate(e) {
    e.preventDefault();
    const conversion = eur * rate;
    setGbp(conversion);
  }

if (isLoading) {
  return <div><p>Loading...</p></div>
} else if (error) {
  return <div><p>{error}</p></div>
} else {
  return (
  <form onSubmit={calculate}>
    <div>
      <label>EUR</label>
      <input type="number" value = {eur} onChange={e => setEur(e.target.value)} />
      <label>{rate}</label>
    </div>
    <div>
      <label>Pounds</label>
      <output>{gbp.toFixed(2)}</output>
    </div>
    <button>Calculate</button>
  </form>
  )
}



}

export default App;
