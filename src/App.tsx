import { Routes, Route, Outlet } from 'react-router-dom'
import Feed from './pages/Feed'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl p-4">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Feed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  )
}

function NotFound() {
  return <div className="p-4">Page not found</div>
}

export default App
