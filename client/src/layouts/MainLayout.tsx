import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen flex-col flex font-display bg-gradient-to-b from-blue-800 to-slate-800">
        <ToastContainer />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
