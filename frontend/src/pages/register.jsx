import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuX } from "react-icons/lu";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const API_BASE_URL = "https://saas-subscription-management.onrender.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setNotification({ type: "error", message: "Passwords do not match!" });
      setLoading(false);
      return;
    }

    if (!form.name || !form.email || !form.password) {
      setNotification({ type: "error", message: "Please fill all fields." });
      setLoading(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // CHANGED: Increased to 60 seconds

      console.log('Sending registration request...');

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      if (!data.token || !data.user) {
        throw new Error("Invalid response from server - missing token or user data");
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setNotification({
        type: "success",
        message: "Account created successfully!",
      });
      
      // Navigate immediately without delay
      navigate("/dashboard");
      
    } catch (error) {
      console.error('Registration error:', error);
      if (error.name === 'AbortError') {
        setNotification({ 
          type: "error", 
          message: "Request timeout. The server is still slow. Please try again or contact support." 
        });
      } else {
        setNotification({ 
          type: "error", 
          message: error.message || "Registration failed. Please try again." 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (googleResponse) => {
    setGoogleLoading(true);
    try {
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${googleResponse.access_token}`,
        },
      }).then(res => res.json());

      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleId: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          profilePicture: userInfo.picture,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setNotification({
          type: "success",
          message: "Google registration successful!",
        });
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setNotification({ 
          type: "error", 
          message: data.error || "Google registration failed." 
        });
      }
    } catch (error) {
      setNotification({ 
        type: "error", 
        message: "Google registration failed. Please try again." 
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setNotification({ 
      type: "error", 
      message: "Google authentication failed. Please try again." 
    });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    scope: 'email profile',
  });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="rounded-2xl border border-border h-180 max-w-140 w-[85%] min-w-76 p-4 bg-[#11131a45] backdrop-blur-2xl flex flex-col justify-evenly">
        <h2 className="font-bold text-2xl">Sign Up</h2>

        <button 
          className="bg-foreground text-background items-center flex h-12 justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition-opacity"
          onClick={() => googleLogin()}
          type="button"
          disabled={googleLoading}
        >
          <FcGoogle className="text-2xl" />
          {googleLoading ? "Connecting to Google..." : "Sign up with Google"}
        </button>

        <div className="flex items-center gap-0.5 justify-center">
          <hr className="w-2" />
          OR
          <hr className="w-2" />
        </div>

        <form
          className="w-full flex flex-col items-baseline gap-4"
          onSubmit={handleSubmit}
        >
          <label className="text-muted-foreground">Full Name</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2 bg-transparent"
            type="text"
            placeholder="John Doe"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />

          <label className="text-muted-foreground">Email</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2 bg-transparent"
            type="email"
            placeholder="you@example.com"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="text-muted-foreground">Password</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2 bg-transparent"
            type="password"
            value={form.password}
            name="password"
            onChange={handleChange}
            placeholder="••••••••"
            required
            minLength="6"
          />

          <label className="text-muted-foreground">Confirm Password</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2 bg-transparent"
            type="password"
            value={form.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <div className="flex items-center justify-start w-full text-sm gap-2">
            <input type="checkbox" className="accent-primary" required />
            <span>
              I agree to the{" "}
              <a className="!text-foreground hover:!text-primary" href="#">
                Terms & Conditions
              </a>
            </span>
          </div>

          <button
            type="submit"
            className="w-full !rounded-full bg-primary py-2 disabled:opacity-50 hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="!text-foreground hover:!text-primary">
            Log In
          </Link>
        </p>
      </div>
      {notification && (
        <div className="absolute top-4 right-4 p-2 rounded-lg w-64 gap-4 h-18 border border-border flex items-center bg-background">
          <div
            className={`text-left font-semibold ${notification.type == "success" ? "text-green-400" : "text-red-400"}`}
          >
            {notification.message}
          </div>
          <button
            type="button"
            className="!border-none"
            onClick={() => setNotification(null)}
          >
            <LuX className="text-xl hover:text-primary" />
          </button>
        </div>
      )}
    </div>
  );
}