import { useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';
import { validateHeight, validateWeight } from '../utils/validation.js';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const category = useMemo(() => {
    if (!result) return '';
    if (result < 18.5) return 'Underweight';
    if (result < 25) return 'Normal';
    if (result < 30) return 'Overweight';
    return 'Obese';
  }, [result]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateHeight(height) || !validateWeight(weight)) {
      setError('Enter valid height and weight values');
      return;
    }
    setError('');
    const meters = Number(height) / 100;
    const bmi = Number(weight) / (meters * meters);
    setResult(bmi.toFixed(1));
  };

  return (
    <div className="bmi-page">
      <div className="tracker-header">
        <div>
          <span className="eyebrow">BMI Calculator</span>
          <h1>Calculate your body mass index with easy inputs.</h1>
          <p>Use height and weight to determine your overall category.</p>
        </div>
      </div>

      <Card className="bmi-card" title="BMI Calculator">
        <form className="form-grid" onSubmit={handleSubmit}>
          <Input label="Height (cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          <Input label="Weight (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          {error && <p className="form-message">{error}</p>}
          <Button type="submit">Calculate BMI</Button>
        </form>
        {result && (
          <div className="bmi-result">
            <span>Your BMI is</span>
            <strong>{result}</strong>
            <p className="bmi-category">{category}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
