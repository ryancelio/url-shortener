import { useEffect, useState } from "react";
import type { Redirect } from "../../../server/types/urls";
import LinkCard from "../components/LinkCard";
import Spinner from "../components/Spinner";
import { getAllRedirects } from "../helpers/apiMiddleware";
import { Outlet, useLocation } from "react-router-dom";

const Links = () => {
  const [responseArray, setResponseArray] = useState<Redirect[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isFetchError, setFetchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const location = useLocation();

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await getAllRedirects(setErrorMessage, setFetchError);
      if (response) {
        setResponseArray(response);
        setLoading(false);
      }
    };

    fetchLinks();
  }, [location]);

  return (
    <>
      <Outlet />
      <div className="z-10 w-screen grid grid-cols-6 overflow-y-auto py-5 px-0 gap-3 scroll-auto">
        {isLoading ? (
          <div className="w-full h-full items-center text-center grid place-items-center place-self-center">
            <Spinner errorMessage={errorMessage} isError={isFetchError} />
          </div>
        ) : (
          responseArray.map((response) => (
            <LinkCard key={response.id} redirect={response} />
          ))
        )}
      </div>
    </>
  );
};

export default Links;
