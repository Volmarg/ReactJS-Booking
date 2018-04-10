//#------------------------------------------------------------------------- Build library -------------------------------------------------------------------------#\\
import React, { Component } from 'react';
import SmallRoomInfo from './lightboxCommon';

//#--------------------------------------------------------------Lightboxes Controlling

//#------------------------------------------------------------------------- Build Page -------------------------------------------------------------------------#\\
//the part with room informations - full of text
class LeftPart extends React.Component{
  render(){
    var equipement=this.props.roomData.equipment;
    return(
      <div className="left">

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <ul className="singleRoomInfoList">
          <li><b>Location:</b>         {this.props.roomData.location}</li>
          <li><b>Size:</b>             {this.props.roomData.size}</li>
          <li><b>Capacity:</b>         {this.props.roomData.capacity} </li>
          <li><b>Equipment:</b>        <ul className="equipementListing">{Object.keys(equipement).map(function(x){ return <li>{equipement[x]}</li>; })}</ul></li>
        </ul>

      </div>
    )
  }

}

//the part with photos
class RightPart extends React.Component{
  render(){
    var domain='URL TO API WHICH IVE WORKED WITH';
    var Images=this.props.roomData.images;
    return(
      <div className="right">
      {
        Object.keys(Images).map(
          function(x){
            return <img src={domain + Images[x]} />
          }
        )
      }
      </div>
    );
  }
}

//buttons part
class Buttons extends React.Component{
  render(){
    return(
      <section className="roomButtons">
          <ul>
            <li data-num={this.props.num} onClick={(evt)=>this.props.func(evt,this.props.roomData)} data-count={this.props.count} data-range={this.props.defaultValue}>Book</li>
          </ul>
      </section>
    );
  }
}

//main component for lightbox creation
class LightboxRoomView extends React.Component{
  render(){
    return(
      <section className="lightboxWrapper">
        <section className="lightbox">
          <SmallRoomInfo num={this.props.num} roomData={this.props.roomData} count={this.props.count} defaultValue={this.props.defaultValue} funcHourLine={this.props.funcHourLine} type={this.props.type}/>
                  <section className="moreAboutRoom">
                    <div className="roomInfoLightbox">
                      <LeftPart num={this.props.num} roomData={this.props.roomData}/>
                      <RightPart num={this.props.num} roomData={this.props.roomData}/>
                    </div>
                    <Buttons num={this.props.num} func={this.props.func} roomData={this.props.roomData} count={this.props.count} defaultValue={this.props.defaultValue}/>
                  </section>
        </section>
      </section>
    );
  }
}

export default LightboxRoomView;
