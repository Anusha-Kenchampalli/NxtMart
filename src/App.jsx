
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import NotFound from './Pages/NotFound/NotFound'
import ProtectedRoute from './ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
