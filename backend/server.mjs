import express from "express";
import dotenv from "dotenv";
import {createUserRoute, loginRoute, adminLoginRoute, adminBanUserRoute} from "./routes.mjs";
import {postCreationRoute} from './createpostroute.mjs';
import {allPostsRoute} from "./viewAllPosts.mjs"
//import {forgotPasswordRoute} from "./forgotPassword.mjs";
import cors from "cors";



dotenv.config();

const app = express();

app.use(express.json()); //middleware to read req.body
app.use(cors());

app.post("/register", createUserRoute);
app.post("/login", loginRoute);
app.post("/admin", adminLoginRoute);
app.post("/ban", adminBanUserRoute);
app.post("/post_creation",postCreationRoute);
app.get("/home", allPostsRoute);
app.post("/")
//app.post("/forgot_password_page",forgotPasswordRoute);


const PORT = process.env.PORT || 4000; // Default port 5173
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});