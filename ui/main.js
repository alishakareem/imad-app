
//submit username,pswrd to login

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
            alert('user logged in');
          }
          else if(request.status===403)
          {
              alert('username/password is incorrect');
          }
          else if(request.status===500)
          {
              alert('something went wrong on browser');
          }
      }
};
    var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log(username);
console.log(password);
 //making request
    request.open('POST','http://alishakareem13.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password}));

};
