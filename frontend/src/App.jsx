import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dash from "./pages/Dashboard";
import Analytics from "./pages/analytics";
import Payments from "./pages/payments";
import Subscriptions from "./pages/subscriptions";
import Settings from "./pages/settings";
import Register from "./pages/register";
import LogIn from "./pages/login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dash />}></Route>
          <Route path="/analytics" element={<Analytics />}></Route>
          <Route path="/payments" element={<Payments />}></Route>
          <Route path="/subscriptions" element={<Subscriptions />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
