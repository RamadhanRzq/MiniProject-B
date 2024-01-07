import Header from "./Header";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="w-full">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
