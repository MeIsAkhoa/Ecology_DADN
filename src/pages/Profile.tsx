import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Mail, Phone, Cake, UserCircle, Edit, Save, X } from "lucide-react";
import { API_ENDPOINTS } from "../constants/Api";
import useMutation from "../hooks/useMutation";

interface UserProfile {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenum: string | null;
  dob: string | null;
  gender: string | null;
}

const Profile: React.FC = () => {
  const { data: profileData, refresh: refreshProfile } = useFetch<UserProfile>(API_ENDPOINTS.USER_PROFILE);
  const { mutate: updateProfile, loading: isUpdating, error: updateError } = useMutation<UserProfile>("PUT", API_ENDPOINTS.USER_UPDATE);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  // Default background image
  const defaultBg = "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";

  // Initialize form data when profile data is loaded
  React.useEffect(() => {
    if (profileData) {
      setFormData({
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        gender: profileData.gender,
        phonenum: profileData.phonenum,
        dob: profileData.dob
      });
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLocalAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare the data for API
      const updateData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        gender: formData.gender,
        phonenum: formData.phonenum,
        dob: formData.dob
      };

      const updatedProfile = await updateProfile(updateData);
      
      if (updatedProfile) {
        setIsEditing(false);
        refreshProfile(); // Refresh profile data
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profileData) {
      setFormData({
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        gender: profileData.gender,
        phonenum: profileData.phonenum,
        dob: profileData.dob
      });
    }
    setLocalAvatar(null);
  };

  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="lg:pl-70 bg-white dark:bg-[#172A46] rounded-xl">
      {/* Profile Header with Background - Full width */}
      <div className="relative h-48 w-full bg-green-400 dark:bg-green-600">
        <img 
          src={defaultBg} 
          alt="Profile background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 flex items-end">
          <div className="relative w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600 overflow-hidden shadow-lg">
            {localAvatar || profileData?.email ? (
              <img 
                src={localAvatar || `https://ui-avatars.com/api/?name=${profileData?.firstname}+${profileData?.lastname}&background=random`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-300">
                <UserCircle size={56} />
              </div>
            )}
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full cursor-pointer">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <Edit size={16} />
              </label>
            )}
          </div>
          <div className="ml-6 text-white">
            {isEditing ? (
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname || ''}
                  onChange={handleInputChange}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded px-3 py-1 text-xl font-bold"
                  placeholder="Họ"
                />
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname || ''}
                  onChange={handleInputChange}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded px-3 py-1 text-xl font-bold"
                  placeholder="Tên"
                />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold drop-shadow-md">
                  {profileData?.firstname || 'Họ'} {profileData?.lastname || 'Tên'}
                </h1>
                <p className="text-lg text-white/90 drop-shadow-md mt-1">@{profileData?.username || 'username'}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content - Two column layout for wider screens */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Thông tin cá nhân</h2>
            {isEditing ? (
              <div className="flex space-x-2">
                <button 
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <X size={18} className="mr-2" />
                  Hủy
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isUpdating}
                  className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save size={18} className="mr-2" />
                  {isUpdating ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Edit size={18} className="mr-2" />
                Cập nhật hồ sơ
              </button>
            )}
          </div>

          {updateError && (
            <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
              {updateError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email (readonly) */}
            <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <Mail className="text-green-500 dark:text-green-400" size={20} />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Email</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 pl-12">
                {profileData?.email || <span className="text-gray-400 dark:text-gray-500">Chưa cập nhật</span>}
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
              {isEditing ? (
                <input
                  type="text"
                  name="phonenum"
                  value={formData.phonenum || ''}
                  onChange={handleInputChange}
                  className="ml-4 w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-3 py-1"
                  placeholder="Nhập số điện thoại"
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 pl-12">
                  {profileData?.phonenum || <span className="text-gray-400 dark:text-gray-500">Chưa cập nhật</span>}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <Cake className="text-green-500 dark:text-green-400" size={20} />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Ngày sinh</h3>
              </div>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={formatDateForInput(formData.dob || null)}
                  onChange={handleInputChange}
                  className="ml-4 w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-3 py-1"
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 pl-12">
                  {profileData?.dob ? (
                    new Date(profileData.dob).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">Chưa cập nhật</span>
                  )}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <UserCircle className="text-green-500 dark:text-green-400" size={20} />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Giới tính</h3>
              </div>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleInputChange}
                  className="ml-4 w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-3 py-1"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 pl-12">
                  {profileData?.gender === 'male' ? 'Nam' : 
                   profileData?.gender === 'female' ? 'Nữ' : 
                   profileData?.gender ? 'Khác' : 
                   <span className="text-gray-400 dark:text-gray-500">Chưa cập nhật</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Additional Info (readonly) */}
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