import BubbleIcon from "../components/BubbleIcon";

export default function Home() {
  return (
    <div className="lg:ml-64 items-center justify-center h-screen bg-gray-100">
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Nội dung chính */}
        <div className="relative z-1 text-center px-6 py-12 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
            🌿 Hệ Thống Quản Lý Môi Trường
          </h1>
          <p className="mt-4 text-2xl text-white max-w-2xl mx-auto">
            Giám sát và điều khiển hệ thống thông minh trong nhà kính.
          </p>
        </div>

        {/* Bubble Icons ở góc dưới bên phải */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <BubbleIcon 
            type="phone" 
            onClick={() => window.open('tel:+123456789')}
            size="md"
          />
          <BubbleIcon 
            type="zalo" 
            href="https://zalo.me/yournumber"
            size="md"
          />
          <BubbleIcon 
            type="tiktok" 
            href="https://tiktok.com/yourprofile"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}