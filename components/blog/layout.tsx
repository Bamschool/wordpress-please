import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import Navbar from "./../DAEGARI";
import { getAllKoreansentencesForHome } from "../../lib/api";

type SeoProps = {
  title: string;
  metaDesc: string;
  fullHead: string;
  ogImage: string;
};

type LayoutProps = {
  preview: boolean;
  children: React.ReactNode;
  seo: SeoProps;
};

export default function Layout({ preview, children, seo }: LayoutProps) {
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
