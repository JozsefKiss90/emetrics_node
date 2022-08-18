const express = require('express');
const router = express.Router();
const uuid = require('uuid')
const RT_test = require('../../models/rt')

router.get('/', (req, res) => {
    RT_test.find()
    .sort({date: -1})
    .then(items => res.json(items))
})

router.post('/', (req,res) =>{
    console.log(req.body)
    const newRt = new RT_test({
        rt : req.body.rTime,
        acc : req.body.acc
      })
    newRt.save()
    .then(results=> res.json(results)) 
    .catch(err=>{console.log(err)})
})

module.exports = router 