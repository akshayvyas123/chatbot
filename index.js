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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if(req.body.result.action == "bookflight")
    {
    var a1=req.body.result.parameters.airportcode1;
    var a2=req.body.result.parameters.airportcode2;
    var date=req.body.result.parameters.date;
    console.log(a1);
     console.log(a2);
      console.log(date);
 

 var data=
 {
  "promoCode": "PROMO",
  "cabinClass": "economy",
  "searchCriteria": [
    {
      "origin": a1,
      "dest": a2,
      "direction": "outBound",
      "date": date,
      "isOriginMetro": true,
      "isDestMetro": false
    }
  ],
  "paxInfo": {
    "adultCount": 1,
    "infantCount": 0,
    "childCount": 0
  }
}

var datajsonform=JSON.stringify(data);

    request({
    headers: {
      'Content-Type': 'application/json'
    },
    uri: ' https://devapi.flydubai.com/res/v3/flights/1',
    body: datajsonform,
    method: 'POST'
  }, function (error, response, body) {
   
   
    if (!error && response.statusCode == 200) {
        var a=JSON.parse(body)
         console.log('...................................................................................');
       console.log(a);
         console.log('...................................................................................');
       // console.log(a.serverDateTimeUTC); // Show the HTML for the Modulus homepage.

  //   var responseBody = 
  // {
    
    //         "speech":'hi',
      //    "displayText":"there is good news"

 // };
   // res.write(JSON.stringify(responseBody));
   // res.end();

var flightsava="flightno:"
+body.segment[0].flights[0].IfId +" departure time :" ;
//+body.segment[0].flights[0].stops.departureTime+"departure time :"+ body.segment[0].flights[0].stops.arrivalTime;

var json = JSON.stringify({
    data:{
        "speech":flightsava,
         "displayText":"there is good news"
  
}
});
res.end(json);
    }


    
    else
    console.log('request failed');
});

   
    } // if bookflight ka end


  // res.send('yay!');
})