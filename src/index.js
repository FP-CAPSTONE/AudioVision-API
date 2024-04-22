require("dotenv").config();

//  core modules
const express = require("express");
const authRoutes = require("./routes/auth");


const app = express();

// this middle ware allow JSON req.body
app.use(express.json()); 
/*
    this will allow access static file in public folder 
    inside images folder and to get access into the file 
    need to make a request to = http://localhost:4000/filename.extension 
*/

app.get("/", (req, res) => {
    res.send({ message: "Connection success " });
});

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
    // err handling
    res.send(err); 
    next();
});

app.use("/", (req, res) => {
    // else
    res.sendStatus(404);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
