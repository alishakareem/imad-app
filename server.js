var express = require('express');
var morgan = require('morgan');
var path = require('path');

var articles={
    'article-one':{
    title:'Article-one@Alisha',
    heading:'Welcome',
    heading1:'Take Care....',
content:`<p>Hellooo guysss....Hope all are fine...Here is my first article and as i said this is the content of the page 
       and now you can see it....
       enjoyyyy reading it....
    </p>
     <p>Hellooo guysss....Hope all are fine...Here is my first article and as i said this is the content of the page 
       and now you can see it....
       enjoyyyy reading it....
    </p>
     <p>Hellooo guysss....Hope all are fine...Here is my first article and as i said this is the content of the page 
       and now you can see it....
       enjoyyyy reading it....
    </p>`
},
'article-two':{
    title:'Article-two@Alisha',
    heading:'Welcome',
    heading1:'Take Care....',
content:`<p>Hellooo guysss....Hope all are fine...Here is my second article and as i said this is the content of the page 
       and now you can see it....
       enjoyyyy reading it....
    </p>
     <p>Hellooo guysss....Hope all are fine...Here is my second article and as i said this is the content of the page 
       and now you can see it....
       enjoyyyy reading it....
    </p>
     <p>Hellooo guysss....Hope all are fine...Here is my second article and as i said this is the content of the page 
       and now you can see it....
       enjoyyyy reading it....
    </p>`
},
'article-three':{
    title:'Article-three@Alisha',
    heading:'Welcome',
    heading1:'Take Care....',
content:`<p>Hellooo guysss....Hope all are fine...Here is my third article and as i said this is the content of the page 
       and now you can see it....
       enjoyyyy reading it....
    </p>
     <p>Hellooo guysss....Hope all are fine...Here is my third article and as i said this is the content of the page 
       and now you can see it....
       enjoyyyy reading it....
    </p>
     <p>Hellooo guysss....Hope all are fine...Here is my third article and as i said this is the content of the page 
       and now you can see it....
       enjoyyyy reading it....
    </p>`
}
};
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var heading1=data.heading1;
var htmlTemplate=`
<html>
    <head>
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <title>${title}</title>
        <div id="id1">
    <div><a href="/">Home</a></div>
    <br>
    <br>
    <div>
        <h2>${heading}</h2>
    </div>
    <br>
    <p>
    ${content}
    </p>
    <h3>
       ${heading1}
    </h3>
    </div>
    </body>
</html>`
;
return htmlTemplate;
}
var app = express();
app.use(morgan('combined'));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'ui','index.html'));
});

var names=[];
app.get('/submit-name/:name',function(req,res){
   var name=req.params.name;
   names.push(name);
   //JSON:javascript object notation
   //converts javascript object into stings
   res.send(JSON.stringify(names));
});

var counter=0;
app.get('/counter',function(req,res){
   counter=counter+1;
   res.send(counter.toString());
});
app.get('/:articleName', function (req, res) {
    //articleName==aticle-one
//articles[articleName]=={}content object for article one
 var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
