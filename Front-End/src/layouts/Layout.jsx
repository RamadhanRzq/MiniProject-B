import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="w-full">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
