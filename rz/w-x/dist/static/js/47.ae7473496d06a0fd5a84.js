webpackJsonp([47],{150:function(module,exports,__webpack_require__){eval('\n/* styles */\n__webpack_require__(461)\n\nvar Component = __webpack_require__(16)(\n  /* script */\n  __webpack_require__(577),\n  /* template */\n  __webpack_require__(540),\n  /* scopeId */\n  "data-v-8a0bb134",\n  /* cssModules */\n  null\n)\n\nmodule.exports = Component.exports\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/container/my/CustomerService.vue\n// module id = 150\n// module chunks = 47\n\n//# sourceURL=webpack:///./src/container/my/CustomerService.vue?')},210:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* harmony export (immutable) */ __webpack_exports__["a"] = getParam;\n\n\nfunction getParam(url, name) {\n    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");\n    var r = (url.split("?")[1] || \' \').match(reg);\n    if (r != null) return unescape(r[2]);return null;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/lib/getParam.js\n// module id = 210\n// module chunks = 0 7 8 22 29 45 46 47 48 49 50 51 52 53\n\n//# sourceURL=webpack:///./src/lib/getParam.js?')},383:function(module,exports,__webpack_require__){eval('exports = module.exports = __webpack_require__(119)(true);\n// imports\n\n\n// module\nexports.push([module.i, ".title[data-v-8a0bb134]{background:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:.2rem 0;padding:.3rem}.title div[data-v-8a0bb134]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.title p[data-v-8a0bb134]{font-size:.28rem;color:#222}.title span[data-v-8a0bb134]{font-size:.24rem;color:#999}.title .customer[data-v-8a0bb134]{width:1.9rem;height:.62rem;font-size:.28rem;line-height:.62rem;color:#4992ec;-webkit-border-radius:.31rem;border-radius:.31rem;text-align:center;border:1px solid #4992ec;margin-top:.09rem}.content[data-v-8a0bb134]{background:#fff;text-align:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.content li[data-v-8a0bb134]{width:33%;padding-bottom:.25rem}.list[data-v-8a0bb134]{background:#fff;margin:.2rem 0;padding-left:.3rem}.list div[data-v-8a0bb134]{font-size:.28rem;line-height:1rem;color:#555;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.list div[data-v-8a0bb134]:not(:last-child){border-bottom:1px solid #e5e5e5}.footer[data-v-8a0bb134]{color:#999;text-align:center;padding:.3rem 0}.kf_cz[data-v-8a0bb134]{background:url(\\"/static/img/kf_cz.png\\") no-repeat;background-size:100%;width:.64rem;height:.64rem;margin:.25rem auto 0}.kf_hb[data-v-8a0bb134]{background:url(\\"/static/img/kf_hb.png\\") no-repeat;background-size:100%;width:.64rem;height:.64rem;margin:.25rem auto 0}.kf_tx[data-v-8a0bb134]{background:url(\\"/static/img/kf_tx.png\\") no-repeat;background-size:100%;width:.64rem;height:.64rem;margin:.25rem auto 0}.kf_xs[data-v-8a0bb134]{background:url(\\"/static/img/kf_xs.png\\") no-repeat;background-size:100%;width:.64rem;height:.64rem;margin:.25rem auto 0}.kf_card[data-v-8a0bb134]{background:url(\\"/static/img/kf_card.png\\") no-repeat;background-size:100%;width:.64rem;height:.64rem;margin:.25rem auto 0}.kf_login[data-v-8a0bb134]{background:url(\\"/static/img/kf_login.png\\") no-repeat;background-size:100%;width:.64rem;height:.64rem;margin:.25rem auto 0}.arrow[data-v-8a0bb134]{background:url(\\"/static/img/arrow.png\\") no-repeat;background-size:100%;width:.3rem;height:.3rem;margin:.35rem .25rem}", "", {"version":3,"sources":["E:/projects/wx.51rz.com/src/container/my/CustomerService.vue"],"names":[],"mappings":"AACA,wBACE,gBAAiB,AACjB,oBAAqB,AACrB,qBAAsB,AACtB,oBAAqB,AACrB,aAAc,AACd,eAAiB,AACjB,aAAgB,CACjB,AACD,4BACI,mBAAoB,AACpB,eAAgB,AACZ,WAAY,AACR,MAAQ,CACnB,AACD,0BACI,iBAAmB,AACnB,UAAY,CACf,AACD,6BACI,iBAAmB,AACnB,UAAY,CACf,AACD,kCACI,aAAc,AACd,cAAgB,AAChB,iBAAmB,AACnB,mBAAqB,AACrB,cAAe,AACf,6BAA+B,AACvB,qBAAuB,AAC/B,kBAAmB,AACnB,yBAA0B,AAC1B,iBAAoB,CACvB,AACD,0BACE,gBAAiB,AACjB,kBAAmB,AACnB,oBAAqB,AACrB,qBAAsB,AACtB,oBAAqB,AACrB,aAAc,AACd,uBAAwB,AACpB,mBAAoB,AAChB,cAAgB,CACzB,AACD,6BACI,UAAW,AACX,qBAAwB,CAC3B,AACD,uBACE,gBAAiB,AACjB,eAAiB,AACjB,kBAAqB,CACtB,AACD,2BACI,iBAAmB,AACnB,iBAAkB,AAClB,WAAY,AACZ,oBAAqB,AACrB,qBAAsB,AACtB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AAC1B,sCAAuC,AACnC,sBAAuB,AACnB,6BAA+B,CAC1C,AACD,4CACM,+BAAiC,CACtC,AACD,yBACE,WAAY,AACZ,kBAAmB,AACnB,eAAkB,CACnB,AACD,wBACE,kDAAmD,AACnD,qBAAsB,AACtB,aAAe,AACf,cAAgB,AAChB,oBAAuB,CACxB,AACD,wBACE,kDAAmD,AACnD,qBAAsB,AACtB,aAAe,AACf,cAAgB,AAChB,oBAAuB,CACxB,AACD,wBACE,kDAAmD,AACnD,qBAAsB,AACtB,aAAe,AACf,cAAgB,AAChB,oBAAuB,CACxB,AACD,wBACE,kDAAmD,AACnD,qBAAsB,AACtB,aAAe,AACf,cAAgB,AAChB,oBAAuB,CACxB,AACD,0BACE,oDAAqD,AACrD,qBAAsB,AACtB,aAAe,AACf,cAAgB,AAChB,oBAAuB,CACxB,AACD,2BACE,qDAAsD,AACtD,qBAAsB,AACtB,aAAe,AACf,cAAgB,AAChB,oBAAuB,CACxB,AACD,wBACE,kDAAmD,AACnD,qBAAsB,AACtB,YAAc,AACd,aAAe,AACf,oBAAwB,CACzB","file":"CustomerService.vue","sourcesContent":["\\n.title[data-v-8a0bb134] {\\n  background: #fff;\\n  display: -webkit-box;\\n  display: -webkit-flex;\\n  display: -ms-flexbox;\\n  display: flex;\\n  margin: 0.2rem 0;\\n  padding: 0.3rem;\\n}\\n.title div[data-v-8a0bb134] {\\n    -webkit-box-flex: 1;\\n    -webkit-flex: 1;\\n        -ms-flex: 1;\\n            flex: 1;\\n}\\n.title p[data-v-8a0bb134] {\\n    font-size: 0.28rem;\\n    color: #222;\\n}\\n.title span[data-v-8a0bb134] {\\n    font-size: 0.24rem;\\n    color: #999;\\n}\\n.title .customer[data-v-8a0bb134] {\\n    width: 1.9rem;\\n    height: 0.62rem;\\n    font-size: 0.28rem;\\n    line-height: 0.62rem;\\n    color: #4992ec;\\n    -webkit-border-radius: 0.31rem;\\n            border-radius: 0.31rem;\\n    text-align: center;\\n    border: 1px solid #4992ec;\\n    margin-top: 0.09rem;\\n}\\n.content[data-v-8a0bb134] {\\n  background: #fff;\\n  text-align: center;\\n  display: -webkit-box;\\n  display: -webkit-flex;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-flex-wrap: wrap;\\n      -ms-flex-wrap: wrap;\\n          flex-wrap: wrap;\\n}\\n.content li[data-v-8a0bb134] {\\n    width: 33%;\\n    padding-bottom: 0.25rem;\\n}\\n.list[data-v-8a0bb134] {\\n  background: #fff;\\n  margin: 0.2rem 0;\\n  padding-left: 0.3rem;\\n}\\n.list div[data-v-8a0bb134] {\\n    font-size: 0.28rem;\\n    line-height: 1rem;\\n    color: #555;\\n    display: -webkit-box;\\n    display: -webkit-flex;\\n    display: -ms-flexbox;\\n    display: flex;\\n    -webkit-box-pack: justify;\\n    -webkit-justify-content: space-between;\\n        -ms-flex-pack: justify;\\n            justify-content: space-between;\\n}\\n.list div[data-v-8a0bb134]:not(:last-child) {\\n      border-bottom: 1px solid #e5e5e5;\\n}\\n.footer[data-v-8a0bb134] {\\n  color: #999;\\n  text-align: center;\\n  padding: 0.3rem 0;\\n}\\n.kf_cz[data-v-8a0bb134] {\\n  background: url(\\"/static/img/kf_cz.png\\") no-repeat;\\n  background-size: 100%;\\n  width: 0.64rem;\\n  height: 0.64rem;\\n  margin: 0.25rem auto 0;\\n}\\n.kf_hb[data-v-8a0bb134] {\\n  background: url(\\"/static/img/kf_hb.png\\") no-repeat;\\n  background-size: 100%;\\n  width: 0.64rem;\\n  height: 0.64rem;\\n  margin: 0.25rem auto 0;\\n}\\n.kf_tx[data-v-8a0bb134] {\\n  background: url(\\"/static/img/kf_tx.png\\") no-repeat;\\n  background-size: 100%;\\n  width: 0.64rem;\\n  height: 0.64rem;\\n  margin: 0.25rem auto 0;\\n}\\n.kf_xs[data-v-8a0bb134] {\\n  background: url(\\"/static/img/kf_xs.png\\") no-repeat;\\n  background-size: 100%;\\n  width: 0.64rem;\\n  height: 0.64rem;\\n  margin: 0.25rem auto 0;\\n}\\n.kf_card[data-v-8a0bb134] {\\n  background: url(\\"/static/img/kf_card.png\\") no-repeat;\\n  background-size: 100%;\\n  width: 0.64rem;\\n  height: 0.64rem;\\n  margin: 0.25rem auto 0;\\n}\\n.kf_login[data-v-8a0bb134] {\\n  background: url(\\"/static/img/kf_login.png\\") no-repeat;\\n  background-size: 100%;\\n  width: 0.64rem;\\n  height: 0.64rem;\\n  margin: 0.25rem auto 0;\\n}\\n.arrow[data-v-8a0bb134] {\\n  background: url(\\"/static/img/arrow.png\\") no-repeat;\\n  background-size: 100%;\\n  width: 0.3rem;\\n  height: 0.3rem;\\n  margin: 0.35rem 0.25rem;\\n}\\n"],"sourceRoot":""}]);\n\n// exports\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/.npminstall/css-loader/0.28.7/css-loader?{"minimize":true,"sourceMap":true}!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/style-compiler?{"id":"data-v-8a0bb134","scoped":true,"hasInlineConfig":false}!./~/.npminstall/sass-loader/6.0.6/sass-loader/lib/loader.js?{"includePaths":["./src/css/"],"data":"@import /"base/";","sourceMap":true}!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=styles&index=0!./src/container/my/CustomerService.vue\n// module id = 383\n// module chunks = 47\n\n//# sourceURL=webpack:///./src/container/my/CustomerService.vue?./~/.npminstall/css-loader/0.28.7/css-loader?%7B%22minimize%22:true,%22sourceMap%22:true%7D!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/style-compiler?%7B%22id%22:%22data-v-8a0bb134%22,%22scoped%22:true,%22hasInlineConfig%22:false%7D!./~/.npminstall/sass-loader/6.0.6/sass-loader/lib/loader.js?%7B%22includePaths%22:%5B%22./src/css/%22%5D,%22data%22:%22@import_/%22base/%22;%22,%22sourceMap%22:true%7D!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=styles&index=0')},461:function(module,exports,__webpack_require__){eval('// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(383);\nif(typeof content === \'string\') content = [[module.i, content, \'\']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar update = __webpack_require__(120)("d8f1a9d0", content, true);\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/.npminstall/extract-text-webpack-plugin/2.1.2/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/.npminstall/vue-style-loader/2.0.5/vue-style-loader!./~/.npminstall/css-loader/0.28.7/css-loader?{"minimize":true,"sourceMap":true}!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/style-compiler?{"id":"data-v-8a0bb134","scoped":true,"hasInlineConfig":false}!./~/.npminstall/sass-loader/6.0.6/sass-loader/lib/loader.js?{"includePaths":["./src/css/"],"data":"@import /"base/";","sourceMap":true}!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=styles&index=0!./src/container/my/CustomerService.vue\n// module id = 461\n// module chunks = 47\n\n//# sourceURL=webpack:///./src/container/my/CustomerService.vue?./~/.npminstall/extract-text-webpack-plugin/2.1.2/extract-text-webpack-plugin/loader.js?%7B%22omit%22:1,%22remove%22:true%7D!./~/.npminstall/vue-style-loader/2.0.5/vue-style-loader!./~/.npminstall/css-loader/0.28.7/css-loader?%7B%22minimize%22:true,%22sourceMap%22:true%7D!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/style-compiler?%7B%22id%22:%22data-v-8a0bb134%22,%22scoped%22:true,%22hasInlineConfig%22:false%7D!./~/.npminstall/sass-loader/6.0.6/sass-loader/lib/loader.js?%7B%22includePaths%22:%5B%22./src/css/%22%5D,%22data%22:%22@import_/%22base/%22;%22,%22sourceMap%22:true%7D!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=styles&index=0')},540:function(module,exports){eval('module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;\n  return _c(\'div\', [_c(\'div\', {\n    staticClass: "title"\n  }, [_vm._m(0, false, false), _vm._v(" "), (_vm.showBtn) ? _c(\'a\', {\n    staticClass: "customer",\n    attrs: {\n      "href": "/app/customer"\n    }\n  }, [_vm._v("在线客服")]) : _vm._e()]), _vm._v(" "), _c(\'ul\', {\n    staticClass: "content"\n  }, _vm._l((_vm.nav), function(item, i) {\n    return _c(\'li\', {\n      key: i,\n      on: {\n        "click": function($event) {\n          _vm.changeNav(i)\n        }\n      }\n    }, [_c(\'div\', {\n      class: item.className\n    }), _vm._v(" "), _c(\'div\', {\n      domProps: {\n        "textContent": _vm._s(item.name)\n      }\n    })])\n  })), _vm._v(" "), _c(\'div\', {\n    staticClass: "list"\n  }, _vm._l((_vm.list[_vm.index]), function(item, i) {\n    return _c(\'router-link\', {\n      key: i,\n      attrs: {\n        "tag": "div",\n        "to": ("customerDetail/" + _vm.index + "/" + i)\n      }\n    }, [_c(\'span\', {\n      domProps: {\n        "textContent": _vm._s(item)\n      }\n    }), _vm._v(" "), _c(\'div\', {\n      staticClass: "arrow"\n    })])\n  })), _vm._v(" "), _vm._m(1, false, false)])\n},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;\n  return _c(\'div\', [_c(\'p\', [_vm._v("早上好，竭诚为您服务！")]), _vm._v(" "), _c(\'span\', [_vm._v("工作日(9:00-22:00)节假日(9:00-17:30)")])])\n},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;\n  return _c(\'p\', {\n    staticClass: "footer"\n  }, [_vm._v("如有疑问可咨询："), _c(\'span\', {\n    staticClass: "black5"\n  }, [_vm._v("400-655-8858")])])\n}]}\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/template-compiler?{"id":"data-v-8a0bb134"}!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=template&index=0!./src/container/my/CustomerService.vue\n// module id = 540\n// module chunks = 47\n\n//# sourceURL=webpack:///./src/container/my/CustomerService.vue?./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/template-compiler?%7B%22id%22:%22data-v-8a0bb134%22%7D!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=template&index=0')},577:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_getParam__ = __webpack_require__(210);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    components: {},\n    name: 'customerService',\n    data: function data() {\n        return {\n            index: sessionStorage.getItem('customer') || 0,\n            showBtn: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_getParam__[\"a\" /* default */])(window.location.href, 'app'),\n            nav: [{\n                className: 'kf_xs',\n                name: '新手必读'\n            }, {\n                className: 'kf_login',\n                name: '注册与登录'\n            }, {\n                className: 'kf_card',\n                name: '认证与绑卡'\n            }, {\n                className: 'kf_cz',\n                name: '充值与投资'\n            }, {\n                className: 'kf_tx',\n                name: '提现与转让'\n            }, {\n                className: 'kf_hb',\n                name: '红包加息券'\n            }],\n            list: [['金服是做什么的网站？', '我在金服上投资安全吗？', '金服网站靠什么盈利？', '用户在平台签订的电子合同受法律保护吗？', '金服自身的运营变动是否会影响用户的投资？'], ['如何注册金服？', '注册的时候收不到短信怎么办？', '设置登录密码有什么要求？', '邀请码是什么？有什么用途？', '交易密码忘记了怎么办？如何设置和修改交易密码？', '为什么要设置交易密码?', '登录密码忘记了如何找回？', '注册手机号码可以更换吗？', '注册金服账户一定要用银行的预留手机号码吗？ '], ['注册完成后需要完成哪些认证？如何操作？', '实名认证不了怎么办？', '手机、身份证认证之后是否可以再次认证一个账号？ ', '如何修改实名认证信息？', '什么情况下需要绑定银行卡？', '开通存管账户时，是否需要办一张北京银行卡？', '可以绑定哪些银行卡？', '如何绑定银行卡，需注意什么？', '无法绑定银行卡怎么办？', '如何设置及更改绑定的银行卡？', '我可以绑定几张银行卡？'], ['如何充值？', '快捷银行卡无法充值怎么办？', '充值有费用么？是否有充值上限？', '充值时为什么提示限额？', '网上银行该如何开通办理？', '可以用信用卡进行充值吗？', '当日充值的资金是否可以提现？', '为什么会充值失败？', '我可不可以投新手标？', '金服什么时候发标？如果没有标的了怎么办？', '投资成功后，合同哪里下载？', '理财产品节假日是否产生收益？', '什么时候开始计息？有哪些还本付息方式？', '利息是如何计算的？', '为什么会投资失败？', '如何投资金服的理财产品？', 'R计划是什么产品？', 'R计划与其他产品有什么区别？', 'R计划收益是如何计算的？', '怎样邀请好友投资？', '我是否可以取消某笔投资？', '如果我投资的钱需要急用怎么办？', '到期后如何收回投资本金和利息？收到还款后能马上再投资吗？', '资产总额如何计算？', '累计利息如何计算？', '资金冻结是什么情况导致的？'], ['债权转让的规则是怎么样的？', '我持有的单笔可转让资产，可以申请部分债权转让吗？', '我申请了债权转让，什么时候能够收到资金？', '债权转让需要手续费吗？', '为何转让债权可以自己定价？', '被转让的债权如何计息？', 'R计划可以进行债权转让吗？', '什么是债权转让标的转让密码？', '承接债权转让有何限制？', '提现是否有限额？', '如何提现？', '为什么提现申请会失败？', '回款什么时候回？', '提现什么时候可以到账？', '提现手续费怎么收取？', '平台收取充值费用和利息管理费吗？', '余额里钱已经没了，银行还没到账？', '银行卡无法提现怎么办？', '绑定银行卡（非快捷充值银行卡）可以修改么？', '提现后能否取消？'], ['R计划是什么', 'R计划与其他产品有什么区别？', 'R计划收益是如何计算的？', 'R计划可以进行债权转让吗？', 'R计划是否可以使用红包或加息券？'], ['什么是红包加息券？', '如何获得红包或加息券？', '红包或加息券使用规则', '红包或加息券是否能叠加使用？', '当发生债权转让时，加息券能否一起转让？', '特别说明']]\n        };\n    },\n\n    methods: {\n        changeNav: function changeNav(index) {\n            this.index = index;\n            sessionStorage.setItem('customer', index);\n        }\n    }\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/babel-loader/lib!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=script&index=0!./src/container/my/CustomerService.vue\n// module id = 577\n// module chunks = 47\n\n//# sourceURL=webpack:///./src/container/my/CustomerService.vue?./~/babel-loader/lib!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=script&index=0")}});
