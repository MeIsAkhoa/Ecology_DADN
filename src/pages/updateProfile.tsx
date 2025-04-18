import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import { API_ENDPOINTS } from "../constants/Api";
import ROUTES from "../constants/Routes";
import { ArrowLeft, Save, UserCircle, Mail, Calendar, Phone } from "lucide-react";

// Define the validation schema for the form
const updateProfileSchema = z.object({
  firstname: z.string().min(1, "Họ không được để trống"),
  lastname: z.string().min(1, "Tên không được để trống"),
  phonenum: z.string().min(10, "Số điện thoại phải có ít nhất 10 chữ số"),
  dob: z.string().min(1, "Ngày sinh không được để trống"),
  gender: z.enum(["nam", "nu", "khac"], {
    errorMap: () => ({ message: "Vui lòng chọn giới tính hợp lệ" })
  })
});

type UpdateProfileInputs = z.infer<typeof updateProfileSchema>;

// Define the user profile type based on backend response
type UserProfile = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenum: string;
  dob: string;
  gender: string;
};

const UpdateProfile: React.FC = () => {
  const navigate = useNavigate();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  // Fetch current user profile data
  const { 
    data: userData, 
    loading: fetchLoading, 
    error: fetchError 
  } = useFetch<UserProfile>(API_ENDPOINTS.USER_PROFILE);
  
  // Setup mutation for updating profile
  const { 
    mutate, 
    loading: updateLoading, 
    error: updateError 
  } = useMutation("PUT", API_ENDPOINTS.USER_UPDATE);
  
  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty }
  } = useForm<UpdateProfileInputs>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenum: "",
      dob: "",
      gender: "nam"
    }
  });
  
  // When user data is loaded, populate the form
  useEffect(() => {
    if (userData) {
      // Handle gender type safely
      let validGender: "nam" | "nu" | "khac" = "nam";
      if (userData.gender === "nam" || userData.gender === "nu" || userData.gender === "khac") {
        validGender = userData.gender as "nam" | "nu" | "khac";
      }
      
      setValue("firstname", userData.firstname || "");
      setValue("lastname", userData.lastname || "");
      setValue("phonenum", userData.phonenum || "");
      setValue("dob", userData.dob ? userData.dob.substring(0, 10) : "");
      setValue("gender", validGender);
    }
  }, [userData, setValue]);
  
  // Handle form submission
  const onSubmit = async (data: UpdateProfileInputs) => {
    try {
      await mutate(data);
      setUpdateSuccess(true);
      
      // Reset success message after a delay
      setTimeout(() => {
        setUpdateSuccess(false);
        navigate(ROUTES.PROFILE); // Navigate back to profile page
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-[#172A46]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (fetchError) {
    return (
      <div className="p-8 bg-white dark:bg-[#172A46] rounded-xl">
        <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-xl text-red-500 dark:text-red-400">
          <p>Lỗi khi tải dữ liệu hồ sơ: {fetchError}</p>
          <button 
            onClick={() => navigate(ROUTES.PROFILE)}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-8 bg-white dark:bg-[#172A46] rounded-xl lg:pl-70">
      {/* Header */}
      <div className="bg-green-400 dark:bg-green-600 p-6 rounded-t-xl">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(ROUTES.PROFILE)}
            className="mr-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white drop-shadow-md">Cập nhật hồ sơ</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {/* Success message */}
          {updateSuccess && (
            <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-xl mb-6">
              <p className="font-semibold text-green-500 dark:text-green-400">Cập nhật thành công!</p>
              <p className="text-gray-700 dark:text-gray-300">Hồ sơ của bạn đã được cập nhật. Đang chuyển hướng về trang hồ sơ...</p>
            </div>
          )}
          
          {/* Error message */}
          {updateError && (
            <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-xl mb-6">
              <p className="font-semibold text-red-500 dark:text-red-400">Lỗi</p>
              <p className="text-gray-700 dark:text-gray-300">{updateError}</p>
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* User Info Card */}
            <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <UserCircle size={32} className="text-gray-400 dark:text-gray-300" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  @{userData?.username}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 flex items-center">
                  <Mail size={16} className="mr-2" />
                  {userData?.email}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
                <label className="flex items-center mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                    <UserCircle className="text-green-500 dark:text-green-400" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Họ</h3>
                </label>
                <input
                  {...register("firstname")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-white"
                  placeholder="Nhập họ"
                />
                {errors.firstname && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">{errors.firstname.message}</p>
                )}
              </div>
              
              {/* Last Name */}
              <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
                <label className="flex items-center mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                    <UserCircle className="text-green-500 dark:text-green-400" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Tên</h3>
                </label>
                <input
                  {...register("lastname")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-white"
                  placeholder="Nhập tên"
                />
                {errors.lastname && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">{errors.lastname.message}</p>
                )}
              </div>
              
              {/* Phone Number */}
              <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
                <label className="flex items-center mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                    <Phone className="text-green-500 dark:text-green-400" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Số điện thoại</h3>
                </label>
                <input
                  {...register("phonenum")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-white"
                  placeholder="Nhập số điện thoại"
                />
                {errors.phonenum && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">{errors.phonenum.message}</p>
                )}
              </div>
              
              {/* Date of Birth */}
              <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
                <label className="flex items-center mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                    <Calendar className="text-green-500 dark:text-green-400" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Ngày sinh</h3>
                </label>
                <input
                  type="date"
                  {...register("dob")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-white"
                />
                {errors.dob && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">{errors.dob.message}</p>
                )}
              </div>
              
              {/* Gender */}
              <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl md:col-span-2">
                <label className="flex items-center mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                    <UserCircle className="text-green-500 dark:text-green-400" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Giới tính</h3>
                </label>
                <div className="flex space-x-6 pl-12">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register("gender")}
                      value="nam"
                      className="form-radio h-4 w-4 text-green-500 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Nam</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register("gender")}
                      value="nu"
                      className="form-radio h-4 w-4 text-green-500 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Nữ</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register("gender")}
                      value="khac"
                      className="form-radio h-4 w-4 text-green-500 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Khác</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">{errors.gender.message}</p>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updateLoading || !isDirty}
                className={`flex items-center px-6 py-2 rounded-lg text-white transition-colors ${
                  isDirty ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700' : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                }`}
              >
                <Save size={18} className="mr-2" />
                {updateLoading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Right Column - Placeholder for Additional Info */}
        <div className="lg:col-span-1">
          <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-xl h-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Thông tin bổ sung</h3>
            <div className="space-y-5">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ngày tham gia</p>
                <p className="text-gray-800 dark:text-gray-200">15/03/2023</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Vai trò</p>
                <p className="text-gray-800 dark:text-gray-200">Thành viên</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Trạng thái</p>
                <p className="text-green-500 dark:text-green-400 flex items-center">
                  <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-2"></span>
                  Đang hoạt động
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;