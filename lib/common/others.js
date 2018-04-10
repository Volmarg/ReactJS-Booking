//Drawing lines and hours on timebars
export function drawLinesAndHours(booking){
  var selector='.rc-slider-mark';
  var styles="top:default;z-index:4;width: 90%; margin-left: -45%; left:";

  if (booking!=undefined){
    selector='.lightbox .rc-slider';
    styles="top:30px;z-index:4;width: 90%; margin-left: -45%; left:";
  }
  var tekstHolders=document.querySelectorAll(selector);
  var splitters=``;

  for(x=1;x<12;x++){
    splitters+=`
      <span class="rc-slider-mark-text rc-slider-mark-text-active" style="`+styles+100/12*x+`%;">`+(8+x-1)+`:00.
        <span class='hoursMarks'></span>
      </span>
    `;
  }

  for(var x=0;x<=tekstHolders.length-1;x++){
    var curr=tekstHolders[x].innerHTML;
    var newContent=curr+splitters;
    tekstHolders[x].innerHTML=newContent;
  }
}
