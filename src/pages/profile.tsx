import React from "react";
import useFetch from "../hooks/useFetch";
import { Mail, Phone, Cake, UserCircle, Edit } from "lucide-react";
import { API_ENDPOINTS } from "../constants/Api";

const Profile: React.FC = () => {
  const { data } = useFetch<{
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phonenum: number | null;
    dob: any;
    gender: any;
  }>(API_ENDPOINTS.USER_PROFILE);

  // Default background image
  const defaultBg = "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";

  return (
    <div className=" lg:pl-70 bg-white dark:bg-[#172A46] rounded-xl ">
      {/* Profile Header with Background - Full width */}
      <div className="relative h-48 w-full bg-green-400 dark:bg-green-600">
        <img 
          src={defaultBg} 
          alt="Profile background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 flex items-end">
          <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600 overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-300">
              <UserCircle size={56} />
            </div>
          </div>
          <div className="ml-6 text-white">
            <h1 className="text-3xl font-bold drop-shadow-md">
              {data?.firstname || 'Họ'} {data?.lastname || 'Tên'}
            </h1>
            <p className="text-lg text-white/90 drop-shadow-md mt-1">@{data?.username || 'username'}</p>
          </div>
        </div>
      </div>

      {/* Profile Content - Two column layout for wider screens */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Thông tin cá nhân</h2>
            <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg transition-colors">
              <Edit size={18} className="mr-2" />
              Cập nhật hồ sơ
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <Mail className="text-green-500 dark:text-green-400" size={20} />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Email</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 pl-12">
                {data?.email || <span className="text-gray-400 dark:text-gray-500">Chưa cập nhật</span>}
              </p>
            </div>

            {/* Phone Number */}
            <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <Phone className="text-green-500 dark:text-green-400" size={20} />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Số điện thoại</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 pl-12">
                {data?.phonenum || <span className="text-gray-400 dark:text-gray-500">Chưa cập nhật</span>}
              </p>
            </div>

            {/* Date of Birth */}
            <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <Cake className="text-green-500 dark:text-green-400" size={20} />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Ngày sinh</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 pl-12">
                {data?.dob ? (
                  new Date(data.dob).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })
                ) : (
                  <span className="text-gray-400 dark:text-gray-500">Chưa cập nhật</span>
                )}
              </p>
            </div>

            {/* Gender */}
            <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <UserCircle className="text-green-500 dark:text-green-400" size={20} />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Giới tính</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 pl-12">
                {data?.gender || <span className="text-gray-400 dark:text-gray-500">Chưa cập nhật</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Additional Info */}
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
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Xác minh</p>
                <p className="text-gray-800 dark:text-gray-200 flex items-center">
                  <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-2"></span>
                  Email đã xác minh
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Giới thiệu</p>
                <p className="text-gray-800 dark:text-gray-200 italic">
                  "Thành viên tích cực của cộng đồng EcologyDash"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;