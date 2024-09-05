const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
    origin : ["http://localhost:5173"],
};

app.use(cors(corsOptions));

//API
app.get("/api", (req, res)=>{
    res.json({ legs: ["Running", "Walking", "Jogging"]})
})

app.listen(3000,()=>{
    console.log("Server is running on port: " + 3000);
})