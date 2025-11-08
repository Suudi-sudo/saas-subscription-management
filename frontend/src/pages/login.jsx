import { FcGoogle } from "react-icons/fc";

export default function LogIn() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="rounded-2xl border border-border h-130 max-w-140 w-[85%] min-w-76 p-4 bg-[#11131a45] backdrop-blur-2xl flex flex-col justify-evenly">
        <h2 className="font-bold text-2xl">Sign In</h2>
        <button className="bg-foreground text-background items-center flex h-12 justify-center gap-2">
          <FcGoogle className="text-2xl" />
          Login with google
        </button>
        <div className="flex items-center gap-0.5 justify-center">
          <hr className="w-2" />
          OR
          <hr className="w-2" />
        </div>
        <form className="w-full flex flex-col items-baseline gap-4">
          <label className="text-muted-foreground">Email</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2"
            type="email"
          />
          <label className="text-muted-foreground">Password</label>
          <input
            className="h-12 w-full rounded-lg outline-none border border-muted-foreground focus:border-primary px-2"
            type="password"
          />
          <div className="flex items-center justify-between w-full text-sm">
            <div className="gap-2 flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className=" accent-primary"
              />
              <span>Remember Me</span>
            </div>
            <a>Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full !rounded-full bg-primary py-2"
          >
            Log In
          </button>
        </form>
        <p>
          Not a member?{" "}
          <a className="!text-foreground hover:!text-primary" href="/register">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
