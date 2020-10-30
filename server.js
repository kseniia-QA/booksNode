const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const router = new Router();

const app = new Koa();
app.use(
  koaBody({
    urlencoded: true,
    multipart: true,
    json: true,
    text: true,
    formLimit: '10mb',
    jsonLimit: '10mb',
    textLimit: '10mb',
    enableTypes: ['json', 'form', 'text'],
  }),
);

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    const n = await next();
    return n;
  }

  const headers = { 'Access-Control-Allow-Origin': '*' };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set(
        'Access-Control-Allow-Headers',
        ctx.request.get('Access-Control-Request-Headers'),
      );
    }

    ctx.response.status = 204;
  }
});

const books = [];

app.use(async (ctx, next) => {
  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
  });

  ctx.response.body = 'server response1';
  await next();
});

router.get('/api/books', async (ctx, next) => {
  ctx.body = JSON.stringify(books);
  await next();
});

router.post('/api/user/login', async (ctx, next) => {
  // console.log(ctx.request.querystring, 'string');
  const message = JSON.parse(ctx.request.body);
  const users = [
    { id: 1, mail: 'bropet@mail.ru', pass: '123' },
    { id: 2, mail: 'test@test.com', pass: 'test' },
  ];
  let response = users.filter(
    (elem) => !!(elem.mail === message.mail && elem.pass === message.pass),
  );
  response =
    response.length !== 0
      ? { id: response[0].id, mail: response[0].mail }
      : { message: 'Неправильая почта или пароль' };
  ctx.body = JSON.stringify(response);
  await next();
});

router.post('/api/books', async (ctx, next) => {
  const book = JSON.parse(ctx.request.body);
  // book.key = book.title + books.length;
  books.push(book);
  // console.log(ctx.request.querystring, 'string');
  // const users = [
  //   { id: 1, mail: 'bropet@mail.ru', pass: '123' },
  //   { id: 2, mail: 'test@test.com', pass: 'test' },
  // ];
  // let response = users.filter(
  //   (elem) => !!(elem.mail === message.mail && elem.pass === message.pass),
  // );
  // response =
  //   response.length !== 0
  //     ? { id: response[0].id, mail: response[0].mail }
  //     : { message: 'Неправильая почта или пароль' };
  // ctx.body = JSON.stringify(message);
  await next();
});

router.post('/api/books/:id', async (ctx, next) => {
  books.forEach((element) => {
    if (element.key === ctx.params.id) {
      const elem = element;
      elem.favorit = true;
    }
  })
  await next();
});
router.del('/api/books/:id', async (ctx, next) => {
  books.forEach((element) => {
    if (element.key === ctx.params.id) {
      const elem = element;
      elem.favorit = false;
    }
  })
  await next();
});

app.use(router.routes()).use(router.allowedMethods());

const server = http.createServer(app.callback());
const port = process.env.PORT || 7071;
server.listen(port);
