import { useState, useRef, useEffect } from "react";
import { Bell, BellDot } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { API_ENDPOINTS } from "../constants/Api";

interface Notification {
  name_device: string;
  message: string;
  timestamp: string;
  read?: boolean;
}

interface NotificationApiResponse {
  content: Notification[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    // ... các trường khác
  };
  // ... các trường phân trang khác
}

const NotificationButton = () => {
  const [hasUnread, setHasUnread] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Sử dụng useFetch hook
  const {
    data: apiResponse,
    error,
    loading,
    refresh,
  } = useFetch<NotificationApiResponse>(
    `${API_ENDPOINTS.NOTIFICATION}`,
    {},
    60000 // 1 phút refresh một lần
  );

  // Format notifications từ API response
  const notifications =
    apiResponse?.content?.map((notif) => ({
      ...notif,
      read: false, // Mặc định là chưa đọc
    })) || [];

  // Kiểm tra thông báo chưa đọc khi dữ liệu thay đổi
  useEffect(() => {
    if (apiResponse?.content) {
      setHasUnread(notifications.some((notif) => !notif.read));
    }
  }, [apiResponse]);

  // Đánh dấu tất cả là đã đọc
  const markAsRead = () => {
    setHasUnread(false);
  };

  // Xử lý click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePopup = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (newState && hasUnread) {
      markAsRead();
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - notificationTime.getTime()) / 60000
    );

    if (diffInMinutes < 1) return "Vừa xong";
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
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

      {/* Popup thông báo */}
      {isOpen && (
        <div className="absolute right-10 top-5 md:bottom-16 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Thông báo
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Đang tải...
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-500 dark:text-red-400">
                {error}
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={`${notification.name_device}-${notification.timestamp}`}
                  className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                    ${
                      !notification.read
                        ? "bg-amber-50 dark:bg-blue-300/30"
                        : ""
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {notification.name_device}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(notification.timestamp)}
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
            <button
              className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
              onClick={refresh}
            >
              Tải lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
