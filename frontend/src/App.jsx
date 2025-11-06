import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/auth";
import Dash from "./pages/Dashboard";
import Analytics from "./pages/analytics";
import Payments from "./pages/payments";
import Subscriptions from "./pages/subscriptions";
import Settings from "./pages/settings";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
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
