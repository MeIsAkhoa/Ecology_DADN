import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import coverImage from "../assets/cover.png";
import api from "../utils/baseURL";
import InputField from "../components/input-field";

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
      const response = await api.post("/user/create", formData);
      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login");
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
        className="hidden md:block absolute left-10 top-20 w-[100%] max-w-[700px] opacity-100"
      />
      {/* Tiêu đề */}
      <div className="absolute top-10 left-170 text-left">
        <h1 className="text-6xl font-bold text-green-700 leading-[1.2]">Ecology &</h1>
        <h1 className="text-6xl font-bold text-green-700 leading-[1.2]">Environment</h1>
        <h1 className="text-6xl font-bold text-gray-900 leading-[1.2]">Illustrations</h1>
      </div>

      {/* Form Sign Up */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md absolute top-70 right-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <InputField label="Username" name="username" placeholder="Enter your username" register={register} error={errors.username?.message} />
          <InputField label="Email" name="email" type="email" placeholder="Enter your email" register={register} error={errors.email?.message} />
          <InputField label="First Name" name="firstname" placeholder="Enter your first name" register={register} error={errors.firstname?.message} />
          <InputField label="Last Name" name="lastname" placeholder="Enter your last name" register={register} error={errors.lastname?.message} />
          <InputField label="Password" name="password" type="password" placeholder="Enter your password" register={register} error={errors.password?.message} />
          <InputField label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm your password" register={register} error={errors.confirmPassword?.message} />
          <InputField label="Phone Number" name="phonenum" placeholder="Enter your phone number" register={register} error={errors.phonenum?.message} />
          <InputField label="Date of Birth" name="dob" type="date" register={register} error={errors.dob?.message} />
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
            className={`w-full text-white py-2 rounded-lg transition ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
