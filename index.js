// npm packages 

const express=require('express')
const bodyParser=require('body-parser')
const request=require('request')
const app=express()

app.set('port',(process.env.PORT))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',function(req,res)
{
res.send('hello youtube !')
  })

app.get('/webhook/',function(req,res)
{
    if(req.query['hub.verify_token']     === 'my_voice_is_my_password_verify_me')
    {
res.send(req.query['hub.challenge'])
   }
  res.send('No entry')
    
})
app.listen(app.get('port'),function(){
console.log('running on port ',app.get('port'))
}) 


app.post('/webhook/', function (req, res) 
{
 var reqparse=JSON.parse(req)
 if(reqparse.result.action == "bookflight")
 {
   var a1=reparse.parameters.airportcode1;
   var a2=reparse.parameters.airportcode2;
   var date=reparse.parameters.date;
   console.log(a1);
   console.log(a2);
   console.log(a3);
 } 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    

//    request('https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=efe7d0056b3f440688d97aa0d13f76f1', function (error, response, body) {
  //  if (!error && response.statusCode == 200) {
    //    var a=JSON.parse(body)
      //  console.log(a.articles[0].description); // Show the HTML for the Modulus homepage.

     //var responseBody = 
   //{
    //data:{
          //   "speech":a.articles[0].description,
         // "displayText":"there is good news"
    //}
 // "facebook": {
   // "text":"Select a category",
   // "quick_replies":
     // {
       // "content_type":"text",
       // "title":"General",
       // "payload":"#news general"
     // }
       //       }
            
  // }
 // };
   // res.write(JSON.stringify(responseBody));
    res.end();


    }
});

   



  // res.send('yay!');
})