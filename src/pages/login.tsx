// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { GoogleLogin } from "@react-oauth/google";
// import LoginWithGoogle from "../components/google-login-button";
// import coverImage from "../assets/cover.png";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email format"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormInputs = z.infer<typeof loginSchema>;

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormInputs>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = (data: LoginFormInputs) => {
//     console.log("Login Data:", data);
//   };

  // return (
  //   <div className=" flex min-h-screen items-center justify-center bg-[#F8F8EC]">
  //     <div className="w-full bg-white max-w-md  p-8 rounded-2xl shadow-lg">
  //       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
  //         Login
  //       </h2>

  //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  //         <div>
  //           <label className="block text-gray-700 font-medium">Email</label>
  //           <input
  //             type="email"
  //             {...register("email")}
  //             placeholder="Enter your email"
  //             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  //           />
  //           {errors.email && (
  //             <p className="text-red-500 text-sm">{errors.email.message}</p>
  //           )}
  //         </div>

  //         <div>
  //           <label className="block text-gray-700 font-medium">Password</label>
  //           <input
  //             type="password"
  //             {...register("password")}
  //             placeholder="Enter your password"
  //             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  //           />
  //           {errors.password && (
  //             <p className="text-red-500 text-sm">{errors.password.message}</p>
  //           )}
  //         </div>

  //         <button
  //           type="submit"
  //           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
  //         >
  //           Login
  //         </button>

  //         <LoginWithGoogle/>
  //       </form>

       

  //       <p className="mt-4 text-center text-gray-600">
  //         Don't have an account?{" "}
  //         <a href="/register" className="text-blue-500 hover:underline">
  //           Sign up
  //         </a>
  //       </p>
  //     </div>
  //   </div>
  // );

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginWithGoogle from "../components/google-login-button";
import coverImage from "../assets/cover.png";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
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

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
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

      {/* Form login dời xuống góc dưới bên phải */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md absolute bottom-25 right-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

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
