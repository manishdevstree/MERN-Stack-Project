import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight text-white">
          MagicUI
        </div>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Home
          </a>

          <a
            href="#"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Pricing
          </a>

          <a
            href="#"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Button variant="ghost">Login</Button>

          <Button className="rounded-full">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}