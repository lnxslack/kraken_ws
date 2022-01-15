const api = require('./api');
const WebSocket = require('ws');

const public = 'wss://ws.kraken.com';
const private = 'wss://ws-auth.kraken.com';
var ws = new WebSocket(private);

const subscribe = {
    "event": "subscribe",
    "subscription":
    {
      "name": "openOrders",
    }
}

ws.onopen = async function (){
    const token = await api.GetToken();
    subscribe.subscription.token = token.token;
    // console.log(subscribe);
    ws.send(JSON.stringify(subscribe));
}

ws.onmessage = function (ev){
    console.log(ev.data);
}
