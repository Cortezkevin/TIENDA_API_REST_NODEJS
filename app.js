require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.use("/rest", require("./routes"));

//app.use("/api", require(""));
app.listen(port, ()=> {
    console.log(`Tu servicio esta listo por http://localhost:${port}`);
});

dbConnect();