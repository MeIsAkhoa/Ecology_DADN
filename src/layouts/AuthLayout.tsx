import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center  ">
      <div className="w-full  p-6 rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;