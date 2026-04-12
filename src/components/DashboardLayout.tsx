import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}