export default function Loading() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black/50 backdrop-blur-sm pointer-events-none z-50 fixed top-0 left-0">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
