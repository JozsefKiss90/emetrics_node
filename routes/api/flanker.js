const express = require('express');
const router = express.Router();
const flanker_test = require('../../models/flanker')

router.get('/', (req, res) => {
    flanker_test.find()
    .sort({date: -1})
    .then(items => res.json(items))
})


router.post('/', (req,res) =>{
    console.log(req.body)
    const newRt = new flanker_test({
        rt : req.body.rTime,
        acc : req.body.acc
      })
    newRt.save()
    .then(results=> res.json(results)) 
    .catch(err=>{console.log(err)})
})

module.exports = router 