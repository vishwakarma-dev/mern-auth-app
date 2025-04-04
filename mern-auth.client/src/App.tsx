import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './pages/auth/SignInPage';
import Dashboard from './pages/dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
