var h=Object.defineProperty;var l=(n,e,t)=>e in n?h(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var s=(n,e,t)=>(l(n,typeof e!="symbol"?e+"":e,t),t);import{_ as u,a as m,o as d,c as _,b as i,w as a,f as c,p as T,h as g,e as p}from"./index.16f47645.js";class v{constructor(e,t={}){s(this,"url");s(this,"heartInterval");s(this,"heartTimeOut");s(this,"reconnectInterval");s(this,"reconnectLimit");s(this,"isReconnecting");s(this,"reconnectCount");s(this,"isManualClose");s(this,"ws");s(this,"heartBeatTimer");s(this,"heartWaitingTimer");s(this,"reconnectTimer");this.url=e,this.heartInterval=t.heartInterval||6e4,this.heartTimeOut=t.heartTimeOut||1e4,this.reconnectInterval=t.reconnectInterval||5e3,this.reconnectLimit=t.reconnectLimit||10,this.ws=null,this.isReconnecting=!1,this.isManualClose=!1,this.reconnectCount=1,this.createWS()}createWS(){this.ws=new WebSocket(this.url),this.ws.onopen=()=>{console.log(`${this.url} opened`),this.resetStatus(),this.heartBeat()},this.ws.onmessage=e=>{try{const t=JSON.parse(e.data);this.msgHandler(t)}catch(t){console.log("on message err:",t)}},this.ws.onclose=()=>{console.log(`${this.url} closed`),!this.isManualClose&&this.reconnect()},this.ws.onerror=()=>{console.log("ws on error"),this.reconnect()}}sendMsg(e){var t;(t=this.ws)==null||t.send(JSON.stringify(e))}msgHandler(e){switch(this.heartBeat(),e.code){case"0":{console.log(e.data);break}case"1":{console.log(e.data);break}}}close(){var e;this.isManualClose=!0,(e=this.ws)==null||e.close(),this.resetStatus()}heartBeat(){clearTimeout(this.heartBeatTimer),clearTimeout(this.heartWaitingTimer),this.heartBeatTimer=setTimeout(()=>{this.sendMsg({code:"1",data:new Date}),this.heartWaitingTimer=setTimeout(()=>{this.reconnect()},this.heartTimeOut)},this.heartInterval)}reconnect(){this.isReconnecting||(this.isReconnecting=!0,this.reconnectTimer=setTimeout(()=>{if(this.reconnectCount>this.reconnectLimit){console.log("reconect failed");return}console.log("reconnect...",this.reconnectCount),this.createWS(),this.reconnectCount++,this.isReconnecting=!1},this.reconnectInterval*this.reconnectCount))}resetStatus(){clearTimeout(this.heartBeatTimer),clearTimeout(this.heartWaitingTimer),clearTimeout(this.reconnectTimer),this.reconnectCount=1,this.isReconnecting=!1,this.isManualClose=!1}}const w=n=>(T("data-v-1ef47215"),n=n(),g(),n),f={class:"about"},C=w(()=>p("h1",null,"This is an virual-list page",-1)),I={__name:"event",setup(n){let e;function t(){e=new v("ws://127.0.0.1:3000/ws?userId=admin",{heartInterval:2e3,heartTimeOut:1e3,reconnectInterval:2e3,reconnectLimit:5})}function r(){e.close()}return(S,B)=>{const o=m("el-button");return d(),_("div",f,[C,i(o,{onClick:t},{default:a(()=>[c("\u5F00\u59CB")]),_:1}),i(o,{onClick:r},{default:a(()=>[c("\u7ED3\u675F")]),_:1})])}}},W=u(I,[["__scopeId","data-v-1ef47215"]]);export{W as default};
