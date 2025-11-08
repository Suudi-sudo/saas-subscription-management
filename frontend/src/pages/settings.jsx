import { DashNav } from "../components/navbar";
export default function Settings() {
  return (
    <div>
      <DashNav />
      <main className="relative top-16 md:left-50 p-4 md:w-[calc(100vw-200px)] flex flex-col gap-4">
        <header className="text-left">
          <h2 className="text-3xl font-bold my-2">Settings</h2>
          <p>Manage your account and notifications preferences</p>
        </header>
        <div className="flex items-center rounded-full border border-border gap-4 w-fit h-8">
          <button
            type="button"
            className="h-full px-3 rounded-full bg-border/60"
          >
            Notifications
          </button>
          <button type="button" className="h-full px-3 rounded-full">
            Profile
          </button>
        </div>
      </main>
    </div>
  );
}
