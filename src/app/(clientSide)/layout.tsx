import { HeadLink, Nav, NavLink } from "@/components/Nav";
import { AlignJustify } from "lucide-react";

export const dynamic = "force-dynamic"; //Not caching admin page
//force all admin page to be dynamic

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <div className="flex justify-end space-x-5">
          <HeadLink href={"/sign-up"}>Contact Us</HeadLink>
          <HeadLink href={"/sign-up"}>Login</HeadLink>
        </div>
        <div className="flex justify-between items-center ">
          <h1 className="text-green-600 text-4xl font-bold">Waggle</h1>
          <div className="hidden lg:flex space-x-2">
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>Products</NavLink>
            <NavLink href={"/orders"}>My Orders</NavLink>
          </div>

          <AlignJustify className="text-black lg:hidden" />
        </div>
      </Nav>
      <div className="w-[90%] xl:w-[70%] mx-auto my-6">{children}</div>
    </>
  );
}
