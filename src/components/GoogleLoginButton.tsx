import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const LoginWithGoogle = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login Success:", tokenResponse), navigate("/home");
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="w-full border-solid border-2 flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg hover:bg-blue-300 transition"
    >
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path
          fill="#4285F4"
          d="M44.5 20H24v8.5h11.9C34.6 33.3 30 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.8 0 5.4 1 7.5 2.6l6.2-6.2C34.8 5.2 29.7 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.6 0 19.5-7.5 19.5-20 0-1.3-.2-2.7-.5-4z"
        />
      </svg>
      Login with Google
    </button>
  );
};

export default LoginWithGoogle;
