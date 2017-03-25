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
   
  "facebook": {
   "attachment":{
      "type":"template",
      "payload":{
        "template_type":"receipt",
        "recipient_name":"Vincent Chase",
        "order_number":"12345678902",
        "currency":"INR",
        "payment_method":"Visa 2345",        
        "order_url":"http://petersapparel.parseapp.com/order?order_id=123456",
        "timestamp":n+"", 
        "elements": inko,
//            [
//           {
//             "title":"Classic White T-Shirt",
//             "subtitle":"100% Soft and Luxurious Cotton",
//             "quantity":2,
//             "price":50,
//             "currency":"USD",
//             "image_url":"https://s-media-cache-ak0.pinimg.com/originals/33/d1/4c/33d14cb737e5b4658e6914621625f545.jpg"
//           }
//           {
//             "title":"Classic Gray T-Shirt",
//             "subtitle":"100% Soft and Luxurious Cotton",
//             "quantity":1,
//             "price":25,
//             "currency":"USD",
//             "image_url":"https://img.clipartfox.com/7865a54005ecf2a13f26251af9a1a1ca_chinese-food-clipart-image-chinese-food-clipart-noodles_1600-941.jpeg"
//           }
//         ]
        "address":{
          "street_1":"Road no 10",
          "street_2":"Banjara Hills",
          "city":"Hyderabad",
          "postal_code":"500080",
          "state":"TS",
          "country":"IN"
        },
        "summary":{
          "subtotal":sub,
          "shipping_cost":sc,
          "total_tax":tax,
          "total_cost":total
        },
        "adjustments":[
          {
            "name":"New Customer Discount",
            "amount":a1
          },
          {
            "name":"₹20 Off Coupon",
            "amount":a2
          }
        ]//ads
      }
    }
  }
   },//data
    source : "text"
  })//json

  response.end(json)



    }
    else
    console.log('request failed');
});

   
    } // if bookflight ka end


  // res.send('yay!');
})