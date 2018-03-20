var signUpController=require('./signUpController');
var Account=require("../model/Account");
var mCookie=require("../model/mCookie");
var addCookie=function(req, res, callback){
	mCookie.createCookie(req.body.username, res);
	callback(null, res);
}

module.exports={
	checkPassword:
		function(req, res, next){
			if (req.body.username!=null&&req.body.password!=null)
				Account.exist('checkPassword', req.body, function(err, count){
					if (err){
						console.log(err);
						next();
					}
					else if (count==0)
						res.send({errorMessage: "Wrong username or password"});
					else
						addCookie(req, res, function(err, res){
							if (!err) res.redirect("/?username="+req.body.username);
							else res.end(err);
						});
				
				});
			else {
				res.location('back');
				res.render('signIn', {errorMessager: "Username or password shouldn't be null"});
			}
		}
}