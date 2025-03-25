import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import LoginWithGoogle from "../components/google-login-button";
import InputField from "../components/input-field"; // Import InputField
import coverImage from "../assets/cover.png";
import api from "../utils/baseURL";
import { API_ENDPOINTS } from "../constants/Api";

const loginSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, data);

      if (response.data.code === 200) {
        localStorage.setItem("token", response.data.result.token);
        window.location.href = "/";
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Đăng nhập thất bại!");
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
      <div className="fixed right-[5%] bottom-25 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <InputField
          label="Username"
          placeholder="Enter your username"
          {...register("username")} // Truyền toàn bộ props từ register
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
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
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
