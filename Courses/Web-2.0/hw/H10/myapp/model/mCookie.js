var Hash=require('./Hash');

module.exports={
	createCookie: function(data, res){
		this.deleteCookie(res);
		res.cookie('name', data, {value: 1}, {maxAge: 1000*60*2});
		res.cookie('_id_',  Hash.getHash('_'+data), {maxAge: 1000*60*2});
	},
	deleteCookie: function(res){
		res.clearCookie('name', {maxAge: 1000*60*2});
		res.clearCookie('_id_', {maxAge: 1000*60*2});
	},
	checkId: function(name, id){
		return id==Hash.getHash('_'+name);
	}
}