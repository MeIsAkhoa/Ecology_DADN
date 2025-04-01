import React from "react";
import { IconType } from "react-icons";
import { FaTiktok, FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

// Định nghĩa các loại icon có thể sử dụng
export type BubbleIconType = "tiktok" | "zalo" | "phone";

// Props cho component
interface BubbleIconProps {
  type: BubbleIconType;
  href?: string; // Link khi click
  onClick?: () => void; // Hoặc hàm xử lý khi click
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Map các icon tương ứng
const iconMap: Record<BubbleIconType, IconType> = {
  tiktok: FaTiktok,
  zalo: SiZalo,
  phone: FaPhoneAlt,
};

// Map màu sắc cho từng icon
const colorMap: Record<BubbleIconType, string> = {
  tiktok: "bg-black text-white",
  zalo: "bg-blue-500 text-white",
  phone: "bg-green-500 text-white",
};

// Map kích thước
const sizeMap = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};

const BubbleIcon: React.FC<BubbleIconProps> = ({
  type,
  href,
  onClick,
  size = "md",
  className = "",
}) => {
  const Icon = iconMap[type];
  const colorClass = colorMap[type];
  const sizeClass = sizeMap[size];

  const handleClick = (e: React.MouseEvent) => {
    if (!href && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 ${colorClass} ${sizeClass} ${className}`}
      aria-label={type}
    >
      <Icon className="text-current" />
    </a>
  );
};

export default BubbleIcon;