(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[32],{1629:function(e,t,a){"use strict";a(2);var n=a(45),c=a(0);t.a=Object(n.a)(Object(c.jsx)("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),"FirstPage")},1630:function(e,t,a){"use strict";a(2);var n=a(45),c=a(0);t.a=Object(n.a)(Object(c.jsx)("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),"LastPage")},1634:function(e,t,a){"use strict";a.d(t,"b",(function(){return o}));var n=a(138),c=a(150);function o(e){return Object(n.a)("MuiTablePagination",e)}var r=Object(c.a)("MuiTablePagination",["root","toolbar","spacer","selectLabel","selectRoot","select","selectIcon","input","menuItem","displayedRows","actions"]);t.a=r},1718:function(e,t,a){"use strict";var n,c,o,r,i,s,l,b,d,u=a(6),j=a(8),h=a(3),O=a(2),p=a(11),g=a(239),m=a(300),f=a(10),x=a(18),v=a(89),w=a(1592),P=a(1564),S=a(1588),y=a(1598),R=a(551),I=a(552),C=a(53),L=a(817),k=a(1630),M=a(1629),B=a(0),N=["backIconButtonProps","count","getItemAriaLabel","nextIconButtonProps","onPageChange","page","rowsPerPage","showFirstButton","showLastButton"],T=O.forwardRef((function(e,t){var a=e.backIconButtonProps,d=e.count,u=e.getItemAriaLabel,O=e.nextIconButtonProps,p=e.onPageChange,g=e.page,m=e.rowsPerPage,f=e.showFirstButton,x=e.showLastButton,v=Object(j.a)(e,N),w=Object(C.a)();return Object(B.jsxs)("div",Object(h.a)({ref:t},v,{children:[f&&Object(B.jsx)(L.a,{onClick:function(e){p(e,0)},disabled:0===g,"aria-label":u("first",g),title:u("first",g),children:"rtl"===w.direction?n||(n=Object(B.jsx)(k.a,{})):c||(c=Object(B.jsx)(M.a,{}))}),Object(B.jsx)(L.a,Object(h.a)({onClick:function(e){p(e,g-1)},disabled:0===g,color:"inherit","aria-label":u("previous",g),title:u("previous",g)},a,{children:"rtl"===w.direction?o||(o=Object(B.jsx)(I.a,{})):r||(r=Object(B.jsx)(R.a,{}))})),Object(B.jsx)(L.a,Object(h.a)({onClick:function(e){p(e,g+1)},disabled:-1!==d&&g>=Math.ceil(d/m)-1,color:"inherit","aria-label":u("next",g),title:u("next",g)},O,{children:"rtl"===w.direction?i||(i=Object(B.jsx)(R.a,{})):s||(s=Object(B.jsx)(I.a,{}))})),x&&Object(B.jsx)(L.a,{onClick:function(e){p(e,Math.max(0,Math.ceil(d/m)-1))},disabled:g>=Math.ceil(d/m)-1,"aria-label":u("last",g),title:u("last",g),children:"rtl"===w.direction?l||(l=Object(B.jsx)(M.a,{})):b||(b=Object(B.jsx)(k.a,{}))})]}))})),D=a(243),A=a(1634),z=["ActionsComponent","backIconButtonProps","className","colSpan","component","count","getItemAriaLabel","labelDisplayedRows","labelRowsPerPage","nextIconButtonProps","onPageChange","onRowsPerPageChange","page","rowsPerPage","rowsPerPageOptions","SelectProps","showFirstButton","showLastButton"],F=Object(f.a)(S.a,{name:"MuiTablePagination",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(e){var t=e.theme;return{overflow:"auto",color:(t.vars||t).palette.text.primary,fontSize:t.typography.pxToRem(14),"&:last-child":{padding:0}}})),E=Object(f.a)(y.a,{name:"MuiTablePagination",slot:"Toolbar",overridesResolver:function(e,t){return Object(h.a)(Object(u.a)({},"& .".concat(A.a.actions),t.actions),t.toolbar)}})((function(e){var t,a=e.theme;return t={minHeight:52,paddingRight:2},Object(u.a)(t,"".concat(a.breakpoints.up("xs")," and (orientation: landscape)"),{minHeight:52}),Object(u.a)(t,a.breakpoints.up("sm"),{minHeight:52,paddingRight:2}),Object(u.a)(t,"& .".concat(A.a.actions),{flexShrink:0,marginLeft:20}),t})),W=Object(f.a)("div",{name:"MuiTablePagination",slot:"Spacer",overridesResolver:function(e,t){return t.spacer}})({flex:"1 1 100%"}),H=Object(f.a)("p",{name:"MuiTablePagination",slot:"SelectLabel",overridesResolver:function(e,t){return t.selectLabel}})((function(e){var t=e.theme;return Object(h.a)({},t.typography.body2,{flexShrink:0})})),_=Object(f.a)(P.a,{name:"MuiTablePagination",slot:"Select",overridesResolver:function(e,t){var a;return Object(h.a)((a={},Object(u.a)(a,"& .".concat(A.a.selectIcon),t.selectIcon),Object(u.a)(a,"& .".concat(A.a.select),t.select),a),t.input,t.selectRoot)}})(Object(u.a)({color:"inherit",fontSize:"inherit",flexShrink:0,marginRight:32,marginLeft:8},"& .".concat(A.a.select),{paddingLeft:8,paddingRight:24,textAlign:"right",textAlignLast:"right"})),q=Object(f.a)(w.a,{name:"MuiTablePagination",slot:"MenuItem",overridesResolver:function(e,t){return t.menuItem}})({}),J=Object(f.a)("p",{name:"MuiTablePagination",slot:"DisplayedRows",overridesResolver:function(e,t){return t.displayedRows}})((function(e){var t=e.theme;return Object(h.a)({},t.typography.body2,{flexShrink:0})}));function G(e){var t=e.from,a=e.to,n=e.count;return"".concat(t,"\u2013").concat(a," of ").concat(-1!==n?n:"more than ".concat(a))}function Q(e){return"Go to ".concat(e," page")}var V=O.forwardRef((function(e,t){var a,n=Object(x.a)({props:e,name:"MuiTablePagination"}),c=n.ActionsComponent,o=void 0===c?T:c,r=n.backIconButtonProps,i=n.className,s=n.colSpan,l=n.component,b=void 0===l?S.a:l,u=n.count,f=n.getItemAriaLabel,w=void 0===f?Q:f,P=n.labelDisplayedRows,y=void 0===P?G:P,R=n.labelRowsPerPage,I=void 0===R?"Rows per page:":R,C=n.nextIconButtonProps,L=n.onPageChange,k=n.onRowsPerPageChange,M=n.page,N=n.rowsPerPage,V=n.rowsPerPageOptions,K=void 0===V?[10,25,50,100]:V,U=n.SelectProps,X=void 0===U?{}:U,Y=n.showFirstButton,Z=void 0!==Y&&Y,$=n.showLastButton,ee=void 0!==$&&$,te=Object(j.a)(n,z),ae=n,ne=function(e){var t=e.classes;return Object(g.a)({root:["root"],toolbar:["toolbar"],spacer:["spacer"],selectLabel:["selectLabel"],select:["select"],input:["input"],selectIcon:["selectIcon"],menuItem:["menuItem"],displayedRows:["displayedRows"],actions:["actions"]},A.b,t)}(ae),ce=X.native?"option":q;b!==S.a&&"td"!==b||(a=s||1e3);var oe=Object(D.a)(X.id),re=Object(D.a)(X.labelId);return Object(B.jsx)(F,Object(h.a)({colSpan:a,ref:t,as:b,ownerState:ae,className:Object(p.a)(ne.root,i)},te,{children:Object(B.jsxs)(E,{className:ne.toolbar,children:[Object(B.jsx)(W,{className:ne.spacer}),K.length>1&&Object(B.jsx)(H,{className:ne.selectLabel,id:re,children:I}),K.length>1&&Object(B.jsx)(_,Object(h.a)({variant:"standard",input:d||(d=Object(B.jsx)(v.c,{})),value:N,onChange:k,id:oe,labelId:re},X,{classes:Object(h.a)({},X.classes,{root:Object(p.a)(ne.input,ne.selectRoot,(X.classes||{}).root),select:Object(p.a)(ne.select,(X.classes||{}).select),icon:Object(p.a)(ne.selectIcon,(X.classes||{}).icon)}),children:K.map((function(e){return Object(O.createElement)(ce,Object(h.a)({},!Object(m.a)(ce)&&{ownerState:ae},{className:ne.menuItem,key:e.label?e.label:e,value:e.value?e.value:e}),e.label?e.label:e)}))})),Object(B.jsx)(J,{className:ne.displayedRows,children:y({from:0===u?0:M*N+1,to:-1===u?(M+1)*N:-1===N?u:Math.min(u,(M+1)*N),count:-1===u?-1:u,page:M})}),Object(B.jsx)(o,{className:ne.actions,backIconButtonProps:r,count:u,nextIconButtonProps:C,onPageChange:L,page:M,rowsPerPage:N,showFirstButton:Z,showLastButton:ee,getItemAriaLabel:w})]})}))}));t.a=V},1973:function(e,t,a){"use strict";var n=a(6),c=a(8),o=a(3),r=a(239),i=a(11),s=a(2),l=a(816),b=a(45),d=a(0),u=Object(b.a)(Object(d.jsx)("path",{d:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"}),"ArrowDownward"),j=a(10),h=a(18),O=a(16),p=a(138),g=a(150);function m(e){return Object(p.a)("MuiTableSortLabel",e)}var f=Object(g.a)("MuiTableSortLabel",["root","active","icon","iconDirectionDesc","iconDirectionAsc"]),x=["active","children","className","direction","hideSortIcon","IconComponent"],v=Object(j.a)(l.a,{name:"MuiTableSortLabel",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.active&&t.active]}})((function(e){var t=e.theme;return Object(n.a)({cursor:"pointer",display:"inline-flex",justifyContent:"flex-start",flexDirection:"inherit",alignItems:"center","&:focus":{color:(t.vars||t).palette.text.secondary},"&:hover":Object(n.a)({color:(t.vars||t).palette.text.secondary},"& .".concat(f.icon),{opacity:.5})},"&.".concat(f.active),Object(n.a)({color:(t.vars||t).palette.text.primary},"& .".concat(f.icon),{opacity:1,color:(t.vars||t).palette.text.secondary}))})),w=Object(j.a)("span",{name:"MuiTableSortLabel",slot:"Icon",overridesResolver:function(e,t){var a=e.ownerState;return[t.icon,t["iconDirection".concat(Object(O.a)(a.direction))]]}})((function(e){var t=e.theme,a=e.ownerState;return Object(o.a)({fontSize:18,marginRight:4,marginLeft:4,opacity:0,transition:t.transitions.create(["opacity","transform"],{duration:t.transitions.duration.shorter}),userSelect:"none"},"desc"===a.direction&&{transform:"rotate(0deg)"},"asc"===a.direction&&{transform:"rotate(180deg)"})})),P=s.forwardRef((function(e,t){var a=Object(h.a)({props:e,name:"MuiTableSortLabel"}),n=a.active,s=void 0!==n&&n,l=a.children,b=a.className,j=a.direction,p=void 0===j?"asc":j,g=a.hideSortIcon,f=void 0!==g&&g,P=a.IconComponent,S=void 0===P?u:P,y=Object(c.a)(a,x),R=Object(o.a)({},a,{active:s,direction:p,hideSortIcon:f,IconComponent:S}),I=function(e){var t=e.classes,a=e.direction,n={root:["root",e.active&&"active"],icon:["icon","iconDirection".concat(Object(O.a)(a))]};return Object(r.a)(n,m,t)}(R);return Object(d.jsxs)(v,Object(o.a)({className:Object(i.a)(I.root,b),component:"span",disableRipple:!0,ownerState:R,ref:t},y,{children:[l,f&&!s?null:Object(d.jsx)(w,{as:S,className:Object(i.a)(I.icon),ownerState:R})]}))}));t.a=P},2551:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return $}));var n=a(4),c=a(33),o=a(1551),r=a(2),i=a(53),s=a(1451),l=a(1453),b=a(1584),d=a(1585),u=a(1589),j=a(1587),h=a(1588),O=a(1565),p=a(94),g=a(82),m=a(1718),f=a(26),x=a(176),v=a(162),w=a(95),P=a(37),S=a(96),y=a(323),R=a(241),I=a(68),C=a(83),L=a(550),k=a(539),M=a(5),B=a(1586),N=a(1973),T=a(0),D={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:-1,overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"};function A(e){var t=e.order,a=e.orderBy,n=e.rowCount,c=e.headLabel,o=e.numSelected,r=e.onRequestSort,i=e.onSelectAllClick;return Object(T.jsx)(B.a,{children:Object(T.jsxs)(j.a,{children:[Object(T.jsx)(h.a,{padding:"checkbox",children:Object(T.jsx)(O.a,{indeterminate:o>0&&o<n,checked:n>0&&o===n,onChange:i})}),c.map((function(e){return Object(T.jsx)(h.a,{align:e.alignRight?"right":"left",sortDirection:a===e.id&&t,children:Object(T.jsxs)(N.a,{hideSortIcon:!0,active:a===e.id,direction:a===e.id?t:"asc",onClick:(n=e.id,function(e){r(e,n)}),children:[e.label,a===e.id?Object(T.jsx)(g.a,{sx:Object(M.a)({},D),children:"desc"===t?"sorted descending":"sorted ascending"}):null]})},e.id);var n}))]})})}var z=a(10),F=a(1598),E=a(1579),W=a(1456),H=a(819),_=a(817),q=a(22),J=Object(z.a)(F.a)((function(e){return{height:96,display:"flex",justifyContent:"space-between",padding:e.theme.spacing(0,1,0,3)}})),G=Object(z.a)(E.a)((function(e){var t=e.theme;return{width:240,transition:t.transitions.create(["box-shadow","width"],{easing:t.transitions.easing.easeInOut,duration:t.transitions.duration.shorter}),"&.Mui-focused":{width:320,boxShadow:t.customShadows.z8},"& fieldset":{borderWidth:"1px !important",borderColor:"".concat(t.palette.grey[50032]," !important")}}}));function Q(e){var t=e.numSelected,a=e.filterName,n=e.onFilterName,c=e.onDeleteProducts,o="light"===Object(i.a)().palette.mode;return Object(T.jsxs)(J,{sx:Object(M.a)({},t>0&&{color:o?"primary.main":"text.primary",bgcolor:o?"primary.lighter":"primary.dark"}),children:[t>0?Object(T.jsxs)(p.a,{component:"div",variant:"subtitle1",children:[t," selected"]}):Object(T.jsx)(G,{value:a,onChange:function(e){return n(e.target.value)},placeholder:"Search product...",startAdornment:Object(T.jsx)(W.a,{position:"start",children:Object(T.jsx)(q.a,{icon:"eva:search-fill",sx:{color:"text.disabled"}})})}),t>0?Object(T.jsx)(H.a,{title:"Delete",children:Object(T.jsx)(_.a,{onClick:c,children:Object(T.jsx)(q.a,{icon:"eva:trash-2-outline"})})}):Object(T.jsx)(H.a,{title:"Filter list",children:Object(T.jsx)(_.a,{children:Object(T.jsx)(q.a,{icon:"ic:round-filter-list"})})})]})}var V=a(1608),K=a(29),U=a(806),X=a(1592);function Y(e){var t=e.onDelete,a=e.productName,c=Object(r.useRef)(null),o=Object(r.useState)(!1),i=Object(n.a)(o,2),s=i[0],l=i[1];return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(_.a,{ref:c,onClick:function(){return l(!0)},children:Object(T.jsx)(q.a,{icon:"eva:more-vertical-fill",width:20,height:20})}),Object(T.jsxs)(U.a,{open:s,anchorEl:c.current,onClose:function(){return l(!1)},anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{px:1,width:200,color:"text.secondary"}},children:[Object(T.jsxs)(X.a,{onClick:t,sx:{borderRadius:1,typography:"body2"},children:[Object(T.jsx)(q.a,{icon:"eva:trash-2-outline",sx:{mr:2,width:24,height:24}}),"Delete"]}),Object(T.jsxs)(X.a,{component:K.b,to:"".concat(P.b.eCommerce.root,"/product/").concat(Object(V.a)(a),"/edit"),sx:{borderRadius:1,typography:"body2"},children:[Object(T.jsx)(q.a,{icon:"eva:edit-fill",sx:{mr:2,width:24,height:24}}),"Edit"]})]})]})}var Z=[{id:"name",label:"Product",alignRight:!1},{id:"createdAt",label:"Create at",alignRight:!1},{id:"inventoryType",label:"Status",alignRight:!1},{id:"price",label:"Price",alignRight:!0},{id:""}];function $(){var e=Object(S.a)().themeStretch,t=Object(i.a)(),a=Object(f.d)(),M=Object(f.e)((function(e){return e.product})).products,B=Object(r.useState)([]),N=Object(n.a)(B,2),D=N[0],z=N[1],F=Object(r.useState)(0),E=Object(n.a)(F,2),W=E[0],H=E[1],_=Object(r.useState)("asc"),q=Object(n.a)(_,2),J=q[0],G=q[1],V=Object(r.useState)([]),K=Object(n.a)(V,2),U=K[0],X=K[1],$=Object(r.useState)(""),te=Object(n.a)($,2),ae=te[0],ne=te[1],ce=Object(r.useState)(5),oe=Object(n.a)(ce,2),re=oe[0],ie=oe[1],se=Object(r.useState)("createdAt"),le=Object(n.a)(se,2),be=le[0],de=le[1];Object(r.useEffect)((function(){a(Object(x.k)())}),[a]),Object(r.useEffect)((function(){M.length&&z(M)}),[M]);var ue=W>0?Math.max(0,(1+W)*re-D.length):0,je=function(e,t,a){var n=e.map((function(e,t){return[e,t]}));if(n.sort((function(e,a){var n=t(e[0],a[0]);return 0!==n?n:e[1]-a[1]})),a)return Object(c.filter)(e,(function(e){return-1!==e.name.toLowerCase().indexOf(a.toLowerCase())}));return n.map((function(e){return e[0]}))}(D,function(e,t){return"desc"===e?function(e,a){return ee(e,a,t)}:function(e,a){return-ee(e,a,t)}}(J,be),ae),he=!je.length&&Boolean(ae);return Object(T.jsx)(y.a,{title:"Ecommerce: Product List",children:Object(T.jsxs)(s.a,{maxWidth:!e&&"lg",children:[Object(T.jsx)(k.a,{heading:"Product List",links:[{name:"Dashboard",href:P.b.root},{name:"E-Commerce",href:P.b.eCommerce.root},{name:"Product List"}]}),Object(T.jsxs)(l.a,{children:[Object(T.jsx)(Q,{numSelected:U.length,filterName:ae,onFilterName:function(e){ne(e)},onDeleteProducts:function(){return function(e){var t=D.filter((function(t){return!e.includes(t.name)}));X([]),z(t)}(U)}}),Object(T.jsx)(C.a,{children:Object(T.jsx)(b.a,{sx:{minWidth:800},children:Object(T.jsxs)(d.a,{children:[Object(T.jsx)(A,{order:J,orderBy:be,headLabel:Z,rowCount:D.length,numSelected:U.length,onRequestSort:function(e){G(be===e&&"asc"===J?"desc":"asc"),de(e)},onSelectAllClick:function(e){if(e){var t=D.map((function(e){return e.name}));X(t)}else X([])}}),Object(T.jsxs)(u.a,{children:[je.slice(W*re,W*re+re).map((function(e){var a=e.id,n=e.name,c=e.cover,r=e.price,i=e.createdAt,s=e.inventoryType,l=-1!==U.indexOf(n);return Object(T.jsxs)(j.a,{hover:!0,tabIndex:-1,role:"checkbox",selected:l,"aria-checked":l,children:[Object(T.jsx)(h.a,{padding:"checkbox",children:Object(T.jsx)(O.a,{checked:l,onClick:function(){return function(e){var t=U.indexOf(e),a=[];-1===t?a=a.concat(U,e):0===t?a=a.concat(U.slice(1)):t===U.length-1?a=a.concat(U.slice(0,-1)):t>0&&(a=a.concat(U.slice(0,t),U.slice(t+1))),X(a)}(n)}})}),Object(T.jsxs)(h.a,{sx:{display:"flex",alignItems:"center"},children:[Object(T.jsx)(I.a,{disabledEffect:!0,alt:n,src:c,sx:{borderRadius:1.5,width:64,height:64,mr:2}}),Object(T.jsx)(p.a,{variant:"subtitle2",noWrap:!0,children:n})]}),Object(T.jsx)(h.a,{style:{minWidth:160},children:Object(v.a)(i)}),Object(T.jsx)(h.a,{style:{minWidth:160},children:Object(T.jsx)(R.a,{variant:"light"===t.palette.mode?"ghost":"filled",color:("out_of_stock"===s?"error":"low_stock"===s&&"warning")||"success",children:s?Object(o.a)(s):""})}),Object(T.jsx)(h.a,{align:"right",children:Object(w.a)(r)}),Object(T.jsx)(h.a,{align:"right",children:Object(T.jsx)(Y,{productName:n,onDelete:function(){return function(e){var t=D.filter((function(t){return t.id!==e}));X([]),z(t)}(a)}})})]},a)})),ue>0&&Object(T.jsx)(j.a,{style:{height:53*ue},children:Object(T.jsx)(h.a,{colSpan:6})})]}),he&&Object(T.jsx)(u.a,{children:Object(T.jsx)(j.a,{children:Object(T.jsx)(h.a,{align:"center",colSpan:6,children:Object(T.jsx)(g.a,{sx:{py:3},children:Object(T.jsx)(L.a,{searchQuery:ae})})})})})]})})}),Object(T.jsx)(m.a,{rowsPerPageOptions:[5,10,25],component:"div",count:D.length,rowsPerPage:re,page:W,onPageChange:function(e,t){return H(t)},onRowsPerPageChange:function(e){ie(parseInt(e.target.value,10)),H(0)}})]})]})})}function ee(e,t,a){return t[a]<e[a]?-1:t[a]>e[a]?1:0}}}]);
//# sourceMappingURL=32.12d09d09.chunk.js.map