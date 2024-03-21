import Navbar from "./_components/Navbar";
import "../globals.css";
import Sidebar from "./_components/Sidebar";
import Authenticated from "./_components/Authenticated";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticated>
      <div className=" w-full h-dvh overflow-clip">
        <Navbar />
        <div className="flex pt-16 bg-[#f1f1f1] w-screen h-full overflow-clip relative">
          <Sidebar />
          <div className="md:ml-[240px] grow overflow-y-auto overflow-x-clip py-6 px-5 lg:px-0">
            {children}
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
