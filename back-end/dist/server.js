!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=3)}([function(e,t){e.exports=require("express")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("@babel/polyfill")},function(e,t,r){"use strict";r.r(t);r(2);var n=r(0),o=r.n(n),s=r(1),i=r.n(s);var u=function(e,t,r){return t.status(200).set("Content-Type","application/json").json([{id:1,name:"user1"},{id:2,name:"user2"}])};const l=o()(),c=process.env.WEBAPI_PORT||3e3;l.use(function(e,t,r){t.header("Access-Control-Allow-Origin","*"),t.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),r()}),l.use(i.a.json({limit:1e6})),l.get("/users",u);const a=l.listen(c,()=>{console.log(`Server start at port ${c}`)});process.on("SIGTERM",()=>{console.info("SIGTERM signal received."),console.log("Closing http server."),a.close(()=>{console.log("Http server closed."),process.exit(1)})})}]);