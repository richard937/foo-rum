import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthModal } from "./AuthModal";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  return (
    <>
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link to="/" className="font-semibold">
          Atlys Forum
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="text-neutral-600">{user.name} ({user.email})</span>
              <button
                onClick={logout}
                className="rounded border border-neutral-300 px-3 py-1 hover:bg-neutral-50"
              >
                Sign out
              </button>
            </>
          ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="rounded bg-indigo-600 px-3 py-1 font-medium text-white hover:bg-indigo-500"
              >
                Log in
              </button>
          )}
        </nav>
      </div>
    </header>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}


