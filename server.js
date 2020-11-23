
//Express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

//Router
const API = require("./routes/apiRoutes")(app);
const HTML = require("./routes/htmlRoutes")(app);

//Server
app.listen(PORT, () => console.log("Server launched. Now listening on PORT: " + PORT));