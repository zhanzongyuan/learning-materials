var mark=0;                             //mark the equal"=" button

window.onload=function(){
    
    document.getElementById("expression").readOnly=true;
    
    var button=document.getElementsByTagName("button");
    var len=button.length;
    
    
    for (var i=0; i<len; i++){
        button[i].onclick=expr;
        
        
        button[i].onmousedown=function(){
            this.style.border="2px solid red";
            this.style.backgroundColor="rgba(0,0,0,0.5)";
        };
        button[i].onmouseup=function(){
            this.style.border="1px solid gray";
            this.style.backgroundColor="rgba(0,0,0,0.95)";
        };
        
        
        button[i].onmousemove=function(){
            this.style.border="1px solid gray";
            this.style.backgroundColor="rgba(0,0,0,0.8)";
        }
        button[i].onmouseout=function(){
            this.style.border="1px solid gray";
            this.style.backgroundColor="rgba(0,0,0,0.95)";
        }
    }
    button[14].onclick=backspace;
    button[18].onclick=CE;
    button[19].onclick=result;
    
}

//get result of expression
function result(){
    
    var ex=document.getElementById("expression").value;
    
    
    try{
        if (ex=="") return;
        var s=eval(ex).toFixed(16);
        if (s=="Infinity") throw "Error: Divide by zero";
        
        document.getElementById("expression").value=s*1;
        exprSize();
    }
    catch(error){
        alert(error);
    }
    mark=0;
}

function CE(){
    document.getElementById("expression").value="";
    document.getElementById("expression").style.fontSize="30pt";
    mark=1;
}

function backspace(){
    var ex=document.getElementById("expression").value;
    document.getElementById("expression").value=ex.slice(0, -1);
    
    exprSize();
    mark=1;
}

//add expression code
function expr(){
    
    var val=document.getElementById("expression").value;        //expression
    var ex=val.slice(-1);                                       //formal code
    var ad=this.textContent;                                    //input code
    
    
    
    //prevent invalid multiple zero
    if (ad=="0"&&ex=="0"){
        var m_zero=0;
        for (var i=val.length-2; i>=0; i--){
            if (val.slice(i,i+1)=="0") continue;
            else if (val.slice(i,i+1)=="("||val.slice(i,i+1)==")") break;
            else if (val.slice(i,i+1)=="*"||val.slice(i,i+1)=="/") break;
            else if (val.slice(i,i+1)=="+"||val.slice(i,i+1)=="-") break;
            else {
                m_zero=1;
                break;
            }
        }
        if (m_zero==0) return;
    }
    
    
    
    //prevent multiple "."
    if (ad=="."&&ex==".") return;
    if (ad=="."&&!isNaN(ex)){
        var m_point=1;
        for (var i=val.length-2; i>=0; i--){
            if (val.slice(i,i+1)==".") {
                m_point=0;
                break;
            }else if (val.slice(i,i+1)=="("||val.slice(i,i+1)==")") break;
            else if (val.slice(i,i+1)=="*"||val.slice(i,i+1)=="/") break;
            else if (val.slice(i,i+1)=="+"||val.slice(i,i+1)=="-") break;
        }
        if (m_point==0) return;
    }
    
    
    
    //judge equal button done or not
    if(mark==0){
        if (ad!='/' && ad!='*' && ad!='+' && ad!='-'){
            document.getElementById("expression").value=ad;
            mark=1;
            return;
        }
    }
    
    
    
    //prevent the first code is operator
    if (val==""||val=="-"){
        if (ad=='/'||ad=='*'||ad=='+'){
            document.getElementById("expression").value="";
            return;
        }
    }
    
    
    
    //if the formal code is operator, let +- *- /- valid
    if (ex=='/'||ex=='*')
        if (ad=='/'||ad=='*'||ad=='+')
            document.getElementById("expression").value=val.slice(0, -1);
    if (ex=='-')
        if (ad=='/'||ad=='*'||ad=='+'||ad=='-')
            if (isNaN(val.slice(-2,-1)))
                document.getElementById("expression").value=val.slice(0, -2);
            else 
                document.getElementById("expression").value=val.slice(0, -1);
    if (ex=='+')
        if (ad=='/'||ad=='*'||ad=='+')
            document.getElementById("expression").value=val.slice(0, -1);

        
        
    //create * between ')' '(' and number
    if (ad=='(')
        if ((!isNaN(ex)&&ex!="")||ex==')') document.getElementById("expression").value+='*';
    if (!isNaN(ad))
        if (ex==')') document.getElementById("expression").value+='*';
    
    
    
    
    document.getElementById("expression").value+=this.textContent;

    
    exprSize();
    mark=1;
}

//change size of expression depending on length of expression
function exprSize(){
    if (document.getElementById("expression").value.length>=20){
        document.getElementById("expression").style.fontSize="10pt";
    }
    else if (document.getElementById("expression").value.length>=13){
        document.getElementById("expression").style.fontSize="20pt";
    }
    else if (document.getElementById("expression").value.length<13){
        document.getElementById("expression").style.fontSize="30pt";
    }
    
}