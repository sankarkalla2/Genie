import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar";
import { apiLimitCount } from "@/lib/api-limit";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimit = await apiLimitCount();
  console.log(apiLimit)
  return (
    <div className="relative h-full">
      <div className="hidden h-full md:flex md:flex-col fixed md:inset-y-0 md:w-72 bg-gray-900">
        <Sidebar apiLimit={apiLimit} />
      </div>

      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
