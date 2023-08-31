import{D as u,x as s}from"./controlPanel-344f8895.js";function w({bitmap:r},h,e){return Array.apply(null,Array(h=="bottom"||h=="top"?r.width:r.height)).map((n,l)=>l+1)}function $({state:r,parent:h},{gutterPos:e,size:n,container:l="workspace",gutterFunc:o=w}){let{bitmap:p,pan:c,pos:a,aspectRatio:f,scale:m}=r,t=o(r,e,n),i=document.createElement("div");i.style.display="flex",i.style.gridArea=e,e=="bottom"||e=="top"?i.style.height=`${n}px`:(e=="left"||e=="right")&&(i.style.width=`${n}px`),h[l].appendChild(i);function x(d){if((e=="bottom"||e=="top")&&a.x==d||(e=="left"||e=="right")&&a.y==d)return!0}function y(){e=="left"||e=="right"?i.style.transform=`translateY(${c.y}px)`:(e=="top"||e=="bottom")&&(i.style.transform=`translateX(${c.x}px)`)}const b=()=>s`<style>
        .gutter {
          background-color: black;
          font-family: monospace;
          font-size: 0.8em;
          font-weight: bold;
          color: #969696;
          user-select: none;
          position: absolute;
          display: flex;
          gap: 1px;
          outline: 1px solid black;
        }
        .left,
        .right {
          height: ${p.height*f[1]*m}px;
          flex-direction: column;
          width: 100%;
        }

        .top,
        .bottom {
          width: ${p.width*f[0]*m}px;
          height: 100%;
        }

        .cell {
          flex: 1 1 0;
          background-color: #2d2c2c;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .gutter > .cell:nth-of-type(odd) {
          background: #3b3b3b;
        }

        .highlight {
          background-color: #00000044 !important;
          color: #fafafa !important;
        }
      </style>
      <div class="gutter ${e}">
        ${t.map((d,g)=>s`<div class="cell ${x(g)?"highlight":""}">
              ${d}
            </div>`)}
      </div>`;return{syncState(d){({bitmap:p,pan:c,pos:a,aspectRatio:f,scale:m}=d),t=o(d,e,n),y(),u(b(),i)}}}function R(r={}){return h=>$(h,r)}function k({state:r,parent:h},{container:e="desktop"}){let{aspectRatio:n,scale:l,bitmap:o,pan:p}=r,c=[n[0]*l,n[1]*l];const a=document.createElement("canvas");a.style.cssText="image-rendering: pixelated;",h[e].appendChild(a);function f(){const t=a.getContext("2d");t.translate(-.5,-.5),t.clearRect(0,0,a.width,a.height),t.beginPath();for(let i=1;i<o.width;i++)t.moveTo(i*c[0],0),t.lineTo(i*c[0],o.height*c[1]);for(let i=1;i<o.height;i++)t.moveTo(0,i*c[1]),t.lineTo(o.width*c[0],i*c[1]);t.stroke()}function m(){a.width=o.width*n[0]*l,a.height=o.height*n[1]*l,a.style.transform=`translate(${p.x}px, ${p.y}px)`}return{syncState(t){(t.bitmap.width!=o.width||t.bitmap.height!=o.height||t.aspectRatio[0]!=n[0]||t.aspectRatio[1]!=n[1]||t.scale!=l||t.pan.x!=p.x||t.pan.y!=p.y)&&({aspectRatio:n,scale:l,pan:p,bitmap:o}=t,c=[n[0]*l,n[1]*l],m(),f())}}}function T(r={}){return h=>k(h,r)}export{T as g,R as n};
