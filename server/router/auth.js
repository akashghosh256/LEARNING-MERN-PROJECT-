const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('heyyyyyyyyy from express router auth.js');
})

// To get data from frontend always do same
router.post('/register', (req,res) =>{
console.log(req.body);
res.json({message:req.body});
//res.send("mera hnnn");
});


module.exports = router;







