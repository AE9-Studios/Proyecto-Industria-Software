if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const f=e=>s(e,o),t={module:{uri:o},exports:d,require:f};i[o]=Promise.all(n.map((e=>t[e]||f(e)))).then((e=>(r(...e),d)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-COULwMJ4.css",revision:null},{url:"assets/index.es-oIoOWmz4.js",revision:null},{url:"assets/purify.es-7Bg1jPyR.js",revision:null},{url:"firebase-messaging-sw.js",revision:"9a8cb8d5b4a3a9247f9f739faec565df"},{url:"index.html",revision:"ea1a729bf178b5b1b1b113c4e6b01794"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"d8b8397fda0df277d8d6bebe2f62b48c"},{url:"apple-touch-icon.png",revision:"cf9a8110a5923dc6d6f4fba6c08e8ead"},{url:"pwa-192x192.png",revision:"ebb87c324db973d90d8f317d8713edb2"},{url:"pwa-512x512.png",revision:"4164f74b61b3a9fc11eff178f546e7de"},{url:"manifest.webmanifest",revision:"1f60a042492cb90e87b406f6983552e9"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
