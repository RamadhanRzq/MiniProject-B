import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
