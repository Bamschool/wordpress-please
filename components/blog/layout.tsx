import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import Navbar from "./../DAEGARI";
export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
