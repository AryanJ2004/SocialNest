import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import NotFound from './components/NotFound'; // Import the NotFound component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route 
            path="/admin/login" 
            element={isLoggedIn ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={() => setIsLoggedIn(true)} />} 
          />
          <Route 
            path="/admin/dashboard" 
            element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" />} 
          />
          {/* Add a catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
