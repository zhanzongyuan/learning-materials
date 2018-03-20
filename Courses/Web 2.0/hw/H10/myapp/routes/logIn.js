var express = require('express');
var router = express.Router();

/* GET signin page. */
router.get('/', function(req, res, next) {
	if (req.query.username==null) res.render('signIn');
	else next();
});

module.exports = router;