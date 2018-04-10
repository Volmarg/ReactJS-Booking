import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {remapUsers} from './usersCtrl.js';
import {addTitle} from './titleCtrl';
import {addDescription} from './descriptionCtrl.js';
import {checkTimeField, valToTime} from './timeStoreCtrl.js';
import {estimatedTime,getTimesForm} from './formTimeReservation.js';

//#-------------------------------------------------------------- states controlling
var usersState=sessionStorage.getItem('usersState');
var descState=sessionStorage.getItem('descState');
var timeState=sessionStorage.getItem('timeState');
//#-------------------------------------------------------------- vars controlling
var users=sessionStorage.getItem('users');

//#----------------- Controlling entire Booking process

// main function for proccessing with booking
export function addBooking(event,roomData,count,range){
  var catchTimeResult=getTimesForm(roomData.name);
  var times=[catchTimeResult[0][0],catchTimeResult[0][1]];
  var desc=addDescription(event,roomData);
  var title=addTitle(event,roomData);

  checkBookingFields(roomData,desc,times,count,range,title);


}

// checking if all fields are provided before booking
export function checkBookingFields(roomData,text,times,count,range,title){
  var usersState=sessionStorage.getItem('usersState');
  var descState=sessionStorage.getItem('descState');
  var timeState=sessionStorage.getItem('timeState');
  var titleState=sessionStorage.getItem('titleState');

  estimatedTime(range,count,roomData.name,true);

  callBookingError(usersState,descState,timeState,roomData,text,times,titleState,title);

}

//show any informations about the booking proccess - fail/success messages
export function callBookingError(usersState,descState,timeState,roomData,text,times,titleState,title){

  var errorTarget=document.getElementById('errorHandlerBooking');

  var error='';

  if(usersState=='true' && descState=='true' && timeState=='true' && titleState=='true'){
    error=<div className="messageBooking_Ok">Booking added</div>;
    users=sessionStorage.getItem('users');
    storeBooking(text,roomData,users,times,title);
  }else{

    error=<div className="messageBooking_Error">Invalid data</div>;
  }

  ReactDOM.render(error,errorTarget);

}

//insert booking data into object
export function storeBooking(passDesc,passRoomInfo,passUsers,passTimes,title){

  var arrayOfReservations=[];
  var start=valToTime(passTimes[0],true);
  var end=valToTime(passTimes[1],true);

//convert prowided hours to UNIX timestamp
  var today = new Date();
  var startStamp = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), start[0], start[1], 0));
    startStamp=Math.round(startStamp/1000.0);

  var endStamp = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), end[0], end[1], 0));
    endStamp=Math.round(endStamp/1000.0);

//booking object
  var reservationObject={
  	booking: {
  		date: parseInt(Math.round(new Date().getTime()/1000.0)),
  		time_start: parseInt(startStamp),
  		time_end: parseInt(endStamp),
		  title: String(title),
  		description: String(passDesc),
  		room: passRoomInfo.name
  	 },
  	 passes: JSON.parse(passUsers)
  };



  //getFrom session
  var fromSessionReservations=JSON.parse(sessionStorage.getItem('reservations'));

  //if booking session is empty
  if(fromSessionReservations==null){
    arrayOfReservations.push(reservationObject);
    sessionStorage.setItem('reservations',JSON.stringify(arrayOfReservations));

  }else {//if there already are items - add new
    fromSessionReservations.push(reservationObject);
    sessionStorage.setItem('reservations',JSON.stringify(fromSessionReservations));
  }

  var fromSessionReservations=JSON.parse(sessionStorage.getItem('reservations'));

  console.log(fromSessionReservations);

}
