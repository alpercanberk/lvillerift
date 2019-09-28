(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{111:function(e,t,a){e.exports=a.p+"static/media/riftlogo1.6c4a7800.png"},131:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(16),l=a.n(o),r=a(23),s=a(24),c=a(26),u=a(25),m=a(10),d=a(27),g=a(72),h=a(137),p=a(75),f=(n.Component,a(59),a(134)),b=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement(f.a,null,i.a.createElement("h1",{class:"mission-title"},"Mission"),i.a.createElement("p",null,"Replace this"),i.a.createElement("p",null,"RIFT is sleek, fast and convenient. Each meal rating takes less than a minute and the dining hall staff can see your feedback instantly. It is important that you try to give as much feedback as possible and that you make your rating a constructive criticism."),i.a.createElement("p",null,"If you encounter any problems with the software or if you have suggestions about the website, feel free to contact Alper Canberk at acanberk21@lawrenceville.org"))}}]),t}(n.Component),E=a(142),v=a(138),k=a(141),y=a(135),w=a(74),C=a(35),S=a.n(C),_=window.CURRENT_HOST+"receive_rating",T=["Salt","Spice","Sweetness","Cooking Time"],R={Salt:["Too little","Just right","Too much"],Spice:["Too little","Just right","Too much"],Sweetness:["Too little","Just right","Too much"],"Cooking Time":["Undercooked","Just right","Overcooked"]};function O(e){for(var t=0;t<T.length;t++)if(T[t]==e)return t}var I=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={ratings:[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],additionalRating:""},a.onRatingClick=a.onRatingClick.bind(Object(m.a)(a)),a.onCommentChange=a.onCommentChange.bind(Object(m.a)(a)),a.onSubmit=a.onSubmit.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"onRatingClick",value:function(e,t){console.log(e),console.log(t),console.log(this.state.ratings);for(var a=this.state.ratings,n=0;n<3;n++)a[O(e)][n]=n==t?1:0;console.log(a),this.setState({ratings:a})}},{key:"onCommentChange",value:function(e){this.setState({additionalRating:e.target.value})}},{key:"onSubmit",value:function(){console.log(this.state),S.a.post(_,{user_name:window.user_name,user_email:window.user_email,ratings:this.state.ratings,comment:this.state.additionalRating})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement(E.a,{variant:"flush"},this.props.meal.items.map(function(t){return i.a.createElement(E.a.Item,{style:{paddingTop:20}},i.a.createElement(v.a,{defaultActiveKey:"0",class:"accordion"},i.a.createElement(k.a,null,i.a.createElement(k.a.Header,null,i.a.createElement(v.a.Toggle,{as:p.a,variant:"none",eventKey:"0"},i.a.createElement("h5",null,t))),i.a.createElement(v.a.Collapse,{eventKey:"0"},i.a.createElement(k.a.Body,null,i.a.createElement("div",{class:"rating-boxes"},i.a.createElement(y.a,null,["Salt","Spice","Sweetness","Cooking Time"].map(function(t){return i.a.createElement(w.a,null,i.a.createElement("h6",null,t),i.a.createElement(h.a,null,i.a.createElement("div",{onClick:function(){e.onRatingClick(t,0)},class:e.state.ratings[O(t)][0]?"filled-option":"unfilled-option"},R[t][0]),i.a.createElement("div",{onClick:function(){e.onRatingClick(t,1)},class:e.state.ratings[O(t)][1]?"filled-option":"unfilled-option"},R[t][1]),i.a.createElement("div",{onClick:function(){e.onRatingClick(t,2)},class:e.state.ratings[O(t)][2]?"filled-option":"unfilled-option"},R[t][2])))}))),i.a.createElement("div",{style:{marginTop:10}},i.a.createElement(h.a,null,i.a.createElement(h.a.Label,null,"Additional Comments"),i.a.createElement(h.a.Control,{as:"textarea",rows:"2",onChange:e.onCommentChange}))),i.a.createElement("div",{class:"submit-button"},i.a.createElement(p.a,{onClick:e.onSubmit},"Submit")))))))})))}}]),t}(n.Component),j=a(140),x=a(136),A=a(139),B=(a(111),a(52)),N=a(28),H=window.CURRENT_HOST+"complete_meal",J=window.CURRENT_HOST+"completed_meals",L=window.CURRENT_HOST+"receive_rating",M=["breakfast","lunch","dinner"],D={breakfast:{date:"August 19",time:0,title:"Breakfast - August 19",items:["Belgium Waffles","Homefried Potatoes","Sausage Links","Assorted Pastries"],type:"breakfast"},lunch:{date:"August 19",time:0,title:"Lunch - August 19",items:["French Onion Soup","Mako Shark Tacos","Kale Sautee","Ice Cream"],type:"breakfast"},dinner:{date:"August 19",time:0,title:"Dinner - August 19",items:["Flank Steak","Mashed Potatoes","Seasonal Vegetables","Ice Cream"],type:"breakfast"}},U=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={ratings_input:[],submit_detector:0,ready_to_send:!1,completed:[!0,!0,!0]},a.submitRating=a.submitRating.bind(Object(m.a)(a)),a.collectInputData=a.collectInputData.bind(Object(m.a)(a)),a.renderRating=a.renderRating.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){var e=this;console.log("Completed meals url:"),console.log(J),S.a.get(J).then(function(t){console.log("Component will mount!"),console.log(t);var a=e.state.completed;t.data.breakfast||(a[0]=!1),t.data.lunch||(a[1]=!1),t.data.dinner||(a[2]=!1),e.setState({completed:a})})}},{key:"renderSignInButton",value:function(){return window.user_email?i.a.createElement(j.a.Text,null,i.a.createElement("a",{href:"/logout"},i.a.createElement(p.a,{variant:"outline",id:"sign-in-button"},"Sign Out"))):i.a.createElement(j.a.Text,null,i.a.createElement("a",{href:"/auth/google"},i.a.createElement(p.a,{variant:"outline",id:"sign-in-button"},"Sign In")))}},{key:"renderGreeting",value:function(){return window.user_name?i.a.createElement("h1",{className:"greeting"},"Welcome ",window.user_name,", what do you think about Irwin today?"):i.a.createElement("p",{className:"sign-in-prompt"},"You must sign in with an Lville account in order to be able to rate the food.")}},{key:"renderSubmitRating",value:function(e){var t=this,a="";return window.user_email&&!this.state.completed[this.mealToIndex(e)]?a=i.a.createElement(p.a,{onClick:function(){t.submitRating(e)},style:{backgroundColor:"#BA1A26",color:"white",borderColor:"#BA1A26",height:40,width:200,margin:"5px auto"}},i.a.createElement("h5",null,"Submit Rating")):window.user_email&&this.state.completed[this.mealToIndex(e)]&&(a=i.a.createElement("p",{className:"already-rated"},"You have already rated this meal today.")),a}},{key:"mealToIndex",value:function(e){return"breakfast"==e?0:"lunch"==e?1:"dinner"==e?2:void 0}},{key:"submitRating",value:function(e){var t=this;if(this.setState({ratings_input:[]}),this.setState({ready_to_send:!1}),this.state.completed[this.mealToIndex(e)])console.log("Bruh you already rated this!");else{console.log("rating!");var a=this.state.submit_detector,n=0;"breakfast"==e?n=1:"lunch"==e?n=2:"dinner"==e&&(n=3),a+=n,this.setState({submit_detector:a})}S.a.post(H,{user:window.user_email,complete_type:e}).then(function(a){if(console.log(a),alert(a.data),a.data="Rating successful!"){console.log("rating successful! - confirmed");var n=t.state.completed;n[t.mealToIndex(e)]=!0,t.setState({completed:n})}})}},{key:"collectInputData",value:function(e,t){var a=this.state.ratings_input;a.push(e),this.setState({ratings_input:a})}},{key:"componentDidUpdate",value:function(e,t,a){console.log("Component did update!"),console.log(this.state),t.ratings_input!=this.state.ratings_input&&(this.state.ratings_input.length>0?(console.log("ready! make request!!"),S.a.post(L,{user_name:window.user_name,user_email:window.user_email,ratings:this.state.ratings_input})):console.log("nope, you can't rate this anymore"))}},{key:"renderRating",value:function(e){return i.a.createElement("div",null,e.map(function(e){return i.a.createElement(k.a,{style:{marginLeft:30,marginRight:30,marginTop:30}},i.a.createElement(k.a.Header,{className:"menu-title"},i.a.createElement("h4",{style:{margin:15}},D[e].title)),i.a.createElement(I,{meal:D[e]}))}))}},{key:"readyToSend",value:function(){this.setState({ready_to_send:!0})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"App"},i.a.createElement(B.a,null,i.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",integrity:"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T",crossorigin:"anonymous"}),i.a.createElement(j.a,{bg:"light",expand:"lg",color:"red"},i.a.createElement(j.a.Brand,{href:"#home"},i.a.createElement("span",{style:{"font-size":30}},"LIFE")),i.a.createElement(j.a.Toggle,{"aria-controls":"basic-navbar-nav"}),i.a.createElement(j.a.Collapse,{id:"basic-navbar-nav"},i.a.createElement(x.a,{className:"mr-auto"},i.a.createElement(x.a.Link,{href:"#home"},"Home"),i.a.createElement(x.a.Link,{href:"#mission"},"Mission"),i.a.createElement(A.a,{title:"Statistics",id:"basic-nav-dropdown"},i.a.createElement(A.a.Item,{href:"#action/3.1"},"Work"),i.a.createElement(A.a.Item,{href:"#action/3.2"},"In"),i.a.createElement(A.a.Item,{href:"#action/3.3"},"Progress"),i.a.createElement(A.a.Divider,null),i.a.createElement(A.a.Item,{href:"#action/3.4"},"Check later"))),this.renderSignInButton())),i.a.createElement(N.b,{exact:!0,path:"/",render:function(){return i.a.createElement(N.a,{to:"/home"})}}),i.a.createElement(N.b,{path:"/mission",component:b}),i.a.createElement(N.b,{path:"/home",render:function(){return i.a.createElement("div",null,e.renderGreeting(),e.renderRating(M))}})))}}]),t}(n.Component);l.a.render(i.a.createElement(U,null),document.getElementById("root"))},59:function(e,t,a){},82:function(e,t,a){e.exports=a(131)}},[[82,1,2]]]);
//# sourceMappingURL=main.a3f772f9.chunk.js.map