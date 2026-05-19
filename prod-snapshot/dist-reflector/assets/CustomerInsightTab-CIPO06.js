var V_ = Object.create;
var Ol = Object.defineProperty;
var X_ = Object.getOwnPropertyDescriptor;
var Y_ = Object.getOwnPropertyNames;
var Z_ = Object.getPrototypeOf,
  J_ = Object.prototype.hasOwnProperty;
var I = (e, t) => () => (t || e((t = {
    exports: {}
  }).exports, t), t.exports),
  Q_ = (e, t) => {
    for (var r in t) Ol(e, r, {
      get: t[r],
      enumerable: !0
    })
  },
  eP = (e, t, r, n) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let i of Y_(t)) !J_.call(e, i) && i !== r && Ol(e, i, {
        get: () => t[i],
        enumerable: !(n = X_(t, i)) || n.enumerable
      });
    return e
  };
var te = (e, t, r) => (r = e != null ? V_(Z_(e)) : {}, eP(t || !e || !e.__esModule ? Ol(r, "default", {
  value: e,
  enumerable: !0
}) : r, e));
var at = I((l4, Nd) => {
  var rP = Array.isArray;
  Nd.exports = rP
});
var Sl = I((c4, Rd) => {
  var nP = typeof global == "object" && global && global.Object === Object && global;
  Rd.exports = nP
});
var Wt = I((f4, Ld) => {
  var iP = Sl(),
    oP = typeof self == "object" && self && self.Object === Object && self,
    aP = iP || oP || Function("return this")();
  Ld.exports = aP
});
var wn = I((p4, Bd) => {
  var uP = Wt(),
    sP = uP.Symbol;
  Bd.exports = sP
});
var Fd = I((d4, zd) => {
  var qd = wn(),
    Wd = Object.prototype,
    lP = Wd.hasOwnProperty,
    cP = Wd.toString,
    Ui = qd ? qd.toStringTag : void 0;

  function fP(e) {
    var t = lP.call(e, Ui),
      r = e[Ui];
    try {
      e[Ui] = void 0;
      var n = !0
    } catch {}
    var i = cP.call(e);
    return n && (t ? e[Ui] = r : delete e[Ui]), i
  }
  zd.exports = fP
});
var Ud = I((m4, $d) => {
  var pP = Object.prototype,
    dP = pP.toString;

  function mP(e) {
    return dP.call(e)
  }
  $d.exports = mP
});
var Zt = I((h4, Kd) => {
  var Hd = wn(),
    hP = Fd(),
    yP = Ud(),
    vP = "[object Null]",
    gP = "[object Undefined]",
    Gd = Hd ? Hd.toStringTag : void 0;

  function bP(e) {
    return e == null ? e === void 0 ? gP : vP : Gd && Gd in Object(e) ? hP(e) : yP(e)
  }
  Kd.exports = bP
});
var Jt = I((y4, Vd) => {
  function xP(e) {
    return e != null && typeof e == "object"
  }
  Vd.exports = xP
});
var qr = I((v4, Xd) => {
  var wP = Zt(),
    OP = Jt(),
    SP = "[object Symbol]";

  function AP(e) {
    return typeof e == "symbol" || OP(e) && wP(e) == SP
  }
  Xd.exports = AP
});
var La = I((g4, Yd) => {
  var _P = at(),
    PP = qr(),
    TP = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    EP = /^\w*$/;

  function jP(e, t) {
    if (_P(e)) return !1;
    var r = typeof e;
    return r == "number" || r == "symbol" || r == "boolean" || e == null || PP(e) ? !0 : EP.test(e) || !TP.test(e) || t != null && e in Object(t)
  }
  Yd.exports = jP
});
var Pt = I((b4, Zd) => {
  function MP(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function")
  }
  Zd.exports = MP
});
var Le = I((x4, Jd) => {
  var CP = Zt(),
    IP = Pt(),
    kP = "[object AsyncFunction]",
    DP = "[object Function]",
    NP = "[object GeneratorFunction]",
    RP = "[object Proxy]";

  function LP(e) {
    if (!IP(e)) return !1;
    var t = CP(e);
    return t == DP || t == NP || t == kP || t == RP
  }
  Jd.exports = LP
});
var em = I((w4, Qd) => {
  var BP = Wt(),
    qP = BP["__core-js_shared__"];
  Qd.exports = qP
});
var nm = I((O4, rm) => {
  var Al = em(),
    tm = function() {
      var e = /[^.]+$/.exec(Al && Al.keys && Al.keys.IE_PROTO || "");
      return e ? "Symbol(src)_1." + e : ""
    }();

  function WP(e) {
    return !!tm && tm in e
  }
  rm.exports = WP
});
var _l = I((S4, im) => {
  var zP = Function.prototype,
    FP = zP.toString;

  function $P(e) {
    if (e != null) {
      try {
        return FP.call(e)
      } catch {}
      try {
        return e + ""
      } catch {}
    }
    return ""
  }
  im.exports = $P
});
var am = I((A4, om) => {
  var UP = Le(),
    HP = nm(),
    GP = Pt(),
    KP = _l(),
    VP = /[\\^$.*+?()[\]{}|]/g,
    XP = /^\[object .+?Constructor\]$/,
    YP = Function.prototype,
    ZP = Object.prototype,
    JP = YP.toString,
    QP = ZP.hasOwnProperty,
    eT = RegExp("^" + JP.call(QP).replace(VP, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

  function tT(e) {
    if (!GP(e) || HP(e)) return !1;
    var t = UP(e) ? eT : XP;
    return t.test(KP(e))
  }
  om.exports = tT
});
var sm = I((_4, um) => {
  function rT(e, t) {
    return e?.[t]
  }
  um.exports = rT
});
var Sr = I((P4, lm) => {
  var nT = am(),
    iT = sm();

  function oT(e, t) {
    var r = iT(e, t);
    return nT(r) ? r : void 0
  }
  lm.exports = oT
});
var Hi = I((T4, cm) => {
  var aT = Sr(),
    uT = aT(Object, "create");
  cm.exports = uT
});
var dm = I((E4, pm) => {
  var fm = Hi();

  function sT() {
    this.__data__ = fm ? fm(null) : {}, this.size = 0
  }
  pm.exports = sT
});
var hm = I((j4, mm) => {
  function lT(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t
  }
  mm.exports = lT
});
var vm = I((M4, ym) => {
  var cT = Hi(),
    fT = "__lodash_hash_undefined__",
    pT = Object.prototype,
    dT = pT.hasOwnProperty;

  function mT(e) {
    var t = this.__data__;
    if (cT) {
      var r = t[e];
      return r === fT ? void 0 : r
    }
    return dT.call(t, e) ? t[e] : void 0
  }
  ym.exports = mT
});
var bm = I((C4, gm) => {
  var hT = Hi(),
    yT = Object.prototype,
    vT = yT.hasOwnProperty;

  function gT(e) {
    var t = this.__data__;
    return hT ? t[e] !== void 0 : vT.call(t, e)
  }
  gm.exports = gT
});
var wm = I((I4, xm) => {
  var bT = Hi(),
    xT = "__lodash_hash_undefined__";

  function wT(e, t) {
    var r = this.__data__;
    return this.size += this.has(e) ? 0 : 1, r[e] = bT && t === void 0 ? xT : t, this
  }
  xm.exports = wT
});
var Sm = I((k4, Om) => {
  var OT = dm(),
    ST = hm(),
    AT = vm(),
    _T = bm(),
    PT = wm();

  function On(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
      var n = e[t];
      this.set(n[0], n[1])
    }
  }
  On.prototype.clear = OT;
  On.prototype.delete = ST;
  On.prototype.get = AT;
  On.prototype.has = _T;
  On.prototype.set = PT;
  Om.exports = On
});
var _m = I((D4, Am) => {
  function TT() {
    this.__data__ = [], this.size = 0
  }
  Am.exports = TT
});
var Ba = I((N4, Pm) => {
  function ET(e, t) {
    return e === t || e !== e && t !== t
  }
  Pm.exports = ET
});
var Gi = I((R4, Tm) => {
  var jT = Ba();

  function MT(e, t) {
    for (var r = e.length; r--;)
      if (jT(e[r][0], t)) return r;
    return -1
  }
  Tm.exports = MT
});
var jm = I((L4, Em) => {
  var CT = Gi(),
    IT = Array.prototype,
    kT = IT.splice;

  function DT(e) {
    var t = this.__data__,
      r = CT(t, e);
    if (r < 0) return !1;
    var n = t.length - 1;
    return r == n ? t.pop() : kT.call(t, r, 1), --this.size, !0
  }
  Em.exports = DT
});
var Cm = I((B4, Mm) => {
  var NT = Gi();

  function RT(e) {
    var t = this.__data__,
      r = NT(t, e);
    return r < 0 ? void 0 : t[r][1]
  }
  Mm.exports = RT
});
var km = I((q4, Im) => {
  var LT = Gi();

  function BT(e) {
    return LT(this.__data__, e) > -1
  }
  Im.exports = BT
});
var Nm = I((W4, Dm) => {
  var qT = Gi();

  function WT(e, t) {
    var r = this.__data__,
      n = qT(r, e);
    return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this
  }
  Dm.exports = WT
});
var Ki = I((z4, Rm) => {
  var zT = _m(),
    FT = jm(),
    $T = Cm(),
    UT = km(),
    HT = Nm();

  function Sn(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
      var n = e[t];
      this.set(n[0], n[1])
    }
  }
  Sn.prototype.clear = zT;
  Sn.prototype.delete = FT;
  Sn.prototype.get = $T;
  Sn.prototype.has = UT;
  Sn.prototype.set = HT;
  Rm.exports = Sn
});
var qa = I((F4, Lm) => {
  var GT = Sr(),
    KT = Wt(),
    VT = GT(KT, "Map");
  Lm.exports = VT
});
var Wm = I(($4, qm) => {
  var Bm = Sm(),
    XT = Ki(),
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
  function JT(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
  }
  zm.exports = JT
});
var Vi = I((H4, $m) => {
  var QT = Fm();

  function eE(e, t) {
    var r = e.__data__;
    return QT(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map
  }
  $m.exports = eE
});
var Hm = I((G4, Um) => {
  var tE = Vi();

  function rE(e) {
    var t = tE(this, e).delete(e);
    return this.size -= t ? 1 : 0, t
  }
  Um.exports = rE
});
var Km = I((K4, Gm) => {
  var nE = Vi();

  function iE(e) {
    return nE(this, e).get(e)
  }
  Gm.exports = iE
});
var Xm = I((V4, Vm) => {
  var oE = Vi();

  function aE(e) {
    return oE(this, e).has(e)
  }
  Vm.exports = aE
});
var Zm = I((X4, Ym) => {
  var uE = Vi();

  function sE(e, t) {
    var r = uE(this, e),
      n = r.size;
    return r.set(e, t), this.size += r.size == n ? 0 : 1, this
  }
  Ym.exports = sE
});
var Wa = I((Y4, Jm) => {
  var lE = Wm(),
    cE = Hm(),
    fE = Km(),
    pE = Xm(),
    dE = Zm();

  function An(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
      var n = e[t];
      this.set(n[0], n[1])
    }
  }
  An.prototype.clear = lE;
  An.prototype.delete = cE;
  An.prototype.get = fE;
  An.prototype.has = pE;
  An.prototype.set = dE;
  Jm.exports = An
});
var Tl = I((Z4, eh) => {
  var Qm = Wa(),
    mE = "Expected a function";

  function Pl(e, t) {
    if (typeof e != "function" || t != null && typeof t != "function") throw new TypeError(mE);
    var r = function() {
      var n = arguments,
        i = t ? t.apply(this, n) : n[0],
        o = r.cache;
      if (o.has(i)) return o.get(i);
      var a = e.apply(this, n);
      return r.cache = o.set(i, a) || o, a
    };
    return r.cache = new(Pl.Cache || Qm), r
  }
  Pl.Cache = Qm;
  eh.exports = Pl
});
var rh = I((J4, th) => {
  var hE = Tl(),
    yE = 500;

  function vE(e) {
    var t = hE(e, function(n) {
        return r.size === yE && r.clear(), n
      }),
      r = t.cache;
    return t
  }
  th.exports = vE
});
var ih = I((Q4, nh) => {
  var gE = rh(),
    bE = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    xE = /\\(\\)?/g,
    wE = gE(function(e) {
      var t = [];
      return e.charCodeAt(0) === 46 && t.push(""), e.replace(bE, function(r, n, i, o) {
        t.push(i ? o.replace(xE, "$1") : n || r)
      }), t
    });
  nh.exports = wE
});
var za = I((eH, oh) => {
  function OE(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n;) i[r] = t(e[r], r, e);
    return i
  }
  oh.exports = OE
});
var fh = I((tH, ch) => {
  var ah = wn(),
    SE = za(),
    AE = at(),
    _E = qr(),
    PE = 1 / 0,
    uh = ah ? ah.prototype : void 0,
    sh = uh ? uh.toString : void 0;

  function lh(e) {
    if (typeof e == "string") return e;
    if (AE(e)) return SE(e, lh) + "";
    if (_E(e)) return sh ? sh.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -PE ? "-0" : t
  }
  ch.exports = lh
});
var El = I((rH, ph) => {
  var TE = fh();

  function EE(e) {
    return e == null ? "" : TE(e)
  }
  ph.exports = EE
});
var jl = I((nH, dh) => {
  var jE = at(),
    ME = La(),
    CE = ih(),
    IE = El();

  function kE(e, t) {
    return jE(e) ? e : ME(e, t) ? [e] : CE(IE(e))
  }
  dh.exports = kE
});
var Xi = I((iH, mh) => {
  var DE = qr(),
    NE = 1 / 0;

  function RE(e) {
    if (typeof e == "string" || DE(e)) return e;
    var t = e + "";
    return t == "0" && 1 / e == -NE ? "-0" : t
  }
  mh.exports = RE
});
var Fa = I((oH, hh) => {
  var LE = jl(),
    BE = Xi();

  function qE(e, t) {
    t = LE(t, e);
    for (var r = 0, n = t.length; e != null && r < n;) e = e[BE(t[r++])];
    return r && r == n ? e : void 0
  }
  hh.exports = qE
});
var Wr = I((aH, yh) => {
  var WE = Fa();

  function zE(e, t, r) {
    var n = e == null ? void 0 : WE(e, t);
    return n === void 0 ? r : n
  }
  yh.exports = zE
});
var Tt = I((uH, vh) => {
  function FE(e) {
    return e == null
  }
  vh.exports = FE
});
var $a = I((sH, gh) => {
  var $E = Zt(),
    UE = at(),
    HE = Jt(),
    GE = "[object String]";

  function KE(e) {
    return typeof e == "string" || !UE(e) && HE(e) && $E(e) == GE
  }
  gh.exports = KE
});
var xh = I(_e => {
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

  function Et(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case Ml:
          switch (e = e.type, e) {
            case Ua:
            case Ga:
            case Ha:
            case Ya:
            case Za:
              return e;
            default:
              switch (e = e && e.$$typeof, e) {
                case VE:
                case Va:
                case Xa:
                case Qa:
                case Ja:
                case Ka:
                  return e;
                default:
                  return t
              }
          }
        case Cl:
          return t
      }
    }
  }
  _e.ContextConsumer = Va;
  _e.ContextProvider = Ka;
  _e.Element = Ml;
  _e.ForwardRef = Xa;
  _e.Fragment = Ua;
  _e.Lazy = Qa;
  _e.Memo = Ja;
  _e.Portal = Cl;
  _e.Profiler = Ga;
  _e.StrictMode = Ha;
  _e.Suspense = Ya;
  _e.SuspenseList = Za;
  _e.isAsyncMode = function() {
    return !1
  };
  _e.isConcurrentMode = function() {
    return !1
  };
  _e.isContextConsumer = function(e) {
    return Et(e) === Va
  };
  _e.isContextProvider = function(e) {
    return Et(e) === Ka
  };
  _e.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Ml
  };
  _e.isForwardRef = function(e) {
    return Et(e) === Xa
  };
  _e.isFragment = function(e) {
    return Et(e) === Ua
  };
  _e.isLazy = function(e) {
    return Et(e) === Qa
  };
  _e.isMemo = function(e) {
    return Et(e) === Ja
  };
  _e.isPortal = function(e) {
    return Et(e) === Cl
  };
  _e.isProfiler = function(e) {
    return Et(e) === Ga
  };
  _e.isStrictMode = function(e) {
    return Et(e) === Ha
  };
  _e.isSuspense = function(e) {
    return Et(e) === Ya
  };
  _e.isSuspenseList = function(e) {
    return Et(e) === Za
  };
  _e.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === Ua || e === Ga || e === Ha || e === Ya || e === Za || e === XE || typeof e == "object" && e !== null && (e.$$typeof === Qa || e.$$typeof === Ja || e.$$typeof === Ka || e.$$typeof === Va || e.$$typeof === Xa || e.$$typeof === bh || e.getModuleId !== void 0)
  };
  _e.typeOf = Et
});
var Oh = I((cH, wh) => {
  "use strict";
  wh.exports = xh()
});
var Il = I((fH, Sh) => {
  var YE = Zt(),
    ZE = Jt(),
    JE = "[object Number]";

  function QE(e) {
    return typeof e == "number" || ZE(e) && YE(e) == JE
  }
  Sh.exports = QE
});
var kl = I((pH, Ah) => {
  var ej = Il();

  function tj(e) {
    return ej(e) && e != +e
  }
  Ah.exports = tj
});
var Gh = I((CH, Hh) => {
  function xj(e, t, r) {
    var n = -1,
      i = e.length;
    t < 0 && (t = -t > i ? 0 : i + t), r = r > i ? i : r, r < 0 && (r += i), i = t > r ? 0 : r - t >>> 0, t >>>= 0;
    for (var o = Array(i); ++n < i;) o[n] = e[n + t];
    return o
  }
  Hh.exports = xj
});
var Vh = I((IH, Kh) => {
  var wj = Gh();

  function Oj(e, t, r) {
    var n = e.length;
    return r = r === void 0 ? n : r, !t && r >= n ? e : wj(e, t, r)
  }
  Kh.exports = Oj
});
var Kl = I((kH, Xh) => {
  var Sj = "\\ud800-\\udfff",
    Aj = "\\u0300-\\u036f",
    _j = "\\ufe20-\\ufe2f",
    Pj = "\\u20d0-\\u20ff",
    Tj = Aj + _j + Pj,
    Ej = "\\ufe0e\\ufe0f",
    jj = "\\u200d",
    Mj = RegExp("[" + jj + Sj + Tj + Ej + "]");

  function Cj(e) {
    return Mj.test(e)
  }
  Xh.exports = Cj
});
var Zh = I((DH, Yh) => {
  function Ij(e) {
    return e.split("")
  }
  Yh.exports = Ij
});
var oy = I((NH, iy) => {
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
    ey = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    ty = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    Wj = "\\u200d",
    ry = qj + "?",
    ny = "[" + Lj + "]?",
    zj = "(?:" + Wj + "(?:" + [Qh, ey, ty].join("|") + ")" + ny + ry + ")*",
    Fj = ny + ry + zj,
    $j = "(?:" + [Qh + Vl + "?", Vl, ey, ty, Bj].join("|") + ")",
    Uj = RegExp(Xl + "(?=" + Xl + ")|" + $j + Fj, "g");

  function Hj(e) {
    return e.match(Uj) || []
  }
  iy.exports = Hj
});
var uy = I((RH, ay) => {
  var Gj = Zh(),
    Kj = Kl(),
    Vj = oy();

  function Xj(e) {
    return Kj(e) ? Vj(e) : Gj(e)
  }
  ay.exports = Xj
});
var ly = I((LH, sy) => {
  var Yj = Vh(),
    Zj = Kl(),
    Jj = uy(),
    Qj = El();

  function eM(e) {
    return function(t) {
      t = Qj(t);
      var r = Zj(t) ? Jj(t) : void 0,
        n = r ? r[0] : t.charAt(0),
        i = r ? Yj(r, 1).join("") : t.slice(1);
      return n[e]() + i
    }
  }
  sy.exports = eM
});
var nu = I((BH, cy) => {
  var tM = ly(),
    rM = tM("toUpperCase");
  cy.exports = rM
});
var Ny = I((FG, Dy) => {
  var kM = Ki();

  function DM() {
    this.__data__ = new kM, this.size = 0
  }
  Dy.exports = DM
});
var Ly = I(($G, Ry) => {
  function NM(e) {
    var t = this.__data__,
      r = t.delete(e);
    return this.size = t.size, r
  }
  Ry.exports = NM
});
var qy = I((UG, By) => {
  function RM(e) {
    return this.__data__.get(e)
  }
  By.exports = RM
});
var zy = I((HG, Wy) => {
  function LM(e) {
    return this.__data__.has(e)
  }
  Wy.exports = LM
});
var $y = I((GG, Fy) => {
  var BM = Ki(),
    qM = qa(),
    WM = Wa(),
    zM = 200;

  function FM(e, t) {
    var r = this.__data__;
    if (r instanceof BM) {
      var n = r.__data__;
      if (!qM || n.length < zM - 1) return n.push([e, t]), this.size = ++r.size, this;
      r = this.__data__ = new WM(n)
    }
    return r.set(e, t), this.size = r.size, this
  }
  Fy.exports = FM
});
var jc = I((KG, Uy) => {
  var $M = Ki(),
    UM = Ny(),
    HM = Ly(),
    GM = qy(),
    KM = zy(),
    VM = $y();

  function Ln(e) {
    var t = this.__data__ = new $M(e);
    this.size = t.size
  }
  Ln.prototype.clear = UM;
  Ln.prototype.delete = HM;
  Ln.prototype.get = GM;
  Ln.prototype.has = KM;
  Ln.prototype.set = VM;
  Uy.exports = Ln
});
var Gy = I((VG, Hy) => {
  var XM = "__lodash_hash_undefined__";

  function YM(e) {
    return this.__data__.set(e, XM), this
  }
  Hy.exports = YM
});
var Vy = I((XG, Ky) => {
  function ZM(e) {
    return this.__data__.has(e)
  }
  Ky.exports = ZM
});
var Mc = I((YG, Xy) => {
  var JM = Wa(),
    QM = Gy(),
    eC = Vy();

  function pu(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.__data__ = new JM; ++t < r;) this.add(e[t])
  }
  pu.prototype.add = pu.prototype.push = QM;
  pu.prototype.has = eC;
  Xy.exports = pu
});
var Cc = I((ZG, Yy) => {
  function tC(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n;)
      if (t(e[r], r, e)) return !0;
    return !1
  }
  Yy.exports = tC
});
var Ic = I((JG, Zy) => {
  function rC(e, t) {
    return e.has(t)
  }
  Zy.exports = rC
});
var kc = I((QG, Jy) => {
  var nC = Mc(),
    iC = Cc(),
    oC = Ic(),
    aC = 1,
    uC = 2;

  function sC(e, t, r, n, i, o) {
    var a = r & aC,
      u = e.length,
      s = t.length;
    if (u != s && !(a && s > u)) return !1;
    var l = o.get(e),
      f = o.get(t);
    if (l && f) return l == t && f == e;
    var c = -1,
      p = !0,
      d = r & uC ? new nC : void 0;
    for (o.set(e, t), o.set(t, e); ++c < u;) {
      var y = e[c],
        m = t[c];
      if (n) var v = a ? n(m, y, c, t, e, o) : n(y, m, c, e, t, o);
      if (v !== void 0) {
        if (v) continue;
        p = !1;
        break
      }
      if (d) {
        if (!iC(t, function(x, w) {
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
    return o.delete(e), o.delete(t), p
  }
  Jy.exports = sC
});
var ev = I((e7, Qy) => {
  var lC = Wt(),
    cC = lC.Uint8Array;
  Qy.exports = cC
});
var rv = I((t7, tv) => {
  function fC(e) {
    var t = -1,
      r = Array(e.size);
    return e.forEach(function(n, i) {
      r[++t] = [i, n]
    }), r
  }
  tv.exports = fC
});
var du = I((r7, nv) => {
  function pC(e) {
    var t = -1,
      r = Array(e.size);
    return e.forEach(function(n) {
      r[++t] = n
    }), r
  }
  nv.exports = pC
});
var sv = I((n7, uv) => {
  var iv = wn(),
    ov = ev(),
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

  function MC(e, t, r, n, i, o, a) {
    switch (r) {
      case jC:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
        e = e.buffer, t = t.buffer;
      case EC:
        return !(e.byteLength != t.byteLength || !o(new ov(e), new ov(t)));
      case bC:
      case xC:
      case SC:
        return dC(+e, +t);
      case wC:
        return e.name == t.name && e.message == t.message;
      case AC:
      case PC:
        return e == t + "";
      case OC:
        var u = hC;
      case _C:
        var s = n & vC;
        if (u || (u = yC), e.size != t.size && !s) return !1;
        var l = a.get(e);
        if (l) return l == t;
        n |= gC, a.set(e, t);
        var f = mC(u(e), u(t), n, i, o, a);
        return a.delete(e), f;
      case TC:
        if (Dc) return Dc.call(e) == Dc.call(t)
    }
    return !1
  }
  uv.exports = MC
});
var Nc = I((i7, lv) => {
  function CC(e, t) {
    for (var r = -1, n = t.length, i = e.length; ++r < n;) e[i + r] = t[r];
    return e
  }
  lv.exports = CC
});
var fv = I((o7, cv) => {
  var IC = Nc(),
    kC = at();

  function DC(e, t, r) {
    var n = t(e);
    return kC(e) ? n : IC(n, r(e))
  }
  cv.exports = DC
});
var dv = I((a7, pv) => {
  function NC(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n;) {
      var a = e[r];
      t(a, r, e) && (o[i++] = a)
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
    zC = yv ? function(e) {
      return e == null ? [] : (e = Object(e), LC(yv(e), function(t) {
        return WC.call(e, t)
      }))
    } : BC;
  vv.exports = zC
});
var xv = I((l7, bv) => {
  function FC(e, t) {
    for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
    return n
  }
  bv.exports = FC
});
var Ov = I((c7, wv) => {
  var $C = Zt(),
    UC = Jt(),
    HC = "[object Arguments]";

  function GC(e) {
    return UC(e) && $C(e) == HC
  }
  wv.exports = GC
});
var mu = I((f7, _v) => {
  var Sv = Ov(),
    KC = Jt(),
    Av = Object.prototype,
    VC = Av.hasOwnProperty,
    XC = Av.propertyIsEnumerable,
    YC = Sv(function() {
      return arguments
    }()) ? Sv : function(e) {
      return KC(e) && VC.call(e, "callee") && !XC.call(e, "callee")
    };
  _v.exports = YC
});
var Tv = I((p7, Pv) => {
  function ZC() {
    return !1
  }
  Pv.exports = ZC
});
var Rc = I((ro, Bn) => {
  var JC = Wt(),
    QC = Tv(),
    Mv = typeof ro == "object" && ro && !ro.nodeType && ro,
    Ev = Mv && typeof Bn == "object" && Bn && !Bn.nodeType && Bn,
    eI = Ev && Ev.exports === Mv,
    jv = eI ? JC.Buffer : void 0,
    tI = jv ? jv.isBuffer : void 0,
    rI = tI || QC;
  Bn.exports = rI
});
var hu = I((d7, Cv) => {
  var nI = 9007199254740991,
    iI = /^(?:0|[1-9]\d*)$/;

  function oI(e, t) {
    var r = typeof e;
    return t = t ?? nI, !!t && (r == "number" || r != "symbol" && iI.test(e)) && e > -1 && e % 1 == 0 && e < t
  }
  Cv.exports = oI
});
var yu = I((m7, Iv) => {
  var aI = 9007199254740991;

  function uI(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= aI
  }
  Iv.exports = uI
});
var Dv = I((h7, kv) => {
  var sI = Zt(),
    lI = yu(),
    cI = Jt(),
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
    Ce = {};
  Ce[PI] = Ce[TI] = Ce[EI] = Ce[jI] = Ce[MI] = Ce[CI] = Ce[II] = Ce[kI] = Ce[DI] = !0;
  Ce[fI] = Ce[pI] = Ce[AI] = Ce[dI] = Ce[_I] = Ce[mI] = Ce[hI] = Ce[yI] = Ce[vI] = Ce[gI] = Ce[bI] = Ce[xI] = Ce[wI] = Ce[OI] = Ce[SI] = !1;

  function NI(e) {
    return cI(e) && lI(e.length) && !!Ce[sI(e)]
  }
  kv.exports = NI
});
var Lc = I((y7, Nv) => {
  function RI(e) {
    return function(t) {
      return e(t)
    }
  }
  Nv.exports = RI
});
var Lv = I((no, qn) => {
  var LI = Sl(),
    Rv = typeof no == "object" && no && !no.nodeType && no,
    io = Rv && typeof qn == "object" && qn && !qn.nodeType && qn,
    BI = io && io.exports === Rv,
    Bc = BI && LI.process,
    qI = function() {
      try {
        var e = io && io.require && io.require("util").types;
        return e || Bc && Bc.binding && Bc.binding("util")
      } catch {}
    }();
  qn.exports = qI
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
    HI = at(),
    GI = Rc(),
    KI = hu(),
    VI = qc(),
    XI = Object.prototype,
    YI = XI.hasOwnProperty;

  function ZI(e, t) {
    var r = HI(e),
      n = !r && UI(e),
      i = !r && !n && GI(e),
      o = !r && !n && !i && VI(e),
      a = r || n || i || o,
      u = a ? $I(e.length, String) : [],
      s = u.length;
    for (var l in e)(t || YI.call(e, l)) && !(a && (l == "length" || i && (l == "offset" || l == "parent") || o && (l == "buffer" || l == "byteLength" || l == "byteOffset") || KI(l, s))) && u.push(l);
    return u
  }
  zv.exports = ZI
});
var Uv = I((b7, $v) => {
  var JI = Object.prototype;

  function QI(e) {
    var t = e && e.constructor,
      r = typeof t == "function" && t.prototype || JI;
    return e === r
  }
  $v.exports = QI
});
var Wc = I((x7, Hv) => {
  function ek(e, t) {
    return function(r) {
      return e(t(r))
    }
  }
  Hv.exports = ek
});
var Kv = I((w7, Gv) => {
  var tk = Wc(),
    rk = tk(Object.keys, Object);
  Gv.exports = rk
});
var Xv = I((O7, Vv) => {
  var nk = Uv(),
    ik = Kv(),
    ok = Object.prototype,
    ak = ok.hasOwnProperty;

  function uk(e) {
    if (!nk(e)) return ik(e);
    var t = [];
    for (var r in Object(e)) ak.call(e, r) && r != "constructor" && t.push(r);
    return t
  }
  Vv.exports = uk
});
var Wn = I((S7, Yv) => {
  var sk = Le(),
    lk = yu();

  function ck(e) {
    return e != null && lk(e.length) && !sk(e)
  }
  Yv.exports = ck
});
var oo = I((A7, Zv) => {
  var fk = Fv(),
    pk = Xv(),
    dk = Wn();

  function mk(e) {
    return dk(e) ? fk(e) : pk(e)
  }
  Zv.exports = mk
});
var Qv = I((_7, Jv) => {
  var hk = fv(),
    yk = gv(),
    vk = oo();

  function gk(e) {
    return hk(e, vk, yk)
  }
  Jv.exports = gk
});
var rg = I((P7, tg) => {
  var eg = Qv(),
    bk = 1,
    xk = Object.prototype,
    wk = xk.hasOwnProperty;

  function Ok(e, t, r, n, i, o) {
    var a = r & bk,
      u = eg(e),
      s = u.length,
      l = eg(t),
      f = l.length;
    if (s != f && !a) return !1;
    for (var c = s; c--;) {
      var p = u[c];
      if (!(a ? p in t : wk.call(t, p))) return !1
    }
    var d = o.get(e),
      y = o.get(t);
    if (d && y) return d == t && y == e;
    var m = !0;
    o.set(e, t), o.set(t, e);
    for (var v = a; ++c < s;) {
      p = u[c];
      var x = e[p],
        w = t[p];
      if (n) var S = a ? n(w, x, p, t, e, o) : n(x, w, p, e, t, o);
      if (!(S === void 0 ? x === w || i(x, w, r, n, o) : S)) {
        m = !1;
        break
      }
      v || (v = p == "constructor")
    }
    if (m && !v) {
      var P = e.constructor,
        h = t.constructor;
      P != h && "constructor" in e && "constructor" in t && !(typeof P == "function" && P instanceof P && typeof h == "function" && h instanceof h) && (m = !1)
    }
    return o.delete(e), o.delete(t), m
  }
  tg.exports = Ok
});
var ig = I((T7, ng) => {
  var Sk = Sr(),
    Ak = Wt(),
    _k = Sk(Ak, "DataView");
  ng.exports = _k
});
var ag = I((E7, og) => {
  var Pk = Sr(),
    Tk = Wt(),
    Ek = Pk(Tk, "Promise");
  og.exports = Ek
});
var zc = I((j7, ug) => {
  var jk = Sr(),
    Mk = Wt(),
    Ck = jk(Mk, "Set");
  ug.exports = Ck
});
var lg = I((M7, sg) => {
  var Ik = Sr(),
    kk = Wt(),
    Dk = Ik(kk, "WeakMap");
  sg.exports = Dk
});
var vg = I((C7, yg) => {
  var Fc = ig(),
    $c = qa(),
    Uc = ag(),
    Hc = zc(),
    Gc = lg(),
    hg = Zt(),
    zn = _l(),
    cg = "[object Map]",
    Nk = "[object Object]",
    fg = "[object Promise]",
    pg = "[object Set]",
    dg = "[object WeakMap]",
    mg = "[object DataView]",
    Rk = zn(Fc),
    Lk = zn($c),
    Bk = zn(Uc),
    qk = zn(Hc),
    Wk = zn(Gc),
    Gr = hg;
  (Fc && Gr(new Fc(new ArrayBuffer(1))) != mg || $c && Gr(new $c) != cg || Uc && Gr(Uc.resolve()) != fg || Hc && Gr(new Hc) != pg || Gc && Gr(new Gc) != dg) && (Gr = function(e) {
    var t = hg(e),
      r = t == Nk ? e.constructor : void 0,
      n = r ? zn(r) : "";
    if (n) switch (n) {
      case Rk:
        return mg;
      case Lk:
        return cg;
      case Bk:
        return fg;
      case qk:
        return pg;
      case Wk:
        return dg
    }
    return t
  });
  yg.exports = Gr
});
var _g = I((I7, Ag) => {
  var Kc = jc(),
    zk = kc(),
    Fk = sv(),
    $k = rg(),
    gg = vg(),
    bg = at(),
    xg = Rc(),
    Uk = qc(),
    Hk = 1,
    wg = "[object Arguments]",
    Og = "[object Array]",
    vu = "[object Object]",
    Gk = Object.prototype,
    Sg = Gk.hasOwnProperty;

  function Kk(e, t, r, n, i, o) {
    var a = bg(e),
      u = bg(t),
      s = a ? Og : gg(e),
      l = u ? Og : gg(t);
    s = s == wg ? vu : s, l = l == wg ? vu : l;
    var f = s == vu,
      c = l == vu,
      p = s == l;
    if (p && xg(e)) {
      if (!xg(t)) return !1;
      a = !0, f = !1
    }
    if (p && !f) return o || (o = new Kc), a || Uk(e) ? zk(e, t, r, n, i, o) : Fk(e, t, s, r, n, i, o);
    if (!(r & Hk)) {
      var d = f && Sg.call(e, "__wrapped__"),
        y = c && Sg.call(t, "__wrapped__");
      if (d || y) {
        var m = d ? e.value() : e,
          v = y ? t.value() : t;
        return o || (o = new Kc), i(m, v, r, n, o)
      }
    }
    return p ? (o || (o = new Kc), $k(e, t, r, n, i, o)) : !1
  }
  Ag.exports = Kk
});
var gu = I((k7, Eg) => {
  var Vk = _g(),
    Pg = Jt();

  function Tg(e, t, r, n, i) {
    return e === t ? !0 : e == null || t == null || !Pg(e) && !Pg(t) ? e !== e && t !== t : Vk(e, t, r, n, Tg, i)
  }
  Eg.exports = Tg
});
var Mg = I((D7, jg) => {
  var Xk = jc(),
    Yk = gu(),
    Zk = 1,
    Jk = 2;

  function Qk(e, t, r, n) {
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
        var c = new Xk;
        if (n) var p = n(l, f, s, e, t, c);
        if (!(p === void 0 ? Yk(f, l, Zk | Jk, n, c) : p)) return !1
      }
    }
    return !0
  }
  jg.exports = Qk
});
var Vc = I((N7, Cg) => {
  var e2 = Pt();

  function t2(e) {
    return e === e && !e2(e)
  }
  Cg.exports = t2
});
var kg = I((R7, Ig) => {
  var r2 = Vc(),
    n2 = oo();

  function i2(e) {
    for (var t = n2(e), r = t.length; r--;) {
      var n = t[r],
        i = e[n];
      t[r] = [n, i, r2(i)]
    }
    return t
  }
  Ig.exports = i2
});
var Xc = I((L7, Dg) => {
  function o2(e, t) {
    return function(r) {
      return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r))
    }
  }
  Dg.exports = o2
});
var Rg = I((B7, Ng) => {
  var a2 = Mg(),
    u2 = kg(),
    s2 = Xc();

  function l2(e) {
    var t = u2(e);
    return t.length == 1 && t[0][2] ? s2(t[0][0], t[0][1]) : function(r) {
      return r === e || a2(r, e, t)
    }
  }
  Ng.exports = l2
});
var Bg = I((q7, Lg) => {
  function c2(e, t) {
    return e != null && t in Object(e)
  }
  Lg.exports = c2
});
var Wg = I((W7, qg) => {
  var f2 = jl(),
    p2 = mu(),
    d2 = at(),
    m2 = hu(),
    h2 = yu(),
    y2 = Xi();

  function v2(e, t, r) {
    t = f2(t, e);
    for (var n = -1, i = t.length, o = !1; ++n < i;) {
      var a = y2(t[n]);
      if (!(o = e != null && r(e, a))) break;
      e = e[a]
    }
    return o || ++n != i ? o : (i = e == null ? 0 : e.length, !!i && h2(i) && m2(a, i) && (d2(e) || p2(e)))
  }
  qg.exports = v2
});
var Fg = I((z7, zg) => {
  var g2 = Bg(),
    b2 = Wg();

  function x2(e, t) {
    return e != null && b2(e, t, g2)
  }
  zg.exports = x2
});
var Ug = I((F7, $g) => {
  var w2 = gu(),
    O2 = Wr(),
    S2 = Fg(),
    A2 = La(),
    _2 = Vc(),
    P2 = Xc(),
    T2 = Xi(),
    E2 = 1,
    j2 = 2;

  function M2(e, t) {
    return A2(e) && _2(t) ? P2(T2(e), t) : function(r) {
      var n = O2(r, e);
      return n === void 0 && n === t ? S2(r, e) : w2(t, n, E2 | j2)
    }
  }
  $g.exports = M2
});
var Kr = I(($7, Hg) => {
  function C2(e) {
    return e
  }
  Hg.exports = C2
});
var Kg = I((U7, Gg) => {
  function I2(e) {
    return function(t) {
      return t?.[e]
    }
  }
  Gg.exports = I2
});
var Xg = I((H7, Vg) => {
  var k2 = Fa();

  function D2(e) {
    return function(t) {
      return k2(t, e)
    }
  }
  Vg.exports = D2
});
var Zg = I((G7, Yg) => {
  var N2 = Kg(),
    R2 = Xg(),
    L2 = La(),
    B2 = Xi();

  function q2(e) {
    return L2(e) ? N2(B2(e)) : R2(e)
  }
  Yg.exports = q2
});
var mr = I((K7, Jg) => {
  var W2 = Rg(),
    z2 = Ug(),
    F2 = Kr(),
    $2 = at(),
    U2 = Zg();

  function H2(e) {
    return typeof e == "function" ? e : e == null ? F2 : typeof e == "object" ? $2(e) ? z2(e[0], e[1]) : W2(e) : U2(e)
  }
  Jg.exports = H2
});
var Yc = I((V7, Qg) => {
  function G2(e, t, r, n) {
    for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
      if (t(e[o], o, e)) return o;
    return -1
  }
  Qg.exports = G2
});
var tb = I((X7, eb) => {
  function K2(e) {
    return e !== e
  }
  eb.exports = K2
});
var nb = I((Y7, rb) => {
  function V2(e, t, r) {
    for (var n = r - 1, i = e.length; ++n < i;)
      if (e[n] === t) return n;
    return -1
  }
  rb.exports = V2
});
var ob = I((Z7, ib) => {
  var X2 = Yc(),
    Y2 = tb(),
    Z2 = nb();

  function J2(e, t, r) {
    return t === t ? Z2(e, t, r) : X2(e, Y2, r)
  }
  ib.exports = J2
});
var ub = I((J7, ab) => {
  var Q2 = ob();

  function eD(e, t) {
    var r = e == null ? 0 : e.length;
    return !!r && Q2(e, t, 0) > -1
  }
  ab.exports = eD
});
var lb = I((Q7, sb) => {
  function tD(e, t, r) {
    for (var n = -1, i = e == null ? 0 : e.length; ++n < i;)
      if (r(t, e[n])) return !0;
    return !1
  }
  sb.exports = tD
});
var fb = I((eK, cb) => {
  function rD() {}
  cb.exports = rD
});
var db = I((tK, pb) => {
  var Zc = zc(),
    nD = fb(),
    iD = du(),
    oD = 1 / 0,
    aD = Zc && 1 / iD(new Zc([, -0]))[1] == oD ? function(e) {
      return new Zc(e)
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

  function mD(e, t, r) {
    var n = -1,
      i = sD,
      o = e.length,
      a = !0,
      u = [],
      s = u;
    if (r) a = !1, i = lD;
    else if (o >= dD) {
      var l = t ? null : fD(e);
      if (l) return pD(l);
      a = !1, i = cD, s = new uD
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
  mb.exports = mD
});
var vb = I((nK, yb) => {
  var hD = mr(),
    yD = hb();

  function vD(e, t) {
    return e && e.length ? yD(e, hD(t, 2)) : []
  }
  yb.exports = vD
});
var Tb = I((cK, Pb) => {
  var Ab = wn(),
    CD = mu(),
    ID = at(),
    _b = Ab ? Ab.isConcatSpreadable : void 0;

  function kD(e) {
    return ID(e) || CD(e) || !!(_b && e && e[_b])
  }
  Pb.exports = kD
});
var ef = I((fK, jb) => {
  var DD = Nc(),
    ND = Tb();

  function Eb(e, t, r, n, i) {
    var o = -1,
      a = e.length;
    for (r || (r = ND), i || (i = []); ++o < a;) {
      var u = e[o];
      t > 0 && r(u) ? t > 1 ? Eb(u, t - 1, r, n, i) : DD(i, u) : n || (i[i.length] = u)
    }
    return i
  }
  jb.exports = Eb
});
var Cb = I((pK, Mb) => {
  function RD(e) {
    return function(t, r, n) {
      for (var i = -1, o = Object(t), a = n(t), u = a.length; u--;) {
        var s = a[e ? u : ++i];
        if (r(o[s], s, o) === !1) break
      }
      return t
    }
  }
  Mb.exports = RD
});
var kb = I((dK, Ib) => {
  var LD = Cb(),
    BD = LD();
  Ib.exports = BD
});
var tf = I((mK, Db) => {
  var qD = kb(),
    WD = oo();

  function zD(e, t) {
    return e && qD(e, t, WD)
  }
  Db.exports = zD
});
var Rb = I((hK, Nb) => {
  var FD = Wn();

  function $D(e, t) {
    return function(r, n) {
      if (r == null) return r;
      if (!FD(r)) return e(r, n);
      for (var i = r.length, o = t ? i : -1, a = Object(r);
        (t ? o-- : ++o < i) && n(a[o], o, a) !== !1;);
      return r
    }
  }
  Nb.exports = $D
});
var Ou = I((yK, Lb) => {
  var UD = tf(),
    HD = Rb(),
    GD = HD(UD);
  Lb.exports = GD
});
var rf = I((vK, Bb) => {
  var KD = Ou(),
    VD = Wn();

  function XD(e, t) {
    var r = -1,
      n = VD(e) ? Array(e.length) : [];
    return KD(e, function(i, o, a) {
      n[++r] = t(i, o, a)
    }), n
  }
  Bb.exports = XD
});
var Wb = I((gK, qb) => {
  function YD(e, t) {
    var r = e.length;
    for (e.sort(t); r--;) e[r] = e[r].value;
    return e
  }
  qb.exports = YD
});
var $b = I((bK, Fb) => {
  var zb = qr();

  function ZD(e, t) {
    if (e !== t) {
      var r = e !== void 0,
        n = e === null,
        i = e === e,
        o = zb(e),
        a = t !== void 0,
        u = t === null,
        s = t === t,
        l = zb(t);
      if (!u && !l && !o && e > t || o && a && s && !u && !l || n && a && s || !r && s || !i) return 1;
      if (!n && !o && !l && e < t || l && r && i && !n && !o || u && r && i || !a && i || !s) return -1
    }
    return 0
  }
  Fb.exports = ZD
});
var Hb = I((xK, Ub) => {
  var JD = $b();

  function QD(e, t, r) {
    for (var n = -1, i = e.criteria, o = t.criteria, a = i.length, u = r.length; ++n < a;) {
      var s = JD(i[n], o[n]);
      if (s) {
        if (n >= u) return s;
        var l = r[n];
        return s * (l == "desc" ? -1 : 1)
      }
    }
    return e.index - t.index
  }
  Ub.exports = QD
});
var Kb = I((wK, Gb) => {
  var nf = za(),
    eN = Fa(),
    tN = mr(),
    rN = rf(),
    nN = Wb(),
    iN = Lc(),
    oN = Hb(),
    aN = Kr(),
    uN = at();

  function sN(e, t, r) {
    t.length ? t = nf(t, function(o) {
      return uN(o) ? function(a) {
        return eN(a, o.length === 1 ? o[0] : o)
      } : o
    }) : t = [aN];
    var n = -1;
    t = nf(t, iN(tN));
    var i = rN(e, function(o, a, u) {
      var s = nf(t, function(l) {
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
  function lN(e, t, r) {
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
  Vb.exports = lN
});
var Jb = I((SK, Zb) => {
  var cN = Xb(),
    Yb = Math.max;

  function fN(e, t, r) {
    return t = Yb(t === void 0 ? e.length - 1 : t, 0),
      function() {
        for (var n = arguments, i = -1, o = Yb(n.length - t, 0), a = Array(o); ++i < o;) a[i] = n[t + i];
        i = -1;
        for (var u = Array(t + 1); ++i < t;) u[i] = n[i];
        return u[t] = r(a), cN(e, this, u)
      }
  }
  Zb.exports = fN
});
var ex = I((AK, Qb) => {
  function pN(e) {
    return function() {
      return e
    }
  }
  Qb.exports = pN
});
var of = I((_K, tx) => {
  var dN = Sr(),
    mN = function() {
      try {
        var e = dN(Object, "defineProperty");
        return e({}, "", {}), e
      } catch {}
    }();
  tx.exports = mN
});
var ix = I((PK, nx) => {
  var hN = ex(),
    rx = of(),
    yN = Kr(),
    vN = rx ? function(e, t) {
      return rx(e, "toString", {
        configurable: !0,
        enumerable: !1,
        value: hN(t),
        writable: !0
      })
    } : yN;
  nx.exports = vN
});
var ax = I((TK, ox) => {
  var gN = 800,
    bN = 16,
    xN = Date.now;

  function wN(e) {
    var t = 0,
      r = 0;
    return function() {
      var n = xN(),
        i = bN - (n - r);
      if (r = n, i > 0) {
        if (++t >= gN) return arguments[0]
      } else t = 0;
      return e.apply(void 0, arguments)
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
  var _N = Kr(),
    PN = Jb(),
    TN = sx();

  function EN(e, t) {
    return TN(PN(e, t, _N), e + "")
  }
  lx.exports = EN
});
var uo = I((MK, fx) => {
  var jN = Ba(),
    MN = Wn(),
    CN = hu(),
    IN = Pt();

  function kN(e, t, r) {
    if (!IN(r)) return !1;
    var n = typeof t;
    return (n == "number" ? MN(r) && CN(t, r.length) : n == "string" && t in r) ? jN(r[t], e) : !1
  }
  fx.exports = kN
});
var Su = I((CK, dx) => {
  var DN = ef(),
    NN = Kb(),
    RN = cx(),
    px = uo(),
    LN = RN(function(e, t) {
      if (e == null) return [];
      var r = t.length;
      return r > 1 && px(e, t[0], t[1]) ? t = [] : r > 2 && px(t[0], t[1], t[2]) && (t = [t[0]]), NN(e, DN(t, 1), [])
    });
  dx.exports = LN
});
var Dx = I((XK, kx) => {
  var gR = Wt(),
    bR = function() {
      return gR.Date.now()
    };
  kx.exports = bR
});
var Rx = I((YK, Nx) => {
  var xR = /\s/;

  function wR(e) {
    for (var t = e.length; t-- && xR.test(e.charAt(t)););
    return t
  }
  Nx.exports = wR
});
var Bx = I((ZK, Lx) => {
  var OR = Rx(),
    SR = /^\s+/;

  function AR(e) {
    return e && e.slice(0, OR(e) + 1).replace(SR, "")
  }
  Lx.exports = AR
});
var pf = I((JK, zx) => {
  var _R = Bx(),
    qx = Pt(),
    PR = qr(),
    Wx = NaN,
    TR = /^[-+]0x[0-9a-f]+$/i,
    ER = /^0b[01]+$/i,
    jR = /^0o[0-7]+$/i,
    MR = parseInt;

  function CR(e) {
    if (typeof e == "number") return e;
    if (PR(e)) return Wx;
    if (qx(e)) {
      var t = typeof e.valueOf == "function" ? e.valueOf() : e;
      e = qx(t) ? t + "" : t
    }
    if (typeof e != "string") return e === 0 ? e : +e;
    e = _R(e);
    var r = ER.test(e);
    return r || jR.test(e) ? MR(e.slice(2), r ? 2 : 8) : TR.test(e) ? Wx : +e
  }
  zx.exports = CR
});
var Ux = I((QK, $x) => {
  var IR = Pt(),
    df = Dx(),
    Fx = pf(),
    kR = "Expected a function",
    DR = Math.max,
    NR = Math.min;

  function RR(e, t, r) {
    var n, i, o, a, u, s, l = 0,
      f = !1,
      c = !1,
      p = !0;
    if (typeof e != "function") throw new TypeError(kR);
    t = Fx(t) || 0, IR(r) && (f = !!r.leading, c = "maxWait" in r, o = c ? DR(Fx(r.maxWait) || 0, t) : o, p = "trailing" in r ? !!r.trailing : p);

    function d(g) {
      var _ = n,
        C = i;
      return n = i = void 0, l = g, a = e.apply(C, _), a
    }

    function y(g) {
      return l = g, u = setTimeout(x, t), f ? d(g) : a
    }

    function m(g) {
      var _ = g - s,
        C = g - l,
        k = t - _;
      return c ? NR(k, o - C) : k
    }

    function v(g) {
      var _ = g - s,
        C = g - l;
      return s === void 0 || _ >= t || _ < 0 || c && C >= o
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
        if (c) return clearTimeout(u), u = setTimeout(x, t), d(s)
      }
      return u === void 0 && (u = setTimeout(x, t)), a
    }
    return h.cancel = S, h.flush = P, h
  }
  $x.exports = RR
});
var mf = I((eV, Hx) => {
  var LR = Ux(),
    BR = Pt(),
    qR = "Expected a function";

  function WR(e, t, r) {
    var n = !0,
      i = !0;
    if (typeof e != "function") throw new TypeError(qR);
    return BR(r) && (n = "leading" in r ? !!r.leading : n, i = "trailing" in r ? !!r.trailing : i), LR(e, t, {
      leading: n,
      maxWait: t,
      trailing: i
    })
  }
  Hx.exports = WR
});
var ep = I((vQ, Nw) => {
  var Wq = qr();

  function zq(e, t, r) {
    for (var n = -1, i = e.length; ++n < i;) {
      var o = e[n],
        a = t(o);
      if (a != null && (u === void 0 ? a === a && !Wq(a) : r(a, u))) var u = a,
        s = o
    }
    return s
  }
  Nw.exports = zq
});
var Lw = I((gQ, Rw) => {
  function Fq(e, t) {
    return e > t
  }
  Rw.exports = Fq
});
var qw = I((bQ, Bw) => {
  var $q = ep(),
    Uq = Lw(),
    Hq = Kr();

  function Gq(e) {
    return e && e.length ? $q(e, Hq, Uq) : void 0
  }
  Bw.exports = Gq
});
var zw = I((xQ, Ww) => {
  function Kq(e, t) {
    return e < t
  }
  Ww.exports = Kq
});
var $w = I((wQ, Fw) => {
  var Vq = ep(),
    Xq = zw(),
    Yq = Kr();

  function Zq(e) {
    return e && e.length ? Vq(e, Yq, Xq) : void 0
  }
  Fw.exports = Zq
});
var Hw = I((OQ, Uw) => {
  var Jq = za(),
    Qq = mr(),
    eW = rf(),
    tW = at();

  function rW(e, t) {
    var r = tW(e) ? Jq : eW;
    return r(e, Qq(t, 3))
  }
  Uw.exports = rW
});
var Kw = I((SQ, Gw) => {
  var nW = ef(),
    iW = Hw();

  function oW(e, t) {
    return nW(iW(e, t), 1)
  }
  Gw.exports = oW
});
var No = I((AQ, Vw) => {
  var aW = gu();

  function uW(e, t) {
    return aW(e, t)
  }
  Vw.exports = uW
});
var tp = I((Xw, ms) => {
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
      d = 9007199254740991,
      y = u(d / p),
      m = {};
    m.absoluteValue = m.abs = function() {
      var b = new this.constructor(this);
      return b.s && (b.s = 1), b
    }, m.comparedTo = m.cmp = function(b) {
      var O, T, A, j, E = this;
      if (b = new E.constructor(b), E.s !== b.s) return E.s || -b.s;
      if (E.e !== b.e) return E.e > b.e ^ E.s < 0 ? 1 : -1;
      for (A = E.d.length, j = b.d.length, O = 0, T = A < j ? A : j; O < T; ++O)
        if (E.d[O] !== b.d[O]) return E.d[O] > b.d[O] ^ E.s < 0 ? 1 : -1;
      return A === j ? 0 : A > j ^ E.s < 0 ? 1 : -1
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
        j = A.precision,
        E = j + 5;
      if (b === void 0) b = new A(10);
      else if (b = new A(b), b.s < 1 || b.eq(f)) throw Error(i + "NaN");
      if (T.s < 1) throw Error(i + (T.s ? "NaN" : "-Infinity"));
      return T.eq(f) ? new A(0) : (n = !1, O = S(C(T, E), C(b, E), E), n = !0, B(O, j))
    }, m.minus = m.sub = function(b) {
      var O = this;
      return b = new O.constructor(b), O.s == b.s ? W(O, b) : v(O, (b.s = -b.s, b))
    }, m.modulo = m.mod = function(b) {
      var O, T = this,
        A = T.constructor,
        j = A.precision;
      if (b = new A(b), !b.s) throw Error(i + "NaN");
      return T.s ? (n = !1, O = S(T, b, 0, 1).times(b), n = !0, T.minus(O)) : B(new A(T), j)
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
      var O, T, A, j = this;
      if (b !== void 0 && b !== !!b && b !== 1 && b !== 0) throw Error(o + b);
      if (O = h(j) + 1, A = j.d.length - 1, T = A * p + 1, A = j.d[A], A) {
        for (; A % 10 == 0; A /= 10) T--;
        for (A = j.d[0]; A >= 10; A /= 10) T++
      }
      return b && O > T ? O : T
    }, m.squareRoot = m.sqrt = function() {
      var b, O, T, A, j, E, D, L = this,
        G = L.constructor;
      if (L.s < 1) {
        if (!L.s) return new G(0);
        throw Error(i + "NaN")
      }
      for (b = h(L), n = !1, j = Math.sqrt(+L), j == 0 || j == 1 / 0 ? (O = w(L.d), (O.length + b) % 2 == 0 && (O += "0"), j = Math.sqrt(O), b = u((b + 1) / 2) - (b < 0 || b % 2), j == 1 / 0 ? O = "5e" + b : (O = j.toExponential(), O = O.slice(0, O.indexOf("e") + 1) + b), A = new G(O)) : A = new G(j.toString()), T = G.precision, j = D = T + 3;;)
        if (E = A, A = E.plus(S(L, E, D + 2)).times(.5), w(E.d).slice(0, D) === (O = w(A.d)).slice(0, D)) {
          if (O = O.slice(D - 3, D + 1), j == D && O == "4999") {
            if (B(E, T + 1, 0), E.times(E).eq(L)) {
              A = E;
              break
            }
          } else if (O != "9999") break;
          D += 4
        } return n = !0, B(A, T)
    }, m.times = m.mul = function(b) {
      var O, T, A, j, E, D, L, G, Z, J = this,
        ne = J.constructor,
        ye = J.d,
        K = (b = new ne(b)).d;
      if (!J.s || !b.s) return new ne(0);
      for (b.s *= J.s, T = J.e + b.e, G = ye.length, Z = K.length, G < Z && (E = ye, ye = K, K = E, D = G, G = Z, Z = D), E = [], D = G + Z, A = D; A--;) E.push(0);
      for (A = Z; --A >= 0;) {
        for (O = 0, j = G + A; j > A;) L = E[j] + K[A] * ye[j - A - 1] + O, E[j--] = L % c | 0, O = L / c | 0;
        E[j] = (E[j] + O) % c | 0
      }
      for (; !E[--D];) E.pop();
      return O ? ++T : E.shift(), b.d = E, b.e = T, n ? B(b, ne.precision) : b
    }, m.toDecimalPlaces = m.todp = function(b, O) {
      var T = this,
        A = T.constructor;
      return T = new A(T), b === void 0 ? T : (x(b, 0, t), O === void 0 ? O = A.rounding : x(O, 0, 8), B(T, b + h(T) + 1, O))
    }, m.toExponential = function(b, O) {
      var T, A = this,
        j = A.constructor;
      return b === void 0 ? T = R(A, !0) : (x(b, 0, t), O === void 0 ? O = j.rounding : x(O, 0, 8), A = B(new j(A), b + 1, O), T = R(A, !0, b + 1)), T
    }, m.toFixed = function(b, O) {
      var T, A, j = this,
        E = j.constructor;
      return b === void 0 ? R(j) : (x(b, 0, t), O === void 0 ? O = E.rounding : x(O, 0, 8), A = B(new E(j), b + h(j) + 1, O), T = R(A.abs(), !1, b + h(A) + 1), j.isneg() && !j.isZero() ? "-" + T : T)
    }, m.toInteger = m.toint = function() {
      var b = this,
        O = b.constructor;
      return B(new O(b), h(b) + 1, O.rounding)
    }, m.toNumber = function() {
      return +this
    }, m.toPower = m.pow = function(b) {
      var O, T, A, j, E, D, L = this,
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
          for (j = new G(f), O = Math.ceil(A / p + 4), n = !1; T % 2 && (j = j.times(L), H(j.d, O)), T = u(T / 2), T !== 0;) L = L.times(L), H(L.d, O);
          return n = !0, b.s < 0 ? new G(f).div(j) : B(j, A)
        }
      } else if (E < 0) throw Error(i + "NaN");
      return E = E < 0 && b.d[Math.max(O, T)] & 1 ? -1 : 1, L.s = 1, n = !1, j = b.times(C(L, A + Z)), n = !0, j = P(j), j.s = E, j
    }, m.toPrecision = function(b, O) {
      var T, A, j = this,
        E = j.constructor;
      return b === void 0 ? (T = h(j), A = R(j, T <= E.toExpNeg || T >= E.toExpPos)) : (x(b, 1, t), O === void 0 ? O = E.rounding : x(O, 0, 8), j = B(new E(j), b, O), T = h(j), A = R(j, b <= T || T <= E.toExpNeg, b)), A
    }, m.toSignificantDigits = m.tosd = function(b, O) {
      var T = this,
        A = T.constructor;
      return b === void 0 ? (b = A.precision, O = A.rounding) : (x(b, 1, t), O === void 0 ? O = A.rounding : x(O, 0, 8)), B(new A(T), b, O)
    }, m.toString = m.valueOf = m.val = m.toJSON = function() {
      var b = this,
        O = h(b),
        T = b.constructor;
      return R(b, O <= T.toExpNeg || O >= T.toExpPos)
    };

    function v(b, O) {
      var T, A, j, E, D, L, G, Z, J = b.constructor,
        ne = J.precision;
      if (!b.s || !O.s) return O.s || (O = new J(b)), n ? B(O, ne) : O;
      if (G = b.d, Z = O.d, D = b.e, j = O.e, G = G.slice(), E = D - j, E) {
        for (E < 0 ? (A = G, E = -E, L = Z.length) : (A = Z, j = D, L = G.length), D = Math.ceil(ne / p), L = D > L ? D + 1 : L + 1, E > L && (E = L, A.length = 1), A.reverse(); E--;) A.push(0);
        A.reverse()
      }
      for (L = G.length, E = Z.length, L - E < 0 && (E = L, A = Z, Z = G, G = A), T = 0; E;) T = (G[--E] = G[E] + Z[E] + T) / c | 0, G[E] %= c;
      for (T && (G.unshift(T), ++j), L = G.length; G[--L] == 0;) G.pop();
      return O.d = G, O.e = j, n ? B(O, ne) : O
    }

    function x(b, O, T) {
      if (b !== ~~b || b < O || b > T) throw Error(o + b)
    }

    function w(b) {
      var O, T, A, j = b.length - 1,
        E = "",
        D = b[0];
      if (j > 0) {
        for (E += D, O = 1; O < j; O++) A = b[O] + "", T = p - A.length, T && (E += _(T)), E += A;
        D = b[O], A = D + "", T = p - A.length, T && (E += _(T))
      } else if (D === 0) return "0";
      for (; D % 10 === 0;) D /= 10;
      return E + D
    }
    var S = function() {
      function b(A, j) {
        var E, D = 0,
          L = A.length;
        for (A = A.slice(); L--;) E = A[L] * j + D, A[L] = E % c | 0, D = E / c | 0;
        return D && A.unshift(D), A
      }

      function O(A, j, E, D) {
        var L, G;
        if (E != D) G = E > D ? 1 : -1;
        else
          for (L = G = 0; L < E; L++)
            if (A[L] != j[L]) {
              G = A[L] > j[L] ? 1 : -1;
              break
            } return G
      }

      function T(A, j, E) {
        for (var D = 0; E--;) A[E] -= D, D = A[E] < j[E] ? 1 : 0, A[E] = D * c + A[E] - j[E];
        for (; !A[0] && A.length > 1;) A.shift()
      }
      return function(A, j, E, D) {
        var L, G, Z, J, ne, ye, K, le, ee, $, Oe, Q, ge, Ee, Re, pt, V, nt, it = A.constructor,
          ot = A.s == j.s ? 1 : -1,
          N = A.d,
          re = j.d;
        if (!A.s) return new it(A);
        if (!j.s) throw Error(i + "Division by zero");
        for (G = A.e - j.e, V = re.length, Re = N.length, K = new it(ot), le = K.d = [], Z = 0; re[Z] == (N[Z] || 0);) ++Z;
        if (re[Z] > (N[Z] || 0) && --G, E == null ? Q = E = it.precision : D ? Q = E + (h(A) - h(j)) + 1 : Q = E, Q < 0) return new it(0);
        if (Q = Q / p + 2 | 0, Z = 0, V == 1)
          for (J = 0, re = re[0], Q++;
            (Z < Re || J) && Q--; Z++) ge = J * c + (N[Z] || 0), le[Z] = ge / re | 0, J = ge % re | 0;
        else {
          for (J = c / (re[0] + 1) | 0, J > 1 && (re = b(re, J), N = b(N, J), V = re.length, Re = N.length), Ee = V, ee = N.slice(0, V), $ = ee.length; $ < V;) ee[$++] = 0;
          nt = re.slice(), nt.unshift(0), pt = re[0], re[1] >= c / 2 && ++pt;
          do J = 0, L = O(re, ee, V, $), L < 0 ? (Oe = ee[0], V != $ && (Oe = Oe * c + (ee[1] || 0)), J = Oe / pt | 0, J > 1 ? (J >= c && (J = c - 1), ne = b(re, J), ye = ne.length, $ = ee.length, L = O(ne, ee, ye, $), L == 1 && (J--, T(ne, V < ye ? nt : re, ye))) : (J == 0 && (L = J = 1), ne = re.slice()), ye = ne.length, ye < $ && ne.unshift(0), T(ee, ne, $), L == -1 && ($ = ee.length, L = O(re, ee, V, $), L < 1 && (J++, T(ee, V < $ ? nt : re, $))), $ = ee.length) : L === 0 && (J++, ee = [0]), le[Z++] = J, L && ee[0] ? ee[$++] = N[Ee] || 0 : (ee = [N[Ee]], $ = 1); while ((Ee++ < Re || ee[0] !== void 0) && Q--)
        }
        return le[0] || le.shift(), K.e = G, B(K, D ? E + h(K) + 1 : E)
      }
    }();

    function P(b, O) {
      var T, A, j, E, D, L, G = 0,
        Z = 0,
        J = b.constructor,
        ne = J.precision;
      if (h(b) > 16) throw Error(a + h(b));
      if (!b.s) return new J(f);
      for (O == null ? (n = !1, L = ne) : L = O, D = new J(.03125); b.abs().gte(.1);) b = b.times(D), Z += 5;
      for (A = Math.log(s(2, Z)) / Math.LN10 * 2 + 5 | 0, L += A, T = j = E = new J(f), J.precision = L;;) {
        if (j = B(j.times(b), L), T = T.times(++G), D = E.plus(S(j, T, L)), w(D.d).slice(0, L) === w(E.d).slice(0, L)) {
          for (; Z--;) E = B(E.times(E), L);
          return J.precision = ne, O == null ? (n = !0, B(E, ne)) : E
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
      var T, A, j, E, D, L, G, Z, J, ne = 1,
        ye = 10,
        K = b,
        le = K.d,
        ee = K.constructor,
        $ = ee.precision;
      if (K.s < 1) throw Error(i + (K.s ? "NaN" : "-Infinity"));
      if (K.eq(f)) return new ee(0);
      if (O == null ? (n = !1, Z = $) : Z = O, K.eq(10)) return O == null && (n = !0), g(ee, Z);
      if (Z += ye, ee.precision = Z, T = w(le), A = T.charAt(0), E = h(K), Math.abs(E) < 15e14) {
        for (; A < 7 && A != 1 || A == 1 && T.charAt(1) > 3;) K = K.times(b), T = w(K.d), A = T.charAt(0), ne++;
        E = h(K), A > 1 ? (K = new ee("0." + T), E++) : K = new ee(A + "." + T.slice(1))
      } else return G = g(ee, Z + 2, $).times(E + ""), K = C(new ee(A + "." + T.slice(1)), Z - ye).plus(G), ee.precision = $, O == null ? (n = !0, B(K, $)) : K;
      for (L = D = K = S(K.minus(f), K.plus(f), Z), J = B(K.times(K), Z), j = 3;;) {
        if (D = B(D.times(J), Z), G = L.plus(S(D, new ee(j), Z)), w(G.d).slice(0, Z) === w(L.d).slice(0, Z)) return L = L.times(2), E !== 0 && (L = L.plus(g(ee, Z + 2, $).times(E + ""))), L = S(L, new ee(ne), Z), ee.precision = $, O == null ? (n = !0, B(L, $)) : L;
        L = G, j += 2
      }
    }

    function k(b, O) {
      var T, A, j;
      for ((T = O.indexOf(".")) > -1 && (O = O.replace(".", "")), (A = O.search(/e/i)) > 0 ? (T < 0 && (T = A), T += +O.slice(A + 1), O = O.substring(0, A)) : T < 0 && (T = O.length), A = 0; O.charCodeAt(A) === 48;) ++A;
      for (j = O.length; O.charCodeAt(j - 1) === 48;) --j;
      if (O = O.slice(A, j), O) {
        if (j -= A, T = T - A - 1, b.e = u(T / p), b.d = [], A = (T + 1) % p, T < 0 && (A += p), A < j) {
          for (A && b.d.push(+O.slice(0, A)), j -= p; A < j;) b.d.push(+O.slice(A, A += p));
          O = O.slice(A), A = p - O.length
        } else A -= j;
        for (; A--;) O += "0";
        if (b.d.push(+O), n && (b.e > y || b.e < -y)) throw Error(a + T)
      } else b.s = 0, b.e = 0, b.d = [0];
      return b
    }

    function B(b, O, T) {
      var A, j, E, D, L, G, Z, J, ne = b.d;
      for (D = 1, E = ne[0]; E >= 10; E /= 10) D++;
      if (A = O - D, A < 0) A += p, j = O, Z = ne[J = 0];
      else {
        if (J = Math.ceil((A + 1) / p), E = ne.length, J >= E) return b;
        for (Z = E = ne[J], D = 1; E >= 10; E /= 10) D++;
        A %= p, j = A - p + D
      }
      if (T !== void 0 && (E = s(10, D - j - 1), L = Z / E % 10 | 0, G = O < 0 || ne[J + 1] !== void 0 || Z % E, G = T < 4 ? (L || G) && (T == 0 || T == (b.s < 0 ? 3 : 2)) : L > 5 || L == 5 && (T == 4 || G || T == 6 && (A > 0 ? j > 0 ? Z / s(10, D - j) : 0 : ne[J - 1]) % 10 & 1 || T == (b.s < 0 ? 8 : 7))), O < 1 || !ne[0]) return G ? (E = h(b), ne.length = 1, O = O - E - 1, ne[0] = s(10, (p - O % p) % p), b.e = u(-O / p) || 0) : (ne.length = 1, ne[0] = b.e = b.s = 0), b;
      if (A == 0 ? (ne.length = J, E = 1, J--) : (ne.length = J + 1, E = s(10, p - A), ne[J] = j > 0 ? (Z / s(10, D - j) % s(10, j) | 0) * E : 0), G)
        for (;;)
          if (J == 0) {
            (ne[0] += E) == c && (ne[0] = 1, ++b.e);
            break
          } else {
            if (ne[J] += E, ne[J] != c) break;
            ne[J--] = 0, E = 1
          } for (A = ne.length; ne[--A] === 0;) ne.pop();
      if (n && (b.e > y || b.e < -y)) throw Error(a + h(b));
      return b
    }

    function W(b, O) {
      var T, A, j, E, D, L, G, Z, J, ne, ye = b.constructor,
        K = ye.precision;
      if (!b.s || !O.s) return O.s ? O.s = -O.s : O = new ye(b), n ? B(O, K) : O;
      if (G = b.d, ne = O.d, A = O.e, Z = b.e, G = G.slice(), D = Z - A, D) {
        for (J = D < 0, J ? (T = G, D = -D, L = ne.length) : (T = ne, A = Z, L = G.length), j = Math.max(Math.ceil(K / p), L) + 2, D > j && (D = j, T.length = 1), T.reverse(), j = D; j--;) T.push(0);
        T.reverse()
      } else {
        for (j = G.length, L = ne.length, J = j < L, J && (L = j), j = 0; j < L; j++)
          if (G[j] != ne[j]) {
            J = G[j] < ne[j];
            break
          } D = 0
      }
      for (J && (T = G, G = ne, ne = T, O.s = -O.s), L = G.length, j = ne.length - L; j > 0; --j) G[L++] = 0;
      for (j = ne.length; j > D;) {
        if (G[--j] < ne[j]) {
          for (E = j; E && G[--E] === 0;) G[E] = c - 1;
          --G[E], G[j] += c
        }
        G[j] -= ne[j]
      }
      for (; G[--L] === 0;) G.pop();
      for (; G[0] === 0; G.shift()) --A;
      return G[0] ? (O.d = G, O.e = A, n ? B(O, K) : O) : new ye(0)
    }

    function R(b, O, T) {
      var A, j = h(b),
        E = w(b.d),
        D = E.length;
      return O ? (T && (A = T - D) > 0 ? E = E.charAt(0) + "." + E.slice(1) + _(A) : D > 1 && (E = E.charAt(0) + "." + E.slice(1)), E = E + (j < 0 ? "e" : "e+") + j) : j < 0 ? (E = "0." + _(-j - 1) + E, T && (A = T - D) > 0 && (E += _(A))) : j >= D ? (E += _(j + 1 - D), T && (A = T - j - 1) > 0 && (E = E + "." + _(A))) : ((A = j + 1) < D && (E = E.slice(0, A) + "." + E.slice(A)), T && (A = T - D) > 0 && (j + 1 === D && (E += "."), E += _(A))), b.s < 0 ? "-" + E : E
    }

    function H(b, O) {
      if (b.length > O) return b.length = O, !0
    }

    function F(b) {
      var O, T, A;

      function j(E) {
        var D = this;
        if (!(D instanceof j)) return new j(E);
        if (D.constructor = j, E instanceof j) {
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
      if (j.prototype = m, j.ROUND_UP = 0, j.ROUND_DOWN = 1, j.ROUND_CEIL = 2, j.ROUND_FLOOR = 3, j.ROUND_HALF_UP = 4, j.ROUND_HALF_DOWN = 5, j.ROUND_HALF_EVEN = 6, j.ROUND_HALF_CEIL = 7, j.ROUND_HALF_FLOOR = 8, j.clone = F, j.config = j.set = z, b === void 0 && (b = {}), b)
        for (A = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], O = 0; O < A.length;) b.hasOwnProperty(T = A[O++]) || (b[T] = this[T]);
      return j.config(b), j
    }

    function z(b) {
      if (!b || typeof b != "object") throw Error(i + "Object expected");
      var O, T, A, j = ["precision", 1, t, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (O = 0; O < j.length; O += 3)
        if ((A = b[T = j[O]]) !== void 0)
          if (u(A) === A && A >= j[O + 1] && A <= j[O + 2]) this[T] = A;
          else throw Error(o + T + ": " + A);
      if ((A = b[T = "LN10"]) !== void 0)
        if (A == Math.LN10) this[T] = new this(A);
        else throw Error(o + T + ": " + A);
      return this
    }
    r = F(r), r.default = r.Decimal = r, f = new r(1), typeof define == "function" && define.amd ? define(function() {
      return r
    }) : typeof ms < "u" && ms.exports ? ms.exports = r : (e || (e = typeof self < "u" && self && self.self == self ? self : Function("return this")()), e.Decimal = r)
  })(Xw)
});
var L1 = I((aee, R1) => {
  function Lz(e) {
    var t = e == null ? 0 : e.length;
    return t ? e[t - 1] : void 0
  }
  R1.exports = Lz
});
var eO = I((_ee, Q1) => {
  "use strict";
  var fF = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  Q1.exports = fF
});
var iO = I((Pee, nO) => {
  "use strict";
  var pF = eO();

  function tO() {}

  function rO() {}
  rO.resetWarningCache = tO;
  nO.exports = function() {
    function e(n, i, o, a, u, s) {
      if (s !== pF) {
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
      checkPropTypes: rO,
      resetWarningCache: tO
    };
    return r.PropTypes = r, r
  }
});
var aO = I((jee, oO) => {
  oO.exports = iO()();
  var Tee, Eee
});
var $O = I((hte, FO) => {
  var c8 = Wc(),
    f8 = c8(Object.getPrototypeOf, Object);
  FO.exports = f8
});
var GO = I((yte, HO) => {
  var p8 = Zt(),
    d8 = $O(),
    m8 = Jt(),
    h8 = "[object Object]",
    y8 = Function.prototype,
    v8 = Object.prototype,
    UO = y8.toString,
    g8 = v8.hasOwnProperty,
    b8 = UO.call(Object);

  function x8(e) {
    if (!m8(e) || p8(e) != h8) return !1;
    var t = d8(e);
    if (t === null) return !0;
    var r = g8.call(t, "constructor") && t.constructor;
    return typeof r == "function" && r instanceof r && UO.call(r) == b8
  }
  HO.exports = x8
});
var VO = I((vte, KO) => {
  var w8 = Zt(),
    O8 = Jt(),
    S8 = "[object Boolean]";

  function A8(e) {
    return e === !0 || e === !1 || O8(e) && w8(e) == S8
  }
  KO.exports = A8
});
var cS = I((Mte, lS) => {
  var Q8 = Math.ceil,
    e$ = Math.max;

  function t$(e, t, r, n) {
    for (var i = -1, o = e$(Q8((t - e) / (r || 1)), 0), a = Array(o); o--;) a[n ? o : ++i] = e, e += r;
    return a
  }
  lS.exports = t$
});
var Kp = I((Cte, pS) => {
  var r$ = pf(),
    fS = 1 / 0,
    n$ = 17976931348623157e292;

  function i$(e) {
    if (!e) return e === 0 ? e : 0;
    if (e = r$(e), e === fS || e === -fS) {
      var t = e < 0 ? -1 : 1;
      return t * n$
    }
    return e === e ? e : 0
  }
  pS.exports = i$
});
var mS = I((Ite, dS) => {
  var o$ = cS(),
    a$ = uo(),
    Vp = Kp();

  function u$(e) {
    return function(t, r, n) {
      return n && typeof n != "number" && a$(t, r, n) && (r = n = void 0), t = Vp(t), r === void 0 ? (r = t, t = 0) : r = Vp(r), n = n === void 0 ? t < r ? 1 : -1 : Vp(n), o$(t, r, n, e)
    }
  }
  dS.exports = u$
});
var Xp = I((kte, hS) => {
  var s$ = mS(),
    l$ = s$();
  hS.exports = l$
});
var TS = I((Hte, PS) => {
  var S$ = Ou();

  function A$(e, t) {
    var r;
    return S$(e, function(n, i, o) {
      return r = t(n, i, o), !r
    }), !!r
  }
  PS.exports = A$
});
var jS = I((Gte, ES) => {
  var _$ = Cc(),
    P$ = mr(),
    T$ = TS(),
    E$ = at(),
    j$ = uo();

  function M$(e, t, r) {
    var n = E$(e) ? _$ : T$;
    return r && j$(e, t, r) && (t = void 0), n(e, P$(t, 3))
  }
  ES.exports = M$
});
var IS = I((Vte, CS) => {
  var MS = of();

  function C$(e, t, r) {
    t == "__proto__" && MS ? MS(e, t, {
      configurable: !0,
      enumerable: !0,
      value: r,
      writable: !0
    }) : e[t] = r
  }
  CS.exports = C$
});
var DS = I((Xte, kS) => {
  var I$ = IS(),
    k$ = tf(),
    D$ = mr();

  function N$(e, t) {
    var r = {};
    return t = D$(t, 3), k$(e, function(n, i, o) {
      I$(r, i, t(n, i, o))
    }), r
  }
  kS.exports = N$
});
var RS = I((Yte, NS) => {
  function R$(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n;)
      if (!t(e[r], r, e)) return !1;
    return !0
  }
  NS.exports = R$
});
var BS = I((Zte, LS) => {
  var L$ = Ou();

  function B$(e, t) {
    var r = !0;
    return L$(e, function(n, i, o) {
      return r = !!t(n, i, o), r
    }), r
  }
  LS.exports = B$
});
var Qp = I((Jte, qS) => {
  var q$ = RS(),
    W$ = BS(),
    z$ = mr(),
    F$ = at(),
    $$ = uo();

  function U$(e, t, r) {
    var n = F$(e) ? q$ : W$;
    return r && $$(e, t, r) && (t = void 0), n(e, z$(t, 3))
  }
  qS.exports = U$
});
var iA = I((Sre, nA) => {
  var m6 = mr(),
    h6 = Wn(),
    y6 = oo();

  function v6(e) {
    return function(t, r, n) {
      var i = Object(t);
      if (!h6(t)) {
        var o = m6(r, 3);
        t = y6(t), r = function(u) {
          return o(i[u], u, i)
        }
      }
      var a = e(t, r, n);
      return a > -1 ? i[o ? t[a] : a] : void 0
    }
  }
  nA.exports = v6
});
var aA = I((Are, oA) => {
  var g6 = Kp();

  function b6(e) {
    var t = g6(e),
      r = t % 1;
    return t === t ? r ? t - r : t : 0
  }
  oA.exports = b6
});
var sA = I((_re, uA) => {
  var x6 = Yc(),
    w6 = mr(),
    O6 = aA(),
    S6 = Math.max;

  function A6(e, t, r) {
    var n = e == null ? 0 : e.length;
    if (!n) return -1;
    var i = r == null ? 0 : O6(r);
    return i < 0 && (i = S6(n + i, 0)), x6(e, w6(t, 3), i)
  }
  uA.exports = A6
});
var cA = I((Pre, lA) => {
  var _6 = iA(),
    P6 = sA(),
    T6 = _6(P6);
  lA.exports = T6
});
var w_ = I((wie, _d) => {
  "use strict";
  var y5 = Object.prototype.hasOwnProperty,
    ft = "~";

  function Ma() {}
  Object.create && (Ma.prototype = Object.create(null), new Ma().__proto__ || (ft = !1));

  function v5(e, t, r) {
    this.fn = e, this.context = t, this.once = r || !1
  }

  function x_(e, t, r, n, i) {
    if (typeof r != "function") throw new TypeError("The listener must be a function");
    var o = new v5(r, n || e, i),
      a = ft ? ft + t : t;
    return e._events[a] ? e._events[a].fn ? e._events[a] = [e._events[a], o] : e._events[a].push(o) : (e._events[a] = o, e._eventsCount++), e
  }

  function ll(e, t) {
    --e._eventsCount === 0 ? e._events = new Ma : delete e._events[t]
  }

  function rt() {
    this._events = new Ma, this._eventsCount = 0
  }
  rt.prototype.eventNames = function() {
    var t = [],
      r, n;
    if (this._eventsCount === 0) return t;
    for (n in r = this._events) y5.call(r, n) && t.push(ft ? n.slice(1) : n);
    return Object.getOwnPropertySymbols ? t.concat(Object.getOwnPropertySymbols(r)) : t
  };
  rt.prototype.listeners = function(t) {
    var r = ft ? ft + t : t,
      n = this._events[r];
    if (!n) return [];
    if (n.fn) return [n.fn];
    for (var i = 0, o = n.length, a = new Array(o); i < o; i++) a[i] = n[i].fn;
    return a
  };
  rt.prototype.listenerCount = function(t) {
    var r = ft ? ft + t : t,
      n = this._events[r];
    return n ? n.fn ? 1 : n.length : 0
  };
  rt.prototype.emit = function(t, r, n, i, o, a) {
    var u = ft ? ft + t : t;
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
        d;
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
            for (d = 1, f = new Array(l - 1); d < l; d++) f[d - 1] = arguments[d];
          s[c].fn.apply(s[c].context, f)
      }
    }
    return !0
  };
  rt.prototype.on = function(t, r, n) {
    return x_(this, t, r, n, !1)
  };
  rt.prototype.once = function(t, r, n) {
    return x_(this, t, r, n, !0)
  };
  rt.prototype.removeListener = function(t, r, n, i) {
    var o = ft ? ft + t : t;
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
  rt.prototype.removeAllListeners = function(t) {
    var r;
    return t ? (r = ft ? ft + t : t, this._events[r] && ll(this, r)) : (this._events = new Ma, this._eventsCount = 0), this
  };
  rt.prototype.off = rt.prototype.removeListener;
  rt.prototype.addListener = rt.prototype.on;
  rt.prefixed = ft;
  rt.EventEmitter = rt;
  typeof _d < "u" && (_d.exports = rt)
});
import xn, {
  useState as Ue,
  useEffect as ka,
  useCallback as qt,
  useRef as i4
} from "./react-shim-eraudit.js";
import Ul from "./react-shim-eraudit.js";

function Dd(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++) e[t] && (r = Dd(e[t])) && (n && (n += " "), n += r)
    } else
      for (r in e) e[r] && (n && (n += " "), n += r);
  return n
}

function tP() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++)(e = arguments[r]) && (t = Dd(e)) && (n && (n += " "), n += t);
  return n
}
var ae = tP;
var ql = te(Wr()),
  Tn = te(Tt()),
  Lh = te($a()),
  Bh = te(Le()),
  qh = te(Pt()),
  Wh = te(Oh());
import {
  Children as Wl,
  isValidElement as lj
} from "./react-shim-eraudit.js";
var _n = te($a()),
  Dl = te(kl()),
  _h = te(Wr()),
  Ph = te(Il()),
  Th = te(Tt()),
  Ye = function(t) {
    return t === 0 ? 0 : t > 0 ? 1 : -1
  },
  pr = function(t) {
    return (0, _n.default)(t) && t.indexOf("%") === t.length - 1
  },
  X = function(t) {
    return (0, Ph.default)(t) && !(0, Dl.default)(t)
  },
  Eh = function(t) {
    return (0, Th.default)(t)
  },
  je = function(t) {
    return X(t) || (0, _n.default)(t)
  },
  rj = 0,
  Qt = function(t) {
    var r = ++rj;
    return "".concat(t || "").concat(r)
  },
  zt = function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!X(t) && !(0, _n.default)(t)) return n;
    var o;
    if (pr(t)) {
      var a = t.indexOf("%");
      o = r * parseFloat(t.slice(0, a)) / 100
    } else o = +t;
    return (0, Dl.default)(o) && (o = n), i && o > r && (o = r), o
  },
  er = function(t) {
    if (!t) return null;
    var r = Object.keys(t);
    return r && r.length ? t[r[0]] : null
  },
  jh = function(t) {
    if (!Array.isArray(t)) return !1;
    for (var r = t.length, n = {}, i = 0; i < r; i++)
      if (!n[t[i]]) n[t[i]] = !0;
      else return !0;
    return !1
  },
  vt = function(t, r) {
    return X(t) && X(r) ? function(n) {
      return t + n * (r - t)
    } : function() {
      return r
    }
  };

function Pn(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : (0, _h.default)(n, t)) === r
  })
}
var Mh = function(t, r) {
  return X(t) && X(r) ? t - r : (0, _n.default)(t) && (0, _n.default)(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r))
};

function dr(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r])) return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n)) return !1;
  return !0
}
var Rl = te(Pt());
import {
  isValidElement as nj
} from "./react-shim-eraudit.js";

function Nl(e) {
  "@babel/helpers - typeof";
  return Nl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Nl(e)
}
var ij = ["viewBox", "children"],
  Ih = ["aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "className", "color", "height", "id", "lang", "max", "media", "method", "min", "name", "style", "target", "width", "role", "tabIndex", "accentHeight", "accumulate", "additive", "alignmentBaseline", "allowReorder", "alphabetic", "amplitude", "arabicForm", "ascent", "attributeName", "attributeType", "autoReverse", "azimuth", "baseFrequency", "baselineShift", "baseProfile", "bbox", "begin", "bias", "by", "calcMode", "capHeight", "clip", "clipPath", "clipPathUnits", "clipRule", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "contentScriptType", "contentStyleType", "cursor", "cx", "cy", "d", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominantBaseline", "dur", "dx", "dy", "edgeMode", "elevation", "enableBackground", "end", "exponent", "externalResourcesRequired", "fill", "fillOpacity", "fillRule", "filter", "filterRes", "filterUnits", "floodColor", "floodOpacity", "focusable", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "format", "from", "fx", "fy", "g1", "g2", "glyphName", "glyphOrientationHorizontal", "glyphOrientationVertical", "glyphRef", "gradientTransform", "gradientUnits", "hanging", "horizAdvX", "horizOriginX", "href", "ideographic", "imageRendering", "in2", "in", "intercept", "k1", "k2", "k3", "k4", "k", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letterSpacing", "lightingColor", "limitingConeAngle", "local", "markerEnd", "markerHeight", "markerMid", "markerStart", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "mode", "numOctaves", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlinePosition", "overlineThickness", "paintOrder", "panose1", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointerEvents", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "r", "radius", "refX", "refY", "renderingIntent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "result", "rotate", "rx", "ry", "seed", "shapeRendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stopColor", "stopOpacity", "strikethroughPosition", "strikethroughThickness", "string", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textAnchor", "textDecoration", "textLength", "textRendering", "to", "transform", "u1", "u2", "underlinePosition", "underlineThickness", "unicode", "unicodeBidi", "unicodeRange", "unitsPerEm", "vAlphabetic", "values", "vectorEffect", "version", "vertAdvY", "vertOriginX", "vertOriginY", "vHanging", "vIdeographic", "viewTarget", "visibility", "vMathematical", "widths", "wordSpacing", "writingMode", "x1", "x2", "x", "xChannelSelector", "xHeight", "xlinkActuate", "xlinkArcrole", "xlinkHref", "xlinkRole", "xlinkShow", "xlinkTitle", "xlinkType", "xmlBase", "xmlLang", "xmlns", "xmlnsXlink", "xmlSpace", "y1", "y2", "y", "yChannelSelector", "z", "zoomAndPan", "ref", "key", "angle"],
  Ch = ["points", "pathLength"],
  eu = {
    svg: ij,
    polygon: Ch,
    polyline: Ch
  },
  tu = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"],
  zr = function(t, r) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var n = t;
    if (nj(t) && (n = t.props), !(0, Rl.default)(n)) return null;
    var i = {};
    return Object.keys(n).forEach(function(o) {
      tu.includes(o) && (i[o] = r || function(a) {
        return n[o](n, a)
      })
    }), i
  },
  oj = function(t, r, n) {
    return function(i) {
      return t(r, n, i), null
    }
  },
  Fr = function(t, r, n) {
    if (!(0, Rl.default)(t) || Nl(t) !== "object") return null;
    var i = null;
    return Object.keys(t).forEach(function(o) {
      var a = t[o];
      tu.includes(o) && typeof a == "function" && (i || (i = {}), i[o] = oj(a, r, n))
    }), i
  };
var aj = ["children"],
  uj = ["children"];

function kh(e, t) {
  if (e == null) return {};
  var r = sj(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function sj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Bl(e) {
  "@babel/helpers - typeof";
  return Bl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Bl(e)
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
var jt = function(t) {
    return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : ""
  },
  Nh = null,
  Ll = null,
  zl = function e(t) {
    if (t === Nh && Array.isArray(Ll)) return Ll;
    var r = [];
    return Wl.forEach(t, function(n) {
      (0, Tn.default)(n) || ((0, Wh.isFragment)(n) ? r = r.concat(e(n.props.children)) : r.push(n))
    }), Ll = r, Nh = t, r
  };

function We(e, t) {
  var r = [],
    n = [];
  return Array.isArray(t) ? n = t.map(function(i) {
    return jt(i)
  }) : n = [jt(t)], zl(e).forEach(function(i) {
    var o = (0, ql.default)(i, "type.displayName") || (0, ql.default)(i, "type.name");
    n.indexOf(o) !== -1 && r.push(i)
  }), r
}

function Ze(e, t) {
  var r = We(e, t);
  return r && r[0]
}
var Fl = function(t) {
    if (!t || !t.props) return !1;
    var r = t.props,
      n = r.width,
      i = r.height;
    return !(!X(n) || n <= 0 || !X(i) || i <= 0)
  },
  cj = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"],
  fj = function(t) {
    return t && t.type && (0, Lh.default)(t.type) && cj.indexOf(t.type) >= 0
  },
  zh = function(t) {
    return t && Bl(t) === "object" && "clipDot" in t
  },
  pj = function(t, r, n, i) {
    var o, a = (o = eu === null || eu === void 0 ? void 0 : eu[i]) !== null && o !== void 0 ? o : [];
    return r.startsWith("data-") || !(0, Bh.default)(t) && (i && a.includes(r) || Ih.includes(r)) || n && tu.includes(r)
  };
var ue = function(t, r, n) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var i = t;
    if (lj(t) && (i = t.props), !(0, qh.default)(i)) return null;
    var o = {};
    return Object.keys(i).forEach(function(a) {
      var u;
      pj((u = i) === null || u === void 0 ? void 0 : u[a], a, r, n) && (o[a] = i[a])
    }), o
  },
  ru = function e(t, r) {
    if (t === r) return !0;
    var n = Wl.count(t);
    if (n !== Wl.count(r)) return !1;
    if (n === 0) return !0;
    if (n === 1) return Rh(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
    for (var i = 0; i < n; i++) {
      var o = t[i],
        a = r[i];
      if (Array.isArray(o) || Array.isArray(a)) {
        if (!e(o, a)) return !1
      } else if (!Rh(o, a)) return !1
    }
    return !0
  },
  Rh = function(t, r) {
    if ((0, Tn.default)(t) && (0, Tn.default)(r)) return !0;
    if (!(0, Tn.default)(t) && !(0, Tn.default)(r)) {
      var n = t.props || {},
        i = n.children,
        o = kh(n, aj),
        a = r.props || {},
        u = a.children,
        s = kh(a, uj);
      return i && u ? dr(o, s) && ru(i, u) : !i && !u ? dr(o, s) : !1
    }
    return !1
  },
  $l = function(t, r) {
    var n = [],
      i = {};
    return zl(t).forEach(function(o, a) {
      if (fj(o)) n.push(o);
      else if (o) {
        var u = jt(o.type),
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
  Fh = function(t) {
    var r = t && t.type;
    return r && Dh[r] ? Dh[r] : null
  },
  $h = function(t, r) {
    return zl(r).indexOf(t)
  };
var dj = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];

function Hl() {
  return Hl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Hl.apply(this, arguments)
}

function mj(e, t) {
  if (e == null) return {};
  var r = hj(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function hj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Yi(e) {
  var t = e.children,
    r = e.width,
    n = e.height,
    i = e.viewBox,
    o = e.className,
    a = e.style,
    u = e.title,
    s = e.desc,
    l = mj(e, dj),
    f = i || {
      width: r,
      height: n,
      x: 0,
      y: 0
    },
    c = ae("recharts-surface", o);
  return Ul.createElement("svg", Hl({}, ue(l, !0, "svg"), {
    className: c,
    width: r,
    height: n,
    style: a,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), Ul.createElement("title", null, u), Ul.createElement("desc", null, s), t)
}
import Uh from "./react-shim-eraudit.js";
var yj = ["children", "className"];

function Gl() {
  return Gl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Gl.apply(this, arguments)
}

function vj(e, t) {
  if (e == null) return {};
  var r = gj(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function gj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var be = Uh.forwardRef(function(e, t) {
  var r = e.children,
    n = e.className,
    i = vj(e, yj),
    o = ae("recharts-layer", n);
  return Uh.createElement("g", Gl({
    className: o
  }, ue(i, !0), {
    ref: t
  }), r)
});
import ao, {
  PureComponent as ED
} from "./react-shim-eraudit.js";
var Ec = te(Le());
import tr, {
  PureComponent as IM
} from "./react-shim-eraudit.js";
var bj = !1,
  ut = function(t, r) {
    for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) i[o - 2] = arguments[o];
    if (bj && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var a = 0;
        console.warn(r.replace(/%s/g, function() {
          return i[a++]
        }))
      }
  };
var _c = te(nu());
import bM from "./react-shim-eraudit.js";

function Se(e) {
  return function() {
    return e
  }
}
var Yl = Math.cos;
var Zi = Math.sin,
  Ge = Math.sqrt;
var $r = Math.PI,
  WH = $r / 2,
  En = 2 * $r;
var Zl = Math.PI,
  Jl = 2 * Zl,
  Ur = 1e-6,
  nM = Jl - Ur;

function fy(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t) this._ += arguments[t] + e[t]
}

function iM(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return fy;
  let r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, o = n.length; i < o; ++i) this._ += Math.round(arguments[i] * r) / r + n[i]
  }
}
var Hr = class {
  constructor(t) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = t == null ? fy : iM(t)
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
    else if (p > Ur)
      if (!(Math.abs(c * s - l * f) > Ur) || !o) this._append`L${this._x1=t},${this._y1=r}`;
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
        Math.abs(P - 1) > Ur && this._append`L${t+P*f},${r+P*c}`, this._append`A${o},${o},0,0,${+(c*d>f*y)},${this._x1=t+h*s},${this._y1=r+h*l}`
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
    this._x1 === null ? this._append`M${l},${f}` : (Math.abs(this._x1 - l) > Ur || Math.abs(this._y1 - f) > Ur) && this._append`L${l},${f}`, n && (p < 0 && (p = p % Jl + Jl), p > nM ? this._append`A${n},${n},0,1,${c},${t-u},${r-s}A${n},${n},0,1,${c},${this._x1=l},${this._y1=f}` : p > Ur && this._append`A${n},${n},0,${+(p>=Zl)},${c},${this._x1=t+n*Math.cos(o)},${this._y1=r+n*Math.sin(o)}`)
  }
  rect(t, r, n, i) {
    this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+r}h${n=+n}v${+i}h${-n}Z`
  }
  toString() {
    return this._
  }
};

function py() {
  return new Hr
}
py.prototype = Hr.prototype;

function jn(e) {
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
  }, () => new Hr(t)
}
var VH = Array.prototype.slice;

function Mn(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e)
}

function dy(e) {
  this._context = e
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

function Ar(e) {
  return new dy(e)
}

function iu(e) {
  return e[0]
}

function ou(e) {
  return e[1]
}

function Ji(e, t) {
  var r = Se(!0),
    n = null,
    i = Ar,
    o = null,
    a = jn(u);
  e = typeof e == "function" ? e : e === void 0 ? iu : Se(e), t = typeof t == "function" ? t : t === void 0 ? ou : Se(t);

  function u(s) {
    var l, f = (s = Mn(s)).length,
      c, p = !1,
      d;
    for (n == null && (o = i(d = a())), l = 0; l <= f; ++l) !(l < f && r(c = s[l], l, s)) === p && ((p = !p) ? o.lineStart() : o.lineEnd()), p && o.point(+e(c, l, s), +t(c, l, s));
    if (d) return o = null, d + "" || null
  }
  return u.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : Se(+s), u) : e
  }, u.y = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : Se(+s), u) : t
  }, u.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : Se(!!s), u) : r
  }, u.curve = function(s) {
    return arguments.length ? (i = s, n != null && (o = i(n)), u) : i
  }, u.context = function(s) {
    return arguments.length ? (s == null ? n = o = null : o = i(n = s), u) : n
  }, u
}

function Cn(e, t, r) {
  var n = null,
    i = Se(!0),
    o = null,
    a = Ar,
    u = null,
    s = jn(l);
  e = typeof e == "function" ? e : e === void 0 ? iu : Se(+e), t = typeof t == "function" ? t : t === void 0 ? Se(0) : Se(+t), r = typeof r == "function" ? r : r === void 0 ? ou : Se(+r);

  function l(c) {
    var p, d, y, m = (c = Mn(c)).length,
      v, x = !1,
      w, S = new Array(m),
      P = new Array(m);
    for (o == null && (u = a(w = s())), p = 0; p <= m; ++p) {
      if (!(p < m && i(v = c[p], p, c)) === x)
        if (x = !x) d = p, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), y = p - 1; y >= d; --y) u.point(S[y], P[y]);
          u.lineEnd(), u.areaEnd()
        } x && (S[p] = +e(v, p, c), P[p] = +t(v, p, c), u.point(n ? +n(v, p, c) : S[p], r ? +r(v, p, c) : P[p]))
    }
    if (w) return u = null, w + "" || null
  }

  function f() {
    return Ji().defined(i).curve(a).context(o)
  }
  return l.x = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Se(+c), n = null, l) : e
  }, l.x0 = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Se(+c), l) : e
  }, l.x1 = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : Se(+c), l) : n
  }, l.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Se(+c), r = null, l) : t
  }, l.y0 = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Se(+c), l) : t
  }, l.y1 = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : Se(+c), l) : r
  }, l.lineX0 = l.lineY0 = function() {
    return f().x(e).y(t)
  }, l.lineY1 = function() {
    return f().x(e).y(r)
  }, l.lineX1 = function() {
    return f().x(n).y(t)
  }, l.defined = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : Se(!!c), l) : i
  }, l.curve = function(c) {
    return arguments.length ? (a = c, o != null && (u = a(o)), l) : a
  }, l.context = function(c) {
    return arguments.length ? (c == null ? o = u = null : u = a(o = c), l) : o
  }, l
}
var au = class {
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

function Ql(e) {
  return new au(e, !0)
}

function ec(e) {
  return new au(e, !1)
}
var In = {
  draw(e, t) {
    let r = Ge(t / $r);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, En)
  }
};
var tc = {
  draw(e, t) {
    let r = Ge(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath()
  }
};
var my = Ge(1 / 3),
  oM = my * 2,
  rc = {
    draw(e, t) {
      let r = Ge(t / oM),
        n = r * my;
      e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath()
    }
  };
var nc = {
  draw(e, t) {
    let r = Ge(t),
      n = -r / 2;
    e.rect(n, n, r, r)
  }
};
var aM = .8908130915292852,
  hy = Zi($r / 10) / Zi(7 * $r / 10),
  uM = Zi(En / 10) * hy,
  sM = -Yl(En / 10) * hy,
  ic = {
    draw(e, t) {
      let r = Ge(t * aM),
        n = uM * r,
        i = sM * r;
      e.moveTo(0, -r), e.lineTo(n, i);
      for (let o = 1; o < 5; ++o) {
        let a = En * o / 5,
          u = Yl(a),
          s = Zi(a);
        e.lineTo(s * r, -u * r), e.lineTo(u * n - s * i, s * n + u * i)
      }
      e.closePath()
    }
  };
var oc = Ge(3),
  ac = {
    draw(e, t) {
      let r = -Ge(t / (oc * 3));
      e.moveTo(0, r * 2), e.lineTo(-oc * r, -r), e.lineTo(oc * r, -r), e.closePath()
    }
  };
var Mt = -.5,
  Ct = Ge(3) / 2,
  uc = 1 / Ge(12),
  lM = (uc / 2 + 1) * 3,
  sc = {
    draw(e, t) {
      let r = Ge(t / lM),
        n = r / 2,
        i = r * uc,
        o = n,
        a = r * uc + r,
        u = -o,
        s = a;
      e.moveTo(n, i), e.lineTo(o, a), e.lineTo(u, s), e.lineTo(Mt * n - Ct * i, Ct * n + Mt * i), e.lineTo(Mt * o - Ct * a, Ct * o + Mt * a), e.lineTo(Mt * u - Ct * s, Ct * u + Mt * s), e.lineTo(Mt * n + Ct * i, Mt * i - Ct * n), e.lineTo(Mt * o + Ct * a, Mt * a - Ct * o), e.lineTo(Mt * u + Ct * s, Mt * s - Ct * u), e.closePath()
    }
  };

function uu(e, t) {
  let r = null,
    n = jn(i);
  e = typeof e == "function" ? e : Se(e || In), t = typeof t == "function" ? t : Se(t === void 0 ? 64 : +t);

  function i() {
    let o;
    if (r || (r = o = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), o) return r = null, o + "" || null
  }
  return i.type = function(o) {
    return arguments.length ? (e = typeof o == "function" ? o : Se(o), i) : e
  }, i.size = function(o) {
    return arguments.length ? (t = typeof o == "function" ? o : Se(+o), i) : t
  }, i.context = function(o) {
    return arguments.length ? (r = o ?? null, i) : r
  }, i
}

function kn() {}

function Dn(e, t, r) {
  e._context.bezierCurveTo((2 * e._x0 + e._x1) / 3, (2 * e._y0 + e._y1) / 3, (e._x0 + 2 * e._x1) / 3, (e._y0 + 2 * e._y1) / 3, (e._x0 + 4 * e._x1 + t) / 6, (e._y0 + 4 * e._y1 + r) / 6)
}

function yy(e) {
  this._context = e
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
        Dn(this, this._x1, this._y1);
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
        Dn(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function lc(e) {
  return new yy(e)
}

function vy(e) {
  this._context = e
}
vy.prototype = {
  areaStart: kn,
  areaEnd: kn,
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
        Dn(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function cc(e) {
  return new vy(e)
}

function gy(e) {
  this._context = e
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
        Dn(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function fc(e) {
  return new gy(e)
}

function by(e) {
  this._context = e
}
by.prototype = {
  areaStart: kn,
  areaEnd: kn,
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

function pc(e) {
  return new by(e)
}

function xy(e) {
  return e < 0 ? -1 : 1
}

function wy(e, t, r) {
  var n = e._x1 - e._x0,
    i = t - e._x1,
    o = (e._y1 - e._y0) / (n || i < 0 && -0),
    a = (r - e._y1) / (i || n < 0 && -0),
    u = (o * i + a * n) / (n + i);
  return (xy(o) + xy(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0
}

function Oy(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t
}

function dc(e, t, r) {
  var n = e._x0,
    i = e._y0,
    o = e._x1,
    a = e._y1,
    u = (o - n) / 3;
  e._context.bezierCurveTo(n + u, i + u * t, o - u, a - u * r, o, a)
}

function su(e) {
  this._context = e
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
          this._point = 3, dc(this, Oy(this, r = wy(this, e, t)), r);
          break;
        default:
          dc(this, this._t0, r = wy(this, e, t));
          break
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r
    }
  }
};

function Sy(e) {
  this._context = new Ay(e)
}(Sy.prototype = Object.create(su.prototype)).point = function(e, t) {
  su.prototype.point.call(this, t, e)
};

function Ay(e) {
  this._context = e
}
Ay.prototype = {
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

function mc(e) {
  return new su(e)
}

function hc(e) {
  return new Sy(e)
}

function Py(e) {
  this._context = e
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
    var e = this._x,
      t = this._y,
      r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2) this._context.lineTo(e[1], t[1]);
      else
        for (var n = _y(e), i = _y(t), o = 0, a = 1; a < r; ++o, ++a) this._context.bezierCurveTo(n[0][o], i[0][o], n[1][o], i[1][o], e[a], t[a]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t)
  }
};

function _y(e) {
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

function yc(e) {
  return new Py(e)
}

function lu(e, t) {
  this._context = e, this._t = t
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

function vc(e) {
  return new lu(e, .5)
}

function gc(e) {
  return new lu(e, 0)
}

function bc(e) {
  return new lu(e, 1)
}

function It(e, t) {
  if ((a = e.length) > 1)
    for (var r = 1, n, i, o = e[t[0]], a, u = o.length; r < a; ++r)
      for (i = o, o = e[t[r]], n = 0; n < u; ++n) o[n][1] += o[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1]
}

function Nn(e) {
  for (var t = e.length, r = new Array(t); --t >= 0;) r[t] = t;
  return r
}

function cM(e, t) {
  return e[t]
}

function fM(e) {
  let t = [];
  return t.key = e, t
}

function xc() {
  var e = Se([]),
    t = Nn,
    r = It,
    n = cM;

  function i(o) {
    var a = Array.from(e.apply(this, arguments), fM),
      u, s = a.length,
      l = -1,
      f;
    for (let c of o)
      for (u = 0, ++l; u < s; ++u)(a[u][l] = [0, +n(c, a[u].key, l, o)]).data = c;
    for (u = 0, f = Mn(t(a)); u < s; ++u) a[f[u]].index = u;
    return r(a, f), a
  }
  return i.keys = function(o) {
    return arguments.length ? (e = typeof o == "function" ? o : Se(Array.from(o)), i) : e
  }, i.value = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : Se(+o), i) : n
  }, i.order = function(o) {
    return arguments.length ? (t = o == null ? Nn : typeof o == "function" ? o : Se(Array.from(o)), i) : t
  }, i.offset = function(o) {
    return arguments.length ? (r = o ?? It, i) : r
  }, i
}

function wc(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, o = e[0].length, a; i < o; ++i) {
      for (a = r = 0; r < n; ++r) a += e[r][i][1] || 0;
      if (a)
        for (r = 0; r < n; ++r) e[r][i][1] /= a
    }
    It(e, t)
  }
}

function Oc(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, o = n.length; r < o; ++r) {
      for (var a = 0, u = 0; a < i; ++a) u += e[a][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2
    }
    It(e, t)
  }
}

function Sc(e, t) {
  if (!(!((a = e.length) > 0) || !((o = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, o, a; n < o; ++n) {
      for (var u = 0, s = 0, l = 0; u < a; ++u) {
        for (var f = e[t[u]], c = f[n][1] || 0, p = f[n - 1][1] || 0, d = (c - p) / 2, y = 0; y < u; ++y) {
          var m = e[t[y]],
            v = m[n][1] || 0,
            x = m[n - 1][1] || 0;
          d += v - x
        }
        s += c, l += d * c
      }
      i[n - 1][1] += i[n - 1][0] = r, s && (r -= l / s)
    }
    i[n - 1][1] += i[n - 1][0] = r, It(e, t)
  }
}

function Qi(e) {
  "@babel/helpers - typeof";
  return Qi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Qi(e)
}
var dM = ["type", "size", "sizeType"];

function Ac() {
  return Ac = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ac.apply(this, arguments)
}

function Ty(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ey(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ty(Object(r), !0).forEach(function(n) {
      mM(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ty(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function mM(e, t, r) {
  return t = hM(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function hM(e) {
  var t = yM(e, "string");
  return Qi(t) == "symbol" ? t : t + ""
}

function yM(e, t) {
  if (Qi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Qi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function vM(e, t) {
  if (e == null) return {};
  var r = gM(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function gM(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var jy = {
    symbolCircle: In,
    symbolCross: tc,
    symbolDiamond: rc,
    symbolSquare: nc,
    symbolStar: ic,
    symbolTriangle: ac,
    symbolWye: sc
  },
  xM = Math.PI / 180,
  wM = function(t) {
    var r = "symbol".concat((0, _c.default)(t));
    return jy[r] || In
  },
  OM = function(t, r, n) {
    if (r === "area") return t;
    switch (n) {
      case "cross":
        return 5 * t * t / 9;
      case "diamond":
        return .5 * t * t / Math.sqrt(3);
      case "square":
        return t * t;
      case "star": {
        var i = 18 * xM;
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
  SM = function(t, r) {
    jy["symbol".concat((0, _c.default)(t))] = r
  },
  eo = function(t) {
    var r = t.type,
      n = r === void 0 ? "circle" : r,
      i = t.size,
      o = i === void 0 ? 64 : i,
      a = t.sizeType,
      u = a === void 0 ? "area" : a,
      s = vM(t, dM),
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
      y = ue(l, !0);
    return p === +p && d === +d && o === +o ? bM.createElement("path", Ac({}, y, {
      className: ae("recharts-symbols", c),
      transform: "translate(".concat(p, ", ").concat(d, ")"),
      d: f()
    })) : null
  };
eo.registerSymbol = SM;

function Rn(e) {
  "@babel/helpers - typeof";
  return Rn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Rn(e)
}

function Pc() {
  return Pc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Pc.apply(this, arguments)
}

function My(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function AM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? My(Object(r), !0).forEach(function(n) {
      to(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : My(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function _M(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Cy(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, ky(n.key), n)
  }
}

function PM(e, t, r) {
  return t && Cy(e.prototype, t), r && Cy(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function TM(e, t, r) {
  return t = cu(t), EM(e, Iy() ? Reflect.construct(t, r || [], cu(e).constructor) : t.apply(e, r))
}

function EM(e, t) {
  if (t && (Rn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return jM(e)
}

function jM(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Iy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Iy = function() {
    return !!e
  })()
}

function cu(e) {
  return cu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, cu(e)
}

function MM(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Tc(e, t)
}

function Tc(e, t) {
  return Tc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Tc(e, t)
}

function to(e, t, r) {
  return t = ky(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function ky(e) {
  var t = CM(e, "string");
  return Rn(t) == "symbol" ? t : t + ""
}

function CM(e, t) {
  if (Rn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Rn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var kt = 32,
  fu = function(e) {
    function t() {
      return _M(this, t), TM(this, t, arguments)
    }
    return MM(t, e), PM(t, [{
      key: "renderIcon",
      value: function(n) {
        var i = this.props.inactiveColor,
          o = kt / 2,
          a = kt / 6,
          u = kt / 3,
          s = n.inactive ? i : n.color;
        if (n.type === "plainline") return tr.createElement("line", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          strokeDasharray: n.payload.strokeDasharray,
          x1: 0,
          y1: o,
          x2: kt,
          y2: o,
          className: "recharts-legend-icon"
        });
        if (n.type === "line") return tr.createElement("path", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          d: "M0,".concat(o, "h").concat(u, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * u, ",").concat(o, `
            H`).concat(kt, "M").concat(2 * u, ",").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(u, ",").concat(o),
          className: "recharts-legend-icon"
        });
        if (n.type === "rect") return tr.createElement("path", {
          stroke: "none",
          fill: s,
          d: "M0,".concat(kt / 8, "h").concat(kt, "v").concat(kt * 3 / 4, "h").concat(-kt, "z"),
          className: "recharts-legend-icon"
        });
        if (tr.isValidElement(n.legendIcon)) {
          var l = AM({}, n);
          return delete l.legendIcon, tr.cloneElement(n.legendIcon, l)
        }
        return tr.createElement(eo, {
          fill: s,
          cx: o,
          cy: o,
          size: kt,
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
            width: kt,
            height: kt
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
            v = ae(to(to({
              "recharts-legend-item": !0
            }, "legend-item-".concat(y), !0), "inactive", d.inactive));
          if (d.type === "none") return null;
          var x = (0, Ec.default)(d.value) ? null : d.value;
          ut(!(0, Ec.default)(d.value), `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`);
          var w = d.inactive ? l : d.color;
          return tr.createElement("li", Pc({
            className: v,
            style: c,
            key: "legend-item-".concat(y)
          }, Fr(n.props, d, y)), tr.createElement(Yi, {
            width: a,
            height: a,
            viewBox: f,
            style: p
          }, n.renderIcon(d)), tr.createElement("span", {
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
        return tr.createElement("ul", {
          className: "recharts-default-legend",
          style: u
        }, this.renderItems())
      }
    }])
  }(IM);
to(fu, "displayName", "Legend");
to(fu, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Jc = te(vb()),
  gb = te(Le());

function bu(e, t, r) {
  return t === !0 ? (0, Jc.default)(e, r) : (0, gb.default)(t) ? (0, Jc.default)(e, t) : e
}

function Fn(e) {
  "@babel/helpers - typeof";
  return Fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Fn(e)
}
var gD = ["ref"];

function bb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function hr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bb(Object(r), !0).forEach(function(n) {
      wu(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function bD(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function xb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Sb(n.key), n)
  }
}

function xD(e, t, r) {
  return t && xb(e.prototype, t), r && xb(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function wD(e, t, r) {
  return t = xu(t), OD(e, Ob() ? Reflect.construct(t, r || [], xu(e).constructor) : t.apply(e, r))
}

function OD(e, t) {
  if (t && (Fn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return SD(e)
}

function SD(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Ob() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Ob = function() {
    return !!e
  })()
}

function xu(e) {
  return xu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, xu(e)
}

function AD(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Qc(e, t)
}

function Qc(e, t) {
  return Qc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Qc(e, t)
}

function wu(e, t, r) {
  return t = Sb(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Sb(e) {
  var t = _D(e, "string");
  return Fn(t) == "symbol" ? t : t + ""
}

function _D(e, t) {
  if (Fn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Fn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function PD(e, t) {
  if (e == null) return {};
  var r = TD(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function TD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function jD(e) {
  return e.value
}

function MD(e, t) {
  if (ao.isValidElement(e)) return ao.cloneElement(e, t);
  if (typeof e == "function") return ao.createElement(e, t);
  var r = t.ref,
    n = PD(t, gD);
  return ao.createElement(fu, n)
}
var wb = 1,
  Dt = function(e) {
    function t() {
      var r;
      bD(this, t);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = wD(this, t, [].concat(i)), wu(r, "lastBoundingBox", {
        width: -1,
        height: -1
      }), r
    }
    return AD(t, e), xD(t, [{
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
        return ao.createElement("div", {
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
wu(Dt, "displayName", "Legend");
wu(Dt, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
import fo, {
  PureComponent as hR
} from "./react-shim-eraudit.js";
var yx = te(Su()),
  vx = te(Tt());
import yr from "./react-shim-eraudit.js";

function so(e) {
  "@babel/helpers - typeof";
  return so = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, so(e)
}

function uf() {
  return uf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, uf.apply(this, arguments)
}

function BN(e, t) {
  return FN(e) || zN(e, t) || WN(e, t) || qN()
}

function qN() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function WN(e, t) {
  if (e) {
    if (typeof e == "string") return mx(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return mx(e, t)
  }
}

function mx(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function zN(e, t) {
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

function FN(e) {
  if (Array.isArray(e)) return e
}

function hx(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function af(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hx(Object(r), !0).forEach(function(n) {
      $N(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hx(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function $N(e, t, r) {
  return t = UN(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function UN(e) {
  var t = HN(e, "string");
  return so(t) == "symbol" ? t : t + ""
}

function HN(e, t) {
  if (so(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (so(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function GN(e) {
  return Array.isArray(e) && je(e[0]) && je(e[1]) ? e.join(" ~ ") : e
}
var gx = function(t) {
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
    d = t.wrapperClassName,
    y = t.labelClassName,
    m = t.label,
    v = t.labelFormatter,
    x = t.accessibilityLayer,
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
              j = T,
              E = A;
            if (O && j != null && E != null) {
              var D = O(T, A, F, z, f);
              if (Array.isArray(D)) {
                var L = BN(D, 2);
                j = L[0], E = L[1]
              } else j = D
            }
            return yr.createElement("li", {
              className: "recharts-tooltip-item",
              key: "tooltip-item-".concat(z),
              style: b
            }, je(E) ? yr.createElement("span", {
              className: "recharts-tooltip-item-name"
            }, E) : null, je(E) ? yr.createElement("span", {
              className: "recharts-tooltip-item-separator"
            }, n) : null, yr.createElement("span", {
              className: "recharts-tooltip-item-value"
            }, j), yr.createElement("span", {
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
    C = ae("recharts-default-tooltip", d),
    k = ae("recharts-tooltip-label", y);
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

function co(e) {
  "@babel/helpers - typeof";
  return co = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, co(e)
}

function Au(e, t, r) {
  return t = KN(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function KN(e) {
  var t = VN(e, "string");
  return co(t) == "symbol" ? t : t + ""
}

function VN(e, t) {
  if (co(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (co(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var lo = "recharts-tooltip-wrapper",
  XN = {
    visibility: "hidden"
  };

function YN(e) {
  var t = e.coordinate,
    r = e.translateX,
    n = e.translateY;
  return ae(lo, Au(Au(Au(Au({}, "".concat(lo, "-right"), X(r) && t && X(t.x) && r >= t.x), "".concat(lo, "-left"), X(r) && t && X(t.x) && r < t.x), "".concat(lo, "-bottom"), X(n) && t && X(t.y) && n >= t.y), "".concat(lo, "-top"), X(n) && t && X(t.y) && n < t.y))
}

function bx(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.key,
    i = e.offsetTopLeft,
    o = e.position,
    a = e.reverseDirection,
    u = e.tooltipDimension,
    s = e.viewBox,
    l = e.viewBoxDimension;
  if (o && X(o[n])) return o[n];
  var f = r[n] - u - i,
    c = r[n] + i;
  if (t[n]) return a[n] ? f : c;
  if (a[n]) {
    var p = f,
      d = s[n];
    return p < d ? Math.max(c, s[n]) : Math.max(f, s[n])
  }
  var y = c + u,
    m = s[n] + l;
  return y > m ? Math.max(f, s[n]) : Math.max(c, s[n])
}

function ZN(e) {
  var t = e.translateX,
    r = e.translateY,
    n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  }
}

function xx(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.offsetTopLeft,
    i = e.position,
    o = e.reverseDirection,
    a = e.tooltipBox,
    u = e.useTranslate3d,
    s = e.viewBox,
    l, f, c;
  return a.height > 0 && a.width > 0 && r ? (f = bx({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), c = bx({
    allowEscapeViewBox: t,
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

function $n(e) {
  "@babel/helpers - typeof";
  return $n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, $n(e)
}

function wx(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ox(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wx(Object(r), !0).forEach(function(n) {
      lf(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wx(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function JN(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Sx(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Px(n.key), n)
  }
}

function QN(e, t, r) {
  return t && Sx(e.prototype, t), r && Sx(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function eR(e, t, r) {
  return t = _u(t), tR(e, _x() ? Reflect.construct(t, r || [], _u(e).constructor) : t.apply(e, r))
}

function tR(e, t) {
  if (t && ($n(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return rR(e)
}

function rR(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function _x() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (_x = function() {
    return !!e
  })()
}

function _u(e) {
  return _u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, _u(e)
}

function nR(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && sf(e, t)
}

function sf(e, t) {
  return sf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, sf(e, t)
}

function lf(e, t, r) {
  return t = Px(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Px(e) {
  var t = iR(e, "string");
  return $n(t) == "symbol" ? t : t + ""
}

function iR(e, t) {
  if ($n(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if ($n(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Ax = 1,
  Tx = function(e) {
    function t() {
      var r;
      JN(this, t);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = eR(this, t, [].concat(i)), lf(r, "state", {
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
    return nR(t, e), QN(t, [{
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
  st = {
    isSsr: uR(),
    get: function(t) {
      return st[t]
    },
    set: function(t, r) {
      if (typeof t == "string") st[t] = r;
      else {
        var n = Object.keys(t);
        n && n.length && n.forEach(function(i) {
          st[i] = t[i]
        })
      }
    }
  };

function Un(e) {
  "@babel/helpers - typeof";
  return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Un(e)
}

function Ex(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function jx(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ex(Object(r), !0).forEach(function(n) {
      ff(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ex(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function sR(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Mx(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Ix(n.key), n)
  }
}

function lR(e, t, r) {
  return t && Mx(e.prototype, t), r && Mx(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function cR(e, t, r) {
  return t = Pu(t), fR(e, Cx() ? Reflect.construct(t, r || [], Pu(e).constructor) : t.apply(e, r))
}

function fR(e, t) {
  if (t && (Un(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return pR(e)
}

function pR(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Cx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Cx = function() {
    return !!e
  })()
}

function Pu(e) {
  return Pu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Pu(e)
}

function dR(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && cf(e, t)
}

function cf(e, t) {
  return cf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, cf(e, t)
}

function ff(e, t, r) {
  return t = Ix(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Ix(e) {
  var t = mR(e, "string");
  return Un(t) == "symbol" ? t : t + ""
}

function mR(e, t) {
  if (Un(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Un(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function yR(e) {
  return e.dataKey
}

function vR(e, t) {
  return fo.isValidElement(e) ? fo.cloneElement(e, t) : typeof e == "function" ? fo.createElement(e, t) : fo.createElement(gx, t)
}
var dt = function(e) {
  function t() {
    return sR(this, t), cR(this, t, arguments)
  }
  return dR(t, e), lR(t, [{
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
      return fo.createElement(Tx, {
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
ff(dt, "displayName", "Tooltip");
ff(dt, "defaultProps", {
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
  isAnimationActive: !st.isSsr,
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
var Xx = te(mf());
import hf, {
  forwardRef as XR,
  cloneElement as YR,
  useState as ZR,
  useImperativeHandle as JR,
  useRef as Vx,
  useEffect as QR,
  useMemo as eL,
  useCallback as tL
} from "./react-shim-eraudit.js";

function po(e) {
  "@babel/helpers - typeof";
  return po = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, po(e)
}

function Gx(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Tu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gx(Object(r), !0).forEach(function(n) {
      zR(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gx(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function zR(e, t, r) {
  return t = FR(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function FR(e) {
  var t = $R(e, "string");
  return po(t) == "symbol" ? t : t + ""
}

function $R(e, t) {
  if (po(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (po(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function UR(e, t) {
  return VR(e) || KR(e, t) || GR(e, t) || HR()
}

function HR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function GR(e, t) {
  if (e) {
    if (typeof e == "string") return Kx(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Kx(e, t)
  }
}

function Kx(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function KR(e, t) {
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

function VR(e) {
  if (Array.isArray(e)) return e
}
var Eu = XR(function(e, t) {
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
    d = e.children,
    y = e.debounce,
    m = y === void 0 ? 0 : y,
    v = e.id,
    x = e.className,
    w = e.onResize,
    S = e.style,
    P = S === void 0 ? {} : S,
    h = Vx(null),
    g = Vx();
  g.current = w, JR(t, function() {
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
    W = tL(function(H, F) {
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
      var j, E = A[0].contentRect,
        D = E.width,
        L = E.height;
      W(D, L), (j = g.current) === null || j === void 0 || j.call(g, D, L)
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
  var R = eL(function() {
    var H = k.containerWidth,
      F = k.containerHeight;
    if (H < 0 || F < 0) return null;
    ut(pr(a) || pr(s), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, a, s), ut(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var z = pr(a) ? H : a,
      b = pr(s) ? F : s;
    r && r > 0 && (z ? b = z / r : b && (z = b * r), p && b > p && (b = p)), ut(z > 0 || b > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, z, b, a, s, f, c, r);
    var O = !Array.isArray(d) && jt(d.type).endsWith("Chart");
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
    className: ae("recharts-responsive-container", x),
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
var yf = function(t) {
  return null
};
yf.displayName = "Cell";
var bf = te(Tt());
import l0, {
  useMemo as ML
} from "./react-shim-eraudit.js";

function mo(e) {
  "@babel/helpers - typeof";
  return mo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, mo(e)
}

function Yx(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function vf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yx(Object(r), !0).forEach(function(n) {
      rL(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Yx(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function rL(e, t, r) {
  return t = nL(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function nL(e) {
  var t = iL(e, "string");
  return mo(t) == "symbol" ? t : t + ""
}

function iL(e, t) {
  if (mo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (mo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Hn = {
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

function uL(e) {
  var t = vf({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r]
  }), t
}
var Vr = function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t == null || st.isSsr) return {
      width: 0,
      height: 0
    };
    var n = uL(r),
      i = JSON.stringify({
        text: t,
        copyStyle: n
      });
    if (Hn.widthCache[i]) return Hn.widthCache[i];
    try {
      var o = document.getElementById(Zx);
      o || (o = document.createElement("span"), o.setAttribute("id", Zx), o.setAttribute("aria-hidden", "true"), document.body.appendChild(o));
      var a = vf(vf({}, aL), n);
      Object.assign(o.style, a), o.textContent = "".concat(t);
      var u = o.getBoundingClientRect(),
        s = {
          width: u.width,
          height: u.height
        };
      return Hn.widthCache[i] = s, ++Hn.cacheCount > oL && (Hn.cacheCount = 0, Hn.widthCache = {}), s
    } catch {
      return {
        width: 0,
        height: 0
      }
    }
  },
  Jx = function(t) {
    return {
      top: t.top + window.scrollY - document.documentElement.clientTop,
      left: t.left + window.scrollX - document.documentElement.clientLeft
    }
  };

function ho(e) {
  "@babel/helpers - typeof";
  return ho = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ho(e)
}

function Mu(e, t) {
  return fL(e) || cL(e, t) || lL(e, t) || sL()
}

function sL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function lL(e, t) {
  if (e) {
    if (typeof e == "string") return Qx(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Qx(e, t)
  }
}

function Qx(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function cL(e, t) {
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

function fL(e) {
  if (Array.isArray(e)) return e
}

function pL(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function e0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, mL(n.key), n)
  }
}

function dL(e, t, r) {
  return t && e0(e.prototype, t), r && e0(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function mL(e) {
  var t = hL(e, "string");
  return ho(t) == "symbol" ? t : t + ""
}

function hL(e, t) {
  if (ho(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ho(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var t0 = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
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
  Gn = "NaN";

function bL(e, t) {
  return e * i0[t]
}
var ju = function() {
  function e(t, r) {
    pL(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !yL.test(r) && (this.num = NaN, this.unit = ""), gL.includes(r) && (this.num = bL(t, r), this.unit = "px")
  }
  return dL(e, [{
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
      var n, i = (n = vL.exec(r)) !== null && n !== void 0 ? n : [],
        o = Mu(i, 3),
        a = o[1],
        u = o[2];
      return new e(parseFloat(a), u ?? "")
    }
  }])
}();

function o0(e) {
  if (e.includes(Gn)) return Gn;
  for (var t = e; t.includes("*") || t.includes("/");) {
    var r, n = (r = t0.exec(t)) !== null && r !== void 0 ? r : [],
      i = Mu(n, 4),
      o = i[1],
      a = i[2],
      u = i[3],
      s = ju.parse(o ?? ""),
      l = ju.parse(u ?? ""),
      f = a === "*" ? s.multiply(l) : s.divide(l);
    if (f.isNaN()) return Gn;
    t = t.replace(t0, f.toString())
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t);) {
    var c, p = (c = r0.exec(t)) !== null && c !== void 0 ? c : [],
      d = Mu(p, 4),
      y = d[1],
      m = d[2],
      v = d[3],
      x = ju.parse(y ?? ""),
      w = ju.parse(v ?? ""),
      S = m === "+" ? x.add(w) : x.subtract(w);
    if (S.isNaN()) return Gn;
    t = t.replace(r0, S.toString())
  }
  return t
}
var n0 = /\(([^()]*)\)/;

function xL(e) {
  for (var t = e; t.includes("(");) {
    var r = n0.exec(t),
      n = Mu(r, 2),
      i = n[1];
    t = t.replace(n0, o0(i))
  }
  return t
}

function wL(e) {
  var t = e.replace(/\s+/g, "");
  return t = xL(t), t = o0(t), t
}

function OL(e) {
  try {
    return wL(e)
  } catch {
    return Gn
  }
}

function Cu(e) {
  var t = OL(e.slice(5, -1));
  return t === Gn ? "" : t
}
var SL = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
  AL = ["dx", "dy", "angle", "className", "breakAll"];

function gf() {
  return gf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, gf.apply(this, arguments)
}

function a0(e, t) {
  if (e == null) return {};
  var r = _L(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function _L(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function u0(e, t) {
  return jL(e) || EL(e, t) || TL(e, t) || PL()
}

function PL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function TL(e, t) {
  if (e) {
    if (typeof e == "string") return s0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return s0(e, t)
  }
}

function s0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function EL(e, t) {
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

function jL(e) {
  if (Array.isArray(e)) return e
}
var p0 = /[ \f\n\r\t\v\u2028\u2029]+/,
  d0 = function(t) {
    var r = t.children,
      n = t.breakAll,
      i = t.style;
    try {
      var o = [];
      (0, bf.default)(r) || (n ? o = r.toString().split("") : o = r.toString().split(p0));
      var a = o.map(function(s) {
          return {
            word: s,
            width: Vr(s, i).width
          }
        }),
        u = n ? 0 : Vr("\xA0", i).width;
      return {
        wordsWithComputedWidth: a,
        spaceWidth: u
      }
    } catch {
      return null
    }
  },
  CL = function(t, r, n, i, o) {
    var a = t.maxLines,
      u = t.children,
      s = t.style,
      l = t.breakAll,
      f = X(a),
      c = u,
      p = function() {
        var z = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return z.reduce(function(b, O) {
          var T = O.word,
            A = O.width,
            j = b[b.length - 1];
          if (j && (i == null || o || j.width + A + n < Number(i))) j.words.push(T), j.width += A + n;
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
  c0 = function(t) {
    var r = (0, bf.default)(t) ? [] : t.toString().split(p0);
    return [{
      words: r
    }]
  },
  IL = function(t) {
    var r = t.width,
      n = t.scaleToFit,
      i = t.children,
      o = t.style,
      a = t.breakAll,
      u = t.maxLines;
    if ((r || n) && !st.isSsr) {
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
  Xr = function(t) {
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
      d = p === void 0 ? "start" : p,
      y = t.verticalAnchor,
      m = y === void 0 ? "end" : y,
      v = t.fill,
      x = v === void 0 ? f0 : v,
      w = a0(t, SL),
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
    if (!je(n) || !je(o)) return null;
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
    return g && H.push("rotate(".concat(g, ", ").concat(B, ", ").concat(W, ")")), H.length && (k.transform = H.join(" ")), l0.createElement("text", gf({}, ue(k, !0), {
      x: B,
      y: W,
      className: ae("recharts-text", _),
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
var Yo = te(Tt()),
  Zo = te(Le()),
  Tp = te(Pt());
import ur, {
  cloneElement as Pp,
  isValidElement as Ss,
  createElement as Ez
} from "./react-shim-eraudit.js";
var cz = te(Tt()),
  fz = te(Le());
import {
  isValidElement as ZQ
} from "./react-shim-eraudit.js";
var ds = {};
Q_(ds, {
  scaleBand: () => _r,
  scaleDiverging: () => fs,
  scaleDivergingLog: () => Jf,
  scaleDivergingPow: () => ps,
  scaleDivergingSqrt: () => Dw,
  scaleDivergingSymlog: () => Qf,
  scaleIdentity: () => Xu,
  scaleImplicit: () => Bu,
  scaleLinear: () => on,
  scaleLog: () => Yu,
  scaleOrdinal: () => Xn,
  scalePoint: () => Pr,
  scalePow: () => jo,
  scaleQuantile: () => Qu,
  scaleQuantize: () => es,
  scaleRadial: () => Ju,
  scaleSequential: () => us,
  scaleSequentialLog: () => Yf,
  scaleSequentialPow: () => ss,
  scaleSequentialQuantile: () => ls,
  scaleSequentialSqrt: () => kw,
  scaleSequentialSymlog: () => Zf,
  scaleSqrt: () => tw,
  scaleSymlog: () => Zu,
  scaleThreshold: () => ts,
  scaleTime: () => Vf,
  scaleUtc: () => Xf,
  tickFormat: () => Ao
});

function lt(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}

function xf(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}

function Yr(e) {
  let t, r, n;
  e.length !== 2 ? (t = lt, r = (u, s) => lt(e(u), s), n = (u, s) => e(u) - s) : (t = e === lt || e === xf ? e : kL, r = e, n = e);

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

function kL() {
  return 0
}

function yo(e) {
  return e === null ? NaN : +e
}

function* m0(e, t) {
  if (t === void 0)
    for (let r of e) r != null && (r = +r) >= r && (yield r);
  else {
    let r = -1;
    for (let n of e)(n = t(n, ++r, e)) != null && (n = +n) >= n && (yield n)
  }
}
var h0 = Yr(lt),
  y0 = h0.right,
  DL = h0.left,
  NL = Yr(yo).center,
  Ft = y0;
var Kn = class extends Map {
  constructor(t, r = BL) {
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
    return super.get(v0(this, t))
  }
  has(t) {
    return super.has(v0(this, t))
  }
  set(t, r) {
    return super.set(RL(this, t), r)
  }
  delete(t) {
    return super.delete(LL(this, t))
  }
};

function v0({
  _intern: e,
  _key: t
}, r) {
  let n = t(r);
  return e.has(n) ? e.get(n) : r
}

function RL({
  _intern: e,
  _key: t
}, r) {
  let n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r)
}

function LL({
  _intern: e,
  _key: t
}, r) {
  let n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r
}

function BL(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e
}

function g0(e = lt) {
  if (e === lt) return wf;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    let n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0)
  }
}

function wf(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0)
}
var qL = Math.sqrt(50),
  WL = Math.sqrt(10),
  zL = Math.sqrt(2);

function Iu(e, t, r) {
  let n = (t - e) / Math.max(0, r),
    i = Math.floor(Math.log10(n)),
    o = n / Math.pow(10, i),
    a = o >= qL ? 10 : o >= WL ? 5 : o >= zL ? 2 : 1,
    u, s, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, u = Math.round(e * l), s = Math.round(t * l), u / l < e && ++u, s / l > t && --s, l = -l) : (l = Math.pow(10, i) * a, u = Math.round(e / l), s = Math.round(t / l), u * l < e && ++u, s * l > t && --s), s < u && .5 <= r && r < 2 ? Iu(e, t, r * 2) : [u, s, l]
}

function Zr(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  let n = t < e,
    [i, o, a] = n ? Iu(t, e, r) : Iu(e, t, r);
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

function vo(e, t, r) {
  return t = +t, e = +e, r = +r, Iu(e, t, r)[2]
}

function Vn(e, t, r) {
  t = +t, e = +e, r = +r;
  let n = t < e,
    i = n ? vo(t, e, r) : vo(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i)
}

function ku(e, t) {
  let r;
  if (t === void 0)
    for (let n of e) n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of e)(i = t(i, ++n, e)) != null && (r < i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Du(e, t) {
  let r;
  if (t === void 0)
    for (let n of e) n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of e)(i = t(i, ++n, e)) != null && (r > i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Nu(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? wf : g0(i); n > r;) {
    if (n - r > 600) {
      let s = n - r + 1,
        l = t - r + 1,
        f = Math.log(s),
        c = .5 * Math.exp(2 * f / 3),
        p = .5 * Math.sqrt(f * c * (s - c) / s) * (l - s / 2 < 0 ? -1 : 1),
        d = Math.max(r, Math.floor(t - l * c / s + p)),
        y = Math.min(n, Math.floor(t + (s - l) * c / s + p));
      Nu(e, t, d, y, i)
    }
    let o = e[t],
      a = r,
      u = n;
    for (go(e, r, t), i(e[n], o) > 0 && go(e, r, n); a < u;) {
      for (go(e, a, u), ++a, --u; i(e[a], o) < 0;) ++a;
      for (; i(e[u], o) > 0;) --u
    }
    i(e[r], o) === 0 ? go(e, r, u) : (++u, go(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1)
  }
  return e
}

function go(e, t, r) {
  let n = e[t];
  e[t] = e[r], e[r] = n
}

function Ru(e, t, r) {
  if (e = Float64Array.from(m0(e, r)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return Du(e);
    if (t >= 1) return ku(e);
    var n, i = (n - 1) * t,
      o = Math.floor(i),
      a = ku(Nu(e, o).subarray(0, o + 1)),
      u = Du(e.subarray(o + 1));
    return a + (u - a) * (i - o)
  }
}

function Of(e, t, r = yo) {
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

function Lu(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, o = new Array(i); ++n < i;) o[n] = e + n * r;
  return o
}

function Ie(e, t) {
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

function Nt(e, t) {
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
var Bu = Symbol("implicit");

function Xn() {
  var e = new Kn,
    t = [],
    r = [],
    n = Bu;

  function i(o) {
    let a = e.get(o);
    if (a === void 0) {
      if (n !== Bu) return n;
      e.set(o, a = t.push(o) - 1)
    }
    return r[a % r.length]
  }
  return i.domain = function(o) {
    if (!arguments.length) return t.slice();
    t = [], e = new Kn;
    for (let a of o) e.has(a) || e.set(a, t.push(a) - 1);
    return i
  }, i.range = function(o) {
    return arguments.length ? (r = Array.from(o), i) : r.slice()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return Xn(t, r).unknown(n)
  }, Ie.apply(i, arguments), i
}

function _r() {
  var e = Xn().unknown(void 0),
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
      d = i < n,
      y = d ? i : n,
      m = d ? n : i;
    o = (m - y) / Math.max(1, p - s + l * 2), u && (o = Math.floor(o)), y += (m - y - o * (p - s)) * f, a = o * (1 - s), u && (y = Math.round(y), a = Math.round(a));
    var v = Lu(p).map(function(x) {
      return y + o * x
    });
    return r(d ? v.reverse() : v)
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
  }, Ie.apply(c(), arguments)
}

function b0(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return b0(t())
  }, e
}

function Pr() {
  return b0(_r.apply(null, arguments).paddingInner(1))
}

function qu(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e
}

function Sf(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r
}

function wo() {}
var bo = .7,
  Fu = 1 / bo,
  Yn = "\\s*([+-]?\\d+)\\s*",
  xo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  rr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  FL = /^#([0-9a-f]{3,8})$/,
  $L = new RegExp(`^rgb\\(${Yn},${Yn},${Yn}\\)$`),
  UL = new RegExp(`^rgb\\(${rr},${rr},${rr}\\)$`),
  HL = new RegExp(`^rgba\\(${Yn},${Yn},${Yn},${xo}\\)$`),
  GL = new RegExp(`^rgba\\(${rr},${rr},${rr},${xo}\\)$`),
  KL = new RegExp(`^hsl\\(${xo},${rr},${rr}\\)$`),
  VL = new RegExp(`^hsla\\(${xo},${rr},${rr},${xo}\\)$`),
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
qu(wo, Tr, {
  copy(e) {
    return Object.assign(new this.constructor, this, e)
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

function Tr(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = FL.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? S0(t) : r === 3 ? new mt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? Wu(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? Wu(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = $L.exec(e)) ? new mt(t[1], t[2], t[3], 1) : (t = UL.exec(e)) ? new mt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = HL.exec(e)) ? Wu(t[1], t[2], t[3], t[4]) : (t = GL.exec(e)) ? Wu(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = KL.exec(e)) ? P0(t[1], t[2] / 100, t[3] / 100, 1) : (t = VL.exec(e)) ? P0(t[1], t[2] / 100, t[3] / 100, t[4]) : x0.hasOwnProperty(e) ? S0(x0[e]) : e === "transparent" ? new mt(NaN, NaN, NaN, 0) : null
}

function S0(e) {
  return new mt(e >> 16 & 255, e >> 8 & 255, e & 255, 1)
}

function Wu(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new mt(e, t, r, n)
}

function ZL(e) {
  return e instanceof wo || (e = Tr(e)), e ? (e = e.rgb(), new mt(e.r, e.g, e.b, e.opacity)) : new mt
}

function Zn(e, t, r, n) {
  return arguments.length === 1 ? ZL(e) : new mt(e, t, r, n ?? 1)
}

function mt(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n
}
qu(mt, Zn, Sf(wo, {
  brighter(e) {
    return e = e == null ? Fu : Math.pow(Fu, e), new mt(this.r * e, this.g * e, this.b * e, this.opacity)
  },
  darker(e) {
    return e = e == null ? bo : Math.pow(bo, e), new mt(this.r * e, this.g * e, this.b * e, this.opacity)
  },
  rgb() {
    return this
  },
  clamp() {
    return new mt(Qr(this.r), Qr(this.g), Qr(this.b), $u(this.opacity))
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
  return `#${Jr(this.r)}${Jr(this.g)}${Jr(this.b)}`
}

function JL() {
  return `#${Jr(this.r)}${Jr(this.g)}${Jr(this.b)}${Jr((isNaN(this.opacity)?1:this.opacity)*255)}`
}

function _0() {
  let e = $u(this.opacity);
  return `${e===1?"rgb(":"rgba("}${Qr(this.r)}, ${Qr(this.g)}, ${Qr(this.b)}${e===1?")":`, ${e})`}`
}

function $u(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e))
}

function Qr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0))
}

function Jr(e) {
  return e = Qr(e), (e < 16 ? "0" : "") + e.toString(16)
}

function P0(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new $t(e, t, r, n)
}

function E0(e) {
  if (e instanceof $t) return new $t(e.h, e.s, e.l, e.opacity);
  if (e instanceof wo || (e = Tr(e)), !e) return new $t;
  if (e instanceof $t) return e;
  e = e.rgb();
  var t = e.r / 255,
    r = e.g / 255,
    n = e.b / 255,
    i = Math.min(t, r, n),
    o = Math.max(t, r, n),
    a = NaN,
    u = o - i,
    s = (o + i) / 2;
  return u ? (t === o ? a = (r - n) / u + (r < n) * 6 : r === o ? a = (n - t) / u + 2 : a = (t - r) / u + 4, u /= s < .5 ? o + i : 2 - o - i, a *= 60) : u = s > 0 && s < 1 ? 0 : a, new $t(a, u, s, e.opacity)
}

function j0(e, t, r, n) {
  return arguments.length === 1 ? E0(e) : new $t(e, t, r, n ?? 1)
}

function $t(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n
}
qu($t, j0, Sf(wo, {
  brighter(e) {
    return e = e == null ? Fu : Math.pow(Fu, e), new $t(this.h, this.s, this.l * e, this.opacity)
  },
  darker(e) {
    return e = e == null ? bo : Math.pow(bo, e), new $t(this.h, this.s, this.l * e, this.opacity)
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360,
      t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
      r = this.l,
      n = r + (r < .5 ? r : 1 - r) * t,
      i = 2 * r - n;
    return new mt(Af(e >= 240 ? e - 240 : e + 120, i, n), Af(e, i, n), Af(e < 120 ? e + 240 : e - 120, i, n), this.opacity)
  },
  clamp() {
    return new $t(T0(this.h), zu(this.s), zu(this.l), $u(this.opacity))
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
  },
  formatHsl() {
    let e = $u(this.opacity);
    return `${e===1?"hsl(":"hsla("}${T0(this.h)}, ${zu(this.s)*100}%, ${zu(this.l)*100}%${e===1?")":`, ${e})`}`
  }
}));

function T0(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e
}

function zu(e) {
  return Math.max(0, Math.min(1, e || 0))
}

function Af(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255
}

function _f(e, t, r, n, i) {
  var o = e * e,
    a = o * e;
  return ((1 - 3 * e + 3 * o - a) * t + (4 - 6 * o + 3 * a) * r + (1 + 3 * e + 3 * o - 3 * a) * n + a * i) / 6
}

function M0(e) {
  var t = e.length - 1;
  return function(r) {
    var n = r <= 0 ? r = 0 : r >= 1 ? (r = 1, t - 1) : Math.floor(r * t),
      i = e[n],
      o = e[n + 1],
      a = n > 0 ? e[n - 1] : 2 * i - o,
      u = n < t - 1 ? e[n + 2] : 2 * o - i;
    return _f((r - n / t) * t, a, i, o, u)
  }
}

function C0(e) {
  var t = e.length;
  return function(r) {
    var n = Math.floor(((r %= 1) < 0 ? ++r : r) * t),
      i = e[(n + t - 1) % t],
      o = e[n % t],
      a = e[(n + 1) % t],
      u = e[(n + 2) % t];
    return _f((r - n / t) * t, i, o, a, u)
  }
}
var Oo = e => () => e;

function QL(e, t) {
  return function(r) {
    return e + r * t
  }
}

function eB(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r,
    function(n) {
      return Math.pow(e + n * t, r)
    }
}

function I0(e) {
  return (e = +e) == 1 ? Uu : function(t, r) {
    return r - t ? eB(t, r, e) : Oo(isNaN(t) ? r : t)
  }
}

function Uu(e, t) {
  var r = t - e;
  return r ? QL(e, r) : Oo(isNaN(e) ? t : e)
}
var Pf = function e(t) {
  var r = I0(t);

  function n(i, o) {
    var a = r((i = Zn(i)).r, (o = Zn(o)).r),
      u = r(i.g, o.g),
      s = r(i.b, o.b),
      l = Uu(i.opacity, o.opacity);
    return function(f) {
      return i.r = a(f), i.g = u(f), i.b = s(f), i.opacity = l(f), i + ""
    }
  }
  return n.gamma = e, n
}(1);

function k0(e) {
  return function(t) {
    var r = t.length,
      n = new Array(r),
      i = new Array(r),
      o = new Array(r),
      a, u;
    for (a = 0; a < r; ++a) u = Zn(t[a]), n[a] = u.r || 0, i[a] = u.g || 0, o[a] = u.b || 0;
    return n = e(n), i = e(i), o = e(o), u.opacity = 1,
      function(s) {
        return u.r = n(s), u.g = i(s), u.b = o(s), u + ""
      }
  }
}
var OX = k0(M0),
  SX = k0(C0);

function D0(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0,
    n = t.slice(),
    i;
  return function(o) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - o) + t[i] * o;
    return n
  }
}

function N0(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView)
}

function R0(e, t) {
  var r = t ? t.length : 0,
    n = e ? Math.min(r, e.length) : 0,
    i = new Array(n),
    o = new Array(r),
    a;
  for (a = 0; a < n; ++a) i[a] = gt(e[a], t[a]);
  for (; a < r; ++a) o[a] = t[a];
  return function(u) {
    for (a = 0; a < n; ++a) o[a] = i[a](u);
    return o
  }
}

function L0(e, t) {
  var r = new Date;
  return e = +e, t = +t,
    function(n) {
      return r.setTime(e * (1 - n) + t * n), r
    }
}

function Er(e, t) {
  return e = +e, t = +t,
    function(r) {
      return e * (1 - r) + t * r
    }
}

function B0(e, t) {
  var r = {},
    n = {},
    i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t) i in e ? r[i] = gt(e[i], t[i]) : n[i] = t[i];
  return function(o) {
    for (i in r) n[i] = r[i](o);
    return n
  }
}
var Ef = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Tf = new RegExp(Ef.source, "g");

function tB(e) {
  return function() {
    return e
  }
}

function rB(e) {
  return function(t) {
    return e(t) + ""
  }
}

function q0(e, t) {
  var r = Ef.lastIndex = Tf.lastIndex = 0,
    n, i, o, a = -1,
    u = [],
    s = [];
  for (e = e + "", t = t + "";
    (n = Ef.exec(e)) && (i = Tf.exec(t));)(o = i.index) > r && (o = t.slice(r, o), u[a] ? u[a] += o : u[++a] = o), (n = n[0]) === (i = i[0]) ? u[a] ? u[a] += i : u[++a] = i : (u[++a] = null, s.push({
    i: a,
    x: Er(n, i)
  })), r = Tf.lastIndex;
  return r < t.length && (o = t.slice(r), u[a] ? u[a] += o : u[++a] = o), u.length < 2 ? s[0] ? rB(s[0].x) : tB(t) : (t = s.length, function(l) {
    for (var f = 0, c; f < t; ++f) u[(c = s[f]).i] = c.x(l);
    return u.join("")
  })
}

function gt(e, t) {
  var r = typeof t,
    n;
  return t == null || r === "boolean" ? Oo(t) : (r === "number" ? Er : r === "string" ? (n = Tr(t)) ? (t = n, Pf) : q0 : t instanceof Tr ? Pf : t instanceof Date ? L0 : N0(t) ? D0 : Array.isArray(t) ? R0 : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? B0 : Er)(e, t)
}

function en(e, t) {
  return e = +e, t = +t,
    function(r) {
      return Math.round(e * (1 - r) + t * r)
    }
}

function Hu(e, t) {
  t === void 0 && (t = e, e = gt);
  for (var r = 0, n = t.length - 1, i = t[0], o = new Array(n < 0 ? 0 : n); r < n;) o[r] = e(i, i = t[++r]);
  return function(a) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(a *= n)));
    return o[u](a - u)
  }
}

function jf(e) {
  return function() {
    return e
  }
}

function jr(e) {
  return +e
}
var W0 = [0, 1];

function ze(e) {
  return e
}

function Mf(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t
  } : jf(isNaN(t) ? NaN : .5)
}

function nB(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r),
    function(n) {
      return Math.max(e, Math.min(t, n))
    }
}

function iB(e, t, r) {
  var n = e[0],
    i = e[1],
    o = t[0],
    a = t[1];
  return i < n ? (n = Mf(i, n), o = r(a, o)) : (n = Mf(n, i), o = r(o, a)),
    function(u) {
      return o(n(u))
    }
}

function oB(e, t, r) {
  var n = Math.min(e.length, t.length) - 1,
    i = new Array(n),
    o = new Array(n),
    a = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++a < n;) i[a] = Mf(e[a], e[a + 1]), o[a] = r(t[a], t[a + 1]);
  return function(u) {
    var s = Ft(e, u, 1, n) - 1;
    return o[s](i[s](u))
  }
}

function nr(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown())
}

function tn() {
  var e = W0,
    t = W0,
    r = gt,
    n, i, o, a = ze,
    u, s, l;

  function f() {
    var p = Math.min(e.length, t.length);
    return a !== ze && (a = nB(e[0], e[p - 1])), u = p > 2 ? oB : iB, s = l = null, c
  }

  function c(p) {
    return p == null || isNaN(p = +p) ? o : (s || (s = u(e.map(n), t, r)))(n(a(p)))
  }
  return c.invert = function(p) {
      return a(i((l || (l = u(t, e.map(n), Er)))(p)))
    }, c.domain = function(p) {
      return arguments.length ? (e = Array.from(p, jr), f()) : e.slice()
    }, c.range = function(p) {
      return arguments.length ? (t = Array.from(p), f()) : t.slice()
    }, c.rangeRound = function(p) {
      return t = Array.from(p), r = en, f()
    }, c.clamp = function(p) {
      return arguments.length ? (a = p ? !0 : ze, f()) : a !== ze
    }, c.interpolate = function(p) {
      return arguments.length ? (r = p, f()) : r
    }, c.unknown = function(p) {
      return arguments.length ? (o = p, c) : o
    },
    function(p, d) {
      return n = p, i = d, f()
    }
}

function rn() {
  return tn()(ze, ze)
}

function z0(e) {
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

function F0(e, t) {
  return function(r, n) {
    for (var i = r.length, o = [], a = 0, u = e[0], s = 0; i > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), o.push(r.substring(i -= u, i + u)), !((s += u + 1) > n));) u = e[a = (a + 1) % e.length];
    return o.reverse().join(t)
  }
}

function $0(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r]
    })
  }
}
var aB = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function or(e) {
  if (!(t = aB.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new Gu({
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
or.prototype = Gu.prototype;

function Gu(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + ""
}
Gu.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type
};

function U0(e) {
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
var So;

function H0(e, t) {
  var r = nn(e, t);
  if (!r) return So = void 0, e.toPrecision(t);
  var n = r[0],
    i = r[1],
    o = i - (So = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    a = n.length;
  return o === a ? n : o > a ? n + new Array(o - a + 1).join("0") : o > 0 ? n.slice(0, o) + "." + n.slice(o) : "0." + new Array(1 - o).join("0") + nn(e, Math.max(0, t + o - 1))[0]
}

function Cf(e, t) {
  var r = nn(e, t);
  if (!r) return e + "";
  var n = r[0],
    i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0")
}
var If = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: e => Math.round(e).toString(2),
  c: e => e + "",
  d: z0,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: e => Math.round(e).toString(8),
  p: (e, t) => Cf(e * 100, t),
  r: Cf,
  s: H0,
  X: e => Math.round(e).toString(16).toUpperCase(),
  x: e => Math.round(e).toString(16)
};

function kf(e) {
  return e
}
var G0 = Array.prototype.map,
  K0 = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function V0(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? kf : F0(G0.call(e.grouping, Number), e.thousands + ""),
    r = e.currency === void 0 ? "" : e.currency[0] + "",
    n = e.currency === void 0 ? "" : e.currency[1] + "",
    i = e.decimal === void 0 ? "." : e.decimal + "",
    o = e.numerals === void 0 ? kf : $0(G0.call(e.numerals, String)),
    a = e.percent === void 0 ? "%" : e.percent + "",
    u = e.minus === void 0 ? "\u2212" : e.minus + "",
    s = e.nan === void 0 ? "NaN" : e.nan + "";

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
        if (R = isNaN(R) ? s : k(Math.abs(R), P), h && (R = U0(R)), T && +R == 0 && m !== "+" && (T = !1), H = (T ? m === "(" ? m : u : m === "-" || m === "(" ? "" : m) + H, F = (g === "s" && !isNaN(R) && So !== void 0 ? K0[8 + So / 3] : "") + F + (T && m === "(" ? ")" : ""), B) {
          for (z = -1, b = R.length; ++z < b;)
            if (O = R.charCodeAt(z), 48 > O || O > 57) {
              F = (O === 46 ? i + R.slice(z + 1) : R.slice(z)) + F, R = R.slice(0, z);
              break
            }
        }
      }
      S && !x && (R = t(R, 1 / 0));
      var A = H.length + R.length + F.length,
        j = A < w ? new Array(w - A + 1).join(d) : "";
      switch (S && x && (R = t(j + R, j.length ? w - F.length : 1 / 0), j = ""), y) {
        case "<":
          R = H + R + F + j;
          break;
        case "=":
          R = H + j + R + F;
          break;
        case "^":
          R = j.slice(0, A = j.length >> 1) + H + R + F + j.slice(A);
          break;
        default:
          R = j + H + R + F;
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
var Ku, Jn, Vu;
Df({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function Df(e) {
  return Ku = V0(e), Jn = Ku.format, Vu = Ku.formatPrefix, Ku
}

function Nf(e) {
  return Math.max(0, -ir(Math.abs(e)))
}

function Rf(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(ir(t) / 3))) * 3 - ir(Math.abs(e)))
}

function Lf(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, ir(t) - ir(e)) + 1
}

function Ao(e, t, r, n) {
  var i = Vn(e, t, r),
    o;
  switch (n = or(n ?? ",f"), n.type) {
    case "s": {
      var a = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(o = Rf(i, a)) && (n.precision = o), Vu(n, a)
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(o = Lf(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = o - (n.type === "e"));
      break
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(o = Nf(i)) && (n.precision = o - (n.type === "%") * 2);
      break
    }
  }
  return Jn(n)
}

function ct(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return Zr(n[0], n[n.length - 1], r ?? 10)
  }, e.tickFormat = function(r, n) {
    var i = t();
    return Ao(i[0], i[i.length - 1], r ?? 10, n)
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(),
      i = 0,
      o = n.length - 1,
      a = n[i],
      u = n[o],
      s, l, f = 10;
    for (u < a && (l = a, a = u, u = l, l = i, i = o, o = l); f-- > 0;) {
      if (l = vo(a, u, r), l === s) return n[i] = a, n[o] = u, t(n);
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
  }, Ie.apply(e, arguments), ct(e)
}

function Xu(e) {
  var t;

  function r(n) {
    return n == null || isNaN(n = +n) ? t : n
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, jr), r) : e.slice()
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t
  }, r.copy = function() {
    return Xu(e).unknown(t)
  }, e = arguments.length ? Array.from(e, jr) : [0, 1], ct(r)
}

function _o(e, t) {
  e = e.slice();
  var r = 0,
    n = e.length - 1,
    i = e[r],
    o = e[n],
    a;
  return o < i && (a = r, r = n, n = a, a = i, i = o, o = a), e[r] = t.floor(i), e[n] = t.ceil(o), e
}

function X0(e) {
  return Math.log(e)
}

function Y0(e) {
  return Math.exp(e)
}

function uB(e) {
  return -Math.log(-e)
}

function sB(e) {
  return -Math.exp(-e)
}

function lB(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e
}

function cB(e) {
  return e === 10 ? lB : e === Math.E ? Math.exp : t => Math.pow(e, t)
}

function fB(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), t => Math.log(t) / e)
}

function Z0(e) {
  return (t, r) => -e(-t, r)
}

function Po(e) {
  let t = e(X0, Y0),
    r = t.domain,
    n = 10,
    i, o;

  function a() {
    return i = fB(n), o = cB(n), r()[0] < 0 ? (i = Z0(i), o = Z0(o), e(uB, sB)) : e(X0, Y0), t
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
            } x.length * 2 < v && (x = Zr(l, f, v))
    } else x = Zr(p, d, Math.min(d - p, v)).map(o);
    return c ? x.reverse() : x
  }, t.tickFormat = (u, s) => {
    if (u == null && (u = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = or(s)).precision == null && (s.trim = !0), s = Jn(s)), u === 1 / 0) return s;
    let l = Math.max(1, n * u / t.ticks().length);
    return f => {
      let c = f / o(Math.round(i(f)));
      return c * n < n - .5 && (c *= n), c <= l ? s(f) : ""
    }
  }, t.nice = () => r(_o(r(), {
    floor: u => o(Math.floor(i(u))),
    ceil: u => o(Math.ceil(i(u)))
  })), t
}

function Yu() {
  let e = Po(tn()).domain([1, 10]);
  return e.copy = () => nr(e, Yu()).base(e.base()), Ie.apply(e, arguments), e
}

function J0(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e))
  }
}

function Q0(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e
  }
}

function To(e) {
  var t = 1,
    r = e(J0(t), Q0(t));
  return r.constant = function(n) {
    return arguments.length ? e(J0(t = +n), Q0(t)) : t
  }, ct(r)
}

function Zu() {
  var e = To(tn());
  return e.copy = function() {
    return nr(e, Zu()).constant(e.constant())
  }, Ie.apply(e, arguments)
}

function ew(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e)
  }
}

function pB(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e)
}

function dB(e) {
  return e < 0 ? -e * e : e * e
}

function Eo(e) {
  var t = e(ze, ze),
    r = 1;

  function n() {
    return r === 1 ? e(ze, ze) : r === .5 ? e(pB, dB) : e(ew(r), ew(1 / r))
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r
  }, ct(t)
}

function jo() {
  var e = Eo(tn());
  return e.copy = function() {
    return nr(e, jo()).exponent(e.exponent())
  }, Ie.apply(e, arguments), e
}

function tw() {
  return jo.apply(null, arguments).exponent(.5)
}

function rw(e) {
  return Math.sign(e) * e * e
}

function mB(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e))
}

function Ju() {
  var e = rn(),
    t = [0, 1],
    r = !1,
    n;

  function i(o) {
    var a = mB(e(o));
    return isNaN(a) ? n : r ? Math.round(a) : a
  }
  return i.invert = function(o) {
    return e.invert(rw(o))
  }, i.domain = function(o) {
    return arguments.length ? (e.domain(o), i) : e.domain()
  }, i.range = function(o) {
    return arguments.length ? (e.range((t = Array.from(o, jr)).map(rw)), i) : t.slice()
  }, i.rangeRound = function(o) {
    return i.range(o).round(!0)
  }, i.round = function(o) {
    return arguments.length ? (r = !!o, i) : r
  }, i.clamp = function(o) {
    return arguments.length ? (e.clamp(o), i) : e.clamp()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return Ju(e.domain(), t).round(r).clamp(e.clamp()).unknown(n)
  }, Ie.apply(i, arguments), ct(i)
}

function Qu() {
  var e = [],
    t = [],
    r = [],
    n;

  function i() {
    var a = 0,
      u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++a < u;) r[a - 1] = Of(e, a / u);
    return o
  }

  function o(a) {
    return a == null || isNaN(a = +a) ? n : t[Ft(r, a)]
  }
  return o.invertExtent = function(a) {
    var u = t.indexOf(a);
    return u < 0 ? [NaN, NaN] : [u > 0 ? r[u - 1] : e[0], u < r.length ? r[u] : e[e.length - 1]]
  }, o.domain = function(a) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let u of a) u != null && !isNaN(u = +u) && e.push(u);
    return e.sort(lt), i()
  }, o.range = function(a) {
    return arguments.length ? (t = Array.from(a), i()) : t.slice()
  }, o.unknown = function(a) {
    return arguments.length ? (n = a, o) : n
  }, o.quantiles = function() {
    return r.slice()
  }, o.copy = function() {
    return Qu().domain(e).range(t).unknown(n)
  }, Ie.apply(o, arguments)
}

function es() {
  var e = 0,
    t = 1,
    r = 1,
    n = [.5],
    i = [0, 1],
    o;

  function a(s) {
    return s != null && s <= s ? i[Ft(n, s, 0, r)] : o
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
    return es().domain([e, t]).range(i).unknown(o)
  }, Ie.apply(ct(a), arguments)
}

function ts() {
  var e = [.5],
    t = [0, 1],
    r, n = 1;

  function i(o) {
    return o != null && o <= o ? t[Ft(e, o, 0, n)] : r
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
    return ts().domain(e).range(t).unknown(r)
  }, Ie.apply(i, arguments)
}
var Bf = new Date,
  qf = new Date;

function Te(e, t, r, n) {
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
  }, i.filter = o => Te(a => {
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
  }), r && (i.count = (o, a) => (Bf.setTime(+o), qf.setTime(+a), e(Bf), e(qf), Math.floor(r(Bf, qf))), i.every = o => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(n ? a => n(a) % o === 0 : a => i.count(0, a) % o === 0) : i)), i
}
var Mo = Te(() => {}, (e, t) => {
  e.setTime(+e + t)
}, (e, t) => t - e);
Mo.every = e => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Te(t => {
  t.setTime(Math.floor(t / e) * e)
}, (t, r) => {
  t.setTime(+t + r * e)
}, (t, r) => (r - t) / e) : Mo);
var kZ = Mo.range;
var Rt = Te(e => {
    e.setTime(e - e.getMilliseconds())
  }, (e, t) => {
    e.setTime(+e + t * 1e3)
  }, (e, t) => (t - e) / 1e3, e => e.getUTCSeconds()),
  nw = Rt.range;
var Qn = Te(e => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * 1e3)
  }, (e, t) => {
    e.setTime(+e + t * 6e4)
  }, (e, t) => (t - e) / 6e4, e => e.getMinutes()),
  hB = Qn.range,
  ei = Te(e => {
    e.setUTCSeconds(0, 0)
  }, (e, t) => {
    e.setTime(+e + t * 6e4)
  }, (e, t) => (t - e) / 6e4, e => e.getUTCMinutes()),
  yB = ei.range;
var ti = Te(e => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * 1e3 - e.getMinutes() * 6e4)
  }, (e, t) => {
    e.setTime(+e + t * 36e5)
  }, (e, t) => (t - e) / 36e5, e => e.getHours()),
  vB = ti.range,
  ri = Te(e => {
    e.setUTCMinutes(0, 0, 0)
  }, (e, t) => {
    e.setTime(+e + t * 36e5)
  }, (e, t) => (t - e) / 36e5, e => e.getUTCHours()),
  gB = ri.range;
var vr = Te(e => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 864e5, e => e.getDate() - 1),
  bB = vr.range,
  sn = Te(e => {
    e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCDate(e.getUTCDate() + t)
  }, (e, t) => (t - e) / 864e5, e => e.getUTCDate() - 1),
  xB = sn.range,
  rs = Te(e => {
    e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCDate(e.getUTCDate() + t)
  }, (e, t) => (t - e) / 864e5, e => Math.floor(e / 864e5)),
  wB = rs.range;

function ln(e) {
  return Te(t => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0)
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7)
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 6048e5)
}
var gr = ln(0),
  ni = ln(1),
  ow = ln(2),
  aw = ln(3),
  Mr = ln(4),
  uw = ln(5),
  sw = ln(6),
  lw = gr.range,
  OB = ni.range,
  SB = ow.range,
  AB = aw.range,
  _B = Mr.range,
  PB = uw.range,
  TB = sw.range;

function cn(e) {
  return Te(t => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0)
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7)
  }, (t, r) => (r - t) / 6048e5)
}
var br = cn(0),
  ii = cn(1),
  cw = cn(2),
  fw = cn(3),
  Cr = cn(4),
  pw = cn(5),
  dw = cn(6),
  mw = br.range,
  EB = ii.range,
  jB = cw.range,
  MB = fw.range,
  CB = Cr.range,
  IB = pw.range,
  kB = dw.range;
var oi = Te(e => {
    e.setDate(1), e.setHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setMonth(e.getMonth() + t)
  }, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, e => e.getMonth()),
  DB = oi.range,
  ai = Te(e => {
    e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCMonth(e.getUTCMonth() + t)
  }, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, e => e.getUTCMonth()),
  NB = ai.range;
var bt = Te(e => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t)
}, (e, t) => t.getFullYear() - e.getFullYear(), e => e.getFullYear());
bt.every = e => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Te(t => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e)
});
var RB = bt.range,
  xt = Te(e => {
    e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t)
  }, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), e => e.getUTCFullYear());
xt.every = e => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Te(t => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e)
});
var LB = xt.range;

function yw(e, t, r, n, i, o) {
  let a = [
    [Rt, 1, 1e3],
    [Rt, 5, 5 * 1e3],
    [Rt, 15, 15 * 1e3],
    [Rt, 30, 30 * 1e3],
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
    let d = c && typeof c.range == "function" ? c : s(l, f, c),
      y = d ? d.range(l, +f + 1) : [];
    return p ? y.reverse() : y
  }

  function s(l, f, c) {
    let p = Math.abs(f - l) / c,
      d = Yr(([, , v]) => v).right(a, p);
    if (d === a.length) return e.every(Vn(l / 31536e6, f / 31536e6, c));
    if (d === 0) return Mo.every(Math.max(Vn(l, f, c), 1));
    let [y, m] = a[p / a[d - 1][2] < a[d][2] / p ? d - 1 : d];
    return y.every(m)
  }
  return [u, s]
}
var [Wf, zf] = yw(xt, ai, br, rs, ri, ei), [Ff, $f] = yw(bt, oi, gr, vr, ti, Qn);

function Uf(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L)
}

function Hf(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L))
}

function Io(e, t, r) {
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

function Gf(e) {
  var t = e.dateTime,
    r = e.date,
    n = e.time,
    i = e.periods,
    o = e.days,
    a = e.shortDays,
    u = e.months,
    s = e.shortMonths,
    l = ko(i),
    f = Do(i),
    c = ko(o),
    p = Do(o),
    d = ko(a),
    y = Do(a),
    m = ko(u),
    v = Do(u),
    x = ko(s),
    w = Do(s),
    S = {
      a: O,
      A: T,
      b: A,
      B: j,
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
      p: ne,
      q: ye,
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
      f: eq,
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
      "%": tq
    };
  S.x = g(r, S), S.X = g(n, S), S.c = g(t, S), P.x = g(r, P), P.X = g(n, P), P.c = g(t, P);

  function g(K, le) {
    return function(ee) {
      var $ = [],
        Oe = -1,
        Q = 0,
        ge = K.length,
        Ee, Re, pt;
      for (ee instanceof Date || (ee = new Date(+ee)); ++Oe < ge;) K.charCodeAt(Oe) === 37 && ($.push(K.slice(Q, Oe)), (Re = vw[Ee = K.charAt(++Oe)]) != null ? Ee = K.charAt(++Oe) : Re = Ee === "e" ? " " : "0", (pt = le[Ee]) && (Ee = pt(ee, Re)), $.push(Ee), Q = Oe + 1);
      return $.push(K.slice(Q, Oe)), $.join("")
    }
  }

  function _(K, le) {
    return function(ee) {
      var $ = Io(1900, void 0, 1),
        Oe = C($, K, ee += "", 0),
        Q, ge;
      if (Oe != ee.length) return null;
      if ("Q" in $) return new Date($.Q);
      if ("s" in $) return new Date($.s * 1e3 + ("L" in $ ? $.L : 0));
      if (le && !("Z" in $) && ($.Z = 0), "p" in $ && ($.H = $.H % 12 + $.p * 12), $.m === void 0 && ($.m = "q" in $ ? $.q : 0), "V" in $) {
        if ($.V < 1 || $.V > 53) return null;
        "w" in $ || ($.w = 1), "Z" in $ ? (Q = Hf(Io($.y, 0, 1)), ge = Q.getUTCDay(), Q = ge > 4 || ge === 0 ? ii.ceil(Q) : ii(Q), Q = sn.offset(Q, ($.V - 1) * 7), $.y = Q.getUTCFullYear(), $.m = Q.getUTCMonth(), $.d = Q.getUTCDate() + ($.w + 6) % 7) : (Q = Uf(Io($.y, 0, 1)), ge = Q.getDay(), Q = ge > 4 || ge === 0 ? ni.ceil(Q) : ni(Q), Q = vr.offset(Q, ($.V - 1) * 7), $.y = Q.getFullYear(), $.m = Q.getMonth(), $.d = Q.getDate() + ($.w + 6) % 7)
      } else("W" in $ || "U" in $) && ("w" in $ || ($.w = "u" in $ ? $.u % 7 : "W" in $ ? 1 : 0), ge = "Z" in $ ? Hf(Io($.y, 0, 1)).getUTCDay() : Uf(Io($.y, 0, 1)).getDay(), $.m = 0, $.d = "W" in $ ? ($.w + 6) % 7 + $.W * 7 - (ge + 5) % 7 : $.w + $.U * 7 - (ge + 6) % 7);
      return "Z" in $ ? ($.H += $.Z / 100 | 0, $.M += $.Z % 100, Hf($)) : Uf($)
    }
  }

  function C(K, le, ee, $) {
    for (var Oe = 0, Q = le.length, ge = ee.length, Ee, Re; Oe < Q;) {
      if ($ >= ge) return -1;
      if (Ee = le.charCodeAt(Oe++), Ee === 37) {
        if (Ee = le.charAt(Oe++), Re = h[Ee in vw ? le.charAt(Oe++) : Ee], !Re || ($ = Re(K, ee, $)) < 0) return -1
      } else if (Ee != ee.charCodeAt($++)) return -1
    }
    return $
  }

  function k(K, le, ee) {
    var $ = l.exec(le.slice(ee));
    return $ ? (K.p = f.get($[0].toLowerCase()), ee + $[0].length) : -1
  }

  function B(K, le, ee) {
    var $ = d.exec(le.slice(ee));
    return $ ? (K.w = y.get($[0].toLowerCase()), ee + $[0].length) : -1
  }

  function W(K, le, ee) {
    var $ = c.exec(le.slice(ee));
    return $ ? (K.w = p.get($[0].toLowerCase()), ee + $[0].length) : -1
  }

  function R(K, le, ee) {
    var $ = x.exec(le.slice(ee));
    return $ ? (K.m = w.get($[0].toLowerCase()), ee + $[0].length) : -1
  }

  function H(K, le, ee) {
    var $ = m.exec(le.slice(ee));
    return $ ? (K.m = v.get($[0].toLowerCase()), ee + $[0].length) : -1
  }

  function F(K, le, ee) {
    return C(K, t, le, ee)
  }

  function z(K, le, ee) {
    return C(K, r, le, ee)
  }

  function b(K, le, ee) {
    return C(K, n, le, ee)
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

  function j(K) {
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

  function ne(K) {
    return i[+(K.getUTCHours() >= 12)]
  }

  function ye(K) {
    return 1 + ~~(K.getUTCMonth() / 3)
  }
  return {
    format: function(K) {
      var le = g(K += "", S);
      return le.toString = function() {
        return K
      }, le
    },
    parse: function(K) {
      var le = _(K += "", !1);
      return le.toString = function() {
        return K
      }, le
    },
    utcFormat: function(K) {
      var le = g(K += "", P);
      return le.toString = function() {
        return K
      }, le
    },
    utcParse: function(K) {
      var le = _(K += "", !0);
      return le.toString = function() {
        return K
      }, le
    }
  }
}
var vw = {
    "-": "",
    _: " ",
    0: "0"
  },
  Ke = /^\s*\d+/,
  qB = /^%/,
  WB = /[\\^$*+?|[\]().{}]/g;

function xe(e, t, r) {
  var n = e < 0 ? "-" : "",
    i = (n ? -e : e) + "",
    o = i.length;
  return n + (o < r ? new Array(r - o + 1).join(t) + i : i)
}

function zB(e) {
  return e.replace(WB, "\\$&")
}

function ko(e) {
  return new RegExp("^(?:" + e.map(zB).join("|") + ")", "i")
}

function Do(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]))
}

function FB(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1
}

function $B(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1
}

function UB(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1
}

function HB(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1
}

function GB(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1
}

function gw(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1
}

function bw(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1
}

function KB(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1
}

function VB(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1
}

function XB(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1
}

function xw(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1
}

function YB(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1
}

function ww(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1
}

function ZB(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1
}

function JB(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1
}

function QB(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1
}

function eq(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1
}

function tq(e, t, r) {
  var n = qB.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1
}

function rq(e, t, r) {
  var n = Ke.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1
}

function nq(e, t, r) {
  var n = Ke.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1
}

function Ow(e, t) {
  return xe(e.getDate(), t, 2)
}

function iq(e, t) {
  return xe(e.getHours(), t, 2)
}

function oq(e, t) {
  return xe(e.getHours() % 12 || 12, t, 2)
}

function aq(e, t) {
  return xe(1 + vr.count(bt(e), e), t, 3)
}

function Tw(e, t) {
  return xe(e.getMilliseconds(), t, 3)
}

function uq(e, t) {
  return Tw(e, t) + "000"
}

function sq(e, t) {
  return xe(e.getMonth() + 1, t, 2)
}

function lq(e, t) {
  return xe(e.getMinutes(), t, 2)
}

function cq(e, t) {
  return xe(e.getSeconds(), t, 2)
}

function fq(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t
}

function pq(e, t) {
  return xe(gr.count(bt(e) - 1, e), t, 2)
}

function Ew(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Mr(e) : Mr.ceil(e)
}

function dq(e, t) {
  return e = Ew(e), xe(Mr.count(bt(e), e) + (bt(e).getDay() === 4), t, 2)
}

function mq(e) {
  return e.getDay()
}

function hq(e, t) {
  return xe(ni.count(bt(e) - 1, e), t, 2)
}

function yq(e, t) {
  return xe(e.getFullYear() % 100, t, 2)
}

function vq(e, t) {
  return e = Ew(e), xe(e.getFullYear() % 100, t, 2)
}

function gq(e, t) {
  return xe(e.getFullYear() % 1e4, t, 4)
}

function bq(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? Mr(e) : Mr.ceil(e), xe(e.getFullYear() % 1e4, t, 4)
}

function xq(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + xe(t / 60 | 0, "0", 2) + xe(t % 60, "0", 2)
}

function Sw(e, t) {
  return xe(e.getUTCDate(), t, 2)
}

function wq(e, t) {
  return xe(e.getUTCHours(), t, 2)
}

function Oq(e, t) {
  return xe(e.getUTCHours() % 12 || 12, t, 2)
}

function Sq(e, t) {
  return xe(1 + sn.count(xt(e), e), t, 3)
}

function jw(e, t) {
  return xe(e.getUTCMilliseconds(), t, 3)
}

function Aq(e, t) {
  return jw(e, t) + "000"
}

function _q(e, t) {
  return xe(e.getUTCMonth() + 1, t, 2)
}

function Pq(e, t) {
  return xe(e.getUTCMinutes(), t, 2)
}

function Tq(e, t) {
  return xe(e.getUTCSeconds(), t, 2)
}

function Eq(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t
}

function jq(e, t) {
  return xe(br.count(xt(e) - 1, e), t, 2)
}

function Mw(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? Cr(e) : Cr.ceil(e)
}

function Mq(e, t) {
  return e = Mw(e), xe(Cr.count(xt(e), e) + (xt(e).getUTCDay() === 4), t, 2)
}

function Cq(e) {
  return e.getUTCDay()
}

function Iq(e, t) {
  return xe(ii.count(xt(e) - 1, e), t, 2)
}

function kq(e, t) {
  return xe(e.getUTCFullYear() % 100, t, 2)
}

function Dq(e, t) {
  return e = Mw(e), xe(e.getUTCFullYear() % 100, t, 2)
}

function Nq(e, t) {
  return xe(e.getUTCFullYear() % 1e4, t, 4)
}

function Rq(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? Cr(e) : Cr.ceil(e), xe(e.getUTCFullYear() % 1e4, t, 4)
}

function Lq() {
  return "+0000"
}

function Aw() {
  return "%"
}

function _w(e) {
  return +e
}

function Pw(e) {
  return Math.floor(+e / 1e3)
}
var ui, ns, Cw, is, Iw;
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

function Kf(e) {
  return ui = Gf(e), ns = ui.format, Cw = ui.parse, is = ui.utcFormat, Iw = ui.utcParse, ui
}

function Bq(e) {
  return new Date(e)
}

function qq(e) {
  return e instanceof Date ? +e : +new Date(+e)
}

function os(e, t, r, n, i, o, a, u, s, l) {
  var f = rn(),
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
    return e(_[0], _[_.length - 1], g ?? 10)
  }, f.tickFormat = function(g, _) {
    return _ == null ? h : l(_)
  }, f.nice = function(g) {
    var _ = p();
    return (!g || typeof g.range != "function") && (g = t(_[0], _[_.length - 1], g ?? 10)), g ? p(_o(_, g)) : f
  }, f.copy = function() {
    return nr(f, os(e, t, r, n, i, o, a, u, s, l))
  }, f
}

function Vf() {
  return Ie.apply(os(Ff, $f, bt, oi, gr, vr, ti, Qn, Rt, ns).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments)
}

function Xf() {
  return Ie.apply(os(Wf, zf, xt, ai, br, sn, ri, ei, Rt, is).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments)
}

function as() {
  var e = 0,
    t = 1,
    r, n, i, o, a = ze,
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
      var d, y;
      return arguments.length ? ([d, y] = p, a = c(d, y), l) : [a(0), a(1)]
    }
  }
  return l.range = f(gt), l.rangeRound = f(en), l.unknown = function(c) {
      return arguments.length ? (s = c, l) : s
    },
    function(c) {
      return o = c, r = c(e), n = c(t), i = r === n ? 0 : 1 / (n - r), l
    }
}

function xr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown())
}

function us() {
  var e = ct(as()(ze));
  return e.copy = function() {
    return xr(e, us())
  }, Nt.apply(e, arguments)
}

function Yf() {
  var e = Po(as()).domain([1, 10]);
  return e.copy = function() {
    return xr(e, Yf()).base(e.base())
  }, Nt.apply(e, arguments)
}

function Zf() {
  var e = To(as());
  return e.copy = function() {
    return xr(e, Zf()).constant(e.constant())
  }, Nt.apply(e, arguments)
}

function ss() {
  var e = Eo(as());
  return e.copy = function() {
    return xr(e, ss()).exponent(e.exponent())
  }, Nt.apply(e, arguments)
}

function kw() {
  return ss.apply(null, arguments).exponent(.5)
}

function ls() {
  var e = [],
    t = ze;

  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Ft(e, n, 1) - 1) / (e.length - 1))
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(lt), r
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)))
  }, r.quantiles = function(n) {
    return Array.from({
      length: n + 1
    }, (i, o) => Ru(e, o / n))
  }, r.copy = function() {
    return ls(t).domain(e)
  }, Nt.apply(r, arguments)
}

function cs() {
  var e = 0,
    t = .5,
    r = 1,
    n = 1,
    i, o, a, u, s, l = ze,
    f, c = !1,
    p;

  function d(m) {
    return isNaN(m = +m) ? p : (m = .5 + ((m = +f(m)) - o) * (n * m < n * o ? u : s), l(c ? Math.max(0, Math.min(1, m)) : m))
  }
  d.domain = function(m) {
    return arguments.length ? ([e, t, r] = m, i = f(e = +e), o = f(t = +t), a = f(r = +r), u = i === o ? 0 : .5 / (o - i), s = o === a ? 0 : .5 / (a - o), n = o < i ? -1 : 1, d) : [e, t, r]
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
  return d.range = y(gt), d.rangeRound = y(en), d.unknown = function(m) {
      return arguments.length ? (p = m, d) : p
    },
    function(m) {
      return f = m, i = m(e), o = m(t), a = m(r), u = i === o ? 0 : .5 / (o - i), s = o === a ? 0 : .5 / (a - o), n = o < i ? -1 : 1, d
    }
}

function fs() {
  var e = ct(cs()(ze));
  return e.copy = function() {
    return xr(e, fs())
  }, Nt.apply(e, arguments)
}

function Jf() {
  var e = Po(cs()).domain([.1, 1, 10]);
  return e.copy = function() {
    return xr(e, Jf()).base(e.base())
  }, Nt.apply(e, arguments)
}

function Qf() {
  var e = To(cs());
  return e.copy = function() {
    return xr(e, Qf()).constant(e.constant())
  }, Nt.apply(e, arguments)
}

function ps() {
  var e = Eo(cs());
  return e.copy = function() {
    return xr(e, ps()).exponent(e.exponent())
  }, Nt.apply(e, arguments)
}

function Dw() {
  return ps.apply(null, arguments).exponent(.5)
}
var $o = te(qw()),
  Uo = te($w()),
  wt = te(Tt()),
  ci = te(Le()),
  d1 = te($a()),
  yp = te(Wr()),
  m1 = te(Kw()),
  xs = te(kl()),
  h1 = te(nu()),
  y1 = te(No()),
  v1 = te(Su());
var Ae = te(tp());

function sW(e) {
  return pW(e) || fW(e) || cW(e) || lW()
}

function lW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function cW(e, t) {
  if (e) {
    if (typeof e == "string") return rp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return rp(e, t)
  }
}

function fW(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e)
}

function pW(e) {
  if (Array.isArray(e)) return rp(e)
}

function rp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var dW = function(t) {
    return t
  },
  Zw = {
    "@@functional/placeholder": !0
  },
  Jw = function(t) {
    return t === Zw
  },
  Yw = function(t) {
    return function r() {
      return arguments.length === 0 || arguments.length === 1 && Jw(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments)
    }
  },
  mW = function e(t, r) {
    return t === 1 ? r : Yw(function() {
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      var a = i.filter(function(u) {
        return u !== Zw
      }).length;
      return a >= t ? r.apply(void 0, i) : e(t - a, Yw(function() {
        for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++) s[l] = arguments[l];
        var f = i.map(function(c) {
          return Jw(c) ? s.shift() : c
        });
        return r.apply(void 0, sW(f).concat(s))
      }))
    })
  },
  Ro = function(t) {
    return mW(t.length, t)
  },
  Lo = function(t, r) {
    for (var n = [], i = t; i < r; ++i) n[i - t] = i;
    return n
  },
  np = Ro(function(e, t) {
    return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
      return t[r]
    }).map(e)
  }),
  ip = function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
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
  Bo = function(t) {
    return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("")
  },
  hs = function(t) {
    var r = null,
      n = null;
    return function() {
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
      return r && o.every(function(u, s) {
        return u === r[s]
      }) || (r = o, n = t.apply(void 0, o)), n
    }
  };
var op = te(tp());

function hW(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new op.default(e).abs().log(10).toNumber()) + 1, t
}

function yW(e, t, r) {
  for (var n = new op.default(e), i = 0, o = []; n.lt(t) && i < 1e5;) o.push(n.toNumber()), n = n.add(r), i++;
  return o
}
var vW = Ro(function(e, t, r) {
    var n = +e,
      i = +t;
    return n + r * (i - n)
  }),
  gW = Ro(function(e, t, r) {
    var n = t - +e;
    return n = n || 1 / 0, (r - e) / n
  }),
  bW = Ro(function(e, t, r) {
    var n = t - +e;
    return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n))
  }),
  qo = {
    rangeStep: yW,
    getDigitCount: hW,
    interpolateNumber: vW,
    uninterpolateNumber: gW,
    uninterpolateTruncation: bW
  };

function ap(e) {
  return OW(e) || wW(e) || Qw(e) || xW()
}

function xW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function wW(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e)
}

function OW(e) {
  if (Array.isArray(e)) return up(e)
}

function fn(e, t) {
  return _W(e) || AW(e, t) || Qw(e, t) || SW()
}

function SW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Qw(e, t) {
  if (e) {
    if (typeof e == "string") return up(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return up(e, t)
  }
}

function up(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function AW(e, t) {
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

function _W(e) {
  if (Array.isArray(e)) return e
}

function sp(e) {
  var t = fn(e, 2),
    r = t[0],
    n = t[1],
    i = r,
    o = n;
  return r > n && (i = n, o = r), [i, o]
}

function lp(e, t, r) {
  if (e.lte(0)) return new Ae.default(0);
  var n = qo.getDigitCount(e.toNumber()),
    i = new Ae.default(10).pow(n),
    o = e.div(i),
    a = n !== 1 ? .05 : .1,
    u = new Ae.default(Math.ceil(o.div(a).toNumber())).add(r).mul(a),
    s = u.mul(i);
  return t ? s : new Ae.default(Math.ceil(s))
}

function e1(e, t, r) {
  var n = 1,
    i = new Ae.default(e);
  if (!i.isint() && r) {
    var o = Math.abs(e);
    o < 1 ? (n = new Ae.default(10).pow(qo.getDigitCount(e) - 1), i = new Ae.default(Math.floor(i.div(n).toNumber())).mul(n)) : o > 1 && (i = new Ae.default(Math.floor(e)))
  } else e === 0 ? i = new Ae.default(Math.floor((t - 1) / 2)) : r || (i = new Ae.default(Math.floor(e)));
  var a = Math.floor((t - 1) / 2),
    u = ip(np(function(s) {
      return i.add(new Ae.default(s - a).mul(n)).toNumber()
    }), Lo);
  return u(0, t)
}

function t1(e, t, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1))) return {
    step: new Ae.default(0),
    tickMin: new Ae.default(0),
    tickMax: new Ae.default(0)
  };
  var o = lp(new Ae.default(t).sub(e).div(r - 1), n, i),
    a;
  e <= 0 && t >= 0 ? a = new Ae.default(0) : (a = new Ae.default(e).add(t).div(2), a = a.sub(new Ae.default(a).mod(o)));
  var u = Math.ceil(a.sub(e).div(o).toNumber()),
    s = Math.ceil(new Ae.default(t).sub(a).div(o).toNumber()),
    l = u + s + 1;
  return l > r ? t1(e, t, r, n, i + 1) : (l < r && (s = t > 0 ? s + (r - l) : s, u = t > 0 ? u : u + (r - l)), {
    step: o,
    tickMin: a.sub(new Ae.default(u).mul(o)),
    tickMax: a.add(new Ae.default(s).mul(o))
  })
}

function PW(e) {
  var t = fn(e, 2),
    r = t[0],
    n = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = sp([r, n]),
    s = fn(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) {
    var c = f === 1 / 0 ? [l].concat(ap(Lo(0, i - 1).map(function() {
      return 1 / 0
    }))) : [].concat(ap(Lo(0, i - 1).map(function() {
      return -1 / 0
    })), [f]);
    return r > n ? Bo(c) : c
  }
  if (l === f) return e1(l, i, o);
  var p = t1(l, f, a, o),
    d = p.step,
    y = p.tickMin,
    m = p.tickMax,
    v = qo.rangeStep(y, m.add(new Ae.default(.1).mul(d)), d);
  return r > n ? Bo(v) : v
}

function TW(e) {
  var t = fn(e, 2),
    r = t[0],
    n = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = sp([r, n]),
    s = fn(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) return [r, n];
  if (l === f) return e1(l, i, o);
  var c = lp(new Ae.default(f).sub(l).div(a - 1), o, 0),
    p = ip(np(function(y) {
      return new Ae.default(l).add(new Ae.default(y).mul(c)).toNumber()
    }), Lo),
    d = p(0, a).filter(function(y) {
      return y >= l && y <= f
    });
  return r > n ? Bo(d) : d
}

function EW(e, t) {
  var r = fn(e, 2),
    n = r[0],
    i = r[1],
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = sp([n, i]),
    u = fn(a, 2),
    s = u[0],
    l = u[1];
  if (s === -1 / 0 || l === 1 / 0) return [n, i];
  if (s === l) return [s];
  var f = Math.max(t, 2),
    c = lp(new Ae.default(l).sub(s).div(f - 1), o, 0),
    p = [].concat(ap(qo.rangeStep(new Ae.default(s), new Ae.default(l).sub(new Ae.default(.99).mul(c)), c)), [l]);
  return n > i ? Bo(p) : p
}
var cp = hs(PW),
  jW = hs(TW),
  fp = hs(EW);
import ys from "./react-shim-eraudit.js";
var MW = !0,
  pp = "Invariant failed";

function Ut(e, t) {
  if (!e) {
    if (MW) throw new Error(pp);
    var r = typeof t == "function" ? t() : t,
      n = r ? "".concat(pp, ": ").concat(r) : pp;
    throw new Error(n)
  }
}
var CW = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];

function si(e) {
  "@babel/helpers - typeof";
  return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, si(e)
}

function vs() {
  return vs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, vs.apply(this, arguments)
}

function IW(e, t) {
  return RW(e) || NW(e, t) || DW(e, t) || kW()
}

function kW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function DW(e, t) {
  if (e) {
    if (typeof e == "string") return r1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return r1(e, t)
  }
}

function r1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function NW(e, t) {
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

function RW(e) {
  if (Array.isArray(e)) return e
}

function LW(e, t) {
  if (e == null) return {};
  var r = BW(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function BW(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function qW(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function n1(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, a1(n.key), n)
  }
}

function WW(e, t, r) {
  return t && n1(e.prototype, t), r && n1(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function zW(e, t, r) {
  return t = gs(t), FW(e, i1() ? Reflect.construct(t, r || [], gs(e).constructor) : t.apply(e, r))
}

function FW(e, t) {
  if (t && (si(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return $W(e)
}

function $W(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function i1() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (i1 = function() {
    return !!e
  })()
}

function gs(e) {
  return gs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, gs(e)
}

function UW(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && dp(e, t)
}

function dp(e, t) {
  return dp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, dp(e, t)
}

function o1(e, t, r) {
  return t = a1(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function a1(e) {
  var t = HW(e, "string");
  return si(t) == "symbol" ? t : t + ""
}

function HW(e, t) {
  if (si(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (si(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Ir = function(e) {
  function t() {
    return qW(this, t), zW(this, t, arguments)
  }
  return UW(t, e), WW(t, [{
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
        d = ue(p, !1);
      this.props.direction === "x" && f.type !== "number" && Ut(!1);
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
            j = z(S + _);
          h.push({
            x1: O,
            y1: j,
            x2: T,
            y2: j
          }), h.push({
            x1: b,
            y1: A,
            x2: b,
            y2: j
          }), h.push({
            x1: O,
            y1: A,
            x2: T,
            y2: A
          })
        }
        return ys.createElement(be, vs({
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
      return ys.createElement(be, {
        className: "recharts-errorBars"
      }, y)
    }
  }])
}(ys.Component);
o1(Ir, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
o1(Ir, "displayName", "ErrorBar");

function Wo(e) {
  "@babel/helpers - typeof";
  return Wo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Wo(e)
}

function u1(e, t) {
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
    t % 2 ? u1(Object(r), !0).forEach(function(n) {
      GW(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : u1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function GW(e, t, r) {
  return t = KW(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function KW(e) {
  var t = VW(e, "string");
  return Wo(t) == "symbol" ? t : t + ""
}

function VW(e, t) {
  if (Wo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Wo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var bs = function(t) {
  var r = t.children,
    n = t.formattedGraphicalItems,
    i = t.legendWidth,
    o = t.legendContent,
    a = Ze(r, Dt);
  if (!a) return null;
  var u = Dt.defaultProps,
    s = u !== void 0 ? pn(pn({}, u), a.props) : {},
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
      d = p !== void 0 ? pn(pn({}, p), c.props) : {},
      y = d.dataKey,
      m = d.name,
      v = d.legendType,
      x = d.hide;
    return {
      inactive: x,
      dataKey: y,
      type: s.iconType || v || "square",
      color: zo(c),
      value: m || y,
      payload: d
    }
  }), pn(pn(pn({}, s), Dt.getWithHeight(a, i)), {}, {
    payload: l,
    item: a
  })
};

function Fo(e) {
  "@babel/helpers - typeof";
  return Fo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Fo(e)
}

function s1(e) {
  return JW(e) || ZW(e) || YW(e) || XW()
}

function XW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function YW(e, t) {
  if (e) {
    if (typeof e == "string") return hp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return hp(e, t)
  }
}

function ZW(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function JW(e) {
  if (Array.isArray(e)) return hp(e)
}

function hp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function l1(e, t) {
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
    t % 2 ? l1(Object(r), !0).forEach(function(n) {
      li(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : l1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function li(e, t, r) {
  return t = QW(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function QW(e) {
  var t = ez(e, "string");
  return Fo(t) == "symbol" ? t : t + ""
}

function ez(e, t) {
  if (Fo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Fo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Ve(e, t, r) {
  return (0, wt.default)(e) || (0, wt.default)(t) ? r : je(t) ? (0, yp.default)(e, t, r) : (0, ci.default)(t) ? t(e) : r
}

function fi(e, t, r, n) {
  var i = (0, m1.default)(e, function(u) {
    return Ve(u, t)
  });
  if (r === "number") {
    var o = i.filter(function(u) {
      return X(u) || parseFloat(u)
    });
    return o.length ? [(0, Uo.default)(o), (0, $o.default)(o)] : [1 / 0, -1 / 0]
  }
  var a = n ? i.filter(function(u) {
    return !(0, wt.default)(u)
  }) : i;
  return a.map(function(u) {
    return je(u) || u instanceof Date ? u : ""
  })
}
var g1 = function(t) {
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
        if (Ye(c - f) !== Ye(p - c)) {
          var y = [];
          if (Ye(p - c) === Ye(s[1] - s[0])) {
            d = p;
            var m = c + s[1] - s[0];
            y[0] = Math.min(m, (m + f) / 2), y[1] = Math.max(m, (m + f) / 2)
          } else {
            d = f;
            var v = p + s[1] - s[0];
            y[0] = Math.min(c, (v + c) / 2), y[1] = Math.max(c, (v + c) / 2)
          }
          var x = [Math.min(c, (d + c) / 2), Math.max(c, (d + c) / 2)];
          if (t > x[0] && t <= x[1] || t >= y[0] && t <= y[1]) {
            a = i[l].index;
            break
          }
        } else {
          var w = Math.min(f, p),
            S = Math.max(f, p);
          if (t > (w + c) / 2 && t <= (S + c) / 2) {
            a = i[l].index;
            break
          }
        }
      } else
        for (var P = 0; P < u; P++)
          if (P === 0 && t <= (n[P].coordinate + n[P + 1].coordinate) / 2 || P > 0 && P < u - 1 && t > (n[P].coordinate + n[P - 1].coordinate) / 2 && t <= (n[P].coordinate + n[P + 1].coordinate) / 2 || P === u - 1 && t > (n[P].coordinate + n[P - 1].coordinate) / 2) {
            a = n[P].index;
            break
          } return a
  },
  zo = function(t) {
    var r, n = t,
      i = n.type.displayName,
      o = (r = t.type) !== null && r !== void 0 && r.defaultProps ? De(De({}, t.type.defaultProps), t.props) : t.props,
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
  b1 = function(t) {
    var r = t.barSize,
      n = t.totalSize,
      i = t.stackGroups,
      o = i === void 0 ? {} : i;
    if (!o) return {};
    for (var a = {}, u = Object.keys(o), s = 0, l = u.length; s < l; s++)
      for (var f = o[u[s]].stackGroups, c = Object.keys(f), p = 0, d = c.length; p < d; p++) {
        var y = f[c[p]],
          m = y.items,
          v = y.cateAxisId,
          x = m.filter(function(_) {
            return jt(_.type).indexOf("Bar") >= 0
          });
        if (x && x.length) {
          var w = x[0].type.defaultProps,
            S = w !== void 0 ? De(De({}, w), x[0].props) : x[0].props,
            P = S.barSize,
            h = S[v];
          a[h] || (a[h] = []);
          var g = (0, wt.default)(P) ? r : P;
          a[h].push({
            item: x[0],
            stackList: x.slice(1),
            barSize: (0, wt.default)(g) ? void 0 : zt(g, n, 0)
          })
        }
      }
    return a
  },
  x1 = function(t) {
    var r = t.barGap,
      n = t.barCategoryGap,
      i = t.bandSize,
      o = t.sizeList,
      a = o === void 0 ? [] : o,
      u = t.maxBarSize,
      s = a.length;
    if (s < 1) return null;
    var l = zt(r, i, 0, !0),
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
      var x = zt(n, i, 0, !0);
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
  w1 = function(t, r, n, i) {
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
      if ((m === "vertical" || m === "horizontal" && y === "middle") && d !== "center" && X(t[d])) return De(De({}, t), {}, li({}, d, t[d] + (c || 0)));
      if ((m === "horizontal" || m === "vertical" && d === "center") && y !== "middle" && X(t[y])) return De(De({}, t), {}, li({}, y, t[y] + (p || 0)))
    }
    return t
  },
  tz = function(t, r, n) {
    return (0, wt.default)(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0
  },
  O1 = function(t, r, n, i, o) {
    var a = r.props.children,
      u = We(a, Ir).filter(function(l) {
        return tz(i, o, l.props.direction)
      });
    if (u && u.length) {
      var s = u.map(function(l) {
        return l.props.dataKey
      });
      return t.reduce(function(l, f) {
        var c = Ve(f, n);
        if ((0, wt.default)(c)) return l;
        var p = Array.isArray(c) ? [(0, Uo.default)(c), (0, $o.default)(c)] : [c, c],
          d = s.reduce(function(y, m) {
            var v = Ve(f, m, 0),
              x = p[0] - Math.abs(Array.isArray(v) ? v[0] : v),
              w = p[1] + Math.abs(Array.isArray(v) ? v[1] : v);
            return [Math.min(x, y[0]), Math.max(w, y[1])]
          }, [1 / 0, -1 / 0]);
        return [Math.min(d[0], l[0]), Math.max(d[1], l[1])]
      }, [1 / 0, -1 / 0])
    }
    return null
  },
  S1 = function(t, r, n, i, o) {
    var a = r.map(function(u) {
      return O1(t, u, n, o, i)
    }).filter(function(u) {
      return !(0, wt.default)(u)
    });
    return a && a.length ? a.reduce(function(u, s) {
      return [Math.min(u[0], s[0]), Math.max(u[1], s[1])]
    }, [1 / 0, -1 / 0]) : null
  },
  vp = function(t, r, n, i, o) {
    var a = r.map(function(s) {
      var l = s.props.dataKey;
      return n === "number" && l && O1(t, s, l, i) || fi(t, l, n, o)
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
  gp = function(t, r) {
    return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis"
  },
  bp = function(t, r, n, i) {
    if (i) return t.map(function(s) {
      return s.coordinate
    });
    var o, a, u = t.map(function(s) {
      return s.coordinate === r && (o = !0), s.coordinate === n && (a = !0), s.coordinate
    });
    return o || u.push(r), a || u.push(n), u
  },
  Ot = function(t, r, n) {
    if (!t) return null;
    var i = t.scale,
      o = t.duplicateDomain,
      a = t.type,
      u = t.range,
      s = t.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2,
      l = (r || n) && a === "category" && i.bandwidth ? i.bandwidth() / s : 0;
    if (l = t.axisType === "angleAxis" && u?.length >= 2 ? Ye(u[0] - u[1]) * 2 * l : l, r && (t.ticks || t.niceTicks)) {
      var f = (t.ticks || t.niceTicks).map(function(c) {
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
  mp = new WeakMap,
  Ho = function(t, r) {
    if (typeof r != "function") return t;
    mp.has(t) || mp.set(t, new WeakMap);
    var n = mp.get(t);
    if (n.has(r)) return n.get(r);
    var i = function() {
      t.apply(void 0, arguments), r.apply(void 0, arguments)
    };
    return n.set(r, i), i
  },
  A1 = function(t, r, n) {
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
      scale: Pr(),
      realScaleType: "point"
    } : o === "category" ? {
      scale: _r(),
      realScaleType: "band"
    } : {
      scale: on(),
      realScaleType: "linear"
    };
    if ((0, d1.default)(i)) {
      var s = "scale".concat((0, h1.default)(i));
      return {
        scale: (ds[s] || Pr)(),
        realScaleType: ds[s] ? s : "point"
      }
    }
    return (0, ci.default)(i) ? {
      scale: i
    } : {
      scale: Pr(),
      realScaleType: "point"
    }
  },
  c1 = 1e-4,
  _1 = function(t) {
    var r = t.domain();
    if (!(!r || r.length <= 2)) {
      var n = r.length,
        i = t.range(),
        o = Math.min(i[0], i[1]) - c1,
        a = Math.max(i[0], i[1]) + c1,
        u = t(r[0]),
        s = t(r[n - 1]);
      (u < o || u > a || s < o || s > a) && t.domain([r[0], r[n - 1]])
    }
  },
  P1 = function(t, r) {
    if (!t) return null;
    for (var n = 0, i = t.length; n < i; n++)
      if (t[n].item === r) return t[n].position;
    return null
  },
  T1 = function(t, r) {
    if (!r || r.length !== 2 || !X(r[0]) || !X(r[1])) return t;
    var n = Math.min(r[0], r[1]),
      i = Math.max(r[0], r[1]),
      o = [t[0], t[1]];
    return (!X(t[0]) || t[0] < n) && (o[0] = n), (!X(t[1]) || t[1] > i) && (o[1] = i), o[0] > i && (o[0] = i), o[1] < n && (o[1] = n), o
  },
  rz = function(t) {
    var r = t.length;
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var o = 0, a = 0, u = 0; u < r; ++u) {
          var s = (0, xs.default)(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
          s >= 0 ? (t[u][n][0] = o, t[u][n][1] = o + s, o = t[u][n][1]) : (t[u][n][0] = a, t[u][n][1] = a + s, a = t[u][n][1])
        }
  },
  nz = function(t) {
    var r = t.length;
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var o = 0, a = 0; a < r; ++a) {
          var u = (0, xs.default)(t[a][n][1]) ? t[a][n][0] : t[a][n][1];
          u >= 0 ? (t[a][n][0] = o, t[a][n][1] = o + u, o = t[a][n][1]) : (t[a][n][0] = 0, t[a][n][1] = 0)
        }
  },
  iz = {
    sign: rz,
    expand: wc,
    none: It,
    silhouette: Oc,
    wiggle: Sc,
    positive: nz
  },
  oz = function(t, r, n) {
    var i = r.map(function(u) {
        return u.props.dataKey
      }),
      o = iz[n],
      a = xc().keys(i).value(function(u, s) {
        return +Ve(u, s, 0)
      }).order(Nn).offset(o);
    return a(t)
  },
  E1 = function(t, r, n, i, o, a) {
    if (!t) return null;
    var u = a ? r.reverse() : r,
      s = {},
      l = u.reduce(function(c, p) {
        var d, y = (d = p.type) !== null && d !== void 0 && d.defaultProps ? De(De({}, p.type.defaultProps), p.props) : p.props,
          m = y.stackId,
          v = y.hide;
        if (v) return c;
        var x = y[n],
          w = c[x] || {
            hasStack: !1,
            stackGroups: {}
          };
        if (je(m)) {
          var S = w.stackGroups[m] || {
            numericAxisId: n,
            cateAxisId: i,
            items: []
          };
          S.items.push(p), w.hasStack = !0, w.stackGroups[m] = S
        } else w.stackGroups[Qt("_stackId_")] = {
          numericAxisId: n,
          cateAxisId: i,
          items: [p]
        };
        return De(De({}, c), {}, li({}, x, w))
      }, s),
      f = {};
    return Object.keys(l).reduce(function(c, p) {
      var d = l[p];
      if (d.hasStack) {
        var y = {};
        d.stackGroups = Object.keys(d.stackGroups).reduce(function(m, v) {
          var x = d.stackGroups[v];
          return De(De({}, m), {}, li({}, v, {
            numericAxisId: n,
            cateAxisId: i,
            items: x.items,
            stackedData: oz(t, x.items, o)
          }))
        }, y)
      }
      return De(De({}, c), {}, li({}, p, d))
    }, f)
  },
  j1 = function(t, r) {
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
      var f = cp(l, o, u);
      return t.domain([(0, Uo.default)(f), (0, $o.default)(f)]), {
        niceTicks: f
      }
    }
    if (o && i === "number") {
      var c = t.domain(),
        p = fp(c, o, u);
      return {
        niceTicks: p
      }
    }
    return null
  };

function xp(e) {
  var t = e.axis,
    r = e.ticks,
    n = e.bandSize,
    i = e.entry,
    o = e.index,
    a = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !(0, wt.default)(i[t.dataKey])) {
      var u = Pn(r, "value", i[t.dataKey]);
      if (u) return u.coordinate + n / 2
    }
    return r[o] ? r[o].coordinate + n / 2 : null
  }
  var s = Ve(i, (0, wt.default)(a) ? t.dataKey : a);
  return (0, wt.default)(s) ? null : t.scale(s)
}
var wp = function(t) {
    var r = t.axis,
      n = t.ticks,
      i = t.offset,
      o = t.bandSize,
      a = t.entry,
      u = t.index;
    if (r.type === "category") return n[u] ? n[u].coordinate + i : null;
    var s = Ve(a, r.dataKey, r.domain[u]);
    return (0, wt.default)(s) ? null : r.scale(s) - o / 2 + i
  },
  M1 = function(t) {
    var r = t.numericAxis,
      n = r.scale.domain();
    if (r.type === "number") {
      var i = Math.min(n[0], n[1]),
        o = Math.max(n[0], n[1]);
      return i <= 0 && o >= 0 ? 0 : o < 0 ? o : i
    }
    return n[0]
  },
  C1 = function(t, r) {
    var n, i = (n = t.type) !== null && n !== void 0 && n.defaultProps ? De(De({}, t.type.defaultProps), t.props) : t.props,
      o = i.stackId;
    if (je(o)) {
      var a = r[o];
      if (a) {
        var u = a.items.indexOf(t);
        return u >= 0 ? a.stackedData[u] : null
      }
    }
    return null
  },
  az = function(t) {
    return t.reduce(function(r, n) {
      return [(0, Uo.default)(n.concat([r[0]]).filter(X)), (0, $o.default)(n.concat([r[1]]).filter(X))]
    }, [1 / 0, -1 / 0])
  },
  Op = function(t, r, n) {
    return Object.keys(t).reduce(function(i, o) {
      var a = t[o],
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
  ws = function(t, r, n) {
    if ((0, ci.default)(t)) return t(r, n);
    if (!Array.isArray(t)) return r;
    var i = [];
    if (X(t[0])) i[0] = n ? t[0] : Math.min(t[0], r[0]);
    else if (f1.test(t[0])) {
      var o = +f1.exec(t[0])[1];
      i[0] = r[0] - o
    } else(0, ci.default)(t[0]) ? i[0] = t[0](r[0]) : i[0] = r[0];
    if (X(t[1])) i[1] = n ? t[1] : Math.max(t[1], r[1]);
    else if (p1.test(t[1])) {
      var a = +p1.exec(t[1])[1];
      i[1] = r[1] + a
    } else(0, ci.default)(t[1]) ? i[1] = t[1](r[1]) : i[1] = r[1];
    return i
  },
  pi = function(t, r, n) {
    if (t && t.scale && t.scale.bandwidth) {
      var i = t.scale.bandwidth();
      if (!n || i > 0) return i
    }
    if (t && r && r.length >= 2) {
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
  Sp = function(t, r, n) {
    return !t || !t.length || (0, y1.default)(t, (0, yp.default)(n, "type.defaultProps.domain")) ? r : t
  },
  Os = function(t, r) {
    var n = t.type.defaultProps ? De(De({}, t.type.defaultProps), t.props) : t.props,
      i = n.dataKey,
      o = n.name,
      a = n.unit,
      u = n.formatter,
      s = n.tooltipType,
      l = n.chartType,
      f = n.hide;
    return De(De({}, ue(t, !1)), {}, {
      dataKey: i,
      unit: a,
      formatter: u,
      name: o || i,
      color: zo(t),
      value: Ve(r, i),
      type: s,
      payload: r,
      chartType: l,
      hide: f
    })
  };

function Go(e) {
  "@babel/helpers - typeof";
  return Go = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Go(e)
}

function I1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function k1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? I1(Object(r), !0).forEach(function(n) {
      uz(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : I1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function uz(e, t, r) {
  return t = sz(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function sz(e) {
  var t = lz(e, "string");
  return Go(t) == "symbol" ? t : t + ""
}

function lz(e, t) {
  if (Go(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Go(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Ko = Math.PI / 180;
var pz = function(t) {
    return t * 180 / Math.PI
  },
  Ne = function(t, r, n, i) {
    return {
      x: t + Math.cos(-Ko * i) * n,
      y: r + Math.sin(-Ko * i) * n
    }
  };
var dz = function(t, r) {
    var n = t.x,
      i = t.y,
      o = r.x,
      a = r.y;
    return Math.sqrt(Math.pow(n - o, 2) + Math.pow(i - a, 2))
  },
  mz = function(t, r) {
    var n = t.x,
      i = t.y,
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
  hz = function(t) {
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
  yz = function(t, r) {
    var n = r.startAngle,
      i = r.endAngle,
      o = Math.floor(n / 360),
      a = Math.floor(i / 360),
      u = Math.min(o, a);
    return t + u * 360
  },
  Ap = function(t, r) {
    var n = t.x,
      i = t.y,
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

function Vo(e) {
  "@babel/helpers - typeof";
  return Vo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Vo(e)
}
var vz = ["offset"];

function gz(e) {
  return Oz(e) || wz(e) || xz(e) || bz()
}

function bz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function xz(e, t) {
  if (e) {
    if (typeof e == "string") return _p(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return _p(e, t)
  }
}

function wz(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function Oz(e) {
  if (Array.isArray(e)) return _p(e)
}

function _p(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function Sz(e, t) {
  if (e == null) return {};
  var r = Az(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function Az(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function D1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Fe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? D1(Object(r), !0).forEach(function(n) {
      _z(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : D1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function _z(e, t, r) {
  return t = Pz(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Pz(e) {
  var t = Tz(e, "string");
  return Vo(t) == "symbol" ? t : t + ""
}

function Tz(e, t) {
  if (Vo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Vo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Xo() {
  return Xo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Xo.apply(this, arguments)
}
var jz = function(t) {
    var r = t.value,
      n = t.formatter,
      i = (0, Yo.default)(t.children) ? r : t.children;
    return (0, Zo.default)(n) ? n(i) : i
  },
  Mz = function(t, r) {
    var n = Ye(r - t),
      i = Math.min(Math.abs(r - t), 360);
    return n * i
  },
  Cz = function(t, r, n) {
    var i = t.position,
      o = t.viewBox,
      a = t.offset,
      u = t.className,
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
    var h = Ne(l, f, v, S),
      g = Ne(l, f, v, S + (P ? 1 : -1) * 359),
      _ = "M".concat(h.x, ",").concat(h.y, `
    A`).concat(v, ",").concat(v, ",0,1,").concat(P ? 0 : 1, `,
    `).concat(g.x, ",").concat(g.y),
      C = (0, Yo.default)(t.id) ? Qt("recharts-radial-line-") : t.id;
    return ur.createElement("text", Xo({}, n, {
      dominantBaseline: "central",
      className: ae("recharts-radial-bar-label", u)
    }), ur.createElement("defs", null, ur.createElement("path", {
      id: C,
      d: _
    })), ur.createElement("textPath", {
      xlinkHref: "#".concat(C)
    }, r))
  },
  Iz = function(t) {
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
      var d = Ne(a, u, l + n, p),
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
      x = Ne(a, u, v, p),
      w = x.x,
      S = x.y;
    return {
      x: w,
      y: S,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }
  },
  kz = function(t) {
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
      return Fe(Fe({}, S), n ? {
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
      return Fe(Fe({}, P), n ? {
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
      return Fe(Fe({}, h), n ? {
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
      return Fe(Fe({}, g), n ? {
        width: Math.max(n.x + n.width - g.x, 0),
        height: f
      } : {})
    }
    var _ = n ? {
      width: l,
      height: f
    } : {};
    return o === "insideLeft" ? Fe({
      x: u + v,
      y: s + f / 2,
      textAnchor: w,
      verticalAnchor: "middle"
    }, _) : o === "insideRight" ? Fe({
      x: u + l - v,
      y: s + f / 2,
      textAnchor: x,
      verticalAnchor: "middle"
    }, _) : o === "insideTop" ? Fe({
      x: u + l / 2,
      y: s + p,
      textAnchor: "middle",
      verticalAnchor: y
    }, _) : o === "insideBottom" ? Fe({
      x: u + l / 2,
      y: s + f - p,
      textAnchor: "middle",
      verticalAnchor: d
    }, _) : o === "insideTopLeft" ? Fe({
      x: u + v,
      y: s + p,
      textAnchor: w,
      verticalAnchor: y
    }, _) : o === "insideTopRight" ? Fe({
      x: u + l - v,
      y: s + p,
      textAnchor: x,
      verticalAnchor: y
    }, _) : o === "insideBottomLeft" ? Fe({
      x: u + v,
      y: s + f - p,
      textAnchor: w,
      verticalAnchor: d
    }, _) : o === "insideBottomRight" ? Fe({
      x: u + l - v,
      y: s + f - p,
      textAnchor: x,
      verticalAnchor: d
    }, _) : (0, Tp.default)(o) && (X(o.x) || pr(o.x)) && (X(o.y) || pr(o.y)) ? Fe({
      x: u + zt(o.x, l),
      y: s + zt(o.y, f),
      textAnchor: "end",
      verticalAnchor: "end"
    }, _) : Fe({
      x: u + l / 2,
      y: s + f / 2,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }, _)
  },
  Dz = function(t) {
    return "cx" in t && X(t.cx)
  };

function Be(e) {
  var t = e.offset,
    r = t === void 0 ? 5 : t,
    n = Sz(e, vz),
    i = Fe({
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
  if (!o || (0, Yo.default)(u) && (0, Yo.default)(s) && !Ss(l) && !(0, Zo.default)(l)) return null;
  if (Ss(l)) return Pp(l, i);
  var d;
  if ((0, Zo.default)(l)) {
    if (d = Ez(l, i), Ss(d)) return d
  } else d = jz(i);
  var y = Dz(o),
    m = ue(i, !0);
  if (y && (a === "insideStart" || a === "insideEnd" || a === "end")) return Cz(i, d, m);
  var v = y ? Iz(i) : kz(i);
  return ur.createElement(Xr, Xo({
    className: ae("recharts-label", c)
  }, m, v, {
    breakAll: p
  }), d)
}
Be.displayName = "Label";
var N1 = function(t) {
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
      d = t.top,
      y = t.left,
      m = t.width,
      v = t.height,
      x = t.clockWise,
      w = t.labelViewBox;
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
    } : t.viewBox ? t.viewBox : {}
  },
  Nz = function(t, r) {
    return t ? t === !0 ? ur.createElement(Be, {
      key: "label-implicit",
      viewBox: r
    }) : je(t) ? ur.createElement(Be, {
      key: "label-implicit",
      viewBox: r,
      value: t
    }) : Ss(t) ? t.type === Be ? Pp(t, {
      key: "label-implicit",
      viewBox: r
    }) : ur.createElement(Be, {
      key: "label-implicit",
      content: t,
      viewBox: r
    }) : (0, Zo.default)(t) ? ur.createElement(Be, {
      key: "label-implicit",
      content: t,
      viewBox: r
    }) : (0, Tp.default)(t) ? ur.createElement(Be, Xo({
      viewBox: r
    }, t, {
      key: "label-implicit"
    })) : null : null
  },
  Rz = function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!t || !t.children && n && !t.label) return null;
    var i = t.children,
      o = N1(t),
      a = We(i, Be).map(function(s, l) {
        return Pp(s, {
          viewBox: r || o,
          key: "label-".concat(l)
        })
      });
    if (!n) return a;
    var u = Nz(t.label, r || o);
    return [u].concat(gz(a))
  };
Be.parseViewBox = N1;
Be.renderCallByParent = Rz;
var As = te(Tt()),
  z1 = te(Pt()),
  F1 = te(Le()),
  $1 = te(L1());
import di, {
  cloneElement as Xz
} from "./react-shim-eraudit.js";

function Jo(e) {
  "@babel/helpers - typeof";
  return Jo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Jo(e)
}
var Bz = ["valueAccessor"],
  qz = ["data", "dataKey", "clockWise", "id", "textBreakAll"];

function Wz(e) {
  return Uz(e) || $z(e) || Fz(e) || zz()
}

function zz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Fz(e, t) {
  if (e) {
    if (typeof e == "string") return Ep(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ep(e, t)
  }
}

function $z(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function Uz(e) {
  if (Array.isArray(e)) return Ep(e)
}

function Ep(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function _s() {
  return _s = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, _s.apply(this, arguments)
}

function B1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function q1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? B1(Object(r), !0).forEach(function(n) {
      Hz(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : B1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Hz(e, t, r) {
  return t = Gz(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Gz(e) {
  var t = Kz(e, "string");
  return Jo(t) == "symbol" ? t : t + ""
}

function Kz(e, t) {
  if (Jo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Jo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function W1(e, t) {
  if (e == null) return {};
  var r = Vz(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function Vz(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var Yz = function(t) {
  return Array.isArray(t.value) ? (0, $1.default)(t.value) : t.value
};

function sr(e) {
  var t = e.valueAccessor,
    r = t === void 0 ? Yz : t,
    n = W1(e, Bz),
    i = n.data,
    o = n.dataKey,
    a = n.clockWise,
    u = n.id,
    s = n.textBreakAll,
    l = W1(n, qz);
  return !i || !i.length ? null : di.createElement(be, {
    className: "recharts-label-list"
  }, i.map(function(f, c) {
    var p = (0, As.default)(o) ? r(f, c) : Ve(f && f.payload, o),
      d = (0, As.default)(u) ? {} : {
        id: "".concat(u, "-").concat(c)
      };
    return di.createElement(Be, _s({}, ue(f, !0), l, d, {
      parentViewBox: f.parentViewBox,
      value: p,
      textBreakAll: s,
      viewBox: Be.parseViewBox((0, As.default)(a) ? f : q1(q1({}, f), {}, {
        clockWise: a
      })),
      key: "label-".concat(c),
      index: c
    }))
  }))
}
sr.displayName = "LabelList";

function Zz(e, t) {
  return e ? e === !0 ? di.createElement(sr, {
    key: "labelList-implicit",
    data: t
  }) : di.isValidElement(e) || (0, F1.default)(e) ? di.createElement(sr, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : (0, z1.default)(e) ? di.createElement(sr, _s({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null
}

function Jz(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label) return null;
  var n = e.children,
    i = We(n, sr).map(function(a, u) {
      return Xz(a, {
        data: t,
        key: "labelList-".concat(u)
      })
    });
  if (!r) return i;
  var o = Zz(e.label, t);
  return [o].concat(Wz(i))
}
sr.renderCallByParent = Jz;
import rF from "./react-shim-eraudit.js";

function Qo(e) {
  "@babel/helpers - typeof";
  return Qo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Qo(e)
}

function jp() {
  return jp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, jp.apply(this, arguments)
}

function U1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function H1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? U1(Object(r), !0).forEach(function(n) {
      Qz(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : U1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Qz(e, t, r) {
  return t = eF(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function eF(e) {
  var t = tF(e, "string");
  return Qo(t) == "symbol" ? t : t + ""
}

function tF(e, t) {
  if (Qo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Qo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var nF = function(t, r) {
    var n = Ye(r - t),
      i = Math.min(Math.abs(r - t), 359.999);
    return n * i
  },
  Ps = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.radius,
      o = t.angle,
      a = t.sign,
      u = t.isExternal,
      s = t.cornerRadius,
      l = t.cornerIsExternal,
      f = s * (u ? 1 : -1) + i,
      c = Math.asin(s / f) / Ko,
      p = l ? o : o + a * c,
      d = Ne(r, n, f, p),
      y = Ne(r, n, i, p),
      m = l ? o - a * c : o,
      v = Ne(r, n, f * Math.cos(c * Ko), m);
    return {
      center: d,
      circleTangency: y,
      lineTangency: v,
      theta: c
    }
  },
  G1 = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      o = t.outerRadius,
      a = t.startAngle,
      u = t.endAngle,
      s = nF(a, u),
      l = a + s,
      f = Ne(r, n, o, a),
      c = Ne(r, n, o, l),
      p = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(o, ",").concat(o, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(a > l), `,
    `).concat(c.x, ",").concat(c.y, `
  `);
    if (i > 0) {
      var d = Ne(r, n, i, a),
        y = Ne(r, n, i, l);
      p += "L ".concat(y.x, ",").concat(y.y, `
            A `).concat(i, ",").concat(i, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(a <= l), `,
            `).concat(d.x, ",").concat(d.y, " Z")
    } else p += "L ".concat(r, ",").concat(n, " Z");
    return p
  },
  iF = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      o = t.outerRadius,
      a = t.cornerRadius,
      u = t.forceCornerRadius,
      s = t.cornerIsExternal,
      l = t.startAngle,
      f = t.endAngle,
      c = Ye(f - l),
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
  Ts = function(t) {
    var r = H1(H1({}, oF), t),
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
    var d = ae("recharts-sector", p),
      y = a - o,
      m = zt(u, y, 0, !0),
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
    }), rF.createElement("path", jp({}, ue(r, !0), {
      className: d,
      d: v,
      role: "img"
    }))
  };
import * as Y1 from "./react-shim-eraudit.js";
var Z1 = te(nu()),
  J1 = te(Le());

function ra(e) {
  "@babel/helpers - typeof";
  return ra = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ra(e)
}

function Mp() {
  return Mp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Mp.apply(this, arguments)
}

function K1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function V1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? K1(Object(r), !0).forEach(function(n) {
      aF(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : K1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function aF(e, t, r) {
  return t = uF(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function uF(e) {
  var t = sF(e, "string");
  return ra(t) == "symbol" ? t : t + ""
}

function sF(e, t) {
  if (ra(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ra(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var X1 = {
    curveBasisClosed: cc,
    curveBasisOpen: fc,
    curveBasis: lc,
    curveBumpX: Ql,
    curveBumpY: ec,
    curveLinearClosed: pc,
    curveLinear: Ar,
    curveMonotoneX: mc,
    curveMonotoneY: hc,
    curveNatural: yc,
    curveStep: vc,
    curveStepAfter: bc,
    curveStepBefore: gc
  },
  Es = function(t) {
    return t.x === +t.x && t.y === +t.y
  },
  ea = function(t) {
    return t.x
  },
  ta = function(t) {
    return t.y
  },
  lF = function(t, r) {
    if ((0, J1.default)(t)) return t;
    var n = "curve".concat((0, Z1.default)(t));
    return (n === "curveMonotone" || n === "curveBump") && r ? X1["".concat(n).concat(r === "vertical" ? "Y" : "X")] : X1[n] || Ar
  },
  cF = function(t) {
    var r = t.type,
      n = r === void 0 ? "linear" : r,
      i = t.points,
      o = i === void 0 ? [] : i,
      a = t.baseLine,
      u = t.layout,
      s = t.connectNulls,
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
      return u === "vertical" ? p = Cn().y(ta).x1(ea).x0(function(m) {
        return m.base.x
      }) : p = Cn().x(ea).y1(ta).y0(function(m) {
        return m.base.y
      }), p.defined(Es).curve(f), p(y)
    }
    return u === "vertical" && X(a) ? p = Cn().y(ta).x1(ea).x0(a) : X(a) ? p = Cn().x(ea).y1(ta).y0(a) : p = Ji().x(ea).y(ta), p.defined(Es).curve(f), p(c)
  },
  na = function(t) {
    var r = t.className,
      n = t.points,
      i = t.path,
      o = t.pathRef;
    if ((!n || !n.length) && !i) return null;
    var a = n && n.length ? cF(t) : i;
    return Y1.createElement("path", Mp({}, ue(t, !1), zr(t), {
      className: ae("recharts-curve", r),
      d: a,
      ref: o
    }))
  };
import Rs, {
  useEffect as Z3,
  useRef as J3,
  useState as Q3
} from "./react-shim-eraudit.js";
var we = te(aO());
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

function Cp(e, t) {
  return function(n, i, o) {
    return e(n, i, o) && t(n, i, o)
  }
}

function js(e) {
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

function yF(e) {
  return e?.[Symbol.toStringTag]
}

function uO(e) {
  return dF(e).concat(mF(e))
}
var vF = Object.hasOwn || ((e, t) => hF.call(e, t));

function dn(e, t) {
  return e === t || !e && !t && e !== e && t !== t
}
var gF = "__v",
  bF = "__o",
  xF = "_owner",
  {
    getOwnPropertyDescriptor: sO,
    keys: lO
  } = Object;

function wF(e, t) {
  return e.byteLength === t.byteLength && Ms(new Uint8Array(e), new Uint8Array(t))
}

function OF(e, t, r) {
  let n = e.length;
  if (t.length !== n) return !1;
  for (; n-- > 0;)
    if (!r.equals(e[n], t[n], n, n, e, t, r)) return !1;
  return !0
}

function SF(e, t) {
  return e.byteLength === t.byteLength && Ms(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength))
}

function AF(e, t) {
  return dn(e.getTime(), t.getTime())
}

function _F(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack
}

function PF(e, t) {
  return e === t
}

function cO(e, t, r) {
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
        d = u.value;
      if (r.equals(p[0], d[0], s, c, e, t, r) && r.equals(p[1], d[1], p[0], d[0], e, t, r)) {
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
var TF = dn;

function EF(e, t, r) {
  let n = lO(e),
    i = n.length;
  if (lO(t).length !== i) return !1;
  for (; i-- > 0;)
    if (!pO(e, t, r, n[i])) return !1;
  return !0
}

function ia(e, t, r) {
  let n = uO(e),
    i = n.length;
  if (uO(t).length !== i) return !1;
  let o, a, u;
  for (; i-- > 0;)
    if (o = n[i], !pO(e, t, r, o) || (a = sO(e, o), u = sO(t, o), (a || u) && (!a || !u || a.configurable !== u.configurable || a.enumerable !== u.enumerable || a.writable !== u.writable))) return !1;
  return !0
}

function jF(e, t) {
  return dn(e.valueOf(), t.valueOf())
}

function MF(e, t) {
  return e.source === t.source && e.flags === t.flags
}

function fO(e, t, r) {
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

function Ms(e, t) {
  let r = e.byteLength;
  if (t.byteLength !== r || e.byteOffset !== t.byteOffset) return !1;
  for (; r-- > 0;)
    if (e[r] !== t[r]) return !1;
  return !0
}

function CF(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password
}

function pO(e, t, r, n) {
  return (n === xF || n === bF || n === gF) && (e.$$typeof || t.$$typeof) ? !0 : vF(t, n) && r.equals(e[n], t[n], n, n, e, t, r)
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
    if (Array.isArray(v)) return t(v, x, w);
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
    if (h === IF) return e(v, x, w);
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
  circular: e,
  createCustomConfig: t,
  strict: r
}) {
  let n = {
    areArrayBuffersEqual: wF,
    areArraysEqual: r ? ia : OF,
    areDataViewsEqual: SF,
    areDatesEqual: AF,
    areErrorsEqual: _F,
    areFunctionsEqual: PF,
    areMapsEqual: r ? Cp(cO, ia) : cO,
    areNumbersEqual: TF,
    areObjectsEqual: r ? ia : EF,
    arePrimitiveWrappersEqual: jF,
    areRegExpsEqual: MF,
    areSetsEqual: r ? Cp(fO, ia) : fO,
    areTypedArraysEqual: r ? Cp(Ms, ia) : Ms,
    areUrlsEqual: CF,
    unknownTagComparators: void 0
  };
  if (t && (n = Object.assign({}, n, t(n))), e) {
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

function XF(e) {
  return function(t, r, n, i, o, a, u) {
    return e(t, r, u)
  }
}

function YF({
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
var dO = kr(),
  Mee = kr({
    strict: !0
  }),
  Cee = kr({
    circular: !0
  }),
  Iee = kr({
    circular: !0,
    strict: !0
  }),
  kee = kr({
    createInternalComparator: () => dn
  }),
  Dee = kr({
    strict: !0,
    createInternalComparator: () => dn
  }),
  Nee = kr({
    circular: !0,
    createInternalComparator: () => dn
  }),
  Ree = kr({
    circular: !0,
    createInternalComparator: () => dn,
    strict: !0
  });

function kr(e = {}) {
  let {
    circular: t = !1,
    createInternalComparator: r,
    createState: n,
    strict: i = !1
  } = e, o = VF(e), a = KF(o), u = r ? r(a) : XF(a);
  return YF({
    circular: t,
    comparator: a,
    createState: n,
    equals: u,
    strict: i
  })
}

function ZF(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e)
}

function Cs(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    r = -1,
    n = function i(o) {
      r < 0 && (r = o), o - r > t ? (e(o), r = -1) : ZF(i)
    };
  requestAnimationFrame(n)
}

function Ip(e) {
  "@babel/helpers - typeof";
  return Ip = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ip(e)
}

function JF(e) {
  return r3(e) || t3(e) || e3(e) || QF()
}

function QF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function e3(e, t) {
  if (e) {
    if (typeof e == "string") return mO(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return mO(e, t)
  }
}

function mO(e, t) {
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

function kp() {
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
        Ip(o) === "object" && (e = o, t(e)), typeof o == "function" && o()
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

function oa(e) {
  "@babel/helpers - typeof";
  return oa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, oa(e)
}

function hO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function yO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hO(Object(r), !0).forEach(function(n) {
      vO(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function vO(e, t, r) {
  return t = n3(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function n3(e) {
  var t = i3(e, "string");
  return oa(t) === "symbol" ? t : String(t)
}

function i3(e, t) {
  if (oa(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (oa(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var gO = function(t, r) {
    return [Object.keys(t), Object.keys(r)].reduce(function(n, i) {
      return n.filter(function(o) {
        return i.includes(o)
      })
    })
  },
  bO = function(t) {
    return t
  },
  o3 = function(t) {
    return t.replace(/([A-Z])/g, function(r) {
      return "-".concat(r.toLowerCase())
    })
  };
var mi = function(t, r) {
    return Object.keys(r).reduce(function(n, i) {
      return yO(yO({}, n), {}, vO({}, i, t(i, r[i])))
    }, {})
  },
  Dp = function(t, r, n) {
    return t.map(function(i) {
      return "".concat(o3(i), " ").concat(r, "ms ").concat(n)
    }).join(",")
  },
  a3 = !1,
  aa = function(t, r, n, i, o, a, u, s) {
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
  return c3(e) || l3(e, t) || OO(e, t) || s3()
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
  return m3(e) || d3(e) || OO(e) || p3()
}

function p3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function OO(e, t) {
  if (e) {
    if (typeof e == "string") return Np(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Np(e, t)
  }
}

function d3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function m3(e) {
  if (Array.isArray(e)) return Np(e)
}

function Np(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var Is = 1e-4,
  SO = function(t, r) {
    return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1]
  },
  AO = function(t, r) {
    return t.map(function(n, i) {
      return n * Math.pow(r, i)
    }).reduce(function(n, i) {
      return n + i
    })
  },
  xO = function(t, r) {
    return function(n) {
      var i = SO(t, r);
      return AO(i, n)
    }
  },
  h3 = function(t, r) {
    return function(n) {
      var i = SO(t, r),
        o = [].concat(f3(i.map(function(a, u) {
          return a * u
        }).slice(1)), [0]);
      return AO(o, n)
    }
  },
  wO = function() {
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
          var l = s[1].split(")")[0].split(",").map(function(v) {
              return parseFloat(v)
            }),
            f = u3(l, 4);
          i = f[0], o = f[1], a = f[2], u = f[3]
        } else aa(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r)
      }
    }
    aa([i, a, o, u].every(function(v) {
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
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = t.stiff,
      n = r === void 0 ? 100 : r,
      i = t.damping,
      o = i === void 0 ? 8 : i,
      a = t.dt,
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
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
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
        aa(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r)
    }
    return typeof i == "function" ? i : (aa(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null)
  };

function ua(e) {
  "@babel/helpers - typeof";
  return ua = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ua(e)
}

function PO(e) {
  return b3(e) || g3(e) || EO(e) || v3()
}

function v3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function g3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function b3(e) {
  if (Array.isArray(e)) return Lp(e)
}

function TO(e, t) {
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
    t % 2 ? TO(Object(r), !0).forEach(function(n) {
      Rp(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : TO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Rp(e, t, r) {
  return t = x3(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function x3(e) {
  var t = w3(e, "string");
  return ua(t) === "symbol" ? t : String(t)
}

function w3(e, t) {
  if (ua(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ua(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function O3(e, t) {
  return _3(e) || A3(e, t) || EO(e, t) || S3()
}

function S3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function EO(e, t) {
  if (e) {
    if (typeof e == "string") return Lp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Lp(e, t)
  }
}

function Lp(e, t) {
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

function _3(e) {
  if (Array.isArray(e)) return e
}
var ks = function(t, r, n) {
    return t + (r - t) * n
  },
  Bp = function(t) {
    var r = t.from,
      n = t.to;
    return r !== n
  },
  P3 = function e(t, r, n) {
    var i = mi(function(o, a) {
      if (Bp(a)) {
        var u = t(a.from, a.to, a.velocity),
          s = O3(u, 2),
          l = s[0],
          f = s[1];
        return Xe(Xe({}, a), {}, {
          from: l,
          velocity: f
        })
      }
      return a
    }, r);
    return n < 1 ? mi(function(o, a) {
      return Bp(a) ? Xe(Xe({}, a), {}, {
        velocity: ks(a.velocity, i[o].velocity, n),
        from: ks(a.from, i[o].from, n)
      }) : a
    }, r) : e(t, i, n - 1)
  },
  jO = function(e, t, r, n, i) {
    var o = gO(e, t),
      a = o.reduce(function(v, x) {
        return Xe(Xe({}, v), {}, Rp({}, x, [e[x], t[x]]))
      }, {}),
      u = o.reduce(function(v, x) {
        return Xe(Xe({}, v), {}, Rp({}, x, {
          from: e[x],
          velocity: 0,
          to: t[x]
        }))
      }, {}),
      s = -1,
      l, f, c = function() {
        return null
      },
      p = function() {
        return mi(function(x, w) {
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
        u = P3(r, u, S), i(Xe(Xe(Xe({}, e), t), p(u))), l = x, d() || (s = requestAnimationFrame(c))
      },
      m = function(x) {
        f || (f = x);
        var w = (x - f) / n,
          S = mi(function(h, g) {
            return ks.apply(void 0, PO(g).concat([r(w)]))
          }, a);
        if (i(Xe(Xe(Xe({}, e), t), S)), w < 1) s = requestAnimationFrame(c);
        else {
          var P = mi(function(h, g) {
            return ks.apply(void 0, PO(g).concat([r(1)]))
          }, a);
          i(Xe(Xe(Xe({}, e), t), P))
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

function hi(e) {
  "@babel/helpers - typeof";
  return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, hi(e)
}
var T3 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];

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

function qp(e) {
  return k3(e) || I3(e) || C3(e) || M3()
}

function M3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function C3(e, t) {
  if (e) {
    if (typeof e == "string") return zp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return zp(e, t)
  }
}

function I3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function k3(e) {
  if (Array.isArray(e)) return zp(e)
}

function zp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function MO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ht(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? MO(Object(r), !0).forEach(function(n) {
      sa(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : MO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function sa(e, t, r) {
  return t = IO(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function D3(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function CO(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, IO(n.key), n)
  }
}

function N3(e, t, r) {
  return t && CO(e.prototype, t), r && CO(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function IO(e) {
  var t = R3(e, "string");
  return hi(t) === "symbol" ? t : String(t)
}

function R3(e, t) {
  if (hi(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (hi(n) !== "object") return n;
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
  }), t && Fp(e, t)
}

function Fp(e, t) {
  return Fp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Fp(e, t)
}

function B3(e) {
  var t = q3();
  return function() {
    var n = Ds(e),
      i;
    if (t) {
      var o = Ds(this).constructor;
      i = Reflect.construct(n, arguments, o)
    } else i = n.apply(this, arguments);
    return $p(this, i)
  }
}

function $p(e, t) {
  if (t && (hi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Up(e)
}

function Up(e) {
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

function Ds(e) {
  return Ds = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ds(e)
}
var Ns = function(e) {
  L3(r, e);
  var t = B3(r);

  function r(n, i) {
    var o;
    D3(this, r), o = t.call(this, n, i);
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
        style: s ? sa({}, s, l) : l
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
            style: s ? sa({}, s, f) : f
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
              style: s ? sa({}, s, m) : m
            };
            (s && p[s] !== m || !s && p !== m) && this.setState(v)
          }
          this.runAnimation(Ht(Ht({}, this.props), {}, {
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
            W = Ht(Ht(Ht({}, C.style), h), {}, {
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
      var m = u ? sa({}, u, s) : s,
        v = Dp(Object.keys(m), a, l);
      y.start([f, o, Ht(Ht({}, m), {}, {
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
          R = F3(_, Ht(Ht({}, w), {}, {
            style: Ht(Ht({}, B), P),
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
  from: we.default.oneOfType([we.default.object, we.default.string]),
  to: we.default.oneOfType([we.default.object, we.default.string]),
  attributeName: we.default.string,
  duration: we.default.number,
  begin: we.default.number,
  easing: we.default.oneOfType([we.default.string, we.default.func]),
  steps: we.default.arrayOf(we.default.shape({
    duration: we.default.number.isRequired,
    style: we.default.object.isRequired,
    easing: we.default.oneOfType([we.default.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), we.default.func]),
    properties: we.default.arrayOf("string"),
    onAnimationEnd: we.default.func
  })),
  children: we.default.oneOfType([we.default.node, we.default.func]),
  isActive: we.default.bool,
  canBegin: we.default.bool,
  onAnimationEnd: we.default.func,
  shouldReAnimate: we.default.bool,
  onAnimationStart: we.default.func,
  onAnimationReStart: we.default.func
};
var kO = Ns;
var lr = kO;

function la(e) {
  "@babel/helpers - typeof";
  return la = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, la(e)
}

function Ls() {
  return Ls = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ls.apply(this, arguments)
}

function $3(e, t) {
  return K3(e) || G3(e, t) || H3(e, t) || U3()
}

function U3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function H3(e, t) {
  if (e) {
    if (typeof e == "string") return DO(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return DO(e, t)
  }
}

function DO(e, t) {
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

function NO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function RO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? NO(Object(r), !0).forEach(function(n) {
      V3(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : NO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function V3(e, t, r) {
  return t = X3(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function X3(e) {
  var t = Y3(e, "string");
  return la(t) == "symbol" ? t : t + ""
}

function Y3(e, t) {
  if (la(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (la(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var LO = function(t, r, n, i, o) {
    var a = Math.min(Math.abs(n) / 2, Math.abs(i) / 2),
      u = i >= 0 ? 1 : -1,
      s = n >= 0 ? 1 : -1,
      l = i >= 0 && n >= 0 || i < 0 && n < 0 ? 1 : 0,
      f;
    if (a > 0 && o instanceof Array) {
      for (var c = [0, 0, 0, 0], p = 0, d = 4; p < d; p++) c[p] = o[p] > a ? a : o[p];
      f = "M".concat(t, ",").concat(r + u * c[0]), c[0] > 0 && (f += "A ".concat(c[0], ",").concat(c[0], ",0,0,").concat(l, ",").concat(t + s * c[0], ",").concat(r)), f += "L ".concat(t + n - s * c[1], ",").concat(r), c[1] > 0 && (f += "A ".concat(c[1], ",").concat(c[1], ",0,0,").concat(l, `,
        `).concat(t + n, ",").concat(r + u * c[1])), f += "L ".concat(t + n, ",").concat(r + i - u * c[2]), c[2] > 0 && (f += "A ".concat(c[2], ",").concat(c[2], ",0,0,").concat(l, `,
        `).concat(t + n - s * c[2], ",").concat(r + i)), f += "L ".concat(t + s * c[3], ",").concat(r + i), c[3] > 0 && (f += "A ".concat(c[3], ",").concat(c[3], ",0,0,").concat(l, `,
        `).concat(t, ",").concat(r + i - u * c[3])), f += "Z"
    } else if (a > 0 && o === +o && o > 0) {
      var y = Math.min(a, o);
      f = "M ".concat(t, ",").concat(r + u * y, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(l, ",").concat(t + s * y, ",").concat(r, `
            L `).concat(t + n - s * y, ",").concat(r, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(l, ",").concat(t + n, ",").concat(r + u * y, `
            L `).concat(t + n, ",").concat(r + i - u * y, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(l, ",").concat(t + n - s * y, ",").concat(r + i, `
            L `).concat(t + s * y, ",").concat(r + i, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(l, ",").concat(t, ",").concat(r + i - u * y, " Z")
    } else f = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(i, " h ").concat(-n, " Z");
    return f
  },
  BO = function(t, r) {
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
  yi = function(t) {
    var r = RO(RO({}, e8), t),
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
    var S = ae("recharts-rectangle", d);
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
      }, Rs.createElement("path", Ls({}, ue(r, !0), {
        className: S,
        d: LO(_, C, h, g, p),
        ref: n
      })))
    }) : Rs.createElement("path", Ls({}, ue(r, !0), {
      className: S,
      d: LO(s, l, f, c, p)
    }))
  };
import * as qO from "./react-shim-eraudit.js";

function Hp() {
  return Hp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Hp.apply(this, arguments)
}
var vi = function(t) {
  var r = t.cx,
    n = t.cy,
    i = t.r,
    o = t.className,
    a = ae("recharts-dot", o);
  return r === +r && n === +n && i === +i ? qO.createElement("circle", Hp({}, ue(t, !1), zr(t), {
    className: a,
    cx: r,
    cy: n,
    r: i
  })) : null
};
import s8 from "./react-shim-eraudit.js";

function ca(e) {
  "@babel/helpers - typeof";
  return ca = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ca(e)
}
var t8 = ["x", "y", "top", "left", "width", "height", "className"];

function Gp() {
  return Gp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Gp.apply(this, arguments)
}

function WO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function r8(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? WO(Object(r), !0).forEach(function(n) {
      n8(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : WO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function n8(e, t, r) {
  return t = i8(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function i8(e) {
  var t = o8(e, "string");
  return ca(t) == "symbol" ? t : t + ""
}

function o8(e, t) {
  if (ca(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ca(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function a8(e, t) {
  if (e == null) return {};
  var r = u8(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function u8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var l8 = function(t, r, n, i, o, a) {
    return "M".concat(t, ",").concat(o, "v").concat(i, "M").concat(a, ",").concat(r, "h").concat(n)
  },
  zO = function(t) {
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
      d = p === void 0 ? 0 : p,
      y = t.className,
      m = a8(t, t8),
      v = r8({
        x: n,
        y: o,
        top: u,
        left: l,
        width: c,
        height: d
      }, m);
    return !X(n) || !X(o) || !X(c) || !X(d) || !X(u) || !X(l) ? null : s8.createElement("path", Gp({}, ue(v, !0), {
      className: ae("recharts-cross", y),
      d: l8(n, o, c, d, u, l)
    }))
  };
var nS = te(Le()),
  iS = te(GO()),
  oS = te(VO()),
  aS = te(No());
import mn, {
  isValidElement as rS,
  cloneElement as $8
} from "./react-shim-eraudit.js";
import fa, {
  useEffect as k8,
  useRef as D8,
  useState as N8
} from "./react-shim-eraudit.js";

function pa(e) {
  "@babel/helpers - typeof";
  return pa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, pa(e)
}

function Bs() {
  return Bs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Bs.apply(this, arguments)
}

function _8(e, t) {
  return j8(e) || E8(e, t) || T8(e, t) || P8()
}

function P8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function T8(e, t) {
  if (e) {
    if (typeof e == "string") return XO(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return XO(e, t)
  }
}

function XO(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function E8(e, t) {
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

function j8(e) {
  if (Array.isArray(e)) return e
}

function YO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ZO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? YO(Object(r), !0).forEach(function(n) {
      M8(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : YO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function M8(e, t, r) {
  return t = C8(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function C8(e) {
  var t = I8(e, "string");
  return pa(t) == "symbol" ? t : t + ""
}

function I8(e, t) {
  if (pa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (pa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var JO = function(t, r, n, i, o) {
    var a = n - i,
      u;
    return u = "M ".concat(t, ",").concat(r), u += "L ".concat(t + n, ",").concat(r), u += "L ".concat(t + n - a / 2, ",").concat(r + o), u += "L ".concat(t + n - a / 2 - i, ",").concat(r + o), u += "L ".concat(t, ",").concat(r, " Z"), u
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
  QO = function(t) {
    var r = ZO(ZO({}, R8), t),
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
    var w = ae("recharts-trapezoid", d);
    return x ? fa.createElement(lr, {
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
      return fa.createElement(lr, {
        canBegin: a > 0,
        from: "0px ".concat(a === -1 ? 1 : a, "px"),
        to: "".concat(a, "px 0px"),
        attributeName: "strokeDasharray",
        begin: v,
        duration: m,
        easing: y
      }, fa.createElement("path", Bs({}, ue(r, !0), {
        className: w,
        d: JO(_, C, P, h, g),
        ref: n
      })))
    }) : fa.createElement("g", null, fa.createElement("path", Bs({}, ue(r, !0), {
      className: w,
      d: JO(s, l, f, c, p)
    })))
  };
var L8 = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];

function da(e) {
  "@babel/helpers - typeof";
  return da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, da(e)
}

function B8(e, t) {
  if (e == null) return {};
  var r = q8(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function q8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function eS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function qs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eS(Object(r), !0).forEach(function(n) {
      W8(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function W8(e, t, r) {
  return t = z8(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function z8(e) {
  var t = F8(e, "string");
  return da(t) == "symbol" ? t : t + ""
}

function F8(e, t) {
  if (da(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (da(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function U8(e, t) {
  return qs(qs({}, t), e)
}

function H8(e, t) {
  return e === "symbols"
}

function tS(e) {
  var t = e.shapeType,
    r = e.elementProps;
  switch (t) {
    case "rectangle":
      return mn.createElement(yi, r);
    case "trapezoid":
      return mn.createElement(QO, r);
    case "sector":
      return mn.createElement(Ts, r);
    case "symbols":
      if (H8(t, r)) return mn.createElement(eo, r);
      break;
    default:
      return null
  }
}

function G8(e) {
  return rS(e) ? e.props : e
}

function uS(e) {
  var t = e.option,
    r = e.shapeType,
    n = e.propTransformer,
    i = n === void 0 ? U8 : n,
    o = e.activeClassName,
    a = o === void 0 ? "recharts-active-shape" : o,
    u = e.isActive,
    s = B8(e, L8),
    l;
  if (rS(t)) l = $8(t, qs(qs({}, s), G8(t)));
  else if ((0, nS.default)(t)) l = t(s);
  else if ((0, iS.default)(t) && !(0, oS.default)(t)) {
    var f = i(t, s);
    l = mn.createElement(tS, {
      shapeType: r,
      elementProps: f
    })
  } else {
    var c = s;
    l = mn.createElement(tS, {
      shapeType: r,
      elementProps: c
    })
  }
  return u ? mn.createElement(be, {
    className: a
  }, l) : l
}

function ma(e, t) {
  return t != null && "trapezoids" in e.props
}

function ha(e, t) {
  return t != null && "sectors" in e.props
}

function gi(e, t) {
  return t != null && "points" in e.props
}

function K8(e, t) {
  var r, n, i = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x,
    o = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return i && o
}

function V8(e, t) {
  var r = e.endAngle === t.endAngle,
    n = e.startAngle === t.startAngle;
  return r && n
}

function X8(e, t) {
  var r = e.x === t.x,
    n = e.y === t.y,
    i = e.z === t.z;
  return r && n && i
}

function Y8(e, t) {
  var r;
  return ma(e, t) ? r = K8 : ha(e, t) ? r = V8 : gi(e, t) && (r = X8), r
}

function Z8(e, t) {
  var r;
  return ma(e, t) ? r = "trapezoids" : ha(e, t) ? r = "sectors" : gi(e, t) && (r = "points"), r
}

function J8(e, t) {
  if (ma(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload
  }
  if (ha(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload
  }
  return gi(e, t) ? t.payload : {}
}

function sS(e) {
  var t = e.activeTooltipItem,
    r = e.graphicalItem,
    n = e.itemData,
    i = Z8(r, t),
    o = J8(r, t),
    a = n.filter(function(s, l) {
      var f = (0, aS.default)(o, s),
        c = r.props[i].filter(function(y) {
          var m = Y8(r, t);
          return m(y, t)
        }),
        p = r.props[i].indexOf(c[c.length - 1]),
        d = l === p;
      return f && d
    }),
    u = n.indexOf(a[a.length - 1]);
  return u
}
import Je, {
  PureComponent as x$,
  Children as w$
} from "./react-shim-eraudit.js";
var Jp = te(Le()),
  _S = te(Xp());

function ya(e) {
  "@babel/helpers - typeof";
  return ya = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ya(e)
}

function yS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function vS(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yS(Object(r), !0).forEach(function(n) {
      gS(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function gS(e, t, r) {
  return t = c$(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function c$(e) {
  var t = f$(e, "string");
  return ya(t) == "symbol" ? t : t + ""
}

function f$(e, t) {
  if (ya(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ya(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var p$ = ["Webkit", "Moz", "O", "ms"],
  bS = function(t, r) {
    if (!t) return null;
    var n = t.replace(/(\w)/, function(o) {
        return o.toUpperCase()
      }),
      i = p$.reduce(function(o, a) {
        return vS(vS({}, o), {}, gS({}, a + n, r))
      }, {});
    return i[t] = r, i
  };

function bi(e) {
  "@babel/helpers - typeof";
  return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, bi(e)
}

function Ws() {
  return Ws = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ws.apply(this, arguments)
}

function xS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Yp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xS(Object(r), !0).forEach(function(n) {
      St(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function d$(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function wS(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, AS(n.key), n)
  }
}

function m$(e, t, r) {
  return t && wS(e.prototype, t), r && wS(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function h$(e, t, r) {
  return t = zs(t), y$(e, SS() ? Reflect.construct(t, r || [], zs(e).constructor) : t.apply(e, r))
}

function y$(e, t) {
  if (t && (bi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return v$(e)
}

function v$(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function SS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (SS = function() {
    return !!e
  })()
}

function zs(e) {
  return zs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, zs(e)
}

function g$(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Zp(e, t)
}

function Zp(e, t) {
  return Zp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Zp(e, t)
}

function St(e, t, r) {
  return t = AS(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function AS(e) {
  var t = b$(e, "string");
  return bi(t) == "symbol" ? t : t + ""
}

function b$(e, t) {
  if (bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var O$ = function(t) {
    var r = t.data,
      n = t.startIndex,
      i = t.endIndex,
      o = t.x,
      a = t.width,
      u = t.travellerWidth;
    if (!r || !r.length) return {};
    var s = r.length,
      l = Pr().domain((0, _S.default)(0, s)).range([o, o + a - u]),
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
  OS = function(t) {
    return t.changedTouches && !!t.changedTouches.length
  },
  hn = function(e) {
    function t(r) {
      var n;
      return d$(this, t), n = h$(this, t, [r]), St(n, "handleDrag", function(i) {
        n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(i) : n.state.isSlideMoving && n.handleSlideDrag(i)
      }), St(n, "handleTouchMove", function(i) {
        i.changedTouches != null && i.changedTouches.length > 0 && n.handleDrag(i.changedTouches[0])
      }), St(n, "handleDragEnd", function() {
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
      }), St(n, "handleLeaveWrapper", function() {
        (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut))
      }), St(n, "handleEnterSlideOrTraveller", function() {
        n.setState({
          isTextActive: !0
        })
      }), St(n, "handleLeaveSlideOrTraveller", function() {
        n.setState({
          isTextActive: !1
        })
      }), St(n, "handleSlideDragStart", function(i) {
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
    return g$(t, e), m$(t, [{
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
          d = t.getIndexInRange(a, c),
          y = t.getIndexInRange(a, p);
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
          s = Ve(o[n], u, n);
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
        this.setState(St(St({}, a, l + w), "brushMoveStartX", n.pageX), function() {
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
            i === "startX" && d >= l || i === "endX" && d <= s || this.setState(St({}, i, d), function() {
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
        return Je.createElement("rect", {
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
          c = w$.only(l);
        return c ? Je.cloneElement(c, {
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
          w = Yp(Yp({}, ue(this.props, !1)), {}, {
            x,
            y: l,
            width: f,
            height: c
          }),
          S = d || "Min value: ".concat((o = y[m]) === null || o === void 0 ? void 0 : o.name, ", Max value: ").concat((a = y[v]) === null || a === void 0 ? void 0 : a.name);
        return Je.createElement(be, {
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
        }, t.renderTraveller(p, w))
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
        return Je.createElement("rect", {
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
        return Je.createElement(be, {
          className: "recharts-brush-texts"
        }, Je.createElement(Xr, Ws({
          textAnchor: "end",
          verticalAnchor: "middle",
          x: Math.min(c, p) - d,
          y: a + u / 2
        }, y), this.getTextOfTick(i)), Je.createElement(Xr, Ws({
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
        var S = ae("recharts-brush", o),
          P = Je.Children.count(a) === 1,
          h = bS("userSelect", "none");
        return Je.createElement(be, {
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
        return Je.createElement(Je.Fragment, null, Je.createElement("rect", {
          x: i,
          y: o,
          width: a,
          height: u,
          fill: s,
          stroke: "none"
        }), Je.createElement("line", {
          x1: i + 1,
          y1: l,
          x2: i + a - 1,
          y2: l,
          fill: "none",
          stroke: "#fff"
        }), Je.createElement("line", {
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
        return Je.isValidElement(n) ? o = Je.cloneElement(n, i) : (0, Jp.default)(n) ? o = n(i) : o = t.renderDefaultTraveller(i), o
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
        }, o && o.length ? O$({
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
  }(x$);
St(hn, "displayName", "Brush");
St(hn, "defaultProps", {
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
var CA = te(Le()),
  IA = te(jS());
import Ai from "./react-shim-eraudit.js";
var ht = function(t, r) {
  var n = t.alwaysShow,
    i = t.ifOverflow;
  return n && (i = "extendDomain"), i === r
};
var JS = te(DS()),
  QS = te(Qp());
import Lt, {
  PureComponent as l6
} from "./react-shim-eraudit.js";
var KS = te(No()),
  VS = te(Tt());
import Z$ from "./react-shim-eraudit.js";
var H$ = ["x", "y"];

function ga(e) {
  "@babel/helpers - typeof";
  return ga = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ga(e)
}

function ed() {
  return ed = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ed.apply(this, arguments)
}

function WS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function va(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? WS(Object(r), !0).forEach(function(n) {
      G$(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : WS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function G$(e, t, r) {
  return t = K$(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function K$(e) {
  var t = V$(e, "string");
  return ga(t) == "symbol" ? t : t + ""
}

function V$(e, t) {
  if (ga(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ga(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function X$(e, t) {
  if (e == null) return {};
  var r = Y$(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function Y$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function J$(e, t) {
  var r = e.x,
    n = e.y,
    i = X$(e, H$),
    o = "".concat(r),
    a = parseInt(o, 10),
    u = "".concat(n),
    s = parseInt(u, 10),
    l = "".concat(t.height || i.height),
    f = parseInt(l, 10),
    c = "".concat(t.width || i.width),
    p = parseInt(c, 10);
  return va(va(va(va(va({}, t), i), a ? {
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

function td(e) {
  return Z$.createElement(uS, ed({
    shapeType: "rectangle",
    propTransformer: J$,
    activeClassName: "recharts-active-bar"
  }, e))
}
var zS = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, i) {
    if (typeof t == "number") return t;
    var o = X(n) || Eh(n);
    return o ? t(n, i) : (o || Ut(!1), r)
  }
};
var Q$ = ["value", "background"],
  US;

function xi(e) {
  "@babel/helpers - typeof";
  return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, xi(e)
}

function e6(e, t) {
  if (e == null) return {};
  var r = t6(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function t6(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Fs() {
  return Fs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Fs.apply(this, arguments)
}

function FS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? FS(Object(r), !0).forEach(function(n) {
      Dr(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : FS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function r6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function $S(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, GS(n.key), n)
  }
}

function n6(e, t, r) {
  return t && $S(e.prototype, t), r && $S(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function i6(e, t, r) {
  return t = $s(t), o6(e, HS() ? Reflect.construct(t, r || [], $s(e).constructor) : t.apply(e, r))
}

function o6(e, t) {
  if (t && (xi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return a6(e)
}

function a6(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function HS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (HS = function() {
    return !!e
  })()
}

function $s(e) {
  return $s = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, $s(e)
}

function u6(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && rd(e, t)
}

function rd(e, t) {
  return rd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, rd(e, t)
}

function Dr(e, t, r) {
  return t = GS(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function GS(e) {
  var t = s6(e, "string");
  return xi(t) == "symbol" ? t : t + ""
}

function s6(e, t) {
  if (xi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (xi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Gt = function(e) {
  function t() {
    var r;
    r6(this, t);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = i6(this, t, [].concat(i)), Dr(r, "state", {
      isAnimationFinished: !1
    }), Dr(r, "id", Qt("recharts-bar-")), Dr(r, "handleAnimationEnd", function() {
      var a = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), a && a()
    }), Dr(r, "handleAnimationStart", function() {
      var a = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), a && a()
    }), r
  }
  return u6(t, e), n6(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var i = this,
        o = this.props,
        a = o.shape,
        u = o.dataKey,
        s = o.activeIndex,
        l = o.activeBar,
        f = ue(this.props, !1);
      return n && n.map(function(c, p) {
        var d = p === s,
          y = d ? l : a,
          m = qe(qe(qe({}, f), c), {}, {
            isActive: d,
            option: y,
            index: p,
            dataKey: u,
            onAnimationStart: i.handleAnimationStart,
            onAnimationEnd: i.handleAnimationEnd
          });
        return Lt.createElement(be, Fs({
          className: "recharts-bar-rectangle"
        }, Fr(i.props, c, p), {
          key: "rectangle-".concat(c?.x, "-").concat(c?.y, "-").concat(c?.value, "-").concat(p)
        }), Lt.createElement(td, m))
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
      return Lt.createElement(lr, {
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
              var S = vt(w.x, v.x),
                P = vt(w.y, v.y),
                h = vt(w.width, v.width),
                g = vt(w.height, v.height);
              return qe(qe({}, v), {}, {
                x: S(y),
                y: P(y),
                width: h(y),
                height: g(y)
              })
            }
            if (a === "horizontal") {
              var _ = vt(0, v.height),
                C = _(y);
              return qe(qe({}, v), {}, {
                y: v.y + v.height - C,
                height: C
              })
            }
            var k = vt(0, v.width),
              B = k(y);
            return qe(qe({}, v), {}, {
              width: B
            })
          });
        return Lt.createElement(be, null, n.renderRectanglesStatically(m))
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
        s = ue(this.props.background, !1);
      return o.map(function(l, f) {
        var c = l.value,
          p = l.background,
          d = e6(l, Q$);
        if (!p) return null;
        var y = qe(qe(qe(qe(qe({}, d), {}, {
          fill: "#eee"
        }, p), s), Fr(n.props, l, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: a,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return Lt.createElement(td, Fs({
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
        c = We(f, Ir);
      if (!c) return null;
      var p = l === "vertical" ? a[0].height / 2 : a[0].width / 2,
        d = function(v, x) {
          var w = Array.isArray(v.value) ? v.value[1] : v.value;
          return {
            x: v.x,
            y: v.y,
            value: w,
            errorVal: Ve(v, x)
          }
        },
        y = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return Lt.createElement(be, y, c.map(function(m) {
        return Lt.cloneElement(m, {
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
        x = ae("recharts-bar", a),
        w = u && u.allowDataOverflow,
        S = s && s.allowDataOverflow,
        P = w || S,
        h = (0, VS.default)(m) ? this.id : m;
      return Lt.createElement(be, {
        className: x
      }, w || S ? Lt.createElement("defs", null, Lt.createElement("clipPath", {
        id: "clipPath-".concat(h)
      }, Lt.createElement("rect", {
        x: w ? l : l - c / 2,
        y: S ? f : f - p / 2,
        width: w ? c : c * 2,
        height: S ? p : p * 2
      }))) : null, Lt.createElement(be, {
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
}(l6);
US = Gt;
Dr(Gt, "displayName", "Bar");
Dr(Gt, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !st.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
Dr(Gt, "getComposedData", function(e) {
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
    d = P1(n, r);
  if (!d) return null;
  var y = t.layout,
    m = r.type.defaultProps,
    v = m !== void 0 ? qe(qe({}, m), r.props) : r.props,
    x = v.dataKey,
    w = v.children,
    S = v.minPointSize,
    P = y === "horizontal" ? a : o,
    h = l ? P.scale.domain() : null,
    g = M1({
      numericAxis: P
    }),
    _ = We(w, yf),
    C = c.map(function(k, B) {
      var W, R, H, F, z, b;
      l ? W = T1(l[f + B], h) : (W = Ve(k, x), Array.isArray(W) || (W = [g, W]));
      var O = zS(S, US.defaultProps.minPointSize)(W[1], B);
      if (y === "horizontal") {
        var T, A = [a.scale(W[0]), a.scale(W[1])],
          j = A[0],
          E = A[1];
        R = wp({
          axis: o,
          ticks: u,
          bandSize: i,
          offset: d.offset,
          entry: k,
          index: B
        }), H = (T = E ?? j) !== null && T !== void 0 ? T : void 0, F = d.size;
        var D = j - E;
        if (z = Number.isNaN(D) ? 0 : D, b = {
            x: R,
            y: a.y,
            width: F,
            height: a.height
          }, Math.abs(O) > 0 && Math.abs(z) < Math.abs(O)) {
          var L = Ye(z || O) * (Math.abs(O) - Math.abs(z));
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
          var ne = Ye(F || O) * (Math.abs(O) - Math.abs(F));
          F += ne
        }
      }
      return qe(qe(qe({}, k), {}, {
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
  return qe({
    data: C,
    layout: y
  }, p)
});

function ba(e) {
  "@babel/helpers - typeof";
  return ba = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ba(e)
}

function c6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function XS(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, ZS(n.key), n)
  }
}

function f6(e, t, r) {
  return t && XS(e.prototype, t), r && XS(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function YS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Kt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? YS(Object(r), !0).forEach(function(n) {
      Us(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : YS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Us(e, t, r) {
  return t = ZS(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function ZS(e) {
  var t = p6(e, "string");
  return ba(t) == "symbol" ? t : t + ""
}

function p6(e, t) {
  if (ba(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ba(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Hs = function(t, r, n, i, o) {
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
      p = !!Ze(l, Gt);
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
            var O = zt(t.barCategoryGap, z * b),
              T = z * b / 2;
            _ = T - O - (T - O) / b * O
          }
        }
      }
      i === "xAxis" ? C = [n.left + (S.left || 0) + (_ || 0), n.left + n.width - (S.right || 0) - (_ || 0)] : i === "yAxis" ? C = s === "horizontal" ? [n.top + n.height - (S.bottom || 0), n.top + (S.top || 0)] : [n.top + (S.top || 0) + (_ || 0), n.top + n.height - (S.bottom || 0) - (_ || 0)] : C = m.range, h && (C = [C[1], C[0]]);
      var A = A1(m, o, p),
        j = A.scale,
        E = A.realScaleType;
      j.domain(x).range(C), _1(j);
      var D = j1(j, Kt(Kt({}, m), {}, {
        realScaleType: E
      }));
      i === "xAxis" ? (W = v === "top" && !P || v === "bottom" && P, k = n.left, B = c[g] - W * m.height) : i === "yAxis" && (W = v === "left" && !P || v === "right" && P, k = c[g] - W * m.width, B = n.top);
      var L = Kt(Kt(Kt({}, m), D), {}, {
        realScaleType: E,
        x: k,
        y: B,
        scale: j,
        width: i === "xAxis" ? n.width : m.width,
        height: i === "yAxis" ? n.height : m.height
      });
      return L.bandSize = pi(L, D), !m.hide && i === "xAxis" ? c[g] += (W ? -1 : 1) * L.height : m.hide || (c[g] += (W ? -1 : 1) * L.width), Kt(Kt({}, d), {}, Us({}, y, L))
    }, {})
  },
  nd = function(t, r) {
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
  eA = function(t) {
    var r = t.x1,
      n = t.y1,
      i = t.x2,
      o = t.y2;
    return nd({
      x: r,
      y: n
    }, {
      x: i,
      y: o
    })
  },
  tA = function() {
    function e(t) {
      c6(this, e), this.scale = t
    }
    return f6(e, [{
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
Us(tA, "EPS", 1e-4);
var wi = function(t) {
  var r = Object.keys(t).reduce(function(n, i) {
    return Kt(Kt({}, n), {}, Us({}, i, tA.create(t[i])))
  }, {});
  return Kt(Kt({}, r), {}, {
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

function d6(e) {
  return (e % 180 + 180) % 180
}
var rA = function(t) {
  var r = t.width,
    n = t.height,
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    o = d6(i),
    a = o * Math.PI / 180,
    u = Math.atan(n / r),
    s = a > u && a < Math.PI - u ? n / Math.sin(a) : r / Math.cos(a);
  return Math.abs(s)
};
import yn, {
  createContext as vn,
  useContext as wr
} from "./react-shim-eraudit.js";
var dA = te(cA()),
  mA = te(Qp());
var fA = te(Tl()),
  pA = (0, fA.default)(function(e) {
    return {
      x: e.left,
      y: e.top,
      width: e.width,
      height: e.height
    }
  }, function(e) {
    return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("")
  });
var id = vn(void 0),
  od = vn(void 0),
  hA = vn(void 0),
  yA = vn({}),
  vA = vn(void 0),
  gA = vn(0),
  bA = vn(0),
  ad = function(t) {
    var r = t.state,
      n = r.xAxisMap,
      i = r.yAxisMap,
      o = r.offset,
      a = t.clipPathId,
      u = t.children,
      s = t.width,
      l = t.height,
      f = pA(o);
    return yn.createElement(id.Provider, {
      value: n
    }, yn.createElement(od.Provider, {
      value: i
    }, yn.createElement(yA.Provider, {
      value: o
    }, yn.createElement(hA.Provider, {
      value: f
    }, yn.createElement(vA.Provider, {
      value: a
    }, yn.createElement(gA.Provider, {
      value: l
    }, yn.createElement(bA.Provider, {
      value: s
    }, u)))))))
  },
  xA = function() {
    return wr(vA)
  };
var Gs = function(t) {
    var r = wr(id);
    r == null && Ut(!1);
    var n = r[t];
    return n == null && Ut(!1), n
  },
  wA = function() {
    var t = wr(id);
    return er(t)
  };
var OA = function() {
    var t = wr(od),
      r = (0, dA.default)(t, function(n) {
        return (0, mA.default)(n.domain, Number.isFinite)
      });
    return r || er(t)
  },
  Ks = function(t) {
    var r = wr(od);
    r == null && Ut(!1);
    var n = r[t];
    return n == null && Ut(!1), n
  },
  SA = function() {
    var t = wr(hA);
    return t
  },
  AA = function() {
    return wr(yA)
  },
  Oi = function() {
    return wr(bA)
  },
  Si = function() {
    return wr(gA)
  };

function _i(e) {
  "@babel/helpers - typeof";
  return _i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, _i(e)
}

function E6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _A(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, MA(n.key), n)
  }
}

function j6(e, t, r) {
  return t && _A(e.prototype, t), r && _A(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function M6(e, t, r) {
  return t = Vs(t), C6(e, jA() ? Reflect.construct(t, r || [], Vs(e).constructor) : t.apply(e, r))
}

function C6(e, t) {
  if (t && (_i(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return I6(e)
}

function I6(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function jA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (jA = function() {
    return !!e
  })()
}

function Vs(e) {
  return Vs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Vs(e)
}

function k6(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && ud(e, t)
}

function ud(e, t) {
  return ud = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, ud(e, t)
}

function PA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function TA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? PA(Object(r), !0).forEach(function(n) {
      ld(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : PA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function ld(e, t, r) {
  return t = MA(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function MA(e) {
  var t = D6(e, "string");
  return _i(t) == "symbol" ? t : t + ""
}

function D6(e, t) {
  if (_i(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (_i(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function N6(e, t) {
  return q6(e) || B6(e, t) || L6(e, t) || R6()
}

function R6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function L6(e, t) {
  if (e) {
    if (typeof e == "string") return EA(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return EA(e, t)
  }
}

function EA(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function B6(e, t) {
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

function q6(e) {
  if (Array.isArray(e)) return e
}

function sd() {
  return sd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, sd.apply(this, arguments)
}
var W6 = function(t, r) {
    var n;
    return Ai.isValidElement(t) ? n = Ai.cloneElement(t, r) : (0, CA.default)(t) ? n = t(r) : n = Ai.createElement("line", sd({}, r, {
      className: "recharts-reference-line-line"
    })), n
  },
  z6 = function(t, r, n, i, o, a, u, s, l) {
    var f = o.x,
      c = o.y,
      p = o.width,
      d = o.height;
    if (n) {
      var y = l.y,
        m = t.y.apply(y, {
          position: a
        });
      if (ht(l, "discard") && !t.y.isInRange(m)) return null;
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
        w = t.x.apply(x, {
          position: a
        });
      if (ht(l, "discard") && !t.x.isInRange(w)) return null;
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
          return t.apply(g, {
            position: a
          })
        });
      return ht(l, "discard") && (0, IA.default)(h, function(g) {
        return !t.isInRange(g)
      }) ? null : h
    }
    return null
  };

function F6(e) {
  var t = e.x,
    r = e.y,
    n = e.segment,
    i = e.xAxisId,
    o = e.yAxisId,
    a = e.shape,
    u = e.className,
    s = e.alwaysShow,
    l = xA(),
    f = Gs(i),
    c = Ks(o),
    p = SA();
  if (!l || !p) return null;
  ut(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var d = wi({
      x: f.scale,
      y: c.scale
    }),
    y = je(t),
    m = je(r),
    v = n && n.length === 2,
    x = z6(d, y, m, v, p, e.position, f.orientation, c.orientation, e);
  if (!x) return null;
  var w = N6(x, 2),
    S = w[0],
    P = S.x,
    h = S.y,
    g = w[1],
    _ = g.x,
    C = g.y,
    k = ht(e, "hidden") ? "url(#".concat(l, ")") : void 0,
    B = TA(TA({
      clipPath: k
    }, ue(e, !0)), {}, {
      x1: P,
      y1: h,
      x2: _,
      y2: C
    });
  return Ai.createElement(be, {
    className: ae("recharts-reference-line", u)
  }, W6(a, B), Be.renderCallByParent(e, eA({
    x1: P,
    y1: h,
    x2: _,
    y2: C
  })))
}
var Xs = function(e) {
  function t() {
    return E6(this, t), M6(this, t, arguments)
  }
  return k6(t, e), j6(t, [{
    key: "render",
    value: function() {
      return Ai.createElement(F6, this.props)
    }
  }])
}(Ai.Component);
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
var BA = te(Le());
import xa from "./react-shim-eraudit.js";

function cd() {
  return cd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, cd.apply(this, arguments)
}

function Pi(e) {
  "@babel/helpers - typeof";
  return Pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Pi(e)
}

function kA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function DA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? kA(Object(r), !0).forEach(function(n) {
      Zs(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : kA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function $6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function NA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, LA(n.key), n)
  }
}

function U6(e, t, r) {
  return t && NA(e.prototype, t), r && NA(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function H6(e, t, r) {
  return t = Ys(t), G6(e, RA() ? Reflect.construct(t, r || [], Ys(e).constructor) : t.apply(e, r))
}

function G6(e, t) {
  if (t && (Pi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return K6(e)
}

function K6(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function RA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (RA = function() {
    return !!e
  })()
}

function Ys(e) {
  return Ys = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ys(e)
}

function V6(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && fd(e, t)
}

function fd(e, t) {
  return fd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, fd(e, t)
}

function Zs(e, t, r) {
  return t = LA(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function LA(e) {
  var t = X6(e, "string");
  return Pi(t) == "symbol" ? t : t + ""
}

function X6(e, t) {
  if (Pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Y6 = function(t) {
    var r = t.x,
      n = t.y,
      i = t.xAxis,
      o = t.yAxis,
      a = wi({
        x: i.scale,
        y: o.scale
      }),
      u = a.apply({
        x: r,
        y: n
      }, {
        bandAware: !0
      });
    return ht(t, "discard") && !a.isInRange(u) ? null : u
  },
  wa = function(e) {
    function t() {
      return $6(this, t), H6(this, t, arguments)
    }
    return V6(t, e), U6(t, [{
      key: "render",
      value: function() {
        var n = this.props,
          i = n.x,
          o = n.y,
          a = n.r,
          u = n.alwaysShow,
          s = n.clipPathId,
          l = je(i),
          f = je(o);
        if (ut(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !l || !f) return null;
        var c = Y6(this.props);
        if (!c) return null;
        var p = c.x,
          d = c.y,
          y = this.props,
          m = y.shape,
          v = y.className,
          x = ht(this.props, "hidden") ? "url(#".concat(s, ")") : void 0,
          w = DA(DA({
            clipPath: x
          }, ue(this.props, !0)), {}, {
            cx: p,
            cy: d
          });
        return xa.createElement(be, {
          className: ae("recharts-reference-dot", v)
        }, t.renderDot(m, w), Be.renderCallByParent(this.props, {
          x: p - a,
          y: d - a,
          width: 2 * a,
          height: 2 * a
        }))
      }
    }])
  }(xa.Component);
Zs(wa, "displayName", "ReferenceDot");
Zs(wa, "defaultProps", {
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
Zs(wa, "renderDot", function(e, t) {
  var r;
  return xa.isValidElement(e) ? r = xa.cloneElement(e, t) : (0, BA.default)(e) ? r = e(t) : r = xa.createElement(vi, cd({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r
});
var UA = te(Le());
import Oa from "./react-shim-eraudit.js";

function pd() {
  return pd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, pd.apply(this, arguments)
}

function Ti(e) {
  "@babel/helpers - typeof";
  return Ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ti(e)
}

function qA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function WA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qA(Object(r), !0).forEach(function(n) {
      Qs(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Z6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function zA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, $A(n.key), n)
  }
}

function J6(e, t, r) {
  return t && zA(e.prototype, t), r && zA(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function Q6(e, t, r) {
  return t = Js(t), eU(e, FA() ? Reflect.construct(t, r || [], Js(e).constructor) : t.apply(e, r))
}

function eU(e, t) {
  if (t && (Ti(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return tU(e)
}

function tU(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function FA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (FA = function() {
    return !!e
  })()
}

function Js(e) {
  return Js = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Js(e)
}

function rU(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && dd(e, t)
}

function dd(e, t) {
  return dd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, dd(e, t)
}

function Qs(e, t, r) {
  return t = $A(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function $A(e) {
  var t = nU(e, "string");
  return Ti(t) == "symbol" ? t : t + ""
}

function nU(e, t) {
  if (Ti(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var iU = function(t, r, n, i, o) {
    var a = o.x1,
      u = o.x2,
      s = o.y1,
      l = o.y2,
      f = o.xAxis,
      c = o.yAxis;
    if (!f || !c) return null;
    var p = wi({
        x: f.scale,
        y: c.scale
      }),
      d = {
        x: t ? p.x.apply(a, {
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
    return ht(o, "discard") && (!p.isInRange(d) || !p.isInRange(y)) ? null : nd(d, y)
  },
  Sa = function(e) {
    function t() {
      return Z6(this, t), Q6(this, t, arguments)
    }
    return rU(t, e), J6(t, [{
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
        ut(l === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
        var c = je(i),
          p = je(o),
          d = je(a),
          y = je(u),
          m = this.props.shape;
        if (!c && !p && !d && !y && !m) return null;
        var v = iU(c, p, d, y, this.props);
        if (!v && !m) return null;
        var x = ht(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
        return Oa.createElement(be, {
          className: ae("recharts-reference-area", s)
        }, t.renderRect(m, WA(WA({
          clipPath: x
        }, ue(this.props, !0)), v)), Be.renderCallByParent(this.props, v))
      }
    }])
  }(Oa.Component);
Qs(Sa, "displayName", "ReferenceArea");
Qs(Sa, "defaultProps", {
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
Qs(Sa, "renderRect", function(e, t) {
  var r;
  return Oa.isValidElement(e) ? r = Oa.cloneElement(e, t) : (0, UA.default)(e) ? r = e(t) : r = Oa.createElement(yi, pd({}, t, {
    className: "recharts-reference-area-rect"
  })), r
});
var tl = te(Le()),
  yd = te(Wr());
import Nr, {
  Component as wU
} from "./react-shim-eraudit.js";
var YA = te(Le());

function el(e, t, r) {
  if (t < 1) return [];
  if (t === 1 && r === void 0) return e;
  for (var n = [], i = 0; i < e.length; i += t)
    if (r === void 0 || r(e[i]) === !0) n.push(e[i]);
    else return;
  return n
}

function HA(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return rA(n, r)
}

function GA(e, t, r) {
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

function Ei(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i) return !1;
  var o = r();
  return e * (t - e * o / 2 - n) >= 0 && e * (t + e * o / 2 - i) <= 0
}

function KA(e, t) {
  return el(e, t + 1)
}

function VA(e, t, r, n, i) {
  for (var o = (n || []).slice(), a = t.start, u = t.end, s = 0, l = 1, f = a, c = function() {
      var y = n?.[s];
      if (y === void 0) return {
        v: el(n, l)
      };
      var m = s,
        v, x = function() {
          return v === void 0 && (v = r(y, m)), v
        },
        w = y.coordinate,
        S = s === 0 || Ei(e, w, x, f, u);
      S || (s = 0, f = a, l += 1), S && (f = w + e * (x() / 2 + i), s += l)
    }, p; l <= o.length;)
    if (p = c(), p) return p.v;
  return []
}

function Aa(e) {
  "@babel/helpers - typeof";
  return Aa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Aa(e)
}

function XA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? XA(Object(r), !0).forEach(function(n) {
      oU(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : XA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function oU(e, t, r) {
  return t = aU(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function aU(e) {
  var t = uU(e, "string");
  return Aa(t) == "symbol" ? t : t + ""
}

function uU(e, t) {
  if (Aa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Aa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function sU(e, t, r, n, i) {
  for (var o = (n || []).slice(), a = o.length, u = t.start, s = t.end, l = function(p) {
      var d = o[p],
        y, m = function() {
          return y === void 0 && (y = r(d, p)), y
        };
      if (p === a - 1) {
        var v = e * (d.coordinate + e * m() / 2 - s);
        o[p] = d = Qe(Qe({}, d), {}, {
          tickCoord: v > 0 ? d.coordinate - v * e : d.coordinate
        })
      } else o[p] = d = Qe(Qe({}, d), {}, {
        tickCoord: d.coordinate
      });
      var x = Ei(e, d.tickCoord, m, u, s);
      x && (s = d.tickCoord - e * (m() / 2 + i), o[p] = Qe(Qe({}, d), {}, {
        isShow: !0
      }))
    }, f = a - 1; f >= 0; f--) l(f);
  return o
}

function lU(e, t, r, n, i, o) {
  var a = (n || []).slice(),
    u = a.length,
    s = t.start,
    l = t.end;
  if (o) {
    var f = n[u - 1],
      c = r(f, u - 1),
      p = e * (f.coordinate + e * c / 2 - l);
    a[u - 1] = f = Qe(Qe({}, f), {}, {
      tickCoord: p > 0 ? f.coordinate - p * e : f.coordinate
    });
    var d = Ei(e, f.tickCoord, function() {
      return c
    }, s, l);
    d && (l = f.tickCoord - e * (c / 2 + i), a[u - 1] = Qe(Qe({}, f), {}, {
      isShow: !0
    }))
  }
  for (var y = o ? u - 1 : u, m = function(w) {
      var S = a[w],
        P, h = function() {
          return P === void 0 && (P = r(S, w)), P
        };
      if (w === 0) {
        var g = e * (S.coordinate - e * h() / 2 - s);
        a[w] = S = Qe(Qe({}, S), {}, {
          tickCoord: g < 0 ? S.coordinate - g * e : S.coordinate
        })
      } else a[w] = S = Qe(Qe({}, S), {}, {
        tickCoord: S.coordinate
      });
      var _ = Ei(e, S.tickCoord, h, s, l);
      _ && (s = S.tickCoord + e * (h() / 2 + i), a[w] = Qe(Qe({}, S), {}, {
        isShow: !0
      }))
    }, v = 0; v < y; v++) m(v);
  return a
}

function _a(e, t, r) {
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
  if (X(s) || st.isSsr) return KA(i, typeof s == "number" && X(s) ? s : 0);
  var p = [],
    d = u === "top" || u === "bottom" ? "width" : "height",
    y = f && d === "width" ? Vr(f, {
      fontSize: t,
      letterSpacing: r
    }) : {
      width: 0,
      height: 0
    },
    m = function(S, P) {
      var h = (0, YA.default)(l) ? l(S.value, P) : S.value;
      return d === "width" ? HA(Vr(h, {
        fontSize: t,
        letterSpacing: r
      }), y, c) : Vr(h, {
        fontSize: t,
        letterSpacing: r
      })[d]
    },
    v = i.length >= 2 ? Ye(i[1].coordinate - i[0].coordinate) : 1,
    x = GA(o, v, d);
  return s === "equidistantPreserveStart" ? VA(v, x, m, i, a) : (s === "preserveStart" || s === "preserveStartEnd" ? p = lU(v, x, m, i, a, s === "preserveStartEnd") : p = sU(v, x, m, i, a), p.filter(function(w) {
    return w.isShow
  }))
}
var cU = ["viewBox"],
  fU = ["viewBox"],
  pU = ["ticks"];

function Mi(e) {
  "@babel/helpers - typeof";
  return Mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Mi(e)
}

function ji() {
  return ji = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ji.apply(this, arguments)
}

function ZA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function $e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ZA(Object(r), !0).forEach(function(n) {
      vd(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ZA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function md(e, t) {
  if (e == null) return {};
  var r = dU(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function dU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function mU(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function JA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, e_(n.key), n)
  }
}

function hU(e, t, r) {
  return t && JA(e.prototype, t), r && JA(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function yU(e, t, r) {
  return t = rl(t), vU(e, QA() ? Reflect.construct(t, r || [], rl(e).constructor) : t.apply(e, r))
}

function vU(e, t) {
  if (t && (Mi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return gU(e)
}

function gU(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function QA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (QA = function() {
    return !!e
  })()
}

function rl(e) {
  return rl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, rl(e)
}

function bU(e, t) {
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

function vd(e, t, r) {
  return t = e_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function e_(e) {
  var t = xU(e, "string");
  return Mi(t) == "symbol" ? t : t + ""
}

function xU(e, t) {
  if (Mi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Mi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Or = function(e) {
  function t(r) {
    var n;
    return mU(this, t), n = yU(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n
  }
  return bU(t, e), hU(t, [{
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
        c = $e($e($e({}, ue(this.props, !1)), ue(f, !1)), {}, {
          fill: "none"
        });
      if (s === "top" || s === "bottom") {
        var p = +(s === "top" && !l || s === "bottom" && l);
        c = $e($e({}, c), {}, {
          x1: i,
          y1: o + p * u,
          x2: i + a,
          y2: o + p * u
        })
      } else {
        var d = +(s === "left" && !l || s === "right" && l);
        c = $e($e({}, c), {}, {
          x1: i + d * a,
          y1: o,
          x2: i + d * a,
          y2: o + u
        })
      }
      return Nr.createElement("line", ji({}, c, {
        className: ae("recharts-cartesian-axis-line", (0, yd.default)(f, "className"))
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
        d = _a($e($e({}, this.props), {}, {
          ticks: n
        }), i, o),
        y = this.getTickTextAnchor(),
        m = this.getTickVerticalAnchor(),
        v = ue(this.props, !1),
        x = ue(f, !1),
        w = $e($e({}, v), {}, {
          fill: "none"
        }, ue(s, !1)),
        S = d.map(function(P, h) {
          var g = a.getTickLineCoord(P),
            _ = g.line,
            C = g.tick,
            k = $e($e($e($e({
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
          return Nr.createElement(be, ji({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(P.value, "-").concat(P.coordinate, "-").concat(P.tickCoord)
          }, Fr(a.props, P, h)), s && Nr.createElement("line", ji({}, w, _, {
            className: ae("recharts-cartesian-axis-tick-line", (0, yd.default)(s, "className"))
          })), f && t.renderTickItem(f, k, "".concat((0, tl.default)(c) ? c(P.value, h) : P.value).concat(p || "")))
        });
      return Nr.createElement("g", {
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
      return (0, tl.default)(s) && (y = p && p.length > 0 ? s(this.props) : s(d)), a <= 0 || u <= 0 || !y || !y.length ? null : Nr.createElement(be, {
        className: ae("recharts-cartesian-axis", l),
        ref: function(v) {
          n.layerReference = v
        }
      }, o && this.renderAxisLine(), this.renderTicks(y, this.state.fontSize, this.state.letterSpacing), Be.renderCallByParent(this.props))
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, o) {
      var a, u = ae(i.className, "recharts-cartesian-axis-tick-value");
      return Nr.isValidElement(n) ? a = Nr.cloneElement(n, $e($e({}, i), {}, {
        className: u
      })) : (0, tl.default)(n) ? a = n($e($e({}, i), {}, {
        className: u
      })) : a = Nr.createElement(Xr, ji({}, i, {
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
var nl = te(Le());
import tt from "./react-shim-eraudit.js";
var OU = ["x1", "y1", "x2", "y2", "key"],
  SU = ["offset"];

function bn(e) {
  "@babel/helpers - typeof";
  return bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, bn(e)
}

function t_(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function et(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? t_(Object(r), !0).forEach(function(n) {
      AU(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : t_(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function AU(e, t, r) {
  return t = _U(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function _U(e) {
  var t = PU(e, "string");
  return bn(t) == "symbol" ? t : t + ""
}

function PU(e, t) {
  if (bn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (bn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
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

function r_(e, t) {
  if (e == null) return {};
  var r = TU(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function TU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var EU = function(t) {
  var r = t.fill;
  if (!r || r === "none") return null;
  var n = t.fillOpacity,
    i = t.x,
    o = t.y,
    a = t.width,
    u = t.height,
    s = t.ry;
  return tt.createElement("rect", {
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

function n_(e, t) {
  var r;
  if (tt.isValidElement(e)) r = tt.cloneElement(e, t);
  else if ((0, nl.default)(e)) r = e(t);
  else {
    var n = t.x1,
      i = t.y1,
      o = t.x2,
      a = t.y2,
      u = t.key,
      s = r_(t, OU),
      l = ue(s, !1),
      f = l.offset,
      c = r_(l, SU);
    r = tt.createElement("line", gn({}, c, {
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

function jU(e) {
  var t = e.x,
    r = e.width,
    n = e.horizontal,
    i = n === void 0 ? !0 : n,
    o = e.horizontalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = et(et({}, e), {}, {
      x1: t,
      y1: u,
      x2: t + r,
      y2: u,
      key: "line-".concat(s),
      index: s
    });
    return n_(i, l)
  });
  return tt.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, a)
}

function MU(e) {
  var t = e.y,
    r = e.height,
    n = e.vertical,
    i = n === void 0 ? !0 : n,
    o = e.verticalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = et(et({}, e), {}, {
      x1: u,
      y1: t,
      x2: u,
      y2: t + r,
      key: "line-".concat(s),
      index: s
    });
    return n_(i, l)
  });
  return tt.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, a)
}

function CU(e) {
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
  }).sort(function(p, d) {
    return p - d
  });
  i !== f[0] && f.unshift(0);
  var c = f.map(function(p, d) {
    var y = !f[d + 1],
      m = y ? i + a - p : f[d + 1] - p;
    if (m <= 0) return null;
    var v = d % t.length;
    return tt.createElement("rect", {
      key: "react-".concat(d),
      y: p,
      x: n,
      height: m,
      width: o,
      stroke: "none",
      fill: t[v],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    })
  });
  return tt.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, c)
}

function IU(e) {
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
  }).sort(function(p, d) {
    return p - d
  });
  o !== f[0] && f.unshift(0);
  var c = f.map(function(p, d) {
    var y = !f[d + 1],
      m = y ? o + u - p : f[d + 1] - p;
    if (m <= 0) return null;
    var v = d % n.length;
    return tt.createElement("rect", {
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
  return tt.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, c)
}
var kU = function(t, r) {
    var n = t.xAxis,
      i = t.width,
      o = t.height,
      a = t.offset;
    return bp(_a(et(et(et({}, Or.defaultProps), n), {}, {
      ticks: Ot(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.left, a.left + a.width, r)
  },
  DU = function(t, r) {
    var n = t.yAxis,
      i = t.width,
      o = t.height,
      a = t.offset;
    return bp(_a(et(et(et({}, Or.defaultProps), n), {}, {
      ticks: Ot(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.top, a.top + a.height, r)
  },
  Ci = {
    horizontal: !0,
    vertical: !0,
    horizontalPoints: [],
    verticalPoints: [],
    stroke: "#ccc",
    fill: "none",
    verticalFill: [],
    horizontalFill: []
  };

function Pa(e) {
  var t, r, n, i, o, a, u = Oi(),
    s = Si(),
    l = AA(),
    f = et(et({}, e), {}, {
      stroke: (t = e.stroke) !== null && t !== void 0 ? t : Ci.stroke,
      fill: (r = e.fill) !== null && r !== void 0 ? r : Ci.fill,
      horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : Ci.horizontal,
      horizontalFill: (i = e.horizontalFill) !== null && i !== void 0 ? i : Ci.horizontalFill,
      vertical: (o = e.vertical) !== null && o !== void 0 ? o : Ci.vertical,
      verticalFill: (a = e.verticalFill) !== null && a !== void 0 ? a : Ci.verticalFill,
      x: X(e.x) ? e.x : l.left,
      y: X(e.y) ? e.y : l.top,
      width: X(e.width) ? e.width : l.width,
      height: X(e.height) ? e.height : l.height
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
        yAxis: S ? et(et({}, S), {}, {
          ticks: C ? v : S.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, C ? !0 : m);
    ut(Array.isArray(k), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(bn(k), "]")), Array.isArray(k) && (g = k)
  }
  if ((!_ || !_.length) && (0, nl.default)(P)) {
    var B = x && x.length,
      W = P({
        xAxis: w ? et(et({}, w), {}, {
          ticks: B ? x : w.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, B ? !0 : m);
    ut(Array.isArray(W), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(bn(W), "]")), Array.isArray(W) && (_ = W)
  }
  return tt.createElement("g", {
    className: "recharts-cartesian-grid"
  }, tt.createElement(EU, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), tt.createElement(jU, gn({}, f, {
    offset: l,
    horizontalPoints: g,
    xAxis: w,
    yAxis: S
  })), tt.createElement(MU, gn({}, f, {
    offset: l,
    verticalPoints: _,
    xAxis: w,
    yAxis: S
  })), tt.createElement(CU, gn({}, f, {
    horizontalPoints: g
  })), tt.createElement(IU, gn({}, f, {
    verticalPoints: _
  })))
}
Pa.displayName = "CartesianGrid";
import yt, {
  PureComponent as XU
} from "./react-shim-eraudit.js";
var l_ = te(Le()),
  ol = te(Tt()),
  c_ = te(No());
var NU = ["type", "layout", "connectNulls", "ref"],
  RU = ["key"];

function ki(e) {
  "@babel/helpers - typeof";
  return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ki(e)
}

function i_(e, t) {
  if (e == null) return {};
  var r = LU(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function LU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Ta() {
  return Ta = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ta.apply(this, arguments)
}

function o_(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function At(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? o_(Object(r), !0).forEach(function(n) {
      Vt(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : o_(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Ii(e) {
  return zU(e) || WU(e) || qU(e) || BU()
}

function BU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function qU(e, t) {
  if (e) {
    if (typeof e == "string") return gd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return gd(e, t)
  }
}

function WU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function zU(e) {
  if (Array.isArray(e)) return gd(e)
}

function gd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function FU(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function a_(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, s_(n.key), n)
  }
}

function $U(e, t, r) {
  return t && a_(e.prototype, t), r && a_(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function UU(e, t, r) {
  return t = il(t), HU(e, u_() ? Reflect.construct(t, r || [], il(e).constructor) : t.apply(e, r))
}

function HU(e, t) {
  if (t && (ki(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return GU(e)
}

function GU(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function u_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (u_ = function() {
    return !!e
  })()
}

function il(e) {
  return il = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, il(e)
}

function KU(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && bd(e, t)
}

function bd(e, t) {
  return bd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, bd(e, t)
}

function Vt(e, t, r) {
  return t = s_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function s_(e) {
  var t = VU(e, "string");
  return ki(t) == "symbol" ? t : t + ""
}

function VU(e, t) {
  if (ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ki(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Rr = function(e) {
  function t() {
    var r;
    FU(this, t);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = UU(this, t, [].concat(i)), Vt(r, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), Vt(r, "generateSimpleStrokeDasharray", function(a, u) {
      return "".concat(u, "px ").concat(a - u, "px")
    }), Vt(r, "getStrokeDasharray", function(a, u, s) {
      var l = s.reduce(function(x, w) {
        return x + w
      });
      if (!l) return r.generateSimpleStrokeDasharray(u, a);
      for (var f = Math.floor(a / l), c = a % l, p = u - a, d = [], y = 0, m = 0; y < s.length; m += s[y], ++y)
        if (m + s[y] > c) {
          d = [].concat(Ii(s.slice(0, y)), [c - m]);
          break
        } var v = d.length % 2 === 0 ? [0, p] : [p];
      return [].concat(Ii(t.repeat(s, f)), Ii(d), v).map(function(x) {
        return "".concat(x, "px")
      }).join(", ")
    }), Vt(r, "id", Qt("recharts-line-")), Vt(r, "pathRef", function(a) {
      r.mainCurve = a
    }), Vt(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      }), r.props.onAnimationEnd && r.props.onAnimationEnd()
    }), Vt(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      }), r.props.onAnimationStart && r.props.onAnimationStart()
    }), r
  }
  return KU(t, e), $U(t, [{
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
        c = We(f, Ir);
      if (!c) return null;
      var p = function(m, v) {
          return {
            x: m.x,
            y: m.y,
            value: m.value,
            errorVal: Ve(m.payload, v)
          }
        },
        d = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return yt.createElement(be, d, c.map(function(y) {
        return yt.cloneElement(y, {
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
        c = ue(this.props, !1),
        p = ue(s, !0),
        d = l.map(function(m, v) {
          var x = At(At(At({
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
          return t.renderDotItem(s, x)
        }),
        y = {
          clipPath: n ? "url(#clipPath-".concat(i ? "" : "dots-").concat(o, ")") : null
        };
      return yt.createElement(be, Ta({
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
        d = At(At(At({}, ue(p, !0)), {}, {
          fill: "none",
          className: "recharts-line-curve",
          clipPath: i ? "url(#clipPath-".concat(o, ")") : null,
          points: n
        }, a), {}, {
          type: s,
          layout: l,
          connectNulls: f
        });
      return yt.createElement(na, Ta({}, d, {
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
      return yt.createElement(lr, {
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
                  b = vt(z.x, R.x),
                  O = vt(z.y, R.y);
                return At(At({}, R), {}, {
                  x: b(h),
                  y: O(h)
                })
              }
              if (y) {
                var T = vt(m * 2, R.x),
                  A = vt(v / 2, R.y);
                return At(At({}, R), {}, {
                  x: T(h),
                  y: A(h)
                })
              }
              return At(At({}, R), {}, {
                x: R.x,
                y: R.y
              })
            });
          return o.renderCurveStatically(_, n, i)
        }
        var C = vt(0, S),
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
        S = ae("recharts-line", s),
        P = l && l.allowDataOverflow,
        h = f && f.allowDataOverflow,
        g = P || h,
        _ = (0, ol.default)(v) ? this.id : v,
        C = (n = ue(a, !1)) !== null && n !== void 0 ? n : {
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
      return yt.createElement(be, {
        className: S
      }, P || h ? yt.createElement("defs", null, yt.createElement("clipPath", {
        id: "clipPath-".concat(_)
      }, yt.createElement("rect", {
        x: P ? p : p - d / 2,
        y: h ? c : c - y / 2,
        width: P ? d : d * 2,
        height: h ? y : y * 2
      })), !z && yt.createElement("clipPath", {
        id: "clipPath-dots-".concat(_)
      }, yt.createElement("rect", {
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
      for (var o = n.length % 2 !== 0 ? [].concat(Ii(n), [0]) : n, a = [], u = 0; u < i; ++u) a = [].concat(Ii(a), Ii(o));
      return a
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var o;
      if (yt.isValidElement(n)) o = yt.cloneElement(n, i);
      else if ((0, l_.default)(n)) o = n(i);
      else {
        var a = i.key,
          u = i_(i, RU),
          s = ae("recharts-line-dot", typeof n != "boolean" ? n.className : "");
        o = yt.createElement(vi, Ta({
          key: a
        }, u, {
          className: s
        }))
      }
      return o
    }
  }])
}(XU);
Vt(Rr, "displayName", "Line");
Vt(Rr, "defaultProps", {
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
  isAnimationActive: !st.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
});
Vt(Rr, "getComposedData", function(e) {
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
    c = s.map(function(p, d) {
      var y = Ve(p, a);
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
  return At({
    points: c,
    layout: f
  }, l)
});
import * as Ea from "./react-shim-eraudit.js";

function Di(e) {
  "@babel/helpers - typeof";
  return Di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Di(e)
}

function YU(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function f_(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, m_(n.key), n)
  }
}

function ZU(e, t, r) {
  return t && f_(e.prototype, t), r && f_(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function JU(e, t, r) {
  return t = al(t), QU(e, p_() ? Reflect.construct(t, r || [], al(e).constructor) : t.apply(e, r))
}

function QU(e, t) {
  if (t && (Di(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return e5(e)
}

function e5(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function p_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (p_ = function() {
    return !!e
  })()
}

function al(e) {
  return al = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, al(e)
}

function t5(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && xd(e, t)
}

function xd(e, t) {
  return xd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, xd(e, t)
}

function d_(e, t, r) {
  return t = m_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function m_(e) {
  var t = r5(e, "string");
  return Di(t) == "symbol" ? t : t + ""
}

function r5(e, t) {
  if (Di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function wd() {
  return wd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, wd.apply(this, arguments)
}

function n5(e) {
  var t = e.xAxisId,
    r = Oi(),
    n = Si(),
    i = Gs(t);
  return i == null ? null : Ea.createElement(Or, wd({}, i, {
    className: ae("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
    viewBox: {
      x: 0,
      y: 0,
      width: r,
      height: n
    },
    ticksGenerator: function(a) {
      return Ot(a, !0)
    }
  }))
}
var cr = function(e) {
  function t() {
    return YU(this, t), JU(this, t, arguments)
  }
  return t5(t, e), ZU(t, [{
    key: "render",
    value: function() {
      return Ea.createElement(n5, this.props)
    }
  }])
}(Ea.Component);
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
import * as ja from "./react-shim-eraudit.js";

function Ni(e) {
  "@babel/helpers - typeof";
  return Ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ni(e)
}

function i5(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function h_(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, g_(n.key), n)
  }
}

function o5(e, t, r) {
  return t && h_(e.prototype, t), r && h_(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function a5(e, t, r) {
  return t = ul(t), u5(e, y_() ? Reflect.construct(t, r || [], ul(e).constructor) : t.apply(e, r))
}

function u5(e, t) {
  if (t && (Ni(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return s5(e)
}

function s5(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function y_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (y_ = function() {
    return !!e
  })()
}

function ul(e) {
  return ul = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ul(e)
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
  }), t && Od(e, t)
}

function Od(e, t) {
  return Od = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Od(e, t)
}

function v_(e, t, r) {
  return t = g_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function g_(e) {
  var t = c5(e, "string");
  return Ni(t) == "symbol" ? t : t + ""
}

function c5(e, t) {
  if (Ni(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Sd() {
  return Sd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Sd.apply(this, arguments)
}
var f5 = function(t) {
    var r = t.yAxisId,
      n = Oi(),
      i = Si(),
      o = Ks(r);
    return o == null ? null : ja.createElement(Or, Sd({}, o, {
      className: ae("recharts-".concat(o.axisType, " ").concat(o.axisType), o.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: i
      },
      ticksGenerator: function(u) {
        return Ot(u, !0)
      }
    }))
  },
  fr = function(e) {
    function t() {
      return i5(this, t), a5(this, t, arguments)
    }
    return l5(t, e), o5(t, [{
      key: "render",
      value: function() {
        return ja.createElement(f5, this.props)
      }
    }])
  }(ja.Component);
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
var Li = te(Tt()),
  Yt = te(Le()),
  yl = te(Xp()),
  Bi = te(Wr()),
  z_ = te(Su()),
  F_ = te(mf());
import Bt, {
  Component as $5,
  cloneElement as Xt,
  isValidElement as U5,
  forwardRef as H5
} from "./react-shim-eraudit.js";

function b_(e) {
  return h5(e) || m5(e) || d5(e) || p5()
}

function p5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function d5(e, t) {
  if (e) {
    if (typeof e == "string") return Ad(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ad(e, t)
  }
}

function m5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function h5(e) {
  if (Array.isArray(e)) return Ad(e)
}

function Ad(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var sl = function(t, r, n, i, o) {
  var a = We(t, Xs),
    u = We(t, wa),
    s = [].concat(b_(a), b_(u)),
    l = We(t, Sa),
    f = "".concat(i, "Id"),
    c = i[0],
    p = r;
  if (s.length && (p = s.reduce(function(m, v) {
      if (v.props[f] === n && ht(v.props, "extendDomain") && X(v.props[c])) {
        var x = v.props[c];
        return [Math.min(m[0], x), Math.max(m[1], x)]
      }
      return m
    }, p)), l.length) {
    var d = "".concat(c, "1"),
      y = "".concat(c, "2");
    p = l.reduce(function(m, v) {
      if (v.props[f] === n && ht(v.props, "extendDomain") && X(v.props[d]) && X(v.props[y])) {
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
var O_ = te(w_()),
  cl = new O_.default;
var fl = "recharts.syncMouseEvents";

function Ca(e) {
  "@babel/helpers - typeof";
  return Ca = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ca(e)
}

function g5(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function S_(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, A_(n.key), n)
  }
}

function b5(e, t, r) {
  return t && S_(e.prototype, t), r && S_(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function Pd(e, t, r) {
  return t = A_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function A_(e) {
  var t = x5(e, "string");
  return Ca(t) == "symbol" ? t : t + ""
}

function x5(e, t) {
  if (Ca(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ca(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var __ = function() {
  function e() {
    g5(this, e), Pd(this, "activeIndex", 0), Pd(this, "coordinateList", []), Pd(this, "layout", "horizontal")
  }
  return b5(e, [{
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

function P_(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e?.[0],
      i = e?.[1];
    if (n && i && X(n) && X(i)) return !0
  }
  return !1
}
import {
  cloneElement as A5,
  createElement as _5,
  isValidElement as P5
} from "./react-shim-eraudit.js";

function T_(e, t, r, n) {
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

function pl(e) {
  var t = e.cx,
    r = e.cy,
    n = e.radius,
    i = e.startAngle,
    o = e.endAngle,
    a = Ne(t, r, n, i),
    u = Ne(t, r, n, o);
  return {
    points: [a, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: o
  }
}

function E_(e, t, r) {
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
        p = Ne(u, s, l, c),
        d = Ne(u, s, f, c);
      n = p.x, i = p.y, o = d.x, a = d.y
    } else return pl(t);
  return [{
    x: n,
    y: i
  }, {
    x: o,
    y: a
  }]
}

function Ia(e) {
  "@babel/helpers - typeof";
  return Ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ia(e)
}

function j_(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function dl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? j_(Object(r), !0).forEach(function(n) {
      w5(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : j_(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function w5(e, t, r) {
  return t = O5(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function O5(e) {
  var t = S5(e, "string");
  return Ia(t) == "symbol" ? t : t + ""
}

function S5(e, t) {
  if (Ia(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ia(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function M_(e) {
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
    d = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !d || !o || !a || p !== "ScatterChart" && i !== "axis") return null;
  var y, m = na;
  if (p === "ScatterChart") y = a, m = zO;
  else if (p === "BarChart") y = T_(c, a, s, f), m = yi;
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
  }, m = na;
  var g = dl(dl(dl(dl({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), y), ue(d, !1)), {}, {
    payload: u,
    payloadIndex: l,
    className: ae("recharts-tooltip-cursor", d.className)
  });
  return P5(d) ? A5(d, g) : _5(m, g)
}
var T5 = ["item"],
  E5 = ["children", "className", "width", "height", "style", "compact", "title", "desc"];

function qi(e) {
  "@babel/helpers - typeof";
  return qi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, qi(e)
}

function Ri() {
  return Ri = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ri.apply(this, arguments)
}

function C_(e, t) {
  return C5(e) || M5(e, t) || q_(e, t) || j5()
}

function j5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function M5(e, t) {
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

function C5(e) {
  if (Array.isArray(e)) return e
}

function I_(e, t) {
  if (e == null) return {};
  var r = I5(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function I5(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function k5(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function k_(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, W_(n.key), n)
  }
}

function D5(e, t, r) {
  return t && k_(e.prototype, t), r && k_(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function N5(e, t, r) {
  return t = hl(t), R5(e, B_() ? Reflect.construct(t, r || [], hl(e).constructor) : t.apply(e, r))
}

function R5(e, t) {
  if (t && (qi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return L5(e)
}

function L5(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function B_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (B_ = function() {
    return !!e
  })()
}

function hl(e) {
  return hl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, hl(e)
}

function B5(e, t) {
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

function Wi(e) {
  return z5(e) || W5(e) || q_(e) || q5()
}

function q5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function q_(e, t) {
  if (e) {
    if (typeof e == "string") return Ed(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ed(e, t)
  }
}

function W5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function z5(e) {
  if (Array.isArray(e)) return Ed(e)
}

function Ed(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function D_(e, t) {
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
    t % 2 ? D_(Object(r), !0).forEach(function(n) {
      ce(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : D_(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function ce(e, t, r) {
  return t = W_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function W_(e) {
  var t = F5(e, "string");
  return qi(t) == "symbol" ? t : t + ""
}

function F5(e, t) {
  if (qi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (qi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
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

function ml(e) {
  return e
}
var V5 = function(t, r) {
    return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius
  },
  X5 = function(t, r, n, i) {
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
        return U(U(U({}, i), Ne(i.cx, i.cy, u, a)), {}, {
          angle: a,
          radius: u
        })
      }
      var s = o.coordinate,
        l = i.angle;
      return U(U(U({}, i), Ne(i.cx, i.cy, s, l)), {}, {
        angle: l,
        radius: s
      })
    }
    return $_
  },
  vl = function(t, r) {
    var n = r.graphicalItems,
      i = r.dataStartIndex,
      o = r.dataEndIndex,
      a = (n ?? []).reduce(function(u, s) {
        var l = s.props.data;
        return l && l.length ? [].concat(Wi(u), Wi(l)) : u
      }, []);
    return a.length > 0 ? a : t && t.length && X(i) && X(o) ? t.slice(i, o + 1) : []
  };

function U_(e) {
  return e === "number" ? [0, "auto"] : void 0
}
var jd = function(t, r, n, i) {
    var o = t.graphicalItems,
      a = t.tooltipAxis,
      u = vl(r, t);
    return n < 0 || !o || !o.length || n >= u.length ? null : o.reduce(function(s, l) {
      var f, c = (f = l.props.data) !== null && f !== void 0 ? f : r;
      c && t.dataStartIndex + t.dataEndIndex !== 0 && t.dataEndIndex - t.dataStartIndex >= n && (c = c.slice(t.dataStartIndex, t.dataEndIndex + 1));
      var p;
      if (a.dataKey && !a.allowDuplicatedCategory) {
        var d = c === void 0 ? u : c;
        p = Pn(d, a.dataKey, i)
      } else p = c && c[n] || u[n];
      return p ? [].concat(Wi(s), [Os(l, p)]) : s
    }, [])
  },
  N_ = function(t, r, n, i) {
    var o = i || {
        x: t.chartX,
        y: t.chartY
      },
      a = V5(o, n),
      u = t.orderedTooltipTicks,
      s = t.tooltipAxis,
      l = t.tooltipTicks,
      f = g1(a, u, l, s);
    if (f >= 0 && l) {
      var c = l[f] && l[f].value,
        p = jd(t, r, f, c),
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
  Y5 = function(t, r) {
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
      var B = vl(t.data, {
          graphicalItems: i.filter(function(D) {
            var L, G = a in D.props ? D.props[a] : (L = D.type.defaultProps) === null || L === void 0 ? void 0 : L[a];
            return G === k
          }),
          dataStartIndex: s,
          dataEndIndex: l
        }),
        W = B.length,
        R, H, F;
      P_(x.domain, P, w) && (R = ws(x.domain, null, P), d && (w === "number" || g !== "auto") && (F = fi(B, S, "category")));
      var z = U_(w);
      if (!R || R.length === 0) {
        var b, O = (b = x.domain) !== null && b !== void 0 ? b : z;
        if (S) {
          if (R = fi(B, S, w), w === "category" && d) {
            var T = jh(R);
            h && T ? (H = R, R = (0, yl.default)(0, W)) : h || (R = Sp(O, R, m).reduce(function(D, L) {
              return D.indexOf(L) >= 0 ? D : [].concat(Wi(D), [L])
            }, []))
          } else if (w === "category") h ? R = R.filter(function(D) {
            return D !== "" && !(0, Li.default)(D)
          }) : R = Sp(O, R, m).reduce(function(D, L) {
            return D.indexOf(L) >= 0 || L === "" || (0, Li.default)(L) ? D : [].concat(Wi(D), [L])
          }, []);
          else if (w === "number") {
            var A = S1(B, i.filter(function(D) {
              var L, G, Z = a in D.props ? D.props[a] : (L = D.type.defaultProps) === null || L === void 0 ? void 0 : L[a],
                J = "hide" in D.props ? D.props.hide : (G = D.type.defaultProps) === null || G === void 0 ? void 0 : G.hide;
              return Z === k && (C || !J)
            }), S, o, f);
            A && (R = A)
          }
          d && (w === "number" || g !== "auto") && (F = fi(B, S, "category"))
        } else d ? R = (0, yl.default)(0, W) : u && u[k] && u[k].hasStack && w === "number" ? R = p === "expand" ? [0, 1] : Op(u[k].stackGroups, s, l) : R = vp(B, i.filter(function(D) {
          var L = a in D.props ? D.props[a] : D.type.defaultProps[a],
            G = "hide" in D.props ? D.props.hide : D.type.defaultProps.hide;
          return L === k && (C || !G)
        }), w, f, !0);
        if (w === "number") R = sl(c, R, k, o, _), O && (R = ws(O, R, P));
        else if (w === "category" && O) {
          var j = O,
            E = R.every(function(D) {
              return j.indexOf(D) >= 0
            });
          E && (R = j)
        }
      }
      return U(U({}, y), {}, ce({}, k, U(U({}, x), {}, {
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
  Z5 = function(t, r) {
    var n = r.graphicalItems,
      i = r.Axis,
      o = r.axisType,
      a = r.axisIdKey,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = t.layout,
      c = t.children,
      p = vl(t.data, {
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
        }), "number", f), i.defaultProps.allowDataOverflow), h = sl(c, h, S, o)), U(U({}, v), {}, ce({}, S, U(U({
          axisType: o
        }, i.defaultProps), {}, {
          hide: !0,
          orientation: (0, Bi.default)(G5, "".concat(o, ".").concat(m % 2), null),
          domain: h,
          originalDomain: P,
          isCategorical: y,
          layout: f
        })))
      }
      return v
    }, {})
  },
  J5 = function(t, r) {
    var n = r.axisType,
      i = n === void 0 ? "xAxis" : n,
      o = r.AxisComp,
      a = r.graphicalItems,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = t.children,
      c = "".concat(i, "Id"),
      p = We(f, o),
      d = {};
    return p && p.length ? d = Y5(t, {
      axes: p,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    }) : a && a.length && (d = Z5(t, {
      Axis: o,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    })), d
  },
  Q5 = function(t) {
    var r = er(t),
      n = Ot(r, !1, !0);
    return {
      tooltipTicks: n,
      orderedTooltipTicks: (0, z_.default)(n, function(i) {
        return i.coordinate
      }),
      tooltipAxis: r,
      tooltipAxisBandSize: pi(r, n)
    }
  },
  R_ = function(t) {
    var r = t.children,
      n = t.defaultShowTooltip,
      i = Ze(r, hn),
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
  e4 = function(t) {
    return !t || !t.length ? !1 : t.some(function(r) {
      var n = jt(r && r.type);
      return n && n.indexOf("Bar") >= 0
    })
  },
  L_ = function(t) {
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
  t4 = function(t, r) {
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
      d = Ze(c, hn),
      y = Ze(c, Dt),
      m = Object.keys(s).reduce(function(h, g) {
        var _ = s[g],
          C = _.orientation;
        return !_.mirror && !_.hide ? U(U({}, h), {}, ce({}, C, h[C] + _.width)) : h
      }, {
        left: p.left || 0,
        right: p.right || 0
      }),
      v = Object.keys(a).reduce(function(h, g) {
        var _ = a[g],
          C = _.orientation;
        return !_.mirror && !_.hide ? U(U({}, h), {}, ce({}, C, (0, Bi.default)(h, "".concat(C)) + _.height)) : h
      }, {
        top: p.top || 0,
        bottom: p.bottom || 0
      }),
      x = U(U({}, v), m),
      w = x.bottom;
    d && (x.bottom += d.props.height || hn.defaultProps.height), y && r && (x = w1(x, i, n, r));
    var S = l - x.left - x.right,
      P = f - x.top - x.bottom;
    return U(U({
      brushBottom: w
    }, x), {}, {
      width: Math.max(S, 0),
      height: Math.max(P, 0)
    })
  },
  r4 = function(t, r) {
    if (r === "xAxis") return t[r].width;
    if (r === "yAxis") return t[r].height
  },
  gl = function(t) {
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
          O = e4(S),
          T = [];
        return S.forEach(function(A, j) {
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
            ne = {},
            ye = s.reduce(function(it, ot) {
              var N, re, ie = w["".concat(ot.axisType, "Map")],
                Y = D["".concat(ot.axisType, "Id")];
              ie && ie[Y] || ot.axisType === "zAxis" || Ut(!1);
              var se = ie[Y];
              return U(U({}, it), {}, ce(ce({}, ot.axisType, se), "".concat(ot.axisType, "Ticks"), Ot(se)))
            }, ne),
            K = ye[b],
            le = ye["".concat(b, "Ticks")],
            ee = P && P[Z] && P[Z].hasStack && C1(A, P[Z].stackGroups),
            $ = jt(A.type).indexOf("Bar") >= 0,
            Oe = pi(K, le),
            Q = [],
            ge = O && b1({
              barSize: k,
              stackGroups: P,
              totalSize: r4(ye, b)
            });
          if ($) {
            var Ee, Re, pt = (0, Li.default)(G) ? H : G,
              V = (Ee = (Re = pi(K, le, !0)) !== null && Re !== void 0 ? Re : pt) !== null && Ee !== void 0 ? Ee : 0;
            Q = x1({
              barGap: W,
              barCategoryGap: R,
              bandSize: V !== Oe ? V : Oe,
              sizeList: ge[J],
              maxBarSize: pt
            }), V !== Oe && (Q = Q.map(function(it) {
              return U(U({}, it), {}, {
                position: U(U({}, it.position), {}, {
                  offset: it.position.offset - V / 2
                })
              })
            }))
          }
          var nt = A && A.type && A.type.getComposedData;
          nt && T.push({
            props: U(U({}, nt(U(U({}, ye), {}, {
              displayedData: E,
              props: x,
              dataKey: L,
              item: A,
              bandSize: Oe,
              barPosition: Q,
              offset: h,
              stackedData: ee,
              layout: B,
              dataStartIndex: _,
              dataEndIndex: C
            }))), {}, ce(ce(ce({
              key: A.key || "item-".concat(j)
            }, z, ye[z]), b, ye[b]), "animationId", g)),
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
          z = We(_, n),
          b = E1(B, z, "".concat(H, "Id"), "".concat(F, "Id"), k, W),
          O = s.reduce(function(D, L) {
            var G = "".concat(L.axisType, "Map");
            return U(U({}, D), {}, ce({}, G, J5(S, U(U({}, L), {}, {
              graphicalItems: z,
              stackGroups: L.axisType === H && b,
              dataStartIndex: P,
              dataEndIndex: h
            }))))
          }, {}),
          T = t4(U(U({}, O), {}, {
            props: S,
            graphicalItems: z
          }), w?.legendBBox);
        Object.keys(O).forEach(function(D) {
          O[D] = f(S, O[D], T, D.replace("Map", ""), r)
        });
        var A = O["".concat(F, "Map")],
          j = Q5(A),
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
        }, j), O)
      },
      y = function(v) {
        function x(w) {
          var S, P, h;
          return k5(this, x), h = N5(this, x, [w]), ce(h, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), ce(h, "accessibilityManager", new __), ce(h, "handleLegendBBoxUpdate", function(g) {
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
          }), ce(h, "handleReceiveSyncEvent", function(g, _, C) {
            if (h.props.syncId === g) {
              if (C === h.eventEmitterSymbol && typeof h.props.syncMethod != "function") return;
              h.applySyncEvent(_)
            }
          }), ce(h, "handleBrushChange", function(g) {
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
          }), ce(h, "handleMouseEnter", function(g) {
            var _ = h.getMouseInfo(g);
            if (_) {
              var C = U(U({}, _), {}, {
                isTooltipActive: !0
              });
              h.setState(C), h.triggerSyncEvent(C);
              var k = h.props.onMouseEnter;
              (0, Yt.default)(k) && k(C, g)
            }
          }), ce(h, "triggeredAfterMouseMove", function(g) {
            var _ = h.getMouseInfo(g),
              C = _ ? U(U({}, _), {}, {
                isTooltipActive: !0
              }) : {
                isTooltipActive: !1
              };
            h.setState(C), h.triggerSyncEvent(C);
            var k = h.props.onMouseMove;
            (0, Yt.default)(k) && k(C, g)
          }), ce(h, "handleItemMouseEnter", function(g) {
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
          }), ce(h, "handleItemMouseLeave", function() {
            h.setState(function() {
              return {
                isTooltipActive: !1
              }
            })
          }), ce(h, "handleMouseMove", function(g) {
            g.persist(), h.throttleTriggeredAfterMouseMove(g)
          }), ce(h, "handleMouseLeave", function(g) {
            h.throttleTriggeredAfterMouseMove.cancel();
            var _ = {
              isTooltipActive: !1
            };
            h.setState(_), h.triggerSyncEvent(_);
            var C = h.props.onMouseLeave;
            (0, Yt.default)(C) && C(_, g)
          }), ce(h, "handleOuterEvent", function(g) {
            var _ = Fh(g),
              C = (0, Bi.default)(h.props, "".concat(_));
            if (_ && (0, Yt.default)(C)) {
              var k, B;
              /.*touch.*/i.test(_) ? B = h.getMouseInfo(g.changedTouches[0]) : B = h.getMouseInfo(g), C((k = B) !== null && k !== void 0 ? k : {}, g)
            }
          }), ce(h, "handleClick", function(g) {
            var _ = h.getMouseInfo(g);
            if (_) {
              var C = U(U({}, _), {}, {
                isTooltipActive: !0
              });
              h.setState(C), h.triggerSyncEvent(C);
              var k = h.props.onClick;
              (0, Yt.default)(k) && k(C, g)
            }
          }), ce(h, "handleMouseDown", function(g) {
            var _ = h.props.onMouseDown;
            if ((0, Yt.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ce(h, "handleMouseUp", function(g) {
            var _ = h.props.onMouseUp;
            if ((0, Yt.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ce(h, "handleTouchMove", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.throttleTriggeredAfterMouseMove(g.changedTouches[0])
          }), ce(h, "handleTouchStart", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.handleMouseDown(g.changedTouches[0])
          }), ce(h, "handleTouchEnd", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.handleMouseUp(g.changedTouches[0])
          }), ce(h, "handleDoubleClick", function(g) {
            var _ = h.props.onDoubleClick;
            if ((0, Yt.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ce(h, "handleContextMenu", function(g) {
            var _ = h.props.onContextMenu;
            if ((0, Yt.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ce(h, "triggerSyncEvent", function(g) {
            h.props.syncId !== void 0 && cl.emit(fl, h.props.syncId, g, h.eventEmitterSymbol)
          }), ce(h, "applySyncEvent", function(g) {
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
              var j = U(U({}, O), {}, {
                  x: O.left,
                  y: O.top
                }),
                E = Math.min(H, j.x + j.width),
                D = Math.min(F, j.y + j.height),
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
          }), ce(h, "renderCursor", function(g) {
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
            return Bt.createElement(M_, {
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
          }), ce(h, "renderPolarAxis", function(g, _, C) {
            var k = (0, Bi.default)(g, "type.axisType"),
              B = (0, Bi.default)(h.state, "".concat(k, "Map")),
              W = g.type.defaultProps,
              R = W !== void 0 ? U(U({}, W), g.props) : g.props,
              H = B && B[R["".concat(k, "Id")]];
            return Xt(g, U(U({}, H), {}, {
              className: ae(k, H.className),
              key: g.key || "".concat(_, "-").concat(C),
              ticks: Ot(H, !0)
            }))
          }), ce(h, "renderPolarGrid", function(g) {
            var _ = g.props,
              C = _.radialLines,
              k = _.polarAngles,
              B = _.polarRadius,
              W = h.state,
              R = W.radiusAxisMap,
              H = W.angleAxisMap,
              F = er(R),
              z = er(H),
              b = z.cx,
              O = z.cy,
              T = z.innerRadius,
              A = z.outerRadius;
            return Xt(g, {
              polarAngles: Array.isArray(k) ? k : Ot(z, !0).map(function(j) {
                return j.coordinate
              }),
              polarRadius: Array.isArray(B) ? B : Ot(F, !0).map(function(j) {
                return j.coordinate
              }),
              cx: b,
              cy: O,
              innerRadius: T,
              outerRadius: A,
              key: g.key || "polar-grid",
              radialLines: C
            })
          }), ce(h, "renderLegend", function() {
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
            return Xt(F, U(U({}, z), {}, {
              chartWidth: k,
              chartHeight: B,
              margin: W,
              onBBoxUpdate: h.handleLegendBBoxUpdate
            }))
          }), ce(h, "renderTooltip", function() {
            var g, _ = h.props,
              C = _.children,
              k = _.accessibilityLayer,
              B = Ze(C, dt);
            if (!B) return null;
            var W = h.state,
              R = W.isTooltipActive,
              H = W.activeCoordinate,
              F = W.activePayload,
              z = W.activeLabel,
              b = W.offset,
              O = (g = B.props.active) !== null && g !== void 0 ? g : R;
            return Xt(B, {
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
          }), ce(h, "renderBrush", function(g) {
            var _ = h.props,
              C = _.margin,
              k = _.data,
              B = h.state,
              W = B.offset,
              R = B.dataStartIndex,
              H = B.dataEndIndex,
              F = B.updateId;
            return Xt(g, {
              key: g.key || "_recharts-brush",
              onChange: Ho(h.handleBrushChange, g.props.onChange),
              data: k,
              x: X(g.props.x) ? g.props.x : W.left,
              y: X(g.props.y) ? g.props.y : W.top + W.height + W.brushBottom - (C.bottom || 0),
              width: X(g.props.width) ? g.props.width : W.width,
              startIndex: R,
              endIndex: H,
              updateId: "brush-".concat(F)
            })
          }), ce(h, "renderReferenceElement", function(g, _, C) {
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
              j = A === void 0 ? z.yAxisId : A;
            return Xt(g, {
              key: g.key || "".concat(_, "-").concat(C),
              xAxis: R[T],
              yAxis: H[j],
              viewBox: {
                x: F.left,
                y: F.top,
                width: F.width,
                height: F.height
              },
              clipPathId: B
            })
          }), ce(h, "renderActivePoints", function(g) {
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
                fill: zo(_.item),
                strokeWidth: 2,
                stroke: "#fff",
                payload: C.payload,
                value: C.value
              }, ue(z, !1)), zr(z));
            return R.push(x.renderActiveDot(z, O, "".concat(H, "-activePoint-").concat(B))), k ? R.push(x.renderActiveDot(z, U(U({}, O), {}, {
              cx: k.x,
              cy: k.y
            }), "".concat(H, "-basePoint-").concat(B))) : W && R.push(null), R
          }), ce(h, "renderGraphicChild", function(g, _, C) {
            var k = h.filterFormatItem(g, _, C);
            if (!k) return null;
            var B = h.getTooltipEventType(),
              W = h.state,
              R = W.isTooltipActive,
              H = W.tooltipAxis,
              F = W.activeTooltipIndex,
              z = W.activeLabel,
              b = h.props.children,
              O = Ze(b, dt),
              T = k.props,
              A = T.points,
              j = T.isRange,
              E = T.baseLine,
              D = k.item.type.defaultProps !== void 0 ? U(U({}, k.item.type.defaultProps), k.item.props) : k.item.props,
              L = D.activeDot,
              G = D.hide,
              Z = D.activeBar,
              J = D.activeShape,
              ne = !!(!G && R && O && (L || Z || J)),
              ye = {};
            B !== "axis" && O && O.props.trigger === "click" ? ye = {
              onClick: Ho(h.handleItemMouseEnter, g.props.onClick)
            } : B !== "axis" && (ye = {
              onMouseLeave: Ho(h.handleItemMouseLeave, g.props.onMouseLeave),
              onMouseEnter: Ho(h.handleItemMouseEnter, g.props.onMouseEnter)
            });
            var K = Xt(g, U(U({}, k.props), ye));

            function le(ot) {
              return typeof H.dataKey == "function" ? H.dataKey(ot.payload) : null
            }
            if (ne)
              if (F >= 0) {
                var ee, $;
                if (H.dataKey && !H.allowDuplicatedCategory) {
                  var Oe = typeof H.dataKey == "function" ? le : "payload.".concat(H.dataKey.toString());
                  ee = Pn(A, Oe, z), $ = j && E && Pn(E, Oe, z)
                } else ee = A?.[F], $ = j && E && E[F];
                if (J || Z) {
                  var Q = g.props.activeIndex !== void 0 ? g.props.activeIndex : F;
                  return [Xt(g, U(U(U({}, k.props), ye), {}, {
                    activeIndex: Q
                  })), null, null]
                }
                if (!(0, Li.default)(ee)) return [K].concat(Wi(h.renderActivePoints({
                  item: k,
                  activePoint: ee,
                  basePoint: $,
                  childIndex: F,
                  isRange: j
                })))
              } else {
                var ge, Ee = (ge = h.getItemByXY(h.state.activeCoordinate)) !== null && ge !== void 0 ? ge : {
                    graphicalItem: K
                  },
                  Re = Ee.graphicalItem,
                  pt = Re.item,
                  V = pt === void 0 ? g : pt,
                  nt = Re.childIndex,
                  it = U(U(U({}, k.props), ye), {}, {
                    activeIndex: nt
                  });
                return [Xt(V, it), null, null]
              } return j ? [K, null, null] : [K, null]
          }), ce(h, "renderCustomized", function(g, _, C) {
            return Xt(g, U(U({
              key: "recharts-customized-".concat(C)
            }, h.props), h.state))
          }), ce(h, "renderMap", {
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
          }), h.clipPathId = "".concat((S = w.id) !== null && S !== void 0 ? S : Qt("recharts"), "-clip"), h.throttleTriggeredAfterMouseMove = (0, F_.default)(h.triggeredAfterMouseMove, (P = w.throttleDelay) !== null && P !== void 0 ? P : 1e3 / 60), h.state = {}, h
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
              C = Ze(P, dt);
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
            ru([Ze(S.children, dt)], [Ze(this.props.children, dt)]) || this.displayDefaultTooltip()
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel()
          }
        }, {
          key: "getTooltipEventType",
          value: function() {
            var S = Ze(this.props.children, dt);
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
              var z = er(W).scale,
                b = er(R).scale,
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
              var F = er(R);
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
              h = Ze(S, dt),
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
            var _ = zr(this.props, this.handleOuterEvent);
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
              if (k.item === S || k.props.key === S.key || P === jt(k.item.type) && h === k.childIndex) return k
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
            return Bt.createElement("defs", null, Bt.createElement("clipPath", {
              id: S
            }, Bt.createElement("rect", {
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
              return U(U({}, P), {}, ce({}, _, C.scale))
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
              return U(U({}, P), {}, ce({}, _, C.scale))
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
                  H = jt(W.type);
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
                } else if (ma(k, g) || ha(k, g) || gi(k, g)) {
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
                    payload: gi(k, g) ? R.data[b] : k.props.data[b]
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
              F = ue(H, !1);
            if (B) return Bt.createElement(ad, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, Bt.createElement(Yi, Ri({}, F, {
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
            return Bt.createElement(ad, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, Bt.createElement("div", Ri({
              className: ae("recharts-wrapper", g),
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
            }), Bt.createElement(Yi, Ri({}, F, {
              width: _,
              height: C,
              title: W,
              desc: R,
              style: K5
            }), this.renderClipPath(), $l(h, this.renderMap)), this.renderLegend(), this.renderTooltip()))
          }
        }])
      }($5);
    ce(y, "displayName", r), ce(y, "defaultProps", U({
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
    }, c)), ce(y, "getDerivedStateFromProps", function(v, x) {
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
        var O, T, A, j, E = Ze(P, hn),
          D = E && (O = (T = E.props) === null || T === void 0 ? void 0 : T.startIndex) !== null && O !== void 0 ? O : B,
          L = E && (A = (j = E.props) === null || j === void 0 ? void 0 : j.endIndex) !== null && A !== void 0 ? A : W,
          G = D !== B || L !== W,
          Z = !(0, Li.default)(S),
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
    }), ce(y, "renderActiveDot", function(v, x, w) {
      var S;
      return U5(v) ? S = Xt(v, x) : (0, Yt.default)(v) ? S = v(x) : S = Bt.createElement(vi, x), Bt.createElement(be, {
        className: "recharts-active-dot",
        key: w
      }, S)
    });
    var m = H5(function(x, w) {
      return Bt.createElement(y, Ri({}, x, {
        ref: w
      }))
    });
    return m.displayName = y.displayName, m
  };
var Md = gl({
  chartName: "LineChart",
  GraphicalChild: Rr,
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
  GraphicalChild: Gt,
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
  data: e,
  title: t = "AI Intelligence"
}) {
  if (!e) return null;
  let r = Array.isArray(e?.sections) ? e.sections : n4(e);
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
      }), t]
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

function n4(e) {
  let t = [];
  if (e.narrative && t.push({
      title: "\u0E2A\u0E23\u0E38\u0E1B",
      body: e.narrative
    }), e.analysis && t.push({
      title: "\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C",
      body: e.analysis
    }), e.recommendation && t.push({
      title: "\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33",
      body: e.recommendation
    }), Array.isArray(e.actions))
    for (let r of e.actions) t.push({
      title: r.label || r.title,
      body: r.reason || r.detail || ""
    });
  return t
}
import {
  Fragment as Ra,
  jsx as M,
  jsxs as q
} from "./react-jsx-shim-eraudit.js";

function fe(e, t = 0) {
  return e == null || e === "" || isNaN(e) ? "\u2014" : Number(e).toLocaleString("th-TH", {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  })
}

function Da(e) {
  return e == null || isNaN(e) ? "\u2014" : `${Number(e).toFixed(1)}%`
}

function H_(e, t) {
  return t > 0 ? Math.round((e - t) / t * 100) : e > 0 ? 100 : 0
}
async function Lr(e, t) {
  let r = await fetch(e, t),
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
  let e = new Date,
    t = e.getMonth() + 1,
    r = e.getFullYear();
  return `${t>=10?r:r-1}-10-01`
}

function K_() {
  let e = new Date,
    t = e.getFullYear(),
    r = String(e.getMonth() + 1).padStart(2, "0");
  return `${t}-${r}-01`
}
var Br = () => new Date().toISOString().slice(0, 10),
  zi = ["#10b981", "#84cc16", "#eab308", "#f97316", "#dc2626"],
  xl = ["aging_0_30", "aging_31_60", "aging_61_90", "aging_91_180", "aging_180_plus"],
  wl = ["0-30 \u0E27\u0E31\u0E19", "31-60 \u0E27\u0E31\u0E19", "61-90 \u0E27\u0E31\u0E19", "91-180 \u0E27\u0E31\u0E19", ">180 \u0E27\u0E31\u0E19"],
  Fi = {
    drug: "#7c3aed",
    lab: "#0284c7",
    xray: "#059669"
  };

function a4() {
  let [e, t] = Ue(null), [r, n] = Ue(null), [i, o] = Ue(null), [a, u] = Ue(null), [s, l] = Ue(null), [f, c] = Ue(null), [p, d] = Ue(!0), [y, m] = Ue(null), [v, x] = Ue("overview"), [w, S] = Ue(null), [P, h] = Ue(null), g = i4(null), [_, C] = Ue(K_()), [k, B] = Ue(Br()), [W, R] = Ue(null), [H, F] = Ue(null), [z, b] = Ue("outstanding"), [O, T] = Ue(!1), [A, j] = Ue("groups"), [E, D] = Ue(new Set), L = qt(N => {
    D(re => {
      let ie = new Set(re);
      return ie.has(N) ? ie.delete(N) : ie.add(N), ie
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
  }, Z = N => G[N] || "#94a3b8", J = qt(async () => {
    d(!0), m(null);
    try {
      let [N, re] = await Promise.all([Lr(`/api/customer-insight/screening-summary?_t=${Date.now()}`, {
        credentials: "include"
      }), Lr(`/api/customer-insight/monthly-trend?_t=${Date.now()}`, {
        credentials: "include"
      })]);
      t(N), n(re), Lr("/api/ai/customer/segmentation", {
        credentials: "include"
      }).then(h).catch(() => {})
    } catch (N) {
      m(N.message)
    }
    d(!1)
  }, []), ne = qt(async N => {
    try {
      let re = N ? `&pttype=${N}` : "",
        ie = await Lr(`/api/customer-insight/top-diagnosis?${re}&_t=${Date.now()}`, {
          credentials: "include"
        });
      o(ie)
    } catch (re) {
      m(re.message)
    }
  }, []), ye = qt(async () => {
    try {
      let N = await Lr(`/api/customer-insight/patient-insight?_t=${Date.now()}`, {
        credentials: "include"
      });
      u(N)
    } catch (N) {
      m(N.message)
    }
  }, []), K = qt(async () => {
    try {
      let N = await Lr(`/api/customer-insight/aging?_t=${Date.now()}`, {
        credentials: "include"
      });
      l(N)
    } catch (N) {
      m(N.message)
    }
  }, []), le = qt(async () => {
    d(!0), m(null);
    try {
      let N = await Lr(`/api/customer-insight/screening-custom?from=${_}&to=${k}&_t=${Date.now()}`, {
        credentials: "include"
      });
      c(N)
    } catch (N) {
      m(N.message)
    }
    d(!1)
  }, [_, k]), ee = qt(async N => {
    T(!0);
    try {
      let re = await Lr(`/api/customer-insight/payer-patients?pttype=${N}&sort_by=${z}&_t=${Date.now()}`, {
        credentials: "include"
      });
      F(re)
    } catch (re) {
      F({
        patients: [],
        error: re.message
      })
    }
    T(!1)
  }, [z]), $ = qt(N => {
    R(N), F(null), ee(N.pttype_code)
  }, [ee]), Oe = qt(() => {
    R(null), F(null)
  }, []);
  ka(() => {
    J()
  }, [J]), ka(() => {
    v === "diagnosis" && ne(w)
  }, [v, w, ne]), ka(() => {
    v === "patient-insight" && !a && ye()
  }, [v, a, ye]), ka(() => {
    v === "aging" && !s && K()
  }, [v, s, K]), ka(() => {
    W && ee(W.pttype_code)
  }, [z, W, ee]);
  let Q = e?.fiscal_years || [],
    ge = Q.map(N => N.be),
    Ee = qt(() => {
      if (!g.current) return;
      let N = window.open("", "_blank");
      N.document.write(`<!DOCTYPE html><html><head><title>Customer Insight \u2014 3 \u0E1B\u0E35\u0E07\u0E1A</title>
      <style>body{font-family:Sarabun,sans-serif;padding:20px}table{border-collapse:collapse;width:100%;font-size:10px}
      th,td{border:1px solid #ccc;padding:3px 6px;text-align:right}th{background:#f0f4f8;font-weight:800}
      td:first-child,th:first-child{text-align:left}</style></head><body>`), N.document.write(g.current.outerHTML), N.document.write("</body></html>"), N.document.close(), N.print()
    }, []),
    Re = qt(() => {
      if (!e?.payers || Q.length < 3) return;
      let N = "\uFEFF",
        re = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let pe of Q) re.push(`${pe.be} OPD`, `${pe.be} IPD`, `${pe.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${pe.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${pe.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${pe.be} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      re.push("Growth %");
      let ie = e.payers.map(pe => {
          let de = [pe.pttype_code, pe.pttype_name];
          for (let oe of Q) {
            let he = pe.fys[oe.be];
            de.push(he.opd_visits, he.ipd_admissions, he.total_income, he.total_paid, he.total_outstanding, he.collection_rate)
          }
          return de.push(pe.income_growth), de
        }),
        Y = N + [re, ...ie].map(pe => pe.join(",")).join(`
`),
        se = new Blob([Y], {
          type: "text/csv;charset=utf-8"
        }),
        Pe = URL.createObjectURL(se),
        me = document.createElement("a");
      me.href = Pe, me.download = "BCH360_CustomerInsight_3FY.csv", me.click(), URL.revokeObjectURL(Pe)
    }, [e, Q]),
    pt = qt(async () => {
      if (!e?.payers || Q.length < 3) return;
      let N = await import("./xlsx-BuHXVOW6.js"),
        re = N.utils.book_new(),
        ie = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let ve of Q) ie.push(`${ve.be} \u0E04\u0E23\u0E31\u0E49\u0E07`, `${ve.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${ve.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${ve.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${ve.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      ie.push("Growth %");
      let Y = e.payers.map(ve => {
          let Me = [ve.pttype_code, ve.pttype_name];
          for (let ke of Q) {
            let He = ve.fys[ke.be];
            Me.push(He.opd_visits + He.ipd_admissions, He.total_income, He.total_paid, He.total_outstanding, He.collection_rate)
          }
          return Me.push(ve.income_growth), Me
        }),
        se = N.utils.aoa_to_sheet([ie, ...Y]);
      se["!cols"] = ie.map(ve => ({
        wch: Math.min(Math.max(ve.length + 4, 12), 28)
      })), N.utils.book_append_sheet(re, se, "\u0E2A\u0E23\u0E38\u0E1B\u0E2A\u0E34\u0E17\u0E18\u0E34 3 \u0E1B\u0E35\u0E07\u0E1A");
      let Pe = Q[2].be,
        me = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 Xray", "% \u0E22\u0E32", "% Lab", "% Xray"],
        pe = e.payers.map(ve => {
          let Me = ve.fys[Pe],
            ke = Me.total_income || 0;
          return [ve.pttype_code, ve.pttype_name, ke, Me.opd_drug || 0, Me.opd_lab || 0, Me.opd_xray || 0, ke > 0 ? Math.round(Me.opd_drug / ke * 1e3) / 10 : 0, ke > 0 ? Math.round(Me.opd_lab / ke * 1e3) / 10 : 0, ke > 0 ? Math.round(Me.opd_xray / ke * 1e3) / 10 : 0]
        }),
        de = N.utils.aoa_to_sheet([me, ...pe]);
      if (de["!cols"] = me.map(ve => ({
          wch: Math.min(Math.max(ve.length + 4, 12), 28)
        })), N.utils.book_append_sheet(re, de, `Service Mix ${Pe}`), r?.comparison) {
        let ve = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...Q.map(He => `${He.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`), ...Q.map(He => `${He.be} \u0E04\u0E23\u0E31\u0E49\u0E07`)],
          Me = r.comparison.map(He => {
            let _t = [He.month];
            for (let $i of Q) _t.push(He[`fy${$i.be}`]?.income || 0);
            for (let $i of Q) _t.push(He[`fy${$i.be}`]?.visits || 0);
            return _t
          }),
          ke = N.utils.aoa_to_sheet([ve, ...Me]);
        ke["!cols"] = ve.map(He => ({
          wch: 14
        })), N.utils.book_append_sheet(re, ke, "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19")
      }
      if (s?.payers) {
        let ve = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", ...wl, "\u0E23\u0E27\u0E21\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"],
          Me = s.payers.map(_t => [_t.pttype_code, _t.pttype_name, ...xl.map($i => _t[$i] || 0), _t.total_outstanding || 0]),
          ke = s.grand_total || {};
        Me.push(["", "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", ...xl.map(_t => ke[_t] || 0), ke.total_outstanding || 0]);
        let He = N.utils.aoa_to_sheet([ve, ...Me]);
        He["!cols"] = ve.map(_t => ({
          wch: Math.min(Math.max(_t.length + 4, 14), 24)
        })), N.utils.book_append_sheet(re, He, "Aging \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30")
      }
      let oe = [
          ["BCH 360\xB0 Intelligence \u2014 Customer Insight Report"],
          [],
          ["\u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", `${ge.join(" \xB7 ")}`],
          ["\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", e.data_source],
          ["\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E40\u0E21\u0E37\u0E48\u0E2D", new Date().toLocaleString("th-TH")],
          ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34", `${e.payers.length}`],
          ["\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E35\u0E48 Flag", `${e.flagged_count}`],
          [],
          ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team \xB7 BOSSART"]
        ],
        he = N.utils.aoa_to_sheet(oe);
      he["!cols"] = [{
        wch: 22
      }, {
        wch: 60
      }], N.utils.book_append_sheet(re, he, "Meta"), N.writeFile(re, "BCH360_CustomerInsight_3FY.xlsx")
    }, [e, Q, ge, r, s]),
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
      badge: (N, re) => ({
        fontSize: "9px",
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: "99px",
        background: N,
        color: re
      })
    },
    nt = ({
      label: N,
      icon: re,
      values: ie,
      unit: Y = "",
      accent: se = "#0284c7",
      reverse: Pe = !1
    }) => {
      let me = ie[2],
        pe = ie[1],
        de = H_(me, pe),
        oe = Pe ? de <= 0 ? "#059669" : "#dc2626" : de >= 0 ? "#059669" : "#dc2626";
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
          children: [M("span", {
            style: {
              fontSize: "18px"
            },
            children: re
          }), M("span", {
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
            color: se
          },
          children: [fe(me), " ", M("span", {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)"
            },
            children: Y
          })]
        }), M("div", {
          style: {
            display: "flex",
            gap: "8px",
            marginTop: "6px",
            fontSize: "10px",
            fontWeight: 700
          },
          children: ge.map((he, ve) => q("span", {
            style: {
              color: ve === 2 ? se : "var(--md-text-tertiary)"
            },
            children: [he, ": ", fe(ie[ve])]
          }, he))
        }), pe > 0 && q("div", {
          style: {
            marginTop: "4px",
            fontSize: "10px",
            fontWeight: 800,
            color: oe
          },
          children: [de >= 0 ? "+" : "", de, "% vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"]
        })]
      })
    },
    it = ({
      active: N,
      payload: re,
      label: ie
    }) => !N || !re?.length ? null : q("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderRadius: "10px",
        padding: "10px 14px",
        fontSize: "11px",
        boxShadow: "0 4px 20px rgba(0,0,0,.08)"
      },
      children: [M("div", {
        style: {
          fontWeight: 800,
          marginBottom: "4px"
        },
        children: ie
      }), re.map((Y, se) => q("div", {
        style: {
          display: "flex",
          gap: "6px",
          alignItems: "center"
        },
        children: [M("span", {
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
        }), M("span", {
          style: {
            fontWeight: 800
          },
          children: fe(Y.value)
        })]
      }, se))]
    }),
    ot = ({
      value: N
    }) => {
      if (N == null || isNaN(N)) return null;
      let re = N >= 0 ? "#059669" : "#dc2626";
      return q("span", {
        style: {
          fontSize: "9px",
          fontWeight: 800,
          color: re
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
      children: [M("div", {
        style: {
          width: "4px",
          height: "24px",
          background: "linear-gradient(180deg, #7c3aed, #0284c7)",
          borderRadius: "99px"
        }
      }), M("h2", {
        style: {
          margin: 0,
          fontSize: "18px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: "Customer Insight"
      }), M("span", {
        style: V.badge("rgba(124,58,237,.1)", "#7c3aed"),
        children: "\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \xB7 \u0E2B\u0E25\u0E31\u0E01\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2F"
      }), Q.length === 3 && q("span", {
        style: V.badge("rgba(2,132,199,.1)", "#0284c7"),
        children: ["3 \u0E1B\u0E35\u0E07\u0E1A: ", ge[0], " \xB7 ", ge[1], " \xB7 ", ge[2]]
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
      children: [M("span", {
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
      }].map(N => M("button", {
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
      }, N.id)), M("div", {
        style: {
          width: "1px",
          height: "24px",
          background: "var(--md-border)"
        }
      }), M("button", {
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
      }), M("button", {
        onClick: Ee,
        disabled: !e,
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
      }), M("button", {
        onClick: Re,
        disabled: !e,
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
      }), M("button", {
        onClick: pt,
        disabled: !e,
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
      children: [M("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-secondary)"
        },
        children: "\u{1F4C5} \u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32"
      }), M("input", {
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
      }), M("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)"
        },
        children: "\u0E16\u0E36\u0E07"
      }), M("input", {
        type: "date",
        value: k,
        min: _,
        max: Br(),
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
      }), M("button", {
        onClick: le,
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
      }), M("div", {
        style: {
          width: "1px",
          height: "24px",
          background: "var(--md-border)"
        }
      }), M("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          color: "var(--md-text-tertiary)"
        },
        children: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E25\u0E31\u0E14"
      }), [{
        id: "today",
        label: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
        from: Br(),
        to: Br()
      }, {
        id: "mtd",
        label: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
        from: K_(),
        to: Br()
      }, {
        id: "last30",
        label: "30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
        from: (() => {
          let N = new Date;
          return N.setDate(N.getDate() - 30), N.toISOString().slice(0, 10)
        })(),
        to: Br()
      }, {
        id: "last90",
        label: "90 \u0E27\u0E31\u0E19",
        from: (() => {
          let N = new Date;
          return N.setDate(N.getDate() - 90), N.toISOString().slice(0, 10)
        })(),
        to: Br()
      }, {
        id: "ytd",
        label: "\u0E1B\u0E35\u0E07\u0E1A\u0E19\u0E35\u0E49",
        from: o4(),
        to: Br()
      }].map(N => M("button", {
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
        children: ["\u2713 ", f.window?.from, " \u2192 ", f.window?.to, " \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ", fe(f.grand_total?.total_income), " \u0E1A. \xB7 \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A ", Da(f.grand_total?.collection_rate)]
      })]
    }), y && M("div", {
      className: "rounded-xl p-3",
      style: {
        background: "rgba(220,38,38,.08)",
        border: "1px solid rgba(220,38,38,.2)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: y
    }), p && M("div", {
      style: {
        textAlign: "center",
        padding: "60px 0",
        color: "var(--md-text-tertiary)",
        fontWeight: 700
      },
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Customer Insight (3 \u0E1B\u0E35\u0E07\u0E1A)..."
    }), !p && e && Q.length === 3 && v === "overview" && (() => {
      let N = e.grand_totals,
        re = Y => Q.map(se => N[se.be]?.[Y] || 0),
        ie = (r?.comparison || []).map(Y => {
          let se = {
            month: Y.month
          };
          for (let Pe of Q) se[`fy${Pe.be}`] = Y[`fy${Pe.be}`]?.income || 0;
          return se
        }).filter(Y => Q.some(se => Y[`fy${se.be}`] > 0));
      return q(Ra, {
        children: [q("div", {
          style: {
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          },
          children: [M(nt, {
            icon: "\u{1F465}",
            label: "OPD Visits",
            values: re("opd_visits"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#0284c7"
          }), M(nt, {
            icon: "\u{1F3E5}",
            label: "IPD Admissions",
            values: re("ipd_admissions"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#7c3aed"
          }), M(nt, {
            icon: "\u{1F4B0}",
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
            values: re("total_income"),
            unit: "\u0E1A\u0E32\u0E17",
            accent: "#059669"
          }), M(nt, {
            icon: "\u{1F4CA}",
            label: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A",
            values: Q.map(Y => N[Y.be]?.collection_rate || 0),
            unit: "%",
            accent: "#0284c7"
          }), M(nt, {
            icon: "\u{1F6A9}",
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21",
            values: [0, 0, e.flagged_count],
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            accent: "#dc2626"
          })]
        }), ie.length > 0 && q("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [M("div", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              marginBottom: "12px"
            },
            children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13"
          }), M(Eu, {
            width: "100%",
            height: 300,
            children: q(Md, {
              data: ie,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [M(Pa, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), M(cr, {
                dataKey: "month",
                tick: {
                  fontSize: 11,
                  fontWeight: 700
                }
              }), M(fr, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: Y => Y >= 1e6 ? `${(Y/1e6).toFixed(1)}M` : Y >= 1e3 ? `${(Y/1e3).toFixed(0)}K` : Y
              }), M(dt, {
                content: M(it, {})
              }), M(Dt, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), Q.map((Y, se) => M(Rr, {
                type: "monotone",
                dataKey: `fy${Y.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${Y.be}`,
                stroke: Na[se],
                strokeWidth: se === 2 ? 3 : 1.5,
                strokeDasharray: se === 0 ? "5 5" : void 0,
                dot: {
                  r: se === 2 ? 4 : 2
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
                children: ["\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E41\u0E22\u0E01\u0E15\u0E32\u0E21", A === "groups" ? "\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C (9 \u0E2B\u0E21\u0E27\u0E14)" : "\u0E2A\u0E34\u0E17\u0E18\u0E34", " \u2014 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 (", ge.join(" \xB7 "), ")"]
              }), M("div", {
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
              children: [M("button", {
                onClick: () => j("groups"),
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
              }), M("button", {
                onClick: () => j("pttype"),
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
          }), M("div", {
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
                  children: [M("th", {
                    rowSpan: 2,
                    style: {
                      ...V.th,
                      textAlign: "left",
                      paddingLeft: "14px",
                      borderRight: "2px solid var(--md-border)",
                      verticalAlign: "bottom"
                    },
                    children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                  }), Q.map((Y, se) => q("th", {
                    colSpan: 2,
                    style: {
                      ...V.th,
                      textAlign: "center",
                      borderRight: "2px solid var(--md-border)",
                      background: `${Na[se]}10`,
                      color: Na[se],
                      fontSize: "11px"
                    },
                    children: ["\u0E1B\u0E35\u0E07\u0E1A ", Y.be]
                  }, Y.be)), M("th", {
                    rowSpan: 2,
                    style: {
                      ...V.th,
                      textAlign: "center",
                      verticalAlign: "bottom"
                    },
                    children: "Growth"
                  }), M("th", {
                    rowSpan: 2,
                    style: {
                      ...V.th,
                      textAlign: "center",
                      verticalAlign: "bottom"
                    },
                    children: "\u0E2A\u0E16\u0E32\u0E19\u0E30"
                  })]
                }), M("tr", {
                  style: {
                    background: "var(--md-surface-2, rgba(0,0,0,.02))"
                  },
                  children: Q.map(Y => q(xn.Fragment, {
                    children: [M("th", {
                      style: {
                        ...V.th,
                        fontSize: "9px"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), M("th", {
                      style: {
                        ...V.th,
                        fontSize: "9px",
                        borderRight: "2px solid var(--md-border)"
                      },
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    })]
                  }, Y.be))
                })]
              }), M("tbody", {
                children: A === "groups" ? (e.groups || []).map((Y, se) => {
                  let Pe = Y.flag_low_collection || Y.flag_high_outstanding,
                    me = Z(Y.group_name),
                    pe = E.has(Y.group_name),
                    de = e.payers.filter(oe => oe.group_name === Y.group_name);
                  return q(xn.Fragment, {
                    children: [q("tr", {
                      style: {
                        background: `${me}10`,
                        borderTop: `2px solid ${me}40`,
                        cursor: "pointer"
                      },
                      onClick: () => L(Y.group_name),
                      children: [M("td", {
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
                          children: [M("span", {
                            style: {
                              width: 10,
                              height: 10,
                              borderRadius: 2,
                              background: me,
                              display: "inline-block"
                            }
                          }), M("span", {
                            style: {
                              fontSize: "13px",
                              fontWeight: 900,
                              color: me
                            },
                            children: Y.group_name
                          }), q("span", {
                            style: {
                              fontSize: "10px",
                              fontWeight: 600,
                              color: "var(--md-text-tertiary)"
                            },
                            children: ["(", Y.pttype_count, " pttype)"]
                          }), M("span", {
                            style: {
                              marginLeft: "auto",
                              fontSize: "10px",
                              color: "var(--md-text-tertiary)"
                            },
                            children: pe ? "\u25BC" : "\u25B6"
                          })]
                        })
                      }), Q.map(oe => {
                        let he = Y.fys[oe.be];
                        return q(xn.Fragment, {
                          children: [M("td", {
                            style: {
                              ...V.td,
                              fontWeight: 800
                            },
                            children: fe(he.opd_visits + he.ipd_admissions)
                          }), M("td", {
                            style: {
                              ...V.td,
                              fontWeight: 800,
                              borderRight: "2px solid var(--md-border)"
                            },
                            children: fe(he.total_income)
                          })]
                        }, oe.be)
                      }), M("td", {
                        style: {
                          ...V.td,
                          textAlign: "center",
                          fontWeight: 800
                        },
                        children: M(ot, {
                          value: Y.income_growth
                        })
                      }), M("td", {
                        style: {
                          ...V.td,
                          textAlign: "center"
                        },
                        children: Pe ? M("span", {
                          style: V.badge("rgba(220,38,38,.1)", "#dc2626"),
                          children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                        }) : M("span", {
                          style: V.badge("rgba(5,150,105,.1)", "#059669"),
                          children: "\u0E1B\u0E01\u0E15\u0E34"
                        })
                      })]
                    }), pe && de.map((oe, he) => {
                      let ve = oe.flag_low_collection || oe.flag_high_outstanding;
                      return q("tr", {
                        style: {
                          background: he % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                        },
                        children: [q("td", {
                          style: {
                            ...V.tdName,
                            paddingLeft: "36px",
                            borderRight: "2px solid var(--md-border)",
                            fontSize: "10px"
                          },
                          children: [M("span", {
                            style: {
                              color: "var(--md-text-tertiary)",
                              marginRight: "6px"
                            },
                            children: "\u21B3"
                          }), M("span", {
                            style: {
                              fontWeight: 700
                            },
                            children: oe.pttype_code
                          }), M("span", {
                            style: {
                              marginLeft: "4px",
                              fontWeight: 500,
                              color: "var(--md-text-secondary)"
                            },
                            children: oe.pttype_name
                          }), M("button", {
                            onClick: Me => {
                              Me.stopPropagation(), $(oe)
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
                        }), Q.map(Me => {
                          let ke = oe.fys[Me.be];
                          return q(xn.Fragment, {
                            children: [M("td", {
                              style: {
                                ...V.td,
                                fontSize: "10px"
                              },
                              children: fe(ke.opd_visits + ke.ipd_admissions)
                            }), M("td", {
                              style: {
                                ...V.td,
                                fontSize: "10px",
                                borderRight: "2px solid var(--md-border)"
                              },
                              children: fe(ke.total_income)
                            })]
                          }, Me.be)
                        }), M("td", {
                          style: {
                            ...V.td,
                            textAlign: "center",
                            fontSize: "10px"
                          },
                          children: M(ot, {
                            value: oe.income_growth
                          })
                        }), M("td", {
                          style: {
                            ...V.td,
                            textAlign: "center",
                            fontSize: "9px"
                          },
                          children: ve ? M("span", {
                            style: V.badge("rgba(220,38,38,.08)", "#dc2626"),
                            children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                          }) : M("span", {
                            style: V.badge("rgba(5,150,105,.08)", "#059669"),
                            children: "\u0E1B\u0E01\u0E15\u0E34"
                          })
                        })]
                      }, `${Y.group_name}-${oe.pttype_code}`)
                    })]
                  }, Y.group_name)
                }) : e.payers.map((Y, se) => {
                  let Pe = Y.flag_low_collection || Y.flag_high_outstanding,
                    me = Pe ? "rgba(220,38,38,.04)" : se % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))";
                  return q("tr", {
                    style: {
                      background: me
                    },
                    children: [M("td", {
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
                        children: [M("span", {
                          style: {
                            fontWeight: 800,
                            textDecoration: "underline dotted"
                          },
                          children: Y.pttype_code
                        }), M("span", {
                          style: {
                            marginLeft: "4px",
                            fontWeight: 600,
                            color: "var(--md-text-secondary)",
                            fontSize: "10px"
                          },
                          children: Y.pttype_name
                        }), Y.group_name && M("span", {
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
                    }), Q.map(pe => {
                      let de = Y.fys[pe.be];
                      return q(xn.Fragment, {
                        children: [M("td", {
                          style: V.td,
                          children: fe(de.opd_visits + de.ipd_admissions)
                        }), M("td", {
                          style: {
                            ...V.td,
                            fontWeight: 700,
                            borderRight: "2px solid var(--md-border)"
                          },
                          children: fe(de.total_income)
                        })]
                      }, pe.be)
                    }), M("td", {
                      style: {
                        ...V.td,
                        textAlign: "center"
                      },
                      children: M(ot, {
                        value: Y.income_growth
                      })
                    }), M("td", {
                      style: {
                        ...V.td,
                        textAlign: "center"
                      },
                      children: Pe ? M("span", {
                        style: V.badge("rgba(220,38,38,.1)", "#dc2626"),
                        children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                      }) : M("span", {
                        style: V.badge("rgba(5,150,105,.1)", "#059669"),
                        children: "\u0E1B\u0E01\u0E15\u0E34"
                      })
                    })]
                  }, Y.pttype_code)
                })
              }), M("tfoot", {
                children: q("tr", {
                  style: {
                    background: "rgba(14,165,233,.06)"
                  },
                  children: [M("td", {
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
                    let se = N[Y.be];
                    return q(xn.Fragment, {
                      children: [M("td", {
                        style: {
                          ...V.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: fe(se.opd_visits + se.ipd_admissions)
                      }), M("td", {
                        style: {
                          ...V.td,
                          fontWeight: 900,
                          borderRight: "2px solid var(--md-border)",
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: fe(se.total_income)
                      })]
                    }, Y.be)
                  }), M("td", {
                    style: {
                      ...V.td,
                      textAlign: "center",
                      fontWeight: 900,
                      borderTop: "2px solid var(--md-border)"
                    },
                    children: M(ot, {
                      value: H_(N[Q[2].be]?.total_income, N[Q[1].be]?.total_income)
                    })
                  }), M("td", {
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
    })(), !p && e && Q.length === 3 && v === "payer-detail" && (() => {
      let re = e.payers.filter(ie => ie._sort_income > 0).slice(0, 12).map(ie => {
        let Y = {
          name: ie.pttype_code
        };
        for (let se of Q) Y[`fy${se.be}`] = ie.fys[se.be].total_income;
        return Y
      });
      return q(Ra, {
        children: [q("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [M("div", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              marginBottom: "12px"
            },
            children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34 (Top 12) \u2014 3 \u0E1B\u0E35\u0E07\u0E1A\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A"
          }), M(Eu, {
            width: "100%",
            height: 350,
            children: q(Cd, {
              data: re,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [M(Pa, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), M(cr, {
                dataKey: "name",
                tick: {
                  fontSize: 10,
                  fontWeight: 700
                },
                interval: 0,
                angle: -30,
                textAnchor: "end",
                height: 50
              }), M(fr, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: ie => ie >= 1e6 ? `${(ie/1e6).toFixed(1)}M` : ie >= 1e3 ? `${(ie/1e3).toFixed(0)}K` : ie
              }), M(dt, {
                content: M(it, {})
              }), M(Dt, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), Q.map((ie, Y) => M(Gt, {
                dataKey: `fy${ie.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${ie.be}`,
                fill: Na[Y],
                radius: [3, 3, 0, 0]
              }, ie.be))]
            })
          })]
        }), M("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "12px"
          },
          children: e.payers.filter(ie => ie._sort_income > 0).slice(0, 20).map((ie, Y) => {
            let se = ie.flag_low_collection || ie.flag_high_outstanding,
              Pe = ie.fys[Q[2].be];
            return q("div", {
              className: "rounded-2xl p-4",
              style: {
                background: "var(--md-surface)",
                border: se ? "1.5px solid rgba(220,38,38,.3)" : "1px solid var(--md-border)"
              },
              children: [q("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px"
                },
                children: [q("button", {
                  onClick: () => $(ie),
                  style: {
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left"
                  },
                  title: "\u0E04\u0E25\u0E34\u0E01\u0E14\u0E39\u0E23\u0E32\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Top 50",
                  children: [M("span", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: G_[Y % G_.length],
                      textDecoration: "underline dotted"
                    },
                    children: ie.pttype_code
                  }), M("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-secondary)",
                      marginLeft: "6px"
                    },
                    children: ie.pttype_name
                  }), M("span", {
                    style: {
                      marginLeft: "6px",
                      fontSize: "10px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: "\u{1F50D}"
                  })]
                }), se ? M("span", {
                  style: V.badge("rgba(220,38,38,.1)", "#dc2626"),
                  children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                }) : M("span", {
                  style: V.badge("rgba(5,150,105,.1)", "#059669"),
                  children: "\u0E1B\u0E01\u0E15\u0E34"
                })]
              }), (() => {
                let me = ie.fys[Q[2].be],
                  pe = me.opd_drug || 0,
                  de = me.opd_lab || 0,
                  oe = me.opd_xray || 0,
                  he = pe + de + oe;
                if (he === 0) return null;
                let ve = pe / he * 100,
                  Me = de / he * 100,
                  ke = oe / he * 100;
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
                    children: [M("span", {
                      children: "Service Mix (\u0E1B\u0E35\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14)"
                    }), q("span", {
                      children: [fe(he), " \u0E1A\u0E32\u0E17"]
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      height: "8px",
                      borderRadius: "99px",
                      overflow: "hidden",
                      background: "var(--md-surface-2, rgba(0,0,0,.04))"
                    },
                    children: [pe > 0 && M("div", {
                      style: {
                        width: `${ve}%`,
                        background: Fi.drug
                      },
                      title: `\u{1F48A} \u0E04\u0E48\u0E32\u0E22\u0E32: ${fe(pe)} \u0E1A\u0E32\u0E17 (${ve.toFixed(1)}%)`
                    }), de > 0 && M("div", {
                      style: {
                        width: `${Me}%`,
                        background: Fi.lab
                      },
                      title: `\u{1F52C} \u0E04\u0E48\u0E32 Lab: ${fe(de)} \u0E1A\u0E32\u0E17 (${Me.toFixed(1)}%)`
                    }), oe > 0 && M("div", {
                      style: {
                        width: `${ke}%`,
                        background: Fi.xray
                      },
                      title: `\u2622\uFE0F \u0E04\u0E48\u0E32 X-ray: ${fe(oe)} \u0E1A\u0E32\u0E17 (${ke.toFixed(1)}%)`
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      gap: "10px",
                      fontSize: "9px",
                      fontWeight: 700,
                      marginTop: "3px"
                    },
                    children: [pe > 0 && q("span", {
                      style: {
                        color: Fi.drug
                      },
                      children: ["\u{1F48A} \u0E22\u0E32 ", ve.toFixed(0), "%"]
                    }), de > 0 && q("span", {
                      style: {
                        color: Fi.lab
                      },
                      children: ["\u{1F52C} Lab ", Me.toFixed(0), "%"]
                    }), oe > 0 && q("span", {
                      style: {
                        color: Fi.xray
                      },
                      children: ["\u2622\uFE0F Xray ", ke.toFixed(0), "%"]
                    })]
                  })]
                })
              })(), q("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "10px"
                },
                children: [M("thead", {
                  children: q("tr", {
                    children: [M("th", {
                      style: {
                        textAlign: "left",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E1B\u0E35\u0E07\u0E1A"
                    }), M("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), M("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), M("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                    }), M("th", {
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
                }), M("tbody", {
                  children: Q.map((me, pe) => {
                    let de = ie.fys[me.be];
                    return q("tr", {
                      style: {
                        fontWeight: pe === 2 ? 800 : 600
                      },
                      children: [M("td", {
                        style: {
                          textAlign: "left",
                          padding: "3px 4px",
                          color: Na[pe]
                        },
                        children: me.be
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: fe(de.opd_visits + de.ipd_admissions)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: fe(de.total_income)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: de.total_outstanding > 0 ? "#dc2626" : "inherit"
                        },
                        children: fe(de.total_outstanding)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: de.collection_rate >= 90 ? "#059669" : de.collection_rate >= 80 ? "#d97706" : "#dc2626"
                        },
                        children: de.total_income > 0 ? Da(de.collection_rate) : "\u2014"
                      })]
                    }, me.be)
                  })
                })]
              }), q("div", {
                style: {
                  marginTop: "6px",
                  fontSize: "10px",
                  fontWeight: 800
                },
                children: [M("span", {
                  style: {
                    color: "var(--md-text-tertiary)"
                  },
                  children: "Growth: "
                }), M(ot, {
                  value: ie.income_growth
                }), Pe.ipd_avg_rw > 0 && q("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["Avg RW: ", M("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: Pe.ipd_avg_rw.toFixed(2)
                  })]
                }), Pe.ipd_avg_los > 0 && q("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["LOS: ", q("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: [Pe.ipd_avg_los.toFixed(1), "d"]
                  })]
                })]
              })]
            }, ie.pttype_code)
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
        children: [M("span", {
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
          children: [M("option", {
            value: "",
            children: "\u0E17\u0E38\u0E01\u0E2A\u0E34\u0E17\u0E18\u0E34"
          }), (e?.payers || []).map(N => q("option", {
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
        children: [M("div", {
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
            children: ["Top \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23 \u2014 \u0E1B\u0E35\u0E07\u0E1A ", i.fiscal_year?.be || ge[2], w && q("span", {
              style: {
                ...V.badge("rgba(124,58,237,.1)", "#7c3aed"),
                marginLeft: "8px"
              },
              children: ["\u0E2A\u0E34\u0E17\u0E18\u0E34: ", w]
            })]
          })
        }), M("div", {
          style: {
            overflowX: "auto"
          },
          children: q("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse"
            },
            children: [M("thead", {
              children: q("tr", {
                style: {
                  background: "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("th", {
                  style: {
                    ...V.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), M("th", {
                  style: {
                    ...V.th,
                    textAlign: "left"
                  },
                  children: "ICD-10"
                }), M("th", {
                  style: {
                    ...V.th,
                    textAlign: "left"
                  },
                  children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23"
                }), M("th", {
                  style: V.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), M("th", {
                  style: V.th,
                  children: "\u0E04\u0E19"
                }), M("th", {
                  style: V.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                })]
              })
            }), M("tbody", {
              children: i.diagnoses.map((N, re) => q("tr", {
                style: {
                  background: re % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("td", {
                  style: {
                    ...V.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: re + 1
                }), M("td", {
                  style: {
                    ...V.td,
                    textAlign: "left",
                    fontWeight: 800,
                    fontFamily: "monospace"
                  },
                  children: N.icd10
                }), M("td", {
                  style: V.tdName,
                  children: N.name
                }), M("td", {
                  style: V.td,
                  children: fe(N.visits)
                }), M("td", {
                  style: V.td,
                  children: fe(N.patients)
                }), M("td", {
                  style: {
                    ...V.td,
                    fontWeight: 700
                  },
                  children: fe(N.income)
                })]
              }, N.icd10))
            })]
          })
        })]
      })]
    }), !p && v === "patient-insight" && (a ? (() => {
      let N = a.loyalty,
        re = a.demographics,
        ie = a.inactive,
        Y = a.fiscal_year?.be,
        se = re.age_bands,
        Pe = se.lt18 + se.a18_34 + se.a35_59 + se.gte60,
        me = re.sex.male + re.sex.female,
        pe = N.total_unique - me,
        de = oe => oe ? new Date(oe).toLocaleDateString("th-TH", {
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
            }), M("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#0284c7",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: fe(N.total_unique)
            }), q("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [fe(N.total_visits), " visits \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", M("b", {
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
            children: [M("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u2728 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48 (First Visit \u0E43\u0E19\u0E1B\u0E35\u0E19\u0E35\u0E49)"
            }), M("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#059669",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: fe(N.new_patients)
            }), q("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [M("b", {
                style: {
                  color: "#059669"
                },
                children: Da(N.new_pct)
              }), " \u0E02\u0E2D\u0E07 ", fe(N.total_unique), " \u0E23\u0E32\u0E22"]
            })]
          }), q("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #7c3aed"
            },
            children: [M("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u{1F501} \u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33"
            }), M("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#7c3aed",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: fe(N.returning_patients)
            }), q("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [M("b", {
                style: {
                  color: "#7c3aed"
                },
                children: Da(N.returning_pct)
              }), " \xB7 Retention rate"]
            })]
          }), q("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #d97706"
            },
            children: [M("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21"
            }), M("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#d97706",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: fe(N.total_income)
            }), q("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: ["\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", M("b", {
                children: fe(N.total_unique > 0 ? Math.round(N.total_income / N.total_unique) : 0)
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
            children: [M("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)",
                marginBottom: "12px"
              },
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38"
            }), [{
              label: "<18 \u0E1B\u0E35 (\u0E40\u0E14\u0E47\u0E01/\u0E40\u0E22\u0E32\u0E27\u0E0A\u0E19)",
              val: se.lt18,
              color: "#3b82f6"
            }, {
              label: "18-34 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19\u0E15\u0E49\u0E19)",
              val: se.a18_34,
              color: "#10b981"
            }, {
              label: "35-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E01\u0E25\u0E32\u0E07)",
              val: se.a35_59,
              color: "#f59e0b"
            }, {
              label: "60+ \u0E1B\u0E35 (\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38)",
              val: se.gte60,
              color: "#ef4444"
            }].map(oe => {
              let he = Pe > 0 ? oe.val / Pe * 100 : 0;
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
                  children: [M("span", {
                    style: {
                      color: "var(--md-text-secondary)"
                    },
                    children: oe.label
                  }), q("span", {
                    style: {
                      color: oe.color,
                      fontVariantNumeric: "tabular-nums"
                    },
                    children: [fe(oe.val), " ", q("span", {
                      style: {
                        color: "var(--md-text-tertiary)",
                        fontWeight: 600
                      },
                      children: ["(", he.toFixed(1), "%)"]
                    })]
                  })]
                }), M("div", {
                  style: {
                    height: "8px",
                    background: "var(--md-surface-2, rgba(0,0,0,.04))",
                    borderRadius: "99px",
                    overflow: "hidden"
                  },
                  children: M("div", {
                    style: {
                      width: `${he}%`,
                      height: "100%",
                      background: oe.color,
                      borderRadius: "99px",
                      transition: "width .4s ease"
                    }
                  })
                })]
              }, oe.label)
            })]
          }), q("div", {
            className: "rounded-2xl p-5",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [M("div", {
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
                  val: re.sex.male,
                  color: "#3b82f6",
                  icon: "\u2642"
                }, {
                  label: "\u0E2B\u0E0D\u0E34\u0E07",
                  val: re.sex.female,
                  color: "#ec4899",
                  icon: "\u2640"
                }].map(oe => {
                  let he = me > 0 ? oe.val / me * 100 : 0;
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
                          color: oe.color
                        },
                        children: [oe.icon, " ", oe.label]
                      }), M("span", {
                        style: {
                          fontSize: "14px",
                          fontWeight: 900,
                          color: oe.color,
                          fontVariantNumeric: "tabular-nums"
                        },
                        children: fe(oe.val)
                      })]
                    }), q("div", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        marginBottom: "4px"
                      },
                      children: [he.toFixed(1), "%"]
                    }), M("div", {
                      style: {
                        height: "6px",
                        background: "var(--md-surface-2, rgba(0,0,0,.04))",
                        borderRadius: "99px",
                        overflow: "hidden"
                      },
                      children: M("div", {
                        style: {
                          width: `${he}%`,
                          height: "100%",
                          background: oe.color,
                          borderRadius: "99px"
                        }
                      })
                    })]
                  }, oe.label)
                }), pe > 0 && q("div", {
                  style: {
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: ["\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38: ", fe(pe), " \u0E23\u0E32\u0E22"]
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
            children: [M("div", {
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
              children: ["Total \u0E17\u0E35\u0E48\u0E40\u0E04\u0E22\u0E21\u0E32\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", fe(ie.total_patients_ever), " \u0E23\u0E32\u0E22"]
            })]
          }), M("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px"
            },
            children: [{
              label: "\u0E02\u0E32\u0E14 3-6 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: ie.inactive_3_6mo,
              color: "#d97706",
              hint: "\u0E43\u0E01\u0E25\u0E49\u0E40\u0E02\u0E49\u0E32\u0E19\u0E31\u0E14 \xB7 proactive call"
            }, {
              label: "\u0E02\u0E32\u0E14 6-12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: ie.inactive_6_12mo,
              color: "#dc2626",
              hint: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35 \xB7 NCD/chronic risk"
            }, {
              label: "\u0E02\u0E32\u0E14 >12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: ie.inactive_12mo_plus,
              color: "#7c3aed",
              hint: "\u0E23\u0E2D\u0E1A recall \u0E43\u0E2B\u0E0D\u0E48 \xB7 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E2B\u0E32\u0E22\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27"
            }].map(oe => q("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: `${oe.color}08`,
                border: `1px solid ${oe.color}25`
              },
              children: [M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 700,
                  color: oe.color,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  marginBottom: "4px"
                },
                children: oe.label
              }), M("div", {
                style: {
                  fontSize: "22px",
                  fontWeight: 900,
                  color: oe.color,
                  fontVariantNumeric: "tabular-nums"
                },
                children: fe(oe.val)
              }), M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-secondary)",
                  marginTop: "4px"
                },
                children: oe.hint
              })]
            }, oe.label))
          })]
        }), M("div", {
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
          }].map(oe => q("div", {
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
                background: `linear-gradient(135deg, ${oe.accent}08, transparent)`
              },
              children: [M("div", {
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                  color: oe.accent
                },
                children: oe.title
              }), M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: oe.hint
              })]
            }), M("div", {
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
                children: [M("thead", {
                  style: {
                    position: "sticky",
                    top: 0,
                    background: "var(--md-surface)",
                    zIndex: 1
                  },
                  children: q("tr", {
                    children: [M("th", {
                      style: {
                        ...V.th,
                        textAlign: "center",
                        width: "32px"
                      },
                      children: "#"
                    }), M("th", {
                      style: {
                        ...V.th,
                        textAlign: "left"
                      },
                      children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                    }), M("th", {
                      style: V.th,
                      children: "\u0E2D\u0E32\u0E22\u0E38"
                    }), M("th", {
                      style: V.th,
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), M("th", {
                      style: V.th,
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), M("th", {
                      style: {
                        ...V.th,
                        textAlign: "left"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                    })]
                  })
                }), q("tbody", {
                  children: [(oe.list || []).map((he, ve) => q("tr", {
                    style: {
                      background: ve % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                    },
                    children: [M("td", {
                      style: {
                        ...V.td,
                        textAlign: "center",
                        color: "var(--md-text-tertiary)"
                      },
                      children: ve + 1
                    }), q("td", {
                      style: V.tdName,
                      children: [M("div", {
                        style: {
                          fontFamily: "monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "var(--md-text-tertiary)"
                        },
                        children: he.hn
                      }), M("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: 700
                        },
                        children: he.pt_name || "\u2014"
                      })]
                    }), M("td", {
                      style: V.td,
                      children: he.age || "\u2014"
                    }), M("td", {
                      style: {
                        ...V.td,
                        fontWeight: 800,
                        color: oe.accent
                      },
                      children: fe(he.visit_count)
                    }), M("td", {
                      style: {
                        ...V.td,
                        fontWeight: 800
                      },
                      children: fe(he.total_income)
                    }), M("td", {
                      style: {
                        ...V.td,
                        textAlign: "left",
                        fontSize: "10px",
                        color: "var(--md-text-secondary)"
                      },
                      children: de(he.last_visit)
                    })]
                  }, he.hn)), (!oe.list || oe.list.length === 0) && M("tr", {
                    children: M("td", {
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
          }, oe.title))
        })]
      })
    })() : M("div", {
      style: {
        textAlign: "center",
        padding: "40px 0",
        color: "var(--md-text-tertiary)",
        fontWeight: 700
      },
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23..."
    })), !p && v === "aging" && (s ? (() => {
      let N = s.payers || [],
        re = s.grand_total || {},
        ie = re.total_outstanding || 0;
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
            children: [M("div", {
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
            children: [xl.map((Y, se) => {
              let Pe = re[Y] || 0,
                me = ie > 0 ? Pe / ie * 100 : 0;
              return q("div", {
                style: {
                  padding: "12px",
                  borderRadius: "10px",
                  background: `${zi[se]}10`,
                  borderLeft: `4px solid ${zi[se]}`
                },
                children: [M("div", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 800,
                    color: zi[se],
                    textTransform: "uppercase",
                    letterSpacing: ".04em"
                  },
                  children: wl[se]
                }), M("div", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    fontFamily: "monospace",
                    marginTop: "4px"
                  },
                  children: fe(Pe)
                }), q("div", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: zi[se],
                    marginTop: "2px"
                  },
                  children: [me.toFixed(1), "%"]
                })]
              }, Y)
            }), q("div", {
              style: {
                padding: "12px",
                borderRadius: "10px",
                background: "rgba(0,0,0,.04)",
                borderLeft: "4px solid var(--md-text-secondary)"
              },
              children: [M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "var(--md-text-secondary)",
                  textTransform: "uppercase"
                },
                children: "\u0E23\u0E27\u0E21"
              }), M("div", {
                style: {
                  fontSize: "20px",
                  fontWeight: 900,
                  color: "var(--md-text-primary)",
                  fontFamily: "monospace",
                  marginTop: "4px"
                },
                children: fe(ie)
              }), M("div", {
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
          children: [M("div", {
            style: {
              padding: "12px 18px",
              borderBottom: "1px solid var(--md-border)",
              background: "linear-gradient(135deg, rgba(220,38,38,.04), rgba(217,119,6,.04))"
            },
            children: M("div", {
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
            children: [N.map((Y, se) => {
              let Pe = xl.map((me, pe) => ({
                v: Y[me] || 0,
                color: zi[pe],
                label: wl[pe]
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
                    children: [M("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        textDecoration: "underline dotted"
                      },
                      children: Y.pttype_code
                    }), M("span", {
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
                    children: [fe(Y.total_outstanding), " \u0E1A\u0E32\u0E17"]
                  })]
                }), M("div", {
                  style: {
                    display: "flex",
                    height: "24px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "var(--md-surface-2, rgba(0,0,0,.04))"
                  },
                  children: Pe.map((me, pe) => {
                    if (me.v === 0) return null;
                    let de = Y.total_outstanding > 0 ? me.v / Y.total_outstanding * 100 : 0;
                    return M("div", {
                      style: {
                        width: `${de}%`,
                        background: me.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                      },
                      title: `${me.label}: ${fe(me.v)} \u0E1A\u0E32\u0E17 (${de.toFixed(1)}%)`,
                      children: de >= 8 && q("span", {
                        style: {
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#fff",
                          textShadow: "0 0 3px rgba(0,0,0,.3)"
                        },
                        children: [de.toFixed(0), "%"]
                      })
                    }, pe)
                  })
                })]
              }, Y.pttype_code)
            }), N.length === 0 && M("div", {
              style: {
                textAlign: "center",
                padding: "24px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700
              },
              children: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E43\u0E19\u0E1B\u0E35\u0E07\u0E1A\u0E19\u0E35\u0E49"
            })]
          })]
        }), M("div", {
          className: "rounded-2xl p-3",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center"
          },
          children: wl.map((Y, se) => q("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px"
            },
            children: [M("span", {
              style: {
                width: "14px",
                height: "14px",
                borderRadius: "3px",
                background: zi[se]
              }
            }), M("span", {
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
    })() : M("div", {
      style: {
        textAlign: "center",
        padding: "40px 0",
        color: "var(--md-text-tertiary)",
        fontWeight: 700
      },
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30..."
    })), W && M("div", {
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
      onClick: Oe,
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
            }), M("div", {
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
            children: [M("span", {
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
              children: [M("option", {
                value: "outstanding",
                children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14"
              }), M("option", {
                value: "income",
                children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14"
              }), M("option", {
                value: "visits",
                children: "\u0E21\u0E32\u0E1A\u0E48\u0E2D\u0E22\u0E2A\u0E38\u0E14"
              })]
            }), M("button", {
              onClick: Oe,
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
        }), M("div", {
          style: {
            overflowY: "auto",
            flex: 1
          },
          children: O ? M("div", {
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
            children: [M("thead", {
              style: {
                position: "sticky",
                top: 0,
                background: "var(--md-surface)",
                zIndex: 1
              },
              children: q("tr", {
                children: [M("th", {
                  style: {
                    ...V.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), M("th", {
                  style: {
                    ...V.th,
                    textAlign: "left"
                  },
                  children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                }), M("th", {
                  style: V.th,
                  children: "\u0E2D\u0E32\u0E22\u0E38"
                }), M("th", {
                  style: V.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), M("th", {
                  style: V.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                }), M("th", {
                  style: V.th,
                  children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                }), M("th", {
                  style: V.th,
                  children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                }), M("th", {
                  style: {
                    ...V.th,
                    textAlign: "left"
                  },
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                })]
              })
            }), M("tbody", {
              children: H.patients.map((N, re) => q("tr", {
                style: {
                  background: re % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("td", {
                  style: {
                    ...V.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: re + 1
                }), q("td", {
                  style: V.tdName,
                  children: [M("div", {
                    style: {
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: N.hn
                  }), M("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700
                    },
                    children: N.pt_name || "\u2014"
                  })]
                }), M("td", {
                  style: V.td,
                  children: N.age || "\u2014"
                }), M("td", {
                  style: V.td,
                  children: fe(N.visit_count)
                }), M("td", {
                  style: {
                    ...V.td,
                    fontWeight: 800
                  },
                  children: fe(N.total_income)
                }), M("td", {
                  style: {
                    ...V.td,
                    fontWeight: 800,
                    color: N.total_outstanding > 0 ? "#dc2626" : "inherit"
                  },
                  children: fe(N.total_outstanding)
                }), M("td", {
                  style: {
                    ...V.td,
                    fontWeight: 800,
                    color: N.collection_rate >= 90 ? "#059669" : N.collection_rate >= 80 ? "#d97706" : "#dc2626"
                  },
                  children: Da(N.collection_rate)
                }), M("td", {
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
          }) : M("div", {
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
    }), M(kd, {
      data: P,
      theme: "customer",
      title: "AI Customer Intelligence"
    }), !p && e && q("div", {
      style: {
        textAlign: "center",
        fontSize: "10px",
        fontWeight: 600,
        color: "var(--md-text-tertiary)",
        padding: "8px 0"
      },
      children: [e.data_source, " \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ", new Date(e.timestamp).toLocaleString("th-TH")]
    })]
  })
}
var Hoe = xn.memo(a4);
export {
  Hoe as
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