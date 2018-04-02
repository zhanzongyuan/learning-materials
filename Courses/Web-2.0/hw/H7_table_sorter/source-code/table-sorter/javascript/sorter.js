(function addJs(){		//initial add jqury.js lodash.js
	for (var i=0; i<arguments.length; i++){
		var js=document.createElement("script");
		js.src=arguments[i];
		js.type="text/javascript"
		document.getElementsByTagName("head")[0].appendChild(js);
	}
})("javascript/lib/jquery.js","javascript/lib/lodash.js");

var addCss=function(href){
	var css=document.createElement("link");
	css.type="text/css";
	css.rel="stylesheet";
	css.href=href;
	document.getElementsByTagName("head")[0].appendChild(css);
}
var table=[];
window.onload=function(){
	addCss("css/sorter.css");
	$("table").each(function(i){
		table[i]=new createTable(this); });
}
var createTable=function(dom){
	this.dom=$(dom);		//take jquery $('table')
	this.rnum=this.dom.find("tr").size()-1;		//take rows' numbers
	this.cnum=this.dom.find("th").size();		//take cols' numbers
	
	this.unit=[];			//unit used to storage html in table unit
	this.setUnit();	
	this.h=this.dom.find("th");
	
	this.setClick();		//set head click event
	this.setTrColor();		//set odd_even color
}
var p=createTable.prototype;
p.setClick=function(){
	for(var j=0; j<this.cnum; j++)
		this.h.eq(j).click(this.returnSortFunc(j));
}
p.returnSortFunc=function(n){		//return sortfunc for every head
	var that=this;
	return function(){
		for (var i=0;i<that.rnum-1; i++)
			for (var j=i+1; j<that.rnum; j++){
				var p1=that.unit[n][i], p2=that.unit[n][j];
				if (that.unit[n].cmp(p1, p2) ) that.exchange(i, j);
			}
		that.setHtml();
		that.setHeadColor(n);
	}
}
p.setTrColor=function(){
	this.dom.find("tr").each(function(i){
		if (i%2!=1) $(this).css("background-color", "rgb(221,221,221)");
		else $(this).css("background-color","white")});
}
p.exchange=function(p1, p2){
	for (var i=0; i<this.cnum; i++) {
		var p=this.unit[i][p1];
		this.unit[i][p1]=this.unit[i][p2];
		this.unit[i][p2]=p;
	}
}
p.setHtml=function(){
	for(var j=0; j<this.cnum; j++)
		for (var k=0; k<this.rnum; k++)
			this.dom.find("td").eq(j+k*this.cnum).html(this.unit[j][k]);
}
p.setHeadColor=function(n){
	this.unit[n].up=this.unit[n].up?false:true;
	_.times(this.cnum, function(n){
		return function(i){if (i!=n) this.unit[i].up=false;}; }(n), this);
	this.dom.find("th").each(function(i,val){$(this).css("background-color", "rgba(0,0,128,1)");});
	var temp="descend.png";
	if (this.unit[n].up) temp="ascend.png";
	this.dom.find("th").eq(n).css({"background-color": "rgb(167, 174, 252)", "background-image": "url('image/"+temp+"')"});
}
p.setUnit=function(){
	for(var j=0; j<this.cnum; j++){
		this.unit[j]=[];
		for (var k=0; k<this.rnum; k++)
			this.unit[j][k]=this.dom.find("td").eq(j+k*this.cnum).html();
		this.unit[j].up=false;
		this.unit[j].cmp=compare;
	}
}
var compare=function(p1, p2){
	if ((p1<p2)==this.up) return true;
	return false;
}