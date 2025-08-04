import type { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import type { Redirect } from "../../../server/types/urls";

const API_URL: string = import.meta.env.VITE_API_URL;

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
const successPopup = (successMessage: string) => {
  toast.success(successMessage, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

const getAllRedirects = async (
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setFetchError: Dispatch<SetStateAction<boolean>>
) => {
  const response = await axios.get(`${API_URL}/api/urls`).catch((error) => {
    setFetchError(true);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setErrorMessage(error.response.data.Message);
      console.error(error.response);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      setErrorMessage("Server failed to respond");
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      setErrorMessage("Error" + error.message);
      console.error("Error", error.message);
    }
  });
  if (response) {
    return response.data;
  }
};

const getRedirect = async (id: string) => {
  const response = await axios
    .get(`${API_URL}/api/urls/${id}`)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorPopup(error.response.data.Message);
        console.error(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorPopup("Server failed to respond");
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        errorPopup("Error" + error.message);
        console.error("Error", error.message);
      }
    });

  if (response) {
    return response.data;
  }
};

const createRedirect = async (newUrl: string) => {
  const response = await axios
    .post(`${API_URL}/api/urls/`, JSON.stringify({ url: newUrl }), {
      headers: { "Content-Type": "application/json" },
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorPopup(error.response.data.Message);
        console.error(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorPopup("Server failed to respond");
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        errorPopup("Error" + error.message);
        console.error("Error", error.message);
      }
    });
  if (response) {
    successPopup("Redirect created successfully!");
  }
};

const updateRedirect = async (redirect: Redirect) => {
  console.log("apiMiddleware: " + redirect.id + redirect.url);

  const response = await axios
    .put(`${API_URL}/api/urls/${redirect.id}`, JSON.stringify(redirect), {
      headers: { "Content-Type": "application/json" },
    })
    .catch((error) => {
      if (error.response) {
        errorPopup(error.response.data.Message);
        console.error(error.response);
      } else if (error.request) {
        errorPopup("Server Failed to Respond");
        console.error(error.request);
      } else {
        errorPopup("Error" + error.message);
        console.error("Error", error.message);
      }
    });
  if (response) {
    successPopup("Redirect created successfully");
  }
};

const deleteRedirect = async (redirect: Redirect) => {
  console.log("deleteRedirect middleware: " + redirect.id + redirect.url);

  const response = await axios
    .delete(`${API_URL}/api/urls/${redirect.id}`)
    .catch((error) => {
      if (error.response) {
        errorPopup(error.response.data.Message);
        console.log("HAD RESPONSE");
        console.error(error.response);
      } else if (error.request) {
        console.log("NO RESPONSE");
        errorPopup("Server Failed to Respond");
        console.error(error.request);
      } else {
        errorPopup("Error" + error.message);
        console.error("Error", error.message);
      }
    });

  if (response) {
    successPopup(`Redirect with id: ${redirect.id} Deleted.`);
  }
};

export {
  getAllRedirects,
  getRedirect,
  createRedirect,
  updateRedirect,
  deleteRedirect,
};
