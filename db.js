const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://minh:vMExZqKigeWnxbVO@atlascluster.2ul3dwj.mongodb.net/list?retryWrites=true&w=majority");
    console.log("Connect Successfuly!!");
  } catch (error) {
    console.log("Connect Failure!!");
  }
}
module.exports = {connect};