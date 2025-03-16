import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import coverImage from "../assets/cover.png";

// Schema validation với Zod
const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  gender: z.enum(["nam", "nu", "khac"]),
  phonenum: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.string().min(1, "Date of birth is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  // Xử lý khi nhấn "Sign Up"
  const onSubmit = async (formData: RegisterFormInputs) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/user/create", {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        gender: formData.gender,
        phonenum: formData.phonenum,
        dob: formData.dob,
      });

      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login"); // Chuyển hướng đến trang đăng nhập
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8EC] relative">
      {/* Ảnh nền */}
      <img
        src={coverImage}
        alt="Ecology Illustration"
        className="absolute left-10 top-20 w-[100%] max-w-[700px] opacity-100"
      />

      {/* Tiêu đề */}
      <div className="absolute top-10 left-170 text-left">
        <h1 className="text-6xl font-bold text-green-700 leading-[1.2]">Ecology &</h1>
        <h1 className="text-6xl font-bold text-green-700 leading-[1.2]">Environment</h1>
        <h1 className="text-6xl font-bold text-gray-900 leading-[1.2]">Illustrations</h1>
      </div>

      {/* Form Sign Up dời xuống góc dưới bên phải */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md absolute top-70 right-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"

            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400
              onChange={handleChange}
              required

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"

              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400
              onChange={handleChange}
              required

            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phonenum"
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg transition ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>


        <p className="mt-4 text-center text-gray-600">

          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
