import { useNavigate } from "react-router-dom";
import { SignInForm } from "../components/SignInForm";

export default function SignIn() {
  const navigate = useNavigate();

  function onSignInSuccess() {
    navigate("/");
  }

  return (
    <div className="mx-auto w-full max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-semibold">Sign in</h1>
      <SignInForm onSuccess={onSignInSuccess} />
    </div>
  );
}


