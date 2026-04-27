import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';
import { getNutritionData, saveNutritionData } from '../utils/localStorage.js';

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export default function NutritionTracker() {
  const [meals, setMeals] = useState(getNutritionData());
  const [form, setForm] = useState({ name: '', type: 'Breakfast', calories: '', protein: '', carbs: '', fats: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    saveNutritionData(meals);
  }, [meals]);

  const totals = useMemo(() => meals.reduce((acc, meal) => ({
    calories: acc.calories + Number(meal.calories),
    protein: acc.protein + Number(meal.protein),
    carbs: acc.carbs + Number(meal.carbs),
    fats: acc.fats + Number(meal.fats),
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 }), [meals]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = {};
    if (!form.name) validation.name = 'Meal name is required';
    if (!form.calories) validation.calories = 'Calories are required';
    if (!form.protein) validation.protein = 'Protein amount is required';
    if (!form.carbs) validation.carbs = 'Carbs amount is required';
    if (!form.fats) validation.fats = 'Fats amount is required';
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setMeals((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ name: '', type: 'Breakfast', calories: '', protein: '', carbs: '', fats: '' });
  };

  const handleDelete = (id) => setMeals((prev) => prev.filter((item) => item.id !== id));

  return (
    <div className="nutrition-page">
      <div className="tracker-header">
        <div>
          <span className="eyebrow">Nutrition Tracker</span>
          <h1>Log meals and keep macros aligned with your plan.</h1>
          <p>Track calories, protein, carbs, and fats for each meal entry.</p>
        </div>
      </div>

      <Card title="Add New Meal" className="tracker-form-card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <Input label="Meal Name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
          <label className="input-group">
            <span>Meal Type</span>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {mealTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>
          <Input label="Calories" type="number" value={form.calories} onChange={(e) => setForm({ ...form, calories: e.target.value })} error={errors.calories} />
          <Input label="Protein (g)" type="number" value={form.protein} onChange={(e) => setForm({ ...form, protein: e.target.value })} error={errors.protein} />
          <Input label="Carbs (g)" type="number" value={form.carbs} onChange={(e) => setForm({ ...form, carbs: e.target.value })} error={errors.carbs} />
          <Input label="Fats (g)" type="number" value={form.fats} onChange={(e) => setForm({ ...form, fats: e.target.value })} error={errors.fats} />
          <Button type="submit">Add Meal</Button>
        </form>
      </Card>

      <div className="nutrition-summary-grid">
        <Card title="Daily Totals">
          <div className="nutrition-metric">
            <span>Calories</span>
            <strong>{totals.calories}</strong>
          </div>
          <div className="nutrition-metric">
            <span>Protein</span>
            <strong>{totals.protein} g</strong>
          </div>
          <div className="nutrition-metric">
            <span>Carbs</span>
            <strong>{totals.carbs} g</strong>
          </div>
          <div className="nutrition-metric">
            <span>Fats</span>
            <strong>{totals.fats} g</strong>
          </div>
        </Card>

        <Card title="Macro Breakdown" className="macro-breakdown-card">
          <div className="macro-chart">
            <div className="macro-slice calories" style={{ flex: totals.calories || 1 }}>
              <span>Calories</span>
            </div>
            <div className="macro-slice protein" style={{ flex: totals.protein || 1 }}>
              <span>Protein</span>
            </div>
            <div className="macro-slice carbs" style={{ flex: totals.carbs || 1 }}>
              <span>Carbs</span>
            </div>
            <div className="macro-slice fats" style={{ flex: totals.fats || 1 }}>
              <span>Fats</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="meal-list">
        {meals.length ? meals.map((meal) => (
          <Card key={meal.id} className="meal-card">
            <div className="meal-row">
              <div>
                <h4>{meal.name}</h4>
                <p>{meal.type}</p>
              </div>
              <button className="danger-button" onClick={() => handleDelete(meal.id)}>Delete</button>
            </div>
            <div className="meal-stats">
              <span>{meal.calories} kcal</span>
              <span>{meal.protein}g P</span>
              <span>{meal.carbs}g C</span>
              <span>{meal.fats}g F</span>
            </div>
          </Card>
        )) : <Card>No meals logged yet. Add your first meal.</Card>}
      </div>
    </div>
  );
}
