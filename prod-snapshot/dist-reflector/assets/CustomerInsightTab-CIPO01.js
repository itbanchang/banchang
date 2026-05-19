var F_ = Object.create;
var yl = Object.defineProperty;
var $_ = Object.getOwnPropertyDescriptor;
var U_ = Object.getOwnPropertyNames;
var H_ = Object.getPrototypeOf,
  G_ = Object.prototype.hasOwnProperty;
var I = (e, t) => () => (t || e((t = {
    exports: {}
  }).exports, t), t.exports),
  K_ = (e, t) => {
    for (var r in t) yl(e, r, {
      get: t[r],
      enumerable: !0
    })
  },
  V_ = (e, t, r, n) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let i of U_(t)) !G_.call(e, i) && i !== r && yl(e, i, {
        get: () => t[i],
        enumerable: !(n = $_(t, i)) || n.enumerable
      });
    return e
  };
var Q = (e, t, r) => (r = e != null ? F_(H_(e)) : {}, V_(t || !e || !e.__esModule ? yl(r, "default", {
  value: e,
  enumerable: !0
}) : r, e));
var rt = I((n5, jd) => {
  var Y_ = Array.isArray;
  jd.exports = Y_
});
var vl = I((i5, Md) => {
  var Z_ = typeof global == "object" && global && global.Object === Object && global;
  Md.exports = Z_
});
var Dt = I((o5, Cd) => {
  var J_ = vl(),
    Q_ = typeof self == "object" && self && self.Object === Object && self,
    eP = J_ || Q_ || Function("return this")();
  Cd.exports = eP
});
var hn = I((a5, Id) => {
  var tP = Dt(),
    rP = tP.Symbol;
  Id.exports = rP
});
var Rd = I((u5, Nd) => {
  var kd = hn(),
    Dd = Object.prototype,
    nP = Dd.hasOwnProperty,
    iP = Dd.toString,
    qi = kd ? kd.toStringTag : void 0;

  function oP(e) {
    var t = nP.call(e, qi),
      r = e[qi];
    try {
      e[qi] = void 0;
      var n = !0
    } catch {}
    var i = iP.call(e);
    return n && (t ? e[qi] = r : delete e[qi]), i
  }
  Nd.exports = oP
});
var Bd = I((s5, Ld) => {
  var aP = Object.prototype,
    uP = aP.toString;

  function sP(e) {
    return uP.call(e)
  }
  Ld.exports = sP
});
var Gt = I((l5, zd) => {
  var qd = hn(),
    lP = Rd(),
    cP = Bd(),
    fP = "[object Null]",
    pP = "[object Undefined]",
    Wd = qd ? qd.toStringTag : void 0;

  function dP(e) {
    return e == null ? e === void 0 ? pP : fP : Wd && Wd in Object(e) ? lP(e) : cP(e)
  }
  zd.exports = dP
});
var Kt = I((c5, Fd) => {
  function mP(e) {
    return e != null && typeof e == "object"
  }
  Fd.exports = mP
});
var Dr = I((f5, $d) => {
  var hP = Gt(),
    yP = Kt(),
    vP = "[object Symbol]";

  function gP(e) {
    return typeof e == "symbol" || yP(e) && hP(e) == vP
  }
  $d.exports = gP
});
var Ma = I((p5, Ud) => {
  var bP = rt(),
    xP = Dr(),
    wP = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    OP = /^\w*$/;

  function SP(e, t) {
    if (bP(e)) return !1;
    var r = typeof e;
    return r == "number" || r == "symbol" || r == "boolean" || e == null || xP(e) ? !0 : OP.test(e) || !wP.test(e) || t != null && e in Object(t)
  }
  Ud.exports = SP
});
var wt = I((d5, Hd) => {
  function AP(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function")
  }
  Hd.exports = AP
});
var De = I((m5, Gd) => {
  var _P = Gt(),
    PP = wt(),
    TP = "[object AsyncFunction]",
    EP = "[object Function]",
    jP = "[object GeneratorFunction]",
    MP = "[object Proxy]";

  function CP(e) {
    if (!PP(e)) return !1;
    var t = _P(e);
    return t == EP || t == jP || t == TP || t == MP
  }
  Gd.exports = CP
});
var Vd = I((h5, Kd) => {
  var IP = Dt(),
    kP = IP["__core-js_shared__"];
  Kd.exports = kP
});
var Zd = I((y5, Yd) => {
  var gl = Vd(),
    Xd = function() {
      var e = /[^.]+$/.exec(gl && gl.keys && gl.keys.IE_PROTO || "");
      return e ? "Symbol(src)_1." + e : ""
    }();

  function DP(e) {
    return !!Xd && Xd in e
  }
  Yd.exports = DP
});
var bl = I((v5, Jd) => {
  var NP = Function.prototype,
    RP = NP.toString;

  function LP(e) {
    if (e != null) {
      try {
        return RP.call(e)
      } catch {}
      try {
        return e + ""
      } catch {}
    }
    return ""
  }
  Jd.exports = LP
});
var em = I((g5, Qd) => {
  var BP = De(),
    qP = Zd(),
    WP = wt(),
    zP = bl(),
    FP = /[\\^$.*+?()[\]{}|]/g,
    $P = /^\[object .+?Constructor\]$/,
    UP = Function.prototype,
    HP = Object.prototype,
    GP = UP.toString,
    KP = HP.hasOwnProperty,
    VP = RegExp("^" + GP.call(KP).replace(FP, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

  function XP(e) {
    if (!WP(e) || qP(e)) return !1;
    var t = BP(e) ? VP : $P;
    return t.test(zP(e))
  }
  Qd.exports = XP
});
var rm = I((b5, tm) => {
  function YP(e, t) {
    return e?.[t]
  }
  tm.exports = YP
});
var gr = I((x5, nm) => {
  var ZP = em(),
    JP = rm();

  function QP(e, t) {
    var r = JP(e, t);
    return ZP(r) ? r : void 0
  }
  nm.exports = QP
});
var Wi = I((w5, im) => {
  var eT = gr(),
    tT = eT(Object, "create");
  im.exports = tT
});
var um = I((O5, am) => {
  var om = Wi();

  function rT() {
    this.__data__ = om ? om(null) : {}, this.size = 0
  }
  am.exports = rT
});
var lm = I((S5, sm) => {
  function nT(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t
  }
  sm.exports = nT
});
var fm = I((A5, cm) => {
  var iT = Wi(),
    oT = "__lodash_hash_undefined__",
    aT = Object.prototype,
    uT = aT.hasOwnProperty;

  function sT(e) {
    var t = this.__data__;
    if (iT) {
      var r = t[e];
      return r === oT ? void 0 : r
    }
    return uT.call(t, e) ? t[e] : void 0
  }
  cm.exports = sT
});
var dm = I((_5, pm) => {
  var lT = Wi(),
    cT = Object.prototype,
    fT = cT.hasOwnProperty;

  function pT(e) {
    var t = this.__data__;
    return lT ? t[e] !== void 0 : fT.call(t, e)
  }
  pm.exports = pT
});
var hm = I((P5, mm) => {
  var dT = Wi(),
    mT = "__lodash_hash_undefined__";

  function hT(e, t) {
    var r = this.__data__;
    return this.size += this.has(e) ? 0 : 1, r[e] = dT && t === void 0 ? mT : t, this
  }
  mm.exports = hT
});
var vm = I((T5, ym) => {
  var yT = um(),
    vT = lm(),
    gT = fm(),
    bT = dm(),
    xT = hm();

  function yn(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
      var n = e[t];
      this.set(n[0], n[1])
    }
  }
  yn.prototype.clear = yT;
  yn.prototype.delete = vT;
  yn.prototype.get = gT;
  yn.prototype.has = bT;
  yn.prototype.set = xT;
  ym.exports = yn
});
var bm = I((E5, gm) => {
  function wT() {
    this.__data__ = [], this.size = 0
  }
  gm.exports = wT
});
var Ca = I((j5, xm) => {
  function OT(e, t) {
    return e === t || e !== e && t !== t
  }
  xm.exports = OT
});
var zi = I((M5, wm) => {
  var ST = Ca();

  function AT(e, t) {
    for (var r = e.length; r--;)
      if (ST(e[r][0], t)) return r;
    return -1
  }
  wm.exports = AT
});
var Sm = I((C5, Om) => {
  var _T = zi(),
    PT = Array.prototype,
    TT = PT.splice;

  function ET(e) {
    var t = this.__data__,
      r = _T(t, e);
    if (r < 0) return !1;
    var n = t.length - 1;
    return r == n ? t.pop() : TT.call(t, r, 1), --this.size, !0
  }
  Om.exports = ET
});
var _m = I((I5, Am) => {
  var jT = zi();

  function MT(e) {
    var t = this.__data__,
      r = jT(t, e);
    return r < 0 ? void 0 : t[r][1]
  }
  Am.exports = MT
});
var Tm = I((k5, Pm) => {
  var CT = zi();

  function IT(e) {
    return CT(this.__data__, e) > -1
  }
  Pm.exports = IT
});
var jm = I((D5, Em) => {
  var kT = zi();

  function DT(e, t) {
    var r = this.__data__,
      n = kT(r, e);
    return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this
  }
  Em.exports = DT
});
var Fi = I((N5, Mm) => {
  var NT = bm(),
    RT = Sm(),
    LT = _m(),
    BT = Tm(),
    qT = jm();

  function vn(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
      var n = e[t];
      this.set(n[0], n[1])
    }
  }
  vn.prototype.clear = NT;
  vn.prototype.delete = RT;
  vn.prototype.get = LT;
  vn.prototype.has = BT;
  vn.prototype.set = qT;
  Mm.exports = vn
});
var Ia = I((R5, Cm) => {
  var WT = gr(),
    zT = Dt(),
    FT = WT(zT, "Map");
  Cm.exports = FT
});
var Dm = I((L5, km) => {
  var Im = vm(),
    $T = Fi(),
    UT = Ia();

  function HT() {
    this.size = 0, this.__data__ = {
      hash: new Im,
      map: new(UT || $T),
      string: new Im
    }
  }
  km.exports = HT
});
var Rm = I((B5, Nm) => {
  function GT(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
  }
  Nm.exports = GT
});
var $i = I((q5, Lm) => {
  var KT = Rm();

  function VT(e, t) {
    var r = e.__data__;
    return KT(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map
  }
  Lm.exports = VT
});
var qm = I((W5, Bm) => {
  var XT = $i();

  function YT(e) {
    var t = XT(this, e).delete(e);
    return this.size -= t ? 1 : 0, t
  }
  Bm.exports = YT
});
var zm = I((z5, Wm) => {
  var ZT = $i();

  function JT(e) {
    return ZT(this, e).get(e)
  }
  Wm.exports = JT
});
var $m = I((F5, Fm) => {
  var QT = $i();

  function eE(e) {
    return QT(this, e).has(e)
  }
  Fm.exports = eE
});
var Hm = I(($5, Um) => {
  var tE = $i();

  function rE(e, t) {
    var r = tE(this, e),
      n = r.size;
    return r.set(e, t), this.size += r.size == n ? 0 : 1, this
  }
  Um.exports = rE
});
var ka = I((U5, Gm) => {
  var nE = Dm(),
    iE = qm(),
    oE = zm(),
    aE = $m(),
    uE = Hm();

  function gn(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
      var n = e[t];
      this.set(n[0], n[1])
    }
  }
  gn.prototype.clear = nE;
  gn.prototype.delete = iE;
  gn.prototype.get = oE;
  gn.prototype.has = aE;
  gn.prototype.set = uE;
  Gm.exports = gn
});
var wl = I((H5, Vm) => {
  var Km = ka(),
    sE = "Expected a function";

  function xl(e, t) {
    if (typeof e != "function" || t != null && typeof t != "function") throw new TypeError(sE);
    var r = function() {
      var n = arguments,
        i = t ? t.apply(this, n) : n[0],
        o = r.cache;
      if (o.has(i)) return o.get(i);
      var a = e.apply(this, n);
      return r.cache = o.set(i, a) || o, a
    };
    return r.cache = new(xl.Cache || Km), r
  }
  xl.Cache = Km;
  Vm.exports = xl
});
var Ym = I((G5, Xm) => {
  var lE = wl(),
    cE = 500;

  function fE(e) {
    var t = lE(e, function(n) {
        return r.size === cE && r.clear(), n
      }),
      r = t.cache;
    return t
  }
  Xm.exports = fE
});
var Jm = I((K5, Zm) => {
  var pE = Ym(),
    dE = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    mE = /\\(\\)?/g,
    hE = pE(function(e) {
      var t = [];
      return e.charCodeAt(0) === 46 && t.push(""), e.replace(dE, function(r, n, i, o) {
        t.push(i ? o.replace(mE, "$1") : n || r)
      }), t
    });
  Zm.exports = hE
});
var Da = I((V5, Qm) => {
  function yE(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n;) i[r] = t(e[r], r, e);
    return i
  }
  Qm.exports = yE
});
var oh = I((X5, ih) => {
  var eh = hn(),
    vE = Da(),
    gE = rt(),
    bE = Dr(),
    xE = 1 / 0,
    th = eh ? eh.prototype : void 0,
    rh = th ? th.toString : void 0;

  function nh(e) {
    if (typeof e == "string") return e;
    if (gE(e)) return vE(e, nh) + "";
    if (bE(e)) return rh ? rh.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -xE ? "-0" : t
  }
  ih.exports = nh
});
var Ol = I((Y5, ah) => {
  var wE = oh();

  function OE(e) {
    return e == null ? "" : wE(e)
  }
  ah.exports = OE
});
var Sl = I((Z5, uh) => {
  var SE = rt(),
    AE = Ma(),
    _E = Jm(),
    PE = Ol();

  function TE(e, t) {
    return SE(e) ? e : AE(e, t) ? [e] : _E(PE(e))
  }
  uh.exports = TE
});
var Ui = I((J5, sh) => {
  var EE = Dr(),
    jE = 1 / 0;

  function ME(e) {
    if (typeof e == "string" || EE(e)) return e;
    var t = e + "";
    return t == "0" && 1 / e == -jE ? "-0" : t
  }
  sh.exports = ME
});
var Na = I((Q5, lh) => {
  var CE = Sl(),
    IE = Ui();

  function kE(e, t) {
    t = CE(t, e);
    for (var r = 0, n = t.length; e != null && r < n;) e = e[IE(t[r++])];
    return r && r == n ? e : void 0
  }
  lh.exports = kE
});
var Nr = I((eH, ch) => {
  var DE = Na();

  function NE(e, t, r) {
    var n = e == null ? void 0 : DE(e, t);
    return n === void 0 ? r : n
  }
  ch.exports = NE
});
var Ot = I((tH, fh) => {
  function RE(e) {
    return e == null
  }
  fh.exports = RE
});
var Ra = I((rH, ph) => {
  var LE = Gt(),
    BE = rt(),
    qE = Kt(),
    WE = "[object String]";

  function zE(e) {
    return typeof e == "string" || !BE(e) && qE(e) && LE(e) == WE
  }
  ph.exports = zE
});
var mh = I(_e => {
  "use strict";
  var Al = Symbol.for("react.element"),
    _l = Symbol.for("react.portal"),
    La = Symbol.for("react.fragment"),
    Ba = Symbol.for("react.strict_mode"),
    qa = Symbol.for("react.profiler"),
    Wa = Symbol.for("react.provider"),
    za = Symbol.for("react.context"),
    FE = Symbol.for("react.server_context"),
    Fa = Symbol.for("react.forward_ref"),
    $a = Symbol.for("react.suspense"),
    Ua = Symbol.for("react.suspense_list"),
    Ha = Symbol.for("react.memo"),
    Ga = Symbol.for("react.lazy"),
    $E = Symbol.for("react.offscreen"),
    dh;
  dh = Symbol.for("react.module.reference");

  function St(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case Al:
          switch (e = e.type, e) {
            case La:
            case qa:
            case Ba:
            case $a:
            case Ua:
              return e;
            default:
              switch (e = e && e.$$typeof, e) {
                case FE:
                case za:
                case Fa:
                case Ga:
                case Ha:
                case Wa:
                  return e;
                default:
                  return t
              }
          }
        case _l:
          return t
      }
    }
  }
  _e.ContextConsumer = za;
  _e.ContextProvider = Wa;
  _e.Element = Al;
  _e.ForwardRef = Fa;
  _e.Fragment = La;
  _e.Lazy = Ga;
  _e.Memo = Ha;
  _e.Portal = _l;
  _e.Profiler = qa;
  _e.StrictMode = Ba;
  _e.Suspense = $a;
  _e.SuspenseList = Ua;
  _e.isAsyncMode = function() {
    return !1
  };
  _e.isConcurrentMode = function() {
    return !1
  };
  _e.isContextConsumer = function(e) {
    return St(e) === za
  };
  _e.isContextProvider = function(e) {
    return St(e) === Wa
  };
  _e.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Al
  };
  _e.isForwardRef = function(e) {
    return St(e) === Fa
  };
  _e.isFragment = function(e) {
    return St(e) === La
  };
  _e.isLazy = function(e) {
    return St(e) === Ga
  };
  _e.isMemo = function(e) {
    return St(e) === Ha
  };
  _e.isPortal = function(e) {
    return St(e) === _l
  };
  _e.isProfiler = function(e) {
    return St(e) === qa
  };
  _e.isStrictMode = function(e) {
    return St(e) === Ba
  };
  _e.isSuspense = function(e) {
    return St(e) === $a
  };
  _e.isSuspenseList = function(e) {
    return St(e) === Ua
  };
  _e.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === La || e === qa || e === Ba || e === $a || e === Ua || e === $E || typeof e == "object" && e !== null && (e.$$typeof === Ga || e.$$typeof === Ha || e.$$typeof === Wa || e.$$typeof === za || e.$$typeof === Fa || e.$$typeof === dh || e.getModuleId !== void 0)
  };
  _e.typeOf = St
});
var yh = I((iH, hh) => {
  "use strict";
  hh.exports = mh()
});
var Pl = I((oH, vh) => {
  var UE = Gt(),
    HE = Kt(),
    GE = "[object Number]";

  function KE(e) {
    return typeof e == "number" || HE(e) && UE(e) == GE
  }
  vh.exports = KE
});
var Tl = I((aH, gh) => {
  var VE = Pl();

  function XE(e) {
    return VE(e) && e != +e
  }
  gh.exports = XE
});
var Wh = I((_H, qh) => {
  function mj(e, t, r) {
    var n = -1,
      i = e.length;
    t < 0 && (t = -t > i ? 0 : i + t), r = r > i ? i : r, r < 0 && (r += i), i = t > r ? 0 : r - t >>> 0, t >>>= 0;
    for (var o = Array(i); ++n < i;) o[n] = e[n + t];
    return o
  }
  qh.exports = mj
});
var Fh = I((PH, zh) => {
  var hj = Wh();

  function yj(e, t, r) {
    var n = e.length;
    return r = r === void 0 ? n : r, !t && r >= n ? e : hj(e, t, r)
  }
  zh.exports = yj
});
var zl = I((TH, $h) => {
  var vj = "\\ud800-\\udfff",
    gj = "\\u0300-\\u036f",
    bj = "\\ufe20-\\ufe2f",
    xj = "\\u20d0-\\u20ff",
    wj = gj + bj + xj,
    Oj = "\\ufe0e\\ufe0f",
    Sj = "\\u200d",
    Aj = RegExp("[" + Sj + vj + wj + Oj + "]");

  function _j(e) {
    return Aj.test(e)
  }
  $h.exports = _j
});
var Hh = I((EH, Uh) => {
  function Pj(e) {
    return e.split("")
  }
  Uh.exports = Pj
});
var Qh = I((jH, Jh) => {
  var Gh = "\\ud800-\\udfff",
    Tj = "\\u0300-\\u036f",
    Ej = "\\ufe20-\\ufe2f",
    jj = "\\u20d0-\\u20ff",
    Mj = Tj + Ej + jj,
    Cj = "\\ufe0e\\ufe0f",
    Ij = "[" + Gh + "]",
    Fl = "[" + Mj + "]",
    $l = "\\ud83c[\\udffb-\\udfff]",
    kj = "(?:" + Fl + "|" + $l + ")",
    Kh = "[^" + Gh + "]",
    Vh = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    Xh = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    Dj = "\\u200d",
    Yh = kj + "?",
    Zh = "[" + Cj + "]?",
    Nj = "(?:" + Dj + "(?:" + [Kh, Vh, Xh].join("|") + ")" + Zh + Yh + ")*",
    Rj = Zh + Yh + Nj,
    Lj = "(?:" + [Kh + Fl + "?", Fl, Vh, Xh, Ij].join("|") + ")",
    Bj = RegExp($l + "(?=" + $l + ")|" + Lj + Rj, "g");

  function qj(e) {
    return e.match(Bj) || []
  }
  Jh.exports = qj
});
var ty = I((MH, ey) => {
  var Wj = Hh(),
    zj = zl(),
    Fj = Qh();

  function $j(e) {
    return zj(e) ? Fj(e) : Wj(e)
  }
  ey.exports = $j
});
var ny = I((CH, ry) => {
  var Uj = Fh(),
    Hj = zl(),
    Gj = ty(),
    Kj = Ol();

  function Vj(e) {
    return function(t) {
      t = Kj(t);
      var r = Hj(t) ? Gj(t) : void 0,
        n = r ? r[0] : t.charAt(0),
        i = r ? Uj(r, 1).join("") : t.slice(1);
      return n[e]() + i
    }
  }
  ry.exports = Vj
});
var Ya = I((IH, iy) => {
  var Xj = ny(),
    Yj = Xj("toUpperCase");
  iy.exports = Yj
});
var jy = I((RG, Ey) => {
  var TM = Fi();

  function EM() {
    this.__data__ = new TM, this.size = 0
  }
  Ey.exports = EM
});
var Cy = I((LG, My) => {
  function jM(e) {
    var t = this.__data__,
      r = t.delete(e);
    return this.size = t.size, r
  }
  My.exports = jM
});
var ky = I((BG, Iy) => {
  function MM(e) {
    return this.__data__.get(e)
  }
  Iy.exports = MM
});
var Ny = I((qG, Dy) => {
  function CM(e) {
    return this.__data__.has(e)
  }
  Dy.exports = CM
});
var Ly = I((WG, Ry) => {
  var IM = Fi(),
    kM = Ia(),
    DM = ka(),
    NM = 200;

  function RM(e, t) {
    var r = this.__data__;
    if (r instanceof IM) {
      var n = r.__data__;
      if (!kM || n.length < NM - 1) return n.push([e, t]), this.size = ++r.size, this;
      r = this.__data__ = new DM(n)
    }
    return r.set(e, t), this.size = r.size, this
  }
  Ry.exports = RM
});
var Sc = I((zG, By) => {
  var LM = Fi(),
    BM = jy(),
    qM = Cy(),
    WM = ky(),
    zM = Ny(),
    FM = Ly();

  function Cn(e) {
    var t = this.__data__ = new LM(e);
    this.size = t.size
  }
  Cn.prototype.clear = BM;
  Cn.prototype.delete = qM;
  Cn.prototype.get = WM;
  Cn.prototype.has = zM;
  Cn.prototype.set = FM;
  By.exports = Cn
});
var Wy = I((FG, qy) => {
  var $M = "__lodash_hash_undefined__";

  function UM(e) {
    return this.__data__.set(e, $M), this
  }
  qy.exports = UM
});
var Fy = I(($G, zy) => {
  function HM(e) {
    return this.__data__.has(e)
  }
  zy.exports = HM
});
var Ac = I((UG, $y) => {
  var GM = ka(),
    KM = Wy(),
    VM = Fy();

  function ou(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.__data__ = new GM; ++t < r;) this.add(e[t])
  }
  ou.prototype.add = ou.prototype.push = KM;
  ou.prototype.has = VM;
  $y.exports = ou
});
var _c = I((HG, Uy) => {
  function XM(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n;)
      if (t(e[r], r, e)) return !0;
    return !1
  }
  Uy.exports = XM
});
var Pc = I((GG, Hy) => {
  function YM(e, t) {
    return e.has(t)
  }
  Hy.exports = YM
});
var Tc = I((KG, Gy) => {
  var ZM = Ac(),
    JM = _c(),
    QM = Pc(),
    eC = 1,
    tC = 2;

  function rC(e, t, r, n, i, o) {
    var a = r & eC,
      u = e.length,
      s = t.length;
    if (u != s && !(a && s > u)) return !1;
    var l = o.get(e),
      f = o.get(t);
    if (l && f) return l == t && f == e;
    var c = -1,
      p = !0,
      d = r & tC ? new ZM : void 0;
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
        if (!JM(t, function(x, w) {
            if (!QM(d, w) && (y === x || i(y, x, r, n, o))) return d.push(w)
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
  Gy.exports = rC
});
var Vy = I((VG, Ky) => {
  var nC = Dt(),
    iC = nC.Uint8Array;
  Ky.exports = iC
});
var Yy = I((XG, Xy) => {
  function oC(e) {
    var t = -1,
      r = Array(e.size);
    return e.forEach(function(n, i) {
      r[++t] = [i, n]
    }), r
  }
  Xy.exports = oC
});
var au = I((YG, Zy) => {
  function aC(e) {
    var t = -1,
      r = Array(e.size);
    return e.forEach(function(n) {
      r[++t] = n
    }), r
  }
  Zy.exports = aC
});
var rv = I((ZG, tv) => {
  var Jy = hn(),
    Qy = Vy(),
    uC = Ca(),
    sC = Tc(),
    lC = Yy(),
    cC = au(),
    fC = 1,
    pC = 2,
    dC = "[object Boolean]",
    mC = "[object Date]",
    hC = "[object Error]",
    yC = "[object Map]",
    vC = "[object Number]",
    gC = "[object RegExp]",
    bC = "[object Set]",
    xC = "[object String]",
    wC = "[object Symbol]",
    OC = "[object ArrayBuffer]",
    SC = "[object DataView]",
    ev = Jy ? Jy.prototype : void 0,
    Ec = ev ? ev.valueOf : void 0;

  function AC(e, t, r, n, i, o, a) {
    switch (r) {
      case SC:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
        e = e.buffer, t = t.buffer;
      case OC:
        return !(e.byteLength != t.byteLength || !o(new Qy(e), new Qy(t)));
      case dC:
      case mC:
      case vC:
        return uC(+e, +t);
      case hC:
        return e.name == t.name && e.message == t.message;
      case gC:
      case xC:
        return e == t + "";
      case yC:
        var u = lC;
      case bC:
        var s = n & fC;
        if (u || (u = cC), e.size != t.size && !s) return !1;
        var l = a.get(e);
        if (l) return l == t;
        n |= pC, a.set(e, t);
        var f = sC(u(e), u(t), n, i, o, a);
        return a.delete(e), f;
      case wC:
        if (Ec) return Ec.call(e) == Ec.call(t)
    }
    return !1
  }
  tv.exports = AC
});
var jc = I((JG, nv) => {
  function _C(e, t) {
    for (var r = -1, n = t.length, i = e.length; ++r < n;) e[i + r] = t[r];
    return e
  }
  nv.exports = _C
});
var ov = I((QG, iv) => {
  var PC = jc(),
    TC = rt();

  function EC(e, t, r) {
    var n = t(e);
    return TC(e) ? n : PC(n, r(e))
  }
  iv.exports = EC
});
var uv = I((eK, av) => {
  function jC(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n;) {
      var a = e[r];
      t(a, r, e) && (o[i++] = a)
    }
    return o
  }
  av.exports = jC
});
var lv = I((tK, sv) => {
  function MC() {
    return []
  }
  sv.exports = MC
});
var pv = I((rK, fv) => {
  var CC = uv(),
    IC = lv(),
    kC = Object.prototype,
    DC = kC.propertyIsEnumerable,
    cv = Object.getOwnPropertySymbols,
    NC = cv ? function(e) {
      return e == null ? [] : (e = Object(e), CC(cv(e), function(t) {
        return DC.call(e, t)
      }))
    } : IC;
  fv.exports = NC
});
var mv = I((nK, dv) => {
  function RC(e, t) {
    for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
    return n
  }
  dv.exports = RC
});
var yv = I((iK, hv) => {
  var LC = Gt(),
    BC = Kt(),
    qC = "[object Arguments]";

  function WC(e) {
    return BC(e) && LC(e) == qC
  }
  hv.exports = WC
});
var uu = I((oK, bv) => {
  var vv = yv(),
    zC = Kt(),
    gv = Object.prototype,
    FC = gv.hasOwnProperty,
    $C = gv.propertyIsEnumerable,
    UC = vv(function() {
      return arguments
    }()) ? vv : function(e) {
      return zC(e) && FC.call(e, "callee") && !$C.call(e, "callee")
    };
  bv.exports = UC
});
var wv = I((aK, xv) => {
  function HC() {
    return !1
  }
  xv.exports = HC
});
var Mc = I((Zi, In) => {
  var GC = Dt(),
    KC = wv(),
    Av = typeof Zi == "object" && Zi && !Zi.nodeType && Zi,
    Ov = Av && typeof In == "object" && In && !In.nodeType && In,
    VC = Ov && Ov.exports === Av,
    Sv = VC ? GC.Buffer : void 0,
    XC = Sv ? Sv.isBuffer : void 0,
    YC = XC || KC;
  In.exports = YC
});
var su = I((uK, _v) => {
  var ZC = 9007199254740991,
    JC = /^(?:0|[1-9]\d*)$/;

  function QC(e, t) {
    var r = typeof e;
    return t = t ?? ZC, !!t && (r == "number" || r != "symbol" && JC.test(e)) && e > -1 && e % 1 == 0 && e < t
  }
  _v.exports = QC
});
var lu = I((sK, Pv) => {
  var eI = 9007199254740991;

  function tI(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= eI
  }
  Pv.exports = tI
});
var Ev = I((lK, Tv) => {
  var rI = Gt(),
    nI = lu(),
    iI = Kt(),
    oI = "[object Arguments]",
    aI = "[object Array]",
    uI = "[object Boolean]",
    sI = "[object Date]",
    lI = "[object Error]",
    cI = "[object Function]",
    fI = "[object Map]",
    pI = "[object Number]",
    dI = "[object Object]",
    mI = "[object RegExp]",
    hI = "[object Set]",
    yI = "[object String]",
    vI = "[object WeakMap]",
    gI = "[object ArrayBuffer]",
    bI = "[object DataView]",
    xI = "[object Float32Array]",
    wI = "[object Float64Array]",
    OI = "[object Int8Array]",
    SI = "[object Int16Array]",
    AI = "[object Int32Array]",
    _I = "[object Uint8Array]",
    PI = "[object Uint8ClampedArray]",
    TI = "[object Uint16Array]",
    EI = "[object Uint32Array]",
    je = {};
  je[xI] = je[wI] = je[OI] = je[SI] = je[AI] = je[_I] = je[PI] = je[TI] = je[EI] = !0;
  je[oI] = je[aI] = je[gI] = je[uI] = je[bI] = je[sI] = je[lI] = je[cI] = je[fI] = je[pI] = je[dI] = je[mI] = je[hI] = je[yI] = je[vI] = !1;

  function jI(e) {
    return iI(e) && nI(e.length) && !!je[rI(e)]
  }
  Tv.exports = jI
});
var Cc = I((cK, jv) => {
  function MI(e) {
    return function(t) {
      return e(t)
    }
  }
  jv.exports = MI
});
var Cv = I((Ji, kn) => {
  var CI = vl(),
    Mv = typeof Ji == "object" && Ji && !Ji.nodeType && Ji,
    Qi = Mv && typeof kn == "object" && kn && !kn.nodeType && kn,
    II = Qi && Qi.exports === Mv,
    Ic = II && CI.process,
    kI = function() {
      try {
        var e = Qi && Qi.require && Qi.require("util").types;
        return e || Ic && Ic.binding && Ic.binding("util")
      } catch {}
    }();
  kn.exports = kI
});
var kc = I((fK, Dv) => {
  var DI = Ev(),
    NI = Cc(),
    Iv = Cv(),
    kv = Iv && Iv.isTypedArray,
    RI = kv ? NI(kv) : DI;
  Dv.exports = RI
});
var Rv = I((pK, Nv) => {
  var LI = mv(),
    BI = uu(),
    qI = rt(),
    WI = Mc(),
    zI = su(),
    FI = kc(),
    $I = Object.prototype,
    UI = $I.hasOwnProperty;

  function HI(e, t) {
    var r = qI(e),
      n = !r && BI(e),
      i = !r && !n && WI(e),
      o = !r && !n && !i && FI(e),
      a = r || n || i || o,
      u = a ? LI(e.length, String) : [],
      s = u.length;
    for (var l in e)(t || UI.call(e, l)) && !(a && (l == "length" || i && (l == "offset" || l == "parent") || o && (l == "buffer" || l == "byteLength" || l == "byteOffset") || zI(l, s))) && u.push(l);
    return u
  }
  Nv.exports = HI
});
var Bv = I((dK, Lv) => {
  var GI = Object.prototype;

  function KI(e) {
    var t = e && e.constructor,
      r = typeof t == "function" && t.prototype || GI;
    return e === r
  }
  Lv.exports = KI
});
var Dc = I((mK, qv) => {
  function VI(e, t) {
    return function(r) {
      return e(t(r))
    }
  }
  qv.exports = VI
});
var zv = I((hK, Wv) => {
  var XI = Dc(),
    YI = XI(Object.keys, Object);
  Wv.exports = YI
});
var $v = I((yK, Fv) => {
  var ZI = Bv(),
    JI = zv(),
    QI = Object.prototype,
    ek = QI.hasOwnProperty;

  function tk(e) {
    if (!ZI(e)) return JI(e);
    var t = [];
    for (var r in Object(e)) ek.call(e, r) && r != "constructor" && t.push(r);
    return t
  }
  Fv.exports = tk
});
var Dn = I((vK, Uv) => {
  var rk = De(),
    nk = lu();

  function ik(e) {
    return e != null && nk(e.length) && !rk(e)
  }
  Uv.exports = ik
});
var eo = I((gK, Hv) => {
  var ok = Rv(),
    ak = $v(),
    uk = Dn();

  function sk(e) {
    return uk(e) ? ok(e) : ak(e)
  }
  Hv.exports = sk
});
var Kv = I((bK, Gv) => {
  var lk = ov(),
    ck = pv(),
    fk = eo();

  function pk(e) {
    return lk(e, fk, ck)
  }
  Gv.exports = pk
});
var Yv = I((xK, Xv) => {
  var Vv = Kv(),
    dk = 1,
    mk = Object.prototype,
    hk = mk.hasOwnProperty;

  function yk(e, t, r, n, i, o) {
    var a = r & dk,
      u = Vv(e),
      s = u.length,
      l = Vv(t),
      f = l.length;
    if (s != f && !a) return !1;
    for (var c = s; c--;) {
      var p = u[c];
      if (!(a ? p in t : hk.call(t, p))) return !1
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
      var A = e.constructor,
        h = t.constructor;
      A != h && "constructor" in e && "constructor" in t && !(typeof A == "function" && A instanceof A && typeof h == "function" && h instanceof h) && (m = !1)
    }
    return o.delete(e), o.delete(t), m
  }
  Xv.exports = yk
});
var Jv = I((wK, Zv) => {
  var vk = gr(),
    gk = Dt(),
    bk = vk(gk, "DataView");
  Zv.exports = bk
});
var eg = I((OK, Qv) => {
  var xk = gr(),
    wk = Dt(),
    Ok = xk(wk, "Promise");
  Qv.exports = Ok
});
var Nc = I((SK, tg) => {
  var Sk = gr(),
    Ak = Dt(),
    _k = Sk(Ak, "Set");
  tg.exports = _k
});
var ng = I((AK, rg) => {
  var Pk = gr(),
    Tk = Dt(),
    Ek = Pk(Tk, "WeakMap");
  rg.exports = Ek
});
var fg = I((_K, cg) => {
  var Rc = Jv(),
    Lc = Ia(),
    Bc = eg(),
    qc = Nc(),
    Wc = ng(),
    lg = Gt(),
    Nn = bl(),
    ig = "[object Map]",
    jk = "[object Object]",
    og = "[object Promise]",
    ag = "[object Set]",
    ug = "[object WeakMap]",
    sg = "[object DataView]",
    Mk = Nn(Rc),
    Ck = Nn(Lc),
    Ik = Nn(Bc),
    kk = Nn(qc),
    Dk = Nn(Wc),
    zr = lg;
  (Rc && zr(new Rc(new ArrayBuffer(1))) != sg || Lc && zr(new Lc) != ig || Bc && zr(Bc.resolve()) != og || qc && zr(new qc) != ag || Wc && zr(new Wc) != ug) && (zr = function(e) {
    var t = lg(e),
      r = t == jk ? e.constructor : void 0,
      n = r ? Nn(r) : "";
    if (n) switch (n) {
      case Mk:
        return sg;
      case Ck:
        return ig;
      case Ik:
        return og;
      case kk:
        return ag;
      case Dk:
        return ug
    }
    return t
  });
  cg.exports = zr
});
var bg = I((PK, gg) => {
  var zc = Sc(),
    Nk = Tc(),
    Rk = rv(),
    Lk = Yv(),
    pg = fg(),
    dg = rt(),
    mg = Mc(),
    Bk = kc(),
    qk = 1,
    hg = "[object Arguments]",
    yg = "[object Array]",
    cu = "[object Object]",
    Wk = Object.prototype,
    vg = Wk.hasOwnProperty;

  function zk(e, t, r, n, i, o) {
    var a = dg(e),
      u = dg(t),
      s = a ? yg : pg(e),
      l = u ? yg : pg(t);
    s = s == hg ? cu : s, l = l == hg ? cu : l;
    var f = s == cu,
      c = l == cu,
      p = s == l;
    if (p && mg(e)) {
      if (!mg(t)) return !1;
      a = !0, f = !1
    }
    if (p && !f) return o || (o = new zc), a || Bk(e) ? Nk(e, t, r, n, i, o) : Rk(e, t, s, r, n, i, o);
    if (!(r & qk)) {
      var d = f && vg.call(e, "__wrapped__"),
        y = c && vg.call(t, "__wrapped__");
      if (d || y) {
        var m = d ? e.value() : e,
          v = y ? t.value() : t;
        return o || (o = new zc), i(m, v, r, n, o)
      }
    }
    return p ? (o || (o = new zc), Lk(e, t, r, n, i, o)) : !1
  }
  gg.exports = zk
});
var fu = I((TK, Og) => {
  var Fk = bg(),
    xg = Kt();

  function wg(e, t, r, n, i) {
    return e === t ? !0 : e == null || t == null || !xg(e) && !xg(t) ? e !== e && t !== t : Fk(e, t, r, n, wg, i)
  }
  Og.exports = wg
});
var Ag = I((EK, Sg) => {
  var $k = Sc(),
    Uk = fu(),
    Hk = 1,
    Gk = 2;

  function Kk(e, t, r, n) {
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
        var c = new $k;
        if (n) var p = n(l, f, s, e, t, c);
        if (!(p === void 0 ? Uk(f, l, Hk | Gk, n, c) : p)) return !1
      }
    }
    return !0
  }
  Sg.exports = Kk
});
var Fc = I((jK, _g) => {
  var Vk = wt();

  function Xk(e) {
    return e === e && !Vk(e)
  }
  _g.exports = Xk
});
var Tg = I((MK, Pg) => {
  var Yk = Fc(),
    Zk = eo();

  function Jk(e) {
    for (var t = Zk(e), r = t.length; r--;) {
      var n = t[r],
        i = e[n];
      t[r] = [n, i, Yk(i)]
    }
    return t
  }
  Pg.exports = Jk
});
var $c = I((CK, Eg) => {
  function Qk(e, t) {
    return function(r) {
      return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r))
    }
  }
  Eg.exports = Qk
});
var Mg = I((IK, jg) => {
  var e2 = Ag(),
    t2 = Tg(),
    r2 = $c();

  function n2(e) {
    var t = t2(e);
    return t.length == 1 && t[0][2] ? r2(t[0][0], t[0][1]) : function(r) {
      return r === e || e2(r, e, t)
    }
  }
  jg.exports = n2
});
var Ig = I((kK, Cg) => {
  function i2(e, t) {
    return e != null && t in Object(e)
  }
  Cg.exports = i2
});
var Dg = I((DK, kg) => {
  var o2 = Sl(),
    a2 = uu(),
    u2 = rt(),
    s2 = su(),
    l2 = lu(),
    c2 = Ui();

  function f2(e, t, r) {
    t = o2(t, e);
    for (var n = -1, i = t.length, o = !1; ++n < i;) {
      var a = c2(t[n]);
      if (!(o = e != null && r(e, a))) break;
      e = e[a]
    }
    return o || ++n != i ? o : (i = e == null ? 0 : e.length, !!i && l2(i) && s2(a, i) && (u2(e) || a2(e)))
  }
  kg.exports = f2
});
var Rg = I((NK, Ng) => {
  var p2 = Ig(),
    d2 = Dg();

  function m2(e, t) {
    return e != null && d2(e, t, p2)
  }
  Ng.exports = m2
});
var Bg = I((RK, Lg) => {
  var h2 = fu(),
    y2 = Nr(),
    v2 = Rg(),
    g2 = Ma(),
    b2 = Fc(),
    x2 = $c(),
    w2 = Ui(),
    O2 = 1,
    S2 = 2;

  function A2(e, t) {
    return g2(e) && b2(t) ? x2(w2(e), t) : function(r) {
      var n = y2(r, e);
      return n === void 0 && n === t ? v2(r, e) : h2(t, n, O2 | S2)
    }
  }
  Lg.exports = A2
});
var Fr = I((LK, qg) => {
  function _2(e) {
    return e
  }
  qg.exports = _2
});
var zg = I((BK, Wg) => {
  function P2(e) {
    return function(t) {
      return t?.[e]
    }
  }
  Wg.exports = P2
});
var $g = I((qK, Fg) => {
  var T2 = Na();

  function E2(e) {
    return function(t) {
      return T2(t, e)
    }
  }
  Fg.exports = E2
});
var Hg = I((WK, Ug) => {
  var j2 = zg(),
    M2 = $g(),
    C2 = Ma(),
    I2 = Ui();

  function k2(e) {
    return C2(e) ? j2(I2(e)) : M2(e)
  }
  Ug.exports = k2
});
var lr = I((zK, Gg) => {
  var D2 = Mg(),
    N2 = Bg(),
    R2 = Fr(),
    L2 = rt(),
    B2 = Hg();

  function q2(e) {
    return typeof e == "function" ? e : e == null ? R2 : typeof e == "object" ? L2(e) ? N2(e[0], e[1]) : D2(e) : B2(e)
  }
  Gg.exports = q2
});
var Uc = I((FK, Kg) => {
  function W2(e, t, r, n) {
    for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
      if (t(e[o], o, e)) return o;
    return -1
  }
  Kg.exports = W2
});
var Xg = I(($K, Vg) => {
  function z2(e) {
    return e !== e
  }
  Vg.exports = z2
});
var Zg = I((UK, Yg) => {
  function F2(e, t, r) {
    for (var n = r - 1, i = e.length; ++n < i;)
      if (e[n] === t) return n;
    return -1
  }
  Yg.exports = F2
});
var Qg = I((HK, Jg) => {
  var $2 = Uc(),
    U2 = Xg(),
    H2 = Zg();

  function G2(e, t, r) {
    return t === t ? H2(e, t, r) : $2(e, U2, r)
  }
  Jg.exports = G2
});
var tb = I((GK, eb) => {
  var K2 = Qg();

  function V2(e, t) {
    var r = e == null ? 0 : e.length;
    return !!r && K2(e, t, 0) > -1
  }
  eb.exports = V2
});
var nb = I((KK, rb) => {
  function X2(e, t, r) {
    for (var n = -1, i = e == null ? 0 : e.length; ++n < i;)
      if (r(t, e[n])) return !0;
    return !1
  }
  rb.exports = X2
});
var ob = I((VK, ib) => {
  function Y2() {}
  ib.exports = Y2
});
var ub = I((XK, ab) => {
  var Hc = Nc(),
    Z2 = ob(),
    J2 = au(),
    Q2 = 1 / 0,
    eD = Hc && 1 / J2(new Hc([, -0]))[1] == Q2 ? function(e) {
      return new Hc(e)
    } : Z2;
  ab.exports = eD
});
var lb = I((YK, sb) => {
  var tD = Ac(),
    rD = tb(),
    nD = nb(),
    iD = Pc(),
    oD = ub(),
    aD = au(),
    uD = 200;

  function sD(e, t, r) {
    var n = -1,
      i = rD,
      o = e.length,
      a = !0,
      u = [],
      s = u;
    if (r) a = !1, i = nD;
    else if (o >= uD) {
      var l = t ? null : oD(e);
      if (l) return aD(l);
      a = !1, i = iD, s = new tD
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
  sb.exports = sD
});
var fb = I((ZK, cb) => {
  var lD = lr(),
    cD = lb();

  function fD(e, t) {
    return e && e.length ? cD(e, lD(t, 2)) : []
  }
  cb.exports = fD
});
var wb = I((i7, xb) => {
  var gb = hn(),
    _D = uu(),
    PD = rt(),
    bb = gb ? gb.isConcatSpreadable : void 0;

  function TD(e) {
    return PD(e) || _D(e) || !!(bb && e && e[bb])
  }
  xb.exports = TD
});
var Vc = I((o7, Sb) => {
  var ED = jc(),
    jD = wb();

  function Ob(e, t, r, n, i) {
    var o = -1,
      a = e.length;
    for (r || (r = jD), i || (i = []); ++o < a;) {
      var u = e[o];
      t > 0 && r(u) ? t > 1 ? Ob(u, t - 1, r, n, i) : ED(i, u) : n || (i[i.length] = u)
    }
    return i
  }
  Sb.exports = Ob
});
var _b = I((a7, Ab) => {
  function MD(e) {
    return function(t, r, n) {
      for (var i = -1, o = Object(t), a = n(t), u = a.length; u--;) {
        var s = a[e ? u : ++i];
        if (r(o[s], s, o) === !1) break
      }
      return t
    }
  }
  Ab.exports = MD
});
var Tb = I((u7, Pb) => {
  var CD = _b(),
    ID = CD();
  Pb.exports = ID
});
var Xc = I((s7, Eb) => {
  var kD = Tb(),
    DD = eo();

  function ND(e, t) {
    return e && kD(e, t, DD)
  }
  Eb.exports = ND
});
var Mb = I((l7, jb) => {
  var RD = Dn();

  function LD(e, t) {
    return function(r, n) {
      if (r == null) return r;
      if (!RD(r)) return e(r, n);
      for (var i = r.length, o = t ? i : -1, a = Object(r);
        (t ? o-- : ++o < i) && n(a[o], o, a) !== !1;);
      return r
    }
  }
  jb.exports = LD
});
var hu = I((c7, Cb) => {
  var BD = Xc(),
    qD = Mb(),
    WD = qD(BD);
  Cb.exports = WD
});
var Yc = I((f7, Ib) => {
  var zD = hu(),
    FD = Dn();

  function $D(e, t) {
    var r = -1,
      n = FD(e) ? Array(e.length) : [];
    return zD(e, function(i, o, a) {
      n[++r] = t(i, o, a)
    }), n
  }
  Ib.exports = $D
});
var Db = I((p7, kb) => {
  function UD(e, t) {
    var r = e.length;
    for (e.sort(t); r--;) e[r] = e[r].value;
    return e
  }
  kb.exports = UD
});
var Lb = I((d7, Rb) => {
  var Nb = Dr();

  function HD(e, t) {
    if (e !== t) {
      var r = e !== void 0,
        n = e === null,
        i = e === e,
        o = Nb(e),
        a = t !== void 0,
        u = t === null,
        s = t === t,
        l = Nb(t);
      if (!u && !l && !o && e > t || o && a && s && !u && !l || n && a && s || !r && s || !i) return 1;
      if (!n && !o && !l && e < t || l && r && i && !n && !o || u && r && i || !a && i || !s) return -1
    }
    return 0
  }
  Rb.exports = HD
});
var qb = I((m7, Bb) => {
  var GD = Lb();

  function KD(e, t, r) {
    for (var n = -1, i = e.criteria, o = t.criteria, a = i.length, u = r.length; ++n < a;) {
      var s = GD(i[n], o[n]);
      if (s) {
        if (n >= u) return s;
        var l = r[n];
        return s * (l == "desc" ? -1 : 1)
      }
    }
    return e.index - t.index
  }
  Bb.exports = KD
});
var zb = I((h7, Wb) => {
  var Zc = Da(),
    VD = Na(),
    XD = lr(),
    YD = Yc(),
    ZD = Db(),
    JD = Cc(),
    QD = qb(),
    eN = Fr(),
    tN = rt();

  function rN(e, t, r) {
    t.length ? t = Zc(t, function(o) {
      return tN(o) ? function(a) {
        return VD(a, o.length === 1 ? o[0] : o)
      } : o
    }) : t = [eN];
    var n = -1;
    t = Zc(t, JD(XD));
    var i = YD(e, function(o, a, u) {
      var s = Zc(t, function(l) {
        return l(o)
      });
      return {
        criteria: s,
        index: ++n,
        value: o
      }
    });
    return ZD(i, function(o, a) {
      return QD(o, a, r)
    })
  }
  Wb.exports = rN
});
var $b = I((y7, Fb) => {
  function nN(e, t, r) {
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
  Fb.exports = nN
});
var Gb = I((v7, Hb) => {
  var iN = $b(),
    Ub = Math.max;

  function oN(e, t, r) {
    return t = Ub(t === void 0 ? e.length - 1 : t, 0),
      function() {
        for (var n = arguments, i = -1, o = Ub(n.length - t, 0), a = Array(o); ++i < o;) a[i] = n[t + i];
        i = -1;
        for (var u = Array(t + 1); ++i < t;) u[i] = n[i];
        return u[t] = r(a), iN(e, this, u)
      }
  }
  Hb.exports = oN
});
var Vb = I((g7, Kb) => {
  function aN(e) {
    return function() {
      return e
    }
  }
  Kb.exports = aN
});
var Jc = I((b7, Xb) => {
  var uN = gr(),
    sN = function() {
      try {
        var e = uN(Object, "defineProperty");
        return e({}, "", {}), e
      } catch {}
    }();
  Xb.exports = sN
});
var Jb = I((x7, Zb) => {
  var lN = Vb(),
    Yb = Jc(),
    cN = Fr(),
    fN = Yb ? function(e, t) {
      return Yb(e, "toString", {
        configurable: !0,
        enumerable: !1,
        value: lN(t),
        writable: !0
      })
    } : cN;
  Zb.exports = fN
});
var ex = I((w7, Qb) => {
  var pN = 800,
    dN = 16,
    mN = Date.now;

  function hN(e) {
    var t = 0,
      r = 0;
    return function() {
      var n = mN(),
        i = dN - (n - r);
      if (r = n, i > 0) {
        if (++t >= pN) return arguments[0]
      } else t = 0;
      return e.apply(void 0, arguments)
    }
  }
  Qb.exports = hN
});
var rx = I((O7, tx) => {
  var yN = Jb(),
    vN = ex(),
    gN = vN(yN);
  tx.exports = gN
});
var ix = I((S7, nx) => {
  var bN = Fr(),
    xN = Gb(),
    wN = rx();

  function ON(e, t) {
    return wN(xN(e, t, bN), e + "")
  }
  nx.exports = ON
});
var ro = I((A7, ox) => {
  var SN = Ca(),
    AN = Dn(),
    _N = su(),
    PN = wt();

  function TN(e, t, r) {
    if (!PN(r)) return !1;
    var n = typeof t;
    return (n == "number" ? AN(r) && _N(t, r.length) : n == "string" && t in r) ? SN(r[t], e) : !1
  }
  ox.exports = TN
});
var yu = I((_7, ux) => {
  var EN = Vc(),
    jN = zb(),
    MN = ix(),
    ax = ro(),
    CN = MN(function(e, t) {
      if (e == null) return [];
      var r = t.length;
      return r > 1 && ax(e, t[0], t[1]) ? t = [] : r > 2 && ax(t[0], t[1], t[2]) && (t = [t[0]]), jN(e, EN(t, 1), [])
    });
  ux.exports = CN
});
var Ex = I(($7, Tx) => {
  var pR = Dt(),
    dR = function() {
      return pR.Date.now()
    };
  Tx.exports = dR
});
var Mx = I((U7, jx) => {
  var mR = /\s/;

  function hR(e) {
    for (var t = e.length; t-- && mR.test(e.charAt(t)););
    return t
  }
  jx.exports = hR
});
var Ix = I((H7, Cx) => {
  var yR = Mx(),
    vR = /^\s+/;

  function gR(e) {
    return e && e.slice(0, yR(e) + 1).replace(vR, "")
  }
  Cx.exports = gR
});
var af = I((G7, Nx) => {
  var bR = Ix(),
    kx = wt(),
    xR = Dr(),
    Dx = NaN,
    wR = /^[-+]0x[0-9a-f]+$/i,
    OR = /^0b[01]+$/i,
    SR = /^0o[0-7]+$/i,
    AR = parseInt;

  function _R(e) {
    if (typeof e == "number") return e;
    if (xR(e)) return Dx;
    if (kx(e)) {
      var t = typeof e.valueOf == "function" ? e.valueOf() : e;
      e = kx(t) ? t + "" : t
    }
    if (typeof e != "string") return e === 0 ? e : +e;
    e = bR(e);
    var r = OR.test(e);
    return r || SR.test(e) ? AR(e.slice(2), r ? 2 : 8) : wR.test(e) ? Dx : +e
  }
  Nx.exports = _R
});
var Bx = I((K7, Lx) => {
  var PR = wt(),
    uf = Ex(),
    Rx = af(),
    TR = "Expected a function",
    ER = Math.max,
    jR = Math.min;

  function MR(e, t, r) {
    var n, i, o, a, u, s, l = 0,
      f = !1,
      c = !1,
      p = !0;
    if (typeof e != "function") throw new TypeError(TR);
    t = Rx(t) || 0, PR(r) && (f = !!r.leading, c = "maxWait" in r, o = c ? ER(Rx(r.maxWait) || 0, t) : o, p = "trailing" in r ? !!r.trailing : p);

    function d(g) {
      var P = n,
        C = i;
      return n = i = void 0, l = g, a = e.apply(C, P), a
    }

    function y(g) {
      return l = g, u = setTimeout(x, t), f ? d(g) : a
    }

    function m(g) {
      var P = g - s,
        C = g - l,
        k = t - P;
      return c ? jR(k, o - C) : k
    }

    function v(g) {
      var P = g - s,
        C = g - l;
      return s === void 0 || P >= t || P < 0 || c && C >= o
    }

    function x() {
      var g = uf();
      if (v(g)) return w(g);
      u = setTimeout(x, m(g))
    }

    function w(g) {
      return u = void 0, p && n ? d(g) : (n = i = void 0, a)
    }

    function S() {
      u !== void 0 && clearTimeout(u), l = 0, n = s = i = u = void 0
    }

    function A() {
      return u === void 0 ? a : w(uf())
    }

    function h() {
      var g = uf(),
        P = v(g);
      if (n = arguments, i = this, s = g, P) {
        if (u === void 0) return y(s);
        if (c) return clearTimeout(u), u = setTimeout(x, t), d(s)
      }
      return u === void 0 && (u = setTimeout(x, t)), a
    }
    return h.cancel = S, h.flush = A, h
  }
  Lx.exports = MR
});
var sf = I((V7, qx) => {
  var CR = Bx(),
    IR = wt(),
    kR = "Expected a function";

  function DR(e, t, r) {
    var n = !0,
      i = !0;
    if (typeof e != "function") throw new TypeError(kR);
    return IR(r) && (n = "leading" in r ? !!r.leading : n, i = "trailing" in r ? !!r.trailing : i), CR(e, t, {
      leading: n,
      maxWait: t,
      trailing: i
    })
  }
  qx.exports = DR
});
var Vf = I((fQ, jw) => {
  var Dq = Dr();

  function Nq(e, t, r) {
    for (var n = -1, i = e.length; ++n < i;) {
      var o = e[n],
        a = t(o);
      if (a != null && (u === void 0 ? a === a && !Dq(a) : r(a, u))) var u = a,
        s = o
    }
    return s
  }
  jw.exports = Nq
});
var Cw = I((pQ, Mw) => {
  function Rq(e, t) {
    return e > t
  }
  Mw.exports = Rq
});
var kw = I((dQ, Iw) => {
  var Lq = Vf(),
    Bq = Cw(),
    qq = Fr();

  function Wq(e) {
    return e && e.length ? Lq(e, qq, Bq) : void 0
  }
  Iw.exports = Wq
});
var Nw = I((mQ, Dw) => {
  function zq(e, t) {
    return e < t
  }
  Dw.exports = zq
});
var Lw = I((hQ, Rw) => {
  var Fq = Vf(),
    $q = Nw(),
    Uq = Fr();

  function Hq(e) {
    return e && e.length ? Fq(e, Uq, $q) : void 0
  }
  Rw.exports = Hq
});
var qw = I((yQ, Bw) => {
  var Gq = Da(),
    Kq = lr(),
    Vq = Yc(),
    Xq = rt();

  function Yq(e, t) {
    var r = Xq(e) ? Gq : Vq;
    return r(e, Kq(t, 3))
  }
  Bw.exports = Yq
});
var zw = I((vQ, Ww) => {
  var Zq = Vc(),
    Jq = qw();

  function Qq(e, t) {
    return Zq(Jq(e, t), 1)
  }
  Ww.exports = Qq
});
var Mo = I((gQ, Fw) => {
  var eW = fu();

  function tW(e, t) {
    return eW(e, t)
  }
  Fw.exports = tW
});
var Xf = I(($w, us) => {
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
      var O, E, _, j, T = this;
      if (b = new T.constructor(b), T.s !== b.s) return T.s || -b.s;
      if (T.e !== b.e) return T.e > b.e ^ T.s < 0 ? 1 : -1;
      for (_ = T.d.length, j = b.d.length, O = 0, E = _ < j ? _ : j; O < E; ++O)
        if (T.d[O] !== b.d[O]) return T.d[O] > b.d[O] ^ T.s < 0 ? 1 : -1;
      return _ === j ? 0 : _ > j ^ T.s < 0 ? 1 : -1
    }, m.decimalPlaces = m.dp = function() {
      var b = this,
        O = b.d.length - 1,
        E = (O - b.e) * p;
      if (O = b.d[O], O)
        for (; O % 10 == 0; O /= 10) E--;
      return E < 0 ? 0 : E
    }, m.dividedBy = m.div = function(b) {
      return S(this, new this.constructor(b))
    }, m.dividedToIntegerBy = m.idiv = function(b) {
      var O = this,
        E = O.constructor;
      return B(S(O, new E(b), 0, 1), E.precision)
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
      var O, E = this,
        _ = E.constructor,
        j = _.precision,
        T = j + 5;
      if (b === void 0) b = new _(10);
      else if (b = new _(b), b.s < 1 || b.eq(f)) throw Error(i + "NaN");
      if (E.s < 1) throw Error(i + (E.s ? "NaN" : "-Infinity"));
      return E.eq(f) ? new _(0) : (n = !1, O = S(C(E, T), C(b, T), T), n = !0, B(O, j))
    }, m.minus = m.sub = function(b) {
      var O = this;
      return b = new O.constructor(b), O.s == b.s ? z(O, b) : v(O, (b.s = -b.s, b))
    }, m.modulo = m.mod = function(b) {
      var O, E = this,
        _ = E.constructor,
        j = _.precision;
      if (b = new _(b), !b.s) throw Error(i + "NaN");
      return E.s ? (n = !1, O = S(E, b, 0, 1).times(b), n = !0, E.minus(O)) : B(new _(E), j)
    }, m.naturalExponential = m.exp = function() {
      return A(this)
    }, m.naturalLogarithm = m.ln = function() {
      return C(this)
    }, m.negated = m.neg = function() {
      var b = new this.constructor(this);
      return b.s = -b.s || 0, b
    }, m.plus = m.add = function(b) {
      var O = this;
      return b = new O.constructor(b), O.s == b.s ? v(O, b) : z(O, (b.s = -b.s, b))
    }, m.precision = m.sd = function(b) {
      var O, E, _, j = this;
      if (b !== void 0 && b !== !!b && b !== 1 && b !== 0) throw Error(o + b);
      if (O = h(j) + 1, _ = j.d.length - 1, E = _ * p + 1, _ = j.d[_], _) {
        for (; _ % 10 == 0; _ /= 10) E--;
        for (_ = j.d[0]; _ >= 10; _ /= 10) E++
      }
      return b && O > E ? O : E
    }, m.squareRoot = m.sqrt = function() {
      var b, O, E, _, j, T, D, R = this,
        V = R.constructor;
      if (R.s < 1) {
        if (!R.s) return new V(0);
        throw Error(i + "NaN")
      }
      for (b = h(R), n = !1, j = Math.sqrt(+R), j == 0 || j == 1 / 0 ? (O = w(R.d), (O.length + b) % 2 == 0 && (O += "0"), j = Math.sqrt(O), b = u((b + 1) / 2) - (b < 0 || b % 2), j == 1 / 0 ? O = "5e" + b : (O = j.toExponential(), O = O.slice(0, O.indexOf("e") + 1) + b), _ = new V(O)) : _ = new V(j.toString()), E = V.precision, j = D = E + 3;;)
        if (T = _, _ = T.plus(S(R, T, D + 2)).times(.5), w(T.d).slice(0, D) === (O = w(_.d)).slice(0, D)) {
          if (O = O.slice(D - 3, D + 1), j == D && O == "4999") {
            if (B(T, E + 1, 0), T.times(T).eq(R)) {
              _ = T;
              break
            }
          } else if (O != "9999") break;
          D += 4
        } return n = !0, B(_, E)
    }, m.times = m.mul = function(b) {
      var O, E, _, j, T, D, R, V, Z, Y = this,
        te = Y.constructor,
        he = Y.d,
        q = (b = new te(b)).d;
      if (!Y.s || !b.s) return new te(0);
      for (b.s *= Y.s, E = Y.e + b.e, V = he.length, Z = q.length, V < Z && (T = he, he = q, q = T, D = V, V = Z, Z = D), T = [], D = V + Z, _ = D; _--;) T.push(0);
      for (_ = Z; --_ >= 0;) {
        for (O = 0, j = V + _; j > _;) R = T[j] + q[_] * he[j - _ - 1] + O, T[j--] = R % c | 0, O = R / c | 0;
        T[j] = (T[j] + O) % c | 0
      }
      for (; !T[--D];) T.pop();
      return O ? ++E : T.shift(), b.d = T, b.e = E, n ? B(b, te.precision) : b
    }, m.toDecimalPlaces = m.todp = function(b, O) {
      var E = this,
        _ = E.constructor;
      return E = new _(E), b === void 0 ? E : (x(b, 0, t), O === void 0 ? O = _.rounding : x(O, 0, 8), B(E, b + h(E) + 1, O))
    }, m.toExponential = function(b, O) {
      var E, _ = this,
        j = _.constructor;
      return b === void 0 ? E = N(_, !0) : (x(b, 0, t), O === void 0 ? O = j.rounding : x(O, 0, 8), _ = B(new j(_), b + 1, O), E = N(_, !0, b + 1)), E
    }, m.toFixed = function(b, O) {
      var E, _, j = this,
        T = j.constructor;
      return b === void 0 ? N(j) : (x(b, 0, t), O === void 0 ? O = T.rounding : x(O, 0, 8), _ = B(new T(j), b + h(j) + 1, O), E = N(_.abs(), !1, b + h(_) + 1), j.isneg() && !j.isZero() ? "-" + E : E)
    }, m.toInteger = m.toint = function() {
      var b = this,
        O = b.constructor;
      return B(new O(b), h(b) + 1, O.rounding)
    }, m.toNumber = function() {
      return +this
    }, m.toPower = m.pow = function(b) {
      var O, E, _, j, T, D, R = this,
        V = R.constructor,
        Z = 12,
        Y = +(b = new V(b));
      if (!b.s) return new V(f);
      if (R = new V(R), !R.s) {
        if (b.s < 1) throw Error(i + "Infinity");
        return R
      }
      if (R.eq(f)) return R;
      if (_ = V.precision, b.eq(f)) return B(R, _);
      if (O = b.e, E = b.d.length - 1, D = O >= E, T = R.s, D) {
        if ((E = Y < 0 ? -Y : Y) <= d) {
          for (j = new V(f), O = Math.ceil(_ / p + 4), n = !1; E % 2 && (j = j.times(R), K(j.d, O)), E = u(E / 2), E !== 0;) R = R.times(R), K(R.d, O);
          return n = !0, b.s < 0 ? new V(f).div(j) : B(j, _)
        }
      } else if (T < 0) throw Error(i + "NaN");
      return T = T < 0 && b.d[Math.max(O, E)] & 1 ? -1 : 1, R.s = 1, n = !1, j = b.times(C(R, _ + Z)), n = !0, j = A(j), j.s = T, j
    }, m.toPrecision = function(b, O) {
      var E, _, j = this,
        T = j.constructor;
      return b === void 0 ? (E = h(j), _ = N(j, E <= T.toExpNeg || E >= T.toExpPos)) : (x(b, 1, t), O === void 0 ? O = T.rounding : x(O, 0, 8), j = B(new T(j), b, O), E = h(j), _ = N(j, b <= E || E <= T.toExpNeg, b)), _
    }, m.toSignificantDigits = m.tosd = function(b, O) {
      var E = this,
        _ = E.constructor;
      return b === void 0 ? (b = _.precision, O = _.rounding) : (x(b, 1, t), O === void 0 ? O = _.rounding : x(O, 0, 8)), B(new _(E), b, O)
    }, m.toString = m.valueOf = m.val = m.toJSON = function() {
      var b = this,
        O = h(b),
        E = b.constructor;
      return N(b, O <= E.toExpNeg || O >= E.toExpPos)
    };

    function v(b, O) {
      var E, _, j, T, D, R, V, Z, Y = b.constructor,
        te = Y.precision;
      if (!b.s || !O.s) return O.s || (O = new Y(b)), n ? B(O, te) : O;
      if (V = b.d, Z = O.d, D = b.e, j = O.e, V = V.slice(), T = D - j, T) {
        for (T < 0 ? (_ = V, T = -T, R = Z.length) : (_ = Z, j = D, R = V.length), D = Math.ceil(te / p), R = D > R ? D + 1 : R + 1, T > R && (T = R, _.length = 1), _.reverse(); T--;) _.push(0);
        _.reverse()
      }
      for (R = V.length, T = Z.length, R - T < 0 && (T = R, _ = Z, Z = V, V = _), E = 0; T;) E = (V[--T] = V[T] + Z[T] + E) / c | 0, V[T] %= c;
      for (E && (V.unshift(E), ++j), R = V.length; V[--R] == 0;) V.pop();
      return O.d = V, O.e = j, n ? B(O, te) : O
    }

    function x(b, O, E) {
      if (b !== ~~b || b < O || b > E) throw Error(o + b)
    }

    function w(b) {
      var O, E, _, j = b.length - 1,
        T = "",
        D = b[0];
      if (j > 0) {
        for (T += D, O = 1; O < j; O++) _ = b[O] + "", E = p - _.length, E && (T += P(E)), T += _;
        D = b[O], _ = D + "", E = p - _.length, E && (T += P(E))
      } else if (D === 0) return "0";
      for (; D % 10 === 0;) D /= 10;
      return T + D
    }
    var S = function() {
      function b(_, j) {
        var T, D = 0,
          R = _.length;
        for (_ = _.slice(); R--;) T = _[R] * j + D, _[R] = T % c | 0, D = T / c | 0;
        return D && _.unshift(D), _
      }

      function O(_, j, T, D) {
        var R, V;
        if (T != D) V = T > D ? 1 : -1;
        else
          for (R = V = 0; R < T; R++)
            if (_[R] != j[R]) {
              V = _[R] > j[R] ? 1 : -1;
              break
            } return V
      }

      function E(_, j, T) {
        for (var D = 0; T--;) _[T] -= D, D = _[T] < j[T] ? 1 : 0, _[T] = D * c + _[T] - j[T];
        for (; !_[0] && _.length > 1;) _.shift()
      }
      return function(_, j, T, D) {
        var R, V, Z, Y, te, he, q, ue, ee, H, Se, G, Ae, Pe, Ce, L, re, ie, J = _.constructor,
          ne = _.s == j.s ? 1 : -1,
          me = _.d,
          se = j.d;
        if (!_.s) return new J(_);
        if (!j.s) throw Error(i + "Division by zero");
        for (V = _.e - j.e, re = se.length, Ce = me.length, q = new J(ne), ue = q.d = [], Z = 0; se[Z] == (me[Z] || 0);) ++Z;
        if (se[Z] > (me[Z] || 0) && --V, T == null ? G = T = J.precision : D ? G = T + (h(_) - h(j)) + 1 : G = T, G < 0) return new J(0);
        if (G = G / p + 2 | 0, Z = 0, re == 1)
          for (Y = 0, se = se[0], G++;
            (Z < Ce || Y) && G--; Z++) Ae = Y * c + (me[Z] || 0), ue[Z] = Ae / se | 0, Y = Ae % se | 0;
        else {
          for (Y = c / (se[0] + 1) | 0, Y > 1 && (se = b(se, Y), me = b(me, Y), re = se.length, Ce = me.length), Pe = re, ee = me.slice(0, re), H = ee.length; H < re;) ee[H++] = 0;
          ie = se.slice(), ie.unshift(0), L = se[0], se[1] >= c / 2 && ++L;
          do Y = 0, R = O(se, ee, re, H), R < 0 ? (Se = ee[0], re != H && (Se = Se * c + (ee[1] || 0)), Y = Se / L | 0, Y > 1 ? (Y >= c && (Y = c - 1), te = b(se, Y), he = te.length, H = ee.length, R = O(te, ee, he, H), R == 1 && (Y--, E(te, re < he ? ie : se, he))) : (Y == 0 && (R = Y = 1), te = se.slice()), he = te.length, he < H && te.unshift(0), E(ee, te, H), R == -1 && (H = ee.length, R = O(se, ee, re, H), R < 1 && (Y++, E(ee, re < H ? ie : se, H))), H = ee.length) : R === 0 && (Y++, ee = [0]), ue[Z++] = Y, R && ee[0] ? ee[H++] = me[Pe] || 0 : (ee = [me[Pe]], H = 1); while ((Pe++ < Ce || ee[0] !== void 0) && G--)
        }
        return ue[0] || ue.shift(), q.e = V, B(q, D ? T + h(q) + 1 : T)
      }
    }();

    function A(b, O) {
      var E, _, j, T, D, R, V = 0,
        Z = 0,
        Y = b.constructor,
        te = Y.precision;
      if (h(b) > 16) throw Error(a + h(b));
      if (!b.s) return new Y(f);
      for (O == null ? (n = !1, R = te) : R = O, D = new Y(.03125); b.abs().gte(.1);) b = b.times(D), Z += 5;
      for (_ = Math.log(s(2, Z)) / Math.LN10 * 2 + 5 | 0, R += _, E = j = T = new Y(f), Y.precision = R;;) {
        if (j = B(j.times(b), R), E = E.times(++V), D = T.plus(S(j, E, R)), w(D.d).slice(0, R) === w(T.d).slice(0, R)) {
          for (; Z--;) T = B(T.times(T), R);
          return Y.precision = te, O == null ? (n = !0, B(T, te)) : T
        }
        T = D
      }
    }

    function h(b) {
      for (var O = b.e * p, E = b.d[0]; E >= 10; E /= 10) O++;
      return O
    }

    function g(b, O, E) {
      if (O > b.LN10.sd()) throw n = !0, E && (b.precision = E), Error(i + "LN10 precision limit exceeded");
      return B(new b(b.LN10), O)
    }

    function P(b) {
      for (var O = ""; b--;) O += "0";
      return O
    }

    function C(b, O) {
      var E, _, j, T, D, R, V, Z, Y, te = 1,
        he = 10,
        q = b,
        ue = q.d,
        ee = q.constructor,
        H = ee.precision;
      if (q.s < 1) throw Error(i + (q.s ? "NaN" : "-Infinity"));
      if (q.eq(f)) return new ee(0);
      if (O == null ? (n = !1, Z = H) : Z = O, q.eq(10)) return O == null && (n = !0), g(ee, Z);
      if (Z += he, ee.precision = Z, E = w(ue), _ = E.charAt(0), T = h(q), Math.abs(T) < 15e14) {
        for (; _ < 7 && _ != 1 || _ == 1 && E.charAt(1) > 3;) q = q.times(b), E = w(q.d), _ = E.charAt(0), te++;
        T = h(q), _ > 1 ? (q = new ee("0." + E), T++) : q = new ee(_ + "." + E.slice(1))
      } else return V = g(ee, Z + 2, H).times(T + ""), q = C(new ee(_ + "." + E.slice(1)), Z - he).plus(V), ee.precision = H, O == null ? (n = !0, B(q, H)) : q;
      for (R = D = q = S(q.minus(f), q.plus(f), Z), Y = B(q.times(q), Z), j = 3;;) {
        if (D = B(D.times(Y), Z), V = R.plus(S(D, new ee(j), Z)), w(V.d).slice(0, Z) === w(R.d).slice(0, Z)) return R = R.times(2), T !== 0 && (R = R.plus(g(ee, Z + 2, H).times(T + ""))), R = S(R, new ee(te), Z), ee.precision = H, O == null ? (n = !0, B(R, H)) : R;
        R = V, j += 2
      }
    }

    function k(b, O) {
      var E, _, j;
      for ((E = O.indexOf(".")) > -1 && (O = O.replace(".", "")), (_ = O.search(/e/i)) > 0 ? (E < 0 && (E = _), E += +O.slice(_ + 1), O = O.substring(0, _)) : E < 0 && (E = O.length), _ = 0; O.charCodeAt(_) === 48;) ++_;
      for (j = O.length; O.charCodeAt(j - 1) === 48;) --j;
      if (O = O.slice(_, j), O) {
        if (j -= _, E = E - _ - 1, b.e = u(E / p), b.d = [], _ = (E + 1) % p, E < 0 && (_ += p), _ < j) {
          for (_ && b.d.push(+O.slice(0, _)), j -= p; _ < j;) b.d.push(+O.slice(_, _ += p));
          O = O.slice(_), _ = p - O.length
        } else _ -= j;
        for (; _--;) O += "0";
        if (b.d.push(+O), n && (b.e > y || b.e < -y)) throw Error(a + E)
      } else b.s = 0, b.e = 0, b.d = [0];
      return b
    }

    function B(b, O, E) {
      var _, j, T, D, R, V, Z, Y, te = b.d;
      for (D = 1, T = te[0]; T >= 10; T /= 10) D++;
      if (_ = O - D, _ < 0) _ += p, j = O, Z = te[Y = 0];
      else {
        if (Y = Math.ceil((_ + 1) / p), T = te.length, Y >= T) return b;
        for (Z = T = te[Y], D = 1; T >= 10; T /= 10) D++;
        _ %= p, j = _ - p + D
      }
      if (E !== void 0 && (T = s(10, D - j - 1), R = Z / T % 10 | 0, V = O < 0 || te[Y + 1] !== void 0 || Z % T, V = E < 4 ? (R || V) && (E == 0 || E == (b.s < 0 ? 3 : 2)) : R > 5 || R == 5 && (E == 4 || V || E == 6 && (_ > 0 ? j > 0 ? Z / s(10, D - j) : 0 : te[Y - 1]) % 10 & 1 || E == (b.s < 0 ? 8 : 7))), O < 1 || !te[0]) return V ? (T = h(b), te.length = 1, O = O - T - 1, te[0] = s(10, (p - O % p) % p), b.e = u(-O / p) || 0) : (te.length = 1, te[0] = b.e = b.s = 0), b;
      if (_ == 0 ? (te.length = Y, T = 1, Y--) : (te.length = Y + 1, T = s(10, p - _), te[Y] = j > 0 ? (Z / s(10, D - j) % s(10, j) | 0) * T : 0), V)
        for (;;)
          if (Y == 0) {
            (te[0] += T) == c && (te[0] = 1, ++b.e);
            break
          } else {
            if (te[Y] += T, te[Y] != c) break;
            te[Y--] = 0, T = 1
          } for (_ = te.length; te[--_] === 0;) te.pop();
      if (n && (b.e > y || b.e < -y)) throw Error(a + h(b));
      return b
    }

    function z(b, O) {
      var E, _, j, T, D, R, V, Z, Y, te, he = b.constructor,
        q = he.precision;
      if (!b.s || !O.s) return O.s ? O.s = -O.s : O = new he(b), n ? B(O, q) : O;
      if (V = b.d, te = O.d, _ = O.e, Z = b.e, V = V.slice(), D = Z - _, D) {
        for (Y = D < 0, Y ? (E = V, D = -D, R = te.length) : (E = te, _ = Z, R = V.length), j = Math.max(Math.ceil(q / p), R) + 2, D > j && (D = j, E.length = 1), E.reverse(), j = D; j--;) E.push(0);
        E.reverse()
      } else {
        for (j = V.length, R = te.length, Y = j < R, Y && (R = j), j = 0; j < R; j++)
          if (V[j] != te[j]) {
            Y = V[j] < te[j];
            break
          } D = 0
      }
      for (Y && (E = V, V = te, te = E, O.s = -O.s), R = V.length, j = te.length - R; j > 0; --j) V[R++] = 0;
      for (j = te.length; j > D;) {
        if (V[--j] < te[j]) {
          for (T = j; T && V[--T] === 0;) V[T] = c - 1;
          --V[T], V[j] += c
        }
        V[j] -= te[j]
      }
      for (; V[--R] === 0;) V.pop();
      for (; V[0] === 0; V.shift()) --_;
      return V[0] ? (O.d = V, O.e = _, n ? B(O, q) : O) : new he(0)
    }

    function N(b, O, E) {
      var _, j = h(b),
        T = w(b.d),
        D = T.length;
      return O ? (E && (_ = E - D) > 0 ? T = T.charAt(0) + "." + T.slice(1) + P(_) : D > 1 && (T = T.charAt(0) + "." + T.slice(1)), T = T + (j < 0 ? "e" : "e+") + j) : j < 0 ? (T = "0." + P(-j - 1) + T, E && (_ = E - D) > 0 && (T += P(_))) : j >= D ? (T += P(j + 1 - D), E && (_ = E - j - 1) > 0 && (T = T + "." + P(_))) : ((_ = j + 1) < D && (T = T.slice(0, _) + "." + T.slice(_)), E && (_ = E - D) > 0 && (j + 1 === D && (T += "."), T += P(_))), b.s < 0 ? "-" + T : T
    }

    function K(b, O) {
      if (b.length > O) return b.length = O, !0
    }

    function U(b) {
      var O, E, _;

      function j(T) {
        var D = this;
        if (!(D instanceof j)) return new j(T);
        if (D.constructor = j, T instanceof j) {
          D.s = T.s, D.e = T.e, D.d = (T = T.d) ? T.slice() : T;
          return
        }
        if (typeof T == "number") {
          if (T * 0 !== 0) throw Error(o + T);
          if (T > 0) D.s = 1;
          else if (T < 0) T = -T, D.s = -1;
          else {
            D.s = 0, D.e = 0, D.d = [0];
            return
          }
          if (T === ~~T && T < 1e7) {
            D.e = 0, D.d = [T];
            return
          }
          return k(D, T.toString())
        } else if (typeof T != "string") throw Error(o + T);
        if (T.charCodeAt(0) === 45 ? (T = T.slice(1), D.s = -1) : D.s = 1, l.test(T)) k(D, T);
        else throw Error(o + T)
      }
      if (j.prototype = m, j.ROUND_UP = 0, j.ROUND_DOWN = 1, j.ROUND_CEIL = 2, j.ROUND_FLOOR = 3, j.ROUND_HALF_UP = 4, j.ROUND_HALF_DOWN = 5, j.ROUND_HALF_EVEN = 6, j.ROUND_HALF_CEIL = 7, j.ROUND_HALF_FLOOR = 8, j.clone = U, j.config = j.set = W, b === void 0 && (b = {}), b)
        for (_ = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], O = 0; O < _.length;) b.hasOwnProperty(E = _[O++]) || (b[E] = this[E]);
      return j.config(b), j
    }

    function W(b) {
      if (!b || typeof b != "object") throw Error(i + "Object expected");
      var O, E, _, j = ["precision", 1, t, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (O = 0; O < j.length; O += 3)
        if ((_ = b[E = j[O]]) !== void 0)
          if (u(_) === _ && _ >= j[O + 1] && _ <= j[O + 2]) this[E] = _;
          else throw Error(o + E + ": " + _);
      if ((_ = b[E = "LN10"]) !== void 0)
        if (_ == Math.LN10) this[E] = new this(_);
        else throw Error(o + E + ": " + _);
      return this
    }
    r = U(r), r.default = r.Decimal = r, f = new r(1), typeof define == "function" && define.amd ? define(function() {
      return r
    }) : typeof us < "u" && us.exports ? us.exports = r : (e || (e = typeof self < "u" && self && self.self == self ? self : Function("return this")()), e.Decimal = r)
  })($w)
});
var C1 = I((eee, M1) => {
  function Cz(e) {
    var t = e == null ? 0 : e.length;
    return t ? e[t - 1] : void 0
  }
  M1.exports = Cz
});
var V1 = I((bee, K1) => {
  "use strict";
  var oF = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  K1.exports = oF
});
var J1 = I((xee, Z1) => {
  "use strict";
  var aF = V1();

  function X1() {}

  function Y1() {}
  Y1.resetWarningCache = X1;
  Z1.exports = function() {
    function e(n, i, o, a, u, s) {
      if (s !== aF) {
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
      checkPropTypes: Y1,
      resetWarningCache: X1
    };
    return r.PropTypes = r, r
  }
});
var eO = I((See, Q1) => {
  Q1.exports = J1()();
  var wee, Oee
});
var LO = I((lte, RO) => {
  var i$ = Dc(),
    o$ = i$(Object.getPrototypeOf, Object);
  RO.exports = o$
});
var WO = I((cte, qO) => {
  var a$ = Gt(),
    u$ = LO(),
    s$ = Kt(),
    l$ = "[object Object]",
    c$ = Function.prototype,
    f$ = Object.prototype,
    BO = c$.toString,
    p$ = f$.hasOwnProperty,
    d$ = BO.call(Object);

  function m$(e) {
    if (!s$(e) || a$(e) != l$) return !1;
    var t = u$(e);
    if (t === null) return !0;
    var r = p$.call(t, "constructor") && t.constructor;
    return typeof r == "function" && r instanceof r && BO.call(r) == d$
  }
  qO.exports = m$
});
var FO = I((fte, zO) => {
  var h$ = Gt(),
    y$ = Kt(),
    v$ = "[object Boolean]";

  function g$(e) {
    return e === !0 || e === !1 || y$(e) && h$(e) == v$
  }
  zO.exports = g$
});
var iS = I((Ate, nS) => {
  var K$ = Math.ceil,
    V$ = Math.max;

  function X$(e, t, r, n) {
    for (var i = -1, o = V$(K$((t - e) / (r || 1)), 0), a = Array(o); o--;) a[n ? o : ++i] = e, e += r;
    return a
  }
  nS.exports = X$
});
var zp = I((_te, aS) => {
  var Y$ = af(),
    oS = 1 / 0,
    Z$ = 17976931348623157e292;

  function J$(e) {
    if (!e) return e === 0 ? e : 0;
    if (e = Y$(e), e === oS || e === -oS) {
      var t = e < 0 ? -1 : 1;
      return t * Z$
    }
    return e === e ? e : 0
  }
  aS.exports = J$
});
var sS = I((Pte, uS) => {
  var Q$ = iS(),
    e8 = ro(),
    Fp = zp();

  function t8(e) {
    return function(t, r, n) {
      return n && typeof n != "number" && e8(t, r, n) && (r = n = void 0), t = Fp(t), r === void 0 ? (r = t, t = 0) : r = Fp(r), n = n === void 0 ? t < r ? 1 : -1 : Fp(n), Q$(t, r, n, e)
    }
  }
  uS.exports = t8
});
var $p = I((Tte, lS) => {
  var r8 = sS(),
    n8 = r8();
  lS.exports = n8
});
var wS = I((qte, xS) => {
  var v8 = hu();

  function g8(e, t) {
    var r;
    return v8(e, function(n, i, o) {
      return r = t(n, i, o), !r
    }), !!r
  }
  xS.exports = g8
});
var SS = I((Wte, OS) => {
  var b8 = _c(),
    x8 = lr(),
    w8 = wS(),
    O8 = rt(),
    S8 = ro();

  function A8(e, t, r) {
    var n = O8(e) ? b8 : w8;
    return r && S8(e, t, r) && (t = void 0), n(e, x8(t, 3))
  }
  OS.exports = A8
});
var PS = I((Fte, _S) => {
  var AS = Jc();

  function _8(e, t, r) {
    t == "__proto__" && AS ? AS(e, t, {
      configurable: !0,
      enumerable: !0,
      value: r,
      writable: !0
    }) : e[t] = r
  }
  _S.exports = _8
});
var ES = I(($te, TS) => {
  var P8 = PS(),
    T8 = Xc(),
    E8 = lr();

  function j8(e, t) {
    var r = {};
    return t = E8(t, 3), T8(e, function(n, i, o) {
      P8(r, i, t(n, i, o))
    }), r
  }
  TS.exports = j8
});
var MS = I((Ute, jS) => {
  function M8(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n;)
      if (!t(e[r], r, e)) return !1;
    return !0
  }
  jS.exports = M8
});
var IS = I((Hte, CS) => {
  var C8 = hu();

  function I8(e, t) {
    var r = !0;
    return C8(e, function(n, i, o) {
      return r = !!t(n, i, o), r
    }), r
  }
  CS.exports = I8
});
var Kp = I((Gte, kS) => {
  var k8 = MS(),
    D8 = IS(),
    N8 = lr(),
    R8 = rt(),
    L8 = ro();

  function B8(e, t, r) {
    var n = R8(e) ? k8 : D8;
    return r && L8(e, t, r) && (t = void 0), n(e, N8(t, 3))
  }
  kS.exports = B8
});
var JS = I((vre, ZS) => {
  var s6 = lr(),
    l6 = Dn(),
    c6 = eo();

  function f6(e) {
    return function(t, r, n) {
      var i = Object(t);
      if (!l6(t)) {
        var o = s6(r, 3);
        t = c6(t), r = function(u) {
          return o(i[u], u, i)
        }
      }
      var a = e(t, r, n);
      return a > -1 ? i[o ? t[a] : a] : void 0
    }
  }
  ZS.exports = f6
});
var eA = I((gre, QS) => {
  var p6 = zp();

  function d6(e) {
    var t = p6(e),
      r = t % 1;
    return t === t ? r ? t - r : t : 0
  }
  QS.exports = d6
});
var rA = I((bre, tA) => {
  var m6 = Uc(),
    h6 = lr(),
    y6 = eA(),
    v6 = Math.max;

  function g6(e, t, r) {
    var n = e == null ? 0 : e.length;
    if (!n) return -1;
    var i = r == null ? 0 : y6(r);
    return i < 0 && (i = v6(n + i, 0)), m6(e, h6(t, 3), i)
  }
  tA.exports = g6
});
var iA = I((xre, nA) => {
  var b6 = JS(),
    x6 = rA(),
    w6 = b6(x6);
  nA.exports = w6
});
var h_ = I((hie, bd) => {
  "use strict";
  var c4 = Object.prototype.hasOwnProperty,
    ut = "~";

  function _a() {}
  Object.create && (_a.prototype = Object.create(null), new _a().__proto__ || (ut = !1));

  function f4(e, t, r) {
    this.fn = e, this.context = t, this.once = r || !1
  }

  function m_(e, t, r, n, i) {
    if (typeof r != "function") throw new TypeError("The listener must be a function");
    var o = new f4(r, n || e, i),
      a = ut ? ut + t : t;
    return e._events[a] ? e._events[a].fn ? e._events[a] = [e._events[a], o] : e._events[a].push(o) : (e._events[a] = o, e._eventsCount++), e
  }

  function rl(e, t) {
    --e._eventsCount === 0 ? e._events = new _a : delete e._events[t]
  }

  function tt() {
    this._events = new _a, this._eventsCount = 0
  }
  tt.prototype.eventNames = function() {
    var t = [],
      r, n;
    if (this._eventsCount === 0) return t;
    for (n in r = this._events) c4.call(r, n) && t.push(ut ? n.slice(1) : n);
    return Object.getOwnPropertySymbols ? t.concat(Object.getOwnPropertySymbols(r)) : t
  };
  tt.prototype.listeners = function(t) {
    var r = ut ? ut + t : t,
      n = this._events[r];
    if (!n) return [];
    if (n.fn) return [n.fn];
    for (var i = 0, o = n.length, a = new Array(o); i < o; i++) a[i] = n[i].fn;
    return a
  };
  tt.prototype.listenerCount = function(t) {
    var r = ut ? ut + t : t,
      n = this._events[r];
    return n ? n.fn ? 1 : n.length : 0
  };
  tt.prototype.emit = function(t, r, n, i, o, a) {
    var u = ut ? ut + t : t;
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
  tt.prototype.on = function(t, r, n) {
    return m_(this, t, r, n, !1)
  };
  tt.prototype.once = function(t, r, n) {
    return m_(this, t, r, n, !0)
  };
  tt.prototype.removeListener = function(t, r, n, i) {
    var o = ut ? ut + t : t;
    if (!this._events[o]) return this;
    if (!r) return rl(this, o), this;
    var a = this._events[o];
    if (a.fn) a.fn === r && (!i || a.once) && (!n || a.context === n) && rl(this, o);
    else {
      for (var u = 0, s = [], l = a.length; u < l; u++)(a[u].fn !== r || i && !a[u].once || n && a[u].context !== n) && s.push(a[u]);
      s.length ? this._events[o] = s.length === 1 ? s[0] : s : rl(this, o)
    }
    return this
  };
  tt.prototype.removeAllListeners = function(t) {
    var r;
    return t ? (r = ut ? ut + t : t, this._events[r] && rl(this, r)) : (this._events = new _a, this._eventsCount = 0), this
  };
  tt.prototype.off = tt.prototype.removeListener;
  tt.prototype.addListener = tt.prototype.on;
  tt.prefixed = ut;
  tt.EventEmitter = tt;
  typeof bd < "u" && (bd.exports = tt)
});
import hl, {
  useState as Ge,
  useEffect as Ea,
  useCallback as Ht,
  useRef as J4
} from "./react-shim-eraudit.js";
import Bl from "./react-shim-eraudit.js";

function Ed(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++) e[t] && (r = Ed(e[t])) && (n && (n += " "), n += r)
    } else
      for (r in e) e[r] && (n && (n += " "), n += r);
  return n
}

function X_() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++)(e = arguments[r]) && (t = Ed(e)) && (n && (n += " "), n += t);
  return n
}
var oe = X_;
var kl = Q(Nr()),
  wn = Q(Ot()),
  Ch = Q(Ra()),
  Ih = Q(De()),
  kh = Q(wt()),
  Dh = Q(yh());
import {
  Children as Dl,
  isValidElement as nj
} from "./react-shim-eraudit.js";
var bn = Q(Ra()),
  El = Q(Tl()),
  bh = Q(Nr()),
  xh = Q(Pl()),
  wh = Q(Ot()),
  Xe = function(t) {
    return t === 0 ? 0 : t > 0 ? 1 : -1
  },
  ur = function(t) {
    return (0, bn.default)(t) && t.indexOf("%") === t.length - 1
  },
  X = function(t) {
    return (0, xh.default)(t) && !(0, El.default)(t)
  },
  Oh = function(t) {
    return (0, wh.default)(t)
  },
  Ee = function(t) {
    return X(t) || (0, bn.default)(t)
  },
  YE = 0,
  Vt = function(t) {
    var r = ++YE;
    return "".concat(t || "").concat(r)
  },
  Nt = function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!X(t) && !(0, bn.default)(t)) return n;
    var o;
    if (ur(t)) {
      var a = t.indexOf("%");
      o = r * parseFloat(t.slice(0, a)) / 100
    } else o = +t;
    return (0, El.default)(o) && (o = n), i && o > r && (o = r), o
  },
  Xt = function(t) {
    if (!t) return null;
    var r = Object.keys(t);
    return r && r.length ? t[r[0]] : null
  },
  Sh = function(t) {
    if (!Array.isArray(t)) return !1;
    for (var r = t.length, n = {}, i = 0; i < r; i++)
      if (!n[t[i]]) n[t[i]] = !0;
      else return !0;
    return !1
  },
  pt = function(t, r) {
    return X(t) && X(r) ? function(n) {
      return t + n * (r - t)
    } : function() {
      return r
    }
  };

function xn(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : (0, bh.default)(n, t)) === r
  })
}
var Ah = function(t, r) {
  return X(t) && X(r) ? t - r : (0, bn.default)(t) && (0, bn.default)(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r))
};

function sr(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r])) return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n)) return !1;
  return !0
}
var Ml = Q(wt());
import {
  isValidElement as ZE
} from "./react-shim-eraudit.js";

function jl(e) {
  "@babel/helpers - typeof";
  return jl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, jl(e)
}
var JE = ["viewBox", "children"],
  Ph = ["aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "className", "color", "height", "id", "lang", "max", "media", "method", "min", "name", "style", "target", "width", "role", "tabIndex", "accentHeight", "accumulate", "additive", "alignmentBaseline", "allowReorder", "alphabetic", "amplitude", "arabicForm", "ascent", "attributeName", "attributeType", "autoReverse", "azimuth", "baseFrequency", "baselineShift", "baseProfile", "bbox", "begin", "bias", "by", "calcMode", "capHeight", "clip", "clipPath", "clipPathUnits", "clipRule", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "contentScriptType", "contentStyleType", "cursor", "cx", "cy", "d", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominantBaseline", "dur", "dx", "dy", "edgeMode", "elevation", "enableBackground", "end", "exponent", "externalResourcesRequired", "fill", "fillOpacity", "fillRule", "filter", "filterRes", "filterUnits", "floodColor", "floodOpacity", "focusable", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "format", "from", "fx", "fy", "g1", "g2", "glyphName", "glyphOrientationHorizontal", "glyphOrientationVertical", "glyphRef", "gradientTransform", "gradientUnits", "hanging", "horizAdvX", "horizOriginX", "href", "ideographic", "imageRendering", "in2", "in", "intercept", "k1", "k2", "k3", "k4", "k", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letterSpacing", "lightingColor", "limitingConeAngle", "local", "markerEnd", "markerHeight", "markerMid", "markerStart", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "mode", "numOctaves", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlinePosition", "overlineThickness", "paintOrder", "panose1", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointerEvents", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "r", "radius", "refX", "refY", "renderingIntent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "result", "rotate", "rx", "ry", "seed", "shapeRendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stopColor", "stopOpacity", "strikethroughPosition", "strikethroughThickness", "string", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textAnchor", "textDecoration", "textLength", "textRendering", "to", "transform", "u1", "u2", "underlinePosition", "underlineThickness", "unicode", "unicodeBidi", "unicodeRange", "unitsPerEm", "vAlphabetic", "values", "vectorEffect", "version", "vertAdvY", "vertOriginX", "vertOriginY", "vHanging", "vIdeographic", "viewTarget", "visibility", "vMathematical", "widths", "wordSpacing", "writingMode", "x1", "x2", "x", "xChannelSelector", "xHeight", "xlinkActuate", "xlinkArcrole", "xlinkHref", "xlinkRole", "xlinkShow", "xlinkTitle", "xlinkType", "xmlBase", "xmlLang", "xmlns", "xmlnsXlink", "xmlSpace", "y1", "y2", "y", "yChannelSelector", "z", "zoomAndPan", "ref", "key", "angle"],
  _h = ["points", "pathLength"],
  Ka = {
    svg: JE,
    polygon: _h,
    polyline: _h
  },
  Va = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"],
  Rr = function(t, r) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var n = t;
    if (ZE(t) && (n = t.props), !(0, Ml.default)(n)) return null;
    var i = {};
    return Object.keys(n).forEach(function(o) {
      Va.includes(o) && (i[o] = r || function(a) {
        return n[o](n, a)
      })
    }), i
  },
  QE = function(t, r, n) {
    return function(i) {
      return t(r, n, i), null
    }
  },
  Lr = function(t, r, n) {
    if (!(0, Ml.default)(t) || jl(t) !== "object") return null;
    var i = null;
    return Object.keys(t).forEach(function(o) {
      var a = t[o];
      Va.includes(o) && typeof a == "function" && (i || (i = {}), i[o] = QE(a, r, n))
    }), i
  };
var ej = ["children"],
  tj = ["children"];

function Th(e, t) {
  if (e == null) return {};
  var r = rj(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function rj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Il(e) {
  "@babel/helpers - typeof";
  return Il = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Il(e)
}
var Eh = {
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
  jh = null,
  Cl = null,
  Nl = function e(t) {
    if (t === jh && Array.isArray(Cl)) return Cl;
    var r = [];
    return Dl.forEach(t, function(n) {
      (0, wn.default)(n) || ((0, Dh.isFragment)(n) ? r = r.concat(e(n.props.children)) : r.push(n))
    }), Cl = r, jh = t, r
  };

function qe(e, t) {
  var r = [],
    n = [];
  return Array.isArray(t) ? n = t.map(function(i) {
    return At(i)
  }) : n = [At(t)], Nl(e).forEach(function(i) {
    var o = (0, kl.default)(i, "type.displayName") || (0, kl.default)(i, "type.name");
    n.indexOf(o) !== -1 && r.push(i)
  }), r
}

function Ye(e, t) {
  var r = qe(e, t);
  return r && r[0]
}
var Rl = function(t) {
    if (!t || !t.props) return !1;
    var r = t.props,
      n = r.width,
      i = r.height;
    return !(!X(n) || n <= 0 || !X(i) || i <= 0)
  },
  ij = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"],
  oj = function(t) {
    return t && t.type && (0, Ch.default)(t.type) && ij.indexOf(t.type) >= 0
  },
  Nh = function(t) {
    return t && Il(t) === "object" && "clipDot" in t
  },
  aj = function(t, r, n, i) {
    var o, a = (o = Ka === null || Ka === void 0 ? void 0 : Ka[i]) !== null && o !== void 0 ? o : [];
    return r.startsWith("data-") || !(0, Ih.default)(t) && (i && a.includes(r) || Ph.includes(r)) || n && Va.includes(r)
  };
var ae = function(t, r, n) {
    if (!t || typeof t == "function" || typeof t == "boolean") return null;
    var i = t;
    if (nj(t) && (i = t.props), !(0, kh.default)(i)) return null;
    var o = {};
    return Object.keys(i).forEach(function(a) {
      var u;
      aj((u = i) === null || u === void 0 ? void 0 : u[a], a, r, n) && (o[a] = i[a])
    }), o
  },
  Xa = function e(t, r) {
    if (t === r) return !0;
    var n = Dl.count(t);
    if (n !== Dl.count(r)) return !1;
    if (n === 0) return !0;
    if (n === 1) return Mh(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
    for (var i = 0; i < n; i++) {
      var o = t[i],
        a = r[i];
      if (Array.isArray(o) || Array.isArray(a)) {
        if (!e(o, a)) return !1
      } else if (!Mh(o, a)) return !1
    }
    return !0
  },
  Mh = function(t, r) {
    if ((0, wn.default)(t) && (0, wn.default)(r)) return !0;
    if (!(0, wn.default)(t) && !(0, wn.default)(r)) {
      var n = t.props || {},
        i = n.children,
        o = Th(n, ej),
        a = r.props || {},
        u = a.children,
        s = Th(a, tj);
      return i && u ? sr(o, s) && Xa(i, u) : !i && !u ? sr(o, s) : !1
    }
    return !1
  },
  Ll = function(t, r) {
    var n = [],
      i = {};
    return Nl(t).forEach(function(o, a) {
      if (oj(o)) n.push(o);
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
  Rh = function(t) {
    var r = t && t.type;
    return r && Eh[r] ? Eh[r] : null
  },
  Lh = function(t, r) {
    return Nl(r).indexOf(t)
  };
var uj = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];

function ql() {
  return ql = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ql.apply(this, arguments)
}

function sj(e, t) {
  if (e == null) return {};
  var r = lj(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function lj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Hi(e) {
  var t = e.children,
    r = e.width,
    n = e.height,
    i = e.viewBox,
    o = e.className,
    a = e.style,
    u = e.title,
    s = e.desc,
    l = sj(e, uj),
    f = i || {
      width: r,
      height: n,
      x: 0,
      y: 0
    },
    c = oe("recharts-surface", o);
  return Bl.createElement("svg", ql({}, ae(l, !0, "svg"), {
    className: c,
    width: r,
    height: n,
    style: a,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), Bl.createElement("title", null, u), Bl.createElement("desc", null, s), t)
}
import Bh from "./react-shim-eraudit.js";
var cj = ["children", "className"];

function Wl() {
  return Wl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Wl.apply(this, arguments)
}

function fj(e, t) {
  if (e == null) return {};
  var r = pj(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function pj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var ge = Bh.forwardRef(function(e, t) {
  var r = e.children,
    n = e.className,
    i = fj(e, cj),
    o = oe("recharts-layer", n);
  return Bh.createElement("g", Wl({
    className: o
  }, ae(i, !0), {
    ref: t
  }), r)
});
import to, {
  PureComponent as OD
} from "./react-shim-eraudit.js";
var Oc = Q(De());
import Yt, {
  PureComponent as PM
} from "./react-shim-eraudit.js";
var dj = !1,
  nt = function(t, r) {
    for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) i[o - 2] = arguments[o];
    if (dj && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var a = 0;
        console.warn(r.replace(/%s/g, function() {
          return i[a++]
        }))
      }
  };
var bc = Q(Ya());
import dM from "./react-shim-eraudit.js";

function we(e) {
  return function() {
    return e
  }
}
var Ul = Math.cos;
var Gi = Math.sin,
  Ue = Math.sqrt;
var Br = Math.PI,
  DH = Br / 2,
  On = 2 * Br;
var Hl = Math.PI,
  Gl = 2 * Hl,
  qr = 1e-6,
  Zj = Gl - qr;

function oy(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t) this._ += arguments[t] + e[t]
}

function Jj(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return oy;
  let r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, o = n.length; i < o; ++i) this._ += Math.round(arguments[i] * r) / r + n[i]
  }
}
var Wr = class {
  constructor(t) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = t == null ? oy : Jj(t)
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
    else if (p > qr)
      if (!(Math.abs(c * s - l * f) > qr) || !o) this._append`L${this._x1=t},${this._y1=r}`;
      else {
        let d = n - a,
          y = i - u,
          m = s * s + l * l,
          v = d * d + y * y,
          x = Math.sqrt(m),
          w = Math.sqrt(p),
          S = o * Math.tan((Hl - Math.acos((m + p - v) / (2 * x * w))) / 2),
          A = S / w,
          h = S / x;
        Math.abs(A - 1) > qr && this._append`L${t+A*f},${r+A*c}`, this._append`A${o},${o},0,0,${+(c*d>f*y)},${this._x1=t+h*s},${this._y1=r+h*l}`
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
    this._x1 === null ? this._append`M${l},${f}` : (Math.abs(this._x1 - l) > qr || Math.abs(this._y1 - f) > qr) && this._append`L${l},${f}`, n && (p < 0 && (p = p % Gl + Gl), p > Zj ? this._append`A${n},${n},0,1,${c},${t-u},${r-s}A${n},${n},0,1,${c},${this._x1=l},${this._y1=f}` : p > qr && this._append`A${n},${n},0,${+(p>=Hl)},${c},${this._x1=t+n*Math.cos(o)},${this._y1=r+n*Math.sin(o)}`)
  }
  rect(t, r, n, i) {
    this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+r}h${n=+n}v${+i}h${-n}Z`
  }
  toString() {
    return this._
  }
};

function ay() {
  return new Wr
}
ay.prototype = Wr.prototype;

function Sn(e) {
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
  }, () => new Wr(t)
}
var FH = Array.prototype.slice;

function An(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e)
}

function uy(e) {
  this._context = e
}
uy.prototype = {
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

function br(e) {
  return new uy(e)
}

function Za(e) {
  return e[0]
}

function Ja(e) {
  return e[1]
}

function Ki(e, t) {
  var r = we(!0),
    n = null,
    i = br,
    o = null,
    a = Sn(u);
  e = typeof e == "function" ? e : e === void 0 ? Za : we(e), t = typeof t == "function" ? t : t === void 0 ? Ja : we(t);

  function u(s) {
    var l, f = (s = An(s)).length,
      c, p = !1,
      d;
    for (n == null && (o = i(d = a())), l = 0; l <= f; ++l) !(l < f && r(c = s[l], l, s)) === p && ((p = !p) ? o.lineStart() : o.lineEnd()), p && o.point(+e(c, l, s), +t(c, l, s));
    if (d) return o = null, d + "" || null
  }
  return u.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : we(+s), u) : e
  }, u.y = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : we(+s), u) : t
  }, u.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : we(!!s), u) : r
  }, u.curve = function(s) {
    return arguments.length ? (i = s, n != null && (o = i(n)), u) : i
  }, u.context = function(s) {
    return arguments.length ? (s == null ? n = o = null : o = i(n = s), u) : n
  }, u
}

function _n(e, t, r) {
  var n = null,
    i = we(!0),
    o = null,
    a = br,
    u = null,
    s = Sn(l);
  e = typeof e == "function" ? e : e === void 0 ? Za : we(+e), t = typeof t == "function" ? t : t === void 0 ? we(0) : we(+t), r = typeof r == "function" ? r : r === void 0 ? Ja : we(+r);

  function l(c) {
    var p, d, y, m = (c = An(c)).length,
      v, x = !1,
      w, S = new Array(m),
      A = new Array(m);
    for (o == null && (u = a(w = s())), p = 0; p <= m; ++p) {
      if (!(p < m && i(v = c[p], p, c)) === x)
        if (x = !x) d = p, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), y = p - 1; y >= d; --y) u.point(S[y], A[y]);
          u.lineEnd(), u.areaEnd()
        } x && (S[p] = +e(v, p, c), A[p] = +t(v, p, c), u.point(n ? +n(v, p, c) : S[p], r ? +r(v, p, c) : A[p]))
    }
    if (w) return u = null, w + "" || null
  }

  function f() {
    return Ki().defined(i).curve(a).context(o)
  }
  return l.x = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : we(+c), n = null, l) : e
  }, l.x0 = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : we(+c), l) : e
  }, l.x1 = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : we(+c), l) : n
  }, l.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : we(+c), r = null, l) : t
  }, l.y0 = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : we(+c), l) : t
  }, l.y1 = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : we(+c), l) : r
  }, l.lineX0 = l.lineY0 = function() {
    return f().x(e).y(t)
  }, l.lineY1 = function() {
    return f().x(e).y(r)
  }, l.lineX1 = function() {
    return f().x(n).y(t)
  }, l.defined = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : we(!!c), l) : i
  }, l.curve = function(c) {
    return arguments.length ? (a = c, o != null && (u = a(o)), l) : a
  }, l.context = function(c) {
    return arguments.length ? (c == null ? o = u = null : u = a(o = c), l) : o
  }, l
}
var Qa = class {
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

function Kl(e) {
  return new Qa(e, !0)
}

function Vl(e) {
  return new Qa(e, !1)
}
var Pn = {
  draw(e, t) {
    let r = Ue(t / Br);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, On)
  }
};
var Xl = {
  draw(e, t) {
    let r = Ue(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath()
  }
};
var sy = Ue(1 / 3),
  Qj = sy * 2,
  Yl = {
    draw(e, t) {
      let r = Ue(t / Qj),
        n = r * sy;
      e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath()
    }
  };
var Zl = {
  draw(e, t) {
    let r = Ue(t),
      n = -r / 2;
    e.rect(n, n, r, r)
  }
};
var eM = .8908130915292852,
  ly = Gi(Br / 10) / Gi(7 * Br / 10),
  tM = Gi(On / 10) * ly,
  rM = -Ul(On / 10) * ly,
  Jl = {
    draw(e, t) {
      let r = Ue(t * eM),
        n = tM * r,
        i = rM * r;
      e.moveTo(0, -r), e.lineTo(n, i);
      for (let o = 1; o < 5; ++o) {
        let a = On * o / 5,
          u = Ul(a),
          s = Gi(a);
        e.lineTo(s * r, -u * r), e.lineTo(u * n - s * i, s * n + u * i)
      }
      e.closePath()
    }
  };
var Ql = Ue(3),
  ec = {
    draw(e, t) {
      let r = -Ue(t / (Ql * 3));
      e.moveTo(0, r * 2), e.lineTo(-Ql * r, -r), e.lineTo(Ql * r, -r), e.closePath()
    }
  };
var _t = -.5,
  Pt = Ue(3) / 2,
  tc = 1 / Ue(12),
  nM = (tc / 2 + 1) * 3,
  rc = {
    draw(e, t) {
      let r = Ue(t / nM),
        n = r / 2,
        i = r * tc,
        o = n,
        a = r * tc + r,
        u = -o,
        s = a;
      e.moveTo(n, i), e.lineTo(o, a), e.lineTo(u, s), e.lineTo(_t * n - Pt * i, Pt * n + _t * i), e.lineTo(_t * o - Pt * a, Pt * o + _t * a), e.lineTo(_t * u - Pt * s, Pt * u + _t * s), e.lineTo(_t * n + Pt * i, _t * i - Pt * n), e.lineTo(_t * o + Pt * a, _t * a - Pt * o), e.lineTo(_t * u + Pt * s, _t * s - Pt * u), e.closePath()
    }
  };

function eu(e, t) {
  let r = null,
    n = Sn(i);
  e = typeof e == "function" ? e : we(e || Pn), t = typeof t == "function" ? t : we(t === void 0 ? 64 : +t);

  function i() {
    let o;
    if (r || (r = o = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), o) return r = null, o + "" || null
  }
  return i.type = function(o) {
    return arguments.length ? (e = typeof o == "function" ? o : we(o), i) : e
  }, i.size = function(o) {
    return arguments.length ? (t = typeof o == "function" ? o : we(+o), i) : t
  }, i.context = function(o) {
    return arguments.length ? (r = o ?? null, i) : r
  }, i
}

function Tn() {}

function En(e, t, r) {
  e._context.bezierCurveTo((2 * e._x0 + e._x1) / 3, (2 * e._y0 + e._y1) / 3, (e._x0 + 2 * e._x1) / 3, (e._y0 + 2 * e._y1) / 3, (e._x0 + 4 * e._x1 + t) / 6, (e._y0 + 4 * e._y1 + r) / 6)
}

function cy(e) {
  this._context = e
}
cy.prototype = {
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
        En(this, this._x1, this._y1);
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
        En(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function nc(e) {
  return new cy(e)
}

function fy(e) {
  this._context = e
}
fy.prototype = {
  areaStart: Tn,
  areaEnd: Tn,
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
        En(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function ic(e) {
  return new fy(e)
}

function py(e) {
  this._context = e
}
py.prototype = {
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
        En(this, e, t);
        break
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t
  }
};

function oc(e) {
  return new py(e)
}

function dy(e) {
  this._context = e
}
dy.prototype = {
  areaStart: Tn,
  areaEnd: Tn,
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

function ac(e) {
  return new dy(e)
}

function my(e) {
  return e < 0 ? -1 : 1
}

function hy(e, t, r) {
  var n = e._x1 - e._x0,
    i = t - e._x1,
    o = (e._y1 - e._y0) / (n || i < 0 && -0),
    a = (r - e._y1) / (i || n < 0 && -0),
    u = (o * i + a * n) / (n + i);
  return (my(o) + my(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0
}

function yy(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t
}

function uc(e, t, r) {
  var n = e._x0,
    i = e._y0,
    o = e._x1,
    a = e._y1,
    u = (o - n) / 3;
  e._context.bezierCurveTo(n + u, i + u * t, o - u, a - u * r, o, a)
}

function tu(e) {
  this._context = e
}
tu.prototype = {
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
        uc(this, this._t0, yy(this, this._t0));
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
          this._point = 3, uc(this, yy(this, r = hy(this, e, t)), r);
          break;
        default:
          uc(this, this._t0, r = hy(this, e, t));
          break
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r
    }
  }
};

function vy(e) {
  this._context = new gy(e)
}(vy.prototype = Object.create(tu.prototype)).point = function(e, t) {
  tu.prototype.point.call(this, t, e)
};

function gy(e) {
  this._context = e
}
gy.prototype = {
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

function sc(e) {
  return new tu(e)
}

function lc(e) {
  return new vy(e)
}

function xy(e) {
  this._context = e
}
xy.prototype = {
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
        for (var n = by(e), i = by(t), o = 0, a = 1; a < r; ++o, ++a) this._context.bezierCurveTo(n[0][o], i[0][o], n[1][o], i[1][o], e[a], t[a]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t)
  }
};

function by(e) {
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

function cc(e) {
  return new xy(e)
}

function ru(e, t) {
  this._context = e, this._t = t
}
ru.prototype = {
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

function fc(e) {
  return new ru(e, .5)
}

function pc(e) {
  return new ru(e, 0)
}

function dc(e) {
  return new ru(e, 1)
}

function Tt(e, t) {
  if ((a = e.length) > 1)
    for (var r = 1, n, i, o = e[t[0]], a, u = o.length; r < a; ++r)
      for (i = o, o = e[t[r]], n = 0; n < u; ++n) o[n][1] += o[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1]
}

function jn(e) {
  for (var t = e.length, r = new Array(t); --t >= 0;) r[t] = t;
  return r
}

function iM(e, t) {
  return e[t]
}

function oM(e) {
  let t = [];
  return t.key = e, t
}

function mc() {
  var e = we([]),
    t = jn,
    r = Tt,
    n = iM;

  function i(o) {
    var a = Array.from(e.apply(this, arguments), oM),
      u, s = a.length,
      l = -1,
      f;
    for (let c of o)
      for (u = 0, ++l; u < s; ++u)(a[u][l] = [0, +n(c, a[u].key, l, o)]).data = c;
    for (u = 0, f = An(t(a)); u < s; ++u) a[f[u]].index = u;
    return r(a, f), a
  }
  return i.keys = function(o) {
    return arguments.length ? (e = typeof o == "function" ? o : we(Array.from(o)), i) : e
  }, i.value = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : we(+o), i) : n
  }, i.order = function(o) {
    return arguments.length ? (t = o == null ? jn : typeof o == "function" ? o : we(Array.from(o)), i) : t
  }, i.offset = function(o) {
    return arguments.length ? (r = o ?? Tt, i) : r
  }, i
}

function hc(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, o = e[0].length, a; i < o; ++i) {
      for (a = r = 0; r < n; ++r) a += e[r][i][1] || 0;
      if (a)
        for (r = 0; r < n; ++r) e[r][i][1] /= a
    }
    Tt(e, t)
  }
}

function yc(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, o = n.length; r < o; ++r) {
      for (var a = 0, u = 0; a < i; ++a) u += e[a][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2
    }
    Tt(e, t)
  }
}

function vc(e, t) {
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
    i[n - 1][1] += i[n - 1][0] = r, Tt(e, t)
  }
}

function Vi(e) {
  "@babel/helpers - typeof";
  return Vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Vi(e)
}
var uM = ["type", "size", "sizeType"];

function gc() {
  return gc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, gc.apply(this, arguments)
}

function wy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Oy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wy(Object(r), !0).forEach(function(n) {
      sM(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function sM(e, t, r) {
  return t = lM(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function lM(e) {
  var t = cM(e, "string");
  return Vi(t) == "symbol" ? t : t + ""
}

function cM(e, t) {
  if (Vi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Vi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function fM(e, t) {
  if (e == null) return {};
  var r = pM(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function pM(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var Sy = {
    symbolCircle: Pn,
    symbolCross: Xl,
    symbolDiamond: Yl,
    symbolSquare: Zl,
    symbolStar: Jl,
    symbolTriangle: ec,
    symbolWye: rc
  },
  mM = Math.PI / 180,
  hM = function(t) {
    var r = "symbol".concat((0, bc.default)(t));
    return Sy[r] || Pn
  },
  yM = function(t, r, n) {
    if (r === "area") return t;
    switch (n) {
      case "cross":
        return 5 * t * t / 9;
      case "diamond":
        return .5 * t * t / Math.sqrt(3);
      case "square":
        return t * t;
      case "star": {
        var i = 18 * mM;
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
  vM = function(t, r) {
    Sy["symbol".concat((0, bc.default)(t))] = r
  },
  Xi = function(t) {
    var r = t.type,
      n = r === void 0 ? "circle" : r,
      i = t.size,
      o = i === void 0 ? 64 : i,
      a = t.sizeType,
      u = a === void 0 ? "area" : a,
      s = fM(t, uM),
      l = Oy(Oy({}, s), {}, {
        type: n,
        size: o,
        sizeType: u
      }),
      f = function() {
        var v = hM(n),
          x = eu().type(v).size(yM(o, u, n));
        return x()
      },
      c = l.className,
      p = l.cx,
      d = l.cy,
      y = ae(l, !0);
    return p === +p && d === +d && o === +o ? dM.createElement("path", gc({}, y, {
      className: oe("recharts-symbols", c),
      transform: "translate(".concat(p, ", ").concat(d, ")"),
      d: f()
    })) : null
  };
Xi.registerSymbol = vM;

function Mn(e) {
  "@babel/helpers - typeof";
  return Mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Mn(e)
}

function xc() {
  return xc = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, xc.apply(this, arguments)
}

function Ay(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function gM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ay(Object(r), !0).forEach(function(n) {
      Yi(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ay(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function bM(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _y(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Ty(n.key), n)
  }
}

function xM(e, t, r) {
  return t && _y(e.prototype, t), r && _y(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function wM(e, t, r) {
  return t = nu(t), OM(e, Py() ? Reflect.construct(t, r || [], nu(e).constructor) : t.apply(e, r))
}

function OM(e, t) {
  if (t && (Mn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return SM(e)
}

function SM(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Py() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Py = function() {
    return !!e
  })()
}

function nu(e) {
  return nu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, nu(e)
}

function AM(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && wc(e, t)
}

function wc(e, t) {
  return wc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, wc(e, t)
}

function Yi(e, t, r) {
  return t = Ty(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Ty(e) {
  var t = _M(e, "string");
  return Mn(t) == "symbol" ? t : t + ""
}

function _M(e, t) {
  if (Mn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Mn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Et = 32,
  iu = function(e) {
    function t() {
      return bM(this, t), wM(this, t, arguments)
    }
    return AM(t, e), xM(t, [{
      key: "renderIcon",
      value: function(n) {
        var i = this.props.inactiveColor,
          o = Et / 2,
          a = Et / 6,
          u = Et / 3,
          s = n.inactive ? i : n.color;
        if (n.type === "plainline") return Yt.createElement("line", {
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
        if (n.type === "line") return Yt.createElement("path", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          d: "M0,".concat(o, "h").concat(u, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * u, ",").concat(o, `
            H`).concat(Et, "M").concat(2 * u, ",").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(u, ",").concat(o),
          className: "recharts-legend-icon"
        });
        if (n.type === "rect") return Yt.createElement("path", {
          stroke: "none",
          fill: s,
          d: "M0,".concat(Et / 8, "h").concat(Et, "v").concat(Et * 3 / 4, "h").concat(-Et, "z"),
          className: "recharts-legend-icon"
        });
        if (Yt.isValidElement(n.legendIcon)) {
          var l = gM({}, n);
          return delete l.legendIcon, Yt.cloneElement(n.legendIcon, l)
        }
        return Yt.createElement(Xi, {
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
        return o.map(function(d, y) {
          var m = d.formatter || s,
            v = oe(Yi(Yi({
              "recharts-legend-item": !0
            }, "legend-item-".concat(y), !0), "inactive", d.inactive));
          if (d.type === "none") return null;
          var x = (0, Oc.default)(d.value) ? null : d.value;
          nt(!(0, Oc.default)(d.value), `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`);
          var w = d.inactive ? l : d.color;
          return Yt.createElement("li", xc({
            className: v,
            style: c,
            key: "legend-item-".concat(y)
          }, Lr(n.props, d, y)), Yt.createElement(Hi, {
            width: a,
            height: a,
            viewBox: f,
            style: p
          }, n.renderIcon(d)), Yt.createElement("span", {
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
        return Yt.createElement("ul", {
          className: "recharts-default-legend",
          style: u
        }, this.renderItems())
      }
    }])
  }(PM);
Yi(iu, "displayName", "Legend");
Yi(iu, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Gc = Q(fb()),
  pb = Q(De());

function pu(e, t, r) {
  return t === !0 ? (0, Gc.default)(e, r) : (0, pb.default)(t) ? (0, Gc.default)(e, t) : e
}

function Rn(e) {
  "@babel/helpers - typeof";
  return Rn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Rn(e)
}
var pD = ["ref"];

function db(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function cr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? db(Object(r), !0).forEach(function(n) {
      mu(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : db(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function dD(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function mb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, vb(n.key), n)
  }
}

function mD(e, t, r) {
  return t && mb(e.prototype, t), r && mb(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function hD(e, t, r) {
  return t = du(t), yD(e, yb() ? Reflect.construct(t, r || [], du(e).constructor) : t.apply(e, r))
}

function yD(e, t) {
  if (t && (Rn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return vD(e)
}

function vD(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function yb() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (yb = function() {
    return !!e
  })()
}

function du(e) {
  return du = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, du(e)
}

function gD(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Kc(e, t)
}

function Kc(e, t) {
  return Kc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Kc(e, t)
}

function mu(e, t, r) {
  return t = vb(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function vb(e) {
  var t = bD(e, "string");
  return Rn(t) == "symbol" ? t : t + ""
}

function bD(e, t) {
  if (Rn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Rn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function xD(e, t) {
  if (e == null) return {};
  var r = wD(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function wD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function SD(e) {
  return e.value
}

function AD(e, t) {
  if (to.isValidElement(e)) return to.cloneElement(e, t);
  if (typeof e == "function") return to.createElement(e, t);
  var r = t.ref,
    n = xD(t, pD);
  return to.createElement(iu, n)
}
var hb = 1,
  jt = function(e) {
    function t() {
      var r;
      dD(this, t);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = hD(this, t, [].concat(i)), mu(r, "lastBoundingBox", {
        width: -1,
        height: -1
      }), r
    }
    return gD(t, e), mD(t, [{
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
        i ? (Math.abs(i.width - this.lastBoundingBox.width) > hb || Math.abs(i.height - this.lastBoundingBox.height) > hb) && (this.lastBoundingBox.width = i.width, this.lastBoundingBox.height = i.height, n && n(i)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null))
      }
    }, {
      key: "getBBoxSnapshot",
      value: function() {
        return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? cr({}, this.lastBoundingBox) : {
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
        return cr(cr({}, c), p)
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
          c = cr(cr({
            position: "absolute",
            width: a || "auto",
            height: u || "auto"
          }, this.getDefaultPosition(s)), s);
        return to.createElement("div", {
          className: "recharts-legend-wrapper",
          style: c,
          ref: function(d) {
            n.wrapperNode = d
          }
        }, AD(o, cr(cr({}, this.props), {}, {
          payload: pu(f, l, SD)
        })))
      }
    }], [{
      key: "getWithHeight",
      value: function(n, i) {
        var o = cr(cr({}, this.defaultProps), n.props),
          a = o.layout;
        return a === "vertical" && X(n.props.height) ? {
          height: n.props.height
        } : a === "horizontal" ? {
          width: n.props.width || i
        } : null
      }
    }])
  }(OD);
mu(jt, "displayName", "Legend");
mu(jt, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
import ao, {
  PureComponent as lR
} from "./react-shim-eraudit.js";
var cx = Q(yu()),
  fx = Q(Ot());
import fr from "./react-shim-eraudit.js";

function no(e) {
  "@babel/helpers - typeof";
  return no = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, no(e)
}

function ef() {
  return ef = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ef.apply(this, arguments)
}

function IN(e, t) {
  return RN(e) || NN(e, t) || DN(e, t) || kN()
}

function kN() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function DN(e, t) {
  if (e) {
    if (typeof e == "string") return sx(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return sx(e, t)
  }
}

function sx(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function NN(e, t) {
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

function RN(e) {
  if (Array.isArray(e)) return e
}

function lx(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Qc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? lx(Object(r), !0).forEach(function(n) {
      LN(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : lx(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function LN(e, t, r) {
  return t = BN(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function BN(e) {
  var t = qN(e, "string");
  return no(t) == "symbol" ? t : t + ""
}

function qN(e, t) {
  if (no(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (no(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function WN(e) {
  return Array.isArray(e) && Ee(e[0]) && Ee(e[1]) ? e.join(" ~ ") : e
}
var px = function(t) {
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
        var N = {
            padding: 0,
            margin: 0
          },
          K = (p ? (0, cx.default)(f, p) : f).map(function(U, W) {
            if (U.type === "none") return null;
            var b = Qc({
                display: "block",
                paddingTop: 4,
                paddingBottom: 4,
                color: U.color || "#000"
              }, u),
              O = U.formatter || c || WN,
              E = U.value,
              _ = U.name,
              j = E,
              T = _;
            if (O && j != null && T != null) {
              var D = O(E, _, U, W, f);
              if (Array.isArray(D)) {
                var R = IN(D, 2);
                j = R[0], T = R[1]
              } else j = D
            }
            return fr.createElement("li", {
              className: "recharts-tooltip-item",
              key: "tooltip-item-".concat(W),
              style: b
            }, Ee(T) ? fr.createElement("span", {
              className: "recharts-tooltip-item-name"
            }, T) : null, Ee(T) ? fr.createElement("span", {
              className: "recharts-tooltip-item-separator"
            }, n) : null, fr.createElement("span", {
              className: "recharts-tooltip-item-value"
            }, j), fr.createElement("span", {
              className: "recharts-tooltip-item-unit"
            }, U.unit || ""))
          });
        return fr.createElement("ul", {
          className: "recharts-tooltip-item-list",
          style: N
        }, K)
      }
      return null
    },
    A = Qc({
      margin: 0,
      padding: 10,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      whiteSpace: "nowrap"
    }, o),
    h = Qc({
      margin: 0
    }, l),
    g = !(0, fx.default)(m),
    P = g ? m : "",
    C = oe("recharts-default-tooltip", d),
    k = oe("recharts-tooltip-label", y);
  g && v && f !== void 0 && f !== null && (P = v(m, f));
  var B = w ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return fr.createElement("div", ef({
    className: C,
    style: A
  }, B), fr.createElement("p", {
    className: k,
    style: h
  }, fr.isValidElement(P) ? P : "".concat(P)), S())
};
import QN, {
  PureComponent as eR
} from "./react-shim-eraudit.js";

function oo(e) {
  "@babel/helpers - typeof";
  return oo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, oo(e)
}

function vu(e, t, r) {
  return t = zN(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function zN(e) {
  var t = FN(e, "string");
  return oo(t) == "symbol" ? t : t + ""
}

function FN(e, t) {
  if (oo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (oo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var io = "recharts-tooltip-wrapper",
  $N = {
    visibility: "hidden"
  };

function UN(e) {
  var t = e.coordinate,
    r = e.translateX,
    n = e.translateY;
  return oe(io, vu(vu(vu(vu({}, "".concat(io, "-right"), X(r) && t && X(t.x) && r >= t.x), "".concat(io, "-left"), X(r) && t && X(t.x) && r < t.x), "".concat(io, "-bottom"), X(n) && t && X(t.y) && n >= t.y), "".concat(io, "-top"), X(n) && t && X(t.y) && n < t.y))
}

function dx(e) {
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

function HN(e) {
  var t = e.translateX,
    r = e.translateY,
    n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  }
}

function mx(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.offsetTopLeft,
    i = e.position,
    o = e.reverseDirection,
    a = e.tooltipBox,
    u = e.useTranslate3d,
    s = e.viewBox,
    l, f, c;
  return a.height > 0 && a.width > 0 && r ? (f = dx({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), c = dx({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), l = HN({
    translateX: f,
    translateY: c,
    useTranslate3d: u
  })) : l = $N, {
    cssProperties: l,
    cssClasses: UN({
      translateX: f,
      translateY: c,
      coordinate: r
    })
  }
}

function Ln(e) {
  "@babel/helpers - typeof";
  return Ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ln(e)
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

function yx(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hx(Object(r), !0).forEach(function(n) {
      rf(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hx(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function GN(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function vx(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, xx(n.key), n)
  }
}

function KN(e, t, r) {
  return t && vx(e.prototype, t), r && vx(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function VN(e, t, r) {
  return t = gu(t), XN(e, bx() ? Reflect.construct(t, r || [], gu(e).constructor) : t.apply(e, r))
}

function XN(e, t) {
  if (t && (Ln(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return YN(e)
}

function YN(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function bx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (bx = function() {
    return !!e
  })()
}

function gu(e) {
  return gu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, gu(e)
}

function ZN(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && tf(e, t)
}

function tf(e, t) {
  return tf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, tf(e, t)
}

function rf(e, t, r) {
  return t = xx(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function xx(e) {
  var t = JN(e, "string");
  return Ln(t) == "symbol" ? t : t + ""
}

function JN(e, t) {
  if (Ln(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ln(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var gx = 1,
  wx = function(e) {
    function t() {
      var r;
      GN(this, t);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = VN(this, t, [].concat(i)), rf(r, "state", {
        dismissed: !1,
        dismissedAtCoordinate: {
          x: 0,
          y: 0
        },
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      }), rf(r, "handleKeyDown", function(a) {
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
    return ZN(t, e), KN(t, [{
      key: "updateBBox",
      value: function() {
        if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
          var n = this.wrapperNode.getBoundingClientRect();
          (Math.abs(n.width - this.state.lastBoundingBox.width) > gx || Math.abs(n.height - this.state.lastBoundingBox.height) > gx) && this.setState({
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
          S = mx({
            allowEscapeViewBox: a,
            coordinate: f,
            offsetTopLeft: d,
            position: y,
            reverseDirection: m,
            tooltipBox: this.state.lastBoundingBox,
            useTranslate3d: v,
            viewBox: x
          }),
          A = S.cssClasses,
          h = S.cssProperties,
          g = yx(yx({
            transition: p && o ? "transform ".concat(u, "ms ").concat(s) : void 0
          }, h), {}, {
            pointerEvents: "none",
            visibility: !this.state.dismissed && o && c ? "visible" : "hidden",
            position: "absolute",
            top: 0,
            left: 0
          }, w);
        return QN.createElement("div", {
          tabIndex: -1,
          className: A,
          style: g,
          ref: function(C) {
            n.wrapperNode = C
          }
        }, l)
      }
    }])
  }(eR);
var tR = function() {
    return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
  },
  it = {
    isSsr: tR(),
    get: function(t) {
      return it[t]
    },
    set: function(t, r) {
      if (typeof t == "string") it[t] = r;
      else {
        var n = Object.keys(t);
        n && n.length && n.forEach(function(i) {
          it[i] = t[i]
        })
      }
    }
  };

function Bn(e) {
  "@babel/helpers - typeof";
  return Bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Bn(e)
}

function Ox(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Sx(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ox(Object(r), !0).forEach(function(n) {
      of(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ox(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function rR(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Ax(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Px(n.key), n)
  }
}

function nR(e, t, r) {
  return t && Ax(e.prototype, t), r && Ax(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function iR(e, t, r) {
  return t = bu(t), oR(e, _x() ? Reflect.construct(t, r || [], bu(e).constructor) : t.apply(e, r))
}

function oR(e, t) {
  if (t && (Bn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return aR(e)
}

function aR(e) {
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

function bu(e) {
  return bu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, bu(e)
}

function uR(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && nf(e, t)
}

function nf(e, t) {
  return nf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, nf(e, t)
}

function of(e, t, r) {
  return t = Px(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Px(e) {
  var t = sR(e, "string");
  return Bn(t) == "symbol" ? t : t + ""
}

function sR(e, t) {
  if (Bn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Bn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function cR(e) {
  return e.dataKey
}

function fR(e, t) {
  return ao.isValidElement(e) ? ao.cloneElement(e, t) : typeof e == "function" ? ao.createElement(e, t) : ao.createElement(px, t)
}
var st = function(e) {
  function t() {
    return rR(this, t), iR(this, t, arguments)
  }
  return uR(t, e), nR(t, [{
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
        A = i.wrapperStyle,
        h = y ?? [];
      c && h.length && (h = pu(y.filter(function(P) {
        return P.value != null && (P.hide !== !0 || n.props.includeHidden)
      }), m, cR));
      var g = h.length > 0;
      return ao.createElement(wx, {
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
        wrapperStyle: A
      }, fR(l, Sx(Sx({}, this.props), {}, {
        payload: h
      })))
    }
  }])
}(lR);
of(st, "displayName", "Tooltip");
of(st, "defaultProps", {
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
  isAnimationActive: !it.isSsr,
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
var $x = Q(sf());
import lf, {
  forwardRef as $R,
  cloneElement as UR,
  useState as HR,
  useImperativeHandle as GR,
  useRef as Fx,
  useEffect as KR,
  useMemo as VR,
  useCallback as XR
} from "./react-shim-eraudit.js";

function uo(e) {
  "@babel/helpers - typeof";
  return uo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, uo(e)
}

function Wx(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function xu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wx(Object(r), !0).forEach(function(n) {
      NR(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wx(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function NR(e, t, r) {
  return t = RR(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function RR(e) {
  var t = LR(e, "string");
  return uo(t) == "symbol" ? t : t + ""
}

function LR(e, t) {
  if (uo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (uo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function BR(e, t) {
  return FR(e) || zR(e, t) || WR(e, t) || qR()
}

function qR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function WR(e, t) {
  if (e) {
    if (typeof e == "string") return zx(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return zx(e, t)
  }
}

function zx(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function zR(e, t) {
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

function FR(e) {
  if (Array.isArray(e)) return e
}
var wu = $R(function(e, t) {
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
    A = S === void 0 ? {} : S,
    h = Fx(null),
    g = Fx();
  g.current = w, GR(t, function() {
    return Object.defineProperty(h.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), h.current
      },
      configurable: !0
    })
  });
  var P = HR({
      containerWidth: i.width,
      containerHeight: i.height
    }),
    C = BR(P, 2),
    k = C[0],
    B = C[1],
    z = XR(function(K, U) {
      B(function(W) {
        var b = Math.round(K),
          O = Math.round(U);
        return W.containerWidth === b && W.containerHeight === O ? W : {
          containerWidth: b,
          containerHeight: O
        }
      })
    }, []);
  KR(function() {
    var K = function(_) {
      var j, T = _[0].contentRect,
        D = T.width,
        R = T.height;
      z(D, R), (j = g.current) === null || j === void 0 || j.call(g, D, R)
    };
    m > 0 && (K = (0, $x.default)(K, m, {
      trailing: !0,
      leading: !1
    }));
    var U = new ResizeObserver(K),
      W = h.current.getBoundingClientRect(),
      b = W.width,
      O = W.height;
    return z(b, O), U.observe(h.current),
      function() {
        U.disconnect()
      }
  }, [z, m]);
  var N = VR(function() {
    var K = k.containerWidth,
      U = k.containerHeight;
    if (K < 0 || U < 0) return null;
    nt(ur(a) || ur(s), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, a, s), nt(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var W = ur(a) ? K : a,
      b = ur(s) ? U : s;
    r && r > 0 && (W ? b = W / r : b && (W = b * r), p && b > p && (b = p)), nt(W > 0 || b > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, W, b, a, s, f, c, r);
    var O = !Array.isArray(d) && At(d.type).endsWith("Chart");
    return lf.Children.map(d, function(E) {
      return lf.isValidElement(E) ? UR(E, xu({
        width: W,
        height: b
      }, O ? {
        style: xu({
          height: "100%",
          width: "100%",
          maxHeight: b,
          maxWidth: W
        }, E.props.style)
      } : {})) : E
    })
  }, [r, d, s, p, c, f, k, a]);
  return lf.createElement("div", {
    id: v ? "".concat(v) : void 0,
    className: oe("recharts-responsive-container", x),
    style: xu(xu({}, A), {}, {
      width: a,
      height: s,
      minWidth: f,
      minHeight: c,
      maxHeight: p
    }),
    ref: h
  }, N)
});
var cf = function(t) {
  return null
};
cf.displayName = "Cell";
var df = Q(Ot());
import n0, {
  useMemo as AL
} from "./react-shim-eraudit.js";

function so(e) {
  "@babel/helpers - typeof";
  return so = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, so(e)
}

function Ux(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ff(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ux(Object(r), !0).forEach(function(n) {
      YR(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ux(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function YR(e, t, r) {
  return t = ZR(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function ZR(e) {
  var t = JR(e, "string");
  return so(t) == "symbol" ? t : t + ""
}

function JR(e, t) {
  if (so(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (so(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var qn = {
    widthCache: {},
    cacheCount: 0
  },
  QR = 2e3,
  eL = {
    position: "absolute",
    top: "-20000px",
    left: 0,
    padding: 0,
    margin: 0,
    border: "none",
    whiteSpace: "pre"
  };
var Hx = "recharts_measurement_span";

function tL(e) {
  var t = ff({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r]
  }), t
}
var $r = function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t == null || it.isSsr) return {
      width: 0,
      height: 0
    };
    var n = tL(r),
      i = JSON.stringify({
        text: t,
        copyStyle: n
      });
    if (qn.widthCache[i]) return qn.widthCache[i];
    try {
      var o = document.getElementById(Hx);
      o || (o = document.createElement("span"), o.setAttribute("id", Hx), o.setAttribute("aria-hidden", "true"), document.body.appendChild(o));
      var a = ff(ff({}, eL), n);
      Object.assign(o.style, a), o.textContent = "".concat(t);
      var u = o.getBoundingClientRect(),
        s = {
          width: u.width,
          height: u.height
        };
      return qn.widthCache[i] = s, ++qn.cacheCount > QR && (qn.cacheCount = 0, qn.widthCache = {}), s
    } catch {
      return {
        width: 0,
        height: 0
      }
    }
  },
  Gx = function(t) {
    return {
      top: t.top + window.scrollY - document.documentElement.clientTop,
      left: t.left + window.scrollX - document.documentElement.clientLeft
    }
  };

function lo(e) {
  "@babel/helpers - typeof";
  return lo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, lo(e)
}

function Su(e, t) {
  return oL(e) || iL(e, t) || nL(e, t) || rL()
}

function rL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function nL(e, t) {
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

function iL(e, t) {
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

function oL(e) {
  if (Array.isArray(e)) return e
}

function aL(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Vx(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, sL(n.key), n)
  }
}

function uL(e, t, r) {
  return t && Vx(e.prototype, t), r && Vx(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function sL(e) {
  var t = lL(e, "string");
  return lo(t) == "symbol" ? t : t + ""
}

function lL(e, t) {
  if (lo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (lo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Xx = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  Yx = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  cL = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  fL = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  Jx = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1
  },
  pL = Object.keys(Jx),
  Wn = "NaN";

function dL(e, t) {
  return e * Jx[t]
}
var Ou = function() {
  function e(t, r) {
    aL(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !cL.test(r) && (this.num = NaN, this.unit = ""), pL.includes(r) && (this.num = dL(t, r), this.unit = "px")
  }
  return uL(e, [{
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
      var n, i = (n = fL.exec(r)) !== null && n !== void 0 ? n : [],
        o = Su(i, 3),
        a = o[1],
        u = o[2];
      return new e(parseFloat(a), u ?? "")
    }
  }])
}();

function Qx(e) {
  if (e.includes(Wn)) return Wn;
  for (var t = e; t.includes("*") || t.includes("/");) {
    var r, n = (r = Xx.exec(t)) !== null && r !== void 0 ? r : [],
      i = Su(n, 4),
      o = i[1],
      a = i[2],
      u = i[3],
      s = Ou.parse(o ?? ""),
      l = Ou.parse(u ?? ""),
      f = a === "*" ? s.multiply(l) : s.divide(l);
    if (f.isNaN()) return Wn;
    t = t.replace(Xx, f.toString())
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t);) {
    var c, p = (c = Yx.exec(t)) !== null && c !== void 0 ? c : [],
      d = Su(p, 4),
      y = d[1],
      m = d[2],
      v = d[3],
      x = Ou.parse(y ?? ""),
      w = Ou.parse(v ?? ""),
      S = m === "+" ? x.add(w) : x.subtract(w);
    if (S.isNaN()) return Wn;
    t = t.replace(Yx, S.toString())
  }
  return t
}
var Zx = /\(([^()]*)\)/;

function mL(e) {
  for (var t = e; t.includes("(");) {
    var r = Zx.exec(t),
      n = Su(r, 2),
      i = n[1];
    t = t.replace(Zx, Qx(i))
  }
  return t
}

function hL(e) {
  var t = e.replace(/\s+/g, "");
  return t = mL(t), t = Qx(t), t
}

function yL(e) {
  try {
    return hL(e)
  } catch {
    return Wn
  }
}

function Au(e) {
  var t = yL(e.slice(5, -1));
  return t === Wn ? "" : t
}
var vL = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
  gL = ["dx", "dy", "angle", "className", "breakAll"];

function pf() {
  return pf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, pf.apply(this, arguments)
}

function e0(e, t) {
  if (e == null) return {};
  var r = bL(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function bL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function t0(e, t) {
  return SL(e) || OL(e, t) || wL(e, t) || xL()
}

function xL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function wL(e, t) {
  if (e) {
    if (typeof e == "string") return r0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return r0(e, t)
  }
}

function r0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function OL(e, t) {
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

function SL(e) {
  if (Array.isArray(e)) return e
}
var a0 = /[ \f\n\r\t\v\u2028\u2029]+/,
  u0 = function(t) {
    var r = t.children,
      n = t.breakAll,
      i = t.style;
    try {
      var o = [];
      (0, df.default)(r) || (n ? o = r.toString().split("") : o = r.toString().split(a0));
      var a = o.map(function(s) {
          return {
            word: s,
            width: $r(s, i).width
          }
        }),
        u = n ? 0 : $r("\xA0", i).width;
      return {
        wordsWithComputedWidth: a,
        spaceWidth: u
      }
    } catch {
      return null
    }
  },
  _L = function(t, r, n, i, o) {
    var a = t.maxLines,
      u = t.children,
      s = t.style,
      l = t.breakAll,
      f = X(a),
      c = u,
      p = function() {
        var W = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return W.reduce(function(b, O) {
          var E = O.word,
            _ = O.width,
            j = b[b.length - 1];
          if (j && (i == null || o || j.width + _ + n < Number(i))) j.words.push(E), j.width += _ + n;
          else {
            var T = {
              words: [E],
              width: _
            };
            b.push(T)
          }
          return b
        }, [])
      },
      d = p(r),
      y = function(W) {
        return W.reduce(function(b, O) {
          return b.width > O.width ? b : O
        })
      };
    if (!f) return d;
    for (var m = "\u2026", v = function(W) {
        var b = c.slice(0, W),
          O = u0({
            breakAll: l,
            style: s,
            children: b + m
          }).wordsWithComputedWidth,
          E = p(O),
          _ = E.length > a || y(E).width > Number(i);
        return [_, E]
      }, x = 0, w = c.length - 1, S = 0, A; x <= w && S <= c.length - 1;) {
      var h = Math.floor((x + w) / 2),
        g = h - 1,
        P = v(g),
        C = t0(P, 2),
        k = C[0],
        B = C[1],
        z = v(h),
        N = t0(z, 1),
        K = N[0];
      if (!k && !K && (x = h + 1), k && K && (w = h - 1), !k && K) {
        A = B;
        break
      }
      S++
    }
    return A || d
  },
  i0 = function(t) {
    var r = (0, df.default)(t) ? [] : t.toString().split(a0);
    return [{
      words: r
    }]
  },
  PL = function(t) {
    var r = t.width,
      n = t.scaleToFit,
      i = t.children,
      o = t.style,
      a = t.breakAll,
      u = t.maxLines;
    if ((r || n) && !it.isSsr) {
      var s, l, f = u0({
        breakAll: a,
        children: i,
        style: o
      });
      if (f) {
        var c = f.wordsWithComputedWidth,
          p = f.spaceWidth;
        s = c, l = p
      } else return i0(i);
      return _L({
        breakAll: a,
        children: i,
        maxLines: u,
        style: o
      }, s, l, r, n)
    }
    return i0(i)
  },
  o0 = "#808080",
  Ur = function(t) {
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
      x = v === void 0 ? o0 : v,
      w = e0(t, vL),
      S = AL(function() {
        return PL({
          breakAll: w.breakAll,
          children: w.children,
          maxLines: w.maxLines,
          scaleToFit: c,
          style: w.style,
          width: w.width
        })
      }, [w.breakAll, w.children, w.maxLines, c, w.style, w.width]),
      A = w.dx,
      h = w.dy,
      g = w.angle,
      P = w.className,
      C = w.breakAll,
      k = e0(w, gL);
    if (!Ee(n) || !Ee(o)) return null;
    var B = n + (X(A) ? A : 0),
      z = o + (X(h) ? h : 0),
      N;
    switch (m) {
      case "start":
        N = Au("calc(".concat(l, ")"));
        break;
      case "middle":
        N = Au("calc(".concat((S.length - 1) / 2, " * -").concat(u, " + (").concat(l, " / 2))"));
        break;
      default:
        N = Au("calc(".concat(S.length - 1, " * -").concat(u, ")"));
        break
    }
    var K = [];
    if (c) {
      var U = S[0].width,
        W = w.width;
      K.push("scale(".concat((X(W) ? W / U : 1) / U, ")"))
    }
    return g && K.push("rotate(".concat(g, ", ").concat(B, ", ").concat(z, ")")), K.length && (k.transform = K.join(" ")), n0.createElement("text", pf({}, ae(k, !0), {
      x: B,
      y: z,
      className: oe("recharts-text", P),
      textAnchor: d,
      fill: x.includes("url") ? o0 : x
    }), S.map(function(b, O) {
      var E = b.words.join(C ? "" : " ");
      return n0.createElement("tspan", {
        x: B,
        dy: O === 0 ? N : u,
        key: "".concat(E, "-").concat(O)
      }, E)
    }))
  };
var Ho = Q(Ot()),
  Go = Q(De()),
  wp = Q(wt());
import rr, {
  cloneElement as xp,
  isValidElement as ys,
  createElement as Oz
} from "./react-shim-eraudit.js";
var iz = Q(Ot()),
  oz = Q(De());
import {
  isValidElement as HQ
} from "./react-shim-eraudit.js";
var as = {};
K_(as, {
  scaleBand: () => xr,
  scaleDiverging: () => is,
  scaleDivergingLog: () => Gf,
  scaleDivergingPow: () => os,
  scaleDivergingSqrt: () => Ew,
  scaleDivergingSymlog: () => Kf,
  scaleIdentity: () => Fu,
  scaleImplicit: () => Cu,
  scaleLinear: () => Qr,
  scaleLog: () => $u,
  scaleOrdinal: () => $n,
  scalePoint: () => wr,
  scalePow: () => Ao,
  scaleQuantile: () => Gu,
  scaleQuantize: () => Ku,
  scaleRadial: () => Hu,
  scaleSequential: () => es,
  scaleSequentialLog: () => Uf,
  scaleSequentialPow: () => ts,
  scaleSequentialQuantile: () => rs,
  scaleSequentialSqrt: () => Tw,
  scaleSequentialSymlog: () => Hf,
  scaleSqrt: () => X0,
  scaleSymlog: () => Uu,
  scaleThreshold: () => Vu,
  scaleTime: () => Ff,
  scaleUtc: () => $f,
  tickFormat: () => bo
});

function ot(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}

function mf(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}

function Hr(e) {
  let t, r, n;
  e.length !== 2 ? (t = ot, r = (u, s) => ot(e(u), s), n = (u, s) => e(u) - s) : (t = e === ot || e === mf ? e : TL, r = e, n = e);

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

function TL() {
  return 0
}

function co(e) {
  return e === null ? NaN : +e
}

function* s0(e, t) {
  if (t === void 0)
    for (let r of e) r != null && (r = +r) >= r && (yield r);
  else {
    let r = -1;
    for (let n of e)(n = t(n, ++r, e)) != null && (n = +n) >= n && (yield n)
  }
}
var l0 = Hr(ot),
  c0 = l0.right,
  EL = l0.left,
  jL = Hr(co).center,
  Rt = c0;
var zn = class extends Map {
  constructor(t, r = IL) {
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
    return super.get(f0(this, t))
  }
  has(t) {
    return super.has(f0(this, t))
  }
  set(t, r) {
    return super.set(ML(this, t), r)
  }
  delete(t) {
    return super.delete(CL(this, t))
  }
};

function f0({
  _intern: e,
  _key: t
}, r) {
  let n = t(r);
  return e.has(n) ? e.get(n) : r
}

function ML({
  _intern: e,
  _key: t
}, r) {
  let n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r)
}

function CL({
  _intern: e,
  _key: t
}, r) {
  let n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r
}

function IL(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e
}

function p0(e = ot) {
  if (e === ot) return hf;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    let n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0)
  }
}

function hf(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0)
}
var kL = Math.sqrt(50),
  DL = Math.sqrt(10),
  NL = Math.sqrt(2);

function _u(e, t, r) {
  let n = (t - e) / Math.max(0, r),
    i = Math.floor(Math.log10(n)),
    o = n / Math.pow(10, i),
    a = o >= kL ? 10 : o >= DL ? 5 : o >= NL ? 2 : 1,
    u, s, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, u = Math.round(e * l), s = Math.round(t * l), u / l < e && ++u, s / l > t && --s, l = -l) : (l = Math.pow(10, i) * a, u = Math.round(e / l), s = Math.round(t / l), u * l < e && ++u, s * l > t && --s), s < u && .5 <= r && r < 2 ? _u(e, t, r * 2) : [u, s, l]
}

function Gr(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  let n = t < e,
    [i, o, a] = n ? _u(t, e, r) : _u(e, t, r);
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

function fo(e, t, r) {
  return t = +t, e = +e, r = +r, _u(e, t, r)[2]
}

function Fn(e, t, r) {
  t = +t, e = +e, r = +r;
  let n = t < e,
    i = n ? fo(t, e, r) : fo(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i)
}

function Pu(e, t) {
  let r;
  if (t === void 0)
    for (let n of e) n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of e)(i = t(i, ++n, e)) != null && (r < i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Tu(e, t) {
  let r;
  if (t === void 0)
    for (let n of e) n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of e)(i = t(i, ++n, e)) != null && (r > i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Eu(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? hf : p0(i); n > r;) {
    if (n - r > 600) {
      let s = n - r + 1,
        l = t - r + 1,
        f = Math.log(s),
        c = .5 * Math.exp(2 * f / 3),
        p = .5 * Math.sqrt(f * c * (s - c) / s) * (l - s / 2 < 0 ? -1 : 1),
        d = Math.max(r, Math.floor(t - l * c / s + p)),
        y = Math.min(n, Math.floor(t + (s - l) * c / s + p));
      Eu(e, t, d, y, i)
    }
    let o = e[t],
      a = r,
      u = n;
    for (po(e, r, t), i(e[n], o) > 0 && po(e, r, n); a < u;) {
      for (po(e, a, u), ++a, --u; i(e[a], o) < 0;) ++a;
      for (; i(e[u], o) > 0;) --u
    }
    i(e[r], o) === 0 ? po(e, r, u) : (++u, po(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1)
  }
  return e
}

function po(e, t, r) {
  let n = e[t];
  e[t] = e[r], e[r] = n
}

function ju(e, t, r) {
  if (e = Float64Array.from(s0(e, r)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return Tu(e);
    if (t >= 1) return Pu(e);
    var n, i = (n - 1) * t,
      o = Math.floor(i),
      a = Pu(Eu(e, o).subarray(0, o + 1)),
      u = Tu(e.subarray(o + 1));
    return a + (u - a) * (i - o)
  }
}

function yf(e, t, r = co) {
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

function Mu(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, o = new Array(i); ++n < i;) o[n] = e + n * r;
  return o
}

function Me(e, t) {
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

function Mt(e, t) {
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
var Cu = Symbol("implicit");

function $n() {
  var e = new zn,
    t = [],
    r = [],
    n = Cu;

  function i(o) {
    let a = e.get(o);
    if (a === void 0) {
      if (n !== Cu) return n;
      e.set(o, a = t.push(o) - 1)
    }
    return r[a % r.length]
  }
  return i.domain = function(o) {
    if (!arguments.length) return t.slice();
    t = [], e = new zn;
    for (let a of o) e.has(a) || e.set(a, t.push(a) - 1);
    return i
  }, i.range = function(o) {
    return arguments.length ? (r = Array.from(o), i) : r.slice()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return $n(t, r).unknown(n)
  }, Me.apply(i, arguments), i
}

function xr() {
  var e = $n().unknown(void 0),
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
    var v = Mu(p).map(function(x) {
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
    return xr(t(), [n, i]).round(u).paddingInner(s).paddingOuter(l).align(f)
  }, Me.apply(c(), arguments)
}

function d0(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return d0(t())
  }, e
}

function wr() {
  return d0(xr.apply(null, arguments).paddingInner(1))
}

function Iu(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e
}

function vf(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r
}

function yo() {}
var mo = .7,
  Nu = 1 / mo,
  Un = "\\s*([+-]?\\d+)\\s*",
  ho = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  Zt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  RL = /^#([0-9a-f]{3,8})$/,
  LL = new RegExp(`^rgb\\(${Un},${Un},${Un}\\)$`),
  BL = new RegExp(`^rgb\\(${Zt},${Zt},${Zt}\\)$`),
  qL = new RegExp(`^rgba\\(${Un},${Un},${Un},${ho}\\)$`),
  WL = new RegExp(`^rgba\\(${Zt},${Zt},${Zt},${ho}\\)$`),
  zL = new RegExp(`^hsl\\(${ho},${Zt},${Zt}\\)$`),
  FL = new RegExp(`^hsla\\(${ho},${Zt},${Zt},${ho}\\)$`),
  m0 = {
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
Iu(yo, Or, {
  copy(e) {
    return Object.assign(new this.constructor, this, e)
  },
  displayable() {
    return this.rgb().displayable()
  },
  hex: h0,
  formatHex: h0,
  formatHex8: $L,
  formatHsl: UL,
  formatRgb: y0,
  toString: y0
});

function h0() {
  return this.rgb().formatHex()
}

function $L() {
  return this.rgb().formatHex8()
}

function UL() {
  return O0(this).formatHsl()
}

function y0() {
  return this.rgb().formatRgb()
}

function Or(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = RL.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? v0(t) : r === 3 ? new lt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? ku(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? ku(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = LL.exec(e)) ? new lt(t[1], t[2], t[3], 1) : (t = BL.exec(e)) ? new lt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = qL.exec(e)) ? ku(t[1], t[2], t[3], t[4]) : (t = WL.exec(e)) ? ku(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = zL.exec(e)) ? x0(t[1], t[2] / 100, t[3] / 100, 1) : (t = FL.exec(e)) ? x0(t[1], t[2] / 100, t[3] / 100, t[4]) : m0.hasOwnProperty(e) ? v0(m0[e]) : e === "transparent" ? new lt(NaN, NaN, NaN, 0) : null
}

function v0(e) {
  return new lt(e >> 16 & 255, e >> 8 & 255, e & 255, 1)
}

function ku(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new lt(e, t, r, n)
}

function HL(e) {
  return e instanceof yo || (e = Or(e)), e ? (e = e.rgb(), new lt(e.r, e.g, e.b, e.opacity)) : new lt
}

function Hn(e, t, r, n) {
  return arguments.length === 1 ? HL(e) : new lt(e, t, r, n ?? 1)
}

function lt(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n
}
Iu(lt, Hn, vf(yo, {
  brighter(e) {
    return e = e == null ? Nu : Math.pow(Nu, e), new lt(this.r * e, this.g * e, this.b * e, this.opacity)
  },
  darker(e) {
    return e = e == null ? mo : Math.pow(mo, e), new lt(this.r * e, this.g * e, this.b * e, this.opacity)
  },
  rgb() {
    return this
  },
  clamp() {
    return new lt(Vr(this.r), Vr(this.g), Vr(this.b), Ru(this.opacity))
  },
  displayable() {
    return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
  },
  hex: g0,
  formatHex: g0,
  formatHex8: GL,
  formatRgb: b0,
  toString: b0
}));

function g0() {
  return `#${Kr(this.r)}${Kr(this.g)}${Kr(this.b)}`
}

function GL() {
  return `#${Kr(this.r)}${Kr(this.g)}${Kr(this.b)}${Kr((isNaN(this.opacity)?1:this.opacity)*255)}`
}

function b0() {
  let e = Ru(this.opacity);
  return `${e===1?"rgb(":"rgba("}${Vr(this.r)}, ${Vr(this.g)}, ${Vr(this.b)}${e===1?")":`, ${e})`}`
}

function Ru(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e))
}

function Vr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0))
}

function Kr(e) {
  return e = Vr(e), (e < 16 ? "0" : "") + e.toString(16)
}

function x0(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Lt(e, t, r, n)
}

function O0(e) {
  if (e instanceof Lt) return new Lt(e.h, e.s, e.l, e.opacity);
  if (e instanceof yo || (e = Or(e)), !e) return new Lt;
  if (e instanceof Lt) return e;
  e = e.rgb();
  var t = e.r / 255,
    r = e.g / 255,
    n = e.b / 255,
    i = Math.min(t, r, n),
    o = Math.max(t, r, n),
    a = NaN,
    u = o - i,
    s = (o + i) / 2;
  return u ? (t === o ? a = (r - n) / u + (r < n) * 6 : r === o ? a = (n - t) / u + 2 : a = (t - r) / u + 4, u /= s < .5 ? o + i : 2 - o - i, a *= 60) : u = s > 0 && s < 1 ? 0 : a, new Lt(a, u, s, e.opacity)
}

function S0(e, t, r, n) {
  return arguments.length === 1 ? O0(e) : new Lt(e, t, r, n ?? 1)
}

function Lt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n
}
Iu(Lt, S0, vf(yo, {
  brighter(e) {
    return e = e == null ? Nu : Math.pow(Nu, e), new Lt(this.h, this.s, this.l * e, this.opacity)
  },
  darker(e) {
    return e = e == null ? mo : Math.pow(mo, e), new Lt(this.h, this.s, this.l * e, this.opacity)
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360,
      t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
      r = this.l,
      n = r + (r < .5 ? r : 1 - r) * t,
      i = 2 * r - n;
    return new lt(gf(e >= 240 ? e - 240 : e + 120, i, n), gf(e, i, n), gf(e < 120 ? e + 240 : e - 120, i, n), this.opacity)
  },
  clamp() {
    return new Lt(w0(this.h), Du(this.s), Du(this.l), Ru(this.opacity))
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
  },
  formatHsl() {
    let e = Ru(this.opacity);
    return `${e===1?"hsl(":"hsla("}${w0(this.h)}, ${Du(this.s)*100}%, ${Du(this.l)*100}%${e===1?")":`, ${e})`}`
  }
}));

function w0(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e
}

function Du(e) {
  return Math.max(0, Math.min(1, e || 0))
}

function gf(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255
}

function bf(e, t, r, n, i) {
  var o = e * e,
    a = o * e;
  return ((1 - 3 * e + 3 * o - a) * t + (4 - 6 * o + 3 * a) * r + (1 + 3 * e + 3 * o - 3 * a) * n + a * i) / 6
}

function A0(e) {
  var t = e.length - 1;
  return function(r) {
    var n = r <= 0 ? r = 0 : r >= 1 ? (r = 1, t - 1) : Math.floor(r * t),
      i = e[n],
      o = e[n + 1],
      a = n > 0 ? e[n - 1] : 2 * i - o,
      u = n < t - 1 ? e[n + 2] : 2 * o - i;
    return bf((r - n / t) * t, a, i, o, u)
  }
}

function _0(e) {
  var t = e.length;
  return function(r) {
    var n = Math.floor(((r %= 1) < 0 ? ++r : r) * t),
      i = e[(n + t - 1) % t],
      o = e[n % t],
      a = e[(n + 1) % t],
      u = e[(n + 2) % t];
    return bf((r - n / t) * t, i, o, a, u)
  }
}
var vo = e => () => e;

function KL(e, t) {
  return function(r) {
    return e + r * t
  }
}

function VL(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r,
    function(n) {
      return Math.pow(e + n * t, r)
    }
}

function P0(e) {
  return (e = +e) == 1 ? Lu : function(t, r) {
    return r - t ? VL(t, r, e) : vo(isNaN(t) ? r : t)
  }
}

function Lu(e, t) {
  var r = t - e;
  return r ? KL(e, r) : vo(isNaN(e) ? t : e)
}
var xf = function e(t) {
  var r = P0(t);

  function n(i, o) {
    var a = r((i = Hn(i)).r, (o = Hn(o)).r),
      u = r(i.g, o.g),
      s = r(i.b, o.b),
      l = Lu(i.opacity, o.opacity);
    return function(f) {
      return i.r = a(f), i.g = u(f), i.b = s(f), i.opacity = l(f), i + ""
    }
  }
  return n.gamma = e, n
}(1);

function T0(e) {
  return function(t) {
    var r = t.length,
      n = new Array(r),
      i = new Array(r),
      o = new Array(r),
      a, u;
    for (a = 0; a < r; ++a) u = Hn(t[a]), n[a] = u.r || 0, i[a] = u.g || 0, o[a] = u.b || 0;
    return n = e(n), i = e(i), o = e(o), u.opacity = 1,
      function(s) {
        return u.r = n(s), u.g = i(s), u.b = o(s), u + ""
      }
  }
}
var yX = T0(A0),
  vX = T0(_0);

function E0(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0,
    n = t.slice(),
    i;
  return function(o) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - o) + t[i] * o;
    return n
  }
}

function j0(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView)
}

function M0(e, t) {
  var r = t ? t.length : 0,
    n = e ? Math.min(r, e.length) : 0,
    i = new Array(n),
    o = new Array(r),
    a;
  for (a = 0; a < n; ++a) i[a] = dt(e[a], t[a]);
  for (; a < r; ++a) o[a] = t[a];
  return function(u) {
    for (a = 0; a < n; ++a) o[a] = i[a](u);
    return o
  }
}

function C0(e, t) {
  var r = new Date;
  return e = +e, t = +t,
    function(n) {
      return r.setTime(e * (1 - n) + t * n), r
    }
}

function Sr(e, t) {
  return e = +e, t = +t,
    function(r) {
      return e * (1 - r) + t * r
    }
}

function I0(e, t) {
  var r = {},
    n = {},
    i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t) i in e ? r[i] = dt(e[i], t[i]) : n[i] = t[i];
  return function(o) {
    for (i in r) n[i] = r[i](o);
    return n
  }
}
var Of = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  wf = new RegExp(Of.source, "g");

function XL(e) {
  return function() {
    return e
  }
}

function YL(e) {
  return function(t) {
    return e(t) + ""
  }
}

function k0(e, t) {
  var r = Of.lastIndex = wf.lastIndex = 0,
    n, i, o, a = -1,
    u = [],
    s = [];
  for (e = e + "", t = t + "";
    (n = Of.exec(e)) && (i = wf.exec(t));)(o = i.index) > r && (o = t.slice(r, o), u[a] ? u[a] += o : u[++a] = o), (n = n[0]) === (i = i[0]) ? u[a] ? u[a] += i : u[++a] = i : (u[++a] = null, s.push({
    i: a,
    x: Sr(n, i)
  })), r = wf.lastIndex;
  return r < t.length && (o = t.slice(r), u[a] ? u[a] += o : u[++a] = o), u.length < 2 ? s[0] ? YL(s[0].x) : XL(t) : (t = s.length, function(l) {
    for (var f = 0, c; f < t; ++f) u[(c = s[f]).i] = c.x(l);
    return u.join("")
  })
}

function dt(e, t) {
  var r = typeof t,
    n;
  return t == null || r === "boolean" ? vo(t) : (r === "number" ? Sr : r === "string" ? (n = Or(t)) ? (t = n, xf) : k0 : t instanceof Or ? xf : t instanceof Date ? C0 : j0(t) ? E0 : Array.isArray(t) ? M0 : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? I0 : Sr)(e, t)
}

function Xr(e, t) {
  return e = +e, t = +t,
    function(r) {
      return Math.round(e * (1 - r) + t * r)
    }
}

function Bu(e, t) {
  t === void 0 && (t = e, e = dt);
  for (var r = 0, n = t.length - 1, i = t[0], o = new Array(n < 0 ? 0 : n); r < n;) o[r] = e(i, i = t[++r]);
  return function(a) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(a *= n)));
    return o[u](a - u)
  }
}

function Sf(e) {
  return function() {
    return e
  }
}

function Ar(e) {
  return +e
}
var D0 = [0, 1];

function We(e) {
  return e
}

function Af(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t
  } : Sf(isNaN(t) ? NaN : .5)
}

function ZL(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r),
    function(n) {
      return Math.max(e, Math.min(t, n))
    }
}

function JL(e, t, r) {
  var n = e[0],
    i = e[1],
    o = t[0],
    a = t[1];
  return i < n ? (n = Af(i, n), o = r(a, o)) : (n = Af(n, i), o = r(o, a)),
    function(u) {
      return o(n(u))
    }
}

function QL(e, t, r) {
  var n = Math.min(e.length, t.length) - 1,
    i = new Array(n),
    o = new Array(n),
    a = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++a < n;) i[a] = Af(e[a], e[a + 1]), o[a] = r(t[a], t[a + 1]);
  return function(u) {
    var s = Rt(e, u, 1, n) - 1;
    return o[s](i[s](u))
  }
}

function Jt(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown())
}

function Yr() {
  var e = D0,
    t = D0,
    r = dt,
    n, i, o, a = We,
    u, s, l;

  function f() {
    var p = Math.min(e.length, t.length);
    return a !== We && (a = ZL(e[0], e[p - 1])), u = p > 2 ? QL : JL, s = l = null, c
  }

  function c(p) {
    return p == null || isNaN(p = +p) ? o : (s || (s = u(e.map(n), t, r)))(n(a(p)))
  }
  return c.invert = function(p) {
      return a(i((l || (l = u(t, e.map(n), Sr)))(p)))
    }, c.domain = function(p) {
      return arguments.length ? (e = Array.from(p, Ar), f()) : e.slice()
    }, c.range = function(p) {
      return arguments.length ? (t = Array.from(p), f()) : t.slice()
    }, c.rangeRound = function(p) {
      return t = Array.from(p), r = Xr, f()
    }, c.clamp = function(p) {
      return arguments.length ? (a = p ? !0 : We, f()) : a !== We
    }, c.interpolate = function(p) {
      return arguments.length ? (r = p, f()) : r
    }, c.unknown = function(p) {
      return arguments.length ? (o = p, c) : o
    },
    function(p, d) {
      return n = p, i = d, f()
    }
}

function Zr() {
  return Yr()(We, We)
}

function N0(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10)
}

function Jr(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"),
    n = e.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +e.slice(r + 1)]
}

function Qt(e) {
  return e = Jr(Math.abs(e)), e ? e[1] : NaN
}

function R0(e, t) {
  return function(r, n) {
    for (var i = r.length, o = [], a = 0, u = e[0], s = 0; i > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), o.push(r.substring(i -= u, i + u)), !((s += u + 1) > n));) u = e[a = (a + 1) % e.length];
    return o.reverse().join(t)
  }
}

function L0(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r]
    })
  }
}
var eB = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function er(e) {
  if (!(t = eB.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new qu({
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
er.prototype = qu.prototype;

function qu(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + ""
}
qu.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type
};

function B0(e) {
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
var go;

function q0(e, t) {
  var r = Jr(e, t);
  if (!r) return go = void 0, e.toPrecision(t);
  var n = r[0],
    i = r[1],
    o = i - (go = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    a = n.length;
  return o === a ? n : o > a ? n + new Array(o - a + 1).join("0") : o > 0 ? n.slice(0, o) + "." + n.slice(o) : "0." + new Array(1 - o).join("0") + Jr(e, Math.max(0, t + o - 1))[0]
}

function _f(e, t) {
  var r = Jr(e, t);
  if (!r) return e + "";
  var n = r[0],
    i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0")
}
var Pf = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: e => Math.round(e).toString(2),
  c: e => e + "",
  d: N0,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: e => Math.round(e).toString(8),
  p: (e, t) => _f(e * 100, t),
  r: _f,
  s: q0,
  X: e => Math.round(e).toString(16).toUpperCase(),
  x: e => Math.round(e).toString(16)
};

function Tf(e) {
  return e
}
var W0 = Array.prototype.map,
  z0 = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function F0(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Tf : R0(W0.call(e.grouping, Number), e.thousands + ""),
    r = e.currency === void 0 ? "" : e.currency[0] + "",
    n = e.currency === void 0 ? "" : e.currency[1] + "",
    i = e.decimal === void 0 ? "." : e.decimal + "",
    o = e.numerals === void 0 ? Tf : L0(W0.call(e.numerals, String)),
    a = e.percent === void 0 ? "%" : e.percent + "",
    u = e.minus === void 0 ? "\u2212" : e.minus + "",
    s = e.nan === void 0 ? "NaN" : e.nan + "";

  function l(c, p) {
    c = er(c);
    var d = c.fill,
      y = c.align,
      m = c.sign,
      v = c.symbol,
      x = c.zero,
      w = c.width,
      S = c.comma,
      A = c.precision,
      h = c.trim,
      g = c.type;
    g === "n" ? (S = !0, g = "g") : Pf[g] || (A === void 0 && (A = 12), h = !0, g = "g"), (x || d === "0" && y === "=") && (x = !0, d = "0", y = "=");
    var P = (p && p.prefix !== void 0 ? p.prefix : "") + (v === "$" ? r : v === "#" && /[boxX]/.test(g) ? "0" + g.toLowerCase() : ""),
      C = (v === "$" ? n : /[%p]/.test(g) ? a : "") + (p && p.suffix !== void 0 ? p.suffix : ""),
      k = Pf[g],
      B = /[defgprs%]/.test(g);
    A = A === void 0 ? 6 : /[gprs]/.test(g) ? Math.max(1, Math.min(21, A)) : Math.max(0, Math.min(20, A));

    function z(N) {
      var K = P,
        U = C,
        W, b, O;
      if (g === "c") U = k(N) + U, N = "";
      else {
        N = +N;
        var E = N < 0 || 1 / N < 0;
        if (N = isNaN(N) ? s : k(Math.abs(N), A), h && (N = B0(N)), E && +N == 0 && m !== "+" && (E = !1), K = (E ? m === "(" ? m : u : m === "-" || m === "(" ? "" : m) + K, U = (g === "s" && !isNaN(N) && go !== void 0 ? z0[8 + go / 3] : "") + U + (E && m === "(" ? ")" : ""), B) {
          for (W = -1, b = N.length; ++W < b;)
            if (O = N.charCodeAt(W), 48 > O || O > 57) {
              U = (O === 46 ? i + N.slice(W + 1) : N.slice(W)) + U, N = N.slice(0, W);
              break
            }
        }
      }
      S && !x && (N = t(N, 1 / 0));
      var _ = K.length + N.length + U.length,
        j = _ < w ? new Array(w - _ + 1).join(d) : "";
      switch (S && x && (N = t(j + N, j.length ? w - U.length : 1 / 0), j = ""), y) {
        case "<":
          N = K + N + U + j;
          break;
        case "=":
          N = K + j + N + U;
          break;
        case "^":
          N = j.slice(0, _ = j.length >> 1) + K + N + U + j.slice(_);
          break;
        default:
          N = j + K + N + U;
          break
      }
      return o(N)
    }
    return z.toString = function() {
      return c + ""
    }, z
  }

  function f(c, p) {
    var d = Math.max(-8, Math.min(8, Math.floor(Qt(p) / 3))) * 3,
      y = Math.pow(10, -d),
      m = l((c = er(c), c.type = "f", c), {
        suffix: z0[8 + d / 3]
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
var Wu, Gn, zu;
Ef({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function Ef(e) {
  return Wu = F0(e), Gn = Wu.format, zu = Wu.formatPrefix, Wu
}

function jf(e) {
  return Math.max(0, -Qt(Math.abs(e)))
}

function Mf(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Qt(t) / 3))) * 3 - Qt(Math.abs(e)))
}

function Cf(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Qt(t) - Qt(e)) + 1
}

function bo(e, t, r, n) {
  var i = Fn(e, t, r),
    o;
  switch (n = er(n ?? ",f"), n.type) {
    case "s": {
      var a = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(o = Mf(i, a)) && (n.precision = o), zu(n, a)
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(o = Cf(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = o - (n.type === "e"));
      break
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(o = jf(i)) && (n.precision = o - (n.type === "%") * 2);
      break
    }
  }
  return Gn(n)
}

function at(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return Gr(n[0], n[n.length - 1], r ?? 10)
  }, e.tickFormat = function(r, n) {
    var i = t();
    return bo(i[0], i[i.length - 1], r ?? 10, n)
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(),
      i = 0,
      o = n.length - 1,
      a = n[i],
      u = n[o],
      s, l, f = 10;
    for (u < a && (l = a, a = u, u = l, l = i, i = o, o = l); f-- > 0;) {
      if (l = fo(a, u, r), l === s) return n[i] = a, n[o] = u, t(n);
      if (l > 0) a = Math.floor(a / l) * l, u = Math.ceil(u / l) * l;
      else if (l < 0) a = Math.ceil(a * l) / l, u = Math.floor(u * l) / l;
      else break;
      s = l
    }
    return e
  }, e
}

function Qr() {
  var e = Zr();
  return e.copy = function() {
    return Jt(e, Qr())
  }, Me.apply(e, arguments), at(e)
}

function Fu(e) {
  var t;

  function r(n) {
    return n == null || isNaN(n = +n) ? t : n
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, Ar), r) : e.slice()
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t
  }, r.copy = function() {
    return Fu(e).unknown(t)
  }, e = arguments.length ? Array.from(e, Ar) : [0, 1], at(r)
}

function xo(e, t) {
  e = e.slice();
  var r = 0,
    n = e.length - 1,
    i = e[r],
    o = e[n],
    a;
  return o < i && (a = r, r = n, n = a, a = i, i = o, o = a), e[r] = t.floor(i), e[n] = t.ceil(o), e
}

function $0(e) {
  return Math.log(e)
}

function U0(e) {
  return Math.exp(e)
}

function tB(e) {
  return -Math.log(-e)
}

function rB(e) {
  return -Math.exp(-e)
}

function nB(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e
}

function iB(e) {
  return e === 10 ? nB : e === Math.E ? Math.exp : t => Math.pow(e, t)
}

function oB(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), t => Math.log(t) / e)
}

function H0(e) {
  return (t, r) => -e(-t, r)
}

function wo(e) {
  let t = e($0, U0),
    r = t.domain,
    n = 10,
    i, o;

  function a() {
    return i = oB(n), o = iB(n), r()[0] < 0 ? (i = H0(i), o = H0(o), e(tB, rB)) : e($0, U0), t
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
            } x.length * 2 < v && (x = Gr(l, f, v))
    } else x = Gr(p, d, Math.min(d - p, v)).map(o);
    return c ? x.reverse() : x
  }, t.tickFormat = (u, s) => {
    if (u == null && (u = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = er(s)).precision == null && (s.trim = !0), s = Gn(s)), u === 1 / 0) return s;
    let l = Math.max(1, n * u / t.ticks().length);
    return f => {
      let c = f / o(Math.round(i(f)));
      return c * n < n - .5 && (c *= n), c <= l ? s(f) : ""
    }
  }, t.nice = () => r(xo(r(), {
    floor: u => o(Math.floor(i(u))),
    ceil: u => o(Math.ceil(i(u)))
  })), t
}

function $u() {
  let e = wo(Yr()).domain([1, 10]);
  return e.copy = () => Jt(e, $u()).base(e.base()), Me.apply(e, arguments), e
}

function G0(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e))
  }
}

function K0(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e
  }
}

function Oo(e) {
  var t = 1,
    r = e(G0(t), K0(t));
  return r.constant = function(n) {
    return arguments.length ? e(G0(t = +n), K0(t)) : t
  }, at(r)
}

function Uu() {
  var e = Oo(Yr());
  return e.copy = function() {
    return Jt(e, Uu()).constant(e.constant())
  }, Me.apply(e, arguments)
}

function V0(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e)
  }
}

function aB(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e)
}

function uB(e) {
  return e < 0 ? -e * e : e * e
}

function So(e) {
  var t = e(We, We),
    r = 1;

  function n() {
    return r === 1 ? e(We, We) : r === .5 ? e(aB, uB) : e(V0(r), V0(1 / r))
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r
  }, at(t)
}

function Ao() {
  var e = So(Yr());
  return e.copy = function() {
    return Jt(e, Ao()).exponent(e.exponent())
  }, Me.apply(e, arguments), e
}

function X0() {
  return Ao.apply(null, arguments).exponent(.5)
}

function Y0(e) {
  return Math.sign(e) * e * e
}

function sB(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e))
}

function Hu() {
  var e = Zr(),
    t = [0, 1],
    r = !1,
    n;

  function i(o) {
    var a = sB(e(o));
    return isNaN(a) ? n : r ? Math.round(a) : a
  }
  return i.invert = function(o) {
    return e.invert(Y0(o))
  }, i.domain = function(o) {
    return arguments.length ? (e.domain(o), i) : e.domain()
  }, i.range = function(o) {
    return arguments.length ? (e.range((t = Array.from(o, Ar)).map(Y0)), i) : t.slice()
  }, i.rangeRound = function(o) {
    return i.range(o).round(!0)
  }, i.round = function(o) {
    return arguments.length ? (r = !!o, i) : r
  }, i.clamp = function(o) {
    return arguments.length ? (e.clamp(o), i) : e.clamp()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return Hu(e.domain(), t).round(r).clamp(e.clamp()).unknown(n)
  }, Me.apply(i, arguments), at(i)
}

function Gu() {
  var e = [],
    t = [],
    r = [],
    n;

  function i() {
    var a = 0,
      u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++a < u;) r[a - 1] = yf(e, a / u);
    return o
  }

  function o(a) {
    return a == null || isNaN(a = +a) ? n : t[Rt(r, a)]
  }
  return o.invertExtent = function(a) {
    var u = t.indexOf(a);
    return u < 0 ? [NaN, NaN] : [u > 0 ? r[u - 1] : e[0], u < r.length ? r[u] : e[e.length - 1]]
  }, o.domain = function(a) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let u of a) u != null && !isNaN(u = +u) && e.push(u);
    return e.sort(ot), i()
  }, o.range = function(a) {
    return arguments.length ? (t = Array.from(a), i()) : t.slice()
  }, o.unknown = function(a) {
    return arguments.length ? (n = a, o) : n
  }, o.quantiles = function() {
    return r.slice()
  }, o.copy = function() {
    return Gu().domain(e).range(t).unknown(n)
  }, Me.apply(o, arguments)
}

function Ku() {
  var e = 0,
    t = 1,
    r = 1,
    n = [.5],
    i = [0, 1],
    o;

  function a(s) {
    return s != null && s <= s ? i[Rt(n, s, 0, r)] : o
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
    return Ku().domain([e, t]).range(i).unknown(o)
  }, Me.apply(at(a), arguments)
}

function Vu() {
  var e = [.5],
    t = [0, 1],
    r, n = 1;

  function i(o) {
    return o != null && o <= o ? t[Rt(e, o, 0, n)] : r
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
    return Vu().domain(e).range(t).unknown(r)
  }, Me.apply(i, arguments)
}
var If = new Date,
  kf = new Date;

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
  }), r && (i.count = (o, a) => (If.setTime(+o), kf.setTime(+a), e(If), e(kf), Math.floor(r(If, kf))), i.every = o => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(n ? a => n(a) % o === 0 : a => i.count(0, a) % o === 0) : i)), i
}
var _o = Te(() => {}, (e, t) => {
  e.setTime(+e + t)
}, (e, t) => t - e);
_o.every = e => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Te(t => {
  t.setTime(Math.floor(t / e) * e)
}, (t, r) => {
  t.setTime(+t + r * e)
}, (t, r) => (r - t) / e) : _o);
var TZ = _o.range;
var Ct = Te(e => {
    e.setTime(e - e.getMilliseconds())
  }, (e, t) => {
    e.setTime(+e + t * 1e3)
  }, (e, t) => (t - e) / 1e3, e => e.getUTCSeconds()),
  Z0 = Ct.range;
var Kn = Te(e => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * 1e3)
  }, (e, t) => {
    e.setTime(+e + t * 6e4)
  }, (e, t) => (t - e) / 6e4, e => e.getMinutes()),
  lB = Kn.range,
  Vn = Te(e => {
    e.setUTCSeconds(0, 0)
  }, (e, t) => {
    e.setTime(+e + t * 6e4)
  }, (e, t) => (t - e) / 6e4, e => e.getUTCMinutes()),
  cB = Vn.range;
var Xn = Te(e => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * 1e3 - e.getMinutes() * 6e4)
  }, (e, t) => {
    e.setTime(+e + t * 36e5)
  }, (e, t) => (t - e) / 36e5, e => e.getHours()),
  fB = Xn.range,
  Yn = Te(e => {
    e.setUTCMinutes(0, 0, 0)
  }, (e, t) => {
    e.setTime(+e + t * 36e5)
  }, (e, t) => (t - e) / 36e5, e => e.getUTCHours()),
  pB = Yn.range;
var pr = Te(e => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 864e5, e => e.getDate() - 1),
  dB = pr.range,
  rn = Te(e => {
    e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCDate(e.getUTCDate() + t)
  }, (e, t) => (t - e) / 864e5, e => e.getUTCDate() - 1),
  mB = rn.range,
  Xu = Te(e => {
    e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCDate(e.getUTCDate() + t)
  }, (e, t) => (t - e) / 864e5, e => Math.floor(e / 864e5)),
  hB = Xu.range;

function nn(e) {
  return Te(t => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0)
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7)
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 6048e5)
}
var dr = nn(0),
  Zn = nn(1),
  Q0 = nn(2),
  ew = nn(3),
  _r = nn(4),
  tw = nn(5),
  rw = nn(6),
  nw = dr.range,
  yB = Zn.range,
  vB = Q0.range,
  gB = ew.range,
  bB = _r.range,
  xB = tw.range,
  wB = rw.range;

function on(e) {
  return Te(t => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0)
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7)
  }, (t, r) => (r - t) / 6048e5)
}
var mr = on(0),
  Jn = on(1),
  iw = on(2),
  ow = on(3),
  Pr = on(4),
  aw = on(5),
  uw = on(6),
  sw = mr.range,
  OB = Jn.range,
  SB = iw.range,
  AB = ow.range,
  _B = Pr.range,
  PB = aw.range,
  TB = uw.range;
var Qn = Te(e => {
    e.setDate(1), e.setHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setMonth(e.getMonth() + t)
  }, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, e => e.getMonth()),
  EB = Qn.range,
  ei = Te(e => {
    e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCMonth(e.getUTCMonth() + t)
  }, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, e => e.getUTCMonth()),
  jB = ei.range;
var mt = Te(e => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t)
}, (e, t) => t.getFullYear() - e.getFullYear(), e => e.getFullYear());
mt.every = e => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Te(t => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e)
});
var MB = mt.range,
  ht = Te(e => {
    e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
  }, (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t)
  }, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), e => e.getUTCFullYear());
ht.every = e => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Te(t => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e)
});
var CB = ht.range;

function cw(e, t, r, n, i, o) {
  let a = [
    [Ct, 1, 1e3],
    [Ct, 5, 5 * 1e3],
    [Ct, 15, 15 * 1e3],
    [Ct, 30, 30 * 1e3],
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
      d = Hr(([, , v]) => v).right(a, p);
    if (d === a.length) return e.every(Fn(l / 31536e6, f / 31536e6, c));
    if (d === 0) return _o.every(Math.max(Fn(l, f, c), 1));
    let [y, m] = a[p / a[d - 1][2] < a[d][2] / p ? d - 1 : d];
    return y.every(m)
  }
  return [u, s]
}
var [Df, Nf] = cw(ht, ei, mr, Xu, Yn, Vn), [Rf, Lf] = cw(mt, Qn, dr, pr, Xn, Kn);

function Bf(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L)
}

function qf(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L))
}

function To(e, t, r) {
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

function Wf(e) {
  var t = e.dateTime,
    r = e.date,
    n = e.time,
    i = e.periods,
    o = e.days,
    a = e.shortDays,
    u = e.months,
    s = e.shortMonths,
    l = Eo(i),
    f = jo(i),
    c = Eo(o),
    p = jo(o),
    d = Eo(a),
    y = jo(a),
    m = Eo(u),
    v = jo(u),
    x = Eo(s),
    w = jo(s),
    S = {
      a: O,
      A: E,
      b: _,
      B: j,
      c: null,
      d: yw,
      e: yw,
      f: tq,
      g: fq,
      G: dq,
      H: JB,
      I: QB,
      j: eq,
      L: ww,
      m: rq,
      M: nq,
      p: T,
      q: D,
      Q: bw,
      s: xw,
      S: iq,
      u: oq,
      U: aq,
      V: uq,
      w: sq,
      W: lq,
      x: null,
      X: null,
      y: cq,
      Y: pq,
      Z: mq,
      "%": gw
    },
    A = {
      a: R,
      A: V,
      b: Z,
      B: Y,
      c: null,
      d: vw,
      e: vw,
      f: gq,
      g: Eq,
      G: Mq,
      H: hq,
      I: yq,
      j: vq,
      L: Sw,
      m: bq,
      M: xq,
      p: te,
      q: he,
      Q: bw,
      s: xw,
      S: wq,
      u: Oq,
      U: Sq,
      V: Aq,
      w: _q,
      W: Pq,
      x: null,
      X: null,
      y: Tq,
      Y: jq,
      Z: Cq,
      "%": gw
    },
    h = {
      a: B,
      A: z,
      b: N,
      B: K,
      c: U,
      d: mw,
      e: mw,
      f: VB,
      g: dw,
      G: pw,
      H: hw,
      I: hw,
      j: UB,
      L: KB,
      m: $B,
      M: HB,
      p: k,
      q: FB,
      Q: YB,
      s: ZB,
      S: GB,
      u: LB,
      U: BB,
      V: qB,
      w: RB,
      W: WB,
      x: W,
      X: b,
      y: dw,
      Y: pw,
      Z: zB,
      "%": XB
    };
  S.x = g(r, S), S.X = g(n, S), S.c = g(t, S), A.x = g(r, A), A.X = g(n, A), A.c = g(t, A);

  function g(q, ue) {
    return function(ee) {
      var H = [],
        Se = -1,
        G = 0,
        Ae = q.length,
        Pe, Ce, L;
      for (ee instanceof Date || (ee = new Date(+ee)); ++Se < Ae;) q.charCodeAt(Se) === 37 && (H.push(q.slice(G, Se)), (Ce = fw[Pe = q.charAt(++Se)]) != null ? Pe = q.charAt(++Se) : Ce = Pe === "e" ? " " : "0", (L = ue[Pe]) && (Pe = L(ee, Ce)), H.push(Pe), G = Se + 1);
      return H.push(q.slice(G, Se)), H.join("")
    }
  }

  function P(q, ue) {
    return function(ee) {
      var H = To(1900, void 0, 1),
        Se = C(H, q, ee += "", 0),
        G, Ae;
      if (Se != ee.length) return null;
      if ("Q" in H) return new Date(H.Q);
      if ("s" in H) return new Date(H.s * 1e3 + ("L" in H ? H.L : 0));
      if (ue && !("Z" in H) && (H.Z = 0), "p" in H && (H.H = H.H % 12 + H.p * 12), H.m === void 0 && (H.m = "q" in H ? H.q : 0), "V" in H) {
        if (H.V < 1 || H.V > 53) return null;
        "w" in H || (H.w = 1), "Z" in H ? (G = qf(To(H.y, 0, 1)), Ae = G.getUTCDay(), G = Ae > 4 || Ae === 0 ? Jn.ceil(G) : Jn(G), G = rn.offset(G, (H.V - 1) * 7), H.y = G.getUTCFullYear(), H.m = G.getUTCMonth(), H.d = G.getUTCDate() + (H.w + 6) % 7) : (G = Bf(To(H.y, 0, 1)), Ae = G.getDay(), G = Ae > 4 || Ae === 0 ? Zn.ceil(G) : Zn(G), G = pr.offset(G, (H.V - 1) * 7), H.y = G.getFullYear(), H.m = G.getMonth(), H.d = G.getDate() + (H.w + 6) % 7)
      } else("W" in H || "U" in H) && ("w" in H || (H.w = "u" in H ? H.u % 7 : "W" in H ? 1 : 0), Ae = "Z" in H ? qf(To(H.y, 0, 1)).getUTCDay() : Bf(To(H.y, 0, 1)).getDay(), H.m = 0, H.d = "W" in H ? (H.w + 6) % 7 + H.W * 7 - (Ae + 5) % 7 : H.w + H.U * 7 - (Ae + 6) % 7);
      return "Z" in H ? (H.H += H.Z / 100 | 0, H.M += H.Z % 100, qf(H)) : Bf(H)
    }
  }

  function C(q, ue, ee, H) {
    for (var Se = 0, G = ue.length, Ae = ee.length, Pe, Ce; Se < G;) {
      if (H >= Ae) return -1;
      if (Pe = ue.charCodeAt(Se++), Pe === 37) {
        if (Pe = ue.charAt(Se++), Ce = h[Pe in fw ? ue.charAt(Se++) : Pe], !Ce || (H = Ce(q, ee, H)) < 0) return -1
      } else if (Pe != ee.charCodeAt(H++)) return -1
    }
    return H
  }

  function k(q, ue, ee) {
    var H = l.exec(ue.slice(ee));
    return H ? (q.p = f.get(H[0].toLowerCase()), ee + H[0].length) : -1
  }

  function B(q, ue, ee) {
    var H = d.exec(ue.slice(ee));
    return H ? (q.w = y.get(H[0].toLowerCase()), ee + H[0].length) : -1
  }

  function z(q, ue, ee) {
    var H = c.exec(ue.slice(ee));
    return H ? (q.w = p.get(H[0].toLowerCase()), ee + H[0].length) : -1
  }

  function N(q, ue, ee) {
    var H = x.exec(ue.slice(ee));
    return H ? (q.m = w.get(H[0].toLowerCase()), ee + H[0].length) : -1
  }

  function K(q, ue, ee) {
    var H = m.exec(ue.slice(ee));
    return H ? (q.m = v.get(H[0].toLowerCase()), ee + H[0].length) : -1
  }

  function U(q, ue, ee) {
    return C(q, t, ue, ee)
  }

  function W(q, ue, ee) {
    return C(q, r, ue, ee)
  }

  function b(q, ue, ee) {
    return C(q, n, ue, ee)
  }

  function O(q) {
    return a[q.getDay()]
  }

  function E(q) {
    return o[q.getDay()]
  }

  function _(q) {
    return s[q.getMonth()]
  }

  function j(q) {
    return u[q.getMonth()]
  }

  function T(q) {
    return i[+(q.getHours() >= 12)]
  }

  function D(q) {
    return 1 + ~~(q.getMonth() / 3)
  }

  function R(q) {
    return a[q.getUTCDay()]
  }

  function V(q) {
    return o[q.getUTCDay()]
  }

  function Z(q) {
    return s[q.getUTCMonth()]
  }

  function Y(q) {
    return u[q.getUTCMonth()]
  }

  function te(q) {
    return i[+(q.getUTCHours() >= 12)]
  }

  function he(q) {
    return 1 + ~~(q.getUTCMonth() / 3)
  }
  return {
    format: function(q) {
      var ue = g(q += "", S);
      return ue.toString = function() {
        return q
      }, ue
    },
    parse: function(q) {
      var ue = P(q += "", !1);
      return ue.toString = function() {
        return q
      }, ue
    },
    utcFormat: function(q) {
      var ue = g(q += "", A);
      return ue.toString = function() {
        return q
      }, ue
    },
    utcParse: function(q) {
      var ue = P(q += "", !0);
      return ue.toString = function() {
        return q
      }, ue
    }
  }
}
var fw = {
    "-": "",
    _: " ",
    0: "0"
  },
  He = /^\s*\d+/,
  kB = /^%/,
  DB = /[\\^$*+?|[\]().{}]/g;

function be(e, t, r) {
  var n = e < 0 ? "-" : "",
    i = (n ? -e : e) + "",
    o = i.length;
  return n + (o < r ? new Array(r - o + 1).join(t) + i : i)
}

function NB(e) {
  return e.replace(DB, "\\$&")
}

function Eo(e) {
  return new RegExp("^(?:" + e.map(NB).join("|") + ")", "i")
}

function jo(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]))
}

function RB(e, t, r) {
  var n = He.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1
}

function LB(e, t, r) {
  var n = He.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1
}

function BB(e, t, r) {
  var n = He.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1
}

function qB(e, t, r) {
  var n = He.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1
}

function WB(e, t, r) {
  var n = He.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1
}

function pw(e, t, r) {
  var n = He.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1
}

function dw(e, t, r) {
  var n = He.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1
}

function zB(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1
}

function FB(e, t, r) {
  var n = He.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1
}

function $B(e, t, r) {
  var n = He.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1
}

function mw(e, t, r) {
  var n = He.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1
}

function UB(e, t, r) {
  var n = He.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1
}

function hw(e, t, r) {
  var n = He.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1
}

function HB(e, t, r) {
  var n = He.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1
}

function GB(e, t, r) {
  var n = He.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1
}

function KB(e, t, r) {
  var n = He.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1
}

function VB(e, t, r) {
  var n = He.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1
}

function XB(e, t, r) {
  var n = kB.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1
}

function YB(e, t, r) {
  var n = He.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1
}

function ZB(e, t, r) {
  var n = He.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1
}

function yw(e, t) {
  return be(e.getDate(), t, 2)
}

function JB(e, t) {
  return be(e.getHours(), t, 2)
}

function QB(e, t) {
  return be(e.getHours() % 12 || 12, t, 2)
}

function eq(e, t) {
  return be(1 + pr.count(mt(e), e), t, 3)
}

function ww(e, t) {
  return be(e.getMilliseconds(), t, 3)
}

function tq(e, t) {
  return ww(e, t) + "000"
}

function rq(e, t) {
  return be(e.getMonth() + 1, t, 2)
}

function nq(e, t) {
  return be(e.getMinutes(), t, 2)
}

function iq(e, t) {
  return be(e.getSeconds(), t, 2)
}

function oq(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t
}

function aq(e, t) {
  return be(dr.count(mt(e) - 1, e), t, 2)
}

function Ow(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? _r(e) : _r.ceil(e)
}

function uq(e, t) {
  return e = Ow(e), be(_r.count(mt(e), e) + (mt(e).getDay() === 4), t, 2)
}

function sq(e) {
  return e.getDay()
}

function lq(e, t) {
  return be(Zn.count(mt(e) - 1, e), t, 2)
}

function cq(e, t) {
  return be(e.getFullYear() % 100, t, 2)
}

function fq(e, t) {
  return e = Ow(e), be(e.getFullYear() % 100, t, 2)
}

function pq(e, t) {
  return be(e.getFullYear() % 1e4, t, 4)
}

function dq(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? _r(e) : _r.ceil(e), be(e.getFullYear() % 1e4, t, 4)
}

function mq(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + be(t / 60 | 0, "0", 2) + be(t % 60, "0", 2)
}

function vw(e, t) {
  return be(e.getUTCDate(), t, 2)
}

function hq(e, t) {
  return be(e.getUTCHours(), t, 2)
}

function yq(e, t) {
  return be(e.getUTCHours() % 12 || 12, t, 2)
}

function vq(e, t) {
  return be(1 + rn.count(ht(e), e), t, 3)
}

function Sw(e, t) {
  return be(e.getUTCMilliseconds(), t, 3)
}

function gq(e, t) {
  return Sw(e, t) + "000"
}

function bq(e, t) {
  return be(e.getUTCMonth() + 1, t, 2)
}

function xq(e, t) {
  return be(e.getUTCMinutes(), t, 2)
}

function wq(e, t) {
  return be(e.getUTCSeconds(), t, 2)
}

function Oq(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t
}

function Sq(e, t) {
  return be(mr.count(ht(e) - 1, e), t, 2)
}

function Aw(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? Pr(e) : Pr.ceil(e)
}

function Aq(e, t) {
  return e = Aw(e), be(Pr.count(ht(e), e) + (ht(e).getUTCDay() === 4), t, 2)
}

function _q(e) {
  return e.getUTCDay()
}

function Pq(e, t) {
  return be(Jn.count(ht(e) - 1, e), t, 2)
}

function Tq(e, t) {
  return be(e.getUTCFullYear() % 100, t, 2)
}

function Eq(e, t) {
  return e = Aw(e), be(e.getUTCFullYear() % 100, t, 2)
}

function jq(e, t) {
  return be(e.getUTCFullYear() % 1e4, t, 4)
}

function Mq(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? Pr(e) : Pr.ceil(e), be(e.getUTCFullYear() % 1e4, t, 4)
}

function Cq() {
  return "+0000"
}

function gw() {
  return "%"
}

function bw(e) {
  return +e
}

function xw(e) {
  return Math.floor(+e / 1e3)
}
var ti, Yu, _w, Zu, Pw;
zf({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function zf(e) {
  return ti = Wf(e), Yu = ti.format, _w = ti.parse, Zu = ti.utcFormat, Pw = ti.utcParse, ti
}

function Iq(e) {
  return new Date(e)
}

function kq(e) {
  return e instanceof Date ? +e : +new Date(+e)
}

function Ju(e, t, r, n, i, o, a, u, s, l) {
  var f = Zr(),
    c = f.invert,
    p = f.domain,
    d = l(".%L"),
    y = l(":%S"),
    m = l("%I:%M"),
    v = l("%I %p"),
    x = l("%a %d"),
    w = l("%b %d"),
    S = l("%B"),
    A = l("%Y");

  function h(g) {
    return (s(g) < g ? d : u(g) < g ? y : a(g) < g ? m : o(g) < g ? v : n(g) < g ? i(g) < g ? x : w : r(g) < g ? S : A)(g)
  }
  return f.invert = function(g) {
    return new Date(c(g))
  }, f.domain = function(g) {
    return arguments.length ? p(Array.from(g, kq)) : p().map(Iq)
  }, f.ticks = function(g) {
    var P = p();
    return e(P[0], P[P.length - 1], g ?? 10)
  }, f.tickFormat = function(g, P) {
    return P == null ? h : l(P)
  }, f.nice = function(g) {
    var P = p();
    return (!g || typeof g.range != "function") && (g = t(P[0], P[P.length - 1], g ?? 10)), g ? p(xo(P, g)) : f
  }, f.copy = function() {
    return Jt(f, Ju(e, t, r, n, i, o, a, u, s, l))
  }, f
}

function Ff() {
  return Me.apply(Ju(Rf, Lf, mt, Qn, dr, pr, Xn, Kn, Ct, Yu).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments)
}

function $f() {
  return Me.apply(Ju(Df, Nf, ht, ei, mr, rn, Yn, Vn, Ct, Zu).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments)
}

function Qu() {
  var e = 0,
    t = 1,
    r, n, i, o, a = We,
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
  return l.range = f(dt), l.rangeRound = f(Xr), l.unknown = function(c) {
      return arguments.length ? (s = c, l) : s
    },
    function(c) {
      return o = c, r = c(e), n = c(t), i = r === n ? 0 : 1 / (n - r), l
    }
}

function hr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown())
}

function es() {
  var e = at(Qu()(We));
  return e.copy = function() {
    return hr(e, es())
  }, Mt.apply(e, arguments)
}

function Uf() {
  var e = wo(Qu()).domain([1, 10]);
  return e.copy = function() {
    return hr(e, Uf()).base(e.base())
  }, Mt.apply(e, arguments)
}

function Hf() {
  var e = Oo(Qu());
  return e.copy = function() {
    return hr(e, Hf()).constant(e.constant())
  }, Mt.apply(e, arguments)
}

function ts() {
  var e = So(Qu());
  return e.copy = function() {
    return hr(e, ts()).exponent(e.exponent())
  }, Mt.apply(e, arguments)
}

function Tw() {
  return ts.apply(null, arguments).exponent(.5)
}

function rs() {
  var e = [],
    t = We;

  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Rt(e, n, 1) - 1) / (e.length - 1))
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(ot), r
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)))
  }, r.quantiles = function(n) {
    return Array.from({
      length: n + 1
    }, (i, o) => ju(e, o / n))
  }, r.copy = function() {
    return rs(t).domain(e)
  }, Mt.apply(r, arguments)
}

function ns() {
  var e = 0,
    t = .5,
    r = 1,
    n = 1,
    i, o, a, u, s, l = We,
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
      return arguments.length ? ([x, w, S] = v, l = Bu(m, [x, w, S]), d) : [l(0), l(.5), l(1)]
    }
  }
  return d.range = y(dt), d.rangeRound = y(Xr), d.unknown = function(m) {
      return arguments.length ? (p = m, d) : p
    },
    function(m) {
      return f = m, i = m(e), o = m(t), a = m(r), u = i === o ? 0 : .5 / (o - i), s = o === a ? 0 : .5 / (a - o), n = o < i ? -1 : 1, d
    }
}

function is() {
  var e = at(ns()(We));
  return e.copy = function() {
    return hr(e, is())
  }, Mt.apply(e, arguments)
}

function Gf() {
  var e = wo(ns()).domain([.1, 1, 10]);
  return e.copy = function() {
    return hr(e, Gf()).base(e.base())
  }, Mt.apply(e, arguments)
}

function Kf() {
  var e = Oo(ns());
  return e.copy = function() {
    return hr(e, Kf()).constant(e.constant())
  }, Mt.apply(e, arguments)
}

function os() {
  var e = So(ns());
  return e.copy = function() {
    return hr(e, os()).exponent(e.exponent())
  }, Mt.apply(e, arguments)
}

function Ew() {
  return os.apply(null, arguments).exponent(.5)
}
var Bo = Q(kw()),
  qo = Q(Lw()),
  yt = Q(Ot()),
  ii = Q(De()),
  u1 = Q(Ra()),
  cp = Q(Nr()),
  s1 = Q(zw()),
  ds = Q(Tl()),
  l1 = Q(Ya()),
  c1 = Q(Mo()),
  f1 = Q(yu());
var Oe = Q(Xf());

function rW(e) {
  return aW(e) || oW(e) || iW(e) || nW()
}

function nW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function iW(e, t) {
  if (e) {
    if (typeof e == "string") return Yf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Yf(e, t)
  }
}

function oW(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e)
}

function aW(e) {
  if (Array.isArray(e)) return Yf(e)
}

function Yf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var uW = function(t) {
    return t
  },
  Hw = {
    "@@functional/placeholder": !0
  },
  Gw = function(t) {
    return t === Hw
  },
  Uw = function(t) {
    return function r() {
      return arguments.length === 0 || arguments.length === 1 && Gw(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments)
    }
  },
  sW = function e(t, r) {
    return t === 1 ? r : Uw(function() {
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      var a = i.filter(function(u) {
        return u !== Hw
      }).length;
      return a >= t ? r.apply(void 0, i) : e(t - a, Uw(function() {
        for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++) s[l] = arguments[l];
        var f = i.map(function(c) {
          return Gw(c) ? s.shift() : c
        });
        return r.apply(void 0, rW(f).concat(s))
      }))
    })
  },
  Co = function(t) {
    return sW(t.length, t)
  },
  Io = function(t, r) {
    for (var n = [], i = t; i < r; ++i) n[i - t] = i;
    return n
  },
  Zf = Co(function(e, t) {
    return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
      return t[r]
    }).map(e)
  }),
  Jf = function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
    if (!r.length) return uW;
    var i = r.reverse(),
      o = i[0],
      a = i.slice(1);
    return function() {
      return a.reduce(function(u, s) {
        return s(u)
      }, o.apply(void 0, arguments))
    }
  },
  ko = function(t) {
    return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("")
  },
  ss = function(t) {
    var r = null,
      n = null;
    return function() {
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
      return r && o.every(function(u, s) {
        return u === r[s]
      }) || (r = o, n = t.apply(void 0, o)), n
    }
  };
var Qf = Q(Xf());

function lW(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new Qf.default(e).abs().log(10).toNumber()) + 1, t
}

function cW(e, t, r) {
  for (var n = new Qf.default(e), i = 0, o = []; n.lt(t) && i < 1e5;) o.push(n.toNumber()), n = n.add(r), i++;
  return o
}
var fW = Co(function(e, t, r) {
    var n = +e,
      i = +t;
    return n + r * (i - n)
  }),
  pW = Co(function(e, t, r) {
    var n = t - +e;
    return n = n || 1 / 0, (r - e) / n
  }),
  dW = Co(function(e, t, r) {
    var n = t - +e;
    return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n))
  }),
  Do = {
    rangeStep: cW,
    getDigitCount: lW,
    interpolateNumber: fW,
    uninterpolateNumber: pW,
    uninterpolateTruncation: dW
  };

function ep(e) {
  return yW(e) || hW(e) || Kw(e) || mW()
}

function mW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function hW(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e)
}

function yW(e) {
  if (Array.isArray(e)) return tp(e)
}

function an(e, t) {
  return bW(e) || gW(e, t) || Kw(e, t) || vW()
}

function vW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Kw(e, t) {
  if (e) {
    if (typeof e == "string") return tp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return tp(e, t)
  }
}

function tp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function gW(e, t) {
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

function bW(e) {
  if (Array.isArray(e)) return e
}

function rp(e) {
  var t = an(e, 2),
    r = t[0],
    n = t[1],
    i = r,
    o = n;
  return r > n && (i = n, o = r), [i, o]
}

function np(e, t, r) {
  if (e.lte(0)) return new Oe.default(0);
  var n = Do.getDigitCount(e.toNumber()),
    i = new Oe.default(10).pow(n),
    o = e.div(i),
    a = n !== 1 ? .05 : .1,
    u = new Oe.default(Math.ceil(o.div(a).toNumber())).add(r).mul(a),
    s = u.mul(i);
  return t ? s : new Oe.default(Math.ceil(s))
}

function Vw(e, t, r) {
  var n = 1,
    i = new Oe.default(e);
  if (!i.isint() && r) {
    var o = Math.abs(e);
    o < 1 ? (n = new Oe.default(10).pow(Do.getDigitCount(e) - 1), i = new Oe.default(Math.floor(i.div(n).toNumber())).mul(n)) : o > 1 && (i = new Oe.default(Math.floor(e)))
  } else e === 0 ? i = new Oe.default(Math.floor((t - 1) / 2)) : r || (i = new Oe.default(Math.floor(e)));
  var a = Math.floor((t - 1) / 2),
    u = Jf(Zf(function(s) {
      return i.add(new Oe.default(s - a).mul(n)).toNumber()
    }), Io);
  return u(0, t)
}

function Xw(e, t, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1))) return {
    step: new Oe.default(0),
    tickMin: new Oe.default(0),
    tickMax: new Oe.default(0)
  };
  var o = np(new Oe.default(t).sub(e).div(r - 1), n, i),
    a;
  e <= 0 && t >= 0 ? a = new Oe.default(0) : (a = new Oe.default(e).add(t).div(2), a = a.sub(new Oe.default(a).mod(o)));
  var u = Math.ceil(a.sub(e).div(o).toNumber()),
    s = Math.ceil(new Oe.default(t).sub(a).div(o).toNumber()),
    l = u + s + 1;
  return l > r ? Xw(e, t, r, n, i + 1) : (l < r && (s = t > 0 ? s + (r - l) : s, u = t > 0 ? u : u + (r - l)), {
    step: o,
    tickMin: a.sub(new Oe.default(u).mul(o)),
    tickMax: a.add(new Oe.default(s).mul(o))
  })
}

function xW(e) {
  var t = an(e, 2),
    r = t[0],
    n = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = rp([r, n]),
    s = an(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) {
    var c = f === 1 / 0 ? [l].concat(ep(Io(0, i - 1).map(function() {
      return 1 / 0
    }))) : [].concat(ep(Io(0, i - 1).map(function() {
      return -1 / 0
    })), [f]);
    return r > n ? ko(c) : c
  }
  if (l === f) return Vw(l, i, o);
  var p = Xw(l, f, a, o),
    d = p.step,
    y = p.tickMin,
    m = p.tickMax,
    v = Do.rangeStep(y, m.add(new Oe.default(.1).mul(d)), d);
  return r > n ? ko(v) : v
}

function wW(e) {
  var t = an(e, 2),
    r = t[0],
    n = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = rp([r, n]),
    s = an(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) return [r, n];
  if (l === f) return Vw(l, i, o);
  var c = np(new Oe.default(f).sub(l).div(a - 1), o, 0),
    p = Jf(Zf(function(y) {
      return new Oe.default(l).add(new Oe.default(y).mul(c)).toNumber()
    }), Io),
    d = p(0, a).filter(function(y) {
      return y >= l && y <= f
    });
  return r > n ? ko(d) : d
}

function OW(e, t) {
  var r = an(e, 2),
    n = r[0],
    i = r[1],
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = rp([n, i]),
    u = an(a, 2),
    s = u[0],
    l = u[1];
  if (s === -1 / 0 || l === 1 / 0) return [n, i];
  if (s === l) return [s];
  var f = Math.max(t, 2),
    c = np(new Oe.default(l).sub(s).div(f - 1), o, 0),
    p = [].concat(ep(Do.rangeStep(new Oe.default(s), new Oe.default(l).sub(new Oe.default(.99).mul(c)), c)), [l]);
  return n > i ? ko(p) : p
}
var ip = ss(xW),
  SW = ss(wW),
  op = ss(OW);
import ls from "./react-shim-eraudit.js";
var AW = !0,
  ap = "Invariant failed";

function Bt(e, t) {
  if (!e) {
    if (AW) throw new Error(ap);
    var r = typeof t == "function" ? t() : t,
      n = r ? "".concat(ap, ": ").concat(r) : ap;
    throw new Error(n)
  }
}
var _W = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];

function ri(e) {
  "@babel/helpers - typeof";
  return ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ri(e)
}

function cs() {
  return cs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, cs.apply(this, arguments)
}

function PW(e, t) {
  return MW(e) || jW(e, t) || EW(e, t) || TW()
}

function TW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function EW(e, t) {
  if (e) {
    if (typeof e == "string") return Yw(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Yw(e, t)
  }
}

function Yw(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function jW(e, t) {
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

function MW(e) {
  if (Array.isArray(e)) return e
}

function CW(e, t) {
  if (e == null) return {};
  var r = IW(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function IW(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function kW(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Zw(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, e1(n.key), n)
  }
}

function DW(e, t, r) {
  return t && Zw(e.prototype, t), r && Zw(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function NW(e, t, r) {
  return t = fs(t), RW(e, Jw() ? Reflect.construct(t, r || [], fs(e).constructor) : t.apply(e, r))
}

function RW(e, t) {
  if (t && (ri(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return LW(e)
}

function LW(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function Jw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Jw = function() {
    return !!e
  })()
}

function fs(e) {
  return fs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, fs(e)
}

function BW(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && up(e, t)
}

function up(e, t) {
  return up = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, up(e, t)
}

function Qw(e, t, r) {
  return t = e1(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function e1(e) {
  var t = qW(e, "string");
  return ri(t) == "symbol" ? t : t + ""
}

function qW(e, t) {
  if (ri(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ri(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Tr = function(e) {
  function t() {
    return kW(this, t), NW(this, t, arguments)
  }
  return BW(t, e), DW(t, [{
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
        p = CW(n, _W),
        d = ae(p, !1);
      this.props.direction === "x" && f.type !== "number" && Bt(!1);
      var y = s.map(function(m) {
        var v = l(m, u),
          x = v.x,
          w = v.y,
          S = v.value,
          A = v.errorVal;
        if (!A) return null;
        var h = [],
          g, P;
        if (Array.isArray(A)) {
          var C = PW(A, 2);
          g = C[0], P = C[1]
        } else g = P = A;
        if (o === "vertical") {
          var k = f.scale,
            B = w + i,
            z = B + a,
            N = B - a,
            K = k(S - g),
            U = k(S + P);
          h.push({
            x1: U,
            y1: z,
            x2: U,
            y2: N
          }), h.push({
            x1: K,
            y1: B,
            x2: U,
            y2: B
          }), h.push({
            x1: K,
            y1: z,
            x2: K,
            y2: N
          })
        } else if (o === "horizontal") {
          var W = c.scale,
            b = x + i,
            O = b - a,
            E = b + a,
            _ = W(S - g),
            j = W(S + P);
          h.push({
            x1: O,
            y1: j,
            x2: E,
            y2: j
          }), h.push({
            x1: b,
            y1: _,
            x2: b,
            y2: j
          }), h.push({
            x1: O,
            y1: _,
            x2: E,
            y2: _
          })
        }
        return ls.createElement(ge, cs({
          className: "recharts-errorBar",
          key: "bar-".concat(h.map(function(T) {
            return "".concat(T.x1, "-").concat(T.x2, "-").concat(T.y1, "-").concat(T.y2)
          }))
        }, d), h.map(function(T) {
          return ls.createElement("line", cs({}, T, {
            key: "line-".concat(T.x1, "-").concat(T.x2, "-").concat(T.y1, "-").concat(T.y2)
          }))
        }))
      });
      return ls.createElement(ge, {
        className: "recharts-errorBars"
      }, y)
    }
  }])
}(ls.Component);
Qw(Tr, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
Qw(Tr, "displayName", "ErrorBar");

function No(e) {
  "@babel/helpers - typeof";
  return No = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, No(e)
}

function t1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function un(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? t1(Object(r), !0).forEach(function(n) {
      WW(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : t1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function WW(e, t, r) {
  return t = zW(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function zW(e) {
  var t = FW(e, "string");
  return No(t) == "symbol" ? t : t + ""
}

function FW(e, t) {
  if (No(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (No(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var ps = function(t) {
  var r = t.children,
    n = t.formattedGraphicalItems,
    i = t.legendWidth,
    o = t.legendContent,
    a = Ye(r, jt);
  if (!a) return null;
  var u = jt.defaultProps,
    s = u !== void 0 ? un(un({}, u), a.props) : {},
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
      d = p !== void 0 ? un(un({}, p), c.props) : {},
      y = d.dataKey,
      m = d.name,
      v = d.legendType,
      x = d.hide;
    return {
      inactive: x,
      dataKey: y,
      type: s.iconType || v || "square",
      color: Ro(c),
      value: m || y,
      payload: d
    }
  }), un(un(un({}, s), jt.getWithHeight(a, i)), {}, {
    payload: l,
    item: a
  })
};

function Lo(e) {
  "@babel/helpers - typeof";
  return Lo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Lo(e)
}

function r1(e) {
  return GW(e) || HW(e) || UW(e) || $W()
}

function $W() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function UW(e, t) {
  if (e) {
    if (typeof e == "string") return lp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return lp(e, t)
  }
}

function HW(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function GW(e) {
  if (Array.isArray(e)) return lp(e)
}

function lp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function n1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ie(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? n1(Object(r), !0).forEach(function(n) {
      ni(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function ni(e, t, r) {
  return t = KW(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function KW(e) {
  var t = VW(e, "string");
  return Lo(t) == "symbol" ? t : t + ""
}

function VW(e, t) {
  if (Lo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Lo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Ke(e, t, r) {
  return (0, yt.default)(e) || (0, yt.default)(t) ? r : Ee(t) ? (0, cp.default)(e, t, r) : (0, ii.default)(t) ? t(e) : r
}

function oi(e, t, r, n) {
  var i = (0, s1.default)(e, function(u) {
    return Ke(u, t)
  });
  if (r === "number") {
    var o = i.filter(function(u) {
      return X(u) || parseFloat(u)
    });
    return o.length ? [(0, qo.default)(o), (0, Bo.default)(o)] : [1 / 0, -1 / 0]
  }
  var a = n ? i.filter(function(u) {
    return !(0, yt.default)(u)
  }) : i;
  return a.map(function(u) {
    return Ee(u) || u instanceof Date ? u : ""
  })
}
var p1 = function(t) {
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
        if (Xe(c - f) !== Xe(p - c)) {
          var y = [];
          if (Xe(p - c) === Xe(s[1] - s[0])) {
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
        for (var A = 0; A < u; A++)
          if (A === 0 && t <= (n[A].coordinate + n[A + 1].coordinate) / 2 || A > 0 && A < u - 1 && t > (n[A].coordinate + n[A - 1].coordinate) / 2 && t <= (n[A].coordinate + n[A + 1].coordinate) / 2 || A === u - 1 && t > (n[A].coordinate + n[A - 1].coordinate) / 2) {
            a = n[A].index;
            break
          } return a
  },
  Ro = function(t) {
    var r, n = t,
      i = n.type.displayName,
      o = (r = t.type) !== null && r !== void 0 && r.defaultProps ? Ie(Ie({}, t.type.defaultProps), t.props) : t.props,
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
  d1 = function(t) {
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
          x = m.filter(function(P) {
            return At(P.type).indexOf("Bar") >= 0
          });
        if (x && x.length) {
          var w = x[0].type.defaultProps,
            S = w !== void 0 ? Ie(Ie({}, w), x[0].props) : x[0].props,
            A = S.barSize,
            h = S[v];
          a[h] || (a[h] = []);
          var g = (0, yt.default)(A) ? r : A;
          a[h].push({
            item: x[0],
            stackList: x.slice(1),
            barSize: (0, yt.default)(g) ? void 0 : Nt(g, n, 0)
          })
        }
      }
    return a
  },
  m1 = function(t) {
    var r = t.barGap,
      n = t.barCategoryGap,
      i = t.bandSize,
      o = t.sizeList,
      a = o === void 0 ? [] : o,
      u = t.maxBarSize,
      s = a.length;
    if (s < 1) return null;
    var l = Nt(r, i, 0, !0),
      f, c = [];
    if (a[0].barSize === +a[0].barSize) {
      var p = !1,
        d = i / s,
        y = a.reduce(function(A, h) {
          return A + h.barSize || 0
        }, 0);
      y += (s - 1) * l, y >= i && (y -= (s - 1) * l, l = 0), y >= i && d > 0 && (p = !0, d *= .9, y = s * d);
      var m = (i - y) / 2 >> 0,
        v = {
          offset: m - l,
          size: 0
        };
      f = a.reduce(function(A, h) {
        var g = {
            item: h.item,
            position: {
              offset: v.offset + v.size + l,
              size: p ? d : h.barSize
            }
          },
          P = [].concat(r1(A), [g]);
        return v = P[P.length - 1].position, h.stackList && h.stackList.length && h.stackList.forEach(function(C) {
          P.push({
            item: C,
            position: v
          })
        }), P
      }, c)
    } else {
      var x = Nt(n, i, 0, !0);
      i - 2 * x - (s - 1) * l <= 0 && (l = 0);
      var w = (i - 2 * x - (s - 1) * l) / s;
      w > 1 && (w >>= 0);
      var S = u === +u ? Math.min(w, u) : w;
      f = a.reduce(function(A, h, g) {
        var P = [].concat(r1(A), [{
          item: h.item,
          position: {
            offset: x + (w + l) * g + (w - S) / 2,
            size: S
          }
        }]);
        return h.stackList && h.stackList.length && h.stackList.forEach(function(C) {
          P.push({
            item: C,
            position: P[P.length - 1].position
          })
        }), P
      }, c)
    }
    return f
  },
  h1 = function(t, r, n, i) {
    var o = n.children,
      a = n.width,
      u = n.margin,
      s = a - (u.left || 0) - (u.right || 0),
      l = ps({
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
      if ((m === "vertical" || m === "horizontal" && y === "middle") && d !== "center" && X(t[d])) return Ie(Ie({}, t), {}, ni({}, d, t[d] + (c || 0)));
      if ((m === "horizontal" || m === "vertical" && d === "center") && y !== "middle" && X(t[y])) return Ie(Ie({}, t), {}, ni({}, y, t[y] + (p || 0)))
    }
    return t
  },
  XW = function(t, r, n) {
    return (0, yt.default)(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0
  },
  y1 = function(t, r, n, i, o) {
    var a = r.props.children,
      u = qe(a, Tr).filter(function(l) {
        return XW(i, o, l.props.direction)
      });
    if (u && u.length) {
      var s = u.map(function(l) {
        return l.props.dataKey
      });
      return t.reduce(function(l, f) {
        var c = Ke(f, n);
        if ((0, yt.default)(c)) return l;
        var p = Array.isArray(c) ? [(0, qo.default)(c), (0, Bo.default)(c)] : [c, c],
          d = s.reduce(function(y, m) {
            var v = Ke(f, m, 0),
              x = p[0] - Math.abs(Array.isArray(v) ? v[0] : v),
              w = p[1] + Math.abs(Array.isArray(v) ? v[1] : v);
            return [Math.min(x, y[0]), Math.max(w, y[1])]
          }, [1 / 0, -1 / 0]);
        return [Math.min(d[0], l[0]), Math.max(d[1], l[1])]
      }, [1 / 0, -1 / 0])
    }
    return null
  },
  v1 = function(t, r, n, i, o) {
    var a = r.map(function(u) {
      return y1(t, u, n, o, i)
    }).filter(function(u) {
      return !(0, yt.default)(u)
    });
    return a && a.length ? a.reduce(function(u, s) {
      return [Math.min(u[0], s[0]), Math.max(u[1], s[1])]
    }, [1 / 0, -1 / 0]) : null
  },
  fp = function(t, r, n, i, o) {
    var a = r.map(function(s) {
      var l = s.props.dataKey;
      return n === "number" && l && y1(t, s, l, i) || oi(t, l, n, o)
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
  pp = function(t, r) {
    return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis"
  },
  dp = function(t, r, n, i) {
    if (i) return t.map(function(s) {
      return s.coordinate
    });
    var o, a, u = t.map(function(s) {
      return s.coordinate === r && (o = !0), s.coordinate === n && (a = !0), s.coordinate
    });
    return o || u.push(r), a || u.push(n), u
  },
  vt = function(t, r, n) {
    if (!t) return null;
    var i = t.scale,
      o = t.duplicateDomain,
      a = t.type,
      u = t.range,
      s = t.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2,
      l = (r || n) && a === "category" && i.bandwidth ? i.bandwidth() / s : 0;
    if (l = t.axisType === "angleAxis" && u?.length >= 2 ? Xe(u[0] - u[1]) * 2 * l : l, r && (t.ticks || t.niceTicks)) {
      var f = (t.ticks || t.niceTicks).map(function(c) {
        var p = o ? o.indexOf(c) : c;
        return {
          coordinate: i(p) + l,
          value: c,
          offset: l
        }
      });
      return f.filter(function(c) {
        return !(0, ds.default)(c.coordinate)
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
  sp = new WeakMap,
  Wo = function(t, r) {
    if (typeof r != "function") return t;
    sp.has(t) || sp.set(t, new WeakMap);
    var n = sp.get(t);
    if (n.has(r)) return n.get(r);
    var i = function() {
      t.apply(void 0, arguments), r.apply(void 0, arguments)
    };
    return n.set(r, i), i
  },
  g1 = function(t, r, n) {
    var i = t.scale,
      o = t.type,
      a = t.layout,
      u = t.axisType;
    if (i === "auto") return a === "radial" && u === "radiusAxis" ? {
      scale: xr(),
      realScaleType: "band"
    } : a === "radial" && u === "angleAxis" ? {
      scale: Qr(),
      realScaleType: "linear"
    } : o === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: wr(),
      realScaleType: "point"
    } : o === "category" ? {
      scale: xr(),
      realScaleType: "band"
    } : {
      scale: Qr(),
      realScaleType: "linear"
    };
    if ((0, u1.default)(i)) {
      var s = "scale".concat((0, l1.default)(i));
      return {
        scale: (as[s] || wr)(),
        realScaleType: as[s] ? s : "point"
      }
    }
    return (0, ii.default)(i) ? {
      scale: i
    } : {
      scale: wr(),
      realScaleType: "point"
    }
  },
  i1 = 1e-4,
  b1 = function(t) {
    var r = t.domain();
    if (!(!r || r.length <= 2)) {
      var n = r.length,
        i = t.range(),
        o = Math.min(i[0], i[1]) - i1,
        a = Math.max(i[0], i[1]) + i1,
        u = t(r[0]),
        s = t(r[n - 1]);
      (u < o || u > a || s < o || s > a) && t.domain([r[0], r[n - 1]])
    }
  },
  x1 = function(t, r) {
    if (!t) return null;
    for (var n = 0, i = t.length; n < i; n++)
      if (t[n].item === r) return t[n].position;
    return null
  },
  w1 = function(t, r) {
    if (!r || r.length !== 2 || !X(r[0]) || !X(r[1])) return t;
    var n = Math.min(r[0], r[1]),
      i = Math.max(r[0], r[1]),
      o = [t[0], t[1]];
    return (!X(t[0]) || t[0] < n) && (o[0] = n), (!X(t[1]) || t[1] > i) && (o[1] = i), o[0] > i && (o[0] = i), o[1] < n && (o[1] = n), o
  },
  YW = function(t) {
    var r = t.length;
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var o = 0, a = 0, u = 0; u < r; ++u) {
          var s = (0, ds.default)(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
          s >= 0 ? (t[u][n][0] = o, t[u][n][1] = o + s, o = t[u][n][1]) : (t[u][n][0] = a, t[u][n][1] = a + s, a = t[u][n][1])
        }
  },
  ZW = function(t) {
    var r = t.length;
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var o = 0, a = 0; a < r; ++a) {
          var u = (0, ds.default)(t[a][n][1]) ? t[a][n][0] : t[a][n][1];
          u >= 0 ? (t[a][n][0] = o, t[a][n][1] = o + u, o = t[a][n][1]) : (t[a][n][0] = 0, t[a][n][1] = 0)
        }
  },
  JW = {
    sign: YW,
    expand: hc,
    none: Tt,
    silhouette: yc,
    wiggle: vc,
    positive: ZW
  },
  QW = function(t, r, n) {
    var i = r.map(function(u) {
        return u.props.dataKey
      }),
      o = JW[n],
      a = mc().keys(i).value(function(u, s) {
        return +Ke(u, s, 0)
      }).order(jn).offset(o);
    return a(t)
  },
  O1 = function(t, r, n, i, o, a) {
    if (!t) return null;
    var u = a ? r.reverse() : r,
      s = {},
      l = u.reduce(function(c, p) {
        var d, y = (d = p.type) !== null && d !== void 0 && d.defaultProps ? Ie(Ie({}, p.type.defaultProps), p.props) : p.props,
          m = y.stackId,
          v = y.hide;
        if (v) return c;
        var x = y[n],
          w = c[x] || {
            hasStack: !1,
            stackGroups: {}
          };
        if (Ee(m)) {
          var S = w.stackGroups[m] || {
            numericAxisId: n,
            cateAxisId: i,
            items: []
          };
          S.items.push(p), w.hasStack = !0, w.stackGroups[m] = S
        } else w.stackGroups[Vt("_stackId_")] = {
          numericAxisId: n,
          cateAxisId: i,
          items: [p]
        };
        return Ie(Ie({}, c), {}, ni({}, x, w))
      }, s),
      f = {};
    return Object.keys(l).reduce(function(c, p) {
      var d = l[p];
      if (d.hasStack) {
        var y = {};
        d.stackGroups = Object.keys(d.stackGroups).reduce(function(m, v) {
          var x = d.stackGroups[v];
          return Ie(Ie({}, m), {}, ni({}, v, {
            numericAxisId: n,
            cateAxisId: i,
            items: x.items,
            stackedData: QW(t, x.items, o)
          }))
        }, y)
      }
      return Ie(Ie({}, c), {}, ni({}, p, d))
    }, f)
  },
  S1 = function(t, r) {
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
      var f = ip(l, o, u);
      return t.domain([(0, qo.default)(f), (0, Bo.default)(f)]), {
        niceTicks: f
      }
    }
    if (o && i === "number") {
      var c = t.domain(),
        p = op(c, o, u);
      return {
        niceTicks: p
      }
    }
    return null
  };

function mp(e) {
  var t = e.axis,
    r = e.ticks,
    n = e.bandSize,
    i = e.entry,
    o = e.index,
    a = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !(0, yt.default)(i[t.dataKey])) {
      var u = xn(r, "value", i[t.dataKey]);
      if (u) return u.coordinate + n / 2
    }
    return r[o] ? r[o].coordinate + n / 2 : null
  }
  var s = Ke(i, (0, yt.default)(a) ? t.dataKey : a);
  return (0, yt.default)(s) ? null : t.scale(s)
}
var hp = function(t) {
    var r = t.axis,
      n = t.ticks,
      i = t.offset,
      o = t.bandSize,
      a = t.entry,
      u = t.index;
    if (r.type === "category") return n[u] ? n[u].coordinate + i : null;
    var s = Ke(a, r.dataKey, r.domain[u]);
    return (0, yt.default)(s) ? null : r.scale(s) - o / 2 + i
  },
  A1 = function(t) {
    var r = t.numericAxis,
      n = r.scale.domain();
    if (r.type === "number") {
      var i = Math.min(n[0], n[1]),
        o = Math.max(n[0], n[1]);
      return i <= 0 && o >= 0 ? 0 : o < 0 ? o : i
    }
    return n[0]
  },
  _1 = function(t, r) {
    var n, i = (n = t.type) !== null && n !== void 0 && n.defaultProps ? Ie(Ie({}, t.type.defaultProps), t.props) : t.props,
      o = i.stackId;
    if (Ee(o)) {
      var a = r[o];
      if (a) {
        var u = a.items.indexOf(t);
        return u >= 0 ? a.stackedData[u] : null
      }
    }
    return null
  },
  ez = function(t) {
    return t.reduce(function(r, n) {
      return [(0, qo.default)(n.concat([r[0]]).filter(X)), (0, Bo.default)(n.concat([r[1]]).filter(X))]
    }, [1 / 0, -1 / 0])
  },
  yp = function(t, r, n) {
    return Object.keys(t).reduce(function(i, o) {
      var a = t[o],
        u = a.stackedData,
        s = u.reduce(function(l, f) {
          var c = ez(f.slice(r, n + 1));
          return [Math.min(l[0], c[0]), Math.max(l[1], c[1])]
        }, [1 / 0, -1 / 0]);
      return [Math.min(s[0], i[0]), Math.max(s[1], i[1])]
    }, [1 / 0, -1 / 0]).map(function(i) {
      return i === 1 / 0 || i === -1 / 0 ? 0 : i
    })
  },
  o1 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  a1 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  ms = function(t, r, n) {
    if ((0, ii.default)(t)) return t(r, n);
    if (!Array.isArray(t)) return r;
    var i = [];
    if (X(t[0])) i[0] = n ? t[0] : Math.min(t[0], r[0]);
    else if (o1.test(t[0])) {
      var o = +o1.exec(t[0])[1];
      i[0] = r[0] - o
    } else(0, ii.default)(t[0]) ? i[0] = t[0](r[0]) : i[0] = r[0];
    if (X(t[1])) i[1] = n ? t[1] : Math.max(t[1], r[1]);
    else if (a1.test(t[1])) {
      var a = +a1.exec(t[1])[1];
      i[1] = r[1] + a
    } else(0, ii.default)(t[1]) ? i[1] = t[1](r[1]) : i[1] = r[1];
    return i
  },
  ai = function(t, r, n) {
    if (t && t.scale && t.scale.bandwidth) {
      var i = t.scale.bandwidth();
      if (!n || i > 0) return i
    }
    if (t && r && r.length >= 2) {
      for (var o = (0, f1.default)(r, function(c) {
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
  vp = function(t, r, n) {
    return !t || !t.length || (0, c1.default)(t, (0, cp.default)(n, "type.defaultProps.domain")) ? r : t
  },
  hs = function(t, r) {
    var n = t.type.defaultProps ? Ie(Ie({}, t.type.defaultProps), t.props) : t.props,
      i = n.dataKey,
      o = n.name,
      a = n.unit,
      u = n.formatter,
      s = n.tooltipType,
      l = n.chartType,
      f = n.hide;
    return Ie(Ie({}, ae(t, !1)), {}, {
      dataKey: i,
      unit: a,
      formatter: u,
      name: o || i,
      color: Ro(t),
      value: Ke(r, i),
      type: s,
      payload: r,
      chartType: l,
      hide: f
    })
  };

function zo(e) {
  "@babel/helpers - typeof";
  return zo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, zo(e)
}

function P1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function T1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? P1(Object(r), !0).forEach(function(n) {
      tz(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : P1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function tz(e, t, r) {
  return t = rz(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function rz(e) {
  var t = nz(e, "string");
  return zo(t) == "symbol" ? t : t + ""
}

function nz(e, t) {
  if (zo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (zo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Fo = Math.PI / 180;
var az = function(t) {
    return t * 180 / Math.PI
  },
  ke = function(t, r, n, i) {
    return {
      x: t + Math.cos(-Fo * i) * n,
      y: r + Math.sin(-Fo * i) * n
    }
  };
var uz = function(t, r) {
    var n = t.x,
      i = t.y,
      o = r.x,
      a = r.y;
    return Math.sqrt(Math.pow(n - o, 2) + Math.pow(i - a, 2))
  },
  sz = function(t, r) {
    var n = t.x,
      i = t.y,
      o = r.cx,
      a = r.cy,
      u = uz({
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
      angle: az(l),
      angleInRadian: l
    }
  },
  lz = function(t) {
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
  cz = function(t, r) {
    var n = r.startAngle,
      i = r.endAngle,
      o = Math.floor(n / 360),
      a = Math.floor(i / 360),
      u = Math.min(o, a);
    return t + u * 360
  },
  gp = function(t, r) {
    var n = t.x,
      i = t.y,
      o = sz({
        x: n,
        y: i
      }, r),
      a = o.radius,
      u = o.angle,
      s = r.innerRadius,
      l = r.outerRadius;
    if (a < s || a > l) return !1;
    if (a === 0) return !0;
    var f = lz(r),
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
    return y ? T1(T1({}, r), {}, {
      radius: a,
      angle: cz(d, r)
    }) : null
  };

function $o(e) {
  "@babel/helpers - typeof";
  return $o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, $o(e)
}
var fz = ["offset"];

function pz(e) {
  return yz(e) || hz(e) || mz(e) || dz()
}

function dz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function mz(e, t) {
  if (e) {
    if (typeof e == "string") return bp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return bp(e, t)
  }
}

function hz(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function yz(e) {
  if (Array.isArray(e)) return bp(e)
}

function bp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function vz(e, t) {
  if (e == null) return {};
  var r = gz(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function gz(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function E1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ze(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? E1(Object(r), !0).forEach(function(n) {
      bz(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : E1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function bz(e, t, r) {
  return t = xz(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function xz(e) {
  var t = wz(e, "string");
  return $o(t) == "symbol" ? t : t + ""
}

function wz(e, t) {
  if ($o(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if ($o(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function Uo() {
  return Uo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Uo.apply(this, arguments)
}
var Sz = function(t) {
    var r = t.value,
      n = t.formatter,
      i = (0, Ho.default)(t.children) ? r : t.children;
    return (0, Go.default)(n) ? n(i) : i
  },
  Az = function(t, r) {
    var n = Xe(r - t),
      i = Math.min(Math.abs(r - t), 360);
    return n * i
  },
  _z = function(t, r, n) {
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
      x = Az(d, y),
      w = x >= 0 ? 1 : -1,
      S, A;
    i === "insideStart" ? (S = d + w * a, A = m) : i === "insideEnd" ? (S = y - w * a, A = !m) : i === "end" && (S = y + w * a, A = m), A = x <= 0 ? A : !A;
    var h = ke(l, f, v, S),
      g = ke(l, f, v, S + (A ? 1 : -1) * 359),
      P = "M".concat(h.x, ",").concat(h.y, `
    A`).concat(v, ",").concat(v, ",0,1,").concat(A ? 0 : 1, `,
    `).concat(g.x, ",").concat(g.y),
      C = (0, Ho.default)(t.id) ? Vt("recharts-radial-line-") : t.id;
    return rr.createElement("text", Uo({}, n, {
      dominantBaseline: "central",
      className: oe("recharts-radial-bar-label", u)
    }), rr.createElement("defs", null, rr.createElement("path", {
      id: C,
      d: P
    })), rr.createElement("textPath", {
      xlinkHref: "#".concat(C)
    }, r))
  },
  Pz = function(t) {
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
      var d = ke(a, u, l + n, p),
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
      x = ke(a, u, v, p),
      w = x.x,
      S = x.y;
    return {
      x: w,
      y: S,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }
  },
  Tz = function(t) {
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
      return ze(ze({}, S), n ? {
        height: Math.max(s - n.y, 0),
        width: l
      } : {})
    }
    if (o === "bottom") {
      var A = {
        x: u + l / 2,
        y: s + f + p,
        textAnchor: "middle",
        verticalAnchor: y
      };
      return ze(ze({}, A), n ? {
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
      return ze(ze({}, h), n ? {
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
      return ze(ze({}, g), n ? {
        width: Math.max(n.x + n.width - g.x, 0),
        height: f
      } : {})
    }
    var P = n ? {
      width: l,
      height: f
    } : {};
    return o === "insideLeft" ? ze({
      x: u + v,
      y: s + f / 2,
      textAnchor: w,
      verticalAnchor: "middle"
    }, P) : o === "insideRight" ? ze({
      x: u + l - v,
      y: s + f / 2,
      textAnchor: x,
      verticalAnchor: "middle"
    }, P) : o === "insideTop" ? ze({
      x: u + l / 2,
      y: s + p,
      textAnchor: "middle",
      verticalAnchor: y
    }, P) : o === "insideBottom" ? ze({
      x: u + l / 2,
      y: s + f - p,
      textAnchor: "middle",
      verticalAnchor: d
    }, P) : o === "insideTopLeft" ? ze({
      x: u + v,
      y: s + p,
      textAnchor: w,
      verticalAnchor: y
    }, P) : o === "insideTopRight" ? ze({
      x: u + l - v,
      y: s + p,
      textAnchor: x,
      verticalAnchor: y
    }, P) : o === "insideBottomLeft" ? ze({
      x: u + v,
      y: s + f - p,
      textAnchor: w,
      verticalAnchor: d
    }, P) : o === "insideBottomRight" ? ze({
      x: u + l - v,
      y: s + f - p,
      textAnchor: x,
      verticalAnchor: d
    }, P) : (0, wp.default)(o) && (X(o.x) || ur(o.x)) && (X(o.y) || ur(o.y)) ? ze({
      x: u + Nt(o.x, l),
      y: s + Nt(o.y, f),
      textAnchor: "end",
      verticalAnchor: "end"
    }, P) : ze({
      x: u + l / 2,
      y: s + f / 2,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }, P)
  },
  Ez = function(t) {
    return "cx" in t && X(t.cx)
  };

function Ne(e) {
  var t = e.offset,
    r = t === void 0 ? 5 : t,
    n = vz(e, fz),
    i = ze({
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
  if (!o || (0, Ho.default)(u) && (0, Ho.default)(s) && !ys(l) && !(0, Go.default)(l)) return null;
  if (ys(l)) return xp(l, i);
  var d;
  if ((0, Go.default)(l)) {
    if (d = Oz(l, i), ys(d)) return d
  } else d = Sz(i);
  var y = Ez(o),
    m = ae(i, !0);
  if (y && (a === "insideStart" || a === "insideEnd" || a === "end")) return _z(i, d, m);
  var v = y ? Pz(i) : Tz(i);
  return rr.createElement(Ur, Uo({
    className: oe("recharts-label", c)
  }, m, v, {
    breakAll: p
  }), d)
}
Ne.displayName = "Label";
var j1 = function(t) {
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
  jz = function(t, r) {
    return t ? t === !0 ? rr.createElement(Ne, {
      key: "label-implicit",
      viewBox: r
    }) : Ee(t) ? rr.createElement(Ne, {
      key: "label-implicit",
      viewBox: r,
      value: t
    }) : ys(t) ? t.type === Ne ? xp(t, {
      key: "label-implicit",
      viewBox: r
    }) : rr.createElement(Ne, {
      key: "label-implicit",
      content: t,
      viewBox: r
    }) : (0, Go.default)(t) ? rr.createElement(Ne, {
      key: "label-implicit",
      content: t,
      viewBox: r
    }) : (0, wp.default)(t) ? rr.createElement(Ne, Uo({
      viewBox: r
    }, t, {
      key: "label-implicit"
    })) : null : null
  },
  Mz = function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!t || !t.children && n && !t.label) return null;
    var i = t.children,
      o = j1(t),
      a = qe(i, Ne).map(function(s, l) {
        return xp(s, {
          viewBox: r || o,
          key: "label-".concat(l)
        })
      });
    if (!n) return a;
    var u = jz(t.label, r || o);
    return [u].concat(pz(a))
  };
Ne.parseViewBox = j1;
Ne.renderCallByParent = Mz;
var vs = Q(Ot()),
  N1 = Q(wt()),
  R1 = Q(De()),
  L1 = Q(C1());
import ui, {
  cloneElement as $z
} from "./react-shim-eraudit.js";

function Ko(e) {
  "@babel/helpers - typeof";
  return Ko = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ko(e)
}
var Iz = ["valueAccessor"],
  kz = ["data", "dataKey", "clockWise", "id", "textBreakAll"];

function Dz(e) {
  return Bz(e) || Lz(e) || Rz(e) || Nz()
}

function Nz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Rz(e, t) {
  if (e) {
    if (typeof e == "string") return Op(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Op(e, t)
  }
}

function Lz(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function Bz(e) {
  if (Array.isArray(e)) return Op(e)
}

function Op(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function gs() {
  return gs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, gs.apply(this, arguments)
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
      qz(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : I1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function qz(e, t, r) {
  return t = Wz(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Wz(e) {
  var t = zz(e, "string");
  return Ko(t) == "symbol" ? t : t + ""
}

function zz(e, t) {
  if (Ko(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ko(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function D1(e, t) {
  if (e == null) return {};
  var r = Fz(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function Fz(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var Uz = function(t) {
  return Array.isArray(t.value) ? (0, L1.default)(t.value) : t.value
};

function nr(e) {
  var t = e.valueAccessor,
    r = t === void 0 ? Uz : t,
    n = D1(e, Iz),
    i = n.data,
    o = n.dataKey,
    a = n.clockWise,
    u = n.id,
    s = n.textBreakAll,
    l = D1(n, kz);
  return !i || !i.length ? null : ui.createElement(ge, {
    className: "recharts-label-list"
  }, i.map(function(f, c) {
    var p = (0, vs.default)(o) ? r(f, c) : Ke(f && f.payload, o),
      d = (0, vs.default)(u) ? {} : {
        id: "".concat(u, "-").concat(c)
      };
    return ui.createElement(Ne, gs({}, ae(f, !0), l, d, {
      parentViewBox: f.parentViewBox,
      value: p,
      textBreakAll: s,
      viewBox: Ne.parseViewBox((0, vs.default)(a) ? f : k1(k1({}, f), {}, {
        clockWise: a
      })),
      key: "label-".concat(c),
      index: c
    }))
  }))
}
nr.displayName = "LabelList";

function Hz(e, t) {
  return e ? e === !0 ? ui.createElement(nr, {
    key: "labelList-implicit",
    data: t
  }) : ui.isValidElement(e) || (0, R1.default)(e) ? ui.createElement(nr, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : (0, N1.default)(e) ? ui.createElement(nr, gs({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null
}

function Gz(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label) return null;
  var n = e.children,
    i = qe(n, nr).map(function(a, u) {
      return $z(a, {
        data: t,
        key: "labelList-".concat(u)
      })
    });
  if (!r) return i;
  var o = Hz(e.label, t);
  return [o].concat(Dz(i))
}
nr.renderCallByParent = Gz;
import Yz from "./react-shim-eraudit.js";

function Vo(e) {
  "@babel/helpers - typeof";
  return Vo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Vo(e)
}

function Sp() {
  return Sp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Sp.apply(this, arguments)
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
      Kz(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : B1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Kz(e, t, r) {
  return t = Vz(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function Vz(e) {
  var t = Xz(e, "string");
  return Vo(t) == "symbol" ? t : t + ""
}

function Xz(e, t) {
  if (Vo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Vo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Zz = function(t, r) {
    var n = Xe(r - t),
      i = Math.min(Math.abs(r - t), 359.999);
    return n * i
  },
  bs = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.radius,
      o = t.angle,
      a = t.sign,
      u = t.isExternal,
      s = t.cornerRadius,
      l = t.cornerIsExternal,
      f = s * (u ? 1 : -1) + i,
      c = Math.asin(s / f) / Fo,
      p = l ? o : o + a * c,
      d = ke(r, n, f, p),
      y = ke(r, n, i, p),
      m = l ? o - a * c : o,
      v = ke(r, n, f * Math.cos(c * Fo), m);
    return {
      center: d,
      circleTangency: y,
      lineTangency: v,
      theta: c
    }
  },
  W1 = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      o = t.outerRadius,
      a = t.startAngle,
      u = t.endAngle,
      s = Zz(a, u),
      l = a + s,
      f = ke(r, n, o, a),
      c = ke(r, n, o, l),
      p = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(o, ",").concat(o, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(a > l), `,
    `).concat(c.x, ",").concat(c.y, `
  `);
    if (i > 0) {
      var d = ke(r, n, i, a),
        y = ke(r, n, i, l);
      p += "L ".concat(y.x, ",").concat(y.y, `
            A `).concat(i, ",").concat(i, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(a <= l), `,
            `).concat(d.x, ",").concat(d.y, " Z")
    } else p += "L ".concat(r, ",").concat(n, " Z");
    return p
  },
  Jz = function(t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      o = t.outerRadius,
      a = t.cornerRadius,
      u = t.forceCornerRadius,
      s = t.cornerIsExternal,
      l = t.startAngle,
      f = t.endAngle,
      c = Xe(f - l),
      p = bs({
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
      v = bs({
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
      A = s ? Math.abs(l - f) : Math.abs(l - f) - m - S;
    if (A < 0) return u ? "M ".concat(y.x, ",").concat(y.y, `
        a`).concat(a, ",").concat(a, ",0,0,1,").concat(a * 2, `,0
        a`).concat(a, ",").concat(a, ",0,0,1,").concat(-a * 2, `,0
      `) : W1({
      cx: r,
      cy: n,
      innerRadius: i,
      outerRadius: o,
      startAngle: l,
      endAngle: f
    });
    var h = "M ".concat(y.x, ",").concat(y.y, `
    A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(d.x, ",").concat(d.y, `
    A`).concat(o, ",").concat(o, ",0,").concat(+(A > 180), ",").concat(+(c < 0), ",").concat(x.x, ",").concat(x.y, `
    A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(w.x, ",").concat(w.y, `
  `);
    if (i > 0) {
      var g = bs({
          cx: r,
          cy: n,
          radius: i,
          angle: l,
          sign: c,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s
        }),
        P = g.circleTangency,
        C = g.lineTangency,
        k = g.theta,
        B = bs({
          cx: r,
          cy: n,
          radius: i,
          angle: f,
          sign: -c,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s
        }),
        z = B.circleTangency,
        N = B.lineTangency,
        K = B.theta,
        U = s ? Math.abs(l - f) : Math.abs(l - f) - k - K;
      if (U < 0 && a === 0) return "".concat(h, "L").concat(r, ",").concat(n, "Z");
      h += "L".concat(N.x, ",").concat(N.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(z.x, ",").concat(z.y, `
      A`).concat(i, ",").concat(i, ",0,").concat(+(U > 180), ",").concat(+(c > 0), ",").concat(P.x, ",").concat(P.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(C.x, ",").concat(C.y, "Z")
    } else h += "L".concat(r, ",").concat(n, "Z");
    return h
  },
  Qz = {
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
  xs = function(t) {
    var r = q1(q1({}, Qz), t),
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
    var d = oe("recharts-sector", p),
      y = a - o,
      m = Nt(u, y, 0, !0),
      v;
    return m > 0 && Math.abs(f - c) < 360 ? v = Jz({
      cx: n,
      cy: i,
      innerRadius: o,
      outerRadius: a,
      cornerRadius: Math.min(m, y / 2),
      forceCornerRadius: s,
      cornerIsExternal: l,
      startAngle: f,
      endAngle: c
    }) : v = W1({
      cx: n,
      cy: i,
      innerRadius: o,
      outerRadius: a,
      startAngle: f,
      endAngle: c
    }), Yz.createElement("path", Sp({}, ae(r, !0), {
      className: d,
      d: v,
      role: "img"
    }))
  };
import * as U1 from "./react-shim-eraudit.js";
var H1 = Q(Ya()),
  G1 = Q(De());

function Zo(e) {
  "@babel/helpers - typeof";
  return Zo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Zo(e)
}

function Ap() {
  return Ap = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ap.apply(this, arguments)
}

function z1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function F1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? z1(Object(r), !0).forEach(function(n) {
      eF(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : z1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function eF(e, t, r) {
  return t = tF(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function tF(e) {
  var t = rF(e, "string");
  return Zo(t) == "symbol" ? t : t + ""
}

function rF(e, t) {
  if (Zo(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Zo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var $1 = {
    curveBasisClosed: ic,
    curveBasisOpen: oc,
    curveBasis: nc,
    curveBumpX: Kl,
    curveBumpY: Vl,
    curveLinearClosed: ac,
    curveLinear: br,
    curveMonotoneX: sc,
    curveMonotoneY: lc,
    curveNatural: cc,
    curveStep: fc,
    curveStepAfter: dc,
    curveStepBefore: pc
  },
  ws = function(t) {
    return t.x === +t.x && t.y === +t.y
  },
  Xo = function(t) {
    return t.x
  },
  Yo = function(t) {
    return t.y
  },
  nF = function(t, r) {
    if ((0, G1.default)(t)) return t;
    var n = "curve".concat((0, H1.default)(t));
    return (n === "curveMonotone" || n === "curveBump") && r ? $1["".concat(n).concat(r === "vertical" ? "Y" : "X")] : $1[n] || br
  },
  iF = function(t) {
    var r = t.type,
      n = r === void 0 ? "linear" : r,
      i = t.points,
      o = i === void 0 ? [] : i,
      a = t.baseLine,
      u = t.layout,
      s = t.connectNulls,
      l = s === void 0 ? !1 : s,
      f = nF(n, u),
      c = l ? o.filter(function(m) {
        return ws(m)
      }) : o,
      p;
    if (Array.isArray(a)) {
      var d = l ? a.filter(function(m) {
          return ws(m)
        }) : a,
        y = c.map(function(m, v) {
          return F1(F1({}, m), {}, {
            base: d[v]
          })
        });
      return u === "vertical" ? p = _n().y(Yo).x1(Xo).x0(function(m) {
        return m.base.x
      }) : p = _n().x(Xo).y1(Yo).y0(function(m) {
        return m.base.y
      }), p.defined(ws).curve(f), p(y)
    }
    return u === "vertical" && X(a) ? p = _n().y(Yo).x1(Xo).x0(a) : X(a) ? p = _n().x(Xo).y1(Yo).y0(a) : p = Ki().x(Xo).y(Yo), p.defined(ws).curve(f), p(c)
  },
  Jo = function(t) {
    var r = t.className,
      n = t.points,
      i = t.path,
      o = t.pathRef;
    if ((!n || !n.length) && !i) return null;
    var a = n && n.length ? iF(t) : i;
    return U1.createElement("path", Ap({}, ae(t, !1), Rr(t), {
      className: oe("recharts-curve", r),
      d: a,
      ref: o
    }))
  };
import js, {
  useEffect as H3,
  useRef as G3,
  useState as K3
} from "./react-shim-eraudit.js";
var xe = Q(eO());
import D3, {
  PureComponent as N3,
  cloneElement as R3,
  Children as Dp
} from "./react-shim-eraudit.js";
var {
  getOwnPropertyNames: uF,
  getOwnPropertySymbols: sF
} = Object, {
  hasOwnProperty: lF
} = Object.prototype;

function _p(e, t) {
  return function(n, i, o) {
    return e(n, i, o) && t(n, i, o)
  }
}

function Os(e) {
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

function cF(e) {
  return e?.[Symbol.toStringTag]
}

function tO(e) {
  return uF(e).concat(sF(e))
}
var fF = Object.hasOwn || ((e, t) => lF.call(e, t));

function sn(e, t) {
  return e === t || !e && !t && e !== e && t !== t
}
var pF = "__v",
  dF = "__o",
  mF = "_owner",
  {
    getOwnPropertyDescriptor: rO,
    keys: nO
  } = Object;

function hF(e, t) {
  return e.byteLength === t.byteLength && Ss(new Uint8Array(e), new Uint8Array(t))
}

function yF(e, t, r) {
  let n = e.length;
  if (t.length !== n) return !1;
  for (; n-- > 0;)
    if (!r.equals(e[n], t[n], n, n, e, t, r)) return !1;
  return !0
}

function vF(e, t) {
  return e.byteLength === t.byteLength && Ss(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength))
}

function gF(e, t) {
  return sn(e.getTime(), t.getTime())
}

function bF(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack
}

function xF(e, t) {
  return e === t
}

function iO(e, t, r) {
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
var wF = sn;

function OF(e, t, r) {
  let n = nO(e),
    i = n.length;
  if (nO(t).length !== i) return !1;
  for (; i-- > 0;)
    if (!aO(e, t, r, n[i])) return !1;
  return !0
}

function Qo(e, t, r) {
  let n = tO(e),
    i = n.length;
  if (tO(t).length !== i) return !1;
  let o, a, u;
  for (; i-- > 0;)
    if (o = n[i], !aO(e, t, r, o) || (a = rO(e, o), u = rO(t, o), (a || u) && (!a || !u || a.configurable !== u.configurable || a.enumerable !== u.enumerable || a.writable !== u.writable))) return !1;
  return !0
}

function SF(e, t) {
  return sn(e.valueOf(), t.valueOf())
}

function AF(e, t) {
  return e.source === t.source && e.flags === t.flags
}

function oO(e, t, r) {
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

function Ss(e, t) {
  let r = e.byteLength;
  if (t.byteLength !== r || e.byteOffset !== t.byteOffset) return !1;
  for (; r-- > 0;)
    if (e[r] !== t[r]) return !1;
  return !0
}

function _F(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password
}

function aO(e, t, r, n) {
  return (n === mF || n === dF || n === pF) && (e.$$typeof || t.$$typeof) ? !0 : fF(t, n) && r.equals(e[n], t[n], n, n, e, t, r)
}
var PF = "[object ArrayBuffer]",
  TF = "[object Arguments]",
  EF = "[object Boolean]",
  jF = "[object DataView]",
  MF = "[object Date]",
  CF = "[object Error]",
  IF = "[object Map]",
  kF = "[object Number]",
  DF = "[object Object]",
  NF = "[object RegExp]",
  RF = "[object Set]",
  LF = "[object String]",
  BF = {
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
  qF = "[object URL]",
  WF = Object.prototype.toString;

function zF({
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
    let A = v.constructor;
    if (A !== x.constructor) return !1;
    if (A === Object) return s(v, x, w);
    if (Array.isArray(v)) return t(v, x, w);
    if (A === Date) return n(v, x, w);
    if (A === RegExp) return f(v, x, w);
    if (A === Map) return a(v, x, w);
    if (A === Set) return c(v, x, w);
    let h = WF.call(v);
    if (h === MF) return n(v, x, w);
    if (h === NF) return f(v, x, w);
    if (h === IF) return a(v, x, w);
    if (h === RF) return c(v, x, w);
    if (h === DF) return typeof v.then != "function" && typeof x.then != "function" && s(v, x, w);
    if (h === qF) return d(v, x, w);
    if (h === CF) return i(v, x, w);
    if (h === TF) return s(v, x, w);
    if (BF[h]) return p(v, x, w);
    if (h === PF) return e(v, x, w);
    if (h === jF) return r(v, x, w);
    if (h === EF || h === kF || h === LF) return l(v, x, w);
    if (y) {
      let g = y[h];
      if (!g) {
        let P = cF(v);
        P && (g = y[P])
      }
      if (g) return g(v, x, w)
    }
    return !1
  }
}

function FF({
  circular: e,
  createCustomConfig: t,
  strict: r
}) {
  let n = {
    areArrayBuffersEqual: hF,
    areArraysEqual: r ? Qo : yF,
    areDataViewsEqual: vF,
    areDatesEqual: gF,
    areErrorsEqual: bF,
    areFunctionsEqual: xF,
    areMapsEqual: r ? _p(iO, Qo) : iO,
    areNumbersEqual: wF,
    areObjectsEqual: r ? Qo : OF,
    arePrimitiveWrappersEqual: SF,
    areRegExpsEqual: AF,
    areSetsEqual: r ? _p(oO, Qo) : oO,
    areTypedArraysEqual: r ? _p(Ss, Qo) : Ss,
    areUrlsEqual: _F,
    unknownTagComparators: void 0
  };
  if (t && (n = Object.assign({}, n, t(n))), e) {
    let i = Os(n.areArraysEqual),
      o = Os(n.areMapsEqual),
      a = Os(n.areObjectsEqual),
      u = Os(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: i,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: u
    })
  }
  return n
}

function $F(e) {
  return function(t, r, n, i, o, a, u) {
    return e(t, r, u)
  }
}

function UF({
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
var uO = Er(),
  Aee = Er({
    strict: !0
  }),
  _ee = Er({
    circular: !0
  }),
  Pee = Er({
    circular: !0,
    strict: !0
  }),
  Tee = Er({
    createInternalComparator: () => sn
  }),
  Eee = Er({
    strict: !0,
    createInternalComparator: () => sn
  }),
  jee = Er({
    circular: !0,
    createInternalComparator: () => sn
  }),
  Mee = Er({
    circular: !0,
    createInternalComparator: () => sn,
    strict: !0
  });

function Er(e = {}) {
  let {
    circular: t = !1,
    createInternalComparator: r,
    createState: n,
    strict: i = !1
  } = e, o = FF(e), a = zF(o), u = r ? r(a) : $F(a);
  return UF({
    circular: t,
    comparator: a,
    createState: n,
    equals: u,
    strict: i
  })
}

function HF(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e)
}

function As(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    r = -1,
    n = function i(o) {
      r < 0 && (r = o), o - r > t ? (e(o), r = -1) : HF(i)
    };
  requestAnimationFrame(n)
}

function Pp(e) {
  "@babel/helpers - typeof";
  return Pp = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Pp(e)
}

function GF(e) {
  return YF(e) || XF(e) || VF(e) || KF()
}

function KF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function VF(e, t) {
  if (e) {
    if (typeof e == "string") return sO(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return sO(e, t)
  }
}

function sO(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function XF(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function YF(e) {
  if (Array.isArray(e)) return e
}

function Tp() {
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
            u = GF(a),
            s = u[0],
            l = u.slice(1);
          if (typeof s == "number") {
            As(i.bind(null, l), s);
            return
          }
          i(s), As(i.bind(null, l));
          return
        }
        Pp(o) === "object" && (e = o, t(e)), typeof o == "function" && o()
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

function ea(e) {
  "@babel/helpers - typeof";
  return ea = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ea(e)
}

function lO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function cO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? lO(Object(r), !0).forEach(function(n) {
      fO(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : lO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function fO(e, t, r) {
  return t = ZF(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function ZF(e) {
  var t = JF(e, "string");
  return ea(t) === "symbol" ? t : String(t)
}

function JF(e, t) {
  if (ea(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ea(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var pO = function(t, r) {
    return [Object.keys(t), Object.keys(r)].reduce(function(n, i) {
      return n.filter(function(o) {
        return i.includes(o)
      })
    })
  },
  dO = function(t) {
    return t
  },
  QF = function(t) {
    return t.replace(/([A-Z])/g, function(r) {
      return "-".concat(r.toLowerCase())
    })
  };
var si = function(t, r) {
    return Object.keys(r).reduce(function(n, i) {
      return cO(cO({}, n), {}, fO({}, i, t(i, r[i])))
    }, {})
  },
  Ep = function(t, r, n) {
    return t.map(function(i) {
      return "".concat(QF(i), " ").concat(r, "ms ").concat(n)
    }).join(",")
  },
  e3 = !1,
  ta = function(t, r, n, i, o, a, u, s) {
    if (e3 && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var l = [n, i, o, a, u, s],
          f = 0;
        console.warn(r.replace(/%s/g, function() {
          return l[f++]
        }))
      }
  };

function t3(e, t) {
  return i3(e) || n3(e, t) || yO(e, t) || r3()
}

function r3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function n3(e, t) {
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

function i3(e) {
  if (Array.isArray(e)) return e
}

function o3(e) {
  return s3(e) || u3(e) || yO(e) || a3()
}

function a3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function yO(e, t) {
  if (e) {
    if (typeof e == "string") return jp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return jp(e, t)
  }
}

function u3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function s3(e) {
  if (Array.isArray(e)) return jp(e)
}

function jp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var _s = 1e-4,
  vO = function(t, r) {
    return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1]
  },
  gO = function(t, r) {
    return t.map(function(n, i) {
      return n * Math.pow(r, i)
    }).reduce(function(n, i) {
      return n + i
    })
  },
  mO = function(t, r) {
    return function(n) {
      var i = vO(t, r);
      return gO(i, n)
    }
  },
  l3 = function(t, r) {
    return function(n) {
      var i = vO(t, r),
        o = [].concat(o3(i.map(function(a, u) {
          return a * u
        }).slice(1)), [0]);
      return gO(o, n)
    }
  },
  hO = function() {
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
            f = t3(l, 4);
          i = f[0], o = f[1], a = f[2], u = f[3]
        } else ta(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r)
      }
    }
    ta([i, a, o, u].every(function(v) {
      return typeof v == "number" && v >= 0 && v <= 1
    }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
    var c = mO(i, a),
      p = mO(o, u),
      d = l3(i, a),
      y = function(x) {
        return x > 1 ? 1 : x < 0 ? 0 : x
      },
      m = function(x) {
        for (var w = x > 1 ? 1 : x, S = w, A = 0; A < 8; ++A) {
          var h = c(S) - w,
            g = d(S);
          if (Math.abs(h - w) < _s || g < _s) return p(S);
          S = y(S - h / g)
        }
        return p(S)
      };
    return m.isStepper = !1, m
  },
  c3 = function() {
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
        return Math.abs(v - c) < _s && Math.abs(m) < _s ? [c, 0] : [v, m]
      };
    return s.isStepper = !0, s.dt = u, s
  },
  bO = function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
    var i = r[0];
    if (typeof i == "string") switch (i) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return hO(i);
      case "spring":
        return c3();
      default:
        if (i.split("(")[0] === "cubic-bezier") return hO(i);
        ta(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r)
    }
    return typeof i == "function" ? i : (ta(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null)
  };

function ra(e) {
  "@babel/helpers - typeof";
  return ra = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ra(e)
}

function xO(e) {
  return d3(e) || p3(e) || OO(e) || f3()
}

function f3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function p3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function d3(e) {
  if (Array.isArray(e)) return Cp(e)
}

function wO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ve(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wO(Object(r), !0).forEach(function(n) {
      Mp(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Mp(e, t, r) {
  return t = m3(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function m3(e) {
  var t = h3(e, "string");
  return ra(t) === "symbol" ? t : String(t)
}

function h3(e, t) {
  if (ra(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ra(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function y3(e, t) {
  return b3(e) || g3(e, t) || OO(e, t) || v3()
}

function v3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function OO(e, t) {
  if (e) {
    if (typeof e == "string") return Cp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Cp(e, t)
  }
}

function Cp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function g3(e, t) {
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

function b3(e) {
  if (Array.isArray(e)) return e
}
var Ps = function(t, r, n) {
    return t + (r - t) * n
  },
  Ip = function(t) {
    var r = t.from,
      n = t.to;
    return r !== n
  },
  x3 = function e(t, r, n) {
    var i = si(function(o, a) {
      if (Ip(a)) {
        var u = t(a.from, a.to, a.velocity),
          s = y3(u, 2),
          l = s[0],
          f = s[1];
        return Ve(Ve({}, a), {}, {
          from: l,
          velocity: f
        })
      }
      return a
    }, r);
    return n < 1 ? si(function(o, a) {
      return Ip(a) ? Ve(Ve({}, a), {}, {
        velocity: Ps(a.velocity, i[o].velocity, n),
        from: Ps(a.from, i[o].from, n)
      }) : a
    }, r) : e(t, i, n - 1)
  },
  SO = function(e, t, r, n, i) {
    var o = pO(e, t),
      a = o.reduce(function(v, x) {
        return Ve(Ve({}, v), {}, Mp({}, x, [e[x], t[x]]))
      }, {}),
      u = o.reduce(function(v, x) {
        return Ve(Ve({}, v), {}, Mp({}, x, {
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
        return si(function(x, w) {
          return w.from
        }, u)
      },
      d = function() {
        return !Object.values(u).filter(Ip).length
      },
      y = function(x) {
        l || (l = x);
        var w = x - l,
          S = w / r.dt;
        u = x3(r, u, S), i(Ve(Ve(Ve({}, e), t), p(u))), l = x, d() || (s = requestAnimationFrame(c))
      },
      m = function(x) {
        f || (f = x);
        var w = (x - f) / n,
          S = si(function(h, g) {
            return Ps.apply(void 0, xO(g).concat([r(w)]))
          }, a);
        if (i(Ve(Ve(Ve({}, e), t), S)), w < 1) s = requestAnimationFrame(c);
        else {
          var A = si(function(h, g) {
            return Ps.apply(void 0, xO(g).concat([r(1)]))
          }, a);
          i(Ve(Ve(Ve({}, e), t), A))
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

function li(e) {
  "@babel/helpers - typeof";
  return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, li(e)
}
var w3 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];

function O3(e, t) {
  if (e == null) return {};
  var r = S3(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function S3(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    i, o;
  for (o = 0; o < n.length; o++) i = n[o], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r
}

function kp(e) {
  return T3(e) || P3(e) || _3(e) || A3()
}

function A3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function _3(e, t) {
  if (e) {
    if (typeof e == "string") return Np(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Np(e, t)
  }
}

function P3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function T3(e) {
  if (Array.isArray(e)) return Np(e)
}

function Np(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function AO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function qt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? AO(Object(r), !0).forEach(function(n) {
      na(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : AO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function na(e, t, r) {
  return t = PO(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function E3(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _O(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, PO(n.key), n)
  }
}

function j3(e, t, r) {
  return t && _O(e.prototype, t), r && _O(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function PO(e) {
  var t = M3(e, "string");
  return li(t) === "symbol" ? t : String(t)
}

function M3(e, t) {
  if (li(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (li(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function C3(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Rp(e, t)
}

function Rp(e, t) {
  return Rp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Rp(e, t)
}

function I3(e) {
  var t = k3();
  return function() {
    var n = Ts(e),
      i;
    if (t) {
      var o = Ts(this).constructor;
      i = Reflect.construct(n, arguments, o)
    } else i = n.apply(this, arguments);
    return Lp(this, i)
  }
}

function Lp(e, t) {
  if (t && (li(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Bp(e)
}

function Bp(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function k3() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
  } catch {
    return !1
  }
}

function Ts(e) {
  return Ts = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ts(e)
}
var Es = function(e) {
  C3(r, e);
  var t = I3(r);

  function r(n, i) {
    var o;
    E3(this, r), o = t.call(this, n, i);
    var a = o.props,
      u = a.isActive,
      s = a.attributeName,
      l = a.from,
      f = a.to,
      c = a.steps,
      p = a.children,
      d = a.duration;
    if (o.handleStyleChange = o.handleStyleChange.bind(Bp(o)), o.changeStyle = o.changeStyle.bind(Bp(o)), !u || d <= 0) return o.state = {
      style: {}
    }, typeof p == "function" && (o.state = {
      style: f
    }), Lp(o);
    if (c && c.length) o.state = {
      style: c[0].style
    };
    else if (l) {
      if (typeof p == "function") return o.state = {
        style: l
      }, Lp(o);
      o.state = {
        style: s ? na({}, s, l) : l
      }
    } else o.state = {
      style: {}
    };
    return o
  }
  return j3(r, [{
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
            style: s ? na({}, s, f) : f
          };
          this.state && p && (s && p[s] !== f || !s && p !== f) && this.setState(d);
          return
        }
        if (!(uO(i.to, f) && i.canBegin && i.isActive)) {
          var y = !i.canBegin || !i.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var m = y || l ? c : i.to;
          if (this.state && p) {
            var v = {
              style: s ? na({}, s, m) : m
            };
            (s && p[s] !== m || !s && p !== m) && this.setState(v)
          }
          this.runAnimation(qt(qt({}, this.props), {}, {
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
        d = SO(a, u, bO(l), s, this.changeStyle),
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
            A = S === void 0 ? "ease" : S,
            h = v.style,
            g = v.properties,
            P = v.onAnimationEnd,
            C = x > 0 ? a[x - 1] : v,
            k = g || Object.keys(h);
          if (typeof A == "function" || A === "spring") return [].concat(kp(m), [o.runJSAnimation.bind(o, {
            from: C.style,
            to: h,
            duration: w,
            easing: A
          }), w]);
          var B = Ep(k, w, A),
            z = qt(qt(qt({}, C.style), h), {}, {
              transition: B
            });
          return [].concat(kp(m), [z, w, P]).filter(dO)
        };
      return this.manager.start([s].concat(kp(a.reduce(d, [f, Math.max(p, u)])), [i.onAnimationEnd]))
    }
  }, {
    key: "runAnimation",
    value: function(i) {
      this.manager || (this.manager = Tp());
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
      var m = u ? na({}, u, s) : s,
        v = Ep(Object.keys(m), a, l);
      y.start([f, o, qt(qt({}, m), {}, {
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
        w = O3(i, w3),
        S = Dp.count(o),
        A = this.state.style;
      if (typeof o == "function") return o(A);
      if (!f || S === 0 || u <= 0) return o;
      var h = function(P) {
        var C = P.props,
          k = C.style,
          B = k === void 0 ? {} : k,
          z = C.className,
          N = R3(P, qt(qt({}, w), {}, {
            style: qt(qt({}, B), A),
            className: z
          }));
        return N
      };
      return S === 1 ? h(Dp.only(o)) : D3.createElement("div", null, Dp.map(o, function(g) {
        return h(g)
      }))
    }
  }]), r
}(N3);
Es.displayName = "Animate";
Es.defaultProps = {
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
Es.propTypes = {
  from: xe.default.oneOfType([xe.default.object, xe.default.string]),
  to: xe.default.oneOfType([xe.default.object, xe.default.string]),
  attributeName: xe.default.string,
  duration: xe.default.number,
  begin: xe.default.number,
  easing: xe.default.oneOfType([xe.default.string, xe.default.func]),
  steps: xe.default.arrayOf(xe.default.shape({
    duration: xe.default.number.isRequired,
    style: xe.default.object.isRequired,
    easing: xe.default.oneOfType([xe.default.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), xe.default.func]),
    properties: xe.default.arrayOf("string"),
    onAnimationEnd: xe.default.func
  })),
  children: xe.default.oneOfType([xe.default.node, xe.default.func]),
  isActive: xe.default.bool,
  canBegin: xe.default.bool,
  onAnimationEnd: xe.default.func,
  shouldReAnimate: xe.default.bool,
  onAnimationStart: xe.default.func,
  onAnimationReStart: xe.default.func
};
var TO = Es;
var ir = TO;

function ia(e) {
  "@babel/helpers - typeof";
  return ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ia(e)
}

function Ms() {
  return Ms = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ms.apply(this, arguments)
}

function L3(e, t) {
  return z3(e) || W3(e, t) || q3(e, t) || B3()
}

function B3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function q3(e, t) {
  if (e) {
    if (typeof e == "string") return EO(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return EO(e, t)
  }
}

function EO(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function W3(e, t) {
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

function z3(e) {
  if (Array.isArray(e)) return e
}

function jO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function MO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jO(Object(r), !0).forEach(function(n) {
      F3(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function F3(e, t, r) {
  return t = $3(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function $3(e) {
  var t = U3(e, "string");
  return ia(t) == "symbol" ? t : t + ""
}

function U3(e, t) {
  if (ia(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ia(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var CO = function(t, r, n, i, o) {
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
  IO = function(t, r) {
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
  V3 = {
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
  ci = function(t) {
    var r = MO(MO({}, V3), t),
      n = G3(),
      i = K3(-1),
      o = L3(i, 2),
      a = o[0],
      u = o[1];
    H3(function() {
      if (n.current && n.current.getTotalLength) try {
        var A = n.current.getTotalLength();
        A && u(A)
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
    var S = oe("recharts-rectangle", d);
    return w ? js.createElement(ir, {
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
    }, function(A) {
      var h = A.width,
        g = A.height,
        P = A.x,
        C = A.y;
      return js.createElement(ir, {
        canBegin: a > 0,
        from: "0px ".concat(a === -1 ? 1 : a, "px"),
        to: "".concat(a, "px 0px"),
        attributeName: "strokeDasharray",
        begin: v,
        duration: m,
        isActive: x,
        easing: y
      }, js.createElement("path", Ms({}, ae(r, !0), {
        className: S,
        d: CO(P, C, h, g, p),
        ref: n
      })))
    }) : js.createElement("path", Ms({}, ae(r, !0), {
      className: S,
      d: CO(s, l, f, c, p)
    }))
  };
import * as kO from "./react-shim-eraudit.js";

function qp() {
  return qp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, qp.apply(this, arguments)
}
var fi = function(t) {
  var r = t.cx,
    n = t.cy,
    i = t.r,
    o = t.className,
    a = oe("recharts-dot", o);
  return r === +r && n === +n && i === +i ? kO.createElement("circle", qp({}, ae(t, !1), Rr(t), {
    className: a,
    cx: r,
    cy: n,
    r: i
  })) : null
};
import r$ from "./react-shim-eraudit.js";

function oa(e) {
  "@babel/helpers - typeof";
  return oa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, oa(e)
}
var X3 = ["x", "y", "top", "left", "width", "height", "className"];

function Wp() {
  return Wp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Wp.apply(this, arguments)
}

function DO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Y3(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? DO(Object(r), !0).forEach(function(n) {
      Z3(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : DO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Z3(e, t, r) {
  return t = J3(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function J3(e) {
  var t = Q3(e, "string");
  return oa(t) == "symbol" ? t : t + ""
}

function Q3(e, t) {
  if (oa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (oa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function e$(e, t) {
  if (e == null) return {};
  var r = t$(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function t$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var n$ = function(t, r, n, i, o, a) {
    return "M".concat(t, ",").concat(o, "v").concat(i, "M").concat(a, ",").concat(r, "h").concat(n)
  },
  NO = function(t) {
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
      m = e$(t, X3),
      v = Y3({
        x: n,
        y: o,
        top: u,
        left: l,
        width: c,
        height: d
      }, m);
    return !X(n) || !X(o) || !X(c) || !X(d) || !X(u) || !X(l) ? null : r$.createElement("path", Wp({}, ae(v, !0), {
      className: oe("recharts-cross", y),
      d: n$(n, o, c, d, u, l)
    }))
  };
var ZO = Q(De()),
  JO = Q(WO()),
  QO = Q(FO()),
  eS = Q(Mo());
import ln, {
  isValidElement as YO,
  cloneElement as L$
} from "./react-shim-eraudit.js";
import aa, {
  useEffect as T$,
  useRef as E$,
  useState as j$
} from "./react-shim-eraudit.js";

function ua(e) {
  "@babel/helpers - typeof";
  return ua = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ua(e)
}

function Cs() {
  return Cs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Cs.apply(this, arguments)
}

function b$(e, t) {
  return S$(e) || O$(e, t) || w$(e, t) || x$()
}

function x$() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function w$(e, t) {
  if (e) {
    if (typeof e == "string") return $O(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return $O(e, t)
  }
}

function $O(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function O$(e, t) {
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

function S$(e) {
  if (Array.isArray(e)) return e
}

function UO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function HO(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? UO(Object(r), !0).forEach(function(n) {
      A$(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : UO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function A$(e, t, r) {
  return t = _$(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function _$(e) {
  var t = P$(e, "string");
  return ua(t) == "symbol" ? t : t + ""
}

function P$(e, t) {
  if (ua(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ua(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var GO = function(t, r, n, i, o) {
    var a = n - i,
      u;
    return u = "M ".concat(t, ",").concat(r), u += "L ".concat(t + n, ",").concat(r), u += "L ".concat(t + n - a / 2, ",").concat(r + o), u += "L ".concat(t + n - a / 2 - i, ",").concat(r + o), u += "L ".concat(t, ",").concat(r, " Z"), u
  },
  M$ = {
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
  KO = function(t) {
    var r = HO(HO({}, M$), t),
      n = E$(),
      i = j$(-1),
      o = b$(i, 2),
      a = o[0],
      u = o[1];
    T$(function() {
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
    var w = oe("recharts-trapezoid", d);
    return x ? aa.createElement(ir, {
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
      var A = S.upperWidth,
        h = S.lowerWidth,
        g = S.height,
        P = S.x,
        C = S.y;
      return aa.createElement(ir, {
        canBegin: a > 0,
        from: "0px ".concat(a === -1 ? 1 : a, "px"),
        to: "".concat(a, "px 0px"),
        attributeName: "strokeDasharray",
        begin: v,
        duration: m,
        easing: y
      }, aa.createElement("path", Cs({}, ae(r, !0), {
        className: w,
        d: GO(P, C, A, h, g),
        ref: n
      })))
    }) : aa.createElement("g", null, aa.createElement("path", Cs({}, ae(r, !0), {
      className: w,
      d: GO(s, l, f, c, p)
    })))
  };
var C$ = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];

function sa(e) {
  "@babel/helpers - typeof";
  return sa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, sa(e)
}

function I$(e, t) {
  if (e == null) return {};
  var r = k$(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function k$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function VO(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Is(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? VO(Object(r), !0).forEach(function(n) {
      D$(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : VO(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function D$(e, t, r) {
  return t = N$(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function N$(e) {
  var t = R$(e, "string");
  return sa(t) == "symbol" ? t : t + ""
}

function R$(e, t) {
  if (sa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (sa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function B$(e, t) {
  return Is(Is({}, t), e)
}

function q$(e, t) {
  return e === "symbols"
}

function XO(e) {
  var t = e.shapeType,
    r = e.elementProps;
  switch (t) {
    case "rectangle":
      return ln.createElement(ci, r);
    case "trapezoid":
      return ln.createElement(KO, r);
    case "sector":
      return ln.createElement(xs, r);
    case "symbols":
      if (q$(t, r)) return ln.createElement(Xi, r);
      break;
    default:
      return null
  }
}

function W$(e) {
  return YO(e) ? e.props : e
}

function tS(e) {
  var t = e.option,
    r = e.shapeType,
    n = e.propTransformer,
    i = n === void 0 ? B$ : n,
    o = e.activeClassName,
    a = o === void 0 ? "recharts-active-shape" : o,
    u = e.isActive,
    s = I$(e, C$),
    l;
  if (YO(t)) l = L$(t, Is(Is({}, s), W$(t)));
  else if ((0, ZO.default)(t)) l = t(s);
  else if ((0, JO.default)(t) && !(0, QO.default)(t)) {
    var f = i(t, s);
    l = ln.createElement(XO, {
      shapeType: r,
      elementProps: f
    })
  } else {
    var c = s;
    l = ln.createElement(XO, {
      shapeType: r,
      elementProps: c
    })
  }
  return u ? ln.createElement(ge, {
    className: a
  }, l) : l
}

function la(e, t) {
  return t != null && "trapezoids" in e.props
}

function ca(e, t) {
  return t != null && "sectors" in e.props
}

function pi(e, t) {
  return t != null && "points" in e.props
}

function z$(e, t) {
  var r, n, i = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x,
    o = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return i && o
}

function F$(e, t) {
  var r = e.endAngle === t.endAngle,
    n = e.startAngle === t.startAngle;
  return r && n
}

function $$(e, t) {
  var r = e.x === t.x,
    n = e.y === t.y,
    i = e.z === t.z;
  return r && n && i
}

function U$(e, t) {
  var r;
  return la(e, t) ? r = z$ : ca(e, t) ? r = F$ : pi(e, t) && (r = $$), r
}

function H$(e, t) {
  var r;
  return la(e, t) ? r = "trapezoids" : ca(e, t) ? r = "sectors" : pi(e, t) && (r = "points"), r
}

function G$(e, t) {
  if (la(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload
  }
  if (ca(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload
  }
  return pi(e, t) ? t.payload : {}
}

function rS(e) {
  var t = e.activeTooltipItem,
    r = e.graphicalItem,
    n = e.itemData,
    i = H$(r, t),
    o = G$(r, t),
    a = n.filter(function(s, l) {
      var f = (0, eS.default)(o, s),
        c = r.props[i].filter(function(y) {
          var m = U$(r, t);
          return m(y, t)
        }),
        p = r.props[i].indexOf(c[c.length - 1]),
        d = l === p;
      return f && d
    }),
    u = n.indexOf(a[a.length - 1]);
  return u
}
import Ze, {
  PureComponent as m8,
  Children as h8
} from "./react-shim-eraudit.js";
var Gp = Q(De()),
  bS = Q($p());

function fa(e) {
  "@babel/helpers - typeof";
  return fa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, fa(e)
}

function cS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function fS(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cS(Object(r), !0).forEach(function(n) {
      pS(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function pS(e, t, r) {
  return t = i8(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function i8(e) {
  var t = o8(e, "string");
  return fa(t) == "symbol" ? t : t + ""
}

function o8(e, t) {
  if (fa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (fa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var a8 = ["Webkit", "Moz", "O", "ms"],
  dS = function(t, r) {
    if (!t) return null;
    var n = t.replace(/(\w)/, function(o) {
        return o.toUpperCase()
      }),
      i = a8.reduce(function(o, a) {
        return fS(fS({}, o), {}, pS({}, a + n, r))
      }, {});
    return i[t] = r, i
  };

function di(e) {
  "@babel/helpers - typeof";
  return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, di(e)
}

function ks() {
  return ks = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ks.apply(this, arguments)
}

function mS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Up(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mS(Object(r), !0).forEach(function(n) {
      gt(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function u8(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function hS(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, gS(n.key), n)
  }
}

function s8(e, t, r) {
  return t && hS(e.prototype, t), r && hS(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function l8(e, t, r) {
  return t = Ds(t), c8(e, vS() ? Reflect.construct(t, r || [], Ds(e).constructor) : t.apply(e, r))
}

function c8(e, t) {
  if (t && (di(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return f8(e)
}

function f8(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function vS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (vS = function() {
    return !!e
  })()
}

function Ds(e) {
  return Ds = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ds(e)
}

function p8(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Hp(e, t)
}

function Hp(e, t) {
  return Hp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Hp(e, t)
}

function gt(e, t, r) {
  return t = gS(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function gS(e) {
  var t = d8(e, "string");
  return di(t) == "symbol" ? t : t + ""
}

function d8(e, t) {
  if (di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var y8 = function(t) {
    var r = t.data,
      n = t.startIndex,
      i = t.endIndex,
      o = t.x,
      a = t.width,
      u = t.travellerWidth;
    if (!r || !r.length) return {};
    var s = r.length,
      l = wr().domain((0, bS.default)(0, s)).range([o, o + a - u]),
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
  yS = function(t) {
    return t.changedTouches && !!t.changedTouches.length
  },
  cn = function(e) {
    function t(r) {
      var n;
      return u8(this, t), n = l8(this, t, [r]), gt(n, "handleDrag", function(i) {
        n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(i) : n.state.isSlideMoving && n.handleSlideDrag(i)
      }), gt(n, "handleTouchMove", function(i) {
        i.changedTouches != null && i.changedTouches.length > 0 && n.handleDrag(i.changedTouches[0])
      }), gt(n, "handleDragEnd", function() {
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
      }), gt(n, "handleLeaveWrapper", function() {
        (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut))
      }), gt(n, "handleEnterSlideOrTraveller", function() {
        n.setState({
          isTextActive: !0
        })
      }), gt(n, "handleLeaveSlideOrTraveller", function() {
        n.setState({
          isTextActive: !1
        })
      }), gt(n, "handleSlideDragStart", function(i) {
        var o = yS(i) ? i.changedTouches[0] : i;
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
    return p8(t, e), s8(t, [{
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
          s = Ke(o[n], u, n);
        return (0, Gp.default)(a) ? a(s, n) : s
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
        var o = yS(i) ? i.changedTouches[0] : i;
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
          A = S.startIndex,
          h = S.endIndex,
          g = function() {
            var C = v.length - 1;
            return a === "startX" && (u > s ? A % m === 0 : h % m === 0) || u < s && h === C || a === "endX" && (u > s ? h % m === 0 : A % m === 0) || u > s && h === C
          };
        this.setState(gt(gt({}, a, l + w), "brushMoveStartX", n.pageX), function() {
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
            i === "startX" && d >= l || i === "endX" && d <= s || this.setState(gt({}, i, d), function() {
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
        return Ze.createElement("rect", {
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
          c = h8.only(l);
        return c ? Ze.cloneElement(c, {
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
          w = Up(Up({}, ae(this.props, !1)), {}, {
            x,
            y: l,
            width: f,
            height: c
          }),
          S = d || "Min value: ".concat((o = y[m]) === null || o === void 0 ? void 0 : o.name, ", Max value: ").concat((a = y[v]) === null || a === void 0 ? void 0 : a.name);
        return Ze.createElement(ge, {
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
        return Ze.createElement("rect", {
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
        return Ze.createElement(ge, {
          className: "recharts-brush-texts"
        }, Ze.createElement(Ur, ks({
          textAnchor: "end",
          verticalAnchor: "middle",
          x: Math.min(c, p) - d,
          y: a + u / 2
        }, y), this.getTextOfTick(i)), Ze.createElement(Ur, ks({
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
        var S = oe("recharts-brush", o),
          A = Ze.Children.count(a) === 1,
          h = dS("userSelect", "none");
        return Ze.createElement(ge, {
          className: S,
          onMouseLeave: this.handleLeaveWrapper,
          onTouchMove: this.handleTouchMove,
          style: h
        }, this.renderBackground(), A && this.renderPanorama(), this.renderSlide(d, y), this.renderTravellerLayer(d, "startX"), this.renderTravellerLayer(y, "endX"), (m || v || x || w || c) && this.renderText())
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
        return Ze.createElement(Ze.Fragment, null, Ze.createElement("rect", {
          x: i,
          y: o,
          width: a,
          height: u,
          fill: s,
          stroke: "none"
        }), Ze.createElement("line", {
          x1: i + 1,
          y1: l,
          x2: i + a - 1,
          y2: l,
          fill: "none",
          stroke: "#fff"
        }), Ze.createElement("line", {
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
        return Ze.isValidElement(n) ? o = Ze.cloneElement(n, i) : (0, Gp.default)(n) ? o = n(i) : o = t.renderDefaultTraveller(i), o
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
        if (o !== i.prevData || l !== i.prevUpdateId) return Up({
          prevData: o,
          prevTravellerWidth: s,
          prevUpdateId: l,
          prevX: u,
          prevWidth: a
        }, o && o.length ? y8({
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
  }(m8);
gt(cn, "displayName", "Brush");
gt(cn, "defaultProps", {
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
var _A = Q(De()),
  PA = Q(SS());
import gi from "./react-shim-eraudit.js";
var ct = function(t, r) {
  var n = t.alwaysShow,
    i = t.ifOverflow;
  return n && (i = "extendDomain"), i === r
};
var GS = Q(ES()),
  KS = Q(Kp());
import It, {
  PureComponent as n6
} from "./react-shim-eraudit.js";
var zS = Q(Mo()),
  FS = Q(Ot());
import H8 from "./react-shim-eraudit.js";
var q8 = ["x", "y"];

function da(e) {
  "@babel/helpers - typeof";
  return da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, da(e)
}

function Vp() {
  return Vp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Vp.apply(this, arguments)
}

function DS(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function pa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? DS(Object(r), !0).forEach(function(n) {
      W8(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : DS(Object(r)).forEach(function(n) {
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

function $8(e, t) {
  if (e == null) return {};
  var r = U8(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function U8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function G8(e, t) {
  var r = e.x,
    n = e.y,
    i = $8(e, q8),
    o = "".concat(r),
    a = parseInt(o, 10),
    u = "".concat(n),
    s = parseInt(u, 10),
    l = "".concat(t.height || i.height),
    f = parseInt(l, 10),
    c = "".concat(t.width || i.width),
    p = parseInt(c, 10);
  return pa(pa(pa(pa(pa({}, t), i), a ? {
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

function Xp(e) {
  return H8.createElement(tS, Vp({
    shapeType: "rectangle",
    propTransformer: G8,
    activeClassName: "recharts-active-bar"
  }, e))
}
var NS = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, i) {
    if (typeof t == "number") return t;
    var o = X(n) || Oh(n);
    return o ? t(n, i) : (o || Bt(!1), r)
  }
};
var K8 = ["value", "background"],
  BS;

function mi(e) {
  "@babel/helpers - typeof";
  return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, mi(e)
}

function V8(e, t) {
  if (e == null) return {};
  var r = X8(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function X8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Ns() {
  return Ns = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Ns.apply(this, arguments)
}

function RS(e, t) {
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
    t % 2 ? RS(Object(r), !0).forEach(function(n) {
      jr(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : RS(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Y8(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function LS(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, WS(n.key), n)
  }
}

function Z8(e, t, r) {
  return t && LS(e.prototype, t), r && LS(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function J8(e, t, r) {
  return t = Rs(t), Q8(e, qS() ? Reflect.construct(t, r || [], Rs(e).constructor) : t.apply(e, r))
}

function Q8(e, t) {
  if (t && (mi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return e6(e)
}

function e6(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function qS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (qS = function() {
    return !!e
  })()
}

function Rs(e) {
  return Rs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Rs(e)
}

function t6(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Yp(e, t)
}

function Yp(e, t) {
  return Yp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Yp(e, t)
}

function jr(e, t, r) {
  return t = WS(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function WS(e) {
  var t = r6(e, "string");
  return mi(t) == "symbol" ? t : t + ""
}

function r6(e, t) {
  if (mi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (mi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Wt = function(e) {
  function t() {
    var r;
    Y8(this, t);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = J8(this, t, [].concat(i)), jr(r, "state", {
      isAnimationFinished: !1
    }), jr(r, "id", Vt("recharts-bar-")), jr(r, "handleAnimationEnd", function() {
      var a = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), a && a()
    }), jr(r, "handleAnimationStart", function() {
      var a = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), a && a()
    }), r
  }
  return t6(t, e), Z8(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var i = this,
        o = this.props,
        a = o.shape,
        u = o.dataKey,
        s = o.activeIndex,
        l = o.activeBar,
        f = ae(this.props, !1);
      return n && n.map(function(c, p) {
        var d = p === s,
          y = d ? l : a,
          m = Le(Le(Le({}, f), c), {}, {
            isActive: d,
            option: y,
            index: p,
            dataKey: u,
            onAnimationStart: i.handleAnimationStart,
            onAnimationEnd: i.handleAnimationEnd
          });
        return It.createElement(ge, Ns({
          className: "recharts-bar-rectangle"
        }, Lr(i.props, c, p), {
          key: "rectangle-".concat(c?.x, "-").concat(c?.y, "-").concat(c?.value, "-").concat(p)
        }), It.createElement(Xp, m))
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
      return It.createElement(ir, {
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
              var S = pt(w.x, v.x),
                A = pt(w.y, v.y),
                h = pt(w.width, v.width),
                g = pt(w.height, v.height);
              return Le(Le({}, v), {}, {
                x: S(y),
                y: A(y),
                width: h(y),
                height: g(y)
              })
            }
            if (a === "horizontal") {
              var P = pt(0, v.height),
                C = P(y);
              return Le(Le({}, v), {}, {
                y: v.y + v.height - C,
                height: C
              })
            }
            var k = pt(0, v.width),
              B = k(y);
            return Le(Le({}, v), {}, {
              width: B
            })
          });
        return It.createElement(ge, null, n.renderRectanglesStatically(m))
      })
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props,
        i = n.data,
        o = n.isAnimationActive,
        a = this.state.prevData;
      return o && i && i.length && (!a || !(0, zS.default)(a, i)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(i)
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this,
        i = this.props,
        o = i.data,
        a = i.dataKey,
        u = i.activeIndex,
        s = ae(this.props.background, !1);
      return o.map(function(l, f) {
        var c = l.value,
          p = l.background,
          d = V8(l, K8);
        if (!p) return null;
        var y = Le(Le(Le(Le(Le({}, d), {}, {
          fill: "#eee"
        }, p), s), Lr(n.props, l, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: a,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return It.createElement(Xp, Ns({
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
        c = qe(f, Tr);
      if (!c) return null;
      var p = l === "vertical" ? a[0].height / 2 : a[0].width / 2,
        d = function(v, x) {
          var w = Array.isArray(v.value) ? v.value[1] : v.value;
          return {
            x: v.x,
            y: v.y,
            value: w,
            errorVal: Ke(v, x)
          }
        },
        y = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return It.createElement(ge, y, c.map(function(m) {
        return It.cloneElement(m, {
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
        x = oe("recharts-bar", a),
        w = u && u.allowDataOverflow,
        S = s && s.allowDataOverflow,
        A = w || S,
        h = (0, FS.default)(m) ? this.id : m;
      return It.createElement(ge, {
        className: x
      }, w || S ? It.createElement("defs", null, It.createElement("clipPath", {
        id: "clipPath-".concat(h)
      }, It.createElement("rect", {
        x: w ? l : l - c / 2,
        y: S ? f : f - p / 2,
        width: w ? c : c * 2,
        height: S ? p : p * 2
      }))) : null, It.createElement(ge, {
        className: "recharts-bar-rectangles",
        clipPath: A ? "url(#clipPath-".concat(h, ")") : null
      }, y ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(A, h), (!d || v) && nr.renderCallByParent(this.props, o))
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
}(n6);
BS = Wt;
jr(Wt, "displayName", "Bar");
jr(Wt, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !it.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
jr(Wt, "getComposedData", function(e) {
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
    d = x1(n, r);
  if (!d) return null;
  var y = t.layout,
    m = r.type.defaultProps,
    v = m !== void 0 ? Le(Le({}, m), r.props) : r.props,
    x = v.dataKey,
    w = v.children,
    S = v.minPointSize,
    A = y === "horizontal" ? a : o,
    h = l ? A.scale.domain() : null,
    g = A1({
      numericAxis: A
    }),
    P = qe(w, cf),
    C = c.map(function(k, B) {
      var z, N, K, U, W, b;
      l ? z = w1(l[f + B], h) : (z = Ke(k, x), Array.isArray(z) || (z = [g, z]));
      var O = NS(S, BS.defaultProps.minPointSize)(z[1], B);
      if (y === "horizontal") {
        var E, _ = [a.scale(z[0]), a.scale(z[1])],
          j = _[0],
          T = _[1];
        N = hp({
          axis: o,
          ticks: u,
          bandSize: i,
          offset: d.offset,
          entry: k,
          index: B
        }), K = (E = T ?? j) !== null && E !== void 0 ? E : void 0, U = d.size;
        var D = j - T;
        if (W = Number.isNaN(D) ? 0 : D, b = {
            x: N,
            y: a.y,
            width: U,
            height: a.height
          }, Math.abs(O) > 0 && Math.abs(W) < Math.abs(O)) {
          var R = Xe(W || O) * (Math.abs(O) - Math.abs(W));
          K -= R, W += R
        }
      } else {
        var V = [o.scale(z[0]), o.scale(z[1])],
          Z = V[0],
          Y = V[1];
        if (N = Z, K = hp({
            axis: a,
            ticks: s,
            bandSize: i,
            offset: d.offset,
            entry: k,
            index: B
          }), U = Y - Z, W = d.size, b = {
            x: o.x,
            y: K,
            width: o.width,
            height: W
          }, Math.abs(O) > 0 && Math.abs(U) < Math.abs(O)) {
          var te = Xe(U || O) * (Math.abs(O) - Math.abs(U));
          U += te
        }
      }
      return Le(Le(Le({}, k), {}, {
        x: N,
        y: K,
        width: U,
        height: W,
        value: l ? z : z[1],
        payload: k,
        background: b
      }, P && P[B] && P[B].props), {}, {
        tooltipPayload: [hs(r, k)],
        tooltipPosition: {
          x: N + U / 2,
          y: K + W / 2
        }
      })
    });
  return Le({
    data: C,
    layout: y
  }, p)
});

function ma(e) {
  "@babel/helpers - typeof";
  return ma = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ma(e)
}

function i6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function $S(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, HS(n.key), n)
  }
}

function o6(e, t, r) {
  return t && $S(e.prototype, t), r && $S(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function US(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function zt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? US(Object(r), !0).forEach(function(n) {
      Ls(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : US(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Ls(e, t, r) {
  return t = HS(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function HS(e) {
  var t = a6(e, "string");
  return ma(t) == "symbol" ? t : t + ""
}

function a6(e, t) {
  if (ma(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ma(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Bs = function(t, r, n, i, o) {
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
      p = !!Ye(l, Wt);
    return f.reduce(function(d, y) {
      var m = r[y],
        v = m.orientation,
        x = m.domain,
        w = m.padding,
        S = w === void 0 ? {} : w,
        A = m.mirror,
        h = m.reversed,
        g = "".concat(v).concat(A ? "Mirror" : ""),
        P, C, k, B, z;
      if (m.type === "number" && (m.padding === "gap" || m.padding === "no-gap")) {
        var N = x[1] - x[0],
          K = 1 / 0,
          U = m.categoricalDomain.sort(Ah);
        if (U.forEach(function(V, Z) {
            Z > 0 && (K = Math.min((V || 0) - (U[Z - 1] || 0), K))
          }), Number.isFinite(K)) {
          var W = K / N,
            b = m.layout === "vertical" ? n.height : n.width;
          if (m.padding === "gap" && (P = W * b / 2), m.padding === "no-gap") {
            var O = Nt(t.barCategoryGap, W * b),
              E = W * b / 2;
            P = E - O - (E - O) / b * O
          }
        }
      }
      i === "xAxis" ? C = [n.left + (S.left || 0) + (P || 0), n.left + n.width - (S.right || 0) - (P || 0)] : i === "yAxis" ? C = s === "horizontal" ? [n.top + n.height - (S.bottom || 0), n.top + (S.top || 0)] : [n.top + (S.top || 0) + (P || 0), n.top + n.height - (S.bottom || 0) - (P || 0)] : C = m.range, h && (C = [C[1], C[0]]);
      var _ = g1(m, o, p),
        j = _.scale,
        T = _.realScaleType;
      j.domain(x).range(C), b1(j);
      var D = S1(j, zt(zt({}, m), {}, {
        realScaleType: T
      }));
      i === "xAxis" ? (z = v === "top" && !A || v === "bottom" && A, k = n.left, B = c[g] - z * m.height) : i === "yAxis" && (z = v === "left" && !A || v === "right" && A, k = c[g] - z * m.width, B = n.top);
      var R = zt(zt(zt({}, m), D), {}, {
        realScaleType: T,
        x: k,
        y: B,
        scale: j,
        width: i === "xAxis" ? n.width : m.width,
        height: i === "yAxis" ? n.height : m.height
      });
      return R.bandSize = ai(R, D), !m.hide && i === "xAxis" ? c[g] += (z ? -1 : 1) * R.height : m.hide || (c[g] += (z ? -1 : 1) * R.width), zt(zt({}, d), {}, Ls({}, y, R))
    }, {})
  },
  Zp = function(t, r) {
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
  VS = function(t) {
    var r = t.x1,
      n = t.y1,
      i = t.x2,
      o = t.y2;
    return Zp({
      x: r,
      y: n
    }, {
      x: i,
      y: o
    })
  },
  XS = function() {
    function e(t) {
      i6(this, e), this.scale = t
    }
    return o6(e, [{
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
Ls(XS, "EPS", 1e-4);
var hi = function(t) {
  var r = Object.keys(t).reduce(function(n, i) {
    return zt(zt({}, n), {}, Ls({}, i, XS.create(t[i])))
  }, {});
  return zt(zt({}, r), {}, {
    apply: function(i) {
      var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        a = o.bandAware,
        u = o.position;
      return (0, GS.default)(i, function(s, l) {
        return r[l].apply(s, {
          bandAware: a,
          position: u
        })
      })
    },
    isInRange: function(i) {
      return (0, KS.default)(i, function(o, a) {
        return r[a].isInRange(o)
      })
    }
  })
};

function u6(e) {
  return (e % 180 + 180) % 180
}
var YS = function(t) {
  var r = t.width,
    n = t.height,
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    o = u6(i),
    a = o * Math.PI / 180,
    u = Math.atan(n / r),
    s = a > u && a < Math.PI - u ? n / Math.sin(a) : r / Math.cos(a);
  return Math.abs(s)
};
import fn, {
  createContext as pn,
  useContext as yr
} from "./react-shim-eraudit.js";
var uA = Q(iA()),
  sA = Q(Kp());
var oA = Q(wl()),
  aA = (0, oA.default)(function(e) {
    return {
      x: e.left,
      y: e.top,
      width: e.width,
      height: e.height
    }
  }, function(e) {
    return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("")
  });
var Jp = pn(void 0),
  Qp = pn(void 0),
  lA = pn(void 0),
  cA = pn({}),
  fA = pn(void 0),
  pA = pn(0),
  dA = pn(0),
  ed = function(t) {
    var r = t.state,
      n = r.xAxisMap,
      i = r.yAxisMap,
      o = r.offset,
      a = t.clipPathId,
      u = t.children,
      s = t.width,
      l = t.height,
      f = aA(o);
    return fn.createElement(Jp.Provider, {
      value: n
    }, fn.createElement(Qp.Provider, {
      value: i
    }, fn.createElement(cA.Provider, {
      value: o
    }, fn.createElement(lA.Provider, {
      value: f
    }, fn.createElement(fA.Provider, {
      value: a
    }, fn.createElement(pA.Provider, {
      value: l
    }, fn.createElement(dA.Provider, {
      value: s
    }, u)))))))
  },
  mA = function() {
    return yr(fA)
  };
var qs = function(t) {
    var r = yr(Jp);
    r == null && Bt(!1);
    var n = r[t];
    return n == null && Bt(!1), n
  },
  hA = function() {
    var t = yr(Jp);
    return Xt(t)
  };
var yA = function() {
    var t = yr(Qp),
      r = (0, uA.default)(t, function(n) {
        return (0, sA.default)(n.domain, Number.isFinite)
      });
    return r || Xt(t)
  },
  Ws = function(t) {
    var r = yr(Qp);
    r == null && Bt(!1);
    var n = r[t];
    return n == null && Bt(!1), n
  },
  vA = function() {
    var t = yr(lA);
    return t
  },
  gA = function() {
    return yr(cA)
  },
  yi = function() {
    return yr(dA)
  },
  vi = function() {
    return yr(pA)
  };

function bi(e) {
  "@babel/helpers - typeof";
  return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, bi(e)
}

function O6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function bA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, AA(n.key), n)
  }
}

function S6(e, t, r) {
  return t && bA(e.prototype, t), r && bA(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function A6(e, t, r) {
  return t = zs(t), _6(e, SA() ? Reflect.construct(t, r || [], zs(e).constructor) : t.apply(e, r))
}

function _6(e, t) {
  if (t && (bi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return P6(e)
}

function P6(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function SA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (SA = function() {
    return !!e
  })()
}

function zs(e) {
  return zs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, zs(e)
}

function T6(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && td(e, t)
}

function td(e, t) {
  return td = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, td(e, t)
}

function xA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function wA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xA(Object(r), !0).forEach(function(n) {
      nd(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function nd(e, t, r) {
  return t = AA(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function AA(e) {
  var t = E6(e, "string");
  return bi(t) == "symbol" ? t : t + ""
}

function E6(e, t) {
  if (bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function j6(e, t) {
  return k6(e) || I6(e, t) || C6(e, t) || M6()
}

function M6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function C6(e, t) {
  if (e) {
    if (typeof e == "string") return OA(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return OA(e, t)
  }
}

function OA(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function I6(e, t) {
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

function rd() {
  return rd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, rd.apply(this, arguments)
}
var D6 = function(t, r) {
    var n;
    return gi.isValidElement(t) ? n = gi.cloneElement(t, r) : (0, _A.default)(t) ? n = t(r) : n = gi.createElement("line", rd({}, r, {
      className: "recharts-reference-line-line"
    })), n
  },
  N6 = function(t, r, n, i, o, a, u, s, l) {
    var f = o.x,
      c = o.y,
      p = o.width,
      d = o.height;
    if (n) {
      var y = l.y,
        m = t.y.apply(y, {
          position: a
        });
      if (ct(l, "discard") && !t.y.isInRange(m)) return null;
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
      if (ct(l, "discard") && !t.x.isInRange(w)) return null;
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
      var A = l.segment,
        h = A.map(function(g) {
          return t.apply(g, {
            position: a
          })
        });
      return ct(l, "discard") && (0, PA.default)(h, function(g) {
        return !t.isInRange(g)
      }) ? null : h
    }
    return null
  };

function R6(e) {
  var t = e.x,
    r = e.y,
    n = e.segment,
    i = e.xAxisId,
    o = e.yAxisId,
    a = e.shape,
    u = e.className,
    s = e.alwaysShow,
    l = mA(),
    f = qs(i),
    c = Ws(o),
    p = vA();
  if (!l || !p) return null;
  nt(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var d = hi({
      x: f.scale,
      y: c.scale
    }),
    y = Ee(t),
    m = Ee(r),
    v = n && n.length === 2,
    x = N6(d, y, m, v, p, e.position, f.orientation, c.orientation, e);
  if (!x) return null;
  var w = j6(x, 2),
    S = w[0],
    A = S.x,
    h = S.y,
    g = w[1],
    P = g.x,
    C = g.y,
    k = ct(e, "hidden") ? "url(#".concat(l, ")") : void 0,
    B = wA(wA({
      clipPath: k
    }, ae(e, !0)), {}, {
      x1: A,
      y1: h,
      x2: P,
      y2: C
    });
  return gi.createElement(ge, {
    className: oe("recharts-reference-line", u)
  }, D6(a, B), Ne.renderCallByParent(e, VS({
    x1: A,
    y1: h,
    x2: P,
    y2: C
  })))
}
var Fs = function(e) {
  function t() {
    return O6(this, t), A6(this, t, arguments)
  }
  return T6(t, e), S6(t, [{
    key: "render",
    value: function() {
      return gi.createElement(R6, this.props)
    }
  }])
}(gi.Component);
nd(Fs, "displayName", "ReferenceLine");
nd(Fs, "defaultProps", {
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
var IA = Q(De());
import ha from "./react-shim-eraudit.js";

function id() {
  return id = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, id.apply(this, arguments)
}

function xi(e) {
  "@babel/helpers - typeof";
  return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, xi(e)
}

function TA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function EA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? TA(Object(r), !0).forEach(function(n) {
      Us(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : TA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function L6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function jA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, CA(n.key), n)
  }
}

function B6(e, t, r) {
  return t && jA(e.prototype, t), r && jA(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function q6(e, t, r) {
  return t = $s(t), W6(e, MA() ? Reflect.construct(t, r || [], $s(e).constructor) : t.apply(e, r))
}

function W6(e, t) {
  if (t && (xi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return z6(e)
}

function z6(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function MA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (MA = function() {
    return !!e
  })()
}

function $s(e) {
  return $s = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, $s(e)
}

function F6(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && od(e, t)
}

function od(e, t) {
  return od = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, od(e, t)
}

function Us(e, t, r) {
  return t = CA(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function CA(e) {
  var t = $6(e, "string");
  return xi(t) == "symbol" ? t : t + ""
}

function $6(e, t) {
  if (xi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (xi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var U6 = function(t) {
    var r = t.x,
      n = t.y,
      i = t.xAxis,
      o = t.yAxis,
      a = hi({
        x: i.scale,
        y: o.scale
      }),
      u = a.apply({
        x: r,
        y: n
      }, {
        bandAware: !0
      });
    return ct(t, "discard") && !a.isInRange(u) ? null : u
  },
  ya = function(e) {
    function t() {
      return L6(this, t), q6(this, t, arguments)
    }
    return F6(t, e), B6(t, [{
      key: "render",
      value: function() {
        var n = this.props,
          i = n.x,
          o = n.y,
          a = n.r,
          u = n.alwaysShow,
          s = n.clipPathId,
          l = Ee(i),
          f = Ee(o);
        if (nt(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !l || !f) return null;
        var c = U6(this.props);
        if (!c) return null;
        var p = c.x,
          d = c.y,
          y = this.props,
          m = y.shape,
          v = y.className,
          x = ct(this.props, "hidden") ? "url(#".concat(s, ")") : void 0,
          w = EA(EA({
            clipPath: x
          }, ae(this.props, !0)), {}, {
            cx: p,
            cy: d
          });
        return ha.createElement(ge, {
          className: oe("recharts-reference-dot", v)
        }, t.renderDot(m, w), Ne.renderCallByParent(this.props, {
          x: p - a,
          y: d - a,
          width: 2 * a,
          height: 2 * a
        }))
      }
    }])
  }(ha.Component);
Us(ya, "displayName", "ReferenceDot");
Us(ya, "defaultProps", {
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
Us(ya, "renderDot", function(e, t) {
  var r;
  return ha.isValidElement(e) ? r = ha.cloneElement(e, t) : (0, IA.default)(e) ? r = e(t) : r = ha.createElement(fi, id({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r
});
var BA = Q(De());
import va from "./react-shim-eraudit.js";

function ad() {
  return ad = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, ad.apply(this, arguments)
}

function wi(e) {
  "@babel/helpers - typeof";
  return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, wi(e)
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
      Gs(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : kA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function H6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function NA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, LA(n.key), n)
  }
}

function G6(e, t, r) {
  return t && NA(e.prototype, t), r && NA(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function K6(e, t, r) {
  return t = Hs(t), V6(e, RA() ? Reflect.construct(t, r || [], Hs(e).constructor) : t.apply(e, r))
}

function V6(e, t) {
  if (t && (wi(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return X6(e)
}

function X6(e) {
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

function Hs(e) {
  return Hs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Hs(e)
}

function Y6(e, t) {
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

function Gs(e, t, r) {
  return t = LA(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function LA(e) {
  var t = Z6(e, "string");
  return wi(t) == "symbol" ? t : t + ""
}

function Z6(e, t) {
  if (wi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var J6 = function(t, r, n, i, o) {
    var a = o.x1,
      u = o.x2,
      s = o.y1,
      l = o.y2,
      f = o.xAxis,
      c = o.yAxis;
    if (!f || !c) return null;
    var p = hi({
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
    return ct(o, "discard") && (!p.isInRange(d) || !p.isInRange(y)) ? null : Zp(d, y)
  },
  ga = function(e) {
    function t() {
      return H6(this, t), K6(this, t, arguments)
    }
    return Y6(t, e), G6(t, [{
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
        nt(l === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
        var c = Ee(i),
          p = Ee(o),
          d = Ee(a),
          y = Ee(u),
          m = this.props.shape;
        if (!c && !p && !d && !y && !m) return null;
        var v = J6(c, p, d, y, this.props);
        if (!v && !m) return null;
        var x = ct(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
        return va.createElement(ge, {
          className: oe("recharts-reference-area", s)
        }, t.renderRect(m, DA(DA({
          clipPath: x
        }, ae(this.props, !0)), v)), Ne.renderCallByParent(this.props, v))
      }
    }])
  }(va.Component);
Gs(ga, "displayName", "ReferenceArea");
Gs(ga, "defaultProps", {
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
Gs(ga, "renderRect", function(e, t) {
  var r;
  return va.isValidElement(e) ? r = va.cloneElement(e, t) : (0, BA.default)(e) ? r = e(t) : r = va.createElement(ci, ad({}, t, {
    className: "recharts-reference-area-rect"
  })), r
});
var Vs = Q(De()),
  cd = Q(Nr());
import Mr, {
  Component as hU
} from "./react-shim-eraudit.js";
var UA = Q(De());

function Ks(e, t, r) {
  if (t < 1) return [];
  if (t === 1 && r === void 0) return e;
  for (var n = [], i = 0; i < e.length; i += t)
    if (r === void 0 || r(e[i]) === !0) n.push(e[i]);
    else return;
  return n
}

function qA(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return YS(n, r)
}

function WA(e, t, r) {
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

function Oi(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i) return !1;
  var o = r();
  return e * (t - e * o / 2 - n) >= 0 && e * (t + e * o / 2 - i) <= 0
}

function zA(e, t) {
  return Ks(e, t + 1)
}

function FA(e, t, r, n, i) {
  for (var o = (n || []).slice(), a = t.start, u = t.end, s = 0, l = 1, f = a, c = function() {
      var y = n?.[s];
      if (y === void 0) return {
        v: Ks(n, l)
      };
      var m = s,
        v, x = function() {
          return v === void 0 && (v = r(y, m)), v
        },
        w = y.coordinate,
        S = s === 0 || Oi(e, w, x, f, u);
      S || (s = 0, f = a, l += 1), S && (f = w + e * (x() / 2 + i), s += l)
    }, p; l <= o.length;)
    if (p = c(), p) return p.v;
  return []
}

function ba(e) {
  "@babel/helpers - typeof";
  return ba = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ba(e)
}

function $A(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Je(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $A(Object(r), !0).forEach(function(n) {
      Q6(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $A(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Q6(e, t, r) {
  return t = eU(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function eU(e) {
  var t = tU(e, "string");
  return ba(t) == "symbol" ? t : t + ""
}

function tU(e, t) {
  if (ba(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ba(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function rU(e, t, r, n, i) {
  for (var o = (n || []).slice(), a = o.length, u = t.start, s = t.end, l = function(p) {
      var d = o[p],
        y, m = function() {
          return y === void 0 && (y = r(d, p)), y
        };
      if (p === a - 1) {
        var v = e * (d.coordinate + e * m() / 2 - s);
        o[p] = d = Je(Je({}, d), {}, {
          tickCoord: v > 0 ? d.coordinate - v * e : d.coordinate
        })
      } else o[p] = d = Je(Je({}, d), {}, {
        tickCoord: d.coordinate
      });
      var x = Oi(e, d.tickCoord, m, u, s);
      x && (s = d.tickCoord - e * (m() / 2 + i), o[p] = Je(Je({}, d), {}, {
        isShow: !0
      }))
    }, f = a - 1; f >= 0; f--) l(f);
  return o
}

function nU(e, t, r, n, i, o) {
  var a = (n || []).slice(),
    u = a.length,
    s = t.start,
    l = t.end;
  if (o) {
    var f = n[u - 1],
      c = r(f, u - 1),
      p = e * (f.coordinate + e * c / 2 - l);
    a[u - 1] = f = Je(Je({}, f), {}, {
      tickCoord: p > 0 ? f.coordinate - p * e : f.coordinate
    });
    var d = Oi(e, f.tickCoord, function() {
      return c
    }, s, l);
    d && (l = f.tickCoord - e * (c / 2 + i), a[u - 1] = Je(Je({}, f), {}, {
      isShow: !0
    }))
  }
  for (var y = o ? u - 1 : u, m = function(w) {
      var S = a[w],
        A, h = function() {
          return A === void 0 && (A = r(S, w)), A
        };
      if (w === 0) {
        var g = e * (S.coordinate - e * h() / 2 - s);
        a[w] = S = Je(Je({}, S), {}, {
          tickCoord: g < 0 ? S.coordinate - g * e : S.coordinate
        })
      } else a[w] = S = Je(Je({}, S), {}, {
        tickCoord: S.coordinate
      });
      var P = Oi(e, S.tickCoord, h, s, l);
      P && (s = S.tickCoord + e * (h() / 2 + i), a[w] = Je(Je({}, S), {}, {
        isShow: !0
      }))
    }, v = 0; v < y; v++) m(v);
  return a
}

function xa(e, t, r) {
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
  if (X(s) || it.isSsr) return zA(i, typeof s == "number" && X(s) ? s : 0);
  var p = [],
    d = u === "top" || u === "bottom" ? "width" : "height",
    y = f && d === "width" ? $r(f, {
      fontSize: t,
      letterSpacing: r
    }) : {
      width: 0,
      height: 0
    },
    m = function(S, A) {
      var h = (0, UA.default)(l) ? l(S.value, A) : S.value;
      return d === "width" ? qA($r(h, {
        fontSize: t,
        letterSpacing: r
      }), y, c) : $r(h, {
        fontSize: t,
        letterSpacing: r
      })[d]
    },
    v = i.length >= 2 ? Xe(i[1].coordinate - i[0].coordinate) : 1,
    x = WA(o, v, d);
  return s === "equidistantPreserveStart" ? FA(v, x, m, i, a) : (s === "preserveStart" || s === "preserveStartEnd" ? p = nU(v, x, m, i, a, s === "preserveStartEnd") : p = rU(v, x, m, i, a), p.filter(function(w) {
    return w.isShow
  }))
}
var iU = ["viewBox"],
  oU = ["viewBox"],
  aU = ["ticks"];

function Ai(e) {
  "@babel/helpers - typeof";
  return Ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ai(e)
}

function Si() {
  return Si = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Si.apply(this, arguments)
}

function HA(e, t) {
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
    t % 2 ? HA(Object(r), !0).forEach(function(n) {
      fd(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : HA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function sd(e, t) {
  if (e == null) return {};
  var r = uU(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function uU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function sU(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function GA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, VA(n.key), n)
  }
}

function lU(e, t, r) {
  return t && GA(e.prototype, t), r && GA(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function cU(e, t, r) {
  return t = Xs(t), fU(e, KA() ? Reflect.construct(t, r || [], Xs(e).constructor) : t.apply(e, r))
}

function fU(e, t) {
  if (t && (Ai(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return pU(e)
}

function pU(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function KA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (KA = function() {
    return !!e
  })()
}

function Xs(e) {
  return Xs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Xs(e)
}

function dU(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && ld(e, t)
}

function ld(e, t) {
  return ld = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, ld(e, t)
}

function fd(e, t, r) {
  return t = VA(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function VA(e) {
  var t = mU(e, "string");
  return Ai(t) == "symbol" ? t : t + ""
}

function mU(e, t) {
  if (Ai(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ai(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var vr = function(e) {
  function t(r) {
    var n;
    return sU(this, t), n = cU(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n
  }
  return dU(t, e), lU(t, [{
    key: "shouldComponentUpdate",
    value: function(n, i) {
      var o = n.viewBox,
        a = sd(n, iU),
        u = this.props,
        s = u.viewBox,
        l = sd(u, oU);
      return !sr(o, s) || !sr(a, l) || !sr(i, this.state)
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
        A = n.tickSize || f,
        h = X(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (l) {
        case "top":
          d = y = n.coordinate, v = a + +!c * s, m = v - S * A, w = m - S * p, x = h;
          break;
        case "left":
          m = v = n.coordinate, y = o + +!c * u, d = y - S * A, x = d - S * p, w = h;
          break;
        case "right":
          m = v = n.coordinate, y = o + +c * u, d = y + S * A, x = d + S * p, w = h;
          break;
        default:
          d = y = n.coordinate, v = a + +c * s, m = v + S * A, w = m + S * p, x = h;
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
        c = Fe(Fe(Fe({}, ae(this.props, !1)), ae(f, !1)), {}, {
          fill: "none"
        });
      if (s === "top" || s === "bottom") {
        var p = +(s === "top" && !l || s === "bottom" && l);
        c = Fe(Fe({}, c), {}, {
          x1: i,
          y1: o + p * u,
          x2: i + a,
          y2: o + p * u
        })
      } else {
        var d = +(s === "left" && !l || s === "right" && l);
        c = Fe(Fe({}, c), {}, {
          x1: i + d * a,
          y1: o,
          x2: i + d * a,
          y2: o + u
        })
      }
      return Mr.createElement("line", Si({}, c, {
        className: oe("recharts-cartesian-axis-line", (0, cd.default)(f, "className"))
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
        d = xa(Fe(Fe({}, this.props), {}, {
          ticks: n
        }), i, o),
        y = this.getTickTextAnchor(),
        m = this.getTickVerticalAnchor(),
        v = ae(this.props, !1),
        x = ae(f, !1),
        w = Fe(Fe({}, v), {}, {
          fill: "none"
        }, ae(s, !1)),
        S = d.map(function(A, h) {
          var g = a.getTickLineCoord(A),
            P = g.line,
            C = g.tick,
            k = Fe(Fe(Fe(Fe({
              textAnchor: y,
              verticalAnchor: m
            }, v), {}, {
              stroke: "none",
              fill: l
            }, x), C), {}, {
              index: h,
              payload: A,
              visibleTicksCount: d.length,
              tickFormatter: c
            });
          return Mr.createElement(ge, Si({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(A.value, "-").concat(A.coordinate, "-").concat(A.tickCoord)
          }, Lr(a.props, A, h)), s && Mr.createElement("line", Si({}, w, P, {
            className: oe("recharts-cartesian-axis-tick-line", (0, cd.default)(s, "className"))
          })), f && t.renderTickItem(f, k, "".concat((0, Vs.default)(c) ? c(A.value, h) : A.value).concat(p || "")))
        });
      return Mr.createElement("g", {
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
        d = sd(c, aU),
        y = p;
      return (0, Vs.default)(s) && (y = p && p.length > 0 ? s(this.props) : s(d)), a <= 0 || u <= 0 || !y || !y.length ? null : Mr.createElement(ge, {
        className: oe("recharts-cartesian-axis", l),
        ref: function(v) {
          n.layerReference = v
        }
      }, o && this.renderAxisLine(), this.renderTicks(y, this.state.fontSize, this.state.letterSpacing), Ne.renderCallByParent(this.props))
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, o) {
      var a, u = oe(i.className, "recharts-cartesian-axis-tick-value");
      return Mr.isValidElement(n) ? a = Mr.cloneElement(n, Fe(Fe({}, i), {}, {
        className: u
      })) : (0, Vs.default)(n) ? a = n(Fe(Fe({}, i), {}, {
        className: u
      })) : a = Mr.createElement(Ur, Si({}, i, {
        className: "recharts-cartesian-axis-tick-value"
      }), o), a
    }
  }])
}(hU);
fd(vr, "displayName", "CartesianAxis");
fd(vr, "defaultProps", {
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
var Ys = Q(De());
import et from "./react-shim-eraudit.js";
var yU = ["x1", "y1", "x2", "y2", "key"],
  vU = ["offset"];

function mn(e) {
  "@babel/helpers - typeof";
  return mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, mn(e)
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
      gU(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : XA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function gU(e, t, r) {
  return t = bU(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function bU(e) {
  var t = xU(e, "string");
  return mn(t) == "symbol" ? t : t + ""
}

function xU(e, t) {
  if (mn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (mn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function dn() {
  return dn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, dn.apply(this, arguments)
}

function YA(e, t) {
  if (e == null) return {};
  var r = wU(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function wU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}
var OU = function(t) {
  var r = t.fill;
  if (!r || r === "none") return null;
  var n = t.fillOpacity,
    i = t.x,
    o = t.y,
    a = t.width,
    u = t.height,
    s = t.ry;
  return et.createElement("rect", {
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

function ZA(e, t) {
  var r;
  if (et.isValidElement(e)) r = et.cloneElement(e, t);
  else if ((0, Ys.default)(e)) r = e(t);
  else {
    var n = t.x1,
      i = t.y1,
      o = t.x2,
      a = t.y2,
      u = t.key,
      s = YA(t, yU),
      l = ae(s, !1),
      f = l.offset,
      c = YA(l, vU);
    r = et.createElement("line", dn({}, c, {
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

function SU(e) {
  var t = e.x,
    r = e.width,
    n = e.horizontal,
    i = n === void 0 ? !0 : n,
    o = e.horizontalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = Qe(Qe({}, e), {}, {
      x1: t,
      y1: u,
      x2: t + r,
      y2: u,
      key: "line-".concat(s),
      index: s
    });
    return ZA(i, l)
  });
  return et.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, a)
}

function AU(e) {
  var t = e.y,
    r = e.height,
    n = e.vertical,
    i = n === void 0 ? !0 : n,
    o = e.verticalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = Qe(Qe({}, e), {}, {
      x1: u,
      y1: t,
      x2: u,
      y2: t + r,
      key: "line-".concat(s),
      index: s
    });
    return ZA(i, l)
  });
  return et.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, a)
}

function _U(e) {
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
    return et.createElement("rect", {
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
  return et.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, c)
}

function PU(e) {
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
    return et.createElement("rect", {
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
  return et.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, c)
}
var TU = function(t, r) {
    var n = t.xAxis,
      i = t.width,
      o = t.height,
      a = t.offset;
    return dp(xa(Qe(Qe(Qe({}, vr.defaultProps), n), {}, {
      ticks: vt(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.left, a.left + a.width, r)
  },
  EU = function(t, r) {
    var n = t.yAxis,
      i = t.width,
      o = t.height,
      a = t.offset;
    return dp(xa(Qe(Qe(Qe({}, vr.defaultProps), n), {}, {
      ticks: vt(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.top, a.top + a.height, r)
  },
  _i = {
    horizontal: !0,
    vertical: !0,
    horizontalPoints: [],
    verticalPoints: [],
    stroke: "#ccc",
    fill: "none",
    verticalFill: [],
    horizontalFill: []
  };

function wa(e) {
  var t, r, n, i, o, a, u = yi(),
    s = vi(),
    l = gA(),
    f = Qe(Qe({}, e), {}, {
      stroke: (t = e.stroke) !== null && t !== void 0 ? t : _i.stroke,
      fill: (r = e.fill) !== null && r !== void 0 ? r : _i.fill,
      horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : _i.horizontal,
      horizontalFill: (i = e.horizontalFill) !== null && i !== void 0 ? i : _i.horizontalFill,
      vertical: (o = e.vertical) !== null && o !== void 0 ? o : _i.vertical,
      verticalFill: (a = e.verticalFill) !== null && a !== void 0 ? a : _i.verticalFill,
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
    w = hA(),
    S = yA();
  if (!X(d) || d <= 0 || !X(y) || y <= 0 || !X(c) || c !== +c || !X(p) || p !== +p) return null;
  var A = f.verticalCoordinatesGenerator || TU,
    h = f.horizontalCoordinatesGenerator || EU,
    g = f.horizontalPoints,
    P = f.verticalPoints;
  if ((!g || !g.length) && (0, Ys.default)(h)) {
    var C = v && v.length,
      k = h({
        yAxis: S ? Qe(Qe({}, S), {}, {
          ticks: C ? v : S.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, C ? !0 : m);
    nt(Array.isArray(k), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(mn(k), "]")), Array.isArray(k) && (g = k)
  }
  if ((!P || !P.length) && (0, Ys.default)(A)) {
    var B = x && x.length,
      z = A({
        xAxis: w ? Qe(Qe({}, w), {}, {
          ticks: B ? x : w.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, B ? !0 : m);
    nt(Array.isArray(z), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(mn(z), "]")), Array.isArray(z) && (P = z)
  }
  return et.createElement("g", {
    className: "recharts-cartesian-grid"
  }, et.createElement(OU, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), et.createElement(SU, dn({}, f, {
    offset: l,
    horizontalPoints: g,
    xAxis: w,
    yAxis: S
  })), et.createElement(AU, dn({}, f, {
    offset: l,
    verticalPoints: P,
    xAxis: w,
    yAxis: S
  })), et.createElement(_U, dn({}, f, {
    horizontalPoints: g
  })), et.createElement(PU, dn({}, f, {
    verticalPoints: P
  })))
}
wa.displayName = "CartesianGrid";
import ft, {
  PureComponent as $U
} from "./react-shim-eraudit.js";
var n_ = Q(De()),
  Js = Q(Ot()),
  i_ = Q(Mo());
var jU = ["type", "layout", "connectNulls", "ref"],
  MU = ["key"];

function Ti(e) {
  "@babel/helpers - typeof";
  return Ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ti(e)
}

function JA(e, t) {
  if (e == null) return {};
  var r = CU(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function CU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function Oa() {
  return Oa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Oa.apply(this, arguments)
}

function QA(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? QA(Object(r), !0).forEach(function(n) {
      Ft(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : QA(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function Pi(e) {
  return NU(e) || DU(e) || kU(e) || IU()
}

function IU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function kU(e, t) {
  if (e) {
    if (typeof e == "string") return pd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return pd(e, t)
  }
}

function DU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function NU(e) {
  if (Array.isArray(e)) return pd(e)
}

function pd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function RU(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function e_(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, r_(n.key), n)
  }
}

function LU(e, t, r) {
  return t && e_(e.prototype, t), r && e_(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function BU(e, t, r) {
  return t = Zs(t), qU(e, t_() ? Reflect.construct(t, r || [], Zs(e).constructor) : t.apply(e, r))
}

function qU(e, t) {
  if (t && (Ti(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return WU(e)
}

function WU(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function t_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (t_ = function() {
    return !!e
  })()
}

function Zs(e) {
  return Zs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Zs(e)
}

function zU(e, t) {
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

function Ft(e, t, r) {
  return t = r_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function r_(e) {
  var t = FU(e, "string");
  return Ti(t) == "symbol" ? t : t + ""
}

function FU(e, t) {
  if (Ti(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var Cr = function(e) {
  function t() {
    var r;
    RU(this, t);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = BU(this, t, [].concat(i)), Ft(r, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), Ft(r, "generateSimpleStrokeDasharray", function(a, u) {
      return "".concat(u, "px ").concat(a - u, "px")
    }), Ft(r, "getStrokeDasharray", function(a, u, s) {
      var l = s.reduce(function(x, w) {
        return x + w
      });
      if (!l) return r.generateSimpleStrokeDasharray(u, a);
      for (var f = Math.floor(a / l), c = a % l, p = u - a, d = [], y = 0, m = 0; y < s.length; m += s[y], ++y)
        if (m + s[y] > c) {
          d = [].concat(Pi(s.slice(0, y)), [c - m]);
          break
        } var v = d.length % 2 === 0 ? [0, p] : [p];
      return [].concat(Pi(t.repeat(s, f)), Pi(d), v).map(function(x) {
        return "".concat(x, "px")
      }).join(", ")
    }), Ft(r, "id", Vt("recharts-line-")), Ft(r, "pathRef", function(a) {
      r.mainCurve = a
    }), Ft(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      }), r.props.onAnimationEnd && r.props.onAnimationEnd()
    }), Ft(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      }), r.props.onAnimationStart && r.props.onAnimationStart()
    }), r
  }
  return zU(t, e), LU(t, [{
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
        c = qe(f, Tr);
      if (!c) return null;
      var p = function(m, v) {
          return {
            x: m.x,
            y: m.y,
            value: m.value,
            errorVal: Ke(m.payload, v)
          }
        },
        d = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return ft.createElement(ge, d, c.map(function(y) {
        return ft.cloneElement(y, {
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
        c = ae(this.props, !1),
        p = ae(s, !0),
        d = l.map(function(m, v) {
          var x = bt(bt(bt({
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
      return ft.createElement(ge, Oa({
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
        p = JA(u, jU),
        d = bt(bt(bt({}, ae(p, !0)), {}, {
          fill: "none",
          className: "recharts-line-curve",
          clipPath: i ? "url(#clipPath-".concat(o, ")") : null,
          points: n
        }, a), {}, {
          type: s,
          layout: l,
          connectNulls: f
        });
      return ft.createElement(Jo, Oa({}, d, {
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
      return ft.createElement(ir, {
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
      }, function(A) {
        var h = A.t;
        if (w) {
          var g = w.length / u.length,
            P = u.map(function(N, K) {
              var U = Math.floor(K * g);
              if (w[U]) {
                var W = w[U],
                  b = pt(W.x, N.x),
                  O = pt(W.y, N.y);
                return bt(bt({}, N), {}, {
                  x: b(h),
                  y: O(h)
                })
              }
              if (y) {
                var E = pt(m * 2, N.x),
                  _ = pt(v / 2, N.y);
                return bt(bt({}, N), {}, {
                  x: E(h),
                  y: _(h)
                })
              }
              return bt(bt({}, N), {}, {
                x: N.x,
                y: N.y
              })
            });
          return o.renderCurveStatically(P, n, i)
        }
        var C = pt(0, S),
          k = C(h),
          B;
        if (s) {
          var z = "".concat(s).split(/[,\s]+/gim).map(function(N) {
            return parseFloat(N)
          });
          B = o.getStrokeDasharray(k, S, z)
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
      return u && a && a.length && (!l && f > 0 || !(0, i_.default)(l, a)) ? this.renderCurveWithAnimation(n, i) : this.renderCurveStatically(a, n, i)
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
        S = oe("recharts-line", s),
        A = l && l.allowDataOverflow,
        h = f && f.allowDataOverflow,
        g = A || h,
        P = (0, Js.default)(v) ? this.id : v,
        C = (n = ae(a, !1)) !== null && n !== void 0 ? n : {
          r: 3,
          strokeWidth: 2
        },
        k = C.r,
        B = k === void 0 ? 3 : k,
        z = C.strokeWidth,
        N = z === void 0 ? 2 : z,
        K = Nh(a) ? a : {},
        U = K.clipDot,
        W = U === void 0 ? !0 : U,
        b = B * 2 + N;
      return ft.createElement(ge, {
        className: S
      }, A || h ? ft.createElement("defs", null, ft.createElement("clipPath", {
        id: "clipPath-".concat(P)
      }, ft.createElement("rect", {
        x: A ? p : p - d / 2,
        y: h ? c : c - y / 2,
        width: A ? d : d * 2,
        height: h ? y : y * 2
      })), !W && ft.createElement("clipPath", {
        id: "clipPath-dots-".concat(P)
      }, ft.createElement("rect", {
        x: p - b / 2,
        y: c - b / 2,
        width: d + b,
        height: y + b
      }))) : null, !w && this.renderCurve(g, P), this.renderErrorBar(g, P), (w || a) && this.renderDots(g, W, P), (!m || x) && nr.renderCallByParent(this.props, u))
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
      for (var o = n.length % 2 !== 0 ? [].concat(Pi(n), [0]) : n, a = [], u = 0; u < i; ++u) a = [].concat(Pi(a), Pi(o));
      return a
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var o;
      if (ft.isValidElement(n)) o = ft.cloneElement(n, i);
      else if ((0, n_.default)(n)) o = n(i);
      else {
        var a = i.key,
          u = JA(i, MU),
          s = oe("recharts-line-dot", typeof n != "boolean" ? n.className : "");
        o = ft.createElement(fi, Oa({
          key: a
        }, u, {
          className: s
        }))
      }
      return o
    }
  }])
}($U);
Ft(Cr, "displayName", "Line");
Ft(Cr, "defaultProps", {
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
  isAnimationActive: !it.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
});
Ft(Cr, "getComposedData", function(e) {
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
      var y = Ke(p, a);
      return f === "horizontal" ? {
        x: mp({
          axis: r,
          ticks: i,
          bandSize: u,
          entry: p,
          index: d
        }),
        y: (0, Js.default)(y) ? null : n.scale(y),
        value: y,
        payload: p
      } : {
        x: (0, Js.default)(y) ? null : r.scale(y),
        y: mp({
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
  return bt({
    points: c,
    layout: f
  }, l)
});
import * as Sa from "./react-shim-eraudit.js";

function Ei(e) {
  "@babel/helpers - typeof";
  return Ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ei(e)
}

function UU(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function o_(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, s_(n.key), n)
  }
}

function HU(e, t, r) {
  return t && o_(e.prototype, t), r && o_(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function GU(e, t, r) {
  return t = Qs(t), KU(e, a_() ? Reflect.construct(t, r || [], Qs(e).constructor) : t.apply(e, r))
}

function KU(e, t) {
  if (t && (Ei(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return VU(e)
}

function VU(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function a_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (a_ = function() {
    return !!e
  })()
}

function Qs(e) {
  return Qs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Qs(e)
}

function XU(e, t) {
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

function u_(e, t, r) {
  return t = s_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function s_(e) {
  var t = YU(e, "string");
  return Ei(t) == "symbol" ? t : t + ""
}

function YU(e, t) {
  if (Ei(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function hd() {
  return hd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, hd.apply(this, arguments)
}

function ZU(e) {
  var t = e.xAxisId,
    r = yi(),
    n = vi(),
    i = qs(t);
  return i == null ? null : Sa.createElement(vr, hd({}, i, {
    className: oe("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
    viewBox: {
      x: 0,
      y: 0,
      width: r,
      height: n
    },
    ticksGenerator: function(a) {
      return vt(a, !0)
    }
  }))
}
var or = function(e) {
  function t() {
    return UU(this, t), GU(this, t, arguments)
  }
  return XU(t, e), HU(t, [{
    key: "render",
    value: function() {
      return Sa.createElement(ZU, this.props)
    }
  }])
}(Sa.Component);
u_(or, "displayName", "XAxis");
u_(or, "defaultProps", {
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
import * as Aa from "./react-shim-eraudit.js";

function ji(e) {
  "@babel/helpers - typeof";
  return ji = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ji(e)
}

function JU(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function l_(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, p_(n.key), n)
  }
}

function QU(e, t, r) {
  return t && l_(e.prototype, t), r && l_(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function e4(e, t, r) {
  return t = el(t), t4(e, c_() ? Reflect.construct(t, r || [], el(e).constructor) : t.apply(e, r))
}

function t4(e, t) {
  if (t && (ji(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return r4(e)
}

function r4(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function c_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (c_ = function() {
    return !!e
  })()
}

function el(e) {
  return el = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, el(e)
}

function n4(e, t) {
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

function f_(e, t, r) {
  return t = p_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function p_(e) {
  var t = i4(e, "string");
  return ji(t) == "symbol" ? t : t + ""
}

function i4(e, t) {
  if (ji(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ji(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function vd() {
  return vd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, vd.apply(this, arguments)
}
var o4 = function(t) {
    var r = t.yAxisId,
      n = yi(),
      i = vi(),
      o = Ws(r);
    return o == null ? null : Aa.createElement(vr, vd({}, o, {
      className: oe("recharts-".concat(o.axisType, " ").concat(o.axisType), o.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: i
      },
      ticksGenerator: function(u) {
        return vt(u, !0)
      }
    }))
  },
  ar = function(e) {
    function t() {
      return JU(this, t), e4(this, t, arguments)
    }
    return n4(t, e), QU(t, [{
      key: "render",
      value: function() {
        return Aa.createElement(o4, this.props)
      }
    }])
  }(Aa.Component);
f_(ar, "displayName", "YAxis");
f_(ar, "defaultProps", {
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
var Ci = Q(Ot()),
  Ut = Q(De()),
  ll = Q($p()),
  Ii = Q(Nr()),
  N_ = Q(yu()),
  R_ = Q(sf());
import kt, {
  Component as L4,
  cloneElement as $t,
  isValidElement as B4,
  forwardRef as q4
} from "./react-shim-eraudit.js";

function d_(e) {
  return l4(e) || s4(e) || u4(e) || a4()
}

function a4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function u4(e, t) {
  if (e) {
    if (typeof e == "string") return gd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return gd(e, t)
  }
}

function s4(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function l4(e) {
  if (Array.isArray(e)) return gd(e)
}

function gd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}
var tl = function(t, r, n, i, o) {
  var a = qe(t, Fs),
    u = qe(t, ya),
    s = [].concat(d_(a), d_(u)),
    l = qe(t, ga),
    f = "".concat(i, "Id"),
    c = i[0],
    p = r;
  if (s.length && (p = s.reduce(function(m, v) {
      if (v.props[f] === n && ct(v.props, "extendDomain") && X(v.props[c])) {
        var x = v.props[c];
        return [Math.min(m[0], x), Math.max(m[1], x)]
      }
      return m
    }, p)), l.length) {
    var d = "".concat(c, "1"),
      y = "".concat(c, "2");
    p = l.reduce(function(m, v) {
      if (v.props[f] === n && ct(v.props, "extendDomain") && X(v.props[d]) && X(v.props[y])) {
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
var y_ = Q(h_()),
  nl = new y_.default;
var il = "recharts.syncMouseEvents";

function Pa(e) {
  "@babel/helpers - typeof";
  return Pa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Pa(e)
}

function p4(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function v_(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, g_(n.key), n)
  }
}

function d4(e, t, r) {
  return t && v_(e.prototype, t), r && v_(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function xd(e, t, r) {
  return t = g_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function g_(e) {
  var t = m4(e, "string");
  return Pa(t) == "symbol" ? t : t + ""
}

function m4(e, t) {
  if (Pa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Pa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var b_ = function() {
  function e() {
    p4(this, e), xd(this, "activeIndex", 0), xd(this, "coordinateList", []), xd(this, "layout", "horizontal")
  }
  return d4(e, [{
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

function x_(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e?.[0],
      i = e?.[1];
    if (n && i && X(n) && X(i)) return !0
  }
  return !1
}
import {
  cloneElement as g4,
  createElement as b4,
  isValidElement as x4
} from "./react-shim-eraudit.js";

function w_(e, t, r, n) {
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

function ol(e) {
  var t = e.cx,
    r = e.cy,
    n = e.radius,
    i = e.startAngle,
    o = e.endAngle,
    a = ke(t, r, n, i),
    u = ke(t, r, n, o);
  return {
    points: [a, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: o
  }
}

function O_(e, t, r) {
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
        p = ke(u, s, l, c),
        d = ke(u, s, f, c);
      n = p.x, i = p.y, o = d.x, a = d.y
    } else return ol(t);
  return [{
    x: n,
    y: i
  }, {
    x: o,
    y: a
  }]
}

function Ta(e) {
  "@babel/helpers - typeof";
  return Ta = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, Ta(e)
}

function S_(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function al(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? S_(Object(r), !0).forEach(function(n) {
      h4(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : S_(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function h4(e, t, r) {
  return t = y4(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function y4(e) {
  var t = v4(e, "string");
  return Ta(t) == "symbol" ? t : t + ""
}

function v4(e, t) {
  if (Ta(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ta(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}

function A_(e) {
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
  var y, m = Jo;
  if (p === "ScatterChart") y = a, m = NO;
  else if (p === "BarChart") y = w_(c, a, s, f), m = ci;
  else if (c === "radial") {
    var v = ol(a),
      x = v.cx,
      w = v.cy,
      S = v.radius,
      A = v.startAngle,
      h = v.endAngle;
    y = {
      cx: x,
      cy: w,
      startAngle: A,
      endAngle: h,
      innerRadius: S,
      outerRadius: S
    }, m = xs
  } else y = {
    points: O_(c, a, s)
  }, m = Jo;
  var g = al(al(al(al({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), y), ae(d, !1)), {}, {
    payload: u,
    payloadIndex: l,
    className: oe("recharts-tooltip-cursor", d.className)
  });
  return x4(d) ? g4(d, g) : b4(m, g)
}
var w4 = ["item"],
  O4 = ["children", "className", "width", "height", "style", "compact", "title", "desc"];

function ki(e) {
  "@babel/helpers - typeof";
  return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  }, ki(e)
}

function Mi() {
  return Mi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
  }, Mi.apply(this, arguments)
}

function __(e, t) {
  return _4(e) || A4(e, t) || k_(e, t) || S4()
}

function S4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function A4(e, t) {
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

function _4(e) {
  if (Array.isArray(e)) return e
}

function P_(e, t) {
  if (e == null) return {};
  var r = P4(e, t),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
  }
  return r
}

function P4(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n]
    } return r
}

function T4(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function T_(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, D_(n.key), n)
  }
}

function E4(e, t, r) {
  return t && T_(e.prototype, t), r && T_(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e
}

function j4(e, t, r) {
  return t = sl(t), M4(e, I_() ? Reflect.construct(t, r || [], sl(e).constructor) : t.apply(e, r))
}

function M4(e, t) {
  if (t && (ki(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return C4(e)
}

function C4(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e
}

function I_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (I_ = function() {
    return !!e
  })()
}

function sl(e) {
  return sl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, sl(e)
}

function I4(e, t) {
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

function Di(e) {
  return N4(e) || D4(e) || k_(e) || k4()
}

function k4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function k_(e, t) {
  if (e) {
    if (typeof e == "string") return Od(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Od(e, t)
  }
}

function D4(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function N4(e) {
  if (Array.isArray(e)) return Od(e)
}

function Od(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n
}

function E_(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function $(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? E_(Object(r), !0).forEach(function(n) {
      ce(e, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : E_(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return e
}

function ce(e, t, r) {
  return t = D_(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}

function D_(e) {
  var t = R4(e, "string");
  return ki(t) == "symbol" ? t : t + ""
}

function R4(e, t) {
  if (ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ki(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (t === "string" ? String : Number)(e)
}
var W4 = {
    xAxis: ["bottom", "top"],
    yAxis: ["left", "right"]
  },
  z4 = {
    width: "100%",
    height: "100%"
  },
  L_ = {
    x: 0,
    y: 0
  };

function ul(e) {
  return e
}
var F4 = function(t, r) {
    return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius
  },
  $4 = function(t, r, n, i) {
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
        return $($($({}, i), ke(i.cx, i.cy, u, a)), {}, {
          angle: a,
          radius: u
        })
      }
      var s = o.coordinate,
        l = i.angle;
      return $($($({}, i), ke(i.cx, i.cy, s, l)), {}, {
        angle: l,
        radius: s
      })
    }
    return L_
  },
  cl = function(t, r) {
    var n = r.graphicalItems,
      i = r.dataStartIndex,
      o = r.dataEndIndex,
      a = (n ?? []).reduce(function(u, s) {
        var l = s.props.data;
        return l && l.length ? [].concat(Di(u), Di(l)) : u
      }, []);
    return a.length > 0 ? a : t && t.length && X(i) && X(o) ? t.slice(i, o + 1) : []
  };

function B_(e) {
  return e === "number" ? [0, "auto"] : void 0
}
var Sd = function(t, r, n, i) {
    var o = t.graphicalItems,
      a = t.tooltipAxis,
      u = cl(r, t);
    return n < 0 || !o || !o.length || n >= u.length ? null : o.reduce(function(s, l) {
      var f, c = (f = l.props.data) !== null && f !== void 0 ? f : r;
      c && t.dataStartIndex + t.dataEndIndex !== 0 && t.dataEndIndex - t.dataStartIndex >= n && (c = c.slice(t.dataStartIndex, t.dataEndIndex + 1));
      var p;
      if (a.dataKey && !a.allowDuplicatedCategory) {
        var d = c === void 0 ? u : c;
        p = xn(d, a.dataKey, i)
      } else p = c && c[n] || u[n];
      return p ? [].concat(Di(s), [hs(l, p)]) : s
    }, [])
  },
  j_ = function(t, r, n, i) {
    var o = i || {
        x: t.chartX,
        y: t.chartY
      },
      a = F4(o, n),
      u = t.orderedTooltipTicks,
      s = t.tooltipAxis,
      l = t.tooltipTicks,
      f = p1(a, u, l, s);
    if (f >= 0 && l) {
      var c = l[f] && l[f].value,
        p = Sd(t, r, f, c),
        d = $4(n, u, f, o);
      return {
        activeTooltipIndex: f,
        activeLabel: c,
        activePayload: p,
        activeCoordinate: d
      }
    }
    return null
  },
  U4 = function(t, r) {
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
      d = pp(f, o);
    return n.reduce(function(y, m) {
      var v, x = m.type.defaultProps !== void 0 ? $($({}, m.type.defaultProps), m.props) : m.props,
        w = x.type,
        S = x.dataKey,
        A = x.allowDataOverflow,
        h = x.allowDuplicatedCategory,
        g = x.scale,
        P = x.ticks,
        C = x.includeHidden,
        k = x[a];
      if (y[k]) return y;
      var B = cl(t.data, {
          graphicalItems: i.filter(function(D) {
            var R, V = a in D.props ? D.props[a] : (R = D.type.defaultProps) === null || R === void 0 ? void 0 : R[a];
            return V === k
          }),
          dataStartIndex: s,
          dataEndIndex: l
        }),
        z = B.length,
        N, K, U;
      x_(x.domain, A, w) && (N = ms(x.domain, null, A), d && (w === "number" || g !== "auto") && (U = oi(B, S, "category")));
      var W = B_(w);
      if (!N || N.length === 0) {
        var b, O = (b = x.domain) !== null && b !== void 0 ? b : W;
        if (S) {
          if (N = oi(B, S, w), w === "category" && d) {
            var E = Sh(N);
            h && E ? (K = N, N = (0, ll.default)(0, z)) : h || (N = vp(O, N, m).reduce(function(D, R) {
              return D.indexOf(R) >= 0 ? D : [].concat(Di(D), [R])
            }, []))
          } else if (w === "category") h ? N = N.filter(function(D) {
            return D !== "" && !(0, Ci.default)(D)
          }) : N = vp(O, N, m).reduce(function(D, R) {
            return D.indexOf(R) >= 0 || R === "" || (0, Ci.default)(R) ? D : [].concat(Di(D), [R])
          }, []);
          else if (w === "number") {
            var _ = v1(B, i.filter(function(D) {
              var R, V, Z = a in D.props ? D.props[a] : (R = D.type.defaultProps) === null || R === void 0 ? void 0 : R[a],
                Y = "hide" in D.props ? D.props.hide : (V = D.type.defaultProps) === null || V === void 0 ? void 0 : V.hide;
              return Z === k && (C || !Y)
            }), S, o, f);
            _ && (N = _)
          }
          d && (w === "number" || g !== "auto") && (U = oi(B, S, "category"))
        } else d ? N = (0, ll.default)(0, z) : u && u[k] && u[k].hasStack && w === "number" ? N = p === "expand" ? [0, 1] : yp(u[k].stackGroups, s, l) : N = fp(B, i.filter(function(D) {
          var R = a in D.props ? D.props[a] : D.type.defaultProps[a],
            V = "hide" in D.props ? D.props.hide : D.type.defaultProps.hide;
          return R === k && (C || !V)
        }), w, f, !0);
        if (w === "number") N = tl(c, N, k, o, P), O && (N = ms(O, N, A));
        else if (w === "category" && O) {
          var j = O,
            T = N.every(function(D) {
              return j.indexOf(D) >= 0
            });
          T && (N = j)
        }
      }
      return $($({}, y), {}, ce({}, k, $($({}, x), {}, {
        axisType: o,
        domain: N,
        categoricalDomain: U,
        duplicateDomain: K,
        originalDomain: (v = x.domain) !== null && v !== void 0 ? v : W,
        isCategorical: d,
        layout: f
      })))
    }, {})
  },
  H4 = function(t, r) {
    var n = r.graphicalItems,
      i = r.Axis,
      o = r.axisType,
      a = r.axisIdKey,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = t.layout,
      c = t.children,
      p = cl(t.data, {
        graphicalItems: n,
        dataStartIndex: s,
        dataEndIndex: l
      }),
      d = p.length,
      y = pp(f, o),
      m = -1;
    return n.reduce(function(v, x) {
      var w = x.type.defaultProps !== void 0 ? $($({}, x.type.defaultProps), x.props) : x.props,
        S = w[a],
        A = B_("number");
      if (!v[S]) {
        m++;
        var h;
        return y ? h = (0, ll.default)(0, d) : u && u[S] && u[S].hasStack ? (h = yp(u[S].stackGroups, s, l), h = tl(c, h, S, o)) : (h = ms(A, fp(p, n.filter(function(g) {
          var P, C, k = a in g.props ? g.props[a] : (P = g.type.defaultProps) === null || P === void 0 ? void 0 : P[a],
            B = "hide" in g.props ? g.props.hide : (C = g.type.defaultProps) === null || C === void 0 ? void 0 : C.hide;
          return k === S && !B
        }), "number", f), i.defaultProps.allowDataOverflow), h = tl(c, h, S, o)), $($({}, v), {}, ce({}, S, $($({
          axisType: o
        }, i.defaultProps), {}, {
          hide: !0,
          orientation: (0, Ii.default)(W4, "".concat(o, ".").concat(m % 2), null),
          domain: h,
          originalDomain: A,
          isCategorical: y,
          layout: f
        })))
      }
      return v
    }, {})
  },
  G4 = function(t, r) {
    var n = r.axisType,
      i = n === void 0 ? "xAxis" : n,
      o = r.AxisComp,
      a = r.graphicalItems,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = t.children,
      c = "".concat(i, "Id"),
      p = qe(f, o),
      d = {};
    return p && p.length ? d = U4(t, {
      axes: p,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    }) : a && a.length && (d = H4(t, {
      Axis: o,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    })), d
  },
  K4 = function(t) {
    var r = Xt(t),
      n = vt(r, !1, !0);
    return {
      tooltipTicks: n,
      orderedTooltipTicks: (0, N_.default)(n, function(i) {
        return i.coordinate
      }),
      tooltipAxis: r,
      tooltipAxisBandSize: ai(r, n)
    }
  },
  M_ = function(t) {
    var r = t.children,
      n = t.defaultShowTooltip,
      i = Ye(r, cn),
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
  V4 = function(t) {
    return !t || !t.length ? !1 : t.some(function(r) {
      var n = At(r && r.type);
      return n && n.indexOf("Bar") >= 0
    })
  },
  C_ = function(t) {
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
  X4 = function(t, r) {
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
      d = Ye(c, cn),
      y = Ye(c, jt),
      m = Object.keys(s).reduce(function(h, g) {
        var P = s[g],
          C = P.orientation;
        return !P.mirror && !P.hide ? $($({}, h), {}, ce({}, C, h[C] + P.width)) : h
      }, {
        left: p.left || 0,
        right: p.right || 0
      }),
      v = Object.keys(a).reduce(function(h, g) {
        var P = a[g],
          C = P.orientation;
        return !P.mirror && !P.hide ? $($({}, h), {}, ce({}, C, (0, Ii.default)(h, "".concat(C)) + P.height)) : h
      }, {
        top: p.top || 0,
        bottom: p.bottom || 0
      }),
      x = $($({}, v), m),
      w = x.bottom;
    d && (x.bottom += d.props.height || cn.defaultProps.height), y && r && (x = h1(x, i, n, r));
    var S = l - x.left - x.right,
      A = f - x.top - x.bottom;
    return $($({
      brushBottom: w
    }, x), {}, {
      width: Math.max(S, 0),
      height: Math.max(A, 0)
    })
  },
  Y4 = function(t, r) {
    if (r === "xAxis") return t[r].width;
    if (r === "yAxis") return t[r].height
  },
  fl = function(t) {
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
          A = w.stackGroups,
          h = w.offset,
          g = w.updateId,
          P = w.dataStartIndex,
          C = w.dataEndIndex,
          k = x.barSize,
          B = x.layout,
          z = x.barGap,
          N = x.barCategoryGap,
          K = x.maxBarSize,
          U = C_(B),
          W = U.numericAxisName,
          b = U.cateAxisName,
          O = V4(S),
          E = [];
        return S.forEach(function(_, j) {
          var T = cl(x.data, {
              graphicalItems: [_],
              dataStartIndex: P,
              dataEndIndex: C
            }),
            D = _.type.defaultProps !== void 0 ? $($({}, _.type.defaultProps), _.props) : _.props,
            R = D.dataKey,
            V = D.maxBarSize,
            Z = D["".concat(W, "Id")],
            Y = D["".concat(b, "Id")],
            te = {},
            he = s.reduce(function(J, ne) {
              var me, se, pe = w["".concat(ne.axisType, "Map")],
                fe = D["".concat(ne.axisType, "Id")];
              pe && pe[fe] || ne.axisType === "zAxis" || Bt(!1);
              var le = pe[fe];
              return $($({}, J), {}, ce(ce({}, ne.axisType, le), "".concat(ne.axisType, "Ticks"), vt(le)))
            }, te),
            q = he[b],
            ue = he["".concat(b, "Ticks")],
            ee = A && A[Z] && A[Z].hasStack && _1(_, A[Z].stackGroups),
            H = At(_.type).indexOf("Bar") >= 0,
            Se = ai(q, ue),
            G = [],
            Ae = O && d1({
              barSize: k,
              stackGroups: A,
              totalSize: Y4(he, b)
            });
          if (H) {
            var Pe, Ce, L = (0, Ci.default)(V) ? K : V,
              re = (Pe = (Ce = ai(q, ue, !0)) !== null && Ce !== void 0 ? Ce : L) !== null && Pe !== void 0 ? Pe : 0;
            G = m1({
              barGap: z,
              barCategoryGap: N,
              bandSize: re !== Se ? re : Se,
              sizeList: Ae[Y],
              maxBarSize: L
            }), re !== Se && (G = G.map(function(J) {
              return $($({}, J), {}, {
                position: $($({}, J.position), {}, {
                  offset: J.position.offset - re / 2
                })
              })
            }))
          }
          var ie = _ && _.type && _.type.getComposedData;
          ie && E.push({
            props: $($({}, ie($($({}, he), {}, {
              displayedData: T,
              props: x,
              dataKey: R,
              item: _,
              bandSize: Se,
              barPosition: G,
              offset: h,
              stackedData: ee,
              layout: B,
              dataStartIndex: P,
              dataEndIndex: C
            }))), {}, ce(ce(ce({
              key: _.key || "item-".concat(j)
            }, W, he[W]), b, he[b]), "animationId", g)),
            childIndex: Lh(_, x.children),
            item: _
          })
        }), E
      },
      d = function(x, w) {
        var S = x.props,
          A = x.dataStartIndex,
          h = x.dataEndIndex,
          g = x.updateId;
        if (!Rl({
            props: S
          })) return null;
        var P = S.children,
          C = S.layout,
          k = S.stackOffset,
          B = S.data,
          z = S.reverseStackOrder,
          N = C_(C),
          K = N.numericAxisName,
          U = N.cateAxisName,
          W = qe(P, n),
          b = O1(B, W, "".concat(K, "Id"), "".concat(U, "Id"), k, z),
          O = s.reduce(function(D, R) {
            var V = "".concat(R.axisType, "Map");
            return $($({}, D), {}, ce({}, V, G4(S, $($({}, R), {}, {
              graphicalItems: W,
              stackGroups: R.axisType === K && b,
              dataStartIndex: A,
              dataEndIndex: h
            }))))
          }, {}),
          E = X4($($({}, O), {}, {
            props: S,
            graphicalItems: W
          }), w?.legendBBox);
        Object.keys(O).forEach(function(D) {
          O[D] = f(S, O[D], E, D.replace("Map", ""), r)
        });
        var _ = O["".concat(U, "Map")],
          j = K4(_),
          T = p(S, $($({}, O), {}, {
            dataStartIndex: A,
            dataEndIndex: h,
            updateId: g,
            graphicalItems: W,
            stackGroups: b,
            offset: E
          }));
        return $($({
          formattedGraphicalItems: T,
          graphicalItems: W,
          offset: E,
          stackGroups: b
        }, j), O)
      },
      y = function(v) {
        function x(w) {
          var S, A, h;
          return T4(this, x), h = j4(this, x, [w]), ce(h, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), ce(h, "accessibilityManager", new b_), ce(h, "handleLegendBBoxUpdate", function(g) {
            if (g) {
              var P = h.state,
                C = P.dataStartIndex,
                k = P.dataEndIndex,
                B = P.updateId;
              h.setState($({
                legendBBox: g
              }, d({
                props: h.props,
                dataStartIndex: C,
                dataEndIndex: k,
                updateId: B
              }, $($({}, h.state), {}, {
                legendBBox: g
              }))))
            }
          }), ce(h, "handleReceiveSyncEvent", function(g, P, C) {
            if (h.props.syncId === g) {
              if (C === h.eventEmitterSymbol && typeof h.props.syncMethod != "function") return;
              h.applySyncEvent(P)
            }
          }), ce(h, "handleBrushChange", function(g) {
            var P = g.startIndex,
              C = g.endIndex;
            if (P !== h.state.dataStartIndex || C !== h.state.dataEndIndex) {
              var k = h.state.updateId;
              h.setState(function() {
                return $({
                  dataStartIndex: P,
                  dataEndIndex: C
                }, d({
                  props: h.props,
                  dataStartIndex: P,
                  dataEndIndex: C,
                  updateId: k
                }, h.state))
              }), h.triggerSyncEvent({
                dataStartIndex: P,
                dataEndIndex: C
              })
            }
          }), ce(h, "handleMouseEnter", function(g) {
            var P = h.getMouseInfo(g);
            if (P) {
              var C = $($({}, P), {}, {
                isTooltipActive: !0
              });
              h.setState(C), h.triggerSyncEvent(C);
              var k = h.props.onMouseEnter;
              (0, Ut.default)(k) && k(C, g)
            }
          }), ce(h, "triggeredAfterMouseMove", function(g) {
            var P = h.getMouseInfo(g),
              C = P ? $($({}, P), {}, {
                isTooltipActive: !0
              }) : {
                isTooltipActive: !1
              };
            h.setState(C), h.triggerSyncEvent(C);
            var k = h.props.onMouseMove;
            (0, Ut.default)(k) && k(C, g)
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
            var P = {
              isTooltipActive: !1
            };
            h.setState(P), h.triggerSyncEvent(P);
            var C = h.props.onMouseLeave;
            (0, Ut.default)(C) && C(P, g)
          }), ce(h, "handleOuterEvent", function(g) {
            var P = Rh(g),
              C = (0, Ii.default)(h.props, "".concat(P));
            if (P && (0, Ut.default)(C)) {
              var k, B;
              /.*touch.*/i.test(P) ? B = h.getMouseInfo(g.changedTouches[0]) : B = h.getMouseInfo(g), C((k = B) !== null && k !== void 0 ? k : {}, g)
            }
          }), ce(h, "handleClick", function(g) {
            var P = h.getMouseInfo(g);
            if (P) {
              var C = $($({}, P), {}, {
                isTooltipActive: !0
              });
              h.setState(C), h.triggerSyncEvent(C);
              var k = h.props.onClick;
              (0, Ut.default)(k) && k(C, g)
            }
          }), ce(h, "handleMouseDown", function(g) {
            var P = h.props.onMouseDown;
            if ((0, Ut.default)(P)) {
              var C = h.getMouseInfo(g);
              P(C, g)
            }
          }), ce(h, "handleMouseUp", function(g) {
            var P = h.props.onMouseUp;
            if ((0, Ut.default)(P)) {
              var C = h.getMouseInfo(g);
              P(C, g)
            }
          }), ce(h, "handleTouchMove", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.throttleTriggeredAfterMouseMove(g.changedTouches[0])
          }), ce(h, "handleTouchStart", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.handleMouseDown(g.changedTouches[0])
          }), ce(h, "handleTouchEnd", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.handleMouseUp(g.changedTouches[0])
          }), ce(h, "handleDoubleClick", function(g) {
            var P = h.props.onDoubleClick;
            if ((0, Ut.default)(P)) {
              var C = h.getMouseInfo(g);
              P(C, g)
            }
          }), ce(h, "handleContextMenu", function(g) {
            var P = h.props.onContextMenu;
            if ((0, Ut.default)(P)) {
              var C = h.getMouseInfo(g);
              P(C, g)
            }
          }), ce(h, "triggerSyncEvent", function(g) {
            h.props.syncId !== void 0 && nl.emit(il, h.props.syncId, g, h.eventEmitterSymbol)
          }), ce(h, "applySyncEvent", function(g) {
            var P = h.props,
              C = P.layout,
              k = P.syncMethod,
              B = h.state.updateId,
              z = g.dataStartIndex,
              N = g.dataEndIndex;
            if (g.dataStartIndex !== void 0 || g.dataEndIndex !== void 0) h.setState($({
              dataStartIndex: z,
              dataEndIndex: N
            }, d({
              props: h.props,
              dataStartIndex: z,
              dataEndIndex: N,
              updateId: B
            }, h.state)));
            else if (g.activeTooltipIndex !== void 0) {
              var K = g.chartX,
                U = g.chartY,
                W = g.activeTooltipIndex,
                b = h.state,
                O = b.offset,
                E = b.tooltipTicks;
              if (!O) return;
              if (typeof k == "function") W = k(E, g);
              else if (k === "value") {
                W = -1;
                for (var _ = 0; _ < E.length; _++)
                  if (E[_].value === g.activeLabel) {
                    W = _;
                    break
                  }
              }
              var j = $($({}, O), {}, {
                  x: O.left,
                  y: O.top
                }),
                T = Math.min(K, j.x + j.width),
                D = Math.min(U, j.y + j.height),
                R = E[W] && E[W].value,
                V = Sd(h.state, h.props.data, W),
                Z = E[W] ? {
                  x: C === "horizontal" ? E[W].coordinate : T,
                  y: C === "horizontal" ? D : E[W].coordinate
                } : L_;
              h.setState($($({}, g), {}, {
                activeLabel: R,
                activeCoordinate: Z,
                activePayload: V,
                activeTooltipIndex: W
              }))
            } else h.setState(g)
          }), ce(h, "renderCursor", function(g) {
            var P, C = h.state,
              k = C.isTooltipActive,
              B = C.activeCoordinate,
              z = C.activePayload,
              N = C.offset,
              K = C.activeTooltipIndex,
              U = C.tooltipAxisBandSize,
              W = h.getTooltipEventType(),
              b = (P = g.props.active) !== null && P !== void 0 ? P : k,
              O = h.props.layout,
              E = g.key || "_recharts-cursor";
            return kt.createElement(A_, {
              key: E,
              activeCoordinate: B,
              activePayload: z,
              activeTooltipIndex: K,
              chartName: r,
              element: g,
              isActive: b,
              layout: O,
              offset: N,
              tooltipAxisBandSize: U,
              tooltipEventType: W
            })
          }), ce(h, "renderPolarAxis", function(g, P, C) {
            var k = (0, Ii.default)(g, "type.axisType"),
              B = (0, Ii.default)(h.state, "".concat(k, "Map")),
              z = g.type.defaultProps,
              N = z !== void 0 ? $($({}, z), g.props) : g.props,
              K = B && B[N["".concat(k, "Id")]];
            return $t(g, $($({}, K), {}, {
              className: oe(k, K.className),
              key: g.key || "".concat(P, "-").concat(C),
              ticks: vt(K, !0)
            }))
          }), ce(h, "renderPolarGrid", function(g) {
            var P = g.props,
              C = P.radialLines,
              k = P.polarAngles,
              B = P.polarRadius,
              z = h.state,
              N = z.radiusAxisMap,
              K = z.angleAxisMap,
              U = Xt(N),
              W = Xt(K),
              b = W.cx,
              O = W.cy,
              E = W.innerRadius,
              _ = W.outerRadius;
            return $t(g, {
              polarAngles: Array.isArray(k) ? k : vt(W, !0).map(function(j) {
                return j.coordinate
              }),
              polarRadius: Array.isArray(B) ? B : vt(U, !0).map(function(j) {
                return j.coordinate
              }),
              cx: b,
              cy: O,
              innerRadius: E,
              outerRadius: _,
              key: g.key || "polar-grid",
              radialLines: C
            })
          }), ce(h, "renderLegend", function() {
            var g = h.state.formattedGraphicalItems,
              P = h.props,
              C = P.children,
              k = P.width,
              B = P.height,
              z = h.props.margin || {},
              N = k - (z.left || 0) - (z.right || 0),
              K = ps({
                children: C,
                formattedGraphicalItems: g,
                legendWidth: N,
                legendContent: l
              });
            if (!K) return null;
            var U = K.item,
              W = P_(K, w4);
            return $t(U, $($({}, W), {}, {
              chartWidth: k,
              chartHeight: B,
              margin: z,
              onBBoxUpdate: h.handleLegendBBoxUpdate
            }))
          }), ce(h, "renderTooltip", function() {
            var g, P = h.props,
              C = P.children,
              k = P.accessibilityLayer,
              B = Ye(C, st);
            if (!B) return null;
            var z = h.state,
              N = z.isTooltipActive,
              K = z.activeCoordinate,
              U = z.activePayload,
              W = z.activeLabel,
              b = z.offset,
              O = (g = B.props.active) !== null && g !== void 0 ? g : N;
            return $t(B, {
              viewBox: $($({}, b), {}, {
                x: b.left,
                y: b.top
              }),
              active: O,
              label: W,
              payload: O ? U : [],
              coordinate: K,
              accessibilityLayer: k
            })
          }), ce(h, "renderBrush", function(g) {
            var P = h.props,
              C = P.margin,
              k = P.data,
              B = h.state,
              z = B.offset,
              N = B.dataStartIndex,
              K = B.dataEndIndex,
              U = B.updateId;
            return $t(g, {
              key: g.key || "_recharts-brush",
              onChange: Wo(h.handleBrushChange, g.props.onChange),
              data: k,
              x: X(g.props.x) ? g.props.x : z.left,
              y: X(g.props.y) ? g.props.y : z.top + z.height + z.brushBottom - (C.bottom || 0),
              width: X(g.props.width) ? g.props.width : z.width,
              startIndex: N,
              endIndex: K,
              updateId: "brush-".concat(U)
            })
          }), ce(h, "renderReferenceElement", function(g, P, C) {
            if (!g) return null;
            var k = h,
              B = k.clipPathId,
              z = h.state,
              N = z.xAxisMap,
              K = z.yAxisMap,
              U = z.offset,
              W = g.type.defaultProps || {},
              b = g.props,
              O = b.xAxisId,
              E = O === void 0 ? W.xAxisId : O,
              _ = b.yAxisId,
              j = _ === void 0 ? W.yAxisId : _;
            return $t(g, {
              key: g.key || "".concat(P, "-").concat(C),
              xAxis: N[E],
              yAxis: K[j],
              viewBox: {
                x: U.left,
                y: U.top,
                width: U.width,
                height: U.height
              },
              clipPathId: B
            })
          }), ce(h, "renderActivePoints", function(g) {
            var P = g.item,
              C = g.activePoint,
              k = g.basePoint,
              B = g.childIndex,
              z = g.isRange,
              N = [],
              K = P.props.key,
              U = P.item.type.defaultProps !== void 0 ? $($({}, P.item.type.defaultProps), P.item.props) : P.item.props,
              W = U.activeDot,
              b = U.dataKey,
              O = $($({
                index: B,
                dataKey: b,
                cx: C.x,
                cy: C.y,
                r: 4,
                fill: Ro(P.item),
                strokeWidth: 2,
                stroke: "#fff",
                payload: C.payload,
                value: C.value
              }, ae(W, !1)), Rr(W));
            return N.push(x.renderActiveDot(W, O, "".concat(K, "-activePoint-").concat(B))), k ? N.push(x.renderActiveDot(W, $($({}, O), {}, {
              cx: k.x,
              cy: k.y
            }), "".concat(K, "-basePoint-").concat(B))) : z && N.push(null), N
          }), ce(h, "renderGraphicChild", function(g, P, C) {
            var k = h.filterFormatItem(g, P, C);
            if (!k) return null;
            var B = h.getTooltipEventType(),
              z = h.state,
              N = z.isTooltipActive,
              K = z.tooltipAxis,
              U = z.activeTooltipIndex,
              W = z.activeLabel,
              b = h.props.children,
              O = Ye(b, st),
              E = k.props,
              _ = E.points,
              j = E.isRange,
              T = E.baseLine,
              D = k.item.type.defaultProps !== void 0 ? $($({}, k.item.type.defaultProps), k.item.props) : k.item.props,
              R = D.activeDot,
              V = D.hide,
              Z = D.activeBar,
              Y = D.activeShape,
              te = !!(!V && N && O && (R || Z || Y)),
              he = {};
            B !== "axis" && O && O.props.trigger === "click" ? he = {
              onClick: Wo(h.handleItemMouseEnter, g.props.onClick)
            } : B !== "axis" && (he = {
              onMouseLeave: Wo(h.handleItemMouseLeave, g.props.onMouseLeave),
              onMouseEnter: Wo(h.handleItemMouseEnter, g.props.onMouseEnter)
            });
            var q = $t(g, $($({}, k.props), he));

            function ue(ne) {
              return typeof K.dataKey == "function" ? K.dataKey(ne.payload) : null
            }
            if (te)
              if (U >= 0) {
                var ee, H;
                if (K.dataKey && !K.allowDuplicatedCategory) {
                  var Se = typeof K.dataKey == "function" ? ue : "payload.".concat(K.dataKey.toString());
                  ee = xn(_, Se, W), H = j && T && xn(T, Se, W)
                } else ee = _?.[U], H = j && T && T[U];
                if (Y || Z) {
                  var G = g.props.activeIndex !== void 0 ? g.props.activeIndex : U;
                  return [$t(g, $($($({}, k.props), he), {}, {
                    activeIndex: G
                  })), null, null]
                }
                if (!(0, Ci.default)(ee)) return [q].concat(Di(h.renderActivePoints({
                  item: k,
                  activePoint: ee,
                  basePoint: H,
                  childIndex: U,
                  isRange: j
                })))
              } else {
                var Ae, Pe = (Ae = h.getItemByXY(h.state.activeCoordinate)) !== null && Ae !== void 0 ? Ae : {
                    graphicalItem: q
                  },
                  Ce = Pe.graphicalItem,
                  L = Ce.item,
                  re = L === void 0 ? g : L,
                  ie = Ce.childIndex,
                  J = $($($({}, k.props), he), {}, {
                    activeIndex: ie
                  });
                return [$t(re, J), null, null]
              } return j ? [q, null, null] : [q, null]
          }), ce(h, "renderCustomized", function(g, P, C) {
            return $t(g, $($({
              key: "recharts-customized-".concat(C)
            }, h.props), h.state))
          }), ce(h, "renderMap", {
            CartesianGrid: {
              handler: ul,
              once: !0
            },
            ReferenceArea: {
              handler: h.renderReferenceElement
            },
            ReferenceLine: {
              handler: ul
            },
            ReferenceDot: {
              handler: h.renderReferenceElement
            },
            XAxis: {
              handler: ul
            },
            YAxis: {
              handler: ul
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
          }), h.clipPathId = "".concat((S = w.id) !== null && S !== void 0 ? S : Vt("recharts"), "-clip"), h.throttleTriggeredAfterMouseMove = (0, R_.default)(h.triggeredAfterMouseMove, (A = w.throttleDelay) !== null && A !== void 0 ? A : 1e3 / 60), h.state = {}, h
        }
        return I4(x, v), E4(x, [{
          key: "componentDidMount",
          value: function() {
            var S, A;
            this.addListener(), this.accessibilityManager.setDetails({
              container: this.container,
              offset: {
                left: (S = this.props.margin.left) !== null && S !== void 0 ? S : 0,
                top: (A = this.props.margin.top) !== null && A !== void 0 ? A : 0
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
              A = S.children,
              h = S.data,
              g = S.height,
              P = S.layout,
              C = Ye(A, st);
            if (C) {
              var k = C.props.defaultIndex;
              if (!(typeof k != "number" || k < 0 || k > this.state.tooltipTicks.length - 1)) {
                var B = this.state.tooltipTicks[k] && this.state.tooltipTicks[k].value,
                  z = Sd(this.state, h, k, B),
                  N = this.state.tooltipTicks[k].coordinate,
                  K = (this.state.offset.top + g) / 2,
                  U = P === "horizontal",
                  W = U ? {
                    x: N,
                    y: K
                  } : {
                    y: N,
                    x: K
                  },
                  b = this.state.formattedGraphicalItems.find(function(E) {
                    var _ = E.item;
                    return _.type.name === "Scatter"
                  });
                b && (W = $($({}, W), b.props.points[k].tooltipPosition), z = b.props.points[k].tooltipPayload);
                var O = {
                  activeTooltipIndex: k,
                  isTooltipActive: !0,
                  activeLabel: B,
                  activePayload: z,
                  activeCoordinate: W
                };
                this.setState(O), this.renderCursor(C), this.accessibilityManager.setIndex(k)
              }
            }
          }
        }, {
          key: "getSnapshotBeforeUpdate",
          value: function(S, A) {
            if (!this.props.accessibilityLayer) return null;
            if (this.state.tooltipTicks !== A.tooltipTicks && this.accessibilityManager.setDetails({
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
            Xa([Ye(S.children, st)], [Ye(this.props.children, st)]) || this.displayDefaultTooltip()
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel()
          }
        }, {
          key: "getTooltipEventType",
          value: function() {
            var S = Ye(this.props.children, st);
            if (S && typeof S.props.shared == "boolean") {
              var A = S.props.shared ? "axis" : "item";
              return u.indexOf(A) >= 0 ? A : o
            }
            return o
          }
        }, {
          key: "getMouseInfo",
          value: function(S) {
            if (!this.container) return null;
            var A = this.container,
              h = A.getBoundingClientRect(),
              g = Gx(h),
              P = {
                chartX: Math.round(S.pageX - g.left),
                chartY: Math.round(S.pageY - g.top)
              },
              C = h.width / A.offsetWidth || 1,
              k = this.inRange(P.chartX, P.chartY, C);
            if (!k) return null;
            var B = this.state,
              z = B.xAxisMap,
              N = B.yAxisMap,
              K = this.getTooltipEventType(),
              U = j_(this.state, this.props.data, this.props.layout, k);
            if (K !== "axis" && z && N) {
              var W = Xt(z).scale,
                b = Xt(N).scale,
                O = W && W.invert ? W.invert(P.chartX) : null,
                E = b && b.invert ? b.invert(P.chartY) : null;
              return $($({}, P), {}, {
                xValue: O,
                yValue: E
              }, U)
            }
            return U ? $($({}, P), U) : null
          }
        }, {
          key: "inRange",
          value: function(S, A) {
            var h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
              g = this.props.layout,
              P = S / h,
              C = A / h;
            if (g === "horizontal" || g === "vertical") {
              var k = this.state.offset,
                B = P >= k.left && P <= k.left + k.width && C >= k.top && C <= k.top + k.height;
              return B ? {
                x: P,
                y: C
              } : null
            }
            var z = this.state,
              N = z.angleAxisMap,
              K = z.radiusAxisMap;
            if (N && K) {
              var U = Xt(N);
              return gp({
                x: P,
                y: C
              }, U)
            }
            return null
          }
        }, {
          key: "parseEventsOfWrapper",
          value: function() {
            var S = this.props.children,
              A = this.getTooltipEventType(),
              h = Ye(S, st),
              g = {};
            h && A === "axis" && (h.props.trigger === "click" ? g = {
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
            var P = Rr(this.props, this.handleOuterEvent);
            return $($({}, P), g)
          }
        }, {
          key: "addListener",
          value: function() {
            nl.on(il, this.handleReceiveSyncEvent)
          }
        }, {
          key: "removeListener",
          value: function() {
            nl.removeListener(il, this.handleReceiveSyncEvent)
          }
        }, {
          key: "filterFormatItem",
          value: function(S, A, h) {
            for (var g = this.state.formattedGraphicalItems, P = 0, C = g.length; P < C; P++) {
              var k = g[P];
              if (k.item === S || k.props.key === S.key || A === At(k.item.type) && h === k.childIndex) return k
            }
            return null
          }
        }, {
          key: "renderClipPath",
          value: function() {
            var S = this.clipPathId,
              A = this.state.offset,
              h = A.left,
              g = A.top,
              P = A.height,
              C = A.width;
            return kt.createElement("defs", null, kt.createElement("clipPath", {
              id: S
            }, kt.createElement("rect", {
              x: h,
              y: g,
              height: P,
              width: C
            })))
          }
        }, {
          key: "getXScales",
          value: function() {
            var S = this.state.xAxisMap;
            return S ? Object.entries(S).reduce(function(A, h) {
              var g = __(h, 2),
                P = g[0],
                C = g[1];
              return $($({}, A), {}, ce({}, P, C.scale))
            }, {}) : null
          }
        }, {
          key: "getYScales",
          value: function() {
            var S = this.state.yAxisMap;
            return S ? Object.entries(S).reduce(function(A, h) {
              var g = __(h, 2),
                P = g[0],
                C = g[1];
              return $($({}, A), {}, ce({}, P, C.scale))
            }, {}) : null
          }
        }, {
          key: "getXScaleByAxisId",
          value: function(S) {
            var A;
            return (A = this.state.xAxisMap) === null || A === void 0 || (A = A[S]) === null || A === void 0 ? void 0 : A.scale
          }
        }, {
          key: "getYScaleByAxisId",
          value: function(S) {
            var A;
            return (A = this.state.yAxisMap) === null || A === void 0 || (A = A[S]) === null || A === void 0 ? void 0 : A.scale
          }
        }, {
          key: "getItemByXY",
          value: function(S) {
            var A = this.state,
              h = A.formattedGraphicalItems,
              g = A.activeItem;
            if (h && h.length)
              for (var P = 0, C = h.length; P < C; P++) {
                var k = h[P],
                  B = k.props,
                  z = k.item,
                  N = z.type.defaultProps !== void 0 ? $($({}, z.type.defaultProps), z.props) : z.props,
                  K = At(z.type);
                if (K === "Bar") {
                  var U = (B.data || []).find(function(E) {
                    return IO(S, E)
                  });
                  if (U) return {
                    graphicalItem: k,
                    payload: U
                  }
                } else if (K === "RadialBar") {
                  var W = (B.data || []).find(function(E) {
                    return gp(S, E)
                  });
                  if (W) return {
                    graphicalItem: k,
                    payload: W
                  }
                } else if (la(k, g) || ca(k, g) || pi(k, g)) {
                  var b = rS({
                      graphicalItem: k,
                      activeTooltipItem: g,
                      itemData: N.data
                    }),
                    O = N.activeIndex === void 0 ? b : N.activeIndex;
                  return {
                    graphicalItem: $($({}, k), {}, {
                      childIndex: O
                    }),
                    payload: pi(k, g) ? N.data[b] : k.props.data[b]
                  }
                }
              }
            return null
          }
        }, {
          key: "render",
          value: function() {
            var S = this;
            if (!Rl(this)) return null;
            var A = this.props,
              h = A.children,
              g = A.className,
              P = A.width,
              C = A.height,
              k = A.style,
              B = A.compact,
              z = A.title,
              N = A.desc,
              K = P_(A, O4),
              U = ae(K, !1);
            if (B) return kt.createElement(ed, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, kt.createElement(Hi, Mi({}, U, {
              width: P,
              height: C,
              title: z,
              desc: N
            }), this.renderClipPath(), Ll(h, this.renderMap)));
            if (this.props.accessibilityLayer) {
              var W, b;
              U.tabIndex = (W = this.props.tabIndex) !== null && W !== void 0 ? W : 0, U.role = (b = this.props.role) !== null && b !== void 0 ? b : "application", U.onKeyDown = function(E) {
                S.accessibilityManager.keyboardEvent(E)
              }, U.onFocus = function() {
                S.accessibilityManager.focus()
              }
            }
            var O = this.parseEventsOfWrapper();
            return kt.createElement(ed, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, kt.createElement("div", Mi({
              className: oe("recharts-wrapper", g),
              style: $({
                position: "relative",
                cursor: "default",
                width: P,
                height: C
              }, k)
            }, O, {
              ref: function(_) {
                S.container = _
              }
            }), kt.createElement(Hi, Mi({}, U, {
              width: P,
              height: C,
              title: z,
              desc: N,
              style: z4
            }), this.renderClipPath(), Ll(h, this.renderMap)), this.renderLegend(), this.renderTooltip()))
          }
        }])
      }(L4);
    ce(y, "displayName", r), ce(y, "defaultProps", $({
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
        A = v.children,
        h = v.width,
        g = v.height,
        P = v.layout,
        C = v.stackOffset,
        k = v.margin,
        B = x.dataStartIndex,
        z = x.dataEndIndex;
      if (x.updateId === void 0) {
        var N = M_(v);
        return $($($({}, N), {}, {
          updateId: 0
        }, d($($({
          props: v
        }, N), {}, {
          updateId: 0
        }), x)), {}, {
          prevDataKey: w,
          prevData: S,
          prevWidth: h,
          prevHeight: g,
          prevLayout: P,
          prevStackOffset: C,
          prevMargin: k,
          prevChildren: A
        })
      }
      if (w !== x.prevDataKey || S !== x.prevData || h !== x.prevWidth || g !== x.prevHeight || P !== x.prevLayout || C !== x.prevStackOffset || !sr(k, x.prevMargin)) {
        var K = M_(v),
          U = {
            chartX: x.chartX,
            chartY: x.chartY,
            isTooltipActive: x.isTooltipActive
          },
          W = $($({}, j_(x, S, P)), {}, {
            updateId: x.updateId + 1
          }),
          b = $($($({}, K), U), W);
        return $($($({}, b), d($({
          props: v
        }, b), x)), {}, {
          prevDataKey: w,
          prevData: S,
          prevWidth: h,
          prevHeight: g,
          prevLayout: P,
          prevStackOffset: C,
          prevMargin: k,
          prevChildren: A
        })
      }
      if (!Xa(A, x.prevChildren)) {
        var O, E, _, j, T = Ye(A, cn),
          D = T && (O = (E = T.props) === null || E === void 0 ? void 0 : E.startIndex) !== null && O !== void 0 ? O : B,
          R = T && (_ = (j = T.props) === null || j === void 0 ? void 0 : j.endIndex) !== null && _ !== void 0 ? _ : z,
          V = D !== B || R !== z,
          Z = !(0, Ci.default)(S),
          Y = Z && !V ? x.updateId : x.updateId + 1;
        return $($({
          updateId: Y
        }, d($($({
          props: v
        }, x), {}, {
          updateId: Y,
          dataStartIndex: D,
          dataEndIndex: R
        }), x)), {}, {
          prevChildren: A,
          dataStartIndex: D,
          dataEndIndex: R
        })
      }
      return null
    }), ce(y, "renderActiveDot", function(v, x, w) {
      var S;
      return B4(v) ? S = $t(v, x) : (0, Ut.default)(v) ? S = v(x) : S = kt.createElement(fi, x), kt.createElement(ge, {
        className: "recharts-active-dot",
        key: w
      }, S)
    });
    var m = q4(function(x, w) {
      return kt.createElement(y, Mi({}, x, {
        ref: w
      }))
    });
    return m.displayName = y.displayName, m
  };
var Ad = fl({
  chartName: "LineChart",
  GraphicalChild: Cr,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: or
  }, {
    axisType: "yAxis",
    AxisComp: ar
  }],
  formatAxisMap: Bs
});
var _d = fl({
  chartName: "BarChart",
  GraphicalChild: Wt,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: or
  }, {
    axisType: "yAxis",
    AxisComp: ar
  }],
  formatAxisMap: Bs
});
import "react";
import {
  jsx as pl,
  jsxs as Pd
} from "./react-jsx-shim-eraudit.js";

function Td({
  data: e,
  title: t = "AI Intelligence"
}) {
  if (!e) return null;
  let r = Array.isArray(e?.sections) ? e.sections : Z4(e);
  return r.length ? Pd("div", {
    className: "rounded-lg my-3",
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      boxShadow: "var(--md-shadow-sm)",
      padding: "1rem 1.25rem"
    },
    children: [Pd("h3", {
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
      children: [pl("span", {
        "aria-hidden": "true",
        children: "\u2728"
      }), t]
    }), pl("div", {
      className: "space-y-2",
      children: r.map((n, i) => Pd("div", {
        children: [n.title && pl("div", {
          style: {
            fontSize: "var(--fs-xs)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--md-text-tertiary)",
            marginBottom: 4
          },
          children: n.title
        }), pl("p", {
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

function Z4(e) {
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
  Fragment as Li,
  jsx as M,
  jsxs as F
} from "./react-jsx-shim-eraudit.js";

function de(e, t = 0) {
  return e == null || e === "" || isNaN(e) ? "\u2014" : Number(e).toLocaleString("th-TH", {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  })
}

function Ir(e) {
  return e == null || isNaN(e) ? "\u2014" : `${Number(e).toFixed(1)}%`
}

function q_(e, t) {
  return t > 0 ? Math.round((e - t) / t * 100) : e > 0 ? 100 : 0
}
async function kr(e, t) {
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
var ja = ["#94a3b8", "#7c3aed", "#0284c7"],
  W_ = ["#0284c7", "#7c3aed", "#db2777", "#ea580c", "#059669", "#d97706", "#4f46e5", "#0891b2", "#be123c", "#65a30d"];

function Q4() {
  let e = new Date,
    t = e.getMonth() + 1,
    r = e.getFullYear();
  return `${t>=10?r:r-1}-10-01`
}
var z_ = () => new Date().toISOString().slice(0, 10),
  Ni = ["#10b981", "#84cc16", "#eab308", "#f97316", "#dc2626"],
  dl = ["aging_0_30", "aging_31_60", "aging_61_90", "aging_91_180", "aging_180_plus"],
  ml = ["0-30 \u0E27\u0E31\u0E19", "31-60 \u0E27\u0E31\u0E19", "61-90 \u0E27\u0E31\u0E19", "91-180 \u0E27\u0E31\u0E19", ">180 \u0E27\u0E31\u0E19"],
  Ri = {
    drug: "#7c3aed",
    lab: "#0284c7",
    xray: "#059669"
  };

function e5() {
  let [e, t] = Ge(null), [r, n] = Ge(null), [i, o] = Ge(null), [a, u] = Ge(null), [s, l] = Ge(null), [f, c] = Ge(null), [p, d] = Ge(!0), [y, m] = Ge(null), [v, x] = Ge("overview"), [w, S] = Ge(null), [A, h] = Ge(null), g = J4(null), [P, C] = Ge(!1), [k, B] = Ge(Q4()), [z, N] = Ge(z_()), [K, U] = Ge(null), [W, b] = Ge(null), [O, E] = Ge("outstanding"), [_, j] = Ge(!1), T = Ht(async () => {
    d(!0), m(null);
    try {
      let [L, re] = await Promise.all([kr(`/api/customer-insight/screening-summary?_t=${Date.now()}`, {
        credentials: "include"
      }), kr(`/api/customer-insight/monthly-trend?_t=${Date.now()}`, {
        credentials: "include"
      })]);
      t(L), n(re), kr("/api/ai/customer/segmentation", {
        credentials: "include"
      }).then(h).catch(() => {})
    } catch (L) {
      m(L.message)
    }
    d(!1)
  }, []), D = Ht(async L => {
    try {
      let re = L ? `&pttype=${L}` : "",
        ie = await kr(`/api/customer-insight/top-diagnosis?${re}&_t=${Date.now()}`, {
          credentials: "include"
        });
      o(ie)
    } catch (re) {
      m(re.message)
    }
  }, []), R = Ht(async () => {
    try {
      let L = await kr(`/api/customer-insight/patient-insight?_t=${Date.now()}`, {
        credentials: "include"
      });
      u(L)
    } catch (L) {
      m(L.message)
    }
  }, []), V = Ht(async () => {
    try {
      let L = await kr(`/api/customer-insight/aging?_t=${Date.now()}`, {
        credentials: "include"
      });
      l(L)
    } catch (L) {
      m(L.message)
    }
  }, []), Z = Ht(async () => {
    d(!0), m(null);
    try {
      let L = await kr(`/api/customer-insight/screening-custom?from=${k}&to=${z}&_t=${Date.now()}`, {
        credentials: "include"
      });
      c(L)
    } catch (L) {
      m(L.message)
    }
    d(!1)
  }, [k, z]), Y = Ht(async L => {
    j(!0);
    try {
      let re = await kr(`/api/customer-insight/payer-patients?pttype=${L}&sort_by=${O}&_t=${Date.now()}`, {
        credentials: "include"
      });
      b(re)
    } catch (re) {
      b({
        patients: [],
        error: re.message
      })
    }
    j(!1)
  }, [O]), te = Ht(L => {
    U(L), b(null), Y(L.pttype_code)
  }, [Y]), he = Ht(() => {
    U(null), b(null)
  }, []);
  Ea(() => {
    T()
  }, [T]), Ea(() => {
    v === "diagnosis" && D(w)
  }, [v, w, D]), Ea(() => {
    v === "patient-insight" && !a && R()
  }, [v, a, R]), Ea(() => {
    v === "aging" && !s && V()
  }, [v, s, V]), Ea(() => {
    K && Y(K.pttype_code)
  }, [O, K, Y]);
  let q = e?.fiscal_years || [],
    ue = q.map(L => L.be),
    ee = Ht(() => {
      if (!g.current) return;
      let L = window.open("", "_blank");
      L.document.write(`<!DOCTYPE html><html><head><title>Customer Insight \u2014 3 \u0E1B\u0E35\u0E07\u0E1A</title>
      <style>body{font-family:Sarabun,sans-serif;padding:20px}table{border-collapse:collapse;width:100%;font-size:10px}
      th,td{border:1px solid #ccc;padding:3px 6px;text-align:right}th{background:#f0f4f8;font-weight:800}
      td:first-child,th:first-child{text-align:left}</style></head><body>`), L.document.write(g.current.outerHTML), L.document.write("</body></html>"), L.document.close(), L.print()
    }, []),
    H = Ht(() => {
      if (!e?.payers || q.length < 3) return;
      let L = "\uFEFF",
        re = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let pe of q) re.push(`${pe.be} OPD`, `${pe.be} IPD`, `${pe.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${pe.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${pe.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${pe.be} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      re.push("Growth %");
      let ie = e.payers.map(pe => {
          let fe = [pe.pttype_code, pe.pttype_name];
          for (let le of q) {
            let ve = pe.fys[le.be];
            fe.push(ve.opd_visits, ve.ipd_admissions, ve.total_income, ve.total_paid, ve.total_outstanding, ve.collection_rate)
          }
          return fe.push(pe.income_growth), fe
        }),
        J = L + [re, ...ie].map(pe => pe.join(",")).join(`
`),
        ne = new Blob([J], {
          type: "text/csv;charset=utf-8"
        }),
        me = URL.createObjectURL(ne),
        se = document.createElement("a");
      se.href = me, se.download = "BCH360_CustomerInsight_3FY.csv", se.click(), URL.revokeObjectURL(me)
    }, [e, q]),
    Se = Ht(async () => {
      if (!e?.payers || q.length < 3) return;
      let L = await import("./xlsx-BuHXVOW6.js"),
        re = L.utils.book_new(),
        ie = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let ye of q) ie.push(`${ye.be} \u0E04\u0E23\u0E31\u0E49\u0E07`, `${ye.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${ye.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${ye.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${ye.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      ie.push("Growth %");
      let J = e.payers.map(ye => {
          let Re = [ye.pttype_code, ye.pttype_name];
          for (let Be of q) {
            let $e = ye.fys[Be.be];
            Re.push($e.opd_visits + $e.ipd_admissions, $e.total_income, $e.total_paid, $e.total_outstanding, $e.collection_rate)
          }
          return Re.push(ye.income_growth), Re
        }),
        ne = L.utils.aoa_to_sheet([ie, ...J]);
      ne["!cols"] = ie.map(ye => ({
        wch: Math.min(Math.max(ye.length + 4, 12), 28)
      })), L.utils.book_append_sheet(re, ne, "\u0E2A\u0E23\u0E38\u0E1B\u0E2A\u0E34\u0E17\u0E18\u0E34 3 \u0E1B\u0E35\u0E07\u0E1A");
      let me = q[2].be,
        se = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 Xray", "% \u0E22\u0E32", "% Lab", "% Xray"],
        pe = e.payers.map(ye => {
          let Re = ye.fys[me],
            Be = Re.total_income || 0;
          return [ye.pttype_code, ye.pttype_name, Be, Re.opd_drug || 0, Re.opd_lab || 0, Re.opd_xray || 0, Be > 0 ? Math.round(Re.opd_drug / Be * 1e3) / 10 : 0, Be > 0 ? Math.round(Re.opd_lab / Be * 1e3) / 10 : 0, Be > 0 ? Math.round(Re.opd_xray / Be * 1e3) / 10 : 0]
        }),
        fe = L.utils.aoa_to_sheet([se, ...pe]);
      if (fe["!cols"] = se.map(ye => ({
          wch: Math.min(Math.max(ye.length + 4, 12), 28)
        })), L.utils.book_append_sheet(re, fe, `Service Mix ${me}`), r?.comparison) {
        let ye = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...q.map($e => `${$e.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`), ...q.map($e => `${$e.be} \u0E04\u0E23\u0E31\u0E49\u0E07`)],
          Re = r.comparison.map($e => {
            let xt = [$e.month];
            for (let Bi of q) xt.push($e[`fy${Bi.be}`]?.income || 0);
            for (let Bi of q) xt.push($e[`fy${Bi.be}`]?.visits || 0);
            return xt
          }),
          Be = L.utils.aoa_to_sheet([ye, ...Re]);
        Be["!cols"] = ye.map($e => ({
          wch: 14
        })), L.utils.book_append_sheet(re, Be, "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19")
      }
      if (s?.payers) {
        let ye = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", ...ml, "\u0E23\u0E27\u0E21\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"],
          Re = s.payers.map(xt => [xt.pttype_code, xt.pttype_name, ...dl.map(Bi => xt[Bi] || 0), xt.total_outstanding || 0]),
          Be = s.grand_total || {};
        Re.push(["", "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", ...dl.map(xt => Be[xt] || 0), Be.total_outstanding || 0]);
        let $e = L.utils.aoa_to_sheet([ye, ...Re]);
        $e["!cols"] = ye.map(xt => ({
          wch: Math.min(Math.max(xt.length + 4, 14), 24)
        })), L.utils.book_append_sheet(re, $e, "Aging \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30")
      }
      let le = [
          ["BCH 360\xB0 Intelligence \u2014 Customer Insight Report"],
          [],
          ["\u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", `${ue.join(" \xB7 ")}`],
          ["\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", e.data_source],
          ["\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E40\u0E21\u0E37\u0E48\u0E2D", new Date().toLocaleString("th-TH")],
          ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34", `${e.payers.length}`],
          ["\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E35\u0E48 Flag", `${e.flagged_count}`],
          [],
          ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team \xB7 BOSSART"]
        ],
        ve = L.utils.aoa_to_sheet(le);
      ve["!cols"] = [{
        wch: 22
      }, {
        wch: 60
      }], L.utils.book_append_sheet(re, ve, "Meta"), L.writeFile(re, "BCH360_CustomerInsight_3FY.xlsx")
    }, [e, q, ue, r, s]),
    G = {
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
      badge: (L, re) => ({
        fontSize: "9px",
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: "99px",
        background: L,
        color: re
      })
    },
    Ae = ({
      label: L,
      icon: re,
      values: ie,
      unit: J = "",
      accent: ne = "#0284c7",
      reverse: me = !1
    }) => {
      let se = ie[2],
        pe = ie[1],
        fe = q_(se, pe),
        le = me ? fe <= 0 ? "#059669" : "#dc2626" : fe >= 0 ? "#059669" : "#dc2626";
      return F("div", {
        className: "rounded-2xl p-4",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          flex: "1 1 200px",
          minWidth: "190px"
        },
        children: [F("div", {
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
            children: L
          })]
        }), F("div", {
          style: {
            fontSize: "20px",
            fontWeight: 900,
            color: ne
          },
          children: [de(se), " ", M("span", {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)"
            },
            children: J
          })]
        }), M("div", {
          style: {
            display: "flex",
            gap: "8px",
            marginTop: "6px",
            fontSize: "10px",
            fontWeight: 700
          },
          children: ue.map((ve, ye) => F("span", {
            style: {
              color: ye === 2 ? ne : "var(--md-text-tertiary)"
            },
            children: [ve, ": ", de(ie[ye])]
          }, ve))
        }), pe > 0 && F("div", {
          style: {
            marginTop: "4px",
            fontSize: "10px",
            fontWeight: 800,
            color: le
          },
          children: [fe >= 0 ? "+" : "", fe, "% vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"]
        })]
      })
    },
    Pe = ({
      active: L,
      payload: re,
      label: ie
    }) => !L || !re?.length ? null : F("div", {
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
      }), re.map((J, ne) => F("div", {
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
            background: J.color
          }
        }), F("span", {
          style: {
            fontWeight: 600,
            color: "var(--md-text-secondary)"
          },
          children: [J.name, ":"]
        }), M("span", {
          style: {
            fontWeight: 800
          },
          children: de(J.value)
        })]
      }, ne))]
    }),
    Ce = ({
      value: L
    }) => {
      if (L == null || isNaN(L)) return null;
      let re = L >= 0 ? "#059669" : "#dc2626";
      return F("span", {
        style: {
          fontSize: "9px",
          fontWeight: 800,
          color: re
        },
        children: [L >= 0 ? "+" : "", L, "%"]
      })
    };
  return F("div", {
    className: "space-y-5 animate-fade-in pb-10",
    children: [F("div", {
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
        style: G.badge("rgba(124,58,237,.1)", "#7c3aed"),
        children: "\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \xB7 \u0E2B\u0E25\u0E31\u0E01\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2F"
      }), q.length === 3 && F("span", {
        style: G.badge("rgba(2,132,199,.1)", "#0284c7"),
        children: ["3 \u0E1B\u0E35\u0E07\u0E1A: ", ue[0], " \xB7 ", ue[1], " \xB7 ", ue[2]]
      })]
    }), F("div", {
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
      }].map(L => M("button", {
        onClick: () => x(L.id),
        style: {
          padding: "5px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          cursor: "pointer",
          border: v === L.id ? "1.5px solid #7c3aed" : "1px solid var(--md-border)",
          background: v === L.id ? "rgba(124,58,237,.08)" : "var(--md-surface)",
          color: v === L.id ? "#7c3aed" : "var(--md-text-secondary)"
        },
        children: L.label
      }, L.id)), M("div", {
        style: {
          width: "1px",
          height: "24px",
          background: "var(--md-border)"
        }
      }), M("button", {
        onClick: T,
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
        onClick: ee,
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
        onClick: H,
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
        onClick: Se,
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
    }), F("div", {
      className: "rounded-2xl p-3",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [F("label", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--md-text-secondary)",
          cursor: "pointer"
        },
        children: [M("input", {
          type: "checkbox",
          checked: P,
          onChange: L => C(L.target.checked)
        }), "\u{1F4C5} \u0E43\u0E0A\u0E49\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E40\u0E2D\u0E07 (override 3 \u0E1B\u0E35\u0E07\u0E1A)"]
      }), P && F(Li, {
        children: [M("input", {
          type: "date",
          value: k,
          max: z,
          onChange: L => B(L.target.value),
          style: {
            padding: "5px 10px",
            borderRadius: "6px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 700,
            background: "var(--md-surface)",
            color: "var(--md-text-primary)"
          }
        }), M("span", {
          style: {
            fontSize: "11px",
            color: "var(--md-text-tertiary)"
          },
          children: "\u0E16\u0E36\u0E07"
        }), M("input", {
          type: "date",
          value: z,
          min: k,
          max: z_(),
          onChange: L => N(L.target.value),
          style: {
            padding: "5px 10px",
            borderRadius: "6px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 700,
            background: "var(--md-surface)",
            color: "var(--md-text-primary)"
          }
        }), M("button", {
          onClick: Z,
          disabled: p,
          style: {
            padding: "5px 14px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(135deg, #d97706, #ea580c)",
            color: "#fff"
          },
          children: "\u0E42\u0E2B\u0E25\u0E14\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49"
        }), f && F("span", {
          style: {
            fontSize: "11px",
            fontWeight: 700,
            color: "#d97706"
          },
          children: ["\u2713 \u0E0A\u0E48\u0E27\u0E07 ", f.window?.from, " \u2192 ", f.window?.to, " \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ", de(f.grand_total?.total_income), " \u0E1A\u0E32\u0E17 \xB7 \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A ", Ir(f.grand_total?.collection_rate)]
        })]
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
    }), !p && e && q.length === 3 && v === "overview" && (() => {
      let L = e.grand_totals,
        re = J => q.map(ne => L[ne.be]?.[J] || 0),
        ie = (r?.comparison || []).map(J => {
          let ne = {
            month: J.month
          };
          for (let me of q) ne[`fy${me.be}`] = J[`fy${me.be}`]?.income || 0;
          return ne
        }).filter(J => q.some(ne => J[`fy${ne.be}`] > 0));
      return F(Li, {
        children: [F("div", {
          style: {
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          },
          children: [M(Ae, {
            icon: "\u{1F465}",
            label: "OPD Visits",
            values: re("opd_visits"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#0284c7"
          }), M(Ae, {
            icon: "\u{1F3E5}",
            label: "IPD Admissions",
            values: re("ipd_admissions"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#7c3aed"
          }), M(Ae, {
            icon: "\u{1F4B0}",
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
            values: re("total_income"),
            unit: "\u0E1A\u0E32\u0E17",
            accent: "#059669"
          }), M(Ae, {
            icon: "\u{1F4CA}",
            label: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A",
            values: q.map(J => L[J.be]?.collection_rate || 0),
            unit: "%",
            accent: "#0284c7"
          }), M(Ae, {
            icon: "\u{1F6A9}",
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21",
            values: [0, 0, e.flagged_count],
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            accent: "#dc2626"
          })]
        }), ie.length > 0 && F("div", {
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
          }), M(wu, {
            width: "100%",
            height: 300,
            children: F(Ad, {
              data: ie,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [M(wa, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), M(or, {
                dataKey: "month",
                tick: {
                  fontSize: 11,
                  fontWeight: 700
                }
              }), M(ar, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: J => J >= 1e6 ? `${(J/1e6).toFixed(1)}M` : J >= 1e3 ? `${(J/1e3).toFixed(0)}K` : J
              }), M(st, {
                content: M(Pe, {})
              }), M(jt, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), q.map((J, ne) => M(Cr, {
                type: "monotone",
                dataKey: `fy${J.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${J.be}`,
                stroke: ja[ne],
                strokeWidth: ne === 2 ? 3 : 1.5,
                strokeDasharray: ne === 0 ? "5 5" : void 0,
                dot: {
                  r: ne === 2 ? 4 : 2
                }
              }, J.be))]
            })
          })]
        }), F("div", {
          className: "rounded-2xl",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            overflow: "hidden"
          },
          ref: g,
          children: [F("div", {
            style: {
              padding: "14px 20px",
              borderBottom: "2px solid var(--md-border)",
              background: "linear-gradient(135deg, rgba(124,58,237,.04), rgba(2,132,199,.04))"
            },
            children: [F("div", {
              style: {
                fontSize: "15px",
                fontWeight: 900,
                color: "var(--md-text-primary)"
              },
              children: ["\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34 \u2014 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 (", ue.join(" \xB7 "), ")"]
            }), M("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginTop: "2px"
              },
              children: "\u0E2B\u0E25\u0E31\u0E01\u0E40\u0E01\u0E13\u0E11\u0E4C \u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23 \u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02 \u0E01\u0E32\u0E23\u0E02\u0E2D\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2F \xB7 \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E35\u0E48\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A <80% (\u0E1B\u0E35\u0E07\u0E1A\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14) \u0E08\u0E30\u0E16\u0E39\u0E01 Flag"
            })]
          }), M("div", {
            style: {
              overflowX: "auto"
            },
            children: F("table", {
              style: {
                width: "100%",
                borderCollapse: "collapse"
              },
              children: [F("thead", {
                children: [F("tr", {
                  style: {
                    background: "var(--md-surface-2, rgba(0,0,0,.02))"
                  },
                  children: [M("th", {
                    rowSpan: 2,
                    style: {
                      ...G.th,
                      textAlign: "left",
                      paddingLeft: "14px",
                      borderRight: "2px solid var(--md-border)",
                      verticalAlign: "bottom"
                    },
                    children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                  }), q.map((J, ne) => F("th", {
                    colSpan: 4,
                    style: {
                      ...G.th,
                      textAlign: "center",
                      borderRight: "2px solid var(--md-border)",
                      background: `${ja[ne]}10`,
                      color: ja[ne],
                      fontSize: "11px"
                    },
                    children: ["\u0E1B\u0E35\u0E07\u0E1A ", J.be]
                  }, J.be)), M("th", {
                    rowSpan: 2,
                    style: {
                      ...G.th,
                      textAlign: "center",
                      verticalAlign: "bottom"
                    },
                    children: "Growth"
                  }), M("th", {
                    rowSpan: 2,
                    style: {
                      ...G.th,
                      textAlign: "center",
                      verticalAlign: "bottom"
                    },
                    children: "\u0E2A\u0E16\u0E32\u0E19\u0E30"
                  })]
                }), M("tr", {
                  style: {
                    background: "var(--md-surface-2, rgba(0,0,0,.02))"
                  },
                  children: q.map(J => F(hl.Fragment, {
                    children: [M("th", {
                      style: {
                        ...G.th,
                        fontSize: "9px"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), M("th", {
                      style: {
                        ...G.th,
                        fontSize: "9px"
                      },
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), M("th", {
                      style: {
                        ...G.th,
                        fontSize: "9px"
                      },
                      children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                    }), M("th", {
                      style: {
                        ...G.th,
                        fontSize: "9px",
                        borderRight: "2px solid var(--md-border)"
                      },
                      children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                    })]
                  }, J.be))
                })]
              }), M("tbody", {
                children: e.payers.map((J, ne) => {
                  let me = J.flag_low_collection || J.flag_high_outstanding,
                    se = me ? "rgba(220,38,38,.04)" : ne % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))";
                  return F("tr", {
                    style: {
                      background: se
                    },
                    children: [F("td", {
                      style: {
                        ...G.tdName,
                        paddingLeft: "14px",
                        borderRight: "2px solid var(--md-border)"
                      },
                      children: [M("span", {
                        style: {
                          fontWeight: 800
                        },
                        children: J.pttype_code
                      }), M("span", {
                        style: {
                          marginLeft: "4px",
                          fontWeight: 600,
                          color: "var(--md-text-secondary)",
                          fontSize: "10px"
                        },
                        children: J.pttype_name
                      })]
                    }), q.map(pe => {
                      let fe = J.fys[pe.be];
                      return F(hl.Fragment, {
                        children: [M("td", {
                          style: G.td,
                          children: de(fe.opd_visits + fe.ipd_admissions)
                        }), M("td", {
                          style: {
                            ...G.td,
                            fontWeight: 700
                          },
                          children: de(fe.total_income)
                        }), M("td", {
                          style: {
                            ...G.td,
                            color: fe.total_outstanding > 0 ? "#dc2626" : "inherit"
                          },
                          children: de(fe.total_outstanding)
                        }), M("td", {
                          style: {
                            ...G.td,
                            fontWeight: 800,
                            borderRight: "2px solid var(--md-border)",
                            color: fe.collection_rate >= 90 ? "#059669" : fe.collection_rate >= 80 ? "#d97706" : fe.total_income > 0 ? "#dc2626" : "inherit"
                          },
                          children: fe.total_income > 0 ? Ir(fe.collection_rate) : "\u2014"
                        })]
                      }, pe.be)
                    }), M("td", {
                      style: {
                        ...G.td,
                        textAlign: "center"
                      },
                      children: M(Ce, {
                        value: J.income_growth
                      })
                    }), M("td", {
                      style: {
                        ...G.td,
                        textAlign: "center"
                      },
                      children: me ? M("span", {
                        style: G.badge("rgba(220,38,38,.1)", "#dc2626"),
                        children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                      }) : M("span", {
                        style: G.badge("rgba(5,150,105,.1)", "#059669"),
                        children: "\u0E1B\u0E01\u0E15\u0E34"
                      })
                    })]
                  }, J.pttype_code)
                })
              }), M("tfoot", {
                children: F("tr", {
                  style: {
                    background: "rgba(14,165,233,.06)"
                  },
                  children: [M("td", {
                    style: {
                      ...G.td,
                      textAlign: "left",
                      paddingLeft: "14px",
                      fontWeight: 900,
                      borderRight: "2px solid var(--md-border)",
                      borderTop: "2px solid var(--md-border)"
                    },
                    children: "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
                  }), q.map(J => {
                    let ne = L[J.be];
                    return F(hl.Fragment, {
                      children: [M("td", {
                        style: {
                          ...G.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: de(ne.opd_visits + ne.ipd_admissions)
                      }), M("td", {
                        style: {
                          ...G.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: de(ne.total_income)
                      }), M("td", {
                        style: {
                          ...G.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)",
                          color: "#dc2626"
                        },
                        children: de(ne.total_outstanding)
                      }), M("td", {
                        style: {
                          ...G.td,
                          fontWeight: 900,
                          borderRight: "2px solid var(--md-border)",
                          borderTop: "2px solid var(--md-border)",
                          color: ne.collection_rate >= 80 ? "#059669" : "#dc2626"
                        },
                        children: Ir(ne.collection_rate)
                      })]
                    }, J.be)
                  }), M("td", {
                    style: {
                      ...G.td,
                      textAlign: "center",
                      fontWeight: 900,
                      borderTop: "2px solid var(--md-border)"
                    },
                    children: M(Ce, {
                      value: q_(L[q[2].be]?.total_income, L[q[1].be]?.total_income)
                    })
                  }), M("td", {
                    style: {
                      ...G.td,
                      borderTop: "2px solid var(--md-border)"
                    }
                  })]
                })
              })]
            })
          })]
        })]
      })
    })(), !p && e && q.length === 3 && v === "payer-detail" && (() => {
      let re = e.payers.filter(ie => ie._sort_income > 0).slice(0, 12).map(ie => {
        let J = {
          name: ie.pttype_code
        };
        for (let ne of q) J[`fy${ne.be}`] = ie.fys[ne.be].total_income;
        return J
      });
      return F(Li, {
        children: [F("div", {
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
          }), M(wu, {
            width: "100%",
            height: 350,
            children: F(_d, {
              data: re,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [M(wa, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), M(or, {
                dataKey: "name",
                tick: {
                  fontSize: 10,
                  fontWeight: 700
                },
                interval: 0,
                angle: -30,
                textAnchor: "end",
                height: 50
              }), M(ar, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: ie => ie >= 1e6 ? `${(ie/1e6).toFixed(1)}M` : ie >= 1e3 ? `${(ie/1e3).toFixed(0)}K` : ie
              }), M(st, {
                content: M(Pe, {})
              }), M(jt, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), q.map((ie, J) => M(Wt, {
                dataKey: `fy${ie.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${ie.be}`,
                fill: ja[J],
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
          children: e.payers.filter(ie => ie._sort_income > 0).slice(0, 20).map((ie, J) => {
            let ne = ie.flag_low_collection || ie.flag_high_outstanding,
              me = ie.fys[q[2].be];
            return F("div", {
              className: "rounded-2xl p-4",
              style: {
                background: "var(--md-surface)",
                border: ne ? "1.5px solid rgba(220,38,38,.3)" : "1px solid var(--md-border)"
              },
              children: [F("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px"
                },
                children: [F("button", {
                  onClick: () => te(ie),
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
                      color: W_[J % W_.length],
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
                }), ne ? M("span", {
                  style: G.badge("rgba(220,38,38,.1)", "#dc2626"),
                  children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                }) : M("span", {
                  style: G.badge("rgba(5,150,105,.1)", "#059669"),
                  children: "\u0E1B\u0E01\u0E15\u0E34"
                })]
              }), (() => {
                let se = ie.fys[q[2].be],
                  pe = se.opd_drug || 0,
                  fe = se.opd_lab || 0,
                  le = se.opd_xray || 0,
                  ve = pe + fe + le;
                if (ve === 0) return null;
                let ye = pe / ve * 100,
                  Re = fe / ve * 100,
                  Be = le / ve * 100;
                return F("div", {
                  style: {
                    marginBottom: "8px"
                  },
                  children: [F("div", {
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
                    }), F("span", {
                      children: [de(ve), " \u0E1A\u0E32\u0E17"]
                    })]
                  }), F("div", {
                    style: {
                      display: "flex",
                      height: "8px",
                      borderRadius: "99px",
                      overflow: "hidden",
                      background: "var(--md-surface-2, rgba(0,0,0,.04))"
                    },
                    children: [pe > 0 && M("div", {
                      style: {
                        width: `${ye}%`,
                        background: Ri.drug
                      },
                      title: `\u{1F48A} \u0E04\u0E48\u0E32\u0E22\u0E32: ${de(pe)} \u0E1A\u0E32\u0E17 (${ye.toFixed(1)}%)`
                    }), fe > 0 && M("div", {
                      style: {
                        width: `${Re}%`,
                        background: Ri.lab
                      },
                      title: `\u{1F52C} \u0E04\u0E48\u0E32 Lab: ${de(fe)} \u0E1A\u0E32\u0E17 (${Re.toFixed(1)}%)`
                    }), le > 0 && M("div", {
                      style: {
                        width: `${Be}%`,
                        background: Ri.xray
                      },
                      title: `\u2622\uFE0F \u0E04\u0E48\u0E32 X-ray: ${de(le)} \u0E1A\u0E32\u0E17 (${Be.toFixed(1)}%)`
                    })]
                  }), F("div", {
                    style: {
                      display: "flex",
                      gap: "10px",
                      fontSize: "9px",
                      fontWeight: 700,
                      marginTop: "3px"
                    },
                    children: [pe > 0 && F("span", {
                      style: {
                        color: Ri.drug
                      },
                      children: ["\u{1F48A} \u0E22\u0E32 ", ye.toFixed(0), "%"]
                    }), fe > 0 && F("span", {
                      style: {
                        color: Ri.lab
                      },
                      children: ["\u{1F52C} Lab ", Re.toFixed(0), "%"]
                    }), le > 0 && F("span", {
                      style: {
                        color: Ri.xray
                      },
                      children: ["\u2622\uFE0F Xray ", Be.toFixed(0), "%"]
                    })]
                  })]
                })
              })(), F("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "10px"
                },
                children: [M("thead", {
                  children: F("tr", {
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
                  children: q.map((se, pe) => {
                    let fe = ie.fys[se.be];
                    return F("tr", {
                      style: {
                        fontWeight: pe === 2 ? 800 : 600
                      },
                      children: [M("td", {
                        style: {
                          textAlign: "left",
                          padding: "3px 4px",
                          color: ja[pe]
                        },
                        children: se.be
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: de(fe.opd_visits + fe.ipd_admissions)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: de(fe.total_income)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: fe.total_outstanding > 0 ? "#dc2626" : "inherit"
                        },
                        children: de(fe.total_outstanding)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: fe.collection_rate >= 90 ? "#059669" : fe.collection_rate >= 80 ? "#d97706" : "#dc2626"
                        },
                        children: fe.total_income > 0 ? Ir(fe.collection_rate) : "\u2014"
                      })]
                    }, se.be)
                  })
                })]
              }), F("div", {
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
                }), M(Ce, {
                  value: ie.income_growth
                }), me.ipd_avg_rw > 0 && F("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["Avg RW: ", M("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: me.ipd_avg_rw.toFixed(2)
                  })]
                }), me.ipd_avg_los > 0 && F("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["LOS: ", F("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: [me.ipd_avg_los.toFixed(1), "d"]
                  })]
                })]
              })]
            }, ie.pttype_code)
          })
        })]
      })
    })(), !p && v === "diagnosis" && F(Li, {
      children: [F("div", {
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
        }), F("select", {
          value: w || "",
          onChange: L => S(L.target.value || null),
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
          }), (e?.payers || []).map(L => F("option", {
            value: L.pttype_code,
            children: [L.pttype_code, " \u2014 ", L.pttype_name]
          }, L.pttype_code))]
        })]
      }), i?.diagnoses && F("div", {
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
          children: F("div", {
            style: {
              fontSize: "15px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: ["Top \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23 \u2014 \u0E1B\u0E35\u0E07\u0E1A ", i.fiscal_year?.be || ue[2], w && F("span", {
              style: {
                ...G.badge("rgba(124,58,237,.1)", "#7c3aed"),
                marginLeft: "8px"
              },
              children: ["\u0E2A\u0E34\u0E17\u0E18\u0E34: ", w]
            })]
          })
        }), M("div", {
          style: {
            overflowX: "auto"
          },
          children: F("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse"
            },
            children: [M("thead", {
              children: F("tr", {
                style: {
                  background: "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("th", {
                  style: {
                    ...G.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), M("th", {
                  style: {
                    ...G.th,
                    textAlign: "left"
                  },
                  children: "ICD-10"
                }), M("th", {
                  style: {
                    ...G.th,
                    textAlign: "left"
                  },
                  children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23"
                }), M("th", {
                  style: G.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), M("th", {
                  style: G.th,
                  children: "\u0E04\u0E19"
                }), M("th", {
                  style: G.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                }), M("th", {
                  style: G.th,
                  children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                }), M("th", {
                  style: G.th,
                  children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                })]
              })
            }), M("tbody", {
              children: i.diagnoses.map((L, re) => F("tr", {
                style: {
                  background: re % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("td", {
                  style: {
                    ...G.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: re + 1
                }), M("td", {
                  style: {
                    ...G.td,
                    textAlign: "left",
                    fontWeight: 800,
                    fontFamily: "monospace"
                  },
                  children: L.icd10
                }), M("td", {
                  style: G.tdName,
                  children: L.name
                }), M("td", {
                  style: G.td,
                  children: de(L.visits)
                }), M("td", {
                  style: G.td,
                  children: de(L.patients)
                }), M("td", {
                  style: G.td,
                  children: de(L.income)
                }), M("td", {
                  style: {
                    ...G.td,
                    color: (L.outstanding || L.remain || 0) > 0 ? "#dc2626" : "inherit",
                    fontWeight: (L.outstanding || L.remain || 0) > 0 ? 800 : 600
                  },
                  children: de(L.outstanding || L.remain || 0)
                }), M("td", {
                  style: {
                    ...G.td,
                    fontWeight: 800,
                    color: L.collection_rate >= 90 ? "#059669" : L.collection_rate >= 80 ? "#d97706" : "#dc2626"
                  },
                  children: Ir(L.collection_rate)
                })]
              }, L.icd10))
            })]
          })
        })]
      })]
    }), !p && v === "patient-insight" && (a ? (() => {
      let L = a.loyalty,
        re = a.demographics,
        ie = a.inactive,
        J = a.fiscal_year?.be,
        ne = re.age_bands,
        me = ne.lt18 + ne.a18_34 + ne.a35_59 + ne.gte60,
        se = re.sex.male + re.sex.female,
        pe = L.total_unique - se,
        fe = le => le ? new Date(le).toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }) : "\u2014";
      return F(Li, {
        children: [F("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px"
          },
          children: [F("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #0284c7"
            },
            children: [F("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: ["\u{1F465} \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E1B\u0E35\u0E07\u0E1A ", J]
            }), M("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#0284c7",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: de(L.total_unique)
            }), F("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [de(L.total_visits), " visits \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", M("b", {
                children: L.avg_visits_per_patient
              }), " \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19"]
            })]
          }), F("div", {
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
              children: de(L.new_patients)
            }), F("div", {
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
                children: Ir(L.new_pct)
              }), " \u0E02\u0E2D\u0E07 ", de(L.total_unique), " \u0E23\u0E32\u0E22"]
            })]
          }), F("div", {
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
              children: de(L.returning_patients)
            }), F("div", {
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
                children: Ir(L.returning_pct)
              }), " \xB7 Retention rate"]
            })]
          }), F("div", {
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
              children: de(L.total_income)
            }), F("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: ["\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", M("b", {
                children: de(L.total_unique > 0 ? Math.round(L.total_income / L.total_unique) : 0)
              }), " \u0E1A\u0E32\u0E17/\u0E04\u0E19"]
            })]
          })]
        }), F("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "12px"
          },
          children: [F("div", {
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
              val: ne.lt18,
              color: "#3b82f6"
            }, {
              label: "18-34 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19\u0E15\u0E49\u0E19)",
              val: ne.a18_34,
              color: "#10b981"
            }, {
              label: "35-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E01\u0E25\u0E32\u0E07)",
              val: ne.a35_59,
              color: "#f59e0b"
            }, {
              label: "60+ \u0E1B\u0E35 (\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38)",
              val: ne.gte60,
              color: "#ef4444"
            }].map(le => {
              let ve = me > 0 ? le.val / me * 100 : 0;
              return F("div", {
                style: {
                  marginBottom: "10px"
                },
                children: [F("div", {
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
                    children: le.label
                  }), F("span", {
                    style: {
                      color: le.color,
                      fontVariantNumeric: "tabular-nums"
                    },
                    children: [de(le.val), " ", F("span", {
                      style: {
                        color: "var(--md-text-tertiary)",
                        fontWeight: 600
                      },
                      children: ["(", ve.toFixed(1), "%)"]
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
                      width: `${ve}%`,
                      height: "100%",
                      background: le.color,
                      borderRadius: "99px",
                      transition: "width .4s ease"
                    }
                  })
                })]
              }, le.label)
            })]
          }), F("div", {
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
            }), F("div", {
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
                }].map(le => {
                  let ve = se > 0 ? le.val / se * 100 : 0;
                  return F("div", {
                    children: [F("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "4px"
                      },
                      children: [F("span", {
                        style: {
                          fontSize: "12px",
                          fontWeight: 700,
                          color: le.color
                        },
                        children: [le.icon, " ", le.label]
                      }), M("span", {
                        style: {
                          fontSize: "14px",
                          fontWeight: 900,
                          color: le.color,
                          fontVariantNumeric: "tabular-nums"
                        },
                        children: de(le.val)
                      })]
                    }), F("div", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        marginBottom: "4px"
                      },
                      children: [ve.toFixed(1), "%"]
                    }), M("div", {
                      style: {
                        height: "6px",
                        background: "var(--md-surface-2, rgba(0,0,0,.04))",
                        borderRadius: "99px",
                        overflow: "hidden"
                      },
                      children: M("div", {
                        style: {
                          width: `${ve}%`,
                          height: "100%",
                          background: le.color,
                          borderRadius: "99px"
                        }
                      })
                    })]
                  }, le.label)
                }), pe > 0 && F("div", {
                  style: {
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: ["\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38: ", de(pe), " \u0E23\u0E32\u0E22"]
                })
              ]
            })]
          })]
        }), F("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [F("div", {
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
            }), F("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: ["Total \u0E17\u0E35\u0E48\u0E40\u0E04\u0E22\u0E21\u0E32\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", de(ie.total_patients_ever), " \u0E23\u0E32\u0E22"]
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
            }].map(le => F("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: `${le.color}08`,
                border: `1px solid ${le.color}25`
              },
              children: [M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 700,
                  color: le.color,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  marginBottom: "4px"
                },
                children: le.label
              }), M("div", {
                style: {
                  fontSize: "22px",
                  fontWeight: 900,
                  color: le.color,
                  fontVariantNumeric: "tabular-nums"
                },
                children: de(le.val)
              }), M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-secondary)",
                  marginTop: "4px"
                },
                children: le.hint
              })]
            }, le.label))
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
          }].map(le => F("div", {
            className: "rounded-2xl",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              overflow: "hidden"
            },
            children: [F("div", {
              style: {
                padding: "12px 16px",
                borderBottom: "2px solid var(--md-border)",
                background: `linear-gradient(135deg, ${le.accent}08, transparent)`
              },
              children: [M("div", {
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                  color: le.accent
                },
                children: le.title
              }), M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: le.hint
              })]
            }), M("div", {
              style: {
                overflowX: "auto",
                maxHeight: "480px",
                overflowY: "auto"
              },
              children: F("table", {
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
                  children: F("tr", {
                    children: [M("th", {
                      style: {
                        ...G.th,
                        textAlign: "center",
                        width: "32px"
                      },
                      children: "#"
                    }), M("th", {
                      style: {
                        ...G.th,
                        textAlign: "left"
                      },
                      children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                    }), M("th", {
                      style: G.th,
                      children: "\u0E2D\u0E32\u0E22\u0E38"
                    }), M("th", {
                      style: G.th,
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), M("th", {
                      style: G.th,
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), M("th", {
                      style: {
                        ...G.th,
                        textAlign: "left"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                    })]
                  })
                }), F("tbody", {
                  children: [(le.list || []).map((ve, ye) => F("tr", {
                    style: {
                      background: ye % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                    },
                    children: [M("td", {
                      style: {
                        ...G.td,
                        textAlign: "center",
                        color: "var(--md-text-tertiary)"
                      },
                      children: ye + 1
                    }), F("td", {
                      style: G.tdName,
                      children: [M("div", {
                        style: {
                          fontFamily: "monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "var(--md-text-tertiary)"
                        },
                        children: ve.hn
                      }), M("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: 700
                        },
                        children: ve.pt_name || "\u2014"
                      })]
                    }), M("td", {
                      style: G.td,
                      children: ve.age || "\u2014"
                    }), M("td", {
                      style: {
                        ...G.td,
                        fontWeight: 800,
                        color: le.accent
                      },
                      children: de(ve.visit_count)
                    }), M("td", {
                      style: {
                        ...G.td,
                        fontWeight: 800
                      },
                      children: de(ve.total_income)
                    }), M("td", {
                      style: {
                        ...G.td,
                        textAlign: "left",
                        fontSize: "10px",
                        color: "var(--md-text-secondary)"
                      },
                      children: fe(ve.last_visit)
                    })]
                  }, ve.hn)), (!le.list || le.list.length === 0) && M("tr", {
                    children: M("td", {
                      colSpan: 6,
                      style: {
                        ...G.td,
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
          }, le.title))
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
      let L = s.payers || [],
        re = s.grand_total || {},
        ie = re.total_outstanding || 0;
      return F(Li, {
        children: [F("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [F("div", {
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
            }), F("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: [s.window?.from, " \u2192 ", s.window?.to, " \xB7 \u0E19\u0E31\u0E1A\u0E08\u0E32\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E21\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"]
            })]
          }), F("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "10px"
            },
            children: [dl.map((J, ne) => {
              let me = re[J] || 0,
                se = ie > 0 ? me / ie * 100 : 0;
              return F("div", {
                style: {
                  padding: "12px",
                  borderRadius: "10px",
                  background: `${Ni[ne]}10`,
                  borderLeft: `4px solid ${Ni[ne]}`
                },
                children: [M("div", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 800,
                    color: Ni[ne],
                    textTransform: "uppercase",
                    letterSpacing: ".04em"
                  },
                  children: ml[ne]
                }), M("div", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    fontFamily: "monospace",
                    marginTop: "4px"
                  },
                  children: de(me)
                }), F("div", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: Ni[ne],
                    marginTop: "2px"
                  },
                  children: [se.toFixed(1), "%"]
                })]
              }, J)
            }), F("div", {
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
                children: de(ie)
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
        }), F("div", {
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
          }), F("div", {
            style: {
              padding: "12px 18px"
            },
            children: [L.map((J, ne) => {
              let me = dl.map((se, pe) => ({
                v: J[se] || 0,
                color: Ni[pe],
                label: ml[pe]
              }));
              return F("div", {
                style: {
                  marginBottom: "12px"
                },
                children: [F("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "4px"
                  },
                  children: [F("button", {
                    onClick: () => te(J),
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
                      children: J.pttype_code
                    }), M("span", {
                      style: {
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--md-text-secondary)",
                        marginLeft: "6px"
                      },
                      children: J.pttype_name
                    })]
                  }), F("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 900,
                      fontFamily: "monospace",
                      color: "var(--md-text-primary)"
                    },
                    children: [de(J.total_outstanding), " \u0E1A\u0E32\u0E17"]
                  })]
                }), M("div", {
                  style: {
                    display: "flex",
                    height: "24px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "var(--md-surface-2, rgba(0,0,0,.04))"
                  },
                  children: me.map((se, pe) => {
                    if (se.v === 0) return null;
                    let fe = J.total_outstanding > 0 ? se.v / J.total_outstanding * 100 : 0;
                    return M("div", {
                      style: {
                        width: `${fe}%`,
                        background: se.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                      },
                      title: `${se.label}: ${de(se.v)} \u0E1A\u0E32\u0E17 (${fe.toFixed(1)}%)`,
                      children: fe >= 8 && F("span", {
                        style: {
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#fff",
                          textShadow: "0 0 3px rgba(0,0,0,.3)"
                        },
                        children: [fe.toFixed(0), "%"]
                      })
                    }, pe)
                  })
                })]
              }, J.pttype_code)
            }), L.length === 0 && M("div", {
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
          children: ml.map((J, ne) => F("div", {
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
                background: Ni[ne]
              }
            }), M("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--md-text-secondary)"
              },
              children: J
            })]
          }, J))
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
    })), K && M("div", {
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
      onClick: he,
      children: F("div", {
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
        onClick: L => L.stopPropagation(),
        children: [F("div", {
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
          children: [F("div", {
            children: [F("div", {
              style: {
                fontSize: "15px",
                fontWeight: 900,
                color: "var(--md-text-primary)"
              },
              children: ["\u{1F50D} \u0E23\u0E32\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u2014 \u0E2A\u0E34\u0E17\u0E18\u0E34 ", K.pttype_code]
            }), M("div", {
              style: {
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginTop: "2px"
              },
              children: K.pttype_name
            })]
          }), F("div", {
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
            }), F("select", {
              value: O,
              onChange: L => E(L.target.value),
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
              onClick: he,
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
          children: _ ? M("div", {
            style: {
              padding: "40px",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14..."
          }) : W?.patients?.length ? F("table", {
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
              children: F("tr", {
                children: [M("th", {
                  style: {
                    ...G.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), M("th", {
                  style: {
                    ...G.th,
                    textAlign: "left"
                  },
                  children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                }), M("th", {
                  style: G.th,
                  children: "\u0E2D\u0E32\u0E22\u0E38"
                }), M("th", {
                  style: G.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), M("th", {
                  style: G.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                }), M("th", {
                  style: G.th,
                  children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                }), M("th", {
                  style: G.th,
                  children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                }), M("th", {
                  style: {
                    ...G.th,
                    textAlign: "left"
                  },
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                })]
              })
            }), M("tbody", {
              children: W.patients.map((L, re) => F("tr", {
                style: {
                  background: re % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("td", {
                  style: {
                    ...G.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: re + 1
                }), F("td", {
                  style: G.tdName,
                  children: [M("div", {
                    style: {
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: L.hn
                  }), M("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700
                    },
                    children: L.pt_name || "\u2014"
                  })]
                }), M("td", {
                  style: G.td,
                  children: L.age || "\u2014"
                }), M("td", {
                  style: G.td,
                  children: de(L.visit_count)
                }), M("td", {
                  style: {
                    ...G.td,
                    fontWeight: 800
                  },
                  children: de(L.total_income)
                }), M("td", {
                  style: {
                    ...G.td,
                    fontWeight: 800,
                    color: L.total_outstanding > 0 ? "#dc2626" : "inherit"
                  },
                  children: de(L.total_outstanding)
                }), M("td", {
                  style: {
                    ...G.td,
                    fontWeight: 800,
                    color: L.collection_rate >= 90 ? "#059669" : L.collection_rate >= 80 ? "#d97706" : "#dc2626"
                  },
                  children: Ir(L.collection_rate)
                }), M("td", {
                  style: {
                    ...G.td,
                    textAlign: "left",
                    fontSize: "10px",
                    color: "var(--md-text-secondary)"
                  },
                  children: L.last_visit ? new Date(L.last_visit).toLocaleDateString("th-TH", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  }) : "\u2014"
                })]
              }, L.hn))
            })]
          }) : M("div", {
            style: {
              padding: "40px",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: W?.error || "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E19\u0E35\u0E49 (\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19)"
          })
        }), F("div", {
          style: {
            padding: "8px 20px",
            borderTop: "1px solid var(--md-border)",
            fontSize: "10px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)",
            textAlign: "center"
          },
          children: [W?.patients?.length ? `\u0E41\u0E2A\u0E14\u0E07 ${W.patients.length} \u0E23\u0E32\u0E22 (Top ${W.limit||50})` : "", "\xB7 \u0E1B\u0E35\u0E07\u0E1A ", W?.fiscal_year?.be || ""]
        })]
      })
    }), M(Td, {
      data: A,
      theme: "customer",
      title: "AI Customer Intelligence"
    }), !p && e && F("div", {
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
var qoe = hl.memo(e5);
export {
  qoe as
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