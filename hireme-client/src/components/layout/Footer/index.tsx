export default function Footer() {
  return (
    <footer className="bg-white text-black p-4 flex justify-center items-center shadow-md">
        <p className="text-sm text-gray-800">
            © {new Date().getFullYear()} Nguyễn Lương Trung
        </p>
    </footer>
  );
}
