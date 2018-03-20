gamelength=30;
timerID=null
var playing=false;
var numholes=6*10;
var currentpos=-1;
window.onload=function(){
    copyDots();
    document.getElementById("startstop").onclick=play;
}
function copyDots(){
    for (var i=0; i<6; i++){
        for(var j=0; j<10; j++){
            var cc_node=document.createElement("input");
            cc_node.type="button";
            cc_node.style.width="15px";
            cc_node.style.height="15px";
            cc_node.style.backgroundColor="white";
            cc_node.style.borderRadius="10px";
            cc_node.style.border="1px solid gray";
            cc_node.id=(i*10+j);
            cc_node.onclick=hithead;
            var c_node=document.createElement("td");
            c_node.style.align="center";
            c_node.style.valign="center";
            c_node.appendChild(cc_node);
            document.getElementById("row"+(i+1)).appendChild(c_node);
        }
    }
}
function stopgame() {
    stoptimer();
    playing=false;
    document.cpanel.timeleft.value=0;
    clrholes();
    display("Game Over");
    alert('Game Over.\nYour score is:  '+totalhits);
}
function play() {
    stoptimer();
    if(playing) {
        stopgame();
        return;
    }
    playing=true;
    clrholes();
    totalhits=0;
    document.cpanel.score.value=totalhits;
    display("Playing");
    launch();
    showtime(gamelength);
    
}
//initial holes
function clrholes() {
    for(var k=0;k<document.dmz.elements.length;k++)
        document.dmz.elements[k].checked=false;
    if (currentpos!=-1)
        document.dmz.elements[currentpos].style.boxShadow="0px 0px 0px 0px blue";
    
}
//clear timer
function stoptimer() {
    if(playing)
        clearTimeout(timerID);
}
//show time left
function showtime(l_time) {
    document.cpanel.timeleft.value=l_time;
    if(playing) {
        if(l_time==0) {
            stopgame();
            return;
        }
        else {
            temp=l_time-1;
            timerID=setTimeout("showtime(temp)",1000); /*#*/
        }
    }
}
//show situation
function display(situation) {
    document.cpanel.state.value=situation;
}
//create target
function launch() {
    var launched=false;
    while(!launched) {
        mynum=random();
        if(mynum!=currentpos) {
            document.dmz.elements[mynum].style.boxShadow="0px 0px 1px 1px blue";
            document.dmz.elements[mynum].checked=true;
            currentpos=mynum;
            launched=true;
        }
    }
}
function random() {
        return(Math.floor(Math.random()*100%numholes));
}
//click dot
function hithead() {
    if(playing==false) {
        clrholes();
        display("Push Start to Play");
    }
    else if(currentpos!=this.id) {
        totalhits+=-1;
        document.cpanel.score.value=totalhits;
        document.dmz.elements[this.id].style.boxShadow="0px 0px 0px 0px blue";
        document.dmz.elements[id].checked=false;
    }
    else {
        totalhits+=1;
        document.cpanel.score.value=totalhits;
        document.dmz.elements[this.id].style.boxShadow="0px 0px 0px 0px blue";
        launch();
        document.dmz.elements[this.id].checked=false;
    }
}