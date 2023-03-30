const mongoose = require('mongoose');

const NhanVienSchema = new mongoose.Schema({
    ten: {
        type: String,
        required: true
    },
    diachi: {
        type: String
    },
    luong: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('nhanviens', NhanVienSchema);
