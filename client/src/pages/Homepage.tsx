import { useEffect, useState } from "react";
import RedirectForm from "../components/RedirectForm";
import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL;

const Homepage = () => {
  const [redirectCount, setRedirectCount] = useState(0);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await axios.get(`${API_URL}/api/count/urls`);
      setRedirectCount(response.data);
    };

    fetchLinks();
  }, []);

  return (
    <div className="grow w-screen flex flex-col py-12 md:grid md:place-items-center bg-radial from-blue-900 to to-blue-800">
      <div className="md:min-w-fit md:min-h-fit flex flex-col gap-12 md:w-[55%] md:h-[55%] border-blue-950/30 md:border-2 md:py-8 md:pt-16 md:shadow-2xl md:backdrop-blur-md">
        <div className="text-center max-w-full max-h-full">
          <h1 className="text-5xl md:text-8xl text-white font-display text-shadow-black text-shadow-sm">
            Link Shortener
          </h1>
        </div>
        <div className="text-center w-full mt-auto mb-auto max-w-full max-h-full">
          <RedirectForm />
        </div>
        <div className="w-full text-center text-white/70 hover:text-white text-md max-w-full max-h-full">
          Number of shortened links: {redirectCount}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
