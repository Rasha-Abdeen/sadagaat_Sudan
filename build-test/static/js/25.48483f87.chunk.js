(this.webpackJsonpsadagaat_local=this.webpackJsonpsadagaat_local||[]).push([[25],{731:function(e,t,a){"use strict";a.r(t);var n=a(6),c=a.n(n),l=a(10),r=a(30),i=a(31),s=a(32),o=a(33),u=a(21),m=a(0),h=a.n(m),p=a(39),d=a(8),f=a(25),v=a.n(f),g=a(5),E=a(267),b=a(41),y=a.n(b),x=(a(84),a(296)),j=a.n(x);var O=function(e){Object(s.a)(a,e);var t=function(e){function t(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}return function(){var a,n=Object(u.a)(e);if(t()){var c=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,c)}else a=n.apply(this,arguments);return Object(o.a)(this,a)}}(a);function a(){var e;return Object(r.a)(this,a),(e=t.call(this)).fillMediaArray=function(){var t=e.state.event.images,a=e.state.event.video,n=[];t.length>0&&t.map((function(e){n.push({type:"image",id:e.id,name:e.name})})),a.length>0&&a.map((function(e){n.push({type:"video",id:e.id,name:e.name})})),e.setState({allMedia:n})},e.state={event:[],allMedia:[]},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t,a=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.match.params.event_id,e.next=3,v.a.get("".concat(Object(d.b)(),"events/").concat(t),{headers:{"accept-language":"".concat(g.a.language)}}).then((function(e){var t=e.data;a.setState({event:t}),a.fillMediaArray()})).catch((function(e){console.log(e.message)}));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillReceiveProps",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t,a=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.state.event.id,v.a.get("".concat(Object(d.b)(),"events/").concat(t),{headers:{"accept-language":"".concat(g.a.language)}}).then((function(e){var t=e.data;a.setState({event:t}),a.fillMediaArray()})).catch((function(e){console.log(e.message)}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props.t,t=this.state.event,a=this.state.allMedia;return h.a.createElement("div",{class:"main-content"},h.a.createElement(p.a,{name:e("Events"),coverImage:"events-bg-img"}),h.a.createElement("section",null,h.a.createElement("div",{class:"container"},h.a.createElement("div",{class:"row"},h.a.createElement("div",{class:"col-md-7"},h.a.createElement("h2",{class:"text-theme-colored "},t.name),h.a.createElement("div",{class:"entry-header"},a.length>0?h.a.createElement(y.a,{slidesPerScroll:1,rtl:!0,arrowLeft:h.a.createElement("i",{className:"fa fa-chevron-right fa-2x",style:{margin:"10px"}}),arrowRight:h.a.createElement("i",{className:"fa fa-chevron-left fa-2x",style:{margin:"10px"}}),addArrowClickHandler:!0,infinite:!0,clickToChange:!0,centered:!0,breakpoints:{1e3:{slidesPerPage:2,clickToChange:!1,centered:!1,infinite:!1},500:{slidesPerPage:1,slidesPerScroll:1,clickToChange:!1,centered:!1,animationSpeed:2e3,infinite:!1}}},a.map((function(e){return"image"===e.type?h.a.createElement("div",{class:"post-thumb thumb",style:{mxaHeight:"500px"}},h.a.createElement("img",{src:"".concat(Object(d.b)(),"events/").concat(e.name,"/image"),className:"img-fullwidth img-responsive",alt:"",style:{height:"400px"}})):h.a.createElement("div",null,h.a.createElement(j.a,{controls:!0,playIcon:!0,className:"img-fullwidth img-responsive",url:"".concat(Object(d.b)(),"events/").concat(e.name,"/video")}))}))):h.a.createElement("div",{class:"post-thumb thumb",style:{mxaHeight:"500px"}},h.a.createElement("img",{src:"".concat(Object(d.b)(),"events/").concat(t.id,"/image"),className:"img-fullwidth img-responsive",alt:"",style:{height:"400px"}})))),h.a.createElement("div",{class:"col-md-5"},h.a.createElement("ul",null,h.a.createElement("li",null,h.a.createElement("h4",null,e("Topic"),":"),h.a.createElement("p",null,t.name)),h.a.createElement("li",null,h.a.createElement("h4",null,e("Description"),":"),h.a.createElement("p",null,t.description)),h.a.createElement("li",null,h.a.createElement("h4",null,e("Start Date"),":"),h.a.createElement("p",null,t.startDate)),h.a.createElement("li",null,h.a.createElement("h4",null,e("End Date"),":"),h.a.createElement("p",null,t.endDate)),h.a.createElement("li",null,h.a.createElement("h4",null,e("Location"),":"),h.a.createElement("p",null,t.locationName)),h.a.createElement("li",null,h.a.createElement("h5",null))))))))}}]),a}(m.Component);t.default=Object(E.a)()(O)}}]);
//# sourceMappingURL=25.48483f87.chunk.js.map