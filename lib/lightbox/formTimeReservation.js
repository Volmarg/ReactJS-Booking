import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {extractNumbers, isReservationOk, timeStoreCtrl, timeToValue, valToTime} from './timeStoreCtrl.js';

//#-------------------------------------------------------------- states controlling
var timeState=sessionStorage.getItem('timeState');

//Here the time is taken from the one of inputs on the Booking lightbox
export function getTimesForm(roomName){
  //Forms
  var from=document.getElementById('registerFromTime');
  var to=document.getElementById('registerToTime');
  var fromVal,toVal='';

  //checking which source of bookingTime is the prime
  if(from.getAttribute('disabled')=='' || to.getAttribute('disabled')==''){
    //Slider
    var id='reservationSlider-'+roomName;

    var startMark=document.getElementById(id).querySelector('.rc-slider-handle-1');
    var endMark=document.getElementById(id).querySelector('.rc-slider-handle-2');

    fromVal=startMark.getAttribute('aria-valuenow');
    toVal=endMark.getAttribute('aria-valuenow');

  }else{
    fromVal=document.getElementById('registerFromTime').value;
    toVal=document.getElementById('registerToTime').value;

  }

  //return array of hours range
    var arrayOfTimes=[
      {
        'from':fromVal,
        'to':toVal
      }
    ];

    var returnable=toConvert(arrayOfTimes);
    return returnable;

}

//Here is calculated estimated time for form input
export function estimatedTime(range,count,roomName,skip){

    var arraysOfTimes=getTimesForm(roomName);
    var target=document.getElementById('estimatedTimeForm');
    var hours,strRange,text,inputFormat='';

    hours=arraysOfTimes[0];
    strRange=arraysOfTimes[1];
    inputFormat=arraysOfTimes[2];

  if(inputFormat!=false){
    var states=isReservationOk(strRange,count,range,true);

        if(hours[0]>hours[1]){ //---------------------------check if hour.from is later than hour.to
            text='1st time bigger than 2nd!'
            target.value=text;
            sessionStorage.setItem('timeState',false);
            callTimeError(text,false)

        }else if(states[0]==true && states[1]==true){ //-----check if room can be reserved atm
            var diff=hours[1]-hours[0];
            target.value=valToTime(diff);
            sessionStorage.setItem('timeState',true);
            callTimeError(text,true)

        }else{
            text='Romm is not free!'
            target.value=text;
            sessionStorage.setItem('timeState',false);
            callTimeError(text,false)
        }
  }else{
          text='Wrong time range';
          target.value=text;
          sessionStorage.setItem('timeState',false);
          callTimeError(text,false)
  }

}

//Here are the errors displayed in placeholder and text box upon time input
function callTimeError(text,state){
  var error2='';
  var errorHolder2=document.getElementById('errorHandlerTime');

  if(state==true){
    error2=<div className="messageTime_Ok">Time range ok</div>;
  }else{
    error2=<div className="messageTime_Error">{text}</div>;
  }

  ReactDOM.render(error2,errorHolder2);
}

//Here it is decided if the input is [HH:MM] or in miliseconds
function toConvert(times){
  var match=/^([0-9]+\:[0-9]{2})$/;  //match for Hour type
  var match2=/^([0-9]+[\.]?[0-9]+)$/ //match for milisecond type
  var strRange,hours,inputFormat,strConvert='';

  //checks if the format is 'HH:MM' or 'Numeric'
  if(match.test(times[0].from) && match.test(times[0].to)){
      strConvert=[String(times[0].from)+'-'+String(times[0].to)];

      hours=extractNumbers(strConvert);// <-- this returns false if hour is out of range

      //in case user entered hours like 44:80
      if(hours==false){
        inputFormat=false;
      }else{
        strRange=[String(hours[0]),String(hours[1])];
        inputFormat=true;
      }

    }else if(match2.test(times[0].from) && match2.test(times[0].to)){
      hours=[times[0].from,times[0].to];
      strRange=[parseInt(times[0].from),parseInt(times[0].to)];
      inputFormat=true;

      //if input is generally wrong then false it all
    }else{
      hours=false;
      strRange=false;
      inputFormat=false;
    }
      //Return set of hour ranges
  return [hours,strRange,inputFormat];

}
