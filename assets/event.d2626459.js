var r=Object.defineProperty;var _=(s,e,o)=>e in s?r(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o;var t=(s,e,o)=>(_(s,typeof e!="symbol"?e+"":e,o),o);import{_ as d,a as h,o as u,c as p,b as a,w as c,f as l,p as w,h as g,e as m}from"./index.52bab0db.js";class v{constructor(e){t(this,"ws");t(this,"url");this.url=e,this.ws=null,this.init()}init(){this.ws=new WebSocket(this.url),this.ws.onopen=()=>{console.log(`${this.url} opened`)},this.ws.onmessage=e=>{try{const o=JSON.parse(e.data);this.msgHandler(o)}catch(o){console.log("on message err:",o)}},this.ws.onclose=()=>{console.log(`${this.url} closed`)},this.ws.onerror=e=>{console.log(`WebSocket error: ${e}`)}}msgHandler(e){switch(console.log(e),e.code){case"0":{console.log(e.data);break}case"1":{console.log(e.data);break}}}close(){var e;(e=this.ws)==null||e.close()}}const f=s=>(w("data-v-8e2a4242"),s=s(),g(),s),k={class:"about"},b=f(()=>m("h1",null,"This is an virual-list page",-1)),S={__name:"event",setup(s){let e;function o(){e=new v("ws://127.0.0.1:3000/ws?userId=admin")}function i(){e.close()}return(x,C)=>{const n=h("el-button");return u(),p("div",k,[b,a(n,{onClick:o},{default:c(()=>[l("\u5F00\u59CB")]),_:1}),a(n,{onClick:i},{default:c(()=>[l("\u7ED3\u675F")]),_:1})])}}},y=d(S,[["__scopeId","data-v-8e2a4242"]]);export{y as default};
