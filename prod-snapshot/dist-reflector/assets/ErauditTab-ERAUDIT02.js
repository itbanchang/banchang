var UT = Object.create;
var Fl = Object.defineProperty;
var GT = Object.getOwnPropertyDescriptor;
var KT = Object.getOwnPropertyNames;
var VT = Object.getPrototypeOf,
  YT = Object.prototype.hasOwnProperty;
var I = (e, t) => () => (t || e((t = {
    exports: {}
  }).exports, t), t.exports),
  XT = (e, t) => {
    for (var r in t) Fl(e, r, {
      get: t[r],
      enumerable: !0
    })
  },
  ZT = (e, t, r, n) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let i of KT(t)) !YT.call(e, i) && i !== r && Fl(e, i, {
        get: () => t[i],
        enumerable: !(n = GT(t, i)) || n.enumerable
      });
    return e
  };
var J = (e, t, r) => (r = e != null ? UT(VT(e)) : {}, ZT(t || !e || !e.__esModule ? Fl(r, "default", {
  value: e,
  enumerable: !0
}) : r, e));
var rt = I((rG, om) => {
  var QT = Array.isArray;
  om.exports = QT
});
var Wl = I((nG, am) => {
  var e_ = typeof global == "object" && global && global.Object === Object && global;
  am.exports = e_
});
var qt = I((iG, um) => {
  var t_ = Wl(),
    r_ = typeof self == "object" && self && self.Object === Object && self,
    n_ = t_ || r_ || Function("return this")();
  um.exports = n_
});
var En = I((oG, sm) => {
  var i_ = qt(),
    o_ = i_.Symbol;
  sm.exports = o_
});
var pm = I((aG, fm) => {
  var lm = En(),
    cm = Object.prototype,
    a_ = cm.hasOwnProperty,
    u_ = cm.toString,
    ro = lm ? lm.toStringTag : void 0;

  function s_(e) {
    var t = a_.call(e, ro),
      r = e[ro];
    try {
      e[ro] = void 0;
      var n = !0
    } catch {}
    var i = u_.call(e);
    return n && (t ? e[ro] = r : delete e[ro]), i
  }
  fm.exports = s_
});
var mm = I((uG, dm) => {
  var l_ = Object.prototype,
    c_ = l_.toString;

  function f_(e) {
    return c_.call(e)
  }
  dm.exports = f_
});
var Jt = I((sG, vm) => {
  var hm = En(),
    p_ = pm(),
    d_ = mm(),
    m_ = "[object Null]",
    h_ = "[object Undefined]",
    ym = hm ? hm.toStringTag : void 0;

  function y_(e) {
    return e == null ? e === void 0 ? h_ : m_ : ym && ym in Object(e) ? p_(e) : d_(e)
  }
  vm.exports = y_
});
var Qt = I((lG, gm) => {
  function v_(e) {
    return e != null && typeof e == "object"
  }
  gm.exports = v_
});
var Fr = I((cG, bm) => {
  var g_ = Jt(),
    b_ = Qt(),
    x_ = "[object Symbol]";

  function w_(e) {
    return typeof e == "symbol" || b_(e) && g_(e) == x_
  }
  bm.exports = w_
});
var Ya = I((fG, xm) => {
  var O_ = rt(),
    S_ = Fr(),
    A_ = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    P_ = /^\w*$/;

  function T_(e, t) {
    if (O_(e)) return !1;
    var r = typeof e;
    return r == "number" || r == "symbol" || r == "boolean" || e == null || S_(e) ? !0 : P_.test(e) || !A_.test(e) || t != null && e in Object(t)
  }
  xm.exports = T_
});
var wt = I((pG, wm) => {
  function __(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function")
  }
  wm.exports = __
});
var _e = I((dG, Om) => {
  var E_ = Jt(),
    j_ = wt(),
    k_ = "[object AsyncFunction]",
    M_ = "[object Function]",
    C_ = "[object GeneratorFunction]",
    I_ = "[object Proxy]";

  function N_(e) {
    if (!j_(e)) return !1;
    var t = E_(e);
    return t == M_ || t == C_ || t == k_ || t == I_
  }
  Om.exports = N_
});
var Am = I((mG, Sm) => {
  var D_ = qt(),
    R_ = D_["__core-js_shared__"];
  Sm.exports = R_
});
var _m = I((hG, Tm) => {
  var zl = Am(),
    Pm = function() {
      var e = /[^.]+$/.exec(zl && zl.keys && zl.keys.IE_PROTO || "");
      return e ? "Symbol(src)_1." + e : ""
    }();

  function L_(e) {
    return !!Pm && Pm in e
  }
  Tm.exports = L_
});
var Hl = I((yG, Em) => {
  var B_ = Function.prototype,
    q_ = B_.toString;

  function $_(e) {
    if (e != null) {
      try {
        return q_.call(e)
      } catch {}
      try {
        return e + ""
      } catch {}
    }
    return ""
  }
  Em.exports = $_
});
var km = I((vG, jm) => {
  var F_ = _e(),
    W_ = _m(),
    z_ = wt(),
    H_ = Hl(),
    U_ = /[\\^$.*+?()[\]{}|]/g,
    G_ = /^\[object .+?Constructor\]$/,
    K_ = Function.prototype,
    V_ = Object.prototype,
    Y_ = K_.toString,
    X_ = V_.hasOwnProperty,
    Z_ = RegExp("^" + Y_.call(X_).replace(U_, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

  function J_(e) {
    if (!z_(e) || W_(e)) return !1;
    var t = F_(e) ? Z_ : G_;
    return t.test(H_(e))
  }
  jm.exports = J_
});
var Cm = I((gG, Mm) => {
  function Q_(e, t) {
    return e?.[t]
  }
  Mm.exports = Q_
});
var Sr = I((bG, Im) => {
  var eE = km(),
    tE = Cm();

  function rE(e, t) {
    var r = tE(e, t);
    return eE(r) ? r : void 0
  }
  Im.exports = rE
});
var no = I((xG, Nm) => {
  var nE = Sr(),
    iE = nE(Object, "create");
  Nm.exports = iE
});
var Lm = I((wG, Rm) => {
  var Dm = no();

  function oE() {
    this.__data__ = Dm ? Dm(null) : {}, this.size = 0
  }
  Rm.exports = oE
});
var qm = I((OG, Bm) => {
  function aE(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t
  }
  Bm.exports = aE
});
var Fm = I((SG, $m) => {
  var uE = no(),
    sE = "__lodash_hash_undefined__",
    lE = Object.prototype,
    cE = lE.hasOwnProperty;

  function fE(e) {
    var t = this.__data__;
    if (uE) {
      var r = t[e];
      return r === sE ? void 0 : r
    }
    return cE.call(t, e) ? t[e] : void 0
  }
  $m.exports = fE
});
var zm = I((AG, Wm) => {
  var pE = no(),
    dE = Object.prototype,
    mE = dE.hasOwnProperty;

  function hE(e) {
    var t = this.__data__;
    return pE ? t[e] !== void 0 : mE.call(t, e)
  }
  Wm.exports = hE
});
var Um = I((PG, Hm) => {
  var yE = no(),
    vE = "__lodash_hash_undefined__";

  function gE(e, t) {
    var r = this.__data__;
    return this.size += this.has(e) ? 0 : 1, r[e] = yE && t === void 0 ? vE : t, this
  }
  Hm.exports = gE
});
var Km = I((TG, Gm) => {
  var bE = Lm(),
    xE = qm(),
    wE = Fm(),
    OE = zm(),
    SE = Um();

  function jn(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
      var n = e[t];
      this.set(n[0], n[1])
    }
  }
  jn.prototype.clear = bE;
  jn.prototype.delete = xE;
  jn.prototype.get = wE;
  jn.prototype.has = OE;
  jn.prototype.set = SE;
  Gm.exports = jn
});
var Ym = I((_G, Vm) => {
  function AE() {
    this.__data__ = [], this.size = 0
  }
  Vm.exports = AE
});
var Xa = I((EG, Xm) => {
  function PE(e, t) {
    return e === t || e !== e && t !== t
  }
  Xm.exports = PE
});
var io = I((jG, Zm) => {
  var TE = Xa();

  function _E(e, t) {
    for (var r = e.length; r--;)
      if (TE(e[r][0], t)) return r;
    return -1
  }
  Zm.exports = _E
});
var Qm = I((kG, Jm) => {
  var EE = io(),
    jE = Array.prototype,
    kE = jE.splice;

  function ME(e) {
    var t = this.__data__,
      r = EE(t, e);
    if (r < 0) return !1;
    var n = t.length - 1;
    return r == n ? t.pop() : kE.call(t, r, 1), --this.size, !0
  }
  Jm.exports = ME
});
var th = I((MG, eh) => {
  var CE = io();

  function IE(e) {
    var t = this.__data__,
      r = CE(t, e);
    return r < 0 ? void 0 : t[r][1]
  }
  eh.exports = IE
});
var nh = I((CG, rh) => {
  var NE = io();

  function DE(e) {
    return NE(this.__data__, e) > -1
  }
  rh.exports = DE
});
var oh = I((IG, ih) => {
  var RE = io();

  function LE(e, t) {
    var r = this.__data__,
      n = RE(r, e);
    return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this
  }
  ih.exports = LE
});
var oo = I((NG, ah) => {
  var BE = Ym(),
    qE = Qm(),
    $E = th(),
    FE = nh(),
    WE = oh();

  function kn(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
      var n = e[t];
      this.set(n[0], n[1])
    }
  }
  kn.prototype.clear = BE;
  kn.prototype.delete = qE;
  kn.prototype.get = $E;
  kn.prototype.has = FE;
  kn.prototype.set = WE;
  ah.exports = kn
});
var Za = I((DG, uh) => {
  var zE = Sr(),
    HE = qt(),
    UE = zE(HE, "Map");
  uh.exports = UE
});
var ch = I((RG, lh) => {
  var sh = Km(),
    GE = oo(),
    KE = Za();

  function VE() {
    this.size = 0, this.__data__ = {
      hash: new sh,
      map: new(KE || GE),
      string: new sh
    }
  }
  lh.exports = VE
});
var ph = I((LG, fh) => {
  function YE(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
  }
  fh.exports = YE
});
var ao = I((BG, dh) => {
  var XE = ph();

  function ZE(e, t) {
    var r = e.__data__;
    return XE(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map
  }
  dh.exports = ZE
});
var hh = I((qG, mh) => {
  var JE = ao();

  function QE(e) {
    var t = JE(this, e).delete(e);
    return this.size -= t ? 1 : 0, t
  }
  mh.exports = QE
});
var vh = I(($G, yh) => {
  var ej = ao();

  function tj(e) {
    return ej(this, e).get(e)
  }
  yh.exports = tj
});
var bh = I((FG, gh) => {
  var rj = ao();

  function nj(e) {
    return rj(this, e).has(e)
  }
  gh.exports = nj
});
var wh = I((WG, xh) => {
  var ij = ao();

  function oj(e, t) {
    var r = ij(this, e),
      n = r.size;
    return r.set(e, t), this.size += r.size == n ? 0 : 1, this
  }
  xh.exports = oj
});
var Ja = I((zG, Oh) => {
  var aj = ch(),
    uj = hh(),
    sj = vh(),
    lj = bh(),
    cj = wh();

  function Mn(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
      var n = e[t];
      this.set(n[0], n[1])
    }
  }
  Mn.prototype.clear = aj;
  Mn.prototype.delete = uj;
  Mn.prototype.get = sj;
  Mn.prototype.has = lj;
  Mn.prototype.set = cj;
  Oh.exports = Mn
});
var Gl = I((HG, Ah) => {
  var Sh = Ja(),
    fj = "Expected a function";

  function Ul(e, t) {
    if (typeof e != "function" || t != null && typeof t != "function") throw new TypeError(fj);
    var r = function() {
      var n = arguments,
        i = t ? t.apply(this, n) : n[0],
        o = r.cache;
      if (o.has(i)) return o.get(i);
      var a = e.apply(this, n);
      return r.cache = o.set(i, a) || o, a
    };
    return r.cache = new(Ul.Cache || Sh), r
  }
  Ul.Cache = Sh;
  Ah.exports = Ul
});
var Th = I((UG, Ph) => {
  var pj = Gl(),
    dj = 500;

  function mj(e) {
    var t = pj(e, function(n) {
        return r.size === dj && r.clear(), n
      }),
      r = t.cache;
    return t
  }
  Ph.exports = mj
});
var Eh = I((GG, _h) => {
  var hj = Th(),
    yj = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    vj = /\\(\\)?/g,
    gj = hj(function(e) {
      var t = [];
      return e.charCodeAt(0) === 46 && t.push(""), e.replace(yj, function(r, n, i, o) {
        t.push(i ? o.replace(vj, "$1") : n || r)
      }), t
    });
  _h.exports = gj
});
var Qa = I((KG, jh) => {
  function bj(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n;) i[r] = t(e[r], r, e);
    return i
  }
  jh.exports = bj
});
var Dh = I((VG, Nh) => {
  var kh = En(),
    xj = Qa(),
    wj = rt(),
    Oj = Fr(),
    Sj = 1 / 0,
    Mh = kh ? kh.prototype : void 0,
    Ch = Mh ? Mh.toString : void 0;

  function Ih(e) {
    if (typeof e == "string") return e;
    if (wj(e)) return xj(e, Ih) + "";
    if (Oj(e)) return Ch ? Ch.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -Sj ? "-0" : t
  }
  Nh.exports = Ih
});
var Kl = I((YG, Rh) => {
  var Aj = Dh();

  function Pj(e) {
    return e == null ? "" : Aj(e)
  }
  Rh.exports = Pj
});
var Vl = I((XG, Lh) => {
  var Tj = rt(),
    _j = Ya(),
    Ej = Eh(),
    jj = Kl();

  function kj(e, t) {
    return Tj(e) ? e : _j(e, t) ? [e] : Ej(jj(e))
  }
  Lh.exports = kj
});
var uo = I((ZG, Bh) => {
  var Mj = Fr(),
    Cj = 1 / 0;

  function Ij(e) {
    if (typeof e == "string" || Mj(e)) return e;
    var t = e + "";
    return t == "0" && 1 / e == -Cj ? "-0" : t
  }
  Bh.exports = Ij
});
var eu = I((JG, qh) => {
  var Nj = Vl(),
    Dj = uo();

  function Rj(e, t) {
    t = Nj(t, e);
    for (var r = 0, n = t.length; e != null && r < n;) e = e[Dj(t[r++])];
    return r && r == n ? e : void 0
  }
  qh.exports = Rj
});
var Ar = I((QG, $h) => {
  var Lj = eu();

  function Bj(e, t, r) {
    var n = e == null ? void 0 : Lj(e, t);
    return n === void 0 ? r : n
  }
  $h.exports = Bj
});
var ft = I((eK, Fh) => {
  function qj(e) {
    return e == null
  }
  Fh.exports = qj
});
var tu = I((tK, Wh) => {
  var $j = Jt(),
    Fj = rt(),
    Wj = Qt(),
    zj = "[object String]";

  function Hj(e) {
    return typeof e == "string" || !Fj(e) && Wj(e) && $j(e) == zj
  }
  Wh.exports = Hj
});
var Hh = I(be => {
  "use strict";
  var Yl = Symbol.for("react.element"),
    Xl = Symbol.for("react.portal"),
    ru = Symbol.for("react.fragment"),
    nu = Symbol.for("react.strict_mode"),
    iu = Symbol.for("react.profiler"),
    ou = Symbol.for("react.provider"),
    au = Symbol.for("react.context"),
    Uj = Symbol.for("react.server_context"),
    uu = Symbol.for("react.forward_ref"),
    su = Symbol.for("react.suspense"),
    lu = Symbol.for("react.suspense_list"),
    cu = Symbol.for("react.memo"),
    fu = Symbol.for("react.lazy"),
    Gj = Symbol.for("react.offscreen"),
    zh;
  zh = Symbol.for("react.module.reference");

  function Ot(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case Yl:
          switch (e = e.type, e) {
            case ru:
            case iu:
            case nu:
            case su:
            case lu:
              return e;
            default:
              switch (e = e && e.$$typeof, e) {
                case Uj:
                case au:
                case uu:
                case fu:
                case cu:
                case ou:
                  return e;
                default:
                  return t
              }
          }
        case Xl:
          return t
      }
    }
  }
  be.ContextConsumer = au;
  be.ContextProvider = ou;
  be.Element = Yl;
  be.ForwardRef = uu;
  be.Fragment = ru;
  be.Lazy = fu;
  be.Memo = cu;
  be.Portal = Xl;
  be.Profiler = iu;
  be.StrictMode = nu;
  be.Suspense = su;
  be.SuspenseList = lu;
  be.isAsyncMode = function() {
    return !1
  };
  be.isConcurrentMode = function() {
    return !1
  };
  be.isContextConsumer = function(e) {
    return Ot(e) === au
  };
  be.isContextProvider = function(e) {
    return Ot(e) === ou
  };
  be.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Yl
  };
  be.isForwardRef = function(e) {
    return Ot(e) === uu
  };
  be.isFragment = function(e) {
    return Ot(e) === ru
  };
  be.isLazy = function(e) {
    return Ot(e) === fu
  };
  be.isMemo = function(e) {
    return Ot(e) === cu
  };
  be.isPortal = function(e) {
    return Ot(e) === Xl
  };
  be.isProfiler = function(e) {
    return Ot(e) === iu
  };
  be.isStrictMode = function(e) {
    return Ot(e) === nu
  };
  be.isSuspense = function(e) {
    return Ot(e) === su
  };
  be.isSuspenseList = function(e) {
    return Ot(e) === lu
  };
  be.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === ru || e === iu || e === nu || e === su || e === lu || e === Gj || typeof e == "object" && e !== null && (e.$$typeof === fu || e.$$typeof === cu || e.$$typeof === ou || e.$$typeof === au || e.$$typeof === uu || e.$$typeof === zh || e.getModuleId !== void 0)
  };
  be.typeOf = Ot
});
var Gh = I((nK, Uh) => {
  "use strict";
  Uh.exports = Hh()
});
var Zl = I((iK, Kh) => {
  var Kj = Jt(),
    Vj = Qt(),
    Yj = "[object Number]";

  function Xj(e) {
    return typeof e == "number" || Vj(e) && Kj(e) == Yj
  }
  Kh.exports = Xj
});
var Jl = I((oK, Vh) => {
  var Zj = Zl();

  function Jj(e) {
    return Zj(e) && e != +e
  }
  Vh.exports = Jj
});
var yy = I((AK, hy) => {
  function vk(e, t, r) {
    var n = -1,
      i = e.length;
    t < 0 && (t = -t > i ? 0 : i + t), r = r > i ? i : r, r < 0 && (r += i), i = t > r ? 0 : r - t >>> 0, t >>>= 0;
    for (var o = Array(i); ++n < i;) o[n] = e[n + t];
    return o
  }
  hy.exports = vk
});
var gy = I((PK, vy) => {
  var gk = yy();

  function bk(e, t, r) {
    var n = e.length;
    return r = r === void 0 ? n : r, !t && r >= n ? e : gk(e, t, r)
  }
  vy.exports = bk
});
var pc = I((TK, by) => {
  var xk = "\\ud800-\\udfff",
    wk = "\\u0300-\\u036f",
    Ok = "\\ufe20-\\ufe2f",
    Sk = "\\u20d0-\\u20ff",
    Ak = wk + Ok + Sk,
    Pk = "\\ufe0e\\ufe0f",
    Tk = "\\u200d",
    _k = RegExp("[" + Tk + xk + Ak + Pk + "]");

  function Ek(e) {
    return _k.test(e)
  }
  by.exports = Ek
});
var wy = I((_K, xy) => {
  function jk(e) {
    return e.split("")
  }
  xy.exports = jk
});
var jy = I((EK, Ey) => {
  var Oy = "\\ud800-\\udfff",
    kk = "\\u0300-\\u036f",
    Mk = "\\ufe20-\\ufe2f",
    Ck = "\\u20d0-\\u20ff",
    Ik = kk + Mk + Ck,
    Nk = "\\ufe0e\\ufe0f",
    Dk = "[" + Oy + "]",
    dc = "[" + Ik + "]",
    mc = "\\ud83c[\\udffb-\\udfff]",
    Rk = "(?:" + dc + "|" + mc + ")",
    Sy = "[^" + Oy + "]",
    Ay = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    Py = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    Lk = "\\u200d",
    Ty = Rk + "?",
    _y = "[" + Nk + "]?",
    Bk = "(?:" + Lk + "(?:" + [Sy, Ay, Py].join("|") + ")" + _y + Ty + ")*",
    qk = _y + Ty + Bk,
    $k = "(?:" + [Sy + dc + "?", dc, Ay, Py, Dk].join("|") + ")",
    Fk = RegExp(mc + "(?=" + mc + ")|" + $k + qk, "g");

  function Wk(e) {
    return e.match(Fk) || []
  }
  Ey.exports = Wk
});
var My = I((jK, ky) => {
  var zk = wy(),
    Hk = pc(),
    Uk = jy();

  function Gk(e) {
    return Hk(e) ? Uk(e) : zk(e)
  }
  ky.exports = Gk
});
var Iy = I((kK, Cy) => {
  var Kk = gy(),
    Vk = pc(),
    Yk = My(),
    Xk = Kl();

  function Zk(e) {
    return function(t) {
      t = Xk(t);
      var r = Vk(t) ? Yk(t) : void 0,
        n = r ? r[0] : t.charAt(0),
        i = r ? Kk(r, 1).join("") : t.slice(1);
      return n[e]() + i
    }
  }
  Cy.exports = Zk
});
var hu = I((MK, Ny) => {
  var Jk = Iy(),
    Qk = Jk("toUpperCase");
  Ny.exports = Qk
});
var ov = I((DV, iv) => {
  var kM = oo();

  function MM() {
    this.__data__ = new kM, this.size = 0
  }
  iv.exports = MM
});
var uv = I((RV, av) => {
  function CM(e) {
    var t = this.__data__,
      r = t.delete(e);
    return this.size = t.size, r
  }
  av.exports = CM
});
var lv = I((LV, sv) => {
  function IM(e) {
    return this.__data__.get(e)
  }
  sv.exports = IM
});
var fv = I((BV, cv) => {
  function NM(e) {
    return this.__data__.has(e)
  }
  cv.exports = NM
});
var dv = I((qV, pv) => {
  var DM = oo(),
    RM = Za(),
    LM = Ja(),
    BM = 200;

  function qM(e, t) {
    var r = this.__data__;
    if (r instanceof DM) {
      var n = r.__data__;
      if (!RM || n.length < BM - 1) return n.push([e, t]), this.size = ++r.size, this;
      r = this.__data__ = new LM(n)
    }
    return r.set(e, t), this.size = r.size, this
  }
  pv.exports = qM
});
var Vc = I(($V, mv) => {
  var $M = oo(),
    FM = ov(),
    WM = uv(),
    zM = lv(),
    HM = fv(),
    UM = dv();

  function Hn(e) {
    var t = this.__data__ = new $M(e);
    this.size = t.size
  }
  Hn.prototype.clear = FM;
  Hn.prototype.delete = WM;
  Hn.prototype.get = zM;
  Hn.prototype.has = HM;
  Hn.prototype.set = UM;
  mv.exports = Hn
});
var yv = I((FV, hv) => {
  var GM = "__lodash_hash_undefined__";

  function KM(e) {
    return this.__data__.set(e, GM), this
  }
  hv.exports = KM
});
var gv = I((WV, vv) => {
  function VM(e) {
    return this.__data__.has(e)
  }
  vv.exports = VM
});
var Yc = I((zV, bv) => {
  var YM = Ja(),
    XM = yv(),
    ZM = gv();

  function Au(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.__data__ = new YM; ++t < r;) this.add(e[t])
  }
  Au.prototype.add = Au.prototype.push = XM;
  Au.prototype.has = ZM;
  bv.exports = Au
});
var Xc = I((HV, xv) => {
  function JM(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n;)
      if (t(e[r], r, e)) return !0;
    return !1
  }
  xv.exports = JM
});
var Zc = I((UV, wv) => {
  function QM(e, t) {
    return e.has(t)
  }
  wv.exports = QM
});
var Jc = I((GV, Ov) => {
  var eC = Yc(),
    tC = Xc(),
    rC = Zc(),
    nC = 1,
    iC = 2;

  function oC(e, t, r, n, i, o) {
    var a = r & nC,
      u = e.length,
      s = t.length;
    if (u != s && !(a && s > u)) return !1;
    var l = o.get(e),
      f = o.get(t);
    if (l && f) return l == t && f == e;
    var c = -1,
      p = !0,
      h = r & iC ? new eC : void 0;
    for (o.set(e, t), o.set(t, e); ++c < u;) {
      var g = e[c],
        m = t[c];
      if (n) var b = a ? n(m, g, c, t, e, o) : n(g, m, c, e, t, o);
      if (b !== void 0) {
        if (b) continue;
        p = !1;
        break
      }
      if (h) {
        if (!tC(t, function(w, A) {
            if (!rC(h, A) && (g === w || i(g, w, r, n, o))) return h.push(A)
          })) {
          p = !1;
          break
        }
      } else if (!(g === m || i(g, m, r, n, o))) {
        p = !1;
        break
      }
    }
    return o.delete(e), o.delete(t), p
  }
  Ov.exports = oC
});
var Av = I((KV, Sv) => {
  var aC = qt(),
    uC = aC.Uint8Array;
  Sv.exports = uC
});
var Tv = I((VV, Pv) => {
  function sC(e) {
    var t = -1,
      r = Array(e.size);
    return e.forEach(function(n, i) {
      r[++t] = [i, n]
    }), r
  }
  Pv.exports = sC
});
var Pu = I((YV, _v) => {
  function lC(e) {
    var t = -1,
      r = Array(e.size);
    return e.forEach(function(n) {
      r[++t] = n
    }), r
  }
  _v.exports = lC
});
var Cv = I((XV, Mv) => {
  var Ev = En(),
    jv = Av(),
    cC = Xa(),
    fC = Jc(),
    pC = Tv(),
    dC = Pu(),
    mC = 1,
    hC = 2,
    yC = "[object Boolean]",
    vC = "[object Date]",
    gC = "[object Error]",
    bC = "[object Map]",
    xC = "[object Number]",
    wC = "[object RegExp]",
    OC = "[object Set]",
    SC = "[object String]",
    AC = "[object Symbol]",
    PC = "[object ArrayBuffer]",
    TC = "[object DataView]",
    kv = Ev ? Ev.prototype : void 0,
    Qc = kv ? kv.valueOf : void 0;

  function _C(e, t, r, n, i, o, a) {
    switch (r) {
      case TC:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
        e = e.buffer, t = t.buffer;
      case PC:
        return !(e.byteLength != t.byteLength || !o(new jv(e), new jv(t)));
      case yC:
      case vC:
      case xC:
        return cC(+e, +t);
      case gC:
        return e.name == t.name && e.message == t.message;
      case wC:
      case SC:
        return e == t + "";
      case bC:
        var u = pC;
      case OC:
        var s = n & mC;
        if (u || (u = dC), e.size != t.size && !s) return !1;
        var l = a.get(e);
        if (l) return l == t;
        n |= hC, a.set(e, t);
        var f = fC(u(e), u(t), n, i, o, a);
        return a.delete(e), f;
      case AC:
        if (Qc) return Qc.call(e) == Qc.call(t)
    }
    return !1
  }
  Mv.exports = _C
});
var ef = I((ZV, Iv) => {
  function EC(e, t) {
    for (var r = -1, n = t.length, i = e.length; ++r < n;) e[i + r] = t[r];
    return e
  }
  Iv.exports = EC
});
var Dv = I((JV, Nv) => {
  var jC = ef(),
    kC = rt();

  function MC(e, t, r) {
    var n = t(e);
    return kC(e) ? n : jC(n, r(e))
  }
  Nv.exports = MC
});
var Lv = I((QV, Rv) => {
  function CC(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n;) {
      var a = e[r];
      t(a, r, e) && (o[i++] = a)
    }
    return o
  }
  Rv.exports = CC
});
var qv = I((eY, Bv) => {
  function IC() {
    return []
  }
  Bv.exports = IC
});
var Wv = I((tY, Fv) => {
  var NC = Lv(),
    DC = qv(),
    RC = Object.prototype,
    LC = RC.propertyIsEnumerable,
    $v = Object.getOwnPropertySymbols,
    BC = $v ? function(e) {
      return e == null ? [] : (e = Object(e), NC($v(e), function(t) {
        return LC.call(e, t)
      }))
    } : DC;
  Fv.exports = BC
});
var Hv = I((rY, zv) => {
  function qC(e, t) {
    for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
    return n
  }
  zv.exports = qC
});
var Gv = I((nY, Uv) => {
  var $C = Jt(),
    FC = Qt(),
    WC = "[object Arguments]";

  function zC(e) {
    return FC(e) && $C(e) == WC
  }
  Uv.exports = zC
});
var Tu = I((iY, Yv) => {
  var Kv = Gv(),
    HC = Qt(),
    Vv = Object.prototype,
    UC = Vv.hasOwnProperty,
    GC = Vv.propertyIsEnumerable,
    KC = Kv(function() {
      return arguments
    }()) ? Kv : function(e) {
      return HC(e) && UC.call(e, "callee") && !GC.call(e, "callee")
    };
  Yv.exports = KC
});
var Zv = I((oY, Xv) => {
  function VC() {
    return !1
  }
  Xv.exports = VC
});
var tf = I((ho, Un) => {
  var YC = qt(),
    XC = Zv(),
    eg = typeof ho == "object" && ho && !ho.nodeType && ho,
    Jv = eg && typeof Un == "object" && Un && !Un.nodeType && Un,
    ZC = Jv && Jv.exports === eg,
    Qv = ZC ? YC.Buffer : void 0,
    JC = Qv ? Qv.isBuffer : void 0,
    QC = JC || XC;
  Un.exports = QC
});
var _u = I((aY, tg) => {
  var eI = 9007199254740991,
    tI = /^(?:0|[1-9]\d*)$/;

  function rI(e, t) {
    var r = typeof e;
    return t = t ?? eI, !!t && (r == "number" || r != "symbol" && tI.test(e)) && e > -1 && e % 1 == 0 && e < t
  }
  tg.exports = rI
});
var Eu = I((uY, rg) => {
  var nI = 9007199254740991;

  function iI(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= nI
  }
  rg.exports = iI
});
var ig = I((sY, ng) => {
  var oI = Jt(),
    aI = Eu(),
    uI = Qt(),
    sI = "[object Arguments]",
    lI = "[object Array]",
    cI = "[object Boolean]",
    fI = "[object Date]",
    pI = "[object Error]",
    dI = "[object Function]",
    mI = "[object Map]",
    hI = "[object Number]",
    yI = "[object Object]",
    vI = "[object RegExp]",
    gI = "[object Set]",
    bI = "[object String]",
    xI = "[object WeakMap]",
    wI = "[object ArrayBuffer]",
    OI = "[object DataView]",
    SI = "[object Float32Array]",
    AI = "[object Float64Array]",
    PI = "[object Int8Array]",
    TI = "[object Int16Array]",
    _I = "[object Int32Array]",
    EI = "[object Uint8Array]",
    jI = "[object Uint8ClampedArray]",
    kI = "[object Uint16Array]",
    MI = "[object Uint32Array]",
    Pe = {};
  Pe[SI] = Pe[AI] = Pe[PI] = Pe[TI] = Pe[_I] = Pe[EI] = Pe[jI] = Pe[kI] = Pe[MI] = !0;
  Pe[sI] = Pe[lI] = Pe[wI] = Pe[cI] = Pe[OI] = Pe[fI] = Pe[pI] = Pe[dI] = Pe[mI] = Pe[hI] = Pe[yI] = Pe[vI] = Pe[gI] = Pe[bI] = Pe[xI] = !1;

  function CI(e) {
    return uI(e) && aI(e.length) && !!Pe[oI(e)]
  }
  ng.exports = CI
});
var rf = I((lY, og) => {
  function II(e) {
    return function(t) {
      return e(t)
    }
  }
  og.exports = II
});
var ug = I((yo, Gn) => {
  var NI = Wl(),
    ag = typeof yo == "object" && yo && !yo.nodeType && yo,
    vo = ag && typeof Gn == "object" && Gn && !Gn.nodeType && Gn,
    DI = vo && vo.exports === ag,
    nf = DI && NI.process,
    RI = function() {
      try {
        var e = vo && vo.require && vo.require("util").types;
        return e || nf && nf.binding && nf.binding("util")
      } catch {}
    }();
  Gn.exports = RI
});
var of = I((cY, cg) => {
  var LI = ig(),
    BI = rf(),
    sg = ug(),
    lg = sg && sg.isTypedArray,
    qI = lg ? BI(lg) : LI;
  cg.exports = qI
});
var pg = I((fY, fg) => {
  var $I = Hv(),
    FI = Tu(),
    WI = rt(),
    zI = tf(),
    HI = _u(),
    UI = of(),
    GI = Object.prototype,
    KI = GI.hasOwnProperty;

  function VI(e, t) {
    var r = WI(e),
      n = !r && FI(e),
      i = !r && !n && zI(e),
      o = !r && !n && !i && UI(e),
      a = r || n || i || o,
      u = a ? $I(e.length, String) : [],
      s = u.length;
    for (var l in e)(t || KI.call(e, l)) && !(a && (l == "length" || i && (l == "offset" || l == "parent") || o && (l == "buffer" || l == "byteLength" || l == "byteOffset") || HI(l, s))) && u.push(l);
    return u
  }
  fg.exports = VI
});
var mg = I((pY, dg) => {
  var YI = Object.prototype;

  function XI(e) {
    var t = e && e.constructor,
      r = typeof t == "function" && t.prototype || YI;
    return e === r
  }
  dg.exports = XI
});
var af = I((dY, hg) => {
  function ZI(e, t) {
    return function(r) {
      return e(t(r))
    }
  }
  hg.exports = ZI
});
var vg = I((mY, yg) => {
  var JI = af(),
    QI = JI(Object.keys, Object);
  yg.exports = QI
});
var bg = I((hY, gg) => {
  var e2 = mg(),
    t2 = vg(),
    r2 = Object.prototype,
    n2 = r2.hasOwnProperty;

  function i2(e) {
    if (!e2(e)) return t2(e);
    var t = [];
    for (var r in Object(e)) n2.call(e, r) && r != "constructor" && t.push(r);
    return t
  }
  gg.exports = i2
});
var Kn = I((yY, xg) => {
  var o2 = _e(),
    a2 = Eu();

  function u2(e) {
    return e != null && a2(e.length) && !o2(e)
  }
  xg.exports = u2
});
var go = I((vY, wg) => {
  var s2 = pg(),
    l2 = bg(),
    c2 = Kn();

  function f2(e) {
    return c2(e) ? s2(e) : l2(e)
  }
  wg.exports = f2
});
var Sg = I((gY, Og) => {
  var p2 = Dv(),
    d2 = Wv(),
    m2 = go();

  function h2(e) {
    return p2(e, m2, d2)
  }
  Og.exports = h2
});
var Tg = I((bY, Pg) => {
  var Ag = Sg(),
    y2 = 1,
    v2 = Object.prototype,
    g2 = v2.hasOwnProperty;

  function b2(e, t, r, n, i, o) {
    var a = r & y2,
      u = Ag(e),
      s = u.length,
      l = Ag(t),
      f = l.length;
    if (s != f && !a) return !1;
    for (var c = s; c--;) {
      var p = u[c];
      if (!(a ? p in t : g2.call(t, p))) return !1
    }
    var h = o.get(e),
      g = o.get(t);
    if (h && g) return h == t && g == e;
    var m = !0;
    o.set(e, t), o.set(t, e);
    for (var b = a; ++c < s;) {
      p = u[c];
      var w = e[p],
        A = t[p];
      if (n) var T = a ? n(A, w, p, t, e, o) : n(w, A, p, e, t, o);
      if (!(T === void 0 ? w === A || i(w, A, r, n, o) : T)) {
        m = !1;
        break
      }
      b || (b = p == "constructor")
    }
    if (m && !b) {
      var E = e.constructor,
        y = t.constructor;
      E != y && "constructor" in e && "constructor" in t && !(typeof E == "function" && E instanceof E && typeof y == "function" && y instanceof y) && (m = !1)
    }
    return o.delete(e), o.delete(t), m
  }
  Pg.exports = b2
});
var Eg = I((xY, _g) => {
  var x2 = Sr(),
    w2 = qt(),
    O2 = x2(w2, "DataView");
  _g.exports = O2
});
var kg = I((wY, jg) => {
  var S2 = Sr(),
    A2 = qt(),
    P2 = S2(A2, "Promise");
  jg.exports = P2
});
var uf = I((OY, Mg) => {
  var T2 = Sr(),
    _2 = qt(),
    E2 = T2(_2, "Set");
  Mg.exports = E2
});
var Ig = I((SY, Cg) => {
  var j2 = Sr(),
    k2 = qt(),
    M2 = j2(k2, "WeakMap");
  Cg.exports = M2
});
var Fg = I((AY, $g) => {
  var sf = Eg(),
    lf = Za(),
    cf = kg(),
    ff = uf(),
    pf = Ig(),
    qg = Jt(),
    Vn = Hl(),
    Ng = "[object Map]",
    C2 = "[object Object]",
    Dg = "[object Promise]",
    Rg = "[object Set]",
    Lg = "[object WeakMap]",
    Bg = "[object DataView]",
    I2 = Vn(sf),
    N2 = Vn(lf),
    D2 = Vn(cf),
    R2 = Vn(ff),
    L2 = Vn(pf),
    Gr = qg;
  (sf && Gr(new sf(new ArrayBuffer(1))) != Bg || lf && Gr(new lf) != Ng || cf && Gr(cf.resolve()) != Dg || ff && Gr(new ff) != Rg || pf && Gr(new pf) != Lg) && (Gr = function(e) {
    var t = qg(e),
      r = t == C2 ? e.constructor : void 0,
      n = r ? Vn(r) : "";
    if (n) switch (n) {
      case I2:
        return Bg;
      case N2:
        return Ng;
      case D2:
        return Dg;
      case R2:
        return Rg;
      case L2:
        return Lg
    }
    return t
  });
  $g.exports = Gr
});
var Yg = I((PY, Vg) => {
  var df = Vc(),
    B2 = Jc(),
    q2 = Cv(),
    $2 = Tg(),
    Wg = Fg(),
    zg = rt(),
    Hg = tf(),
    F2 = of(),
    W2 = 1,
    Ug = "[object Arguments]",
    Gg = "[object Array]",
    ju = "[object Object]",
    z2 = Object.prototype,
    Kg = z2.hasOwnProperty;

  function H2(e, t, r, n, i, o) {
    var a = zg(e),
      u = zg(t),
      s = a ? Gg : Wg(e),
      l = u ? Gg : Wg(t);
    s = s == Ug ? ju : s, l = l == Ug ? ju : l;
    var f = s == ju,
      c = l == ju,
      p = s == l;
    if (p && Hg(e)) {
      if (!Hg(t)) return !1;
      a = !0, f = !1
    }
    if (p && !f) return o || (o = new df), a || F2(e) ? B2(e, t, r, n, i, o) : q2(e, t, s, r, n, i, o);
    if (!(r & W2)) {
      var h = f && Kg.call(e, "__wrapped__"),
        g = c && Kg.call(t, "__wrapped__");
      if (h || g) {
        var m = h ? e.value() : e,
          b = g ? t.value() : t;
        return o || (o = new df), i(m, b, r, n, o)
      }
    }
    return p ? (o || (o = new df), $2(e, t, r, n, i, o)) : !1
  }
  Vg.exports = H2
});
var ku = I((TY, Jg) => {
  var U2 = Yg(),
    Xg = Qt();

  function Zg(e, t, r, n, i) {
    return e === t ? !0 : e == null || t == null || !Xg(e) && !Xg(t) ? e !== e && t !== t : U2(e, t, r, n, Zg, i)
  }
  Jg.exports = Zg
});
var eb = I((_Y, Qg) => {
  var G2 = Vc(),
    K2 = ku(),
    V2 = 1,
    Y2 = 2;

  function X2(e, t, r, n) {
    var i = r.length,
      o = i,
      a = !n;
    if (e == null) return !o;
    for (e = Object(e); i--;) {
      var u = r[i];
      if (a && u[2] ? u[1] !== e[u[0]] : !(u[0] in e)) return !1
    }
    for (; ++i < o;) {
      u = r[i];
      var s = u[0],
        l = e[s],
        f = u[1];
      if (a && u[2]) {
        if (l === void 0 && !(s in e)) return !1
      } else {
        var c = new G2;
        if (n) var p = n(l, f, s, e, t, c);
        if (!(p === void 0 ? K2(f, l, V2 | Y2, n, c) : p)) return !1
      }
    }
    return !0
  }
  Qg.exports = X2
});
var mf = I((EY, tb) => {
  var Z2 = wt();

  function J2(e) {
    return e === e && !Z2(e)
  }
  tb.exports = J2
});
var nb = I((jY, rb) => {
  var Q2 = mf(),
    eN = go();

  function tN(e) {
    for (var t = eN(e), r = t.length; r--;) {
      var n = t[r],
        i = e[n];
      t[r] = [n, i, Q2(i)]
    }
    return t
  }
  rb.exports = tN
});
var hf = I((kY, ib) => {
  function rN(e, t) {
    return function(r) {
      return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r))
    }
  }
  ib.exports = rN
});
var ab = I((MY, ob) => {
  var nN = eb(),
    iN = nb(),
    oN = hf();

  function aN(e) {
    var t = iN(e);
    return t.length == 1 && t[0][2] ? oN(t[0][0], t[0][1]) : function(r) {
      return r === e || nN(r, e, t)
    }
  }
  ob.exports = aN
});
var sb = I((CY, ub) => {
  function uN(e, t) {
    return e != null && t in Object(e)
  }
  ub.exports = uN
});
var cb = I((IY, lb) => {
  var sN = Vl(),
    lN = Tu(),
    cN = rt(),
    fN = _u(),
    pN = Eu(),
    dN = uo();

  function mN(e, t, r) {
    t = sN(t, e);
    for (var n = -1, i = t.length, o = !1; ++n < i;) {
      var a = dN(t[n]);
      if (!(o = e != null && r(e, a))) break;
      e = e[a]
    }
    return o || ++n != i ? o : (i = e == null ? 0 : e.length, !!i && pN(i) && fN(a, i) && (cN(e) || lN(e)))
  }
  lb.exports = mN
});
var pb = I((NY, fb) => {
  var hN = sb(),
    yN = cb();

  function vN(e, t) {
    return e != null && yN(e, t, hN)
  }
  fb.exports = vN
});
var mb = I((DY, db) => {
  var gN = ku(),
    bN = Ar(),
    xN = pb(),
    wN = Ya(),
    ON = mf(),
    SN = hf(),
    AN = uo(),
    PN = 1,
    TN = 2;

  function _N(e, t) {
    return wN(e) && ON(t) ? SN(AN(e), t) : function(r) {
      var n = bN(r, e);
      return n === void 0 && n === t ? xN(r, e) : gN(t, n, PN | TN)
    }
  }
  db.exports = _N
});
var Kr = I((RY, hb) => {
  function EN(e) {
    return e
  }
  hb.exports = EN
});
var vb = I((LY, yb) => {
  function jN(e) {
    return function(t) {
      return t?.[e]
    }
  }
  yb.exports = jN
});
var bb = I((BY, gb) => {
  var kN = eu();

  function MN(e) {
    return function(t) {
      return kN(t, e)
    }
  }
  gb.exports = MN
});
var wb = I((qY, xb) => {
  var CN = vb(),
    IN = bb(),
    NN = Ya(),
    DN = uo();

  function RN(e) {
    return NN(e) ? CN(DN(e)) : IN(e)
  }
  xb.exports = RN
});
var $t = I(($Y, Ob) => {
  var LN = ab(),
    BN = mb(),
    qN = Kr(),
    $N = rt(),
    FN = wb();

  function WN(e) {
    return typeof e == "function" ? e : e == null ? qN : typeof e == "object" ? $N(e) ? BN(e[0], e[1]) : LN(e) : FN(e)
  }
  Ob.exports = WN
});
var yf = I((FY, Sb) => {
  function zN(e, t, r, n) {
    for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
      if (t(e[o], o, e)) return o;
    return -1
  }
  Sb.exports = zN
});
var Pb = I((WY, Ab) => {
  function HN(e) {
    return e !== e
  }
  Ab.exports = HN
});
var _b = I((zY, Tb) => {
  function UN(e, t, r) {
    for (var n = r - 1, i = e.length; ++n < i;)
      if (e[n] === t) return n;
    return -1
  }
  Tb.exports = UN
});
var jb = I((HY, Eb) => {
  var GN = yf(),
    KN = Pb(),
    VN = _b();

  function YN(e, t, r) {
    return t === t ? VN(e, t, r) : GN(e, KN, r)
  }
  Eb.exports = YN
});
var Mb = I((UY, kb) => {
  var XN = jb();

  function ZN(e, t) {
    var r = e == null ? 0 : e.length;
    return !!r && XN(e, t, 0) > -1
  }
  kb.exports = ZN
});
var Ib = I((GY, Cb) => {
  function JN(e, t, r) {
    for (var n = -1, i = e == null ? 0 : e.length; ++n < i;)
      if (r(t, e[n])) return !0;
    return !1
  }
  Cb.exports = JN
});
var Db = I((KY, Nb) => {
  function QN() {}
  Nb.exports = QN
});
var Lb = I((VY, Rb) => {
  var vf = uf(),
    eD = Db(),
    tD = Pu(),
    rD = 1 / 0,
    nD = vf && 1 / tD(new vf([, -0]))[1] == rD ? function(e) {
      return new vf(e)
    } : eD;
  Rb.exports = nD
});
var qb = I((YY, Bb) => {
  var iD = Yc(),
    oD = Mb(),
    aD = Ib(),
    uD = Zc(),
    sD = Lb(),
    lD = Pu(),
    cD = 200;

  function fD(e, t, r) {
    var n = -1,
      i = oD,
      o = e.length,
      a = !0,
      u = [],
      s = u;
    if (r) a = !1, i = aD;
    else if (o >= cD) {
      var l = t ? null : sD(e);
      if (l) return lD(l);
      a = !1, i = uD, s = new iD
    } else s = t ? [] : u;
    e: for (; ++n < o;) {
      var f = e[n],
        c = t ? t(f) : f;
      if (f = r || f !== 0 ? f : 0, a && c === c) {
        for (var p = s.length; p--;)
          if (s[p] === c) continue e;
        t && s.push(c), u.push(f)
      } else i(s, c, r) || (s !== u && s.push(c), u.push(f))
    }
    return u
  }
  Bb.exports = fD
});
var Fb = I((XY, $b) => {
  var pD = $t(),
    dD = qb();

  function mD(e, t) {
    return e && e.length ? dD(e, pD(t, 2)) : []
  }
  $b.exports = mD
});
var Zb = I((nX, Xb) => {
  var Vb = En(),
    ED = Tu(),
    jD = rt(),
    Yb = Vb ? Vb.isConcatSpreadable : void 0;

  function kD(e) {
    return jD(e) || ED(e) || !!(Yb && e && e[Yb])
  }
  Xb.exports = kD
});
var xf = I((iX, Qb) => {
  var MD = ef(),
    CD = Zb();

  function Jb(e, t, r, n, i) {
    var o = -1,
      a = e.length;
    for (r || (r = CD), i || (i = []); ++o < a;) {
      var u = e[o];
      t > 0 && r(u) ? t > 1 ? Jb(u, t - 1, r, n, i) : MD(i, u) : n || (i[i.length] = u)
    }
    return i
  }
  Qb.exports = Jb
});
var t0 = I((oX, e0) => {
  function ID(e) {
    return function(t, r, n) {
      for (var i = -1, o = Object(t), a = n(t), u = a.length; u--;) {
        var s = a[e ? u : ++i];
        if (r(o[s], s, o) === !1) break
      }
      return t
    }
  }
  e0.exports = ID
});
var n0 = I((aX, r0) => {
  var ND = t0(),
    DD = ND();
  r0.exports = DD
});
var wf = I((uX, i0) => {
  var RD = n0(),
    LD = go();

  function BD(e, t) {
    return e && RD(e, t, LD)
  }
  i0.exports = BD
});
var a0 = I((sX, o0) => {
  var qD = Kn();

  function $D(e, t) {
    return function(r, n) {
      if (r == null) return r;
      if (!qD(r)) return e(r, n);
      for (var i = r.length, o = t ? i : -1, a = Object(r);
        (t ? o-- : ++o < i) && n(a[o], o, a) !== !1;);
      return r
    }
  }
  o0.exports = $D
});
var Nu = I((lX, u0) => {
  var FD = wf(),
    WD = a0(),
    zD = WD(FD);
  u0.exports = zD
});
var Of = I((cX, s0) => {
  var HD = Nu(),
    UD = Kn();

  function GD(e, t) {
    var r = -1,
      n = UD(e) ? Array(e.length) : [];
    return HD(e, function(i, o, a) {
      n[++r] = t(i, o, a)
    }), n
  }
  s0.exports = GD
});
var c0 = I((fX, l0) => {
  function KD(e, t) {
    var r = e.length;
    for (e.sort(t); r--;) e[r] = e[r].value;
    return e
  }
  l0.exports = KD
});
var d0 = I((pX, p0) => {
  var f0 = Fr();

  function VD(e, t) {
    if (e !== t) {
      var r = e !== void 0,
        n = e === null,
        i = e === e,
        o = f0(e),
        a = t !== void 0,
        u = t === null,
        s = t === t,
        l = f0(t);
      if (!u && !l && !o && e > t || o && a && s && !u && !l || n && a && s || !r && s || !i) return 1;
      if (!n && !o && !l && e < t || l && r && i && !n && !o || u && r && i || !a && i || !s) return -1
    }
    return 0
  }
  p0.exports = VD
});
var h0 = I((dX, m0) => {
  var YD = d0();

  function XD(e, t, r) {
    for (var n = -1, i = e.criteria, o = t.criteria, a = i.length, u = r.length; ++n < a;) {
      var s = YD(i[n], o[n]);
      if (s) {
        if (n >= u) return s;
        var l = r[n];
        return s * (l == "desc" ? -1 : 1)
      }
    }
    return e.index - t.index
  }
  m0.exports = XD
});
var v0 = I((mX, y0) => {
  var Sf = Qa(),
    ZD = eu(),
    JD = $t(),
    QD = Of(),
    eR = c0(),
    tR = rf(),
    rR = h0(),
    nR = Kr(),
    iR = rt();

  function oR(e, t, r) {
    t.length ? t = Sf(t, function(o) {
      return iR(o) ? function(a) {
        return ZD(a, o.length === 1 ? o[0] : o)
      } : o
    }) : t = [nR];
    var n = -1;
    t = Sf(t, tR(JD));
    var i = QD(e, function(o, a, u) {
      var s = Sf(t, function(l) {
        return l(o)
      });
      return {
        criteria: s,
        index: ++n,
        value: o
      }
    });
    return eR(i, function(o, a) {
      return rR(o, a, r)
    })
  }
  y0.exports = oR
});
var b0 = I((hX, g0) => {
  function aR(e, t, r) {
    switch (r.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, r[0]);
      case 2:
        return e.call(t, r[0], r[1]);
      case 3:
        return e.call(t, r[0], r[1], r[2])
    }
    return e.apply(t, r)
  }
  g0.exports = aR
});
var O0 = I((yX, w0) => {
  var uR = b0(),
    x0 = Math.max;

  function sR(e, t, r) {
    return t = x0(t === void 0 ? e.length - 1 : t, 0),
      function() {
        for (var n = arguments, i = -1, o = x0(n.length - t, 0), a = Array(o); ++i < o;) a[i] = n[t + i];
        i = -1;
        for (var u = Array(t + 1); ++i < t;) u[i] = n[i];
        return u[t] = r(a), uR(e, this, u)
      }
  }
  w0.exports = sR
});
var A0 = I((vX, S0) => {
  function lR(e) {
    return function() {
      return e
    }
  }
  S0.exports = lR
});
var Af = I((gX, P0) => {
  var cR = Sr(),
    fR = function() {
      try {
        var e = cR(Object, "defineProperty");
        return e({}, "", {}), e
      } catch {}
    }();
  P0.exports = fR
});
var E0 = I((bX, _0) => {
  var pR = A0(),
    T0 = Af(),
    dR = Kr(),
    mR = T0 ? function(e, t) {
      return T0(e, "toString", {
        configurable: !0,
        enumerable: !1,
        value: pR(t),
        writable: !0
      })
    } : dR;
  _0.exports = mR
});
var k0 = I((xX, j0) => {
  var hR = 800,
    yR = 16,
    vR = Date.now;

  function gR(e) {
    var t = 0,
      r = 0;
    return function() {
      var n = vR(),
        i = yR - (n - r);
      if (r = n, i > 0) {
        if (++t >= hR) return arguments[0]
      } else t = 0;
      return e.apply(void 0, arguments)
    }
  }
  j0.exports = gR
});
var C0 = I((wX, M0) => {
  var bR = E0(),
    xR = k0(),
    wR = xR(bR);
  M0.exports = wR
});
var N0 = I((OX, I0) => {
  var OR = Kr(),
    SR = O0(),
    AR = C0();

  function PR(e, t) {
    return AR(SR(e, t, OR), e + "")
  }
  I0.exports = PR
});
var xo = I((SX, D0) => {
  var TR = Xa(),
    _R = Kn(),
    ER = _u(),
    jR = wt();

  function kR(e, t, r) {
    if (!jR(r)) return !1;
    var n = typeof t;
    return (n == "number" ? _R(r) && ER(t, r.length) : n == "string" && t in r) ? TR(r[t], e) : !1
  }
  D0.exports = kR
});
var Du = I((AX, L0) => {
  var MR = xf(),
    CR = v0(),
    IR = N0(),
    R0 = xo(),
    NR = IR(function(e, t) {
      if (e == null) return [];
      var r = t.length;
      return r > 1 && R0(e, t[0], t[1]) ? t = [] : r > 2 && R0(t[0], t[1], t[2]) && (t = [t[0]]), CR(e, MR(t, 1), [])
    });
  L0.exports = NR
});
var ix = I((WX, nx) => {
  var hL = qt(),
    yL = function() {
      return hL.Date.now()
    };
  nx.exports = yL
});
var ax = I((zX, ox) => {
  var vL = /\s/;

  function gL(e) {
    for (var t = e.length; t-- && vL.test(e.charAt(t)););
    return t
  }
  ox.exports = gL
});
var sx = I((HX, ux) => {
  var bL = ax(),
    xL = /^\s+/;

  function wL(e) {
    return e && e.slice(0, bL(e) + 1).replace(xL, "")
  }
  ux.exports = wL
});
var Mf = I((UX, fx) => {
  var OL = sx(),
    lx = wt(),
    SL = Fr(),
    cx = NaN,
    AL = /^[-+]0x[0-9a-f]+$/i,
    PL = /^0b[01]+$/i,
    TL = /^0o[0-7]+$/i,
    _L = parseInt;

  function EL(e) {
    if (typeof e == "number") return e;
    if (SL(e)) return cx;
    if (lx(e)) {
      var t = typeof e.valueOf == "function" ? e.valueOf() : e;
      e = lx(t) ? t + "" : t
    }
    if (typeof e != "string") return e === 0 ? e : +e;
    e = OL(e);
    var r = PL.test(e);
    return r || TL.test(e) ? _L(e.slice(2), r ? 2 : 8) : AL.test(e) ? cx : +e
  }
  fx.exports = EL
});
var mx = I((GX, dx) => {
  var jL = wt(),
    Cf = ix(),
    px = Mf(),
    kL = "Expected a function",
    ML = Math.max,
    CL = Math.min;

  function IL(e, t, r) {
    var n, i, o, a, u, s, l = 0,
      f = !1,
      c = !1,
      p = !0;
    if (typeof e != "function") throw new TypeError(kL);
    t = px(t) || 0, jL(r) && (f = !!r.leading, c = "maxWait" in r, o = c ? ML(px(r.maxWait) || 0, t) : o, p = "trailing" in r ? !!r.trailing : p);

    function h(v) {
      var j = n,
        M = i;
      return n = i = void 0, l = v, a = e.apply(M, j), a
    }

    function g(v) {
      return l = v, u = setTimeout(w, t), f ? h(v) : a
    }

    function m(v) {
      var j = v - s,
        M = v - l,
        N = t - j;
      return c ? CL(N, o - M) : N
    }

    function b(v) {
      var j = v - s,
        M = v - l;
      return s === void 0 || j >= t || j < 0 || c && M >= o
    }

    function w() {
      var v = Cf();
      if (b(v)) return A(v);
      u = setTimeout(w, m(v))
    }

    function A(v) {
      return u = void 0, p && n ? h(v) : (n = i = void 0, a)
    }

    function T() {
      u !== void 0 && clearTimeout(u), l = 0, n = s = i = u = void 0
    }

    function E() {
      return u === void 0 ? a : A(Cf())
    }

    function y() {
      var v = Cf(),
        j = b(v);
      if (n = arguments, i = this, s = v, j) {
        if (u === void 0) return g(s);
        if (c) return clearTimeout(u), u = setTimeout(w, t), h(s)
      }
      return u === void 0 && (u = setTimeout(w, t)), a
    }
    return y.cancel = T, y.flush = E, y
  }
  dx.exports = IL
});
var If = I((KX, hx) => {
  var NL = mx(),
    DL = wt(),
    RL = "Expected a function";

  function LL(e, t, r) {
    var n = !0,
      i = !0;
    if (typeof e != "function") throw new TypeError(RL);
    return DL(r) && (n = "leading" in r ? !!r.leading : n, i = "trailing" in r ? !!r.trailing : i), NL(e, t, {
      leading: n,
      maxWait: t,
      trailing: i
    })
  }
  hx.exports = LL
});
var Ko = I((cte, ow) => {
  var L$ = Fr();

  function B$(e, t, r) {
    for (var n = -1, i = e.length; ++n < i;) {
      var o = e[n],
        a = t(o);
      if (a != null && (u === void 0 ? a === a && !L$(a) : r(a, u))) var u = a,
        s = o
    }
    return s
  }
  ow.exports = B$
});
var gp = I((fte, aw) => {
  function q$(e, t) {
    return e > t
  }
  aw.exports = q$
});
var sw = I((pte, uw) => {
  var $$ = Ko(),
    F$ = gp(),
    W$ = Kr();

  function z$(e) {
    return e && e.length ? $$(e, W$, F$) : void 0
  }
  uw.exports = z$
});
var bp = I((dte, lw) => {
  function H$(e, t) {
    return e < t
  }
  lw.exports = H$
});
var fw = I((mte, cw) => {
  var U$ = Ko(),
    G$ = bp(),
    K$ = Kr();

  function V$(e) {
    return e && e.length ? U$(e, K$, G$) : void 0
  }
  cw.exports = V$
});
var dw = I((hte, pw) => {
  var Y$ = Qa(),
    X$ = $t(),
    Z$ = Of(),
    J$ = rt();

  function Q$(e, t) {
    var r = J$(e) ? Y$ : Z$;
    return r(e, X$(t, 3))
  }
  pw.exports = Q$
});
var hw = I((yte, mw) => {
  var eF = xf(),
    tF = dw();

  function rF(e, t) {
    return eF(tF(e, t), 1)
  }
  mw.exports = rF
});
var hi = I((vte, yw) => {
  var nF = ku();

  function iF(e, t) {
    return nF(e, t)
  }
  yw.exports = iF
});
var xp = I((vw, Ps) => {
  (function(e) {
    "use strict";
    var t = 1e9,
      r = {
        precision: 20,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
      },
      n = !0,
      i = "[DecimalError] ",
      o = i + "Invalid argument: ",
      a = i + "Exponent out of range: ",
      u = Math.floor,
      s = Math.pow,
      l = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      f, c = 1e7,
      p = 7,
      h = 9007199254740991,
      g = u(h / p),
      m = {};
    m.absoluteValue = m.abs = function() {
      var S = new this.constructor(this);
      return S.s && (S.s = 1), S
    }, m.comparedTo = m.cmp = function(S) {
      var d, O, P, x, _ = this;
      if (S = new _.constructor(S), _.s !== S.s) return _.s || -S.s;
      if (_.e !== S.e) return _.e > S.e ^ _.s < 0 ? 1 : -1;
      for (P = _.d.length, x = S.d.length, d = 0, O = P < x ? P : x; d < O; ++d)
        if (_.d[d] !== S.d[d]) return _.d[d] > S.d[d] ^ _.s < 0 ? 1 : -1;
      return P === x ? 0 : P > x ^ _.s < 0 ? 1 : -1
    }, m.decimalPlaces = m.dp = function() {
      var S = this,
        d = S.d.length - 1,
        O = (d - S.e) * p;
      if (d = S.d[d], d)
        for (; d % 10 == 0; d /= 10) O--;
      return O < 0 ? 0 : O
    }, m.dividedBy = m.div = function(S) {
      return T(this, new this.constructor(S))
    }, m.dividedToIntegerBy = m.idiv = function(S) {
      var d = this,
        O = d.constructor;
      return B(T(d, new O(S), 0, 1), O.precision)
    }, m.equals = m.eq = function(S) {
      return !this.cmp(S)
    }, m.exponent = function() {
      return y(this)
    }, m.greaterThan = m.gt = function(S) {
      return this.cmp(S) > 0
    }, m.greaterThanOrEqualTo = m.gte = function(S) {
      return this.cmp(S) >= 0
    }, m.isInteger = m.isint = function() {
      return this.e > this.d.length - 2
    }, m.isNegative = m.isneg = function() {
      return this.s < 0
    }, m.isPositive = m.ispos = function() {
      return this.s > 0
    }, m.isZero = function() {
      return this.s === 0
    }, m.lessThan = m.lt = function(S) {
      return this.cmp(S) < 0
    }, m.lessThanOrEqualTo = m.lte = function(S) {
      return this.cmp(S) < 1
    }, m.logarithm = m.log = function(S) {
      var d, O = this,
        P = O.constructor,
        x = P.precision,
        _ = x + 5;
      if (S === void 0) S = new P(10);
      else if (S = new P(S), S.s < 1 || S.eq(f)) throw Error(i + "NaN");
      if (O.s < 1) throw Error(i + (O.s ? "NaN" : "-Infinity"));
      return O.eq(f) ? new P(0) : (n = !1, d = T(M(O, _), M(S, _), _), n = !0, B(d, x))
    }, m.minus = m.sub = function(S) {
      var d = this;
      return S = new d.constructor(S), d.s == S.s ? $(d, S) : b(d, (S.s = -S.s, S))
    }, m.modulo = m.mod = function(S) {
      var d, O = this,
        P = O.constructor,
        x = P.precision;
      if (S = new P(S), !S.s) throw Error(i + "NaN");
      return O.s ? (n = !1, d = T(O, S, 0, 1).times(S), n = !0, O.minus(d)) : B(new P(O), x)
    }, m.naturalExponential = m.exp = function() {
      return E(this)
    }, m.naturalLogarithm = m.ln = function() {
      return M(this)
    }, m.negated = m.neg = function() {
      var S = new this.constructor(this);
      return S.s = -S.s || 0, S
    }, m.plus = m.add = function(S) {
      var d = this;
      return S = new d.constructor(S), d.s == S.s ? b(d, S) : $(d, (S.s = -S.s, S))
    }, m.precision = m.sd = function(S) {
      var d, O, P, x = this;
      if (S !== void 0 && S !== !!S && S !== 1 && S !== 0) throw Error(o + S);
      if (d = y(x) + 1, P = x.d.length - 1, O = P * p + 1, P = x.d[P], P) {
        for (; P % 10 == 0; P /= 10) O--;
        for (P = x.d[0]; P >= 10; P /= 10) O++
      }
      return S && d > O ? d : O
    }, m.squareRoot = m.sqrt = function() {
      var S, d, O, P, x, _, C, D = this,
        F = D.constructor;
      if (D.s < 1) {
        if (!D.s) return new F(0);
        throw Error(i + "NaN")
      }
      for (S = y(D), n = !1, x = Math.sqrt(+D), x == 0 || x == 1 / 0 ? (d = A(D.d), (d.length + S) % 2 == 0 && (d += "0"), x = Math.sqrt(d), S = u((S + 1) / 2) - (S < 0 || S % 2), x == 1 / 0 ? d = "5e" + S : (d = x.toExponential(), d = d.slice(0, d.indexOf("e") + 1) + S), P = new F(d)) : P = new F(x.toString()), O = F.precision, x = C = O + 3;;)
        if (_ = P, P = _.plus(T(D, _, C + 2)).times(.5), A(_.d).slice(0, C) === (d = A(P.d)).slice(0, C)) {
          if (d = d.slice(C - 3, C + 1), x == C && d == "4999") {
            if (B(_, O + 1, 0), _.times(_).eq(D)) {
              P = _;
              break
            }
          } else if (d != "9999") break;
          C += 4
        } return n = !0, B(P, O)
    }, m.times = m.mul = function(S) {
      var d, O, P, x, _, C, D, F, Y, X = this,
        re = X.constructor,
        pe = X.d,
        K = (S = new re(S)).d;
      if (!X.s || !S.s) return new re(0);
      for (S.s *= X.s, O = X.e + S.e, F = pe.length, Y = K.length, F < Y && (_ = pe, pe = K, K = _, C = F, F = Y, Y = C), _ = [], C = F + Y, P = C; P--;) _.push(0);
      for (P = Y; --P >= 0;) {
        for (d = 0, x = F + P; x > P;) D = _[x] + K[P] * pe[x - P - 1] + d, _[x--] = D % c | 0, d = D / c | 0;
        _[x] = (_[x] + d) % c | 0
      }
      for (; !_[--C];) _.pop();
      return d ? ++O : _.shift(), S.d = _, S.e = O, n ? B(S, re.precision) : S
    }, m.toDecimalPlaces = m.todp = function(S, d) {
      var O = this,
        P = O.constructor;
      return O = new P(O), S === void 0 ? O : (w(S, 0, t), d === void 0 ? d = P.rounding : w(d, 0, 8), B(O, S + y(O) + 1, d))
    }, m.toExponential = function(S, d) {
      var O, P = this,
        x = P.constructor;
      return S === void 0 ? O = R(P, !0) : (w(S, 0, t), d === void 0 ? d = x.rounding : w(d, 0, 8), P = B(new x(P), S + 1, d), O = R(P, !0, S + 1)), O
    }, m.toFixed = function(S, d) {
      var O, P, x = this,
        _ = x.constructor;
      return S === void 0 ? R(x) : (w(S, 0, t), d === void 0 ? d = _.rounding : w(d, 0, 8), P = B(new _(x), S + y(x) + 1, d), O = R(P.abs(), !1, S + y(P) + 1), x.isneg() && !x.isZero() ? "-" + O : O)
    }, m.toInteger = m.toint = function() {
      var S = this,
        d = S.constructor;
      return B(new d(S), y(S) + 1, d.rounding)
    }, m.toNumber = function() {
      return +this
    }, m.toPower = m.pow = function(S) {
      var d, O, P, x, _, C, D = this,
        F = D.constructor,
        Y = 12,
        X = +(S = new F(S));
      if (!S.s) return new F(f);
      if (D = new F(D), !D.s) {
        if (S.s < 1) throw Error(i + "Infinity");
        return D
      }
      if (D.eq(f)) return D;
      if (P = F.precision, S.eq(f)) return B(D, P);
      if (d = S.e, O = S.d.length - 1, C = d >= O, _ = D.s, C) {
        if ((O = X < 0 ? -X : X) <= h) {
          for (x = new F(f), d = Math.ceil(P / p + 4), n = !1; O % 2 && (x = x.times(D), z(x.d, d)), O = u(O / 2), O !== 0;) D = D.times(D), z(D.d, d);
          return n = !0, S.s < 0 ? new F(f).div(x) : B(x, P)
        }
      } else if (_ < 0) throw Error(i + "NaN");
      return _ = _ < 0 && S.d[Math.max(d, O)] & 1 ? -1 : 1, D.s = 1, n = !1, x = S.times(M(D, P + Y)), n = !0, x = E(x), x.s = _, x
    }, m.toPrecision = function(S, d) {
      var O, P, x = this,
        _ = x.constructor;
      return S === void 0 ? (O = y(x), P = R(x, O <= _.toExpNeg || O >= _.toExpPos)) : (w(S, 1, t), d === void 0 ? d = _.rounding : w(d, 0, 8), x = B(new _(x), S, d), O = y(x), P = R(x, S <= O || O <= _.toExpNeg, S)), P
    }, m.toSignificantDigits = m.tosd = function(S, d) {
      var O = this,
        P = O.constructor;
      return S === void 0 ? (S = P.precision, d = P.rounding) : (w(S, 1, t), d === void 0 ? d = P.rounding : w(d, 0, 8)), B(new P(O), S, d)
    }, m.toString = m.valueOf = m.val = m.toJSON = function() {
      var S = this,
        d = y(S),
        O = S.constructor;
      return R(S, d <= O.toExpNeg || d >= O.toExpPos)
    };

    function b(S, d) {
      var O, P, x, _, C, D, F, Y, X = S.constructor,
        re = X.precision;
      if (!S.s || !d.s) return d.s || (d = new X(S)), n ? B(d, re) : d;
      if (F = S.d, Y = d.d, C = S.e, x = d.e, F = F.slice(), _ = C - x, _) {
        for (_ < 0 ? (P = F, _ = -_, D = Y.length) : (P = Y, x = C, D = F.length), C = Math.ceil(re / p), D = C > D ? C + 1 : D + 1, _ > D && (_ = D, P.length = 1), P.reverse(); _--;) P.push(0);
        P.reverse()
      }
      for (D = F.length, _ = Y.length, D - _ < 0 && (_ = D, P = Y, Y = F, F = P), O = 0; _;) O = (F[--_] = F[_] + Y[_] + O) / c | 0, F[_] %= c;
      for (O && (F.unshift(O), ++x), D = F.length; F[--D] == 0;) F.pop();
      return d.d = F, d.e = x, n ? B(d, re) : d
    }

    function w(S, d, O) {
      if (S !== ~~S || S < d || S > O) throw Error(o + S)
    }

    function A(S) {
      var d, O, P, x = S.length - 1,
        _ = "",
        C = S[0];
      if (x > 0) {
        for (_ += C, d = 1; d < x; d++) P = S[d] + "", O = p - P.length, O && (_ += j(O)), _ += P;
        C = S[d], P = C + "", O = p - P.length, O && (_ += j(O))
      } else if (C === 0) return "0";
      for (; C % 10 === 0;) C /= 10;
      return _ + C
    }
    var T = function() {
      function S(P, x) {
        var _, C = 0,
          D = P.length;
        for (P = P.slice(); D--;) _ = P[D] * x + C, P[D] = _ % c | 0, C = _ / c | 0;
        return C && P.unshift(C), P
      }

      function d(P, x, _, C) {
        var D, F;
        if (_ != C) F = _ > C ? 1 : -1;
        else
          for (D = F = 0; D < _; D++)
            if (P[D] != x[D]) {
              F = P[D] > x[D] ? 1 : -1;
              break
            } return F
      }

      function O(P, x, _) {
        for (var C = 0; _--;) P[_] -= C, C = P[_] < x[_] ? 1 : 0, P[_] = C * c + P[_] - x[_];
        for (; !P[0] && P.length > 1;) P.shift()
      }
      return function(P, x, _, C) {
        var D, F, Y, X, re, pe, K, ae, te, G, he, Z, ee, ie, ue, ce, fe, et, tt = P.constructor,
          Ue = P.s == x.s ? 1 : -1,
          xe = P.d,
          we = x.d;
        if (!P.s) return new tt(P);
        if (!x.s) throw Error(i + "Division by zero");
        for (F = P.e - x.e, fe = we.length, ue = xe.length, K = new tt(Ue), ae = K.d = [], Y = 0; we[Y] == (xe[Y] || 0);) ++Y;
        if (we[Y] > (xe[Y] || 0) && --F, _ == null ? Z = _ = tt.precision : C ? Z = _ + (y(P) - y(x)) + 1 : Z = _, Z < 0) return new tt(0);
        if (Z = Z / p + 2 | 0, Y = 0, fe == 1)
          for (X = 0, we = we[0], Z++;
            (Y < ue || X) && Z--; Y++) ee = X * c + (xe[Y] || 0), ae[Y] = ee / we | 0, X = ee % we | 0;
        else {
          for (X = c / (we[0] + 1) | 0, X > 1 && (we = S(we, X), xe = S(xe, X), fe = we.length, ue = xe.length), ie = fe, te = xe.slice(0, fe), G = te.length; G < fe;) te[G++] = 0;
          et = we.slice(), et.unshift(0), ce = we[0], we[1] >= c / 2 && ++ce;
          do X = 0, D = d(we, te, fe, G), D < 0 ? (he = te[0], fe != G && (he = he * c + (te[1] || 0)), X = he / ce | 0, X > 1 ? (X >= c && (X = c - 1), re = S(we, X), pe = re.length, G = te.length, D = d(re, te, pe, G), D == 1 && (X--, O(re, fe < pe ? et : we, pe))) : (X == 0 && (D = X = 1), re = we.slice()), pe = re.length, pe < G && re.unshift(0), O(te, re, G), D == -1 && (G = te.length, D = d(we, te, fe, G), D < 1 && (X++, O(te, fe < G ? et : we, G))), G = te.length) : D === 0 && (X++, te = [0]), ae[Y++] = X, D && te[0] ? te[G++] = xe[ie] || 0 : (te = [xe[ie]], G = 1); while ((ie++ < ue || te[0] !== void 0) && Z--)
        }
        return ae[0] || ae.shift(), K.e = F, B(K, C ? _ + y(K) + 1 : _)
      }
    }();

    function E(S, d) {
      var O, P, x, _, C, D, F = 0,
        Y = 0,
        X = S.constructor,
        re = X.precision;
      if (y(S) > 16) throw Error(a + y(S));
      if (!S.s) return new X(f);
      for (d == null ? (n = !1, D = re) : D = d, C = new X(.03125); S.abs().gte(.1);) S = S.times(C), Y += 5;
      for (P = Math.log(s(2, Y)) / Math.LN10 * 2 + 5 | 0, D += P, O = x = _ = new X(f), X.precision = D;;) {
        if (x = B(x.times(S), D), O = O.times(++F), C = _.plus(T(x, O, D)), A(C.d).slice(0, D) === A(_.d).slice(0, D)) {
          for (; Y--;) _ = B(_.times(_), D);
          return X.precision = re, d == null ? (n = !0, B(_, re)) : _
        }
        _ = C
      }
    }

    function y(S) {
      for (var d = S.e * p, O = S.d[0]; O >= 10; O /= 10) d++;
      return d
    }

    function v(S, d, O) {
      if (d > S.LN10.sd()) throw n = !0, O && (S.precision = O), Error(i + "LN10 precision limit exceeded");
      return B(new S(S.LN10), d)
    }

    function j(S) {
      for (var d = ""; S--;) d += "0";
      return d
    }

    function M(S, d) {
      var O, P, x, _, C, D, F, Y, X, re = 1,
        pe = 10,
        K = S,
        ae = K.d,
        te = K.constructor,
        G = te.precision;
      if (K.s < 1) throw Error(i + (K.s ? "NaN" : "-Infinity"));
      if (K.eq(f)) return new te(0);
      if (d == null ? (n = !1, Y = G) : Y = d, K.eq(10)) return d == null && (n = !0), v(te, Y);
      if (Y += pe, te.precision = Y, O = A(ae), P = O.charAt(0), _ = y(K), Math.abs(_) < 15e14) {
        for (; P < 7 && P != 1 || P == 1 && O.charAt(1) > 3;) K = K.times(S), O = A(K.d), P = O.charAt(0), re++;
        _ = y(K), P > 1 ? (K = new te("0." + O), _++) : K = new te(P + "." + O.slice(1))
      } else return F = v(te, Y + 2, G).times(_ + ""), K = M(new te(P + "." + O.slice(1)), Y - pe).plus(F), te.precision = G, d == null ? (n = !0, B(K, G)) : K;
      for (D = C = K = T(K.minus(f), K.plus(f), Y), X = B(K.times(K), Y), x = 3;;) {
        if (C = B(C.times(X), Y), F = D.plus(T(C, new te(x), Y)), A(F.d).slice(0, Y) === A(D.d).slice(0, Y)) return D = D.times(2), _ !== 0 && (D = D.plus(v(te, Y + 2, G).times(_ + ""))), D = T(D, new te(re), Y), te.precision = G, d == null ? (n = !0, B(D, G)) : D;
        D = F, x += 2
      }
    }

    function N(S, d) {
      var O, P, x;
      for ((O = d.indexOf(".")) > -1 && (d = d.replace(".", "")), (P = d.search(/e/i)) > 0 ? (O < 0 && (O = P), O += +d.slice(P + 1), d = d.substring(0, P)) : O < 0 && (O = d.length), P = 0; d.charCodeAt(P) === 48;) ++P;
      for (x = d.length; d.charCodeAt(x - 1) === 48;) --x;
      if (d = d.slice(P, x), d) {
        if (x -= P, O = O - P - 1, S.e = u(O / p), S.d = [], P = (O + 1) % p, O < 0 && (P += p), P < x) {
          for (P && S.d.push(+d.slice(0, P)), x -= p; P < x;) S.d.push(+d.slice(P, P += p));
          d = d.slice(P), P = p - d.length
        } else P -= x;
        for (; P--;) d += "0";
        if (S.d.push(+d), n && (S.e > g || S.e < -g)) throw Error(a + O)
      } else S.s = 0, S.e = 0, S.d = [0];
      return S
    }

    function B(S, d, O) {
      var P, x, _, C, D, F, Y, X, re = S.d;
      for (C = 1, _ = re[0]; _ >= 10; _ /= 10) C++;
      if (P = d - C, P < 0) P += p, x = d, Y = re[X = 0];
      else {
        if (X = Math.ceil((P + 1) / p), _ = re.length, X >= _) return S;
        for (Y = _ = re[X], C = 1; _ >= 10; _ /= 10) C++;
        P %= p, x = P - p + C
      }
      if (O !== void 0 && (_ = s(10, C - x - 1), D = Y / _ % 10 | 0, F = d < 0 || re[X + 1] !== void 0 || Y % _, F = O < 4 ? (D || F) && (O == 0 || O == (S.s < 0 ? 3 : 2)) : D > 5 || D == 5 && (O == 4 || F || O == 6 && (P > 0 ? x > 0 ? Y / s(10, C - x) : 0 : re[X - 1]) % 10 & 1 || O == (S.s < 0 ? 8 : 7))), d < 1 || !re[0]) return F ? (_ = y(S), re.length = 1, d = d - _ - 1, re[0] = s(10, (p - d % p) % p), S.e = u(-d / p) || 0) : (re.length = 1, re[0] = S.e = S.s = 0), S;
      if (P == 0 ? (re.length = X, _ = 1, X--) : (re.length = X + 1, _ = s(10, p - P), re[X] = x > 0 ? (Y / s(10, C - x) % s(10, x) | 0) * _ : 0), F)
        for (;;)
          if (X == 0) {
            (re[0] += _) == c && (re[0] = 1, ++S.e);
            break
          } else {
            if (re[X] += _, re[X] != c) break;
            re[X--] = 0, _ = 1
          } for (P = re.length; re[--P] === 0;) re.pop();
      if (n && (S.e > g || S.e < -g)) throw Error(a + y(S));
      return S
    }

    function $(S, d) {
      var O, P, x, _, C, D, F, Y, X, re, pe = S.constructor,
        K = pe.precision;
      if (!S.s || !d.s) return d.s ? d.s = -d.s : d = new pe(S), n ? B(d, K) : d;
      if (F = S.d, re = d.d, P = d.e, Y = S.e, F = F.slice(), C = Y - P, C) {
        for (X = C < 0, X ? (O = F, C = -C, D = re.length) : (O = re, P = Y, D = F.length), x = Math.max(Math.ceil(K / p), D) + 2, C > x && (C = x, O.length = 1), O.reverse(), x = C; x--;) O.push(0);
        O.reverse()
      } else {
        for (x = F.length, D = re.length, X = x < D, X && (D = x), x = 0; x < D; x++)
          if (F[x] != re[x]) {
            X = F[x] < re[x];
            break
          } C = 0
      }
      for (X && (O = F, F = re, re = O, d.s = -d.s), D = F.length, x = re.length - D; x > 0; --x) F[D++] = 0;
      for (x = re.length; x > C;) {
        if (F[--x] < re[x]) {
          for (_ = x; _ && F[--_] === 0;) F[_] = c - 1;
          --F[_], F[x] += c
        }
        F[x] -= re[x]
      }
      for (; F[--D] === 0;) F.pop();
      for (; F[0] === 0; F.shift()) --P;
      return F[0] ? (d.d = F, d.e = P, n ? B(d, K) : d) : new pe(0)
    }

    function R(S, d, O) {
      var P, x = y(S),
        _ = A(S.d),
        C = _.length;
      return d ? (O && (P = O - C) > 0 ? _ = _.charAt(0) + "." + _.slice(1) + j(P) : C > 1 && (_ = _.charAt(0) + "." + _.slice(1)), _ = _ + (x < 0 ? "e" : "e+") + x) : x < 0 ? (_ = "0." + j(-x - 1) + _, O && (P = O - C) > 0 && (_ += j(P))) : x >= C ? (_ += j(x + 1 - C), O && (P = O - x - 1) > 0 && (_ = _ + "." + j(P))) : ((P = x + 1) < C && (_ = _.slice(0, P) + "." + _.slice(P)), O && (P = O - C) > 0 && (x + 1 === C && (_ += "."), _ += j(P))), S.s < 0 ? "-" + _ : _
    }

    function z(S, d) {
      if (S.length > d) return S.length = d, !0
    }

    function H(S) {
      var d, O, P;

      function x(_) {
        var C = this;
        if (!(C instanceof x)) return new x(_);
        if (C.constructor = x, _ instanceof x) {
          C.s = _.s, C.e = _.e, C.d = (_ = _.d) ? _.slice() : _;
          return
        }
        if (typeof _ == "number") {
          if (_ * 0 !== 0) throw Error(o + _);
          if (_ > 0) C.s = 1;
          else if (_ < 0) _ = -_, C.s = -1;
          else {
            C.s = 0, C.e = 0, C.d = [0];
            return
          }
          if (_ === ~~_ && _ < 1e7) {
            C.e = 0, C.d = [_];
            return
          }
          return N(C, _.toString())
        } else if (typeof _ != "string") throw Error(o + _);
        if (_.charCodeAt(0) === 45 ? (_ = _.slice(1), C.s = -1) : C.s = 1, l.test(_)) N(C, _);
        else throw Error(o + _)
      }
      if (x.prototype = m, x.ROUND_UP = 0, x.ROUND_DOWN = 1, x.ROUND_CEIL = 2, x.ROUND_FLOOR = 3, x.ROUND_HALF_UP = 4, x.ROUND_HALF_DOWN = 5, x.ROUND_HALF_EVEN = 6, x.ROUND_HALF_CEIL = 7, x.ROUND_HALF_FLOOR = 8, x.clone = H, x.config = x.set = W, S === void 0 && (S = {}), S)
        for (P = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], d = 0; d < P.length;) S.hasOwnProperty(O = P[d++]) || (S[O] = this[O]);
      return x.config(S), x
    }

    function W(S) {
      if (!S || typeof S != "object") throw Error(i + "Object expected");
      var d, O, P, x = ["precision", 1, t, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (d = 0; d < x.length; d += 3)
        if ((P = S[O = x[d]]) !== void 0)
          if (u(P) === P && P >= x[d + 1] && P <= x[d + 2]) this[O] = P;
          else throw Error(o + O + ": " + P);
      if ((P = S[O = "LN10"]) !== void 0)
        if (P == Math.LN10) this[O] = new this(P);
        else throw Error(o + O + ": " + P);
      return this
    }
    r = H(r), r.default = r.Decimal = r, f = new r(1), typeof define == "function" && define.amd ? define(function() {
      return r
    }) : typeof Ps < "u" && Ps.exports ? Ps.exports = r : (e || (e = typeof self < "u" && self && self.self == self ? self : Function("return this")()), e.Decimal = r)
  })(vw)
});
var aO = I((ere, oO) => {
  function LW(e) {
    var t = e == null ? 0 : e.length;
    return t ? e[t - 1] : void 0
  }
  oO.exports = LW
});
var SO = I((bre, OO) => {
  "use strict";
  var fz = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  OO.exports = fz
});
var _O = I((xre, TO) => {
  "use strict";
  var pz = SO();

  function AO() {}

  function PO() {}
  PO.resetWarningCache = AO;
  TO.exports = function() {
    function e(n, i, o, a, u, s) {
      if (s !== pz) {
        var l = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw l.name = "Invariant Violation", l
      }
    }
    e.isRequired = e;

    function t() {
      return e
    }
    var r = {
      array: e,
      bigint: e,
      bool: e,
      func: e,
      number: e,
      object: e,
      string: e,
      symbol: e,
      any: e,
      arrayOf: t,
      element: e,
      elementType: e,
      instanceOf: t,
      node: e,
      objectOf: t,
      oneOf: t,
      oneOfType: t,
      shape: t,
      exact: t,
      checkPropTypes: PO,
      resetWarningCache: AO
    };
    return r.PropTypes = r, r
  }
});
var jO = I((Sre, EO) => {
  EO.exports = _O()();
  var wre, Ore
});
var hS = I((dne, mS) => {
  var b8 = Ko(),
    x8 = gp(),
    w8 = $t();

  function O8(e, t) {
    return e && e.length ? b8(e, w8(t, 2), x8) : void 0
  }
  mS.exports = O8
});
var vS = I((mne, yS) => {
  var S8 = Ko(),
    A8 = $t(),
    P8 = bp();

  function T8(e, t) {
    return e && e.length ? S8(e, A8(t, 2), P8) : void 0
  }
  yS.exports = T8
});
var IS = I((Nne, CS) => {
  var K8 = af(),
    V8 = K8(Object.getPrototypeOf, Object);
  CS.exports = V8
});
var RS = I((Dne, DS) => {
  var Y8 = Jt(),
    X8 = IS(),
    Z8 = Qt(),
    J8 = "[object Object]",
    Q8 = Function.prototype,
    e4 = Object.prototype,
    NS = Q8.toString,
    t4 = e4.hasOwnProperty,
    r4 = NS.call(Object);

  function n4(e) {
    if (!Z8(e) || Y8(e) != J8) return !1;
    var t = X8(e);
    if (t === null) return !0;
    var r = t4.call(t, "constructor") && t.constructor;
    return typeof r == "function" && r instanceof r && NS.call(r) == r4
  }
  DS.exports = n4
});
var BS = I((Rne, LS) => {
  var i4 = Jt(),
    o4 = Qt(),
    a4 = "[object Boolean]";

  function u4(e) {
    return e === !0 || e === !1 || o4(e) && i4(e) == a4
  }
  LS.exports = u4
});
var oA = I((die, iA) => {
  var H4 = Math.ceil,
    U4 = Math.max;

  function G4(e, t, r, n) {
    for (var i = -1, o = U4(H4((t - e) / (r || 1)), 0), a = Array(o); o--;) a[n ? o : ++i] = e, e += r;
    return a
  }
  iA.exports = G4
});
var vd = I((mie, uA) => {
  var K4 = Mf(),
    aA = 1 / 0,
    V4 = 17976931348623157e292;

  function Y4(e) {
    if (!e) return e === 0 ? e : 0;
    if (e = K4(e), e === aA || e === -aA) {
      var t = e < 0 ? -1 : 1;
      return t * V4
    }
    return e === e ? e : 0
  }
  uA.exports = Y4
});
var lA = I((hie, sA) => {
  var X4 = oA(),
    Z4 = xo(),
    gd = vd();

  function J4(e) {
    return function(t, r, n) {
      return n && typeof n != "number" && Z4(t, r, n) && (r = n = void 0), t = gd(t), r === void 0 ? (r = t, t = 0) : r = gd(r), n = n === void 0 ? t < r ? 1 : -1 : gd(n), X4(t, r, n, e)
    }
  }
  sA.exports = J4
});
var bd = I((yie, cA) => {
  var Q4 = lA(),
    e5 = Q4();
  cA.exports = e5
});
var OA = I((Eie, wA) => {
  var m5 = Nu();

  function h5(e, t) {
    var r;
    return m5(e, function(n, i, o) {
      return r = t(n, i, o), !r
    }), !!r
  }
  wA.exports = h5
});
var AA = I((jie, SA) => {
  var y5 = Xc(),
    v5 = $t(),
    g5 = OA(),
    b5 = rt(),
    x5 = xo();

  function w5(e, t, r) {
    var n = b5(e) ? y5 : g5;
    return r && x5(e, t, r) && (t = void 0), n(e, v5(t, 3))
  }
  SA.exports = w5
});
var _A = I((Mie, TA) => {
  var PA = Af();

  function O5(e, t, r) {
    t == "__proto__" && PA ? PA(e, t, {
      configurable: !0,
      enumerable: !0,
      value: r,
      writable: !0
    }) : e[t] = r
  }
  TA.exports = O5
});
var jA = I((Cie, EA) => {
  var S5 = _A(),
    A5 = wf(),
    P5 = $t();

  function T5(e, t) {
    var r = {};
    return t = P5(t, 3), A5(e, function(n, i, o) {
      S5(r, i, t(n, i, o))
    }), r
  }
  EA.exports = T5
});
var MA = I((Iie, kA) => {
  function _5(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n;)
      if (!t(e[r], r, e)) return !1;
    return !0
  }
  kA.exports = _5
});
var IA = I((Nie, CA) => {
  var E5 = Nu();

  function j5(e, t) {
    var r = !0;
    return E5(e, function(n, i, o) {
      return r = !!t(n, i, o), r
    }), r
  }
  CA.exports = j5
});
var Sd = I((Die, NA) => {
  var k5 = MA(),
    M5 = IA(),
    C5 = $t(),
    I5 = rt(),
    N5 = xo();

  function D5(e, t, r) {
    var n = I5(e) ? k5 : M5;
    return r && N5(e, t, r) && (t = void 0), n(e, C5(t, 3))
  }
  NA.exports = D5
});
var QA = I((aoe, JA) => {
  var o6 = $t(),
    a6 = Kn(),
    u6 = go();

  function s6(e) {
    return function(t, r, n) {
      var i = Object(t);
      if (!a6(t)) {
        var o = o6(r, 3);
        t = u6(t), r = function(u) {
          return o(i[u], u, i)
        }
      }
      var a = e(t, r, n);
      return a > -1 ? i[o ? t[a] : a] : void 0
    }
  }
  JA.exports = s6
});
var tP = I((uoe, eP) => {
  var l6 = vd();

  function c6(e) {
    var t = l6(e),
      r = t % 1;
    return t === t ? r ? t - r : t : 0
  }
  eP.exports = c6
});
var nP = I((soe, rP) => {
  var f6 = yf(),
    p6 = $t(),
    d6 = tP(),
    m6 = Math.max;

  function h6(e, t, r) {
    var n = e == null ? 0 : e.length;
    if (!n) return -1;
    var i = r == null ? 0 : d6(r);
    return i < 0 && (i = m6(n + i, 0)), f6(e, p6(t, 3), i)
  }
  rP.exports = h6
});
var oP = I((loe, iP) => {
  var y6 = QA(),
    v6 = nP(),
    g6 = y6(v6);
  iP.exports = g6
});
var yT = I((iue, Yd) => {
  "use strict";
  var uU = Object.prototype.hasOwnProperty,
    ot = "~";

  function Ua() {}
  Object.create && (Ua.prototype = Object.create(null), new Ua().__proto__ || (ot = !1));

  function sU(e, t, r) {
    this.fn = e, this.context = t, this.once = r || !1
  }

  function hT(e, t, r, n, i) {
    if (typeof r != "function") throw new TypeError("The listener must be a function");
    var o = new sU(r, n || e, i),
      a = ot ? ot + t : t;
    return e._events[a] ? e._events[a].fn ? e._events[a] = [e._events[a], o] : e._events[a].push(o) : (e._events[a] = o, e._eventsCount++), e
  }

  function Ml(e, t) {
    --e._eventsCount === 0 ? e._events = new Ua : delete e._events[t]
  }

  function Qe() {
    this._events = new Ua, this._eventsCount = 0
  }
  Qe.prototype.eventNames = function() {
    var t = [],
      r, n;
    if (this._eventsCount === 0) return t;
    for (n in r = this._events) uU.call(r, n) && t.push(ot ? n.slice(1) : n);
    return Object.getOwnPropertySymbols ? t.concat(Object.getOwnPropertySymbols(r)) : t
  };
  Qe.prototype.listeners = function(t) {
    var r = ot ? ot + t : t,
      n = this._events[r];
    if (!n) return [];
    if (n.fn) return [n.fn];
    for (var i = 0, o = n.length, a = new Array(o); i < o; i++) a[i] = n[i].fn;
    return a
  };
  Qe.prototype.listenerCount = function(t) {
    var r = ot ? ot + t : t,
      n = this._events[r];
    return n ? n.fn ? 1 : n.length : 0
  };
  Qe.prototype.emit = function(t, r, n, i, o, a) {
    var u = ot ? ot + t : t;
    if (!this._events[u]) return !1;
    var s = this._events[u],
      l = arguments.length,
      f, c;
    if (s.fn) {
      switch (s.once && this.removeListener(t, s.fn, void 0, !0), l) {
        case 1:
          return s.fn.call(s.context), !0;
        case 2:
          return s.fn.call(s.context, r), !0;
        case 3:
          return s.fn.call(s.context, r, n), !0;
        case 4:
          return s.fn.call(s.context, r, n, i), !0;
        case 5:
          return s.fn.call(s.context, r, n, i, o), !0;
        case 6:
          return s.fn.call(s.context, r, n, i, o, a), !0
      }
      for (c = 1, f = new Array(l - 1); c < l; c++) f[c - 1] = arguments[c];
      s.fn.apply(s.context, f)
    } else {
      var p = s.length,
        h;
      for (c = 0; c < p; c++) switch (s[c].once && this.removeListener(t, s[c].fn, void 0, !0), l) {
        case 1:
          s[c].fn.call(s[c].context);
          break;
        case 2:
          s[c].fn.call(s[c].context, r);
          break;
        case 3:
          s[c].fn.call(s[c].context, r, n);
          break;
        case 4:
          s[c].fn.call(s[c].context, r, n, i);
          break;
        default:
          if (!f)
            for (h = 1, f = new Array(l - 1); h < l; h++) f[h - 1] = arguments[h];
          s[c].fn.apply(s[c].context, f)
      }
    }
    return !0
  };
  Qe.prototype.on = function(t, r, n) {
    return hT(this, t, r, n, !1)
  };
  Qe.prototype.once = function(t, r, n) {
    return hT(this, t, r, n, !0)
  };
  Qe.prototype.removeListener = function(t, r, n, i) {
    var o = ot ? ot + t : t;
    if (!this._events[o]) return this;
    if (!r) return Ml(this, o), this;
    var a = this._events[o];
    if (a.fn) a.fn === r && (!i || a.once) && (!n || a.context === n) && Ml(this, o);
    else {
      for (var u = 0, s = [], l = a.length; u < l; u++)(a[u].fn !== r || i && !a[u].once || n && a[u].context !== n) && s.push(a[u]);
      s.length ? this._events[o] = s.length === 1 ? s[0] : s : Ml(this, o)
    }
    return this
  };
  Qe.prototype.removeAllListeners = function(t) {
    var r;
    return t ? (r = ot ? ot + t : t, this._events[r] && Ml(this, r)) : (this._events = new Ua, this._eventsCount = 0), this
  };
  Qe.prototype.off = Qe.prototype.removeListener;
  Qe.prototype.addListener = Qe.prototype.on;
  Qe.prefixed = ot;
  Qe.EventEmitter = Qe;
  typeof Yd < "u" && (Yd.exports = Qe)
});
import {
  useEffect as WT,
  useState as Or,
  useMemo as Xt,
  useCallback as rm
} from "./react-shim-eraudit.js";
import lc from "./react-shim-eraudit.js";

function im(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++) e[t] && (r = im(e[t])) && (n && (n += " "), n += r)
    } else
      for (r in e) e[r] && (n && (n += " "), n += r);
  return n
}

function JT() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++)(e = arguments[r]) && (t = im(e)) && (n && (n += " "), n += t);
  return n
}
var ne = JT;
var ic = J(Ar()),
  Nn = J(ft()),
  uy = J(tu()),
  sy = J(_e()),
  ly = J(wt()),
  cy = J(Gh());
import {
  Children as oc,
  isValidElement as ak
} from "./react-shim-eraudit.js";
var Cn = J(tu()),
  Ql = J(Jl()),
  Yh = J(Ar()),
  Xh = J(Zl()),
  Zh = J(ft()),
  Me = function(t) {
    return t === 0 ? 0 : t > 0 ? 1 : -1
  },
  cr = function(t) {
    return (0, Cn.default)(t) && t.indexOf("%") === t.length - 1
  },
  V = function(t) {
    return (0, Xh.default)(t) && !(0, Ql.default)(t)
  },
  Jh = function(t) {
    return (0, Zh.default)(t)
  },
  Se = function(t) {
    return V(t) || (0, Cn.default)(t)
  },
  Qj = 0,
  St = function(t) {
    var r = ++Qj;
    return "".concat(t || "").concat(r)
  },
  Ce = function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!V(t) && !(0, Cn.default)(t)) return n;
    var o;
    if (cr(t)) {
      var a = t.indexOf("%");
      o = r * parseFloat(t.slice(0, a)) / 100
    } else o = +t;
    return (0, Ql.default)(o) && (o = n), i && o > r && (o = r), o
  },
  er = function(t) {
    if (!t) return null;
    var r = Object.keys(t);
    return r && r.length ? t[r[0]] : null
  },
  Qh = function(t) {
    if (!Array.isArray(t)) return !1;
    for (var r = t.length, n = {}, i = 0; i < r; i++)
      if (!n[t[i]]) n[t[i]] = !0;
      else return !0;
    return !1
  },
  Ge = function(t, r) {
    return V(t) && V(r) ? function(n) {
      return t + n * (r - t)
    } : function() {
      return r
    }
  };

function In(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : (0, Yh.default)(n, t)) === r
  })
}
var ey = function(t, r) {
  return V(t) && V(r) ? t - r : (0, Cn.default)(t) && (0, Cn.default)(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r))
};

function fr(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r])) return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n)) return !1;
  return !0
}
var tc = J(wt());
import {
  isValidElement as ek
} from "./react-shim-eraudit.js";

function ec(e) {
  "@babel/helpers - typeof";
  return ec = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ec(e)
}
var tk = ["viewBox", "children"],
  ry = ["aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "className", "color", "height", "id", "lang", "max", "media", "method", "min", "name", "style", "target", "width", "role", "tabIndex", "accentHeight", "accumulate", "additive", "alignmentBaseline", "allowReorder", "alphabetic", "amplitude", "arabicForm", "ascent", "attributeName", "attributeType", "autoReverse", "azimuth", "baseFrequency", "baselineShift", "baseProfile", "bbox", "begin", "bias", "by", "calcMode", "capHeight", "clip", "clipPath", "clipPathUnits", "clipRule", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "contentScriptType", "contentStyleType", "cursor", "cx", "cy", "d", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominantBaseline", "dur", "dx", "dy", "edgeMode", "elevation", "enableBackground", "end", "exponent", "externalResourcesRequired", "fill", "fillOpacity", "fillRule", "filter", "filterRes", "filterUnits", "floodColor", "floodOpacity", "focusable", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "format", "from", "fx", "fy", "g1", "g2", "glyphName", "glyphOrientationHorizontal", "glyphOrientationVertical", "glyphRef", "gradientTransform", "gradientUnits", "hanging", "horizAdvX", "horizOriginX", "href", "ideographic", "imageRendering", "in2", "in", "intercept", "k1", "k2", "k3", "k4", "k", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letterSpacing", "lightingColor", "limitingConeAngle", "local", "markerEnd", "markerHeight", "markerMid", "markerStart", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "mode", "numOctaves", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlinePosition", "overlineThickness", "paintOrder", "panose1", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointerEvents", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "r", "radius", "refX", "refY", "renderingIntent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "result", "rotate", "rx", "ry", "seed", "shapeRendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stopColor", "stopOpacity", "strikethroughPosition", "strikethroughThickness", "string", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textAnchor", "textDecoration", "textLength", "textRendering", "to", "transform", "u1", "u2", "underlinePosition", "underlineThickness", "unicode", "unicodeBidi", "unicodeRange", "unitsPerEm", "vAlphabetic", "values", "vectorEffect", "version", "vertAdvY", "vertOriginX", "vertOriginY", "vHanging", "vIdeographic", "viewTarget", "visibility", "vMathematical", "widths", "wordSpacing", "writingMode", "x1", "x2", "x", "xChannelSelector", "xHeight", "xlinkActuate", "xlinkArcrole", "xlinkHref", "xlinkRole", "xlinkShow", "xlinkTitle", "xlinkType", "xmlBase", "xmlLang", "xmlns", "xmlnsXlink", "xmlSpace", "y1", "y2", "y", "yChannelSelector", "z", "zoomAndPan", "ref", "key", "angle"],
  ty = ["points", "pathLength"],
  pu = {
    svg: tk,
    polygon: ty,
    polyline: ty
  },
  du = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"],
  Wr = function(t, r) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var n = t;
    if (ek(t) && (n = t.props), !(0, tc.default)(n)) return null;
    var i = {};
    return Object.keys(n).forEach(function(o) {
      du.includes(o) && (i[o] = r || function(a) {
        return n[o](n, a)
      })
    }), i
  },
  rk = function(t, r, n) {
    return function(i) {
      return t(r, n, i), null
    }
  },
  pt = function(t, r, n) {
    if (!(0, tc.default)(t) || ec(t) !== "object") return null;
    var i = null;
    return Object.keys(t).forEach(function(o) {
      var a = t[o];
      du.includes(o) && typeof a == "function" && (i || (i = {}), i[o] = rk(a, r, n))
    }), i
  };
var nk = ["children"],
  ik = ["children"];

function ny(e, t) {
  if (e == null) return {};
  var r = ok(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function ok(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function nc(e) {
  "@babel/helpers - typeof";
  return nc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, nc(e)
}
var iy = {
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
};
var At = function(t) {
    return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : ""
  },
  oy = null,
  rc = null,
  ac = function e(t) {
    if (t === oy && Array.isArray(rc)) return rc;
    var r = [];
    return oc.forEach(t, function(n) {
      (0, Nn.default)(n) || ((0, cy.isFragment)(n) ? r = r.concat(e(n.props.children)) : r.push(n))
    }), rc = r, oy = t, r
  };

function Ie(e, t) {
  var r = [],
    n = [];
  return Array.isArray(t) ? n = t.map(function(i) {
    return At(i)
  }) : n = [At(t)], ac(e).forEach(function(i) {
    var o = (0, ic.default)(i, "type.displayName") || (0, ic.default)(i, "type.name");
    n.indexOf(o) !== -1 && r.push(i)
  }), r
}

function Ke(e, t) {
  var r = Ie(e, t);
  return r && r[0]
}
var uc = function(t) {
    if (!t || !t.props) return !1;
    var r = t.props,
      n = r.width,
      i = r.height;
    return !(!V(n) || n <= 0 || !V(i) || i <= 0)
  },
  uk = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"],
  sk = function(t) {
    return t && t.type && (0, uy.default)(t.type) && uk.indexOf(t.type) >= 0
  },
  fy = function(t) {
    return t && nc(t) === "object" && "clipDot" in t
  },
  lk = function(t, r, n, i) {
    var o, a = (o = pu === null || pu === void 0 ? void 0 : pu[i]) !== null && o !== void 0 ? o : [];
    return r.startsWith("data-") || !(0, sy.default)(t) && (i && a.includes(r) || ry.includes(r)) || n && du.includes(r)
  };
var Q = function(t, r, n) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var i = t;
    if (ak(t) && (i = t.props), !(0, ly.default)(i)) return null;
    var o = {};
    return Object.keys(i).forEach(function(a) {
      var u;
      lk((u = i) === null || u === void 0 ? void 0 : u[a], a, r, n) && (o[a] = i[a])
    }), o
  },
  mu = function e(t, r) {
    if (t === r) return !0;
    var n = oc.count(t);
    if (n !== oc.count(r)) return !1;
    if (n === 0) return !0;
    if (n === 1) return ay(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
    for (var i = 0; i < n; i++) {
      var o = t[i],
        a = r[i];
      if (Array.isArray(o) || Array.isArray(a)) {
        if (!e(o, a)) return !1
      } else if (!ay(o, a)) return !1
    }
    return !0
  },
  ay = function(t, r) {
    if ((0, Nn.default)(t) && (0, Nn.default)(r)) return !0;
    if (!(0, Nn.default)(t) && !(0, Nn.default)(r)) {
      var n = t.props || {},
        i = n.children,
        o = ny(n, nk),
        a = r.props || {},
        u = a.children,
        s = ny(a, ik);
      return i && u ? fr(o, s) && mu(i, u) : !i && !u ? fr(o, s) : !1
    }
    return !1
  },
  sc = function(t, r) {
    var n = [],
      i = {};
    return ac(t).forEach(function(o, a) {
      if (sk(o)) n.push(o);
      else if (o) {
        var u = At(o.type),
          s = r[u] || {},
          l = s.handler,
          f = s.once;
        if (l && (!f || !i[u])) {
          var c = l(o, u, a);
          n.push(c), i[u] = !0
        }
      }
    }), n
  },
  py = function(t) {
    var r = t && t.type;
    return r && iy[r] ? iy[r] : null
  },
  dy = function(t, r) {
    return ac(r).indexOf(t)
  };
var ck = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];

function cc() {
  return cc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, cc.apply(this, arguments)
}

function fk(e, t) {
  if (e == null) return {};
  var r = pk(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function pk(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function so(e) {
  var t = e.children,
    r = e.width,
    n = e.height,
    i = e.viewBox,
    o = e.className,
    a = e.style,
    u = e.title,
    s = e.desc,
    l = fk(e, ck),
    f = i || {
      width: r,
      height: n,
      x: 0,
      y: 0
    },
    c = ne("recharts-surface", o);
  return lc.createElement("svg", cc({}, Q(l, !0, "svg"), {
    className: c,
    width: r,
    height: n,
    style: a,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), lc.createElement("title", null, u), lc.createElement("desc", null, s), t)
}
import my from "./react-shim-eraudit.js";
var dk = ["children", "className"];

function fc() {
  return fc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, fc.apply(this, arguments)
}

function mk(e, t) {
  if (e == null) return {};
  var r = hk(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function hk(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var le = my.forwardRef(function(e, t) {
  var r = e.children,
    n = e.className,
    i = mk(e, dk),
    o = ne("recharts-layer", n);
  return my.createElement("g", fc({
    className: o
  }, Q(i, !0), {
    ref: t
  }), r)
});
import bo, {
  PureComponent as PD
} from "./react-shim-eraudit.js";
var Kc = J(_e());
import tr, {
  PureComponent as jM
} from "./react-shim-eraudit.js";
var yk = !1,
  qe = function(t, r) {
    for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) i[o - 2] = arguments[o];
    if (yk && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var a = 0;
        console.warn(r.replace(/%s/g, function() {
          return i[a++]
        }))
      }
  };
var Hc = J(hu());
import yM from "./react-shim-eraudit.js";

function ve(e) {
  return function() {
    return e
  }
}
var hc = Math.cos;
var lo = Math.sin,
  $e = Math.sqrt;
var zr = Math.PI,
  IK = zr / 2,
  Dn = 2 * zr;
var yc = Math.PI,
  vc = 2 * yc,
  Hr = 1e-6,
  eM = vc - Hr;

function Dy(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t) this._ += arguments[t] + e[t]
}

function tM(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Dy;
  let r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, o = n.length; i < o; ++i) this._ += Math.round(arguments[i] * r) / r + n[i]
  }
}
var Ur = class {
  constructor(t) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Dy : tM(t)
  }
  moveTo(t, r) {
    this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+r}`
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`)
  }
  lineTo(t, r) {
    this._append`L${this._x1=+t},${this._y1=+r}`
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${this._x1=+n},${this._y1=+i}`
  }
  bezierCurveTo(t, r, n, i, o, a) {
    this._append`C${+t},${+r},${+n},${+i},${this._x1=+o},${this._y1=+a}`
  }
  arcTo(t, r, n, i, o) {
    if (t = +t, r = +r, n = +n, i = +i, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let a = this._x1,
      u = this._y1,
      s = n - t,
      l = i - r,
      f = a - t,
      c = u - r,
      p = f * f + c * c;
    if (this._x1 === null) this._append`M${this._x1=t},${this._y1=r}`;
    else if (p > Hr)
      if (!(Math.abs(c * s - l * f) > Hr) || !o) this._append`L${this._x1=t},${this._y1=r}`;
      else {
        let h = n - a,
          g = i - u,
          m = s * s + l * l,
          b = h * h + g * g,
          w = Math.sqrt(m),
          A = Math.sqrt(p),
          T = o * Math.tan((yc - Math.acos((m + p - b) / (2 * w * A))) / 2),
          E = T / A,
          y = T / w;
        Math.abs(E - 1) > Hr && this._append`L${t+E*f},${r+E*c}`, this._append`A${o},${o},0,0,${+(c*h>f*g)},${this._x1=t+y*s},${this._y1=r+y*l}`
      }
  }
  arc(t, r, n, i, o, a) {
    if (t = +t, r = +r, n = +n, a = !!a, n < 0) throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(i),
      s = n * Math.sin(i),
      l = t + u,
      f = r + s,
      c = 1 ^ a,
      p = a ? i - o : o - i;
    this._x1 === null ? this._append`M${l},${f}` : (Math.abs(this._x1 - l) > Hr || Math.abs(this._y1 - f) > Hr) && this._append`L${l},${f}`, n && (p < 0 && (p = p % vc + vc), p > eM ? this._append`A${n},${n},0,1,${c},${t-u},${r-s}A${n},${n},0,1,${c},${this._x1=l},${this._y1=f}` : p > Hr && this._append`A${n},${n},0,${+(p>=yc)},${c},${this._x1=t+n*Math.cos(o)},${this._y1=r+n*Math.sin(o)}`)
  }
  rect(t, r, n, i) {
    this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+r}h${n=+n}v${+i}h${-n}Z`
  }
  toString() {
    return this._
  }
};

function Ry() {
  return new Ur
}
Ry.prototype = Ur.prototype;

function Rn(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null) t = null;
    else {
      let n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n
    }
    return e
  }, () => new Ur(t)
}
var FK = Array.prototype.slice;

function Ln(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e)
}

function Ly(e) {
  this._context = e
}
Ly.prototype = {
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
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break
    }
  }
};

function Pr(e) {
  return new Ly(e)
}

function yu(e) {
  return e[0]
}

function vu(e) {
  return e[1]
}

function co(e, t) {
  var r = ve(!0),
    n = null,
    i = Pr,
    o = null,
    a = Rn(u);
  e = typeof e == "function" ? e : e === void 0 ? yu : ve(e), t = typeof t == "function" ? t : t === void 0 ? vu : ve(t);

  function u(s) {
    var l, f = (s = Ln(s)).length,
      c, p = !1,
      h;
    for (n == null && (o = i(h = a())), l = 0; l <= f; ++l) !(l < f && r(c = s[l], l, s)) === p && ((p = !p) ? o.lineStart() : o.lineEnd()), p && o.point(+e(c, l, s), +t(c, l, s));
    if (h) return o = null, h + "" || null
  }
  return u.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : ve(+s), u) : e
  }, u.y = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : ve(+s), u) : t
  }, u.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : ve(!!s), u) : r
  }, u.curve = function(s) {
    return arguments.length ? (i = s, n != null && (o = i(n)), u) : i
  }, u.context = function(s) {
    return arguments.length ? (s == null ? n = o = null : o = i(n = s), u) : n
  }, u
}

function Bn(e, t, r) {
  var n = null,
    i = ve(!0),
    o = null,
    a = Pr,
    u = null,
    s = Rn(l);
  e = typeof e == "function" ? e : e === void 0 ? yu : ve(+e), t = typeof t == "function" ? t : t === void 0 ? ve(0) : ve(+t), r = typeof r == "function" ? r : r === void 0 ? vu : ve(+r);

  function l(c) {
    var p, h, g, m = (c = Ln(c)).length,
      b, w = !1,
      A, T = new Array(m),
      E = new Array(m);
    for (o == null && (u = a(A = s())), p = 0; p <= m; ++p) {
      if (!(p < m && i(b = c[p], p, c)) === w)
        if (w = !w) h = p, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), g = p - 1; g >= h; --g) u.point(T[g], E[g]);
          u.lineEnd(), u.areaEnd()
        } w && (T[p] = +e(b, p, c), E[p] = +t(b, p, c), u.point(n ? +n(b, p, c) : T[p], r ? +r(b, p, c) : E[p]))
    }
    if (A) return u = null, A + "" || null
  }

  function f() {
    return co().defined(i).curve(a).context(o)
  }
  return l.x = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : ve(+c), n = null, l) : e
  }, l.x0 = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : ve(+c), l) : e
  }, l.x1 = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : ve(+c), l) : n
  }, l.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : ve(+c), r = null, l) : t
  }, l.y0 = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : ve(+c), l) : t
  }, l.y1 = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : ve(+c), l) : r
  }, l.lineX0 = l.lineY0 = function() {
    return f().x(e).y(t)
  }, l.lineY1 = function() {
    return f().x(e).y(r)
  }, l.lineX1 = function() {
    return f().x(n).y(t)
  }, l.defined = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : ve(!!c), l) : i
  }, l.curve = function(c) {
    return arguments.length ? (a = c, o != null && (u = a(o)), l) : a
  }, l.context = function(c) {
    return arguments.length ? (c == null ? o = u = null : u = a(o = c), l) : o
  }, l
}
var gu = class {
  constructor(t, r) {
    this._context = t, this._x = r
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
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break
      }
    }
    this._x0 = t, this._y0 = r
  }
};

function gc(e) {
  return new gu(e, !0)
}

function bc(e) {
  return new gu(e, !1)
}
var qn = {
  draw(e, t) {
    let r = $e(t / zr);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, Dn)
  }
};
var xc = {
  draw(e, t) {
    let r = $e(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath()
  }
};
var By = $e(1 / 3),
  rM = By * 2,
  wc = {
    draw(e, t) {
      let r = $e(t / rM),
        n = r * By;
      e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath()
    }
  };
var Oc = {
  draw(e, t) {
    let r = $e(t),
      n = -r / 2;
    e.rect(n, n, r, r)
  }
};
var nM = .8908130915292852,
  qy = lo(zr / 10) / lo(7 * zr / 10),
  iM = lo(Dn / 10) * qy,
  oM = -hc(Dn / 10) * qy,
  Sc = {
    draw(e, t) {
      let r = $e(t * nM),
        n = iM * r,
        i = oM * r;
      e.moveTo(0, -r), e.lineTo(n, i);
      for (let o = 1; o < 5; ++o) {
        let a = Dn * o / 5,
          u = hc(a),
          s = lo(a);
        e.lineTo(s * r, -u * r), e.lineTo(u * n - s * i, s * n + u * i)
      }
      e.closePath()
    }
  };
var Ac = $e(3),
  Pc = {
    draw(e, t) {
      let r = -$e(t / (Ac * 3));
      e.moveTo(0, r * 2), e.lineTo(-Ac * r, -r), e.lineTo(Ac * r, -r), e.closePath()
    }
  };
var Pt = -.5,
  Tt = $e(3) / 2,
  Tc = 1 / $e(12),
  aM = (Tc / 2 + 1) * 3,
  _c = {
    draw(e, t) {
      let r = $e(t / aM),
        n = r / 2,
        i = r * Tc,
        o = n,
        a = r * Tc + r,
        u = -o,
        s = a;
      e.moveTo(n, i), e.lineTo(o, a), e.lineTo(u, s), e.lineTo(Pt * n - Tt * i, Tt * n + Pt * i), e.lineTo(Pt * o - Tt * a, Tt * o + Pt * a), e.lineTo(Pt * u - Tt * s, Tt * u + Pt * s), e.lineTo(Pt * n + Tt * i, Pt * i - Tt * n), e.lineTo(Pt * o + Tt * a, Pt * a - Tt * o), e.lineTo(Pt * u + Tt * s, Pt * s - Tt * u), e.closePath()
    }
  };

function bu(e, t) {
  let r = null,
    n = Rn(i);
  e = typeof e == "function" ? e : ve(e || qn), t = typeof t == "function" ? t : ve(t === void 0 ? 64 : +t);

  function i() {
    let o;
    if (r || (r = o = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), o) return r = null, o + "" || null
  }
  return i.type = function(o) {
    return arguments.length ? (e = typeof o == "function" ? o : ve(o), i) : e
  }, i.size = function(o) {
    return arguments.length ? (t = typeof o == "function" ? o : ve(+o), i) : t
  }, i.context = function(o) {
    return arguments.length ? (r = o ?? null, i) : r
  }, i
}

function $n() {}

function Fn(e, t, r) {
  e._context.bezierCurveTo((2 * e._x0 + e._x1) / 3, (2 * e._y0 + e._y1) / 3, (e._x0 + 2 * e._x1) / 3, (e._y0 + 2 * e._y1) / 3, (e._x0 + 4 * e._x1 + t) / 6, (e._y0 + 4 * e._y1 + r) / 6)
}

function $y(e) {
  this._context = e
}
$y.prototype = {
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
        Fn(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break
    }(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        Fn(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function Ec(e) {
  return new $y(e)
}

function Fy(e) {
  this._context = e
}
Fy.prototype = {
  areaStart: $n,
  areaEnd: $n,
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
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        Fn(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function jc(e) {
  return new Fy(e)
}

function Wy(e) {
  this._context = e
}
Wy.prototype = {
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
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6,
          n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      default:
        Fn(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function kc(e) {
  return new Wy(e)
}

function zy(e) {
  this._context = e
}
zy.prototype = {
  areaStart: $n,
  areaEnd: $n,
  lineStart: function() {
    this._point = 0
  },
  lineEnd: function() {
    this._point && this._context.closePath()
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t))
  }
};

function Mc(e) {
  return new zy(e)
}

function Hy(e) {
  return e < 0 ? -1 : 1
}

function Uy(e, t, r) {
  var n = e._x1 - e._x0,
    i = t - e._x1,
    o = (e._y1 - e._y0) / (n || i < 0 && -0),
    a = (r - e._y1) / (i || n < 0 && -0),
    u = (o * i + a * n) / (n + i);
  return (Hy(o) + Hy(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0
}

function Gy(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t
}

function Cc(e, t, r) {
  var n = e._x0,
    i = e._y0,
    o = e._x1,
    a = e._y1,
    u = (o - n) / 3;
  e._context.bezierCurveTo(n + u, i + u * t, o - u, a - u * r, o, a)
}

function xu(e) {
  this._context = e
}
xu.prototype = {
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
        Cc(this, this._t0, Gy(this, this._t0));
        break
    }(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, Cc(this, Gy(this, r = Uy(this, e, t)), r);
          break;
        default:
          Cc(this, this._t0, r = Uy(this, e, t));
          break
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r
    }
  }
};

function Ky(e) {
  this._context = new Vy(e)
}(Ky.prototype = Object.create(xu.prototype)).point = function(e, t) {
  xu.prototype.point.call(this, t, e)
};

function Vy(e) {
  this._context = e
}
Vy.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e)
  },
  closePath: function() {
    this._context.closePath()
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e)
  },
  bezierCurveTo: function(e, t, r, n, i, o) {
    this._context.bezierCurveTo(t, e, n, r, o, i)
  }
};

function Ic(e) {
  return new xu(e)
}

function Nc(e) {
  return new Ky(e)
}

function Xy(e) {
  this._context = e
}
Xy.prototype = {
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
    var e = this._x,
      t = this._y,
      r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2) this._context.lineTo(e[1], t[1]);
      else
        for (var n = Yy(e), i = Yy(t), o = 0, a = 1; a < r; ++o, ++a) this._context.bezierCurveTo(n[0][o], i[0][o], n[1][o], i[1][o], e[a], t[a]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t)
  }
};

function Yy(e) {
  var t, r = e.length - 1,
    n, i = new Array(r),
    o = new Array(r),
    a = new Array(r);
  for (i[0] = 0, o[0] = 2, a[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) i[t] = 1, o[t] = 4, a[t] = 4 * e[t] + 2 * e[t + 1];
  for (i[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = i[t] / o[t - 1], o[t] -= n, a[t] -= n * a[t - 1];
  for (i[r - 1] = a[r - 1] / o[r - 1], t = r - 2; t >= 0; --t) i[t] = (a[t] - i[t + 1]) / o[t];
  for (o[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) o[t] = 2 * e[t + 1] - i[t + 1];
  return [i, o]
}

function Dc(e) {
  return new Xy(e)
}

function wu(e, t) {
  this._context = e, this._t = t
}
wu.prototype = {
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
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t)
        }
        break
      }
    }
    this._x = e, this._y = t
  }
};

function Rc(e) {
  return new wu(e, .5)
}

function Lc(e) {
  return new wu(e, 0)
}

function Bc(e) {
  return new wu(e, 1)
}

function _t(e, t) {
  if ((a = e.length) > 1)
    for (var r = 1, n, i, o = e[t[0]], a, u = o.length; r < a; ++r)
      for (i = o, o = e[t[r]], n = 0; n < u; ++n) o[n][1] += o[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1]
}

function Wn(e) {
  for (var t = e.length, r = new Array(t); --t >= 0;) r[t] = t;
  return r
}

function uM(e, t) {
  return e[t]
}

function sM(e) {
  let t = [];
  return t.key = e, t
}

function qc() {
  var e = ve([]),
    t = Wn,
    r = _t,
    n = uM;

  function i(o) {
    var a = Array.from(e.apply(this, arguments), sM),
      u, s = a.length,
      l = -1,
      f;
    for (let c of o)
      for (u = 0, ++l; u < s; ++u)(a[u][l] = [0, +n(c, a[u].key, l, o)]).data = c;
    for (u = 0, f = Ln(t(a)); u < s; ++u) a[f[u]].index = u;
    return r(a, f), a
  }
  return i.keys = function(o) {
    return arguments.length ? (e = typeof o == "function" ? o : ve(Array.from(o)), i) : e
  }, i.value = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : ve(+o), i) : n
  }, i.order = function(o) {
    return arguments.length ? (t = o == null ? Wn : typeof o == "function" ? o : ve(Array.from(o)), i) : t
  }, i.offset = function(o) {
    return arguments.length ? (r = o ?? _t, i) : r
  }, i
}

function $c(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, o = e[0].length, a; i < o; ++i) {
      for (a = r = 0; r < n; ++r) a += e[r][i][1] || 0;
      if (a)
        for (r = 0; r < n; ++r) e[r][i][1] /= a
    }
    _t(e, t)
  }
}

function Fc(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, o = n.length; r < o; ++r) {
      for (var a = 0, u = 0; a < i; ++a) u += e[a][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2
    }
    _t(e, t)
  }
}

function Wc(e, t) {
  if (!(!((a = e.length) > 0) || !((o = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, o, a; n < o; ++n) {
      for (var u = 0, s = 0, l = 0; u < a; ++u) {
        for (var f = e[t[u]], c = f[n][1] || 0, p = f[n - 1][1] || 0, h = (c - p) / 2, g = 0; g < u; ++g) {
          var m = e[t[g]],
            b = m[n][1] || 0,
            w = m[n - 1][1] || 0;
          h += b - w
        }
        s += c, l += h * c
      }
      i[n - 1][1] += i[n - 1][0] = r, s && (r -= l / s)
    }
    i[n - 1][1] += i[n - 1][0] = r, _t(e, t)
  }
}

function fo(e) {
  "@babel/helpers - typeof";
  return fo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, fo(e)
}
var cM = ["type", "size", "sizeType"];

function zc() {
  return zc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, zc.apply(this, arguments)
}

function Zy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Jy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zy(Object(r), !0).forEach(function(n) {
      fM(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function fM(e, t, r) {
  return t = pM(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function pM(e) {
  var t = dM(e, "string");
  return fo(t) == "symbol" ? t : t + ""
}

function dM(e, t) {
  if (fo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (fo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function mM(e, t) {
  if (e == null) return {};
  var r = hM(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function hM(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var Qy = {
    symbolCircle: qn,
    symbolCross: xc,
    symbolDiamond: wc,
    symbolSquare: Oc,
    symbolStar: Sc,
    symbolTriangle: Pc,
    symbolWye: _c
  },
  vM = Math.PI / 180,
  gM = function(t) {
    var r = "symbol".concat((0, Hc.default)(t));
    return Qy[r] || qn
  },
  bM = function(t, r, n) {
    if (r === "area") return t;
    switch (n) {
      case "cross":
        return 5 * t * t / 9;
      case "diamond":
        return .5 * t * t / Math.sqrt(3);
      case "square":
        return t * t;
      case "star": {
        var i = 18 * vM;
        return 1.25 * t * t * (Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2))
      }
      case "triangle":
        return Math.sqrt(3) * t * t / 4;
      case "wye":
        return (21 - 10 * Math.sqrt(3)) * t * t / 8;
      default:
        return Math.PI * t * t / 4
    }
  },
  xM = function(t, r) {
    Qy["symbol".concat((0, Hc.default)(t))] = r
  },
  po = function(t) {
    var r = t.type,
      n = r === void 0 ? "circle" : r,
      i = t.size,
      o = i === void 0 ? 64 : i,
      a = t.sizeType,
      u = a === void 0 ? "area" : a,
      s = mM(t, cM),
      l = Jy(Jy({}, s), {}, {
        type: n,
        size: o,
        sizeType: u
      }),
      f = function() {
        var b = gM(n),
          w = bu().type(b).size(bM(o, u, n));
        return w()
      },
      c = l.className,
      p = l.cx,
      h = l.cy,
      g = Q(l, !0);
    return p === +p && h === +h && o === +o ? yM.createElement("path", zc({}, g, {
      className: ne("recharts-symbols", c),
      transform: "translate(".concat(p, ", ").concat(h, ")"),
      d: f()
    })) : null
  };
po.registerSymbol = xM;

function zn(e) {
  "@babel/helpers - typeof";
  return zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, zn(e)
}

function Uc() {
  return Uc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Uc.apply(this, arguments)
}

function ev(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function wM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ev(Object(r), !0).forEach(function(n) {
      mo(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ev(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function OM(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function tv(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, nv(n.key), n)
  }
}

function SM(e, t, r) {
  return t && tv(e.prototype, t), r && tv(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function AM(e, t, r) {
  return t = Ou(t), PM(e, rv() ? Reflect.construct(t, r || [], Ou(e).constructor) : t.apply(e, r))
}

function PM(e, t) {
  if (t && (zn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return TM(e)
}

function TM(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function rv() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (rv = function() {
    return !!e
  })()
}

function Ou(e) {
  return Ou = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ou(e)
}

function _M(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Gc(e, t)
}

function Gc(e, t) {
  return Gc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Gc(e, t)
}

function mo(e, t, r) {
  return t = nv(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function nv(e) {
  var t = EM(e, "string");
  return zn(t) == "symbol" ? t : t + ""
}

function EM(e, t) {
  if (zn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (zn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Et = 32,
  Su = function(e) {
    function t() {
      return OM(this, t), AM(this, t, arguments)
    }
    return _M(t, e), SM(t, [{
      key: "renderIcon",
      value: function(n) {
        var i = this.props.inactiveColor,
          o = Et / 2,
          a = Et / 6,
          u = Et / 3,
          s = n.inactive ? i : n.color;
        if (n.type === "plainline") return tr.createElement("line", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          strokeDasharray: n.payload.strokeDasharray,
          x1: 0,
          y1: o,
          x2: Et,
          y2: o,
          className: "recharts-legend-icon"
        });
        if (n.type === "line") return tr.createElement("path", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          d: "M0,".concat(o, "h").concat(u, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * u, ",").concat(o, `
            H`).concat(Et, "M").concat(2 * u, ",").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(u, ",").concat(o),
          className: "recharts-legend-icon"
        });
        if (n.type === "rect") return tr.createElement("path", {
          stroke: "none",
          fill: s,
          d: "M0,".concat(Et / 8, "h").concat(Et, "v").concat(Et * 3 / 4, "h").concat(-Et, "z"),
          className: "recharts-legend-icon"
        });
        if (tr.isValidElement(n.legendIcon)) {
          var l = wM({}, n);
          return delete l.legendIcon, tr.cloneElement(n.legendIcon, l)
        }
        return tr.createElement(po, {
          fill: s,
          cx: o,
          cy: o,
          size: Et,
          sizeType: "diameter",
          type: n.type
        })
      }
    }, {
      key: "renderItems",
      value: function() {
        var n = this,
          i = this.props,
          o = i.payload,
          a = i.iconSize,
          u = i.layout,
          s = i.formatter,
          l = i.inactiveColor,
          f = {
            x: 0,
            y: 0,
            width: Et,
            height: Et
          },
          c = {
            display: u === "horizontal" ? "inline-block" : "block",
            marginRight: 10
          },
          p = {
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: 4
          };
        return o.map(function(h, g) {
          var m = h.formatter || s,
            b = ne(mo(mo({
              "recharts-legend-item": !0
            }, "legend-item-".concat(g), !0), "inactive", h.inactive));
          if (h.type === "none") return null;
          var w = (0, Kc.default)(h.value) ? null : h.value;
          qe(!(0, Kc.default)(h.value), `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`);
          var A = h.inactive ? l : h.color;
          return tr.createElement("li", Uc({
            className: b,
            style: c,
            key: "legend-item-".concat(g)
          }, pt(n.props, h, g)), tr.createElement(so, {
            width: a,
            height: a,
            viewBox: f,
            style: p
          }, n.renderIcon(h)), tr.createElement("span", {
            className: "recharts-legend-item-text",
            style: {
              color: A
            }
          }, m ? m(w, h, g) : w))
        })
      }
    }, {
      key: "render",
      value: function() {
        var n = this.props,
          i = n.payload,
          o = n.layout,
          a = n.align;
        if (!i || !i.length) return null;
        var u = {
          padding: 0,
          margin: 0,
          textAlign: o === "horizontal" ? a : "left"
        };
        return tr.createElement("ul", {
          className: "recharts-default-legend",
          style: u
        }, this.renderItems())
      }
    }])
  }(jM);
mo(Su, "displayName", "Legend");
mo(Su, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var gf = J(Fb()),
  Wb = J(_e());

function Mu(e, t, r) {
  return t === !0 ? (0, gf.default)(e, r) : (0, Wb.default)(t) ? (0, gf.default)(e, t) : e
}

function Yn(e) {
  "@babel/helpers - typeof";
  return Yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Yn(e)
}
var hD = ["ref"];

function zb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function pr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zb(Object(r), !0).forEach(function(n) {
      Iu(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function yD(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Hb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Kb(n.key), n)
  }
}

function vD(e, t, r) {
  return t && Hb(e.prototype, t), r && Hb(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function gD(e, t, r) {
  return t = Cu(t), bD(e, Gb() ? Reflect.construct(t, r || [], Cu(e).constructor) : t.apply(e, r))
}

function bD(e, t) {
  if (t && (Yn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return xD(e)
}

function xD(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Gb() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Gb = function() {
    return !!e
  })()
}

function Cu(e) {
  return Cu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Cu(e)
}

function wD(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && bf(e, t)
}

function bf(e, t) {
  return bf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, bf(e, t)
}

function Iu(e, t, r) {
  return t = Kb(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Kb(e) {
  var t = OD(e, "string");
  return Yn(t) == "symbol" ? t : t + ""
}

function OD(e, t) {
  if (Yn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Yn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function SD(e, t) {
  if (e == null) return {};
  var r = AD(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function AD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function TD(e) {
  return e.value
}

function _D(e, t) {
  if (bo.isValidElement(e)) return bo.cloneElement(e, t);
  if (typeof e == "function") return bo.createElement(e, t);
  var r = t.ref,
    n = SD(t, hD);
  return bo.createElement(Su, n)
}
var Ub = 1,
  Ft = function(e) {
    function t() {
      var r;
      yD(this, t);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = gD(this, t, [].concat(i)), Iu(r, "lastBoundingBox", {
        width: -1,
        height: -1
      }), r
    }
    return wD(t, e), vD(t, [{
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
          var n = this.wrapperNode.getBoundingClientRect();
          return n.height = this.wrapperNode.offsetHeight, n.width = this.wrapperNode.offsetWidth, n
        }
        return null
      }
    }, {
      key: "updateBBox",
      value: function() {
        var n = this.props.onBBoxUpdate,
          i = this.getBBox();
        i ? (Math.abs(i.width - this.lastBoundingBox.width) > Ub || Math.abs(i.height - this.lastBoundingBox.height) > Ub) && (this.lastBoundingBox.width = i.width, this.lastBoundingBox.height = i.height, n && n(i)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null))
      }
    }, {
      key: "getBBoxSnapshot",
      value: function() {
        return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? pr({}, this.lastBoundingBox) : {
          width: 0,
          height: 0
        }
      }
    }, {
      key: "getDefaultPosition",
      value: function(n) {
        var i = this.props,
          o = i.layout,
          a = i.align,
          u = i.verticalAlign,
          s = i.margin,
          l = i.chartWidth,
          f = i.chartHeight,
          c, p;
        if (!n || (n.left === void 0 || n.left === null) && (n.right === void 0 || n.right === null))
          if (a === "center" && o === "vertical") {
            var h = this.getBBoxSnapshot();
            c = {
              left: ((l || 0) - h.width) / 2
            }
          } else c = a === "right" ? {
            right: s && s.right || 0
          } : {
            left: s && s.left || 0
          };
        if (!n || (n.top === void 0 || n.top === null) && (n.bottom === void 0 || n.bottom === null))
          if (u === "middle") {
            var g = this.getBBoxSnapshot();
            p = {
              top: ((f || 0) - g.height) / 2
            }
          } else p = u === "bottom" ? {
            bottom: s && s.bottom || 0
          } : {
            top: s && s.top || 0
          };
        return pr(pr({}, c), p)
      }
    }, {
      key: "render",
      value: function() {
        var n = this,
          i = this.props,
          o = i.content,
          a = i.width,
          u = i.height,
          s = i.wrapperStyle,
          l = i.payloadUniqBy,
          f = i.payload,
          c = pr(pr({
            position: "absolute",
            width: a || "auto",
            height: u || "auto"
          }, this.getDefaultPosition(s)), s);
        return bo.createElement("div", {
          className: "recharts-legend-wrapper",
          style: c,
          ref: function(h) {
            n.wrapperNode = h
          }
        }, _D(o, pr(pr({}, this.props), {}, {
          payload: Mu(f, l, TD)
        })))
      }
    }], [{
      key: "getWithHeight",
      value: function(n, i) {
        var o = pr(pr({}, this.defaultProps), n.props),
          a = o.layout;
        return a === "vertical" && V(n.props.height) ? {
          height: n.props.height
        } : a === "horizontal" ? {
          width: n.props.width || i
        } : null
      }
    }])
  }(PD);
Iu(Ft, "displayName", "Legend");
Iu(Ft, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
import Ao, {
  PureComponent as pL
} from "./react-shim-eraudit.js";
var $0 = J(Du()),
  F0 = J(ft());
import dr from "./react-shim-eraudit.js";

function wo(e) {
  "@babel/helpers - typeof";
  return wo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, wo(e)
}

function Tf() {
  return Tf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Tf.apply(this, arguments)
}

function DR(e, t) {
  return qR(e) || BR(e, t) || LR(e, t) || RR()
}

function RR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function LR(e, t) {
  if (e) {
    if (typeof e == "string") return B0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return B0(e, t)
  }
}

function B0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function BR(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function qR(e) {
  if (Array.isArray(e)) return e
}

function q0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Pf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? q0(Object(r), !0).forEach(function(n) {
      $R(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : q0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function $R(e, t, r) {
  return t = FR(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function FR(e) {
  var t = WR(e, "string");
  return wo(t) == "symbol" ? t : t + ""
}

function WR(e, t) {
  if (wo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (wo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function zR(e) {
  return Array.isArray(e) && Se(e[0]) && Se(e[1]) ? e.join(" ~ ") : e
}
var W0 = function(t) {
  var r = t.separator,
    n = r === void 0 ? " : " : r,
    i = t.contentStyle,
    o = i === void 0 ? {} : i,
    a = t.itemStyle,
    u = a === void 0 ? {} : a,
    s = t.labelStyle,
    l = s === void 0 ? {} : s,
    f = t.payload,
    c = t.formatter,
    p = t.itemSorter,
    h = t.wrapperClassName,
    g = t.labelClassName,
    m = t.label,
    b = t.labelFormatter,
    w = t.accessibilityLayer,
    A = w === void 0 ? !1 : w,
    T = function() {
      if (f && f.length) {
        var R = {
            padding: 0,
            margin: 0
          },
          z = (p ? (0, $0.default)(f, p) : f).map(function(H, W) {
            if (H.type === "none") return null;
            var S = Pf({
                display: "block",
                paddingTop: 4,
                paddingBottom: 4,
                color: H.color || "#000"
              }, u),
              d = H.formatter || c || zR,
              O = H.value,
              P = H.name,
              x = O,
              _ = P;
            if (d && x != null && _ != null) {
              var C = d(O, P, H, W, f);
              if (Array.isArray(C)) {
                var D = DR(C, 2);
                x = D[0], _ = D[1]
              } else x = C
            }
            return dr.createElement("li", {
              className: "recharts-tooltip-item",
              key: "tooltip-item-".concat(W),
              style: S
            }, Se(_) ? dr.createElement("span", {
              className: "recharts-tooltip-item-name"
            }, _) : null, Se(_) ? dr.createElement("span", {
              className: "recharts-tooltip-item-separator"
            }, n) : null, dr.createElement("span", {
              className: "recharts-tooltip-item-value"
            }, x), dr.createElement("span", {
              className: "recharts-tooltip-item-unit"
            }, H.unit || ""))
          });
        return dr.createElement("ul", {
          className: "recharts-tooltip-item-list",
          style: R
        }, z)
      }
      return null
    },
    E = Pf({
      margin: 0,
      padding: 10,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      whiteSpace: "nowrap"
    }, o),
    y = Pf({
      margin: 0
    }, l),
    v = !(0, F0.default)(m),
    j = v ? m : "",
    M = ne("recharts-default-tooltip", h),
    N = ne("recharts-tooltip-label", g);
  v && b && f !== void 0 && f !== null && (j = b(m, f));
  var B = A ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return dr.createElement("div", Tf({
    className: M,
    style: E
  }, B), dr.createElement("p", {
    className: N,
    style: y
  }, dr.isValidElement(j) ? j : "".concat(j)), T())
};
import rL, {
  PureComponent as nL
} from "./react-shim-eraudit.js";

function So(e) {
  "@babel/helpers - typeof";
  return So = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, So(e)
}

function Ru(e, t, r) {
  return t = HR(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function HR(e) {
  var t = UR(e, "string");
  return So(t) == "symbol" ? t : t + ""
}

function UR(e, t) {
  if (So(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (So(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Oo = "recharts-tooltip-wrapper",
  GR = {
    visibility: "hidden"
  };

function KR(e) {
  var t = e.coordinate,
    r = e.translateX,
    n = e.translateY;
  return ne(Oo, Ru(Ru(Ru(Ru({}, "".concat(Oo, "-right"), V(r) && t && V(t.x) && r >= t.x), "".concat(Oo, "-left"), V(r) && t && V(t.x) && r < t.x), "".concat(Oo, "-bottom"), V(n) && t && V(t.y) && n >= t.y), "".concat(Oo, "-top"), V(n) && t && V(t.y) && n < t.y))
}

function z0(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.key,
    i = e.offsetTopLeft,
    o = e.position,
    a = e.reverseDirection,
    u = e.tooltipDimension,
    s = e.viewBox,
    l = e.viewBoxDimension;
  if (o && V(o[n])) return o[n];
  var f = r[n] - u - i,
    c = r[n] + i;
  if (t[n]) return a[n] ? f : c;
  if (a[n]) {
    var p = f,
      h = s[n];
    return p < h ? Math.max(c, s[n]) : Math.max(f, s[n])
  }
  var g = c + u,
    m = s[n] + l;
  return g > m ? Math.max(f, s[n]) : Math.max(c, s[n])
}

function VR(e) {
  var t = e.translateX,
    r = e.translateY,
    n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  }
}

function H0(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.offsetTopLeft,
    i = e.position,
    o = e.reverseDirection,
    a = e.tooltipBox,
    u = e.useTranslate3d,
    s = e.viewBox,
    l, f, c;
  return a.height > 0 && a.width > 0 && r ? (f = z0({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), c = z0({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), l = VR({
    translateX: f,
    translateY: c,
    useTranslate3d: u
  })) : l = GR, {
    cssProperties: l,
    cssClasses: KR({
      translateX: f,
      translateY: c,
      coordinate: r
    })
  }
}

function Xn(e) {
  "@babel/helpers - typeof";
  return Xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Xn(e)
}

function U0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function G0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? U0(Object(r), !0).forEach(function(n) {
      Ef(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : U0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function YR(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function K0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, X0(n.key), n)
  }
}

function XR(e, t, r) {
  return t && K0(e.prototype, t), r && K0(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function ZR(e, t, r) {
  return t = Lu(t), JR(e, Y0() ? Reflect.construct(t, r || [], Lu(e).constructor) : t.apply(e, r))
}

function JR(e, t) {
  if (t && (Xn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return QR(e)
}

function QR(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Y0() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Y0 = function() {
    return !!e
  })()
}

function Lu(e) {
  return Lu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Lu(e)
}

function eL(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && _f(e, t)
}

function _f(e, t) {
  return _f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, _f(e, t)
}

function Ef(e, t, r) {
  return t = X0(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function X0(e) {
  var t = tL(e, "string");
  return Xn(t) == "symbol" ? t : t + ""
}

function tL(e, t) {
  if (Xn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Xn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var V0 = 1,
  Z0 = function(e) {
    function t() {
      var r;
      YR(this, t);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = ZR(this, t, [].concat(i)), Ef(r, "state", {
        dismissed: !1,
        dismissedAtCoordinate: {
          x: 0,
          y: 0
        },
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      }), Ef(r, "handleKeyDown", function(a) {
        if (a.key === "Escape") {
          var u, s, l, f;
          r.setState({
            dismissed: !0,
            dismissedAtCoordinate: {
              x: (u = (s = r.props.coordinate) === null || s === void 0 ? void 0 : s.x) !== null && u !== void 0 ? u : 0,
              y: (l = (f = r.props.coordinate) === null || f === void 0 ? void 0 : f.y) !== null && l !== void 0 ? l : 0
            }
          })
        }
      }), r
    }
    return eL(t, e), XR(t, [{
      key: "updateBBox",
      value: function() {
        if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
          var n = this.wrapperNode.getBoundingClientRect();
          (Math.abs(n.width - this.state.lastBoundingBox.width) > V0 || Math.abs(n.height - this.state.lastBoundingBox.height) > V0) && this.setState({
            lastBoundingBox: {
              width: n.width,
              height: n.height
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
        var n, i;
        this.props.active && this.updateBBox(), this.state.dismissed && (((n = this.props.coordinate) === null || n === void 0 ? void 0 : n.x) !== this.state.dismissedAtCoordinate.x || ((i = this.props.coordinate) === null || i === void 0 ? void 0 : i.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = !1)
      }
    }, {
      key: "render",
      value: function() {
        var n = this,
          i = this.props,
          o = i.active,
          a = i.allowEscapeViewBox,
          u = i.animationDuration,
          s = i.animationEasing,
          l = i.children,
          f = i.coordinate,
          c = i.hasPayload,
          p = i.isAnimationActive,
          h = i.offset,
          g = i.position,
          m = i.reverseDirection,
          b = i.useTranslate3d,
          w = i.viewBox,
          A = i.wrapperStyle,
          T = H0({
            allowEscapeViewBox: a,
            coordinate: f,
            offsetTopLeft: h,
            position: g,
            reverseDirection: m,
            tooltipBox: this.state.lastBoundingBox,
            useTranslate3d: b,
            viewBox: w
          }),
          E = T.cssClasses,
          y = T.cssProperties,
          v = G0(G0({
            transition: p && o ? "transform ".concat(u, "ms ").concat(s) : void 0
          }, y), {}, {
            pointerEvents: "none",
            visibility: !this.state.dismissed && o && c ? "visible" : "hidden",
            position: "absolute",
            top: 0,
            left: 0
          }, A);
        return rL.createElement("div", {
          tabIndex: -1,
          className: E,
          style: v,
          ref: function(M) {
            n.wrapperNode = M
          }
        }, l)
      }
    }])
  }(nL);
var iL = function() {
    return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
  },
  ze = {
    isSsr: iL(),
    get: function(t) {
      return ze[t]
    },
    set: function(t, r) {
      if (typeof t == "string") ze[t] = r;
      else {
        var n = Object.keys(t);
        n && n.length && n.forEach(function(i) {
          ze[i] = t[i]
        })
      }
    }
  };

function Zn(e) {
  "@babel/helpers - typeof";
  return Zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Zn(e)
}

function J0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Q0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? J0(Object(r), !0).forEach(function(n) {
      kf(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : J0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function oL(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function ex(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, rx(n.key), n)
  }
}

function aL(e, t, r) {
  return t && ex(e.prototype, t), r && ex(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function uL(e, t, r) {
  return t = Bu(t), sL(e, tx() ? Reflect.construct(t, r || [], Bu(e).constructor) : t.apply(e, r))
}

function sL(e, t) {
  if (t && (Zn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return lL(e)
}

function lL(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function tx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (tx = function() {
    return !!e
  })()
}

function Bu(e) {
  return Bu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Bu(e)
}

function cL(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && jf(e, t)
}

function jf(e, t) {
  return jf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, jf(e, t)
}

function kf(e, t, r) {
  return t = rx(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function rx(e) {
  var t = fL(e, "string");
  return Zn(t) == "symbol" ? t : t + ""
}

function fL(e, t) {
  if (Zn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Zn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function dL(e) {
  return e.dataKey
}

function mL(e, t) {
  return Ao.isValidElement(e) ? Ao.cloneElement(e, t) : typeof e == "function" ? Ao.createElement(e, t) : Ao.createElement(W0, t)
}
var Ve = function(e) {
  function t() {
    return oL(this, t), uL(this, t, arguments)
  }
  return cL(t, e), aL(t, [{
    key: "render",
    value: function() {
      var n = this,
        i = this.props,
        o = i.active,
        a = i.allowEscapeViewBox,
        u = i.animationDuration,
        s = i.animationEasing,
        l = i.content,
        f = i.coordinate,
        c = i.filterNull,
        p = i.isAnimationActive,
        h = i.offset,
        g = i.payload,
        m = i.payloadUniqBy,
        b = i.position,
        w = i.reverseDirection,
        A = i.useTranslate3d,
        T = i.viewBox,
        E = i.wrapperStyle,
        y = g ?? [];
      c && y.length && (y = Mu(g.filter(function(j) {
        return j.value != null && (j.hide !== !0 || n.props.includeHidden)
      }), m, dL));
      var v = y.length > 0;
      return Ao.createElement(Z0, {
        allowEscapeViewBox: a,
        animationDuration: u,
        animationEasing: s,
        isAnimationActive: p,
        active: o,
        coordinate: f,
        hasPayload: v,
        offset: h,
        position: b,
        reverseDirection: w,
        useTranslate3d: A,
        viewBox: T,
        wrapperStyle: E
      }, mL(l, Q0(Q0({}, this.props), {}, {
        payload: y
      })))
    }
  }])
}(pL);
kf(Ve, "displayName", "Tooltip");
kf(Ve, "defaultProps", {
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
  isAnimationActive: !ze.isSsr,
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
var bx = J(If());
import Nf, {
  forwardRef as GL,
  cloneElement as KL,
  useState as VL,
  useImperativeHandle as YL,
  useRef as gx,
  useEffect as XL,
  useMemo as ZL,
  useCallback as JL
} from "./react-shim-eraudit.js";

function Po(e) {
  "@babel/helpers - typeof";
  return Po = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Po(e)
}

function yx(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function qu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yx(Object(r), !0).forEach(function(n) {
      BL(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yx(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function BL(e, t, r) {
  return t = qL(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function qL(e) {
  var t = $L(e, "string");
  return Po(t) == "symbol" ? t : t + ""
}

function $L(e, t) {
  if (Po(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Po(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function FL(e, t) {
  return UL(e) || HL(e, t) || zL(e, t) || WL()
}

function WL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function zL(e, t) {
  if (e) {
    if (typeof e == "string") return vx(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return vx(e, t)
  }
}

function vx(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function HL(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function UL(e) {
  if (Array.isArray(e)) return e
}
var Vr = GL(function(e, t) {
  var r = e.aspect,
    n = e.initialDimension,
    i = n === void 0 ? {
      width: -1,
      height: -1
    } : n,
    o = e.width,
    a = o === void 0 ? "100%" : o,
    u = e.height,
    s = u === void 0 ? "100%" : u,
    l = e.minWidth,
    f = l === void 0 ? 0 : l,
    c = e.minHeight,
    p = e.maxHeight,
    h = e.children,
    g = e.debounce,
    m = g === void 0 ? 0 : g,
    b = e.id,
    w = e.className,
    A = e.onResize,
    T = e.style,
    E = T === void 0 ? {} : T,
    y = gx(null),
    v = gx();
  v.current = A, YL(t, function() {
    return Object.defineProperty(y.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), y.current
      },
      configurable: !0
    })
  });
  var j = VL({
      containerWidth: i.width,
      containerHeight: i.height
    }),
    M = FL(j, 2),
    N = M[0],
    B = M[1],
    $ = JL(function(z, H) {
      B(function(W) {
        var S = Math.round(z),
          d = Math.round(H);
        return W.containerWidth === S && W.containerHeight === d ? W : {
          containerWidth: S,
          containerHeight: d
        }
      })
    }, []);
  XL(function() {
    var z = function(P) {
      var x, _ = P[0].contentRect,
        C = _.width,
        D = _.height;
      $(C, D), (x = v.current) === null || x === void 0 || x.call(v, C, D)
    };
    m > 0 && (z = (0, bx.default)(z, m, {
      trailing: !0,
      leading: !1
    }));
    var H = new ResizeObserver(z),
      W = y.current.getBoundingClientRect(),
      S = W.width,
      d = W.height;
    return $(S, d), H.observe(y.current),
      function() {
        H.disconnect()
      }
  }, [$, m]);
  var R = ZL(function() {
    var z = N.containerWidth,
      H = N.containerHeight;
    if (z < 0 || H < 0) return null;
    qe(cr(a) || cr(s), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, a, s), qe(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var W = cr(a) ? z : a,
      S = cr(s) ? H : s;
    r && r > 0 && (W ? S = W / r : S && (W = S * r), p && S > p && (S = p)), qe(W > 0 || S > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, W, S, a, s, f, c, r);
    var d = !Array.isArray(h) && At(h.type).endsWith("Chart");
    return Nf.Children.map(h, function(O) {
      return Nf.isValidElement(O) ? KL(O, qu({
        width: W,
        height: S
      }, d ? {
        style: qu({
          height: "100%",
          width: "100%",
          maxHeight: S,
          maxWidth: W
        }, O.props.style)
      } : {})) : O
    })
  }, [r, h, s, p, c, f, N, a]);
  return Nf.createElement("div", {
    id: b ? "".concat(b) : void 0,
    className: ne("recharts-responsive-container", w),
    style: qu(qu({}, E), {}, {
      width: a,
      height: s,
      minWidth: f,
      minHeight: c,
      maxHeight: p
    }),
    ref: y
  }, R)
});
var Tr = function(t) {
  return null
};
Tr.displayName = "Cell";
var Lf = J(ft());
import Ix, {
  useMemo as _B
} from "./react-shim-eraudit.js";

function To(e) {
  "@babel/helpers - typeof";
  return To = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, To(e)
}

function xx(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Df(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xx(Object(r), !0).forEach(function(n) {
      QL(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xx(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function QL(e, t, r) {
  return t = eB(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function eB(e) {
  var t = tB(e, "string");
  return To(t) == "symbol" ? t : t + ""
}

function tB(e, t) {
  if (To(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (To(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Jn = {
    widthCache: {},
    cacheCount: 0
  },
  rB = 2e3,
  nB = {
    position: "absolute",
    top: "-20000px",
    left: 0,
    padding: 0,
    margin: 0,
    border: "none",
    whiteSpace: "pre"
  };
var wx = "recharts_measurement_span";

function iB(e) {
  var t = Df({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r]
  }), t
}
var Yr = function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t == null || ze.isSsr) return {
      width: 0,
      height: 0
    };
    var n = iB(r),
      i = JSON.stringify({
        text: t,
        copyStyle: n
      });
    if (Jn.widthCache[i]) return Jn.widthCache[i];
    try {
      var o = document.getElementById(wx);
      o || (o = document.createElement("span"), o.setAttribute("id", wx), o.setAttribute("aria-hidden", "true"), document.body.appendChild(o));
      var a = Df(Df({}, nB), n);
      Object.assign(o.style, a), o.textContent = "".concat(t);
      var u = o.getBoundingClientRect(),
        s = {
          width: u.width,
          height: u.height
        };
      return Jn.widthCache[i] = s, ++Jn.cacheCount > rB && (Jn.cacheCount = 0, Jn.widthCache = {}), s
    } catch {
      return {
        width: 0,
        height: 0
      }
    }
  },
  Ox = function(t) {
    return {
      top: t.top + window.scrollY - document.documentElement.clientTop,
      left: t.left + window.scrollX - document.documentElement.clientLeft
    }
  };

function _o(e) {
  "@babel/helpers - typeof";
  return _o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, _o(e)
}

function Fu(e, t) {
  return sB(e) || uB(e, t) || aB(e, t) || oB()
}

function oB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function aB(e, t) {
  if (e) {
    if (typeof e == "string") return Sx(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Sx(e, t)
  }
}

function Sx(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function uB(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function sB(e) {
  if (Array.isArray(e)) return e
}

function lB(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Ax(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, fB(n.key), n)
  }
}

function cB(e, t, r) {
  return t && Ax(e.prototype, t), r && Ax(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function fB(e) {
  var t = pB(e, "string");
  return _o(t) == "symbol" ? t : t + ""
}

function pB(e, t) {
  if (_o(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (_o(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Px = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  Tx = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  dB = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  mB = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  Ex = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1
  },
  hB = Object.keys(Ex),
  Qn = "NaN";

function yB(e, t) {
  return e * Ex[t]
}
var $u = function() {
  function e(t, r) {
    lB(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !dB.test(r) && (this.num = NaN, this.unit = ""), hB.includes(r) && (this.num = yB(t, r), this.unit = "px")
  }
  return cB(e, [{
    key: "add",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num + r.num, this.unit)
    }
  }, {
    key: "subtract",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num - r.num, this.unit)
    }
  }, {
    key: "multiply",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num * r.num, this.unit || r.unit)
    }
  }, {
    key: "divide",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num / r.num, this.unit || r.unit)
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
    value: function(r) {
      var n, i = (n = mB.exec(r)) !== null && n !== void 0 ? n : [],
        o = Fu(i, 3),
        a = o[1],
        u = o[2];
      return new e(parseFloat(a), u ?? "")
    }
  }])
}();

function jx(e) {
  if (e.includes(Qn)) return Qn;
  for (var t = e; t.includes("*") || t.includes("/");) {
    var r, n = (r = Px.exec(t)) !== null && r !== void 0 ? r : [],
      i = Fu(n, 4),
      o = i[1],
      a = i[2],
      u = i[3],
      s = $u.parse(o ?? ""),
      l = $u.parse(u ?? ""),
      f = a === "*" ? s.multiply(l) : s.divide(l);
    if (f.isNaN()) return Qn;
    t = t.replace(Px, f.toString())
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t);) {
    var c, p = (c = Tx.exec(t)) !== null && c !== void 0 ? c : [],
      h = Fu(p, 4),
      g = h[1],
      m = h[2],
      b = h[3],
      w = $u.parse(g ?? ""),
      A = $u.parse(b ?? ""),
      T = m === "+" ? w.add(A) : w.subtract(A);
    if (T.isNaN()) return Qn;
    t = t.replace(Tx, T.toString())
  }
  return t
}
var _x = /\(([^()]*)\)/;

function vB(e) {
  for (var t = e; t.includes("(");) {
    var r = _x.exec(t),
      n = Fu(r, 2),
      i = n[1];
    t = t.replace(_x, jx(i))
  }
  return t
}

function gB(e) {
  var t = e.replace(/\s+/g, "");
  return t = vB(t), t = jx(t), t
}

function bB(e) {
  try {
    return gB(e)
  } catch {
    return Qn
  }
}

function Wu(e) {
  var t = bB(e.slice(5, -1));
  return t === Qn ? "" : t
}
var xB = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
  wB = ["dx", "dy", "angle", "className", "breakAll"];

function Rf() {
  return Rf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Rf.apply(this, arguments)
}

function kx(e, t) {
  if (e == null) return {};
  var r = OB(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function OB(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Mx(e, t) {
  return TB(e) || PB(e, t) || AB(e, t) || SB()
}

function SB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function AB(e, t) {
  if (e) {
    if (typeof e == "string") return Cx(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Cx(e, t)
  }
}

function Cx(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function PB(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function TB(e) {
  if (Array.isArray(e)) return e
}
var Rx = /[ \f\n\r\t\v\u2028\u2029]+/,
  Lx = function(t) {
    var r = t.children,
      n = t.breakAll,
      i = t.style;
    try {
      var o = [];
      (0, Lf.default)(r) || (n ? o = r.toString().split("") : o = r.toString().split(Rx));
      var a = o.map(function(s) {
          return {
            word: s,
            width: Yr(s, i).width
          }
        }),
        u = n ? 0 : Yr("\xA0", i).width;
      return {
        wordsWithComputedWidth: a,
        spaceWidth: u
      }
    } catch {
      return null
    }
  },
  EB = function(t, r, n, i, o) {
    var a = t.maxLines,
      u = t.children,
      s = t.style,
      l = t.breakAll,
      f = V(a),
      c = u,
      p = function() {
        var W = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return W.reduce(function(S, d) {
          var O = d.word,
            P = d.width,
            x = S[S.length - 1];
          if (x && (i == null || o || x.width + P + n < Number(i))) x.words.push(O), x.width += P + n;
          else {
            var _ = {
              words: [O],
              width: P
            };
            S.push(_)
          }
          return S
        }, [])
      },
      h = p(r),
      g = function(W) {
        return W.reduce(function(S, d) {
          return S.width > d.width ? S : d
        })
      };
    if (!f) return h;
    for (var m = "\u2026", b = function(W) {
        var S = c.slice(0, W),
          d = Lx({
            breakAll: l,
            style: s,
            children: S + m
          }).wordsWithComputedWidth,
          O = p(d),
          P = O.length > a || g(O).width > Number(i);
        return [P, O]
      }, w = 0, A = c.length - 1, T = 0, E; w <= A && T <= c.length - 1;) {
      var y = Math.floor((w + A) / 2),
        v = y - 1,
        j = b(v),
        M = Mx(j, 2),
        N = M[0],
        B = M[1],
        $ = b(y),
        R = Mx($, 1),
        z = R[0];
      if (!N && !z && (w = y + 1), N && z && (A = y - 1), !N && z) {
        E = B;
        break
      }
      T++
    }
    return E || h
  },
  Nx = function(t) {
    var r = (0, Lf.default)(t) ? [] : t.toString().split(Rx);
    return [{
      words: r
    }]
  },
  jB = function(t) {
    var r = t.width,
      n = t.scaleToFit,
      i = t.children,
      o = t.style,
      a = t.breakAll,
      u = t.maxLines;
    if ((r || n) && !ze.isSsr) {
      var s, l, f = Lx({
        breakAll: a,
        children: i,
        style: o
      });
      if (f) {
        var c = f.wordsWithComputedWidth,
          p = f.spaceWidth;
        s = c, l = p
      } else return Nx(i);
      return EB({
        breakAll: a,
        children: i,
        maxLines: u,
        style: o
      }, s, l, r, n)
    }
    return Nx(i)
  },
  Dx = "#808080",
  dt = function(t) {
    var r = t.x,
      n = r === void 0 ? 0 : r,
      i = t.y,
      o = i === void 0 ? 0 : i,
      a = t.lineHeight,
      u = a === void 0 ? "1em" : a,
      s = t.capHeight,
      l = s === void 0 ? "0.71em" : s,
      f = t.scaleToFit,
      c = f === void 0 ? !1 : f,
      p = t.textAnchor,
      h = p === void 0 ? "start" : p,
      g = t.verticalAnchor,
      m = g === void 0 ? "end" : g,
      b = t.fill,
      w = b === void 0 ? Dx : b,
      A = kx(t, xB),
      T = _B(function() {
        return jB({
          breakAll: A.breakAll,
          children: A.children,
          maxLines: A.maxLines,
          scaleToFit: c,
          style: A.style,
          width: A.width
        })
      }, [A.breakAll, A.children, A.maxLines, c, A.style, A.width]),
      E = A.dx,
      y = A.dy,
      v = A.angle,
      j = A.className,
      M = A.breakAll,
      N = kx(A, wB);
    if (!Se(n) || !Se(o)) return null;
    var B = n + (V(E) ? E : 0),
      $ = o + (V(y) ? y : 0),
      R;
    switch (m) {
      case "start":
        R = Wu("calc(".concat(l, ")"));
        break;
      case "middle":
        R = Wu("calc(".concat((T.length - 1) / 2, " * -").concat(u, " + (").concat(l, " / 2))"));
        break;
      default:
        R = Wu("calc(".concat(T.length - 1, " * -").concat(u, ")"));
        break
    }
    var z = [];
    if (c) {
      var H = T[0].width,
        W = A.width;
      z.push("scale(".concat((V(W) ? W / H : 1) / H, ")"))
    }
    return v && z.push("rotate(".concat(v, ", ").concat(B, ", ").concat($, ")")), z.length && (N.transform = z.join(" ")), Ix.createElement("text", Rf({}, Q(N, !0), {
      x: B,
      y: $,
      className: ne("recharts-text", j),
      textAnchor: h,
      fill: w.includes("url") ? Dx : w
    }), T.map(function(S, d) {
      var O = S.words.join(M ? "" : " ");
      return Ix.createElement("tspan", {
        x: B,
        dy: d === 0 ? R : u,
        key: "".concat(O, "-").concat(d)
      }, O)
    }))
  };
var sa = J(ft()),
  la = J(_e()),
  Kp = J(wt());
import ur, {
  cloneElement as Gp,
  isValidElement as Bs,
  createElement as EW
} from "./react-shim-eraudit.js";
var eO = J(ft()),
  tO = J(_e());
import {
  isValidElement as fW
} from "./react-shim-eraudit.js";
var As = {};
XT(As, {
  scaleBand: () => _r,
  scaleDiverging: () => Os,
  scaleDivergingLog: () => yp,
  scaleDivergingPow: () => Ss,
  scaleDivergingSqrt: () => iw,
  scaleDivergingSymlog: () => vp,
  scaleIdentity: () => as,
  scaleImplicit: () => Yu,
  scaleLinear: () => on,
  scaleLog: () => us,
  scaleOrdinal: () => ri,
  scalePoint: () => Er,
  scalePow: () => Fo,
  scaleQuantile: () => cs,
  scaleQuantize: () => fs,
  scaleRadial: () => ls,
  scaleSequential: () => gs,
  scaleSequentialLog: () => mp,
  scaleSequentialPow: () => bs,
  scaleSequentialQuantile: () => xs,
  scaleSequentialSqrt: () => nw,
  scaleSequentialSymlog: () => hp,
  scaleSqrt: () => P1,
  scaleSymlog: () => ss,
  scaleThreshold: () => ps,
  scaleTime: () => pp,
  scaleUtc: () => dp,
  tickFormat: () => Ro
});

function nt(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}

function Bf(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}

function Xr(e) {
  let t, r, n;
  e.length !== 2 ? (t = nt, r = (u, s) => nt(e(u), s), n = (u, s) => e(u) - s) : (t = e === nt || e === Bf ? e : kB, r = e, n = e);

  function i(u, s, l = 0, f = u.length) {
    if (l < f) {
      if (t(s, s) !== 0) return f;
      do {
        let c = l + f >>> 1;
        r(u[c], s) < 0 ? l = c + 1 : f = c
      } while (l < f)
    }
    return l
  }

  function o(u, s, l = 0, f = u.length) {
    if (l < f) {
      if (t(s, s) !== 0) return f;
      do {
        let c = l + f >>> 1;
        r(u[c], s) <= 0 ? l = c + 1 : f = c
      } while (l < f)
    }
    return l
  }

  function a(u, s, l = 0, f = u.length) {
    let c = i(u, s, l, f - 1);
    return c > l && n(u[c - 1], s) > -n(u[c], s) ? c - 1 : c
  }
  return {
    left: i,
    center: a,
    right: o
  }
}

function kB() {
  return 0
}

function Eo(e) {
  return e === null ? NaN : +e
}

function* Bx(e, t) {
  if (t === void 0)
    for (let r of e) r != null && (r = +r) >= r && (yield r);
  else {
    let r = -1;
    for (let n of e)(n = t(n, ++r, e)) != null && (n = +n) >= n && (yield n)
  }
}
var qx = Xr(nt),
  $x = qx.right,
  MB = qx.left,
  CB = Xr(Eo).center,
  Wt = $x;
var ei = class extends Map {
  constructor(t, r = DB) {
    if (super(), Object.defineProperties(this, {
        _intern: {
          value: new Map
        },
        _key: {
          value: r
        }
      }), t != null)
      for (let [n, i] of t) this.set(n, i)
  }
  get(t) {
    return super.get(Fx(this, t))
  }
  has(t) {
    return super.has(Fx(this, t))
  }
  set(t, r) {
    return super.set(IB(this, t), r)
  }
  delete(t) {
    return super.delete(NB(this, t))
  }
};

function Fx({
  _intern: e,
  _key: t
}, r) {
  let n = t(r);
  return e.has(n) ? e.get(n) : r
}

function IB({
  _intern: e,
  _key: t
}, r) {
  let n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r)
}

function NB({
  _intern: e,
  _key: t
}, r) {
  let n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r
}

function DB(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e
}

function Wx(e = nt) {
  if (e === nt) return qf;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    let n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0)
  }
}

function qf(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0)
}
var RB = Math.sqrt(50),
  LB = Math.sqrt(10),
  BB = Math.sqrt(2);

function zu(e, t, r) {
  let n = (t - e) / Math.max(0, r),
    i = Math.floor(Math.log10(n)),
    o = n / Math.pow(10, i),
    a = o >= RB ? 10 : o >= LB ? 5 : o >= BB ? 2 : 1,
    u, s, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, u = Math.round(e * l), s = Math.round(t * l), u / l < e && ++u, s / l > t && --s, l = -l) : (l = Math.pow(10, i) * a, u = Math.round(e / l), s = Math.round(t / l), u * l < e && ++u, s * l > t && --s), s < u && .5 <= r && r < 2 ? zu(e, t, r * 2) : [u, s, l]
}

function Zr(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  let n = t < e,
    [i, o, a] = n ? zu(t, e, r) : zu(e, t, r);
  if (!(o >= i)) return [];
  let u = o - i + 1,
    s = new Array(u);
  if (n)
    if (a < 0)
      for (let l = 0; l < u; ++l) s[l] = (o - l) / -a;
    else
      for (let l = 0; l < u; ++l) s[l] = (o - l) * a;
  else if (a < 0)
    for (let l = 0; l < u; ++l) s[l] = (i + l) / -a;
  else
    for (let l = 0; l < u; ++l) s[l] = (i + l) * a;
  return s
}

function jo(e, t, r) {
  return t = +t, e = +e, r = +r, zu(e, t, r)[2]
}

function ti(e, t, r) {
  t = +t, e = +e, r = +r;
  let n = t < e,
    i = n ? jo(t, e, r) : jo(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i)
}

function Hu(e, t) {
  let r;
  if (t === void 0)
    for (let n of e) n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of e)(i = t(i, ++n, e)) != null && (r < i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Uu(e, t) {
  let r;
  if (t === void 0)
    for (let n of e) n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of e)(i = t(i, ++n, e)) != null && (r > i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Gu(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? qf : Wx(i); n > r;) {
    if (n - r > 600) {
      let s = n - r + 1,
        l = t - r + 1,
        f = Math.log(s),
        c = .5 * Math.exp(2 * f / 3),
        p = .5 * Math.sqrt(f * c * (s - c) / s) * (l - s / 2 < 0 ? -1 : 1),
        h = Math.max(r, Math.floor(t - l * c / s + p)),
        g = Math.min(n, Math.floor(t + (s - l) * c / s + p));
      Gu(e, t, h, g, i)
    }
    let o = e[t],
      a = r,
      u = n;
    for (ko(e, r, t), i(e[n], o) > 0 && ko(e, r, n); a < u;) {
      for (ko(e, a, u), ++a, --u; i(e[a], o) < 0;) ++a;
      for (; i(e[u], o) > 0;) --u
    }
    i(e[r], o) === 0 ? ko(e, r, u) : (++u, ko(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1)
  }
  return e
}

function ko(e, t, r) {
  let n = e[t];
  e[t] = e[r], e[r] = n
}

function Ku(e, t, r) {
  if (e = Float64Array.from(Bx(e, r)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return Uu(e);
    if (t >= 1) return Hu(e);
    var n, i = (n - 1) * t,
      o = Math.floor(i),
      a = Hu(Gu(e, o).subarray(0, o + 1)),
      u = Uu(e.subarray(o + 1));
    return a + (u - a) * (i - o)
  }
}

function $f(e, t, r = Eo) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t,
      o = Math.floor(i),
      a = +r(e[o], o, e),
      u = +r(e[o + 1], o + 1, e);
    return a + (u - a) * (i - o)
  }
}

function Vu(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, o = new Array(i); ++n < i;) o[n] = e + n * r;
  return o
}

function Ee(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break
  }
  return this
}

function jt(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break
    }
  }
  return this
}
var Yu = Symbol("implicit");

function ri() {
  var e = new ei,
    t = [],
    r = [],
    n = Yu;

  function i(o) {
    let a = e.get(o);
    if (a === void 0) {
      if (n !== Yu) return n;
      e.set(o, a = t.push(o) - 1)
    }
    return r[a % r.length]
  }
  return i.domain = function(o) {
    if (!arguments.length) return t.slice();
    t = [], e = new ei;
    for (let a of o) e.has(a) || e.set(a, t.push(a) - 1);
    return i
  }, i.range = function(o) {
    return arguments.length ? (r = Array.from(o), i) : r.slice()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return ri(t, r).unknown(n)
  }, Ee.apply(i, arguments), i
}

function _r() {
  var e = ri().unknown(void 0),
    t = e.domain,
    r = e.range,
    n = 0,
    i = 1,
    o, a, u = !1,
    s = 0,
    l = 0,
    f = .5;
  delete e.unknown;

  function c() {
    var p = t().length,
      h = i < n,
      g = h ? i : n,
      m = h ? n : i;
    o = (m - g) / Math.max(1, p - s + l * 2), u && (o = Math.floor(o)), g += (m - g - o * (p - s)) * f, a = o * (1 - s), u && (g = Math.round(g), a = Math.round(a));
    var b = Vu(p).map(function(w) {
      return g + o * w
    });
    return r(h ? b.reverse() : b)
  }
  return e.domain = function(p) {
    return arguments.length ? (t(p), c()) : t()
  }, e.range = function(p) {
    return arguments.length ? ([n, i] = p, n = +n, i = +i, c()) : [n, i]
  }, e.rangeRound = function(p) {
    return [n, i] = p, n = +n, i = +i, u = !0, c()
  }, e.bandwidth = function() {
    return a
  }, e.step = function() {
    return o
  }, e.round = function(p) {
    return arguments.length ? (u = !!p, c()) : u
  }, e.padding = function(p) {
    return arguments.length ? (s = Math.min(1, l = +p), c()) : s
  }, e.paddingInner = function(p) {
    return arguments.length ? (s = Math.min(1, p), c()) : s
  }, e.paddingOuter = function(p) {
    return arguments.length ? (l = +p, c()) : l
  }, e.align = function(p) {
    return arguments.length ? (f = Math.max(0, Math.min(1, p)), c()) : f
  }, e.copy = function() {
    return _r(t(), [n, i]).round(u).paddingInner(s).paddingOuter(l).align(f)
  }, Ee.apply(c(), arguments)
}

function zx(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return zx(t())
  }, e
}

function Er() {
  return zx(_r.apply(null, arguments).paddingInner(1))
}

function Xu(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e
}

function Ff(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r
}

function Io() {}
var Mo = .7,
  Qu = 1 / Mo,
  ni = "\\s*([+-]?\\d+)\\s*",
  Co = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  rr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  qB = /^#([0-9a-f]{3,8})$/,
  $B = new RegExp(`^rgb\\(${ni},${ni},${ni}\\)$`),
  FB = new RegExp(`^rgb\\(${rr},${rr},${rr}\\)$`),
  WB = new RegExp(`^rgba\\(${ni},${ni},${ni},${Co}\\)$`),
  zB = new RegExp(`^rgba\\(${rr},${rr},${rr},${Co}\\)$`),
  HB = new RegExp(`^hsl\\(${Co},${rr},${rr}\\)$`),
  UB = new RegExp(`^hsla\\(${Co},${rr},${rr},${Co}\\)$`),
  Hx = {
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
Xu(Io, jr, {
  copy(e) {
    return Object.assign(new this.constructor, this, e)
  },
  displayable() {
    return this.rgb().displayable()
  },
  hex: Ux,
  formatHex: Ux,
  formatHex8: GB,
  formatHsl: KB,
  formatRgb: Gx,
  toString: Gx
});

function Ux() {
  return this.rgb().formatHex()
}

function GB() {
  return this.rgb().formatHex8()
}

function KB() {
  return Jx(this).formatHsl()
}

function Gx() {
  return this.rgb().formatRgb()
}

function jr(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = qB.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Kx(t) : r === 3 ? new at(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? Zu(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? Zu(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = $B.exec(e)) ? new at(t[1], t[2], t[3], 1) : (t = FB.exec(e)) ? new at(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = WB.exec(e)) ? Zu(t[1], t[2], t[3], t[4]) : (t = zB.exec(e)) ? Zu(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = HB.exec(e)) ? Xx(t[1], t[2] / 100, t[3] / 100, 1) : (t = UB.exec(e)) ? Xx(t[1], t[2] / 100, t[3] / 100, t[4]) : Hx.hasOwnProperty(e) ? Kx(Hx[e]) : e === "transparent" ? new at(NaN, NaN, NaN, 0) : null
}

function Kx(e) {
  return new at(e >> 16 & 255, e >> 8 & 255, e & 255, 1)
}

function Zu(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new at(e, t, r, n)
}

function VB(e) {
  return e instanceof Io || (e = jr(e)), e ? (e = e.rgb(), new at(e.r, e.g, e.b, e.opacity)) : new at
}

function ii(e, t, r, n) {
  return arguments.length === 1 ? VB(e) : new at(e, t, r, n ?? 1)
}

function at(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n
}
Xu(at, ii, Ff(Io, {
  brighter(e) {
    return e = e == null ? Qu : Math.pow(Qu, e), new at(this.r * e, this.g * e, this.b * e, this.opacity)
  },
  darker(e) {
    return e = e == null ? Mo : Math.pow(Mo, e), new at(this.r * e, this.g * e, this.b * e, this.opacity)
  },
  rgb() {
    return this
  },
  clamp() {
    return new at(Qr(this.r), Qr(this.g), Qr(this.b), es(this.opacity))
  },
  displayable() {
    return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
  },
  hex: Vx,
  formatHex: Vx,
  formatHex8: YB,
  formatRgb: Yx,
  toString: Yx
}));

function Vx() {
  return `#${Jr(this.r)}${Jr(this.g)}${Jr(this.b)}`
}

function YB() {
  return `#${Jr(this.r)}${Jr(this.g)}${Jr(this.b)}${Jr((isNaN(this.opacity)?1:this.opacity)*255)}`
}

function Yx() {
  let e = es(this.opacity);
  return `${e===1?"rgb(":"rgba("}${Qr(this.r)}, ${Qr(this.g)}, ${Qr(this.b)}${e===1?")":`, ${e})`}`
}

function es(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e))
}

function Qr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0))
}

function Jr(e) {
  return e = Qr(e), (e < 16 ? "0" : "") + e.toString(16)
}

function Xx(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new zt(e, t, r, n)
}

function Jx(e) {
  if (e instanceof zt) return new zt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Io || (e = jr(e)), !e) return new zt;
  if (e instanceof zt) return e;
  e = e.rgb();
  var t = e.r / 255,
    r = e.g / 255,
    n = e.b / 255,
    i = Math.min(t, r, n),
    o = Math.max(t, r, n),
    a = NaN,
    u = o - i,
    s = (o + i) / 2;
  return u ? (t === o ? a = (r - n) / u + (r < n) * 6 : r === o ? a = (n - t) / u + 2 : a = (t - r) / u + 4, u /= s < .5 ? o + i : 2 - o - i, a *= 60) : u = s > 0 && s < 1 ? 0 : a, new zt(a, u, s, e.opacity)
}

function Qx(e, t, r, n) {
  return arguments.length === 1 ? Jx(e) : new zt(e, t, r, n ?? 1)
}

function zt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n
}
Xu(zt, Qx, Ff(Io, {
  brighter(e) {
    return e = e == null ? Qu : Math.pow(Qu, e), new zt(this.h, this.s, this.l * e, this.opacity)
  },
  darker(e) {
    return e = e == null ? Mo : Math.pow(Mo, e), new zt(this.h, this.s, this.l * e, this.opacity)
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360,
      t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
      r = this.l,
      n = r + (r < .5 ? r : 1 - r) * t,
      i = 2 * r - n;
    return new at(Wf(e >= 240 ? e - 240 : e + 120, i, n), Wf(e, i, n), Wf(e < 120 ? e + 240 : e - 120, i, n), this.opacity)
  },
  clamp() {
    return new zt(Zx(this.h), Ju(this.s), Ju(this.l), es(this.opacity))
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
  },
  formatHsl() {
    let e = es(this.opacity);
    return `${e===1?"hsl(":"hsla("}${Zx(this.h)}, ${Ju(this.s)*100}%, ${Ju(this.l)*100}%${e===1?")":`, ${e})`}`
  }
}));

function Zx(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e
}

function Ju(e) {
  return Math.max(0, Math.min(1, e || 0))
}

function Wf(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255
}

function zf(e, t, r, n, i) {
  var o = e * e,
    a = o * e;
  return ((1 - 3 * e + 3 * o - a) * t + (4 - 6 * o + 3 * a) * r + (1 + 3 * e + 3 * o - 3 * a) * n + a * i) / 6
}

function e1(e) {
  var t = e.length - 1;
  return function(r) {
    var n = r <= 0 ? r = 0 : r >= 1 ? (r = 1, t - 1) : Math.floor(r * t),
      i = e[n],
      o = e[n + 1],
      a = n > 0 ? e[n - 1] : 2 * i - o,
      u = n < t - 1 ? e[n + 2] : 2 * o - i;
    return zf((r - n / t) * t, a, i, o, u)
  }
}

function t1(e) {
  var t = e.length;
  return function(r) {
    var n = Math.floor(((r %= 1) < 0 ? ++r : r) * t),
      i = e[(n + t - 1) % t],
      o = e[n % t],
      a = e[(n + 1) % t],
      u = e[(n + 2) % t];
    return zf((r - n / t) * t, i, o, a, u)
  }
}
var No = e => () => e;

function XB(e, t) {
  return function(r) {
    return e + r * t
  }
}

function ZB(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r,
    function(n) {
      return Math.pow(e + n * t, r)
    }
}

function r1(e) {
  return (e = +e) == 1 ? ts : function(t, r) {
    return r - t ? ZB(t, r, e) : No(isNaN(t) ? r : t)
  }
}

function ts(e, t) {
  var r = t - e;
  return r ? XB(e, r) : No(isNaN(e) ? t : e)
}
var Hf = function e(t) {
  var r = r1(t);

  function n(i, o) {
    var a = r((i = ii(i)).r, (o = ii(o)).r),
      u = r(i.g, o.g),
      s = r(i.b, o.b),
      l = ts(i.opacity, o.opacity);
    return function(f) {
      return i.r = a(f), i.g = u(f), i.b = s(f), i.opacity = l(f), i + ""
    }
  }
  return n.gamma = e, n
}(1);

function n1(e) {
  return function(t) {
    var r = t.length,
      n = new Array(r),
      i = new Array(r),
      o = new Array(r),
      a, u;
    for (a = 0; a < r; ++a) u = ii(t[a]), n[a] = u.r || 0, i[a] = u.g || 0, o[a] = u.b || 0;
    return n = e(n), i = e(i), o = e(o), u.opacity = 1,
      function(s) {
        return u.r = n(s), u.g = i(s), u.b = o(s), u + ""
      }
  }
}
var hZ = n1(e1),
  yZ = n1(t1);

function i1(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0,
    n = t.slice(),
    i;
  return function(o) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - o) + t[i] * o;
    return n
  }
}

function o1(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView)
}

function a1(e, t) {
  var r = t ? t.length : 0,
    n = e ? Math.min(r, e.length) : 0,
    i = new Array(n),
    o = new Array(r),
    a;
  for (a = 0; a < n; ++a) i[a] = mt(e[a], t[a]);
  for (; a < r; ++a) o[a] = t[a];
  return function(u) {
    for (a = 0; a < n; ++a) o[a] = i[a](u);
    return o
  }
}

function u1(e, t) {
  var r = new Date;
  return e = +e, t = +t,
    function(n) {
      return r.setTime(e * (1 - n) + t * n), r
    }
}

function kr(e, t) {
  return e = +e, t = +t,
    function(r) {
      return e * (1 - r) + t * r
    }
}

function s1(e, t) {
  var r = {},
    n = {},
    i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t) i in e ? r[i] = mt(e[i], t[i]) : n[i] = t[i];
  return function(o) {
    for (i in r) n[i] = r[i](o);
    return n
  }
}
var Gf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Uf = new RegExp(Gf.source, "g");

function JB(e) {
  return function() {
    return e
  }
}

function QB(e) {
  return function(t) {
    return e(t) + ""
  }
}

function l1(e, t) {
  var r = Gf.lastIndex = Uf.lastIndex = 0,
    n, i, o, a = -1,
    u = [],
    s = [];
  for (e = e + "", t = t + "";
    (n = Gf.exec(e)) && (i = Uf.exec(t));)(o = i.index) > r && (o = t.slice(r, o), u[a] ? u[a] += o : u[++a] = o), (n = n[0]) === (i = i[0]) ? u[a] ? u[a] += i : u[++a] = i : (u[++a] = null, s.push({
    i: a,
    x: kr(n, i)
  })), r = Uf.lastIndex;
  return r < t.length && (o = t.slice(r), u[a] ? u[a] += o : u[++a] = o), u.length < 2 ? s[0] ? QB(s[0].x) : JB(t) : (t = s.length, function(l) {
    for (var f = 0, c; f < t; ++f) u[(c = s[f]).i] = c.x(l);
    return u.join("")
  })
}

function mt(e, t) {
  var r = typeof t,
    n;
  return t == null || r === "boolean" ? No(t) : (r === "number" ? kr : r === "string" ? (n = jr(t)) ? (t = n, Hf) : l1 : t instanceof jr ? Hf : t instanceof Date ? u1 : o1(t) ? i1 : Array.isArray(t) ? a1 : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? s1 : kr)(e, t)
}

function en(e, t) {
  return e = +e, t = +t,
    function(r) {
      return Math.round(e * (1 - r) + t * r)
    }
}

function rs(e, t) {
  t === void 0 && (t = e, e = mt);
  for (var r = 0, n = t.length - 1, i = t[0], o = new Array(n < 0 ? 0 : n); r < n;) o[r] = e(i, i = t[++r]);
  return function(a) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(a *= n)));
    return o[u](a - u)
  }
}

function Kf(e) {
  return function() {
    return e
  }
}

function Mr(e) {
  return +e
}
var c1 = [0, 1];

function Re(e) {
  return e
}

function Vf(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t
  } : Kf(isNaN(t) ? NaN : .5)
}

function eq(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r),
    function(n) {
      return Math.max(e, Math.min(t, n))
    }
}

function tq(e, t, r) {
  var n = e[0],
    i = e[1],
    o = t[0],
    a = t[1];
  return i < n ? (n = Vf(i, n), o = r(a, o)) : (n = Vf(n, i), o = r(o, a)),
    function(u) {
      return o(n(u))
    }
}

function rq(e, t, r) {
  var n = Math.min(e.length, t.length) - 1,
    i = new Array(n),
    o = new Array(n),
    a = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++a < n;) i[a] = Vf(e[a], e[a + 1]), o[a] = r(t[a], t[a + 1]);
  return function(u) {
    var s = Wt(e, u, 1, n) - 1;
    return o[s](i[s](u))
  }
}

function nr(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown())
}

function tn() {
  var e = c1,
    t = c1,
    r = mt,
    n, i, o, a = Re,
    u, s, l;

  function f() {
    var p = Math.min(e.length, t.length);
    return a !== Re && (a = eq(e[0], e[p - 1])), u = p > 2 ? rq : tq, s = l = null, c
  }

  function c(p) {
    return p == null || isNaN(p = +p) ? o : (s || (s = u(e.map(n), t, r)))(n(a(p)))
  }
  return c.invert = function(p) {
      return a(i((l || (l = u(t, e.map(n), kr)))(p)))
    }, c.domain = function(p) {
      return arguments.length ? (e = Array.from(p, Mr), f()) : e.slice()
    }, c.range = function(p) {
      return arguments.length ? (t = Array.from(p), f()) : t.slice()
    }, c.rangeRound = function(p) {
      return t = Array.from(p), r = en, f()
    }, c.clamp = function(p) {
      return arguments.length ? (a = p ? !0 : Re, f()) : a !== Re
    }, c.interpolate = function(p) {
      return arguments.length ? (r = p, f()) : r
    }, c.unknown = function(p) {
      return arguments.length ? (o = p, c) : o
    },
    function(p, h) {
      return n = p, i = h, f()
    }
}

function rn() {
  return tn()(Re, Re)
}

function f1(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10)
}

function nn(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"),
    n = e.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +e.slice(r + 1)]
}

function ir(e) {
  return e = nn(Math.abs(e)), e ? e[1] : NaN
}

function p1(e, t) {
  return function(r, n) {
    for (var i = r.length, o = [], a = 0, u = e[0], s = 0; i > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), o.push(r.substring(i -= u, i + u)), !((s += u + 1) > n));) u = e[a = (a + 1) % e.length];
    return o.reverse().join(t)
  }
}

function d1(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r]
    })
  }
}
var nq = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function or(e) {
  if (!(t = nq.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new ns({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  })
}
or.prototype = ns.prototype;

function ns(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + ""
}
ns.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type
};

function m1(e) {
  e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r) switch (e[r]) {
    case ".":
      n = i = r;
      break;
    case "0":
      n === 0 && (n = r), i = r;
      break;
    default:
      if (!+e[r]) break e;
      n > 0 && (n = 0);
      break
  }
  return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e
}
var Do;

function h1(e, t) {
  var r = nn(e, t);
  if (!r) return Do = void 0, e.toPrecision(t);
  var n = r[0],
    i = r[1],
    o = i - (Do = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    a = n.length;
  return o === a ? n : o > a ? n + new Array(o - a + 1).join("0") : o > 0 ? n.slice(0, o) + "." + n.slice(o) : "0." + new Array(1 - o).join("0") + nn(e, Math.max(0, t + o - 1))[0]
}

function Yf(e, t) {
  var r = nn(e, t);
  if (!r) return e + "";
  var n = r[0],
    i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0")
}
var Xf = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: e => Math.round(e).toString(2),
  c: e => e + "",
  d: f1,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: e => Math.round(e).toString(8),
  p: (e, t) => Yf(e * 100, t),
  r: Yf,
  s: h1,
  X: e => Math.round(e).toString(16).toUpperCase(),
  x: e => Math.round(e).toString(16)
};

function Zf(e) {
  return e
}
var y1 = Array.prototype.map,
  v1 = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function g1(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Zf : p1(y1.call(e.grouping, Number), e.thousands + ""),
    r = e.currency === void 0 ? "" : e.currency[0] + "",
    n = e.currency === void 0 ? "" : e.currency[1] + "",
    i = e.decimal === void 0 ? "." : e.decimal + "",
    o = e.numerals === void 0 ? Zf : d1(y1.call(e.numerals, String)),
    a = e.percent === void 0 ? "%" : e.percent + "",
    u = e.minus === void 0 ? "\u2212" : e.minus + "",
    s = e.nan === void 0 ? "NaN" : e.nan + "";

  function l(c, p) {
    c = or(c);
    var h = c.fill,
      g = c.align,
      m = c.sign,
      b = c.symbol,
      w = c.zero,
      A = c.width,
      T = c.comma,
      E = c.precision,
      y = c.trim,
      v = c.type;
    v === "n" ? (T = !0, v = "g") : Xf[v] || (E === void 0 && (E = 12), y = !0, v = "g"), (w || h === "0" && g === "=") && (w = !0, h = "0", g = "=");
    var j = (p && p.prefix !== void 0 ? p.prefix : "") + (b === "$" ? r : b === "#" && /[boxX]/.test(v) ? "0" + v.toLowerCase() : ""),
      M = (b === "$" ? n : /[%p]/.test(v) ? a : "") + (p && p.suffix !== void 0 ? p.suffix : ""),
      N = Xf[v],
      B = /[defgprs%]/.test(v);
    E = E === void 0 ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, E)) : Math.max(0, Math.min(20, E));

    function $(R) {
      var z = j,
        H = M,
        W, S, d;
      if (v === "c") H = N(R) + H, R = "";
      else {
        R = +R;
        var O = R < 0 || 1 / R < 0;
        if (R = isNaN(R) ? s : N(Math.abs(R), E), y && (R = m1(R)), O && +R == 0 && m !== "+" && (O = !1), z = (O ? m === "(" ? m : u : m === "-" || m === "(" ? "" : m) + z, H = (v === "s" && !isNaN(R) && Do !== void 0 ? v1[8 + Do / 3] : "") + H + (O && m === "(" ? ")" : ""), B) {
          for (W = -1, S = R.length; ++W < S;)
            if (d = R.charCodeAt(W), 48 > d || d > 57) {
              H = (d === 46 ? i + R.slice(W + 1) : R.slice(W)) + H, R = R.slice(0, W);
              break
            }
        }
      }
      T && !w && (R = t(R, 1 / 0));
      var P = z.length + R.length + H.length,
        x = P < A ? new Array(A - P + 1).join(h) : "";
      switch (T && w && (R = t(x + R, x.length ? A - H.length : 1 / 0), x = ""), g) {
        case "<":
          R = z + R + H + x;
          break;
        case "=":
          R = z + x + R + H;
          break;
        case "^":
          R = x.slice(0, P = x.length >> 1) + z + R + H + x.slice(P);
          break;
        default:
          R = x + z + R + H;
          break
      }
      return o(R)
    }
    return $.toString = function() {
      return c + ""
    }, $
  }

  function f(c, p) {
    var h = Math.max(-8, Math.min(8, Math.floor(ir(p) / 3))) * 3,
      g = Math.pow(10, -h),
      m = l((c = or(c), c.type = "f", c), {
        suffix: v1[8 + h / 3]
      });
    return function(b) {
      return m(g * b)
    }
  }
  return {
    format: l,
    formatPrefix: f
  }
}
var is, oi, os;
Jf({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function Jf(e) {
  return is = g1(e), oi = is.format, os = is.formatPrefix, is
}

function Qf(e) {
  return Math.max(0, -ir(Math.abs(e)))
}

function ep(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(ir(t) / 3))) * 3 - ir(Math.abs(e)))
}

function tp(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, ir(t) - ir(e)) + 1
}

function Ro(e, t, r, n) {
  var i = ti(e, t, r),
    o;
  switch (n = or(n ?? ",f"), n.type) {
    case "s": {
      var a = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(o = ep(i, a)) && (n.precision = o), os(n, a)
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(o = tp(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = o - (n.type === "e"));
      break
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(o = Qf(i)) && (n.precision = o - (n.type === "%") * 2);
      break
    }
  }
  return oi(n)
}

function it(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return Zr(n[0], n[n.length - 1], r ?? 10)
  }, e.tickFormat = function(r, n) {
    var i = t();
    return Ro(i[0], i[i.length - 1], r ?? 10, n)
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(),
      i = 0,
      o = n.length - 1,
      a = n[i],
      u = n[o],
      s, l, f = 10;
    for (u < a && (l = a, a = u, u = l, l = i, i = o, o = l); f-- > 0;) {
      if (l = jo(a, u, r), l === s) return n[i] = a, n[o] = u, t(n);
      if (l > 0) a = Math.floor(a / l) * l, u = Math.ceil(u / l) * l;
      else if (l < 0) a = Math.ceil(a * l) / l, u = Math.floor(u * l) / l;
      else break;
      s = l
    }
    return e
  }, e
}

function on() {
  var e = rn();
  return e.copy = function() {
    return nr(e, on())
  }, Ee.apply(e, arguments), it(e)
}

function as(e) {
  var t;

  function r(n) {
    return n == null || isNaN(n = +n) ? t : n
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, Mr), r) : e.slice()
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t
  }, r.copy = function() {
    return as(e).unknown(t)
  }, e = arguments.length ? Array.from(e, Mr) : [0, 1], it(r)
}

function Lo(e, t) {
  e = e.slice();
  var r = 0,
    n = e.length - 1,
    i = e[r],
    o = e[n],
    a;
  return o < i && (a = r, r = n, n = a, a = i, i = o, o = a), e[r] = t.floor(i), e[n] = t.ceil(o), e
}

function b1(e) {
  return Math.log(e)
}

function x1(e) {
  return Math.exp(e)
}

function iq(e) {
  return -Math.log(-e)
}

function oq(e) {
  return -Math.exp(-e)
}

function aq(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e
}

function uq(e) {
  return e === 10 ? aq : e === Math.E ? Math.exp : t => Math.pow(e, t)
}

function sq(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), t => Math.log(t) / e)
}

function w1(e) {
  return (t, r) => -e(-t, r)
}

function Bo(e) {
  let t = e(b1, x1),
    r = t.domain,
    n = 10,
    i, o;

  function a() {
    return i = sq(n), o = uq(n), r()[0] < 0 ? (i = w1(i), o = w1(o), e(iq, oq)) : e(b1, x1), t
  }
  return t.base = function(u) {
    return arguments.length ? (n = +u, a()) : n
  }, t.domain = function(u) {
    return arguments.length ? (r(u), a()) : r()
  }, t.ticks = u => {
    let s = r(),
      l = s[0],
      f = s[s.length - 1],
      c = f < l;
    c && ([l, f] = [f, l]);
    let p = i(l),
      h = i(f),
      g, m, b = u == null ? 10 : +u,
      w = [];
    if (!(n % 1) && h - p < b) {
      if (p = Math.floor(p), h = Math.ceil(h), l > 0) {
        for (; p <= h; ++p)
          for (g = 1; g < n; ++g)
            if (m = p < 0 ? g / o(-p) : g * o(p), !(m < l)) {
              if (m > f) break;
              w.push(m)
            }
      } else
        for (; p <= h; ++p)
          for (g = n - 1; g >= 1; --g)
            if (m = p > 0 ? g / o(-p) : g * o(p), !(m < l)) {
              if (m > f) break;
              w.push(m)
            } w.length * 2 < b && (w = Zr(l, f, b))
    } else w = Zr(p, h, Math.min(h - p, b)).map(o);
    return c ? w.reverse() : w
  }, t.tickFormat = (u, s) => {
    if (u == null && (u = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = or(s)).precision == null && (s.trim = !0), s = oi(s)), u === 1 / 0) return s;
    let l = Math.max(1, n * u / t.ticks().length);
    return f => {
      let c = f / o(Math.round(i(f)));
      return c * n < n - .5 && (c *= n), c <= l ? s(f) : ""
    }
  }, t.nice = () => r(Lo(r(), {
    floor: u => o(Math.floor(i(u))),
    ceil: u => o(Math.ceil(i(u)))
  })), t
}

function us() {
  let e = Bo(tn()).domain([1, 10]);
  return e.copy = () => nr(e, us()).base(e.base()), Ee.apply(e, arguments), e
}

function O1(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e))
  }
}

function S1(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e
  }
}

function qo(e) {
  var t = 1,
    r = e(O1(t), S1(t));
  return r.constant = function(n) {
    return arguments.length ? e(O1(t = +n), S1(t)) : t
  }, it(r)
}

function ss() {
  var e = qo(tn());
  return e.copy = function() {
    return nr(e, ss()).constant(e.constant())
  }, Ee.apply(e, arguments)
}

function A1(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e)
  }
}

function lq(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e)
}

function cq(e) {
  return e < 0 ? -e * e : e * e
}

function $o(e) {
  var t = e(Re, Re),
    r = 1;

  function n() {
    return r === 1 ? e(Re, Re) : r === .5 ? e(lq, cq) : e(A1(r), A1(1 / r))
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r
  }, it(t)
}

function Fo() {
  var e = $o(tn());
  return e.copy = function() {
    return nr(e, Fo()).exponent(e.exponent())
  }, Ee.apply(e, arguments), e
}

function P1() {
  return Fo.apply(null, arguments).exponent(.5)
}

function T1(e) {
  return Math.sign(e) * e * e
}

function fq(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e))
}

function ls() {
  var e = rn(),
    t = [0, 1],
    r = !1,
    n;

  function i(o) {
    var a = fq(e(o));
    return isNaN(a) ? n : r ? Math.round(a) : a
  }
  return i.invert = function(o) {
    return e.invert(T1(o))
  }, i.domain = function(o) {
    return arguments.length ? (e.domain(o), i) : e.domain()
  }, i.range = function(o) {
    return arguments.length ? (e.range((t = Array.from(o, Mr)).map(T1)), i) : t.slice()
  }, i.rangeRound = function(o) {
    return i.range(o).round(!0)
  }, i.round = function(o) {
    return arguments.length ? (r = !!o, i) : r
  }, i.clamp = function(o) {
    return arguments.length ? (e.clamp(o), i) : e.clamp()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return ls(e.domain(), t).round(r).clamp(e.clamp()).unknown(n)
  }, Ee.apply(i, arguments), it(i)
}

function cs() {
  var e = [],
    t = [],
    r = [],
    n;

  function i() {
    var a = 0,
      u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++a < u;) r[a - 1] = $f(e, a / u);
    return o
  }

  function o(a) {
    return a == null || isNaN(a = +a) ? n : t[Wt(r, a)]
  }
  return o.invertExtent = function(a) {
    var u = t.indexOf(a);
    return u < 0 ? [NaN, NaN] : [u > 0 ? r[u - 1] : e[0], u < r.length ? r[u] : e[e.length - 1]]
  }, o.domain = function(a) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let u of a) u != null && !isNaN(u = +u) && e.push(u);
    return e.sort(nt), i()
  }, o.range = function(a) {
    return arguments.length ? (t = Array.from(a), i()) : t.slice()
  }, o.unknown = function(a) {
    return arguments.length ? (n = a, o) : n
  }, o.quantiles = function() {
    return r.slice()
  }, o.copy = function() {
    return cs().domain(e).range(t).unknown(n)
  }, Ee.apply(o, arguments)
}

function fs() {
  var e = 0,
    t = 1,
    r = 1,
    n = [.5],
    i = [0, 1],
    o;

  function a(s) {
    return s != null && s <= s ? i[Wt(n, s, 0, r)] : o
  }

  function u() {
    var s = -1;
    for (n = new Array(r); ++s < r;) n[s] = ((s + 1) * t - (s - r) * e) / (r + 1);
    return a
  }
  return a.domain = function(s) {
    return arguments.length ? ([e, t] = s, e = +e, t = +t, u()) : [e, t]
  }, a.range = function(s) {
    return arguments.length ? (r = (i = Array.from(s)).length - 1, u()) : i.slice()
  }, a.invertExtent = function(s) {
    var l = i.indexOf(s);
    return l < 0 ? [NaN, NaN] : l < 1 ? [e, n[0]] : l >= r ? [n[r - 1], t] : [n[l - 1], n[l]]
  }, a.unknown = function(s) {
    return arguments.length && (o = s), a
  }, a.thresholds = function() {
    return n.slice()
  }, a.copy = function() {
    return fs().domain([e, t]).range(i).unknown(o)
  }, Ee.apply(it(a), arguments)
}

function ps() {
  var e = [.5],
    t = [0, 1],
    r, n = 1;

  function i(o) {
    return o != null && o <= o ? t[Wt(e, o, 0, n)] : r
  }
  return i.domain = function(o) {
    return arguments.length ? (e = Array.from(o), n = Math.min(e.length, t.length - 1), i) : e.slice()
  }, i.range = function(o) {
    return arguments.length ? (t = Array.from(o), n = Math.min(e.length, t.length - 1), i) : t.slice()
  }, i.invertExtent = function(o) {
    var a = t.indexOf(o);
    return [e[a - 1], e[a]]
  }, i.unknown = function(o) {
    return arguments.length ? (r = o, i) : r
  }, i.copy = function() {
    return ps().domain(e).range(t).unknown(r)
  }, Ee.apply(i, arguments)
}
var rp = new Date,
  np = new Date;

function Oe(e, t, r, n) {
  function i(o) {
    return e(o = arguments.length === 0 ? new Date : new Date(+o)), o
  }
  return i.floor = o => (e(o = new Date(+o)), o), i.ceil = o => (e(o = new Date(o - 1)), t(o, 1), e(o), o), i.round = o => {
    let a = i(o),
      u = i.ceil(o);
    return o - a < u - o ? a : u
  }, i.offset = (o, a) => (t(o = new Date(+o), a == null ? 1 : Math.floor(a)), o), i.range = (o, a, u) => {
    let s = [];
    if (o = i.ceil(o), u = u == null ? 1 : Math.floor(u), !(o < a) || !(u > 0)) return s;
    let l;
    do s.push(l = new Date(+o)), t(o, u), e(o); while (l < o && o < a);
    return s
  }, i.filter = o => Oe(a => {
    if (a >= a)
      for (; e(a), !o(a);) a.setTime(a - 1)
  }, (a, u) => {
    if (a >= a)
      if (u < 0)
        for (; ++u <= 0;)
          for (; t(a, -1), !o(a););
      else
        for (; --u >= 0;)
          for (; t(a, 1), !o(a););
  }), r && (i.count = (o, a) => (rp.setTime(+o), np.setTime(+a), e(rp), e(np), Math.floor(r(rp, np))), i.every = o => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(n ? a => n(a) % o === 0 : a => i.count(0, a) % o === 0) : i)), i
}
var Wo = Oe(() => {}, (e, t) => {
  e.setTime(+e + t)
}, (e, t) => t - e);
Wo.every = e => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Oe(t => {
  t.setTime(Math.floor(t / e) * e)
}, (t, r) => {
  t.setTime(+t + r * e)
}, (t, r) => (r - t) / e) : Wo);
var TQ = Wo.range;
var kt = Oe(e => {
    e.setTime(e - e.getMilliseconds())
  }, (e, t) => {
    e.setTime(+e + t * 1e3)
  }, (e, t) => (t - e) / 1e3, e => e.getUTCSeconds()),
  _1 = kt.range;
var ai = Oe(e => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * 1e3)
  }, (e, t) => {
    e.setTime(+e + t * 6e4)
  }, (e, t) => (t - e) / 6e4, e => e.getMinutes()),
  pq = ai.range,
  ui = Oe(e => {
    e.setUTCSeconds(0, 0)
  }, (e, t) => {
    e.setTime(+e + t * 6e4)
  }, (e, t) => (t - e) / 6e4, e => e.getUTCMinutes()),
  dq = ui.range;
var si = Oe(e => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * 1e3 - e.getMinutes() * 6e4)
  }, (e, t) => {
    e.setTime(+e + t * 36e5)
  }, (e, t) => (t - e) / 36e5, e => e.getHours()),
  mq = si.range,
  li = Oe(e => {
    e.setUTCMinutes(0, 0, 0)
  }, (e, t) => {
    e.setTime(+e + t * 36e5)
  }, (e, t) => (t - e) / 36e5, e => e.getUTCHours()),
  hq = li.range;
var mr = Oe(e => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 864e5, e => e.getDate() - 1),
  yq = mr.range,
  sn = Oe(e => {
    e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCDate(e.getUTCDate() + t)
  }, (e, t) => (t - e) / 864e5, e => e.getUTCDate() - 1),
  vq = sn.range,
  ds = Oe(e => {
    e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCDate(e.getUTCDate() + t)
  }, (e, t) => (t - e) / 864e5, e => Math.floor(e / 864e5)),
  gq = ds.range;

function ln(e) {
  return Oe(t => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0)
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7)
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 6048e5)
}
var hr = ln(0),
  ci = ln(1),
  j1 = ln(2),
  k1 = ln(3),
  Cr = ln(4),
  M1 = ln(5),
  C1 = ln(6),
  I1 = hr.range,
  bq = ci.range,
  xq = j1.range,
  wq = k1.range,
  Oq = Cr.range,
  Sq = M1.range,
  Aq = C1.range;

function cn(e) {
  return Oe(t => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0)
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7)
  }, (t, r) => (r - t) / 6048e5)
}
var yr = cn(0),
  fi = cn(1),
  N1 = cn(2),
  D1 = cn(3),
  Ir = cn(4),
  R1 = cn(5),
  L1 = cn(6),
  B1 = yr.range,
  Pq = fi.range,
  Tq = N1.range,
  _q = D1.range,
  Eq = Ir.range,
  jq = R1.range,
  kq = L1.range;
var pi = Oe(e => {
    e.setDate(1), e.setHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setMonth(e.getMonth() + t)
  }, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, e => e.getMonth()),
  Mq = pi.range,
  di = Oe(e => {
    e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCMonth(e.getUTCMonth() + t)
  }, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, e => e.getUTCMonth()),
  Cq = di.range;
var ht = Oe(e => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t)
}, (e, t) => t.getFullYear() - e.getFullYear(), e => e.getFullYear());
ht.every = e => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Oe(t => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e)
});
var Iq = ht.range,
  yt = Oe(e => {
    e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t)
  }, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), e => e.getUTCFullYear());
yt.every = e => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Oe(t => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e)
});
var Nq = yt.range;

function $1(e, t, r, n, i, o) {
  let a = [
    [kt, 1, 1e3],
    [kt, 5, 5 * 1e3],
    [kt, 15, 15 * 1e3],
    [kt, 30, 30 * 1e3],
    [o, 1, 6e4],
    [o, 5, 5 * 6e4],
    [o, 15, 15 * 6e4],
    [o, 30, 30 * 6e4],
    [i, 1, 36e5],
    [i, 3, 3 * 36e5],
    [i, 6, 6 * 36e5],
    [i, 12, 12 * 36e5],
    [n, 1, 864e5],
    [n, 2, 2 * 864e5],
    [r, 1, 6048e5],
    [t, 1, 2592e6],
    [t, 3, 3 * 2592e6],
    [e, 1, 31536e6]
  ];

  function u(l, f, c) {
    let p = f < l;
    p && ([l, f] = [f, l]);
    let h = c && typeof c.range == "function" ? c : s(l, f, c),
      g = h ? h.range(l, +f + 1) : [];
    return p ? g.reverse() : g
  }

  function s(l, f, c) {
    let p = Math.abs(f - l) / c,
      h = Xr(([, , b]) => b).right(a, p);
    if (h === a.length) return e.every(ti(l / 31536e6, f / 31536e6, c));
    if (h === 0) return Wo.every(Math.max(ti(l, f, c), 1));
    let [g, m] = a[p / a[h - 1][2] < a[h][2] / p ? h - 1 : h];
    return g.every(m)
  }
  return [u, s]
}
var [ip, op] = $1(yt, di, yr, ds, li, ui), [ap, up] = $1(ht, pi, hr, mr, si, ai);

function sp(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L)
}

function lp(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L))
}

function Ho(e, t, r) {
  return {
    y: e,
    m: t,
    d: r,
    H: 0,
    M: 0,
    S: 0,
    L: 0
  }
}

function cp(e) {
  var t = e.dateTime,
    r = e.date,
    n = e.time,
    i = e.periods,
    o = e.days,
    a = e.shortDays,
    u = e.months,
    s = e.shortMonths,
    l = Uo(i),
    f = Go(i),
    c = Uo(o),
    p = Go(o),
    h = Uo(a),
    g = Go(a),
    m = Uo(u),
    b = Go(u),
    w = Uo(s),
    A = Go(s),
    T = {
      a: d,
      A: O,
      b: P,
      B: x,
      c: null,
      d: G1,
      e: G1,
      f: i$,
      g: m$,
      G: y$,
      H: t$,
      I: r$,
      j: n$,
      L: Z1,
      m: o$,
      M: a$,
      p: _,
      q: C,
      Q: Y1,
      s: X1,
      S: u$,
      u: s$,
      U: l$,
      V: c$,
      w: f$,
      W: p$,
      x: null,
      X: null,
      y: d$,
      Y: h$,
      Z: v$,
      "%": V1
    },
    E = {
      a: D,
      A: F,
      b: Y,
      B: X,
      c: null,
      d: K1,
      e: K1,
      f: w$,
      g: M$,
      G: I$,
      H: g$,
      I: b$,
      j: x$,
      L: Q1,
      m: O$,
      M: S$,
      p: re,
      q: pe,
      Q: Y1,
      s: X1,
      S: A$,
      u: P$,
      U: T$,
      V: _$,
      w: E$,
      W: j$,
      x: null,
      X: null,
      y: k$,
      Y: C$,
      Z: N$,
      "%": V1
    },
    y = {
      a: B,
      A: $,
      b: R,
      B: z,
      c: H,
      d: H1,
      e: H1,
      f: Zq,
      g: z1,
      G: W1,
      H: U1,
      I: U1,
      j: Kq,
      L: Xq,
      m: Gq,
      M: Vq,
      p: N,
      q: Uq,
      Q: Qq,
      s: e$,
      S: Yq,
      u: $q,
      U: Fq,
      V: Wq,
      w: qq,
      W: zq,
      x: W,
      X: S,
      y: z1,
      Y: W1,
      Z: Hq,
      "%": Jq
    };
  T.x = v(r, T), T.X = v(n, T), T.c = v(t, T), E.x = v(r, E), E.X = v(n, E), E.c = v(t, E);

  function v(K, ae) {
    return function(te) {
      var G = [],
        he = -1,
        Z = 0,
        ee = K.length,
        ie, ue, ce;
      for (te instanceof Date || (te = new Date(+te)); ++he < ee;) K.charCodeAt(he) === 37 && (G.push(K.slice(Z, he)), (ue = F1[ie = K.charAt(++he)]) != null ? ie = K.charAt(++he) : ue = ie === "e" ? " " : "0", (ce = ae[ie]) && (ie = ce(te, ue)), G.push(ie), Z = he + 1);
      return G.push(K.slice(Z, he)), G.join("")
    }
  }

  function j(K, ae) {
    return function(te) {
      var G = Ho(1900, void 0, 1),
        he = M(G, K, te += "", 0),
        Z, ee;
      if (he != te.length) return null;
      if ("Q" in G) return new Date(G.Q);
      if ("s" in G) return new Date(G.s * 1e3 + ("L" in G ? G.L : 0));
      if (ae && !("Z" in G) && (G.Z = 0), "p" in G && (G.H = G.H % 12 + G.p * 12), G.m === void 0 && (G.m = "q" in G ? G.q : 0), "V" in G) {
        if (G.V < 1 || G.V > 53) return null;
        "w" in G || (G.w = 1), "Z" in G ? (Z = lp(Ho(G.y, 0, 1)), ee = Z.getUTCDay(), Z = ee > 4 || ee === 0 ? fi.ceil(Z) : fi(Z), Z = sn.offset(Z, (G.V - 1) * 7), G.y = Z.getUTCFullYear(), G.m = Z.getUTCMonth(), G.d = Z.getUTCDate() + (G.w + 6) % 7) : (Z = sp(Ho(G.y, 0, 1)), ee = Z.getDay(), Z = ee > 4 || ee === 0 ? ci.ceil(Z) : ci(Z), Z = mr.offset(Z, (G.V - 1) * 7), G.y = Z.getFullYear(), G.m = Z.getMonth(), G.d = Z.getDate() + (G.w + 6) % 7)
      } else("W" in G || "U" in G) && ("w" in G || (G.w = "u" in G ? G.u % 7 : "W" in G ? 1 : 0), ee = "Z" in G ? lp(Ho(G.y, 0, 1)).getUTCDay() : sp(Ho(G.y, 0, 1)).getDay(), G.m = 0, G.d = "W" in G ? (G.w + 6) % 7 + G.W * 7 - (ee + 5) % 7 : G.w + G.U * 7 - (ee + 6) % 7);
      return "Z" in G ? (G.H += G.Z / 100 | 0, G.M += G.Z % 100, lp(G)) : sp(G)
    }
  }

  function M(K, ae, te, G) {
    for (var he = 0, Z = ae.length, ee = te.length, ie, ue; he < Z;) {
      if (G >= ee) return -1;
      if (ie = ae.charCodeAt(he++), ie === 37) {
        if (ie = ae.charAt(he++), ue = y[ie in F1 ? ae.charAt(he++) : ie], !ue || (G = ue(K, te, G)) < 0) return -1
      } else if (ie != te.charCodeAt(G++)) return -1
    }
    return G
  }

  function N(K, ae, te) {
    var G = l.exec(ae.slice(te));
    return G ? (K.p = f.get(G[0].toLowerCase()), te + G[0].length) : -1
  }

  function B(K, ae, te) {
    var G = h.exec(ae.slice(te));
    return G ? (K.w = g.get(G[0].toLowerCase()), te + G[0].length) : -1
  }

  function $(K, ae, te) {
    var G = c.exec(ae.slice(te));
    return G ? (K.w = p.get(G[0].toLowerCase()), te + G[0].length) : -1
  }

  function R(K, ae, te) {
    var G = w.exec(ae.slice(te));
    return G ? (K.m = A.get(G[0].toLowerCase()), te + G[0].length) : -1
  }

  function z(K, ae, te) {
    var G = m.exec(ae.slice(te));
    return G ? (K.m = b.get(G[0].toLowerCase()), te + G[0].length) : -1
  }

  function H(K, ae, te) {
    return M(K, t, ae, te)
  }

  function W(K, ae, te) {
    return M(K, r, ae, te)
  }

  function S(K, ae, te) {
    return M(K, n, ae, te)
  }

  function d(K) {
    return a[K.getDay()]
  }

  function O(K) {
    return o[K.getDay()]
  }

  function P(K) {
    return s[K.getMonth()]
  }

  function x(K) {
    return u[K.getMonth()]
  }

  function _(K) {
    return i[+(K.getHours() >= 12)]
  }

  function C(K) {
    return 1 + ~~(K.getMonth() / 3)
  }

  function D(K) {
    return a[K.getUTCDay()]
  }

  function F(K) {
    return o[K.getUTCDay()]
  }

  function Y(K) {
    return s[K.getUTCMonth()]
  }

  function X(K) {
    return u[K.getUTCMonth()]
  }

  function re(K) {
    return i[+(K.getUTCHours() >= 12)]
  }

  function pe(K) {
    return 1 + ~~(K.getUTCMonth() / 3)
  }
  return {
    format: function(K) {
      var ae = v(K += "", T);
      return ae.toString = function() {
        return K
      }, ae
    },
    parse: function(K) {
      var ae = j(K += "", !1);
      return ae.toString = function() {
        return K
      }, ae
    },
    utcFormat: function(K) {
      var ae = v(K += "", E);
      return ae.toString = function() {
        return K
      }, ae
    },
    utcParse: function(K) {
      var ae = j(K += "", !0);
      return ae.toString = function() {
        return K
      }, ae
    }
  }
}
var F1 = {
    "-": "",
    _: " ",
    0: "0"
  },
  Fe = /^\s*\d+/,
  Rq = /^%/,
  Lq = /[\\^$*+?|[\]().{}]/g;

function me(e, t, r) {
  var n = e < 0 ? "-" : "",
    i = (n ? -e : e) + "",
    o = i.length;
  return n + (o < r ? new Array(r - o + 1).join(t) + i : i)
}

function Bq(e) {
  return e.replace(Lq, "\\$&")
}

function Uo(e) {
  return new RegExp("^(?:" + e.map(Bq).join("|") + ")", "i")
}

function Go(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]))
}

function qq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1
}

function $q(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1
}

function Fq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1
}

function Wq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1
}

function zq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1
}

function W1(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1
}

function z1(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1
}

function Hq(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1
}

function Uq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1
}

function Gq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1
}

function H1(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1
}

function Kq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1
}

function U1(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1
}

function Vq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1
}

function Yq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1
}

function Xq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1
}

function Zq(e, t, r) {
  var n = Fe.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1
}

function Jq(e, t, r) {
  var n = Rq.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1
}

function Qq(e, t, r) {
  var n = Fe.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1
}

function e$(e, t, r) {
  var n = Fe.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1
}

function G1(e, t) {
  return me(e.getDate(), t, 2)
}

function t$(e, t) {
  return me(e.getHours(), t, 2)
}

function r$(e, t) {
  return me(e.getHours() % 12 || 12, t, 2)
}

function n$(e, t) {
  return me(1 + mr.count(ht(e), e), t, 3)
}

function Z1(e, t) {
  return me(e.getMilliseconds(), t, 3)
}

function i$(e, t) {
  return Z1(e, t) + "000"
}

function o$(e, t) {
  return me(e.getMonth() + 1, t, 2)
}

function a$(e, t) {
  return me(e.getMinutes(), t, 2)
}

function u$(e, t) {
  return me(e.getSeconds(), t, 2)
}

function s$(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t
}

function l$(e, t) {
  return me(hr.count(ht(e) - 1, e), t, 2)
}

function J1(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Cr(e) : Cr.ceil(e)
}

function c$(e, t) {
  return e = J1(e), me(Cr.count(ht(e), e) + (ht(e).getDay() === 4), t, 2)
}

function f$(e) {
  return e.getDay()
}

function p$(e, t) {
  return me(ci.count(ht(e) - 1, e), t, 2)
}

function d$(e, t) {
  return me(e.getFullYear() % 100, t, 2)
}

function m$(e, t) {
  return e = J1(e), me(e.getFullYear() % 100, t, 2)
}

function h$(e, t) {
  return me(e.getFullYear() % 1e4, t, 4)
}

function y$(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? Cr(e) : Cr.ceil(e), me(e.getFullYear() % 1e4, t, 4)
}

function v$(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + me(t / 60 | 0, "0", 2) + me(t % 60, "0", 2)
}

function K1(e, t) {
  return me(e.getUTCDate(), t, 2)
}

function g$(e, t) {
  return me(e.getUTCHours(), t, 2)
}

function b$(e, t) {
  return me(e.getUTCHours() % 12 || 12, t, 2)
}

function x$(e, t) {
  return me(1 + sn.count(yt(e), e), t, 3)
}

function Q1(e, t) {
  return me(e.getUTCMilliseconds(), t, 3)
}

function w$(e, t) {
  return Q1(e, t) + "000"
}

function O$(e, t) {
  return me(e.getUTCMonth() + 1, t, 2)
}

function S$(e, t) {
  return me(e.getUTCMinutes(), t, 2)
}

function A$(e, t) {
  return me(e.getUTCSeconds(), t, 2)
}

function P$(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t
}

function T$(e, t) {
  return me(yr.count(yt(e) - 1, e), t, 2)
}

function ew(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? Ir(e) : Ir.ceil(e)
}

function _$(e, t) {
  return e = ew(e), me(Ir.count(yt(e), e) + (yt(e).getUTCDay() === 4), t, 2)
}

function E$(e) {
  return e.getUTCDay()
}

function j$(e, t) {
  return me(fi.count(yt(e) - 1, e), t, 2)
}

function k$(e, t) {
  return me(e.getUTCFullYear() % 100, t, 2)
}

function M$(e, t) {
  return e = ew(e), me(e.getUTCFullYear() % 100, t, 2)
}

function C$(e, t) {
  return me(e.getUTCFullYear() % 1e4, t, 4)
}

function I$(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? Ir(e) : Ir.ceil(e), me(e.getUTCFullYear() % 1e4, t, 4)
}

function N$() {
  return "+0000"
}

function V1() {
  return "%"
}

function Y1(e) {
  return +e
}

function X1(e) {
  return Math.floor(+e / 1e3)
}
var mi, ms, tw, hs, rw;
fp({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function fp(e) {
  return mi = cp(e), ms = mi.format, tw = mi.parse, hs = mi.utcFormat, rw = mi.utcParse, mi
}

function D$(e) {
  return new Date(e)
}

function R$(e) {
  return e instanceof Date ? +e : +new Date(+e)
}

function ys(e, t, r, n, i, o, a, u, s, l) {
  var f = rn(),
    c = f.invert,
    p = f.domain,
    h = l(".%L"),
    g = l(":%S"),
    m = l("%I:%M"),
    b = l("%I %p"),
    w = l("%a %d"),
    A = l("%b %d"),
    T = l("%B"),
    E = l("%Y");

  function y(v) {
    return (s(v) < v ? h : u(v) < v ? g : a(v) < v ? m : o(v) < v ? b : n(v) < v ? i(v) < v ? w : A : r(v) < v ? T : E)(v)
  }
  return f.invert = function(v) {
    return new Date(c(v))
  }, f.domain = function(v) {
    return arguments.length ? p(Array.from(v, R$)) : p().map(D$)
  }, f.ticks = function(v) {
    var j = p();
    return e(j[0], j[j.length - 1], v ?? 10)
  }, f.tickFormat = function(v, j) {
    return j == null ? y : l(j)
  }, f.nice = function(v) {
    var j = p();
    return (!v || typeof v.range != "function") && (v = t(j[0], j[j.length - 1], v ?? 10)), v ? p(Lo(j, v)) : f
  }, f.copy = function() {
    return nr(f, ys(e, t, r, n, i, o, a, u, s, l))
  }, f
}

function pp() {
  return Ee.apply(ys(ap, up, ht, pi, hr, mr, si, ai, kt, ms).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments)
}

function dp() {
  return Ee.apply(ys(ip, op, yt, di, yr, sn, li, ui, kt, hs).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments)
}

function vs() {
  var e = 0,
    t = 1,
    r, n, i, o, a = Re,
    u = !1,
    s;

  function l(c) {
    return c == null || isNaN(c = +c) ? s : a(i === 0 ? .5 : (c = (o(c) - r) * i, u ? Math.max(0, Math.min(1, c)) : c))
  }
  l.domain = function(c) {
    return arguments.length ? ([e, t] = c, r = o(e = +e), n = o(t = +t), i = r === n ? 0 : 1 / (n - r), l) : [e, t]
  }, l.clamp = function(c) {
    return arguments.length ? (u = !!c, l) : u
  }, l.interpolator = function(c) {
    return arguments.length ? (a = c, l) : a
  };

  function f(c) {
    return function(p) {
      var h, g;
      return arguments.length ? ([h, g] = p, a = c(h, g), l) : [a(0), a(1)]
    }
  }
  return l.range = f(mt), l.rangeRound = f(en), l.unknown = function(c) {
      return arguments.length ? (s = c, l) : s
    },
    function(c) {
      return o = c, r = c(e), n = c(t), i = r === n ? 0 : 1 / (n - r), l
    }
}

function vr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown())
}

function gs() {
  var e = it(vs()(Re));
  return e.copy = function() {
    return vr(e, gs())
  }, jt.apply(e, arguments)
}

function mp() {
  var e = Bo(vs()).domain([1, 10]);
  return e.copy = function() {
    return vr(e, mp()).base(e.base())
  }, jt.apply(e, arguments)
}

function hp() {
  var e = qo(vs());
  return e.copy = function() {
    return vr(e, hp()).constant(e.constant())
  }, jt.apply(e, arguments)
}

function bs() {
  var e = $o(vs());
  return e.copy = function() {
    return vr(e, bs()).exponent(e.exponent())
  }, jt.apply(e, arguments)
}

function nw() {
  return bs.apply(null, arguments).exponent(.5)
}

function xs() {
  var e = [],
    t = Re;

  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Wt(e, n, 1) - 1) / (e.length - 1))
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(nt), r
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)))
  }, r.quantiles = function(n) {
    return Array.from({
      length: n + 1
    }, (i, o) => Ku(e, o / n))
  }, r.copy = function() {
    return xs(t).domain(e)
  }, jt.apply(r, arguments)
}

function ws() {
  var e = 0,
    t = .5,
    r = 1,
    n = 1,
    i, o, a, u, s, l = Re,
    f, c = !1,
    p;

  function h(m) {
    return isNaN(m = +m) ? p : (m = .5 + ((m = +f(m)) - o) * (n * m < n * o ? u : s), l(c ? Math.max(0, Math.min(1, m)) : m))
  }
  h.domain = function(m) {
    return arguments.length ? ([e, t, r] = m, i = f(e = +e), o = f(t = +t), a = f(r = +r), u = i === o ? 0 : .5 / (o - i), s = o === a ? 0 : .5 / (a - o), n = o < i ? -1 : 1, h) : [e, t, r]
  }, h.clamp = function(m) {
    return arguments.length ? (c = !!m, h) : c
  }, h.interpolator = function(m) {
    return arguments.length ? (l = m, h) : l
  };

  function g(m) {
    return function(b) {
      var w, A, T;
      return arguments.length ? ([w, A, T] = b, l = rs(m, [w, A, T]), h) : [l(0), l(.5), l(1)]
    }
  }
  return h.range = g(mt), h.rangeRound = g(en), h.unknown = function(m) {
      return arguments.length ? (p = m, h) : p
    },
    function(m) {
      return f = m, i = m(e), o = m(t), a = m(r), u = i === o ? 0 : .5 / (o - i), s = o === a ? 0 : .5 / (a - o), n = o < i ? -1 : 1, h
    }
}

function Os() {
  var e = it(ws()(Re));
  return e.copy = function() {
    return vr(e, Os())
  }, jt.apply(e, arguments)
}

function yp() {
  var e = Bo(ws()).domain([.1, 1, 10]);
  return e.copy = function() {
    return vr(e, yp()).base(e.base())
  }, jt.apply(e, arguments)
}

function vp() {
  var e = qo(ws());
  return e.copy = function() {
    return vr(e, vp()).constant(e.constant())
  }, jt.apply(e, arguments)
}

function Ss() {
  var e = $o(ws());
  return e.copy = function() {
    return vr(e, Ss()).exponent(e.exponent())
  }, jt.apply(e, arguments)
}

function iw() {
  return Ss.apply(null, arguments).exponent(.5)
}
var ta = J(sw()),
  ra = J(fw()),
  vt = J(ft()),
  gi = J(_e()),
  Dw = J(tu()),
  Dp = J(Ar()),
  Rw = J(hw()),
  Ms = J(Jl()),
  Lw = J(hu()),
  Bw = J(hi()),
  qw = J(Du());
var ge = J(xp());

function oF(e) {
  return lF(e) || sF(e) || uF(e) || aF()
}

function aF() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function uF(e, t) {
  if (e) {
    if (typeof e == "string") return wp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return wp(e, t)
  }
}

function sF(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e)
}

function lF(e) {
  if (Array.isArray(e)) return wp(e)
}

function wp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var cF = function(t) {
    return t
  },
  bw = {
    "@@functional/placeholder": !0
  },
  xw = function(t) {
    return t === bw
  },
  gw = function(t) {
    return function r() {
      return arguments.length === 0 || arguments.length === 1 && xw(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments)
    }
  },
  fF = function e(t, r) {
    return t === 1 ? r : gw(function() {
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      var a = i.filter(function(u) {
        return u !== bw
      }).length;
      return a >= t ? r.apply(void 0, i) : e(t - a, gw(function() {
        for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++) s[l] = arguments[l];
        var f = i.map(function(c) {
          return xw(c) ? s.shift() : c
        });
        return r.apply(void 0, oF(f).concat(s))
      }))
    })
  },
  Vo = function(t) {
    return fF(t.length, t)
  },
  Yo = function(t, r) {
    for (var n = [], i = t; i < r; ++i) n[i - t] = i;
    return n
  },
  Op = Vo(function(e, t) {
    return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
      return t[r]
    }).map(e)
  }),
  Sp = function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
    if (!r.length) return cF;
    var i = r.reverse(),
      o = i[0],
      a = i.slice(1);
    return function() {
      return a.reduce(function(u, s) {
        return s(u)
      }, o.apply(void 0, arguments))
    }
  },
  Xo = function(t) {
    return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("")
  },
  Ts = function(t) {
    var r = null,
      n = null;
    return function() {
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
      return r && o.every(function(u, s) {
        return u === r[s]
      }) || (r = o, n = t.apply(void 0, o)), n
    }
  };
var Ap = J(xp());

function pF(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new Ap.default(e).abs().log(10).toNumber()) + 1, t
}

function dF(e, t, r) {
  for (var n = new Ap.default(e), i = 0, o = []; n.lt(t) && i < 1e5;) o.push(n.toNumber()), n = n.add(r), i++;
  return o
}
var mF = Vo(function(e, t, r) {
    var n = +e,
      i = +t;
    return n + r * (i - n)
  }),
  hF = Vo(function(e, t, r) {
    var n = t - +e;
    return n = n || 1 / 0, (r - e) / n
  }),
  yF = Vo(function(e, t, r) {
    var n = t - +e;
    return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n))
  }),
  Zo = {
    rangeStep: dF,
    getDigitCount: pF,
    interpolateNumber: mF,
    uninterpolateNumber: hF,
    uninterpolateTruncation: yF
  };

function Pp(e) {
  return bF(e) || gF(e) || ww(e) || vF()
}

function vF() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function gF(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e)
}

function bF(e) {
  if (Array.isArray(e)) return Tp(e)
}

function fn(e, t) {
  return OF(e) || wF(e, t) || ww(e, t) || xF()
}

function xF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function ww(e, t) {
  if (e) {
    if (typeof e == "string") return Tp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Tp(e, t)
  }
}

function Tp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function wF(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [],
      n = !0,
      i = !1,
      o = void 0;
    try {
      for (var a = e[Symbol.iterator](), u; !(n = (u = a.next()).done) && (r.push(u.value), !(t && r.length === t)); n = !0);
    } catch (s) {
      i = !0, o = s
    } finally {
      try {
        !n && a.return != null && a.return()
      } finally {
        if (i) throw o
      }
    }
    return r
  }
}

function OF(e) {
  if (Array.isArray(e)) return e
}

function _p(e) {
  var t = fn(e, 2),
    r = t[0],
    n = t[1],
    i = r,
    o = n;
  return r > n && (i = n, o = r), [i, o]
}

function Ep(e, t, r) {
  if (e.lte(0)) return new ge.default(0);
  var n = Zo.getDigitCount(e.toNumber()),
    i = new ge.default(10).pow(n),
    o = e.div(i),
    a = n !== 1 ? .05 : .1,
    u = new ge.default(Math.ceil(o.div(a).toNumber())).add(r).mul(a),
    s = u.mul(i);
  return t ? s : new ge.default(Math.ceil(s))
}

function Ow(e, t, r) {
  var n = 1,
    i = new ge.default(e);
  if (!i.isint() && r) {
    var o = Math.abs(e);
    o < 1 ? (n = new ge.default(10).pow(Zo.getDigitCount(e) - 1), i = new ge.default(Math.floor(i.div(n).toNumber())).mul(n)) : o > 1 && (i = new ge.default(Math.floor(e)))
  } else e === 0 ? i = new ge.default(Math.floor((t - 1) / 2)) : r || (i = new ge.default(Math.floor(e)));
  var a = Math.floor((t - 1) / 2),
    u = Sp(Op(function(s) {
      return i.add(new ge.default(s - a).mul(n)).toNumber()
    }), Yo);
  return u(0, t)
}

function Sw(e, t, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1))) return {
    step: new ge.default(0),
    tickMin: new ge.default(0),
    tickMax: new ge.default(0)
  };
  var o = Ep(new ge.default(t).sub(e).div(r - 1), n, i),
    a;
  e <= 0 && t >= 0 ? a = new ge.default(0) : (a = new ge.default(e).add(t).div(2), a = a.sub(new ge.default(a).mod(o)));
  var u = Math.ceil(a.sub(e).div(o).toNumber()),
    s = Math.ceil(new ge.default(t).sub(a).div(o).toNumber()),
    l = u + s + 1;
  return l > r ? Sw(e, t, r, n, i + 1) : (l < r && (s = t > 0 ? s + (r - l) : s, u = t > 0 ? u : u + (r - l)), {
    step: o,
    tickMin: a.sub(new ge.default(u).mul(o)),
    tickMax: a.add(new ge.default(s).mul(o))
  })
}

function SF(e) {
  var t = fn(e, 2),
    r = t[0],
    n = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = _p([r, n]),
    s = fn(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) {
    var c = f === 1 / 0 ? [l].concat(Pp(Yo(0, i - 1).map(function() {
      return 1 / 0
    }))) : [].concat(Pp(Yo(0, i - 1).map(function() {
      return -1 / 0
    })), [f]);
    return r > n ? Xo(c) : c
  }
  if (l === f) return Ow(l, i, o);
  var p = Sw(l, f, a, o),
    h = p.step,
    g = p.tickMin,
    m = p.tickMax,
    b = Zo.rangeStep(g, m.add(new ge.default(.1).mul(h)), h);
  return r > n ? Xo(b) : b
}

function AF(e) {
  var t = fn(e, 2),
    r = t[0],
    n = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = _p([r, n]),
    s = fn(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) return [r, n];
  if (l === f) return Ow(l, i, o);
  var c = Ep(new ge.default(f).sub(l).div(a - 1), o, 0),
    p = Sp(Op(function(g) {
      return new ge.default(l).add(new ge.default(g).mul(c)).toNumber()
    }), Yo),
    h = p(0, a).filter(function(g) {
      return g >= l && g <= f
    });
  return r > n ? Xo(h) : h
}

function PF(e, t) {
  var r = fn(e, 2),
    n = r[0],
    i = r[1],
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = _p([n, i]),
    u = fn(a, 2),
    s = u[0],
    l = u[1];
  if (s === -1 / 0 || l === 1 / 0) return [n, i];
  if (s === l) return [s];
  var f = Math.max(t, 2),
    c = Ep(new ge.default(l).sub(s).div(f - 1), o, 0),
    p = [].concat(Pp(Zo.rangeStep(new ge.default(s), new ge.default(l).sub(new ge.default(.99).mul(c)), c)), [l]);
  return n > i ? Xo(p) : p
}
var jp = Ts(SF),
  TF = Ts(AF),
  kp = Ts(PF);
import _s from "./react-shim-eraudit.js";
var _F = !0,
  Mp = "Invariant failed";

function Ht(e, t) {
  if (!e) {
    if (_F) throw new Error(Mp);
    var r = typeof t == "function" ? t() : t,
      n = r ? "".concat(Mp, ": ").concat(r) : Mp;
    throw new Error(n)
  }
}
var EF = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];

function yi(e) {
  "@babel/helpers - typeof";
  return yi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, yi(e)
}

function Es() {
  return Es = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Es.apply(this, arguments)
}

function jF(e, t) {
  return IF(e) || CF(e, t) || MF(e, t) || kF()
}

function kF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function MF(e, t) {
  if (e) {
    if (typeof e == "string") return Aw(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Aw(e, t)
  }
}

function Aw(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function CF(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function IF(e) {
  if (Array.isArray(e)) return e
}

function NF(e, t) {
  if (e == null) return {};
  var r = DF(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function DF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function RF(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Pw(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Ew(n.key), n)
  }
}

function LF(e, t, r) {
  return t && Pw(e.prototype, t), r && Pw(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function BF(e, t, r) {
  return t = js(t), qF(e, Tw() ? Reflect.construct(t, r || [], js(e).constructor) : t.apply(e, r))
}

function qF(e, t) {
  if (t && (yi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return $F(e)
}

function $F(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Tw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Tw = function() {
    return !!e
  })()
}

function js(e) {
  return js = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, js(e)
}

function FF(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Cp(e, t)
}

function Cp(e, t) {
  return Cp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Cp(e, t)
}

function _w(e, t, r) {
  return t = Ew(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Ew(e) {
  var t = WF(e, "string");
  return yi(t) == "symbol" ? t : t + ""
}

function WF(e, t) {
  if (yi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (yi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Nr = function(e) {
  function t() {
    return RF(this, t), BF(this, t, arguments)
  }
  return FF(t, e), LF(t, [{
    key: "render",
    value: function() {
      var n = this.props,
        i = n.offset,
        o = n.layout,
        a = n.width,
        u = n.dataKey,
        s = n.data,
        l = n.dataPointFormatter,
        f = n.xAxis,
        c = n.yAxis,
        p = NF(n, EF),
        h = Q(p, !1);
      this.props.direction === "x" && f.type !== "number" && Ht(!1);
      var g = s.map(function(m) {
        var b = l(m, u),
          w = b.x,
          A = b.y,
          T = b.value,
          E = b.errorVal;
        if (!E) return null;
        var y = [],
          v, j;
        if (Array.isArray(E)) {
          var M = jF(E, 2);
          v = M[0], j = M[1]
        } else v = j = E;
        if (o === "vertical") {
          var N = f.scale,
            B = A + i,
            $ = B + a,
            R = B - a,
            z = N(T - v),
            H = N(T + j);
          y.push({
            x1: H,
            y1: $,
            x2: H,
            y2: R
          }), y.push({
            x1: z,
            y1: B,
            x2: H,
            y2: B
          }), y.push({
            x1: z,
            y1: $,
            x2: z,
            y2: R
          })
        } else if (o === "horizontal") {
          var W = c.scale,
            S = w + i,
            d = S - a,
            O = S + a,
            P = W(T - v),
            x = W(T + j);
          y.push({
            x1: d,
            y1: x,
            x2: O,
            y2: x
          }), y.push({
            x1: S,
            y1: P,
            x2: S,
            y2: x
          }), y.push({
            x1: d,
            y1: P,
            x2: O,
            y2: P
          })
        }
        return _s.createElement(le, Es({
          className: "recharts-errorBar",
          key: "bar-".concat(y.map(function(_) {
            return "".concat(_.x1, "-").concat(_.x2, "-").concat(_.y1, "-").concat(_.y2)
          }))
        }, h), y.map(function(_) {
          return _s.createElement("line", Es({}, _, {
            key: "line-".concat(_.x1, "-").concat(_.x2, "-").concat(_.y1, "-").concat(_.y2)
          }))
        }))
      });
      return _s.createElement(le, {
        className: "recharts-errorBars"
      }, g)
    }
  }])
}(_s.Component);
_w(Nr, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
_w(Nr, "displayName", "ErrorBar");

function Jo(e) {
  "@babel/helpers - typeof";
  return Jo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Jo(e)
}

function jw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function pn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jw(Object(r), !0).forEach(function(n) {
      zF(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function zF(e, t, r) {
  return t = HF(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function HF(e) {
  var t = UF(e, "string");
  return Jo(t) == "symbol" ? t : t + ""
}

function UF(e, t) {
  if (Jo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Jo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var ks = function(t) {
  var r = t.children,
    n = t.formattedGraphicalItems,
    i = t.legendWidth,
    o = t.legendContent,
    a = Ke(r, Ft);
  if (!a) return null;
  var u = Ft.defaultProps,
    s = u !== void 0 ? pn(pn({}, u), a.props) : {},
    l;
  return a.props && a.props.payload ? l = a.props && a.props.payload : o === "children" ? l = (n || []).reduce(function(f, c) {
    var p = c.item,
      h = c.props,
      g = h.sectors || h.data || [];
    return f.concat(g.map(function(m) {
      return {
        type: a.props.iconType || p.props.legendType,
        value: m.name,
        color: m.fill,
        payload: m
      }
    }))
  }, []) : l = (n || []).map(function(f) {
    var c = f.item,
      p = c.type.defaultProps,
      h = p !== void 0 ? pn(pn({}, p), c.props) : {},
      g = h.dataKey,
      m = h.name,
      b = h.legendType,
      w = h.hide;
    return {
      inactive: w,
      dataKey: g,
      type: s.iconType || b || "square",
      color: Qo(c),
      value: m || g,
      payload: h
    }
  }), pn(pn(pn({}, s), Ft.getWithHeight(a, i)), {}, {
    payload: l,
    item: a
  })
};

function ea(e) {
  "@babel/helpers - typeof";
  return ea = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ea(e)
}

function kw(e) {
  return YF(e) || VF(e) || KF(e) || GF()
}

function GF() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function KF(e, t) {
  if (e) {
    if (typeof e == "string") return Np(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Np(e, t)
  }
}

function VF(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function YF(e) {
  if (Array.isArray(e)) return Np(e)
}

function Np(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function Mw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ke(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Mw(Object(r), !0).forEach(function(n) {
      vi(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Mw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function vi(e, t, r) {
  return t = XF(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function XF(e) {
  var t = ZF(e, "string");
  return ea(t) == "symbol" ? t : t + ""
}

function ZF(e, t) {
  if (ea(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ea(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function je(e, t, r) {
  return (0, vt.default)(e) || (0, vt.default)(t) ? r : Se(t) ? (0, Dp.default)(e, t, r) : (0, gi.default)(t) ? t(e) : r
}

function bi(e, t, r, n) {
  var i = (0, Rw.default)(e, function(u) {
    return je(u, t)
  });
  if (r === "number") {
    var o = i.filter(function(u) {
      return V(u) || parseFloat(u)
    });
    return o.length ? [(0, ra.default)(o), (0, ta.default)(o)] : [1 / 0, -1 / 0]
  }
  var a = n ? i.filter(function(u) {
    return !(0, vt.default)(u)
  }) : i;
  return a.map(function(u) {
    return Se(u) || u instanceof Date ? u : ""
  })
}
var $w = function(t) {
    var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
      i = arguments.length > 2 ? arguments[2] : void 0,
      o = arguments.length > 3 ? arguments[3] : void 0,
      a = -1,
      u = (r = n?.length) !== null && r !== void 0 ? r : 0;
    if (u <= 1) return 0;
    if (o && o.axisType === "angleAxis" && Math.abs(Math.abs(o.range[1] - o.range[0]) - 360) <= 1e-6)
      for (var s = o.range, l = 0; l < u; l++) {
        var f = l > 0 ? i[l - 1].coordinate : i[u - 1].coordinate,
          c = i[l].coordinate,
          p = l >= u - 1 ? i[0].coordinate : i[l + 1].coordinate,
          h = void 0;
        if (Me(c - f) !== Me(p - c)) {
          var g = [];
          if (Me(p - c) === Me(s[1] - s[0])) {
            h = p;
            var m = c + s[1] - s[0];
            g[0] = Math.min(m, (m + f) / 2), g[1] = Math.max(m, (m + f) / 2)
          } else {
            h = f;
            var b = p + s[1] - s[0];
            g[0] = Math.min(c, (b + c) / 2), g[1] = Math.max(c, (b + c) / 2)
          }
          var w = [Math.min(c, (h + c) / 2), Math.max(c, (h + c) / 2)];
          if (t > w[0] && t <= w[1] || t >= g[0] && t <= g[1]) {
            a = i[l].index;
            break
          }
        } else {
          var A = Math.min(f, p),
            T = Math.max(f, p);
          if (t > (A + c) / 2 && t <= (T + c) / 2) {
            a = i[l].index;
            break
          }
        }
      } else
        for (var E = 0; E < u; E++)
          if (E === 0 && t <= (n[E].coordinate + n[E + 1].coordinate) / 2 || E > 0 && E < u - 1 && t > (n[E].coordinate + n[E - 1].coordinate) / 2 && t <= (n[E].coordinate + n[E + 1].coordinate) / 2 || E === u - 1 && t > (n[E].coordinate + n[E - 1].coordinate) / 2) {
            a = n[E].index;
            break
          } return a
  },
  Qo = function(t) {
    var r, n = t,
      i = n.type.displayName,
      o = (r = t.type) !== null && r !== void 0 && r.defaultProps ? ke(ke({}, t.type.defaultProps), t.props) : t.props,
      a = o.stroke,
      u = o.fill,
      s;
    switch (i) {
      case "Line":
        s = a;
        break;
      case "Area":
      case "Radar":
        s = a && a !== "none" ? a : u;
        break;
      default:
        s = u;
        break
    }
    return s
  },
  Fw = function(t) {
    var r = t.barSize,
      n = t.totalSize,
      i = t.stackGroups,
      o = i === void 0 ? {} : i;
    if (!o) return {};
    for (var a = {}, u = Object.keys(o), s = 0, l = u.length; s < l; s++)
      for (var f = o[u[s]].stackGroups, c = Object.keys(f), p = 0, h = c.length; p < h; p++) {
        var g = f[c[p]],
          m = g.items,
          b = g.cateAxisId,
          w = m.filter(function(j) {
            return At(j.type).indexOf("Bar") >= 0
          });
        if (w && w.length) {
          var A = w[0].type.defaultProps,
            T = A !== void 0 ? ke(ke({}, A), w[0].props) : w[0].props,
            E = T.barSize,
            y = T[b];
          a[y] || (a[y] = []);
          var v = (0, vt.default)(E) ? r : E;
          a[y].push({
            item: w[0],
            stackList: w.slice(1),
            barSize: (0, vt.default)(v) ? void 0 : Ce(v, n, 0)
          })
        }
      }
    return a
  },
  Ww = function(t) {
    var r = t.barGap,
      n = t.barCategoryGap,
      i = t.bandSize,
      o = t.sizeList,
      a = o === void 0 ? [] : o,
      u = t.maxBarSize,
      s = a.length;
    if (s < 1) return null;
    var l = Ce(r, i, 0, !0),
      f, c = [];
    if (a[0].barSize === +a[0].barSize) {
      var p = !1,
        h = i / s,
        g = a.reduce(function(E, y) {
          return E + y.barSize || 0
        }, 0);
      g += (s - 1) * l, g >= i && (g -= (s - 1) * l, l = 0), g >= i && h > 0 && (p = !0, h *= .9, g = s * h);
      var m = (i - g) / 2 >> 0,
        b = {
          offset: m - l,
          size: 0
        };
      f = a.reduce(function(E, y) {
        var v = {
            item: y.item,
            position: {
              offset: b.offset + b.size + l,
              size: p ? h : y.barSize
            }
          },
          j = [].concat(kw(E), [v]);
        return b = j[j.length - 1].position, y.stackList && y.stackList.length && y.stackList.forEach(function(M) {
          j.push({
            item: M,
            position: b
          })
        }), j
      }, c)
    } else {
      var w = Ce(n, i, 0, !0);
      i - 2 * w - (s - 1) * l <= 0 && (l = 0);
      var A = (i - 2 * w - (s - 1) * l) / s;
      A > 1 && (A >>= 0);
      var T = u === +u ? Math.min(A, u) : A;
      f = a.reduce(function(E, y, v) {
        var j = [].concat(kw(E), [{
          item: y.item,
          position: {
            offset: w + (A + l) * v + (A - T) / 2,
            size: T
          }
        }]);
        return y.stackList && y.stackList.length && y.stackList.forEach(function(M) {
          j.push({
            item: M,
            position: j[j.length - 1].position
          })
        }), j
      }, c)
    }
    return f
  },
  zw = function(t, r, n, i) {
    var o = n.children,
      a = n.width,
      u = n.margin,
      s = a - (u.left || 0) - (u.right || 0),
      l = ks({
        children: o,
        legendWidth: s
      });
    if (l) {
      var f = i || {},
        c = f.width,
        p = f.height,
        h = l.align,
        g = l.verticalAlign,
        m = l.layout;
      if ((m === "vertical" || m === "horizontal" && g === "middle") && h !== "center" && V(t[h])) return ke(ke({}, t), {}, vi({}, h, t[h] + (c || 0)));
      if ((m === "horizontal" || m === "vertical" && h === "center") && g !== "middle" && V(t[g])) return ke(ke({}, t), {}, vi({}, g, t[g] + (p || 0)))
    }
    return t
  },
  JF = function(t, r, n) {
    return (0, vt.default)(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0
  },
  Hw = function(t, r, n, i, o) {
    var a = r.props.children,
      u = Ie(a, Nr).filter(function(l) {
        return JF(i, o, l.props.direction)
      });
    if (u && u.length) {
      var s = u.map(function(l) {
        return l.props.dataKey
      });
      return t.reduce(function(l, f) {
        var c = je(f, n);
        if ((0, vt.default)(c)) return l;
        var p = Array.isArray(c) ? [(0, ra.default)(c), (0, ta.default)(c)] : [c, c],
          h = s.reduce(function(g, m) {
            var b = je(f, m, 0),
              w = p[0] - Math.abs(Array.isArray(b) ? b[0] : b),
              A = p[1] + Math.abs(Array.isArray(b) ? b[1] : b);
            return [Math.min(w, g[0]), Math.max(A, g[1])]
          }, [1 / 0, -1 / 0]);
        return [Math.min(h[0], l[0]), Math.max(h[1], l[1])]
      }, [1 / 0, -1 / 0])
    }
    return null
  },
  Uw = function(t, r, n, i, o) {
    var a = r.map(function(u) {
      return Hw(t, u, n, o, i)
    }).filter(function(u) {
      return !(0, vt.default)(u)
    });
    return a && a.length ? a.reduce(function(u, s) {
      return [Math.min(u[0], s[0]), Math.max(u[1], s[1])]
    }, [1 / 0, -1 / 0]) : null
  },
  Rp = function(t, r, n, i, o) {
    var a = r.map(function(s) {
      var l = s.props.dataKey;
      return n === "number" && l && Hw(t, s, l, i) || bi(t, l, n, o)
    });
    if (n === "number") return a.reduce(function(s, l) {
      return [Math.min(s[0], l[0]), Math.max(s[1], l[1])]
    }, [1 / 0, -1 / 0]);
    var u = {};
    return a.reduce(function(s, l) {
      for (var f = 0, c = l.length; f < c; f++) u[l[f]] || (u[l[f]] = !0, s.push(l[f]));
      return s
    }, [])
  },
  Lp = function(t, r) {
    return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis"
  },
  Bp = function(t, r, n, i) {
    if (i) return t.map(function(s) {
      return s.coordinate
    });
    var o, a, u = t.map(function(s) {
      return s.coordinate === r && (o = !0), s.coordinate === n && (a = !0), s.coordinate
    });
    return o || u.push(r), a || u.push(n), u
  },
  gt = function(t, r, n) {
    if (!t) return null;
    var i = t.scale,
      o = t.duplicateDomain,
      a = t.type,
      u = t.range,
      s = t.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2,
      l = (r || n) && a === "category" && i.bandwidth ? i.bandwidth() / s : 0;
    if (l = t.axisType === "angleAxis" && u?.length >= 2 ? Me(u[0] - u[1]) * 2 * l : l, r && (t.ticks || t.niceTicks)) {
      var f = (t.ticks || t.niceTicks).map(function(c) {
        var p = o ? o.indexOf(c) : c;
        return {
          coordinate: i(p) + l,
          value: c,
          offset: l
        }
      });
      return f.filter(function(c) {
        return !(0, Ms.default)(c.coordinate)
      })
    }
    return t.isCategorical && t.categoricalDomain ? t.categoricalDomain.map(function(c, p) {
      return {
        coordinate: i(c) + l,
        value: c,
        index: p,
        offset: l
      }
    }) : i.ticks && !n ? i.ticks(t.tickCount).map(function(c) {
      return {
        coordinate: i(c) + l,
        value: c,
        offset: l
      }
    }) : i.domain().map(function(c, p) {
      return {
        coordinate: i(c) + l,
        value: o ? o[c] : c,
        index: p,
        offset: l
      }
    })
  },
  Ip = new WeakMap,
  na = function(t, r) {
    if (typeof r != "function") return t;
    Ip.has(t) || Ip.set(t, new WeakMap);
    var n = Ip.get(t);
    if (n.has(r)) return n.get(r);
    var i = function() {
      t.apply(void 0, arguments), r.apply(void 0, arguments)
    };
    return n.set(r, i), i
  },
  Cs = function(t, r, n) {
    var i = t.scale,
      o = t.type,
      a = t.layout,
      u = t.axisType;
    if (i === "auto") return a === "radial" && u === "radiusAxis" ? {
      scale: _r(),
      realScaleType: "band"
    } : a === "radial" && u === "angleAxis" ? {
      scale: on(),
      realScaleType: "linear"
    } : o === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: Er(),
      realScaleType: "point"
    } : o === "category" ? {
      scale: _r(),
      realScaleType: "band"
    } : {
      scale: on(),
      realScaleType: "linear"
    };
    if ((0, Dw.default)(i)) {
      var s = "scale".concat((0, Lw.default)(i));
      return {
        scale: (As[s] || Er)(),
        realScaleType: As[s] ? s : "point"
      }
    }
    return (0, gi.default)(i) ? {
      scale: i
    } : {
      scale: Er(),
      realScaleType: "point"
    }
  },
  Cw = 1e-4,
  Is = function(t) {
    var r = t.domain();
    if (!(!r || r.length <= 2)) {
      var n = r.length,
        i = t.range(),
        o = Math.min(i[0], i[1]) - Cw,
        a = Math.max(i[0], i[1]) + Cw,
        u = t(r[0]),
        s = t(r[n - 1]);
      (u < o || u > a || s < o || s > a) && t.domain([r[0], r[n - 1]])
    }
  },
  Gw = function(t, r) {
    if (!t) return null;
    for (var n = 0, i = t.length; n < i; n++)
      if (t[n].item === r) return t[n].position;
    return null
  },
  Kw = function(t, r) {
    if (!r || r.length !== 2 || !V(r[0]) || !V(r[1])) return t;
    var n = Math.min(r[0], r[1]),
      i = Math.max(r[0], r[1]),
      o = [t[0], t[1]];
    return (!V(t[0]) || t[0] < n) && (o[0] = n), (!V(t[1]) || t[1] > i) && (o[1] = i), o[0] > i && (o[0] = i), o[1] < n && (o[1] = n), o
  },
  QF = function(t) {
    var r = t.length;
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var o = 0, a = 0, u = 0; u < r; ++u) {
          var s = (0, Ms.default)(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
          s >= 0 ? (t[u][n][0] = o, t[u][n][1] = o + s, o = t[u][n][1]) : (t[u][n][0] = a, t[u][n][1] = a + s, a = t[u][n][1])
        }
  },
  eW = function(t) {
    var r = t.length;
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var o = 0, a = 0; a < r; ++a) {
          var u = (0, Ms.default)(t[a][n][1]) ? t[a][n][0] : t[a][n][1];
          u >= 0 ? (t[a][n][0] = o, t[a][n][1] = o + u, o = t[a][n][1]) : (t[a][n][0] = 0, t[a][n][1] = 0)
        }
  },
  tW = {
    sign: QF,
    expand: $c,
    none: _t,
    silhouette: Fc,
    wiggle: Wc,
    positive: eW
  },
  rW = function(t, r, n) {
    var i = r.map(function(u) {
        return u.props.dataKey
      }),
      o = tW[n],
      a = qc().keys(i).value(function(u, s) {
        return +je(u, s, 0)
      }).order(Wn).offset(o);
    return a(t)
  },
  Vw = function(t, r, n, i, o, a) {
    if (!t) return null;
    var u = a ? r.reverse() : r,
      s = {},
      l = u.reduce(function(c, p) {
        var h, g = (h = p.type) !== null && h !== void 0 && h.defaultProps ? ke(ke({}, p.type.defaultProps), p.props) : p.props,
          m = g.stackId,
          b = g.hide;
        if (b) return c;
        var w = g[n],
          A = c[w] || {
            hasStack: !1,
            stackGroups: {}
          };
        if (Se(m)) {
          var T = A.stackGroups[m] || {
            numericAxisId: n,
            cateAxisId: i,
            items: []
          };
          T.items.push(p), A.hasStack = !0, A.stackGroups[m] = T
        } else A.stackGroups[St("_stackId_")] = {
          numericAxisId: n,
          cateAxisId: i,
          items: [p]
        };
        return ke(ke({}, c), {}, vi({}, w, A))
      }, s),
      f = {};
    return Object.keys(l).reduce(function(c, p) {
      var h = l[p];
      if (h.hasStack) {
        var g = {};
        h.stackGroups = Object.keys(h.stackGroups).reduce(function(m, b) {
          var w = h.stackGroups[b];
          return ke(ke({}, m), {}, vi({}, b, {
            numericAxisId: n,
            cateAxisId: i,
            items: w.items,
            stackedData: rW(t, w.items, o)
          }))
        }, g)
      }
      return ke(ke({}, c), {}, vi({}, p, h))
    }, f)
  },
  Ns = function(t, r) {
    var n = r.realScaleType,
      i = r.type,
      o = r.tickCount,
      a = r.originalDomain,
      u = r.allowDecimals,
      s = n || r.scale;
    if (s !== "auto" && s !== "linear") return null;
    if (o && i === "number" && a && (a[0] === "auto" || a[1] === "auto")) {
      var l = t.domain();
      if (!l.length) return null;
      var f = jp(l, o, u);
      return t.domain([(0, ra.default)(f), (0, ta.default)(f)]), {
        niceTicks: f
      }
    }
    if (o && i === "number") {
      var c = t.domain(),
        p = kp(c, o, u);
      return {
        niceTicks: p
      }
    }
    return null
  };

function qp(e) {
  var t = e.axis,
    r = e.ticks,
    n = e.bandSize,
    i = e.entry,
    o = e.index,
    a = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !(0, vt.default)(i[t.dataKey])) {
      var u = In(r, "value", i[t.dataKey]);
      if (u) return u.coordinate + n / 2
    }
    return r[o] ? r[o].coordinate + n / 2 : null
  }
  var s = je(i, (0, vt.default)(a) ? t.dataKey : a);
  return (0, vt.default)(s) ? null : t.scale(s)
}
var $p = function(t) {
    var r = t.axis,
      n = t.ticks,
      i = t.offset,
      o = t.bandSize,
      a = t.entry,
      u = t.index;
    if (r.type === "category") return n[u] ? n[u].coordinate + i : null;
    var s = je(a, r.dataKey, r.domain[u]);
    return (0, vt.default)(s) ? null : r.scale(s) - o / 2 + i
  },
  Yw = function(t) {
    var r = t.numericAxis,
      n = r.scale.domain();
    if (r.type === "number") {
      var i = Math.min(n[0], n[1]),
        o = Math.max(n[0], n[1]);
      return i <= 0 && o >= 0 ? 0 : o < 0 ? o : i
    }
    return n[0]
  },
  Xw = function(t, r) {
    var n, i = (n = t.type) !== null && n !== void 0 && n.defaultProps ? ke(ke({}, t.type.defaultProps), t.props) : t.props,
      o = i.stackId;
    if (Se(o)) {
      var a = r[o];
      if (a) {
        var u = a.items.indexOf(t);
        return u >= 0 ? a.stackedData[u] : null
      }
    }
    return null
  },
  nW = function(t) {
    return t.reduce(function(r, n) {
      return [(0, ra.default)(n.concat([r[0]]).filter(V)), (0, ta.default)(n.concat([r[1]]).filter(V))]
    }, [1 / 0, -1 / 0])
  },
  Fp = function(t, r, n) {
    return Object.keys(t).reduce(function(i, o) {
      var a = t[o],
        u = a.stackedData,
        s = u.reduce(function(l, f) {
          var c = nW(f.slice(r, n + 1));
          return [Math.min(l[0], c[0]), Math.max(l[1], c[1])]
        }, [1 / 0, -1 / 0]);
      return [Math.min(s[0], i[0]), Math.max(s[1], i[1])]
    }, [1 / 0, -1 / 0]).map(function(i) {
      return i === 1 / 0 || i === -1 / 0 ? 0 : i
    })
  },
  Iw = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  Nw = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  Ds = function(t, r, n) {
    if ((0, gi.default)(t)) return t(r, n);
    if (!Array.isArray(t)) return r;
    var i = [];
    if (V(t[0])) i[0] = n ? t[0] : Math.min(t[0], r[0]);
    else if (Iw.test(t[0])) {
      var o = +Iw.exec(t[0])[1];
      i[0] = r[0] - o
    } else(0, gi.default)(t[0]) ? i[0] = t[0](r[0]) : i[0] = r[0];
    if (V(t[1])) i[1] = n ? t[1] : Math.max(t[1], r[1]);
    else if (Nw.test(t[1])) {
      var a = +Nw.exec(t[1])[1];
      i[1] = r[1] + a
    } else(0, gi.default)(t[1]) ? i[1] = t[1](r[1]) : i[1] = r[1];
    return i
  },
  xi = function(t, r, n) {
    if (t && t.scale && t.scale.bandwidth) {
      var i = t.scale.bandwidth();
      if (!n || i > 0) return i
    }
    if (t && r && r.length >= 2) {
      for (var o = (0, qw.default)(r, function(c) {
          return c.coordinate
        }), a = 1 / 0, u = 1, s = o.length; u < s; u++) {
        var l = o[u],
          f = o[u - 1];
        a = Math.min((l.coordinate || 0) - (f.coordinate || 0), a)
      }
      return a === 1 / 0 ? 0 : a
    }
    return n ? void 0 : 0
  },
  Wp = function(t, r, n) {
    return !t || !t.length || (0, Bw.default)(t, (0, Dp.default)(n, "type.defaultProps.domain")) ? r : t
  },
  Rs = function(t, r) {
    var n = t.type.defaultProps ? ke(ke({}, t.type.defaultProps), t.props) : t.props,
      i = n.dataKey,
      o = n.name,
      a = n.unit,
      u = n.formatter,
      s = n.tooltipType,
      l = n.chartType,
      f = n.hide;
    return ke(ke({}, Q(t, !1)), {}, {
      dataKey: i,
      unit: a,
      formatter: u,
      name: o || i,
      color: Qo(t),
      value: je(r, i),
      type: s,
      payload: r,
      chartType: l,
      hide: f
    })
  };

function ia(e) {
  "@babel/helpers - typeof";
  return ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ia(e)
}

function Zw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function gr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zw(Object(r), !0).forEach(function(n) {
      Qw(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Qw(e, t, r) {
  return t = iW(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function iW(e) {
  var t = oW(e, "string");
  return ia(t) == "symbol" ? t : t + ""
}

function oW(e, t) {
  if (ia(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ia(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function aW(e, t) {
  return cW(e) || lW(e, t) || sW(e, t) || uW()
}

function uW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function sW(e, t) {
  if (e) {
    if (typeof e == "string") return Jw(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Jw(e, t)
  }
}

function Jw(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function lW(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function cW(e) {
  if (Array.isArray(e)) return e
}
var oa = Math.PI / 180;
var pW = function(t) {
    return t * 180 / Math.PI
  },
  de = function(t, r, n, i) {
    return {
      x: t + Math.cos(-oa * i) * n,
      y: r + Math.sin(-oa * i) * n
    }
  },
  zp = function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2
  },
  rO = function(t, r, n, i, o) {
    var a = t.width,
      u = t.height,
      s = t.startAngle,
      l = t.endAngle,
      f = Ce(t.cx, a, a / 2),
      c = Ce(t.cy, u, u / 2),
      p = zp(a, u, n),
      h = Ce(t.innerRadius, p, 0),
      g = Ce(t.outerRadius, p, p * .8),
      m = Object.keys(r);
    return m.reduce(function(b, w) {
      var A = r[w],
        T = A.domain,
        E = A.reversed,
        y;
      if ((0, eO.default)(A.range)) i === "angleAxis" ? y = [s, l] : i === "radiusAxis" && (y = [h, g]), E && (y = [y[1], y[0]]);
      else {
        y = A.range;
        var v = y,
          j = aW(v, 2);
        s = j[0], l = j[1]
      }
      var M = Cs(A, o),
        N = M.realScaleType,
        B = M.scale;
      B.domain(T).range(y), Is(B);
      var $ = Ns(B, gr(gr({}, A), {}, {
          realScaleType: N
        })),
        R = gr(gr(gr({}, A), $), {}, {
          range: y,
          radius: g,
          realScaleType: N,
          scale: B,
          cx: f,
          cy: c,
          innerRadius: h,
          outerRadius: g,
          startAngle: s,
          endAngle: l
        });
      return gr(gr({}, b), {}, Qw({}, w, R))
    }, {})
  },
  dW = function(t, r) {
    var n = t.x,
      i = t.y,
      o = r.x,
      a = r.y;
    return Math.sqrt(Math.pow(n - o, 2) + Math.pow(i - a, 2))
  },
  mW = function(t, r) {
    var n = t.x,
      i = t.y,
      o = r.cx,
      a = r.cy,
      u = dW({
        x: n,
        y: i
      }, {
        x: o,
        y: a
      });
    if (u <= 0) return {
      radius: u
    };
    var s = (n - o) / u,
      l = Math.acos(s);
    return i > a && (l = 2 * Math.PI - l), {
      radius: u,
      angle: pW(l),
      angleInRadian: l
    }
  },
  hW = function(t) {
    var r = t.startAngle,
      n = t.endAngle,
      i = Math.floor(r / 360),
      o = Math.floor(n / 360),
      a = Math.min(i, o);
    return {
      startAngle: r - a * 360,
      endAngle: n - a * 360
    }
  },
  yW = function(t, r) {
    var n = r.startAngle,
      i = r.endAngle,
      o = Math.floor(n / 360),
      a = Math.floor(i / 360),
      u = Math.min(o, a);
    return t + u * 360
  },
  Hp = function(t, r) {
    var n = t.x,
      i = t.y,
      o = mW({
        x: n,
        y: i
      }, r),
      a = o.radius,
      u = o.angle,
      s = r.innerRadius,
      l = r.outerRadius;
    if (a < s || a > l) return !1;
    if (a === 0) return !0;
    var f = hW(r),
      c = f.startAngle,
      p = f.endAngle,
      h = u,
      g;
    if (c <= p) {
      for (; h > p;) h -= 360;
      for (; h < c;) h += 360;
      g = h >= c && h <= p
    } else {
      for (; h > c;) h -= 360;
      for (; h < p;) h += 360;
      g = h >= p && h <= c
    }
    return g ? gr(gr({}, r), {}, {
      radius: a,
      angle: yW(h, r)
    }) : null
  },
  Ls = function(t) {
    return !fW(t) && !(0, tO.default)(t) && typeof t != "boolean" ? t.className : ""
  };

function aa(e) {
  "@babel/helpers - typeof";
  return aa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, aa(e)
}
var vW = ["offset"];

function gW(e) {
  return OW(e) || wW(e) || xW(e) || bW()
}

function bW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function xW(e, t) {
  if (e) {
    if (typeof e == "string") return Up(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Up(e, t)
  }
}

function wW(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function OW(e) {
  if (Array.isArray(e)) return Up(e)
}

function Up(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function SW(e, t) {
  if (e == null) return {};
  var r = AW(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function AW(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function nO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Le(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nO(Object(r), !0).forEach(function(n) {
      PW(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function PW(e, t, r) {
  return t = TW(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function TW(e) {
  var t = _W(e, "string");
  return aa(t) == "symbol" ? t : t + ""
}

function _W(e, t) {
  if (aa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (aa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function ua() {
  return ua = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ua.apply(this, arguments)
}
var jW = function(t) {
    var r = t.value,
      n = t.formatter,
      i = (0, sa.default)(t.children) ? r : t.children;
    return (0, la.default)(n) ? n(i) : i
  },
  kW = function(t, r) {
    var n = Me(r - t),
      i = Math.min(Math.abs(r - t), 360);
    return n * i
  },
  MW = function(t, r, n) {
    var i = t.position,
      o = t.viewBox,
      a = t.offset,
      u = t.className,
      s = o,
      l = s.cx,
      f = s.cy,
      c = s.innerRadius,
      p = s.outerRadius,
      h = s.startAngle,
      g = s.endAngle,
      m = s.clockWise,
      b = (c + p) / 2,
      w = kW(h, g),
      A = w >= 0 ? 1 : -1,
      T, E;
    i === "insideStart" ? (T = h + A * a, E = m) : i === "insideEnd" ? (T = g - A * a, E = !m) : i === "end" && (T = g + A * a, E = m), E = w <= 0 ? E : !E;
    var y = de(l, f, b, T),
      v = de(l, f, b, T + (E ? 1 : -1) * 359),
      j = "M".concat(y.x, ",").concat(y.y, `
    A`).concat(b, ",").concat(b, ",0,1,").concat(E ? 0 : 1, `,
    `).concat(v.x, ",").concat(v.y),
      M = (0, sa.default)(t.id) ? St("recharts-radial-line-") : t.id;
    return ur.createElement("text", ua({}, n, {
      dominantBaseline: "central",
      className: ne("recharts-radial-bar-label", u)
    }), ur.createElement("defs", null, ur.createElement("path", {
      id: M,
      d: j
    })), ur.createElement("textPath", {
      xlinkHref: "#".concat(M)
    }, r))
  },
  CW = function(t) {
    var r = t.viewBox,
      n = t.offset,
      i = t.position,
      o = r,
      a = o.cx,
      u = o.cy,
      s = o.innerRadius,
      l = o.outerRadius,
      f = o.startAngle,
      c = o.endAngle,
      p = (f + c) / 2;
    if (i === "outside") {
      var h = de(a, u, l + n, p),
        g = h.x,
        m = h.y;
      return {
        x: g,
        y: m,
        textAnchor: g >= a ? "start" : "end",
        verticalAnchor: "middle"
      }
    }
    if (i === "center") return {
      x: a,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
    if (i === "centerTop") return {
      x: a,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
    if (i === "centerBottom") return {
      x: a,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
    var b = (s + l) / 2,
      w = de(a, u, b, p),
      A = w.x,
      T = w.y;
    return {
      x: A,
      y: T,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }
  },
  IW = function(t) {
    var r = t.viewBox,
      n = t.parentViewBox,
      i = t.offset,
      o = t.position,
      a = r,
      u = a.x,
      s = a.y,
      l = a.width,
      f = a.height,
      c = f >= 0 ? 1 : -1,
      p = c * i,
      h = c > 0 ? "end" : "start",
      g = c > 0 ? "start" : "end",
      m = l >= 0 ? 1 : -1,
      b = m * i,
      w = m > 0 ? "end" : "start",
      A = m > 0 ? "start" : "end";
    if (o === "top") {
      var T = {
        x: u + l / 2,
        y: s - c * i,
        textAnchor: "middle",
        verticalAnchor: h
      };
      return Le(Le({}, T), n ? {
        height: Math.max(s - n.y, 0),
        width: l
      } : {})
    }
    if (o === "bottom") {
      var E = {
        x: u + l / 2,
        y: s + f + p,
        textAnchor: "middle",
        verticalAnchor: g
      };
      return Le(Le({}, E), n ? {
        height: Math.max(n.y + n.height - (s + f), 0),
        width: l
      } : {})
    }
    if (o === "left") {
      var y = {
        x: u - b,
        y: s + f / 2,
        textAnchor: w,
        verticalAnchor: "middle"
      };
      return Le(Le({}, y), n ? {
        width: Math.max(y.x - n.x, 0),
        height: f
      } : {})
    }
    if (o === "right") {
      var v = {
        x: u + l + b,
        y: s + f / 2,
        textAnchor: A,
        verticalAnchor: "middle"
      };
      return Le(Le({}, v), n ? {
        width: Math.max(n.x + n.width - v.x, 0),
        height: f
      } : {})
    }
    var j = n ? {
      width: l,
      height: f
    } : {};
    return o === "insideLeft" ? Le({
      x: u + b,
      y: s + f / 2,
      textAnchor: A,
      verticalAnchor: "middle"
    }, j) : o === "insideRight" ? Le({
      x: u + l - b,
      y: s + f / 2,
      textAnchor: w,
      verticalAnchor: "middle"
    }, j) : o === "insideTop" ? Le({
      x: u + l / 2,
      y: s + p,
      textAnchor: "middle",
      verticalAnchor: g
    }, j) : o === "insideBottom" ? Le({
      x: u + l / 2,
      y: s + f - p,
      textAnchor: "middle",
      verticalAnchor: h
    }, j) : o === "insideTopLeft" ? Le({
      x: u + b,
      y: s + p,
      textAnchor: A,
      verticalAnchor: g
    }, j) : o === "insideTopRight" ? Le({
      x: u + l - b,
      y: s + p,
      textAnchor: w,
      verticalAnchor: g
    }, j) : o === "insideBottomLeft" ? Le({
      x: u + b,
      y: s + f - p,
      textAnchor: A,
      verticalAnchor: h
    }, j) : o === "insideBottomRight" ? Le({
      x: u + l - b,
      y: s + f - p,
      textAnchor: w,
      verticalAnchor: h
    }, j) : (0, Kp.default)(o) && (V(o.x) || cr(o.x)) && (V(o.y) || cr(o.y)) ? Le({
      x: u + Ce(o.x, l),
      y: s + Ce(o.y, f),
      textAnchor: "end",
      verticalAnchor: "end"
    }, j) : Le({
      x: u + l / 2,
      y: s + f / 2,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }, j)
  },
  NW = function(t) {
    return "cx" in t && V(t.cx)
  };

function Te(e) {
  var t = e.offset,
    r = t === void 0 ? 5 : t,
    n = SW(e, vW),
    i = Le({
      offset: r
    }, n),
    o = i.viewBox,
    a = i.position,
    u = i.value,
    s = i.children,
    l = i.content,
    f = i.className,
    c = f === void 0 ? "" : f,
    p = i.textBreakAll;
  if (!o || (0, sa.default)(u) && (0, sa.default)(s) && !Bs(l) && !(0, la.default)(l)) return null;
  if (Bs(l)) return Gp(l, i);
  var h;
  if ((0, la.default)(l)) {
    if (h = EW(l, i), Bs(h)) return h
  } else h = jW(i);
  var g = NW(o),
    m = Q(i, !0);
  if (g && (a === "insideStart" || a === "insideEnd" || a === "end")) return MW(i, h, m);
  var b = g ? CW(i) : IW(i);
  return ur.createElement(dt, ua({
    className: ne("recharts-label", c)
  }, m, b, {
    breakAll: p
  }), h)
}
Te.displayName = "Label";
var iO = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.angle,
      o = t.startAngle,
      a = t.endAngle,
      u = t.r,
      s = t.radius,
      l = t.innerRadius,
      f = t.outerRadius,
      c = t.x,
      p = t.y,
      h = t.top,
      g = t.left,
      m = t.width,
      b = t.height,
      w = t.clockWise,
      A = t.labelViewBox;
    if (A) return A;
    if (V(m) && V(b)) {
      if (V(c) && V(p)) return {
        x: c,
        y: p,
        width: m,
        height: b
      };
      if (V(h) && V(g)) return {
        x: h,
        y: g,
        width: m,
        height: b
      }
    }
    return V(c) && V(p) ? {
      x: c,
      y: p,
      width: 0,
      height: 0
    } : V(r) && V(n) ? {
      cx: r,
      cy: n,
      startAngle: o || i || 0,
      endAngle: a || i || 0,
      innerRadius: l || 0,
      outerRadius: f || s || u || 0,
      clockWise: w
    } : t.viewBox ? t.viewBox : {}
  },
  DW = function(t, r) {
    return t ? t === !0 ? ur.createElement(Te, {
      key: "label-implicit",
      viewBox: r
    }) : Se(t) ? ur.createElement(Te, {
      key: "label-implicit",
      viewBox: r,
      value: t
    }) : Bs(t) ? t.type === Te ? Gp(t, {
      key: "label-implicit",
      viewBox: r
    }) : ur.createElement(Te, {
      key: "label-implicit",
      content: t,
      viewBox: r
    }) : (0, la.default)(t) ? ur.createElement(Te, {
      key: "label-implicit",
      content: t,
      viewBox: r
    }) : (0, Kp.default)(t) ? ur.createElement(Te, ua({
      viewBox: r
    }, t, {
      key: "label-implicit"
    })) : null : null
  },
  RW = function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!t || !t.children && n && !t.label) return null;
    var i = t.children,
      o = iO(t),
      a = Ie(i, Te).map(function(s, l) {
        return Gp(s, {
          viewBox: r || o,
          key: "label-".concat(l)
        })
      });
    if (!n) return a;
    var u = DW(t.label, r || o);
    return [u].concat(gW(a))
  };
Te.parseViewBox = iO;
Te.renderCallByParent = RW;
var qs = J(ft()),
  cO = J(wt()),
  fO = J(_e()),
  pO = J(aO());
import wi, {
  cloneElement as YW
} from "./react-shim-eraudit.js";

function ca(e) {
  "@babel/helpers - typeof";
  return ca = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ca(e)
}
var BW = ["valueAccessor"],
  qW = ["data", "dataKey", "clockWise", "id", "textBreakAll"];

function $W(e) {
  return HW(e) || zW(e) || WW(e) || FW()
}

function FW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function WW(e, t) {
  if (e) {
    if (typeof e == "string") return Vp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Vp(e, t)
  }
}

function zW(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function HW(e) {
  if (Array.isArray(e)) return Vp(e)
}

function Vp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function $s() {
  return $s = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, $s.apply(this, arguments)
}

function uO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function sO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uO(Object(r), !0).forEach(function(n) {
      UW(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : uO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function UW(e, t, r) {
  return t = GW(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function GW(e) {
  var t = KW(e, "string");
  return ca(t) == "symbol" ? t : t + ""
}

function KW(e, t) {
  if (ca(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ca(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function lO(e, t) {
  if (e == null) return {};
  var r = VW(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function VW(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var XW = function(t) {
  return Array.isArray(t.value) ? (0, pO.default)(t.value) : t.value
};

function Ne(e) {
  var t = e.valueAccessor,
    r = t === void 0 ? XW : t,
    n = lO(e, BW),
    i = n.data,
    o = n.dataKey,
    a = n.clockWise,
    u = n.id,
    s = n.textBreakAll,
    l = lO(n, qW);
  return !i || !i.length ? null : wi.createElement(le, {
    className: "recharts-label-list"
  }, i.map(function(f, c) {
    var p = (0, qs.default)(o) ? r(f, c) : je(f && f.payload, o),
      h = (0, qs.default)(u) ? {} : {
        id: "".concat(u, "-").concat(c)
      };
    return wi.createElement(Te, $s({}, Q(f, !0), l, h, {
      parentViewBox: f.parentViewBox,
      value: p,
      textBreakAll: s,
      viewBox: Te.parseViewBox((0, qs.default)(a) ? f : sO(sO({}, f), {}, {
        clockWise: a
      })),
      key: "label-".concat(c),
      index: c
    }))
  }))
}
Ne.displayName = "LabelList";

function ZW(e, t) {
  return e ? e === !0 ? wi.createElement(Ne, {
    key: "labelList-implicit",
    data: t
  }) : wi.isValidElement(e) || (0, fO.default)(e) ? wi.createElement(Ne, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : (0, cO.default)(e) ? wi.createElement(Ne, $s({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null
}

function JW(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label) return null;
  var n = e.children,
    i = Ie(n, Ne).map(function(a, u) {
      return YW(a, {
        data: t,
        key: "labelList-".concat(u)
      })
    });
  if (!r) return i;
  var o = ZW(e.label, t);
  return [o].concat($W(i))
}
Ne.renderCallByParent = JW;
import rz from "./react-shim-eraudit.js";

function fa(e) {
  "@babel/helpers - typeof";
  return fa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, fa(e)
}

function Yp() {
  return Yp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Yp.apply(this, arguments)
}

function dO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function mO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dO(Object(r), !0).forEach(function(n) {
      QW(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function QW(e, t, r) {
  return t = ez(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function ez(e) {
  var t = tz(e, "string");
  return fa(t) == "symbol" ? t : t + ""
}

function tz(e, t) {
  if (fa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (fa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var nz = function(t, r) {
    var n = Me(r - t),
      i = Math.min(Math.abs(r - t), 359.999);
    return n * i
  },
  Fs = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.radius,
      o = t.angle,
      a = t.sign,
      u = t.isExternal,
      s = t.cornerRadius,
      l = t.cornerIsExternal,
      f = s * (u ? 1 : -1) + i,
      c = Math.asin(s / f) / oa,
      p = l ? o : o + a * c,
      h = de(r, n, f, p),
      g = de(r, n, i, p),
      m = l ? o - a * c : o,
      b = de(r, n, f * Math.cos(c * oa), m);
    return {
      center: h,
      circleTangency: g,
      lineTangency: b,
      theta: c
    }
  },
  hO = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      o = t.outerRadius,
      a = t.startAngle,
      u = t.endAngle,
      s = nz(a, u),
      l = a + s,
      f = de(r, n, o, a),
      c = de(r, n, o, l),
      p = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(o, ",").concat(o, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(a > l), `,
    `).concat(c.x, ",").concat(c.y, `
  `);
    if (i > 0) {
      var h = de(r, n, i, a),
        g = de(r, n, i, l);
      p += "L ".concat(g.x, ",").concat(g.y, `
            A `).concat(i, ",").concat(i, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(a <= l), `,
            `).concat(h.x, ",").concat(h.y, " Z")
    } else p += "L ".concat(r, ",").concat(n, " Z");
    return p
  },
  iz = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      o = t.outerRadius,
      a = t.cornerRadius,
      u = t.forceCornerRadius,
      s = t.cornerIsExternal,
      l = t.startAngle,
      f = t.endAngle,
      c = Me(f - l),
      p = Fs({
        cx: r,
        cy: n,
        radius: o,
        angle: l,
        sign: c,
        cornerRadius: a,
        cornerIsExternal: s
      }),
      h = p.circleTangency,
      g = p.lineTangency,
      m = p.theta,
      b = Fs({
        cx: r,
        cy: n,
        radius: o,
        angle: f,
        sign: -c,
        cornerRadius: a,
        cornerIsExternal: s
      }),
      w = b.circleTangency,
      A = b.lineTangency,
      T = b.theta,
      E = s ? Math.abs(l - f) : Math.abs(l - f) - m - T;
    if (E < 0) return u ? "M ".concat(g.x, ",").concat(g.y, `
        a`).concat(a, ",").concat(a, ",0,0,1,").concat(a * 2, `,0
        a`).concat(a, ",").concat(a, ",0,0,1,").concat(-a * 2, `,0
      `) : hO({
      cx: r,
      cy: n,
      innerRadius: i,
      outerRadius: o,
      startAngle: l,
      endAngle: f
    });
    var y = "M ".concat(g.x, ",").concat(g.y, `
    A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(h.x, ",").concat(h.y, `
    A`).concat(o, ",").concat(o, ",0,").concat(+(E > 180), ",").concat(+(c < 0), ",").concat(w.x, ",").concat(w.y, `
    A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(A.x, ",").concat(A.y, `
  `);
    if (i > 0) {
      var v = Fs({
          cx: r,
          cy: n,
          radius: i,
          angle: l,
          sign: c,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s
        }),
        j = v.circleTangency,
        M = v.lineTangency,
        N = v.theta,
        B = Fs({
          cx: r,
          cy: n,
          radius: i,
          angle: f,
          sign: -c,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s
        }),
        $ = B.circleTangency,
        R = B.lineTangency,
        z = B.theta,
        H = s ? Math.abs(l - f) : Math.abs(l - f) - N - z;
      if (H < 0 && a === 0) return "".concat(y, "L").concat(r, ",").concat(n, "Z");
      y += "L".concat(R.x, ",").concat(R.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat($.x, ",").concat($.y, `
      A`).concat(i, ",").concat(i, ",0,").concat(+(H > 180), ",").concat(+(c > 0), ",").concat(j.x, ",").concat(j.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(M.x, ",").concat(M.y, "Z")
    } else y += "L".concat(r, ",").concat(n, "Z");
    return y
  },
  oz = {
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
  Ws = function(t) {
    var r = mO(mO({}, oz), t),
      n = r.cx,
      i = r.cy,
      o = r.innerRadius,
      a = r.outerRadius,
      u = r.cornerRadius,
      s = r.forceCornerRadius,
      l = r.cornerIsExternal,
      f = r.startAngle,
      c = r.endAngle,
      p = r.className;
    if (a < o || f === c) return null;
    var h = ne("recharts-sector", p),
      g = a - o,
      m = Ce(u, g, 0, !0),
      b;
    return m > 0 && Math.abs(f - c) < 360 ? b = iz({
      cx: n,
      cy: i,
      innerRadius: o,
      outerRadius: a,
      cornerRadius: Math.min(m, g / 2),
      forceCornerRadius: s,
      cornerIsExternal: l,
      startAngle: f,
      endAngle: c
    }) : b = hO({
      cx: n,
      cy: i,
      innerRadius: o,
      outerRadius: a,
      startAngle: f,
      endAngle: c
    }), rz.createElement("path", Yp({}, Q(r, !0), {
      className: h,
      d: b,
      role: "img"
    }))
  };
import * as bO from "./react-shim-eraudit.js";
var xO = J(hu()),
  wO = J(_e());

function ma(e) {
  "@babel/helpers - typeof";
  return ma = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ma(e)
}

function Xp() {
  return Xp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Xp.apply(this, arguments)
}

function yO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function vO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yO(Object(r), !0).forEach(function(n) {
      az(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function az(e, t, r) {
  return t = uz(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function uz(e) {
  var t = sz(e, "string");
  return ma(t) == "symbol" ? t : t + ""
}

function sz(e, t) {
  if (ma(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ma(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var gO = {
    curveBasisClosed: jc,
    curveBasisOpen: kc,
    curveBasis: Ec,
    curveBumpX: gc,
    curveBumpY: bc,
    curveLinearClosed: Mc,
    curveLinear: Pr,
    curveMonotoneX: Ic,
    curveMonotoneY: Nc,
    curveNatural: Dc,
    curveStep: Rc,
    curveStepAfter: Bc,
    curveStepBefore: Lc
  },
  zs = function(t) {
    return t.x === +t.x && t.y === +t.y
  },
  pa = function(t) {
    return t.x
  },
  da = function(t) {
    return t.y
  },
  lz = function(t, r) {
    if ((0, wO.default)(t)) return t;
    var n = "curve".concat((0, xO.default)(t));
    return (n === "curveMonotone" || n === "curveBump") && r ? gO["".concat(n).concat(r === "vertical" ? "Y" : "X")] : gO[n] || Pr
  },
  cz = function(t) {
    var r = t.type,
      n = r === void 0 ? "linear" : r,
      i = t.points,
      o = i === void 0 ? [] : i,
      a = t.baseLine,
      u = t.layout,
      s = t.connectNulls,
      l = s === void 0 ? !1 : s,
      f = lz(n, u),
      c = l ? o.filter(function(m) {
        return zs(m)
      }) : o,
      p;
    if (Array.isArray(a)) {
      var h = l ? a.filter(function(m) {
          return zs(m)
        }) : a,
        g = c.map(function(m, b) {
          return vO(vO({}, m), {}, {
            base: h[b]
          })
        });
      return u === "vertical" ? p = Bn().y(da).x1(pa).x0(function(m) {
        return m.base.x
      }) : p = Bn().x(pa).y1(da).y0(function(m) {
        return m.base.y
      }), p.defined(zs).curve(f), p(g)
    }
    return u === "vertical" && V(a) ? p = Bn().y(da).x1(pa).x0(a) : V(a) ? p = Bn().x(pa).y1(da).y0(a) : p = co().x(pa).y(da), p.defined(zs).curve(f), p(c)
  },
  dn = function(t) {
    var r = t.className,
      n = t.points,
      i = t.path,
      o = t.pathRef;
    if ((!n || !n.length) && !i) return null;
    var a = n && n.length ? cz(t) : i;
    return bO.createElement("path", Xp({}, Q(t, !1), Wr(t), {
      className: ne("recharts-curve", r),
      d: a,
      ref: o
    }))
  };
import Zs, {
  useEffect as Z3,
  useRef as J3,
  useState as Q3
} from "./react-shim-eraudit.js";
var ye = J(jO());
import $3, {
  PureComponent as F3,
  cloneElement as W3,
  Children as ad
} from "./react-shim-eraudit.js";
var {
  getOwnPropertyNames: dz,
  getOwnPropertySymbols: mz
} = Object, {
  hasOwnProperty: hz
} = Object.prototype;

function Zp(e, t) {
  return function(n, i, o) {
    return e(n, i, o) && t(n, i, o)
  }
}

function Hs(e) {
  return function(r, n, i) {
    if (!r || !n || typeof r != "object" || typeof n != "object") return e(r, n, i);
    let {
      cache: o
    } = i, a = o.get(r), u = o.get(n);
    if (a && u) return a === n && u === r;
    o.set(r, n), o.set(n, r);
    let s = e(r, n, i);
    return o.delete(r), o.delete(n), s
  }
}

function yz(e) {
  return e?.[Symbol.toStringTag]
}

function kO(e) {
  return dz(e).concat(mz(e))
}
var vz = Object.hasOwn || ((e, t) => hz.call(e, t));

function mn(e, t) {
  return e === t || !e && !t && e !== e && t !== t
}
var gz = "__v",
  bz = "__o",
  xz = "_owner",
  {
    getOwnPropertyDescriptor: MO,
    keys: CO
  } = Object;

function wz(e, t) {
  return e.byteLength === t.byteLength && Us(new Uint8Array(e), new Uint8Array(t))
}

function Oz(e, t, r) {
  let n = e.length;
  if (t.length !== n) return !1;
  for (; n-- > 0;)
    if (!r.equals(e[n], t[n], n, n, e, t, r)) return !1;
  return !0
}

function Sz(e, t) {
  return e.byteLength === t.byteLength && Us(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength))
}

function Az(e, t) {
  return mn(e.getTime(), t.getTime())
}

function Pz(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack
}

function Tz(e, t) {
  return e === t
}

function IO(e, t, r) {
  let n = e.size;
  if (n !== t.size) return !1;
  if (!n) return !0;
  let i = new Array(n),
    o = e.entries(),
    a, u, s = 0;
  for (;
    (a = o.next()) && !a.done;) {
    let l = t.entries(),
      f = !1,
      c = 0;
    for (;
      (u = l.next()) && !u.done;) {
      if (i[c]) {
        c++;
        continue
      }
      let p = a.value,
        h = u.value;
      if (r.equals(p[0], h[0], s, c, e, t, r) && r.equals(p[1], h[1], p[0], h[0], e, t, r)) {
        f = i[c] = !0;
        break
      }
      c++
    }
    if (!f) return !1;
    s++
  }
  return !0
}
var _z = mn;

function Ez(e, t, r) {
  let n = CO(e),
    i = n.length;
  if (CO(t).length !== i) return !1;
  for (; i-- > 0;)
    if (!DO(e, t, r, n[i])) return !1;
  return !0
}

function ha(e, t, r) {
  let n = kO(e),
    i = n.length;
  if (kO(t).length !== i) return !1;
  let o, a, u;
  for (; i-- > 0;)
    if (o = n[i], !DO(e, t, r, o) || (a = MO(e, o), u = MO(t, o), (a || u) && (!a || !u || a.configurable !== u.configurable || a.enumerable !== u.enumerable || a.writable !== u.writable))) return !1;
  return !0
}

function jz(e, t) {
  return mn(e.valueOf(), t.valueOf())
}

function kz(e, t) {
  return e.source === t.source && e.flags === t.flags
}

function NO(e, t, r) {
  let n = e.size;
  if (n !== t.size) return !1;
  if (!n) return !0;
  let i = new Array(n),
    o = e.values(),
    a, u;
  for (;
    (a = o.next()) && !a.done;) {
    let s = t.values(),
      l = !1,
      f = 0;
    for (;
      (u = s.next()) && !u.done;) {
      if (!i[f] && r.equals(a.value, u.value, a.value, u.value, e, t, r)) {
        l = i[f] = !0;
        break
      }
      f++
    }
    if (!l) return !1
  }
  return !0
}

function Us(e, t) {
  let r = e.byteLength;
  if (t.byteLength !== r || e.byteOffset !== t.byteOffset) return !1;
  for (; r-- > 0;)
    if (e[r] !== t[r]) return !1;
  return !0
}

function Mz(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password
}

function DO(e, t, r, n) {
  return (n === xz || n === bz || n === gz) && (e.$$typeof || t.$$typeof) ? !0 : vz(t, n) && r.equals(e[n], t[n], n, n, e, t, r)
}
var Cz = "[object ArrayBuffer]",
  Iz = "[object Arguments]",
  Nz = "[object Boolean]",
  Dz = "[object DataView]",
  Rz = "[object Date]",
  Lz = "[object Error]",
  Bz = "[object Map]",
  qz = "[object Number]",
  $z = "[object Object]",
  Fz = "[object RegExp]",
  Wz = "[object Set]",
  zz = "[object String]",
  Hz = {
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
  Uz = "[object URL]",
  Gz = Object.prototype.toString;

function Kz({
  areArrayBuffersEqual: e,
  areArraysEqual: t,
  areDataViewsEqual: r,
  areDatesEqual: n,
  areErrorsEqual: i,
  areFunctionsEqual: o,
  areMapsEqual: a,
  areNumbersEqual: u,
  areObjectsEqual: s,
  arePrimitiveWrappersEqual: l,
  areRegExpsEqual: f,
  areSetsEqual: c,
  areTypedArraysEqual: p,
  areUrlsEqual: h,
  unknownTagComparators: g
}) {
  return function(b, w, A) {
    if (b === w) return !0;
    if (b == null || w == null) return !1;
    let T = typeof b;
    if (T !== typeof w) return !1;
    if (T !== "object") return T === "number" ? u(b, w, A) : T === "function" ? o(b, w, A) : !1;
    let E = b.constructor;
    if (E !== w.constructor) return !1;
    if (E === Object) return s(b, w, A);
    if (Array.isArray(b)) return t(b, w, A);
    if (E === Date) return n(b, w, A);
    if (E === RegExp) return f(b, w, A);
    if (E === Map) return a(b, w, A);
    if (E === Set) return c(b, w, A);
    let y = Gz.call(b);
    if (y === Rz) return n(b, w, A);
    if (y === Fz) return f(b, w, A);
    if (y === Bz) return a(b, w, A);
    if (y === Wz) return c(b, w, A);
    if (y === $z) return typeof b.then != "function" && typeof w.then != "function" && s(b, w, A);
    if (y === Uz) return h(b, w, A);
    if (y === Lz) return i(b, w, A);
    if (y === Iz) return s(b, w, A);
    if (Hz[y]) return p(b, w, A);
    if (y === Cz) return e(b, w, A);
    if (y === Dz) return r(b, w, A);
    if (y === Nz || y === qz || y === zz) return l(b, w, A);
    if (g) {
      let v = g[y];
      if (!v) {
        let j = yz(b);
        j && (v = g[j])
      }
      if (v) return v(b, w, A)
    }
    return !1
  }
}

function Vz({
  circular: e,
  createCustomConfig: t,
  strict: r
}) {
  let n = {
    areArrayBuffersEqual: wz,
    areArraysEqual: r ? ha : Oz,
    areDataViewsEqual: Sz,
    areDatesEqual: Az,
    areErrorsEqual: Pz,
    areFunctionsEqual: Tz,
    areMapsEqual: r ? Zp(IO, ha) : IO,
    areNumbersEqual: _z,
    areObjectsEqual: r ? ha : Ez,
    arePrimitiveWrappersEqual: jz,
    areRegExpsEqual: kz,
    areSetsEqual: r ? Zp(NO, ha) : NO,
    areTypedArraysEqual: r ? Zp(Us, ha) : Us,
    areUrlsEqual: Mz,
    unknownTagComparators: void 0
  };
  if (t && (n = Object.assign({}, n, t(n))), e) {
    let i = Hs(n.areArraysEqual),
      o = Hs(n.areMapsEqual),
      a = Hs(n.areObjectsEqual),
      u = Hs(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: i,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: u
    })
  }
  return n
}

function Yz(e) {
  return function(t, r, n, i, o, a, u) {
    return e(t, r, u)
  }
}

function Xz({
  circular: e,
  comparator: t,
  createState: r,
  equals: n,
  strict: i
}) {
  if (r) return function(u, s) {
    let {
      cache: l = e ? new WeakMap : void 0,
      meta: f
    } = r();
    return t(u, s, {
      cache: l,
      equals: n,
      meta: f,
      strict: i
    })
  };
  if (e) return function(u, s) {
    return t(u, s, {
      cache: new WeakMap,
      equals: n,
      meta: void 0,
      strict: i
    })
  };
  let o = {
    cache: void 0,
    equals: n,
    meta: void 0,
    strict: i
  };
  return function(u, s) {
    return t(u, s, o)
  }
}
var RO = Dr(),
  Are = Dr({
    strict: !0
  }),
  Pre = Dr({
    circular: !0
  }),
  Tre = Dr({
    circular: !0,
    strict: !0
  }),
  _re = Dr({
    createInternalComparator: () => mn
  }),
  Ere = Dr({
    strict: !0,
    createInternalComparator: () => mn
  }),
  jre = Dr({
    circular: !0,
    createInternalComparator: () => mn
  }),
  kre = Dr({
    circular: !0,
    createInternalComparator: () => mn,
    strict: !0
  });

function Dr(e = {}) {
  let {
    circular: t = !1,
    createInternalComparator: r,
    createState: n,
    strict: i = !1
  } = e, o = Vz(e), a = Kz(o), u = r ? r(a) : Yz(a);
  return Xz({
    circular: t,
    comparator: a,
    createState: n,
    equals: u,
    strict: i
  })
}

function Zz(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e)
}

function Gs(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    r = -1,
    n = function i(o) {
      r < 0 && (r = o), o - r > t ? (e(o), r = -1) : Zz(i)
    };
  requestAnimationFrame(n)
}

function Jp(e) {
  "@babel/helpers - typeof";
  return Jp = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Jp(e)
}

function Jz(e) {
  return r3(e) || t3(e) || e3(e) || Qz()
}

function Qz() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function e3(e, t) {
  if (e) {
    if (typeof e == "string") return LO(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return LO(e, t)
  }
}

function LO(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function t3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function r3(e) {
  if (Array.isArray(e)) return e
}

function Qp() {
  var e = {},
    t = function() {
      return null
    },
    r = !1,
    n = function i(o) {
      if (!r) {
        if (Array.isArray(o)) {
          if (!o.length) return;
          var a = o,
            u = Jz(a),
            s = u[0],
            l = u.slice(1);
          if (typeof s == "number") {
            Gs(i.bind(null, l), s);
            return
          }
          i(s), Gs(i.bind(null, l));
          return
        }
        Jp(o) === "object" && (e = o, t(e)), typeof o == "function" && o()
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
      return t = o,
        function() {
          t = function() {
            return null
          }
        }
    }
  }
}

function ya(e) {
  "@babel/helpers - typeof";
  return ya = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ya(e)
}

function BO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function qO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? BO(Object(r), !0).forEach(function(n) {
      $O(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : BO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function $O(e, t, r) {
  return t = n3(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function n3(e) {
  var t = i3(e, "string");
  return ya(t) === "symbol" ? t : String(t)
}

function i3(e, t) {
  if (ya(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ya(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var FO = function(t, r) {
    return [Object.keys(t), Object.keys(r)].reduce(function(n, i) {
      return n.filter(function(o) {
        return i.includes(o)
      })
    })
  },
  WO = function(t) {
    return t
  },
  o3 = function(t) {
    return t.replace(/([A-Z])/g, function(r) {
      return "-".concat(r.toLowerCase())
    })
  };
var Oi = function(t, r) {
    return Object.keys(r).reduce(function(n, i) {
      return qO(qO({}, n), {}, $O({}, i, t(i, r[i])))
    }, {})
  },
  ed = function(t, r, n) {
    return t.map(function(i) {
      return "".concat(o3(i), " ").concat(r, "ms ").concat(n)
    }).join(",")
  },
  a3 = !1,
  va = function(t, r, n, i, o, a, u, s) {
    if (a3 && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var l = [n, i, o, a, u, s],
          f = 0;
        console.warn(r.replace(/%s/g, function() {
          return l[f++]
        }))
      }
  };

function u3(e, t) {
  return c3(e) || l3(e, t) || UO(e, t) || s3()
}

function s3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function l3(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function c3(e) {
  if (Array.isArray(e)) return e
}

function f3(e) {
  return m3(e) || d3(e) || UO(e) || p3()
}

function p3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function UO(e, t) {
  if (e) {
    if (typeof e == "string") return td(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return td(e, t)
  }
}

function d3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function m3(e) {
  if (Array.isArray(e)) return td(e)
}

function td(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var Ks = 1e-4,
  GO = function(t, r) {
    return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1]
  },
  KO = function(t, r) {
    return t.map(function(n, i) {
      return n * Math.pow(r, i)
    }).reduce(function(n, i) {
      return n + i
    })
  },
  zO = function(t, r) {
    return function(n) {
      var i = GO(t, r);
      return KO(i, n)
    }
  },
  h3 = function(t, r) {
    return function(n) {
      var i = GO(t, r),
        o = [].concat(f3(i.map(function(a, u) {
          return a * u
        }).slice(1)), [0]);
      return KO(o, n)
    }
  },
  HO = function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
    var i = r[0],
      o = r[1],
      a = r[2],
      u = r[3];
    if (r.length === 1) switch (r[0]) {
      case "linear":
        i = 0, o = 0, a = 1, u = 1;
        break;
      case "ease":
        i = .25, o = .1, a = .25, u = 1;
        break;
      case "ease-in":
        i = .42, o = 0, a = 1, u = 1;
        break;
      case "ease-out":
        i = .42, o = 0, a = .58, u = 1;
        break;
      case "ease-in-out":
        i = 0, o = 0, a = .58, u = 1;
        break;
      default: {
        var s = r[0].split("(");
        if (s[0] === "cubic-bezier" && s[1].split(")")[0].split(",").length === 4) {
          var l = s[1].split(")")[0].split(",").map(function(b) {
              return parseFloat(b)
            }),
            f = u3(l, 4);
          i = f[0], o = f[1], a = f[2], u = f[3]
        } else va(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r)
      }
    }
    va([i, a, o, u].every(function(b) {
      return typeof b == "number" && b >= 0 && b <= 1
    }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
    var c = zO(i, a),
      p = zO(o, u),
      h = h3(i, a),
      g = function(w) {
        return w > 1 ? 1 : w < 0 ? 0 : w
      },
      m = function(w) {
        for (var A = w > 1 ? 1 : w, T = A, E = 0; E < 8; ++E) {
          var y = c(T) - A,
            v = h(T);
          if (Math.abs(y - A) < Ks || v < Ks) return p(T);
          T = g(T - y / v)
        }
        return p(T)
      };
    return m.isStepper = !1, m
  },
  y3 = function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = t.stiff,
      n = r === void 0 ? 100 : r,
      i = t.damping,
      o = i === void 0 ? 8 : i,
      a = t.dt,
      u = a === void 0 ? 17 : a,
      s = function(f, c, p) {
        var h = -(f - c) * n,
          g = p * o,
          m = p + (h - g) * u / 1e3,
          b = p * u / 1e3 + f;
        return Math.abs(b - c) < Ks && Math.abs(m) < Ks ? [c, 0] : [b, m]
      };
    return s.isStepper = !0, s.dt = u, s
  },
  VO = function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
    var i = r[0];
    if (typeof i == "string") switch (i) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return HO(i);
      case "spring":
        return y3();
      default:
        if (i.split("(")[0] === "cubic-bezier") return HO(i);
        va(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r)
    }
    return typeof i == "function" ? i : (va(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null)
  };

function ga(e) {
  "@babel/helpers - typeof";
  return ga = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ga(e)
}

function YO(e) {
  return b3(e) || g3(e) || ZO(e) || v3()
}

function v3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function g3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function b3(e) {
  if (Array.isArray(e)) return nd(e)
}

function XO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function He(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? XO(Object(r), !0).forEach(function(n) {
      rd(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : XO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function rd(e, t, r) {
  return t = x3(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function x3(e) {
  var t = w3(e, "string");
  return ga(t) === "symbol" ? t : String(t)
}

function w3(e, t) {
  if (ga(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ga(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function O3(e, t) {
  return P3(e) || A3(e, t) || ZO(e, t) || S3()
}

function S3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function ZO(e, t) {
  if (e) {
    if (typeof e == "string") return nd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return nd(e, t)
  }
}

function nd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function A3(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function P3(e) {
  if (Array.isArray(e)) return e
}
var Vs = function(t, r, n) {
    return t + (r - t) * n
  },
  id = function(t) {
    var r = t.from,
      n = t.to;
    return r !== n
  },
  T3 = function e(t, r, n) {
    var i = Oi(function(o, a) {
      if (id(a)) {
        var u = t(a.from, a.to, a.velocity),
          s = O3(u, 2),
          l = s[0],
          f = s[1];
        return He(He({}, a), {}, {
          from: l,
          velocity: f
        })
      }
      return a
    }, r);
    return n < 1 ? Oi(function(o, a) {
      return id(a) ? He(He({}, a), {}, {
        velocity: Vs(a.velocity, i[o].velocity, n),
        from: Vs(a.from, i[o].from, n)
      }) : a
    }, r) : e(t, i, n - 1)
  },
  JO = function(e, t, r, n, i) {
    var o = FO(e, t),
      a = o.reduce(function(b, w) {
        return He(He({}, b), {}, rd({}, w, [e[w], t[w]]))
      }, {}),
      u = o.reduce(function(b, w) {
        return He(He({}, b), {}, rd({}, w, {
          from: e[w],
          velocity: 0,
          to: t[w]
        }))
      }, {}),
      s = -1,
      l, f, c = function() {
        return null
      },
      p = function() {
        return Oi(function(w, A) {
          return A.from
        }, u)
      },
      h = function() {
        return !Object.values(u).filter(id).length
      },
      g = function(w) {
        l || (l = w);
        var A = w - l,
          T = A / r.dt;
        u = T3(r, u, T), i(He(He(He({}, e), t), p(u))), l = w, h() || (s = requestAnimationFrame(c))
      },
      m = function(w) {
        f || (f = w);
        var A = (w - f) / n,
          T = Oi(function(y, v) {
            return Vs.apply(void 0, YO(v).concat([r(A)]))
          }, a);
        if (i(He(He(He({}, e), t), T)), A < 1) s = requestAnimationFrame(c);
        else {
          var E = Oi(function(y, v) {
            return Vs.apply(void 0, YO(v).concat([r(1)]))
          }, a);
          i(He(He(He({}, e), t), E))
        }
      };
    return c = r.isStepper ? g : m,
      function() {
        return requestAnimationFrame(c),
          function() {
            cancelAnimationFrame(s)
          }
      }
  };

function Si(e) {
  "@babel/helpers - typeof";
  return Si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Si(e)
}
var _3 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];

function E3(e, t) {
  if (e == null) return {};
  var r = j3(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function j3(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    i, o;
  for (o = 0; o < n.length; o++) i = n[o], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r
}

function od(e) {
  return I3(e) || C3(e) || M3(e) || k3()
}

function k3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function M3(e, t) {
  if (e) {
    if (typeof e == "string") return ud(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ud(e, t)
  }
}

function C3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function I3(e) {
  if (Array.isArray(e)) return ud(e)
}

function ud(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function QO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? QO(Object(r), !0).forEach(function(n) {
      ba(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : QO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function ba(e, t, r) {
  return t = tS(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function N3(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function eS(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, tS(n.key), n)
  }
}

function D3(e, t, r) {
  return t && eS(e.prototype, t), r && eS(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function tS(e) {
  var t = R3(e, "string");
  return Si(t) === "symbol" ? t : String(t)
}

function R3(e, t) {
  if (Si(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Si(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function L3(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && sd(e, t)
}

function sd(e, t) {
  return sd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, sd(e, t)
}

function B3(e) {
  var t = q3();
  return function() {
    var n = Ys(e),
      i;
    if (t) {
      var o = Ys(this).constructor;
      i = Reflect.construct(n, arguments, o)
    } else i = n.apply(this, arguments);
    return ld(this, i)
  }
}

function ld(e, t) {
  if (t && (Si(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return cd(e)
}

function cd(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function q3() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
  } catch {
    return !1
  }
}

function Ys(e) {
  return Ys = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ys(e)
}
var Xs = function(e) {
  L3(r, e);
  var t = B3(r);

  function r(n, i) {
    var o;
    N3(this, r), o = t.call(this, n, i);
    var a = o.props,
      u = a.isActive,
      s = a.attributeName,
      l = a.from,
      f = a.to,
      c = a.steps,
      p = a.children,
      h = a.duration;
    if (o.handleStyleChange = o.handleStyleChange.bind(cd(o)), o.changeStyle = o.changeStyle.bind(cd(o)), !u || h <= 0) return o.state = {
      style: {}
    }, typeof p == "function" && (o.state = {
      style: f
    }), ld(o);
    if (c && c.length) o.state = {
      style: c[0].style
    };
    else if (l) {
      if (typeof p == "function") return o.state = {
        style: l
      }, ld(o);
      o.state = {
        style: s ? ba({}, s, l) : l
      }
    } else o.state = {
      style: {}
    };
    return o
  }
  return D3(r, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props,
        o = i.isActive,
        a = i.canBegin;
      this.mounted = !0, !(!o || !a) && this.runAnimation(this.props)
    }
  }, {
    key: "componentDidUpdate",
    value: function(i) {
      var o = this.props,
        a = o.isActive,
        u = o.canBegin,
        s = o.attributeName,
        l = o.shouldReAnimate,
        f = o.to,
        c = o.from,
        p = this.state.style;
      if (u) {
        if (!a) {
          var h = {
            style: s ? ba({}, s, f) : f
          };
          this.state && p && (s && p[s] !== f || !s && p !== f) && this.setState(h);
          return
        }
        if (!(RO(i.to, f) && i.canBegin && i.isActive)) {
          var g = !i.canBegin || !i.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var m = g || l ? c : i.to;
          if (this.state && p) {
            var b = {
              style: s ? ba({}, s, m) : m
            };
            (s && p[s] !== m || !s && p !== m) && this.setState(b)
          }
          this.runAnimation(Ut(Ut({}, this.props), {}, {
            from: m,
            begin: 0
          }))
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.mounted = !1;
      var i = this.props.onAnimationEnd;
      this.unSubscribe && this.unSubscribe(), this.manager && (this.manager.stop(), this.manager = null), this.stopJSAnimation && this.stopJSAnimation(), i && i()
    }
  }, {
    key: "handleStyleChange",
    value: function(i) {
      this.changeStyle(i)
    }
  }, {
    key: "changeStyle",
    value: function(i) {
      this.mounted && this.setState({
        style: i
      })
    }
  }, {
    key: "runJSAnimation",
    value: function(i) {
      var o = this,
        a = i.from,
        u = i.to,
        s = i.duration,
        l = i.easing,
        f = i.begin,
        c = i.onAnimationEnd,
        p = i.onAnimationStart,
        h = JO(a, u, VO(l), s, this.changeStyle),
        g = function() {
          o.stopJSAnimation = h()
        };
      this.manager.start([p, f, g, s, c])
    }
  }, {
    key: "runStepAnimation",
    value: function(i) {
      var o = this,
        a = i.steps,
        u = i.begin,
        s = i.onAnimationStart,
        l = a[0],
        f = l.style,
        c = l.duration,
        p = c === void 0 ? 0 : c,
        h = function(m, b, w) {
          if (w === 0) return m;
          var A = b.duration,
            T = b.easing,
            E = T === void 0 ? "ease" : T,
            y = b.style,
            v = b.properties,
            j = b.onAnimationEnd,
            M = w > 0 ? a[w - 1] : b,
            N = v || Object.keys(y);
          if (typeof E == "function" || E === "spring") return [].concat(od(m), [o.runJSAnimation.bind(o, {
            from: M.style,
            to: y,
            duration: A,
            easing: E
          }), A]);
          var B = ed(N, A, E),
            $ = Ut(Ut(Ut({}, M.style), y), {}, {
              transition: B
            });
          return [].concat(od(m), [$, A, j]).filter(WO)
        };
      return this.manager.start([s].concat(od(a.reduce(h, [f, Math.max(p, u)])), [i.onAnimationEnd]))
    }
  }, {
    key: "runAnimation",
    value: function(i) {
      this.manager || (this.manager = Qp());
      var o = i.begin,
        a = i.duration,
        u = i.attributeName,
        s = i.to,
        l = i.easing,
        f = i.onAnimationStart,
        c = i.onAnimationEnd,
        p = i.steps,
        h = i.children,
        g = this.manager;
      if (this.unSubscribe = g.subscribe(this.handleStyleChange), typeof l == "function" || typeof h == "function" || l === "spring") {
        this.runJSAnimation(i);
        return
      }
      if (p.length > 1) {
        this.runStepAnimation(i);
        return
      }
      var m = u ? ba({}, u, s) : s,
        b = ed(Object.keys(m), a, l);
      g.start([f, o, Ut(Ut({}, m), {}, {
        transition: b
      }), a, c])
    }
  }, {
    key: "render",
    value: function() {
      var i = this.props,
        o = i.children,
        a = i.begin,
        u = i.duration,
        s = i.attributeName,
        l = i.easing,
        f = i.isActive,
        c = i.steps,
        p = i.from,
        h = i.to,
        g = i.canBegin,
        m = i.onAnimationEnd,
        b = i.shouldReAnimate,
        w = i.onAnimationReStart,
        A = E3(i, _3),
        T = ad.count(o),
        E = this.state.style;
      if (typeof o == "function") return o(E);
      if (!f || T === 0 || u <= 0) return o;
      var y = function(j) {
        var M = j.props,
          N = M.style,
          B = N === void 0 ? {} : N,
          $ = M.className,
          R = W3(j, Ut(Ut({}, A), {}, {
            style: Ut(Ut({}, B), E),
            className: $
          }));
        return R
      };
      return T === 1 ? y(ad.only(o)) : $3.createElement("div", null, ad.map(o, function(v) {
        return y(v)
      }))
    }
  }]), r
}(F3);
Xs.displayName = "Animate";
Xs.defaultProps = {
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
};
Xs.propTypes = {
  from: ye.default.oneOfType([ye.default.object, ye.default.string]),
  to: ye.default.oneOfType([ye.default.object, ye.default.string]),
  attributeName: ye.default.string,
  duration: ye.default.number,
  begin: ye.default.number,
  easing: ye.default.oneOfType([ye.default.string, ye.default.func]),
  steps: ye.default.arrayOf(ye.default.shape({
    duration: ye.default.number.isRequired,
    style: ye.default.object.isRequired,
    easing: ye.default.oneOfType([ye.default.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), ye.default.func]),
    properties: ye.default.arrayOf("string"),
    onAnimationEnd: ye.default.func
  })),
  children: ye.default.oneOfType([ye.default.node, ye.default.func]),
  isActive: ye.default.bool,
  canBegin: ye.default.bool,
  onAnimationEnd: ye.default.func,
  shouldReAnimate: ye.default.bool,
  onAnimationStart: ye.default.func,
  onAnimationReStart: ye.default.func
};
var rS = Xs;
var Mt = rS;

function xa(e) {
  "@babel/helpers - typeof";
  return xa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, xa(e)
}

function Js() {
  return Js = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Js.apply(this, arguments)
}

function z3(e, t) {
  return K3(e) || G3(e, t) || U3(e, t) || H3()
}

function H3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function U3(e, t) {
  if (e) {
    if (typeof e == "string") return nS(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return nS(e, t)
  }
}

function nS(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function G3(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function K3(e) {
  if (Array.isArray(e)) return e
}

function iS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function oS(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? iS(Object(r), !0).forEach(function(n) {
      V3(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : iS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function V3(e, t, r) {
  return t = Y3(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Y3(e) {
  var t = X3(e, "string");
  return xa(t) == "symbol" ? t : t + ""
}

function X3(e, t) {
  if (xa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (xa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var aS = function(t, r, n, i, o) {
    var a = Math.min(Math.abs(n) / 2, Math.abs(i) / 2),
      u = i >= 0 ? 1 : -1,
      s = n >= 0 ? 1 : -1,
      l = i >= 0 && n >= 0 || i < 0 && n < 0 ? 1 : 0,
      f;
    if (a > 0 && o instanceof Array) {
      for (var c = [0, 0, 0, 0], p = 0, h = 4; p < h; p++) c[p] = o[p] > a ? a : o[p];
      f = "M".concat(t, ",").concat(r + u * c[0]), c[0] > 0 && (f += "A ".concat(c[0], ",").concat(c[0], ",0,0,").concat(l, ",").concat(t + s * c[0], ",").concat(r)), f += "L ".concat(t + n - s * c[1], ",").concat(r), c[1] > 0 && (f += "A ".concat(c[1], ",").concat(c[1], ",0,0,").concat(l, `,
        `).concat(t + n, ",").concat(r + u * c[1])), f += "L ".concat(t + n, ",").concat(r + i - u * c[2]), c[2] > 0 && (f += "A ".concat(c[2], ",").concat(c[2], ",0,0,").concat(l, `,
        `).concat(t + n - s * c[2], ",").concat(r + i)), f += "L ".concat(t + s * c[3], ",").concat(r + i), c[3] > 0 && (f += "A ".concat(c[3], ",").concat(c[3], ",0,0,").concat(l, `,
        `).concat(t, ",").concat(r + i - u * c[3])), f += "Z"
    } else if (a > 0 && o === +o && o > 0) {
      var g = Math.min(a, o);
      f = "M ".concat(t, ",").concat(r + u * g, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(l, ",").concat(t + s * g, ",").concat(r, `
            L `).concat(t + n - s * g, ",").concat(r, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(l, ",").concat(t + n, ",").concat(r + u * g, `
            L `).concat(t + n, ",").concat(r + i - u * g, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(l, ",").concat(t + n - s * g, ",").concat(r + i, `
            L `).concat(t + s * g, ",").concat(r + i, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(l, ",").concat(t, ",").concat(r + i - u * g, " Z")
    } else f = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(i, " h ").concat(-n, " Z");
    return f
  },
  uS = function(t, r) {
    if (!t || !r) return !1;
    var n = t.x,
      i = t.y,
      o = r.x,
      a = r.y,
      u = r.width,
      s = r.height;
    if (Math.abs(u) > 0 && Math.abs(s) > 0) {
      var l = Math.min(o, o + u),
        f = Math.max(o, o + u),
        c = Math.min(a, a + s),
        p = Math.max(a, a + s);
      return n >= l && n <= f && i >= c && i <= p
    }
    return !1
  },
  e8 = {
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
  Ai = function(t) {
    var r = oS(oS({}, e8), t),
      n = J3(),
      i = Q3(-1),
      o = z3(i, 2),
      a = o[0],
      u = o[1];
    Z3(function() {
      if (n.current && n.current.getTotalLength) try {
        var E = n.current.getTotalLength();
        E && u(E)
      } catch {}
    }, []);
    var s = r.x,
      l = r.y,
      f = r.width,
      c = r.height,
      p = r.radius,
      h = r.className,
      g = r.animationEasing,
      m = r.animationDuration,
      b = r.animationBegin,
      w = r.isAnimationActive,
      A = r.isUpdateAnimationActive;
    if (s !== +s || l !== +l || f !== +f || c !== +c || f === 0 || c === 0) return null;
    var T = ne("recharts-rectangle", h);
    return A ? Zs.createElement(Mt, {
      canBegin: a > 0,
      from: {
        width: f,
        height: c,
        x: s,
        y: l
      },
      to: {
        width: f,
        height: c,
        x: s,
        y: l
      },
      duration: m,
      animationEasing: g,
      isActive: A
    }, function(E) {
      var y = E.width,
        v = E.height,
        j = E.x,
        M = E.y;
      return Zs.createElement(Mt, {
        canBegin: a > 0,
        from: "0px ".concat(a === -1 ? 1 : a, "px"),
        to: "".concat(a, "px 0px"),
        attributeName: "strokeDasharray",
        begin: b,
        duration: m,
        isActive: w,
        easing: g
      }, Zs.createElement("path", Js({}, Q(r, !0), {
        className: T,
        d: aS(j, M, y, v, p),
        ref: n
      })))
    }) : Zs.createElement("path", Js({}, Q(r, !0), {
      className: T,
      d: aS(s, l, f, c, p)
    }))
  };
import wa from "./react-shim-eraudit.js";
var t8 = ["points", "className", "baseLinePoints", "connectNulls"];

function Pi() {
  return Pi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Pi.apply(this, arguments)
}

function r8(e, t) {
  if (e == null) return {};
  var r = n8(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function n8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function sS(e) {
  return u8(e) || a8(e) || o8(e) || i8()
}

function i8() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function o8(e, t) {
  if (e) {
    if (typeof e == "string") return fd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return fd(e, t)
  }
}

function a8(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function u8(e) {
  if (Array.isArray(e)) return fd(e)
}

function fd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var lS = function(t) {
    return t && t.x === +t.x && t.y === +t.y
  },
  s8 = function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
      r = [
        []
      ];
    return t.forEach(function(n) {
      lS(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([])
    }), lS(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r
  },
  Oa = function(t, r) {
    var n = s8(t);
    r && (n = [n.reduce(function(o, a) {
      return [].concat(sS(o), sS(a))
    }, [])]);
    var i = n.map(function(o) {
      return o.reduce(function(a, u, s) {
        return "".concat(a).concat(s === 0 ? "M" : "L").concat(u.x, ",").concat(u.y)
      }, "")
    }).join("");
    return n.length === 1 ? "".concat(i, "Z") : i
  },
  l8 = function(t, r, n) {
    var i = Oa(t, n);
    return "".concat(i.slice(-1) === "Z" ? i.slice(0, -1) : i, "L").concat(Oa(r.reverse(), n).slice(1))
  },
  cS = function(t) {
    var r = t.points,
      n = t.className,
      i = t.baseLinePoints,
      o = t.connectNulls,
      a = r8(t, t8);
    if (!r || !r.length) return null;
    var u = ne("recharts-polygon", n);
    if (i && i.length) {
      var s = a.stroke && a.stroke !== "none",
        l = l8(r, i, o);
      return wa.createElement("g", {
        className: u
      }, wa.createElement("path", Pi({}, Q(a, !0), {
        fill: l.slice(-1) === "Z" ? a.fill : "none",
        stroke: "none",
        d: l
      })), s ? wa.createElement("path", Pi({}, Q(a, !0), {
        fill: "none",
        d: Oa(r, o)
      })) : null, s ? wa.createElement("path", Pi({}, Q(a, !0), {
        fill: "none",
        d: Oa(i, o)
      })) : null)
    }
    var f = Oa(r, o);
    return wa.createElement("path", Pi({}, Q(a, !0), {
      fill: f.slice(-1) === "Z" ? a.fill : "none",
      className: u,
      d: f
    }))
  };
import * as fS from "./react-shim-eraudit.js";

function pd() {
  return pd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, pd.apply(this, arguments)
}
var Rr = function(t) {
  var r = t.cx,
    n = t.cy,
    i = t.r,
    o = t.className,
    a = ne("recharts-dot", o);
  return r === +r && n === +n && i === +i ? fS.createElement("circle", pd({}, Q(t, !1), Wr(t), {
    className: a,
    cx: r,
    cy: n,
    r: i
  })) : null
};
import v8 from "./react-shim-eraudit.js";

function Sa(e) {
  "@babel/helpers - typeof";
  return Sa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Sa(e)
}
var c8 = ["x", "y", "top", "left", "width", "height", "className"];

function dd() {
  return dd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, dd.apply(this, arguments)
}

function pS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function f8(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pS(Object(r), !0).forEach(function(n) {
      p8(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function p8(e, t, r) {
  return t = d8(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function d8(e) {
  var t = m8(e, "string");
  return Sa(t) == "symbol" ? t : t + ""
}

function m8(e, t) {
  if (Sa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Sa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function h8(e, t) {
  if (e == null) return {};
  var r = y8(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function y8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var g8 = function(t, r, n, i, o, a) {
    return "M".concat(t, ",").concat(o, "v").concat(i, "M").concat(a, ",").concat(r, "h").concat(n)
  },
  dS = function(t) {
    var r = t.x,
      n = r === void 0 ? 0 : r,
      i = t.y,
      o = i === void 0 ? 0 : i,
      a = t.top,
      u = a === void 0 ? 0 : a,
      s = t.left,
      l = s === void 0 ? 0 : s,
      f = t.width,
      c = f === void 0 ? 0 : f,
      p = t.height,
      h = p === void 0 ? 0 : p,
      g = t.className,
      m = h8(t, c8),
      b = f8({
        x: n,
        y: o,
        top: u,
        left: l,
        width: c,
        height: h
      }, m);
    return !V(n) || !V(o) || !V(c) || !V(h) || !V(u) || !V(l) ? null : v8.createElement("path", dd({}, Q(b, !0), {
      className: ne("recharts-cross", g),
      d: g8(n, o, c, h, u, l)
    }))
  };
var SS = J(hS()),
  AS = J(vS()),
  PS = J(_e());
import yn, {
  PureComponent as L8
} from "./react-shim-eraudit.js";
var _8 = ["cx", "cy", "angle", "ticks", "axisLine"],
  E8 = ["ticks", "tick", "angle", "tickFormatter", "stroke"];

function Ti(e) {
  "@babel/helpers - typeof";
  return Ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ti(e)
}

function Aa() {
  return Aa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Aa.apply(this, arguments)
}

function gS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function hn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gS(Object(r), !0).forEach(function(n) {
      el(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function bS(e, t) {
  if (e == null) return {};
  var r = j8(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function j8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function k8(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function xS(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, OS(n.key), n)
  }
}

function M8(e, t, r) {
  return t && xS(e.prototype, t), r && xS(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function C8(e, t, r) {
  return t = Qs(t), I8(e, wS() ? Reflect.construct(t, r || [], Qs(e).constructor) : t.apply(e, r))
}

function I8(e, t) {
  if (t && (Ti(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return N8(e)
}

function N8(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function wS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (wS = function() {
    return !!e
  })()
}

function Qs(e) {
  return Qs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Qs(e)
}

function D8(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && md(e, t)
}

function md(e, t) {
  return md = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, md(e, t)
}

function el(e, t, r) {
  return t = OS(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function OS(e) {
  var t = R8(e, "string");
  return Ti(t) == "symbol" ? t : t + ""
}

function R8(e, t) {
  if (Ti(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Pa = function(e) {
  function t() {
    return k8(this, t), C8(this, t, arguments)
  }
  return D8(t, e), M8(t, [{
    key: "getTickValueCoord",
    value: function(n) {
      var i = n.coordinate,
        o = this.props,
        a = o.angle,
        u = o.cx,
        s = o.cy;
      return de(u, s, i, a)
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props.orientation,
        i;
      switch (n) {
        case "left":
          i = "end";
          break;
        case "right":
          i = "start";
          break;
        default:
          i = "middle";
          break
      }
      return i
    }
  }, {
    key: "getViewBox",
    value: function() {
      var n = this.props,
        i = n.cx,
        o = n.cy,
        a = n.angle,
        u = n.ticks,
        s = (0, SS.default)(u, function(f) {
          return f.coordinate || 0
        }),
        l = (0, AS.default)(u, function(f) {
          return f.coordinate || 0
        });
      return {
        cx: i,
        cy: o,
        startAngle: a,
        endAngle: a,
        innerRadius: l.coordinate || 0,
        outerRadius: s.coordinate || 0
      }
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props,
        i = n.cx,
        o = n.cy,
        a = n.angle,
        u = n.ticks,
        s = n.axisLine,
        l = bS(n, _8),
        f = u.reduce(function(g, m) {
          return [Math.min(g[0], m.coordinate), Math.max(g[1], m.coordinate)]
        }, [1 / 0, -1 / 0]),
        c = de(i, o, f[0], a),
        p = de(i, o, f[1], a),
        h = hn(hn(hn({}, Q(l, !1)), {}, {
          fill: "none"
        }, Q(s, !1)), {}, {
          x1: c.x,
          y1: c.y,
          x2: p.x,
          y2: p.y
        });
      return yn.createElement("line", Aa({
        className: "recharts-polar-radius-axis-line"
      }, h))
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this,
        i = this.props,
        o = i.ticks,
        a = i.tick,
        u = i.angle,
        s = i.tickFormatter,
        l = i.stroke,
        f = bS(i, E8),
        c = this.getTickTextAnchor(),
        p = Q(f, !1),
        h = Q(a, !1),
        g = o.map(function(m, b) {
          var w = n.getTickValueCoord(m),
            A = hn(hn(hn(hn({
              textAnchor: c,
              transform: "rotate(".concat(90 - u, ", ").concat(w.x, ", ").concat(w.y, ")")
            }, p), {}, {
              stroke: "none",
              fill: l
            }, h), {}, {
              index: b
            }, w), {}, {
              payload: m
            });
          return yn.createElement(le, Aa({
            className: ne("recharts-polar-radius-axis-tick", Ls(a)),
            key: "tick-".concat(m.coordinate)
          }, pt(n.props, m, b)), t.renderTickItem(a, A, s ? s(m.value, b) : m.value))
        });
      return yn.createElement(le, {
        className: "recharts-polar-radius-axis-ticks"
      }, g)
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props,
        i = n.ticks,
        o = n.axisLine,
        a = n.tick;
      return !i || !i.length ? null : yn.createElement(le, {
        className: ne("recharts-polar-radius-axis", this.props.className)
      }, o && this.renderAxisLine(), a && this.renderTicks(), Te.renderCallByParent(this.props, this.getViewBox()))
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, o) {
      var a;
      return yn.isValidElement(n) ? a = yn.cloneElement(n, i) : (0, PS.default)(n) ? a = n(i) : a = yn.createElement(dt, Aa({}, i, {
        className: "recharts-polar-radius-axis-tick-value"
      }), o), a
    }
  }])
}(L8);
el(Pa, "displayName", "PolarRadiusAxis");
el(Pa, "axisType", "radiusAxis");
el(Pa, "defaultProps", {
  type: "number",
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: "right",
  stroke: "#ccc",
  axisLine: !0,
  tick: !0,
  tickCount: 5,
  allowDataOverflow: !1,
  scale: "auto",
  allowDuplicatedCategory: !0
});
var MS = J(_e());
import br, {
  PureComponent as U8
} from "./react-shim-eraudit.js";

function _i(e) {
  "@babel/helpers - typeof";
  return _i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, _i(e)
}

function gn() {
  return gn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, gn.apply(this, arguments)
}

function TS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function vn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? TS(Object(r), !0).forEach(function(n) {
      rl(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : TS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function B8(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _S(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, kS(n.key), n)
  }
}

function q8(e, t, r) {
  return t && _S(e.prototype, t), r && _S(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function $8(e, t, r) {
  return t = tl(t), F8(e, jS() ? Reflect.construct(t, r || [], tl(e).constructor) : t.apply(e, r))
}

function F8(e, t) {
  if (t && (_i(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return W8(e)
}

function W8(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function jS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (jS = function() {
    return !!e
  })()
}

function tl(e) {
  return tl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, tl(e)
}

function z8(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && hd(e, t)
}

function hd(e, t) {
  return hd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, hd(e, t)
}

function rl(e, t, r) {
  return t = kS(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function kS(e) {
  var t = H8(e, "string");
  return _i(t) == "symbol" ? t : t + ""
}

function H8(e, t) {
  if (_i(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (_i(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var G8 = Math.PI / 180,
  ES = 1e-5,
  Ta = function(e) {
    function t() {
      return B8(this, t), $8(this, t, arguments)
    }
    return z8(t, e), q8(t, [{
      key: "getTickLineCoord",
      value: function(n) {
        var i = this.props,
          o = i.cx,
          a = i.cy,
          u = i.radius,
          s = i.orientation,
          l = i.tickSize,
          f = l || 8,
          c = de(o, a, u, n.coordinate),
          p = de(o, a, u + (s === "inner" ? -1 : 1) * f, n.coordinate);
        return {
          x1: c.x,
          y1: c.y,
          x2: p.x,
          y2: p.y
        }
      }
    }, {
      key: "getTickTextAnchor",
      value: function(n) {
        var i = this.props.orientation,
          o = Math.cos(-n.coordinate * G8),
          a;
        return o > ES ? a = i === "outer" ? "start" : "end" : o < -ES ? a = i === "outer" ? "end" : "start" : a = "middle", a
      }
    }, {
      key: "renderAxisLine",
      value: function() {
        var n = this.props,
          i = n.cx,
          o = n.cy,
          a = n.radius,
          u = n.axisLine,
          s = n.axisLineType,
          l = vn(vn({}, Q(this.props, !1)), {}, {
            fill: "none"
          }, Q(u, !1));
        if (s === "circle") return br.createElement(Rr, gn({
          className: "recharts-polar-angle-axis-line"
        }, l, {
          cx: i,
          cy: o,
          r: a
        }));
        var f = this.props.ticks,
          c = f.map(function(p) {
            return de(i, o, a, p.coordinate)
          });
        return br.createElement(cS, gn({
          className: "recharts-polar-angle-axis-line"
        }, l, {
          points: c
        }))
      }
    }, {
      key: "renderTicks",
      value: function() {
        var n = this,
          i = this.props,
          o = i.ticks,
          a = i.tick,
          u = i.tickLine,
          s = i.tickFormatter,
          l = i.stroke,
          f = Q(this.props, !1),
          c = Q(a, !1),
          p = vn(vn({}, f), {}, {
            fill: "none"
          }, Q(u, !1)),
          h = o.map(function(g, m) {
            var b = n.getTickLineCoord(g),
              w = n.getTickTextAnchor(g),
              A = vn(vn(vn({
                textAnchor: w
              }, f), {}, {
                stroke: "none",
                fill: l
              }, c), {}, {
                index: m,
                payload: g,
                x: b.x2,
                y: b.y2
              });
            return br.createElement(le, gn({
              className: ne("recharts-polar-angle-axis-tick", Ls(a)),
              key: "tick-".concat(g.coordinate)
            }, pt(n.props, g, m)), u && br.createElement("line", gn({
              className: "recharts-polar-angle-axis-tick-line"
            }, p, b)), a && t.renderTickItem(a, A, s ? s(g.value, m) : g.value))
          });
        return br.createElement(le, {
          className: "recharts-polar-angle-axis-ticks"
        }, h)
      }
    }, {
      key: "render",
      value: function() {
        var n = this.props,
          i = n.ticks,
          o = n.radius,
          a = n.axisLine;
        return o <= 0 || !i || !i.length ? null : br.createElement(le, {
          className: ne("recharts-polar-angle-axis", this.props.className)
        }, a && this.renderAxisLine(), this.renderTicks())
      }
    }], [{
      key: "renderTickItem",
      value: function(n, i, o) {
        var a;
        return br.isValidElement(n) ? a = br.cloneElement(n, i) : (0, MS.default)(n) ? a = n(i) : a = br.createElement(dt, gn({}, i, {
          className: "recharts-polar-angle-axis-tick-value"
        }), o), a
      }
    }])
  }(U8);
rl(Ta, "displayName", "PolarAngleAxis");
rl(Ta, "axisType", "angleAxis");
rl(Ta, "defaultProps", {
  type: "category",
  angleAxisId: 0,
  scale: "auto",
  cx: 0,
  cy: 0,
  orientation: "outer",
  axisLine: !0,
  tickLine: !0,
  tickSize: 8,
  tick: !0,
  hide: !1,
  allowDuplicatedCategory: !0
});
import ut, {
  PureComponent as z4
} from "./react-shim-eraudit.js";
var rA = J(Ar()),
  nA = J(hi()),
  xn = J(ft()),
  ji = J(_e());
var KS = J(_e()),
  VS = J(RS()),
  YS = J(BS()),
  XS = J(hi());
import bn, {
  isValidElement as GS,
  cloneElement as T4
} from "./react-shim-eraudit.js";
import _a, {
  useEffect as y4,
  useRef as v4,
  useState as g4
} from "./react-shim-eraudit.js";

function Ea(e) {
  "@babel/helpers - typeof";
  return Ea = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ea(e)
}

function nl() {
  return nl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, nl.apply(this, arguments)
}

function s4(e, t) {
  return p4(e) || f4(e, t) || c4(e, t) || l4()
}

function l4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function c4(e, t) {
  if (e) {
    if (typeof e == "string") return qS(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return qS(e, t)
  }
}

function qS(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function f4(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function p4(e) {
  if (Array.isArray(e)) return e
}

function $S(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function FS(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $S(Object(r), !0).forEach(function(n) {
      d4(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $S(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function d4(e, t, r) {
  return t = m4(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function m4(e) {
  var t = h4(e, "string");
  return Ea(t) == "symbol" ? t : t + ""
}

function h4(e, t) {
  if (Ea(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ea(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var WS = function(t, r, n, i, o) {
    var a = n - i,
      u;
    return u = "M ".concat(t, ",").concat(r), u += "L ".concat(t + n, ",").concat(r), u += "L ".concat(t + n - a / 2, ",").concat(r + o), u += "L ".concat(t + n - a / 2 - i, ",").concat(r + o), u += "L ".concat(t, ",").concat(r, " Z"), u
  },
  b4 = {
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
  zS = function(t) {
    var r = FS(FS({}, b4), t),
      n = v4(),
      i = g4(-1),
      o = s4(i, 2),
      a = o[0],
      u = o[1];
    y4(function() {
      if (n.current && n.current.getTotalLength) try {
        var T = n.current.getTotalLength();
        T && u(T)
      } catch {}
    }, []);
    var s = r.x,
      l = r.y,
      f = r.upperWidth,
      c = r.lowerWidth,
      p = r.height,
      h = r.className,
      g = r.animationEasing,
      m = r.animationDuration,
      b = r.animationBegin,
      w = r.isUpdateAnimationActive;
    if (s !== +s || l !== +l || f !== +f || c !== +c || p !== +p || f === 0 && c === 0 || p === 0) return null;
    var A = ne("recharts-trapezoid", h);
    return w ? _a.createElement(Mt, {
      canBegin: a > 0,
      from: {
        upperWidth: 0,
        lowerWidth: 0,
        height: p,
        x: s,
        y: l
      },
      to: {
        upperWidth: f,
        lowerWidth: c,
        height: p,
        x: s,
        y: l
      },
      duration: m,
      animationEasing: g,
      isActive: w
    }, function(T) {
      var E = T.upperWidth,
        y = T.lowerWidth,
        v = T.height,
        j = T.x,
        M = T.y;
      return _a.createElement(Mt, {
        canBegin: a > 0,
        from: "0px ".concat(a === -1 ? 1 : a, "px"),
        to: "".concat(a, "px 0px"),
        attributeName: "strokeDasharray",
        begin: b,
        duration: m,
        easing: g
      }, _a.createElement("path", nl({}, Q(r, !0), {
        className: A,
        d: WS(j, M, E, y, v),
        ref: n
      })))
    }) : _a.createElement("g", null, _a.createElement("path", nl({}, Q(r, !0), {
      className: A,
      d: WS(s, l, f, c, p)
    })))
  };
var x4 = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];

function ja(e) {
  "@babel/helpers - typeof";
  return ja = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ja(e)
}

function w4(e, t) {
  if (e == null) return {};
  var r = O4(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function O4(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function HS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function il(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? HS(Object(r), !0).forEach(function(n) {
      S4(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : HS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function S4(e, t, r) {
  return t = A4(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function A4(e) {
  var t = P4(e, "string");
  return ja(t) == "symbol" ? t : t + ""
}

function P4(e, t) {
  if (ja(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ja(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function _4(e, t) {
  return il(il({}, t), e)
}

function E4(e, t) {
  return e === "symbols"
}

function US(e) {
  var t = e.shapeType,
    r = e.elementProps;
  switch (t) {
    case "rectangle":
      return bn.createElement(Ai, r);
    case "trapezoid":
      return bn.createElement(zS, r);
    case "sector":
      return bn.createElement(Ws, r);
    case "symbols":
      if (E4(t, r)) return bn.createElement(po, r);
      break;
    default:
      return null
  }
}

function j4(e) {
  return GS(e) ? e.props : e
}

function ol(e) {
  var t = e.option,
    r = e.shapeType,
    n = e.propTransformer,
    i = n === void 0 ? _4 : n,
    o = e.activeClassName,
    a = o === void 0 ? "recharts-active-shape" : o,
    u = e.isActive,
    s = w4(e, x4),
    l;
  if (GS(t)) l = T4(t, il(il({}, s), j4(t)));
  else if ((0, KS.default)(t)) l = t(s);
  else if ((0, VS.default)(t) && !(0, YS.default)(t)) {
    var f = i(t, s);
    l = bn.createElement(US, {
      shapeType: r,
      elementProps: f
    })
  } else {
    var c = s;
    l = bn.createElement(US, {
      shapeType: r,
      elementProps: c
    })
  }
  return u ? bn.createElement(le, {
    className: a
  }, l) : l
}

function ka(e, t) {
  return t != null && "trapezoids" in e.props
}

function Ma(e, t) {
  return t != null && "sectors" in e.props
}

function Ei(e, t) {
  return t != null && "points" in e.props
}

function k4(e, t) {
  var r, n, i = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x,
    o = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return i && o
}

function M4(e, t) {
  var r = e.endAngle === t.endAngle,
    n = e.startAngle === t.startAngle;
  return r && n
}

function C4(e, t) {
  var r = e.x === t.x,
    n = e.y === t.y,
    i = e.z === t.z;
  return r && n && i
}

function I4(e, t) {
  var r;
  return ka(e, t) ? r = k4 : Ma(e, t) ? r = M4 : Ei(e, t) && (r = C4), r
}

function N4(e, t) {
  var r;
  return ka(e, t) ? r = "trapezoids" : Ma(e, t) ? r = "sectors" : Ei(e, t) && (r = "points"), r
}

function D4(e, t) {
  if (ka(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload
  }
  if (Ma(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload
  }
  return Ei(e, t) ? t.payload : {}
}

function ZS(e) {
  var t = e.activeTooltipItem,
    r = e.graphicalItem,
    n = e.itemData,
    i = N4(r, t),
    o = D4(r, t),
    a = n.filter(function(s, l) {
      var f = (0, XS.default)(o, s),
        c = r.props[i].filter(function(g) {
          var m = I4(r, t);
          return m(g, t)
        }),
        p = r.props[i].indexOf(c[c.length - 1]),
        h = l === p;
      return f && h
    }),
    u = n.indexOf(a[a.length - 1]);
  return u
}
var al;

function Mi(e) {
  "@babel/helpers - typeof";
  return Mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Mi(e)
}

function ki() {
  return ki = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ki.apply(this, arguments)
}

function JS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ae(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? JS(Object(r), !0).forEach(function(n) {
      Ct(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : JS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function R4(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function QS(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, tA(n.key), n)
  }
}

function L4(e, t, r) {
  return t && QS(e.prototype, t), r && QS(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function B4(e, t, r) {
  return t = ul(t), q4(e, eA() ? Reflect.construct(t, r || [], ul(e).constructor) : t.apply(e, r))
}

function q4(e, t) {
  if (t && (Mi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return $4(e)
}

function $4(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function eA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (eA = function() {
    return !!e
  })()
}

function ul(e) {
  return ul = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ul(e)
}

function F4(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && yd(e, t)
}

function yd(e, t) {
  return yd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, yd(e, t)
}

function Ct(e, t, r) {
  return t = tA(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function tA(e) {
  var t = W4(e, "string");
  return Mi(t) == "symbol" ? t : t + ""
}

function W4(e, t) {
  if (Mi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Mi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var It = function(e) {
  function t(r) {
    var n;
    return R4(this, t), n = B4(this, t, [r]), Ct(n, "pieRef", null), Ct(n, "sectorRefs", []), Ct(n, "id", St("recharts-pie-")), Ct(n, "handleAnimationEnd", function() {
      var i = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), (0, ji.default)(i) && i()
    }), Ct(n, "handleAnimationStart", function() {
      var i = n.props.onAnimationStart;
      n.setState({
        isAnimationFinished: !1
      }), (0, ji.default)(i) && i()
    }), n.state = {
      isAnimationFinished: !r.isAnimationActive,
      prevIsAnimationActive: r.isAnimationActive,
      prevAnimationId: r.animationId,
      sectorToFocus: 0
    }, n
  }
  return F4(t, e), L4(t, [{
    key: "isActiveIndex",
    value: function(n) {
      var i = this.props.activeIndex;
      return Array.isArray(i) ? i.indexOf(n) !== -1 : n === i
    }
  }, {
    key: "hasActiveIndex",
    value: function() {
      var n = this.props.activeIndex;
      return Array.isArray(n) ? n.length !== 0 : n || n === 0
    }
  }, {
    key: "renderLabels",
    value: function(n) {
      var i = this.props.isAnimationActive;
      if (i && !this.state.isAnimationFinished) return null;
      var o = this.props,
        a = o.label,
        u = o.labelLine,
        s = o.dataKey,
        l = o.valueKey,
        f = Q(this.props, !1),
        c = Q(a, !1),
        p = Q(u, !1),
        h = a && a.offsetRadius || 20,
        g = n.map(function(m, b) {
          var w = (m.startAngle + m.endAngle) / 2,
            A = de(m.cx, m.cy, m.outerRadius + h, w),
            T = Ae(Ae(Ae(Ae({}, f), m), {}, {
              stroke: "none"
            }, c), {}, {
              index: b,
              textAnchor: t.getTextAnchor(A.x, m.cx)
            }, A),
            E = Ae(Ae(Ae(Ae({}, f), m), {}, {
              fill: "none",
              stroke: m.fill
            }, p), {}, {
              index: b,
              points: [de(m.cx, m.cy, m.outerRadius, w), A]
            }),
            y = s;
          return (0, xn.default)(s) && (0, xn.default)(l) ? y = "value" : (0, xn.default)(s) && (y = l), ut.createElement(le, {
            key: "label-".concat(m.startAngle, "-").concat(m.endAngle, "-").concat(m.midAngle, "-").concat(b)
          }, u && t.renderLabelLineItem(u, E, "line"), t.renderLabelItem(a, T, je(m, y)))
        });
      return ut.createElement(le, {
        className: "recharts-pie-labels"
      }, g)
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var i = this,
        o = this.props,
        a = o.activeShape,
        u = o.blendStroke,
        s = o.inactiveShape;
      return n.map(function(l, f) {
        if (l?.startAngle === 0 && l?.endAngle === 0 && n.length !== 1) return null;
        var c = i.isActiveIndex(f),
          p = s && i.hasActiveIndex() ? s : null,
          h = c ? a : p,
          g = Ae(Ae({}, l), {}, {
            stroke: u ? l.fill : l.stroke,
            tabIndex: -1
          });
        return ut.createElement(le, ki({
          ref: function(b) {
            b && !i.sectorRefs.includes(b) && i.sectorRefs.push(b)
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, pt(i.props, l, f), {
          key: "sector-".concat(l?.startAngle, "-").concat(l?.endAngle, "-").concat(l.midAngle, "-").concat(f)
        }), ut.createElement(ol, ki({
          option: h,
          isActive: c,
          shapeType: "sector"
        }, g)))
      })
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this,
        i = this.props,
        o = i.sectors,
        a = i.isAnimationActive,
        u = i.animationBegin,
        s = i.animationDuration,
        l = i.animationEasing,
        f = i.animationId,
        c = this.state,
        p = c.prevSectors,
        h = c.prevIsAnimationActive;
      return ut.createElement(Mt, {
        begin: u,
        duration: s,
        isActive: a,
        easing: l,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(f, "-").concat(h),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(g) {
        var m = g.t,
          b = [],
          w = o && o[0],
          A = w.startAngle;
        return o.forEach(function(T, E) {
          var y = p && p[E],
            v = E > 0 ? (0, rA.default)(T, "paddingAngle", 0) : 0;
          if (y) {
            var j = Ge(y.endAngle - y.startAngle, T.endAngle - T.startAngle),
              M = Ae(Ae({}, T), {}, {
                startAngle: A + v,
                endAngle: A + j(m) + v
              });
            b.push(M), A = M.endAngle
          } else {
            var N = T.endAngle,
              B = T.startAngle,
              $ = Ge(0, N - B),
              R = $(m),
              z = Ae(Ae({}, T), {}, {
                startAngle: A + v,
                endAngle: A + R + v
              });
            b.push(z), A = z.endAngle
          }
        }), ut.createElement(le, null, n.renderSectorsStatically(b))
      })
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function(n) {
      var i = this;
      n.onkeydown = function(o) {
        if (!o.altKey) switch (o.key) {
          case "ArrowLeft": {
            var a = ++i.state.sectorToFocus % i.sectorRefs.length;
            i.sectorRefs[a].focus(), i.setState({
              sectorToFocus: a
            });
            break
          }
          case "ArrowRight": {
            var u = --i.state.sectorToFocus < 0 ? i.sectorRefs.length - 1 : i.state.sectorToFocus % i.sectorRefs.length;
            i.sectorRefs[u].focus(), i.setState({
              sectorToFocus: u
            });
            break
          }
          case "Escape": {
            i.sectorRefs[i.state.sectorToFocus].blur(), i.setState({
              sectorToFocus: 0
            });
            break
          }
          default:
        }
      }
    }
  }, {
    key: "renderSectors",
    value: function() {
      var n = this.props,
        i = n.sectors,
        o = n.isAnimationActive,
        a = this.state.prevSectors;
      return o && i && i.length && (!a || !(0, nA.default)(a, i)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(i)
    }
  }, {
    key: "componentDidMount",
    value: function() {
      this.pieRef && this.attachKeyboardHandlers(this.pieRef)
    }
  }, {
    key: "render",
    value: function() {
      var n = this,
        i = this.props,
        o = i.hide,
        a = i.sectors,
        u = i.className,
        s = i.label,
        l = i.cx,
        f = i.cy,
        c = i.innerRadius,
        p = i.outerRadius,
        h = i.isAnimationActive,
        g = this.state.isAnimationFinished;
      if (o || !a || !a.length || !V(l) || !V(f) || !V(c) || !V(p)) return null;
      var m = ne("recharts-pie", u);
      return ut.createElement(le, {
        tabIndex: this.props.rootTabIndex,
        className: m,
        ref: function(w) {
          n.pieRef = w
        }
      }, this.renderSectors(), s && this.renderLabels(a), Te.renderCallByParent(this.props, null, !1), (!h || g) && Ne.renderCallByParent(this.props, a, !1))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return i.prevIsAnimationActive !== n.isAnimationActive ? {
        prevIsAnimationActive: n.isAnimationActive,
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: [],
        isAnimationFinished: !0
      } : n.isAnimationActive && n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: i.curSectors,
        isAnimationFinished: !0
      } : n.sectors !== i.curSectors ? {
        curSectors: n.sectors,
        isAnimationFinished: !0
      } : null
    }
  }, {
    key: "getTextAnchor",
    value: function(n, i) {
      return n > i ? "start" : n < i ? "end" : "middle"
    }
  }, {
    key: "renderLabelLineItem",
    value: function(n, i, o) {
      if (ut.isValidElement(n)) return ut.cloneElement(n, i);
      if ((0, ji.default)(n)) return n(i);
      var a = ne("recharts-pie-label-line", typeof n != "boolean" ? n.className : "");
      return ut.createElement(dn, ki({}, i, {
        key: o,
        type: "linear",
        className: a
      }))
    }
  }, {
    key: "renderLabelItem",
    value: function(n, i, o) {
      if (ut.isValidElement(n)) return ut.cloneElement(n, i);
      var a = o;
      if ((0, ji.default)(n) && (a = n(i), ut.isValidElement(a))) return a;
      var u = ne("recharts-pie-label-text", typeof n != "boolean" && !(0, ji.default)(n) ? n.className : "");
      return ut.createElement(dt, ki({}, i, {
        alignmentBaseline: "middle",
        className: u
      }), a)
    }
  }])
}(z4);
al = It;
Ct(It, "displayName", "Pie");
Ct(It, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: !0,
  hide: !1,
  minAngle: 0,
  isAnimationActive: !ze.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: !1,
  rootTabIndex: 0
});
Ct(It, "parseDeltaAngle", function(e, t) {
  var r = Me(t - e),
    n = Math.min(Math.abs(t - e), 360);
  return r * n
});
Ct(It, "getRealPieData", function(e) {
  var t = e.data,
    r = e.children,
    n = Q(e, !1),
    i = Ie(r, Tr);
  return t && t.length ? t.map(function(o, a) {
    return Ae(Ae(Ae({
      payload: o
    }, n), o), i && i[a] && i[a].props)
  }) : i && i.length ? i.map(function(o) {
    return Ae(Ae({}, n), o.props)
  }) : []
});
Ct(It, "parseCoordinateOfPie", function(e, t) {
  var r = t.top,
    n = t.left,
    i = t.width,
    o = t.height,
    a = zp(i, o),
    u = n + Ce(e.cx, i, i / 2),
    s = r + Ce(e.cy, o, o / 2),
    l = Ce(e.innerRadius, a, 0),
    f = Ce(e.outerRadius, a, a * .8),
    c = e.maxRadius || Math.sqrt(i * i + o * o) / 2;
  return {
    cx: u,
    cy: s,
    innerRadius: l,
    outerRadius: f,
    maxRadius: c
  }
});
Ct(It, "getComposedData", function(e) {
  var t = e.item,
    r = e.offset,
    n = t.type.defaultProps !== void 0 ? Ae(Ae({}, t.type.defaultProps), t.props) : t.props,
    i = al.getRealPieData(n);
  if (!i || !i.length) return null;
  var o = n.cornerRadius,
    a = n.startAngle,
    u = n.endAngle,
    s = n.paddingAngle,
    l = n.dataKey,
    f = n.nameKey,
    c = n.valueKey,
    p = n.tooltipType,
    h = Math.abs(n.minAngle),
    g = al.parseCoordinateOfPie(n, r),
    m = al.parseDeltaAngle(a, u),
    b = Math.abs(m),
    w = l;
  (0, xn.default)(l) && (0, xn.default)(c) ? (qe(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), w = "value") : (0, xn.default)(l) && (qe(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), w = c);
  var A = i.filter(function(M) {
      return je(M, w, 0) !== 0
    }).length,
    T = (b >= 360 ? A : A - 1) * s,
    E = b - A * h - T,
    y = i.reduce(function(M, N) {
      var B = je(N, w, 0);
      return M + (V(B) ? B : 0)
    }, 0),
    v;
  if (y > 0) {
    var j;
    v = i.map(function(M, N) {
      var B = je(M, w, 0),
        $ = je(M, f, N),
        R = (V(B) ? B : 0) / y,
        z;
      N ? z = j.endAngle + Me(m) * s * (B !== 0 ? 1 : 0) : z = a;
      var H = z + Me(m) * ((B !== 0 ? h : 0) + R * E),
        W = (z + H) / 2,
        S = (g.innerRadius + g.outerRadius) / 2,
        d = [{
          name: $,
          value: B,
          payload: M,
          dataKey: w,
          type: p
        }],
        O = de(g.cx, g.cy, S, W);
      return j = Ae(Ae(Ae({
        percent: R,
        cornerRadius: o,
        name: $,
        tooltipPayload: d,
        midAngle: W,
        middleRadius: S,
        tooltipPosition: O
      }, M), g), {}, {
        value: je(M, w),
        startAngle: z,
        endAngle: H,
        payload: M,
        paddingAngle: Me(m) * s
      }), j
    })
  }
  return Ae(Ae({}, g), {}, {
    sectors: v,
    data: i
  })
});
import Ye, {
  PureComponent as f5,
  Children as p5
} from "./react-shim-eraudit.js";
var Od = J(_e()),
  xA = J(bd());

function Ca(e) {
  "@babel/helpers - typeof";
  return Ca = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ca(e)
}

function fA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function pA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fA(Object(r), !0).forEach(function(n) {
      dA(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function dA(e, t, r) {
  return t = t5(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function t5(e) {
  var t = r5(e, "string");
  return Ca(t) == "symbol" ? t : t + ""
}

function r5(e, t) {
  if (Ca(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ca(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var n5 = ["Webkit", "Moz", "O", "ms"],
  mA = function(t, r) {
    if (!t) return null;
    var n = t.replace(/(\w)/, function(o) {
        return o.toUpperCase()
      }),
      i = n5.reduce(function(o, a) {
        return pA(pA({}, o), {}, dA({}, a + n, r))
      }, {});
    return i[t] = r, i
  };

function Ci(e) {
  "@babel/helpers - typeof";
  return Ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ci(e)
}

function sl() {
  return sl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, sl.apply(this, arguments)
}

function hA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function xd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hA(Object(r), !0).forEach(function(n) {
      bt(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function i5(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function yA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, bA(n.key), n)
  }
}

function o5(e, t, r) {
  return t && yA(e.prototype, t), r && yA(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function a5(e, t, r) {
  return t = ll(t), u5(e, gA() ? Reflect.construct(t, r || [], ll(e).constructor) : t.apply(e, r))
}

function u5(e, t) {
  if (t && (Ci(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return s5(e)
}

function s5(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function gA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (gA = function() {
    return !!e
  })()
}

function ll(e) {
  return ll = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ll(e)
}

function l5(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && wd(e, t)
}

function wd(e, t) {
  return wd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, wd(e, t)
}

function bt(e, t, r) {
  return t = bA(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function bA(e) {
  var t = c5(e, "string");
  return Ci(t) == "symbol" ? t : t + ""
}

function c5(e, t) {
  if (Ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var d5 = function(t) {
    var r = t.data,
      n = t.startIndex,
      i = t.endIndex,
      o = t.x,
      a = t.width,
      u = t.travellerWidth;
    if (!r || !r.length) return {};
    var s = r.length,
      l = Er().domain((0, xA.default)(0, s)).range([o, o + a - u]),
      f = l.domain().map(function(c) {
        return l(c)
      });
    return {
      isTextActive: !1,
      isSlideMoving: !1,
      isTravellerMoving: !1,
      isTravellerFocused: !1,
      startX: l(n),
      endX: l(i),
      scale: l,
      scaleValues: f
    }
  },
  vA = function(t) {
    return t.changedTouches && !!t.changedTouches.length
  },
  wn = function(e) {
    function t(r) {
      var n;
      return i5(this, t), n = a5(this, t, [r]), bt(n, "handleDrag", function(i) {
        n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(i) : n.state.isSlideMoving && n.handleSlideDrag(i)
      }), bt(n, "handleTouchMove", function(i) {
        i.changedTouches != null && i.changedTouches.length > 0 && n.handleDrag(i.changedTouches[0])
      }), bt(n, "handleDragEnd", function() {
        n.setState({
          isTravellerMoving: !1,
          isSlideMoving: !1
        }, function() {
          var i = n.props,
            o = i.endIndex,
            a = i.onDragEnd,
            u = i.startIndex;
          a?.({
            endIndex: o,
            startIndex: u
          })
        }), n.detachDragEndListener()
      }), bt(n, "handleLeaveWrapper", function() {
        (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut))
      }), bt(n, "handleEnterSlideOrTraveller", function() {
        n.setState({
          isTextActive: !0
        })
      }), bt(n, "handleLeaveSlideOrTraveller", function() {
        n.setState({
          isTextActive: !1
        })
      }), bt(n, "handleSlideDragStart", function(i) {
        var o = vA(i) ? i.changedTouches[0] : i;
        n.setState({
          isTravellerMoving: !1,
          isSlideMoving: !0,
          slideMoveStartX: o.pageX
        }), n.attachDragEndListener()
      }), n.travellerDragStartHandlers = {
        startX: n.handleTravellerDragStart.bind(n, "startX"),
        endX: n.handleTravellerDragStart.bind(n, "endX")
      }, n.state = {}, n
    }
    return l5(t, e), o5(t, [{
      key: "componentWillUnmount",
      value: function() {
        this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener()
      }
    }, {
      key: "getIndex",
      value: function(n) {
        var i = n.startX,
          o = n.endX,
          a = this.state.scaleValues,
          u = this.props,
          s = u.gap,
          l = u.data,
          f = l.length - 1,
          c = Math.min(i, o),
          p = Math.max(i, o),
          h = t.getIndexInRange(a, c),
          g = t.getIndexInRange(a, p);
        return {
          startIndex: h - h % s,
          endIndex: g === f ? f : g - g % s
        }
      }
    }, {
      key: "getTextOfTick",
      value: function(n) {
        var i = this.props,
          o = i.data,
          a = i.tickFormatter,
          u = i.dataKey,
          s = je(o[n], u, n);
        return (0, Od.default)(a) ? a(s, n) : s
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
      value: function(n) {
        var i = this.state,
          o = i.slideMoveStartX,
          a = i.startX,
          u = i.endX,
          s = this.props,
          l = s.x,
          f = s.width,
          c = s.travellerWidth,
          p = s.startIndex,
          h = s.endIndex,
          g = s.onChange,
          m = n.pageX - o;
        m > 0 ? m = Math.min(m, l + f - c - u, l + f - c - a) : m < 0 && (m = Math.max(m, l - a, l - u));
        var b = this.getIndex({
          startX: a + m,
          endX: u + m
        });
        (b.startIndex !== p || b.endIndex !== h) && g && g(b), this.setState({
          startX: a + m,
          endX: u + m,
          slideMoveStartX: n.pageX
        })
      }
    }, {
      key: "handleTravellerDragStart",
      value: function(n, i) {
        var o = vA(i) ? i.changedTouches[0] : i;
        this.setState({
          isSlideMoving: !1,
          isTravellerMoving: !0,
          movingTravellerId: n,
          brushMoveStartX: o.pageX
        }), this.attachDragEndListener()
      }
    }, {
      key: "handleTravellerMove",
      value: function(n) {
        var i = this.state,
          o = i.brushMoveStartX,
          a = i.movingTravellerId,
          u = i.endX,
          s = i.startX,
          l = this.state[a],
          f = this.props,
          c = f.x,
          p = f.width,
          h = f.travellerWidth,
          g = f.onChange,
          m = f.gap,
          b = f.data,
          w = {
            startX: this.state.startX,
            endX: this.state.endX
          },
          A = n.pageX - o;
        A > 0 ? A = Math.min(A, c + p - h - l) : A < 0 && (A = Math.max(A, c - l)), w[a] = l + A;
        var T = this.getIndex(w),
          E = T.startIndex,
          y = T.endIndex,
          v = function() {
            var M = b.length - 1;
            return a === "startX" && (u > s ? E % m === 0 : y % m === 0) || u < s && y === M || a === "endX" && (u > s ? y % m === 0 : E % m === 0) || u > s && y === M
          };
        this.setState(bt(bt({}, a, l + A), "brushMoveStartX", n.pageX), function() {
          g && v() && g(T)
        })
      }
    }, {
      key: "handleTravellerMoveKeyboard",
      value: function(n, i) {
        var o = this,
          a = this.state,
          u = a.scaleValues,
          s = a.startX,
          l = a.endX,
          f = this.state[i],
          c = u.indexOf(f);
        if (c !== -1) {
          var p = c + n;
          if (!(p === -1 || p >= u.length)) {
            var h = u[p];
            i === "startX" && h >= l || i === "endX" && h <= s || this.setState(bt({}, i, h), function() {
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
        var n = this.props,
          i = n.x,
          o = n.y,
          a = n.width,
          u = n.height,
          s = n.fill,
          l = n.stroke;
        return Ye.createElement("rect", {
          stroke: l,
          fill: s,
          x: i,
          y: o,
          width: a,
          height: u
        })
      }
    }, {
      key: "renderPanorama",
      value: function() {
        var n = this.props,
          i = n.x,
          o = n.y,
          a = n.width,
          u = n.height,
          s = n.data,
          l = n.children,
          f = n.padding,
          c = p5.only(l);
        return c ? Ye.cloneElement(c, {
          x: i,
          y: o,
          width: a,
          height: u,
          margin: f,
          compact: !0,
          data: s
        }) : null
      }
    }, {
      key: "renderTravellerLayer",
      value: function(n, i) {
        var o, a, u = this,
          s = this.props,
          l = s.y,
          f = s.travellerWidth,
          c = s.height,
          p = s.traveller,
          h = s.ariaLabel,
          g = s.data,
          m = s.startIndex,
          b = s.endIndex,
          w = Math.max(n, this.props.x),
          A = xd(xd({}, Q(this.props, !1)), {}, {
            x: w,
            y: l,
            width: f,
            height: c
          }),
          T = h || "Min value: ".concat((o = g[m]) === null || o === void 0 ? void 0 : o.name, ", Max value: ").concat((a = g[b]) === null || a === void 0 ? void 0 : a.name);
        return Ye.createElement(le, {
          tabIndex: 0,
          role: "slider",
          "aria-label": T,
          "aria-valuenow": n,
          className: "recharts-brush-traveller",
          onMouseEnter: this.handleEnterSlideOrTraveller,
          onMouseLeave: this.handleLeaveSlideOrTraveller,
          onMouseDown: this.travellerDragStartHandlers[i],
          onTouchStart: this.travellerDragStartHandlers[i],
          onKeyDown: function(y) {
            ["ArrowLeft", "ArrowRight"].includes(y.key) && (y.preventDefault(), y.stopPropagation(), u.handleTravellerMoveKeyboard(y.key === "ArrowRight" ? 1 : -1, i))
          },
          onFocus: function() {
            u.setState({
              isTravellerFocused: !0
            })
          },
          onBlur: function() {
            u.setState({
              isTravellerFocused: !1
            })
          },
          style: {
            cursor: "col-resize"
          }
        }, t.renderTraveller(p, A))
      }
    }, {
      key: "renderSlide",
      value: function(n, i) {
        var o = this.props,
          a = o.y,
          u = o.height,
          s = o.stroke,
          l = o.travellerWidth,
          f = Math.min(n, i) + l,
          c = Math.max(Math.abs(i - n) - l, 0);
        return Ye.createElement("rect", {
          className: "recharts-brush-slide",
          onMouseEnter: this.handleEnterSlideOrTraveller,
          onMouseLeave: this.handleLeaveSlideOrTraveller,
          onMouseDown: this.handleSlideDragStart,
          onTouchStart: this.handleSlideDragStart,
          style: {
            cursor: "move"
          },
          stroke: "none",
          fill: s,
          fillOpacity: .2,
          x: f,
          y: a,
          width: c,
          height: u
        })
      }
    }, {
      key: "renderText",
      value: function() {
        var n = this.props,
          i = n.startIndex,
          o = n.endIndex,
          a = n.y,
          u = n.height,
          s = n.travellerWidth,
          l = n.stroke,
          f = this.state,
          c = f.startX,
          p = f.endX,
          h = 5,
          g = {
            pointerEvents: "none",
            fill: l
          };
        return Ye.createElement(le, {
          className: "recharts-brush-texts"
        }, Ye.createElement(dt, sl({
          textAnchor: "end",
          verticalAnchor: "middle",
          x: Math.min(c, p) - h,
          y: a + u / 2
        }, g), this.getTextOfTick(i)), Ye.createElement(dt, sl({
          textAnchor: "start",
          verticalAnchor: "middle",
          x: Math.max(c, p) + s + h,
          y: a + u / 2
        }, g), this.getTextOfTick(o)))
      }
    }, {
      key: "render",
      value: function() {
        var n = this.props,
          i = n.data,
          o = n.className,
          a = n.children,
          u = n.x,
          s = n.y,
          l = n.width,
          f = n.height,
          c = n.alwaysShowText,
          p = this.state,
          h = p.startX,
          g = p.endX,
          m = p.isTextActive,
          b = p.isSlideMoving,
          w = p.isTravellerMoving,
          A = p.isTravellerFocused;
        if (!i || !i.length || !V(u) || !V(s) || !V(l) || !V(f) || l <= 0 || f <= 0) return null;
        var T = ne("recharts-brush", o),
          E = Ye.Children.count(a) === 1,
          y = mA("userSelect", "none");
        return Ye.createElement(le, {
          className: T,
          onMouseLeave: this.handleLeaveWrapper,
          onTouchMove: this.handleTouchMove,
          style: y
        }, this.renderBackground(), E && this.renderPanorama(), this.renderSlide(h, g), this.renderTravellerLayer(h, "startX"), this.renderTravellerLayer(g, "endX"), (m || b || w || A || c) && this.renderText())
      }
    }], [{
      key: "renderDefaultTraveller",
      value: function(n) {
        var i = n.x,
          o = n.y,
          a = n.width,
          u = n.height,
          s = n.stroke,
          l = Math.floor(o + u / 2) - 1;
        return Ye.createElement(Ye.Fragment, null, Ye.createElement("rect", {
          x: i,
          y: o,
          width: a,
          height: u,
          fill: s,
          stroke: "none"
        }), Ye.createElement("line", {
          x1: i + 1,
          y1: l,
          x2: i + a - 1,
          y2: l,
          fill: "none",
          stroke: "#fff"
        }), Ye.createElement("line", {
          x1: i + 1,
          y1: l + 2,
          x2: i + a - 1,
          y2: l + 2,
          fill: "none",
          stroke: "#fff"
        }))
      }
    }, {
      key: "renderTraveller",
      value: function(n, i) {
        var o;
        return Ye.isValidElement(n) ? o = Ye.cloneElement(n, i) : (0, Od.default)(n) ? o = n(i) : o = t.renderDefaultTraveller(i), o
      }
    }, {
      key: "getDerivedStateFromProps",
      value: function(n, i) {
        var o = n.data,
          a = n.width,
          u = n.x,
          s = n.travellerWidth,
          l = n.updateId,
          f = n.startIndex,
          c = n.endIndex;
        if (o !== i.prevData || l !== i.prevUpdateId) return xd({
          prevData: o,
          prevTravellerWidth: s,
          prevUpdateId: l,
          prevX: u,
          prevWidth: a
        }, o && o.length ? d5({
          data: o,
          width: a,
          x: u,
          travellerWidth: s,
          startIndex: f,
          endIndex: c
        }) : {
          scale: null,
          scaleValues: null
        });
        if (i.scale && (a !== i.prevWidth || u !== i.prevX || s !== i.prevTravellerWidth)) {
          i.scale.range([u, u + a - s]);
          var p = i.scale.domain().map(function(h) {
            return i.scale(h)
          });
          return {
            prevData: o,
            prevTravellerWidth: s,
            prevUpdateId: l,
            prevX: u,
            prevWidth: a,
            startX: i.scale(n.startIndex),
            endX: i.scale(n.endIndex),
            scaleValues: p
          }
        }
        return null
      }
    }, {
      key: "getIndexInRange",
      value: function(n, i) {
        for (var o = n.length, a = 0, u = o - 1; u - a > 1;) {
          var s = Math.floor((a + u) / 2);
          n[s] > i ? u = s : a = s
        }
        return i >= n[u] ? u : a
      }
    }])
  }(f5);
bt(wn, "displayName", "Brush");
bt(wn, "defaultProps", {
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
var TP = J(_e()),
  _P = J(AA());
import Li from "./react-shim-eraudit.js";
var st = function(t, r) {
  var n = t.alwaysShow,
    i = t.ifOverflow;
  return n && (i = "extendDomain"), i === r
};
var KA = J(jA()),
  VA = J(Sd());
import Nt, {
  PureComponent as e6
} from "./react-shim-eraudit.js";
var WA = J(hi()),
  zA = J(ft());
import W5 from "./react-shim-eraudit.js";
var R5 = ["x", "y"];

function Na(e) {
  "@babel/helpers - typeof";
  return Na = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Na(e)
}

function Ad() {
  return Ad = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ad.apply(this, arguments)
}

function DA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ia(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? DA(Object(r), !0).forEach(function(n) {
      L5(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : DA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function L5(e, t, r) {
  return t = B5(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function B5(e) {
  var t = q5(e, "string");
  return Na(t) == "symbol" ? t : t + ""
}

function q5(e, t) {
  if (Na(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Na(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function $5(e, t) {
  if (e == null) return {};
  var r = F5(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function F5(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function z5(e, t) {
  var r = e.x,
    n = e.y,
    i = $5(e, R5),
    o = "".concat(r),
    a = parseInt(o, 10),
    u = "".concat(n),
    s = parseInt(u, 10),
    l = "".concat(t.height || i.height),
    f = parseInt(l, 10),
    c = "".concat(t.width || i.width),
    p = parseInt(c, 10);
  return Ia(Ia(Ia(Ia(Ia({}, t), i), a ? {
    x: a
  } : {}), s ? {
    y: s
  } : {}), {}, {
    height: f,
    width: p,
    name: t.name,
    radius: t.radius
  })
}

function Pd(e) {
  return W5.createElement(ol, Ad({
    shapeType: "rectangle",
    propTransformer: z5,
    activeClassName: "recharts-active-bar"
  }, e))
}
var RA = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, i) {
    if (typeof t == "number") return t;
    var o = V(n) || Jh(n);
    return o ? t(n, i) : (o || Ht(!1), r)
  }
};
var H5 = ["value", "background"],
  qA;

function Ii(e) {
  "@babel/helpers - typeof";
  return Ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ii(e)
}

function U5(e, t) {
  if (e == null) return {};
  var r = G5(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function G5(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function cl() {
  return cl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, cl.apply(this, arguments)
}

function LA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function De(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? LA(Object(r), !0).forEach(function(n) {
      Lr(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : LA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function K5(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function BA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, FA(n.key), n)
  }
}

function V5(e, t, r) {
  return t && BA(e.prototype, t), r && BA(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function Y5(e, t, r) {
  return t = fl(t), X5(e, $A() ? Reflect.construct(t, r || [], fl(e).constructor) : t.apply(e, r))
}

function X5(e, t) {
  if (t && (Ii(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Z5(e)
}

function Z5(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function $A() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return ($A = function() {
    return !!e
  })()
}

function fl(e) {
  return fl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, fl(e)
}

function J5(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Td(e, t)
}

function Td(e, t) {
  return Td = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Td(e, t)
}

function Lr(e, t, r) {
  return t = FA(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function FA(e) {
  var t = Q5(e, "string");
  return Ii(t) == "symbol" ? t : t + ""
}

function Q5(e, t) {
  if (Ii(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var We = function(e) {
  function t() {
    var r;
    K5(this, t);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = Y5(this, t, [].concat(i)), Lr(r, "state", {
      isAnimationFinished: !1
    }), Lr(r, "id", St("recharts-bar-")), Lr(r, "handleAnimationEnd", function() {
      var a = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), a && a()
    }), Lr(r, "handleAnimationStart", function() {
      var a = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), a && a()
    }), r
  }
  return J5(t, e), V5(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var i = this,
        o = this.props,
        a = o.shape,
        u = o.dataKey,
        s = o.activeIndex,
        l = o.activeBar,
        f = Q(this.props, !1);
      return n && n.map(function(c, p) {
        var h = p === s,
          g = h ? l : a,
          m = De(De(De({}, f), c), {}, {
            isActive: h,
            option: g,
            index: p,
            dataKey: u,
            onAnimationStart: i.handleAnimationStart,
            onAnimationEnd: i.handleAnimationEnd
          });
        return Nt.createElement(le, cl({
          className: "recharts-bar-rectangle"
        }, pt(i.props, c, p), {
          key: "rectangle-".concat(c?.x, "-").concat(c?.y, "-").concat(c?.value, "-").concat(p)
        }), Nt.createElement(Pd, m))
      })
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var n = this,
        i = this.props,
        o = i.data,
        a = i.layout,
        u = i.isAnimationActive,
        s = i.animationBegin,
        l = i.animationDuration,
        f = i.animationEasing,
        c = i.animationId,
        p = this.state.prevData;
      return Nt.createElement(Mt, {
        begin: s,
        duration: l,
        isActive: u,
        easing: f,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "bar-".concat(c),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(h) {
        var g = h.t,
          m = o.map(function(b, w) {
            var A = p && p[w];
            if (A) {
              var T = Ge(A.x, b.x),
                E = Ge(A.y, b.y),
                y = Ge(A.width, b.width),
                v = Ge(A.height, b.height);
              return De(De({}, b), {}, {
                x: T(g),
                y: E(g),
                width: y(g),
                height: v(g)
              })
            }
            if (a === "horizontal") {
              var j = Ge(0, b.height),
                M = j(g);
              return De(De({}, b), {}, {
                y: b.y + b.height - M,
                height: M
              })
            }
            var N = Ge(0, b.width),
              B = N(g);
            return De(De({}, b), {}, {
              width: B
            })
          });
        return Nt.createElement(le, null, n.renderRectanglesStatically(m))
      })
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props,
        i = n.data,
        o = n.isAnimationActive,
        a = this.state.prevData;
      return o && i && i.length && (!a || !(0, WA.default)(a, i)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(i)
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this,
        i = this.props,
        o = i.data,
        a = i.dataKey,
        u = i.activeIndex,
        s = Q(this.props.background, !1);
      return o.map(function(l, f) {
        var c = l.value,
          p = l.background,
          h = U5(l, H5);
        if (!p) return null;
        var g = De(De(De(De(De({}, h), {}, {
          fill: "#eee"
        }, p), s), pt(n.props, l, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: a,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return Nt.createElement(Pd, cl({
          key: "background-bar-".concat(f),
          option: n.props.background,
          isActive: f === u
        }, g))
      })
    }
  }, {
    key: "renderErrorBar",
    value: function(n, i) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
      var o = this.props,
        a = o.data,
        u = o.xAxis,
        s = o.yAxis,
        l = o.layout,
        f = o.children,
        c = Ie(f, Nr);
      if (!c) return null;
      var p = l === "vertical" ? a[0].height / 2 : a[0].width / 2,
        h = function(b, w) {
          var A = Array.isArray(b.value) ? b.value[1] : b.value;
          return {
            x: b.x,
            y: b.y,
            value: A,
            errorVal: je(b, w)
          }
        },
        g = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return Nt.createElement(le, g, c.map(function(m) {
        return Nt.cloneElement(m, {
          key: "error-bar-".concat(i, "-").concat(m.props.dataKey),
          data: a,
          xAxis: u,
          yAxis: s,
          layout: l,
          offset: p,
          dataPointFormatter: h
        })
      }))
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props,
        i = n.hide,
        o = n.data,
        a = n.className,
        u = n.xAxis,
        s = n.yAxis,
        l = n.left,
        f = n.top,
        c = n.width,
        p = n.height,
        h = n.isAnimationActive,
        g = n.background,
        m = n.id;
      if (i || !o || !o.length) return null;
      var b = this.state.isAnimationFinished,
        w = ne("recharts-bar", a),
        A = u && u.allowDataOverflow,
        T = s && s.allowDataOverflow,
        E = A || T,
        y = (0, zA.default)(m) ? this.id : m;
      return Nt.createElement(le, {
        className: w
      }, A || T ? Nt.createElement("defs", null, Nt.createElement("clipPath", {
        id: "clipPath-".concat(y)
      }, Nt.createElement("rect", {
        x: A ? l : l - c / 2,
        y: T ? f : f - p / 2,
        width: A ? c : c * 2,
        height: T ? p : p * 2
      }))) : null, Nt.createElement(le, {
        className: "recharts-bar-rectangles",
        clipPath: E ? "url(#clipPath-".concat(y, ")") : null
      }, g ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(E, y), (!h || b) && Ne.renderCallByParent(this.props, o))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curData: n.data,
        prevData: i.curData
      } : n.data !== i.curData ? {
        curData: n.data
      } : null
    }
  }])
}(e6);
qA = We;
Lr(We, "displayName", "Bar");
Lr(We, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !ze.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
Lr(We, "getComposedData", function(e) {
  var t = e.props,
    r = e.item,
    n = e.barPosition,
    i = e.bandSize,
    o = e.xAxis,
    a = e.yAxis,
    u = e.xAxisTicks,
    s = e.yAxisTicks,
    l = e.stackedData,
    f = e.dataStartIndex,
    c = e.displayedData,
    p = e.offset,
    h = Gw(n, r);
  if (!h) return null;
  var g = t.layout,
    m = r.type.defaultProps,
    b = m !== void 0 ? De(De({}, m), r.props) : r.props,
    w = b.dataKey,
    A = b.children,
    T = b.minPointSize,
    E = g === "horizontal" ? a : o,
    y = l ? E.scale.domain() : null,
    v = Yw({
      numericAxis: E
    }),
    j = Ie(A, Tr),
    M = c.map(function(N, B) {
      var $, R, z, H, W, S;
      l ? $ = Kw(l[f + B], y) : ($ = je(N, w), Array.isArray($) || ($ = [v, $]));
      var d = RA(T, qA.defaultProps.minPointSize)($[1], B);
      if (g === "horizontal") {
        var O, P = [a.scale($[0]), a.scale($[1])],
          x = P[0],
          _ = P[1];
        R = $p({
          axis: o,
          ticks: u,
          bandSize: i,
          offset: h.offset,
          entry: N,
          index: B
        }), z = (O = _ ?? x) !== null && O !== void 0 ? O : void 0, H = h.size;
        var C = x - _;
        if (W = Number.isNaN(C) ? 0 : C, S = {
            x: R,
            y: a.y,
            width: H,
            height: a.height
          }, Math.abs(d) > 0 && Math.abs(W) < Math.abs(d)) {
          var D = Me(W || d) * (Math.abs(d) - Math.abs(W));
          z -= D, W += D
        }
      } else {
        var F = [o.scale($[0]), o.scale($[1])],
          Y = F[0],
          X = F[1];
        if (R = Y, z = $p({
            axis: a,
            ticks: s,
            bandSize: i,
            offset: h.offset,
            entry: N,
            index: B
          }), H = X - Y, W = h.size, S = {
            x: o.x,
            y: z,
            width: o.width,
            height: W
          }, Math.abs(d) > 0 && Math.abs(H) < Math.abs(d)) {
          var re = Me(H || d) * (Math.abs(d) - Math.abs(H));
          H += re
        }
      }
      return De(De(De({}, N), {}, {
        x: R,
        y: z,
        width: H,
        height: W,
        value: l ? $ : $[1],
        payload: N,
        background: S
      }, j && j[B] && j[B].props), {}, {
        tooltipPayload: [Rs(r, N)],
        tooltipPosition: {
          x: R + H / 2,
          y: z + W / 2
        }
      })
    });
  return De({
    data: M,
    layout: g
  }, p)
});

function Da(e) {
  "@babel/helpers - typeof";
  return Da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Da(e)
}

function t6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function HA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, GA(n.key), n)
  }
}

function r6(e, t, r) {
  return t && HA(e.prototype, t), r && HA(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function UA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Gt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? UA(Object(r), !0).forEach(function(n) {
      pl(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : UA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function pl(e, t, r) {
  return t = GA(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function GA(e) {
  var t = n6(e, "string");
  return Da(t) == "symbol" ? t : t + ""
}

function n6(e, t) {
  if (Da(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Da(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var dl = function(t, r, n, i, o) {
    var a = t.width,
      u = t.height,
      s = t.layout,
      l = t.children,
      f = Object.keys(r),
      c = {
        left: n.left,
        leftMirror: n.left,
        right: a - n.right,
        rightMirror: a - n.right,
        top: n.top,
        topMirror: n.top,
        bottom: u - n.bottom,
        bottomMirror: u - n.bottom
      },
      p = !!Ke(l, We);
    return f.reduce(function(h, g) {
      var m = r[g],
        b = m.orientation,
        w = m.domain,
        A = m.padding,
        T = A === void 0 ? {} : A,
        E = m.mirror,
        y = m.reversed,
        v = "".concat(b).concat(E ? "Mirror" : ""),
        j, M, N, B, $;
      if (m.type === "number" && (m.padding === "gap" || m.padding === "no-gap")) {
        var R = w[1] - w[0],
          z = 1 / 0,
          H = m.categoricalDomain.sort(ey);
        if (H.forEach(function(F, Y) {
            Y > 0 && (z = Math.min((F || 0) - (H[Y - 1] || 0), z))
          }), Number.isFinite(z)) {
          var W = z / R,
            S = m.layout === "vertical" ? n.height : n.width;
          if (m.padding === "gap" && (j = W * S / 2), m.padding === "no-gap") {
            var d = Ce(t.barCategoryGap, W * S),
              O = W * S / 2;
            j = O - d - (O - d) / S * d
          }
        }
      }
      i === "xAxis" ? M = [n.left + (T.left || 0) + (j || 0), n.left + n.width - (T.right || 0) - (j || 0)] : i === "yAxis" ? M = s === "horizontal" ? [n.top + n.height - (T.bottom || 0), n.top + (T.top || 0)] : [n.top + (T.top || 0) + (j || 0), n.top + n.height - (T.bottom || 0) - (j || 0)] : M = m.range, y && (M = [M[1], M[0]]);
      var P = Cs(m, o, p),
        x = P.scale,
        _ = P.realScaleType;
      x.domain(w).range(M), Is(x);
      var C = Ns(x, Gt(Gt({}, m), {}, {
        realScaleType: _
      }));
      i === "xAxis" ? ($ = b === "top" && !E || b === "bottom" && E, N = n.left, B = c[v] - $ * m.height) : i === "yAxis" && ($ = b === "left" && !E || b === "right" && E, N = c[v] - $ * m.width, B = n.top);
      var D = Gt(Gt(Gt({}, m), C), {}, {
        realScaleType: _,
        x: N,
        y: B,
        scale: x,
        width: i === "xAxis" ? n.width : m.width,
        height: i === "yAxis" ? n.height : m.height
      });
      return D.bandSize = xi(D, C), !m.hide && i === "xAxis" ? c[v] += ($ ? -1 : 1) * D.height : m.hide || (c[v] += ($ ? -1 : 1) * D.width), Gt(Gt({}, h), {}, pl({}, g, D))
    }, {})
  },
  _d = function(t, r) {
    var n = t.x,
      i = t.y,
      o = r.x,
      a = r.y;
    return {
      x: Math.min(n, o),
      y: Math.min(i, a),
      width: Math.abs(o - n),
      height: Math.abs(a - i)
    }
  },
  YA = function(t) {
    var r = t.x1,
      n = t.y1,
      i = t.x2,
      o = t.y2;
    return _d({
      x: r,
      y: n
    }, {
      x: i,
      y: o
    })
  },
  XA = function() {
    function e(t) {
      t6(this, e), this.scale = t
    }
    return r6(e, [{
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
      value: function(r) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          i = n.bandAware,
          o = n.position;
        if (r !== void 0) {
          if (o) switch (o) {
            case "start":
              return this.scale(r);
            case "middle": {
              var a = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(r) + a
            }
            case "end": {
              var u = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(r) + u
            }
            default:
              return this.scale(r)
          }
          if (i) {
            var s = this.bandwidth ? this.bandwidth() / 2 : 0;
            return this.scale(r) + s
          }
          return this.scale(r)
        }
      }
    }, {
      key: "isInRange",
      value: function(r) {
        var n = this.range(),
          i = n[0],
          o = n[n.length - 1];
        return i <= o ? r >= i && r <= o : r >= o && r <= i
      }
    }], [{
      key: "create",
      value: function(r) {
        return new e(r)
      }
    }])
  }();
pl(XA, "EPS", 1e-4);
var Ni = function(t) {
  var r = Object.keys(t).reduce(function(n, i) {
    return Gt(Gt({}, n), {}, pl({}, i, XA.create(t[i])))
  }, {});
  return Gt(Gt({}, r), {}, {
    apply: function(i) {
      var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        a = o.bandAware,
        u = o.position;
      return (0, KA.default)(i, function(s, l) {
        return r[l].apply(s, {
          bandAware: a,
          position: u
        })
      })
    },
    isInRange: function(i) {
      return (0, VA.default)(i, function(o, a) {
        return r[a].isInRange(o)
      })
    }
  })
};

function i6(e) {
  return (e % 180 + 180) % 180
}
var ZA = function(t) {
  var r = t.width,
    n = t.height,
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    o = i6(i),
    a = o * Math.PI / 180,
    u = Math.atan(n / r),
    s = a > u && a < Math.PI - u ? n / Math.sin(a) : r / Math.cos(a);
  return Math.abs(s)
};
import On, {
  createContext as Sn,
  useContext as xr
} from "./react-shim-eraudit.js";
var sP = J(oP()),
  lP = J(Sd());
var aP = J(Gl()),
  uP = (0, aP.default)(function(e) {
    return {
      x: e.left,
      y: e.top,
      width: e.width,
      height: e.height
    }
  }, function(e) {
    return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("")
  });
var Ed = Sn(void 0),
  jd = Sn(void 0),
  cP = Sn(void 0),
  fP = Sn({}),
  pP = Sn(void 0),
  dP = Sn(0),
  mP = Sn(0),
  kd = function(t) {
    var r = t.state,
      n = r.xAxisMap,
      i = r.yAxisMap,
      o = r.offset,
      a = t.clipPathId,
      u = t.children,
      s = t.width,
      l = t.height,
      f = uP(o);
    return On.createElement(Ed.Provider, {
      value: n
    }, On.createElement(jd.Provider, {
      value: i
    }, On.createElement(fP.Provider, {
      value: o
    }, On.createElement(cP.Provider, {
      value: f
    }, On.createElement(pP.Provider, {
      value: a
    }, On.createElement(dP.Provider, {
      value: l
    }, On.createElement(mP.Provider, {
      value: s
    }, u)))))))
  },
  hP = function() {
    return xr(pP)
  };
var ml = function(t) {
    var r = xr(Ed);
    r == null && Ht(!1);
    var n = r[t];
    return n == null && Ht(!1), n
  },
  yP = function() {
    var t = xr(Ed);
    return er(t)
  };
var vP = function() {
    var t = xr(jd),
      r = (0, sP.default)(t, function(n) {
        return (0, lP.default)(n.domain, Number.isFinite)
      });
    return r || er(t)
  },
  hl = function(t) {
    var r = xr(jd);
    r == null && Ht(!1);
    var n = r[t];
    return n == null && Ht(!1), n
  },
  gP = function() {
    var t = xr(cP);
    return t
  },
  bP = function() {
    return xr(fP)
  },
  Di = function() {
    return xr(mP)
  },
  Ri = function() {
    return xr(dP)
  };

function Bi(e) {
  "@babel/helpers - typeof";
  return Bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Bi(e)
}

function b6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function xP(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, PP(n.key), n)
  }
}

function x6(e, t, r) {
  return t && xP(e.prototype, t), r && xP(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function w6(e, t, r) {
  return t = yl(t), O6(e, AP() ? Reflect.construct(t, r || [], yl(e).constructor) : t.apply(e, r))
}

function O6(e, t) {
  if (t && (Bi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return S6(e)
}

function S6(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function AP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (AP = function() {
    return !!e
  })()
}

function yl(e) {
  return yl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, yl(e)
}

function A6(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Md(e, t)
}

function Md(e, t) {
  return Md = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Md(e, t)
}

function wP(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function OP(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wP(Object(r), !0).forEach(function(n) {
      Id(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wP(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Id(e, t, r) {
  return t = PP(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function PP(e) {
  var t = P6(e, "string");
  return Bi(t) == "symbol" ? t : t + ""
}

function P6(e, t) {
  if (Bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function T6(e, t) {
  return k6(e) || j6(e, t) || E6(e, t) || _6()
}

function _6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function E6(e, t) {
  if (e) {
    if (typeof e == "string") return SP(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return SP(e, t)
  }
}

function SP(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function j6(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function k6(e) {
  if (Array.isArray(e)) return e
}

function Cd() {
  return Cd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Cd.apply(this, arguments)
}
var M6 = function(t, r) {
    var n;
    return Li.isValidElement(t) ? n = Li.cloneElement(t, r) : (0, TP.default)(t) ? n = t(r) : n = Li.createElement("line", Cd({}, r, {
      className: "recharts-reference-line-line"
    })), n
  },
  C6 = function(t, r, n, i, o, a, u, s, l) {
    var f = o.x,
      c = o.y,
      p = o.width,
      h = o.height;
    if (n) {
      var g = l.y,
        m = t.y.apply(g, {
          position: a
        });
      if (st(l, "discard") && !t.y.isInRange(m)) return null;
      var b = [{
        x: f + p,
        y: m
      }, {
        x: f,
        y: m
      }];
      return s === "left" ? b.reverse() : b
    }
    if (r) {
      var w = l.x,
        A = t.x.apply(w, {
          position: a
        });
      if (st(l, "discard") && !t.x.isInRange(A)) return null;
      var T = [{
        x: A,
        y: c + h
      }, {
        x: A,
        y: c
      }];
      return u === "top" ? T.reverse() : T
    }
    if (i) {
      var E = l.segment,
        y = E.map(function(v) {
          return t.apply(v, {
            position: a
          })
        });
      return st(l, "discard") && (0, _P.default)(y, function(v) {
        return !t.isInRange(v)
      }) ? null : y
    }
    return null
  };

function I6(e) {
  var t = e.x,
    r = e.y,
    n = e.segment,
    i = e.xAxisId,
    o = e.yAxisId,
    a = e.shape,
    u = e.className,
    s = e.alwaysShow,
    l = hP(),
    f = ml(i),
    c = hl(o),
    p = gP();
  if (!l || !p) return null;
  qe(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var h = Ni({
      x: f.scale,
      y: c.scale
    }),
    g = Se(t),
    m = Se(r),
    b = n && n.length === 2,
    w = C6(h, g, m, b, p, e.position, f.orientation, c.orientation, e);
  if (!w) return null;
  var A = T6(w, 2),
    T = A[0],
    E = T.x,
    y = T.y,
    v = A[1],
    j = v.x,
    M = v.y,
    N = st(e, "hidden") ? "url(#".concat(l, ")") : void 0,
    B = OP(OP({
      clipPath: N
    }, Q(e, !0)), {}, {
      x1: E,
      y1: y,
      x2: j,
      y2: M
    });
  return Li.createElement(le, {
    className: ne("recharts-reference-line", u)
  }, M6(a, B), Te.renderCallByParent(e, YA({
    x1: E,
    y1: y,
    x2: j,
    y2: M
  })))
}
var vl = function(e) {
  function t() {
    return b6(this, t), w6(this, t, arguments)
  }
  return A6(t, e), x6(t, [{
    key: "render",
    value: function() {
      return Li.createElement(I6, this.props)
    }
  }])
}(Li.Component);
Id(vl, "displayName", "ReferenceLine");
Id(vl, "defaultProps", {
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
var IP = J(_e());
import Ra from "./react-shim-eraudit.js";

function Nd() {
  return Nd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Nd.apply(this, arguments)
}

function qi(e) {
  "@babel/helpers - typeof";
  return qi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, qi(e)
}

function EP(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function jP(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? EP(Object(r), !0).forEach(function(n) {
      bl(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : EP(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function N6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function kP(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, CP(n.key), n)
  }
}

function D6(e, t, r) {
  return t && kP(e.prototype, t), r && kP(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function R6(e, t, r) {
  return t = gl(t), L6(e, MP() ? Reflect.construct(t, r || [], gl(e).constructor) : t.apply(e, r))
}

function L6(e, t) {
  if (t && (qi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return B6(e)
}

function B6(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function MP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (MP = function() {
    return !!e
  })()
}

function gl(e) {
  return gl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, gl(e)
}

function q6(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Dd(e, t)
}

function Dd(e, t) {
  return Dd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Dd(e, t)
}

function bl(e, t, r) {
  return t = CP(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function CP(e) {
  var t = $6(e, "string");
  return qi(t) == "symbol" ? t : t + ""
}

function $6(e, t) {
  if (qi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (qi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var F6 = function(t) {
    var r = t.x,
      n = t.y,
      i = t.xAxis,
      o = t.yAxis,
      a = Ni({
        x: i.scale,
        y: o.scale
      }),
      u = a.apply({
        x: r,
        y: n
      }, {
        bandAware: !0
      });
    return st(t, "discard") && !a.isInRange(u) ? null : u
  },
  La = function(e) {
    function t() {
      return N6(this, t), R6(this, t, arguments)
    }
    return q6(t, e), D6(t, [{
      key: "render",
      value: function() {
        var n = this.props,
          i = n.x,
          o = n.y,
          a = n.r,
          u = n.alwaysShow,
          s = n.clipPathId,
          l = Se(i),
          f = Se(o);
        if (qe(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !l || !f) return null;
        var c = F6(this.props);
        if (!c) return null;
        var p = c.x,
          h = c.y,
          g = this.props,
          m = g.shape,
          b = g.className,
          w = st(this.props, "hidden") ? "url(#".concat(s, ")") : void 0,
          A = jP(jP({
            clipPath: w
          }, Q(this.props, !0)), {}, {
            cx: p,
            cy: h
          });
        return Ra.createElement(le, {
          className: ne("recharts-reference-dot", b)
        }, t.renderDot(m, A), Te.renderCallByParent(this.props, {
          x: p - a,
          y: h - a,
          width: 2 * a,
          height: 2 * a
        }))
      }
    }])
  }(Ra.Component);
bl(La, "displayName", "ReferenceDot");
bl(La, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1
});
bl(La, "renderDot", function(e, t) {
  var r;
  return Ra.isValidElement(e) ? r = Ra.cloneElement(e, t) : (0, IP.default)(e) ? r = e(t) : r = Ra.createElement(Rr, Nd({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r
});
var qP = J(_e());
import Ba from "./react-shim-eraudit.js";

function Rd() {
  return Rd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Rd.apply(this, arguments)
}

function $i(e) {
  "@babel/helpers - typeof";
  return $i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, $i(e)
}

function NP(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function DP(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? NP(Object(r), !0).forEach(function(n) {
      wl(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : NP(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function W6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function RP(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, BP(n.key), n)
  }
}

function z6(e, t, r) {
  return t && RP(e.prototype, t), r && RP(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function H6(e, t, r) {
  return t = xl(t), U6(e, LP() ? Reflect.construct(t, r || [], xl(e).constructor) : t.apply(e, r))
}

function U6(e, t) {
  if (t && ($i(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return G6(e)
}

function G6(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function LP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (LP = function() {
    return !!e
  })()
}

function xl(e) {
  return xl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, xl(e)
}

function K6(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Ld(e, t)
}

function Ld(e, t) {
  return Ld = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Ld(e, t)
}

function wl(e, t, r) {
  return t = BP(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function BP(e) {
  var t = V6(e, "string");
  return $i(t) == "symbol" ? t : t + ""
}

function V6(e, t) {
  if ($i(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if ($i(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Y6 = function(t, r, n, i, o) {
    var a = o.x1,
      u = o.x2,
      s = o.y1,
      l = o.y2,
      f = o.xAxis,
      c = o.yAxis;
    if (!f || !c) return null;
    var p = Ni({
        x: f.scale,
        y: c.scale
      }),
      h = {
        x: t ? p.x.apply(a, {
          position: "start"
        }) : p.x.rangeMin,
        y: n ? p.y.apply(s, {
          position: "start"
        }) : p.y.rangeMin
      },
      g = {
        x: r ? p.x.apply(u, {
          position: "end"
        }) : p.x.rangeMax,
        y: i ? p.y.apply(l, {
          position: "end"
        }) : p.y.rangeMax
      };
    return st(o, "discard") && (!p.isInRange(h) || !p.isInRange(g)) ? null : _d(h, g)
  },
  qa = function(e) {
    function t() {
      return W6(this, t), H6(this, t, arguments)
    }
    return K6(t, e), z6(t, [{
      key: "render",
      value: function() {
        var n = this.props,
          i = n.x1,
          o = n.x2,
          a = n.y1,
          u = n.y2,
          s = n.className,
          l = n.alwaysShow,
          f = n.clipPathId;
        qe(l === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
        var c = Se(i),
          p = Se(o),
          h = Se(a),
          g = Se(u),
          m = this.props.shape;
        if (!c && !p && !h && !g && !m) return null;
        var b = Y6(c, p, h, g, this.props);
        if (!b && !m) return null;
        var w = st(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
        return Ba.createElement(le, {
          className: ne("recharts-reference-area", s)
        }, t.renderRect(m, DP(DP({
          clipPath: w
        }, Q(this.props, !0)), b)), Te.renderCallByParent(this.props, b))
      }
    }])
  }(Ba.Component);
wl(qa, "displayName", "ReferenceArea");
wl(qa, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: .5,
  stroke: "none",
  strokeWidth: 1
});
wl(qa, "renderRect", function(e, t) {
  var r;
  return Ba.isValidElement(e) ? r = Ba.cloneElement(e, t) : (0, qP.default)(e) ? r = e(t) : r = Ba.createElement(Ai, Rd({}, t, {
    className: "recharts-reference-area-rect"
  })), r
});
var Sl = J(_e()),
  $d = J(Ar());
import Br, {
  Component as pH
} from "./react-shim-eraudit.js";
var UP = J(_e());

function Ol(e, t, r) {
  if (t < 1) return [];
  if (t === 1 && r === void 0) return e;
  for (var n = [], i = 0; i < e.length; i += t)
    if (r === void 0 || r(e[i]) === !0) n.push(e[i]);
    else return;
  return n
}

function $P(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return ZA(n, r)
}

function FP(e, t, r) {
  var n = r === "width",
    i = e.x,
    o = e.y,
    a = e.width,
    u = e.height;
  return t === 1 ? {
    start: n ? i : o,
    end: n ? i + a : o + u
  } : {
    start: n ? i + a : o + u,
    end: n ? i : o
  }
}

function Fi(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i) return !1;
  var o = r();
  return e * (t - e * o / 2 - n) >= 0 && e * (t + e * o / 2 - i) <= 0
}

function WP(e, t) {
  return Ol(e, t + 1)
}

function zP(e, t, r, n, i) {
  for (var o = (n || []).slice(), a = t.start, u = t.end, s = 0, l = 1, f = a, c = function() {
      var g = n?.[s];
      if (g === void 0) return {
        v: Ol(n, l)
      };
      var m = s,
        b, w = function() {
          return b === void 0 && (b = r(g, m)), b
        },
        A = g.coordinate,
        T = s === 0 || Fi(e, A, w, f, u);
      T || (s = 0, f = a, l += 1), T && (f = A + e * (w() / 2 + i), s += l)
    }, p; l <= o.length;)
    if (p = c(), p) return p.v;
  return []
}

function $a(e) {
  "@babel/helpers - typeof";
  return $a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, $a(e)
}

function HP(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Xe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? HP(Object(r), !0).forEach(function(n) {
      X6(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : HP(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function X6(e, t, r) {
  return t = Z6(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Z6(e) {
  var t = J6(e, "string");
  return $a(t) == "symbol" ? t : t + ""
}

function J6(e, t) {
  if ($a(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if ($a(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Q6(e, t, r, n, i) {
  for (var o = (n || []).slice(), a = o.length, u = t.start, s = t.end, l = function(p) {
      var h = o[p],
        g, m = function() {
          return g === void 0 && (g = r(h, p)), g
        };
      if (p === a - 1) {
        var b = e * (h.coordinate + e * m() / 2 - s);
        o[p] = h = Xe(Xe({}, h), {}, {
          tickCoord: b > 0 ? h.coordinate - b * e : h.coordinate
        })
      } else o[p] = h = Xe(Xe({}, h), {}, {
        tickCoord: h.coordinate
      });
      var w = Fi(e, h.tickCoord, m, u, s);
      w && (s = h.tickCoord - e * (m() / 2 + i), o[p] = Xe(Xe({}, h), {}, {
        isShow: !0
      }))
    }, f = a - 1; f >= 0; f--) l(f);
  return o
}

function eH(e, t, r, n, i, o) {
  var a = (n || []).slice(),
    u = a.length,
    s = t.start,
    l = t.end;
  if (o) {
    var f = n[u - 1],
      c = r(f, u - 1),
      p = e * (f.coordinate + e * c / 2 - l);
    a[u - 1] = f = Xe(Xe({}, f), {}, {
      tickCoord: p > 0 ? f.coordinate - p * e : f.coordinate
    });
    var h = Fi(e, f.tickCoord, function() {
      return c
    }, s, l);
    h && (l = f.tickCoord - e * (c / 2 + i), a[u - 1] = Xe(Xe({}, f), {}, {
      isShow: !0
    }))
  }
  for (var g = o ? u - 1 : u, m = function(A) {
      var T = a[A],
        E, y = function() {
          return E === void 0 && (E = r(T, A)), E
        };
      if (A === 0) {
        var v = e * (T.coordinate - e * y() / 2 - s);
        a[A] = T = Xe(Xe({}, T), {}, {
          tickCoord: v < 0 ? T.coordinate - v * e : T.coordinate
        })
      } else a[A] = T = Xe(Xe({}, T), {}, {
        tickCoord: T.coordinate
      });
      var j = Fi(e, T.tickCoord, y, s, l);
      j && (s = T.tickCoord + e * (y() / 2 + i), a[A] = Xe(Xe({}, T), {}, {
        isShow: !0
      }))
    }, b = 0; b < g; b++) m(b);
  return a
}

function Fa(e, t, r) {
  var n = e.tick,
    i = e.ticks,
    o = e.viewBox,
    a = e.minTickGap,
    u = e.orientation,
    s = e.interval,
    l = e.tickFormatter,
    f = e.unit,
    c = e.angle;
  if (!i || !i.length || !n) return [];
  if (V(s) || ze.isSsr) return WP(i, typeof s == "number" && V(s) ? s : 0);
  var p = [],
    h = u === "top" || u === "bottom" ? "width" : "height",
    g = f && h === "width" ? Yr(f, {
      fontSize: t,
      letterSpacing: r
    }) : {
      width: 0,
      height: 0
    },
    m = function(T, E) {
      var y = (0, UP.default)(l) ? l(T.value, E) : T.value;
      return h === "width" ? $P(Yr(y, {
        fontSize: t,
        letterSpacing: r
      }), g, c) : Yr(y, {
        fontSize: t,
        letterSpacing: r
      })[h]
    },
    b = i.length >= 2 ? Me(i[1].coordinate - i[0].coordinate) : 1,
    w = FP(o, b, h);
  return s === "equidistantPreserveStart" ? zP(b, w, m, i, a) : (s === "preserveStart" || s === "preserveStartEnd" ? p = eH(b, w, m, i, a, s === "preserveStartEnd") : p = Q6(b, w, m, i, a), p.filter(function(A) {
    return A.isShow
  }))
}
var tH = ["viewBox"],
  rH = ["viewBox"],
  nH = ["ticks"];

function zi(e) {
  "@babel/helpers - typeof";
  return zi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, zi(e)
}

function Wi() {
  return Wi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Wi.apply(this, arguments)
}

function GP(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Be(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? GP(Object(r), !0).forEach(function(n) {
      Fd(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : GP(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Bd(e, t) {
  if (e == null) return {};
  var r = iH(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function iH(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function oH(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function KP(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, YP(n.key), n)
  }
}

function aH(e, t, r) {
  return t && KP(e.prototype, t), r && KP(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function uH(e, t, r) {
  return t = Al(t), sH(e, VP() ? Reflect.construct(t, r || [], Al(e).constructor) : t.apply(e, r))
}

function sH(e, t) {
  if (t && (zi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return lH(e)
}

function lH(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function VP() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (VP = function() {
    return !!e
  })()
}

function Al(e) {
  return Al = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Al(e)
}

function cH(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && qd(e, t)
}

function qd(e, t) {
  return qd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, qd(e, t)
}

function Fd(e, t, r) {
  return t = YP(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function YP(e) {
  var t = fH(e, "string");
  return zi(t) == "symbol" ? t : t + ""
}

function fH(e, t) {
  if (zi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (zi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var wr = function(e) {
  function t(r) {
    var n;
    return oH(this, t), n = uH(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n
  }
  return cH(t, e), aH(t, [{
    key: "shouldComponentUpdate",
    value: function(n, i) {
      var o = n.viewBox,
        a = Bd(n, tH),
        u = this.props,
        s = u.viewBox,
        l = Bd(u, rH);
      return !fr(o, s) || !fr(a, l) || !fr(i, this.state)
    }
  }, {
    key: "componentDidMount",
    value: function() {
      var n = this.layerReference;
      if (n) {
        var i = n.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
        i && this.setState({
          fontSize: window.getComputedStyle(i).fontSize,
          letterSpacing: window.getComputedStyle(i).letterSpacing
        })
      }
    }
  }, {
    key: "getTickLineCoord",
    value: function(n) {
      var i = this.props,
        o = i.x,
        a = i.y,
        u = i.width,
        s = i.height,
        l = i.orientation,
        f = i.tickSize,
        c = i.mirror,
        p = i.tickMargin,
        h, g, m, b, w, A, T = c ? -1 : 1,
        E = n.tickSize || f,
        y = V(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (l) {
        case "top":
          h = g = n.coordinate, b = a + +!c * s, m = b - T * E, A = m - T * p, w = y;
          break;
        case "left":
          m = b = n.coordinate, g = o + +!c * u, h = g - T * E, w = h - T * p, A = y;
          break;
        case "right":
          m = b = n.coordinate, g = o + +c * u, h = g + T * E, w = h + T * p, A = y;
          break;
        default:
          h = g = n.coordinate, b = a + +c * s, m = b + T * E, A = m + T * p, w = y;
          break
      }
      return {
        line: {
          x1: h,
          y1: m,
          x2: g,
          y2: b
        },
        tick: {
          x: w,
          y: A
        }
      }
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props,
        i = n.orientation,
        o = n.mirror,
        a;
      switch (i) {
        case "left":
          a = o ? "start" : "end";
          break;
        case "right":
          a = o ? "end" : "start";
          break;
        default:
          a = "middle";
          break
      }
      return a
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function() {
      var n = this.props,
        i = n.orientation,
        o = n.mirror,
        a = "end";
      switch (i) {
        case "left":
        case "right":
          a = "middle";
          break;
        case "top":
          a = o ? "start" : "end";
          break;
        default:
          a = o ? "end" : "start";
          break
      }
      return a
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props,
        i = n.x,
        o = n.y,
        a = n.width,
        u = n.height,
        s = n.orientation,
        l = n.mirror,
        f = n.axisLine,
        c = Be(Be(Be({}, Q(this.props, !1)), Q(f, !1)), {}, {
          fill: "none"
        });
      if (s === "top" || s === "bottom") {
        var p = +(s === "top" && !l || s === "bottom" && l);
        c = Be(Be({}, c), {}, {
          x1: i,
          y1: o + p * u,
          x2: i + a,
          y2: o + p * u
        })
      } else {
        var h = +(s === "left" && !l || s === "right" && l);
        c = Be(Be({}, c), {}, {
          x1: i + h * a,
          y1: o,
          x2: i + h * a,
          y2: o + u
        })
      }
      return Br.createElement("line", Wi({}, c, {
        className: ne("recharts-cartesian-axis-line", (0, $d.default)(f, "className"))
      }))
    }
  }, {
    key: "renderTicks",
    value: function(n, i, o) {
      var a = this,
        u = this.props,
        s = u.tickLine,
        l = u.stroke,
        f = u.tick,
        c = u.tickFormatter,
        p = u.unit,
        h = Fa(Be(Be({}, this.props), {}, {
          ticks: n
        }), i, o),
        g = this.getTickTextAnchor(),
        m = this.getTickVerticalAnchor(),
        b = Q(this.props, !1),
        w = Q(f, !1),
        A = Be(Be({}, b), {}, {
          fill: "none"
        }, Q(s, !1)),
        T = h.map(function(E, y) {
          var v = a.getTickLineCoord(E),
            j = v.line,
            M = v.tick,
            N = Be(Be(Be(Be({
              textAnchor: g,
              verticalAnchor: m
            }, b), {}, {
              stroke: "none",
              fill: l
            }, w), M), {}, {
              index: y,
              payload: E,
              visibleTicksCount: h.length,
              tickFormatter: c
            });
          return Br.createElement(le, Wi({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(E.value, "-").concat(E.coordinate, "-").concat(E.tickCoord)
          }, pt(a.props, E, y)), s && Br.createElement("line", Wi({}, A, j, {
            className: ne("recharts-cartesian-axis-tick-line", (0, $d.default)(s, "className"))
          })), f && t.renderTickItem(f, N, "".concat((0, Sl.default)(c) ? c(E.value, y) : E.value).concat(p || "")))
        });
      return Br.createElement("g", {
        className: "recharts-cartesian-axis-ticks"
      }, T)
    }
  }, {
    key: "render",
    value: function() {
      var n = this,
        i = this.props,
        o = i.axisLine,
        a = i.width,
        u = i.height,
        s = i.ticksGenerator,
        l = i.className,
        f = i.hide;
      if (f) return null;
      var c = this.props,
        p = c.ticks,
        h = Bd(c, nH),
        g = p;
      return (0, Sl.default)(s) && (g = p && p.length > 0 ? s(this.props) : s(h)), a <= 0 || u <= 0 || !g || !g.length ? null : Br.createElement(le, {
        className: ne("recharts-cartesian-axis", l),
        ref: function(b) {
          n.layerReference = b
        }
      }, o && this.renderAxisLine(), this.renderTicks(g, this.state.fontSize, this.state.letterSpacing), Te.renderCallByParent(this.props))
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, o) {
      var a, u = ne(i.className, "recharts-cartesian-axis-tick-value");
      return Br.isValidElement(n) ? a = Br.cloneElement(n, Be(Be({}, i), {}, {
        className: u
      })) : (0, Sl.default)(n) ? a = n(Be(Be({}, i), {}, {
        className: u
      })) : a = Br.createElement(dt, Wi({}, i, {
        className: "recharts-cartesian-axis-tick-value"
      }), o), a
    }
  }])
}(pH);
Fd(wr, "displayName", "CartesianAxis");
Fd(wr, "defaultProps", {
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
var Pl = J(_e());
import Je from "./react-shim-eraudit.js";
var dH = ["x1", "y1", "x2", "y2", "key"],
  mH = ["offset"];

function Pn(e) {
  "@babel/helpers - typeof";
  return Pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Pn(e)
}

function XP(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ze(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? XP(Object(r), !0).forEach(function(n) {
      hH(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : XP(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function hH(e, t, r) {
  return t = yH(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function yH(e) {
  var t = vH(e, "string");
  return Pn(t) == "symbol" ? t : t + ""
}

function vH(e, t) {
  if (Pn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Pn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function An() {
  return An = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, An.apply(this, arguments)
}

function ZP(e, t) {
  if (e == null) return {};
  var r = gH(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function gH(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var bH = function(t) {
  var r = t.fill;
  if (!r || r === "none") return null;
  var n = t.fillOpacity,
    i = t.x,
    o = t.y,
    a = t.width,
    u = t.height,
    s = t.ry;
  return Je.createElement("rect", {
    x: i,
    y: o,
    ry: s,
    width: a,
    height: u,
    stroke: "none",
    fill: r,
    fillOpacity: n,
    className: "recharts-cartesian-grid-bg"
  })
};

function JP(e, t) {
  var r;
  if (Je.isValidElement(e)) r = Je.cloneElement(e, t);
  else if ((0, Pl.default)(e)) r = e(t);
  else {
    var n = t.x1,
      i = t.y1,
      o = t.x2,
      a = t.y2,
      u = t.key,
      s = ZP(t, dH),
      l = Q(s, !1),
      f = l.offset,
      c = ZP(l, mH);
    r = Je.createElement("line", An({}, c, {
      x1: n,
      y1: i,
      x2: o,
      y2: a,
      fill: "none",
      key: u
    }))
  }
  return r
}

function xH(e) {
  var t = e.x,
    r = e.width,
    n = e.horizontal,
    i = n === void 0 ? !0 : n,
    o = e.horizontalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = Ze(Ze({}, e), {}, {
      x1: t,
      y1: u,
      x2: t + r,
      y2: u,
      key: "line-".concat(s),
      index: s
    });
    return JP(i, l)
  });
  return Je.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, a)
}

function wH(e) {
  var t = e.y,
    r = e.height,
    n = e.vertical,
    i = n === void 0 ? !0 : n,
    o = e.verticalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = Ze(Ze({}, e), {}, {
      x1: u,
      y1: t,
      x2: u,
      y2: t + r,
      key: "line-".concat(s),
      index: s
    });
    return JP(i, l)
  });
  return Je.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, a)
}

function OH(e) {
  var t = e.horizontalFill,
    r = e.fillOpacity,
    n = e.x,
    i = e.y,
    o = e.width,
    a = e.height,
    u = e.horizontalPoints,
    s = e.horizontal,
    l = s === void 0 ? !0 : s;
  if (!l || !t || !t.length) return null;
  var f = u.map(function(p) {
    return Math.round(p + i - i)
  }).sort(function(p, h) {
    return p - h
  });
  i !== f[0] && f.unshift(0);
  var c = f.map(function(p, h) {
    var g = !f[h + 1],
      m = g ? i + a - p : f[h + 1] - p;
    if (m <= 0) return null;
    var b = h % t.length;
    return Je.createElement("rect", {
      key: "react-".concat(h),
      y: p,
      x: n,
      height: m,
      width: o,
      stroke: "none",
      fill: t[b],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    })
  });
  return Je.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, c)
}

function SH(e) {
  var t = e.vertical,
    r = t === void 0 ? !0 : t,
    n = e.verticalFill,
    i = e.fillOpacity,
    o = e.x,
    a = e.y,
    u = e.width,
    s = e.height,
    l = e.verticalPoints;
  if (!r || !n || !n.length) return null;
  var f = l.map(function(p) {
    return Math.round(p + o - o)
  }).sort(function(p, h) {
    return p - h
  });
  o !== f[0] && f.unshift(0);
  var c = f.map(function(p, h) {
    var g = !f[h + 1],
      m = g ? o + u - p : f[h + 1] - p;
    if (m <= 0) return null;
    var b = h % n.length;
    return Je.createElement("rect", {
      key: "react-".concat(h),
      x: p,
      y: a,
      width: m,
      height: s,
      stroke: "none",
      fill: n[b],
      fillOpacity: i,
      className: "recharts-cartesian-grid-bg"
    })
  });
  return Je.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, c)
}
var AH = function(t, r) {
    var n = t.xAxis,
      i = t.width,
      o = t.height,
      a = t.offset;
    return Bp(Fa(Ze(Ze(Ze({}, wr.defaultProps), n), {}, {
      ticks: gt(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.left, a.left + a.width, r)
  },
  PH = function(t, r) {
    var n = t.yAxis,
      i = t.width,
      o = t.height,
      a = t.offset;
    return Bp(Fa(Ze(Ze(Ze({}, wr.defaultProps), n), {}, {
      ticks: gt(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.top, a.top + a.height, r)
  },
  Hi = {
    horizontal: !0,
    vertical: !0,
    horizontalPoints: [],
    verticalPoints: [],
    stroke: "#ccc",
    fill: "none",
    verticalFill: [],
    horizontalFill: []
  };

function Tn(e) {
  var t, r, n, i, o, a, u = Di(),
    s = Ri(),
    l = bP(),
    f = Ze(Ze({}, e), {}, {
      stroke: (t = e.stroke) !== null && t !== void 0 ? t : Hi.stroke,
      fill: (r = e.fill) !== null && r !== void 0 ? r : Hi.fill,
      horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : Hi.horizontal,
      horizontalFill: (i = e.horizontalFill) !== null && i !== void 0 ? i : Hi.horizontalFill,
      vertical: (o = e.vertical) !== null && o !== void 0 ? o : Hi.vertical,
      verticalFill: (a = e.verticalFill) !== null && a !== void 0 ? a : Hi.verticalFill,
      x: V(e.x) ? e.x : l.left,
      y: V(e.y) ? e.y : l.top,
      width: V(e.width) ? e.width : l.width,
      height: V(e.height) ? e.height : l.height
    }),
    c = f.x,
    p = f.y,
    h = f.width,
    g = f.height,
    m = f.syncWithTicks,
    b = f.horizontalValues,
    w = f.verticalValues,
    A = yP(),
    T = vP();
  if (!V(h) || h <= 0 || !V(g) || g <= 0 || !V(c) || c !== +c || !V(p) || p !== +p) return null;
  var E = f.verticalCoordinatesGenerator || AH,
    y = f.horizontalCoordinatesGenerator || PH,
    v = f.horizontalPoints,
    j = f.verticalPoints;
  if ((!v || !v.length) && (0, Pl.default)(y)) {
    var M = b && b.length,
      N = y({
        yAxis: T ? Ze(Ze({}, T), {}, {
          ticks: M ? b : T.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, M ? !0 : m);
    qe(Array.isArray(N), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(Pn(N), "]")), Array.isArray(N) && (v = N)
  }
  if ((!j || !j.length) && (0, Pl.default)(E)) {
    var B = w && w.length,
      $ = E({
        xAxis: A ? Ze(Ze({}, A), {}, {
          ticks: B ? w : A.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, B ? !0 : m);
    qe(Array.isArray($), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(Pn($), "]")), Array.isArray($) && (j = $)
  }
  return Je.createElement("g", {
    className: "recharts-cartesian-grid"
  }, Je.createElement(bH, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), Je.createElement(xH, An({}, f, {
    offset: l,
    horizontalPoints: v,
    xAxis: A,
    yAxis: T
  })), Je.createElement(wH, An({}, f, {
    offset: l,
    verticalPoints: j,
    xAxis: A,
    yAxis: T
  })), Je.createElement(OH, An({}, f, {
    horizontalPoints: v
  })), Je.createElement(SH, An({}, f, {
    verticalPoints: j
  })))
}
Tn.displayName = "CartesianGrid";
import lt, {
  PureComponent as $H
} from "./react-shim-eraudit.js";
var iT = J(_e()),
  _l = J(ft()),
  oT = J(hi());
var TH = ["type", "layout", "connectNulls", "ref"],
  _H = ["key"];

function Gi(e) {
  "@babel/helpers - typeof";
  return Gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Gi(e)
}

function QP(e, t) {
  if (e == null) return {};
  var r = EH(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function EH(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Wa() {
  return Wa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Wa.apply(this, arguments)
}

function eT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function xt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eT(Object(r), !0).forEach(function(n) {
      Kt(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Ui(e) {
  return CH(e) || MH(e) || kH(e) || jH()
}

function jH() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function kH(e, t) {
  if (e) {
    if (typeof e == "string") return Wd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Wd(e, t)
  }
}

function MH(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function CH(e) {
  if (Array.isArray(e)) return Wd(e)
}

function Wd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function IH(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function tT(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, nT(n.key), n)
  }
}

function NH(e, t, r) {
  return t && tT(e.prototype, t), r && tT(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function DH(e, t, r) {
  return t = Tl(t), RH(e, rT() ? Reflect.construct(t, r || [], Tl(e).constructor) : t.apply(e, r))
}

function RH(e, t) {
  if (t && (Gi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return LH(e)
}

function LH(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function rT() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (rT = function() {
    return !!e
  })()
}

function Tl(e) {
  return Tl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Tl(e)
}

function BH(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && zd(e, t)
}

function zd(e, t) {
  return zd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, zd(e, t)
}

function Kt(e, t, r) {
  return t = nT(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function nT(e) {
  var t = qH(e, "string");
  return Gi(t) == "symbol" ? t : t + ""
}

function qH(e, t) {
  if (Gi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Gi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Dt = function(e) {
  function t() {
    var r;
    IH(this, t);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = DH(this, t, [].concat(i)), Kt(r, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), Kt(r, "generateSimpleStrokeDasharray", function(a, u) {
      return "".concat(u, "px ").concat(a - u, "px")
    }), Kt(r, "getStrokeDasharray", function(a, u, s) {
      var l = s.reduce(function(w, A) {
        return w + A
      });
      if (!l) return r.generateSimpleStrokeDasharray(u, a);
      for (var f = Math.floor(a / l), c = a % l, p = u - a, h = [], g = 0, m = 0; g < s.length; m += s[g], ++g)
        if (m + s[g] > c) {
          h = [].concat(Ui(s.slice(0, g)), [c - m]);
          break
        } var b = h.length % 2 === 0 ? [0, p] : [p];
      return [].concat(Ui(t.repeat(s, f)), Ui(h), b).map(function(w) {
        return "".concat(w, "px")
      }).join(", ")
    }), Kt(r, "id", St("recharts-line-")), Kt(r, "pathRef", function(a) {
      r.mainCurve = a
    }), Kt(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      }), r.props.onAnimationEnd && r.props.onAnimationEnd()
    }), Kt(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      }), r.props.onAnimationStart && r.props.onAnimationStart()
    }), r
  }
  return BH(t, e), NH(t, [{
    key: "componentDidMount",
    value: function() {
      if (this.props.isAnimationActive) {
        var n = this.getTotalLength();
        this.setState({
          totalLength: n
        })
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      if (this.props.isAnimationActive) {
        var n = this.getTotalLength();
        n !== this.state.totalLength && this.setState({
          totalLength: n
        })
      }
    }
  }, {
    key: "getTotalLength",
    value: function() {
      var n = this.mainCurve;
      try {
        return n && n.getTotalLength && n.getTotalLength() || 0
      } catch {
        return 0
      }
    }
  }, {
    key: "renderErrorBar",
    value: function(n, i) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
      var o = this.props,
        a = o.points,
        u = o.xAxis,
        s = o.yAxis,
        l = o.layout,
        f = o.children,
        c = Ie(f, Nr);
      if (!c) return null;
      var p = function(m, b) {
          return {
            x: m.x,
            y: m.y,
            value: m.value,
            errorVal: je(m.payload, b)
          }
        },
        h = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return lt.createElement(le, h, c.map(function(g) {
        return lt.cloneElement(g, {
          key: "bar-".concat(g.props.dataKey),
          data: a,
          xAxis: u,
          yAxis: s,
          layout: l,
          dataPointFormatter: p
        })
      }))
    }
  }, {
    key: "renderDots",
    value: function(n, i, o) {
      var a = this.props.isAnimationActive;
      if (a && !this.state.isAnimationFinished) return null;
      var u = this.props,
        s = u.dot,
        l = u.points,
        f = u.dataKey,
        c = Q(this.props, !1),
        p = Q(s, !0),
        h = l.map(function(m, b) {
          var w = xt(xt(xt({
            key: "dot-".concat(b),
            r: 3
          }, c), p), {}, {
            index: b,
            cx: m.x,
            cy: m.y,
            value: m.value,
            dataKey: f,
            payload: m.payload,
            points: l
          });
          return t.renderDotItem(s, w)
        }),
        g = {
          clipPath: n ? "url(#clipPath-".concat(i ? "" : "dots-").concat(o, ")") : null
        };
      return lt.createElement(le, Wa({
        className: "recharts-line-dots",
        key: "dots"
      }, g), h)
    }
  }, {
    key: "renderCurveStatically",
    value: function(n, i, o, a) {
      var u = this.props,
        s = u.type,
        l = u.layout,
        f = u.connectNulls,
        c = u.ref,
        p = QP(u, TH),
        h = xt(xt(xt({}, Q(p, !0)), {}, {
          fill: "none",
          className: "recharts-line-curve",
          clipPath: i ? "url(#clipPath-".concat(o, ")") : null,
          points: n
        }, a), {}, {
          type: s,
          layout: l,
          connectNulls: f
        });
      return lt.createElement(dn, Wa({}, h, {
        pathRef: this.pathRef
      }))
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function(n, i) {
      var o = this,
        a = this.props,
        u = a.points,
        s = a.strokeDasharray,
        l = a.isAnimationActive,
        f = a.animationBegin,
        c = a.animationDuration,
        p = a.animationEasing,
        h = a.animationId,
        g = a.animateNewValues,
        m = a.width,
        b = a.height,
        w = this.state,
        A = w.prevPoints,
        T = w.totalLength;
      return lt.createElement(Mt, {
        begin: f,
        duration: c,
        isActive: l,
        easing: p,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(h),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(E) {
        var y = E.t;
        if (A) {
          var v = A.length / u.length,
            j = u.map(function(R, z) {
              var H = Math.floor(z * v);
              if (A[H]) {
                var W = A[H],
                  S = Ge(W.x, R.x),
                  d = Ge(W.y, R.y);
                return xt(xt({}, R), {}, {
                  x: S(y),
                  y: d(y)
                })
              }
              if (g) {
                var O = Ge(m * 2, R.x),
                  P = Ge(b / 2, R.y);
                return xt(xt({}, R), {}, {
                  x: O(y),
                  y: P(y)
                })
              }
              return xt(xt({}, R), {}, {
                x: R.x,
                y: R.y
              })
            });
          return o.renderCurveStatically(j, n, i)
        }
        var M = Ge(0, T),
          N = M(y),
          B;
        if (s) {
          var $ = "".concat(s).split(/[,\s]+/gim).map(function(R) {
            return parseFloat(R)
          });
          B = o.getStrokeDasharray(N, T, $)
        } else B = o.generateSimpleStrokeDasharray(T, N);
        return o.renderCurveStatically(u, n, i, {
          strokeDasharray: B
        })
      })
    }
  }, {
    key: "renderCurve",
    value: function(n, i) {
      var o = this.props,
        a = o.points,
        u = o.isAnimationActive,
        s = this.state,
        l = s.prevPoints,
        f = s.totalLength;
      return u && a && a.length && (!l && f > 0 || !(0, oT.default)(l, a)) ? this.renderCurveWithAnimation(n, i) : this.renderCurveStatically(a, n, i)
    }
  }, {
    key: "render",
    value: function() {
      var n, i = this.props,
        o = i.hide,
        a = i.dot,
        u = i.points,
        s = i.className,
        l = i.xAxis,
        f = i.yAxis,
        c = i.top,
        p = i.left,
        h = i.width,
        g = i.height,
        m = i.isAnimationActive,
        b = i.id;
      if (o || !u || !u.length) return null;
      var w = this.state.isAnimationFinished,
        A = u.length === 1,
        T = ne("recharts-line", s),
        E = l && l.allowDataOverflow,
        y = f && f.allowDataOverflow,
        v = E || y,
        j = (0, _l.default)(b) ? this.id : b,
        M = (n = Q(a, !1)) !== null && n !== void 0 ? n : {
          r: 3,
          strokeWidth: 2
        },
        N = M.r,
        B = N === void 0 ? 3 : N,
        $ = M.strokeWidth,
        R = $ === void 0 ? 2 : $,
        z = fy(a) ? a : {},
        H = z.clipDot,
        W = H === void 0 ? !0 : H,
        S = B * 2 + R;
      return lt.createElement(le, {
        className: T
      }, E || y ? lt.createElement("defs", null, lt.createElement("clipPath", {
        id: "clipPath-".concat(j)
      }, lt.createElement("rect", {
        x: E ? p : p - h / 2,
        y: y ? c : c - g / 2,
        width: E ? h : h * 2,
        height: y ? g : g * 2
      })), !W && lt.createElement("clipPath", {
        id: "clipPath-dots-".concat(j)
      }, lt.createElement("rect", {
        x: p - S / 2,
        y: c - S / 2,
        width: h + S,
        height: g + S
      }))) : null, !A && this.renderCurve(v, j), this.renderErrorBar(v, j), (A || a) && this.renderDots(v, W, j), (!m || w) && Ne.renderCallByParent(this.props, u))
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        prevPoints: i.curPoints
      } : n.points !== i.curPoints ? {
        curPoints: n.points
      } : null
    }
  }, {
    key: "repeat",
    value: function(n, i) {
      for (var o = n.length % 2 !== 0 ? [].concat(Ui(n), [0]) : n, a = [], u = 0; u < i; ++u) a = [].concat(Ui(a), Ui(o));
      return a
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var o;
      if (lt.isValidElement(n)) o = lt.cloneElement(n, i);
      else if ((0, iT.default)(n)) o = n(i);
      else {
        var a = i.key,
          u = QP(i, _H),
          s = ne("recharts-line-dot", typeof n != "boolean" ? n.className : "");
        o = lt.createElement(Rr, Wa({
          key: a
        }, u, {
          className: s
        }))
      }
      return o
    }
  }])
}($H);
Kt(Dt, "displayName", "Line");
Kt(Dt, "defaultProps", {
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
  isAnimationActive: !ze.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
});
Kt(Dt, "getComposedData", function(e) {
  var t = e.props,
    r = e.xAxis,
    n = e.yAxis,
    i = e.xAxisTicks,
    o = e.yAxisTicks,
    a = e.dataKey,
    u = e.bandSize,
    s = e.displayedData,
    l = e.offset,
    f = t.layout,
    c = s.map(function(p, h) {
      var g = je(p, a);
      return f === "horizontal" ? {
        x: qp({
          axis: r,
          ticks: i,
          bandSize: u,
          entry: p,
          index: h
        }),
        y: (0, _l.default)(g) ? null : n.scale(g),
        value: g,
        payload: p
      } : {
        x: (0, _l.default)(g) ? null : r.scale(g),
        y: qp({
          axis: n,
          ticks: o,
          bandSize: u,
          entry: p,
          index: h
        }),
        value: g,
        payload: p
      }
    });
  return xt({
    points: c,
    layout: f
  }, l)
});
import * as za from "./react-shim-eraudit.js";

function Ki(e) {
  "@babel/helpers - typeof";
  return Ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ki(e)
}

function FH(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function aT(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, lT(n.key), n)
  }
}

function WH(e, t, r) {
  return t && aT(e.prototype, t), r && aT(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function zH(e, t, r) {
  return t = El(t), HH(e, uT() ? Reflect.construct(t, r || [], El(e).constructor) : t.apply(e, r))
}

function HH(e, t) {
  if (t && (Ki(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return UH(e)
}

function UH(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function uT() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (uT = function() {
    return !!e
  })()
}

function El(e) {
  return El = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, El(e)
}

function GH(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Hd(e, t)
}

function Hd(e, t) {
  return Hd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Hd(e, t)
}

function sT(e, t, r) {
  return t = lT(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function lT(e) {
  var t = KH(e, "string");
  return Ki(t) == "symbol" ? t : t + ""
}

function KH(e, t) {
  if (Ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ki(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Ud() {
  return Ud = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ud.apply(this, arguments)
}

function VH(e) {
  var t = e.xAxisId,
    r = Di(),
    n = Ri(),
    i = ml(t);
  return i == null ? null : za.createElement(wr, Ud({}, i, {
    className: ne("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
    viewBox: {
      x: 0,
      y: 0,
      width: r,
      height: n
    },
    ticksGenerator: function(a) {
      return gt(a, !0)
    }
  }))
}
var Rt = function(e) {
  function t() {
    return FH(this, t), zH(this, t, arguments)
  }
  return GH(t, e), WH(t, [{
    key: "render",
    value: function() {
      return za.createElement(VH, this.props)
    }
  }])
}(za.Component);
sT(Rt, "displayName", "XAxis");
sT(Rt, "defaultProps", {
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
import * as Ha from "./react-shim-eraudit.js";

function Vi(e) {
  "@babel/helpers - typeof";
  return Vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Vi(e)
}

function YH(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function cT(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, dT(n.key), n)
  }
}

function XH(e, t, r) {
  return t && cT(e.prototype, t), r && cT(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function ZH(e, t, r) {
  return t = jl(t), JH(e, fT() ? Reflect.construct(t, r || [], jl(e).constructor) : t.apply(e, r))
}

function JH(e, t) {
  if (t && (Vi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return QH(e)
}

function QH(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function fT() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (fT = function() {
    return !!e
  })()
}

function jl(e) {
  return jl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, jl(e)
}

function eU(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Gd(e, t)
}

function Gd(e, t) {
  return Gd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Gd(e, t)
}

function pT(e, t, r) {
  return t = dT(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function dT(e) {
  var t = tU(e, "string");
  return Vi(t) == "symbol" ? t : t + ""
}

function tU(e, t) {
  if (Vi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Vi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Kd() {
  return Kd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Kd.apply(this, arguments)
}
var rU = function(t) {
    var r = t.yAxisId,
      n = Di(),
      i = Ri(),
      o = hl(r);
    return o == null ? null : Ha.createElement(wr, Kd({}, o, {
      className: ne("recharts-".concat(o.axisType, " ").concat(o.axisType), o.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: i
      },
      ticksGenerator: function(u) {
        return gt(u, !0)
      }
    }))
  },
  ct = function(e) {
    function t() {
      return YH(this, t), ZH(this, t, arguments)
    }
    return eU(t, e), XH(t, [{
      key: "render",
      value: function() {
        return Ha.createElement(rU, this.props)
      }
    }])
  }(Ha.Component);
pT(ct, "displayName", "YAxis");
pT(ct, "defaultProps", {
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
var Xi = J(ft()),
  Yt = J(_e()),
  Bl = J(bd()),
  Zi = J(Ar()),
  RT = J(Du()),
  LT = J(If());
import Lt, {
  Component as NU,
  cloneElement as Vt,
  isValidElement as DU,
  forwardRef as RU
} from "./react-shim-eraudit.js";

function mT(e) {
  return aU(e) || oU(e) || iU(e) || nU()
}

function nU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function iU(e, t) {
  if (e) {
    if (typeof e == "string") return Vd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Vd(e, t)
  }
}

function oU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function aU(e) {
  if (Array.isArray(e)) return Vd(e)
}

function Vd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var kl = function(t, r, n, i, o) {
  var a = Ie(t, vl),
    u = Ie(t, La),
    s = [].concat(mT(a), mT(u)),
    l = Ie(t, qa),
    f = "".concat(i, "Id"),
    c = i[0],
    p = r;
  if (s.length && (p = s.reduce(function(m, b) {
      if (b.props[f] === n && st(b.props, "extendDomain") && V(b.props[c])) {
        var w = b.props[c];
        return [Math.min(m[0], w), Math.max(m[1], w)]
      }
      return m
    }, p)), l.length) {
    var h = "".concat(c, "1"),
      g = "".concat(c, "2");
    p = l.reduce(function(m, b) {
      if (b.props[f] === n && st(b.props, "extendDomain") && V(b.props[h]) && V(b.props[g])) {
        var w = b.props[h],
          A = b.props[g];
        return [Math.min(m[0], w, A), Math.max(m[1], w, A)]
      }
      return m
    }, p)
  }
  return o && o.length && (p = o.reduce(function(m, b) {
    return V(b) ? [Math.min(m[0], b), Math.max(m[1], b)] : m
  }, p)), p
};
var vT = J(yT()),
  Cl = new vT.default;
var Il = "recharts.syncMouseEvents";

function Ga(e) {
  "@babel/helpers - typeof";
  return Ga = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ga(e)
}

function lU(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function gT(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, bT(n.key), n)
  }
}

function cU(e, t, r) {
  return t && gT(e.prototype, t), r && gT(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function Xd(e, t, r) {
  return t = bT(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function bT(e) {
  var t = fU(e, "string");
  return Ga(t) == "symbol" ? t : t + ""
}

function fU(e, t) {
  if (Ga(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ga(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var xT = function() {
  function e() {
    lU(this, e), Xd(this, "activeIndex", 0), Xd(this, "coordinateList", []), Xd(this, "layout", "horizontal")
  }
  return cU(e, [{
    key: "setDetails",
    value: function(r) {
      var n, i = r.coordinateList,
        o = i === void 0 ? null : i,
        a = r.container,
        u = a === void 0 ? null : a,
        s = r.layout,
        l = s === void 0 ? null : s,
        f = r.offset,
        c = f === void 0 ? null : f,
        p = r.mouseHandlerCallback,
        h = p === void 0 ? null : p;
      this.coordinateList = (n = o ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = u ?? this.container, this.layout = l ?? this.layout, this.offset = c ?? this.offset, this.mouseHandlerCallback = h ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1)
    }
  }, {
    key: "focus",
    value: function() {
      this.spoofMouse()
    }
  }, {
    key: "keyboardEvent",
    value: function(r) {
      if (this.coordinateList.length !== 0) switch (r.key) {
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
    value: function(r) {
      this.activeIndex = r
    }
  }, {
    key: "spoofMouse",
    value: function() {
      var r, n;
      if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
        var i = this.container.getBoundingClientRect(),
          o = i.x,
          a = i.y,
          u = i.height,
          s = this.coordinateList[this.activeIndex].coordinate,
          l = ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0,
          f = ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0,
          c = o + s + l,
          p = a + this.offset.top + u / 2 + f;
        this.mouseHandlerCallback({
          pageX: c,
          pageY: p
        })
      }
    }
  }])
}();

function wT(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e?.[0],
      i = e?.[1];
    if (n && i && V(n) && V(i)) return !0
  }
  return !1
}
import {
  cloneElement as hU,
  createElement as yU,
  isValidElement as vU
} from "./react-shim-eraudit.js";

function OT(e, t, r, n) {
  var i = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - i : r.left + .5,
    y: e === "horizontal" ? r.top + .5 : t.y - i,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  }
}

function Nl(e) {
  var t = e.cx,
    r = e.cy,
    n = e.radius,
    i = e.startAngle,
    o = e.endAngle,
    a = de(t, r, n, i),
    u = de(t, r, n, o);
  return {
    points: [a, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: o
  }
}

function ST(e, t, r) {
  var n, i, o, a;
  if (e === "horizontal") n = t.x, o = n, i = r.top, a = r.top + r.height;
  else if (e === "vertical") i = t.y, a = i, n = r.left, o = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var u = t.cx,
        s = t.cy,
        l = t.innerRadius,
        f = t.outerRadius,
        c = t.angle,
        p = de(u, s, l, c),
        h = de(u, s, f, c);
      n = p.x, i = p.y, o = h.x, a = h.y
    } else return Nl(t);
  return [{
    x: n,
    y: i
  }, {
    x: o,
    y: a
  }]
}

function Ka(e) {
  "@babel/helpers - typeof";
  return Ka = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ka(e)
}

function AT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Dl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? AT(Object(r), !0).forEach(function(n) {
      pU(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : AT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function pU(e, t, r) {
  return t = dU(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function dU(e) {
  var t = mU(e, "string");
  return Ka(t) == "symbol" ? t : t + ""
}

function mU(e, t) {
  if (Ka(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ka(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function PT(e) {
  var t, r, n = e.element,
    i = e.tooltipEventType,
    o = e.isActive,
    a = e.activeCoordinate,
    u = e.activePayload,
    s = e.offset,
    l = e.activeTooltipIndex,
    f = e.tooltipAxisBandSize,
    c = e.layout,
    p = e.chartName,
    h = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !h || !o || !a || p !== "ScatterChart" && i !== "axis") return null;
  var g, m = dn;
  if (p === "ScatterChart") g = a, m = dS;
  else if (p === "BarChart") g = OT(c, a, s, f), m = Ai;
  else if (c === "radial") {
    var b = Nl(a),
      w = b.cx,
      A = b.cy,
      T = b.radius,
      E = b.startAngle,
      y = b.endAngle;
    g = {
      cx: w,
      cy: A,
      startAngle: E,
      endAngle: y,
      innerRadius: T,
      outerRadius: T
    }, m = Ws
  } else g = {
    points: ST(c, a, s)
  }, m = dn;
  var v = Dl(Dl(Dl(Dl({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), g), Q(h, !1)), {}, {
    payload: u,
    payloadIndex: l,
    className: ne("recharts-tooltip-cursor", h.className)
  });
  return vU(h) ? hU(h, v) : yU(m, v)
}
var gU = ["item"],
  bU = ["children", "className", "width", "height", "style", "compact", "title", "desc"];

function Ji(e) {
  "@babel/helpers - typeof";
  return Ji = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ji(e)
}

function Yi() {
  return Yi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Yi.apply(this, arguments)
}

function TT(e, t) {
  return OU(e) || wU(e, t) || NT(e, t) || xU()
}

function xU() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function wU(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== t); s = !0);
    } catch (f) {
      l = !0, i = f
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return
      } finally {
        if (l) throw i
      }
    }
    return u
  }
}

function OU(e) {
  if (Array.isArray(e)) return e
}

function _T(e, t) {
  if (e == null) return {};
  var r = SU(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function SU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function AU(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function ET(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, DT(n.key), n)
  }
}

function PU(e, t, r) {
  return t && ET(e.prototype, t), r && ET(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function TU(e, t, r) {
  return t = Ll(t), _U(e, IT() ? Reflect.construct(t, r || [], Ll(e).constructor) : t.apply(e, r))
}

function _U(e, t) {
  if (t && (Ji(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return EU(e)
}

function EU(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function IT() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (IT = function() {
    return !!e
  })()
}

function Ll(e) {
  return Ll = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ll(e)
}

function jU(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Zd(e, t)
}

function Zd(e, t) {
  return Zd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Zd(e, t)
}

function Qi(e) {
  return CU(e) || MU(e) || NT(e) || kU()
}

function kU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function NT(e, t) {
  if (e) {
    if (typeof e == "string") return Jd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Jd(e, t)
  }
}

function MU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function CU(e) {
  if (Array.isArray(e)) return Jd(e)
}

function Jd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function jT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function U(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jT(Object(r), !0).forEach(function(n) {
      se(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function se(e, t, r) {
  return t = DT(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function DT(e) {
  var t = IU(e, "string");
  return Ji(t) == "symbol" ? t : t + ""
}

function IU(e, t) {
  if (Ji(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ji(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var LU = {
    xAxis: ["bottom", "top"],
    yAxis: ["left", "right"]
  },
  BU = {
    width: "100%",
    height: "100%"
  },
  BT = {
    x: 0,
    y: 0
  };

function Rl(e) {
  return e
}
var qU = function(t, r) {
    return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius
  },
  $U = function(t, r, n, i) {
    var o = r.find(function(f) {
      return f && f.index === n
    });
    if (o) {
      if (t === "horizontal") return {
        x: o.coordinate,
        y: i.y
      };
      if (t === "vertical") return {
        x: i.x,
        y: o.coordinate
      };
      if (t === "centric") {
        var a = o.coordinate,
          u = i.radius;
        return U(U(U({}, i), de(i.cx, i.cy, u, a)), {}, {
          angle: a,
          radius: u
        })
      }
      var s = o.coordinate,
        l = i.angle;
      return U(U(U({}, i), de(i.cx, i.cy, s, l)), {}, {
        angle: l,
        radius: s
      })
    }
    return BT
  },
  ql = function(t, r) {
    var n = r.graphicalItems,
      i = r.dataStartIndex,
      o = r.dataEndIndex,
      a = (n ?? []).reduce(function(u, s) {
        var l = s.props.data;
        return l && l.length ? [].concat(Qi(u), Qi(l)) : u
      }, []);
    return a.length > 0 ? a : t && t.length && V(i) && V(o) ? t.slice(i, o + 1) : []
  };

function qT(e) {
  return e === "number" ? [0, "auto"] : void 0
}
var Qd = function(t, r, n, i) {
    var o = t.graphicalItems,
      a = t.tooltipAxis,
      u = ql(r, t);
    return n < 0 || !o || !o.length || n >= u.length ? null : o.reduce(function(s, l) {
      var f, c = (f = l.props.data) !== null && f !== void 0 ? f : r;
      c && t.dataStartIndex + t.dataEndIndex !== 0 && t.dataEndIndex - t.dataStartIndex >= n && (c = c.slice(t.dataStartIndex, t.dataEndIndex + 1));
      var p;
      if (a.dataKey && !a.allowDuplicatedCategory) {
        var h = c === void 0 ? u : c;
        p = In(h, a.dataKey, i)
      } else p = c && c[n] || u[n];
      return p ? [].concat(Qi(s), [Rs(l, p)]) : s
    }, [])
  },
  kT = function(t, r, n, i) {
    var o = i || {
        x: t.chartX,
        y: t.chartY
      },
      a = qU(o, n),
      u = t.orderedTooltipTicks,
      s = t.tooltipAxis,
      l = t.tooltipTicks,
      f = $w(a, u, l, s);
    if (f >= 0 && l) {
      var c = l[f] && l[f].value,
        p = Qd(t, r, f, c),
        h = $U(n, u, f, o);
      return {
        activeTooltipIndex: f,
        activeLabel: c,
        activePayload: p,
        activeCoordinate: h
      }
    }
    return null
  },
  FU = function(t, r) {
    var n = r.axes,
      i = r.graphicalItems,
      o = r.axisType,
      a = r.axisIdKey,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = t.layout,
      c = t.children,
      p = t.stackOffset,
      h = Lp(f, o);
    return n.reduce(function(g, m) {
      var b, w = m.type.defaultProps !== void 0 ? U(U({}, m.type.defaultProps), m.props) : m.props,
        A = w.type,
        T = w.dataKey,
        E = w.allowDataOverflow,
        y = w.allowDuplicatedCategory,
        v = w.scale,
        j = w.ticks,
        M = w.includeHidden,
        N = w[a];
      if (g[N]) return g;
      var B = ql(t.data, {
          graphicalItems: i.filter(function(C) {
            var D, F = a in C.props ? C.props[a] : (D = C.type.defaultProps) === null || D === void 0 ? void 0 : D[a];
            return F === N
          }),
          dataStartIndex: s,
          dataEndIndex: l
        }),
        $ = B.length,
        R, z, H;
      wT(w.domain, E, A) && (R = Ds(w.domain, null, E), h && (A === "number" || v !== "auto") && (H = bi(B, T, "category")));
      var W = qT(A);
      if (!R || R.length === 0) {
        var S, d = (S = w.domain) !== null && S !== void 0 ? S : W;
        if (T) {
          if (R = bi(B, T, A), A === "category" && h) {
            var O = Qh(R);
            y && O ? (z = R, R = (0, Bl.default)(0, $)) : y || (R = Wp(d, R, m).reduce(function(C, D) {
              return C.indexOf(D) >= 0 ? C : [].concat(Qi(C), [D])
            }, []))
          } else if (A === "category") y ? R = R.filter(function(C) {
            return C !== "" && !(0, Xi.default)(C)
          }) : R = Wp(d, R, m).reduce(function(C, D) {
            return C.indexOf(D) >= 0 || D === "" || (0, Xi.default)(D) ? C : [].concat(Qi(C), [D])
          }, []);
          else if (A === "number") {
            var P = Uw(B, i.filter(function(C) {
              var D, F, Y = a in C.props ? C.props[a] : (D = C.type.defaultProps) === null || D === void 0 ? void 0 : D[a],
                X = "hide" in C.props ? C.props.hide : (F = C.type.defaultProps) === null || F === void 0 ? void 0 : F.hide;
              return Y === N && (M || !X)
            }), T, o, f);
            P && (R = P)
          }
          h && (A === "number" || v !== "auto") && (H = bi(B, T, "category"))
        } else h ? R = (0, Bl.default)(0, $) : u && u[N] && u[N].hasStack && A === "number" ? R = p === "expand" ? [0, 1] : Fp(u[N].stackGroups, s, l) : R = Rp(B, i.filter(function(C) {
          var D = a in C.props ? C.props[a] : C.type.defaultProps[a],
            F = "hide" in C.props ? C.props.hide : C.type.defaultProps.hide;
          return D === N && (M || !F)
        }), A, f, !0);
        if (A === "number") R = kl(c, R, N, o, j), d && (R = Ds(d, R, E));
        else if (A === "category" && d) {
          var x = d,
            _ = R.every(function(C) {
              return x.indexOf(C) >= 0
            });
          _ && (R = x)
        }
      }
      return U(U({}, g), {}, se({}, N, U(U({}, w), {}, {
        axisType: o,
        domain: R,
        categoricalDomain: H,
        duplicateDomain: z,
        originalDomain: (b = w.domain) !== null && b !== void 0 ? b : W,
        isCategorical: h,
        layout: f
      })))
    }, {})
  },
  WU = function(t, r) {
    var n = r.graphicalItems,
      i = r.Axis,
      o = r.axisType,
      a = r.axisIdKey,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = t.layout,
      c = t.children,
      p = ql(t.data, {
        graphicalItems: n,
        dataStartIndex: s,
        dataEndIndex: l
      }),
      h = p.length,
      g = Lp(f, o),
      m = -1;
    return n.reduce(function(b, w) {
      var A = w.type.defaultProps !== void 0 ? U(U({}, w.type.defaultProps), w.props) : w.props,
        T = A[a],
        E = qT("number");
      if (!b[T]) {
        m++;
        var y;
        return g ? y = (0, Bl.default)(0, h) : u && u[T] && u[T].hasStack ? (y = Fp(u[T].stackGroups, s, l), y = kl(c, y, T, o)) : (y = Ds(E, Rp(p, n.filter(function(v) {
          var j, M, N = a in v.props ? v.props[a] : (j = v.type.defaultProps) === null || j === void 0 ? void 0 : j[a],
            B = "hide" in v.props ? v.props.hide : (M = v.type.defaultProps) === null || M === void 0 ? void 0 : M.hide;
          return N === T && !B
        }), "number", f), i.defaultProps.allowDataOverflow), y = kl(c, y, T, o)), U(U({}, b), {}, se({}, T, U(U({
          axisType: o
        }, i.defaultProps), {}, {
          hide: !0,
          orientation: (0, Zi.default)(LU, "".concat(o, ".").concat(m % 2), null),
          domain: y,
          originalDomain: E,
          isCategorical: g,
          layout: f
        })))
      }
      return b
    }, {})
  },
  zU = function(t, r) {
    var n = r.axisType,
      i = n === void 0 ? "xAxis" : n,
      o = r.AxisComp,
      a = r.graphicalItems,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = t.children,
      c = "".concat(i, "Id"),
      p = Ie(f, o),
      h = {};
    return p && p.length ? h = FU(t, {
      axes: p,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    }) : a && a.length && (h = WU(t, {
      Axis: o,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    })), h
  },
  HU = function(t) {
    var r = er(t),
      n = gt(r, !1, !0);
    return {
      tooltipTicks: n,
      orderedTooltipTicks: (0, RT.default)(n, function(i) {
        return i.coordinate
      }),
      tooltipAxis: r,
      tooltipAxisBandSize: xi(r, n)
    }
  },
  MT = function(t) {
    var r = t.children,
      n = t.defaultShowTooltip,
      i = Ke(r, wn),
      o = 0,
      a = 0;
    return t.data && t.data.length !== 0 && (a = t.data.length - 1), i && i.props && (i.props.startIndex >= 0 && (o = i.props.startIndex), i.props.endIndex >= 0 && (a = i.props.endIndex)), {
      chartX: 0,
      chartY: 0,
      dataStartIndex: o,
      dataEndIndex: a,
      activeTooltipIndex: -1,
      isTooltipActive: !!n
    }
  },
  UU = function(t) {
    return !t || !t.length ? !1 : t.some(function(r) {
      var n = At(r && r.type);
      return n && n.indexOf("Bar") >= 0
    })
  },
  CT = function(t) {
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
  GU = function(t, r) {
    var n = t.props,
      i = t.graphicalItems,
      o = t.xAxisMap,
      a = o === void 0 ? {} : o,
      u = t.yAxisMap,
      s = u === void 0 ? {} : u,
      l = n.width,
      f = n.height,
      c = n.children,
      p = n.margin || {},
      h = Ke(c, wn),
      g = Ke(c, Ft),
      m = Object.keys(s).reduce(function(y, v) {
        var j = s[v],
          M = j.orientation;
        return !j.mirror && !j.hide ? U(U({}, y), {}, se({}, M, y[M] + j.width)) : y
      }, {
        left: p.left || 0,
        right: p.right || 0
      }),
      b = Object.keys(a).reduce(function(y, v) {
        var j = a[v],
          M = j.orientation;
        return !j.mirror && !j.hide ? U(U({}, y), {}, se({}, M, (0, Zi.default)(y, "".concat(M)) + j.height)) : y
      }, {
        top: p.top || 0,
        bottom: p.bottom || 0
      }),
      w = U(U({}, b), m),
      A = w.bottom;
    h && (w.bottom += h.props.height || wn.defaultProps.height), g && r && (w = zw(w, i, n, r));
    var T = l - w.left - w.right,
      E = f - w.top - w.bottom;
    return U(U({
      brushBottom: A
    }, w), {}, {
      width: Math.max(T, 0),
      height: Math.max(E, 0)
    })
  },
  KU = function(t, r) {
    if (r === "xAxis") return t[r].width;
    if (r === "yAxis") return t[r].height
  },
  eo = function(t) {
    var r = t.chartName,
      n = t.GraphicalChild,
      i = t.defaultTooltipEventType,
      o = i === void 0 ? "axis" : i,
      a = t.validateTooltipEventTypes,
      u = a === void 0 ? ["axis"] : a,
      s = t.axisComponents,
      l = t.legendContent,
      f = t.formatAxisMap,
      c = t.defaultProps,
      p = function(w, A) {
        var T = A.graphicalItems,
          E = A.stackGroups,
          y = A.offset,
          v = A.updateId,
          j = A.dataStartIndex,
          M = A.dataEndIndex,
          N = w.barSize,
          B = w.layout,
          $ = w.barGap,
          R = w.barCategoryGap,
          z = w.maxBarSize,
          H = CT(B),
          W = H.numericAxisName,
          S = H.cateAxisName,
          d = UU(T),
          O = [];
        return T.forEach(function(P, x) {
          var _ = ql(w.data, {
              graphicalItems: [P],
              dataStartIndex: j,
              dataEndIndex: M
            }),
            C = P.type.defaultProps !== void 0 ? U(U({}, P.type.defaultProps), P.props) : P.props,
            D = C.dataKey,
            F = C.maxBarSize,
            Y = C["".concat(W, "Id")],
            X = C["".concat(S, "Id")],
            re = {},
            pe = s.reduce(function(tt, Ue) {
              var xe, we, $r = A["".concat(Ue.axisType, "Map")],
                Zt = C["".concat(Ue.axisType, "Id")];
              $r && $r[Zt] || Ue.axisType === "zAxis" || Ht(!1);
              var _n = $r[Zt];
              return U(U({}, tt), {}, se(se({}, Ue.axisType, _n), "".concat(Ue.axisType, "Ticks"), gt(_n)))
            }, re),
            K = pe[S],
            ae = pe["".concat(S, "Ticks")],
            te = E && E[Y] && E[Y].hasStack && Xw(P, E[Y].stackGroups),
            G = At(P.type).indexOf("Bar") >= 0,
            he = xi(K, ae),
            Z = [],
            ee = d && Fw({
              barSize: N,
              stackGroups: E,
              totalSize: KU(pe, S)
            });
          if (G) {
            var ie, ue, ce = (0, Xi.default)(F) ? z : F,
              fe = (ie = (ue = xi(K, ae, !0)) !== null && ue !== void 0 ? ue : ce) !== null && ie !== void 0 ? ie : 0;
            Z = Ww({
              barGap: $,
              barCategoryGap: R,
              bandSize: fe !== he ? fe : he,
              sizeList: ee[X],
              maxBarSize: ce
            }), fe !== he && (Z = Z.map(function(tt) {
              return U(U({}, tt), {}, {
                position: U(U({}, tt.position), {}, {
                  offset: tt.position.offset - fe / 2
                })
              })
            }))
          }
          var et = P && P.type && P.type.getComposedData;
          et && O.push({
            props: U(U({}, et(U(U({}, pe), {}, {
              displayedData: _,
              props: w,
              dataKey: D,
              item: P,
              bandSize: he,
              barPosition: Z,
              offset: y,
              stackedData: te,
              layout: B,
              dataStartIndex: j,
              dataEndIndex: M
            }))), {}, se(se(se({
              key: P.key || "item-".concat(x)
            }, W, pe[W]), S, pe[S]), "animationId", v)),
            childIndex: dy(P, w.children),
            item: P
          })
        }), O
      },
      h = function(w, A) {
        var T = w.props,
          E = w.dataStartIndex,
          y = w.dataEndIndex,
          v = w.updateId;
        if (!uc({
            props: T
          })) return null;
        var j = T.children,
          M = T.layout,
          N = T.stackOffset,
          B = T.data,
          $ = T.reverseStackOrder,
          R = CT(M),
          z = R.numericAxisName,
          H = R.cateAxisName,
          W = Ie(j, n),
          S = Vw(B, W, "".concat(z, "Id"), "".concat(H, "Id"), N, $),
          d = s.reduce(function(C, D) {
            var F = "".concat(D.axisType, "Map");
            return U(U({}, C), {}, se({}, F, zU(T, U(U({}, D), {}, {
              graphicalItems: W,
              stackGroups: D.axisType === z && S,
              dataStartIndex: E,
              dataEndIndex: y
            }))))
          }, {}),
          O = GU(U(U({}, d), {}, {
            props: T,
            graphicalItems: W
          }), A?.legendBBox);
        Object.keys(d).forEach(function(C) {
          d[C] = f(T, d[C], O, C.replace("Map", ""), r)
        });
        var P = d["".concat(H, "Map")],
          x = HU(P),
          _ = p(T, U(U({}, d), {}, {
            dataStartIndex: E,
            dataEndIndex: y,
            updateId: v,
            graphicalItems: W,
            stackGroups: S,
            offset: O
          }));
        return U(U({
          formattedGraphicalItems: _,
          graphicalItems: W,
          offset: O,
          stackGroups: S
        }, x), d)
      },
      g = function(b) {
        function w(A) {
          var T, E, y;
          return AU(this, w), y = TU(this, w, [A]), se(y, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), se(y, "accessibilityManager", new xT), se(y, "handleLegendBBoxUpdate", function(v) {
            if (v) {
              var j = y.state,
                M = j.dataStartIndex,
                N = j.dataEndIndex,
                B = j.updateId;
              y.setState(U({
                legendBBox: v
              }, h({
                props: y.props,
                dataStartIndex: M,
                dataEndIndex: N,
                updateId: B
              }, U(U({}, y.state), {}, {
                legendBBox: v
              }))))
            }
          }), se(y, "handleReceiveSyncEvent", function(v, j, M) {
            if (y.props.syncId === v) {
              if (M === y.eventEmitterSymbol && typeof y.props.syncMethod != "function") return;
              y.applySyncEvent(j)
            }
          }), se(y, "handleBrushChange", function(v) {
            var j = v.startIndex,
              M = v.endIndex;
            if (j !== y.state.dataStartIndex || M !== y.state.dataEndIndex) {
              var N = y.state.updateId;
              y.setState(function() {
                return U({
                  dataStartIndex: j,
                  dataEndIndex: M
                }, h({
                  props: y.props,
                  dataStartIndex: j,
                  dataEndIndex: M,
                  updateId: N
                }, y.state))
              }), y.triggerSyncEvent({
                dataStartIndex: j,
                dataEndIndex: M
              })
            }
          }), se(y, "handleMouseEnter", function(v) {
            var j = y.getMouseInfo(v);
            if (j) {
              var M = U(U({}, j), {}, {
                isTooltipActive: !0
              });
              y.setState(M), y.triggerSyncEvent(M);
              var N = y.props.onMouseEnter;
              (0, Yt.default)(N) && N(M, v)
            }
          }), se(y, "triggeredAfterMouseMove", function(v) {
            var j = y.getMouseInfo(v),
              M = j ? U(U({}, j), {}, {
                isTooltipActive: !0
              }) : {
                isTooltipActive: !1
              };
            y.setState(M), y.triggerSyncEvent(M);
            var N = y.props.onMouseMove;
            (0, Yt.default)(N) && N(M, v)
          }), se(y, "handleItemMouseEnter", function(v) {
            y.setState(function() {
              return {
                isTooltipActive: !0,
                activeItem: v,
                activePayload: v.tooltipPayload,
                activeCoordinate: v.tooltipPosition || {
                  x: v.cx,
                  y: v.cy
                }
              }
            })
          }), se(y, "handleItemMouseLeave", function() {
            y.setState(function() {
              return {
                isTooltipActive: !1
              }
            })
          }), se(y, "handleMouseMove", function(v) {
            v.persist(), y.throttleTriggeredAfterMouseMove(v)
          }), se(y, "handleMouseLeave", function(v) {
            y.throttleTriggeredAfterMouseMove.cancel();
            var j = {
              isTooltipActive: !1
            };
            y.setState(j), y.triggerSyncEvent(j);
            var M = y.props.onMouseLeave;
            (0, Yt.default)(M) && M(j, v)
          }), se(y, "handleOuterEvent", function(v) {
            var j = py(v),
              M = (0, Zi.default)(y.props, "".concat(j));
            if (j && (0, Yt.default)(M)) {
              var N, B;
              /.*touch.*/i.test(j) ? B = y.getMouseInfo(v.changedTouches[0]) : B = y.getMouseInfo(v), M((N = B) !== null && N !== void 0 ? N : {}, v)
            }
          }), se(y, "handleClick", function(v) {
            var j = y.getMouseInfo(v);
            if (j) {
              var M = U(U({}, j), {}, {
                isTooltipActive: !0
              });
              y.setState(M), y.triggerSyncEvent(M);
              var N = y.props.onClick;
              (0, Yt.default)(N) && N(M, v)
            }
          }), se(y, "handleMouseDown", function(v) {
            var j = y.props.onMouseDown;
            if ((0, Yt.default)(j)) {
              var M = y.getMouseInfo(v);
              j(M, v)
            }
          }), se(y, "handleMouseUp", function(v) {
            var j = y.props.onMouseUp;
            if ((0, Yt.default)(j)) {
              var M = y.getMouseInfo(v);
              j(M, v)
            }
          }), se(y, "handleTouchMove", function(v) {
            v.changedTouches != null && v.changedTouches.length > 0 && y.throttleTriggeredAfterMouseMove(v.changedTouches[0])
          }), se(y, "handleTouchStart", function(v) {
            v.changedTouches != null && v.changedTouches.length > 0 && y.handleMouseDown(v.changedTouches[0])
          }), se(y, "handleTouchEnd", function(v) {
            v.changedTouches != null && v.changedTouches.length > 0 && y.handleMouseUp(v.changedTouches[0])
          }), se(y, "handleDoubleClick", function(v) {
            var j = y.props.onDoubleClick;
            if ((0, Yt.default)(j)) {
              var M = y.getMouseInfo(v);
              j(M, v)
            }
          }), se(y, "handleContextMenu", function(v) {
            var j = y.props.onContextMenu;
            if ((0, Yt.default)(j)) {
              var M = y.getMouseInfo(v);
              j(M, v)
            }
          }), se(y, "triggerSyncEvent", function(v) {
            y.props.syncId !== void 0 && Cl.emit(Il, y.props.syncId, v, y.eventEmitterSymbol)
          }), se(y, "applySyncEvent", function(v) {
            var j = y.props,
              M = j.layout,
              N = j.syncMethod,
              B = y.state.updateId,
              $ = v.dataStartIndex,
              R = v.dataEndIndex;
            if (v.dataStartIndex !== void 0 || v.dataEndIndex !== void 0) y.setState(U({
              dataStartIndex: $,
              dataEndIndex: R
            }, h({
              props: y.props,
              dataStartIndex: $,
              dataEndIndex: R,
              updateId: B
            }, y.state)));
            else if (v.activeTooltipIndex !== void 0) {
              var z = v.chartX,
                H = v.chartY,
                W = v.activeTooltipIndex,
                S = y.state,
                d = S.offset,
                O = S.tooltipTicks;
              if (!d) return;
              if (typeof N == "function") W = N(O, v);
              else if (N === "value") {
                W = -1;
                for (var P = 0; P < O.length; P++)
                  if (O[P].value === v.activeLabel) {
                    W = P;
                    break
                  }
              }
              var x = U(U({}, d), {}, {
                  x: d.left,
                  y: d.top
                }),
                _ = Math.min(z, x.x + x.width),
                C = Math.min(H, x.y + x.height),
                D = O[W] && O[W].value,
                F = Qd(y.state, y.props.data, W),
                Y = O[W] ? {
                  x: M === "horizontal" ? O[W].coordinate : _,
                  y: M === "horizontal" ? C : O[W].coordinate
                } : BT;
              y.setState(U(U({}, v), {}, {
                activeLabel: D,
                activeCoordinate: Y,
                activePayload: F,
                activeTooltipIndex: W
              }))
            } else y.setState(v)
          }), se(y, "renderCursor", function(v) {
            var j, M = y.state,
              N = M.isTooltipActive,
              B = M.activeCoordinate,
              $ = M.activePayload,
              R = M.offset,
              z = M.activeTooltipIndex,
              H = M.tooltipAxisBandSize,
              W = y.getTooltipEventType(),
              S = (j = v.props.active) !== null && j !== void 0 ? j : N,
              d = y.props.layout,
              O = v.key || "_recharts-cursor";
            return Lt.createElement(PT, {
              key: O,
              activeCoordinate: B,
              activePayload: $,
              activeTooltipIndex: z,
              chartName: r,
              element: v,
              isActive: S,
              layout: d,
              offset: R,
              tooltipAxisBandSize: H,
              tooltipEventType: W
            })
          }), se(y, "renderPolarAxis", function(v, j, M) {
            var N = (0, Zi.default)(v, "type.axisType"),
              B = (0, Zi.default)(y.state, "".concat(N, "Map")),
              $ = v.type.defaultProps,
              R = $ !== void 0 ? U(U({}, $), v.props) : v.props,
              z = B && B[R["".concat(N, "Id")]];
            return Vt(v, U(U({}, z), {}, {
              className: ne(N, z.className),
              key: v.key || "".concat(j, "-").concat(M),
              ticks: gt(z, !0)
            }))
          }), se(y, "renderPolarGrid", function(v) {
            var j = v.props,
              M = j.radialLines,
              N = j.polarAngles,
              B = j.polarRadius,
              $ = y.state,
              R = $.radiusAxisMap,
              z = $.angleAxisMap,
              H = er(R),
              W = er(z),
              S = W.cx,
              d = W.cy,
              O = W.innerRadius,
              P = W.outerRadius;
            return Vt(v, {
              polarAngles: Array.isArray(N) ? N : gt(W, !0).map(function(x) {
                return x.coordinate
              }),
              polarRadius: Array.isArray(B) ? B : gt(H, !0).map(function(x) {
                return x.coordinate
              }),
              cx: S,
              cy: d,
              innerRadius: O,
              outerRadius: P,
              key: v.key || "polar-grid",
              radialLines: M
            })
          }), se(y, "renderLegend", function() {
            var v = y.state.formattedGraphicalItems,
              j = y.props,
              M = j.children,
              N = j.width,
              B = j.height,
              $ = y.props.margin || {},
              R = N - ($.left || 0) - ($.right || 0),
              z = ks({
                children: M,
                formattedGraphicalItems: v,
                legendWidth: R,
                legendContent: l
              });
            if (!z) return null;
            var H = z.item,
              W = _T(z, gU);
            return Vt(H, U(U({}, W), {}, {
              chartWidth: N,
              chartHeight: B,
              margin: $,
              onBBoxUpdate: y.handleLegendBBoxUpdate
            }))
          }), se(y, "renderTooltip", function() {
            var v, j = y.props,
              M = j.children,
              N = j.accessibilityLayer,
              B = Ke(M, Ve);
            if (!B) return null;
            var $ = y.state,
              R = $.isTooltipActive,
              z = $.activeCoordinate,
              H = $.activePayload,
              W = $.activeLabel,
              S = $.offset,
              d = (v = B.props.active) !== null && v !== void 0 ? v : R;
            return Vt(B, {
              viewBox: U(U({}, S), {}, {
                x: S.left,
                y: S.top
              }),
              active: d,
              label: W,
              payload: d ? H : [],
              coordinate: z,
              accessibilityLayer: N
            })
          }), se(y, "renderBrush", function(v) {
            var j = y.props,
              M = j.margin,
              N = j.data,
              B = y.state,
              $ = B.offset,
              R = B.dataStartIndex,
              z = B.dataEndIndex,
              H = B.updateId;
            return Vt(v, {
              key: v.key || "_recharts-brush",
              onChange: na(y.handleBrushChange, v.props.onChange),
              data: N,
              x: V(v.props.x) ? v.props.x : $.left,
              y: V(v.props.y) ? v.props.y : $.top + $.height + $.brushBottom - (M.bottom || 0),
              width: V(v.props.width) ? v.props.width : $.width,
              startIndex: R,
              endIndex: z,
              updateId: "brush-".concat(H)
            })
          }), se(y, "renderReferenceElement", function(v, j, M) {
            if (!v) return null;
            var N = y,
              B = N.clipPathId,
              $ = y.state,
              R = $.xAxisMap,
              z = $.yAxisMap,
              H = $.offset,
              W = v.type.defaultProps || {},
              S = v.props,
              d = S.xAxisId,
              O = d === void 0 ? W.xAxisId : d,
              P = S.yAxisId,
              x = P === void 0 ? W.yAxisId : P;
            return Vt(v, {
              key: v.key || "".concat(j, "-").concat(M),
              xAxis: R[O],
              yAxis: z[x],
              viewBox: {
                x: H.left,
                y: H.top,
                width: H.width,
                height: H.height
              },
              clipPathId: B
            })
          }), se(y, "renderActivePoints", function(v) {
            var j = v.item,
              M = v.activePoint,
              N = v.basePoint,
              B = v.childIndex,
              $ = v.isRange,
              R = [],
              z = j.props.key,
              H = j.item.type.defaultProps !== void 0 ? U(U({}, j.item.type.defaultProps), j.item.props) : j.item.props,
              W = H.activeDot,
              S = H.dataKey,
              d = U(U({
                index: B,
                dataKey: S,
                cx: M.x,
                cy: M.y,
                r: 4,
                fill: Qo(j.item),
                strokeWidth: 2,
                stroke: "#fff",
                payload: M.payload,
                value: M.value
              }, Q(W, !1)), Wr(W));
            return R.push(w.renderActiveDot(W, d, "".concat(z, "-activePoint-").concat(B))), N ? R.push(w.renderActiveDot(W, U(U({}, d), {}, {
              cx: N.x,
              cy: N.y
            }), "".concat(z, "-basePoint-").concat(B))) : $ && R.push(null), R
          }), se(y, "renderGraphicChild", function(v, j, M) {
            var N = y.filterFormatItem(v, j, M);
            if (!N) return null;
            var B = y.getTooltipEventType(),
              $ = y.state,
              R = $.isTooltipActive,
              z = $.tooltipAxis,
              H = $.activeTooltipIndex,
              W = $.activeLabel,
              S = y.props.children,
              d = Ke(S, Ve),
              O = N.props,
              P = O.points,
              x = O.isRange,
              _ = O.baseLine,
              C = N.item.type.defaultProps !== void 0 ? U(U({}, N.item.type.defaultProps), N.item.props) : N.item.props,
              D = C.activeDot,
              F = C.hide,
              Y = C.activeBar,
              X = C.activeShape,
              re = !!(!F && R && d && (D || Y || X)),
              pe = {};
            B !== "axis" && d && d.props.trigger === "click" ? pe = {
              onClick: na(y.handleItemMouseEnter, v.props.onClick)
            } : B !== "axis" && (pe = {
              onMouseLeave: na(y.handleItemMouseLeave, v.props.onMouseLeave),
              onMouseEnter: na(y.handleItemMouseEnter, v.props.onMouseEnter)
            });
            var K = Vt(v, U(U({}, N.props), pe));

            function ae(Ue) {
              return typeof z.dataKey == "function" ? z.dataKey(Ue.payload) : null
            }
            if (re)
              if (H >= 0) {
                var te, G;
                if (z.dataKey && !z.allowDuplicatedCategory) {
                  var he = typeof z.dataKey == "function" ? ae : "payload.".concat(z.dataKey.toString());
                  te = In(P, he, W), G = x && _ && In(_, he, W)
                } else te = P?.[H], G = x && _ && _[H];
                if (X || Y) {
                  var Z = v.props.activeIndex !== void 0 ? v.props.activeIndex : H;
                  return [Vt(v, U(U(U({}, N.props), pe), {}, {
                    activeIndex: Z
                  })), null, null]
                }
                if (!(0, Xi.default)(te)) return [K].concat(Qi(y.renderActivePoints({
                  item: N,
                  activePoint: te,
                  basePoint: G,
                  childIndex: H,
                  isRange: x
                })))
              } else {
                var ee, ie = (ee = y.getItemByXY(y.state.activeCoordinate)) !== null && ee !== void 0 ? ee : {
                    graphicalItem: K
                  },
                  ue = ie.graphicalItem,
                  ce = ue.item,
                  fe = ce === void 0 ? v : ce,
                  et = ue.childIndex,
                  tt = U(U(U({}, N.props), pe), {}, {
                    activeIndex: et
                  });
                return [Vt(fe, tt), null, null]
              } return x ? [K, null, null] : [K, null]
          }), se(y, "renderCustomized", function(v, j, M) {
            return Vt(v, U(U({
              key: "recharts-customized-".concat(M)
            }, y.props), y.state))
          }), se(y, "renderMap", {
            CartesianGrid: {
              handler: Rl,
              once: !0
            },
            ReferenceArea: {
              handler: y.renderReferenceElement
            },
            ReferenceLine: {
              handler: Rl
            },
            ReferenceDot: {
              handler: y.renderReferenceElement
            },
            XAxis: {
              handler: Rl
            },
            YAxis: {
              handler: Rl
            },
            Brush: {
              handler: y.renderBrush,
              once: !0
            },
            Bar: {
              handler: y.renderGraphicChild
            },
            Line: {
              handler: y.renderGraphicChild
            },
            Area: {
              handler: y.renderGraphicChild
            },
            Radar: {
              handler: y.renderGraphicChild
            },
            RadialBar: {
              handler: y.renderGraphicChild
            },
            Scatter: {
              handler: y.renderGraphicChild
            },
            Pie: {
              handler: y.renderGraphicChild
            },
            Funnel: {
              handler: y.renderGraphicChild
            },
            Tooltip: {
              handler: y.renderCursor,
              once: !0
            },
            PolarGrid: {
              handler: y.renderPolarGrid,
              once: !0
            },
            PolarAngleAxis: {
              handler: y.renderPolarAxis
            },
            PolarRadiusAxis: {
              handler: y.renderPolarAxis
            },
            Customized: {
              handler: y.renderCustomized
            }
          }), y.clipPathId = "".concat((T = A.id) !== null && T !== void 0 ? T : St("recharts"), "-clip"), y.throttleTriggeredAfterMouseMove = (0, LT.default)(y.triggeredAfterMouseMove, (E = A.throttleDelay) !== null && E !== void 0 ? E : 1e3 / 60), y.state = {}, y
        }
        return jU(w, b), PU(w, [{
          key: "componentDidMount",
          value: function() {
            var T, E;
            this.addListener(), this.accessibilityManager.setDetails({
              container: this.container,
              offset: {
                left: (T = this.props.margin.left) !== null && T !== void 0 ? T : 0,
                top: (E = this.props.margin.top) !== null && E !== void 0 ? E : 0
              },
              coordinateList: this.state.tooltipTicks,
              mouseHandlerCallback: this.triggeredAfterMouseMove,
              layout: this.props.layout
            }), this.displayDefaultTooltip()
          }
        }, {
          key: "displayDefaultTooltip",
          value: function() {
            var T = this.props,
              E = T.children,
              y = T.data,
              v = T.height,
              j = T.layout,
              M = Ke(E, Ve);
            if (M) {
              var N = M.props.defaultIndex;
              if (!(typeof N != "number" || N < 0 || N > this.state.tooltipTicks.length - 1)) {
                var B = this.state.tooltipTicks[N] && this.state.tooltipTicks[N].value,
                  $ = Qd(this.state, y, N, B),
                  R = this.state.tooltipTicks[N].coordinate,
                  z = (this.state.offset.top + v) / 2,
                  H = j === "horizontal",
                  W = H ? {
                    x: R,
                    y: z
                  } : {
                    y: R,
                    x: z
                  },
                  S = this.state.formattedGraphicalItems.find(function(O) {
                    var P = O.item;
                    return P.type.name === "Scatter"
                  });
                S && (W = U(U({}, W), S.props.points[N].tooltipPosition), $ = S.props.points[N].tooltipPayload);
                var d = {
                  activeTooltipIndex: N,
                  isTooltipActive: !0,
                  activeLabel: B,
                  activePayload: $,
                  activeCoordinate: W
                };
                this.setState(d), this.renderCursor(M), this.accessibilityManager.setIndex(N)
              }
            }
          }
        }, {
          key: "getSnapshotBeforeUpdate",
          value: function(T, E) {
            if (!this.props.accessibilityLayer) return null;
            if (this.state.tooltipTicks !== E.tooltipTicks && this.accessibilityManager.setDetails({
                coordinateList: this.state.tooltipTicks
              }), this.props.layout !== T.layout && this.accessibilityManager.setDetails({
                layout: this.props.layout
              }), this.props.margin !== T.margin) {
              var y, v;
              this.accessibilityManager.setDetails({
                offset: {
                  left: (y = this.props.margin.left) !== null && y !== void 0 ? y : 0,
                  top: (v = this.props.margin.top) !== null && v !== void 0 ? v : 0
                }
              })
            }
            return null
          }
        }, {
          key: "componentDidUpdate",
          value: function(T) {
            mu([Ke(T.children, Ve)], [Ke(this.props.children, Ve)]) || this.displayDefaultTooltip()
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel()
          }
        }, {
          key: "getTooltipEventType",
          value: function() {
            var T = Ke(this.props.children, Ve);
            if (T && typeof T.props.shared == "boolean") {
              var E = T.props.shared ? "axis" : "item";
              return u.indexOf(E) >= 0 ? E : o
            }
            return o
          }
        }, {
          key: "getMouseInfo",
          value: function(T) {
            if (!this.container) return null;
            var E = this.container,
              y = E.getBoundingClientRect(),
              v = Ox(y),
              j = {
                chartX: Math.round(T.pageX - v.left),
                chartY: Math.round(T.pageY - v.top)
              },
              M = y.width / E.offsetWidth || 1,
              N = this.inRange(j.chartX, j.chartY, M);
            if (!N) return null;
            var B = this.state,
              $ = B.xAxisMap,
              R = B.yAxisMap,
              z = this.getTooltipEventType(),
              H = kT(this.state, this.props.data, this.props.layout, N);
            if (z !== "axis" && $ && R) {
              var W = er($).scale,
                S = er(R).scale,
                d = W && W.invert ? W.invert(j.chartX) : null,
                O = S && S.invert ? S.invert(j.chartY) : null;
              return U(U({}, j), {}, {
                xValue: d,
                yValue: O
              }, H)
            }
            return H ? U(U({}, j), H) : null
          }
        }, {
          key: "inRange",
          value: function(T, E) {
            var y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
              v = this.props.layout,
              j = T / y,
              M = E / y;
            if (v === "horizontal" || v === "vertical") {
              var N = this.state.offset,
                B = j >= N.left && j <= N.left + N.width && M >= N.top && M <= N.top + N.height;
              return B ? {
                x: j,
                y: M
              } : null
            }
            var $ = this.state,
              R = $.angleAxisMap,
              z = $.radiusAxisMap;
            if (R && z) {
              var H = er(R);
              return Hp({
                x: j,
                y: M
              }, H)
            }
            return null
          }
        }, {
          key: "parseEventsOfWrapper",
          value: function() {
            var T = this.props.children,
              E = this.getTooltipEventType(),
              y = Ke(T, Ve),
              v = {};
            y && E === "axis" && (y.props.trigger === "click" ? v = {
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
            var j = Wr(this.props, this.handleOuterEvent);
            return U(U({}, j), v)
          }
        }, {
          key: "addListener",
          value: function() {
            Cl.on(Il, this.handleReceiveSyncEvent)
          }
        }, {
          key: "removeListener",
          value: function() {
            Cl.removeListener(Il, this.handleReceiveSyncEvent)
          }
        }, {
          key: "filterFormatItem",
          value: function(T, E, y) {
            for (var v = this.state.formattedGraphicalItems, j = 0, M = v.length; j < M; j++) {
              var N = v[j];
              if (N.item === T || N.props.key === T.key || E === At(N.item.type) && y === N.childIndex) return N
            }
            return null
          }
        }, {
          key: "renderClipPath",
          value: function() {
            var T = this.clipPathId,
              E = this.state.offset,
              y = E.left,
              v = E.top,
              j = E.height,
              M = E.width;
            return Lt.createElement("defs", null, Lt.createElement("clipPath", {
              id: T
            }, Lt.createElement("rect", {
              x: y,
              y: v,
              height: j,
              width: M
            })))
          }
        }, {
          key: "getXScales",
          value: function() {
            var T = this.state.xAxisMap;
            return T ? Object.entries(T).reduce(function(E, y) {
              var v = TT(y, 2),
                j = v[0],
                M = v[1];
              return U(U({}, E), {}, se({}, j, M.scale))
            }, {}) : null
          }
        }, {
          key: "getYScales",
          value: function() {
            var T = this.state.yAxisMap;
            return T ? Object.entries(T).reduce(function(E, y) {
              var v = TT(y, 2),
                j = v[0],
                M = v[1];
              return U(U({}, E), {}, se({}, j, M.scale))
            }, {}) : null
          }
        }, {
          key: "getXScaleByAxisId",
          value: function(T) {
            var E;
            return (E = this.state.xAxisMap) === null || E === void 0 || (E = E[T]) === null || E === void 0 ? void 0 : E.scale
          }
        }, {
          key: "getYScaleByAxisId",
          value: function(T) {
            var E;
            return (E = this.state.yAxisMap) === null || E === void 0 || (E = E[T]) === null || E === void 0 ? void 0 : E.scale
          }
        }, {
          key: "getItemByXY",
          value: function(T) {
            var E = this.state,
              y = E.formattedGraphicalItems,
              v = E.activeItem;
            if (y && y.length)
              for (var j = 0, M = y.length; j < M; j++) {
                var N = y[j],
                  B = N.props,
                  $ = N.item,
                  R = $.type.defaultProps !== void 0 ? U(U({}, $.type.defaultProps), $.props) : $.props,
                  z = At($.type);
                if (z === "Bar") {
                  var H = (B.data || []).find(function(O) {
                    return uS(T, O)
                  });
                  if (H) return {
                    graphicalItem: N,
                    payload: H
                  }
                } else if (z === "RadialBar") {
                  var W = (B.data || []).find(function(O) {
                    return Hp(T, O)
                  });
                  if (W) return {
                    graphicalItem: N,
                    payload: W
                  }
                } else if (ka(N, v) || Ma(N, v) || Ei(N, v)) {
                  var S = ZS({
                      graphicalItem: N,
                      activeTooltipItem: v,
                      itemData: R.data
                    }),
                    d = R.activeIndex === void 0 ? S : R.activeIndex;
                  return {
                    graphicalItem: U(U({}, N), {}, {
                      childIndex: d
                    }),
                    payload: Ei(N, v) ? R.data[S] : N.props.data[S]
                  }
                }
              }
            return null
          }
        }, {
          key: "render",
          value: function() {
            var T = this;
            if (!uc(this)) return null;
            var E = this.props,
              y = E.children,
              v = E.className,
              j = E.width,
              M = E.height,
              N = E.style,
              B = E.compact,
              $ = E.title,
              R = E.desc,
              z = _T(E, bU),
              H = Q(z, !1);
            if (B) return Lt.createElement(kd, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, Lt.createElement(so, Yi({}, H, {
              width: j,
              height: M,
              title: $,
              desc: R
            }), this.renderClipPath(), sc(y, this.renderMap)));
            if (this.props.accessibilityLayer) {
              var W, S;
              H.tabIndex = (W = this.props.tabIndex) !== null && W !== void 0 ? W : 0, H.role = (S = this.props.role) !== null && S !== void 0 ? S : "application", H.onKeyDown = function(O) {
                T.accessibilityManager.keyboardEvent(O)
              }, H.onFocus = function() {
                T.accessibilityManager.focus()
              }
            }
            var d = this.parseEventsOfWrapper();
            return Lt.createElement(kd, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, Lt.createElement("div", Yi({
              className: ne("recharts-wrapper", v),
              style: U({
                position: "relative",
                cursor: "default",
                width: j,
                height: M
              }, N)
            }, d, {
              ref: function(P) {
                T.container = P
              }
            }), Lt.createElement(so, Yi({}, H, {
              width: j,
              height: M,
              title: $,
              desc: R,
              style: BU
            }), this.renderClipPath(), sc(y, this.renderMap)), this.renderLegend(), this.renderTooltip()))
          }
        }])
      }(NU);
    se(g, "displayName", r), se(g, "defaultProps", U({
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
    }, c)), se(g, "getDerivedStateFromProps", function(b, w) {
      var A = b.dataKey,
        T = b.data,
        E = b.children,
        y = b.width,
        v = b.height,
        j = b.layout,
        M = b.stackOffset,
        N = b.margin,
        B = w.dataStartIndex,
        $ = w.dataEndIndex;
      if (w.updateId === void 0) {
        var R = MT(b);
        return U(U(U({}, R), {}, {
          updateId: 0
        }, h(U(U({
          props: b
        }, R), {}, {
          updateId: 0
        }), w)), {}, {
          prevDataKey: A,
          prevData: T,
          prevWidth: y,
          prevHeight: v,
          prevLayout: j,
          prevStackOffset: M,
          prevMargin: N,
          prevChildren: E
        })
      }
      if (A !== w.prevDataKey || T !== w.prevData || y !== w.prevWidth || v !== w.prevHeight || j !== w.prevLayout || M !== w.prevStackOffset || !fr(N, w.prevMargin)) {
        var z = MT(b),
          H = {
            chartX: w.chartX,
            chartY: w.chartY,
            isTooltipActive: w.isTooltipActive
          },
          W = U(U({}, kT(w, T, j)), {}, {
            updateId: w.updateId + 1
          }),
          S = U(U(U({}, z), H), W);
        return U(U(U({}, S), h(U({
          props: b
        }, S), w)), {}, {
          prevDataKey: A,
          prevData: T,
          prevWidth: y,
          prevHeight: v,
          prevLayout: j,
          prevStackOffset: M,
          prevMargin: N,
          prevChildren: E
        })
      }
      if (!mu(E, w.prevChildren)) {
        var d, O, P, x, _ = Ke(E, wn),
          C = _ && (d = (O = _.props) === null || O === void 0 ? void 0 : O.startIndex) !== null && d !== void 0 ? d : B,
          D = _ && (P = (x = _.props) === null || x === void 0 ? void 0 : x.endIndex) !== null && P !== void 0 ? P : $,
          F = C !== B || D !== $,
          Y = !(0, Xi.default)(T),
          X = Y && !F ? w.updateId : w.updateId + 1;
        return U(U({
          updateId: X
        }, h(U(U({
          props: b
        }, w), {}, {
          updateId: X,
          dataStartIndex: C,
          dataEndIndex: D
        }), w)), {}, {
          prevChildren: E,
          dataStartIndex: C,
          dataEndIndex: D
        })
      }
      return null
    }), se(g, "renderActiveDot", function(b, w, A) {
      var T;
      return DU(b) ? T = Vt(b, w) : (0, Yt.default)(b) ? T = b(w) : T = Lt.createElement(Rr, w), Lt.createElement(le, {
        className: "recharts-active-dot",
        key: A
      }, T)
    });
    var m = RU(function(w, A) {
      return Lt.createElement(g, Yi({}, w, {
        ref: A
      }))
    });
    return m.displayName = g.displayName, m
  };
var em = eo({
  chartName: "LineChart",
  GraphicalChild: Dt,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Rt
  }, {
    axisType: "yAxis",
    AxisComp: ct
  }],
  formatAxisMap: dl
});
var Va = eo({
  chartName: "BarChart",
  GraphicalChild: We,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Rt
  }, {
    axisType: "yAxis",
    AxisComp: ct
  }],
  formatAxisMap: dl
});
var tm = eo({
  chartName: "PieChart",
  GraphicalChild: It,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: Ta
  }, {
    axisType: "radiusAxis",
    AxisComp: Pa
  }],
  formatAxisMap: rO,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
import VU from "./react-shim-eraudit.js";
import {
  jsx as FT,
  jsxs as $T
} from "./react-jsx-shim-eraudit.js";
var Bt = class extends VU.Component {
  constructor(t) {
    super(t), this.state = {
      hasError: !1,
      message: null
    }, this.handleReset = this.handleReset.bind(this)
  }
  static getDerivedStateFromError(t) {
    return {
      hasError: !0,
      message: t?.message || String(t)
    }
  }
  componentDidCatch(t, r) {
    console.error("[SubErrorBoundary]", this.props.label || "(unlabelled)", t, r)
  }
  handleReset() {
    this.setState({
      hasError: !1,
      message: null
    })
  }
  render() {
    if (this.state.hasError) {
      let t = this.props.label || "\u0E2A\u0E48\u0E27\u0E19\u0E19\u0E35\u0E49";
      return $T("div", {
        role: "alert",
        className: "rounded-lg my-3 p-4 text-[13px]",
        style: {
          background: "rgba(244,63,94,0.06)",
          border: "1px solid rgba(244,63,94,0.2)",
          color: "#9f1239"
        },
        children: [$T("div", {
          style: {
            fontWeight: 700,
            marginBottom: 4
          },
          children: ["\u26A0\uFE0F \u0E42\u0E2B\u0E25\u0E14 ", t, " \u0E44\u0E21\u0E48\u0E44\u0E14\u0E49"]
        }), FT("div", {
          style: {
            fontSize: "11px",
            opacity: .7,
            marginBottom: 8
          },
          children: this.state.message
        }), FT("button", {
          type: "button",
          onClick: this.handleReset,
          className: "px-3 py-1 rounded font-semibold",
          style: {
            background: "#fff",
            border: "1px solid rgba(244,63,94,0.25)",
            color: "#be123c",
            fontSize: "11px",
            cursor: "pointer"
          },
          children: "\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48"
        })]
      })
    }
    return this.props.children
  }
};
import {
  Fragment as nm,
  jsx as k,
  jsxs as q
} from "./react-jsx-shim-eraudit.js";
var L = {
    red: "#f43f5e",
    redAlt: "#ef4444",
    amber: "#f59e0b",
    yellow: "#eab308",
    green: "#10b981",
    purple: "#7c3aed",
    purpleAlt: "#8b5cf6",
    cyan: "#0ea5e9",
    pink: "#ec4899",
    orange: "#fb923c",
    gray: "#94a3b8"
  },
  sr = [{
    id: "stroke",
    name_th: "Stroke",
    code: "I60\u2013I64",
    color: L.pink,
    icon: "\u{1F9E0}"
  }, {
    id: "stemi",
    name_th: "STEMI",
    code: "I21.x",
    color: L.orange,
    icon: "\u{1FAC0}"
  }, {
    id: "sepsis",
    name_th: "Sepsis",
    code: "A40/A41/R65.2",
    color: L.cyan,
    icon: "\u{1F9A0}"
  }, {
    id: "trauma",
    name_th: "Trauma",
    code: "er_pt_type=2",
    color: L.red,
    icon: "\u{1F6A8}"
  }],
  qr = {
    210201: {
      name: "\u0E2A\u0E33\u0E19\u0E31\u0E01\u0E17\u0E49\u0E2D\u0E19",
      color: L.green
    },
    210202: {
      name: "\u0E1E\u0E25\u0E32",
      color: L.cyan
    },
    210203: {
      name: "\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07",
      color: L.yellow
    }
  },
  YU = () => new Date().toISOString().slice(0, 10),
  oe = e => e == null ? "\u2014" : Number(e).toLocaleString("th-TH");

function XU() {
  let e = new Date,
    t = e.getFullYear(),
    n = e.getMonth() + 1 >= 10 ? t : t - 1;
  return {
    from: `${n}-10-01`,
    to: `${n+1}-09-30`,
    label: `\u0E1B\u0E35\u0E07\u0E1A ${n+1+543}`
  }
}
var to = XU();

function lr({
  from: e,
  to: t,
  icon: r,
  label: n,
  sub: i
}) {
  return q("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "-4px"
    },
    children: [k("div", {
      style: {
        width: "3px",
        height: "18px",
        background: `linear-gradient(180deg, ${e}, ${t})`,
        borderRadius: "99px"
      }
    }), q("span", {
      style: {
        fontSize: "var(--fs-sm)",
        fontWeight: 800,
        color: "var(--md-text-primary)",
        letterSpacing: "-0.01em"
      },
      children: [r, " ", n]
    }), i && k("span", {
      style: {
        fontSize: "11px",
        color: "var(--md-text-tertiary)",
        fontWeight: 600,
        background: `${e}15`,
        padding: "2px 8px",
        borderRadius: "99px"
      },
      children: i
    })]
  })
}

function $l({
  icon: e,
  label: t,
  value: r,
  sub: n,
  color: i = L.cyan
}) {
  return q("div", {
    className: "glass-card",
    style: {
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      borderLeft: `4px solid ${i}`,
      background: `${i}05`,
      flex: "1 1 180px"
    },
    children: [k("div", {
      style: {
        fontSize: "24px"
      },
      children: e
    }), q("div", {
      style: {
        flex: 1,
        minWidth: 0
      },
      children: [k("p", {
        style: {
          margin: 0,
          fontSize: "11px",
          fontWeight: 800,
          color: i,
          textTransform: "uppercase",
          letterSpacing: "0.08em"
        },
        children: t
      }), k("p", {
        style: {
          margin: "2px 0 0",
          fontSize: "20px",
          fontWeight: 900,
          color: "var(--md-text-primary)",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums"
        },
        children: r
      }), n && k("p", {
        style: {
          margin: "2px 0 0",
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600
        },
        children: n
      })]
    })]
  })
}

function ZU() {
  let [e, t] = Or(null), [r, n] = Or(null), [i, o] = Or(null), [a, u] = Or(!0), [s, l] = Or(null), [f, c] = Or("all"), [p, h] = Or("all"), [g, m] = Or(to.from), [b, w] = Or(to.to), A = rm(async (d, O) => {
    u(!0);
    try {
      let P = `from=${d}&to=${O}`,
        [x, _] = await Promise.all([fetch(`/api/eraudit/summary?${P}`, {
          credentials: "include"
        }), fetch(`/api/eraudit/diseases?${P}`, {
          credentials: "include"
        })]);
      if (!x.ok) throw new Error(`summary HTTP ${x.status}`);
      if (!_.ok) throw new Error(`diseases HTTP ${_.status}`);
      t(await x.json()), n(await _.json()), l(null)
    } catch (P) {
      l(P.message)
    } finally {
      u(!1)
    }
  }, []), T = rm(async () => {
    try {
      let O = `${Number(to.to.slice(0,4))-3}-10-01`,
        P = to.to,
        x = await fetch(`/api/eraudit/summary?from=${O}&to=${P}`, {
          credentials: "include"
        });
      if (!x.ok) return;
      o(await x.json())
    } catch {}
  }, []);
  WT(() => {
    A(g, b)
  }, [A, g, b]), WT(() => {
    T()
  }, [T]);
  let E = Xt(() => (e?.rows || []).filter(O => p === "all" || O.addressid === p), [e, p]),
    y = rm(d => f === "trauma" ? {
      trauma: d.trauma,
      non_trauma: 0,
      total: d.trauma
    } : f === "non-trauma" ? {
      trauma: 0,
      non_trauma: d.non_trauma,
      total: d.non_trauma
    } : {
      trauma: d.trauma,
      non_trauma: d.non_trauma,
      total: d.total
    }, [f]),
    v = Xt(() => {
      let d = {
        trauma: 0,
        non_trauma: 0,
        total: 0
      };
      for (let P of E) {
        let x = y(P);
        d.trauma += x.trauma, d.non_trauma += x.non_trauma, d.total += x.total
      }
      let O = d.total > 0 ? +(d.trauma / d.total * 100).toFixed(1) : 0;
      return {
        ...d,
        pct: O
      }
    }, [E, y]),
    j = Xt(() => {
      let d = {};
      for (let O of Object.keys(qr)) d[O] = {
        addressid: O,
        tambon: qr[O].name,
        color: qr[O].color,
        trauma: 0,
        non_trauma: 0,
        total: 0
      };
      for (let O of E) {
        let P = d[O.addressid];
        if (!P) continue;
        let x = y(O);
        P.trauma += x.trauma, P.non_trauma += x.non_trauma, P.total += x.total
      }
      return Object.values(d)
    }, [E, y]),
    M = Xt(() => {
      let d = {};
      for (let O of E) {
        let P = (O.ym || "").slice(0, 4);
        if (!P) continue;
        d[P] || (d[P] = {
          yr: P,
          trauma: 0,
          non_trauma: 0,
          total: 0
        });
        let x = y(O);
        d[P].trauma += x.trauma, d[P].non_trauma += x.non_trauma, d[P].total += x.total
      }
      return Object.values(d).sort((O, P) => O.yr.localeCompare(P.yr)).map(O => ({
        ...O,
        pct: O.total > 0 ? +(O.trauma / O.total * 100).toFixed(1) : 0
      }))
    }, [E, y]),
    N = Xt(() => {
      let d = i?.rows || [],
        O = {};
      for (let x of d) {
        if (p !== "all" && x.addressid !== p) continue;
        let _ = parseInt(x.ym.slice(0, 4), 10),
          D = parseInt(x.ym.slice(5, 7), 10) >= 10 ? _ + 1 : _,
          F = D + 543,
          Y = D;
        O[Y] || (O[Y] = {
          yr: String(D),
          fyBE: F,
          fyLabel: `\u0E1B\u0E35\u0E07\u0E1A ${F}`,
          trauma: 0,
          non_trauma: 0,
          total: 0
        });
        let X = y(x);
        O[Y].trauma += X.trauma, O[Y].non_trauma += X.non_trauma, O[Y].total += X.total
      }
      return Object.values(O).sort((x, _) => Number(x.yr) - Number(_.yr)).map(x => ({
        ...x,
        pct: x.total > 0 ? +(x.trauma / x.total * 100).toFixed(1) : 0
      })).slice(-3)
    }, [i, p, y]),
    B = Xt(() => (r?.rows || []).filter(O => p === "all" || O.addressid === p), [r, p]),
    $ = Xt(() => {
      let d = {};
      for (let O of B) d[O.ym] || (d[O.ym] = {
        ym: O.ym,
        stroke: 0,
        stemi: 0,
        sepsis: 0,
        trauma: 0
      }), d[O.ym].stroke += O.stroke, d[O.ym].stemi += O.stemi, d[O.ym].sepsis += O.sepsis;
      for (let O of E) d[O.ym] || (d[O.ym] = {
        ym: O.ym,
        stroke: 0,
        stemi: 0,
        sepsis: 0,
        trauma: 0
      }), d[O.ym].trauma += O.trauma;
      return Object.values(d).sort((O, P) => O.ym.localeCompare(P.ym))
    }, [B, E]),
    R = Xt(() => {
      let d = {
        stroke: 0,
        stemi: 0,
        sepsis: 0,
        trauma: 0
      };
      for (let O of $) d.stroke += O.stroke, d.stemi += O.stemi, d.sepsis += O.sepsis, d.trauma += O.trauma;
      return d
    }, [$]),
    z = Xt(() => {
      let d = {};
      for (let x of Object.keys(qr)) d[x] = {
        tambon: qr[x].name,
        addressid: x,
        stroke: 0,
        stemi: 0,
        sepsis: 0,
        trauma: 0
      };
      let O = r?.rows || [],
        P = e?.rows || [];
      for (let x of O) {
        let _ = d[x.addressid];
        _ && (_.stroke += x.stroke, _.stemi += x.stemi, _.sepsis += x.sepsis)
      }
      for (let x of P) {
        let _ = d[x.addressid];
        _ && (_.trauma += x.trauma)
      }
      return d
    }, [r, e]),
    H = Xt(() => sr.map(d => ({
      disease: d.name_th,
      \u0E2A\u0E33\u0E19\u0E31\u0E01\u0E17\u0E49\u0E2D\u0E19: z[210201][d.id],
      \u0E1E\u0E25\u0E32: z[210202][d.id],
      \u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07: z[210203][d.id]
    })), [z]),
    W = Xt(() => {
      if (!e?.rows?.length) return [];
      let d = [],
        O = {
          210201: 12500,
          210202: 8800,
          210203: 25200
        },
        P = [...j].sort((Z, ee) => ee.total - Z.total),
        x = P[0] || {
          tambon: "\u2014",
          total: 0,
          addressid: "",
          color: L.gray
        },
        _ = P.filter(Z => Z.total > 0).slice(-1)[0] || {
          total: 0
        },
        C = v.total > 0 ? Math.round(x.total / v.total * 100) : 0,
        D = R.stroke + R.stemi + R.sepsis,
        F = M.length > 0 ? Object.keys($.reduce((Z, ee) => (Z[ee.ym] = 1, Z), {})).length : 0,
        Y = F > 0 ? Math.round(v.total / F) : 0,
        X = Y > 0 ? Math.round(Y / 30) : 0,
        re = Object.values(O).reduce((Z, ee) => Z + ee, 0),
        pe = re > 0 && F >= 12 ? Math.round(v.total / (F / 12) / re * 1e3) : null,
        K = [];
      K.push(`\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 ER \u0E17\u0E31\u0E49\u0E07\u0E2A\u0E34\u0E49\u0E19 ${oe(v.total)} \u0E23\u0E32\u0E22 \xB7 Trauma ${v.pct}%`), X > 0 && K.push(`\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${oe(X)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19`), C >= 50 && K.push(`${x.tambon} ${C}%`), D > 0 && K.push(`\u0E42\u0E23\u0E04\u0E2B\u0E19\u0E31\u0E01 ${oe(D)} \u0E23\u0E32\u0E22`), d.push({
        priority: "HIGH",
        icon: "\u{1F3AF}",
        color: L.purple,
        title: "Executive Overview \u2014 \u0E2A\u0E23\u0E38\u0E1B 30 \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",
        body: K.join(" \xB7 ") + ` \xB7 ${v.pct>20?"Trauma \u0E2A\u0E39\u0E07 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 RTI/\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22":v.pct<10?"\u0E40\u0E04\u0E2A\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B\u0E40\u0E14\u0E48\u0E19 \u2014 ER \u0E23\u0E31\u0E1A\u0E07\u0E32\u0E19 OPD overflow":"Case mix \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"} \xB7 \u0E14\u0E39\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E16\u0E31\u0E14\u0E44\u0E1B`
      });
      let ae = pe !== null ? pe > 400 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E20\u0E39\u0E21\u0E34\u0E20\u0E32\u0E04 (250-350 \u0E23\u0E32\u0E22/\u0E1E\u0E31\u0E19/\u0E1B\u0E35) \u2014 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07 ER \u0E02\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19 \u0E2D.\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07 \u0E2A\u0E39\u0E07" : pe > 250 ? "\u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E20\u0E39\u0E21\u0E34\u0E20\u0E32\u0E04 (250-350 \u0E23\u0E32\u0E22/\u0E1E\u0E31\u0E19/\u0E1B\u0E35)" : "\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E20\u0E39\u0E21\u0E34\u0E20\u0E32\u0E04 \u2014 \u0E2D\u0E32\u0E08\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07 \u0E23\u0E1E.\u0E2A\u0E15. \u0E17\u0E35\u0E48\u0E14\u0E35 \u0E2B\u0E23\u0E37\u0E2D\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E2D\u0E37\u0E48\u0E19" : "";
      if (d.push({
          priority: "HIGH",
          icon: "\u{1F4CA}",
          color: L.cyan,
          title: "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 ER \xB7 \u0E2D.\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07",
          body: `\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${g.slice(0,7)} \u2192 ${b.slice(0,7)} (${F} \u0E40\u0E14\u0E37\u0E2D\u0E19) \u0E21\u0E35\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 ER ${oe(v.total)} \u0E23\u0E32\u0E22 \u2014 Trauma ${oe(v.trauma)} \u0E23\u0E32\u0E22 (${v.pct}%) \xB7 Non-Trauma ${oe(v.non_trauma)} \u0E23\u0E32\u0E22 (${(100-v.pct).toFixed(1)}%) \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${oe(Y)} \u0E23\u0E32\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19${X>0?` \u0E2B\u0E23\u0E37\u0E2D ${X} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19`:""}${pe!==null?` \xB7 \u0E2D\u0E31\u0E15\u0E23\u0E32 ${pe} \u0E23\u0E32\u0E22/\u0E1E\u0E31\u0E19\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E01\u0E23/\u0E1B\u0E35 \u2014 ${ae}`:""} \xB7 ${v.pct>20?"\u26A0\uFE0F \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Trauma \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 MoPH 15-20% \u2014 \u0E40\u0E04\u0E2A\u0E2D\u0E38\u0E1A\u0E31\u0E15\u0E34\u0E40\u0E2B\u0E15\u0E38\u0E08\u0E23\u0E32\u0E08\u0E23\u0E19\u0E48\u0E32\u0E08\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E1B\u0E31\u0E08\u0E08\u0E31\u0E22\u0E2B\u0E25\u0E31\u0E01 \u0E04\u0E27\u0E23\u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A \u0E02\u0E19\u0E2A\u0E48\u0E07 \xB7 \u0E15\u0E23. \u0E14\u0E39 Hot Spot \u0E16\u0E19\u0E19":v.pct<10?"\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Trauma \u0E15\u0E48\u0E33 \u2014 ER \u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B (OPD overflow) \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01 \u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E02\u0E22\u0E32\u0E22 OPD \u0E19\u0E2D\u0E01\u0E40\u0E27\u0E25\u0E32":"\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Trauma \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 MoPH (15-20%)"}`
        }), x.total > 0) {
        let Z = O[x.addressid],
          ee = Z && F >= 12 ? Math.round(x.total / (F / 12) / Z * 1e3) : null,
          ie = Z ? Math.round(Z / re * 100) : null,
          ue = ie !== null ? C - ie : null;
        d.push({
          priority: C >= 55 ? "HIGH" : "MEDIUM",
          icon: "\u{1F4CD}",
          color: x.color,
          title: `\u0E15\u0E33\u0E1A\u0E25\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 \xB7 ${x.tambon} (${C}%)`,
          body: `${x.tambon} (${x.addressid}) ${oe(x.total)} \u0E23\u0E32\u0E22 \u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19 ${C}% \u0E02\u0E2D\u0E07 ER \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14${ie!==null?` \xB7 \u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E01\u0E23\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${(Z/1e3).toFixed(1)}K (${ie}% \u0E02\u0E2D\u0E07 \u0E2D.) `:""}${ue!==null?`${ue>5?`\xB7 \u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 \u0E1B\u0E0A\u0E01. ${ue}% \u2014 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E20\u0E32\u0E23\u0E30\u0E42\u0E23\u0E04/\u0E2D\u0E38\u0E1A\u0E31\u0E15\u0E34\u0E40\u0E2B\u0E15\u0E38\u0E17\u0E35\u0E48\u0E01\u0E23\u0E30\u0E08\u0E38\u0E01\u0E15\u0E31\u0E27`:ue<-5?`\xB7 \u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 \u0E1B\u0E0A\u0E01. ${Math.abs(ue)}% \u2014 \u0E2D\u0E32\u0E08\u0E40\u0E02\u0E49\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E2D\u0E37\u0E48\u0E19`:"\xB7 \u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 \u0E1B\u0E0A\u0E01."}`:""}${ee!==null?` \xB7 \u0E2D\u0E31\u0E15\u0E23\u0E32 ${ee} \u0E23\u0E32\u0E22/\u0E1E\u0E31\u0E19 \u0E1B\u0E0A\u0E01./\u0E1B\u0E35`:""} \xB7 \u0E41\u0E1C\u0E19: 1) \u0E2A\u0E23\u0E49\u0E32\u0E07 Dashboard \u0E2A\u0E48\u0E07\u0E43\u0E2B\u0E49 \u0E1C\u0E2D.\u0E23\u0E1E.\u0E2A\u0E15.${x.tambon} \u0E14\u0E39\u0E04\u0E19\u0E02\u0E2D\u0E07\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 2) \u0E43\u0E0A\u0E49\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Top 3 \u0E42\u0E23\u0E04\u0E43\u0E19 ${x.tambon} \u0E17\u0E33 Outreach Health Talk \u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 3) \u0E1D\u0E36\u0E01 \u0E2D\u0E2A\u0E21. \u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07 early signs Stroke/MI/Sepsis`
        })
      }
      if (v.total >= 100 && d.push({
          priority: v.pct > 25 || v.pct < 8 ? "HIGH" : "MEDIUM",
          icon: "\u{1F6A8}",
          color: L.red,
          title: `Trauma Ratio \xB7 ${v.pct}% (\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 MoPH: 15-20%)`,
          body: v.pct > 25 ? `\u0E2D\u0E31\u0E15\u0E23\u0E32 Trauma ${v.pct}% \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 5-10 \u0E08\u0E38\u0E14 \u2014 \u0E40\u0E04\u0E2A\u0E19\u0E48\u0E32\u0E08\u0E30\u0E40\u0E1B\u0E47\u0E19 RTI (\u0E2D\u0E38\u0E1A\u0E31\u0E15\u0E34\u0E40\u0E2B\u0E15\u0E38\u0E08\u0E23\u0E32\u0E08\u0E23) \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01 \xB7 \u0E1B\u0E31\u0E08\u0E08\u0E31\u0E22\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07: \u0E2D.\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07\u0E21\u0E35\u0E16\u0E19\u0E19\u0E2A\u0E32\u0E22\u0E2B\u0E25\u0E31\u0E01\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21 EEC + \u0E19\u0E34\u0E04\u0E21\u0E2D\u0E38\u0E15\u0E2A\u0E32\u0E2B\u0E01\u0E23\u0E23\u0E21 \xB7 \u0E41\u0E1C\u0E19\u0E15\u0E2D\u0E1A\u0E42\u0E15\u0E49: (\u0E01) \u0E02\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 GPS \u0E08\u0E38\u0E14\u0E40\u0E01\u0E34\u0E14\u0E40\u0E2B\u0E15\u0E38\u0E08\u0E32\u0E01 \u0E01\u0E39\u0E49\u0E20\u0E31\u0E22/\u0E15\u0E23. \u0E21\u0E32\u0E17\u0E33 Heat Map (\u0E02) \u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19 \u0E02\u0E19\u0E2A\u0E48\u0E07\u0E08\u0E31\u0E07\u0E2B\u0E27\u0E31\u0E14 \u0E17\u0E33 Speed Camera/\u0E1E\u0E23\u0E1A. (\u0E04) \u0E15\u0E31\u0E49\u0E07 Trauma KPI: \u0E25\u0E14 RTI \u226510% \u0E43\u0E19 12 \u0E40\u0E14\u0E37\u0E2D\u0E19 (\u0E07) \u0E1D\u0E36\u0E01 Pre-Hospital First Aid \u0E2D\u0E2A\u0E21.` : v.pct < 8 ? `\u0E2D\u0E31\u0E15\u0E23\u0E32 Trauma \u0E15\u0E48\u0E33 ${v.pct}% (\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19) \u2014 ER \u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A Non-Trauma \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 1) OPD \u0E1B\u0E34\u0E14/\u0E44\u0E21\u0E48\u0E1E\u0E2D \u2192 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E21\u0E32 ER \u0E41\u0E17\u0E19 2) \u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19\u0E40\u0E25\u0E37\u0E2D\u0E01 ER \u0E40\u0E1E\u0E23\u0E32\u0E30\u0E23\u0E2D\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32 \xB7 \u0E41\u0E1C\u0E19: \u0E02\u0E22\u0E32\u0E22 OPD \u0E19\u0E2D\u0E01\u0E40\u0E27\u0E25\u0E32 \xB7 \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 "ER \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E2B\u0E15\u0E38\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19" \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 Triage Protocol` : `\u0E2D\u0E31\u0E15\u0E23\u0E32 Trauma ${v.pct}% \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 15-20% \xB7 Non-Trauma ${(100-v.pct).toFixed(1)}% \u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E15\u0E32\u0E21 case mix \u0E02\u0E2D\u0E07 \u0E23\u0E1E\u0E0A. \u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B \xB7 \u0E04\u0E07\u0E23\u0E31\u0E01\u0E29\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 Trauma Team + audit \u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19`
        }), D > 0) {
        let Z = ["stroke", "stemi", "sepsis"].map(fe => ({
            k: fe,
            n: R[fe]
          })).sort((fe, et) => et.n - fe.n),
          ee = Z[0],
          ie = sr.find(fe => fe.id === ee.k),
          ue = ee.k === "stroke" ? "(MoPH Stroke Service Plan: Door-to-CT \u226425 \u0E19\u0E32\u0E17\u0E35 \xB7 Door-to-Needle \u226460 \u0E19\u0E32\u0E17\u0E35 \xB7 \u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32 onset 270 \u0E19\u0E32\u0E17\u0E35)" : ee.k === "stemi" ? "(MoPH Cardiac Service Plan: Door-to-Balloon \u226490 \u0E19\u0E32\u0E17\u0E35 \xB7 STEMI Bundle ASA+Clopidogrel+Statin \u226595% pre-refer)" : "(MoPH Sepsis Service Plan: Bundle 1 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07 \u2014 Hemoculture \xD7 2 set + IV ATB \u0E20\u0E32\u0E22\u0E43\u0E19 60 \u0E19\u0E32\u0E17\u0E35 + IV fluid resuscitation)",
          ce = Z.map(fe => `${sr.find(tt=>tt.id===fe.k).name_th} ${oe(fe.n)}`).join(" \xB7 ");
        d.push({
          priority: "HIGH",
          icon: ie.icon,
          color: ie.color,
          title: `\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E2B\u0E19\u0E31\u0E01 \xB7 ${ie.name_th} \u0E40\u0E14\u0E48\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14 (${oe(ee.n)} \u0E23\u0E32\u0E22)`,
          body: `${ce} (\u0E23\u0E27\u0E21 ${oe(D)} \u0E23\u0E32\u0E22 \xB7 ${F>0?`${(D/F).toFixed(1)} \u0E23\u0E32\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19`:""}) \u2014 ${ie.name_th} ${ue} \xB7 KPIs \u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07 audit: Door-to-${ee.k==="stroke"?"CT (\u226425m)":ee.k==="stemi"?"Balloon (\u226490m)":"ATB (\u226460m)"} \xB7 ${ee.k==="stroke"?"ASA loading dose \u0E15\u0E2D\u0E19 arrival \xB7 NIH stroke scale + \u0E1C\u0E48\u0E2D\u0E19\u0E16\u0E48\u0E32\u0E22\u0E44\u0E1B \u0E23\u0E1E\u0E28. \u0E16\u0E49\u0E32 rt-PA candidate":ee.k==="stemi"?"ASA loading + Clopidogrel loading + Statin \u0E17\u0E31\u0E19\u0E17\u0E35 \xB7 12-lead EKG \u0E20\u0E32\u0E22\u0E43\u0E19 10 \u0E19\u0E32\u0E17\u0E35 \xB7 refer-out network: \u0E23\u0E1E. \u0E23\u0E30\u0E22\u0E2D\u0E07/\u0E1E\u0E23\u0E30\u0E1A\u0E23\u0E21\u0E23\u0E32\u0E0A\u0E40\u0E17\u0E27\u0E35":"Lactate \u0E43\u0E19\u0E40\u0E25\u0E37\u0E2D\u0E14 + Hourly urine output monitoring \xB7 Source identification + culture-guided ATB \xB7 \u0E40\u0E01\u0E13\u0E11\u0E4C refer ICU"} \xB7 \u0E41\u0E19\u0E30\u0E19\u0E33 Audit \u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 + Case Conference clinical`
        })
      }
      if (R.stroke >= 5) {
        let ee = Object.values(z).sort((ie, ue) => ue.stroke - ie.stroke)[0];
        if (ee.stroke > 0) {
          let ie = Math.round(ee.stroke / R.stroke * 100);
          if (ie >= 40) {
            let ue = O[ee.addressid] && F >= 12 ? (ee.stroke / (F / 12) / O[ee.addressid] * 1e3).toFixed(2) : null;
            d.push({
              priority: "HIGH",
              icon: "\u{1F9E0}",
              color: L.pink,
              title: `Hotspot Stroke \xB7 ${ee.tambon} ${ie}% \u0E02\u0E2D\u0E07 Stroke \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`,
              body: `Stroke ${oe(ee.stroke)}/${oe(R.stroke)} \u0E23\u0E32\u0E22 (${ie}%) \u0E21\u0E32\u0E08\u0E32\u0E01 ${ee.tambon}${ue?` \xB7 \u0E2D\u0E31\u0E15\u0E23\u0E32 ${ue} \u0E23\u0E32\u0E22/\u0E1E\u0E31\u0E19 \u0E1B\u0E0A\u0E01./\u0E1B\u0E35 (\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E1B\u0E17. ~2 \u0E23\u0E32\u0E22/\u0E1E\u0E31\u0E19)`:""} \xB7 \u0E1B\u0E31\u0E08\u0E08\u0E31\u0E22\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E33\u0E04\u0E31\u0E0D: HT \xB7 DM \xB7 AF \xB7 Smoking \xB7 Dyslipidemia \xB7 \u0E41\u0E1C\u0E19\u0E40\u0E0A\u0E34\u0E07\u0E23\u0E38\u0E01 90 \u0E27\u0E31\u0E19: (\u0E01) Outreach BP screening \u0E17\u0E35\u0E48 ${ee.tambon} \u0E17\u0E38\u0E01\u0E2B\u0E21\u0E39\u0E48\u0E1A\u0E49\u0E32\u0E19 \u0E40\u0E1B\u0E49\u0E32 80% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E43\u0E2B\u0E0D\u0E48 \u226535 \u0E1B\u0E35 (\u0E02) AF screening \u0E43\u0E19 NCD clinic (\u0E04) \u0E2A\u0E2D\u0E19 \u0E2D\u0E2A\u0E21. + \u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E23\u0E31\u0E27\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07 FAST/BEFAST sign + \u0E40\u0E1A\u0E2D\u0E23\u0E4C 1669 (\u0E07) \u0E17\u0E1A\u0E17\u0E27\u0E19 Stroke Fast Track timing \u0E02\u0E2D\u0E07 ${ee.tambon} \u0E17\u0E38\u0E01\u0E40\u0E04\u0E2A \xB7 KPI: \u0E25\u0E14 onset-to-door \u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 90 \u0E19\u0E32\u0E17\u0E35`
            })
          }
        }
      }
      if (R.stemi >= 3) {
        let ee = Object.values(z).sort((ie, ue) => ue.stemi - ie.stemi)[0];
        ee.stemi > 0 && d.push({
          priority: "HIGH",
          icon: "\u{1FAC0}",
          color: L.orange,
          title: `STEMI \xB7 ${oe(R.stemi)} \u0E40\u0E04\u0E2A (Cardiac Pathway)`,
          body: `STEMI \u0E23\u0E27\u0E21 ${oe(R.stemi)} \u0E23\u0E32\u0E22 \u2014 ${ee.tambon} ${oe(ee.stemi)} \u0E23\u0E32\u0E22 \u0E40\u0E1B\u0E47\u0E19\u0E08\u0E38\u0E14\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 \xB7 MoPH Cardiac Service Plan: 1) ASA 162-325mg + Clopidogrel 300-600mg + Atorvastatin 80mg \u0E15\u0E49\u0E2D\u0E07\u0E43\u0E2B\u0E49\u0E01\u0E48\u0E2D\u0E19 refer \u0E17\u0E38\u0E01\u0E40\u0E04\u0E2A 2) Door-to-Balloon \u226490 \u0E19\u0E32\u0E17\u0E35 (\u0E23\u0E27\u0E21\u0E23\u0E30\u0E22\u0E30 refer) 3) refer-network: \u0E23\u0E1E. \u0E23\u0E30\u0E22\u0E2D\u0E07 / \u0E1E\u0E23\u0E30\u0E1A\u0E23\u0E21\u0E23\u0E32\u0E0A\u0E40\u0E17\u0E27\u0E35 / \u0E2A\u0E21\u0E40\u0E14\u0E47\u0E08\u0E1E\u0E23\u0E30\u0E19\u0E32\u0E07\u0E40\u0E08\u0E49\u0E32\u0E2A\u0E34\u0E23\u0E34\u0E01\u0E34\u0E15\u0E34\u0E4C \xB7 \u0E41\u0E1C\u0E19: (\u0E01) Audit STEMI Bundle compliance \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 (\u0E40\u0E1B\u0E49\u0E32 \u226595% \u0E17\u0E31\u0E49\u0E07 3 \u0E15\u0E31\u0E27) (\u0E02) Pre-Hospital ECG via ambulance (\u0E04) Cath Lab activation call \u0E01\u0E48\u0E2D\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E16\u0E36\u0E07 \u0E23\u0E1E.\u0E23\u0E31\u0E1A refer (\u0E07) \u0E17\u0E1A\u0E17\u0E27\u0E19 Pharmacy STEMI Kit \u0E43\u0E19 ER \u0E15\u0E49\u0E2D\u0E07\u0E04\u0E23\u0E1A-\u0E2A\u0E14-\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E22\u0E34\u0E1A\u0E07\u0E48\u0E32\u0E22 \xB7 \u0E1C\u0E25\u0E01\u0E23\u0E30\u0E17\u0E1A: \u0E17\u0E38\u0E01\u0E46 30 \u0E19\u0E32\u0E17\u0E35\u0E17\u0E35\u0E48\u0E0A\u0E49\u0E32\u0E43\u0E19 door-to-balloon \u2192 mortality \u0E40\u0E1E\u0E34\u0E48\u0E21 ~1%`
        })
      }
      let te = [...$].sort((Z, ee) => Z.ym.localeCompare(ee.ym));
      if (te.length >= 6) {
        let Z = te.slice(-3).reduce((ie, ue) => ie + ue.sepsis, 0),
          ee = te.slice(-6, -3).reduce((ie, ue) => ie + ue.sepsis, 0);
        if (Z > ee && ee > 0 && (Z - ee) / ee >= .3) {
          let ie = Math.round((Z - ee) / ee * 100);
          d.push({
            priority: "HIGH",
            icon: "\u{1F9A0}",
            color: L.cyan,
            title: `Sepsis Trend Alert \xB7 +${ie}% (3 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14)`,
            body: `Sepsis 3 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 ${oe(Z)} \u0E23\u0E32\u0E22 \u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19 ${oe(ee)} \u0E23\u0E32\u0E22 (+${ie}%) \xB7 \u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E17\u0E35\u0E48\u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49: 1) \u0E24\u0E14\u0E39\u0E01\u0E32\u0E25 (\u0E44\u0E02\u0E49\u0E40\u0E25\u0E37\u0E2D\u0E14\u0E2D\u0E2D\u0E01 \xB7 \u0E44\u0E02\u0E49\u0E2B\u0E27\u0E31\u0E14\u0E43\u0E2B\u0E0D\u0E48 \xB7 pneumonia) 2) \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19 NCD/\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E21\u0E35 Sepsis from UTI/Pneumonia 3) Healthcare-associated infection \xB7 \u0E41\u0E1C\u0E19 Sepsis Bundle 1 \u0E0A\u0E21.: (\u0E01) Lactate measurement \u0E20\u0E32\u0E22\u0E43\u0E19 60 \u0E19\u0E32\u0E17\u0E35 (\u0E02) Blood culture \xD7 2 set \u0E01\u0E48\u0E2D\u0E19 ATB (\u0E04) IV ATB broad-spectrum \u0E20\u0E32\u0E22\u0E43\u0E19 60 \u0E19\u0E32\u0E17\u0E35 (\u0E07) IV crystalloid 30 ml/kg \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E0A\u0E21. \u0E16\u0E49\u0E32 hypotension/lactate\u22654 \xB7 KPI: SOFA score documentation + 30-day mortality \xB7 Audit \u0E43\u0E19 4 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \u0E17\u0E1A\u0E17\u0E27\u0E19 10 \u0E40\u0E04\u0E2A\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14`
          })
        }
      }
      let he = (e?.rows || []).reduce((Z, ee) => ee.ym > Z ? ee.ym : Z, "");
      if (he) {
        let Z = he.slice(0, 4),
          ee = he.slice(5, 7),
          ie = String(Number(Z) - 1),
          ue = 0,
          ce = 0,
          fe = 0,
          et = 0;
        for (let xe of E) {
          let we = xe.ym.slice(0, 4);
          if (xe.ym.slice(5, 7) > ee) continue;
          let Zt = y(xe);
          we === Z ? (ue += Zt.total, fe += Zt.trauma) : we === ie && (ce += Zt.total, et += Zt.trauma)
        }
        let Ue = `\u0E21.\u0E04.\u2013${["","\u0E21.\u0E04.","\u0E01.\u0E1E.","\u0E21\u0E35.\u0E04.","\u0E40\u0E21.\u0E22.","\u0E1E.\u0E04.","\u0E21\u0E34.\u0E22.","\u0E01.\u0E04.","\u0E2A.\u0E04.","\u0E01.\u0E22.","\u0E15.\u0E04.","\u0E1E.\u0E22.","\u0E18.\u0E04."][Number(ee)]}`;
        if (ce > 0) {
          let xe = Math.round((ue - ce) / ce * 100),
            we = ue - ce,
            $r = ue > 0 ? fe / ue * 100 : 0,
            Zt = ce > 0 ? et / ce * 100 : 0,
            _n = $r - Zt;
          Math.abs(xe) >= 5 ? d.push({
            priority: Math.abs(xe) >= 20 ? "HIGH" : "MEDIUM",
            icon: xe > 0 ? "\u{1F4C8}" : "\u{1F4C9}",
            color: xe > 0 ? L.amber : L.green,
            title: `YoY (${Ue}) \xB7 ${xe>=0?"+":""}${xe}%`,
            body: `\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19 (apples-to-apples) \u2014 ${Ue} ${Z} = ${oe(ue)} \u0E23\u0E32\u0E22 vs ${Ue} ${ie} = ${oe(ce)} \u0E23\u0E32\u0E22 \u2192 ${xe>=0?"\u0E40\u0E1E\u0E34\u0E48\u0E21":"\u0E25\u0E14"} ${oe(Math.abs(we))} \u0E23\u0E32\u0E22 (${Math.abs(xe)}%)${Math.abs(_n)>=2?` \xB7 Trauma share \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19 ${Zt.toFixed(1)}% \u2192 ${$r.toFixed(1)}% (${_n>=0?"+":""}${_n.toFixed(1)} \u0E08\u0E38\u0E14)`:""} \u2014 ${xe>0?`\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${Math.round(we/Number(ee))} \u0E23\u0E32\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E1C\u0E25\u0E01\u0E23\u0E30\u0E17\u0E1A: (\u0E01) \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19 \u2014 \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25 ER ~1 \u0E04\u0E19/2,000 \u0E40\u0E04\u0E2A/\u0E1B\u0E35 (\u0E02) \u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E31\u0E07\u0E40\u0E01\u0E15\u0E2D\u0E32\u0E01\u0E32\u0E23 \u2014 \u0E1B\u0E23\u0E31\u0E1A\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E16\u0E49\u0E32\u0E40\u0E01\u0E34\u0E19 4 \u0E40\u0E15\u0E35\u0E22\u0E07 (\u0E04) \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 Budget request \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E23\u0E2D\u0E1A\u0E07\u0E1A\u0E16\u0E31\u0E14\u0E44\u0E1B \xB7 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A: \u0E1B\u0E31\u0E08\u0E08\u0E31\u0E22\u0E43\u0E14\u0E17\u0E35\u0E48\u0E1C\u0E25\u0E31\u0E01\u0E14\u0E31\u0E19 \u2014 Trauma RTI \xB7 Sepsis \xB7 \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38?`:`\u0E25\u0E14\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${Math.round(Math.abs(we)/Number(ee))} \u0E23\u0E32\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19 \u2014 \u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E17\u0E35\u0E48\u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49: (1) OPD \u0E19\u0E2D\u0E01\u0E40\u0E27\u0E25\u0E32\u0E17\u0E33\u0E07\u0E32\u0E19\u0E14\u0E35\u0E02\u0E36\u0E49\u0E19 (2) \u0E23\u0E1E.\u0E2A\u0E15. \u0E40\u0E04\u0E23\u0E37\u0E2D\u0E02\u0E48\u0E32\u0E22\u0E41\u0E02\u0E47\u0E07\u0E02\u0E36\u0E49\u0E19 (3) \u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19\u0E40\u0E25\u0E37\u0E2D\u0E01 \u0E23\u0E1E.\u0E40\u0E2D\u0E01\u0E0A\u0E19 (4) Triage \u0E40\u0E02\u0E49\u0E21\u0E02\u0E36\u0E49\u0E19 \xB7 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A: dashboard OPD \u0E19\u0E2D\u0E01\u0E40\u0E27\u0E25\u0E32 + \u0E08\u0E33\u0E19\u0E27\u0E19 refer \u0E08\u0E32\u0E01 \u0E23\u0E1E.\u0E2A\u0E15. + Patient Satisfaction \xB7 \u0E2B\u0E32\u0E01\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E1B\u0E31\u0E08\u0E08\u0E31\u0E22\u0E25\u0E1A \u0E16\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E14\u0E35\u0E27\u0E48\u0E32 primary care \u0E17\u0E33\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49`}`
          }) : d.push({
            priority: "LOW",
            icon: "\u2696\uFE0F",
            color: L.green,
            title: `YoY (${Ue}) \xB7 \u0E17\u0E23\u0E07\u0E15\u0E31\u0E27 ${xe>=0?"+":""}${xe}%`,
            body: `${Ue} ${Z} = ${oe(ue)} \u0E23\u0E32\u0E22 vs ${Ue} ${ie} = ${oe(ce)} \u0E23\u0E32\u0E22 \u2192 \u0E1C\u0E31\u0E19\u0E41\u0E1B\u0E23 ${Math.abs(xe)}% \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E1B\u0E01\u0E15\u0E34 (\xB15%) \xB7 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E04\u0E07\u0E17\u0E35\u0E48 \u2014 \u0E43\u0E0A\u0E49\u0E40\u0E27\u0E25\u0E32\u0E19\u0E35\u0E49\u0E1B\u0E23\u0E31\u0E1A Process Quality (Door-to-CT, Sepsis Bundle, STEMI Bundle) \u0E43\u0E2B\u0E49\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33\u0E02\u0E36\u0E49\u0E19 \u0E41\u0E17\u0E19\u0E01\u0E32\u0E23\u0E02\u0E22\u0E32\u0E22\u0E02\u0E35\u0E14\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16`
          })
        }
      }
      if (te.length >= 12) {
        let Z = {};
        for (let ce of te) {
          let fe = ce.ym.slice(5);
          Z[fe] || (Z[fe] = {
            mm: fe,
            total: 0,
            count: 0
          }), Z[fe].total += (ce.trauma || 0) + (ce.stroke || 0) + (ce.stemi || 0) + (ce.sepsis || 0), Z[fe].count += 1
        }
        let ee = Object.values(Z).map(ce => ({
            mm: ce.mm,
            avg: ce.total / ce.count
          })),
          ie = ee.reduce((ce, fe) => fe.avg > ce.avg ? fe : ce, ee[0]),
          ue = ee.reduce((ce, fe) => fe.avg < ce.avg ? fe : ce, ee[0]);
        if (ie.avg > ue.avg * 1.3) {
          let ce = {
            "01": "\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21",
            "02": "\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C",
            "03": "\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21",
            "04": "\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19",
            "05": "\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21",
            "06": "\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19",
            "07": "\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21",
            "08": "\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21",
            "09": "\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19",
            10: "\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21",
            11: "\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19",
            12: "\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21"
          };
          d.push({
            priority: "MEDIUM",
            icon: "\u{1F327}\uFE0F",
            color: L.cyan,
            title: `Seasonality \xB7 \u0E1E\u0E35\u0E04\u0E40\u0E14\u0E37\u0E2D\u0E19 ${ce[ie.mm]}`,
            body: `\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E21\u0E35\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 ER \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14: ${ce[ie.mm]} (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${Math.round(ie.avg)} \u0E23\u0E32\u0E22) \xB7 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14: ${ce[ue.mm]} (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${Math.round(ue.avg)} \u0E23\u0E32\u0E22) \xB7 \u0E2B\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19 ${Math.round((ie.avg/ue.avg-1)*100)}% \xB7 \u0E1B\u0E31\u0E08\u0E08\u0E31\u0E22\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07: ${["04","05","12"].includes(ie.mm)?"\u0E2A\u0E07\u0E01\u0E23\u0E32\u0E19\u0E15\u0E4C/\u0E1B\u0E35\u0E43\u0E2B\u0E21\u0E48 \u2014 RTI \u0E1E\u0E35\u0E04 \xB7 \u0E04\u0E27\u0E23\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 Trauma Team + \u0E40\u0E25\u0E37\u0E2D\u0E14\u0E2A\u0E33\u0E23\u0E2D\u0E07":["06","07","08","09"].includes(ie.mm)?"\u0E24\u0E14\u0E39\u0E1D\u0E19 \u2014 Dengue, \u0E44\u0E02\u0E49, \u0E2D\u0E38\u0E1A\u0E31\u0E15\u0E34\u0E40\u0E2B\u0E15\u0E38\u0E08\u0E23\u0E32\u0E08\u0E23\u0E40\u0E1B\u0E35\u0E22\u0E01":["10","11"].includes(ie.mm)?"\u0E1B\u0E25\u0E32\u0E22\u0E1D\u0E19\u0E15\u0E49\u0E19\u0E2B\u0E19\u0E32\u0E27 \u2014 \u0E44\u0E02\u0E49\u0E2B\u0E27\u0E31\u0E14\u0E43\u0E2B\u0E0D\u0E48 \xB7 pneumonia \xB7 COPD exacerbation":"\u0E24\u0E14\u0E39\u0E23\u0E49\u0E2D\u0E19 \u2014 Heat stroke \xB7 dehydration"} \xB7 \u0E41\u0E1C\u0E19: \u0E01\u0E48\u0E2D\u0E19\u0E40\u0E02\u0E49\u0E32\u0E40\u0E14\u0E37\u0E2D\u0E19 ${ce[ie.mm]} 1 \u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E17\u0E1A\u0E17\u0E27\u0E19 Surge Plan \xB7 \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19 \xB7 stock \u0E22\u0E32/\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C`
          })
        }
      }
      return d.push({
        priority: "LOW",
        icon: "\u{1F5FA}\uFE0F",
        color: L.purpleAlt,
        title: "Strategic Roadmap \xB7 3 / 6 / 12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
        body: `\u{1F3AF} 3 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E41\u0E23\u0E01 (Quick Wins): (1) \u0E2A\u0E23\u0E49\u0E32\u0E07 Dashboard \u0E41\u0E22\u0E01\u0E15\u0E33\u0E1A\u0E25\u0E2A\u0E48\u0E07 \u0E1C\u0E2D.\u0E23\u0E1E.\u0E2A\u0E15. \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 (2) Audit Stroke/STEMI/Sepsis Bundle \u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 30 \u0E40\u0E04\u0E2A \u0E2B\u0E32 gap (3) \u0E1D\u0E36\u0E01 \u0E2D\u0E2A\u0E21. FAST/BEFAST + 1669 \u0E17\u0E35\u0E48\u0E15\u0E33\u0E1A\u0E25\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2A\u0E39\u0E07 \xB7 \u{1F3AF} 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 (System): (1) Case Conference monthly \u0E01\u0E31\u0E1A \u0E23\u0E1E.\u0E2A\u0E15. \u0E17\u0E31\u0E49\u0E07 3 \u0E15\u0E33\u0E1A\u0E25 (2) Outreach BP/DM screening \u0E43\u0E19 ${x.tambon} (3) \u0E15\u0E31\u0E49\u0E07 Trauma KPI \u0E25\u0E14 RTI 10% \u0E43\u0E19 12 \u0E40\u0E14\u0E37\u0E2D\u0E19 (4) Pre-Hospital ECG \u0E1C\u0E48\u0E32\u0E19 ambulance \xB7 \u{1F3AF} 12 \u0E40\u0E14\u0E37\u0E2D\u0E19 (Transformation): (1) Integrated Care Pathway \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 ER \u21C4 NCD \u21C4 \u0E23\u0E1E.\u0E2A\u0E15. (2) \u0E14\u0E31\u0E0A\u0E19\u0E35\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E ER \u0E23\u0E32\u0E22 \u0E23\u0E1E.\u0E2A\u0E15. (3) MOU \u0E01\u0E31\u0E1A \u0E02\u0E19\u0E2A\u0E48\u0E07/\u0E15\u0E23./EEC \u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07 Trauma Hot Spot (4) \u0E15\u0E31\u0E49\u0E07\u0E40\u0E1B\u0E49\u0E32 \u0E25\u0E14 ER visit/\u0E1E\u0E31\u0E19 \u0E1B\u0E0A\u0E01. 5-10% \u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07`
      }), d
    }, [e, j, M, v, R, z, $, g, b]);
  if (a && !e) return k("div", {
    className: "glass-card",
    style: {
      padding: "2rem",
      textAlign: "center",
      color: "var(--md-text-secondary)"
    },
    children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ER Audit\u2026"
  });
  let S = f === "all" ? "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : f === "trauma" ? "Trauma" : "Non-Trauma";
  return q("div", {
    className: "space-y-4 animate-fade-in pb-8",
    role: "region",
    "aria-label": "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19 ER \u0E2D\u0E33\u0E40\u0E20\u0E2D\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07",
    children: [k("div", {
      style: {
        marginBottom: "1.25rem"
      },
      children: q("div", {
        style: {
          padding: "1.25rem 1.5rem",
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(244,63,94,.12) 0%, rgba(14,165,233,.06) 100%)",
          border: "1px solid rgba(244,63,94,.2)",
          backdropFilter: "blur(12px)",
          position: "relative",
          overflow: "hidden"
        },
        children: [k("div", {
          style: {
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(244,63,94,.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }
        }), q("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            position: "relative",
            zIndex: 1
          },
          children: [q("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            },
            children: [k("p", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: L.red,
                margin: 0
              },
              children: "\u{1F691} ER Audit \xB7 \u0E2D\u0E33\u0E40\u0E20\u0E2D\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07 (3 \u0E15\u0E33\u0E1A\u0E25)"
            }), q("span", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                background: "rgba(244,63,94,.08)",
                padding: "2px 8px",
                borderRadius: "99px"
              },
              children: [S, " \xB7 ", JU(g), " \u2192 ", QU(b)]
            })]
          }), q("div", {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              flexWrap: "wrap"
            },
            children: [k("span", {
              style: {
                fontSize: "42px",
                fontWeight: 900,
                color: L.red,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                textShadow: "0 0 40px rgba(244,63,94,.3)",
                fontVariantNumeric: "tabular-nums"
              },
              children: oe(v.total)
            }), k("span", {
              style: {
                fontSize: "14px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700
              },
              children: "\u0E23\u0E32\u0E22"
            }), q("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                marginLeft: "4px"
              },
              children: ["Trauma ", q("strong", {
                style: {
                  color: v.pct > 20 ? L.red : v.pct > 10 ? L.amber : L.green,
                  fontVariantNumeric: "tabular-nums"
                },
                children: [v.pct, "%"]
              })]
            }), s && q("span", {
              style: {
                fontSize: "11px",
                color: L.red,
                fontWeight: 700
              },
              children: ["error: ", s]
            })]
          }), q("div", {
            children: [q("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "3px"
              },
              children: [q("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 700,
                  color: L.red
                },
                children: ["\u{1F6A8} Trauma: ", oe(v.trauma)]
              }), q("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 700,
                  color: L.green
                },
                children: ["\u{1FA7A} Non-Trauma: ", oe(v.non_trauma)]
              })]
            }), q("div", {
              style: {
                height: "6px",
                borderRadius: "99px",
                overflow: "hidden",
                background: "rgba(148,163,184,.12)",
                display: "flex",
                gap: "2px"
              },
              children: [v.trauma > 0 && k("div", {
                style: {
                  flex: v.trauma,
                  background: L.red,
                  borderRadius: "99px",
                  transition: "flex 0.8s ease"
                }
              }), v.non_trauma > 0 && k("div", {
                style: {
                  flex: v.non_trauma,
                  background: L.green,
                  borderRadius: "99px",
                  transition: "flex 0.8s ease"
                }
              })]
            })]
          })]
        })]
      })
    }), k(lr, {
      from: L.cyan,
      to: L.purple,
      icon: "\u{1F39B}\uFE0F",
      label: "\u0E15\u0E31\u0E27\u0E01\u0E23\u0E2D\u0E07",
      sub: "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17 \xB7 \u0E15\u0E33\u0E1A\u0E25 \xB7 \u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32"
    }), q("div", {
      className: "glass-card",
      style: {
        padding: "1rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      },
      children: [q("div", {
        style: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px"
        },
        children: [k("span", {
          style: {
            fontSize: "11px",
            fontWeight: 800,
            color: "var(--md-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            minWidth: "52px"
          },
          children: "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17"
        }), [{
          id: "all",
          label: "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
          color: L.cyan
        }, {
          id: "trauma",
          label: "Trauma",
          color: L.red
        }, {
          id: "non-trauma",
          label: "Non-Trauma",
          color: L.green
        }].map(d => k(zT, {
          active: f === d.id,
          color: d.color,
          onClick: () => c(d.id),
          children: d.label
        }, d.id)), k("div", {
          style: {
            width: 1,
            height: 20,
            background: "var(--md-divider)",
            margin: "0 4px"
          }
        }), k("span", {
          style: {
            fontSize: "11px",
            fontWeight: 800,
            color: "var(--md-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          },
          children: "\u0E15\u0E33\u0E1A\u0E25"
        }), [{
          id: "all",
          label: "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
          color: L.cyan
        }, {
          id: "210201",
          label: "\u0E2A\u0E33\u0E19\u0E31\u0E01\u0E17\u0E49\u0E2D\u0E19",
          color: L.green
        }, {
          id: "210202",
          label: "\u0E1E\u0E25\u0E32",
          color: L.cyan
        }, {
          id: "210203",
          label: "\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07",
          color: L.yellow
        }].map(d => k(zT, {
          active: p === d.id,
          color: d.color,
          onClick: () => h(d.id),
          children: d.label
        }, d.id))]
      }), q("div", {
        style: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px"
        },
        children: [k("span", {
          style: {
            fontSize: "11px",
            fontWeight: 800,
            color: "var(--md-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            minWidth: "52px"
          },
          children: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32"
        }), k("input", {
          type: "date",
          value: g,
          max: b,
          onChange: d => m(d.target.value),
          className: "date-input-er"
        }), k("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)"
          },
          children: "\u2014"
        }), k("input", {
          type: "date",
          value: b,
          min: g,
          max: YU(),
          onChange: d => w(d.target.value),
          className: "date-input-er"
        }), k("button", {
          onClick: () => {
            c("all"), h("all"), m(to.from), w(to.to)
          },
          style: {
            padding: "6px 12px",
            fontSize: "11px",
            fontWeight: 700,
            borderRadius: "6px",
            cursor: "pointer",
            border: "1px solid var(--md-border)",
            background: "transparent",
            color: "var(--md-text-secondary)"
          },
          children: "\u21BA \u0E23\u0E35\u0E40\u0E0B\u0E47\u0E15"
        })]
      }), k("style", {
        children: `
                    .date-input-er {
                        padding: 6px 10px; font-size: 12px; border-radius: 6px;
                        border: 1px solid var(--md-border); background: var(--md-surface);
                        color: var(--md-text-primary); font-weight: 600;
                    }
                    .date-input-er:focus { outline: none; border-color: ${L.cyan}; }
                `
      })]
    }), k(lr, {
      from: L.red,
      to: L.amber,
      icon: "\u{1F4CA}",
      label: "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21",
      sub: S
    }), q("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "12px"
      },
      children: [k($l, {
        icon: "\u{1F3E5}",
        label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 ER",
        value: oe(v.total),
        sub: `\u0E43\u0E19 \u0E2D.\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07 \xB7 ${S}`,
        color: L.cyan
      }), k($l, {
        icon: "\u{1F6A8}",
        label: "Trauma",
        value: oe(v.trauma),
        sub: "\u0E2D\u0E38\u0E1A\u0E31\u0E15\u0E34\u0E40\u0E2B\u0E15\u0E38",
        color: L.red
      }), k($l, {
        icon: "\u{1FA7A}",
        label: "Non-Trauma",
        value: oe(v.non_trauma),
        sub: "\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B",
        color: L.green
      }), k($l, {
        icon: "\u{1F4C8}",
        label: "% Trauma",
        value: `${v.pct}%`,
        sub: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2D\u0E38\u0E1A\u0E31\u0E15\u0E34\u0E40\u0E2B\u0E15\u0E38",
        color: v.pct > 20 ? L.red : v.pct > 10 ? L.amber : L.green
      })]
    }), k(lr, {
      from: L.cyan,
      to: L.purple,
      icon: "\u{1F4CD}",
      label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E41\u0E22\u0E01\u0E15\u0E33\u0E1A\u0E25 \xD7 \u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17",
      sub: "\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E15\u0E33\u0E1A\u0E25"
    }), k(Bt, {
      children: q("div", {
        className: "glass-card",
        style: {
          padding: "1.5rem 1.75rem",
          background: "linear-gradient(135deg, rgba(14,165,233,.03) 0%, rgba(124,58,237,.03) 100%)",
          position: "relative",
          overflow: "hidden"
        },
        children: [q("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
            gap: 12,
            flexWrap: "wrap"
          },
          children: [q("div", {
            children: [k("div", {
              style: {
                fontSize: 10,
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".12em"
              },
              children: "Tambon \xD7 Type breakdown"
            }), q("div", {
              style: {
                fontSize: 14,
                fontWeight: 800,
                color: "var(--md-text-primary)",
                marginTop: 2
              },
              children: [oe(v.total), " \u0E23\u0E32\u0E22 \xB7 \u0E1B\u0E35\u0E07\u0E1A ", Number(b.slice(0, 4)) + 543]
            })]
          }), q("div", {
            style: {
              display: "flex",
              gap: 16,
              alignItems: "center"
            },
            children: [f !== "trauma" && q("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6
              },
              children: [k("span", {
                style: {
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${L.green}, #06d6a0)`,
                  boxShadow: `0 2px 6px ${L.green}40`
                }
              }), q("span", {
                style: {
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--md-text-secondary)"
                },
                children: ["Non-Trauma \xB7 ", oe(v.non_trauma)]
              })]
            }), f !== "non-trauma" && q("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6
              },
              children: [k("span", {
                style: {
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${L.red}, ${L.orange})`,
                  boxShadow: `0 2px 6px ${L.red}40`
                }
              }), q("span", {
                style: {
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--md-text-secondary)"
                },
                children: ["Trauma \xB7 ", oe(v.trauma)]
              })]
            })]
          })]
        }), k(Vr, {
          width: "100%",
          height: Math.max(180, j.length * 64),
          children: q(Va, {
            data: j,
            layout: "vertical",
            margin: {
              top: 8,
              right: 80,
              left: 0,
              bottom: 8
            },
            barCategoryGap: "32%",
            children: [q("defs", {
              children: [q("linearGradient", {
                id: "gradNonT",
                x1: "0",
                y1: "0",
                x2: "1",
                y2: "0",
                children: [k("stop", {
                  offset: "0%",
                  stopColor: L.green,
                  stopOpacity: .95
                }), k("stop", {
                  offset: "100%",
                  stopColor: "#06d6a0",
                  stopOpacity: .95
                })]
              }), q("linearGradient", {
                id: "gradTrauma",
                x1: "0",
                y1: "0",
                x2: "1",
                y2: "0",
                children: [k("stop", {
                  offset: "0%",
                  stopColor: L.red,
                  stopOpacity: .95
                }), k("stop", {
                  offset: "100%",
                  stopColor: L.orange,
                  stopOpacity: .95
                })]
              }), k("filter", {
                id: "barShadow",
                x: "-2%",
                y: "-2%",
                width: "104%",
                height: "120%",
                children: k("feDropShadow", {
                  dx: "0",
                  dy: "2",
                  stdDeviation: "3",
                  floodColor: "#000",
                  floodOpacity: "0.08"
                })
              })]
            }), k(Tn, {
              strokeDasharray: "2 4",
              stroke: "var(--md-divider)",
              horizontal: !1
            }), k(Rt, {
              type: "number",
              stroke: "var(--md-text-tertiary)",
              tick: {
                fontSize: 10,
                fontWeight: 600
              },
              tickFormatter: d => d >= 1e3 ? `${(d/1e3).toFixed(1)}K` : d,
              axisLine: !1,
              tickLine: !1
            }), k(ct, {
              type: "category",
              dataKey: "tambon",
              stroke: "var(--md-text-secondary)",
              tick: {
                fontSize: 13,
                fontWeight: 800,
                fill: "var(--md-text-primary)"
              },
              width: 92,
              axisLine: !1,
              tickLine: !1
            }), k(Ve, {
              cursor: {
                fill: "rgba(124,58,237,.06)"
              },
              content: ({
                active: d,
                payload: O,
                label: P
              }) => {
                if (!d || !O?.length) return null;
                let x = j.find(C => C.tambon === P) || {},
                  _ = x.total > 0 ? (x.trauma / x.total * 100).toFixed(1) : "0";
                return q("div", {
                  style: {
                    background: "var(--md-surface)",
                    border: `1px solid ${x.color||L.cyan}40`,
                    borderLeft: `4px solid ${x.color||L.cyan}`,
                    borderRadius: 12,
                    padding: "10px 14px",
                    boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                    minWidth: 200
                  },
                  children: [q("div", {
                    style: {
                      fontSize: 13,
                      fontWeight: 800,
                      color: x.color || L.cyan,
                      marginBottom: 4
                    },
                    children: [P, " ", k("span", {
                      style: {
                        fontSize: 10,
                        color: "var(--md-text-tertiary)",
                        fontFamily: "monospace",
                        fontWeight: 600,
                        marginLeft: 4
                      },
                      children: x.addressid
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 11,
                      marginTop: 6
                    },
                    children: [k("span", {
                      style: {
                        color: L.red,
                        fontWeight: 700
                      },
                      children: "\u{1F6A8} Trauma"
                    }), q("span", {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        fontVariantNumeric: "tabular-nums"
                      },
                      children: [oe(x.trauma), " (", _, "%)"]
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 11,
                      marginTop: 4
                    },
                    children: [k("span", {
                      style: {
                        color: L.green,
                        fontWeight: 700
                      },
                      children: "\u{1FA7A} Non-Trauma"
                    }), q("span", {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        fontVariantNumeric: "tabular-nums"
                      },
                      children: [oe(x.non_trauma), " (", (100 - parseFloat(_)).toFixed(1), "%)"]
                    })]
                  }), k("div", {
                    style: {
                      height: 1,
                      background: "var(--md-divider)",
                      margin: "8px 0 6px"
                    }
                  }), q("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 12
                    },
                    children: [k("span", {
                      style: {
                        fontWeight: 700,
                        color: "var(--md-text-secondary)"
                      },
                      children: "\u0E23\u0E27\u0E21"
                    }), k("span", {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 900,
                        color: x.color || L.cyan,
                        fontSize: 14,
                        fontVariantNumeric: "tabular-nums"
                      },
                      children: oe(x.total)
                    })]
                  })]
                })
              }
            }), f !== "trauma" && k(We, {
              dataKey: "non_trauma",
              name: "Non-Trauma",
              stackId: "x",
              fill: "url(#gradNonT)",
              radius: f === "all" ? [4, 0, 0, 4] : [4, 4, 4, 4],
              filter: "url(#barShadow)",
              isAnimationActive: !0,
              animationDuration: 800
            }), f !== "non-trauma" && k(We, {
              dataKey: "trauma",
              name: "Trauma",
              stackId: "x",
              fill: "url(#gradTrauma)",
              radius: f === "all" ? [0, 4, 4, 0] : [4, 4, 4, 4],
              filter: "url(#barShadow)",
              isAnimationActive: !0,
              animationDuration: 1e3,
              children: k(Ne, {
                dataKey: "total",
                position: "right",
                offset: 10,
                formatter: d => oe(d),
                style: {
                  fill: "var(--md-text-primary)",
                  fontSize: 13,
                  fontWeight: 900,
                  fontFamily: "monospace"
                }
              })
            }), f === "non-trauma" && k(We, {
              dataKey: "non_trauma",
              stackId: "hidden_dup",
              fill: "transparent",
              isAnimationActive: !1,
              children: k(Ne, {
                dataKey: "non_trauma",
                position: "right",
                offset: 10,
                formatter: d => oe(d),
                style: {
                  fill: "var(--md-text-primary)",
                  fontSize: 13,
                  fontWeight: 900,
                  fontFamily: "monospace"
                }
              })
            })]
          })
        }), k("div", {
          style: {
            display: "grid",
            gridTemplateColumns: `repeat(${j.length}, 1fr)`,
            gap: 12,
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid var(--md-divider)"
          },
          children: j.map(d => {
            let O = d.total > 0 ? (d.trauma / d.total * 100).toFixed(1) : "0",
              P = v.total > 0 ? (d.total / v.total * 100).toFixed(1) : "0";
            return q("div", {
              style: {
                padding: "12px 14px",
                borderRadius: 12,
                background: `${d.color}06`,
                borderLeft: `3px solid ${d.color}`,
                display: "flex",
                flexDirection: "column",
                gap: 4
              },
              children: [q("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                },
                children: [k("span", {
                  style: {
                    fontSize: 11,
                    fontWeight: 800,
                    color: d.color,
                    textTransform: "uppercase",
                    letterSpacing: ".04em"
                  },
                  children: d.tambon
                }), q("span", {
                  style: {
                    fontSize: 10,
                    fontWeight: 700,
                    color: d.color,
                    opacity: .7,
                    fontFamily: "monospace"
                  },
                  children: [P, "% \u0E02\u0E2D\u0E07\u0E2D\u0E33\u0E40\u0E20\u0E2D"]
                })]
              }), k("div", {
                style: {
                  fontSize: 22,
                  fontWeight: 900,
                  color: "var(--md-text-primary)",
                  fontFamily: "monospace",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums"
                },
                children: oe(d.total)
              }), q("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 2
                },
                children: [q("span", {
                  style: {
                    fontSize: 10,
                    fontWeight: 800,
                    padding: "2px 7px",
                    borderRadius: 99,
                    background: parseFloat(O) > 20 ? `${L.red}15` : parseFloat(O) > 15 ? `${L.amber}15` : `${L.green}15`,
                    color: parseFloat(O) > 20 ? L.red : parseFloat(O) > 15 ? L.amber : L.green,
                    fontVariantNumeric: "tabular-nums"
                  },
                  children: ["\u{1F6A8} ", O, "%"]
                }), k("span", {
                  style: {
                    fontSize: 10,
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: "Trauma ratio"
                })]
              })]
            }, d.addressid)
          })
        })]
      })
    }), k(lr, {
      from: L.green,
      to: L.cyan,
      icon: "\u{1F369}",
      label: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Trauma vs Non-Trauma \u0E41\u0E15\u0E48\u0E25\u0E30\u0E15\u0E33\u0E1A\u0E25",
      sub: "3 \u0E15\u0E33\u0E1A\u0E25 \xB7 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A Case Mix"
    }), k(Bt, {
      children: k("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
        children: (() => {
          let d = [...j].sort((x, _) => _.total - x.total),
            O = new Map(d.map((x, _) => [x.addressid, _ + 1])),
            P = {
              1: {
                emoji: "\u{1F947}",
                label: "\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A 1"
              },
              2: {
                emoji: "\u{1F948}",
                label: "\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A 2"
              },
              3: {
                emoji: "\u{1F949}",
                label: "\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A 3"
              }
            };
          return j.map(x => {
            let _ = O.get(x.addressid),
              C = x.total > 0 ? (x.non_trauma / x.total * 100).toFixed(1) : null,
              D = x.total > 0 ? (x.trauma / x.total * 100).toFixed(1) : null,
              F = v.total > 0 ? (x.total / v.total * 100).toFixed(1) : "0",
              Y = x.total === 0 ? [{
                name: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
                value: 1,
                fill: "var(--md-divider)"
              }] : [{
                name: "Non-Trauma",
                value: x.non_trauma,
                fill: `url(#donutNonT-${x.addressid})`
              }, {
                name: "Trauma",
                value: x.trauma,
                fill: `url(#donutTrauma-${x.addressid})`
              }],
              X = parseFloat(D) > 20 ? L.red : parseFloat(D) > 15 ? L.amber : L.green;
            return q("div", {
              className: "glass-card",
              style: {
                padding: "0",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                background: `linear-gradient(135deg, ${x.color}06 0%, var(--md-surface) 60%)`,
                borderTop: `3px solid ${x.color}`,
                position: "relative"
              },
              children: [_ <= 3 && k("div", {
                style: {
                  position: "absolute",
                  top: 12,
                  right: 12,
                  fontSize: 20,
                  lineHeight: 1,
                  zIndex: 2,
                  filter: `drop-shadow(0 2px 4px ${x.color}40)`
                },
                title: P[_].label,
                children: P[_].emoji
              }), q("div", {
                style: {
                  padding: "14px 18px 8px"
                },
                children: [q("div", {
                  style: {
                    fontSize: 10,
                    fontWeight: 800,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: ".12em"
                  },
                  children: ["\u0E15\u0E33\u0E1A\u0E25 \xB7 ", k("span", {
                    style: {
                      fontFamily: "monospace",
                      color: x.color,
                      opacity: .85
                    },
                    children: x.addressid
                  })]
                }), k("div", {
                  style: {
                    fontSize: 18,
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    marginTop: 2,
                    letterSpacing: "-0.01em"
                  },
                  children: x.tambon
                }), q("div", {
                  style: {
                    fontSize: 11,
                    fontWeight: 700,
                    color: x.color,
                    marginTop: 4
                  },
                  children: [F, "% \u0E02\u0E2D\u0E07\u0E2D\u0E33\u0E40\u0E20\u0E2D\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07"]
                })]
              }), q("div", {
                style: {
                  padding: "4px 18px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 18
                },
                children: [q("div", {
                  style: {
                    position: "relative",
                    width: 124,
                    height: 124,
                    flexShrink: 0
                  },
                  children: [k(Vr, {
                    width: "100%",
                    height: "100%",
                    children: q(tm, {
                      children: [q("defs", {
                        children: [q("linearGradient", {
                          id: `donutNonT-${x.addressid}`,
                          x1: "0",
                          y1: "0",
                          x2: "1",
                          y2: "1",
                          children: [k("stop", {
                            offset: "0%",
                            stopColor: L.green
                          }), k("stop", {
                            offset: "100%",
                            stopColor: "#06d6a0"
                          })]
                        }), q("linearGradient", {
                          id: `donutTrauma-${x.addressid}`,
                          x1: "0",
                          y1: "0",
                          x2: "1",
                          y2: "1",
                          children: [k("stop", {
                            offset: "0%",
                            stopColor: L.red
                          }), k("stop", {
                            offset: "100%",
                            stopColor: L.orange
                          })]
                        })]
                      }), k(It, {
                        data: Y,
                        dataKey: "value",
                        innerRadius: 38,
                        outerRadius: 58,
                        startAngle: 90,
                        endAngle: -270,
                        stroke: "var(--md-surface)",
                        strokeWidth: 3,
                        isAnimationActive: !0,
                        animationDuration: 900,
                        paddingAngle: x.total > 0 ? 2 : 0,
                        children: Y.map((re, pe) => k(Tr, {
                          fill: re.fill
                        }, pe))
                      })]
                    })
                  }), k("div", {
                    style: {
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none"
                    },
                    children: x.total === 0 ? k("span", {
                      style: {
                        fontSize: 11,
                        color: "var(--md-text-tertiary)"
                      },
                      children: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
                    }) : q(nm, {
                      children: [k("span", {
                        style: {
                          fontSize: 22,
                          fontWeight: 900,
                          color: x.color,
                          fontVariantNumeric: "tabular-nums",
                          lineHeight: 1
                        },
                        children: oe(x.total)
                      }), k("span", {
                        style: {
                          fontSize: 9,
                          color: "var(--md-text-tertiary)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: ".08em",
                          marginTop: 2
                        },
                        children: "\u0E23\u0E32\u0E22 \xB7 \u0E23\u0E27\u0E21"
                      })]
                    })
                  })]
                }), k("div", {
                  style: {
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                  },
                  children: x.total === 0 ? k("div", {
                    style: {
                      fontSize: 11,
                      color: "var(--md-text-tertiary)",
                      fontStyle: "italic"
                    },
                    children: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E25\u0E37\u0E2D\u0E01"
                  }) : q(nm, {
                    children: [q("div", {
                      children: [q("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 3
                        },
                        children: [q("span", {
                          style: {
                            fontSize: 10,
                            fontWeight: 700,
                            color: L.red,
                            display: "flex",
                            alignItems: "center",
                            gap: 4
                          },
                          children: [k("span", {
                            style: {
                              width: 8,
                              height: 8,
                              borderRadius: 2,
                              background: `linear-gradient(135deg, ${L.red}, ${L.orange})`
                            }
                          }), "Trauma"]
                        }), q("span", {
                          style: {
                            fontSize: 11,
                            fontWeight: 900,
                            color: L.red,
                            fontFamily: "monospace",
                            fontVariantNumeric: "tabular-nums"
                          },
                          children: [oe(x.trauma), q("span", {
                            style: {
                              color: "var(--md-text-tertiary)",
                              fontSize: 9,
                              marginLeft: 4
                            },
                            children: ["(", D, "%)"]
                          })]
                        })]
                      }), k("div", {
                        style: {
                          height: 4,
                          background: "var(--md-divider)",
                          borderRadius: 2,
                          overflow: "hidden"
                        },
                        children: k("div", {
                          style: {
                            width: `${D}%`,
                            height: "100%",
                            background: `linear-gradient(90deg, ${L.red}, ${L.orange})`,
                            borderRadius: 2,
                            transition: "width .8s"
                          }
                        })
                      })]
                    }), q("div", {
                      children: [q("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 3
                        },
                        children: [q("span", {
                          style: {
                            fontSize: 10,
                            fontWeight: 700,
                            color: L.green,
                            display: "flex",
                            alignItems: "center",
                            gap: 4
                          },
                          children: [k("span", {
                            style: {
                              width: 8,
                              height: 8,
                              borderRadius: 2,
                              background: `linear-gradient(135deg, ${L.green}, #06d6a0)`
                            }
                          }), "Non-Trauma"]
                        }), q("span", {
                          style: {
                            fontSize: 11,
                            fontWeight: 900,
                            color: L.green,
                            fontFamily: "monospace",
                            fontVariantNumeric: "tabular-nums"
                          },
                          children: [oe(x.non_trauma), q("span", {
                            style: {
                              color: "var(--md-text-tertiary)",
                              fontSize: 9,
                              marginLeft: 4
                            },
                            children: ["(", C, "%)"]
                          })]
                        })]
                      }), k("div", {
                        style: {
                          height: 4,
                          background: "var(--md-divider)",
                          borderRadius: 2,
                          overflow: "hidden"
                        },
                        children: k("div", {
                          style: {
                            width: `${C}%`,
                            height: "100%",
                            background: `linear-gradient(90deg, ${L.green}, #06d6a0)`,
                            borderRadius: 2,
                            transition: "width .8s"
                          }
                        })
                      })]
                    })]
                  })
                })]
              }), x.total > 0 && q("div", {
                style: {
                  padding: "8px 18px 12px",
                  borderTop: "1px solid var(--md-divider)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: `${X}06`
                },
                children: [k("span", {
                  style: {
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: ".06em"
                  },
                  children: "Trauma Risk"
                }), q("span", {
                  style: {
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: 99,
                    background: `${X}18`,
                    color: X,
                    fontVariantNumeric: "tabular-nums"
                  },
                  children: [parseFloat(D) > 20 ? "\u{1F534} \u0E2A\u0E39\u0E07" : parseFloat(D) > 15 ? "\u{1F7E1} \u0E1B\u0E01\u0E15\u0E34" : "\u{1F7E2} \u0E15\u0E48\u0E33", " \xB7 ", D, "%"]
                })]
              })]
            }, x.addressid)
          })
        })()
      })
    }), k(lr, {
      from: L.purple,
      to: L.purpleAlt,
      icon: "\u{1F4C8}",
      label: "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E1B\u0E35",
      sub: `${N.length} \u0E1B\u0E35\u0E07\u0E1A \xB7 Volume + Trauma %`
    }), k(Bt, {
      children: q("div", {
        className: "glass-card",
        style: {
          padding: "1.5rem 1.75rem",
          background: "linear-gradient(135deg, rgba(124,58,237,.03) 0%, rgba(245,158,11,.03) 100%)"
        },
        children: [q("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
            gap: 12,
            flexWrap: "wrap"
          },
          children: [q("div", {
            children: [k("div", {
              style: {
                fontSize: 10,
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".12em"
              },
              children: "Yearly Volume \xD7 Trauma %"
            }), q("div", {
              style: {
                fontSize: 14,
                fontWeight: 800,
                color: "var(--md-text-primary)",
                marginTop: 2
              },
              children: ["\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A ", N.length, " \u0E1B\u0E35\u0E07\u0E1A \u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 \xB7 Volume \u0E41\u0E17\u0E48\u0E07 \xB7 % \u0E40\u0E2A\u0E49\u0E19"]
            })]
          }), q("div", {
            style: {
              display: "flex",
              gap: 14,
              alignItems: "center",
              flexWrap: "wrap"
            },
            children: [q("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6
              },
              children: [k("span", {
                style: {
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${L.green}, #06d6a0)`,
                  boxShadow: `0 2px 4px ${L.green}40`
                }
              }), k("span", {
                style: {
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--md-text-secondary)"
                },
                children: "Non-Trauma"
              })]
            }), q("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6
              },
              children: [k("span", {
                style: {
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${L.red}, ${L.orange})`,
                  boxShadow: `0 2px 4px ${L.red}40`
                }
              }), k("span", {
                style: {
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--md-text-secondary)"
                },
                children: "Trauma"
              })]
            }), q("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6
              },
              children: [k("span", {
                style: {
                  width: 24,
                  height: 3,
                  background: L.amber,
                  borderRadius: 99,
                  position: "relative"
                },
                children: k("span", {
                  style: {
                    position: "absolute",
                    top: -3,
                    left: 9,
                    width: 9,
                    height: 9,
                    borderRadius: 99,
                    background: L.amber,
                    boxShadow: `0 0 6px ${L.amber}80`
                  }
                })
              }), k("span", {
                style: {
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--md-text-secondary)"
                },
                children: "% Trauma"
              })]
            })]
          })]
        }), k(Vr, {
          width: "100%",
          height: 320,
          children: q(Va, {
            data: N,
            margin: {
              top: 20,
              right: 60,
              left: 0,
              bottom: 5
            },
            children: [q("defs", {
              children: [q("linearGradient", {
                id: "yearNonT",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [k("stop", {
                  offset: "0%",
                  stopColor: L.green,
                  stopOpacity: .95
                }), k("stop", {
                  offset: "100%",
                  stopColor: "#06d6a0",
                  stopOpacity: .85
                })]
              }), q("linearGradient", {
                id: "yearTrauma",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [k("stop", {
                  offset: "0%",
                  stopColor: L.red,
                  stopOpacity: .95
                }), k("stop", {
                  offset: "100%",
                  stopColor: L.orange,
                  stopOpacity: .85
                })]
              }), k("filter", {
                id: "yearShadow",
                x: "-2%",
                y: "-2%",
                width: "104%",
                height: "120%",
                children: k("feDropShadow", {
                  dx: "0",
                  dy: "2",
                  stdDeviation: "3",
                  floodColor: "#000",
                  floodOpacity: "0.1"
                })
              })]
            }), k(Tn, {
              strokeDasharray: "2 4",
              stroke: "var(--md-divider)",
              vertical: !1
            }), k(Rt, {
              dataKey: "fyLabel",
              stroke: "var(--md-text-tertiary)",
              tick: {
                fontSize: 13,
                fontWeight: 800,
                fill: "var(--md-text-primary)"
              },
              axisLine: !1,
              tickLine: !1
            }), k(ct, {
              yAxisId: "L",
              stroke: "var(--md-text-tertiary)",
              tick: {
                fontSize: 10,
                fontWeight: 600
              },
              tickFormatter: d => d >= 1e3 ? `${(d/1e3).toFixed(0)}K` : d,
              axisLine: !1,
              tickLine: !1
            }), k(ct, {
              yAxisId: "R",
              orientation: "right",
              stroke: L.amber,
              tick: {
                fontSize: 10,
                fontWeight: 700,
                fill: L.amber
              },
              tickFormatter: d => `${d}%`,
              domain: [0, d => Math.max(30, Math.ceil(d * 1.2))],
              axisLine: !1,
              tickLine: !1
            }), k(Ve, {
              cursor: {
                fill: "rgba(124,58,237,.06)"
              },
              content: ({
                active: d,
                payload: O,
                label: P
              }) => {
                if (!d || !O?.length) return null;
                let x = N.find(F => F.fyLabel === P) || {},
                  _ = N.findIndex(F => F.fyLabel === P),
                  C = _ > 0 ? N[_ - 1] : null,
                  D = C && C.total > 0 ? Math.round((x.total - C.total) / C.total * 100) : null;
                return q("div", {
                  style: {
                    background: "var(--md-surface)",
                    border: `1px solid ${L.purple}30`,
                    borderLeft: `4px solid ${L.purple}`,
                    borderRadius: 12,
                    padding: "12px 16px",
                    boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                    minWidth: 220
                  },
                  children: [q("div", {
                    style: {
                      fontSize: 14,
                      fontWeight: 900,
                      color: L.purple,
                      marginBottom: 6
                    },
                    children: [P, " ", q("span", {
                      style: {
                        fontSize: 11,
                        color: "var(--md-text-tertiary)",
                        fontWeight: 600
                      },
                      children: ["(\u0E04.\u0E28. ", x.yr, ")"]
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      marginTop: 5
                    },
                    children: [k("span", {
                      style: {
                        color: L.red,
                        fontWeight: 700
                      },
                      children: "\u{1F6A8} Trauma"
                    }), k("span", {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        fontVariantNumeric: "tabular-nums"
                      },
                      children: oe(x.trauma)
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      marginTop: 4
                    },
                    children: [k("span", {
                      style: {
                        color: L.green,
                        fontWeight: 700
                      },
                      children: "\u{1FA7A} Non-Trauma"
                    }), k("span", {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        fontVariantNumeric: "tabular-nums"
                      },
                      children: oe(x.non_trauma)
                    })]
                  }), k("div", {
                    style: {
                      height: 1,
                      background: "var(--md-divider)",
                      margin: "8px 0 6px"
                    }
                  }), q("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 12
                    },
                    children: [k("span", {
                      style: {
                        fontWeight: 700,
                        color: "var(--md-text-secondary)"
                      },
                      children: "\u0E23\u0E27\u0E21"
                    }), k("span", {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 900,
                        color: L.purple,
                        fontSize: 14,
                        fontVariantNumeric: "tabular-nums"
                      },
                      children: oe(x.total)
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 11,
                      marginTop: 4
                    },
                    children: [k("span", {
                      style: {
                        color: L.amber,
                        fontWeight: 700
                      },
                      children: "\u26A1 %Trauma"
                    }), q("span", {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 800,
                        color: L.amber,
                        fontVariantNumeric: "tabular-nums"
                      },
                      children: [x.pct, "%"]
                    })]
                  }), D !== null && q("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 10,
                      marginTop: 4,
                      padding: "4px 6px",
                      borderRadius: 6,
                      background: D >= 0 ? `${L.amber}10` : `${L.green}10`
                    },
                    children: [q("span", {
                      style: {
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)"
                      },
                      children: ["YoY vs ", C.fyLabel]
                    }), q("span", {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 800,
                        color: D >= 0 ? L.amber : L.green,
                        fontVariantNumeric: "tabular-nums"
                      },
                      children: [D >= 0 ? "\u2191" : "\u2193", " ", Math.abs(D), "%"]
                    })]
                  })]
                })
              }
            }), f !== "trauma" && k(We, {
              yAxisId: "L",
              dataKey: "non_trauma",
              stackId: "s",
              name: "Non-Trauma",
              fill: "url(#yearNonT)",
              radius: f === "all" ? [0, 0, 4, 4] : [6, 6, 4, 4],
              filter: "url(#yearShadow)",
              barSize: 50,
              isAnimationActive: !0,
              animationDuration: 800
            }), f !== "non-trauma" && k(We, {
              yAxisId: "L",
              dataKey: "trauma",
              stackId: "s",
              name: "Trauma",
              fill: "url(#yearTrauma)",
              radius: f === "all" ? [6, 6, 0, 0] : [6, 6, 4, 4],
              filter: "url(#yearShadow)",
              barSize: 50,
              isAnimationActive: !0,
              animationDuration: 1e3,
              children: k(Ne, {
                dataKey: "total",
                position: "top",
                offset: 6,
                formatter: d => oe(d),
                style: {
                  fill: L.purple,
                  fontSize: 11,
                  fontWeight: 900,
                  fontFamily: "monospace"
                }
              })
            }), k(Dt, {
              yAxisId: "R",
              type: "monotone",
              dataKey: "pct",
              name: "% Trauma",
              stroke: L.amber,
              strokeWidth: 3,
              dot: {
                r: 5,
                fill: L.amber,
                stroke: "var(--md-surface)",
                strokeWidth: 2.5,
                filter: `drop-shadow(0 0 4px ${L.amber}80)`
              },
              activeDot: {
                r: 7,
                fill: L.amber,
                stroke: "#fff",
                strokeWidth: 2
              },
              isAnimationActive: !0,
              animationDuration: 1200,
              children: k(Ne, {
                dataKey: "pct",
                position: "top",
                offset: 12,
                formatter: d => `${d}%`,
                style: {
                  fill: L.amber,
                  fontSize: 10,
                  fontWeight: 900,
                  fontFamily: "monospace"
                }
              })
            })]
          })
        }), k("div", {
          style: {
            display: "grid",
            gridTemplateColumns: `repeat(${N.length}, 1fr)`,
            gap: 10,
            marginTop: 18,
            paddingTop: 14,
            borderTop: "1px solid var(--md-divider)"
          },
          children: N.map((d, O) => {
            let P = N[O - 1],
              x = P && P.total > 0 ? Math.round((d.total - P.total) / P.total * 100) : null,
              _ = O === N.length - 1;
            return q("div", {
              style: {
                padding: "10px 12px",
                borderRadius: 10,
                background: _ ? `${L.purple}08` : "var(--md-surface-2, rgba(0,0,0,.02))",
                border: _ ? `1px solid ${L.purple}25` : "1px solid var(--md-divider)"
              },
              children: [q("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 4
                },
                children: [q("span", {
                  style: {
                    fontSize: 11,
                    fontWeight: 800,
                    color: _ ? L.purple : "var(--md-text-secondary)"
                  },
                  children: [d.fyLabel, " ", q("span", {
                    style: {
                      fontSize: 9,
                      opacity: .7
                    },
                    children: ["(\u0E04.\u0E28.", d.yr, ")"]
                  })]
                }), x !== null && q("span", {
                  style: {
                    fontSize: 9,
                    fontWeight: 800,
                    color: x >= 0 ? L.amber : L.green,
                    fontVariantNumeric: "tabular-nums"
                  },
                  children: [x >= 0 ? "\u2191" : "\u2193", " ", Math.abs(x), "%"]
                })]
              }), k("div", {
                style: {
                  fontSize: 18,
                  fontWeight: 900,
                  color: "var(--md-text-primary)",
                  fontFamily: "monospace",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums"
                },
                children: oe(d.total)
              }), q("div", {
                style: {
                  fontSize: 10,
                  color: L.amber,
                  fontWeight: 700,
                  marginTop: 3,
                  fontVariantNumeric: "tabular-nums"
                },
                children: ["Trauma ", d.pct, "%"]
              })]
            }, d.yr)
          })
        })]
      })
    }), k(lr, {
      from: L.cyan,
      to: L.green,
      icon: "\u{1F4CB}",
      label: "\u0E15\u0E32\u0E23\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14",
      sub: "3 \u0E15\u0E33\u0E1A\u0E25 + \u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
    }), k(Bt, {
      children: q("div", {
        className: "glass-card",
        style: {
          padding: "1.25rem 1.5rem"
        },
        children: [k("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1.6fr 0.7fr 1fr 1fr 1fr 1.8fr 1.8fr",
            gap: 12,
            padding: "0 12px 10px",
            borderBottom: "2px solid var(--md-divider)",
            marginBottom: 6
          },
          children: ["\u0E15\u0E33\u0E1A\u0E25", "\u0E23\u0E2B\u0E31\u0E2A", "Trauma", "Non-T", "\u0E23\u0E27\u0E21", "% Trauma", "% \u0E02\u0E2D\u0E07\u0E2D\u0E33\u0E40\u0E20\u0E2D"].map(d => k("div", {
            style: {
              fontSize: 10,
              fontWeight: 800,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: ".1em"
            },
            children: d
          }, d))
        }), j.map(d => {
          let O = d.total > 0 ? (d.trauma / d.total * 100).toFixed(1) : "0.0",
            P = v.total > 0 ? (d.total / v.total * 100).toFixed(1) : "0.0",
            x = parseFloat(O) > 20 ? L.red : parseFloat(O) > 15 ? L.amber : L.green;
          return q("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1.6fr 0.7fr 1fr 1fr 1fr 1.8fr 1.8fr",
              gap: 12,
              padding: "12px",
              borderRadius: 10,
              marginBottom: 6,
              background: `linear-gradient(90deg, ${d.color}08 0%, transparent 50%)`,
              borderLeft: `3px solid ${d.color}`,
              alignItems: "center",
              transition: "transform .15s, box-shadow .15s",
              cursor: "default"
            },
            onMouseEnter: _ => {
              _.currentTarget.style.transform = "translateX(2px)", _.currentTarget.style.boxShadow = `0 4px 12px ${d.color}20`
            },
            onMouseLeave: _ => {
              _.currentTarget.style.transform = "", _.currentTarget.style.boxShadow = ""
            },
            children: [q("div", {
              children: [k("div", {
                style: {
                  fontSize: 13,
                  fontWeight: 800,
                  color: "var(--md-text-primary)"
                },
                children: d.tambon
              }), k("div", {
                style: {
                  fontSize: 10,
                  fontWeight: 600,
                  color: d.color,
                  opacity: .8,
                  marginTop: 1
                },
                children: "\u0E15\u0E33\u0E1A\u0E25\u0E43\u0E19 \u0E2D.\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07"
              })]
            }), k("div", {
              style: {
                fontFamily: "monospace",
                fontSize: 11,
                color: "var(--md-text-tertiary)",
                fontWeight: 700
              },
              children: d.addressid
            }), k("div", {
              style: {
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 900,
                color: L.red,
                fontVariantNumeric: "tabular-nums"
              },
              children: oe(d.trauma)
            }), k("div", {
              style: {
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 900,
                color: L.green,
                fontVariantNumeric: "tabular-nums"
              },
              children: oe(d.non_trauma)
            }), k("div", {
              style: {
                fontFamily: "monospace",
                fontSize: 15,
                fontWeight: 900,
                color: d.color,
                fontVariantNumeric: "tabular-nums"
              },
              children: oe(d.total)
            }), k(HT, {
              pct: parseFloat(O),
              color: x,
              height: 6
            }), k(HT, {
              pct: parseFloat(P),
              color: d.color,
              height: 6
            })]
          }, d.addressid)
        }), q("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1.6fr 0.7fr 1fr 1fr 1fr 1.8fr 1.8fr",
            gap: 12,
            padding: "14px 12px",
            borderRadius: 10,
            marginTop: 8,
            background: `linear-gradient(90deg, ${L.purple}10 0%, ${L.cyan}10 100%)`,
            borderLeft: `4px solid ${L.purple}`,
            alignItems: "center"
          },
          children: [q("div", {
            children: [k("div", {
              style: {
                fontSize: 14,
                fontWeight: 900,
                color: L.purple,
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
            }), k("div", {
              style: {
                fontSize: 10,
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                marginTop: 1
              },
              children: "\u0E2D.\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07 \xB7 3 \u0E15\u0E33\u0E1A\u0E25"
            })]
          }), k("div", {
            style: {
              fontSize: 10,
              color: "var(--md-text-tertiary)"
            },
            children: "\u2014"
          }), k("div", {
            style: {
              fontFamily: "monospace",
              fontSize: 16,
              fontWeight: 900,
              color: L.red,
              fontVariantNumeric: "tabular-nums"
            },
            children: oe(v.trauma)
          }), k("div", {
            style: {
              fontFamily: "monospace",
              fontSize: 16,
              fontWeight: 900,
              color: L.green,
              fontVariantNumeric: "tabular-nums"
            },
            children: oe(v.non_trauma)
          }), k("div", {
            style: {
              fontFamily: "monospace",
              fontSize: 18,
              fontWeight: 900,
              color: L.purple,
              fontVariantNumeric: "tabular-nums",
              textShadow: `0 0 16px ${L.purple}40`
            },
            children: oe(v.total)
          }), q("div", {
            style: {
              fontSize: 12,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 99,
              background: `${L.red}12`,
              color: L.red,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontVariantNumeric: "tabular-nums",
              width: "fit-content"
            },
            children: ["\u{1F6A8} ", v.pct, "%"]
          }), k("div", {
            style: {
              fontSize: 12,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 99,
              background: `${L.cyan}12`,
              color: L.cyan,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "fit-content"
            },
            children: "100%"
          })]
        })]
      })
    }), W.length > 0 && q(nm, {
      children: [k(lr, {
        from: L.purpleAlt,
        to: L.cyan,
        icon: "\u{1F9E0}",
        label: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \xB7 \u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01 \u0E43\u0E19\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
        sub: `${W.length} \u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19`
      }), k(Bt, {
        children: q("div", {
          className: "glass-card",
          style: {
            padding: "1.5rem",
            border: `1.5px solid ${L.purpleAlt}25`
          },
          children: [k("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            },
            children: W.map((d, O) => {
              let P = {
                HIGH: {
                  bg: "rgba(244,63,94,.08)",
                  text: L.red,
                  label: "\u26A0\uFE0F HIGH"
                },
                MEDIUM: {
                  bg: "rgba(245,158,11,.08)",
                  text: L.amber,
                  label: "\u{1F4CC} MEDIUM"
                },
                LOW: {
                  bg: "rgba(16,185,129,.08)",
                  text: L.green,
                  label: "\u2713 LOW"
                }
              } [d.priority] || {
                bg: "rgba(245,158,11,.08)",
                text: L.amber,
                label: "\u{1F4CC} MEDIUM"
              };
              return q("div", {
                style: {
                  borderRadius: "14px",
                  border: `1.5px solid ${d.color}20`,
                  background: `${d.color}04`,
                  overflow: "hidden"
                },
                children: [q("div", {
                  style: {
                    padding: "10px 16px",
                    borderBottom: `1px solid ${d.color}15`,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: `linear-gradient(90deg, ${d.color}10, transparent)`
                  },
                  children: [k("span", {
                    style: {
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: d.color,
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    },
                    children: O + 1
                  }), k("span", {
                    style: {
                      fontSize: "20px"
                    },
                    children: d.icon
                  }), k("span", {
                    style: {
                      flex: 1,
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)"
                    },
                    children: d.title
                  }), k("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "3px 10px",
                      borderRadius: "99px",
                      background: P.bg,
                      color: P.text,
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap"
                    },
                    children: P.label
                  })]
                }), k("div", {
                  style: {
                    padding: "12px 16px",
                    fontSize: "12px",
                    lineHeight: 1.65,
                    color: "var(--md-text-secondary)",
                    fontWeight: 500
                  },
                  children: d.body
                })]
              }, O)
            })
          }), k("div", {
            style: {
              marginTop: "12px",
              paddingTop: "10px",
              borderTop: "1px solid var(--md-divider)",
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              textAlign: "center",
              letterSpacing: "0.04em"
            },
            children: "\u{1F916} Rule-based AI \xB7 \u0E1B\u0E23\u0E30\u0E21\u0E27\u0E25\u0E1C\u0E25\u0E15\u0E32\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 HOSxP XE \u0E2A\u0E14\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01 \xB7 \u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E04\u0E33\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C"
          })]
        })
      })]
    }), k(lr, {
      from: L.purple,
      to: L.pink,
      icon: "\u{1FA7A}",
      label: "\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E42\u0E23\u0E04\u0E2A\u0E33\u0E04\u0E31\u0E0D",
      sub: `${(p==="all"?"\u0E17\u0E38\u0E01\u0E15\u0E33\u0E1A\u0E25":qr[p]?.name)||""} \xB7 ${g.slice(0,7)} \u2192 ${b.slice(0,7)}`
    }), k("div", {
      className: "grid grid-cols-2 md:grid-cols-4 gap-3",
      children: sr.map(d => q("div", {
        className: "glass-card",
        style: {
          padding: "14px 16px",
          borderLeft: `4px solid ${d.color}`,
          background: `${d.color}05`
        },
        children: [q("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px"
          },
          children: [q("span", {
            style: {
              fontSize: "11px",
              fontWeight: 800,
              color: d.color,
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            },
            children: [d.icon, " ", d.name_th]
          }), k("span", {
            style: {
              fontSize: "9px",
              fontWeight: 700,
              color: d.color,
              fontFamily: "monospace",
              opacity: .7
            },
            children: d.code
          })]
        }), k("div", {
          style: {
            fontSize: "28px",
            fontWeight: 900,
            color: "var(--md-text-primary)",
            fontFamily: "monospace",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums"
          },
          children: oe(R[d.id])
        }), k("div", {
          style: {
            fontSize: "10px",
            color: "var(--md-text-tertiary)",
            marginTop: "4px",
            fontWeight: 600
          },
          children: "\u0E23\u0E32\u0E22 (\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01)"
        })]
      }, d.id))
    }), k(Bt, {
      children: q("div", {
        className: "glass-card",
        style: {
          padding: "1.25rem 1.5rem"
        },
        children: [k("p", {
          style: {
            fontSize: "11px",
            fontWeight: 800,
            color: "var(--md-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "8px"
          },
          children: "\u{1F4C9} \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 4 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04"
        }), k(Vr, {
          width: "100%",
          height: 300,
          children: q(em, {
            data: $,
            margin: {
              top: 5,
              right: 30,
              left: 0,
              bottom: 5
            },
            children: [k(Tn, {
              strokeDasharray: "3 3",
              stroke: "var(--md-divider)",
              vertical: !1
            }), k(Rt, {
              dataKey: "ym",
              stroke: "var(--md-text-tertiary)",
              tick: {
                fontSize: 9,
                fontWeight: 600
              },
              angle: -30,
              textAnchor: "end",
              height: 60
            }), k(ct, {
              yAxisId: "L",
              stroke: "var(--md-text-tertiary)",
              tick: {
                fontSize: 10
              },
              label: {
                value: "Stroke/STEMI/Sepsis",
                angle: -90,
                position: "insideLeft",
                fontSize: 10,
                fill: "var(--md-text-tertiary)"
              }
            }), k(ct, {
              yAxisId: "R",
              orientation: "right",
              stroke: L.red,
              tick: {
                fontSize: 10
              },
              label: {
                value: "Trauma",
                angle: 90,
                position: "insideRight",
                fontSize: 10,
                fill: L.red
              }
            }), k(Ve, {
              contentStyle: {
                background: "var(--md-surface)",
                border: "1px solid var(--md-border)",
                borderRadius: 8,
                fontSize: 12
              }
            }), k(Ft, {
              wrapperStyle: {
                fontSize: 11,
                fontWeight: 600
              }
            }), k(Dt, {
              yAxisId: "L",
              type: "monotone",
              dataKey: "stroke",
              name: "Stroke",
              stroke: L.pink,
              strokeWidth: 2.5,
              dot: {
                r: 2
              }
            }), k(Dt, {
              yAxisId: "L",
              type: "monotone",
              dataKey: "stemi",
              name: "STEMI",
              stroke: L.orange,
              strokeWidth: 2.5,
              dot: {
                r: 2
              }
            }), k(Dt, {
              yAxisId: "L",
              type: "monotone",
              dataKey: "sepsis",
              name: "Sepsis",
              stroke: L.cyan,
              strokeWidth: 2.5,
              dot: {
                r: 2
              }
            }), k(Dt, {
              yAxisId: "R",
              type: "monotone",
              dataKey: "trauma",
              name: "Trauma",
              stroke: L.red,
              strokeWidth: 2.5,
              dot: {
                r: 2
              }
            })]
          })
        })]
      })
    }), k(lr, {
      from: L.cyan,
      to: L.pink,
      icon: "\u{1F5FA}\uFE0F",
      label: "\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E15\u0E33\u0E1A\u0E25 \xB7 4 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04"
    }), k(Bt, {
      children: k("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3",
        children: sr.map(d => q("div", {
          className: "glass-card",
          style: {
            padding: "0",
            overflow: "hidden"
          },
          children: [q("div", {
            style: {
              padding: "10px 14px",
              background: `${d.color}08`,
              borderBottom: `1px solid ${d.color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            },
            children: [q("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: d.color,
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              },
              children: [d.icon, " ", d.name_th]
            }), k("span", {
              style: {
                fontSize: "9px",
                fontWeight: 600,
                color: d.color,
                opacity: .7,
                fontFamily: "monospace"
              },
              children: d.code
            })]
          }), k("div", {
            style: {
              padding: "10px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            },
            children: Object.entries(qr).map(([O, P]) => q("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px 0"
              },
              children: [q("span", {
                style: {
                  fontSize: "11px",
                  color: "var(--md-text-secondary)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                },
                children: [k("span", {
                  style: {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: P.color,
                    display: "inline-block"
                  }
                }), P.name]
              }), k("span", {
                style: {
                  fontSize: "15px",
                  fontWeight: 900,
                  color: "var(--md-text-primary)",
                  fontFamily: "monospace",
                  fontVariantNumeric: "tabular-nums"
                },
                children: oe(z[O]?.[d.id] ?? 0)
              })]
            }, O))
          })]
        }, d.id))
      })
    }), k(lr, {
      from: L.orange,
      to: L.pink,
      icon: "\u{1F3D8}\uFE0F",
      label: "\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 4 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04 \xD7 3 \u0E15\u0E33\u0E1A\u0E25",
      sub: "Horizontal \xB7 Gradient bars"
    }), k(Bt, {
      children: q("div", {
        className: "glass-card",
        style: {
          padding: "1.5rem 1.75rem",
          background: `linear-gradient(135deg, ${L.orange}05 0%, ${L.pink}05 100%)`
        },
        children: [q("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
            gap: 12,
            flexWrap: "wrap"
          },
          children: [q("div", {
            children: [k("div", {
              style: {
                fontSize: 10,
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".12em"
              },
              children: "Disease \xD7 Tambon Heat Map"
            }), q("div", {
              style: {
                fontSize: 14,
                fontWeight: 800,
                color: "var(--md-text-primary)",
                marginTop: 2
              },
              children: ["4 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04 \xD7 3 \u0E15\u0E33\u0E1A\u0E25 \xB7 ", oe(R.stroke + R.stemi + R.sepsis + R.trauma), " \u0E23\u0E32\u0E22"]
            })]
          }), k("div", {
            style: {
              display: "flex",
              gap: 14,
              alignItems: "center",
              flexWrap: "wrap"
            },
            children: Object.entries(qr).map(([d, O]) => q("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6
              },
              children: [k("span", {
                style: {
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${O.color}, ${O.color}aa)`,
                  boxShadow: `0 2px 4px ${O.color}40`
                }
              }), k("span", {
                style: {
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--md-text-secondary)"
                },
                children: O.name
              })]
            }, d))
          })]
        }), k(Vr, {
          width: "100%",
          height: Math.max(280, sr.length * 80),
          children: q(Va, {
            data: H,
            layout: "vertical",
            margin: {
              top: 8,
              right: 60,
              left: 0,
              bottom: 8
            },
            barCategoryGap: "22%",
            barGap: 3,
            children: [q("defs", {
              children: [q("linearGradient", {
                id: "tbSamnak",
                x1: "0",
                y1: "0",
                x2: "1",
                y2: "0",
                children: [k("stop", {
                  offset: "0%",
                  stopColor: L.green,
                  stopOpacity: .95
                }), k("stop", {
                  offset: "100%",
                  stopColor: "#06d6a0",
                  stopOpacity: .9
                })]
              }), q("linearGradient", {
                id: "tbPhla",
                x1: "0",
                y1: "0",
                x2: "1",
                y2: "0",
                children: [k("stop", {
                  offset: "0%",
                  stopColor: L.cyan,
                  stopOpacity: .95
                }), k("stop", {
                  offset: "100%",
                  stopColor: "#3b82f6",
                  stopOpacity: .9
                })]
              }), q("linearGradient", {
                id: "tbBanchang",
                x1: "0",
                y1: "0",
                x2: "1",
                y2: "0",
                children: [k("stop", {
                  offset: "0%",
                  stopColor: L.yellow,
                  stopOpacity: .95
                }), k("stop", {
                  offset: "100%",
                  stopColor: L.amber,
                  stopOpacity: .9
                })]
              }), k("filter", {
                id: "diseaseShadow",
                x: "-2%",
                y: "-2%",
                width: "104%",
                height: "120%",
                children: k("feDropShadow", {
                  dx: "0",
                  dy: "2",
                  stdDeviation: "2",
                  floodColor: "#000",
                  floodOpacity: "0.08"
                })
              })]
            }), k(Tn, {
              strokeDasharray: "2 4",
              stroke: "var(--md-divider)",
              horizontal: !1
            }), k(Rt, {
              type: "number",
              stroke: "var(--md-text-tertiary)",
              tick: {
                fontSize: 10,
                fontWeight: 600
              },
              tickFormatter: d => d >= 1e3 ? `${(d/1e3).toFixed(1)}K` : d,
              axisLine: !1,
              tickLine: !1
            }), k(ct, {
              type: "category",
              dataKey: "disease",
              stroke: "var(--md-text-primary)",
              tick: d => {
                let {
                  x: O,
                  y: P,
                  payload: x
                } = d, _ = sr.find(C => C.name_th === x.value);
                return q("g", {
                  transform: `translate(${O},${P})`,
                  children: [q("text", {
                    x: -8,
                    y: -2,
                    textAnchor: "end",
                    fontSize: "13",
                    fontWeight: "800",
                    fill: "var(--md-text-primary)",
                    children: [_?.icon || "", " ", x.value]
                  }), k("text", {
                    x: -8,
                    y: 14,
                    textAnchor: "end",
                    fontSize: "9",
                    fontWeight: "600",
                    fill: "var(--md-text-tertiary)",
                    fontFamily: "monospace",
                    children: _?.code || ""
                  })]
                })
              },
              width: 130,
              axisLine: !1,
              tickLine: !1
            }), k(Ve, {
              cursor: {
                fill: "rgba(124,58,237,.05)"
              },
              content: ({
                active: d,
                payload: O,
                label: P
              }) => {
                if (!d || !O?.length) return null;
                let x = sr.find(C => C.name_th === P),
                  _ = O.reduce((C, D) => C + (D.value || 0), 0);
                return q("div", {
                  style: {
                    background: "var(--md-surface)",
                    border: `1px solid ${x?.color||L.cyan}40`,
                    borderLeft: `4px solid ${x?.color||L.cyan}`,
                    borderRadius: 12,
                    padding: "12px 16px",
                    boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                    minWidth: 220
                  },
                  children: [q("div", {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8
                    },
                    children: [k("span", {
                      style: {
                        fontSize: 22
                      },
                      children: x?.icon
                    }), q("div", {
                      children: [k("div", {
                        style: {
                          fontSize: 14,
                          fontWeight: 900,
                          color: x?.color || L.cyan
                        },
                        children: P
                      }), k("div", {
                        style: {
                          fontSize: 10,
                          fontFamily: "monospace",
                          color: "var(--md-text-tertiary)",
                          fontWeight: 600
                        },
                        children: x?.code
                      })]
                    })]
                  }), O.map(C => {
                    let D = _ > 0 ? (C.value / _ * 100).toFixed(1) : 0;
                    return q("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 11,
                        marginTop: 4
                      },
                      children: [q("span", {
                        style: {
                          color: C.color,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: 5
                        },
                        children: [k("span", {
                          style: {
                            width: 8,
                            height: 8,
                            borderRadius: 2,
                            background: C.color
                          }
                        }), C.dataKey]
                      }), q("span", {
                        style: {
                          fontFamily: "monospace",
                          fontWeight: 800,
                          color: "var(--md-text-primary)",
                          fontVariantNumeric: "tabular-nums"
                        },
                        children: [oe(C.value), q("span", {
                          style: {
                            color: "var(--md-text-tertiary)",
                            fontSize: 9,
                            marginLeft: 4
                          },
                          children: ["(", D, "%)"]
                        })]
                      })]
                    }, C.dataKey)
                  }), k("div", {
                    style: {
                      height: 1,
                      background: "var(--md-divider)",
                      margin: "8px 0 6px"
                    }
                  }), q("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 12
                    },
                    children: [k("span", {
                      style: {
                        fontWeight: 700,
                        color: "var(--md-text-secondary)"
                      },
                      children: "\u0E23\u0E27\u0E21"
                    }), k("span", {
                      style: {
                        fontFamily: "monospace",
                        fontWeight: 900,
                        color: x?.color || L.cyan,
                        fontSize: 14,
                        fontVariantNumeric: "tabular-nums"
                      },
                      children: oe(_)
                    })]
                  })]
                })
              }
            }), k(We, {
              dataKey: "\u0E2A\u0E33\u0E19\u0E31\u0E01\u0E17\u0E49\u0E2D\u0E19",
              fill: "url(#tbSamnak)",
              radius: [0, 4, 4, 0],
              filter: "url(#diseaseShadow)",
              isAnimationActive: !0,
              animationDuration: 800,
              children: k(Ne, {
                dataKey: "\u0E2A\u0E33\u0E19\u0E31\u0E01\u0E17\u0E49\u0E2D\u0E19",
                position: "right",
                offset: 6,
                formatter: d => d > 0 ? oe(d) : "",
                style: {
                  fill: L.green,
                  fontSize: 10,
                  fontWeight: 800,
                  fontFamily: "monospace"
                }
              })
            }), k(We, {
              dataKey: "\u0E1E\u0E25\u0E32",
              fill: "url(#tbPhla)",
              radius: [0, 4, 4, 0],
              filter: "url(#diseaseShadow)",
              isAnimationActive: !0,
              animationDuration: 900,
              children: k(Ne, {
                dataKey: "\u0E1E\u0E25\u0E32",
                position: "right",
                offset: 6,
                formatter: d => d > 0 ? oe(d) : "",
                style: {
                  fill: L.cyan,
                  fontSize: 10,
                  fontWeight: 800,
                  fontFamily: "monospace"
                }
              })
            }), k(We, {
              dataKey: "\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07",
              fill: "url(#tbBanchang)",
              radius: [0, 4, 4, 0],
              filter: "url(#diseaseShadow)",
              isAnimationActive: !0,
              animationDuration: 1e3,
              children: k(Ne, {
                dataKey: "\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07",
                position: "right",
                offset: 6,
                formatter: d => d > 0 ? oe(d) : "",
                style: {
                  fill: L.amber,
                  fontSize: 10,
                  fontWeight: 800,
                  fontFamily: "monospace"
                }
              })
            })]
          })
        }), k("div", {
          style: {
            display: "grid",
            gridTemplateColumns: `repeat(${sr.length}, 1fr)`,
            gap: 10,
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid var(--md-divider)"
          },
          children: sr.map(d => {
            let O = R[d.id],
              P = z[210201]?.[d.id] || 0,
              x = z[210202]?.[d.id] || 0,
              _ = z[210203]?.[d.id] || 0,
              D = [{
                tb: "\u0E2A\u0E33\u0E19\u0E31\u0E01\u0E17\u0E49\u0E2D\u0E19",
                v: P,
                c: L.green
              }, {
                tb: "\u0E1E\u0E25\u0E32",
                v: x,
                c: L.cyan
              }, {
                tb: "\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07",
                v: _,
                c: L.yellow
              }].sort((F, Y) => Y.v - F.v)[0];
            return q("div", {
              style: {
                padding: "10px 12px",
                borderRadius: 10,
                background: `${d.color}06`,
                borderLeft: `3px solid ${d.color}`
              },
              children: [q("div", {
                style: {
                  fontSize: 11,
                  fontWeight: 800,
                  color: d.color,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                  marginBottom: 3
                },
                children: [d.icon, " ", d.name_th]
              }), k("div", {
                style: {
                  fontSize: 20,
                  fontWeight: 900,
                  color: "var(--md-text-primary)",
                  fontFamily: "monospace",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                  marginBottom: 4
                },
                children: oe(O)
              }), q("div", {
                style: {
                  fontSize: 10,
                  fontWeight: 700,
                  color: D.c,
                  fontVariantNumeric: "tabular-nums"
                },
                children: ["\u{1F947} ", D.tb, " \xB7 ", oe(D.v)]
              })]
            }, d.id)
          })
        })]
      })
    }), k("div", {
      className: "text-center opacity-30 py-4",
      children: k("p", {
        className: "text-[10px] font-bold tracking-widest text-[var(--md-text-tertiary)] uppercase",
        children: "BCH ER Audit \xB7 \u0E2D.\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07 \xB7 HOSxP XE \xB7 er_regist + ovst + patient + ovstdiag"
      })
    })]
  })
}

function JU(e) {
  return e.slice(0, 7)
}

function QU(e) {
  return e.slice(0, 7)
}

function zT({
  active: e,
  color: t,
  children: r,
  onClick: n
}) {
  return k("button", {
    onClick: n,
    style: {
      padding: "6px 14px",
      fontSize: "12px",
      fontWeight: 700,
      borderRadius: "6px",
      cursor: "pointer",
      border: `1px solid ${e?t:"var(--md-border)"}`,
      color: e ? t : "var(--md-text-secondary)",
      background: e ? `${t}15` : "transparent",
      transition: "all 0.15s",
      letterSpacing: "0.02em"
    },
    children: r
  })
}

function HT({
  pct: e,
  color: t,
  height: r = 6
}) {
  return q("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    },
    children: [k("div", {
      style: {
        flex: 1,
        height: r,
        background: "var(--md-divider)",
        borderRadius: r / 2,
        overflow: "hidden",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,.04)"
      },
      children: k("div", {
        style: {
          height: "100%",
          width: `${Math.min(100,e)}%`,
          background: `linear-gradient(90deg, ${t}cc, ${t})`,
          borderRadius: r / 2,
          boxShadow: `0 1px 4px ${t}40`,
          transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
        }
      })
    }), q("span", {
      style: {
        fontFamily: "monospace",
        fontSize: 12,
        color: t,
        fontWeight: 900,
        fontVariantNumeric: "tabular-nums",
        minWidth: 46,
        textAlign: "right"
      },
      children: [e.toFixed(1), "%"]
    })]
  })
}
export {
  ZU as
  default
};
/*! Bundled license information:

react-is/cjs/react-is.production.min.js:
  (**
   * @license React
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

decimal.js-light/decimal.js:
  (*! decimal.js-light v2.5.1 https://github.com/MikeMcl/decimal.js-light/LICENCE *)
*/