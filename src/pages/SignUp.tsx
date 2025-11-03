
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "../components/SignUpForm";

export default function SignUp() {
  const navigate = useNavigate();

  function onSignUpSuccess() {
    navigate("/");
  }

  return (
    <div className="mx-auto w-full max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-semibold">Create account</h1>
      <SignUpForm onSuccess={onSignUpSuccess} />
    </div>
  );
}


