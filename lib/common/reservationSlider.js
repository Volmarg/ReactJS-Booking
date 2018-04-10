import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';
import {extractNumbers, isReservationOk, valToTime} from '../lightbox/timeStoreCtrl';
import {estimatedTime} from '../lightbox/formTimeReservation';

//#-------------------------------------------------------------- Main lib

//creating slider reservation
export function callReserveSlider(event,id,roomName){
  var from=document.getElementById('registerFromTime');
  var to=document.getElementById('registerToTime');

  var target=document.getElementById(id);
  var grabbed=event.target;
  var count=grabbed.getAttribute('data-count');
  var ranges=grabbed.getAttribute('data-range');

  ReactDOM.render(
    <span id="slideWrap">
      <section className="killSlider" onClick={()=>killSlider(id,from,to)}>✖</section>
        <div id="leftValueHolder">{valToTime(35200000)}</div>
        <div id="rightValueHolder">{valToTime(48400000)}</div>
      <Range

        count={1}
        allowCross={false}
        defaultValue={[35200000,48400000]}

        step={1}

        pushable

        railStyle={{backgroundColor:'none', opacity:'0'}} //the one in back
        trackStyle={{backgroundColor:'blue'}} //the selected ranges
        marks={{25200000:'7 am.',68400000:'7 pm.'}}
        min={25200000}
        max={68400000}
      />


    </span>
      ,target);
      lockForm(from,to);

  observerLow(ranges,count,roomName);
  observerHigh(ranges,count,roomName);
}

//closing slider
function killSlider(id,from,to){
  var target=document.getElementById(id);
  var child=document.getElementById('slideWrap');
  target.removeChild(child);

  unlockForm(from,to);

}

//checking if room can be reserved
function canTake(id,count,ranges){
  var startMark=document.getElementById(id).querySelector('.rc-slider-handle-1');
  var endMark=document.getElementById(id).querySelector('.rc-slider-handle-2');

  var startValue=startMark.getAttribute('aria-valuenow');
  var endValue=endMark.getAttribute('aria-valuenow');

  var states=isReservationOk([parseInt(startValue),parseInt(endValue)],count,ranges,true);
  alert(states);

}

//Lock hours form while using the slider
function lockForm(from,to){
  from.setAttribute('disabled','');
  to.setAttribute('disabled','');
}

//Ulock hours form if slider was removed
function unlockForm(from,to){
  from.removeAttribute('disabled','');
  to.removeAttribute('disabled','');
}

function createValueDisplay(){
  var targetStart=document.getElementById('slideWrap').querySelector('.rc-slider>.rc-slider-handle-1');
  var targetEnd=document.getElementById('slideWrap').querySelector('.rc-slider>.rc-slider-handle-2');

  // Create element for display
  function createElement(id){

  }

}

//create observers for sliders
function observerLow(ranges,count,roomName){
  var target=document.getElementById('slideWrap').querySelector('.rc-slider>.rc-slider-handle-1');

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var value=target.getAttribute('aria-valuenow');
      var style=target.getAttribute('style');
        document.getElementById('registerFromTime').value=valToTime(value);
          document.getElementById('leftValueHolder').innerHTML=valToTime(value);
          document.getElementById('leftValueHolder').setAttribute('style',style);
      estimatedTime(ranges,count,roomName);
    });
  });

  var config = { attributes: true, childList: false, characterData: false };
  observer.observe(target, config);

}

function observerHigh(ranges,count,roomName){
  var target=document.getElementById('slideWrap').querySelector('.rc-slider>.rc-slider-handle-2');

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var value=target.getAttribute('aria-valuenow');
      var style=target.getAttribute('style');
        document.getElementById('registerToTime').value=valToTime(value);
          document.getElementById('rightValueHolder').innerHTML=valToTime(value);
          document.getElementById('rightValueHolder').setAttribute('style',style);
      estimatedTime(ranges,count,roomName);
    });
  });

  var config = { attributes: true, childList: false, characterData: false };
  observer.observe(target, config);

}
