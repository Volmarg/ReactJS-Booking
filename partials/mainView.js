//#------------------------------------------------------------------------- Build library 

//#-------------------------------------------------------------- Callendar Library
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import { defaultHeaderLabelFormats, defaultSubHeaderLabelFormats } from 'react-calendar-timeline'

import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput'

//#-------------------------------------------------------------- Sliders Library
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import {railColoring} from '../lib/common/sliders';
import {rangesCalculations} from '../lib/common/sliders'
import {drawLinesAndHours} from '../lib/common/others';
//#-------------------------------------------------------------- Base Library
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//#-------------------------------------------------------------- Lightboxes Library
import LightboxBuilder from './lightboxView';
import getLightbox from './lightboxView';

import {buildLightbox, killLightbox, grabLightbox, selectTypeofBox} from '../lib/main/lightboxCtrl';
//#-------------------------------------------------------------- Stylesheets
import '../styles/mainView.css';
import '../styles/RWD.css';
import 'react-day-picker/lib/style.css';
import '../styles/callendar_slider_.css';

//#-------------------------------------------------------------- Specific libs for main View
import {freeRoomsSearch} from '../lib/main/filters';

//#-------------------------------------------------------------- Time library
import {timeToValue,valToTime} from '../lib/lightbox/timeStoreCtrl';

//#-------------------------------------------------------------- InterfaceHandling
import {slideUpDown, slideFilters} from '../lib/interface/mainView';

//#------------------------------------------------------------------------- Build Page -------------------------------------------------------------------------#\\

//#-------------------------------------------------------------- Mapping
var arrayOfRanges={};

//#----------------- Closing lightbox on ESC + X
window.addEventListener("keydown", killLightbox, false);

//#--------------------------------------------------------------Callendar Controlling (externall lib)
const DAY_FORMAT = 'MM/DD/YYYY';

class DateCaller extends React.Component {
  state = {
    selectedDay: undefined,
    isDisabled: false,
  };

  handleDayChange = (selectedDay, modifiers) => {
    this.setState({
      selectedDay,
      isDisabled: modifiers.disabled,
    });
  };

 componentDidMount(){
  var target=document.querySelector('.DayPickerInput>input');
  var stamp,pickedDate='';

 //#----------------- Document reload on date change
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      pickedDate=target.value;
      pickedDate=new Date(pickedDate);

      if(target!=undefined && target!=false && target!=null && target!=''){
        stamp=Math.round(pickedDate.getTime()/1000.0);
        loadApp(stamp);
      }
    });
  });

  var config = { attributes: true, childList: false, characterData: false };
  observer.observe(target, config);


 }

  render() {
    const { selectedDay, isDisabled } = this.state;
    const formattedDay = selectedDay
      ? moment(selectedDay).format(DAY_FORMAT)
      : '';

    const dayPickerProps = {
      todayButton: 'Go to Today',
      disabledDays: {
        daysOfWeek: [0, 6],
      },
      enableOutsideDays: true,
      modifiers: {
        monday: { daysOfWeek: [1] },
      },
    };
    return (
      <div id="selectedDay">
        <span><span className="glyphicon glyphicon-calendar"></span></span>
        <DayPickerInput
          value={formattedDay}
          onDayChange={this.handleDayChange}
          format={DAY_FORMAT}
          placeholder={new Date().getDay()+'/'+new Date().getMonth()+'/'+new Date().getFullYear()}
          dayPickerProps={dayPickerProps}
        />
      </div>
    );
  }
}

//#-------------------------------------------------------------- Partial classes

class TopNav extends React.Component {
  render(){
    var rooms=this.props.rooms;
    return(
      <section>
        <nav className="topNav" >
            <div className="datePick">
                <span className="holder"><DateCaller/></span>
            </div>
        </nav>
      </section>
    );
  }
}

class RoomListing extends React.Component{
 //-----------------------------States controll
  constructor(){
      super();
      this.state={
        roomName:'',
        roomSize:'',
        hours:false,
        arrayOfRanges:'',
        var:''
      }
      this.drawRooms = this.drawRooms.bind(this);
    }

  componentDidUpdate(){
        drawLinesAndHours();

    }

  componentDidMount(){

  }

  filterByNames(event){
      this.setState({
        roomName:event.target.value
      });
  }

  filterBySize(event){
      this.setState({
        roomSize:event.target.value
      });
  }

  checkFreeRooms(event){

    if(event.target.checked){
      this.setState({
        hours:true
      });

    }else{
      this.setState({
        hours:false
      });

    }

  }

  updateRoomListing(data){
      /*  this.setState({
          var:data
        })*/
        sessionStorage.removeItem('reservations');
        alert('this.state.var');
    }

//--------------------------- Other functions

