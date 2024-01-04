import Navbar from "./_components/Navbar";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className=" pt-20 ">{children}</div>
    </div>
  );
}
