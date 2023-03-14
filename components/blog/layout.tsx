import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import Navbar from "./../DAEGARI";
import { getAllKoreansentencesForHome } from "../../lib/api";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
