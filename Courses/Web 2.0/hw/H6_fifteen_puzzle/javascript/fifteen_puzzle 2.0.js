var LEN=4;
var AREA=LEN*LEN;
var S_MARK=0;
var OUTLINESIZE=280;
var PIC="v2";
var blockManager={
	b_arr : new Array(AREA),
	pos_arr : new Array(AREA),
	createBlock : function(){				//create len*len blocks in puzzle
		for (var No=1; No<=AREA; No++){
			$("#outline").append("<div id='b"+No+"'></div>");
			$("#b"+No).attr({"class":"block", "mId":No});
		}
		$(".block").css({"width":(OUTLINESIZE/LEN)+"px", "height": (OUTLINESIZE/LEN)+"px"});
		blockManager.initial().setBg().setPos();
	},
	initial : function(){
		for (var No=1; No<=AREA; No++){
			var x=parseInt((No-1)/LEN)*(OUTLINESIZE/LEN), y=((No-1)%LEN)*(OUTLINESIZE/LEN);
			this.b_arr[No-1]=$("#b"+No);
            this.b_arr[No-1].css("background-position", (OUTLINESIZE-y)+"px "+(OUTLINESIZE-x)+"px");
			this.pos_arr[No-1]={pos_x: x, pos_y: y};
		}		
		return this;
	},
	setBg : function(){
		$(".block").css("background-image", "url(\'../image/"+PIC+".jpg\')");
		return this;
	},
	setPos : function(){
		for (var No=1; No<=AREA; No++){
			var mid=this.b_arr[No-1].attr("mId");
			this.b_arr[No-1].css("top", blockManager.pos_arr[mid-1].pos_x+"px");
			this.b_arr[No-1].css("left", blockManager.pos_arr[mid-1].pos_y+"px");
		}
		return this;
	},
	setClick : function(){
		for(var i=0; i<AREA-1; i++)
            this.b_arr[i].click(function(i){
						return function(){
							if (blockManager.exchangePosi(i, AREA-1, near)) {
								pace.addPace();
								blockManager.setPos();
							}
							if (blockManager.CorrectPuzzle()) gameSituation.Stop();
						}
                }(i));
		return this;
	},
	exchangePosi : function(p1, p2, filter){  		//exchange position of block
		var t_id1=blockManager.b_arr[p1].attr("mId"), t_id2=blockManager.b_arr[p2].attr("mId")
		if (filter(t_id1-1, t_id2-1)){
			blockManager.b_arr[p1].attr("mId", t_id2);
			blockManager.b_arr[p2].attr("mId", t_id1);
			return true;
		}
		else return false;  
	},
	CorrectPuzzle : function(){					//judge if puzzle is correct
		for (var i=0; i<AREA; i++)
			if ((i+1)!=blockManager.b_arr[i].attr("mId")) return false;
		var p=$("#paces").val();
		var t=$("#timer").val()+"s";
		alert("YOU WIN!\n"+"Paces: "+p+"\nTime: "+t);
		return true;
	},
	randomPuzzle : function(){ 			//create random puzzle in mess;
		var ri = new Array(AREA-1);
		for (var i=0; i < AREA; i++) ri[i] = i;
		for(var j=0; j<5; j++){
			ri.sort(function(){return Math.random()-0.5;}); /*#*/
			for (var i=0; i < AREA-1; i+=3){
				blockManager.exchangePosi(ri[i], ri[i+1], function(){return true}); 
				blockManager.exchangePosi(ri[i+1], ri[i+2], function(){return true}); 
			}
		}
		blockManager.setPos();
	},
	recoveryPuzzle : function(){			//make puzzle picture
		_.times(AREA, function(i){
			blockManager.b_arr[i].css({"width":(OUTLINESIZE/LEN)+"px", "height":(OUTLINESIZE/LEN)+"px"});
			blockManager.b_arr[i].unbind("click");
			if ((i+1)!=blockManager.b_arr[i].attr("mId"))
				for (var j=i+1; j<AREA; j++)
					if ((i+1)==blockManager.b_arr[j].attr("mId")){
						blockManager.exchangePosi(i, j, function(){return true});
						break;
					}
		});
		blockManager.setPos().b_arr[AREA-1].show();
	},
	visiblePuzzle : function(){			//make puzzle visible
		for(var i=0; i<AREA-1; i++)
			blockManager.b_arr[i].css({"width":(OUTLINESIZE/LEN-2)+"px", "height":(OUTLINESIZE/LEN-2)+"px"});
		blockManager.b_arr[AREA-1].hide();
	}
}
var puzzlePicture={
    picture : ["v0", "v1", "v2", "v3", "v4", "v5", "v6"],
	initial : function(){				//set picture
		_.times(7, function(i){ 
			var temp=$("#"+puzzlePicture.picture[i]);
			temp.css("background-image","url(../image/"+puzzlePicture.picture[i]+".jpg)");
			temp.click(function(){
				PIC=puzzlePicture.picture[i]; blockManager.setBg(); });
		});
	}
}
var gameSituation={				//when onclick start/stop button
	StartStop : function(){
		if (S_MARK==0) gameSituation.Start();
		else if ($("#timer").val()>0.1) gameSituation.Stop();
	},
	Start : function(){
		S_MARK=1;
		blockManager.setClick();
		blockManager.visiblePuzzle();    
		setTimeout("blockManager.randomPuzzle()", 300);
		time.countTime();
	},
	Stop : function(){
		S_MARK=0;
		blockManager.recoveryPuzzle();
		pace.clearPace();
		time.initialTimer();
	}
}	
var time={
	timer : null,
	countTime : function(){	this.timer=setInterval(time.timeAdd, 1);},	//begin counting time
	timeAdd : function(){					//add timer
		var t=$("#timer");
		t.val((t.val()*1.0+0.001).toFixed(3));
	},
	initialTimer : function(){					//initial timer
		clearInterval(time.timer);
		this.timer=null;
		$("#timer").val(0);
	}
}
var pace={
	addPace : function(){$("#paces").val(parseInt($("#paces").val())+1);},
	clearPace : function(){	$("#paces").val(0);	}
}
var level={
	initial : function(){			//set level button
		_.times(3, function(i){
			$("#l"+i).click(function(){level.setLevel(3,i);}); });
		$("#sub").click(function(){
				if (LEN>2) level.setLevel(LEN,-1); });
		$("#add").click(function(){
				if (LEN<10) level.setLevel(LEN,1); });
	},
	setLevel : function(origin, l){					//set size of puzzle
		if (S_MARK==1) gameSituation.Stop();
		$("#outline").empty();
		LEN=origin+l;
		AREA=LEN*LEN;
		blockManager.createBlock();
	}
}
var random=function(l) { return(Math.floor(Math.random()*100%l)); }		//make random from 0 to l
var near=function(pos1, pos2){
    var offset=Math.abs(pos1-pos2);
    var x1=parseInt(pos1/LEN);
    var x2=parseInt(pos2/LEN);
    if (offset==LEN||(offset==1&&x1==x2)) return true;
    else return false;
};

window.onload=function(){
    blockManager.createBlock();
    $("#start_stop").click(gameSituation.StartStop);
	level.initial();
    puzzlePicture.initial();
}