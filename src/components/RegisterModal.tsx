import { useAuth0 } from "@auth0/auth0-react";

const RegisterModal = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignup = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
        redirect_uri: window.location.origin + "/dashboard",
      },
    });
  };

  return (
    <button
      onClick={handleSignup}
      className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold"
    >
      Create Account
    </button>
  );
};

export default RegisterModal;