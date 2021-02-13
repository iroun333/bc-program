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

const query = {$and:[
  {epoch: {$gt: 0}},
  {epoch: {$lt: 2234567890123 }}
]};

let mstimeBk = 0;

setInterval(cyclicGetData, 1000);


async function cyclicGetData() {
  MongoClient.connect(url, connectOption, async function(err, client) {

    const db = client.db(dbName);
    const list = await db.listCollections().toArray();
    for(let i=0; i<list.length; i++) {
      console.log(list[i].name);

      const collection = db.collection(list[i].name);
      const query = {$and:[
        {epoch: {$gt: 0}},
        {epoch: {$lt: 2234567890123 }}
      ]};
      let result = await collection.findOne(query);
      console.log(result);
      if(mstimeBk < result[0].epoch) {
        mstimeBk = result[0].epoch;
      }
      console.log(result[0].epoch);
      console.log(mstimeBk);

    }
      //for(let j=0; j < result.length; j++) {
      //  if(mstimeBk < result[j]) {
      //    mstimeBk = result[j];
      //    console.log(mstimeBk);
      //  }
      //}



    /* DBとの接続切断 */
    client.close();
  });

}