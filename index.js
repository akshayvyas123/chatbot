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
    "adultCount": 2,
    "infantCount": 1,
    "childCount": 1
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


var json = JSON.stringify({
    data:{
//          "speech":"hi ",
//          "displayText":"there is good news",
  "facebook": {
    "text":"Select a category",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"General",
        "payload":"#news general"
      },
        {
        "content_type":"text",
        "title":"Business",
        "payload":"#news business"
      },
       {
        "content_type":"text",
        "title":"Sport",
        "payload":"#news sport"
      },
              {
        "content_type":"text",
        "title":"Technology",
        "payload":"#news technology"
      },
              {
        "content_type":"text",
        "title":"Entertainment",
        "payload":"#news entertainment"
      }
      
    ]
  }
},
    source : "text"
  })
  res.end(json)
}



    
    else
    console.log('request failed');
});

   
    } // if bookflight ka end


  // res.send('yay!');
})