(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{597:function(e,r,a){},699:function(e,r,a){"use strict";var t=a(597);a.n(t).a},781:function(e,r,a){"use strict";a.r(r);var t=a(104),s={name:"Mine",data:function(){return{userInfo:{name:"",role:"",gender:"",avatar:"",mobilePhone:"",email:""},rules:{name:[{required:!0,message:"请填写姓名",trigger:"blur"},{max:6,message:"姓名长度不能超过6个字",trigger:"blur"}],gender:[{required:!0,message:"请选择性别",trigger:"change"}],mobilePhone:[{required:!0,message:"请填写手机号",trigger:"blur"},{pattern:/^1[345789]\d{9}$/,message:"手机号码格式不正确",trigger:"blur"}],email:[{required:!0,message:"请填写邮箱",trigger:"blur"},{type:"email",message:"邮箱格式不正确",trigger:"blur"}]},submitLoading:!1}},created:function(){this.getUserInfo()},methods:{getUserInfo:function(){var e=this;Object(t.a)({userId:sessionStorage.getItem("userId")}).then(function(r){e.userInfo=r.data.userInfo})},beforeAvatarUpload:function(e){var r="image/jpeg"===e.type,a="image/png"===e.type,t=e.size/1024/1024<2;return r||a||this.$message.error("上传头像图片只能是jpg或png格式!"),t||this.$message.error("上传头像图片大小不能超过 2MB!"),(r||a)&&t},handleAvatarSuccess:function(e,r){this.userInfo.avatar=URL.createObjectURL(r.raw)},submit:function(){var e=this;this.submitLoading=!0,this.$refs.userInfo.validate(function(r){r&&e.$message.success("更新成功"),e.submitLoading=!1})}}},o=(a(699),a(79)),n=Object(o.a)(s,function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"mine"},[a("el-form",{ref:"userInfo",attrs:{model:e.userInfo,rules:e.rules,"label-width":"70px","label-position":"left"}},[a("el-form-item",{attrs:{label:"姓名：",prop:"name"}},[a("el-input",{model:{value:e.userInfo.name,callback:function(r){e.$set(e.userInfo,"name",r)},expression:"userInfo.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色："}},[a("el-input",{attrs:{disabled:""},model:{value:e.userInfo.role,callback:function(r){e.$set(e.userInfo,"role",r)},expression:"userInfo.role"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别：",prop:"gender"}},[a("el-radio-group",{model:{value:e.userInfo.gender,callback:function(r){e.$set(e.userInfo,"gender",r)},expression:"userInfo.gender"}},[a("el-radio",{attrs:{label:"男"}}),e._v(" "),a("el-radio",{attrs:{label:"女"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"头像："}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://jsonplaceholder.typicode.com/posts/","show-file-list":!1,"before-upload":e.beforeAvatarUpload,"on-success":e.handleAvatarSuccess}},[e.userInfo.avatar?a("img",{staticClass:"avatar",attrs:{src:e.userInfo.avatar}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"}),e._v(" "),a("p",[e._v("点击上传")])])],1),e._v(" "),a("el-form-item",{attrs:{label:"手机：",prop:"mobilePhone"}},[a("el-input",{model:{value:e.userInfo.mobilePhone,callback:function(r){e.$set(e.userInfo,"mobilePhone",r)},expression:"userInfo.mobilePhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱：",prop:"email"}},[a("el-input",{model:{value:e.userInfo.email,callback:function(r){e.$set(e.userInfo,"email",r)},expression:"userInfo.email"}})],1)],1),e._v(" "),a("el-button",{attrs:{type:"primary",round:"",loading:e.submitLoading},on:{click:e.submit}},[e._v("提交更新")])],1)},[],!1,null,"a7d042ce",null);n.options.__file="Mine.vue";r.default=n.exports}}]);