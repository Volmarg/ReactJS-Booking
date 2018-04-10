import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//#----------------- Additional Timing converting functions start
//extract hours and minutes from [HH:MM] model
export function extractNumbers(userHours){

  var arrayOfRange=userHours[0].split("-");

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

  //in case of users entering hours like 33:80
  if(parseInt(lowHour)  <0  || parseInt(lowHour)      >24  ||
    parseInt(lowMinute) <0  || parseInt(lowMinute)    >60  ||
    parseInt(highHour)  <0  || parseInt(highHour)     >24  ||
    parseInt(highMinute)<0  || parseInt(highMinute)   >60
  ){
    return false;
  }else{

//if everything is ok
  var userHourArray=hoursToMiliseconds(lowHour,lowMinute,highHour,highMinute);
  return userHourArray;
  }

}

//changing pack of time ranges into milisecond values
export function hoursToMiliseconds(lowHour,lowMinute,highHour,highMinute){

  var lowRange=timeToValue(lowHour,lowMinute);
  var highRange=timeToValue(highHour,highMinute);

  return [lowRange,highRange]

}

// change hour and minut into miliseconds
export function timeToValue(hour,minute){
      var minToMs=60000;
      var hourToMs=3600000

      var numeric=hour*hourToMs+minute*minToMs;

      return numeric;
}

//change miliseconds back to [HH:MM]
export function valToTime(ms,raw){
    var seconds = ms / 1000;

    var hours = parseInt( seconds / 3600 );
    seconds = seconds % 3600;

    var minutes = parseInt( seconds / 60 );
    seconds = seconds % 60;

    if(raw==true){
      return [hours,minutes];
    }else{
      return String(hours+':'+minutes);
    }

}

//#----------------- Functions for checking if there is free time in range
export function isReservationOk(userReservation,count,ranges,skip){

  var arrayHours='';
  skip==true? arrayHours=userReservation :  arrayHours=extractNumbers(userReservation);
  console.log('-------------------------');
  console.log(arrayHours[0]);
  console.log(arrayHours[1]);


  var arrayOfStates=[];
  arrayOfStates=isFreeSpace(arrayHours[0],count,ranges,arrayHours[1]);

  return arrayOfStates;
}

export function isFreeSpace(startHour,count,ranges,endHour){

    var min15gap=900000; //the 15 min gap after last reservation
    var passedAray=ranges.split(',');
    var tabCounted=count*2-1;

    for(var x=0;x<=tabCounted;x++){
        if(//there was bug here - both times need to be checked if fit same green zone not 2 different
          startHour>=(parseInt(passedAray[x])+parseInt(min15gap)) && startHour<=passedAray[x+1] &&
          endHour>=(parseInt(passedAray[x])+parseInt(min15gap)) && endHour<=passedAray[x+1]
          ){
            x++;
            return [true,true];
        }else{
            x++;
        }
    }
    return [false,false];
}
