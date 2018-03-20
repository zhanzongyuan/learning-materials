var mongodb=require('./mongodb'),
	Schema=mongodb.mongoose.Schema,
	Hash = require('./Hash');

var AccountSchema=new Schema({
	username: String,
	id: String,
	tel: String,
	email: String,
	password: String
});

//pre crypt password
AccountSchema.pre('save', function(next) {
    var user = this;

    //make new password of create password
    if (!user.isModified('password')) return next();

	user.password=Hash.getHash(user.password);
	next();
});
AccountSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

var Account=mongodb.mongoose.model("Account", AccountSchema);
var AccountDAO=function(){};

AccountDAO.prototype.save=function(data, callback){
	var instance=new Account(data);
	instance.save(function(err){
		if (err) callback(err, null);
		else {
			console.log('Save successful!');
			console.log(instance);
			callback(err, data);
		}
	});
}
AccountDAO.prototype.read=function(data, callback){
	Account.findOne(data, function(err, detail){
		if (err) callback(err, null);
		else if (!detail.username) callback('not_present', detail);
		else {
			console.log('Read data successful!');
			callback(err, detail);
		}
	});
}

AccountDAO.prototype.exist=function(field, data, callback){
	if (field=='checkRepeat')
		Account.count(data, function(err, count){
			if (err) callback(err, false);
			else if (count>=1) callback(null, true);
			else callback(null, false);
		});
	else if (field=='checkPassword')	
		Account.findOne({username:data.username}, function(err, user){
			if (err) callback(err, false);
			else if (!user) callback(null, false);
			else {
				var sha=Hash.getHash(data.password);
				if (user.password==sha) callback(null, true);
				else callback(null, false);
			}
		});
	else callback(null, false);
	
}

module.exports=new AccountDAO();