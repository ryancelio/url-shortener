import { useState } from "react";
import { createRedirect } from "../helpers/apiMiddleware";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const errorPopup = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

const RedirectForm = () => {
  const [newUrl, setNewUrl] = useState("");
  const navigate = useNavigate();

  const formatAndValidateUrl = (input: string) => {
    let url = input.trim();

    // Add protocol if missing
    if (!/^https?:\/\//i.test(url)) {
      url = "http://" + url;
    }

    // Extract the domain part for validation (remove protocol and www)
    let domain;
    try {
      const parsed = new URL(url);
      domain = parsed.hostname.replace(/^www\./i, "");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Invalid URL structure
      return null;
    }

    // Regex to check presence of domain (e.g., example.com, api.example.org)
    const domainPattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!domainPattern.test(domain)) {
      return null; // Invalid: does not contain a valid domain/TLD
    }

    // Optionally, return the formatted URL
    return url;
  };

  const submitOnClick = (event: React.FormEvent) => {
    event.preventDefault();

    const formattedUrl = formatAndValidateUrl(newUrl);
    const createAndNavigate = async (formattedUrl: string) => {
      await createRedirect(formattedUrl);
      navigate("/links");
    };
    if (formattedUrl) {
      createAndNavigate(formattedUrl);
    } else {
      errorPopup("Invalid Url");
    }
  };

  return (
    <section className="h-full min-h-fit min-w-fit w-full">
      <form action="">
        <input
          value={newUrl}
          onChange={(event) => {
            setNewUrl(event.target.value);
          }}
          type="text"
          placeholder="https://"
          className="text-lg p-2 w-1/2 rounded-r-none rounded-xl bg-gradient-to-l to-slate-800/85 border-2 border-r-0 border-white/70 via-purple-950 from-blue-900 bg-linear-to-r backdrop-opacity-80 text-white h-16"
        />
        <button
          onSubmit={submitOnClick}
          onClick={submitOnClick}
          type="submit"
          className="bg-white active:bg-white/70 p-5 h-full rounded-xl rounded-l-none text-blue-900 font-bold cursor-pointer hover:bg-gray-300"
        >
          Shorten
        </button>
      </form>
    </section>
  );
};

export default RedirectForm;
