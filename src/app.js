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
import expenseRouter from "./routes/expense.routes.js"
import mongoose from 'mongoose';
import dotenv from "dotenv"
app.use("/api/v1/users",userRouter)
app.use("/api/v1/categories",categoryRouter)
app.use("/api/v1/expenses",expenseRouter)


export { app}


dotenv.config({
    path: "./.env",
})



if (process.env.NODE_ENV === "test") {

  console.log("starting testing");
  

  mongoose.connect(`${process.env.MONGODB_URL}/test-database?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));  
}

