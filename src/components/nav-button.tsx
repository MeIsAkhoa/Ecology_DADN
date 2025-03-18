import { Link, useLocation } from "react-router-dom";
import { cva } from "class-variance-authority";

export const nav_Button = cva(
  "flex items-center rounded-md px-4 py-2 transition duration-300 gap-2",
  {
    variants: {
      variant: {
        chosen: "bg-blue-500 text-white font-bold",
        unchosen: "bg-white text-black hover:bg-gray-200",
      },
      size: {
        large: "text-lg py-3 px-6",
        medium: "text-base py-2 px-4",
        small: "text-sm py-1 px-3",
      },
    },
    defaultVariants: {
      variant: "unchosen",
      size: "medium",
    },
  }
);

// ✅ Định nghĩa type props
export type NavButtonProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

// ✅ Component button tự động nhận trạng thái "chosen"
export const NavButtonUnchosen = ({ to, icon, label }: NavButtonProps) => {
  const location = useLocation(); // Lấy URL hiện tại
  const isActive = location.pathname === to; // Kiểm tra nút nào đang active

  return (
    <Link to={to} className={nav_Button({ variant: isActive ? "chosen" : "unchosen" })}>
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </Link>
  );
};
