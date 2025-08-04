import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRedirect } from "../helpers/apiMiddleware";

const TIMER_MAX = 5;

export default function RedirectNav() {
  const { id } = useParams();
  const [timer, setTimer] = useState(TIMER_MAX);
  const [isValidLink, setValidLink] = useState(true);
  const [redirectLink, setRedirectLink] = useState("");

  useEffect(() => {
    const apiResponse = async () => {
      if (!id || id === "") {
        return;
      }
      const redirect = await getRedirect(id);
      setTimeout(() => {
        // Had response
        if (redirect) {
          setRedirectLink(redirect.url);
        } else {
          setValidLink(false);
        }
      }, 5000);
    };

    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      } else {
        clearInterval(countdown);
      }
    }, 1000);

    apiResponse();
    return () => clearInterval(countdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectOnClick = () => {
    if (isValidLink && timer <= 0) {
      window.location.href = redirectLink;
    }
  };

  return (
    <div className="w-screen p-0 h-24 flex bg-transparent border-b-2 shadow-blue-900 shadow-md">
      {/* Left */}
      <Link to={"/"} className="flex items-center w-1/6 ml-6">
        <img src="/vite.svg" alt="Logo" className="h-3/4" />
        <h1 className="ml-4 text-white text-xl font-bold font-roboto">
          Link Shortener
        </h1>
      </Link>
      <div className="ml-auto mr-10 grid place-items-center">
        <button
          type="button"
          onClick={redirectOnClick}
          className={`${
            isValidLink
              ? // Valid Link
                "hover:text-blue-950 active:text-black from-blue-500 to-blue-600 cursor-pointer"
              : // Invalid Link
                "from-red-600 to-red-700 hover:text-red-950 cursor-not-allowed"
            // Always
          } border-2 hover:shadow-lg border-black text-white font-bold px-6 p-4 rounded-2xl bg-radial`}
        >
          {
            // Timer counts down, the link being valid or not, if valid, shows continue,
            // else, shows Invalid link
            timer > 0
              ? `Please wait ${timer} second${timer == 1 ? "" : "s"}`
              : isValidLink
              ? "Continue"
              : "Invalid Link"
          }
        </button>
      </div>
    </div>
  );
}
