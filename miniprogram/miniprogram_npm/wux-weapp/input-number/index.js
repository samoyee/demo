"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames5=_interopRequireDefault(require("../helpers/classNames")),_eventsMixin=_interopRequireDefault(require("../helpers/eventsMixin")),_utils=_interopRequireDefault(require("./utils"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var MAX_SAFE_INTEGER=Number.MAX_SAFE_INTEGER||Math.pow(2,53)-1,toNumberWhenUserInput=function(e){return/\.\d*0$/.test(e)||16<e.length?e:isNaN(e)?e:Number(e)},getValidValue=function(e,t,a){var i=parseFloat(e);return isNaN(i)?e:(i<t&&(i=t),a<i&&(i=a),i)},defaultEvents={onChange:function(){},onFocus:function(){},onBlur:function(){}};(0,_baseComponent.default)({behaviors:[(0,_eventsMixin.default)({defaultEvents:defaultEvents})],externalClasses:["wux-sub-class","wux-input-class","wux-add-class"],relations:{"../field/index":{type:"ancestor"}},properties:{prefixCls:{type:String,value:"wux-input-number"},shape:{type:String,value:"square"},min:{type:Number,value:-MAX_SAFE_INTEGER},max:{type:Number,value:MAX_SAFE_INTEGER},step:{type:Number,value:1},defaultValue:{type:Number,value:0},value:{type:Number,value:0},disabled:{type:Boolean,value:!0},readOnly:{type:Boolean,value:!1},longpress:{type:Boolean,value:!1},color:{type:String,value:"balanced"},controlled:{type:Boolean,value:!1},digits:{type:Number,value:-1}},data:{inputValue:0,disabledMin:!1,disabledMax:!1},computed:{classes:["prefixCls, shape, color, disabled, readOnly, disabledMin, disabledMax",function(e,t,a,i,n,u,s){var l,r,o;return{wrap:(0,_classNames5.default)(e,_defineProperty({},"".concat(e,"--").concat(t),t)),sub:(0,_classNames5.default)("".concat(e,"__selector"),(_defineProperty(l={},"".concat(e,"__selector--sub"),!0),_defineProperty(l,"".concat(e,"__selector--").concat(a),a),_defineProperty(l,"".concat(e,"__selector--disabled"),u),l)),add:(0,_classNames5.default)("".concat(e,"__selector"),(_defineProperty(r={},"".concat(e,"__selector--add"),!0),_defineProperty(r,"".concat(e,"__selector--").concat(a),a),_defineProperty(r,"".concat(e,"__selector--disabled"),s),r)),icon:"".concat(e,"__icon"),input:(0,_classNames5.default)("".concat(e,"__input"),(_defineProperty(o={},"".concat(e,"__input--disabled"),i),_defineProperty(o,"".concat(e,"__input--readonly"),n),o))}}]},observers:{value:function(e){this.data.controlled&&this.setValue(e,!1)},"inputValue, min, max":function(e,t,a){var i=e<=t,n=a<=e;this.setData({disabledMin:i,disabledMax:n})}},methods:{updated:function(e){this.hasFieldDecorator||this.data.inputValue!==e&&this.setData({inputValue:e})},setValue:function(e,t){var a=!(1<arguments.length&&void 0!==t)||t,i=this.data,n=i.min,u=i.max,s=i.digits,l=_utils.default.strip(getValidValue(e,n,u));-1!==s&&(l=_utils.default.round(l,s)),this.updated(l),a&&this.triggerEvent("change",{value:l})},calculation:function(e,t){var a=this,i=this.data,n=i.disabledMax,u=i.disabledMin,s=i.inputValue,l=i.step,r=i.longpress;i.controlled;if("add"===e){if(n)return;this.setValue(_utils.default.plus(s,l))}if("sub"===e){if(u)return;this.setValue(_utils.default.minus(s,l))}r&&t&&(this.timeout=setTimeout(function(){return a.calculation(e,t)},100))},onInput:function(t){var a=this;this.clearInputTimer(),this.inputTime=setTimeout(function(){var e=toNumberWhenUserInput(t.detail.value);a.setValue(e)},300)},onFocus:function(e){this.triggerEvent("focus",e.detail)},onBlur:function(e){this.setData({inputValue:this.data.inputValue}),this.triggerEvent("blur",e.detail)},onLongpress:function(e){var t=e.currentTarget.dataset.type;this.data.longpress&&this.calculation(t,!0)},onTap:function(e){var t=e.currentTarget.dataset.type,a=this.data.longpress;a&&(!a||this.timeout)||this.calculation(t,!1)},onTouchEnd:function(){this.clearTimer()},onTouchCancel:function(){this.clearTimer()},clearTimer:function(){this.timeout&&(clearTimeout(this.timeout),this.timeout=null)},clearInputTimer:function(){this.inputTime&&(clearTimeout(this.inputTime),this.inputTime=null)}},attached:function(){var e=this.data,t=e.defaultValue,a=e.value,i=e.controlled?a:t;this.setValue(i,!1)},detached:function(){this.clearTimer(),this.clearInputTimer()}});