import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//#-------------------------------------------------------------- states controlling
var descState=sessionStorage.getItem('descState');

//#----------------- Controlling description of Booking

// take textarea value
export function addDescription(event,roomData){
  var clickedButton=event.target;
  var textarea=document.getElementById('userAddingDescription');

  //check the input
  checkDescriptionField(textarea.value)

  return textarea.value;
}

// check if text is ok - no special chars
export function checkDescriptionField(text){

  var errorTarget=document.getElementById('errorHandlerDescription');
  var match=/^[a-zA-Z0-9 ]+$/;
  var result=match.test(text);

  callDescriptionError(result,errorTarget);

}

//display messages about description - ok or wrong
export function callDescriptionError(result,errorTarget){
  var error='';
  if(result==false){
    error=<div className="messageTextArea_Error">Invalid description </div>;
    sessionStorage.setItem('descState',false);
  }else{
    error=<div className="messageTextArea_Ok">Description added </div>;
    sessionStorage.setItem('descState',true);
  }

  ReactDOM.render(error,errorTarget);

  storeDescription();
}

export function storeDescription(){
 //
}
