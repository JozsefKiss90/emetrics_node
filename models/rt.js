const mongoose = require('mongoose');
const Schema = mongoose.Schema

const rtSchema = new Schema ({
    rt : {
        type: Number,
        required: true
    },
    acc : {
        type: Number,
        required: true
    }
},{timestamps:true})

const RT_test = mongoose.model('rt-test', rtSchema)
module.exports = RT_test