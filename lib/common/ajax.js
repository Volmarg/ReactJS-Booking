import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import registerServiceWorker from '../../registerServiceWorker';
import MainViewTop from '../../partials/mainView';

//#-------------------------------------------------------------- Sliders Library
import {drawLinesAndHours} from './others';

//#--------------------------------------------------------------- Main Components --------------------------------------------------------------------#\\
// Class for displaying errors when getting data from API fails
class ErorrHandle extends React.Component{
  render(){

    const styles={
      ajaxError:{
        textAlign:'center',
        border:'4px inset black'
      },
      lisiting:{
        listStyleType:'none',
        textAlign:'left',
        display:'flex',
        justifyContent:'space-around',
        flexWrap:'nowrap',
        flexDirection:'column',
        fontSize:'19px'
      },
      singleLi:{
        alignSelf:'center'
      }
    }

    var data=JSON.parse(this.props.errorData);

    return(
      <section style={styles.ajaxError}>
        <h1> API response </h1>
        <h2> Ajax Error </h2>
          <ul style={styles.lisiting}>
              <li style={styles.singleLi}><span><b>Description: </b></span>{data.error.text}</li>
              <li style={styles.singleLi}><span><b>Source: </b></span>{this.props.source}</li>
              <li style={styles.singleLi}><span><b>Code: </b></span>{data.error.code}</li>
          </ul>
        <h3> We are working on it! </h3>
      </section>
    )
  }
}

// load/reload main application
export function loadApp(input){
  var date=input;

  if(date==undefined){
    date="now";
  }

  axios.post('URL TO API WHICH IVE USED',{
      "date": date
    }).then(function (response) {
      var data=JSON.parse(response['request'].response);

      if(data.error==undefined){
        ReactDOM.render(<MainViewTop roomsData={response['request'].response}/>, document.getElementById('root'));
      }else {
        ReactDOM.render(<ErorrHandle errorData={response['request'].response} source="/getrooms"/>, document.getElementById('root'));
      }

    registerServiceWorker();
    drawLinesAndHours();

  })
}

// sendpass to user - from 1st bokking only
export function sendPass(){
  var reservations=JSON.parse(sessionStorage.getItem('reservations'));

  if(reservations!=undefined && reservations!=null){
    axios.post('URL TO API WHIH IVE USED',reservations[0]).then(function (response) {
        var data=JSON.parse(response['request'].response);

        if(data.success==true){
          alert('Pass sending completed')

        }else if(data.error!=undefined && data.error!=null) {

          alert('Pass sending error - process aborted, please check Your reservation data')
        }

    })

  }else{
    alert('no Booking was made');
  }
}
