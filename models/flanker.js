const mongoose = require('mongoose');
const Schema = mongoose.Schema

const flankerSchema = new Schema ({
    rt : {
        type: Number,
        required: true
    },
    acc : {
        type: Number,
        required: true
    }
},{timestamps:true})

const flanker_test = mongoose.model('flanker-test', flankerSchema)
module.exports = flanker_test