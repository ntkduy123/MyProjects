(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{654:function(t,e,a){"use strict";a.r(e);var n=a(32),r=a(73),o=a(26),i=a(27),s=a(30),c=a(28),l=a(31),u=a(0),d=a.n(u),p=a(379),m=a(660),y=a(658),f=a(60),b=[{title:"ID",dataIndex:"id",key:"id"},{title:"Title",dataIndex:"title",key:"title"},{title:"Author",dataIndex:"author",key:"author"},{title:"Category",dataIndex:"postCategory",key:"category",render:function(t){return d.a.createElement("span",null,t.name)}},{title:"Status",dataIndex:"postStatus",key:"status",render:function(t){return d.a.createElement("span",null,t.name)}},{title:"Action",key:"action",dataIndex:"id",render:function(t){return d.a.createElement(p.a,{to:"/admin/post-form/".concat(t)},"Edit")}}],g=function(t){function e(){var t,a;Object(o.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(r)))).componentDidMount=function(){(0,a.props.getPostList)()},a}return Object(l.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){var t=this.props.postList;return d.a.createElement(m.a,{title:"Post Table"},d.a.createElement(y.a,{className:"gx-table-responsive",columns:b,dataSource:t}),d.a.createElement(f.a,{type:"primary",style:{marginBottom:16}},d.a.createElement(p.a,{to:"/admin/post-form"},"Write new post")))}}]),e}(u.Component);e.default=Object(n.b)(function(t){var e=t.blog;return{postList:e.postList,loading:e.loading}},{getPostList:r.d})(g)}}]);
//# sourceMappingURL=10.dfbd88f0.chunk.js.map