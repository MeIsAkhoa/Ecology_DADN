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
  gender: z.enum(["nam", "nu"], { errorMap: () => ({ message: "Gender is required" }) }), // Gender options: 'nam' or 'nu'
  phonenum: z.string().min(1, "Phone number is required"),
  dob: z.string().min(1, "Date of birth is required"),
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

    // Call the API to register the user
    const requestData = {
      username: data.username,
      password: data.password,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      gender: data.gender,
      phonenum: data.phonenum,
      dob: data.dob,
    };

    // Make an API call to register the user
    fetch("your-api-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          console.log("Registration Successful:", data);
          // Handle success (e.g., redirect user to login)
        } else {
          console.log("Registration failed:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8EC] relative">
      {/* Ảnh nền */}
      <img
        src={coverImage}
        alt="Ecology Illustration"
        className="hidden md:block absolute left-10 top-20 w-[100%] max-w-[700px] opacity-100"
      />

      {/* Form Sign Up dời xuống góc dưới bên phải */}
      <div className="absolute right-[5%] top-[5%] bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="Enter your username"
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              {...register("firstname")}
              placeholder="Enter your first name"
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              {...register("lastname")}
              placeholder="Enter your last name"
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname.message}</p>
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

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              {...register("gender")}
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="nam">Male</option>
              <option value="nu">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="text"
              {...register("phonenum")}
              placeholder="Enter your phone number"
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.phonenum && (
              <p className="text-red-500 text-sm">{errors.phonenum.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className="w-full px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
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
