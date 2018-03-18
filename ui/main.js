var button=document.getElementById('b1');
//var counter=0;
b1.onclick=function(){
  
  //making request object
  var request=new XMLHttpRequest();
  
  
  //response check
  request.onreadystatechange=function(){
      if(request.readyState==XMLHttpRequest.DONE)
      {
          if(request.status==200)
          {
              var counter=request.responseText;
              var span=document.getElementById('count');
              span.innerHTML=counter.toString();
          }
      }
  };
  /*
  //only for incrementing counter variable when we click on button but changing counter endpoint in server
  counter=counter+1;
  var span=document.getElementById('count');
  span.innerHTML=counter.toString();
  */
    
    //making request
    request.open('GET','https://alishakareem13.imad-hasura-app.io/counter',true);
    request.send(null);
};