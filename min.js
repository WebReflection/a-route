var ARoute=function(t){"use strict";function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function p(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function o(t,e,n){return(o=p()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&f(o,n.prototype),o}).apply(null,arguments)}function l(t){var r="function"==typeof Map?new Map:void 0;return(l=function(t){if(null===t||(e=t,-1===Function.toString.call(e).indexOf("[native code]")))return t;var e;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(t))return r.get(t);r.set(t,n)}function n(){return o(t,arguments,u(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),f(n,t)})(t)}function s(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function e(t,e){var n=[];return g(x(t,n,e),n)}function n(t,e){return d(y(t,e),e)}var r=x,i=g,a=y,h=d,v=b,R="/",j=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function y(t,e){for(var n,r=[],o=0,i=0,a="",c=e&&e.delimiter||R,u=e&&e.whitelist||void 0,f=!1;null!==(n=j.exec(t));){var p,l,s,h,v,y,g,d,m,b,x,w=n[0],E=n[1],O=n.index;a+=t.slice(i,O),i=O+w.length,E?(a+=E[1],f=!0):(p="",l=n[2],s=n[3],h=n[4],v=n[5],!f&&a.length&&(g=a[y=a.length-1],(!u||-1<u.indexOf(g))&&(p=g,a=a.slice(0,y))),a&&(r.push(a),a="",f=!1),d="+"===v||"*"===v,m="?"===v||"*"===v,b=s||h,x=p||c,r.push({name:l||o++,prefix:p,delimiter:x,optional:m,repeat:d,pattern:b?b.replace(/([=!:$/()])/g,"\\$1"):"[^"+k(x===c?x:x+c)+"]+?"}))}return(a||i<t.length)&&r.push(a+t.substr(i)),r}function g(f,p){return function(t,e){var n=f.exec(t);if(!n)return!1;for(var r,o=n[0],i=n.index,a={},c=e&&e.decode||decodeURIComponent,u=1;u<n.length;u++){void 0!==n[u]&&((r=p[u-1]).repeat?a[r.name]=n[u].split(r.delimiter).map(function(t){return c(t,r)}):a[r.name]=c(n[u],r))}return{path:o,index:i,params:a}}}function d(p,t){for(var l=new Array(p.length),e=0;e<p.length;e++)"object"==typeof p[e]&&(l[e]=new RegExp("^(?:"+p[e].pattern+")$",m(t)));return function(t,e){for(var n="",r=e&&e.encode||encodeURIComponent,o=!e||!1!==e.validate,i=0;i<p.length;i++){var a=p[i];if("string"!=typeof a){var c,u=t?t[a.name]:void 0;if(Array.isArray(u)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(0===u.length){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var f=0;f<u.length;f++){if(c=r(u[f],a),o&&!l[i].test(c))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');n+=(0===f?a.prefix:a.delimiter)+c}}else if("string"!=typeof u&&"number"!=typeof u&&"boolean"!=typeof u){if(!a.optional)throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}else{if(c=r(String(u),a),o&&!l[i].test(c))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+c+'"');n+=a.prefix+c}}else n+=a}return n}}function k(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function m(t){return t&&t.sensitive?"":"i"}function b(t,e,n){for(var r,o,i=(n=n||{}).strict,a=!1!==n.start,c=!1!==n.end,u=n.delimiter||R,f=[].concat(n.endsWith||[]).map(k).concat("$").join("|"),p=a?"^":"",l=0;l<t.length;l++){var s,h=t[l];"string"==typeof h?p+=k(h):(s=h.repeat?"(?:"+h.pattern+")(?:"+k(h.delimiter)+"(?:"+h.pattern+"))*":h.pattern,e&&e.push(h),h.optional?h.prefix?p+="(?:"+k(h.prefix)+"("+s+"))?":p+="("+s+")?":p+=k(h.prefix)+"("+s+")")}return c?(i||(p+="(?:"+k(u)+")?"),p+="$"===f?"$":"(?="+f+")"):(o="string"==typeof(r=t[t.length-1])?r[r.length-1]===u:void 0===r,i||(p+="(?:"+k(u)+"(?="+f+"))?"),o||(p+="(?="+k(u)+"|"+f+")")),new RegExp(p,m(n))}function x(t,e,n){return t instanceof RegExp?function(t,e){if(!e)return t;var n=t.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return t}(t,e):Array.isArray(t)?function(t,e,n){for(var r=[],o=0;o<t.length;o++)r.push(x(t[o],e,n).source);return new RegExp("(?:"+r.join("|")+")",m(n))}(t,e,n):(r=e,b(y(t,o=n),r,o));var r,o}r.match=e,r.regexpToFunction=i,r.parse=a,r.compile=n,r.tokensToFunction=h,r.tokensToRegExp=v;var w=Object.create,E=Object.freeze,O=Object.keys,_=customElements.get("a-route"),T=_?_.app:E({_:E({params:w(null),paths:w(null)}),get:function(t){for(var e=T._.paths,n=[],r="*"===t?"*":S(t,n),o=e[r]||(e[r]={keys:n,re:r,cb:[]}),i=1,a=arguments.length;i<a;i++)o.cb.push(arguments[i]);return T},delete:function(t){for(var e="*"===t?"*":S(t,[]),n=T._.paths[e],r=1,o=arguments.length;r<o;r++){var i=arguments[r],a=n?n.cb.lastIndexOf(i):-1;-1<a&&n.cb.splice(a,1)}return T},navigate:function(t,e){C(t,e&&"push"!==e?"replace"===e?-1:0:1)},param:function(t,e){for(var n=T._.params,r=[].concat(t),o=0,i=r.length;o<i;o++)n[r[o]]=e;return T},use:function(t,e){"function"==typeof t&&(e=t,t="(.*)");for(var n=[].concat(t),r=0,o=n.length;r<o;r++)T.get(n[r],e);return T}}),A=_||function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(a,l(HTMLAnchorElement));var n,r,t,e,o,i=(n=a,r=p(),function(){var t,e=u(n);return s(this,r?(t=u(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments))});function a(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),i.apply(this,arguments)}return t=a,o=[{key:"app",get:function(){return T}}],(e=[{key:"connectedCallback",value:function(){this.addEventListener("click",this)}},{key:"disconnectedCallback",value:function(){this.removeEventListener("click",this)}},{key:"handleEvent",value:function(t){t.preventDefault(),this.hasAttribute("no-propagation")&&t.stopPropagation();var e=new URL(this.href);C(e.pathname+e.search+e.hash,this.hasAttribute("replace")?-1:1)}}])&&c(t.prototype,e),o&&c(t,o),a}();function S(t,e){return"string"!=typeof t&&(t=(t=t.toString()).slice(1,t.lastIndexOf("/"))),r(t,e)}function $(t){return t in this}function P(n,r){var o=[];!function t(){var e=r.shift();e&&(o.lastIndexOf(e)<0?(o.push(e),e(n,t)):t())}()}function C(i,t){var e=T._,a=e.params,c=e.paths;t<0?history.replaceState(location.href,document.title,i):t&&history.pushState(location.href,document.title,i);function n(t){if("*"===t)return"continue";var n=c[t],e=n.re.exec(i);if(e){var r={path:i,params:function(t,e){for(var n=w(null),r=1,o=t.length;r<o;r++)null!=t[r]&&(n[e[r-1].name]=t[r]);return n}(e,n.keys)},o=O(r.params).filter($,a);return{v:function t(){var e;o.length?(e=o.shift(),a[e](r,t,r.params[e])):P(r,n.cb.slice(0))}()}}}for(var r in c){var o=n(r);switch(o){case"continue":continue;default:if("object"==typeof o)return o.v}}"*"in c&&P({path:i},c["*"].cb.slice(0))}return _||(customElements.define("a-route",A,{extends:"a"}),addEventListener("popstate",function(){var t=location;C(t.pathname+t.search+t.hash,0)})),t.ARoute=A,t.app=T,t}({});