console.log('Loaded!');
var a=document.getElementById('i1');
a.innerHTML='happyy days..';

//moving element
var b=document.getElementById('maddy');
var marginLeft=0;
function f1()
{
    marginLeft=marginLeft+10;
    b.style.marginLeft=marginLeft+'px'
}

b.onclick=function(){
  //b.style.marginLeft='100px';
  var v=setInterval(f1,100);
};