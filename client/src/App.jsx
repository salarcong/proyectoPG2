import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TaskFormPage from './pages/TaskFormPage.jsx';
import TaskListPage from './pages/TaskListPage.jsx'; // Import the new component
import ProfilePage from './pages/ProfilePage.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { TasksProvider } from './context/TasksContext.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TasksProvider>
          <main className='container mx-auto px-10'>
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/unauthorized" element={<div>Unauthorized</div>} />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              <Route element={<ProtectedRoute role="user" />}>
                <Route path="/tasks" element={<TaskListPage />} /> {/* Update this route */}
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
              </Route>

              <Route element={<ProtectedRoute role="admin" />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </main>
        </TasksProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;