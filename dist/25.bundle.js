(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/pages/Permission/Permission.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Permission/Permission.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    data: function data() {\n        return {\n            defaultRole: \"\",\n            key: 1\n        };\n    },\n\n    computed: {\n        role: function role() {\n            return this.$store.state.sysUser.role;\n        },\n\n        currentRole: {\n            get: function get() {\n                return this.role;\n            },\n            set: function set(val) {\n                if (val == \"管理员\") {\n                    this.$store.commit(\"setRole\", \"管理员\");\n                } else {\n                    this.$store.commit(\"setRole\", this.defaultRole);\n                }\n                this.key++; //重新渲染DOM\n            }\n        }\n    },\n    created: function created() {\n        this.defaultRole = this.role;\n    },\n\n    methods: {\n        handleChange: function handleChange(val) {}\n    }\n});\n\n//# sourceURL=webpack:///./src/pages/Permission/Permission.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/Permission/Permission.vue?vue&type=template&id=4d9b96bb&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Permission/Permission.vue?vue&type=template&id=4d9b96bb& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _c(\"p\", [\n        _vm._v(\n          \"指令权限通过自定义指令来进行DOM级的控制，DOM不渲染，那么需要通过该DOM元素进行的一系列操作当然也就无法进行。\"\n        )\n      ]),\n      _vm._v(\" \"),\n      _c(\"br\"),\n      _vm._v(\" \"),\n      _c(\"div\", [_vm._v(\"当前角色为：\" + _vm._s(_vm.role))]),\n      _vm._v(\" \"),\n      _c(\"br\"),\n      _vm._v(\" \"),\n      _c(\"span\", [_vm._v(\"点击切换角色：\")]),\n      _vm._v(\" \"),\n      _c(\n        \"el-radio-group\",\n        {\n          on: { change: _vm.handleChange },\n          model: {\n            value: _vm.currentRole,\n            callback: function($$v) {\n              _vm.currentRole = $$v\n            },\n            expression: \"currentRole\"\n          }\n        },\n        [\n          _c(\"el-radio-button\", { attrs: { label: \"管理员\" } }),\n          _vm._v(\" \"),\n          _c(\"el-radio-button\", { attrs: { label: _vm.defaultRole } })\n        ],\n        1\n      ),\n      _vm._v(\" \"),\n      _c(\"div\", { key: _vm.key }, [\n        _c(\"br\"),\n        _vm._v(\" \"),\n        _c(\n          \"p\",\n          {\n            directives: [\n              {\n                name: \"permission\",\n                rawName: \"v-permission\",\n                value: [\"管理员\"],\n                expression: \"['管理员']\"\n              }\n            ]\n          },\n          [\n            _vm._v(\n              \"\\n            只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到。\\n        \"\n            )\n          ]\n        )\n      ])\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/pages/Permission/Permission.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/pages/Permission/Permission.vue":
/*!*********************************************!*\
  !*** ./src/pages/Permission/Permission.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Permission_vue_vue_type_template_id_4d9b96bb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Permission.vue?vue&type=template&id=4d9b96bb& */ \"./src/pages/Permission/Permission.vue?vue&type=template&id=4d9b96bb&\");\n/* harmony import */ var _Permission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Permission.vue?vue&type=script&lang=js& */ \"./src/pages/Permission/Permission.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Permission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Permission_vue_vue_type_template_id_4d9b96bb___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Permission_vue_vue_type_template_id_4d9b96bb___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src\\\\pages\\\\Permission\\\\Permission.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/pages/Permission/Permission.vue?");

/***/ }),

/***/ "./src/pages/Permission/Permission.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./src/pages/Permission/Permission.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Permission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib??vue-loader-options!./Permission.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/pages/Permission/Permission.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Permission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/pages/Permission/Permission.vue?");

/***/ }),

/***/ "./src/pages/Permission/Permission.vue?vue&type=template&id=4d9b96bb&":
/*!****************************************************************************!*\
  !*** ./src/pages/Permission/Permission.vue?vue&type=template&id=4d9b96bb& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Permission_vue_vue_type_template_id_4d9b96bb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Permission.vue?vue&type=template&id=4d9b96bb& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/pages/Permission/Permission.vue?vue&type=template&id=4d9b96bb&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Permission_vue_vue_type_template_id_4d9b96bb___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Permission_vue_vue_type_template_id_4d9b96bb___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/pages/Permission/Permission.vue?");

/***/ })

}]);