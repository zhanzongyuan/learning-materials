$(function(){
	$('#_logIn').click(function(){
		if ($('#username').val()==""||$('#password').val()=="") return false;
		var attrJSON={};
		attrJSON['username']=$('#username').val();
		attrJSON['password']=$('#password').val();
		$.post('/post/signIn', attrJSON, function(err){
			if (err.errorMessage) {
				alert(err.errorMessage);
				$('#password').val('');
				return false;
			}
			else {
				window.location.href='/?username='+$('#username').val();
			}
		});
		return false;
	});
	$('#_regist').click(function(){
		window.location.href='/regist';
	});
})