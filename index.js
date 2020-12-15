//ポストされたのを受け取る
function doPost(e) {
    var payload = JSON.parse(decodeURIComponent(e.postData.getDataAsString()));
    
  //  えらー確認用
    SpreadsheetApp.getActiveSheet().getRange(1, 1).setValue(payload);
    SpreadsheetApp.getActiveSheet().getRange(2, 1).setValue(payload["event"]["text"]);
    
  //  受信メッセージ
    var value = payload["event"]["text"];
  //  メッセージを送信したユーザー
    var valueUser = payload["event"]["user"];
    
  //  ユーザーがボットじゃない時に処理する
    if(valueUser != ""){
      //値を整える
      if(value.slice(0, 1) == "<"){
          value = value.slice(1).slice(0, -1);
      }
      //メッセージ送信処理
      if(value.match(/^(http|https):\/\//i)){
        var test = changeUrl(value);
        postMessage(test);
      }else{
        postMessage("URLをおくってくださいな。");
      }
    }
  
    //バリデーション用
    var params = JSON.parse(e.postData.getDataAsString());
    return ContentService.createTextOutput(params.challenge);
  }
  
  
  //bitlyAPI(urlを短くしてくれる)
  function changeUrl(changeUrl) {
    var token = "";
    var url = "https://api-ssl.bitly.com/v4/shorten";
    var headers = {
      'Authorization': 'Bearer '+ token 
    };
    var payload = {
      "domain": "bit.ly",  
      "long_url": changeUrl 
    };
    var params = {
      "method" : "POST",
      'contentType': 'application/json',
      'headers': headers,
      "payload" : JSON.stringify(payload)
    }
    
  //  API送信
    var getValue = UrlFetchApp.fetch(url, params);
  
    var value = JSON.parse(getValue);
    return value["link"];
  }
  
  //bitlyテスト用
  function tttttest() {
    var value = "https://testtest";
      var test = changeUrl(value);
    SpreadsheetApp.getActiveSheet().getRange(5, 1).setValue(test);
  }
  
  
  
  function postMessage(sendMessage) {
  
    //  ポストURL
    var url = "https://slack.com/api/chat.postMessage";
  
    var payload = {
      "token" : "",
      "channel" : "",
      "text" : sendMessage
    };
    
    var params = {
      "method" : "post",
      "payload" : payload
    };
    
    // Slackに投稿する
    UrlFetchApp.fetch(url, params);
  }
  
    