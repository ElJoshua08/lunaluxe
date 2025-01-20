export const Navbar = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6 px-8 sm:px-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
      <div className="flex items-center gap-4">
        <img
          src="/logo.png"
          alt="Lunaluxe Logo"
          className="h-8 w-8"
        />
        <h1 className="text-2xl font-bold">Lunaluxe</h1>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-sm font-medium text-primary">
          Sign in
        </a>
        <a href="#" className="text-sm font-medium text-primary">
          Sign up
        </a>
      </div>
    </div>
  );
};