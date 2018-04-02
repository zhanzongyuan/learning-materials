var LEN=4;
var AREA=LEN*LEN;
var S_MARK=0;
var OUTLINESIZE=280;
var b_arr=new Array(AREA);
var timer=null;
var picture=["v0", "v1", "v2", "v3", "v4", "v5", "v6"];
var PIC="v2";

window.onload=function(){
    createBlock();
    initialWeb();
}
function initialWeb(){
    document.getElementById("start_stop").onclick=StartStop;
    
    //set level button
    for (var i=0; i<3; i++){
        document.getElementById("l"+i).onclick=function(i){
            return function(){setLevel(3,i);};
        }(i);
    }
    document.getElementById("sub").onclick=function(){
        return function(){
            if (LEN>2) setLevel(LEN,-1);
        };
    }();
    document.getElementById("add").onclick=function(){
        return function(){
            if (LEN<10) setLevel(LEN,1);
        };
    }();
    
    
    //set picture
    for (var i=0; i<7; i++){
        var temp=document.getElementById(picture[i]);
        temp.style.backgroundImage="url(../image/"+picture[i]+".jpg)";
        temp.onclick=function(i){
            return function(){
                PIC=picture[i];
                for (var j=0; j<AREA; j++)
                    b_arr[j].style.backgroundImage=this.style.backgroundImage;
            }
        }(i);
    }
}
//set size of puzzle
function setLevel(origin, l){
    if (S_MARK==1) {
        setTimeout("function(){}", 300);
        StartStop.call(document.getElementById("start_stop"));
    }
    for (var i=0; i<AREA; i++)
        document.getElementById("outline").removeChild(b_arr[i]);
    LEN=origin+l;
    AREA=LEN*LEN;
    
    createBlock();
    
}
//create len*len blocks in puzzle
function createBlock(){
    for(var i=0; i<LEN; i++){
        for (var j=0; j<LEN; j++){
            var No=i*LEN+j+1;
            b_arr[No-1]=document.createElement("div");
            
            b_arr[No-1].className="block";
            b_arr[No-1].id="b"+No;
            b_arr[No-1].mId=No;
            
            
            var x=i*(OUTLINESIZE/LEN);
            var y=j*(OUTLINESIZE/LEN);
            
            b_arr[No-1].style.width=(OUTLINESIZE/LEN)+"px";
            b_arr[No-1].style.height=(OUTLINESIZE/LEN)+"px";
            
            b_arr[No-1].style.backgroundImage="url(\'../image/"+PIC+".jpg\')";
            b_arr[No-1].style.backgroundPosition
                =(OUTLINESIZE-y)+"px "+(OUTLINESIZE-x)+"px";
                
            b_arr[No-1].style.top=x+"px";
            b_arr[No-1].style.left=y+"px";
    
            
            document.getElementById("outline").appendChild(b_arr[No-1]);
        }
    }
}
//exchange position of block
function exchangPosi(ID, filter){
    var that=document.getElementById(ID);
        
    if (filter(that.mId, this.mId)){
        
        var posX=this.style.top;
        var posY=this.style.left;
        this.style.top=that.style.top;
        this.style.left=that.style.left;
        
        that.style.top=posX;
        that.style.left=posY;
            
        var t_id=this.mId;
        this.mId=that.mId;
        that.mId=t_id;
            
        return true;
    }
    else return false;
        
    
}
//judge if puzzle is correct
function CorrectPuzzle(){
    for (var i=0 ;i <AREA; i++)
        if ((i+1)!=b_arr[i].mId) return false;
    return true;
}
//when onclick start/stop button
function StartStop(){
    if (S_MARK==0){
        S_MARK=1;
        
        for(var i=0; i<AREA-1; i++){
            
            b_arr[i].onclick=function(){
                var near=function(pos1, pos2){
                    var offset=Math.abs(pos1-pos2);
                    var x1=parseInt((pos1-1)/LEN);
                    var x2=parseInt((pos2-1)/LEN);
                    if (offset==LEN||(offset==1&&x1==x2)) return true;
                    else return false;
                };
                return function(){
                        if (exchangPosi.call(this, "b"+AREA, near))
                            document.getElementById("paces").value++;
                        if (CorrectPuzzle()) {
                            var p=document.getElementById("paces").value;
                            var t=document.getElementById("timer").value+"s";
                            StartStop.call(document.getElementById("start_stop"));
                            alert("YOU WIN!\n"+"Paces: "+p+"\nTime: "+t);
                        }
                };
                
            }();
        }
        visiblePuzzle();
        
        setTimeout("randomPuzzle()", 300);
        
        timer=setInterval(timeAdd, 1);
    }
    else if (document.getElementById("timer").value>0.1){
        S_MARK=0;
        
        this.style.backgroundColor="white";
        recoveryPuzzle();
        document.getElementById("paces").value=0;
        initialTimer();
    }
}
//record time
function timeAdd(){
    
    var t=document.getElementById("timer");
    var val=t.value*1.0+0.001;
    t.value=val.toFixed(3);
}
//initial timer
function initialTimer(){
    clearInterval(timer);
    timer=null;
    document.getElementById("timer").value=0;
}
//create random puzzle in mess;
function randomPuzzle(){
    var hold = 0;   
    var ri = new Array(AREA-1);
    for (var i=0; i < AREA; i++)
        ri[i] = i;
    for(var j=0; j<5; j++){
        ri.sort(function(){return Math.random()-0.5;}); /*#*/
        for (var i=0; i < AREA-1; i+=3){
            exchangPosi.call(b_arr[ri[i]], "b"+(ri[i+1]+1), function(){return true}); 
            exchangPosi.call(b_arr[ri[i+1]], "b"+(ri[i+2]+1), function(){return true}); 
        }
    }
    
    
}
//make puzzle picture
function recoveryPuzzle(){
    for (var i=0; i<AREA; i++){
        b_arr[i].onclick=null;
        b_arr[i].style.width=(OUTLINESIZE/LEN)+"px";
        b_arr[i].style.height=(OUTLINESIZE/LEN)+"px";
        if ((i+1)==b_arr[i].mId) continue;
        for (var j=i+1; j<AREA; j++){
            if ((i+1)==b_arr[j].mId){
                exchangPosi.call(b_arr[i], "b"+(j+1), function(){return true})
                break;
            }
        }
    }
    
    b_arr[AREA-1].style.opacity=1;
}
//make puzzle visible
function visiblePuzzle(){
    for(var i=0; i<AREA-1; i++){
        b_arr[i].style.width=(OUTLINESIZE/LEN-2)+"px";
        b_arr[i].style.height=(OUTLINESIZE/LEN-2)+"px";
    }
    b_arr[AREA-1].style.opacity=0;
};
//make random from 0 to l
function random(l) {
    return(Math.floor(Math.random()*100%l));
}
