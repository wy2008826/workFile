webpackJsonp([50],{177:function(module,exports,__webpack_require__){eval('\n/* styles */\n__webpack_require__(429)\n\nvar Component = __webpack_require__(16)(\n  /* script */\n  __webpack_require__(604),\n  /* template */\n  __webpack_require__(508),\n  /* scopeId */\n  "data-v-51d19eff",\n  /* cssModules */\n  null\n)\n\nmodule.exports = Component.exports\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/container/my/info/Risk.vue\n// module id = 177\n// module chunks = 50\n\n//# sourceURL=webpack:///./src/container/my/info/Risk.vue?')},210:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* harmony export (immutable) */ __webpack_exports__["a"] = getParam;\n\n\nfunction getParam(url, name) {\n    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");\n    var r = (url.split("?")[1] || \' \').match(reg);\n    if (r != null) return unescape(r[2]);return null;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/lib/getParam.js\n// module id = 210\n// module chunks = 0 7 8 22 29 45 46 47 48 49 50 51 52 53\n\n//# sourceURL=webpack:///./src/lib/getParam.js?')},351:function(module,exports,__webpack_require__){eval('exports = module.exports = __webpack_require__(119)(true);\n// imports\n\n\n// module\nexports.push([module.i, ".banner[data-v-51d19eff]{width:7.5rem;height:2rem;font-size:.48rem;text-align:center;line-height:2rem;color:#fff;background:url(https://images.51rz.com/images/app/risk_asseessment/banner.png) 50% no-repeat}.text[data-v-51d19eff]{min-height:1.68rem;margin:.6rem .7rem;color:#555;font-size:.3rem}.result[data-v-51d19eff]{text-align:center}.result p[data-v-51d19eff]{margin-top:-.48rem;font-size:.3rem;color:#999;line-height:42px}.result h4[data-v-51d19eff]{color:#f64c3e;font-size:.64rem;font-weight:500;margin-bottom:60px}.btn[data-v-51d19eff]{margin:0 1.25rem;width:5rem;height:.88rem;line-height:.88rem;background:#f64c3e;font-size:.36rem;color:#fff;text-align:center;-webkit-border-radius:8px;border-radius:8px}.btn a[data-v-51d19eff]{display:block;width:100%;height:100%;color:#fff;text-decoration:none}.wrap[data-v-51d19eff]{padding:.6rem .7rem}.progress[data-v-51d19eff]{color:#3f3f3f;font-size:.28rem}.progress span[data-v-51d19eff]{color:#f64c3e;font-size:.64rem}.question[data-v-51d19eff]{color:#f64c3e;font-size:.36rem;margin:.2rem 0 .6rem}.option[data-v-51d19eff]{width:6.1rem;line-height:.4rem;-webkit-border-radius:.4rem;border-radius:.4rem;font-size:.28rem;padding:.2rem .55rem;color:#555;border:1px solid #e5e5e5;margin-top:.2rem}.up_down[data-v-51d19eff]{font-size:.3rem;color:#555;margin-top:.6rem}.up_down div[data-v-51d19eff]{display:inline-block;width:2.4rem;height:.42rem;text-align:center}.checked[data-v-51d19eff]{background:#f64c3e;color:#fff;border:none}.gray[data-v-51d19eff]{color:#999}", "", {"version":3,"sources":["E:/projects/wx.51rz.com/src/container/my/info/Risk.vue"],"names":[],"mappings":"AACA,yBACE,aAAc,AACd,YAAa,AACb,iBAAmB,AACnB,kBAAmB,AACnB,iBAAkB,AAClB,WAAY,AACZ,4FAAwG,CACzG,AACD,uBACE,mBAAoB,AACpB,mBAAsB,AACtB,WAAY,AACZ,eAAkB,CACnB,AACD,yBACE,iBAAmB,CACpB,AACD,2BACE,mBAAqB,AACrB,gBAAkB,AAClB,WAAY,AACZ,gBAAkB,CACnB,AACD,4BACE,cAAe,AACf,iBAAmB,AACnB,gBAAiB,AACjB,kBAAoB,CACrB,AACD,sBACE,iBAAkB,AAClB,WAAY,AACZ,cAAgB,AAChB,mBAAqB,AACrB,mBAAoB,AACpB,iBAAmB,AACnB,WAAY,AACZ,kBAAmB,AACnB,0BAA2B,AACnB,iBAAmB,CAC5B,AACD,wBACE,cAAe,AACf,WAAY,AACZ,YAAa,AACb,WAAY,AACZ,oBAAsB,CACvB,AACD,uBACE,mBAAuB,CACxB,AACD,2BACE,cAAe,AACf,gBAAmB,CACpB,AACD,gCACE,cAAe,AACf,gBAAmB,CACpB,AACD,2BACE,cAAe,AACf,iBAAmB,AACnB,oBAA0B,CAC3B,AACD,yBACE,aAAc,AACd,kBAAoB,AACpB,4BAA8B,AACtB,oBAAsB,AAC9B,iBAAmB,AACnB,qBAAwB,AACxB,WAAY,AACZ,yBAA0B,AAC1B,gBAAmB,CACpB,AACD,0BACE,gBAAkB,AAClB,WAAY,AACZ,gBAAmB,CACpB,AACD,8BACE,qBAAsB,AACtB,aAAc,AACd,cAAgB,AAChB,iBAAmB,CACpB,AACD,0BACE,mBAAoB,AACpB,WAAY,AACZ,WAAa,CACd,AACD,uBACE,UAAY,CACb","file":"Risk.vue","sourcesContent":["\\n.banner[data-v-51d19eff] {\\n  width: 7.5rem;\\n  height: 2rem;\\n  font-size: 0.48rem;\\n  text-align: center;\\n  line-height: 2rem;\\n  color: #fff;\\n  background: url(https://images.51rz.com/images/app/risk_asseessment/banner.png) center center no-repeat;\\n}\\n.text[data-v-51d19eff] {\\n  min-height: 1.68rem;\\n  margin: 0.6rem 0.7rem;\\n  color: #555;\\n  font-size: 0.3rem;\\n}\\n.result[data-v-51d19eff] {\\n  text-align: center;\\n}\\n.result p[data-v-51d19eff] {\\n  margin-top: -0.48rem;\\n  font-size: 0.3rem;\\n  color: #999;\\n  line-height: 42px;\\n}\\n.result h4[data-v-51d19eff] {\\n  color: #F64C3E;\\n  font-size: 0.64rem;\\n  font-weight: 500;\\n  margin-bottom: 60px;\\n}\\n.btn[data-v-51d19eff] {\\n  margin: 0 1.25rem;\\n  width: 5rem;\\n  height: 0.88rem;\\n  line-height: 0.88rem;\\n  background: #F64C3E;\\n  font-size: 0.36rem;\\n  color: #fff;\\n  text-align: center;\\n  -webkit-border-radius: 8px;\\n          border-radius: 8px;\\n}\\n.btn a[data-v-51d19eff] {\\n  display: block;\\n  width: 100%;\\n  height: 100%;\\n  color: #fff;\\n  text-decoration: none;\\n}\\n.wrap[data-v-51d19eff] {\\n  padding: 0.6rem 0.7rem;\\n}\\n.progress[data-v-51d19eff] {\\n  color: #3F3F3F;\\n  font-size: 0.28rem;\\n}\\n.progress span[data-v-51d19eff] {\\n  color: #F64C3E;\\n  font-size: 0.64rem;\\n}\\n.question[data-v-51d19eff] {\\n  color: #F64C3E;\\n  font-size: 0.36rem;\\n  margin: 0.2rem 0 0.6rem 0;\\n}\\n.option[data-v-51d19eff] {\\n  width: 6.1rem;\\n  line-height: 0.4rem;\\n  -webkit-border-radius: 0.4rem;\\n          border-radius: 0.4rem;\\n  font-size: 0.28rem;\\n  padding: 0.2rem 0.55rem;\\n  color: #555;\\n  border: 1px solid #E5E5E5;\\n  margin-top: 0.2rem;\\n}\\n.up_down[data-v-51d19eff] {\\n  font-size: 0.3rem;\\n  color: #555;\\n  margin-top: 0.6rem;\\n}\\n.up_down div[data-v-51d19eff] {\\n  display: inline-block;\\n  width: 2.4rem;\\n  height: 0.42rem;\\n  text-align: center;\\n}\\n.checked[data-v-51d19eff] {\\n  background: #F64C3E;\\n  color: #fff;\\n  border: none;\\n}\\n.gray[data-v-51d19eff] {\\n  color: #999;\\n}\\n"],"sourceRoot":""}]);\n\n// exports\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/.npminstall/css-loader/0.28.7/css-loader?{"minimize":true,"sourceMap":true}!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/style-compiler?{"id":"data-v-51d19eff","scoped":true,"hasInlineConfig":false}!./~/.npminstall/sass-loader/6.0.6/sass-loader/lib/loader.js?{"includePaths":["./src/css/"],"data":"@import /"base/";","sourceMap":true}!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=styles&index=0!./src/container/my/info/Risk.vue\n// module id = 351\n// module chunks = 50\n\n//# sourceURL=webpack:///./src/container/my/info/Risk.vue?./~/.npminstall/css-loader/0.28.7/css-loader?%7B%22minimize%22:true,%22sourceMap%22:true%7D!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/style-compiler?%7B%22id%22:%22data-v-51d19eff%22,%22scoped%22:true,%22hasInlineConfig%22:false%7D!./~/.npminstall/sass-loader/6.0.6/sass-loader/lib/loader.js?%7B%22includePaths%22:%5B%22./src/css/%22%5D,%22data%22:%22@import_/%22base/%22;%22,%22sourceMap%22:true%7D!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=styles&index=0')},429:function(module,exports,__webpack_require__){eval('// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(351);\nif(typeof content === \'string\') content = [[module.i, content, \'\']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar update = __webpack_require__(120)("510ff45c", content, true);\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/.npminstall/extract-text-webpack-plugin/2.1.2/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/.npminstall/vue-style-loader/2.0.5/vue-style-loader!./~/.npminstall/css-loader/0.28.7/css-loader?{"minimize":true,"sourceMap":true}!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/style-compiler?{"id":"data-v-51d19eff","scoped":true,"hasInlineConfig":false}!./~/.npminstall/sass-loader/6.0.6/sass-loader/lib/loader.js?{"includePaths":["./src/css/"],"data":"@import /"base/";","sourceMap":true}!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=styles&index=0!./src/container/my/info/Risk.vue\n// module id = 429\n// module chunks = 50\n\n//# sourceURL=webpack:///./src/container/my/info/Risk.vue?./~/.npminstall/extract-text-webpack-plugin/2.1.2/extract-text-webpack-plugin/loader.js?%7B%22omit%22:1,%22remove%22:true%7D!./~/.npminstall/vue-style-loader/2.0.5/vue-style-loader!./~/.npminstall/css-loader/0.28.7/css-loader?%7B%22minimize%22:true,%22sourceMap%22:true%7D!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/style-compiler?%7B%22id%22:%22data-v-51d19eff%22,%22scoped%22:true,%22hasInlineConfig%22:false%7D!./~/.npminstall/sass-loader/6.0.6/sass-loader/lib/loader.js?%7B%22includePaths%22:%5B%22./src/css/%22%5D,%22data%22:%22@import_/%22base/%22;%22,%22sourceMap%22:true%7D!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=styles&index=0')},508:function(module,exports){eval('module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;\n  return _c(\'div\', [_c(\'div\', {\n    directives: [{\n      name: "show",\n      rawName: "v-show",\n      value: (_vm.step === 1),\n      expression: "step === 1"\n    }]\n  }, [_c(\'div\', {\n    staticClass: "banner",\n    domProps: {\n      "textContent": _vm._s(_vm.banner.title)\n    }\n  }), _vm._v(" "), _c(\'div\', {\n    staticClass: "content"\n  }, [_c(\'div\', {\n    staticClass: "text",\n    domProps: {\n      "textContent": _vm._s(_vm.banner.content)\n    }\n  }), _vm._v(" "), _c(\'div\', {\n    directives: [{\n      name: "show",\n      rawName: "v-show",\n      value: (_vm.historyResult && !_vm.currentResult),\n      expression: "historyResult&&!currentResult"\n    }],\n    staticClass: "result"\n  }, [_c(\'p\', [_vm._v("上次测评结果")]), _vm._v(" "), _c(\'h4\', {\n    domProps: {\n      "textContent": _vm._s(_vm.historyResult)\n    }\n  })]), _vm._v(" "), _c(\'div\', {\n    directives: [{\n      name: "show",\n      rawName: "v-show",\n      value: (_vm.currentResult),\n      expression: "currentResult"\n    }],\n    staticClass: "result"\n  }, [_c(\'p\', [_vm._v("您当前的风险承受能力")]), _vm._v(" "), _c(\'h4\', {\n    domProps: {\n      "textContent": _vm._s(_vm.currentResult)\n    }\n  })])]), _vm._v(" "), _c(\'div\', {\n    staticClass: "btn"\n  }, [_c(\'a\', {\n    directives: [{\n      name: "show",\n      rawName: "v-show",\n      value: (_vm.currentResult),\n      expression: "currentResult"\n    }],\n    attrs: {\n      "href": "/tender"\n    }\n  }, [_vm._v("去投资")]), _vm._v(" "), _c(\'a\', {\n    directives: [{\n      name: "show",\n      rawName: "v-show",\n      value: (!_vm.currentResult),\n      expression: "!currentResult"\n    }],\n    on: {\n      "click": function($event) {\n        _vm.step = 2\n      }\n    }\n  }, [_vm._v("开始测评")])])]), _vm._v(" "), _c(\'div\', {\n    directives: [{\n      name: "show",\n      rawName: "v-show",\n      value: (_vm.step === 2),\n      expression: "step === 2"\n    }],\n    staticClass: "wrap"\n  }, [_c(\'p\', {\n    staticClass: "progress"\n  }, [_c(\'span\', {\n    domProps: {\n      "textContent": _vm._s(_vm.progress + 1)\n    }\n  }), _vm._v("/10\\n        ")]), _vm._v(" "), _c(\'p\', {\n    staticClass: "question",\n    domProps: {\n      "textContent": _vm._s(_vm.checked.question)\n    }\n  }), _vm._v(" "), _vm._l((_vm.checked.options), function(item, index) {\n    return _c(\'div\', {\n      staticClass: "option",\n      class: _vm.score[_vm.progress] === index ? \'checked \' : \'\',\n      domProps: {\n        "textContent": _vm._s(_vm.getLV(index) + \'：\' + item)\n      },\n      on: {\n        "click": function($event) {\n          _vm.check(index)\n        }\n      }\n    })\n  }), _vm._v(" "), _c(\'div\', {\n    staticClass: "up_down"\n  }, [_c(\'div\', {\n    class: _vm.progress === 0 ? \'gray\' : \'\',\n    staticStyle: {\n      "margin-right": "1.2rem"\n    },\n    on: {\n      "click": _vm.prev\n    }\n  }, [_vm._v("上一题")]), _vm._v(" "), _c(\'div\', {\n    class: _vm.score[_vm.progress] != undefined ? \'\' : \'gray\',\n    domProps: {\n      "innerHTML": _vm._s(_vm.nextDesc)\n    },\n    on: {\n      "click": _vm.next\n    }\n  })])], 2)])\n},staticRenderFns: []}\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/template-compiler?{"id":"data-v-51d19eff"}!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=template&index=0!./src/container/my/info/Risk.vue\n// module id = 508\n// module chunks = 50\n\n//# sourceURL=webpack:///./src/container/my/info/Risk.vue?./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/template-compiler?%7B%22id%22:%22data-v-51d19eff%22%7D!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=template&index=0')},604:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(50);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(49);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(27);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(26);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(17);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_getParam__ = __webpack_require__(210);\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    name: 'risk',\n    data: function data() {\n        return {\n            currentResult: '',\n            historyResult: '',\n            banner: {\n                title: '风险承受能力评估',\n                content: '本问卷旨在了解您对投资风险的承受意愿及能力。问卷结果可能不能完全呈现您面对投资风险的真正态度，您可与我们的客服进一步沟通。'\n            },\n            step: 1,\n            progress: 0,\n            score: [],\n            question: ['您目前所处的年龄阶段为：', '您可以投资的资金量：', '您的投资目的是什么：', '您一般投资的期限为：', '您投资时，能接受一年内的最大损失是多少：', '某组合/基金未来3年里平均收益、最好和最坏的收益情况如下，您会选择哪种：', '您家庭的年收入？', '您预计家庭的年收入在未来5年中将：', '您家庭的月生活消费支出约占月总收入的：', '您曾投资过的风险最高的产品是：'],\n            options: [['55岁以上', '40-55岁', '30-40岁', '30岁以下'], ['10万元（含）以下', '10万至100万（含）', '100万至500万（含）', '500万至2000万（含）', '2000万以上'], ['超过通货膨胀就好（每年5%左右）', '获取较稳定收益（每年10%左右）', '获取较高收益（每年20%左右）', '博取高收益（每年30% 以上）'], ['1年以内', '1-3年（包括3年）', '3-5年（包括5年）', '5年以上'], ['跌幅10%以内', '跌幅10%~20%间', '跌幅20%~30%间', '跌幅30%以上'], ['平均年收益率为2%，最好情况3%，最坏情况1%', '平均年收益率为6%，最好情况13%，最坏情况-2%', '平均年收益率为8%，最好情况53%，最坏情况-35%', '平均年收益率为10%，最好情况65%，最坏情况-45%'], ['10万元（含）以下', '10万至20万（含）', '20万至50万（含）', '50万以上'], ['有所下降', '维持稳定', '小幅成长，在10%左右', '大幅成长，在20%以上'], ['71%-100%以上', '51%-70%', '21%-50%', '0-20%'], ['储蓄、银行理财产品、货币基金等风险极小的现金管理工具', '债券或债券类基金、固定收益信托等', '股票或股票型基金', '期货或期货类基金、PE、房地产基金、艺术品基金等类投资']],\n            result: [{\n                title: '保守型',\n                content: '您的投资目标是追求资本的保值。可承受的风险较低。'\n            }, {\n                title: '稳健型',\n                content: '您的投资目标是追求资本缓和升值，其次为资本保值。可承担中等风险。'\n            }, {\n                title: '积极型',\n                content: '您的投资目标是增值财富，您可承受一定风险，了解高收益总是与高风险相伴随。'\n            }]\n        };\n    },\n\n    methods: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({\n        check: function check(index) {\n            this.score[this.progress] = index;\n            this.score.push();\n        },\n        prev: function prev() {\n            if (this.progress === 0) return;\n            this.progress = this.progress - 1;\n        },\n        next: function next() {\n            var _this = this;\n\n            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {\n                var all, result;\n                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {\n                    while (1) {\n                        switch (_context.prev = _context.next) {\n                            case 0:\n                                if (!(_this.score[_this.progress] == undefined)) {\n                                    _context.next = 2;\n                                    break;\n                                }\n\n                                return _context.abrupt('return');\n\n                            case 2:\n                                if (!(_this.progress === 9)) {\n                                    _context.next = 14;\n                                    break;\n                                }\n\n                                all = _this.score.reduce(function (a, b) {\n                                    return a + b;\n                                });\n\n                                all += 10;\n                                result = _this.scoreCovert(all);\n                                _context.next = 8;\n                                return __WEBPACK_IMPORTED_MODULE_3__api__[\"a\" /* default */].post(__WEBPACK_IMPORTED_MODULE_3__api__[\"a\" /* default */].riskTest, { score: all, token: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_getParam__[\"a\" /* default */])(window.location.href, 'token') });\n\n                            case 8:\n                                _this.setInfo({ riskScore: all });\n                                _this.banner = {\n                                    title: '测评结果',\n                                    content: result.content\n                                };\n                                _this.step = 1;\n                                _this.currentResult = result.title;\n                                _context.next = 15;\n                                break;\n\n                            case 14:\n                                _this.progress = _this.progress + 1;\n\n                            case 15:\n                            case 'end':\n                                return _context.stop();\n                        }\n                    }\n                }, _callee, _this);\n            }))();\n        },\n        getLV: function getLV(index) {\n            var text = ['A', 'B', 'C', 'D', 'E'];\n            return text[index];\n        },\n        scoreCovert: function scoreCovert(val) {\n            var resultIndex = 4;\n            if (val >= 28) {\n                resultIndex = 2;\n            } else if (val >= 14) {\n                resultIndex = 1;\n            } else if (val >= 10) {\n                resultIndex = 0;\n            }\n            return this.result[resultIndex];\n        }\n    }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_vuex__[\"a\" /* mapActions */])(['setInfo'])),\n    computed: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({\n        checked: function checked() {\n            return {\n                question: this.question[this.progress],\n                options: this.options[this.progress]\n            };\n        },\n        nextDesc: function nextDesc() {\n            return this.progress === 9 ? '<span style=\"color: #F64C3E;\">提交问卷</span>' : '下一题';\n        }\n    }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_vuex__[\"b\" /* mapGetters */])(['info'])),\n    mounted: function mounted() {\n        var score = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_getParam__[\"a\" /* default */])(window.location.href, 'score') || this.info.riskScore;\n        this.historyResult = this.scoreCovert(score).title;\n    }\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/babel-loader/lib!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=script&index=0!./src/container/my/info/Risk.vue\n// module id = 604\n// module chunks = 50\n\n//# sourceURL=webpack:///./src/container/my/info/Risk.vue?./~/babel-loader/lib!./~/.npminstall/vue-loader/11.3.4/vue-loader/lib/selector.js?type=script&index=0")}});