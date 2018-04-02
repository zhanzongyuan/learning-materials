var mark=0;                             //mark the equal"=" button

window.onload=function(){
	$("#expression").attr("readOnly", true);
    var button=$("button");
	setMouse(button);
	button.each(function(i){
		if (i!=14&&i!=18&&i!=19) $(this).click(expr);});
    $(button[14]).click(backspace);
    $(button[18]).click(CE);
    $(button[19]).click(result);
}
var setMouse=function(button){
	button.mousedown(function(){
		$(this).css({"border": "2px solid red", "opacity": "0.5"});});
	button.mouseup(function(){
		$(this).css({"border": "1px solid gray", "opacity": "0.95"});});		
	button.mousemove(function(){
		$(this).css({"border": "1px solid gray", "opacity": "0.8"});});
	button.mouseout(function(){
		$(this).css({"border": "1px solid gray", "opacity": "0.95"});});
}
//get result of expression
var result=function(){
    var ex=$("#expression").val();
    try{
        if (ex=="") return;
        var s=eval(ex).toFixed(16);
        if (s=="Infinity") throw "Error: Divide by zero";
        $("#expression").val(s*1);
        exprSize();
    }
	catch(error) { alert(error); };
    mark=0;
}
var CE=function(){
    $("#expression").val("");
	exprSize();
    mark=1;
}
var backspace=function(){
    var ex=$("#expression").val();
    $("#expression").val(ex.slice(0, -1));
    exprSize();
    mark=1;
}
var judgeNoNum=function(val, i){
	if (val.slice(i,i+1)=="("||val.slice(i,i+1)==")") return true;
    else if (val.slice(i,i+1)=="*"||val.slice(i,i+1)=="/") return true;
    else if (val.slice(i,i+1)=="+"||val.slice(i,i+1)=="-") return true;
	return false;
}
var multipleZero=function(val, ad, ex){
	if (ad=="0"&&ex=="0"){
        var m_zero=0;
        for (var i=val.length-2; i>=0; i--)
            if (val.slice(i,i+1)=="0") continue;
            else if (judgeNoNum(val, i)) break;
            else {
                m_zero=1;
                break;
            }
        return (m_zero==0)?true:false;
    } else return false;
}
var multipleDot=function(val, ad, ex){
	if (ad=="."&&ex==".") return true;
    if (ad=="."&&!isNaN(ex)){
        var m_point=1;
        for (var i=val.length-2; i>=0; i--)
            if (val.slice(i,i+1)==".") {
                m_point=0;
                break;
            }else if (judgeNoNum(val, i)) break;
        return (m_point==0)?true:false;
    } else return false;
}
var isOx=function(val, ad, ex){
	if (val.length==1&&ex=="0"&&!isNaN(ad)) return true;
	else if (ex=="0"&&isNaN(val.slice(-2,-1))
			&&val.slice(-2,-1)!='.'&&!isNaN(ad) ) return true;
	return false;
}
var hasEqual=function(ad){
	if (mark==1) return false;
	if (ad!='/' && ad!='*' && ad!='+' && ad!='-'){
        document.getElementById("expression").value=ad;
        mark=1;
        return true;
    }
	return false;
}
var firstOperator=function(val, ad){
    if (val==""||val=="-")
        if (ad=='/'||ad=='*'||ad=='+'){
            $("#expression").val("");
            return true;
        }
	return false;
}
var eatInvalidOperator=function(val, ad, ex){
	if ((ex=='/'||ex=='*')&&(ad=='/'||ad=='*'||ad=='+')) 
		$("#expression").val(val.slice(0, -1));
    if ((ex=='+')&&(ad=='/'||ad=='*'||ad=='+')) 
		$("#expression").val(val.slice(0, -1));
    if ((ex=='-')&&(ad=='/'||ad=='*'||ad=='+'||ad=='-'))
        if (isNaN(val.slice(-2,-1))) $("#expression").val(val.slice(0, -2));
        else $("#expression").val(val.slice(0, -1));
}
var autoAdd=function(ad, ad, ex){
    if ((ad=='(')&&((!isNaN(ex)&&ex!="")||ex==')')) 
		$("#expression").val($("#expression").val()+'*');
    if ((!isNaN(ad))&&(ex==')')) 
		$("#expression").val($("#expression").val()+'*');
}
//prevent invalid input
var preDeal=function(){
	var val=$("#expression").val();        //expression
    var ex=val.slice(-1);                                       //formal code
    var ad=$(this).html();                                    //input code
	if (hasEqual(ad)) return true;				//judge equal button done or not
	if (multipleZero(val, ad, ex)) return true;	   	//prevent invalid multiple zero
    if (multipleDot(val, ad, ex)) return true;		//prevent multiple "."
	if (isOx(val, ad, ex)) return true;				//prevent 0234234....so on
    if (firstOperator(val, ad)) return true;				//prevent the first code is operator
    eatInvalidOperator(val, ad, ex);		//if the formal code is operator, let +- *- /- valid
	autoAdd(val, ad, ex);										//create * between ')' '(' and number
	return false;
}
//add expression code
var expr=function(){
    if (preDeal.call(this)) return;
	$("#expression").val($("#expression").val()+$(this).html());
    exprSize();
    mark=1;
}

//change size of expression depending on length of expression
var exprSize=function(){
    if ($("#expression").val().length>=20)
        $("#expression").css("font-size", "10pt");
    else if ($("#expression").val().length>=13)
		$("#expression").css("font-size", "20pt");
    else if ($("#expression").val().length<13)
		$("#expression").css("font-size", "30pt");
    
}