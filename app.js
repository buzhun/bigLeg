var express = require('express')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var cookieSession = require('cookie-session')
var ejs = require('ejs');

var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.engine('html', ejs.renderFile)
app.set('views', './views'); // 指定视图所在的位置
app.set('view engine', 'html'); // 注册模板引擎
app.use(cookieParser());
app.use('/static', express.static('public'));
app.use(cookieSession({
  name: 'bigleg',
  keys: ['leg'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/',function(req,res){
  req.session.views = (req.session.views || 0) + 1
  // Write response
  res.render('index',{title:'腿腿儿',message:'helloworld'})
  //res.end(req.session.views + ' views')
})
app.get('/detail:id',function(req,res){
	res.send('大腿儿的博客，博客'+req.params.id)
})
app.get('/admin',function(req,res){
	res.send('博客管理后台／创建博客')
})
app.post('/admin/add',urlencodedParser,function(req,res){
	res.send(req.body)
})
app.get('/admin／list',function(req,res){
	res.send('博客管理后台/增删改查博客列表')
})

app.listen(3000,function(){
	console.log('bigleg is listening on 3000')
})