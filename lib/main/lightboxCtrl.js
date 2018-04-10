//#-------------------------------------------------------------- Base Library
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import LightboxBuilder from '../../partials/lightboxView';
import {railColoring} from '../common/sliders';
import {loadApp} from '../common/ajax';
//#-------------------------------------------------------------- litbox controlling

//render lightbox
export function buildLightbox(type){
  document.getElementById('lightboxBack').className+='lightboxBack';
  ReactDOM.render(type, document.getElementById('lightboxCaller'));

  document.getElementById('roomsHolder').style.display="none";
  document.querySelector('.FilterWrapper').style.display="none";
  document.querySelector('.FilterWrapper').style.display="none";
  document.querySelector('.topNav').style.display="none";
  document.querySelector('footer.footer').style.display="none";
}

//close the lightbox
export function killLightbox(buttonPressed){
  if(buttonPressed.keyCode===27 || buttonPressed.keyCode===undefined){
    var target=document.getElementById('lightboxCaller');
    var child=document.getElementById('lightboxSuper');

    child.className+='fadeOut';
    document.getElementById('lightboxBack').className+='fadeOut';

    setTimeout(
      function(){
        document.getElementById('lightboxBack').className='';
        target.removeChild(child);

        document.getElementById('roomsHolder').style.display="";
        document.querySelector('.FilterWrapper').style.display="";
        document.querySelector('.FilterWrapper').style.display="";

        document.querySelector('.topNav').style.display="";
        document.querySelector('footer.footer').style.display="";
      },500
    );

  }

}

//get data for building lightbox
export function grabLightbox(event,roomData){

  var grabbed=event.target;
  var fetchedData=grabbed.getAttribute('data-num');
  var type='';
  var count=grabbed.getAttribute('data-count');
  var ranges=grabbed.getAttribute('data-range');

   type=selectTypeofBox(fetchedData,grabbed, roomData,count,ranges);

    type=<div id="lightboxSuper">
      <section className="killLightbox"  onClick={killLightbox}>✖</section>
      {type}
    </div>;

    buildLightbox(type);
}

//decide what lightbox should be created
export function selectTypeofBox (fetchedData,grabbed, roomData,count,ranges){
  var type='';
  if(grabbed.innerHTML=='Show more'){
    type=<LightboxBuilder type="roomView" num={fetchedData} func={grabLightbox} roomData={roomData} count={count} defaultValue={ranges} funcHourLine={railColoring}/>;
  }else{
    type=<LightboxBuilder type="roomReserve" num={fetchedData} func={grabLightbox} roomData={roomData} count={count} defaultValue={ranges} funcHourLine={railColoring}/>;
  }


  return type;
}
