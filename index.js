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


app.post('/webhook/', function (req, res) {

  

   

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    

    var responseBody = {
      //speech:'the news is all fine',
      displayText:'finally i can show news',
      "facebook": {
    "text":"Select a category"
      }


    };

    res.write(JSON.stringify(responseBody));
    res.end();




  // res.send('yay!');
})