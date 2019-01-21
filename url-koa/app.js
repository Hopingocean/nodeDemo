const Koa = require('koa');
// 注意require('koa-router')返回的是函数
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

// log request URL
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
})

// GET
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

// 处理POST请求
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
    <form action="/login" method="post">
      <p>username: <input name="username" value="Lee"></p>
      <p>password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit"></p>
    </form>`;
});

router.post('/login', async (ctx, next) => {
  var username = ctx.request.body.username || '';
  var password = ctx.request.body.password || '';
  if (username === 'Lee' && password === '123456') {
    ctx.response.body = `<h1>Welcome, ${username}</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
    <p><a href="/">Try again</a></p>`;
  }
})

// add router middleware
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');