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
import ProtectRoute from "./components/protectRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectRoute>
                <Dash />
              </ProtectRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectRoute>
                <Analytics />
              </ProtectRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectRoute>
                <Payments />
              </ProtectRoute>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <ProtectRoute>
                <Subscriptions />
              </ProtectRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectRoute>
                <Settings />
              </ProtectRoute>
            }
          />
          {/* ADD THIS CATCH-ALL ROUTE - THIS FIXES THE 404 ISSUE */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;