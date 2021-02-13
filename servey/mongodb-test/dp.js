const MongoClient = require('mongodb').MongoClient;
const microtime = require("microtime");

/* 接続先URL */
const url = 'mongodb://localhost:27017';

/* データベース名 */
const dbName = 'test';

/**
 * 追加オプション
 * MongoClient用オプション設定
 */
const connectOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

setInterval(cyclicPutData, 1000);


async function cyclicPutData() {
  MongoClient.connect(url, connectOption, async function(err, client) {

    /* 接続に成功すればコンソールに表示 */
    //console.log('Connected successfully to server');

    microtimeNow = microtime.now();
    mstimeNow = Number((String(microtimeNow/1000).split('.'))[0]);
    //console.log(mstimeNow);
    const collectionName = 'D' + microtimeNow + '_1111'
    //console.log(collectionName);

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const doc = {no:1, name:"さんぷる１", price:40, activate:false, epoch:mstimeNow};
    await collection.insertOne(doc);
    console.log(collectionName + ' insert successfully.');


    /* DBとの接続切断 */
    client.close();
  });

}