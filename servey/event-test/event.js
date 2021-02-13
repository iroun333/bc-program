/**
 * コンストラクタ
 *
 * @param {*} data
 */
function Obj(data){
	// イベントを管理するオブジェクト
	var event = require('events').EventEmitter;
	var em = new event ;

	// 内部変数
	var text = data;

	// イベントリスナーを追加するメソッド
	this.addEventListener = function(event, listener){
        em.on(event, listener);
	}

	// テキストを変更するメソッド
	this.changeText = function(newtext){
        var oldtext = text ;
        text = newtext;

        // テキスト変更時にchangeDataイベントを発生させる
        em.emit('changedata', oldtext , newtext);
	}

	this.getText = function(){
		return text ;
	}

	console.log('new obj is created by %s', data);
};

// インスタンスを作成
var newObject = new Obj('new data');

// イベント登録
 newObject.addEventListener('changedata', function(a,b){
        console.log('text changed "%s" to "%s"', a, b);
	});

module.exports = newObject ;
