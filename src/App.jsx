import { Routes, Route } from 'react-router';
import Header from './shared/Header';
import RequireAuth from './shared/RequireAuth';
import Logon from './features/Logon';
import TodosPage from './features/Todos/TodosPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Logon />} />

        <Route element={<RequireAuth />}>
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;