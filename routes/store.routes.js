const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
  res.send('Store routes');
})


module.exports = router;
