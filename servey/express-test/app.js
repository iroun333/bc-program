const path = require('path');
const express = require('express');
const session = require('express-session');

const public = express();
public.set('trust proxy', 1); // trust first proxy
public.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    // domain: '192.168.1.108', // no set cookie
    // domain: 'localhost', // set cookie
    // path: '/',
    // expires: -1,
    // maxAge: -1, // 設定されない
    // maxAge: 0, // 設定されない
    maxAge: null, // 設定されない
  },
}));

// Access the session as req.session
// public.get('/', function(req, res, next) {
public.get('/set', function(req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.write('<p>_title in: ' + req.session._title + '</p>');
    res.write('<p>token in: ' + req.session.token + '</p>');
    res.write('<p>seeds in: ' + req.session.seeds + '</p>');
    // res.write('<p>document.cookie in: ' + document.cookie + '</p>');
    // res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
    res.write('<p>cookie.secure in: ' + req.session.cookie.secure + '</p>');
    res.write('<p>cookie.httpOnly in: ' + req.session.cookie.httpOnly + '</p>');
    res.write('<p>cookie.expires in: ' + req.session.cookie.expires + '</p>');
    res.write('<p>cookie.domain in: ' + req.session.cookie.domain + '</p>');
    res.write('<p>cookie.path in: ' + req.session.cookie.path + '</p>');
    // alert(document.cookie);
    res.end();
  } else {
    req.session.views = 1;
    req.session._title = 'sample';
    req.session.token = 'token12345';
    req.session.seeds = 'seed12345';
    res.end('welcome to the session demo. refresh!');
  }
});

var server = public.listen(3000, function() {
  console.log('Node.js is listening to PORT:' + server.address().port);
});

// 静的ファイルのルーティング
public.use(express.static(path.join(__dirname, 'public')));
public.use(express.static(path.join(__dirname, 'public')));

// その他のリクエストに対する404エラー
public.use((req, res) => {
  res.sendStatus(404);
});
