import { Link, useLocation } from "react-router-dom";
import { cva } from "class-variance-authority";

// ✅ Định nghĩa class bằng class-variance-authority
export const nav_Button = cva(
  "flex items-center rounded-md px-4 py-2 transition duration-300 gap-2 dark:bg-gray-800 dark:text-white",
  {
    variants: {
      isActive: {
        true: "bg-blue-500 text-white font-bold dark:bg-green-600",
        false: "bg-white text-black hover:bg-gray-200 dark:hover:bg-gray-700",
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
  icon: React.ReactNode;
  label: string;
} & ({
  to: string
} | {
  onClick: () => void;
});

// ✅ Component dùng chung (không tách thành "chosen" & "unchosen" nữa)
export const NavButton = ({ icon, label, ...props }: NavButtonProps) => {
  const location = useLocation();
  const isActive = 'to' in props ? location.pathname === props.to : false;

  return 'onClick' in props ? (
    <button className={nav_Button({ isActive })} onClick={props.onClick}>
      {icon}
      <span>{label}</span>
    </button>
  ) : (
    <Link to={props.to} className={nav_Button({ isActive })}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};
