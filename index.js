import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import db from './db/index.js';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('database connected');
});

router.get('/', (ctx) => {
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: 'Welcome! To Task Management!',
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('running on port 3000'));
