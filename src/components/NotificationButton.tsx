import { useState, useRef, useEffect } from "react";
import { Bell, BellDot } from "lucide-react";

const NotificationButton = () => {
  const [hasUnread, setHasUnread] = useState(true); // Trạng thái thông báo chưa đọc
  const [isOpen, setIsOpen] = useState(false); // Trạng thái popup
  const [isHovered, setIsHovered] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Đóng popup khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dữ liệu thông báo mẫu
  const notifications = [
    {
      id: 1,
      title: "Hệ thống cập nhật",
      message: "Phiên bản mới 2.0 đã sẵn sàng",
      time: "10 phút trước",
      read: false
    },
    {
      id: 2,
      title: "Cảnh báo nhiệt độ",
      message: "Nhiệt độ vượt ngưỡng tại khu vực A",
      time: "1 giờ trước",
      read: true
    },
    {
      id: 3,
      title: "Bảo trì hệ thống",
      message: "Hệ thống sẽ bảo trì vào 02:00 - 04:00",
      time: "1 ngày trước",
      read: true
    }
  ];

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen && hasUnread) {
      setHasUnread(false); // Đánh dấu đã đọc khi mở popup
    }
  };

  return (
    <div 
      className="fixed z-50 
        top-4 right-10  
        md:bottom-6 md:right-24 
        lg:top-10 lg:right-6
        xl:top-10 xl:right-25
        rounded-full
        transition-all duration-300"
      ref={popupRef}
    >
      <button
        onClick={togglePopup}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-12 h-12 z-0 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
          ${
            isOpen
              ? "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
              : "bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
          }
          ${isHovered ? "scale-110 shadow-xl" : "scale-100"}`}
        aria-label="Notifications"
      >
        {hasUnread ? (
          <BellDot className="w-5 h-5 text-amber-500 dark:text-amber-400" />
        ) : (
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Tooltip */}
      <div
        className={`absolute right-14 -top-2
          bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md 
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
          hidden md:block
        `}
      >
        Thông báo
      </div>

      {/* Popup thông báo */}
      {isOpen && (
        <div className="absolute right-10 top-5  md:bottom-16 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white">Thông báo</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                    ${!notification.read ? "bg-amber-50 dark:bg-amber-900/30" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {notification.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Không có thông báo mới
              </div>
            )}
          </div>
          <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
            <button className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
              Xem tất cả
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;