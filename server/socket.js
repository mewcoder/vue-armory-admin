import koa from 'koa';
import koaRouter from 'koa-router';
import websocket from 'koa-websocket';

const app = websocket(new koa());

const router = koaRouter();

let wsMap = {};

function broadcast() {
  // 随机广告
  setInterval(function () {
    const n = Math.random();
    if (n > 0.5) {
      let msg = JSON.stringify({ code: '0', data: n });
      for (const key in wsMap) {
        console.log('send to client:', key);
        wsMap[key].websocket.send(msg);
      }
    }
  }, 3000);
}

broadcast();

router.all('/ws', (ctx) => {
  // 客户端链接传过来的客户端身份
  const { userId } = ctx.query;

  if (wsMap[userId]) return;

  console.log('connect:', userId);
  // 将链接保存起来
  wsMap[userId] = ctx;

  // 监听客户端发送过来的信息
  wsMap[userId].websocket.on('message', function (message) {
    console.log('on message:', JSON.parse(message));
    const res = JSON.parse(message);
    if (res.code === '1') {
      // ctx.websocket.send(JSON.stringify({ code: '1', data: new Date() }));
    }
  });

  wsMap[userId].websocket.on('close', () => {
    delete wsMap[userId];
    console.log(userId, ':close websocket');
  });
});

// 使用路由
app.ws.use(router.routes()).use(router.allowedMethods());

//端口号后面可采用动态的
app.listen(3000, () => console.log('=== websocket 服务启动成功 ==='));

// https://blog.csdn.net/qq_39425927/article/details/107975174
