(this.webpackJsonptexteditor=this.webpackJsonptexteditor||[]).push([[5],{333:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return i}));var o=a(9),n=a(0),c=a.n(n),l=a(15),r=a.n(l),u=a(14),m=a(1),s=a(10);function i(){var e=Object(m.f)(),t=Object(n.useState)(""),a=Object(o.a)(t,2),l=a[0],i=a[1],p=Object(n.useState)(""),h=Object(o.a)(p,2),d=h[0],f=h[1];return c.a.createElement("div",{className:"homepage_container"},c.a.createElement("form",{className:"box"},c.a.createElement("h1",null,"CodeShare"),c.a.createElement("h3",null,"Realtime Collaborative Text Editor and Whiteboard"),c.a.createElement("input",{onChange:function(e){f(e.target.value)},type:"text",placeholder:"Enter Name",value:d}),c.a.createElement("input",{onChange:function(e){i(e.target.value)},type:"text",placeholder:"Enter Room Name",value:l}),c.a.createElement("button",{onClick:function(t){t.preventDefault(),console.log("Room: ",l),console.log("Name: ",d),""!==l&&""!==d?r.a.post("".concat(u.a,"/new"),{roomName:l}).then((function(t){201===t.status&&e.push({pathname:"/room/".concat(l),state:{passedInDisplayName:d}})})).catch((function(e){console.log("Exception on POST request: ",e)})):console.log("Empty value",l,d)}},"Begin Session"),c.a.createElement("br",null),c.a.createElement(s.b,{to:{pathname:"/room/defaultRoom",state:{displayName:"francisco"}}},"Click here to go to /room/defaultRoom")))}}}]);
//# sourceMappingURL=5.839904f7.chunk.js.map