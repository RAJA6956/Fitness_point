import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import WorkoutTracker from './pages/WorkoutTracker.jsx';
import NutritionTracker from './pages/NutritionTracker.jsx';
import ProgressTracker from './pages/ProgressTracker.jsx';
import Goals from './pages/Goals.jsx';
import BMICalculator from './pages/BMICalculator.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';

function App() {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);

  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        {isAuthenticated && <Sidebar />}
        <main className="content-area">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/workouts" element={isAuthenticated ? <WorkoutTracker /> : <Navigate to="/login" />} />
            <Route path="/nutrition" element={isAuthenticated ? <NutritionTracker /> : <Navigate to="/login" />} />
            <Route path="/progress" element={isAuthenticated ? <ProgressTracker /> : <Navigate to="/login" />} />
            <Route path="/goals" element={isAuthenticated ? <Goals /> : <Navigate to="/login" />} />
            <Route path="/bmi" element={isAuthenticated ? <BMICalculator /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
