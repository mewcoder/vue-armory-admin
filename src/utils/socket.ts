enum Code {
  Data = '0',
  Heart = '1'
}

interface Resp {
  code: Code;
  data: any;
}

export default class Socket {
  ws: WebSocket | null;
  url: string;

  constructor(url: string) {
    this.url = url;
    this.ws = null;
    this.init();
  }

  init() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log(`${this.url} opened`);
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
    };

    this.ws.onerror = (e: Event) => {
      console.log(`WebSocket error: ${e}`);
    };
  }

  msgHandler(resp: Resp) {
    console.log(resp);
    switch (resp.code) {
      case '0': {
        console.log(resp.data);
        break;
      }
      case '1': {
        console.log(resp.data);
        break;
      }
    }
  }

  close() {
    this.ws?.close();
  }
}
