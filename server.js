var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config={
    user:'alishakareem13',
    database:'alishakareem13',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

//deleted articles object

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
    </hr>
    <div>
        <h2>${heading}</h2>
    </div>
    <br>
    </hr>
    <p>
    ${content}
    </p>
    </hr>
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
app.use(bodyParser.json());
app.use(session({
    secret:'somerandomvalue',
    cookie:{maxAge:1000*60*60*24*30}
}));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'ui','index.html'));
});




function hash (input,salt)
{
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
   //return hashed.toString('hex');
}

app.get('/hash/:input',function(req,res){
 var hashedString=hash(req.params.input,'this is some random string');
 res.send(hashedString);
});

app.post('/create-user',function(req,res){
   
   var username=req.body.username;
   var password=req.body.password;
   var salt=crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)', [username,dbString] ,function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else
       {
           res.send('user created successfully:' + username);
       }
   });
});

app.post('/login',function(req,res){
     var username=req.body.username;
   var password=req.body.password;
   //var salt=crypto.randomBytes(128).toString('hex');
   //var dbString=hash(password,salt);
   pool.query('SELECT * FROM "user" WHERE username=$1', [username] ,function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else
       {
          if(result.rows.length===0)
          {
              res.send(403).send('username/psswrd is invalid');
          }
          else
          {
              //match the pswrd
              var dbString=result.rows[0].password;
              var salt=dbString.split('$')[2];
              var hashedPassword=hash(password,salt);//creating hash based on pswrd submitted and original salt
              if(hashedPassword===dbString)
              {
                  //set session
                  req.session.auth={userId:result.rows[0].id};
                  //set cookie with session id
                  //internally on the server side,it maps the session id to the object
                  //{auth:{userId}}
                  res.send('credentials correct');
              }
              else{
                  res.send(403).send('username/password is invalid');
              }
           //res.send('user created successfully:' + username);
          }
       }
   });
});

//to check the session object
app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId)
   {
       res.send('you are logged in:'+req.session.auth.userId.toString());
   } 
   else
   {
       res.send('you are not logged in');
   }
});

//logout session
app.get('/logout',function(req,res){
   delete req.session.auth;
   res.send('logged out');
});

var pool=new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return responses
    pool.query('SELECT * FROM test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else
       {
           res.send(JSON.stringify(result.rows));
       }
    });
});

var names=[];
app.get('/submit-name',function(req,res){
   var name=req.query.name;//url/submit-name?name=alisha
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
app.get('/articles/:articleName', function (req, res) {
    //articleName==aticle-one
//articles[articleName]=={}content object for article one
// var articleName=req.params.articleName;
pool.query("SELECT * FROM article WHERE title=$1", [req.params.articleName],function(err,result){
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else
    {
        if(result.rows.length===0)
        {
            res.status(404).send('article not found');
        }
        else
        {
            var articleData=result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
});
 // res.send(createTemplate(articles[articleName]));
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
