var button=document.getElementById('b1');
//var counter=0;
b1.onclick=function(){
  
  //making request object
  var request=new XMLHttpRequest();
  
  
  //response check
  request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status===200)
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
    request.open('GET','http://alishakareem13.imad.hasura-app.io/counter',true);
    request.send(null);
};

//cpturing name

var sub=document.getElementById('id4');

sub.onclick=function(){  
   //making request object
  var request=new XMLHttpRequest();
  
  
  //response check
  request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status===200)
          {
             var names=request.responseText;
             names=JSON.parse(names);
             var list='';
            for(var i=0;i<names.length;i++)
            {
                list+='<li>' +names[i]+'<li>';
            }
            var ul=document.getElementById('ul1');
            ul1.innerHTML=list;             
          }
      }
};
    var ipname=document.getElementById('id1');
var id1=ipname.value;
 //making request
    request.open('GET','http://alishakareem13.imad.hasura-app.io/submit-name?name=' + name,true);
    request.send(null);

};
