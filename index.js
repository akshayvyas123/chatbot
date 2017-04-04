// npm packages 

const express=require('express')
const bodyParser=require('body-parser')
const request=require('request')
const app=express()
 var flightss="";
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


var securitytoken="";
var j1="";
var body1="";
var j2="";
var a1="";
var a2="";
var date="";
app.post('/webhook/', function (req, res) 
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

 if(req.body.result.action == "feelings")
 {
  console.log("We are inside the feelings code ");
   var b2 = JSON.stringify({
     "speech":"hi ",
   "displayText":"there is good news",
    
    data:{

  "facebook": {
    "text":"Tell me how do you feel?",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Happy",
        "payload":"#receipt 1"
      },
        {
        "content_type":"text",
        "title":"Sad",
        "payload":"#receipt 0"
      }
    ]
  }
},
    source : "text"
  

});
   
res.end(b2);
  
 }
 
 
    if(req.body.result.action == "bookflight")
    {
     a1=req.body.result.parameters.airportcode1;
     a2=req.body.result.parameters.airportcode2;
     date=req.body.result.parameters.date;
    console.log(a1);
     console.log(a2);
      console.log(date);
 

  j1=
 {
  "promoCode": "PROMO",
  "cabinClass": "economy",
  "searchCriteria": [
    {
      "origin": "DXB",
      "dest": "DOH",
      "direction": "outBound",
      "date": "2017-04-23T18:25:43.511Z",
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

var datajsonform=JSON.stringify(j1);
     console.log(j1);

    request({
    headers: {
      'Content-Type': 'application/json'
    },
    uri: ' https://devapi.flydubai.com/res/v3/flights/1',
    body: datajsonform,
    method: 'POST'
  }, function (error, response, body) {
   
   
    if (!error && response.statusCode == 200) {
         b1=JSON.parse(body);
       // var responseparsed=JSON.parse(response);
        securitytoken=response.headers['securitytoken'];
         console.log('...................................................................................');
       console.log(b1);
         console.log('...................................................................................');
       // console.log(a.serverDateTimeUTC); // Show the HTML for the Modulus homepage.

  //   var responseBody = 
  // {
    
    //         "speech":'hi',
      //    "displayText":"there is good news"

 // };
   // res.write(JSON.stringify(responseBody));
   // res.end();

  flightss=b1.segments[0].flights[0];
var flightsava="";
//for (var i =0; i < body1.validationRules.numberOfFlightsShown ;i++)
//{
  //  console.log(i);
     //b1.segments[0].flights[0].IfId
flightsava="route:" + b1.segments[0].route + "\n" +
"flightno: 292060" +  +  "\n" +
 " departure time :" +  b1.segments[0].flights[0].departureTime+ "\n" +
"arrival time :" + b1.segments[0].flights[0].arrivalTime 
 + "Price:" +  b1.segments[0].flights[0].fareTypes[0].fare.totalFare + "Dhirams\n\n To book send yes";
 //flightsava=flightsava+flightsava1;
//}
var json = JSON.stringify({
    
        "speech":flightsava,
         "displayText":"there is good news"
  

});
console.log("ss..........................................................111111111111111111111111111111111111111111111111");
res.end(json);
    }


    
    else
    console.log('request failed');
});

   
    } // if bookflight ka end


  if(req.body.result.action == "flydubaibook")
  {     var searchstr=j1;
      j2={
          "currency": "AED",
  "itineraryAction": 1,
  "searchRequest":
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
},
 "passengerList": [
    
  ],
  "preferences": {
    "isReadyToSignUpForOffers": false
  }

  

                    
      };
console.log(j2);
console.log(flightss);

   var b2 = JSON.stringify({
    
        "speech":"Your flight is booked in the pay later mode",
         "displayText":"there is good news"
  

});
   
res.end(b2);
  }


  // res.send('yay!');
})
