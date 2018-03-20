var validator={
	content:{
		username:{
			filter: /^[a-zA-Z]{1}[0-9a-zA-Z_]{5,17}$/,
			valid: false,
			errorMessager: "Start with a letter and can only</br>\
							contain 6 to 18 digits, </br>\
							uppercase/lowercase letters or '_'."
		},
		id:{
			filter: /^[1-9][0-9]{7}$/,
			valid: false,
			errorMessager: "Start without '0' and can only </br>\
						    contain 8 digits."
		},
		tel:{
			filter: /^[1-9][0-9]{10}$/,
			valid: false,
			errorMessager: "Can only contain 11 digits."
		},
		email:{
			filter: /^[a-zA-Z0-9_]+@(([a-zA-Z_0-9])+\.)+[a-zA-Z]{2,4}$/,
			valid: false,
			errorMessager: "Invalid E-mail address."
		},
		password:{
			filter: /^[0-9a-zA-Z_-]{6,12}$/,
			valid: false,
			errorMessager: "Can only contain 6 to 12 digits, </br>\
							uppercase/lowercase letters, '-' or '_'."
		},
	},
	attributeValidator: function(attri, data){
		return this.content[attri].valid= this.content[attri].filter.test(data);
	},
	attributeRepeat: function(attri, data, callback){
		var attrJSON={};
		attrJSON[attri]=data;
		$.post('/post/checkExist', attrJSON, function(data){
			if (data.repeat) validator.content[attri].valid=false;
			else validator.content[attri].valid=true;
		    callback(validator.content[attri].valid);
		});
	},
	getErrorMessage: function(attri){
		return this.content[attri].errorMessager;
	},
	isContentValid: function(){
		return this.content.username.valid
				&&this.content.id.valid
				&&this.content.tel.valid
				&&this.content.email.valid
				&&$('#cpassword').val()==$('#password').val();
	}
	
}