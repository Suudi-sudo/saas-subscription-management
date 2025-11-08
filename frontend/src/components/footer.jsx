export function Footer() {
  return (
    <section className="w-full border-border border-t gap-2 sm:gap-0 flex flex-col sm:flex-row justify-between p-8 lg:px-20 xl:pr-30 [&>div]:sm:max-w-80 [&>div]:sm:w-[30%]  [&>div]:text-left">
      <div>
        <h3 className="flex items-center font-grotesk font-semibold text-2xl">
          <img src="/logo.png" className="h-8" />
          Billiance
        </h3>
        <p>&copy; 2025 Billiance. All Rights Reserved.</p>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-xl font-semibold mb-1">Sitemap</h4>
        <a href="#Pricing">Pricing</a>
        <a href="#Features">Features</a>
        <a href="/login">Get Started</a>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-xl font-semibold mb-1">Legal</h4>
        <a href="">Privacy</a>
        <a href="">Terms</a>
        <a href="">Cookie Policy</a>
      </div>
    </section>
  );
}
