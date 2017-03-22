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
   console.log("Got a POST request for the homepage1");
  var headers=req.headers;
  var intentName=headers['intentName']
  console.log(intentName);





   res.send(intentName);
})