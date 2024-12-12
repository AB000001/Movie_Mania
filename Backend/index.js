const express = require("express");
const {searchdataModel} = require("./db");
const cors = require('cors');
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://proakshatbhatt:VCW7vs66e6CHW6Cr@cluster0.plsws.mongodb.net/movie_mania3")

const app = express();
app.use(express.json());

app.use(cors());


app.post("/addtodb", async function(req, res) {
    console.log("reached backend here")
    const searchitem= req.body.searchitem;
    await searchdataModel.create({
        title:searchitem
    })
    res.json({
        message:"Search data added to database4"
    })
});


app.listen(3000);