import Navbar from "./_components/Navbar";
import "../globals.css";
import Container from "../(auth)/_components/Container";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-4rem)] mt-[4rem]">
      <div className=" h-full overflow-auto">
        <Navbar />
        <div className="">{children}</div>
      </div>
    </div>
  );
}
