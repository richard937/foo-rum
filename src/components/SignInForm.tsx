import { useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';

type SignInFormProps = {
  onSuccess?: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const { login, user } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Call onSuccess when user successfully authenticates
  useEffect(() => {
    if (user) {
      onSuccess?.();
    }
  }, [user, onSuccess]);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setError("");
    
    try {
      await login(email, password);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  return (
    <form onSubmit={handleSignIn}>
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
      <input
        className="mb-4 w-full rounded-md border border-gray-200 bg-gray-100 p-3 text-sm placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
        type="email"
        placeholder="Email or username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="mb-4 w-full rounded-md border border-gray-200 bg-gray-100 p-3 text-sm placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-indigo-600 py-3 font-semibold text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Sign In
      </button>
    </form>
  );
}
