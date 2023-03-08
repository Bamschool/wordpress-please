import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import Navbar from "./../DAEGARI";
import { getAllKoreansentencesForHome } from "../../lib/api";

export default function Layout({ preview, children, seo }) {
  return (
    <>
      <Meta seo={seo} />
      <div className="min-h-screen">
        {/* <Alert preview={preview} /> */}
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
