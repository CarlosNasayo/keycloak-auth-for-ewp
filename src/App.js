import logo from './logo.svg';
import './App.css';
import Public from './components/public';
import Protected from './components/protected';
import useAuth from './hooks/useAuth';
function App() {
  const { userInfo, login, logout } = useAuth();

    return (
        <div>
            {userInfo ? (
                <div>
                    <p>Bienvenido, {userInfo.name}!</p>
                    <button onClick={logout}>Cerrar sesión</button>
                </div>
            ) : (
                <button onClick={login}>Iniciar sesión</button>
            )}
        </div>
    );
}
export default App;
