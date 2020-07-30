require('./models/Track')

const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  authRoutes = require("./routes/authRoutes"),
  trackRoutes = require("./routes/trackRoutes"),
  bodyParser = require("body-parser"),
  requireAuth = require("./middlewares/requireAuth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(
  "mongodb+srv://Sai_99:shirdisai@cluster0-4bk2v.mongodb.net/NativeLocationFinderDB",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connection established");
});
mongoose.connection.on("error", (err) => {
  console.error("Connection failed");
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("server started");
});
