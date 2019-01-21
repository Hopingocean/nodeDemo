const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./middleware/controller');
const template = require('./middleware/template');

const isProduction = process.env.NODE_ENV === 'production';

const app = new Koa();
// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  var start = new Date().getTime(),
    execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if (!isProduction) {
  let staticFiles = require('./middleware/staticFiles');
  app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());

app.use(template('views', {
  noCache: !isProduction,
  watch: !isProduction
}))

// add controllers
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');