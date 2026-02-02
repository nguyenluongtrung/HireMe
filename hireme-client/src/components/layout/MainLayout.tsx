import Sidebar from "./Sidebar";
import DesktopSidebar from "./Sidebar/DesktopSidebar";
import MobileSidebar from "./Sidebar/MobileSidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc]">
      {/* Desktop Sidebar */}
      <DesktopSidebar>
        <Sidebar />
      </DesktopSidebar>

      <div className="flex flex-1 flex-col h-full overflow-hidden">
        {/* Mobile Sidebar */}
        <MobileSidebar>
          <Sidebar className="!w-full !rounded-none" />
        </MobileSidebar>
        <main
          className={`flex-1 overflow-y-auto no-scrollbar lg:custom-scrollbar`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
