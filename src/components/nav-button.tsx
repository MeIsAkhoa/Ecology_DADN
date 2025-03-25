import { Link, useLocation } from "react-router-dom";
import { cva } from "class-variance-authority";

// ✅ Định nghĩa class bằng class-variance-authority
export const nav_Button = cva(
  "flex items-center rounded-md px-4 py-2 transition duration-300 gap-2",
  {
    variants: {
      isActive: {
        true: "bg-blue-500 text-white font-bold",
        false: "bg-white text-black hover:bg-gray-200",
      },
      size: {
        large: "text-lg py-3 px-6",
        medium: "text-base py-2 px-4",
        small: "text-sm py-1 px-3",
      },
    },
    defaultVariants: {
      isActive: false,
      size: "medium",
    },
  }
);

// ✅ Định nghĩa type props
export type NavButtonProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

// ✅ Component dùng chung (không tách thành "chosen" & "unchosen" nữa)
export const NavButton = ({ to, icon, label, onClick }: NavButtonProps) => {
  const location = useLocation();
  const isActive = to ? location.pathname === to : false; // Kiểm tra active

  // ✅ Nếu có `onClick`, dùng `<button>`, nếu không thì dùng `<Link>`
  return onClick ? (
    <button className={nav_Button({ isActive })} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  ) : (
    <Link to={to || "#"} className={nav_Button({ isActive })}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};
