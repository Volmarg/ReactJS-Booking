export function slideUpDown(event,data){
  var element=event.target;

  var h=window.innerHeight;
  var w=window.innerWidth;

  var filtered=data.replace('.','\\.')
  var roomPre='singleRoom-';

  if(w<=500){
    var id=roomPre+filtered;
    var grabRoom=document.getElementById(id);

    //check the sliding direction
    if(document.querySelector('#show-'+filtered).getAttribute('data-direction')!='up'){
        document.querySelector('#'+id+'>.roomButtons').style.display='inline';
        document.querySelector('#'+id+'>.moreAboutRoom p+p').style.display='inline';
        document.querySelector('#show-'+filtered).style.transform='rotate(180deg)';
        document.querySelector('#show-'+filtered).setAttribute('data-direction','up');
    }else{
        document.querySelector('#'+id+'>.roomButtons').style.display='';
        document.querySelector('#'+id+'>.moreAboutRoom p+p').style.display='';
        document.querySelector('#show-'+filtered).style.transform='rotate(0deg)';
        document.querySelector('#show-'+filtered).setAttribute('data-direction','down');
    }




  }

}

export function slideFilters(event){
  var element=event.target;

  var h=window.innerHeight;
  var w=window.innerWidth;

  var filters=document.querySelector('.FilterWrapper');

  if(w<=500){

    //check the sliding direction
    if(document.querySelector('#filterSlide').getAttribute('data-direction')!='up'){
        document.querySelector('.checkboxPlus').style.display='block';
        document.querySelector('.filtersBox li+li').style.display='block';
        document.querySelector('.FilterWrapper').style.height='300px';
        document.querySelector('.filter').style.top='40px';

        document.querySelector('#filterSlide').style.transform='rotate(180deg)';
        document.querySelector('#filterSlide').setAttribute('data-direction','up');
    }else{
        document.querySelector('.checkboxPlus').style.display='';
        document.querySelector('.filtersBox li+li').style.display='';
        document.querySelector('.FilterWrapper').style.height='';
        document.querySelector('.filter').style.top='';

        document.querySelector('#filterSlide').style.transform='rotate(0deg)';
        document.querySelector('#filterSlide').setAttribute('data-direction','down');
    }




  }

}
