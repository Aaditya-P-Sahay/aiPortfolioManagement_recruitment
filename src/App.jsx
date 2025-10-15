import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Understanding from './pages/Understanding'
import Execution from './pages/Execution'
import Interest from './pages/Interest'
import Success from './pages/Success'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function AdminButton() {
  const location = useLocation()
  const showAdminBtn = !location.pathname.startsWith('/admin')

  if (!showAdminBtn) return null

  return (
    <div className="admin-corner">
      <button
        className="admin-btn"
        onClick={() => window.location.href = '/admin'}
      >
        Admin
      </button>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AdminButton />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/apply/understanding" element={<Understanding />} />
          <Route path="/apply/execution" element={<Execution />} />
          <Route path="/apply/interest" element={<Interest />} />
          <Route path="/success" element={<Success />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
