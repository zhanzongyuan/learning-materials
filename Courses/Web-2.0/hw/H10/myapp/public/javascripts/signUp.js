$(function(){
	var shake=function(){
		$(this).animate({ 'left': '197px' }, 0.2)
		.animate({ 'left': '200px' }, 0.2)
        .animate({ 'left' : '198px' }, 0.2); 
	}
	var good_error=function(str, stat){
		$('#w_'+$(this).attr('id')).html(str);
		$('#w_'+$(this).attr('id')).css('background-image', 'url("../images/'+['error.png")', 'correct.png")'][stat]);
		if (stat==0) shake.call($('#w_'+$(this).attr('id')));
	}
	$('#_reset').click(function(){
		$('.warning').html("");
		$('.warning').css('background-image', 'none');
	});
	$('._input').change(function(){
		var that=this;
		if ($(this).attr('id')=='cpassword') 
			if ($(this).val()!=$('#password').val()||$(this).val()=='') 
				good_error.call(this, 'Inconsistent password', 0);
			else good_error.call(this, '', 1);
		else if (!validator.attributeValidator($(this).attr('id'), $(this).val()))
			good_error.call(this, validator.getErrorMessage($(this).attr('id')), 0);
		else if ($(this).attr('id')=='password') 
			good_error.call(that, "", 1);
		else
			validator.attributeRepeat($(this).attr('id'), $(this).val(), function(valid){
				if (valid) good_error.call(that, "", 1);
				else good_error.call(that, "the "+$(that).attr('id')+" has been existed.", 0);
			});
		
	});
	$('#_submit').click(function(){
		$('._input').change();
		if (!validator.isContentValid()) return false;
	});
	
});