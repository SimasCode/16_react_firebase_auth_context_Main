import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/layout/Header';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './store/AuthProvider';
import TodoPage from './pages/TodoPage';
import BooksPage from './pages/BooksPage';

export default function App() {
  const ctx = useAuth();
  return (
    <div className=''>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route
          path='/profile'
          element={
            ctx.isLoggedIn ? <ProfilePage /> : <Navigate to={'/login'} />
          }
        />

        <Route
          path='/todos'
          element={ctx.isLoggedIn ? <TodoPage /> : <Navigate to={'/login'} />}
        />

        <Route
          path='/books'
          element={ctx.isLoggedIn ? <BooksPage /> : <Navigate to={'/login'} />}
        />

        <Route
          path='/login'
          element={
            ctx.isLoggedIn ? <Navigate to={'/profile'} /> : <LoginPage />
          }
        />
      </Routes>
    </div>
  );
}
