(this.webpackJsonpsadagaat_local=this.webpackJsonpsadagaat_local||[]).push([[14],{288:function(e,t,a){"use strict";var n=a(6),c=a.n(n),l=a(10),s=a(7),r=a(0),i=a.n(r),o=a(8),m=a(4),u=(a(127),a(5)),b=a(44),f=a(83),d=a.n(f);t.a=function(e){var t=Object(r.useState)([]),a=Object(s.a)(t,2),n=a[0],f=a[1],p=Object(r.useState)(0),h=Object(s.a)(p,2),v=h[0],g=h[1],E=Object(r.useState)(1),x=Object(s.a)(E,2),N=(x[0],x[1]),j=Object(r.useState)(6),w=Object(s.a)(j,1)[0],O=e.hubId,y=Object(b.a)().t;function k(){return(k=Object(l.a)(c.a.mark((function e(){var t,a,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.fetch("".concat(Object(o.b)(),"subHubs"),{headers:{"accept-language":"".concat(u.a.language)}});case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,n=a.filter((function(e){return e.hubId===O})),f(n);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(r.useEffect)((function(){!function(){k.apply(this,arguments)}()}),[e]);var S=n.slice(v,v+w);return i.a.createElement("div",null,i.a.createElement("div",{className:"row multi-row-clearfix"},i.a.createElement("div",{className:"blog-posts"},i.a.createElement("h3",{class:"mt-10 line-bottom"},e.name),i.a.createElement("br",null),S.map((function(e){return i.a.createElement("div",{className:"col-md-4",key:e.id},i.a.createElement("div",{class:"causes bg-white mb-30",style:{height:"400px"}},i.a.createElement(m.b,{to:"/single-subhub/"+e.id},i.a.createElement("div",{class:"thumb"},i.a.createElement("img",{src:"".concat(Object(o.b)(),"subHubs/").concat(e.id,"/image"),alt:!0,className:"img-fullwidth",height:"250px"})),i.a.createElement("div",{class:"causes-details clearfix border-bottom p-15 pt-15 pb-15"},i.a.createElement("h4",{class:"text-uppercase"},e.name),i.a.createElement(m.b,{to:"/sub_hubs/"+e.id,className:"btn btn-default btn-theme-colored btn-xs font-16 mt-10"},y("Donate"))))))}))),n.length>w&&i.a.createElement("div",{style:{position:"absolute",bottom:"0%"}},i.a.createElement(d.a,{previousLabel:y("prev"),nextLabel:y("next"),breakLabel:"...",breakClassName:"break-me",pageCount:Math.ceil(n.length/w),marginPagesDisplayed:2,pageRangeDisplayed:5,onPageChange:function(e){N(e.selected),g(e.selected*w)},containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"}))))}},722:function(e,t,a){"use strict";a.r(t);var n=a(6),c=a.n(n),l=a(10),s=a(30),r=a(31),i=a(32),o=a(33),m=a(21),u=a(0),b=a.n(u),f=a(8),d=a(39),p=a(4),h=a(5),v=a(288),g=a(267),E=a(85);var x=function(e){Object(i.a)(a,e);var t=function(e){function t(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}return function(){var a,n=Object(m.a)(e);if(t()){var c=Object(m.a)(this).constructor;a=Reflect.construct(n,arguments,c)}else a=n.apply(this,arguments);return Object(o.a)(this,a)}}(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).changeActiveTab1=function(){e.setState({activeTab1:"active",activeTab2:""})},e.changeActiveTab2=function(){e.setState({activeTab1:"",activeTab2:"active"})},e.fileType=function(){var t=e.state.files[0].displayName;return t.search(".pdf")?"pdf":t.search(".xlsx")?"xlsx":t.search(".docs")?"docx":void 0},e.getFileName=function(){return e.state.files[0].name},e.fileType=function(){var t=e.state.files[0].name,a="";return t.search(".pdf")>0?a="pdf":t.search(".xlsx")>0?a="xlsx":t.search(".docs")>0&&(a="docx"),a},e.fileIcon=function(){var t=e.fileType();switch(console.log(t),t){case"pdf":return b.a.createElement("i",{class:"fa fa-file-pdf-o"});case"xlsx":return b.a.createElement("i",{class:"fa fa-file-excel-o"});case"docx":return b.a.createElement("i",{class:"fa fa-file-word-o"})}},e.openFile=function(){var t=Object(f.b)()+"hub/document/"+e.getFileName();fetch(t).then((function(e){return e.blob()})).then((function(t){var a=URL.createObjectURL(t);e.setState({file:a}),window.open(e.state.file)}))},e.state={hub:[],offset:0,files:[],file:"",activeTab1:"active",activeTab2:""},e}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(this.props),e.next=3,window.fetch("".concat(Object(f.b)(),"hubs/1102"),{headers:{"accept-language":"".concat(h.a.language)}});case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,this.setState({hub:a,files:a.files});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillReceiveProps",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.fetch("".concat(Object(f.b)(),"hubs/1102"),{headers:{"accept-language":"".concat(h.a.language)}});case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,this.setState({hub:a,files:a.files});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.files,a=this.props.t,n=this.state.hub,c="rtl"===h.a.dir()?"float-right":"float-left",l=(h.a.dir(),"rtl"===h.a.dir()?"mr-5":"ml-5");return b.a.createElement(b.a.Fragment,null,b.a.createElement("section",null,b.a.createElement(d.a,{name:a("Water"),coverImage:"water-bg-img"}),b.a.createElement("div",{className:"container"},b.a.createElement("div",{className:"row multi-row-clearfix"},b.a.createElement("div",null,b.a.createElement("div",{className:"col-xs-12 col-md-12"},b.a.createElement("h2",{class:"line-bottom mt-0"},n.name),b.a.createElement("ul",{className:"nav nav-tabs"},b.a.createElement("li",{className:this.state.activeTab1+" "+c},b.a.createElement("a",{href:"#login-tab","data-toggle":"tab",id:"login",onClick:this.changeActiveTab1},a("Sector Details"))),b.a.createElement("li",{className:this.state.activeTab2+" "+c},b.a.createElement("a",{href:"#register-tab","data-toggle":"tab",onClick:this.changeActiveTab2},a("Sector File")))),b.a.createElement("div",{className:"tab-content"},b.a.createElement("div",{className:"tab-pane fade in active p-15",id:"login-tab"},b.a.createElement("div",{className:"event media sm-maxwidth400 border-bottom mt-5 mb-5 pt-10 pb-15"},b.a.createElement("div",{className:"row"},b.a.createElement("div",{className:"causes"},b.a.createElement("div",{className:"row-fluid"},b.a.createElement("div",{className:"col-md-6"},b.a.createElement("div",{className:"post-thumb thumb",style:{mxaHeight:"600px"}},b.a.createElement("img",{className:"img-responsive",src:"".concat(Object(f.b)(),"hubs/").concat(n.id,"/image"),alt:"Water Sector",style:{height:"400px",width:"500px"}}))),b.a.createElement("div",{class:"causes-details col-md-6"},b.a.createElement("p",null,n.description),b.a.createElement("div",{class:"mt-10 mb-20"},b.a.createElement("ul",{class:"list-inline clearfix mt-10"},b.a.createElement("li",{class:"text-theme-colored pull-right flip pr-0"}))),b.a.createElement(p.b,{to:"/hub/"+n.id,class:"btn btn-theme-colored btn-sm"},a("Donate Now"))))))),b.a.createElement(v.a,{hubId:n.id,name:a("Water Sub Sectors")})),b.a.createElement("div",{className:"tab-pane fade in p-15",id:"register-tab"},b.a.createElement("p",null,a("Files")),void 0!==t&&t.length>0?t.map((function(t,n){return b.a.createElement("div",null,"pdf"===e.fileType()?b.a.createElement(E.a,{trigger:function(a){return b.a.createElement("a",{className:"popupCustom-btn"},e.fileIcon()," ",t.displayName)},position:"bottom center",closeOnDocumentClick:!0},b.a.createElement("div",null,b.a.createElement("h6",null,e.fileIcon()," ",t.displayName),b.a.createElement("a",{href:"".concat(Object(f.b)(),"hub/document/").concat(e.getFileName()),className:"btn btn-flat btn-theme-colored btn-sm",target:"_slef",download:"pdf"},a("Save")),b.a.createElement("a",{onClick:e.openFile,className:"btn btn-flat btn-theme-colored btn-sm "+l},a("Open")))):b.a.createElement("a",{href:"".concat(Object(f.b)(),"hub/document/").concat(e.getFileName())},e.fileIcon()," ",t.displayName))})):b.a.createElement("p",null,a("No Files Available"))))))))))}}]),a}(u.Component);t.default=Object(g.a)()(x)}}]);
//# sourceMappingURL=14.645165d7.chunk.js.map