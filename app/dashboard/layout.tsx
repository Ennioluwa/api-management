import Navbar from "./_components/Navbar";
import "../globals.css";
import Sidebar from "./_components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" w-full h-screen overflow-hidden">
      <Navbar />
      <div className="flex pt-20 bg-[#f1f1f1] w-screen h-full overflow-hidden">
        <Sidebar />
        <div className="md:ml-[240px] grow w-full h-full overflow-auto py-5 px-5 lg:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
