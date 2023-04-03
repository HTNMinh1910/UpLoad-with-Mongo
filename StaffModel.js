const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        require:  true,
    },
    age: {
        type: Number,
    },
    salary: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('staffs', staffSchema);