  drawRooms(){

    var filterByRoomName=this.state.roomName;
    var filterByRoomSize=this.state.roomSize;
    var filterByRoomTime=this.state.hours;
    var rooms=this.props.rooms;
    var roomsCheck=this.checkFreeRooms;
    var ranges=this.state.arrayOfRanges;
    rooms=JSON.parse(rooms);

    var drawRoom=Object.keys(rooms).map(
      function(x){

        var dataId=x+rooms[x].name;
        var idButton='show-'+dataId;
        var idSection='singleRoom-'+dataId;

        var callInfo="callRoomInfo-"+x;
        var callReserve="callRoomReserve-"+x;
        var buildOneRoom='';

        var domain='https://challenges.1aim.com/roombooking/';
        var Images=rooms[x].images[0];


        ranges=rangesCalculations(rooms[x].avail)

        if(
          (rooms[x].name.indexOf(filterByRoomName)!='-1' || filterByRoomName  =='') &&
          (parseInt(rooms[x].size)>=filterByRoomSize || filterByRoomSize  =='') &&
          freeRoomsSearch(ranges.ranges,ranges.count,filterByRoomTime)==true
        ){

            buildOneRoom=<section className="singleRoomBox borderNshadow" id={idSection}>

                <section className="smallRoomInfo">
                  <div className="roomName">
                    Room: {rooms[x].name}
                  </div>
                  <div className="Hours" >

                  <Range

                    count={ranges.count}
                    defaultValue={ranges.ranges}
                    allowCross={false}
                    disabled={true}
                    railStyle={{backgroundColor:'rgb(185, 53, 56)'}} //the one in back
                    trackStyle={railColoring(ranges.count,ranges.ranges)} //the selected ranges
                    marks={{25200000:'7:00',68400000:'19:00'}}
                    min={25200000}
                    max={68400000}
                  />

                    <span className="hoursHolder"></span>

                  </div>


                </section>

                <section className="moreAboutRoom">
                <div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br/>Location: <b>{rooms[x].location}</b>, Size:<b>{rooms[x].size}</b></p>
                </div>
                  <img src={domain+Images}/>
                </section>

                <section className="roomButtons">
                    <ul>
                      <li onClick={(evt)=>grabLightbox(evt,rooms[x])} id={callInfo} data-num={x} data-count={ranges.count} data-range={ranges.ranges}>Show more</li>
                      <li onClick={(evt)=>grabLightbox(evt,rooms[x])} id={callReserve} data-num={x} data-count={ranges.count} data-range={ranges.ranges}>Book</li>
                    </ul>
                </section>
                <div className="slideDown" onClick={(evt)=>slideUpDown(evt,dataId)} id={idButton} data-direction="down"><span> V</span> </div>
            </section>;
          }

            return buildOneRoom;
        }
    )
    return drawRoom;
  }

  render(){

    return (
      <div id="contentDisplay">
        <UpperFilters onChangefuncRooms={this.filterByNames.bind(this)} onChangefuncSize={this.filterBySize.bind(this)} onClickFuncTime={this.checkFreeRooms.bind(this)}/>
        <div id="roomsHolder">
          {this.drawRooms()}
        </div>
        <FooterContent/>
      </div>
        );
      }
  }

class MainContent extends React.Component {
  render(){
    var rooms=this.props.rooms;
    return(
      <section className="mainContent" id="mainContent">
        <section id="lightboxCaller"></section>
          <RoomListing rooms={rooms}/>
      </section>
    );
  }
}

class UpperFilters extends React.Component{
  render(){
    var filterRoom=this.props.onChangefuncRooms;
    var filterSize=this.props.onChangefuncSize;
    var filterHours=this.props.onClickFuncTime;
    return(
      <footer className="FilterWrapper">
          <div className="filtersBox">
            <p> Filters </p>
              <ul>
                <li><label></label><input type="text" placeholder="Insert room name" onChange={filterRoom}/></li>
                <li><label></label><input type="text" placeholder="Minimum size required" onChange={filterSize}/></li>
              </ul>

              <div className="checkboxPlus">
                <input value="1" id="checkboxNew" name="" type="checkbox" onClick={filterHours}/>
                <label for="checkboxNew"></label>
                <p>Show currently free rooms</p>
              </div>
          </div>

          <div className="slideDown filter" id="filterSlide" data-direction="down" onClick={(evt)=>slideFilters(evt)}><span>V</span></div>

      </footer>
    )
  }
}

class FooterContent extends React.Component{
  render(){

    return(
      <footer className="footer">
            <button className="SendPass" onClick={sendPass}>CheckPass</button>
      </footer>
    )
  }
}

class mainViewTop extends React.Component {
  render(){
    var rooms=this.props.roomsData;
    return(
      <div>
        <TopNav/>
        <MainContent rooms={rooms}/>
      </div>
    );
  }
}

export default mainViewTop;
