import { useState, useRef, useEffect } from "react";
import { Bell, BellDot } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationButton = () => {
  const [hasUnread, setHasUnread] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
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

  // Hàm format thời gian
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  };

  // Gọi API để lấy danh sách thông báo
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch("http://localhost:8080/notification/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        if (data.code === 200 && data.result?.content) {
          // Sắp xếp thông báo theo timestamp giảm dần (gần nhất trước)
          const sortedContent = data.result.content.sort(
            (a: any, b: any) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );

          const formattedNotifications = sortedContent.map(
            (item: any, index: number) => ({
              id: index + 1,
              title: `Cảnh báo: ${item.name_device}`,
              message: item.message,
              time: formatTime(item.timestamp),
              read: false,
            })
          );

          setNotifications(formattedNotifications);
          setHasUnread(formattedNotifications.some((n: Notification) => !n.read));
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen && hasUnread) {
      setHasUnread(false);
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    }
  };

  return (
    <div
      className="fixed z-50 
        top-4 right-10  
        md:bottom-6  
        lg:top-10 
        xl:top-10 
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
        <div className="absolute right-10 top-5 md:bottom-16 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
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