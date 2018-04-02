var express = require('express');
var router = express.Router();

/* GET signup page. */
router.get('/', function(req, res, next) {
	if (req.query.username==null) res.render('signUp');
	else next();
});

module.exports = router;
