import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//#-------------------------------------------------------------- states controlling
var usersState=sessionStorage.getItem('usersState');

//#----------------- Controlling description of Booking
var users=sessionStorage.getItem('users');
//main function for usser adding process
export function addUser(){

  //fetching
  var name=document.getElementById('userAddingName').value;
  var email=document.getElementById('userAddingEmail').value;
  var phone=document.getElementById('userAddingPhone').value;

  //testing validation
  var emailValidateMatch  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var charactersValidateMatch=/^[a-zA-Z ]+$/;
  var phoneCheck='';

    function validatePhone(phone){
      var match=/^(\+[0-9]+)$/;
        if(match.test(phone)){

          return [phone,true];
        }else if(isNaN(phone)){

          return [phone,false];
        }else{
          phone=String('49'+phone);
          return [phone,true];
        }

    }
    if(phone!='' && phone!=null && phone!=undefined){
        phoneCheck=validatePhone(phone);
        phone=phoneCheck[0];
    }else{
        phoneValidation=false;
    }

  var emailValidation=emailValidateMatch.test(email);
  var phoneValidation=phoneCheck[1]; if(phone==''){phoneValidation=false}; //fix for input type - if numeric then upon entering !numer returns nothing
  var nameValidation=charactersValidateMatch.test(name);
  //decide if errors
  if(emailValidation==false || phoneValidation==false || nameValidation==false){
    callError(emailValidation,phoneValidation,nameValidation);
    //addNreloadUsers(name,email,phone);
  }else {
    callError(emailValidation,phoneValidation,nameValidation);
    addNreloadUsers(name,email,phone);
  }
}

//map users from session to display them in box
export function remapUsers(users){
    if(users!=null && users!=false && users!=undefined && users!=''){
      var mapUsers=Object.keys(users).map(
        function(x){
            var builded=
              <div className="singleUser">
                <span>Name: {users[x].name} </span>
                <span>E-mail: {users[x].email} </span>
                <span>Phone: {users[x].number}</span>
                <span className="remove" onClick={removeUser} data-removal={users[x].name+'_'+users[x].number}> ✖ </span>
              </div>
            ;
            return builded;
        }
      );
    }else {
      mapUsers='';
    }

    return mapUsers;
  }

//show information about usser adding
export function callError(emailValidation,phoneValidation,nameValidation){
  var mailError,phoneError,nameError='';
  //Build texts
  if(emailValidation==false){mailError=<p className="errorMessage">Wrong email!</p>;};
  if(phoneValidation==false){phoneError=<p className="errorMessage">Wrong phone number</p>;};
  if(nameValidation==false){nameError=<p className="errorMessage">Wrong name</p>;};

  //concat
  var errorText=
  <div className="errorsWrapper">
    {mailError}
    {phoneError}
    {nameError}
  </div>;

  if(emailValidation==true && phoneValidation==true && nameValidation==true){
    errorText=<div className="succesWrapper">
        <p className="successMessage">User added succesfully</p>
      </div>;
  sessionStorage.setItem('usersState',true);
  }
 
  //errors for userAdding
  ReactDOM.render(errorText,document.getElementById('errorHandler'));
}

//add users to session object and reload
export function addNreloadUsers(name,email,phone){

  //data from form
    var preparedJSON={
      name:name,
      email:email,
      number:parseInt(phone)
    };
     var stringJSON_new=JSON.stringify(preparedJSON);

  //get curr Values for testing
     var oldStorage_current=sessionStorage.getItem('users');
     if(oldStorage_current!=null){
       oldStorage_current=oldStorage_current.replace(/\[/g,'');
       oldStorage_current=oldStorage_current.replace(/\]/g,'');
     }

  //check if that's 1st add or object are in storage
       if(oldStorage_current==null || oldStorage_current==undefined || oldStorage_current==''){
         sessionStorage.setItem('users','['+stringJSON_new+']');
       }else{
         var StringedJSON_new='['+oldStorage_current+','+stringJSON_new+']';

         sessionStorage.setItem('users',StringedJSON_new);
       }

  //get curr Values for mapping contacts
    users=JSON.parse(sessionStorage.getItem('users'));

  //map storage to listsing
     var mapUsers=remapUsers(users);
     var element=React.createElement('span',{className:''},mapUsers);
     return ReactDOM.render(element,document.getElementById('userListing'));

}

//remove users
export function removeUser(event){
  //get
  var id=event.target.getAttribute('data-removal');
  var removeIndex='';

  //compare pressed button with user in array
  Object.keys(users).forEach(function(value,index){
          if(parseFloat(users[index].id)==parseFloat(id)){
            removeIndex=index;
          }
        }
      )

  //remove from array of users
  if(users.length!=1){
    delete users.splice(removeIndex,1);
    var stringedJSON=JSON.stringify(users);
    sessionStorage.setItem('users',stringedJSON);
    users=JSON.parse(sessionStorage.getItem('users'));
  }else {
    sessionStorage.setItem('users','');
    users=sessionStorage.getItem('users');
  }

  //refresh
   var mapUsers=remapUsers(users);
   var element=React.createElement('span',{className:''},mapUsers);
   ReactDOM.render(element,document.getElementById('userListing'));

   //prepare message
   var errorText=<div className="removeWrapper">
       <p className="removedMessage">User Removed</p>
     </div>;

   ReactDOM.render(errorText,document.getElementById('errorHandler'));
}
