import mongoose, { Schema } from "mongoose";
import moment from "moment";
import bcrypt from "bcrypt";

const DB_URI = "mongodb://localhost:27017/trivia";
const dbConnection = mongoose.createConnection(DB_URI, {
  //   useFindAndModify: false,
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
});

dbConnection
  .on("connecting", () => console.log("connecting to triviaDB ..."))
  .on("connected", () => console.log("triviaDB connected..."))
  .on("error", (err) => console.error("triviaDB connection error:", err))
  .once("open", () => {
    console.log(
      moment().format("YYYY/MM/DD HH:mm:ss"),
      "triviaDB connection opened! DONE!"
    );
  });

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  score: { type: Number, required: true, index: true },
  creation: { type: Date, default: Date.now, index: true },
});

const SALT_WORK_FACTOR = 10;

userSchema.pre("save", function (next) {
  const user = this;

  // next(new Error("error!"));
  if (!user.password) throw new Error("user::preSave -> PASSWORD missing!");

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const userModel = dbConnection.model("user", userSchema);
export { dbConnection, userModel };
