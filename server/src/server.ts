import express from "express";
import apiRouter from "../routes/api/url.js"
import { mongConnection } from "../middleware/db.js";
import cors from "cors"
import errorHandler from "../middleware/error.js"
import notFoundHandler from "../middleware/notFound.js"

const corsOptions = {
  origin: ["http://localhost:5173"]
}

const PORT = process.env.PORT ?? 5050;


const app = express();
mongConnection();

app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/",apiRouter)
// app.use("/", router)

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
