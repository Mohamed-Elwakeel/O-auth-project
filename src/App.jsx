import { useCookies } from "react-cookie";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { pageRoutes } from "./Constants";
import './global.css';
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [cookies] = useCookies(["token"]);
  return (
    <Router>
      <Routes>
        <Route path={pageRoutes.login} element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
