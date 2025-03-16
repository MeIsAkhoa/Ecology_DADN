// import { Link } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";

// const Register = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#F8F8EC]">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-96">
//         <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

//         {/* Form */}
//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Confirm Password</label>
//             <input
//               type="password"
//               placeholder="Confirm your password"
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Sign Up
//           </button>
//         </form>


//         {/* Điều hướng sang Login */}
//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import coverImage from "../assets/cover.png";

// Schema validation với Zod
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Register Data:", data);
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
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              {...register("confirmPassword")}
              placeholder="Confirm your password"
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? Login */}
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
