import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AddQP from './pages/AddQp';
import ManageQP from './pages/ManageQP';
import UserRegister from './pages/UserRegister';
import UserDashboard from './pages/UserDashboard';
import CommentsPage from './pages/CommentsPage';

import AdminDashboard from './components/AdminDashboard';

import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';

function App() {
  const admintoken = localStorage.getItem('admintoken');
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* User protected routes */}
        <Route
          path="/dashboard"
          element={token ? <UserDashboard /> : <Navigate to="/login" />}
        />

        {/* Admin protected routes */}
        <Route
          path="/admin-dashboard"
          element={admintoken ? <AdminDashboard /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/add-qp"
          element={admintoken ? <AddQP /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/manage-qp"
          element={admintoken ? <ManageQP /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/comments"
          element={admintoken ? <CommentsPage /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
