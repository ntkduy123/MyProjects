(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{476:function(e,t,a){"use strict";a.r(t);var n=a(381),o=a(32),i=a(73),s=a(129),l=a(10),r=a(26),c=a(27),d=a(30),m=a(28),p=a(31),u=a(0),g=a.n(u),h=a(382),b=a(475),C=a(383),f=a(16),E=a(660),v=a(375),w=a(659),S=a(60),y=a(519),O=(a(464),function(e){var t=e.customOptions,a=e.onEditorStateChange,n=e.editorState;return g.a.createElement(E.a,{className:"gx-card"},g.a.createElement(y.Editor,{editorStyle:{width:"100%",minHeight:500,borderWidth:1,borderStyle:"solid",borderColor:"lightgray"},editorState:n,wrapperClassName:"demo-wrapper",onEditorStateChange:a,toolbarCustomButtons:[t],toolbar:{options:["inline"]}}))}),x=a(414),L=a(608),j=a.n(L),D=a(661),P=a(130),I=a(44),F=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).componentDidMount=function(){(0,a.props.getS3FileList)()},a.componentWillReceiveProps=function(e){var t=e.s3FileList;if(e){var n=t.map(function(e){return{uid:e.id,name:e.name,status:"done",url:e.url}});a.setState({fileList:n})}},a.handleChange=function(e){var t=e.fileList;a.setState({fileList:t})},a.handleRemove=function(e){(0,a.props.deleteS3File)({id:e.uid})},a.handleDownload=function(e){var t=a.props.addImage;e.response?t(e.response):t(e)},a.state={fileList:[]},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.state.fileList,t=g.a.createElement("div",null,g.a.createElement(f.a,{type:"plus"}),g.a.createElement("div",{className:"ant-upload-text"},"Upload"));return g.a.createElement(w.a,{action:"/api/aws/s3",listType:"picture-card",fileList:e,onChange:this.handleChange,onRemove:this.handleRemove,onPreview:this.handlePreview,headers:{Authorization:Object(I.a)()},showUploadList:{showPreviewIcon:!1},onDownload:this.handleDownload},t)}}]),t}(u.Component),U=Object(o.b)(function(e){return{s3FileList:e.aws.s3FileList}},{getS3FileList:P.c,deleteS3File:P.a})(F),k=function(e){var t=e.visible,a=e.onClose,n=(e.onCancel,e.addImage);return g.a.createElement("div",null,g.a.createElement(D.a,{title:"Upload Dialog",visible:t,onCancel:a,onOk:a},g.a.createElement(U,{addImage:n})))},N=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).toggleUploadDialog=function(){a.setState(function(e){return{showDialog:!e.showDialog}})},a.closeUploadDialog=function(){a.setState({showDialog:!1})},a.addImage=function(e){var t=a.props,n=t.editorState,o=t.onChange,i={src:e.url},s=n.getCurrentContent().createEntity("IMAGE","MUTABLE",i).getLastCreatedEntityKey();o(x.AtomicBlockUtils.insertAtomicBlock(n,s," ")),a.setState({showDialog:!1})},a.state={showDialog:!1},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.state.showDialog;return g.a.createElement("div",null,g.a.createElement("div",{className:"rdw-option-wrapper",onClick:this.toggleUploadDialog},g.a.createElement("img",{src:j.a,alt:""})),g.a.createElement(k,{addImage:this.addImage,visible:e,onClose:this.closeUploadDialog}))}}]),t}(u.Component),M=n.a.Item,R=h.a.TextArea,A=b.a.Option,T=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).componentDidMount=function(){var e=a.props,t=e.getPost,n=e.getPostCategoryList;t(e.match.params.id),n()},a.componentWillReceiveProps=function(e){var t=e.selectedPost,n=a.props,o=n.showMessage,i=n.hideMessage,s=n.history,l=n.match;if(t.content&&l.params.id){var r=t.content,c=JSON.parse(r);a.setState({featuredImage:t.image,content:x.EditorState.createWithContent(Object(x.convertFromRaw)(c))})}o&&(C.a.success(C.a.toString()),i(),s.push("/blog/post-table"))},a.handleSubmit=function(e){e.preventDefault();var t=a.state,n=t.content,o=t.featuredImage,i=a.props,s=i.form,r=i.saveOrUpdatePost;s.validateFields(function(e,t){e||r(Object(l.a)({},t,{postCategory:{id:t.postCategory},image:o,content:JSON.stringify(Object(x.convertToRaw)(n.getCurrentContent()))}))})},a.handleContentChange=function(e){a.setState({content:e})},a.uploadFeaturedImage=function(e){"uploading"!==e.file.status?"done"===e.file.status&&a.setState({featuredImage:e.file.response.url}):a.setState({uploadLoading:!0})},a.state={content:x.EditorState.createEmpty(),featuredImage:"",uploadLoading:!1},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,a=this.props,o=a.selectedPost,i=a.postCategoryList,s=a.loading,l=this.state,r=l.featuredImage,c=l.content,d=l.uploadLoading,m=g.a.createElement("div",null,g.a.createElement(f.a,{type:d?"loading":"plus"}),g.a.createElement("div",{className:"ant-upload-text"},"Upload"));return g.a.createElement(E.a,{className:"gx-card",title:"Post Form"},g.a.createElement(v.a,{spinning:s,size:"large"},g.a.createElement(n.a,{onSubmit:this.handleSubmit},o.id?g.a.createElement(M,{label:"ID",labelCol:{xs:24,sm:5},wrapperCol:{xs:24,sm:12}},t("id",{initialValue:o.id})(g.a.createElement(h.a,{disabled:!0}))):"",g.a.createElement(M,{label:"Title",labelCol:{xs:24,sm:5},wrapperCol:{xs:24,sm:16}},t("title",{initialValue:o.title,rules:[{required:!0,message:"Please input post title!"}]})(g.a.createElement(h.a,null))),g.a.createElement(M,{label:"Author",labelCol:{xs:24,sm:5},wrapperCol:{xs:24,sm:16}},t("author",{initialValue:o.author,rules:[{required:!0,message:"Please input post author!"}]})(g.a.createElement(h.a,null))),g.a.createElement(M,{label:"Featured Image",labelCol:{xs:24,sm:5},wrapperCol:{xs:12,sm:3}},g.a.createElement(w.a,{name:"file",listType:"picture-card",className:"avatar-uploader",showUploadList:!1,action:"/api/aws/s3",onChange:this.uploadFeaturedImage,headers:{Authorization:Object(I.a)()}},r?g.a.createElement("img",{src:r,alt:""}):m)),g.a.createElement(M,{label:"Category",labelCol:{xs:24,sm:5},wrapperCol:{xs:24,sm:16}},t("postCategory",{initialValue:o.postCategory?o.postCategory.id:1})(g.a.createElement(b.a,{className:"gx-mr-3 gx-mb-3"},i.map(function(e){return g.a.createElement(A,{key:e.id,value:e.id},e.name)})))),g.a.createElement(M,{label:"Description",labelCol:{xs:24,sm:5},wrapperCol:{xs:24,sm:16}},t("description",{initialValue:o.description,rules:[{required:!0,message:"Please input post description!"}]})(g.a.createElement(R,{autosize:{minRows:4,maxRows:8}}))),g.a.createElement(M,{label:"Description",labelCol:{xs:24,sm:5},wrapperCol:{xs:24,sm:16}},g.a.createElement(O,{customOptions:g.a.createElement(N,{onEditorStateChange:this.handleContentChange}),onEditorStateChange:this.handleContentChange,editorState:c})),g.a.createElement(M,{wrapperCol:{xs:24,sm:{span:12,offset:5}}},g.a.createElement(S.a,{type:"primary",htmlType:"submit"},"Save"),o.id?g.a.createElement(S.a,{type:"danger",onClick:function(){e.setState()}},"Delete"):""))))}}]),t}(u.Component),V=n.a.create()(T);t.default=Object(o.b)(function(e){var t=e.blog,a=e.common;return{loading:t.loading,selectedPost:t.selectedPost,postCategoryList:t.postCategoryList,showMessage:a.showMessage,message:a.message}},{getPost:i.a,getPostCategoryList:i.b,saveOrUpdatePost:i.g,hideMessage:s.a})(V)},608:function(e,t,a){e.exports=a.p+"static/media/toolbar-img.9a559fde.svg"}}]);
//# sourceMappingURL=3.5e45ce53.chunk.js.map