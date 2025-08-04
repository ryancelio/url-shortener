import express from "express";
import { createRedirect, deleteRedirect, getAllUrls, GetUrlByID, GetUrlCount, updateRedirect } from "../../controllers/urlController.js";


const apiRouter = express.Router();

// Read
apiRouter.get("/urls/", getAllUrls);
apiRouter.get("/urls/:id",GetUrlByID);
apiRouter.get("/count/urls",GetUrlCount);

// Create
apiRouter.post("/urls/", createRedirect)


// Update
apiRouter.put("/urls/:id", updateRedirect);

// Delete
apiRouter.delete("/urls/:id", deleteRedirect);

export default apiRouter;