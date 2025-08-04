import mongoose from "mongoose";
import { Redirect } from "../types/urls.js";

const MONGO_URI = process.env.MONGO_URI ?? "localhost:27017";
const DATABASE = "idUrl"

const urlSchema = new mongoose.Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
})

export const mongConnection = async () =>{
  const databaseURI = `mongodb://${MONGO_URI}/${DATABASE}`
  try{
    await mongoose.connect(databaseURI)
    console.log("Connected to database "+ databaseURI)
  }
  catch(e) {
    console.error(`Unnable to connect to database with uri: ${databaseURI}`,e)
  }
}

export const UrlModel = mongoose.model("Url", urlSchema)

// const test = new Url({id: 2, url: "localhost:5000"})

// const save = async () =>{
//   await test.save();
// }

// save();

export const dbGetAllUrls = () => {
    return UrlModel.find();
}

export const dbGetUrlByID = (id: string) => {
  return UrlModel.findOne({id: id}) 
}

export const dbGetUrlCount = () => {
  return UrlModel.countDocuments();
}

export const dbCreateUrl = async (redirect: Redirect) => {
  const newRedirect = new UrlModel(redirect);
  await newRedirect.save();
}

export const dbUpdateUrl = async (redirect: Redirect) => {
  return UrlModel.updateOne({id: redirect.id}, {id: redirect.id, url: redirect.url})
}

export const dbDeleteUrl = async (redirectId: string) => {
  return UrlModel.deleteOne({id:redirectId})
}