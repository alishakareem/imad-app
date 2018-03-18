var button=document.getElementById('b1');
counter=0;
b1.onclick=function(){
  
  counter=counter+1;
  var span=document.getElementById('count');
  span.innerHTML=counter.toString();
    
};