(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{110:function(e,t,a){e.exports=a.p+"static/media/riftlogo1.6c4a7800.png"},130:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(16),r=a.n(i),o=a(18),c=a(19),s=a(23),m=a(20),u=a(24),d=(a(49),a(133)),g=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(d.a,null,l.a.createElement("h1",{class:"mission-title"},"Mission"),l.a.createElement("p",null,"Replace this"),l.a.createElement("p",null,"RIFT is sleek, fast and convenient. Each meal rating takes less than a minute and the dining hall staff can see your feedback instantly. It is important that you try to give as much feedback as possible and that you make your rating a constructive criticism."),l.a.createElement("p",null,"If you encounter any problems with the software or if you have suggestions about the website, feel free to contact Alper Canberk at acanberk21@lawrenceville.org"))}}]),t}(n.Component),h=a(13),E=a(141),p=a(137),f=a(140),v=a(74),b=a(134),y=a(75),w=a(136),k=a(31),C=a.n(k),O=window.CURRENT_HOST+"receive_rating",S="";window.rated_meals.length>20&&(S=JSON.parse(window.rated_meals.replace(new RegExp("u&#39;","g"),'"').replace(new RegExp("&#39;","g"),'"'))),console.log(S);var R=["Salt","Spice","Sweetness","Cooking Time"],T={Salt:["Too little","Just right","Too much"],Spice:["Too little","Just right","Too much"],Sweetness:["Too little","Just right","Too much"],"Cooking Time":["Undercooked","Just right","Overcooked"]};function j(e,t){for(var a=0;a<t.length;a++)if(t[a]==e)return a}function _(e,t){for(var a=0;a<t.length;a++)if(t[a]==e)return a+1;return 0}var x=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={ratings:[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],additionalRating:"",active:!1},a.onRatingClick=a.onRatingClick.bind(Object(h.a)(a)),a.onCommentChange=a.onCommentChange.bind(Object(h.a)(a)),a.onSubmit=a.onSubmit.bind(Object(h.a)(a)),a.updateActive=a.updateActive.bind(Object(h.a)(a)),a.renderActive=a.renderActive.bind(Object(h.a)(a)),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"onRatingClick",value:function(e,t){console.log(e),console.log(t),console.log(this.state.ratings);for(var a=this.state.ratings,n=0;n<3;n++)a[j(e,R)][n]=n==t?1:0;console.log(a),this.setState({ratings:a})}},{key:"onCommentChange",value:function(e){this.setState({additionalRating:e.target.value})}},{key:"onSubmit",value:function(e){var t=this;console.log(this.state),C.a.post(O,{name:e,email:window.user_email,saltiness:_(1,this.state.ratings[0]),spice:_(1,this.state.ratings[1]),sweetness:_(1,this.state.ratings[2]),cooking_time:_(1,this.state.ratings[3]),comment:this.state.additionalRating,time:(new Date).getTime()}).then(function(e){alert(e.data),window.location.reload(),t.forceUpdate()})}},{key:"updateActive",value:function(){var e=this.state.active;this.setState({active:!e})}},{key:"renderActive",value:function(e){return e?l.a.createElement("span",{style:{float:"right",color:"red"}},"Rated"):this.state.active?l.a.createElement("span",{style:{float:"right"}},"\u25b2"):l.a.createElement("span",{style:{float:"right"}},"\u25bc")}},{key:"render",value:function(){var e=this;return l.a.createElement(E.a.Item,{className:"meal-list-group"},l.a.createElement(p.a,{defaultActiveKey:"1",class:"accordion meal-accordion"},l.a.createElement(f.a,null,l.a.createElement(f.a.Header,null,l.a.createElement(p.a.Toggle,{as:v.a,variant:"none",eventKey:"0",class:"accordion-toggle",onClick:this.updateActive},l.a.createElement("h5",null,l.a.createElement("span",{style:{float:"left"}},this.props.item),this.renderActive(S.includes(this.props.item))))),l.a.createElement(p.a.Collapse,{eventKey:"0"},l.a.createElement(f.a.Body,null,S.includes(this.props.item)?l.a.createElement("div",null,"Sorry, you have already rated this meal today"):l.a.createElement("div",null,l.a.createElement("div",{class:"rating-boxes"},l.a.createElement(b.a,null,["Salt","Spice","Sweetness","Cooking Time"].map(function(t){return l.a.createElement(y.a,{sm:!0},l.a.createElement("h6",null,t),l.a.createElement(w.a,null,l.a.createElement("div",{onClick:function(){e.onRatingClick(t,0)},class:e.state.ratings[j(t,R)][0]?"filled-option":"unfilled-option"},T[t][0]),l.a.createElement("div",{onClick:function(){e.onRatingClick(t,1)},class:e.state.ratings[j(t,R)][1]?"filled-option":"unfilled-option"},T[t][1]),l.a.createElement("div",{onClick:function(){e.onRatingClick(t,2)},class:e.state.ratings[j(t,R)][2]?"filled-option":"unfilled-option"},T[t][2])))}))),l.a.createElement("div",{style:{marginTop:10}},l.a.createElement(w.a,null,l.a.createElement(w.a.Label,null,"Additional Comments"),l.a.createElement(w.a.Control,{as:"textarea",rows:"2",onChange:this.onCommentChange}))),l.a.createElement("div",{class:"submit-button"},l.a.createElement(v.a,{onClick:function(){e.onSubmit(e.props.item)}},"Submit"))))))))}}]),t}(n.Component),A=function(e){function t(e){return Object(o.a)(this,t),Object(s.a)(this,Object(m.a)(t).call(this,e))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(E.a.Item,{className:"meal-list-group"},l.a.createElement(p.a,{defaultActiveKey:"1",class:"accordion meal-accordion"},l.a.createElement(f.a,null,l.a.createElement(f.a.Header,null,l.a.createElement(p.a.Toggle,{as:v.a,variant:"none",eventKey:"0",class:"accordion-toggle",onClick:this.updateActive},l.a.createElement("h5",null,l.a.createElement("span",{style:{float:"left"}},this.props.item)))))))}}]),t}(n.Component),I=window.CURRENT_HOST+"delete_rating",N=[{comment:"",cooking_time:3,email:"acanberk21@lawrenceville.org",meal:"Potato Bucks",id:4,saltiness:1,spice:3,sweetness:2,time:1570042507724},{comment:"",cooking_time:3,email:"acanberk21@lawrenceville.org",meal:"Potato Bucks",id:5,saltiness:1,spice:3,sweetness:2,time:1570042537546},{comment:"Hi, this is a comment",cooking_time:2,email:"acanberk21@lawrenceville.org",meal:"Potato Bucks",id:6,saltiness:2,spice:3,sweetness:1,time:1570042668813}],L=["Not rated","Too litte","Just enough","Too much"],H=["#000","orange","green","red"];function J(e){return L[e]}window.ratings.length>100&&(console.log(window.ratings.replace(new RegExp("u&#39;","g"),'"').replace(new RegExp("&#39;","g"),'"')),N=JSON.parse(window.ratings.replace(new RegExp("u&#39;","g"),'"').replace(new RegExp("&#39;","g"),'"').replace(new RegExp("&#34;","g"),'"')));for(var B=0;B<N.length;B++){var M=new Date(N[B].time);N[B].time=M.getMonth()+"/"+M.getDay()+"/"+M.getFullYear()}var U=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={search:"",category:"Meal",ratings:N},a.search=a.search.bind(Object(h.a)(a)),a.categoryChange=a.categoryChange.bind(Object(h.a)(a)),a.onRead=a.onRead.bind(Object(h.a)(a)),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"renderRating",value:function(e){var t=this;return l.a.createElement(f.a,{style:{margin:10,padding:10}},l.a.createElement("div",null,l.a.createElement("h5",{style:{float:"left"},class:"rating-display-title"},e.meal),l.a.createElement("span",{class:"rating-email",style:{float:"right"}},e.email," - ",e.time)),l.a.createElement(b.a,null,l.a.createElement("div",null),l.a.createElement(y.a,{sm:!0},l.a.createElement("div",{class:"rating-display",style:{border:"3px solid "+H[e.sweetness]}},l.a.createElement("div",{style:{fontWeight:"bold"}},"Sweetness"),l.a.createElement("div",null,J(e.sweetness)))),l.a.createElement(y.a,{sm:!0},l.a.createElement("div",{class:"rating-display",style:{border:"3px solid "+H[e.spice]}},l.a.createElement("div",{style:{fontWeight:"bold"}},"Spice"),l.a.createElement("div",null,J(e.spice)))),l.a.createElement(y.a,{sm:!0},l.a.createElement("div",{class:"rating-display",style:{border:"3px solid "+H[e.saltiness]}},l.a.createElement("div",{style:{fontWeight:"bold"}},"Saltiness"),l.a.createElement("div",null,J(e.saltiness)))),l.a.createElement(y.a,{sm:!0},l.a.createElement("div",{class:"rating-display",style:{border:"3px solid "+H[e.cooking_time]}},l.a.createElement("div",{style:{fontWeight:"bold"}},"Cooking Time"),l.a.createElement("div",null,J(e.cooking_time))))),l.a.createElement("h6",null,"Custom Comment:"),l.a.createElement("div",{class:"rating-comment"},e.comment),l.a.createElement(v.a,{onClick:function(){t.onRead(e.id)}},"Delete"))}},{key:"onRead",value:function(e){var t=this;console.log(e),console.log("hi"),C.a.post(I,{id:e}).then(function(e){alert(e.data),window.location.reload(),t.forceUpdate()})}},{key:"search",value:function(e){console.log(this.state);var t=this.state.category.toLowerCase();console.log(N.filter(function(t){return t.meal.includes(e.target.value)})),e.target.value&&this.setState({ratings:N.filter(function(a){return a[t].toLowerCase().includes(e.target.value.toLowerCase())})})}},{key:"categoryChange",value:function(e){console.log(e.target.value),this.setState({category:e.target.value})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(w.a,{style:{margin:20}},l.a.createElement(b.a,null,l.a.createElement(y.a,null,l.a.createElement(w.a.Label,null,"Search")),l.a.createElement(y.a,null,l.a.createElement(w.a.Label,null,"Search by"))),l.a.createElement(b.a,null,l.a.createElement(y.a,null,l.a.createElement(w.a.Control,{onChange:this.search,style:{margin:10}})),l.a.createElement(y.a,null,l.a.createElement(w.a.Control,{onChange:this.categoryChange,as:"select",style:{margin:10}},l.a.createElement("option",null,"Meal"),l.a.createElement("option",null,"Email"),l.a.createElement("option",null,"Time"))))),l.a.createElement(f.a,{class:"rating-display",style:{margin:10}},this.state.ratings.map(function(t){return e.renderRating(t)})))}}]),t}(n.Component),P=a(139),W=a(135),D=a(138),K=(a(110),a(53)),F=a(28),Q=(window.CURRENT_HOST,window.CURRENT_HOST,window.CURRENT_HOST,window.admin,["breakfast","lunch","dinner"]),Y={breakfast:{date:"August 19",time:0,title:"Breakfast - August 19",items:["Belgium Waffles","Homefried Potatoes","Sausage Links","Assorted Pastries"],type:"breakfast"},lunch:{date:"August 19",time:0,title:"Lunch - August 19",items:["French Onion Soup","Mako Shark Tacos","Kale Sautee","Ice Cream"],type:"breakfast"},dinner:{date:"August 19",time:0,title:"Dinner - August 19",items:["Flank Steak","Mashed Potatoes","Seasonal Vegetables","Ice Cream"],type:"breakfast"}};window.menu.length>100&&(Y=JSON.parse(window.menu.replace(new RegExp("u&#39;","g"),'"').replace(new RegExp("&#39;","g"),'"')));var G=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={ratings_input:[],submit_detector:0,ready_to_send:!1,completed:[!0,!0,!0]},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"renderSignInButton",value:function(){return window.user_email?l.a.createElement(P.a.Text,null,l.a.createElement("a",{href:"/logout"},l.a.createElement(v.a,{variant:"outline",id:"sign-in-button"},"Sign Out"))):l.a.createElement(P.a.Text,null,l.a.createElement("a",{href:"/auth/google"},l.a.createElement(v.a,{variant:"outline",id:"sign-in-button"},"Sign In")))}},{key:"renderGreeting",value:function(){return window.user_name?l.a.createElement("h1",{className:"greeting"},"Welcome ",window.user_name,", what do you think about Irwin today?"):l.a.createElement("p",{className:"sign-in-prompt"},"You must sign in with an Lville account in order to be able to rate the food.")}},{key:"renderRating",value:function(e){return l.a.createElement("div",null,e.map(function(e){return l.a.createElement(f.a,{style:{marginLeft:30,marginRight:30,marginTop:30}},l.a.createElement(f.a.Header,{className:"menu-title"},l.a.createElement("h4",{style:{margin:15}},Y[e].title)),l.a.createElement(E.a,{variant:"flush"},Y[e].items.map(function(e){return window.user_name?l.a.createElement(x,{item:e}):l.a.createElement(A,{item:e})})))}))}},{key:"readyToSend",value:function(){this.setState({ready_to_send:!0})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"App"},l.a.createElement(K.a,null,l.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",integrity:"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T",crossorigin:"anonymous"}),l.a.createElement(P.a,{bg:"light",expand:"lg",color:"red"},l.a.createElement(P.a.Brand,{href:"#home"},l.a.createElement("span",{style:{"font-size":30}},"LIFE")),l.a.createElement(P.a.Toggle,{"aria-controls":"basic-navbar-nav"}),l.a.createElement(P.a.Collapse,{id:"basic-navbar-nav"},l.a.createElement(W.a,{className:"mr-auto"},l.a.createElement(W.a.Link,{href:"#home"},"Home"),l.a.createElement(W.a.Link,{href:"#mission"},"Mission"),l.a.createElement(D.a,{title:"Statistics",id:"basic-nav-dropdown"},l.a.createElement(D.a.Item,{href:"#action/3.1"},"Work"),l.a.createElement(D.a.Item,{href:"#action/3.2"},"In"),l.a.createElement(D.a.Item,{href:"#action/3.3"},"Progress"),l.a.createElement(D.a.Divider,null),l.a.createElement(D.a.Item,{href:"#action/3.4"},"Check later")),window.admin?l.a.createElement(W.a.Link,{href:"#admin"},"Admin Page"):l.a.createElement("div",null)),this.renderSignInButton())),l.a.createElement(F.b,{exact:!0,path:"/",render:function(){return l.a.createElement(F.a,{to:"/home"})}}),l.a.createElement(F.b,{path:"/mission",component:g}),l.a.createElement(F.b,{path:"/admin",component:U}),l.a.createElement(F.b,{path:"/home",render:function(){return l.a.createElement("div",null,e.renderGreeting(),e.renderRating(Q))}})))}}]),t}(n.Component);r.a.render(l.a.createElement(G,null),document.getElementById("root"))},49:function(e,t,a){},81:function(e,t,a){e.exports=a(130)}},[[81,1,2]]]);
//# sourceMappingURL=main.225058b3.chunk.js.map