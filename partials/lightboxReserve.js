//#------------------------------------------------------------------------- Build library -------------------------------------------------------------------------#\\
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SmallRoomInfo from './lightboxCommon';

//#-------------------------------------------------------------- register Booking lib
import {estimatedTime} from '../lib/lightbox/formTimeReservation.js';
import {remapUsers, callError, addNreloadUsers, addUser, removeUser} from '../lib/lightbox/usersCtrl.js';
import {addBooking, checkBookingFields, callBookingError, storeBooking} from '../lib/lightbox/bookingCtrl.js';
import {addDescription, checkDescriptionField, callDescriptionError, storeDescription} from '../lib/lightbox/descriptionCtrl.js';
import {addTime, checkTimeField, storeTime, extractNumbers, hoursToUNIX, isReservationOk, isFreeSpace} from '../lib/lightbox/timeStoreCtrl.js';

//#-------------------------------------------------------------- states controlling
sessionStorage.setItem('usersState',false);
sessionStorage.setItem('descState',false);
sessionStorage.setItem('timeState',false);
sessionStorage.setItem('titleState',false);

var userAddingErrorState=sessionStorage.getItem('usersState');
var descriptionAddingErrorState=sessionStorage.getItem('descState');

//#------------------------------------------------------------------------- Build Page -------------------------------------------------------------------------#\\

//#-------------------------------------------------------------- Partial classes
//reservation form on left
class ReservationForm extends React.Component{
  constructor(props) {
    super(props);
    this.aaaa = 'test';
  }

  render(){
    return(
      <div>
        <p>
          Room reservation
        </p>

        <form>
          <ul>
            <li>  <label>From:            </label><input type="text" id="registerFromTime" onChange={()=>estimatedTime(this.props.range,this.props.count)} placeholder="HH:MM"/>             </li>
            <li>  <label>To:              </label><input type="text" id="registerToTime" onChange={()=>estimatedTime(this.props.range,this.props.count)} placeholder="HH:MM"/>             </li>
            <li>  <label>Estimated time:  </label><input type="text" disabled id="estimatedTimeForm" placeholder="Reservation time"/>   </li>
          </ul>
        </form>

      <section id="errorHandlerTime"></section>
      </div>
    )
  }
}

//user form on right
var rightPart=(
  <div className="right">
      <p>
        Add users:
      </p>

      <form>
        <ul>
          <li>  <label>Name:   </label><input type="text" id="userAddingName"    data-room='' placeholder="Insert your name"/>    </li>
          <li>  <label>E-mail: </label><input type="email" id="userAddingEmail"  data-room='' placeholder="Insert your Email"/>   </li>
          <li>  <label>Phone:  </label><input type="text" id="userAddingPhone" data-room='' placeholder="Insert your phone number"/>  </li>
        </ul>
      </form>
    <section className="roomButtons">
        <ul>
          <li onClick={addUser}>Add user</li>
        </ul>
    </section>
    <section id="errorHandler">
    </section>
  </div>
);

//list of users on bottom
var registeredUsers=(
  <section className="usersList topDown" id="userListing">

  </section>
)

//central part with description box
var centerPart=(
  <form className="eventDescription">
    <textarea id="userAddingTitle" placeholder="Enter event name"></textarea>
    <textarea id="userAddingDescription" placeholder="Describe the room reservation reason"></textarea>
    <section id="errorHandlerTitle"></section>
    <section id="errorHandlerDescription"></section>
    <section id="errorHandlerBooking"></section>
  </form>
);

//main component for lightbox creation
class LightboxReserveRoom extends React.Component{

  componentDidMount(){
    sessionStorage.removeItem('users');
  }

  render(){
    return(
      <section className="lightboxWrapper">
        <section className="lightbox">
          <SmallRoomInfo roomData={this.props.roomData} count={this.props.count} defaultValue={this.props.defaultValue} funcHourLine={this.props.funcHourLine} type={this.props.type}/>
                  <section className="moreAboutRoom">
                    <div className="left">
                      <ReservationForm count={this.props.count} range={this.props.defaultValue} roomData={this.props.roomData}/>
                    </div>

                    <div className="center">

                      {centerPart}

                      <section className="roomButtons">
                          <ul>
                            <li data-num={this.props.num} onClick={(evt)=>this.props.func(evt,this.props.roomData)} data-count={this.props.count} data-range={this.props.defaultValue} funcHourLine={this.props.funcHourLine}>Show more</li>
                            <li onClick={(evt) => addBooking(evt, this.props.roomData,this.props.count,this.props.defaultValue)}>Save reservation</li>
                          </ul>
                      </section>

                    </div>

                    {rightPart}
                  </section>
                  {registeredUsers}
        </section>
      </section>
    );
  }
}

export default LightboxReserveRoom;
