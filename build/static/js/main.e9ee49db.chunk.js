(this.webpackJsonptexteditor=this.webpackJsonptexteditor||[]).push([[0],{13:function(e,t,n){"use strict";t.a="https://code-n-collab.onrender.com"},33:function(e,t,n){},50:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n.n(c),a=n(17),s=n.n(a),l=(n(33),n(11)),r=n(1),i=n(10),j=n(14),u=n.n(j),d=n(13),b=(n(50),n(2));var h=function(){var e=Object(r.f)(),t=Object(c.useState)(""),n=Object(i.a)(t,2),o=n[0],a=n[1],s=Object(c.useState)(""),l=Object(i.a)(s,2),j=l[0],h=l[1];return Object(b.jsx)("div",{className:"outer",children:Object(b.jsxs)("div",{className:"homepage",children:[Object(b.jsx)("h1",{className:"heading",children:" Code-N-Collab"}),Object(b.jsx)("p",{className:"para",children:"Realtime Collaborate Editor with Embedded Compiler and collaborative whiteboard"}),Object(b.jsx)("input",{onChange:function(e){h(e.target.value)},type:"text",placeholder:"Enter Name",value:j}),Object(b.jsx)("input",{onChange:function(e){a(e.target.value)},type:"text",placeholder:"Enter Room Name",value:o}),Object(b.jsx)("button",{onClick:function(t){t.preventDefault(),console.log("Room: ",o),console.log("Name: ",j),""!==o&&""!==j?u.a.post("".concat(d.a,"/new"),{roomName:o}).then((function(t){201===t.status&&e.push({pathname:"/room/".concat(o),state:{passedInDisplayName:j}})})).catch((function(e){console.log("Exception on POST request: ",e)})):console.log("Empty value",o,j)},children:"Join"})]})})},p=Object(c.lazy)((function(){return Promise.all([n.e(2),n.e(4)]).then(n.bind(null,338))}));function m(){return Object(b.jsx)(c.Suspense,{fallback:Object(b.jsx)("span",{children:"Loading..."}),children:Object(b.jsx)(l.a,{children:Object(b.jsxs)(r.c,{children:[Object(b.jsx)(r.a,{component:h,exact:!0,path:"/"}),Object(b.jsx)(r.a,{component:p,exact:!0,path:"/room/:roomName"})]})})})}s.a.render(Object(b.jsx)(o.a.StrictMode,{children:Object(b.jsx)(m,{})}),document.getElementById("root"))}},[[59,1,3]]]);
//# sourceMappingURL=main.e9ee49db.chunk.js.map