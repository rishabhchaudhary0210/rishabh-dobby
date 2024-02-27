
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate
} from "react-router-dom";

import { SignUp } from './pages/signUp.jsx';
import { Login } from './pages/logIn.jsx';
import { Uploader } from './pages/uploader.jsx';
import Dashboard from './pages/dashboard.jsx';
import { useAuthContext } from "./hooks/use-auth-context.jsx";
import Home from "./pages/home.jsx";
import Navbar from "./components/navbar.jsx";


function App() {

  const { user, dispatch } = useAuthContext();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">

      <div>
        <BrowserRouter>
            <Navbar/>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/auth/sign-up'
              element={!user ? <SignUp /> : <Navigate to='/' />}
            />
            <Route
              path='/auth/log-in'
              element={!user ? <Login /> : <Navigate to='/' />}
            />
            {/* <Route
              path='/upload'
              element={<Uploader />}
            /> */}
            <Route
              path='/user-library'
              element={<Dashboard />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
