import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

//test the initial api 
// app.get("/home", (req, res)=>{
//   return res.status(200).json({
//     message: "i am comming from backend",
//     success: true
//   })
// });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const corsOption = {
  origin: "http//localhost:5173",
  Credentials: true,
};
app.use(cors(corsOption));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on server https://localhost${PORT}`);//create server 
});
