import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">

{isAuthenticated ? (
                <>
                    <Link to='/'>
                        <h1 className="text 2xl font-bold">Administrador de tareas</h1>
                    </Link>
                    <ul className="flex gap-x-2">
                        <li>
                            <Link to='/tasks'>Tareas</Link>
                        </li>
                        <li>
                            <Link to='/add-task'>Agregar tarea</Link>
                        </li>
                        <li>
                            <Link to='/profile'>Perfil</Link>
                        </li>
                        <li>
                            <Link to='/' onClick={() =>
                                logout()
                            }>Cerrar Sesión</Link>
                        </li>
                    </ul>
                </>
            ) : (
                <>
                    <h1 className="text 2xl font-bold">Bienvenido al sistema IMD</h1>
                </>
            )}


    </nav>
    );
}

export default Navbar;