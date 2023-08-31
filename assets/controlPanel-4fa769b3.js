(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();class _{constructor(e,t,i){this.width=e,this.height=t,this.pixels=new Uint8ClampedArray(i)}static fromJSON(e){return new _(e.width,e.height,e.pixels)}static empty(e,t,i){let n=new Array(e*t).fill(i);return new _(e,t,n)}static fromTile(e,t,i){let n=[];for(let o=0;o<t;o++)for(let r=0;r<e;r++)n.push(i.pixel(r%i.width,o%i.height));return new _(e,t,n)}resize(e,t){let i=[];for(let n=0;n<t;n++)for(let o=0;o<e;o++)n>=this.height||o>=this.width?i.push(0):i.push(this.pixel(o,n));return new _(e,t,i)}make2d(){let e=Array.from(this.pixels).slice(),t=[];for(;e.length>0;)t.push(e.splice(0,this.width));return t}vMirror(){return this.make2d().map(e=>e.toReversed()).flat()}pixel(e,t){return e>this.width-1||e<0||t>this.height-1||t<0?-1:this.pixels.at(e+t*this.width)}draw(e){let t=this.pixels.slice();for(let{x:i,y:n,color:o}of e)i<0||n<0||i>=this.width||n>=this.height||(t[i+n*this.width]=o);return new _(this.width,this.height,t)}brush({x:e,y:t},i){let n={x:e,y:t,color:i};return this.draw([n])}flood({x:e,y:t},i){const n=this.pixel(e,t);if(n===i)return this.draw([]);const o=[{dx:-1,dy:0},{dx:1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}];let r=[{x:e,y:t,color:i}];for(let a=0;a<r.length;a++)for(let{dx:l,dy:c}of o){let h=r[a].x+l,d=r[a].y+c;h>=0&&h<this.width&&d>=0&&d<this.height&&this.pixel(h,d)==n&&!r.some(u=>u.x==h&&u.y==d)&&r.push({x:h,y:d,color:i})}return this.draw(r)}shift(e,t){let i=[];for(let n=0;n<this.height;n++)for(let o=0;o<this.width;o++)i.push({x:(o-e%this.width+this.width)%this.width,y:(n-t%this.height+this.height)%this.height,color:this.pixel(o,n)});return this.draw(i)}rect(e,t,i){let n=Math.min(e.x,t.x),o=Math.min(e.y,t.y),r=Math.max(e.x,t.x),a=Math.max(e.y,t.y),l=[];for(let c=o;c<=a;c++)for(let h=n;h<=r;h++)l.push({x:h,y:c,color:i});return this.draw(l)}line(e,t,i){let n=[];if(Math.abs(e.x-t.x)>Math.abs(e.y-t.y)){e.x>t.x&&([e,t]=[t,e]);let o=(t.y-e.y)/(t.x-e.x);for(let{x:r,y:a}=e;r<=t.x;r++)n.push({x:r,y:Math.round(a),color:i}),a+=o}else{e.y>t.y&&([e,t]=[t,e]);let o=(t.x-e.x)/(t.y-e.y);for(let{x:r,y:a}=e;a<=t.y;a++)n.push({x:Math.round(r),y:a,color:i}),r+=o}return this.draw(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const z=window,H=z.trustedTypes,j=H?H.createPolicy("lit-html",{createHTML:s=>s}):void 0,D="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,X="?"+$,ne=`<${X}>`,T=document,I=()=>T.createComment(""),R=s=>s===null||typeof s!="object"&&typeof s!="function",G=Array.isArray,se=s=>G(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",U=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,W=/>/g,b=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,Z=/"/g,Q=/^(?:script|style|textarea|title)$/i,oe=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),g=oe(1),v=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),F=new WeakMap,w=T.createTreeWalker(T,129,null,!1);function ee(s,e){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return j!==void 0?j.createHTML(e):e}const re=(s,e)=>{const t=s.length-1,i=[];let n,o=e===2?"<svg>":"",r=C;for(let a=0;a<t;a++){const l=s[a];let c,h,d=-1,u=0;for(;u<l.length&&(r.lastIndex=u,h=r.exec(l),h!==null);)u=r.lastIndex,r===C?h[1]==="!--"?r=V:h[1]!==void 0?r=W:h[2]!==void 0?(Q.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=b):h[3]!==void 0&&(r=b):r===b?h[0]===">"?(r=n??C,d=-1):h[1]===void 0?d=-2:(d=r.lastIndex-h[2].length,c=h[1],r=h[3]===void 0?b:h[3]==='"'?Z:Y):r===Z||r===Y?r=b:r===V||r===W?r=C:(r=b,n=void 0);const f=r===b&&s[a+1].startsWith("/>")?" ":"";o+=r===C?l+ne:d>=0?(i.push(c),l.slice(0,d)+D+l.slice(d)+$+f):l+$+(d===-2?(i.push(void 0),a):f)}return[ee(s,o+(s[t]||"<?>")+(e===2?"</svg>":"")),i]};class P{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let o=0,r=0;const a=e.length-1,l=this.parts,[c,h]=re(e,t);if(this.el=P.createElement(c,i),w.currentNode=this.el.content,t===2){const d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(n=w.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes()){const d=[];for(const u of n.getAttributeNames())if(u.endsWith(D)||u.startsWith($)){const f=h[r++];if(d.push(u),f!==void 0){const A=n.getAttribute(f.toLowerCase()+D).split($),k=/([.?@])?(.*)/.exec(f);l.push({type:1,index:o,name:k[2],strings:A,ctor:k[1]==="."?ce:k[1]==="?"?de:k[1]==="@"?he:O})}else l.push({type:6,index:o})}for(const u of d)n.removeAttribute(u)}if(Q.test(n.tagName)){const d=n.textContent.split($),u=d.length-1;if(u>0){n.textContent=H?H.emptyScript:"";for(let f=0;f<u;f++)n.append(d[f],I()),w.nextNode(),l.push({type:2,index:++o});n.append(d[u],I())}}}else if(n.nodeType===8)if(n.data===X)l.push({type:2,index:o});else{let d=-1;for(;(d=n.data.indexOf($,d+1))!==-1;)l.push({type:7,index:o}),d+=$.length-1}o++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}}function N(s,e,t=s,i){var n,o,r,a;if(e===v)return e;let l=i!==void 0?(n=t._$Co)===null||n===void 0?void 0:n[i]:t._$Cl;const c=R(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),c===void 0?l=void 0:(l=new c(s),l._$AT(s,t,i)),i!==void 0?((r=(a=t)._$Co)!==null&&r!==void 0?r:a._$Co=[])[i]=l:t._$Cl=l),l!==void 0&&(e=N(s,l._$AS(s,e.values),l,i)),e}class le{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:n}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:T).importNode(i,!0);w.currentNode=o;let r=w.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let h;c.type===2?h=new L(r,r.nextSibling,this,e):c.type===1?h=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(h=new ue(r,this,e)),this._$AV.push(h),c=n[++l]}a!==(c==null?void 0:c.index)&&(r=w.nextNode(),a++)}return w.currentNode=T,o}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class L{constructor(e,t,i,n){var o;this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cp=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),R(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==v&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):se(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==y&&R(this._$AH)?this._$AA.nextSibling.data=e:this.$(T.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:n}=e,o=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=P.createElement(ee(n.h,n.h[0]),this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.v(i);else{const r=new le(o,this),a=r.u(this.options);r.v(i),this.$(a),this._$AH=r}}_$AC(e){let t=F.get(e.strings);return t===void 0&&F.set(e.strings,t=new P(e)),t}T(e){G(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const o of e)n===t.length?t.push(i=new L(this.k(I()),this.k(I()),this,this.options)):i=t[n],i._$AI(o),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class O{constructor(e,t,i,n,o){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,n){const o=this.strings;let r=!1;if(o===void 0)e=N(this,e,t,0),r=!R(e)||e!==this._$AH&&e!==v,r&&(this._$AH=e);else{const a=e;let l,c;for(e=o[0],l=0;l<o.length-1;l++)c=N(this,a[i+l],t,l),c===v&&(c=this._$AH[l]),r||(r=!R(c)||c!==this._$AH[l]),c===y?e=y:e!==y&&(e+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!n&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ce extends O{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}}const ae=H?H.emptyScript:"";class de extends O{constructor(){super(...arguments),this.type=4}j(e){e&&e!==y?this.element.setAttribute(this.name,ae):this.element.removeAttribute(this.name)}}class he extends O{constructor(e,t,i,n,o){super(e,t,i,n,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=N(this,e,t,0))!==null&&i!==void 0?i:y)===v)return;const n=this._$AH,o=e===y&&n!==y||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==y&&(n===y||o);o&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class ue{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}}const J=z.litHtmlPolyfillSupport;J==null||J(P,L),((B=z.litHtmlVersions)!==null&&B!==void 0?B:z.litHtmlVersions=[]).push("2.8.0");const E=(s,e,t)=>{var i,n;const o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let r=o._$litPart$;if(r===void 0){const a=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=r=new L(e.insertBefore(I(),a),a,void 0,t??{})}return r._$AI(s),r};function pe({state:s,parent:e,dispatch:t},{target:i="desktop"}){s.pos={x:-1,y:-1};function n(o,r){const a=e[i].getBoundingClientRect(),l=Math.floor((o-s.pan.x-a.x)/(s.aspectRatio[0]*s.scale)),c=Math.floor((r-s.pan.y-a.y)/(s.aspectRatio[1]*s.scale));return{x:l,y:c}}return e[i].addEventListener("mousemove",o=>{const{x:r,y:a}=n(o.clientX,o.clientY);(s.pos.x!=r||s.pos.y!=a)&&t({pos:{x:r,y:a}})}),{syncState(o){s=o}}}function fe(s={}){return e=>pe(e,s)}const ye=[fe()];function ve(s,e){return{...s,...e}}function me(s){return E(g`<style>
        .bimp-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex: 1 1 0;
        }
        .bimp-center {
          display: flex;
          flex: 1 0 0;
          gap: 5px;
        }
        .bimp-workspace {
          display: grid;
          flex: 1 1 0;
          gap: 1px;
          grid-template-areas:
            ". top ."
            "left c right"
            ". bottom .";
          overflow: hidden;
          grid-template-columns: min-content 1fr min-content;
          grid-template-rows: min-content 1fr min-content;
          outline: 1px solid black;
          background-color: #222222;

          flex: 1 1 0;
          min-height: 0;
          min-width: 0;
        }

        .bimp-workspace > * {
          position: relative;
        }

        .bimp-desktop {
          outline: 1px solid black;
          background-color: #3f3f3f;
          grid-area: c;
        }

        .bimp-desktop > * {
          position: absolute;
          flex: 1 1 0;
        }
        .bimp-sidebar-primary,
        .bimp-sidebar-secondary {
          display: flex;
          flex-direction: column;
          /* align-items: center; */
          justify-content: space-between;
          padding: 4px;
        }
        .bimp-taskbar-primary,
        .bimp-taskbar-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          gap: 5px;
        }
      </style>
      <div class="bimp-container">
        <div class="bimp-taskbar-primary"></div>
        <div class="bimp-center">
          <div class="bimp-sidebar-primary"></div>
          <div class="bimp-workspace">
            <div class="bimp-desktop"></div>
          </div>
          <div class="bimp-sidebar-secondary"></div>
        </div>
        <div class="bimp-taskbar-secondary"></div>
      </div>`,s),{container:s.querySelector(":scope .bimp-container"),workspace:s.querySelector(":scope .bimp-workspace"),desktop:s.querySelector(":scope .bimp-desktop"),sidebarPrimary:s.querySelector(":scope .bimp-sidebar-primary"),sidebarSecondary:s.querySelector(":scope .bimp-sidebar-secondary"),taskbarPrimary:s.querySelector(":scope .bimp-taskbar-primary"),taskbarSecondary:s.querySelector(":scope .bimp-taskbar-secondary")}}_.empty(10,10,0);class Me{constructor({state:e,parent:t,components:i,buildLayout:n=me}){this.state=e,this.initialized=!1,this.dispatch=o=>{const r=Object.keys(o);e=ve(e,o),this.syncState(e,r)},this.dom=n(t),this.components=ye.concat(i.flat()).map(o=>o({state:e,parent:this.dom,dispatch:this.dispatch})),t.appendChild(this.dom.container),this.initialized=!0,this.components.forEach(o=>{"attached"in o&&o.attached(e)})}syncState(e,t){this.state=e,this.components.forEach(i=>{i.syncState(e)})}}function He(s,e,t){function i(n,o){const r=o.bitmap.line({x:s.x,y:s.y},{x:n.x,y:n.y},o.paletteIndex);s=n,t({bitmap:r})}return i(s,e),i}function Ne(s,e,t){function i({x:n,y:o},r){t({bitmap:r.bitmap.flood({x:n,y:o},r.paletteIndex)})}return i(s,e),i}function Ce(s,e,t){function i({x:n,y:o},r){const a=e.bitmap.rect({x:s.x,y:s.y},{x:n,y:o},e.paletteIndex);t({bitmap:a})}return i(s),i}function Ie(s,e,t){function i({x:n,y:o}){t({bitmap:e.bitmap.line({x:s.x,y:s.y},{x:n,y:o},e.paletteIndex)})}return i(s),i}function Re(s,e,t){function i({x:n,y:o}){t({bitmap:e.bitmap.shift(s.x-n,s.y-o)})}return i(s),i}function Pe(s,e,t){function i(n,{pan:o,scale:r,aspectRatio:a}){const l=(s.x-n.x)*r*a[0],c=(s.y-n.y)*r*a[1];t({pan:{x:o.x-l,y:o.y-c}})}return i}function xe({state:s,parent:e,dispatch:t},{tools:i,target:n="workspace",container:o="sidebarPrimary"}){s.activeTool=Object.keys(i)[0];const r=e[n];r.addEventListener("pointerdown",l=>{let c=s.pos,h=i[s.activeTool],d=h(c,s,t);if(!d)return;let u=f=>{if(f.buttons==0)r.removeEventListener("mousemove",u);else{let A=s.pos;if(A.x==c.x&&A.y==c.y)return;d(s.pos,s),c=A}};r.addEventListener("mousemove",u)});function a(l){return g`<style>
        button {
          padding: 3px 8px;
          border: 0;
          outline: 0;
          border-radius: 4px;
          background-color: #252525;
          color: #9e9e9e;
          cursor: pointer;
        }
        button:hover {
          background-color: #676767;
        }

        .tool-container {
          display: flex;
          flex-direction: inherit;
          gap: 5px;
        }
        .active {
          background-color: #343434;
          color: #f1f1f1;
        }
      </style>
      <div class="tool-container">
        ${Object.keys(i).map(c=>g`<button
              class=${l.activeTool==c?"active":""}
              @click=${()=>t({activeTool:c})}>
              ${c}
            </button>`)}
      </div>`}return E(a(s),e[o]),{syncState(l){s=l,E(a(s),e[o])}}}function Le(s={}){return e=>xe(e,s)}function $e({state:s,parent:e,dispatch:t},{paletteBuilder:i,container:n="desktop",paletteSelect:o=!0,palettePosition:r="sidebarSecondary"}){s.paletteIndex=0;let a=i({state:s,parent:e,dispatch:t}),{aspectRatio:l,scale:c,pan:h,bitmap:d}=s,u=null;const f=document.createElement("canvas");f.style.cssText="outline: 1px solid black",e[n].appendChild(f),o&&e[r].appendChild(a.dom);function A(){const p=f.getContext("2d");for(let m=0;m<d.height;m++)for(let x=0;x<d.width;x++){let S=d.pixel(x,m);(u==null||u.pixel(x,m)!=S)&&(p.translate(x*l[0]*c,m*l[1]*c),a.draw(S,p,l[0]*c,l[1]*c),p.setTransform(1,0,0,1,0,0))}u=d}function k(){f.width=d.width*l[0]*c,f.height=d.height*l[1]*c,f.style.transform=`translate(${h.x}px, ${h.y}px)`}function q(){const p=e[n].getBoundingClientRect(),m=p.width,x=p.height,S=Math.min(Math.floor(m/(d.width*l[0])),Math.floor(x/(d.height*l[1]))),te=Math.floor((m-d.width*l[0]*S)/2),ie=Math.floor((x-d.height*l[1]*S)/2);t({scale:S,pan:{x:te,y:ie}})}return{attached(p){({aspectRatio:l,scale:c,bitmap:d}=p),setTimeout(()=>q(p.bitmap),1)},syncState(p){if(p.bitmap.width!=d.width||p.bitmap.height!=d.height){d=p.bitmap,setTimeout(()=>q(),1);return}(p.aspectRatio[0]!=l[0]||p.aspectRatio[1]!=l[1]||p.scale!=c||p.pan.x!=h.x||p.pan.y!=h.y)&&({aspectRatio:l,scale:c,pan:h,bitmap:d}=p,u=null,k()),u!=p.bitmap&&({bitmap:d}=p,A()),a.syncState(p)}}}function ze(s={}){return e=>$e(e,s)}function ge({symbols:s,showSelect:e=!0},{state:t,dispatch:i}){let n=t.paletteIndex,o=document.createElement("div");o.style.flexDirection="inherit";function r(){e&&E(g`<style>
          .palette-select {
            display: flex;
            flex-direction: inherit;
            gap: 3px;
            justify-content: center;
          }
          .palette-select > img {
            border: 1px solid black;
          }
          .selected {
            outline: 2px solid white;
          }
        </style>
        <div class="palette-select">
          ${s.map(({image:c,title:h},d)=>g`<img
                class=${d==n?"selected":""}
                src=${c.src}
                title=${h}
                @click=${()=>i({paletteIndex:d})} />`)}
        </div> `,o)}function a(c,h,d,u){h.drawImage(s[c].image,0,0,d,u)}function l({paletteIndex:c}){n!=c&&(n=c,r())}return r(),{draw:a,dom:o,syncState:l}}function Ae({entries:s,showSelect:e=!0,selectSize:t="30px"},{state:i,dispatch:n}){let o=i.paletteIndex,r=document.createElement("div");r.style.flexDirection="inherit";function a(){e&&E(g`<style>
          .palette-select {
            display: flex;
            flex-direction: inherit;
            gap: 3px;
            padding: 3px;
          }
          .palette-select > div {
            border: 1px solid black;
            min-width: ${t};
            aspect-ratio: 1;
          }
          .selected {
            outline: 1px solid white;
          }
        </style>
        <div class="palette-select">
          ${s.map((h,d)=>g`<div
                class=${d==o?"selected":""}
                style="background-color: ${h}"
                @click=${()=>n({paletteIndex:d})}></div>`)}
        </div> `,r)}function l(h,d,u,f){d.fillStyle=s[h],d.fillRect(0,0,u,f)}function c({paletteIndex:h}){o!=h&&(o=h,a())}return a(),{draw:l,dom:r,syncState:c}}function Oe(s){return e=>ge(s,e)}function Be(s){return e=>Ae({entries:s},e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},be=s=>(...e)=>({_$litDirective$:s,values:e});class _e{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const we=s=>s.strings===void 0,Te={},Ee=(s,e=Te)=>s._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=be(class extends _e{constructor(s){if(super(s),s.type!==M.PROPERTY&&s.type!==M.ATTRIBUTE&&s.type!==M.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!we(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[e]){if(e===v||e===y)return e;const t=s.element,i=s.name;if(s.type===M.PROPERTY){if(e===t[i])return v}else if(s.type===M.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return v}else if(s.type===M.ATTRIBUTE&&t.getAttribute(i)===e+"")return v;return Ee(s),e}});function ke(){function s({bitmap:e},t){return g`<style>
        .resize-control {
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          flex-direction: inherit;
          gap: 5px;
        }
        .control-group {
          display: flex;
        }
        .size-input {
          max-width: 40px;
        }
        .minus::before {
          content: "-";
        }
        .plus::before {
          content: "+";
        }
      </style>
      <div class="resize-control">
        <span>Width</span>
        <div class="control-group">
          <button
            class="minus"
            @click=${()=>t({bitmap:e.resize(e.width-1,e.height)})}></button>
          <input
            type="number"
            class="size-input"
            .value=${K(e.width)}
            @change=${i=>t({bitmap:e.resize(Number(i.target.value),e.height)})} />
          <button
            class="plus"
            @click=${()=>t({bitmap:e.resize(e.width+1,e.height)})}></button>
        </div>
        <span>Height</span>
        <div class="control-group">
          <button
            class="minus"
            @click=${()=>t({bitmap:e.resize(e.width,e.height-1)})}></button>
          <input
            type="number"
            .value=${K(e.height)}
            class="size-input"
            @change=${i=>t({bitmap:e.resize(e.width,Number(i.target.value))})} />
          <button
            class="plus"
            @click=${()=>t({bitmap:e.resize(e.width,e.height+1)})}></button>
        </div>
      </div>`}return{view:s}}function Se({state:s,parent:e,dispatch:t},{controls:i=[ke()],container:n="sidebarPrimary"}){const o=document.createElement("div");o.style.flexDirection="inherit",e[n].appendChild(o);function r(){return i.map(a=>a.view(s,t))}return E(r(),o),{syncState(a){s=a,E(r(),o)}}}function Ue(s={}){return e=>Se(e,s)}export{_ as B,E as D,Me as a,Oe as b,Ue as c,ze as d,He as e,Ne as f,Be as g,Ie as l,Pe as p,Ce as r,Re as s,Le as t,g as x};
