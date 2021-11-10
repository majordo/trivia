import express from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";
// import session from "express-session";
import path from "path";

const app = express();

// const oneDay = 1000 * 60 * 60 * 24;
// app.use(sessions({
//   secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//   saveUninitialized:true,
//   cookie: { maxAge: oneDay },
//   resave: false
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = 4000;

routes(app);

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.listen(port, () => {
  console.log(`Trivia app listening at http://localhost:${port}`);
});
