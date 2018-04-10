import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//#-------------------------------------------------------------- states controlling

// take textarea value
export function addTitle(event,roomData){
  var clickedButton=event.target;
  var textarea=document.getElementById('userAddingTitle');

  //check the input
  checkTitleField(textarea.value)

  return textarea.value;
}


// check if text is ok - no special chars
export function checkTitleField(text){

  var errorTarget=document.getElementById('errorHandlerTitle');
  var match=/^[a-zA-Z0-9 ]+$/;
  var result=match.test(text);

  callTitleError(result,errorTarget);

}


//display messages about title - ok or wrong
export function callTitleError(result,errorTarget){
  var error='';
  if(result==false){
    error=<div className="messageTextArea_Error">Invalid title </div>;
    sessionStorage.setItem('titleState',false);
  }else{
    error=<div className="messageTextArea_Ok">Title added </div>;
    sessionStorage.setItem('titleState',true);
  }

  ReactDOM.render(error,errorTarget);

  storeTitle();
}

export function storeTitle(){
 //
}
