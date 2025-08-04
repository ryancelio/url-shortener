import RedirectNav from "../components/RedirectNav";

const RedirectPage = () => {
  return (
    <div className="min-h-screen w-full flex-col flex font-display bg-gradient-to-b from-blue-800 to-slate-800">
      <RedirectNav />
      <div className="grid place-content-center w-full grow text-white">
        AD HERE
      </div>
    </div>
  );
};

export default RedirectPage;
