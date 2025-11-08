import { FcGoogle } from "react-icons/fc";

export default function Register() {
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

        <form className="w-full flex flex-col items-baseline gap-4">
          <label className="text-muted-foreground">Full Name</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2"
            type="text"
            placeholder="John Doe"
            required
          />

          <label className="text-muted-foreground">Email</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2"
            type="email"
            placeholder="you@example.com"
            required
          />

          <label className="text-muted-foreground">Password</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2"
            type="password"
            placeholder="••••••••"
            required
          />

          <label className="text-muted-foreground">Confirm Password</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2"
            type="password"
            placeholder="••••••••"
            required
          />

          <div className="flex items-center justify-start w-full text-sm gap-2">
            <input type="checkbox" className="accent-primary" />
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
    </div>
  );
}
