export default function Home() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Nội dung chính */}
      <div className="relative z-10 text-center px-6 py-12 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
          🌿 Hệ Thống Quản Lý Môi Trường
        </h1>
        <p className="mt-4 text-2xl text-white max-w-2xl mx-auto">
          Giám sát và điều khiển hệ thống thông minh để bảo vệ môi trường.
        </p>
      </div>
    </div>
  );
}
