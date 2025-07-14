import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export const dynamic = "force-dynamic"; //Not caching admin page
//force all admin page to be dynamic

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="w-[90%] xl:w-[70%] mx-auto my-6 flex-1">{children}</div>
      <Footer />
    </>
  );
}
