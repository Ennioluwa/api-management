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
      <div className=" w-full h-screen overflow-clip">
        <Navbar />
        <div className="flex mt-16 bg-[#f1f1f1] w-screen h-full overflow-clip relative">
          <Sidebar />
          <div className="md:ml-[240px] grow h-[calc(100vh-4rem)] overflow-y-auto overflow-x-clip py-6 px-5 lg:px-10">
            {children}
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
