(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[52],{1615:function(e,t,r){"use strict";r.d(t,"b",(function(){return o}));var a=r(138),c=r(150);function o(e){return Object(a.a)("MuiSwitch",e)}var n=Object(c.a)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);t.a=n},1626:function(e,t,r){"use strict";var a=r(6),c=r(8),o=r(3),n=r(2),i=r(11),s=r(239),l=r(58),b=r(16),d=r(324),j=r(18),p=r(10),u=r(1615),h=r(0),O=["className","color","edge","size","sx"],x=Object(p.a)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,r.edge&&t["edge".concat(Object(b.a)(r.edge))],t["size".concat(Object(b.a)(r.size))]]}})((function(e){var t,r=e.ownerState;return Object(o.a)({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},"start"===r.edge&&{marginLeft:-8},"end"===r.edge&&{marginRight:-8},"small"===r.size&&(t={width:40,height:24,padding:7},Object(a.a)(t,"& .".concat(u.a.thumb),{width:16,height:16}),Object(a.a)(t,"& .".concat(u.a.switchBase),Object(a.a)({padding:4},"&.".concat(u.a.checked),{transform:"translateX(16px)"})),t))})),m=Object(p.a)(d.a,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:function(e,t){var r=e.ownerState;return[t.switchBase,Object(a.a)({},"& .".concat(u.a.input),t.input),"default"!==r.color&&t["color".concat(Object(b.a)(r.color))]]}})((function(e){var t,r=e.theme;return t={position:"absolute",top:0,left:0,zIndex:1,color:"light"===r.palette.mode?r.palette.common.white:r.palette.grey[300],transition:r.transitions.create(["left","transform"],{duration:r.transitions.duration.shortest})},Object(a.a)(t,"&.".concat(u.a.checked),{transform:"translateX(20px)"}),Object(a.a)(t,"&.".concat(u.a.disabled),{color:"light"===r.palette.mode?r.palette.grey[100]:r.palette.grey[600]}),Object(a.a)(t,"&.".concat(u.a.checked," + .").concat(u.a.track),{opacity:.5}),Object(a.a)(t,"&.".concat(u.a.disabled," + .").concat(u.a.track),{opacity:"light"===r.palette.mode?.12:.2}),Object(a.a)(t,"& .".concat(u.a.input),{left:"-100%",width:"300%"}),t}),(function(e){var t,r=e.theme,c=e.ownerState;return Object(o.a)({"&:hover":{backgroundColor:Object(l.a)(r.palette.action.active,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==c.color&&(t={},Object(a.a)(t,"&.".concat(u.a.checked),Object(a.a)({color:r.palette[c.color].main,"&:hover":{backgroundColor:Object(l.a)(r.palette[c.color].main,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&.".concat(u.a.disabled),{color:"light"===r.palette.mode?Object(l.f)(r.palette[c.color].main,.62):Object(l.b)(r.palette[c.color].main,.55)})),Object(a.a)(t,"&.".concat(u.a.checked," + .").concat(u.a.track),{backgroundColor:r.palette[c.color].main}),t))})),g=Object(p.a)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:function(e,t){return t.track}})((function(e){var t=e.theme;return{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:t.transitions.create(["opacity","background-color"],{duration:t.transitions.duration.shortest}),backgroundColor:"light"===t.palette.mode?t.palette.common.black:t.palette.common.white,opacity:"light"===t.palette.mode?.38:.3}})),f=Object(p.a)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:function(e,t){return t.thumb}})((function(e){return{boxShadow:e.theme.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}})),v=n.forwardRef((function(e,t){var r=Object(j.a)({props:e,name:"MuiSwitch"}),a=r.className,n=r.color,l=void 0===n?"primary":n,d=r.edge,p=void 0!==d&&d,v=r.size,y=void 0===v?"medium":v,w=r.sx,k=Object(c.a)(r,O),R=Object(o.a)({},r,{color:l,edge:p,size:y}),S=function(e){var t=e.classes,r=e.edge,a=e.size,c=e.color,n=e.checked,i=e.disabled,l={root:["root",r&&"edge".concat(Object(b.a)(r)),"size".concat(Object(b.a)(a))],switchBase:["switchBase","color".concat(Object(b.a)(c)),n&&"checked",i&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},d=Object(s.a)(l,u.b,t);return Object(o.a)({},t,d)}(R),C=Object(h.jsx)(f,{className:S.thumb,ownerState:R});return Object(h.jsxs)(x,{className:Object(i.a)(S.root,a),sx:w,ownerState:R,children:[Object(h.jsx)(m,Object(o.a)({type:"checkbox",icon:C,checkedIcon:C,ref:t,ownerState:R},k,{classes:Object(o.a)({},S,{root:S.switchBase})})),Object(h.jsx)(g,{className:S.track,ownerState:R})]})}));t.a=v},1636:function(e,t,r){"use strict";r.d(t,"b",(function(){return I})),r.d(t,"c",(function(){return B})),r.d(t,"a",(function(){return F}));var a=r(5),c=r(25),o=r(6),n=r(33),i=r(539),s=r(1568),l=r(1556),b=r(10),d=r(58),j=r(537),p=r(82),u=r(94),h=r(1581),O=r(1603),x=r(817),m=r(1548),g=r(1541),f=r(1604),v=r(812),y=r(321),w=r(95),k=r(279),R=r(68),S=r(22),C=r(48),z=r(0),D=["error","showPreview","files","onRemove","onRemoveAll","sx"],A=Object(b.a)("div")((function(e){var t=e.theme;return Object(o.a)({outline:"none",display:"flex",textAlign:"center",alignItems:"center",flexDirection:"column",justifyContent:"center",padding:t.spacing(5,1),borderRadius:t.shape.borderRadius,backgroundColor:t.palette.background.neutral,border:"1px dashed ".concat(t.palette.grey[50032]),"&:hover":{opacity:.72,cursor:"pointer"}},t.breakpoints.up("md"),{textAlign:"left",flexDirection:"row"})}));function I(e){var t=e.error,r=e.showPreview,o=void 0!==r&&r,b=e.files,I=e.onRemove,U=e.onRemoveAll,P=e.sx,B=Object(c.a)(e,D),M=b.length>0,L=Object(i.a)(Object(a.a)({},B)),N=L.getRootProps,T=L.getInputProps,F=L.isDragActive,W=L.isDragReject,J=L.fileRejections,X=function(){return Object(z.jsx)(j.a,{variant:"outlined",sx:{py:1,px:2,mt:3,borderColor:"error.light",bgcolor:function(e){return Object(d.a)(e.palette.error.main,.08)}},children:J.map((function(e){var t=e.file,r=e.errors,a=t.path,c=t.size;return Object(z.jsxs)(p.a,{sx:{my:1},children:[Object(z.jsxs)(u.a,{variant:"subtitle2",noWrap:!0,children:[a," - ",Object(w.b)(c)]}),r.map((function(e){return Object(z.jsxs)(u.a,{variant:"caption",component:"p",children:["- ",e.message]},e.code)}))]},a)}))})};return Object(z.jsxs)(p.a,{sx:Object(a.a)({width:"100%"},P),children:[Object(z.jsxs)(A,Object(a.a)(Object(a.a)({},N()),{},{sx:Object(a.a)(Object(a.a)({},F&&{opacity:.72}),(W||t)&&{color:"error.main",borderColor:"error.light",bgcolor:"error.lighter"}),children:[Object(z.jsx)("input",Object(a.a)({},T())),Object(z.jsx)(k.o,{sx:{width:220}}),Object(z.jsxs)(p.a,{sx:{p:3,ml:{md:2}},children:[Object(z.jsx)(u.a,{gutterBottom:!0,variant:"h5",children:"Drop or Select file"}),Object(z.jsxs)(u.a,{variant:"body2",sx:{color:"text.secondary"},children:["Drop files here or click\xa0",Object(z.jsx)(u.a,{variant:"body2",component:"span",sx:{color:"primary.main",textDecoration:"underline"},children:"browse"}),"\xa0thorough your machine"]})]})]})),J.length>0&&Object(z.jsx)(X,{}),Object(z.jsx)(h.a,{disablePadding:!0,sx:Object(a.a)({},M&&{my:3}),children:Object(z.jsx)(s.a,{children:b.map((function(e){var t=function(e){return"string"===typeof e?{key:e}:{key:e.name,name:e.name,size:e.size,preview:e.preview}}(e),r=t.key,c=t.name,i=t.size,s=t.preview;return o?Object(z.jsxs)(O.a,Object(a.a)(Object(a.a)({component:l.a.div},Object(C.k)().inRight),{},{sx:{p:0,m:.5,width:80,height:80,borderRadius:1.5,overflow:"hidden",position:"relative",display:"inline-flex"},children:[Object(z.jsx)(R.a,{src:Object(n.isString)(e)?e:s,ratio:"1/1"}),Object(z.jsx)(p.a,{sx:{top:6,right:6,position:"absolute"},children:Object(z.jsx)(x.a,{size:"small",onClick:function(){return I(e)},sx:{p:"2px",color:"common.white",bgcolor:function(e){return Object(d.a)(e.palette.grey[900],.72)},"&:hover":{bgcolor:function(e){return Object(d.a)(e.palette.grey[900],.48)}}},children:Object(z.jsx)(S.a,{icon:"eva:close-fill"})})})]}),r):Object(z.jsxs)(O.a,Object(a.a)(Object(a.a)({component:l.a.div},Object(C.k)().inRight),{},{sx:{my:1,py:.75,px:2,borderRadius:1,border:function(e){return"solid 1px ".concat(e.palette.divider)},bgcolor:"background.paper"},children:[Object(z.jsx)(m.a,{children:Object(z.jsx)(S.a,{icon:"eva:file-fill",width:28,height:28})}),Object(z.jsx)(g.a,{primary:Object(n.isString)(e)?e:c,secondary:Object(n.isString)(e)?"":Object(w.b)(i||0),primaryTypographyProps:{variant:"subtitle2"},secondaryTypographyProps:{variant:"caption"}}),Object(z.jsx)(f.a,{children:Object(z.jsx)(x.a,{edge:"end",size:"small",onClick:function(){return I(e)},children:Object(z.jsx)(S.a,{icon:"eva:close-fill"})})})]}),r)}))})}),M&&Object(z.jsxs)(v.a,{direction:"row",justifyContent:"flex-end",children:[Object(z.jsx)(y.a,{onClick:U,sx:{mr:1.5},children:"Remove all"}),Object(z.jsx)(y.a,{variant:"contained",children:"Upload files"})]})]})}var U=["error","file","sx"],P=Object(b.a)("div")((function(e){var t=e.theme;return Object(o.a)({outline:"none",display:"flex",overflow:"hidden",textAlign:"center",position:"relative",alignItems:"center",flexDirection:"column",justifyContent:"center",padding:t.spacing(5,0),borderRadius:t.shape.borderRadius,transition:t.transitions.create("padding"),backgroundColor:t.palette.background.neutral,border:"1px dashed ".concat(t.palette.grey[50032]),"&:hover":{opacity:.72,cursor:"pointer"}},t.breakpoints.up("md"),{textAlign:"left",flexDirection:"row"})}));function B(e){var t=e.error,r=void 0!==t&&t,o=e.file,s=e.sx,l=Object(c.a)(e,U),b=Object(i.a)(Object(a.a)({multiple:!1},l)),h=b.getRootProps,O=b.getInputProps,x=b.isDragActive,m=b.isDragReject,g=b.fileRejections,f=function(){return Object(z.jsx)(j.a,{variant:"outlined",sx:{py:1,px:2,mt:3,borderColor:"error.light",bgcolor:function(e){return Object(d.a)(e.palette.error.main,.08)}},children:g.map((function(e){var t=e.file,r=e.errors,a=t.path,c=t.size;return Object(z.jsxs)(p.a,{sx:{my:1},children:[Object(z.jsxs)(u.a,{variant:"subtitle2",noWrap:!0,children:[a," - ",Object(w.b)(c)]}),r.map((function(e){return Object(z.jsxs)(u.a,{variant:"caption",component:"p",children:["- ",e.message]},e.code)}))]},a)}))})};return Object(z.jsxs)(p.a,{sx:Object(a.a)({width:"100%"},s),children:[Object(z.jsxs)(P,Object(a.a)(Object(a.a)({},h()),{},{sx:Object(a.a)(Object(a.a)(Object(a.a)({},x&&{opacity:.72}),(m||r)&&{color:"error.main",borderColor:"error.light",bgcolor:"error.lighter"}),o&&{padding:"12% 0"}),children:[Object(z.jsx)("input",Object(a.a)({},O())),Object(z.jsx)(k.o,{sx:{width:220}}),Object(z.jsxs)(p.a,{sx:{p:3,ml:{md:2}},children:[Object(z.jsx)(u.a,{gutterBottom:!0,variant:"h5",children:"Drop or Select file"}),Object(z.jsxs)(u.a,{variant:"body2",sx:{color:"text.secondary"},children:["Drop files here or click\xa0",Object(z.jsx)(u.a,{variant:"body2",component:"span",sx:{color:"primary.main",textDecoration:"underline"},children:"browse"}),"\xa0thorough your machine"]})]}),o&&Object(z.jsx)(R.a,{alt:"file preview",src:Object(n.isString)(o)?o:o.preview,sx:{top:8,borderRadius:1,objectFit:"cover",position:"absolute",width:"calc(100% - 24px)",height:"calc(100% - 24px)"}})]})),g.length>0&&Object(z.jsx)(f,{})]})}var M=["error","file","caption","sx"],L=Object(b.a)("div")((function(e){var t=e.theme;return{width:144,height:144,margin:"auto",borderRadius:"50%",padding:t.spacing(1),border:"1px dashed ".concat(t.palette.grey[50032])}})),N=Object(b.a)("div")({zIndex:0,width:"100%",height:"100%",outline:"none",display:"flex",overflow:"hidden",borderRadius:"50%",position:"relative",alignItems:"center",justifyContent:"center","& > *":{width:"100%",height:"100%"},"&:hover":{cursor:"pointer","& .placeholder":{zIndex:9}}}),T=Object(b.a)("div")((function(e){var t=e.theme;return{display:"flex",position:"absolute",alignItems:"center",flexDirection:"column",justifyContent:"center",color:t.palette.text.secondary,backgroundColor:t.palette.background.neutral,transition:t.transitions.create("opacity",{easing:t.transitions.easing.easeInOut,duration:t.transitions.duration.shorter}),"&:hover":{opacity:.72}}}));function F(e){var t=e.error,r=e.file,o=e.caption,s=e.sx,l=Object(c.a)(e,M),b=Object(i.a)(Object(a.a)({multiple:!1},l)),h=b.getRootProps,O=b.getInputProps,x=b.isDragActive,m=b.isDragReject,g=b.fileRejections,f=function(){return Object(z.jsx)(j.a,{variant:"outlined",sx:{py:1,px:2,my:2,borderColor:"error.light",bgcolor:function(e){return Object(d.a)(e.palette.error.main,.08)}},children:g.map((function(e){var t=e.file,r=e.errors,a=t.path,c=t.size;return Object(z.jsxs)(p.a,{sx:{my:1},children:[Object(z.jsxs)(u.a,{variant:"subtitle2",noWrap:!0,children:[a," - ",Object(w.b)(c)]}),r.map((function(e){return Object(z.jsxs)(u.a,{variant:"caption",component:"p",children:["- ",e.message]},e.code)}))]},a)}))})};return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(L,{sx:s,children:Object(z.jsxs)(N,Object(a.a)(Object(a.a)({},h()),{},{sx:Object(a.a)(Object(a.a)({},x&&{opacity:.72}),(m||t)&&{color:"error.main",borderColor:"error.light",bgcolor:"error.lighter"}),children:[Object(z.jsx)("input",Object(a.a)({},O())),r&&Object(z.jsx)(R.a,{alt:"avatar",src:Object(n.isString)(r)?r:r.preview,sx:{zIndex:8}}),Object(z.jsxs)(T,{className:"placeholder",sx:Object(a.a)({},r&&{opacity:0,color:"common.white",bgcolor:"grey.900","&:hover":{opacity:.72}}),children:[Object(z.jsx)(S.a,{icon:"ic:round-add-a-photo",sx:{width:24,height:24,mb:1}}),Object(z.jsx)(u.a,{variant:"caption",children:r?"Update photo":"Upload photo"})]})]}))}),o,g.length>0&&Object(z.jsx)(f,{})]})}},2500:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return w}));var a=r(5),c=r(4),o=r(2),n=r(10),i=r(82),s=r(1451),l=r(812),b=r(1453),d=r(1575),j=r(1595),p=r(1626),u=r(1576),h=r(94),O=r(37),x=r(95),m=r(322),g=r(538),f=r(1636),v=r(0),y=Object(n.a)("div")((function(e){var t=e.theme;return{paddingTop:t.spacing(11),paddingBottom:t.spacing(15)}}));function w(){var e=Object(o.useState)(!1),t=Object(c.a)(e,2),r=t[0],n=t[1],w=Object(o.useState)([]),k=Object(c.a)(w,2),R=k[0],S=k[1],C=Object(o.useState)(null),z=Object(c.a)(C,2),D=z[0],A=z[1],I=Object(o.useState)(null),U=Object(c.a)(I,2),P=U[0],B=U[1],M=Object(o.useCallback)((function(e){var t=e[0];t&&A(Object(a.a)(Object(a.a)({},t),{},{preview:URL.createObjectURL(t)}))}),[]),L=Object(o.useCallback)((function(e){var t=e[0];t&&B(Object(a.a)(Object(a.a)({},t),{},{preview:URL.createObjectURL(t)}))}),[]),N=Object(o.useCallback)((function(e){S(e.map((function(e){return Object.assign(e,{preview:URL.createObjectURL(e)})})))}),[S]);return Object(v.jsx)(m.a,{title:"Components: Upload",children:Object(v.jsxs)(y,{children:[Object(v.jsx)(i.a,{sx:{pt:6,pb:1,mb:10,bgcolor:function(e){return"light"===e.palette.mode?"grey.200":"grey.800"}},children:Object(v.jsx)(s.a,{children:Object(v.jsx)(g.a,{heading:"Upload",links:[{name:"Components",href:O.d.components},{name:"Upload"}],moreLink:"https://react-dropzone.js.org/#section-basic-example"})})}),Object(v.jsx)(s.a,{children:Object(v.jsxs)(l.a,{spacing:5,children:[Object(v.jsxs)(b.a,{children:[Object(v.jsx)(d.a,{title:"Upload Multi File",action:Object(v.jsx)(j.a,{control:Object(v.jsx)(p.a,{checked:r,onChange:function(e){return n(e.target.checked)}}),label:"Show Preview"})}),Object(v.jsx)(u.a,{children:Object(v.jsx)(f.b,{showPreview:r,files:R,onDrop:N,onRemove:function(e){var t=R.filter((function(t){return t!==e}));S(t)},onRemoveAll:function(){S([])}})})]}),Object(v.jsxs)(b.a,{children:[Object(v.jsx)(d.a,{title:"Upload Single File"}),Object(v.jsx)(u.a,{children:Object(v.jsx)(f.c,{file:D,onDrop:M})})]}),Object(v.jsxs)(b.a,{children:[Object(v.jsx)(d.a,{title:"Upload Avatar"}),Object(v.jsx)(u.a,{children:Object(v.jsx)(f.a,{accept:"image/*",file:P,onDrop:L,caption:Object(v.jsxs)(h.a,{variant:"caption",sx:{mt:2,mx:"auto",display:"block",textAlign:"center",color:"text.secondary"},children:["Allowed *.jpeg, *.jpg, *.png, *.gif",Object(v.jsx)("br",{})," max size of ",Object(x.b)(3145728)]})})})]})]})})]})})}}}]);
//# sourceMappingURL=52.50477f8c.chunk.js.map