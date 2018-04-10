import React, { Component } from 'react';
import '../styles/lightboxView.css';

import LightboxRoomView from './lightboxRoomInfo';
import LightboxReserveRoom from './lightboxReserve';

//build lightbox - decide what type
class LightboxBuilder extends React.Component{
  render(){
    var type;
    if(this.props.type=='roomView')
    {
      type=<LightboxRoomView num={this.props.num} func={this.props.func} roomData={this.props.roomData} count={this.props.count} defaultValue={this.props.defaultValue} funcHourLine={this.props.funcHourLine} type={this.props.type}/>
    }else {
      type=<LightboxReserveRoom num={this.props.num} func={this.props.func} roomData={this.props.roomData} count={this.props.count} defaultValue={this.props.defaultValue} funcHourLine={this.props.funcHourLine} type={this.props.type}/>
    }
    return(
      type
    )
  }
}

export default LightboxBuilder;
