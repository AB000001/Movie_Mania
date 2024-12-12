const mongoose = require("mongoose");
mongoose.set("debug", true);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const searchdata= new Schema({
    title: String
});

const searchdataModel = mongoose.model('sm', searchdata);

module.exports = {
    searchdataModel
}