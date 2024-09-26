import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TaskFormPage from './pages/TaskFormPage.jsx';
import TaskPage from './pages/TaskPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import HomePage from './pages/HomePage.jsx';

import ProtectedRoute  from './ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} /> 

        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<HomePage/>} /> 
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/tasks" element={<TaskPage/>} />
          <Route path="/add-task" element={<TaskFormPage/>} />
          <Route path="/tasks/:id" element={<TaskFormPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;