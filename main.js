let slot_screen=document.getElementById("slot-screen");
let reel=document.getElementsByClassName("reel");
let reels=document.getElementsByClassName("reels");
let stop_btn=document.getElementsByClassName("stop-btn")
let start_btn=document.getElementById("start-btn");


let sec=50;
let stopReelFlag=[];
let reelCounts=[];
let slotFrameHeight;
let slotReelsHeigh;
let slotReelItemHeight;
let slotReelStartHeigh;

let slot={
  init:function() {
    stopReelFlag[0]=stopReelFlag[1]=stopReelFlag[2]=false;
    reelCounts[0]=reelCounts[1]=reelCounts[2]=0;
  },

  //click event
  start:function(){
    slot.init();
    for (let index = 0; index < 3; index++) {
      slot.animation(index)
    }
  },
  stop:function(i){
    stopReelFlag[i]=true
    if(stopReelFlag[0]&& stopReelFlag[1]&& stopReelFlag[2]){
      start_btn.removeAttribute("disabled")  
    }
  },
  resetLocationInfo:function(){
    slotFrameHeight=slot_screen.offsetHeight;
    slotReelsHeigh=reels[0].offsetHeight;
    slotReelItemHeight=reel[0].offsetHeight;
    slotReelStartHeigh=-slotReelsHeigh;
    slotReelStartHeigh+=slotFrameHeight
    -(slotFrameHeight/2)+slotReelItemHeight*3/2;
    for (let i = 0; i < reels>length; i++) {
        reels[i].style.top=string(slotReelStartHeigh)+"px";
    }
  },
//move the slot
  animation:function (index) {
    if(reelCounts[index]>=8){
      reelCounts[index]=0;
    }

    $(".reels").eq(index).animate({
      "top":slotReelStartHeigh+ (reelCounts[index]*slotReelItemHeight)
    },
    {
      duration:sec,
      easing:"linear",
      complete:function(){
        if(stopReelFlag[index]){
          return;
        }
        reelCounts[index]++;
        slot.animation(index);
      }
    });
  },  

};

window.onload= function(){
  slot.init();
  slot.resetLocationInfo()
  start_btn.addEventListener("click",function(e){
    e.target.setAttribute("disabled",true)
    slot.start();
    for(let i=0; i<stop_btn.length;i++){
      stop_btn[i].removeAttribute("disabled") 
    } 
  });
  for (let i = 0; i < stop_btn.length; i++) {
    stop_btn[i].addEventListener("click",function(e){
      slot.stop(e.target.getAttribute("data-val"))
    })
    
  }
}