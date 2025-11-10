import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuX } from "react-icons/lu";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';

export default function LogIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const API_BASE_URL = "https://saas-subscription-management.onrender.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.password || !form.email) {
      setError("Please input both password and email");
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting email/password login with:', { email: form.email });
      
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("Login failed. Please try again.");
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

      console.log('Google user info:', userInfo);

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
        navigate("/dashboard");
      } else {
        setError(data.error || "Google login failed");
      }
    } catch (error) {
      console.error('Google OAuth error:', error);
      setError("Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google authentication failed. Please try again.");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    scope: 'email profile',
  });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="rounded-2xl border border-border h-130 max-w-140 w-[85%] min-w-76 p-4 bg-[#11131a45] backdrop-blur-2xl flex flex-col justify-evenly">
        <h2 className="font-bold text-2xl">Sign In</h2>
        
        <button 
          className="bg-foreground text-background items-center flex h-12 justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition-opacity"
          onClick={() => googleLogin()}
          type="button"
          disabled={googleLoading}
        >
          <FcGoogle className="text-2xl" />
          {googleLoading ? "Connecting to Google..." : "Login with Google"}
        </button>
        
        <div className="flex items-center gap-0.5 justify-center">
          <hr className="w-2" />
          OR
          <hr className="w-2" />
        </div>
        
        <form
          className="w-full flex flex-col items-baseline gap-4"
          onSubmit={handleLogin}
        >
          <label className="text-muted-foreground">Email</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2 bg-transparent"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
          
          <label className="text-muted-foreground">Password</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2 bg-transparent"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
          
          <div className="flex items-center justify-between w-full text-sm">
            <div className="gap-2 flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="accent-primary"
              />
              <span>Remember Me</span>
            </div>
            <a className="hover:text-primary cursor-pointer">Forgot Password?</a>
          </div>
          
          <button
            type="submit"
            className="w-full !rounded-full bg-primary py-2 disabled:opacity-50 hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        
        <p>
          Not a member?{" "}
          <Link to="/register" className="!text-foreground hover:!text-primary">
            Sign Up
          </Link>
        </p>
      </div>
      
      {error && (
        <div className="absolute top-4 right-4 p-2 rounded-lg w-70 h-22 border border-border flex items-center bg-background">
          <div className="text-left text-red-400 font-semibold">{error}</div>
          <button
            type="button"
            className="!border-none"
            onClick={() => setError("")}
          >
            <LuX className="text-xl hover:text-primary" />
          </button>
        </div>
      )}
    </div>
  );
}