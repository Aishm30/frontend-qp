import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AddQP from './pages/AddQp';
import ManageQP from './pages/ManageQP';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/add-qp" element={<AddQP />} />
        <Route path="/manage-qp" element={<ManageQP />} />
      </Routes>
    </Router>
  );
}

export default App;
