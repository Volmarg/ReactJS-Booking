import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//#-------------------------------------------------------------- Time library
import {timeToValue} from '../lightbox/timeStoreCtrl';

//#-------------------------------------------------------------- Main lib

var arrayOfRanges={};

//calculate ranges for Range bar
export function rangesCalculations(hoursRange){

  //split array into subarrays
  var counted=hoursRange.length;
  var subarray=[];
  var y=0;

  for(var x=0;x<=counted-1;x++){

    var hour=hoursRange[x];
    var arrayOfRange=hour.split("-");

    //extract hours range
    var lowRange=arrayOfRange[0];
    var upperRange=arrayOfRange[1];

    //split hours and minutes
    var lowRangeArray=lowRange.split(":");
    var lowHour=lowRangeArray[0];
    var lowMinute=lowRangeArray[1];

    var highRangeArray=upperRange.split(":");
    var highHour=highRangeArray[0];
    var highMinute=highRangeArray[1];

    //calculate time in miliseconds
    var lowRange=timeToValue(lowHour,lowMinute);
          subarray[y]=lowRange;
          y++;
    var highRange=timeToValue(highHour,highMinute);
          subarray[y]=highRange;
          y++;

    //build array for THIS one call from class
    if(x==counted-1){
      arrayOfRanges={
            ranges:subarray,
            count:counted
          };

      }
  }

  return arrayOfRanges;
}

//coloring the Range bar elements
export function railColoring(count,ranges){
  var styleTaken='rgb(185,53,56,1)';
  var styleFree='green';
  var styleRail=[];

  for(var x=1;x<=count*2+1;x++){

    if(ranges[0]==25200000){
      if(x % 2 == 0){
        styleRail[x-1]={backgroundColor:styleTaken, zIndex:2};

      }else {
        styleRail[x-1]={backgroundColor:styleFree, zIndex:3};
      }
    }else{
      if(x % 2 == 0){
        styleRail[x-1]={backgroundColor:styleFree,zIndex:2};
      }else {
        styleRail[x-1]={backgroundColor:styleTaken,zIndex:3};
      }


    }

  }

      return styleRail;

  }
