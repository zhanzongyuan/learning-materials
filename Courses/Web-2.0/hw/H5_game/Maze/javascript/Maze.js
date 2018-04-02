 var s_mark=0;
 var c_mark=0;
 var b_mark=0;
 window.onload=function(){
    var check_cheat=document.getElementById("check_cheat");
    var start=document.getElementById("start");
    var end=document.getElementById("end");
    
    //checking cheat block
    check_cheat.onmouseover=function(){
        if (s_mark==1){
            c_mark=1;
        }
    }
    
    //start block's behaviors
    start.onmouseover=function(){
        document.getElementById("output").style.opacity=0;
        document.getElementById("end").style.cursor="pointer";
        for(var i=1; i<=7; i++) document.getElementsByTagName("div")[i].style.backgroundColor="#EEEEEE";
        
        s_mark=1;
        b_mark=0;
        c_mark=0;
    }
    
    //break block's behaviors
    for(var i=1; i<=7; i++){
        var temp=document.getElementsByTagName("div")[i];
        temp.onmouseover=function(){
            if (b_mark==0&&s_mark==1){
                b_mark=1;
                s_mark=0;
                c_mark=0;
                
                this.style.backgroundColor="#e94e6a";
                document.getElementById("output").textContent="You Lose";
                document.getElementById("output").style.opacity=1;
            }
        }
    }
    
    var border=new Array("check_cheat", "t_border", "b_border", "l_border");
    for (i=0; i<4; i++){
        document.getElementById(border[i]).onmousemove=function(){
            if(b_mark==1)
                for(var i=1; i<=7; i++) document.getElementsByTagName("div")[i].style.backgroundColor="#EEEEEE";
        }
    }
    
    
    //end block's behaviors
    end.onmouseover=function(){
        if(s_mark==1&&c_mark==0&&b_mark==0){
            b_mark=1;
            s_mark=0;
            c_mark=0;
            
            document.getElementById("output").textContent="You Win";
            document.getElementById("output").style.opacity=1;
            this.style.cursor="default";
        }
        else if(s_mark==1&&c_mark==1){
            b_mark=1;
            s_mark=0;
            c_mark=0;
            
            document.getElementById("output").textContent
                ="Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
            document.getElementById("output").style.opacity=1;
        }
    }
 }