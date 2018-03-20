var crypto = require('crypto'),
	ALGORITHM='sha1';

module.exports={
	getHash:function(str){
		var shasum=crypto.createHash(ALGORITHM);
		shasum.update(str);
		return shasum.digest('hex');
	}
}