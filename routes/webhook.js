
var express = require('express');
var router = express.Router();
var https = require('https');

const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: ChannelAccessKey
});

router.post('/line', function(req, res, next) {
  // 印出 webhook 傳入內容
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).send();
      
  let targetEvent = req.body.events[0];
  if(targetEvent.type == 'message'){
    client.getProfile(targetEvent.source.userId).then((profile) => {
      targetEvent.message.text = profile.displayName + " 說了 " + targetEvent.message.text;
      replyToLine(targetEvent.replyToken, targetEvent.message);
    });
    //replyToLine(targetEvent.replyToken, targetEvent.message);
  }
});
  
module.exports = router;
    
    
function replyToLine(rplyToken, messages) {
  client.replyMessage(rplyToken, messages)
  .then((result) => {
    //...
    console.log('reply message success:', result);
  })
  .catch((err) => {
    // error handling
    console.log('reply message failed:', err);
  });
  /*let rplyObj = {
    replyToken: rplyToken,
    messages: [messages]
  }
  let rplyJson = JSON.stringify(rplyObj);
  let options = setOptions();
  let request = https.request(options, function (response) {
    console.log('Status: ' + response.statusCode);
    response.setEncoding('utf8');
    response.on('data', function (body) {
      console.log('body:', body);
    });
  });
  request.on('error', function (e) {
    console.log('Request error:', e.message);
  })
  request.end(rplyJson);*/
}

/*function setOptions() {
  let ChannelAccessKey = ChannelAccessKey;
  let option = {
    host: 'api.line.me',
    port: 443,
    path: '/v2/bot/message/reply',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ChannelAccessKey
    }
  }
  return option;
}*/