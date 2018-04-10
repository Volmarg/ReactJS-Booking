//#------------------------------------------------------------------------- Build library -------------------------------------------------------------------------#\\

import React, { Component } from 'react';

//#-------------------------------------------------------------- Sliders Library
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import {callReserveSlider} from '../lib/common/reservationSlider.js';
import {drawLinesAndHours} from '../lib/common/others';
//#-------------------------------------------------------------- Common part for both lightboxes types
class SmallRoomInfo extends React.Component{

      componentDidMount(){
        drawLinesAndHours(true);
      }

  render(){
      //rebuild string of nums into array for Range slider
      var str=this.props.defaultValue;
      var ranges=str.split(",");
      var callId="reservationSlider-"+this.props.roomData.name;
      var callSlider='';

      if(this.props.type=='roomReserve'){
          callSlider=<span className="hoursHolder"  onClick={(evt)=>callReserveSlider(evt,callId,this.props.roomData.name)} data-count={this.props.count} data-range={ranges}></span>;
      }

    return (
      <section className="smallRoomInfo topDown">
          <div className="roomName">
            Room: {this.props.roomData.name}
          </div>

          <div className="Hours">

            <Range
              count={this.props.count}
              defaultValue={ranges}
              allowCross={false}
              disabled={true}

              railStyle={{backgroundColor:'rgb(185, 53, 56)'}} //the one in back
              trackStyle={this.props.funcHourLine(this.props.count,ranges)} //the selected ranges

              marks={{25200000:'7:00',68400000:'19:00'}}
              min={25200000}
              max={68400000}
            />

            {callSlider}
          </div>
          <div className="reservationSlider" id={callId}>
          </div>
      </section>

    );
  }

}

export default SmallRoomInfo;
