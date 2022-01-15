const key          = 'sua chave kraken aqui - your kraken key here'; 
const secret       = 'sua chave secreta aqui - your secret key here'; 

const KrakenClient = require('kraken-api');
const kraken = new KrakenClient(key, secret);

async function GetToken(){
    const token = await kraken.api('GetWebSocketsToken');
    return token.result;
}

async function Balance(){
    const saldo = await kraken.api('Balance');    
    return saldo.result;
}

async function AddOrder(dados){
    let ordem = await kraken.api('AddOrder', dados);
    return ordem.result;
}

async function OpenOrders(){
    const ordens = await kraken.api('OpenOrders');
    return ordens.result.open;
}

async function QueryOrders(ordemId){
    const sts = await kraken.api('QueryOrders', { txid: ordemId });
    return sts.result;
}

async function Assets(){
    const ativo = await kraken.api('Assets');
    return ativo.result;
}

async function AssetPairs(pair){
    const crp = await kraken.api('AssetPairs', {pair : pair});
    return crp.result;
}

async function TradesHistory(startDate){
    Date.prototype.toUnixTime = function() { return this.getTime()/1000|0 };
    Date.time = function() { return new Date().toUnixTime(); }
    dtf = new Date().toISOString().slice(0,19).replace('T', ' ')
    const endDate = new Date(dtf).toUnixTime();
    const trades = await kraken.api('TradesHistory',{start: startDate, end: endDate});
    return trades.result;
}

async function Depth(pair, qtd){
    const cotacao = await kraken.api('Depth', { pair: pair, count: qtd })
    return cotacao.result;
}

async function Time(){
    servertime = await kraken.api('Time');
    return servertime.result.unixtime;
}

module.exports = { Balance, AddOrder, OpenOrders, QueryOrders, Assets, AssetPairs, TradesHistory, Depth, Time, GetToken }