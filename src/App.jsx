import Header from './shared/Header';
import Logon from './features/Logon';
import TodosPage from './features/Todos/TodosPage';
import { AuthProvider } from './contexts/AuthProvider';
import { useAuth } from './contexts/useAuth';

function AppContent() {
  const { token } = useAuth();

  return (
    <>
      <Header />

      {token ? (
        <TodosPage token={token} />
      ) : (
        <Logon />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;