var Ey = Object.create,
  Ia = Object.defineProperty,
  xy = Object.getOwnPropertyDescriptor,
  wy = Object.getOwnPropertyNames,
  Oy = Object.getPrototypeOf,
  Sy = Object.prototype.hasOwnProperty,
  T = (t, e) => () => (e || t((e = {
    exports: {}
  }).exports, e), e.exports),
  jy = (t, e) => {
    for (var r in e) Ia(t, r, {
      get: e[r],
      enumerable: !0
    })
  },
  Ay = (t, e, r, n) => {
    if (e && typeof e == "object" || typeof e == "function")
      for (let o of wy(e)) !Sy.call(t, o) && o !== r && Ia(t, o, {
        get: () => e[o],
        enumerable: !(n = xy(e, o)) || n.enumerable
      });
    return t
  },
  it = (t, e, r) => (r = t != null ? Ey(Oy(t)) : {}, Ay(e || !t || !t.__esModule ? Ia(r, "default", {
    value: t,
    enumerable: !0
  }) : r, t)),
  Kt = T((t, e) => {
    var r = Array.isArray;
    e.exports = r
  }),
  zc = T((t, e) => {
    var r = typeof global == "object" && global && global.Object === Object && global;
    e.exports = r
  }),
  _e = T((t, e) => {
    var r = zc(),
      n = typeof self == "object" && self && self.Object === Object && self,
      o = r || n || Function("return this")();
    e.exports = o
  }),
  vn = T((t, e) => {
    var r = _e(),
      n = r.Symbol;
    e.exports = n
  }),
  Py = T((t, e) => {
    var r = vn(),
      n = Object.prototype,
      o = n.hasOwnProperty,
      i = n.toString,
      a = r ? r.toStringTag : void 0;

    function u(l) {
      var c = o.call(l, a),
        s = l[a];
      try {
        l[a] = void 0;
        var f = !0
      } catch {}
      var p = i.call(l);
      return f && (c ? l[a] = s : delete l[a]), p
    }
    e.exports = u
  }),
  _y = T((t, e) => {
    var r = Object.prototype,
      n = r.toString;

    function o(i) {
      return n.call(i)
    }
    e.exports = o
  }),
  Ne = T((t, e) => {
    var r = vn(),
      n = Py(),
      o = _y(),
      i = "[object Null]",
      a = "[object Undefined]",
      u = r ? r.toStringTag : void 0;

    function l(c) {
      return c == null ? c === void 0 ? a : i : u && u in Object(c) ? n(c) : o(c)
    }
    e.exports = l
  }),
  Be = T((t, e) => {
    function r(n) {
      return n != null && typeof n == "object"
    }
    e.exports = r
  }),
  Pr = T((t, e) => {
    var r = Ne(),
      n = Be(),
      o = "[object Symbol]";

    function i(a) {
      return typeof a == "symbol" || n(a) && r(a) == o
    }
    e.exports = i
  }),
  Na = T((t, e) => {
    var r = Kt(),
      n = Pr(),
      o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      i = /^\w*$/;

    function a(u, l) {
      if (r(u)) return !1;
      var c = typeof u;
      return c == "number" || c == "symbol" || c == "boolean" || u == null || n(u) ? !0 : i.test(u) || !o.test(u) || l != null && u in Object(l)
    }
    e.exports = a
  }),
  me = T((t, e) => {
    function r(n) {
      var o = typeof n;
      return n != null && (o == "object" || o == "function")
    }
    e.exports = r
  }),
  Dt = T((t, e) => {
    var r = Ne(),
      n = me(),
      o = "[object AsyncFunction]",
      i = "[object Function]",
      a = "[object GeneratorFunction]",
      u = "[object Proxy]";

    function l(c) {
      if (!n(c)) return !1;
      var s = r(c);
      return s == i || s == a || s == o || s == u
    }
    e.exports = l
  }),
  ky = T((t, e) => {
    var r = _e(),
      n = r["__core-js_shared__"];
    e.exports = n
  }),
  My = T((t, e) => {
    var r = ky(),
      n = (function() {
        var i = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
        return i ? "Symbol(src)_1." + i : ""
      })();

    function o(i) {
      return !!n && n in i
    }
    e.exports = o
  }),
  Rc = T((t, e) => {
    var r = Function.prototype,
      n = r.toString;

    function o(i) {
      if (i != null) {
        try {
          return n.call(i)
        } catch {}
        try {
          return i + ""
        } catch {}
      }
      return ""
    }
    e.exports = o
  }),
  Ty = T((t, e) => {
    var r = Dt(),
      n = My(),
      o = me(),
      i = Rc(),
      a = /[\\^$.*+?()[\]{}|]/g,
      u = /^\[object .+?Constructor\]$/,
      l = Function.prototype,
      c = Object.prototype,
      s = l.toString,
      f = c.hasOwnProperty,
      p = RegExp("^" + s.call(f).replace(a, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

    function d(y) {
      if (!o(y) || n(y)) return !1;
      var m = r(y) ? p : u;
      return m.test(i(y))
    }
    e.exports = d
  }),
  Cy = T((t, e) => {
    function r(n, o) {
      return n?.[o]
    }
    e.exports = r
  }),
  or = T((t, e) => {
    var r = Ty(),
      n = Cy();

    function o(i, a) {
      var u = n(i, a);
      return r(u) ? u : void 0
    }
    e.exports = o
  }),
  Do = T((t, e) => {
    var r = or(),
      n = r(Object, "create");
    e.exports = n
  }),
  Dy = T((t, e) => {
    var r = Do();

    function n() {
      this.__data__ = r ? r(null) : {}, this.size = 0
    }
    e.exports = n
  }),
  Iy = T((t, e) => {
    function r(n) {
      var o = this.has(n) && delete this.__data__[n];
      return this.size -= o ? 1 : 0, o
    }
    e.exports = r
  }),
  Ny = T((t, e) => {
    var r = Do(),
      n = "__lodash_hash_undefined__",
      o = Object.prototype,
      i = o.hasOwnProperty;

    function a(u) {
      var l = this.__data__;
      if (r) {
        var c = l[u];
        return c === n ? void 0 : c
      }
      return i.call(l, u) ? l[u] : void 0
    }
    e.exports = a
  }),
  By = T((t, e) => {
    var r = Do(),
      n = Object.prototype,
      o = n.hasOwnProperty;

    function i(a) {
      var u = this.__data__;
      return r ? u[a] !== void 0 : o.call(u, a)
    }
    e.exports = i
  }),
  zy = T((t, e) => {
    var r = Do(),
      n = "__lodash_hash_undefined__";

    function o(i, a) {
      var u = this.__data__;
      return this.size += this.has(i) ? 0 : 1, u[i] = r && a === void 0 ? n : a, this
    }
    e.exports = o
  }),
  Ry = T((t, e) => {
    var r = Dy(),
      n = Iy(),
      o = Ny(),
      i = By(),
      a = zy();

    function u(l) {
      var c = -1,
        s = l == null ? 0 : l.length;
      for (this.clear(); ++c < s;) {
        var f = l[c];
        this.set(f[0], f[1])
      }
    }
    u.prototype.clear = r, u.prototype.delete = n, u.prototype.get = o, u.prototype.has = i, u.prototype.set = a, e.exports = u
  }),
  Wy = T((t, e) => {
    function r() {
      this.__data__ = [], this.size = 0
    }
    e.exports = r
  }),
  Ba = T((t, e) => {
    function r(n, o) {
      return n === o || n !== n && o !== o
    }
    e.exports = r
  }),
  Io = T((t, e) => {
    var r = Ba();

    function n(o, i) {
      for (var a = o.length; a--;)
        if (r(o[a][0], i)) return a;
      return -1
    }
    e.exports = n
  }),
  Ly = T((t, e) => {
    var r = Io(),
      n = Array.prototype,
      o = n.splice;

    function i(a) {
      var u = this.__data__,
        l = r(u, a);
      if (l < 0) return !1;
      var c = u.length - 1;
      return l == c ? u.pop() : o.call(u, l, 1), --this.size, !0
    }
    e.exports = i
  }),
  $y = T((t, e) => {
    var r = Io();

    function n(o) {
      var i = this.__data__,
        a = r(i, o);
      return a < 0 ? void 0 : i[a][1]
    }
    e.exports = n
  }),
  Fy = T((t, e) => {
    var r = Io();

    function n(o) {
      return r(this.__data__, o) > -1
    }
    e.exports = n
  }),
  Uy = T((t, e) => {
    var r = Io();

    function n(o, i) {
      var a = this.__data__,
        u = r(a, o);
      return u < 0 ? (++this.size, a.push([o, i])) : a[u][1] = i, this
    }
    e.exports = n
  }),
  No = T((t, e) => {
    var r = Wy(),
      n = Ly(),
      o = $y(),
      i = Fy(),
      a = Uy();

    function u(l) {
      var c = -1,
        s = l == null ? 0 : l.length;
      for (this.clear(); ++c < s;) {
        var f = l[c];
        this.set(f[0], f[1])
      }
    }
    u.prototype.clear = r, u.prototype.delete = n, u.prototype.get = o, u.prototype.has = i, u.prototype.set = a, e.exports = u
  }),
  za = T((t, e) => {
    var r = or(),
      n = _e(),
      o = r(n, "Map");
    e.exports = o
  }),
  qy = T((t, e) => {
    var r = Ry(),
      n = No(),
      o = za();

    function i() {
      this.size = 0, this.__data__ = {
        hash: new r,
        map: new(o || n),
        string: new r
      }
    }
    e.exports = i
  }),
  Hy = T((t, e) => {
    function r(n) {
      var o = typeof n;
      return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? n !== "__proto__" : n === null
    }
    e.exports = r
  }),
  Bo = T((t, e) => {
    var r = Hy();

    function n(o, i) {
      var a = o.__data__;
      return r(i) ? a[typeof i == "string" ? "string" : "hash"] : a.map
    }
    e.exports = n
  }),
  Xy = T((t, e) => {
    var r = Bo();

    function n(o) {
      var i = r(this, o).delete(o);
      return this.size -= i ? 1 : 0, i
    }
    e.exports = n
  }),
  Yy = T((t, e) => {
    var r = Bo();

    function n(o) {
      return r(this, o).get(o)
    }
    e.exports = n
  }),
  Vy = T((t, e) => {
    var r = Bo();

    function n(o) {
      return r(this, o).has(o)
    }
    e.exports = n
  }),
  Ky = T((t, e) => {
    var r = Bo();

    function n(o, i) {
      var a = r(this, o),
        u = a.size;
      return a.set(o, i), this.size += a.size == u ? 0 : 1, this
    }
    e.exports = n
  }),
  Ra = T((t, e) => {
    var r = qy(),
      n = Xy(),
      o = Yy(),
      i = Vy(),
      a = Ky();

    function u(l) {
      var c = -1,
        s = l == null ? 0 : l.length;
      for (this.clear(); ++c < s;) {
        var f = l[c];
        this.set(f[0], f[1])
      }
    }
    u.prototype.clear = r, u.prototype.delete = n, u.prototype.get = o, u.prototype.has = i, u.prototype.set = a, e.exports = u
  }),
  Wc = T((t, e) => {
    var r = Ra(),
      n = "Expected a function";

    function o(i, a) {
      if (typeof i != "function" || a != null && typeof a != "function") throw new TypeError(n);
      var u = function() {
        var l = arguments,
          c = a ? a.apply(this, l) : l[0],
          s = u.cache;
        if (s.has(c)) return s.get(c);
        var f = i.apply(this, l);
        return u.cache = s.set(c, f) || s, f
      };
      return u.cache = new(o.Cache || r), u
    }
    o.Cache = r, e.exports = o
  }),
  Gy = T((t, e) => {
    var r = Wc(),
      n = 500;

    function o(i) {
      var a = r(i, function(l) {
          return u.size === n && u.clear(), l
        }),
        u = a.cache;
      return a
    }
    e.exports = o
  }),
  Zy = T((t, e) => {
    var r = Gy(),
      n = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      o = /\\(\\)?/g,
      i = r(function(a) {
        var u = [];
        return a.charCodeAt(0) === 46 && u.push(""), a.replace(n, function(l, c, s, f) {
          u.push(s ? f.replace(o, "$1") : c || l)
        }), u
      });
    e.exports = i
  }),
  Wa = T((t, e) => {
    function r(n, o) {
      for (var i = -1, a = n == null ? 0 : n.length, u = Array(a); ++i < a;) u[i] = o(n[i], i, n);
      return u
    }
    e.exports = r
  }),
  Qy = T((t, e) => {
    var r = vn(),
      n = Wa(),
      o = Kt(),
      i = Pr(),
      a = 1 / 0,
      u = r ? r.prototype : void 0,
      l = u ? u.toString : void 0;

    function c(s) {
      if (typeof s == "string") return s;
      if (o(s)) return n(s, c) + "";
      if (i(s)) return l ? l.call(s) : "";
      var f = s + "";
      return f == "0" && 1 / s == -a ? "-0" : f
    }
    e.exports = c
  }),
  Lc = T((t, e) => {
    var r = Qy();

    function n(o) {
      return o == null ? "" : r(o)
    }
    e.exports = n
  }),
  $c = T((t, e) => {
    var r = Kt(),
      n = Na(),
      o = Zy(),
      i = Lc();

    function a(u, l) {
      return r(u) ? u : n(u, l) ? [u] : o(i(u))
    }
    e.exports = a
  }),
  zo = T((t, e) => {
    var r = Pr(),
      n = 1 / 0;

    function o(i) {
      if (typeof i == "string" || r(i)) return i;
      var a = i + "";
      return a == "0" && 1 / i == -n ? "-0" : a
    }
    e.exports = o
  }),
  La = T((t, e) => {
    var r = $c(),
      n = zo();

    function o(i, a) {
      a = r(a, i);
      for (var u = 0, l = a.length; i != null && u < l;) i = i[n(a[u++])];
      return u && u == l ? i : void 0
    }
    e.exports = o
  }),
  _r = T((t, e) => {
    var r = La();

    function n(o, i, a) {
      var u = o == null ? void 0 : r(o, i);
      return u === void 0 ? a : u
    }
    e.exports = n
  }),
  ve = T((t, e) => {
    function r(n) {
      return n == null
    }
    e.exports = r
  }),
  $a = T((t, e) => {
    var r = Ne(),
      n = Kt(),
      o = Be(),
      i = "[object String]";

    function a(u) {
      return typeof u == "string" || !n(u) && o(u) && r(u) == i
    }
    e.exports = a
  }),
  Jy = T(t => {
    "use strict";
    var e = Symbol.for("react.element"),
      r = Symbol.for("react.portal"),
      n = Symbol.for("react.fragment"),
      o = Symbol.for("react.strict_mode"),
      i = Symbol.for("react.profiler"),
      a = Symbol.for("react.provider"),
      u = Symbol.for("react.context"),
      l = Symbol.for("react.server_context"),
      c = Symbol.for("react.forward_ref"),
      s = Symbol.for("react.suspense"),
      f = Symbol.for("react.suspense_list"),
      p = Symbol.for("react.memo"),
      d = Symbol.for("react.lazy"),
      y = Symbol.for("react.offscreen"),
      m;
    m = Symbol.for("react.module.reference");

    function g(h) {
      if (typeof h == "object" && h !== null) {
        var b = h.$$typeof;
        switch (b) {
          case e:
            switch (h = h.type, h) {
              case n:
              case i:
              case o:
              case s:
              case f:
                return h;
              default:
                switch (h = h && h.$$typeof, h) {
                  case l:
                  case u:
                  case c:
                  case d:
                  case p:
                  case a:
                    return h;
                  default:
                    return b
                }
            }
          case r:
            return b
        }
      }
    }
    t.ContextConsumer = u, t.ContextProvider = a, t.Element = e, t.ForwardRef = c, t.Fragment = n, t.Lazy = d, t.Memo = p, t.Portal = r, t.Profiler = i, t.StrictMode = o, t.Suspense = s, t.SuspenseList = f, t.isAsyncMode = function() {
      return !1
    }, t.isConcurrentMode = function() {
      return !1
    }, t.isContextConsumer = function(h) {
      return g(h) === u
    }, t.isContextProvider = function(h) {
      return g(h) === a
    }, t.isElement = function(h) {
      return typeof h == "object" && h !== null && h.$$typeof === e
    }, t.isForwardRef = function(h) {
      return g(h) === c
    }, t.isFragment = function(h) {
      return g(h) === n
    }, t.isLazy = function(h) {
      return g(h) === d
    }, t.isMemo = function(h) {
      return g(h) === p
    }, t.isPortal = function(h) {
      return g(h) === r
    }, t.isProfiler = function(h) {
      return g(h) === i
    }, t.isStrictMode = function(h) {
      return g(h) === o
    }, t.isSuspense = function(h) {
      return g(h) === s
    }, t.isSuspenseList = function(h) {
      return g(h) === f
    }, t.isValidElementType = function(h) {
      return typeof h == "string" || typeof h == "function" || h === n || h === i || h === o || h === s || h === f || h === y || typeof h == "object" && h !== null && (h.$$typeof === d || h.$$typeof === p || h.$$typeof === a || h.$$typeof === u || h.$$typeof === c || h.$$typeof === m || h.getModuleId !== void 0)
    }, t.typeOf = g
  }),
  tm = T((t, e) => {
    "use strict";
    e.exports = Jy()
  }),
  Fc = T((t, e) => {
    var r = Ne(),
      n = Be(),
      o = "[object Number]";

    function i(a) {
      return typeof a == "number" || n(a) && r(a) == o
    }
    e.exports = i
  }),
  Uc = T((t, e) => {
    var r = Fc();

    function n(o) {
      return r(o) && o != +o
    }
    e.exports = n
  }),
  em = T((t, e) => {
    function r(n, o, i) {
      var a = -1,
        u = n.length;
      o < 0 && (o = -o > u ? 0 : u + o), i = i > u ? u : i, i < 0 && (i += u), u = o > i ? 0 : i - o >>> 0, o >>>= 0;
      for (var l = Array(u); ++a < u;) l[a] = n[a + o];
      return l
    }
    e.exports = r
  }),
  rm = T((t, e) => {
    var r = em();

    function n(o, i, a) {
      var u = o.length;
      return a = a === void 0 ? u : a, !i && a >= u ? o : r(o, i, a)
    }
    e.exports = n
  }),
  qc = T((t, e) => {
    var r = "\\ud800-\\udfff",
      n = "\\u0300-\\u036f",
      o = "\\ufe20-\\ufe2f",
      i = "\\u20d0-\\u20ff",
      a = n + o + i,
      u = "\\ufe0e\\ufe0f",
      l = "\\u200d",
      c = RegExp("[" + l + r + a + u + "]");

    function s(f) {
      return c.test(f)
    }
    e.exports = s
  }),
  nm = T((t, e) => {
    function r(n) {
      return n.split("")
    }
    e.exports = r
  }),
  om = T((t, e) => {
    var r = "\\ud800-\\udfff",
      n = "\\u0300-\\u036f",
      o = "\\ufe20-\\ufe2f",
      i = "\\u20d0-\\u20ff",
      a = n + o + i,
      u = "\\ufe0e\\ufe0f",
      l = "[" + r + "]",
      c = "[" + a + "]",
      s = "\\ud83c[\\udffb-\\udfff]",
      f = "(?:" + c + "|" + s + ")",
      p = "[^" + r + "]",
      d = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      y = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      m = "\\u200d",
      g = f + "?",
      h = "[" + u + "]?",
      b = "(?:" + m + "(?:" + [p, d, y].join("|") + ")" + h + g + ")*",
      w = h + g + b,
      v = "(?:" + [p + c + "?", c, d, y, l].join("|") + ")",
      E = RegExp(s + "(?=" + s + ")|" + v + w, "g");

    function x(A) {
      return A.match(E) || []
    }
    e.exports = x
  }),
  im = T((t, e) => {
    var r = nm(),
      n = qc(),
      o = om();

    function i(a) {
      return n(a) ? o(a) : r(a)
    }
    e.exports = i
  }),
  am = T((t, e) => {
    var r = rm(),
      n = qc(),
      o = im(),
      i = Lc();

    function a(u) {
      return function(l) {
        l = i(l);
        var c = n(l) ? o(l) : void 0,
          s = c ? c[0] : l.charAt(0),
          f = c ? r(c, 1).join("") : l.slice(1);
        return s[u]() + f
      }
    }
    e.exports = a
  }),
  Fa = T((t, e) => {
    var r = am(),
      n = r("toUpperCase");
    e.exports = n
  }),
  um = T((t, e) => {
    var r = No();

    function n() {
      this.__data__ = new r, this.size = 0
    }
    e.exports = n
  }),
  lm = T((t, e) => {
    function r(n) {
      var o = this.__data__,
        i = o.delete(n);
      return this.size = o.size, i
    }
    e.exports = r
  }),
  cm = T((t, e) => {
    function r(n) {
      return this.__data__.get(n)
    }
    e.exports = r
  }),
  sm = T((t, e) => {
    function r(n) {
      return this.__data__.has(n)
    }
    e.exports = r
  }),
  fm = T((t, e) => {
    var r = No(),
      n = za(),
      o = Ra(),
      i = 200;

    function a(u, l) {
      var c = this.__data__;
      if (c instanceof r) {
        var s = c.__data__;
        if (!n || s.length < i - 1) return s.push([u, l]), this.size = ++c.size, this;
        c = this.__data__ = new o(s)
      }
      return c.set(u, l), this.size = c.size, this
    }
    e.exports = a
  }),
  Hc = T((t, e) => {
    var r = No(),
      n = um(),
      o = lm(),
      i = cm(),
      a = sm(),
      u = fm();

    function l(c) {
      var s = this.__data__ = new r(c);
      this.size = s.size
    }
    l.prototype.clear = n, l.prototype.delete = o, l.prototype.get = i, l.prototype.has = a, l.prototype.set = u, e.exports = l
  }),
  pm = T((t, e) => {
    var r = "__lodash_hash_undefined__";

    function n(o) {
      return this.__data__.set(o, r), this
    }
    e.exports = n
  }),
  dm = T((t, e) => {
    function r(n) {
      return this.__data__.has(n)
    }
    e.exports = r
  }),
  Xc = T((t, e) => {
    var r = Ra(),
      n = pm(),
      o = dm();

    function i(a) {
      var u = -1,
        l = a == null ? 0 : a.length;
      for (this.__data__ = new r; ++u < l;) this.add(a[u])
    }
    i.prototype.add = i.prototype.push = n, i.prototype.has = o, e.exports = i
  }),
  Yc = T((t, e) => {
    function r(n, o) {
      for (var i = -1, a = n == null ? 0 : n.length; ++i < a;)
        if (o(n[i], i, n)) return !0;
      return !1
    }
    e.exports = r
  }),
  Vc = T((t, e) => {
    function r(n, o) {
      return n.has(o)
    }
    e.exports = r
  }),
  Kc = T((t, e) => {
    var r = Xc(),
      n = Yc(),
      o = Vc(),
      i = 1,
      a = 2;

    function u(l, c, s, f, p, d) {
      var y = s & i,
        m = l.length,
        g = c.length;
      if (m != g && !(y && g > m)) return !1;
      var h = d.get(l),
        b = d.get(c);
      if (h && b) return h == c && b == l;
      var w = -1,
        v = !0,
        E = s & a ? new r : void 0;
      for (d.set(l, c), d.set(c, l); ++w < m;) {
        var x = l[w],
          A = c[w];
        if (f) var C = y ? f(A, x, w, c, l, d) : f(x, A, w, l, c, d);
        if (C !== void 0) {
          if (C) continue;
          v = !1;
          break
        }
        if (E) {
          if (!n(c, function(I, $) {
              if (!o(E, $) && (x === I || p(x, I, s, f, d))) return E.push($)
            })) {
            v = !1;
            break
          }
        } else if (!(x === A || p(x, A, s, f, d))) {
          v = !1;
          break
        }
      }
      return d.delete(l), d.delete(c), v
    }
    e.exports = u
  }),
  hm = T((t, e) => {
    var r = _e(),
      n = r.Uint8Array;
    e.exports = n
  }),
  ym = T((t, e) => {
    function r(n) {
      var o = -1,
        i = Array(n.size);
      return n.forEach(function(a, u) {
        i[++o] = [u, a]
      }), i
    }
    e.exports = r
  }),
  Ua = T((t, e) => {
    function r(n) {
      var o = -1,
        i = Array(n.size);
      return n.forEach(function(a) {
        i[++o] = a
      }), i
    }
    e.exports = r
  }),
  mm = T((t, e) => {
    var r = vn(),
      n = hm(),
      o = Ba(),
      i = Kc(),
      a = ym(),
      u = Ua(),
      l = 1,
      c = 2,
      s = "[object Boolean]",
      f = "[object Date]",
      p = "[object Error]",
      d = "[object Map]",
      y = "[object Number]",
      m = "[object RegExp]",
      g = "[object Set]",
      h = "[object String]",
      b = "[object Symbol]",
      w = "[object ArrayBuffer]",
      v = "[object DataView]",
      E = r ? r.prototype : void 0,
      x = E ? E.valueOf : void 0;

    function A(C, I, $, B, D, z, W) {
      switch ($) {
        case v:
          if (C.byteLength != I.byteLength || C.byteOffset != I.byteOffset) return !1;
          C = C.buffer, I = I.buffer;
        case w:
          return !(C.byteLength != I.byteLength || !z(new n(C), new n(I)));
        case s:
        case f:
        case y:
          return o(+C, +I);
        case p:
          return C.name == I.name && C.message == I.message;
        case m:
        case h:
          return C == I + "";
        case d:
          var L = a;
        case g:
          var X = B & l;
          if (L || (L = u), C.size != I.size && !X) return !1;
          var K = W.get(C);
          if (K) return K == I;
          B |= c, W.set(C, I);
          var O = i(L(C), L(I), B, D, z, W);
          return W.delete(C), O;
        case b:
          if (x) return x.call(C) == x.call(I)
      }
      return !1
    }
    e.exports = A
  }),
  Gc = T((t, e) => {
    function r(n, o) {
      for (var i = -1, a = o.length, u = n.length; ++i < a;) n[u + i] = o[i];
      return n
    }
    e.exports = r
  }),
  vm = T((t, e) => {
    var r = Gc(),
      n = Kt();

    function o(i, a, u) {
      var l = a(i);
      return n(i) ? l : r(l, u(i))
    }
    e.exports = o
  }),
  gm = T((t, e) => {
    function r(n, o) {
      for (var i = -1, a = n == null ? 0 : n.length, u = 0, l = []; ++i < a;) {
        var c = n[i];
        o(c, i, n) && (l[u++] = c)
      }
      return l
    }
    e.exports = r
  }),
  bm = T((t, e) => {
    function r() {
      return []
    }
    e.exports = r
  }),
  Em = T((t, e) => {
    var r = gm(),
      n = bm(),
      o = Object.prototype,
      i = o.propertyIsEnumerable,
      a = Object.getOwnPropertySymbols,
      u = a ? function(l) {
        return l == null ? [] : (l = Object(l), r(a(l), function(c) {
          return i.call(l, c)
        }))
      } : n;
    e.exports = u
  }),
  xm = T((t, e) => {
    function r(n, o) {
      for (var i = -1, a = Array(n); ++i < n;) a[i] = o(i);
      return a
    }
    e.exports = r
  }),
  wm = T((t, e) => {
    var r = Ne(),
      n = Be(),
      o = "[object Arguments]";

    function i(a) {
      return n(a) && r(a) == o
    }
    e.exports = i
  }),
  qa = T((t, e) => {
    var r = wm(),
      n = Be(),
      o = Object.prototype,
      i = o.hasOwnProperty,
      a = o.propertyIsEnumerable,
      u = r((function() {
        return arguments
      })()) ? r : function(l) {
        return n(l) && i.call(l, "callee") && !a.call(l, "callee")
      };
    e.exports = u
  }),
  Om = T((t, e) => {
    function r() {
      return !1
    }
    e.exports = r
  }),
  Zc = T((t, e) => {
    var r = _e(),
      n = Om(),
      o = typeof t == "object" && t && !t.nodeType && t,
      i = o && typeof e == "object" && e && !e.nodeType && e,
      a = i && i.exports === o,
      u = a ? r.Buffer : void 0,
      l = u ? u.isBuffer : void 0,
      c = l || n;
    e.exports = c
  }),
  Ha = T((t, e) => {
    var r = 9007199254740991,
      n = /^(?:0|[1-9]\d*)$/;

    function o(i, a) {
      var u = typeof i;
      return a = a ?? r, !!a && (u == "number" || u != "symbol" && n.test(i)) && i > -1 && i % 1 == 0 && i < a
    }
    e.exports = o
  }),
  Xa = T((t, e) => {
    var r = 9007199254740991;

    function n(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= r
    }
    e.exports = n
  }),
  Sm = T((t, e) => {
    var r = Ne(),
      n = Xa(),
      o = Be(),
      i = "[object Arguments]",
      a = "[object Array]",
      u = "[object Boolean]",
      l = "[object Date]",
      c = "[object Error]",
      s = "[object Function]",
      f = "[object Map]",
      p = "[object Number]",
      d = "[object Object]",
      y = "[object RegExp]",
      m = "[object Set]",
      g = "[object String]",
      h = "[object WeakMap]",
      b = "[object ArrayBuffer]",
      w = "[object DataView]",
      v = "[object Float32Array]",
      E = "[object Float64Array]",
      x = "[object Int8Array]",
      A = "[object Int16Array]",
      C = "[object Int32Array]",
      I = "[object Uint8Array]",
      $ = "[object Uint8ClampedArray]",
      B = "[object Uint16Array]",
      D = "[object Uint32Array]",
      z = {};
    z[v] = z[E] = z[x] = z[A] = z[C] = z[I] = z[$] = z[B] = z[D] = !0, z[i] = z[a] = z[b] = z[u] = z[w] = z[l] = z[c] = z[s] = z[f] = z[p] = z[d] = z[y] = z[m] = z[g] = z[h] = !1;

    function W(L) {
      return o(L) && n(L.length) && !!z[r(L)]
    }
    e.exports = W
  }),
  Qc = T((t, e) => {
    function r(n) {
      return function(o) {
        return n(o)
      }
    }
    e.exports = r
  }),
  jm = T((t, e) => {
    var r = zc(),
      n = typeof t == "object" && t && !t.nodeType && t,
      o = n && typeof e == "object" && e && !e.nodeType && e,
      i = o && o.exports === n,
      a = i && r.process,
      u = (function() {
        try {
          var l = o && o.require && o.require("util").types;
          return l || a && a.binding && a.binding("util")
        } catch {}
      })();
    e.exports = u
  }),
  Jc = T((t, e) => {
    var r = Sm(),
      n = Qc(),
      o = jm(),
      i = o && o.isTypedArray,
      a = i ? n(i) : r;
    e.exports = a
  }),
  Am = T((t, e) => {
    var r = xm(),
      n = qa(),
      o = Kt(),
      i = Zc(),
      a = Ha(),
      u = Jc(),
      l = Object.prototype,
      c = l.hasOwnProperty;

    function s(f, p) {
      var d = o(f),
        y = !d && n(f),
        m = !d && !y && i(f),
        g = !d && !y && !m && u(f),
        h = d || y || m || g,
        b = h ? r(f.length, String) : [],
        w = b.length;
      for (var v in f)(p || c.call(f, v)) && !(h && (v == "length" || m && (v == "offset" || v == "parent") || g && (v == "buffer" || v == "byteLength" || v == "byteOffset") || a(v, w))) && b.push(v);
      return b
    }
    e.exports = s
  }),
  Pm = T((t, e) => {
    var r = Object.prototype;

    function n(o) {
      var i = o && o.constructor,
        a = typeof i == "function" && i.prototype || r;
      return o === a
    }
    e.exports = n
  }),
  ts = T((t, e) => {
    function r(n, o) {
      return function(i) {
        return n(o(i))
      }
    }
    e.exports = r
  }),
  _m = T((t, e) => {
    var r = ts(),
      n = r(Object.keys, Object);
    e.exports = n
  }),
  km = T((t, e) => {
    var r = Pm(),
      n = _m(),
      o = Object.prototype,
      i = o.hasOwnProperty;

    function a(u) {
      if (!r(u)) return n(u);
      var l = [];
      for (var c in Object(u)) i.call(u, c) && c != "constructor" && l.push(c);
      return l
    }
    e.exports = a
  }),
  gn = T((t, e) => {
    var r = Dt(),
      n = Xa();

    function o(i) {
      return i != null && n(i.length) && !r(i)
    }
    e.exports = o
  }),
  Ro = T((t, e) => {
    var r = Am(),
      n = km(),
      o = gn();

    function i(a) {
      return o(a) ? r(a) : n(a)
    }
    e.exports = i
  }),
  Mm = T((t, e) => {
    var r = vm(),
      n = Em(),
      o = Ro();

    function i(a) {
      return r(a, o, n)
    }
    e.exports = i
  }),
  Tm = T((t, e) => {
    var r = Mm(),
      n = 1,
      o = Object.prototype,
      i = o.hasOwnProperty;

    function a(u, l, c, s, f, p) {
      var d = c & n,
        y = r(u),
        m = y.length,
        g = r(l),
        h = g.length;
      if (m != h && !d) return !1;
      for (var b = m; b--;) {
        var w = y[b];
        if (!(d ? w in l : i.call(l, w))) return !1
      }
      var v = p.get(u),
        E = p.get(l);
      if (v && E) return v == l && E == u;
      var x = !0;
      p.set(u, l), p.set(l, u);
      for (var A = d; ++b < m;) {
        w = y[b];
        var C = u[w],
          I = l[w];
        if (s) var $ = d ? s(I, C, w, l, u, p) : s(C, I, w, u, l, p);
        if (!($ === void 0 ? C === I || f(C, I, c, s, p) : $)) {
          x = !1;
          break
        }
        A || (A = w == "constructor")
      }
      if (x && !A) {
        var B = u.constructor,
          D = l.constructor;
        B != D && "constructor" in u && "constructor" in l && !(typeof B == "function" && B instanceof B && typeof D == "function" && D instanceof D) && (x = !1)
      }
      return p.delete(u), p.delete(l), x
    }
    e.exports = a
  }),
  Cm = T((t, e) => {
    var r = or(),
      n = _e(),
      o = r(n, "DataView");
    e.exports = o
  }),
  Dm = T((t, e) => {
    var r = or(),
      n = _e(),
      o = r(n, "Promise");
    e.exports = o
  }),
  es = T((t, e) => {
    var r = or(),
      n = _e(),
      o = r(n, "Set");
    e.exports = o
  }),
  Im = T((t, e) => {
    var r = or(),
      n = _e(),
      o = r(n, "WeakMap");
    e.exports = o
  }),
  Nm = T((t, e) => {
    var r = Cm(),
      n = za(),
      o = Dm(),
      i = es(),
      a = Im(),
      u = Ne(),
      l = Rc(),
      c = "[object Map]",
      s = "[object Object]",
      f = "[object Promise]",
      p = "[object Set]",
      d = "[object WeakMap]",
      y = "[object DataView]",
      m = l(r),
      g = l(n),
      h = l(o),
      b = l(i),
      w = l(a),
      v = u;
    (r && v(new r(new ArrayBuffer(1))) != y || n && v(new n) != c || o && v(o.resolve()) != f || i && v(new i) != p || a && v(new a) != d) && (v = function(E) {
      var x = u(E),
        A = x == s ? E.constructor : void 0,
        C = A ? l(A) : "";
      if (C) switch (C) {
        case m:
          return y;
        case g:
          return c;
        case h:
          return f;
        case b:
          return p;
        case w:
          return d
      }
      return x
    }), e.exports = v
  }),
  Bm = T((t, e) => {
    var r = Hc(),
      n = Kc(),
      o = mm(),
      i = Tm(),
      a = Nm(),
      u = Kt(),
      l = Zc(),
      c = Jc(),
      s = 1,
      f = "[object Arguments]",
      p = "[object Array]",
      d = "[object Object]",
      y = Object.prototype,
      m = y.hasOwnProperty;

    function g(h, b, w, v, E, x) {
      var A = u(h),
        C = u(b),
        I = A ? p : a(h),
        $ = C ? p : a(b);
      I = I == f ? d : I, $ = $ == f ? d : $;
      var B = I == d,
        D = $ == d,
        z = I == $;
      if (z && l(h)) {
        if (!l(b)) return !1;
        A = !0, B = !1
      }
      if (z && !B) return x || (x = new r), A || c(h) ? n(h, b, w, v, E, x) : o(h, b, I, w, v, E, x);
      if (!(w & s)) {
        var W = B && m.call(h, "__wrapped__"),
          L = D && m.call(b, "__wrapped__");
        if (W || L) {
          var X = W ? h.value() : h,
            K = L ? b.value() : b;
          return x || (x = new r), E(X, K, w, v, x)
        }
      }
      return z ? (x || (x = new r), i(h, b, w, v, E, x)) : !1
    }
    e.exports = g
  }),
  Ya = T((t, e) => {
    var r = Bm(),
      n = Be();

    function o(i, a, u, l, c) {
      return i === a ? !0 : i == null || a == null || !n(i) && !n(a) ? i !== i && a !== a : r(i, a, u, l, o, c)
    }
    e.exports = o
  }),
  zm = T((t, e) => {
    var r = Hc(),
      n = Ya(),
      o = 1,
      i = 2;

    function a(u, l, c, s) {
      var f = c.length,
        p = f,
        d = !s;
      if (u == null) return !p;
      for (u = Object(u); f--;) {
        var y = c[f];
        if (d && y[2] ? y[1] !== u[y[0]] : !(y[0] in u)) return !1
      }
      for (; ++f < p;) {
        y = c[f];
        var m = y[0],
          g = u[m],
          h = y[1];
        if (d && y[2]) {
          if (g === void 0 && !(m in u)) return !1
        } else {
          var b = new r;
          if (s) var w = s(g, h, m, u, l, b);
          if (!(w === void 0 ? n(h, g, o | i, s, b) : w)) return !1
        }
      }
      return !0
    }
    e.exports = a
  }),
  rs = T((t, e) => {
    var r = me();

    function n(o) {
      return o === o && !r(o)
    }
    e.exports = n
  }),
  Rm = T((t, e) => {
    var r = rs(),
      n = Ro();

    function o(i) {
      for (var a = n(i), u = a.length; u--;) {
        var l = a[u],
          c = i[l];
        a[u] = [l, c, r(c)]
      }
      return a
    }
    e.exports = o
  }),
  ns = T((t, e) => {
    function r(n, o) {
      return function(i) {
        return i == null ? !1 : i[n] === o && (o !== void 0 || n in Object(i))
      }
    }
    e.exports = r
  }),
  Wm = T((t, e) => {
    var r = zm(),
      n = Rm(),
      o = ns();

    function i(a) {
      var u = n(a);
      return u.length == 1 && u[0][2] ? o(u[0][0], u[0][1]) : function(l) {
        return l === a || r(l, a, u)
      }
    }
    e.exports = i
  }),
  Lm = T((t, e) => {
    function r(n, o) {
      return n != null && o in Object(n)
    }
    e.exports = r
  }),
  $m = T((t, e) => {
    var r = $c(),
      n = qa(),
      o = Kt(),
      i = Ha(),
      a = Xa(),
      u = zo();

    function l(c, s, f) {
      s = r(s, c);
      for (var p = -1, d = s.length, y = !1; ++p < d;) {
        var m = u(s[p]);
        if (!(y = c != null && f(c, m))) break;
        c = c[m]
      }
      return y || ++p != d ? y : (d = c == null ? 0 : c.length, !!d && a(d) && i(m, d) && (o(c) || n(c)))
    }
    e.exports = l
  }),
  Fm = T((t, e) => {
    var r = Lm(),
      n = $m();

    function o(i, a) {
      return i != null && n(i, a, r)
    }
    e.exports = o
  }),
  Um = T((t, e) => {
    var r = Ya(),
      n = _r(),
      o = Fm(),
      i = Na(),
      a = rs(),
      u = ns(),
      l = zo(),
      c = 1,
      s = 2;

    function f(p, d) {
      return i(p) && a(d) ? u(l(p), d) : function(y) {
        var m = n(y, p);
        return m === void 0 && m === d ? o(y, p) : r(d, m, c | s)
      }
    }
    e.exports = f
  }),
  kr = T((t, e) => {
    function r(n) {
      return n
    }
    e.exports = r
  }),
  qm = T((t, e) => {
    function r(n) {
      return function(o) {
        return o?.[n]
      }
    }
    e.exports = r
  }),
  Hm = T((t, e) => {
    var r = La();

    function n(o) {
      return function(i) {
        return r(i, o)
      }
    }
    e.exports = n
  }),
  Xm = T((t, e) => {
    var r = qm(),
      n = Hm(),
      o = Na(),
      i = zo();

    function a(u) {
      return o(u) ? r(i(u)) : n(u)
    }
    e.exports = a
  }),
  Ve = T((t, e) => {
    var r = Wm(),
      n = Um(),
      o = kr(),
      i = Kt(),
      a = Xm();

    function u(l) {
      return typeof l == "function" ? l : l == null ? o : typeof l == "object" ? i(l) ? n(l[0], l[1]) : r(l) : a(l)
    }
    e.exports = u
  }),
  os = T((t, e) => {
    function r(n, o, i, a) {
      for (var u = n.length, l = i + (a ? 1 : -1); a ? l-- : ++l < u;)
        if (o(n[l], l, n)) return l;
      return -1
    }
    e.exports = r
  }),
  Ym = T((t, e) => {
    function r(n) {
      return n !== n
    }
    e.exports = r
  }),
  Vm = T((t, e) => {
    function r(n, o, i) {
      for (var a = i - 1, u = n.length; ++a < u;)
        if (n[a] === o) return a;
      return -1
    }
    e.exports = r
  }),
  Km = T((t, e) => {
    var r = os(),
      n = Ym(),
      o = Vm();

    function i(a, u, l) {
      return u === u ? o(a, u, l) : r(a, n, l)
    }
    e.exports = i
  }),
  Gm = T((t, e) => {
    var r = Km();

    function n(o, i) {
      var a = o == null ? 0 : o.length;
      return !!a && r(o, i, 0) > -1
    }
    e.exports = n
  }),
  Zm = T((t, e) => {
    function r(n, o, i) {
      for (var a = -1, u = n == null ? 0 : n.length; ++a < u;)
        if (i(o, n[a])) return !0;
      return !1
    }
    e.exports = r
  }),
  Qm = T((t, e) => {
    function r() {}
    e.exports = r
  }),
  Jm = T((t, e) => {
    var r = es(),
      n = Qm(),
      o = Ua(),
      i = 1 / 0,
      a = r && 1 / o(new r([, -0]))[1] == i ? function(u) {
        return new r(u)
      } : n;
    e.exports = a
  }),
  tv = T((t, e) => {
    var r = Xc(),
      n = Gm(),
      o = Zm(),
      i = Vc(),
      a = Jm(),
      u = Ua(),
      l = 200;

    function c(s, f, p) {
      var d = -1,
        y = n,
        m = s.length,
        g = !0,
        h = [],
        b = h;
      if (p) g = !1, y = o;
      else if (m >= l) {
        var w = f ? null : a(s);
        if (w) return u(w);
        g = !1, y = i, b = new r
      } else b = f ? [] : h;
      t: for (; ++d < m;) {
        var v = s[d],
          E = f ? f(v) : v;
        if (v = p || v !== 0 ? v : 0, g && E === E) {
          for (var x = b.length; x--;)
            if (b[x] === E) continue t;
          f && b.push(E), h.push(v)
        } else y(b, E, p) || (b !== h && b.push(E), h.push(v))
      }
      return h
    }
    e.exports = c
  }),
  ev = T((t, e) => {
    var r = Ve(),
      n = tv();

    function o(i, a) {
      return i && i.length ? n(i, r(a, 2)) : []
    }
    e.exports = o
  }),
  rv = T((t, e) => {
    var r = vn(),
      n = qa(),
      o = Kt(),
      i = r ? r.isConcatSpreadable : void 0;

    function a(u) {
      return o(u) || n(u) || !!(i && u && u[i])
    }
    e.exports = a
  }),
  is = T((t, e) => {
    var r = Gc(),
      n = rv();

    function o(i, a, u, l, c) {
      var s = -1,
        f = i.length;
      for (u || (u = n), c || (c = []); ++s < f;) {
        var p = i[s];
        a > 0 && u(p) ? a > 1 ? o(p, a - 1, u, l, c) : r(c, p) : l || (c[c.length] = p)
      }
      return c
    }
    e.exports = o
  }),
  nv = T((t, e) => {
    function r(n) {
      return function(o, i, a) {
        for (var u = -1, l = Object(o), c = a(o), s = c.length; s--;) {
          var f = c[n ? s : ++u];
          if (i(l[f], f, l) === !1) break
        }
        return o
      }
    }
    e.exports = r
  }),
  ov = T((t, e) => {
    var r = nv(),
      n = r();
    e.exports = n
  }),
  as = T((t, e) => {
    var r = ov(),
      n = Ro();

    function o(i, a) {
      return i && r(i, a, n)
    }
    e.exports = o
  }),
  iv = T((t, e) => {
    var r = gn();

    function n(o, i) {
      return function(a, u) {
        if (a == null) return a;
        if (!r(a)) return o(a, u);
        for (var l = a.length, c = i ? l : -1, s = Object(a);
          (i ? c-- : ++c < l) && u(s[c], c, s) !== !1;);
        return a
      }
    }
    e.exports = n
  }),
  Va = T((t, e) => {
    var r = as(),
      n = iv(),
      o = n(r);
    e.exports = o
  }),
  us = T((t, e) => {
    var r = Va(),
      n = gn();

    function o(i, a) {
      var u = -1,
        l = n(i) ? Array(i.length) : [];
      return r(i, function(c, s, f) {
        l[++u] = a(c, s, f)
      }), l
    }
    e.exports = o
  }),
  av = T((t, e) => {
    function r(n, o) {
      var i = n.length;
      for (n.sort(o); i--;) n[i] = n[i].value;
      return n
    }
    e.exports = r
  }),
  uv = T((t, e) => {
    var r = Pr();

    function n(o, i) {
      if (o !== i) {
        var a = o !== void 0,
          u = o === null,
          l = o === o,
          c = r(o),
          s = i !== void 0,
          f = i === null,
          p = i === i,
          d = r(i);
        if (!f && !d && !c && o > i || c && s && p && !f && !d || u && s && p || !a && p || !l) return 1;
        if (!u && !c && !d && o < i || d && a && l && !u && !c || f && a && l || !s && l || !p) return -1
      }
      return 0
    }
    e.exports = n
  }),
  lv = T((t, e) => {
    var r = uv();

    function n(o, i, a) {
      for (var u = -1, l = o.criteria, c = i.criteria, s = l.length, f = a.length; ++u < s;) {
        var p = r(l[u], c[u]);
        if (p) {
          if (u >= f) return p;
          var d = a[u];
          return p * (d == "desc" ? -1 : 1)
        }
      }
      return o.index - i.index
    }
    e.exports = n
  }),
  cv = T((t, e) => {
    var r = Wa(),
      n = La(),
      o = Ve(),
      i = us(),
      a = av(),
      u = Qc(),
      l = lv(),
      c = kr(),
      s = Kt();

    function f(p, d, y) {
      d.length ? d = r(d, function(h) {
        return s(h) ? function(b) {
          return n(b, h.length === 1 ? h[0] : h)
        } : h
      }) : d = [c];
      var m = -1;
      d = r(d, u(o));
      var g = i(p, function(h, b, w) {
        var v = r(d, function(E) {
          return E(h)
        });
        return {
          criteria: v,
          index: ++m,
          value: h
        }
      });
      return a(g, function(h, b) {
        return l(h, b, y)
      })
    }
    e.exports = f
  }),
  sv = T((t, e) => {
    function r(n, o, i) {
      switch (i.length) {
        case 0:
          return n.call(o);
        case 1:
          return n.call(o, i[0]);
        case 2:
          return n.call(o, i[0], i[1]);
        case 3:
          return n.call(o, i[0], i[1], i[2])
      }
      return n.apply(o, i)
    }
    e.exports = r
  }),
  fv = T((t, e) => {
    var r = sv(),
      n = Math.max;

    function o(i, a, u) {
      return a = n(a === void 0 ? i.length - 1 : a, 0),
        function() {
          for (var l = arguments, c = -1, s = n(l.length - a, 0), f = Array(s); ++c < s;) f[c] = l[a + c];
          c = -1;
          for (var p = Array(a + 1); ++c < a;) p[c] = l[c];
          return p[a] = u(f), r(i, this, p)
        }
    }
    e.exports = o
  }),
  pv = T((t, e) => {
    function r(n) {
      return function() {
        return n
      }
    }
    e.exports = r
  }),
  ls = T((t, e) => {
    var r = or(),
      n = (function() {
        try {
          var o = r(Object, "defineProperty");
          return o({}, "", {}), o
        } catch {}
      })();
    e.exports = n
  }),
  dv = T((t, e) => {
    var r = pv(),
      n = ls(),
      o = kr(),
      i = n ? function(a, u) {
        return n(a, "toString", {
          configurable: !0,
          enumerable: !1,
          value: r(u),
          writable: !0
        })
      } : o;
    e.exports = i
  }),
  hv = T((t, e) => {
    var r = 800,
      n = 16,
      o = Date.now;

    function i(a) {
      var u = 0,
        l = 0;
      return function() {
        var c = o(),
          s = n - (c - l);
        if (l = c, s > 0) {
          if (++u >= r) return arguments[0]
        } else u = 0;
        return a.apply(void 0, arguments)
      }
    }
    e.exports = i
  }),
  yv = T((t, e) => {
    var r = dv(),
      n = hv(),
      o = n(r);
    e.exports = o
  }),
  mv = T((t, e) => {
    var r = kr(),
      n = fv(),
      o = yv();

    function i(a, u) {
      return o(n(a, u, r), a + "")
    }
    e.exports = i
  }),
  Wo = T((t, e) => {
    var r = Ba(),
      n = gn(),
      o = Ha(),
      i = me();

    function a(u, l, c) {
      if (!i(c)) return !1;
      var s = typeof l;
      return (s == "number" ? n(c) && o(l, c.length) : s == "string" && l in c) ? r(c[l], u) : !1
    }
    e.exports = a
  }),
  Ka = T((t, e) => {
    var r = is(),
      n = cv(),
      o = mv(),
      i = Wo(),
      a = o(function(u, l) {
        if (u == null) return [];
        var c = l.length;
        return c > 1 && i(u, l[0], l[1]) ? l = [] : c > 2 && i(l[0], l[1], l[2]) && (l = [l[0]]), n(u, r(l, 1), [])
      });
    e.exports = a
  }),
  vv = T((t, e) => {
    var r = _e(),
      n = function() {
        return r.Date.now()
      };
    e.exports = n
  }),
  gv = T((t, e) => {
    var r = /\s/;

    function n(o) {
      for (var i = o.length; i-- && r.test(o.charAt(i)););
      return i
    }
    e.exports = n
  }),
  bv = T((t, e) => {
    var r = gv(),
      n = /^\s+/;

    function o(i) {
      return i && i.slice(0, r(i) + 1).replace(n, "")
    }
    e.exports = o
  }),
  cs = T((t, e) => {
    var r = bv(),
      n = me(),
      o = Pr(),
      i = NaN,
      a = /^[-+]0x[0-9a-f]+$/i,
      u = /^0b[01]+$/i,
      l = /^0o[0-7]+$/i,
      c = parseInt;

    function s(f) {
      if (typeof f == "number") return f;
      if (o(f)) return i;
      if (n(f)) {
        var p = typeof f.valueOf == "function" ? f.valueOf() : f;
        f = n(p) ? p + "" : p
      }
      if (typeof f != "string") return f === 0 ? f : +f;
      f = r(f);
      var d = u.test(f);
      return d || l.test(f) ? c(f.slice(2), d ? 2 : 8) : a.test(f) ? i : +f
    }
    e.exports = s
  }),
  Ev = T((t, e) => {
    var r = me(),
      n = vv(),
      o = cs(),
      i = "Expected a function",
      a = Math.max,
      u = Math.min;

    function l(c, s, f) {
      var p, d, y, m, g, h, b = 0,
        w = !1,
        v = !1,
        E = !0;
      if (typeof c != "function") throw new TypeError(i);
      s = o(s) || 0, r(f) && (w = !!f.leading, v = "maxWait" in f, y = v ? a(o(f.maxWait) || 0, s) : y, E = "trailing" in f ? !!f.trailing : E);

      function x(L) {
        var X = p,
          K = d;
        return p = d = void 0, b = L, m = c.apply(K, X), m
      }

      function A(L) {
        return b = L, g = setTimeout($, s), w ? x(L) : m
      }

      function C(L) {
        var X = L - h,
          K = L - b,
          O = s - X;
        return v ? u(O, y - K) : O
      }

      function I(L) {
        var X = L - h,
          K = L - b;
        return h === void 0 || X >= s || X < 0 || v && K >= y
      }

      function $() {
        var L = n();
        if (I(L)) return B(L);
        g = setTimeout($, C(L))
      }

      function B(L) {
        return g = void 0, E && p ? x(L) : (p = d = void 0, m)
      }

      function D() {
        g !== void 0 && clearTimeout(g), b = 0, p = h = d = g = void 0
      }

      function z() {
        return g === void 0 ? m : B(n())
      }

      function W() {
        var L = n(),
          X = I(L);
        if (p = arguments, d = this, h = L, X) {
          if (g === void 0) return A(h);
          if (v) return clearTimeout(g), g = setTimeout($, s), x(h)
        }
        return g === void 0 && (g = setTimeout($, s)), m
      }
      return W.cancel = D, W.flush = z, W
    }
    e.exports = l
  }),
  ss = T((t, e) => {
    var r = Ev(),
      n = me(),
      o = "Expected a function";

    function i(a, u, l) {
      var c = !0,
        s = !0;
      if (typeof a != "function") throw new TypeError(o);
      return n(l) && (c = "leading" in l ? !!l.leading : c, s = "trailing" in l ? !!l.trailing : s), r(a, u, {
        leading: c,
        maxWait: u,
        trailing: s
      })
    }
    e.exports = i
  }),
  fs = T((t, e) => {
    var r = Pr();

    function n(o, i, a) {
      for (var u = -1, l = o.length; ++u < l;) {
        var c = o[u],
          s = i(c);
        if (s != null && (f === void 0 ? s === s && !r(s) : a(s, f))) var f = s,
          p = c
      }
      return p
    }
    e.exports = n
  }),
  xv = T((t, e) => {
    function r(n, o) {
      return n > o
    }
    e.exports = r
  }),
  wv = T((t, e) => {
    var r = fs(),
      n = xv(),
      o = kr();

    function i(a) {
      return a && a.length ? r(a, o, n) : void 0
    }
    e.exports = i
  }),
  Ov = T((t, e) => {
    function r(n, o) {
      return n < o
    }
    e.exports = r
  }),
  Sv = T((t, e) => {
    var r = fs(),
      n = Ov(),
      o = kr();

    function i(a) {
      return a && a.length ? r(a, o, n) : void 0
    }
    e.exports = i
  }),
  jv = T((t, e) => {
    var r = Wa(),
      n = Ve(),
      o = us(),
      i = Kt();

    function a(u, l) {
      var c = i(u) ? r : o;
      return c(u, n(l, 3))
    }
    e.exports = a
  }),
  Av = T((t, e) => {
    var r = is(),
      n = jv();

    function o(i, a) {
      return r(n(i, a), 1)
    }
    e.exports = o
  }),
  Lo = T((t, e) => {
    var r = Ya();

    function n(o, i) {
      return r(o, i)
    }
    e.exports = n
  }),
  ps = T((t, e) => {
    (function(r) {
      "use strict";
      var n = 1e9,
        o = {
          precision: 20,
          rounding: 4,
          toExpNeg: -7,
          toExpPos: 21,
          LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
        },
        i = !0,
        a = "[DecimalError] ",
        u = a + "Invalid argument: ",
        l = a + "Exponent out of range: ",
        c = Math.floor,
        s = Math.pow,
        f = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        p, d = 1e7,
        y = 7,
        m = 9007199254740991,
        g = c(m / y),
        h = {};
      h.absoluteValue = h.abs = function() {
        var O = new this.constructor(this);
        return O.s && (O.s = 1), O
      }, h.comparedTo = h.cmp = function(O) {
        var S, _, j, k, M = this;
        if (O = new M.constructor(O), M.s !== O.s) return M.s || -O.s;
        if (M.e !== O.e) return M.e > O.e ^ M.s < 0 ? 1 : -1;
        for (j = M.d.length, k = O.d.length, S = 0, _ = j < k ? j : k; S < _; ++S)
          if (M.d[S] !== O.d[S]) return M.d[S] > O.d[S] ^ M.s < 0 ? 1 : -1;
        return j === k ? 0 : j > k ^ M.s < 0 ? 1 : -1
      }, h.decimalPlaces = h.dp = function() {
        var O = this,
          S = O.d.length - 1,
          _ = (S - O.e) * y;
        if (S = O.d[S], S)
          for (; S % 10 == 0; S /= 10) _--;
        return _ < 0 ? 0 : _
      }, h.dividedBy = h.div = function(O) {
        return E(this, new this.constructor(O))
      }, h.dividedToIntegerBy = h.idiv = function(O) {
        var S = this,
          _ = S.constructor;
        return D(E(S, new _(O), 0, 1), _.precision)
      }, h.equals = h.eq = function(O) {
        return !this.cmp(O)
      }, h.exponent = function() {
        return A(this)
      }, h.greaterThan = h.gt = function(O) {
        return this.cmp(O) > 0
      }, h.greaterThanOrEqualTo = h.gte = function(O) {
        return this.cmp(O) >= 0
      }, h.isInteger = h.isint = function() {
        return this.e > this.d.length - 2
      }, h.isNegative = h.isneg = function() {
        return this.s < 0
      }, h.isPositive = h.ispos = function() {
        return this.s > 0
      }, h.isZero = function() {
        return this.s === 0
      }, h.lessThan = h.lt = function(O) {
        return this.cmp(O) < 0
      }, h.lessThanOrEqualTo = h.lte = function(O) {
        return this.cmp(O) < 1
      }, h.logarithm = h.log = function(O) {
        var S, _ = this,
          j = _.constructor,
          k = j.precision,
          M = k + 5;
        if (O === void 0) O = new j(10);
        else if (O = new j(O), O.s < 1 || O.eq(p)) throw Error(a + "NaN");
        if (_.s < 1) throw Error(a + (_.s ? "NaN" : "-Infinity"));
        return _.eq(p) ? new j(0) : (i = !1, S = E($(_, M), $(O, M), M), i = !0, D(S, k))
      }, h.minus = h.sub = function(O) {
        var S = this;
        return O = new S.constructor(O), S.s == O.s ? z(S, O) : b(S, (O.s = -O.s, O))
      }, h.modulo = h.mod = function(O) {
        var S, _ = this,
          j = _.constructor,
          k = j.precision;
        if (O = new j(O), !O.s) throw Error(a + "NaN");
        return _.s ? (i = !1, S = E(_, O, 0, 1).times(O), i = !0, _.minus(S)) : D(new j(_), k)
      }, h.naturalExponential = h.exp = function() {
        return x(this)
      }, h.naturalLogarithm = h.ln = function() {
        return $(this)
      }, h.negated = h.neg = function() {
        var O = new this.constructor(this);
        return O.s = -O.s || 0, O
      }, h.plus = h.add = function(O) {
        var S = this;
        return O = new S.constructor(O), S.s == O.s ? b(S, O) : z(S, (O.s = -O.s, O))
      }, h.precision = h.sd = function(O) {
        var S, _, j, k = this;
        if (O !== void 0 && O !== !!O && O !== 1 && O !== 0) throw Error(u + O);
        if (S = A(k) + 1, j = k.d.length - 1, _ = j * y + 1, j = k.d[j], j) {
          for (; j % 10 == 0; j /= 10) _--;
          for (j = k.d[0]; j >= 10; j /= 10) _++
        }
        return O && S > _ ? S : _
      }, h.squareRoot = h.sqrt = function() {
        var O, S, _, j, k, M, U, H = this,
          G = H.constructor;
        if (H.s < 1) {
          if (!H.s) return new G(0);
          throw Error(a + "NaN")
        }
        for (O = A(H), i = !1, k = Math.sqrt(+H), k == 0 || k == 1 / 0 ? (S = v(H.d), (S.length + O) % 2 == 0 && (S += "0"), k = Math.sqrt(S), O = c((O + 1) / 2) - (O < 0 || O % 2), k == 1 / 0 ? S = "5e" + O : (S = k.toExponential(), S = S.slice(0, S.indexOf("e") + 1) + O), j = new G(S)) : j = new G(k.toString()), _ = G.precision, k = U = _ + 3;;)
          if (M = j, j = M.plus(E(H, M, U + 2)).times(.5), v(M.d).slice(0, U) === (S = v(j.d)).slice(0, U)) {
            if (S = S.slice(U - 3, U + 1), k == U && S == "4999") {
              if (D(M, _ + 1, 0), M.times(M).eq(H)) {
                j = M;
                break
              }
            } else if (S != "9999") break;
            U += 4
          } return i = !0, D(j, _)
      }, h.times = h.mul = function(O) {
        var S, _, j, k, M, U, H, G, et, rt = this,
          F = rt.constructor,
          ut = rt.d,
          J = (O = new F(O)).d;
        if (!rt.s || !O.s) return new F(0);
        for (O.s *= rt.s, _ = rt.e + O.e, G = ut.length, et = J.length, G < et && (M = ut, ut = J, J = M, U = G, G = et, et = U), M = [], U = G + et, j = U; j--;) M.push(0);
        for (j = et; --j >= 0;) {
          for (S = 0, k = G + j; k > j;) H = M[k] + J[j] * ut[k - j - 1] + S, M[k--] = H % d | 0, S = H / d | 0;
          M[k] = (M[k] + S) % d | 0
        }
        for (; !M[--U];) M.pop();
        return S ? ++_ : M.shift(), O.d = M, O.e = _, i ? D(O, F.precision) : O
      }, h.toDecimalPlaces = h.todp = function(O, S) {
        var _ = this,
          j = _.constructor;
        return _ = new j(_), O === void 0 ? _ : (w(O, 0, n), S === void 0 ? S = j.rounding : w(S, 0, 8), D(_, O + A(_) + 1, S))
      }, h.toExponential = function(O, S) {
        var _, j = this,
          k = j.constructor;
        return O === void 0 ? _ = W(j, !0) : (w(O, 0, n), S === void 0 ? S = k.rounding : w(S, 0, 8), j = D(new k(j), O + 1, S), _ = W(j, !0, O + 1)), _
      }, h.toFixed = function(O, S) {
        var _, j, k = this,
          M = k.constructor;
        return O === void 0 ? W(k) : (w(O, 0, n), S === void 0 ? S = M.rounding : w(S, 0, 8), j = D(new M(k), O + A(k) + 1, S), _ = W(j.abs(), !1, O + A(j) + 1), k.isneg() && !k.isZero() ? "-" + _ : _)
      }, h.toInteger = h.toint = function() {
        var O = this,
          S = O.constructor;
        return D(new S(O), A(O) + 1, S.rounding)
      }, h.toNumber = function() {
        return +this
      }, h.toPower = h.pow = function(O) {
        var S, _, j, k, M, U, H = this,
          G = H.constructor,
          et = 12,
          rt = +(O = new G(O));
        if (!O.s) return new G(p);
        if (H = new G(H), !H.s) {
          if (O.s < 1) throw Error(a + "Infinity");
          return H
        }
        if (H.eq(p)) return H;
        if (j = G.precision, O.eq(p)) return D(H, j);
        if (S = O.e, _ = O.d.length - 1, U = S >= _, M = H.s, U) {
          if ((_ = rt < 0 ? -rt : rt) <= m) {
            for (k = new G(p), S = Math.ceil(j / y + 4), i = !1; _ % 2 && (k = k.times(H), L(k.d, S)), _ = c(_ / 2), _ !== 0;) H = H.times(H), L(H.d, S);
            return i = !0, O.s < 0 ? new G(p).div(k) : D(k, j)
          }
        } else if (M < 0) throw Error(a + "NaN");
        return M = M < 0 && O.d[Math.max(S, _)] & 1 ? -1 : 1, H.s = 1, i = !1, k = O.times($(H, j + et)), i = !0, k = x(k), k.s = M, k
      }, h.toPrecision = function(O, S) {
        var _, j, k = this,
          M = k.constructor;
        return O === void 0 ? (_ = A(k), j = W(k, _ <= M.toExpNeg || _ >= M.toExpPos)) : (w(O, 1, n), S === void 0 ? S = M.rounding : w(S, 0, 8), k = D(new M(k), O, S), _ = A(k), j = W(k, O <= _ || _ <= M.toExpNeg, O)), j
      }, h.toSignificantDigits = h.tosd = function(O, S) {
        var _ = this,
          j = _.constructor;
        return O === void 0 ? (O = j.precision, S = j.rounding) : (w(O, 1, n), S === void 0 ? S = j.rounding : w(S, 0, 8)), D(new j(_), O, S)
      }, h.toString = h.valueOf = h.val = h.toJSON = function() {
        var O = this,
          S = A(O),
          _ = O.constructor;
        return W(O, S <= _.toExpNeg || S >= _.toExpPos)
      };

      function b(O, S) {
        var _, j, k, M, U, H, G, et, rt = O.constructor,
          F = rt.precision;
        if (!O.s || !S.s) return S.s || (S = new rt(O)), i ? D(S, F) : S;
        if (G = O.d, et = S.d, U = O.e, k = S.e, G = G.slice(), M = U - k, M) {
          for (M < 0 ? (j = G, M = -M, H = et.length) : (j = et, k = U, H = G.length), U = Math.ceil(F / y), H = U > H ? U + 1 : H + 1, M > H && (M = H, j.length = 1), j.reverse(); M--;) j.push(0);
          j.reverse()
        }
        for (H = G.length, M = et.length, H - M < 0 && (M = H, j = et, et = G, G = j), _ = 0; M;) _ = (G[--M] = G[M] + et[M] + _) / d | 0, G[M] %= d;
        for (_ && (G.unshift(_), ++k), H = G.length; G[--H] == 0;) G.pop();
        return S.d = G, S.e = k, i ? D(S, F) : S
      }

      function w(O, S, _) {
        if (O !== ~~O || O < S || O > _) throw Error(u + O)
      }

      function v(O) {
        var S, _, j, k = O.length - 1,
          M = "",
          U = O[0];
        if (k > 0) {
          for (M += U, S = 1; S < k; S++) j = O[S] + "", _ = y - j.length, _ && (M += I(_)), M += j;
          U = O[S], j = U + "", _ = y - j.length, _ && (M += I(_))
        } else if (U === 0) return "0";
        for (; U % 10 === 0;) U /= 10;
        return M + U
      }
      var E = (function() {
        function O(j, k) {
          var M, U = 0,
            H = j.length;
          for (j = j.slice(); H--;) M = j[H] * k + U, j[H] = M % d | 0, U = M / d | 0;
          return U && j.unshift(U), j
        }

        function S(j, k, M, U) {
          var H, G;
          if (M != U) G = M > U ? 1 : -1;
          else
            for (H = G = 0; H < M; H++)
              if (j[H] != k[H]) {
                G = j[H] > k[H] ? 1 : -1;
                break
              } return G
        }

        function _(j, k, M) {
          for (var U = 0; M--;) j[M] -= U, U = j[M] < k[M] ? 1 : 0, j[M] = U * d + j[M] - k[M];
          for (; !j[0] && j.length > 1;) j.shift()
        }
        return function(j, k, M, U) {
          var H, G, et, rt, F, ut, J, Y, st, ct, Pt, lt, At, Qt, Jt, oe, Z, jr, Pe = j.constructor,
            Ar = j.s == k.s ? 1 : -1,
            R = j.d,
            V = k.d;
          if (!j.s) return new Pe(j);
          if (!k.s) throw Error(a + "Division by zero");
          for (G = j.e - k.e, Z = V.length, Jt = R.length, J = new Pe(Ar), Y = J.d = [], et = 0; V[et] == (R[et] || 0);) ++et;
          if (V[et] > (R[et] || 0) && --G, M == null ? lt = M = Pe.precision : U ? lt = M + (A(j) - A(k)) + 1 : lt = M, lt < 0) return new Pe(0);
          if (lt = lt / y + 2 | 0, et = 0, Z == 1)
            for (rt = 0, V = V[0], lt++;
              (et < Jt || rt) && lt--; et++) At = rt * d + (R[et] || 0), Y[et] = At / V | 0, rt = At % V | 0;
          else {
            for (rt = d / (V[0] + 1) | 0, rt > 1 && (V = O(V, rt), R = O(R, rt), Z = V.length, Jt = R.length), Qt = Z, st = R.slice(0, Z), ct = st.length; ct < Z;) st[ct++] = 0;
            jr = V.slice(), jr.unshift(0), oe = V[0], V[1] >= d / 2 && ++oe;
            do rt = 0, H = S(V, st, Z, ct), H < 0 ? (Pt = st[0], Z != ct && (Pt = Pt * d + (st[1] || 0)), rt = Pt / oe | 0, rt > 1 ? (rt >= d && (rt = d - 1), F = O(V, rt), ut = F.length, ct = st.length, H = S(F, st, ut, ct), H == 1 && (rt--, _(F, Z < ut ? jr : V, ut))) : (rt == 0 && (H = rt = 1), F = V.slice()), ut = F.length, ut < ct && F.unshift(0), _(st, F, ct), H == -1 && (ct = st.length, H = S(V, st, Z, ct), H < 1 && (rt++, _(st, Z < ct ? jr : V, ct))), ct = st.length) : H === 0 && (rt++, st = [0]), Y[et++] = rt, H && st[0] ? st[ct++] = R[Qt] || 0 : (st = [R[Qt]], ct = 1); while ((Qt++ < Jt || st[0] !== void 0) && lt--)
          }
          return Y[0] || Y.shift(), J.e = G, D(J, U ? M + A(J) + 1 : M)
        }
      })();

      function x(O, S) {
        var _, j, k, M, U, H, G = 0,
          et = 0,
          rt = O.constructor,
          F = rt.precision;
        if (A(O) > 16) throw Error(l + A(O));
        if (!O.s) return new rt(p);
        for (S == null ? (i = !1, H = F) : H = S, U = new rt(.03125); O.abs().gte(.1);) O = O.times(U), et += 5;
        for (j = Math.log(s(2, et)) / Math.LN10 * 2 + 5 | 0, H += j, _ = k = M = new rt(p), rt.precision = H;;) {
          if (k = D(k.times(O), H), _ = _.times(++G), U = M.plus(E(k, _, H)), v(U.d).slice(0, H) === v(M.d).slice(0, H)) {
            for (; et--;) M = D(M.times(M), H);
            return rt.precision = F, S == null ? (i = !0, D(M, F)) : M
          }
          M = U
        }
      }

      function A(O) {
        for (var S = O.e * y, _ = O.d[0]; _ >= 10; _ /= 10) S++;
        return S
      }

      function C(O, S, _) {
        if (S > O.LN10.sd()) throw i = !0, _ && (O.precision = _), Error(a + "LN10 precision limit exceeded");
        return D(new O(O.LN10), S)
      }

      function I(O) {
        for (var S = ""; O--;) S += "0";
        return S
      }

      function $(O, S) {
        var _, j, k, M, U, H, G, et, rt, F = 1,
          ut = 10,
          J = O,
          Y = J.d,
          st = J.constructor,
          ct = st.precision;
        if (J.s < 1) throw Error(a + (J.s ? "NaN" : "-Infinity"));
        if (J.eq(p)) return new st(0);
        if (S == null ? (i = !1, et = ct) : et = S, J.eq(10)) return S == null && (i = !0), C(st, et);
        if (et += ut, st.precision = et, _ = v(Y), j = _.charAt(0), M = A(J), Math.abs(M) < 15e14) {
          for (; j < 7 && j != 1 || j == 1 && _.charAt(1) > 3;) J = J.times(O), _ = v(J.d), j = _.charAt(0), F++;
          M = A(J), j > 1 ? (J = new st("0." + _), M++) : J = new st(j + "." + _.slice(1))
        } else return G = C(st, et + 2, ct).times(M + ""), J = $(new st(j + "." + _.slice(1)), et - ut).plus(G), st.precision = ct, S == null ? (i = !0, D(J, ct)) : J;
        for (H = U = J = E(J.minus(p), J.plus(p), et), rt = D(J.times(J), et), k = 3;;) {
          if (U = D(U.times(rt), et), G = H.plus(E(U, new st(k), et)), v(G.d).slice(0, et) === v(H.d).slice(0, et)) return H = H.times(2), M !== 0 && (H = H.plus(C(st, et + 2, ct).times(M + ""))), H = E(H, new st(F), et), st.precision = ct, S == null ? (i = !0, D(H, ct)) : H;
          H = G, k += 2
        }
      }

      function B(O, S) {
        var _, j, k;
        for ((_ = S.indexOf(".")) > -1 && (S = S.replace(".", "")), (j = S.search(/e/i)) > 0 ? (_ < 0 && (_ = j), _ += +S.slice(j + 1), S = S.substring(0, j)) : _ < 0 && (_ = S.length), j = 0; S.charCodeAt(j) === 48;) ++j;
        for (k = S.length; S.charCodeAt(k - 1) === 48;) --k;
        if (S = S.slice(j, k), S) {
          if (k -= j, _ = _ - j - 1, O.e = c(_ / y), O.d = [], j = (_ + 1) % y, _ < 0 && (j += y), j < k) {
            for (j && O.d.push(+S.slice(0, j)), k -= y; j < k;) O.d.push(+S.slice(j, j += y));
            S = S.slice(j), j = y - S.length
          } else j -= k;
          for (; j--;) S += "0";
          if (O.d.push(+S), i && (O.e > g || O.e < -g)) throw Error(l + _)
        } else O.s = 0, O.e = 0, O.d = [0];
        return O
      }

      function D(O, S, _) {
        var j, k, M, U, H, G, et, rt, F = O.d;
        for (U = 1, M = F[0]; M >= 10; M /= 10) U++;
        if (j = S - U, j < 0) j += y, k = S, et = F[rt = 0];
        else {
          if (rt = Math.ceil((j + 1) / y), M = F.length, rt >= M) return O;
          for (et = M = F[rt], U = 1; M >= 10; M /= 10) U++;
          j %= y, k = j - y + U
        }
        if (_ !== void 0 && (M = s(10, U - k - 1), H = et / M % 10 | 0, G = S < 0 || F[rt + 1] !== void 0 || et % M, G = _ < 4 ? (H || G) && (_ == 0 || _ == (O.s < 0 ? 3 : 2)) : H > 5 || H == 5 && (_ == 4 || G || _ == 6 && (j > 0 ? k > 0 ? et / s(10, U - k) : 0 : F[rt - 1]) % 10 & 1 || _ == (O.s < 0 ? 8 : 7))), S < 1 || !F[0]) return G ? (M = A(O), F.length = 1, S = S - M - 1, F[0] = s(10, (y - S % y) % y), O.e = c(-S / y) || 0) : (F.length = 1, F[0] = O.e = O.s = 0), O;
        if (j == 0 ? (F.length = rt, M = 1, rt--) : (F.length = rt + 1, M = s(10, y - j), F[rt] = k > 0 ? (et / s(10, U - k) % s(10, k) | 0) * M : 0), G)
          for (;;)
            if (rt == 0) {
              (F[0] += M) == d && (F[0] = 1, ++O.e);
              break
            } else {
              if (F[rt] += M, F[rt] != d) break;
              F[rt--] = 0, M = 1
            } for (j = F.length; F[--j] === 0;) F.pop();
        if (i && (O.e > g || O.e < -g)) throw Error(l + A(O));
        return O
      }

      function z(O, S) {
        var _, j, k, M, U, H, G, et, rt, F, ut = O.constructor,
          J = ut.precision;
        if (!O.s || !S.s) return S.s ? S.s = -S.s : S = new ut(O), i ? D(S, J) : S;
        if (G = O.d, F = S.d, j = S.e, et = O.e, G = G.slice(), U = et - j, U) {
          for (rt = U < 0, rt ? (_ = G, U = -U, H = F.length) : (_ = F, j = et, H = G.length), k = Math.max(Math.ceil(J / y), H) + 2, U > k && (U = k, _.length = 1), _.reverse(), k = U; k--;) _.push(0);
          _.reverse()
        } else {
          for (k = G.length, H = F.length, rt = k < H, rt && (H = k), k = 0; k < H; k++)
            if (G[k] != F[k]) {
              rt = G[k] < F[k];
              break
            } U = 0
        }
        for (rt && (_ = G, G = F, F = _, S.s = -S.s), H = G.length, k = F.length - H; k > 0; --k) G[H++] = 0;
        for (k = F.length; k > U;) {
          if (G[--k] < F[k]) {
            for (M = k; M && G[--M] === 0;) G[M] = d - 1;
            --G[M], G[k] += d
          }
          G[k] -= F[k]
        }
        for (; G[--H] === 0;) G.pop();
        for (; G[0] === 0; G.shift()) --j;
        return G[0] ? (S.d = G, S.e = j, i ? D(S, J) : S) : new ut(0)
      }

      function W(O, S, _) {
        var j, k = A(O),
          M = v(O.d),
          U = M.length;
        return S ? (_ && (j = _ - U) > 0 ? M = M.charAt(0) + "." + M.slice(1) + I(j) : U > 1 && (M = M.charAt(0) + "." + M.slice(1)), M = M + (k < 0 ? "e" : "e+") + k) : k < 0 ? (M = "0." + I(-k - 1) + M, _ && (j = _ - U) > 0 && (M += I(j))) : k >= U ? (M += I(k + 1 - U), _ && (j = _ - k - 1) > 0 && (M = M + "." + I(j))) : ((j = k + 1) < U && (M = M.slice(0, j) + "." + M.slice(j)), _ && (j = _ - U) > 0 && (k + 1 === U && (M += "."), M += I(j))), O.s < 0 ? "-" + M : M
      }

      function L(O, S) {
        if (O.length > S) return O.length = S, !0
      }

      function X(O) {
        var S, _, j;

        function k(M) {
          var U = this;
          if (!(U instanceof k)) return new k(M);
          if (U.constructor = k, M instanceof k) {
            U.s = M.s, U.e = M.e, U.d = (M = M.d) ? M.slice() : M;
            return
          }
          if (typeof M == "number") {
            if (M * 0 !== 0) throw Error(u + M);
            if (M > 0) U.s = 1;
            else if (M < 0) M = -M, U.s = -1;
            else {
              U.s = 0, U.e = 0, U.d = [0];
              return
            }
            if (M === ~~M && M < 1e7) {
              U.e = 0, U.d = [M];
              return
            }
            return B(U, M.toString())
          } else if (typeof M != "string") throw Error(u + M);
          if (M.charCodeAt(0) === 45 ? (M = M.slice(1), U.s = -1) : U.s = 1, f.test(M)) B(U, M);
          else throw Error(u + M)
        }
        if (k.prototype = h, k.ROUND_UP = 0, k.ROUND_DOWN = 1, k.ROUND_CEIL = 2, k.ROUND_FLOOR = 3, k.ROUND_HALF_UP = 4, k.ROUND_HALF_DOWN = 5, k.ROUND_HALF_EVEN = 6, k.ROUND_HALF_CEIL = 7, k.ROUND_HALF_FLOOR = 8, k.clone = X, k.config = k.set = K, O === void 0 && (O = {}), O)
          for (j = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], S = 0; S < j.length;) O.hasOwnProperty(_ = j[S++]) || (O[_] = this[_]);
        return k.config(O), k
      }

      function K(O) {
        if (!O || typeof O != "object") throw Error(a + "Object expected");
        var S, _, j, k = ["precision", 1, n, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
        for (S = 0; S < k.length; S += 3)
          if ((j = O[_ = k[S]]) !== void 0)
            if (c(j) === j && j >= k[S + 1] && j <= k[S + 2]) this[_] = j;
            else throw Error(u + _ + ": " + j);
        if ((j = O[_ = "LN10"]) !== void 0)
          if (j == Math.LN10) this[_] = new this(j);
          else throw Error(u + _ + ": " + j);
        return this
      }
      o = X(o), o.default = o.Decimal = o, p = new o(1), typeof define == "function" && define.amd ? define(function() {
        return o
      }) : typeof e < "u" && e.exports ? e.exports = o : (r || (r = typeof self < "u" && self && self.self == self ? self : Function("return this")()), r.Decimal = o)
    })(t)
  }),
  Pv = T((t, e) => {
    function r(n) {
      var o = n == null ? 0 : n.length;
      return o ? n[o - 1] : void 0
    }
    e.exports = r
  }),
  _v = T((t, e) => {
    "use strict";
    var r = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    e.exports = r
  }),
  kv = T((t, e) => {
    "use strict";
    var r = _v();

    function n() {}

    function o() {}
    o.resetWarningCache = n, e.exports = function() {
      function i(l, c, s, f, p, d) {
        if (d !== r) {
          var y = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
          throw y.name = "Invariant Violation", y
        }
      }
      i.isRequired = i;

      function a() {
        return i
      }
      var u = {
        array: i,
        bigint: i,
        bool: i,
        func: i,
        number: i,
        object: i,
        string: i,
        symbol: i,
        any: i,
        arrayOf: a,
        element: i,
        elementType: i,
        instanceOf: a,
        node: i,
        objectOf: a,
        oneOf: a,
        oneOfType: a,
        shape: a,
        exact: a,
        checkPropTypes: o,
        resetWarningCache: n
      };
      return u.PropTypes = u, u
    }
  }),
  Mv = T((t, e) => {
    e.exports = kv()();
    var r, n
  }),
  Tv = T((t, e) => {
    var r = ts(),
      n = r(Object.getPrototypeOf, Object);
    e.exports = n
  }),
  Cv = T((t, e) => {
    var r = Ne(),
      n = Tv(),
      o = Be(),
      i = "[object Object]",
      a = Function.prototype,
      u = Object.prototype,
      l = a.toString,
      c = u.hasOwnProperty,
      s = l.call(Object);

    function f(p) {
      if (!o(p) || r(p) != i) return !1;
      var d = n(p);
      if (d === null) return !0;
      var y = c.call(d, "constructor") && d.constructor;
      return typeof y == "function" && y instanceof y && l.call(y) == s
    }
    e.exports = f
  }),
  Dv = T((t, e) => {
    var r = Ne(),
      n = Be(),
      o = "[object Boolean]";

    function i(a) {
      return a === !0 || a === !1 || n(a) && r(a) == o
    }
    e.exports = i
  }),
  Iv = T((t, e) => {
    var r = Math.ceil,
      n = Math.max;

    function o(i, a, u, l) {
      for (var c = -1, s = n(r((a - i) / (u || 1)), 0), f = Array(s); s--;) f[l ? s : ++c] = i, i += u;
      return f
    }
    e.exports = o
  }),
  ds = T((t, e) => {
    var r = cs(),
      n = 1 / 0,
      o = 17976931348623157e292;

    function i(a) {
      if (!a) return a === 0 ? a : 0;
      if (a = r(a), a === n || a === -n) {
        var u = a < 0 ? -1 : 1;
        return u * o
      }
      return a === a ? a : 0
    }
    e.exports = i
  }),
  Nv = T((t, e) => {
    var r = Iv(),
      n = Wo(),
      o = ds();

    function i(a) {
      return function(u, l, c) {
        return c && typeof c != "number" && n(u, l, c) && (l = c = void 0), u = o(u), l === void 0 ? (l = u, u = 0) : l = o(l), c = c === void 0 ? u < l ? 1 : -1 : o(c), r(u, l, c, a)
      }
    }
    e.exports = i
  }),
  hs = T((t, e) => {
    var r = Nv(),
      n = r();
    e.exports = n
  }),
  Bv = T((t, e) => {
    var r = Va();

    function n(o, i) {
      var a;
      return r(o, function(u, l, c) {
        return a = i(u, l, c), !a
      }), !!a
    }
    e.exports = n
  }),
  zv = T((t, e) => {
    var r = Yc(),
      n = Ve(),
      o = Bv(),
      i = Kt(),
      a = Wo();

    function u(l, c, s) {
      var f = i(l) ? r : o;
      return s && a(l, c, s) && (c = void 0), f(l, n(c, 3))
    }
    e.exports = u
  }),
  Rv = T((t, e) => {
    var r = ls();

    function n(o, i, a) {
      i == "__proto__" && r ? r(o, i, {
        configurable: !0,
        enumerable: !0,
        value: a,
        writable: !0
      }) : o[i] = a
    }
    e.exports = n
  }),
  Wv = T((t, e) => {
    var r = Rv(),
      n = as(),
      o = Ve();

    function i(a, u) {
      var l = {};
      return u = o(u, 3), n(a, function(c, s, f) {
        r(l, s, u(c, s, f))
      }), l
    }
    e.exports = i
  }),
  Lv = T((t, e) => {
    function r(n, o) {
      for (var i = -1, a = n == null ? 0 : n.length; ++i < a;)
        if (!o(n[i], i, n)) return !1;
      return !0
    }
    e.exports = r
  }),
  $v = T((t, e) => {
    var r = Va();

    function n(o, i) {
      var a = !0;
      return r(o, function(u, l, c) {
        return a = !!i(u, l, c), a
      }), a
    }
    e.exports = n
  }),
  ys = T((t, e) => {
    var r = Lv(),
      n = $v(),
      o = Ve(),
      i = Kt(),
      a = Wo();

    function u(l, c, s) {
      var f = i(l) ? r : n;
      return s && a(l, c, s) && (c = void 0), f(l, o(c, 3))
    }
    e.exports = u
  }),
  Fv = T((t, e) => {
    var r = Ve(),
      n = gn(),
      o = Ro();

    function i(a) {
      return function(u, l, c) {
        var s = Object(u);
        if (!n(u)) {
          var f = r(l, 3);
          u = o(u), l = function(d) {
            return f(s[d], d, s)
          }
        }
        var p = a(u, l, c);
        return p > -1 ? s[f ? u[p] : p] : void 0
      }
    }
    e.exports = i
  }),
  Uv = T((t, e) => {
    var r = ds();

    function n(o) {
      var i = r(o),
        a = i % 1;
      return i === i ? a ? i - a : i : 0
    }
    e.exports = n
  }),
  qv = T((t, e) => {
    var r = os(),
      n = Ve(),
      o = Uv(),
      i = Math.max;

    function a(u, l, c) {
      var s = u == null ? 0 : u.length;
      if (!s) return -1;
      var f = c == null ? 0 : o(c);
      return f < 0 && (f = i(s + f, 0)), r(u, n(l, 3), f)
    }
    e.exports = a
  }),
  Hv = T((t, e) => {
    var r = Fv(),
      n = qv(),
      o = r(n);
    e.exports = o
  }),
  Xv = T((t, e) => {
    "use strict";
    var r = Object.prototype.hasOwnProperty,
      n = "~";

    function o() {}
    Object.create && (o.prototype = Object.create(null), new o().__proto__ || (n = !1));

    function i(c, s, f) {
      this.fn = c, this.context = s, this.once = f || !1
    }

    function a(c, s, f, p, d) {
      if (typeof f != "function") throw new TypeError("The listener must be a function");
      var y = new i(f, p || c, d),
        m = n ? n + s : s;
      return c._events[m] ? c._events[m].fn ? c._events[m] = [c._events[m], y] : c._events[m].push(y) : (c._events[m] = y, c._eventsCount++), c
    }

    function u(c, s) {
      --c._eventsCount === 0 ? c._events = new o : delete c._events[s]
    }

    function l() {
      this._events = new o, this._eventsCount = 0
    }
    l.prototype.eventNames = function() {
      var c = [],
        s, f;
      if (this._eventsCount === 0) return c;
      for (f in s = this._events) r.call(s, f) && c.push(n ? f.slice(1) : f);
      return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(s)) : c
    }, l.prototype.listeners = function(c) {
      var s = n ? n + c : c,
        f = this._events[s];
      if (!f) return [];
      if (f.fn) return [f.fn];
      for (var p = 0, d = f.length, y = new Array(d); p < d; p++) y[p] = f[p].fn;
      return y
    }, l.prototype.listenerCount = function(c) {
      var s = n ? n + c : c,
        f = this._events[s];
      return f ? f.fn ? 1 : f.length : 0
    }, l.prototype.emit = function(c, s, f, p, d, y) {
      var m = n ? n + c : c;
      if (!this._events[m]) return !1;
      var g = this._events[m],
        h = arguments.length,
        b, w;
      if (g.fn) {
        switch (g.once && this.removeListener(c, g.fn, void 0, !0), h) {
          case 1:
            return g.fn.call(g.context), !0;
          case 2:
            return g.fn.call(g.context, s), !0;
          case 3:
            return g.fn.call(g.context, s, f), !0;
          case 4:
            return g.fn.call(g.context, s, f, p), !0;
          case 5:
            return g.fn.call(g.context, s, f, p, d), !0;
          case 6:
            return g.fn.call(g.context, s, f, p, d, y), !0
        }
        for (w = 1, b = new Array(h - 1); w < h; w++) b[w - 1] = arguments[w];
        g.fn.apply(g.context, b)
      } else {
        var v = g.length,
          E;
        for (w = 0; w < v; w++) switch (g[w].once && this.removeListener(c, g[w].fn, void 0, !0), h) {
          case 1:
            g[w].fn.call(g[w].context);
            break;
          case 2:
            g[w].fn.call(g[w].context, s);
            break;
          case 3:
            g[w].fn.call(g[w].context, s, f);
            break;
          case 4:
            g[w].fn.call(g[w].context, s, f, p);
            break;
          default:
            if (!b)
              for (E = 1, b = new Array(h - 1); E < h; E++) b[E - 1] = arguments[E];
            g[w].fn.apply(g[w].context, b)
        }
      }
      return !0
    }, l.prototype.on = function(c, s, f) {
      return a(this, c, s, f, !1)
    }, l.prototype.once = function(c, s, f) {
      return a(this, c, s, f, !0)
    }, l.prototype.removeListener = function(c, s, f, p) {
      var d = n ? n + c : c;
      if (!this._events[d]) return this;
      if (!s) return u(this, d), this;
      var y = this._events[d];
      if (y.fn) y.fn === s && (!p || y.once) && (!f || y.context === f) && u(this, d);
      else {
        for (var m = 0, g = [], h = y.length; m < h; m++)(y[m].fn !== s || p && !y[m].once || f && y[m].context !== f) && g.push(y[m]);
        g.length ? this._events[d] = g.length === 1 ? g[0] : g : u(this, d)
      }
      return this
    }, l.prototype.removeAllListeners = function(c) {
      var s;
      return c ? (s = n ? n + c : c, this._events[s] && u(this, s)) : (this._events = new o, this._eventsCount = 0), this
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = n, l.EventEmitter = l, typeof e < "u" && (e.exports = l)
  });
import ir, {
  useState as It,
  useEffect as Mr,
  useCallback as ae,
  useRef as Yv
} from "./react-shim-eraudit.js";
import Ga from "./react-shim-eraudit.js";

function ms(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var o = t.length;
      for (e = 0; e < o; e++) t[e] && (r = ms(t[e])) && (n && (n += " "), n += r)
    } else
      for (r in t) t[r] && (n && (n += " "), n += r);
  return n
}

function Vv() {
  for (var t, e, r = 0, n = "", o = arguments.length; r < o; r++)(t = arguments[r]) && (e = ms(t)) && (n && (n += " "), n += e);
  return n
}
var wt = Vv,
  vs = it(_r()),
  bn = it(ve()),
  Kv = it($a()),
  Gv = it(Dt()),
  Zv = it(me()),
  Qv = it(tm());
import {
  Children as Za,
  isValidElement as Jv
} from "./react-shim-eraudit.js";
var En = it($a()),
  gs = it(Uc()),
  tg = it(_r()),
  eg = it(Fc()),
  rg = it(ve()),
  ge = function(t) {
    return t === 0 ? 0 : t > 0 ? 1 : -1
  },
  ar = function(t) {
    return (0, En.default)(t) && t.indexOf("%") === t.length - 1
  },
  tt = function(t) {
    return (0, eg.default)(t) && !(0, gs.default)(t)
  },
  ng = function(t) {
    return (0, rg.default)(t)
  },
  Bt = function(t) {
    return tt(t) || (0, En.default)(t)
  },
  og = 0,
  xn = function(t) {
    var e = ++og;
    return "".concat(t || "").concat(e)
  },
  ur = function(t, e) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!tt(t) && !(0, En.default)(t)) return r;
    var o;
    if (ar(t)) {
      var i = t.indexOf("%");
      o = e * parseFloat(t.slice(0, i)) / 100
    } else o = +t;
    return (0, gs.default)(o) && (o = r), n && o > e && (o = e), o
  },
  Ke = function(t) {
    if (!t) return null;
    var e = Object.keys(t);
    return e && e.length ? t[e[0]] : null
  },
  ig = function(t) {
    if (!Array.isArray(t)) return !1;
    for (var e = t.length, r = {}, n = 0; n < e; n++)
      if (!r[t[n]]) r[t[n]] = !0;
      else return !0;
    return !1
  },
  be = function(t, e) {
    return tt(t) && tt(e) ? function(r) {
      return t + r * (e - t)
    } : function() {
      return e
    }
  };

function $o(t, e, r) {
  return !t || !t.length ? null : t.find(function(n) {
    return n && (typeof e == "function" ? e(n) : (0, tg.default)(n, e)) === r
  })
}
var ag = function(t, e) {
  return tt(t) && tt(e) ? t - e : (0, En.default)(t) && (0, En.default)(e) ? t.localeCompare(e) : t instanceof Date && e instanceof Date ? t.getTime() - e.getTime() : String(t).localeCompare(String(e))
};

function Tr(t, e) {
  for (var r in t)
    if ({}.hasOwnProperty.call(t, r) && (!{}.hasOwnProperty.call(e, r) || t[r] !== e[r])) return !1;
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n) && !{}.hasOwnProperty.call(t, n)) return !1;
  return !0
}
var bs = it(me());
import {
  isValidElement as ug
} from "./react-shim-eraudit.js";

function Qa(t) {
  "@babel/helpers - typeof";
  return Qa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Qa(t)
}
var lg = ["viewBox", "children"],
  cg = ["aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "className", "color", "height", "id", "lang", "max", "media", "method", "min", "name", "style", "target", "width", "role", "tabIndex", "accentHeight", "accumulate", "additive", "alignmentBaseline", "allowReorder", "alphabetic", "amplitude", "arabicForm", "ascent", "attributeName", "attributeType", "autoReverse", "azimuth", "baseFrequency", "baselineShift", "baseProfile", "bbox", "begin", "bias", "by", "calcMode", "capHeight", "clip", "clipPath", "clipPathUnits", "clipRule", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "contentScriptType", "contentStyleType", "cursor", "cx", "cy", "d", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominantBaseline", "dur", "dx", "dy", "edgeMode", "elevation", "enableBackground", "end", "exponent", "externalResourcesRequired", "fill", "fillOpacity", "fillRule", "filter", "filterRes", "filterUnits", "floodColor", "floodOpacity", "focusable", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "format", "from", "fx", "fy", "g1", "g2", "glyphName", "glyphOrientationHorizontal", "glyphOrientationVertical", "glyphRef", "gradientTransform", "gradientUnits", "hanging", "horizAdvX", "horizOriginX", "href", "ideographic", "imageRendering", "in2", "in", "intercept", "k1", "k2", "k3", "k4", "k", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letterSpacing", "lightingColor", "limitingConeAngle", "local", "markerEnd", "markerHeight", "markerMid", "markerStart", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "mode", "numOctaves", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlinePosition", "overlineThickness", "paintOrder", "panose1", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointerEvents", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "r", "radius", "refX", "refY", "renderingIntent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "result", "rotate", "rx", "ry", "seed", "shapeRendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stopColor", "stopOpacity", "strikethroughPosition", "strikethroughThickness", "string", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textAnchor", "textDecoration", "textLength", "textRendering", "to", "transform", "u1", "u2", "underlinePosition", "underlineThickness", "unicode", "unicodeBidi", "unicodeRange", "unitsPerEm", "vAlphabetic", "values", "vectorEffect", "version", "vertAdvY", "vertOriginX", "vertOriginY", "vHanging", "vIdeographic", "viewTarget", "visibility", "vMathematical", "widths", "wordSpacing", "writingMode", "x1", "x2", "x", "xChannelSelector", "xHeight", "xlinkActuate", "xlinkArcrole", "xlinkHref", "xlinkRole", "xlinkShow", "xlinkTitle", "xlinkType", "xmlBase", "xmlLang", "xmlns", "xmlnsXlink", "xmlSpace", "y1", "y2", "y", "yChannelSelector", "z", "zoomAndPan", "ref", "key", "angle"],
  Es = ["points", "pathLength"],
  sg = {
    svg: lg,
    polygon: Es,
    polyline: Es
  },
  Ja = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"],
  Fo = function(t, e) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var r = t;
    if (ug(t) && (r = t.props), !(0, bs.default)(r)) return null;
    var n = {};
    return Object.keys(r).forEach(function(o) {
      Ja.includes(o) && (n[o] = e || function(i) {
        return r[o](r, i)
      })
    }), n
  },
  fg = function(t, e, r) {
    return function(n) {
      return t(e, r, n), null
    }
  },
  Uo = function(t, e, r) {
    if (!(0, bs.default)(t) || Qa(t) !== "object") return null;
    var n = null;
    return Object.keys(t).forEach(function(o) {
      var i = t[o];
      Ja.includes(o) && typeof i == "function" && (n || (n = {}), n[o] = fg(i, e, r))
    }), n
  },
  pg = ["children"],
  dg = ["children"];

function xs(t, e) {
  if (t == null) return {};
  var r = hg(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function hg(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function tu(t) {
  "@babel/helpers - typeof";
  return tu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, tu(t)
}
var ws = {
    click: "onClick",
    mousedown: "onMouseDown",
    mouseup: "onMouseUp",
    mouseover: "onMouseOver",
    mousemove: "onMouseMove",
    mouseout: "onMouseOut",
    mouseenter: "onMouseEnter",
    mouseleave: "onMouseLeave",
    touchcancel: "onTouchCancel",
    touchend: "onTouchEnd",
    touchmove: "onTouchMove",
    touchstart: "onTouchStart",
    contextmenu: "onContextMenu",
    dblclick: "onDoubleClick"
  },
  ze = function(t) {
    return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : ""
  },
  Os = null,
  eu = null,
  ru = function t(e) {
    if (e === Os && Array.isArray(eu)) return eu;
    var r = [];
    return Za.forEach(e, function(n) {
      (0, bn.default)(n) || ((0, Qv.isFragment)(n) ? r = r.concat(t(n.props.children)) : r.push(n))
    }), eu = r, Os = e, r
  };

function ue(t, e) {
  var r = [],
    n = [];
  return Array.isArray(e) ? n = e.map(function(o) {
    return ze(o)
  }) : n = [ze(e)], ru(t).forEach(function(o) {
    var i = (0, vs.default)(o, "type.displayName") || (0, vs.default)(o, "type.name");
    n.indexOf(i) !== -1 && r.push(o)
  }), r
}

function te(t, e) {
  var r = ue(t, e);
  return r && r[0]
}
var Ss = function(t) {
    if (!t || !t.props) return !1;
    var e = t.props,
      r = e.width,
      n = e.height;
    return !(!tt(r) || r <= 0 || !tt(n) || n <= 0)
  },
  yg = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"],
  mg = function(t) {
    return t && t.type && (0, Kv.default)(t.type) && yg.indexOf(t.type) >= 0
  },
  vg = function(t) {
    return t && tu(t) === "object" && "clipDot" in t
  },
  gg = function(t, e, r, n) {
    var o, i = (o = sg?.[n]) !== null && o !== void 0 ? o : [];
    return e.startsWith("data-") || !(0, Gv.default)(t) && (n && i.includes(e) || cg.includes(e)) || r && Ja.includes(e)
  },
  Et = function(t, e, r) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var n = t;
    if (Jv(t) && (n = t.props), !(0, Zv.default)(n)) return null;
    var o = {};
    return Object.keys(n).forEach(function(i) {
      var a;
      gg((a = n) === null || a === void 0 ? void 0 : a[i], i, e, r) && (o[i] = n[i])
    }), o
  },
  nu = function t(e, r) {
    if (e === r) return !0;
    var n = Za.count(e);
    if (n !== Za.count(r)) return !1;
    if (n === 0) return !0;
    if (n === 1) return js(Array.isArray(e) ? e[0] : e, Array.isArray(r) ? r[0] : r);
    for (var o = 0; o < n; o++) {
      var i = e[o],
        a = r[o];
      if (Array.isArray(i) || Array.isArray(a)) {
        if (!t(i, a)) return !1
      } else if (!js(i, a)) return !1
    }
    return !0
  },
  js = function(t, e) {
    if ((0, bn.default)(t) && (0, bn.default)(e)) return !0;
    if (!(0, bn.default)(t) && !(0, bn.default)(e)) {
      var r = t.props || {},
        n = r.children,
        o = xs(r, pg),
        i = e.props || {},
        a = i.children,
        u = xs(i, dg);
      return n && a ? Tr(o, u) && nu(n, a) : !n && !a ? Tr(o, u) : !1
    }
    return !1
  },
  As = function(t, e) {
    var r = [],
      n = {};
    return ru(t).forEach(function(o, i) {
      if (mg(o)) r.push(o);
      else if (o) {
        var a = ze(o.type),
          u = e[a] || {},
          l = u.handler,
          c = u.once;
        if (l && (!c || !n[a])) {
          var s = l(o, a, i);
          r.push(s), n[a] = !0
        }
      }
    }), r
  },
  bg = function(t) {
    var e = t && t.type;
    return e && ws[e] ? ws[e] : null
  },
  Eg = function(t, e) {
    return ru(e).indexOf(t)
  },
  xg = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];

function ou() {
  return ou = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, ou.apply(this, arguments)
}

function wg(t, e) {
  if (t == null) return {};
  var r = Og(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function Og(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function iu(t) {
  var e = t.children,
    r = t.width,
    n = t.height,
    o = t.viewBox,
    i = t.className,
    a = t.style,
    u = t.title,
    l = t.desc,
    c = wg(t, xg),
    s = o || {
      width: r,
      height: n,
      x: 0,
      y: 0
    },
    f = wt("recharts-surface", i);
  return Ga.createElement("svg", ou({}, Et(c, !0, "svg"), {
    className: f,
    width: r,
    height: n,
    style: a,
    viewBox: "".concat(s.x, " ").concat(s.y, " ").concat(s.width, " ").concat(s.height)
  }), Ga.createElement("title", null, u), Ga.createElement("desc", null, l), e)
}
import Ps from "./react-shim-eraudit.js";
var Sg = ["children", "className"];

function au() {
  return au = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, au.apply(this, arguments)
}

function jg(t, e) {
  if (t == null) return {};
  var r = Ag(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function Ag(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var Ct = Ps.forwardRef(function(t, e) {
  var r = t.children,
    n = t.className,
    o = jg(t, Sg),
    i = wt("recharts-layer", n);
  return Ps.createElement("g", au({
    className: i
  }, Et(o, !0), {
    ref: e
  }), r)
});
import wn, {
  PureComponent as Pg
} from "./react-shim-eraudit.js";
var _s = it(Dt());
import ke, {
  PureComponent as _g
} from "./react-shim-eraudit.js";
var kg = !1,
  Re = function(t, e) {
    for (var r = arguments.length, n = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) n[o - 2] = arguments[o];
    if (kg && typeof console < "u" && console.warn && (e === void 0 && console.warn("LogUtils requires an error message argument"), !t))
      if (e === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var i = 0;
        console.warn(e.replace(/%s/g, function() {
          return n[i++]
        }))
      }
  },
  ks = it(Fa());
import Mg from "./react-shim-eraudit.js";

function _t(t) {
  return function() {
    return t
  }
}
var Ms = Math.cos,
  qo = Math.sin,
  Ee = Math.sqrt,
  On = Math.PI,
  g4 = On / 2,
  Ho = 2 * On,
  uu = Math.PI,
  lu = 2 * uu,
  lr = 1e-6,
  Tg = lu - lr;

function Ts(t) {
  this._ += t[0];
  for (let e = 1, r = t.length; e < r; ++e) this._ += arguments[e] + t[e]
}

function Cg(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Ts;
  let r = 10 ** e;
  return function(n) {
    this._ += n[0];
    for (let o = 1, i = n.length; o < i; ++o) this._ += Math.round(arguments[o] * r) / r + n[o]
  }
}
var cu = class {
  constructor(t) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Ts : Cg(t)
  }
  moveTo(t, e) {
    this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`)
  }
  lineTo(t, e) {
    this._append`L${this._x1=+t},${this._y1=+e}`
  }
  quadraticCurveTo(t, e, r, n) {
    this._append`Q${+t},${+e},${this._x1=+r},${this._y1=+n}`
  }
  bezierCurveTo(t, e, r, n, o, i) {
    this._append`C${+t},${+e},${+r},${+n},${this._x1=+o},${this._y1=+i}`
  }
  arcTo(t, e, r, n, o) {
    if (t = +t, e = +e, r = +r, n = +n, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let i = this._x1,
      a = this._y1,
      u = r - t,
      l = n - e,
      c = i - t,
      s = a - e,
      f = c * c + s * s;
    if (this._x1 === null) this._append`M${this._x1=t},${this._y1=e}`;
    else if (f > lr)
      if (!(Math.abs(s * u - l * c) > lr) || !o) this._append`L${this._x1=t},${this._y1=e}`;
      else {
        let p = r - i,
          d = n - a,
          y = u * u + l * l,
          m = p * p + d * d,
          g = Math.sqrt(y),
          h = Math.sqrt(f),
          b = o * Math.tan((uu - Math.acos((y + f - m) / (2 * g * h))) / 2),
          w = b / h,
          v = b / g;
        Math.abs(w - 1) > lr && this._append`L${t+w*c},${e+w*s}`, this._append`A${o},${o},0,0,${+(s*p>c*d)},${this._x1=t+v*u},${this._y1=e+v*l}`
      }
  }
  arc(t, e, r, n, o, i) {
    if (t = +t, e = +e, r = +r, i = !!i, r < 0) throw new Error(`negative radius: ${r}`);
    let a = r * Math.cos(n),
      u = r * Math.sin(n),
      l = t + a,
      c = e + u,
      s = 1 ^ i,
      f = i ? n - o : o - n;
    this._x1 === null ? this._append`M${l},${c}` : (Math.abs(this._x1 - l) > lr || Math.abs(this._y1 - c) > lr) && this._append`L${l},${c}`, r && (f < 0 && (f = f % lu + lu), f > Tg ? this._append`A${r},${r},0,1,${s},${t-a},${e-u}A${r},${r},0,1,${s},${this._x1=l},${this._y1=c}` : f > lr && this._append`A${r},${r},0,${+(f>=uu)},${s},${this._x1=t+r*Math.cos(o)},${this._y1=e+r*Math.sin(o)}`)
  }
  rect(t, e, r, n) {
    this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${r=+r}v${+n}h${-r}Z`
  }
  toString() {
    return this._
  }
};

function Dg() {
  return new cu
}
Dg.prototype = cu.prototype;

function su(t) {
  let e = 3;
  return t.digits = function(r) {
    if (!arguments.length) return e;
    if (r == null) e = null;
    else {
      let n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      e = n
    }
    return t
  }, () => new cu(e)
}
var b4 = Array.prototype.slice;

function fu(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t)
}

function Cs(t) {
  this._context = t
}
Cs.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._point = 0
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(t, e);
        break
    }
  }
};

function Xo(t) {
  return new Cs(t)
}

function Ds(t) {
  return t[0]
}

function Is(t) {
  return t[1]
}

function Ns(t, e) {
  var r = _t(!0),
    n = null,
    o = Xo,
    i = null,
    a = su(u);
  t = typeof t == "function" ? t : t === void 0 ? Ds : _t(t), e = typeof e == "function" ? e : e === void 0 ? Is : _t(e);

  function u(l) {
    var c, s = (l = fu(l)).length,
      f, p = !1,
      d;
    for (n == null && (i = o(d = a())), c = 0; c <= s; ++c) !(c < s && r(f = l[c], c, l)) === p && ((p = !p) ? i.lineStart() : i.lineEnd()), p && i.point(+t(f, c, l), +e(f, c, l));
    if (d) return i = null, d + "" || null
  }
  return u.x = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : _t(+l), u) : t
  }, u.y = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : _t(+l), u) : e
  }, u.defined = function(l) {
    return arguments.length ? (r = typeof l == "function" ? l : _t(!!l), u) : r
  }, u.curve = function(l) {
    return arguments.length ? (o = l, n != null && (i = o(n)), u) : o
  }, u.context = function(l) {
    return arguments.length ? (l == null ? n = i = null : i = o(n = l), u) : n
  }, u
}

function Yo(t, e, r) {
  var n = null,
    o = _t(!0),
    i = null,
    a = Xo,
    u = null,
    l = su(c);
  t = typeof t == "function" ? t : t === void 0 ? Ds : _t(+t), e = typeof e == "function" ? e : _t(e === void 0 ? 0 : +e), r = typeof r == "function" ? r : r === void 0 ? Is : _t(+r);

  function c(f) {
    var p, d, y, m = (f = fu(f)).length,
      g, h = !1,
      b, w = new Array(m),
      v = new Array(m);
    for (i == null && (u = a(b = l())), p = 0; p <= m; ++p) {
      if (!(p < m && o(g = f[p], p, f)) === h)
        if (h = !h) d = p, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), y = p - 1; y >= d; --y) u.point(w[y], v[y]);
          u.lineEnd(), u.areaEnd()
        } h && (w[p] = +t(g, p, f), v[p] = +e(g, p, f), u.point(n ? +n(g, p, f) : w[p], r ? +r(g, p, f) : v[p]))
    }
    if (b) return u = null, b + "" || null
  }

  function s() {
    return Ns().defined(o).curve(a).context(i)
  }
  return c.x = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : _t(+f), n = null, c) : t
  }, c.x0 = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : _t(+f), c) : t
  }, c.x1 = function(f) {
    return arguments.length ? (n = f == null ? null : typeof f == "function" ? f : _t(+f), c) : n
  }, c.y = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : _t(+f), r = null, c) : e
  }, c.y0 = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : _t(+f), c) : e
  }, c.y1 = function(f) {
    return arguments.length ? (r = f == null ? null : typeof f == "function" ? f : _t(+f), c) : r
  }, c.lineX0 = c.lineY0 = function() {
    return s().x(t).y(e)
  }, c.lineY1 = function() {
    return s().x(t).y(r)
  }, c.lineX1 = function() {
    return s().x(n).y(e)
  }, c.defined = function(f) {
    return arguments.length ? (o = typeof f == "function" ? f : _t(!!f), c) : o
  }, c.curve = function(f) {
    return arguments.length ? (a = f, i != null && (u = a(i)), c) : a
  }, c.context = function(f) {
    return arguments.length ? (f == null ? i = u = null : u = a(i = f), c) : i
  }, c
}
var Bs = class {
  constructor(t, e) {
    this._context = t, this._x = e
  }
  areaStart() {
    this._line = 0
  }
  areaEnd() {
    this._line = NaN
  }
  lineStart() {
    this._point = 0
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line
  }
  point(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, e, t, e) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + e) / 2, t, this._y0, t, e);
        break
      }
    }
    this._x0 = t, this._y0 = e
  }
};

function Ig(t) {
  return new Bs(t, !0)
}

function Ng(t) {
  return new Bs(t, !1)
}
var pu = {
    draw(t, e) {
      let r = Ee(e / On);
      t.moveTo(r, 0), t.arc(0, 0, r, 0, Ho)
    }
  },
  Bg = {
    draw(t, e) {
      let r = Ee(e / 5) / 2;
      t.moveTo(-3 * r, -r), t.lineTo(-r, -r), t.lineTo(-r, -3 * r), t.lineTo(r, -3 * r), t.lineTo(r, -r), t.lineTo(3 * r, -r), t.lineTo(3 * r, r), t.lineTo(r, r), t.lineTo(r, 3 * r), t.lineTo(-r, 3 * r), t.lineTo(-r, r), t.lineTo(-3 * r, r), t.closePath()
    }
  },
  zs = Ee(1 / 3),
  zg = zs * 2,
  Rg = {
    draw(t, e) {
      let r = Ee(e / zg),
        n = r * zs;
      t.moveTo(0, -r), t.lineTo(n, 0), t.lineTo(0, r), t.lineTo(-n, 0), t.closePath()
    }
  },
  Wg = {
    draw(t, e) {
      let r = Ee(e),
        n = -r / 2;
      t.rect(n, n, r, r)
    }
  },
  Lg = .8908130915292852,
  Rs = qo(On / 10) / qo(7 * On / 10),
  $g = qo(Ho / 10) * Rs,
  Fg = -Ms(Ho / 10) * Rs,
  Ug = {
    draw(t, e) {
      let r = Ee(e * Lg),
        n = $g * r,
        o = Fg * r;
      t.moveTo(0, -r), t.lineTo(n, o);
      for (let i = 1; i < 5; ++i) {
        let a = Ho * i / 5,
          u = Ms(a),
          l = qo(a);
        t.lineTo(l * r, -u * r), t.lineTo(u * n - l * o, l * n + u * o)
      }
      t.closePath()
    }
  },
  du = Ee(3),
  qg = {
    draw(t, e) {
      let r = -Ee(e / (du * 3));
      t.moveTo(0, r * 2), t.lineTo(-du * r, -r), t.lineTo(du * r, -r), t.closePath()
    }
  },
  le = -.5,
  ce = Ee(3) / 2,
  hu = 1 / Ee(12),
  Hg = (hu / 2 + 1) * 3,
  Xg = {
    draw(t, e) {
      let r = Ee(e / Hg),
        n = r / 2,
        o = r * hu,
        i = n,
        a = r * hu + r,
        u = -i,
        l = a;
      t.moveTo(n, o), t.lineTo(i, a), t.lineTo(u, l), t.lineTo(le * n - ce * o, ce * n + le * o), t.lineTo(le * i - ce * a, ce * i + le * a), t.lineTo(le * u - ce * l, ce * u + le * l), t.lineTo(le * n + ce * o, le * o - ce * n), t.lineTo(le * i + ce * a, le * a - ce * i), t.lineTo(le * u + ce * l, le * l - ce * u), t.closePath()
    }
  };

function Yg(t, e) {
  let r = null,
    n = su(o);
  t = typeof t == "function" ? t : _t(t || pu), e = typeof e == "function" ? e : _t(e === void 0 ? 64 : +e);

  function o() {
    let i;
    if (r || (r = i = n()), t.apply(this, arguments).draw(r, +e.apply(this, arguments)), i) return r = null, i + "" || null
  }
  return o.type = function(i) {
    return arguments.length ? (t = typeof i == "function" ? i : _t(i), o) : t
  }, o.size = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : _t(+i), o) : e
  }, o.context = function(i) {
    return arguments.length ? (r = i ?? null, o) : r
  }, o
}

function Vo() {}

function Ko(t, e, r) {
  t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + e) / 6, (t._y0 + 4 * t._y1 + r) / 6)
}

function Ws(t) {
  this._context = t
}
Ws.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        Ko(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break
    }(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        Ko(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function Vg(t) {
  return new Ws(t)
}

function Ls(t) {
  this._context = t
}
Ls.prototype = {
  areaStart: Vo,
  areaEnd: Vo,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break
      }
    }
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._x2 = t, this._y2 = e;
        break;
      case 1:
        this._point = 2, this._x3 = t, this._y3 = e;
        break;
      case 2:
        this._point = 3, this._x4 = t, this._y4 = e, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + e) / 6);
        break;
      default:
        Ko(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function Kg(t) {
  return new Ls(t)
}

function $s(t) {
  this._context = t
}
$s.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + t) / 6,
          n = (this._y0 + 4 * this._y1 + e) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      default:
        Ko(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function Gg(t) {
  return new $s(t)
}

function Fs(t) {
  this._context = t
}
Fs.prototype = {
  areaStart: Vo,
  areaEnd: Vo,
  lineStart: function() {
    this._point = 0
  },
  lineEnd: function() {
    this._point && this._context.closePath()
  },
  point: function(t, e) {
    t = +t, e = +e, this._point ? this._context.lineTo(t, e) : (this._point = 1, this._context.moveTo(t, e))
  }
};

function Zg(t) {
  return new Fs(t)
}

function Us(t) {
  return t < 0 ? -1 : 1
}

function qs(t, e, r) {
  var n = t._x1 - t._x0,
    o = e - t._x1,
    i = (t._y1 - t._y0) / (n || o < 0 && -0),
    a = (r - t._y1) / (o || n < 0 && -0),
    u = (i * o + a * n) / (n + o);
  return (Us(i) + Us(a)) * Math.min(Math.abs(i), Math.abs(a), .5 * Math.abs(u)) || 0
}

function Hs(t, e) {
  var r = t._x1 - t._x0;
  return r ? (3 * (t._y1 - t._y0) / r - e) / 2 : e
}

function yu(t, e, r) {
  var n = t._x0,
    o = t._y0,
    i = t._x1,
    a = t._y1,
    u = (i - n) / 3;
  t._context.bezierCurveTo(n + u, o + u * e, i - u, a - u * r, i, a)
}

function Go(t) {
  this._context = t
}
Go.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        yu(this, this._t0, Hs(this, this._t0));
        break
    }(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line
  },
  point: function(t, e) {
    var r = NaN;
    if (t = +t, e = +e, !(t === this._x1 && e === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, yu(this, Hs(this, r = qs(this, t, e)), r);
          break;
        default:
          yu(this, this._t0, r = qs(this, t, e));
          break
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = r
    }
  }
};

function Xs(t) {
  this._context = new Ys(t)
}(Xs.prototype = Object.create(Go.prototype)).point = function(t, e) {
  Go.prototype.point.call(this, e, t)
};

function Ys(t) {
  this._context = t
}
Ys.prototype = {
  moveTo: function(t, e) {
    this._context.moveTo(e, t)
  },
  closePath: function() {
    this._context.closePath()
  },
  lineTo: function(t, e) {
    this._context.lineTo(e, t)
  },
  bezierCurveTo: function(t, e, r, n, o, i) {
    this._context.bezierCurveTo(e, t, n, r, i, o)
  }
};

function Qg(t) {
  return new Go(t)
}

function Jg(t) {
  return new Xs(t)
}

function Vs(t) {
  this._context = t
}
Vs.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._x = [], this._y = []
  },
  lineEnd: function() {
    var t = this._x,
      e = this._y,
      r = t.length;
    if (r)
      if (this._line ? this._context.lineTo(t[0], e[0]) : this._context.moveTo(t[0], e[0]), r === 2) this._context.lineTo(t[1], e[1]);
      else
        for (var n = Ks(t), o = Ks(e), i = 0, a = 1; a < r; ++i, ++a) this._context.bezierCurveTo(n[0][i], o[0][i], n[1][i], o[1][i], t[a], e[a]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e)
  }
};

function Ks(t) {
  var e, r = t.length - 1,
    n, o = new Array(r),
    i = new Array(r),
    a = new Array(r);
  for (o[0] = 0, i[0] = 2, a[0] = t[0] + 2 * t[1], e = 1; e < r - 1; ++e) o[e] = 1, i[e] = 4, a[e] = 4 * t[e] + 2 * t[e + 1];
  for (o[r - 1] = 2, i[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], e = 1; e < r; ++e) n = o[e] / i[e - 1], i[e] -= n, a[e] -= n * a[e - 1];
  for (o[r - 1] = a[r - 1] / i[r - 1], e = r - 2; e >= 0; --e) o[e] = (a[e] - o[e + 1]) / i[e];
  for (i[r - 1] = (t[r] + o[r - 1]) / 2, e = 0; e < r - 1; ++e) i[e] = 2 * t[e + 1] - o[e + 1];
  return [o, i]
}

function tb(t) {
  return new Vs(t)
}

function Zo(t, e) {
  this._context = t, this._t = e
}
Zo.prototype = {
  areaStart: function() {
    this._line = 0
  },
  areaEnd: function() {
    this._line = NaN
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line)
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) this._context.lineTo(this._x, e), this._context.lineTo(t, e);
        else {
          var r = this._x * (1 - this._t) + t * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, e)
        }
        break
      }
    }
    this._x = t, this._y = e
  }
};

function eb(t) {
  return new Zo(t, .5)
}

function rb(t) {
  return new Zo(t, 0)
}

function nb(t) {
  return new Zo(t, 1)
}

function Cr(t, e) {
  if ((a = t.length) > 1)
    for (var r = 1, n, o, i = t[e[0]], a, u = i.length; r < a; ++r)
      for (o = i, i = t[e[r]], n = 0; n < u; ++n) i[n][1] += i[n][0] = isNaN(o[n][1]) ? o[n][0] : o[n][1]
}

function mu(t) {
  for (var e = t.length, r = new Array(e); --e >= 0;) r[e] = e;
  return r
}

function ob(t, e) {
  return t[e]
}

function ib(t) {
  let e = [];
  return e.key = t, e
}

function ab() {
  var t = _t([]),
    e = mu,
    r = Cr,
    n = ob;

  function o(i) {
    var a = Array.from(t.apply(this, arguments), ib),
      u, l = a.length,
      c = -1,
      s;
    for (let f of i)
      for (u = 0, ++c; u < l; ++u)(a[u][c] = [0, +n(f, a[u].key, c, i)]).data = f;
    for (u = 0, s = fu(e(a)); u < l; ++u) a[s[u]].index = u;
    return r(a, s), a
  }
  return o.keys = function(i) {
    return arguments.length ? (t = typeof i == "function" ? i : _t(Array.from(i)), o) : t
  }, o.value = function(i) {
    return arguments.length ? (n = typeof i == "function" ? i : _t(+i), o) : n
  }, o.order = function(i) {
    return arguments.length ? (e = i == null ? mu : typeof i == "function" ? i : _t(Array.from(i)), o) : e
  }, o.offset = function(i) {
    return arguments.length ? (r = i ?? Cr, o) : r
  }, o
}

function ub(t, e) {
  if ((n = t.length) > 0) {
    for (var r, n, o = 0, i = t[0].length, a; o < i; ++o) {
      for (a = r = 0; r < n; ++r) a += t[r][o][1] || 0;
      if (a)
        for (r = 0; r < n; ++r) t[r][o][1] /= a
    }
    Cr(t, e)
  }
}

function lb(t, e) {
  if ((o = t.length) > 0) {
    for (var r = 0, n = t[e[0]], o, i = n.length; r < i; ++r) {
      for (var a = 0, u = 0; a < o; ++a) u += t[a][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2
    }
    Cr(t, e)
  }
}

function cb(t, e) {
  if (!(!((a = t.length) > 0) || !((i = (o = t[e[0]]).length) > 0))) {
    for (var r = 0, n = 1, o, i, a; n < i; ++n) {
      for (var u = 0, l = 0, c = 0; u < a; ++u) {
        for (var s = t[e[u]], f = s[n][1] || 0, p = s[n - 1][1] || 0, d = (f - p) / 2, y = 0; y < u; ++y) {
          var m = t[e[y]],
            g = m[n][1] || 0,
            h = m[n - 1][1] || 0;
          d += g - h
        }
        l += f, c += d * f
      }
      o[n - 1][1] += o[n - 1][0] = r, l && (r -= c / l)
    }
    o[n - 1][1] += o[n - 1][0] = r, Cr(t, e)
  }
}

function Sn(t) {
  "@babel/helpers - typeof";
  return Sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Sn(t)
}
var sb = ["type", "size", "sizeType"];

function vu() {
  return vu = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, vu.apply(this, arguments)
}

function Gs(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Zs(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Gs(Object(r), !0).forEach(function(n) {
      fb(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Gs(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function fb(t, e, r) {
  return e = pb(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function pb(t) {
  var e = db(t, "string");
  return Sn(e) == "symbol" ? e : e + ""
}

function db(t, e) {
  if (Sn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Sn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function hb(t, e) {
  if (t == null) return {};
  var r = yb(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function yb(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var Qs = {
    symbolCircle: pu,
    symbolCross: Bg,
    symbolDiamond: Rg,
    symbolSquare: Wg,
    symbolStar: Ug,
    symbolTriangle: qg,
    symbolWye: Xg
  },
  mb = Math.PI / 180,
  vb = function(t) {
    var e = "symbol".concat((0, ks.default)(t));
    return Qs[e] || pu
  },
  gb = function(t, e, r) {
    if (e === "area") return t;
    switch (r) {
      case "cross":
        return 5 * t * t / 9;
      case "diamond":
        return .5 * t * t / Math.sqrt(3);
      case "square":
        return t * t;
      case "star": {
        var n = 18 * mb;
        return 1.25 * t * t * (Math.tan(n) - Math.tan(n * 2) * Math.pow(Math.tan(n), 2))
      }
      case "triangle":
        return Math.sqrt(3) * t * t / 4;
      case "wye":
        return (21 - 10 * Math.sqrt(3)) * t * t / 8;
      default:
        return Math.PI * t * t / 4
    }
  },
  bb = function(t, e) {
    Qs["symbol".concat((0, ks.default)(t))] = e
  },
  gu = function(t) {
    var e = t.type,
      r = e === void 0 ? "circle" : e,
      n = t.size,
      o = n === void 0 ? 64 : n,
      i = t.sizeType,
      a = i === void 0 ? "area" : i,
      u = hb(t, sb),
      l = Zs(Zs({}, u), {}, {
        type: r,
        size: o,
        sizeType: a
      }),
      c = function() {
        var y = vb(r),
          m = Yg().type(y).size(gb(o, a, r));
        return m()
      },
      s = l.className,
      f = l.cx,
      p = l.cy,
      d = Et(l, !0);
    return f === +f && p === +p && o === +o ? Mg.createElement("path", vu({}, d, {
      className: wt("recharts-symbols", s),
      transform: "translate(".concat(f, ", ").concat(p, ")"),
      d: c()
    })) : null
  };
gu.registerSymbol = bb;

function Dr(t) {
  "@babel/helpers - typeof";
  return Dr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Dr(t)
}

function bu() {
  return bu = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, bu.apply(this, arguments)
}

function Js(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Eb(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Js(Object(r), !0).forEach(function(n) {
      jn(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Js(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function xb(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function tf(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, rf(n.key), n)
  }
}

function wb(t, e, r) {
  return e && tf(t.prototype, e), r && tf(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function Ob(t, e, r) {
  return e = Qo(e), Sb(t, ef() ? Reflect.construct(e, r || [], Qo(t).constructor) : e.apply(t, r))
}

function Sb(t, e) {
  if (e && (Dr(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return jb(t)
}

function jb(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function ef() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (ef = function() {
    return !!t
  })()
}

function Qo(t) {
  return Qo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, Qo(t)
}

function Ab(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Eu(t, e)
}

function Eu(t, e) {
  return Eu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, Eu(t, e)
}

function jn(t, e, r) {
  return e = rf(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function rf(t) {
  var e = Pb(t, "string");
  return Dr(e) == "symbol" ? e : e + ""
}

function Pb(t, e) {
  if (Dr(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Dr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var se = 32,
  xu = (function(t) {
    function e() {
      return xb(this, e), Ob(this, e, arguments)
    }
    return Ab(e, t), wb(e, [{
      key: "renderIcon",
      value: function(r) {
        var n = this.props.inactiveColor,
          o = se / 2,
          i = se / 6,
          a = se / 3,
          u = r.inactive ? n : r.color;
        if (r.type === "plainline") return ke.createElement("line", {
          strokeWidth: 4,
          fill: "none",
          stroke: u,
          strokeDasharray: r.payload.strokeDasharray,
          x1: 0,
          y1: o,
          x2: se,
          y2: o,
          className: "recharts-legend-icon"
        });
        if (r.type === "line") return ke.createElement("path", {
          strokeWidth: 4,
          fill: "none",
          stroke: u,
          d: "M0,".concat(o, "h").concat(a, `
            A`).concat(i, ",").concat(i, ",0,1,1,").concat(2 * a, ",").concat(o, `
            H`).concat(se, "M").concat(2 * a, ",").concat(o, `
            A`).concat(i, ",").concat(i, ",0,1,1,").concat(a, ",").concat(o),
          className: "recharts-legend-icon"
        });
        if (r.type === "rect") return ke.createElement("path", {
          stroke: "none",
          fill: u,
          d: "M0,".concat(se / 8, "h").concat(se, "v").concat(se * 3 / 4, "h").concat(-se, "z"),
          className: "recharts-legend-icon"
        });
        if (ke.isValidElement(r.legendIcon)) {
          var l = Eb({}, r);
          return delete l.legendIcon, ke.cloneElement(r.legendIcon, l)
        }
        return ke.createElement(gu, {
          fill: u,
          cx: o,
          cy: o,
          size: se,
          sizeType: "diameter",
          type: r.type
        })
      }
    }, {
      key: "renderItems",
      value: function() {
        var r = this,
          n = this.props,
          o = n.payload,
          i = n.iconSize,
          a = n.layout,
          u = n.formatter,
          l = n.inactiveColor,
          c = {
            x: 0,
            y: 0,
            width: se,
            height: se
          },
          s = {
            display: a === "horizontal" ? "inline-block" : "block",
            marginRight: 10
          },
          f = {
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: 4
          };
        return o.map(function(p, d) {
          var y = p.formatter || u,
            m = wt(jn(jn({
              "recharts-legend-item": !0
            }, "legend-item-".concat(d), !0), "inactive", p.inactive));
          if (p.type === "none") return null;
          var g = (0, _s.default)(p.value) ? null : p.value;
          Re(!(0, _s.default)(p.value), `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`);
          var h = p.inactive ? l : p.color;
          return ke.createElement("li", bu({
            className: m,
            style: s,
            key: "legend-item-".concat(d)
          }, Uo(r.props, p, d)), ke.createElement(iu, {
            width: i,
            height: i,
            viewBox: c,
            style: f
          }, r.renderIcon(p)), ke.createElement("span", {
            className: "recharts-legend-item-text",
            style: {
              color: h
            }
          }, y ? y(g, p, d) : g))
        })
      }
    }, {
      key: "render",
      value: function() {
        var r = this.props,
          n = r.payload,
          o = r.layout,
          i = r.align;
        if (!n || !n.length) return null;
        var a = {
          padding: 0,
          margin: 0,
          textAlign: o === "horizontal" ? i : "left"
        };
        return ke.createElement("ul", {
          className: "recharts-default-legend",
          style: a
        }, this.renderItems())
      }
    }])
  })(_g);
jn(xu, "displayName", "Legend"), jn(xu, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var nf = it(ev()),
  _b = it(Dt());

function of(t, e, r) {
  return e === !0 ? (0, nf.default)(t, r) : (0, _b.default)(e) ? (0, nf.default)(t, e) : t
}

function Ir(t) {
  "@babel/helpers - typeof";
  return Ir = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ir(t)
}
var kb = ["ref"];

function af(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function We(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? af(Object(r), !0).forEach(function(n) {
      ti(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : af(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Mb(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function uf(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, cf(n.key), n)
  }
}

function Tb(t, e, r) {
  return e && uf(t.prototype, e), r && uf(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function Cb(t, e, r) {
  return e = Jo(e), Db(t, lf() ? Reflect.construct(e, r || [], Jo(t).constructor) : e.apply(t, r))
}

function Db(t, e) {
  if (e && (Ir(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Ib(t)
}

function Ib(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function lf() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (lf = function() {
    return !!t
  })()
}

function Jo(t) {
  return Jo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, Jo(t)
}

function Nb(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && wu(t, e)
}

function wu(t, e) {
  return wu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, wu(t, e)
}

function ti(t, e, r) {
  return e = cf(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function cf(t) {
  var e = Bb(t, "string");
  return Ir(e) == "symbol" ? e : e + ""
}

function Bb(t, e) {
  if (Ir(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ir(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function zb(t, e) {
  if (t == null) return {};
  var r = Rb(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function Rb(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Wb(t) {
  return t.value
}

function Lb(t, e) {
  if (wn.isValidElement(t)) return wn.cloneElement(t, e);
  if (typeof t == "function") return wn.createElement(t, e);
  var r = e.ref,
    n = zb(e, kb);
  return wn.createElement(xu, n)
}
var sf = 1,
  cr = (function(t) {
    function e() {
      var r;
      Mb(this, e);
      for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
      return r = Cb(this, e, [].concat(o)), ti(r, "lastBoundingBox", {
        width: -1,
        height: -1
      }), r
    }
    return Nb(e, t), Tb(e, [{
      key: "componentDidMount",
      value: function() {
        this.updateBBox()
      }
    }, {
      key: "componentDidUpdate",
      value: function() {
        this.updateBBox()
      }
    }, {
      key: "getBBox",
      value: function() {
        if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
          var r = this.wrapperNode.getBoundingClientRect();
          return r.height = this.wrapperNode.offsetHeight, r.width = this.wrapperNode.offsetWidth, r
        }
        return null
      }
    }, {
      key: "updateBBox",
      value: function() {
        var r = this.props.onBBoxUpdate,
          n = this.getBBox();
        n ? (Math.abs(n.width - this.lastBoundingBox.width) > sf || Math.abs(n.height - this.lastBoundingBox.height) > sf) && (this.lastBoundingBox.width = n.width, this.lastBoundingBox.height = n.height, r && r(n)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, r && r(null))
      }
    }, {
      key: "getBBoxSnapshot",
      value: function() {
        return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? We({}, this.lastBoundingBox) : {
          width: 0,
          height: 0
        }
      }
    }, {
      key: "getDefaultPosition",
      value: function(r) {
        var n = this.props,
          o = n.layout,
          i = n.align,
          a = n.verticalAlign,
          u = n.margin,
          l = n.chartWidth,
          c = n.chartHeight,
          s, f;
        if (!r || (r.left === void 0 || r.left === null) && (r.right === void 0 || r.right === null))
          if (i === "center" && o === "vertical") {
            var p = this.getBBoxSnapshot();
            s = {
              left: ((l || 0) - p.width) / 2
            }
          } else s = i === "right" ? {
            right: u && u.right || 0
          } : {
            left: u && u.left || 0
          };
        if (!r || (r.top === void 0 || r.top === null) && (r.bottom === void 0 || r.bottom === null))
          if (a === "middle") {
            var d = this.getBBoxSnapshot();
            f = {
              top: ((c || 0) - d.height) / 2
            }
          } else f = a === "bottom" ? {
            bottom: u && u.bottom || 0
          } : {
            top: u && u.top || 0
          };
        return We(We({}, s), f)
      }
    }, {
      key: "render",
      value: function() {
        var r = this,
          n = this.props,
          o = n.content,
          i = n.width,
          a = n.height,
          u = n.wrapperStyle,
          l = n.payloadUniqBy,
          c = n.payload,
          s = We(We({
            position: "absolute",
            width: i || "auto",
            height: a || "auto"
          }, this.getDefaultPosition(u)), u);
        return wn.createElement("div", {
          className: "recharts-legend-wrapper",
          style: s,
          ref: function(f) {
            r.wrapperNode = f
          }
        }, Lb(o, We(We({}, this.props), {}, {
          payload: of(c, l, Wb)
        })))
      }
    }], [{
      key: "getWithHeight",
      value: function(r, n) {
        var o = We(We({}, this.defaultProps), r.props),
          i = o.layout;
        return i === "vertical" && tt(r.props.height) ? {
          height: r.props.height
        } : i === "horizontal" ? {
          width: r.props.width || n
        } : null
      }
    }])
  })(Pg);
ti(cr, "displayName", "Legend"), ti(cr, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
import An, {
  PureComponent as $b
} from "./react-shim-eraudit.js";
var Fb = it(Ka()),
  Ub = it(ve());
import Le from "./react-shim-eraudit.js";

function Pn(t) {
  "@babel/helpers - typeof";
  return Pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Pn(t)
}

function Ou() {
  return Ou = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ou.apply(this, arguments)
}

function qb(t, e) {
  return Vb(t) || Yb(t, e) || Xb(t, e) || Hb()
}

function Hb() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Xb(t, e) {
  if (t) {
    if (typeof t == "string") return ff(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ff(t, e)
  }
}

function ff(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function Yb(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function Vb(t) {
  if (Array.isArray(t)) return t
}

function pf(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Su(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? pf(Object(r), !0).forEach(function(n) {
      Kb(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : pf(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Kb(t, e, r) {
  return e = Gb(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Gb(t) {
  var e = Zb(t, "string");
  return Pn(e) == "symbol" ? e : e + ""
}

function Zb(t, e) {
  if (Pn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Pn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Qb(t) {
  return Array.isArray(t) && Bt(t[0]) && Bt(t[1]) ? t.join(" ~ ") : t
}
var Jb = function(t) {
  var e = t.separator,
    r = e === void 0 ? " : " : e,
    n = t.contentStyle,
    o = n === void 0 ? {} : n,
    i = t.itemStyle,
    a = i === void 0 ? {} : i,
    u = t.labelStyle,
    l = u === void 0 ? {} : u,
    c = t.payload,
    s = t.formatter,
    f = t.itemSorter,
    p = t.wrapperClassName,
    d = t.labelClassName,
    y = t.label,
    m = t.labelFormatter,
    g = t.accessibilityLayer,
    h = g === void 0 ? !1 : g,
    b = function() {
      if (c && c.length) {
        var $ = {
            padding: 0,
            margin: 0
          },
          B = (f ? (0, Fb.default)(c, f) : c).map(function(D, z) {
            if (D.type === "none") return null;
            var W = Su({
                display: "block",
                paddingTop: 4,
                paddingBottom: 4,
                color: D.color || "#000"
              }, a),
              L = D.formatter || s || Qb,
              X = D.value,
              K = D.name,
              O = X,
              S = K;
            if (L && O != null && S != null) {
              var _ = L(X, K, D, z, c);
              if (Array.isArray(_)) {
                var j = qb(_, 2);
                O = j[0], S = j[1]
              } else O = _
            }
            return Le.createElement("li", {
              className: "recharts-tooltip-item",
              key: "tooltip-item-".concat(z),
              style: W
            }, Bt(S) ? Le.createElement("span", {
              className: "recharts-tooltip-item-name"
            }, S) : null, Bt(S) ? Le.createElement("span", {
              className: "recharts-tooltip-item-separator"
            }, r) : null, Le.createElement("span", {
              className: "recharts-tooltip-item-value"
            }, O), Le.createElement("span", {
              className: "recharts-tooltip-item-unit"
            }, D.unit || ""))
          });
        return Le.createElement("ul", {
          className: "recharts-tooltip-item-list",
          style: $
        }, B)
      }
      return null
    },
    w = Su({
      margin: 0,
      padding: 10,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      whiteSpace: "nowrap"
    }, o),
    v = Su({
      margin: 0
    }, l),
    E = !(0, Ub.default)(y),
    x = E ? y : "",
    A = wt("recharts-default-tooltip", p),
    C = wt("recharts-tooltip-label", d);
  E && m && c !== void 0 && c !== null && (x = m(y, c));
  var I = h ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return Le.createElement("div", Ou({
    className: A,
    style: w
  }, I), Le.createElement("p", {
    className: C,
    style: v
  }, Le.isValidElement(x) ? x : "".concat(x)), b())
};
import t1, {
  PureComponent as e1
} from "./react-shim-eraudit.js";

function _n(t) {
  "@babel/helpers - typeof";
  return _n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, _n(t)
}

function ei(t, e, r) {
  return e = r1(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function r1(t) {
  var e = n1(t, "string");
  return _n(e) == "symbol" ? e : e + ""
}

function n1(t, e) {
  if (_n(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (_n(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var kn = "recharts-tooltip-wrapper",
  o1 = {
    visibility: "hidden"
  };

function i1(t) {
  var e = t.coordinate,
    r = t.translateX,
    n = t.translateY;
  return wt(kn, ei(ei(ei(ei({}, "".concat(kn, "-right"), tt(r) && e && tt(e.x) && r >= e.x), "".concat(kn, "-left"), tt(r) && e && tt(e.x) && r < e.x), "".concat(kn, "-bottom"), tt(n) && e && tt(e.y) && n >= e.y), "".concat(kn, "-top"), tt(n) && e && tt(e.y) && n < e.y))
}

function df(t) {
  var e = t.allowEscapeViewBox,
    r = t.coordinate,
    n = t.key,
    o = t.offsetTopLeft,
    i = t.position,
    a = t.reverseDirection,
    u = t.tooltipDimension,
    l = t.viewBox,
    c = t.viewBoxDimension;
  if (i && tt(i[n])) return i[n];
  var s = r[n] - u - o,
    f = r[n] + o;
  if (e[n]) return a[n] ? s : f;
  if (a[n]) {
    var p = s,
      d = l[n];
    return p < d ? Math.max(f, l[n]) : Math.max(s, l[n])
  }
  var y = f + u,
    m = l[n] + c;
  return y > m ? Math.max(s, l[n]) : Math.max(f, l[n])
}

function a1(t) {
  var e = t.translateX,
    r = t.translateY,
    n = t.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(e, "px, ").concat(r, "px, 0)") : "translate(".concat(e, "px, ").concat(r, "px)")
  }
}

function u1(t) {
  var e = t.allowEscapeViewBox,
    r = t.coordinate,
    n = t.offsetTopLeft,
    o = t.position,
    i = t.reverseDirection,
    a = t.tooltipBox,
    u = t.useTranslate3d,
    l = t.viewBox,
    c, s, f;
  return a.height > 0 && a.width > 0 && r ? (s = df({
    allowEscapeViewBox: e,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: o,
    reverseDirection: i,
    tooltipDimension: a.width,
    viewBox: l,
    viewBoxDimension: l.width
  }), f = df({
    allowEscapeViewBox: e,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: o,
    reverseDirection: i,
    tooltipDimension: a.height,
    viewBox: l,
    viewBoxDimension: l.height
  }), c = a1({
    translateX: s,
    translateY: f,
    useTranslate3d: u
  })) : c = o1, {
    cssProperties: c,
    cssClasses: i1({
      translateX: s,
      translateY: f,
      coordinate: r
    })
  }
}

function Nr(t) {
  "@babel/helpers - typeof";
  return Nr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Nr(t)
}

function hf(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function yf(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? hf(Object(r), !0).forEach(function(n) {
      Au(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : hf(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function l1(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function mf(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, gf(n.key), n)
  }
}

function c1(t, e, r) {
  return e && mf(t.prototype, e), r && mf(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function s1(t, e, r) {
  return e = ri(e), f1(t, vf() ? Reflect.construct(e, r || [], ri(t).constructor) : e.apply(t, r))
}

function f1(t, e) {
  if (e && (Nr(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return p1(t)
}

function p1(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function vf() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (vf = function() {
    return !!t
  })()
}

function ri(t) {
  return ri = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, ri(t)
}

function d1(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && ju(t, e)
}

function ju(t, e) {
  return ju = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, ju(t, e)
}

function Au(t, e, r) {
  return e = gf(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function gf(t) {
  var e = h1(t, "string");
  return Nr(e) == "symbol" ? e : e + ""
}

function h1(t, e) {
  if (Nr(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Nr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var bf = 1,
  y1 = (function(t) {
    function e() {
      var r;
      l1(this, e);
      for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
      return r = s1(this, e, [].concat(o)), Au(r, "state", {
        dismissed: !1,
        dismissedAtCoordinate: {
          x: 0,
          y: 0
        },
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      }), Au(r, "handleKeyDown", function(a) {
        if (a.key === "Escape") {
          var u, l, c, s;
          r.setState({
            dismissed: !0,
            dismissedAtCoordinate: {
              x: (u = (l = r.props.coordinate) === null || l === void 0 ? void 0 : l.x) !== null && u !== void 0 ? u : 0,
              y: (c = (s = r.props.coordinate) === null || s === void 0 ? void 0 : s.y) !== null && c !== void 0 ? c : 0
            }
          })
        }
      }), r
    }
    return d1(e, t), c1(e, [{
      key: "updateBBox",
      value: function() {
        if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
          var r = this.wrapperNode.getBoundingClientRect();
          (Math.abs(r.width - this.state.lastBoundingBox.width) > bf || Math.abs(r.height - this.state.lastBoundingBox.height) > bf) && this.setState({
            lastBoundingBox: {
              width: r.width,
              height: r.height
            }
          })
        } else(this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) && this.setState({
          lastBoundingBox: {
            width: -1,
            height: -1
          }
        })
      }
    }, {
      key: "componentDidMount",
      value: function() {
        document.addEventListener("keydown", this.handleKeyDown), this.updateBBox()
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        document.removeEventListener("keydown", this.handleKeyDown)
      }
    }, {
      key: "componentDidUpdate",
      value: function() {
        var r, n;
        this.props.active && this.updateBBox(), this.state.dismissed && (((r = this.props.coordinate) === null || r === void 0 ? void 0 : r.x) !== this.state.dismissedAtCoordinate.x || ((n = this.props.coordinate) === null || n === void 0 ? void 0 : n.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = !1)
      }
    }, {
      key: "render",
      value: function() {
        var r = this,
          n = this.props,
          o = n.active,
          i = n.allowEscapeViewBox,
          a = n.animationDuration,
          u = n.animationEasing,
          l = n.children,
          c = n.coordinate,
          s = n.hasPayload,
          f = n.isAnimationActive,
          p = n.offset,
          d = n.position,
          y = n.reverseDirection,
          m = n.useTranslate3d,
          g = n.viewBox,
          h = n.wrapperStyle,
          b = u1({
            allowEscapeViewBox: i,
            coordinate: c,
            offsetTopLeft: p,
            position: d,
            reverseDirection: y,
            tooltipBox: this.state.lastBoundingBox,
            useTranslate3d: m,
            viewBox: g
          }),
          w = b.cssClasses,
          v = b.cssProperties,
          E = yf(yf({
            transition: f && o ? "transform ".concat(a, "ms ").concat(u) : void 0
          }, v), {}, {
            pointerEvents: "none",
            visibility: !this.state.dismissed && o && s ? "visible" : "hidden",
            position: "absolute",
            top: 0,
            left: 0
          }, h);
        return t1.createElement("div", {
          tabIndex: -1,
          className: w,
          style: E,
          ref: function(x) {
            r.wrapperNode = x
          }
        }, l)
      }
    }])
  })(e1),
  m1 = function() {
    return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
  },
  $e = {
    isSsr: m1(),
    get: function(t) {
      return $e[t]
    },
    set: function(t, e) {
      if (typeof t == "string") $e[t] = e;
      else {
        var r = Object.keys(t);
        r && r.length && r.forEach(function(n) {
          $e[n] = t[n]
        })
      }
    }
  };

function Br(t) {
  "@babel/helpers - typeof";
  return Br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Br(t)
}

function Ef(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function xf(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ef(Object(r), !0).forEach(function(n) {
      _u(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Ef(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function v1(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function wf(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Sf(n.key), n)
  }
}

function g1(t, e, r) {
  return e && wf(t.prototype, e), r && wf(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function b1(t, e, r) {
  return e = ni(e), E1(t, Of() ? Reflect.construct(e, r || [], ni(t).constructor) : e.apply(t, r))
}

function E1(t, e) {
  if (e && (Br(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return x1(t)
}

function x1(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Of() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Of = function() {
    return !!t
  })()
}

function ni(t) {
  return ni = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, ni(t)
}

function w1(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Pu(t, e)
}

function Pu(t, e) {
  return Pu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, Pu(t, e)
}

function _u(t, e, r) {
  return e = Sf(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Sf(t) {
  var e = O1(t, "string");
  return Br(e) == "symbol" ? e : e + ""
}

function O1(t, e) {
  if (Br(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Br(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function S1(t) {
  return t.dataKey
}

function j1(t, e) {
  return An.isValidElement(t) ? An.cloneElement(t, e) : typeof t == "function" ? An.createElement(t, e) : An.createElement(Jb, e)
}
var Me = (function(t) {
  function e() {
    return v1(this, e), b1(this, e, arguments)
  }
  return w1(e, t), g1(e, [{
    key: "render",
    value: function() {
      var r = this,
        n = this.props,
        o = n.active,
        i = n.allowEscapeViewBox,
        a = n.animationDuration,
        u = n.animationEasing,
        l = n.content,
        c = n.coordinate,
        s = n.filterNull,
        f = n.isAnimationActive,
        p = n.offset,
        d = n.payload,
        y = n.payloadUniqBy,
        m = n.position,
        g = n.reverseDirection,
        h = n.useTranslate3d,
        b = n.viewBox,
        w = n.wrapperStyle,
        v = d ?? [];
      s && v.length && (v = of(d.filter(function(x) {
        return x.value != null && (x.hide !== !0 || r.props.includeHidden)
      }), y, S1));
      var E = v.length > 0;
      return An.createElement(y1, {
        allowEscapeViewBox: i,
        animationDuration: a,
        animationEasing: u,
        isAnimationActive: f,
        active: o,
        coordinate: c,
        hasPayload: E,
        offset: p,
        position: m,
        reverseDirection: g,
        useTranslate3d: h,
        viewBox: b,
        wrapperStyle: w
      }, j1(l, xf(xf({}, this.props), {}, {
        payload: v
      })))
    }
  }])
})($b);
_u(Me, "displayName", "Tooltip"), _u(Me, "defaultProps", {
  accessibilityLayer: !1,
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  contentStyle: {},
  coordinate: {
    x: 0,
    y: 0
  },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !$e.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  },
  wrapperStyle: {}
});
var A1 = it(ss());
import ku, {
  forwardRef as P1,
  cloneElement as _1,
  useState as k1,
  useImperativeHandle as M1,
  useRef as jf,
  useEffect as T1,
  useMemo as C1,
  useCallback as D1
} from "./react-shim-eraudit.js";

function Mn(t) {
  "@babel/helpers - typeof";
  return Mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Mn(t)
}

function Af(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function oi(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Af(Object(r), !0).forEach(function(n) {
      I1(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Af(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function I1(t, e, r) {
  return e = N1(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function N1(t) {
  var e = B1(t, "string");
  return Mn(e) == "symbol" ? e : e + ""
}

function B1(t, e) {
  if (Mn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Mn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function z1(t, e) {
  return $1(t) || L1(t, e) || W1(t, e) || R1()
}

function R1() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function W1(t, e) {
  if (t) {
    if (typeof t == "string") return Pf(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Pf(t, e)
  }
}

function Pf(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function L1(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function $1(t) {
  if (Array.isArray(t)) return t
}
var F1 = P1(function(t, e) {
    var r = t.aspect,
      n = t.initialDimension,
      o = n === void 0 ? {
        width: -1,
        height: -1
      } : n,
      i = t.width,
      a = i === void 0 ? "100%" : i,
      u = t.height,
      l = u === void 0 ? "100%" : u,
      c = t.minWidth,
      s = c === void 0 ? 0 : c,
      f = t.minHeight,
      p = t.maxHeight,
      d = t.children,
      y = t.debounce,
      m = y === void 0 ? 0 : y,
      g = t.id,
      h = t.className,
      b = t.onResize,
      w = t.style,
      v = w === void 0 ? {} : w,
      E = jf(null),
      x = jf();
    x.current = b, M1(e, function() {
      return Object.defineProperty(E.current, "current", {
        get: function() {
          return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), E.current
        },
        configurable: !0
      })
    });
    var A = k1({
        containerWidth: o.width,
        containerHeight: o.height
      }),
      C = z1(A, 2),
      I = C[0],
      $ = C[1],
      B = D1(function(z, W) {
        $(function(L) {
          var X = Math.round(z),
            K = Math.round(W);
          return L.containerWidth === X && L.containerHeight === K ? L : {
            containerWidth: X,
            containerHeight: K
          }
        })
      }, []);
    T1(function() {
      var z = function(O) {
        var S, _ = O[0].contentRect,
          j = _.width,
          k = _.height;
        B(j, k), (S = x.current) === null || S === void 0 || S.call(x, j, k)
      };
      m > 0 && (z = (0, A1.default)(z, m, {
        trailing: !0,
        leading: !1
      }));
      var W = new ResizeObserver(z),
        L = E.current.getBoundingClientRect(),
        X = L.width,
        K = L.height;
      return B(X, K), W.observe(E.current),
        function() {
          W.disconnect()
        }
    }, [B, m]);
    var D = C1(function() {
      var z = I.containerWidth,
        W = I.containerHeight;
      if (z < 0 || W < 0) return null;
      Re(ar(a) || ar(l), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, a, l), Re(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
      var L = ar(a) ? z : a,
        X = ar(l) ? W : l;
      r && r > 0 && (L ? X = L / r : X && (L = X * r), p && X > p && (X = p)), Re(L > 0 || X > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, L, X, a, l, s, f, r);
      var K = !Array.isArray(d) && ze(d.type).endsWith("Chart");
      return ku.Children.map(d, function(O) {
        return ku.isValidElement(O) ? _1(O, oi({
          width: L,
          height: X
        }, K ? {
          style: oi({
            height: "100%",
            width: "100%",
            maxHeight: X,
            maxWidth: L
          }, O.props.style)
        } : {})) : O
      })
    }, [r, d, l, p, f, s, I, a]);
    return ku.createElement("div", {
      id: g ? "".concat(g) : void 0,
      className: wt("recharts-responsive-container", h),
      style: oi(oi({}, v), {}, {
        width: a,
        height: l,
        minWidth: s,
        minHeight: f,
        maxHeight: p
      }),
      ref: E
    }, D)
  }),
  _f = function(t) {
    return null
  };
_f.displayName = "Cell";
var kf = it(ve());
import Mf, {
  useMemo as U1
} from "./react-shim-eraudit.js";

function Tn(t) {
  "@babel/helpers - typeof";
  return Tn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Tn(t)
}

function Tf(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Mu(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Tf(Object(r), !0).forEach(function(n) {
      q1(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Tf(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function q1(t, e, r) {
  return e = H1(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function H1(t) {
  var e = X1(t, "string");
  return Tn(e) == "symbol" ? e : e + ""
}

function X1(t, e) {
  if (Tn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Tn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var zr = {
    widthCache: {},
    cacheCount: 0
  },
  Y1 = 2e3,
  V1 = {
    position: "absolute",
    top: "-20000px",
    left: 0,
    padding: 0,
    margin: 0,
    border: "none",
    whiteSpace: "pre"
  },
  Cf = "recharts_measurement_span";

function K1(t) {
  var e = Mu({}, t);
  return Object.keys(e).forEach(function(r) {
    e[r] || delete e[r]
  }), e
}
var Cn = function(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t == null || $e.isSsr) return {
      width: 0,
      height: 0
    };
    var r = K1(e),
      n = JSON.stringify({
        text: t,
        copyStyle: r
      });
    if (zr.widthCache[n]) return zr.widthCache[n];
    try {
      var o = document.getElementById(Cf);
      o || (o = document.createElement("span"), o.setAttribute("id", Cf), o.setAttribute("aria-hidden", "true"), document.body.appendChild(o));
      var i = Mu(Mu({}, V1), r);
      Object.assign(o.style, i), o.textContent = "".concat(t);
      var a = o.getBoundingClientRect(),
        u = {
          width: a.width,
          height: a.height
        };
      return zr.widthCache[n] = u, ++zr.cacheCount > Y1 && (zr.cacheCount = 0, zr.widthCache = {}), u
    } catch {
      return {
        width: 0,
        height: 0
      }
    }
  },
  G1 = function(t) {
    return {
      top: t.top + window.scrollY - document.documentElement.clientTop,
      left: t.left + window.scrollX - document.documentElement.clientLeft
    }
  };

function Dn(t) {
  "@babel/helpers - typeof";
  return Dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Dn(t)
}

function ii(t, e) {
  return tE(t) || J1(t, e) || Q1(t, e) || Z1()
}

function Z1() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Q1(t, e) {
  if (t) {
    if (typeof t == "string") return Df(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Df(t, e)
  }
}

function Df(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function J1(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function tE(t) {
  if (Array.isArray(t)) return t
}

function eE(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function If(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, nE(n.key), n)
  }
}

function rE(t, e, r) {
  return e && If(t.prototype, e), r && If(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function nE(t) {
  var e = oE(t, "string");
  return Dn(e) == "symbol" ? e : e + ""
}

function oE(t, e) {
  if (Dn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Dn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Nf = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  Bf = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  iE = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  aE = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  zf = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1
  },
  uE = Object.keys(zf),
  Rr = "NaN";

function lE(t, e) {
  return t * zf[e]
}
var ai = (function() {
  function t(e, r) {
    eE(this, t), this.num = e, this.unit = r, this.num = e, this.unit = r, Number.isNaN(e) && (this.unit = ""), r !== "" && !iE.test(r) && (this.num = NaN, this.unit = ""), uE.includes(r) && (this.num = lE(e, r), this.unit = "px")
  }
  return rE(t, [{
    key: "add",
    value: function(e) {
      return this.unit !== e.unit ? new t(NaN, "") : new t(this.num + e.num, this.unit)
    }
  }, {
    key: "subtract",
    value: function(e) {
      return this.unit !== e.unit ? new t(NaN, "") : new t(this.num - e.num, this.unit)
    }
  }, {
    key: "multiply",
    value: function(e) {
      return this.unit !== "" && e.unit !== "" && this.unit !== e.unit ? new t(NaN, "") : new t(this.num * e.num, this.unit || e.unit)
    }
  }, {
    key: "divide",
    value: function(e) {
      return this.unit !== "" && e.unit !== "" && this.unit !== e.unit ? new t(NaN, "") : new t(this.num / e.num, this.unit || e.unit)
    }
  }, {
    key: "toString",
    value: function() {
      return "".concat(this.num).concat(this.unit)
    }
  }, {
    key: "isNaN",
    value: function() {
      return Number.isNaN(this.num)
    }
  }], [{
    key: "parse",
    value: function(e) {
      var r, n = (r = aE.exec(e)) !== null && r !== void 0 ? r : [],
        o = ii(n, 3),
        i = o[1],
        a = o[2];
      return new t(parseFloat(i), a ?? "")
    }
  }])
})();

function Rf(t) {
  if (t.includes(Rr)) return Rr;
  for (var e = t; e.includes("*") || e.includes("/");) {
    var r, n = (r = Nf.exec(e)) !== null && r !== void 0 ? r : [],
      o = ii(n, 4),
      i = o[1],
      a = o[2],
      u = o[3],
      l = ai.parse(i ?? ""),
      c = ai.parse(u ?? ""),
      s = a === "*" ? l.multiply(c) : l.divide(c);
    if (s.isNaN()) return Rr;
    e = e.replace(Nf, s.toString())
  }
  for (; e.includes("+") || /.-\d+(?:\.\d+)?/.test(e);) {
    var f, p = (f = Bf.exec(e)) !== null && f !== void 0 ? f : [],
      d = ii(p, 4),
      y = d[1],
      m = d[2],
      g = d[3],
      h = ai.parse(y ?? ""),
      b = ai.parse(g ?? ""),
      w = m === "+" ? h.add(b) : h.subtract(b);
    if (w.isNaN()) return Rr;
    e = e.replace(Bf, w.toString())
  }
  return e
}
var Wf = /\(([^()]*)\)/;

function cE(t) {
  for (var e = t; e.includes("(");) {
    var r = Wf.exec(e),
      n = ii(r, 2),
      o = n[1];
    e = e.replace(Wf, Rf(o))
  }
  return e
}

function sE(t) {
  var e = t.replace(/\s+/g, "");
  return e = cE(e), e = Rf(e), e
}

function fE(t) {
  try {
    return sE(t)
  } catch {
    return Rr
  }
}

function Tu(t) {
  var e = fE(t.slice(5, -1));
  return e === Rr ? "" : e
}
var pE = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
  dE = ["dx", "dy", "angle", "className", "breakAll"];

function Cu() {
  return Cu = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Cu.apply(this, arguments)
}

function Lf(t, e) {
  if (t == null) return {};
  var r = hE(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function hE(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function $f(t, e) {
  return gE(t) || vE(t, e) || mE(t, e) || yE()
}

function yE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function mE(t, e) {
  if (t) {
    if (typeof t == "string") return Ff(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ff(t, e)
  }
}

function Ff(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function vE(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function gE(t) {
  if (Array.isArray(t)) return t
}
var Uf = /[ \f\n\r\t\v\u2028\u2029]+/,
  qf = function(t) {
    var e = t.children,
      r = t.breakAll,
      n = t.style;
    try {
      var o = [];
      (0, kf.default)(e) || (r ? o = e.toString().split("") : o = e.toString().split(Uf));
      var i = o.map(function(u) {
          return {
            word: u,
            width: Cn(u, n).width
          }
        }),
        a = r ? 0 : Cn("\xA0", n).width;
      return {
        wordsWithComputedWidth: i,
        spaceWidth: a
      }
    } catch {
      return null
    }
  },
  bE = function(t, e, r, n, o) {
    var i = t.maxLines,
      a = t.children,
      u = t.style,
      l = t.breakAll,
      c = tt(i),
      s = a,
      f = function() {
        var z = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return z.reduce(function(W, L) {
          var X = L.word,
            K = L.width,
            O = W[W.length - 1];
          if (O && (n == null || o || O.width + K + r < Number(n))) O.words.push(X), O.width += K + r;
          else {
            var S = {
              words: [X],
              width: K
            };
            W.push(S)
          }
          return W
        }, [])
      },
      p = f(e),
      d = function(z) {
        return z.reduce(function(W, L) {
          return W.width > L.width ? W : L
        })
      };
    if (!c) return p;
    for (var y = "\u2026", m = function(z) {
        var W = s.slice(0, z),
          L = qf({
            breakAll: l,
            style: u,
            children: W + y
          }).wordsWithComputedWidth,
          X = f(L),
          K = X.length > i || d(X).width > Number(n);
        return [K, X]
      }, g = 0, h = s.length - 1, b = 0, w; g <= h && b <= s.length - 1;) {
      var v = Math.floor((g + h) / 2),
        E = v - 1,
        x = m(E),
        A = $f(x, 2),
        C = A[0],
        I = A[1],
        $ = m(v),
        B = $f($, 1),
        D = B[0];
      if (!C && !D && (g = v + 1), C && D && (h = v - 1), !C && D) {
        w = I;
        break
      }
      b++
    }
    return w || p
  },
  Hf = function(t) {
    var e = (0, kf.default)(t) ? [] : t.toString().split(Uf);
    return [{
      words: e
    }]
  },
  EE = function(t) {
    var e = t.width,
      r = t.scaleToFit,
      n = t.children,
      o = t.style,
      i = t.breakAll,
      a = t.maxLines;
    if ((e || r) && !$e.isSsr) {
      var u, l, c = qf({
        breakAll: i,
        children: n,
        style: o
      });
      if (c) {
        var s = c.wordsWithComputedWidth,
          f = c.spaceWidth;
        u = s, l = f
      } else return Hf(n);
      return bE({
        breakAll: i,
        children: n,
        maxLines: a,
        style: o
      }, u, l, e, r)
    }
    return Hf(n)
  },
  Xf = "#808080",
  ui = function(t) {
    var e = t.x,
      r = e === void 0 ? 0 : e,
      n = t.y,
      o = n === void 0 ? 0 : n,
      i = t.lineHeight,
      a = i === void 0 ? "1em" : i,
      u = t.capHeight,
      l = u === void 0 ? "0.71em" : u,
      c = t.scaleToFit,
      s = c === void 0 ? !1 : c,
      f = t.textAnchor,
      p = f === void 0 ? "start" : f,
      d = t.verticalAnchor,
      y = d === void 0 ? "end" : d,
      m = t.fill,
      g = m === void 0 ? Xf : m,
      h = Lf(t, pE),
      b = U1(function() {
        return EE({
          breakAll: h.breakAll,
          children: h.children,
          maxLines: h.maxLines,
          scaleToFit: s,
          style: h.style,
          width: h.width
        })
      }, [h.breakAll, h.children, h.maxLines, s, h.style, h.width]),
      w = h.dx,
      v = h.dy,
      E = h.angle,
      x = h.className,
      A = h.breakAll,
      C = Lf(h, dE);
    if (!Bt(r) || !Bt(o)) return null;
    var I = r + (tt(w) ? w : 0),
      $ = o + (tt(v) ? v : 0),
      B;
    switch (y) {
      case "start":
        B = Tu("calc(".concat(l, ")"));
        break;
      case "middle":
        B = Tu("calc(".concat((b.length - 1) / 2, " * -").concat(a, " + (").concat(l, " / 2))"));
        break;
      default:
        B = Tu("calc(".concat(b.length - 1, " * -").concat(a, ")"));
        break
    }
    var D = [];
    if (s) {
      var z = b[0].width,
        W = h.width;
      D.push("scale(".concat((tt(W) ? W / z : 1) / z, ")"))
    }
    return E && D.push("rotate(".concat(E, ", ").concat(I, ", ").concat($, ")")), D.length && (C.transform = D.join(" ")), Mf.createElement("text", Cu({}, Et(C, !0), {
      x: I,
      y: $,
      className: wt("recharts-text", x),
      textAnchor: p,
      fill: g.includes("url") ? Xf : g
    }), b.map(function(L, X) {
      var K = L.words.join(A ? "" : " ");
      return Mf.createElement("tspan", {
        x: I,
        dy: X === 0 ? B : a,
        key: "".concat(K, "-").concat(X)
      }, K)
    }))
  },
  li = it(ve()),
  ci = it(Dt()),
  Yf = it(me());
import Te, {
  cloneElement as Du,
  isValidElement as si,
  createElement as xE
} from "./react-shim-eraudit.js";
var A4 = it(ve()),
  P4 = it(Dt());
import "./react-shim-eraudit.js";
var Iu = {};
jy(Iu, {
  scaleBand: () => Bn,
  scaleDiverging: () => l0,
  scaleDivergingLog: () => c0,
  scaleDivergingPow: () => dl,
  scaleDivergingSqrt: () => Qw,
  scaleDivergingSymlog: () => s0,
  scaleIdentity: () => jp,
  scaleImplicit: () => Wu,
  scaleLinear: () => Oi,
  scaleLog: () => Mp,
  scaleOrdinal: () => Lu,
  scalePoint: () => zn,
  scalePow: () => tl,
  scaleQuantile: () => zp,
  scaleQuantize: () => Rp,
  scaleRadial: () => Bp,
  scaleSequential: () => o0,
  scaleSequentialLog: () => i0,
  scaleSequentialPow: () => pl,
  scaleSequentialQuantile: () => u0,
  scaleSequentialSqrt: () => Zw,
  scaleSequentialSymlog: () => a0,
  scaleSqrt: () => Mx,
  scaleSymlog: () => Dp,
  scaleThreshold: () => Wp,
  scaleTime: () => Kw,
  scaleUtc: () => Gw,
  tickFormat: () => Sp
});

function Ge(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}

function wE(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}

function Nu(t) {
  let e, r, n;
  t.length !== 2 ? (e = Ge, r = (u, l) => Ge(t(u), l), n = (u, l) => t(u) - l) : (e = t === Ge || t === wE ? t : OE, r = t, n = t);

  function o(u, l, c = 0, s = u.length) {
    if (c < s) {
      if (e(l, l) !== 0) return s;
      do {
        let f = c + s >>> 1;
        r(u[f], l) < 0 ? c = f + 1 : s = f
      } while (c < s)
    }
    return c
  }

  function i(u, l, c = 0, s = u.length) {
    if (c < s) {
      if (e(l, l) !== 0) return s;
      do {
        let f = c + s >>> 1;
        r(u[f], l) <= 0 ? c = f + 1 : s = f
      } while (c < s)
    }
    return c
  }

  function a(u, l, c = 0, s = u.length) {
    let f = o(u, l, c, s - 1);
    return f > c && n(u[f - 1], l) > -n(u[f], l) ? f - 1 : f
  }
  return {
    left: o,
    center: a,
    right: i
  }
}

function OE() {
  return 0
}

function Vf(t) {
  return t === null ? NaN : +t
}

function* SE(t, e) {
  if (e === void 0)
    for (let r of t) r != null && (r = +r) >= r && (yield r);
  else {
    let r = -1;
    for (let n of t)(n = e(n, ++r, t)) != null && (n = +n) >= n && (yield n)
  }
}
var Kf = Nu(Ge),
  jE = Kf.right,
  k4 = Kf.left,
  M4 = Nu(Vf).center,
  In = jE,
  Gf = class extends Map {
    constructor(t, e = _E) {
      if (super(), Object.defineProperties(this, {
          _intern: {
            value: new Map
          },
          _key: {
            value: e
          }
        }), t != null)
        for (let [r, n] of t) this.set(r, n)
    }
    get(t) {
      return super.get(Zf(this, t))
    }
    has(t) {
      return super.has(Zf(this, t))
    }
    set(t, e) {
      return super.set(AE(this, t), e)
    }
    delete(t) {
      return super.delete(PE(this, t))
    }
  };

function Zf({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) ? t.get(n) : r
}

function AE({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) ? t.get(n) : (t.set(n, r), r)
}

function PE({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) && (r = t.get(n), t.delete(n)), r
}

function _E(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t
}

function kE(t = Ge) {
  if (t === Ge) return Qf;
  if (typeof t != "function") throw new TypeError("compare is not a function");
  return (e, r) => {
    let n = t(e, r);
    return n || n === 0 ? n : (t(r, r) === 0) - (t(e, e) === 0)
  }
}

function Qf(t, e) {
  return (t == null || !(t >= t)) - (e == null || !(e >= e)) || (t < e ? -1 : t > e ? 1 : 0)
}
var ME = Math.sqrt(50),
  TE = Math.sqrt(10),
  CE = Math.sqrt(2);

function fi(t, e, r) {
  let n = (e - t) / Math.max(0, r),
    o = Math.floor(Math.log10(n)),
    i = n / Math.pow(10, o),
    a = i >= ME ? 10 : i >= TE ? 5 : i >= CE ? 2 : 1,
    u, l, c;
  return o < 0 ? (c = Math.pow(10, -o) / a, u = Math.round(t * c), l = Math.round(e * c), u / c < t && ++u, l / c > e && --l, c = -c) : (c = Math.pow(10, o) * a, u = Math.round(t / c), l = Math.round(e / c), u * c < t && ++u, l * c > e && --l), l < u && .5 <= r && r < 2 ? fi(t, e, r * 2) : [u, l, c]
}

function Bu(t, e, r) {
  if (e = +e, t = +t, r = +r, !(r > 0)) return [];
  if (t === e) return [t];
  let n = e < t,
    [o, i, a] = n ? fi(e, t, r) : fi(t, e, r);
  if (!(i >= o)) return [];
  let u = i - o + 1,
    l = new Array(u);
  if (n)
    if (a < 0)
      for (let c = 0; c < u; ++c) l[c] = (i - c) / -a;
    else
      for (let c = 0; c < u; ++c) l[c] = (i - c) * a;
  else if (a < 0)
    for (let c = 0; c < u; ++c) l[c] = (o + c) / -a;
  else
    for (let c = 0; c < u; ++c) l[c] = (o + c) * a;
  return l
}

function zu(t, e, r) {
  return e = +e, t = +t, r = +r, fi(t, e, r)[2]
}

function Ru(t, e, r) {
  e = +e, t = +t, r = +r;
  let n = e < t,
    o = n ? zu(e, t, r) : zu(t, e, r);
  return (n ? -1 : 1) * (o < 0 ? 1 / -o : o)
}

function Jf(t, e) {
  let r;
  if (e === void 0)
    for (let n of t) n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let o of t)(o = e(o, ++n, t)) != null && (r < o || r === void 0 && o >= o) && (r = o)
  }
  return r
}

function tp(t, e) {
  let r;
  if (e === void 0)
    for (let n of t) n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let o of t)(o = e(o, ++n, t)) != null && (r > o || r === void 0 && o >= o) && (r = o)
  }
  return r
}

function ep(t, e, r = 0, n = 1 / 0, o) {
  if (e = Math.floor(e), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(t.length - 1, n)), !(r <= e && e <= n)) return t;
  for (o = o === void 0 ? Qf : kE(o); n > r;) {
    if (n - r > 600) {
      let l = n - r + 1,
        c = e - r + 1,
        s = Math.log(l),
        f = .5 * Math.exp(2 * s / 3),
        p = .5 * Math.sqrt(s * f * (l - f) / l) * (c - l / 2 < 0 ? -1 : 1),
        d = Math.max(r, Math.floor(e - c * f / l + p)),
        y = Math.min(n, Math.floor(e + (l - c) * f / l + p));
      ep(t, e, d, y, o)
    }
    let i = t[e],
      a = r,
      u = n;
    for (Nn(t, r, e), o(t[n], i) > 0 && Nn(t, r, n); a < u;) {
      for (Nn(t, a, u), ++a, --u; o(t[a], i) < 0;) ++a;
      for (; o(t[u], i) > 0;) --u
    }
    o(t[r], i) === 0 ? Nn(t, r, u) : (++u, Nn(t, u, n)), u <= e && (r = u + 1), e <= u && (n = u - 1)
  }
  return t
}

function Nn(t, e, r) {
  let n = t[e];
  t[e] = t[r], t[r] = n
}

function DE(t, e, r) {
  if (t = Float64Array.from(SE(t, r)), !(!(n = t.length) || isNaN(e = +e))) {
    if (e <= 0 || n < 2) return tp(t);
    if (e >= 1) return Jf(t);
    var n, o = (n - 1) * e,
      i = Math.floor(o),
      a = Jf(ep(t, i).subarray(0, i + 1)),
      u = tp(t.subarray(i + 1));
    return a + (u - a) * (o - i)
  }
}

function IE(t, e, r = Vf) {
  if (!(!(n = t.length) || isNaN(e = +e))) {
    if (e <= 0 || n < 2) return +r(t[0], 0, t);
    if (e >= 1) return +r(t[n - 1], n - 1, t);
    var n, o = (n - 1) * e,
      i = Math.floor(o),
      a = +r(t[i], i, t),
      u = +r(t[i + 1], i + 1, t);
    return a + (u - a) * (o - i)
  }
}

function NE(t, e, r) {
  t = +t, e = +e, r = (o = arguments.length) < 2 ? (e = t, t = 0, 1) : o < 3 ? 1 : +r;
  for (var n = -1, o = Math.max(0, Math.ceil((e - t) / r)) | 0, i = new Array(o); ++n < o;) i[n] = t + n * r;
  return i
}

function fe(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break
  }
  return this
}

function Fe(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof t == "function" ? this.interpolator(t) : this.range(t);
      break
    }
    default: {
      this.domain(t), typeof e == "function" ? this.interpolator(e) : this.range(e);
      break
    }
  }
  return this
}
var Wu = Symbol("implicit");

function Lu() {
  var t = new Gf,
    e = [],
    r = [],
    n = Wu;

  function o(i) {
    let a = t.get(i);
    if (a === void 0) {
      if (n !== Wu) return n;
      t.set(i, a = e.push(i) - 1)
    }
    return r[a % r.length]
  }
  return o.domain = function(i) {
    if (!arguments.length) return e.slice();
    e = [], t = new Gf;
    for (let a of i) t.has(a) || t.set(a, e.push(a) - 1);
    return o
  }, o.range = function(i) {
    return arguments.length ? (r = Array.from(i), o) : r.slice()
  }, o.unknown = function(i) {
    return arguments.length ? (n = i, o) : n
  }, o.copy = function() {
    return Lu(e, r).unknown(n)
  }, fe.apply(o, arguments), o
}

function Bn() {
  var t = Lu().unknown(void 0),
    e = t.domain,
    r = t.range,
    n = 0,
    o = 1,
    i, a, u = !1,
    l = 0,
    c = 0,
    s = .5;
  delete t.unknown;

  function f() {
    var p = e().length,
      d = o < n,
      y = d ? o : n,
      m = d ? n : o;
    i = (m - y) / Math.max(1, p - l + c * 2), u && (i = Math.floor(i)), y += (m - y - i * (p - l)) * s, a = i * (1 - l), u && (y = Math.round(y), a = Math.round(a));
    var g = NE(p).map(function(h) {
      return y + i * h
    });
    return r(d ? g.reverse() : g)
  }
  return t.domain = function(p) {
    return arguments.length ? (e(p), f()) : e()
  }, t.range = function(p) {
    return arguments.length ? ([n, o] = p, n = +n, o = +o, f()) : [n, o]
  }, t.rangeRound = function(p) {
    return [n, o] = p, n = +n, o = +o, u = !0, f()
  }, t.bandwidth = function() {
    return a
  }, t.step = function() {
    return i
  }, t.round = function(p) {
    return arguments.length ? (u = !!p, f()) : u
  }, t.padding = function(p) {
    return arguments.length ? (l = Math.min(1, c = +p), f()) : l
  }, t.paddingInner = function(p) {
    return arguments.length ? (l = Math.min(1, p), f()) : l
  }, t.paddingOuter = function(p) {
    return arguments.length ? (c = +p, f()) : c
  }, t.align = function(p) {
    return arguments.length ? (s = Math.max(0, Math.min(1, p)), f()) : s
  }, t.copy = function() {
    return Bn(e(), [n, o]).round(u).paddingInner(l).paddingOuter(c).align(s)
  }, fe.apply(f(), arguments)
}

function rp(t) {
  var e = t.copy;
  return t.padding = t.paddingOuter, delete t.paddingInner, delete t.paddingOuter, t.copy = function() {
    return rp(e())
  }, t
}

function zn() {
  return rp(Bn.apply(null, arguments).paddingInner(1))
}

function $u(t, e, r) {
  t.prototype = e.prototype = r, r.constructor = t
}

function np(t, e) {
  var r = Object.create(t.prototype);
  for (var n in e) r[n] = e[n];
  return r
}

function Rn() {}
var Wn = .7,
  pi = 1 / Wn,
  Wr = "\\s*([+-]?\\d+)\\s*",
  Ln = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  Ce = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  BE = /^#([0-9a-f]{3,8})$/,
  zE = new RegExp(`^rgb\\(${Wr},${Wr},${Wr}\\)$`),
  RE = new RegExp(`^rgb\\(${Ce},${Ce},${Ce}\\)$`),
  WE = new RegExp(`^rgba\\(${Wr},${Wr},${Wr},${Ln}\\)$`),
  LE = new RegExp(`^rgba\\(${Ce},${Ce},${Ce},${Ln}\\)$`),
  $E = new RegExp(`^hsl\\(${Ln},${Ce},${Ce}\\)$`),
  FE = new RegExp(`^hsla\\(${Ln},${Ce},${Ce},${Ln}\\)$`),
  op = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
$u(Rn, $n, {
  copy(t) {
    return Object.assign(new this.constructor, this, t)
  },
  displayable() {
    return this.rgb().displayable()
  },
  hex: ip,
  formatHex: ip,
  formatHex8: UE,
  formatHsl: qE,
  formatRgb: ap,
  toString: ap
});

function ip() {
  return this.rgb().formatHex()
}

function UE() {
  return this.rgb().formatHex8()
}

function qE() {
  return fp(this).formatHsl()
}

function ap() {
  return this.rgb().formatRgb()
}

function $n(t) {
  var e, r;
  return t = (t + "").trim().toLowerCase(), (e = BE.exec(t)) ? (r = e[1].length, e = parseInt(e[1], 16), r === 6 ? up(e) : r === 3 ? new Gt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : r === 8 ? di(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : r === 4 ? di(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = zE.exec(t)) ? new Gt(e[1], e[2], e[3], 1) : (e = RE.exec(t)) ? new Gt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = WE.exec(t)) ? di(e[1], e[2], e[3], e[4]) : (e = LE.exec(t)) ? di(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = $E.exec(t)) ? sp(e[1], e[2] / 100, e[3] / 100, 1) : (e = FE.exec(t)) ? sp(e[1], e[2] / 100, e[3] / 100, e[4]) : op.hasOwnProperty(t) ? up(op[t]) : t === "transparent" ? new Gt(NaN, NaN, NaN, 0) : null
}

function up(t) {
  return new Gt(t >> 16 & 255, t >> 8 & 255, t & 255, 1)
}

function di(t, e, r, n) {
  return n <= 0 && (t = e = r = NaN), new Gt(t, e, r, n)
}

function HE(t) {
  return t instanceof Rn || (t = $n(t)), t ? (t = t.rgb(), new Gt(t.r, t.g, t.b, t.opacity)) : new Gt
}

function hi(t, e, r, n) {
  return arguments.length === 1 ? HE(t) : new Gt(t, e, r, n ?? 1)
}

function Gt(t, e, r, n) {
  this.r = +t, this.g = +e, this.b = +r, this.opacity = +n
}
$u(Gt, hi, np(Rn, {
  brighter(t) {
    return t = t == null ? pi : Math.pow(pi, t), new Gt(this.r * t, this.g * t, this.b * t, this.opacity)
  },
  darker(t) {
    return t = t == null ? Wn : Math.pow(Wn, t), new Gt(this.r * t, this.g * t, this.b * t, this.opacity)
  },
  rgb() {
    return this
  },
  clamp() {
    return new Gt(sr(this.r), sr(this.g), sr(this.b), yi(this.opacity))
  },
  displayable() {
    return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
  },
  hex: lp,
  formatHex: lp,
  formatHex8: XE,
  formatRgb: cp,
  toString: cp
}));

function lp() {
  return `#${fr(this.r)}${fr(this.g)}${fr(this.b)}`
}

function XE() {
  return `#${fr(this.r)}${fr(this.g)}${fr(this.b)}${fr((isNaN(this.opacity)?1:this.opacity)*255)}`
}

function cp() {
  let t = yi(this.opacity);
  return `${t===1?"rgb(":"rgba("}${sr(this.r)}, ${sr(this.g)}, ${sr(this.b)}${t===1?")":`, ${t})`}`
}

function yi(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t))
}

function sr(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0))
}

function fr(t) {
  return t = sr(t), (t < 16 ? "0" : "") + t.toString(16)
}

function sp(t, e, r, n) {
  return n <= 0 ? t = e = r = NaN : r <= 0 || r >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new xe(t, e, r, n)
}

function fp(t) {
  if (t instanceof xe) return new xe(t.h, t.s, t.l, t.opacity);
  if (t instanceof Rn || (t = $n(t)), !t) return new xe;
  if (t instanceof xe) return t;
  t = t.rgb();
  var e = t.r / 255,
    r = t.g / 255,
    n = t.b / 255,
    o = Math.min(e, r, n),
    i = Math.max(e, r, n),
    a = NaN,
    u = i - o,
    l = (i + o) / 2;
  return u ? (e === i ? a = (r - n) / u + (r < n) * 6 : r === i ? a = (n - e) / u + 2 : a = (e - r) / u + 4, u /= l < .5 ? i + o : 2 - i - o, a *= 60) : u = l > 0 && l < 1 ? 0 : a, new xe(a, u, l, t.opacity)
}

function YE(t, e, r, n) {
  return arguments.length === 1 ? fp(t) : new xe(t, e, r, n ?? 1)
}

function xe(t, e, r, n) {
  this.h = +t, this.s = +e, this.l = +r, this.opacity = +n
}
$u(xe, YE, np(Rn, {
  brighter(t) {
    return t = t == null ? pi : Math.pow(pi, t), new xe(this.h, this.s, this.l * t, this.opacity)
  },
  darker(t) {
    return t = t == null ? Wn : Math.pow(Wn, t), new xe(this.h, this.s, this.l * t, this.opacity)
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360,
      e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
      r = this.l,
      n = r + (r < .5 ? r : 1 - r) * e,
      o = 2 * r - n;
    return new Gt(Fu(t >= 240 ? t - 240 : t + 120, o, n), Fu(t, o, n), Fu(t < 120 ? t + 240 : t - 120, o, n), this.opacity)
  },
  clamp() {
    return new xe(pp(this.h), mi(this.s), mi(this.l), yi(this.opacity))
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
  },
  formatHsl() {
    let t = yi(this.opacity);
    return `${t===1?"hsl(":"hsla("}${pp(this.h)}, ${mi(this.s)*100}%, ${mi(this.l)*100}%${t===1?")":`, ${t})`}`
  }
}));

function pp(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t
}

function mi(t) {
  return Math.max(0, Math.min(1, t || 0))
}

function Fu(t, e, r) {
  return (t < 60 ? e + (r - e) * t / 60 : t < 180 ? r : t < 240 ? e + (r - e) * (240 - t) / 60 : e) * 255
}

function dp(t, e, r, n, o) {
  var i = t * t,
    a = i * t;
  return ((1 - 3 * t + 3 * i - a) * e + (4 - 6 * i + 3 * a) * r + (1 + 3 * t + 3 * i - 3 * a) * n + a * o) / 6
}

function VE(t) {
  var e = t.length - 1;
  return function(r) {
    var n = r <= 0 ? r = 0 : r >= 1 ? (r = 1, e - 1) : Math.floor(r * e),
      o = t[n],
      i = t[n + 1],
      a = n > 0 ? t[n - 1] : 2 * o - i,
      u = n < e - 1 ? t[n + 2] : 2 * i - o;
    return dp((r - n / e) * e, a, o, i, u)
  }
}

function KE(t) {
  var e = t.length;
  return function(r) {
    var n = Math.floor(((r %= 1) < 0 ? ++r : r) * e),
      o = t[(n + e - 1) % e],
      i = t[n % e],
      a = t[(n + 1) % e],
      u = t[(n + 2) % e];
    return dp((r - n / e) * e, o, i, a, u)
  }
}
var Uu = t => () => t;

function GE(t, e) {
  return function(r) {
    return t + r * e
  }
}

function ZE(t, e, r) {
  return t = Math.pow(t, r), e = Math.pow(e, r) - t, r = 1 / r,
    function(n) {
      return Math.pow(t + n * e, r)
    }
}

function QE(t) {
  return (t = +t) == 1 ? hp : function(e, r) {
    return r - e ? ZE(e, r, t) : Uu(isNaN(e) ? r : e)
  }
}

function hp(t, e) {
  var r = e - t;
  return r ? GE(t, r) : Uu(isNaN(t) ? e : t)
}
var yp = (function t(e) {
  var r = QE(e);

  function n(o, i) {
    var a = r((o = hi(o)).r, (i = hi(i)).r),
      u = r(o.g, i.g),
      l = r(o.b, i.b),
      c = hp(o.opacity, i.opacity);
    return function(s) {
      return o.r = a(s), o.g = u(s), o.b = l(s), o.opacity = c(s), o + ""
    }
  }
  return n.gamma = t, n
})(1);

function mp(t) {
  return function(e) {
    var r = e.length,
      n = new Array(r),
      o = new Array(r),
      i = new Array(r),
      a, u;
    for (a = 0; a < r; ++a) u = hi(e[a]), n[a] = u.r || 0, o[a] = u.g || 0, i[a] = u.b || 0;
    return n = t(n), o = t(o), i = t(i), u.opacity = 1,
      function(l) {
        return u.r = n(l), u.g = o(l), u.b = i(l), u + ""
      }
  }
}
var T4 = mp(VE),
  C4 = mp(KE);

function JE(t, e) {
  e || (e = []);
  var r = t ? Math.min(e.length, t.length) : 0,
    n = e.slice(),
    o;
  return function(i) {
    for (o = 0; o < r; ++o) n[o] = t[o] * (1 - i) + e[o] * i;
    return n
  }
}

function tx(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView)
}

function ex(t, e) {
  var r = e ? e.length : 0,
    n = t ? Math.min(r, t.length) : 0,
    o = new Array(n),
    i = new Array(r),
    a;
  for (a = 0; a < n; ++a) o[a] = Lr(t[a], e[a]);
  for (; a < r; ++a) i[a] = e[a];
  return function(u) {
    for (a = 0; a < n; ++a) i[a] = o[a](u);
    return i
  }
}

function rx(t, e) {
  var r = new Date;
  return t = +t, e = +e,
    function(n) {
      return r.setTime(t * (1 - n) + e * n), r
    }
}

function vi(t, e) {
  return t = +t, e = +e,
    function(r) {
      return t * (1 - r) + e * r
    }
}

function nx(t, e) {
  var r = {},
    n = {},
    o;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (o in e) o in t ? r[o] = Lr(t[o], e[o]) : n[o] = e[o];
  return function(i) {
    for (o in r) n[o] = r[o](i);
    return n
  }
}
var qu = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Hu = new RegExp(qu.source, "g");

function ox(t) {
  return function() {
    return t
  }
}

function ix(t) {
  return function(e) {
    return t(e) + ""
  }
}

function ax(t, e) {
  var r = qu.lastIndex = Hu.lastIndex = 0,
    n, o, i, a = -1,
    u = [],
    l = [];
  for (t = t + "", e = e + "";
    (n = qu.exec(t)) && (o = Hu.exec(e));)(i = o.index) > r && (i = e.slice(r, i), u[a] ? u[a] += i : u[++a] = i), (n = n[0]) === (o = o[0]) ? u[a] ? u[a] += o : u[++a] = o : (u[++a] = null, l.push({
    i: a,
    x: vi(n, o)
  })), r = Hu.lastIndex;
  return r < e.length && (i = e.slice(r), u[a] ? u[a] += i : u[++a] = i), u.length < 2 ? l[0] ? ix(l[0].x) : ox(e) : (e = l.length, function(c) {
    for (var s = 0, f; s < e; ++s) u[(f = l[s]).i] = f.x(c);
    return u.join("")
  })
}

function Lr(t, e) {
  var r = typeof e,
    n;
  return e == null || r === "boolean" ? Uu(e) : (r === "number" ? vi : r === "string" ? (n = $n(e)) ? (e = n, yp) : ax : e instanceof $n ? yp : e instanceof Date ? rx : tx(e) ? JE : Array.isArray(e) ? ex : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? nx : vi)(t, e)
}

function Xu(t, e) {
  return t = +t, e = +e,
    function(r) {
      return Math.round(t * (1 - r) + e * r)
    }
}

function ux(t, e) {
  e === void 0 && (e = t, t = Lr);
  for (var r = 0, n = e.length - 1, o = e[0], i = new Array(n < 0 ? 0 : n); r < n;) i[r] = t(o, o = e[++r]);
  return function(a) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(a *= n)));
    return i[u](a - u)
  }
}

function lx(t) {
  return function() {
    return t
  }
}

function gi(t) {
  return +t
}
var vp = [0, 1];

function Vt(t) {
  return t
}

function Yu(t, e) {
  return (e -= t = +t) ? function(r) {
    return (r - t) / e
  } : lx(isNaN(e) ? NaN : .5)
}

function cx(t, e) {
  var r;
  return t > e && (r = t, t = e, e = r),
    function(n) {
      return Math.max(t, Math.min(e, n))
    }
}

function sx(t, e, r) {
  var n = t[0],
    o = t[1],
    i = e[0],
    a = e[1];
  return o < n ? (n = Yu(o, n), i = r(a, i)) : (n = Yu(n, o), i = r(i, a)),
    function(u) {
      return i(n(u))
    }
}

function fx(t, e, r) {
  var n = Math.min(t.length, e.length) - 1,
    o = new Array(n),
    i = new Array(n),
    a = -1;
  for (t[n] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a < n;) o[a] = Yu(t[a], t[a + 1]), i[a] = r(e[a], e[a + 1]);
  return function(u) {
    var l = In(t, u, 1, n) - 1;
    return i[l](o[l](u))
  }
}

function Fn(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())
}

function bi() {
  var t = vp,
    e = vp,
    r = Lr,
    n, o, i, a = Vt,
    u, l, c;

  function s() {
    var p = Math.min(t.length, e.length);
    return a !== Vt && (a = cx(t[0], t[p - 1])), u = p > 2 ? fx : sx, l = c = null, f
  }

  function f(p) {
    return p == null || isNaN(p = +p) ? i : (l || (l = u(t.map(n), e, r)))(n(a(p)))
  }
  return f.invert = function(p) {
      return a(o((c || (c = u(e, t.map(n), vi)))(p)))
    }, f.domain = function(p) {
      return arguments.length ? (t = Array.from(p, gi), s()) : t.slice()
    }, f.range = function(p) {
      return arguments.length ? (e = Array.from(p), s()) : e.slice()
    }, f.rangeRound = function(p) {
      return e = Array.from(p), r = Xu, s()
    }, f.clamp = function(p) {
      return arguments.length ? (a = p ? !0 : Vt, s()) : a !== Vt
    }, f.interpolate = function(p) {
      return arguments.length ? (r = p, s()) : r
    }, f.unknown = function(p) {
      return arguments.length ? (i = p, f) : i
    },
    function(p, d) {
      return n = p, o = d, s()
    }
}

function Vu() {
  return bi()(Vt, Vt)
}

function px(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10)
}

function Ei(t, e) {
  if (!isFinite(t) || t === 0) return null;
  var r = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e"),
    n = t.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +t.slice(r + 1)]
}

function $r(t) {
  return t = Ei(Math.abs(t)), t ? t[1] : NaN
}

function dx(t, e) {
  return function(r, n) {
    for (var o = r.length, i = [], a = 0, u = t[0], l = 0; o > 0 && u > 0 && (l + u + 1 > n && (u = Math.max(1, n - l)), i.push(r.substring(o -= u, o + u)), !((l += u + 1) > n));) u = t[a = (a + 1) % t.length];
    return i.reverse().join(e)
  }
}

function hx(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(r) {
      return t[+r]
    })
  }
}
var yx = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function Un(t) {
  if (!(e = yx.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Ku({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  })
}
Un.prototype = Ku.prototype;

function Ku(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + ""
}
Ku.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type
};

function mx(t) {
  t: for (var e = t.length, r = 1, n = -1, o; r < e; ++r) switch (t[r]) {
    case ".":
      n = o = r;
      break;
    case "0":
      n === 0 && (n = r), o = r;
      break;
    default:
      if (!+t[r]) break t;
      n > 0 && (n = 0);
      break
  }
  return n > 0 ? t.slice(0, n) + t.slice(o + 1) : t
}
var xi;

function vx(t, e) {
  var r = Ei(t, e);
  if (!r) return xi = void 0, t.toPrecision(e);
  var n = r[0],
    o = r[1],
    i = o - (xi = Math.max(-8, Math.min(8, Math.floor(o / 3))) * 3) + 1,
    a = n.length;
  return i === a ? n : i > a ? n + new Array(i - a + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + Ei(t, Math.max(0, e + i - 1))[0]
}

function gp(t, e) {
  var r = Ei(t, e);
  if (!r) return t + "";
  var n = r[0],
    o = r[1];
  return o < 0 ? "0." + new Array(-o).join("0") + n : n.length > o + 1 ? n.slice(0, o + 1) + "." + n.slice(o + 1) : n + new Array(o - n.length + 2).join("0")
}
var bp = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: t => Math.round(t).toString(2),
  c: t => t + "",
  d: px,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: t => Math.round(t).toString(8),
  p: (t, e) => gp(t * 100, e),
  r: gp,
  s: vx,
  X: t => Math.round(t).toString(16).toUpperCase(),
  x: t => Math.round(t).toString(16)
};

function Ep(t) {
  return t
}
var xp = Array.prototype.map,
  wp = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function gx(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Ep : dx(xp.call(t.grouping, Number), t.thousands + ""),
    r = t.currency === void 0 ? "" : t.currency[0] + "",
    n = t.currency === void 0 ? "" : t.currency[1] + "",
    o = t.decimal === void 0 ? "." : t.decimal + "",
    i = t.numerals === void 0 ? Ep : hx(xp.call(t.numerals, String)),
    a = t.percent === void 0 ? "%" : t.percent + "",
    u = t.minus === void 0 ? "\u2212" : t.minus + "",
    l = t.nan === void 0 ? "NaN" : t.nan + "";

  function c(f, p) {
    f = Un(f);
    var d = f.fill,
      y = f.align,
      m = f.sign,
      g = f.symbol,
      h = f.zero,
      b = f.width,
      w = f.comma,
      v = f.precision,
      E = f.trim,
      x = f.type;
    x === "n" ? (w = !0, x = "g") : bp[x] || (v === void 0 && (v = 12), E = !0, x = "g"), (h || d === "0" && y === "=") && (h = !0, d = "0", y = "=");
    var A = (p && p.prefix !== void 0 ? p.prefix : "") + (g === "$" ? r : g === "#" && /[boxX]/.test(x) ? "0" + x.toLowerCase() : ""),
      C = (g === "$" ? n : /[%p]/.test(x) ? a : "") + (p && p.suffix !== void 0 ? p.suffix : ""),
      I = bp[x],
      $ = /[defgprs%]/.test(x);
    v = v === void 0 ? 6 : /[gprs]/.test(x) ? Math.max(1, Math.min(21, v)) : Math.max(0, Math.min(20, v));

    function B(D) {
      var z = A,
        W = C,
        L, X, K;
      if (x === "c") W = I(D) + W, D = "";
      else {
        D = +D;
        var O = D < 0 || 1 / D < 0;
        if (D = isNaN(D) ? l : I(Math.abs(D), v), E && (D = mx(D)), O && +D == 0 && m !== "+" && (O = !1), z = (O ? m === "(" ? m : u : m === "-" || m === "(" ? "" : m) + z, W = (x === "s" && !isNaN(D) && xi !== void 0 ? wp[8 + xi / 3] : "") + W + (O && m === "(" ? ")" : ""), $) {
          for (L = -1, X = D.length; ++L < X;)
            if (K = D.charCodeAt(L), 48 > K || K > 57) {
              W = (K === 46 ? o + D.slice(L + 1) : D.slice(L)) + W, D = D.slice(0, L);
              break
            }
        }
      }
      w && !h && (D = e(D, 1 / 0));
      var S = z.length + D.length + W.length,
        _ = S < b ? new Array(b - S + 1).join(d) : "";
      switch (w && h && (D = e(_ + D, _.length ? b - W.length : 1 / 0), _ = ""), y) {
        case "<":
          D = z + D + W + _;
          break;
        case "=":
          D = z + _ + D + W;
          break;
        case "^":
          D = _.slice(0, S = _.length >> 1) + z + D + W + _.slice(S);
          break;
        default:
          D = _ + z + D + W;
          break
      }
      return i(D)
    }
    return B.toString = function() {
      return f + ""
    }, B
  }

  function s(f, p) {
    var d = Math.max(-8, Math.min(8, Math.floor($r(p) / 3))) * 3,
      y = Math.pow(10, -d),
      m = c((f = Un(f), f.type = "f", f), {
        suffix: wp[8 + d / 3]
      });
    return function(g) {
      return m(y * g)
    }
  }
  return {
    format: c,
    formatPrefix: s
  }
}
var wi, Gu, Op;
bx({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function bx(t) {
  return wi = gx(t), Gu = wi.format, Op = wi.formatPrefix, wi
}

function Ex(t) {
  return Math.max(0, -$r(Math.abs(t)))
}

function xx(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor($r(e) / 3))) * 3 - $r(Math.abs(t)))
}

function wx(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, $r(e) - $r(t)) + 1
}

function Sp(t, e, r, n) {
  var o = Ru(t, e, r),
    i;
  switch (n = Un(n ?? ",f"), n.type) {
    case "s": {
      var a = Math.max(Math.abs(t), Math.abs(e));
      return n.precision == null && !isNaN(i = xx(o, a)) && (n.precision = i), Op(n, a)
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = wx(o, Math.max(Math.abs(t), Math.abs(e)))) && (n.precision = i - (n.type === "e"));
      break
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = Ex(o)) && (n.precision = i - (n.type === "%") * 2);
      break
    }
  }
  return Gu(n)
}

function Ze(t) {
  var e = t.domain;
  return t.ticks = function(r) {
    var n = e();
    return Bu(n[0], n[n.length - 1], r ?? 10)
  }, t.tickFormat = function(r, n) {
    var o = e();
    return Sp(o[0], o[o.length - 1], r ?? 10, n)
  }, t.nice = function(r) {
    r == null && (r = 10);
    var n = e(),
      o = 0,
      i = n.length - 1,
      a = n[o],
      u = n[i],
      l, c, s = 10;
    for (u < a && (c = a, a = u, u = c, c = o, o = i, i = c); s-- > 0;) {
      if (c = zu(a, u, r), c === l) return n[o] = a, n[i] = u, e(n);
      if (c > 0) a = Math.floor(a / c) * c, u = Math.ceil(u / c) * c;
      else if (c < 0) a = Math.ceil(a * c) / c, u = Math.floor(u * c) / c;
      else break;
      l = c
    }
    return t
  }, t
}

function Oi() {
  var t = Vu();
  return t.copy = function() {
    return Fn(t, Oi())
  }, fe.apply(t, arguments), Ze(t)
}

function jp(t) {
  var e;

  function r(n) {
    return n == null || isNaN(n = +n) ? e : n
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (t = Array.from(n, gi), r) : t.slice()
  }, r.unknown = function(n) {
    return arguments.length ? (e = n, r) : e
  }, r.copy = function() {
    return jp(t).unknown(e)
  }, t = arguments.length ? Array.from(t, gi) : [0, 1], Ze(r)
}

function Ap(t, e) {
  t = t.slice();
  var r = 0,
    n = t.length - 1,
    o = t[r],
    i = t[n],
    a;
  return i < o && (a = r, r = n, n = a, a = o, o = i, i = a), t[r] = e.floor(o), t[n] = e.ceil(i), t
}

function Pp(t) {
  return Math.log(t)
}

function _p(t) {
  return Math.exp(t)
}

function Ox(t) {
  return -Math.log(-t)
}

function Sx(t) {
  return -Math.exp(-t)
}

function jx(t) {
  return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t
}

function Ax(t) {
  return t === 10 ? jx : t === Math.E ? Math.exp : e => Math.pow(t, e)
}

function Px(t) {
  return t === Math.E ? Math.log : t === 10 && Math.log10 || t === 2 && Math.log2 || (t = Math.log(t), e => Math.log(e) / t)
}

function kp(t) {
  return (e, r) => -t(-e, r)
}

function Zu(t) {
  let e = t(Pp, _p),
    r = e.domain,
    n = 10,
    o, i;

  function a() {
    return o = Px(n), i = Ax(n), r()[0] < 0 ? (o = kp(o), i = kp(i), t(Ox, Sx)) : t(Pp, _p), e
  }
  return e.base = function(u) {
    return arguments.length ? (n = +u, a()) : n
  }, e.domain = function(u) {
    return arguments.length ? (r(u), a()) : r()
  }, e.ticks = u => {
    let l = r(),
      c = l[0],
      s = l[l.length - 1],
      f = s < c;
    f && ([c, s] = [s, c]);
    let p = o(c),
      d = o(s),
      y, m, g = u == null ? 10 : +u,
      h = [];
    if (!(n % 1) && d - p < g) {
      if (p = Math.floor(p), d = Math.ceil(d), c > 0) {
        for (; p <= d; ++p)
          for (y = 1; y < n; ++y)
            if (m = p < 0 ? y / i(-p) : y * i(p), !(m < c)) {
              if (m > s) break;
              h.push(m)
            }
      } else
        for (; p <= d; ++p)
          for (y = n - 1; y >= 1; --y)
            if (m = p > 0 ? y / i(-p) : y * i(p), !(m < c)) {
              if (m > s) break;
              h.push(m)
            } h.length * 2 < g && (h = Bu(c, s, g))
    } else h = Bu(p, d, Math.min(d - p, g)).map(i);
    return f ? h.reverse() : h
  }, e.tickFormat = (u, l) => {
    if (u == null && (u = 10), l == null && (l = n === 10 ? "s" : ","), typeof l != "function" && (!(n % 1) && (l = Un(l)).precision == null && (l.trim = !0), l = Gu(l)), u === 1 / 0) return l;
    let c = Math.max(1, n * u / e.ticks().length);
    return s => {
      let f = s / i(Math.round(o(s)));
      return f * n < n - .5 && (f *= n), f <= c ? l(s) : ""
    }
  }, e.nice = () => r(Ap(r(), {
    floor: u => i(Math.floor(o(u))),
    ceil: u => i(Math.ceil(o(u)))
  })), e
}

function Mp() {
  let t = Zu(bi()).domain([1, 10]);
  return t.copy = () => Fn(t, Mp()).base(t.base()), fe.apply(t, arguments), t
}

function Tp(t) {
  return function(e) {
    return Math.sign(e) * Math.log1p(Math.abs(e / t))
  }
}

function Cp(t) {
  return function(e) {
    return Math.sign(e) * Math.expm1(Math.abs(e)) * t
  }
}

function Qu(t) {
  var e = 1,
    r = t(Tp(e), Cp(e));
  return r.constant = function(n) {
    return arguments.length ? t(Tp(e = +n), Cp(e)) : e
  }, Ze(r)
}

function Dp() {
  var t = Qu(bi());
  return t.copy = function() {
    return Fn(t, Dp()).constant(t.constant())
  }, fe.apply(t, arguments)
}

function Ip(t) {
  return function(e) {
    return e < 0 ? -Math.pow(-e, t) : Math.pow(e, t)
  }
}

function _x(t) {
  return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t)
}

function kx(t) {
  return t < 0 ? -t * t : t * t
}

function Ju(t) {
  var e = t(Vt, Vt),
    r = 1;

  function n() {
    return r === 1 ? t(Vt, Vt) : r === .5 ? t(_x, kx) : t(Ip(r), Ip(1 / r))
  }
  return e.exponent = function(o) {
    return arguments.length ? (r = +o, n()) : r
  }, Ze(e)
}

function tl() {
  var t = Ju(bi());
  return t.copy = function() {
    return Fn(t, tl()).exponent(t.exponent())
  }, fe.apply(t, arguments), t
}

function Mx() {
  return tl.apply(null, arguments).exponent(.5)
}

function Np(t) {
  return Math.sign(t) * t * t
}

function Tx(t) {
  return Math.sign(t) * Math.sqrt(Math.abs(t))
}

function Bp() {
  var t = Vu(),
    e = [0, 1],
    r = !1,
    n;

  function o(i) {
    var a = Tx(t(i));
    return isNaN(a) ? n : r ? Math.round(a) : a
  }
  return o.invert = function(i) {
    return t.invert(Np(i))
  }, o.domain = function(i) {
    return arguments.length ? (t.domain(i), o) : t.domain()
  }, o.range = function(i) {
    return arguments.length ? (t.range((e = Array.from(i, gi)).map(Np)), o) : e.slice()
  }, o.rangeRound = function(i) {
    return o.range(i).round(!0)
  }, o.round = function(i) {
    return arguments.length ? (r = !!i, o) : r
  }, o.clamp = function(i) {
    return arguments.length ? (t.clamp(i), o) : t.clamp()
  }, o.unknown = function(i) {
    return arguments.length ? (n = i, o) : n
  }, o.copy = function() {
    return Bp(t.domain(), e).round(r).clamp(t.clamp()).unknown(n)
  }, fe.apply(o, arguments), Ze(o)
}

function zp() {
  var t = [],
    e = [],
    r = [],
    n;

  function o() {
    var a = 0,
      u = Math.max(1, e.length);
    for (r = new Array(u - 1); ++a < u;) r[a - 1] = IE(t, a / u);
    return i
  }

  function i(a) {
    return a == null || isNaN(a = +a) ? n : e[In(r, a)]
  }
  return i.invertExtent = function(a) {
    var u = e.indexOf(a);
    return u < 0 ? [NaN, NaN] : [u > 0 ? r[u - 1] : t[0], u < r.length ? r[u] : t[t.length - 1]]
  }, i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [];
    for (let u of a) u != null && !isNaN(u = +u) && t.push(u);
    return t.sort(Ge), o()
  }, i.range = function(a) {
    return arguments.length ? (e = Array.from(a), o()) : e.slice()
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n
  }, i.quantiles = function() {
    return r.slice()
  }, i.copy = function() {
    return zp().domain(t).range(e).unknown(n)
  }, fe.apply(i, arguments)
}

function Rp() {
  var t = 0,
    e = 1,
    r = 1,
    n = [.5],
    o = [0, 1],
    i;

  function a(l) {
    return l != null && l <= l ? o[In(n, l, 0, r)] : i
  }

  function u() {
    var l = -1;
    for (n = new Array(r); ++l < r;) n[l] = ((l + 1) * e - (l - r) * t) / (r + 1);
    return a
  }
  return a.domain = function(l) {
    return arguments.length ? ([t, e] = l, t = +t, e = +e, u()) : [t, e]
  }, a.range = function(l) {
    return arguments.length ? (r = (o = Array.from(l)).length - 1, u()) : o.slice()
  }, a.invertExtent = function(l) {
    var c = o.indexOf(l);
    return c < 0 ? [NaN, NaN] : c < 1 ? [t, n[0]] : c >= r ? [n[r - 1], e] : [n[c - 1], n[c]]
  }, a.unknown = function(l) {
    return arguments.length && (i = l), a
  }, a.thresholds = function() {
    return n.slice()
  }, a.copy = function() {
    return Rp().domain([t, e]).range(o).unknown(i)
  }, fe.apply(Ze(a), arguments)
}

function Wp() {
  var t = [.5],
    e = [0, 1],
    r, n = 1;

  function o(i) {
    return i != null && i <= i ? e[In(t, i, 0, n)] : r
  }
  return o.domain = function(i) {
    return arguments.length ? (t = Array.from(i), n = Math.min(t.length, e.length - 1), o) : t.slice()
  }, o.range = function(i) {
    return arguments.length ? (e = Array.from(i), n = Math.min(t.length, e.length - 1), o) : e.slice()
  }, o.invertExtent = function(i) {
    var a = e.indexOf(i);
    return [t[a - 1], t[a]]
  }, o.unknown = function(i) {
    return arguments.length ? (r = i, o) : r
  }, o.copy = function() {
    return Wp().domain(t).range(e).unknown(r)
  }, fe.apply(o, arguments)
}
var el = new Date,
  rl = new Date;

function zt(t, e, r, n) {
  function o(i) {
    return t(i = arguments.length === 0 ? new Date : new Date(+i)), i
  }
  return o.floor = i => (t(i = new Date(+i)), i), o.ceil = i => (t(i = new Date(i - 1)), e(i, 1), t(i), i), o.round = i => {
    let a = o(i),
      u = o.ceil(i);
    return i - a < u - i ? a : u
  }, o.offset = (i, a) => (e(i = new Date(+i), a == null ? 1 : Math.floor(a)), i), o.range = (i, a, u) => {
    let l = [];
    if (i = o.ceil(i), u = u == null ? 1 : Math.floor(u), !(i < a) || !(u > 0)) return l;
    let c;
    do l.push(c = new Date(+i)), e(i, u), t(i); while (c < i && i < a);
    return l
  }, o.filter = i => zt(a => {
    if (a >= a)
      for (; t(a), !i(a);) a.setTime(a - 1)
  }, (a, u) => {
    if (a >= a)
      if (u < 0)
        for (; ++u <= 0;)
          for (; e(a, -1), !i(a););
      else
        for (; --u >= 0;)
          for (; e(a, 1), !i(a););
  }), r && (o.count = (i, a) => (el.setTime(+i), rl.setTime(+a), t(el), t(rl), Math.floor(r(el, rl))), o.every = i => (i = Math.floor(i), !isFinite(i) || !(i > 0) ? null : i > 1 ? o.filter(n ? a => n(a) % i === 0 : a => o.count(0, a) % i === 0) : o)), o
}
var Si = zt(() => {}, (t, e) => {
  t.setTime(+t + e)
}, (t, e) => e - t);
Si.every = t => (t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? zt(e => {
  e.setTime(Math.floor(e / t) * t)
}, (e, r) => {
  e.setTime(+e + r * t)
}, (e, r) => (r - e) / t) : Si);
var D4 = Si.range,
  pr = zt(t => {
    t.setTime(t - t.getMilliseconds())
  }, (t, e) => {
    t.setTime(+t + e * 1e3)
  }, (t, e) => (e - t) / 1e3, t => t.getUTCSeconds()),
  I4 = pr.range,
  nl = zt(t => {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * 1e3)
  }, (t, e) => {
    t.setTime(+t + e * 6e4)
  }, (t, e) => (e - t) / 6e4, t => t.getMinutes()),
  N4 = nl.range,
  ol = zt(t => {
    t.setUTCSeconds(0, 0)
  }, (t, e) => {
    t.setTime(+t + e * 6e4)
  }, (t, e) => (e - t) / 6e4, t => t.getUTCMinutes()),
  B4 = ol.range,
  il = zt(t => {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * 1e3 - t.getMinutes() * 6e4)
  }, (t, e) => {
    t.setTime(+t + e * 36e5)
  }, (t, e) => (e - t) / 36e5, t => t.getHours()),
  z4 = il.range,
  al = zt(t => {
    t.setUTCMinutes(0, 0, 0)
  }, (t, e) => {
    t.setTime(+t + e * 36e5)
  }, (t, e) => (e - t) / 36e5, t => t.getUTCHours()),
  R4 = al.range,
  qn = zt(t => t.setHours(0, 0, 0, 0), (t, e) => t.setDate(t.getDate() + e), (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 864e5, t => t.getDate() - 1),
  W4 = qn.range,
  ji = zt(t => {
    t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCDate(t.getUTCDate() + e)
  }, (t, e) => (e - t) / 864e5, t => t.getUTCDate() - 1),
  L4 = ji.range,
  Lp = zt(t => {
    t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCDate(t.getUTCDate() + e)
  }, (t, e) => (e - t) / 864e5, t => Math.floor(t / 864e5)),
  $4 = Lp.range;

function dr(t) {
  return zt(e => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0)
  }, (e, r) => {
    e.setDate(e.getDate() + r * 7)
  }, (e, r) => (r - e - (r.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 6048e5)
}
var Ai = dr(0),
  Pi = dr(1),
  Cx = dr(2),
  Dx = dr(3),
  Fr = dr(4),
  Ix = dr(5),
  Nx = dr(6),
  F4 = Ai.range,
  U4 = Pi.range,
  q4 = Cx.range,
  H4 = Dx.range,
  X4 = Fr.range,
  Y4 = Ix.range,
  V4 = Nx.range;

function hr(t) {
  return zt(e => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0)
  }, (e, r) => {
    e.setUTCDate(e.getUTCDate() + r * 7)
  }, (e, r) => (r - e) / 6048e5)
}
var _i = hr(0),
  ki = hr(1),
  Bx = hr(2),
  zx = hr(3),
  Ur = hr(4),
  Rx = hr(5),
  Wx = hr(6),
  K4 = _i.range,
  G4 = ki.range,
  Z4 = Bx.range,
  Q4 = zx.range,
  J4 = Ur.range,
  tM = Rx.range,
  eM = Wx.range,
  ul = zt(t => {
    t.setDate(1), t.setHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setMonth(t.getMonth() + e)
  }, (t, e) => e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12, t => t.getMonth()),
  rM = ul.range,
  ll = zt(t => {
    t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCMonth(t.getUTCMonth() + e)
  }, (t, e) => e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12, t => t.getUTCMonth()),
  nM = ll.range,
  Ue = zt(t => {
    t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setFullYear(t.getFullYear() + e)
  }, (t, e) => e.getFullYear() - t.getFullYear(), t => t.getFullYear());
Ue.every = t => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : zt(e => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
}, (e, r) => {
  e.setFullYear(e.getFullYear() + r * t)
});
var oM = Ue.range,
  qe = zt(t => {
    t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCFullYear(t.getUTCFullYear() + e)
  }, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), t => t.getUTCFullYear());
qe.every = t => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : zt(e => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
}, (e, r) => {
  e.setUTCFullYear(e.getUTCFullYear() + r * t)
});
var iM = qe.range;

function $p(t, e, r, n, o, i) {
  let a = [
    [pr, 1, 1e3],
    [pr, 5, 5e3],
    [pr, 15, 15e3],
    [pr, 30, 3e4],
    [i, 1, 6e4],
    [i, 5, 3e5],
    [i, 15, 9e5],
    [i, 30, 18e5],
    [o, 1, 36e5],
    [o, 3, 108e5],
    [o, 6, 216e5],
    [o, 12, 432e5],
    [n, 1, 864e5],
    [n, 2, 1728e5],
    [r, 1, 6048e5],
    [e, 1, 2592e6],
    [e, 3, 7776e6],
    [t, 1, 31536e6]
  ];

  function u(c, s, f) {
    let p = s < c;
    p && ([c, s] = [s, c]);
    let d = f && typeof f.range == "function" ? f : l(c, s, f),
      y = d ? d.range(c, +s + 1) : [];
    return p ? y.reverse() : y
  }

  function l(c, s, f) {
    let p = Math.abs(s - c) / f,
      d = Nu(([, , g]) => g).right(a, p);
    if (d === a.length) return t.every(Ru(c / 31536e6, s / 31536e6, f));
    if (d === 0) return Si.every(Math.max(Ru(c, s, f), 1));
    let [y, m] = a[p / a[d - 1][2] < a[d][2] / p ? d - 1 : d];
    return y.every(m)
  }
  return [u, l]
}
var [Lx, $x] = $p(qe, ll, _i, Lp, al, ol), [Fx, Ux] = $p(Ue, ul, Ai, qn, il, nl);

function cl(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
}

function sl(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
}

function Hn(t, e, r) {
  return {
    y: t,
    m: e,
    d: r,
    H: 0,
    M: 0,
    S: 0,
    L: 0
  }
}

function qx(t) {
  var e = t.dateTime,
    r = t.date,
    n = t.time,
    o = t.periods,
    i = t.days,
    a = t.shortDays,
    u = t.months,
    l = t.shortMonths,
    c = Xn(o),
    s = Yn(o),
    f = Xn(i),
    p = Yn(i),
    d = Xn(a),
    y = Yn(a),
    m = Xn(u),
    g = Yn(u),
    h = Xn(l),
    b = Yn(l),
    w = {
      a: K,
      A: O,
      b: S,
      B: _,
      c: null,
      d: Yp,
      e: Yp,
      f: dw,
      g: Ow,
      G: jw,
      H: sw,
      I: fw,
      j: pw,
      L: Vp,
      m: hw,
      M: yw,
      p: j,
      q: k,
      Q: t0,
      s: e0,
      S: mw,
      u: vw,
      U: gw,
      V: bw,
      w: Ew,
      W: xw,
      x: null,
      X: null,
      y: ww,
      Y: Sw,
      Z: Aw,
      "%": Jp
    },
    v = {
      a: M,
      A: U,
      b: H,
      B: G,
      c: null,
      d: Gp,
      e: Gp,
      f: Mw,
      g: Lw,
      G: Fw,
      H: Pw,
      I: _w,
      j: kw,
      L: Zp,
      m: Tw,
      M: Cw,
      p: et,
      q: rt,
      Q: t0,
      s: e0,
      S: Dw,
      u: Iw,
      U: Nw,
      V: Bw,
      w: zw,
      W: Rw,
      x: null,
      X: null,
      y: Ww,
      Y: $w,
      Z: Uw,
      "%": Jp
    },
    E = {
      a: $,
      A: B,
      b: D,
      B: z,
      c: W,
      d: Hp,
      e: Hp,
      f: aw,
      g: qp,
      G: Up,
      H: Xp,
      I: Xp,
      j: rw,
      L: iw,
      m: ew,
      M: nw,
      p: I,
      q: tw,
      Q: lw,
      s: cw,
      S: ow,
      u: Kx,
      U: Gx,
      V: Zx,
      w: Vx,
      W: Qx,
      x: L,
      X,
      y: qp,
      Y: Up,
      Z: Jx,
      "%": uw
    };
  w.x = x(r, w), w.X = x(n, w), w.c = x(e, w), v.x = x(r, v), v.X = x(n, v), v.c = x(e, v);

  function x(F, ut) {
    return function(J) {
      var Y = [],
        st = -1,
        ct = 0,
        Pt = F.length,
        lt, At, Qt;
      for (J instanceof Date || (J = new Date(+J)); ++st < Pt;) F.charCodeAt(st) === 37 && (Y.push(F.slice(ct, st)), (At = Fp[lt = F.charAt(++st)]) != null ? lt = F.charAt(++st) : At = lt === "e" ? " " : "0", (Qt = ut[lt]) && (lt = Qt(J, At)), Y.push(lt), ct = st + 1);
      return Y.push(F.slice(ct, st)), Y.join("")
    }
  }

  function A(F, ut) {
    return function(J) {
      var Y = Hn(1900, void 0, 1),
        st = C(Y, F, J += "", 0),
        ct, Pt;
      if (st != J.length) return null;
      if ("Q" in Y) return new Date(Y.Q);
      if ("s" in Y) return new Date(Y.s * 1e3 + ("L" in Y ? Y.L : 0));
      if (ut && !("Z" in Y) && (Y.Z = 0), "p" in Y && (Y.H = Y.H % 12 + Y.p * 12), Y.m === void 0 && (Y.m = "q" in Y ? Y.q : 0), "V" in Y) {
        if (Y.V < 1 || Y.V > 53) return null;
        "w" in Y || (Y.w = 1), "Z" in Y ? (ct = sl(Hn(Y.y, 0, 1)), Pt = ct.getUTCDay(), ct = Pt > 4 || Pt === 0 ? ki.ceil(ct) : ki(ct), ct = ji.offset(ct, (Y.V - 1) * 7), Y.y = ct.getUTCFullYear(), Y.m = ct.getUTCMonth(), Y.d = ct.getUTCDate() + (Y.w + 6) % 7) : (ct = cl(Hn(Y.y, 0, 1)), Pt = ct.getDay(), ct = Pt > 4 || Pt === 0 ? Pi.ceil(ct) : Pi(ct), ct = qn.offset(ct, (Y.V - 1) * 7), Y.y = ct.getFullYear(), Y.m = ct.getMonth(), Y.d = ct.getDate() + (Y.w + 6) % 7)
      } else("W" in Y || "U" in Y) && ("w" in Y || (Y.w = "u" in Y ? Y.u % 7 : "W" in Y ? 1 : 0), Pt = "Z" in Y ? sl(Hn(Y.y, 0, 1)).getUTCDay() : cl(Hn(Y.y, 0, 1)).getDay(), Y.m = 0, Y.d = "W" in Y ? (Y.w + 6) % 7 + Y.W * 7 - (Pt + 5) % 7 : Y.w + Y.U * 7 - (Pt + 6) % 7);
      return "Z" in Y ? (Y.H += Y.Z / 100 | 0, Y.M += Y.Z % 100, sl(Y)) : cl(Y)
    }
  }

  function C(F, ut, J, Y) {
    for (var st = 0, ct = ut.length, Pt = J.length, lt, At; st < ct;) {
      if (Y >= Pt) return -1;
      if (lt = ut.charCodeAt(st++), lt === 37) {
        if (lt = ut.charAt(st++), At = E[lt in Fp ? ut.charAt(st++) : lt], !At || (Y = At(F, J, Y)) < 0) return -1
      } else if (lt != J.charCodeAt(Y++)) return -1
    }
    return Y
  }

  function I(F, ut, J) {
    var Y = c.exec(ut.slice(J));
    return Y ? (F.p = s.get(Y[0].toLowerCase()), J + Y[0].length) : -1
  }

  function $(F, ut, J) {
    var Y = d.exec(ut.slice(J));
    return Y ? (F.w = y.get(Y[0].toLowerCase()), J + Y[0].length) : -1
  }

  function B(F, ut, J) {
    var Y = f.exec(ut.slice(J));
    return Y ? (F.w = p.get(Y[0].toLowerCase()), J + Y[0].length) : -1
  }

  function D(F, ut, J) {
    var Y = h.exec(ut.slice(J));
    return Y ? (F.m = b.get(Y[0].toLowerCase()), J + Y[0].length) : -1
  }

  function z(F, ut, J) {
    var Y = m.exec(ut.slice(J));
    return Y ? (F.m = g.get(Y[0].toLowerCase()), J + Y[0].length) : -1
  }

  function W(F, ut, J) {
    return C(F, e, ut, J)
  }

  function L(F, ut, J) {
    return C(F, r, ut, J)
  }

  function X(F, ut, J) {
    return C(F, n, ut, J)
  }

  function K(F) {
    return a[F.getDay()]
  }

  function O(F) {
    return i[F.getDay()]
  }

  function S(F) {
    return l[F.getMonth()]
  }

  function _(F) {
    return u[F.getMonth()]
  }

  function j(F) {
    return o[+(F.getHours() >= 12)]
  }

  function k(F) {
    return 1 + ~~(F.getMonth() / 3)
  }

  function M(F) {
    return a[F.getUTCDay()]
  }

  function U(F) {
    return i[F.getUTCDay()]
  }

  function H(F) {
    return l[F.getUTCMonth()]
  }

  function G(F) {
    return u[F.getUTCMonth()]
  }

  function et(F) {
    return o[+(F.getUTCHours() >= 12)]
  }

  function rt(F) {
    return 1 + ~~(F.getUTCMonth() / 3)
  }
  return {
    format: function(F) {
      var ut = x(F += "", w);
      return ut.toString = function() {
        return F
      }, ut
    },
    parse: function(F) {
      var ut = A(F += "", !1);
      return ut.toString = function() {
        return F
      }, ut
    },
    utcFormat: function(F) {
      var ut = x(F += "", v);
      return ut.toString = function() {
        return F
      }, ut
    },
    utcParse: function(F) {
      var ut = A(F += "", !0);
      return ut.toString = function() {
        return F
      }, ut
    }
  }
}
var Fp = {
    "-": "",
    _: " ",
    0: "0"
  },
  Lt = /^\s*\d+/,
  Hx = /^%/,
  Xx = /[\\^$*+?|[\]().{}]/g;

function Ot(t, e, r) {
  var n = t < 0 ? "-" : "",
    o = (n ? -t : t) + "",
    i = o.length;
  return n + (i < r ? new Array(r - i + 1).join(e) + o : o)
}

function Yx(t) {
  return t.replace(Xx, "\\$&")
}

function Xn(t) {
  return new RegExp("^(?:" + t.map(Yx).join("|") + ")", "i")
}

function Yn(t) {
  return new Map(t.map((e, r) => [e.toLowerCase(), r]))
}

function Vx(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 1));
  return n ? (t.w = +n[0], r + n[0].length) : -1
}

function Kx(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 1));
  return n ? (t.u = +n[0], r + n[0].length) : -1
}

function Gx(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 2));
  return n ? (t.U = +n[0], r + n[0].length) : -1
}

function Zx(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 2));
  return n ? (t.V = +n[0], r + n[0].length) : -1
}

function Qx(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 2));
  return n ? (t.W = +n[0], r + n[0].length) : -1
}

function Up(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 4));
  return n ? (t.y = +n[0], r + n[0].length) : -1
}

function qp(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 2));
  return n ? (t.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1
}

function Jx(t, e, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
  return n ? (t.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1
}

function tw(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 1));
  return n ? (t.q = n[0] * 3 - 3, r + n[0].length) : -1
}

function ew(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 2));
  return n ? (t.m = n[0] - 1, r + n[0].length) : -1
}

function Hp(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 2));
  return n ? (t.d = +n[0], r + n[0].length) : -1
}

function rw(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 3));
  return n ? (t.m = 0, t.d = +n[0], r + n[0].length) : -1
}

function Xp(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 2));
  return n ? (t.H = +n[0], r + n[0].length) : -1
}

function nw(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 2));
  return n ? (t.M = +n[0], r + n[0].length) : -1
}

function ow(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 2));
  return n ? (t.S = +n[0], r + n[0].length) : -1
}

function iw(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 3));
  return n ? (t.L = +n[0], r + n[0].length) : -1
}

function aw(t, e, r) {
  var n = Lt.exec(e.slice(r, r + 6));
  return n ? (t.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1
}

function uw(t, e, r) {
  var n = Hx.exec(e.slice(r, r + 1));
  return n ? r + n[0].length : -1
}

function lw(t, e, r) {
  var n = Lt.exec(e.slice(r));
  return n ? (t.Q = +n[0], r + n[0].length) : -1
}

function cw(t, e, r) {
  var n = Lt.exec(e.slice(r));
  return n ? (t.s = +n[0], r + n[0].length) : -1
}

function Yp(t, e) {
  return Ot(t.getDate(), e, 2)
}

function sw(t, e) {
  return Ot(t.getHours(), e, 2)
}

function fw(t, e) {
  return Ot(t.getHours() % 12 || 12, e, 2)
}

function pw(t, e) {
  return Ot(1 + qn.count(Ue(t), t), e, 3)
}

function Vp(t, e) {
  return Ot(t.getMilliseconds(), e, 3)
}

function dw(t, e) {
  return Vp(t, e) + "000"
}

function hw(t, e) {
  return Ot(t.getMonth() + 1, e, 2)
}

function yw(t, e) {
  return Ot(t.getMinutes(), e, 2)
}

function mw(t, e) {
  return Ot(t.getSeconds(), e, 2)
}

function vw(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e
}

function gw(t, e) {
  return Ot(Ai.count(Ue(t) - 1, t), e, 2)
}

function Kp(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Fr(t) : Fr.ceil(t)
}

function bw(t, e) {
  return t = Kp(t), Ot(Fr.count(Ue(t), t) + (Ue(t).getDay() === 4), e, 2)
}

function Ew(t) {
  return t.getDay()
}

function xw(t, e) {
  return Ot(Pi.count(Ue(t) - 1, t), e, 2)
}

function ww(t, e) {
  return Ot(t.getFullYear() % 100, e, 2)
}

function Ow(t, e) {
  return t = Kp(t), Ot(t.getFullYear() % 100, e, 2)
}

function Sw(t, e) {
  return Ot(t.getFullYear() % 1e4, e, 4)
}

function jw(t, e) {
  var r = t.getDay();
  return t = r >= 4 || r === 0 ? Fr(t) : Fr.ceil(t), Ot(t.getFullYear() % 1e4, e, 4)
}

function Aw(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + Ot(e / 60 | 0, "0", 2) + Ot(e % 60, "0", 2)
}

function Gp(t, e) {
  return Ot(t.getUTCDate(), e, 2)
}

function Pw(t, e) {
  return Ot(t.getUTCHours(), e, 2)
}

function _w(t, e) {
  return Ot(t.getUTCHours() % 12 || 12, e, 2)
}

function kw(t, e) {
  return Ot(1 + ji.count(qe(t), t), e, 3)
}

function Zp(t, e) {
  return Ot(t.getUTCMilliseconds(), e, 3)
}

function Mw(t, e) {
  return Zp(t, e) + "000"
}

function Tw(t, e) {
  return Ot(t.getUTCMonth() + 1, e, 2)
}

function Cw(t, e) {
  return Ot(t.getUTCMinutes(), e, 2)
}

function Dw(t, e) {
  return Ot(t.getUTCSeconds(), e, 2)
}

function Iw(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e
}

function Nw(t, e) {
  return Ot(_i.count(qe(t) - 1, t), e, 2)
}

function Qp(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Ur(t) : Ur.ceil(t)
}

function Bw(t, e) {
  return t = Qp(t), Ot(Ur.count(qe(t), t) + (qe(t).getUTCDay() === 4), e, 2)
}

function zw(t) {
  return t.getUTCDay()
}

function Rw(t, e) {
  return Ot(ki.count(qe(t) - 1, t), e, 2)
}

function Ww(t, e) {
  return Ot(t.getUTCFullYear() % 100, e, 2)
}

function Lw(t, e) {
  return t = Qp(t), Ot(t.getUTCFullYear() % 100, e, 2)
}

function $w(t, e) {
  return Ot(t.getUTCFullYear() % 1e4, e, 4)
}

function Fw(t, e) {
  var r = t.getUTCDay();
  return t = r >= 4 || r === 0 ? Ur(t) : Ur.ceil(t), Ot(t.getUTCFullYear() % 1e4, e, 4)
}

function Uw() {
  return "+0000"
}

function Jp() {
  return "%"
}

function t0(t) {
  return +t
}

function e0(t) {
  return Math.floor(+t / 1e3)
}
var qr, r0, qw, n0, Hw;
Xw({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function Xw(t) {
  return qr = qx(t), r0 = qr.format, qw = qr.parse, n0 = qr.utcFormat, Hw = qr.utcParse, qr
}

function Yw(t) {
  return new Date(t)
}

function Vw(t) {
  return t instanceof Date ? +t : +new Date(+t)
}

function fl(t, e, r, n, o, i, a, u, l, c) {
  var s = Vu(),
    f = s.invert,
    p = s.domain,
    d = c(".%L"),
    y = c(":%S"),
    m = c("%I:%M"),
    g = c("%I %p"),
    h = c("%a %d"),
    b = c("%b %d"),
    w = c("%B"),
    v = c("%Y");

  function E(x) {
    return (l(x) < x ? d : u(x) < x ? y : a(x) < x ? m : i(x) < x ? g : n(x) < x ? o(x) < x ? h : b : r(x) < x ? w : v)(x)
  }
  return s.invert = function(x) {
    return new Date(f(x))
  }, s.domain = function(x) {
    return arguments.length ? p(Array.from(x, Vw)) : p().map(Yw)
  }, s.ticks = function(x) {
    var A = p();
    return t(A[0], A[A.length - 1], x ?? 10)
  }, s.tickFormat = function(x, A) {
    return A == null ? E : c(A)
  }, s.nice = function(x) {
    var A = p();
    return (!x || typeof x.range != "function") && (x = e(A[0], A[A.length - 1], x ?? 10)), x ? p(Ap(A, x)) : s
  }, s.copy = function() {
    return Fn(s, fl(t, e, r, n, o, i, a, u, l, c))
  }, s
}

function Kw() {
  return fe.apply(fl(Fx, Ux, Ue, ul, Ai, qn, il, nl, pr, r0).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments)
}

function Gw() {
  return fe.apply(fl(Lx, $x, qe, ll, _i, ji, al, ol, pr, n0).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments)
}

function Mi() {
  var t = 0,
    e = 1,
    r, n, o, i, a = Vt,
    u = !1,
    l;

  function c(f) {
    return f == null || isNaN(f = +f) ? l : a(o === 0 ? .5 : (f = (i(f) - r) * o, u ? Math.max(0, Math.min(1, f)) : f))
  }
  c.domain = function(f) {
    return arguments.length ? ([t, e] = f, r = i(t = +t), n = i(e = +e), o = r === n ? 0 : 1 / (n - r), c) : [t, e]
  }, c.clamp = function(f) {
    return arguments.length ? (u = !!f, c) : u
  }, c.interpolator = function(f) {
    return arguments.length ? (a = f, c) : a
  };

  function s(f) {
    return function(p) {
      var d, y;
      return arguments.length ? ([d, y] = p, a = f(d, y), c) : [a(0), a(1)]
    }
  }
  return c.range = s(Lr), c.rangeRound = s(Xu), c.unknown = function(f) {
      return arguments.length ? (l = f, c) : l
    },
    function(f) {
      return i = f, r = f(t), n = f(e), o = r === n ? 0 : 1 / (n - r), c
    }
}

function Qe(t, e) {
  return e.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown())
}

function o0() {
  var t = Ze(Mi()(Vt));
  return t.copy = function() {
    return Qe(t, o0())
  }, Fe.apply(t, arguments)
}

function i0() {
  var t = Zu(Mi()).domain([1, 10]);
  return t.copy = function() {
    return Qe(t, i0()).base(t.base())
  }, Fe.apply(t, arguments)
}

function a0() {
  var t = Qu(Mi());
  return t.copy = function() {
    return Qe(t, a0()).constant(t.constant())
  }, Fe.apply(t, arguments)
}

function pl() {
  var t = Ju(Mi());
  return t.copy = function() {
    return Qe(t, pl()).exponent(t.exponent())
  }, Fe.apply(t, arguments)
}

function Zw() {
  return pl.apply(null, arguments).exponent(.5)
}

function u0() {
  var t = [],
    e = Vt;

  function r(n) {
    if (n != null && !isNaN(n = +n)) return e((In(t, n, 1) - 1) / (t.length - 1))
  }
  return r.domain = function(n) {
    if (!arguments.length) return t.slice();
    t = [];
    for (let o of n) o != null && !isNaN(o = +o) && t.push(o);
    return t.sort(Ge), r
  }, r.interpolator = function(n) {
    return arguments.length ? (e = n, r) : e
  }, r.range = function() {
    return t.map((n, o) => e(o / (t.length - 1)))
  }, r.quantiles = function(n) {
    return Array.from({
      length: n + 1
    }, (o, i) => DE(t, i / n))
  }, r.copy = function() {
    return u0(e).domain(t)
  }, Fe.apply(r, arguments)
}

function Ti() {
  var t = 0,
    e = .5,
    r = 1,
    n = 1,
    o, i, a, u, l, c = Vt,
    s, f = !1,
    p;

  function d(m) {
    return isNaN(m = +m) ? p : (m = .5 + ((m = +s(m)) - i) * (n * m < n * i ? u : l), c(f ? Math.max(0, Math.min(1, m)) : m))
  }
  d.domain = function(m) {
    return arguments.length ? ([t, e, r] = m, o = s(t = +t), i = s(e = +e), a = s(r = +r), u = o === i ? 0 : .5 / (i - o), l = i === a ? 0 : .5 / (a - i), n = i < o ? -1 : 1, d) : [t, e, r]
  }, d.clamp = function(m) {
    return arguments.length ? (f = !!m, d) : f
  }, d.interpolator = function(m) {
    return arguments.length ? (c = m, d) : c
  };

  function y(m) {
    return function(g) {
      var h, b, w;
      return arguments.length ? ([h, b, w] = g, c = ux(m, [h, b, w]), d) : [c(0), c(.5), c(1)]
    }
  }
  return d.range = y(Lr), d.rangeRound = y(Xu), d.unknown = function(m) {
      return arguments.length ? (p = m, d) : p
    },
    function(m) {
      return s = m, o = m(t), i = m(e), a = m(r), u = o === i ? 0 : .5 / (i - o), l = i === a ? 0 : .5 / (a - i), n = i < o ? -1 : 1, d
    }
}

function l0() {
  var t = Ze(Ti()(Vt));
  return t.copy = function() {
    return Qe(t, l0())
  }, Fe.apply(t, arguments)
}

function c0() {
  var t = Zu(Ti()).domain([.1, 1, 10]);
  return t.copy = function() {
    return Qe(t, c0()).base(t.base())
  }, Fe.apply(t, arguments)
}

function s0() {
  var t = Qu(Ti());
  return t.copy = function() {
    return Qe(t, s0()).constant(t.constant())
  }, Fe.apply(t, arguments)
}

function dl() {
  var t = Ju(Ti());
  return t.copy = function() {
    return Qe(t, dl()).exponent(t.exponent())
  }, Fe.apply(t, arguments)
}

function Qw() {
  return dl.apply(null, arguments).exponent(.5)
}
var Ci = it(wv()),
  Di = it(Sv()),
  pe = it(ve()),
  Vn = it(Dt()),
  Jw = it($a()),
  f0 = it(_r()),
  t2 = it(Av()),
  hl = it(Uc()),
  e2 = it(Fa()),
  r2 = it(Lo()),
  n2 = it(Ka()),
  jt = it(ps());

function o2(t) {
  return l2(t) || u2(t) || a2(t) || i2()
}

function i2() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function a2(t, e) {
  if (t) {
    if (typeof t == "string") return yl(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return yl(t, e)
  }
}

function u2(t) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(t)) return Array.from(t)
}

function l2(t) {
  if (Array.isArray(t)) return yl(t)
}

function yl(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var c2 = function(t) {
    return t
  },
  p0 = {
    "@@functional/placeholder": !0
  },
  d0 = function(t) {
    return t === p0
  },
  h0 = function(t) {
    return function e() {
      return arguments.length === 0 || arguments.length === 1 && d0(arguments.length <= 0 ? void 0 : arguments[0]) ? e : t.apply(void 0, arguments)
    }
  },
  s2 = function t(e, r) {
    return e === 1 ? r : h0(function() {
      for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
      var a = o.filter(function(u) {
        return u !== p0
      }).length;
      return a >= e ? r.apply(void 0, o) : t(e - a, h0(function() {
        for (var u = arguments.length, l = new Array(u), c = 0; c < u; c++) l[c] = arguments[c];
        var s = o.map(function(f) {
          return d0(f) ? l.shift() : f
        });
        return r.apply(void 0, o2(s).concat(l))
      }))
    })
  },
  Ii = function(t) {
    return s2(t.length, t)
  },
  Ni = function(t, e) {
    for (var r = [], n = t; n < e; ++n) r[n - t] = n;
    return r
  },
  y0 = Ii(function(t, e) {
    return Array.isArray(e) ? e.map(t) : Object.keys(e).map(function(r) {
      return e[r]
    }).map(t)
  }),
  m0 = function() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
    if (!e.length) return c2;
    var n = e.reverse(),
      o = n[0],
      i = n.slice(1);
    return function() {
      return i.reduce(function(a, u) {
        return u(a)
      }, o.apply(void 0, arguments))
    }
  },
  Bi = function(t) {
    return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("")
  },
  ml = function(t) {
    var e = null,
      r = null;
    return function() {
      for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
      return e && o.every(function(a, u) {
        return a === e[u]
      }) || (e = o, r = t.apply(void 0, o)), r
    }
  },
  v0 = it(ps());

function f2(t) {
  var e;
  return t === 0 ? e = 1 : e = Math.floor(new v0.default(t).abs().log(10).toNumber()) + 1, e
}

function p2(t, e, r) {
  for (var n = new v0.default(t), o = 0, i = []; n.lt(e) && o < 1e5;) i.push(n.toNumber()), n = n.add(r), o++;
  return i
}
var d2 = Ii(function(t, e, r) {
    var n = +t,
      o = +e;
    return n + r * (o - n)
  }),
  h2 = Ii(function(t, e, r) {
    var n = e - +t;
    return n = n || 1 / 0, (r - t) / n
  }),
  y2 = Ii(function(t, e, r) {
    var n = e - +t;
    return n = n || 1 / 0, Math.max(0, Math.min(1, (r - t) / n))
  }),
  zi = {
    rangeStep: p2,
    getDigitCount: f2,
    interpolateNumber: d2,
    uninterpolateNumber: h2,
    uninterpolateTruncation: y2
  };

function vl(t) {
  return g2(t) || v2(t) || g0(t) || m2()
}

function m2() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function v2(t) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(t)) return Array.from(t)
}

function g2(t) {
  if (Array.isArray(t)) return gl(t)
}

function yr(t, e) {
  return x2(t) || E2(t, e) || g0(t, e) || b2()
}

function b2() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function g0(t, e) {
  if (t) {
    if (typeof t == "string") return gl(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return gl(t, e)
  }
}

function gl(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function E2(t, e) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(t)))) {
    var r = [],
      n = !0,
      o = !1,
      i = void 0;
    try {
      for (var a = t[Symbol.iterator](), u; !(n = (u = a.next()).done) && (r.push(u.value), !(e && r.length === e)); n = !0);
    } catch (l) {
      o = !0, i = l
    } finally {
      try {
        !n && a.return != null && a.return()
      } finally {
        if (o) throw i
      }
    }
    return r
  }
}

function x2(t) {
  if (Array.isArray(t)) return t
}

function bl(t) {
  var e = yr(t, 2),
    r = e[0],
    n = e[1],
    o = r,
    i = n;
  return r > n && (o = n, i = r), [o, i]
}

function El(t, e, r) {
  if (t.lte(0)) return new jt.default(0);
  var n = zi.getDigitCount(t.toNumber()),
    o = new jt.default(10).pow(n),
    i = t.div(o),
    a = n !== 1 ? .05 : .1,
    u = new jt.default(Math.ceil(i.div(a).toNumber())).add(r).mul(a),
    l = u.mul(o);
  return e ? l : new jt.default(Math.ceil(l))
}

function b0(t, e, r) {
  var n = 1,
    o = new jt.default(t);
  if (!o.isint() && r) {
    var i = Math.abs(t);
    i < 1 ? (n = new jt.default(10).pow(zi.getDigitCount(t) - 1), o = new jt.default(Math.floor(o.div(n).toNumber())).mul(n)) : i > 1 && (o = new jt.default(Math.floor(t)))
  } else t === 0 ? o = new jt.default(Math.floor((e - 1) / 2)) : r || (o = new jt.default(Math.floor(t)));
  var a = Math.floor((e - 1) / 2),
    u = m0(y0(function(l) {
      return o.add(new jt.default(l - a).mul(n)).toNumber()
    }), Ni);
  return u(0, e)
}

function E0(t, e, r, n) {
  var o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((e - t) / (r - 1))) return {
    step: new jt.default(0),
    tickMin: new jt.default(0),
    tickMax: new jt.default(0)
  };
  var i = El(new jt.default(e).sub(t).div(r - 1), n, o),
    a;
  t <= 0 && e >= 0 ? a = new jt.default(0) : (a = new jt.default(t).add(e).div(2), a = a.sub(new jt.default(a).mod(i)));
  var u = Math.ceil(a.sub(t).div(i).toNumber()),
    l = Math.ceil(new jt.default(e).sub(a).div(i).toNumber()),
    c = u + l + 1;
  return c > r ? E0(t, e, r, n, o + 1) : (c < r && (l = e > 0 ? l + (r - c) : l, u = e > 0 ? u : u + (r - c)), {
    step: i,
    tickMin: a.sub(new jt.default(u).mul(i)),
    tickMax: a.add(new jt.default(l).mul(i))
  })
}

function w2(t) {
  var e = yr(t, 2),
    r = e[0],
    n = e[1],
    o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(o, 2),
    u = bl([r, n]),
    l = yr(u, 2),
    c = l[0],
    s = l[1];
  if (c === -1 / 0 || s === 1 / 0) {
    var f = s === 1 / 0 ? [c].concat(vl(Ni(0, o - 1).map(function() {
      return 1 / 0
    }))) : [].concat(vl(Ni(0, o - 1).map(function() {
      return -1 / 0
    })), [s]);
    return r > n ? Bi(f) : f
  }
  if (c === s) return b0(c, o, i);
  var p = E0(c, s, a, i),
    d = p.step,
    y = p.tickMin,
    m = p.tickMax,
    g = zi.rangeStep(y, m.add(new jt.default(.1).mul(d)), d);
  return r > n ? Bi(g) : g
}

function O2(t) {
  var e = yr(t, 2),
    r = e[0],
    n = e[1],
    o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(o, 2),
    u = bl([r, n]),
    l = yr(u, 2),
    c = l[0],
    s = l[1];
  if (c === -1 / 0 || s === 1 / 0) return [r, n];
  if (c === s) return b0(c, o, i);
  var f = El(new jt.default(s).sub(c).div(a - 1), i, 0),
    p = m0(y0(function(y) {
      return new jt.default(c).add(new jt.default(y).mul(f)).toNumber()
    }), Ni),
    d = p(0, a).filter(function(y) {
      return y >= c && y <= s
    });
  return r > n ? Bi(d) : d
}

function S2(t, e) {
  var r = yr(t, 2),
    n = r[0],
    o = r[1],
    i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = bl([n, o]),
    u = yr(a, 2),
    l = u[0],
    c = u[1];
  if (l === -1 / 0 || c === 1 / 0) return [n, o];
  if (l === c) return [l];
  var s = Math.max(e, 2),
    f = El(new jt.default(c).sub(l).div(s - 1), i, 0),
    p = [].concat(vl(zi.rangeStep(new jt.default(l), new jt.default(c).sub(new jt.default(.99).mul(f)), f)), [c]);
  return n > o ? Bi(p) : p
}
var j2 = ml(w2),
  aM = ml(O2),
  A2 = ml(S2);
import Ri from "./react-shim-eraudit.js";
var P2 = !0,
  xl = "Invariant failed";

function mr(t, e) {
  if (!t) {
    if (P2) throw new Error(xl);
    var r = typeof e == "function" ? e() : e,
      n = r ? "".concat(xl, ": ").concat(r) : xl;
    throw new Error(n)
  }
}
var _2 = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];

function Hr(t) {
  "@babel/helpers - typeof";
  return Hr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Hr(t)
}

function Wi() {
  return Wi = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Wi.apply(this, arguments)
}

function k2(t, e) {
  return D2(t) || C2(t, e) || T2(t, e) || M2()
}

function M2() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function T2(t, e) {
  if (t) {
    if (typeof t == "string") return x0(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return x0(t, e)
  }
}

function x0(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function C2(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function D2(t) {
  if (Array.isArray(t)) return t
}

function I2(t, e) {
  if (t == null) return {};
  var r = N2(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function N2(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function B2(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function w0(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, j0(n.key), n)
  }
}

function z2(t, e, r) {
  return e && w0(t.prototype, e), r && w0(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function R2(t, e, r) {
  return e = Li(e), W2(t, O0() ? Reflect.construct(e, r || [], Li(t).constructor) : e.apply(t, r))
}

function W2(t, e) {
  if (e && (Hr(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return L2(t)
}

function L2(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function O0() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (O0 = function() {
    return !!t
  })()
}

function Li(t) {
  return Li = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, Li(t)
}

function $2(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && wl(t, e)
}

function wl(t, e) {
  return wl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, wl(t, e)
}

function S0(t, e, r) {
  return e = j0(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function j0(t) {
  var e = F2(t, "string");
  return Hr(e) == "symbol" ? e : e + ""
}

function F2(t, e) {
  if (Hr(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Hr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Kn = (function(t) {
  function e() {
    return B2(this, e), R2(this, e, arguments)
  }
  return $2(e, t), z2(e, [{
    key: "render",
    value: function() {
      var r = this.props,
        n = r.offset,
        o = r.layout,
        i = r.width,
        a = r.dataKey,
        u = r.data,
        l = r.dataPointFormatter,
        c = r.xAxis,
        s = r.yAxis,
        f = I2(r, _2),
        p = Et(f, !1);
      this.props.direction === "x" && c.type !== "number" && mr(!1);
      var d = u.map(function(y) {
        var m = l(y, a),
          g = m.x,
          h = m.y,
          b = m.value,
          w = m.errorVal;
        if (!w) return null;
        var v = [],
          E, x;
        if (Array.isArray(w)) {
          var A = k2(w, 2);
          E = A[0], x = A[1]
        } else E = x = w;
        if (o === "vertical") {
          var C = c.scale,
            I = h + n,
            $ = I + i,
            B = I - i,
            D = C(b - E),
            z = C(b + x);
          v.push({
            x1: z,
            y1: $,
            x2: z,
            y2: B
          }), v.push({
            x1: D,
            y1: I,
            x2: z,
            y2: I
          }), v.push({
            x1: D,
            y1: $,
            x2: D,
            y2: B
          })
        } else if (o === "horizontal") {
          var W = s.scale,
            L = g + n,
            X = L - i,
            K = L + i,
            O = W(b - E),
            S = W(b + x);
          v.push({
            x1: X,
            y1: S,
            x2: K,
            y2: S
          }), v.push({
            x1: L,
            y1: O,
            x2: L,
            y2: S
          }), v.push({
            x1: X,
            y1: O,
            x2: K,
            y2: O
          })
        }
        return Ri.createElement(Ct, Wi({
          className: "recharts-errorBar",
          key: "bar-".concat(v.map(function(_) {
            return "".concat(_.x1, "-").concat(_.x2, "-").concat(_.y1, "-").concat(_.y2)
          }))
        }, p), v.map(function(_) {
          return Ri.createElement("line", Wi({}, _, {
            key: "line-".concat(_.x1, "-").concat(_.x2, "-").concat(_.y1, "-").concat(_.y2)
          }))
        }))
      });
      return Ri.createElement(Ct, {
        className: "recharts-errorBars"
      }, d)
    }
  }])
})(Ri.Component);
S0(Kn, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
}), S0(Kn, "displayName", "ErrorBar");

function Gn(t) {
  "@babel/helpers - typeof";
  return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Gn(t)
}

function A0(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function vr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? A0(Object(r), !0).forEach(function(n) {
      U2(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : A0(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function U2(t, e, r) {
  return e = q2(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function q2(t) {
  var e = H2(t, "string");
  return Gn(e) == "symbol" ? e : e + ""
}

function H2(t, e) {
  if (Gn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Gn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var P0 = function(t) {
  var e = t.children,
    r = t.formattedGraphicalItems,
    n = t.legendWidth,
    o = t.legendContent,
    i = te(e, cr);
  if (!i) return null;
  var a = cr.defaultProps,
    u = a !== void 0 ? vr(vr({}, a), i.props) : {},
    l;
  return i.props && i.props.payload ? l = i.props && i.props.payload : o === "children" ? l = (r || []).reduce(function(c, s) {
    var f = s.item,
      p = s.props,
      d = p.sectors || p.data || [];
    return c.concat(d.map(function(y) {
      return {
        type: i.props.iconType || f.props.legendType,
        value: y.name,
        color: y.fill,
        payload: y
      }
    }))
  }, []) : l = (r || []).map(function(c) {
    var s = c.item,
      f = s.type.defaultProps,
      p = f !== void 0 ? vr(vr({}, f), s.props) : {},
      d = p.dataKey,
      y = p.name,
      m = p.legendType,
      g = p.hide;
    return {
      inactive: g,
      dataKey: d,
      type: u.iconType || m || "square",
      color: Sl(s),
      value: y || d,
      payload: p
    }
  }), vr(vr(vr({}, u), cr.getWithHeight(i, n)), {}, {
    payload: l,
    item: i
  })
};

function Zn(t) {
  "@babel/helpers - typeof";
  return Zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Zn(t)
}

function _0(t) {
  return K2(t) || V2(t) || Y2(t) || X2()
}

function X2() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Y2(t, e) {
  if (t) {
    if (typeof t == "string") return Ol(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ol(t, e)
  }
}

function V2(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function K2(t) {
  if (Array.isArray(t)) return Ol(t)
}

function Ol(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function k0(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Tt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? k0(Object(r), !0).forEach(function(n) {
      Xr(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : k0(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Xr(t, e, r) {
  return e = G2(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function G2(t) {
  var e = Z2(t, "string");
  return Zn(e) == "symbol" ? e : e + ""
}

function Z2(t, e) {
  if (Zn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Zn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function ee(t, e, r) {
  return (0, pe.default)(t) || (0, pe.default)(e) ? r : Bt(e) ? (0, f0.default)(t, e, r) : (0, Vn.default)(e) ? e(t) : r
}

function $i(t, e, r, n) {
  var o = (0, t2.default)(t, function(u) {
    return ee(u, e)
  });
  if (r === "number") {
    var i = o.filter(function(u) {
      return tt(u) || parseFloat(u)
    });
    return i.length ? [(0, Di.default)(i), (0, Ci.default)(i)] : [1 / 0, -1 / 0]
  }
  var a = n ? o.filter(function(u) {
    return !(0, pe.default)(u)
  }) : o;
  return a.map(function(u) {
    return Bt(u) || u instanceof Date ? u : ""
  })
}
var Q2 = function(t) {
    var e, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
      n = arguments.length > 2 ? arguments[2] : void 0,
      o = arguments.length > 3 ? arguments[3] : void 0,
      i = -1,
      a = (e = r?.length) !== null && e !== void 0 ? e : 0;
    if (a <= 1) return 0;
    if (o && o.axisType === "angleAxis" && Math.abs(Math.abs(o.range[1] - o.range[0]) - 360) <= 1e-6)
      for (var u = o.range, l = 0; l < a; l++) {
        var c = l > 0 ? n[l - 1].coordinate : n[a - 1].coordinate,
          s = n[l].coordinate,
          f = l >= a - 1 ? n[0].coordinate : n[l + 1].coordinate,
          p = void 0;
        if (ge(s - c) !== ge(f - s)) {
          var d = [];
          if (ge(f - s) === ge(u[1] - u[0])) {
            p = f;
            var y = s + u[1] - u[0];
            d[0] = Math.min(y, (y + c) / 2), d[1] = Math.max(y, (y + c) / 2)
          } else {
            p = c;
            var m = f + u[1] - u[0];
            d[0] = Math.min(s, (m + s) / 2), d[1] = Math.max(s, (m + s) / 2)
          }
          var g = [Math.min(s, (p + s) / 2), Math.max(s, (p + s) / 2)];
          if (t > g[0] && t <= g[1] || t >= d[0] && t <= d[1]) {
            i = n[l].index;
            break
          }
        } else {
          var h = Math.min(c, f),
            b = Math.max(c, f);
          if (t > (h + s) / 2 && t <= (b + s) / 2) {
            i = n[l].index;
            break
          }
        }
      } else
        for (var w = 0; w < a; w++)
          if (w === 0 && t <= (r[w].coordinate + r[w + 1].coordinate) / 2 || w > 0 && w < a - 1 && t > (r[w].coordinate + r[w - 1].coordinate) / 2 && t <= (r[w].coordinate + r[w + 1].coordinate) / 2 || w === a - 1 && t > (r[w].coordinate + r[w - 1].coordinate) / 2) {
            i = r[w].index;
            break
          } return i
  },
  Sl = function(t) {
    var e, r = t,
      n = r.type.displayName,
      o = (e = t.type) !== null && e !== void 0 && e.defaultProps ? Tt(Tt({}, t.type.defaultProps), t.props) : t.props,
      i = o.stroke,
      a = o.fill,
      u;
    switch (n) {
      case "Line":
        u = i;
        break;
      case "Area":
      case "Radar":
        u = i && i !== "none" ? i : a;
        break;
      default:
        u = a;
        break
    }
    return u
  },
  J2 = function(t) {
    var e = t.barSize,
      r = t.totalSize,
      n = t.stackGroups,
      o = n === void 0 ? {} : n;
    if (!o) return {};
    for (var i = {}, a = Object.keys(o), u = 0, l = a.length; u < l; u++)
      for (var c = o[a[u]].stackGroups, s = Object.keys(c), f = 0, p = s.length; f < p; f++) {
        var d = c[s[f]],
          y = d.items,
          m = d.cateAxisId,
          g = y.filter(function(x) {
            return ze(x.type).indexOf("Bar") >= 0
          });
        if (g && g.length) {
          var h = g[0].type.defaultProps,
            b = h !== void 0 ? Tt(Tt({}, h), g[0].props) : g[0].props,
            w = b.barSize,
            v = b[m];
          i[v] || (i[v] = []);
          var E = (0, pe.default)(w) ? e : w;
          i[v].push({
            item: g[0],
            stackList: g.slice(1),
            barSize: (0, pe.default)(E) ? void 0 : ur(E, r, 0)
          })
        }
      }
    return i
  },
  tO = function(t) {
    var e = t.barGap,
      r = t.barCategoryGap,
      n = t.bandSize,
      o = t.sizeList,
      i = o === void 0 ? [] : o,
      a = t.maxBarSize,
      u = i.length;
    if (u < 1) return null;
    var l = ur(e, n, 0, !0),
      c, s = [];
    if (i[0].barSize === +i[0].barSize) {
      var f = !1,
        p = n / u,
        d = i.reduce(function(w, v) {
          return w + v.barSize || 0
        }, 0);
      d += (u - 1) * l, d >= n && (d -= (u - 1) * l, l = 0), d >= n && p > 0 && (f = !0, p *= .9, d = u * p);
      var y = (n - d) / 2 >> 0,
        m = {
          offset: y - l,
          size: 0
        };
      c = i.reduce(function(w, v) {
        var E = {
            item: v.item,
            position: {
              offset: m.offset + m.size + l,
              size: f ? p : v.barSize
            }
          },
          x = [].concat(_0(w), [E]);
        return m = x[x.length - 1].position, v.stackList && v.stackList.length && v.stackList.forEach(function(A) {
          x.push({
            item: A,
            position: m
          })
        }), x
      }, s)
    } else {
      var g = ur(r, n, 0, !0);
      n - 2 * g - (u - 1) * l <= 0 && (l = 0);
      var h = (n - 2 * g - (u - 1) * l) / u;
      h > 1 && (h >>= 0);
      var b = a === +a ? Math.min(h, a) : h;
      c = i.reduce(function(w, v, E) {
        var x = [].concat(_0(w), [{
          item: v.item,
          position: {
            offset: g + (h + l) * E + (h - b) / 2,
            size: b
          }
        }]);
        return v.stackList && v.stackList.length && v.stackList.forEach(function(A) {
          x.push({
            item: A,
            position: x[x.length - 1].position
          })
        }), x
      }, s)
    }
    return c
  },
  eO = function(t, e, r, n) {
    var o = r.children,
      i = r.width,
      a = r.margin,
      u = i - (a.left || 0) - (a.right || 0),
      l = P0({
        children: o,
        legendWidth: u
      });
    if (l) {
      var c = n || {},
        s = c.width,
        f = c.height,
        p = l.align,
        d = l.verticalAlign,
        y = l.layout;
      if ((y === "vertical" || y === "horizontal" && d === "middle") && p !== "center" && tt(t[p])) return Tt(Tt({}, t), {}, Xr({}, p, t[p] + (s || 0)));
      if ((y === "horizontal" || y === "vertical" && p === "center") && d !== "middle" && tt(t[d])) return Tt(Tt({}, t), {}, Xr({}, d, t[d] + (f || 0)))
    }
    return t
  },
  rO = function(t, e, r) {
    return (0, pe.default)(e) ? !0 : t === "horizontal" ? e === "yAxis" : t === "vertical" || r === "x" ? e === "xAxis" : r === "y" ? e === "yAxis" : !0
  },
  M0 = function(t, e, r, n, o) {
    var i = e.props.children,
      a = ue(i, Kn).filter(function(l) {
        return rO(n, o, l.props.direction)
      });
    if (a && a.length) {
      var u = a.map(function(l) {
        return l.props.dataKey
      });
      return t.reduce(function(l, c) {
        var s = ee(c, r);
        if ((0, pe.default)(s)) return l;
        var f = Array.isArray(s) ? [(0, Di.default)(s), (0, Ci.default)(s)] : [s, s],
          p = u.reduce(function(d, y) {
            var m = ee(c, y, 0),
              g = f[0] - Math.abs(Array.isArray(m) ? m[0] : m),
              h = f[1] + Math.abs(Array.isArray(m) ? m[1] : m);
            return [Math.min(g, d[0]), Math.max(h, d[1])]
          }, [1 / 0, -1 / 0]);
        return [Math.min(p[0], l[0]), Math.max(p[1], l[1])]
      }, [1 / 0, -1 / 0])
    }
    return null
  },
  nO = function(t, e, r, n, o) {
    var i = e.map(function(a) {
      return M0(t, a, r, o, n)
    }).filter(function(a) {
      return !(0, pe.default)(a)
    });
    return i && i.length ? i.reduce(function(a, u) {
      return [Math.min(a[0], u[0]), Math.max(a[1], u[1])]
    }, [1 / 0, -1 / 0]) : null
  },
  T0 = function(t, e, r, n, o) {
    var i = e.map(function(u) {
      var l = u.props.dataKey;
      return r === "number" && l && M0(t, u, l, n) || $i(t, l, r, o)
    });
    if (r === "number") return i.reduce(function(u, l) {
      return [Math.min(u[0], l[0]), Math.max(u[1], l[1])]
    }, [1 / 0, -1 / 0]);
    var a = {};
    return i.reduce(function(u, l) {
      for (var c = 0, s = l.length; c < s; c++) a[l[c]] || (a[l[c]] = !0, u.push(l[c]));
      return u
    }, [])
  },
  C0 = function(t, e) {
    return t === "horizontal" && e === "xAxis" || t === "vertical" && e === "yAxis" || t === "centric" && e === "angleAxis" || t === "radial" && e === "radiusAxis"
  },
  D0 = function(t, e, r, n) {
    if (n) return t.map(function(u) {
      return u.coordinate
    });
    var o, i, a = t.map(function(u) {
      return u.coordinate === e && (o = !0), u.coordinate === r && (i = !0), u.coordinate
    });
    return o || a.push(e), i || a.push(r), a
  },
  He = function(t, e, r) {
    if (!t) return null;
    var n = t.scale,
      o = t.duplicateDomain,
      i = t.type,
      a = t.range,
      u = t.realScaleType === "scaleBand" ? n.bandwidth() / 2 : 2,
      l = (e || r) && i === "category" && n.bandwidth ? n.bandwidth() / u : 0;
    if (l = t.axisType === "angleAxis" && a?.length >= 2 ? ge(a[0] - a[1]) * 2 * l : l, e && (t.ticks || t.niceTicks)) {
      var c = (t.ticks || t.niceTicks).map(function(s) {
        var f = o ? o.indexOf(s) : s;
        return {
          coordinate: n(f) + l,
          value: s,
          offset: l
        }
      });
      return c.filter(function(s) {
        return !(0, hl.default)(s.coordinate)
      })
    }
    return t.isCategorical && t.categoricalDomain ? t.categoricalDomain.map(function(s, f) {
      return {
        coordinate: n(s) + l,
        value: s,
        index: f,
        offset: l
      }
    }) : n.ticks && !r ? n.ticks(t.tickCount).map(function(s) {
      return {
        coordinate: n(s) + l,
        value: s,
        offset: l
      }
    }) : n.domain().map(function(s, f) {
      return {
        coordinate: n(s) + l,
        value: o ? o[s] : s,
        index: f,
        offset: l
      }
    })
  },
  jl = new WeakMap,
  Fi = function(t, e) {
    if (typeof e != "function") return t;
    jl.has(t) || jl.set(t, new WeakMap);
    var r = jl.get(t);
    if (r.has(e)) return r.get(e);
    var n = function() {
      t.apply(void 0, arguments), e.apply(void 0, arguments)
    };
    return r.set(e, n), n
  },
  oO = function(t, e, r) {
    var n = t.scale,
      o = t.type,
      i = t.layout,
      a = t.axisType;
    if (n === "auto") return i === "radial" && a === "radiusAxis" ? {
      scale: Bn(),
      realScaleType: "band"
    } : i === "radial" && a === "angleAxis" ? {
      scale: Oi(),
      realScaleType: "linear"
    } : o === "category" && e && (e.indexOf("LineChart") >= 0 || e.indexOf("AreaChart") >= 0 || e.indexOf("ComposedChart") >= 0 && !r) ? {
      scale: zn(),
      realScaleType: "point"
    } : o === "category" ? {
      scale: Bn(),
      realScaleType: "band"
    } : {
      scale: Oi(),
      realScaleType: "linear"
    };
    if ((0, Jw.default)(n)) {
      var u = "scale".concat((0, e2.default)(n));
      return {
        scale: (Iu[u] || zn)(),
        realScaleType: Iu[u] ? u : "point"
      }
    }
    return (0, Vn.default)(n) ? {
      scale: n
    } : {
      scale: zn(),
      realScaleType: "point"
    }
  },
  I0 = 1e-4,
  iO = function(t) {
    var e = t.domain();
    if (!(!e || e.length <= 2)) {
      var r = e.length,
        n = t.range(),
        o = Math.min(n[0], n[1]) - I0,
        i = Math.max(n[0], n[1]) + I0,
        a = t(e[0]),
        u = t(e[r - 1]);
      (a < o || a > i || u < o || u > i) && t.domain([e[0], e[r - 1]])
    }
  },
  aO = function(t, e) {
    if (!t) return null;
    for (var r = 0, n = t.length; r < n; r++)
      if (t[r].item === e) return t[r].position;
    return null
  },
  uO = function(t, e) {
    if (!e || e.length !== 2 || !tt(e[0]) || !tt(e[1])) return t;
    var r = Math.min(e[0], e[1]),
      n = Math.max(e[0], e[1]),
      o = [t[0], t[1]];
    return (!tt(t[0]) || t[0] < r) && (o[0] = r), (!tt(t[1]) || t[1] > n) && (o[1] = n), o[0] > n && (o[0] = n), o[1] < r && (o[1] = r), o
  },
  lO = function(t) {
    var e = t.length;
    if (!(e <= 0))
      for (var r = 0, n = t[0].length; r < n; ++r)
        for (var o = 0, i = 0, a = 0; a < e; ++a) {
          var u = (0, hl.default)(t[a][r][1]) ? t[a][r][0] : t[a][r][1];
          u >= 0 ? (t[a][r][0] = o, t[a][r][1] = o + u, o = t[a][r][1]) : (t[a][r][0] = i, t[a][r][1] = i + u, i = t[a][r][1])
        }
  },
  cO = function(t) {
    var e = t.length;
    if (!(e <= 0))
      for (var r = 0, n = t[0].length; r < n; ++r)
        for (var o = 0, i = 0; i < e; ++i) {
          var a = (0, hl.default)(t[i][r][1]) ? t[i][r][0] : t[i][r][1];
          a >= 0 ? (t[i][r][0] = o, t[i][r][1] = o + a, o = t[i][r][1]) : (t[i][r][0] = 0, t[i][r][1] = 0)
        }
  },
  sO = {
    sign: lO,
    expand: ub,
    none: Cr,
    silhouette: lb,
    wiggle: cb,
    positive: cO
  },
  fO = function(t, e, r) {
    var n = e.map(function(a) {
        return a.props.dataKey
      }),
      o = sO[r],
      i = ab().keys(n).value(function(a, u) {
        return +ee(a, u, 0)
      }).order(mu).offset(o);
    return i(t)
  },
  pO = function(t, e, r, n, o, i) {
    if (!t) return null;
    var a = i ? e.reverse() : e,
      u = {},
      l = a.reduce(function(s, f) {
        var p, d = (p = f.type) !== null && p !== void 0 && p.defaultProps ? Tt(Tt({}, f.type.defaultProps), f.props) : f.props,
          y = d.stackId,
          m = d.hide;
        if (m) return s;
        var g = d[r],
          h = s[g] || {
            hasStack: !1,
            stackGroups: {}
          };
        if (Bt(y)) {
          var b = h.stackGroups[y] || {
            numericAxisId: r,
            cateAxisId: n,
            items: []
          };
          b.items.push(f), h.hasStack = !0, h.stackGroups[y] = b
        } else h.stackGroups[xn("_stackId_")] = {
          numericAxisId: r,
          cateAxisId: n,
          items: [f]
        };
        return Tt(Tt({}, s), {}, Xr({}, g, h))
      }, u),
      c = {};
    return Object.keys(l).reduce(function(s, f) {
      var p = l[f];
      if (p.hasStack) {
        var d = {};
        p.stackGroups = Object.keys(p.stackGroups).reduce(function(y, m) {
          var g = p.stackGroups[m];
          return Tt(Tt({}, y), {}, Xr({}, m, {
            numericAxisId: r,
            cateAxisId: n,
            items: g.items,
            stackedData: fO(t, g.items, o)
          }))
        }, d)
      }
      return Tt(Tt({}, s), {}, Xr({}, f, p))
    }, c)
  },
  dO = function(t, e) {
    var r = e.realScaleType,
      n = e.type,
      o = e.tickCount,
      i = e.originalDomain,
      a = e.allowDecimals,
      u = r || e.scale;
    if (u !== "auto" && u !== "linear") return null;
    if (o && n === "number" && i && (i[0] === "auto" || i[1] === "auto")) {
      var l = t.domain();
      if (!l.length) return null;
      var c = j2(l, o, a);
      return t.domain([(0, Di.default)(c), (0, Ci.default)(c)]), {
        niceTicks: c
      }
    }
    if (o && n === "number") {
      var s = t.domain(),
        f = A2(s, o, a);
      return {
        niceTicks: f
      }
    }
    return null
  };

function N0(t) {
  var e = t.axis,
    r = t.ticks,
    n = t.bandSize,
    o = t.entry,
    i = t.index,
    a = t.dataKey;
  if (e.type === "category") {
    if (!e.allowDuplicatedCategory && e.dataKey && !(0, pe.default)(o[e.dataKey])) {
      var u = $o(r, "value", o[e.dataKey]);
      if (u) return u.coordinate + n / 2
    }
    return r[i] ? r[i].coordinate + n / 2 : null
  }
  var l = ee(o, (0, pe.default)(a) ? e.dataKey : a);
  return (0, pe.default)(l) ? null : e.scale(l)
}
var B0 = function(t) {
    var e = t.axis,
      r = t.ticks,
      n = t.offset,
      o = t.bandSize,
      i = t.entry,
      a = t.index;
    if (e.type === "category") return r[a] ? r[a].coordinate + n : null;
    var u = ee(i, e.dataKey, e.domain[a]);
    return (0, pe.default)(u) ? null : e.scale(u) - o / 2 + n
  },
  hO = function(t) {
    var e = t.numericAxis,
      r = e.scale.domain();
    if (e.type === "number") {
      var n = Math.min(r[0], r[1]),
        o = Math.max(r[0], r[1]);
      return n <= 0 && o >= 0 ? 0 : o < 0 ? o : n
    }
    return r[0]
  },
  yO = function(t, e) {
    var r, n = (r = t.type) !== null && r !== void 0 && r.defaultProps ? Tt(Tt({}, t.type.defaultProps), t.props) : t.props,
      o = n.stackId;
    if (Bt(o)) {
      var i = e[o];
      if (i) {
        var a = i.items.indexOf(t);
        return a >= 0 ? i.stackedData[a] : null
      }
    }
    return null
  },
  mO = function(t) {
    return t.reduce(function(e, r) {
      return [(0, Di.default)(r.concat([e[0]]).filter(tt)), (0, Ci.default)(r.concat([e[1]]).filter(tt))]
    }, [1 / 0, -1 / 0])
  },
  z0 = function(t, e, r) {
    return Object.keys(t).reduce(function(n, o) {
      var i = t[o],
        a = i.stackedData,
        u = a.reduce(function(l, c) {
          var s = mO(c.slice(e, r + 1));
          return [Math.min(l[0], s[0]), Math.max(l[1], s[1])]
        }, [1 / 0, -1 / 0]);
      return [Math.min(u[0], n[0]), Math.max(u[1], n[1])]
    }, [1 / 0, -1 / 0]).map(function(n) {
      return n === 1 / 0 || n === -1 / 0 ? 0 : n
    })
  },
  R0 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  W0 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  Al = function(t, e, r) {
    if ((0, Vn.default)(t)) return t(e, r);
    if (!Array.isArray(t)) return e;
    var n = [];
    if (tt(t[0])) n[0] = r ? t[0] : Math.min(t[0], e[0]);
    else if (R0.test(t[0])) {
      var o = +R0.exec(t[0])[1];
      n[0] = e[0] - o
    } else(0, Vn.default)(t[0]) ? n[0] = t[0](e[0]) : n[0] = e[0];
    if (tt(t[1])) n[1] = r ? t[1] : Math.max(t[1], e[1]);
    else if (W0.test(t[1])) {
      var i = +W0.exec(t[1])[1];
      n[1] = e[1] + i
    } else(0, Vn.default)(t[1]) ? n[1] = t[1](e[1]) : n[1] = e[1];
    return n
  },
  Ui = function(t, e, r) {
    if (t && t.scale && t.scale.bandwidth) {
      var n = t.scale.bandwidth();
      if (!r || n > 0) return n
    }
    if (t && e && e.length >= 2) {
      for (var o = (0, n2.default)(e, function(s) {
          return s.coordinate
        }), i = 1 / 0, a = 1, u = o.length; a < u; a++) {
        var l = o[a],
          c = o[a - 1];
        i = Math.min((l.coordinate || 0) - (c.coordinate || 0), i)
      }
      return i === 1 / 0 ? 0 : i
    }
    return r ? void 0 : 0
  },
  L0 = function(t, e, r) {
    return !t || !t.length || (0, r2.default)(t, (0, f0.default)(r, "type.defaultProps.domain")) ? e : t
  },
  $0 = function(t, e) {
    var r = t.type.defaultProps ? Tt(Tt({}, t.type.defaultProps), t.props) : t.props,
      n = r.dataKey,
      o = r.name,
      i = r.unit,
      a = r.formatter,
      u = r.tooltipType,
      l = r.chartType,
      c = r.hide;
    return Tt(Tt({}, Et(t, !1)), {}, {
      dataKey: n,
      unit: i,
      formatter: a,
      name: o || n,
      color: Sl(t),
      value: ee(e, n),
      type: u,
      payload: e,
      chartType: l,
      hide: c
    })
  };

function Qn(t) {
  "@babel/helpers - typeof";
  return Qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Qn(t)
}

function F0(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function U0(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? F0(Object(r), !0).forEach(function(n) {
      vO(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : F0(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function vO(t, e, r) {
  return e = gO(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function gO(t) {
  var e = bO(t, "string");
  return Qn(e) == "symbol" ? e : e + ""
}

function bO(t, e) {
  if (Qn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Qn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var qi = Math.PI / 180,
  EO = function(t) {
    return t * 180 / Math.PI
  },
  $t = function(t, e, r, n) {
    return {
      x: t + Math.cos(-qi * n) * r,
      y: e + Math.sin(-qi * n) * r
    }
  },
  xO = function(t, e) {
    var r = t.x,
      n = t.y,
      o = e.x,
      i = e.y;
    return Math.sqrt(Math.pow(r - o, 2) + Math.pow(n - i, 2))
  },
  wO = function(t, e) {
    var r = t.x,
      n = t.y,
      o = e.cx,
      i = e.cy,
      a = xO({
        x: r,
        y: n
      }, {
        x: o,
        y: i
      });
    if (a <= 0) return {
      radius: a
    };
    var u = (r - o) / a,
      l = Math.acos(u);
    return n > i && (l = 2 * Math.PI - l), {
      radius: a,
      angle: EO(l),
      angleInRadian: l
    }
  },
  OO = function(t) {
    var e = t.startAngle,
      r = t.endAngle,
      n = Math.floor(e / 360),
      o = Math.floor(r / 360),
      i = Math.min(n, o);
    return {
      startAngle: e - i * 360,
      endAngle: r - i * 360
    }
  },
  SO = function(t, e) {
    var r = e.startAngle,
      n = e.endAngle,
      o = Math.floor(r / 360),
      i = Math.floor(n / 360),
      a = Math.min(o, i);
    return t + a * 360
  },
  q0 = function(t, e) {
    var r = t.x,
      n = t.y,
      o = wO({
        x: r,
        y: n
      }, e),
      i = o.radius,
      a = o.angle,
      u = e.innerRadius,
      l = e.outerRadius;
    if (i < u || i > l) return !1;
    if (i === 0) return !0;
    var c = OO(e),
      s = c.startAngle,
      f = c.endAngle,
      p = a,
      d;
    if (s <= f) {
      for (; p > f;) p -= 360;
      for (; p < s;) p += 360;
      d = p >= s && p <= f
    } else {
      for (; p > s;) p -= 360;
      for (; p < f;) p += 360;
      d = p >= f && p <= s
    }
    return d ? U0(U0({}, e), {}, {
      radius: i,
      angle: SO(p, e)
    }) : null
  };

function Jn(t) {
  "@babel/helpers - typeof";
  return Jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Jn(t)
}
var jO = ["offset"];

function AO(t) {
  return MO(t) || kO(t) || _O(t) || PO()
}

function PO() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function _O(t, e) {
  if (t) {
    if (typeof t == "string") return Pl(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Pl(t, e)
  }
}

function kO(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function MO(t) {
  if (Array.isArray(t)) return Pl(t)
}

function Pl(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function TO(t, e) {
  if (t == null) return {};
  var r = CO(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function CO(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function H0(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Rt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? H0(Object(r), !0).forEach(function(n) {
      DO(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : H0(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function DO(t, e, r) {
  return e = IO(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function IO(t) {
  var e = NO(t, "string");
  return Jn(e) == "symbol" ? e : e + ""
}

function NO(t, e) {
  if (Jn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Jn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function to() {
  return to = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, to.apply(this, arguments)
}
var BO = function(t) {
    var e = t.value,
      r = t.formatter,
      n = (0, li.default)(t.children) ? e : t.children;
    return (0, ci.default)(r) ? r(n) : n
  },
  zO = function(t, e) {
    var r = ge(e - t),
      n = Math.min(Math.abs(e - t), 360);
    return r * n
  },
  RO = function(t, e, r) {
    var n = t.position,
      o = t.viewBox,
      i = t.offset,
      a = t.className,
      u = o,
      l = u.cx,
      c = u.cy,
      s = u.innerRadius,
      f = u.outerRadius,
      p = u.startAngle,
      d = u.endAngle,
      y = u.clockWise,
      m = (s + f) / 2,
      g = zO(p, d),
      h = g >= 0 ? 1 : -1,
      b, w;
    n === "insideStart" ? (b = p + h * i, w = y) : n === "insideEnd" ? (b = d - h * i, w = !y) : n === "end" && (b = d + h * i, w = y), w = g <= 0 ? w : !w;
    var v = $t(l, c, m, b),
      E = $t(l, c, m, b + (w ? 1 : -1) * 359),
      x = "M".concat(v.x, ",").concat(v.y, `
    A`).concat(m, ",").concat(m, ",0,1,").concat(w ? 0 : 1, `,
    `).concat(E.x, ",").concat(E.y),
      A = (0, li.default)(t.id) ? xn("recharts-radial-line-") : t.id;
    return Te.createElement("text", to({}, r, {
      dominantBaseline: "central",
      className: wt("recharts-radial-bar-label", a)
    }), Te.createElement("defs", null, Te.createElement("path", {
      id: A,
      d: x
    })), Te.createElement("textPath", {
      xlinkHref: "#".concat(A)
    }, e))
  },
  WO = function(t) {
    var e = t.viewBox,
      r = t.offset,
      n = t.position,
      o = e,
      i = o.cx,
      a = o.cy,
      u = o.innerRadius,
      l = o.outerRadius,
      c = o.startAngle,
      s = o.endAngle,
      f = (c + s) / 2;
    if (n === "outside") {
      var p = $t(i, a, l + r, f),
        d = p.x,
        y = p.y;
      return {
        x: d,
        y,
        textAnchor: d >= i ? "start" : "end",
        verticalAnchor: "middle"
      }
    }
    if (n === "center") return {
      x: i,
      y: a,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
    if (n === "centerTop") return {
      x: i,
      y: a,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
    if (n === "centerBottom") return {
      x: i,
      y: a,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
    var m = (u + l) / 2,
      g = $t(i, a, m, f),
      h = g.x,
      b = g.y;
    return {
      x: h,
      y: b,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }
  },
  LO = function(t) {
    var e = t.viewBox,
      r = t.parentViewBox,
      n = t.offset,
      o = t.position,
      i = e,
      a = i.x,
      u = i.y,
      l = i.width,
      c = i.height,
      s = c >= 0 ? 1 : -1,
      f = s * n,
      p = s > 0 ? "end" : "start",
      d = s > 0 ? "start" : "end",
      y = l >= 0 ? 1 : -1,
      m = y * n,
      g = y > 0 ? "end" : "start",
      h = y > 0 ? "start" : "end";
    if (o === "top") {
      var b = {
        x: a + l / 2,
        y: u - s * n,
        textAnchor: "middle",
        verticalAnchor: p
      };
      return Rt(Rt({}, b), r ? {
        height: Math.max(u - r.y, 0),
        width: l
      } : {})
    }
    if (o === "bottom") {
      var w = {
        x: a + l / 2,
        y: u + c + f,
        textAnchor: "middle",
        verticalAnchor: d
      };
      return Rt(Rt({}, w), r ? {
        height: Math.max(r.y + r.height - (u + c), 0),
        width: l
      } : {})
    }
    if (o === "left") {
      var v = {
        x: a - m,
        y: u + c / 2,
        textAnchor: g,
        verticalAnchor: "middle"
      };
      return Rt(Rt({}, v), r ? {
        width: Math.max(v.x - r.x, 0),
        height: c
      } : {})
    }
    if (o === "right") {
      var E = {
        x: a + l + m,
        y: u + c / 2,
        textAnchor: h,
        verticalAnchor: "middle"
      };
      return Rt(Rt({}, E), r ? {
        width: Math.max(r.x + r.width - E.x, 0),
        height: c
      } : {})
    }
    var x = r ? {
      width: l,
      height: c
    } : {};
    return o === "insideLeft" ? Rt({
      x: a + m,
      y: u + c / 2,
      textAnchor: h,
      verticalAnchor: "middle"
    }, x) : o === "insideRight" ? Rt({
      x: a + l - m,
      y: u + c / 2,
      textAnchor: g,
      verticalAnchor: "middle"
    }, x) : o === "insideTop" ? Rt({
      x: a + l / 2,
      y: u + f,
      textAnchor: "middle",
      verticalAnchor: d
    }, x) : o === "insideBottom" ? Rt({
      x: a + l / 2,
      y: u + c - f,
      textAnchor: "middle",
      verticalAnchor: p
    }, x) : o === "insideTopLeft" ? Rt({
      x: a + m,
      y: u + f,
      textAnchor: h,
      verticalAnchor: d
    }, x) : o === "insideTopRight" ? Rt({
      x: a + l - m,
      y: u + f,
      textAnchor: g,
      verticalAnchor: d
    }, x) : o === "insideBottomLeft" ? Rt({
      x: a + m,
      y: u + c - f,
      textAnchor: h,
      verticalAnchor: p
    }, x) : o === "insideBottomRight" ? Rt({
      x: a + l - m,
      y: u + c - f,
      textAnchor: g,
      verticalAnchor: p
    }, x) : (0, Yf.default)(o) && (tt(o.x) || ar(o.x)) && (tt(o.y) || ar(o.y)) ? Rt({
      x: a + ur(o.x, l),
      y: u + ur(o.y, c),
      textAnchor: "end",
      verticalAnchor: "end"
    }, x) : Rt({
      x: a + l / 2,
      y: u + c / 2,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }, x)
  },
  $O = function(t) {
    return "cx" in t && tt(t.cx)
  };

function Ut(t) {
  var e = t.offset,
    r = e === void 0 ? 5 : e,
    n = TO(t, jO),
    o = Rt({
      offset: r
    }, n),
    i = o.viewBox,
    a = o.position,
    u = o.value,
    l = o.children,
    c = o.content,
    s = o.className,
    f = s === void 0 ? "" : s,
    p = o.textBreakAll;
  if (!i || (0, li.default)(u) && (0, li.default)(l) && !si(c) && !(0, ci.default)(c)) return null;
  if (si(c)) return Du(c, o);
  var d;
  if ((0, ci.default)(c)) {
    if (d = xE(c, o), si(d)) return d
  } else d = BO(o);
  var y = $O(i),
    m = Et(o, !0);
  if (y && (a === "insideStart" || a === "insideEnd" || a === "end")) return RO(o, d, m);
  var g = y ? WO(o) : LO(o);
  return Te.createElement(ui, to({
    className: wt("recharts-label", f)
  }, m, g, {
    breakAll: p
  }), d)
}
Ut.displayName = "Label";
var X0 = function(t) {
    var e = t.cx,
      r = t.cy,
      n = t.angle,
      o = t.startAngle,
      i = t.endAngle,
      a = t.r,
      u = t.radius,
      l = t.innerRadius,
      c = t.outerRadius,
      s = t.x,
      f = t.y,
      p = t.top,
      d = t.left,
      y = t.width,
      m = t.height,
      g = t.clockWise,
      h = t.labelViewBox;
    if (h) return h;
    if (tt(y) && tt(m)) {
      if (tt(s) && tt(f)) return {
        x: s,
        y: f,
        width: y,
        height: m
      };
      if (tt(p) && tt(d)) return {
        x: p,
        y: d,
        width: y,
        height: m
      }
    }
    return tt(s) && tt(f) ? {
      x: s,
      y: f,
      width: 0,
      height: 0
    } : tt(e) && tt(r) ? {
      cx: e,
      cy: r,
      startAngle: o || n || 0,
      endAngle: i || n || 0,
      innerRadius: l || 0,
      outerRadius: c || u || a || 0,
      clockWise: g
    } : t.viewBox ? t.viewBox : {}
  },
  FO = function(t, e) {
    return t ? t === !0 ? Te.createElement(Ut, {
      key: "label-implicit",
      viewBox: e
    }) : Bt(t) ? Te.createElement(Ut, {
      key: "label-implicit",
      viewBox: e,
      value: t
    }) : si(t) ? t.type === Ut ? Du(t, {
      key: "label-implicit",
      viewBox: e
    }) : Te.createElement(Ut, {
      key: "label-implicit",
      content: t,
      viewBox: e
    }) : (0, ci.default)(t) ? Te.createElement(Ut, {
      key: "label-implicit",
      content: t,
      viewBox: e
    }) : (0, Yf.default)(t) ? Te.createElement(Ut, to({
      viewBox: e
    }, t, {
      key: "label-implicit"
    })) : null : null
  },
  UO = function(t, e) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!t || !t.children && r && !t.label) return null;
    var n = t.children,
      o = X0(t),
      i = ue(n, Ut).map(function(u, l) {
        return Du(u, {
          viewBox: e || o,
          key: "label-".concat(l)
        })
      });
    if (!r) return i;
    var a = FO(t.label, e || o);
    return [a].concat(AO(i))
  };
Ut.parseViewBox = X0, Ut.renderCallByParent = UO;
var _l = it(ve()),
  qO = it(me()),
  HO = it(Dt()),
  XO = it(Pv());
import Yr, {
  cloneElement as YO
} from "./react-shim-eraudit.js";

function eo(t) {
  "@babel/helpers - typeof";
  return eo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, eo(t)
}
var VO = ["valueAccessor"],
  KO = ["data", "dataKey", "clockWise", "id", "textBreakAll"];

function GO(t) {
  return tS(t) || JO(t) || QO(t) || ZO()
}

function ZO() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function QO(t, e) {
  if (t) {
    if (typeof t == "string") return kl(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return kl(t, e)
  }
}

function JO(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function tS(t) {
  if (Array.isArray(t)) return kl(t)
}

function kl(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function Hi() {
  return Hi = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Hi.apply(this, arguments)
}

function Y0(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function V0(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Y0(Object(r), !0).forEach(function(n) {
      eS(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Y0(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function eS(t, e, r) {
  return e = rS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function rS(t) {
  var e = nS(t, "string");
  return eo(e) == "symbol" ? e : e + ""
}

function nS(t, e) {
  if (eo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (eo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function K0(t, e) {
  if (t == null) return {};
  var r = oS(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function oS(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var iS = function(t) {
  return Array.isArray(t.value) ? (0, XO.default)(t.value) : t.value
};

function Je(t) {
  var e = t.valueAccessor,
    r = e === void 0 ? iS : e,
    n = K0(t, VO),
    o = n.data,
    i = n.dataKey,
    a = n.clockWise,
    u = n.id,
    l = n.textBreakAll,
    c = K0(n, KO);
  return !o || !o.length ? null : Yr.createElement(Ct, {
    className: "recharts-label-list"
  }, o.map(function(s, f) {
    var p = (0, _l.default)(i) ? r(s, f) : ee(s && s.payload, i),
      d = (0, _l.default)(u) ? {} : {
        id: "".concat(u, "-").concat(f)
      };
    return Yr.createElement(Ut, Hi({}, Et(s, !0), c, d, {
      parentViewBox: s.parentViewBox,
      value: p,
      textBreakAll: l,
      viewBox: Ut.parseViewBox((0, _l.default)(a) ? s : V0(V0({}, s), {}, {
        clockWise: a
      })),
      key: "label-".concat(f),
      index: f
    }))
  }))
}
Je.displayName = "LabelList";

function aS(t, e) {
  return t ? t === !0 ? Yr.createElement(Je, {
    key: "labelList-implicit",
    data: e
  }) : Yr.isValidElement(t) || (0, HO.default)(t) ? Yr.createElement(Je, {
    key: "labelList-implicit",
    data: e,
    content: t
  }) : (0, qO.default)(t) ? Yr.createElement(Je, Hi({
    data: e
  }, t, {
    key: "labelList-implicit"
  })) : null : null
}

function uS(t, e) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && r && !t.label) return null;
  var n = t.children,
    o = ue(n, Je).map(function(a, u) {
      return YO(a, {
        data: e,
        key: "labelList-".concat(u)
      })
    });
  if (!r) return o;
  var i = aS(t.label, e);
  return [i].concat(GO(o))
}
Je.renderCallByParent = uS;
import lS from "./react-shim-eraudit.js";

function ro(t) {
  "@babel/helpers - typeof";
  return ro = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ro(t)
}

function Ml() {
  return Ml = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ml.apply(this, arguments)
}

function G0(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Z0(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? G0(Object(r), !0).forEach(function(n) {
      cS(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : G0(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function cS(t, e, r) {
  return e = sS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function sS(t) {
  var e = fS(t, "string");
  return ro(e) == "symbol" ? e : e + ""
}

function fS(t, e) {
  if (ro(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ro(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var pS = function(t, e) {
    var r = ge(e - t),
      n = Math.min(Math.abs(e - t), 359.999);
    return r * n
  },
  Xi = function(t) {
    var e = t.cx,
      r = t.cy,
      n = t.radius,
      o = t.angle,
      i = t.sign,
      a = t.isExternal,
      u = t.cornerRadius,
      l = t.cornerIsExternal,
      c = u * (a ? 1 : -1) + n,
      s = Math.asin(u / c) / qi,
      f = l ? o : o + i * s,
      p = $t(e, r, c, f),
      d = $t(e, r, n, f),
      y = l ? o - i * s : o,
      m = $t(e, r, c * Math.cos(s * qi), y);
    return {
      center: p,
      circleTangency: d,
      lineTangency: m,
      theta: s
    }
  },
  Q0 = function(t) {
    var e = t.cx,
      r = t.cy,
      n = t.innerRadius,
      o = t.outerRadius,
      i = t.startAngle,
      a = t.endAngle,
      u = pS(i, a),
      l = i + u,
      c = $t(e, r, o, i),
      s = $t(e, r, o, l),
      f = "M ".concat(c.x, ",").concat(c.y, `
    A `).concat(o, ",").concat(o, `,0,
    `).concat(+(Math.abs(u) > 180), ",").concat(+(i > l), `,
    `).concat(s.x, ",").concat(s.y, `
  `);
    if (n > 0) {
      var p = $t(e, r, n, i),
        d = $t(e, r, n, l);
      f += "L ".concat(d.x, ",").concat(d.y, `
            A `).concat(n, ",").concat(n, `,0,
            `).concat(+(Math.abs(u) > 180), ",").concat(+(i <= l), `,
            `).concat(p.x, ",").concat(p.y, " Z")
    } else f += "L ".concat(e, ",").concat(r, " Z");
    return f
  },
  dS = function(t) {
    var e = t.cx,
      r = t.cy,
      n = t.innerRadius,
      o = t.outerRadius,
      i = t.cornerRadius,
      a = t.forceCornerRadius,
      u = t.cornerIsExternal,
      l = t.startAngle,
      c = t.endAngle,
      s = ge(c - l),
      f = Xi({
        cx: e,
        cy: r,
        radius: o,
        angle: l,
        sign: s,
        cornerRadius: i,
        cornerIsExternal: u
      }),
      p = f.circleTangency,
      d = f.lineTangency,
      y = f.theta,
      m = Xi({
        cx: e,
        cy: r,
        radius: o,
        angle: c,
        sign: -s,
        cornerRadius: i,
        cornerIsExternal: u
      }),
      g = m.circleTangency,
      h = m.lineTangency,
      b = m.theta,
      w = u ? Math.abs(l - c) : Math.abs(l - c) - y - b;
    if (w < 0) return a ? "M ".concat(d.x, ",").concat(d.y, `
        a`).concat(i, ",").concat(i, ",0,0,1,").concat(i * 2, `,0
        a`).concat(i, ",").concat(i, ",0,0,1,").concat(-i * 2, `,0
      `) : Q0({
      cx: e,
      cy: r,
      innerRadius: n,
      outerRadius: o,
      startAngle: l,
      endAngle: c
    });
    var v = "M ".concat(d.x, ",").concat(d.y, `
    A`).concat(i, ",").concat(i, ",0,0,").concat(+(s < 0), ",").concat(p.x, ",").concat(p.y, `
    A`).concat(o, ",").concat(o, ",0,").concat(+(w > 180), ",").concat(+(s < 0), ",").concat(g.x, ",").concat(g.y, `
    A`).concat(i, ",").concat(i, ",0,0,").concat(+(s < 0), ",").concat(h.x, ",").concat(h.y, `
  `);
    if (n > 0) {
      var E = Xi({
          cx: e,
          cy: r,
          radius: n,
          angle: l,
          sign: s,
          isExternal: !0,
          cornerRadius: i,
          cornerIsExternal: u
        }),
        x = E.circleTangency,
        A = E.lineTangency,
        C = E.theta,
        I = Xi({
          cx: e,
          cy: r,
          radius: n,
          angle: c,
          sign: -s,
          isExternal: !0,
          cornerRadius: i,
          cornerIsExternal: u
        }),
        $ = I.circleTangency,
        B = I.lineTangency,
        D = I.theta,
        z = u ? Math.abs(l - c) : Math.abs(l - c) - C - D;
      if (z < 0 && i === 0) return "".concat(v, "L").concat(e, ",").concat(r, "Z");
      v += "L".concat(B.x, ",").concat(B.y, `
      A`).concat(i, ",").concat(i, ",0,0,").concat(+(s < 0), ",").concat($.x, ",").concat($.y, `
      A`).concat(n, ",").concat(n, ",0,").concat(+(z > 180), ",").concat(+(s > 0), ",").concat(x.x, ",").concat(x.y, `
      A`).concat(i, ",").concat(i, ",0,0,").concat(+(s < 0), ",").concat(A.x, ",").concat(A.y, "Z")
    } else v += "L".concat(e, ",").concat(r, "Z");
    return v
  },
  hS = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    cornerRadius: 0,
    forceCornerRadius: !1,
    cornerIsExternal: !1
  },
  J0 = function(t) {
    var e = Z0(Z0({}, hS), t),
      r = e.cx,
      n = e.cy,
      o = e.innerRadius,
      i = e.outerRadius,
      a = e.cornerRadius,
      u = e.forceCornerRadius,
      l = e.cornerIsExternal,
      c = e.startAngle,
      s = e.endAngle,
      f = e.className;
    if (i < o || c === s) return null;
    var p = wt("recharts-sector", f),
      d = i - o,
      y = ur(a, d, 0, !0),
      m;
    return y > 0 && Math.abs(c - s) < 360 ? m = dS({
      cx: r,
      cy: n,
      innerRadius: o,
      outerRadius: i,
      cornerRadius: Math.min(y, d / 2),
      forceCornerRadius: u,
      cornerIsExternal: l,
      startAngle: c,
      endAngle: s
    }) : m = Q0({
      cx: r,
      cy: n,
      innerRadius: o,
      outerRadius: i,
      startAngle: c,
      endAngle: s
    }), lS.createElement("path", Ml({}, Et(e, !0), {
      className: p,
      d: m,
      role: "img"
    }))
  };
import * as yS from "./react-shim-eraudit.js";
var mS = it(Fa()),
  vS = it(Dt());

function no(t) {
  "@babel/helpers - typeof";
  return no = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, no(t)
}

function Tl() {
  return Tl = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Tl.apply(this, arguments)
}

function td(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ed(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? td(Object(r), !0).forEach(function(n) {
      gS(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : td(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function gS(t, e, r) {
  return e = bS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function bS(t) {
  var e = ES(t, "string");
  return no(e) == "symbol" ? e : e + ""
}

function ES(t, e) {
  if (no(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (no(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var rd = {
    curveBasisClosed: Kg,
    curveBasisOpen: Gg,
    curveBasis: Vg,
    curveBumpX: Ig,
    curveBumpY: Ng,
    curveLinearClosed: Zg,
    curveLinear: Xo,
    curveMonotoneX: Qg,
    curveMonotoneY: Jg,
    curveNatural: tb,
    curveStep: eb,
    curveStepAfter: nb,
    curveStepBefore: rb
  },
  Yi = function(t) {
    return t.x === +t.x && t.y === +t.y
  },
  oo = function(t) {
    return t.x
  },
  io = function(t) {
    return t.y
  },
  xS = function(t, e) {
    if ((0, vS.default)(t)) return t;
    var r = "curve".concat((0, mS.default)(t));
    return (r === "curveMonotone" || r === "curveBump") && e ? rd["".concat(r).concat(e === "vertical" ? "Y" : "X")] : rd[r] || Xo
  },
  wS = function(t) {
    var e = t.type,
      r = e === void 0 ? "linear" : e,
      n = t.points,
      o = n === void 0 ? [] : n,
      i = t.baseLine,
      a = t.layout,
      u = t.connectNulls,
      l = u === void 0 ? !1 : u,
      c = xS(r, a),
      s = l ? o.filter(function(y) {
        return Yi(y)
      }) : o,
      f;
    if (Array.isArray(i)) {
      var p = l ? i.filter(function(y) {
          return Yi(y)
        }) : i,
        d = s.map(function(y, m) {
          return ed(ed({}, y), {}, {
            base: p[m]
          })
        });
      return a === "vertical" ? f = Yo().y(io).x1(oo).x0(function(y) {
        return y.base.x
      }) : f = Yo().x(oo).y1(io).y0(function(y) {
        return y.base.y
      }), f.defined(Yi).curve(c), f(d)
    }
    return a === "vertical" && tt(i) ? f = Yo().y(io).x1(oo).x0(i) : tt(i) ? f = Yo().x(oo).y1(io).y0(i) : f = Ns().x(oo).y(io), f.defined(Yi).curve(c), f(s)
  },
  Cl = function(t) {
    var e = t.className,
      r = t.points,
      n = t.path,
      o = t.pathRef;
    if ((!r || !r.length) && !n) return null;
    var i = r && r.length ? wS(t) : n;
    return yS.createElement("path", Tl({}, Et(t, !1), Fo(t), {
      className: wt("recharts-curve", e),
      d: i,
      ref: o
    }))
  };
import Vi, {
  useEffect as OS,
  useRef as SS,
  useState as jS
} from "./react-shim-eraudit.js";
var St = it(Mv());
import AS, {
  PureComponent as PS,
  cloneElement as _S,
  Children as Dl
} from "./react-shim-eraudit.js";
var {
  getOwnPropertyNames: kS,
  getOwnPropertySymbols: MS
} = Object, {
  hasOwnProperty: TS
} = Object.prototype;

function Il(t, e) {
  return function(r, n, o) {
    return t(r, n, o) && e(r, n, o)
  }
}

function Ki(t) {
  return function(e, r, n) {
    if (!e || !r || typeof e != "object" || typeof r != "object") return t(e, r, n);
    let {
      cache: o
    } = n, i = o.get(e), a = o.get(r);
    if (i && a) return i === r && a === e;
    o.set(e, r), o.set(r, e);
    let u = t(e, r, n);
    return o.delete(e), o.delete(r), u
  }
}

function CS(t) {
  return t?.[Symbol.toStringTag]
}

function nd(t) {
  return kS(t).concat(MS(t))
}
var DS = Object.hasOwn || ((t, e) => TS.call(t, e));

function gr(t, e) {
  return t === e || !t && !e && t !== t && e !== e
}
var IS = "__v",
  NS = "__o",
  BS = "_owner",
  {
    getOwnPropertyDescriptor: od,
    keys: id
  } = Object;

function zS(t, e) {
  return t.byteLength === e.byteLength && Gi(new Uint8Array(t), new Uint8Array(e))
}

function RS(t, e, r) {
  let n = t.length;
  if (e.length !== n) return !1;
  for (; n-- > 0;)
    if (!r.equals(t[n], e[n], n, n, t, e, r)) return !1;
  return !0
}

function WS(t, e) {
  return t.byteLength === e.byteLength && Gi(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), new Uint8Array(e.buffer, e.byteOffset, e.byteLength))
}

function LS(t, e) {
  return gr(t.getTime(), e.getTime())
}

function $S(t, e) {
  return t.name === e.name && t.message === e.message && t.cause === e.cause && t.stack === e.stack
}

function FS(t, e) {
  return t === e
}

function ad(t, e, r) {
  let n = t.size;
  if (n !== e.size) return !1;
  if (!n) return !0;
  let o = new Array(n),
    i = t.entries(),
    a, u, l = 0;
  for (;
    (a = i.next()) && !a.done;) {
    let c = e.entries(),
      s = !1,
      f = 0;
    for (;
      (u = c.next()) && !u.done;) {
      if (o[f]) {
        f++;
        continue
      }
      let p = a.value,
        d = u.value;
      if (r.equals(p[0], d[0], l, f, t, e, r) && r.equals(p[1], d[1], p[0], d[0], t, e, r)) {
        s = o[f] = !0;
        break
      }
      f++
    }
    if (!s) return !1;
    l++
  }
  return !0
}
var US = gr;

function qS(t, e, r) {
  let n = id(t),
    o = n.length;
  if (id(e).length !== o) return !1;
  for (; o-- > 0;)
    if (!ld(t, e, r, n[o])) return !1;
  return !0
}

function ao(t, e, r) {
  let n = nd(t),
    o = n.length;
  if (nd(e).length !== o) return !1;
  let i, a, u;
  for (; o-- > 0;)
    if (i = n[o], !ld(t, e, r, i) || (a = od(t, i), u = od(e, i), (a || u) && (!a || !u || a.configurable !== u.configurable || a.enumerable !== u.enumerable || a.writable !== u.writable))) return !1;
  return !0
}

function HS(t, e) {
  return gr(t.valueOf(), e.valueOf())
}

function XS(t, e) {
  return t.source === e.source && t.flags === e.flags
}

function ud(t, e, r) {
  let n = t.size;
  if (n !== e.size) return !1;
  if (!n) return !0;
  let o = new Array(n),
    i = t.values(),
    a, u;
  for (;
    (a = i.next()) && !a.done;) {
    let l = e.values(),
      c = !1,
      s = 0;
    for (;
      (u = l.next()) && !u.done;) {
      if (!o[s] && r.equals(a.value, u.value, a.value, u.value, t, e, r)) {
        c = o[s] = !0;
        break
      }
      s++
    }
    if (!c) return !1
  }
  return !0
}

function Gi(t, e) {
  let r = t.byteLength;
  if (e.byteLength !== r || t.byteOffset !== e.byteOffset) return !1;
  for (; r-- > 0;)
    if (t[r] !== e[r]) return !1;
  return !0
}

function YS(t, e) {
  return t.hostname === e.hostname && t.pathname === e.pathname && t.protocol === e.protocol && t.port === e.port && t.hash === e.hash && t.username === e.username && t.password === e.password
}

function ld(t, e, r, n) {
  return (n === BS || n === NS || n === IS) && (t.$$typeof || e.$$typeof) ? !0 : DS(e, n) && r.equals(t[n], e[n], n, n, t, e, r)
}
var VS = "[object ArrayBuffer]",
  KS = "[object Arguments]",
  GS = "[object Boolean]",
  ZS = "[object DataView]",
  QS = "[object Date]",
  JS = "[object Error]",
  tj = "[object Map]",
  ej = "[object Number]",
  rj = "[object Object]",
  nj = "[object RegExp]",
  oj = "[object Set]",
  ij = "[object String]",
  aj = {
    "[object Int8Array]": !0,
    "[object Uint8Array]": !0,
    "[object Uint8ClampedArray]": !0,
    "[object Int16Array]": !0,
    "[object Uint16Array]": !0,
    "[object Int32Array]": !0,
    "[object Uint32Array]": !0,
    "[object Float16Array]": !0,
    "[object Float32Array]": !0,
    "[object Float64Array]": !0,
    "[object BigInt64Array]": !0,
    "[object BigUint64Array]": !0
  },
  uj = "[object URL]",
  lj = Object.prototype.toString;

function cj({
  areArrayBuffersEqual: t,
  areArraysEqual: e,
  areDataViewsEqual: r,
  areDatesEqual: n,
  areErrorsEqual: o,
  areFunctionsEqual: i,
  areMapsEqual: a,
  areNumbersEqual: u,
  areObjectsEqual: l,
  arePrimitiveWrappersEqual: c,
  areRegExpsEqual: s,
  areSetsEqual: f,
  areTypedArraysEqual: p,
  areUrlsEqual: d,
  unknownTagComparators: y
}) {
  return function(m, g, h) {
    if (m === g) return !0;
    if (m == null || g == null) return !1;
    let b = typeof m;
    if (b !== typeof g) return !1;
    if (b !== "object") return b === "number" ? u(m, g, h) : b === "function" ? i(m, g, h) : !1;
    let w = m.constructor;
    if (w !== g.constructor) return !1;
    if (w === Object) return l(m, g, h);
    if (Array.isArray(m)) return e(m, g, h);
    if (w === Date) return n(m, g, h);
    if (w === RegExp) return s(m, g, h);
    if (w === Map) return a(m, g, h);
    if (w === Set) return f(m, g, h);
    let v = lj.call(m);
    if (v === QS) return n(m, g, h);
    if (v === nj) return s(m, g, h);
    if (v === tj) return a(m, g, h);
    if (v === oj) return f(m, g, h);
    if (v === rj) return typeof m.then != "function" && typeof g.then != "function" && l(m, g, h);
    if (v === uj) return d(m, g, h);
    if (v === JS) return o(m, g, h);
    if (v === KS) return l(m, g, h);
    if (aj[v]) return p(m, g, h);
    if (v === VS) return t(m, g, h);
    if (v === ZS) return r(m, g, h);
    if (v === GS || v === ej || v === ij) return c(m, g, h);
    if (y) {
      let E = y[v];
      if (!E) {
        let x = CS(m);
        x && (E = y[x])
      }
      if (E) return E(m, g, h)
    }
    return !1
  }
}

function sj({
  circular: t,
  createCustomConfig: e,
  strict: r
}) {
  let n = {
    areArrayBuffersEqual: zS,
    areArraysEqual: r ? ao : RS,
    areDataViewsEqual: WS,
    areDatesEqual: LS,
    areErrorsEqual: $S,
    areFunctionsEqual: FS,
    areMapsEqual: r ? Il(ad, ao) : ad,
    areNumbersEqual: US,
    areObjectsEqual: r ? ao : qS,
    arePrimitiveWrappersEqual: HS,
    areRegExpsEqual: XS,
    areSetsEqual: r ? Il(ud, ao) : ud,
    areTypedArraysEqual: r ? Il(Gi, ao) : Gi,
    areUrlsEqual: YS,
    unknownTagComparators: void 0
  };
  if (e && (n = Object.assign({}, n, e(n))), t) {
    let o = Ki(n.areArraysEqual),
      i = Ki(n.areMapsEqual),
      a = Ki(n.areObjectsEqual),
      u = Ki(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: o,
      areMapsEqual: i,
      areObjectsEqual: a,
      areSetsEqual: u
    })
  }
  return n
}

function fj(t) {
  return function(e, r, n, o, i, a, u) {
    return t(e, r, u)
  }
}

function pj({
  circular: t,
  comparator: e,
  createState: r,
  equals: n,
  strict: o
}) {
  if (r) return function(a, u) {
    let {
      cache: l = t ? new WeakMap : void 0,
      meta: c
    } = r();
    return e(a, u, {
      cache: l,
      equals: n,
      meta: c,
      strict: o
    })
  };
  if (t) return function(a, u) {
    return e(a, u, {
      cache: new WeakMap,
      equals: n,
      meta: void 0,
      strict: o
    })
  };
  let i = {
    cache: void 0,
    equals: n,
    meta: void 0,
    strict: o
  };
  return function(a, u) {
    return e(a, u, i)
  }
}
var dj = tr(),
  pM = tr({
    strict: !0
  }),
  dM = tr({
    circular: !0
  }),
  hM = tr({
    circular: !0,
    strict: !0
  }),
  yM = tr({
    createInternalComparator: () => gr
  }),
  mM = tr({
    strict: !0,
    createInternalComparator: () => gr
  }),
  vM = tr({
    circular: !0,
    createInternalComparator: () => gr
  }),
  gM = tr({
    circular: !0,
    createInternalComparator: () => gr,
    strict: !0
  });

function tr(t = {}) {
  let {
    circular: e = !1,
    createInternalComparator: r,
    createState: n,
    strict: o = !1
  } = t, i = sj(t), a = cj(i), u = r ? r(a) : fj(a);
  return pj({
    circular: e,
    comparator: a,
    createState: n,
    equals: u,
    strict: o
  })
}

function hj(t) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(t)
}

function cd(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    r = -1,
    n = function o(i) {
      r < 0 && (r = i), i - r > e ? (t(i), r = -1) : hj(o)
    };
  requestAnimationFrame(n)
}

function Nl(t) {
  "@babel/helpers - typeof";
  return Nl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Nl(t)
}

function yj(t) {
  return bj(t) || gj(t) || vj(t) || mj()
}

function mj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function vj(t, e) {
  if (t) {
    if (typeof t == "string") return sd(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return sd(t, e)
  }
}

function sd(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function gj(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function bj(t) {
  if (Array.isArray(t)) return t
}

function Ej() {
  var t = {},
    e = function() {
      return null
    },
    r = !1,
    n = function o(i) {
      if (!r) {
        if (Array.isArray(i)) {
          if (!i.length) return;
          var a = i,
            u = yj(a),
            l = u[0],
            c = u.slice(1);
          if (typeof l == "number") {
            cd(o.bind(null, c), l);
            return
          }
          o(l), cd(o.bind(null, c));
          return
        }
        Nl(i) === "object" && (t = i, e(t)), typeof i == "function" && i()
      }
    };
  return {
    stop: function() {
      r = !0
    },
    start: function(o) {
      r = !1, n(o)
    },
    subscribe: function(o) {
      return e = o,
        function() {
          e = function() {
            return null
          }
        }
    }
  }
}

function uo(t) {
  "@babel/helpers - typeof";
  return uo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, uo(t)
}

function fd(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function pd(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? fd(Object(r), !0).forEach(function(n) {
      dd(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : fd(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function dd(t, e, r) {
  return e = xj(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function xj(t) {
  var e = wj(t, "string");
  return uo(e) === "symbol" ? e : String(e)
}

function wj(t, e) {
  if (uo(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (uo(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Oj = function(t, e) {
    return [Object.keys(t), Object.keys(e)].reduce(function(r, n) {
      return r.filter(function(o) {
        return n.includes(o)
      })
    })
  },
  Sj = function(t) {
    return t
  },
  jj = function(t) {
    return t.replace(/([A-Z])/g, function(e) {
      return "-".concat(e.toLowerCase())
    })
  },
  lo = function(t, e) {
    return Object.keys(e).reduce(function(r, n) {
      return pd(pd({}, r), {}, dd({}, n, t(n, e[n])))
    }, {})
  },
  hd = function(t, e, r) {
    return t.map(function(n) {
      return "".concat(jj(n), " ").concat(e, "ms ").concat(r)
    }).join(",")
  },
  Aj = !1,
  Zi = function(t, e, r, n, o, i, a, u) {
    if (Aj && typeof console < "u" && console.warn && (e === void 0 && console.warn("LogUtils requires an error message argument"), !t))
      if (e === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var l = [r, n, o, i, a, u],
          c = 0;
        console.warn(e.replace(/%s/g, function() {
          return l[c++]
        }))
      }
  };

function Pj(t, e) {
  return Mj(t) || kj(t, e) || yd(t, e) || _j()
}

function _j() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function kj(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function Mj(t) {
  if (Array.isArray(t)) return t
}

function Tj(t) {
  return Ij(t) || Dj(t) || yd(t) || Cj()
}

function Cj() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function yd(t, e) {
  if (t) {
    if (typeof t == "string") return Bl(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Bl(t, e)
  }
}

function Dj(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function Ij(t) {
  if (Array.isArray(t)) return Bl(t)
}

function Bl(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var Qi = 1e-4,
  md = function(t, e) {
    return [0, 3 * t, 3 * e - 6 * t, 3 * t - 3 * e + 1]
  },
  vd = function(t, e) {
    return t.map(function(r, n) {
      return r * Math.pow(e, n)
    }).reduce(function(r, n) {
      return r + n
    })
  },
  gd = function(t, e) {
    return function(r) {
      var n = md(t, e);
      return vd(n, r)
    }
  },
  Nj = function(t, e) {
    return function(r) {
      var n = md(t, e),
        o = [].concat(Tj(n.map(function(i, a) {
          return i * a
        }).slice(1)), [0]);
      return vd(o, r)
    }
  },
  bd = function() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
    var n = e[0],
      o = e[1],
      i = e[2],
      a = e[3];
    if (e.length === 1) switch (e[0]) {
      case "linear":
        n = 0, o = 0, i = 1, a = 1;
        break;
      case "ease":
        n = .25, o = .1, i = .25, a = 1;
        break;
      case "ease-in":
        n = .42, o = 0, i = 1, a = 1;
        break;
      case "ease-out":
        n = .42, o = 0, i = .58, a = 1;
        break;
      case "ease-in-out":
        n = 0, o = 0, i = .58, a = 1;
        break;
      default: {
        var u = e[0].split("(");
        if (u[0] === "cubic-bezier" && u[1].split(")")[0].split(",").length === 4) {
          var l = u[1].split(")")[0].split(",").map(function(m) {
              return parseFloat(m)
            }),
            c = Pj(l, 4);
          n = c[0], o = c[1], i = c[2], a = c[3]
        } else Zi(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", e)
      }
    }
    Zi([n, i, o, a].every(function(m) {
      return typeof m == "number" && m >= 0 && m <= 1
    }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", e);
    var s = gd(n, i),
      f = gd(o, a),
      p = Nj(n, i),
      d = function(m) {
        return m > 1 ? 1 : m < 0 ? 0 : m
      },
      y = function(m) {
        for (var g = m > 1 ? 1 : m, h = g, b = 0; b < 8; ++b) {
          var w = s(h) - g,
            v = p(h);
          if (Math.abs(w - g) < Qi || v < Qi) return f(h);
          h = d(h - w / v)
        }
        return f(h)
      };
    return y.isStepper = !1, y
  },
  Bj = function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      e = t.stiff,
      r = e === void 0 ? 100 : e,
      n = t.damping,
      o = n === void 0 ? 8 : n,
      i = t.dt,
      a = i === void 0 ? 17 : i,
      u = function(l, c, s) {
        var f = -(l - c) * r,
          p = s * o,
          d = s + (f - p) * a / 1e3,
          y = s * a / 1e3 + l;
        return Math.abs(y - c) < Qi && Math.abs(d) < Qi ? [c, 0] : [y, d]
      };
    return u.isStepper = !0, u.dt = a, u
  },
  zj = function() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
    var n = e[0];
    if (typeof n == "string") switch (n) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return bd(n);
      case "spring":
        return Bj();
      default:
        if (n.split("(")[0] === "cubic-bezier") return bd(n);
        Zi(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", e)
    }
    return typeof n == "function" ? n : (Zi(!1, "[configEasing]: first argument type should be function or string, instead received %s", e), null)
  };

function co(t) {
  "@babel/helpers - typeof";
  return co = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, co(t)
}

function Ed(t) {
  return Lj(t) || Wj(t) || wd(t) || Rj()
}

function Rj() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Wj(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function Lj(t) {
  if (Array.isArray(t)) return Rl(t)
}

function xd(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ft(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? xd(Object(r), !0).forEach(function(n) {
      zl(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : xd(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function zl(t, e, r) {
  return e = $j(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function $j(t) {
  var e = Fj(t, "string");
  return co(e) === "symbol" ? e : String(e)
}

function Fj(t, e) {
  if (co(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (co(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Uj(t, e) {
  return Xj(t) || Hj(t, e) || wd(t, e) || qj()
}

function qj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function wd(t, e) {
  if (t) {
    if (typeof t == "string") return Rl(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Rl(t, e)
  }
}

function Rl(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function Hj(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function Xj(t) {
  if (Array.isArray(t)) return t
}
var Ji = function(t, e, r) {
    return t + (e - t) * r
  },
  Wl = function(t) {
    var e = t.from,
      r = t.to;
    return e !== r
  },
  Yj = function t(e, r, n) {
    var o = lo(function(i, a) {
      if (Wl(a)) {
        var u = e(a.from, a.to, a.velocity),
          l = Uj(u, 2),
          c = l[0],
          s = l[1];
        return Ft(Ft({}, a), {}, {
          from: c,
          velocity: s
        })
      }
      return a
    }, r);
    return n < 1 ? lo(function(i, a) {
      return Wl(a) ? Ft(Ft({}, a), {}, {
        velocity: Ji(a.velocity, o[i].velocity, n),
        from: Ji(a.from, o[i].from, n)
      }) : a
    }, r) : t(e, o, n - 1)
  },
  Vj = function(t, e, r, n, o) {
    var i = Oj(t, e),
      a = i.reduce(function(g, h) {
        return Ft(Ft({}, g), {}, zl({}, h, [t[h], e[h]]))
      }, {}),
      u = i.reduce(function(g, h) {
        return Ft(Ft({}, g), {}, zl({}, h, {
          from: t[h],
          velocity: 0,
          to: e[h]
        }))
      }, {}),
      l = -1,
      c, s, f = function() {
        return null
      },
      p = function() {
        return lo(function(g, h) {
          return h.from
        }, u)
      },
      d = function() {
        return !Object.values(u).filter(Wl).length
      },
      y = function(g) {
        c || (c = g);
        var h = g - c,
          b = h / r.dt;
        u = Yj(r, u, b), o(Ft(Ft(Ft({}, t), e), p(u))), c = g, d() || (l = requestAnimationFrame(f))
      },
      m = function(g) {
        s || (s = g);
        var h = (g - s) / n,
          b = lo(function(v, E) {
            return Ji.apply(void 0, Ed(E).concat([r(h)]))
          }, a);
        if (o(Ft(Ft(Ft({}, t), e), b)), h < 1) l = requestAnimationFrame(f);
        else {
          var w = lo(function(v, E) {
            return Ji.apply(void 0, Ed(E).concat([r(1)]))
          }, a);
          o(Ft(Ft(Ft({}, t), e), w))
        }
      };
    return f = r.isStepper ? y : m,
      function() {
        return requestAnimationFrame(f),
          function() {
            cancelAnimationFrame(l)
          }
      }
  };

function Vr(t) {
  "@babel/helpers - typeof";
  return Vr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Vr(t)
}
var Kj = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];

function Gj(t, e) {
  if (t == null) return {};
  var r = Zj(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function Zj(t, e) {
  if (t == null) return {};
  var r = {},
    n = Object.keys(t),
    o, i;
  for (i = 0; i < n.length; i++) o = n[i], !(e.indexOf(o) >= 0) && (r[o] = t[o]);
  return r
}

function Ll(t) {
  return eA(t) || tA(t) || Jj(t) || Qj()
}

function Qj() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Jj(t, e) {
  if (t) {
    if (typeof t == "string") return $l(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return $l(t, e)
  }
}

function tA(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function eA(t) {
  if (Array.isArray(t)) return $l(t)
}

function $l(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function Od(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function we(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Od(Object(r), !0).forEach(function(n) {
      so(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Od(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function so(t, e, r) {
  return e = jd(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function rA(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Sd(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, jd(n.key), n)
  }
}

function nA(t, e, r) {
  return e && Sd(t.prototype, e), r && Sd(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function jd(t) {
  var e = oA(t, "string");
  return Vr(e) === "symbol" ? e : String(e)
}

function oA(t, e) {
  if (Vr(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Vr(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function iA(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Fl(t, e)
}

function Fl(t, e) {
  return Fl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, Fl(t, e)
}

function aA(t) {
  var e = uA();
  return function() {
    var r = ta(t),
      n;
    if (e) {
      var o = ta(this).constructor;
      n = Reflect.construct(r, arguments, o)
    } else n = r.apply(this, arguments);
    return Ul(this, n)
  }
}

function Ul(t, e) {
  if (e && (Vr(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return ql(t)
}

function ql(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function uA() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
  } catch {
    return !1
  }
}

function ta(t) {
  return ta = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, ta(t)
}
var ea = (function(t) {
  iA(r, t);
  var e = aA(r);

  function r(n, o) {
    var i;
    rA(this, r), i = e.call(this, n, o);
    var a = i.props,
      u = a.isActive,
      l = a.attributeName,
      c = a.from,
      s = a.to,
      f = a.steps,
      p = a.children,
      d = a.duration;
    if (i.handleStyleChange = i.handleStyleChange.bind(ql(i)), i.changeStyle = i.changeStyle.bind(ql(i)), !u || d <= 0) return i.state = {
      style: {}
    }, typeof p == "function" && (i.state = {
      style: s
    }), Ul(i);
    if (f && f.length) i.state = {
      style: f[0].style
    };
    else if (c) {
      if (typeof p == "function") return i.state = {
        style: c
      }, Ul(i);
      i.state = {
        style: l ? so({}, l, c) : c
      }
    } else i.state = {
      style: {}
    };
    return i
  }
  return nA(r, [{
    key: "componentDidMount",
    value: function() {
      var n = this.props,
        o = n.isActive,
        i = n.canBegin;
      this.mounted = !0, !(!o || !i) && this.runAnimation(this.props)
    }
  }, {
    key: "componentDidUpdate",
    value: function(n) {
      var o = this.props,
        i = o.isActive,
        a = o.canBegin,
        u = o.attributeName,
        l = o.shouldReAnimate,
        c = o.to,
        s = o.from,
        f = this.state.style;
      if (a) {
        if (!i) {
          var p = {
            style: u ? so({}, u, c) : c
          };
          this.state && f && (u && f[u] !== c || !u && f !== c) && this.setState(p);
          return
        }
        if (!(dj(n.to, c) && n.canBegin && n.isActive)) {
          var d = !n.canBegin || !n.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var y = d || l ? s : n.to;
          if (this.state && f) {
            var m = {
              style: u ? so({}, u, y) : y
            };
            (u && f[u] !== y || !u && f !== y) && this.setState(m)
          }
          this.runAnimation(we(we({}, this.props), {}, {
            from: y,
            begin: 0
          }))
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.mounted = !1;
      var n = this.props.onAnimationEnd;
      this.unSubscribe && this.unSubscribe(), this.manager && (this.manager.stop(), this.manager = null), this.stopJSAnimation && this.stopJSAnimation(), n && n()
    }
  }, {
    key: "handleStyleChange",
    value: function(n) {
      this.changeStyle(n)
    }
  }, {
    key: "changeStyle",
    value: function(n) {
      this.mounted && this.setState({
        style: n
      })
    }
  }, {
    key: "runJSAnimation",
    value: function(n) {
      var o = this,
        i = n.from,
        a = n.to,
        u = n.duration,
        l = n.easing,
        c = n.begin,
        s = n.onAnimationEnd,
        f = n.onAnimationStart,
        p = Vj(i, a, zj(l), u, this.changeStyle),
        d = function() {
          o.stopJSAnimation = p()
        };
      this.manager.start([f, c, d, u, s])
    }
  }, {
    key: "runStepAnimation",
    value: function(n) {
      var o = this,
        i = n.steps,
        a = n.begin,
        u = n.onAnimationStart,
        l = i[0],
        c = l.style,
        s = l.duration,
        f = s === void 0 ? 0 : s,
        p = function(d, y, m) {
          if (m === 0) return d;
          var g = y.duration,
            h = y.easing,
            b = h === void 0 ? "ease" : h,
            w = y.style,
            v = y.properties,
            E = y.onAnimationEnd,
            x = m > 0 ? i[m - 1] : y,
            A = v || Object.keys(w);
          if (typeof b == "function" || b === "spring") return [].concat(Ll(d), [o.runJSAnimation.bind(o, {
            from: x.style,
            to: w,
            duration: g,
            easing: b
          }), g]);
          var C = hd(A, g, b),
            I = we(we(we({}, x.style), w), {}, {
              transition: C
            });
          return [].concat(Ll(d), [I, g, E]).filter(Sj)
        };
      return this.manager.start([u].concat(Ll(i.reduce(p, [c, Math.max(f, a)])), [n.onAnimationEnd]))
    }
  }, {
    key: "runAnimation",
    value: function(n) {
      this.manager || (this.manager = Ej());
      var o = n.begin,
        i = n.duration,
        a = n.attributeName,
        u = n.to,
        l = n.easing,
        c = n.onAnimationStart,
        s = n.onAnimationEnd,
        f = n.steps,
        p = n.children,
        d = this.manager;
      if (this.unSubscribe = d.subscribe(this.handleStyleChange), typeof l == "function" || typeof p == "function" || l === "spring") {
        this.runJSAnimation(n);
        return
      }
      if (f.length > 1) {
        this.runStepAnimation(n);
        return
      }
      var y = a ? so({}, a, u) : u,
        m = hd(Object.keys(y), i, l);
      d.start([c, o, we(we({}, y), {}, {
        transition: m
      }), i, s])
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props,
        o = n.children,
        i = n.begin,
        a = n.duration,
        u = n.attributeName,
        l = n.easing,
        c = n.isActive,
        s = n.steps,
        f = n.from,
        p = n.to,
        d = n.canBegin,
        y = n.onAnimationEnd,
        m = n.shouldReAnimate,
        g = n.onAnimationReStart,
        h = Gj(n, Kj),
        b = Dl.count(o),
        w = this.state.style;
      if (typeof o == "function") return o(w);
      if (!c || b === 0 || a <= 0) return o;
      var v = function(E) {
        var x = E.props,
          A = x.style,
          C = A === void 0 ? {} : A,
          I = x.className,
          $ = _S(E, we(we({}, h), {}, {
            style: we(we({}, C), w),
            className: I
          }));
        return $
      };
      return b === 1 ? v(Dl.only(o)) : AS.createElement("div", null, Dl.map(o, function(E) {
        return v(E)
      }))
    }
  }]), r
})(PS);
ea.displayName = "Animate", ea.defaultProps = {
  begin: 0,
  duration: 1e3,
  from: "",
  to: "",
  attributeName: "",
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  steps: [],
  onAnimationEnd: function() {},
  onAnimationStart: function() {}
}, ea.propTypes = {
  from: St.default.oneOfType([St.default.object, St.default.string]),
  to: St.default.oneOfType([St.default.object, St.default.string]),
  attributeName: St.default.string,
  duration: St.default.number,
  begin: St.default.number,
  easing: St.default.oneOfType([St.default.string, St.default.func]),
  steps: St.default.arrayOf(St.default.shape({
    duration: St.default.number.isRequired,
    style: St.default.object.isRequired,
    easing: St.default.oneOfType([St.default.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), St.default.func]),
    properties: St.default.arrayOf("string"),
    onAnimationEnd: St.default.func
  })),
  children: St.default.oneOfType([St.default.node, St.default.func]),
  isActive: St.default.bool,
  canBegin: St.default.bool,
  onAnimationEnd: St.default.func,
  shouldReAnimate: St.default.bool,
  onAnimationStart: St.default.func,
  onAnimationReStart: St.default.func
};
var lA = ea,
  Kr = lA;

function fo(t) {
  "@babel/helpers - typeof";
  return fo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, fo(t)
}

function ra() {
  return ra = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, ra.apply(this, arguments)
}

function cA(t, e) {
  return dA(t) || pA(t, e) || fA(t, e) || sA()
}

function sA() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function fA(t, e) {
  if (t) {
    if (typeof t == "string") return Ad(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ad(t, e)
  }
}

function Ad(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function pA(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function dA(t) {
  if (Array.isArray(t)) return t
}

function Pd(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function _d(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Pd(Object(r), !0).forEach(function(n) {
      hA(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Pd(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function hA(t, e, r) {
  return e = yA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function yA(t) {
  var e = mA(t, "string");
  return fo(e) == "symbol" ? e : e + ""
}

function mA(t, e) {
  if (fo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (fo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var kd = function(t, e, r, n, o) {
    var i = Math.min(Math.abs(r) / 2, Math.abs(n) / 2),
      a = n >= 0 ? 1 : -1,
      u = r >= 0 ? 1 : -1,
      l = n >= 0 && r >= 0 || n < 0 && r < 0 ? 1 : 0,
      c;
    if (i > 0 && o instanceof Array) {
      for (var s = [0, 0, 0, 0], f = 0, p = 4; f < p; f++) s[f] = o[f] > i ? i : o[f];
      c = "M".concat(t, ",").concat(e + a * s[0]), s[0] > 0 && (c += "A ".concat(s[0], ",").concat(s[0], ",0,0,").concat(l, ",").concat(t + u * s[0], ",").concat(e)), c += "L ".concat(t + r - u * s[1], ",").concat(e), s[1] > 0 && (c += "A ".concat(s[1], ",").concat(s[1], ",0,0,").concat(l, `,
        `).concat(t + r, ",").concat(e + a * s[1])), c += "L ".concat(t + r, ",").concat(e + n - a * s[2]), s[2] > 0 && (c += "A ".concat(s[2], ",").concat(s[2], ",0,0,").concat(l, `,
        `).concat(t + r - u * s[2], ",").concat(e + n)), c += "L ".concat(t + u * s[3], ",").concat(e + n), s[3] > 0 && (c += "A ".concat(s[3], ",").concat(s[3], ",0,0,").concat(l, `,
        `).concat(t, ",").concat(e + n - a * s[3])), c += "Z"
    } else if (i > 0 && o === +o && o > 0) {
      var d = Math.min(i, o);
      c = "M ".concat(t, ",").concat(e + a * d, `
            A `).concat(d, ",").concat(d, ",0,0,").concat(l, ",").concat(t + u * d, ",").concat(e, `
            L `).concat(t + r - u * d, ",").concat(e, `
            A `).concat(d, ",").concat(d, ",0,0,").concat(l, ",").concat(t + r, ",").concat(e + a * d, `
            L `).concat(t + r, ",").concat(e + n - a * d, `
            A `).concat(d, ",").concat(d, ",0,0,").concat(l, ",").concat(t + r - u * d, ",").concat(e + n, `
            L `).concat(t + u * d, ",").concat(e + n, `
            A `).concat(d, ",").concat(d, ",0,0,").concat(l, ",").concat(t, ",").concat(e + n - a * d, " Z")
    } else c = "M ".concat(t, ",").concat(e, " h ").concat(r, " v ").concat(n, " h ").concat(-r, " Z");
    return c
  },
  vA = function(t, e) {
    if (!t || !e) return !1;
    var r = t.x,
      n = t.y,
      o = e.x,
      i = e.y,
      a = e.width,
      u = e.height;
    if (Math.abs(a) > 0 && Math.abs(u) > 0) {
      var l = Math.min(o, o + a),
        c = Math.max(o, o + a),
        s = Math.min(i, i + u),
        f = Math.max(i, i + u);
      return r >= l && r <= c && n >= s && n <= f
    }
    return !1
  },
  gA = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
    isAnimationActive: !1,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: "ease"
  },
  Hl = function(t) {
    var e = _d(_d({}, gA), t),
      r = SS(),
      n = jS(-1),
      o = cA(n, 2),
      i = o[0],
      a = o[1];
    OS(function() {
      if (r.current && r.current.getTotalLength) try {
        var w = r.current.getTotalLength();
        w && a(w)
      } catch {}
    }, []);
    var u = e.x,
      l = e.y,
      c = e.width,
      s = e.height,
      f = e.radius,
      p = e.className,
      d = e.animationEasing,
      y = e.animationDuration,
      m = e.animationBegin,
      g = e.isAnimationActive,
      h = e.isUpdateAnimationActive;
    if (u !== +u || l !== +l || c !== +c || s !== +s || c === 0 || s === 0) return null;
    var b = wt("recharts-rectangle", p);
    return h ? Vi.createElement(Kr, {
      canBegin: i > 0,
      from: {
        width: c,
        height: s,
        x: u,
        y: l
      },
      to: {
        width: c,
        height: s,
        x: u,
        y: l
      },
      duration: y,
      animationEasing: d,
      isActive: h
    }, function(w) {
      var v = w.width,
        E = w.height,
        x = w.x,
        A = w.y;
      return Vi.createElement(Kr, {
        canBegin: i > 0,
        from: "0px ".concat(i === -1 ? 1 : i, "px"),
        to: "".concat(i, "px 0px"),
        attributeName: "strokeDasharray",
        begin: m,
        duration: y,
        isActive: g,
        easing: d
      }, Vi.createElement("path", ra({}, Et(e, !0), {
        className: b,
        d: kd(x, A, v, E, f),
        ref: r
      })))
    }) : Vi.createElement("path", ra({}, Et(e, !0), {
      className: b,
      d: kd(u, l, c, s, f)
    }))
  };
import * as bA from "./react-shim-eraudit.js";

function Xl() {
  return Xl = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Xl.apply(this, arguments)
}
var Yl = function(t) {
  var e = t.cx,
    r = t.cy,
    n = t.r,
    o = t.className,
    i = wt("recharts-dot", o);
  return e === +e && r === +r && n === +n ? bA.createElement("circle", Xl({}, Et(t, !1), Fo(t), {
    className: i,
    cx: e,
    cy: r,
    r: n
  })) : null
};
import EA from "./react-shim-eraudit.js";

function po(t) {
  "@babel/helpers - typeof";
  return po = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, po(t)
}
var xA = ["x", "y", "top", "left", "width", "height", "className"];

function Vl() {
  return Vl = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Vl.apply(this, arguments)
}

function Md(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function wA(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Md(Object(r), !0).forEach(function(n) {
      OA(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Md(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function OA(t, e, r) {
  return e = SA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function SA(t) {
  var e = jA(t, "string");
  return po(e) == "symbol" ? e : e + ""
}

function jA(t, e) {
  if (po(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (po(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function AA(t, e) {
  if (t == null) return {};
  var r = PA(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function PA(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var _A = function(t, e, r, n, o, i) {
    return "M".concat(t, ",").concat(o, "v").concat(n, "M").concat(i, ",").concat(e, "h").concat(r)
  },
  kA = function(t) {
    var e = t.x,
      r = e === void 0 ? 0 : e,
      n = t.y,
      o = n === void 0 ? 0 : n,
      i = t.top,
      a = i === void 0 ? 0 : i,
      u = t.left,
      l = u === void 0 ? 0 : u,
      c = t.width,
      s = c === void 0 ? 0 : c,
      f = t.height,
      p = f === void 0 ? 0 : f,
      d = t.className,
      y = AA(t, xA),
      m = wA({
        x: r,
        y: o,
        top: a,
        left: l,
        width: s,
        height: p
      }, y);
    return !tt(r) || !tt(o) || !tt(s) || !tt(p) || !tt(a) || !tt(l) ? null : EA.createElement("path", Vl({}, Et(m, !0), {
      className: wt("recharts-cross", d),
      d: _A(r, o, s, p, a, l)
    }))
  },
  MA = it(Dt()),
  TA = it(Cv()),
  CA = it(Dv()),
  DA = it(Lo());
import br, {
  isValidElement as Td,
  cloneElement as IA
} from "./react-shim-eraudit.js";
import ho, {
  useEffect as NA,
  useRef as BA,
  useState as zA
} from "./react-shim-eraudit.js";

function yo(t) {
  "@babel/helpers - typeof";
  return yo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, yo(t)
}

function na() {
  return na = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, na.apply(this, arguments)
}

function RA(t, e) {
  return FA(t) || $A(t, e) || LA(t, e) || WA()
}

function WA() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function LA(t, e) {
  if (t) {
    if (typeof t == "string") return Cd(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Cd(t, e)
  }
}

function Cd(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function $A(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function FA(t) {
  if (Array.isArray(t)) return t
}

function Dd(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Id(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Dd(Object(r), !0).forEach(function(n) {
      UA(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Dd(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function UA(t, e, r) {
  return e = qA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function qA(t) {
  var e = HA(t, "string");
  return yo(e) == "symbol" ? e : e + ""
}

function HA(t, e) {
  if (yo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (yo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Nd = function(t, e, r, n, o) {
    var i = r - n,
      a;
    return a = "M ".concat(t, ",").concat(e), a += "L ".concat(t + r, ",").concat(e), a += "L ".concat(t + r - i / 2, ",").concat(e + o), a += "L ".concat(t + r - i / 2 - n, ",").concat(e + o), a += "L ".concat(t, ",").concat(e, " Z"), a
  },
  XA = {
    x: 0,
    y: 0,
    upperWidth: 0,
    lowerWidth: 0,
    height: 0,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: "ease"
  },
  YA = function(t) {
    var e = Id(Id({}, XA), t),
      r = BA(),
      n = zA(-1),
      o = RA(n, 2),
      i = o[0],
      a = o[1];
    NA(function() {
      if (r.current && r.current.getTotalLength) try {
        var b = r.current.getTotalLength();
        b && a(b)
      } catch {}
    }, []);
    var u = e.x,
      l = e.y,
      c = e.upperWidth,
      s = e.lowerWidth,
      f = e.height,
      p = e.className,
      d = e.animationEasing,
      y = e.animationDuration,
      m = e.animationBegin,
      g = e.isUpdateAnimationActive;
    if (u !== +u || l !== +l || c !== +c || s !== +s || f !== +f || c === 0 && s === 0 || f === 0) return null;
    var h = wt("recharts-trapezoid", p);
    return g ? ho.createElement(Kr, {
      canBegin: i > 0,
      from: {
        upperWidth: 0,
        lowerWidth: 0,
        height: f,
        x: u,
        y: l
      },
      to: {
        upperWidth: c,
        lowerWidth: s,
        height: f,
        x: u,
        y: l
      },
      duration: y,
      animationEasing: d,
      isActive: g
    }, function(b) {
      var w = b.upperWidth,
        v = b.lowerWidth,
        E = b.height,
        x = b.x,
        A = b.y;
      return ho.createElement(Kr, {
        canBegin: i > 0,
        from: "0px ".concat(i === -1 ? 1 : i, "px"),
        to: "".concat(i, "px 0px"),
        attributeName: "strokeDasharray",
        begin: m,
        duration: y,
        easing: d
      }, ho.createElement("path", na({}, Et(e, !0), {
        className: h,
        d: Nd(x, A, w, v, E),
        ref: r
      })))
    }) : ho.createElement("g", null, ho.createElement("path", na({}, Et(e, !0), {
      className: h,
      d: Nd(u, l, c, s, f)
    })))
  },
  VA = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];

function mo(t) {
  "@babel/helpers - typeof";
  return mo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, mo(t)
}

function KA(t, e) {
  if (t == null) return {};
  var r = GA(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function GA(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Bd(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function oa(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Bd(Object(r), !0).forEach(function(n) {
      ZA(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Bd(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ZA(t, e, r) {
  return e = QA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function QA(t) {
  var e = JA(t, "string");
  return mo(e) == "symbol" ? e : e + ""
}

function JA(t, e) {
  if (mo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (mo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function t3(t, e) {
  return oa(oa({}, e), t)
}

function e3(t, e) {
  return t === "symbols"
}

function zd(t) {
  var e = t.shapeType,
    r = t.elementProps;
  switch (e) {
    case "rectangle":
      return br.createElement(Hl, r);
    case "trapezoid":
      return br.createElement(YA, r);
    case "sector":
      return br.createElement(J0, r);
    case "symbols":
      if (e3(e, r)) return br.createElement(gu, r);
      break;
    default:
      return null
  }
}

function r3(t) {
  return Td(t) ? t.props : t
}

function n3(t) {
  var e = t.option,
    r = t.shapeType,
    n = t.propTransformer,
    o = n === void 0 ? t3 : n,
    i = t.activeClassName,
    a = i === void 0 ? "recharts-active-shape" : i,
    u = t.isActive,
    l = KA(t, VA),
    c;
  if (Td(e)) c = IA(e, oa(oa({}, l), r3(e)));
  else if ((0, MA.default)(e)) c = e(l);
  else if ((0, TA.default)(e) && !(0, CA.default)(e)) {
    var s = o(e, l);
    c = br.createElement(zd, {
      shapeType: r,
      elementProps: s
    })
  } else {
    var f = l;
    c = br.createElement(zd, {
      shapeType: r,
      elementProps: f
    })
  }
  return u ? br.createElement(Ct, {
    className: a
  }, c) : c
}

function ia(t, e) {
  return e != null && "trapezoids" in t.props
}

function aa(t, e) {
  return e != null && "sectors" in t.props
}

function vo(t, e) {
  return e != null && "points" in t.props
}

function o3(t, e) {
  var r, n, o = t.x === (e == null || (r = e.labelViewBox) === null || r === void 0 ? void 0 : r.x) || t.x === e.x,
    i = t.y === (e == null || (n = e.labelViewBox) === null || n === void 0 ? void 0 : n.y) || t.y === e.y;
  return o && i
}

function i3(t, e) {
  var r = t.endAngle === e.endAngle,
    n = t.startAngle === e.startAngle;
  return r && n
}

function a3(t, e) {
  var r = t.x === e.x,
    n = t.y === e.y,
    o = t.z === e.z;
  return r && n && o
}

function u3(t, e) {
  var r;
  return ia(t, e) ? r = o3 : aa(t, e) ? r = i3 : vo(t, e) && (r = a3), r
}

function l3(t, e) {
  var r;
  return ia(t, e) ? r = "trapezoids" : aa(t, e) ? r = "sectors" : vo(t, e) && (r = "points"), r
}

function c3(t, e) {
  if (ia(t, e)) {
    var r;
    return (r = e.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload
  }
  if (aa(t, e)) {
    var n;
    return (n = e.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload
  }
  return vo(t, e) ? e.payload : {}
}

function s3(t) {
  var e = t.activeTooltipItem,
    r = t.graphicalItem,
    n = t.itemData,
    o = l3(r, e),
    i = c3(r, e),
    a = n.filter(function(l, c) {
      var s = (0, DA.default)(i, l),
        f = r.props[o].filter(function(y) {
          var m = u3(r, e);
          return m(y, e)
        }),
        p = r.props[o].indexOf(f[f.length - 1]),
        d = c === p;
      return s && d
    }),
    u = n.indexOf(a[a.length - 1]);
  return u
}
import qt, {
  PureComponent as f3,
  Children as p3
} from "./react-shim-eraudit.js";
var Rd = it(Dt()),
  d3 = it(hs());

function go(t) {
  "@babel/helpers - typeof";
  return go = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, go(t)
}

function Wd(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ld(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Wd(Object(r), !0).forEach(function(n) {
      $d(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Wd(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function $d(t, e, r) {
  return e = h3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function h3(t) {
  var e = y3(t, "string");
  return go(e) == "symbol" ? e : e + ""
}

function y3(t, e) {
  if (go(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (go(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var m3 = ["Webkit", "Moz", "O", "ms"],
  v3 = function(t, e) {
    if (!t) return null;
    var r = t.replace(/(\w)/, function(o) {
        return o.toUpperCase()
      }),
      n = m3.reduce(function(o, i) {
        return Ld(Ld({}, o), {}, $d({}, i + r, e))
      }, {});
    return n[t] = e, n
  };

function Gr(t) {
  "@babel/helpers - typeof";
  return Gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Gr(t)
}

function ua() {
  return ua = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, ua.apply(this, arguments)
}

function Fd(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Kl(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Fd(Object(r), !0).forEach(function(n) {
      re(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Fd(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function g3(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Ud(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Hd(n.key), n)
  }
}

function b3(t, e, r) {
  return e && Ud(t.prototype, e), r && Ud(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function E3(t, e, r) {
  return e = la(e), x3(t, qd() ? Reflect.construct(e, r || [], la(t).constructor) : e.apply(t, r))
}

function x3(t, e) {
  if (e && (Gr(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return w3(t)
}

function w3(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function qd() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (qd = function() {
    return !!t
  })()
}

function la(t) {
  return la = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, la(t)
}

function O3(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Gl(t, e)
}

function Gl(t, e) {
  return Gl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, Gl(t, e)
}

function re(t, e, r) {
  return e = Hd(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Hd(t) {
  var e = S3(t, "string");
  return Gr(e) == "symbol" ? e : e + ""
}

function S3(t, e) {
  if (Gr(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Gr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var j3 = function(t) {
    var e = t.data,
      r = t.startIndex,
      n = t.endIndex,
      o = t.x,
      i = t.width,
      a = t.travellerWidth;
    if (!e || !e.length) return {};
    var u = e.length,
      l = zn().domain((0, d3.default)(0, u)).range([o, o + i - a]),
      c = l.domain().map(function(s) {
        return l(s)
      });
    return {
      isTextActive: !1,
      isSlideMoving: !1,
      isTravellerMoving: !1,
      isTravellerFocused: !1,
      startX: l(r),
      endX: l(n),
      scale: l,
      scaleValues: c
    }
  },
  Xd = function(t) {
    return t.changedTouches && !!t.changedTouches.length
  },
  Zr = (function(t) {
    function e(r) {
      var n;
      return g3(this, e), n = E3(this, e, [r]), re(n, "handleDrag", function(o) {
        n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(o) : n.state.isSlideMoving && n.handleSlideDrag(o)
      }), re(n, "handleTouchMove", function(o) {
        o.changedTouches != null && o.changedTouches.length > 0 && n.handleDrag(o.changedTouches[0])
      }), re(n, "handleDragEnd", function() {
        n.setState({
          isTravellerMoving: !1,
          isSlideMoving: !1
        }, function() {
          var o = n.props,
            i = o.endIndex,
            a = o.onDragEnd,
            u = o.startIndex;
          a?.({
            endIndex: i,
            startIndex: u
          })
        }), n.detachDragEndListener()
      }), re(n, "handleLeaveWrapper", function() {
        (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut))
      }), re(n, "handleEnterSlideOrTraveller", function() {
        n.setState({
          isTextActive: !0
        })
      }), re(n, "handleLeaveSlideOrTraveller", function() {
        n.setState({
          isTextActive: !1
        })
      }), re(n, "handleSlideDragStart", function(o) {
        var i = Xd(o) ? o.changedTouches[0] : o;
        n.setState({
          isTravellerMoving: !1,
          isSlideMoving: !0,
          slideMoveStartX: i.pageX
        }), n.attachDragEndListener()
      }), n.travellerDragStartHandlers = {
        startX: n.handleTravellerDragStart.bind(n, "startX"),
        endX: n.handleTravellerDragStart.bind(n, "endX")
      }, n.state = {}, n
    }
    return O3(e, t), b3(e, [{
      key: "componentWillUnmount",
      value: function() {
        this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener()
      }
    }, {
      key: "getIndex",
      value: function(r) {
        var n = r.startX,
          o = r.endX,
          i = this.state.scaleValues,
          a = this.props,
          u = a.gap,
          l = a.data,
          c = l.length - 1,
          s = Math.min(n, o),
          f = Math.max(n, o),
          p = e.getIndexInRange(i, s),
          d = e.getIndexInRange(i, f);
        return {
          startIndex: p - p % u,
          endIndex: d === c ? c : d - d % u
        }
      }
    }, {
      key: "getTextOfTick",
      value: function(r) {
        var n = this.props,
          o = n.data,
          i = n.tickFormatter,
          a = n.dataKey,
          u = ee(o[r], a, r);
        return (0, Rd.default)(i) ? i(u, r) : u
      }
    }, {
      key: "attachDragEndListener",
      value: function() {
        window.addEventListener("mouseup", this.handleDragEnd, !0), window.addEventListener("touchend", this.handleDragEnd, !0), window.addEventListener("mousemove", this.handleDrag, !0)
      }
    }, {
      key: "detachDragEndListener",
      value: function() {
        window.removeEventListener("mouseup", this.handleDragEnd, !0), window.removeEventListener("touchend", this.handleDragEnd, !0), window.removeEventListener("mousemove", this.handleDrag, !0)
      }
    }, {
      key: "handleSlideDrag",
      value: function(r) {
        var n = this.state,
          o = n.slideMoveStartX,
          i = n.startX,
          a = n.endX,
          u = this.props,
          l = u.x,
          c = u.width,
          s = u.travellerWidth,
          f = u.startIndex,
          p = u.endIndex,
          d = u.onChange,
          y = r.pageX - o;
        y > 0 ? y = Math.min(y, l + c - s - a, l + c - s - i) : y < 0 && (y = Math.max(y, l - i, l - a));
        var m = this.getIndex({
          startX: i + y,
          endX: a + y
        });
        (m.startIndex !== f || m.endIndex !== p) && d && d(m), this.setState({
          startX: i + y,
          endX: a + y,
          slideMoveStartX: r.pageX
        })
      }
    }, {
      key: "handleTravellerDragStart",
      value: function(r, n) {
        var o = Xd(n) ? n.changedTouches[0] : n;
        this.setState({
          isSlideMoving: !1,
          isTravellerMoving: !0,
          movingTravellerId: r,
          brushMoveStartX: o.pageX
        }), this.attachDragEndListener()
      }
    }, {
      key: "handleTravellerMove",
      value: function(r) {
        var n = this.state,
          o = n.brushMoveStartX,
          i = n.movingTravellerId,
          a = n.endX,
          u = n.startX,
          l = this.state[i],
          c = this.props,
          s = c.x,
          f = c.width,
          p = c.travellerWidth,
          d = c.onChange,
          y = c.gap,
          m = c.data,
          g = {
            startX: this.state.startX,
            endX: this.state.endX
          },
          h = r.pageX - o;
        h > 0 ? h = Math.min(h, s + f - p - l) : h < 0 && (h = Math.max(h, s - l)), g[i] = l + h;
        var b = this.getIndex(g),
          w = b.startIndex,
          v = b.endIndex,
          E = function() {
            var x = m.length - 1;
            return i === "startX" && (a > u ? w % y === 0 : v % y === 0) || a < u && v === x || i === "endX" && (a > u ? v % y === 0 : w % y === 0) || a > u && v === x
          };
        this.setState(re(re({}, i, l + h), "brushMoveStartX", r.pageX), function() {
          d && E() && d(b)
        })
      }
    }, {
      key: "handleTravellerMoveKeyboard",
      value: function(r, n) {
        var o = this,
          i = this.state,
          a = i.scaleValues,
          u = i.startX,
          l = i.endX,
          c = this.state[n],
          s = a.indexOf(c);
        if (s !== -1) {
          var f = s + r;
          if (!(f === -1 || f >= a.length)) {
            var p = a[f];
            n === "startX" && p >= l || n === "endX" && p <= u || this.setState(re({}, n, p), function() {
              o.props.onChange(o.getIndex({
                startX: o.state.startX,
                endX: o.state.endX
              }))
            })
          }
        }
      }
    }, {
      key: "renderBackground",
      value: function() {
        var r = this.props,
          n = r.x,
          o = r.y,
          i = r.width,
          a = r.height,
          u = r.fill,
          l = r.stroke;
        return qt.createElement("rect", {
          stroke: l,
          fill: u,
          x: n,
          y: o,
          width: i,
          height: a
        })
      }
    }, {
      key: "renderPanorama",
      value: function() {
        var r = this.props,
          n = r.x,
          o = r.y,
          i = r.width,
          a = r.height,
          u = r.data,
          l = r.children,
          c = r.padding,
          s = p3.only(l);
        return s ? qt.cloneElement(s, {
          x: n,
          y: o,
          width: i,
          height: a,
          margin: c,
          compact: !0,
          data: u
        }) : null
      }
    }, {
      key: "renderTravellerLayer",
      value: function(r, n) {
        var o, i, a = this,
          u = this.props,
          l = u.y,
          c = u.travellerWidth,
          s = u.height,
          f = u.traveller,
          p = u.ariaLabel,
          d = u.data,
          y = u.startIndex,
          m = u.endIndex,
          g = Math.max(r, this.props.x),
          h = Kl(Kl({}, Et(this.props, !1)), {}, {
            x: g,
            y: l,
            width: c,
            height: s
          }),
          b = p || "Min value: ".concat((o = d[y]) === null || o === void 0 ? void 0 : o.name, ", Max value: ").concat((i = d[m]) === null || i === void 0 ? void 0 : i.name);
        return qt.createElement(Ct, {
          tabIndex: 0,
          role: "slider",
          "aria-label": b,
          "aria-valuenow": r,
          className: "recharts-brush-traveller",
          onMouseEnter: this.handleEnterSlideOrTraveller,
          onMouseLeave: this.handleLeaveSlideOrTraveller,
          onMouseDown: this.travellerDragStartHandlers[n],
          onTouchStart: this.travellerDragStartHandlers[n],
          onKeyDown: function(w) {
            ["ArrowLeft", "ArrowRight"].includes(w.key) && (w.preventDefault(), w.stopPropagation(), a.handleTravellerMoveKeyboard(w.key === "ArrowRight" ? 1 : -1, n))
          },
          onFocus: function() {
            a.setState({
              isTravellerFocused: !0
            })
          },
          onBlur: function() {
            a.setState({
              isTravellerFocused: !1
            })
          },
          style: {
            cursor: "col-resize"
          }
        }, e.renderTraveller(f, h))
      }
    }, {
      key: "renderSlide",
      value: function(r, n) {
        var o = this.props,
          i = o.y,
          a = o.height,
          u = o.stroke,
          l = o.travellerWidth,
          c = Math.min(r, n) + l,
          s = Math.max(Math.abs(n - r) - l, 0);
        return qt.createElement("rect", {
          className: "recharts-brush-slide",
          onMouseEnter: this.handleEnterSlideOrTraveller,
          onMouseLeave: this.handleLeaveSlideOrTraveller,
          onMouseDown: this.handleSlideDragStart,
          onTouchStart: this.handleSlideDragStart,
          style: {
            cursor: "move"
          },
          stroke: "none",
          fill: u,
          fillOpacity: .2,
          x: c,
          y: i,
          width: s,
          height: a
        })
      }
    }, {
      key: "renderText",
      value: function() {
        var r = this.props,
          n = r.startIndex,
          o = r.endIndex,
          i = r.y,
          a = r.height,
          u = r.travellerWidth,
          l = r.stroke,
          c = this.state,
          s = c.startX,
          f = c.endX,
          p = 5,
          d = {
            pointerEvents: "none",
            fill: l
          };
        return qt.createElement(Ct, {
          className: "recharts-brush-texts"
        }, qt.createElement(ui, ua({
          textAnchor: "end",
          verticalAnchor: "middle",
          x: Math.min(s, f) - p,
          y: i + a / 2
        }, d), this.getTextOfTick(n)), qt.createElement(ui, ua({
          textAnchor: "start",
          verticalAnchor: "middle",
          x: Math.max(s, f) + u + p,
          y: i + a / 2
        }, d), this.getTextOfTick(o)))
      }
    }, {
      key: "render",
      value: function() {
        var r = this.props,
          n = r.data,
          o = r.className,
          i = r.children,
          a = r.x,
          u = r.y,
          l = r.width,
          c = r.height,
          s = r.alwaysShowText,
          f = this.state,
          p = f.startX,
          d = f.endX,
          y = f.isTextActive,
          m = f.isSlideMoving,
          g = f.isTravellerMoving,
          h = f.isTravellerFocused;
        if (!n || !n.length || !tt(a) || !tt(u) || !tt(l) || !tt(c) || l <= 0 || c <= 0) return null;
        var b = wt("recharts-brush", o),
          w = qt.Children.count(i) === 1,
          v = v3("userSelect", "none");
        return qt.createElement(Ct, {
          className: b,
          onMouseLeave: this.handleLeaveWrapper,
          onTouchMove: this.handleTouchMove,
          style: v
        }, this.renderBackground(), w && this.renderPanorama(), this.renderSlide(p, d), this.renderTravellerLayer(p, "startX"), this.renderTravellerLayer(d, "endX"), (y || m || g || h || s) && this.renderText())
      }
    }], [{
      key: "renderDefaultTraveller",
      value: function(r) {
        var n = r.x,
          o = r.y,
          i = r.width,
          a = r.height,
          u = r.stroke,
          l = Math.floor(o + a / 2) - 1;
        return qt.createElement(qt.Fragment, null, qt.createElement("rect", {
          x: n,
          y: o,
          width: i,
          height: a,
          fill: u,
          stroke: "none"
        }), qt.createElement("line", {
          x1: n + 1,
          y1: l,
          x2: n + i - 1,
          y2: l,
          fill: "none",
          stroke: "#fff"
        }), qt.createElement("line", {
          x1: n + 1,
          y1: l + 2,
          x2: n + i - 1,
          y2: l + 2,
          fill: "none",
          stroke: "#fff"
        }))
      }
    }, {
      key: "renderTraveller",
      value: function(r, n) {
        var o;
        return qt.isValidElement(r) ? o = qt.cloneElement(r, n) : (0, Rd.default)(r) ? o = r(n) : o = e.renderDefaultTraveller(n), o
      }
    }, {
      key: "getDerivedStateFromProps",
      value: function(r, n) {
        var o = r.data,
          i = r.width,
          a = r.x,
          u = r.travellerWidth,
          l = r.updateId,
          c = r.startIndex,
          s = r.endIndex;
        if (o !== n.prevData || l !== n.prevUpdateId) return Kl({
          prevData: o,
          prevTravellerWidth: u,
          prevUpdateId: l,
          prevX: a,
          prevWidth: i
        }, o && o.length ? j3({
          data: o,
          width: i,
          x: a,
          travellerWidth: u,
          startIndex: c,
          endIndex: s
        }) : {
          scale: null,
          scaleValues: null
        });
        if (n.scale && (i !== n.prevWidth || a !== n.prevX || u !== n.prevTravellerWidth)) {
          n.scale.range([a, a + i - u]);
          var f = n.scale.domain().map(function(p) {
            return n.scale(p)
          });
          return {
            prevData: o,
            prevTravellerWidth: u,
            prevUpdateId: l,
            prevX: a,
            prevWidth: i,
            startX: n.scale(r.startIndex),
            endX: n.scale(r.endIndex),
            scaleValues: f
          }
        }
        return null
      }
    }, {
      key: "getIndexInRange",
      value: function(r, n) {
        for (var o = r.length, i = 0, a = o - 1; a - i > 1;) {
          var u = Math.floor((i + a) / 2);
          r[u] > n ? a = u : i = u
        }
        return n >= r[a] ? a : i
      }
    }])
  })(f3);
re(Zr, "displayName", "Brush"), re(Zr, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1e3,
  alwaysShowText: !1
});
var A3 = it(Dt()),
  P3 = it(zv());
import Qr from "./react-shim-eraudit.js";
var De = function(t, e) {
    var r = t.alwaysShow,
      n = t.ifOverflow;
    return r && (n = "extendDomain"), n === e
  },
  _3 = it(Wv()),
  k3 = it(ys());
import de, {
  PureComponent as M3
} from "./react-shim-eraudit.js";
var T3 = it(Lo()),
  C3 = it(ve());
import D3 from "./react-shim-eraudit.js";
var I3 = ["x", "y"];

function bo(t) {
  "@babel/helpers - typeof";
  return bo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, bo(t)
}

function Zl() {
  return Zl = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Zl.apply(this, arguments)
}

function Yd(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Eo(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Yd(Object(r), !0).forEach(function(n) {
      N3(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Yd(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function N3(t, e, r) {
  return e = B3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function B3(t) {
  var e = z3(t, "string");
  return bo(e) == "symbol" ? e : e + ""
}

function z3(t, e) {
  if (bo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (bo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function R3(t, e) {
  if (t == null) return {};
  var r = W3(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function W3(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function L3(t, e) {
  var r = t.x,
    n = t.y,
    o = R3(t, I3),
    i = "".concat(r),
    a = parseInt(i, 10),
    u = "".concat(n),
    l = parseInt(u, 10),
    c = "".concat(e.height || o.height),
    s = parseInt(c, 10),
    f = "".concat(e.width || o.width),
    p = parseInt(f, 10);
  return Eo(Eo(Eo(Eo(Eo({}, e), o), a ? {
    x: a
  } : {}), l ? {
    y: l
  } : {}), {}, {
    height: s,
    width: p,
    name: e.name,
    radius: e.radius
  })
}

function Vd(t) {
  return D3.createElement(n3, Zl({
    shapeType: "rectangle",
    propTransformer: L3,
    activeClassName: "recharts-active-bar"
  }, t))
}
var $3 = function(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return function(r, n) {
      if (typeof t == "number") return t;
      var o = tt(r) || ng(r);
      return o ? t(r, n) : (o || mr(!1), e)
    }
  },
  F3 = ["value", "background"],
  Kd;

function Jr(t) {
  "@babel/helpers - typeof";
  return Jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Jr(t)
}

function U3(t, e) {
  if (t == null) return {};
  var r = q3(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function q3(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function ca() {
  return ca = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, ca.apply(this, arguments)
}

function Gd(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Nt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Gd(Object(r), !0).forEach(function(n) {
      er(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Gd(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function H3(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Zd(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Jd(n.key), n)
  }
}

function X3(t, e, r) {
  return e && Zd(t.prototype, e), r && Zd(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function Y3(t, e, r) {
  return e = sa(e), V3(t, Qd() ? Reflect.construct(e, r || [], sa(t).constructor) : e.apply(t, r))
}

function V3(t, e) {
  if (e && (Jr(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return K3(t)
}

function K3(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Qd() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Qd = function() {
    return !!t
  })()
}

function sa(t) {
  return sa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, sa(t)
}

function G3(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Ql(t, e)
}

function Ql(t, e) {
  return Ql = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, Ql(t, e)
}

function er(t, e, r) {
  return e = Jd(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Jd(t) {
  var e = Z3(t, "string");
  return Jr(e) == "symbol" ? e : e + ""
}

function Z3(t, e) {
  if (Jr(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Jr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Er = (function(t) {
  function e() {
    var r;
    H3(this, e);
    for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
    return r = Y3(this, e, [].concat(o)), er(r, "state", {
      isAnimationFinished: !1
    }), er(r, "id", xn("recharts-bar-")), er(r, "handleAnimationEnd", function() {
      var a = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), a && a()
    }), er(r, "handleAnimationStart", function() {
      var a = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), a && a()
    }), r
  }
  return G3(e, t), X3(e, [{
    key: "renderRectanglesStatically",
    value: function(r) {
      var n = this,
        o = this.props,
        i = o.shape,
        a = o.dataKey,
        u = o.activeIndex,
        l = o.activeBar,
        c = Et(this.props, !1);
      return r && r.map(function(s, f) {
        var p = f === u,
          d = p ? l : i,
          y = Nt(Nt(Nt({}, c), s), {}, {
            isActive: p,
            option: d,
            index: f,
            dataKey: a,
            onAnimationStart: n.handleAnimationStart,
            onAnimationEnd: n.handleAnimationEnd
          });
        return de.createElement(Ct, ca({
          className: "recharts-bar-rectangle"
        }, Uo(n.props, s, f), {
          key: "rectangle-".concat(s?.x, "-").concat(s?.y, "-").concat(s?.value, "-").concat(f)
        }), de.createElement(Vd, y))
      })
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var r = this,
        n = this.props,
        o = n.data,
        i = n.layout,
        a = n.isAnimationActive,
        u = n.animationBegin,
        l = n.animationDuration,
        c = n.animationEasing,
        s = n.animationId,
        f = this.state.prevData;
      return de.createElement(Kr, {
        begin: u,
        duration: l,
        isActive: a,
        easing: c,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "bar-".concat(s),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(p) {
        var d = p.t,
          y = o.map(function(m, g) {
            var h = f && f[g];
            if (h) {
              var b = be(h.x, m.x),
                w = be(h.y, m.y),
                v = be(h.width, m.width),
                E = be(h.height, m.height);
              return Nt(Nt({}, m), {}, {
                x: b(d),
                y: w(d),
                width: v(d),
                height: E(d)
              })
            }
            if (i === "horizontal") {
              var x = be(0, m.height),
                A = x(d);
              return Nt(Nt({}, m), {}, {
                y: m.y + m.height - A,
                height: A
              })
            }
            var C = be(0, m.width),
              I = C(d);
            return Nt(Nt({}, m), {}, {
              width: I
            })
          });
        return de.createElement(Ct, null, r.renderRectanglesStatically(y))
      })
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var r = this.props,
        n = r.data,
        o = r.isAnimationActive,
        i = this.state.prevData;
      return o && n && n.length && (!i || !(0, T3.default)(i, n)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(n)
    }
  }, {
    key: "renderBackground",
    value: function() {
      var r = this,
        n = this.props,
        o = n.data,
        i = n.dataKey,
        a = n.activeIndex,
        u = Et(this.props.background, !1);
      return o.map(function(l, c) {
        var s = l.value,
          f = l.background,
          p = U3(l, F3);
        if (!f) return null;
        var d = Nt(Nt(Nt(Nt(Nt({}, p), {}, {
          fill: "#eee"
        }, f), u), Uo(r.props, l, c)), {}, {
          onAnimationStart: r.handleAnimationStart,
          onAnimationEnd: r.handleAnimationEnd,
          dataKey: i,
          index: c,
          className: "recharts-bar-background-rectangle"
        });
        return de.createElement(Vd, ca({
          key: "background-bar-".concat(c),
          option: r.props.background,
          isActive: c === a
        }, d))
      })
    }
  }, {
    key: "renderErrorBar",
    value: function(r, n) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
      var o = this.props,
        i = o.data,
        a = o.xAxis,
        u = o.yAxis,
        l = o.layout,
        c = o.children,
        s = ue(c, Kn);
      if (!s) return null;
      var f = l === "vertical" ? i[0].height / 2 : i[0].width / 2,
        p = function(y, m) {
          var g = Array.isArray(y.value) ? y.value[1] : y.value;
          return {
            x: y.x,
            y: y.y,
            value: g,
            errorVal: ee(y, m)
          }
        },
        d = {
          clipPath: r ? "url(#clipPath-".concat(n, ")") : null
        };
      return de.createElement(Ct, d, s.map(function(y) {
        return de.cloneElement(y, {
          key: "error-bar-".concat(n, "-").concat(y.props.dataKey),
          data: i,
          xAxis: a,
          yAxis: u,
          layout: l,
          offset: f,
          dataPointFormatter: p
        })
      }))
    }
  }, {
    key: "render",
    value: function() {
      var r = this.props,
        n = r.hide,
        o = r.data,
        i = r.className,
        a = r.xAxis,
        u = r.yAxis,
        l = r.left,
        c = r.top,
        s = r.width,
        f = r.height,
        p = r.isAnimationActive,
        d = r.background,
        y = r.id;
      if (n || !o || !o.length) return null;
      var m = this.state.isAnimationFinished,
        g = wt("recharts-bar", i),
        h = a && a.allowDataOverflow,
        b = u && u.allowDataOverflow,
        w = h || b,
        v = (0, C3.default)(y) ? this.id : y;
      return de.createElement(Ct, {
        className: g
      }, h || b ? de.createElement("defs", null, de.createElement("clipPath", {
        id: "clipPath-".concat(v)
      }, de.createElement("rect", {
        x: h ? l : l - s / 2,
        y: b ? c : c - f / 2,
        width: h ? s : s * 2,
        height: b ? f : f * 2
      }))) : null, de.createElement(Ct, {
        className: "recharts-bar-rectangles",
        clipPath: w ? "url(#clipPath-".concat(v, ")") : null
      }, d ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(w, v), (!p || m) && Je.renderCallByParent(this.props, o))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(r, n) {
      return r.animationId !== n.prevAnimationId ? {
        prevAnimationId: r.animationId,
        curData: r.data,
        prevData: n.curData
      } : r.data !== n.curData ? {
        curData: r.data
      } : null
    }
  }])
})(M3);
Kd = Er, er(Er, "displayName", "Bar"), er(Er, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !$e.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
}), er(Er, "getComposedData", function(t) {
  var e = t.props,
    r = t.item,
    n = t.barPosition,
    o = t.bandSize,
    i = t.xAxis,
    a = t.yAxis,
    u = t.xAxisTicks,
    l = t.yAxisTicks,
    c = t.stackedData,
    s = t.dataStartIndex,
    f = t.displayedData,
    p = t.offset,
    d = aO(n, r);
  if (!d) return null;
  var y = e.layout,
    m = r.type.defaultProps,
    g = m !== void 0 ? Nt(Nt({}, m), r.props) : r.props,
    h = g.dataKey,
    b = g.children,
    w = g.minPointSize,
    v = y === "horizontal" ? a : i,
    E = c ? v.scale.domain() : null,
    x = hO({
      numericAxis: v
    }),
    A = ue(b, _f),
    C = f.map(function(I, $) {
      var B, D, z, W, L, X;
      c ? B = uO(c[s + $], E) : (B = ee(I, h), Array.isArray(B) || (B = [x, B]));
      var K = $3(w, Kd.defaultProps.minPointSize)(B[1], $);
      if (y === "horizontal") {
        var O, S = [a.scale(B[0]), a.scale(B[1])],
          _ = S[0],
          j = S[1];
        D = B0({
          axis: i,
          ticks: u,
          bandSize: o,
          offset: d.offset,
          entry: I,
          index: $
        }), z = (O = j ?? _) !== null && O !== void 0 ? O : void 0, W = d.size;
        var k = _ - j;
        if (L = Number.isNaN(k) ? 0 : k, X = {
            x: D,
            y: a.y,
            width: W,
            height: a.height
          }, Math.abs(K) > 0 && Math.abs(L) < Math.abs(K)) {
          var M = ge(L || K) * (Math.abs(K) - Math.abs(L));
          z -= M, L += M
        }
      } else {
        var U = [i.scale(B[0]), i.scale(B[1])],
          H = U[0],
          G = U[1];
        if (D = H, z = B0({
            axis: a,
            ticks: l,
            bandSize: o,
            offset: d.offset,
            entry: I,
            index: $
          }), W = G - H, L = d.size, X = {
            x: i.x,
            y: z,
            width: i.width,
            height: L
          }, Math.abs(K) > 0 && Math.abs(W) < Math.abs(K)) {
          var et = ge(W || K) * (Math.abs(K) - Math.abs(W));
          W += et
        }
      }
      return Nt(Nt(Nt({}, I), {}, {
        x: D,
        y: z,
        width: W,
        height: L,
        value: c ? B : B[1],
        payload: I,
        background: X
      }, A && A[$] && A[$].props), {}, {
        tooltipPayload: [$0(r, I)],
        tooltipPosition: {
          x: D + W / 2,
          y: z + L / 2
        }
      })
    });
  return Nt({
    data: C,
    layout: y
  }, p)
});

function xo(t) {
  "@babel/helpers - typeof";
  return xo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, xo(t)
}

function Q3(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function th(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, rh(n.key), n)
  }
}

function J3(t, e, r) {
  return e && th(t.prototype, e), r && th(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function eh(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Oe(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? eh(Object(r), !0).forEach(function(n) {
      fa(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : eh(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function fa(t, e, r) {
  return e = rh(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function rh(t) {
  var e = tP(t, "string");
  return xo(e) == "symbol" ? e : e + ""
}

function tP(t, e) {
  if (xo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (xo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var nh = function(t, e, r, n, o) {
    var i = t.width,
      a = t.height,
      u = t.layout,
      l = t.children,
      c = Object.keys(e),
      s = {
        left: r.left,
        leftMirror: r.left,
        right: i - r.right,
        rightMirror: i - r.right,
        top: r.top,
        topMirror: r.top,
        bottom: a - r.bottom,
        bottomMirror: a - r.bottom
      },
      f = !!te(l, Er);
    return c.reduce(function(p, d) {
      var y = e[d],
        m = y.orientation,
        g = y.domain,
        h = y.padding,
        b = h === void 0 ? {} : h,
        w = y.mirror,
        v = y.reversed,
        E = "".concat(m).concat(w ? "Mirror" : ""),
        x, A, C, I, $;
      if (y.type === "number" && (y.padding === "gap" || y.padding === "no-gap")) {
        var B = g[1] - g[0],
          D = 1 / 0,
          z = y.categoricalDomain.sort(ag);
        if (z.forEach(function(M, U) {
            U > 0 && (D = Math.min((M || 0) - (z[U - 1] || 0), D))
          }), Number.isFinite(D)) {
          var W = D / B,
            L = y.layout === "vertical" ? r.height : r.width;
          if (y.padding === "gap" && (x = W * L / 2), y.padding === "no-gap") {
            var X = ur(t.barCategoryGap, W * L),
              K = W * L / 2;
            x = K - X - (K - X) / L * X
          }
        }
      }
      n === "xAxis" ? A = [r.left + (b.left || 0) + (x || 0), r.left + r.width - (b.right || 0) - (x || 0)] : n === "yAxis" ? A = u === "horizontal" ? [r.top + r.height - (b.bottom || 0), r.top + (b.top || 0)] : [r.top + (b.top || 0) + (x || 0), r.top + r.height - (b.bottom || 0) - (x || 0)] : A = y.range, v && (A = [A[1], A[0]]);
      var O = oO(y, o, f),
        S = O.scale,
        _ = O.realScaleType;
      S.domain(g).range(A), iO(S);
      var j = dO(S, Oe(Oe({}, y), {}, {
        realScaleType: _
      }));
      n === "xAxis" ? ($ = m === "top" && !w || m === "bottom" && w, C = r.left, I = s[E] - $ * y.height) : n === "yAxis" && ($ = m === "left" && !w || m === "right" && w, C = s[E] - $ * y.width, I = r.top);
      var k = Oe(Oe(Oe({}, y), j), {}, {
        realScaleType: _,
        x: C,
        y: I,
        scale: S,
        width: n === "xAxis" ? r.width : y.width,
        height: n === "yAxis" ? r.height : y.height
      });
      return k.bandSize = Ui(k, j), !y.hide && n === "xAxis" ? s[E] += ($ ? -1 : 1) * k.height : y.hide || (s[E] += ($ ? -1 : 1) * k.width), Oe(Oe({}, p), {}, fa({}, d, k))
    }, {})
  },
  oh = function(t, e) {
    var r = t.x,
      n = t.y,
      o = e.x,
      i = e.y;
    return {
      x: Math.min(r, o),
      y: Math.min(n, i),
      width: Math.abs(o - r),
      height: Math.abs(i - n)
    }
  },
  eP = function(t) {
    var e = t.x1,
      r = t.y1,
      n = t.x2,
      o = t.y2;
    return oh({
      x: e,
      y: r
    }, {
      x: n,
      y: o
    })
  },
  ih = (function() {
    function t(e) {
      Q3(this, t), this.scale = e
    }
    return J3(t, [{
      key: "domain",
      get: function() {
        return this.scale.domain
      }
    }, {
      key: "range",
      get: function() {
        return this.scale.range
      }
    }, {
      key: "rangeMin",
      get: function() {
        return this.range()[0]
      }
    }, {
      key: "rangeMax",
      get: function() {
        return this.range()[1]
      }
    }, {
      key: "bandwidth",
      get: function() {
        return this.scale.bandwidth
      }
    }, {
      key: "apply",
      value: function(e) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          n = r.bandAware,
          o = r.position;
        if (e !== void 0) {
          if (o) switch (o) {
            case "start":
              return this.scale(e);
            case "middle": {
              var i = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(e) + i
            }
            case "end": {
              var a = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(e) + a
            }
            default:
              return this.scale(e)
          }
          if (n) {
            var u = this.bandwidth ? this.bandwidth() / 2 : 0;
            return this.scale(e) + u
          }
          return this.scale(e)
        }
      }
    }, {
      key: "isInRange",
      value: function(e) {
        var r = this.range(),
          n = r[0],
          o = r[r.length - 1];
        return n <= o ? e >= n && e <= o : e >= o && e <= n
      }
    }], [{
      key: "create",
      value: function(e) {
        return new t(e)
      }
    }])
  })();
fa(ih, "EPS", 1e-4);
var Jl = function(t) {
  var e = Object.keys(t).reduce(function(r, n) {
    return Oe(Oe({}, r), {}, fa({}, n, ih.create(t[n])))
  }, {});
  return Oe(Oe({}, e), {}, {
    apply: function(r) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        o = n.bandAware,
        i = n.position;
      return (0, _3.default)(r, function(a, u) {
        return e[u].apply(a, {
          bandAware: o,
          position: i
        })
      })
    },
    isInRange: function(r) {
      return (0, k3.default)(r, function(n, o) {
        return e[o].isInRange(n)
      })
    }
  })
};

function rP(t) {
  return (t % 180 + 180) % 180
}
var nP = function(t) {
  var e = t.width,
    r = t.height,
    n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    o = rP(n),
    i = o * Math.PI / 180,
    a = Math.atan(r / e),
    u = i > a && i < Math.PI - a ? r / Math.sin(i) : e / Math.cos(i);
  return Math.abs(u)
};
import xr, {
  createContext as wr,
  useContext as Xe
} from "./react-shim-eraudit.js";
var oP = it(Hv()),
  iP = it(ys()),
  aP = it(Wc()),
  uP = (0, aP.default)(function(t) {
    return {
      x: t.left,
      y: t.top,
      width: t.width,
      height: t.height
    }
  }, function(t) {
    return ["l", t.left, "t", t.top, "w", t.width, "h", t.height].join("")
  }),
  tc = wr(void 0),
  ec = wr(void 0),
  ah = wr(void 0),
  uh = wr({}),
  lh = wr(void 0),
  ch = wr(0),
  sh = wr(0),
  fh = function(t) {
    var e = t.state,
      r = e.xAxisMap,
      n = e.yAxisMap,
      o = e.offset,
      i = t.clipPathId,
      a = t.children,
      u = t.width,
      l = t.height,
      c = uP(o);
    return xr.createElement(tc.Provider, {
      value: r
    }, xr.createElement(ec.Provider, {
      value: n
    }, xr.createElement(uh.Provider, {
      value: o
    }, xr.createElement(ah.Provider, {
      value: c
    }, xr.createElement(lh.Provider, {
      value: i
    }, xr.createElement(ch.Provider, {
      value: l
    }, xr.createElement(sh.Provider, {
      value: u
    }, a)))))))
  },
  lP = function() {
    return Xe(lh)
  },
  ph = function(t) {
    var e = Xe(tc);
    e == null && mr(!1);
    var r = e[t];
    return r == null && mr(!1), r
  },
  cP = function() {
    var t = Xe(tc);
    return Ke(t)
  },
  sP = function() {
    var t = Xe(ec),
      e = (0, oP.default)(t, function(r) {
        return (0, iP.default)(r.domain, Number.isFinite)
      });
    return e || Ke(t)
  },
  dh = function(t) {
    var e = Xe(ec);
    e == null && mr(!1);
    var r = e[t];
    return r == null && mr(!1), r
  },
  fP = function() {
    var t = Xe(ah);
    return t
  },
  pP = function() {
    return Xe(uh)
  },
  rc = function() {
    return Xe(sh)
  },
  nc = function() {
    return Xe(ch)
  };

function tn(t) {
  "@babel/helpers - typeof";
  return tn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, tn(t)
}

function dP(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function hh(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, gh(n.key), n)
  }
}

function hP(t, e, r) {
  return e && hh(t.prototype, e), r && hh(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function yP(t, e, r) {
  return e = pa(e), mP(t, yh() ? Reflect.construct(e, r || [], pa(t).constructor) : e.apply(t, r))
}

function mP(t, e) {
  if (e && (tn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return vP(t)
}

function vP(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function yh() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (yh = function() {
    return !!t
  })()
}

function pa(t) {
  return pa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, pa(t)
}

function gP(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && oc(t, e)
}

function oc(t, e) {
  return oc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, oc(t, e)
}

function mh(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function vh(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? mh(Object(r), !0).forEach(function(n) {
      ic(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : mh(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ic(t, e, r) {
  return e = gh(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function gh(t) {
  var e = bP(t, "string");
  return tn(e) == "symbol" ? e : e + ""
}

function bP(t, e) {
  if (tn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (tn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function EP(t, e) {
  return SP(t) || OP(t, e) || wP(t, e) || xP()
}

function xP() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function wP(t, e) {
  if (t) {
    if (typeof t == "string") return bh(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return bh(t, e)
  }
}

function bh(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function OP(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function SP(t) {
  if (Array.isArray(t)) return t
}

function ac() {
  return ac = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, ac.apply(this, arguments)
}
var jP = function(t, e) {
    var r;
    return Qr.isValidElement(t) ? r = Qr.cloneElement(t, e) : (0, A3.default)(t) ? r = t(e) : r = Qr.createElement("line", ac({}, e, {
      className: "recharts-reference-line-line"
    })), r
  },
  AP = function(t, e, r, n, o, i, a, u, l) {
    var c = o.x,
      s = o.y,
      f = o.width,
      p = o.height;
    if (r) {
      var d = l.y,
        y = t.y.apply(d, {
          position: i
        });
      if (De(l, "discard") && !t.y.isInRange(y)) return null;
      var m = [{
        x: c + f,
        y
      }, {
        x: c,
        y
      }];
      return u === "left" ? m.reverse() : m
    }
    if (e) {
      var g = l.x,
        h = t.x.apply(g, {
          position: i
        });
      if (De(l, "discard") && !t.x.isInRange(h)) return null;
      var b = [{
        x: h,
        y: s + p
      }, {
        x: h,
        y: s
      }];
      return a === "top" ? b.reverse() : b
    }
    if (n) {
      var w = l.segment,
        v = w.map(function(E) {
          return t.apply(E, {
            position: i
          })
        });
      return De(l, "discard") && (0, P3.default)(v, function(E) {
        return !t.isInRange(E)
      }) ? null : v
    }
    return null
  };

function PP(t) {
  var e = t.x,
    r = t.y,
    n = t.segment,
    o = t.xAxisId,
    i = t.yAxisId,
    a = t.shape,
    u = t.className,
    l = t.alwaysShow,
    c = lP(),
    s = ph(o),
    f = dh(i),
    p = fP();
  if (!c || !p) return null;
  Re(l === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var d = Jl({
      x: s.scale,
      y: f.scale
    }),
    y = Bt(e),
    m = Bt(r),
    g = n && n.length === 2,
    h = AP(d, y, m, g, p, t.position, s.orientation, f.orientation, t);
  if (!h) return null;
  var b = EP(h, 2),
    w = b[0],
    v = w.x,
    E = w.y,
    x = b[1],
    A = x.x,
    C = x.y,
    I = De(t, "hidden") ? "url(#".concat(c, ")") : void 0,
    $ = vh(vh({
      clipPath: I
    }, Et(t, !0)), {}, {
      x1: v,
      y1: E,
      x2: A,
      y2: C
    });
  return Qr.createElement(Ct, {
    className: wt("recharts-reference-line", u)
  }, jP(a, $), Ut.renderCallByParent(t, eP({
    x1: v,
    y1: E,
    x2: A,
    y2: C
  })))
}
var uc = (function(t) {
  function e() {
    return dP(this, e), yP(this, e, arguments)
  }
  return gP(e, t), hP(e, [{
    key: "render",
    value: function() {
      return Qr.createElement(PP, this.props)
    }
  }])
})(Qr.Component);
ic(uc, "displayName", "ReferenceLine"), ic(uc, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle"
});
var _P = it(Dt());
import wo from "./react-shim-eraudit.js";

function lc() {
  return lc = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, lc.apply(this, arguments)
}

function en(t) {
  "@babel/helpers - typeof";
  return en = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, en(t)
}

function Eh(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function xh(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Eh(Object(r), !0).forEach(function(n) {
      ha(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Eh(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function kP(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function wh(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Sh(n.key), n)
  }
}

function MP(t, e, r) {
  return e && wh(t.prototype, e), r && wh(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function TP(t, e, r) {
  return e = da(e), CP(t, Oh() ? Reflect.construct(e, r || [], da(t).constructor) : e.apply(t, r))
}

function CP(t, e) {
  if (e && (en(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return DP(t)
}

function DP(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Oh() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Oh = function() {
    return !!t
  })()
}

function da(t) {
  return da = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, da(t)
}

function IP(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && cc(t, e)
}

function cc(t, e) {
  return cc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, cc(t, e)
}

function ha(t, e, r) {
  return e = Sh(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Sh(t) {
  var e = NP(t, "string");
  return en(e) == "symbol" ? e : e + ""
}

function NP(t, e) {
  if (en(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (en(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var BP = function(t) {
    var e = t.x,
      r = t.y,
      n = t.xAxis,
      o = t.yAxis,
      i = Jl({
        x: n.scale,
        y: o.scale
      }),
      a = i.apply({
        x: e,
        y: r
      }, {
        bandAware: !0
      });
    return De(t, "discard") && !i.isInRange(a) ? null : a
  },
  ya = (function(t) {
    function e() {
      return kP(this, e), TP(this, e, arguments)
    }
    return IP(e, t), MP(e, [{
      key: "render",
      value: function() {
        var r = this.props,
          n = r.x,
          o = r.y,
          i = r.r,
          a = r.alwaysShow,
          u = r.clipPathId,
          l = Bt(n),
          c = Bt(o);
        if (Re(a === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !l || !c) return null;
        var s = BP(this.props);
        if (!s) return null;
        var f = s.x,
          p = s.y,
          d = this.props,
          y = d.shape,
          m = d.className,
          g = De(this.props, "hidden") ? "url(#".concat(u, ")") : void 0,
          h = xh(xh({
            clipPath: g
          }, Et(this.props, !0)), {}, {
            cx: f,
            cy: p
          });
        return wo.createElement(Ct, {
          className: wt("recharts-reference-dot", m)
        }, e.renderDot(y, h), Ut.renderCallByParent(this.props, {
          x: f - i,
          y: p - i,
          width: 2 * i,
          height: 2 * i
        }))
      }
    }])
  })(wo.Component);
ha(ya, "displayName", "ReferenceDot"), ha(ya, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1
}), ha(ya, "renderDot", function(t, e) {
  var r;
  return wo.isValidElement(t) ? r = wo.cloneElement(t, e) : (0, _P.default)(t) ? r = t(e) : r = wo.createElement(Yl, lc({}, e, {
    cx: e.cx,
    cy: e.cy,
    className: "recharts-reference-dot-dot"
  })), r
});
var zP = it(Dt());
import Oo from "./react-shim-eraudit.js";

function sc() {
  return sc = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, sc.apply(this, arguments)
}

function rn(t) {
  "@babel/helpers - typeof";
  return rn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, rn(t)
}

function jh(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ah(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? jh(Object(r), !0).forEach(function(n) {
      va(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : jh(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function RP(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Ph(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, kh(n.key), n)
  }
}

function WP(t, e, r) {
  return e && Ph(t.prototype, e), r && Ph(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function LP(t, e, r) {
  return e = ma(e), $P(t, _h() ? Reflect.construct(e, r || [], ma(t).constructor) : e.apply(t, r))
}

function $P(t, e) {
  if (e && (rn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return FP(t)
}

function FP(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function _h() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (_h = function() {
    return !!t
  })()
}

function ma(t) {
  return ma = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, ma(t)
}

function UP(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && fc(t, e)
}

function fc(t, e) {
  return fc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, fc(t, e)
}

function va(t, e, r) {
  return e = kh(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function kh(t) {
  var e = qP(t, "string");
  return rn(e) == "symbol" ? e : e + ""
}

function qP(t, e) {
  if (rn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (rn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var HP = function(t, e, r, n, o) {
    var i = o.x1,
      a = o.x2,
      u = o.y1,
      l = o.y2,
      c = o.xAxis,
      s = o.yAxis;
    if (!c || !s) return null;
    var f = Jl({
        x: c.scale,
        y: s.scale
      }),
      p = {
        x: t ? f.x.apply(i, {
          position: "start"
        }) : f.x.rangeMin,
        y: r ? f.y.apply(u, {
          position: "start"
        }) : f.y.rangeMin
      },
      d = {
        x: e ? f.x.apply(a, {
          position: "end"
        }) : f.x.rangeMax,
        y: n ? f.y.apply(l, {
          position: "end"
        }) : f.y.rangeMax
      };
    return De(o, "discard") && (!f.isInRange(p) || !f.isInRange(d)) ? null : oh(p, d)
  },
  ga = (function(t) {
    function e() {
      return RP(this, e), LP(this, e, arguments)
    }
    return UP(e, t), WP(e, [{
      key: "render",
      value: function() {
        var r = this.props,
          n = r.x1,
          o = r.x2,
          i = r.y1,
          a = r.y2,
          u = r.className,
          l = r.alwaysShow,
          c = r.clipPathId;
        Re(l === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
        var s = Bt(n),
          f = Bt(o),
          p = Bt(i),
          d = Bt(a),
          y = this.props.shape;
        if (!s && !f && !p && !d && !y) return null;
        var m = HP(s, f, p, d, this.props);
        if (!m && !y) return null;
        var g = De(this.props, "hidden") ? "url(#".concat(c, ")") : void 0;
        return Oo.createElement(Ct, {
          className: wt("recharts-reference-area", u)
        }, e.renderRect(y, Ah(Ah({
          clipPath: g
        }, Et(this.props, !0)), m)), Ut.renderCallByParent(this.props, m))
      }
    }])
  })(Oo.Component);
va(ga, "displayName", "ReferenceArea"), va(ga, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: .5,
  stroke: "none",
  strokeWidth: 1
}), va(ga, "renderRect", function(t, e) {
  var r;
  return Oo.isValidElement(t) ? r = Oo.cloneElement(t, e) : (0, zP.default)(t) ? r = t(e) : r = Oo.createElement(Hl, sc({}, e, {
    className: "recharts-reference-area-rect"
  })), r
});
var pc = it(Dt()),
  Mh = it(_r());
import rr, {
  Component as XP
} from "./react-shim-eraudit.js";
var YP = it(Dt());

function Th(t, e, r) {
  if (e < 1) return [];
  if (e === 1 && r === void 0) return t;
  for (var n = [], o = 0; o < t.length; o += e)
    if (r === void 0 || r(t[o]) === !0) n.push(t[o]);
    else return;
  return n
}

function VP(t, e, r) {
  var n = {
    width: t.width + e.width,
    height: t.height + e.height
  };
  return nP(n, r)
}

function KP(t, e, r) {
  var n = r === "width",
    o = t.x,
    i = t.y,
    a = t.width,
    u = t.height;
  return e === 1 ? {
    start: n ? o : i,
    end: n ? o + a : i + u
  } : {
    start: n ? o + a : i + u,
    end: n ? o : i
  }
}

function ba(t, e, r, n, o) {
  if (t * e < t * n || t * e > t * o) return !1;
  var i = r();
  return t * (e - t * i / 2 - n) >= 0 && t * (e + t * i / 2 - o) <= 0
}

function GP(t, e) {
  return Th(t, e + 1)
}

function ZP(t, e, r, n, o) {
  for (var i = (n || []).slice(), a = e.start, u = e.end, l = 0, c = 1, s = a, f = function() {
      var d = n?.[l];
      if (d === void 0) return {
        v: Th(n, c)
      };
      var y = l,
        m, g = function() {
          return m === void 0 && (m = r(d, y)), m
        },
        h = d.coordinate,
        b = l === 0 || ba(t, h, g, s, u);
      b || (l = 0, s = a, c += 1), b && (s = h + t * (g() / 2 + o), l += c)
    }, p; c <= i.length;)
    if (p = f(), p) return p.v;
  return []
}

function So(t) {
  "@babel/helpers - typeof";
  return So = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, So(t)
}

function Ch(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ht(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ch(Object(r), !0).forEach(function(n) {
      QP(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Ch(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function QP(t, e, r) {
  return e = JP(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function JP(t) {
  var e = t_(t, "string");
  return So(e) == "symbol" ? e : e + ""
}

function t_(t, e) {
  if (So(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (So(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function e_(t, e, r, n, o) {
  for (var i = (n || []).slice(), a = i.length, u = e.start, l = e.end, c = function(f) {
      var p = i[f],
        d, y = function() {
          return d === void 0 && (d = r(p, f)), d
        };
      if (f === a - 1) {
        var m = t * (p.coordinate + t * y() / 2 - l);
        i[f] = p = Ht(Ht({}, p), {}, {
          tickCoord: m > 0 ? p.coordinate - m * t : p.coordinate
        })
      } else i[f] = p = Ht(Ht({}, p), {}, {
        tickCoord: p.coordinate
      });
      var g = ba(t, p.tickCoord, y, u, l);
      g && (l = p.tickCoord - t * (y() / 2 + o), i[f] = Ht(Ht({}, p), {}, {
        isShow: !0
      }))
    }, s = a - 1; s >= 0; s--) c(s);
  return i
}

function r_(t, e, r, n, o, i) {
  var a = (n || []).slice(),
    u = a.length,
    l = e.start,
    c = e.end;
  if (i) {
    var s = n[u - 1],
      f = r(s, u - 1),
      p = t * (s.coordinate + t * f / 2 - c);
    a[u - 1] = s = Ht(Ht({}, s), {}, {
      tickCoord: p > 0 ? s.coordinate - p * t : s.coordinate
    });
    var d = ba(t, s.tickCoord, function() {
      return f
    }, l, c);
    d && (c = s.tickCoord - t * (f / 2 + o), a[u - 1] = Ht(Ht({}, s), {}, {
      isShow: !0
    }))
  }
  for (var y = i ? u - 1 : u, m = function(h) {
      var b = a[h],
        w, v = function() {
          return w === void 0 && (w = r(b, h)), w
        };
      if (h === 0) {
        var E = t * (b.coordinate - t * v() / 2 - l);
        a[h] = b = Ht(Ht({}, b), {}, {
          tickCoord: E < 0 ? b.coordinate - E * t : b.coordinate
        })
      } else a[h] = b = Ht(Ht({}, b), {}, {
        tickCoord: b.coordinate
      });
      var x = ba(t, b.tickCoord, v, l, c);
      x && (l = b.tickCoord + t * (v() / 2 + o), a[h] = Ht(Ht({}, b), {}, {
        isShow: !0
      }))
    }, g = 0; g < y; g++) m(g);
  return a
}

function dc(t, e, r) {
  var n = t.tick,
    o = t.ticks,
    i = t.viewBox,
    a = t.minTickGap,
    u = t.orientation,
    l = t.interval,
    c = t.tickFormatter,
    s = t.unit,
    f = t.angle;
  if (!o || !o.length || !n) return [];
  if (tt(l) || $e.isSsr) return GP(o, typeof l == "number" && tt(l) ? l : 0);
  var p = [],
    d = u === "top" || u === "bottom" ? "width" : "height",
    y = s && d === "width" ? Cn(s, {
      fontSize: e,
      letterSpacing: r
    }) : {
      width: 0,
      height: 0
    },
    m = function(b, w) {
      var v = (0, YP.default)(c) ? c(b.value, w) : b.value;
      return d === "width" ? VP(Cn(v, {
        fontSize: e,
        letterSpacing: r
      }), y, f) : Cn(v, {
        fontSize: e,
        letterSpacing: r
      })[d]
    },
    g = o.length >= 2 ? ge(o[1].coordinate - o[0].coordinate) : 1,
    h = KP(i, g, d);
  return l === "equidistantPreserveStart" ? ZP(g, h, m, o, a) : (l === "preserveStart" || l === "preserveStartEnd" ? p = r_(g, h, m, o, a, l === "preserveStartEnd") : p = e_(g, h, m, o, a), p.filter(function(b) {
    return b.isShow
  }))
}
var n_ = ["viewBox"],
  o_ = ["viewBox"],
  i_ = ["ticks"];

function nn(t) {
  "@babel/helpers - typeof";
  return nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, nn(t)
}

function on() {
  return on = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, on.apply(this, arguments)
}

function Dh(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Wt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Dh(Object(r), !0).forEach(function(n) {
      mc(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Dh(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function hc(t, e) {
  if (t == null) return {};
  var r = a_(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function a_(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function u_(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Ih(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Bh(n.key), n)
  }
}

function l_(t, e, r) {
  return e && Ih(t.prototype, e), r && Ih(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function c_(t, e, r) {
  return e = Ea(e), s_(t, Nh() ? Reflect.construct(e, r || [], Ea(t).constructor) : e.apply(t, r))
}

function s_(t, e) {
  if (e && (nn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return f_(t)
}

function f_(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Nh() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Nh = function() {
    return !!t
  })()
}

function Ea(t) {
  return Ea = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, Ea(t)
}

function p_(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && yc(t, e)
}

function yc(t, e) {
  return yc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, yc(t, e)
}

function mc(t, e, r) {
  return e = Bh(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Bh(t) {
  var e = d_(t, "string");
  return nn(e) == "symbol" ? e : e + ""
}

function d_(t, e) {
  if (nn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (nn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var an = (function(t) {
  function e(r) {
    var n;
    return u_(this, e), n = c_(this, e, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n
  }
  return p_(e, t), l_(e, [{
    key: "shouldComponentUpdate",
    value: function(r, n) {
      var o = r.viewBox,
        i = hc(r, n_),
        a = this.props,
        u = a.viewBox,
        l = hc(a, o_);
      return !Tr(o, u) || !Tr(i, l) || !Tr(n, this.state)
    }
  }, {
    key: "componentDidMount",
    value: function() {
      var r = this.layerReference;
      if (r) {
        var n = r.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
        n && this.setState({
          fontSize: window.getComputedStyle(n).fontSize,
          letterSpacing: window.getComputedStyle(n).letterSpacing
        })
      }
    }
  }, {
    key: "getTickLineCoord",
    value: function(r) {
      var n = this.props,
        o = n.x,
        i = n.y,
        a = n.width,
        u = n.height,
        l = n.orientation,
        c = n.tickSize,
        s = n.mirror,
        f = n.tickMargin,
        p, d, y, m, g, h, b = s ? -1 : 1,
        w = r.tickSize || c,
        v = tt(r.tickCoord) ? r.tickCoord : r.coordinate;
      switch (l) {
        case "top":
          p = d = r.coordinate, m = i + +!s * u, y = m - b * w, h = y - b * f, g = v;
          break;
        case "left":
          y = m = r.coordinate, d = o + +!s * a, p = d - b * w, g = p - b * f, h = v;
          break;
        case "right":
          y = m = r.coordinate, d = o + +s * a, p = d + b * w, g = p + b * f, h = v;
          break;
        default:
          p = d = r.coordinate, m = i + +s * u, y = m + b * w, h = y + b * f, g = v;
          break
      }
      return {
        line: {
          x1: p,
          y1: y,
          x2: d,
          y2: m
        },
        tick: {
          x: g,
          y: h
        }
      }
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var r = this.props,
        n = r.orientation,
        o = r.mirror,
        i;
      switch (n) {
        case "left":
          i = o ? "start" : "end";
          break;
        case "right":
          i = o ? "end" : "start";
          break;
        default:
          i = "middle";
          break
      }
      return i
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function() {
      var r = this.props,
        n = r.orientation,
        o = r.mirror,
        i = "end";
      switch (n) {
        case "left":
        case "right":
          i = "middle";
          break;
        case "top":
          i = o ? "start" : "end";
          break;
        default:
          i = o ? "end" : "start";
          break
      }
      return i
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var r = this.props,
        n = r.x,
        o = r.y,
        i = r.width,
        a = r.height,
        u = r.orientation,
        l = r.mirror,
        c = r.axisLine,
        s = Wt(Wt(Wt({}, Et(this.props, !1)), Et(c, !1)), {}, {
          fill: "none"
        });
      if (u === "top" || u === "bottom") {
        var f = +(u === "top" && !l || u === "bottom" && l);
        s = Wt(Wt({}, s), {}, {
          x1: n,
          y1: o + f * a,
          x2: n + i,
          y2: o + f * a
        })
      } else {
        var p = +(u === "left" && !l || u === "right" && l);
        s = Wt(Wt({}, s), {}, {
          x1: n + p * i,
          y1: o,
          x2: n + p * i,
          y2: o + a
        })
      }
      return rr.createElement("line", on({}, s, {
        className: wt("recharts-cartesian-axis-line", (0, Mh.default)(c, "className"))
      }))
    }
  }, {
    key: "renderTicks",
    value: function(r, n, o) {
      var i = this,
        a = this.props,
        u = a.tickLine,
        l = a.stroke,
        c = a.tick,
        s = a.tickFormatter,
        f = a.unit,
        p = dc(Wt(Wt({}, this.props), {}, {
          ticks: r
        }), n, o),
        d = this.getTickTextAnchor(),
        y = this.getTickVerticalAnchor(),
        m = Et(this.props, !1),
        g = Et(c, !1),
        h = Wt(Wt({}, m), {}, {
          fill: "none"
        }, Et(u, !1)),
        b = p.map(function(w, v) {
          var E = i.getTickLineCoord(w),
            x = E.line,
            A = E.tick,
            C = Wt(Wt(Wt(Wt({
              textAnchor: d,
              verticalAnchor: y
            }, m), {}, {
              stroke: "none",
              fill: l
            }, g), A), {}, {
              index: v,
              payload: w,
              visibleTicksCount: p.length,
              tickFormatter: s
            });
          return rr.createElement(Ct, on({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(w.value, "-").concat(w.coordinate, "-").concat(w.tickCoord)
          }, Uo(i.props, w, v)), u && rr.createElement("line", on({}, h, x, {
            className: wt("recharts-cartesian-axis-tick-line", (0, Mh.default)(u, "className"))
          })), c && e.renderTickItem(c, C, "".concat((0, pc.default)(s) ? s(w.value, v) : w.value).concat(f || "")))
        });
      return rr.createElement("g", {
        className: "recharts-cartesian-axis-ticks"
      }, b)
    }
  }, {
    key: "render",
    value: function() {
      var r = this,
        n = this.props,
        o = n.axisLine,
        i = n.width,
        a = n.height,
        u = n.ticksGenerator,
        l = n.className,
        c = n.hide;
      if (c) return null;
      var s = this.props,
        f = s.ticks,
        p = hc(s, i_),
        d = f;
      return (0, pc.default)(u) && (d = f && f.length > 0 ? u(this.props) : u(p)), i <= 0 || a <= 0 || !d || !d.length ? null : rr.createElement(Ct, {
        className: wt("recharts-cartesian-axis", l),
        ref: function(y) {
          r.layerReference = y
        }
      }, o && this.renderAxisLine(), this.renderTicks(d, this.state.fontSize, this.state.letterSpacing), Ut.renderCallByParent(this.props))
    }
  }], [{
    key: "renderTickItem",
    value: function(r, n, o) {
      var i, a = wt(n.className, "recharts-cartesian-axis-tick-value");
      return rr.isValidElement(r) ? i = rr.cloneElement(r, Wt(Wt({}, n), {}, {
        className: a
      })) : (0, pc.default)(r) ? i = r(Wt(Wt({}, n), {}, {
        className: a
      })) : i = rr.createElement(ui, on({}, n, {
        className: "recharts-cartesian-axis-tick-value"
      }), o), i
    }
  }])
})(XP);
mc(an, "displayName", "CartesianAxis"), mc(an, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  orientation: "bottom",
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd"
});
var vc = it(Dt());
import Xt from "./react-shim-eraudit.js";
var h_ = ["x1", "y1", "x2", "y2", "key"],
  y_ = ["offset"];

function Or(t) {
  "@babel/helpers - typeof";
  return Or = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Or(t)
}

function zh(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Yt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? zh(Object(r), !0).forEach(function(n) {
      m_(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : zh(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function m_(t, e, r) {
  return e = v_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function v_(t) {
  var e = g_(t, "string");
  return Or(e) == "symbol" ? e : e + ""
}

function g_(t, e) {
  if (Or(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Or(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Sr() {
  return Sr = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Sr.apply(this, arguments)
}

function Rh(t, e) {
  if (t == null) return {};
  var r = b_(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function b_(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var E_ = function(t) {
  var e = t.fill;
  if (!e || e === "none") return null;
  var r = t.fillOpacity,
    n = t.x,
    o = t.y,
    i = t.width,
    a = t.height,
    u = t.ry;
  return Xt.createElement("rect", {
    x: n,
    y: o,
    ry: u,
    width: i,
    height: a,
    stroke: "none",
    fill: e,
    fillOpacity: r,
    className: "recharts-cartesian-grid-bg"
  })
};

function Wh(t, e) {
  var r;
  if (Xt.isValidElement(t)) r = Xt.cloneElement(t, e);
  else if ((0, vc.default)(t)) r = t(e);
  else {
    var n = e.x1,
      o = e.y1,
      i = e.x2,
      a = e.y2,
      u = e.key,
      l = Rh(e, h_),
      c = Et(l, !1),
      s = c.offset,
      f = Rh(c, y_);
    r = Xt.createElement("line", Sr({}, f, {
      x1: n,
      y1: o,
      x2: i,
      y2: a,
      fill: "none",
      key: u
    }))
  }
  return r
}

function x_(t) {
  var e = t.x,
    r = t.width,
    n = t.horizontal,
    o = n === void 0 ? !0 : n,
    i = t.horizontalPoints;
  if (!o || !i || !i.length) return null;
  var a = i.map(function(u, l) {
    var c = Yt(Yt({}, t), {}, {
      x1: e,
      y1: u,
      x2: e + r,
      y2: u,
      key: "line-".concat(l),
      index: l
    });
    return Wh(o, c)
  });
  return Xt.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, a)
}

function w_(t) {
  var e = t.y,
    r = t.height,
    n = t.vertical,
    o = n === void 0 ? !0 : n,
    i = t.verticalPoints;
  if (!o || !i || !i.length) return null;
  var a = i.map(function(u, l) {
    var c = Yt(Yt({}, t), {}, {
      x1: u,
      y1: e,
      x2: u,
      y2: e + r,
      key: "line-".concat(l),
      index: l
    });
    return Wh(o, c)
  });
  return Xt.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, a)
}

function O_(t) {
  var e = t.horizontalFill,
    r = t.fillOpacity,
    n = t.x,
    o = t.y,
    i = t.width,
    a = t.height,
    u = t.horizontalPoints,
    l = t.horizontal,
    c = l === void 0 ? !0 : l;
  if (!c || !e || !e.length) return null;
  var s = u.map(function(p) {
    return Math.round(p + o - o)
  }).sort(function(p, d) {
    return p - d
  });
  o !== s[0] && s.unshift(0);
  var f = s.map(function(p, d) {
    var y = !s[d + 1],
      m = y ? o + a - p : s[d + 1] - p;
    if (m <= 0) return null;
    var g = d % e.length;
    return Xt.createElement("rect", {
      key: "react-".concat(d),
      y: p,
      x: n,
      height: m,
      width: i,
      stroke: "none",
      fill: e[g],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    })
  });
  return Xt.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, f)
}

function S_(t) {
  var e = t.vertical,
    r = e === void 0 ? !0 : e,
    n = t.verticalFill,
    o = t.fillOpacity,
    i = t.x,
    a = t.y,
    u = t.width,
    l = t.height,
    c = t.verticalPoints;
  if (!r || !n || !n.length) return null;
  var s = c.map(function(p) {
    return Math.round(p + i - i)
  }).sort(function(p, d) {
    return p - d
  });
  i !== s[0] && s.unshift(0);
  var f = s.map(function(p, d) {
    var y = !s[d + 1],
      m = y ? i + u - p : s[d + 1] - p;
    if (m <= 0) return null;
    var g = d % n.length;
    return Xt.createElement("rect", {
      key: "react-".concat(d),
      x: p,
      y: a,
      width: m,
      height: l,
      stroke: "none",
      fill: n[g],
      fillOpacity: o,
      className: "recharts-cartesian-grid-bg"
    })
  });
  return Xt.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, f)
}
var j_ = function(t, e) {
    var r = t.xAxis,
      n = t.width,
      o = t.height,
      i = t.offset;
    return D0(dc(Yt(Yt(Yt({}, an.defaultProps), r), {}, {
      ticks: He(r, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: o
      }
    })), i.left, i.left + i.width, e)
  },
  A_ = function(t, e) {
    var r = t.yAxis,
      n = t.width,
      o = t.height,
      i = t.offset;
    return D0(dc(Yt(Yt(Yt({}, an.defaultProps), r), {}, {
      ticks: He(r, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: o
      }
    })), i.top, i.top + i.height, e)
  },
  un = {
    horizontal: !0,
    vertical: !0,
    horizontalPoints: [],
    verticalPoints: [],
    stroke: "#ccc",
    fill: "none",
    verticalFill: [],
    horizontalFill: []
  };

function Lh(t) {
  var e, r, n, o, i, a, u = rc(),
    l = nc(),
    c = pP(),
    s = Yt(Yt({}, t), {}, {
      stroke: (e = t.stroke) !== null && e !== void 0 ? e : un.stroke,
      fill: (r = t.fill) !== null && r !== void 0 ? r : un.fill,
      horizontal: (n = t.horizontal) !== null && n !== void 0 ? n : un.horizontal,
      horizontalFill: (o = t.horizontalFill) !== null && o !== void 0 ? o : un.horizontalFill,
      vertical: (i = t.vertical) !== null && i !== void 0 ? i : un.vertical,
      verticalFill: (a = t.verticalFill) !== null && a !== void 0 ? a : un.verticalFill,
      x: tt(t.x) ? t.x : c.left,
      y: tt(t.y) ? t.y : c.top,
      width: tt(t.width) ? t.width : c.width,
      height: tt(t.height) ? t.height : c.height
    }),
    f = s.x,
    p = s.y,
    d = s.width,
    y = s.height,
    m = s.syncWithTicks,
    g = s.horizontalValues,
    h = s.verticalValues,
    b = cP(),
    w = sP();
  if (!tt(d) || d <= 0 || !tt(y) || y <= 0 || !tt(f) || f !== +f || !tt(p) || p !== +p) return null;
  var v = s.verticalCoordinatesGenerator || j_,
    E = s.horizontalCoordinatesGenerator || A_,
    x = s.horizontalPoints,
    A = s.verticalPoints;
  if ((!x || !x.length) && (0, vc.default)(E)) {
    var C = g && g.length,
      I = E({
        yAxis: w ? Yt(Yt({}, w), {}, {
          ticks: C ? g : w.ticks
        }) : void 0,
        width: u,
        height: l,
        offset: c
      }, C ? !0 : m);
    Re(Array.isArray(I), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(Or(I), "]")), Array.isArray(I) && (x = I)
  }
  if ((!A || !A.length) && (0, vc.default)(v)) {
    var $ = h && h.length,
      B = v({
        xAxis: b ? Yt(Yt({}, b), {}, {
          ticks: $ ? h : b.ticks
        }) : void 0,
        width: u,
        height: l,
        offset: c
      }, $ ? !0 : m);
    Re(Array.isArray(B), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(Or(B), "]")), Array.isArray(B) && (A = B)
  }
  return Xt.createElement("g", {
    className: "recharts-cartesian-grid"
  }, Xt.createElement(E_, {
    fill: s.fill,
    fillOpacity: s.fillOpacity,
    x: s.x,
    y: s.y,
    width: s.width,
    height: s.height,
    ry: s.ry
  }), Xt.createElement(x_, Sr({}, s, {
    offset: c,
    horizontalPoints: x,
    xAxis: b,
    yAxis: w
  })), Xt.createElement(w_, Sr({}, s, {
    offset: c,
    verticalPoints: A,
    xAxis: b,
    yAxis: w
  })), Xt.createElement(O_, Sr({}, s, {
    horizontalPoints: x
  })), Xt.createElement(S_, Sr({}, s, {
    verticalPoints: A
  })))
}
Lh.displayName = "CartesianGrid";
import Zt, {
  PureComponent as P_
} from "./react-shim-eraudit.js";
var __ = it(Dt()),
  gc = it(ve()),
  k_ = it(Lo()),
  M_ = ["type", "layout", "connectNulls", "ref"],
  T_ = ["key"];

function ln(t) {
  "@babel/helpers - typeof";
  return ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ln(t)
}

function $h(t, e) {
  if (t == null) return {};
  var r = C_(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function C_(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function jo() {
  return jo = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, jo.apply(this, arguments)
}

function Fh(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ne(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Fh(Object(r), !0).forEach(function(n) {
      Se(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Fh(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function cn(t) {
  return B_(t) || N_(t) || I_(t) || D_()
}

function D_() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function I_(t, e) {
  if (t) {
    if (typeof t == "string") return bc(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return bc(t, e)
  }
}

function N_(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function B_(t) {
  if (Array.isArray(t)) return bc(t)
}

function bc(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function z_(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Uh(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Hh(n.key), n)
  }
}

function R_(t, e, r) {
  return e && Uh(t.prototype, e), r && Uh(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function W_(t, e, r) {
  return e = xa(e), L_(t, qh() ? Reflect.construct(e, r || [], xa(t).constructor) : e.apply(t, r))
}

function L_(t, e) {
  if (e && (ln(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return $_(t)
}

function $_(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function qh() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (qh = function() {
    return !!t
  })()
}

function xa(t) {
  return xa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, xa(t)
}

function F_(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Ec(t, e)
}

function Ec(t, e) {
  return Ec = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, Ec(t, e)
}

function Se(t, e, r) {
  return e = Hh(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Hh(t) {
  var e = U_(t, "string");
  return ln(e) == "symbol" ? e : e + ""
}

function U_(t, e) {
  if (ln(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ln(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var wa = (function(t) {
  function e() {
    var r;
    z_(this, e);
    for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
    return r = W_(this, e, [].concat(o)), Se(r, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), Se(r, "generateSimpleStrokeDasharray", function(a, u) {
      return "".concat(u, "px ").concat(a - u, "px")
    }), Se(r, "getStrokeDasharray", function(a, u, l) {
      var c = l.reduce(function(h, b) {
        return h + b
      });
      if (!c) return r.generateSimpleStrokeDasharray(u, a);
      for (var s = Math.floor(a / c), f = a % c, p = u - a, d = [], y = 0, m = 0; y < l.length; m += l[y], ++y)
        if (m + l[y] > f) {
          d = [].concat(cn(l.slice(0, y)), [f - m]);
          break
        } var g = d.length % 2 === 0 ? [0, p] : [p];
      return [].concat(cn(e.repeat(l, s)), cn(d), g).map(function(h) {
        return "".concat(h, "px")
      }).join(", ")
    }), Se(r, "id", xn("recharts-line-")), Se(r, "pathRef", function(a) {
      r.mainCurve = a
    }), Se(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      }), r.props.onAnimationEnd && r.props.onAnimationEnd()
    }), Se(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      }), r.props.onAnimationStart && r.props.onAnimationStart()
    }), r
  }
  return F_(e, t), R_(e, [{
    key: "componentDidMount",
    value: function() {
      if (this.props.isAnimationActive) {
        var r = this.getTotalLength();
        this.setState({
          totalLength: r
        })
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      if (this.props.isAnimationActive) {
        var r = this.getTotalLength();
        r !== this.state.totalLength && this.setState({
          totalLength: r
        })
      }
    }
  }, {
    key: "getTotalLength",
    value: function() {
      var r = this.mainCurve;
      try {
        return r && r.getTotalLength && r.getTotalLength() || 0
      } catch {
        return 0
      }
    }
  }, {
    key: "renderErrorBar",
    value: function(r, n) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
      var o = this.props,
        i = o.points,
        a = o.xAxis,
        u = o.yAxis,
        l = o.layout,
        c = o.children,
        s = ue(c, Kn);
      if (!s) return null;
      var f = function(d, y) {
          return {
            x: d.x,
            y: d.y,
            value: d.value,
            errorVal: ee(d.payload, y)
          }
        },
        p = {
          clipPath: r ? "url(#clipPath-".concat(n, ")") : null
        };
      return Zt.createElement(Ct, p, s.map(function(d) {
        return Zt.cloneElement(d, {
          key: "bar-".concat(d.props.dataKey),
          data: i,
          xAxis: a,
          yAxis: u,
          layout: l,
          dataPointFormatter: f
        })
      }))
    }
  }, {
    key: "renderDots",
    value: function(r, n, o) {
      var i = this.props.isAnimationActive;
      if (i && !this.state.isAnimationFinished) return null;
      var a = this.props,
        u = a.dot,
        l = a.points,
        c = a.dataKey,
        s = Et(this.props, !1),
        f = Et(u, !0),
        p = l.map(function(y, m) {
          var g = ne(ne(ne({
            key: "dot-".concat(m),
            r: 3
          }, s), f), {}, {
            index: m,
            cx: y.x,
            cy: y.y,
            value: y.value,
            dataKey: c,
            payload: y.payload,
            points: l
          });
          return e.renderDotItem(u, g)
        }),
        d = {
          clipPath: r ? "url(#clipPath-".concat(n ? "" : "dots-").concat(o, ")") : null
        };
      return Zt.createElement(Ct, jo({
        className: "recharts-line-dots",
        key: "dots"
      }, d), p)
    }
  }, {
    key: "renderCurveStatically",
    value: function(r, n, o, i) {
      var a = this.props,
        u = a.type,
        l = a.layout,
        c = a.connectNulls,
        s = a.ref,
        f = $h(a, M_),
        p = ne(ne(ne({}, Et(f, !0)), {}, {
          fill: "none",
          className: "recharts-line-curve",
          clipPath: n ? "url(#clipPath-".concat(o, ")") : null,
          points: r
        }, i), {}, {
          type: u,
          layout: l,
          connectNulls: c
        });
      return Zt.createElement(Cl, jo({}, p, {
        pathRef: this.pathRef
      }))
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function(r, n) {
      var o = this,
        i = this.props,
        a = i.points,
        u = i.strokeDasharray,
        l = i.isAnimationActive,
        c = i.animationBegin,
        s = i.animationDuration,
        f = i.animationEasing,
        p = i.animationId,
        d = i.animateNewValues,
        y = i.width,
        m = i.height,
        g = this.state,
        h = g.prevPoints,
        b = g.totalLength;
      return Zt.createElement(Kr, {
        begin: c,
        duration: s,
        isActive: l,
        easing: f,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(p),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(w) {
        var v = w.t;
        if (h) {
          var E = h.length / a.length,
            x = a.map(function(B, D) {
              var z = Math.floor(D * E);
              if (h[z]) {
                var W = h[z],
                  L = be(W.x, B.x),
                  X = be(W.y, B.y);
                return ne(ne({}, B), {}, {
                  x: L(v),
                  y: X(v)
                })
              }
              if (d) {
                var K = be(y * 2, B.x),
                  O = be(m / 2, B.y);
                return ne(ne({}, B), {}, {
                  x: K(v),
                  y: O(v)
                })
              }
              return ne(ne({}, B), {}, {
                x: B.x,
                y: B.y
              })
            });
          return o.renderCurveStatically(x, r, n)
        }
        var A = be(0, b),
          C = A(v),
          I;
        if (u) {
          var $ = "".concat(u).split(/[,\s]+/gim).map(function(B) {
            return parseFloat(B)
          });
          I = o.getStrokeDasharray(C, b, $)
        } else I = o.generateSimpleStrokeDasharray(b, C);
        return o.renderCurveStatically(a, r, n, {
          strokeDasharray: I
        })
      })
    }
  }, {
    key: "renderCurve",
    value: function(r, n) {
      var o = this.props,
        i = o.points,
        a = o.isAnimationActive,
        u = this.state,
        l = u.prevPoints,
        c = u.totalLength;
      return a && i && i.length && (!l && c > 0 || !(0, k_.default)(l, i)) ? this.renderCurveWithAnimation(r, n) : this.renderCurveStatically(i, r, n)
    }
  }, {
    key: "render",
    value: function() {
      var r, n = this.props,
        o = n.hide,
        i = n.dot,
        a = n.points,
        u = n.className,
        l = n.xAxis,
        c = n.yAxis,
        s = n.top,
        f = n.left,
        p = n.width,
        d = n.height,
        y = n.isAnimationActive,
        m = n.id;
      if (o || !a || !a.length) return null;
      var g = this.state.isAnimationFinished,
        h = a.length === 1,
        b = wt("recharts-line", u),
        w = l && l.allowDataOverflow,
        v = c && c.allowDataOverflow,
        E = w || v,
        x = (0, gc.default)(m) ? this.id : m,
        A = (r = Et(i, !1)) !== null && r !== void 0 ? r : {
          r: 3,
          strokeWidth: 2
        },
        C = A.r,
        I = C === void 0 ? 3 : C,
        $ = A.strokeWidth,
        B = $ === void 0 ? 2 : $,
        D = vg(i) ? i : {},
        z = D.clipDot,
        W = z === void 0 ? !0 : z,
        L = I * 2 + B;
      return Zt.createElement(Ct, {
        className: b
      }, w || v ? Zt.createElement("defs", null, Zt.createElement("clipPath", {
        id: "clipPath-".concat(x)
      }, Zt.createElement("rect", {
        x: w ? f : f - p / 2,
        y: v ? s : s - d / 2,
        width: w ? p : p * 2,
        height: v ? d : d * 2
      })), !W && Zt.createElement("clipPath", {
        id: "clipPath-dots-".concat(x)
      }, Zt.createElement("rect", {
        x: f - L / 2,
        y: s - L / 2,
        width: p + L,
        height: d + L
      }))) : null, !h && this.renderCurve(E, x), this.renderErrorBar(E, x), (h || i) && this.renderDots(E, W, x), (!y || g) && Je.renderCallByParent(this.props, a))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(r, n) {
      return r.animationId !== n.prevAnimationId ? {
        prevAnimationId: r.animationId,
        curPoints: r.points,
        prevPoints: n.curPoints
      } : r.points !== n.curPoints ? {
        curPoints: r.points
      } : null
    }
  }, {
    key: "repeat",
    value: function(r, n) {
      for (var o = r.length % 2 !== 0 ? [].concat(cn(r), [0]) : r, i = [], a = 0; a < n; ++a) i = [].concat(cn(i), cn(o));
      return i
    }
  }, {
    key: "renderDotItem",
    value: function(r, n) {
      var o;
      if (Zt.isValidElement(r)) o = Zt.cloneElement(r, n);
      else if ((0, __.default)(r)) o = r(n);
      else {
        var i = n.key,
          a = $h(n, T_),
          u = wt("recharts-line-dot", typeof r != "boolean" ? r.className : "");
        o = Zt.createElement(Yl, jo({
          key: i
        }, a, {
          className: u
        }))
      }
      return o
    }
  }])
})(P_);
Se(wa, "displayName", "Line"), Se(wa, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: !1,
  activeDot: !0,
  dot: !0,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  fill: "#fff",
  points: [],
  isAnimationActive: !$e.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
}), Se(wa, "getComposedData", function(t) {
  var e = t.props,
    r = t.xAxis,
    n = t.yAxis,
    o = t.xAxisTicks,
    i = t.yAxisTicks,
    a = t.dataKey,
    u = t.bandSize,
    l = t.displayedData,
    c = t.offset,
    s = e.layout,
    f = l.map(function(p, d) {
      var y = ee(p, a);
      return s === "horizontal" ? {
        x: N0({
          axis: r,
          ticks: o,
          bandSize: u,
          entry: p,
          index: d
        }),
        y: (0, gc.default)(y) ? null : n.scale(y),
        value: y,
        payload: p
      } : {
        x: (0, gc.default)(y) ? null : r.scale(y),
        y: N0({
          axis: n,
          ticks: i,
          bandSize: u,
          entry: p,
          index: d
        }),
        value: y,
        payload: p
      }
    });
  return ne({
    points: f,
    layout: s
  }, c)
});
import * as xc from "./react-shim-eraudit.js";

function sn(t) {
  "@babel/helpers - typeof";
  return sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, sn(t)
}

function q_(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Xh(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Kh(n.key), n)
  }
}

function H_(t, e, r) {
  return e && Xh(t.prototype, e), r && Xh(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function X_(t, e, r) {
  return e = Oa(e), Y_(t, Yh() ? Reflect.construct(e, r || [], Oa(t).constructor) : e.apply(t, r))
}

function Y_(t, e) {
  if (e && (sn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return V_(t)
}

function V_(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Yh() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Yh = function() {
    return !!t
  })()
}

function Oa(t) {
  return Oa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, Oa(t)
}

function K_(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && wc(t, e)
}

function wc(t, e) {
  return wc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, wc(t, e)
}

function Vh(t, e, r) {
  return e = Kh(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Kh(t) {
  var e = G_(t, "string");
  return sn(e) == "symbol" ? e : e + ""
}

function G_(t, e) {
  if (sn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (sn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Oc() {
  return Oc = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Oc.apply(this, arguments)
}

function Z_(t) {
  var e = t.xAxisId,
    r = rc(),
    n = nc(),
    o = ph(e);
  return o == null ? null : xc.createElement(an, Oc({}, o, {
    className: wt("recharts-".concat(o.axisType, " ").concat(o.axisType), o.className),
    viewBox: {
      x: 0,
      y: 0,
      width: r,
      height: n
    },
    ticksGenerator: function(i) {
      return He(i, !0)
    }
  }))
}
var Ao = (function(t) {
  function e() {
    return q_(this, e), X_(this, e, arguments)
  }
  return K_(e, t), H_(e, [{
    key: "render",
    value: function() {
      return xc.createElement(Z_, this.props)
    }
  }])
})(xc.Component);
Vh(Ao, "displayName", "XAxis"), Vh(Ao, "defaultProps", {
  allowDecimals: !0,
  hide: !1,
  orientation: "bottom",
  width: 0,
  height: 30,
  mirror: !1,
  xAxisId: 0,
  tickCount: 5,
  type: "category",
  padding: {
    left: 0,
    right: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
  allowDuplicatedCategory: !0
});
import * as Sc from "./react-shim-eraudit.js";

function fn(t) {
  "@babel/helpers - typeof";
  return fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, fn(t)
}

function Q_(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Gh(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Jh(n.key), n)
  }
}

function J_(t, e, r) {
  return e && Gh(t.prototype, e), r && Gh(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function tk(t, e, r) {
  return e = Sa(e), ek(t, Zh() ? Reflect.construct(e, r || [], Sa(t).constructor) : e.apply(t, r))
}

function ek(t, e) {
  if (e && (fn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return rk(t)
}

function rk(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Zh() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Zh = function() {
    return !!t
  })()
}

function Sa(t) {
  return Sa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, Sa(t)
}

function nk(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && jc(t, e)
}

function jc(t, e) {
  return jc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, jc(t, e)
}

function Qh(t, e, r) {
  return e = Jh(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Jh(t) {
  var e = ok(t, "string");
  return fn(e) == "symbol" ? e : e + ""
}

function ok(t, e) {
  if (fn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (fn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Ac() {
  return Ac = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ac.apply(this, arguments)
}
var ik = function(t) {
    var e = t.yAxisId,
      r = rc(),
      n = nc(),
      o = dh(e);
    return o == null ? null : Sc.createElement(an, Ac({}, o, {
      className: wt("recharts-".concat(o.axisType, " ").concat(o.axisType), o.className),
      viewBox: {
        x: 0,
        y: 0,
        width: r,
        height: n
      },
      ticksGenerator: function(i) {
        return He(i, !0)
      }
    }))
  },
  Po = (function(t) {
    function e() {
      return Q_(this, e), tk(this, e, arguments)
    }
    return nk(e, t), J_(e, [{
      key: "render",
      value: function() {
        return Sc.createElement(ik, this.props)
      }
    }])
  })(Sc.Component);
Qh(Po, "displayName", "YAxis"), Qh(Po, "defaultProps", {
  allowDuplicatedCategory: !0,
  allowDecimals: !0,
  hide: !1,
  orientation: "left",
  width: 60,
  height: 0,
  mirror: !1,
  yAxisId: 0,
  tickCount: 5,
  type: "number",
  padding: {
    top: 0,
    bottom: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1
});
var _o = it(ve()),
  Ie = it(Dt()),
  Pc = it(hs()),
  ko = it(_r()),
  ak = it(Ka()),
  uk = it(ss());
import he, {
  Component as lk,
  cloneElement as je,
  isValidElement as ck,
  forwardRef as sk
} from "./react-shim-eraudit.js";

function ty(t) {
  return hk(t) || dk(t) || pk(t) || fk()
}

function fk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function pk(t, e) {
  if (t) {
    if (typeof t == "string") return _c(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return _c(t, e)
  }
}

function dk(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function hk(t) {
  if (Array.isArray(t)) return _c(t)
}

function _c(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var kc = function(t, e, r, n, o) {
    var i = ue(t, uc),
      a = ue(t, ya),
      u = [].concat(ty(i), ty(a)),
      l = ue(t, ga),
      c = "".concat(n, "Id"),
      s = n[0],
      f = e;
    if (u.length && (f = u.reduce(function(y, m) {
        if (m.props[c] === r && De(m.props, "extendDomain") && tt(m.props[s])) {
          var g = m.props[s];
          return [Math.min(y[0], g), Math.max(y[1], g)]
        }
        return y
      }, f)), l.length) {
      var p = "".concat(s, "1"),
        d = "".concat(s, "2");
      f = l.reduce(function(y, m) {
        if (m.props[c] === r && De(m.props, "extendDomain") && tt(m.props[p]) && tt(m.props[d])) {
          var g = m.props[p],
            h = m.props[d];
          return [Math.min(y[0], g, h), Math.max(y[1], g, h)]
        }
        return y
      }, f)
    }
    return o && o.length && (f = o.reduce(function(y, m) {
      return tt(m) ? [Math.min(y[0], m), Math.max(y[1], m)] : y
    }, f)), f
  },
  yk = it(Xv()),
  Mc = new yk.default,
  Tc = "recharts.syncMouseEvents";

function Mo(t) {
  "@babel/helpers - typeof";
  return Mo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Mo(t)
}

function mk(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function ey(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, ry(n.key), n)
  }
}

function vk(t, e, r) {
  return e && ey(t.prototype, e), r && ey(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function Cc(t, e, r) {
  return e = ry(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function ry(t) {
  var e = gk(t, "string");
  return Mo(e) == "symbol" ? e : e + ""
}

function gk(t, e) {
  if (Mo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Mo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var bk = (function() {
  function t() {
    mk(this, t), Cc(this, "activeIndex", 0), Cc(this, "coordinateList", []), Cc(this, "layout", "horizontal")
  }
  return vk(t, [{
    key: "setDetails",
    value: function(e) {
      var r, n = e.coordinateList,
        o = n === void 0 ? null : n,
        i = e.container,
        a = i === void 0 ? null : i,
        u = e.layout,
        l = u === void 0 ? null : u,
        c = e.offset,
        s = c === void 0 ? null : c,
        f = e.mouseHandlerCallback,
        p = f === void 0 ? null : f;
      this.coordinateList = (r = o ?? this.coordinateList) !== null && r !== void 0 ? r : [], this.container = a ?? this.container, this.layout = l ?? this.layout, this.offset = s ?? this.offset, this.mouseHandlerCallback = p ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1)
    }
  }, {
    key: "focus",
    value: function() {
      this.spoofMouse()
    }
  }, {
    key: "keyboardEvent",
    value: function(e) {
      if (this.coordinateList.length !== 0) switch (e.key) {
        case "ArrowRight": {
          if (this.layout !== "horizontal") return;
          this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1), this.spoofMouse();
          break
        }
        case "ArrowLeft": {
          if (this.layout !== "horizontal") return;
          this.activeIndex = Math.max(this.activeIndex - 1, 0), this.spoofMouse();
          break
        }
        default:
          break
      }
    }
  }, {
    key: "setIndex",
    value: function(e) {
      this.activeIndex = e
    }
  }, {
    key: "spoofMouse",
    value: function() {
      var e, r;
      if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
        var n = this.container.getBoundingClientRect(),
          o = n.x,
          i = n.y,
          a = n.height,
          u = this.coordinateList[this.activeIndex].coordinate,
          l = ((e = window) === null || e === void 0 ? void 0 : e.scrollX) || 0,
          c = ((r = window) === null || r === void 0 ? void 0 : r.scrollY) || 0,
          s = o + u + l,
          f = i + this.offset.top + a / 2 + c;
        this.mouseHandlerCallback({
          pageX: s,
          pageY: f
        })
      }
    }
  }])
})();

function Ek(t, e, r) {
  if (r === "number" && e === !0 && Array.isArray(t)) {
    var n = t?.[0],
      o = t?.[1];
    if (n && o && tt(n) && tt(o)) return !0
  }
  return !1
}
import {
  cloneElement as xk,
  createElement as wk,
  isValidElement as Ok
} from "./react-shim-eraudit.js";

function Sk(t, e, r, n) {
  var o = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: t === "horizontal" ? e.x - o : r.left + .5,
    y: t === "horizontal" ? r.top + .5 : e.y - o,
    width: t === "horizontal" ? n : r.width - 1,
    height: t === "horizontal" ? r.height - 1 : n
  }
}

function ny(t) {
  var e = t.cx,
    r = t.cy,
    n = t.radius,
    o = t.startAngle,
    i = t.endAngle,
    a = $t(e, r, n, o),
    u = $t(e, r, n, i);
  return {
    points: [a, u],
    cx: e,
    cy: r,
    radius: n,
    startAngle: o,
    endAngle: i
  }
}

function jk(t, e, r) {
  var n, o, i, a;
  if (t === "horizontal") n = e.x, i = n, o = r.top, a = r.top + r.height;
  else if (t === "vertical") o = e.y, a = o, n = r.left, i = r.left + r.width;
  else if (e.cx != null && e.cy != null)
    if (t === "centric") {
      var u = e.cx,
        l = e.cy,
        c = e.innerRadius,
        s = e.outerRadius,
        f = e.angle,
        p = $t(u, l, c, f),
        d = $t(u, l, s, f);
      n = p.x, o = p.y, i = d.x, a = d.y
    } else return ny(e);
  return [{
    x: n,
    y: o
  }, {
    x: i,
    y: a
  }]
}

function To(t) {
  "@babel/helpers - typeof";
  return To = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, To(t)
}

function oy(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ja(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? oy(Object(r), !0).forEach(function(n) {
      Ak(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : oy(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Ak(t, e, r) {
  return e = Pk(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Pk(t) {
  var e = _k(t, "string");
  return To(e) == "symbol" ? e : e + ""
}

function _k(t, e) {
  if (To(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (To(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function kk(t) {
  var e, r, n = t.element,
    o = t.tooltipEventType,
    i = t.isActive,
    a = t.activeCoordinate,
    u = t.activePayload,
    l = t.offset,
    c = t.activeTooltipIndex,
    s = t.tooltipAxisBandSize,
    f = t.layout,
    p = t.chartName,
    d = (e = n.props.cursor) !== null && e !== void 0 ? e : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !d || !i || !a || p !== "ScatterChart" && o !== "axis") return null;
  var y, m = Cl;
  if (p === "ScatterChart") y = a, m = kA;
  else if (p === "BarChart") y = Sk(f, a, l, s), m = Hl;
  else if (f === "radial") {
    var g = ny(a),
      h = g.cx,
      b = g.cy,
      w = g.radius,
      v = g.startAngle,
      E = g.endAngle;
    y = {
      cx: h,
      cy: b,
      startAngle: v,
      endAngle: E,
      innerRadius: w,
      outerRadius: w
    }, m = J0
  } else y = {
    points: jk(f, a, l)
  }, m = Cl;
  var x = ja(ja(ja(ja({
    stroke: "#ccc",
    pointerEvents: "none"
  }, l), y), Et(d, !1)), {}, {
    payload: u,
    payloadIndex: c,
    className: wt("recharts-tooltip-cursor", d.className)
  });
  return Ok(d) ? xk(d, x) : wk(m, x)
}
var Mk = ["item"],
  Tk = ["children", "className", "width", "height", "style", "compact", "title", "desc"];

function pn(t) {
  "@babel/helpers - typeof";
  return pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, pn(t)
}

function dn() {
  return dn = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, dn.apply(this, arguments)
}

function iy(t, e) {
  return Ik(t) || Dk(t, e) || cy(t, e) || Ck()
}

function Ck() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Dk(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, o, i, a, u = [],
      l = !0,
      c = !1;
    try {
      if (i = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        l = !1
      } else
        for (; !(l = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); l = !0);
    } catch (s) {
      c = !0, o = s
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (c) throw o
      }
    }
    return u
  }
}

function Ik(t) {
  if (Array.isArray(t)) return t
}

function ay(t, e) {
  if (t == null) return {};
  var r = Nk(t, e),
    n, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function Nk(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Bk(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function uy(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, fy(n.key), n)
  }
}

function zk(t, e, r) {
  return e && uy(t.prototype, e), r && uy(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function Rk(t, e, r) {
  return e = Aa(e), Wk(t, ly() ? Reflect.construct(e, r || [], Aa(t).constructor) : e.apply(t, r))
}

function Wk(t, e) {
  if (e && (pn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Lk(t)
}

function Lk(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function ly() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (ly = function() {
    return !!t
  })()
}

function Aa(t) {
  return Aa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e)
  }, Aa(t)
}

function $k(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Dc(t, e)
}

function Dc(t, e) {
  return Dc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r
  }, Dc(t, e)
}

function hn(t) {
  return qk(t) || Uk(t) || cy(t) || Fk()
}

function Fk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function cy(t, e) {
  if (t) {
    if (typeof t == "string") return Ic(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ic(t, e)
  }
}

function Uk(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function qk(t) {
  if (Array.isArray(t)) return Ic(t)
}

function Ic(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function sy(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function q(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? sy(Object(r), !0).forEach(function(n) {
      ht(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : sy(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ht(t, e, r) {
  return e = fy(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function fy(t) {
  var e = Hk(t, "string");
  return pn(e) == "symbol" ? e : e + ""
}

function Hk(t, e) {
  if (pn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (pn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Xk = {
    xAxis: ["bottom", "top"],
    yAxis: ["left", "right"]
  },
  Yk = {
    width: "100%",
    height: "100%"
  },
  py = {
    x: 0,
    y: 0
  };

function Pa(t) {
  return t
}
var Vk = function(t, e) {
    return e === "horizontal" ? t.x : e === "vertical" ? t.y : e === "centric" ? t.angle : t.radius
  },
  Kk = function(t, e, r, n) {
    var o = e.find(function(c) {
      return c && c.index === r
    });
    if (o) {
      if (t === "horizontal") return {
        x: o.coordinate,
        y: n.y
      };
      if (t === "vertical") return {
        x: n.x,
        y: o.coordinate
      };
      if (t === "centric") {
        var i = o.coordinate,
          a = n.radius;
        return q(q(q({}, n), $t(n.cx, n.cy, a, i)), {}, {
          angle: i,
          radius: a
        })
      }
      var u = o.coordinate,
        l = n.angle;
      return q(q(q({}, n), $t(n.cx, n.cy, u, l)), {}, {
        angle: l,
        radius: u
      })
    }
    return py
  },
  _a = function(t, e) {
    var r = e.graphicalItems,
      n = e.dataStartIndex,
      o = e.dataEndIndex,
      i = (r ?? []).reduce(function(a, u) {
        var l = u.props.data;
        return l && l.length ? [].concat(hn(a), hn(l)) : a
      }, []);
    return i.length > 0 ? i : t && t.length && tt(n) && tt(o) ? t.slice(n, o + 1) : []
  };

function dy(t) {
  return t === "number" ? [0, "auto"] : void 0
}
var Nc = function(t, e, r, n) {
    var o = t.graphicalItems,
      i = t.tooltipAxis,
      a = _a(e, t);
    return r < 0 || !o || !o.length || r >= a.length ? null : o.reduce(function(u, l) {
      var c, s = (c = l.props.data) !== null && c !== void 0 ? c : e;
      s && t.dataStartIndex + t.dataEndIndex !== 0 && t.dataEndIndex - t.dataStartIndex >= r && (s = s.slice(t.dataStartIndex, t.dataEndIndex + 1));
      var f;
      if (i.dataKey && !i.allowDuplicatedCategory) {
        var p = s === void 0 ? a : s;
        f = $o(p, i.dataKey, n)
      } else f = s && s[r] || a[r];
      return f ? [].concat(hn(u), [$0(l, f)]) : u
    }, [])
  },
  hy = function(t, e, r, n) {
    var o = n || {
        x: t.chartX,
        y: t.chartY
      },
      i = Vk(o, r),
      a = t.orderedTooltipTicks,
      u = t.tooltipAxis,
      l = t.tooltipTicks,
      c = Q2(i, a, l, u);
    if (c >= 0 && l) {
      var s = l[c] && l[c].value,
        f = Nc(t, e, c, s),
        p = Kk(r, a, c, o);
      return {
        activeTooltipIndex: c,
        activeLabel: s,
        activePayload: f,
        activeCoordinate: p
      }
    }
    return null
  },
  Gk = function(t, e) {
    var r = e.axes,
      n = e.graphicalItems,
      o = e.axisType,
      i = e.axisIdKey,
      a = e.stackGroups,
      u = e.dataStartIndex,
      l = e.dataEndIndex,
      c = t.layout,
      s = t.children,
      f = t.stackOffset,
      p = C0(c, o);
    return r.reduce(function(d, y) {
      var m, g = y.type.defaultProps !== void 0 ? q(q({}, y.type.defaultProps), y.props) : y.props,
        h = g.type,
        b = g.dataKey,
        w = g.allowDataOverflow,
        v = g.allowDuplicatedCategory,
        E = g.scale,
        x = g.ticks,
        A = g.includeHidden,
        C = g[i];
      if (d[C]) return d;
      var I = _a(t.data, {
          graphicalItems: n.filter(function(j) {
            var k, M = i in j.props ? j.props[i] : (k = j.type.defaultProps) === null || k === void 0 ? void 0 : k[i];
            return M === C
          }),
          dataStartIndex: u,
          dataEndIndex: l
        }),
        $ = I.length,
        B, D, z;
      Ek(g.domain, w, h) && (B = Al(g.domain, null, w), p && (h === "number" || E !== "auto") && (z = $i(I, b, "category")));
      var W = dy(h);
      if (!B || B.length === 0) {
        var L, X = (L = g.domain) !== null && L !== void 0 ? L : W;
        if (b) {
          if (B = $i(I, b, h), h === "category" && p) {
            var K = ig(B);
            v && K ? (D = B, B = (0, Pc.default)(0, $)) : v || (B = L0(X, B, y).reduce(function(j, k) {
              return j.indexOf(k) >= 0 ? j : [].concat(hn(j), [k])
            }, []))
          } else if (h === "category") v ? B = B.filter(function(j) {
            return j !== "" && !(0, _o.default)(j)
          }) : B = L0(X, B, y).reduce(function(j, k) {
            return j.indexOf(k) >= 0 || k === "" || (0, _o.default)(k) ? j : [].concat(hn(j), [k])
          }, []);
          else if (h === "number") {
            var O = nO(I, n.filter(function(j) {
              var k, M, U = i in j.props ? j.props[i] : (k = j.type.defaultProps) === null || k === void 0 ? void 0 : k[i],
                H = "hide" in j.props ? j.props.hide : (M = j.type.defaultProps) === null || M === void 0 ? void 0 : M.hide;
              return U === C && (A || !H)
            }), b, o, c);
            O && (B = O)
          }
          p && (h === "number" || E !== "auto") && (z = $i(I, b, "category"))
        } else p ? B = (0, Pc.default)(0, $) : a && a[C] && a[C].hasStack && h === "number" ? B = f === "expand" ? [0, 1] : z0(a[C].stackGroups, u, l) : B = T0(I, n.filter(function(j) {
          var k = i in j.props ? j.props[i] : j.type.defaultProps[i],
            M = "hide" in j.props ? j.props.hide : j.type.defaultProps.hide;
          return k === C && (A || !M)
        }), h, c, !0);
        if (h === "number") B = kc(s, B, C, o, x), X && (B = Al(X, B, w));
        else if (h === "category" && X) {
          var S = X,
            _ = B.every(function(j) {
              return S.indexOf(j) >= 0
            });
          _ && (B = S)
        }
      }
      return q(q({}, d), {}, ht({}, C, q(q({}, g), {}, {
        axisType: o,
        domain: B,
        categoricalDomain: z,
        duplicateDomain: D,
        originalDomain: (m = g.domain) !== null && m !== void 0 ? m : W,
        isCategorical: p,
        layout: c
      })))
    }, {})
  },
  Zk = function(t, e) {
    var r = e.graphicalItems,
      n = e.Axis,
      o = e.axisType,
      i = e.axisIdKey,
      a = e.stackGroups,
      u = e.dataStartIndex,
      l = e.dataEndIndex,
      c = t.layout,
      s = t.children,
      f = _a(t.data, {
        graphicalItems: r,
        dataStartIndex: u,
        dataEndIndex: l
      }),
      p = f.length,
      d = C0(c, o),
      y = -1;
    return r.reduce(function(m, g) {
      var h = g.type.defaultProps !== void 0 ? q(q({}, g.type.defaultProps), g.props) : g.props,
        b = h[i],
        w = dy("number");
      if (!m[b]) {
        y++;
        var v;
        return d ? v = (0, Pc.default)(0, p) : a && a[b] && a[b].hasStack ? (v = z0(a[b].stackGroups, u, l), v = kc(s, v, b, o)) : (v = Al(w, T0(f, r.filter(function(E) {
          var x, A, C = i in E.props ? E.props[i] : (x = E.type.defaultProps) === null || x === void 0 ? void 0 : x[i],
            I = "hide" in E.props ? E.props.hide : (A = E.type.defaultProps) === null || A === void 0 ? void 0 : A.hide;
          return C === b && !I
        }), "number", c), n.defaultProps.allowDataOverflow), v = kc(s, v, b, o)), q(q({}, m), {}, ht({}, b, q(q({
          axisType: o
        }, n.defaultProps), {}, {
          hide: !0,
          orientation: (0, ko.default)(Xk, "".concat(o, ".").concat(y % 2), null),
          domain: v,
          originalDomain: w,
          isCategorical: d,
          layout: c
        })))
      }
      return m
    }, {})
  },
  Qk = function(t, e) {
    var r = e.axisType,
      n = r === void 0 ? "xAxis" : r,
      o = e.AxisComp,
      i = e.graphicalItems,
      a = e.stackGroups,
      u = e.dataStartIndex,
      l = e.dataEndIndex,
      c = t.children,
      s = "".concat(n, "Id"),
      f = ue(c, o),
      p = {};
    return f && f.length ? p = Gk(t, {
      axes: f,
      graphicalItems: i,
      axisType: n,
      axisIdKey: s,
      stackGroups: a,
      dataStartIndex: u,
      dataEndIndex: l
    }) : i && i.length && (p = Zk(t, {
      Axis: o,
      graphicalItems: i,
      axisType: n,
      axisIdKey: s,
      stackGroups: a,
      dataStartIndex: u,
      dataEndIndex: l
    })), p
  },
  Jk = function(t) {
    var e = Ke(t),
      r = He(e, !1, !0);
    return {
      tooltipTicks: r,
      orderedTooltipTicks: (0, ak.default)(r, function(n) {
        return n.coordinate
      }),
      tooltipAxis: e,
      tooltipAxisBandSize: Ui(e, r)
    }
  },
  yy = function(t) {
    var e = t.children,
      r = t.defaultShowTooltip,
      n = te(e, Zr),
      o = 0,
      i = 0;
    return t.data && t.data.length !== 0 && (i = t.data.length - 1), n && n.props && (n.props.startIndex >= 0 && (o = n.props.startIndex), n.props.endIndex >= 0 && (i = n.props.endIndex)), {
      chartX: 0,
      chartY: 0,
      dataStartIndex: o,
      dataEndIndex: i,
      activeTooltipIndex: -1,
      isTooltipActive: !!r
    }
  },
  t4 = function(t) {
    return !t || !t.length ? !1 : t.some(function(e) {
      var r = ze(e && e.type);
      return r && r.indexOf("Bar") >= 0
    })
  },
  my = function(t) {
    return t === "horizontal" ? {
      numericAxisName: "yAxis",
      cateAxisName: "xAxis"
    } : t === "vertical" ? {
      numericAxisName: "xAxis",
      cateAxisName: "yAxis"
    } : t === "centric" ? {
      numericAxisName: "radiusAxis",
      cateAxisName: "angleAxis"
    } : {
      numericAxisName: "angleAxis",
      cateAxisName: "radiusAxis"
    }
  },
  e4 = function(t, e) {
    var r = t.props,
      n = t.graphicalItems,
      o = t.xAxisMap,
      i = o === void 0 ? {} : o,
      a = t.yAxisMap,
      u = a === void 0 ? {} : a,
      l = r.width,
      c = r.height,
      s = r.children,
      f = r.margin || {},
      p = te(s, Zr),
      d = te(s, cr),
      y = Object.keys(u).reduce(function(v, E) {
        var x = u[E],
          A = x.orientation;
        return !x.mirror && !x.hide ? q(q({}, v), {}, ht({}, A, v[A] + x.width)) : v
      }, {
        left: f.left || 0,
        right: f.right || 0
      }),
      m = Object.keys(i).reduce(function(v, E) {
        var x = i[E],
          A = x.orientation;
        return !x.mirror && !x.hide ? q(q({}, v), {}, ht({}, A, (0, ko.default)(v, "".concat(A)) + x.height)) : v
      }, {
        top: f.top || 0,
        bottom: f.bottom || 0
      }),
      g = q(q({}, m), y),
      h = g.bottom;
    p && (g.bottom += p.props.height || Zr.defaultProps.height), d && e && (g = eO(g, n, r, e));
    var b = l - g.left - g.right,
      w = c - g.top - g.bottom;
    return q(q({
      brushBottom: h
    }, g), {}, {
      width: Math.max(b, 0),
      height: Math.max(w, 0)
    })
  },
  r4 = function(t, e) {
    if (e === "xAxis") return t[e].width;
    if (e === "yAxis") return t[e].height
  },
  vy = function(t) {
    var e = t.chartName,
      r = t.GraphicalChild,
      n = t.defaultTooltipEventType,
      o = n === void 0 ? "axis" : n,
      i = t.validateTooltipEventTypes,
      a = i === void 0 ? ["axis"] : i,
      u = t.axisComponents,
      l = t.legendContent,
      c = t.formatAxisMap,
      s = t.defaultProps,
      f = function(m, g) {
        var h = g.graphicalItems,
          b = g.stackGroups,
          w = g.offset,
          v = g.updateId,
          E = g.dataStartIndex,
          x = g.dataEndIndex,
          A = m.barSize,
          C = m.layout,
          I = m.barGap,
          $ = m.barCategoryGap,
          B = m.maxBarSize,
          D = my(C),
          z = D.numericAxisName,
          W = D.cateAxisName,
          L = t4(h),
          X = [];
        return h.forEach(function(K, O) {
          var S = _a(m.data, {
              graphicalItems: [K],
              dataStartIndex: E,
              dataEndIndex: x
            }),
            _ = K.type.defaultProps !== void 0 ? q(q({}, K.type.defaultProps), K.props) : K.props,
            j = _.dataKey,
            k = _.maxBarSize,
            M = _["".concat(z, "Id")],
            U = _["".concat(W, "Id")],
            H = {},
            G = u.reduce(function(Jt, oe) {
              var Z, jr, Pe = g["".concat(oe.axisType, "Map")],
                Ar = _["".concat(oe.axisType, "Id")];
              Pe && Pe[Ar] || oe.axisType === "zAxis" || mr(!1);
              var R = Pe[Ar];
              return q(q({}, Jt), {}, ht(ht({}, oe.axisType, R), "".concat(oe.axisType, "Ticks"), He(R)))
            }, H),
            et = G[W],
            rt = G["".concat(W, "Ticks")],
            F = b && b[M] && b[M].hasStack && yO(K, b[M].stackGroups),
            ut = ze(K.type).indexOf("Bar") >= 0,
            J = Ui(et, rt),
            Y = [],
            st = L && J2({
              barSize: A,
              stackGroups: b,
              totalSize: r4(G, W)
            });
          if (ut) {
            var ct, Pt, lt = (0, _o.default)(k) ? B : k,
              At = (ct = (Pt = Ui(et, rt, !0)) !== null && Pt !== void 0 ? Pt : lt) !== null && ct !== void 0 ? ct : 0;
            Y = tO({
              barGap: I,
              barCategoryGap: $,
              bandSize: At !== J ? At : J,
              sizeList: st[U],
              maxBarSize: lt
            }), At !== J && (Y = Y.map(function(Jt) {
              return q(q({}, Jt), {}, {
                position: q(q({}, Jt.position), {}, {
                  offset: Jt.position.offset - At / 2
                })
              })
            }))
          }
          var Qt = K && K.type && K.type.getComposedData;
          Qt && X.push({
            props: q(q({}, Qt(q(q({}, G), {}, {
              displayedData: S,
              props: m,
              dataKey: j,
              item: K,
              bandSize: J,
              barPosition: Y,
              offset: w,
              stackedData: F,
              layout: C,
              dataStartIndex: E,
              dataEndIndex: x
            }))), {}, ht(ht(ht({
              key: K.key || "item-".concat(O)
            }, z, G[z]), W, G[W]), "animationId", v)),
            childIndex: Eg(K, m.children),
            item: K
          })
        }), X
      },
      p = function(m, g) {
        var h = m.props,
          b = m.dataStartIndex,
          w = m.dataEndIndex,
          v = m.updateId;
        if (!Ss({
            props: h
          })) return null;
        var E = h.children,
          x = h.layout,
          A = h.stackOffset,
          C = h.data,
          I = h.reverseStackOrder,
          $ = my(x),
          B = $.numericAxisName,
          D = $.cateAxisName,
          z = ue(E, r),
          W = pO(C, z, "".concat(B, "Id"), "".concat(D, "Id"), A, I),
          L = u.reduce(function(_, j) {
            var k = "".concat(j.axisType, "Map");
            return q(q({}, _), {}, ht({}, k, Qk(h, q(q({}, j), {}, {
              graphicalItems: z,
              stackGroups: j.axisType === B && W,
              dataStartIndex: b,
              dataEndIndex: w
            }))))
          }, {}),
          X = e4(q(q({}, L), {}, {
            props: h,
            graphicalItems: z
          }), g?.legendBBox);
        Object.keys(L).forEach(function(_) {
          L[_] = c(h, L[_], X, _.replace("Map", ""), e)
        });
        var K = L["".concat(D, "Map")],
          O = Jk(K),
          S = f(h, q(q({}, L), {}, {
            dataStartIndex: b,
            dataEndIndex: w,
            updateId: v,
            graphicalItems: z,
            stackGroups: W,
            offset: X
          }));
        return q(q({
          formattedGraphicalItems: S,
          graphicalItems: z,
          offset: X,
          stackGroups: W
        }, O), L)
      },
      d = (function(m) {
        function g(h) {
          var b, w, v;
          return Bk(this, g), v = Rk(this, g, [h]), ht(v, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), ht(v, "accessibilityManager", new bk), ht(v, "handleLegendBBoxUpdate", function(E) {
            if (E) {
              var x = v.state,
                A = x.dataStartIndex,
                C = x.dataEndIndex,
                I = x.updateId;
              v.setState(q({
                legendBBox: E
              }, p({
                props: v.props,
                dataStartIndex: A,
                dataEndIndex: C,
                updateId: I
              }, q(q({}, v.state), {}, {
                legendBBox: E
              }))))
            }
          }), ht(v, "handleReceiveSyncEvent", function(E, x, A) {
            if (v.props.syncId === E) {
              if (A === v.eventEmitterSymbol && typeof v.props.syncMethod != "function") return;
              v.applySyncEvent(x)
            }
          }), ht(v, "handleBrushChange", function(E) {
            var x = E.startIndex,
              A = E.endIndex;
            if (x !== v.state.dataStartIndex || A !== v.state.dataEndIndex) {
              var C = v.state.updateId;
              v.setState(function() {
                return q({
                  dataStartIndex: x,
                  dataEndIndex: A
                }, p({
                  props: v.props,
                  dataStartIndex: x,
                  dataEndIndex: A,
                  updateId: C
                }, v.state))
              }), v.triggerSyncEvent({
                dataStartIndex: x,
                dataEndIndex: A
              })
            }
          }), ht(v, "handleMouseEnter", function(E) {
            var x = v.getMouseInfo(E);
            if (x) {
              var A = q(q({}, x), {}, {
                isTooltipActive: !0
              });
              v.setState(A), v.triggerSyncEvent(A);
              var C = v.props.onMouseEnter;
              (0, Ie.default)(C) && C(A, E)
            }
          }), ht(v, "triggeredAfterMouseMove", function(E) {
            var x = v.getMouseInfo(E),
              A = x ? q(q({}, x), {}, {
                isTooltipActive: !0
              }) : {
                isTooltipActive: !1
              };
            v.setState(A), v.triggerSyncEvent(A);
            var C = v.props.onMouseMove;
            (0, Ie.default)(C) && C(A, E)
          }), ht(v, "handleItemMouseEnter", function(E) {
            v.setState(function() {
              return {
                isTooltipActive: !0,
                activeItem: E,
                activePayload: E.tooltipPayload,
                activeCoordinate: E.tooltipPosition || {
                  x: E.cx,
                  y: E.cy
                }
              }
            })
          }), ht(v, "handleItemMouseLeave", function() {
            v.setState(function() {
              return {
                isTooltipActive: !1
              }
            })
          }), ht(v, "handleMouseMove", function(E) {
            E.persist(), v.throttleTriggeredAfterMouseMove(E)
          }), ht(v, "handleMouseLeave", function(E) {
            v.throttleTriggeredAfterMouseMove.cancel();
            var x = {
              isTooltipActive: !1
            };
            v.setState(x), v.triggerSyncEvent(x);
            var A = v.props.onMouseLeave;
            (0, Ie.default)(A) && A(x, E)
          }), ht(v, "handleOuterEvent", function(E) {
            var x = bg(E),
              A = (0, ko.default)(v.props, "".concat(x));
            if (x && (0, Ie.default)(A)) {
              var C, I;
              /.*touch.*/i.test(x) ? I = v.getMouseInfo(E.changedTouches[0]) : I = v.getMouseInfo(E), A((C = I) !== null && C !== void 0 ? C : {}, E)
            }
          }), ht(v, "handleClick", function(E) {
            var x = v.getMouseInfo(E);
            if (x) {
              var A = q(q({}, x), {}, {
                isTooltipActive: !0
              });
              v.setState(A), v.triggerSyncEvent(A);
              var C = v.props.onClick;
              (0, Ie.default)(C) && C(A, E)
            }
          }), ht(v, "handleMouseDown", function(E) {
            var x = v.props.onMouseDown;
            if ((0, Ie.default)(x)) {
              var A = v.getMouseInfo(E);
              x(A, E)
            }
          }), ht(v, "handleMouseUp", function(E) {
            var x = v.props.onMouseUp;
            if ((0, Ie.default)(x)) {
              var A = v.getMouseInfo(E);
              x(A, E)
            }
          }), ht(v, "handleTouchMove", function(E) {
            E.changedTouches != null && E.changedTouches.length > 0 && v.throttleTriggeredAfterMouseMove(E.changedTouches[0])
          }), ht(v, "handleTouchStart", function(E) {
            E.changedTouches != null && E.changedTouches.length > 0 && v.handleMouseDown(E.changedTouches[0])
          }), ht(v, "handleTouchEnd", function(E) {
            E.changedTouches != null && E.changedTouches.length > 0 && v.handleMouseUp(E.changedTouches[0])
          }), ht(v, "handleDoubleClick", function(E) {
            var x = v.props.onDoubleClick;
            if ((0, Ie.default)(x)) {
              var A = v.getMouseInfo(E);
              x(A, E)
            }
          }), ht(v, "handleContextMenu", function(E) {
            var x = v.props.onContextMenu;
            if ((0, Ie.default)(x)) {
              var A = v.getMouseInfo(E);
              x(A, E)
            }
          }), ht(v, "triggerSyncEvent", function(E) {
            v.props.syncId !== void 0 && Mc.emit(Tc, v.props.syncId, E, v.eventEmitterSymbol)
          }), ht(v, "applySyncEvent", function(E) {
            var x = v.props,
              A = x.layout,
              C = x.syncMethod,
              I = v.state.updateId,
              $ = E.dataStartIndex,
              B = E.dataEndIndex;
            if (E.dataStartIndex !== void 0 || E.dataEndIndex !== void 0) v.setState(q({
              dataStartIndex: $,
              dataEndIndex: B
            }, p({
              props: v.props,
              dataStartIndex: $,
              dataEndIndex: B,
              updateId: I
            }, v.state)));
            else if (E.activeTooltipIndex !== void 0) {
              var D = E.chartX,
                z = E.chartY,
                W = E.activeTooltipIndex,
                L = v.state,
                X = L.offset,
                K = L.tooltipTicks;
              if (!X) return;
              if (typeof C == "function") W = C(K, E);
              else if (C === "value") {
                W = -1;
                for (var O = 0; O < K.length; O++)
                  if (K[O].value === E.activeLabel) {
                    W = O;
                    break
                  }
              }
              var S = q(q({}, X), {}, {
                  x: X.left,
                  y: X.top
                }),
                _ = Math.min(D, S.x + S.width),
                j = Math.min(z, S.y + S.height),
                k = K[W] && K[W].value,
                M = Nc(v.state, v.props.data, W),
                U = K[W] ? {
                  x: A === "horizontal" ? K[W].coordinate : _,
                  y: A === "horizontal" ? j : K[W].coordinate
                } : py;
              v.setState(q(q({}, E), {}, {
                activeLabel: k,
                activeCoordinate: U,
                activePayload: M,
                activeTooltipIndex: W
              }))
            } else v.setState(E)
          }), ht(v, "renderCursor", function(E) {
            var x, A = v.state,
              C = A.isTooltipActive,
              I = A.activeCoordinate,
              $ = A.activePayload,
              B = A.offset,
              D = A.activeTooltipIndex,
              z = A.tooltipAxisBandSize,
              W = v.getTooltipEventType(),
              L = (x = E.props.active) !== null && x !== void 0 ? x : C,
              X = v.props.layout,
              K = E.key || "_recharts-cursor";
            return he.createElement(kk, {
              key: K,
              activeCoordinate: I,
              activePayload: $,
              activeTooltipIndex: D,
              chartName: e,
              element: E,
              isActive: L,
              layout: X,
              offset: B,
              tooltipAxisBandSize: z,
              tooltipEventType: W
            })
          }), ht(v, "renderPolarAxis", function(E, x, A) {
            var C = (0, ko.default)(E, "type.axisType"),
              I = (0, ko.default)(v.state, "".concat(C, "Map")),
              $ = E.type.defaultProps,
              B = $ !== void 0 ? q(q({}, $), E.props) : E.props,
              D = I && I[B["".concat(C, "Id")]];
            return je(E, q(q({}, D), {}, {
              className: wt(C, D.className),
              key: E.key || "".concat(x, "-").concat(A),
              ticks: He(D, !0)
            }))
          }), ht(v, "renderPolarGrid", function(E) {
            var x = E.props,
              A = x.radialLines,
              C = x.polarAngles,
              I = x.polarRadius,
              $ = v.state,
              B = $.radiusAxisMap,
              D = $.angleAxisMap,
              z = Ke(B),
              W = Ke(D),
              L = W.cx,
              X = W.cy,
              K = W.innerRadius,
              O = W.outerRadius;
            return je(E, {
              polarAngles: Array.isArray(C) ? C : He(W, !0).map(function(S) {
                return S.coordinate
              }),
              polarRadius: Array.isArray(I) ? I : He(z, !0).map(function(S) {
                return S.coordinate
              }),
              cx: L,
              cy: X,
              innerRadius: K,
              outerRadius: O,
              key: E.key || "polar-grid",
              radialLines: A
            })
          }), ht(v, "renderLegend", function() {
            var E = v.state.formattedGraphicalItems,
              x = v.props,
              A = x.children,
              C = x.width,
              I = x.height,
              $ = v.props.margin || {},
              B = C - ($.left || 0) - ($.right || 0),
              D = P0({
                children: A,
                formattedGraphicalItems: E,
                legendWidth: B,
                legendContent: l
              });
            if (!D) return null;
            var z = D.item,
              W = ay(D, Mk);
            return je(z, q(q({}, W), {}, {
              chartWidth: C,
              chartHeight: I,
              margin: $,
              onBBoxUpdate: v.handleLegendBBoxUpdate
            }))
          }), ht(v, "renderTooltip", function() {
            var E, x = v.props,
              A = x.children,
              C = x.accessibilityLayer,
              I = te(A, Me);
            if (!I) return null;
            var $ = v.state,
              B = $.isTooltipActive,
              D = $.activeCoordinate,
              z = $.activePayload,
              W = $.activeLabel,
              L = $.offset,
              X = (E = I.props.active) !== null && E !== void 0 ? E : B;
            return je(I, {
              viewBox: q(q({}, L), {}, {
                x: L.left,
                y: L.top
              }),
              active: X,
              label: W,
              payload: X ? z : [],
              coordinate: D,
              accessibilityLayer: C
            })
          }), ht(v, "renderBrush", function(E) {
            var x = v.props,
              A = x.margin,
              C = x.data,
              I = v.state,
              $ = I.offset,
              B = I.dataStartIndex,
              D = I.dataEndIndex,
              z = I.updateId;
            return je(E, {
              key: E.key || "_recharts-brush",
              onChange: Fi(v.handleBrushChange, E.props.onChange),
              data: C,
              x: tt(E.props.x) ? E.props.x : $.left,
              y: tt(E.props.y) ? E.props.y : $.top + $.height + $.brushBottom - (A.bottom || 0),
              width: tt(E.props.width) ? E.props.width : $.width,
              startIndex: B,
              endIndex: D,
              updateId: "brush-".concat(z)
            })
          }), ht(v, "renderReferenceElement", function(E, x, A) {
            if (!E) return null;
            var C = v,
              I = C.clipPathId,
              $ = v.state,
              B = $.xAxisMap,
              D = $.yAxisMap,
              z = $.offset,
              W = E.type.defaultProps || {},
              L = E.props,
              X = L.xAxisId,
              K = X === void 0 ? W.xAxisId : X,
              O = L.yAxisId,
              S = O === void 0 ? W.yAxisId : O;
            return je(E, {
              key: E.key || "".concat(x, "-").concat(A),
              xAxis: B[K],
              yAxis: D[S],
              viewBox: {
                x: z.left,
                y: z.top,
                width: z.width,
                height: z.height
              },
              clipPathId: I
            })
          }), ht(v, "renderActivePoints", function(E) {
            var x = E.item,
              A = E.activePoint,
              C = E.basePoint,
              I = E.childIndex,
              $ = E.isRange,
              B = [],
              D = x.props.key,
              z = x.item.type.defaultProps !== void 0 ? q(q({}, x.item.type.defaultProps), x.item.props) : x.item.props,
              W = z.activeDot,
              L = z.dataKey,
              X = q(q({
                index: I,
                dataKey: L,
                cx: A.x,
                cy: A.y,
                r: 4,
                fill: Sl(x.item),
                strokeWidth: 2,
                stroke: "#fff",
                payload: A.payload,
                value: A.value
              }, Et(W, !1)), Fo(W));
            return B.push(g.renderActiveDot(W, X, "".concat(D, "-activePoint-").concat(I))), C ? B.push(g.renderActiveDot(W, q(q({}, X), {}, {
              cx: C.x,
              cy: C.y
            }), "".concat(D, "-basePoint-").concat(I))) : $ && B.push(null), B
          }), ht(v, "renderGraphicChild", function(E, x, A) {
            var C = v.filterFormatItem(E, x, A);
            if (!C) return null;
            var I = v.getTooltipEventType(),
              $ = v.state,
              B = $.isTooltipActive,
              D = $.tooltipAxis,
              z = $.activeTooltipIndex,
              W = $.activeLabel,
              L = v.props.children,
              X = te(L, Me),
              K = C.props,
              O = K.points,
              S = K.isRange,
              _ = K.baseLine,
              j = C.item.type.defaultProps !== void 0 ? q(q({}, C.item.type.defaultProps), C.item.props) : C.item.props,
              k = j.activeDot,
              M = j.hide,
              U = j.activeBar,
              H = j.activeShape,
              G = !!(!M && B && X && (k || U || H)),
              et = {};
            I !== "axis" && X && X.props.trigger === "click" ? et = {
              onClick: Fi(v.handleItemMouseEnter, E.props.onClick)
            } : I !== "axis" && (et = {
              onMouseLeave: Fi(v.handleItemMouseLeave, E.props.onMouseLeave),
              onMouseEnter: Fi(v.handleItemMouseEnter, E.props.onMouseEnter)
            });
            var rt = je(E, q(q({}, C.props), et));

            function F(Z) {
              return typeof D.dataKey == "function" ? D.dataKey(Z.payload) : null
            }
            if (G)
              if (z >= 0) {
                var ut, J;
                if (D.dataKey && !D.allowDuplicatedCategory) {
                  var Y = typeof D.dataKey == "function" ? F : "payload.".concat(D.dataKey.toString());
                  ut = $o(O, Y, W), J = S && _ && $o(_, Y, W)
                } else ut = O?.[z], J = S && _ && _[z];
                if (H || U) {
                  var st = E.props.activeIndex !== void 0 ? E.props.activeIndex : z;
                  return [je(E, q(q(q({}, C.props), et), {}, {
                    activeIndex: st
                  })), null, null]
                }
                if (!(0, _o.default)(ut)) return [rt].concat(hn(v.renderActivePoints({
                  item: C,
                  activePoint: ut,
                  basePoint: J,
                  childIndex: z,
                  isRange: S
                })))
              } else {
                var ct, Pt = (ct = v.getItemByXY(v.state.activeCoordinate)) !== null && ct !== void 0 ? ct : {
                    graphicalItem: rt
                  },
                  lt = Pt.graphicalItem,
                  At = lt.item,
                  Qt = At === void 0 ? E : At,
                  Jt = lt.childIndex,
                  oe = q(q(q({}, C.props), et), {}, {
                    activeIndex: Jt
                  });
                return [je(Qt, oe), null, null]
              } return S ? [rt, null, null] : [rt, null]
          }), ht(v, "renderCustomized", function(E, x, A) {
            return je(E, q(q({
              key: "recharts-customized-".concat(A)
            }, v.props), v.state))
          }), ht(v, "renderMap", {
            CartesianGrid: {
              handler: Pa,
              once: !0
            },
            ReferenceArea: {
              handler: v.renderReferenceElement
            },
            ReferenceLine: {
              handler: Pa
            },
            ReferenceDot: {
              handler: v.renderReferenceElement
            },
            XAxis: {
              handler: Pa
            },
            YAxis: {
              handler: Pa
            },
            Brush: {
              handler: v.renderBrush,
              once: !0
            },
            Bar: {
              handler: v.renderGraphicChild
            },
            Line: {
              handler: v.renderGraphicChild
            },
            Area: {
              handler: v.renderGraphicChild
            },
            Radar: {
              handler: v.renderGraphicChild
            },
            RadialBar: {
              handler: v.renderGraphicChild
            },
            Scatter: {
              handler: v.renderGraphicChild
            },
            Pie: {
              handler: v.renderGraphicChild
            },
            Funnel: {
              handler: v.renderGraphicChild
            },
            Tooltip: {
              handler: v.renderCursor,
              once: !0
            },
            PolarGrid: {
              handler: v.renderPolarGrid,
              once: !0
            },
            PolarAngleAxis: {
              handler: v.renderPolarAxis
            },
            PolarRadiusAxis: {
              handler: v.renderPolarAxis
            },
            Customized: {
              handler: v.renderCustomized
            }
          }), v.clipPathId = "".concat((b = h.id) !== null && b !== void 0 ? b : xn("recharts"), "-clip"), v.throttleTriggeredAfterMouseMove = (0, uk.default)(v.triggeredAfterMouseMove, (w = h.throttleDelay) !== null && w !== void 0 ? w : 1e3 / 60), v.state = {}, v
        }
        return $k(g, m), zk(g, [{
          key: "componentDidMount",
          value: function() {
            var h, b;
            this.addListener(), this.accessibilityManager.setDetails({
              container: this.container,
              offset: {
                left: (h = this.props.margin.left) !== null && h !== void 0 ? h : 0,
                top: (b = this.props.margin.top) !== null && b !== void 0 ? b : 0
              },
              coordinateList: this.state.tooltipTicks,
              mouseHandlerCallback: this.triggeredAfterMouseMove,
              layout: this.props.layout
            }), this.displayDefaultTooltip()
          }
        }, {
          key: "displayDefaultTooltip",
          value: function() {
            var h = this.props,
              b = h.children,
              w = h.data,
              v = h.height,
              E = h.layout,
              x = te(b, Me);
            if (x) {
              var A = x.props.defaultIndex;
              if (!(typeof A != "number" || A < 0 || A > this.state.tooltipTicks.length - 1)) {
                var C = this.state.tooltipTicks[A] && this.state.tooltipTicks[A].value,
                  I = Nc(this.state, w, A, C),
                  $ = this.state.tooltipTicks[A].coordinate,
                  B = (this.state.offset.top + v) / 2,
                  D = E === "horizontal",
                  z = D ? {
                    x: $,
                    y: B
                  } : {
                    y: $,
                    x: B
                  },
                  W = this.state.formattedGraphicalItems.find(function(X) {
                    var K = X.item;
                    return K.type.name === "Scatter"
                  });
                W && (z = q(q({}, z), W.props.points[A].tooltipPosition), I = W.props.points[A].tooltipPayload);
                var L = {
                  activeTooltipIndex: A,
                  isTooltipActive: !0,
                  activeLabel: C,
                  activePayload: I,
                  activeCoordinate: z
                };
                this.setState(L), this.renderCursor(x), this.accessibilityManager.setIndex(A)
              }
            }
          }
        }, {
          key: "getSnapshotBeforeUpdate",
          value: function(h, b) {
            if (!this.props.accessibilityLayer) return null;
            if (this.state.tooltipTicks !== b.tooltipTicks && this.accessibilityManager.setDetails({
                coordinateList: this.state.tooltipTicks
              }), this.props.layout !== h.layout && this.accessibilityManager.setDetails({
                layout: this.props.layout
              }), this.props.margin !== h.margin) {
              var w, v;
              this.accessibilityManager.setDetails({
                offset: {
                  left: (w = this.props.margin.left) !== null && w !== void 0 ? w : 0,
                  top: (v = this.props.margin.top) !== null && v !== void 0 ? v : 0
                }
              })
            }
            return null
          }
        }, {
          key: "componentDidUpdate",
          value: function(h) {
            nu([te(h.children, Me)], [te(this.props.children, Me)]) || this.displayDefaultTooltip()
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel()
          }
        }, {
          key: "getTooltipEventType",
          value: function() {
            var h = te(this.props.children, Me);
            if (h && typeof h.props.shared == "boolean") {
              var b = h.props.shared ? "axis" : "item";
              return a.indexOf(b) >= 0 ? b : o
            }
            return o
          }
        }, {
          key: "getMouseInfo",
          value: function(h) {
            if (!this.container) return null;
            var b = this.container,
              w = b.getBoundingClientRect(),
              v = G1(w),
              E = {
                chartX: Math.round(h.pageX - v.left),
                chartY: Math.round(h.pageY - v.top)
              },
              x = w.width / b.offsetWidth || 1,
              A = this.inRange(E.chartX, E.chartY, x);
            if (!A) return null;
            var C = this.state,
              I = C.xAxisMap,
              $ = C.yAxisMap,
              B = this.getTooltipEventType(),
              D = hy(this.state, this.props.data, this.props.layout, A);
            if (B !== "axis" && I && $) {
              var z = Ke(I).scale,
                W = Ke($).scale,
                L = z && z.invert ? z.invert(E.chartX) : null,
                X = W && W.invert ? W.invert(E.chartY) : null;
              return q(q({}, E), {}, {
                xValue: L,
                yValue: X
              }, D)
            }
            return D ? q(q({}, E), D) : null
          }
        }, {
          key: "inRange",
          value: function(h, b) {
            var w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
              v = this.props.layout,
              E = h / w,
              x = b / w;
            if (v === "horizontal" || v === "vertical") {
              var A = this.state.offset,
                C = E >= A.left && E <= A.left + A.width && x >= A.top && x <= A.top + A.height;
              return C ? {
                x: E,
                y: x
              } : null
            }
            var I = this.state,
              $ = I.angleAxisMap,
              B = I.radiusAxisMap;
            if ($ && B) {
              var D = Ke($);
              return q0({
                x: E,
                y: x
              }, D)
            }
            return null
          }
        }, {
          key: "parseEventsOfWrapper",
          value: function() {
            var h = this.props.children,
              b = this.getTooltipEventType(),
              w = te(h, Me),
              v = {};
            w && b === "axis" && (w.props.trigger === "click" ? v = {
              onClick: this.handleClick
            } : v = {
              onMouseEnter: this.handleMouseEnter,
              onDoubleClick: this.handleDoubleClick,
              onMouseMove: this.handleMouseMove,
              onMouseLeave: this.handleMouseLeave,
              onTouchMove: this.handleTouchMove,
              onTouchStart: this.handleTouchStart,
              onTouchEnd: this.handleTouchEnd,
              onContextMenu: this.handleContextMenu
            });
            var E = Fo(this.props, this.handleOuterEvent);
            return q(q({}, E), v)
          }
        }, {
          key: "addListener",
          value: function() {
            Mc.on(Tc, this.handleReceiveSyncEvent)
          }
        }, {
          key: "removeListener",
          value: function() {
            Mc.removeListener(Tc, this.handleReceiveSyncEvent)
          }
        }, {
          key: "filterFormatItem",
          value: function(h, b, w) {
            for (var v = this.state.formattedGraphicalItems, E = 0, x = v.length; E < x; E++) {
              var A = v[E];
              if (A.item === h || A.props.key === h.key || b === ze(A.item.type) && w === A.childIndex) return A
            }
            return null
          }
        }, {
          key: "renderClipPath",
          value: function() {
            var h = this.clipPathId,
              b = this.state.offset,
              w = b.left,
              v = b.top,
              E = b.height,
              x = b.width;
            return he.createElement("defs", null, he.createElement("clipPath", {
              id: h
            }, he.createElement("rect", {
              x: w,
              y: v,
              height: E,
              width: x
            })))
          }
        }, {
          key: "getXScales",
          value: function() {
            var h = this.state.xAxisMap;
            return h ? Object.entries(h).reduce(function(b, w) {
              var v = iy(w, 2),
                E = v[0],
                x = v[1];
              return q(q({}, b), {}, ht({}, E, x.scale))
            }, {}) : null
          }
        }, {
          key: "getYScales",
          value: function() {
            var h = this.state.yAxisMap;
            return h ? Object.entries(h).reduce(function(b, w) {
              var v = iy(w, 2),
                E = v[0],
                x = v[1];
              return q(q({}, b), {}, ht({}, E, x.scale))
            }, {}) : null
          }
        }, {
          key: "getXScaleByAxisId",
          value: function(h) {
            var b;
            return (b = this.state.xAxisMap) === null || b === void 0 || (b = b[h]) === null || b === void 0 ? void 0 : b.scale
          }
        }, {
          key: "getYScaleByAxisId",
          value: function(h) {
            var b;
            return (b = this.state.yAxisMap) === null || b === void 0 || (b = b[h]) === null || b === void 0 ? void 0 : b.scale
          }
        }, {
          key: "getItemByXY",
          value: function(h) {
            var b = this.state,
              w = b.formattedGraphicalItems,
              v = b.activeItem;
            if (w && w.length)
              for (var E = 0, x = w.length; E < x; E++) {
                var A = w[E],
                  C = A.props,
                  I = A.item,
                  $ = I.type.defaultProps !== void 0 ? q(q({}, I.type.defaultProps), I.props) : I.props,
                  B = ze(I.type);
                if (B === "Bar") {
                  var D = (C.data || []).find(function(X) {
                    return vA(h, X)
                  });
                  if (D) return {
                    graphicalItem: A,
                    payload: D
                  }
                } else if (B === "RadialBar") {
                  var z = (C.data || []).find(function(X) {
                    return q0(h, X)
                  });
                  if (z) return {
                    graphicalItem: A,
                    payload: z
                  }
                } else if (ia(A, v) || aa(A, v) || vo(A, v)) {
                  var W = s3({
                      graphicalItem: A,
                      activeTooltipItem: v,
                      itemData: $.data
                    }),
                    L = $.activeIndex === void 0 ? W : $.activeIndex;
                  return {
                    graphicalItem: q(q({}, A), {}, {
                      childIndex: L
                    }),
                    payload: vo(A, v) ? $.data[W] : A.props.data[W]
                  }
                }
              }
            return null
          }
        }, {
          key: "render",
          value: function() {
            var h = this;
            if (!Ss(this)) return null;
            var b = this.props,
              w = b.children,
              v = b.className,
              E = b.width,
              x = b.height,
              A = b.style,
              C = b.compact,
              I = b.title,
              $ = b.desc,
              B = ay(b, Tk),
              D = Et(B, !1);
            if (C) return he.createElement(fh, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, he.createElement(iu, dn({}, D, {
              width: E,
              height: x,
              title: I,
              desc: $
            }), this.renderClipPath(), As(w, this.renderMap)));
            if (this.props.accessibilityLayer) {
              var z, W;
              D.tabIndex = (z = this.props.tabIndex) !== null && z !== void 0 ? z : 0, D.role = (W = this.props.role) !== null && W !== void 0 ? W : "application", D.onKeyDown = function(X) {
                h.accessibilityManager.keyboardEvent(X)
              }, D.onFocus = function() {
                h.accessibilityManager.focus()
              }
            }
            var L = this.parseEventsOfWrapper();
            return he.createElement(fh, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, he.createElement("div", dn({
              className: wt("recharts-wrapper", v),
              style: q({
                position: "relative",
                cursor: "default",
                width: E,
                height: x
              }, A)
            }, L, {
              ref: function(X) {
                h.container = X
              }
            }), he.createElement(iu, dn({}, D, {
              width: E,
              height: x,
              title: I,
              desc: $,
              style: Yk
            }), this.renderClipPath(), As(w, this.renderMap)), this.renderLegend(), this.renderTooltip()))
          }
        }])
      })(lk);
    ht(d, "displayName", e), ht(d, "defaultProps", q({
      layout: "horizontal",
      stackOffset: "none",
      barCategoryGap: "10%",
      barGap: 4,
      margin: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      },
      reverseStackOrder: !1,
      syncMethod: "index"
    }, s)), ht(d, "getDerivedStateFromProps", function(m, g) {
      var h = m.dataKey,
        b = m.data,
        w = m.children,
        v = m.width,
        E = m.height,
        x = m.layout,
        A = m.stackOffset,
        C = m.margin,
        I = g.dataStartIndex,
        $ = g.dataEndIndex;
      if (g.updateId === void 0) {
        var B = yy(m);
        return q(q(q({}, B), {}, {
          updateId: 0
        }, p(q(q({
          props: m
        }, B), {}, {
          updateId: 0
        }), g)), {}, {
          prevDataKey: h,
          prevData: b,
          prevWidth: v,
          prevHeight: E,
          prevLayout: x,
          prevStackOffset: A,
          prevMargin: C,
          prevChildren: w
        })
      }
      if (h !== g.prevDataKey || b !== g.prevData || v !== g.prevWidth || E !== g.prevHeight || x !== g.prevLayout || A !== g.prevStackOffset || !Tr(C, g.prevMargin)) {
        var D = yy(m),
          z = {
            chartX: g.chartX,
            chartY: g.chartY,
            isTooltipActive: g.isTooltipActive
          },
          W = q(q({}, hy(g, b, x)), {}, {
            updateId: g.updateId + 1
          }),
          L = q(q(q({}, D), z), W);
        return q(q(q({}, L), p(q({
          props: m
        }, L), g)), {}, {
          prevDataKey: h,
          prevData: b,
          prevWidth: v,
          prevHeight: E,
          prevLayout: x,
          prevStackOffset: A,
          prevMargin: C,
          prevChildren: w
        })
      }
      if (!nu(w, g.prevChildren)) {
        var X, K, O, S, _ = te(w, Zr),
          j = _ && (X = (K = _.props) === null || K === void 0 ? void 0 : K.startIndex) !== null && X !== void 0 ? X : I,
          k = _ && (O = (S = _.props) === null || S === void 0 ? void 0 : S.endIndex) !== null && O !== void 0 ? O : $,
          M = j !== I || k !== $,
          U = !(0, _o.default)(b),
          H = U && !M ? g.updateId : g.updateId + 1;
        return q(q({
          updateId: H
        }, p(q(q({
          props: m
        }, g), {}, {
          updateId: H,
          dataStartIndex: j,
          dataEndIndex: k
        }), g)), {}, {
          prevChildren: w,
          dataStartIndex: j,
          dataEndIndex: k
        })
      }
      return null
    }), ht(d, "renderActiveDot", function(m, g, h) {
      var b;
      return ck(m) ? b = je(m, g) : (0, Ie.default)(m) ? b = m(g) : b = he.createElement(Yl, g), he.createElement(Ct, {
        className: "recharts-active-dot",
        key: h
      }, b)
    });
    var y = sk(function(m, g) {
      return he.createElement(d, dn({}, m, {
        ref: g
      }))
    });
    return y.displayName = d.displayName, y
  },
  IM = vy({
    chartName: "LineChart",
    GraphicalChild: wa,
    axisComponents: [{
      axisType: "xAxis",
      AxisComp: Ao
    }, {
      axisType: "yAxis",
      AxisComp: Po
    }],
    formatAxisMap: nh
  }),
  n4 = vy({
    chartName: "BarChart",
    GraphicalChild: Er,
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: ["axis", "item"],
    axisComponents: [{
      axisType: "xAxis",
      AxisComp: Ao
    }, {
      axisType: "yAxis",
      AxisComp: Po
    }],
    formatAxisMap: nh
  });
import "./react-shim-eraudit.js";
import {
  jsx as ka,
  jsxs as Bc
} from "./react-jsx-shim-eraudit.js";

function o4({
  data: t,
  title: e = "AI Intelligence"
}) {
  if (!t) return null;
  let r = Array.isArray(t?.sections) ? t.sections : i4(t);
  return r.length ? Bc("div", {
    className: "rounded-lg my-3",
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      boxShadow: "var(--md-shadow-sm)",
      padding: "1rem 1.25rem"
    },
    children: [Bc("h3", {
      style: {
        margin: 0,
        marginBottom: "0.75rem",
        fontSize: "var(--fs-md)",
        fontWeight: 700,
        color: "var(--md-text-primary)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      },
      children: [ka("span", {
        "aria-hidden": "true",
        children: "\u2728"
      }), e]
    }), ka("div", {
      className: "space-y-2",
      children: r.map((n, o) => Bc("div", {
        children: [n.title && ka("div", {
          style: {
            fontSize: "var(--fs-xs)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--md-text-tertiary)",
            marginBottom: 4
          },
          children: n.title
        }), ka("p", {
          style: {
            margin: 0,
            fontSize: "var(--fs-sm)",
            color: "var(--md-text-primary)",
            lineHeight: 1.6,
            whiteSpace: "pre-line"
          },
          children: n.body || n.text || ""
        })]
      }, o))
    })]
  }) : null
}

function i4(t) {
  let e = [];
  if (t.narrative && e.push({
      title: "\u0E2A\u0E23\u0E38\u0E1B",
      body: t.narrative
    }), t.analysis && e.push({
      title: "\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C",
      body: t.analysis
    }), t.recommendation && e.push({
      title: "\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33",
      body: t.recommendation
    }), Array.isArray(t.actions))
    for (let r of t.actions) e.push({
      title: r.label || r.title,
      body: r.reason || r.detail || ""
    });
  return e
}
import {
  Fragment as Co,
  jsx as P,
  jsxs as N
} from "./react-jsx-shim-eraudit.js";

function dt(t, e = 0) {
  return t == null || t === "" || isNaN(t) ? "\u2014" : Number(t).toLocaleString("th-TH", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  })
}

function Ma(t) {
  return t == null || isNaN(t) ? "\u2014" : `${Number(t).toFixed(1)}%`
}

function a4(t, e) {
  return e > 0 ? Math.round((t - e) / e * 100) : t > 0 ? 100 : 0
}
async function nr(t, e) {
  let r = await fetch(t, e),
    n = r.headers.get("content-type") || "";
  if (!r.ok) {
    if (n.includes("json")) {
      let o = await r.json();
      throw new Error(o.error || `HTTP ${r.status}`)
    }
    throw new Error(`HTTP ${r.status}`)
  }
  if (!n.includes("json")) throw new Error("\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E44\u0E21\u0E48\u0E15\u0E2D\u0E1A\u0E01\u0E25\u0E31\u0E1A \u2014 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Backend \u0E17\u0E33\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48");
  return r.json()
}
var Ta = ["#94a3b8", "#7c3aed", "#0284c7"],
  gy = ["#0284c7", "#7c3aed", "#db2777", "#ea580c", "#059669", "#d97706", "#4f46e5", "#0891b2", "#be123c", "#65a30d"];

function RM() {
  let t = new Date,
    e = t.getMonth() + 1,
    r = t.getFullYear();
  return `${e>=10?r:r-1}-10-01`
}

function u4() {
  let t = new Date,
    e = t.getFullYear(),
    r = String(t.getMonth() + 1).padStart(2, "0");
  return `${e}-${r}-01`
}
var Ae = () => new Date().toISOString().slice(0, 10),
  yn = ["#10b981", "#84cc16", "#eab308", "#f97316", "#dc2626"],
  Ca = ["aging_0_30", "aging_31_60", "aging_61_90", "aging_91_180", "aging_180_plus"],
  Da = ["0-30 \u0E27\u0E31\u0E19", "31-60 \u0E27\u0E31\u0E19", "61-90 \u0E27\u0E31\u0E19", "91-180 \u0E27\u0E31\u0E19", ">180 \u0E27\u0E31\u0E19"],
  mn = {
    drug: "#7c3aed",
    lab: "#0284c7",
    xray: "#059669"
  };

function l4() {
  let [t, e] = It(null), [r, n] = It(null), [o, i] = It(null), [a, u] = It(null), [l, c] = It(null), [s, f] = It(null), [p, d] = It(!0), [y, m] = It(null), [g, h] = It("overview"), [b, w] = It(null), [v, E] = It(null), x = Yv(null), [A, C] = It(Ae()), [I, $] = It(Ae()), [B, D] = It("today"), [z, W] = It(null), [L, X] = It(null), [K, O] = It("outstanding"), [S, _] = It(!1), [j, k] = It("groups"), [M, U] = It(new Set), H = ae(R => {
    U(V => {
      let mt = new Set(V);
      return mt.has(R) ? mt.delete(R) : mt.add(R), mt
    })
  }, []), G = {
    UC: "#10b981",
    "\u0E02\u0E49\u0E32\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23 / \u0E2D\u0E1B\u0E17": "#0ea5e9",
    \u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07: "#f59e0b",
    "\u0E15\u0E48\u0E32\u0E07\u0E0A\u0E32\u0E15\u0E34 (1.5 \u0E40\u0E17\u0E48\u0E32)": "#7c3aed",
    \u0E15\u0E48\u0E32\u0E07\u0E14\u0E49\u0E32\u0E27: "#8b5cf6",
    \u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19\u0E2A\u0E31\u0E07\u0E04\u0E21: "#ec4899",
    \u0E1E\u0E23\u0E1A: "#f43f5e",
    \u0E23\u0E31\u0E10\u0E27\u0E34\u0E2A\u0E32\u0E2B\u0E01\u0E34\u0E08: "#06b6d4",
    \u0E2D\u0E37\u0E48\u0E19\u0E46: "#94a3b8"
  }, et = R => G[R] || "#94a3b8", rt = ae(async () => {
    d(!0), m(null);
    try {
      let [R, V] = await Promise.all([nr(`/api/customer-insight/screening-summary?_t=${Date.now()}`, {
        credentials: "include"
      }), nr(`/api/customer-insight/monthly-trend?_t=${Date.now()}`, {
        credentials: "include"
      })]);
      e(R), n(V), nr("/api/ai/customer/segmentation", {
        credentials: "include"
      }).then(E).catch(() => {})
    } catch (R) {
      m(R.message)
    }
    d(!1)
  }, []), F = ae(async R => {
    try {
      let V = R ? `&pttype=${R}` : "",
        mt = await nr(`/api/customer-insight/top-diagnosis?${V}&_t=${Date.now()}`, {
          credentials: "include"
        });
      i(mt)
    } catch (V) {
      m(V.message)
    }
  }, []), ut = ae(async () => {
    try {
      let R = await nr(`/api/customer-insight/patient-insight?_t=${Date.now()}`, {
        credentials: "include"
      });
      u(R)
    } catch (R) {
      m(R.message)
    }
  }, []), J = ae(async () => {
    try {
      let R = await nr(`/api/customer-insight/aging?_t=${Date.now()}`, {
        credentials: "include"
      });
      c(R)
    } catch (R) {
      m(R.message)
    }
  }, []), Y = ae(async (R, V) => {
    let mt = R || A,
      yt = V || I;
    d(!0), m(null);
    try {
      let gt = await nr(`/api/customer-insight/screening-custom?from=${mt}&to=${yt}&_t=${Date.now()}`, {
        credentials: "include"
      });
      f(gt)
    } catch (gt) {
      m(gt.message)
    }
    d(!1)
  }, [A, I]), st = ae(async R => {
    _(!0);
    try {
      let V = await nr(`/api/customer-insight/payer-patients?pttype=${R}&sort_by=${K}&_t=${Date.now()}`, {
        credentials: "include"
      });
      X(V)
    } catch (V) {
      X({
        patients: [],
        error: V.message
      })
    }
    _(!1)
  }, [K]), ct = ae(R => {
    W(R), X(null), st(R.pttype_code)
  }, [st]), Pt = ae(() => {
    W(null), X(null)
  }, []);
  Mr(() => {
    rt()
  }, [rt]), Mr(() => {
    const R = Ae();
    Y(R, R)
  }, []), Mr(() => {
    g === "diagnosis" && F(b)
  }, [g, b, F]), Mr(() => {
    g === "patient-insight" && !a && ut()
  }, [g, a, ut]), Mr(() => {
    g === "aging" && !l && J()
  }, [g, l, J]), Mr(() => {
    z && st(z.pttype_code)
  }, [K, z, st]);
  let lt = t?.fiscal_years || [],
    At = lt.map(R => R.be),
    Qt = ae(() => {
      if (!x.current) return;
      let R = window.open("", "_blank");
      R.document.write(`<!DOCTYPE html><html><head><title>Customer Insight \u2014 3 \u0E1B\u0E35\u0E07\u0E1A</title>
      <style>body{font-family:Sarabun,sans-serif;padding:20px}table{border-collapse:collapse;width:100%;font-size:10px}
      th,td{border:1px solid #ccc;padding:3px 6px;text-align:right}th{background:#f0f4f8;font-weight:800}
      td:first-child,th:first-child{text-align:left}</style></head><body>`), R.document.write(x.current.outerHTML), R.document.write("</body></html>"), R.document.close(), R.print()
    }, []),
    Jt = ae(() => {
      if (!t?.payers || lt.length < 3) return;
      let R = "\uFEFF",
        V = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let nt of lt) V.push(`${nt.be} OPD`, `${nt.be} IPD`, `${nt.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${nt.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${nt.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${nt.be} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      V.push("Growth %");
      let mt = t.payers.map(nt => {
          let pt = [nt.pttype_code, nt.pttype_name];
          for (let ot of lt) {
            let ft = nt.fys[ot.be];
            pt.push(ft.opd_visits, ft.ipd_admissions, ft.total_income, ft.total_paid, ft.total_outstanding, ft.collection_rate)
          }
          return pt.push(nt.income_growth), pt
        }),
        yt = R + [V, ...mt].map(nt => nt.join(",")).join(`
`),
        gt = new Blob([yt], {
          type: "text/csv;charset=utf-8"
        }),
        kt = URL.createObjectURL(gt),
        Q = document.createElement("a");
      Q.href = kt, Q.download = "BCH360_CustomerInsight_3FY.csv", Q.click(), URL.revokeObjectURL(kt)
    }, [t, lt]),
    oe = ae(async () => {
      if (!t?.payers || lt.length < 3) return;
      let R = await import("./xlsx-BuHXVOW6.js"),
        V = R.utils.book_new(),
        mt = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let vt of lt) mt.push(`${vt.be} \u0E04\u0E23\u0E31\u0E49\u0E07`, `${vt.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${vt.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${vt.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${vt.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      mt.push("Growth %");
      let yt = t.payers.map(vt => {
          let at = [vt.pttype_code, vt.pttype_name];
          for (let bt of lt) {
            let xt = vt.fys[bt.be];
            at.push(xt.opd_visits + xt.ipd_admissions, xt.total_income, xt.total_paid, xt.total_outstanding, xt.collection_rate)
          }
          return at.push(vt.income_growth), at
        }),
        gt = R.utils.aoa_to_sheet([mt, ...yt]);
      gt["!cols"] = mt.map(vt => ({
        wch: Math.min(Math.max(vt.length + 4, 12), 28)
      })), R.utils.book_append_sheet(V, gt, "\u0E2A\u0E23\u0E38\u0E1B\u0E2A\u0E34\u0E17\u0E18\u0E34 3 \u0E1B\u0E35\u0E07\u0E1A");
      let kt = lt[2].be,
        Q = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 Xray", "% \u0E22\u0E32", "% Lab", "% Xray"],
        nt = t.payers.map(vt => {
          let at = vt.fys[kt],
            bt = at.total_income || 0;
          return [vt.pttype_code, vt.pttype_name, bt, at.opd_drug || 0, at.opd_lab || 0, at.opd_xray || 0, bt > 0 ? Math.round(at.opd_drug / bt * 1e3) / 10 : 0, bt > 0 ? Math.round(at.opd_lab / bt * 1e3) / 10 : 0, bt > 0 ? Math.round(at.opd_xray / bt * 1e3) / 10 : 0]
        }),
        pt = R.utils.aoa_to_sheet([Q, ...nt]);
      if (pt["!cols"] = Q.map(vt => ({
          wch: Math.min(Math.max(vt.length + 4, 12), 28)
        })), R.utils.book_append_sheet(V, pt, `Service Mix ${kt}`), r?.comparison) {
        let vt = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...lt.map(xt => `${xt.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`), ...lt.map(xt => `${xt.be} \u0E04\u0E23\u0E31\u0E49\u0E07`)],
          at = r.comparison.map(xt => {
            let Mt = [xt.month];
            for (let ie of lt) Mt.push(xt[`fy${ie.be}`]?.income || 0);
            for (let ie of lt) Mt.push(xt[`fy${ie.be}`]?.visits || 0);
            return Mt
          }),
          bt = R.utils.aoa_to_sheet([vt, ...at]);
        bt["!cols"] = vt.map(xt => ({
          wch: 14
        })), R.utils.book_append_sheet(V, bt, "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19")
      }
      if (l?.payers) {
        let vt = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", ...Da, "\u0E23\u0E27\u0E21\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"],
          at = l.payers.map(Mt => [Mt.pttype_code, Mt.pttype_name, ...Ca.map(ie => Mt[ie] || 0), Mt.total_outstanding || 0]),
          bt = l.grand_total || {};
        at.push(["", "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", ...Ca.map(Mt => bt[Mt] || 0), bt.total_outstanding || 0]);
        let xt = R.utils.aoa_to_sheet([vt, ...at]);
        xt["!cols"] = vt.map(Mt => ({
          wch: Math.min(Math.max(Mt.length + 4, 14), 24)
        })), R.utils.book_append_sheet(V, xt, "Aging \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30")
      }
      let ot = [
          ["BCH 360\xB0 Intelligence \u2014 Customer Insight Report"],
          [],
          ["\u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", `${At.join(" \xB7 ")}`],
          ["\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", t.data_source],
          ["\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E40\u0E21\u0E37\u0E48\u0E2D", new Date().toLocaleString("th-TH")],
          ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34", `${t.payers.length}`],
          ["\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E35\u0E48 Flag", `${t.flagged_count}`],
          [],
          ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team \xB7 BOSSART"]
        ],
        ft = R.utils.aoa_to_sheet(ot);
      ft["!cols"] = [{
        wch: 22
      }, {
        wch: 60
      }], R.utils.book_append_sheet(V, ft, "Meta"), R.writeFile(V, "BCH360_CustomerInsight_3FY.xlsx")
    }, [t, lt, At, r, l]),
    Z = {
      th: {
        padding: "6px 8px",
        fontSize: "10px",
        fontWeight: 800,
        whiteSpace: "nowrap",
        color: "var(--md-text-secondary)",
        borderBottom: "2px solid var(--md-border)",
        textAlign: "right"
      },
      td: {
        padding: "5px 8px",
        fontSize: "11px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        color: "var(--md-text-primary)",
        borderBottom: "1px solid var(--md-border)",
        textAlign: "right"
      },
      tdName: {
        padding: "5px 8px",
        fontSize: "11px",
        fontWeight: 700,
        whiteSpace: "nowrap",
        color: "var(--md-text-primary)",
        borderBottom: "1px solid var(--md-border)",
        textAlign: "left",
        maxWidth: "180px",
        overflow: "hidden",
        textOverflow: "ellipsis"
      },
      badge: (R, V) => ({
        fontSize: "9px",
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: "99px",
        background: R,
        color: V
      })
    },
    jr = ({
      label: R,
      icon: V,
      values: mt,
      unit: yt = "",
      accent: gt = "#0284c7",
      reverse: kt = !1
    }) => {
      let Q = mt[2],
        nt = mt[1],
        pt = t?.months_elapsed || 12,
        ot = pt > 0 && pt < 12 ? Math.round(nt * pt / 12) : nt,
        ft = a4(Q, ot),
        vt = kt ? ft <= 0 ? "#059669" : "#dc2626" : ft >= 0 ? "#059669" : "#dc2626",
        at = ft > 0 ? "\u25B2" : ft < 0 ? "\u25BC" : "\xB7";
      return N("div", {
        className: "rounded-2xl p-4",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          flex: "1 1 200px",
          minWidth: "190px"
        },
        children: [N("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "6px"
          },
          children: [P("span", {
            style: {
              fontSize: "18px"
            },
            children: V
          }), P("span", {
            style: {
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: R
          })]
        }), N("div", {
          style: {
            fontSize: "20px",
            fontWeight: 900,
            color: gt
          },
          children: [dt(Q), " ", P("span", {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)"
            },
            children: yt
          })]
        }), P("div", {
          style: {
            display: "flex",
            gap: "8px",
            marginTop: "6px",
            fontSize: "10px",
            fontWeight: 700
          },
          children: At.map((bt, xt) => N("span", {
            style: {
              color: xt === 2 ? gt : "var(--md-text-tertiary)"
            },
            children: [bt, ": ", dt(mt[xt])]
          }, bt))
        }), nt > 0 && N("div", {
          style: {
            marginTop: "4px",
            fontSize: "10px",
            fontWeight: 800,
            color: vt
          },
          children: [at, " ", Math.abs(ft), "% vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19", pt < 12 && N("span", {
            style: {
              marginLeft: "4px",
              fontWeight: 500,
              color: "var(--md-text-tertiary)"
            },
            children: ["(\u0E40\u0E17\u0E35\u0E22\u0E1A ", pt, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E41\u0E23\u0E01)"]
          })]
        })]
      })
    },
    Pe = ({
      active: R,
      payload: V,
      label: mt
    }) => !R || !V?.length ? null : N("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderRadius: "10px",
        padding: "10px 14px",
        fontSize: "11px",
        boxShadow: "0 4px 20px rgba(0,0,0,.08)"
      },
      children: [P("div", {
        style: {
          fontWeight: 800,
          marginBottom: "4px"
        },
        children: mt
      }), V.map((yt, gt) => N("div", {
        style: {
          display: "flex",
          gap: "6px",
          alignItems: "center"
        },
        children: [P("span", {
          style: {
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: yt.color
          }
        }), N("span", {
          style: {
            fontWeight: 600,
            color: "var(--md-text-secondary)"
          },
          children: [yt.name, ":"]
        }), P("span", {
          style: {
            fontWeight: 800
          },
          children: dt(yt.value)
        })]
      }, gt))]
    }),
    Ar = ({
      value: R
    }) => {
      if (R == null || isNaN(R)) return null;
      let V = R >= 0 ? "#059669" : "#dc2626";
      return N("span", {
        style: {
          fontSize: "9px",
          fontWeight: 800,
          color: V
        },
        children: [R >= 0 ? "+" : "", R, "%"]
      })
    };
  return N("div", {
    className: "space-y-5 animate-fade-in pb-10",
    children: [N("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [P("div", {
        style: {
          width: "4px",
          height: "24px",
          background: "linear-gradient(180deg, #7c3aed, #0284c7)",
          borderRadius: "99px"
        }
      }), P("h2", {
        style: {
          margin: 0,
          fontSize: "18px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: "Customer Insight"
      }), P("span", {
        style: Z.badge("rgba(124,58,237,.1)", "#7c3aed"),
        children: "\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \xB7 \u0E2B\u0E25\u0E31\u0E01\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2F"
      }), lt.length === 3 && N("span", {
        style: Z.badge("rgba(2,132,199,.1)", "#0284c7"),
        children: ["3 \u0E1B\u0E35\u0E07\u0E1A: ", At[0], " \xB7 ", At[1], " \xB7 ", At[2]]
      })]
    }), N("div", {
      className: "rounded-2xl p-3",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [P("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-secondary)",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px"
        },
        children: "\u{1F4C5} \u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C"
      }), ...[{
        k: "today",
        label: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49"
      }, {
        k: "yesterday",
        label: "\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E19"
      }, {
        k: "mtd",
        label: "MTD (\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49)"
      }, {
        k: "7d",
        label: "7 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
      }, {
        k: "30d",
        label: "30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
      }, {
        k: "custom",
        label: "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E2D\u0E07"
      }].map(R => P("button", {
        type: "button",
        disabled: p,
        onClick: () => {
          if (D(R.k), R.k === "custom") return;
          let V = Ae(),
            mt = Ae();
          const yt = new Date;
          R.k === "today" ? (V = Ae(), mt = Ae()) : R.k === "yesterday" ? (yt.setDate(yt.getDate() - 1), V = yt.toISOString().slice(0, 10), mt = V) : R.k === "mtd" ? (V = u4(), mt = Ae()) : R.k === "7d" ? (yt.setDate(yt.getDate() - 6), V = yt.toISOString().slice(0, 10), mt = Ae()) : R.k === "30d" && (yt.setDate(yt.getDate() - 29), V = yt.toISOString().slice(0, 10), mt = Ae()), C(V), $(mt), Y(V, mt)
        },
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          border: B === R.k ? "none" : "1px solid var(--md-border)",
          fontSize: "12px",
          fontWeight: 800,
          cursor: p ? "not-allowed" : "pointer",
          background: B === R.k ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "var(--md-bg)",
          color: B === R.k ? "#fff" : "var(--md-text-secondary)",
          transition: "all 0.15s",
          boxShadow: B === R.k ? "0 2px 8px rgba(2,132,199,.25)" : "none",
          opacity: p ? .5 : 1
        },
        children: R.label
      }, R.k)), B === "custom" && P("input", {
        type: "date",
        value: A,
        max: I,
        onChange: R => C(R.target.value),
        style: {
          padding: "6px 10px",
          borderRadius: "8px",
          border: "1px solid var(--md-border)",
          fontSize: "13px",
          fontWeight: 700,
          background: "var(--md-surface)",
          color: "var(--md-text-primary)",
          marginLeft: "4px"
        }
      }), B === "custom" && P("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)"
        },
        children: "\u0E16\u0E36\u0E07"
      }), B === "custom" && P("input", {
        type: "date",
        value: I,
        min: A,
        max: Ae(),
        onChange: R => $(R.target.value),
        style: {
          padding: "6px 10px",
          borderRadius: "8px",
          border: "1px solid var(--md-border)",
          fontSize: "13px",
          fontWeight: 700,
          background: "var(--md-surface)",
          color: "var(--md-text-primary)"
        }
      }), B === "custom" && P("button", {
        type: "button",
        onClick: () => Y(),
        disabled: p,
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 800,
          border: "none",
          cursor: p ? "not-allowed" : "pointer",
          background: p ? "#94a3b8" : "linear-gradient(135deg, #d97706, #ea580c)",
          color: "#fff"
        },
        children: "\u{1F504} \u0E42\u0E2B\u0E25\u0E14\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49"
      })]
    }), y && P("div", {
      className: "rounded-xl p-3",
      style: {
        background: "rgba(220,38,38,.08)",
        border: "1px solid rgba(220,38,38,.2)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: y
    }), p && P("div", {
      style: {
        textAlign: "center",
        padding: "60px 0",
        color: "var(--md-text-tertiary)",
        fontWeight: 700
      },
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Customer Insight (3 \u0E1B\u0E35\u0E07\u0E1A)..."
    }), !p && t && lt.length === 3 && g === "overview" && (() => {
      let R = t.grand_totals,
        V = Q => lt.map(nt => R[nt.be]?.[Q] || 0),
        mt = t.months_elapsed || 12,
        yt = (Q, nt) => {
          if (nt === 0) return null;
          let pt = Q[lt[nt].be]?.total_income || 0,
            ot = Q[lt[nt - 1].be]?.total_income || 0;
          if (nt === 2) {
            let ft = mt > 0 ? Math.round(ot * mt / 12) : ot;
            return ft > 0 ? Math.round((pt - ft) / ft * 100) : pt > 0 ? 100 : 0
          }
          return ot > 0 ? Math.round((pt - ot) / ot * 100) : pt > 0 ? 100 : 0
        },
        gt = (Q, nt, pt) => {
          if (Q === null) return P("td", {
            style: {
              ...Z.td,
              borderRight: "2px solid var(--md-border)",
              color: "var(--md-text-tertiary)"
            },
            children: "\u2014"
          }, `${nt}-d${pt}`);
          let ot = Q > 0 ? "#059669" : Q < 0 ? "#dc2626" : "var(--md-text-tertiary)",
            ft = Q > 0 ? "\u25B2" : Q < 0 ? "\u25BC" : "\xB7";
          return N("td", {
            style: {
              ...Z.td,
              fontWeight: 800,
              borderRight: "2px solid var(--md-border)",
              color: ot
            },
            children: [ft, " ", Math.abs(Q), "%"]
          }, `${nt}-d${pt}`)
        },
        kt = (r?.comparison || []).map(Q => {
          let nt = {
            month: Q.month
          };
          for (let pt of lt) nt[`fy${pt.be}`] = Q[`fy${pt.be}`]?.income || 0;
          return nt
        }).filter(Q => lt.some(nt => Q[`fy${nt.be}`] > 0));
      return N(Co, {
        children: [N("div", {
          style: {
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          },
          children: (() => {
            const Q = s?.grand_total || {},
              nt = s?.window || {},
              pt = nt.from ? `${nt.from} \u2192 ${nt.to}` : "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C",
              ot = s?.flagged_count ?? 0,
              ft = !!s,
              vt = (bt, xt, Mt, ie, Ye, ye) => N("div", {
                style: {
                  flex: "1 1 200px",
                  minWidth: "180px",
                  background: "var(--md-surface)",
                  border: "1px solid var(--md-border)",
                  borderTop: `3px solid ${Ye}`,
                  borderRadius: "12px",
                  padding: "12px 16px"
                },
                children: [N("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px"
                  },
                  children: [P("span", {
                    style: {
                      fontSize: "18px"
                    },
                    children: bt
                  }), P("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "var(--md-text-tertiary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em"
                    },
                    children: xt
                  })]
                }), N("div", {
                  style: {
                    display: "flex",
                    alignItems: "baseline",
                    gap: "6px"
                  },
                  children: [P("span", {
                    style: {
                      fontSize: "20px",
                      fontWeight: 900,
                      color: Ye,
                      lineHeight: 1.1
                    },
                    children: ft ? dt(Mt) : "\u2014"
                  }), ie && P("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--md-text-secondary)"
                    },
                    children: ie
                  })]
                }), P("div", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "4px"
                  },
                  children: ye
                })]
              }),
              at = (bt, xt, Mt, ie, Ye, ye, by) => N("div", {
                style: {
                  flex: "1 1 200px",
                  minWidth: "180px",
                  background: "var(--md-surface)",
                  border: "1px solid var(--md-border)",
                  borderTop: `3px solid ${ye}`,
                  borderRadius: "12px",
                  padding: "12px 16px"
                },
                children: [N("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px"
                  },
                  children: [P("span", {
                    style: {
                      fontSize: "18px"
                    },
                    children: bt
                  }), P("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "var(--md-text-tertiary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em"
                    },
                    children: xt
                  })]
                }), N("div", {
                  style: {
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    flexWrap: "wrap"
                  },
                  children: [N("div", {
                    style: {
                      display: "flex",
                      alignItems: "baseline",
                      gap: "4px"
                    },
                    children: [P("span", {
                      style: {
                        fontSize: "20px",
                        fontWeight: 900,
                        color: ye,
                        lineHeight: 1.1
                      },
                      children: ft ? dt(Mt) : "\u2014"
                    }), P("span", {
                      style: {
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--md-text-secondary)"
                      },
                      children: "\u0E04\u0E19"
                    })]
                  }), P("span", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: "/"
                  }), N("div", {
                    style: {
                      display: "flex",
                      alignItems: "baseline",
                      gap: "4px"
                    },
                    children: [P("span", {
                      style: {
                        fontSize: "16px",
                        fontWeight: 800,
                        color: "var(--md-text-secondary)"
                      },
                      children: ft ? dt(ie) : "\u2014"
                    }), P("span", {
                      style: {
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--md-text-secondary)"
                      },
                      children: Ye
                    })]
                  })]
                }), P("div", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "4px"
                  },
                  children: by
                })]
              });
            return [at("\u{1F465}", "OPD Visits", Q.opd_patients || 0, Q.opd_visits || 0, "\u0E04\u0E23\u0E31\u0E49\u0E07", "#0284c7", pt), at("\u{1F3E5}", "IPD Admissions", Q.ipd_patients || 0, Q.ipd_admissions || 0, "\u0E04\u0E23\u0E31\u0E49\u0E07", "#7c3aed", pt), vt("\u{1F4B0}", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21", Q.total_income || 0, "\u0E1A\u0E32\u0E17", "#059669", pt)]
          })()
        }), (s?.groups || []).length > 0 && (() => {
          const Q = lt[2]?.be,
            nt = s?.window?.from && s?.window?.to ? `${s.window.from} \u2192 ${s.window.to}` : "",
            pt = (s.groups || []).map(at => ({
              name: at.group_name,
              period_patients: at.period_patients || 0,
              period_visits: at.period_visits || 0,
              db_patients: at.db_patients || 0,
              utilization_pct: at.utilization_pct || 0,
              color: et(at.group_name)
            })).sort((at, bt) => bt.period_patients - at.period_patients),
            ot = pt.reduce((at, bt) => at + bt.period_patients, 0),
            ft = pt.reduce((at, bt) => at + bt.db_patients, 0),
            vt = pt.reduce((at, bt) => Math.max(at, bt.utilization_pct), 0);
          return N("div", {
            className: "rounded-2xl p-5",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [N("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "8px"
              },
              children: [N("div", {
                children: [P("div", {
                  style: {
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)"
                  },
                  children: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E21\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E25\u0E49\u0E27 \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E01\u0E31\u0E1A \u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14\u0E43\u0E19 database \u0E15\u0E32\u0E21\u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01"
                }), P("div", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "2px"
                  },
                  children: `\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C \xB7 \u0E0A\u0E48\u0E27\u0E07 ${nt} \xB7 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E08\u0E32\u0E01\u0E21\u0E32\u0E01\u0E44\u0E1B\u0E19\u0E49\u0E2D\u0E22`
                })]
              }), N("div", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "var(--md-text-primary)",
                  textAlign: "right"
                },
                children: ["\u0E21\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ", dt(ot), " \u0E04\u0E19 / \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", dt(ft), " \u0E04\u0E19"]
              })]
            }), N("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              },
              children: pt.map((at, bt) => {
                const xt = Math.min(100, Math.max(.5, at.utilization_pct || 0));
                return N("div", {
                  children: [N("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
                      fontSize: "12px",
                      gap: "10px",
                      flexWrap: "wrap"
                    },
                    children: [N("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      },
                      children: [P("div", {
                        style: {
                          width: "10px",
                          height: "10px",
                          borderRadius: "3px",
                          background: at.color
                        }
                      }), P("span", {
                        style: {
                          fontWeight: 700,
                          color: "var(--md-text-primary)"
                        },
                        children: at.name
                      })]
                    }), N("div", {
                      style: {
                        display: "flex",
                        gap: "12px",
                        alignItems: "baseline"
                      },
                      children: [N("span", {
                        style: {
                          fontWeight: 800,
                          color: at.color,
                          fontSize: "13px"
                        },
                        children: [dt(at.period_patients), " \u0E04\u0E19 / ", dt(at.period_visits), " \u0E04\u0E23\u0E31\u0E49\u0E07 "]
                      }), N("span", {
                        style: {
                          fontWeight: 600,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: ["/ \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", dt(at.db_patients), " \u0E04\u0E19"]
                      }), N("span", {
                        style: {
                          fontWeight: 800,
                          color: at.color,
                          fontSize: "12px",
                          minWidth: "50px",
                          textAlign: "right"
                        },
                        children: [(at.utilization_pct || 0).toFixed(1), "%"]
                      })]
                    })]
                  }), P("div", {
                    style: {
                      width: "100%",
                      height: "10px",
                      background: "var(--md-bg, rgba(0,0,0,.04))",
                      borderRadius: "6px",
                      overflow: "hidden",
                      position: "relative"
                    },
                    children: P("div", {
                      style: {
                        width: `${xt}%`,
                        height: "100%",
                        background: `linear-gradient(90deg, ${at.color}, ${at.color}cc)`,
                        borderRadius: "6px",
                        transition: "width 0.3s ease-out"
                      }
                    })
                  })]
                }, at.name || bt)
              })
            }), N("div", {
              style: {
                marginTop: "16px",
                padding: "10px 12px",
                background: "rgba(2,132,199,.06)",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                fontWeight: 800
              },
              children: [P("span", {
                style: {
                  color: "#0284c7"
                },
                children: `\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${pt.length} \u0E2B\u0E21\u0E27\u0E14`
              }), N("span", {
                style: {
                  color: "var(--md-text-primary)"
                },
                children: ["\u0E21\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ", dt(ot), " \u0E04\u0E19 / \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", dt(ft), " \u0E04\u0E19 \xB7 Utilization \u0E23\u0E27\u0E21 ", ft > 0 ? (ot / ft * 100).toFixed(1) : "0", "%"]
              })]
            })]
          })
        })(), N("div", {
          className: "rounded-2xl",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            overflow: "hidden"
          },
          ref: x,
          children: [N("div", {
            style: {
              padding: "14px 20px",
              borderBottom: "2px solid var(--md-border)",
              background: "linear-gradient(135deg, rgba(124,58,237,.04), rgba(2,132,199,.04))",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px"
            },
            children: [N("div", {
              children: [N("div", {
                style: {
                  fontSize: "15px",
                  fontWeight: 900,
                  color: "var(--md-text-primary)"
                },
                children: ["\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E41\u0E22\u0E01\u0E15\u0E32\u0E21", j === "groups" ? "\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C (9 \u0E2B\u0E21\u0E27\u0E14)" : "\u0E2A\u0E34\u0E17\u0E18\u0E34", " \u2014 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 (", At.join(" \xB7 "), ")"]
              }), P("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: "\u0E2B\u0E25\u0E31\u0E01\u0E40\u0E01\u0E13\u0E11\u0E4C \u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23 \u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02 \u0E01\u0E32\u0E23\u0E02\u0E2D\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2F \xB7 \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E35\u0E48\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A <80% (\u0E1B\u0E35\u0E07\u0E1A\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14) \u0E08\u0E30\u0E16\u0E39\u0E01 Flag"
              })]
            }), N("div", {
              style: {
                display: "flex",
                gap: "6px"
              },
              children: [P("button", {
                onClick: () => k("groups"),
                style: {
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: j === "groups" ? "1.5px solid #7c3aed" : "1px solid var(--md-border)",
                  background: j === "groups" ? "rgba(124,58,237,.08)" : "var(--md-surface)",
                  color: j === "groups" ? "#7c3aed" : "var(--md-text-secondary)"
                },
                children: "\u{1F4E6} 9 \u0E2B\u0E21\u0E27\u0E14"
              }), P("button", {
                onClick: () => k("pttype"),
                style: {
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: j === "pttype" ? "1.5px solid #7c3aed" : "1px solid var(--md-border)",
                  background: j === "pttype" ? "rgba(124,58,237,.08)" : "var(--md-surface)",
                  color: j === "pttype" ? "#7c3aed" : "var(--md-text-secondary)"
                },
                children: "\u{1F4CB} pttype \u0E23\u0E32\u0E22\u0E15\u0E31\u0E27"
              })]
            })]
          }), P("div", {
            style: {
              overflowX: "auto"
            },
            children: N("table", {
              style: {
                width: "100%",
                borderCollapse: "collapse"
              },
              children: [N("thead", {
                children: [N("tr", {
                  style: {
                    background: "var(--md-surface-2, rgba(0,0,0,.02))"
                  },
                  children: [P("th", {
                    rowSpan: 2,
                    style: {
                      ...Z.th,
                      textAlign: "left",
                      paddingLeft: "14px",
                      borderRight: "2px solid var(--md-border)",
                      verticalAlign: "bottom"
                    },
                    children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                  }), lt.map((Q, nt) => N("th", {
                    colSpan: 3,
                    style: {
                      ...Z.th,
                      textAlign: "center",
                      borderRight: "2px solid var(--md-border)",
                      background: `${Ta[nt]}10`,
                      color: Ta[nt],
                      fontSize: "11px"
                    },
                    children: ["\u0E1B\u0E35\u0E07\u0E1A ", Q.be, nt === 2 ? " (\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19)" : ""]
                  }, Q.be)), P("th", {
                    rowSpan: 2,
                    style: {
                      ...Z.th,
                      textAlign: "center",
                      verticalAlign: "bottom"
                    },
                    children: "\u0E2A\u0E16\u0E32\u0E19\u0E30"
                  })]
                }), P("tr", {
                  style: {
                    background: "var(--md-surface-2, rgba(0,0,0,.02))"
                  },
                  children: lt.map((Q, nt) => N(ir.Fragment, {
                    children: [P("th", {
                      style: {
                        ...Z.th,
                        fontSize: "9px"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), P("th", {
                      style: {
                        ...Z.th,
                        fontSize: "9px"
                      },
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), P("th", {
                      style: {
                        ...Z.th,
                        fontSize: "9px",
                        borderRight: "2px solid var(--md-border)"
                      },
                      children: nt === 0 ? "\u2014" : `\u0394% vs ${lt[nt-1].be}`
                    })]
                  }, Q.be))
                })]
              }), P("tbody", {
                children: j === "groups" ? (t.groups || []).map((Q, nt) => {
                  let pt = Q.flag_low_collection || Q.flag_high_outstanding,
                    ot = et(Q.group_name),
                    ft = M.has(Q.group_name),
                    vt = t.payers.filter(at => at.group_name === Q.group_name);
                  return N(ir.Fragment, {
                    children: [N("tr", {
                      style: {
                        background: `${ot}10`,
                        borderTop: `2px solid ${ot}40`,
                        cursor: "pointer"
                      },
                      onClick: () => H(Q.group_name),
                      children: [P("td", {
                        style: {
                          ...Z.tdName,
                          paddingLeft: "14px",
                          borderRight: "2px solid var(--md-border)"
                        },
                        children: N("span", {
                          style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px"
                          },
                          children: [P("span", {
                            style: {
                              width: 10,
                              height: 10,
                              borderRadius: 2,
                              background: ot,
                              display: "inline-block"
                            }
                          }), P("span", {
                            style: {
                              fontSize: "13px",
                              fontWeight: 900,
                              color: ot
                            },
                            children: Q.group_name
                          }), N("span", {
                            style: {
                              fontSize: "10px",
                              fontWeight: 600,
                              color: "var(--md-text-tertiary)"
                            },
                            children: ["(", Q.pttype_count, " pttype)"]
                          }), P("span", {
                            style: {
                              marginLeft: "auto",
                              fontSize: "10px",
                              color: "var(--md-text-tertiary)"
                            },
                            children: ft ? "\u25BC" : "\u25B6"
                          })]
                        })
                      }), lt.map((at, bt) => {
                        let xt = Q.fys[at.be],
                          Mt = yt(Q.fys, bt);
                        return N(ir.Fragment, {
                          children: [P("td", {
                            style: {
                              ...Z.td,
                              fontWeight: 800
                            },
                            children: dt(xt.opd_visits + xt.ipd_admissions)
                          }), P("td", {
                            style: {
                              ...Z.td,
                              fontWeight: 800
                            },
                            children: dt(xt.total_income)
                          }), gt(Mt, `gh${nt}`, bt)]
                        }, at.be)
                      }), P("td", {
                        style: {
                          ...Z.td,
                          textAlign: "center"
                        },
                        children: pt ? P("span", {
                          style: Z.badge("rgba(220,38,38,.1)", "#dc2626"),
                          children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                        }) : P("span", {
                          style: Z.badge("rgba(5,150,105,.1)", "#059669"),
                          children: "\u0E1B\u0E01\u0E15\u0E34"
                        })
                      })]
                    }), ft && vt.map((at, bt) => {
                      let xt = at.flag_low_collection || at.flag_high_outstanding;
                      return N("tr", {
                        style: {
                          background: bt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                        },
                        children: [N("td", {
                          style: {
                            ...Z.tdName,
                            paddingLeft: "36px",
                            borderRight: "2px solid var(--md-border)",
                            fontSize: "10px"
                          },
                          children: [P("span", {
                            style: {
                              color: "var(--md-text-tertiary)",
                              marginRight: "6px"
                            },
                            children: "\u21B3"
                          }), P("span", {
                            style: {
                              fontWeight: 700
                            },
                            children: at.pttype_code
                          }), P("span", {
                            style: {
                              marginLeft: "4px",
                              fontWeight: 500,
                              color: "var(--md-text-secondary)"
                            },
                            children: at.pttype_name
                          }), P("button", {
                            onClick: Mt => {
                              Mt.stopPropagation(), ct(at)
                            },
                            style: {
                              marginLeft: "6px",
                              fontSize: "9px",
                              padding: "1px 5px",
                              borderRadius: "4px",
                              border: "1px solid var(--md-border)",
                              background: "transparent",
                              color: "var(--md-text-tertiary)",
                              cursor: "pointer"
                            },
                            children: "\u{1F50D}"
                          })]
                        }), lt.map((Mt, ie) => {
                          let Ye = at.fys[Mt.be],
                            ye = yt(at.fys, ie);
                          return N(ir.Fragment, {
                            children: [P("td", {
                              style: {
                                ...Z.td,
                                fontSize: "10px"
                              },
                              children: dt(Ye.opd_visits + Ye.ipd_admissions)
                            }), P("td", {
                              style: {
                                ...Z.td,
                                fontSize: "10px"
                              },
                              children: dt(Ye.total_income)
                            }), ye === null ? P("td", {
                              style: {
                                ...Z.td,
                                fontSize: "10px",
                                borderRight: "2px solid var(--md-border)",
                                color: "var(--md-text-tertiary)"
                              },
                              children: "\u2014"
                            }) : N("td", {
                              style: {
                                ...Z.td,
                                fontSize: "10px",
                                fontWeight: 700,
                                borderRight: "2px solid var(--md-border)",
                                color: ye > 0 ? "#059669" : ye < 0 ? "#dc2626" : "var(--md-text-tertiary)"
                              },
                              children: [ye > 0 ? "\u25B2" : ye < 0 ? "\u25BC" : "\xB7", " ", Math.abs(ye), "%"]
                            })]
                          }, Mt.be)
                        }), P("td", {
                          style: {
                            ...Z.td,
                            textAlign: "center",
                            fontSize: "9px"
                          },
                          children: xt ? P("span", {
                            style: Z.badge("rgba(220,38,38,.08)", "#dc2626"),
                            children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                          }) : P("span", {
                            style: Z.badge("rgba(5,150,105,.08)", "#059669"),
                            children: "\u0E1B\u0E01\u0E15\u0E34"
                          })
                        })]
                      }, `${Q.group_name}-${at.pttype_code}`)
                    })]
                  }, Q.group_name)
                }) : t.payers.map((Q, nt) => {
                  let pt = Q.flag_low_collection || Q.flag_high_outstanding,
                    ot = pt ? "rgba(220,38,38,.04)" : nt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))";
                  return N("tr", {
                    style: {
                      background: ot
                    },
                    children: [P("td", {
                      style: {
                        ...Z.tdName,
                        paddingLeft: "14px",
                        borderRight: "2px solid var(--md-border)"
                      },
                      children: N("button", {
                        onClick: () => ct(Q),
                        style: {
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          textAlign: "left"
                        },
                        children: [P("span", {
                          style: {
                            fontWeight: 800,
                            textDecoration: "underline dotted"
                          },
                          children: Q.pttype_code
                        }), P("span", {
                          style: {
                            marginLeft: "4px",
                            fontWeight: 600,
                            color: "var(--md-text-secondary)",
                            fontSize: "10px"
                          },
                          children: Q.pttype_name
                        }), Q.group_name && P("span", {
                          style: {
                            marginLeft: "6px",
                            fontSize: "9px",
                            fontWeight: 700,
                            color: et(Q.group_name),
                            padding: "1px 6px",
                            borderRadius: "99px",
                            background: `${et(Q.group_name)}15`
                          },
                          children: Q.group_name
                        })]
                      })
                    }), lt.map((ft, vt) => {
                      let at = Q.fys[ft.be],
                        bt = yt(Q.fys, vt);
                      return N(ir.Fragment, {
                        children: [P("td", {
                          style: Z.td,
                          children: dt(at.opd_visits + at.ipd_admissions)
                        }), P("td", {
                          style: {
                            ...Z.td,
                            fontWeight: 700
                          },
                          children: dt(at.total_income)
                        }), gt(bt, `p${nt}`, vt)]
                      }, ft.be)
                    }), P("td", {
                      style: {
                        ...Z.td,
                        textAlign: "center"
                      },
                      children: pt ? P("span", {
                        style: Z.badge("rgba(220,38,38,.1)", "#dc2626"),
                        children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                      }) : P("span", {
                        style: Z.badge("rgba(5,150,105,.1)", "#059669"),
                        children: "\u0E1B\u0E01\u0E15\u0E34"
                      })
                    })]
                  }, Q.pttype_code)
                })
              }), P("tfoot", {
                children: N("tr", {
                  style: {
                    background: "rgba(14,165,233,.06)"
                  },
                  children: [P("td", {
                    style: {
                      ...Z.td,
                      textAlign: "left",
                      paddingLeft: "14px",
                      fontWeight: 900,
                      borderRight: "2px solid var(--md-border)",
                      borderTop: "2px solid var(--md-border)"
                    },
                    children: "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
                  }), lt.map((Q, nt) => {
                    let pt = R[Q.be],
                      ot = yt(R, nt),
                      ft = ot > 0 ? "#059669" : ot < 0 ? "#dc2626" : "var(--md-text-tertiary)",
                      vt = ot > 0 ? "\u25B2" : ot < 0 ? "\u25BC" : "\xB7";
                    return N(ir.Fragment, {
                      children: [P("td", {
                        style: {
                          ...Z.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: dt(pt.opd_visits + pt.ipd_admissions)
                      }), P("td", {
                        style: {
                          ...Z.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: dt(pt.total_income)
                      }), P("td", {
                        style: {
                          ...Z.td,
                          fontWeight: 900,
                          borderRight: "2px solid var(--md-border)",
                          borderTop: "2px solid var(--md-border)",
                          color: ot === null ? "var(--md-text-tertiary)" : ft
                        },
                        children: ot === null ? "\u2014" : `${vt} ${Math.abs(ot)}%`
                      })]
                    }, Q.be)
                  }), P("td", {
                    style: {
                      ...Z.td,
                      borderTop: "2px solid var(--md-border)"
                    }
                  })]
                })
              })]
            })
          })]
        })]
      })
    })(), !p && t && lt.length === 3 && g === "payer-detail" && (() => {
      let R = t.payers.filter(V => V._sort_income > 0).slice(0, 12).map(V => {
        let mt = {
          name: V.pttype_code
        };
        for (let yt of lt) mt[`fy${yt.be}`] = V.fys[yt.be].total_income;
        return mt
      });
      return N(Co, {
        children: [N("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [P("div", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              marginBottom: "12px"
            },
            children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34 (Top 12) \u2014 3 \u0E1B\u0E35\u0E07\u0E1A\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A"
          }), P(F1, {
            width: "100%",
            height: 350,
            children: N(n4, {
              data: R,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [P(Lh, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), P(Ao, {
                dataKey: "name",
                tick: {
                  fontSize: 10,
                  fontWeight: 700
                },
                interval: 0,
                angle: -30,
                textAnchor: "end",
                height: 50
              }), P(Po, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: V => V >= 1e6 ? `${(V/1e6).toFixed(1)}M` : V >= 1e3 ? `${(V/1e3).toFixed(0)}K` : V
              }), P(Me, {
                content: P(Pe, {})
              }), P(cr, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), lt.map((V, mt) => P(Er, {
                dataKey: `fy${V.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${V.be}`,
                fill: Ta[mt],
                radius: [3, 3, 0, 0]
              }, V.be))]
            })
          })]
        }), P("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "12px"
          },
          children: t.payers.filter(V => V._sort_income > 0).slice(0, 20).map((V, mt) => {
            let yt = V.flag_low_collection || V.flag_high_outstanding,
              gt = V.fys[lt[2].be];
            return N("div", {
              className: "rounded-2xl p-4",
              style: {
                background: "var(--md-surface)",
                border: yt ? "1.5px solid rgba(220,38,38,.3)" : "1px solid var(--md-border)"
              },
              children: [N("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px"
                },
                children: [N("button", {
                  onClick: () => ct(V),
                  style: {
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left"
                  },
                  title: "\u0E04\u0E25\u0E34\u0E01\u0E14\u0E39\u0E23\u0E32\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Top 50",
                  children: [P("span", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: gy[mt % gy.length],
                      textDecoration: "underline dotted"
                    },
                    children: V.pttype_code
                  }), P("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-secondary)",
                      marginLeft: "6px"
                    },
                    children: V.pttype_name
                  }), P("span", {
                    style: {
                      marginLeft: "6px",
                      fontSize: "10px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: "\u{1F50D}"
                  })]
                }), yt ? P("span", {
                  style: Z.badge("rgba(220,38,38,.1)", "#dc2626"),
                  children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                }) : P("span", {
                  style: Z.badge("rgba(5,150,105,.1)", "#059669"),
                  children: "\u0E1B\u0E01\u0E15\u0E34"
                })]
              }), (() => {
                let kt = V.fys[lt[2].be],
                  Q = kt.opd_drug || 0,
                  nt = kt.opd_lab || 0,
                  pt = kt.opd_xray || 0,
                  ot = Q + nt + pt;
                if (ot === 0) return null;
                let ft = Q / ot * 100,
                  vt = nt / ot * 100,
                  at = pt / ot * 100;
                return N("div", {
                  style: {
                    marginBottom: "8px"
                  },
                  children: [N("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "9px",
                      fontWeight: 700,
                      marginBottom: "3px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: [P("span", {
                      children: "Service Mix (\u0E1B\u0E35\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14)"
                    }), N("span", {
                      children: [dt(ot), " \u0E1A\u0E32\u0E17"]
                    })]
                  }), N("div", {
                    style: {
                      display: "flex",
                      height: "8px",
                      borderRadius: "99px",
                      overflow: "hidden",
                      background: "var(--md-surface-2, rgba(0,0,0,.04))"
                    },
                    children: [Q > 0 && P("div", {
                      style: {
                        width: `${ft}%`,
                        background: mn.drug
                      },
                      title: `\u{1F48A} \u0E04\u0E48\u0E32\u0E22\u0E32: ${dt(Q)} \u0E1A\u0E32\u0E17 (${ft.toFixed(1)}%)`
                    }), nt > 0 && P("div", {
                      style: {
                        width: `${vt}%`,
                        background: mn.lab
                      },
                      title: `\u{1F52C} \u0E04\u0E48\u0E32 Lab: ${dt(nt)} \u0E1A\u0E32\u0E17 (${vt.toFixed(1)}%)`
                    }), pt > 0 && P("div", {
                      style: {
                        width: `${at}%`,
                        background: mn.xray
                      },
                      title: `\u2622\uFE0F \u0E04\u0E48\u0E32 X-ray: ${dt(pt)} \u0E1A\u0E32\u0E17 (${at.toFixed(1)}%)`
                    })]
                  }), N("div", {
                    style: {
                      display: "flex",
                      gap: "10px",
                      fontSize: "9px",
                      fontWeight: 700,
                      marginTop: "3px"
                    },
                    children: [Q > 0 && N("span", {
                      style: {
                        color: mn.drug
                      },
                      children: ["\u{1F48A} \u0E22\u0E32 ", ft.toFixed(0), "%"]
                    }), nt > 0 && N("span", {
                      style: {
                        color: mn.lab
                      },
                      children: ["\u{1F52C} Lab ", vt.toFixed(0), "%"]
                    }), pt > 0 && N("span", {
                      style: {
                        color: mn.xray
                      },
                      children: ["\u2622\uFE0F Xray ", at.toFixed(0), "%"]
                    })]
                  })]
                })
              })(), N("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "10px"
                },
                children: [P("thead", {
                  children: N("tr", {
                    children: [P("th", {
                      style: {
                        textAlign: "left",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E1B\u0E35\u0E07\u0E1A"
                    }), P("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), P("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), P("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                    }), P("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                    })]
                  })
                }), P("tbody", {
                  children: lt.map((kt, Q) => {
                    let nt = V.fys[kt.be];
                    return N("tr", {
                      style: {
                        fontWeight: Q === 2 ? 800 : 600
                      },
                      children: [P("td", {
                        style: {
                          textAlign: "left",
                          padding: "3px 4px",
                          color: Ta[Q]
                        },
                        children: kt.be
                      }), P("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: dt(nt.opd_visits + nt.ipd_admissions)
                      }), P("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: dt(nt.total_income)
                      }), P("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: nt.total_outstanding > 0 ? "#dc2626" : "inherit"
                        },
                        children: dt(nt.total_outstanding)
                      }), P("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: nt.collection_rate >= 90 ? "#059669" : nt.collection_rate >= 80 ? "#d97706" : "#dc2626"
                        },
                        children: nt.total_income > 0 ? Ma(nt.collection_rate) : "\u2014"
                      })]
                    }, kt.be)
                  })
                })]
              }), N("div", {
                style: {
                  marginTop: "6px",
                  fontSize: "10px",
                  fontWeight: 800
                },
                children: [P("span", {
                  style: {
                    color: "var(--md-text-tertiary)"
                  },
                  children: "Growth: "
                }), P(Ar, {
                  value: V.income_growth
                }), gt.ipd_avg_rw > 0 && N("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["Avg RW: ", P("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: gt.ipd_avg_rw.toFixed(2)
                  })]
                }), gt.ipd_avg_los > 0 && N("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["LOS: ", N("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: [gt.ipd_avg_los.toFixed(1), "d"]
                  })]
                })]
              })]
            }, V.pttype_code)
          })
        })]
      })
    })(), !p && g === "diagnosis" && N(Co, {
      children: [N("div", {
        className: "rounded-2xl p-4",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap"
        },
        children: [P("span", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-secondary)"
          },
          children: "\u0E01\u0E23\u0E2D\u0E07\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34"
        }), N("select", {
          value: b || "",
          onChange: R => w(R.target.value || null),
          style: {
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 700,
            background: "var(--md-surface)",
            color: "var(--md-text-primary)"
          },
          children: [P("option", {
            value: "",
            children: "\u0E17\u0E38\u0E01\u0E2A\u0E34\u0E17\u0E18\u0E34"
          }), (t?.payers || []).map(R => N("option", {
            value: R.pttype_code,
            children: [R.pttype_code, " \u2014 ", R.pttype_name]
          }, R.pttype_code))]
        })]
      }), o?.diagnoses && N("div", {
        className: "rounded-2xl",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          overflow: "hidden"
        },
        children: [P("div", {
          style: {
            padding: "14px 20px",
            borderBottom: "2px solid var(--md-border)",
            background: "linear-gradient(135deg, rgba(124,58,237,.04), rgba(2,132,199,.04))"
          },
          children: N("div", {
            style: {
              fontSize: "15px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: ["Top \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23 \u2014 \u0E1B\u0E35\u0E07\u0E1A ", o.fiscal_year?.be || At[2], b && N("span", {
              style: {
                ...Z.badge("rgba(124,58,237,.1)", "#7c3aed"),
                marginLeft: "8px"
              },
              children: ["\u0E2A\u0E34\u0E17\u0E18\u0E34: ", b]
            })]
          })
        }), P("div", {
          style: {
            overflowX: "auto"
          },
          children: N("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse"
            },
            children: [P("thead", {
              children: N("tr", {
                style: {
                  background: "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [P("th", {
                  style: {
                    ...Z.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), P("th", {
                  style: {
                    ...Z.th,
                    textAlign: "left"
                  },
                  children: "ICD-10"
                }), P("th", {
                  style: {
                    ...Z.th,
                    textAlign: "left"
                  },
                  children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23"
                }), P("th", {
                  style: Z.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), P("th", {
                  style: Z.th,
                  children: "\u0E04\u0E19"
                }), P("th", {
                  style: Z.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                })]
              })
            }), P("tbody", {
              children: o.diagnoses.map((R, V) => N("tr", {
                style: {
                  background: V % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [P("td", {
                  style: {
                    ...Z.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: V + 1
                }), P("td", {
                  style: {
                    ...Z.td,
                    textAlign: "left",
                    fontWeight: 800,
                    fontFamily: "monospace"
                  },
                  children: R.icd10
                }), P("td", {
                  style: Z.tdName,
                  children: R.name
                }), P("td", {
                  style: Z.td,
                  children: dt(R.visits)
                }), P("td", {
                  style: Z.td,
                  children: dt(R.patients)
                }), P("td", {
                  style: {
                    ...Z.td,
                    fontWeight: 700
                  },
                  children: dt(R.income)
                })]
              }, R.icd10))
            })]
          })
        })]
      })]
    }), !p && g === "patient-insight" && (a ? (() => {
      let R = a.loyalty,
        V = a.demographics,
        mt = a.inactive,
        yt = a.fiscal_year?.be,
        gt = V.age_bands,
        kt = gt.lt18 + gt.a18_34 + gt.a35_59 + gt.gte60,
        Q = V.sex.male + V.sex.female,
        nt = R.total_unique - Q,
        pt = ot => ot ? new Date(ot).toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }) : "\u2014";
      return N(Co, {
        children: [N("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px"
          },
          children: [N("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #0284c7"
            },
            children: [N("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: ["\u{1F465} \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E1B\u0E35\u0E07\u0E1A ", yt]
            }), P("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#0284c7",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: dt(R.total_unique)
            }), N("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [dt(R.total_visits), " visits \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", P("b", {
                children: R.avg_visits_per_patient
              }), " \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19"]
            })]
          }), N("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #059669"
            },
            children: [P("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u2728 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48 (First Visit \u0E43\u0E19\u0E1B\u0E35\u0E19\u0E35\u0E49)"
            }), P("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#059669",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: dt(R.new_patients)
            }), N("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [P("b", {
                style: {
                  color: "#059669"
                },
                children: Ma(R.new_pct)
              }), " \u0E02\u0E2D\u0E07 ", dt(R.total_unique), " \u0E23\u0E32\u0E22"]
            })]
          }), N("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #7c3aed"
            },
            children: [P("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u{1F501} \u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33"
            }), P("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#7c3aed",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: dt(R.returning_patients)
            }), N("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [P("b", {
                style: {
                  color: "#7c3aed"
                },
                children: Ma(R.returning_pct)
              }), " \xB7 Retention rate"]
            })]
          }), N("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #d97706"
            },
            children: [P("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21"
            }), P("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#d97706",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: dt(R.total_income)
            }), N("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: ["\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", P("b", {
                children: dt(R.total_unique > 0 ? Math.round(R.total_income / R.total_unique) : 0)
              }), " \u0E1A\u0E32\u0E17/\u0E04\u0E19"]
            })]
          })]
        }), N("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "12px"
          },
          children: [N("div", {
            className: "rounded-2xl p-5",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [P("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)",
                marginBottom: "12px"
              },
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38"
            }), [{
              label: "<18 \u0E1B\u0E35 (\u0E40\u0E14\u0E47\u0E01/\u0E40\u0E22\u0E32\u0E27\u0E0A\u0E19)",
              val: gt.lt18,
              color: "#3b82f6"
            }, {
              label: "18-34 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19\u0E15\u0E49\u0E19)",
              val: gt.a18_34,
              color: "#10b981"
            }, {
              label: "35-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E01\u0E25\u0E32\u0E07)",
              val: gt.a35_59,
              color: "#f59e0b"
            }, {
              label: "60+ \u0E1B\u0E35 (\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38)",
              val: gt.gte60,
              color: "#ef4444"
            }].map(ot => {
              let ft = kt > 0 ? ot.val / kt * 100 : 0;
              return N("div", {
                style: {
                  marginBottom: "10px"
                },
                children: [N("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    fontWeight: 700,
                    marginBottom: "4px"
                  },
                  children: [P("span", {
                    style: {
                      color: "var(--md-text-secondary)"
                    },
                    children: ot.label
                  }), N("span", {
                    style: {
                      color: ot.color,
                      fontVariantNumeric: "tabular-nums"
                    },
                    children: [dt(ot.val), " ", N("span", {
                      style: {
                        color: "var(--md-text-tertiary)",
                        fontWeight: 600
                      },
                      children: ["(", ft.toFixed(1), "%)"]
                    })]
                  })]
                }), P("div", {
                  style: {
                    height: "8px",
                    background: "var(--md-surface-2, rgba(0,0,0,.04))",
                    borderRadius: "99px",
                    overflow: "hidden"
                  },
                  children: P("div", {
                    style: {
                      width: `${ft}%`,
                      height: "100%",
                      background: ot.color,
                      borderRadius: "99px",
                      transition: "width .4s ease"
                    }
                  })
                })]
              }, ot.label)
            })]
          }), N("div", {
            className: "rounded-2xl p-5",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [P("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)",
                marginBottom: "12px"
              },
              children: "\u0E40\u0E1E\u0E28"
            }), N("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              },
              children: [
                [{
                  label: "\u0E0A\u0E32\u0E22",
                  val: V.sex.male,
                  color: "#3b82f6",
                  icon: "\u2642"
                }, {
                  label: "\u0E2B\u0E0D\u0E34\u0E07",
                  val: V.sex.female,
                  color: "#ec4899",
                  icon: "\u2640"
                }].map(ot => {
                  let ft = Q > 0 ? ot.val / Q * 100 : 0;
                  return N("div", {
                    children: [N("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "4px"
                      },
                      children: [N("span", {
                        style: {
                          fontSize: "12px",
                          fontWeight: 700,
                          color: ot.color
                        },
                        children: [ot.icon, " ", ot.label]
                      }), P("span", {
                        style: {
                          fontSize: "14px",
                          fontWeight: 900,
                          color: ot.color,
                          fontVariantNumeric: "tabular-nums"
                        },
                        children: dt(ot.val)
                      })]
                    }), N("div", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        marginBottom: "4px"
                      },
                      children: [ft.toFixed(1), "%"]
                    }), P("div", {
                      style: {
                        height: "6px",
                        background: "var(--md-surface-2, rgba(0,0,0,.04))",
                        borderRadius: "99px",
                        overflow: "hidden"
                      },
                      children: P("div", {
                        style: {
                          width: `${ft}%`,
                          height: "100%",
                          background: ot.color,
                          borderRadius: "99px"
                        }
                      })
                    })]
                  }, ot.label)
                }), nt > 0 && N("div", {
                  style: {
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: ["\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38: ", dt(nt), " \u0E23\u0E32\u0E22"]
                })
              ]
            })]
          })]
        }), N("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [N("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
              flexWrap: "wrap",
              gap: "8px"
            },
            children: [P("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)"
              },
              children: "\u{1F4DE} \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E02\u0E32\u0E14\u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 (Recall Opportunity)"
            }), N("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: ["Total \u0E17\u0E35\u0E48\u0E40\u0E04\u0E22\u0E21\u0E32\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", dt(mt.total_patients_ever), " \u0E23\u0E32\u0E22"]
            })]
          }), P("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px"
            },
            children: [{
              label: "\u0E02\u0E32\u0E14 3-6 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: mt.inactive_3_6mo,
              color: "#d97706",
              hint: "\u0E43\u0E01\u0E25\u0E49\u0E40\u0E02\u0E49\u0E32\u0E19\u0E31\u0E14 \xB7 proactive call"
            }, {
              label: "\u0E02\u0E32\u0E14 6-12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: mt.inactive_6_12mo,
              color: "#dc2626",
              hint: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35 \xB7 NCD/chronic risk"
            }, {
              label: "\u0E02\u0E32\u0E14 >12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: mt.inactive_12mo_plus,
              color: "#7c3aed",
              hint: "\u0E23\u0E2D\u0E1A recall \u0E43\u0E2B\u0E0D\u0E48 \xB7 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E2B\u0E32\u0E22\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27"
            }].map(ot => N("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: `${ot.color}08`,
                border: `1px solid ${ot.color}25`
              },
              children: [P("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 700,
                  color: ot.color,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  marginBottom: "4px"
                },
                children: ot.label
              }), P("div", {
                style: {
                  fontSize: "22px",
                  fontWeight: 900,
                  color: ot.color,
                  fontVariantNumeric: "tabular-nums"
                },
                children: dt(ot.val)
              }), P("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-secondary)",
                  marginTop: "4px"
                },
                children: ot.hint
              })]
            }, ot.label))
          })]
        }), P("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
            gap: "12px"
          },
          children: [{
            title: "\u2B50 Top 20 \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14",
            list: a.top_high_value,
            accent: "#d97706",
            hint: "Target retention / care management"
          }, {
            title: "\u{1F501} Top 20 \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14",
            list: a.top_high_frequency,
            accent: "#7c3aed",
            hint: "Chronic care candidates"
          }].map(ot => N("div", {
            className: "rounded-2xl",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              overflow: "hidden"
            },
            children: [N("div", {
              style: {
                padding: "12px 16px",
                borderBottom: "2px solid var(--md-border)",
                background: `linear-gradient(135deg, ${ot.accent}08, transparent)`
              },
              children: [P("div", {
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                  color: ot.accent
                },
                children: ot.title
              }), P("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: ot.hint
              })]
            }), P("div", {
              style: {
                overflowX: "auto",
                maxHeight: "480px",
                overflowY: "auto"
              },
              children: N("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse"
                },
                children: [P("thead", {
                  style: {
                    position: "sticky",
                    top: 0,
                    background: "var(--md-surface)",
                    zIndex: 1
                  },
                  children: N("tr", {
                    children: [P("th", {
                      style: {
                        ...Z.th,
                        textAlign: "center",
                        width: "32px"
                      },
                      children: "#"
                    }), P("th", {
                      style: {
                        ...Z.th,
                        textAlign: "left"
                      },
                      children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                    }), P("th", {
                      style: Z.th,
                      children: "\u0E2D\u0E32\u0E22\u0E38"
                    }), P("th", {
                      style: Z.th,
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), P("th", {
                      style: Z.th,
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), P("th", {
                      style: {
                        ...Z.th,
                        textAlign: "left"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                    })]
                  })
                }), N("tbody", {
                  children: [(ot.list || []).map((ft, vt) => N("tr", {
                    style: {
                      background: vt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                    },
                    children: [P("td", {
                      style: {
                        ...Z.td,
                        textAlign: "center",
                        color: "var(--md-text-tertiary)"
                      },
                      children: vt + 1
                    }), N("td", {
                      style: Z.tdName,
                      children: [P("div", {
                        style: {
                          fontFamily: "monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "var(--md-text-tertiary)"
                        },
                        children: ft.hn
                      }), P("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: 700
                        },
                        children: ft.pt_name || "\u2014"
                      })]
                    }), P("td", {
                      style: Z.td,
                      children: ft.age || "\u2014"
                    }), P("td", {
                      style: {
                        ...Z.td,
                        fontWeight: 800,
                        color: ot.accent
                      },
                      children: dt(ft.visit_count)
                    }), P("td", {
                      style: {
                        ...Z.td,
                        fontWeight: 800
                      },
                      children: dt(ft.total_income)
                    }), P("td", {
                      style: {
                        ...Z.td,
                        textAlign: "left",
                        fontSize: "10px",
                        color: "var(--md-text-secondary)"
                      },
                      children: pt(ft.last_visit)
                    })]
                  }, ft.hn)), (!ot.list || ot.list.length === 0) && P("tr", {
                    children: P("td", {
                      colSpan: 6,
                      style: {
                        ...Z.td,
                        textAlign: "center",
                        color: "var(--md-text-tertiary)",
                        padding: "24px"
                      },
                      children: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
                    })
                  })]
                })]
              })
            })]
          }, ot.title))
        })]
      })
    })() : P("div", {
      style: {
        textAlign: "center",
        padding: "40px 0",
        color: "var(--md-text-tertiary)",
        fontWeight: 700
      },
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23..."
    })), !p && g === "aging" && (l ? (() => {
      let R = l.payers || [],
        V = l.grand_total || {},
        mt = V.total_outstanding || 0;
      return N(Co, {
        children: [N("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [N("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "12px",
              flexWrap: "wrap",
              gap: "8px"
            },
            children: [P("div", {
              style: {
                fontSize: "14px",
                fontWeight: 800,
                color: "var(--md-text-primary)"
              },
              children: "\u23F1\uFE0F \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E2B\u0E19\u0E35\u0E49 (Outstanding Aging)"
            }), N("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: [l.window?.from, " \u2192 ", l.window?.to, " \xB7 \u0E19\u0E31\u0E1A\u0E08\u0E32\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E21\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"]
            })]
          }), N("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "10px"
            },
            children: [Ca.map((yt, gt) => {
              let kt = V[yt] || 0,
                Q = mt > 0 ? kt / mt * 100 : 0;
              return N("div", {
                style: {
                  padding: "12px",
                  borderRadius: "10px",
                  background: `${yn[gt]}10`,
                  borderLeft: `4px solid ${yn[gt]}`
                },
                children: [P("div", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 800,
                    color: yn[gt],
                    textTransform: "uppercase",
                    letterSpacing: ".04em"
                  },
                  children: Da[gt]
                }), P("div", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    fontFamily: "monospace",
                    marginTop: "4px"
                  },
                  children: dt(kt)
                }), N("div", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: yn[gt],
                    marginTop: "2px"
                  },
                  children: [Q.toFixed(1), "%"]
                })]
              }, yt)
            }), N("div", {
              style: {
                padding: "12px",
                borderRadius: "10px",
                background: "rgba(0,0,0,.04)",
                borderLeft: "4px solid var(--md-text-secondary)"
              },
              children: [P("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "var(--md-text-secondary)",
                  textTransform: "uppercase"
                },
                children: "\u0E23\u0E27\u0E21"
              }), P("div", {
                style: {
                  fontSize: "20px",
                  fontWeight: 900,
                  color: "var(--md-text-primary)",
                  fontFamily: "monospace",
                  marginTop: "4px"
                },
                children: dt(mt)
              }), P("div", {
                style: {
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--md-text-secondary)",
                  marginTop: "2px"
                },
                children: "\u0E1A\u0E32\u0E17"
              })]
            })]
          })]
        }), N("div", {
          className: "rounded-2xl",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            overflow: "hidden"
          },
          children: [P("div", {
            style: {
              padding: "12px 18px",
              borderBottom: "1px solid var(--md-border)",
              background: "linear-gradient(135deg, rgba(220,38,38,.04), rgba(217,119,6,.04))"
            },
            children: P("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)"
              },
              children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34 \u2014 \u0E2A\u0E35\u0E40\u0E02\u0E49\u0E21\u0E02\u0E36\u0E49\u0E19 = \u0E2B\u0E19\u0E35\u0E49\u0E40\u0E01\u0E48\u0E32 (\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 write-off)"
            })
          }), N("div", {
            style: {
              padding: "12px 18px"
            },
            children: [R.map((yt, gt) => {
              let kt = Ca.map((Q, nt) => ({
                v: yt[Q] || 0,
                color: yn[nt],
                label: Da[nt]
              }));
              return N("div", {
                style: {
                  marginBottom: "12px"
                },
                children: [N("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "4px"
                  },
                  children: [N("button", {
                    onClick: () => ct(yt),
                    style: {
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left"
                    },
                    title: "\u0E04\u0E25\u0E34\u0E01\u0E14\u0E39\u0E23\u0E32\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
                    children: [P("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        textDecoration: "underline dotted"
                      },
                      children: yt.pttype_code
                    }), P("span", {
                      style: {
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--md-text-secondary)",
                        marginLeft: "6px"
                      },
                      children: yt.pttype_name
                    })]
                  }), N("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 900,
                      fontFamily: "monospace",
                      color: "var(--md-text-primary)"
                    },
                    children: [dt(yt.total_outstanding), " \u0E1A\u0E32\u0E17"]
                  })]
                }), P("div", {
                  style: {
                    display: "flex",
                    height: "24px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "var(--md-surface-2, rgba(0,0,0,.04))"
                  },
                  children: kt.map((Q, nt) => {
                    if (Q.v === 0) return null;
                    let pt = yt.total_outstanding > 0 ? Q.v / yt.total_outstanding * 100 : 0;
                    return P("div", {
                      style: {
                        width: `${pt}%`,
                        background: Q.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                      },
                      title: `${Q.label}: ${dt(Q.v)} \u0E1A\u0E32\u0E17 (${pt.toFixed(1)}%)`,
                      children: pt >= 8 && N("span", {
                        style: {
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#fff",
                          textShadow: "0 0 3px rgba(0,0,0,.3)"
                        },
                        children: [pt.toFixed(0), "%"]
                      })
                    }, nt)
                  })
                })]
              }, yt.pttype_code)
            }), R.length === 0 && P("div", {
              style: {
                textAlign: "center",
                padding: "24px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700
              },
              children: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E43\u0E19\u0E1B\u0E35\u0E07\u0E1A\u0E19\u0E35\u0E49"
            })]
          })]
        }), P("div", {
          className: "rounded-2xl p-3",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center"
          },
          children: Da.map((yt, gt) => N("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px"
            },
            children: [P("span", {
              style: {
                width: "14px",
                height: "14px",
                borderRadius: "3px",
                background: yn[gt]
              }
            }), P("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--md-text-secondary)"
              },
              children: yt
            })]
          }, yt))
        })]
      })
    })() : P("div", {
      style: {
        textAlign: "center",
        padding: "40px 0",
        color: "var(--md-text-tertiary)",
        fontWeight: 700
      },
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30..."
    })), z && P("div", {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,.6)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      },
      onClick: Pt,
      children: N("div", {
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "900px",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        onClick: R => R.stopPropagation(),
        children: [N("div", {
          style: {
            padding: "14px 20px",
            borderBottom: "2px solid var(--md-border)",
            background: "linear-gradient(135deg, rgba(124,58,237,.06), rgba(2,132,199,.06))",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px"
          },
          children: [N("div", {
            children: [N("div", {
              style: {
                fontSize: "15px",
                fontWeight: 900,
                color: "var(--md-text-primary)"
              },
              children: ["\u{1F50D} \u0E23\u0E32\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u2014 \u0E2A\u0E34\u0E17\u0E18\u0E34 ", z.pttype_code]
            }), P("div", {
              style: {
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginTop: "2px"
              },
              children: z.pttype_name
            })]
          }), N("div", {
            style: {
              display: "flex",
              gap: "8px",
              alignItems: "center"
            },
            children: [P("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)"
              },
              children: "\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21"
            }), N("select", {
              value: K,
              onChange: R => O(R.target.value),
              style: {
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid var(--md-border)",
                fontSize: "11px",
                fontWeight: 700,
                background: "var(--md-surface)",
                color: "var(--md-text-primary)"
              },
              children: [P("option", {
                value: "outstanding",
                children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14"
              }), P("option", {
                value: "income",
                children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14"
              }), P("option", {
                value: "visits",
                children: "\u0E21\u0E32\u0E1A\u0E48\u0E2D\u0E22\u0E2A\u0E38\u0E14"
              })]
            }), P("button", {
              onClick: Pt,
              style: {
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid var(--md-border)",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                background: "var(--md-surface)",
                color: "var(--md-text-secondary)"
              },
              children: "\u0E1B\u0E34\u0E14 \u2715"
            })]
          })]
        }), P("div", {
          style: {
            overflowY: "auto",
            flex: 1
          },
          children: S ? P("div", {
            style: {
              padding: "40px",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14..."
          }) : L?.patients?.length ? N("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse"
            },
            children: [P("thead", {
              style: {
                position: "sticky",
                top: 0,
                background: "var(--md-surface)",
                zIndex: 1
              },
              children: N("tr", {
                children: [P("th", {
                  style: {
                    ...Z.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), P("th", {
                  style: {
                    ...Z.th,
                    textAlign: "left"
                  },
                  children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                }), P("th", {
                  style: Z.th,
                  children: "\u0E2D\u0E32\u0E22\u0E38"
                }), P("th", {
                  style: Z.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), P("th", {
                  style: Z.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                }), P("th", {
                  style: Z.th,
                  children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                }), P("th", {
                  style: Z.th,
                  children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                }), P("th", {
                  style: {
                    ...Z.th,
                    textAlign: "left"
                  },
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                })]
              })
            }), P("tbody", {
              children: L.patients.map((R, V) => N("tr", {
                style: {
                  background: V % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [P("td", {
                  style: {
                    ...Z.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: V + 1
                }), N("td", {
                  style: Z.tdName,
                  children: [P("div", {
                    style: {
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: R.hn
                  }), P("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700
                    },
                    children: R.pt_name || "\u2014"
                  })]
                }), P("td", {
                  style: Z.td,
                  children: R.age || "\u2014"
                }), P("td", {
                  style: Z.td,
                  children: dt(R.visit_count)
                }), P("td", {
                  style: {
                    ...Z.td,
                    fontWeight: 800
                  },
                  children: dt(R.total_income)
                }), P("td", {
                  style: {
                    ...Z.td,
                    fontWeight: 800,
                    color: R.total_outstanding > 0 ? "#dc2626" : "inherit"
                  },
                  children: dt(R.total_outstanding)
                }), P("td", {
                  style: {
                    ...Z.td,
                    fontWeight: 800,
                    color: R.collection_rate >= 90 ? "#059669" : R.collection_rate >= 80 ? "#d97706" : "#dc2626"
                  },
                  children: Ma(R.collection_rate)
                }), P("td", {
                  style: {
                    ...Z.td,
                    textAlign: "left",
                    fontSize: "10px",
                    color: "var(--md-text-secondary)"
                  },
                  children: R.last_visit ? new Date(R.last_visit).toLocaleDateString("th-TH", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  }) : "\u2014"
                })]
              }, R.hn))
            })]
          }) : P("div", {
            style: {
              padding: "40px",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: L?.error || "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E19\u0E35\u0E49 (\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19)"
          })
        }), N("div", {
          style: {
            padding: "8px 20px",
            borderTop: "1px solid var(--md-border)",
            fontSize: "10px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)",
            textAlign: "center"
          },
          children: [L?.patients?.length ? `\u0E41\u0E2A\u0E14\u0E07 ${L.patients.length} \u0E23\u0E32\u0E22 (Top ${L.limit||50})` : "", "\xB7 \u0E1B\u0E35\u0E07\u0E1A ", L?.fiscal_year?.be || ""]
        })]
      })
    }), P(o4, {
      data: v,
      theme: "customer",
      title: "AI Customer Intelligence"
    }), !p && t && N("div", {
      style: {
        textAlign: "center",
        fontSize: "10px",
        fontWeight: 600,
        color: "var(--md-text-tertiary)",
        padding: "8px 0"
      },
      children: [t.data_source, " \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ", new Date(t.timestamp).toLocaleString("th-TH")]
    })]
  })
}
var c4 = ir.memo(l4);
export {
  c4 as
  default
};