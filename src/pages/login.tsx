import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import LoginWithGoogle from "../components/GoogleLoginButton";
import InputField from "../components/InputField";
import coverImage from "../assets/cover.png";
import { API_ENDPOINTS } from "../constants/Api";
import useMutation from "../hooks/useMutation"; // Sử dụng useMutation thay vì useFetch
import ROUTES from "../constants/Routes";

const loginSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginResponse {
  code: number;
  result: {
    token: string;
  };
}

const Login = () => {
  const navigate = useNavigate();
  const { mutate, error, loading } = useMutation<LoginResponse>("POST", API_ENDPOINTS.LOGIN); // Dùng useMutation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await mutate(data);
      if (response?.code === 200) {
        localStorage.setItem("token", response.result.token);
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      // Error is already handled by useMutation
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8EC] relative">
      {/* Ảnh nền */}
      <img
        src={coverImage}
        alt="Ecology Illustration"
        className="hidden md:block absolute left-10 top-20 w-[100%] max-w-[700px] opacity-100"
      />

      {/* Tiêu đề */}
      <div className="text-left fixed right-[5%] top-[10%] w-full max-w-md">
        <h1 className="text-6xl font-bold text-green-700 leading-[1.2]">
          Ecology &
        </h1>
        <h1 className="text-6xl font-bold text-green-700 leading-[1.2]">
          Environment
        </h1>
        <h1 className="text-6xl font-bold text-gray-900 leading-[1.2]">
          Illustrations
        </h1>
      </div>

      {/* Form login */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md absolute top-70 right-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <InputField
            label="Username"
            placeholder="Enter your username"
            {...register("username")}
            error={errors.username?.message}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg transition ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <LoginWithGoogle />
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
