import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';

const features = [
  { title: 'Workout Planning', description: 'Create structured training sessions and track your progress daily.' },
  { title: 'Nutrition Tracking', description: 'Log meals, macros, and calories for smarter meal planning.' },
  { title: 'Goal Management', description: 'Set milestones with deadlines and watch your fitness targets move forward.' },
];

const plans = [
  { name: 'Starter', price: '$0', description: 'Basic tracking for workouts and nutrition.' },
  { name: 'Fit Pro', price: '$9/mo', description: 'Advanced analytics, progress reports, and premium dashboard.' },
  { name: 'Elite', price: '$19/mo', description: 'Complete fitness management for ambitious athletes.' },
];

const testimonials = [
  { quote: 'FitManage helped me stay consistent and crush my fitness goals.', author: 'Priya S.' },
  { quote: 'The dashboard is clean and the progress charts are very motivating.', author: 'Ankit R.' },
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div>
          <span className="eyebrow">Fitness Management Platform</span>
          <h1>Build stronger habits, track every workout, and stay accountable.</h1>
          <p>Create your fitness journey with a modern dashboard, workout tracker, nutrition planner, and progress analytics.</p>
          <div className="hero-actions">
            <Link to="/signup" className="primary-button">Start Free</Link>
            <Link to="/login" className="ghost-button">Login</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <h3>Weekly Summary</h3>
            <div className="hero-stat">24 workouts completed</div>
            <div className="hero-stat">18,340 calories burned</div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <h2>Designed for dedicated learners and professionals</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <Card key={feature.title} title={feature.title}>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="plans-section">
        <h2>Plans built for growth</h2>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <Card key={plan.name} className="pricing-card">
              <h3>{plan.name}</h3>
              <p className="plan-price">{plan.price}</p>
              <p>{plan.description}</p>
              <Link to="/signup" className="secondary-button">Choose Plan</Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <h2>Trusted by students and professionals</h2>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <Card key={item.author}>
              <p className="testimonial-text">“{item.quote}”</p>
              <p className="testimonial-author">{item.author}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <p>Designed for frontend developers and aspiring UX-focused engineers.</p>
      </footer>
    </div>
  );
}
