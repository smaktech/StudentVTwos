(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[73],{1612:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var a=n(5),i=n(58),c=n(537),r=n(1575),o=n(82),s=n(94),l=n(0);function u(e){var t=e.title,n=e.sx,s=e.children;return Object(l.jsxs)(c.a,{variant:"outlined",sx:{borderRadius:1.5,bgcolor:function(e){return Object(i.a)(e.palette.grey[500],.04)}},children:[t&&Object(l.jsx)(r.a,{title:t}),Object(l.jsx)(o.a,{sx:Object(a.a)({p:5,minHeight:180},n),children:s})]})}function d(e){var t=e.title;return Object(l.jsx)(s.a,{variant:"overline",component:"p",gutterBottom:!0,sx:{color:"text.secondary"},children:t})}},1621:function(e,t,n){"use strict";var a=n(15),i=n(4),c=n(8),r=n(3),o=n(815),s=n(10),l=n(18),u=n(67),d=n(93),b=n(275),j=n(428),m=n(11),f=n(2),x=n(430),O=n(320);function h(e){return Object(x.a)("MuiMasonry",e)}Object(O.a)("MuiMasonry",["root"]);var p=n(0),g=["children","className","component","columns","spacing","defaultColumns","defaultHeight","defaultSpacing"],v=function(e){return Number(e.replace("px",""))},y=Object(s.a)("div",{name:"MuiMasonry",slot:"Root",overridesResolver:function(e,t){return[t.root]}})((function(e){var t=e.ownerState,n=e.theme,a={width:"100%",display:"flex",flexFlow:"column wrap",alignContent:"space-between",boxSizing:"border-box","& > *":{boxSizing:"border-box"}},i={};if(t.isSSR){for(var c={},o=Number(n.spacing(t.defaultSpacing).replace("px","")),s=1;s<=t.defaultColumns;s+=1)c["&:nth-of-type(".concat(t.defaultColumns,"n+").concat(s%t.defaultColumns,")")]={order:s};return i.height=t.defaultHeight,i.margin=-o/2,i["& > *"]=Object(r.a)({},a["& > *"],c,{margin:o/2,width:"calc(".concat((100/t.defaultColumns).toFixed(2),"% - ").concat(o,"px)")}),Object(r.a)({},a,i)}var l=Object(u.d)({values:t.spacing,breakpoints:n.breakpoints.values}),j=Object(d.a)(n);a=Object(b.a)(a,Object(u.b)({theme:n},l,(function(e){var n=Number(e),a=Number(Object(d.d)(j,n).replace("px",""));return Object(r.a)({margin:-a/2,"& > *":{margin:a/2}},t.maxColumnHeight&&{height:Math.ceil(t.maxColumnHeight+a)})})));var m=Object(u.d)({values:t.columns,breakpoints:n.breakpoints.values});return a=Object(b.a)(a,Object(u.b)({theme:n},m,(function(e){var t=Number(e),n="".concat((100/t).toFixed(2),"%"),a="object"!==typeof l?Object(d.d)(j,Number(l)):"0px";return{"& > *":{width:"calc(".concat(n," - ").concat(a,")")}}}))),"object"===typeof l&&(a=Object(b.a)(a,Object(u.b)({theme:n},l,(function(e,t){if(t){var n=Number(e),a=Object.keys(m).pop(),i=Object(d.d)(j,n),c="object"===typeof m?m[t]||m[a]:m,r="".concat((100/c).toFixed(2),"%");return{"& > *":{width:"calc(".concat(r," - ").concat(i,")")}}}return null})))),a})),C=f.forwardRef((function(e,t){var n=Object(l.a)({props:e,name:"MuiMasonry"}),s=n.children,u=n.className,d=n.component,b=void 0===d?"div":d,x=n.columns,O=void 0===x?4:x,C=n.spacing,w=void 0===C?1:C,S=n.defaultColumns,k=n.defaultHeight,N=n.defaultSpacing,R=Object(c.a)(n,g),M=f.useRef(),z=f.useState(),H=Object(i.a)(z,2),V=H[0],E=H[1],T=!V&&k&&void 0!==S&&void 0!==N,L=f.useState(T?S-1:0),B=Object(i.a)(L,2),D=B[0],F=B[1],I=Object(r.a)({},n,{spacing:w,columns:O,maxColumnHeight:V,defaultColumns:S,defaultHeight:k,defaultSpacing:N,isSSR:T}),A=function(e){var t=e.classes;return Object(o.a)({root:["root"]},h,t)}(I),G=f.useRef("undefined"===typeof ResizeObserver?void 0:new ResizeObserver((function(e){if(e){var t,n,i,c,r,o,s,l,u,d;if(e[0].target.className.includes(A.root))t=e[0].target,i=e[0].contentRect.width,c=(null==(o=n=(null==(r=e[1])?void 0:r.target)||t.firstChild)||null==(s=o.contentRect)?void 0:s.width)||(null==(l=n)?void 0:l.clientWidth)||0;else n=e[0].target,c=e[0].contentRect.width,i=(null==(d=(t=(null==(u=e[1])?void 0:u.target)||n.parentElement).contentRect)?void 0:d.width)||t.clientWidth;if(0!==i&&0!==c&&t&&n){var b=window.getComputedStyle(n),j=v(b.marginLeft),m=v(b.marginRight),f=Math.round(i/(c+j+m)),x=new Array(f).fill(0),O=!1;if(t.childNodes.forEach((function(e){if(e.nodeType===Node.ELEMENT_NODE&&"line-break"!==e.dataset.class&&!O){var t=window.getComputedStyle(e),n=v(t.marginTop),i=v(t.marginBottom),c=v(t.height)?Math.ceil(v(t.height))+n+i:0;if(0!==c){for(var r=0;r<e.childNodes.length;r+=1){var o=e.childNodes[r];if("IMG"===o.tagName&&0===o.clientHeight){O=!0;break}}if(!O){var s=x.indexOf(Math.min.apply(Math,Object(a.a)(x)));x[s]+=c;var l=s+1;e.style.order=l}}else O=!0}})),!O)E(Math.max.apply(Math,Object(a.a)(x))),F(f>0?f-1:0)}}})));f.useEffect((function(){var e=G.current;if(void 0!==e){var t=M.current;return t&&e&&(e.observe(t),t.firstChild&&e.observe(t.firstChild)),function(){return e?e.disconnect():{}}}}),[O,w,s]);var P=Object(j.a)(t,M),W={flexBasis:"100%",width:0,margin:0,padding:0},J=new Array(D).fill("").map((function(e,t){return Object(p.jsx)("span",{"data-class":"line-break",style:Object(r.a)({},W,{order:t+1})},t)}));return Object(p.jsxs)(y,Object(r.a)({as:b,className:Object(m.a)(A.root,u),ref:P,ownerState:I},R,{children:[s,J]}))}));t.a=C},2490:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return w}));var a=n(4),i=n(5),c=n(25),r=n(2),o=n(10),s=n(82),l=n(1451),u=n(1567),d=n(1621),b=n(37),j=n(322),m=n(22),f=n(538),x=n(1612),O=n(0),h=["value"],p={.5:"Useless",1:"Useless+",1.5:"Poor",2:"Poor+",2.5:"Ok",3:"Ok+",3.5:"Good",4:"Good+",4.5:"Excellent",5:"Excellent+"},g={1:{icon:Object(O.jsx)(m.a,{icon:"ic:round-sentiment-very-dissatisfied"}),label:"Very Dissatisfied"},2:{icon:Object(O.jsx)(m.a,{icon:"ic:round-sentiment-dissatisfied"}),label:"Dissatisfied"},3:{icon:Object(O.jsx)(m.a,{icon:"ic:round-sentiment-neutral"}),label:"Neutral"},4:{icon:Object(O.jsx)(m.a,{icon:"ic:round-sentiment-satisfied"}),label:"Satisfied"},5:{icon:Object(O.jsx)(m.a,{icon:"ic:round-sentiment-very-satisfied"}),label:"Very Satisfied"}},v={display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap","& > *":{mx:"8px !important"}},y=Object(o.a)("div")((function(e){var t=e.theme;return{paddingTop:t.spacing(11),paddingBottom:t.spacing(15)}}));function C(e){var t=e.value,n=Object(c.a)(e,h);return Object(O.jsx)("span",Object(i.a)(Object(i.a)({},n),{},{children:g[t].icon}))}function w(){var e=Object(r.useState)(null),t=Object(a.a)(e,2),n=t[0],i=t[1],c=Object(r.useState)(-1),o=Object(a.a)(c,2),h=o[0],w=o[1];return Object(O.jsx)(j.a,{title:"Components: Rating",children:Object(O.jsxs)(y,{children:[Object(O.jsx)(s.a,{sx:{pt:6,pb:1,mb:10,bgcolor:function(e){return"light"===e.palette.mode?"grey.200":"grey.800"}},children:Object(O.jsx)(l.a,{children:Object(O.jsx)(f.a,{heading:"Rating",links:[{name:"Components",href:b.d.components},{name:"Rating"}],moreLink:"https://mui.com/components/rating"})})}),Object(O.jsx)(l.a,{children:Object(O.jsxs)(d.a,{columns:{xs:1,sm:2,md:3},spacing:3,children:[Object(O.jsx)(x.a,{title:"Controlled",sx:v,children:Object(O.jsx)(u.a,{name:"simple-controlled",value:n,onChange:function(e,t){i(t)}})}),Object(O.jsx)(x.a,{title:"Read only",sx:v,children:Object(O.jsx)(u.a,{name:"read-only",value:n,readOnly:!0})}),Object(O.jsx)(x.a,{title:"Disabled",sx:v,children:Object(O.jsx)(u.a,{name:"disabled",value:n,disabled:!0})}),Object(O.jsx)(x.a,{title:"Pristine",sx:v,children:Object(O.jsx)(u.a,{name:"pristine",value:null})}),Object(O.jsx)(x.a,{title:"Custom empty icon",sx:v,children:Object(O.jsx)(u.a,{name:"customized-empty",defaultValue:2,precision:.5})}),Object(O.jsx)(x.a,{title:"Custom icon and color",sx:v,children:Object(O.jsx)(u.a,{name:"customized-color",defaultValue:2,getLabelText:function(e){return"".concat(e," Heart").concat(1!==e?"s":"")},precision:.5,icon:Object(O.jsx)(m.a,{icon:"eva:heart-fill"}),emptyIcon:Object(O.jsx)(m.a,{icon:"eva:heart-fill"}),sx:{color:"info.main","&:hover":{color:"info.dark"}}})}),Object(O.jsx)(x.a,{title:"10 stars",sx:v,children:Object(O.jsx)(u.a,{name:"customized-10",defaultValue:2,max:10})}),Object(O.jsx)(x.a,{title:"Custom icon set",sx:v,children:Object(O.jsx)(u.a,{name:"customized-icons",defaultValue:2,getLabelText:function(e){return g[e].label},IconContainerComponent:C})}),Object(O.jsxs)(x.a,{title:"Hover feedback",sx:v,children:[Object(O.jsx)(u.a,{name:"hover-feedback",value:n,precision:.5,onChange:function(e,t){i(t)},onChangeActive:function(e,t){w(t)}}),null!==n&&Object(O.jsx)(s.a,{sx:{ml:2},children:p[-1!==h?h:n]})]}),Object(O.jsxs)(x.a,{title:"Half ratings",sx:v,children:[Object(O.jsx)(u.a,{name:"half-rating",defaultValue:2.5,precision:.5}),Object(O.jsx)("br",{}),Object(O.jsx)(u.a,{name:"half-rating-read",defaultValue:2.5,precision:.5,readOnly:!0})]}),Object(O.jsxs)(x.a,{title:"Sizes",sx:v,children:[Object(O.jsx)(u.a,{name:"size-small",defaultValue:2,size:"small"}),Object(O.jsx)("br",{}),Object(O.jsx)(u.a,{name:"size-medium",defaultValue:2}),Object(O.jsx)("br",{}),Object(O.jsx)(u.a,{name:"size-large",defaultValue:2,size:"large"})]})]})})]})})}}}]);
//# sourceMappingURL=73.493af7b5.chunk.js.map