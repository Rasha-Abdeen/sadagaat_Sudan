(this.webpackJsonpsadagaat_local=this.webpackJsonpsadagaat_local||[]).push([[7],{279:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))},293:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(44);t.a=function(){var e=Object(r.a)().t;return l.a.createElement("div",{class:"col-xs-12 col-sm-12 col-md-7"},l.a.createElement("h3",{class:"mt-0 line-bottom"},e("Donate Through Banks")),l.a.createElement("div",{class:"table-responsive"},l.a.createElement("table",{class:"table table-bordered"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,e("Bank")),l.a.createElement("th",null,e("Branch")),l.a.createElement("th",null,e("Account No")))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{scope:"col"},e("Khartoum Bank")),l.a.createElement("td",null,e("Reyadh")),l.a.createElement("td",null,"1290129")),l.a.createElement("tr",null,l.a.createElement("td",{scope:"row"},e("Abu- Dhabi National Bank")),l.a.createElement("td",null,e("Headquarters")),l.a.createElement("td",null,"891624")),l.a.createElement("tr",null,l.a.createElement("td",{scope:"row"},e("Export Developing Bank")),l.a.createElement("td",null,e("Al-Sajana")),l.a.createElement("td",null,"4765")),l.a.createElement("tr",null,l.a.createElement("td",{scope:"row"},e("Al-Neelain Bank")),l.a.createElement("td",null,e("Al-Namozaji")),l.a.createElement("td",null,"5032")),l.a.createElement("tr",null,l.a.createElement("td",{scope:"row"},e("Al-Salam Bank")),l.a.createElement("td",null,e("Al-Matar")),l.a.createElement("td",null,"305250")),l.a.createElement("tr",null,l.a.createElement("td",{scope:"row"},e("Al-Nile Bank")),l.a.createElement("td",null,e("Al-Amaraat")),l.a.createElement("td",null,"2654")),l.a.createElement("tr",null,l.a.createElement("td",{scope:"row"},e("Al-Saudi Bank")),l.a.createElement("td",null,e("Al-Amaraat")),l.a.createElement("td",null,"14195")),l.a.createElement("tr",null,l.a.createElement("td",{scope:"row"},e("Faisal Islamic Bank")),l.a.createElement("td",null,e("Barlaman")),l.a.createElement("td",null,"12300123"))))))}},725:function(e,t,a){"use strict";a.r(t);var n=a(6),l=a.n(n),r=a(10),c=a(279),s=a(30),o=a(31),m=a(32),i=a(33),u=a(21),d=a(0),p=a.n(d),E=a(39),f=a(8),h=a(25),g=a.n(h),b=(a(302),a(5)),v=a(267),y=a(293);var w=function(e){Object(m.a)(a,e);var t=function(e){function t(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}return function(){var a,n=Object(u.a)(e);if(t()){var l=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,l)}else a=n.apply(this,arguments);return Object(i.a)(this,a)}}(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleChange=function(e){n.setState(Object(c.a)({},e.target.name,e.target.value))},n.handleSubmite=function(e){e.preventDefault();var t={pid:n.state.project_id,amount:n.state.amount,currency:n.state.currency};console.log(t),n.setState({loading:!0}),g.a.post("".concat(Object(f.b)(),"donate"),t).then((function(e){1===e.data.responseCode?(window.location=e.data.paymentUrl,setTimeout((function(){n.setState({loading:!1})}),2e3)):2===e.data.responseCode?n.setState({message:"Please Enter Valid Amount",iconClass:"fa fa-times-circle",styleClass:"error-msg",donateTo:"Sadagaat"}):n.setState({message:"something went wrong try again later",iconClass:"fa fa-times-circle",styleClass:"error-msg",donateTo:"Sadagaat"})})).catch((function(e){var t;n.setState({loading:!0}),t="Network Error"===e.message?"Network Error":"something went wrong try again later",setTimeout((function(){n.setState({loading:!1,message:t,iconClass:"fa fa-times-circle",styleClass:"error-msg"})}),2e3)}))},n.state={project_id:n.props.match.params.hubId,amount:0,message:"",iconClass:"",styleClass:"",loading:!1,currency:"SDG",project:[]},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=Object(r.a)(l.a.mark((function e(){var t,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.match.params.project_id,this.setState({project_id:t}),e.next=4,g.a.get("".concat(Object(f.b)(),"projects/").concat(t),{headers:{"accept-language":"".concat(b.a.language)}}).then((function(e){var t=e.data;a.setState({project:t})})).catch((function(e){alert(e.message)}));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillReceiveProps",value:function(){var e=Object(r.a)(l.a.mark((function e(){var t,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.state.project_id,g.a.get("".concat(Object(f.b)(),"projects/").concat(t),{headers:{"accept-language":"".concat(b.a.language)}}).then((function(e){var t=e.data;a.setState({project:t})})).catch((function(e){alert(e.message)}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props.t,t=this.state.loading;return p.a.createElement("div",null,p.a.createElement(E.a,{name:e("Donate")}),p.a.createElement("section",null,p.a.createElement("div",{class:"container"},p.a.createElement("div",{class:"section-content"},p.a.createElement("div",{class:"row"},p.a.createElement("div",{class:"col-xs-12 col-sm-12 col-md-5"},p.a.createElement("h3",{class:"mt-0 line-bottom"},e("Donate Through SyberPay"),p.a.createElement("span",{class:"font-weight-300"})),p.a.createElement("p",{className:this.state.styleClass},p.a.createElement("i",{className:this.state.iconClass,style:{margin:"5px"}}),e(this.state.message)),p.a.createElement("form",{role:"form",id:"popup_paypal_donate_form_onetime_recurring",onSubmit:this.handleSubmite},p.a.createElement("div",{className:"row"},p.a.createElement("div",{className:"col-sm-12"},p.a.createElement("div",{className:"form-group mb-20"},p.a.createElement("input",{name:"name",className:"form-control",type:"readOnly",value:this.state.project.name,style:{fontSize:"16px"},readonly:!0,required:!0})))),p.a.createElement("div",{className:"row"},p.a.createElement("div",{className:"col-sm-9"},p.a.createElement("div",{className:"form-group mb-20"},p.a.createElement("label",null,p.a.createElement("strong",null,e("How much do you want to donate?"))),p.a.createElement("input",{name:"amount",className:"form-control",type:"number",min:"1",onChange:this.handleChange,onInvalid:function(t){t.target.setCustomValidity(e("Enter a valid amount"))},onInput:function(t){t.target.setCustomValidity(e(""))},required:!0}))),p.a.createElement("div",{className:"col-sm-3"},p.a.createElement("div",{className:"form-group mb-20"},p.a.createElement("label",null,p.a.createElement("strong",null," ",p.a.createElement("br",null)," ")),p.a.createElement("select",{name:"currency",className:"form-control",onChange:this.handleChange},p.a.createElement("option",{name:"currency"},"SDG"))))),p.a.createElement("div",{className:"col-sm-12"},p.a.createElement("div",{className:"form-group"},p.a.createElement("button",{type:"submit",className:"btn btn-flat btn-dark btn-theme-colored mt-10 pl-30 pr-30","data-loading-text":"Please wait..."},t&&p.a.createElement("i",{className:"fa fa-spinner fa-spin",style:{margin:"5px"}}),e("Donate")," ",e("Now!")))))),p.a.createElement(y.a,null))))))}}]),a}(d.Component);t.default=Object(v.a)()(w)}}]);
//# sourceMappingURL=7.6df5c96d.chunk.js.map