var signUpController=require('./signUpController');
var express = require('express');
var router = express.Router();
var checkQuery = function(req, res, next){
	if (req.query.username) next();
	else res.redirect('/logIn');
}

/* GET users listing. */
router.get('/', signUpController.getAccount, checkQuery);

module.exports = router;