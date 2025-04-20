import { useState, useRef, useEffect } from "react";
import { Bell, BellDot } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { API_ENDPOINTS } from "../constants/Api";

interface Notification {
  id: string;
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
  };
  totalElements: number;
  last: boolean;
}

const NotificationButton = () => {
  const [hasUnread, setHasUnread] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [localNotifications, setLocalNotifications] = useState<Notification[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);

  // Sử dụng useFetch hook với sắp xếp từ mới đến cũ
  const {
    data: apiResponse,
    error,
    loading,
    refresh,
  } = useFetch<NotificationApiResponse>(
    `${API_ENDPOINTS.NOTIFICATION}?sort=timestamp,desc`,
    {},
    60000 // 1 phút refresh một lần
  );

  // Xử lý dữ liệu khi API response thay đổi
  useEffect(() => {
    if (apiResponse?.content) {
      // Tạo bản sao và đảo ngược thứ tự nếu cần
      const sortedNotifications = [...apiResponse.content]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .map(notif => ({
          ...notif,
          read: localNotifications.some(n => n.id === notif.id && n.read) || false
        }));
      
      setLocalNotifications(sortedNotifications);
      checkUnreadStatus(sortedNotifications);
    }
  }, [apiResponse]);

  // Kiểm tra trạng thái đọc/chưa đọc
  const checkUnreadStatus = (notifications: Notification[]) => {
    setHasUnread(notifications.some(notif => !notif.read));
  };

  // Đánh dấu tất cả là đã đọc
  const markAllAsRead = () => {
    const updatedNotifications = localNotifications.map(notif => ({
      ...notif,
      read: true
    }));
    setLocalNotifications(updatedNotifications);
    setHasUnread(false);
  };

  // Đánh dấu một thông báo cụ thể là đã đọc
  const markAsRead = (id: string) => {
    const updatedNotifications = localNotifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setLocalNotifications(updatedNotifications);
    checkUnreadStatus(updatedNotifications);
  };

  // Xử lý click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
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
      markAllAsRead();
    }
  };

  // Định dạng thời gian thông báo
  const formatTime = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - notificationTime.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Vừa xong";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  };

  return (
    <div
      className="fixed z-50 top-4 right-10 md:bottom-6 md:right-24 lg:top-10 lg:right-6 xl:top-10 xl:right-25"
      ref={popupRef}
    >
      <button
        onClick={togglePopup}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
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
        {hasUnread && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Popup thông báo */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Thông báo {hasUnread && <span className="text-xs text-amber-500">({localNotifications.filter(n => !n.read).length} mới)</span>}
            </h3>
            <button 
              onClick={refresh}
              className="text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
            >
              Làm mới
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Đang tải thông báo...
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-500 dark:text-red-400">
                Lỗi khi tải thông báo: {error}
              </div>
            ) : localNotifications.length > 0 ? (
              localNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer
                    ${
                      !notification.read
                        ? "bg-amber-50 dark:bg-gray-700/70"
                        : ""
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {notification.name_device}
                      {!notification.read && (
                        <span className="ml-2 inline-block w-2 h-2 bg-amber-500 rounded-full"></span>
                      )}
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
              onClick={() => {
                refresh();
                markAllAsRead();
              }}
            >
              Đánh dấu tất cả đã đọc
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;