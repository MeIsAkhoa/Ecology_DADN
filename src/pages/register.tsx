import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import coverImage from "../assets/cover.png";
import InputField from "../components/InputField";
import { API_ENDPOINTS } from "../constants/Api";
import useMutation from "../hooks/useMutation";
import ROUTES from "../constants/Routes";

// Schema validation với Zod
const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    gender: z.enum(["nam", "nu", "khac"]),
    phonenum: z.string().min(10, "Phone number must be at least 10 digits"),
    dob: z.string().min(1, "Date of birth is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { mutate, error, loading } = useMutation("POST", API_ENDPOINTS.USER_REGISTER);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: RegisterFormInputs) => {
    try {
      await mutate(formData);
      alert("Registration successful!");
      navigate(ROUTES.LOGIN);
    } catch (error) {
      // Error được xử lý trong useMutation
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:disabled md:flex-row items-center justify-center bg-[#F8F8EC] px-[5%] py-12 gap-y-10 md:gap-x-[5%]">
      {/* Ảnh minh họa bên trái */}
      <div className="w-full md:w-[45%] lg:w-[50%] flex justify-center">
        <img
          src={coverImage}
          alt="Ecology Illustration"
          className="w-full h-auto object-contain hidden lg:block"
        />
      </div>

      {/* Phần tiêu đề + form */}
      <div className="flex flex-col items-start justify-center space-y-10 w-full md:w-[55%] lg:w-[50%] pl-4 md:pl-12">

        {/* Form đăng ký */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-[550px]">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[75vh] overflow-y-auto"
          >
            <InputField label="Username" {...register("username")} placeholder="Enter your username" error={errors.username?.message} />
            <InputField label="Email" {...register("email")} type="email" placeholder="Enter your email" error={errors.email?.message} />
            <InputField label="First Name" {...register("firstname")} placeholder="Enter your first name" error={errors.firstname?.message} />
            <InputField label="Last Name" {...register("lastname")} placeholder="Enter your last name" error={errors.lastname?.message} />
            <InputField label="Password" {...register("password")} type="password" placeholder="Enter your password" error={errors.password?.message} />
            <InputField label="Confirm Password" {...register("confirmPassword")} type="password" placeholder="Confirm your password" error={errors.confirmPassword?.message} />
            <InputField label="Phone Number" {...register("phonenum")} placeholder="Enter your phone number" error={errors.phonenum?.message} />
            <InputField label="Date of Birth" {...register("dob")} type="date" error={errors.dob?.message} />

            {/* Gender */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Gender</label>
              <select
                {...register("gender")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="nam">Male</option>
                <option value="nu">Female</option>
                <option value="khac">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            </div>

            {/* Submit */}
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className={`w-full text-white py-2 rounded-lg transition ${
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Sign Up"}
              </button>
            </div>

            {/* Link login */}
            <div className="col-span-1 md:col-span-2">
              <p className="mt-2 text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline font-medium">
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
