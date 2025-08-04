import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteRedirect,
  getRedirect,
  updateRedirect,
} from "../helpers/apiMiddleware";
import { Bounce, toast } from "react-toastify";
import type { Redirect } from "../../../server/types/urls";

const errorPopup = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

const RedirectEditPage = () => {
  const navigate = useNavigate();

  const [paramId] = useState(useParams().id);

  const [prevRedirect, setPrevRedirect] = useState<Redirect>({
    id: "",
    url: "",
  });
  const [newRedirect, setNewRedirect] = useState<Redirect>(prevRedirect);

  useEffect(() => {
    const awaitRedirect = async () => {
      if (paramId) {
        const response = await getRedirect(paramId);
        if (response) {
          setPrevRedirect(response);
          setNewRedirect(response);
        }
      } else {
        errorPopup("Invalid ID");
      }
    };
    awaitRedirect();
  }, [paramId]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const id = newRedirect?.id ?? null;
    const url = newRedirect?.url ?? null;

    if (!id || !url) {
      return console.error("ERRO");
    }

    await updateRedirect({ id, url });
    navigate(-1);
  };

  const deleteHandler = () => {
    // console.log("DELETED: ");
    // console.log(prevRedirect);
    // console.log("NEW");
    // console.log(newRedirect);

    if (
      window.confirm("Are you sure you want to delete this item permanently?")
    ) {
      // console.log("DELETED");
      const deleteRedir = async () => {
        await deleteRedirect(prevRedirect);
        navigate(-1);
      };
      deleteRedir();
    }
  };

  return (
    <section className="inset-0 z-20 fixed items-center justify-center flex">
      {/* Background */}
      <div
        className="backdrop-blur-sm absolute inset-0 z-20"
        onClick={() => navigate("/links/")}
      ></div>
      {/* Content Div */}
      <div className="relative z-30 mx-auto my-auto w-1/2 p-5 bg-gray-300 border-2 border-black/50 shadow-xl shadow-black/50 flex flex-col gap-16 items-center h-fit">
        <div
          className="absolute right-0 p-5 top-0 text-2xl cursor-pointer hover:text-black/60"
          onClick={() => navigate("/links/")}
        >
          X
        </div>
        <div className="text-3xl pt-4 text-black/80">Edit Redirect</div>
        <div className="flex flex-col justify-center w-full mt-auto mb-auto items-center gap-4 text-center">
          <label htmlFor="ID" className="text-2xl">
            ID
          </label>
          <input
            type="text"
            id="ID"
            value={newRedirect.id}
            onChange={(e) =>
              setNewRedirect((currValue) => {
                return { ...currValue, id: e.target.value };
              })
            }
            disabled
            className="border-b-2 text-center px-10 text-xl w-fit text-black/50 hover:text-black active:text-black border-black/50 hover:border-black"
          />
        </div>
        <form>
          <div className="flex flex-col justify-center mt-auto mb-auto w-full items-center gap-4 text-center">
            <label htmlFor="URL" className="text-2xl">
              URL
            </label>
            <input
              type="text"
              id="URL"
              placeholder="http://"
              value={newRedirect.url}
              onChange={(e) =>
                setNewRedirect((currValue) => {
                  return { ...currValue, url: e.target.value };
                })
              }
              className="border-b-2 text-center px-10 text-xl w-fit text-black/50 hover:text-black active:text-black border-black/50 hover:border-black"
            />
          </div>

          <div className="flex gap-24 pt-8">
            <button
              onSubmit={submitHandler}
              onClick={submitHandler}
              type="submit"
              className="border-2 p-4 rounded-lg px-8 cursor-pointer hover:brightness-90 bg-green-500 shadow-sm shadow-black/35 hover:shadow-black/90"
            >
              Save
            </button>
            <button
              onClick={deleteHandler}
              type="button"
              className="border-2 p-4 rounded-lg px-8 cursor-pointer hover:brightness-90 bg-red-500 shadow-sm shadow-black/35 hover:shadow-black/90"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RedirectEditPage;
