import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  // State lưu trữ thông tin form
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstname: "",
    lastname: "",
    gender: "nam",
    phonenum: "",
    dob: ""
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý khi nhấn nút "Sign Up"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra password và confirmPassword có khớp không
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true); // Bật trạng thái loading

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
        console.log("") // Điều hướng về trang đăng nhập
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F8F8EC]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        {/* Hiển thị lỗi nếu có */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
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
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
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
          </div>

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

        {/* Điều hướng sang Login */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
