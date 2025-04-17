import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import LoginWithGoogle from "../components/GoogleLoginButton";
import InputField from "../components/InputField";
import coverImage from "../assets/cover.png";
import { API_ENDPOINTS } from "../constants/Api";
import useMutation from "../hooks/useMutation";
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
  const { mutate, error, loading } = useMutation<LoginResponse>("POST", API_ENDPOINTS.LOGIN);

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
      // Handled inside useMutation
    }
  };

  return (

    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#F8F8EC] px-[5%] py-12 gap-y-10 md:gap-x-[5%]">
      {/* Ảnh minh họa bên trái */}
      <div className="w-full md:w-[45%] lg:w-[50%] flex justify-center lg:block hidden">
        <img
          src={coverImage}
          alt="Ecology Illustration"
          className="w-full h-auto object-contain "
        />
      </div>

      {/* Phần tiêu đề + form */}
      <div className="flex flex-col items-start justify-center space-y-10 w-full md:w-[55%] lg:w-[50%] pl-4 md:pl-12">
        {/* Tiêu đề - dùng 2 thẻ h1 giống Register.tsx */}
        <div className="text-left w-full px-2 md:px-0">
          <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-green-700 leading-tight">
            Ecology & Environment
          </h1>
          <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-900 leading-tight">
            Illustrations
          </h1>
        </div>

        {/* Form đăng nhập */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-[500px]">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Login</h2>

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

          <p className="mt-2 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline font-medium">
              Sign Up
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
