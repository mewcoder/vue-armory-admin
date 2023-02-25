enum Code {
  Data = '0',
  HeartBeat = '1'
}

interface Resp {
  code: Code;
  data: any;
}

interface Config {
  heartInterval?: number; // 心跳间隔
  heartTimeOut?: number; // 心跳超时等待
  reconnectInterval?: number; // 重连间隔
  reconnectLimit?: number; //重连次数
}

export default class Socket {
  url: string;
  heartInterval: number; // 心跳间隔
  heartTimeOut: number; // 心跳超时等待
  reconnectInterval: number; // 重连间隔
  reconnectLimit: number; //重连次数

  isReconnecting: boolean; //是否在重连
  reconnectCount: number; //重连计数
  isManualClose: boolean; //是否是手动关闭

  ws: WebSocket | null;
  heartBeatTimer: any;
  heartWaitingTimer: any;
  reconnectTimer: any;

  constructor(url: string, config: Config = {}) {
    this.url = url;
    this.heartInterval = config.heartInterval || 60000;
    this.heartTimeOut = config.heartTimeOut || 10000;
    this.reconnectInterval = config.reconnectInterval || 5000;
    this.reconnectLimit = config.reconnectLimit || 10;

    this.ws = null;

    this.isReconnecting = false;
    this.isManualClose = false;
    this.reconnectCount = 1;

    this.createWS();
  }

  createWS() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log(`${this.url} opened`);
      this.resetStatus();
      this.heartBeat();
    };

    this.ws.onmessage = (e: MessageEvent) => {
      try {
        const resp: Resp = JSON.parse(e.data);
        this.msgHandler(resp);
      } catch (e) {
        console.log('on message err:', e);
      }
    };

    this.ws.onclose = () => {
      console.log(`${this.url} closed`);
      if (this.isManualClose) return;
      this.reconnect();
    };

    this.ws.onerror = () => {
      console.log(`ws on error`);
      this.reconnect();
    };
  }

  sendMsg(obj: any) {
    this.ws?.send(JSON.stringify(obj));
  }

  msgHandler(resp: Resp) {
    this.heartBeat();

    switch (resp.code) {
      case Code.Data: {
        console.log(resp.data);
        break;
      }
      case Code.HeartBeat: {
        console.log(resp.data);
        break;
      }
    }
  }

  close() {
    this.isManualClose = true;
    this.ws?.close();
    this.resetStatus();
  }

  // 心跳检测
  heartBeat() {
    clearTimeout(this.heartBeatTimer);
    clearTimeout(this.heartWaitingTimer);
    this.heartBeatTimer = setTimeout(() => {
      this.sendMsg({
        code: Code.HeartBeat,
        data: new Date()
      });
      this.heartWaitingTimer = setTimeout(() => {
        // 超时重连
        this.reconnect();
      }, this.heartTimeOut);
    }, this.heartInterval);
  }

  // 重连
  reconnect() {
    if (this.isReconnecting) return;
    this.isReconnecting = true;
    this.reconnectTimer = setTimeout(() => {
      if (this.reconnectCount > this.reconnectLimit) {
        console.log('reconect failed');
        return;
      }
      console.log('reconnect...', this.reconnectCount);
      this.createWS();
      this.reconnectCount++;
      this.isReconnecting = false;
    }, this.reconnectInterval * this.reconnectCount);
  }

  // 重置状态
  resetStatus() {
    clearTimeout(this.heartBeatTimer);
    clearTimeout(this.heartWaitingTimer);
    clearTimeout(this.reconnectTimer);
    this.reconnectCount = 1;
    this.isReconnecting = false;
    this.isManualClose = false;
  }
}
