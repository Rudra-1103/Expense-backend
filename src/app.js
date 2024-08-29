import express, { json } from 'express';
import cors  from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors(
    {origin: process.env.ORIGIN, credentials : true}
));

app.use(express.json({limit : '16kb'}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from "./routes/user.routes.js"
import categoryRouter from "./routes/category.routes.js";

app.use("/api/v1/users",userRouter)
app.use("/api/v1/categories",categoryRouter)


export { app}
