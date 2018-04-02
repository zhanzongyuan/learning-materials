var Account=require("../model/Account");
var mCookie=require("../model/mCookie");

module.exports={
	userExist:
	function(req, res){
		Account.exist('checkRepeat', req.body, function(err, repeat){
			if (err){
				console.log(err);
				res.send(err);
			}
			else res.send({'repeat': repeat});
			
		});
	},
	getAccount:
	function(req, res, next){
		console.log(req.cookies);
		console.log(req.cookies.name);
		if (mCookie.checkId(req.cookies.name, req.cookies._id_)){
			Account.read({'username': req.cookies.name}, function(err, detail){
				//upgrade cookie
				mCookie.createCookie(req.cookies.name, res);
				
				if (req.cookies.name!=req.query.username&&req.query.username) 
					detail['warning']="alert('Can only access your own data detail!');";
				if (!err) res.render('account_detail', detail);
				else next();
			});
		}
		else next();
	},
	saveAccount:
	function(req, res){
		Account.save(req.body, function(err, data){
			if(err){
				res.send({success: false, error: err});
			}
			else{
				mCookie.createCookie(data.username, res);
				res.redirect("/?username="+data.username);
			}
		});
		 
		
	}
}