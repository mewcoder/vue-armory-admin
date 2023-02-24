import koa from 'koa';
import koaRouter from 'koa-router';
import websocket from 'koa-websocket';

const app = websocket(new koa());

const router = koaRouter();

let wsMap = {};
let i = 0;

function broadcast() {
  // 随机广告
  setInterval(function () {
    let n = Math.random();
    if (n > 0.3) {
      let msg = JSON.stringify({ code: '0', data: n });
      for (let key in wsMap) {
        console.log('send to client:', key);
        wsMap[key].websocket.send(msg);
      }
    }
  }, 1000);
}

broadcast();

router.all('/ws', (ctx) => {
  // 客户端链接传过来的客户端身份
  const { userId } = ctx.query;
  console.log('receive...', userId);

  // 将链接保存起来
  wsMap[userId] = ctx;

  // 监听客户端发送过来的信息
  ctx.websocket.on('message', function (message) {
    console.log(JSON.parse(message));
  });

  ctx.websocket.on('close', () => {
    delete wsMap[userId];
    console.log(userId, ':close websocket');
  });
});

// 使用路由
app.ws.use(router.routes()).use(router.allowedMethods());

//端口号后面可采用动态的
app.listen(3000, () => console.log('=== websocket 服务启动成功 ==='));

// https://blog.csdn.net/qq_39425927/article/details/107975174
