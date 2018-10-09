const Koa = require('koa');
const app = new Koa();

// middleware
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next(); // 调用下一个middleware
})

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next(); // 调用下一个middleware
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`Time: ${ms}ms`); // 打印耗费时间
})

app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, koa2!</h1>';
})

// 简写 ctx.url == ctx.request.url; ctx.type == ctx.response.type

// 注意require('koa-router')返回的是函数
const router = require('koa-router')();

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

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>`;
});

// add router middleware
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');