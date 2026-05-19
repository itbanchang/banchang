var V_ = Object.create;
var Ol = Object.defineProperty;
var X_ = Object.getOwnPropertyDescriptor;
var Y_ = Object.getOwnPropertyNames;
var Z_ = Object.getPrototypeOf,
  J_ = Object.prototype.hasOwnProperty;
var I = (t, e) => () => (e || t((e = {
    exports: {}
  }).exports, e), e.exports),
  Q_ = (t, e) => {
    for (var r in e) Ol(t, r, {
      get: e[r],
      enumerable: !0
    })
  },
  tP = (t, e, r, n) => {
    if (e && typeof e == "object" || typeof e == "function")
      for (let i of Y_(e)) !J_.call(t, i) && i !== r && Ol(t, i, {
        get: () => e[i],
        enumerable: !(n = X_(e, i)) || n.enumerable
      });
    return t
  };
var et = (t, e, r) => (r = t != null ? V_(Z_(t)) : {}, tP(e || !t || !t.__esModule ? Ol(r, "default", {
  value: t,
  enumerable: !0
}) : r, t));
var ae = I((l4, Nd) => {
  var rP = Array.isArray;
  Nd.exports = rP
});
var Sl = I((c4, Rd) => {
  var nP = typeof global == "object" && global && global.Object === Object && global;
  Rd.exports = nP
});
var We = I((f4, Ld) => {
  var iP = Sl(),
    oP = typeof self == "object" && self && self.Object === Object && self,
    aP = iP || oP || Function("return this")();
  Ld.exports = aP
});
var On = I((p4, Bd) => {
  var uP = We(),
    sP = uP.Symbol;
  Bd.exports = sP
});
var Fd = I((d4, zd) => {
  var qd = On(),
    Wd = Object.prototype,
    lP = Wd.hasOwnProperty,
    cP = Wd.toString,
    Hi = qd ? qd.toStringTag : void 0;

  function fP(t) {
    var e = lP.call(t, Hi),
      r = t[Hi];
    try {
      t[Hi] = void 0;
      var n = !0
    } catch {}
    var i = cP.call(t);
    return n && (e ? t[Hi] = r : delete t[Hi]), i
  }
  zd.exports = fP
});
var Ud = I((m4, $d) => {
  var pP = Object.prototype,
    dP = pP.toString;

  function mP(t) {
    return dP.call(t)
  }
  $d.exports = mP
});
var Ze = I((h4, Kd) => {
  var Hd = On(),
    hP = Fd(),
    yP = Ud(),
    vP = "[object Null]",
    gP = "[object Undefined]",
    Gd = Hd ? Hd.toStringTag : void 0;

  function bP(t) {
    return t == null ? t === void 0 ? gP : vP : Gd && Gd in Object(t) ? hP(t) : yP(t)
  }
  Kd.exports = bP
});
var Je = I((y4, Vd) => {
  function xP(t) {
    return t != null && typeof t == "object"
  }
  Vd.exports = xP
});
var Wr = I((v4, Xd) => {
  var wP = Ze(),
    OP = Je(),
    SP = "[object Symbol]";

  function AP(t) {
    return typeof t == "symbol" || OP(t) && wP(t) == SP
  }
  Xd.exports = AP
});
var La = I((g4, Yd) => {
  var _P = ae(),
    PP = Wr(),
    TP = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    EP = /^\w*$/;

  function jP(t, e) {
    if (_P(t)) return !1;
    var r = typeof t;
    return r == "number" || r == "symbol" || r == "boolean" || t == null || PP(t) ? !0 : EP.test(t) || !TP.test(t) || e != null && t in Object(e)
  }
  Yd.exports = jP
});
var Pe = I((b4, Zd) => {
  function MP(t) {
    var e = typeof t;
    return t != null && (e == "object" || e == "function")
  }
  Zd.exports = MP
});
var Lt = I((x4, Jd) => {
  var CP = Ze(),
    IP = Pe(),
    kP = "[object AsyncFunction]",
    DP = "[object Function]",
    NP = "[object GeneratorFunction]",
    RP = "[object Proxy]";

  function LP(t) {
    if (!IP(t)) return !1;
    var e = CP(t);
    return e == DP || e == NP || e == kP || e == RP
  }
  Jd.exports = LP
});
var tm = I((w4, Qd) => {
  var BP = We(),
    qP = BP["__core-js_shared__"];
  Qd.exports = qP
});
var nm = I((O4, rm) => {
  var Al = tm(),
    em = function() {
      var t = /[^.]+$/.exec(Al && Al.keys && Al.keys.IE_PROTO || "");
      return t ? "Symbol(src)_1." + t : ""
    }();

  function WP(t) {
    return !!em && em in t
  }
  rm.exports = WP
});
var _l = I((S4, im) => {
  var zP = Function.prototype,
    FP = zP.toString;

  function $P(t) {
    if (t != null) {
      try {
        return FP.call(t)
      } catch {}
      try {
        return t + ""
      } catch {}
    }
    return ""
  }
  im.exports = $P
});
var am = I((A4, om) => {
  var UP = Lt(),
    HP = nm(),
    GP = Pe(),
    KP = _l(),
    VP = /[\\^$.*+?()[\]{}|]/g,
    XP = /^\[object .+?Constructor\]$/,
    YP = Function.prototype,
    ZP = Object.prototype,
    JP = YP.toString,
    QP = ZP.hasOwnProperty,
    tT = RegExp("^" + JP.call(QP).replace(VP, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

  function eT(t) {
    if (!GP(t) || HP(t)) return !1;
    var e = UP(t) ? tT : XP;
    return e.test(KP(t))
  }
  om.exports = eT
});
var sm = I((_4, um) => {
  function rT(t, e) {
    return t?.[e]
  }
  um.exports = rT
});
var Ar = I((P4, lm) => {
  var nT = am(),
    iT = sm();

  function oT(t, e) {
    var r = iT(t, e);
    return nT(r) ? r : void 0
  }
  lm.exports = oT
});
var Gi = I((T4, cm) => {
  var aT = Ar(),
    uT = aT(Object, "create");
  cm.exports = uT
});
var dm = I((E4, pm) => {
  var fm = Gi();

  function sT() {
    this.__data__ = fm ? fm(null) : {}, this.size = 0
  }
  pm.exports = sT
});
var hm = I((j4, mm) => {
  function lT(t) {
    var e = this.has(t) && delete this.__data__[t];
    return this.size -= e ? 1 : 0, e
  }
  mm.exports = lT
});
var vm = I((M4, ym) => {
  var cT = Gi(),
    fT = "__lodash_hash_undefined__",
    pT = Object.prototype,
    dT = pT.hasOwnProperty;

  function mT(t) {
    var e = this.__data__;
    if (cT) {
      var r = e[t];
      return r === fT ? void 0 : r
    }
    return dT.call(e, t) ? e[t] : void 0
  }
  ym.exports = mT
});
var bm = I((C4, gm) => {
  var hT = Gi(),
    yT = Object.prototype,
    vT = yT.hasOwnProperty;

  function gT(t) {
    var e = this.__data__;
    return hT ? e[t] !== void 0 : vT.call(e, t)
  }
  gm.exports = gT
});
var wm = I((I4, xm) => {
  var bT = Gi(),
    xT = "__lodash_hash_undefined__";

  function wT(t, e) {
    var r = this.__data__;
    return this.size += this.has(t) ? 0 : 1, r[t] = bT && e === void 0 ? xT : e, this
  }
  xm.exports = wT
});
var Sm = I((k4, Om) => {
  var OT = dm(),
    ST = hm(),
    AT = vm(),
    _T = bm(),
    PT = wm();

  function Sn(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }
  Sn.prototype.clear = OT;
  Sn.prototype.delete = ST;
  Sn.prototype.get = AT;
  Sn.prototype.has = _T;
  Sn.prototype.set = PT;
  Om.exports = Sn
});
var _m = I((D4, Am) => {
  function TT() {
    this.__data__ = [], this.size = 0
  }
  Am.exports = TT
});
var Ba = I((N4, Pm) => {
  function ET(t, e) {
    return t === e || t !== t && e !== e
  }
  Pm.exports = ET
});
var Ki = I((R4, Tm) => {
  var jT = Ba();

  function MT(t, e) {
    for (var r = t.length; r--;)
      if (jT(t[r][0], e)) return r;
    return -1
  }
  Tm.exports = MT
});
var jm = I((L4, Em) => {
  var CT = Ki(),
    IT = Array.prototype,
    kT = IT.splice;

  function DT(t) {
    var e = this.__data__,
      r = CT(e, t);
    if (r < 0) return !1;
    var n = e.length - 1;
    return r == n ? e.pop() : kT.call(e, r, 1), --this.size, !0
  }
  Em.exports = DT
});
var Cm = I((B4, Mm) => {
  var NT = Ki();

  function RT(t) {
    var e = this.__data__,
      r = NT(e, t);
    return r < 0 ? void 0 : e[r][1]
  }
  Mm.exports = RT
});
var km = I((q4, Im) => {
  var LT = Ki();

  function BT(t) {
    return LT(this.__data__, t) > -1
  }
  Im.exports = BT
});
var Nm = I((W4, Dm) => {
  var qT = Ki();

  function WT(t, e) {
    var r = this.__data__,
      n = qT(r, t);
    return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this
  }
  Dm.exports = WT
});
var Vi = I((z4, Rm) => {
  var zT = _m(),
    FT = jm(),
    $T = Cm(),
    UT = km(),
    HT = Nm();

  function An(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }
  An.prototype.clear = zT;
  An.prototype.delete = FT;
  An.prototype.get = $T;
  An.prototype.has = UT;
  An.prototype.set = HT;
  Rm.exports = An
});
var qa = I((F4, Lm) => {
  var GT = Ar(),
    KT = We(),
    VT = GT(KT, "Map");
  Lm.exports = VT
});
var Wm = I(($4, qm) => {
  var Bm = Sm(),
    XT = Vi(),
    YT = qa();

  function ZT() {
    this.size = 0, this.__data__ = {
      hash: new Bm,
      map: new(YT || XT),
      string: new Bm
    }
  }
  qm.exports = ZT
});
var Fm = I((U4, zm) => {
  function JT(t) {
    var e = typeof t;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null
  }
  zm.exports = JT
});
var Xi = I((H4, $m) => {
  var QT = Fm();

  function tE(t, e) {
    var r = t.__data__;
    return QT(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map
  }
  $m.exports = tE
});
var Hm = I((G4, Um) => {
  var eE = Xi();

  function rE(t) {
    var e = eE(this, t).delete(t);
    return this.size -= e ? 1 : 0, e
  }
  Um.exports = rE
});
var Km = I((K4, Gm) => {
  var nE = Xi();

  function iE(t) {
    return nE(this, t).get(t)
  }
  Gm.exports = iE
});
var Xm = I((V4, Vm) => {
  var oE = Xi();

  function aE(t) {
    return oE(this, t).has(t)
  }
  Vm.exports = aE
});
var Zm = I((X4, Ym) => {
  var uE = Xi();

  function sE(t, e) {
    var r = uE(this, t),
      n = r.size;
    return r.set(t, e), this.size += r.size == n ? 0 : 1, this
  }
  Ym.exports = sE
});
var Wa = I((Y4, Jm) => {
  var lE = Wm(),
    cE = Hm(),
    fE = Km(),
    pE = Xm(),
    dE = Zm();

  function _n(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }
  _n.prototype.clear = lE;
  _n.prototype.delete = cE;
  _n.prototype.get = fE;
  _n.prototype.has = pE;
  _n.prototype.set = dE;
  Jm.exports = _n
});
var Tl = I((Z4, th) => {
  var Qm = Wa(),
    mE = "Expected a function";

  function Pl(t, e) {
    if (typeof t != "function" || e != null && typeof e != "function") throw new TypeError(mE);
    var r = function() {
      var n = arguments,
        i = e ? e.apply(this, n) : n[0],
        o = r.cache;
      if (o.has(i)) return o.get(i);
      var a = t.apply(this, n);
      return r.cache = o.set(i, a) || o, a
    };
    return r.cache = new(Pl.Cache || Qm), r
  }
  Pl.Cache = Qm;
  th.exports = Pl
});
var rh = I((J4, eh) => {
  var hE = Tl(),
    yE = 500;

  function vE(t) {
    var e = hE(t, function(n) {
        return r.size === yE && r.clear(), n
      }),
      r = e.cache;
    return e
  }
  eh.exports = vE
});
var ih = I((Q4, nh) => {
  var gE = rh(),
    bE = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    xE = /\\(\\)?/g,
    wE = gE(function(t) {
      var e = [];
      return t.charCodeAt(0) === 46 && e.push(""), t.replace(bE, function(r, n, i, o) {
        e.push(i ? o.replace(xE, "$1") : n || r)
      }), e
    });
  nh.exports = wE
});
var za = I((t9, oh) => {
  function OE(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length, i = Array(n); ++r < n;) i[r] = e(t[r], r, t);
    return i
  }
  oh.exports = OE
});
var fh = I((e9, ch) => {
  var ah = On(),
    SE = za(),
    AE = ae(),
    _E = Wr(),
    PE = 1 / 0,
    uh = ah ? ah.prototype : void 0,
    sh = uh ? uh.toString : void 0;

  function lh(t) {
    if (typeof t == "string") return t;
    if (AE(t)) return SE(t, lh) + "";
    if (_E(t)) return sh ? sh.call(t) : "";
    var e = t + "";
    return e == "0" && 1 / t == -PE ? "-0" : e
  }
  ch.exports = lh
});
var El = I((r9, ph) => {
  var TE = fh();

  function EE(t) {
    return t == null ? "" : TE(t)
  }
  ph.exports = EE
});
var jl = I((n9, dh) => {
  var jE = ae(),
    ME = La(),
    CE = ih(),
    IE = El();

  function kE(t, e) {
    return jE(t) ? t : ME(t, e) ? [t] : CE(IE(t))
  }
  dh.exports = kE
});
var Yi = I((i9, mh) => {
  var DE = Wr(),
    NE = 1 / 0;

  function RE(t) {
    if (typeof t == "string" || DE(t)) return t;
    var e = t + "";
    return e == "0" && 1 / t == -NE ? "-0" : e
  }
  mh.exports = RE
});
var Fa = I((o9, hh) => {
  var LE = jl(),
    BE = Yi();

  function qE(t, e) {
    e = LE(e, t);
    for (var r = 0, n = e.length; t != null && r < n;) t = t[BE(e[r++])];
    return r && r == n ? t : void 0
  }
  hh.exports = qE
});
var zr = I((a9, yh) => {
  var WE = Fa();

  function zE(t, e, r) {
    var n = t == null ? void 0 : WE(t, e);
    return n === void 0 ? r : n
  }
  yh.exports = zE
});
var Te = I((u9, vh) => {
  function FE(t) {
    return t == null
  }
  vh.exports = FE
});
var $a = I((s9, gh) => {
  var $E = Ze(),
    UE = ae(),
    HE = Je(),
    GE = "[object String]";

  function KE(t) {
    return typeof t == "string" || !UE(t) && HE(t) && $E(t) == GE
  }
  gh.exports = KE
});
var xh = I(Pt => {
  "use strict";
  var Ml = Symbol.for("react.element"),
    Cl = Symbol.for("react.portal"),
    Ua = Symbol.for("react.fragment"),
    Ha = Symbol.for("react.strict_mode"),
    Ga = Symbol.for("react.profiler"),
    Ka = Symbol.for("react.provider"),
    Va = Symbol.for("react.context"),
    VE = Symbol.for("react.server_context"),
    Xa = Symbol.for("react.forward_ref"),
    Ya = Symbol.for("react.suspense"),
    Za = Symbol.for("react.suspense_list"),
    Ja = Symbol.for("react.memo"),
    Qa = Symbol.for("react.lazy"),
    XE = Symbol.for("react.offscreen"),
    bh;
  bh = Symbol.for("react.module.reference");

  function Ee(t) {
    if (typeof t == "object" && t !== null) {
      var e = t.$$typeof;
      switch (e) {
        case Ml:
          switch (t = t.type, t) {
            case Ua:
            case Ga:
            case Ha:
            case Ya:
            case Za:
              return t;
            default:
              switch (t = t && t.$$typeof, t) {
                case VE:
                case Va:
                case Xa:
                case Qa:
                case Ja:
                case Ka:
                  return t;
                default:
                  return e
              }
          }
        case Cl:
          return e
      }
    }
  }
  Pt.ContextConsumer = Va;
  Pt.ContextProvider = Ka;
  Pt.Element = Ml;
  Pt.ForwardRef = Xa;
  Pt.Fragment = Ua;
  Pt.Lazy = Qa;
  Pt.Memo = Ja;
  Pt.Portal = Cl;
  Pt.Profiler = Ga;
  Pt.StrictMode = Ha;
  Pt.Suspense = Ya;
  Pt.SuspenseList = Za;
  Pt.isAsyncMode = function() {
    return !1
  };
  Pt.isConcurrentMode = function() {
    return !1
  };
  Pt.isContextConsumer = function(t) {
    return Ee(t) === Va
  };
  Pt.isContextProvider = function(t) {
    return Ee(t) === Ka
  };
  Pt.isElement = function(t) {
    return typeof t == "object" && t !== null && t.$$typeof === Ml
  };
  Pt.isForwardRef = function(t) {
    return Ee(t) === Xa
  };
  Pt.isFragment = function(t) {
    return Ee(t) === Ua
  };
  Pt.isLazy = function(t) {
    return Ee(t) === Qa
  };
  Pt.isMemo = function(t) {
    return Ee(t) === Ja
  };
  Pt.isPortal = function(t) {
    return Ee(t) === Cl
  };
  Pt.isProfiler = function(t) {
    return Ee(t) === Ga
  };
  Pt.isStrictMode = function(t) {
    return Ee(t) === Ha
  };
  Pt.isSuspense = function(t) {
    return Ee(t) === Ya
  };
  Pt.isSuspenseList = function(t) {
    return Ee(t) === Za
  };
  Pt.isValidElementType = function(t) {
    return typeof t == "string" || typeof t == "function" || t === Ua || t === Ga || t === Ha || t === Ya || t === Za || t === XE || typeof t == "object" && t !== null && (t.$$typeof === Qa || t.$$typeof === Ja || t.$$typeof === Ka || t.$$typeof === Va || t.$$typeof === Xa || t.$$typeof === bh || t.getModuleId !== void 0)
  };
  Pt.typeOf = Ee
});
var Oh = I((c9, wh) => {
  "use strict";
  wh.exports = xh()
});
var Il = I((f9, Sh) => {
  var YE = Ze(),
    ZE = Je(),
    JE = "[object Number]";

  function QE(t) {
    return typeof t == "number" || ZE(t) && YE(t) == JE
  }
  Sh.exports = QE
});
var kl = I((p9, Ah) => {
  var tj = Il();

  function ej(t) {
    return tj(t) && t != +t
  }
  Ah.exports = ej
});
var Gh = I((C9, Hh) => {
  function xj(t, e, r) {
    var n = -1,
      i = t.length;
    e < 0 && (e = -e > i ? 0 : i + e), r = r > i ? i : r, r < 0 && (r += i), i = e > r ? 0 : r - e >>> 0, e >>>= 0;
    for (var o = Array(i); ++n < i;) o[n] = t[n + e];
    return o
  }
  Hh.exports = xj
});
var Vh = I((I9, Kh) => {
  var wj = Gh();

  function Oj(t, e, r) {
    var n = t.length;
    return r = r === void 0 ? n : r, !e && r >= n ? t : wj(t, e, r)
  }
  Kh.exports = Oj
});
var Kl = I((k9, Xh) => {
  var Sj = "\\ud800-\\udfff",
    Aj = "\\u0300-\\u036f",
    _j = "\\ufe20-\\ufe2f",
    Pj = "\\u20d0-\\u20ff",
    Tj = Aj + _j + Pj,
    Ej = "\\ufe0e\\ufe0f",
    jj = "\\u200d",
    Mj = RegExp("[" + jj + Sj + Tj + Ej + "]");

  function Cj(t) {
    return Mj.test(t)
  }
  Xh.exports = Cj
});
var Zh = I((D9, Yh) => {
  function Ij(t) {
    return t.split("")
  }
  Yh.exports = Ij
});
var oy = I((N9, iy) => {
  var Jh = "\\ud800-\\udfff",
    kj = "\\u0300-\\u036f",
    Dj = "\\ufe20-\\ufe2f",
    Nj = "\\u20d0-\\u20ff",
    Rj = kj + Dj + Nj,
    Lj = "\\ufe0e\\ufe0f",
    Bj = "[" + Jh + "]",
    Vl = "[" + Rj + "]",
    Xl = "\\ud83c[\\udffb-\\udfff]",
    qj = "(?:" + Vl + "|" + Xl + ")",
    Qh = "[^" + Jh + "]",
    ty = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    ey = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    Wj = "\\u200d",
    ry = qj + "?",
    ny = "[" + Lj + "]?",
    zj = "(?:" + Wj + "(?:" + [Qh, ty, ey].join("|") + ")" + ny + ry + ")*",
    Fj = ny + ry + zj,
    $j = "(?:" + [Qh + Vl + "?", Vl, ty, ey, Bj].join("|") + ")",
    Uj = RegExp(Xl + "(?=" + Xl + ")|" + $j + Fj, "g");

  function Hj(t) {
    return t.match(Uj) || []
  }
  iy.exports = Hj
});
var uy = I((R9, ay) => {
  var Gj = Zh(),
    Kj = Kl(),
    Vj = oy();

  function Xj(t) {
    return Kj(t) ? Vj(t) : Gj(t)
  }
  ay.exports = Xj
});
var ly = I((L9, sy) => {
  var Yj = Vh(),
    Zj = Kl(),
    Jj = uy(),
    Qj = El();

  function tM(t) {
    return function(e) {
      e = Qj(e);
      var r = Zj(e) ? Jj(e) : void 0,
        n = r ? r[0] : e.charAt(0),
        i = r ? Yj(r, 1).join("") : e.slice(1);
      return n[t]() + i
    }
  }
  sy.exports = tM
});
var nu = I((B9, cy) => {
  var eM = ly(),
    rM = eM("toUpperCase");
  cy.exports = rM
});
var Ny = I((FG, Dy) => {
  var kM = Vi();

  function DM() {
    this.__data__ = new kM, this.size = 0
  }
  Dy.exports = DM
});
var Ly = I(($G, Ry) => {
  function NM(t) {
    var e = this.__data__,
      r = e.delete(t);
    return this.size = e.size, r
  }
  Ry.exports = NM
});
var qy = I((UG, By) => {
  function RM(t) {
    return this.__data__.get(t)
  }
  By.exports = RM
});
var zy = I((HG, Wy) => {
  function LM(t) {
    return this.__data__.has(t)
  }
  Wy.exports = LM
});
var $y = I((GG, Fy) => {
  var BM = Vi(),
    qM = qa(),
    WM = Wa(),
    zM = 200;

  function FM(t, e) {
    var r = this.__data__;
    if (r instanceof BM) {
      var n = r.__data__;
      if (!qM || n.length < zM - 1) return n.push([t, e]), this.size = ++r.size, this;
      r = this.__data__ = new WM(n)
    }
    return r.set(t, e), this.size = r.size, this
  }
  Fy.exports = FM
});
var jc = I((KG, Uy) => {
  var $M = Vi(),
    UM = Ny(),
    HM = Ly(),
    GM = qy(),
    KM = zy(),
    VM = $y();

  function Bn(t) {
    var e = this.__data__ = new $M(t);
    this.size = e.size
  }
  Bn.prototype.clear = UM;
  Bn.prototype.delete = HM;
  Bn.prototype.get = GM;
  Bn.prototype.has = KM;
  Bn.prototype.set = VM;
  Uy.exports = Bn
});
var Gy = I((VG, Hy) => {
  var XM = "__lodash_hash_undefined__";

  function YM(t) {
    return this.__data__.set(t, XM), this
  }
  Hy.exports = YM
});
var Vy = I((XG, Ky) => {
  function ZM(t) {
    return this.__data__.has(t)
  }
  Ky.exports = ZM
});
var Mc = I((YG, Xy) => {
  var JM = Wa(),
    QM = Gy(),
    tC = Vy();

  function pu(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.__data__ = new JM; ++e < r;) this.add(t[e])
  }
  pu.prototype.add = pu.prototype.push = QM;
  pu.prototype.has = tC;
  Xy.exports = pu
});
var Cc = I((ZG, Yy) => {
  function eC(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length; ++r < n;)
      if (e(t[r], r, t)) return !0;
    return !1
  }
  Yy.exports = eC
});
var Ic = I((JG, Zy) => {
  function rC(t, e) {
    return t.has(e)
  }
  Zy.exports = rC
});
var kc = I((QG, Jy) => {
  var nC = Mc(),
    iC = Cc(),
    oC = Ic(),
    aC = 1,
    uC = 2;

  function sC(t, e, r, n, i, o) {
    var a = r & aC,
      u = t.length,
      s = e.length;
    if (u != s && !(a && s > u)) return !1;
    var l = o.get(t),
      f = o.get(e);
    if (l && f) return l == e && f == t;
    var c = -1,
      p = !0,
      d = r & uC ? new nC : void 0;
    for (o.set(t, e), o.set(e, t); ++c < u;) {
      var y = t[c],
        m = e[c];
      if (n) var v = a ? n(m, y, c, e, t, o) : n(y, m, c, t, e, o);
      if (v !== void 0) {
        if (v) continue;
        p = !1;
        break
      }
      if (d) {
        if (!iC(e, function(x, w) {
            if (!oC(d, w) && (y === x || i(y, x, r, n, o))) return d.push(w)
          })) {
          p = !1;
          break
        }
      } else if (!(y === m || i(y, m, r, n, o))) {
        p = !1;
        break
      }
    }
    return o.delete(t), o.delete(e), p
  }
  Jy.exports = sC
});
var tv = I((t7, Qy) => {
  var lC = We(),
    cC = lC.Uint8Array;
  Qy.exports = cC
});
var rv = I((e7, ev) => {
  function fC(t) {
    var e = -1,
      r = Array(t.size);
    return t.forEach(function(n, i) {
      r[++e] = [i, n]
    }), r
  }
  ev.exports = fC
});
var du = I((r7, nv) => {
  function pC(t) {
    var e = -1,
      r = Array(t.size);
    return t.forEach(function(n) {
      r[++e] = n
    }), r
  }
  nv.exports = pC
});
var sv = I((n7, uv) => {
  var iv = On(),
    ov = tv(),
    dC = Ba(),
    mC = kc(),
    hC = rv(),
    yC = du(),
    vC = 1,
    gC = 2,
    bC = "[object Boolean]",
    xC = "[object Date]",
    wC = "[object Error]",
    OC = "[object Map]",
    SC = "[object Number]",
    AC = "[object RegExp]",
    _C = "[object Set]",
    PC = "[object String]",
    TC = "[object Symbol]",
    EC = "[object ArrayBuffer]",
    jC = "[object DataView]",
    av = iv ? iv.prototype : void 0,
    Dc = av ? av.valueOf : void 0;

  function MC(t, e, r, n, i, o, a) {
    switch (r) {
      case jC:
        if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
        t = t.buffer, e = e.buffer;
      case EC:
        return !(t.byteLength != e.byteLength || !o(new ov(t), new ov(e)));
      case bC:
      case xC:
      case SC:
        return dC(+t, +e);
      case wC:
        return t.name == e.name && t.message == e.message;
      case AC:
      case PC:
        return t == e + "";
      case OC:
        var u = hC;
      case _C:
        var s = n & vC;
        if (u || (u = yC), t.size != e.size && !s) return !1;
        var l = a.get(t);
        if (l) return l == e;
        n |= gC, a.set(t, e);
        var f = mC(u(t), u(e), n, i, o, a);
        return a.delete(t), f;
      case TC:
        if (Dc) return Dc.call(t) == Dc.call(e)
    }
    return !1
  }
  uv.exports = MC
});
var Nc = I((i7, lv) => {
  function CC(t, e) {
    for (var r = -1, n = e.length, i = t.length; ++r < n;) t[i + r] = e[r];
    return t
  }
  lv.exports = CC
});
var fv = I((o7, cv) => {
  var IC = Nc(),
    kC = ae();

  function DC(t, e, r) {
    var n = e(t);
    return kC(t) ? n : IC(n, r(t))
  }
  cv.exports = DC
});
var dv = I((a7, pv) => {
  function NC(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length, i = 0, o = []; ++r < n;) {
      var a = t[r];
      e(a, r, t) && (o[i++] = a)
    }
    return o
  }
  pv.exports = NC
});
var hv = I((u7, mv) => {
  function RC() {
    return []
  }
  mv.exports = RC
});
var gv = I((s7, vv) => {
  var LC = dv(),
    BC = hv(),
    qC = Object.prototype,
    WC = qC.propertyIsEnumerable,
    yv = Object.getOwnPropertySymbols,
    zC = yv ? function(t) {
      return t == null ? [] : (t = Object(t), LC(yv(t), function(e) {
        return WC.call(t, e)
      }))
    } : BC;
  vv.exports = zC
});
var xv = I((l7, bv) => {
  function FC(t, e) {
    for (var r = -1, n = Array(t); ++r < t;) n[r] = e(r);
    return n
  }
  bv.exports = FC
});
var Ov = I((c7, wv) => {
  var $C = Ze(),
    UC = Je(),
    HC = "[object Arguments]";

  function GC(t) {
    return UC(t) && $C(t) == HC
  }
  wv.exports = GC
});
var mu = I((f7, _v) => {
  var Sv = Ov(),
    KC = Je(),
    Av = Object.prototype,
    VC = Av.hasOwnProperty,
    XC = Av.propertyIsEnumerable,
    YC = Sv(function() {
      return arguments
    }()) ? Sv : function(t) {
      return KC(t) && VC.call(t, "callee") && !XC.call(t, "callee")
    };
  _v.exports = YC
});
var Tv = I((p7, Pv) => {
  function ZC() {
    return !1
  }
  Pv.exports = ZC
});
var Rc = I((no, qn) => {
  var JC = We(),
    QC = Tv(),
    Mv = typeof no == "object" && no && !no.nodeType && no,
    Ev = Mv && typeof qn == "object" && qn && !qn.nodeType && qn,
    tI = Ev && Ev.exports === Mv,
    jv = tI ? JC.Buffer : void 0,
    eI = jv ? jv.isBuffer : void 0,
    rI = eI || QC;
  qn.exports = rI
});
var hu = I((d7, Cv) => {
  var nI = 9007199254740991,
    iI = /^(?:0|[1-9]\d*)$/;

  function oI(t, e) {
    var r = typeof t;
    return e = e ?? nI, !!e && (r == "number" || r != "symbol" && iI.test(t)) && t > -1 && t % 1 == 0 && t < e
  }
  Cv.exports = oI
});
var yu = I((m7, Iv) => {
  var aI = 9007199254740991;

  function uI(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= aI
  }
  Iv.exports = uI
});
var Dv = I((h7, kv) => {
  var sI = Ze(),
    lI = yu(),
    cI = Je(),
    fI = "[object Arguments]",
    pI = "[object Array]",
    dI = "[object Boolean]",
    mI = "[object Date]",
    hI = "[object Error]",
    yI = "[object Function]",
    vI = "[object Map]",
    gI = "[object Number]",
    bI = "[object Object]",
    xI = "[object RegExp]",
    wI = "[object Set]",
    OI = "[object String]",
    SI = "[object WeakMap]",
    AI = "[object ArrayBuffer]",
    _I = "[object DataView]",
    PI = "[object Float32Array]",
    TI = "[object Float64Array]",
    EI = "[object Int8Array]",
    jI = "[object Int16Array]",
    MI = "[object Int32Array]",
    CI = "[object Uint8Array]",
    II = "[object Uint8ClampedArray]",
    kI = "[object Uint16Array]",
    DI = "[object Uint32Array]",
    It = {};
  It[PI] = It[TI] = It[EI] = It[jI] = It[MI] = It[CI] = It[II] = It[kI] = It[DI] = !0;
  It[fI] = It[pI] = It[AI] = It[dI] = It[_I] = It[mI] = It[hI] = It[yI] = It[vI] = It[gI] = It[bI] = It[xI] = It[wI] = It[OI] = It[SI] = !1;

  function NI(t) {
    return cI(t) && lI(t.length) && !!It[sI(t)]
  }
  kv.exports = NI
});
var Lc = I((y7, Nv) => {
  function RI(t) {
    return function(e) {
      return t(e)
    }
  }
  Nv.exports = RI
});
var Lv = I((io, Wn) => {
  var LI = Sl(),
    Rv = typeof io == "object" && io && !io.nodeType && io,
    oo = Rv && typeof Wn == "object" && Wn && !Wn.nodeType && Wn,
    BI = oo && oo.exports === Rv,
    Bc = BI && LI.process,
    qI = function() {
      try {
        var t = oo && oo.require && oo.require("util").types;
        return t || Bc && Bc.binding && Bc.binding("util")
      } catch {}
    }();
  Wn.exports = qI
});
var qc = I((v7, Wv) => {
  var WI = Dv(),
    zI = Lc(),
    Bv = Lv(),
    qv = Bv && Bv.isTypedArray,
    FI = qv ? zI(qv) : WI;
  Wv.exports = FI
});
var Fv = I((g7, zv) => {
  var $I = xv(),
    UI = mu(),
    HI = ae(),
    GI = Rc(),
    KI = hu(),
    VI = qc(),
    XI = Object.prototype,
    YI = XI.hasOwnProperty;

  function ZI(t, e) {
    var r = HI(t),
      n = !r && UI(t),
      i = !r && !n && GI(t),
      o = !r && !n && !i && VI(t),
      a = r || n || i || o,
      u = a ? $I(t.length, String) : [],
      s = u.length;
    for (var l in t)(e || YI.call(t, l)) && !(a && (l == "length" || i && (l == "offset" || l == "parent") || o && (l == "buffer" || l == "byteLength" || l == "byteOffset") || KI(l, s))) && u.push(l);
    return u
  }
  zv.exports = ZI
});
var Uv = I((b7, $v) => {
  var JI = Object.prototype;

  function QI(t) {
    var e = t && t.constructor,
      r = typeof e == "function" && e.prototype || JI;
    return t === r
  }
  $v.exports = QI
});
var Wc = I((x7, Hv) => {
  function t2(t, e) {
    return function(r) {
      return t(e(r))
    }
  }
  Hv.exports = t2
});
var Kv = I((w7, Gv) => {
  var e2 = Wc(),
    r2 = e2(Object.keys, Object);
  Gv.exports = r2
});
var Xv = I((O7, Vv) => {
  var n2 = Uv(),
    i2 = Kv(),
    o2 = Object.prototype,
    a2 = o2.hasOwnProperty;

  function u2(t) {
    if (!n2(t)) return i2(t);
    var e = [];
    for (var r in Object(t)) a2.call(t, r) && r != "constructor" && e.push(r);
    return e
  }
  Vv.exports = u2
});
var zn = I((S7, Yv) => {
  var s2 = Lt(),
    l2 = yu();

  function c2(t) {
    return t != null && l2(t.length) && !s2(t)
  }
  Yv.exports = c2
});
var ao = I((A7, Zv) => {
  var f2 = Fv(),
    p2 = Xv(),
    d2 = zn();

  function m2(t) {
    return d2(t) ? f2(t) : p2(t)
  }
  Zv.exports = m2
});
var Qv = I((_7, Jv) => {
  var h2 = fv(),
    y2 = gv(),
    v2 = ao();

  function g2(t) {
    return h2(t, v2, y2)
  }
  Jv.exports = g2
});
var rg = I((P7, eg) => {
  var tg = Qv(),
    b2 = 1,
    x2 = Object.prototype,
    w2 = x2.hasOwnProperty;

  function O2(t, e, r, n, i, o) {
    var a = r & b2,
      u = tg(t),
      s = u.length,
      l = tg(e),
      f = l.length;
    if (s != f && !a) return !1;
    for (var c = s; c--;) {
      var p = u[c];
      if (!(a ? p in e : w2.call(e, p))) return !1
    }
    var d = o.get(t),
      y = o.get(e);
    if (d && y) return d == e && y == t;
    var m = !0;
    o.set(t, e), o.set(e, t);
    for (var v = a; ++c < s;) {
      p = u[c];
      var x = t[p],
        w = e[p];
      if (n) var S = a ? n(w, x, p, e, t, o) : n(x, w, p, t, e, o);
      if (!(S === void 0 ? x === w || i(x, w, r, n, o) : S)) {
        m = !1;
        break
      }
      v || (v = p == "constructor")
    }
    if (m && !v) {
      var P = t.constructor,
        h = e.constructor;
      P != h && "constructor" in t && "constructor" in e && !(typeof P == "function" && P instanceof P && typeof h == "function" && h instanceof h) && (m = !1)
    }
    return o.delete(t), o.delete(e), m
  }
  eg.exports = O2
});
var ig = I((T7, ng) => {
  var S2 = Ar(),
    A2 = We(),
    _2 = S2(A2, "DataView");
  ng.exports = _2
});
var ag = I((E7, og) => {
  var P2 = Ar(),
    T2 = We(),
    E2 = P2(T2, "Promise");
  og.exports = E2
});
var zc = I((j7, ug) => {
  var j2 = Ar(),
    M2 = We(),
    C2 = j2(M2, "Set");
  ug.exports = C2
});
var lg = I((M7, sg) => {
  var I2 = Ar(),
    k2 = We(),
    D2 = I2(k2, "WeakMap");
  sg.exports = D2
});
var vg = I((C7, yg) => {
  var Fc = ig(),
    $c = qa(),
    Uc = ag(),
    Hc = zc(),
    Gc = lg(),
    hg = Ze(),
    Fn = _l(),
    cg = "[object Map]",
    N2 = "[object Object]",
    fg = "[object Promise]",
    pg = "[object Set]",
    dg = "[object WeakMap]",
    mg = "[object DataView]",
    R2 = Fn(Fc),
    L2 = Fn($c),
    B2 = Fn(Uc),
    q2 = Fn(Hc),
    W2 = Fn(Gc),
    Kr = hg;
  (Fc && Kr(new Fc(new ArrayBuffer(1))) != mg || $c && Kr(new $c) != cg || Uc && Kr(Uc.resolve()) != fg || Hc && Kr(new Hc) != pg || Gc && Kr(new Gc) != dg) && (Kr = function(t) {
    var e = hg(t),
      r = e == N2 ? t.constructor : void 0,
      n = r ? Fn(r) : "";
    if (n) switch (n) {
      case R2:
        return mg;
      case L2:
        return cg;
      case B2:
        return fg;
      case q2:
        return pg;
      case W2:
        return dg
    }
    return e
  });
  yg.exports = Kr
});
var _g = I((I7, Ag) => {
  var Kc = jc(),
    z2 = kc(),
    F2 = sv(),
    $2 = rg(),
    gg = vg(),
    bg = ae(),
    xg = Rc(),
    U2 = qc(),
    H2 = 1,
    wg = "[object Arguments]",
    Og = "[object Array]",
    vu = "[object Object]",
    G2 = Object.prototype,
    Sg = G2.hasOwnProperty;

  function K2(t, e, r, n, i, o) {
    var a = bg(t),
      u = bg(e),
      s = a ? Og : gg(t),
      l = u ? Og : gg(e);
    s = s == wg ? vu : s, l = l == wg ? vu : l;
    var f = s == vu,
      c = l == vu,
      p = s == l;
    if (p && xg(t)) {
      if (!xg(e)) return !1;
      a = !0, f = !1
    }
    if (p && !f) return o || (o = new Kc), a || U2(t) ? z2(t, e, r, n, i, o) : F2(t, e, s, r, n, i, o);
    if (!(r & H2)) {
      var d = f && Sg.call(t, "__wrapped__"),
        y = c && Sg.call(e, "__wrapped__");
      if (d || y) {
        var m = d ? t.value() : t,
          v = y ? e.value() : e;
        return o || (o = new Kc), i(m, v, r, n, o)
      }
    }
    return p ? (o || (o = new Kc), $2(t, e, r, n, i, o)) : !1
  }
  Ag.exports = K2
});
var gu = I((k7, Eg) => {
  var V2 = _g(),
    Pg = Je();

  function Tg(t, e, r, n, i) {
    return t === e ? !0 : t == null || e == null || !Pg(t) && !Pg(e) ? t !== t && e !== e : V2(t, e, r, n, Tg, i)
  }
  Eg.exports = Tg
});
var Mg = I((D7, jg) => {
  var X2 = jc(),
    Y2 = gu(),
    Z2 = 1,
    J2 = 2;

  function Q2(t, e, r, n) {
    var i = r.length,
      o = i,
      a = !n;
    if (t == null) return !o;
    for (t = Object(t); i--;) {
      var u = r[i];
      if (a && u[2] ? u[1] !== t[u[0]] : !(u[0] in t)) return !1
    }
    for (; ++i < o;) {
      u = r[i];
      var s = u[0],
        l = t[s],
        f = u[1];
      if (a && u[2]) {
        if (l === void 0 && !(s in t)) return !1
      } else {
        var c = new X2;
        if (n) var p = n(l, f, s, t, e, c);
        if (!(p === void 0 ? Y2(f, l, Z2 | J2, n, c) : p)) return !1
      }
    }
    return !0
  }
  jg.exports = Q2
});
var Vc = I((N7, Cg) => {
  var tk = Pe();

  function ek(t) {
    return t === t && !tk(t)
  }
  Cg.exports = ek
});
var kg = I((R7, Ig) => {
  var rk = Vc(),
    nk = ao();

  function ik(t) {
    for (var e = nk(t), r = e.length; r--;) {
      var n = e[r],
        i = t[n];
      e[r] = [n, i, rk(i)]
    }
    return e
  }
  Ig.exports = ik
});
var Xc = I((L7, Dg) => {
  function ok(t, e) {
    return function(r) {
      return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r))
    }
  }
  Dg.exports = ok
});
var Rg = I((B7, Ng) => {
  var ak = Mg(),
    uk = kg(),
    sk = Xc();

  function lk(t) {
    var e = uk(t);
    return e.length == 1 && e[0][2] ? sk(e[0][0], e[0][1]) : function(r) {
      return r === t || ak(r, t, e)
    }
  }
  Ng.exports = lk
});
var Bg = I((q7, Lg) => {
  function ck(t, e) {
    return t != null && e in Object(t)
  }
  Lg.exports = ck
});
var Wg = I((W7, qg) => {
  var fk = jl(),
    pk = mu(),
    dk = ae(),
    mk = hu(),
    hk = yu(),
    yk = Yi();

  function vk(t, e, r) {
    e = fk(e, t);
    for (var n = -1, i = e.length, o = !1; ++n < i;) {
      var a = yk(e[n]);
      if (!(o = t != null && r(t, a))) break;
      t = t[a]
    }
    return o || ++n != i ? o : (i = t == null ? 0 : t.length, !!i && hk(i) && mk(a, i) && (dk(t) || pk(t)))
  }
  qg.exports = vk
});
var Fg = I((z7, zg) => {
  var gk = Bg(),
    bk = Wg();

  function xk(t, e) {
    return t != null && bk(t, e, gk)
  }
  zg.exports = xk
});
var Ug = I((F7, $g) => {
  var wk = gu(),
    Ok = zr(),
    Sk = Fg(),
    Ak = La(),
    _k = Vc(),
    Pk = Xc(),
    Tk = Yi(),
    Ek = 1,
    jk = 2;

  function Mk(t, e) {
    return Ak(t) && _k(e) ? Pk(Tk(t), e) : function(r) {
      var n = Ok(r, t);
      return n === void 0 && n === e ? Sk(r, t) : wk(e, n, Ek | jk)
    }
  }
  $g.exports = Mk
});
var Vr = I(($7, Hg) => {
  function Ck(t) {
    return t
  }
  Hg.exports = Ck
});
var Kg = I((U7, Gg) => {
  function Ik(t) {
    return function(e) {
      return e?.[t]
    }
  }
  Gg.exports = Ik
});
var Xg = I((H7, Vg) => {
  var kk = Fa();

  function Dk(t) {
    return function(e) {
      return kk(e, t)
    }
  }
  Vg.exports = Dk
});
var Zg = I((G7, Yg) => {
  var Nk = Kg(),
    Rk = Xg(),
    Lk = La(),
    Bk = Yi();

  function qk(t) {
    return Lk(t) ? Nk(Bk(t)) : Rk(t)
  }
  Yg.exports = qk
});
var mr = I((K7, Jg) => {
  var Wk = Rg(),
    zk = Ug(),
    Fk = Vr(),
    $k = ae(),
    Uk = Zg();

  function Hk(t) {
    return typeof t == "function" ? t : t == null ? Fk : typeof t == "object" ? $k(t) ? zk(t[0], t[1]) : Wk(t) : Uk(t)
  }
  Jg.exports = Hk
});
var Yc = I((V7, Qg) => {
  function Gk(t, e, r, n) {
    for (var i = t.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
      if (e(t[o], o, t)) return o;
    return -1
  }
  Qg.exports = Gk
});
var eb = I((X7, tb) => {
  function Kk(t) {
    return t !== t
  }
  tb.exports = Kk
});
var nb = I((Y7, rb) => {
  function Vk(t, e, r) {
    for (var n = r - 1, i = t.length; ++n < i;)
      if (t[n] === e) return n;
    return -1
  }
  rb.exports = Vk
});
var ob = I((Z7, ib) => {
  var Xk = Yc(),
    Yk = eb(),
    Zk = nb();

  function Jk(t, e, r) {
    return e === e ? Zk(t, e, r) : Xk(t, Yk, r)
  }
  ib.exports = Jk
});
var ub = I((J7, ab) => {
  var Qk = ob();

  function tD(t, e) {
    var r = t == null ? 0 : t.length;
    return !!r && Qk(t, e, 0) > -1
  }
  ab.exports = tD
});
var lb = I((Q7, sb) => {
  function eD(t, e, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i;)
      if (r(e, t[n])) return !0;
    return !1
  }
  sb.exports = eD
});
var fb = I((tK, cb) => {
  function rD() {}
  cb.exports = rD
});
var db = I((eK, pb) => {
  var Zc = zc(),
    nD = fb(),
    iD = du(),
    oD = 1 / 0,
    aD = Zc && 1 / iD(new Zc([, -0]))[1] == oD ? function(t) {
      return new Zc(t)
    } : nD;
  pb.exports = aD
});
var hb = I((rK, mb) => {
  var uD = Mc(),
    sD = ub(),
    lD = lb(),
    cD = Ic(),
    fD = db(),
    pD = du(),
    dD = 200;

  function mD(t, e, r) {
    var n = -1,
      i = sD,
      o = t.length,
      a = !0,
      u = [],
      s = u;
    if (r) a = !1, i = lD;
    else if (o >= dD) {
      var l = e ? null : fD(t);
      if (l) return pD(l);
      a = !1, i = cD, s = new uD
    } else s = e ? [] : u;
    t: for (; ++n < o;) {
      var f = t[n],
        c = e ? e(f) : f;
      if (f = r || f !== 0 ? f : 0, a && c === c) {
        for (var p = s.length; p--;)
          if (s[p] === c) continue t;
        e && s.push(c), u.push(f)
      } else i(s, c, r) || (s !== u && s.push(c), u.push(f))
    }
    return u
  }
  mb.exports = mD
});
var vb = I((nK, yb) => {
  var hD = mr(),
    yD = hb();

  function vD(t, e) {
    return t && t.length ? yD(t, hD(e, 2)) : []
  }
  yb.exports = vD
});
var Tb = I((cK, Pb) => {
  var Ab = On(),
    CD = mu(),
    ID = ae(),
    _b = Ab ? Ab.isConcatSpreadable : void 0;

  function kD(t) {
    return ID(t) || CD(t) || !!(_b && t && t[_b])
  }
  Pb.exports = kD
});
var tf = I((fK, jb) => {
  var DD = Nc(),
    ND = Tb();

  function Eb(t, e, r, n, i) {
    var o = -1,
      a = t.length;
    for (r || (r = ND), i || (i = []); ++o < a;) {
      var u = t[o];
      e > 0 && r(u) ? e > 1 ? Eb(u, e - 1, r, n, i) : DD(i, u) : n || (i[i.length] = u)
    }
    return i
  }
  jb.exports = Eb
});
var Cb = I((pK, Mb) => {
  function RD(t) {
    return function(e, r, n) {
      for (var i = -1, o = Object(e), a = n(e), u = a.length; u--;) {
        var s = a[t ? u : ++i];
        if (r(o[s], s, o) === !1) break
      }
      return e
    }
  }
  Mb.exports = RD
});
var kb = I((dK, Ib) => {
  var LD = Cb(),
    BD = LD();
  Ib.exports = BD
});
var ef = I((mK, Db) => {
  var qD = kb(),
    WD = ao();

  function zD(t, e) {
    return t && qD(t, e, WD)
  }
  Db.exports = zD
});
var Rb = I((hK, Nb) => {
  var FD = zn();

  function $D(t, e) {
    return function(r, n) {
      if (r == null) return r;
      if (!FD(r)) return t(r, n);
      for (var i = r.length, o = e ? i : -1, a = Object(r);
        (e ? o-- : ++o < i) && n(a[o], o, a) !== !1;);
      return r
    }
  }
  Nb.exports = $D
});
var Ou = I((yK, Lb) => {
  var UD = ef(),
    HD = Rb(),
    GD = HD(UD);
  Lb.exports = GD
});
var rf = I((vK, Bb) => {
  var KD = Ou(),
    VD = zn();

  function XD(t, e) {
    var r = -1,
      n = VD(t) ? Array(t.length) : [];
    return KD(t, function(i, o, a) {
      n[++r] = e(i, o, a)
    }), n
  }
  Bb.exports = XD
});
var Wb = I((gK, qb) => {
  function YD(t, e) {
    var r = t.length;
    for (t.sort(e); r--;) t[r] = t[r].value;
    return t
  }
  qb.exports = YD
});
var $b = I((bK, Fb) => {
  var zb = Wr();

  function ZD(t, e) {
    if (t !== e) {
      var r = t !== void 0,
        n = t === null,
        i = t === t,
        o = zb(t),
        a = e !== void 0,
        u = e === null,
        s = e === e,
        l = zb(e);
      if (!u && !l && !o && t > e || o && a && s && !u && !l || n && a && s || !r && s || !i) return 1;
      if (!n && !o && !l && t < e || l && r && i && !n && !o || u && r && i || !a && i || !s) return -1
    }
    return 0
  }
  Fb.exports = ZD
});
var Hb = I((xK, Ub) => {
  var JD = $b();

  function QD(t, e, r) {
    for (var n = -1, i = t.criteria, o = e.criteria, a = i.length, u = r.length; ++n < a;) {
      var s = JD(i[n], o[n]);
      if (s) {
        if (n >= u) return s;
        var l = r[n];
        return s * (l == "desc" ? -1 : 1)
      }
    }
    return t.index - e.index
  }
  Ub.exports = QD
});
var Kb = I((wK, Gb) => {
  var nf = za(),
    tN = Fa(),
    eN = mr(),
    rN = rf(),
    nN = Wb(),
    iN = Lc(),
    oN = Hb(),
    aN = Vr(),
    uN = ae();

  function sN(t, e, r) {
    e.length ? e = nf(e, function(o) {
      return uN(o) ? function(a) {
        return tN(a, o.length === 1 ? o[0] : o)
      } : o
    }) : e = [aN];
    var n = -1;
    e = nf(e, iN(eN));
    var i = rN(t, function(o, a, u) {
      var s = nf(e, function(l) {
        return l(o)
      });
      return {
        criteria: s,
        index: ++n,
        value: o
      }
    });
    return nN(i, function(o, a) {
      return oN(o, a, r)
    })
  }
  Gb.exports = sN
});
var Xb = I((OK, Vb) => {
  function lN(t, e, r) {
    switch (r.length) {
      case 0:
        return t.call(e);
      case 1:
        return t.call(e, r[0]);
      case 2:
        return t.call(e, r[0], r[1]);
      case 3:
        return t.call(e, r[0], r[1], r[2])
    }
    return t.apply(e, r)
  }
  Vb.exports = lN
});
var Jb = I((SK, Zb) => {
  var cN = Xb(),
    Yb = Math.max;

  function fN(t, e, r) {
    return e = Yb(e === void 0 ? t.length - 1 : e, 0),
      function() {
        for (var n = arguments, i = -1, o = Yb(n.length - e, 0), a = Array(o); ++i < o;) a[i] = n[e + i];
        i = -1;
        for (var u = Array(e + 1); ++i < e;) u[i] = n[i];
        return u[e] = r(a), cN(t, this, u)
      }
  }
  Zb.exports = fN
});
var tx = I((AK, Qb) => {
  function pN(t) {
    return function() {
      return t
    }
  }
  Qb.exports = pN
});
var of = I((_K, ex) => {
  var dN = Ar(),
    mN = function() {
      try {
        var t = dN(Object, "defineProperty");
        return t({}, "", {}), t
      } catch {}
    }();
  ex.exports = mN
});
var ix = I((PK, nx) => {
  var hN = tx(),
    rx = of(),
    yN = Vr(),
    vN = rx ? function(t, e) {
      return rx(t, "toString", {
        configurable: !0,
        enumerable: !1,
        value: hN(e),
        writable: !0
      })
    } : yN;
  nx.exports = vN
});
var ax = I((TK, ox) => {
  var gN = 800,
    bN = 16,
    xN = Date.now;

  function wN(t) {
    var e = 0,
      r = 0;
    return function() {
      var n = xN(),
        i = bN - (n - r);
      if (r = n, i > 0) {
        if (++e >= gN) return arguments[0]
      } else e = 0;
      return t.apply(void 0, arguments)
    }
  }
  ox.exports = wN
});
var sx = I((EK, ux) => {
  var ON = ix(),
    SN = ax(),
    AN = SN(ON);
  ux.exports = AN
});
var cx = I((jK, lx) => {
  var _N = Vr(),
    PN = Jb(),
    TN = sx();

  function EN(t, e) {
    return TN(PN(t, e, _N), t + "")
  }
  lx.exports = EN
});
var so = I((MK, fx) => {
  var jN = Ba(),
    MN = zn(),
    CN = hu(),
    IN = Pe();

  function kN(t, e, r) {
    if (!IN(r)) return !1;
    var n = typeof e;
    return (n == "number" ? MN(r) && CN(e, r.length) : n == "string" && e in r) ? jN(r[e], t) : !1
  }
  fx.exports = kN
});
var Su = I((CK, dx) => {
  var DN = tf(),
    NN = Kb(),
    RN = cx(),
    px = so(),
    LN = RN(function(t, e) {
      if (t == null) return [];
      var r = e.length;
      return r > 1 && px(t, e[0], e[1]) ? e = [] : r > 2 && px(e[0], e[1], e[2]) && (e = [e[0]]), NN(t, DN(e, 1), [])
    });
  dx.exports = LN
});
var Dx = I((XK, kx) => {
  var gR = We(),
    bR = function() {
      return gR.Date.now()
    };
  kx.exports = bR
});
var Rx = I((YK, Nx) => {
  var xR = /\s/;

  function wR(t) {
    for (var e = t.length; e-- && xR.test(t.charAt(e)););
    return e
  }
  Nx.exports = wR
});
var Bx = I((ZK, Lx) => {
  var OR = Rx(),
    SR = /^\s+/;

  function AR(t) {
    return t && t.slice(0, OR(t) + 1).replace(SR, "")
  }
  Lx.exports = AR
});
var pf = I((JK, zx) => {
  var _R = Bx(),
    qx = Pe(),
    PR = Wr(),
    Wx = NaN,
    TR = /^[-+]0x[0-9a-f]+$/i,
    ER = /^0b[01]+$/i,
    jR = /^0o[0-7]+$/i,
    MR = parseInt;

  function CR(t) {
    if (typeof t == "number") return t;
    if (PR(t)) return Wx;
    if (qx(t)) {
      var e = typeof t.valueOf == "function" ? t.valueOf() : t;
      t = qx(e) ? e + "" : e
    }
    if (typeof t != "string") return t === 0 ? t : +t;
    t = _R(t);
    var r = ER.test(t);
    return r || jR.test(t) ? MR(t.slice(2), r ? 2 : 8) : TR.test(t) ? Wx : +t
  }
  zx.exports = CR
});
var Ux = I((QK, $x) => {
  var IR = Pe(),
    df = Dx(),
    Fx = pf(),
    kR = "Expected a function",
    DR = Math.max,
    NR = Math.min;

  function RR(t, e, r) {
    var n, i, o, a, u, s, l = 0,
      f = !1,
      c = !1,
      p = !0;
    if (typeof t != "function") throw new TypeError(kR);
    e = Fx(e) || 0, IR(r) && (f = !!r.leading, c = "maxWait" in r, o = c ? DR(Fx(r.maxWait) || 0, e) : o, p = "trailing" in r ? !!r.trailing : p);

    function d(g) {
      var _ = n,
        C = i;
      return n = i = void 0, l = g, a = t.apply(C, _), a
    }

    function y(g) {
      return l = g, u = setTimeout(x, e), f ? d(g) : a
    }

    function m(g) {
      var _ = g - s,
        C = g - l,
        k = e - _;
      return c ? NR(k, o - C) : k
    }

    function v(g) {
      var _ = g - s,
        C = g - l;
      return s === void 0 || _ >= e || _ < 0 || c && C >= o
    }

    function x() {
      var g = df();
      if (v(g)) return w(g);
      u = setTimeout(x, m(g))
    }

    function w(g) {
      return u = void 0, p && n ? d(g) : (n = i = void 0, a)
    }

    function S() {
      u !== void 0 && clearTimeout(u), l = 0, n = s = i = u = void 0
    }

    function P() {
      return u === void 0 ? a : w(df())
    }

    function h() {
      var g = df(),
        _ = v(g);
      if (n = arguments, i = this, s = g, _) {
        if (u === void 0) return y(s);
        if (c) return clearTimeout(u), u = setTimeout(x, e), d(s)
      }
      return u === void 0 && (u = setTimeout(x, e)), a
    }
    return h.cancel = S, h.flush = P, h
  }
  $x.exports = RR
});
var mf = I((tV, Hx) => {
  var LR = Ux(),
    BR = Pe(),
    qR = "Expected a function";

  function WR(t, e, r) {
    var n = !0,
      i = !0;
    if (typeof t != "function") throw new TypeError(qR);
    return BR(r) && (n = "leading" in r ? !!r.leading : n, i = "trailing" in r ? !!r.trailing : i), LR(t, e, {
      leading: n,
      maxWait: e,
      trailing: i
    })
  }
  Hx.exports = WR
});
var tp = I((vQ, Nw) => {
  var Wq = Wr();

  function zq(t, e, r) {
    for (var n = -1, i = t.length; ++n < i;) {
      var o = t[n],
        a = e(o);
      if (a != null && (u === void 0 ? a === a && !Wq(a) : r(a, u))) var u = a,
        s = o
    }
    return s
  }
  Nw.exports = zq
});
var Lw = I((gQ, Rw) => {
  function Fq(t, e) {
    return t > e
  }
  Rw.exports = Fq
});
var qw = I((bQ, Bw) => {
  var $q = tp(),
    Uq = Lw(),
    Hq = Vr();

  function Gq(t) {
    return t && t.length ? $q(t, Hq, Uq) : void 0
  }
  Bw.exports = Gq
});
var zw = I((xQ, Ww) => {
  function Kq(t, e) {
    return t < e
  }
  Ww.exports = Kq
});
var $w = I((wQ, Fw) => {
  var Vq = tp(),
    Xq = zw(),
    Yq = Vr();

  function Zq(t) {
    return t && t.length ? Vq(t, Yq, Xq) : void 0
  }
  Fw.exports = Zq
});
var Hw = I((OQ, Uw) => {
  var Jq = za(),
    Qq = mr(),
    tW = rf(),
    eW = ae();

  function rW(t, e) {
    var r = eW(t) ? Jq : tW;
    return r(t, Qq(e, 3))
  }
  Uw.exports = rW
});
var Kw = I((SQ, Gw) => {
  var nW = tf(),
    iW = Hw();

  function oW(t, e) {
    return nW(iW(t, e), 1)
  }
  Gw.exports = oW
});
var Ro = I((AQ, Vw) => {
  var aW = gu();

  function uW(t, e) {
    return aW(t, e)
  }
  Vw.exports = uW
});
var ep = I((Xw, ms) => {
  (function(t) {
    "use strict";
    var e = 1e9,
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
      d = 9007199254740991,
      y = u(d / p),
      m = {};
    m.absoluteValue = m.abs = function() {
      var b = new this.constructor(this);
      return b.s && (b.s = 1), b
    }, m.comparedTo = m.cmp = function(b) {
      var O, T, A, M, E = this;
      if (b = new E.constructor(b), E.s !== b.s) return E.s || -b.s;
      if (E.e !== b.e) return E.e > b.e ^ E.s < 0 ? 1 : -1;
      for (A = E.d.length, M = b.d.length, O = 0, T = A < M ? A : M; O < T; ++O)
        if (E.d[O] !== b.d[O]) return E.d[O] > b.d[O] ^ E.s < 0 ? 1 : -1;
      return A === M ? 0 : A > M ^ E.s < 0 ? 1 : -1
    }, m.decimalPlaces = m.dp = function() {
      var b = this,
        O = b.d.length - 1,
        T = (O - b.e) * p;
      if (O = b.d[O], O)
        for (; O % 10 == 0; O /= 10) T--;
      return T < 0 ? 0 : T
    }, m.dividedBy = m.div = function(b) {
      return S(this, new this.constructor(b))
    }, m.dividedToIntegerBy = m.idiv = function(b) {
      var O = this,
        T = O.constructor;
      return B(S(O, new T(b), 0, 1), T.precision)
    }, m.equals = m.eq = function(b) {
      return !this.cmp(b)
    }, m.exponent = function() {
      return h(this)
    }, m.greaterThan = m.gt = function(b) {
      return this.cmp(b) > 0
    }, m.greaterThanOrEqualTo = m.gte = function(b) {
      return this.cmp(b) >= 0
    }, m.isInteger = m.isint = function() {
      return this.e > this.d.length - 2
    }, m.isNegative = m.isneg = function() {
      return this.s < 0
    }, m.isPositive = m.ispos = function() {
      return this.s > 0
    }, m.isZero = function() {
      return this.s === 0
    }, m.lessThan = m.lt = function(b) {
      return this.cmp(b) < 0
    }, m.lessThanOrEqualTo = m.lte = function(b) {
      return this.cmp(b) < 1
    }, m.logarithm = m.log = function(b) {
      var O, T = this,
        A = T.constructor,
        M = A.precision,
        E = M + 5;
      if (b === void 0) b = new A(10);
      else if (b = new A(b), b.s < 1 || b.eq(f)) throw Error(i + "NaN");
      if (T.s < 1) throw Error(i + (T.s ? "NaN" : "-Infinity"));
      return T.eq(f) ? new A(0) : (n = !1, O = S(C(T, E), C(b, E), E), n = !0, B(O, M))
    }, m.minus = m.sub = function(b) {
      var O = this;
      return b = new O.constructor(b), O.s == b.s ? W(O, b) : v(O, (b.s = -b.s, b))
    }, m.modulo = m.mod = function(b) {
      var O, T = this,
        A = T.constructor,
        M = A.precision;
      if (b = new A(b), !b.s) throw Error(i + "NaN");
      return T.s ? (n = !1, O = S(T, b, 0, 1).times(b), n = !0, T.minus(O)) : B(new A(T), M)
    }, m.naturalExponential = m.exp = function() {
      return P(this)
    }, m.naturalLogarithm = m.ln = function() {
      return C(this)
    }, m.negated = m.neg = function() {
      var b = new this.constructor(this);
      return b.s = -b.s || 0, b
    }, m.plus = m.add = function(b) {
      var O = this;
      return b = new O.constructor(b), O.s == b.s ? v(O, b) : W(O, (b.s = -b.s, b))
    }, m.precision = m.sd = function(b) {
      var O, T, A, M = this;
      if (b !== void 0 && b !== !!b && b !== 1 && b !== 0) throw Error(o + b);
      if (O = h(M) + 1, A = M.d.length - 1, T = A * p + 1, A = M.d[A], A) {
        for (; A % 10 == 0; A /= 10) T--;
        for (A = M.d[0]; A >= 10; A /= 10) T++
      }
      return b && O > T ? O : T
    }, m.squareRoot = m.sqrt = function() {
      var b, O, T, A, M, E, D, L = this,
        G = L.constructor;
      if (L.s < 1) {
        if (!L.s) return new G(0);
        throw Error(i + "NaN")
      }
      for (b = h(L), n = !1, M = Math.sqrt(+L), M == 0 || M == 1 / 0 ? (O = w(L.d), (O.length + b) % 2 == 0 && (O += "0"), M = Math.sqrt(O), b = u((b + 1) / 2) - (b < 0 || b % 2), M == 1 / 0 ? O = "5e" + b : (O = M.toExponential(), O = O.slice(0, O.indexOf("e") + 1) + b), A = new G(O)) : A = new G(M.toString()), T = G.precision, M = D = T + 3;;)
        if (E = A, A = E.plus(S(L, E, D + 2)).times(.5), w(E.d).slice(0, D) === (O = w(A.d)).slice(0, D)) {
          if (O = O.slice(D - 3, D + 1), M == D && O == "4999") {
            if (B(E, T + 1, 0), E.times(E).eq(L)) {
              A = E;
              break
            }
          } else if (O != "9999") break;
          D += 4
        } return n = !0, B(A, T)
    }, m.times = m.mul = function(b) {
      var O, T, A, M, E, D, L, G, Z, J = this,
        nt = J.constructor,
        yt = J.d,
        K = (b = new nt(b)).d;
      if (!J.s || !b.s) return new nt(0);
      for (b.s *= J.s, T = J.e + b.e, G = yt.length, Z = K.length, G < Z && (E = yt, yt = K, K = E, D = G, G = Z, Z = D), E = [], D = G + Z, A = D; A--;) E.push(0);
      for (A = Z; --A >= 0;) {
        for (O = 0, M = G + A; M > A;) L = E[M] + K[A] * yt[M - A - 1] + O, E[M--] = L % c | 0, O = L / c | 0;
        E[M] = (E[M] + O) % c | 0
      }
      for (; !E[--D];) E.pop();
      return O ? ++T : E.shift(), b.d = E, b.e = T, n ? B(b, nt.precision) : b
    }, m.toDecimalPlaces = m.todp = function(b, O) {
      var T = this,
        A = T.constructor;
      return T = new A(T), b === void 0 ? T : (x(b, 0, e), O === void 0 ? O = A.rounding : x(O, 0, 8), B(T, b + h(T) + 1, O))
    }, m.toExponential = function(b, O) {
      var T, A = this,
        M = A.constructor;
      return b === void 0 ? T = R(A, !0) : (x(b, 0, e), O === void 0 ? O = M.rounding : x(O, 0, 8), A = B(new M(A), b + 1, O), T = R(A, !0, b + 1)), T
    }, m.toFixed = function(b, O) {
      var T, A, M = this,
        E = M.constructor;
      return b === void 0 ? R(M) : (x(b, 0, e), O === void 0 ? O = E.rounding : x(O, 0, 8), A = B(new E(M), b + h(M) + 1, O), T = R(A.abs(), !1, b + h(A) + 1), M.isneg() && !M.isZero() ? "-" + T : T)
    }, m.toInteger = m.toint = function() {
      var b = this,
        O = b.constructor;
      return B(new O(b), h(b) + 1, O.rounding)
    }, m.toNumber = function() {
      return +this
    }, m.toPower = m.pow = function(b) {
      var O, T, A, M, E, D, L = this,
        G = L.constructor,
        Z = 12,
        J = +(b = new G(b));
      if (!b.s) return new G(f);
      if (L = new G(L), !L.s) {
        if (b.s < 1) throw Error(i + "Infinity");
        return L
      }
      if (L.eq(f)) return L;
      if (A = G.precision, b.eq(f)) return B(L, A);
      if (O = b.e, T = b.d.length - 1, D = O >= T, E = L.s, D) {
        if ((T = J < 0 ? -J : J) <= d) {
          for (M = new G(f), O = Math.ceil(A / p + 4), n = !1; T % 2 && (M = M.times(L), H(M.d, O)), T = u(T / 2), T !== 0;) L = L.times(L), H(L.d, O);
          return n = !0, b.s < 0 ? new G(f).div(M) : B(M, A)
        }
      } else if (E < 0) throw Error(i + "NaN");
      return E = E < 0 && b.d[Math.max(O, T)] & 1 ? -1 : 1, L.s = 1, n = !1, M = b.times(C(L, A + Z)), n = !0, M = P(M), M.s = E, M
    }, m.toPrecision = function(b, O) {
      var T, A, M = this,
        E = M.constructor;
      return b === void 0 ? (T = h(M), A = R(M, T <= E.toExpNeg || T >= E.toExpPos)) : (x(b, 1, e), O === void 0 ? O = E.rounding : x(O, 0, 8), M = B(new E(M), b, O), T = h(M), A = R(M, b <= T || T <= E.toExpNeg, b)), A
    }, m.toSignificantDigits = m.tosd = function(b, O) {
      var T = this,
        A = T.constructor;
      return b === void 0 ? (b = A.precision, O = A.rounding) : (x(b, 1, e), O === void 0 ? O = A.rounding : x(O, 0, 8)), B(new A(T), b, O)
    }, m.toString = m.valueOf = m.val = m.toJSON = function() {
      var b = this,
        O = h(b),
        T = b.constructor;
      return R(b, O <= T.toExpNeg || O >= T.toExpPos)
    };

    function v(b, O) {
      var T, A, M, E, D, L, G, Z, J = b.constructor,
        nt = J.precision;
      if (!b.s || !O.s) return O.s || (O = new J(b)), n ? B(O, nt) : O;
      if (G = b.d, Z = O.d, D = b.e, M = O.e, G = G.slice(), E = D - M, E) {
        for (E < 0 ? (A = G, E = -E, L = Z.length) : (A = Z, M = D, L = G.length), D = Math.ceil(nt / p), L = D > L ? D + 1 : L + 1, E > L && (E = L, A.length = 1), A.reverse(); E--;) A.push(0);
        A.reverse()
      }
      for (L = G.length, E = Z.length, L - E < 0 && (E = L, A = Z, Z = G, G = A), T = 0; E;) T = (G[--E] = G[E] + Z[E] + T) / c | 0, G[E] %= c;
      for (T && (G.unshift(T), ++M), L = G.length; G[--L] == 0;) G.pop();
      return O.d = G, O.e = M, n ? B(O, nt) : O
    }

    function x(b, O, T) {
      if (b !== ~~b || b < O || b > T) throw Error(o + b)
    }

    function w(b) {
      var O, T, A, M = b.length - 1,
        E = "",
        D = b[0];
      if (M > 0) {
        for (E += D, O = 1; O < M; O++) A = b[O] + "", T = p - A.length, T && (E += _(T)), E += A;
        D = b[O], A = D + "", T = p - A.length, T && (E += _(T))
      } else if (D === 0) return "0";
      for (; D % 10 === 0;) D /= 10;
      return E + D
    }
    var S = function() {
      function b(A, M) {
        var E, D = 0,
          L = A.length;
        for (A = A.slice(); L--;) E = A[L] * M + D, A[L] = E % c | 0, D = E / c | 0;
        return D && A.unshift(D), A
      }

      function O(A, M, E, D) {
        var L, G;
        if (E != D) G = E > D ? 1 : -1;
        else
          for (L = G = 0; L < E; L++)
            if (A[L] != M[L]) {
              G = A[L] > M[L] ? 1 : -1;
              break
            } return G
      }

      function T(A, M, E) {
        for (var D = 0; E--;) A[E] -= D, D = A[E] < M[E] ? 1 : 0, A[E] = D * c + A[E] - M[E];
        for (; !A[0] && A.length > 1;) A.shift()
      }
      return function(A, M, E, D) {
        var L, G, Z, J, nt, yt, K, lt, tt, $, Ot, Q, gt, jt, Rt, pe, V, ne, ie = A.constructor,
          oe = A.s == M.s ? 1 : -1,
          N = A.d,
          rt = M.d;
        if (!A.s) return new ie(A);
        if (!M.s) throw Error(i + "Division by zero");
        for (G = A.e - M.e, V = rt.length, Rt = N.length, K = new ie(oe), lt = K.d = [], Z = 0; rt[Z] == (N[Z] || 0);) ++Z;
        if (rt[Z] > (N[Z] || 0) && --G, E == null ? Q = E = ie.precision : D ? Q = E + (h(A) - h(M)) + 1 : Q = E, Q < 0) return new ie(0);
        if (Q = Q / p + 2 | 0, Z = 0, V == 1)
          for (J = 0, rt = rt[0], Q++;
            (Z < Rt || J) && Q--; Z++) gt = J * c + (N[Z] || 0), lt[Z] = gt / rt | 0, J = gt % rt | 0;
        else {
          for (J = c / (rt[0] + 1) | 0, J > 1 && (rt = b(rt, J), N = b(N, J), V = rt.length, Rt = N.length), jt = V, tt = N.slice(0, V), $ = tt.length; $ < V;) tt[$++] = 0;
          ne = rt.slice(), ne.unshift(0), pe = rt[0], rt[1] >= c / 2 && ++pe;
          do J = 0, L = O(rt, tt, V, $), L < 0 ? (Ot = tt[0], V != $ && (Ot = Ot * c + (tt[1] || 0)), J = Ot / pe | 0, J > 1 ? (J >= c && (J = c - 1), nt = b(rt, J), yt = nt.length, $ = tt.length, L = O(nt, tt, yt, $), L == 1 && (J--, T(nt, V < yt ? ne : rt, yt))) : (J == 0 && (L = J = 1), nt = rt.slice()), yt = nt.length, yt < $ && nt.unshift(0), T(tt, nt, $), L == -1 && ($ = tt.length, L = O(rt, tt, V, $), L < 1 && (J++, T(tt, V < $ ? ne : rt, $))), $ = tt.length) : L === 0 && (J++, tt = [0]), lt[Z++] = J, L && tt[0] ? tt[$++] = N[jt] || 0 : (tt = [N[jt]], $ = 1); while ((jt++ < Rt || tt[0] !== void 0) && Q--)
        }
        return lt[0] || lt.shift(), K.e = G, B(K, D ? E + h(K) + 1 : E)
      }
    }();

    function P(b, O) {
      var T, A, M, E, D, L, G = 0,
        Z = 0,
        J = b.constructor,
        nt = J.precision;
      if (h(b) > 16) throw Error(a + h(b));
      if (!b.s) return new J(f);
      for (O == null ? (n = !1, L = nt) : L = O, D = new J(.03125); b.abs().gte(.1);) b = b.times(D), Z += 5;
      for (A = Math.log(s(2, Z)) / Math.LN10 * 2 + 5 | 0, L += A, T = M = E = new J(f), J.precision = L;;) {
        if (M = B(M.times(b), L), T = T.times(++G), D = E.plus(S(M, T, L)), w(D.d).slice(0, L) === w(E.d).slice(0, L)) {
          for (; Z--;) E = B(E.times(E), L);
          return J.precision = nt, O == null ? (n = !0, B(E, nt)) : E
        }
        E = D
      }
    }

    function h(b) {
      for (var O = b.e * p, T = b.d[0]; T >= 10; T /= 10) O++;
      return O
    }

    function g(b, O, T) {
      if (O > b.LN10.sd()) throw n = !0, T && (b.precision = T), Error(i + "LN10 precision limit exceeded");
      return B(new b(b.LN10), O)
    }

    function _(b) {
      for (var O = ""; b--;) O += "0";
      return O
    }

    function C(b, O) {
      var T, A, M, E, D, L, G, Z, J, nt = 1,
        yt = 10,
        K = b,
        lt = K.d,
        tt = K.constructor,
        $ = tt.precision;
      if (K.s < 1) throw Error(i + (K.s ? "NaN" : "-Infinity"));
      if (K.eq(f)) return new tt(0);
      if (O == null ? (n = !1, Z = $) : Z = O, K.eq(10)) return O == null && (n = !0), g(tt, Z);
      if (Z += yt, tt.precision = Z, T = w(lt), A = T.charAt(0), E = h(K), Math.abs(E) < 15e14) {
        for (; A < 7 && A != 1 || A == 1 && T.charAt(1) > 3;) K = K.times(b), T = w(K.d), A = T.charAt(0), nt++;
        E = h(K), A > 1 ? (K = new tt("0." + T), E++) : K = new tt(A + "." + T.slice(1))
      } else return G = g(tt, Z + 2, $).times(E + ""), K = C(new tt(A + "." + T.slice(1)), Z - yt).plus(G), tt.precision = $, O == null ? (n = !0, B(K, $)) : K;
      for (L = D = K = S(K.minus(f), K.plus(f), Z), J = B(K.times(K), Z), M = 3;;) {
        if (D = B(D.times(J), Z), G = L.plus(S(D, new tt(M), Z)), w(G.d).slice(0, Z) === w(L.d).slice(0, Z)) return L = L.times(2), E !== 0 && (L = L.plus(g(tt, Z + 2, $).times(E + ""))), L = S(L, new tt(nt), Z), tt.precision = $, O == null ? (n = !0, B(L, $)) : L;
        L = G, M += 2
      }
    }

    function k(b, O) {
      var T, A, M;
      for ((T = O.indexOf(".")) > -1 && (O = O.replace(".", "")), (A = O.search(/e/i)) > 0 ? (T < 0 && (T = A), T += +O.slice(A + 1), O = O.substring(0, A)) : T < 0 && (T = O.length), A = 0; O.charCodeAt(A) === 48;) ++A;
      for (M = O.length; O.charCodeAt(M - 1) === 48;) --M;
      if (O = O.slice(A, M), O) {
        if (M -= A, T = T - A - 1, b.e = u(T / p), b.d = [], A = (T + 1) % p, T < 0 && (A += p), A < M) {
          for (A && b.d.push(+O.slice(0, A)), M -= p; A < M;) b.d.push(+O.slice(A, A += p));
          O = O.slice(A), A = p - O.length
        } else A -= M;
        for (; A--;) O += "0";
        if (b.d.push(+O), n && (b.e > y || b.e < -y)) throw Error(a + T)
      } else b.s = 0, b.e = 0, b.d = [0];
      return b
    }

    function B(b, O, T) {
      var A, M, E, D, L, G, Z, J, nt = b.d;
      for (D = 1, E = nt[0]; E >= 10; E /= 10) D++;
      if (A = O - D, A < 0) A += p, M = O, Z = nt[J = 0];
      else {
        if (J = Math.ceil((A + 1) / p), E = nt.length, J >= E) return b;
        for (Z = E = nt[J], D = 1; E >= 10; E /= 10) D++;
        A %= p, M = A - p + D
      }
      if (T !== void 0 && (E = s(10, D - M - 1), L = Z / E % 10 | 0, G = O < 0 || nt[J + 1] !== void 0 || Z % E, G = T < 4 ? (L || G) && (T == 0 || T == (b.s < 0 ? 3 : 2)) : L > 5 || L == 5 && (T == 4 || G || T == 6 && (A > 0 ? M > 0 ? Z / s(10, D - M) : 0 : nt[J - 1]) % 10 & 1 || T == (b.s < 0 ? 8 : 7))), O < 1 || !nt[0]) return G ? (E = h(b), nt.length = 1, O = O - E - 1, nt[0] = s(10, (p - O % p) % p), b.e = u(-O / p) || 0) : (nt.length = 1, nt[0] = b.e = b.s = 0), b;
      if (A == 0 ? (nt.length = J, E = 1, J--) : (nt.length = J + 1, E = s(10, p - A), nt[J] = M > 0 ? (Z / s(10, D - M) % s(10, M) | 0) * E : 0), G)
        for (;;)
          if (J == 0) {
            (nt[0] += E) == c && (nt[0] = 1, ++b.e);
            break
          } else {
            if (nt[J] += E, nt[J] != c) break;
            nt[J--] = 0, E = 1
          } for (A = nt.length; nt[--A] === 0;) nt.pop();
      if (n && (b.e > y || b.e < -y)) throw Error(a + h(b));
      return b
    }

    function W(b, O) {
      var T, A, M, E, D, L, G, Z, J, nt, yt = b.constructor,
        K = yt.precision;
      if (!b.s || !O.s) return O.s ? O.s = -O.s : O = new yt(b), n ? B(O, K) : O;
      if (G = b.d, nt = O.d, A = O.e, Z = b.e, G = G.slice(), D = Z - A, D) {
        for (J = D < 0, J ? (T = G, D = -D, L = nt.length) : (T = nt, A = Z, L = G.length), M = Math.max(Math.ceil(K / p), L) + 2, D > M && (D = M, T.length = 1), T.reverse(), M = D; M--;) T.push(0);
        T.reverse()
      } else {
        for (M = G.length, L = nt.length, J = M < L, J && (L = M), M = 0; M < L; M++)
          if (G[M] != nt[M]) {
            J = G[M] < nt[M];
            break
          } D = 0
      }
      for (J && (T = G, G = nt, nt = T, O.s = -O.s), L = G.length, M = nt.length - L; M > 0; --M) G[L++] = 0;
      for (M = nt.length; M > D;) {
        if (G[--M] < nt[M]) {
          for (E = M; E && G[--E] === 0;) G[E] = c - 1;
          --G[E], G[M] += c
        }
        G[M] -= nt[M]
      }
      for (; G[--L] === 0;) G.pop();
      for (; G[0] === 0; G.shift()) --A;
      return G[0] ? (O.d = G, O.e = A, n ? B(O, K) : O) : new yt(0)
    }

    function R(b, O, T) {
      var A, M = h(b),
        E = w(b.d),
        D = E.length;
      return O ? (T && (A = T - D) > 0 ? E = E.charAt(0) + "." + E.slice(1) + _(A) : D > 1 && (E = E.charAt(0) + "." + E.slice(1)), E = E + (M < 0 ? "e" : "e+") + M) : M < 0 ? (E = "0." + _(-M - 1) + E, T && (A = T - D) > 0 && (E += _(A))) : M >= D ? (E += _(M + 1 - D), T && (A = T - M - 1) > 0 && (E = E + "." + _(A))) : ((A = M + 1) < D && (E = E.slice(0, A) + "." + E.slice(A)), T && (A = T - D) > 0 && (M + 1 === D && (E += "."), E += _(A))), b.s < 0 ? "-" + E : E
    }

    function H(b, O) {
      if (b.length > O) return b.length = O, !0
    }

    function F(b) {
      var O, T, A;

      function M(E) {
        var D = this;
        if (!(D instanceof M)) return new M(E);
        if (D.constructor = M, E instanceof M) {
          D.s = E.s, D.e = E.e, D.d = (E = E.d) ? E.slice() : E;
          return
        }
        if (typeof E == "number") {
          if (E * 0 !== 0) throw Error(o + E);
          if (E > 0) D.s = 1;
          else if (E < 0) E = -E, D.s = -1;
          else {
            D.s = 0, D.e = 0, D.d = [0];
            return
          }
          if (E === ~~E && E < 1e7) {
            D.e = 0, D.d = [E];
            return
          }
          return k(D, E.toString())
        } else if (typeof E != "string") throw Error(o + E);
        if (E.charCodeAt(0) === 45 ? (E = E.slice(1), D.s = -1) : D.s = 1, l.test(E)) k(D, E);
        else throw Error(o + E)
      }
      if (M.prototype = m, M.ROUND_UP = 0, M.ROUND_DOWN = 1, M.ROUND_CEIL = 2, M.ROUND_FLOOR = 3, M.ROUND_HALF_UP = 4, M.ROUND_HALF_DOWN = 5, M.ROUND_HALF_EVEN = 6, M.ROUND_HALF_CEIL = 7, M.ROUND_HALF_FLOOR = 8, M.clone = F, M.config = M.set = z, b === void 0 && (b = {}), b)
        for (A = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], O = 0; O < A.length;) b.hasOwnProperty(T = A[O++]) || (b[T] = this[T]);
      return M.config(b), M
    }

    function z(b) {
      if (!b || typeof b != "object") throw Error(i + "Object expected");
      var O, T, A, M = ["precision", 1, e, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (O = 0; O < M.length; O += 3)
        if ((A = b[T = M[O]]) !== void 0)
          if (u(A) === A && A >= M[O + 1] && A <= M[O + 2]) this[T] = A;
          else throw Error(o + T + ": " + A);
      if ((A = b[T = "LN10"]) !== void 0)
        if (A == Math.LN10) this[T] = new this(A);
        else throw Error(o + T + ": " + A);
      return this
    }
    r = F(r), r.default = r.Decimal = r, f = new r(1), typeof define == "function" && define.amd ? define(function() {
      return r
    }) : typeof ms < "u" && ms.exports ? ms.exports = r : (t || (t = typeof self < "u" && self && self.self == self ? self : Function("return this")()), t.Decimal = r)
  })(Xw)
});
var L1 = I((att, R1) => {
  function Lz(t) {
    var e = t == null ? 0 : t.length;
    return e ? t[e - 1] : void 0
  }
  R1.exports = Lz
});
var tO = I((_tt, Q1) => {
  "use strict";
  var fF = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  Q1.exports = fF
});
var iO = I((Ptt, nO) => {
  "use strict";
  var pF = tO();

  function eO() {}

  function rO() {}
  rO.resetWarningCache = eO;
  nO.exports = function() {
    function t(n, i, o, a, u, s) {
      if (s !== pF) {
        var l = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw l.name = "Invariant Violation", l
      }
    }
    t.isRequired = t;

    function e() {
      return t
    }
    var r = {
      array: t,
      bigint: t,
      bool: t,
      func: t,
      number: t,
      object: t,
      string: t,
      symbol: t,
      any: t,
      arrayOf: e,
      element: t,
      elementType: t,
      instanceOf: e,
      node: t,
      objectOf: e,
      oneOf: e,
      oneOfType: e,
      shape: e,
      exact: e,
      checkPropTypes: rO,
      resetWarningCache: eO
    };
    return r.PropTypes = r, r
  }
});
var aO = I((jtt, oO) => {
  oO.exports = iO()();
  var Ttt, Ett
});
var $O = I((yet, FO) => {
  var c8 = Wc(),
    f8 = c8(Object.getPrototypeOf, Object);
  FO.exports = f8
});
var GO = I((vet, HO) => {
  var p8 = Ze(),
    d8 = $O(),
    m8 = Je(),
    h8 = "[object Object]",
    y8 = Function.prototype,
    v8 = Object.prototype,
    UO = y8.toString,
    g8 = v8.hasOwnProperty,
    b8 = UO.call(Object);

  function x8(t) {
    if (!m8(t) || p8(t) != h8) return !1;
    var e = d8(t);
    if (e === null) return !0;
    var r = g8.call(e, "constructor") && e.constructor;
    return typeof r == "function" && r instanceof r && UO.call(r) == b8
  }
  HO.exports = x8
});
var VO = I((get, KO) => {
  var w8 = Ze(),
    O8 = Je(),
    S8 = "[object Boolean]";

  function A8(t) {
    return t === !0 || t === !1 || O8(t) && w8(t) == S8
  }
  KO.exports = A8
});
var cS = I((Iet, lS) => {
  var Q8 = Math.ceil,
    t6 = Math.max;

  function e6(t, e, r, n) {
    for (var i = -1, o = t6(Q8((e - t) / (r || 1)), 0), a = Array(o); o--;) a[n ? o : ++i] = t, t += r;
    return a
  }
  lS.exports = e6
});
var Kp = I((ket, pS) => {
  var r6 = pf(),
    fS = 1 / 0,
    n6 = 17976931348623157e292;

  function i6(t) {
    if (!t) return t === 0 ? t : 0;
    if (t = r6(t), t === fS || t === -fS) {
      var e = t < 0 ? -1 : 1;
      return e * n6
    }
    return t === t ? t : 0
  }
  pS.exports = i6
});
var mS = I((Det, dS) => {
  var o6 = cS(),
    a6 = so(),
    Vp = Kp();

  function u6(t) {
    return function(e, r, n) {
      return n && typeof n != "number" && a6(e, r, n) && (r = n = void 0), e = Vp(e), r === void 0 ? (r = e, e = 0) : r = Vp(r), n = n === void 0 ? e < r ? 1 : -1 : Vp(n), o6(e, r, n, t)
    }
  }
  dS.exports = u6
});
var Xp = I((Net, hS) => {
  var s6 = mS(),
    l6 = s6();
  hS.exports = l6
});
var TS = I((Ket, PS) => {
  var S6 = Ou();

  function A6(t, e) {
    var r;
    return S6(t, function(n, i, o) {
      return r = e(n, i, o), !r
    }), !!r
  }
  PS.exports = A6
});
var jS = I((Vet, ES) => {
  var _6 = Cc(),
    P6 = mr(),
    T6 = TS(),
    E6 = ae(),
    j6 = so();

  function M6(t, e, r) {
    var n = E6(t) ? _6 : T6;
    return r && j6(t, e, r) && (e = void 0), n(t, P6(e, 3))
  }
  ES.exports = M6
});
var IS = I((Yet, CS) => {
  var MS = of();

  function C6(t, e, r) {
    e == "__proto__" && MS ? MS(t, e, {
      configurable: !0,
      enumerable: !0,
      value: r,
      writable: !0
    }) : t[e] = r
  }
  CS.exports = C6
});
var DS = I((Zet, kS) => {
  var I6 = IS(),
    k6 = ef(),
    D6 = mr();

  function N6(t, e) {
    var r = {};
    return e = D6(e, 3), k6(t, function(n, i, o) {
      I6(r, i, e(n, i, o))
    }), r
  }
  kS.exports = N6
});
var RS = I((Jet, NS) => {
  function R6(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length; ++r < n;)
      if (!e(t[r], r, t)) return !1;
    return !0
  }
  NS.exports = R6
});
var BS = I((Qet, LS) => {
  var L6 = Ou();

  function B6(t, e) {
    var r = !0;
    return L6(t, function(n, i, o) {
      return r = !!e(n, i, o), r
    }), r
  }
  LS.exports = B6
});
var Qp = I((trt, qS) => {
  var q6 = RS(),
    W6 = BS(),
    z6 = mr(),
    F6 = ae(),
    $6 = so();

  function U6(t, e, r) {
    var n = F6(t) ? q6 : W6;
    return r && $6(t, e, r) && (e = void 0), n(t, z6(e, 3))
  }
  qS.exports = U6
});
var iA = I((_rt, nA) => {
  var m$ = mr(),
    h$ = zn(),
    y$ = ao();

  function v$(t) {
    return function(e, r, n) {
      var i = Object(e);
      if (!h$(e)) {
        var o = m$(r, 3);
        e = y$(e), r = function(u) {
          return o(i[u], u, i)
        }
      }
      var a = t(e, r, n);
      return a > -1 ? i[o ? e[a] : a] : void 0
    }
  }
  nA.exports = v$
});
var aA = I((Prt, oA) => {
  var g$ = Kp();

  function b$(t) {
    var e = g$(t),
      r = e % 1;
    return e === e ? r ? e - r : e : 0
  }
  oA.exports = b$
});
var sA = I((Trt, uA) => {
  var x$ = Yc(),
    w$ = mr(),
    O$ = aA(),
    S$ = Math.max;

  function A$(t, e, r) {
    var n = t == null ? 0 : t.length;
    if (!n) return -1;
    var i = r == null ? 0 : O$(r);
    return i < 0 && (i = S$(n + i, 0)), x$(t, w$(e, 3), i)
  }
  uA.exports = A$
});
var cA = I((Ert, lA) => {
  var _$ = iA(),
    P$ = sA(),
    T$ = _$(P$);
  lA.exports = T$
});
var w_ = I((Sit, _d) => {
  "use strict";
  var y5 = Object.prototype.hasOwnProperty,
    fe = "~";

  function Ca() {}
  Object.create && (Ca.prototype = Object.create(null), new Ca().__proto__ || (fe = !1));

  function v5(t, e, r) {
    this.fn = t, this.context = e, this.once = r || !1
  }

  function x_(t, e, r, n, i) {
    if (typeof r != "function") throw new TypeError("The listener must be a function");
    var o = new v5(r, n || t, i),
      a = fe ? fe + e : e;
    return t._events[a] ? t._events[a].fn ? t._events[a] = [t._events[a], o] : t._events[a].push(o) : (t._events[a] = o, t._eventsCount++), t
  }

  function ll(t, e) {
    --t._eventsCount === 0 ? t._events = new Ca : delete t._events[e]
  }

  function re() {
    this._events = new Ca, this._eventsCount = 0
  }
  re.prototype.eventNames = function() {
    var e = [],
      r, n;
    if (this._eventsCount === 0) return e;
    for (n in r = this._events) y5.call(r, n) && e.push(fe ? n.slice(1) : n);
    return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(r)) : e
  };
  re.prototype.listeners = function(e) {
    var r = fe ? fe + e : e,
      n = this._events[r];
    if (!n) return [];
    if (n.fn) return [n.fn];
    for (var i = 0, o = n.length, a = new Array(o); i < o; i++) a[i] = n[i].fn;
    return a
  };
  re.prototype.listenerCount = function(e) {
    var r = fe ? fe + e : e,
      n = this._events[r];
    return n ? n.fn ? 1 : n.length : 0
  };
  re.prototype.emit = function(e, r, n, i, o, a) {
    var u = fe ? fe + e : e;
    if (!this._events[u]) return !1;
    var s = this._events[u],
      l = arguments.length,
      f, c;
    if (s.fn) {
      switch (s.once && this.removeListener(e, s.fn, void 0, !0), l) {
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
        d;
      for (c = 0; c < p; c++) switch (s[c].once && this.removeListener(e, s[c].fn, void 0, !0), l) {
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
            for (d = 1, f = new Array(l - 1); d < l; d++) f[d - 1] = arguments[d];
          s[c].fn.apply(s[c].context, f)
      }
    }
    return !0
  };
  re.prototype.on = function(e, r, n) {
    return x_(this, e, r, n, !1)
  };
  re.prototype.once = function(e, r, n) {
    return x_(this, e, r, n, !0)
  };
  re.prototype.removeListener = function(e, r, n, i) {
    var o = fe ? fe + e : e;
    if (!this._events[o]) return this;
    if (!r) return ll(this, o), this;
    var a = this._events[o];
    if (a.fn) a.fn === r && (!i || a.once) && (!n || a.context === n) && ll(this, o);
    else {
      for (var u = 0, s = [], l = a.length; u < l; u++)(a[u].fn !== r || i && !a[u].once || n && a[u].context !== n) && s.push(a[u]);
      s.length ? this._events[o] = s.length === 1 ? s[0] : s : ll(this, o)
    }
    return this
  };
  re.prototype.removeAllListeners = function(e) {
    var r;
    return e ? (r = fe ? fe + e : e, this._events[r] && ll(this, r)) : (this._events = new Ca, this._eventsCount = 0), this
  };
  re.prototype.off = re.prototype.removeListener;
  re.prototype.addListener = re.prototype.on;
  re.prefixed = fe;
  re.EventEmitter = re;
  typeof _d < "u" && (_d.exports = re)
});
import wn, {
  useState as Ut,
  useEffect as Da,
  useCallback as qe,
  useRef as i4
} from "./react-shim-eraudit.js";
import Ul from "./react-shim-eraudit.js";

function Dd(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var i = t.length;
      for (e = 0; e < i; e++) t[e] && (r = Dd(t[e])) && (n && (n += " "), n += r)
    } else
      for (r in t) t[r] && (n && (n += " "), n += r);
  return n
}

function eP() {
  for (var t, e, r = 0, n = "", i = arguments.length; r < i; r++)(t = arguments[r]) && (e = Dd(t)) && (n && (n += " "), n += e);
  return n
}
var ut = eP;
var ql = et(zr()),
  En = et(Te()),
  Lh = et($a()),
  Bh = et(Lt()),
  qh = et(Pe()),
  Wh = et(Oh());
import {
  Children as Wl,
  isValidElement as lj
} from "./react-shim-eraudit.js";
var Pn = et($a()),
  Dl = et(kl()),
  _h = et(zr()),
  Ph = et(Il()),
  Th = et(Te()),
  Yt = function(e) {
    return e === 0 ? 0 : e > 0 ? 1 : -1
  },
  pr = function(e) {
    return (0, Pn.default)(e) && e.indexOf("%") === e.length - 1
  },
  X = function(e) {
    return (0, Ph.default)(e) && !(0, Dl.default)(e)
  },
  Eh = function(e) {
    return (0, Th.default)(e)
  },
  Mt = function(e) {
    return X(e) || (0, Pn.default)(e)
  },
  rj = 0,
  Qe = function(e) {
    var r = ++rj;
    return "".concat(e || "").concat(r)
  },
  ze = function(e, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!X(e) && !(0, Pn.default)(e)) return n;
    var o;
    if (pr(e)) {
      var a = e.indexOf("%");
      o = r * parseFloat(e.slice(0, a)) / 100
    } else o = +e;
    return (0, Dl.default)(o) && (o = n), i && o > r && (o = r), o
  },
  tr = function(e) {
    if (!e) return null;
    var r = Object.keys(e);
    return r && r.length ? e[r[0]] : null
  },
  jh = function(e) {
    if (!Array.isArray(e)) return !1;
    for (var r = e.length, n = {}, i = 0; i < r; i++)
      if (!n[e[i]]) n[e[i]] = !0;
      else return !0;
    return !1
  },
  ve = function(e, r) {
    return X(e) && X(r) ? function(n) {
      return e + n * (r - e)
    } : function() {
      return r
    }
  };

function Tn(t, e, r) {
  return !t || !t.length ? null : t.find(function(n) {
    return n && (typeof e == "function" ? e(n) : (0, _h.default)(n, e)) === r
  })
}
var Mh = function(e, r) {
  return X(e) && X(r) ? e - r : (0, Pn.default)(e) && (0, Pn.default)(r) ? e.localeCompare(r) : e instanceof Date && r instanceof Date ? e.getTime() - r.getTime() : String(e).localeCompare(String(r))
};

function dr(t, e) {
  for (var r in t)
    if ({}.hasOwnProperty.call(t, r) && (!{}.hasOwnProperty.call(e, r) || t[r] !== e[r])) return !1;
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n) && !{}.hasOwnProperty.call(t, n)) return !1;
  return !0
}
var Rl = et(Pe());
import {
  isValidElement as nj
} from "./react-shim-eraudit.js";

function Nl(t) {
  "@babel/helpers - typeof";
  return Nl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Nl(t)
}
var ij = ["viewBox", "children"],
  Ih = ["aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "className", "color", "height", "id", "lang", "max", "media", "method", "min", "name", "style", "target", "width", "role", "tabIndex", "accentHeight", "accumulate", "additive", "alignmentBaseline", "allowReorder", "alphabetic", "amplitude", "arabicForm", "ascent", "attributeName", "attributeType", "autoReverse", "azimuth", "baseFrequency", "baselineShift", "baseProfile", "bbox", "begin", "bias", "by", "calcMode", "capHeight", "clip", "clipPath", "clipPathUnits", "clipRule", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "contentScriptType", "contentStyleType", "cursor", "cx", "cy", "d", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominantBaseline", "dur", "dx", "dy", "edgeMode", "elevation", "enableBackground", "end", "exponent", "externalResourcesRequired", "fill", "fillOpacity", "fillRule", "filter", "filterRes", "filterUnits", "floodColor", "floodOpacity", "focusable", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "format", "from", "fx", "fy", "g1", "g2", "glyphName", "glyphOrientationHorizontal", "glyphOrientationVertical", "glyphRef", "gradientTransform", "gradientUnits", "hanging", "horizAdvX", "horizOriginX", "href", "ideographic", "imageRendering", "in2", "in", "intercept", "k1", "k2", "k3", "k4", "k", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letterSpacing", "lightingColor", "limitingConeAngle", "local", "markerEnd", "markerHeight", "markerMid", "markerStart", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "mode", "numOctaves", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlinePosition", "overlineThickness", "paintOrder", "panose1", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointerEvents", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "r", "radius", "refX", "refY", "renderingIntent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "result", "rotate", "rx", "ry", "seed", "shapeRendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stopColor", "stopOpacity", "strikethroughPosition", "strikethroughThickness", "string", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textAnchor", "textDecoration", "textLength", "textRendering", "to", "transform", "u1", "u2", "underlinePosition", "underlineThickness", "unicode", "unicodeBidi", "unicodeRange", "unitsPerEm", "vAlphabetic", "values", "vectorEffect", "version", "vertAdvY", "vertOriginX", "vertOriginY", "vHanging", "vIdeographic", "viewTarget", "visibility", "vMathematical", "widths", "wordSpacing", "writingMode", "x1", "x2", "x", "xChannelSelector", "xHeight", "xlinkActuate", "xlinkArcrole", "xlinkHref", "xlinkRole", "xlinkShow", "xlinkTitle", "xlinkType", "xmlBase", "xmlLang", "xmlns", "xmlnsXlink", "xmlSpace", "y1", "y2", "y", "yChannelSelector", "z", "zoomAndPan", "ref", "key", "angle"],
  Ch = ["points", "pathLength"],
  tu = {
    svg: ij,
    polygon: Ch,
    polyline: Ch
  },
  eu = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"],
  Fr = function(e, r) {
    if (!e || typeof e == "function" || typeof e == "boolean") return null;
    var n = e;
    if (nj(e) && (n = e.props), !(0, Rl.default)(n)) return null;
    var i = {};
    return Object.keys(n).forEach(function(o) {
      eu.includes(o) && (i[o] = r || function(a) {
        return n[o](n, a)
      })
    }), i
  },
  oj = function(e, r, n) {
    return function(i) {
      return e(r, n, i), null
    }
  },
  $r = function(e, r, n) {
    if (!(0, Rl.default)(e) || Nl(e) !== "object") return null;
    var i = null;
    return Object.keys(e).forEach(function(o) {
      var a = e[o];
      eu.includes(o) && typeof a == "function" && (i || (i = {}), i[o] = oj(a, r, n))
    }), i
  };
var aj = ["children"],
  uj = ["children"];

function kh(t, e) {
  if (t == null) return {};
  var r = sj(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function sj(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Bl(t) {
  "@babel/helpers - typeof";
  return Bl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Bl(t)
}
var Dh = {
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
var je = function(e) {
    return typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : ""
  },
  Nh = null,
  Ll = null,
  zl = function t(e) {
    if (e === Nh && Array.isArray(Ll)) return Ll;
    var r = [];
    return Wl.forEach(e, function(n) {
      (0, En.default)(n) || ((0, Wh.isFragment)(n) ? r = r.concat(t(n.props.children)) : r.push(n))
    }), Ll = r, Nh = e, r
  };

function Wt(t, e) {
  var r = [],
    n = [];
  return Array.isArray(e) ? n = e.map(function(i) {
    return je(i)
  }) : n = [je(e)], zl(t).forEach(function(i) {
    var o = (0, ql.default)(i, "type.displayName") || (0, ql.default)(i, "type.name");
    n.indexOf(o) !== -1 && r.push(i)
  }), r
}

function Zt(t, e) {
  var r = Wt(t, e);
  return r && r[0]
}
var Fl = function(e) {
    if (!e || !e.props) return !1;
    var r = e.props,
      n = r.width,
      i = r.height;
    return !(!X(n) || n <= 0 || !X(i) || i <= 0)
  },
  cj = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"],
  fj = function(e) {
    return e && e.type && (0, Lh.default)(e.type) && cj.indexOf(e.type) >= 0
  },
  zh = function(e) {
    return e && Bl(e) === "object" && "clipDot" in e
  },
  pj = function(e, r, n, i) {
    var o, a = (o = tu === null || tu === void 0 ? void 0 : tu[i]) !== null && o !== void 0 ? o : [];
    return r.startsWith("data-") || !(0, Bh.default)(e) && (i && a.includes(r) || Ih.includes(r)) || n && eu.includes(r)
  };
var st = function(e, r, n) {
    if (!e || typeof e == "function" || typeof e == "boolean") return null;
    var i = e;
    if (lj(e) && (i = e.props), !(0, qh.default)(i)) return null;
    var o = {};
    return Object.keys(i).forEach(function(a) {
      var u;
      pj((u = i) === null || u === void 0 ? void 0 : u[a], a, r, n) && (o[a] = i[a])
    }), o
  },
  ru = function t(e, r) {
    if (e === r) return !0;
    var n = Wl.count(e);
    if (n !== Wl.count(r)) return !1;
    if (n === 0) return !0;
    if (n === 1) return Rh(Array.isArray(e) ? e[0] : e, Array.isArray(r) ? r[0] : r);
    for (var i = 0; i < n; i++) {
      var o = e[i],
        a = r[i];
      if (Array.isArray(o) || Array.isArray(a)) {
        if (!t(o, a)) return !1
      } else if (!Rh(o, a)) return !1
    }
    return !0
  },
  Rh = function(e, r) {
    if ((0, En.default)(e) && (0, En.default)(r)) return !0;
    if (!(0, En.default)(e) && !(0, En.default)(r)) {
      var n = e.props || {},
        i = n.children,
        o = kh(n, aj),
        a = r.props || {},
        u = a.children,
        s = kh(a, uj);
      return i && u ? dr(o, s) && ru(i, u) : !i && !u ? dr(o, s) : !1
    }
    return !1
  },
  $l = function(e, r) {
    var n = [],
      i = {};
    return zl(e).forEach(function(o, a) {
      if (fj(o)) n.push(o);
      else if (o) {
        var u = je(o.type),
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
  Fh = function(e) {
    var r = e && e.type;
    return r && Dh[r] ? Dh[r] : null
  },
  $h = function(e, r) {
    return zl(r).indexOf(e)
  };
var dj = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];

function Hl() {
  return Hl = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Hl.apply(this, arguments)
}

function mj(t, e) {
  if (t == null) return {};
  var r = hj(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function hj(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Zi(t) {
  var e = t.children,
    r = t.width,
    n = t.height,
    i = t.viewBox,
    o = t.className,
    a = t.style,
    u = t.title,
    s = t.desc,
    l = mj(t, dj),
    f = i || {
      width: r,
      height: n,
      x: 0,
      y: 0
    },
    c = ut("recharts-surface", o);
  return Ul.createElement("svg", Hl({}, st(l, !0, "svg"), {
    className: c,
    width: r,
    height: n,
    style: a,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), Ul.createElement("title", null, u), Ul.createElement("desc", null, s), e)
}
import Uh from "./react-shim-eraudit.js";
var yj = ["children", "className"];

function Gl() {
  return Gl = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Gl.apply(this, arguments)
}

function vj(t, e) {
  if (t == null) return {};
  var r = gj(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function gj(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var bt = Uh.forwardRef(function(t, e) {
  var r = t.children,
    n = t.className,
    i = vj(t, yj),
    o = ut("recharts-layer", n);
  return Uh.createElement("g", Gl({
    className: o
  }, st(i, !0), {
    ref: e
  }), r)
});
import uo, {
  PureComponent as ED
} from "./react-shim-eraudit.js";
var Ec = et(Lt());
import er, {
  PureComponent as IM
} from "./react-shim-eraudit.js";
var bj = !1,
  ue = function(e, r) {
    for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) i[o - 2] = arguments[o];
    if (bj && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !e))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var a = 0;
        console.warn(r.replace(/%s/g, function() {
          return i[a++]
        }))
      }
  };
var _c = et(nu());
import bM from "./react-shim-eraudit.js";

function At(t) {
  return function() {
    return t
  }
}
var Yl = Math.cos;
var Ji = Math.sin,
  Gt = Math.sqrt;
var Ur = Math.PI,
  W9 = Ur / 2,
  jn = 2 * Ur;
var Zl = Math.PI,
  Jl = 2 * Zl,
  Hr = 1e-6,
  nM = Jl - Hr;

function fy(t) {
  this._ += t[0];
  for (let e = 1, r = t.length; e < r; ++e) this._ += arguments[e] + t[e]
}

function iM(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return fy;
  let r = 10 ** e;
  return function(n) {
    this._ += n[0];
    for (let i = 1, o = n.length; i < o; ++i) this._ += Math.round(arguments[i] * r) / r + n[i]
  }
}
var Gr = class {
  constructor(e) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? fy : iM(e)
  }
  moveTo(e, r) {
    this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+r}`
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`)
  }
  lineTo(e, r) {
    this._append`L${this._x1=+e},${this._y1=+r}`
  }
  quadraticCurveTo(e, r, n, i) {
    this._append`Q${+e},${+r},${this._x1=+n},${this._y1=+i}`
  }
  bezierCurveTo(e, r, n, i, o, a) {
    this._append`C${+e},${+r},${+n},${+i},${this._x1=+o},${this._y1=+a}`
  }
  arcTo(e, r, n, i, o) {
    if (e = +e, r = +r, n = +n, i = +i, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let a = this._x1,
      u = this._y1,
      s = n - e,
      l = i - r,
      f = a - e,
      c = u - r,
      p = f * f + c * c;
    if (this._x1 === null) this._append`M${this._x1=e},${this._y1=r}`;
    else if (p > Hr)
      if (!(Math.abs(c * s - l * f) > Hr) || !o) this._append`L${this._x1=e},${this._y1=r}`;
      else {
        let d = n - a,
          y = i - u,
          m = s * s + l * l,
          v = d * d + y * y,
          x = Math.sqrt(m),
          w = Math.sqrt(p),
          S = o * Math.tan((Zl - Math.acos((m + p - v) / (2 * x * w))) / 2),
          P = S / w,
          h = S / x;
        Math.abs(P - 1) > Hr && this._append`L${e+P*f},${r+P*c}`, this._append`A${o},${o},0,0,${+(c*d>f*y)},${this._x1=e+h*s},${this._y1=r+h*l}`
      }
  }
  arc(e, r, n, i, o, a) {
    if (e = +e, r = +r, n = +n, a = !!a, n < 0) throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(i),
      s = n * Math.sin(i),
      l = e + u,
      f = r + s,
      c = 1 ^ a,
      p = a ? i - o : o - i;
    this._x1 === null ? this._append`M${l},${f}` : (Math.abs(this._x1 - l) > Hr || Math.abs(this._y1 - f) > Hr) && this._append`L${l},${f}`, n && (p < 0 && (p = p % Jl + Jl), p > nM ? this._append`A${n},${n},0,1,${c},${e-u},${r-s}A${n},${n},0,1,${c},${this._x1=l},${this._y1=f}` : p > Hr && this._append`A${n},${n},0,${+(p>=Zl)},${c},${this._x1=e+n*Math.cos(o)},${this._y1=r+n*Math.sin(o)}`)
  }
  rect(e, r, n, i) {
    this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+r}h${n=+n}v${+i}h${-n}Z`
  }
  toString() {
    return this._
  }
};

function py() {
  return new Gr
}
py.prototype = Gr.prototype;

function Mn(t) {
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
  }, () => new Gr(e)
}
var V9 = Array.prototype.slice;

function Cn(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t)
}

function dy(t) {
  this._context = t
}
dy.prototype = {
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

function _r(t) {
  return new dy(t)
}

function iu(t) {
  return t[0]
}

function ou(t) {
  return t[1]
}

function Qi(t, e) {
  var r = At(!0),
    n = null,
    i = _r,
    o = null,
    a = Mn(u);
  t = typeof t == "function" ? t : t === void 0 ? iu : At(t), e = typeof e == "function" ? e : e === void 0 ? ou : At(e);

  function u(s) {
    var l, f = (s = Cn(s)).length,
      c, p = !1,
      d;
    for (n == null && (o = i(d = a())), l = 0; l <= f; ++l) !(l < f && r(c = s[l], l, s)) === p && ((p = !p) ? o.lineStart() : o.lineEnd()), p && o.point(+t(c, l, s), +e(c, l, s));
    if (d) return o = null, d + "" || null
  }
  return u.x = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : At(+s), u) : t
  }, u.y = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : At(+s), u) : e
  }, u.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : At(!!s), u) : r
  }, u.curve = function(s) {
    return arguments.length ? (i = s, n != null && (o = i(n)), u) : i
  }, u.context = function(s) {
    return arguments.length ? (s == null ? n = o = null : o = i(n = s), u) : n
  }, u
}

function In(t, e, r) {
  var n = null,
    i = At(!0),
    o = null,
    a = _r,
    u = null,
    s = Mn(l);
  t = typeof t == "function" ? t : t === void 0 ? iu : At(+t), e = typeof e == "function" ? e : e === void 0 ? At(0) : At(+e), r = typeof r == "function" ? r : r === void 0 ? ou : At(+r);

  function l(c) {
    var p, d, y, m = (c = Cn(c)).length,
      v, x = !1,
      w, S = new Array(m),
      P = new Array(m);
    for (o == null && (u = a(w = s())), p = 0; p <= m; ++p) {
      if (!(p < m && i(v = c[p], p, c)) === x)
        if (x = !x) d = p, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), y = p - 1; y >= d; --y) u.point(S[y], P[y]);
          u.lineEnd(), u.areaEnd()
        } x && (S[p] = +t(v, p, c), P[p] = +e(v, p, c), u.point(n ? +n(v, p, c) : S[p], r ? +r(v, p, c) : P[p]))
    }
    if (w) return u = null, w + "" || null
  }

  function f() {
    return Qi().defined(i).curve(a).context(o)
  }
  return l.x = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : At(+c), n = null, l) : t
  }, l.x0 = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : At(+c), l) : t
  }, l.x1 = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : At(+c), l) : n
  }, l.y = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : At(+c), r = null, l) : e
  }, l.y0 = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : At(+c), l) : e
  }, l.y1 = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : At(+c), l) : r
  }, l.lineX0 = l.lineY0 = function() {
    return f().x(t).y(e)
  }, l.lineY1 = function() {
    return f().x(t).y(r)
  }, l.lineX1 = function() {
    return f().x(n).y(e)
  }, l.defined = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : At(!!c), l) : i
  }, l.curve = function(c) {
    return arguments.length ? (a = c, o != null && (u = a(o)), l) : a
  }, l.context = function(c) {
    return arguments.length ? (c == null ? o = u = null : u = a(o = c), l) : o
  }, l
}
var au = class {
  constructor(e, r) {
    this._context = e, this._x = r
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
  point(e, r) {
    switch (e = +e, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(e, r) : this._context.moveTo(e, r);
        break
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, r, e, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, e, this._y0, e, r);
        break
      }
    }
    this._x0 = e, this._y0 = r
  }
};

function Ql(t) {
  return new au(t, !0)
}

function tc(t) {
  return new au(t, !1)
}
var kn = {
  draw(t, e) {
    let r = Gt(e / Ur);
    t.moveTo(r, 0), t.arc(0, 0, r, 0, jn)
  }
};
var ec = {
  draw(t, e) {
    let r = Gt(e / 5) / 2;
    t.moveTo(-3 * r, -r), t.lineTo(-r, -r), t.lineTo(-r, -3 * r), t.lineTo(r, -3 * r), t.lineTo(r, -r), t.lineTo(3 * r, -r), t.lineTo(3 * r, r), t.lineTo(r, r), t.lineTo(r, 3 * r), t.lineTo(-r, 3 * r), t.lineTo(-r, r), t.lineTo(-3 * r, r), t.closePath()
  }
};
var my = Gt(1 / 3),
  oM = my * 2,
  rc = {
    draw(t, e) {
      let r = Gt(e / oM),
        n = r * my;
      t.moveTo(0, -r), t.lineTo(n, 0), t.lineTo(0, r), t.lineTo(-n, 0), t.closePath()
    }
  };
var nc = {
  draw(t, e) {
    let r = Gt(e),
      n = -r / 2;
    t.rect(n, n, r, r)
  }
};
var aM = .8908130915292852,
  hy = Ji(Ur / 10) / Ji(7 * Ur / 10),
  uM = Ji(jn / 10) * hy,
  sM = -Yl(jn / 10) * hy,
  ic = {
    draw(t, e) {
      let r = Gt(e * aM),
        n = uM * r,
        i = sM * r;
      t.moveTo(0, -r), t.lineTo(n, i);
      for (let o = 1; o < 5; ++o) {
        let a = jn * o / 5,
          u = Yl(a),
          s = Ji(a);
        t.lineTo(s * r, -u * r), t.lineTo(u * n - s * i, s * n + u * i)
      }
      t.closePath()
    }
  };
var oc = Gt(3),
  ac = {
    draw(t, e) {
      let r = -Gt(e / (oc * 3));
      t.moveTo(0, r * 2), t.lineTo(-oc * r, -r), t.lineTo(oc * r, -r), t.closePath()
    }
  };
var Me = -.5,
  Ce = Gt(3) / 2,
  uc = 1 / Gt(12),
  lM = (uc / 2 + 1) * 3,
  sc = {
    draw(t, e) {
      let r = Gt(e / lM),
        n = r / 2,
        i = r * uc,
        o = n,
        a = r * uc + r,
        u = -o,
        s = a;
      t.moveTo(n, i), t.lineTo(o, a), t.lineTo(u, s), t.lineTo(Me * n - Ce * i, Ce * n + Me * i), t.lineTo(Me * o - Ce * a, Ce * o + Me * a), t.lineTo(Me * u - Ce * s, Ce * u + Me * s), t.lineTo(Me * n + Ce * i, Me * i - Ce * n), t.lineTo(Me * o + Ce * a, Me * a - Ce * o), t.lineTo(Me * u + Ce * s, Me * s - Ce * u), t.closePath()
    }
  };

function uu(t, e) {
  let r = null,
    n = Mn(i);
  t = typeof t == "function" ? t : At(t || kn), e = typeof e == "function" ? e : At(e === void 0 ? 64 : +e);

  function i() {
    let o;
    if (r || (r = o = n()), t.apply(this, arguments).draw(r, +e.apply(this, arguments)), o) return r = null, o + "" || null
  }
  return i.type = function(o) {
    return arguments.length ? (t = typeof o == "function" ? o : At(o), i) : t
  }, i.size = function(o) {
    return arguments.length ? (e = typeof o == "function" ? o : At(+o), i) : e
  }, i.context = function(o) {
    return arguments.length ? (r = o ?? null, i) : r
  }, i
}

function Dn() {}

function Nn(t, e, r) {
  t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + e) / 6, (t._y0 + 4 * t._y1 + r) / 6)
}

function yy(t) {
  this._context = t
}
yy.prototype = {
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
        Nn(this, this._x1, this._y1);
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
        Nn(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function lc(t) {
  return new yy(t)
}

function vy(t) {
  this._context = t
}
vy.prototype = {
  areaStart: Dn,
  areaEnd: Dn,
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
        Nn(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function cc(t) {
  return new vy(t)
}

function gy(t) {
  this._context = t
}
gy.prototype = {
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
        Nn(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function fc(t) {
  return new gy(t)
}

function by(t) {
  this._context = t
}
by.prototype = {
  areaStart: Dn,
  areaEnd: Dn,
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

function pc(t) {
  return new by(t)
}

function xy(t) {
  return t < 0 ? -1 : 1
}

function wy(t, e, r) {
  var n = t._x1 - t._x0,
    i = e - t._x1,
    o = (t._y1 - t._y0) / (n || i < 0 && -0),
    a = (r - t._y1) / (i || n < 0 && -0),
    u = (o * i + a * n) / (n + i);
  return (xy(o) + xy(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0
}

function Oy(t, e) {
  var r = t._x1 - t._x0;
  return r ? (3 * (t._y1 - t._y0) / r - e) / 2 : e
}

function dc(t, e, r) {
  var n = t._x0,
    i = t._y0,
    o = t._x1,
    a = t._y1,
    u = (o - n) / 3;
  t._context.bezierCurveTo(n + u, i + u * e, o - u, a - u * r, o, a)
}

function su(t) {
  this._context = t
}
su.prototype = {
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
        dc(this, this._t0, Oy(this, this._t0));
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
          this._point = 3, dc(this, Oy(this, r = wy(this, t, e)), r);
          break;
        default:
          dc(this, this._t0, r = wy(this, t, e));
          break
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = r
    }
  }
};

function Sy(t) {
  this._context = new Ay(t)
}(Sy.prototype = Object.create(su.prototype)).point = function(t, e) {
  su.prototype.point.call(this, e, t)
};

function Ay(t) {
  this._context = t
}
Ay.prototype = {
  moveTo: function(t, e) {
    this._context.moveTo(e, t)
  },
  closePath: function() {
    this._context.closePath()
  },
  lineTo: function(t, e) {
    this._context.lineTo(e, t)
  },
  bezierCurveTo: function(t, e, r, n, i, o) {
    this._context.bezierCurveTo(e, t, n, r, o, i)
  }
};

function mc(t) {
  return new su(t)
}

function hc(t) {
  return new Sy(t)
}

function Py(t) {
  this._context = t
}
Py.prototype = {
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
        for (var n = _y(t), i = _y(e), o = 0, a = 1; a < r; ++o, ++a) this._context.bezierCurveTo(n[0][o], i[0][o], n[1][o], i[1][o], t[a], e[a]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e)
  }
};

function _y(t) {
  var e, r = t.length - 1,
    n, i = new Array(r),
    o = new Array(r),
    a = new Array(r);
  for (i[0] = 0, o[0] = 2, a[0] = t[0] + 2 * t[1], e = 1; e < r - 1; ++e) i[e] = 1, o[e] = 4, a[e] = 4 * t[e] + 2 * t[e + 1];
  for (i[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], e = 1; e < r; ++e) n = i[e] / o[e - 1], o[e] -= n, a[e] -= n * a[e - 1];
  for (i[r - 1] = a[r - 1] / o[r - 1], e = r - 2; e >= 0; --e) i[e] = (a[e] - i[e + 1]) / o[e];
  for (o[r - 1] = (t[r] + i[r - 1]) / 2, e = 0; e < r - 1; ++e) o[e] = 2 * t[e + 1] - i[e + 1];
  return [i, o]
}

function yc(t) {
  return new Py(t)
}

function lu(t, e) {
  this._context = t, this._t = e
}
lu.prototype = {
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

function vc(t) {
  return new lu(t, .5)
}

function gc(t) {
  return new lu(t, 0)
}

function bc(t) {
  return new lu(t, 1)
}

function Ie(t, e) {
  if ((a = t.length) > 1)
    for (var r = 1, n, i, o = t[e[0]], a, u = o.length; r < a; ++r)
      for (i = o, o = t[e[r]], n = 0; n < u; ++n) o[n][1] += o[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1]
}

function Rn(t) {
  for (var e = t.length, r = new Array(e); --e >= 0;) r[e] = e;
  return r
}

function cM(t, e) {
  return t[e]
}

function fM(t) {
  let e = [];
  return e.key = t, e
}

function xc() {
  var t = At([]),
    e = Rn,
    r = Ie,
    n = cM;

  function i(o) {
    var a = Array.from(t.apply(this, arguments), fM),
      u, s = a.length,
      l = -1,
      f;
    for (let c of o)
      for (u = 0, ++l; u < s; ++u)(a[u][l] = [0, +n(c, a[u].key, l, o)]).data = c;
    for (u = 0, f = Cn(e(a)); u < s; ++u) a[f[u]].index = u;
    return r(a, f), a
  }
  return i.keys = function(o) {
    return arguments.length ? (t = typeof o == "function" ? o : At(Array.from(o)), i) : t
  }, i.value = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : At(+o), i) : n
  }, i.order = function(o) {
    return arguments.length ? (e = o == null ? Rn : typeof o == "function" ? o : At(Array.from(o)), i) : e
  }, i.offset = function(o) {
    return arguments.length ? (r = o ?? Ie, i) : r
  }, i
}

function wc(t, e) {
  if ((n = t.length) > 0) {
    for (var r, n, i = 0, o = t[0].length, a; i < o; ++i) {
      for (a = r = 0; r < n; ++r) a += t[r][i][1] || 0;
      if (a)
        for (r = 0; r < n; ++r) t[r][i][1] /= a
    }
    Ie(t, e)
  }
}

function Oc(t, e) {
  if ((i = t.length) > 0) {
    for (var r = 0, n = t[e[0]], i, o = n.length; r < o; ++r) {
      for (var a = 0, u = 0; a < i; ++a) u += t[a][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2
    }
    Ie(t, e)
  }
}

function Sc(t, e) {
  if (!(!((a = t.length) > 0) || !((o = (i = t[e[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, o, a; n < o; ++n) {
      for (var u = 0, s = 0, l = 0; u < a; ++u) {
        for (var f = t[e[u]], c = f[n][1] || 0, p = f[n - 1][1] || 0, d = (c - p) / 2, y = 0; y < u; ++y) {
          var m = t[e[y]],
            v = m[n][1] || 0,
            x = m[n - 1][1] || 0;
          d += v - x
        }
        s += c, l += d * c
      }
      i[n - 1][1] += i[n - 1][0] = r, s && (r -= l / s)
    }
    i[n - 1][1] += i[n - 1][0] = r, Ie(t, e)
  }
}

function to(t) {
  "@babel/helpers - typeof";
  return to = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, to(t)
}
var dM = ["type", "size", "sizeType"];

function Ac() {
  return Ac = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ac.apply(this, arguments)
}

function Ty(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ey(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ty(Object(r), !0).forEach(function(n) {
      mM(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Ty(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function mM(t, e, r) {
  return e = hM(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function hM(t) {
  var e = yM(t, "string");
  return to(e) == "symbol" ? e : e + ""
}

function yM(t, e) {
  if (to(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (to(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function vM(t, e) {
  if (t == null) return {};
  var r = gM(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function gM(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var jy = {
    symbolCircle: kn,
    symbolCross: ec,
    symbolDiamond: rc,
    symbolSquare: nc,
    symbolStar: ic,
    symbolTriangle: ac,
    symbolWye: sc
  },
  xM = Math.PI / 180,
  wM = function(e) {
    var r = "symbol".concat((0, _c.default)(e));
    return jy[r] || kn
  },
  OM = function(e, r, n) {
    if (r === "area") return e;
    switch (n) {
      case "cross":
        return 5 * e * e / 9;
      case "diamond":
        return .5 * e * e / Math.sqrt(3);
      case "square":
        return e * e;
      case "star": {
        var i = 18 * xM;
        return 1.25 * e * e * (Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2))
      }
      case "triangle":
        return Math.sqrt(3) * e * e / 4;
      case "wye":
        return (21 - 10 * Math.sqrt(3)) * e * e / 8;
      default:
        return Math.PI * e * e / 4
    }
  },
  SM = function(e, r) {
    jy["symbol".concat((0, _c.default)(e))] = r
  },
  eo = function(e) {
    var r = e.type,
      n = r === void 0 ? "circle" : r,
      i = e.size,
      o = i === void 0 ? 64 : i,
      a = e.sizeType,
      u = a === void 0 ? "area" : a,
      s = vM(e, dM),
      l = Ey(Ey({}, s), {}, {
        type: n,
        size: o,
        sizeType: u
      }),
      f = function() {
        var v = wM(n),
          x = uu().type(v).size(OM(o, u, n));
        return x()
      },
      c = l.className,
      p = l.cx,
      d = l.cy,
      y = st(l, !0);
    return p === +p && d === +d && o === +o ? bM.createElement("path", Ac({}, y, {
      className: ut("recharts-symbols", c),
      transform: "translate(".concat(p, ", ").concat(d, ")"),
      d: f()
    })) : null
  };
eo.registerSymbol = SM;

function Ln(t) {
  "@babel/helpers - typeof";
  return Ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ln(t)
}

function Pc() {
  return Pc = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Pc.apply(this, arguments)
}

function My(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function AM(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? My(Object(r), !0).forEach(function(n) {
      ro(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : My(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function _M(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Cy(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, ky(n.key), n)
  }
}

function PM(t, e, r) {
  return e && Cy(t.prototype, e), r && Cy(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function TM(t, e, r) {
  return e = cu(e), EM(t, Iy() ? Reflect.construct(e, r || [], cu(t).constructor) : e.apply(t, r))
}

function EM(t, e) {
  if (e && (Ln(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return jM(t)
}

function jM(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Iy() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Iy = function() {
    return !!t
  })()
}

function cu(t) {
  return cu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, cu(t)
}

function MM(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Tc(t, e)
}

function Tc(t, e) {
  return Tc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Tc(t, e)
}

function ro(t, e, r) {
  return e = ky(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function ky(t) {
  var e = CM(t, "string");
  return Ln(e) == "symbol" ? e : e + ""
}

function CM(t, e) {
  if (Ln(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ln(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var ke = 32,
  fu = function(t) {
    function e() {
      return _M(this, e), TM(this, e, arguments)
    }
    return MM(e, t), PM(e, [{
      key: "renderIcon",
      value: function(n) {
        var i = this.props.inactiveColor,
          o = ke / 2,
          a = ke / 6,
          u = ke / 3,
          s = n.inactive ? i : n.color;
        if (n.type === "plainline") return er.createElement("line", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          strokeDasharray: n.payload.strokeDasharray,
          x1: 0,
          y1: o,
          x2: ke,
          y2: o,
          className: "recharts-legend-icon"
        });
        if (n.type === "line") return er.createElement("path", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          d: "M0,".concat(o, "h").concat(u, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * u, ",").concat(o, `
            H`).concat(ke, "M").concat(2 * u, ",").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(u, ",").concat(o),
          className: "recharts-legend-icon"
        });
        if (n.type === "rect") return er.createElement("path", {
          stroke: "none",
          fill: s,
          d: "M0,".concat(ke / 8, "h").concat(ke, "v").concat(ke * 3 / 4, "h").concat(-ke, "z"),
          className: "recharts-legend-icon"
        });
        if (er.isValidElement(n.legendIcon)) {
          var l = AM({}, n);
          return delete l.legendIcon, er.cloneElement(n.legendIcon, l)
        }
        return er.createElement(eo, {
          fill: s,
          cx: o,
          cy: o,
          size: ke,
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
            width: ke,
            height: ke
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
        return o.map(function(d, y) {
          var m = d.formatter || s,
            v = ut(ro(ro({
              "recharts-legend-item": !0
            }, "legend-item-".concat(y), !0), "inactive", d.inactive));
          if (d.type === "none") return null;
          var x = (0, Ec.default)(d.value) ? null : d.value;
          ue(!(0, Ec.default)(d.value), `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`);
          var w = d.inactive ? l : d.color;
          return er.createElement("li", Pc({
            className: v,
            style: c,
            key: "legend-item-".concat(y)
          }, $r(n.props, d, y)), er.createElement(Zi, {
            width: a,
            height: a,
            viewBox: f,
            style: p
          }, n.renderIcon(d)), er.createElement("span", {
            className: "recharts-legend-item-text",
            style: {
              color: w
            }
          }, m ? m(x, d, y) : x))
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
        return er.createElement("ul", {
          className: "recharts-default-legend",
          style: u
        }, this.renderItems())
      }
    }])
  }(IM);
ro(fu, "displayName", "Legend");
ro(fu, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Jc = et(vb()),
  gb = et(Lt());

function bu(t, e, r) {
  return e === !0 ? (0, Jc.default)(t, r) : (0, gb.default)(e) ? (0, Jc.default)(t, e) : t
}

function $n(t) {
  "@babel/helpers - typeof";
  return $n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, $n(t)
}
var gD = ["ref"];

function bb(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function hr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? bb(Object(r), !0).forEach(function(n) {
      wu(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : bb(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function bD(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function xb(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Sb(n.key), n)
  }
}

function xD(t, e, r) {
  return e && xb(t.prototype, e), r && xb(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function wD(t, e, r) {
  return e = xu(e), OD(t, Ob() ? Reflect.construct(e, r || [], xu(t).constructor) : e.apply(t, r))
}

function OD(t, e) {
  if (e && ($n(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return SD(t)
}

function SD(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Ob() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Ob = function() {
    return !!t
  })()
}

function xu(t) {
  return xu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, xu(t)
}

function AD(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Qc(t, e)
}

function Qc(t, e) {
  return Qc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Qc(t, e)
}

function wu(t, e, r) {
  return e = Sb(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Sb(t) {
  var e = _D(t, "string");
  return $n(e) == "symbol" ? e : e + ""
}

function _D(t, e) {
  if ($n(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if ($n(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function PD(t, e) {
  if (t == null) return {};
  var r = TD(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function TD(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function jD(t) {
  return t.value
}

function MD(t, e) {
  if (uo.isValidElement(t)) return uo.cloneElement(t, e);
  if (typeof t == "function") return uo.createElement(t, e);
  var r = e.ref,
    n = PD(e, gD);
  return uo.createElement(fu, n)
}
var wb = 1,
  De = function(t) {
    function e() {
      var r;
      bD(this, e);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = wD(this, e, [].concat(i)), wu(r, "lastBoundingBox", {
        width: -1,
        height: -1
      }), r
    }
    return AD(e, t), xD(e, [{
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
        i ? (Math.abs(i.width - this.lastBoundingBox.width) > wb || Math.abs(i.height - this.lastBoundingBox.height) > wb) && (this.lastBoundingBox.width = i.width, this.lastBoundingBox.height = i.height, n && n(i)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null))
      }
    }, {
      key: "getBBoxSnapshot",
      value: function() {
        return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? hr({}, this.lastBoundingBox) : {
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
            var d = this.getBBoxSnapshot();
            c = {
              left: ((l || 0) - d.width) / 2
            }
          } else c = a === "right" ? {
            right: s && s.right || 0
          } : {
            left: s && s.left || 0
          };
        if (!n || (n.top === void 0 || n.top === null) && (n.bottom === void 0 || n.bottom === null))
          if (u === "middle") {
            var y = this.getBBoxSnapshot();
            p = {
              top: ((f || 0) - y.height) / 2
            }
          } else p = u === "bottom" ? {
            bottom: s && s.bottom || 0
          } : {
            top: s && s.top || 0
          };
        return hr(hr({}, c), p)
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
          c = hr(hr({
            position: "absolute",
            width: a || "auto",
            height: u || "auto"
          }, this.getDefaultPosition(s)), s);
        return uo.createElement("div", {
          className: "recharts-legend-wrapper",
          style: c,
          ref: function(d) {
            n.wrapperNode = d
          }
        }, MD(o, hr(hr({}, this.props), {}, {
          payload: bu(f, l, jD)
        })))
      }
    }], [{
      key: "getWithHeight",
      value: function(n, i) {
        var o = hr(hr({}, this.defaultProps), n.props),
          a = o.layout;
        return a === "vertical" && X(n.props.height) ? {
          height: n.props.height
        } : a === "horizontal" ? {
          width: n.props.width || i
        } : null
      }
    }])
  }(ED);
wu(De, "displayName", "Legend");
wu(De, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
import po, {
  PureComponent as hR
} from "./react-shim-eraudit.js";
var yx = et(Su()),
  vx = et(Te());
import yr from "./react-shim-eraudit.js";

function lo(t) {
  "@babel/helpers - typeof";
  return lo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, lo(t)
}

function uf() {
  return uf = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, uf.apply(this, arguments)
}

function BN(t, e) {
  return FN(t) || zN(t, e) || WN(t, e) || qN()
}

function qN() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function WN(t, e) {
  if (t) {
    if (typeof t == "string") return mx(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return mx(t, e)
  }
}

function mx(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function zN(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function FN(t) {
  if (Array.isArray(t)) return t
}

function hx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function af(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? hx(Object(r), !0).forEach(function(n) {
      $N(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : hx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function $N(t, e, r) {
  return e = UN(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function UN(t) {
  var e = HN(t, "string");
  return lo(e) == "symbol" ? e : e + ""
}

function HN(t, e) {
  if (lo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (lo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function GN(t) {
  return Array.isArray(t) && Mt(t[0]) && Mt(t[1]) ? t.join(" ~ ") : t
}
var gx = function(e) {
  var r = e.separator,
    n = r === void 0 ? " : " : r,
    i = e.contentStyle,
    o = i === void 0 ? {} : i,
    a = e.itemStyle,
    u = a === void 0 ? {} : a,
    s = e.labelStyle,
    l = s === void 0 ? {} : s,
    f = e.payload,
    c = e.formatter,
    p = e.itemSorter,
    d = e.wrapperClassName,
    y = e.labelClassName,
    m = e.label,
    v = e.labelFormatter,
    x = e.accessibilityLayer,
    w = x === void 0 ? !1 : x,
    S = function() {
      if (f && f.length) {
        var R = {
            padding: 0,
            margin: 0
          },
          H = (p ? (0, yx.default)(f, p) : f).map(function(F, z) {
            if (F.type === "none") return null;
            var b = af({
                display: "block",
                paddingTop: 4,
                paddingBottom: 4,
                color: F.color || "#000"
              }, u),
              O = F.formatter || c || GN,
              T = F.value,
              A = F.name,
              M = T,
              E = A;
            if (O && M != null && E != null) {
              var D = O(T, A, F, z, f);
              if (Array.isArray(D)) {
                var L = BN(D, 2);
                M = L[0], E = L[1]
              } else M = D
            }
            return yr.createElement("li", {
              className: "recharts-tooltip-item",
              key: "tooltip-item-".concat(z),
              style: b
            }, Mt(E) ? yr.createElement("span", {
              className: "recharts-tooltip-item-name"
            }, E) : null, Mt(E) ? yr.createElement("span", {
              className: "recharts-tooltip-item-separator"
            }, n) : null, yr.createElement("span", {
              className: "recharts-tooltip-item-value"
            }, M), yr.createElement("span", {
              className: "recharts-tooltip-item-unit"
            }, F.unit || ""))
          });
        return yr.createElement("ul", {
          className: "recharts-tooltip-item-list",
          style: R
        }, H)
      }
      return null
    },
    P = af({
      margin: 0,
      padding: 10,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      whiteSpace: "nowrap"
    }, o),
    h = af({
      margin: 0
    }, l),
    g = !(0, vx.default)(m),
    _ = g ? m : "",
    C = ut("recharts-default-tooltip", d),
    k = ut("recharts-tooltip-label", y);
  g && v && f !== void 0 && f !== null && (_ = v(m, f));
  var B = w ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return yr.createElement("div", uf({
    className: C,
    style: P
  }, B), yr.createElement("p", {
    className: k,
    style: h
  }, yr.isValidElement(_) ? _ : "".concat(_)), S())
};
import oR, {
  PureComponent as aR
} from "./react-shim-eraudit.js";

function fo(t) {
  "@babel/helpers - typeof";
  return fo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, fo(t)
}

function Au(t, e, r) {
  return e = KN(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function KN(t) {
  var e = VN(t, "string");
  return fo(e) == "symbol" ? e : e + ""
}

function VN(t, e) {
  if (fo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (fo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var co = "recharts-tooltip-wrapper",
  XN = {
    visibility: "hidden"
  };

function YN(t) {
  var e = t.coordinate,
    r = t.translateX,
    n = t.translateY;
  return ut(co, Au(Au(Au(Au({}, "".concat(co, "-right"), X(r) && e && X(e.x) && r >= e.x), "".concat(co, "-left"), X(r) && e && X(e.x) && r < e.x), "".concat(co, "-bottom"), X(n) && e && X(e.y) && n >= e.y), "".concat(co, "-top"), X(n) && e && X(e.y) && n < e.y))
}

function bx(t) {
  var e = t.allowEscapeViewBox,
    r = t.coordinate,
    n = t.key,
    i = t.offsetTopLeft,
    o = t.position,
    a = t.reverseDirection,
    u = t.tooltipDimension,
    s = t.viewBox,
    l = t.viewBoxDimension;
  if (o && X(o[n])) return o[n];
  var f = r[n] - u - i,
    c = r[n] + i;
  if (e[n]) return a[n] ? f : c;
  if (a[n]) {
    var p = f,
      d = s[n];
    return p < d ? Math.max(c, s[n]) : Math.max(f, s[n])
  }
  var y = c + u,
    m = s[n] + l;
  return y > m ? Math.max(f, s[n]) : Math.max(c, s[n])
}

function ZN(t) {
  var e = t.translateX,
    r = t.translateY,
    n = t.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(e, "px, ").concat(r, "px, 0)") : "translate(".concat(e, "px, ").concat(r, "px)")
  }
}

function xx(t) {
  var e = t.allowEscapeViewBox,
    r = t.coordinate,
    n = t.offsetTopLeft,
    i = t.position,
    o = t.reverseDirection,
    a = t.tooltipBox,
    u = t.useTranslate3d,
    s = t.viewBox,
    l, f, c;
  return a.height > 0 && a.width > 0 && r ? (f = bx({
    allowEscapeViewBox: e,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), c = bx({
    allowEscapeViewBox: e,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), l = ZN({
    translateX: f,
    translateY: c,
    useTranslate3d: u
  })) : l = XN, {
    cssProperties: l,
    cssClasses: YN({
      translateX: f,
      translateY: c,
      coordinate: r
    })
  }
}

function Un(t) {
  "@babel/helpers - typeof";
  return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Un(t)
}

function wx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ox(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? wx(Object(r), !0).forEach(function(n) {
      lf(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : wx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function JN(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Sx(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Px(n.key), n)
  }
}

function QN(t, e, r) {
  return e && Sx(t.prototype, e), r && Sx(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function tR(t, e, r) {
  return e = _u(e), eR(t, _x() ? Reflect.construct(e, r || [], _u(t).constructor) : e.apply(t, r))
}

function eR(t, e) {
  if (e && (Un(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return rR(t)
}

function rR(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function _x() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (_x = function() {
    return !!t
  })()
}

function _u(t) {
  return _u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, _u(t)
}

function nR(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && sf(t, e)
}

function sf(t, e) {
  return sf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, sf(t, e)
}

function lf(t, e, r) {
  return e = Px(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Px(t) {
  var e = iR(t, "string");
  return Un(e) == "symbol" ? e : e + ""
}

function iR(t, e) {
  if (Un(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Un(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Ax = 1,
  Tx = function(t) {
    function e() {
      var r;
      JN(this, e);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = tR(this, e, [].concat(i)), lf(r, "state", {
        dismissed: !1,
        dismissedAtCoordinate: {
          x: 0,
          y: 0
        },
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      }), lf(r, "handleKeyDown", function(a) {
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
    return nR(e, t), QN(e, [{
      key: "updateBBox",
      value: function() {
        if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
          var n = this.wrapperNode.getBoundingClientRect();
          (Math.abs(n.width - this.state.lastBoundingBox.width) > Ax || Math.abs(n.height - this.state.lastBoundingBox.height) > Ax) && this.setState({
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
          d = i.offset,
          y = i.position,
          m = i.reverseDirection,
          v = i.useTranslate3d,
          x = i.viewBox,
          w = i.wrapperStyle,
          S = xx({
            allowEscapeViewBox: a,
            coordinate: f,
            offsetTopLeft: d,
            position: y,
            reverseDirection: m,
            tooltipBox: this.state.lastBoundingBox,
            useTranslate3d: v,
            viewBox: x
          }),
          P = S.cssClasses,
          h = S.cssProperties,
          g = Ox(Ox({
            transition: p && o ? "transform ".concat(u, "ms ").concat(s) : void 0
          }, h), {}, {
            pointerEvents: "none",
            visibility: !this.state.dismissed && o && c ? "visible" : "hidden",
            position: "absolute",
            top: 0,
            left: 0
          }, w);
        return oR.createElement("div", {
          tabIndex: -1,
          className: P,
          style: g,
          ref: function(C) {
            n.wrapperNode = C
          }
        }, l)
      }
    }])
  }(aR);
var uR = function() {
    return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
  },
  se = {
    isSsr: uR(),
    get: function(e) {
      return se[e]
    },
    set: function(e, r) {
      if (typeof e == "string") se[e] = r;
      else {
        var n = Object.keys(e);
        n && n.length && n.forEach(function(i) {
          se[i] = e[i]
        })
      }
    }
  };

function Hn(t) {
  "@babel/helpers - typeof";
  return Hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Hn(t)
}

function Ex(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function jx(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ex(Object(r), !0).forEach(function(n) {
      ff(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Ex(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function sR(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Mx(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Ix(n.key), n)
  }
}

function lR(t, e, r) {
  return e && Mx(t.prototype, e), r && Mx(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function cR(t, e, r) {
  return e = Pu(e), fR(t, Cx() ? Reflect.construct(e, r || [], Pu(t).constructor) : e.apply(t, r))
}

function fR(t, e) {
  if (e && (Hn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return pR(t)
}

function pR(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Cx() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Cx = function() {
    return !!t
  })()
}

function Pu(t) {
  return Pu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Pu(t)
}

function dR(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && cf(t, e)
}

function cf(t, e) {
  return cf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, cf(t, e)
}

function ff(t, e, r) {
  return e = Ix(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Ix(t) {
  var e = mR(t, "string");
  return Hn(e) == "symbol" ? e : e + ""
}

function mR(t, e) {
  if (Hn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Hn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function yR(t) {
  return t.dataKey
}

function vR(t, e) {
  return po.isValidElement(t) ? po.cloneElement(t, e) : typeof t == "function" ? po.createElement(t, e) : po.createElement(gx, e)
}
var de = function(t) {
  function e() {
    return sR(this, e), cR(this, e, arguments)
  }
  return dR(e, t), lR(e, [{
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
        d = i.offset,
        y = i.payload,
        m = i.payloadUniqBy,
        v = i.position,
        x = i.reverseDirection,
        w = i.useTranslate3d,
        S = i.viewBox,
        P = i.wrapperStyle,
        h = y ?? [];
      c && h.length && (h = bu(y.filter(function(_) {
        return _.value != null && (_.hide !== !0 || n.props.includeHidden)
      }), m, yR));
      var g = h.length > 0;
      return po.createElement(Tx, {
        allowEscapeViewBox: a,
        animationDuration: u,
        animationEasing: s,
        isAnimationActive: p,
        active: o,
        coordinate: f,
        hasPayload: g,
        offset: d,
        position: v,
        reverseDirection: x,
        useTranslate3d: w,
        viewBox: S,
        wrapperStyle: P
      }, vR(l, jx(jx({}, this.props), {}, {
        payload: h
      })))
    }
  }])
}(hR);
ff(de, "displayName", "Tooltip");
ff(de, "defaultProps", {
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
  isAnimationActive: !se.isSsr,
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
var Xx = et(mf());
import hf, {
  forwardRef as XR,
  cloneElement as YR,
  useState as ZR,
  useImperativeHandle as JR,
  useRef as Vx,
  useEffect as QR,
  useMemo as tL,
  useCallback as eL
} from "./react-shim-eraudit.js";

function mo(t) {
  "@babel/helpers - typeof";
  return mo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, mo(t)
}

function Gx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Tu(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Gx(Object(r), !0).forEach(function(n) {
      zR(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Gx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function zR(t, e, r) {
  return e = FR(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function FR(t) {
  var e = $R(t, "string");
  return mo(e) == "symbol" ? e : e + ""
}

function $R(t, e) {
  if (mo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (mo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function UR(t, e) {
  return VR(t) || KR(t, e) || GR(t, e) || HR()
}

function HR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function GR(t, e) {
  if (t) {
    if (typeof t == "string") return Kx(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Kx(t, e)
  }
}

function Kx(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function KR(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function VR(t) {
  if (Array.isArray(t)) return t
}
var Eu = XR(function(t, e) {
  var r = t.aspect,
    n = t.initialDimension,
    i = n === void 0 ? {
      width: -1,
      height: -1
    } : n,
    o = t.width,
    a = o === void 0 ? "100%" : o,
    u = t.height,
    s = u === void 0 ? "100%" : u,
    l = t.minWidth,
    f = l === void 0 ? 0 : l,
    c = t.minHeight,
    p = t.maxHeight,
    d = t.children,
    y = t.debounce,
    m = y === void 0 ? 0 : y,
    v = t.id,
    x = t.className,
    w = t.onResize,
    S = t.style,
    P = S === void 0 ? {} : S,
    h = Vx(null),
    g = Vx();
  g.current = w, JR(e, function() {
    return Object.defineProperty(h.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), h.current
      },
      configurable: !0
    })
  });
  var _ = ZR({
      containerWidth: i.width,
      containerHeight: i.height
    }),
    C = UR(_, 2),
    k = C[0],
    B = C[1],
    W = eL(function(H, F) {
      B(function(z) {
        var b = Math.round(H),
          O = Math.round(F);
        return z.containerWidth === b && z.containerHeight === O ? z : {
          containerWidth: b,
          containerHeight: O
        }
      })
    }, []);
  QR(function() {
    var H = function(A) {
      var M, E = A[0].contentRect,
        D = E.width,
        L = E.height;
      W(D, L), (M = g.current) === null || M === void 0 || M.call(g, D, L)
    };
    m > 0 && (H = (0, Xx.default)(H, m, {
      trailing: !0,
      leading: !1
    }));
    var F = new ResizeObserver(H),
      z = h.current.getBoundingClientRect(),
      b = z.width,
      O = z.height;
    return W(b, O), F.observe(h.current),
      function() {
        F.disconnect()
      }
  }, [W, m]);
  var R = tL(function() {
    var H = k.containerWidth,
      F = k.containerHeight;
    if (H < 0 || F < 0) return null;
    ue(pr(a) || pr(s), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, a, s), ue(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var z = pr(a) ? H : a,
      b = pr(s) ? F : s;
    r && r > 0 && (z ? b = z / r : b && (z = b * r), p && b > p && (b = p)), ue(z > 0 || b > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, z, b, a, s, f, c, r);
    var O = !Array.isArray(d) && je(d.type).endsWith("Chart");
    return hf.Children.map(d, function(T) {
      return hf.isValidElement(T) ? YR(T, Tu({
        width: z,
        height: b
      }, O ? {
        style: Tu({
          height: "100%",
          width: "100%",
          maxHeight: b,
          maxWidth: z
        }, T.props.style)
      } : {})) : T
    })
  }, [r, d, s, p, c, f, k, a]);
  return hf.createElement("div", {
    id: v ? "".concat(v) : void 0,
    className: ut("recharts-responsive-container", x),
    style: Tu(Tu({}, P), {}, {
      width: a,
      height: s,
      minWidth: f,
      minHeight: c,
      maxHeight: p
    }),
    ref: h
  }, R)
});
var yf = function(e) {
  return null
};
yf.displayName = "Cell";
var bf = et(Te());
import l0, {
  useMemo as ML
} from "./react-shim-eraudit.js";

function ho(t) {
  "@babel/helpers - typeof";
  return ho = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ho(t)
}

function Yx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function vf(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Yx(Object(r), !0).forEach(function(n) {
      rL(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Yx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function rL(t, e, r) {
  return e = nL(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function nL(t) {
  var e = iL(t, "string");
  return ho(e) == "symbol" ? e : e + ""
}

function iL(t, e) {
  if (ho(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ho(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Gn = {
    widthCache: {},
    cacheCount: 0
  },
  oL = 2e3,
  aL = {
    position: "absolute",
    top: "-20000px",
    left: 0,
    padding: 0,
    margin: 0,
    border: "none",
    whiteSpace: "pre"
  };
var Zx = "recharts_measurement_span";

function uL(t) {
  var e = vf({}, t);
  return Object.keys(e).forEach(function(r) {
    e[r] || delete e[r]
  }), e
}
var Xr = function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (e == null || se.isSsr) return {
      width: 0,
      height: 0
    };
    var n = uL(r),
      i = JSON.stringify({
        text: e,
        copyStyle: n
      });
    if (Gn.widthCache[i]) return Gn.widthCache[i];
    try {
      var o = document.getElementById(Zx);
      o || (o = document.createElement("span"), o.setAttribute("id", Zx), o.setAttribute("aria-hidden", "true"), document.body.appendChild(o));
      var a = vf(vf({}, aL), n);
      Object.assign(o.style, a), o.textContent = "".concat(e);
      var u = o.getBoundingClientRect(),
        s = {
          width: u.width,
          height: u.height
        };
      return Gn.widthCache[i] = s, ++Gn.cacheCount > oL && (Gn.cacheCount = 0, Gn.widthCache = {}), s
    } catch {
      return {
        width: 0,
        height: 0
      }
    }
  },
  Jx = function(e) {
    return {
      top: e.top + window.scrollY - document.documentElement.clientTop,
      left: e.left + window.scrollX - document.documentElement.clientLeft
    }
  };

function yo(t) {
  "@babel/helpers - typeof";
  return yo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, yo(t)
}

function Mu(t, e) {
  return fL(t) || cL(t, e) || lL(t, e) || sL()
}

function sL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function lL(t, e) {
  if (t) {
    if (typeof t == "string") return Qx(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Qx(t, e)
  }
}

function Qx(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function cL(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function fL(t) {
  if (Array.isArray(t)) return t
}

function pL(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function t0(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, mL(n.key), n)
  }
}

function dL(t, e, r) {
  return e && t0(t.prototype, e), r && t0(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function mL(t) {
  var e = hL(t, "string");
  return yo(e) == "symbol" ? e : e + ""
}

function hL(t, e) {
  if (yo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (yo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var e0 = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  r0 = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  yL = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  vL = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  i0 = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1
  },
  gL = Object.keys(i0),
  Kn = "NaN";

function bL(t, e) {
  return t * i0[e]
}
var ju = function() {
  function t(e, r) {
    pL(this, t), this.num = e, this.unit = r, this.num = e, this.unit = r, Number.isNaN(e) && (this.unit = ""), r !== "" && !yL.test(r) && (this.num = NaN, this.unit = ""), gL.includes(r) && (this.num = bL(e, r), this.unit = "px")
  }
  return dL(t, [{
    key: "add",
    value: function(r) {
      return this.unit !== r.unit ? new t(NaN, "") : new t(this.num + r.num, this.unit)
    }
  }, {
    key: "subtract",
    value: function(r) {
      return this.unit !== r.unit ? new t(NaN, "") : new t(this.num - r.num, this.unit)
    }
  }, {
    key: "multiply",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new t(NaN, "") : new t(this.num * r.num, this.unit || r.unit)
    }
  }, {
    key: "divide",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new t(NaN, "") : new t(this.num / r.num, this.unit || r.unit)
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
      var n, i = (n = vL.exec(r)) !== null && n !== void 0 ? n : [],
        o = Mu(i, 3),
        a = o[1],
        u = o[2];
      return new t(parseFloat(a), u ?? "")
    }
  }])
}();

function o0(t) {
  if (t.includes(Kn)) return Kn;
  for (var e = t; e.includes("*") || e.includes("/");) {
    var r, n = (r = e0.exec(e)) !== null && r !== void 0 ? r : [],
      i = Mu(n, 4),
      o = i[1],
      a = i[2],
      u = i[3],
      s = ju.parse(o ?? ""),
      l = ju.parse(u ?? ""),
      f = a === "*" ? s.multiply(l) : s.divide(l);
    if (f.isNaN()) return Kn;
    e = e.replace(e0, f.toString())
  }
  for (; e.includes("+") || /.-\d+(?:\.\d+)?/.test(e);) {
    var c, p = (c = r0.exec(e)) !== null && c !== void 0 ? c : [],
      d = Mu(p, 4),
      y = d[1],
      m = d[2],
      v = d[3],
      x = ju.parse(y ?? ""),
      w = ju.parse(v ?? ""),
      S = m === "+" ? x.add(w) : x.subtract(w);
    if (S.isNaN()) return Kn;
    e = e.replace(r0, S.toString())
  }
  return e
}
var n0 = /\(([^()]*)\)/;

function xL(t) {
  for (var e = t; e.includes("(");) {
    var r = n0.exec(e),
      n = Mu(r, 2),
      i = n[1];
    e = e.replace(n0, o0(i))
  }
  return e
}

function wL(t) {
  var e = t.replace(/\s+/g, "");
  return e = xL(e), e = o0(e), e
}

function OL(t) {
  try {
    return wL(t)
  } catch {
    return Kn
  }
}

function Cu(t) {
  var e = OL(t.slice(5, -1));
  return e === Kn ? "" : e
}
var SL = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
  AL = ["dx", "dy", "angle", "className", "breakAll"];

function gf() {
  return gf = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, gf.apply(this, arguments)
}

function a0(t, e) {
  if (t == null) return {};
  var r = _L(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function _L(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function u0(t, e) {
  return jL(t) || EL(t, e) || TL(t, e) || PL()
}

function PL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function TL(t, e) {
  if (t) {
    if (typeof t == "string") return s0(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return s0(t, e)
  }
}

function s0(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function EL(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function jL(t) {
  if (Array.isArray(t)) return t
}
var p0 = /[ \f\n\r\t\v\u2028\u2029]+/,
  d0 = function(e) {
    var r = e.children,
      n = e.breakAll,
      i = e.style;
    try {
      var o = [];
      (0, bf.default)(r) || (n ? o = r.toString().split("") : o = r.toString().split(p0));
      var a = o.map(function(s) {
          return {
            word: s,
            width: Xr(s, i).width
          }
        }),
        u = n ? 0 : Xr("\xA0", i).width;
      return {
        wordsWithComputedWidth: a,
        spaceWidth: u
      }
    } catch {
      return null
    }
  },
  CL = function(e, r, n, i, o) {
    var a = e.maxLines,
      u = e.children,
      s = e.style,
      l = e.breakAll,
      f = X(a),
      c = u,
      p = function() {
        var z = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return z.reduce(function(b, O) {
          var T = O.word,
            A = O.width,
            M = b[b.length - 1];
          if (M && (i == null || o || M.width + A + n < Number(i))) M.words.push(T), M.width += A + n;
          else {
            var E = {
              words: [T],
              width: A
            };
            b.push(E)
          }
          return b
        }, [])
      },
      d = p(r),
      y = function(z) {
        return z.reduce(function(b, O) {
          return b.width > O.width ? b : O
        })
      };
    if (!f) return d;
    for (var m = "\u2026", v = function(z) {
        var b = c.slice(0, z),
          O = d0({
            breakAll: l,
            style: s,
            children: b + m
          }).wordsWithComputedWidth,
          T = p(O),
          A = T.length > a || y(T).width > Number(i);
        return [A, T]
      }, x = 0, w = c.length - 1, S = 0, P; x <= w && S <= c.length - 1;) {
      var h = Math.floor((x + w) / 2),
        g = h - 1,
        _ = v(g),
        C = u0(_, 2),
        k = C[0],
        B = C[1],
        W = v(h),
        R = u0(W, 1),
        H = R[0];
      if (!k && !H && (x = h + 1), k && H && (w = h - 1), !k && H) {
        P = B;
        break
      }
      S++
    }
    return P || d
  },
  c0 = function(e) {
    var r = (0, bf.default)(e) ? [] : e.toString().split(p0);
    return [{
      words: r
    }]
  },
  IL = function(e) {
    var r = e.width,
      n = e.scaleToFit,
      i = e.children,
      o = e.style,
      a = e.breakAll,
      u = e.maxLines;
    if ((r || n) && !se.isSsr) {
      var s, l, f = d0({
        breakAll: a,
        children: i,
        style: o
      });
      if (f) {
        var c = f.wordsWithComputedWidth,
          p = f.spaceWidth;
        s = c, l = p
      } else return c0(i);
      return CL({
        breakAll: a,
        children: i,
        maxLines: u,
        style: o
      }, s, l, r, n)
    }
    return c0(i)
  },
  f0 = "#808080",
  Yr = function(e) {
    var r = e.x,
      n = r === void 0 ? 0 : r,
      i = e.y,
      o = i === void 0 ? 0 : i,
      a = e.lineHeight,
      u = a === void 0 ? "1em" : a,
      s = e.capHeight,
      l = s === void 0 ? "0.71em" : s,
      f = e.scaleToFit,
      c = f === void 0 ? !1 : f,
      p = e.textAnchor,
      d = p === void 0 ? "start" : p,
      y = e.verticalAnchor,
      m = y === void 0 ? "end" : y,
      v = e.fill,
      x = v === void 0 ? f0 : v,
      w = a0(e, SL),
      S = ML(function() {
        return IL({
          breakAll: w.breakAll,
          children: w.children,
          maxLines: w.maxLines,
          scaleToFit: c,
          style: w.style,
          width: w.width
        })
      }, [w.breakAll, w.children, w.maxLines, c, w.style, w.width]),
      P = w.dx,
      h = w.dy,
      g = w.angle,
      _ = w.className,
      C = w.breakAll,
      k = a0(w, AL);
    if (!Mt(n) || !Mt(o)) return null;
    var B = n + (X(P) ? P : 0),
      W = o + (X(h) ? h : 0),
      R;
    switch (m) {
      case "start":
        R = Cu("calc(".concat(l, ")"));
        break;
      case "middle":
        R = Cu("calc(".concat((S.length - 1) / 2, " * -").concat(u, " + (").concat(l, " / 2))"));
        break;
      default:
        R = Cu("calc(".concat(S.length - 1, " * -").concat(u, ")"));
        break
    }
    var H = [];
    if (c) {
      var F = S[0].width,
        z = w.width;
      H.push("scale(".concat((X(z) ? z / F : 1) / F, ")"))
    }
    return g && H.push("rotate(".concat(g, ", ").concat(B, ", ").concat(W, ")")), H.length && (k.transform = H.join(" ")), l0.createElement("text", gf({}, st(k, !0), {
      x: B,
      y: W,
      className: ut("recharts-text", _),
      textAnchor: d,
      fill: x.includes("url") ? f0 : x
    }), S.map(function(b, O) {
      var T = b.words.join(C ? "" : " ");
      return l0.createElement("tspan", {
        x: B,
        dy: O === 0 ? R : u,
        key: "".concat(T, "-").concat(O)
      }, T)
    }))
  };
var Zo = et(Te()),
  Jo = et(Lt()),
  Tp = et(Pe());
import ur, {
  cloneElement as Pp,
  isValidElement as Ss,
  createElement as Ez
} from "./react-shim-eraudit.js";
var cz = et(Te()),
  fz = et(Lt());
import {
  isValidElement as ZQ
} from "./react-shim-eraudit.js";
var ds = {};
Q_(ds, {
  scaleBand: () => Pr,
  scaleDiverging: () => fs,
  scaleDivergingLog: () => Jf,
  scaleDivergingPow: () => ps,
  scaleDivergingSqrt: () => Dw,
  scaleDivergingSymlog: () => Qf,
  scaleIdentity: () => Xu,
  scaleImplicit: () => Bu,
  scaleLinear: () => an,
  scaleLog: () => Yu,
  scaleOrdinal: () => Yn,
  scalePoint: () => Tr,
  scalePow: () => Mo,
  scaleQuantile: () => Qu,
  scaleQuantize: () => ts,
  scaleRadial: () => Ju,
  scaleSequential: () => us,
  scaleSequentialLog: () => Yf,
  scaleSequentialPow: () => ss,
  scaleSequentialQuantile: () => ls,
  scaleSequentialSqrt: () => kw,
  scaleSequentialSymlog: () => Zf,
  scaleSqrt: () => ew,
  scaleSymlog: () => Zu,
  scaleThreshold: () => es,
  scaleTime: () => Vf,
  scaleUtc: () => Xf,
  tickFormat: () => _o
});

function le(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}

function xf(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}

function Zr(t) {
  let e, r, n;
  t.length !== 2 ? (e = le, r = (u, s) => le(t(u), s), n = (u, s) => t(u) - s) : (e = t === le || t === xf ? t : kL, r = t, n = t);

  function i(u, s, l = 0, f = u.length) {
    if (l < f) {
      if (e(s, s) !== 0) return f;
      do {
        let c = l + f >>> 1;
        r(u[c], s) < 0 ? l = c + 1 : f = c
      } while (l < f)
    }
    return l
  }

  function o(u, s, l = 0, f = u.length) {
    if (l < f) {
      if (e(s, s) !== 0) return f;
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

function kL() {
  return 0
}

function vo(t) {
  return t === null ? NaN : +t
}

function* m0(t, e) {
  if (e === void 0)
    for (let r of t) r != null && (r = +r) >= r && (yield r);
  else {
    let r = -1;
    for (let n of t)(n = e(n, ++r, t)) != null && (n = +n) >= n && (yield n)
  }
}
var h0 = Zr(le),
  y0 = h0.right,
  DL = h0.left,
  NL = Zr(vo).center,
  Fe = y0;
var Vn = class extends Map {
  constructor(e, r = BL) {
    if (super(), Object.defineProperties(this, {
        _intern: {
          value: new Map
        },
        _key: {
          value: r
        }
      }), e != null)
      for (let [n, i] of e) this.set(n, i)
  }
  get(e) {
    return super.get(v0(this, e))
  }
  has(e) {
    return super.has(v0(this, e))
  }
  set(e, r) {
    return super.set(RL(this, e), r)
  }
  delete(e) {
    return super.delete(LL(this, e))
  }
};

function v0({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) ? t.get(n) : r
}

function RL({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) ? t.get(n) : (t.set(n, r), r)
}

function LL({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) && (r = t.get(n), t.delete(n)), r
}

function BL(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t
}

function g0(t = le) {
  if (t === le) return wf;
  if (typeof t != "function") throw new TypeError("compare is not a function");
  return (e, r) => {
    let n = t(e, r);
    return n || n === 0 ? n : (t(r, r) === 0) - (t(e, e) === 0)
  }
}

function wf(t, e) {
  return (t == null || !(t >= t)) - (e == null || !(e >= e)) || (t < e ? -1 : t > e ? 1 : 0)
}
var qL = Math.sqrt(50),
  WL = Math.sqrt(10),
  zL = Math.sqrt(2);

function Iu(t, e, r) {
  let n = (e - t) / Math.max(0, r),
    i = Math.floor(Math.log10(n)),
    o = n / Math.pow(10, i),
    a = o >= qL ? 10 : o >= WL ? 5 : o >= zL ? 2 : 1,
    u, s, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, u = Math.round(t * l), s = Math.round(e * l), u / l < t && ++u, s / l > e && --s, l = -l) : (l = Math.pow(10, i) * a, u = Math.round(t / l), s = Math.round(e / l), u * l < t && ++u, s * l > e && --s), s < u && .5 <= r && r < 2 ? Iu(t, e, r * 2) : [u, s, l]
}

function Jr(t, e, r) {
  if (e = +e, t = +t, r = +r, !(r > 0)) return [];
  if (t === e) return [t];
  let n = e < t,
    [i, o, a] = n ? Iu(e, t, r) : Iu(t, e, r);
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

function go(t, e, r) {
  return e = +e, t = +t, r = +r, Iu(t, e, r)[2]
}

function Xn(t, e, r) {
  e = +e, t = +t, r = +r;
  let n = e < t,
    i = n ? go(e, t, r) : go(t, e, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i)
}

function ku(t, e) {
  let r;
  if (e === void 0)
    for (let n of t) n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of t)(i = e(i, ++n, t)) != null && (r < i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Du(t, e) {
  let r;
  if (e === void 0)
    for (let n of t) n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of t)(i = e(i, ++n, t)) != null && (r > i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Nu(t, e, r = 0, n = 1 / 0, i) {
  if (e = Math.floor(e), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(t.length - 1, n)), !(r <= e && e <= n)) return t;
  for (i = i === void 0 ? wf : g0(i); n > r;) {
    if (n - r > 600) {
      let s = n - r + 1,
        l = e - r + 1,
        f = Math.log(s),
        c = .5 * Math.exp(2 * f / 3),
        p = .5 * Math.sqrt(f * c * (s - c) / s) * (l - s / 2 < 0 ? -1 : 1),
        d = Math.max(r, Math.floor(e - l * c / s + p)),
        y = Math.min(n, Math.floor(e + (s - l) * c / s + p));
      Nu(t, e, d, y, i)
    }
    let o = t[e],
      a = r,
      u = n;
    for (bo(t, r, e), i(t[n], o) > 0 && bo(t, r, n); a < u;) {
      for (bo(t, a, u), ++a, --u; i(t[a], o) < 0;) ++a;
      for (; i(t[u], o) > 0;) --u
    }
    i(t[r], o) === 0 ? bo(t, r, u) : (++u, bo(t, u, n)), u <= e && (r = u + 1), e <= u && (n = u - 1)
  }
  return t
}

function bo(t, e, r) {
  let n = t[e];
  t[e] = t[r], t[r] = n
}

function Ru(t, e, r) {
  if (t = Float64Array.from(m0(t, r)), !(!(n = t.length) || isNaN(e = +e))) {
    if (e <= 0 || n < 2) return Du(t);
    if (e >= 1) return ku(t);
    var n, i = (n - 1) * e,
      o = Math.floor(i),
      a = ku(Nu(t, o).subarray(0, o + 1)),
      u = Du(t.subarray(o + 1));
    return a + (u - a) * (i - o)
  }
}

function Of(t, e, r = vo) {
  if (!(!(n = t.length) || isNaN(e = +e))) {
    if (e <= 0 || n < 2) return +r(t[0], 0, t);
    if (e >= 1) return +r(t[n - 1], n - 1, t);
    var n, i = (n - 1) * e,
      o = Math.floor(i),
      a = +r(t[o], o, t),
      u = +r(t[o + 1], o + 1, t);
    return a + (u - a) * (i - o)
  }
}

function Lu(t, e, r) {
  t = +t, e = +e, r = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((e - t) / r)) | 0, o = new Array(i); ++n < i;) o[n] = t + n * r;
  return o
}

function kt(t, e) {
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

function Ne(t, e) {
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
var Bu = Symbol("implicit");

function Yn() {
  var t = new Vn,
    e = [],
    r = [],
    n = Bu;

  function i(o) {
    let a = t.get(o);
    if (a === void 0) {
      if (n !== Bu) return n;
      t.set(o, a = e.push(o) - 1)
    }
    return r[a % r.length]
  }
  return i.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [], t = new Vn;
    for (let a of o) t.has(a) || t.set(a, e.push(a) - 1);
    return i
  }, i.range = function(o) {
    return arguments.length ? (r = Array.from(o), i) : r.slice()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return Yn(e, r).unknown(n)
  }, kt.apply(i, arguments), i
}

function Pr() {
  var t = Yn().unknown(void 0),
    e = t.domain,
    r = t.range,
    n = 0,
    i = 1,
    o, a, u = !1,
    s = 0,
    l = 0,
    f = .5;
  delete t.unknown;

  function c() {
    var p = e().length,
      d = i < n,
      y = d ? i : n,
      m = d ? n : i;
    o = (m - y) / Math.max(1, p - s + l * 2), u && (o = Math.floor(o)), y += (m - y - o * (p - s)) * f, a = o * (1 - s), u && (y = Math.round(y), a = Math.round(a));
    var v = Lu(p).map(function(x) {
      return y + o * x
    });
    return r(d ? v.reverse() : v)
  }
  return t.domain = function(p) {
    return arguments.length ? (e(p), c()) : e()
  }, t.range = function(p) {
    return arguments.length ? ([n, i] = p, n = +n, i = +i, c()) : [n, i]
  }, t.rangeRound = function(p) {
    return [n, i] = p, n = +n, i = +i, u = !0, c()
  }, t.bandwidth = function() {
    return a
  }, t.step = function() {
    return o
  }, t.round = function(p) {
    return arguments.length ? (u = !!p, c()) : u
  }, t.padding = function(p) {
    return arguments.length ? (s = Math.min(1, l = +p), c()) : s
  }, t.paddingInner = function(p) {
    return arguments.length ? (s = Math.min(1, p), c()) : s
  }, t.paddingOuter = function(p) {
    return arguments.length ? (l = +p, c()) : l
  }, t.align = function(p) {
    return arguments.length ? (f = Math.max(0, Math.min(1, p)), c()) : f
  }, t.copy = function() {
    return Pr(e(), [n, i]).round(u).paddingInner(s).paddingOuter(l).align(f)
  }, kt.apply(c(), arguments)
}

function b0(t) {
  var e = t.copy;
  return t.padding = t.paddingOuter, delete t.paddingInner, delete t.paddingOuter, t.copy = function() {
    return b0(e())
  }, t
}

function Tr() {
  return b0(Pr.apply(null, arguments).paddingInner(1))
}

function qu(t, e, r) {
  t.prototype = e.prototype = r, r.constructor = t
}

function Sf(t, e) {
  var r = Object.create(t.prototype);
  for (var n in e) r[n] = e[n];
  return r
}

function Oo() {}
var xo = .7,
  Fu = 1 / xo,
  Zn = "\\s*([+-]?\\d+)\\s*",
  wo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  rr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  FL = /^#([0-9a-f]{3,8})$/,
  $L = new RegExp(`^rgb\\(${Zn},${Zn},${Zn}\\)$`),
  UL = new RegExp(`^rgb\\(${rr},${rr},${rr}\\)$`),
  HL = new RegExp(`^rgba\\(${Zn},${Zn},${Zn},${wo}\\)$`),
  GL = new RegExp(`^rgba\\(${rr},${rr},${rr},${wo}\\)$`),
  KL = new RegExp(`^hsl\\(${wo},${rr},${rr}\\)$`),
  VL = new RegExp(`^hsla\\(${wo},${rr},${rr},${wo}\\)$`),
  x0 = {
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
qu(Oo, Er, {
  copy(t) {
    return Object.assign(new this.constructor, this, t)
  },
  displayable() {
    return this.rgb().displayable()
  },
  hex: w0,
  formatHex: w0,
  formatHex8: XL,
  formatHsl: YL,
  formatRgb: O0,
  toString: O0
});

function w0() {
  return this.rgb().formatHex()
}

function XL() {
  return this.rgb().formatHex8()
}

function YL() {
  return E0(this).formatHsl()
}

function O0() {
  return this.rgb().formatRgb()
}

function Er(t) {
  var e, r;
  return t = (t + "").trim().toLowerCase(), (e = FL.exec(t)) ? (r = e[1].length, e = parseInt(e[1], 16), r === 6 ? S0(e) : r === 3 ? new me(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : r === 8 ? Wu(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : r === 4 ? Wu(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = $L.exec(t)) ? new me(e[1], e[2], e[3], 1) : (e = UL.exec(t)) ? new me(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = HL.exec(t)) ? Wu(e[1], e[2], e[3], e[4]) : (e = GL.exec(t)) ? Wu(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = KL.exec(t)) ? P0(e[1], e[2] / 100, e[3] / 100, 1) : (e = VL.exec(t)) ? P0(e[1], e[2] / 100, e[3] / 100, e[4]) : x0.hasOwnProperty(t) ? S0(x0[t]) : t === "transparent" ? new me(NaN, NaN, NaN, 0) : null
}

function S0(t) {
  return new me(t >> 16 & 255, t >> 8 & 255, t & 255, 1)
}

function Wu(t, e, r, n) {
  return n <= 0 && (t = e = r = NaN), new me(t, e, r, n)
}

function ZL(t) {
  return t instanceof Oo || (t = Er(t)), t ? (t = t.rgb(), new me(t.r, t.g, t.b, t.opacity)) : new me
}

function Jn(t, e, r, n) {
  return arguments.length === 1 ? ZL(t) : new me(t, e, r, n ?? 1)
}

function me(t, e, r, n) {
  this.r = +t, this.g = +e, this.b = +r, this.opacity = +n
}
qu(me, Jn, Sf(Oo, {
  brighter(t) {
    return t = t == null ? Fu : Math.pow(Fu, t), new me(this.r * t, this.g * t, this.b * t, this.opacity)
  },
  darker(t) {
    return t = t == null ? xo : Math.pow(xo, t), new me(this.r * t, this.g * t, this.b * t, this.opacity)
  },
  rgb() {
    return this
  },
  clamp() {
    return new me(tn(this.r), tn(this.g), tn(this.b), $u(this.opacity))
  },
  displayable() {
    return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
  },
  hex: A0,
  formatHex: A0,
  formatHex8: JL,
  formatRgb: _0,
  toString: _0
}));

function A0() {
  return `#${Qr(this.r)}${Qr(this.g)}${Qr(this.b)}`
}

function JL() {
  return `#${Qr(this.r)}${Qr(this.g)}${Qr(this.b)}${Qr((isNaN(this.opacity)?1:this.opacity)*255)}`
}

function _0() {
  let t = $u(this.opacity);
  return `${t===1?"rgb(":"rgba("}${tn(this.r)}, ${tn(this.g)}, ${tn(this.b)}${t===1?")":`, ${t})`}`
}

function $u(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t))
}

function tn(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0))
}

function Qr(t) {
  return t = tn(t), (t < 16 ? "0" : "") + t.toString(16)
}

function P0(t, e, r, n) {
  return n <= 0 ? t = e = r = NaN : r <= 0 || r >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new $e(t, e, r, n)
}

function E0(t) {
  if (t instanceof $e) return new $e(t.h, t.s, t.l, t.opacity);
  if (t instanceof Oo || (t = Er(t)), !t) return new $e;
  if (t instanceof $e) return t;
  t = t.rgb();
  var e = t.r / 255,
    r = t.g / 255,
    n = t.b / 255,
    i = Math.min(e, r, n),
    o = Math.max(e, r, n),
    a = NaN,
    u = o - i,
    s = (o + i) / 2;
  return u ? (e === o ? a = (r - n) / u + (r < n) * 6 : r === o ? a = (n - e) / u + 2 : a = (e - r) / u + 4, u /= s < .5 ? o + i : 2 - o - i, a *= 60) : u = s > 0 && s < 1 ? 0 : a, new $e(a, u, s, t.opacity)
}

function j0(t, e, r, n) {
  return arguments.length === 1 ? E0(t) : new $e(t, e, r, n ?? 1)
}

function $e(t, e, r, n) {
  this.h = +t, this.s = +e, this.l = +r, this.opacity = +n
}
qu($e, j0, Sf(Oo, {
  brighter(t) {
    return t = t == null ? Fu : Math.pow(Fu, t), new $e(this.h, this.s, this.l * t, this.opacity)
  },
  darker(t) {
    return t = t == null ? xo : Math.pow(xo, t), new $e(this.h, this.s, this.l * t, this.opacity)
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360,
      e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
      r = this.l,
      n = r + (r < .5 ? r : 1 - r) * e,
      i = 2 * r - n;
    return new me(Af(t >= 240 ? t - 240 : t + 120, i, n), Af(t, i, n), Af(t < 120 ? t + 240 : t - 120, i, n), this.opacity)
  },
  clamp() {
    return new $e(T0(this.h), zu(this.s), zu(this.l), $u(this.opacity))
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
  },
  formatHsl() {
    let t = $u(this.opacity);
    return `${t===1?"hsl(":"hsla("}${T0(this.h)}, ${zu(this.s)*100}%, ${zu(this.l)*100}%${t===1?")":`, ${t})`}`
  }
}));

function T0(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t
}

function zu(t) {
  return Math.max(0, Math.min(1, t || 0))
}

function Af(t, e, r) {
  return (t < 60 ? e + (r - e) * t / 60 : t < 180 ? r : t < 240 ? e + (r - e) * (240 - t) / 60 : e) * 255
}

function _f(t, e, r, n, i) {
  var o = t * t,
    a = o * t;
  return ((1 - 3 * t + 3 * o - a) * e + (4 - 6 * o + 3 * a) * r + (1 + 3 * t + 3 * o - 3 * a) * n + a * i) / 6
}

function M0(t) {
  var e = t.length - 1;
  return function(r) {
    var n = r <= 0 ? r = 0 : r >= 1 ? (r = 1, e - 1) : Math.floor(r * e),
      i = t[n],
      o = t[n + 1],
      a = n > 0 ? t[n - 1] : 2 * i - o,
      u = n < e - 1 ? t[n + 2] : 2 * o - i;
    return _f((r - n / e) * e, a, i, o, u)
  }
}

function C0(t) {
  var e = t.length;
  return function(r) {
    var n = Math.floor(((r %= 1) < 0 ? ++r : r) * e),
      i = t[(n + e - 1) % e],
      o = t[n % e],
      a = t[(n + 1) % e],
      u = t[(n + 2) % e];
    return _f((r - n / e) * e, i, o, a, u)
  }
}
var So = t => () => t;

function QL(t, e) {
  return function(r) {
    return t + r * e
  }
}

function tB(t, e, r) {
  return t = Math.pow(t, r), e = Math.pow(e, r) - t, r = 1 / r,
    function(n) {
      return Math.pow(t + n * e, r)
    }
}

function I0(t) {
  return (t = +t) == 1 ? Uu : function(e, r) {
    return r - e ? tB(e, r, t) : So(isNaN(e) ? r : e)
  }
}

function Uu(t, e) {
  var r = e - t;
  return r ? QL(t, r) : So(isNaN(t) ? e : t)
}
var Pf = function t(e) {
  var r = I0(e);

  function n(i, o) {
    var a = r((i = Jn(i)).r, (o = Jn(o)).r),
      u = r(i.g, o.g),
      s = r(i.b, o.b),
      l = Uu(i.opacity, o.opacity);
    return function(f) {
      return i.r = a(f), i.g = u(f), i.b = s(f), i.opacity = l(f), i + ""
    }
  }
  return n.gamma = t, n
}(1);

function k0(t) {
  return function(e) {
    var r = e.length,
      n = new Array(r),
      i = new Array(r),
      o = new Array(r),
      a, u;
    for (a = 0; a < r; ++a) u = Jn(e[a]), n[a] = u.r || 0, i[a] = u.g || 0, o[a] = u.b || 0;
    return n = t(n), i = t(i), o = t(o), u.opacity = 1,
      function(s) {
        return u.r = n(s), u.g = i(s), u.b = o(s), u + ""
      }
  }
}
var OX = k0(M0),
  SX = k0(C0);

function D0(t, e) {
  e || (e = []);
  var r = t ? Math.min(e.length, t.length) : 0,
    n = e.slice(),
    i;
  return function(o) {
    for (i = 0; i < r; ++i) n[i] = t[i] * (1 - o) + e[i] * o;
    return n
  }
}

function N0(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView)
}

function R0(t, e) {
  var r = e ? e.length : 0,
    n = t ? Math.min(r, t.length) : 0,
    i = new Array(n),
    o = new Array(r),
    a;
  for (a = 0; a < n; ++a) i[a] = ge(t[a], e[a]);
  for (; a < r; ++a) o[a] = e[a];
  return function(u) {
    for (a = 0; a < n; ++a) o[a] = i[a](u);
    return o
  }
}

function L0(t, e) {
  var r = new Date;
  return t = +t, e = +e,
    function(n) {
      return r.setTime(t * (1 - n) + e * n), r
    }
}

function jr(t, e) {
  return t = +t, e = +e,
    function(r) {
      return t * (1 - r) + e * r
    }
}

function B0(t, e) {
  var r = {},
    n = {},
    i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e) i in t ? r[i] = ge(t[i], e[i]) : n[i] = e[i];
  return function(o) {
    for (i in r) n[i] = r[i](o);
    return n
  }
}
var Ef = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Tf = new RegExp(Ef.source, "g");

function eB(t) {
  return function() {
    return t
  }
}

function rB(t) {
  return function(e) {
    return t(e) + ""
  }
}

function q0(t, e) {
  var r = Ef.lastIndex = Tf.lastIndex = 0,
    n, i, o, a = -1,
    u = [],
    s = [];
  for (t = t + "", e = e + "";
    (n = Ef.exec(t)) && (i = Tf.exec(e));)(o = i.index) > r && (o = e.slice(r, o), u[a] ? u[a] += o : u[++a] = o), (n = n[0]) === (i = i[0]) ? u[a] ? u[a] += i : u[++a] = i : (u[++a] = null, s.push({
    i: a,
    x: jr(n, i)
  })), r = Tf.lastIndex;
  return r < e.length && (o = e.slice(r), u[a] ? u[a] += o : u[++a] = o), u.length < 2 ? s[0] ? rB(s[0].x) : eB(e) : (e = s.length, function(l) {
    for (var f = 0, c; f < e; ++f) u[(c = s[f]).i] = c.x(l);
    return u.join("")
  })
}

function ge(t, e) {
  var r = typeof e,
    n;
  return e == null || r === "boolean" ? So(e) : (r === "number" ? jr : r === "string" ? (n = Er(e)) ? (e = n, Pf) : q0 : e instanceof Er ? Pf : e instanceof Date ? L0 : N0(e) ? D0 : Array.isArray(e) ? R0 : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? B0 : jr)(t, e)
}

function en(t, e) {
  return t = +t, e = +e,
    function(r) {
      return Math.round(t * (1 - r) + e * r)
    }
}

function Hu(t, e) {
  e === void 0 && (e = t, t = ge);
  for (var r = 0, n = e.length - 1, i = e[0], o = new Array(n < 0 ? 0 : n); r < n;) o[r] = t(i, i = e[++r]);
  return function(a) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(a *= n)));
    return o[u](a - u)
  }
}

function jf(t) {
  return function() {
    return t
  }
}

function Mr(t) {
  return +t
}
var W0 = [0, 1];

function zt(t) {
  return t
}

function Mf(t, e) {
  return (e -= t = +t) ? function(r) {
    return (r - t) / e
  } : jf(isNaN(e) ? NaN : .5)
}

function nB(t, e) {
  var r;
  return t > e && (r = t, t = e, e = r),
    function(n) {
      return Math.max(t, Math.min(e, n))
    }
}

function iB(t, e, r) {
  var n = t[0],
    i = t[1],
    o = e[0],
    a = e[1];
  return i < n ? (n = Mf(i, n), o = r(a, o)) : (n = Mf(n, i), o = r(o, a)),
    function(u) {
      return o(n(u))
    }
}

function oB(t, e, r) {
  var n = Math.min(t.length, e.length) - 1,
    i = new Array(n),
    o = new Array(n),
    a = -1;
  for (t[n] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a < n;) i[a] = Mf(t[a], t[a + 1]), o[a] = r(e[a], e[a + 1]);
  return function(u) {
    var s = Fe(t, u, 1, n) - 1;
    return o[s](i[s](u))
  }
}

function nr(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())
}

function rn() {
  var t = W0,
    e = W0,
    r = ge,
    n, i, o, a = zt,
    u, s, l;

  function f() {
    var p = Math.min(t.length, e.length);
    return a !== zt && (a = nB(t[0], t[p - 1])), u = p > 2 ? oB : iB, s = l = null, c
  }

  function c(p) {
    return p == null || isNaN(p = +p) ? o : (s || (s = u(t.map(n), e, r)))(n(a(p)))
  }
  return c.invert = function(p) {
      return a(i((l || (l = u(e, t.map(n), jr)))(p)))
    }, c.domain = function(p) {
      return arguments.length ? (t = Array.from(p, Mr), f()) : t.slice()
    }, c.range = function(p) {
      return arguments.length ? (e = Array.from(p), f()) : e.slice()
    }, c.rangeRound = function(p) {
      return e = Array.from(p), r = en, f()
    }, c.clamp = function(p) {
      return arguments.length ? (a = p ? !0 : zt, f()) : a !== zt
    }, c.interpolate = function(p) {
      return arguments.length ? (r = p, f()) : r
    }, c.unknown = function(p) {
      return arguments.length ? (o = p, c) : o
    },
    function(p, d) {
      return n = p, i = d, f()
    }
}

function nn() {
  return rn()(zt, zt)
}

function z0(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10)
}

function on(t, e) {
  if (!isFinite(t) || t === 0) return null;
  var r = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e"),
    n = t.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +t.slice(r + 1)]
}

function ir(t) {
  return t = on(Math.abs(t)), t ? t[1] : NaN
}

function F0(t, e) {
  return function(r, n) {
    for (var i = r.length, o = [], a = 0, u = t[0], s = 0; i > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), o.push(r.substring(i -= u, i + u)), !((s += u + 1) > n));) u = t[a = (a + 1) % t.length];
    return o.reverse().join(e)
  }
}

function $0(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(r) {
      return t[+r]
    })
  }
}
var aB = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function or(t) {
  if (!(e = aB.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Gu({
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
or.prototype = Gu.prototype;

function Gu(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + ""
}
Gu.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type
};

function U0(t) {
  t: for (var e = t.length, r = 1, n = -1, i; r < e; ++r) switch (t[r]) {
    case ".":
      n = i = r;
      break;
    case "0":
      n === 0 && (n = r), i = r;
      break;
    default:
      if (!+t[r]) break t;
      n > 0 && (n = 0);
      break
  }
  return n > 0 ? t.slice(0, n) + t.slice(i + 1) : t
}
var Ao;

function H0(t, e) {
  var r = on(t, e);
  if (!r) return Ao = void 0, t.toPrecision(e);
  var n = r[0],
    i = r[1],
    o = i - (Ao = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    a = n.length;
  return o === a ? n : o > a ? n + new Array(o - a + 1).join("0") : o > 0 ? n.slice(0, o) + "." + n.slice(o) : "0." + new Array(1 - o).join("0") + on(t, Math.max(0, e + o - 1))[0]
}

function Cf(t, e) {
  var r = on(t, e);
  if (!r) return t + "";
  var n = r[0],
    i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0")
}
var If = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: t => Math.round(t).toString(2),
  c: t => t + "",
  d: z0,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: t => Math.round(t).toString(8),
  p: (t, e) => Cf(t * 100, e),
  r: Cf,
  s: H0,
  X: t => Math.round(t).toString(16).toUpperCase(),
  x: t => Math.round(t).toString(16)
};

function kf(t) {
  return t
}
var G0 = Array.prototype.map,
  K0 = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function V0(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? kf : F0(G0.call(t.grouping, Number), t.thousands + ""),
    r = t.currency === void 0 ? "" : t.currency[0] + "",
    n = t.currency === void 0 ? "" : t.currency[1] + "",
    i = t.decimal === void 0 ? "." : t.decimal + "",
    o = t.numerals === void 0 ? kf : $0(G0.call(t.numerals, String)),
    a = t.percent === void 0 ? "%" : t.percent + "",
    u = t.minus === void 0 ? "\u2212" : t.minus + "",
    s = t.nan === void 0 ? "NaN" : t.nan + "";

  function l(c, p) {
    c = or(c);
    var d = c.fill,
      y = c.align,
      m = c.sign,
      v = c.symbol,
      x = c.zero,
      w = c.width,
      S = c.comma,
      P = c.precision,
      h = c.trim,
      g = c.type;
    g === "n" ? (S = !0, g = "g") : If[g] || (P === void 0 && (P = 12), h = !0, g = "g"), (x || d === "0" && y === "=") && (x = !0, d = "0", y = "=");
    var _ = (p && p.prefix !== void 0 ? p.prefix : "") + (v === "$" ? r : v === "#" && /[boxX]/.test(g) ? "0" + g.toLowerCase() : ""),
      C = (v === "$" ? n : /[%p]/.test(g) ? a : "") + (p && p.suffix !== void 0 ? p.suffix : ""),
      k = If[g],
      B = /[defgprs%]/.test(g);
    P = P === void 0 ? 6 : /[gprs]/.test(g) ? Math.max(1, Math.min(21, P)) : Math.max(0, Math.min(20, P));

    function W(R) {
      var H = _,
        F = C,
        z, b, O;
      if (g === "c") F = k(R) + F, R = "";
      else {
        R = +R;
        var T = R < 0 || 1 / R < 0;
        if (R = isNaN(R) ? s : k(Math.abs(R), P), h && (R = U0(R)), T && +R == 0 && m !== "+" && (T = !1), H = (T ? m === "(" ? m : u : m === "-" || m === "(" ? "" : m) + H, F = (g === "s" && !isNaN(R) && Ao !== void 0 ? K0[8 + Ao / 3] : "") + F + (T && m === "(" ? ")" : ""), B) {
          for (z = -1, b = R.length; ++z < b;)
            if (O = R.charCodeAt(z), 48 > O || O > 57) {
              F = (O === 46 ? i + R.slice(z + 1) : R.slice(z)) + F, R = R.slice(0, z);
              break
            }
        }
      }
      S && !x && (R = e(R, 1 / 0));
      var A = H.length + R.length + F.length,
        M = A < w ? new Array(w - A + 1).join(d) : "";
      switch (S && x && (R = e(M + R, M.length ? w - F.length : 1 / 0), M = ""), y) {
        case "<":
          R = H + R + F + M;
          break;
        case "=":
          R = H + M + R + F;
          break;
        case "^":
          R = M.slice(0, A = M.length >> 1) + H + R + F + M.slice(A);
          break;
        default:
          R = M + H + R + F;
          break
      }
      return o(R)
    }
    return W.toString = function() {
      return c + ""
    }, W
  }

  function f(c, p) {
    var d = Math.max(-8, Math.min(8, Math.floor(ir(p) / 3))) * 3,
      y = Math.pow(10, -d),
      m = l((c = or(c), c.type = "f", c), {
        suffix: K0[8 + d / 3]
      });
    return function(v) {
      return m(y * v)
    }
  }
  return {
    format: l,
    formatPrefix: f
  }
}
var Ku, Qn, Vu;
Df({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function Df(t) {
  return Ku = V0(t), Qn = Ku.format, Vu = Ku.formatPrefix, Ku
}

function Nf(t) {
  return Math.max(0, -ir(Math.abs(t)))
}

function Rf(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(ir(e) / 3))) * 3 - ir(Math.abs(t)))
}

function Lf(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, ir(e) - ir(t)) + 1
}

function _o(t, e, r, n) {
  var i = Xn(t, e, r),
    o;
  switch (n = or(n ?? ",f"), n.type) {
    case "s": {
      var a = Math.max(Math.abs(t), Math.abs(e));
      return n.precision == null && !isNaN(o = Rf(i, a)) && (n.precision = o), Vu(n, a)
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(o = Lf(i, Math.max(Math.abs(t), Math.abs(e)))) && (n.precision = o - (n.type === "e"));
      break
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(o = Nf(i)) && (n.precision = o - (n.type === "%") * 2);
      break
    }
  }
  return Qn(n)
}

function ce(t) {
  var e = t.domain;
  return t.ticks = function(r) {
    var n = e();
    return Jr(n[0], n[n.length - 1], r ?? 10)
  }, t.tickFormat = function(r, n) {
    var i = e();
    return _o(i[0], i[i.length - 1], r ?? 10, n)
  }, t.nice = function(r) {
    r == null && (r = 10);
    var n = e(),
      i = 0,
      o = n.length - 1,
      a = n[i],
      u = n[o],
      s, l, f = 10;
    for (u < a && (l = a, a = u, u = l, l = i, i = o, o = l); f-- > 0;) {
      if (l = go(a, u, r), l === s) return n[i] = a, n[o] = u, e(n);
      if (l > 0) a = Math.floor(a / l) * l, u = Math.ceil(u / l) * l;
      else if (l < 0) a = Math.ceil(a * l) / l, u = Math.floor(u * l) / l;
      else break;
      s = l
    }
    return t
  }, t
}

function an() {
  var t = nn();
  return t.copy = function() {
    return nr(t, an())
  }, kt.apply(t, arguments), ce(t)
}

function Xu(t) {
  var e;

  function r(n) {
    return n == null || isNaN(n = +n) ? e : n
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (t = Array.from(n, Mr), r) : t.slice()
  }, r.unknown = function(n) {
    return arguments.length ? (e = n, r) : e
  }, r.copy = function() {
    return Xu(t).unknown(e)
  }, t = arguments.length ? Array.from(t, Mr) : [0, 1], ce(r)
}

function Po(t, e) {
  t = t.slice();
  var r = 0,
    n = t.length - 1,
    i = t[r],
    o = t[n],
    a;
  return o < i && (a = r, r = n, n = a, a = i, i = o, o = a), t[r] = e.floor(i), t[n] = e.ceil(o), t
}

function X0(t) {
  return Math.log(t)
}

function Y0(t) {
  return Math.exp(t)
}

function uB(t) {
  return -Math.log(-t)
}

function sB(t) {
  return -Math.exp(-t)
}

function lB(t) {
  return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t
}

function cB(t) {
  return t === 10 ? lB : t === Math.E ? Math.exp : e => Math.pow(t, e)
}

function fB(t) {
  return t === Math.E ? Math.log : t === 10 && Math.log10 || t === 2 && Math.log2 || (t = Math.log(t), e => Math.log(e) / t)
}

function Z0(t) {
  return (e, r) => -t(-e, r)
}

function To(t) {
  let e = t(X0, Y0),
    r = e.domain,
    n = 10,
    i, o;

  function a() {
    return i = fB(n), o = cB(n), r()[0] < 0 ? (i = Z0(i), o = Z0(o), t(uB, sB)) : t(X0, Y0), e
  }
  return e.base = function(u) {
    return arguments.length ? (n = +u, a()) : n
  }, e.domain = function(u) {
    return arguments.length ? (r(u), a()) : r()
  }, e.ticks = u => {
    let s = r(),
      l = s[0],
      f = s[s.length - 1],
      c = f < l;
    c && ([l, f] = [f, l]);
    let p = i(l),
      d = i(f),
      y, m, v = u == null ? 10 : +u,
      x = [];
    if (!(n % 1) && d - p < v) {
      if (p = Math.floor(p), d = Math.ceil(d), l > 0) {
        for (; p <= d; ++p)
          for (y = 1; y < n; ++y)
            if (m = p < 0 ? y / o(-p) : y * o(p), !(m < l)) {
              if (m > f) break;
              x.push(m)
            }
      } else
        for (; p <= d; ++p)
          for (y = n - 1; y >= 1; --y)
            if (m = p > 0 ? y / o(-p) : y * o(p), !(m < l)) {
              if (m > f) break;
              x.push(m)
            } x.length * 2 < v && (x = Jr(l, f, v))
    } else x = Jr(p, d, Math.min(d - p, v)).map(o);
    return c ? x.reverse() : x
  }, e.tickFormat = (u, s) => {
    if (u == null && (u = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = or(s)).precision == null && (s.trim = !0), s = Qn(s)), u === 1 / 0) return s;
    let l = Math.max(1, n * u / e.ticks().length);
    return f => {
      let c = f / o(Math.round(i(f)));
      return c * n < n - .5 && (c *= n), c <= l ? s(f) : ""
    }
  }, e.nice = () => r(Po(r(), {
    floor: u => o(Math.floor(i(u))),
    ceil: u => o(Math.ceil(i(u)))
  })), e
}

function Yu() {
  let t = To(rn()).domain([1, 10]);
  return t.copy = () => nr(t, Yu()).base(t.base()), kt.apply(t, arguments), t
}

function J0(t) {
  return function(e) {
    return Math.sign(e) * Math.log1p(Math.abs(e / t))
  }
}

function Q0(t) {
  return function(e) {
    return Math.sign(e) * Math.expm1(Math.abs(e)) * t
  }
}

function Eo(t) {
  var e = 1,
    r = t(J0(e), Q0(e));
  return r.constant = function(n) {
    return arguments.length ? t(J0(e = +n), Q0(e)) : e
  }, ce(r)
}

function Zu() {
  var t = Eo(rn());
  return t.copy = function() {
    return nr(t, Zu()).constant(t.constant())
  }, kt.apply(t, arguments)
}

function tw(t) {
  return function(e) {
    return e < 0 ? -Math.pow(-e, t) : Math.pow(e, t)
  }
}

function pB(t) {
  return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t)
}

function dB(t) {
  return t < 0 ? -t * t : t * t
}

function jo(t) {
  var e = t(zt, zt),
    r = 1;

  function n() {
    return r === 1 ? t(zt, zt) : r === .5 ? t(pB, dB) : t(tw(r), tw(1 / r))
  }
  return e.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r
  }, ce(e)
}

function Mo() {
  var t = jo(rn());
  return t.copy = function() {
    return nr(t, Mo()).exponent(t.exponent())
  }, kt.apply(t, arguments), t
}

function ew() {
  return Mo.apply(null, arguments).exponent(.5)
}

function rw(t) {
  return Math.sign(t) * t * t
}

function mB(t) {
  return Math.sign(t) * Math.sqrt(Math.abs(t))
}

function Ju() {
  var t = nn(),
    e = [0, 1],
    r = !1,
    n;

  function i(o) {
    var a = mB(t(o));
    return isNaN(a) ? n : r ? Math.round(a) : a
  }
  return i.invert = function(o) {
    return t.invert(rw(o))
  }, i.domain = function(o) {
    return arguments.length ? (t.domain(o), i) : t.domain()
  }, i.range = function(o) {
    return arguments.length ? (t.range((e = Array.from(o, Mr)).map(rw)), i) : e.slice()
  }, i.rangeRound = function(o) {
    return i.range(o).round(!0)
  }, i.round = function(o) {
    return arguments.length ? (r = !!o, i) : r
  }, i.clamp = function(o) {
    return arguments.length ? (t.clamp(o), i) : t.clamp()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return Ju(t.domain(), e).round(r).clamp(t.clamp()).unknown(n)
  }, kt.apply(i, arguments), ce(i)
}

function Qu() {
  var t = [],
    e = [],
    r = [],
    n;

  function i() {
    var a = 0,
      u = Math.max(1, e.length);
    for (r = new Array(u - 1); ++a < u;) r[a - 1] = Of(t, a / u);
    return o
  }

  function o(a) {
    return a == null || isNaN(a = +a) ? n : e[Fe(r, a)]
  }
  return o.invertExtent = function(a) {
    var u = e.indexOf(a);
    return u < 0 ? [NaN, NaN] : [u > 0 ? r[u - 1] : t[0], u < r.length ? r[u] : t[t.length - 1]]
  }, o.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [];
    for (let u of a) u != null && !isNaN(u = +u) && t.push(u);
    return t.sort(le), i()
  }, o.range = function(a) {
    return arguments.length ? (e = Array.from(a), i()) : e.slice()
  }, o.unknown = function(a) {
    return arguments.length ? (n = a, o) : n
  }, o.quantiles = function() {
    return r.slice()
  }, o.copy = function() {
    return Qu().domain(t).range(e).unknown(n)
  }, kt.apply(o, arguments)
}

function ts() {
  var t = 0,
    e = 1,
    r = 1,
    n = [.5],
    i = [0, 1],
    o;

  function a(s) {
    return s != null && s <= s ? i[Fe(n, s, 0, r)] : o
  }

  function u() {
    var s = -1;
    for (n = new Array(r); ++s < r;) n[s] = ((s + 1) * e - (s - r) * t) / (r + 1);
    return a
  }
  return a.domain = function(s) {
    return arguments.length ? ([t, e] = s, t = +t, e = +e, u()) : [t, e]
  }, a.range = function(s) {
    return arguments.length ? (r = (i = Array.from(s)).length - 1, u()) : i.slice()
  }, a.invertExtent = function(s) {
    var l = i.indexOf(s);
    return l < 0 ? [NaN, NaN] : l < 1 ? [t, n[0]] : l >= r ? [n[r - 1], e] : [n[l - 1], n[l]]
  }, a.unknown = function(s) {
    return arguments.length && (o = s), a
  }, a.thresholds = function() {
    return n.slice()
  }, a.copy = function() {
    return ts().domain([t, e]).range(i).unknown(o)
  }, kt.apply(ce(a), arguments)
}

function es() {
  var t = [.5],
    e = [0, 1],
    r, n = 1;

  function i(o) {
    return o != null && o <= o ? e[Fe(t, o, 0, n)] : r
  }
  return i.domain = function(o) {
    return arguments.length ? (t = Array.from(o), n = Math.min(t.length, e.length - 1), i) : t.slice()
  }, i.range = function(o) {
    return arguments.length ? (e = Array.from(o), n = Math.min(t.length, e.length - 1), i) : e.slice()
  }, i.invertExtent = function(o) {
    var a = e.indexOf(o);
    return [t[a - 1], t[a]]
  }, i.unknown = function(o) {
    return arguments.length ? (r = o, i) : r
  }, i.copy = function() {
    return es().domain(t).range(e).unknown(r)
  }, kt.apply(i, arguments)
}
var Bf = new Date,
  qf = new Date;

function Et(t, e, r, n) {
  function i(o) {
    return t(o = arguments.length === 0 ? new Date : new Date(+o)), o
  }
  return i.floor = o => (t(o = new Date(+o)), o), i.ceil = o => (t(o = new Date(o - 1)), e(o, 1), t(o), o), i.round = o => {
    let a = i(o),
      u = i.ceil(o);
    return o - a < u - o ? a : u
  }, i.offset = (o, a) => (e(o = new Date(+o), a == null ? 1 : Math.floor(a)), o), i.range = (o, a, u) => {
    let s = [];
    if (o = i.ceil(o), u = u == null ? 1 : Math.floor(u), !(o < a) || !(u > 0)) return s;
    let l;
    do s.push(l = new Date(+o)), e(o, u), t(o); while (l < o && o < a);
    return s
  }, i.filter = o => Et(a => {
    if (a >= a)
      for (; t(a), !o(a);) a.setTime(a - 1)
  }, (a, u) => {
    if (a >= a)
      if (u < 0)
        for (; ++u <= 0;)
          for (; e(a, -1), !o(a););
      else
        for (; --u >= 0;)
          for (; e(a, 1), !o(a););
  }), r && (i.count = (o, a) => (Bf.setTime(+o), qf.setTime(+a), t(Bf), t(qf), Math.floor(r(Bf, qf))), i.every = o => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(n ? a => n(a) % o === 0 : a => i.count(0, a) % o === 0) : i)), i
}
var Co = Et(() => {}, (t, e) => {
  t.setTime(+t + e)
}, (t, e) => e - t);
Co.every = t => (t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? Et(e => {
  e.setTime(Math.floor(e / t) * t)
}, (e, r) => {
  e.setTime(+e + r * t)
}, (e, r) => (r - e) / t) : Co);
var kZ = Co.range;
var Re = Et(t => {
    t.setTime(t - t.getMilliseconds())
  }, (t, e) => {
    t.setTime(+t + e * 1e3)
  }, (t, e) => (e - t) / 1e3, t => t.getUTCSeconds()),
  nw = Re.range;
var ti = Et(t => {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * 1e3)
  }, (t, e) => {
    t.setTime(+t + e * 6e4)
  }, (t, e) => (e - t) / 6e4, t => t.getMinutes()),
  hB = ti.range,
  ei = Et(t => {
    t.setUTCSeconds(0, 0)
  }, (t, e) => {
    t.setTime(+t + e * 6e4)
  }, (t, e) => (e - t) / 6e4, t => t.getUTCMinutes()),
  yB = ei.range;
var ri = Et(t => {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * 1e3 - t.getMinutes() * 6e4)
  }, (t, e) => {
    t.setTime(+t + e * 36e5)
  }, (t, e) => (e - t) / 36e5, t => t.getHours()),
  vB = ri.range,
  ni = Et(t => {
    t.setUTCMinutes(0, 0, 0)
  }, (t, e) => {
    t.setTime(+t + e * 36e5)
  }, (t, e) => (e - t) / 36e5, t => t.getUTCHours()),
  gB = ni.range;
var vr = Et(t => t.setHours(0, 0, 0, 0), (t, e) => t.setDate(t.getDate() + e), (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 864e5, t => t.getDate() - 1),
  bB = vr.range,
  ln = Et(t => {
    t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCDate(t.getUTCDate() + e)
  }, (t, e) => (e - t) / 864e5, t => t.getUTCDate() - 1),
  xB = ln.range,
  rs = Et(t => {
    t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCDate(t.getUTCDate() + e)
  }, (t, e) => (e - t) / 864e5, t => Math.floor(t / 864e5)),
  wB = rs.range;

function cn(t) {
  return Et(e => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0)
  }, (e, r) => {
    e.setDate(e.getDate() + r * 7)
  }, (e, r) => (r - e - (r.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 6048e5)
}
var gr = cn(0),
  ii = cn(1),
  ow = cn(2),
  aw = cn(3),
  Cr = cn(4),
  uw = cn(5),
  sw = cn(6),
  lw = gr.range,
  OB = ii.range,
  SB = ow.range,
  AB = aw.range,
  _B = Cr.range,
  PB = uw.range,
  TB = sw.range;

function fn(t) {
  return Et(e => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0)
  }, (e, r) => {
    e.setUTCDate(e.getUTCDate() + r * 7)
  }, (e, r) => (r - e) / 6048e5)
}
var br = fn(0),
  oi = fn(1),
  cw = fn(2),
  fw = fn(3),
  Ir = fn(4),
  pw = fn(5),
  dw = fn(6),
  mw = br.range,
  EB = oi.range,
  jB = cw.range,
  MB = fw.range,
  CB = Ir.range,
  IB = pw.range,
  kB = dw.range;
var ai = Et(t => {
    t.setDate(1), t.setHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setMonth(t.getMonth() + e)
  }, (t, e) => e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12, t => t.getMonth()),
  DB = ai.range,
  ui = Et(t => {
    t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCMonth(t.getUTCMonth() + e)
  }, (t, e) => e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12, t => t.getUTCMonth()),
  NB = ui.range;
var be = Et(t => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e)
}, (t, e) => e.getFullYear() - t.getFullYear(), t => t.getFullYear());
be.every = t => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : Et(e => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
}, (e, r) => {
  e.setFullYear(e.getFullYear() + r * t)
});
var RB = be.range,
  xe = Et(t => {
    t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCFullYear(t.getUTCFullYear() + e)
  }, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), t => t.getUTCFullYear());
xe.every = t => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : Et(e => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
}, (e, r) => {
  e.setUTCFullYear(e.getUTCFullYear() + r * t)
});
var LB = xe.range;

function yw(t, e, r, n, i, o) {
  let a = [
    [Re, 1, 1e3],
    [Re, 5, 5 * 1e3],
    [Re, 15, 15 * 1e3],
    [Re, 30, 30 * 1e3],
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
    [e, 1, 2592e6],
    [e, 3, 3 * 2592e6],
    [t, 1, 31536e6]
  ];

  function u(l, f, c) {
    let p = f < l;
    p && ([l, f] = [f, l]);
    let d = c && typeof c.range == "function" ? c : s(l, f, c),
      y = d ? d.range(l, +f + 1) : [];
    return p ? y.reverse() : y
  }

  function s(l, f, c) {
    let p = Math.abs(f - l) / c,
      d = Zr(([, , v]) => v).right(a, p);
    if (d === a.length) return t.every(Xn(l / 31536e6, f / 31536e6, c));
    if (d === 0) return Co.every(Math.max(Xn(l, f, c), 1));
    let [y, m] = a[p / a[d - 1][2] < a[d][2] / p ? d - 1 : d];
    return y.every(m)
  }
  return [u, s]
}
var [Wf, zf] = yw(xe, ui, br, rs, ni, ei), [Ff, $f] = yw(be, ai, gr, vr, ri, ti);

function Uf(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
}

function Hf(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
}

function ko(t, e, r) {
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

function Gf(t) {
  var e = t.dateTime,
    r = t.date,
    n = t.time,
    i = t.periods,
    o = t.days,
    a = t.shortDays,
    u = t.months,
    s = t.shortMonths,
    l = Do(i),
    f = No(i),
    c = Do(o),
    p = No(o),
    d = Do(a),
    y = No(a),
    m = Do(u),
    v = No(u),
    x = Do(s),
    w = No(s),
    S = {
      a: O,
      A: T,
      b: A,
      B: M,
      c: null,
      d: Ow,
      e: Ow,
      f: uq,
      g: vq,
      G: bq,
      H: iq,
      I: oq,
      j: aq,
      L: Tw,
      m: sq,
      M: lq,
      p: E,
      q: D,
      Q: _w,
      s: Pw,
      S: cq,
      u: fq,
      U: pq,
      V: dq,
      w: mq,
      W: hq,
      x: null,
      X: null,
      y: yq,
      Y: gq,
      Z: xq,
      "%": Aw
    },
    P = {
      a: L,
      A: G,
      b: Z,
      B: J,
      c: null,
      d: Sw,
      e: Sw,
      f: Aq,
      g: Dq,
      G: Rq,
      H: wq,
      I: Oq,
      j: Sq,
      L: jw,
      m: _q,
      M: Pq,
      p: nt,
      q: yt,
      Q: _w,
      s: Pw,
      S: Tq,
      u: Eq,
      U: jq,
      V: Mq,
      w: Cq,
      W: Iq,
      x: null,
      X: null,
      y: kq,
      Y: Nq,
      Z: Lq,
      "%": Aw
    },
    h = {
      a: B,
      A: W,
      b: R,
      B: H,
      c: F,
      d: xw,
      e: xw,
      f: tq,
      g: bw,
      G: gw,
      H: ww,
      I: ww,
      j: YB,
      L: QB,
      m: XB,
      M: ZB,
      p: k,
      q: VB,
      Q: rq,
      s: nq,
      S: JB,
      u: $B,
      U: UB,
      V: HB,
      w: FB,
      W: GB,
      x: z,
      X: b,
      y: bw,
      Y: gw,
      Z: KB,
      "%": eq
    };
  S.x = g(r, S), S.X = g(n, S), S.c = g(e, S), P.x = g(r, P), P.X = g(n, P), P.c = g(e, P);

  function g(K, lt) {
    return function(tt) {
      var $ = [],
        Ot = -1,
        Q = 0,
        gt = K.length,
        jt, Rt, pe;
      for (tt instanceof Date || (tt = new Date(+tt)); ++Ot < gt;) K.charCodeAt(Ot) === 37 && ($.push(K.slice(Q, Ot)), (Rt = vw[jt = K.charAt(++Ot)]) != null ? jt = K.charAt(++Ot) : Rt = jt === "e" ? " " : "0", (pe = lt[jt]) && (jt = pe(tt, Rt)), $.push(jt), Q = Ot + 1);
      return $.push(K.slice(Q, Ot)), $.join("")
    }
  }

  function _(K, lt) {
    return function(tt) {
      var $ = ko(1900, void 0, 1),
        Ot = C($, K, tt += "", 0),
        Q, gt;
      if (Ot != tt.length) return null;
      if ("Q" in $) return new Date($.Q);
      if ("s" in $) return new Date($.s * 1e3 + ("L" in $ ? $.L : 0));
      if (lt && !("Z" in $) && ($.Z = 0), "p" in $ && ($.H = $.H % 12 + $.p * 12), $.m === void 0 && ($.m = "q" in $ ? $.q : 0), "V" in $) {
        if ($.V < 1 || $.V > 53) return null;
        "w" in $ || ($.w = 1), "Z" in $ ? (Q = Hf(ko($.y, 0, 1)), gt = Q.getUTCDay(), Q = gt > 4 || gt === 0 ? oi.ceil(Q) : oi(Q), Q = ln.offset(Q, ($.V - 1) * 7), $.y = Q.getUTCFullYear(), $.m = Q.getUTCMonth(), $.d = Q.getUTCDate() + ($.w + 6) % 7) : (Q = Uf(ko($.y, 0, 1)), gt = Q.getDay(), Q = gt > 4 || gt === 0 ? ii.ceil(Q) : ii(Q), Q = vr.offset(Q, ($.V - 1) * 7), $.y = Q.getFullYear(), $.m = Q.getMonth(), $.d = Q.getDate() + ($.w + 6) % 7)
      } else("W" in $ || "U" in $) && ("w" in $ || ($.w = "u" in $ ? $.u % 7 : "W" in $ ? 1 : 0), gt = "Z" in $ ? Hf(ko($.y, 0, 1)).getUTCDay() : Uf(ko($.y, 0, 1)).getDay(), $.m = 0, $.d = "W" in $ ? ($.w + 6) % 7 + $.W * 7 - (gt + 5) % 7 : $.w + $.U * 7 - (gt + 6) % 7);
      return "Z" in $ ? ($.H += $.Z / 100 | 0, $.M += $.Z % 100, Hf($)) : Uf($)
    }
  }

  function C(K, lt, tt, $) {
    for (var Ot = 0, Q = lt.length, gt = tt.length, jt, Rt; Ot < Q;) {
      if ($ >= gt) return -1;
      if (jt = lt.charCodeAt(Ot++), jt === 37) {
        if (jt = lt.charAt(Ot++), Rt = h[jt in vw ? lt.charAt(Ot++) : jt], !Rt || ($ = Rt(K, tt, $)) < 0) return -1
      } else if (jt != tt.charCodeAt($++)) return -1
    }
    return $
  }

  function k(K, lt, tt) {
    var $ = l.exec(lt.slice(tt));
    return $ ? (K.p = f.get($[0].toLowerCase()), tt + $[0].length) : -1
  }

  function B(K, lt, tt) {
    var $ = d.exec(lt.slice(tt));
    return $ ? (K.w = y.get($[0].toLowerCase()), tt + $[0].length) : -1
  }

  function W(K, lt, tt) {
    var $ = c.exec(lt.slice(tt));
    return $ ? (K.w = p.get($[0].toLowerCase()), tt + $[0].length) : -1
  }

  function R(K, lt, tt) {
    var $ = x.exec(lt.slice(tt));
    return $ ? (K.m = w.get($[0].toLowerCase()), tt + $[0].length) : -1
  }

  function H(K, lt, tt) {
    var $ = m.exec(lt.slice(tt));
    return $ ? (K.m = v.get($[0].toLowerCase()), tt + $[0].length) : -1
  }

  function F(K, lt, tt) {
    return C(K, e, lt, tt)
  }

  function z(K, lt, tt) {
    return C(K, r, lt, tt)
  }

  function b(K, lt, tt) {
    return C(K, n, lt, tt)
  }

  function O(K) {
    return a[K.getDay()]
  }

  function T(K) {
    return o[K.getDay()]
  }

  function A(K) {
    return s[K.getMonth()]
  }

  function M(K) {
    return u[K.getMonth()]
  }

  function E(K) {
    return i[+(K.getHours() >= 12)]
  }

  function D(K) {
    return 1 + ~~(K.getMonth() / 3)
  }

  function L(K) {
    return a[K.getUTCDay()]
  }

  function G(K) {
    return o[K.getUTCDay()]
  }

  function Z(K) {
    return s[K.getUTCMonth()]
  }

  function J(K) {
    return u[K.getUTCMonth()]
  }

  function nt(K) {
    return i[+(K.getUTCHours() >= 12)]
  }

  function yt(K) {
    return 1 + ~~(K.getUTCMonth() / 3)
  }
  return {
    format: function(K) {
      var lt = g(K += "", S);
      return lt.toString = function() {
        return K
      }, lt
    },
    parse: function(K) {
      var lt = _(K += "", !1);
      return lt.toString = function() {
        return K
      }, lt
    },
    utcFormat: function(K) {
      var lt = g(K += "", P);
      return lt.toString = function() {
        return K
      }, lt
    },
    utcParse: function(K) {
      var lt = _(K += "", !0);
      return lt.toString = function() {
        return K
      }, lt
    }
  }
}
var vw = {
    "-": "",
    _: " ",
    0: "0"
  },
  Kt = /^\s*\d+/,
  qB = /^%/,
  WB = /[\\^$*+?|[\]().{}]/g;

function xt(t, e, r) {
  var n = t < 0 ? "-" : "",
    i = (n ? -t : t) + "",
    o = i.length;
  return n + (o < r ? new Array(r - o + 1).join(e) + i : i)
}

function zB(t) {
  return t.replace(WB, "\\$&")
}

function Do(t) {
  return new RegExp("^(?:" + t.map(zB).join("|") + ")", "i")
}

function No(t) {
  return new Map(t.map((e, r) => [e.toLowerCase(), r]))
}

function FB(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 1));
  return n ? (t.w = +n[0], r + n[0].length) : -1
}

function $B(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 1));
  return n ? (t.u = +n[0], r + n[0].length) : -1
}

function UB(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 2));
  return n ? (t.U = +n[0], r + n[0].length) : -1
}

function HB(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 2));
  return n ? (t.V = +n[0], r + n[0].length) : -1
}

function GB(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 2));
  return n ? (t.W = +n[0], r + n[0].length) : -1
}

function gw(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 4));
  return n ? (t.y = +n[0], r + n[0].length) : -1
}

function bw(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 2));
  return n ? (t.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1
}

function KB(t, e, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
  return n ? (t.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1
}

function VB(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 1));
  return n ? (t.q = n[0] * 3 - 3, r + n[0].length) : -1
}

function XB(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 2));
  return n ? (t.m = n[0] - 1, r + n[0].length) : -1
}

function xw(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 2));
  return n ? (t.d = +n[0], r + n[0].length) : -1
}

function YB(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 3));
  return n ? (t.m = 0, t.d = +n[0], r + n[0].length) : -1
}

function ww(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 2));
  return n ? (t.H = +n[0], r + n[0].length) : -1
}

function ZB(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 2));
  return n ? (t.M = +n[0], r + n[0].length) : -1
}

function JB(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 2));
  return n ? (t.S = +n[0], r + n[0].length) : -1
}

function QB(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 3));
  return n ? (t.L = +n[0], r + n[0].length) : -1
}

function tq(t, e, r) {
  var n = Kt.exec(e.slice(r, r + 6));
  return n ? (t.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1
}

function eq(t, e, r) {
  var n = qB.exec(e.slice(r, r + 1));
  return n ? r + n[0].length : -1
}

function rq(t, e, r) {
  var n = Kt.exec(e.slice(r));
  return n ? (t.Q = +n[0], r + n[0].length) : -1
}

function nq(t, e, r) {
  var n = Kt.exec(e.slice(r));
  return n ? (t.s = +n[0], r + n[0].length) : -1
}

function Ow(t, e) {
  return xt(t.getDate(), e, 2)
}

function iq(t, e) {
  return xt(t.getHours(), e, 2)
}

function oq(t, e) {
  return xt(t.getHours() % 12 || 12, e, 2)
}

function aq(t, e) {
  return xt(1 + vr.count(be(t), t), e, 3)
}

function Tw(t, e) {
  return xt(t.getMilliseconds(), e, 3)
}

function uq(t, e) {
  return Tw(t, e) + "000"
}

function sq(t, e) {
  return xt(t.getMonth() + 1, e, 2)
}

function lq(t, e) {
  return xt(t.getMinutes(), e, 2)
}

function cq(t, e) {
  return xt(t.getSeconds(), e, 2)
}

function fq(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e
}

function pq(t, e) {
  return xt(gr.count(be(t) - 1, t), e, 2)
}

function Ew(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Cr(t) : Cr.ceil(t)
}

function dq(t, e) {
  return t = Ew(t), xt(Cr.count(be(t), t) + (be(t).getDay() === 4), e, 2)
}

function mq(t) {
  return t.getDay()
}

function hq(t, e) {
  return xt(ii.count(be(t) - 1, t), e, 2)
}

function yq(t, e) {
  return xt(t.getFullYear() % 100, e, 2)
}

function vq(t, e) {
  return t = Ew(t), xt(t.getFullYear() % 100, e, 2)
}

function gq(t, e) {
  return xt(t.getFullYear() % 1e4, e, 4)
}

function bq(t, e) {
  var r = t.getDay();
  return t = r >= 4 || r === 0 ? Cr(t) : Cr.ceil(t), xt(t.getFullYear() % 1e4, e, 4)
}

function xq(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + xt(e / 60 | 0, "0", 2) + xt(e % 60, "0", 2)
}

function Sw(t, e) {
  return xt(t.getUTCDate(), e, 2)
}

function wq(t, e) {
  return xt(t.getUTCHours(), e, 2)
}

function Oq(t, e) {
  return xt(t.getUTCHours() % 12 || 12, e, 2)
}

function Sq(t, e) {
  return xt(1 + ln.count(xe(t), t), e, 3)
}

function jw(t, e) {
  return xt(t.getUTCMilliseconds(), e, 3)
}

function Aq(t, e) {
  return jw(t, e) + "000"
}

function _q(t, e) {
  return xt(t.getUTCMonth() + 1, e, 2)
}

function Pq(t, e) {
  return xt(t.getUTCMinutes(), e, 2)
}

function Tq(t, e) {
  return xt(t.getUTCSeconds(), e, 2)
}

function Eq(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e
}

function jq(t, e) {
  return xt(br.count(xe(t) - 1, t), e, 2)
}

function Mw(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Ir(t) : Ir.ceil(t)
}

function Mq(t, e) {
  return t = Mw(t), xt(Ir.count(xe(t), t) + (xe(t).getUTCDay() === 4), e, 2)
}

function Cq(t) {
  return t.getUTCDay()
}

function Iq(t, e) {
  return xt(oi.count(xe(t) - 1, t), e, 2)
}

function kq(t, e) {
  return xt(t.getUTCFullYear() % 100, e, 2)
}

function Dq(t, e) {
  return t = Mw(t), xt(t.getUTCFullYear() % 100, e, 2)
}

function Nq(t, e) {
  return xt(t.getUTCFullYear() % 1e4, e, 4)
}

function Rq(t, e) {
  var r = t.getUTCDay();
  return t = r >= 4 || r === 0 ? Ir(t) : Ir.ceil(t), xt(t.getUTCFullYear() % 1e4, e, 4)
}

function Lq() {
  return "+0000"
}

function Aw() {
  return "%"
}

function _w(t) {
  return +t
}

function Pw(t) {
  return Math.floor(+t / 1e3)
}
var si, ns, Cw, is, Iw;
Kf({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function Kf(t) {
  return si = Gf(t), ns = si.format, Cw = si.parse, is = si.utcFormat, Iw = si.utcParse, si
}

function Bq(t) {
  return new Date(t)
}

function qq(t) {
  return t instanceof Date ? +t : +new Date(+t)
}

function os(t, e, r, n, i, o, a, u, s, l) {
  var f = nn(),
    c = f.invert,
    p = f.domain,
    d = l(".%L"),
    y = l(":%S"),
    m = l("%I:%M"),
    v = l("%I %p"),
    x = l("%a %d"),
    w = l("%b %d"),
    S = l("%B"),
    P = l("%Y");

  function h(g) {
    return (s(g) < g ? d : u(g) < g ? y : a(g) < g ? m : o(g) < g ? v : n(g) < g ? i(g) < g ? x : w : r(g) < g ? S : P)(g)
  }
  return f.invert = function(g) {
    return new Date(c(g))
  }, f.domain = function(g) {
    return arguments.length ? p(Array.from(g, qq)) : p().map(Bq)
  }, f.ticks = function(g) {
    var _ = p();
    return t(_[0], _[_.length - 1], g ?? 10)
  }, f.tickFormat = function(g, _) {
    return _ == null ? h : l(_)
  }, f.nice = function(g) {
    var _ = p();
    return (!g || typeof g.range != "function") && (g = e(_[0], _[_.length - 1], g ?? 10)), g ? p(Po(_, g)) : f
  }, f.copy = function() {
    return nr(f, os(t, e, r, n, i, o, a, u, s, l))
  }, f
}

function Vf() {
  return kt.apply(os(Ff, $f, be, ai, gr, vr, ri, ti, Re, ns).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments)
}

function Xf() {
  return kt.apply(os(Wf, zf, xe, ui, br, ln, ni, ei, Re, is).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments)
}

function as() {
  var t = 0,
    e = 1,
    r, n, i, o, a = zt,
    u = !1,
    s;

  function l(c) {
    return c == null || isNaN(c = +c) ? s : a(i === 0 ? .5 : (c = (o(c) - r) * i, u ? Math.max(0, Math.min(1, c)) : c))
  }
  l.domain = function(c) {
    return arguments.length ? ([t, e] = c, r = o(t = +t), n = o(e = +e), i = r === n ? 0 : 1 / (n - r), l) : [t, e]
  }, l.clamp = function(c) {
    return arguments.length ? (u = !!c, l) : u
  }, l.interpolator = function(c) {
    return arguments.length ? (a = c, l) : a
  };

  function f(c) {
    return function(p) {
      var d, y;
      return arguments.length ? ([d, y] = p, a = c(d, y), l) : [a(0), a(1)]
    }
  }
  return l.range = f(ge), l.rangeRound = f(en), l.unknown = function(c) {
      return arguments.length ? (s = c, l) : s
    },
    function(c) {
      return o = c, r = c(t), n = c(e), i = r === n ? 0 : 1 / (n - r), l
    }
}

function xr(t, e) {
  return e.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown())
}

function us() {
  var t = ce(as()(zt));
  return t.copy = function() {
    return xr(t, us())
  }, Ne.apply(t, arguments)
}

function Yf() {
  var t = To(as()).domain([1, 10]);
  return t.copy = function() {
    return xr(t, Yf()).base(t.base())
  }, Ne.apply(t, arguments)
}

function Zf() {
  var t = Eo(as());
  return t.copy = function() {
    return xr(t, Zf()).constant(t.constant())
  }, Ne.apply(t, arguments)
}

function ss() {
  var t = jo(as());
  return t.copy = function() {
    return xr(t, ss()).exponent(t.exponent())
  }, Ne.apply(t, arguments)
}

function kw() {
  return ss.apply(null, arguments).exponent(.5)
}

function ls() {
  var t = [],
    e = zt;

  function r(n) {
    if (n != null && !isNaN(n = +n)) return e((Fe(t, n, 1) - 1) / (t.length - 1))
  }
  return r.domain = function(n) {
    if (!arguments.length) return t.slice();
    t = [];
    for (let i of n) i != null && !isNaN(i = +i) && t.push(i);
    return t.sort(le), r
  }, r.interpolator = function(n) {
    return arguments.length ? (e = n, r) : e
  }, r.range = function() {
    return t.map((n, i) => e(i / (t.length - 1)))
  }, r.quantiles = function(n) {
    return Array.from({
      length: n + 1
    }, (i, o) => Ru(t, o / n))
  }, r.copy = function() {
    return ls(e).domain(t)
  }, Ne.apply(r, arguments)
}

function cs() {
  var t = 0,
    e = .5,
    r = 1,
    n = 1,
    i, o, a, u, s, l = zt,
    f, c = !1,
    p;

  function d(m) {
    return isNaN(m = +m) ? p : (m = .5 + ((m = +f(m)) - o) * (n * m < n * o ? u : s), l(c ? Math.max(0, Math.min(1, m)) : m))
  }
  d.domain = function(m) {
    return arguments.length ? ([t, e, r] = m, i = f(t = +t), o = f(e = +e), a = f(r = +r), u = i === o ? 0 : .5 / (o - i), s = o === a ? 0 : .5 / (a - o), n = o < i ? -1 : 1, d) : [t, e, r]
  }, d.clamp = function(m) {
    return arguments.length ? (c = !!m, d) : c
  }, d.interpolator = function(m) {
    return arguments.length ? (l = m, d) : l
  };

  function y(m) {
    return function(v) {
      var x, w, S;
      return arguments.length ? ([x, w, S] = v, l = Hu(m, [x, w, S]), d) : [l(0), l(.5), l(1)]
    }
  }
  return d.range = y(ge), d.rangeRound = y(en), d.unknown = function(m) {
      return arguments.length ? (p = m, d) : p
    },
    function(m) {
      return f = m, i = m(t), o = m(e), a = m(r), u = i === o ? 0 : .5 / (o - i), s = o === a ? 0 : .5 / (a - o), n = o < i ? -1 : 1, d
    }
}

function fs() {
  var t = ce(cs()(zt));
  return t.copy = function() {
    return xr(t, fs())
  }, Ne.apply(t, arguments)
}

function Jf() {
  var t = To(cs()).domain([.1, 1, 10]);
  return t.copy = function() {
    return xr(t, Jf()).base(t.base())
  }, Ne.apply(t, arguments)
}

function Qf() {
  var t = Eo(cs());
  return t.copy = function() {
    return xr(t, Qf()).constant(t.constant())
  }, Ne.apply(t, arguments)
}

function ps() {
  var t = jo(cs());
  return t.copy = function() {
    return xr(t, ps()).exponent(t.exponent())
  }, Ne.apply(t, arguments)
}

function Dw() {
  return ps.apply(null, arguments).exponent(.5)
}
var Uo = et(qw()),
  Ho = et($w()),
  we = et(Te()),
  fi = et(Lt()),
  d1 = et($a()),
  yp = et(zr()),
  m1 = et(Kw()),
  xs = et(kl()),
  h1 = et(nu()),
  y1 = et(Ro()),
  v1 = et(Su());
var _t = et(ep());

function sW(t) {
  return pW(t) || fW(t) || cW(t) || lW()
}

function lW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function cW(t, e) {
  if (t) {
    if (typeof t == "string") return rp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return rp(t, e)
  }
}

function fW(t) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(t)) return Array.from(t)
}

function pW(t) {
  if (Array.isArray(t)) return rp(t)
}

function rp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var dW = function(e) {
    return e
  },
  Zw = {
    "@@functional/placeholder": !0
  },
  Jw = function(e) {
    return e === Zw
  },
  Yw = function(e) {
    return function r() {
      return arguments.length === 0 || arguments.length === 1 && Jw(arguments.length <= 0 ? void 0 : arguments[0]) ? r : e.apply(void 0, arguments)
    }
  },
  mW = function t(e, r) {
    return e === 1 ? r : Yw(function() {
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      var a = i.filter(function(u) {
        return u !== Zw
      }).length;
      return a >= e ? r.apply(void 0, i) : t(e - a, Yw(function() {
        for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++) s[l] = arguments[l];
        var f = i.map(function(c) {
          return Jw(c) ? s.shift() : c
        });
        return r.apply(void 0, sW(f).concat(s))
      }))
    })
  },
  Lo = function(e) {
    return mW(e.length, e)
  },
  Bo = function(e, r) {
    for (var n = [], i = e; i < r; ++i) n[i - e] = i;
    return n
  },
  np = Lo(function(t, e) {
    return Array.isArray(e) ? e.map(t) : Object.keys(e).map(function(r) {
      return e[r]
    }).map(t)
  }),
  ip = function() {
    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
    if (!r.length) return dW;
    var i = r.reverse(),
      o = i[0],
      a = i.slice(1);
    return function() {
      return a.reduce(function(u, s) {
        return s(u)
      }, o.apply(void 0, arguments))
    }
  },
  qo = function(e) {
    return Array.isArray(e) ? e.reverse() : e.split("").reverse.join("")
  },
  hs = function(e) {
    var r = null,
      n = null;
    return function() {
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
      return r && o.every(function(u, s) {
        return u === r[s]
      }) || (r = o, n = e.apply(void 0, o)), n
    }
  };
var op = et(ep());

function hW(t) {
  var e;
  return t === 0 ? e = 1 : e = Math.floor(new op.default(t).abs().log(10).toNumber()) + 1, e
}

function yW(t, e, r) {
  for (var n = new op.default(t), i = 0, o = []; n.lt(e) && i < 1e5;) o.push(n.toNumber()), n = n.add(r), i++;
  return o
}
var vW = Lo(function(t, e, r) {
    var n = +t,
      i = +e;
    return n + r * (i - n)
  }),
  gW = Lo(function(t, e, r) {
    var n = e - +t;
    return n = n || 1 / 0, (r - t) / n
  }),
  bW = Lo(function(t, e, r) {
    var n = e - +t;
    return n = n || 1 / 0, Math.max(0, Math.min(1, (r - t) / n))
  }),
  Wo = {
    rangeStep: yW,
    getDigitCount: hW,
    interpolateNumber: vW,
    uninterpolateNumber: gW,
    uninterpolateTruncation: bW
  };

function ap(t) {
  return OW(t) || wW(t) || Qw(t) || xW()
}

function xW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function wW(t) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(t)) return Array.from(t)
}

function OW(t) {
  if (Array.isArray(t)) return up(t)
}

function pn(t, e) {
  return _W(t) || AW(t, e) || Qw(t, e) || SW()
}

function SW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Qw(t, e) {
  if (t) {
    if (typeof t == "string") return up(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return up(t, e)
  }
}

function up(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function AW(t, e) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(t)))) {
    var r = [],
      n = !0,
      i = !1,
      o = void 0;
    try {
      for (var a = t[Symbol.iterator](), u; !(n = (u = a.next()).done) && (r.push(u.value), !(e && r.length === e)); n = !0);
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

function _W(t) {
  if (Array.isArray(t)) return t
}

function sp(t) {
  var e = pn(t, 2),
    r = e[0],
    n = e[1],
    i = r,
    o = n;
  return r > n && (i = n, o = r), [i, o]
}

function lp(t, e, r) {
  if (t.lte(0)) return new _t.default(0);
  var n = Wo.getDigitCount(t.toNumber()),
    i = new _t.default(10).pow(n),
    o = t.div(i),
    a = n !== 1 ? .05 : .1,
    u = new _t.default(Math.ceil(o.div(a).toNumber())).add(r).mul(a),
    s = u.mul(i);
  return e ? s : new _t.default(Math.ceil(s))
}

function t1(t, e, r) {
  var n = 1,
    i = new _t.default(t);
  if (!i.isint() && r) {
    var o = Math.abs(t);
    o < 1 ? (n = new _t.default(10).pow(Wo.getDigitCount(t) - 1), i = new _t.default(Math.floor(i.div(n).toNumber())).mul(n)) : o > 1 && (i = new _t.default(Math.floor(t)))
  } else t === 0 ? i = new _t.default(Math.floor((e - 1) / 2)) : r || (i = new _t.default(Math.floor(t)));
  var a = Math.floor((e - 1) / 2),
    u = ip(np(function(s) {
      return i.add(new _t.default(s - a).mul(n)).toNumber()
    }), Bo);
  return u(0, e)
}

function e1(t, e, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((e - t) / (r - 1))) return {
    step: new _t.default(0),
    tickMin: new _t.default(0),
    tickMax: new _t.default(0)
  };
  var o = lp(new _t.default(e).sub(t).div(r - 1), n, i),
    a;
  t <= 0 && e >= 0 ? a = new _t.default(0) : (a = new _t.default(t).add(e).div(2), a = a.sub(new _t.default(a).mod(o)));
  var u = Math.ceil(a.sub(t).div(o).toNumber()),
    s = Math.ceil(new _t.default(e).sub(a).div(o).toNumber()),
    l = u + s + 1;
  return l > r ? e1(t, e, r, n, i + 1) : (l < r && (s = e > 0 ? s + (r - l) : s, u = e > 0 ? u : u + (r - l)), {
    step: o,
    tickMin: a.sub(new _t.default(u).mul(o)),
    tickMax: a.add(new _t.default(s).mul(o))
  })
}

function PW(t) {
  var e = pn(t, 2),
    r = e[0],
    n = e[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = sp([r, n]),
    s = pn(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) {
    var c = f === 1 / 0 ? [l].concat(ap(Bo(0, i - 1).map(function() {
      return 1 / 0
    }))) : [].concat(ap(Bo(0, i - 1).map(function() {
      return -1 / 0
    })), [f]);
    return r > n ? qo(c) : c
  }
  if (l === f) return t1(l, i, o);
  var p = e1(l, f, a, o),
    d = p.step,
    y = p.tickMin,
    m = p.tickMax,
    v = Wo.rangeStep(y, m.add(new _t.default(.1).mul(d)), d);
  return r > n ? qo(v) : v
}

function TW(t) {
  var e = pn(t, 2),
    r = e[0],
    n = e[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = sp([r, n]),
    s = pn(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) return [r, n];
  if (l === f) return t1(l, i, o);
  var c = lp(new _t.default(f).sub(l).div(a - 1), o, 0),
    p = ip(np(function(y) {
      return new _t.default(l).add(new _t.default(y).mul(c)).toNumber()
    }), Bo),
    d = p(0, a).filter(function(y) {
      return y >= l && y <= f
    });
  return r > n ? qo(d) : d
}

function EW(t, e) {
  var r = pn(t, 2),
    n = r[0],
    i = r[1],
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = sp([n, i]),
    u = pn(a, 2),
    s = u[0],
    l = u[1];
  if (s === -1 / 0 || l === 1 / 0) return [n, i];
  if (s === l) return [s];
  var f = Math.max(e, 2),
    c = lp(new _t.default(l).sub(s).div(f - 1), o, 0),
    p = [].concat(ap(Wo.rangeStep(new _t.default(s), new _t.default(l).sub(new _t.default(.99).mul(c)), c)), [l]);
  return n > i ? qo(p) : p
}
var cp = hs(PW),
  jW = hs(TW),
  fp = hs(EW);
import ys from "./react-shim-eraudit.js";
var MW = !0,
  pp = "Invariant failed";

function Ue(t, e) {
  if (!t) {
    if (MW) throw new Error(pp);
    var r = typeof e == "function" ? e() : e,
      n = r ? "".concat(pp, ": ").concat(r) : pp;
    throw new Error(n)
  }
}
var CW = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];

function li(t) {
  "@babel/helpers - typeof";
  return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, li(t)
}

function vs() {
  return vs = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, vs.apply(this, arguments)
}

function IW(t, e) {
  return RW(t) || NW(t, e) || DW(t, e) || kW()
}

function kW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function DW(t, e) {
  if (t) {
    if (typeof t == "string") return r1(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return r1(t, e)
  }
}

function r1(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function NW(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function RW(t) {
  if (Array.isArray(t)) return t
}

function LW(t, e) {
  if (t == null) return {};
  var r = BW(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function BW(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function qW(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function n1(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, a1(n.key), n)
  }
}

function WW(t, e, r) {
  return e && n1(t.prototype, e), r && n1(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function zW(t, e, r) {
  return e = gs(e), FW(t, i1() ? Reflect.construct(e, r || [], gs(t).constructor) : e.apply(t, r))
}

function FW(t, e) {
  if (e && (li(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return $W(t)
}

function $W(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function i1() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (i1 = function() {
    return !!t
  })()
}

function gs(t) {
  return gs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, gs(t)
}

function UW(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && dp(t, e)
}

function dp(t, e) {
  return dp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, dp(t, e)
}

function o1(t, e, r) {
  return e = a1(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function a1(t) {
  var e = HW(t, "string");
  return li(e) == "symbol" ? e : e + ""
}

function HW(t, e) {
  if (li(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var kr = function(t) {
  function e() {
    return qW(this, e), zW(this, e, arguments)
  }
  return UW(e, t), WW(e, [{
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
        p = LW(n, CW),
        d = st(p, !1);
      this.props.direction === "x" && f.type !== "number" && Ue(!1);
      var y = s.map(function(m) {
        var v = l(m, u),
          x = v.x,
          w = v.y,
          S = v.value,
          P = v.errorVal;
        if (!P) return null;
        var h = [],
          g, _;
        if (Array.isArray(P)) {
          var C = IW(P, 2);
          g = C[0], _ = C[1]
        } else g = _ = P;
        if (o === "vertical") {
          var k = f.scale,
            B = w + i,
            W = B + a,
            R = B - a,
            H = k(S - g),
            F = k(S + _);
          h.push({
            x1: F,
            y1: W,
            x2: F,
            y2: R
          }), h.push({
            x1: H,
            y1: B,
            x2: F,
            y2: B
          }), h.push({
            x1: H,
            y1: W,
            x2: H,
            y2: R
          })
        } else if (o === "horizontal") {
          var z = c.scale,
            b = x + i,
            O = b - a,
            T = b + a,
            A = z(S - g),
            M = z(S + _);
          h.push({
            x1: O,
            y1: M,
            x2: T,
            y2: M
          }), h.push({
            x1: b,
            y1: A,
            x2: b,
            y2: M
          }), h.push({
            x1: O,
            y1: A,
            x2: T,
            y2: A
          })
        }
        return ys.createElement(bt, vs({
          className: "recharts-errorBar",
          key: "bar-".concat(h.map(function(E) {
            return "".concat(E.x1, "-").concat(E.x2, "-").concat(E.y1, "-").concat(E.y2)
          }))
        }, d), h.map(function(E) {
          return ys.createElement("line", vs({}, E, {
            key: "line-".concat(E.x1, "-").concat(E.x2, "-").concat(E.y1, "-").concat(E.y2)
          }))
        }))
      });
      return ys.createElement(bt, {
        className: "recharts-errorBars"
      }, y)
    }
  }])
}(ys.Component);
o1(kr, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
o1(kr, "displayName", "ErrorBar");

function zo(t) {
  "@babel/helpers - typeof";
  return zo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, zo(t)
}

function u1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function dn(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? u1(Object(r), !0).forEach(function(n) {
      GW(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : u1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function GW(t, e, r) {
  return e = KW(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function KW(t) {
  var e = VW(t, "string");
  return zo(e) == "symbol" ? e : e + ""
}

function VW(t, e) {
  if (zo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (zo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var bs = function(e) {
  var r = e.children,
    n = e.formattedGraphicalItems,
    i = e.legendWidth,
    o = e.legendContent,
    a = Zt(r, De);
  if (!a) return null;
  var u = De.defaultProps,
    s = u !== void 0 ? dn(dn({}, u), a.props) : {},
    l;
  return a.props && a.props.payload ? l = a.props && a.props.payload : o === "children" ? l = (n || []).reduce(function(f, c) {
    var p = c.item,
      d = c.props,
      y = d.sectors || d.data || [];
    return f.concat(y.map(function(m) {
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
      d = p !== void 0 ? dn(dn({}, p), c.props) : {},
      y = d.dataKey,
      m = d.name,
      v = d.legendType,
      x = d.hide;
    return {
      inactive: x,
      dataKey: y,
      type: s.iconType || v || "square",
      color: Fo(c),
      value: m || y,
      payload: d
    }
  }), dn(dn(dn({}, s), De.getWithHeight(a, i)), {}, {
    payload: l,
    item: a
  })
};

function $o(t) {
  "@babel/helpers - typeof";
  return $o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, $o(t)
}

function s1(t) {
  return JW(t) || ZW(t) || YW(t) || XW()
}

function XW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function YW(t, e) {
  if (t) {
    if (typeof t == "string") return hp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return hp(t, e)
  }
}

function ZW(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function JW(t) {
  if (Array.isArray(t)) return hp(t)
}

function hp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function l1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Dt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? l1(Object(r), !0).forEach(function(n) {
      ci(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : l1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ci(t, e, r) {
  return e = QW(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function QW(t) {
  var e = tz(t, "string");
  return $o(e) == "symbol" ? e : e + ""
}

function tz(t, e) {
  if ($o(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if ($o(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Vt(t, e, r) {
  return (0, we.default)(t) || (0, we.default)(e) ? r : Mt(e) ? (0, yp.default)(t, e, r) : (0, fi.default)(e) ? e(t) : r
}

function pi(t, e, r, n) {
  var i = (0, m1.default)(t, function(u) {
    return Vt(u, e)
  });
  if (r === "number") {
    var o = i.filter(function(u) {
      return X(u) || parseFloat(u)
    });
    return o.length ? [(0, Ho.default)(o), (0, Uo.default)(o)] : [1 / 0, -1 / 0]
  }
  var a = n ? i.filter(function(u) {
    return !(0, we.default)(u)
  }) : i;
  return a.map(function(u) {
    return Mt(u) || u instanceof Date ? u : ""
  })
}
var g1 = function(e) {
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
          d = void 0;
        if (Yt(c - f) !== Yt(p - c)) {
          var y = [];
          if (Yt(p - c) === Yt(s[1] - s[0])) {
            d = p;
            var m = c + s[1] - s[0];
            y[0] = Math.min(m, (m + f) / 2), y[1] = Math.max(m, (m + f) / 2)
          } else {
            d = f;
            var v = p + s[1] - s[0];
            y[0] = Math.min(c, (v + c) / 2), y[1] = Math.max(c, (v + c) / 2)
          }
          var x = [Math.min(c, (d + c) / 2), Math.max(c, (d + c) / 2)];
          if (e > x[0] && e <= x[1] || e >= y[0] && e <= y[1]) {
            a = i[l].index;
            break
          }
        } else {
          var w = Math.min(f, p),
            S = Math.max(f, p);
          if (e > (w + c) / 2 && e <= (S + c) / 2) {
            a = i[l].index;
            break
          }
        }
      } else
        for (var P = 0; P < u; P++)
          if (P === 0 && e <= (n[P].coordinate + n[P + 1].coordinate) / 2 || P > 0 && P < u - 1 && e > (n[P].coordinate + n[P - 1].coordinate) / 2 && e <= (n[P].coordinate + n[P + 1].coordinate) / 2 || P === u - 1 && e > (n[P].coordinate + n[P - 1].coordinate) / 2) {
            a = n[P].index;
            break
          } return a
  },
  Fo = function(e) {
    var r, n = e,
      i = n.type.displayName,
      o = (r = e.type) !== null && r !== void 0 && r.defaultProps ? Dt(Dt({}, e.type.defaultProps), e.props) : e.props,
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
  b1 = function(e) {
    var r = e.barSize,
      n = e.totalSize,
      i = e.stackGroups,
      o = i === void 0 ? {} : i;
    if (!o) return {};
    for (var a = {}, u = Object.keys(o), s = 0, l = u.length; s < l; s++)
      for (var f = o[u[s]].stackGroups, c = Object.keys(f), p = 0, d = c.length; p < d; p++) {
        var y = f[c[p]],
          m = y.items,
          v = y.cateAxisId,
          x = m.filter(function(_) {
            return je(_.type).indexOf("Bar") >= 0
          });
        if (x && x.length) {
          var w = x[0].type.defaultProps,
            S = w !== void 0 ? Dt(Dt({}, w), x[0].props) : x[0].props,
            P = S.barSize,
            h = S[v];
          a[h] || (a[h] = []);
          var g = (0, we.default)(P) ? r : P;
          a[h].push({
            item: x[0],
            stackList: x.slice(1),
            barSize: (0, we.default)(g) ? void 0 : ze(g, n, 0)
          })
        }
      }
    return a
  },
  x1 = function(e) {
    var r = e.barGap,
      n = e.barCategoryGap,
      i = e.bandSize,
      o = e.sizeList,
      a = o === void 0 ? [] : o,
      u = e.maxBarSize,
      s = a.length;
    if (s < 1) return null;
    var l = ze(r, i, 0, !0),
      f, c = [];
    if (a[0].barSize === +a[0].barSize) {
      var p = !1,
        d = i / s,
        y = a.reduce(function(P, h) {
          return P + h.barSize || 0
        }, 0);
      y += (s - 1) * l, y >= i && (y -= (s - 1) * l, l = 0), y >= i && d > 0 && (p = !0, d *= .9, y = s * d);
      var m = (i - y) / 2 >> 0,
        v = {
          offset: m - l,
          size: 0
        };
      f = a.reduce(function(P, h) {
        var g = {
            item: h.item,
            position: {
              offset: v.offset + v.size + l,
              size: p ? d : h.barSize
            }
          },
          _ = [].concat(s1(P), [g]);
        return v = _[_.length - 1].position, h.stackList && h.stackList.length && h.stackList.forEach(function(C) {
          _.push({
            item: C,
            position: v
          })
        }), _
      }, c)
    } else {
      var x = ze(n, i, 0, !0);
      i - 2 * x - (s - 1) * l <= 0 && (l = 0);
      var w = (i - 2 * x - (s - 1) * l) / s;
      w > 1 && (w >>= 0);
      var S = u === +u ? Math.min(w, u) : w;
      f = a.reduce(function(P, h, g) {
        var _ = [].concat(s1(P), [{
          item: h.item,
          position: {
            offset: x + (w + l) * g + (w - S) / 2,
            size: S
          }
        }]);
        return h.stackList && h.stackList.length && h.stackList.forEach(function(C) {
          _.push({
            item: C,
            position: _[_.length - 1].position
          })
        }), _
      }, c)
    }
    return f
  },
  w1 = function(e, r, n, i) {
    var o = n.children,
      a = n.width,
      u = n.margin,
      s = a - (u.left || 0) - (u.right || 0),
      l = bs({
        children: o,
        legendWidth: s
      });
    if (l) {
      var f = i || {},
        c = f.width,
        p = f.height,
        d = l.align,
        y = l.verticalAlign,
        m = l.layout;
      if ((m === "vertical" || m === "horizontal" && y === "middle") && d !== "center" && X(e[d])) return Dt(Dt({}, e), {}, ci({}, d, e[d] + (c || 0)));
      if ((m === "horizontal" || m === "vertical" && d === "center") && y !== "middle" && X(e[y])) return Dt(Dt({}, e), {}, ci({}, y, e[y] + (p || 0)))
    }
    return e
  },
  ez = function(e, r, n) {
    return (0, we.default)(r) ? !0 : e === "horizontal" ? r === "yAxis" : e === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0
  },
  O1 = function(e, r, n, i, o) {
    var a = r.props.children,
      u = Wt(a, kr).filter(function(l) {
        return ez(i, o, l.props.direction)
      });
    if (u && u.length) {
      var s = u.map(function(l) {
        return l.props.dataKey
      });
      return e.reduce(function(l, f) {
        var c = Vt(f, n);
        if ((0, we.default)(c)) return l;
        var p = Array.isArray(c) ? [(0, Ho.default)(c), (0, Uo.default)(c)] : [c, c],
          d = s.reduce(function(y, m) {
            var v = Vt(f, m, 0),
              x = p[0] - Math.abs(Array.isArray(v) ? v[0] : v),
              w = p[1] + Math.abs(Array.isArray(v) ? v[1] : v);
            return [Math.min(x, y[0]), Math.max(w, y[1])]
          }, [1 / 0, -1 / 0]);
        return [Math.min(d[0], l[0]), Math.max(d[1], l[1])]
      }, [1 / 0, -1 / 0])
    }
    return null
  },
  S1 = function(e, r, n, i, o) {
    var a = r.map(function(u) {
      return O1(e, u, n, o, i)
    }).filter(function(u) {
      return !(0, we.default)(u)
    });
    return a && a.length ? a.reduce(function(u, s) {
      return [Math.min(u[0], s[0]), Math.max(u[1], s[1])]
    }, [1 / 0, -1 / 0]) : null
  },
  vp = function(e, r, n, i, o) {
    var a = r.map(function(s) {
      var l = s.props.dataKey;
      return n === "number" && l && O1(e, s, l, i) || pi(e, l, n, o)
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
  gp = function(e, r) {
    return e === "horizontal" && r === "xAxis" || e === "vertical" && r === "yAxis" || e === "centric" && r === "angleAxis" || e === "radial" && r === "radiusAxis"
  },
  bp = function(e, r, n, i) {
    if (i) return e.map(function(s) {
      return s.coordinate
    });
    var o, a, u = e.map(function(s) {
      return s.coordinate === r && (o = !0), s.coordinate === n && (a = !0), s.coordinate
    });
    return o || u.push(r), a || u.push(n), u
  },
  Oe = function(e, r, n) {
    if (!e) return null;
    var i = e.scale,
      o = e.duplicateDomain,
      a = e.type,
      u = e.range,
      s = e.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2,
      l = (r || n) && a === "category" && i.bandwidth ? i.bandwidth() / s : 0;
    if (l = e.axisType === "angleAxis" && u?.length >= 2 ? Yt(u[0] - u[1]) * 2 * l : l, r && (e.ticks || e.niceTicks)) {
      var f = (e.ticks || e.niceTicks).map(function(c) {
        var p = o ? o.indexOf(c) : c;
        return {
          coordinate: i(p) + l,
          value: c,
          offset: l
        }
      });
      return f.filter(function(c) {
        return !(0, xs.default)(c.coordinate)
      })
    }
    return e.isCategorical && e.categoricalDomain ? e.categoricalDomain.map(function(c, p) {
      return {
        coordinate: i(c) + l,
        value: c,
        index: p,
        offset: l
      }
    }) : i.ticks && !n ? i.ticks(e.tickCount).map(function(c) {
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
  mp = new WeakMap,
  Go = function(e, r) {
    if (typeof r != "function") return e;
    mp.has(e) || mp.set(e, new WeakMap);
    var n = mp.get(e);
    if (n.has(r)) return n.get(r);
    var i = function() {
      e.apply(void 0, arguments), r.apply(void 0, arguments)
    };
    return n.set(r, i), i
  },
  A1 = function(e, r, n) {
    var i = e.scale,
      o = e.type,
      a = e.layout,
      u = e.axisType;
    if (i === "auto") return a === "radial" && u === "radiusAxis" ? {
      scale: Pr(),
      realScaleType: "band"
    } : a === "radial" && u === "angleAxis" ? {
      scale: an(),
      realScaleType: "linear"
    } : o === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: Tr(),
      realScaleType: "point"
    } : o === "category" ? {
      scale: Pr(),
      realScaleType: "band"
    } : {
      scale: an(),
      realScaleType: "linear"
    };
    if ((0, d1.default)(i)) {
      var s = "scale".concat((0, h1.default)(i));
      return {
        scale: (ds[s] || Tr)(),
        realScaleType: ds[s] ? s : "point"
      }
    }
    return (0, fi.default)(i) ? {
      scale: i
    } : {
      scale: Tr(),
      realScaleType: "point"
    }
  },
  c1 = 1e-4,
  _1 = function(e) {
    var r = e.domain();
    if (!(!r || r.length <= 2)) {
      var n = r.length,
        i = e.range(),
        o = Math.min(i[0], i[1]) - c1,
        a = Math.max(i[0], i[1]) + c1,
        u = e(r[0]),
        s = e(r[n - 1]);
      (u < o || u > a || s < o || s > a) && e.domain([r[0], r[n - 1]])
    }
  },
  P1 = function(e, r) {
    if (!e) return null;
    for (var n = 0, i = e.length; n < i; n++)
      if (e[n].item === r) return e[n].position;
    return null
  },
  T1 = function(e, r) {
    if (!r || r.length !== 2 || !X(r[0]) || !X(r[1])) return e;
    var n = Math.min(r[0], r[1]),
      i = Math.max(r[0], r[1]),
      o = [e[0], e[1]];
    return (!X(e[0]) || e[0] < n) && (o[0] = n), (!X(e[1]) || e[1] > i) && (o[1] = i), o[0] > i && (o[0] = i), o[1] < n && (o[1] = n), o
  },
  rz = function(e) {
    var r = e.length;
    if (!(r <= 0))
      for (var n = 0, i = e[0].length; n < i; ++n)
        for (var o = 0, a = 0, u = 0; u < r; ++u) {
          var s = (0, xs.default)(e[u][n][1]) ? e[u][n][0] : e[u][n][1];
          s >= 0 ? (e[u][n][0] = o, e[u][n][1] = o + s, o = e[u][n][1]) : (e[u][n][0] = a, e[u][n][1] = a + s, a = e[u][n][1])
        }
  },
  nz = function(e) {
    var r = e.length;
    if (!(r <= 0))
      for (var n = 0, i = e[0].length; n < i; ++n)
        for (var o = 0, a = 0; a < r; ++a) {
          var u = (0, xs.default)(e[a][n][1]) ? e[a][n][0] : e[a][n][1];
          u >= 0 ? (e[a][n][0] = o, e[a][n][1] = o + u, o = e[a][n][1]) : (e[a][n][0] = 0, e[a][n][1] = 0)
        }
  },
  iz = {
    sign: rz,
    expand: wc,
    none: Ie,
    silhouette: Oc,
    wiggle: Sc,
    positive: nz
  },
  oz = function(e, r, n) {
    var i = r.map(function(u) {
        return u.props.dataKey
      }),
      o = iz[n],
      a = xc().keys(i).value(function(u, s) {
        return +Vt(u, s, 0)
      }).order(Rn).offset(o);
    return a(e)
  },
  E1 = function(e, r, n, i, o, a) {
    if (!e) return null;
    var u = a ? r.reverse() : r,
      s = {},
      l = u.reduce(function(c, p) {
        var d, y = (d = p.type) !== null && d !== void 0 && d.defaultProps ? Dt(Dt({}, p.type.defaultProps), p.props) : p.props,
          m = y.stackId,
          v = y.hide;
        if (v) return c;
        var x = y[n],
          w = c[x] || {
            hasStack: !1,
            stackGroups: {}
          };
        if (Mt(m)) {
          var S = w.stackGroups[m] || {
            numericAxisId: n,
            cateAxisId: i,
            items: []
          };
          S.items.push(p), w.hasStack = !0, w.stackGroups[m] = S
        } else w.stackGroups[Qe("_stackId_")] = {
          numericAxisId: n,
          cateAxisId: i,
          items: [p]
        };
        return Dt(Dt({}, c), {}, ci({}, x, w))
      }, s),
      f = {};
    return Object.keys(l).reduce(function(c, p) {
      var d = l[p];
      if (d.hasStack) {
        var y = {};
        d.stackGroups = Object.keys(d.stackGroups).reduce(function(m, v) {
          var x = d.stackGroups[v];
          return Dt(Dt({}, m), {}, ci({}, v, {
            numericAxisId: n,
            cateAxisId: i,
            items: x.items,
            stackedData: oz(e, x.items, o)
          }))
        }, y)
      }
      return Dt(Dt({}, c), {}, ci({}, p, d))
    }, f)
  },
  j1 = function(e, r) {
    var n = r.realScaleType,
      i = r.type,
      o = r.tickCount,
      a = r.originalDomain,
      u = r.allowDecimals,
      s = n || r.scale;
    if (s !== "auto" && s !== "linear") return null;
    if (o && i === "number" && a && (a[0] === "auto" || a[1] === "auto")) {
      var l = e.domain();
      if (!l.length) return null;
      var f = cp(l, o, u);
      return e.domain([(0, Ho.default)(f), (0, Uo.default)(f)]), {
        niceTicks: f
      }
    }
    if (o && i === "number") {
      var c = e.domain(),
        p = fp(c, o, u);
      return {
        niceTicks: p
      }
    }
    return null
  };

function xp(t) {
  var e = t.axis,
    r = t.ticks,
    n = t.bandSize,
    i = t.entry,
    o = t.index,
    a = t.dataKey;
  if (e.type === "category") {
    if (!e.allowDuplicatedCategory && e.dataKey && !(0, we.default)(i[e.dataKey])) {
      var u = Tn(r, "value", i[e.dataKey]);
      if (u) return u.coordinate + n / 2
    }
    return r[o] ? r[o].coordinate + n / 2 : null
  }
  var s = Vt(i, (0, we.default)(a) ? e.dataKey : a);
  return (0, we.default)(s) ? null : e.scale(s)
}
var wp = function(e) {
    var r = e.axis,
      n = e.ticks,
      i = e.offset,
      o = e.bandSize,
      a = e.entry,
      u = e.index;
    if (r.type === "category") return n[u] ? n[u].coordinate + i : null;
    var s = Vt(a, r.dataKey, r.domain[u]);
    return (0, we.default)(s) ? null : r.scale(s) - o / 2 + i
  },
  M1 = function(e) {
    var r = e.numericAxis,
      n = r.scale.domain();
    if (r.type === "number") {
      var i = Math.min(n[0], n[1]),
        o = Math.max(n[0], n[1]);
      return i <= 0 && o >= 0 ? 0 : o < 0 ? o : i
    }
    return n[0]
  },
  C1 = function(e, r) {
    var n, i = (n = e.type) !== null && n !== void 0 && n.defaultProps ? Dt(Dt({}, e.type.defaultProps), e.props) : e.props,
      o = i.stackId;
    if (Mt(o)) {
      var a = r[o];
      if (a) {
        var u = a.items.indexOf(e);
        return u >= 0 ? a.stackedData[u] : null
      }
    }
    return null
  },
  az = function(e) {
    return e.reduce(function(r, n) {
      return [(0, Ho.default)(n.concat([r[0]]).filter(X)), (0, Uo.default)(n.concat([r[1]]).filter(X))]
    }, [1 / 0, -1 / 0])
  },
  Op = function(e, r, n) {
    return Object.keys(e).reduce(function(i, o) {
      var a = e[o],
        u = a.stackedData,
        s = u.reduce(function(l, f) {
          var c = az(f.slice(r, n + 1));
          return [Math.min(l[0], c[0]), Math.max(l[1], c[1])]
        }, [1 / 0, -1 / 0]);
      return [Math.min(s[0], i[0]), Math.max(s[1], i[1])]
    }, [1 / 0, -1 / 0]).map(function(i) {
      return i === 1 / 0 || i === -1 / 0 ? 0 : i
    })
  },
  f1 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  p1 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  ws = function(e, r, n) {
    if ((0, fi.default)(e)) return e(r, n);
    if (!Array.isArray(e)) return r;
    var i = [];
    if (X(e[0])) i[0] = n ? e[0] : Math.min(e[0], r[0]);
    else if (f1.test(e[0])) {
      var o = +f1.exec(e[0])[1];
      i[0] = r[0] - o
    } else(0, fi.default)(e[0]) ? i[0] = e[0](r[0]) : i[0] = r[0];
    if (X(e[1])) i[1] = n ? e[1] : Math.max(e[1], r[1]);
    else if (p1.test(e[1])) {
      var a = +p1.exec(e[1])[1];
      i[1] = r[1] + a
    } else(0, fi.default)(e[1]) ? i[1] = e[1](r[1]) : i[1] = r[1];
    return i
  },
  di = function(e, r, n) {
    if (e && e.scale && e.scale.bandwidth) {
      var i = e.scale.bandwidth();
      if (!n || i > 0) return i
    }
    if (e && r && r.length >= 2) {
      for (var o = (0, v1.default)(r, function(c) {
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
  Sp = function(e, r, n) {
    return !e || !e.length || (0, y1.default)(e, (0, yp.default)(n, "type.defaultProps.domain")) ? r : e
  },
  Os = function(e, r) {
    var n = e.type.defaultProps ? Dt(Dt({}, e.type.defaultProps), e.props) : e.props,
      i = n.dataKey,
      o = n.name,
      a = n.unit,
      u = n.formatter,
      s = n.tooltipType,
      l = n.chartType,
      f = n.hide;
    return Dt(Dt({}, st(e, !1)), {}, {
      dataKey: i,
      unit: a,
      formatter: u,
      name: o || i,
      color: Fo(e),
      value: Vt(r, i),
      type: s,
      payload: r,
      chartType: l,
      hide: f
    })
  };

function Ko(t) {
  "@babel/helpers - typeof";
  return Ko = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ko(t)
}

function I1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function k1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? I1(Object(r), !0).forEach(function(n) {
      uz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : I1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function uz(t, e, r) {
  return e = sz(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function sz(t) {
  var e = lz(t, "string");
  return Ko(e) == "symbol" ? e : e + ""
}

function lz(t, e) {
  if (Ko(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ko(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Vo = Math.PI / 180;
var pz = function(e) {
    return e * 180 / Math.PI
  },
  Nt = function(e, r, n, i) {
    return {
      x: e + Math.cos(-Vo * i) * n,
      y: r + Math.sin(-Vo * i) * n
    }
  };
var dz = function(e, r) {
    var n = e.x,
      i = e.y,
      o = r.x,
      a = r.y;
    return Math.sqrt(Math.pow(n - o, 2) + Math.pow(i - a, 2))
  },
  mz = function(e, r) {
    var n = e.x,
      i = e.y,
      o = r.cx,
      a = r.cy,
      u = dz({
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
      angle: pz(l),
      angleInRadian: l
    }
  },
  hz = function(e) {
    var r = e.startAngle,
      n = e.endAngle,
      i = Math.floor(r / 360),
      o = Math.floor(n / 360),
      a = Math.min(i, o);
    return {
      startAngle: r - a * 360,
      endAngle: n - a * 360
    }
  },
  yz = function(e, r) {
    var n = r.startAngle,
      i = r.endAngle,
      o = Math.floor(n / 360),
      a = Math.floor(i / 360),
      u = Math.min(o, a);
    return e + u * 360
  },
  Ap = function(e, r) {
    var n = e.x,
      i = e.y,
      o = mz({
        x: n,
        y: i
      }, r),
      a = o.radius,
      u = o.angle,
      s = r.innerRadius,
      l = r.outerRadius;
    if (a < s || a > l) return !1;
    if (a === 0) return !0;
    var f = hz(r),
      c = f.startAngle,
      p = f.endAngle,
      d = u,
      y;
    if (c <= p) {
      for (; d > p;) d -= 360;
      for (; d < c;) d += 360;
      y = d >= c && d <= p
    } else {
      for (; d > c;) d -= 360;
      for (; d < p;) d += 360;
      y = d >= p && d <= c
    }
    return y ? k1(k1({}, r), {}, {
      radius: a,
      angle: yz(d, r)
    }) : null
  };

function Xo(t) {
  "@babel/helpers - typeof";
  return Xo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Xo(t)
}
var vz = ["offset"];

function gz(t) {
  return Oz(t) || wz(t) || xz(t) || bz()
}

function bz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function xz(t, e) {
  if (t) {
    if (typeof t == "string") return _p(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return _p(t, e)
  }
}

function wz(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function Oz(t) {
  if (Array.isArray(t)) return _p(t)
}

function _p(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function Sz(t, e) {
  if (t == null) return {};
  var r = Az(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function Az(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function D1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ft(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? D1(Object(r), !0).forEach(function(n) {
      _z(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : D1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function _z(t, e, r) {
  return e = Pz(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Pz(t) {
  var e = Tz(t, "string");
  return Xo(e) == "symbol" ? e : e + ""
}

function Tz(t, e) {
  if (Xo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Xo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Yo() {
  return Yo = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Yo.apply(this, arguments)
}
var jz = function(e) {
    var r = e.value,
      n = e.formatter,
      i = (0, Zo.default)(e.children) ? r : e.children;
    return (0, Jo.default)(n) ? n(i) : i
  },
  Mz = function(e, r) {
    var n = Yt(r - e),
      i = Math.min(Math.abs(r - e), 360);
    return n * i
  },
  Cz = function(e, r, n) {
    var i = e.position,
      o = e.viewBox,
      a = e.offset,
      u = e.className,
      s = o,
      l = s.cx,
      f = s.cy,
      c = s.innerRadius,
      p = s.outerRadius,
      d = s.startAngle,
      y = s.endAngle,
      m = s.clockWise,
      v = (c + p) / 2,
      x = Mz(d, y),
      w = x >= 0 ? 1 : -1,
      S, P;
    i === "insideStart" ? (S = d + w * a, P = m) : i === "insideEnd" ? (S = y - w * a, P = !m) : i === "end" && (S = y + w * a, P = m), P = x <= 0 ? P : !P;
    var h = Nt(l, f, v, S),
      g = Nt(l, f, v, S + (P ? 1 : -1) * 359),
      _ = "M".concat(h.x, ",").concat(h.y, `
    A`).concat(v, ",").concat(v, ",0,1,").concat(P ? 0 : 1, `,
    `).concat(g.x, ",").concat(g.y),
      C = (0, Zo.default)(e.id) ? Qe("recharts-radial-line-") : e.id;
    return ur.createElement("text", Yo({}, n, {
      dominantBaseline: "central",
      className: ut("recharts-radial-bar-label", u)
    }), ur.createElement("defs", null, ur.createElement("path", {
      id: C,
      d: _
    })), ur.createElement("textPath", {
      xlinkHref: "#".concat(C)
    }, r))
  },
  Iz = function(e) {
    var r = e.viewBox,
      n = e.offset,
      i = e.position,
      o = r,
      a = o.cx,
      u = o.cy,
      s = o.innerRadius,
      l = o.outerRadius,
      f = o.startAngle,
      c = o.endAngle,
      p = (f + c) / 2;
    if (i === "outside") {
      var d = Nt(a, u, l + n, p),
        y = d.x,
        m = d.y;
      return {
        x: y,
        y: m,
        textAnchor: y >= a ? "start" : "end",
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
    var v = (s + l) / 2,
      x = Nt(a, u, v, p),
      w = x.x,
      S = x.y;
    return {
      x: w,
      y: S,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }
  },
  kz = function(e) {
    var r = e.viewBox,
      n = e.parentViewBox,
      i = e.offset,
      o = e.position,
      a = r,
      u = a.x,
      s = a.y,
      l = a.width,
      f = a.height,
      c = f >= 0 ? 1 : -1,
      p = c * i,
      d = c > 0 ? "end" : "start",
      y = c > 0 ? "start" : "end",
      m = l >= 0 ? 1 : -1,
      v = m * i,
      x = m > 0 ? "end" : "start",
      w = m > 0 ? "start" : "end";
    if (o === "top") {
      var S = {
        x: u + l / 2,
        y: s - c * i,
        textAnchor: "middle",
        verticalAnchor: d
      };
      return Ft(Ft({}, S), n ? {
        height: Math.max(s - n.y, 0),
        width: l
      } : {})
    }
    if (o === "bottom") {
      var P = {
        x: u + l / 2,
        y: s + f + p,
        textAnchor: "middle",
        verticalAnchor: y
      };
      return Ft(Ft({}, P), n ? {
        height: Math.max(n.y + n.height - (s + f), 0),
        width: l
      } : {})
    }
    if (o === "left") {
      var h = {
        x: u - v,
        y: s + f / 2,
        textAnchor: x,
        verticalAnchor: "middle"
      };
      return Ft(Ft({}, h), n ? {
        width: Math.max(h.x - n.x, 0),
        height: f
      } : {})
    }
    if (o === "right") {
      var g = {
        x: u + l + v,
        y: s + f / 2,
        textAnchor: w,
        verticalAnchor: "middle"
      };
      return Ft(Ft({}, g), n ? {
        width: Math.max(n.x + n.width - g.x, 0),
        height: f
      } : {})
    }
    var _ = n ? {
      width: l,
      height: f
    } : {};
    return o === "insideLeft" ? Ft({
      x: u + v,
      y: s + f / 2,
      textAnchor: w,
      verticalAnchor: "middle"
    }, _) : o === "insideRight" ? Ft({
      x: u + l - v,
      y: s + f / 2,
      textAnchor: x,
      verticalAnchor: "middle"
    }, _) : o === "insideTop" ? Ft({
      x: u + l / 2,
      y: s + p,
      textAnchor: "middle",
      verticalAnchor: y
    }, _) : o === "insideBottom" ? Ft({
      x: u + l / 2,
      y: s + f - p,
      textAnchor: "middle",
      verticalAnchor: d
    }, _) : o === "insideTopLeft" ? Ft({
      x: u + v,
      y: s + p,
      textAnchor: w,
      verticalAnchor: y
    }, _) : o === "insideTopRight" ? Ft({
      x: u + l - v,
      y: s + p,
      textAnchor: x,
      verticalAnchor: y
    }, _) : o === "insideBottomLeft" ? Ft({
      x: u + v,
      y: s + f - p,
      textAnchor: w,
      verticalAnchor: d
    }, _) : o === "insideBottomRight" ? Ft({
      x: u + l - v,
      y: s + f - p,
      textAnchor: x,
      verticalAnchor: d
    }, _) : (0, Tp.default)(o) && (X(o.x) || pr(o.x)) && (X(o.y) || pr(o.y)) ? Ft({
      x: u + ze(o.x, l),
      y: s + ze(o.y, f),
      textAnchor: "end",
      verticalAnchor: "end"
    }, _) : Ft({
      x: u + l / 2,
      y: s + f / 2,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }, _)
  },
  Dz = function(e) {
    return "cx" in e && X(e.cx)
  };

function Bt(t) {
  var e = t.offset,
    r = e === void 0 ? 5 : e,
    n = Sz(t, vz),
    i = Ft({
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
  if (!o || (0, Zo.default)(u) && (0, Zo.default)(s) && !Ss(l) && !(0, Jo.default)(l)) return null;
  if (Ss(l)) return Pp(l, i);
  var d;
  if ((0, Jo.default)(l)) {
    if (d = Ez(l, i), Ss(d)) return d
  } else d = jz(i);
  var y = Dz(o),
    m = st(i, !0);
  if (y && (a === "insideStart" || a === "insideEnd" || a === "end")) return Cz(i, d, m);
  var v = y ? Iz(i) : kz(i);
  return ur.createElement(Yr, Yo({
    className: ut("recharts-label", c)
  }, m, v, {
    breakAll: p
  }), d)
}
Bt.displayName = "Label";
var N1 = function(e) {
    var r = e.cx,
      n = e.cy,
      i = e.angle,
      o = e.startAngle,
      a = e.endAngle,
      u = e.r,
      s = e.radius,
      l = e.innerRadius,
      f = e.outerRadius,
      c = e.x,
      p = e.y,
      d = e.top,
      y = e.left,
      m = e.width,
      v = e.height,
      x = e.clockWise,
      w = e.labelViewBox;
    if (w) return w;
    if (X(m) && X(v)) {
      if (X(c) && X(p)) return {
        x: c,
        y: p,
        width: m,
        height: v
      };
      if (X(d) && X(y)) return {
        x: d,
        y,
        width: m,
        height: v
      }
    }
    return X(c) && X(p) ? {
      x: c,
      y: p,
      width: 0,
      height: 0
    } : X(r) && X(n) ? {
      cx: r,
      cy: n,
      startAngle: o || i || 0,
      endAngle: a || i || 0,
      innerRadius: l || 0,
      outerRadius: f || s || u || 0,
      clockWise: x
    } : e.viewBox ? e.viewBox : {}
  },
  Nz = function(e, r) {
    return e ? e === !0 ? ur.createElement(Bt, {
      key: "label-implicit",
      viewBox: r
    }) : Mt(e) ? ur.createElement(Bt, {
      key: "label-implicit",
      viewBox: r,
      value: e
    }) : Ss(e) ? e.type === Bt ? Pp(e, {
      key: "label-implicit",
      viewBox: r
    }) : ur.createElement(Bt, {
      key: "label-implicit",
      content: e,
      viewBox: r
    }) : (0, Jo.default)(e) ? ur.createElement(Bt, {
      key: "label-implicit",
      content: e,
      viewBox: r
    }) : (0, Tp.default)(e) ? ur.createElement(Bt, Yo({
      viewBox: r
    }, e, {
      key: "label-implicit"
    })) : null : null
  },
  Rz = function(e, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!e || !e.children && n && !e.label) return null;
    var i = e.children,
      o = N1(e),
      a = Wt(i, Bt).map(function(s, l) {
        return Pp(s, {
          viewBox: r || o,
          key: "label-".concat(l)
        })
      });
    if (!n) return a;
    var u = Nz(e.label, r || o);
    return [u].concat(gz(a))
  };
Bt.parseViewBox = N1;
Bt.renderCallByParent = Rz;
var As = et(Te()),
  z1 = et(Pe()),
  F1 = et(Lt()),
  $1 = et(L1());
import mi, {
  cloneElement as Xz
} from "./react-shim-eraudit.js";

function Qo(t) {
  "@babel/helpers - typeof";
  return Qo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Qo(t)
}
var Bz = ["valueAccessor"],
  qz = ["data", "dataKey", "clockWise", "id", "textBreakAll"];

function Wz(t) {
  return Uz(t) || $z(t) || Fz(t) || zz()
}

function zz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Fz(t, e) {
  if (t) {
    if (typeof t == "string") return Ep(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ep(t, e)
  }
}

function $z(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function Uz(t) {
  if (Array.isArray(t)) return Ep(t)
}

function Ep(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function _s() {
  return _s = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, _s.apply(this, arguments)
}

function B1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function q1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? B1(Object(r), !0).forEach(function(n) {
      Hz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : B1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Hz(t, e, r) {
  return e = Gz(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Gz(t) {
  var e = Kz(t, "string");
  return Qo(e) == "symbol" ? e : e + ""
}

function Kz(t, e) {
  if (Qo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Qo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function W1(t, e) {
  if (t == null) return {};
  var r = Vz(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function Vz(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var Yz = function(e) {
  return Array.isArray(e.value) ? (0, $1.default)(e.value) : e.value
};

function sr(t) {
  var e = t.valueAccessor,
    r = e === void 0 ? Yz : e,
    n = W1(t, Bz),
    i = n.data,
    o = n.dataKey,
    a = n.clockWise,
    u = n.id,
    s = n.textBreakAll,
    l = W1(n, qz);
  return !i || !i.length ? null : mi.createElement(bt, {
    className: "recharts-label-list"
  }, i.map(function(f, c) {
    var p = (0, As.default)(o) ? r(f, c) : Vt(f && f.payload, o),
      d = (0, As.default)(u) ? {} : {
        id: "".concat(u, "-").concat(c)
      };
    return mi.createElement(Bt, _s({}, st(f, !0), l, d, {
      parentViewBox: f.parentViewBox,
      value: p,
      textBreakAll: s,
      viewBox: Bt.parseViewBox((0, As.default)(a) ? f : q1(q1({}, f), {}, {
        clockWise: a
      })),
      key: "label-".concat(c),
      index: c
    }))
  }))
}
sr.displayName = "LabelList";

function Zz(t, e) {
  return t ? t === !0 ? mi.createElement(sr, {
    key: "labelList-implicit",
    data: e
  }) : mi.isValidElement(t) || (0, F1.default)(t) ? mi.createElement(sr, {
    key: "labelList-implicit",
    data: e,
    content: t
  }) : (0, z1.default)(t) ? mi.createElement(sr, _s({
    data: e
  }, t, {
    key: "labelList-implicit"
  })) : null : null
}

function Jz(t, e) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && r && !t.label) return null;
  var n = t.children,
    i = Wt(n, sr).map(function(a, u) {
      return Xz(a, {
        data: e,
        key: "labelList-".concat(u)
      })
    });
  if (!r) return i;
  var o = Zz(t.label, e);
  return [o].concat(Wz(i))
}
sr.renderCallByParent = Jz;
import rF from "./react-shim-eraudit.js";

function ta(t) {
  "@babel/helpers - typeof";
  return ta = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ta(t)
}

function jp() {
  return jp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, jp.apply(this, arguments)
}

function U1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function H1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? U1(Object(r), !0).forEach(function(n) {
      Qz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : U1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Qz(t, e, r) {
  return e = tF(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function tF(t) {
  var e = eF(t, "string");
  return ta(e) == "symbol" ? e : e + ""
}

function eF(t, e) {
  if (ta(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ta(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var nF = function(e, r) {
    var n = Yt(r - e),
      i = Math.min(Math.abs(r - e), 359.999);
    return n * i
  },
  Ps = function(e) {
    var r = e.cx,
      n = e.cy,
      i = e.radius,
      o = e.angle,
      a = e.sign,
      u = e.isExternal,
      s = e.cornerRadius,
      l = e.cornerIsExternal,
      f = s * (u ? 1 : -1) + i,
      c = Math.asin(s / f) / Vo,
      p = l ? o : o + a * c,
      d = Nt(r, n, f, p),
      y = Nt(r, n, i, p),
      m = l ? o - a * c : o,
      v = Nt(r, n, f * Math.cos(c * Vo), m);
    return {
      center: d,
      circleTangency: y,
      lineTangency: v,
      theta: c
    }
  },
  G1 = function(e) {
    var r = e.cx,
      n = e.cy,
      i = e.innerRadius,
      o = e.outerRadius,
      a = e.startAngle,
      u = e.endAngle,
      s = nF(a, u),
      l = a + s,
      f = Nt(r, n, o, a),
      c = Nt(r, n, o, l),
      p = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(o, ",").concat(o, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(a > l), `,
    `).concat(c.x, ",").concat(c.y, `
  `);
    if (i > 0) {
      var d = Nt(r, n, i, a),
        y = Nt(r, n, i, l);
      p += "L ".concat(y.x, ",").concat(y.y, `
            A `).concat(i, ",").concat(i, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(a <= l), `,
            `).concat(d.x, ",").concat(d.y, " Z")
    } else p += "L ".concat(r, ",").concat(n, " Z");
    return p
  },
  iF = function(e) {
    var r = e.cx,
      n = e.cy,
      i = e.innerRadius,
      o = e.outerRadius,
      a = e.cornerRadius,
      u = e.forceCornerRadius,
      s = e.cornerIsExternal,
      l = e.startAngle,
      f = e.endAngle,
      c = Yt(f - l),
      p = Ps({
        cx: r,
        cy: n,
        radius: o,
        angle: l,
        sign: c,
        cornerRadius: a,
        cornerIsExternal: s
      }),
      d = p.circleTangency,
      y = p.lineTangency,
      m = p.theta,
      v = Ps({
        cx: r,
        cy: n,
        radius: o,
        angle: f,
        sign: -c,
        cornerRadius: a,
        cornerIsExternal: s
      }),
      x = v.circleTangency,
      w = v.lineTangency,
      S = v.theta,
      P = s ? Math.abs(l - f) : Math.abs(l - f) - m - S;
    if (P < 0) return u ? "M ".concat(y.x, ",").concat(y.y, `
        a`).concat(a, ",").concat(a, ",0,0,1,").concat(a * 2, `,0
        a`).concat(a, ",").concat(a, ",0,0,1,").concat(-a * 2, `,0
      `) : G1({
      cx: r,
      cy: n,
      innerRadius: i,
      outerRadius: o,
      startAngle: l,
      endAngle: f
    });
    var h = "M ".concat(y.x, ",").concat(y.y, `
    A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(d.x, ",").concat(d.y, `
    A`).concat(o, ",").concat(o, ",0,").concat(+(P > 180), ",").concat(+(c < 0), ",").concat(x.x, ",").concat(x.y, `
    A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(w.x, ",").concat(w.y, `
  `);
    if (i > 0) {
      var g = Ps({
          cx: r,
          cy: n,
          radius: i,
          angle: l,
          sign: c,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s
        }),
        _ = g.circleTangency,
        C = g.lineTangency,
        k = g.theta,
        B = Ps({
          cx: r,
          cy: n,
          radius: i,
          angle: f,
          sign: -c,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s
        }),
        W = B.circleTangency,
        R = B.lineTangency,
        H = B.theta,
        F = s ? Math.abs(l - f) : Math.abs(l - f) - k - H;
      if (F < 0 && a === 0) return "".concat(h, "L").concat(r, ",").concat(n, "Z");
      h += "L".concat(R.x, ",").concat(R.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(W.x, ",").concat(W.y, `
      A`).concat(i, ",").concat(i, ",0,").concat(+(F > 180), ",").concat(+(c > 0), ",").concat(_.x, ",").concat(_.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(C.x, ",").concat(C.y, "Z")
    } else h += "L".concat(r, ",").concat(n, "Z");
    return h
  },
  oF = {
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
  Ts = function(e) {
    var r = H1(H1({}, oF), e),
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
    var d = ut("recharts-sector", p),
      y = a - o,
      m = ze(u, y, 0, !0),
      v;
    return m > 0 && Math.abs(f - c) < 360 ? v = iF({
      cx: n,
      cy: i,
      innerRadius: o,
      outerRadius: a,
      cornerRadius: Math.min(m, y / 2),
      forceCornerRadius: s,
      cornerIsExternal: l,
      startAngle: f,
      endAngle: c
    }) : v = G1({
      cx: n,
      cy: i,
      innerRadius: o,
      outerRadius: a,
      startAngle: f,
      endAngle: c
    }), rF.createElement("path", jp({}, st(r, !0), {
      className: d,
      d: v,
      role: "img"
    }))
  };
import * as Y1 from "./react-shim-eraudit.js";
var Z1 = et(nu()),
  J1 = et(Lt());

function na(t) {
  "@babel/helpers - typeof";
  return na = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, na(t)
}

function Mp() {
  return Mp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Mp.apply(this, arguments)
}

function K1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function V1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? K1(Object(r), !0).forEach(function(n) {
      aF(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : K1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function aF(t, e, r) {
  return e = uF(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function uF(t) {
  var e = sF(t, "string");
  return na(e) == "symbol" ? e : e + ""
}

function sF(t, e) {
  if (na(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (na(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var X1 = {
    curveBasisClosed: cc,
    curveBasisOpen: fc,
    curveBasis: lc,
    curveBumpX: Ql,
    curveBumpY: tc,
    curveLinearClosed: pc,
    curveLinear: _r,
    curveMonotoneX: mc,
    curveMonotoneY: hc,
    curveNatural: yc,
    curveStep: vc,
    curveStepAfter: bc,
    curveStepBefore: gc
  },
  Es = function(e) {
    return e.x === +e.x && e.y === +e.y
  },
  ea = function(e) {
    return e.x
  },
  ra = function(e) {
    return e.y
  },
  lF = function(e, r) {
    if ((0, J1.default)(e)) return e;
    var n = "curve".concat((0, Z1.default)(e));
    return (n === "curveMonotone" || n === "curveBump") && r ? X1["".concat(n).concat(r === "vertical" ? "Y" : "X")] : X1[n] || _r
  },
  cF = function(e) {
    var r = e.type,
      n = r === void 0 ? "linear" : r,
      i = e.points,
      o = i === void 0 ? [] : i,
      a = e.baseLine,
      u = e.layout,
      s = e.connectNulls,
      l = s === void 0 ? !1 : s,
      f = lF(n, u),
      c = l ? o.filter(function(m) {
        return Es(m)
      }) : o,
      p;
    if (Array.isArray(a)) {
      var d = l ? a.filter(function(m) {
          return Es(m)
        }) : a,
        y = c.map(function(m, v) {
          return V1(V1({}, m), {}, {
            base: d[v]
          })
        });
      return u === "vertical" ? p = In().y(ra).x1(ea).x0(function(m) {
        return m.base.x
      }) : p = In().x(ea).y1(ra).y0(function(m) {
        return m.base.y
      }), p.defined(Es).curve(f), p(y)
    }
    return u === "vertical" && X(a) ? p = In().y(ra).x1(ea).x0(a) : X(a) ? p = In().x(ea).y1(ra).y0(a) : p = Qi().x(ea).y(ra), p.defined(Es).curve(f), p(c)
  },
  ia = function(e) {
    var r = e.className,
      n = e.points,
      i = e.path,
      o = e.pathRef;
    if ((!n || !n.length) && !i) return null;
    var a = n && n.length ? cF(e) : i;
    return Y1.createElement("path", Mp({}, st(e, !1), Fr(e), {
      className: ut("recharts-curve", r),
      d: a,
      ref: o
    }))
  };
import Rs, {
  useEffect as Z3,
  useRef as J3,
  useState as Q3
} from "./react-shim-eraudit.js";
var wt = et(aO());
import W3, {
  PureComponent as z3,
  cloneElement as F3,
  Children as Wp
} from "./react-shim-eraudit.js";
var {
  getOwnPropertyNames: dF,
  getOwnPropertySymbols: mF
} = Object, {
  hasOwnProperty: hF
} = Object.prototype;

function Cp(t, e) {
  return function(n, i, o) {
    return t(n, i, o) && e(n, i, o)
  }
}

function js(t) {
  return function(r, n, i) {
    if (!r || !n || typeof r != "object" || typeof n != "object") return t(r, n, i);
    let {
      cache: o
    } = i, a = o.get(r), u = o.get(n);
    if (a && u) return a === n && u === r;
    o.set(r, n), o.set(n, r);
    let s = t(r, n, i);
    return o.delete(r), o.delete(n), s
  }
}

function yF(t) {
  return t?.[Symbol.toStringTag]
}

function uO(t) {
  return dF(t).concat(mF(t))
}
var vF = Object.hasOwn || ((t, e) => hF.call(t, e));

function mn(t, e) {
  return t === e || !t && !e && t !== t && e !== e
}
var gF = "__v",
  bF = "__o",
  xF = "_owner",
  {
    getOwnPropertyDescriptor: sO,
    keys: lO
  } = Object;

function wF(t, e) {
  return t.byteLength === e.byteLength && Ms(new Uint8Array(t), new Uint8Array(e))
}

function OF(t, e, r) {
  let n = t.length;
  if (e.length !== n) return !1;
  for (; n-- > 0;)
    if (!r.equals(t[n], e[n], n, n, t, e, r)) return !1;
  return !0
}

function SF(t, e) {
  return t.byteLength === e.byteLength && Ms(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), new Uint8Array(e.buffer, e.byteOffset, e.byteLength))
}

function AF(t, e) {
  return mn(t.getTime(), e.getTime())
}

function _F(t, e) {
  return t.name === e.name && t.message === e.message && t.cause === e.cause && t.stack === e.stack
}

function PF(t, e) {
  return t === e
}

function cO(t, e, r) {
  let n = t.size;
  if (n !== e.size) return !1;
  if (!n) return !0;
  let i = new Array(n),
    o = t.entries(),
    a, u, s = 0;
  for (;
    (a = o.next()) && !a.done;) {
    let l = e.entries(),
      f = !1,
      c = 0;
    for (;
      (u = l.next()) && !u.done;) {
      if (i[c]) {
        c++;
        continue
      }
      let p = a.value,
        d = u.value;
      if (r.equals(p[0], d[0], s, c, t, e, r) && r.equals(p[1], d[1], p[0], d[0], t, e, r)) {
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
var TF = mn;

function EF(t, e, r) {
  let n = lO(t),
    i = n.length;
  if (lO(e).length !== i) return !1;
  for (; i-- > 0;)
    if (!pO(t, e, r, n[i])) return !1;
  return !0
}

function oa(t, e, r) {
  let n = uO(t),
    i = n.length;
  if (uO(e).length !== i) return !1;
  let o, a, u;
  for (; i-- > 0;)
    if (o = n[i], !pO(t, e, r, o) || (a = sO(t, o), u = sO(e, o), (a || u) && (!a || !u || a.configurable !== u.configurable || a.enumerable !== u.enumerable || a.writable !== u.writable))) return !1;
  return !0
}

function jF(t, e) {
  return mn(t.valueOf(), e.valueOf())
}

function MF(t, e) {
  return t.source === e.source && t.flags === e.flags
}

function fO(t, e, r) {
  let n = t.size;
  if (n !== e.size) return !1;
  if (!n) return !0;
  let i = new Array(n),
    o = t.values(),
    a, u;
  for (;
    (a = o.next()) && !a.done;) {
    let s = e.values(),
      l = !1,
      f = 0;
    for (;
      (u = s.next()) && !u.done;) {
      if (!i[f] && r.equals(a.value, u.value, a.value, u.value, t, e, r)) {
        l = i[f] = !0;
        break
      }
      f++
    }
    if (!l) return !1
  }
  return !0
}

function Ms(t, e) {
  let r = t.byteLength;
  if (e.byteLength !== r || t.byteOffset !== e.byteOffset) return !1;
  for (; r-- > 0;)
    if (t[r] !== e[r]) return !1;
  return !0
}

function CF(t, e) {
  return t.hostname === e.hostname && t.pathname === e.pathname && t.protocol === e.protocol && t.port === e.port && t.hash === e.hash && t.username === e.username && t.password === e.password
}

function pO(t, e, r, n) {
  return (n === xF || n === bF || n === gF) && (t.$$typeof || e.$$typeof) ? !0 : vF(e, n) && r.equals(t[n], e[n], n, n, t, e, r)
}
var IF = "[object ArrayBuffer]",
  kF = "[object Arguments]",
  DF = "[object Boolean]",
  NF = "[object DataView]",
  RF = "[object Date]",
  LF = "[object Error]",
  BF = "[object Map]",
  qF = "[object Number]",
  WF = "[object Object]",
  zF = "[object RegExp]",
  FF = "[object Set]",
  $F = "[object String]",
  UF = {
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
  HF = "[object URL]",
  GF = Object.prototype.toString;

function KF({
  areArrayBuffersEqual: t,
  areArraysEqual: e,
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
  areUrlsEqual: d,
  unknownTagComparators: y
}) {
  return function(v, x, w) {
    if (v === x) return !0;
    if (v == null || x == null) return !1;
    let S = typeof v;
    if (S !== typeof x) return !1;
    if (S !== "object") return S === "number" ? u(v, x, w) : S === "function" ? o(v, x, w) : !1;
    let P = v.constructor;
    if (P !== x.constructor) return !1;
    if (P === Object) return s(v, x, w);
    if (Array.isArray(v)) return e(v, x, w);
    if (P === Date) return n(v, x, w);
    if (P === RegExp) return f(v, x, w);
    if (P === Map) return a(v, x, w);
    if (P === Set) return c(v, x, w);
    let h = GF.call(v);
    if (h === RF) return n(v, x, w);
    if (h === zF) return f(v, x, w);
    if (h === BF) return a(v, x, w);
    if (h === FF) return c(v, x, w);
    if (h === WF) return typeof v.then != "function" && typeof x.then != "function" && s(v, x, w);
    if (h === HF) return d(v, x, w);
    if (h === LF) return i(v, x, w);
    if (h === kF) return s(v, x, w);
    if (UF[h]) return p(v, x, w);
    if (h === IF) return t(v, x, w);
    if (h === NF) return r(v, x, w);
    if (h === DF || h === qF || h === $F) return l(v, x, w);
    if (y) {
      let g = y[h];
      if (!g) {
        let _ = yF(v);
        _ && (g = y[_])
      }
      if (g) return g(v, x, w)
    }
    return !1
  }
}

function VF({
  circular: t,
  createCustomConfig: e,
  strict: r
}) {
  let n = {
    areArrayBuffersEqual: wF,
    areArraysEqual: r ? oa : OF,
    areDataViewsEqual: SF,
    areDatesEqual: AF,
    areErrorsEqual: _F,
    areFunctionsEqual: PF,
    areMapsEqual: r ? Cp(cO, oa) : cO,
    areNumbersEqual: TF,
    areObjectsEqual: r ? oa : EF,
    arePrimitiveWrappersEqual: jF,
    areRegExpsEqual: MF,
    areSetsEqual: r ? Cp(fO, oa) : fO,
    areTypedArraysEqual: r ? Cp(Ms, oa) : Ms,
    areUrlsEqual: CF,
    unknownTagComparators: void 0
  };
  if (e && (n = Object.assign({}, n, e(n))), t) {
    let i = js(n.areArraysEqual),
      o = js(n.areMapsEqual),
      a = js(n.areObjectsEqual),
      u = js(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: i,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: u
    })
  }
  return n
}

function XF(t) {
  return function(e, r, n, i, o, a, u) {
    return t(e, r, u)
  }
}

function YF({
  circular: t,
  comparator: e,
  createState: r,
  equals: n,
  strict: i
}) {
  if (r) return function(u, s) {
    let {
      cache: l = t ? new WeakMap : void 0,
      meta: f
    } = r();
    return e(u, s, {
      cache: l,
      equals: n,
      meta: f,
      strict: i
    })
  };
  if (t) return function(u, s) {
    return e(u, s, {
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
    return e(u, s, o)
  }
}
var dO = Dr(),
  Mtt = Dr({
    strict: !0
  }),
  Ctt = Dr({
    circular: !0
  }),
  Itt = Dr({
    circular: !0,
    strict: !0
  }),
  ktt = Dr({
    createInternalComparator: () => mn
  }),
  Dtt = Dr({
    strict: !0,
    createInternalComparator: () => mn
  }),
  Ntt = Dr({
    circular: !0,
    createInternalComparator: () => mn
  }),
  Rtt = Dr({
    circular: !0,
    createInternalComparator: () => mn,
    strict: !0
  });

function Dr(t = {}) {
  let {
    circular: e = !1,
    createInternalComparator: r,
    createState: n,
    strict: i = !1
  } = t, o = VF(t), a = KF(o), u = r ? r(a) : XF(a);
  return YF({
    circular: e,
    comparator: a,
    createState: n,
    equals: u,
    strict: i
  })
}

function ZF(t) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(t)
}

function Cs(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    r = -1,
    n = function i(o) {
      r < 0 && (r = o), o - r > e ? (t(o), r = -1) : ZF(i)
    };
  requestAnimationFrame(n)
}

function Ip(t) {
  "@babel/helpers - typeof";
  return Ip = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ip(t)
}

function JF(t) {
  return r3(t) || e3(t) || t3(t) || QF()
}

function QF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function t3(t, e) {
  if (t) {
    if (typeof t == "string") return mO(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return mO(t, e)
  }
}

function mO(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function e3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function r3(t) {
  if (Array.isArray(t)) return t
}

function kp() {
  var t = {},
    e = function() {
      return null
    },
    r = !1,
    n = function i(o) {
      if (!r) {
        if (Array.isArray(o)) {
          if (!o.length) return;
          var a = o,
            u = JF(a),
            s = u[0],
            l = u.slice(1);
          if (typeof s == "number") {
            Cs(i.bind(null, l), s);
            return
          }
          i(s), Cs(i.bind(null, l));
          return
        }
        Ip(o) === "object" && (t = o, e(t)), typeof o == "function" && o()
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

function aa(t) {
  "@babel/helpers - typeof";
  return aa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, aa(t)
}

function hO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function yO(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? hO(Object(r), !0).forEach(function(n) {
      vO(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : hO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function vO(t, e, r) {
  return e = n3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function n3(t) {
  var e = i3(t, "string");
  return aa(e) === "symbol" ? e : String(e)
}

function i3(t, e) {
  if (aa(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (aa(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var gO = function(e, r) {
    return [Object.keys(e), Object.keys(r)].reduce(function(n, i) {
      return n.filter(function(o) {
        return i.includes(o)
      })
    })
  },
  bO = function(e) {
    return e
  },
  o3 = function(e) {
    return e.replace(/([A-Z])/g, function(r) {
      return "-".concat(r.toLowerCase())
    })
  };
var hi = function(e, r) {
    return Object.keys(r).reduce(function(n, i) {
      return yO(yO({}, n), {}, vO({}, i, e(i, r[i])))
    }, {})
  },
  Dp = function(e, r, n) {
    return e.map(function(i) {
      return "".concat(o3(i), " ").concat(r, "ms ").concat(n)
    }).join(",")
  },
  a3 = !1,
  ua = function(e, r, n, i, o, a, u, s) {
    if (a3 && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !e))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var l = [n, i, o, a, u, s],
          f = 0;
        console.warn(r.replace(/%s/g, function() {
          return l[f++]
        }))
      }
  };

function u3(t, e) {
  return c3(t) || l3(t, e) || OO(t, e) || s3()
}

function s3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function l3(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function c3(t) {
  if (Array.isArray(t)) return t
}

function f3(t) {
  return m3(t) || d3(t) || OO(t) || p3()
}

function p3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function OO(t, e) {
  if (t) {
    if (typeof t == "string") return Np(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Np(t, e)
  }
}

function d3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function m3(t) {
  if (Array.isArray(t)) return Np(t)
}

function Np(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var Is = 1e-4,
  SO = function(e, r) {
    return [0, 3 * e, 3 * r - 6 * e, 3 * e - 3 * r + 1]
  },
  AO = function(e, r) {
    return e.map(function(n, i) {
      return n * Math.pow(r, i)
    }).reduce(function(n, i) {
      return n + i
    })
  },
  xO = function(e, r) {
    return function(n) {
      var i = SO(e, r);
      return AO(i, n)
    }
  },
  h3 = function(e, r) {
    return function(n) {
      var i = SO(e, r),
        o = [].concat(f3(i.map(function(a, u) {
          return a * u
        }).slice(1)), [0]);
      return AO(o, n)
    }
  },
  wO = function() {
    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
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
          var l = s[1].split(")")[0].split(",").map(function(v) {
              return parseFloat(v)
            }),
            f = u3(l, 4);
          i = f[0], o = f[1], a = f[2], u = f[3]
        } else ua(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r)
      }
    }
    ua([i, a, o, u].every(function(v) {
      return typeof v == "number" && v >= 0 && v <= 1
    }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
    var c = xO(i, a),
      p = xO(o, u),
      d = h3(i, a),
      y = function(x) {
        return x > 1 ? 1 : x < 0 ? 0 : x
      },
      m = function(x) {
        for (var w = x > 1 ? 1 : x, S = w, P = 0; P < 8; ++P) {
          var h = c(S) - w,
            g = d(S);
          if (Math.abs(h - w) < Is || g < Is) return p(S);
          S = y(S - h / g)
        }
        return p(S)
      };
    return m.isStepper = !1, m
  },
  y3 = function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = e.stiff,
      n = r === void 0 ? 100 : r,
      i = e.damping,
      o = i === void 0 ? 8 : i,
      a = e.dt,
      u = a === void 0 ? 17 : a,
      s = function(f, c, p) {
        var d = -(f - c) * n,
          y = p * o,
          m = p + (d - y) * u / 1e3,
          v = p * u / 1e3 + f;
        return Math.abs(v - c) < Is && Math.abs(m) < Is ? [c, 0] : [v, m]
      };
    return s.isStepper = !0, s.dt = u, s
  },
  _O = function() {
    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
    var i = r[0];
    if (typeof i == "string") switch (i) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return wO(i);
      case "spring":
        return y3();
      default:
        if (i.split("(")[0] === "cubic-bezier") return wO(i);
        ua(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r)
    }
    return typeof i == "function" ? i : (ua(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null)
  };

function sa(t) {
  "@babel/helpers - typeof";
  return sa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, sa(t)
}

function PO(t) {
  return b3(t) || g3(t) || EO(t) || v3()
}

function v3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function g3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function b3(t) {
  if (Array.isArray(t)) return Lp(t)
}

function TO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Xt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? TO(Object(r), !0).forEach(function(n) {
      Rp(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : TO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Rp(t, e, r) {
  return e = x3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function x3(t) {
  var e = w3(t, "string");
  return sa(e) === "symbol" ? e : String(e)
}

function w3(t, e) {
  if (sa(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (sa(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function O3(t, e) {
  return _3(t) || A3(t, e) || EO(t, e) || S3()
}

function S3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function EO(t, e) {
  if (t) {
    if (typeof t == "string") return Lp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Lp(t, e)
  }
}

function Lp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function A3(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function _3(t) {
  if (Array.isArray(t)) return t
}
var ks = function(e, r, n) {
    return e + (r - e) * n
  },
  Bp = function(e) {
    var r = e.from,
      n = e.to;
    return r !== n
  },
  P3 = function t(e, r, n) {
    var i = hi(function(o, a) {
      if (Bp(a)) {
        var u = e(a.from, a.to, a.velocity),
          s = O3(u, 2),
          l = s[0],
          f = s[1];
        return Xt(Xt({}, a), {}, {
          from: l,
          velocity: f
        })
      }
      return a
    }, r);
    return n < 1 ? hi(function(o, a) {
      return Bp(a) ? Xt(Xt({}, a), {}, {
        velocity: ks(a.velocity, i[o].velocity, n),
        from: ks(a.from, i[o].from, n)
      }) : a
    }, r) : t(e, i, n - 1)
  },
  jO = function(t, e, r, n, i) {
    var o = gO(t, e),
      a = o.reduce(function(v, x) {
        return Xt(Xt({}, v), {}, Rp({}, x, [t[x], e[x]]))
      }, {}),
      u = o.reduce(function(v, x) {
        return Xt(Xt({}, v), {}, Rp({}, x, {
          from: t[x],
          velocity: 0,
          to: e[x]
        }))
      }, {}),
      s = -1,
      l, f, c = function() {
        return null
      },
      p = function() {
        return hi(function(x, w) {
          return w.from
        }, u)
      },
      d = function() {
        return !Object.values(u).filter(Bp).length
      },
      y = function(x) {
        l || (l = x);
        var w = x - l,
          S = w / r.dt;
        u = P3(r, u, S), i(Xt(Xt(Xt({}, t), e), p(u))), l = x, d() || (s = requestAnimationFrame(c))
      },
      m = function(x) {
        f || (f = x);
        var w = (x - f) / n,
          S = hi(function(h, g) {
            return ks.apply(void 0, PO(g).concat([r(w)]))
          }, a);
        if (i(Xt(Xt(Xt({}, t), e), S)), w < 1) s = requestAnimationFrame(c);
        else {
          var P = hi(function(h, g) {
            return ks.apply(void 0, PO(g).concat([r(1)]))
          }, a);
          i(Xt(Xt(Xt({}, t), e), P))
        }
      };
    return c = r.isStepper ? y : m,
      function() {
        return requestAnimationFrame(c),
          function() {
            cancelAnimationFrame(s)
          }
      }
  };

function yi(t) {
  "@babel/helpers - typeof";
  return yi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, yi(t)
}
var T3 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];

function E3(t, e) {
  if (t == null) return {};
  var r = j3(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function j3(t, e) {
  if (t == null) return {};
  var r = {},
    n = Object.keys(t),
    i, o;
  for (o = 0; o < n.length; o++) i = n[o], !(e.indexOf(i) >= 0) && (r[i] = t[i]);
  return r
}

function qp(t) {
  return k3(t) || I3(t) || C3(t) || M3()
}

function M3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function C3(t, e) {
  if (t) {
    if (typeof t == "string") return zp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return zp(t, e)
  }
}

function I3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function k3(t) {
  if (Array.isArray(t)) return zp(t)
}

function zp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function MO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function He(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? MO(Object(r), !0).forEach(function(n) {
      la(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : MO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function la(t, e, r) {
  return e = IO(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function D3(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function CO(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, IO(n.key), n)
  }
}

function N3(t, e, r) {
  return e && CO(t.prototype, e), r && CO(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function IO(t) {
  var e = R3(t, "string");
  return yi(e) === "symbol" ? e : String(e)
}

function R3(t, e) {
  if (yi(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (yi(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function L3(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Fp(t, e)
}

function Fp(t, e) {
  return Fp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Fp(t, e)
}

function B3(t) {
  var e = q3();
  return function() {
    var n = Ds(t),
      i;
    if (e) {
      var o = Ds(this).constructor;
      i = Reflect.construct(n, arguments, o)
    } else i = n.apply(this, arguments);
    return $p(this, i)
  }
}

function $p(t, e) {
  if (e && (yi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Up(t)
}

function Up(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
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

function Ds(t) {
  return Ds = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ds(t)
}
var Ns = function(t) {
  L3(r, t);
  var e = B3(r);

  function r(n, i) {
    var o;
    D3(this, r), o = e.call(this, n, i);
    var a = o.props,
      u = a.isActive,
      s = a.attributeName,
      l = a.from,
      f = a.to,
      c = a.steps,
      p = a.children,
      d = a.duration;
    if (o.handleStyleChange = o.handleStyleChange.bind(Up(o)), o.changeStyle = o.changeStyle.bind(Up(o)), !u || d <= 0) return o.state = {
      style: {}
    }, typeof p == "function" && (o.state = {
      style: f
    }), $p(o);
    if (c && c.length) o.state = {
      style: c[0].style
    };
    else if (l) {
      if (typeof p == "function") return o.state = {
        style: l
      }, $p(o);
      o.state = {
        style: s ? la({}, s, l) : l
      }
    } else o.state = {
      style: {}
    };
    return o
  }
  return N3(r, [{
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
          var d = {
            style: s ? la({}, s, f) : f
          };
          this.state && p && (s && p[s] !== f || !s && p !== f) && this.setState(d);
          return
        }
        if (!(dO(i.to, f) && i.canBegin && i.isActive)) {
          var y = !i.canBegin || !i.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var m = y || l ? c : i.to;
          if (this.state && p) {
            var v = {
              style: s ? la({}, s, m) : m
            };
            (s && p[s] !== m || !s && p !== m) && this.setState(v)
          }
          this.runAnimation(He(He({}, this.props), {}, {
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
        d = jO(a, u, _O(l), s, this.changeStyle),
        y = function() {
          o.stopJSAnimation = d()
        };
      this.manager.start([p, f, y, s, c])
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
        d = function(m, v, x) {
          if (x === 0) return m;
          var w = v.duration,
            S = v.easing,
            P = S === void 0 ? "ease" : S,
            h = v.style,
            g = v.properties,
            _ = v.onAnimationEnd,
            C = x > 0 ? a[x - 1] : v,
            k = g || Object.keys(h);
          if (typeof P == "function" || P === "spring") return [].concat(qp(m), [o.runJSAnimation.bind(o, {
            from: C.style,
            to: h,
            duration: w,
            easing: P
          }), w]);
          var B = Dp(k, w, P),
            W = He(He(He({}, C.style), h), {}, {
              transition: B
            });
          return [].concat(qp(m), [W, w, _]).filter(bO)
        };
      return this.manager.start([s].concat(qp(a.reduce(d, [f, Math.max(p, u)])), [i.onAnimationEnd]))
    }
  }, {
    key: "runAnimation",
    value: function(i) {
      this.manager || (this.manager = kp());
      var o = i.begin,
        a = i.duration,
        u = i.attributeName,
        s = i.to,
        l = i.easing,
        f = i.onAnimationStart,
        c = i.onAnimationEnd,
        p = i.steps,
        d = i.children,
        y = this.manager;
      if (this.unSubscribe = y.subscribe(this.handleStyleChange), typeof l == "function" || typeof d == "function" || l === "spring") {
        this.runJSAnimation(i);
        return
      }
      if (p.length > 1) {
        this.runStepAnimation(i);
        return
      }
      var m = u ? la({}, u, s) : s,
        v = Dp(Object.keys(m), a, l);
      y.start([f, o, He(He({}, m), {}, {
        transition: v
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
        d = i.to,
        y = i.canBegin,
        m = i.onAnimationEnd,
        v = i.shouldReAnimate,
        x = i.onAnimationReStart,
        w = E3(i, T3),
        S = Wp.count(o),
        P = this.state.style;
      if (typeof o == "function") return o(P);
      if (!f || S === 0 || u <= 0) return o;
      var h = function(_) {
        var C = _.props,
          k = C.style,
          B = k === void 0 ? {} : k,
          W = C.className,
          R = F3(_, He(He({}, w), {}, {
            style: He(He({}, B), P),
            className: W
          }));
        return R
      };
      return S === 1 ? h(Wp.only(o)) : W3.createElement("div", null, Wp.map(o, function(g) {
        return h(g)
      }))
    }
  }]), r
}(z3);
Ns.displayName = "Animate";
Ns.defaultProps = {
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
Ns.propTypes = {
  from: wt.default.oneOfType([wt.default.object, wt.default.string]),
  to: wt.default.oneOfType([wt.default.object, wt.default.string]),
  attributeName: wt.default.string,
  duration: wt.default.number,
  begin: wt.default.number,
  easing: wt.default.oneOfType([wt.default.string, wt.default.func]),
  steps: wt.default.arrayOf(wt.default.shape({
    duration: wt.default.number.isRequired,
    style: wt.default.object.isRequired,
    easing: wt.default.oneOfType([wt.default.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), wt.default.func]),
    properties: wt.default.arrayOf("string"),
    onAnimationEnd: wt.default.func
  })),
  children: wt.default.oneOfType([wt.default.node, wt.default.func]),
  isActive: wt.default.bool,
  canBegin: wt.default.bool,
  onAnimationEnd: wt.default.func,
  shouldReAnimate: wt.default.bool,
  onAnimationStart: wt.default.func,
  onAnimationReStart: wt.default.func
};
var kO = Ns;
var lr = kO;

function ca(t) {
  "@babel/helpers - typeof";
  return ca = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ca(t)
}

function Ls() {
  return Ls = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ls.apply(this, arguments)
}

function $3(t, e) {
  return K3(t) || G3(t, e) || H3(t, e) || U3()
}

function U3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function H3(t, e) {
  if (t) {
    if (typeof t == "string") return DO(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return DO(t, e)
  }
}

function DO(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function G3(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function K3(t) {
  if (Array.isArray(t)) return t
}

function NO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function RO(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? NO(Object(r), !0).forEach(function(n) {
      V3(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : NO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function V3(t, e, r) {
  return e = X3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function X3(t) {
  var e = Y3(t, "string");
  return ca(e) == "symbol" ? e : e + ""
}

function Y3(t, e) {
  if (ca(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ca(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var LO = function(e, r, n, i, o) {
    var a = Math.min(Math.abs(n) / 2, Math.abs(i) / 2),
      u = i >= 0 ? 1 : -1,
      s = n >= 0 ? 1 : -1,
      l = i >= 0 && n >= 0 || i < 0 && n < 0 ? 1 : 0,
      f;
    if (a > 0 && o instanceof Array) {
      for (var c = [0, 0, 0, 0], p = 0, d = 4; p < d; p++) c[p] = o[p] > a ? a : o[p];
      f = "M".concat(e, ",").concat(r + u * c[0]), c[0] > 0 && (f += "A ".concat(c[0], ",").concat(c[0], ",0,0,").concat(l, ",").concat(e + s * c[0], ",").concat(r)), f += "L ".concat(e + n - s * c[1], ",").concat(r), c[1] > 0 && (f += "A ".concat(c[1], ",").concat(c[1], ",0,0,").concat(l, `,
        `).concat(e + n, ",").concat(r + u * c[1])), f += "L ".concat(e + n, ",").concat(r + i - u * c[2]), c[2] > 0 && (f += "A ".concat(c[2], ",").concat(c[2], ",0,0,").concat(l, `,
        `).concat(e + n - s * c[2], ",").concat(r + i)), f += "L ".concat(e + s * c[3], ",").concat(r + i), c[3] > 0 && (f += "A ".concat(c[3], ",").concat(c[3], ",0,0,").concat(l, `,
        `).concat(e, ",").concat(r + i - u * c[3])), f += "Z"
    } else if (a > 0 && o === +o && o > 0) {
      var y = Math.min(a, o);
      f = "M ".concat(e, ",").concat(r + u * y, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(l, ",").concat(e + s * y, ",").concat(r, `
            L `).concat(e + n - s * y, ",").concat(r, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(l, ",").concat(e + n, ",").concat(r + u * y, `
            L `).concat(e + n, ",").concat(r + i - u * y, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(l, ",").concat(e + n - s * y, ",").concat(r + i, `
            L `).concat(e + s * y, ",").concat(r + i, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(l, ",").concat(e, ",").concat(r + i - u * y, " Z")
    } else f = "M ".concat(e, ",").concat(r, " h ").concat(n, " v ").concat(i, " h ").concat(-n, " Z");
    return f
  },
  BO = function(e, r) {
    if (!e || !r) return !1;
    var n = e.x,
      i = e.y,
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
  t8 = {
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
  vi = function(e) {
    var r = RO(RO({}, t8), e),
      n = J3(),
      i = Q3(-1),
      o = $3(i, 2),
      a = o[0],
      u = o[1];
    Z3(function() {
      if (n.current && n.current.getTotalLength) try {
        var P = n.current.getTotalLength();
        P && u(P)
      } catch {}
    }, []);
    var s = r.x,
      l = r.y,
      f = r.width,
      c = r.height,
      p = r.radius,
      d = r.className,
      y = r.animationEasing,
      m = r.animationDuration,
      v = r.animationBegin,
      x = r.isAnimationActive,
      w = r.isUpdateAnimationActive;
    if (s !== +s || l !== +l || f !== +f || c !== +c || f === 0 || c === 0) return null;
    var S = ut("recharts-rectangle", d);
    return w ? Rs.createElement(lr, {
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
      animationEasing: y,
      isActive: w
    }, function(P) {
      var h = P.width,
        g = P.height,
        _ = P.x,
        C = P.y;
      return Rs.createElement(lr, {
        canBegin: a > 0,
        from: "0px ".concat(a === -1 ? 1 : a, "px"),
        to: "".concat(a, "px 0px"),
        attributeName: "strokeDasharray",
        begin: v,
        duration: m,
        isActive: x,
        easing: y
      }, Rs.createElement("path", Ls({}, st(r, !0), {
        className: S,
        d: LO(_, C, h, g, p),
        ref: n
      })))
    }) : Rs.createElement("path", Ls({}, st(r, !0), {
      className: S,
      d: LO(s, l, f, c, p)
    }))
  };
import * as qO from "./react-shim-eraudit.js";

function Hp() {
  return Hp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Hp.apply(this, arguments)
}
var gi = function(e) {
  var r = e.cx,
    n = e.cy,
    i = e.r,
    o = e.className,
    a = ut("recharts-dot", o);
  return r === +r && n === +n && i === +i ? qO.createElement("circle", Hp({}, st(e, !1), Fr(e), {
    className: a,
    cx: r,
    cy: n,
    r: i
  })) : null
};
import s8 from "./react-shim-eraudit.js";

function fa(t) {
  "@babel/helpers - typeof";
  return fa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, fa(t)
}
var e8 = ["x", "y", "top", "left", "width", "height", "className"];

function Gp() {
  return Gp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Gp.apply(this, arguments)
}

function WO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function r8(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? WO(Object(r), !0).forEach(function(n) {
      n8(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : WO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function n8(t, e, r) {
  return e = i8(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function i8(t) {
  var e = o8(t, "string");
  return fa(e) == "symbol" ? e : e + ""
}

function o8(t, e) {
  if (fa(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (fa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function a8(t, e) {
  if (t == null) return {};
  var r = u8(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function u8(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var l8 = function(e, r, n, i, o, a) {
    return "M".concat(e, ",").concat(o, "v").concat(i, "M").concat(a, ",").concat(r, "h").concat(n)
  },
  zO = function(e) {
    var r = e.x,
      n = r === void 0 ? 0 : r,
      i = e.y,
      o = i === void 0 ? 0 : i,
      a = e.top,
      u = a === void 0 ? 0 : a,
      s = e.left,
      l = s === void 0 ? 0 : s,
      f = e.width,
      c = f === void 0 ? 0 : f,
      p = e.height,
      d = p === void 0 ? 0 : p,
      y = e.className,
      m = a8(e, e8),
      v = r8({
        x: n,
        y: o,
        top: u,
        left: l,
        width: c,
        height: d
      }, m);
    return !X(n) || !X(o) || !X(c) || !X(d) || !X(u) || !X(l) ? null : s8.createElement("path", Gp({}, st(v, !0), {
      className: ut("recharts-cross", y),
      d: l8(n, o, c, d, u, l)
    }))
  };
var nS = et(Lt()),
  iS = et(GO()),
  oS = et(VO()),
  aS = et(Ro());
import hn, {
  isValidElement as rS,
  cloneElement as $8
} from "./react-shim-eraudit.js";
import pa, {
  useEffect as k8,
  useRef as D8,
  useState as N8
} from "./react-shim-eraudit.js";

function da(t) {
  "@babel/helpers - typeof";
  return da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, da(t)
}

function Bs() {
  return Bs = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Bs.apply(this, arguments)
}

function _8(t, e) {
  return j8(t) || E8(t, e) || T8(t, e) || P8()
}

function P8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function T8(t, e) {
  if (t) {
    if (typeof t == "string") return XO(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return XO(t, e)
  }
}

function XO(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function E8(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function j8(t) {
  if (Array.isArray(t)) return t
}

function YO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ZO(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? YO(Object(r), !0).forEach(function(n) {
      M8(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : YO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function M8(t, e, r) {
  return e = C8(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function C8(t) {
  var e = I8(t, "string");
  return da(e) == "symbol" ? e : e + ""
}

function I8(t, e) {
  if (da(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (da(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var JO = function(e, r, n, i, o) {
    var a = n - i,
      u;
    return u = "M ".concat(e, ",").concat(r), u += "L ".concat(e + n, ",").concat(r), u += "L ".concat(e + n - a / 2, ",").concat(r + o), u += "L ".concat(e + n - a / 2 - i, ",").concat(r + o), u += "L ".concat(e, ",").concat(r, " Z"), u
  },
  R8 = {
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
  QO = function(e) {
    var r = ZO(ZO({}, R8), e),
      n = D8(),
      i = N8(-1),
      o = _8(i, 2),
      a = o[0],
      u = o[1];
    k8(function() {
      if (n.current && n.current.getTotalLength) try {
        var S = n.current.getTotalLength();
        S && u(S)
      } catch {}
    }, []);
    var s = r.x,
      l = r.y,
      f = r.upperWidth,
      c = r.lowerWidth,
      p = r.height,
      d = r.className,
      y = r.animationEasing,
      m = r.animationDuration,
      v = r.animationBegin,
      x = r.isUpdateAnimationActive;
    if (s !== +s || l !== +l || f !== +f || c !== +c || p !== +p || f === 0 && c === 0 || p === 0) return null;
    var w = ut("recharts-trapezoid", d);
    return x ? pa.createElement(lr, {
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
      animationEasing: y,
      isActive: x
    }, function(S) {
      var P = S.upperWidth,
        h = S.lowerWidth,
        g = S.height,
        _ = S.x,
        C = S.y;
      return pa.createElement(lr, {
        canBegin: a > 0,
        from: "0px ".concat(a === -1 ? 1 : a, "px"),
        to: "".concat(a, "px 0px"),
        attributeName: "strokeDasharray",
        begin: v,
        duration: m,
        easing: y
      }, pa.createElement("path", Bs({}, st(r, !0), {
        className: w,
        d: JO(_, C, P, h, g),
        ref: n
      })))
    }) : pa.createElement("g", null, pa.createElement("path", Bs({}, st(r, !0), {
      className: w,
      d: JO(s, l, f, c, p)
    })))
  };
var L8 = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];

function ma(t) {
  "@babel/helpers - typeof";
  return ma = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ma(t)
}

function B8(t, e) {
  if (t == null) return {};
  var r = q8(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function q8(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function tS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function qs(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? tS(Object(r), !0).forEach(function(n) {
      W8(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : tS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function W8(t, e, r) {
  return e = z8(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function z8(t) {
  var e = F8(t, "string");
  return ma(e) == "symbol" ? e : e + ""
}

function F8(t, e) {
  if (ma(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ma(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function U8(t, e) {
  return qs(qs({}, e), t)
}

function H8(t, e) {
  return t === "symbols"
}

function eS(t) {
  var e = t.shapeType,
    r = t.elementProps;
  switch (e) {
    case "rectangle":
      return hn.createElement(vi, r);
    case "trapezoid":
      return hn.createElement(QO, r);
    case "sector":
      return hn.createElement(Ts, r);
    case "symbols":
      if (H8(e, r)) return hn.createElement(eo, r);
      break;
    default:
      return null
  }
}

function G8(t) {
  return rS(t) ? t.props : t
}

function uS(t) {
  var e = t.option,
    r = t.shapeType,
    n = t.propTransformer,
    i = n === void 0 ? U8 : n,
    o = t.activeClassName,
    a = o === void 0 ? "recharts-active-shape" : o,
    u = t.isActive,
    s = B8(t, L8),
    l;
  if (rS(e)) l = $8(e, qs(qs({}, s), G8(e)));
  else if ((0, nS.default)(e)) l = e(s);
  else if ((0, iS.default)(e) && !(0, oS.default)(e)) {
    var f = i(e, s);
    l = hn.createElement(eS, {
      shapeType: r,
      elementProps: f
    })
  } else {
    var c = s;
    l = hn.createElement(eS, {
      shapeType: r,
      elementProps: c
    })
  }
  return u ? hn.createElement(bt, {
    className: a
  }, l) : l
}

function ha(t, e) {
  return e != null && "trapezoids" in t.props
}

function ya(t, e) {
  return e != null && "sectors" in t.props
}

function bi(t, e) {
  return e != null && "points" in t.props
}

function K8(t, e) {
  var r, n, i = t.x === (e == null || (r = e.labelViewBox) === null || r === void 0 ? void 0 : r.x) || t.x === e.x,
    o = t.y === (e == null || (n = e.labelViewBox) === null || n === void 0 ? void 0 : n.y) || t.y === e.y;
  return i && o
}

function V8(t, e) {
  var r = t.endAngle === e.endAngle,
    n = t.startAngle === e.startAngle;
  return r && n
}

function X8(t, e) {
  var r = t.x === e.x,
    n = t.y === e.y,
    i = t.z === e.z;
  return r && n && i
}

function Y8(t, e) {
  var r;
  return ha(t, e) ? r = K8 : ya(t, e) ? r = V8 : bi(t, e) && (r = X8), r
}

function Z8(t, e) {
  var r;
  return ha(t, e) ? r = "trapezoids" : ya(t, e) ? r = "sectors" : bi(t, e) && (r = "points"), r
}

function J8(t, e) {
  if (ha(t, e)) {
    var r;
    return (r = e.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload
  }
  if (ya(t, e)) {
    var n;
    return (n = e.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload
  }
  return bi(t, e) ? e.payload : {}
}

function sS(t) {
  var e = t.activeTooltipItem,
    r = t.graphicalItem,
    n = t.itemData,
    i = Z8(r, e),
    o = J8(r, e),
    a = n.filter(function(s, l) {
      var f = (0, aS.default)(o, s),
        c = r.props[i].filter(function(y) {
          var m = Y8(r, e);
          return m(y, e)
        }),
        p = r.props[i].indexOf(c[c.length - 1]),
        d = l === p;
      return f && d
    }),
    u = n.indexOf(a[a.length - 1]);
  return u
}
import Jt, {
  PureComponent as x6,
  Children as w6
} from "./react-shim-eraudit.js";
var Jp = et(Lt()),
  _S = et(Xp());

function va(t) {
  "@babel/helpers - typeof";
  return va = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, va(t)
}

function yS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function vS(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? yS(Object(r), !0).forEach(function(n) {
      gS(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : yS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function gS(t, e, r) {
  return e = c6(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function c6(t) {
  var e = f6(t, "string");
  return va(e) == "symbol" ? e : e + ""
}

function f6(t, e) {
  if (va(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (va(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var p6 = ["Webkit", "Moz", "O", "ms"],
  bS = function(e, r) {
    if (!e) return null;
    var n = e.replace(/(\w)/, function(o) {
        return o.toUpperCase()
      }),
      i = p6.reduce(function(o, a) {
        return vS(vS({}, o), {}, gS({}, a + n, r))
      }, {});
    return i[e] = r, i
  };

function xi(t) {
  "@babel/helpers - typeof";
  return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, xi(t)
}

function Ws() {
  return Ws = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ws.apply(this, arguments)
}

function xS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Yp(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? xS(Object(r), !0).forEach(function(n) {
      Se(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : xS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function d6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function wS(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, AS(n.key), n)
  }
}

function m6(t, e, r) {
  return e && wS(t.prototype, e), r && wS(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function h6(t, e, r) {
  return e = zs(e), y6(t, SS() ? Reflect.construct(e, r || [], zs(t).constructor) : e.apply(t, r))
}

function y6(t, e) {
  if (e && (xi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return v6(t)
}

function v6(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function SS() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (SS = function() {
    return !!t
  })()
}

function zs(t) {
  return zs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, zs(t)
}

function g6(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Zp(t, e)
}

function Zp(t, e) {
  return Zp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Zp(t, e)
}

function Se(t, e, r) {
  return e = AS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function AS(t) {
  var e = b6(t, "string");
  return xi(e) == "symbol" ? e : e + ""
}

function b6(t, e) {
  if (xi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (xi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var O6 = function(e) {
    var r = e.data,
      n = e.startIndex,
      i = e.endIndex,
      o = e.x,
      a = e.width,
      u = e.travellerWidth;
    if (!r || !r.length) return {};
    var s = r.length,
      l = Tr().domain((0, _S.default)(0, s)).range([o, o + a - u]),
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
  OS = function(e) {
    return e.changedTouches && !!e.changedTouches.length
  },
  yn = function(t) {
    function e(r) {
      var n;
      return d6(this, e), n = h6(this, e, [r]), Se(n, "handleDrag", function(i) {
        n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(i) : n.state.isSlideMoving && n.handleSlideDrag(i)
      }), Se(n, "handleTouchMove", function(i) {
        i.changedTouches != null && i.changedTouches.length > 0 && n.handleDrag(i.changedTouches[0])
      }), Se(n, "handleDragEnd", function() {
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
      }), Se(n, "handleLeaveWrapper", function() {
        (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut))
      }), Se(n, "handleEnterSlideOrTraveller", function() {
        n.setState({
          isTextActive: !0
        })
      }), Se(n, "handleLeaveSlideOrTraveller", function() {
        n.setState({
          isTextActive: !1
        })
      }), Se(n, "handleSlideDragStart", function(i) {
        var o = OS(i) ? i.changedTouches[0] : i;
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
    return g6(e, t), m6(e, [{
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
          d = e.getIndexInRange(a, c),
          y = e.getIndexInRange(a, p);
        return {
          startIndex: d - d % s,
          endIndex: y === f ? f : y - y % s
        }
      }
    }, {
      key: "getTextOfTick",
      value: function(n) {
        var i = this.props,
          o = i.data,
          a = i.tickFormatter,
          u = i.dataKey,
          s = Vt(o[n], u, n);
        return (0, Jp.default)(a) ? a(s, n) : s
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
          d = s.endIndex,
          y = s.onChange,
          m = n.pageX - o;
        m > 0 ? m = Math.min(m, l + f - c - u, l + f - c - a) : m < 0 && (m = Math.max(m, l - a, l - u));
        var v = this.getIndex({
          startX: a + m,
          endX: u + m
        });
        (v.startIndex !== p || v.endIndex !== d) && y && y(v), this.setState({
          startX: a + m,
          endX: u + m,
          slideMoveStartX: n.pageX
        })
      }
    }, {
      key: "handleTravellerDragStart",
      value: function(n, i) {
        var o = OS(i) ? i.changedTouches[0] : i;
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
          d = f.travellerWidth,
          y = f.onChange,
          m = f.gap,
          v = f.data,
          x = {
            startX: this.state.startX,
            endX: this.state.endX
          },
          w = n.pageX - o;
        w > 0 ? w = Math.min(w, c + p - d - l) : w < 0 && (w = Math.max(w, c - l)), x[a] = l + w;
        var S = this.getIndex(x),
          P = S.startIndex,
          h = S.endIndex,
          g = function() {
            var C = v.length - 1;
            return a === "startX" && (u > s ? P % m === 0 : h % m === 0) || u < s && h === C || a === "endX" && (u > s ? h % m === 0 : P % m === 0) || u > s && h === C
          };
        this.setState(Se(Se({}, a, l + w), "brushMoveStartX", n.pageX), function() {
          y && g() && y(S)
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
            var d = u[p];
            i === "startX" && d >= l || i === "endX" && d <= s || this.setState(Se({}, i, d), function() {
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
        return Jt.createElement("rect", {
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
          c = w6.only(l);
        return c ? Jt.cloneElement(c, {
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
          d = s.ariaLabel,
          y = s.data,
          m = s.startIndex,
          v = s.endIndex,
          x = Math.max(n, this.props.x),
          w = Yp(Yp({}, st(this.props, !1)), {}, {
            x,
            y: l,
            width: f,
            height: c
          }),
          S = d || "Min value: ".concat((o = y[m]) === null || o === void 0 ? void 0 : o.name, ", Max value: ").concat((a = y[v]) === null || a === void 0 ? void 0 : a.name);
        return Jt.createElement(bt, {
          tabIndex: 0,
          role: "slider",
          "aria-label": S,
          "aria-valuenow": n,
          className: "recharts-brush-traveller",
          onMouseEnter: this.handleEnterSlideOrTraveller,
          onMouseLeave: this.handleLeaveSlideOrTraveller,
          onMouseDown: this.travellerDragStartHandlers[i],
          onTouchStart: this.travellerDragStartHandlers[i],
          onKeyDown: function(h) {
            ["ArrowLeft", "ArrowRight"].includes(h.key) && (h.preventDefault(), h.stopPropagation(), u.handleTravellerMoveKeyboard(h.key === "ArrowRight" ? 1 : -1, i))
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
        }, e.renderTraveller(p, w))
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
        return Jt.createElement("rect", {
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
          d = 5,
          y = {
            pointerEvents: "none",
            fill: l
          };
        return Jt.createElement(bt, {
          className: "recharts-brush-texts"
        }, Jt.createElement(Yr, Ws({
          textAnchor: "end",
          verticalAnchor: "middle",
          x: Math.min(c, p) - d,
          y: a + u / 2
        }, y), this.getTextOfTick(i)), Jt.createElement(Yr, Ws({
          textAnchor: "start",
          verticalAnchor: "middle",
          x: Math.max(c, p) + s + d,
          y: a + u / 2
        }, y), this.getTextOfTick(o)))
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
          d = p.startX,
          y = p.endX,
          m = p.isTextActive,
          v = p.isSlideMoving,
          x = p.isTravellerMoving,
          w = p.isTravellerFocused;
        if (!i || !i.length || !X(u) || !X(s) || !X(l) || !X(f) || l <= 0 || f <= 0) return null;
        var S = ut("recharts-brush", o),
          P = Jt.Children.count(a) === 1,
          h = bS("userSelect", "none");
        return Jt.createElement(bt, {
          className: S,
          onMouseLeave: this.handleLeaveWrapper,
          onTouchMove: this.handleTouchMove,
          style: h
        }, this.renderBackground(), P && this.renderPanorama(), this.renderSlide(d, y), this.renderTravellerLayer(d, "startX"), this.renderTravellerLayer(y, "endX"), (m || v || x || w || c) && this.renderText())
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
        return Jt.createElement(Jt.Fragment, null, Jt.createElement("rect", {
          x: i,
          y: o,
          width: a,
          height: u,
          fill: s,
          stroke: "none"
        }), Jt.createElement("line", {
          x1: i + 1,
          y1: l,
          x2: i + a - 1,
          y2: l,
          fill: "none",
          stroke: "#fff"
        }), Jt.createElement("line", {
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
        return Jt.isValidElement(n) ? o = Jt.cloneElement(n, i) : (0, Jp.default)(n) ? o = n(i) : o = e.renderDefaultTraveller(i), o
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
        if (o !== i.prevData || l !== i.prevUpdateId) return Yp({
          prevData: o,
          prevTravellerWidth: s,
          prevUpdateId: l,
          prevX: u,
          prevWidth: a
        }, o && o.length ? O6({
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
          var p = i.scale.domain().map(function(d) {
            return i.scale(d)
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
  }(x6);
Se(yn, "displayName", "Brush");
Se(yn, "defaultProps", {
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
var CA = et(Lt()),
  IA = et(jS());
import _i from "./react-shim-eraudit.js";
var he = function(e, r) {
  var n = e.alwaysShow,
    i = e.ifOverflow;
  return n && (i = "extendDomain"), i === r
};
var JS = et(DS()),
  QS = et(Qp());
import Le, {
  PureComponent as l$
} from "./react-shim-eraudit.js";
var KS = et(Ro()),
  VS = et(Te());
import Z6 from "./react-shim-eraudit.js";
var H6 = ["x", "y"];

function ba(t) {
  "@babel/helpers - typeof";
  return ba = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ba(t)
}

function td() {
  return td = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, td.apply(this, arguments)
}

function WS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ga(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? WS(Object(r), !0).forEach(function(n) {
      G6(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : WS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function G6(t, e, r) {
  return e = K6(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function K6(t) {
  var e = V6(t, "string");
  return ba(e) == "symbol" ? e : e + ""
}

function V6(t, e) {
  if (ba(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ba(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function X6(t, e) {
  if (t == null) return {};
  var r = Y6(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function Y6(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function J6(t, e) {
  var r = t.x,
    n = t.y,
    i = X6(t, H6),
    o = "".concat(r),
    a = parseInt(o, 10),
    u = "".concat(n),
    s = parseInt(u, 10),
    l = "".concat(e.height || i.height),
    f = parseInt(l, 10),
    c = "".concat(e.width || i.width),
    p = parseInt(c, 10);
  return ga(ga(ga(ga(ga({}, e), i), a ? {
    x: a
  } : {}), s ? {
    y: s
  } : {}), {}, {
    height: f,
    width: p,
    name: e.name,
    radius: e.radius
  })
}

function ed(t) {
  return Z6.createElement(uS, td({
    shapeType: "rectangle",
    propTransformer: J6,
    activeClassName: "recharts-active-bar"
  }, t))
}
var zS = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, i) {
    if (typeof e == "number") return e;
    var o = X(n) || Eh(n);
    return o ? e(n, i) : (o || Ue(!1), r)
  }
};
var Q6 = ["value", "background"],
  US;

function wi(t) {
  "@babel/helpers - typeof";
  return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, wi(t)
}

function t$(t, e) {
  if (t == null) return {};
  var r = e$(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function e$(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Fs() {
  return Fs = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Fs.apply(this, arguments)
}

function FS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function qt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? FS(Object(r), !0).forEach(function(n) {
      Nr(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : FS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function r$(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function $S(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, GS(n.key), n)
  }
}

function n$(t, e, r) {
  return e && $S(t.prototype, e), r && $S(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function i$(t, e, r) {
  return e = $s(e), o$(t, HS() ? Reflect.construct(e, r || [], $s(t).constructor) : e.apply(t, r))
}

function o$(t, e) {
  if (e && (wi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return a$(t)
}

function a$(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function HS() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (HS = function() {
    return !!t
  })()
}

function $s(t) {
  return $s = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, $s(t)
}

function u$(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && rd(t, e)
}

function rd(t, e) {
  return rd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, rd(t, e)
}

function Nr(t, e, r) {
  return e = GS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function GS(t) {
  var e = s$(t, "string");
  return wi(e) == "symbol" ? e : e + ""
}

function s$(t, e) {
  if (wi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Ge = function(t) {
  function e() {
    var r;
    r$(this, e);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = i$(this, e, [].concat(i)), Nr(r, "state", {
      isAnimationFinished: !1
    }), Nr(r, "id", Qe("recharts-bar-")), Nr(r, "handleAnimationEnd", function() {
      var a = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), a && a()
    }), Nr(r, "handleAnimationStart", function() {
      var a = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), a && a()
    }), r
  }
  return u$(e, t), n$(e, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var i = this,
        o = this.props,
        a = o.shape,
        u = o.dataKey,
        s = o.activeIndex,
        l = o.activeBar,
        f = st(this.props, !1);
      return n && n.map(function(c, p) {
        var d = p === s,
          y = d ? l : a,
          m = qt(qt(qt({}, f), c), {}, {
            isActive: d,
            option: y,
            index: p,
            dataKey: u,
            onAnimationStart: i.handleAnimationStart,
            onAnimationEnd: i.handleAnimationEnd
          });
        return Le.createElement(bt, Fs({
          className: "recharts-bar-rectangle"
        }, $r(i.props, c, p), {
          key: "rectangle-".concat(c?.x, "-").concat(c?.y, "-").concat(c?.value, "-").concat(p)
        }), Le.createElement(ed, m))
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
      return Le.createElement(lr, {
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
      }, function(d) {
        var y = d.t,
          m = o.map(function(v, x) {
            var w = p && p[x];
            if (w) {
              var S = ve(w.x, v.x),
                P = ve(w.y, v.y),
                h = ve(w.width, v.width),
                g = ve(w.height, v.height);
              return qt(qt({}, v), {}, {
                x: S(y),
                y: P(y),
                width: h(y),
                height: g(y)
              })
            }
            if (a === "horizontal") {
              var _ = ve(0, v.height),
                C = _(y);
              return qt(qt({}, v), {}, {
                y: v.y + v.height - C,
                height: C
              })
            }
            var k = ve(0, v.width),
              B = k(y);
            return qt(qt({}, v), {}, {
              width: B
            })
          });
        return Le.createElement(bt, null, n.renderRectanglesStatically(m))
      })
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props,
        i = n.data,
        o = n.isAnimationActive,
        a = this.state.prevData;
      return o && i && i.length && (!a || !(0, KS.default)(a, i)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(i)
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this,
        i = this.props,
        o = i.data,
        a = i.dataKey,
        u = i.activeIndex,
        s = st(this.props.background, !1);
      return o.map(function(l, f) {
        var c = l.value,
          p = l.background,
          d = t$(l, Q6);
        if (!p) return null;
        var y = qt(qt(qt(qt(qt({}, d), {}, {
          fill: "#eee"
        }, p), s), $r(n.props, l, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: a,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return Le.createElement(ed, Fs({
          key: "background-bar-".concat(f),
          option: n.props.background,
          isActive: f === u
        }, y))
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
        c = Wt(f, kr);
      if (!c) return null;
      var p = l === "vertical" ? a[0].height / 2 : a[0].width / 2,
        d = function(v, x) {
          var w = Array.isArray(v.value) ? v.value[1] : v.value;
          return {
            x: v.x,
            y: v.y,
            value: w,
            errorVal: Vt(v, x)
          }
        },
        y = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return Le.createElement(bt, y, c.map(function(m) {
        return Le.cloneElement(m, {
          key: "error-bar-".concat(i, "-").concat(m.props.dataKey),
          data: a,
          xAxis: u,
          yAxis: s,
          layout: l,
          offset: p,
          dataPointFormatter: d
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
        d = n.isAnimationActive,
        y = n.background,
        m = n.id;
      if (i || !o || !o.length) return null;
      var v = this.state.isAnimationFinished,
        x = ut("recharts-bar", a),
        w = u && u.allowDataOverflow,
        S = s && s.allowDataOverflow,
        P = w || S,
        h = (0, VS.default)(m) ? this.id : m;
      return Le.createElement(bt, {
        className: x
      }, w || S ? Le.createElement("defs", null, Le.createElement("clipPath", {
        id: "clipPath-".concat(h)
      }, Le.createElement("rect", {
        x: w ? l : l - c / 2,
        y: S ? f : f - p / 2,
        width: w ? c : c * 2,
        height: S ? p : p * 2
      }))) : null, Le.createElement(bt, {
        className: "recharts-bar-rectangles",
        clipPath: P ? "url(#clipPath-".concat(h, ")") : null
      }, y ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(P, h), (!d || v) && sr.renderCallByParent(this.props, o))
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
}(l$);
US = Ge;
Nr(Ge, "displayName", "Bar");
Nr(Ge, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !se.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
Nr(Ge, "getComposedData", function(t) {
  var e = t.props,
    r = t.item,
    n = t.barPosition,
    i = t.bandSize,
    o = t.xAxis,
    a = t.yAxis,
    u = t.xAxisTicks,
    s = t.yAxisTicks,
    l = t.stackedData,
    f = t.dataStartIndex,
    c = t.displayedData,
    p = t.offset,
    d = P1(n, r);
  if (!d) return null;
  var y = e.layout,
    m = r.type.defaultProps,
    v = m !== void 0 ? qt(qt({}, m), r.props) : r.props,
    x = v.dataKey,
    w = v.children,
    S = v.minPointSize,
    P = y === "horizontal" ? a : o,
    h = l ? P.scale.domain() : null,
    g = M1({
      numericAxis: P
    }),
    _ = Wt(w, yf),
    C = c.map(function(k, B) {
      var W, R, H, F, z, b;
      l ? W = T1(l[f + B], h) : (W = Vt(k, x), Array.isArray(W) || (W = [g, W]));
      var O = zS(S, US.defaultProps.minPointSize)(W[1], B);
      if (y === "horizontal") {
        var T, A = [a.scale(W[0]), a.scale(W[1])],
          M = A[0],
          E = A[1];
        R = wp({
          axis: o,
          ticks: u,
          bandSize: i,
          offset: d.offset,
          entry: k,
          index: B
        }), H = (T = E ?? M) !== null && T !== void 0 ? T : void 0, F = d.size;
        var D = M - E;
        if (z = Number.isNaN(D) ? 0 : D, b = {
            x: R,
            y: a.y,
            width: F,
            height: a.height
          }, Math.abs(O) > 0 && Math.abs(z) < Math.abs(O)) {
          var L = Yt(z || O) * (Math.abs(O) - Math.abs(z));
          H -= L, z += L
        }
      } else {
        var G = [o.scale(W[0]), o.scale(W[1])],
          Z = G[0],
          J = G[1];
        if (R = Z, H = wp({
            axis: a,
            ticks: s,
            bandSize: i,
            offset: d.offset,
            entry: k,
            index: B
          }), F = J - Z, z = d.size, b = {
            x: o.x,
            y: H,
            width: o.width,
            height: z
          }, Math.abs(O) > 0 && Math.abs(F) < Math.abs(O)) {
          var nt = Yt(F || O) * (Math.abs(O) - Math.abs(F));
          F += nt
        }
      }
      return qt(qt(qt({}, k), {}, {
        x: R,
        y: H,
        width: F,
        height: z,
        value: l ? W : W[1],
        payload: k,
        background: b
      }, _ && _[B] && _[B].props), {}, {
        tooltipPayload: [Os(r, k)],
        tooltipPosition: {
          x: R + F / 2,
          y: H + z / 2
        }
      })
    });
  return qt({
    data: C,
    layout: y
  }, p)
});

function xa(t) {
  "@babel/helpers - typeof";
  return xa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, xa(t)
}

function c$(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function XS(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, ZS(n.key), n)
  }
}

function f$(t, e, r) {
  return e && XS(t.prototype, e), r && XS(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function YS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ke(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? YS(Object(r), !0).forEach(function(n) {
      Us(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : YS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Us(t, e, r) {
  return e = ZS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function ZS(t) {
  var e = p$(t, "string");
  return xa(e) == "symbol" ? e : e + ""
}

function p$(t, e) {
  if (xa(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (xa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Hs = function(e, r, n, i, o) {
    var a = e.width,
      u = e.height,
      s = e.layout,
      l = e.children,
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
      p = !!Zt(l, Ge);
    return f.reduce(function(d, y) {
      var m = r[y],
        v = m.orientation,
        x = m.domain,
        w = m.padding,
        S = w === void 0 ? {} : w,
        P = m.mirror,
        h = m.reversed,
        g = "".concat(v).concat(P ? "Mirror" : ""),
        _, C, k, B, W;
      if (m.type === "number" && (m.padding === "gap" || m.padding === "no-gap")) {
        var R = x[1] - x[0],
          H = 1 / 0,
          F = m.categoricalDomain.sort(Mh);
        if (F.forEach(function(G, Z) {
            Z > 0 && (H = Math.min((G || 0) - (F[Z - 1] || 0), H))
          }), Number.isFinite(H)) {
          var z = H / R,
            b = m.layout === "vertical" ? n.height : n.width;
          if (m.padding === "gap" && (_ = z * b / 2), m.padding === "no-gap") {
            var O = ze(e.barCategoryGap, z * b),
              T = z * b / 2;
            _ = T - O - (T - O) / b * O
          }
        }
      }
      i === "xAxis" ? C = [n.left + (S.left || 0) + (_ || 0), n.left + n.width - (S.right || 0) - (_ || 0)] : i === "yAxis" ? C = s === "horizontal" ? [n.top + n.height - (S.bottom || 0), n.top + (S.top || 0)] : [n.top + (S.top || 0) + (_ || 0), n.top + n.height - (S.bottom || 0) - (_ || 0)] : C = m.range, h && (C = [C[1], C[0]]);
      var A = A1(m, o, p),
        M = A.scale,
        E = A.realScaleType;
      M.domain(x).range(C), _1(M);
      var D = j1(M, Ke(Ke({}, m), {}, {
        realScaleType: E
      }));
      i === "xAxis" ? (W = v === "top" && !P || v === "bottom" && P, k = n.left, B = c[g] - W * m.height) : i === "yAxis" && (W = v === "left" && !P || v === "right" && P, k = c[g] - W * m.width, B = n.top);
      var L = Ke(Ke(Ke({}, m), D), {}, {
        realScaleType: E,
        x: k,
        y: B,
        scale: M,
        width: i === "xAxis" ? n.width : m.width,
        height: i === "yAxis" ? n.height : m.height
      });
      return L.bandSize = di(L, D), !m.hide && i === "xAxis" ? c[g] += (W ? -1 : 1) * L.height : m.hide || (c[g] += (W ? -1 : 1) * L.width), Ke(Ke({}, d), {}, Us({}, y, L))
    }, {})
  },
  nd = function(e, r) {
    var n = e.x,
      i = e.y,
      o = r.x,
      a = r.y;
    return {
      x: Math.min(n, o),
      y: Math.min(i, a),
      width: Math.abs(o - n),
      height: Math.abs(a - i)
    }
  },
  tA = function(e) {
    var r = e.x1,
      n = e.y1,
      i = e.x2,
      o = e.y2;
    return nd({
      x: r,
      y: n
    }, {
      x: i,
      y: o
    })
  },
  eA = function() {
    function t(e) {
      c$(this, t), this.scale = e
    }
    return f$(t, [{
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
        return new t(r)
      }
    }])
  }();
Us(eA, "EPS", 1e-4);
var Oi = function(e) {
  var r = Object.keys(e).reduce(function(n, i) {
    return Ke(Ke({}, n), {}, Us({}, i, eA.create(e[i])))
  }, {});
  return Ke(Ke({}, r), {}, {
    apply: function(i) {
      var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        a = o.bandAware,
        u = o.position;
      return (0, JS.default)(i, function(s, l) {
        return r[l].apply(s, {
          bandAware: a,
          position: u
        })
      })
    },
    isInRange: function(i) {
      return (0, QS.default)(i, function(o, a) {
        return r[a].isInRange(o)
      })
    }
  })
};

function d$(t) {
  return (t % 180 + 180) % 180
}
var rA = function(e) {
  var r = e.width,
    n = e.height,
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    o = d$(i),
    a = o * Math.PI / 180,
    u = Math.atan(n / r),
    s = a > u && a < Math.PI - u ? n / Math.sin(a) : r / Math.cos(a);
  return Math.abs(s)
};
import vn, {
  createContext as gn,
  useContext as wr
} from "./react-shim-eraudit.js";
var dA = et(cA()),
  mA = et(Qp());
var fA = et(Tl()),
  pA = (0, fA.default)(function(t) {
    return {
      x: t.left,
      y: t.top,
      width: t.width,
      height: t.height
    }
  }, function(t) {
    return ["l", t.left, "t", t.top, "w", t.width, "h", t.height].join("")
  });
var id = gn(void 0),
  od = gn(void 0),
  hA = gn(void 0),
  yA = gn({}),
  vA = gn(void 0),
  gA = gn(0),
  bA = gn(0),
  ad = function(e) {
    var r = e.state,
      n = r.xAxisMap,
      i = r.yAxisMap,
      o = r.offset,
      a = e.clipPathId,
      u = e.children,
      s = e.width,
      l = e.height,
      f = pA(o);
    return vn.createElement(id.Provider, {
      value: n
    }, vn.createElement(od.Provider, {
      value: i
    }, vn.createElement(yA.Provider, {
      value: o
    }, vn.createElement(hA.Provider, {
      value: f
    }, vn.createElement(vA.Provider, {
      value: a
    }, vn.createElement(gA.Provider, {
      value: l
    }, vn.createElement(bA.Provider, {
      value: s
    }, u)))))))
  },
  xA = function() {
    return wr(vA)
  };
var Gs = function(e) {
    var r = wr(id);
    r == null && Ue(!1);
    var n = r[e];
    return n == null && Ue(!1), n
  },
  wA = function() {
    var e = wr(id);
    return tr(e)
  };
var OA = function() {
    var e = wr(od),
      r = (0, dA.default)(e, function(n) {
        return (0, mA.default)(n.domain, Number.isFinite)
      });
    return r || tr(e)
  },
  Ks = function(e) {
    var r = wr(od);
    r == null && Ue(!1);
    var n = r[e];
    return n == null && Ue(!1), n
  },
  SA = function() {
    var e = wr(hA);
    return e
  },
  AA = function() {
    return wr(yA)
  },
  Si = function() {
    return wr(bA)
  },
  Ai = function() {
    return wr(gA)
  };

function Pi(t) {
  "@babel/helpers - typeof";
  return Pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Pi(t)
}

function E$(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function _A(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, MA(n.key), n)
  }
}

function j$(t, e, r) {
  return e && _A(t.prototype, e), r && _A(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function M$(t, e, r) {
  return e = Vs(e), C$(t, jA() ? Reflect.construct(e, r || [], Vs(t).constructor) : e.apply(t, r))
}

function C$(t, e) {
  if (e && (Pi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return I$(t)
}

function I$(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function jA() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (jA = function() {
    return !!t
  })()
}

function Vs(t) {
  return Vs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Vs(t)
}

function k$(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && ud(t, e)
}

function ud(t, e) {
  return ud = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, ud(t, e)
}

function PA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function TA(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? PA(Object(r), !0).forEach(function(n) {
      ld(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : PA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ld(t, e, r) {
  return e = MA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function MA(t) {
  var e = D$(t, "string");
  return Pi(e) == "symbol" ? e : e + ""
}

function D$(t, e) {
  if (Pi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function N$(t, e) {
  return q$(t) || B$(t, e) || L$(t, e) || R$()
}

function R$() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function L$(t, e) {
  if (t) {
    if (typeof t == "string") return EA(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return EA(t, e)
  }
}

function EA(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function B$(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function q$(t) {
  if (Array.isArray(t)) return t
}

function sd() {
  return sd = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, sd.apply(this, arguments)
}
var W$ = function(e, r) {
    var n;
    return _i.isValidElement(e) ? n = _i.cloneElement(e, r) : (0, CA.default)(e) ? n = e(r) : n = _i.createElement("line", sd({}, r, {
      className: "recharts-reference-line-line"
    })), n
  },
  z$ = function(e, r, n, i, o, a, u, s, l) {
    var f = o.x,
      c = o.y,
      p = o.width,
      d = o.height;
    if (n) {
      var y = l.y,
        m = e.y.apply(y, {
          position: a
        });
      if (he(l, "discard") && !e.y.isInRange(m)) return null;
      var v = [{
        x: f + p,
        y: m
      }, {
        x: f,
        y: m
      }];
      return s === "left" ? v.reverse() : v
    }
    if (r) {
      var x = l.x,
        w = e.x.apply(x, {
          position: a
        });
      if (he(l, "discard") && !e.x.isInRange(w)) return null;
      var S = [{
        x: w,
        y: c + d
      }, {
        x: w,
        y: c
      }];
      return u === "top" ? S.reverse() : S
    }
    if (i) {
      var P = l.segment,
        h = P.map(function(g) {
          return e.apply(g, {
            position: a
          })
        });
      return he(l, "discard") && (0, IA.default)(h, function(g) {
        return !e.isInRange(g)
      }) ? null : h
    }
    return null
  };

function F$(t) {
  var e = t.x,
    r = t.y,
    n = t.segment,
    i = t.xAxisId,
    o = t.yAxisId,
    a = t.shape,
    u = t.className,
    s = t.alwaysShow,
    l = xA(),
    f = Gs(i),
    c = Ks(o),
    p = SA();
  if (!l || !p) return null;
  ue(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var d = Oi({
      x: f.scale,
      y: c.scale
    }),
    y = Mt(e),
    m = Mt(r),
    v = n && n.length === 2,
    x = z$(d, y, m, v, p, t.position, f.orientation, c.orientation, t);
  if (!x) return null;
  var w = N$(x, 2),
    S = w[0],
    P = S.x,
    h = S.y,
    g = w[1],
    _ = g.x,
    C = g.y,
    k = he(t, "hidden") ? "url(#".concat(l, ")") : void 0,
    B = TA(TA({
      clipPath: k
    }, st(t, !0)), {}, {
      x1: P,
      y1: h,
      x2: _,
      y2: C
    });
  return _i.createElement(bt, {
    className: ut("recharts-reference-line", u)
  }, W$(a, B), Bt.renderCallByParent(t, tA({
    x1: P,
    y1: h,
    x2: _,
    y2: C
  })))
}
var Xs = function(t) {
  function e() {
    return E$(this, e), M$(this, e, arguments)
  }
  return k$(e, t), j$(e, [{
    key: "render",
    value: function() {
      return _i.createElement(F$, this.props)
    }
  }])
}(_i.Component);
ld(Xs, "displayName", "ReferenceLine");
ld(Xs, "defaultProps", {
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
var BA = et(Lt());
import wa from "./react-shim-eraudit.js";

function cd() {
  return cd = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, cd.apply(this, arguments)
}

function Ti(t) {
  "@babel/helpers - typeof";
  return Ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ti(t)
}

function kA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function DA(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? kA(Object(r), !0).forEach(function(n) {
      Zs(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : kA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function $$(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function NA(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, LA(n.key), n)
  }
}

function U$(t, e, r) {
  return e && NA(t.prototype, e), r && NA(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function H$(t, e, r) {
  return e = Ys(e), G$(t, RA() ? Reflect.construct(e, r || [], Ys(t).constructor) : e.apply(t, r))
}

function G$(t, e) {
  if (e && (Ti(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return K$(t)
}

function K$(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function RA() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (RA = function() {
    return !!t
  })()
}

function Ys(t) {
  return Ys = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ys(t)
}

function V$(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && fd(t, e)
}

function fd(t, e) {
  return fd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, fd(t, e)
}

function Zs(t, e, r) {
  return e = LA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function LA(t) {
  var e = X$(t, "string");
  return Ti(e) == "symbol" ? e : e + ""
}

function X$(t, e) {
  if (Ti(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Y$ = function(e) {
    var r = e.x,
      n = e.y,
      i = e.xAxis,
      o = e.yAxis,
      a = Oi({
        x: i.scale,
        y: o.scale
      }),
      u = a.apply({
        x: r,
        y: n
      }, {
        bandAware: !0
      });
    return he(e, "discard") && !a.isInRange(u) ? null : u
  },
  Oa = function(t) {
    function e() {
      return $$(this, e), H$(this, e, arguments)
    }
    return V$(e, t), U$(e, [{
      key: "render",
      value: function() {
        var n = this.props,
          i = n.x,
          o = n.y,
          a = n.r,
          u = n.alwaysShow,
          s = n.clipPathId,
          l = Mt(i),
          f = Mt(o);
        if (ue(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !l || !f) return null;
        var c = Y$(this.props);
        if (!c) return null;
        var p = c.x,
          d = c.y,
          y = this.props,
          m = y.shape,
          v = y.className,
          x = he(this.props, "hidden") ? "url(#".concat(s, ")") : void 0,
          w = DA(DA({
            clipPath: x
          }, st(this.props, !0)), {}, {
            cx: p,
            cy: d
          });
        return wa.createElement(bt, {
          className: ut("recharts-reference-dot", v)
        }, e.renderDot(m, w), Bt.renderCallByParent(this.props, {
          x: p - a,
          y: d - a,
          width: 2 * a,
          height: 2 * a
        }))
      }
    }])
  }(wa.Component);
Zs(Oa, "displayName", "ReferenceDot");
Zs(Oa, "defaultProps", {
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
Zs(Oa, "renderDot", function(t, e) {
  var r;
  return wa.isValidElement(t) ? r = wa.cloneElement(t, e) : (0, BA.default)(t) ? r = t(e) : r = wa.createElement(gi, cd({}, e, {
    cx: e.cx,
    cy: e.cy,
    className: "recharts-reference-dot-dot"
  })), r
});
var UA = et(Lt());
import Sa from "./react-shim-eraudit.js";

function pd() {
  return pd = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, pd.apply(this, arguments)
}

function Ei(t) {
  "@babel/helpers - typeof";
  return Ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ei(t)
}

function qA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function WA(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? qA(Object(r), !0).forEach(function(n) {
      Qs(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : qA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Z$(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function zA(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, $A(n.key), n)
  }
}

function J$(t, e, r) {
  return e && zA(t.prototype, e), r && zA(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function Q$(t, e, r) {
  return e = Js(e), tU(t, FA() ? Reflect.construct(e, r || [], Js(t).constructor) : e.apply(t, r))
}

function tU(t, e) {
  if (e && (Ei(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return eU(t)
}

function eU(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function FA() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (FA = function() {
    return !!t
  })()
}

function Js(t) {
  return Js = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Js(t)
}

function rU(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && dd(t, e)
}

function dd(t, e) {
  return dd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, dd(t, e)
}

function Qs(t, e, r) {
  return e = $A(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function $A(t) {
  var e = nU(t, "string");
  return Ei(e) == "symbol" ? e : e + ""
}

function nU(t, e) {
  if (Ei(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var iU = function(e, r, n, i, o) {
    var a = o.x1,
      u = o.x2,
      s = o.y1,
      l = o.y2,
      f = o.xAxis,
      c = o.yAxis;
    if (!f || !c) return null;
    var p = Oi({
        x: f.scale,
        y: c.scale
      }),
      d = {
        x: e ? p.x.apply(a, {
          position: "start"
        }) : p.x.rangeMin,
        y: n ? p.y.apply(s, {
          position: "start"
        }) : p.y.rangeMin
      },
      y = {
        x: r ? p.x.apply(u, {
          position: "end"
        }) : p.x.rangeMax,
        y: i ? p.y.apply(l, {
          position: "end"
        }) : p.y.rangeMax
      };
    return he(o, "discard") && (!p.isInRange(d) || !p.isInRange(y)) ? null : nd(d, y)
  },
  Aa = function(t) {
    function e() {
      return Z$(this, e), Q$(this, e, arguments)
    }
    return rU(e, t), J$(e, [{
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
        ue(l === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
        var c = Mt(i),
          p = Mt(o),
          d = Mt(a),
          y = Mt(u),
          m = this.props.shape;
        if (!c && !p && !d && !y && !m) return null;
        var v = iU(c, p, d, y, this.props);
        if (!v && !m) return null;
        var x = he(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
        return Sa.createElement(bt, {
          className: ut("recharts-reference-area", s)
        }, e.renderRect(m, WA(WA({
          clipPath: x
        }, st(this.props, !0)), v)), Bt.renderCallByParent(this.props, v))
      }
    }])
  }(Sa.Component);
Qs(Aa, "displayName", "ReferenceArea");
Qs(Aa, "defaultProps", {
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
Qs(Aa, "renderRect", function(t, e) {
  var r;
  return Sa.isValidElement(t) ? r = Sa.cloneElement(t, e) : (0, UA.default)(t) ? r = t(e) : r = Sa.createElement(vi, pd({}, e, {
    className: "recharts-reference-area-rect"
  })), r
});
var el = et(Lt()),
  yd = et(zr());
import Rr, {
  Component as wU
} from "./react-shim-eraudit.js";
var YA = et(Lt());

function tl(t, e, r) {
  if (e < 1) return [];
  if (e === 1 && r === void 0) return t;
  for (var n = [], i = 0; i < t.length; i += e)
    if (r === void 0 || r(t[i]) === !0) n.push(t[i]);
    else return;
  return n
}

function HA(t, e, r) {
  var n = {
    width: t.width + e.width,
    height: t.height + e.height
  };
  return rA(n, r)
}

function GA(t, e, r) {
  var n = r === "width",
    i = t.x,
    o = t.y,
    a = t.width,
    u = t.height;
  return e === 1 ? {
    start: n ? i : o,
    end: n ? i + a : o + u
  } : {
    start: n ? i + a : o + u,
    end: n ? i : o
  }
}

function ji(t, e, r, n, i) {
  if (t * e < t * n || t * e > t * i) return !1;
  var o = r();
  return t * (e - t * o / 2 - n) >= 0 && t * (e + t * o / 2 - i) <= 0
}

function KA(t, e) {
  return tl(t, e + 1)
}

function VA(t, e, r, n, i) {
  for (var o = (n || []).slice(), a = e.start, u = e.end, s = 0, l = 1, f = a, c = function() {
      var y = n?.[s];
      if (y === void 0) return {
        v: tl(n, l)
      };
      var m = s,
        v, x = function() {
          return v === void 0 && (v = r(y, m)), v
        },
        w = y.coordinate,
        S = s === 0 || ji(t, w, x, f, u);
      S || (s = 0, f = a, l += 1), S && (f = w + t * (x() / 2 + i), s += l)
    }, p; l <= o.length;)
    if (p = c(), p) return p.v;
  return []
}

function _a(t) {
  "@babel/helpers - typeof";
  return _a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, _a(t)
}

function XA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Qt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? XA(Object(r), !0).forEach(function(n) {
      oU(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : XA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function oU(t, e, r) {
  return e = aU(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function aU(t) {
  var e = uU(t, "string");
  return _a(e) == "symbol" ? e : e + ""
}

function uU(t, e) {
  if (_a(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (_a(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function sU(t, e, r, n, i) {
  for (var o = (n || []).slice(), a = o.length, u = e.start, s = e.end, l = function(p) {
      var d = o[p],
        y, m = function() {
          return y === void 0 && (y = r(d, p)), y
        };
      if (p === a - 1) {
        var v = t * (d.coordinate + t * m() / 2 - s);
        o[p] = d = Qt(Qt({}, d), {}, {
          tickCoord: v > 0 ? d.coordinate - v * t : d.coordinate
        })
      } else o[p] = d = Qt(Qt({}, d), {}, {
        tickCoord: d.coordinate
      });
      var x = ji(t, d.tickCoord, m, u, s);
      x && (s = d.tickCoord - t * (m() / 2 + i), o[p] = Qt(Qt({}, d), {}, {
        isShow: !0
      }))
    }, f = a - 1; f >= 0; f--) l(f);
  return o
}

function lU(t, e, r, n, i, o) {
  var a = (n || []).slice(),
    u = a.length,
    s = e.start,
    l = e.end;
  if (o) {
    var f = n[u - 1],
      c = r(f, u - 1),
      p = t * (f.coordinate + t * c / 2 - l);
    a[u - 1] = f = Qt(Qt({}, f), {}, {
      tickCoord: p > 0 ? f.coordinate - p * t : f.coordinate
    });
    var d = ji(t, f.tickCoord, function() {
      return c
    }, s, l);
    d && (l = f.tickCoord - t * (c / 2 + i), a[u - 1] = Qt(Qt({}, f), {}, {
      isShow: !0
    }))
  }
  for (var y = o ? u - 1 : u, m = function(w) {
      var S = a[w],
        P, h = function() {
          return P === void 0 && (P = r(S, w)), P
        };
      if (w === 0) {
        var g = t * (S.coordinate - t * h() / 2 - s);
        a[w] = S = Qt(Qt({}, S), {}, {
          tickCoord: g < 0 ? S.coordinate - g * t : S.coordinate
        })
      } else a[w] = S = Qt(Qt({}, S), {}, {
        tickCoord: S.coordinate
      });
      var _ = ji(t, S.tickCoord, h, s, l);
      _ && (s = S.tickCoord + t * (h() / 2 + i), a[w] = Qt(Qt({}, S), {}, {
        isShow: !0
      }))
    }, v = 0; v < y; v++) m(v);
  return a
}

function Pa(t, e, r) {
  var n = t.tick,
    i = t.ticks,
    o = t.viewBox,
    a = t.minTickGap,
    u = t.orientation,
    s = t.interval,
    l = t.tickFormatter,
    f = t.unit,
    c = t.angle;
  if (!i || !i.length || !n) return [];
  if (X(s) || se.isSsr) return KA(i, typeof s == "number" && X(s) ? s : 0);
  var p = [],
    d = u === "top" || u === "bottom" ? "width" : "height",
    y = f && d === "width" ? Xr(f, {
      fontSize: e,
      letterSpacing: r
    }) : {
      width: 0,
      height: 0
    },
    m = function(S, P) {
      var h = (0, YA.default)(l) ? l(S.value, P) : S.value;
      return d === "width" ? HA(Xr(h, {
        fontSize: e,
        letterSpacing: r
      }), y, c) : Xr(h, {
        fontSize: e,
        letterSpacing: r
      })[d]
    },
    v = i.length >= 2 ? Yt(i[1].coordinate - i[0].coordinate) : 1,
    x = GA(o, v, d);
  return s === "equidistantPreserveStart" ? VA(v, x, m, i, a) : (s === "preserveStart" || s === "preserveStartEnd" ? p = lU(v, x, m, i, a, s === "preserveStartEnd") : p = sU(v, x, m, i, a), p.filter(function(w) {
    return w.isShow
  }))
}
var cU = ["viewBox"],
  fU = ["viewBox"],
  pU = ["ticks"];

function Ci(t) {
  "@babel/helpers - typeof";
  return Ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ci(t)
}

function Mi() {
  return Mi = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Mi.apply(this, arguments)
}

function ZA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function $t(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ZA(Object(r), !0).forEach(function(n) {
      vd(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : ZA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function md(t, e) {
  if (t == null) return {};
  var r = dU(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function dU(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function mU(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function JA(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, t_(n.key), n)
  }
}

function hU(t, e, r) {
  return e && JA(t.prototype, e), r && JA(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function yU(t, e, r) {
  return e = rl(e), vU(t, QA() ? Reflect.construct(e, r || [], rl(t).constructor) : e.apply(t, r))
}

function vU(t, e) {
  if (e && (Ci(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return gU(t)
}

function gU(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function QA() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (QA = function() {
    return !!t
  })()
}

function rl(t) {
  return rl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, rl(t)
}

function bU(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && hd(t, e)
}

function hd(t, e) {
  return hd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, hd(t, e)
}

function vd(t, e, r) {
  return e = t_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function t_(t) {
  var e = xU(t, "string");
  return Ci(e) == "symbol" ? e : e + ""
}

function xU(t, e) {
  if (Ci(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Or = function(t) {
  function e(r) {
    var n;
    return mU(this, e), n = yU(this, e, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n
  }
  return bU(e, t), hU(e, [{
    key: "shouldComponentUpdate",
    value: function(n, i) {
      var o = n.viewBox,
        a = md(n, cU),
        u = this.props,
        s = u.viewBox,
        l = md(u, fU);
      return !dr(o, s) || !dr(a, l) || !dr(i, this.state)
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
        d, y, m, v, x, w, S = c ? -1 : 1,
        P = n.tickSize || f,
        h = X(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (l) {
        case "top":
          d = y = n.coordinate, v = a + +!c * s, m = v - S * P, w = m - S * p, x = h;
          break;
        case "left":
          m = v = n.coordinate, y = o + +!c * u, d = y - S * P, x = d - S * p, w = h;
          break;
        case "right":
          m = v = n.coordinate, y = o + +c * u, d = y + S * P, x = d + S * p, w = h;
          break;
        default:
          d = y = n.coordinate, v = a + +c * s, m = v + S * P, w = m + S * p, x = h;
          break
      }
      return {
        line: {
          x1: d,
          y1: m,
          x2: y,
          y2: v
        },
        tick: {
          x,
          y: w
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
        c = $t($t($t({}, st(this.props, !1)), st(f, !1)), {}, {
          fill: "none"
        });
      if (s === "top" || s === "bottom") {
        var p = +(s === "top" && !l || s === "bottom" && l);
        c = $t($t({}, c), {}, {
          x1: i,
          y1: o + p * u,
          x2: i + a,
          y2: o + p * u
        })
      } else {
        var d = +(s === "left" && !l || s === "right" && l);
        c = $t($t({}, c), {}, {
          x1: i + d * a,
          y1: o,
          x2: i + d * a,
          y2: o + u
        })
      }
      return Rr.createElement("line", Mi({}, c, {
        className: ut("recharts-cartesian-axis-line", (0, yd.default)(f, "className"))
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
        d = Pa($t($t({}, this.props), {}, {
          ticks: n
        }), i, o),
        y = this.getTickTextAnchor(),
        m = this.getTickVerticalAnchor(),
        v = st(this.props, !1),
        x = st(f, !1),
        w = $t($t({}, v), {}, {
          fill: "none"
        }, st(s, !1)),
        S = d.map(function(P, h) {
          var g = a.getTickLineCoord(P),
            _ = g.line,
            C = g.tick,
            k = $t($t($t($t({
              textAnchor: y,
              verticalAnchor: m
            }, v), {}, {
              stroke: "none",
              fill: l
            }, x), C), {}, {
              index: h,
              payload: P,
              visibleTicksCount: d.length,
              tickFormatter: c
            });
          return Rr.createElement(bt, Mi({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(P.value, "-").concat(P.coordinate, "-").concat(P.tickCoord)
          }, $r(a.props, P, h)), s && Rr.createElement("line", Mi({}, w, _, {
            className: ut("recharts-cartesian-axis-tick-line", (0, yd.default)(s, "className"))
          })), f && e.renderTickItem(f, k, "".concat((0, el.default)(c) ? c(P.value, h) : P.value).concat(p || "")))
        });
      return Rr.createElement("g", {
        className: "recharts-cartesian-axis-ticks"
      }, S)
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
        d = md(c, pU),
        y = p;
      return (0, el.default)(s) && (y = p && p.length > 0 ? s(this.props) : s(d)), a <= 0 || u <= 0 || !y || !y.length ? null : Rr.createElement(bt, {
        className: ut("recharts-cartesian-axis", l),
        ref: function(v) {
          n.layerReference = v
        }
      }, o && this.renderAxisLine(), this.renderTicks(y, this.state.fontSize, this.state.letterSpacing), Bt.renderCallByParent(this.props))
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, o) {
      var a, u = ut(i.className, "recharts-cartesian-axis-tick-value");
      return Rr.isValidElement(n) ? a = Rr.cloneElement(n, $t($t({}, i), {}, {
        className: u
      })) : (0, el.default)(n) ? a = n($t($t({}, i), {}, {
        className: u
      })) : a = Rr.createElement(Yr, Mi({}, i, {
        className: "recharts-cartesian-axis-tick-value"
      }), o), a
    }
  }])
}(wU);
vd(Or, "displayName", "CartesianAxis");
vd(Or, "defaultProps", {
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
var nl = et(Lt());
import ee from "./react-shim-eraudit.js";
var OU = ["x1", "y1", "x2", "y2", "key"],
  SU = ["offset"];

function xn(t) {
  "@babel/helpers - typeof";
  return xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, xn(t)
}

function e_(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function te(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? e_(Object(r), !0).forEach(function(n) {
      AU(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : e_(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function AU(t, e, r) {
  return e = _U(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function _U(t) {
  var e = PU(t, "string");
  return xn(e) == "symbol" ? e : e + ""
}

function PU(t, e) {
  if (xn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (xn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function bn() {
  return bn = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, bn.apply(this, arguments)
}

function r_(t, e) {
  if (t == null) return {};
  var r = TU(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function TU(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var EU = function(e) {
  var r = e.fill;
  if (!r || r === "none") return null;
  var n = e.fillOpacity,
    i = e.x,
    o = e.y,
    a = e.width,
    u = e.height,
    s = e.ry;
  return ee.createElement("rect", {
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

function n_(t, e) {
  var r;
  if (ee.isValidElement(t)) r = ee.cloneElement(t, e);
  else if ((0, nl.default)(t)) r = t(e);
  else {
    var n = e.x1,
      i = e.y1,
      o = e.x2,
      a = e.y2,
      u = e.key,
      s = r_(e, OU),
      l = st(s, !1),
      f = l.offset,
      c = r_(l, SU);
    r = ee.createElement("line", bn({}, c, {
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

function jU(t) {
  var e = t.x,
    r = t.width,
    n = t.horizontal,
    i = n === void 0 ? !0 : n,
    o = t.horizontalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = te(te({}, t), {}, {
      x1: e,
      y1: u,
      x2: e + r,
      y2: u,
      key: "line-".concat(s),
      index: s
    });
    return n_(i, l)
  });
  return ee.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, a)
}

function MU(t) {
  var e = t.y,
    r = t.height,
    n = t.vertical,
    i = n === void 0 ? !0 : n,
    o = t.verticalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = te(te({}, t), {}, {
      x1: u,
      y1: e,
      x2: u,
      y2: e + r,
      key: "line-".concat(s),
      index: s
    });
    return n_(i, l)
  });
  return ee.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, a)
}

function CU(t) {
  var e = t.horizontalFill,
    r = t.fillOpacity,
    n = t.x,
    i = t.y,
    o = t.width,
    a = t.height,
    u = t.horizontalPoints,
    s = t.horizontal,
    l = s === void 0 ? !0 : s;
  if (!l || !e || !e.length) return null;
  var f = u.map(function(p) {
    return Math.round(p + i - i)
  }).sort(function(p, d) {
    return p - d
  });
  i !== f[0] && f.unshift(0);
  var c = f.map(function(p, d) {
    var y = !f[d + 1],
      m = y ? i + a - p : f[d + 1] - p;
    if (m <= 0) return null;
    var v = d % e.length;
    return ee.createElement("rect", {
      key: "react-".concat(d),
      y: p,
      x: n,
      height: m,
      width: o,
      stroke: "none",
      fill: e[v],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    })
  });
  return ee.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, c)
}

function IU(t) {
  var e = t.vertical,
    r = e === void 0 ? !0 : e,
    n = t.verticalFill,
    i = t.fillOpacity,
    o = t.x,
    a = t.y,
    u = t.width,
    s = t.height,
    l = t.verticalPoints;
  if (!r || !n || !n.length) return null;
  var f = l.map(function(p) {
    return Math.round(p + o - o)
  }).sort(function(p, d) {
    return p - d
  });
  o !== f[0] && f.unshift(0);
  var c = f.map(function(p, d) {
    var y = !f[d + 1],
      m = y ? o + u - p : f[d + 1] - p;
    if (m <= 0) return null;
    var v = d % n.length;
    return ee.createElement("rect", {
      key: "react-".concat(d),
      x: p,
      y: a,
      width: m,
      height: s,
      stroke: "none",
      fill: n[v],
      fillOpacity: i,
      className: "recharts-cartesian-grid-bg"
    })
  });
  return ee.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, c)
}
var kU = function(e, r) {
    var n = e.xAxis,
      i = e.width,
      o = e.height,
      a = e.offset;
    return bp(Pa(te(te(te({}, Or.defaultProps), n), {}, {
      ticks: Oe(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.left, a.left + a.width, r)
  },
  DU = function(e, r) {
    var n = e.yAxis,
      i = e.width,
      o = e.height,
      a = e.offset;
    return bp(Pa(te(te(te({}, Or.defaultProps), n), {}, {
      ticks: Oe(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.top, a.top + a.height, r)
  },
  Ii = {
    horizontal: !0,
    vertical: !0,
    horizontalPoints: [],
    verticalPoints: [],
    stroke: "#ccc",
    fill: "none",
    verticalFill: [],
    horizontalFill: []
  };

function Ta(t) {
  var e, r, n, i, o, a, u = Si(),
    s = Ai(),
    l = AA(),
    f = te(te({}, t), {}, {
      stroke: (e = t.stroke) !== null && e !== void 0 ? e : Ii.stroke,
      fill: (r = t.fill) !== null && r !== void 0 ? r : Ii.fill,
      horizontal: (n = t.horizontal) !== null && n !== void 0 ? n : Ii.horizontal,
      horizontalFill: (i = t.horizontalFill) !== null && i !== void 0 ? i : Ii.horizontalFill,
      vertical: (o = t.vertical) !== null && o !== void 0 ? o : Ii.vertical,
      verticalFill: (a = t.verticalFill) !== null && a !== void 0 ? a : Ii.verticalFill,
      x: X(t.x) ? t.x : l.left,
      y: X(t.y) ? t.y : l.top,
      width: X(t.width) ? t.width : l.width,
      height: X(t.height) ? t.height : l.height
    }),
    c = f.x,
    p = f.y,
    d = f.width,
    y = f.height,
    m = f.syncWithTicks,
    v = f.horizontalValues,
    x = f.verticalValues,
    w = wA(),
    S = OA();
  if (!X(d) || d <= 0 || !X(y) || y <= 0 || !X(c) || c !== +c || !X(p) || p !== +p) return null;
  var P = f.verticalCoordinatesGenerator || kU,
    h = f.horizontalCoordinatesGenerator || DU,
    g = f.horizontalPoints,
    _ = f.verticalPoints;
  if ((!g || !g.length) && (0, nl.default)(h)) {
    var C = v && v.length,
      k = h({
        yAxis: S ? te(te({}, S), {}, {
          ticks: C ? v : S.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, C ? !0 : m);
    ue(Array.isArray(k), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(xn(k), "]")), Array.isArray(k) && (g = k)
  }
  if ((!_ || !_.length) && (0, nl.default)(P)) {
    var B = x && x.length,
      W = P({
        xAxis: w ? te(te({}, w), {}, {
          ticks: B ? x : w.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, B ? !0 : m);
    ue(Array.isArray(W), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(xn(W), "]")), Array.isArray(W) && (_ = W)
  }
  return ee.createElement("g", {
    className: "recharts-cartesian-grid"
  }, ee.createElement(EU, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), ee.createElement(jU, bn({}, f, {
    offset: l,
    horizontalPoints: g,
    xAxis: w,
    yAxis: S
  })), ee.createElement(MU, bn({}, f, {
    offset: l,
    verticalPoints: _,
    xAxis: w,
    yAxis: S
  })), ee.createElement(CU, bn({}, f, {
    horizontalPoints: g
  })), ee.createElement(IU, bn({}, f, {
    verticalPoints: _
  })))
}
Ta.displayName = "CartesianGrid";
import ye, {
  PureComponent as XU
} from "./react-shim-eraudit.js";
var l_ = et(Lt()),
  ol = et(Te()),
  c_ = et(Ro());
var NU = ["type", "layout", "connectNulls", "ref"],
  RU = ["key"];

function Di(t) {
  "@babel/helpers - typeof";
  return Di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Di(t)
}

function i_(t, e) {
  if (t == null) return {};
  var r = LU(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function LU(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Ea() {
  return Ea = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ea.apply(this, arguments)
}

function o_(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ae(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? o_(Object(r), !0).forEach(function(n) {
      Ve(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : o_(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ki(t) {
  return zU(t) || WU(t) || qU(t) || BU()
}

function BU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function qU(t, e) {
  if (t) {
    if (typeof t == "string") return gd(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return gd(t, e)
  }
}

function WU(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function zU(t) {
  if (Array.isArray(t)) return gd(t)
}

function gd(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function FU(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function a_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, s_(n.key), n)
  }
}

function $U(t, e, r) {
  return e && a_(t.prototype, e), r && a_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function UU(t, e, r) {
  return e = il(e), HU(t, u_() ? Reflect.construct(e, r || [], il(t).constructor) : e.apply(t, r))
}

function HU(t, e) {
  if (e && (Di(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return GU(t)
}

function GU(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function u_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (u_ = function() {
    return !!t
  })()
}

function il(t) {
  return il = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, il(t)
}

function KU(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && bd(t, e)
}

function bd(t, e) {
  return bd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, bd(t, e)
}

function Ve(t, e, r) {
  return e = s_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function s_(t) {
  var e = VU(t, "string");
  return Di(e) == "symbol" ? e : e + ""
}

function VU(t, e) {
  if (Di(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Lr = function(t) {
  function e() {
    var r;
    FU(this, e);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = UU(this, e, [].concat(i)), Ve(r, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), Ve(r, "generateSimpleStrokeDasharray", function(a, u) {
      return "".concat(u, "px ").concat(a - u, "px")
    }), Ve(r, "getStrokeDasharray", function(a, u, s) {
      var l = s.reduce(function(x, w) {
        return x + w
      });
      if (!l) return r.generateSimpleStrokeDasharray(u, a);
      for (var f = Math.floor(a / l), c = a % l, p = u - a, d = [], y = 0, m = 0; y < s.length; m += s[y], ++y)
        if (m + s[y] > c) {
          d = [].concat(ki(s.slice(0, y)), [c - m]);
          break
        } var v = d.length % 2 === 0 ? [0, p] : [p];
      return [].concat(ki(e.repeat(s, f)), ki(d), v).map(function(x) {
        return "".concat(x, "px")
      }).join(", ")
    }), Ve(r, "id", Qe("recharts-line-")), Ve(r, "pathRef", function(a) {
      r.mainCurve = a
    }), Ve(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      }), r.props.onAnimationEnd && r.props.onAnimationEnd()
    }), Ve(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      }), r.props.onAnimationStart && r.props.onAnimationStart()
    }), r
  }
  return KU(e, t), $U(e, [{
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
        c = Wt(f, kr);
      if (!c) return null;
      var p = function(m, v) {
          return {
            x: m.x,
            y: m.y,
            value: m.value,
            errorVal: Vt(m.payload, v)
          }
        },
        d = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return ye.createElement(bt, d, c.map(function(y) {
        return ye.cloneElement(y, {
          key: "bar-".concat(y.props.dataKey),
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
        c = st(this.props, !1),
        p = st(s, !0),
        d = l.map(function(m, v) {
          var x = Ae(Ae(Ae({
            key: "dot-".concat(v),
            r: 3
          }, c), p), {}, {
            index: v,
            cx: m.x,
            cy: m.y,
            value: m.value,
            dataKey: f,
            payload: m.payload,
            points: l
          });
          return e.renderDotItem(s, x)
        }),
        y = {
          clipPath: n ? "url(#clipPath-".concat(i ? "" : "dots-").concat(o, ")") : null
        };
      return ye.createElement(bt, Ea({
        className: "recharts-line-dots",
        key: "dots"
      }, y), d)
    }
  }, {
    key: "renderCurveStatically",
    value: function(n, i, o, a) {
      var u = this.props,
        s = u.type,
        l = u.layout,
        f = u.connectNulls,
        c = u.ref,
        p = i_(u, NU),
        d = Ae(Ae(Ae({}, st(p, !0)), {}, {
          fill: "none",
          className: "recharts-line-curve",
          clipPath: i ? "url(#clipPath-".concat(o, ")") : null,
          points: n
        }, a), {}, {
          type: s,
          layout: l,
          connectNulls: f
        });
      return ye.createElement(ia, Ea({}, d, {
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
        d = a.animationId,
        y = a.animateNewValues,
        m = a.width,
        v = a.height,
        x = this.state,
        w = x.prevPoints,
        S = x.totalLength;
      return ye.createElement(lr, {
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
        key: "line-".concat(d),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(P) {
        var h = P.t;
        if (w) {
          var g = w.length / u.length,
            _ = u.map(function(R, H) {
              var F = Math.floor(H * g);
              if (w[F]) {
                var z = w[F],
                  b = ve(z.x, R.x),
                  O = ve(z.y, R.y);
                return Ae(Ae({}, R), {}, {
                  x: b(h),
                  y: O(h)
                })
              }
              if (y) {
                var T = ve(m * 2, R.x),
                  A = ve(v / 2, R.y);
                return Ae(Ae({}, R), {}, {
                  x: T(h),
                  y: A(h)
                })
              }
              return Ae(Ae({}, R), {}, {
                x: R.x,
                y: R.y
              })
            });
          return o.renderCurveStatically(_, n, i)
        }
        var C = ve(0, S),
          k = C(h),
          B;
        if (s) {
          var W = "".concat(s).split(/[,\s]+/gim).map(function(R) {
            return parseFloat(R)
          });
          B = o.getStrokeDasharray(k, S, W)
        } else B = o.generateSimpleStrokeDasharray(S, k);
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
      return u && a && a.length && (!l && f > 0 || !(0, c_.default)(l, a)) ? this.renderCurveWithAnimation(n, i) : this.renderCurveStatically(a, n, i)
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
        d = i.width,
        y = i.height,
        m = i.isAnimationActive,
        v = i.id;
      if (o || !u || !u.length) return null;
      var x = this.state.isAnimationFinished,
        w = u.length === 1,
        S = ut("recharts-line", s),
        P = l && l.allowDataOverflow,
        h = f && f.allowDataOverflow,
        g = P || h,
        _ = (0, ol.default)(v) ? this.id : v,
        C = (n = st(a, !1)) !== null && n !== void 0 ? n : {
          r: 3,
          strokeWidth: 2
        },
        k = C.r,
        B = k === void 0 ? 3 : k,
        W = C.strokeWidth,
        R = W === void 0 ? 2 : W,
        H = zh(a) ? a : {},
        F = H.clipDot,
        z = F === void 0 ? !0 : F,
        b = B * 2 + R;
      return ye.createElement(bt, {
        className: S
      }, P || h ? ye.createElement("defs", null, ye.createElement("clipPath", {
        id: "clipPath-".concat(_)
      }, ye.createElement("rect", {
        x: P ? p : p - d / 2,
        y: h ? c : c - y / 2,
        width: P ? d : d * 2,
        height: h ? y : y * 2
      })), !z && ye.createElement("clipPath", {
        id: "clipPath-dots-".concat(_)
      }, ye.createElement("rect", {
        x: p - b / 2,
        y: c - b / 2,
        width: d + b,
        height: y + b
      }))) : null, !w && this.renderCurve(g, _), this.renderErrorBar(g, _), (w || a) && this.renderDots(g, z, _), (!m || x) && sr.renderCallByParent(this.props, u))
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
      for (var o = n.length % 2 !== 0 ? [].concat(ki(n), [0]) : n, a = [], u = 0; u < i; ++u) a = [].concat(ki(a), ki(o));
      return a
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var o;
      if (ye.isValidElement(n)) o = ye.cloneElement(n, i);
      else if ((0, l_.default)(n)) o = n(i);
      else {
        var a = i.key,
          u = i_(i, RU),
          s = ut("recharts-line-dot", typeof n != "boolean" ? n.className : "");
        o = ye.createElement(gi, Ea({
          key: a
        }, u, {
          className: s
        }))
      }
      return o
    }
  }])
}(XU);
Ve(Lr, "displayName", "Line");
Ve(Lr, "defaultProps", {
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
  isAnimationActive: !se.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
});
Ve(Lr, "getComposedData", function(t) {
  var e = t.props,
    r = t.xAxis,
    n = t.yAxis,
    i = t.xAxisTicks,
    o = t.yAxisTicks,
    a = t.dataKey,
    u = t.bandSize,
    s = t.displayedData,
    l = t.offset,
    f = e.layout,
    c = s.map(function(p, d) {
      var y = Vt(p, a);
      return f === "horizontal" ? {
        x: xp({
          axis: r,
          ticks: i,
          bandSize: u,
          entry: p,
          index: d
        }),
        y: (0, ol.default)(y) ? null : n.scale(y),
        value: y,
        payload: p
      } : {
        x: (0, ol.default)(y) ? null : r.scale(y),
        y: xp({
          axis: n,
          ticks: o,
          bandSize: u,
          entry: p,
          index: d
        }),
        value: y,
        payload: p
      }
    });
  return Ae({
    points: c,
    layout: f
  }, l)
});
import * as ja from "./react-shim-eraudit.js";

function Ni(t) {
  "@babel/helpers - typeof";
  return Ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ni(t)
}

function YU(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function f_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, m_(n.key), n)
  }
}

function ZU(t, e, r) {
  return e && f_(t.prototype, e), r && f_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function JU(t, e, r) {
  return e = al(e), QU(t, p_() ? Reflect.construct(e, r || [], al(t).constructor) : e.apply(t, r))
}

function QU(t, e) {
  if (e && (Ni(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return t5(t)
}

function t5(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function p_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (p_ = function() {
    return !!t
  })()
}

function al(t) {
  return al = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, al(t)
}

function e5(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && xd(t, e)
}

function xd(t, e) {
  return xd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, xd(t, e)
}

function d_(t, e, r) {
  return e = m_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function m_(t) {
  var e = r5(t, "string");
  return Ni(e) == "symbol" ? e : e + ""
}

function r5(t, e) {
  if (Ni(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function wd() {
  return wd = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, wd.apply(this, arguments)
}

function n5(t) {
  var e = t.xAxisId,
    r = Si(),
    n = Ai(),
    i = Gs(e);
  return i == null ? null : ja.createElement(Or, wd({}, i, {
    className: ut("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
    viewBox: {
      x: 0,
      y: 0,
      width: r,
      height: n
    },
    ticksGenerator: function(a) {
      return Oe(a, !0)
    }
  }))
}
var cr = function(t) {
  function e() {
    return YU(this, e), JU(this, e, arguments)
  }
  return e5(e, t), ZU(e, [{
    key: "render",
    value: function() {
      return ja.createElement(n5, this.props)
    }
  }])
}(ja.Component);
d_(cr, "displayName", "XAxis");
d_(cr, "defaultProps", {
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
import * as Ma from "./react-shim-eraudit.js";

function Ri(t) {
  "@babel/helpers - typeof";
  return Ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ri(t)
}

function i5(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function h_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, g_(n.key), n)
  }
}

function o5(t, e, r) {
  return e && h_(t.prototype, e), r && h_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function a5(t, e, r) {
  return e = ul(e), u5(t, y_() ? Reflect.construct(e, r || [], ul(t).constructor) : e.apply(t, r))
}

function u5(t, e) {
  if (e && (Ri(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return s5(t)
}

function s5(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function y_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (y_ = function() {
    return !!t
  })()
}

function ul(t) {
  return ul = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ul(t)
}

function l5(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Od(t, e)
}

function Od(t, e) {
  return Od = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Od(t, e)
}

function v_(t, e, r) {
  return e = g_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function g_(t) {
  var e = c5(t, "string");
  return Ri(e) == "symbol" ? e : e + ""
}

function c5(t, e) {
  if (Ri(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ri(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Sd() {
  return Sd = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Sd.apply(this, arguments)
}
var f5 = function(e) {
    var r = e.yAxisId,
      n = Si(),
      i = Ai(),
      o = Ks(r);
    return o == null ? null : Ma.createElement(Or, Sd({}, o, {
      className: ut("recharts-".concat(o.axisType, " ").concat(o.axisType), o.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: i
      },
      ticksGenerator: function(u) {
        return Oe(u, !0)
      }
    }))
  },
  fr = function(t) {
    function e() {
      return i5(this, e), a5(this, e, arguments)
    }
    return l5(e, t), o5(e, [{
      key: "render",
      value: function() {
        return Ma.createElement(f5, this.props)
      }
    }])
  }(Ma.Component);
v_(fr, "displayName", "YAxis");
v_(fr, "defaultProps", {
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
var Bi = et(Te()),
  Ye = et(Lt()),
  yl = et(Xp()),
  qi = et(zr()),
  z_ = et(Su()),
  F_ = et(mf());
import Be, {
  Component as $5,
  cloneElement as Xe,
  isValidElement as U5,
  forwardRef as H5
} from "./react-shim-eraudit.js";

function b_(t) {
  return h5(t) || m5(t) || d5(t) || p5()
}

function p5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function d5(t, e) {
  if (t) {
    if (typeof t == "string") return Ad(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ad(t, e)
  }
}

function m5(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function h5(t) {
  if (Array.isArray(t)) return Ad(t)
}

function Ad(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var sl = function(e, r, n, i, o) {
  var a = Wt(e, Xs),
    u = Wt(e, Oa),
    s = [].concat(b_(a), b_(u)),
    l = Wt(e, Aa),
    f = "".concat(i, "Id"),
    c = i[0],
    p = r;
  if (s.length && (p = s.reduce(function(m, v) {
      if (v.props[f] === n && he(v.props, "extendDomain") && X(v.props[c])) {
        var x = v.props[c];
        return [Math.min(m[0], x), Math.max(m[1], x)]
      }
      return m
    }, p)), l.length) {
    var d = "".concat(c, "1"),
      y = "".concat(c, "2");
    p = l.reduce(function(m, v) {
      if (v.props[f] === n && he(v.props, "extendDomain") && X(v.props[d]) && X(v.props[y])) {
        var x = v.props[d],
          w = v.props[y];
        return [Math.min(m[0], x, w), Math.max(m[1], x, w)]
      }
      return m
    }, p)
  }
  return o && o.length && (p = o.reduce(function(m, v) {
    return X(v) ? [Math.min(m[0], v), Math.max(m[1], v)] : m
  }, p)), p
};
var O_ = et(w_()),
  cl = new O_.default;
var fl = "recharts.syncMouseEvents";

function Ia(t) {
  "@babel/helpers - typeof";
  return Ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ia(t)
}

function g5(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function S_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, A_(n.key), n)
  }
}

function b5(t, e, r) {
  return e && S_(t.prototype, e), r && S_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function Pd(t, e, r) {
  return e = A_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function A_(t) {
  var e = x5(t, "string");
  return Ia(e) == "symbol" ? e : e + ""
}

function x5(t, e) {
  if (Ia(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ia(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var __ = function() {
  function t() {
    g5(this, t), Pd(this, "activeIndex", 0), Pd(this, "coordinateList", []), Pd(this, "layout", "horizontal")
  }
  return b5(t, [{
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
        d = p === void 0 ? null : p;
      this.coordinateList = (n = o ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = u ?? this.container, this.layout = l ?? this.layout, this.offset = c ?? this.offset, this.mouseHandlerCallback = d ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1)
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

function P_(t, e, r) {
  if (r === "number" && e === !0 && Array.isArray(t)) {
    var n = t?.[0],
      i = t?.[1];
    if (n && i && X(n) && X(i)) return !0
  }
  return !1
}
import {
  cloneElement as A5,
  createElement as _5,
  isValidElement as P5
} from "./react-shim-eraudit.js";

function T_(t, e, r, n) {
  var i = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: t === "horizontal" ? e.x - i : r.left + .5,
    y: t === "horizontal" ? r.top + .5 : e.y - i,
    width: t === "horizontal" ? n : r.width - 1,
    height: t === "horizontal" ? r.height - 1 : n
  }
}

function pl(t) {
  var e = t.cx,
    r = t.cy,
    n = t.radius,
    i = t.startAngle,
    o = t.endAngle,
    a = Nt(e, r, n, i),
    u = Nt(e, r, n, o);
  return {
    points: [a, u],
    cx: e,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: o
  }
}

function E_(t, e, r) {
  var n, i, o, a;
  if (t === "horizontal") n = e.x, o = n, i = r.top, a = r.top + r.height;
  else if (t === "vertical") i = e.y, a = i, n = r.left, o = r.left + r.width;
  else if (e.cx != null && e.cy != null)
    if (t === "centric") {
      var u = e.cx,
        s = e.cy,
        l = e.innerRadius,
        f = e.outerRadius,
        c = e.angle,
        p = Nt(u, s, l, c),
        d = Nt(u, s, f, c);
      n = p.x, i = p.y, o = d.x, a = d.y
    } else return pl(e);
  return [{
    x: n,
    y: i
  }, {
    x: o,
    y: a
  }]
}

function ka(t) {
  "@babel/helpers - typeof";
  return ka = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ka(t)
}

function j_(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function dl(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? j_(Object(r), !0).forEach(function(n) {
      w5(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : j_(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function w5(t, e, r) {
  return e = O5(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function O5(t) {
  var e = S5(t, "string");
  return ka(e) == "symbol" ? e : e + ""
}

function S5(t, e) {
  if (ka(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ka(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function M_(t) {
  var e, r, n = t.element,
    i = t.tooltipEventType,
    o = t.isActive,
    a = t.activeCoordinate,
    u = t.activePayload,
    s = t.offset,
    l = t.activeTooltipIndex,
    f = t.tooltipAxisBandSize,
    c = t.layout,
    p = t.chartName,
    d = (e = n.props.cursor) !== null && e !== void 0 ? e : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !d || !o || !a || p !== "ScatterChart" && i !== "axis") return null;
  var y, m = ia;
  if (p === "ScatterChart") y = a, m = zO;
  else if (p === "BarChart") y = T_(c, a, s, f), m = vi;
  else if (c === "radial") {
    var v = pl(a),
      x = v.cx,
      w = v.cy,
      S = v.radius,
      P = v.startAngle,
      h = v.endAngle;
    y = {
      cx: x,
      cy: w,
      startAngle: P,
      endAngle: h,
      innerRadius: S,
      outerRadius: S
    }, m = Ts
  } else y = {
    points: E_(c, a, s)
  }, m = ia;
  var g = dl(dl(dl(dl({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), y), st(d, !1)), {}, {
    payload: u,
    payloadIndex: l,
    className: ut("recharts-tooltip-cursor", d.className)
  });
  return P5(d) ? A5(d, g) : _5(m, g)
}
var T5 = ["item"],
  E5 = ["children", "className", "width", "height", "style", "compact", "title", "desc"];

function Wi(t) {
  "@babel/helpers - typeof";
  return Wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Wi(t)
}

function Li() {
  return Li = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Li.apply(this, arguments)
}

function C_(t, e) {
  return C5(t) || M5(t, e) || q_(t, e) || j5()
}

function j5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function M5(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, a, u = [],
      s = !0,
      l = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r) return;
        s = !1
      } else
        for (; !(s = (n = o.call(r)).done) && (u.push(n.value), u.length !== e); s = !0);
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

function C5(t) {
  if (Array.isArray(t)) return t
}

function I_(t, e) {
  if (t == null) return {};
  var r = I5(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function I5(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function k5(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function k_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, W_(n.key), n)
  }
}

function D5(t, e, r) {
  return e && k_(t.prototype, e), r && k_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function N5(t, e, r) {
  return e = hl(e), R5(t, B_() ? Reflect.construct(e, r || [], hl(t).constructor) : e.apply(t, r))
}

function R5(t, e) {
  if (e && (Wi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return L5(t)
}

function L5(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function B_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (B_ = function() {
    return !!t
  })()
}

function hl(t) {
  return hl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, hl(t)
}

function B5(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Td(t, e)
}

function Td(t, e) {
  return Td = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Td(t, e)
}

function zi(t) {
  return z5(t) || W5(t) || q_(t) || q5()
}

function q5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function q_(t, e) {
  if (t) {
    if (typeof t == "string") return Ed(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ed(t, e)
  }
}

function W5(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function z5(t) {
  if (Array.isArray(t)) return Ed(t)
}

function Ed(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function D_(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function U(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? D_(Object(r), !0).forEach(function(n) {
      ct(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : D_(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ct(t, e, r) {
  return e = W_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function W_(t) {
  var e = F5(t, "string");
  return Wi(e) == "symbol" ? e : e + ""
}

function F5(t, e) {
  if (Wi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var G5 = {
    xAxis: ["bottom", "top"],
    yAxis: ["left", "right"]
  },
  K5 = {
    width: "100%",
    height: "100%"
  },
  $_ = {
    x: 0,
    y: 0
  };

function ml(t) {
  return t
}
var V5 = function(e, r) {
    return r === "horizontal" ? e.x : r === "vertical" ? e.y : r === "centric" ? e.angle : e.radius
  },
  X5 = function(e, r, n, i) {
    var o = r.find(function(f) {
      return f && f.index === n
    });
    if (o) {
      if (e === "horizontal") return {
        x: o.coordinate,
        y: i.y
      };
      if (e === "vertical") return {
        x: i.x,
        y: o.coordinate
      };
      if (e === "centric") {
        var a = o.coordinate,
          u = i.radius;
        return U(U(U({}, i), Nt(i.cx, i.cy, u, a)), {}, {
          angle: a,
          radius: u
        })
      }
      var s = o.coordinate,
        l = i.angle;
      return U(U(U({}, i), Nt(i.cx, i.cy, s, l)), {}, {
        angle: l,
        radius: s
      })
    }
    return $_
  },
  vl = function(e, r) {
    var n = r.graphicalItems,
      i = r.dataStartIndex,
      o = r.dataEndIndex,
      a = (n ?? []).reduce(function(u, s) {
        var l = s.props.data;
        return l && l.length ? [].concat(zi(u), zi(l)) : u
      }, []);
    return a.length > 0 ? a : e && e.length && X(i) && X(o) ? e.slice(i, o + 1) : []
  };

function U_(t) {
  return t === "number" ? [0, "auto"] : void 0
}
var jd = function(e, r, n, i) {
    var o = e.graphicalItems,
      a = e.tooltipAxis,
      u = vl(r, e);
    return n < 0 || !o || !o.length || n >= u.length ? null : o.reduce(function(s, l) {
      var f, c = (f = l.props.data) !== null && f !== void 0 ? f : r;
      c && e.dataStartIndex + e.dataEndIndex !== 0 && e.dataEndIndex - e.dataStartIndex >= n && (c = c.slice(e.dataStartIndex, e.dataEndIndex + 1));
      var p;
      if (a.dataKey && !a.allowDuplicatedCategory) {
        var d = c === void 0 ? u : c;
        p = Tn(d, a.dataKey, i)
      } else p = c && c[n] || u[n];
      return p ? [].concat(zi(s), [Os(l, p)]) : s
    }, [])
  },
  N_ = function(e, r, n, i) {
    var o = i || {
        x: e.chartX,
        y: e.chartY
      },
      a = V5(o, n),
      u = e.orderedTooltipTicks,
      s = e.tooltipAxis,
      l = e.tooltipTicks,
      f = g1(a, u, l, s);
    if (f >= 0 && l) {
      var c = l[f] && l[f].value,
        p = jd(e, r, f, c),
        d = X5(n, u, f, o);
      return {
        activeTooltipIndex: f,
        activeLabel: c,
        activePayload: p,
        activeCoordinate: d
      }
    }
    return null
  },
  Y5 = function(e, r) {
    var n = r.axes,
      i = r.graphicalItems,
      o = r.axisType,
      a = r.axisIdKey,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = e.layout,
      c = e.children,
      p = e.stackOffset,
      d = gp(f, o);
    return n.reduce(function(y, m) {
      var v, x = m.type.defaultProps !== void 0 ? U(U({}, m.type.defaultProps), m.props) : m.props,
        w = x.type,
        S = x.dataKey,
        P = x.allowDataOverflow,
        h = x.allowDuplicatedCategory,
        g = x.scale,
        _ = x.ticks,
        C = x.includeHidden,
        k = x[a];
      if (y[k]) return y;
      var B = vl(e.data, {
          graphicalItems: i.filter(function(D) {
            var L, G = a in D.props ? D.props[a] : (L = D.type.defaultProps) === null || L === void 0 ? void 0 : L[a];
            return G === k
          }),
          dataStartIndex: s,
          dataEndIndex: l
        }),
        W = B.length,
        R, H, F;
      P_(x.domain, P, w) && (R = ws(x.domain, null, P), d && (w === "number" || g !== "auto") && (F = pi(B, S, "category")));
      var z = U_(w);
      if (!R || R.length === 0) {
        var b, O = (b = x.domain) !== null && b !== void 0 ? b : z;
        if (S) {
          if (R = pi(B, S, w), w === "category" && d) {
            var T = jh(R);
            h && T ? (H = R, R = (0, yl.default)(0, W)) : h || (R = Sp(O, R, m).reduce(function(D, L) {
              return D.indexOf(L) >= 0 ? D : [].concat(zi(D), [L])
            }, []))
          } else if (w === "category") h ? R = R.filter(function(D) {
            return D !== "" && !(0, Bi.default)(D)
          }) : R = Sp(O, R, m).reduce(function(D, L) {
            return D.indexOf(L) >= 0 || L === "" || (0, Bi.default)(L) ? D : [].concat(zi(D), [L])
          }, []);
          else if (w === "number") {
            var A = S1(B, i.filter(function(D) {
              var L, G, Z = a in D.props ? D.props[a] : (L = D.type.defaultProps) === null || L === void 0 ? void 0 : L[a],
                J = "hide" in D.props ? D.props.hide : (G = D.type.defaultProps) === null || G === void 0 ? void 0 : G.hide;
              return Z === k && (C || !J)
            }), S, o, f);
            A && (R = A)
          }
          d && (w === "number" || g !== "auto") && (F = pi(B, S, "category"))
        } else d ? R = (0, yl.default)(0, W) : u && u[k] && u[k].hasStack && w === "number" ? R = p === "expand" ? [0, 1] : Op(u[k].stackGroups, s, l) : R = vp(B, i.filter(function(D) {
          var L = a in D.props ? D.props[a] : D.type.defaultProps[a],
            G = "hide" in D.props ? D.props.hide : D.type.defaultProps.hide;
          return L === k && (C || !G)
        }), w, f, !0);
        if (w === "number") R = sl(c, R, k, o, _), O && (R = ws(O, R, P));
        else if (w === "category" && O) {
          var M = O,
            E = R.every(function(D) {
              return M.indexOf(D) >= 0
            });
          E && (R = M)
        }
      }
      return U(U({}, y), {}, ct({}, k, U(U({}, x), {}, {
        axisType: o,
        domain: R,
        categoricalDomain: F,
        duplicateDomain: H,
        originalDomain: (v = x.domain) !== null && v !== void 0 ? v : z,
        isCategorical: d,
        layout: f
      })))
    }, {})
  },
  Z5 = function(e, r) {
    var n = r.graphicalItems,
      i = r.Axis,
      o = r.axisType,
      a = r.axisIdKey,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = e.layout,
      c = e.children,
      p = vl(e.data, {
        graphicalItems: n,
        dataStartIndex: s,
        dataEndIndex: l
      }),
      d = p.length,
      y = gp(f, o),
      m = -1;
    return n.reduce(function(v, x) {
      var w = x.type.defaultProps !== void 0 ? U(U({}, x.type.defaultProps), x.props) : x.props,
        S = w[a],
        P = U_("number");
      if (!v[S]) {
        m++;
        var h;
        return y ? h = (0, yl.default)(0, d) : u && u[S] && u[S].hasStack ? (h = Op(u[S].stackGroups, s, l), h = sl(c, h, S, o)) : (h = ws(P, vp(p, n.filter(function(g) {
          var _, C, k = a in g.props ? g.props[a] : (_ = g.type.defaultProps) === null || _ === void 0 ? void 0 : _[a],
            B = "hide" in g.props ? g.props.hide : (C = g.type.defaultProps) === null || C === void 0 ? void 0 : C.hide;
          return k === S && !B
        }), "number", f), i.defaultProps.allowDataOverflow), h = sl(c, h, S, o)), U(U({}, v), {}, ct({}, S, U(U({
          axisType: o
        }, i.defaultProps), {}, {
          hide: !0,
          orientation: (0, qi.default)(G5, "".concat(o, ".").concat(m % 2), null),
          domain: h,
          originalDomain: P,
          isCategorical: y,
          layout: f
        })))
      }
      return v
    }, {})
  },
  J5 = function(e, r) {
    var n = r.axisType,
      i = n === void 0 ? "xAxis" : n,
      o = r.AxisComp,
      a = r.graphicalItems,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = e.children,
      c = "".concat(i, "Id"),
      p = Wt(f, o),
      d = {};
    return p && p.length ? d = Y5(e, {
      axes: p,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    }) : a && a.length && (d = Z5(e, {
      Axis: o,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    })), d
  },
  Q5 = function(e) {
    var r = tr(e),
      n = Oe(r, !1, !0);
    return {
      tooltipTicks: n,
      orderedTooltipTicks: (0, z_.default)(n, function(i) {
        return i.coordinate
      }),
      tooltipAxis: r,
      tooltipAxisBandSize: di(r, n)
    }
  },
  R_ = function(e) {
    var r = e.children,
      n = e.defaultShowTooltip,
      i = Zt(r, yn),
      o = 0,
      a = 0;
    return e.data && e.data.length !== 0 && (a = e.data.length - 1), i && i.props && (i.props.startIndex >= 0 && (o = i.props.startIndex), i.props.endIndex >= 0 && (a = i.props.endIndex)), {
      chartX: 0,
      chartY: 0,
      dataStartIndex: o,
      dataEndIndex: a,
      activeTooltipIndex: -1,
      isTooltipActive: !!n
    }
  },
  t4 = function(e) {
    return !e || !e.length ? !1 : e.some(function(r) {
      var n = je(r && r.type);
      return n && n.indexOf("Bar") >= 0
    })
  },
  L_ = function(e) {
    return e === "horizontal" ? {
      numericAxisName: "yAxis",
      cateAxisName: "xAxis"
    } : e === "vertical" ? {
      numericAxisName: "xAxis",
      cateAxisName: "yAxis"
    } : e === "centric" ? {
      numericAxisName: "radiusAxis",
      cateAxisName: "angleAxis"
    } : {
      numericAxisName: "angleAxis",
      cateAxisName: "radiusAxis"
    }
  },
  e4 = function(e, r) {
    var n = e.props,
      i = e.graphicalItems,
      o = e.xAxisMap,
      a = o === void 0 ? {} : o,
      u = e.yAxisMap,
      s = u === void 0 ? {} : u,
      l = n.width,
      f = n.height,
      c = n.children,
      p = n.margin || {},
      d = Zt(c, yn),
      y = Zt(c, De),
      m = Object.keys(s).reduce(function(h, g) {
        var _ = s[g],
          C = _.orientation;
        return !_.mirror && !_.hide ? U(U({}, h), {}, ct({}, C, h[C] + _.width)) : h
      }, {
        left: p.left || 0,
        right: p.right || 0
      }),
      v = Object.keys(a).reduce(function(h, g) {
        var _ = a[g],
          C = _.orientation;
        return !_.mirror && !_.hide ? U(U({}, h), {}, ct({}, C, (0, qi.default)(h, "".concat(C)) + _.height)) : h
      }, {
        top: p.top || 0,
        bottom: p.bottom || 0
      }),
      x = U(U({}, v), m),
      w = x.bottom;
    d && (x.bottom += d.props.height || yn.defaultProps.height), y && r && (x = w1(x, i, n, r));
    var S = l - x.left - x.right,
      P = f - x.top - x.bottom;
    return U(U({
      brushBottom: w
    }, x), {}, {
      width: Math.max(S, 0),
      height: Math.max(P, 0)
    })
  },
  r4 = function(e, r) {
    if (r === "xAxis") return e[r].width;
    if (r === "yAxis") return e[r].height
  },
  gl = function(e) {
    var r = e.chartName,
      n = e.GraphicalChild,
      i = e.defaultTooltipEventType,
      o = i === void 0 ? "axis" : i,
      a = e.validateTooltipEventTypes,
      u = a === void 0 ? ["axis"] : a,
      s = e.axisComponents,
      l = e.legendContent,
      f = e.formatAxisMap,
      c = e.defaultProps,
      p = function(x, w) {
        var S = w.graphicalItems,
          P = w.stackGroups,
          h = w.offset,
          g = w.updateId,
          _ = w.dataStartIndex,
          C = w.dataEndIndex,
          k = x.barSize,
          B = x.layout,
          W = x.barGap,
          R = x.barCategoryGap,
          H = x.maxBarSize,
          F = L_(B),
          z = F.numericAxisName,
          b = F.cateAxisName,
          O = t4(S),
          T = [];
        return S.forEach(function(A, M) {
          var E = vl(x.data, {
              graphicalItems: [A],
              dataStartIndex: _,
              dataEndIndex: C
            }),
            D = A.type.defaultProps !== void 0 ? U(U({}, A.type.defaultProps), A.props) : A.props,
            L = D.dataKey,
            G = D.maxBarSize,
            Z = D["".concat(z, "Id")],
            J = D["".concat(b, "Id")],
            nt = {},
            yt = s.reduce(function(ie, oe) {
              var N, rt, it = w["".concat(oe.axisType, "Map")],
                Y = D["".concat(oe.axisType, "Id")];
              it && it[Y] || oe.axisType === "zAxis" || Ue(!1);
              var at = it[Y];
              return U(U({}, ie), {}, ct(ct({}, oe.axisType, at), "".concat(oe.axisType, "Ticks"), Oe(at)))
            }, nt),
            K = yt[b],
            lt = yt["".concat(b, "Ticks")],
            tt = P && P[Z] && P[Z].hasStack && C1(A, P[Z].stackGroups),
            $ = je(A.type).indexOf("Bar") >= 0,
            Ot = di(K, lt),
            Q = [],
            gt = O && b1({
              barSize: k,
              stackGroups: P,
              totalSize: r4(yt, b)
            });
          if ($) {
            var jt, Rt, pe = (0, Bi.default)(G) ? H : G,
              V = (jt = (Rt = di(K, lt, !0)) !== null && Rt !== void 0 ? Rt : pe) !== null && jt !== void 0 ? jt : 0;
            Q = x1({
              barGap: W,
              barCategoryGap: R,
              bandSize: V !== Ot ? V : Ot,
              sizeList: gt[J],
              maxBarSize: pe
            }), V !== Ot && (Q = Q.map(function(ie) {
              return U(U({}, ie), {}, {
                position: U(U({}, ie.position), {}, {
                  offset: ie.position.offset - V / 2
                })
              })
            }))
          }
          var ne = A && A.type && A.type.getComposedData;
          ne && T.push({
            props: U(U({}, ne(U(U({}, yt), {}, {
              displayedData: E,
              props: x,
              dataKey: L,
              item: A,
              bandSize: Ot,
              barPosition: Q,
              offset: h,
              stackedData: tt,
              layout: B,
              dataStartIndex: _,
              dataEndIndex: C
            }))), {}, ct(ct(ct({
              key: A.key || "item-".concat(M)
            }, z, yt[z]), b, yt[b]), "animationId", g)),
            childIndex: $h(A, x.children),
            item: A
          })
        }), T
      },
      d = function(x, w) {
        var S = x.props,
          P = x.dataStartIndex,
          h = x.dataEndIndex,
          g = x.updateId;
        if (!Fl({
            props: S
          })) return null;
        var _ = S.children,
          C = S.layout,
          k = S.stackOffset,
          B = S.data,
          W = S.reverseStackOrder,
          R = L_(C),
          H = R.numericAxisName,
          F = R.cateAxisName,
          z = Wt(_, n),
          b = E1(B, z, "".concat(H, "Id"), "".concat(F, "Id"), k, W),
          O = s.reduce(function(D, L) {
            var G = "".concat(L.axisType, "Map");
            return U(U({}, D), {}, ct({}, G, J5(S, U(U({}, L), {}, {
              graphicalItems: z,
              stackGroups: L.axisType === H && b,
              dataStartIndex: P,
              dataEndIndex: h
            }))))
          }, {}),
          T = e4(U(U({}, O), {}, {
            props: S,
            graphicalItems: z
          }), w?.legendBBox);
        Object.keys(O).forEach(function(D) {
          O[D] = f(S, O[D], T, D.replace("Map", ""), r)
        });
        var A = O["".concat(F, "Map")],
          M = Q5(A),
          E = p(S, U(U({}, O), {}, {
            dataStartIndex: P,
            dataEndIndex: h,
            updateId: g,
            graphicalItems: z,
            stackGroups: b,
            offset: T
          }));
        return U(U({
          formattedGraphicalItems: E,
          graphicalItems: z,
          offset: T,
          stackGroups: b
        }, M), O)
      },
      y = function(v) {
        function x(w) {
          var S, P, h;
          return k5(this, x), h = N5(this, x, [w]), ct(h, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), ct(h, "accessibilityManager", new __), ct(h, "handleLegendBBoxUpdate", function(g) {
            if (g) {
              var _ = h.state,
                C = _.dataStartIndex,
                k = _.dataEndIndex,
                B = _.updateId;
              h.setState(U({
                legendBBox: g
              }, d({
                props: h.props,
                dataStartIndex: C,
                dataEndIndex: k,
                updateId: B
              }, U(U({}, h.state), {}, {
                legendBBox: g
              }))))
            }
          }), ct(h, "handleReceiveSyncEvent", function(g, _, C) {
            if (h.props.syncId === g) {
              if (C === h.eventEmitterSymbol && typeof h.props.syncMethod != "function") return;
              h.applySyncEvent(_)
            }
          }), ct(h, "handleBrushChange", function(g) {
            var _ = g.startIndex,
              C = g.endIndex;
            if (_ !== h.state.dataStartIndex || C !== h.state.dataEndIndex) {
              var k = h.state.updateId;
              h.setState(function() {
                return U({
                  dataStartIndex: _,
                  dataEndIndex: C
                }, d({
                  props: h.props,
                  dataStartIndex: _,
                  dataEndIndex: C,
                  updateId: k
                }, h.state))
              }), h.triggerSyncEvent({
                dataStartIndex: _,
                dataEndIndex: C
              })
            }
          }), ct(h, "handleMouseEnter", function(g) {
            var _ = h.getMouseInfo(g);
            if (_) {
              var C = U(U({}, _), {}, {
                isTooltipActive: !0
              });
              h.setState(C), h.triggerSyncEvent(C);
              var k = h.props.onMouseEnter;
              (0, Ye.default)(k) && k(C, g)
            }
          }), ct(h, "triggeredAfterMouseMove", function(g) {
            var _ = h.getMouseInfo(g),
              C = _ ? U(U({}, _), {}, {
                isTooltipActive: !0
              }) : {
                isTooltipActive: !1
              };
            h.setState(C), h.triggerSyncEvent(C);
            var k = h.props.onMouseMove;
            (0, Ye.default)(k) && k(C, g)
          }), ct(h, "handleItemMouseEnter", function(g) {
            h.setState(function() {
              return {
                isTooltipActive: !0,
                activeItem: g,
                activePayload: g.tooltipPayload,
                activeCoordinate: g.tooltipPosition || {
                  x: g.cx,
                  y: g.cy
                }
              }
            })
          }), ct(h, "handleItemMouseLeave", function() {
            h.setState(function() {
              return {
                isTooltipActive: !1
              }
            })
          }), ct(h, "handleMouseMove", function(g) {
            g.persist(), h.throttleTriggeredAfterMouseMove(g)
          }), ct(h, "handleMouseLeave", function(g) {
            h.throttleTriggeredAfterMouseMove.cancel();
            var _ = {
              isTooltipActive: !1
            };
            h.setState(_), h.triggerSyncEvent(_);
            var C = h.props.onMouseLeave;
            (0, Ye.default)(C) && C(_, g)
          }), ct(h, "handleOuterEvent", function(g) {
            var _ = Fh(g),
              C = (0, qi.default)(h.props, "".concat(_));
            if (_ && (0, Ye.default)(C)) {
              var k, B;
              /.*touch.*/i.test(_) ? B = h.getMouseInfo(g.changedTouches[0]) : B = h.getMouseInfo(g), C((k = B) !== null && k !== void 0 ? k : {}, g)
            }
          }), ct(h, "handleClick", function(g) {
            var _ = h.getMouseInfo(g);
            if (_) {
              var C = U(U({}, _), {}, {
                isTooltipActive: !0
              });
              h.setState(C), h.triggerSyncEvent(C);
              var k = h.props.onClick;
              (0, Ye.default)(k) && k(C, g)
            }
          }), ct(h, "handleMouseDown", function(g) {
            var _ = h.props.onMouseDown;
            if ((0, Ye.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ct(h, "handleMouseUp", function(g) {
            var _ = h.props.onMouseUp;
            if ((0, Ye.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ct(h, "handleTouchMove", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.throttleTriggeredAfterMouseMove(g.changedTouches[0])
          }), ct(h, "handleTouchStart", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.handleMouseDown(g.changedTouches[0])
          }), ct(h, "handleTouchEnd", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.handleMouseUp(g.changedTouches[0])
          }), ct(h, "handleDoubleClick", function(g) {
            var _ = h.props.onDoubleClick;
            if ((0, Ye.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ct(h, "handleContextMenu", function(g) {
            var _ = h.props.onContextMenu;
            if ((0, Ye.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ct(h, "triggerSyncEvent", function(g) {
            h.props.syncId !== void 0 && cl.emit(fl, h.props.syncId, g, h.eventEmitterSymbol)
          }), ct(h, "applySyncEvent", function(g) {
            var _ = h.props,
              C = _.layout,
              k = _.syncMethod,
              B = h.state.updateId,
              W = g.dataStartIndex,
              R = g.dataEndIndex;
            if (g.dataStartIndex !== void 0 || g.dataEndIndex !== void 0) h.setState(U({
              dataStartIndex: W,
              dataEndIndex: R
            }, d({
              props: h.props,
              dataStartIndex: W,
              dataEndIndex: R,
              updateId: B
            }, h.state)));
            else if (g.activeTooltipIndex !== void 0) {
              var H = g.chartX,
                F = g.chartY,
                z = g.activeTooltipIndex,
                b = h.state,
                O = b.offset,
                T = b.tooltipTicks;
              if (!O) return;
              if (typeof k == "function") z = k(T, g);
              else if (k === "value") {
                z = -1;
                for (var A = 0; A < T.length; A++)
                  if (T[A].value === g.activeLabel) {
                    z = A;
                    break
                  }
              }
              var M = U(U({}, O), {}, {
                  x: O.left,
                  y: O.top
                }),
                E = Math.min(H, M.x + M.width),
                D = Math.min(F, M.y + M.height),
                L = T[z] && T[z].value,
                G = jd(h.state, h.props.data, z),
                Z = T[z] ? {
                  x: C === "horizontal" ? T[z].coordinate : E,
                  y: C === "horizontal" ? D : T[z].coordinate
                } : $_;
              h.setState(U(U({}, g), {}, {
                activeLabel: L,
                activeCoordinate: Z,
                activePayload: G,
                activeTooltipIndex: z
              }))
            } else h.setState(g)
          }), ct(h, "renderCursor", function(g) {
            var _, C = h.state,
              k = C.isTooltipActive,
              B = C.activeCoordinate,
              W = C.activePayload,
              R = C.offset,
              H = C.activeTooltipIndex,
              F = C.tooltipAxisBandSize,
              z = h.getTooltipEventType(),
              b = (_ = g.props.active) !== null && _ !== void 0 ? _ : k,
              O = h.props.layout,
              T = g.key || "_recharts-cursor";
            return Be.createElement(M_, {
              key: T,
              activeCoordinate: B,
              activePayload: W,
              activeTooltipIndex: H,
              chartName: r,
              element: g,
              isActive: b,
              layout: O,
              offset: R,
              tooltipAxisBandSize: F,
              tooltipEventType: z
            })
          }), ct(h, "renderPolarAxis", function(g, _, C) {
            var k = (0, qi.default)(g, "type.axisType"),
              B = (0, qi.default)(h.state, "".concat(k, "Map")),
              W = g.type.defaultProps,
              R = W !== void 0 ? U(U({}, W), g.props) : g.props,
              H = B && B[R["".concat(k, "Id")]];
            return Xe(g, U(U({}, H), {}, {
              className: ut(k, H.className),
              key: g.key || "".concat(_, "-").concat(C),
              ticks: Oe(H, !0)
            }))
          }), ct(h, "renderPolarGrid", function(g) {
            var _ = g.props,
              C = _.radialLines,
              k = _.polarAngles,
              B = _.polarRadius,
              W = h.state,
              R = W.radiusAxisMap,
              H = W.angleAxisMap,
              F = tr(R),
              z = tr(H),
              b = z.cx,
              O = z.cy,
              T = z.innerRadius,
              A = z.outerRadius;
            return Xe(g, {
              polarAngles: Array.isArray(k) ? k : Oe(z, !0).map(function(M) {
                return M.coordinate
              }),
              polarRadius: Array.isArray(B) ? B : Oe(F, !0).map(function(M) {
                return M.coordinate
              }),
              cx: b,
              cy: O,
              innerRadius: T,
              outerRadius: A,
              key: g.key || "polar-grid",
              radialLines: C
            })
          }), ct(h, "renderLegend", function() {
            var g = h.state.formattedGraphicalItems,
              _ = h.props,
              C = _.children,
              k = _.width,
              B = _.height,
              W = h.props.margin || {},
              R = k - (W.left || 0) - (W.right || 0),
              H = bs({
                children: C,
                formattedGraphicalItems: g,
                legendWidth: R,
                legendContent: l
              });
            if (!H) return null;
            var F = H.item,
              z = I_(H, T5);
            return Xe(F, U(U({}, z), {}, {
              chartWidth: k,
              chartHeight: B,
              margin: W,
              onBBoxUpdate: h.handleLegendBBoxUpdate
            }))
          }), ct(h, "renderTooltip", function() {
            var g, _ = h.props,
              C = _.children,
              k = _.accessibilityLayer,
              B = Zt(C, de);
            if (!B) return null;
            var W = h.state,
              R = W.isTooltipActive,
              H = W.activeCoordinate,
              F = W.activePayload,
              z = W.activeLabel,
              b = W.offset,
              O = (g = B.props.active) !== null && g !== void 0 ? g : R;
            return Xe(B, {
              viewBox: U(U({}, b), {}, {
                x: b.left,
                y: b.top
              }),
              active: O,
              label: z,
              payload: O ? F : [],
              coordinate: H,
              accessibilityLayer: k
            })
          }), ct(h, "renderBrush", function(g) {
            var _ = h.props,
              C = _.margin,
              k = _.data,
              B = h.state,
              W = B.offset,
              R = B.dataStartIndex,
              H = B.dataEndIndex,
              F = B.updateId;
            return Xe(g, {
              key: g.key || "_recharts-brush",
              onChange: Go(h.handleBrushChange, g.props.onChange),
              data: k,
              x: X(g.props.x) ? g.props.x : W.left,
              y: X(g.props.y) ? g.props.y : W.top + W.height + W.brushBottom - (C.bottom || 0),
              width: X(g.props.width) ? g.props.width : W.width,
              startIndex: R,
              endIndex: H,
              updateId: "brush-".concat(F)
            })
          }), ct(h, "renderReferenceElement", function(g, _, C) {
            if (!g) return null;
            var k = h,
              B = k.clipPathId,
              W = h.state,
              R = W.xAxisMap,
              H = W.yAxisMap,
              F = W.offset,
              z = g.type.defaultProps || {},
              b = g.props,
              O = b.xAxisId,
              T = O === void 0 ? z.xAxisId : O,
              A = b.yAxisId,
              M = A === void 0 ? z.yAxisId : A;
            return Xe(g, {
              key: g.key || "".concat(_, "-").concat(C),
              xAxis: R[T],
              yAxis: H[M],
              viewBox: {
                x: F.left,
                y: F.top,
                width: F.width,
                height: F.height
              },
              clipPathId: B
            })
          }), ct(h, "renderActivePoints", function(g) {
            var _ = g.item,
              C = g.activePoint,
              k = g.basePoint,
              B = g.childIndex,
              W = g.isRange,
              R = [],
              H = _.props.key,
              F = _.item.type.defaultProps !== void 0 ? U(U({}, _.item.type.defaultProps), _.item.props) : _.item.props,
              z = F.activeDot,
              b = F.dataKey,
              O = U(U({
                index: B,
                dataKey: b,
                cx: C.x,
                cy: C.y,
                r: 4,
                fill: Fo(_.item),
                strokeWidth: 2,
                stroke: "#fff",
                payload: C.payload,
                value: C.value
              }, st(z, !1)), Fr(z));
            return R.push(x.renderActiveDot(z, O, "".concat(H, "-activePoint-").concat(B))), k ? R.push(x.renderActiveDot(z, U(U({}, O), {}, {
              cx: k.x,
              cy: k.y
            }), "".concat(H, "-basePoint-").concat(B))) : W && R.push(null), R
          }), ct(h, "renderGraphicChild", function(g, _, C) {
            var k = h.filterFormatItem(g, _, C);
            if (!k) return null;
            var B = h.getTooltipEventType(),
              W = h.state,
              R = W.isTooltipActive,
              H = W.tooltipAxis,
              F = W.activeTooltipIndex,
              z = W.activeLabel,
              b = h.props.children,
              O = Zt(b, de),
              T = k.props,
              A = T.points,
              M = T.isRange,
              E = T.baseLine,
              D = k.item.type.defaultProps !== void 0 ? U(U({}, k.item.type.defaultProps), k.item.props) : k.item.props,
              L = D.activeDot,
              G = D.hide,
              Z = D.activeBar,
              J = D.activeShape,
              nt = !!(!G && R && O && (L || Z || J)),
              yt = {};
            B !== "axis" && O && O.props.trigger === "click" ? yt = {
              onClick: Go(h.handleItemMouseEnter, g.props.onClick)
            } : B !== "axis" && (yt = {
              onMouseLeave: Go(h.handleItemMouseLeave, g.props.onMouseLeave),
              onMouseEnter: Go(h.handleItemMouseEnter, g.props.onMouseEnter)
            });
            var K = Xe(g, U(U({}, k.props), yt));

            function lt(oe) {
              return typeof H.dataKey == "function" ? H.dataKey(oe.payload) : null
            }
            if (nt)
              if (F >= 0) {
                var tt, $;
                if (H.dataKey && !H.allowDuplicatedCategory) {
                  var Ot = typeof H.dataKey == "function" ? lt : "payload.".concat(H.dataKey.toString());
                  tt = Tn(A, Ot, z), $ = M && E && Tn(E, Ot, z)
                } else tt = A?.[F], $ = M && E && E[F];
                if (J || Z) {
                  var Q = g.props.activeIndex !== void 0 ? g.props.activeIndex : F;
                  return [Xe(g, U(U(U({}, k.props), yt), {}, {
                    activeIndex: Q
                  })), null, null]
                }
                if (!(0, Bi.default)(tt)) return [K].concat(zi(h.renderActivePoints({
                  item: k,
                  activePoint: tt,
                  basePoint: $,
                  childIndex: F,
                  isRange: M
                })))
              } else {
                var gt, jt = (gt = h.getItemByXY(h.state.activeCoordinate)) !== null && gt !== void 0 ? gt : {
                    graphicalItem: K
                  },
                  Rt = jt.graphicalItem,
                  pe = Rt.item,
                  V = pe === void 0 ? g : pe,
                  ne = Rt.childIndex,
                  ie = U(U(U({}, k.props), yt), {}, {
                    activeIndex: ne
                  });
                return [Xe(V, ie), null, null]
              } return M ? [K, null, null] : [K, null]
          }), ct(h, "renderCustomized", function(g, _, C) {
            return Xe(g, U(U({
              key: "recharts-customized-".concat(C)
            }, h.props), h.state))
          }), ct(h, "renderMap", {
            CartesianGrid: {
              handler: ml,
              once: !0
            },
            ReferenceArea: {
              handler: h.renderReferenceElement
            },
            ReferenceLine: {
              handler: ml
            },
            ReferenceDot: {
              handler: h.renderReferenceElement
            },
            XAxis: {
              handler: ml
            },
            YAxis: {
              handler: ml
            },
            Brush: {
              handler: h.renderBrush,
              once: !0
            },
            Bar: {
              handler: h.renderGraphicChild
            },
            Line: {
              handler: h.renderGraphicChild
            },
            Area: {
              handler: h.renderGraphicChild
            },
            Radar: {
              handler: h.renderGraphicChild
            },
            RadialBar: {
              handler: h.renderGraphicChild
            },
            Scatter: {
              handler: h.renderGraphicChild
            },
            Pie: {
              handler: h.renderGraphicChild
            },
            Funnel: {
              handler: h.renderGraphicChild
            },
            Tooltip: {
              handler: h.renderCursor,
              once: !0
            },
            PolarGrid: {
              handler: h.renderPolarGrid,
              once: !0
            },
            PolarAngleAxis: {
              handler: h.renderPolarAxis
            },
            PolarRadiusAxis: {
              handler: h.renderPolarAxis
            },
            Customized: {
              handler: h.renderCustomized
            }
          }), h.clipPathId = "".concat((S = w.id) !== null && S !== void 0 ? S : Qe("recharts"), "-clip"), h.throttleTriggeredAfterMouseMove = (0, F_.default)(h.triggeredAfterMouseMove, (P = w.throttleDelay) !== null && P !== void 0 ? P : 1e3 / 60), h.state = {}, h
        }
        return B5(x, v), D5(x, [{
          key: "componentDidMount",
          value: function() {
            var S, P;
            this.addListener(), this.accessibilityManager.setDetails({
              container: this.container,
              offset: {
                left: (S = this.props.margin.left) !== null && S !== void 0 ? S : 0,
                top: (P = this.props.margin.top) !== null && P !== void 0 ? P : 0
              },
              coordinateList: this.state.tooltipTicks,
              mouseHandlerCallback: this.triggeredAfterMouseMove,
              layout: this.props.layout
            }), this.displayDefaultTooltip()
          }
        }, {
          key: "displayDefaultTooltip",
          value: function() {
            var S = this.props,
              P = S.children,
              h = S.data,
              g = S.height,
              _ = S.layout,
              C = Zt(P, de);
            if (C) {
              var k = C.props.defaultIndex;
              if (!(typeof k != "number" || k < 0 || k > this.state.tooltipTicks.length - 1)) {
                var B = this.state.tooltipTicks[k] && this.state.tooltipTicks[k].value,
                  W = jd(this.state, h, k, B),
                  R = this.state.tooltipTicks[k].coordinate,
                  H = (this.state.offset.top + g) / 2,
                  F = _ === "horizontal",
                  z = F ? {
                    x: R,
                    y: H
                  } : {
                    y: R,
                    x: H
                  },
                  b = this.state.formattedGraphicalItems.find(function(T) {
                    var A = T.item;
                    return A.type.name === "Scatter"
                  });
                b && (z = U(U({}, z), b.props.points[k].tooltipPosition), W = b.props.points[k].tooltipPayload);
                var O = {
                  activeTooltipIndex: k,
                  isTooltipActive: !0,
                  activeLabel: B,
                  activePayload: W,
                  activeCoordinate: z
                };
                this.setState(O), this.renderCursor(C), this.accessibilityManager.setIndex(k)
              }
            }
          }
        }, {
          key: "getSnapshotBeforeUpdate",
          value: function(S, P) {
            if (!this.props.accessibilityLayer) return null;
            if (this.state.tooltipTicks !== P.tooltipTicks && this.accessibilityManager.setDetails({
                coordinateList: this.state.tooltipTicks
              }), this.props.layout !== S.layout && this.accessibilityManager.setDetails({
                layout: this.props.layout
              }), this.props.margin !== S.margin) {
              var h, g;
              this.accessibilityManager.setDetails({
                offset: {
                  left: (h = this.props.margin.left) !== null && h !== void 0 ? h : 0,
                  top: (g = this.props.margin.top) !== null && g !== void 0 ? g : 0
                }
              })
            }
            return null
          }
        }, {
          key: "componentDidUpdate",
          value: function(S) {
            ru([Zt(S.children, de)], [Zt(this.props.children, de)]) || this.displayDefaultTooltip()
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel()
          }
        }, {
          key: "getTooltipEventType",
          value: function() {
            var S = Zt(this.props.children, de);
            if (S && typeof S.props.shared == "boolean") {
              var P = S.props.shared ? "axis" : "item";
              return u.indexOf(P) >= 0 ? P : o
            }
            return o
          }
        }, {
          key: "getMouseInfo",
          value: function(S) {
            if (!this.container) return null;
            var P = this.container,
              h = P.getBoundingClientRect(),
              g = Jx(h),
              _ = {
                chartX: Math.round(S.pageX - g.left),
                chartY: Math.round(S.pageY - g.top)
              },
              C = h.width / P.offsetWidth || 1,
              k = this.inRange(_.chartX, _.chartY, C);
            if (!k) return null;
            var B = this.state,
              W = B.xAxisMap,
              R = B.yAxisMap,
              H = this.getTooltipEventType(),
              F = N_(this.state, this.props.data, this.props.layout, k);
            if (H !== "axis" && W && R) {
              var z = tr(W).scale,
                b = tr(R).scale,
                O = z && z.invert ? z.invert(_.chartX) : null,
                T = b && b.invert ? b.invert(_.chartY) : null;
              return U(U({}, _), {}, {
                xValue: O,
                yValue: T
              }, F)
            }
            return F ? U(U({}, _), F) : null
          }
        }, {
          key: "inRange",
          value: function(S, P) {
            var h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
              g = this.props.layout,
              _ = S / h,
              C = P / h;
            if (g === "horizontal" || g === "vertical") {
              var k = this.state.offset,
                B = _ >= k.left && _ <= k.left + k.width && C >= k.top && C <= k.top + k.height;
              return B ? {
                x: _,
                y: C
              } : null
            }
            var W = this.state,
              R = W.angleAxisMap,
              H = W.radiusAxisMap;
            if (R && H) {
              var F = tr(R);
              return Ap({
                x: _,
                y: C
              }, F)
            }
            return null
          }
        }, {
          key: "parseEventsOfWrapper",
          value: function() {
            var S = this.props.children,
              P = this.getTooltipEventType(),
              h = Zt(S, de),
              g = {};
            h && P === "axis" && (h.props.trigger === "click" ? g = {
              onClick: this.handleClick
            } : g = {
              onMouseEnter: this.handleMouseEnter,
              onDoubleClick: this.handleDoubleClick,
              onMouseMove: this.handleMouseMove,
              onMouseLeave: this.handleMouseLeave,
              onTouchMove: this.handleTouchMove,
              onTouchStart: this.handleTouchStart,
              onTouchEnd: this.handleTouchEnd,
              onContextMenu: this.handleContextMenu
            });
            var _ = Fr(this.props, this.handleOuterEvent);
            return U(U({}, _), g)
          }
        }, {
          key: "addListener",
          value: function() {
            cl.on(fl, this.handleReceiveSyncEvent)
          }
        }, {
          key: "removeListener",
          value: function() {
            cl.removeListener(fl, this.handleReceiveSyncEvent)
          }
        }, {
          key: "filterFormatItem",
          value: function(S, P, h) {
            for (var g = this.state.formattedGraphicalItems, _ = 0, C = g.length; _ < C; _++) {
              var k = g[_];
              if (k.item === S || k.props.key === S.key || P === je(k.item.type) && h === k.childIndex) return k
            }
            return null
          }
        }, {
          key: "renderClipPath",
          value: function() {
            var S = this.clipPathId,
              P = this.state.offset,
              h = P.left,
              g = P.top,
              _ = P.height,
              C = P.width;
            return Be.createElement("defs", null, Be.createElement("clipPath", {
              id: S
            }, Be.createElement("rect", {
              x: h,
              y: g,
              height: _,
              width: C
            })))
          }
        }, {
          key: "getXScales",
          value: function() {
            var S = this.state.xAxisMap;
            return S ? Object.entries(S).reduce(function(P, h) {
              var g = C_(h, 2),
                _ = g[0],
                C = g[1];
              return U(U({}, P), {}, ct({}, _, C.scale))
            }, {}) : null
          }
        }, {
          key: "getYScales",
          value: function() {
            var S = this.state.yAxisMap;
            return S ? Object.entries(S).reduce(function(P, h) {
              var g = C_(h, 2),
                _ = g[0],
                C = g[1];
              return U(U({}, P), {}, ct({}, _, C.scale))
            }, {}) : null
          }
        }, {
          key: "getXScaleByAxisId",
          value: function(S) {
            var P;
            return (P = this.state.xAxisMap) === null || P === void 0 || (P = P[S]) === null || P === void 0 ? void 0 : P.scale
          }
        }, {
          key: "getYScaleByAxisId",
          value: function(S) {
            var P;
            return (P = this.state.yAxisMap) === null || P === void 0 || (P = P[S]) === null || P === void 0 ? void 0 : P.scale
          }
        }, {
          key: "getItemByXY",
          value: function(S) {
            var P = this.state,
              h = P.formattedGraphicalItems,
              g = P.activeItem;
            if (h && h.length)
              for (var _ = 0, C = h.length; _ < C; _++) {
                var k = h[_],
                  B = k.props,
                  W = k.item,
                  R = W.type.defaultProps !== void 0 ? U(U({}, W.type.defaultProps), W.props) : W.props,
                  H = je(W.type);
                if (H === "Bar") {
                  var F = (B.data || []).find(function(T) {
                    return BO(S, T)
                  });
                  if (F) return {
                    graphicalItem: k,
                    payload: F
                  }
                } else if (H === "RadialBar") {
                  var z = (B.data || []).find(function(T) {
                    return Ap(S, T)
                  });
                  if (z) return {
                    graphicalItem: k,
                    payload: z
                  }
                } else if (ha(k, g) || ya(k, g) || bi(k, g)) {
                  var b = sS({
                      graphicalItem: k,
                      activeTooltipItem: g,
                      itemData: R.data
                    }),
                    O = R.activeIndex === void 0 ? b : R.activeIndex;
                  return {
                    graphicalItem: U(U({}, k), {}, {
                      childIndex: O
                    }),
                    payload: bi(k, g) ? R.data[b] : k.props.data[b]
                  }
                }
              }
            return null
          }
        }, {
          key: "render",
          value: function() {
            var S = this;
            if (!Fl(this)) return null;
            var P = this.props,
              h = P.children,
              g = P.className,
              _ = P.width,
              C = P.height,
              k = P.style,
              B = P.compact,
              W = P.title,
              R = P.desc,
              H = I_(P, E5),
              F = st(H, !1);
            if (B) return Be.createElement(ad, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, Be.createElement(Zi, Li({}, F, {
              width: _,
              height: C,
              title: W,
              desc: R
            }), this.renderClipPath(), $l(h, this.renderMap)));
            if (this.props.accessibilityLayer) {
              var z, b;
              F.tabIndex = (z = this.props.tabIndex) !== null && z !== void 0 ? z : 0, F.role = (b = this.props.role) !== null && b !== void 0 ? b : "application", F.onKeyDown = function(T) {
                S.accessibilityManager.keyboardEvent(T)
              }, F.onFocus = function() {
                S.accessibilityManager.focus()
              }
            }
            var O = this.parseEventsOfWrapper();
            return Be.createElement(ad, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, Be.createElement("div", Li({
              className: ut("recharts-wrapper", g),
              style: U({
                position: "relative",
                cursor: "default",
                width: _,
                height: C
              }, k)
            }, O, {
              ref: function(A) {
                S.container = A
              }
            }), Be.createElement(Zi, Li({}, F, {
              width: _,
              height: C,
              title: W,
              desc: R,
              style: K5
            }), this.renderClipPath(), $l(h, this.renderMap)), this.renderLegend(), this.renderTooltip()))
          }
        }])
      }($5);
    ct(y, "displayName", r), ct(y, "defaultProps", U({
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
    }, c)), ct(y, "getDerivedStateFromProps", function(v, x) {
      var w = v.dataKey,
        S = v.data,
        P = v.children,
        h = v.width,
        g = v.height,
        _ = v.layout,
        C = v.stackOffset,
        k = v.margin,
        B = x.dataStartIndex,
        W = x.dataEndIndex;
      if (x.updateId === void 0) {
        var R = R_(v);
        return U(U(U({}, R), {}, {
          updateId: 0
        }, d(U(U({
          props: v
        }, R), {}, {
          updateId: 0
        }), x)), {}, {
          prevDataKey: w,
          prevData: S,
          prevWidth: h,
          prevHeight: g,
          prevLayout: _,
          prevStackOffset: C,
          prevMargin: k,
          prevChildren: P
        })
      }
      if (w !== x.prevDataKey || S !== x.prevData || h !== x.prevWidth || g !== x.prevHeight || _ !== x.prevLayout || C !== x.prevStackOffset || !dr(k, x.prevMargin)) {
        var H = R_(v),
          F = {
            chartX: x.chartX,
            chartY: x.chartY,
            isTooltipActive: x.isTooltipActive
          },
          z = U(U({}, N_(x, S, _)), {}, {
            updateId: x.updateId + 1
          }),
          b = U(U(U({}, H), F), z);
        return U(U(U({}, b), d(U({
          props: v
        }, b), x)), {}, {
          prevDataKey: w,
          prevData: S,
          prevWidth: h,
          prevHeight: g,
          prevLayout: _,
          prevStackOffset: C,
          prevMargin: k,
          prevChildren: P
        })
      }
      if (!ru(P, x.prevChildren)) {
        var O, T, A, M, E = Zt(P, yn),
          D = E && (O = (T = E.props) === null || T === void 0 ? void 0 : T.startIndex) !== null && O !== void 0 ? O : B,
          L = E && (A = (M = E.props) === null || M === void 0 ? void 0 : M.endIndex) !== null && A !== void 0 ? A : W,
          G = D !== B || L !== W,
          Z = !(0, Bi.default)(S),
          J = Z && !G ? x.updateId : x.updateId + 1;
        return U(U({
          updateId: J
        }, d(U(U({
          props: v
        }, x), {}, {
          updateId: J,
          dataStartIndex: D,
          dataEndIndex: L
        }), x)), {}, {
          prevChildren: P,
          dataStartIndex: D,
          dataEndIndex: L
        })
      }
      return null
    }), ct(y, "renderActiveDot", function(v, x, w) {
      var S;
      return U5(v) ? S = Xe(v, x) : (0, Ye.default)(v) ? S = v(x) : S = Be.createElement(gi, x), Be.createElement(bt, {
        className: "recharts-active-dot",
        key: w
      }, S)
    });
    var m = H5(function(x, w) {
      return Be.createElement(y, Li({}, x, {
        ref: w
      }))
    });
    return m.displayName = y.displayName, m
  };
var Md = gl({
  chartName: "LineChart",
  GraphicalChild: Lr,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: cr
  }, {
    axisType: "yAxis",
    AxisComp: fr
  }],
  formatAxisMap: Hs
});
var Cd = gl({
  chartName: "BarChart",
  GraphicalChild: Ge,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: cr
  }, {
    axisType: "yAxis",
    AxisComp: fr
  }],
  formatAxisMap: Hs
});
import "./react-shim-eraudit.js";
import {
  jsx as bl,
  jsxs as Id
} from "./react-jsx-shim-eraudit.js";

function kd({
  data: t,
  title: e = "AI Intelligence"
}) {
  if (!t) return null;
  let r = Array.isArray(t?.sections) ? t.sections : n4(t);
  return r.length ? Id("div", {
    className: "rounded-lg my-3",
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      boxShadow: "var(--md-shadow-sm)",
      padding: "1rem 1.25rem"
    },
    children: [Id("h3", {
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
      children: [bl("span", {
        "aria-hidden": "true",
        children: "\u2728"
      }), e]
    }), bl("div", {
      className: "space-y-2",
      children: r.map((n, i) => Id("div", {
        children: [n.title && bl("div", {
          style: {
            fontSize: "var(--fs-xs)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--md-text-tertiary)",
            marginBottom: 4
          },
          children: n.title
        }), bl("p", {
          style: {
            margin: 0,
            fontSize: "var(--fs-sm)",
            color: "var(--md-text-primary)",
            lineHeight: 1.6,
            whiteSpace: "pre-line"
          },
          children: n.body || n.text || ""
        })]
      }, i))
    })]
  }) : null
}

function n4(t) {
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
  Fragment as Ra,
  jsx as j,
  jsxs as q
} from "./react-jsx-shim-eraudit.js";

function pt(t, e = 0) {
  return t == null || t === "" || isNaN(t) ? "\u2014" : Number(t).toLocaleString("th-TH", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  })
}

function Sr(t) {
  return t == null || isNaN(t) ? "\u2014" : `${Number(t).toFixed(1)}%`
}

function H_(t, e) {
  return e > 0 ? Math.round((t - e) / e * 100) : t > 0 ? 100 : 0
}
async function Br(t, e) {
  let r = await fetch(t, e),
    n = r.headers.get("content-type") || "";
  if (!r.ok) {
    if (n.includes("json")) {
      let i = await r.json();
      throw new Error(i.error || `HTTP ${r.status}`)
    }
    throw new Error(`HTTP ${r.status}`)
  }
  if (!n.includes("json")) throw new Error("\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E44\u0E21\u0E48\u0E15\u0E2D\u0E1A\u0E01\u0E25\u0E31\u0E1A \u2014 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Backend \u0E17\u0E33\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48");
  return r.json()
}
var Na = ["#94a3b8", "#7c3aed", "#0284c7"],
  G_ = ["#0284c7", "#7c3aed", "#db2777", "#ea580c", "#059669", "#d97706", "#4f46e5", "#0891b2", "#be123c", "#65a30d"];

function o4() {
  let t = new Date,
    e = t.getMonth() + 1,
    r = t.getFullYear();
  return `${e>=10?r:r-1}-10-01`
}

function K_() {
  let t = new Date,
    e = t.getFullYear(),
    r = String(t.getMonth() + 1).padStart(2, "0");
  return `${e}-${r}-01`
}
var qr = () => new Date().toISOString().slice(0, 10),
  Fi = ["#10b981", "#84cc16", "#eab308", "#f97316", "#dc2626"],
  xl = ["aging_0_30", "aging_31_60", "aging_61_90", "aging_91_180", "aging_180_plus"],
  wl = ["0-30 \u0E27\u0E31\u0E19", "31-60 \u0E27\u0E31\u0E19", "61-90 \u0E27\u0E31\u0E19", "91-180 \u0E27\u0E31\u0E19", ">180 \u0E27\u0E31\u0E19"],
  $i = {
    drug: "#7c3aed",
    lab: "#0284c7",
    xray: "#059669"
  };

function a4() {
  let [t, e] = Ut(null), [r, n] = Ut(null), [i, o] = Ut(null), [a, u] = Ut(null), [s, l] = Ut(null), [f, c] = Ut(null), [p, d] = Ut(!0), [y, m] = Ut(null), [v, x] = Ut("overview"), [w, S] = Ut(null), [P, h] = Ut(null), g = i4(null), [_, C] = Ut(K_()), [k, B] = Ut(qr()), [W, R] = Ut(null), [H, F] = Ut(null), [z, b] = Ut("outstanding"), [O, T] = Ut(!1), [A, M] = Ut("groups"), [E, D] = Ut(new Set), L = qe(N => {
    D(rt => {
      let it = new Set(rt);
      return it.has(N) ? it.delete(N) : it.add(N), it
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
  }, Z = N => G[N] || "#94a3b8", J = qe(async () => {
    d(!0), m(null);
    try {
      let [N, rt] = await Promise.all([Br(`/api/customer-insight/screening-summary?_t=${Date.now()}`, {
        credentials: "include"
      }), Br(`/api/customer-insight/monthly-trend?_t=${Date.now()}`, {
        credentials: "include"
      })]);
      e(N), n(rt), Br("/api/ai/customer/segmentation", {
        credentials: "include"
      }).then(h).catch(() => {})
    } catch (N) {
      m(N.message)
    }
    d(!1)
  }, []), nt = qe(async N => {
    try {
      let rt = N ? `&pttype=${N}` : "",
        it = await Br(`/api/customer-insight/top-diagnosis?${rt}&_t=${Date.now()}`, {
          credentials: "include"
        });
      o(it)
    } catch (rt) {
      m(rt.message)
    }
  }, []), yt = qe(async () => {
    try {
      let N = await Br(`/api/customer-insight/patient-insight?_t=${Date.now()}`, {
        credentials: "include"
      });
      u(N)
    } catch (N) {
      m(N.message)
    }
  }, []), K = qe(async () => {
    try {
      let N = await Br(`/api/customer-insight/aging?_t=${Date.now()}`, {
        credentials: "include"
      });
      l(N)
    } catch (N) {
      m(N.message)
    }
  }, []), lt = qe(async () => {
    d(!0), m(null);
    try {
      let N = await Br(`/api/customer-insight/screening-custom?from=${_}&to=${k}&_t=${Date.now()}`, {
        credentials: "include"
      });
      c(N)
    } catch (N) {
      m(N.message)
    }
    d(!1)
  }, [_, k]), tt = qe(async N => {
    T(!0);
    try {
      let rt = await Br(`/api/customer-insight/payer-patients?pttype=${N}&sort_by=${z}&_t=${Date.now()}`, {
        credentials: "include"
      });
      F(rt)
    } catch (rt) {
      F({
        patients: [],
        error: rt.message
      })
    }
    T(!1)
  }, [z]), $ = qe(N => {
    R(N), F(null), tt(N.pttype_code)
  }, [tt]), Ot = qe(() => {
    R(null), F(null)
  }, []);
  Da(() => {
    J()
  }, [J]), Da(() => {
    v === "diagnosis" && nt(w)
  }, [v, w, nt]), Da(() => {
    v === "patient-insight" && !a && yt()
  }, [v, a, yt]), Da(() => {
    v === "aging" && !s && K()
  }, [v, s, K]), Da(() => {
    W && tt(W.pttype_code)
  }, [z, W, tt]);
  let Q = t?.fiscal_years || [],
    gt = Q.map(N => N.be),
    jt = qe(() => {
      if (!g.current) return;
      let N = window.open("", "_blank");
      N.document.write(`<!DOCTYPE html><html><head><title>Customer Insight \u2014 3 \u0E1B\u0E35\u0E07\u0E1A</title>
      <style>body{font-family:Sarabun,sans-serif;padding:20px}table{border-collapse:collapse;width:100%;font-size:10px}
      th,td{border:1px solid #ccc;padding:3px 6px;text-align:right}th{background:#f0f4f8;font-weight:800}
      td:first-child,th:first-child{text-align:left}</style></head><body>`), N.document.write(g.current.outerHTML), N.document.write("</body></html>"), N.document.close(), N.print()
    }, []),
    Rt = qe(() => {
      if (!t?.payers || Q.length < 3) return;
      let N = "\uFEFF",
        rt = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let mt of Q) rt.push(`${mt.be} OPD`, `${mt.be} IPD`, `${mt.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${mt.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${mt.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${mt.be} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      rt.push("Growth %");
      let it = t.payers.map(mt => {
          let ft = [mt.pttype_code, mt.pttype_name];
          for (let ot of Q) {
            let dt = mt.fys[ot.be];
            ft.push(dt.opd_visits, dt.ipd_admissions, dt.total_income, dt.total_paid, dt.total_outstanding, dt.collection_rate)
          }
          return ft.push(mt.income_growth), ft
        }),
        Y = N + [rt, ...it].map(mt => mt.join(",")).join(`
`),
        at = new Blob([Y], {
          type: "text/csv;charset=utf-8"
        }),
        Tt = URL.createObjectURL(at),
        ht = document.createElement("a");
      ht.href = Tt, ht.download = "BCH360_CustomerInsight_3FY.csv", ht.click(), URL.revokeObjectURL(Tt)
    }, [t, Q]),
    pe = qe(async () => {
      if (!t?.payers || Q.length < 3) return;
      let N = await import("./xlsx-BuHXVOW6.js"),
        rt = N.utils.book_new(),
        it = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let vt of Q) it.push(`${vt.be} \u0E04\u0E23\u0E31\u0E49\u0E07`, `${vt.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${vt.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${vt.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${vt.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      it.push("Growth %");
      let Y = t.payers.map(vt => {
          let Ct = [vt.pttype_code, vt.pttype_name];
          for (let St of Q) {
            let Ht = vt.fys[St.be];
            Ct.push(Ht.opd_visits + Ht.ipd_admissions, Ht.total_income, Ht.total_paid, Ht.total_outstanding, Ht.collection_rate)
          }
          return Ct.push(vt.income_growth), Ct
        }),
        at = N.utils.aoa_to_sheet([it, ...Y]);
      at["!cols"] = it.map(vt => ({
        wch: Math.min(Math.max(vt.length + 4, 12), 28)
      })), N.utils.book_append_sheet(rt, at, "\u0E2A\u0E23\u0E38\u0E1B\u0E2A\u0E34\u0E17\u0E18\u0E34 3 \u0E1B\u0E35\u0E07\u0E1A");
      let Tt = Q[2].be,
        ht = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 Xray", "% \u0E22\u0E32", "% Lab", "% Xray"],
        mt = t.payers.map(vt => {
          let Ct = vt.fys[Tt],
            St = Ct.total_income || 0;
          return [vt.pttype_code, vt.pttype_name, St, Ct.opd_drug || 0, Ct.opd_lab || 0, Ct.opd_xray || 0, St > 0 ? Math.round(Ct.opd_drug / St * 1e3) / 10 : 0, St > 0 ? Math.round(Ct.opd_lab / St * 1e3) / 10 : 0, St > 0 ? Math.round(Ct.opd_xray / St * 1e3) / 10 : 0]
        }),
        ft = N.utils.aoa_to_sheet([ht, ...mt]);
      if (ft["!cols"] = ht.map(vt => ({
          wch: Math.min(Math.max(vt.length + 4, 12), 28)
        })), N.utils.book_append_sheet(rt, ft, `Service Mix ${Tt}`), r?.comparison) {
        let vt = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...Q.map(Ht => `${Ht.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`), ...Q.map(Ht => `${Ht.be} \u0E04\u0E23\u0E31\u0E49\u0E07`)],
          Ct = r.comparison.map(Ht => {
            let _e = [Ht.month];
            for (let Ui of Q) _e.push(Ht[`fy${Ui.be}`]?.income || 0);
            for (let Ui of Q) _e.push(Ht[`fy${Ui.be}`]?.visits || 0);
            return _e
          }),
          St = N.utils.aoa_to_sheet([vt, ...Ct]);
        St["!cols"] = vt.map(Ht => ({
          wch: 14
        })), N.utils.book_append_sheet(rt, St, "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19")
      }
      if (s?.payers) {
        let vt = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", ...wl, "\u0E23\u0E27\u0E21\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"],
          Ct = s.payers.map(_e => [_e.pttype_code, _e.pttype_name, ...xl.map(Ui => _e[Ui] || 0), _e.total_outstanding || 0]),
          St = s.grand_total || {};
        Ct.push(["", "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", ...xl.map(_e => St[_e] || 0), St.total_outstanding || 0]);
        let Ht = N.utils.aoa_to_sheet([vt, ...Ct]);
        Ht["!cols"] = vt.map(_e => ({
          wch: Math.min(Math.max(_e.length + 4, 14), 24)
        })), N.utils.book_append_sheet(rt, Ht, "Aging \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30")
      }
      let ot = [
          ["BCH 360\xB0 Intelligence \u2014 Customer Insight Report"],
          [],
          ["\u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", `${gt.join(" \xB7 ")}`],
          ["\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", t.data_source],
          ["\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E40\u0E21\u0E37\u0E48\u0E2D", new Date().toLocaleString("th-TH")],
          ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34", `${t.payers.length}`],
          ["\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E35\u0E48 Flag", `${t.flagged_count}`],
          [],
          ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team \xB7 BOSSART"]
        ],
        dt = N.utils.aoa_to_sheet(ot);
      dt["!cols"] = [{
        wch: 22
      }, {
        wch: 60
      }], N.utils.book_append_sheet(rt, dt, "Meta"), N.writeFile(rt, "BCH360_CustomerInsight_3FY.xlsx")
    }, [t, Q, gt, r, s]),
    V = {
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
      badge: (N, rt) => ({
        fontSize: "9px",
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: "99px",
        background: N,
        color: rt
      })
    },
    ne = ({
      label: N,
      icon: rt,
      values: it,
      unit: Y = "",
      accent: at = "#0284c7",
      reverse: Tt = !1
    }) => {
      let ht = it[2],
        mt = it[1],
        ft = H_(ht, mt),
        ot = Tt ? ft <= 0 ? "#059669" : "#dc2626" : ft >= 0 ? "#059669" : "#dc2626";
      return q("div", {
        className: "rounded-2xl p-4",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          flex: "1 1 200px",
          minWidth: "190px"
        },
        children: [q("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "6px"
          },
          children: [j("span", {
            style: {
              fontSize: "18px"
            },
            children: rt
          }), j("span", {
            style: {
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: N
          })]
        }), q("div", {
          style: {
            fontSize: "20px",
            fontWeight: 900,
            color: at
          },
          children: [pt(ht), " ", j("span", {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)"
            },
            children: Y
          })]
        }), j("div", {
          style: {
            display: "flex",
            gap: "8px",
            marginTop: "6px",
            fontSize: "10px",
            fontWeight: 700
          },
          children: gt.map((dt, vt) => q("span", {
            style: {
              color: vt === 2 ? at : "var(--md-text-tertiary)"
            },
            children: [dt, ": ", pt(it[vt])]
          }, dt))
        }), mt > 0 && q("div", {
          style: {
            marginTop: "4px",
            fontSize: "10px",
            fontWeight: 800,
            color: ot
          },
          children: [ft >= 0 ? "+" : "", ft, "% vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"]
        })]
      })
    },
    ie = ({
      active: N,
      payload: rt,
      label: it
    }) => !N || !rt?.length ? null : q("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderRadius: "10px",
        padding: "10px 14px",
        fontSize: "11px",
        boxShadow: "0 4px 20px rgba(0,0,0,.08)"
      },
      children: [j("div", {
        style: {
          fontWeight: 800,
          marginBottom: "4px"
        },
        children: it
      }), rt.map((Y, at) => q("div", {
        style: {
          display: "flex",
          gap: "6px",
          alignItems: "center"
        },
        children: [j("span", {
          style: {
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: Y.color
          }
        }), q("span", {
          style: {
            fontWeight: 600,
            color: "var(--md-text-secondary)"
          },
          children: [Y.name, ":"]
        }), j("span", {
          style: {
            fontWeight: 800
          },
          children: pt(Y.value)
        })]
      }, at))]
    }),
    oe = ({
      value: N
    }) => {
      if (N == null || isNaN(N)) return null;
      let rt = N >= 0 ? "#059669" : "#dc2626";
      return q("span", {
        style: {
          fontSize: "9px",
          fontWeight: 800,
          color: rt
        },
        children: [N >= 0 ? "+" : "", N, "%"]
      })
    };
  return q("div", {
    className: "space-y-5 animate-fade-in pb-10",
    children: [q("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [j("div", {
        style: {
          width: "4px",
          height: "24px",
          background: "linear-gradient(180deg, #7c3aed, #0284c7)",
          borderRadius: "99px"
        }
      }), j("h2", {
        style: {
          margin: 0,
          fontSize: "18px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: "Customer Insight"
      }), j("span", {
        style: V.badge("rgba(124,58,237,.1)", "#7c3aed"),
        children: "\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \xB7 \u0E2B\u0E25\u0E31\u0E01\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2F"
      }), Q.length === 3 && q("span", {
        style: V.badge("rgba(2,132,199,.1)", "#0284c7"),
        children: ["3 \u0E1B\u0E35\u0E07\u0E1A: ", gt[0], " \xB7 ", gt[1], " \xB7 ", gt[2]]
      })]
    }), q("div", {
      className: "rounded-2xl p-4",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap"
      },
      children: [j("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-secondary)"
        },
        children: "\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07"
      }), [{
        id: "overview",
        label: "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 3 \u0E1B\u0E35\u0E07\u0E1A"
      }, {
        id: "patient-insight",
        label: "\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"
      }, {
        id: "payer-detail",
        label: "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34"
      }, {
        id: "aging",
        label: "\u23F1\uFE0F \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30 (Aging)"
      }, {
        id: "diagnosis",
        label: "Top \u0E42\u0E23\u0E04 / \u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23"
      }].map(N => j("button", {
        onClick: () => x(N.id),
        style: {
          padding: "5px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          cursor: "pointer",
          border: v === N.id ? "1.5px solid #7c3aed" : "1px solid var(--md-border)",
          background: v === N.id ? "rgba(124,58,237,.08)" : "var(--md-surface)",
          color: v === N.id ? "#7c3aed" : "var(--md-text-secondary)"
        },
        children: N.label
      }, N.id)), j("div", {
        style: {
          width: "1px",
          height: "24px",
          background: "var(--md-border)"
        }
      }), j("button", {
        onClick: J,
        disabled: p,
        style: {
          padding: "6px 16px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
          background: p ? "#94a3b8" : "linear-gradient(135deg, #7c3aed, #0284c7)",
          color: "#fff"
        },
        children: p ? "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14..." : "\u0E42\u0E2B\u0E25\u0E14 3 \u0E1B\u0E35\u0E07\u0E1A"
      }), j("button", {
        onClick: jt,
        disabled: !t,
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          cursor: "pointer",
          background: "var(--md-surface)",
          color: "var(--md-text-secondary)"
        },
        children: "Print"
      }), j("button", {
        onClick: Rt,
        disabled: !t,
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          cursor: "pointer",
          background: "var(--md-surface)",
          color: "var(--md-text-secondary)"
        },
        children: "CSV"
      }), j("button", {
        onClick: pe,
        disabled: !t,
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid #059669",
          cursor: "pointer",
          background: "rgba(5,150,105,.08)",
          color: "#059669"
        },
        children: "\u{1F4CA} Excel"
      })]
    }), q("div", {
      className: "rounded-2xl p-3",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [j("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-secondary)"
        },
        children: "\u{1F4C5} \u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32"
      }), j("input", {
        type: "date",
        value: _,
        max: k,
        onChange: N => C(N.target.value),
        style: {
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid var(--md-border)",
          fontSize: "13px",
          fontWeight: 700,
          background: "var(--md-surface)",
          color: "var(--md-text-primary)"
        }
      }), j("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)"
        },
        children: "\u0E16\u0E36\u0E07"
      }), j("input", {
        type: "date",
        value: k,
        min: _,
        max: qr(),
        onChange: N => B(N.target.value),
        style: {
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid var(--md-border)",
          fontSize: "13px",
          fontWeight: 700,
          background: "var(--md-surface)",
          color: "var(--md-text-primary)"
        }
      }), j("button", {
        onClick: lt,
        disabled: p,
        style: {
          padding: "6px 18px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
          background: p ? "#94a3b8" : "linear-gradient(135deg, #d97706, #ea580c)",
          color: "#fff"
        },
        children: "\u{1F504} \u0E42\u0E2B\u0E25\u0E14\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49"
      }), j("div", {
        style: {
          width: "1px",
          height: "24px",
          background: "var(--md-border)"
        }
      }), j("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          color: "var(--md-text-tertiary)"
        },
        children: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E25\u0E31\u0E14"
      }), [{
        id: "today",
        label: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
        from: qr(),
        to: qr()
      }, {
        id: "mtd",
        label: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
        from: K_(),
        to: qr()
      }, {
        id: "last30",
        label: "30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
        from: (() => {
          let N = new Date;
          return N.setDate(N.getDate() - 30), N.toISOString().slice(0, 10)
        })(),
        to: qr()
      }, {
        id: "last90",
        label: "90 \u0E27\u0E31\u0E19",
        from: (() => {
          let N = new Date;
          return N.setDate(N.getDate() - 90), N.toISOString().slice(0, 10)
        })(),
        to: qr()
      }, {
        id: "ytd",
        label: "\u0E1B\u0E35\u0E07\u0E1A\u0E19\u0E35\u0E49",
        from: o4(),
        to: qr()
      }].map(N => j("button", {
        onClick: () => {
          C(N.from), B(N.to)
        },
        style: {
          padding: "4px 10px",
          borderRadius: "6px",
          fontSize: "11px",
          fontWeight: 700,
          cursor: "pointer",
          border: _ === N.from && k === N.to ? "1.5px solid #d97706" : "1px solid var(--md-border)",
          background: _ === N.from && k === N.to ? "rgba(217,119,6,.08)" : "var(--md-surface)",
          color: _ === N.from && k === N.to ? "#d97706" : "var(--md-text-secondary)"
        },
        children: N.label
      }, N.id)), f && q("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          color: "#d97706",
          marginLeft: "auto"
        },
        children: ["\u2713 ", f.window?.from, " \u2192 ", f.window?.to, " \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ", pt(f.grand_total?.total_income), " \u0E1A. \xB7 \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A ", Sr(f.grand_total?.collection_rate)]
      })]
    }), y && j("div", {
      className: "rounded-xl p-3",
      style: {
        background: "rgba(220,38,38,.08)",
        border: "1px solid rgba(220,38,38,.2)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: y
    }), p && j("div", {
      style: {
        textAlign: "center",
        padding: "60px 0",
        color: "var(--md-text-tertiary)",
        fontWeight: 700
      },
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Customer Insight (3 \u0E1B\u0E35\u0E07\u0E1A)..."
    }), !p && t && Q.length === 3 && v === "overview" && (() => {
      let N = t.grand_totals,
        rt = Y => Q.map(at => N[at.be]?.[Y] || 0),
        it = (r?.comparison || []).map(Y => {
          let at = {
            month: Y.month
          };
          for (let Tt of Q) at[`fy${Tt.be}`] = Y[`fy${Tt.be}`]?.income || 0;
          return at
        }).filter(Y => Q.some(at => Y[`fy${at.be}`] > 0));
      return q(Ra, {
        children: [q("div", {
          style: {
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          },
          children: [j(ne, {
            icon: "\u{1F465}",
            label: "OPD Visits",
            values: rt("opd_visits"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#0284c7"
          }), j(ne, {
            icon: "\u{1F3E5}",
            label: "IPD Admissions",
            values: rt("ipd_admissions"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#7c3aed"
          }), j(ne, {
            icon: "\u{1F4B0}",
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
            values: rt("total_income"),
            unit: "\u0E1A\u0E32\u0E17",
            accent: "#059669"
          }), j(ne, {
            icon: "\u{1F4CA}",
            label: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A",
            values: Q.map(Y => N[Y.be]?.collection_rate || 0),
            unit: "%",
            accent: "#0284c7"
          }), j(ne, {
            icon: "\u{1F6A9}",
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21",
            values: [0, 0, t.flagged_count],
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            accent: "#dc2626"
          })]
        }), it.length > 0 && q("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [j("div", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              marginBottom: "12px"
            },
            children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13"
          }), j(Eu, {
            width: "100%",
            height: 300,
            children: q(Md, {
              data: it,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [j(Ta, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), j(cr, {
                dataKey: "month",
                tick: {
                  fontSize: 11,
                  fontWeight: 700
                }
              }), j(fr, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: Y => Y >= 1e6 ? `${(Y/1e6).toFixed(1)}M` : Y >= 1e3 ? `${(Y/1e3).toFixed(0)}K` : Y
              }), j(de, {
                content: j(ie, {})
              }), j(De, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), Q.map((Y, at) => j(Lr, {
                type: "monotone",
                dataKey: `fy${Y.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${Y.be}`,
                stroke: Na[at],
                strokeWidth: at === 2 ? 3 : 1.5,
                strokeDasharray: at === 0 ? "5 5" : void 0,
                dot: {
                  r: at === 2 ? 4 : 2
                }
              }, Y.be))]
            })
          })]
        }), q("div", {
          className: "rounded-2xl",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            overflow: "hidden"
          },
          ref: g,
          children: [q("div", {
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
            children: [q("div", {
              children: [q("div", {
                style: {
                  fontSize: "15px",
                  fontWeight: 900,
                  color: "var(--md-text-primary)"
                },
                children: ["\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E41\u0E22\u0E01\u0E15\u0E32\u0E21", A === "groups" ? "\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C (9 \u0E2B\u0E21\u0E27\u0E14)" : "\u0E2A\u0E34\u0E17\u0E18\u0E34", " \u2014 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 (", gt.join(" \xB7 "), ")"]
              }), j("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: "\u0E2B\u0E25\u0E31\u0E01\u0E40\u0E01\u0E13\u0E11\u0E4C \u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23 \u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02 \u0E01\u0E32\u0E23\u0E02\u0E2D\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2F \xB7 \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E35\u0E48\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A <80% (\u0E1B\u0E35\u0E07\u0E1A\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14) \u0E08\u0E30\u0E16\u0E39\u0E01 Flag"
              })]
            }), q("div", {
              style: {
                display: "flex",
                gap: "6px"
              },
              children: [j("button", {
                onClick: () => M("groups"),
                style: {
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: A === "groups" ? "1.5px solid #7c3aed" : "1px solid var(--md-border)",
                  background: A === "groups" ? "rgba(124,58,237,.08)" : "var(--md-surface)",
                  color: A === "groups" ? "#7c3aed" : "var(--md-text-secondary)"
                },
                children: "\u{1F4E6} 9 \u0E2B\u0E21\u0E27\u0E14"
              }), j("button", {
                onClick: () => M("pttype"),
                style: {
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: A === "pttype" ? "1.5px solid #7c3aed" : "1px solid var(--md-border)",
                  background: A === "pttype" ? "rgba(124,58,237,.08)" : "var(--md-surface)",
                  color: A === "pttype" ? "#7c3aed" : "var(--md-text-secondary)"
                },
                children: "\u{1F4CB} pttype \u0E23\u0E32\u0E22\u0E15\u0E31\u0E27"
              })]
            })]
          }), j("div", {
            style: {
              overflowX: "auto"
            },
            children: q("table", {
              style: {
                width: "100%",
                borderCollapse: "collapse"
              },
              children: [q("thead", {
                children: [q("tr", {
                  style: {
                    background: "var(--md-surface-2, rgba(0,0,0,.02))"
                  },
                  children: [j("th", {
                    rowSpan: 2,
                    style: {
                      ...V.th,
                      textAlign: "left",
                      paddingLeft: "14px",
                      borderRight: "2px solid var(--md-border)",
                      verticalAlign: "bottom"
                    },
                    children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                  }), Q.map((Y, at) => q("th", {
                    colSpan: 4,
                    style: {
                      ...V.th,
                      textAlign: "center",
                      borderRight: "2px solid var(--md-border)",
                      background: `${Na[at]}10`,
                      color: Na[at],
                      fontSize: "11px"
                    },
                    children: ["\u0E1B\u0E35\u0E07\u0E1A ", Y.be]
                  }, Y.be)), j("th", {
                    rowSpan: 2,
                    style: {
                      ...V.th,
                      textAlign: "center",
                      verticalAlign: "bottom"
                    },
                    children: "Growth"
                  }), j("th", {
                    rowSpan: 2,
                    style: {
                      ...V.th,
                      textAlign: "center",
                      verticalAlign: "bottom"
                    },
                    children: "\u0E2A\u0E16\u0E32\u0E19\u0E30"
                  })]
                }), j("tr", {
                  style: {
                    background: "var(--md-surface-2, rgba(0,0,0,.02))"
                  },
                  children: Q.map(Y => q(wn.Fragment, {
                    children: [j("th", {
                      style: {
                        ...V.th,
                        fontSize: "9px"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), j("th", {
                      style: {
                        ...V.th,
                        fontSize: "9px"
                      },
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), j("th", {
                      style: {
                        ...V.th,
                        fontSize: "9px"
                      },
                      children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                    }), j("th", {
                      style: {
                        ...V.th,
                        fontSize: "9px",
                        borderRight: "2px solid var(--md-border)"
                      },
                      children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                    })]
                  }, Y.be))
                })]
              }), j("tbody", {
                children: A === "groups" ? (t.groups || []).map((Y, at) => {
                  let Tt = Y.flag_low_collection || Y.flag_high_outstanding,
                    ht = Z(Y.group_name),
                    mt = E.has(Y.group_name),
                    ft = t.payers.filter(ot => ot.group_name === Y.group_name);
                  return q(wn.Fragment, {
                    children: [q("tr", {
                      style: {
                        background: `${ht}10`,
                        borderTop: `2px solid ${ht}40`,
                        cursor: "pointer"
                      },
                      onClick: () => L(Y.group_name),
                      children: [j("td", {
                        style: {
                          ...V.tdName,
                          paddingLeft: "14px",
                          borderRight: "2px solid var(--md-border)"
                        },
                        children: q("span", {
                          style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px"
                          },
                          children: [j("span", {
                            style: {
                              width: 10,
                              height: 10,
                              borderRadius: 2,
                              background: ht,
                              display: "inline-block"
                            }
                          }), j("span", {
                            style: {
                              fontSize: "13px",
                              fontWeight: 900,
                              color: ht
                            },
                            children: Y.group_name
                          }), q("span", {
                            style: {
                              fontSize: "10px",
                              fontWeight: 600,
                              color: "var(--md-text-tertiary)"
                            },
                            children: ["(", Y.pttype_count, " pttype)"]
                          }), j("span", {
                            style: {
                              marginLeft: "auto",
                              fontSize: "10px",
                              color: "var(--md-text-tertiary)"
                            },
                            children: mt ? "\u25BC" : "\u25B6"
                          })]
                        })
                      }), Q.map(ot => {
                        let dt = Y.fys[ot.be];
                        return q(wn.Fragment, {
                          children: [j("td", {
                            style: {
                              ...V.td,
                              fontWeight: 800
                            },
                            children: pt(dt.opd_visits + dt.ipd_admissions)
                          }), j("td", {
                            style: {
                              ...V.td,
                              fontWeight: 800
                            },
                            children: pt(dt.total_income)
                          }), j("td", {
                            style: {
                              ...V.td,
                              fontWeight: 800,
                              color: dt.total_outstanding > 0 ? "#dc2626" : "inherit"
                            },
                            children: pt(dt.total_outstanding)
                          }), j("td", {
                            style: {
                              ...V.td,
                              fontWeight: 800,
                              borderRight: "2px solid var(--md-border)",
                              color: dt.collection_rate >= 90 ? "#059669" : dt.collection_rate >= 80 ? "#d97706" : dt.total_income > 0 ? "#dc2626" : "inherit"
                            },
                            children: dt.total_income > 0 ? Sr(dt.collection_rate) : "\u2014"
                          })]
                        }, ot.be)
                      }), j("td", {
                        style: {
                          ...V.td,
                          textAlign: "center",
                          fontWeight: 800
                        },
                        children: j(oe, {
                          value: Y.income_growth
                        })
                      }), j("td", {
                        style: {
                          ...V.td,
                          textAlign: "center"
                        },
                        children: Tt ? j("span", {
                          style: V.badge("rgba(220,38,38,.1)", "#dc2626"),
                          children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                        }) : j("span", {
                          style: V.badge("rgba(5,150,105,.1)", "#059669"),
                          children: "\u0E1B\u0E01\u0E15\u0E34"
                        })
                      })]
                    }), mt && ft.map((ot, dt) => {
                      let vt = ot.flag_low_collection || ot.flag_high_outstanding;
                      return q("tr", {
                        style: {
                          background: dt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                        },
                        children: [q("td", {
                          style: {
                            ...V.tdName,
                            paddingLeft: "36px",
                            borderRight: "2px solid var(--md-border)",
                            fontSize: "10px"
                          },
                          children: [j("span", {
                            style: {
                              color: "var(--md-text-tertiary)",
                              marginRight: "6px"
                            },
                            children: "\u21B3"
                          }), j("span", {
                            style: {
                              fontWeight: 700
                            },
                            children: ot.pttype_code
                          }), j("span", {
                            style: {
                              marginLeft: "4px",
                              fontWeight: 500,
                              color: "var(--md-text-secondary)"
                            },
                            children: ot.pttype_name
                          }), j("button", {
                            onClick: Ct => {
                              Ct.stopPropagation(), $(ot)
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
                        }), Q.map(Ct => {
                          let St = ot.fys[Ct.be];
                          return q(wn.Fragment, {
                            children: [j("td", {
                              style: {
                                ...V.td,
                                fontSize: "10px"
                              },
                              children: pt(St.opd_visits + St.ipd_admissions)
                            }), j("td", {
                              style: {
                                ...V.td,
                                fontSize: "10px"
                              },
                              children: pt(St.total_income)
                            }), j("td", {
                              style: {
                                ...V.td,
                                fontSize: "10px",
                                color: St.total_outstanding > 0 ? "#dc2626" : "inherit"
                              },
                              children: pt(St.total_outstanding)
                            }), j("td", {
                              style: {
                                ...V.td,
                                fontSize: "10px",
                                borderRight: "2px solid var(--md-border)",
                                color: St.collection_rate >= 90 ? "#059669" : St.collection_rate >= 80 ? "#d97706" : St.total_income > 0 ? "#dc2626" : "inherit"
                              },
                              children: St.total_income > 0 ? Sr(St.collection_rate) : "\u2014"
                            })]
                          }, Ct.be)
                        }), j("td", {
                          style: {
                            ...V.td,
                            textAlign: "center",
                            fontSize: "10px"
                          },
                          children: j(oe, {
                            value: ot.income_growth
                          })
                        }), j("td", {
                          style: {
                            ...V.td,
                            textAlign: "center",
                            fontSize: "9px"
                          },
                          children: vt ? j("span", {
                            style: V.badge("rgba(220,38,38,.08)", "#dc2626"),
                            children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                          }) : j("span", {
                            style: V.badge("rgba(5,150,105,.08)", "#059669"),
                            children: "\u0E1B\u0E01\u0E15\u0E34"
                          })
                        })]
                      }, `${Y.group_name}-${ot.pttype_code}`)
                    })]
                  }, Y.group_name)
                }) : t.payers.map((Y, at) => {
                  let Tt = Y.flag_low_collection || Y.flag_high_outstanding,
                    ht = Tt ? "rgba(220,38,38,.04)" : at % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))";
                  return q("tr", {
                    style: {
                      background: ht
                    },
                    children: [j("td", {
                      style: {
                        ...V.tdName,
                        paddingLeft: "14px",
                        borderRight: "2px solid var(--md-border)"
                      },
                      children: q("button", {
                        onClick: () => $(Y),
                        style: {
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          textAlign: "left"
                        },
                        children: [j("span", {
                          style: {
                            fontWeight: 800,
                            textDecoration: "underline dotted"
                          },
                          children: Y.pttype_code
                        }), j("span", {
                          style: {
                            marginLeft: "4px",
                            fontWeight: 600,
                            color: "var(--md-text-secondary)",
                            fontSize: "10px"
                          },
                          children: Y.pttype_name
                        }), Y.group_name && j("span", {
                          style: {
                            marginLeft: "6px",
                            fontSize: "9px",
                            fontWeight: 700,
                            color: Z(Y.group_name),
                            padding: "1px 6px",
                            borderRadius: "99px",
                            background: `${Z(Y.group_name)}15`
                          },
                          children: Y.group_name
                        })]
                      })
                    }), Q.map(mt => {
                      let ft = Y.fys[mt.be];
                      return q(wn.Fragment, {
                        children: [j("td", {
                          style: V.td,
                          children: pt(ft.opd_visits + ft.ipd_admissions)
                        }), j("td", {
                          style: {
                            ...V.td,
                            fontWeight: 700
                          },
                          children: pt(ft.total_income)
                        }), j("td", {
                          style: {
                            ...V.td,
                            color: ft.total_outstanding > 0 ? "#dc2626" : "inherit"
                          },
                          children: pt(ft.total_outstanding)
                        }), j("td", {
                          style: {
                            ...V.td,
                            fontWeight: 800,
                            borderRight: "2px solid var(--md-border)",
                            color: ft.collection_rate >= 90 ? "#059669" : ft.collection_rate >= 80 ? "#d97706" : ft.total_income > 0 ? "#dc2626" : "inherit"
                          },
                          children: ft.total_income > 0 ? Sr(ft.collection_rate) : "\u2014"
                        })]
                      }, mt.be)
                    }), j("td", {
                      style: {
                        ...V.td,
                        textAlign: "center"
                      },
                      children: j(oe, {
                        value: Y.income_growth
                      })
                    }), j("td", {
                      style: {
                        ...V.td,
                        textAlign: "center"
                      },
                      children: Tt ? j("span", {
                        style: V.badge("rgba(220,38,38,.1)", "#dc2626"),
                        children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                      }) : j("span", {
                        style: V.badge("rgba(5,150,105,.1)", "#059669"),
                        children: "\u0E1B\u0E01\u0E15\u0E34"
                      })
                    })]
                  }, Y.pttype_code)
                })
              }), j("tfoot", {
                children: q("tr", {
                  style: {
                    background: "rgba(14,165,233,.06)"
                  },
                  children: [j("td", {
                    style: {
                      ...V.td,
                      textAlign: "left",
                      paddingLeft: "14px",
                      fontWeight: 900,
                      borderRight: "2px solid var(--md-border)",
                      borderTop: "2px solid var(--md-border)"
                    },
                    children: "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
                  }), Q.map(Y => {
                    let at = N[Y.be];
                    return q(wn.Fragment, {
                      children: [j("td", {
                        style: {
                          ...V.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: pt(at.opd_visits + at.ipd_admissions)
                      }), j("td", {
                        style: {
                          ...V.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: pt(at.total_income)
                      }), j("td", {
                        style: {
                          ...V.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)",
                          color: "#dc2626"
                        },
                        children: pt(at.total_outstanding)
                      }), j("td", {
                        style: {
                          ...V.td,
                          fontWeight: 900,
                          borderRight: "2px solid var(--md-border)",
                          borderTop: "2px solid var(--md-border)",
                          color: at.collection_rate >= 80 ? "#059669" : "#dc2626"
                        },
                        children: Sr(at.collection_rate)
                      })]
                    }, Y.be)
                  }), j("td", {
                    style: {
                      ...V.td,
                      textAlign: "center",
                      fontWeight: 900,
                      borderTop: "2px solid var(--md-border)"
                    },
                    children: j(oe, {
                      value: H_(N[Q[2].be]?.total_income, N[Q[1].be]?.total_income)
                    })
                  }), j("td", {
                    style: {
                      ...V.td,
                      borderTop: "2px solid var(--md-border)"
                    }
                  })]
                })
              })]
            })
          })]
        })]
      })
    })(), !p && t && Q.length === 3 && v === "payer-detail" && (() => {
      let rt = t.payers.filter(it => it._sort_income > 0).slice(0, 12).map(it => {
        let Y = {
          name: it.pttype_code
        };
        for (let at of Q) Y[`fy${at.be}`] = it.fys[at.be].total_income;
        return Y
      });
      return q(Ra, {
        children: [q("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [j("div", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              marginBottom: "12px"
            },
            children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34 (Top 12) \u2014 3 \u0E1B\u0E35\u0E07\u0E1A\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A"
          }), j(Eu, {
            width: "100%",
            height: 350,
            children: q(Cd, {
              data: rt,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [j(Ta, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), j(cr, {
                dataKey: "name",
                tick: {
                  fontSize: 10,
                  fontWeight: 700
                },
                interval: 0,
                angle: -30,
                textAnchor: "end",
                height: 50
              }), j(fr, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: it => it >= 1e6 ? `${(it/1e6).toFixed(1)}M` : it >= 1e3 ? `${(it/1e3).toFixed(0)}K` : it
              }), j(de, {
                content: j(ie, {})
              }), j(De, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), Q.map((it, Y) => j(Ge, {
                dataKey: `fy${it.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${it.be}`,
                fill: Na[Y],
                radius: [3, 3, 0, 0]
              }, it.be))]
            })
          })]
        }), j("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "12px"
          },
          children: t.payers.filter(it => it._sort_income > 0).slice(0, 20).map((it, Y) => {
            let at = it.flag_low_collection || it.flag_high_outstanding,
              Tt = it.fys[Q[2].be];
            return q("div", {
              className: "rounded-2xl p-4",
              style: {
                background: "var(--md-surface)",
                border: at ? "1.5px solid rgba(220,38,38,.3)" : "1px solid var(--md-border)"
              },
              children: [q("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px"
                },
                children: [q("button", {
                  onClick: () => $(it),
                  style: {
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left"
                  },
                  title: "\u0E04\u0E25\u0E34\u0E01\u0E14\u0E39\u0E23\u0E32\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Top 50",
                  children: [j("span", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: G_[Y % G_.length],
                      textDecoration: "underline dotted"
                    },
                    children: it.pttype_code
                  }), j("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-secondary)",
                      marginLeft: "6px"
                    },
                    children: it.pttype_name
                  }), j("span", {
                    style: {
                      marginLeft: "6px",
                      fontSize: "10px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: "\u{1F50D}"
                  })]
                }), at ? j("span", {
                  style: V.badge("rgba(220,38,38,.1)", "#dc2626"),
                  children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                }) : j("span", {
                  style: V.badge("rgba(5,150,105,.1)", "#059669"),
                  children: "\u0E1B\u0E01\u0E15\u0E34"
                })]
              }), (() => {
                let ht = it.fys[Q[2].be],
                  mt = ht.opd_drug || 0,
                  ft = ht.opd_lab || 0,
                  ot = ht.opd_xray || 0,
                  dt = mt + ft + ot;
                if (dt === 0) return null;
                let vt = mt / dt * 100,
                  Ct = ft / dt * 100,
                  St = ot / dt * 100;
                return q("div", {
                  style: {
                    marginBottom: "8px"
                  },
                  children: [q("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "9px",
                      fontWeight: 700,
                      marginBottom: "3px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: [j("span", {
                      children: "Service Mix (\u0E1B\u0E35\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14)"
                    }), q("span", {
                      children: [pt(dt), " \u0E1A\u0E32\u0E17"]
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      height: "8px",
                      borderRadius: "99px",
                      overflow: "hidden",
                      background: "var(--md-surface-2, rgba(0,0,0,.04))"
                    },
                    children: [mt > 0 && j("div", {
                      style: {
                        width: `${vt}%`,
                        background: $i.drug
                      },
                      title: `\u{1F48A} \u0E04\u0E48\u0E32\u0E22\u0E32: ${pt(mt)} \u0E1A\u0E32\u0E17 (${vt.toFixed(1)}%)`
                    }), ft > 0 && j("div", {
                      style: {
                        width: `${Ct}%`,
                        background: $i.lab
                      },
                      title: `\u{1F52C} \u0E04\u0E48\u0E32 Lab: ${pt(ft)} \u0E1A\u0E32\u0E17 (${Ct.toFixed(1)}%)`
                    }), ot > 0 && j("div", {
                      style: {
                        width: `${St}%`,
                        background: $i.xray
                      },
                      title: `\u2622\uFE0F \u0E04\u0E48\u0E32 X-ray: ${pt(ot)} \u0E1A\u0E32\u0E17 (${St.toFixed(1)}%)`
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      gap: "10px",
                      fontSize: "9px",
                      fontWeight: 700,
                      marginTop: "3px"
                    },
                    children: [mt > 0 && q("span", {
                      style: {
                        color: $i.drug
                      },
                      children: ["\u{1F48A} \u0E22\u0E32 ", vt.toFixed(0), "%"]
                    }), ft > 0 && q("span", {
                      style: {
                        color: $i.lab
                      },
                      children: ["\u{1F52C} Lab ", Ct.toFixed(0), "%"]
                    }), ot > 0 && q("span", {
                      style: {
                        color: $i.xray
                      },
                      children: ["\u2622\uFE0F Xray ", St.toFixed(0), "%"]
                    })]
                  })]
                })
              })(), q("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "10px"
                },
                children: [j("thead", {
                  children: q("tr", {
                    children: [j("th", {
                      style: {
                        textAlign: "left",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E1B\u0E35\u0E07\u0E1A"
                    }), j("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), j("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), j("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                    }), j("th", {
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
                }), j("tbody", {
                  children: Q.map((ht, mt) => {
                    let ft = it.fys[ht.be];
                    return q("tr", {
                      style: {
                        fontWeight: mt === 2 ? 800 : 600
                      },
                      children: [j("td", {
                        style: {
                          textAlign: "left",
                          padding: "3px 4px",
                          color: Na[mt]
                        },
                        children: ht.be
                      }), j("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: pt(ft.opd_visits + ft.ipd_admissions)
                      }), j("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: pt(ft.total_income)
                      }), j("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: ft.total_outstanding > 0 ? "#dc2626" : "inherit"
                        },
                        children: pt(ft.total_outstanding)
                      }), j("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: ft.collection_rate >= 90 ? "#059669" : ft.collection_rate >= 80 ? "#d97706" : "#dc2626"
                        },
                        children: ft.total_income > 0 ? Sr(ft.collection_rate) : "\u2014"
                      })]
                    }, ht.be)
                  })
                })]
              }), q("div", {
                style: {
                  marginTop: "6px",
                  fontSize: "10px",
                  fontWeight: 800
                },
                children: [j("span", {
                  style: {
                    color: "var(--md-text-tertiary)"
                  },
                  children: "Growth: "
                }), j(oe, {
                  value: it.income_growth
                }), Tt.ipd_avg_rw > 0 && q("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["Avg RW: ", j("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: Tt.ipd_avg_rw.toFixed(2)
                  })]
                }), Tt.ipd_avg_los > 0 && q("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["LOS: ", q("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: [Tt.ipd_avg_los.toFixed(1), "d"]
                  })]
                })]
              })]
            }, it.pttype_code)
          })
        })]
      })
    })(), !p && v === "diagnosis" && q(Ra, {
      children: [q("div", {
        className: "rounded-2xl p-4",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap"
        },
        children: [j("span", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-secondary)"
          },
          children: "\u0E01\u0E23\u0E2D\u0E07\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34"
        }), q("select", {
          value: w || "",
          onChange: N => S(N.target.value || null),
          style: {
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 700,
            background: "var(--md-surface)",
            color: "var(--md-text-primary)"
          },
          children: [j("option", {
            value: "",
            children: "\u0E17\u0E38\u0E01\u0E2A\u0E34\u0E17\u0E18\u0E34"
          }), (t?.payers || []).map(N => q("option", {
            value: N.pttype_code,
            children: [N.pttype_code, " \u2014 ", N.pttype_name]
          }, N.pttype_code))]
        })]
      }), i?.diagnoses && q("div", {
        className: "rounded-2xl",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          overflow: "hidden"
        },
        children: [j("div", {
          style: {
            padding: "14px 20px",
            borderBottom: "2px solid var(--md-border)",
            background: "linear-gradient(135deg, rgba(124,58,237,.04), rgba(2,132,199,.04))"
          },
          children: q("div", {
            style: {
              fontSize: "15px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: ["Top \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23 \u2014 \u0E1B\u0E35\u0E07\u0E1A ", i.fiscal_year?.be || gt[2], w && q("span", {
              style: {
                ...V.badge("rgba(124,58,237,.1)", "#7c3aed"),
                marginLeft: "8px"
              },
              children: ["\u0E2A\u0E34\u0E17\u0E18\u0E34: ", w]
            })]
          })
        }), j("div", {
          style: {
            overflowX: "auto"
          },
          children: q("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse"
            },
            children: [j("thead", {
              children: q("tr", {
                style: {
                  background: "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [j("th", {
                  style: {
                    ...V.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), j("th", {
                  style: {
                    ...V.th,
                    textAlign: "left"
                  },
                  children: "ICD-10"
                }), j("th", {
                  style: {
                    ...V.th,
                    textAlign: "left"
                  },
                  children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23"
                }), j("th", {
                  style: V.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), j("th", {
                  style: V.th,
                  children: "\u0E04\u0E19"
                }), j("th", {
                  style: V.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                })]
              })
            }), j("tbody", {
              children: i.diagnoses.map((N, rt) => q("tr", {
                style: {
                  background: rt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [j("td", {
                  style: {
                    ...V.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: rt + 1
                }), j("td", {
                  style: {
                    ...V.td,
                    textAlign: "left",
                    fontWeight: 800,
                    fontFamily: "monospace"
                  },
                  children: N.icd10
                }), j("td", {
                  style: V.tdName,
                  children: N.name
                }), j("td", {
                  style: V.td,
                  children: pt(N.visits)
                }), j("td", {
                  style: V.td,
                  children: pt(N.patients)
                }), j("td", {
                  style: {
                    ...V.td,
                    fontWeight: 700
                  },
                  children: pt(N.income)
                })]
              }, N.icd10))
            })]
          })
        })]
      })]
    }), !p && v === "patient-insight" && (a ? (() => {
      let N = a.loyalty,
        rt = a.demographics,
        it = a.inactive,
        Y = a.fiscal_year?.be,
        at = rt.age_bands,
        Tt = at.lt18 + at.a18_34 + at.a35_59 + at.gte60,
        ht = rt.sex.male + rt.sex.female,
        mt = N.total_unique - ht,
        ft = ot => ot ? new Date(ot).toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }) : "\u2014";
      return q(Ra, {
        children: [q("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px"
          },
          children: [q("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #0284c7"
            },
            children: [q("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: ["\u{1F465} \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E1B\u0E35\u0E07\u0E1A ", Y]
            }), j("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#0284c7",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: pt(N.total_unique)
            }), q("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [pt(N.total_visits), " visits \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", j("b", {
                children: N.avg_visits_per_patient
              }), " \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19"]
            })]
          }), q("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #059669"
            },
            children: [j("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u2728 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48 (First Visit \u0E43\u0E19\u0E1B\u0E35\u0E19\u0E35\u0E49)"
            }), j("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#059669",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: pt(N.new_patients)
            }), q("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [j("b", {
                style: {
                  color: "#059669"
                },
                children: Sr(N.new_pct)
              }), " \u0E02\u0E2D\u0E07 ", pt(N.total_unique), " \u0E23\u0E32\u0E22"]
            })]
          }), q("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #7c3aed"
            },
            children: [j("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u{1F501} \u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33"
            }), j("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#7c3aed",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: pt(N.returning_patients)
            }), q("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [j("b", {
                style: {
                  color: "#7c3aed"
                },
                children: Sr(N.returning_pct)
              }), " \xB7 Retention rate"]
            })]
          }), q("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #d97706"
            },
            children: [j("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21"
            }), j("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#d97706",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: pt(N.total_income)
            }), q("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: ["\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", j("b", {
                children: pt(N.total_unique > 0 ? Math.round(N.total_income / N.total_unique) : 0)
              }), " \u0E1A\u0E32\u0E17/\u0E04\u0E19"]
            })]
          })]
        }), q("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "12px"
          },
          children: [q("div", {
            className: "rounded-2xl p-5",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [j("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)",
                marginBottom: "12px"
              },
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38"
            }), [{
              label: "<18 \u0E1B\u0E35 (\u0E40\u0E14\u0E47\u0E01/\u0E40\u0E22\u0E32\u0E27\u0E0A\u0E19)",
              val: at.lt18,
              color: "#3b82f6"
            }, {
              label: "18-34 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19\u0E15\u0E49\u0E19)",
              val: at.a18_34,
              color: "#10b981"
            }, {
              label: "35-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E01\u0E25\u0E32\u0E07)",
              val: at.a35_59,
              color: "#f59e0b"
            }, {
              label: "60+ \u0E1B\u0E35 (\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38)",
              val: at.gte60,
              color: "#ef4444"
            }].map(ot => {
              let dt = Tt > 0 ? ot.val / Tt * 100 : 0;
              return q("div", {
                style: {
                  marginBottom: "10px"
                },
                children: [q("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    fontWeight: 700,
                    marginBottom: "4px"
                  },
                  children: [j("span", {
                    style: {
                      color: "var(--md-text-secondary)"
                    },
                    children: ot.label
                  }), q("span", {
                    style: {
                      color: ot.color,
                      fontVariantNumeric: "tabular-nums"
                    },
                    children: [pt(ot.val), " ", q("span", {
                      style: {
                        color: "var(--md-text-tertiary)",
                        fontWeight: 600
                      },
                      children: ["(", dt.toFixed(1), "%)"]
                    })]
                  })]
                }), j("div", {
                  style: {
                    height: "8px",
                    background: "var(--md-surface-2, rgba(0,0,0,.04))",
                    borderRadius: "99px",
                    overflow: "hidden"
                  },
                  children: j("div", {
                    style: {
                      width: `${dt}%`,
                      height: "100%",
                      background: ot.color,
                      borderRadius: "99px",
                      transition: "width .4s ease"
                    }
                  })
                })]
              }, ot.label)
            })]
          }), q("div", {
            className: "rounded-2xl p-5",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [j("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)",
                marginBottom: "12px"
              },
              children: "\u0E40\u0E1E\u0E28"
            }), q("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              },
              children: [
                [{
                  label: "\u0E0A\u0E32\u0E22",
                  val: rt.sex.male,
                  color: "#3b82f6",
                  icon: "\u2642"
                }, {
                  label: "\u0E2B\u0E0D\u0E34\u0E07",
                  val: rt.sex.female,
                  color: "#ec4899",
                  icon: "\u2640"
                }].map(ot => {
                  let dt = ht > 0 ? ot.val / ht * 100 : 0;
                  return q("div", {
                    children: [q("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "4px"
                      },
                      children: [q("span", {
                        style: {
                          fontSize: "12px",
                          fontWeight: 700,
                          color: ot.color
                        },
                        children: [ot.icon, " ", ot.label]
                      }), j("span", {
                        style: {
                          fontSize: "14px",
                          fontWeight: 900,
                          color: ot.color,
                          fontVariantNumeric: "tabular-nums"
                        },
                        children: pt(ot.val)
                      })]
                    }), q("div", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        marginBottom: "4px"
                      },
                      children: [dt.toFixed(1), "%"]
                    }), j("div", {
                      style: {
                        height: "6px",
                        background: "var(--md-surface-2, rgba(0,0,0,.04))",
                        borderRadius: "99px",
                        overflow: "hidden"
                      },
                      children: j("div", {
                        style: {
                          width: `${dt}%`,
                          height: "100%",
                          background: ot.color,
                          borderRadius: "99px"
                        }
                      })
                    })]
                  }, ot.label)
                }), mt > 0 && q("div", {
                  style: {
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: ["\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38: ", pt(mt), " \u0E23\u0E32\u0E22"]
                })
              ]
            })]
          })]
        }), q("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [q("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
              flexWrap: "wrap",
              gap: "8px"
            },
            children: [j("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)"
              },
              children: "\u{1F4DE} \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E02\u0E32\u0E14\u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 (Recall Opportunity)"
            }), q("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: ["Total \u0E17\u0E35\u0E48\u0E40\u0E04\u0E22\u0E21\u0E32\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", pt(it.total_patients_ever), " \u0E23\u0E32\u0E22"]
            })]
          }), j("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px"
            },
            children: [{
              label: "\u0E02\u0E32\u0E14 3-6 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: it.inactive_3_6mo,
              color: "#d97706",
              hint: "\u0E43\u0E01\u0E25\u0E49\u0E40\u0E02\u0E49\u0E32\u0E19\u0E31\u0E14 \xB7 proactive call"
            }, {
              label: "\u0E02\u0E32\u0E14 6-12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: it.inactive_6_12mo,
              color: "#dc2626",
              hint: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35 \xB7 NCD/chronic risk"
            }, {
              label: "\u0E02\u0E32\u0E14 >12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: it.inactive_12mo_plus,
              color: "#7c3aed",
              hint: "\u0E23\u0E2D\u0E1A recall \u0E43\u0E2B\u0E0D\u0E48 \xB7 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E2B\u0E32\u0E22\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27"
            }].map(ot => q("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: `${ot.color}08`,
                border: `1px solid ${ot.color}25`
              },
              children: [j("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 700,
                  color: ot.color,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  marginBottom: "4px"
                },
                children: ot.label
              }), j("div", {
                style: {
                  fontSize: "22px",
                  fontWeight: 900,
                  color: ot.color,
                  fontVariantNumeric: "tabular-nums"
                },
                children: pt(ot.val)
              }), j("div", {
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
        }), j("div", {
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
          }].map(ot => q("div", {
            className: "rounded-2xl",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              overflow: "hidden"
            },
            children: [q("div", {
              style: {
                padding: "12px 16px",
                borderBottom: "2px solid var(--md-border)",
                background: `linear-gradient(135deg, ${ot.accent}08, transparent)`
              },
              children: [j("div", {
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                  color: ot.accent
                },
                children: ot.title
              }), j("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: ot.hint
              })]
            }), j("div", {
              style: {
                overflowX: "auto",
                maxHeight: "480px",
                overflowY: "auto"
              },
              children: q("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse"
                },
                children: [j("thead", {
                  style: {
                    position: "sticky",
                    top: 0,
                    background: "var(--md-surface)",
                    zIndex: 1
                  },
                  children: q("tr", {
                    children: [j("th", {
                      style: {
                        ...V.th,
                        textAlign: "center",
                        width: "32px"
                      },
                      children: "#"
                    }), j("th", {
                      style: {
                        ...V.th,
                        textAlign: "left"
                      },
                      children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                    }), j("th", {
                      style: V.th,
                      children: "\u0E2D\u0E32\u0E22\u0E38"
                    }), j("th", {
                      style: V.th,
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), j("th", {
                      style: V.th,
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), j("th", {
                      style: {
                        ...V.th,
                        textAlign: "left"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                    })]
                  })
                }), q("tbody", {
                  children: [(ot.list || []).map((dt, vt) => q("tr", {
                    style: {
                      background: vt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                    },
                    children: [j("td", {
                      style: {
                        ...V.td,
                        textAlign: "center",
                        color: "var(--md-text-tertiary)"
                      },
                      children: vt + 1
                    }), q("td", {
                      style: V.tdName,
                      children: [j("div", {
                        style: {
                          fontFamily: "monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "var(--md-text-tertiary)"
                        },
                        children: dt.hn
                      }), j("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: 700
                        },
                        children: dt.pt_name || "\u2014"
                      })]
                    }), j("td", {
                      style: V.td,
                      children: dt.age || "\u2014"
                    }), j("td", {
                      style: {
                        ...V.td,
                        fontWeight: 800,
                        color: ot.accent
                      },
                      children: pt(dt.visit_count)
                    }), j("td", {
                      style: {
                        ...V.td,
                        fontWeight: 800
                      },
                      children: pt(dt.total_income)
                    }), j("td", {
                      style: {
                        ...V.td,
                        textAlign: "left",
                        fontSize: "10px",
                        color: "var(--md-text-secondary)"
                      },
                      children: ft(dt.last_visit)
                    })]
                  }, dt.hn)), (!ot.list || ot.list.length === 0) && j("tr", {
                    children: j("td", {
                      colSpan: 6,
                      style: {
                        ...V.td,
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
    })() : j("div", {
      style: {
        textAlign: "center",
        padding: "40px 0",
        color: "var(--md-text-tertiary)",
        fontWeight: 700
      },
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23..."
    })), !p && v === "aging" && (s ? (() => {
      let N = s.payers || [],
        rt = s.grand_total || {},
        it = rt.total_outstanding || 0;
      return q(Ra, {
        children: [q("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [q("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "12px",
              flexWrap: "wrap",
              gap: "8px"
            },
            children: [j("div", {
              style: {
                fontSize: "14px",
                fontWeight: 800,
                color: "var(--md-text-primary)"
              },
              children: "\u23F1\uFE0F \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E2B\u0E19\u0E35\u0E49 (Outstanding Aging)"
            }), q("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: [s.window?.from, " \u2192 ", s.window?.to, " \xB7 \u0E19\u0E31\u0E1A\u0E08\u0E32\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E21\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"]
            })]
          }), q("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "10px"
            },
            children: [xl.map((Y, at) => {
              let Tt = rt[Y] || 0,
                ht = it > 0 ? Tt / it * 100 : 0;
              return q("div", {
                style: {
                  padding: "12px",
                  borderRadius: "10px",
                  background: `${Fi[at]}10`,
                  borderLeft: `4px solid ${Fi[at]}`
                },
                children: [j("div", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 800,
                    color: Fi[at],
                    textTransform: "uppercase",
                    letterSpacing: ".04em"
                  },
                  children: wl[at]
                }), j("div", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    fontFamily: "monospace",
                    marginTop: "4px"
                  },
                  children: pt(Tt)
                }), q("div", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: Fi[at],
                    marginTop: "2px"
                  },
                  children: [ht.toFixed(1), "%"]
                })]
              }, Y)
            }), q("div", {
              style: {
                padding: "12px",
                borderRadius: "10px",
                background: "rgba(0,0,0,.04)",
                borderLeft: "4px solid var(--md-text-secondary)"
              },
              children: [j("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "var(--md-text-secondary)",
                  textTransform: "uppercase"
                },
                children: "\u0E23\u0E27\u0E21"
              }), j("div", {
                style: {
                  fontSize: "20px",
                  fontWeight: 900,
                  color: "var(--md-text-primary)",
                  fontFamily: "monospace",
                  marginTop: "4px"
                },
                children: pt(it)
              }), j("div", {
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
        }), q("div", {
          className: "rounded-2xl",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            overflow: "hidden"
          },
          children: [j("div", {
            style: {
              padding: "12px 18px",
              borderBottom: "1px solid var(--md-border)",
              background: "linear-gradient(135deg, rgba(220,38,38,.04), rgba(217,119,6,.04))"
            },
            children: j("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)"
              },
              children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34 \u2014 \u0E2A\u0E35\u0E40\u0E02\u0E49\u0E21\u0E02\u0E36\u0E49\u0E19 = \u0E2B\u0E19\u0E35\u0E49\u0E40\u0E01\u0E48\u0E32 (\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 write-off)"
            })
          }), q("div", {
            style: {
              padding: "12px 18px"
            },
            children: [N.map((Y, at) => {
              let Tt = xl.map((ht, mt) => ({
                v: Y[ht] || 0,
                color: Fi[mt],
                label: wl[mt]
              }));
              return q("div", {
                style: {
                  marginBottom: "12px"
                },
                children: [q("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "4px"
                  },
                  children: [q("button", {
                    onClick: () => $(Y),
                    style: {
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left"
                    },
                    title: "\u0E04\u0E25\u0E34\u0E01\u0E14\u0E39\u0E23\u0E32\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
                    children: [j("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        textDecoration: "underline dotted"
                      },
                      children: Y.pttype_code
                    }), j("span", {
                      style: {
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--md-text-secondary)",
                        marginLeft: "6px"
                      },
                      children: Y.pttype_name
                    })]
                  }), q("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 900,
                      fontFamily: "monospace",
                      color: "var(--md-text-primary)"
                    },
                    children: [pt(Y.total_outstanding), " \u0E1A\u0E32\u0E17"]
                  })]
                }), j("div", {
                  style: {
                    display: "flex",
                    height: "24px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "var(--md-surface-2, rgba(0,0,0,.04))"
                  },
                  children: Tt.map((ht, mt) => {
                    if (ht.v === 0) return null;
                    let ft = Y.total_outstanding > 0 ? ht.v / Y.total_outstanding * 100 : 0;
                    return j("div", {
                      style: {
                        width: `${ft}%`,
                        background: ht.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                      },
                      title: `${ht.label}: ${pt(ht.v)} \u0E1A\u0E32\u0E17 (${ft.toFixed(1)}%)`,
                      children: ft >= 8 && q("span", {
                        style: {
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#fff",
                          textShadow: "0 0 3px rgba(0,0,0,.3)"
                        },
                        children: [ft.toFixed(0), "%"]
                      })
                    }, mt)
                  })
                })]
              }, Y.pttype_code)
            }), N.length === 0 && j("div", {
              style: {
                textAlign: "center",
                padding: "24px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700
              },
              children: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E43\u0E19\u0E1B\u0E35\u0E07\u0E1A\u0E19\u0E35\u0E49"
            })]
          })]
        }), j("div", {
          className: "rounded-2xl p-3",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center"
          },
          children: wl.map((Y, at) => q("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px"
            },
            children: [j("span", {
              style: {
                width: "14px",
                height: "14px",
                borderRadius: "3px",
                background: Fi[at]
              }
            }), j("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--md-text-secondary)"
              },
              children: Y
            })]
          }, Y))
        })]
      })
    })() : j("div", {
      style: {
        textAlign: "center",
        padding: "40px 0",
        color: "var(--md-text-tertiary)",
        fontWeight: 700
      },
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30..."
    })), W && j("div", {
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
      onClick: Ot,
      children: q("div", {
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
        onClick: N => N.stopPropagation(),
        children: [q("div", {
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
          children: [q("div", {
            children: [q("div", {
              style: {
                fontSize: "15px",
                fontWeight: 900,
                color: "var(--md-text-primary)"
              },
              children: ["\u{1F50D} \u0E23\u0E32\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u2014 \u0E2A\u0E34\u0E17\u0E18\u0E34 ", W.pttype_code]
            }), j("div", {
              style: {
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginTop: "2px"
              },
              children: W.pttype_name
            })]
          }), q("div", {
            style: {
              display: "flex",
              gap: "8px",
              alignItems: "center"
            },
            children: [j("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)"
              },
              children: "\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21"
            }), q("select", {
              value: z,
              onChange: N => b(N.target.value),
              style: {
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid var(--md-border)",
                fontSize: "11px",
                fontWeight: 700,
                background: "var(--md-surface)",
                color: "var(--md-text-primary)"
              },
              children: [j("option", {
                value: "outstanding",
                children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14"
              }), j("option", {
                value: "income",
                children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14"
              }), j("option", {
                value: "visits",
                children: "\u0E21\u0E32\u0E1A\u0E48\u0E2D\u0E22\u0E2A\u0E38\u0E14"
              })]
            }), j("button", {
              onClick: Ot,
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
        }), j("div", {
          style: {
            overflowY: "auto",
            flex: 1
          },
          children: O ? j("div", {
            style: {
              padding: "40px",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14..."
          }) : H?.patients?.length ? q("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse"
            },
            children: [j("thead", {
              style: {
                position: "sticky",
                top: 0,
                background: "var(--md-surface)",
                zIndex: 1
              },
              children: q("tr", {
                children: [j("th", {
                  style: {
                    ...V.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), j("th", {
                  style: {
                    ...V.th,
                    textAlign: "left"
                  },
                  children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                }), j("th", {
                  style: V.th,
                  children: "\u0E2D\u0E32\u0E22\u0E38"
                }), j("th", {
                  style: V.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), j("th", {
                  style: V.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                }), j("th", {
                  style: V.th,
                  children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                }), j("th", {
                  style: V.th,
                  children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                }), j("th", {
                  style: {
                    ...V.th,
                    textAlign: "left"
                  },
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                })]
              })
            }), j("tbody", {
              children: H.patients.map((N, rt) => q("tr", {
                style: {
                  background: rt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [j("td", {
                  style: {
                    ...V.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: rt + 1
                }), q("td", {
                  style: V.tdName,
                  children: [j("div", {
                    style: {
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: N.hn
                  }), j("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700
                    },
                    children: N.pt_name || "\u2014"
                  })]
                }), j("td", {
                  style: V.td,
                  children: N.age || "\u2014"
                }), j("td", {
                  style: V.td,
                  children: pt(N.visit_count)
                }), j("td", {
                  style: {
                    ...V.td,
                    fontWeight: 800
                  },
                  children: pt(N.total_income)
                }), j("td", {
                  style: {
                    ...V.td,
                    fontWeight: 800,
                    color: N.total_outstanding > 0 ? "#dc2626" : "inherit"
                  },
                  children: pt(N.total_outstanding)
                }), j("td", {
                  style: {
                    ...V.td,
                    fontWeight: 800,
                    color: N.collection_rate >= 90 ? "#059669" : N.collection_rate >= 80 ? "#d97706" : "#dc2626"
                  },
                  children: Sr(N.collection_rate)
                }), j("td", {
                  style: {
                    ...V.td,
                    textAlign: "left",
                    fontSize: "10px",
                    color: "var(--md-text-secondary)"
                  },
                  children: N.last_visit ? new Date(N.last_visit).toLocaleDateString("th-TH", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  }) : "\u2014"
                })]
              }, N.hn))
            })]
          }) : j("div", {
            style: {
              padding: "40px",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: H?.error || "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E19\u0E35\u0E49 (\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19)"
          })
        }), q("div", {
          style: {
            padding: "8px 20px",
            borderTop: "1px solid var(--md-border)",
            fontSize: "10px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)",
            textAlign: "center"
          },
          children: [H?.patients?.length ? `\u0E41\u0E2A\u0E14\u0E07 ${H.patients.length} \u0E23\u0E32\u0E22 (Top ${H.limit||50})` : "", "\xB7 \u0E1B\u0E35\u0E07\u0E1A ", H?.fiscal_year?.be || ""]
        })]
      })
    }), j(kd, {
      data: P,
      theme: "customer",
      title: "AI Customer Intelligence"
    }), !p && t && q("div", {
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
var Kot = wn.memo(a4);
export {
  Kot as
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