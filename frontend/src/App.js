import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Create from "./pages/Create"
import Navbar from "./components/Navbar"

const Protected = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect()
    return (
      <div>Login to access this page.</div>
    )
  }

  return children;
}

function App() {

  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Routes>
            <Route path='/profile' element={
              <Protected>
                <Profile/>
              </Protected>
            }
            />
          <Route path="/create" element={<Create />} />
          <Route path='/' element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
