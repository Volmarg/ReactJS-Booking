import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {timeToValue, valToTime} from '../lightbox/timeStoreCtrl';
import {drawLinesAndHours} from '../common/others';

//#-------------------------------------------------------------- filter for [Show free rooms now]
export function freeRoomsSearch(passedAray,count,checkBoxState){

    var thisHour=new Date().getHours();
    var thisMinutes=thisHour=new Date().getMinutes();

    var numericValue=timeToValue(parseInt(thisHour),parseInt(thisMinutes));
    var lockChecker=0;
    var tabCounted=count*2-1;

  if(checkBoxState==true){
    for(var x=0;x<=tabCounted;x++){
        if(numericValue>=passedAray[x] && numericValue<=passedAray[x+1]){
            x++;
            return true;
        }else{
            x++;
        }
    }
      return false;
  }else{
      return true;
  }

}
