import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full">
      <div className="hidden h-full md:flex md:flex-col fixed md:inset-y-0 md:w-72 z-[80] bg-gray-900">
        <Sidebar />
      </div>

      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
