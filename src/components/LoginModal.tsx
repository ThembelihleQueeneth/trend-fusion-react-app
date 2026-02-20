import { useAuth0 } from "@auth0/auth0-react";

const LoginModal = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "login",
        redirect_uri: window.location.origin + "/dashboard",
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold"
    >
      Continue with Auth0
    </button>
  );
};

export default LoginModal;