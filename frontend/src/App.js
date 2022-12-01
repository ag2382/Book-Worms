import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import Create from "./pages/Create"
import Join from "./pages/Join"

const Protected = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>Loading..</div>
    )
  }

  if (!isAuthenticated) {
    loginWithRedirect()
    return (
      <div>Login to access this page.</div>
    )
  }

  return <Outlet />;
}

function App() {

  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route element={<Protected />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<Protected />}>
            <Route path="/create" element={<Create />} />
          </Route>
          <Route element={<Protected />}>
            <Route path="/join" element={<Join />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
