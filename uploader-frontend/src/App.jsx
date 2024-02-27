
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { SignUp } from './pages/signUp.jsx';
import { Login } from './pages/logIn.jsx';
import { Uploader } from './pages/uploader.jsx';
import Dashboard from './pages/dashboard.jsx';
import { useAuthContext } from "./hooks/use-auth-context.jsx";
import Home from "./pages/home.jsx";


function App() {

  const {  user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/auth/sign-up'
            element={!user ? <SignUp /> : <Navigate to='/'/>}
          />
          <Route
            path='/auth/log-in'
            element={!user ? <Login /> : <Navigate to='/'/>}
          />
          <Route
            path='/upload'
            element={<Uploader />}
          />
          <Route
            path='/user-display'
            element={<Dashboard />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
