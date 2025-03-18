import React, { useState, useEffect } from "react";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    phonenum: "",
    dob: "",
    gender: "",
  });

  const token = "your_token_here"; // Lấy token của bạn từ localStorage hoặc context

  useEffect(() => {
    // Lấy dữ liệu từ API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Gửi token trong header
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (result.code === 200) {
          // Lưu kết quả nhận được từ API
          setUserData(result.result);
        } else {
          console.error("Error fetching data:", result.message);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="p-6">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-2">Thông tin Cá nhân</h1>
      
      {/* Khung thông tin người dùng */}
      <div className="max-h-screen flex justify-center items-center bg-gray-100 py-4 px-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg" // Thay bằng URL ảnh đại diện
              alt="User"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={userData.firstname}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={userData.lastname}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Your email
              </label>
              <input
                id="email"
                type="email"
                value={userData.email}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                value={userData.phonenum || "Not available"}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
                Date of Birth
              </label>
              <input
                id="dob"
                type="text"
                value={userData.dob || "Not available"}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <input
                id="gender"
                type="text"
                value={userData.gender || "Not available"}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;


// TEST GIAO DIỆN TĨNH
// import React, { useState } from "react";
// import { FaUserCircle, FaEdit } from "react-icons/fa";

// const Profile: React.FC = () => {
//   const [userData, setUserData] = useState<any>({
//     firstname: "Kevin",
//     lastname: "Fleming",
//     email: "jaskolski.brent@yahoo.com",
//     phonenum: "546-933-2772",
//     dob: "11-08-1995",
//     gender: "Male",
//   });

//   return (
//     <div className="p-6">
//       {/* Tiêu đề */}
//       <h1 className="text-2xl font-bold mb-2">Thông tin Cá nhân</h1>
      
//       {/* Khung thông tin người dùng */}
//       <div className="max-h-screen flex justify-center items-center bg-gray-100 py-4 px-4"> {/* Giảm py-8 thành py-4 để giảm khoảng cách */}
//         <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
//           {/* Avatar */}
//           <div className="flex justify-center mb-6">
//             <img
//               src="https://randomuser.me/api/portraits/men/1.jpg" // Thay bằng URL ảnh đại diện của người dùng nếu có
//               alt="User"
//               className="w-32 h-32 rounded-full border-4 border-blue-500"
//             />
//           </div>

//           {/* User Profile Form - 2 columns */}
//           <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {/* First Name */}
//             <div className="mb-4">
//               <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
//                 First Name
//               </label>
//               <input
//                 id="firstName"
//                 type="text"
//                 value={userData.firstname}
//                 readOnly
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Last Name */}
//             <div className="mb-4">
//               <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
//                 Last Name
//               </label>
//               <input
//                 id="lastName"
//                 type="text"
//                 value={userData.lastname}
//                 readOnly
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Email */}
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
//                 Your email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={userData.email}
//                 readOnly
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Phone Number */}
//             <div className="mb-4">
//               <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
//                 Phone Number
//               </label>
//               <input
//                 id="phoneNumber"
//                 type="text"
//                 value={userData.phonenum}
//                 readOnly
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Date of Birth */}
//             <div className="mb-4">
//               <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
//                 Date of Birth
//               </label>
//               <input
//                 id="dob"
//                 type="text"
//                 value={userData.dob}
//                 readOnly
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Gender */}
//             <div className="mb-4">
//               <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
//                 Gender
//               </label>
//               <input
//                 id="gender"
//                 type="text"
//                 value={userData.gender}
//                 readOnly
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Edit Button */}
//             <div className="flex justify-center mt-6 col-span-2">
//               <button
//                 type="button"
//                 className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
//               >
//                 <FaEdit className="inline mr-2" />
//                 Thay đổi
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
