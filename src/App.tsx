import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import Dashboard from './pages/Dashboard'
// import { withAuthenticationRequired } from '@auth0/auth0-react'

// const ProtectedDashboard = withAuthenticationRequired(Dashboard, {
//   onRedirecting: () => <div className='text-white p-10'>Loading...</div>
// })

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
