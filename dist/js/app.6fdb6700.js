(function(e){function t(t){for(var r,a,c=t[0],u=t[1],i=t[2],l=0,d=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);f&&f(t);while(d.length)d.shift()();return s.push.apply(s,i||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(s.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o={app:0},s=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-2d0decd7":"cf0287e3","chunk-3c88f634":"0ed6bf83","chunk-2d221e27":"36722f6a","chunk-a2529f6c":"942c2d4e","chunk-b46be8f0":"da4e64f5"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-3c88f634":1,"chunk-a2529f6c":1,"chunk-b46be8f0":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0decd7":"31d6cfe0","chunk-3c88f634":"c4f85a31","chunk-2d221e27":"31d6cfe0","chunk-a2529f6c":"9a661c89","chunk-b46be8f0":"5b77c9bb"}[e]+".css",o=u.p+r,s=document.getElementsByTagName("link"),c=0;c<s.length;c++){var i=s[c],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===r||l===o))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){i=d[c],l=i.getAttribute("data-href");if(l===r||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[e],f.parentNode.removeChild(f),n(s)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var s=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=s);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e);var d=new Error;i=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}o[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var f=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"51be":function(e,t){var n={BASE_URL:"https://teddinodeapp.azurewebsites.net/",API_KEY:""};e.exports=n},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("router-view")],1)},o=[],s={name:"App",components:{},data:function(){return{}}},c=s,u=n("2877"),i=n("6544"),l=n.n(i),d=n("7496"),f=Object(u["a"])(c,a,o,!1,null,null,null),p=f.exports;l()(f,{VApp:d["a"]});n("45fc"),n("d3b7");var m=n("8c4f"),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("Login")],1)},g=[],b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"inspire"}},[n("v-content",[n("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[n("v-card",{staticClass:"elevation-12"},[n("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[n("v-toolbar-title",[e._v("Login form ")]),n("v-spacer"),n("v-tooltip",{attrs:{bottom:""}})],1),n("v-card-text",[n("v-form",[n("v-text-field",{attrs:{label:"Username",name:"Username","prepend-icon":"mdi-account",type:"text",rules:[function(e){return!!e||"Username is required"}]},model:{value:e.payload.username,callback:function(t){e.$set(e.payload,"username","string"===typeof t?t.trim():t)},expression:"payload.username"}}),n("v-text-field",{attrs:{id:"password",label:"Password",name:"password","prepend-icon":"mdi-lock","append-icon":e.showPassword?"mdi-eye":"mdi-eye-off",type:e.showPassword?"text":"password",rules:[function(e){return!!e||"Password is required"}]},on:{"click:append":function(t){e.showPassword=!e.showPassword}},model:{value:e.payload.password,callback:function(t){e.$set(e.payload,"password","string"===typeof t?t.trim():t)},expression:"payload.password"}})],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"primary"},on:{click:e.login}},[e._v("Login")])],1)],1)],1)],1)],1)],1)],1)},v=[],w=(n("96cf"),n("1da1")),y=n("5530"),k=n("2f62"),x={name:"login-page",data:function(){return{showPassword:!1,payload:{username:"",password:""}}},computed:Object(y["a"])({},Object(k["c"])(["adminDetails"])),methods:Object(y["a"])(Object(y["a"])({},Object(k["b"])(["Login"])),{},{login:function(){var e=this;return Object(w["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!=e.payload.username){t.next=5;break}return alert("Please Enter Username"),t.abrupt("return",!1);case 5:if(""!=e.payload.password){t.next=8;break}return alert("Please Enter Password"),t.abrupt("return",!1);case 8:e.Login(e.payload).then((function(t){console.log(t.data.msg),e.$router.push({name:"Dashboard"})})).catch((function(e){alert(e.response.data.msg)}));case 9:case"end":return t.stop()}}),t)})))()}})},P=x,j=n("8336"),O=n("b0af"),L=n("99d9"),_=n("62ad"),S=n("a523"),A=n("a75b"),E=n("4bd4"),I=n("0fd9"),C=n("2fa4"),V=n("8654"),T=n("71d9"),q=n("2a7f"),D=n("3a2f"),U=Object(u["a"])(P,b,v,!1,null,null,null),R=U.exports;l()(U,{VApp:d["a"],VBtn:j["a"],VCard:O["a"],VCardActions:L["a"],VCardText:L["b"],VCol:_["a"],VContainer:S["a"],VContent:A["a"],VForm:E["a"],VRow:I["a"],VSpacer:C["a"],VTextField:V["a"],VToolbar:T["a"],VToolbarTitle:q["a"],VTooltip:D["a"]});var $={name:"Home",components:{Login:R}},B=$,N=Object(u["a"])(B,h,g,!1,null,null,null),F=N.exports;r["a"].use(m["a"]);var M=[{path:"/",name:"Login",component:F,meta:{guest:!0}},{path:"/dashboard",component:function(){return Promise.all([n.e("chunk-3c88f634"),n.e("chunk-b46be8f0")]).then(n.bind(null,"78de"))},children:[{name:"Dashboard",path:"",component:function(){return Promise.all([n.e("chunk-3c88f634"),n.e("chunk-2d221e27")]).then(n.bind(null,"cbf8"))},meta:{requiresAuth:!0}},{name:"FAQ Page",path:"/faq",component:function(){return n.e("chunk-2d0decd7").then(n.bind(null,"86cf"))},meta:{requiresAuth:!0}},{name:"UserList",path:"/users",component:function(){return Promise.all([n.e("chunk-3c88f634"),n.e("chunk-a2529f6c")]).then(n.bind(null,"87e6"))},meta:{requiresAuth:!0}}]}],H=new m["a"]({routes:M});H.beforeEach((function(e,t,n){var r=localStorage.getItem("isloggedIn");e.matched.some((function(e){return e.meta.requiresAuth}))?"false"==r?n({name:"Login"}):n():e.matched.some((function(e){return e.meta.guest}))&&("true"==r?n({name:"Dashboard"}):n())}));var J=H,K=n("51be"),z=n("bc3a");function Q(e){return z.post(K["BASE_URL"]+"admin/login",e)}r["a"].use(k["a"]);var Y=new k["a"].Store({state:{adminDetails:{name:"abcd",isloggedIn:localStorage.getItem("isloggedIn")}},mutations:{setLoggedInStatus:function(e,t){e.adminDetails.isloggedIn=t.isloggedIn,localStorage.setItem("isloggedIn",t.isloggedIn)}},actions:{Login:function(e,t){var n=e.commit;return Q(t).then(function(){var e=Object(w["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r={},r.isloggedIn=!0,e.next=4,n("setLoggedInStatus",r);case 4:return e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},Logout:function(e){var t=e.commit,n={isloggedIn:!1};t("setLoggedInStatus",n)}},modules:{}}),G=n("f309");r["a"].use(G["a"]);var W=new G["a"]({});r["a"].config.productionTip=!1,new r["a"]({router:J,store:Y,vuetify:W,render:function(e){return e(p)}}).$mount("#app")}});
//# sourceMappingURL=app.6fdb6700.js.map