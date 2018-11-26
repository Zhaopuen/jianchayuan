function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), o = function() {
    function o(t) {
        e(this, o), Object.assign(this, {
            $scope: t
        }), this.__init();
    }
    return n(o, [ {
        key: "__init",
        value: function() {
            this.__initDefaults(), this.__initTools(), this.__initComponents();
        }
    }, {
        key: "__initDefaults",
        value: function() {
            this.$wux = {
                backdrop: {
                    visible: !1
                },
                dialog: {
                    visible: !1
                },
                toast: {
                    visible: !1
                },
                loading: {
                    visible: !1
                },
                rater: {}
            }, this.$scope.setData({
                $wux: this.$wux
            });
        }
    }, {
        key: "__initTools",
        value: function() {
            this.tools = {
                isArray: function(t) {
                    return Array.isArray(t);
                },
                isFunction: function(t) {
                    return "function" == typeof t;
                },
                isDefined: function(t) {
                    return void 0 !== t;
                },
                isObject: function(t) {
                    return null !== t && "object" === (void 0 === t ? "undefined" : i(t));
                },
                type: function(t) {
                    var e = Object.prototype.toString;
                    return null == t ? t + "" : "object" === (void 0 === t ? "undefined" : i(t)) || "function" == typeof t ? e.call(t) || "object" : void 0 === t ? "undefined" : i(t);
                },
                clone: function(t) {
                    if ("object" !== (void 0 === t ? "undefined" : i(t)) || !t) return t;
                    var e = {};
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                    return e;
                },
                each: function(t, e) {
                    var i = void 0, n = void 0;
                    if (t && "number" == typeof t.length) for (i = 0; i < t.length; i++) e.call(t[i], t[i], i); else if (this.isObject(t)) for (n in t) t.hasOwnProperty(n) && e.call(t[n], t[n], n);
                    return t;
                },
                isPlainObject: function(t) {
                    var e = Object.getPrototypeOf, i = {}, n = i.hasOwnProperty, o = n.toString, a = o.call(Object), c = void 0, r = void 0;
                    return !(!t || "[object Object]" !== this.type(t)) && (!(c = e(t)) || "function" == typeof (r = n.call(c, "constructor") && c.constructor) && o.call(r) === a);
                },
                extend: function() {
                    var t = void 0, e = void 0, n = void 0, o = void 0, a = void 0, c = void 0, r = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
                    for ("boolean" == typeof r && (l = r, r = arguments[s] || {}, s++), "object" === (void 0 === r ? "undefined" : i(r)) || this.isFunction(r) || (r = {}), 
                    s === u && (r = this, s--); s < u; s++) if (null != (a = arguments[s])) for (o in a) t = r[o], 
                    r !== (n = a[o]) && (l && n && (this.isPlainObject(n) || (e = isArray(n))) ? (e ? (e = !1, 
                    c = t && isArray(t) ? t : []) : c = t && this.isPlainObject(t) ? t : {}, r[o] = this.extend(l, c, n)) : void 0 !== n && (r[o] = n));
                    return r;
                }
            };
        }
    }, {
        key: "__initComponents",
        value: function() {
            this.__initBackdrop(), this.__initDialog(), this.__initToast(), this.__initLoading(), 
            this.__initRater();
        }
    }, {
        key: "__initBackdrop",
        value: function() {
            var t = this;
            t.$scope;
            t.$wuxBackdrop = {
                backdropHolds: 0,
                retain: function() {
                    1 === ++this.backdropHolds && t.setVisible([ "backdrop" ], !0);
                },
                release: function() {
                    1 === this.backdropHolds && t.setVisible([ "backdrop" ], !1), this.backdropHolds = Math.max(0, this.backdropHolds - 1);
                }
            };
        }
    }, {
        key: "__initDialog",
        value: function() {
            var t = this, e = t.tools.extend, i = t.tools.clone, n = t.$scope;
            t.$wuxDialog = {
                defaults: {
                    showCancel: !0,
                    title: "",
                    content: "",
                    confirmText: "确定",
                    cancelText: "取消",
                    confirm: function() {},
                    cancel: function() {},
                    dialogConfirm: "dialogConfirm",
                    dialogCancel: "dialogCancel"
                },
                open: function() {
                    function o(e) {
                        t.setVisible([ "dialog" ], !1), "function" == typeof e && e();
                    }
                    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, c = e(i(this.defaults), a || {});
                    return n.dialogConfirm = function() {
                        return o(c.confirm);
                    }, n.dialogCancel = function() {
                        return o(c.cancel);
                    }, n.setData({
                        "$wux.dialog": c
                    }), t.setVisible([ "dialog" ], !0), n.dialogCancel;
                }
            };
        }
    }, {
        key: "__initToast",
        value: function() {
            var t = this, e = t.tools.extend, i = t.tools.clone, n = t.$scope, o = [ {
                type: "success",
                icon: "success_no_circle",
                cls: "weui-toast-success"
            }, {
                type: "cancel",
                icon: "cancel",
                cls: "weui-toast-cancel"
            }, {
                type: "forbidden",
                icon: "warn",
                cls: "weui-toast-forbidden"
            }, {
                type: "text",
                icon: "",
                cls: "weui-toast-text"
            } ];
            t.$wuxToast = {
                defaults: {
                    type: "success",
                    timer: 1500,
                    color: "#fff",
                    text: "系统错误",
                    success: function() {}
                },
                show: function() {
                    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, c = e(i(this.defaults), a || {});
                    o.forEach(function(t, e) {
                        t.type === a.type && (c.type = t.icon, c.cls = t.cls);
                    }), n.setData({
                        "$wux.toast": c
                    }), t.setVisible([ "toast" ], !0), function(e) {
                        setTimeout(function() {
                            t.setVisible([ "toast" ], !1), "function" == typeof e && e();
                        }, c.timer);
                    }(c.success);
                }
            };
        }
    }, {
        key: "__initLoading",
        value: function() {
            var t = this, e = t.tools.extend, i = t.tools.clone, n = t.$scope;
            t.$wuxLoading = {
                defaults: {
                    text: "数据加载中"
                },
                show: function() {
                    var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = e(i(this.defaults), o || {});
                    n.setData({
                        "$wux.loading": a
                    }), t.setVisible([ "loading" ], !0);
                },
                hide: function() {
                    t.setVisible([ "loading" ], !1);
                }
            };
        }
    }, {
        key: "__initRater",
        value: function() {
            var e = this, i = e.tools.extend, n = e.tools.clone, o = e.$scope;
            e.$wuxRater = {
                defaults: {
                    max: 5,
                    star: "★",
                    value: 0,
                    activeColor: "#fc6",
                    margin: 2,
                    fontSize: 25,
                    disabled: !1,
                    callback: function() {}
                },
                data: function() {
                    return {
                        stars: [],
                        colors: [],
                        cutIndex: -1,
                        cutPercent: 0
                    };
                },
                render: function(e, a) {
                    function c() {
                        for (var i = o.data.$wux.rater[e], n = i.max, a = i.value, c = i.activeColor, r = [], s = 0; s < n; s++) s <= a - 1 ? r.push(c) : r.push("#ccc"), 
                        o.setData(t({}, "$wux.rater." + e + ".colors", r));
                    }
                    function r() {
                        var i, n = o.data.$wux.rater[e].value.toString().split("."), a = 1 === n.length ? [ n[0], 0 ] : n;
                        o.setData((i = {}, t(i, "$wux.rater." + e + ".cutIndex", 1 * a[0]), t(i, "$wux.rater." + e + ".cutPercent", 10 * a[1]), 
                        i));
                    }
                    var s, u = this.data(), l = i(u, n(this.defaults), a || {});
                    o.setData((s = {}, t(s, "$wux.rater." + e, l), t(s, "$wux.rater." + e + ".handleClick", e + "HandleClick"), 
                    s)), o[e + "HandleClick"] = function(i) {
                        var n = i.currentTarget.dataset.index, a = o.data.$wux.rater[e], s = a.value;
                        a.disabled || (s === n + 1 ? o.setData(t({}, "$wux.rater." + e + ".value", n)) : o.setData(t({}, "$wux.rater." + e + ".value", n + 1)), 
                        c(), r(), "function" == typeof l.callback && l.callback(i));
                    }, function() {
                        for (var i = o.data.$wux.rater[e].max, n = [], a = 0; a < i; a++) n.push(a);
                        o.setData(t({}, "$wux.rater." + e + ".stars", n));
                    }(), c(), r();
                }
            };
        }
    }, {
        key: "setVisible",
        value: function(e, i) {
            var n = this;
            e.forEach(function(e) {
                n.$scope.setData(t({}, "$wux." + e + ".visible", i));
            });
        }
    } ]), o;
}();

exports.default = o;