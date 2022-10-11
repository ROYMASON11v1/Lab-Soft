const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require('hbs');
const indexRouter = require("./routes/index.routes");
const usersRouter = require("./routes/users.routes");
const rootRouter = require("./routes/root.routes");
//const administradorRouter = require('./routes/administrador');
const con = require("./conn/conn");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "ABCDefg",
    resave: true,
    saveUninitialized: true,
  })
);

// view engine setup
app.set("view engine", "html");
app.engine("html", require("hbs").__express);
app.set("views", __dirname + '/views/html');


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/views") ); /**** */

app.use("/", indexRouter);
app.use("/users", usersRouter); 
app.use("/root", rootRouter);
//app.use('/administradores', administradorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//Create Server
app.listen(3000, () => {
  console.log("Listening on port 3000...");
});

module.exports = app;
