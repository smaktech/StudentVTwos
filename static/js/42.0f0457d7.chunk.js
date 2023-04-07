(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[42],{1616:function(e,t,a){"use strict";a.d(t,"b",(function(){return n}));var o=a(138),c=a(150);function n(e){return Object(o.a)("MuiSwitch",e)}var r=Object(c.a)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);t.a=r},1622:function(e,t,a){"use strict";var o=a(15),c=a(4),n=a(8),r=a(3),i=a(815),s=a(10),l=a(18),d=a(67),u=a(93),b=a(275),h=a(428),m=a(11),f=a(2),p=a(430),j=a(320);function O(e){return Object(p.a)("MuiMasonry",e)}Object(j.a)("MuiMasonry",["root"]);var g=a(0),v=["children","className","component","columns","spacing","defaultColumns","defaultHeight","defaultSpacing"],w=function(e){return Number(e.replace("px",""))},x=Object(s.a)("div",{name:"MuiMasonry",slot:"Root",overridesResolver:function(e,t){return[t.root]}})((function(e){var t=e.ownerState,a=e.theme,o={width:"100%",display:"flex",flexFlow:"column wrap",alignContent:"space-between",boxSizing:"border-box","& > *":{boxSizing:"border-box"}},c={};if(t.isSSR){for(var n={},i=Number(a.spacing(t.defaultSpacing).replace("px","")),s=1;s<=t.defaultColumns;s+=1)n["&:nth-of-type(".concat(t.defaultColumns,"n+").concat(s%t.defaultColumns,")")]={order:s};return c.height=t.defaultHeight,c.margin=-i/2,c["& > *"]=Object(r.a)({},o["& > *"],n,{margin:i/2,width:"calc(".concat((100/t.defaultColumns).toFixed(2),"% - ").concat(i,"px)")}),Object(r.a)({},o,c)}var l=Object(d.d)({values:t.spacing,breakpoints:a.breakpoints.values}),h=Object(u.a)(a);o=Object(b.a)(o,Object(d.b)({theme:a},l,(function(e){var a=Number(e),o=Number(Object(u.d)(h,a).replace("px",""));return Object(r.a)({margin:-o/2,"& > *":{margin:o/2}},t.maxColumnHeight&&{height:Math.ceil(t.maxColumnHeight+o)})})));var m=Object(d.d)({values:t.columns,breakpoints:a.breakpoints.values});return o=Object(b.a)(o,Object(d.b)({theme:a},m,(function(e){var t=Number(e),a="".concat((100/t).toFixed(2),"%"),o="object"!==typeof l?Object(u.d)(h,Number(l)):"0px";return{"& > *":{width:"calc(".concat(a," - ").concat(o,")")}}}))),"object"===typeof l&&(o=Object(b.a)(o,Object(d.b)({theme:a},l,(function(e,t){if(t){var a=Number(e),o=Object.keys(m).pop(),c=Object(u.d)(h,a),n="object"===typeof m?m[t]||m[o]:m,r="".concat((100/n).toFixed(2),"%");return{"& > *":{width:"calc(".concat(r," - ").concat(c,")")}}}return null})))),o})),k=f.forwardRef((function(e,t){var a=Object(l.a)({props:e,name:"MuiMasonry"}),s=a.children,d=a.className,u=a.component,b=void 0===u?"div":u,p=a.columns,j=void 0===p?4:p,k=a.spacing,S=void 0===k?1:k,y=a.defaultColumns,M=a.defaultHeight,C=a.defaultSpacing,R=Object(n.a)(a,v),N=f.useRef(),z=f.useState(),T=Object(c.a)(z,2),B=T[0],E=T[1],H=!B&&M&&void 0!==y&&void 0!==C,D=f.useState(H?y-1:0),I=Object(c.a)(D,2),F=I[0],A=I[1],L=Object(r.a)({},a,{spacing:S,columns:j,maxColumnHeight:B,defaultColumns:y,defaultHeight:M,defaultSpacing:C,isSSR:H}),J=function(e){var t=e.classes;return Object(i.a)({root:["root"]},O,t)}(L),P=f.useRef("undefined"===typeof ResizeObserver?void 0:new ResizeObserver((function(e){if(e){var t,a,c,n,r,i,s,l,d,u;if(e[0].target.className.includes(J.root))t=e[0].target,c=e[0].contentRect.width,n=(null==(i=a=(null==(r=e[1])?void 0:r.target)||t.firstChild)||null==(s=i.contentRect)?void 0:s.width)||(null==(l=a)?void 0:l.clientWidth)||0;else a=e[0].target,n=e[0].contentRect.width,c=(null==(u=(t=(null==(d=e[1])?void 0:d.target)||a.parentElement).contentRect)?void 0:u.width)||t.clientWidth;if(0!==c&&0!==n&&t&&a){var b=window.getComputedStyle(a),h=w(b.marginLeft),m=w(b.marginRight),f=Math.round(c/(n+h+m)),p=new Array(f).fill(0),j=!1;if(t.childNodes.forEach((function(e){if(e.nodeType===Node.ELEMENT_NODE&&"line-break"!==e.dataset.class&&!j){var t=window.getComputedStyle(e),a=w(t.marginTop),c=w(t.marginBottom),n=w(t.height)?Math.ceil(w(t.height))+a+c:0;if(0!==n){for(var r=0;r<e.childNodes.length;r+=1){var i=e.childNodes[r];if("IMG"===i.tagName&&0===i.clientHeight){j=!0;break}}if(!j){var s=p.indexOf(Math.min.apply(Math,Object(o.a)(p)));p[s]+=n;var l=s+1;e.style.order=l}}else j=!0}})),!j)E(Math.max.apply(Math,Object(o.a)(p))),A(f>0?f-1:0)}}})));f.useEffect((function(){var e=P.current;if(void 0!==e){var t=N.current;return t&&e&&(e.observe(t),t.firstChild&&e.observe(t.firstChild)),function(){return e?e.disconnect():{}}}}),[j,S,s]);var W=Object(h.a)(t,N),X={flexBasis:"100%",width:0,margin:0,padding:0},G=new Array(F).fill("").map((function(e,t){return Object(g.jsx)("span",{"data-class":"line-break",style:Object(r.a)({},X,{order:t+1})},t)}));return Object(g.jsxs)(x,Object(r.a)({as:b,className:Object(m.a)(J.root,d),ref:W,ownerState:L},R,{children:[s,G]}))}));t.a=k},1627:function(e,t,a){"use strict";var o=a(6),c=a(8),n=a(3),r=a(2),i=a(11),s=a(239),l=a(58),d=a(16),u=a(324),b=a(18),h=a(10),m=a(1616),f=a(0),p=["className","color","edge","size","sx"],j=Object(h.a)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.edge&&t["edge".concat(Object(d.a)(a.edge))],t["size".concat(Object(d.a)(a.size))]]}})((function(e){var t,a=e.ownerState;return Object(n.a)({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},"start"===a.edge&&{marginLeft:-8},"end"===a.edge&&{marginRight:-8},"small"===a.size&&(t={width:40,height:24,padding:7},Object(o.a)(t,"& .".concat(m.a.thumb),{width:16,height:16}),Object(o.a)(t,"& .".concat(m.a.switchBase),Object(o.a)({padding:4},"&.".concat(m.a.checked),{transform:"translateX(16px)"})),t))})),O=Object(h.a)(u.a,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:function(e,t){var a=e.ownerState;return[t.switchBase,Object(o.a)({},"& .".concat(m.a.input),t.input),"default"!==a.color&&t["color".concat(Object(d.a)(a.color))]]}})((function(e){var t,a=e.theme;return t={position:"absolute",top:0,left:0,zIndex:1,color:"light"===a.palette.mode?a.palette.common.white:a.palette.grey[300],transition:a.transitions.create(["left","transform"],{duration:a.transitions.duration.shortest})},Object(o.a)(t,"&.".concat(m.a.checked),{transform:"translateX(20px)"}),Object(o.a)(t,"&.".concat(m.a.disabled),{color:"light"===a.palette.mode?a.palette.grey[100]:a.palette.grey[600]}),Object(o.a)(t,"&.".concat(m.a.checked," + .").concat(m.a.track),{opacity:.5}),Object(o.a)(t,"&.".concat(m.a.disabled," + .").concat(m.a.track),{opacity:"light"===a.palette.mode?.12:.2}),Object(o.a)(t,"& .".concat(m.a.input),{left:"-100%",width:"300%"}),t}),(function(e){var t,a=e.theme,c=e.ownerState;return Object(n.a)({"&:hover":{backgroundColor:Object(l.a)(a.palette.action.active,a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==c.color&&(t={},Object(o.a)(t,"&.".concat(m.a.checked),Object(o.a)({color:a.palette[c.color].main,"&:hover":{backgroundColor:Object(l.a)(a.palette[c.color].main,a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&.".concat(m.a.disabled),{color:"light"===a.palette.mode?Object(l.f)(a.palette[c.color].main,.62):Object(l.b)(a.palette[c.color].main,.55)})),Object(o.a)(t,"&.".concat(m.a.checked," + .").concat(m.a.track),{backgroundColor:a.palette[c.color].main}),t))})),g=Object(h.a)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:function(e,t){return t.track}})((function(e){var t=e.theme;return{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:t.transitions.create(["opacity","background-color"],{duration:t.transitions.duration.shortest}),backgroundColor:"light"===t.palette.mode?t.palette.common.black:t.palette.common.white,opacity:"light"===t.palette.mode?.38:.3}})),v=Object(h.a)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:function(e,t){return t.thumb}})((function(e){return{boxShadow:e.theme.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}})),w=r.forwardRef((function(e,t){var a=Object(b.a)({props:e,name:"MuiSwitch"}),o=a.className,r=a.color,l=void 0===r?"primary":r,u=a.edge,h=void 0!==u&&u,w=a.size,x=void 0===w?"medium":w,k=a.sx,S=Object(c.a)(a,p),y=Object(n.a)({},a,{color:l,edge:h,size:x}),M=function(e){var t=e.classes,a=e.edge,o=e.size,c=e.color,r=e.checked,i=e.disabled,l={root:["root",a&&"edge".concat(Object(d.a)(a)),"size".concat(Object(d.a)(o))],switchBase:["switchBase","color".concat(Object(d.a)(c)),r&&"checked",i&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},u=Object(s.a)(l,m.b,t);return Object(n.a)({},t,u)}(y),C=Object(f.jsx)(v,{className:M.thumb,ownerState:y});return Object(f.jsxs)(j,{className:Object(i.a)(M.root,o),sx:k,ownerState:y,children:[Object(f.jsx)(O,Object(n.a)({type:"checkbox",icon:C,checkedIcon:C,ref:t,ownerState:y},S,{classes:Object(n.a)({},M,{root:M.switchBase})})),Object(f.jsx)(g,{className:M.track,ownerState:y})]})}));t.a=w},1723:function(e,t,a){"use strict";var o=a(3),c=a(8),n=a(2),r=a(11),i=a(239),s=a(94),l=a(10),d=a(18),u=a(557),b=a(555),h=a(0),m=["className","id"],f=Object(l.a)(s.a,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,t){return t.root}})({padding:"16px 24px",flex:"0 0 auto"}),p=n.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiDialogTitle"}),s=a.className,l=a.id,p=Object(c.a)(a,m),j=a,O=function(e){var t=e.classes;return Object(i.a)({root:["root"]},u.b,t)}(j),g=n.useContext(b.a).titleId,v=void 0===g?l:g;return Object(h.jsx)(f,Object(o.a)({component:"h2",className:Object(r.a)(O.root,s),ownerState:j,ref:t,variant:"h6",id:v},p))}));t.a=p},2412:function(e,t,a){"use strict";var o=a(8),c=a(3),n=a(2),r=a(239),i=a(10),s=a(18),l=a(94),d=a(138),u=a(150);function b(e){return Object(d.a)("MuiDialogContentText",e)}Object(u.a)("MuiDialogContentText",["root"]);var h=a(0),m=["children"],f=Object(i.a)(l.a,{shouldForwardProp:function(e){return Object(i.b)(e)||"classes"===e},name:"MuiDialogContentText",slot:"Root",overridesResolver:function(e,t){return t.root}})({}),p=n.forwardRef((function(e,t){var a=Object(s.a)({props:e,name:"MuiDialogContentText"}),n=Object(o.a)(a,m),i=function(e){var t=e.classes,a=Object(r.a)({root:["root"]},b,t);return Object(c.a)({},t,a)}(n);return Object(h.jsx)(f,Object(c.a)({component:"p",variant:"body1",color:"text.secondary",ref:t,ownerState:n},a,{classes:i}))}));t.a=p}}]);
//# sourceMappingURL=42.0f0457d7.chunk.js.map