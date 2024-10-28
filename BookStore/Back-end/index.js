require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connect_to_DB = require("./db");

//import routes
const loginRoute = require("./routes/auth_login");
const registerRoute = require("./routes/auth_register");

// database connection
connect_to_DB();
// middleware
app.use(express.json());

app.use(cors());

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`listening on port ${port}...`));
