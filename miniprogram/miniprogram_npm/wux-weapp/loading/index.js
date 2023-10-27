"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames3=_interopRequireDefault(require("../helpers/classNames")),_index=require("../index"),_utils=require("./utils");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(r,!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}(0,_baseComponent.default)({useFunc:!0,data:_utils.defaults,computed:{classes:["prefixCls",function(e){return{wrap:(0,_classNames3.default)(e),content:(0,_classNames3.default)("".concat(e,"__content"),_defineProperty({},"".concat(e,"__content--has-icon"),!0)),icon:(0,_classNames3.default)("".concat(e,"__icon"),_defineProperty({},"".concat(e,"__icon--loading"),!0)),text:"".concat(e,"__text")}}]},methods:{hide:function(){this.$$setData({in:!1}),this.$wuxBackdrop&&this.$wuxBackdrop.release()},show:function(e){var t=0<arguments.length&&void 0!==e?e:{},r=this.$$mergeOptionsAndBindMethods(Object.assign({},_utils.defaults,t));this.$$setData(_objectSpread({in:!0},r)),this.$wuxBackdrop&&this.$wuxBackdrop.retain()}},created:function(){this.data.mask&&(this.$wuxBackdrop=(0,_index.$wuxBackdrop)("#wux-backdrop",this))}});