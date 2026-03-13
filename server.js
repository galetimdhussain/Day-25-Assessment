const express = require("express");
const compression = require("compression");

const courseRoutes = require("./routes/courses");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());
app.use(compression());

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
res.send("App is live");
});

app.get("/status", (req,res)=>{
res.send("App is live");
});

const PORT = process.env.PORT || 3000;

if(require.main === module){
app.listen(PORT, ()=>{
console.log("Server running on port " + PORT);
});
}

module.exports = app;
