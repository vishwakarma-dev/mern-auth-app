import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './pages/auth/SignInPage';
import Dashboard from './pages/dashboard';
import SignUp from './pages/auth/SignUpPage';
import PageNotFound from './components/404NotFound';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Route (No Layout) */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes (Optional Auth Layout) */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* Protected Dashboard Route with Layout */}
        <Route
          element={<ProtectedRoute><MainLayout /></ProtectedRoute>}
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
