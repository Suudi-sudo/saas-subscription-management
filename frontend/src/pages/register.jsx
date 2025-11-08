import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setNotification({ type: "error", message: "Passwords do not match!" });
      return;
    }
    if (!form.name || !form.email || !form.password) {
      setNotification({ type: "error", message: "Please fill all fields." });
      return;
    }
    setNotification({
      type: "success",
      message: "Account created successfully!",
    });
    setTimeout(() => navigate("/login"), 1500);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="rounded-2xl border border-border h-180 max-w-140 w-[85%] min-w-76 p-4 bg-[#11131a45] backdrop-blur-2xl flex flex-col justify-evenly">
        <h2 className="font-bold text-2xl">Sign Up</h2>

        <button className="bg-foreground text-background items-center flex h-12 justify-center gap-2">
          <FcGoogle className="text-2xl" />
          Sign up with Google
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
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2"
            type="text"
            placeholder="John Doe"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />

          <label className="text-muted-foreground">Email</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2"
            type="email"
            placeholder="you@example.com"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="text-muted-foreground">Password</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2"
            type="password"
            value={form.password}
            name="password"
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <label className="text-muted-foreground">Confirm Password</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2"
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
            className="w-full !rounded-full bg-primary py-2"
          >
            Create Account
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <a className="!text-foreground hover:!text-primary" href="/login">
            Log In
          </a>
        </p>
      </div>
      {notification && (
        <div className="absolute top-4 right-4 p-2 rounded-lg w-64 gap-4 h-18 border border-border flex items-center">
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
