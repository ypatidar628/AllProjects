import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
const app = express();

import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import cors from "cors"
import brandRoutes from "./routes/brandRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(cors);

app.use(session({secret:'mysecrettkey'}))
// Enable CORS for your frontend URL
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from Vite frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies or authorization headers
  })
);



app.use("/user",userRoute);
app.use("/product",productRoute);
app.use("/category",categoryRoute);
app.use("/brand",brandRoutes);
app.use("/cart",cartRoutes)

app.listen(8989,()=>{
  console.log("Server Invoked : ")
})
