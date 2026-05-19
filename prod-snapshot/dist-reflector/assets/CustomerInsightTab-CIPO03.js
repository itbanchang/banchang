var z_ = Object.create;
var hl = Object.defineProperty;
var F_ = Object.getOwnPropertyDescriptor;
var $_ = Object.getOwnPropertyNames;
var U_ = Object.getPrototypeOf,
  H_ = Object.prototype.hasOwnProperty;
var I = (t, e) => () => (e || t((e = {
    exports: {}
  }).exports, e), e.exports),
  G_ = (t, e) => {
    for (var r in e) hl(t, r, {
      get: e[r],
      enumerable: !0
    })
  },
  K_ = (t, e, r, n) => {
    if (e && typeof e == "object" || typeof e == "function")
      for (let i of $_(e)) !H_.call(t, i) && i !== r && hl(t, i, {
        get: () => e[i],
        enumerable: !(n = F_(e, i)) || n.enumerable
      });
    return t
  };
var Q = (t, e, r) => (r = t != null ? z_(U_(t)) : {}, K_(e || !t || !t.__esModule ? hl(r, "default", {
  value: t,
  enumerable: !0
}) : r, t));
var te = I((r5, Ed) => {
  var X_ = Array.isArray;
  Ed.exports = X_
});
var yl = I((n5, jd) => {
  var Y_ = typeof global == "object" && global && global.Object === Object && global;
  jd.exports = Y_
});
var Ie = I((i5, Md) => {
  var Z_ = yl(),
    J_ = typeof self == "object" && self && self.Object === Object && self,
    Q_ = Z_ || J_ || Function("return this")();
  Md.exports = Q_
});
var mn = I((o5, Cd) => {
  var tP = Ie(),
    eP = tP.Symbol;
  Cd.exports = eP
});
var Nd = I((a5, Dd) => {
  var Id = mn(),
    kd = Object.prototype,
    rP = kd.hasOwnProperty,
    nP = kd.toString,
    Li = Id ? Id.toStringTag : void 0;

  function iP(t) {
    var e = rP.call(t, Li),
      r = t[Li];
    try {
      t[Li] = void 0;
      var n = !0
    } catch {}
    var i = nP.call(t);
    return n && (e ? t[Li] = r : delete t[Li]), i
  }
  Dd.exports = iP
});
var Ld = I((u5, Rd) => {
  var oP = Object.prototype,
    aP = oP.toString;

  function uP(t) {
    return aP.call(t)
  }
  Rd.exports = uP
});
var Ue = I((s5, Wd) => {
  var Bd = mn(),
    sP = Nd(),
    lP = Ld(),
    cP = "[object Null]",
    fP = "[object Undefined]",
    qd = Bd ? Bd.toStringTag : void 0;

  function pP(t) {
    return t == null ? t === void 0 ? fP : cP : qd && qd in Object(t) ? sP(t) : lP(t)
  }
  Wd.exports = pP
});
var He = I((l5, zd) => {
  function dP(t) {
    return t != null && typeof t == "object"
  }
  zd.exports = dP
});
var kr = I((c5, Fd) => {
  var mP = Ue(),
    hP = He(),
    yP = "[object Symbol]";

  function vP(t) {
    return typeof t == "symbol" || hP(t) && mP(t) == yP
  }
  Fd.exports = vP
});
var ja = I((f5, $d) => {
  var gP = te(),
    bP = kr(),
    xP = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    wP = /^\w*$/;

  function OP(t, e) {
    if (gP(t)) return !1;
    var r = typeof t;
    return r == "number" || r == "symbol" || r == "boolean" || t == null || bP(t) ? !0 : wP.test(t) || !xP.test(t) || e != null && t in Object(e)
  }
  $d.exports = OP
});
var be = I((p5, Ud) => {
  function SP(t) {
    var e = typeof t;
    return t != null && (e == "object" || e == "function")
  }
  Ud.exports = SP
});
var It = I((d5, Hd) => {
  var AP = Ue(),
    _P = be(),
    PP = "[object AsyncFunction]",
    TP = "[object Function]",
    EP = "[object GeneratorFunction]",
    jP = "[object Proxy]";

  function MP(t) {
    if (!_P(t)) return !1;
    var e = AP(t);
    return e == TP || e == EP || e == PP || e == jP
  }
  Hd.exports = MP
});
var Kd = I((m5, Gd) => {
  var CP = Ie(),
    IP = CP["__core-js_shared__"];
  Gd.exports = IP
});
var Yd = I((h5, Xd) => {
  var vl = Kd(),
    Vd = function() {
      var t = /[^.]+$/.exec(vl && vl.keys && vl.keys.IE_PROTO || "");
      return t ? "Symbol(src)_1." + t : ""
    }();

  function kP(t) {
    return !!Vd && Vd in t
  }
  Xd.exports = kP
});
var gl = I((y5, Zd) => {
  var DP = Function.prototype,
    NP = DP.toString;

  function RP(t) {
    if (t != null) {
      try {
        return NP.call(t)
      } catch {}
      try {
        return t + ""
      } catch {}
    }
    return ""
  }
  Zd.exports = RP
});
var Qd = I((v5, Jd) => {
  var LP = It(),
    BP = Yd(),
    qP = be(),
    WP = gl(),
    zP = /[\\^$.*+?()[\]{}|]/g,
    FP = /^\[object .+?Constructor\]$/,
    $P = Function.prototype,
    UP = Object.prototype,
    HP = $P.toString,
    GP = UP.hasOwnProperty,
    KP = RegExp("^" + HP.call(GP).replace(zP, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

  function VP(t) {
    if (!qP(t) || BP(t)) return !1;
    var e = LP(t) ? KP : FP;
    return e.test(WP(t))
  }
  Jd.exports = VP
});
var em = I((g5, tm) => {
  function XP(t, e) {
    return t?.[e]
  }
  tm.exports = XP
});
var yr = I((b5, rm) => {
  var YP = Qd(),
    ZP = em();

  function JP(t, e) {
    var r = ZP(t, e);
    return YP(r) ? r : void 0
  }
  rm.exports = JP
});
var Bi = I((x5, nm) => {
  var QP = yr(),
    tT = QP(Object, "create");
  nm.exports = tT
});
var am = I((w5, om) => {
  var im = Bi();

  function eT() {
    this.__data__ = im ? im(null) : {}, this.size = 0
  }
  om.exports = eT
});
var sm = I((O5, um) => {
  function rT(t) {
    var e = this.has(t) && delete this.__data__[t];
    return this.size -= e ? 1 : 0, e
  }
  um.exports = rT
});
var cm = I((S5, lm) => {
  var nT = Bi(),
    iT = "__lodash_hash_undefined__",
    oT = Object.prototype,
    aT = oT.hasOwnProperty;

  function uT(t) {
    var e = this.__data__;
    if (nT) {
      var r = e[t];
      return r === iT ? void 0 : r
    }
    return aT.call(e, t) ? e[t] : void 0
  }
  lm.exports = uT
});
var pm = I((A5, fm) => {
  var sT = Bi(),
    lT = Object.prototype,
    cT = lT.hasOwnProperty;

  function fT(t) {
    var e = this.__data__;
    return sT ? e[t] !== void 0 : cT.call(e, t)
  }
  fm.exports = fT
});
var mm = I((_5, dm) => {
  var pT = Bi(),
    dT = "__lodash_hash_undefined__";

  function mT(t, e) {
    var r = this.__data__;
    return this.size += this.has(t) ? 0 : 1, r[t] = pT && e === void 0 ? dT : e, this
  }
  dm.exports = mT
});
var ym = I((P5, hm) => {
  var hT = am(),
    yT = sm(),
    vT = cm(),
    gT = pm(),
    bT = mm();

  function hn(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }
  hn.prototype.clear = hT;
  hn.prototype.delete = yT;
  hn.prototype.get = vT;
  hn.prototype.has = gT;
  hn.prototype.set = bT;
  hm.exports = hn
});
var gm = I((T5, vm) => {
  function xT() {
    this.__data__ = [], this.size = 0
  }
  vm.exports = xT
});
var Ma = I((E5, bm) => {
  function wT(t, e) {
    return t === e || t !== t && e !== e
  }
  bm.exports = wT
});
var qi = I((j5, xm) => {
  var OT = Ma();

  function ST(t, e) {
    for (var r = t.length; r--;)
      if (OT(t[r][0], e)) return r;
    return -1
  }
  xm.exports = ST
});
var Om = I((M5, wm) => {
  var AT = qi(),
    _T = Array.prototype,
    PT = _T.splice;

  function TT(t) {
    var e = this.__data__,
      r = AT(e, t);
    if (r < 0) return !1;
    var n = e.length - 1;
    return r == n ? e.pop() : PT.call(e, r, 1), --this.size, !0
  }
  wm.exports = TT
});
var Am = I((C5, Sm) => {
  var ET = qi();

  function jT(t) {
    var e = this.__data__,
      r = ET(e, t);
    return r < 0 ? void 0 : e[r][1]
  }
  Sm.exports = jT
});
var Pm = I((I5, _m) => {
  var MT = qi();

  function CT(t) {
    return MT(this.__data__, t) > -1
  }
  _m.exports = CT
});
var Em = I((k5, Tm) => {
  var IT = qi();

  function kT(t, e) {
    var r = this.__data__,
      n = IT(r, t);
    return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this
  }
  Tm.exports = kT
});
var Wi = I((D5, jm) => {
  var DT = gm(),
    NT = Om(),
    RT = Am(),
    LT = Pm(),
    BT = Em();

  function yn(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }
  yn.prototype.clear = DT;
  yn.prototype.delete = NT;
  yn.prototype.get = RT;
  yn.prototype.has = LT;
  yn.prototype.set = BT;
  jm.exports = yn
});
var Ca = I((N5, Mm) => {
  var qT = yr(),
    WT = Ie(),
    zT = qT(WT, "Map");
  Mm.exports = zT
});
var km = I((R5, Im) => {
  var Cm = ym(),
    FT = Wi(),
    $T = Ca();

  function UT() {
    this.size = 0, this.__data__ = {
      hash: new Cm,
      map: new($T || FT),
      string: new Cm
    }
  }
  Im.exports = UT
});
var Nm = I((L5, Dm) => {
  function HT(t) {
    var e = typeof t;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null
  }
  Dm.exports = HT
});
var zi = I((B5, Rm) => {
  var GT = Nm();

  function KT(t, e) {
    var r = t.__data__;
    return GT(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map
  }
  Rm.exports = KT
});
var Bm = I((q5, Lm) => {
  var VT = zi();

  function XT(t) {
    var e = VT(this, t).delete(t);
    return this.size -= e ? 1 : 0, e
  }
  Lm.exports = XT
});
var Wm = I((W5, qm) => {
  var YT = zi();

  function ZT(t) {
    return YT(this, t).get(t)
  }
  qm.exports = ZT
});
var Fm = I((z5, zm) => {
  var JT = zi();

  function QT(t) {
    return JT(this, t).has(t)
  }
  zm.exports = QT
});
var Um = I((F5, $m) => {
  var tE = zi();

  function eE(t, e) {
    var r = tE(this, t),
      n = r.size;
    return r.set(t, e), this.size += r.size == n ? 0 : 1, this
  }
  $m.exports = eE
});
var Ia = I(($5, Hm) => {
  var rE = km(),
    nE = Bm(),
    iE = Wm(),
    oE = Fm(),
    aE = Um();

  function vn(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }
  vn.prototype.clear = rE;
  vn.prototype.delete = nE;
  vn.prototype.get = iE;
  vn.prototype.has = oE;
  vn.prototype.set = aE;
  Hm.exports = vn
});
var xl = I((U5, Km) => {
  var Gm = Ia(),
    uE = "Expected a function";

  function bl(t, e) {
    if (typeof t != "function" || e != null && typeof e != "function") throw new TypeError(uE);
    var r = function() {
      var n = arguments,
        i = e ? e.apply(this, n) : n[0],
        o = r.cache;
      if (o.has(i)) return o.get(i);
      var a = t.apply(this, n);
      return r.cache = o.set(i, a) || o, a
    };
    return r.cache = new(bl.Cache || Gm), r
  }
  bl.Cache = Gm;
  Km.exports = bl
});
var Xm = I((H5, Vm) => {
  var sE = xl(),
    lE = 500;

  function cE(t) {
    var e = sE(t, function(n) {
        return r.size === lE && r.clear(), n
      }),
      r = e.cache;
    return e
  }
  Vm.exports = cE
});
var Zm = I((G5, Ym) => {
  var fE = Xm(),
    pE = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    dE = /\\(\\)?/g,
    mE = fE(function(t) {
      var e = [];
      return t.charCodeAt(0) === 46 && e.push(""), t.replace(pE, function(r, n, i, o) {
        e.push(i ? o.replace(dE, "$1") : n || r)
      }), e
    });
  Ym.exports = mE
});
var ka = I((K5, Jm) => {
  function hE(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length, i = Array(n); ++r < n;) i[r] = e(t[r], r, t);
    return i
  }
  Jm.exports = hE
});
var ih = I((V5, nh) => {
  var Qm = mn(),
    yE = ka(),
    vE = te(),
    gE = kr(),
    bE = 1 / 0,
    th = Qm ? Qm.prototype : void 0,
    eh = th ? th.toString : void 0;

  function rh(t) {
    if (typeof t == "string") return t;
    if (vE(t)) return yE(t, rh) + "";
    if (gE(t)) return eh ? eh.call(t) : "";
    var e = t + "";
    return e == "0" && 1 / t == -bE ? "-0" : e
  }
  nh.exports = rh
});
var wl = I((X5, oh) => {
  var xE = ih();

  function wE(t) {
    return t == null ? "" : xE(t)
  }
  oh.exports = wE
});
var Ol = I((Y5, ah) => {
  var OE = te(),
    SE = ja(),
    AE = Zm(),
    _E = wl();

  function PE(t, e) {
    return OE(t) ? t : SE(t, e) ? [t] : AE(_E(t))
  }
  ah.exports = PE
});
var Fi = I((Z5, uh) => {
  var TE = kr(),
    EE = 1 / 0;

  function jE(t) {
    if (typeof t == "string" || TE(t)) return t;
    var e = t + "";
    return e == "0" && 1 / t == -EE ? "-0" : e
  }
  uh.exports = jE
});
var Da = I((J5, sh) => {
  var ME = Ol(),
    CE = Fi();

  function IE(t, e) {
    e = ME(e, t);
    for (var r = 0, n = e.length; t != null && r < n;) t = t[CE(e[r++])];
    return r && r == n ? t : void 0
  }
  sh.exports = IE
});
var Dr = I((Q5, lh) => {
  var kE = Da();

  function DE(t, e, r) {
    var n = t == null ? void 0 : kE(t, e);
    return n === void 0 ? r : n
  }
  lh.exports = DE
});
var xe = I((tH, ch) => {
  function NE(t) {
    return t == null
  }
  ch.exports = NE
});
var Na = I((eH, fh) => {
  var RE = Ue(),
    LE = te(),
    BE = He(),
    qE = "[object String]";

  function WE(t) {
    return typeof t == "string" || !LE(t) && BE(t) && RE(t) == qE
  }
  fh.exports = WE
});
var dh = I(At => {
  "use strict";
  var Sl = Symbol.for("react.element"),
    Al = Symbol.for("react.portal"),
    Ra = Symbol.for("react.fragment"),
    La = Symbol.for("react.strict_mode"),
    Ba = Symbol.for("react.profiler"),
    qa = Symbol.for("react.provider"),
    Wa = Symbol.for("react.context"),
    zE = Symbol.for("react.server_context"),
    za = Symbol.for("react.forward_ref"),
    Fa = Symbol.for("react.suspense"),
    $a = Symbol.for("react.suspense_list"),
    Ua = Symbol.for("react.memo"),
    Ha = Symbol.for("react.lazy"),
    FE = Symbol.for("react.offscreen"),
    ph;
  ph = Symbol.for("react.module.reference");

  function we(t) {
    if (typeof t == "object" && t !== null) {
      var e = t.$$typeof;
      switch (e) {
        case Sl:
          switch (t = t.type, t) {
            case Ra:
            case Ba:
            case La:
            case Fa:
            case $a:
              return t;
            default:
              switch (t = t && t.$$typeof, t) {
                case zE:
                case Wa:
                case za:
                case Ha:
                case Ua:
                case qa:
                  return t;
                default:
                  return e
              }
          }
        case Al:
          return e
      }
    }
  }
  At.ContextConsumer = Wa;
  At.ContextProvider = qa;
  At.Element = Sl;
  At.ForwardRef = za;
  At.Fragment = Ra;
  At.Lazy = Ha;
  At.Memo = Ua;
  At.Portal = Al;
  At.Profiler = Ba;
  At.StrictMode = La;
  At.Suspense = Fa;
  At.SuspenseList = $a;
  At.isAsyncMode = function() {
    return !1
  };
  At.isConcurrentMode = function() {
    return !1
  };
  At.isContextConsumer = function(t) {
    return we(t) === Wa
  };
  At.isContextProvider = function(t) {
    return we(t) === qa
  };
  At.isElement = function(t) {
    return typeof t == "object" && t !== null && t.$$typeof === Sl
  };
  At.isForwardRef = function(t) {
    return we(t) === za
  };
  At.isFragment = function(t) {
    return we(t) === Ra
  };
  At.isLazy = function(t) {
    return we(t) === Ha
  };
  At.isMemo = function(t) {
    return we(t) === Ua
  };
  At.isPortal = function(t) {
    return we(t) === Al
  };
  At.isProfiler = function(t) {
    return we(t) === Ba
  };
  At.isStrictMode = function(t) {
    return we(t) === La
  };
  At.isSuspense = function(t) {
    return we(t) === Fa
  };
  At.isSuspenseList = function(t) {
    return we(t) === $a
  };
  At.isValidElementType = function(t) {
    return typeof t == "string" || typeof t == "function" || t === Ra || t === Ba || t === La || t === Fa || t === $a || t === FE || typeof t == "object" && t !== null && (t.$$typeof === Ha || t.$$typeof === Ua || t.$$typeof === qa || t.$$typeof === Wa || t.$$typeof === za || t.$$typeof === ph || t.getModuleId !== void 0)
  };
  At.typeOf = we
});
var hh = I((nH, mh) => {
  "use strict";
  mh.exports = dh()
});
var _l = I((iH, yh) => {
  var $E = Ue(),
    UE = He(),
    HE = "[object Number]";

  function GE(t) {
    return typeof t == "number" || UE(t) && $E(t) == HE
  }
  yh.exports = GE
});
var Pl = I((oH, vh) => {
  var KE = _l();

  function VE(t) {
    return KE(t) && t != +t
  }
  vh.exports = VE
});
var qh = I((AH, Bh) => {
  function dj(t, e, r) {
    var n = -1,
      i = t.length;
    e < 0 && (e = -e > i ? 0 : i + e), r = r > i ? i : r, r < 0 && (r += i), i = e > r ? 0 : r - e >>> 0, e >>>= 0;
    for (var o = Array(i); ++n < i;) o[n] = t[n + e];
    return o
  }
  Bh.exports = dj
});
var zh = I((_H, Wh) => {
  var mj = qh();

  function hj(t, e, r) {
    var n = t.length;
    return r = r === void 0 ? n : r, !e && r >= n ? t : mj(t, e, r)
  }
  Wh.exports = hj
});
var Wl = I((PH, Fh) => {
  var yj = "\\ud800-\\udfff",
    vj = "\\u0300-\\u036f",
    gj = "\\ufe20-\\ufe2f",
    bj = "\\u20d0-\\u20ff",
    xj = vj + gj + bj,
    wj = "\\ufe0e\\ufe0f",
    Oj = "\\u200d",
    Sj = RegExp("[" + Oj + yj + xj + wj + "]");

  function Aj(t) {
    return Sj.test(t)
  }
  Fh.exports = Aj
});
var Uh = I((TH, $h) => {
  function _j(t) {
    return t.split("")
  }
  $h.exports = _j
});
var Jh = I((EH, Zh) => {
  var Hh = "\\ud800-\\udfff",
    Pj = "\\u0300-\\u036f",
    Tj = "\\ufe20-\\ufe2f",
    Ej = "\\u20d0-\\u20ff",
    jj = Pj + Tj + Ej,
    Mj = "\\ufe0e\\ufe0f",
    Cj = "[" + Hh + "]",
    zl = "[" + jj + "]",
    Fl = "\\ud83c[\\udffb-\\udfff]",
    Ij = "(?:" + zl + "|" + Fl + ")",
    Gh = "[^" + Hh + "]",
    Kh = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    Vh = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    kj = "\\u200d",
    Xh = Ij + "?",
    Yh = "[" + Mj + "]?",
    Dj = "(?:" + kj + "(?:" + [Gh, Kh, Vh].join("|") + ")" + Yh + Xh + ")*",
    Nj = Yh + Xh + Dj,
    Rj = "(?:" + [Gh + zl + "?", zl, Kh, Vh, Cj].join("|") + ")",
    Lj = RegExp(Fl + "(?=" + Fl + ")|" + Rj + Nj, "g");

  function Bj(t) {
    return t.match(Lj) || []
  }
  Zh.exports = Bj
});
var ty = I((jH, Qh) => {
  var qj = Uh(),
    Wj = Wl(),
    zj = Jh();

  function Fj(t) {
    return Wj(t) ? zj(t) : qj(t)
  }
  Qh.exports = Fj
});
var ry = I((MH, ey) => {
  var $j = zh(),
    Uj = Wl(),
    Hj = ty(),
    Gj = wl();

  function Kj(t) {
    return function(e) {
      e = Gj(e);
      var r = Uj(e) ? Hj(e) : void 0,
        n = r ? r[0] : e.charAt(0),
        i = r ? $j(r, 1).join("") : e.slice(1);
      return n[t]() + i
    }
  }
  ey.exports = Kj
});
var Xa = I((CH, ny) => {
  var Vj = ry(),
    Xj = Vj("toUpperCase");
  ny.exports = Xj
});
var Ey = I((NG, Ty) => {
  var PM = Wi();

  function TM() {
    this.__data__ = new PM, this.size = 0
  }
  Ty.exports = TM
});
var My = I((RG, jy) => {
  function EM(t) {
    var e = this.__data__,
      r = e.delete(t);
    return this.size = e.size, r
  }
  jy.exports = EM
});
var Iy = I((LG, Cy) => {
  function jM(t) {
    return this.__data__.get(t)
  }
  Cy.exports = jM
});
var Dy = I((BG, ky) => {
  function MM(t) {
    return this.__data__.has(t)
  }
  ky.exports = MM
});
var Ry = I((qG, Ny) => {
  var CM = Wi(),
    IM = Ca(),
    kM = Ia(),
    DM = 200;

  function NM(t, e) {
    var r = this.__data__;
    if (r instanceof CM) {
      var n = r.__data__;
      if (!IM || n.length < DM - 1) return n.push([t, e]), this.size = ++r.size, this;
      r = this.__data__ = new kM(n)
    }
    return r.set(t, e), this.size = r.size, this
  }
  Ny.exports = NM
});
var Oc = I((WG, Ly) => {
  var RM = Wi(),
    LM = Ey(),
    BM = My(),
    qM = Iy(),
    WM = Dy(),
    zM = Ry();

  function Mn(t) {
    var e = this.__data__ = new RM(t);
    this.size = e.size
  }
  Mn.prototype.clear = LM;
  Mn.prototype.delete = BM;
  Mn.prototype.get = qM;
  Mn.prototype.has = WM;
  Mn.prototype.set = zM;
  Ly.exports = Mn
});
var qy = I((zG, By) => {
  var FM = "__lodash_hash_undefined__";

  function $M(t) {
    return this.__data__.set(t, FM), this
  }
  By.exports = $M
});
var zy = I((FG, Wy) => {
  function UM(t) {
    return this.__data__.has(t)
  }
  Wy.exports = UM
});
var Sc = I(($G, Fy) => {
  var HM = Ia(),
    GM = qy(),
    KM = zy();

  function iu(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.__data__ = new HM; ++e < r;) this.add(t[e])
  }
  iu.prototype.add = iu.prototype.push = GM;
  iu.prototype.has = KM;
  Fy.exports = iu
});
var Ac = I((UG, $y) => {
  function VM(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length; ++r < n;)
      if (e(t[r], r, t)) return !0;
    return !1
  }
  $y.exports = VM
});
var _c = I((HG, Uy) => {
  function XM(t, e) {
    return t.has(e)
  }
  Uy.exports = XM
});
var Pc = I((GG, Hy) => {
  var YM = Sc(),
    ZM = Ac(),
    JM = _c(),
    QM = 1,
    tC = 2;

  function eC(t, e, r, n, i, o) {
    var a = r & QM,
      u = t.length,
      s = e.length;
    if (u != s && !(a && s > u)) return !1;
    var l = o.get(t),
      f = o.get(e);
    if (l && f) return l == e && f == t;
    var c = -1,
      p = !0,
      d = r & tC ? new YM : void 0;
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
        if (!ZM(e, function(x, w) {
            if (!JM(d, w) && (y === x || i(y, x, r, n, o))) return d.push(w)
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
  Hy.exports = eC
});
var Ky = I((KG, Gy) => {
  var rC = Ie(),
    nC = rC.Uint8Array;
  Gy.exports = nC
});
var Xy = I((VG, Vy) => {
  function iC(t) {
    var e = -1,
      r = Array(t.size);
    return t.forEach(function(n, i) {
      r[++e] = [i, n]
    }), r
  }
  Vy.exports = iC
});
var ou = I((XG, Yy) => {
  function oC(t) {
    var e = -1,
      r = Array(t.size);
    return t.forEach(function(n) {
      r[++e] = n
    }), r
  }
  Yy.exports = oC
});
var ev = I((YG, tv) => {
  var Zy = mn(),
    Jy = Ky(),
    aC = Ma(),
    uC = Pc(),
    sC = Xy(),
    lC = ou(),
    cC = 1,
    fC = 2,
    pC = "[object Boolean]",
    dC = "[object Date]",
    mC = "[object Error]",
    hC = "[object Map]",
    yC = "[object Number]",
    vC = "[object RegExp]",
    gC = "[object Set]",
    bC = "[object String]",
    xC = "[object Symbol]",
    wC = "[object ArrayBuffer]",
    OC = "[object DataView]",
    Qy = Zy ? Zy.prototype : void 0,
    Tc = Qy ? Qy.valueOf : void 0;

  function SC(t, e, r, n, i, o, a) {
    switch (r) {
      case OC:
        if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
        t = t.buffer, e = e.buffer;
      case wC:
        return !(t.byteLength != e.byteLength || !o(new Jy(t), new Jy(e)));
      case pC:
      case dC:
      case yC:
        return aC(+t, +e);
      case mC:
        return t.name == e.name && t.message == e.message;
      case vC:
      case bC:
        return t == e + "";
      case hC:
        var u = sC;
      case gC:
        var s = n & cC;
        if (u || (u = lC), t.size != e.size && !s) return !1;
        var l = a.get(t);
        if (l) return l == e;
        n |= fC, a.set(t, e);
        var f = uC(u(t), u(e), n, i, o, a);
        return a.delete(t), f;
      case xC:
        if (Tc) return Tc.call(t) == Tc.call(e)
    }
    return !1
  }
  tv.exports = SC
});
var Ec = I((ZG, rv) => {
  function AC(t, e) {
    for (var r = -1, n = e.length, i = t.length; ++r < n;) t[i + r] = e[r];
    return t
  }
  rv.exports = AC
});
var iv = I((JG, nv) => {
  var _C = Ec(),
    PC = te();

  function TC(t, e, r) {
    var n = e(t);
    return PC(t) ? n : _C(n, r(t))
  }
  nv.exports = TC
});
var av = I((QG, ov) => {
  function EC(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length, i = 0, o = []; ++r < n;) {
      var a = t[r];
      e(a, r, t) && (o[i++] = a)
    }
    return o
  }
  ov.exports = EC
});
var sv = I((tK, uv) => {
  function jC() {
    return []
  }
  uv.exports = jC
});
var fv = I((eK, cv) => {
  var MC = av(),
    CC = sv(),
    IC = Object.prototype,
    kC = IC.propertyIsEnumerable,
    lv = Object.getOwnPropertySymbols,
    DC = lv ? function(t) {
      return t == null ? [] : (t = Object(t), MC(lv(t), function(e) {
        return kC.call(t, e)
      }))
    } : CC;
  cv.exports = DC
});
var dv = I((rK, pv) => {
  function NC(t, e) {
    for (var r = -1, n = Array(t); ++r < t;) n[r] = e(r);
    return n
  }
  pv.exports = NC
});
var hv = I((nK, mv) => {
  var RC = Ue(),
    LC = He(),
    BC = "[object Arguments]";

  function qC(t) {
    return LC(t) && RC(t) == BC
  }
  mv.exports = qC
});
var au = I((iK, gv) => {
  var yv = hv(),
    WC = He(),
    vv = Object.prototype,
    zC = vv.hasOwnProperty,
    FC = vv.propertyIsEnumerable,
    $C = yv(function() {
      return arguments
    }()) ? yv : function(t) {
      return WC(t) && zC.call(t, "callee") && !FC.call(t, "callee")
    };
  gv.exports = $C
});
var xv = I((oK, bv) => {
  function UC() {
    return !1
  }
  bv.exports = UC
});
var jc = I((Xi, Cn) => {
  var HC = Ie(),
    GC = xv(),
    Sv = typeof Xi == "object" && Xi && !Xi.nodeType && Xi,
    wv = Sv && typeof Cn == "object" && Cn && !Cn.nodeType && Cn,
    KC = wv && wv.exports === Sv,
    Ov = KC ? HC.Buffer : void 0,
    VC = Ov ? Ov.isBuffer : void 0,
    XC = VC || GC;
  Cn.exports = XC
});
var uu = I((aK, Av) => {
  var YC = 9007199254740991,
    ZC = /^(?:0|[1-9]\d*)$/;

  function JC(t, e) {
    var r = typeof t;
    return e = e ?? YC, !!e && (r == "number" || r != "symbol" && ZC.test(t)) && t > -1 && t % 1 == 0 && t < e
  }
  Av.exports = JC
});
var su = I((uK, _v) => {
  var QC = 9007199254740991;

  function tI(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= QC
  }
  _v.exports = tI
});
var Tv = I((sK, Pv) => {
  var eI = Ue(),
    rI = su(),
    nI = He(),
    iI = "[object Arguments]",
    oI = "[object Array]",
    aI = "[object Boolean]",
    uI = "[object Date]",
    sI = "[object Error]",
    lI = "[object Function]",
    cI = "[object Map]",
    fI = "[object Number]",
    pI = "[object Object]",
    dI = "[object RegExp]",
    mI = "[object Set]",
    hI = "[object String]",
    yI = "[object WeakMap]",
    vI = "[object ArrayBuffer]",
    gI = "[object DataView]",
    bI = "[object Float32Array]",
    xI = "[object Float64Array]",
    wI = "[object Int8Array]",
    OI = "[object Int16Array]",
    SI = "[object Int32Array]",
    AI = "[object Uint8Array]",
    _I = "[object Uint8ClampedArray]",
    PI = "[object Uint16Array]",
    TI = "[object Uint32Array]",
    Et = {};
  Et[bI] = Et[xI] = Et[wI] = Et[OI] = Et[SI] = Et[AI] = Et[_I] = Et[PI] = Et[TI] = !0;
  Et[iI] = Et[oI] = Et[vI] = Et[aI] = Et[gI] = Et[uI] = Et[sI] = Et[lI] = Et[cI] = Et[fI] = Et[pI] = Et[dI] = Et[mI] = Et[hI] = Et[yI] = !1;

  function EI(t) {
    return nI(t) && rI(t.length) && !!Et[eI(t)]
  }
  Pv.exports = EI
});
var Mc = I((lK, Ev) => {
  function jI(t) {
    return function(e) {
      return t(e)
    }
  }
  Ev.exports = jI
});
var Mv = I((Yi, In) => {
  var MI = yl(),
    jv = typeof Yi == "object" && Yi && !Yi.nodeType && Yi,
    Zi = jv && typeof In == "object" && In && !In.nodeType && In,
    CI = Zi && Zi.exports === jv,
    Cc = CI && MI.process,
    II = function() {
      try {
        var t = Zi && Zi.require && Zi.require("util").types;
        return t || Cc && Cc.binding && Cc.binding("util")
      } catch {}
    }();
  In.exports = II
});
var Ic = I((cK, kv) => {
  var kI = Tv(),
    DI = Mc(),
    Cv = Mv(),
    Iv = Cv && Cv.isTypedArray,
    NI = Iv ? DI(Iv) : kI;
  kv.exports = NI
});
var Nv = I((fK, Dv) => {
  var RI = dv(),
    LI = au(),
    BI = te(),
    qI = jc(),
    WI = uu(),
    zI = Ic(),
    FI = Object.prototype,
    $I = FI.hasOwnProperty;

  function UI(t, e) {
    var r = BI(t),
      n = !r && LI(t),
      i = !r && !n && qI(t),
      o = !r && !n && !i && zI(t),
      a = r || n || i || o,
      u = a ? RI(t.length, String) : [],
      s = u.length;
    for (var l in t)(e || $I.call(t, l)) && !(a && (l == "length" || i && (l == "offset" || l == "parent") || o && (l == "buffer" || l == "byteLength" || l == "byteOffset") || WI(l, s))) && u.push(l);
    return u
  }
  Dv.exports = UI
});
var Lv = I((pK, Rv) => {
  var HI = Object.prototype;

  function GI(t) {
    var e = t && t.constructor,
      r = typeof e == "function" && e.prototype || HI;
    return t === r
  }
  Rv.exports = GI
});
var kc = I((dK, Bv) => {
  function KI(t, e) {
    return function(r) {
      return t(e(r))
    }
  }
  Bv.exports = KI
});
var Wv = I((mK, qv) => {
  var VI = kc(),
    XI = VI(Object.keys, Object);
  qv.exports = XI
});
var Fv = I((hK, zv) => {
  var YI = Lv(),
    ZI = Wv(),
    JI = Object.prototype,
    QI = JI.hasOwnProperty;

  function t2(t) {
    if (!YI(t)) return ZI(t);
    var e = [];
    for (var r in Object(t)) QI.call(t, r) && r != "constructor" && e.push(r);
    return e
  }
  zv.exports = t2
});
var kn = I((yK, $v) => {
  var e2 = It(),
    r2 = su();

  function n2(t) {
    return t != null && r2(t.length) && !e2(t)
  }
  $v.exports = n2
});
var Ji = I((vK, Uv) => {
  var i2 = Nv(),
    o2 = Fv(),
    a2 = kn();

  function u2(t) {
    return a2(t) ? i2(t) : o2(t)
  }
  Uv.exports = u2
});
var Gv = I((gK, Hv) => {
  var s2 = iv(),
    l2 = fv(),
    c2 = Ji();

  function f2(t) {
    return s2(t, c2, l2)
  }
  Hv.exports = f2
});
var Xv = I((bK, Vv) => {
  var Kv = Gv(),
    p2 = 1,
    d2 = Object.prototype,
    m2 = d2.hasOwnProperty;

  function h2(t, e, r, n, i, o) {
    var a = r & p2,
      u = Kv(t),
      s = u.length,
      l = Kv(e),
      f = l.length;
    if (s != f && !a) return !1;
    for (var c = s; c--;) {
      var p = u[c];
      if (!(a ? p in e : m2.call(e, p))) return !1
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
      var _ = t.constructor,
        h = e.constructor;
      _ != h && "constructor" in t && "constructor" in e && !(typeof _ == "function" && _ instanceof _ && typeof h == "function" && h instanceof h) && (m = !1)
    }
    return o.delete(t), o.delete(e), m
  }
  Vv.exports = h2
});
var Zv = I((xK, Yv) => {
  var y2 = yr(),
    v2 = Ie(),
    g2 = y2(v2, "DataView");
  Yv.exports = g2
});
var Qv = I((wK, Jv) => {
  var b2 = yr(),
    x2 = Ie(),
    w2 = b2(x2, "Promise");
  Jv.exports = w2
});
var Dc = I((OK, tg) => {
  var O2 = yr(),
    S2 = Ie(),
    A2 = O2(S2, "Set");
  tg.exports = A2
});
var rg = I((SK, eg) => {
  var _2 = yr(),
    P2 = Ie(),
    T2 = _2(P2, "WeakMap");
  eg.exports = T2
});
var cg = I((AK, lg) => {
  var Nc = Zv(),
    Rc = Ca(),
    Lc = Qv(),
    Bc = Dc(),
    qc = rg(),
    sg = Ue(),
    Dn = gl(),
    ng = "[object Map]",
    E2 = "[object Object]",
    ig = "[object Promise]",
    og = "[object Set]",
    ag = "[object WeakMap]",
    ug = "[object DataView]",
    j2 = Dn(Nc),
    M2 = Dn(Rc),
    C2 = Dn(Lc),
    I2 = Dn(Bc),
    k2 = Dn(qc),
    Wr = sg;
  (Nc && Wr(new Nc(new ArrayBuffer(1))) != ug || Rc && Wr(new Rc) != ng || Lc && Wr(Lc.resolve()) != ig || Bc && Wr(new Bc) != og || qc && Wr(new qc) != ag) && (Wr = function(t) {
    var e = sg(t),
      r = e == E2 ? t.constructor : void 0,
      n = r ? Dn(r) : "";
    if (n) switch (n) {
      case j2:
        return ug;
      case M2:
        return ng;
      case C2:
        return ig;
      case I2:
        return og;
      case k2:
        return ag
    }
    return e
  });
  lg.exports = Wr
});
var gg = I((_K, vg) => {
  var Wc = Oc(),
    D2 = Pc(),
    N2 = ev(),
    R2 = Xv(),
    fg = cg(),
    pg = te(),
    dg = jc(),
    L2 = Ic(),
    B2 = 1,
    mg = "[object Arguments]",
    hg = "[object Array]",
    lu = "[object Object]",
    q2 = Object.prototype,
    yg = q2.hasOwnProperty;

  function W2(t, e, r, n, i, o) {
    var a = pg(t),
      u = pg(e),
      s = a ? hg : fg(t),
      l = u ? hg : fg(e);
    s = s == mg ? lu : s, l = l == mg ? lu : l;
    var f = s == lu,
      c = l == lu,
      p = s == l;
    if (p && dg(t)) {
      if (!dg(e)) return !1;
      a = !0, f = !1
    }
    if (p && !f) return o || (o = new Wc), a || L2(t) ? D2(t, e, r, n, i, o) : N2(t, e, s, r, n, i, o);
    if (!(r & B2)) {
      var d = f && yg.call(t, "__wrapped__"),
        y = c && yg.call(e, "__wrapped__");
      if (d || y) {
        var m = d ? t.value() : t,
          v = y ? e.value() : e;
        return o || (o = new Wc), i(m, v, r, n, o)
      }
    }
    return p ? (o || (o = new Wc), R2(t, e, r, n, i, o)) : !1
  }
  vg.exports = W2
});
var cu = I((PK, wg) => {
  var z2 = gg(),
    bg = He();

  function xg(t, e, r, n, i) {
    return t === e ? !0 : t == null || e == null || !bg(t) && !bg(e) ? t !== t && e !== e : z2(t, e, r, n, xg, i)
  }
  wg.exports = xg
});
var Sg = I((TK, Og) => {
  var F2 = Oc(),
    $2 = cu(),
    U2 = 1,
    H2 = 2;

  function G2(t, e, r, n) {
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
        var c = new F2;
        if (n) var p = n(l, f, s, t, e, c);
        if (!(p === void 0 ? $2(f, l, U2 | H2, n, c) : p)) return !1
      }
    }
    return !0
  }
  Og.exports = G2
});
var zc = I((EK, Ag) => {
  var K2 = be();

  function V2(t) {
    return t === t && !K2(t)
  }
  Ag.exports = V2
});
var Pg = I((jK, _g) => {
  var X2 = zc(),
    Y2 = Ji();

  function Z2(t) {
    for (var e = Y2(t), r = e.length; r--;) {
      var n = e[r],
        i = t[n];
      e[r] = [n, i, X2(i)]
    }
    return e
  }
  _g.exports = Z2
});
var Fc = I((MK, Tg) => {
  function J2(t, e) {
    return function(r) {
      return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r))
    }
  }
  Tg.exports = J2
});
var jg = I((CK, Eg) => {
  var Q2 = Sg(),
    tk = Pg(),
    ek = Fc();

  function rk(t) {
    var e = tk(t);
    return e.length == 1 && e[0][2] ? ek(e[0][0], e[0][1]) : function(r) {
      return r === t || Q2(r, t, e)
    }
  }
  Eg.exports = rk
});
var Cg = I((IK, Mg) => {
  function nk(t, e) {
    return t != null && e in Object(t)
  }
  Mg.exports = nk
});
var kg = I((kK, Ig) => {
  var ik = Ol(),
    ok = au(),
    ak = te(),
    uk = uu(),
    sk = su(),
    lk = Fi();

  function ck(t, e, r) {
    e = ik(e, t);
    for (var n = -1, i = e.length, o = !1; ++n < i;) {
      var a = lk(e[n]);
      if (!(o = t != null && r(t, a))) break;
      t = t[a]
    }
    return o || ++n != i ? o : (i = t == null ? 0 : t.length, !!i && sk(i) && uk(a, i) && (ak(t) || ok(t)))
  }
  Ig.exports = ck
});
var Ng = I((DK, Dg) => {
  var fk = Cg(),
    pk = kg();

  function dk(t, e) {
    return t != null && pk(t, e, fk)
  }
  Dg.exports = dk
});
var Lg = I((NK, Rg) => {
  var mk = cu(),
    hk = Dr(),
    yk = Ng(),
    vk = ja(),
    gk = zc(),
    bk = Fc(),
    xk = Fi(),
    wk = 1,
    Ok = 2;

  function Sk(t, e) {
    return vk(t) && gk(e) ? bk(xk(t), e) : function(r) {
      var n = hk(r, t);
      return n === void 0 && n === e ? yk(r, t) : mk(e, n, wk | Ok)
    }
  }
  Rg.exports = Sk
});
var zr = I((RK, Bg) => {
  function Ak(t) {
    return t
  }
  Bg.exports = Ak
});
var Wg = I((LK, qg) => {
  function _k(t) {
    return function(e) {
      return e?.[t]
    }
  }
  qg.exports = _k
});
var Fg = I((BK, zg) => {
  var Pk = Da();

  function Tk(t) {
    return function(e) {
      return Pk(e, t)
    }
  }
  zg.exports = Tk
});
var Ug = I((qK, $g) => {
  var Ek = Wg(),
    jk = Fg(),
    Mk = ja(),
    Ck = Fi();

  function Ik(t) {
    return Mk(t) ? Ek(Ck(t)) : jk(t)
  }
  $g.exports = Ik
});
var ur = I((WK, Hg) => {
  var kk = jg(),
    Dk = Lg(),
    Nk = zr(),
    Rk = te(),
    Lk = Ug();

  function Bk(t) {
    return typeof t == "function" ? t : t == null ? Nk : typeof t == "object" ? Rk(t) ? Dk(t[0], t[1]) : kk(t) : Lk(t)
  }
  Hg.exports = Bk
});
var $c = I((zK, Gg) => {
  function qk(t, e, r, n) {
    for (var i = t.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
      if (e(t[o], o, t)) return o;
    return -1
  }
  Gg.exports = qk
});
var Vg = I((FK, Kg) => {
  function Wk(t) {
    return t !== t
  }
  Kg.exports = Wk
});
var Yg = I(($K, Xg) => {
  function zk(t, e, r) {
    for (var n = r - 1, i = t.length; ++n < i;)
      if (t[n] === e) return n;
    return -1
  }
  Xg.exports = zk
});
var Jg = I((UK, Zg) => {
  var Fk = $c(),
    $k = Vg(),
    Uk = Yg();

  function Hk(t, e, r) {
    return e === e ? Uk(t, e, r) : Fk(t, $k, r)
  }
  Zg.exports = Hk
});
var tb = I((HK, Qg) => {
  var Gk = Jg();

  function Kk(t, e) {
    var r = t == null ? 0 : t.length;
    return !!r && Gk(t, e, 0) > -1
  }
  Qg.exports = Kk
});
var rb = I((GK, eb) => {
  function Vk(t, e, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i;)
      if (r(e, t[n])) return !0;
    return !1
  }
  eb.exports = Vk
});
var ib = I((KK, nb) => {
  function Xk() {}
  nb.exports = Xk
});
var ab = I((VK, ob) => {
  var Uc = Dc(),
    Yk = ib(),
    Zk = ou(),
    Jk = 1 / 0,
    Qk = Uc && 1 / Zk(new Uc([, -0]))[1] == Jk ? function(t) {
      return new Uc(t)
    } : Yk;
  ob.exports = Qk
});
var sb = I((XK, ub) => {
  var tD = Sc(),
    eD = tb(),
    rD = rb(),
    nD = _c(),
    iD = ab(),
    oD = ou(),
    aD = 200;

  function uD(t, e, r) {
    var n = -1,
      i = eD,
      o = t.length,
      a = !0,
      u = [],
      s = u;
    if (r) a = !1, i = rD;
    else if (o >= aD) {
      var l = e ? null : iD(t);
      if (l) return oD(l);
      a = !1, i = nD, s = new tD
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
  ub.exports = uD
});
var cb = I((YK, lb) => {
  var sD = ur(),
    lD = sb();

  function cD(t, e) {
    return t && t.length ? lD(t, sD(e, 2)) : []
  }
  lb.exports = cD
});
var xb = I((n7, bb) => {
  var vb = mn(),
    AD = au(),
    _D = te(),
    gb = vb ? vb.isConcatSpreadable : void 0;

  function PD(t) {
    return _D(t) || AD(t) || !!(gb && t && t[gb])
  }
  bb.exports = PD
});
var Kc = I((i7, Ob) => {
  var TD = Ec(),
    ED = xb();

  function wb(t, e, r, n, i) {
    var o = -1,
      a = t.length;
    for (r || (r = ED), i || (i = []); ++o < a;) {
      var u = t[o];
      e > 0 && r(u) ? e > 1 ? wb(u, e - 1, r, n, i) : TD(i, u) : n || (i[i.length] = u)
    }
    return i
  }
  Ob.exports = wb
});
var Ab = I((o7, Sb) => {
  function jD(t) {
    return function(e, r, n) {
      for (var i = -1, o = Object(e), a = n(e), u = a.length; u--;) {
        var s = a[t ? u : ++i];
        if (r(o[s], s, o) === !1) break
      }
      return e
    }
  }
  Sb.exports = jD
});
var Pb = I((a7, _b) => {
  var MD = Ab(),
    CD = MD();
  _b.exports = CD
});
var Vc = I((u7, Tb) => {
  var ID = Pb(),
    kD = Ji();

  function DD(t, e) {
    return t && ID(t, e, kD)
  }
  Tb.exports = DD
});
var jb = I((s7, Eb) => {
  var ND = kn();

  function RD(t, e) {
    return function(r, n) {
      if (r == null) return r;
      if (!ND(r)) return t(r, n);
      for (var i = r.length, o = e ? i : -1, a = Object(r);
        (e ? o-- : ++o < i) && n(a[o], o, a) !== !1;);
      return r
    }
  }
  Eb.exports = RD
});
var mu = I((l7, Mb) => {
  var LD = Vc(),
    BD = jb(),
    qD = BD(LD);
  Mb.exports = qD
});
var Xc = I((c7, Cb) => {
  var WD = mu(),
    zD = kn();

  function FD(t, e) {
    var r = -1,
      n = zD(t) ? Array(t.length) : [];
    return WD(t, function(i, o, a) {
      n[++r] = e(i, o, a)
    }), n
  }
  Cb.exports = FD
});
var kb = I((f7, Ib) => {
  function $D(t, e) {
    var r = t.length;
    for (t.sort(e); r--;) t[r] = t[r].value;
    return t
  }
  Ib.exports = $D
});
var Rb = I((p7, Nb) => {
  var Db = kr();

  function UD(t, e) {
    if (t !== e) {
      var r = t !== void 0,
        n = t === null,
        i = t === t,
        o = Db(t),
        a = e !== void 0,
        u = e === null,
        s = e === e,
        l = Db(e);
      if (!u && !l && !o && t > e || o && a && s && !u && !l || n && a && s || !r && s || !i) return 1;
      if (!n && !o && !l && t < e || l && r && i && !n && !o || u && r && i || !a && i || !s) return -1
    }
    return 0
  }
  Nb.exports = UD
});
var Bb = I((d7, Lb) => {
  var HD = Rb();

  function GD(t, e, r) {
    for (var n = -1, i = t.criteria, o = e.criteria, a = i.length, u = r.length; ++n < a;) {
      var s = HD(i[n], o[n]);
      if (s) {
        if (n >= u) return s;
        var l = r[n];
        return s * (l == "desc" ? -1 : 1)
      }
    }
    return t.index - e.index
  }
  Lb.exports = GD
});
var Wb = I((m7, qb) => {
  var Yc = ka(),
    KD = Da(),
    VD = ur(),
    XD = Xc(),
    YD = kb(),
    ZD = Mc(),
    JD = Bb(),
    QD = zr(),
    tN = te();

  function eN(t, e, r) {
    e.length ? e = Yc(e, function(o) {
      return tN(o) ? function(a) {
        return KD(a, o.length === 1 ? o[0] : o)
      } : o
    }) : e = [QD];
    var n = -1;
    e = Yc(e, ZD(VD));
    var i = XD(t, function(o, a, u) {
      var s = Yc(e, function(l) {
        return l(o)
      });
      return {
        criteria: s,
        index: ++n,
        value: o
      }
    });
    return YD(i, function(o, a) {
      return JD(o, a, r)
    })
  }
  qb.exports = eN
});
var Fb = I((h7, zb) => {
  function rN(t, e, r) {
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
  zb.exports = rN
});
var Hb = I((y7, Ub) => {
  var nN = Fb(),
    $b = Math.max;

  function iN(t, e, r) {
    return e = $b(e === void 0 ? t.length - 1 : e, 0),
      function() {
        for (var n = arguments, i = -1, o = $b(n.length - e, 0), a = Array(o); ++i < o;) a[i] = n[e + i];
        i = -1;
        for (var u = Array(e + 1); ++i < e;) u[i] = n[i];
        return u[e] = r(a), nN(t, this, u)
      }
  }
  Ub.exports = iN
});
var Kb = I((v7, Gb) => {
  function oN(t) {
    return function() {
      return t
    }
  }
  Gb.exports = oN
});
var Zc = I((g7, Vb) => {
  var aN = yr(),
    uN = function() {
      try {
        var t = aN(Object, "defineProperty");
        return t({}, "", {}), t
      } catch {}
    }();
  Vb.exports = uN
});
var Zb = I((b7, Yb) => {
  var sN = Kb(),
    Xb = Zc(),
    lN = zr(),
    cN = Xb ? function(t, e) {
      return Xb(t, "toString", {
        configurable: !0,
        enumerable: !1,
        value: sN(e),
        writable: !0
      })
    } : lN;
  Yb.exports = cN
});
var Qb = I((x7, Jb) => {
  var fN = 800,
    pN = 16,
    dN = Date.now;

  function mN(t) {
    var e = 0,
      r = 0;
    return function() {
      var n = dN(),
        i = pN - (n - r);
      if (r = n, i > 0) {
        if (++e >= fN) return arguments[0]
      } else e = 0;
      return t.apply(void 0, arguments)
    }
  }
  Jb.exports = mN
});
var ex = I((w7, tx) => {
  var hN = Zb(),
    yN = Qb(),
    vN = yN(hN);
  tx.exports = vN
});
var nx = I((O7, rx) => {
  var gN = zr(),
    bN = Hb(),
    xN = ex();

  function wN(t, e) {
    return xN(bN(t, e, gN), t + "")
  }
  rx.exports = wN
});
var to = I((S7, ix) => {
  var ON = Ma(),
    SN = kn(),
    AN = uu(),
    _N = be();

  function PN(t, e, r) {
    if (!_N(r)) return !1;
    var n = typeof e;
    return (n == "number" ? SN(r) && AN(e, r.length) : n == "string" && e in r) ? ON(r[e], t) : !1
  }
  ix.exports = PN
});
var hu = I((A7, ax) => {
  var TN = Kc(),
    EN = Wb(),
    jN = nx(),
    ox = to(),
    MN = jN(function(t, e) {
      if (t == null) return [];
      var r = e.length;
      return r > 1 && ox(t, e[0], e[1]) ? e = [] : r > 2 && ox(e[0], e[1], e[2]) && (e = [e[0]]), EN(t, TN(e, 1), [])
    });
  ax.exports = MN
});
var Tx = I((F7, Px) => {
  var fR = Ie(),
    pR = function() {
      return fR.Date.now()
    };
  Px.exports = pR
});
var jx = I(($7, Ex) => {
  var dR = /\s/;

  function mR(t) {
    for (var e = t.length; e-- && dR.test(t.charAt(e)););
    return e
  }
  Ex.exports = mR
});
var Cx = I((U7, Mx) => {
  var hR = jx(),
    yR = /^\s+/;

  function vR(t) {
    return t && t.slice(0, hR(t) + 1).replace(yR, "")
  }
  Mx.exports = vR
});
var of = I((H7, Dx) => {
  var gR = Cx(),
    Ix = be(),
    bR = kr(),
    kx = NaN,
    xR = /^[-+]0x[0-9a-f]+$/i,
    wR = /^0b[01]+$/i,
    OR = /^0o[0-7]+$/i,
    SR = parseInt;

  function AR(t) {
    if (typeof t == "number") return t;
    if (bR(t)) return kx;
    if (Ix(t)) {
      var e = typeof t.valueOf == "function" ? t.valueOf() : t;
      t = Ix(e) ? e + "" : e
    }
    if (typeof t != "string") return t === 0 ? t : +t;
    t = gR(t);
    var r = wR.test(t);
    return r || OR.test(t) ? SR(t.slice(2), r ? 2 : 8) : xR.test(t) ? kx : +t
  }
  Dx.exports = AR
});
var Lx = I((G7, Rx) => {
  var _R = be(),
    af = Tx(),
    Nx = of(),
    PR = "Expected a function",
    TR = Math.max,
    ER = Math.min;

  function jR(t, e, r) {
    var n, i, o, a, u, s, l = 0,
      f = !1,
      c = !1,
      p = !0;
    if (typeof t != "function") throw new TypeError(PR);
    e = Nx(e) || 0, _R(r) && (f = !!r.leading, c = "maxWait" in r, o = c ? TR(Nx(r.maxWait) || 0, e) : o, p = "trailing" in r ? !!r.trailing : p);

    function d(g) {
      var A = n,
        C = i;
      return n = i = void 0, l = g, a = t.apply(C, A), a
    }

    function y(g) {
      return l = g, u = setTimeout(x, e), f ? d(g) : a
    }

    function m(g) {
      var A = g - s,
        C = g - l,
        D = e - A;
      return c ? ER(D, o - C) : D
    }

    function v(g) {
      var A = g - s,
        C = g - l;
      return s === void 0 || A >= e || A < 0 || c && C >= o
    }

    function x() {
      var g = af();
      if (v(g)) return w(g);
      u = setTimeout(x, m(g))
    }

    function w(g) {
      return u = void 0, p && n ? d(g) : (n = i = void 0, a)
    }

    function S() {
      u !== void 0 && clearTimeout(u), l = 0, n = s = i = u = void 0
    }

    function _() {
      return u === void 0 ? a : w(af())
    }

    function h() {
      var g = af(),
        A = v(g);
      if (n = arguments, i = this, s = g, A) {
        if (u === void 0) return y(s);
        if (c) return clearTimeout(u), u = setTimeout(x, e), d(s)
      }
      return u === void 0 && (u = setTimeout(x, e)), a
    }
    return h.cancel = S, h.flush = _, h
  }
  Rx.exports = jR
});
var uf = I((K7, Bx) => {
  var MR = Lx(),
    CR = be(),
    IR = "Expected a function";

  function kR(t, e, r) {
    var n = !0,
      i = !0;
    if (typeof t != "function") throw new TypeError(IR);
    return CR(r) && (n = "leading" in r ? !!r.leading : n, i = "trailing" in r ? !!r.trailing : i), MR(t, e, {
      leading: n,
      maxWait: e,
      trailing: i
    })
  }
  Bx.exports = kR
});
var Kf = I((cQ, Ew) => {
  var kq = kr();

  function Dq(t, e, r) {
    for (var n = -1, i = t.length; ++n < i;) {
      var o = t[n],
        a = e(o);
      if (a != null && (u === void 0 ? a === a && !kq(a) : r(a, u))) var u = a,
        s = o
    }
    return s
  }
  Ew.exports = Dq
});
var Mw = I((fQ, jw) => {
  function Nq(t, e) {
    return t > e
  }
  jw.exports = Nq
});
var Iw = I((pQ, Cw) => {
  var Rq = Kf(),
    Lq = Mw(),
    Bq = zr();

  function qq(t) {
    return t && t.length ? Rq(t, Bq, Lq) : void 0
  }
  Cw.exports = qq
});
var Dw = I((dQ, kw) => {
  function Wq(t, e) {
    return t < e
  }
  kw.exports = Wq
});
var Rw = I((mQ, Nw) => {
  var zq = Kf(),
    Fq = Dw(),
    $q = zr();

  function Uq(t) {
    return t && t.length ? zq(t, $q, Fq) : void 0
  }
  Nw.exports = Uq
});
var Bw = I((hQ, Lw) => {
  var Hq = ka(),
    Gq = ur(),
    Kq = Xc(),
    Vq = te();

  function Xq(t, e) {
    var r = Vq(t) ? Hq : Kq;
    return r(t, Gq(e, 3))
  }
  Lw.exports = Xq
});
var Ww = I((yQ, qw) => {
  var Yq = Kc(),
    Zq = Bw();

  function Jq(t, e) {
    return Yq(Zq(t, e), 1)
  }
  qw.exports = Jq
});
var Eo = I((vQ, zw) => {
  var Qq = cu();

  function tW(t, e) {
    return Qq(t, e)
  }
  zw.exports = tW
});
var Vf = I((Fw, as) => {
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
      var O, E, P, j, T = this;
      if (b = new T.constructor(b), T.s !== b.s) return T.s || -b.s;
      if (T.e !== b.e) return T.e > b.e ^ T.s < 0 ? 1 : -1;
      for (P = T.d.length, j = b.d.length, O = 0, E = P < j ? P : j; O < E; ++O)
        if (T.d[O] !== b.d[O]) return T.d[O] > b.d[O] ^ T.s < 0 ? 1 : -1;
      return P === j ? 0 : P > j ^ T.s < 0 ? 1 : -1
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
      return q(S(O, new E(b), 0, 1), E.precision)
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
        P = E.constructor,
        j = P.precision,
        T = j + 5;
      if (b === void 0) b = new P(10);
      else if (b = new P(b), b.s < 1 || b.eq(f)) throw Error(i + "NaN");
      if (E.s < 1) throw Error(i + (E.s ? "NaN" : "-Infinity"));
      return E.eq(f) ? new P(0) : (n = !1, O = S(C(E, T), C(b, T), T), n = !0, q(O, j))
    }, m.minus = m.sub = function(b) {
      var O = this;
      return b = new O.constructor(b), O.s == b.s ? W(O, b) : v(O, (b.s = -b.s, b))
    }, m.modulo = m.mod = function(b) {
      var O, E = this,
        P = E.constructor,
        j = P.precision;
      if (b = new P(b), !b.s) throw Error(i + "NaN");
      return E.s ? (n = !1, O = S(E, b, 0, 1).times(b), n = !0, E.minus(O)) : q(new P(E), j)
    }, m.naturalExponential = m.exp = function() {
      return _(this)
    }, m.naturalLogarithm = m.ln = function() {
      return C(this)
    }, m.negated = m.neg = function() {
      var b = new this.constructor(this);
      return b.s = -b.s || 0, b
    }, m.plus = m.add = function(b) {
      var O = this;
      return b = new O.constructor(b), O.s == b.s ? v(O, b) : W(O, (b.s = -b.s, b))
    }, m.precision = m.sd = function(b) {
      var O, E, P, j = this;
      if (b !== void 0 && b !== !!b && b !== 1 && b !== 0) throw Error(o + b);
      if (O = h(j) + 1, P = j.d.length - 1, E = P * p + 1, P = j.d[P], P) {
        for (; P % 10 == 0; P /= 10) E--;
        for (P = j.d[0]; P >= 10; P /= 10) E++
      }
      return b && O > E ? O : E
    }, m.squareRoot = m.sqrt = function() {
      var b, O, E, P, j, T, R, B = this,
        G = B.constructor;
      if (B.s < 1) {
        if (!B.s) return new G(0);
        throw Error(i + "NaN")
      }
      for (b = h(B), n = !1, j = Math.sqrt(+B), j == 0 || j == 1 / 0 ? (O = w(B.d), (O.length + b) % 2 == 0 && (O += "0"), j = Math.sqrt(O), b = u((b + 1) / 2) - (b < 0 || b % 2), j == 1 / 0 ? O = "5e" + b : (O = j.toExponential(), O = O.slice(0, O.indexOf("e") + 1) + b), P = new G(O)) : P = new G(j.toString()), E = G.precision, j = R = E + 3;;)
        if (T = P, P = T.plus(S(B, T, R + 2)).times(.5), w(T.d).slice(0, R) === (O = w(P.d)).slice(0, R)) {
          if (O = O.slice(R - 3, R + 1), j == R && O == "4999") {
            if (q(T, E + 1, 0), T.times(T).eq(B)) {
              P = T;
              break
            }
          } else if (O != "9999") break;
          R += 4
        } return n = !0, q(P, E)
    }, m.times = m.mul = function(b) {
      var O, E, P, j, T, R, B, G, Z, J = this,
        V = J.constructor,
        dt = J.d,
        K = (b = new V(b)).d;
      if (!J.s || !b.s) return new V(0);
      for (b.s *= J.s, E = J.e + b.e, G = dt.length, Z = K.length, G < Z && (T = dt, dt = K, K = T, R = G, G = Z, Z = R), T = [], R = G + Z, P = R; P--;) T.push(0);
      for (P = Z; --P >= 0;) {
        for (O = 0, j = G + P; j > P;) B = T[j] + K[P] * dt[j - P - 1] + O, T[j--] = B % c | 0, O = B / c | 0;
        T[j] = (T[j] + O) % c | 0
      }
      for (; !T[--R];) T.pop();
      return O ? ++E : T.shift(), b.d = T, b.e = E, n ? q(b, V.precision) : b
    }, m.toDecimalPlaces = m.todp = function(b, O) {
      var E = this,
        P = E.constructor;
      return E = new P(E), b === void 0 ? E : (x(b, 0, e), O === void 0 ? O = P.rounding : x(O, 0, 8), q(E, b + h(E) + 1, O))
    }, m.toExponential = function(b, O) {
      var E, P = this,
        j = P.constructor;
      return b === void 0 ? E = L(P, !0) : (x(b, 0, e), O === void 0 ? O = j.rounding : x(O, 0, 8), P = q(new j(P), b + 1, O), E = L(P, !0, b + 1)), E
    }, m.toFixed = function(b, O) {
      var E, P, j = this,
        T = j.constructor;
      return b === void 0 ? L(j) : (x(b, 0, e), O === void 0 ? O = T.rounding : x(O, 0, 8), P = q(new T(j), b + h(j) + 1, O), E = L(P.abs(), !1, b + h(P) + 1), j.isneg() && !j.isZero() ? "-" + E : E)
    }, m.toInteger = m.toint = function() {
      var b = this,
        O = b.constructor;
      return q(new O(b), h(b) + 1, O.rounding)
    }, m.toNumber = function() {
      return +this
    }, m.toPower = m.pow = function(b) {
      var O, E, P, j, T, R, B = this,
        G = B.constructor,
        Z = 12,
        J = +(b = new G(b));
      if (!b.s) return new G(f);
      if (B = new G(B), !B.s) {
        if (b.s < 1) throw Error(i + "Infinity");
        return B
      }
      if (B.eq(f)) return B;
      if (P = G.precision, b.eq(f)) return q(B, P);
      if (O = b.e, E = b.d.length - 1, R = O >= E, T = B.s, R) {
        if ((E = J < 0 ? -J : J) <= d) {
          for (j = new G(f), O = Math.ceil(P / p + 4), n = !1; E % 2 && (j = j.times(B), H(j.d, O)), E = u(E / 2), E !== 0;) B = B.times(B), H(B.d, O);
          return n = !0, b.s < 0 ? new G(f).div(j) : q(j, P)
        }
      } else if (T < 0) throw Error(i + "NaN");
      return T = T < 0 && b.d[Math.max(O, E)] & 1 ? -1 : 1, B.s = 1, n = !1, j = b.times(C(B, P + Z)), n = !0, j = _(j), j.s = T, j
    }, m.toPrecision = function(b, O) {
      var E, P, j = this,
        T = j.constructor;
      return b === void 0 ? (E = h(j), P = L(j, E <= T.toExpNeg || E >= T.toExpPos)) : (x(b, 1, e), O === void 0 ? O = T.rounding : x(O, 0, 8), j = q(new T(j), b, O), E = h(j), P = L(j, b <= E || E <= T.toExpNeg, b)), P
    }, m.toSignificantDigits = m.tosd = function(b, O) {
      var E = this,
        P = E.constructor;
      return b === void 0 ? (b = P.precision, O = P.rounding) : (x(b, 1, e), O === void 0 ? O = P.rounding : x(O, 0, 8)), q(new P(E), b, O)
    }, m.toString = m.valueOf = m.val = m.toJSON = function() {
      var b = this,
        O = h(b),
        E = b.constructor;
      return L(b, O <= E.toExpNeg || O >= E.toExpPos)
    };

    function v(b, O) {
      var E, P, j, T, R, B, G, Z, J = b.constructor,
        V = J.precision;
      if (!b.s || !O.s) return O.s || (O = new J(b)), n ? q(O, V) : O;
      if (G = b.d, Z = O.d, R = b.e, j = O.e, G = G.slice(), T = R - j, T) {
        for (T < 0 ? (P = G, T = -T, B = Z.length) : (P = Z, j = R, B = G.length), R = Math.ceil(V / p), B = R > B ? R + 1 : B + 1, T > B && (T = B, P.length = 1), P.reverse(); T--;) P.push(0);
        P.reverse()
      }
      for (B = G.length, T = Z.length, B - T < 0 && (T = B, P = Z, Z = G, G = P), E = 0; T;) E = (G[--T] = G[T] + Z[T] + E) / c | 0, G[T] %= c;
      for (E && (G.unshift(E), ++j), B = G.length; G[--B] == 0;) G.pop();
      return O.d = G, O.e = j, n ? q(O, V) : O
    }

    function x(b, O, E) {
      if (b !== ~~b || b < O || b > E) throw Error(o + b)
    }

    function w(b) {
      var O, E, P, j = b.length - 1,
        T = "",
        R = b[0];
      if (j > 0) {
        for (T += R, O = 1; O < j; O++) P = b[O] + "", E = p - P.length, E && (T += A(E)), T += P;
        R = b[O], P = R + "", E = p - P.length, E && (T += A(E))
      } else if (R === 0) return "0";
      for (; R % 10 === 0;) R /= 10;
      return T + R
    }
    var S = function() {
      function b(P, j) {
        var T, R = 0,
          B = P.length;
        for (P = P.slice(); B--;) T = P[B] * j + R, P[B] = T % c | 0, R = T / c | 0;
        return R && P.unshift(R), P
      }

      function O(P, j, T, R) {
        var B, G;
        if (T != R) G = T > R ? 1 : -1;
        else
          for (B = G = 0; B < T; B++)
            if (P[B] != j[B]) {
              G = P[B] > j[B] ? 1 : -1;
              break
            } return G
      }

      function E(P, j, T) {
        for (var R = 0; T--;) P[T] -= R, R = P[T] < j[T] ? 1 : 0, P[T] = R * c + P[T] - j[T];
        for (; !P[0] && P.length > 1;) P.shift()
      }
      return function(P, j, T, R) {
        var B, G, Z, J, V, dt, K, st, tt, k, gt, ft, _t, N, et, rt, Y, nt, ht = P.constructor,
          pt = P.s == j.s ? 1 : -1,
          lt = P.d,
          it = j.d;
        if (!P.s) return new ht(P);
        if (!j.s) throw Error(i + "Division by zero");
        for (G = P.e - j.e, Y = it.length, et = lt.length, K = new ht(pt), st = K.d = [], Z = 0; it[Z] == (lt[Z] || 0);) ++Z;
        if (it[Z] > (lt[Z] || 0) && --G, T == null ? ft = T = ht.precision : R ? ft = T + (h(P) - h(j)) + 1 : ft = T, ft < 0) return new ht(0);
        if (ft = ft / p + 2 | 0, Z = 0, Y == 1)
          for (J = 0, it = it[0], ft++;
            (Z < et || J) && ft--; Z++) _t = J * c + (lt[Z] || 0), st[Z] = _t / it | 0, J = _t % it | 0;
        else {
          for (J = c / (it[0] + 1) | 0, J > 1 && (it = b(it, J), lt = b(lt, J), Y = it.length, et = lt.length), N = Y, tt = lt.slice(0, Y), k = tt.length; k < Y;) tt[k++] = 0;
          nt = it.slice(), nt.unshift(0), rt = it[0], it[1] >= c / 2 && ++rt;
          do J = 0, B = O(it, tt, Y, k), B < 0 ? (gt = tt[0], Y != k && (gt = gt * c + (tt[1] || 0)), J = gt / rt | 0, J > 1 ? (J >= c && (J = c - 1), V = b(it, J), dt = V.length, k = tt.length, B = O(V, tt, dt, k), B == 1 && (J--, E(V, Y < dt ? nt : it, dt))) : (J == 0 && (B = J = 1), V = it.slice()), dt = V.length, dt < k && V.unshift(0), E(tt, V, k), B == -1 && (k = tt.length, B = O(it, tt, Y, k), B < 1 && (J++, E(tt, Y < k ? nt : it, k))), k = tt.length) : B === 0 && (J++, tt = [0]), st[Z++] = J, B && tt[0] ? tt[k++] = lt[N] || 0 : (tt = [lt[N]], k = 1); while ((N++ < et || tt[0] !== void 0) && ft--)
        }
        return st[0] || st.shift(), K.e = G, q(K, R ? T + h(K) + 1 : T)
      }
    }();

    function _(b, O) {
      var E, P, j, T, R, B, G = 0,
        Z = 0,
        J = b.constructor,
        V = J.precision;
      if (h(b) > 16) throw Error(a + h(b));
      if (!b.s) return new J(f);
      for (O == null ? (n = !1, B = V) : B = O, R = new J(.03125); b.abs().gte(.1);) b = b.times(R), Z += 5;
      for (P = Math.log(s(2, Z)) / Math.LN10 * 2 + 5 | 0, B += P, E = j = T = new J(f), J.precision = B;;) {
        if (j = q(j.times(b), B), E = E.times(++G), R = T.plus(S(j, E, B)), w(R.d).slice(0, B) === w(T.d).slice(0, B)) {
          for (; Z--;) T = q(T.times(T), B);
          return J.precision = V, O == null ? (n = !0, q(T, V)) : T
        }
        T = R
      }
    }

    function h(b) {
      for (var O = b.e * p, E = b.d[0]; E >= 10; E /= 10) O++;
      return O
    }

    function g(b, O, E) {
      if (O > b.LN10.sd()) throw n = !0, E && (b.precision = E), Error(i + "LN10 precision limit exceeded");
      return q(new b(b.LN10), O)
    }

    function A(b) {
      for (var O = ""; b--;) O += "0";
      return O
    }

    function C(b, O) {
      var E, P, j, T, R, B, G, Z, J, V = 1,
        dt = 10,
        K = b,
        st = K.d,
        tt = K.constructor,
        k = tt.precision;
      if (K.s < 1) throw Error(i + (K.s ? "NaN" : "-Infinity"));
      if (K.eq(f)) return new tt(0);
      if (O == null ? (n = !1, Z = k) : Z = O, K.eq(10)) return O == null && (n = !0), g(tt, Z);
      if (Z += dt, tt.precision = Z, E = w(st), P = E.charAt(0), T = h(K), Math.abs(T) < 15e14) {
        for (; P < 7 && P != 1 || P == 1 && E.charAt(1) > 3;) K = K.times(b), E = w(K.d), P = E.charAt(0), V++;
        T = h(K), P > 1 ? (K = new tt("0." + E), T++) : K = new tt(P + "." + E.slice(1))
      } else return G = g(tt, Z + 2, k).times(T + ""), K = C(new tt(P + "." + E.slice(1)), Z - dt).plus(G), tt.precision = k, O == null ? (n = !0, q(K, k)) : K;
      for (B = R = K = S(K.minus(f), K.plus(f), Z), J = q(K.times(K), Z), j = 3;;) {
        if (R = q(R.times(J), Z), G = B.plus(S(R, new tt(j), Z)), w(G.d).slice(0, Z) === w(B.d).slice(0, Z)) return B = B.times(2), T !== 0 && (B = B.plus(g(tt, Z + 2, k).times(T + ""))), B = S(B, new tt(V), Z), tt.precision = k, O == null ? (n = !0, q(B, k)) : B;
        B = G, j += 2
      }
    }

    function D(b, O) {
      var E, P, j;
      for ((E = O.indexOf(".")) > -1 && (O = O.replace(".", "")), (P = O.search(/e/i)) > 0 ? (E < 0 && (E = P), E += +O.slice(P + 1), O = O.substring(0, P)) : E < 0 && (E = O.length), P = 0; O.charCodeAt(P) === 48;) ++P;
      for (j = O.length; O.charCodeAt(j - 1) === 48;) --j;
      if (O = O.slice(P, j), O) {
        if (j -= P, E = E - P - 1, b.e = u(E / p), b.d = [], P = (E + 1) % p, E < 0 && (P += p), P < j) {
          for (P && b.d.push(+O.slice(0, P)), j -= p; P < j;) b.d.push(+O.slice(P, P += p));
          O = O.slice(P), P = p - O.length
        } else P -= j;
        for (; P--;) O += "0";
        if (b.d.push(+O), n && (b.e > y || b.e < -y)) throw Error(a + E)
      } else b.s = 0, b.e = 0, b.d = [0];
      return b
    }

    function q(b, O, E) {
      var P, j, T, R, B, G, Z, J, V = b.d;
      for (R = 1, T = V[0]; T >= 10; T /= 10) R++;
      if (P = O - R, P < 0) P += p, j = O, Z = V[J = 0];
      else {
        if (J = Math.ceil((P + 1) / p), T = V.length, J >= T) return b;
        for (Z = T = V[J], R = 1; T >= 10; T /= 10) R++;
        P %= p, j = P - p + R
      }
      if (E !== void 0 && (T = s(10, R - j - 1), B = Z / T % 10 | 0, G = O < 0 || V[J + 1] !== void 0 || Z % T, G = E < 4 ? (B || G) && (E == 0 || E == (b.s < 0 ? 3 : 2)) : B > 5 || B == 5 && (E == 4 || G || E == 6 && (P > 0 ? j > 0 ? Z / s(10, R - j) : 0 : V[J - 1]) % 10 & 1 || E == (b.s < 0 ? 8 : 7))), O < 1 || !V[0]) return G ? (T = h(b), V.length = 1, O = O - T - 1, V[0] = s(10, (p - O % p) % p), b.e = u(-O / p) || 0) : (V.length = 1, V[0] = b.e = b.s = 0), b;
      if (P == 0 ? (V.length = J, T = 1, J--) : (V.length = J + 1, T = s(10, p - P), V[J] = j > 0 ? (Z / s(10, R - j) % s(10, j) | 0) * T : 0), G)
        for (;;)
          if (J == 0) {
            (V[0] += T) == c && (V[0] = 1, ++b.e);
            break
          } else {
            if (V[J] += T, V[J] != c) break;
            V[J--] = 0, T = 1
          } for (P = V.length; V[--P] === 0;) V.pop();
      if (n && (b.e > y || b.e < -y)) throw Error(a + h(b));
      return b
    }

    function W(b, O) {
      var E, P, j, T, R, B, G, Z, J, V, dt = b.constructor,
        K = dt.precision;
      if (!b.s || !O.s) return O.s ? O.s = -O.s : O = new dt(b), n ? q(O, K) : O;
      if (G = b.d, V = O.d, P = O.e, Z = b.e, G = G.slice(), R = Z - P, R) {
        for (J = R < 0, J ? (E = G, R = -R, B = V.length) : (E = V, P = Z, B = G.length), j = Math.max(Math.ceil(K / p), B) + 2, R > j && (R = j, E.length = 1), E.reverse(), j = R; j--;) E.push(0);
        E.reverse()
      } else {
        for (j = G.length, B = V.length, J = j < B, J && (B = j), j = 0; j < B; j++)
          if (G[j] != V[j]) {
            J = G[j] < V[j];
            break
          } R = 0
      }
      for (J && (E = G, G = V, V = E, O.s = -O.s), B = G.length, j = V.length - B; j > 0; --j) G[B++] = 0;
      for (j = V.length; j > R;) {
        if (G[--j] < V[j]) {
          for (T = j; T && G[--T] === 0;) G[T] = c - 1;
          --G[T], G[j] += c
        }
        G[j] -= V[j]
      }
      for (; G[--B] === 0;) G.pop();
      for (; G[0] === 0; G.shift()) --P;
      return G[0] ? (O.d = G, O.e = P, n ? q(O, K) : O) : new dt(0)
    }

    function L(b, O, E) {
      var P, j = h(b),
        T = w(b.d),
        R = T.length;
      return O ? (E && (P = E - R) > 0 ? T = T.charAt(0) + "." + T.slice(1) + A(P) : R > 1 && (T = T.charAt(0) + "." + T.slice(1)), T = T + (j < 0 ? "e" : "e+") + j) : j < 0 ? (T = "0." + A(-j - 1) + T, E && (P = E - R) > 0 && (T += A(P))) : j >= R ? (T += A(j + 1 - R), E && (P = E - j - 1) > 0 && (T = T + "." + A(P))) : ((P = j + 1) < R && (T = T.slice(0, P) + "." + T.slice(P)), E && (P = E - R) > 0 && (j + 1 === R && (T += "."), T += A(P))), b.s < 0 ? "-" + T : T
    }

    function H(b, O) {
      if (b.length > O) return b.length = O, !0
    }

    function F(b) {
      var O, E, P;

      function j(T) {
        var R = this;
        if (!(R instanceof j)) return new j(T);
        if (R.constructor = j, T instanceof j) {
          R.s = T.s, R.e = T.e, R.d = (T = T.d) ? T.slice() : T;
          return
        }
        if (typeof T == "number") {
          if (T * 0 !== 0) throw Error(o + T);
          if (T > 0) R.s = 1;
          else if (T < 0) T = -T, R.s = -1;
          else {
            R.s = 0, R.e = 0, R.d = [0];
            return
          }
          if (T === ~~T && T < 1e7) {
            R.e = 0, R.d = [T];
            return
          }
          return D(R, T.toString())
        } else if (typeof T != "string") throw Error(o + T);
        if (T.charCodeAt(0) === 45 ? (T = T.slice(1), R.s = -1) : R.s = 1, l.test(T)) D(R, T);
        else throw Error(o + T)
      }
      if (j.prototype = m, j.ROUND_UP = 0, j.ROUND_DOWN = 1, j.ROUND_CEIL = 2, j.ROUND_FLOOR = 3, j.ROUND_HALF_UP = 4, j.ROUND_HALF_DOWN = 5, j.ROUND_HALF_EVEN = 6, j.ROUND_HALF_CEIL = 7, j.ROUND_HALF_FLOOR = 8, j.clone = F, j.config = j.set = z, b === void 0 && (b = {}), b)
        for (P = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], O = 0; O < P.length;) b.hasOwnProperty(E = P[O++]) || (b[E] = this[E]);
      return j.config(b), j
    }

    function z(b) {
      if (!b || typeof b != "object") throw Error(i + "Object expected");
      var O, E, P, j = ["precision", 1, e, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (O = 0; O < j.length; O += 3)
        if ((P = b[E = j[O]]) !== void 0)
          if (u(P) === P && P >= j[O + 1] && P <= j[O + 2]) this[E] = P;
          else throw Error(o + E + ": " + P);
      if ((P = b[E = "LN10"]) !== void 0)
        if (P == Math.LN10) this[E] = new this(P);
        else throw Error(o + E + ": " + P);
      return this
    }
    r = F(r), r.default = r.Decimal = r, f = new r(1), typeof define == "function" && define.amd ? define(function() {
      return r
    }) : typeof as < "u" && as.exports ? as.exports = r : (t || (t = typeof self < "u" && self && self.self == self ? self : Function("return this")()), t.Decimal = r)
  })(Fw)
});
var M1 = I((QQ, j1) => {
  function Mz(t) {
    var e = t == null ? 0 : t.length;
    return e ? t[e - 1] : void 0
  }
  j1.exports = Mz
});
var K1 = I((gtt, G1) => {
  "use strict";
  var iF = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  G1.exports = iF
});
var Z1 = I((btt, Y1) => {
  "use strict";
  var oF = K1();

  function V1() {}

  function X1() {}
  X1.resetWarningCache = V1;
  Y1.exports = function() {
    function t(n, i, o, a, u, s) {
      if (s !== oF) {
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
      checkPropTypes: X1,
      resetWarningCache: V1
    };
    return r.PropTypes = r, r
  }
});
var Q1 = I((Ott, J1) => {
  J1.exports = Z1()();
  var xtt, wtt
});
var RO = I((set, NO) => {
  var n8 = kc(),
    i8 = n8(Object.getPrototypeOf, Object);
  NO.exports = i8
});
var qO = I((cet, BO) => {
  var o8 = Ue(),
    a8 = RO(),
    u8 = He(),
    s8 = "[object Object]",
    l8 = Function.prototype,
    c8 = Object.prototype,
    LO = l8.toString,
    f8 = c8.hasOwnProperty,
    p8 = LO.call(Object);

  function d8(t) {
    if (!u8(t) || o8(t) != s8) return !1;
    var e = a8(t);
    if (e === null) return !0;
    var r = f8.call(e, "constructor") && e.constructor;
    return typeof r == "function" && r instanceof r && LO.call(r) == p8
  }
  BO.exports = d8
});
var zO = I((fet, WO) => {
  var m8 = Ue(),
    h8 = He(),
    y8 = "[object Boolean]";

  function v8(t) {
    return t === !0 || t === !1 || h8(t) && m8(t) == y8
  }
  WO.exports = v8
});
var nS = I((_et, rS) => {
  var G8 = Math.ceil,
    K8 = Math.max;

  function V8(t, e, r, n) {
    for (var i = -1, o = K8(G8((e - t) / (r || 1)), 0), a = Array(o); o--;) a[n ? o : ++i] = t, t += r;
    return a
  }
  rS.exports = V8
});
var Wp = I((Pet, oS) => {
  var X8 = of(),
    iS = 1 / 0,
    Y8 = 17976931348623157e292;

  function Z8(t) {
    if (!t) return t === 0 ? t : 0;
    if (t = X8(t), t === iS || t === -iS) {
      var e = t < 0 ? -1 : 1;
      return e * Y8
    }
    return t === t ? t : 0
  }
  oS.exports = Z8
});
var uS = I((Tet, aS) => {
  var J8 = nS(),
    Q8 = to(),
    zp = Wp();

  function t$(t) {
    return function(e, r, n) {
      return n && typeof n != "number" && Q8(e, r, n) && (r = n = void 0), e = zp(e), r === void 0 ? (r = e, e = 0) : r = zp(r), n = n === void 0 ? e < r ? 1 : -1 : zp(n), J8(e, r, n, t)
    }
  }
  aS.exports = t$
});
var Fp = I((Eet, sS) => {
  var e$ = uS(),
    r$ = e$();
  sS.exports = r$
});
var xS = I((Wet, bS) => {
  var y$ = mu();

  function v$(t, e) {
    var r;
    return y$(t, function(n, i, o) {
      return r = e(n, i, o), !r
    }), !!r
  }
  bS.exports = v$
});
var OS = I((zet, wS) => {
  var g$ = Ac(),
    b$ = ur(),
    x$ = xS(),
    w$ = te(),
    O$ = to();

  function S$(t, e, r) {
    var n = w$(t) ? g$ : x$;
    return r && O$(t, e, r) && (e = void 0), n(t, b$(e, 3))
  }
  wS.exports = S$
});
var _S = I(($et, AS) => {
  var SS = Zc();

  function A$(t, e, r) {
    e == "__proto__" && SS ? SS(t, e, {
      configurable: !0,
      enumerable: !0,
      value: r,
      writable: !0
    }) : t[e] = r
  }
  AS.exports = A$
});
var TS = I((Uet, PS) => {
  var _$ = _S(),
    P$ = Vc(),
    T$ = ur();

  function E$(t, e) {
    var r = {};
    return e = T$(e, 3), P$(t, function(n, i, o) {
      _$(r, i, e(n, i, o))
    }), r
  }
  PS.exports = E$
});
var jS = I((Het, ES) => {
  function j$(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length; ++r < n;)
      if (!e(t[r], r, t)) return !1;
    return !0
  }
  ES.exports = j$
});
var CS = I((Get, MS) => {
  var M$ = mu();

  function C$(t, e) {
    var r = !0;
    return M$(t, function(n, i, o) {
      return r = !!e(n, i, o), r
    }), r
  }
  MS.exports = C$
});
var Gp = I((Ket, IS) => {
  var I$ = jS(),
    k$ = CS(),
    D$ = ur(),
    N$ = te(),
    R$ = to();

  function L$(t, e, r) {
    var n = N$(t) ? I$ : k$;
    return r && R$(t, e, r) && (e = void 0), n(t, D$(e, 3))
  }
  IS.exports = L$
});
var ZS = I((grt, YS) => {
  var u6 = ur(),
    s6 = kn(),
    l6 = Ji();

  function c6(t) {
    return function(e, r, n) {
      var i = Object(e);
      if (!s6(e)) {
        var o = u6(r, 3);
        e = l6(e), r = function(u) {
          return o(i[u], u, i)
        }
      }
      var a = t(e, r, n);
      return a > -1 ? i[o ? e[a] : a] : void 0
    }
  }
  YS.exports = c6
});
var QS = I((brt, JS) => {
  var f6 = Wp();

  function p6(t) {
    var e = f6(t),
      r = e % 1;
    return e === e ? r ? e - r : e : 0
  }
  JS.exports = p6
});
var eA = I((xrt, tA) => {
  var d6 = $c(),
    m6 = ur(),
    h6 = QS(),
    y6 = Math.max;

  function v6(t, e, r) {
    var n = t == null ? 0 : t.length;
    if (!n) return -1;
    var i = r == null ? 0 : h6(r);
    return i < 0 && (i = y6(n + i, 0)), d6(t, m6(e, 3), i)
  }
  tA.exports = v6
});
var nA = I((wrt, rA) => {
  var g6 = ZS(),
    b6 = eA(),
    x6 = g6(b6);
  rA.exports = x6
});
var m_ = I((yit, gd) => {
  "use strict";
  var l4 = Object.prototype.hasOwnProperty,
    oe = "~";

  function Sa() {}
  Object.create && (Sa.prototype = Object.create(null), new Sa().__proto__ || (oe = !1));

  function c4(t, e, r) {
    this.fn = t, this.context = e, this.once = r || !1
  }

  function d_(t, e, r, n, i) {
    if (typeof r != "function") throw new TypeError("The listener must be a function");
    var o = new c4(r, n || t, i),
      a = oe ? oe + e : e;
    return t._events[a] ? t._events[a].fn ? t._events[a] = [t._events[a], o] : t._events[a].push(o) : (t._events[a] = o, t._eventsCount++), t
  }

  function el(t, e) {
    --t._eventsCount === 0 ? t._events = new Sa : delete t._events[e]
  }

  function Qt() {
    this._events = new Sa, this._eventsCount = 0
  }
  Qt.prototype.eventNames = function() {
    var e = [],
      r, n;
    if (this._eventsCount === 0) return e;
    for (n in r = this._events) l4.call(r, n) && e.push(oe ? n.slice(1) : n);
    return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(r)) : e
  };
  Qt.prototype.listeners = function(e) {
    var r = oe ? oe + e : e,
      n = this._events[r];
    if (!n) return [];
    if (n.fn) return [n.fn];
    for (var i = 0, o = n.length, a = new Array(o); i < o; i++) a[i] = n[i].fn;
    return a
  };
  Qt.prototype.listenerCount = function(e) {
    var r = oe ? oe + e : e,
      n = this._events[r];
    return n ? n.fn ? 1 : n.length : 0
  };
  Qt.prototype.emit = function(e, r, n, i, o, a) {
    var u = oe ? oe + e : e;
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
  Qt.prototype.on = function(e, r, n) {
    return d_(this, e, r, n, !1)
  };
  Qt.prototype.once = function(e, r, n) {
    return d_(this, e, r, n, !0)
  };
  Qt.prototype.removeListener = function(e, r, n, i) {
    var o = oe ? oe + e : e;
    if (!this._events[o]) return this;
    if (!r) return el(this, o), this;
    var a = this._events[o];
    if (a.fn) a.fn === r && (!i || a.once) && (!n || a.context === n) && el(this, o);
    else {
      for (var u = 0, s = [], l = a.length; u < l; u++)(a[u].fn !== r || i && !a[u].once || n && a[u].context !== n) && s.push(a[u]);
      s.length ? this._events[o] = s.length === 1 ? s[0] : s : el(this, o)
    }
    return this
  };
  Qt.prototype.removeAllListeners = function(e) {
    var r;
    return e ? (r = oe ? oe + e : e, this._events[r] && el(this, r)) : (this._events = new Sa, this._eventsCount = 0), this
  };
  Qt.prototype.off = Qt.prototype.removeListener;
  Qt.prototype.addListener = Qt.prototype.on;
  Qt.prefixed = oe;
  Qt.EventEmitter = Qt;
  typeof gd < "u" && (gd.exports = Qt)
});
import ml, {
  useState as Gt,
  useEffect as Pa,
  useCallback as $e,
  useRef as Z4
} from "./react-shim-eraudit.js";
import Ll from "./react-shim-eraudit.js";

function Td(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var i = t.length;
      for (e = 0; e < i; e++) t[e] && (r = Td(t[e])) && (n && (n += " "), n += r)
    } else
      for (r in t) t[r] && (n && (n += " "), n += r);
  return n
}

function V_() {
  for (var t, e, r = 0, n = "", i = arguments.length; r < i; r++)(t = arguments[r]) && (e = Td(t)) && (n && (n += " "), n += e);
  return n
}
var ot = V_;
var Il = Q(Dr()),
  xn = Q(xe()),
  Mh = Q(Na()),
  Ch = Q(It()),
  Ih = Q(be()),
  kh = Q(hh());
import {
  Children as kl,
  isValidElement as rj
} from "./react-shim-eraudit.js";
var gn = Q(Na()),
  Tl = Q(Pl()),
  gh = Q(Dr()),
  bh = Q(_l()),
  xh = Q(xe()),
  Kt = function(e) {
    return e === 0 ? 0 : e > 0 ? 1 : -1
  },
  or = function(e) {
    return (0, gn.default)(e) && e.indexOf("%") === e.length - 1
  },
  X = function(e) {
    return (0, bh.default)(e) && !(0, Tl.default)(e)
  },
  wh = function(e) {
    return (0, xh.default)(e)
  },
  Tt = function(e) {
    return X(e) || (0, gn.default)(e)
  },
  XE = 0,
  Ge = function(e) {
    var r = ++XE;
    return "".concat(e || "").concat(r)
  },
  ke = function(e, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!X(e) && !(0, gn.default)(e)) return n;
    var o;
    if (or(e)) {
      var a = e.indexOf("%");
      o = r * parseFloat(e.slice(0, a)) / 100
    } else o = +e;
    return (0, Tl.default)(o) && (o = n), i && o > r && (o = r), o
  },
  Ke = function(e) {
    if (!e) return null;
    var r = Object.keys(e);
    return r && r.length ? e[r[0]] : null
  },
  Oh = function(e) {
    if (!Array.isArray(e)) return !1;
    for (var r = e.length, n = {}, i = 0; i < r; i++)
      if (!n[e[i]]) n[e[i]] = !0;
      else return !0;
    return !1
  },
  ce = function(e, r) {
    return X(e) && X(r) ? function(n) {
      return e + n * (r - e)
    } : function() {
      return r
    }
  };

function bn(t, e, r) {
  return !t || !t.length ? null : t.find(function(n) {
    return n && (typeof e == "function" ? e(n) : (0, gh.default)(n, e)) === r
  })
}
var Sh = function(e, r) {
  return X(e) && X(r) ? e - r : (0, gn.default)(e) && (0, gn.default)(r) ? e.localeCompare(r) : e instanceof Date && r instanceof Date ? e.getTime() - r.getTime() : String(e).localeCompare(String(r))
};

function ar(t, e) {
  for (var r in t)
    if ({}.hasOwnProperty.call(t, r) && (!{}.hasOwnProperty.call(e, r) || t[r] !== e[r])) return !1;
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n) && !{}.hasOwnProperty.call(t, n)) return !1;
  return !0
}
var jl = Q(be());
import {
  isValidElement as YE
} from "./react-shim-eraudit.js";

function El(t) {
  "@babel/helpers - typeof";
  return El = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, El(t)
}
var ZE = ["viewBox", "children"],
  _h = ["aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "className", "color", "height", "id", "lang", "max", "media", "method", "min", "name", "style", "target", "width", "role", "tabIndex", "accentHeight", "accumulate", "additive", "alignmentBaseline", "allowReorder", "alphabetic", "amplitude", "arabicForm", "ascent", "attributeName", "attributeType", "autoReverse", "azimuth", "baseFrequency", "baselineShift", "baseProfile", "bbox", "begin", "bias", "by", "calcMode", "capHeight", "clip", "clipPath", "clipPathUnits", "clipRule", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "contentScriptType", "contentStyleType", "cursor", "cx", "cy", "d", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominantBaseline", "dur", "dx", "dy", "edgeMode", "elevation", "enableBackground", "end", "exponent", "externalResourcesRequired", "fill", "fillOpacity", "fillRule", "filter", "filterRes", "filterUnits", "floodColor", "floodOpacity", "focusable", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "format", "from", "fx", "fy", "g1", "g2", "glyphName", "glyphOrientationHorizontal", "glyphOrientationVertical", "glyphRef", "gradientTransform", "gradientUnits", "hanging", "horizAdvX", "horizOriginX", "href", "ideographic", "imageRendering", "in2", "in", "intercept", "k1", "k2", "k3", "k4", "k", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letterSpacing", "lightingColor", "limitingConeAngle", "local", "markerEnd", "markerHeight", "markerMid", "markerStart", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "mode", "numOctaves", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlinePosition", "overlineThickness", "paintOrder", "panose1", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointerEvents", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "r", "radius", "refX", "refY", "renderingIntent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "result", "rotate", "rx", "ry", "seed", "shapeRendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stopColor", "stopOpacity", "strikethroughPosition", "strikethroughThickness", "string", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textAnchor", "textDecoration", "textLength", "textRendering", "to", "transform", "u1", "u2", "underlinePosition", "underlineThickness", "unicode", "unicodeBidi", "unicodeRange", "unitsPerEm", "vAlphabetic", "values", "vectorEffect", "version", "vertAdvY", "vertOriginX", "vertOriginY", "vHanging", "vIdeographic", "viewTarget", "visibility", "vMathematical", "widths", "wordSpacing", "writingMode", "x1", "x2", "x", "xChannelSelector", "xHeight", "xlinkActuate", "xlinkArcrole", "xlinkHref", "xlinkRole", "xlinkShow", "xlinkTitle", "xlinkType", "xmlBase", "xmlLang", "xmlns", "xmlnsXlink", "xmlSpace", "y1", "y2", "y", "yChannelSelector", "z", "zoomAndPan", "ref", "key", "angle"],
  Ah = ["points", "pathLength"],
  Ga = {
    svg: ZE,
    polygon: Ah,
    polyline: Ah
  },
  Ka = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"],
  Nr = function(e, r) {
    if (!e || typeof e == "function" || typeof e == "boolean") return null;
    var n = e;
    if (YE(e) && (n = e.props), !(0, jl.default)(n)) return null;
    var i = {};
    return Object.keys(n).forEach(function(o) {
      Ka.includes(o) && (i[o] = r || function(a) {
        return n[o](n, a)
      })
    }), i
  },
  JE = function(e, r, n) {
    return function(i) {
      return e(r, n, i), null
    }
  },
  Rr = function(e, r, n) {
    if (!(0, jl.default)(e) || El(e) !== "object") return null;
    var i = null;
    return Object.keys(e).forEach(function(o) {
      var a = e[o];
      Ka.includes(o) && typeof a == "function" && (i || (i = {}), i[o] = JE(a, r, n))
    }), i
  };
var QE = ["children"],
  tj = ["children"];

function Ph(t, e) {
  if (t == null) return {};
  var r = ej(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function ej(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Cl(t) {
  "@babel/helpers - typeof";
  return Cl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Cl(t)
}
var Th = {
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
var Oe = function(e) {
    return typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : ""
  },
  Eh = null,
  Ml = null,
  Dl = function t(e) {
    if (e === Eh && Array.isArray(Ml)) return Ml;
    var r = [];
    return kl.forEach(e, function(n) {
      (0, xn.default)(n) || ((0, kh.isFragment)(n) ? r = r.concat(t(n.props.children)) : r.push(n))
    }), Ml = r, Eh = e, r
  };

function Lt(t, e) {
  var r = [],
    n = [];
  return Array.isArray(e) ? n = e.map(function(i) {
    return Oe(i)
  }) : n = [Oe(e)], Dl(t).forEach(function(i) {
    var o = (0, Il.default)(i, "type.displayName") || (0, Il.default)(i, "type.name");
    n.indexOf(o) !== -1 && r.push(i)
  }), r
}

function Vt(t, e) {
  var r = Lt(t, e);
  return r && r[0]
}
var Nl = function(e) {
    if (!e || !e.props) return !1;
    var r = e.props,
      n = r.width,
      i = r.height;
    return !(!X(n) || n <= 0 || !X(i) || i <= 0)
  },
  nj = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"],
  ij = function(e) {
    return e && e.type && (0, Mh.default)(e.type) && nj.indexOf(e.type) >= 0
  },
  Dh = function(e) {
    return e && Cl(e) === "object" && "clipDot" in e
  },
  oj = function(e, r, n, i) {
    var o, a = (o = Ga === null || Ga === void 0 ? void 0 : Ga[i]) !== null && o !== void 0 ? o : [];
    return r.startsWith("data-") || !(0, Ch.default)(e) && (i && a.includes(r) || _h.includes(r)) || n && Ka.includes(r)
  };
var at = function(e, r, n) {
    if (!e || typeof e == "function" || typeof e == "boolean") return null;
    var i = e;
    if (rj(e) && (i = e.props), !(0, Ih.default)(i)) return null;
    var o = {};
    return Object.keys(i).forEach(function(a) {
      var u;
      oj((u = i) === null || u === void 0 ? void 0 : u[a], a, r, n) && (o[a] = i[a])
    }), o
  },
  Va = function t(e, r) {
    if (e === r) return !0;
    var n = kl.count(e);
    if (n !== kl.count(r)) return !1;
    if (n === 0) return !0;
    if (n === 1) return jh(Array.isArray(e) ? e[0] : e, Array.isArray(r) ? r[0] : r);
    for (var i = 0; i < n; i++) {
      var o = e[i],
        a = r[i];
      if (Array.isArray(o) || Array.isArray(a)) {
        if (!t(o, a)) return !1
      } else if (!jh(o, a)) return !1
    }
    return !0
  },
  jh = function(e, r) {
    if ((0, xn.default)(e) && (0, xn.default)(r)) return !0;
    if (!(0, xn.default)(e) && !(0, xn.default)(r)) {
      var n = e.props || {},
        i = n.children,
        o = Ph(n, QE),
        a = r.props || {},
        u = a.children,
        s = Ph(a, tj);
      return i && u ? ar(o, s) && Va(i, u) : !i && !u ? ar(o, s) : !1
    }
    return !1
  },
  Rl = function(e, r) {
    var n = [],
      i = {};
    return Dl(e).forEach(function(o, a) {
      if (ij(o)) n.push(o);
      else if (o) {
        var u = Oe(o.type),
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
  Nh = function(e) {
    var r = e && e.type;
    return r && Th[r] ? Th[r] : null
  },
  Rh = function(e, r) {
    return Dl(r).indexOf(e)
  };
var aj = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];

function Bl() {
  return Bl = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Bl.apply(this, arguments)
}

function uj(t, e) {
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

function $i(t) {
  var e = t.children,
    r = t.width,
    n = t.height,
    i = t.viewBox,
    o = t.className,
    a = t.style,
    u = t.title,
    s = t.desc,
    l = uj(t, aj),
    f = i || {
      width: r,
      height: n,
      x: 0,
      y: 0
    },
    c = ot("recharts-surface", o);
  return Ll.createElement("svg", Bl({}, at(l, !0, "svg"), {
    className: c,
    width: r,
    height: n,
    style: a,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), Ll.createElement("title", null, u), Ll.createElement("desc", null, s), e)
}
import Lh from "./react-shim-eraudit.js";
var lj = ["children", "className"];

function ql() {
  return ql = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, ql.apply(this, arguments)
}

function cj(t, e) {
  if (t == null) return {};
  var r = fj(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function fj(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var bt = Lh.forwardRef(function(t, e) {
  var r = t.children,
    n = t.className,
    i = cj(t, lj),
    o = ot("recharts-layer", n);
  return Lh.createElement("g", ql({
    className: o
  }, at(i, !0), {
    ref: e
  }), r)
});
import Qi, {
  PureComponent as wD
} from "./react-shim-eraudit.js";
var wc = Q(It());
import Ve, {
  PureComponent as _M
} from "./react-shim-eraudit.js";
var pj = !1,
  ee = function(e, r) {
    for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) i[o - 2] = arguments[o];
    if (pj && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !e))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var a = 0;
        console.warn(r.replace(/%s/g, function() {
          return i[a++]
        }))
      }
  };
var gc = Q(Xa());
import pM from "./react-shim-eraudit.js";

function Ot(t) {
  return function() {
    return t
  }
}
var $l = Math.cos;
var Ui = Math.sin,
  Ft = Math.sqrt;
var Lr = Math.PI,
  kH = Lr / 2,
  wn = 2 * Lr;
var Ul = Math.PI,
  Hl = 2 * Ul,
  Br = 1e-6,
  Yj = Hl - Br;

function iy(t) {
  this._ += t[0];
  for (let e = 1, r = t.length; e < r; ++e) this._ += arguments[e] + t[e]
}

function Zj(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return iy;
  let r = 10 ** e;
  return function(n) {
    this._ += n[0];
    for (let i = 1, o = n.length; i < o; ++i) this._ += Math.round(arguments[i] * r) / r + n[i]
  }
}
var qr = class {
  constructor(e) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? iy : Zj(e)
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
    else if (p > Br)
      if (!(Math.abs(c * s - l * f) > Br) || !o) this._append`L${this._x1=e},${this._y1=r}`;
      else {
        let d = n - a,
          y = i - u,
          m = s * s + l * l,
          v = d * d + y * y,
          x = Math.sqrt(m),
          w = Math.sqrt(p),
          S = o * Math.tan((Ul - Math.acos((m + p - v) / (2 * x * w))) / 2),
          _ = S / w,
          h = S / x;
        Math.abs(_ - 1) > Br && this._append`L${e+_*f},${r+_*c}`, this._append`A${o},${o},0,0,${+(c*d>f*y)},${this._x1=e+h*s},${this._y1=r+h*l}`
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
    this._x1 === null ? this._append`M${l},${f}` : (Math.abs(this._x1 - l) > Br || Math.abs(this._y1 - f) > Br) && this._append`L${l},${f}`, n && (p < 0 && (p = p % Hl + Hl), p > Yj ? this._append`A${n},${n},0,1,${c},${e-u},${r-s}A${n},${n},0,1,${c},${this._x1=l},${this._y1=f}` : p > Br && this._append`A${n},${n},0,${+(p>=Ul)},${c},${this._x1=e+n*Math.cos(o)},${this._y1=r+n*Math.sin(o)}`)
  }
  rect(e, r, n, i) {
    this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+r}h${n=+n}v${+i}h${-n}Z`
  }
  toString() {
    return this._
  }
};

function oy() {
  return new qr
}
oy.prototype = qr.prototype;

function On(t) {
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
  }, () => new qr(e)
}
var zH = Array.prototype.slice;

function Sn(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t)
}

function ay(t) {
  this._context = t
}
ay.prototype = {
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

function vr(t) {
  return new ay(t)
}

function Ya(t) {
  return t[0]
}

function Za(t) {
  return t[1]
}

function Hi(t, e) {
  var r = Ot(!0),
    n = null,
    i = vr,
    o = null,
    a = On(u);
  t = typeof t == "function" ? t : t === void 0 ? Ya : Ot(t), e = typeof e == "function" ? e : e === void 0 ? Za : Ot(e);

  function u(s) {
    var l, f = (s = Sn(s)).length,
      c, p = !1,
      d;
    for (n == null && (o = i(d = a())), l = 0; l <= f; ++l) !(l < f && r(c = s[l], l, s)) === p && ((p = !p) ? o.lineStart() : o.lineEnd()), p && o.point(+t(c, l, s), +e(c, l, s));
    if (d) return o = null, d + "" || null
  }
  return u.x = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : Ot(+s), u) : t
  }, u.y = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : Ot(+s), u) : e
  }, u.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : Ot(!!s), u) : r
  }, u.curve = function(s) {
    return arguments.length ? (i = s, n != null && (o = i(n)), u) : i
  }, u.context = function(s) {
    return arguments.length ? (s == null ? n = o = null : o = i(n = s), u) : n
  }, u
}

function An(t, e, r) {
  var n = null,
    i = Ot(!0),
    o = null,
    a = vr,
    u = null,
    s = On(l);
  t = typeof t == "function" ? t : t === void 0 ? Ya : Ot(+t), e = typeof e == "function" ? e : e === void 0 ? Ot(0) : Ot(+e), r = typeof r == "function" ? r : r === void 0 ? Za : Ot(+r);

  function l(c) {
    var p, d, y, m = (c = Sn(c)).length,
      v, x = !1,
      w, S = new Array(m),
      _ = new Array(m);
    for (o == null && (u = a(w = s())), p = 0; p <= m; ++p) {
      if (!(p < m && i(v = c[p], p, c)) === x)
        if (x = !x) d = p, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), y = p - 1; y >= d; --y) u.point(S[y], _[y]);
          u.lineEnd(), u.areaEnd()
        } x && (S[p] = +t(v, p, c), _[p] = +e(v, p, c), u.point(n ? +n(v, p, c) : S[p], r ? +r(v, p, c) : _[p]))
    }
    if (w) return u = null, w + "" || null
  }

  function f() {
    return Hi().defined(i).curve(a).context(o)
  }
  return l.x = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Ot(+c), n = null, l) : t
  }, l.x0 = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Ot(+c), l) : t
  }, l.x1 = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : Ot(+c), l) : n
  }, l.y = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Ot(+c), r = null, l) : e
  }, l.y0 = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Ot(+c), l) : e
  }, l.y1 = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : Ot(+c), l) : r
  }, l.lineX0 = l.lineY0 = function() {
    return f().x(t).y(e)
  }, l.lineY1 = function() {
    return f().x(t).y(r)
  }, l.lineX1 = function() {
    return f().x(n).y(e)
  }, l.defined = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : Ot(!!c), l) : i
  }, l.curve = function(c) {
    return arguments.length ? (a = c, o != null && (u = a(o)), l) : a
  }, l.context = function(c) {
    return arguments.length ? (c == null ? o = u = null : u = a(o = c), l) : o
  }, l
}
var Ja = class {
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

function Gl(t) {
  return new Ja(t, !0)
}

function Kl(t) {
  return new Ja(t, !1)
}
var _n = {
  draw(t, e) {
    let r = Ft(e / Lr);
    t.moveTo(r, 0), t.arc(0, 0, r, 0, wn)
  }
};
var Vl = {
  draw(t, e) {
    let r = Ft(e / 5) / 2;
    t.moveTo(-3 * r, -r), t.lineTo(-r, -r), t.lineTo(-r, -3 * r), t.lineTo(r, -3 * r), t.lineTo(r, -r), t.lineTo(3 * r, -r), t.lineTo(3 * r, r), t.lineTo(r, r), t.lineTo(r, 3 * r), t.lineTo(-r, 3 * r), t.lineTo(-r, r), t.lineTo(-3 * r, r), t.closePath()
  }
};
var uy = Ft(1 / 3),
  Jj = uy * 2,
  Xl = {
    draw(t, e) {
      let r = Ft(e / Jj),
        n = r * uy;
      t.moveTo(0, -r), t.lineTo(n, 0), t.lineTo(0, r), t.lineTo(-n, 0), t.closePath()
    }
  };
var Yl = {
  draw(t, e) {
    let r = Ft(e),
      n = -r / 2;
    t.rect(n, n, r, r)
  }
};
var Qj = .8908130915292852,
  sy = Ui(Lr / 10) / Ui(7 * Lr / 10),
  tM = Ui(wn / 10) * sy,
  eM = -$l(wn / 10) * sy,
  Zl = {
    draw(t, e) {
      let r = Ft(e * Qj),
        n = tM * r,
        i = eM * r;
      t.moveTo(0, -r), t.lineTo(n, i);
      for (let o = 1; o < 5; ++o) {
        let a = wn * o / 5,
          u = $l(a),
          s = Ui(a);
        t.lineTo(s * r, -u * r), t.lineTo(u * n - s * i, s * n + u * i)
      }
      t.closePath()
    }
  };
var Jl = Ft(3),
  Ql = {
    draw(t, e) {
      let r = -Ft(e / (Jl * 3));
      t.moveTo(0, r * 2), t.lineTo(-Jl * r, -r), t.lineTo(Jl * r, -r), t.closePath()
    }
  };
var Se = -.5,
  Ae = Ft(3) / 2,
  tc = 1 / Ft(12),
  rM = (tc / 2 + 1) * 3,
  ec = {
    draw(t, e) {
      let r = Ft(e / rM),
        n = r / 2,
        i = r * tc,
        o = n,
        a = r * tc + r,
        u = -o,
        s = a;
      t.moveTo(n, i), t.lineTo(o, a), t.lineTo(u, s), t.lineTo(Se * n - Ae * i, Ae * n + Se * i), t.lineTo(Se * o - Ae * a, Ae * o + Se * a), t.lineTo(Se * u - Ae * s, Ae * u + Se * s), t.lineTo(Se * n + Ae * i, Se * i - Ae * n), t.lineTo(Se * o + Ae * a, Se * a - Ae * o), t.lineTo(Se * u + Ae * s, Se * s - Ae * u), t.closePath()
    }
  };

function Qa(t, e) {
  let r = null,
    n = On(i);
  t = typeof t == "function" ? t : Ot(t || _n), e = typeof e == "function" ? e : Ot(e === void 0 ? 64 : +e);

  function i() {
    let o;
    if (r || (r = o = n()), t.apply(this, arguments).draw(r, +e.apply(this, arguments)), o) return r = null, o + "" || null
  }
  return i.type = function(o) {
    return arguments.length ? (t = typeof o == "function" ? o : Ot(o), i) : t
  }, i.size = function(o) {
    return arguments.length ? (e = typeof o == "function" ? o : Ot(+o), i) : e
  }, i.context = function(o) {
    return arguments.length ? (r = o ?? null, i) : r
  }, i
}

function Pn() {}

function Tn(t, e, r) {
  t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + e) / 6, (t._y0 + 4 * t._y1 + r) / 6)
}

function ly(t) {
  this._context = t
}
ly.prototype = {
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
        Tn(this, this._x1, this._y1);
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
        Tn(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function rc(t) {
  return new ly(t)
}

function cy(t) {
  this._context = t
}
cy.prototype = {
  areaStart: Pn,
  areaEnd: Pn,
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
        Tn(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function nc(t) {
  return new cy(t)
}

function fy(t) {
  this._context = t
}
fy.prototype = {
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
        Tn(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function ic(t) {
  return new fy(t)
}

function py(t) {
  this._context = t
}
py.prototype = {
  areaStart: Pn,
  areaEnd: Pn,
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

function oc(t) {
  return new py(t)
}

function dy(t) {
  return t < 0 ? -1 : 1
}

function my(t, e, r) {
  var n = t._x1 - t._x0,
    i = e - t._x1,
    o = (t._y1 - t._y0) / (n || i < 0 && -0),
    a = (r - t._y1) / (i || n < 0 && -0),
    u = (o * i + a * n) / (n + i);
  return (dy(o) + dy(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0
}

function hy(t, e) {
  var r = t._x1 - t._x0;
  return r ? (3 * (t._y1 - t._y0) / r - e) / 2 : e
}

function ac(t, e, r) {
  var n = t._x0,
    i = t._y0,
    o = t._x1,
    a = t._y1,
    u = (o - n) / 3;
  t._context.bezierCurveTo(n + u, i + u * e, o - u, a - u * r, o, a)
}

function tu(t) {
  this._context = t
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
        ac(this, this._t0, hy(this, this._t0));
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
          this._point = 3, ac(this, hy(this, r = my(this, t, e)), r);
          break;
        default:
          ac(this, this._t0, r = my(this, t, e));
          break
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = r
    }
  }
};

function yy(t) {
  this._context = new vy(t)
}(yy.prototype = Object.create(tu.prototype)).point = function(t, e) {
  tu.prototype.point.call(this, e, t)
};

function vy(t) {
  this._context = t
}
vy.prototype = {
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

function uc(t) {
  return new tu(t)
}

function sc(t) {
  return new yy(t)
}

function by(t) {
  this._context = t
}
by.prototype = {
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
        for (var n = gy(t), i = gy(e), o = 0, a = 1; a < r; ++o, ++a) this._context.bezierCurveTo(n[0][o], i[0][o], n[1][o], i[1][o], t[a], e[a]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e)
  }
};

function gy(t) {
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

function lc(t) {
  return new by(t)
}

function eu(t, e) {
  this._context = t, this._t = e
}
eu.prototype = {
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

function cc(t) {
  return new eu(t, .5)
}

function fc(t) {
  return new eu(t, 0)
}

function pc(t) {
  return new eu(t, 1)
}

function _e(t, e) {
  if ((a = t.length) > 1)
    for (var r = 1, n, i, o = t[e[0]], a, u = o.length; r < a; ++r)
      for (i = o, o = t[e[r]], n = 0; n < u; ++n) o[n][1] += o[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1]
}

function En(t) {
  for (var e = t.length, r = new Array(e); --e >= 0;) r[e] = e;
  return r
}

function nM(t, e) {
  return t[e]
}

function iM(t) {
  let e = [];
  return e.key = t, e
}

function dc() {
  var t = Ot([]),
    e = En,
    r = _e,
    n = nM;

  function i(o) {
    var a = Array.from(t.apply(this, arguments), iM),
      u, s = a.length,
      l = -1,
      f;
    for (let c of o)
      for (u = 0, ++l; u < s; ++u)(a[u][l] = [0, +n(c, a[u].key, l, o)]).data = c;
    for (u = 0, f = Sn(e(a)); u < s; ++u) a[f[u]].index = u;
    return r(a, f), a
  }
  return i.keys = function(o) {
    return arguments.length ? (t = typeof o == "function" ? o : Ot(Array.from(o)), i) : t
  }, i.value = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : Ot(+o), i) : n
  }, i.order = function(o) {
    return arguments.length ? (e = o == null ? En : typeof o == "function" ? o : Ot(Array.from(o)), i) : e
  }, i.offset = function(o) {
    return arguments.length ? (r = o ?? _e, i) : r
  }, i
}

function mc(t, e) {
  if ((n = t.length) > 0) {
    for (var r, n, i = 0, o = t[0].length, a; i < o; ++i) {
      for (a = r = 0; r < n; ++r) a += t[r][i][1] || 0;
      if (a)
        for (r = 0; r < n; ++r) t[r][i][1] /= a
    }
    _e(t, e)
  }
}

function hc(t, e) {
  if ((i = t.length) > 0) {
    for (var r = 0, n = t[e[0]], i, o = n.length; r < o; ++r) {
      for (var a = 0, u = 0; a < i; ++a) u += t[a][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2
    }
    _e(t, e)
  }
}

function yc(t, e) {
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
    i[n - 1][1] += i[n - 1][0] = r, _e(t, e)
  }
}

function Gi(t) {
  "@babel/helpers - typeof";
  return Gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Gi(t)
}
var aM = ["type", "size", "sizeType"];

function vc() {
  return vc = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, vc.apply(this, arguments)
}

function xy(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function wy(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? xy(Object(r), !0).forEach(function(n) {
      uM(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : xy(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function uM(t, e, r) {
  return e = sM(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function sM(t) {
  var e = lM(t, "string");
  return Gi(e) == "symbol" ? e : e + ""
}

function lM(t, e) {
  if (Gi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Gi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function cM(t, e) {
  if (t == null) return {};
  var r = fM(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function fM(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var Oy = {
    symbolCircle: _n,
    symbolCross: Vl,
    symbolDiamond: Xl,
    symbolSquare: Yl,
    symbolStar: Zl,
    symbolTriangle: Ql,
    symbolWye: ec
  },
  dM = Math.PI / 180,
  mM = function(e) {
    var r = "symbol".concat((0, gc.default)(e));
    return Oy[r] || _n
  },
  hM = function(e, r, n) {
    if (r === "area") return e;
    switch (n) {
      case "cross":
        return 5 * e * e / 9;
      case "diamond":
        return .5 * e * e / Math.sqrt(3);
      case "square":
        return e * e;
      case "star": {
        var i = 18 * dM;
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
  yM = function(e, r) {
    Oy["symbol".concat((0, gc.default)(e))] = r
  },
  Ki = function(e) {
    var r = e.type,
      n = r === void 0 ? "circle" : r,
      i = e.size,
      o = i === void 0 ? 64 : i,
      a = e.sizeType,
      u = a === void 0 ? "area" : a,
      s = cM(e, aM),
      l = wy(wy({}, s), {}, {
        type: n,
        size: o,
        sizeType: u
      }),
      f = function() {
        var v = mM(n),
          x = Qa().type(v).size(hM(o, u, n));
        return x()
      },
      c = l.className,
      p = l.cx,
      d = l.cy,
      y = at(l, !0);
    return p === +p && d === +d && o === +o ? pM.createElement("path", vc({}, y, {
      className: ot("recharts-symbols", c),
      transform: "translate(".concat(p, ", ").concat(d, ")"),
      d: f()
    })) : null
  };
Ki.registerSymbol = yM;

function jn(t) {
  "@babel/helpers - typeof";
  return jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, jn(t)
}

function bc() {
  return bc = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, bc.apply(this, arguments)
}

function Sy(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function vM(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Sy(Object(r), !0).forEach(function(n) {
      Vi(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Sy(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function gM(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Ay(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Py(n.key), n)
  }
}

function bM(t, e, r) {
  return e && Ay(t.prototype, e), r && Ay(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function xM(t, e, r) {
  return e = ru(e), wM(t, _y() ? Reflect.construct(e, r || [], ru(t).constructor) : e.apply(t, r))
}

function wM(t, e) {
  if (e && (jn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return OM(t)
}

function OM(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function _y() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (_y = function() {
    return !!t
  })()
}

function ru(t) {
  return ru = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ru(t)
}

function SM(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && xc(t, e)
}

function xc(t, e) {
  return xc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, xc(t, e)
}

function Vi(t, e, r) {
  return e = Py(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Py(t) {
  var e = AM(t, "string");
  return jn(e) == "symbol" ? e : e + ""
}

function AM(t, e) {
  if (jn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (jn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Pe = 32,
  nu = function(t) {
    function e() {
      return gM(this, e), xM(this, e, arguments)
    }
    return SM(e, t), bM(e, [{
      key: "renderIcon",
      value: function(n) {
        var i = this.props.inactiveColor,
          o = Pe / 2,
          a = Pe / 6,
          u = Pe / 3,
          s = n.inactive ? i : n.color;
        if (n.type === "plainline") return Ve.createElement("line", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          strokeDasharray: n.payload.strokeDasharray,
          x1: 0,
          y1: o,
          x2: Pe,
          y2: o,
          className: "recharts-legend-icon"
        });
        if (n.type === "line") return Ve.createElement("path", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          d: "M0,".concat(o, "h").concat(u, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * u, ",").concat(o, `
            H`).concat(Pe, "M").concat(2 * u, ",").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(u, ",").concat(o),
          className: "recharts-legend-icon"
        });
        if (n.type === "rect") return Ve.createElement("path", {
          stroke: "none",
          fill: s,
          d: "M0,".concat(Pe / 8, "h").concat(Pe, "v").concat(Pe * 3 / 4, "h").concat(-Pe, "z"),
          className: "recharts-legend-icon"
        });
        if (Ve.isValidElement(n.legendIcon)) {
          var l = vM({}, n);
          return delete l.legendIcon, Ve.cloneElement(n.legendIcon, l)
        }
        return Ve.createElement(Ki, {
          fill: s,
          cx: o,
          cy: o,
          size: Pe,
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
            width: Pe,
            height: Pe
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
            v = ot(Vi(Vi({
              "recharts-legend-item": !0
            }, "legend-item-".concat(y), !0), "inactive", d.inactive));
          if (d.type === "none") return null;
          var x = (0, wc.default)(d.value) ? null : d.value;
          ee(!(0, wc.default)(d.value), `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`);
          var w = d.inactive ? l : d.color;
          return Ve.createElement("li", bc({
            className: v,
            style: c,
            key: "legend-item-".concat(y)
          }, Rr(n.props, d, y)), Ve.createElement($i, {
            width: a,
            height: a,
            viewBox: f,
            style: p
          }, n.renderIcon(d)), Ve.createElement("span", {
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
        return Ve.createElement("ul", {
          className: "recharts-default-legend",
          style: u
        }, this.renderItems())
      }
    }])
  }(_M);
Vi(nu, "displayName", "Legend");
Vi(nu, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Hc = Q(cb()),
  fb = Q(It());

function fu(t, e, r) {
  return e === !0 ? (0, Hc.default)(t, r) : (0, fb.default)(e) ? (0, Hc.default)(t, e) : t
}

function Nn(t) {
  "@babel/helpers - typeof";
  return Nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Nn(t)
}
var fD = ["ref"];

function pb(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function sr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? pb(Object(r), !0).forEach(function(n) {
      du(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : pb(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function pD(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function db(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, yb(n.key), n)
  }
}

function dD(t, e, r) {
  return e && db(t.prototype, e), r && db(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function mD(t, e, r) {
  return e = pu(e), hD(t, hb() ? Reflect.construct(e, r || [], pu(t).constructor) : e.apply(t, r))
}

function hD(t, e) {
  if (e && (Nn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return yD(t)
}

function yD(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function hb() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (hb = function() {
    return !!t
  })()
}

function pu(t) {
  return pu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, pu(t)
}

function vD(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Gc(t, e)
}

function Gc(t, e) {
  return Gc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Gc(t, e)
}

function du(t, e, r) {
  return e = yb(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function yb(t) {
  var e = gD(t, "string");
  return Nn(e) == "symbol" ? e : e + ""
}

function gD(t, e) {
  if (Nn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Nn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function bD(t, e) {
  if (t == null) return {};
  var r = xD(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function xD(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function OD(t) {
  return t.value
}

function SD(t, e) {
  if (Qi.isValidElement(t)) return Qi.cloneElement(t, e);
  if (typeof t == "function") return Qi.createElement(t, e);
  var r = e.ref,
    n = bD(e, fD);
  return Qi.createElement(nu, n)
}
var mb = 1,
  Te = function(t) {
    function e() {
      var r;
      pD(this, e);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = mD(this, e, [].concat(i)), du(r, "lastBoundingBox", {
        width: -1,
        height: -1
      }), r
    }
    return vD(e, t), dD(e, [{
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
        i ? (Math.abs(i.width - this.lastBoundingBox.width) > mb || Math.abs(i.height - this.lastBoundingBox.height) > mb) && (this.lastBoundingBox.width = i.width, this.lastBoundingBox.height = i.height, n && n(i)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null))
      }
    }, {
      key: "getBBoxSnapshot",
      value: function() {
        return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? sr({}, this.lastBoundingBox) : {
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
        return sr(sr({}, c), p)
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
          c = sr(sr({
            position: "absolute",
            width: a || "auto",
            height: u || "auto"
          }, this.getDefaultPosition(s)), s);
        return Qi.createElement("div", {
          className: "recharts-legend-wrapper",
          style: c,
          ref: function(d) {
            n.wrapperNode = d
          }
        }, SD(o, sr(sr({}, this.props), {}, {
          payload: fu(f, l, OD)
        })))
      }
    }], [{
      key: "getWithHeight",
      value: function(n, i) {
        var o = sr(sr({}, this.defaultProps), n.props),
          a = o.layout;
        return a === "vertical" && X(n.props.height) ? {
          height: n.props.height
        } : a === "horizontal" ? {
          width: n.props.width || i
        } : null
      }
    }])
  }(wD);
du(Te, "displayName", "Legend");
du(Te, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
import io, {
  PureComponent as sR
} from "./react-shim-eraudit.js";
var lx = Q(hu()),
  cx = Q(xe());
import lr from "./react-shim-eraudit.js";

function eo(t) {
  "@babel/helpers - typeof";
  return eo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, eo(t)
}

function Qc() {
  return Qc = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Qc.apply(this, arguments)
}

function CN(t, e) {
  return NN(t) || DN(t, e) || kN(t, e) || IN()
}

function IN() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function kN(t, e) {
  if (t) {
    if (typeof t == "string") return ux(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ux(t, e)
  }
}

function ux(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function DN(t, e) {
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

function NN(t) {
  if (Array.isArray(t)) return t
}

function sx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Jc(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? sx(Object(r), !0).forEach(function(n) {
      RN(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : sx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function RN(t, e, r) {
  return e = LN(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function LN(t) {
  var e = BN(t, "string");
  return eo(e) == "symbol" ? e : e + ""
}

function BN(t, e) {
  if (eo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (eo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function qN(t) {
  return Array.isArray(t) && Tt(t[0]) && Tt(t[1]) ? t.join(" ~ ") : t
}
var fx = function(e) {
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
        var L = {
            padding: 0,
            margin: 0
          },
          H = (p ? (0, lx.default)(f, p) : f).map(function(F, z) {
            if (F.type === "none") return null;
            var b = Jc({
                display: "block",
                paddingTop: 4,
                paddingBottom: 4,
                color: F.color || "#000"
              }, u),
              O = F.formatter || c || qN,
              E = F.value,
              P = F.name,
              j = E,
              T = P;
            if (O && j != null && T != null) {
              var R = O(E, P, F, z, f);
              if (Array.isArray(R)) {
                var B = CN(R, 2);
                j = B[0], T = B[1]
              } else j = R
            }
            return lr.createElement("li", {
              className: "recharts-tooltip-item",
              key: "tooltip-item-".concat(z),
              style: b
            }, Tt(T) ? lr.createElement("span", {
              className: "recharts-tooltip-item-name"
            }, T) : null, Tt(T) ? lr.createElement("span", {
              className: "recharts-tooltip-item-separator"
            }, n) : null, lr.createElement("span", {
              className: "recharts-tooltip-item-value"
            }, j), lr.createElement("span", {
              className: "recharts-tooltip-item-unit"
            }, F.unit || ""))
          });
        return lr.createElement("ul", {
          className: "recharts-tooltip-item-list",
          style: L
        }, H)
      }
      return null
    },
    _ = Jc({
      margin: 0,
      padding: 10,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      whiteSpace: "nowrap"
    }, o),
    h = Jc({
      margin: 0
    }, l),
    g = !(0, cx.default)(m),
    A = g ? m : "",
    C = ot("recharts-default-tooltip", d),
    D = ot("recharts-tooltip-label", y);
  g && v && f !== void 0 && f !== null && (A = v(m, f));
  var q = w ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return lr.createElement("div", Qc({
    className: C,
    style: _
  }, q), lr.createElement("p", {
    className: D,
    style: h
  }, lr.isValidElement(A) ? A : "".concat(A)), S())
};
import JN, {
  PureComponent as QN
} from "./react-shim-eraudit.js";

function no(t) {
  "@babel/helpers - typeof";
  return no = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, no(t)
}

function yu(t, e, r) {
  return e = WN(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function WN(t) {
  var e = zN(t, "string");
  return no(e) == "symbol" ? e : e + ""
}

function zN(t, e) {
  if (no(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (no(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var ro = "recharts-tooltip-wrapper",
  FN = {
    visibility: "hidden"
  };

function $N(t) {
  var e = t.coordinate,
    r = t.translateX,
    n = t.translateY;
  return ot(ro, yu(yu(yu(yu({}, "".concat(ro, "-right"), X(r) && e && X(e.x) && r >= e.x), "".concat(ro, "-left"), X(r) && e && X(e.x) && r < e.x), "".concat(ro, "-bottom"), X(n) && e && X(e.y) && n >= e.y), "".concat(ro, "-top"), X(n) && e && X(e.y) && n < e.y))
}

function px(t) {
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

function UN(t) {
  var e = t.translateX,
    r = t.translateY,
    n = t.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(e, "px, ").concat(r, "px, 0)") : "translate(".concat(e, "px, ").concat(r, "px)")
  }
}

function dx(t) {
  var e = t.allowEscapeViewBox,
    r = t.coordinate,
    n = t.offsetTopLeft,
    i = t.position,
    o = t.reverseDirection,
    a = t.tooltipBox,
    u = t.useTranslate3d,
    s = t.viewBox,
    l, f, c;
  return a.height > 0 && a.width > 0 && r ? (f = px({
    allowEscapeViewBox: e,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), c = px({
    allowEscapeViewBox: e,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), l = UN({
    translateX: f,
    translateY: c,
    useTranslate3d: u
  })) : l = FN, {
    cssProperties: l,
    cssClasses: $N({
      translateX: f,
      translateY: c,
      coordinate: r
    })
  }
}

function Rn(t) {
  "@babel/helpers - typeof";
  return Rn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Rn(t)
}

function mx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function hx(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? mx(Object(r), !0).forEach(function(n) {
      ef(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : mx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function HN(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function yx(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, bx(n.key), n)
  }
}

function GN(t, e, r) {
  return e && yx(t.prototype, e), r && yx(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function KN(t, e, r) {
  return e = vu(e), VN(t, gx() ? Reflect.construct(e, r || [], vu(t).constructor) : e.apply(t, r))
}

function VN(t, e) {
  if (e && (Rn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return XN(t)
}

function XN(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function gx() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (gx = function() {
    return !!t
  })()
}

function vu(t) {
  return vu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, vu(t)
}

function YN(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && tf(t, e)
}

function tf(t, e) {
  return tf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, tf(t, e)
}

function ef(t, e, r) {
  return e = bx(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function bx(t) {
  var e = ZN(t, "string");
  return Rn(e) == "symbol" ? e : e + ""
}

function ZN(t, e) {
  if (Rn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Rn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var vx = 1,
  xx = function(t) {
    function e() {
      var r;
      HN(this, e);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = KN(this, e, [].concat(i)), ef(r, "state", {
        dismissed: !1,
        dismissedAtCoordinate: {
          x: 0,
          y: 0
        },
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      }), ef(r, "handleKeyDown", function(a) {
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
    return YN(e, t), GN(e, [{
      key: "updateBBox",
      value: function() {
        if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
          var n = this.wrapperNode.getBoundingClientRect();
          (Math.abs(n.width - this.state.lastBoundingBox.width) > vx || Math.abs(n.height - this.state.lastBoundingBox.height) > vx) && this.setState({
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
          S = dx({
            allowEscapeViewBox: a,
            coordinate: f,
            offsetTopLeft: d,
            position: y,
            reverseDirection: m,
            tooltipBox: this.state.lastBoundingBox,
            useTranslate3d: v,
            viewBox: x
          }),
          _ = S.cssClasses,
          h = S.cssProperties,
          g = hx(hx({
            transition: p && o ? "transform ".concat(u, "ms ").concat(s) : void 0
          }, h), {}, {
            pointerEvents: "none",
            visibility: !this.state.dismissed && o && c ? "visible" : "hidden",
            position: "absolute",
            top: 0,
            left: 0
          }, w);
        return JN.createElement("div", {
          tabIndex: -1,
          className: _,
          style: g,
          ref: function(C) {
            n.wrapperNode = C
          }
        }, l)
      }
    }])
  }(QN);
var tR = function() {
    return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
  },
  re = {
    isSsr: tR(),
    get: function(e) {
      return re[e]
    },
    set: function(e, r) {
      if (typeof e == "string") re[e] = r;
      else {
        var n = Object.keys(e);
        n && n.length && n.forEach(function(i) {
          re[i] = e[i]
        })
      }
    }
  };

function Ln(t) {
  "@babel/helpers - typeof";
  return Ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ln(t)
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
      nf(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : wx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function eR(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Sx(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, _x(n.key), n)
  }
}

function rR(t, e, r) {
  return e && Sx(t.prototype, e), r && Sx(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function nR(t, e, r) {
  return e = gu(e), iR(t, Ax() ? Reflect.construct(e, r || [], gu(t).constructor) : e.apply(t, r))
}

function iR(t, e) {
  if (e && (Ln(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return oR(t)
}

function oR(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Ax() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Ax = function() {
    return !!t
  })()
}

function gu(t) {
  return gu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, gu(t)
}

function aR(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && rf(t, e)
}

function rf(t, e) {
  return rf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, rf(t, e)
}

function nf(t, e, r) {
  return e = _x(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function _x(t) {
  var e = uR(t, "string");
  return Ln(e) == "symbol" ? e : e + ""
}

function uR(t, e) {
  if (Ln(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ln(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function lR(t) {
  return t.dataKey
}

function cR(t, e) {
  return io.isValidElement(t) ? io.cloneElement(t, e) : typeof t == "function" ? io.createElement(t, e) : io.createElement(fx, e)
}
var ae = function(t) {
  function e() {
    return eR(this, e), nR(this, e, arguments)
  }
  return aR(e, t), rR(e, [{
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
        _ = i.wrapperStyle,
        h = y ?? [];
      c && h.length && (h = fu(y.filter(function(A) {
        return A.value != null && (A.hide !== !0 || n.props.includeHidden)
      }), m, lR));
      var g = h.length > 0;
      return io.createElement(xx, {
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
        wrapperStyle: _
      }, cR(l, Ox(Ox({}, this.props), {}, {
        payload: h
      })))
    }
  }])
}(sR);
nf(ae, "displayName", "Tooltip");
nf(ae, "defaultProps", {
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
  isAnimationActive: !re.isSsr,
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
var Fx = Q(uf());
import sf, {
  forwardRef as FR,
  cloneElement as $R,
  useState as UR,
  useImperativeHandle as HR,
  useRef as zx,
  useEffect as GR,
  useMemo as KR,
  useCallback as VR
} from "./react-shim-eraudit.js";

function oo(t) {
  "@babel/helpers - typeof";
  return oo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, oo(t)
}

function qx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function bu(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? qx(Object(r), !0).forEach(function(n) {
      DR(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : qx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function DR(t, e, r) {
  return e = NR(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function NR(t) {
  var e = RR(t, "string");
  return oo(e) == "symbol" ? e : e + ""
}

function RR(t, e) {
  if (oo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (oo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function LR(t, e) {
  return zR(t) || WR(t, e) || qR(t, e) || BR()
}

function BR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function qR(t, e) {
  if (t) {
    if (typeof t == "string") return Wx(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Wx(t, e)
  }
}

function Wx(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function WR(t, e) {
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

function zR(t) {
  if (Array.isArray(t)) return t
}
var xu = FR(function(t, e) {
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
    _ = S === void 0 ? {} : S,
    h = zx(null),
    g = zx();
  g.current = w, HR(e, function() {
    return Object.defineProperty(h.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), h.current
      },
      configurable: !0
    })
  });
  var A = UR({
      containerWidth: i.width,
      containerHeight: i.height
    }),
    C = LR(A, 2),
    D = C[0],
    q = C[1],
    W = VR(function(H, F) {
      q(function(z) {
        var b = Math.round(H),
          O = Math.round(F);
        return z.containerWidth === b && z.containerHeight === O ? z : {
          containerWidth: b,
          containerHeight: O
        }
      })
    }, []);
  GR(function() {
    var H = function(P) {
      var j, T = P[0].contentRect,
        R = T.width,
        B = T.height;
      W(R, B), (j = g.current) === null || j === void 0 || j.call(g, R, B)
    };
    m > 0 && (H = (0, Fx.default)(H, m, {
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
  var L = KR(function() {
    var H = D.containerWidth,
      F = D.containerHeight;
    if (H < 0 || F < 0) return null;
    ee(or(a) || or(s), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, a, s), ee(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var z = or(a) ? H : a,
      b = or(s) ? F : s;
    r && r > 0 && (z ? b = z / r : b && (z = b * r), p && b > p && (b = p)), ee(z > 0 || b > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, z, b, a, s, f, c, r);
    var O = !Array.isArray(d) && Oe(d.type).endsWith("Chart");
    return sf.Children.map(d, function(E) {
      return sf.isValidElement(E) ? $R(E, bu({
        width: z,
        height: b
      }, O ? {
        style: bu({
          height: "100%",
          width: "100%",
          maxHeight: b,
          maxWidth: z
        }, E.props.style)
      } : {})) : E
    })
  }, [r, d, s, p, c, f, D, a]);
  return sf.createElement("div", {
    id: v ? "".concat(v) : void 0,
    className: ot("recharts-responsive-container", x),
    style: bu(bu({}, _), {}, {
      width: a,
      height: s,
      minWidth: f,
      minHeight: c,
      maxHeight: p
    }),
    ref: h
  }, L)
});
var lf = function(e) {
  return null
};
lf.displayName = "Cell";
var pf = Q(xe());
import r0, {
  useMemo as SL
} from "./react-shim-eraudit.js";

function ao(t) {
  "@babel/helpers - typeof";
  return ao = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ao(t)
}

function $x(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function cf(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? $x(Object(r), !0).forEach(function(n) {
      XR(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : $x(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function XR(t, e, r) {
  return e = YR(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function YR(t) {
  var e = ZR(t, "string");
  return ao(e) == "symbol" ? e : e + ""
}

function ZR(t, e) {
  if (ao(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ao(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Bn = {
    widthCache: {},
    cacheCount: 0
  },
  JR = 2e3,
  QR = {
    position: "absolute",
    top: "-20000px",
    left: 0,
    padding: 0,
    margin: 0,
    border: "none",
    whiteSpace: "pre"
  };
var Ux = "recharts_measurement_span";

function tL(t) {
  var e = cf({}, t);
  return Object.keys(e).forEach(function(r) {
    e[r] || delete e[r]
  }), e
}
var Fr = function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (e == null || re.isSsr) return {
      width: 0,
      height: 0
    };
    var n = tL(r),
      i = JSON.stringify({
        text: e,
        copyStyle: n
      });
    if (Bn.widthCache[i]) return Bn.widthCache[i];
    try {
      var o = document.getElementById(Ux);
      o || (o = document.createElement("span"), o.setAttribute("id", Ux), o.setAttribute("aria-hidden", "true"), document.body.appendChild(o));
      var a = cf(cf({}, QR), n);
      Object.assign(o.style, a), o.textContent = "".concat(e);
      var u = o.getBoundingClientRect(),
        s = {
          width: u.width,
          height: u.height
        };
      return Bn.widthCache[i] = s, ++Bn.cacheCount > JR && (Bn.cacheCount = 0, Bn.widthCache = {}), s
    } catch {
      return {
        width: 0,
        height: 0
      }
    }
  },
  Hx = function(e) {
    return {
      top: e.top + window.scrollY - document.documentElement.clientTop,
      left: e.left + window.scrollX - document.documentElement.clientLeft
    }
  };

function uo(t) {
  "@babel/helpers - typeof";
  return uo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, uo(t)
}

function Ou(t, e) {
  return iL(t) || nL(t, e) || rL(t, e) || eL()
}

function eL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function rL(t, e) {
  if (t) {
    if (typeof t == "string") return Gx(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Gx(t, e)
  }
}

function Gx(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function nL(t, e) {
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

function iL(t) {
  if (Array.isArray(t)) return t
}

function oL(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Kx(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, uL(n.key), n)
  }
}

function aL(t, e, r) {
  return e && Kx(t.prototype, e), r && Kx(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function uL(t) {
  var e = sL(t, "string");
  return uo(e) == "symbol" ? e : e + ""
}

function sL(t, e) {
  if (uo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (uo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Vx = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  Xx = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  lL = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  cL = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  Zx = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1
  },
  fL = Object.keys(Zx),
  qn = "NaN";

function pL(t, e) {
  return t * Zx[e]
}
var wu = function() {
  function t(e, r) {
    oL(this, t), this.num = e, this.unit = r, this.num = e, this.unit = r, Number.isNaN(e) && (this.unit = ""), r !== "" && !lL.test(r) && (this.num = NaN, this.unit = ""), fL.includes(r) && (this.num = pL(e, r), this.unit = "px")
  }
  return aL(t, [{
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
      var n, i = (n = cL.exec(r)) !== null && n !== void 0 ? n : [],
        o = Ou(i, 3),
        a = o[1],
        u = o[2];
      return new t(parseFloat(a), u ?? "")
    }
  }])
}();

function Jx(t) {
  if (t.includes(qn)) return qn;
  for (var e = t; e.includes("*") || e.includes("/");) {
    var r, n = (r = Vx.exec(e)) !== null && r !== void 0 ? r : [],
      i = Ou(n, 4),
      o = i[1],
      a = i[2],
      u = i[3],
      s = wu.parse(o ?? ""),
      l = wu.parse(u ?? ""),
      f = a === "*" ? s.multiply(l) : s.divide(l);
    if (f.isNaN()) return qn;
    e = e.replace(Vx, f.toString())
  }
  for (; e.includes("+") || /.-\d+(?:\.\d+)?/.test(e);) {
    var c, p = (c = Xx.exec(e)) !== null && c !== void 0 ? c : [],
      d = Ou(p, 4),
      y = d[1],
      m = d[2],
      v = d[3],
      x = wu.parse(y ?? ""),
      w = wu.parse(v ?? ""),
      S = m === "+" ? x.add(w) : x.subtract(w);
    if (S.isNaN()) return qn;
    e = e.replace(Xx, S.toString())
  }
  return e
}
var Yx = /\(([^()]*)\)/;

function dL(t) {
  for (var e = t; e.includes("(");) {
    var r = Yx.exec(e),
      n = Ou(r, 2),
      i = n[1];
    e = e.replace(Yx, Jx(i))
  }
  return e
}

function mL(t) {
  var e = t.replace(/\s+/g, "");
  return e = dL(e), e = Jx(e), e
}

function hL(t) {
  try {
    return mL(t)
  } catch {
    return qn
  }
}

function Su(t) {
  var e = hL(t.slice(5, -1));
  return e === qn ? "" : e
}
var yL = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
  vL = ["dx", "dy", "angle", "className", "breakAll"];

function ff() {
  return ff = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, ff.apply(this, arguments)
}

function Qx(t, e) {
  if (t == null) return {};
  var r = gL(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function gL(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function t0(t, e) {
  return OL(t) || wL(t, e) || xL(t, e) || bL()
}

function bL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function xL(t, e) {
  if (t) {
    if (typeof t == "string") return e0(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return e0(t, e)
  }
}

function e0(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function wL(t, e) {
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

function OL(t) {
  if (Array.isArray(t)) return t
}
var o0 = /[ \f\n\r\t\v\u2028\u2029]+/,
  a0 = function(e) {
    var r = e.children,
      n = e.breakAll,
      i = e.style;
    try {
      var o = [];
      (0, pf.default)(r) || (n ? o = r.toString().split("") : o = r.toString().split(o0));
      var a = o.map(function(s) {
          return {
            word: s,
            width: Fr(s, i).width
          }
        }),
        u = n ? 0 : Fr("\xA0", i).width;
      return {
        wordsWithComputedWidth: a,
        spaceWidth: u
      }
    } catch {
      return null
    }
  },
  AL = function(e, r, n, i, o) {
    var a = e.maxLines,
      u = e.children,
      s = e.style,
      l = e.breakAll,
      f = X(a),
      c = u,
      p = function() {
        var z = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return z.reduce(function(b, O) {
          var E = O.word,
            P = O.width,
            j = b[b.length - 1];
          if (j && (i == null || o || j.width + P + n < Number(i))) j.words.push(E), j.width += P + n;
          else {
            var T = {
              words: [E],
              width: P
            };
            b.push(T)
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
          O = a0({
            breakAll: l,
            style: s,
            children: b + m
          }).wordsWithComputedWidth,
          E = p(O),
          P = E.length > a || y(E).width > Number(i);
        return [P, E]
      }, x = 0, w = c.length - 1, S = 0, _; x <= w && S <= c.length - 1;) {
      var h = Math.floor((x + w) / 2),
        g = h - 1,
        A = v(g),
        C = t0(A, 2),
        D = C[0],
        q = C[1],
        W = v(h),
        L = t0(W, 1),
        H = L[0];
      if (!D && !H && (x = h + 1), D && H && (w = h - 1), !D && H) {
        _ = q;
        break
      }
      S++
    }
    return _ || d
  },
  n0 = function(e) {
    var r = (0, pf.default)(e) ? [] : e.toString().split(o0);
    return [{
      words: r
    }]
  },
  _L = function(e) {
    var r = e.width,
      n = e.scaleToFit,
      i = e.children,
      o = e.style,
      a = e.breakAll,
      u = e.maxLines;
    if ((r || n) && !re.isSsr) {
      var s, l, f = a0({
        breakAll: a,
        children: i,
        style: o
      });
      if (f) {
        var c = f.wordsWithComputedWidth,
          p = f.spaceWidth;
        s = c, l = p
      } else return n0(i);
      return AL({
        breakAll: a,
        children: i,
        maxLines: u,
        style: o
      }, s, l, r, n)
    }
    return n0(i)
  },
  i0 = "#808080",
  $r = function(e) {
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
      x = v === void 0 ? i0 : v,
      w = Qx(e, yL),
      S = SL(function() {
        return _L({
          breakAll: w.breakAll,
          children: w.children,
          maxLines: w.maxLines,
          scaleToFit: c,
          style: w.style,
          width: w.width
        })
      }, [w.breakAll, w.children, w.maxLines, c, w.style, w.width]),
      _ = w.dx,
      h = w.dy,
      g = w.angle,
      A = w.className,
      C = w.breakAll,
      D = Qx(w, vL);
    if (!Tt(n) || !Tt(o)) return null;
    var q = n + (X(_) ? _ : 0),
      W = o + (X(h) ? h : 0),
      L;
    switch (m) {
      case "start":
        L = Su("calc(".concat(l, ")"));
        break;
      case "middle":
        L = Su("calc(".concat((S.length - 1) / 2, " * -").concat(u, " + (").concat(l, " / 2))"));
        break;
      default:
        L = Su("calc(".concat(S.length - 1, " * -").concat(u, ")"));
        break
    }
    var H = [];
    if (c) {
      var F = S[0].width,
        z = w.width;
      H.push("scale(".concat((X(z) ? z / F : 1) / F, ")"))
    }
    return g && H.push("rotate(".concat(g, ", ").concat(q, ", ").concat(W, ")")), H.length && (D.transform = H.join(" ")), r0.createElement("text", ff({}, at(D, !0), {
      x: q,
      y: W,
      className: ot("recharts-text", A),
      textAnchor: d,
      fill: x.includes("url") ? i0 : x
    }), S.map(function(b, O) {
      var E = b.words.join(C ? "" : " ");
      return r0.createElement("tspan", {
        x: q,
        dy: O === 0 ? L : u,
        key: "".concat(E, "-").concat(O)
      }, E)
    }))
  };
var $o = Q(xe()),
  Uo = Q(It()),
  xp = Q(be());
import tr, {
  cloneElement as bp,
  isValidElement as hs,
  createElement as wz
} from "./react-shim-eraudit.js";
var nz = Q(xe()),
  iz = Q(It());
import {
  isValidElement as UQ
} from "./react-shim-eraudit.js";
var os = {};
G_(os, {
  scaleBand: () => gr,
  scaleDiverging: () => ns,
  scaleDivergingLog: () => Hf,
  scaleDivergingPow: () => is,
  scaleDivergingSqrt: () => Tw,
  scaleDivergingSymlog: () => Gf,
  scaleIdentity: () => zu,
  scaleImplicit: () => Mu,
  scaleLinear: () => Jr,
  scaleLog: () => Fu,
  scaleOrdinal: () => Fn,
  scalePoint: () => br,
  scalePow: () => Oo,
  scaleQuantile: () => Hu,
  scaleQuantize: () => Gu,
  scaleRadial: () => Uu,
  scaleSequential: () => Qu,
  scaleSequentialLog: () => $f,
  scaleSequentialPow: () => ts,
  scaleSequentialQuantile: () => es,
  scaleSequentialSqrt: () => Pw,
  scaleSequentialSymlog: () => Uf,
  scaleSqrt: () => V0,
  scaleSymlog: () => $u,
  scaleThreshold: () => Ku,
  scaleTime: () => zf,
  scaleUtc: () => Ff,
  tickFormat: () => vo
});

function ne(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}

function df(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}

function Ur(t) {
  let e, r, n;
  t.length !== 2 ? (e = ne, r = (u, s) => ne(t(u), s), n = (u, s) => t(u) - s) : (e = t === ne || t === df ? t : PL, r = t, n = t);

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

function PL() {
  return 0
}

function so(t) {
  return t === null ? NaN : +t
}

function* u0(t, e) {
  if (e === void 0)
    for (let r of t) r != null && (r = +r) >= r && (yield r);
  else {
    let r = -1;
    for (let n of t)(n = e(n, ++r, t)) != null && (n = +n) >= n && (yield n)
  }
}
var s0 = Ur(ne),
  l0 = s0.right,
  TL = s0.left,
  EL = Ur(so).center,
  De = l0;
var Wn = class extends Map {
  constructor(e, r = CL) {
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
    return super.get(c0(this, e))
  }
  has(e) {
    return super.has(c0(this, e))
  }
  set(e, r) {
    return super.set(jL(this, e), r)
  }
  delete(e) {
    return super.delete(ML(this, e))
  }
};

function c0({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) ? t.get(n) : r
}

function jL({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) ? t.get(n) : (t.set(n, r), r)
}

function ML({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) && (r = t.get(n), t.delete(n)), r
}

function CL(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t
}

function f0(t = ne) {
  if (t === ne) return mf;
  if (typeof t != "function") throw new TypeError("compare is not a function");
  return (e, r) => {
    let n = t(e, r);
    return n || n === 0 ? n : (t(r, r) === 0) - (t(e, e) === 0)
  }
}

function mf(t, e) {
  return (t == null || !(t >= t)) - (e == null || !(e >= e)) || (t < e ? -1 : t > e ? 1 : 0)
}
var IL = Math.sqrt(50),
  kL = Math.sqrt(10),
  DL = Math.sqrt(2);

function Au(t, e, r) {
  let n = (e - t) / Math.max(0, r),
    i = Math.floor(Math.log10(n)),
    o = n / Math.pow(10, i),
    a = o >= IL ? 10 : o >= kL ? 5 : o >= DL ? 2 : 1,
    u, s, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, u = Math.round(t * l), s = Math.round(e * l), u / l < t && ++u, s / l > e && --s, l = -l) : (l = Math.pow(10, i) * a, u = Math.round(t / l), s = Math.round(e / l), u * l < t && ++u, s * l > e && --s), s < u && .5 <= r && r < 2 ? Au(t, e, r * 2) : [u, s, l]
}

function Hr(t, e, r) {
  if (e = +e, t = +t, r = +r, !(r > 0)) return [];
  if (t === e) return [t];
  let n = e < t,
    [i, o, a] = n ? Au(e, t, r) : Au(t, e, r);
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

function lo(t, e, r) {
  return e = +e, t = +t, r = +r, Au(t, e, r)[2]
}

function zn(t, e, r) {
  e = +e, t = +t, r = +r;
  let n = e < t,
    i = n ? lo(e, t, r) : lo(t, e, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i)
}

function _u(t, e) {
  let r;
  if (e === void 0)
    for (let n of t) n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of t)(i = e(i, ++n, t)) != null && (r < i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Pu(t, e) {
  let r;
  if (e === void 0)
    for (let n of t) n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of t)(i = e(i, ++n, t)) != null && (r > i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Tu(t, e, r = 0, n = 1 / 0, i) {
  if (e = Math.floor(e), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(t.length - 1, n)), !(r <= e && e <= n)) return t;
  for (i = i === void 0 ? mf : f0(i); n > r;) {
    if (n - r > 600) {
      let s = n - r + 1,
        l = e - r + 1,
        f = Math.log(s),
        c = .5 * Math.exp(2 * f / 3),
        p = .5 * Math.sqrt(f * c * (s - c) / s) * (l - s / 2 < 0 ? -1 : 1),
        d = Math.max(r, Math.floor(e - l * c / s + p)),
        y = Math.min(n, Math.floor(e + (s - l) * c / s + p));
      Tu(t, e, d, y, i)
    }
    let o = t[e],
      a = r,
      u = n;
    for (co(t, r, e), i(t[n], o) > 0 && co(t, r, n); a < u;) {
      for (co(t, a, u), ++a, --u; i(t[a], o) < 0;) ++a;
      for (; i(t[u], o) > 0;) --u
    }
    i(t[r], o) === 0 ? co(t, r, u) : (++u, co(t, u, n)), u <= e && (r = u + 1), e <= u && (n = u - 1)
  }
  return t
}

function co(t, e, r) {
  let n = t[e];
  t[e] = t[r], t[r] = n
}

function Eu(t, e, r) {
  if (t = Float64Array.from(u0(t, r)), !(!(n = t.length) || isNaN(e = +e))) {
    if (e <= 0 || n < 2) return Pu(t);
    if (e >= 1) return _u(t);
    var n, i = (n - 1) * e,
      o = Math.floor(i),
      a = _u(Tu(t, o).subarray(0, o + 1)),
      u = Pu(t.subarray(o + 1));
    return a + (u - a) * (i - o)
  }
}

function hf(t, e, r = so) {
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

function ju(t, e, r) {
  t = +t, e = +e, r = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((e - t) / r)) | 0, o = new Array(i); ++n < i;) o[n] = t + n * r;
  return o
}

function jt(t, e) {
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

function Ee(t, e) {
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
var Mu = Symbol("implicit");

function Fn() {
  var t = new Wn,
    e = [],
    r = [],
    n = Mu;

  function i(o) {
    let a = t.get(o);
    if (a === void 0) {
      if (n !== Mu) return n;
      t.set(o, a = e.push(o) - 1)
    }
    return r[a % r.length]
  }
  return i.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [], t = new Wn;
    for (let a of o) t.has(a) || t.set(a, e.push(a) - 1);
    return i
  }, i.range = function(o) {
    return arguments.length ? (r = Array.from(o), i) : r.slice()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return Fn(e, r).unknown(n)
  }, jt.apply(i, arguments), i
}

function gr() {
  var t = Fn().unknown(void 0),
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
    var v = ju(p).map(function(x) {
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
    return gr(e(), [n, i]).round(u).paddingInner(s).paddingOuter(l).align(f)
  }, jt.apply(c(), arguments)
}

function p0(t) {
  var e = t.copy;
  return t.padding = t.paddingOuter, delete t.paddingInner, delete t.paddingOuter, t.copy = function() {
    return p0(e())
  }, t
}

function br() {
  return p0(gr.apply(null, arguments).paddingInner(1))
}

function Cu(t, e, r) {
  t.prototype = e.prototype = r, r.constructor = t
}

function yf(t, e) {
  var r = Object.create(t.prototype);
  for (var n in e) r[n] = e[n];
  return r
}

function mo() {}
var fo = .7,
  Du = 1 / fo,
  $n = "\\s*([+-]?\\d+)\\s*",
  po = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  Xe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  NL = /^#([0-9a-f]{3,8})$/,
  RL = new RegExp(`^rgb\\(${$n},${$n},${$n}\\)$`),
  LL = new RegExp(`^rgb\\(${Xe},${Xe},${Xe}\\)$`),
  BL = new RegExp(`^rgba\\(${$n},${$n},${$n},${po}\\)$`),
  qL = new RegExp(`^rgba\\(${Xe},${Xe},${Xe},${po}\\)$`),
  WL = new RegExp(`^hsl\\(${po},${Xe},${Xe}\\)$`),
  zL = new RegExp(`^hsla\\(${po},${Xe},${Xe},${po}\\)$`),
  d0 = {
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
Cu(mo, xr, {
  copy(t) {
    return Object.assign(new this.constructor, this, t)
  },
  displayable() {
    return this.rgb().displayable()
  },
  hex: m0,
  formatHex: m0,
  formatHex8: FL,
  formatHsl: $L,
  formatRgb: h0,
  toString: h0
});

function m0() {
  return this.rgb().formatHex()
}

function FL() {
  return this.rgb().formatHex8()
}

function $L() {
  return w0(this).formatHsl()
}

function h0() {
  return this.rgb().formatRgb()
}

function xr(t) {
  var e, r;
  return t = (t + "").trim().toLowerCase(), (e = NL.exec(t)) ? (r = e[1].length, e = parseInt(e[1], 16), r === 6 ? y0(e) : r === 3 ? new ue(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : r === 8 ? Iu(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : r === 4 ? Iu(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = RL.exec(t)) ? new ue(e[1], e[2], e[3], 1) : (e = LL.exec(t)) ? new ue(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = BL.exec(t)) ? Iu(e[1], e[2], e[3], e[4]) : (e = qL.exec(t)) ? Iu(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = WL.exec(t)) ? b0(e[1], e[2] / 100, e[3] / 100, 1) : (e = zL.exec(t)) ? b0(e[1], e[2] / 100, e[3] / 100, e[4]) : d0.hasOwnProperty(t) ? y0(d0[t]) : t === "transparent" ? new ue(NaN, NaN, NaN, 0) : null
}

function y0(t) {
  return new ue(t >> 16 & 255, t >> 8 & 255, t & 255, 1)
}

function Iu(t, e, r, n) {
  return n <= 0 && (t = e = r = NaN), new ue(t, e, r, n)
}

function UL(t) {
  return t instanceof mo || (t = xr(t)), t ? (t = t.rgb(), new ue(t.r, t.g, t.b, t.opacity)) : new ue
}

function Un(t, e, r, n) {
  return arguments.length === 1 ? UL(t) : new ue(t, e, r, n ?? 1)
}

function ue(t, e, r, n) {
  this.r = +t, this.g = +e, this.b = +r, this.opacity = +n
}
Cu(ue, Un, yf(mo, {
  brighter(t) {
    return t = t == null ? Du : Math.pow(Du, t), new ue(this.r * t, this.g * t, this.b * t, this.opacity)
  },
  darker(t) {
    return t = t == null ? fo : Math.pow(fo, t), new ue(this.r * t, this.g * t, this.b * t, this.opacity)
  },
  rgb() {
    return this
  },
  clamp() {
    return new ue(Kr(this.r), Kr(this.g), Kr(this.b), Nu(this.opacity))
  },
  displayable() {
    return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
  },
  hex: v0,
  formatHex: v0,
  formatHex8: HL,
  formatRgb: g0,
  toString: g0
}));

function v0() {
  return `#${Gr(this.r)}${Gr(this.g)}${Gr(this.b)}`
}

function HL() {
  return `#${Gr(this.r)}${Gr(this.g)}${Gr(this.b)}${Gr((isNaN(this.opacity)?1:this.opacity)*255)}`
}

function g0() {
  let t = Nu(this.opacity);
  return `${t===1?"rgb(":"rgba("}${Kr(this.r)}, ${Kr(this.g)}, ${Kr(this.b)}${t===1?")":`, ${t})`}`
}

function Nu(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t))
}

function Kr(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0))
}

function Gr(t) {
  return t = Kr(t), (t < 16 ? "0" : "") + t.toString(16)
}

function b0(t, e, r, n) {
  return n <= 0 ? t = e = r = NaN : r <= 0 || r >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Ne(t, e, r, n)
}

function w0(t) {
  if (t instanceof Ne) return new Ne(t.h, t.s, t.l, t.opacity);
  if (t instanceof mo || (t = xr(t)), !t) return new Ne;
  if (t instanceof Ne) return t;
  t = t.rgb();
  var e = t.r / 255,
    r = t.g / 255,
    n = t.b / 255,
    i = Math.min(e, r, n),
    o = Math.max(e, r, n),
    a = NaN,
    u = o - i,
    s = (o + i) / 2;
  return u ? (e === o ? a = (r - n) / u + (r < n) * 6 : r === o ? a = (n - e) / u + 2 : a = (e - r) / u + 4, u /= s < .5 ? o + i : 2 - o - i, a *= 60) : u = s > 0 && s < 1 ? 0 : a, new Ne(a, u, s, t.opacity)
}

function O0(t, e, r, n) {
  return arguments.length === 1 ? w0(t) : new Ne(t, e, r, n ?? 1)
}

function Ne(t, e, r, n) {
  this.h = +t, this.s = +e, this.l = +r, this.opacity = +n
}
Cu(Ne, O0, yf(mo, {
  brighter(t) {
    return t = t == null ? Du : Math.pow(Du, t), new Ne(this.h, this.s, this.l * t, this.opacity)
  },
  darker(t) {
    return t = t == null ? fo : Math.pow(fo, t), new Ne(this.h, this.s, this.l * t, this.opacity)
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360,
      e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
      r = this.l,
      n = r + (r < .5 ? r : 1 - r) * e,
      i = 2 * r - n;
    return new ue(vf(t >= 240 ? t - 240 : t + 120, i, n), vf(t, i, n), vf(t < 120 ? t + 240 : t - 120, i, n), this.opacity)
  },
  clamp() {
    return new Ne(x0(this.h), ku(this.s), ku(this.l), Nu(this.opacity))
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
  },
  formatHsl() {
    let t = Nu(this.opacity);
    return `${t===1?"hsl(":"hsla("}${x0(this.h)}, ${ku(this.s)*100}%, ${ku(this.l)*100}%${t===1?")":`, ${t})`}`
  }
}));

function x0(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t
}

function ku(t) {
  return Math.max(0, Math.min(1, t || 0))
}

function vf(t, e, r) {
  return (t < 60 ? e + (r - e) * t / 60 : t < 180 ? r : t < 240 ? e + (r - e) * (240 - t) / 60 : e) * 255
}

function gf(t, e, r, n, i) {
  var o = t * t,
    a = o * t;
  return ((1 - 3 * t + 3 * o - a) * e + (4 - 6 * o + 3 * a) * r + (1 + 3 * t + 3 * o - 3 * a) * n + a * i) / 6
}

function S0(t) {
  var e = t.length - 1;
  return function(r) {
    var n = r <= 0 ? r = 0 : r >= 1 ? (r = 1, e - 1) : Math.floor(r * e),
      i = t[n],
      o = t[n + 1],
      a = n > 0 ? t[n - 1] : 2 * i - o,
      u = n < e - 1 ? t[n + 2] : 2 * o - i;
    return gf((r - n / e) * e, a, i, o, u)
  }
}

function A0(t) {
  var e = t.length;
  return function(r) {
    var n = Math.floor(((r %= 1) < 0 ? ++r : r) * e),
      i = t[(n + e - 1) % e],
      o = t[n % e],
      a = t[(n + 1) % e],
      u = t[(n + 2) % e];
    return gf((r - n / e) * e, i, o, a, u)
  }
}
var ho = t => () => t;

function GL(t, e) {
  return function(r) {
    return t + r * e
  }
}

function KL(t, e, r) {
  return t = Math.pow(t, r), e = Math.pow(e, r) - t, r = 1 / r,
    function(n) {
      return Math.pow(t + n * e, r)
    }
}

function _0(t) {
  return (t = +t) == 1 ? Ru : function(e, r) {
    return r - e ? KL(e, r, t) : ho(isNaN(e) ? r : e)
  }
}

function Ru(t, e) {
  var r = e - t;
  return r ? GL(t, r) : ho(isNaN(t) ? e : t)
}
var bf = function t(e) {
  var r = _0(e);

  function n(i, o) {
    var a = r((i = Un(i)).r, (o = Un(o)).r),
      u = r(i.g, o.g),
      s = r(i.b, o.b),
      l = Ru(i.opacity, o.opacity);
    return function(f) {
      return i.r = a(f), i.g = u(f), i.b = s(f), i.opacity = l(f), i + ""
    }
  }
  return n.gamma = t, n
}(1);

function P0(t) {
  return function(e) {
    var r = e.length,
      n = new Array(r),
      i = new Array(r),
      o = new Array(r),
      a, u;
    for (a = 0; a < r; ++a) u = Un(e[a]), n[a] = u.r || 0, i[a] = u.g || 0, o[a] = u.b || 0;
    return n = t(n), i = t(i), o = t(o), u.opacity = 1,
      function(s) {
        return u.r = n(s), u.g = i(s), u.b = o(s), u + ""
      }
  }
}
var hX = P0(S0),
  yX = P0(A0);

function T0(t, e) {
  e || (e = []);
  var r = t ? Math.min(e.length, t.length) : 0,
    n = e.slice(),
    i;
  return function(o) {
    for (i = 0; i < r; ++i) n[i] = t[i] * (1 - o) + e[i] * o;
    return n
  }
}

function E0(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView)
}

function j0(t, e) {
  var r = e ? e.length : 0,
    n = t ? Math.min(r, t.length) : 0,
    i = new Array(n),
    o = new Array(r),
    a;
  for (a = 0; a < n; ++a) i[a] = fe(t[a], e[a]);
  for (; a < r; ++a) o[a] = e[a];
  return function(u) {
    for (a = 0; a < n; ++a) o[a] = i[a](u);
    return o
  }
}

function M0(t, e) {
  var r = new Date;
  return t = +t, e = +e,
    function(n) {
      return r.setTime(t * (1 - n) + e * n), r
    }
}

function wr(t, e) {
  return t = +t, e = +e,
    function(r) {
      return t * (1 - r) + e * r
    }
}

function C0(t, e) {
  var r = {},
    n = {},
    i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e) i in t ? r[i] = fe(t[i], e[i]) : n[i] = e[i];
  return function(o) {
    for (i in r) n[i] = r[i](o);
    return n
  }
}
var wf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  xf = new RegExp(wf.source, "g");

function VL(t) {
  return function() {
    return t
  }
}

function XL(t) {
  return function(e) {
    return t(e) + ""
  }
}

function I0(t, e) {
  var r = wf.lastIndex = xf.lastIndex = 0,
    n, i, o, a = -1,
    u = [],
    s = [];
  for (t = t + "", e = e + "";
    (n = wf.exec(t)) && (i = xf.exec(e));)(o = i.index) > r && (o = e.slice(r, o), u[a] ? u[a] += o : u[++a] = o), (n = n[0]) === (i = i[0]) ? u[a] ? u[a] += i : u[++a] = i : (u[++a] = null, s.push({
    i: a,
    x: wr(n, i)
  })), r = xf.lastIndex;
  return r < e.length && (o = e.slice(r), u[a] ? u[a] += o : u[++a] = o), u.length < 2 ? s[0] ? XL(s[0].x) : VL(e) : (e = s.length, function(l) {
    for (var f = 0, c; f < e; ++f) u[(c = s[f]).i] = c.x(l);
    return u.join("")
  })
}

function fe(t, e) {
  var r = typeof e,
    n;
  return e == null || r === "boolean" ? ho(e) : (r === "number" ? wr : r === "string" ? (n = xr(e)) ? (e = n, bf) : I0 : e instanceof xr ? bf : e instanceof Date ? M0 : E0(e) ? T0 : Array.isArray(e) ? j0 : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? C0 : wr)(t, e)
}

function Vr(t, e) {
  return t = +t, e = +e,
    function(r) {
      return Math.round(t * (1 - r) + e * r)
    }
}

function Lu(t, e) {
  e === void 0 && (e = t, t = fe);
  for (var r = 0, n = e.length - 1, i = e[0], o = new Array(n < 0 ? 0 : n); r < n;) o[r] = t(i, i = e[++r]);
  return function(a) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(a *= n)));
    return o[u](a - u)
  }
}

function Of(t) {
  return function() {
    return t
  }
}

function Or(t) {
  return +t
}
var k0 = [0, 1];

function Bt(t) {
  return t
}

function Sf(t, e) {
  return (e -= t = +t) ? function(r) {
    return (r - t) / e
  } : Of(isNaN(e) ? NaN : .5)
}

function YL(t, e) {
  var r;
  return t > e && (r = t, t = e, e = r),
    function(n) {
      return Math.max(t, Math.min(e, n))
    }
}

function ZL(t, e, r) {
  var n = t[0],
    i = t[1],
    o = e[0],
    a = e[1];
  return i < n ? (n = Sf(i, n), o = r(a, o)) : (n = Sf(n, i), o = r(o, a)),
    function(u) {
      return o(n(u))
    }
}

function JL(t, e, r) {
  var n = Math.min(t.length, e.length) - 1,
    i = new Array(n),
    o = new Array(n),
    a = -1;
  for (t[n] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a < n;) i[a] = Sf(t[a], t[a + 1]), o[a] = r(e[a], e[a + 1]);
  return function(u) {
    var s = De(t, u, 1, n) - 1;
    return o[s](i[s](u))
  }
}

function Ye(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())
}

function Xr() {
  var t = k0,
    e = k0,
    r = fe,
    n, i, o, a = Bt,
    u, s, l;

  function f() {
    var p = Math.min(t.length, e.length);
    return a !== Bt && (a = YL(t[0], t[p - 1])), u = p > 2 ? JL : ZL, s = l = null, c
  }

  function c(p) {
    return p == null || isNaN(p = +p) ? o : (s || (s = u(t.map(n), e, r)))(n(a(p)))
  }
  return c.invert = function(p) {
      return a(i((l || (l = u(e, t.map(n), wr)))(p)))
    }, c.domain = function(p) {
      return arguments.length ? (t = Array.from(p, Or), f()) : t.slice()
    }, c.range = function(p) {
      return arguments.length ? (e = Array.from(p), f()) : e.slice()
    }, c.rangeRound = function(p) {
      return e = Array.from(p), r = Vr, f()
    }, c.clamp = function(p) {
      return arguments.length ? (a = p ? !0 : Bt, f()) : a !== Bt
    }, c.interpolate = function(p) {
      return arguments.length ? (r = p, f()) : r
    }, c.unknown = function(p) {
      return arguments.length ? (o = p, c) : o
    },
    function(p, d) {
      return n = p, i = d, f()
    }
}

function Yr() {
  return Xr()(Bt, Bt)
}

function D0(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10)
}

function Zr(t, e) {
  if (!isFinite(t) || t === 0) return null;
  var r = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e"),
    n = t.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +t.slice(r + 1)]
}

function Ze(t) {
  return t = Zr(Math.abs(t)), t ? t[1] : NaN
}

function N0(t, e) {
  return function(r, n) {
    for (var i = r.length, o = [], a = 0, u = t[0], s = 0; i > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), o.push(r.substring(i -= u, i + u)), !((s += u + 1) > n));) u = t[a = (a + 1) % t.length];
    return o.reverse().join(e)
  }
}

function R0(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(r) {
      return t[+r]
    })
  }
}
var QL = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function Je(t) {
  if (!(e = QL.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Bu({
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
Je.prototype = Bu.prototype;

function Bu(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + ""
}
Bu.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type
};

function L0(t) {
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
var yo;

function B0(t, e) {
  var r = Zr(t, e);
  if (!r) return yo = void 0, t.toPrecision(e);
  var n = r[0],
    i = r[1],
    o = i - (yo = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    a = n.length;
  return o === a ? n : o > a ? n + new Array(o - a + 1).join("0") : o > 0 ? n.slice(0, o) + "." + n.slice(o) : "0." + new Array(1 - o).join("0") + Zr(t, Math.max(0, e + o - 1))[0]
}

function Af(t, e) {
  var r = Zr(t, e);
  if (!r) return t + "";
  var n = r[0],
    i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0")
}
var _f = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: t => Math.round(t).toString(2),
  c: t => t + "",
  d: D0,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: t => Math.round(t).toString(8),
  p: (t, e) => Af(t * 100, e),
  r: Af,
  s: B0,
  X: t => Math.round(t).toString(16).toUpperCase(),
  x: t => Math.round(t).toString(16)
};

function Pf(t) {
  return t
}
var q0 = Array.prototype.map,
  W0 = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function z0(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Pf : N0(q0.call(t.grouping, Number), t.thousands + ""),
    r = t.currency === void 0 ? "" : t.currency[0] + "",
    n = t.currency === void 0 ? "" : t.currency[1] + "",
    i = t.decimal === void 0 ? "." : t.decimal + "",
    o = t.numerals === void 0 ? Pf : R0(q0.call(t.numerals, String)),
    a = t.percent === void 0 ? "%" : t.percent + "",
    u = t.minus === void 0 ? "\u2212" : t.minus + "",
    s = t.nan === void 0 ? "NaN" : t.nan + "";

  function l(c, p) {
    c = Je(c);
    var d = c.fill,
      y = c.align,
      m = c.sign,
      v = c.symbol,
      x = c.zero,
      w = c.width,
      S = c.comma,
      _ = c.precision,
      h = c.trim,
      g = c.type;
    g === "n" ? (S = !0, g = "g") : _f[g] || (_ === void 0 && (_ = 12), h = !0, g = "g"), (x || d === "0" && y === "=") && (x = !0, d = "0", y = "=");
    var A = (p && p.prefix !== void 0 ? p.prefix : "") + (v === "$" ? r : v === "#" && /[boxX]/.test(g) ? "0" + g.toLowerCase() : ""),
      C = (v === "$" ? n : /[%p]/.test(g) ? a : "") + (p && p.suffix !== void 0 ? p.suffix : ""),
      D = _f[g],
      q = /[defgprs%]/.test(g);
    _ = _ === void 0 ? 6 : /[gprs]/.test(g) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));

    function W(L) {
      var H = A,
        F = C,
        z, b, O;
      if (g === "c") F = D(L) + F, L = "";
      else {
        L = +L;
        var E = L < 0 || 1 / L < 0;
        if (L = isNaN(L) ? s : D(Math.abs(L), _), h && (L = L0(L)), E && +L == 0 && m !== "+" && (E = !1), H = (E ? m === "(" ? m : u : m === "-" || m === "(" ? "" : m) + H, F = (g === "s" && !isNaN(L) && yo !== void 0 ? W0[8 + yo / 3] : "") + F + (E && m === "(" ? ")" : ""), q) {
          for (z = -1, b = L.length; ++z < b;)
            if (O = L.charCodeAt(z), 48 > O || O > 57) {
              F = (O === 46 ? i + L.slice(z + 1) : L.slice(z)) + F, L = L.slice(0, z);
              break
            }
        }
      }
      S && !x && (L = e(L, 1 / 0));
      var P = H.length + L.length + F.length,
        j = P < w ? new Array(w - P + 1).join(d) : "";
      switch (S && x && (L = e(j + L, j.length ? w - F.length : 1 / 0), j = ""), y) {
        case "<":
          L = H + L + F + j;
          break;
        case "=":
          L = H + j + L + F;
          break;
        case "^":
          L = j.slice(0, P = j.length >> 1) + H + L + F + j.slice(P);
          break;
        default:
          L = j + H + L + F;
          break
      }
      return o(L)
    }
    return W.toString = function() {
      return c + ""
    }, W
  }

  function f(c, p) {
    var d = Math.max(-8, Math.min(8, Math.floor(Ze(p) / 3))) * 3,
      y = Math.pow(10, -d),
      m = l((c = Je(c), c.type = "f", c), {
        suffix: W0[8 + d / 3]
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
var qu, Hn, Wu;
Tf({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function Tf(t) {
  return qu = z0(t), Hn = qu.format, Wu = qu.formatPrefix, qu
}

function Ef(t) {
  return Math.max(0, -Ze(Math.abs(t)))
}

function jf(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ze(e) / 3))) * 3 - Ze(Math.abs(t)))
}

function Mf(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Ze(e) - Ze(t)) + 1
}

function vo(t, e, r, n) {
  var i = zn(t, e, r),
    o;
  switch (n = Je(n ?? ",f"), n.type) {
    case "s": {
      var a = Math.max(Math.abs(t), Math.abs(e));
      return n.precision == null && !isNaN(o = jf(i, a)) && (n.precision = o), Wu(n, a)
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(o = Mf(i, Math.max(Math.abs(t), Math.abs(e)))) && (n.precision = o - (n.type === "e"));
      break
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(o = Ef(i)) && (n.precision = o - (n.type === "%") * 2);
      break
    }
  }
  return Hn(n)
}

function ie(t) {
  var e = t.domain;
  return t.ticks = function(r) {
    var n = e();
    return Hr(n[0], n[n.length - 1], r ?? 10)
  }, t.tickFormat = function(r, n) {
    var i = e();
    return vo(i[0], i[i.length - 1], r ?? 10, n)
  }, t.nice = function(r) {
    r == null && (r = 10);
    var n = e(),
      i = 0,
      o = n.length - 1,
      a = n[i],
      u = n[o],
      s, l, f = 10;
    for (u < a && (l = a, a = u, u = l, l = i, i = o, o = l); f-- > 0;) {
      if (l = lo(a, u, r), l === s) return n[i] = a, n[o] = u, e(n);
      if (l > 0) a = Math.floor(a / l) * l, u = Math.ceil(u / l) * l;
      else if (l < 0) a = Math.ceil(a * l) / l, u = Math.floor(u * l) / l;
      else break;
      s = l
    }
    return t
  }, t
}

function Jr() {
  var t = Yr();
  return t.copy = function() {
    return Ye(t, Jr())
  }, jt.apply(t, arguments), ie(t)
}

function zu(t) {
  var e;

  function r(n) {
    return n == null || isNaN(n = +n) ? e : n
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (t = Array.from(n, Or), r) : t.slice()
  }, r.unknown = function(n) {
    return arguments.length ? (e = n, r) : e
  }, r.copy = function() {
    return zu(t).unknown(e)
  }, t = arguments.length ? Array.from(t, Or) : [0, 1], ie(r)
}

function go(t, e) {
  t = t.slice();
  var r = 0,
    n = t.length - 1,
    i = t[r],
    o = t[n],
    a;
  return o < i && (a = r, r = n, n = a, a = i, i = o, o = a), t[r] = e.floor(i), t[n] = e.ceil(o), t
}

function F0(t) {
  return Math.log(t)
}

function $0(t) {
  return Math.exp(t)
}

function tB(t) {
  return -Math.log(-t)
}

function eB(t) {
  return -Math.exp(-t)
}

function rB(t) {
  return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t
}

function nB(t) {
  return t === 10 ? rB : t === Math.E ? Math.exp : e => Math.pow(t, e)
}

function iB(t) {
  return t === Math.E ? Math.log : t === 10 && Math.log10 || t === 2 && Math.log2 || (t = Math.log(t), e => Math.log(e) / t)
}

function U0(t) {
  return (e, r) => -t(-e, r)
}

function bo(t) {
  let e = t(F0, $0),
    r = e.domain,
    n = 10,
    i, o;

  function a() {
    return i = iB(n), o = nB(n), r()[0] < 0 ? (i = U0(i), o = U0(o), t(tB, eB)) : t(F0, $0), e
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
            } x.length * 2 < v && (x = Hr(l, f, v))
    } else x = Hr(p, d, Math.min(d - p, v)).map(o);
    return c ? x.reverse() : x
  }, e.tickFormat = (u, s) => {
    if (u == null && (u = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = Je(s)).precision == null && (s.trim = !0), s = Hn(s)), u === 1 / 0) return s;
    let l = Math.max(1, n * u / e.ticks().length);
    return f => {
      let c = f / o(Math.round(i(f)));
      return c * n < n - .5 && (c *= n), c <= l ? s(f) : ""
    }
  }, e.nice = () => r(go(r(), {
    floor: u => o(Math.floor(i(u))),
    ceil: u => o(Math.ceil(i(u)))
  })), e
}

function Fu() {
  let t = bo(Xr()).domain([1, 10]);
  return t.copy = () => Ye(t, Fu()).base(t.base()), jt.apply(t, arguments), t
}

function H0(t) {
  return function(e) {
    return Math.sign(e) * Math.log1p(Math.abs(e / t))
  }
}

function G0(t) {
  return function(e) {
    return Math.sign(e) * Math.expm1(Math.abs(e)) * t
  }
}

function xo(t) {
  var e = 1,
    r = t(H0(e), G0(e));
  return r.constant = function(n) {
    return arguments.length ? t(H0(e = +n), G0(e)) : e
  }, ie(r)
}

function $u() {
  var t = xo(Xr());
  return t.copy = function() {
    return Ye(t, $u()).constant(t.constant())
  }, jt.apply(t, arguments)
}

function K0(t) {
  return function(e) {
    return e < 0 ? -Math.pow(-e, t) : Math.pow(e, t)
  }
}

function oB(t) {
  return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t)
}

function aB(t) {
  return t < 0 ? -t * t : t * t
}

function wo(t) {
  var e = t(Bt, Bt),
    r = 1;

  function n() {
    return r === 1 ? t(Bt, Bt) : r === .5 ? t(oB, aB) : t(K0(r), K0(1 / r))
  }
  return e.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r
  }, ie(e)
}

function Oo() {
  var t = wo(Xr());
  return t.copy = function() {
    return Ye(t, Oo()).exponent(t.exponent())
  }, jt.apply(t, arguments), t
}

function V0() {
  return Oo.apply(null, arguments).exponent(.5)
}

function X0(t) {
  return Math.sign(t) * t * t
}

function uB(t) {
  return Math.sign(t) * Math.sqrt(Math.abs(t))
}

function Uu() {
  var t = Yr(),
    e = [0, 1],
    r = !1,
    n;

  function i(o) {
    var a = uB(t(o));
    return isNaN(a) ? n : r ? Math.round(a) : a
  }
  return i.invert = function(o) {
    return t.invert(X0(o))
  }, i.domain = function(o) {
    return arguments.length ? (t.domain(o), i) : t.domain()
  }, i.range = function(o) {
    return arguments.length ? (t.range((e = Array.from(o, Or)).map(X0)), i) : e.slice()
  }, i.rangeRound = function(o) {
    return i.range(o).round(!0)
  }, i.round = function(o) {
    return arguments.length ? (r = !!o, i) : r
  }, i.clamp = function(o) {
    return arguments.length ? (t.clamp(o), i) : t.clamp()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return Uu(t.domain(), e).round(r).clamp(t.clamp()).unknown(n)
  }, jt.apply(i, arguments), ie(i)
}

function Hu() {
  var t = [],
    e = [],
    r = [],
    n;

  function i() {
    var a = 0,
      u = Math.max(1, e.length);
    for (r = new Array(u - 1); ++a < u;) r[a - 1] = hf(t, a / u);
    return o
  }

  function o(a) {
    return a == null || isNaN(a = +a) ? n : e[De(r, a)]
  }
  return o.invertExtent = function(a) {
    var u = e.indexOf(a);
    return u < 0 ? [NaN, NaN] : [u > 0 ? r[u - 1] : t[0], u < r.length ? r[u] : t[t.length - 1]]
  }, o.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [];
    for (let u of a) u != null && !isNaN(u = +u) && t.push(u);
    return t.sort(ne), i()
  }, o.range = function(a) {
    return arguments.length ? (e = Array.from(a), i()) : e.slice()
  }, o.unknown = function(a) {
    return arguments.length ? (n = a, o) : n
  }, o.quantiles = function() {
    return r.slice()
  }, o.copy = function() {
    return Hu().domain(t).range(e).unknown(n)
  }, jt.apply(o, arguments)
}

function Gu() {
  var t = 0,
    e = 1,
    r = 1,
    n = [.5],
    i = [0, 1],
    o;

  function a(s) {
    return s != null && s <= s ? i[De(n, s, 0, r)] : o
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
    return Gu().domain([t, e]).range(i).unknown(o)
  }, jt.apply(ie(a), arguments)
}

function Ku() {
  var t = [.5],
    e = [0, 1],
    r, n = 1;

  function i(o) {
    return o != null && o <= o ? e[De(t, o, 0, n)] : r
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
    return Ku().domain(t).range(e).unknown(r)
  }, jt.apply(i, arguments)
}
var Cf = new Date,
  If = new Date;

function Pt(t, e, r, n) {
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
  }, i.filter = o => Pt(a => {
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
  }), r && (i.count = (o, a) => (Cf.setTime(+o), If.setTime(+a), t(Cf), t(If), Math.floor(r(Cf, If))), i.every = o => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(n ? a => n(a) % o === 0 : a => i.count(0, a) % o === 0) : i)), i
}
var So = Pt(() => {}, (t, e) => {
  t.setTime(+t + e)
}, (t, e) => e - t);
So.every = t => (t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? Pt(e => {
  e.setTime(Math.floor(e / t) * t)
}, (e, r) => {
  e.setTime(+e + r * t)
}, (e, r) => (r - e) / t) : So);
var PZ = So.range;
var je = Pt(t => {
    t.setTime(t - t.getMilliseconds())
  }, (t, e) => {
    t.setTime(+t + e * 1e3)
  }, (t, e) => (e - t) / 1e3, t => t.getUTCSeconds()),
  Y0 = je.range;
var Gn = Pt(t => {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * 1e3)
  }, (t, e) => {
    t.setTime(+t + e * 6e4)
  }, (t, e) => (e - t) / 6e4, t => t.getMinutes()),
  sB = Gn.range,
  Kn = Pt(t => {
    t.setUTCSeconds(0, 0)
  }, (t, e) => {
    t.setTime(+t + e * 6e4)
  }, (t, e) => (e - t) / 6e4, t => t.getUTCMinutes()),
  lB = Kn.range;
var Vn = Pt(t => {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * 1e3 - t.getMinutes() * 6e4)
  }, (t, e) => {
    t.setTime(+t + e * 36e5)
  }, (t, e) => (e - t) / 36e5, t => t.getHours()),
  cB = Vn.range,
  Xn = Pt(t => {
    t.setUTCMinutes(0, 0, 0)
  }, (t, e) => {
    t.setTime(+t + e * 36e5)
  }, (t, e) => (e - t) / 36e5, t => t.getUTCHours()),
  fB = Xn.range;
var cr = Pt(t => t.setHours(0, 0, 0, 0), (t, e) => t.setDate(t.getDate() + e), (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 864e5, t => t.getDate() - 1),
  pB = cr.range,
  en = Pt(t => {
    t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCDate(t.getUTCDate() + e)
  }, (t, e) => (e - t) / 864e5, t => t.getUTCDate() - 1),
  dB = en.range,
  Vu = Pt(t => {
    t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCDate(t.getUTCDate() + e)
  }, (t, e) => (e - t) / 864e5, t => Math.floor(t / 864e5)),
  mB = Vu.range;

function rn(t) {
  return Pt(e => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0)
  }, (e, r) => {
    e.setDate(e.getDate() + r * 7)
  }, (e, r) => (r - e - (r.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 6048e5)
}
var fr = rn(0),
  Yn = rn(1),
  J0 = rn(2),
  Q0 = rn(3),
  Sr = rn(4),
  tw = rn(5),
  ew = rn(6),
  rw = fr.range,
  hB = Yn.range,
  yB = J0.range,
  vB = Q0.range,
  gB = Sr.range,
  bB = tw.range,
  xB = ew.range;

function nn(t) {
  return Pt(e => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0)
  }, (e, r) => {
    e.setUTCDate(e.getUTCDate() + r * 7)
  }, (e, r) => (r - e) / 6048e5)
}
var pr = nn(0),
  Zn = nn(1),
  nw = nn(2),
  iw = nn(3),
  Ar = nn(4),
  ow = nn(5),
  aw = nn(6),
  uw = pr.range,
  wB = Zn.range,
  OB = nw.range,
  SB = iw.range,
  AB = Ar.range,
  _B = ow.range,
  PB = aw.range;
var Jn = Pt(t => {
    t.setDate(1), t.setHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setMonth(t.getMonth() + e)
  }, (t, e) => e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12, t => t.getMonth()),
  TB = Jn.range,
  Qn = Pt(t => {
    t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCMonth(t.getUTCMonth() + e)
  }, (t, e) => e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12, t => t.getUTCMonth()),
  EB = Qn.range;
var pe = Pt(t => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e)
}, (t, e) => e.getFullYear() - t.getFullYear(), t => t.getFullYear());
pe.every = t => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : Pt(e => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
}, (e, r) => {
  e.setFullYear(e.getFullYear() + r * t)
});
var jB = pe.range,
  de = Pt(t => {
    t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCFullYear(t.getUTCFullYear() + e)
  }, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), t => t.getUTCFullYear());
de.every = t => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : Pt(e => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
}, (e, r) => {
  e.setUTCFullYear(e.getUTCFullYear() + r * t)
});
var MB = de.range;

function lw(t, e, r, n, i, o) {
  let a = [
    [je, 1, 1e3],
    [je, 5, 5 * 1e3],
    [je, 15, 15 * 1e3],
    [je, 30, 30 * 1e3],
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
      d = Ur(([, , v]) => v).right(a, p);
    if (d === a.length) return t.every(zn(l / 31536e6, f / 31536e6, c));
    if (d === 0) return So.every(Math.max(zn(l, f, c), 1));
    let [y, m] = a[p / a[d - 1][2] < a[d][2] / p ? d - 1 : d];
    return y.every(m)
  }
  return [u, s]
}
var [kf, Df] = lw(de, Qn, pr, Vu, Xn, Kn), [Nf, Rf] = lw(pe, Jn, fr, cr, Vn, Gn);

function Lf(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
}

function Bf(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
}

function _o(t, e, r) {
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

function qf(t) {
  var e = t.dateTime,
    r = t.date,
    n = t.time,
    i = t.periods,
    o = t.days,
    a = t.shortDays,
    u = t.months,
    s = t.shortMonths,
    l = Po(i),
    f = To(i),
    c = Po(o),
    p = To(o),
    d = Po(a),
    y = To(a),
    m = Po(u),
    v = To(u),
    x = Po(s),
    w = To(s),
    S = {
      a: O,
      A: E,
      b: P,
      B: j,
      c: null,
      d: hw,
      e: hw,
      f: tq,
      g: cq,
      G: pq,
      H: ZB,
      I: JB,
      j: QB,
      L: xw,
      m: eq,
      M: rq,
      p: T,
      q: R,
      Q: gw,
      s: bw,
      S: nq,
      u: iq,
      U: oq,
      V: aq,
      w: uq,
      W: sq,
      x: null,
      X: null,
      y: lq,
      Y: fq,
      Z: dq,
      "%": vw
    },
    _ = {
      a: B,
      A: G,
      b: Z,
      B: J,
      c: null,
      d: yw,
      e: yw,
      f: vq,
      g: Tq,
      G: jq,
      H: mq,
      I: hq,
      j: yq,
      L: Ow,
      m: gq,
      M: bq,
      p: V,
      q: dt,
      Q: gw,
      s: bw,
      S: xq,
      u: wq,
      U: Oq,
      V: Sq,
      w: Aq,
      W: _q,
      x: null,
      X: null,
      y: Pq,
      Y: Eq,
      Z: Mq,
      "%": vw
    },
    h = {
      a: q,
      A: W,
      b: L,
      B: H,
      c: F,
      d: dw,
      e: dw,
      f: KB,
      g: pw,
      G: fw,
      H: mw,
      I: mw,
      j: $B,
      L: GB,
      m: FB,
      M: UB,
      p: D,
      q: zB,
      Q: XB,
      s: YB,
      S: HB,
      u: RB,
      U: LB,
      V: BB,
      w: NB,
      W: qB,
      x: z,
      X: b,
      y: pw,
      Y: fw,
      Z: WB,
      "%": VB
    };
  S.x = g(r, S), S.X = g(n, S), S.c = g(e, S), _.x = g(r, _), _.X = g(n, _), _.c = g(e, _);

  function g(K, st) {
    return function(tt) {
      var k = [],
        gt = -1,
        ft = 0,
        _t = K.length,
        N, et, rt;
      for (tt instanceof Date || (tt = new Date(+tt)); ++gt < _t;) K.charCodeAt(gt) === 37 && (k.push(K.slice(ft, gt)), (et = cw[N = K.charAt(++gt)]) != null ? N = K.charAt(++gt) : et = N === "e" ? " " : "0", (rt = st[N]) && (N = rt(tt, et)), k.push(N), ft = gt + 1);
      return k.push(K.slice(ft, gt)), k.join("")
    }
  }

  function A(K, st) {
    return function(tt) {
      var k = _o(1900, void 0, 1),
        gt = C(k, K, tt += "", 0),
        ft, _t;
      if (gt != tt.length) return null;
      if ("Q" in k) return new Date(k.Q);
      if ("s" in k) return new Date(k.s * 1e3 + ("L" in k ? k.L : 0));
      if (st && !("Z" in k) && (k.Z = 0), "p" in k && (k.H = k.H % 12 + k.p * 12), k.m === void 0 && (k.m = "q" in k ? k.q : 0), "V" in k) {
        if (k.V < 1 || k.V > 53) return null;
        "w" in k || (k.w = 1), "Z" in k ? (ft = Bf(_o(k.y, 0, 1)), _t = ft.getUTCDay(), ft = _t > 4 || _t === 0 ? Zn.ceil(ft) : Zn(ft), ft = en.offset(ft, (k.V - 1) * 7), k.y = ft.getUTCFullYear(), k.m = ft.getUTCMonth(), k.d = ft.getUTCDate() + (k.w + 6) % 7) : (ft = Lf(_o(k.y, 0, 1)), _t = ft.getDay(), ft = _t > 4 || _t === 0 ? Yn.ceil(ft) : Yn(ft), ft = cr.offset(ft, (k.V - 1) * 7), k.y = ft.getFullYear(), k.m = ft.getMonth(), k.d = ft.getDate() + (k.w + 6) % 7)
      } else("W" in k || "U" in k) && ("w" in k || (k.w = "u" in k ? k.u % 7 : "W" in k ? 1 : 0), _t = "Z" in k ? Bf(_o(k.y, 0, 1)).getUTCDay() : Lf(_o(k.y, 0, 1)).getDay(), k.m = 0, k.d = "W" in k ? (k.w + 6) % 7 + k.W * 7 - (_t + 5) % 7 : k.w + k.U * 7 - (_t + 6) % 7);
      return "Z" in k ? (k.H += k.Z / 100 | 0, k.M += k.Z % 100, Bf(k)) : Lf(k)
    }
  }

  function C(K, st, tt, k) {
    for (var gt = 0, ft = st.length, _t = tt.length, N, et; gt < ft;) {
      if (k >= _t) return -1;
      if (N = st.charCodeAt(gt++), N === 37) {
        if (N = st.charAt(gt++), et = h[N in cw ? st.charAt(gt++) : N], !et || (k = et(K, tt, k)) < 0) return -1
      } else if (N != tt.charCodeAt(k++)) return -1
    }
    return k
  }

  function D(K, st, tt) {
    var k = l.exec(st.slice(tt));
    return k ? (K.p = f.get(k[0].toLowerCase()), tt + k[0].length) : -1
  }

  function q(K, st, tt) {
    var k = d.exec(st.slice(tt));
    return k ? (K.w = y.get(k[0].toLowerCase()), tt + k[0].length) : -1
  }

  function W(K, st, tt) {
    var k = c.exec(st.slice(tt));
    return k ? (K.w = p.get(k[0].toLowerCase()), tt + k[0].length) : -1
  }

  function L(K, st, tt) {
    var k = x.exec(st.slice(tt));
    return k ? (K.m = w.get(k[0].toLowerCase()), tt + k[0].length) : -1
  }

  function H(K, st, tt) {
    var k = m.exec(st.slice(tt));
    return k ? (K.m = v.get(k[0].toLowerCase()), tt + k[0].length) : -1
  }

  function F(K, st, tt) {
    return C(K, e, st, tt)
  }

  function z(K, st, tt) {
    return C(K, r, st, tt)
  }

  function b(K, st, tt) {
    return C(K, n, st, tt)
  }

  function O(K) {
    return a[K.getDay()]
  }

  function E(K) {
    return o[K.getDay()]
  }

  function P(K) {
    return s[K.getMonth()]
  }

  function j(K) {
    return u[K.getMonth()]
  }

  function T(K) {
    return i[+(K.getHours() >= 12)]
  }

  function R(K) {
    return 1 + ~~(K.getMonth() / 3)
  }

  function B(K) {
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

  function V(K) {
    return i[+(K.getUTCHours() >= 12)]
  }

  function dt(K) {
    return 1 + ~~(K.getUTCMonth() / 3)
  }
  return {
    format: function(K) {
      var st = g(K += "", S);
      return st.toString = function() {
        return K
      }, st
    },
    parse: function(K) {
      var st = A(K += "", !1);
      return st.toString = function() {
        return K
      }, st
    },
    utcFormat: function(K) {
      var st = g(K += "", _);
      return st.toString = function() {
        return K
      }, st
    },
    utcParse: function(K) {
      var st = A(K += "", !0);
      return st.toString = function() {
        return K
      }, st
    }
  }
}
var cw = {
    "-": "",
    _: " ",
    0: "0"
  },
  $t = /^\s*\d+/,
  IB = /^%/,
  kB = /[\\^$*+?|[\]().{}]/g;

function xt(t, e, r) {
  var n = t < 0 ? "-" : "",
    i = (n ? -t : t) + "",
    o = i.length;
  return n + (o < r ? new Array(r - o + 1).join(e) + i : i)
}

function DB(t) {
  return t.replace(kB, "\\$&")
}

function Po(t) {
  return new RegExp("^(?:" + t.map(DB).join("|") + ")", "i")
}

function To(t) {
  return new Map(t.map((e, r) => [e.toLowerCase(), r]))
}

function NB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 1));
  return n ? (t.w = +n[0], r + n[0].length) : -1
}

function RB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 1));
  return n ? (t.u = +n[0], r + n[0].length) : -1
}

function LB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 2));
  return n ? (t.U = +n[0], r + n[0].length) : -1
}

function BB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 2));
  return n ? (t.V = +n[0], r + n[0].length) : -1
}

function qB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 2));
  return n ? (t.W = +n[0], r + n[0].length) : -1
}

function fw(t, e, r) {
  var n = $t.exec(e.slice(r, r + 4));
  return n ? (t.y = +n[0], r + n[0].length) : -1
}

function pw(t, e, r) {
  var n = $t.exec(e.slice(r, r + 2));
  return n ? (t.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1
}

function WB(t, e, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
  return n ? (t.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1
}

function zB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 1));
  return n ? (t.q = n[0] * 3 - 3, r + n[0].length) : -1
}

function FB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 2));
  return n ? (t.m = n[0] - 1, r + n[0].length) : -1
}

function dw(t, e, r) {
  var n = $t.exec(e.slice(r, r + 2));
  return n ? (t.d = +n[0], r + n[0].length) : -1
}

function $B(t, e, r) {
  var n = $t.exec(e.slice(r, r + 3));
  return n ? (t.m = 0, t.d = +n[0], r + n[0].length) : -1
}

function mw(t, e, r) {
  var n = $t.exec(e.slice(r, r + 2));
  return n ? (t.H = +n[0], r + n[0].length) : -1
}

function UB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 2));
  return n ? (t.M = +n[0], r + n[0].length) : -1
}

function HB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 2));
  return n ? (t.S = +n[0], r + n[0].length) : -1
}

function GB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 3));
  return n ? (t.L = +n[0], r + n[0].length) : -1
}

function KB(t, e, r) {
  var n = $t.exec(e.slice(r, r + 6));
  return n ? (t.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1
}

function VB(t, e, r) {
  var n = IB.exec(e.slice(r, r + 1));
  return n ? r + n[0].length : -1
}

function XB(t, e, r) {
  var n = $t.exec(e.slice(r));
  return n ? (t.Q = +n[0], r + n[0].length) : -1
}

function YB(t, e, r) {
  var n = $t.exec(e.slice(r));
  return n ? (t.s = +n[0], r + n[0].length) : -1
}

function hw(t, e) {
  return xt(t.getDate(), e, 2)
}

function ZB(t, e) {
  return xt(t.getHours(), e, 2)
}

function JB(t, e) {
  return xt(t.getHours() % 12 || 12, e, 2)
}

function QB(t, e) {
  return xt(1 + cr.count(pe(t), t), e, 3)
}

function xw(t, e) {
  return xt(t.getMilliseconds(), e, 3)
}

function tq(t, e) {
  return xw(t, e) + "000"
}

function eq(t, e) {
  return xt(t.getMonth() + 1, e, 2)
}

function rq(t, e) {
  return xt(t.getMinutes(), e, 2)
}

function nq(t, e) {
  return xt(t.getSeconds(), e, 2)
}

function iq(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e
}

function oq(t, e) {
  return xt(fr.count(pe(t) - 1, t), e, 2)
}

function ww(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Sr(t) : Sr.ceil(t)
}

function aq(t, e) {
  return t = ww(t), xt(Sr.count(pe(t), t) + (pe(t).getDay() === 4), e, 2)
}

function uq(t) {
  return t.getDay()
}

function sq(t, e) {
  return xt(Yn.count(pe(t) - 1, t), e, 2)
}

function lq(t, e) {
  return xt(t.getFullYear() % 100, e, 2)
}

function cq(t, e) {
  return t = ww(t), xt(t.getFullYear() % 100, e, 2)
}

function fq(t, e) {
  return xt(t.getFullYear() % 1e4, e, 4)
}

function pq(t, e) {
  var r = t.getDay();
  return t = r >= 4 || r === 0 ? Sr(t) : Sr.ceil(t), xt(t.getFullYear() % 1e4, e, 4)
}

function dq(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + xt(e / 60 | 0, "0", 2) + xt(e % 60, "0", 2)
}

function yw(t, e) {
  return xt(t.getUTCDate(), e, 2)
}

function mq(t, e) {
  return xt(t.getUTCHours(), e, 2)
}

function hq(t, e) {
  return xt(t.getUTCHours() % 12 || 12, e, 2)
}

function yq(t, e) {
  return xt(1 + en.count(de(t), t), e, 3)
}

function Ow(t, e) {
  return xt(t.getUTCMilliseconds(), e, 3)
}

function vq(t, e) {
  return Ow(t, e) + "000"
}

function gq(t, e) {
  return xt(t.getUTCMonth() + 1, e, 2)
}

function bq(t, e) {
  return xt(t.getUTCMinutes(), e, 2)
}

function xq(t, e) {
  return xt(t.getUTCSeconds(), e, 2)
}

function wq(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e
}

function Oq(t, e) {
  return xt(pr.count(de(t) - 1, t), e, 2)
}

function Sw(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Ar(t) : Ar.ceil(t)
}

function Sq(t, e) {
  return t = Sw(t), xt(Ar.count(de(t), t) + (de(t).getUTCDay() === 4), e, 2)
}

function Aq(t) {
  return t.getUTCDay()
}

function _q(t, e) {
  return xt(Zn.count(de(t) - 1, t), e, 2)
}

function Pq(t, e) {
  return xt(t.getUTCFullYear() % 100, e, 2)
}

function Tq(t, e) {
  return t = Sw(t), xt(t.getUTCFullYear() % 100, e, 2)
}

function Eq(t, e) {
  return xt(t.getUTCFullYear() % 1e4, e, 4)
}

function jq(t, e) {
  var r = t.getUTCDay();
  return t = r >= 4 || r === 0 ? Ar(t) : Ar.ceil(t), xt(t.getUTCFullYear() % 1e4, e, 4)
}

function Mq() {
  return "+0000"
}

function vw() {
  return "%"
}

function gw(t) {
  return +t
}

function bw(t) {
  return Math.floor(+t / 1e3)
}
var ti, Xu, Aw, Yu, _w;
Wf({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function Wf(t) {
  return ti = qf(t), Xu = ti.format, Aw = ti.parse, Yu = ti.utcFormat, _w = ti.utcParse, ti
}

function Cq(t) {
  return new Date(t)
}

function Iq(t) {
  return t instanceof Date ? +t : +new Date(+t)
}

function Zu(t, e, r, n, i, o, a, u, s, l) {
  var f = Yr(),
    c = f.invert,
    p = f.domain,
    d = l(".%L"),
    y = l(":%S"),
    m = l("%I:%M"),
    v = l("%I %p"),
    x = l("%a %d"),
    w = l("%b %d"),
    S = l("%B"),
    _ = l("%Y");

  function h(g) {
    return (s(g) < g ? d : u(g) < g ? y : a(g) < g ? m : o(g) < g ? v : n(g) < g ? i(g) < g ? x : w : r(g) < g ? S : _)(g)
  }
  return f.invert = function(g) {
    return new Date(c(g))
  }, f.domain = function(g) {
    return arguments.length ? p(Array.from(g, Iq)) : p().map(Cq)
  }, f.ticks = function(g) {
    var A = p();
    return t(A[0], A[A.length - 1], g ?? 10)
  }, f.tickFormat = function(g, A) {
    return A == null ? h : l(A)
  }, f.nice = function(g) {
    var A = p();
    return (!g || typeof g.range != "function") && (g = e(A[0], A[A.length - 1], g ?? 10)), g ? p(go(A, g)) : f
  }, f.copy = function() {
    return Ye(f, Zu(t, e, r, n, i, o, a, u, s, l))
  }, f
}

function zf() {
  return jt.apply(Zu(Nf, Rf, pe, Jn, fr, cr, Vn, Gn, je, Xu).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments)
}

function Ff() {
  return jt.apply(Zu(kf, Df, de, Qn, pr, en, Xn, Kn, je, Yu).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments)
}

function Ju() {
  var t = 0,
    e = 1,
    r, n, i, o, a = Bt,
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
  return l.range = f(fe), l.rangeRound = f(Vr), l.unknown = function(c) {
      return arguments.length ? (s = c, l) : s
    },
    function(c) {
      return o = c, r = c(t), n = c(e), i = r === n ? 0 : 1 / (n - r), l
    }
}

function dr(t, e) {
  return e.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown())
}

function Qu() {
  var t = ie(Ju()(Bt));
  return t.copy = function() {
    return dr(t, Qu())
  }, Ee.apply(t, arguments)
}

function $f() {
  var t = bo(Ju()).domain([1, 10]);
  return t.copy = function() {
    return dr(t, $f()).base(t.base())
  }, Ee.apply(t, arguments)
}

function Uf() {
  var t = xo(Ju());
  return t.copy = function() {
    return dr(t, Uf()).constant(t.constant())
  }, Ee.apply(t, arguments)
}

function ts() {
  var t = wo(Ju());
  return t.copy = function() {
    return dr(t, ts()).exponent(t.exponent())
  }, Ee.apply(t, arguments)
}

function Pw() {
  return ts.apply(null, arguments).exponent(.5)
}

function es() {
  var t = [],
    e = Bt;

  function r(n) {
    if (n != null && !isNaN(n = +n)) return e((De(t, n, 1) - 1) / (t.length - 1))
  }
  return r.domain = function(n) {
    if (!arguments.length) return t.slice();
    t = [];
    for (let i of n) i != null && !isNaN(i = +i) && t.push(i);
    return t.sort(ne), r
  }, r.interpolator = function(n) {
    return arguments.length ? (e = n, r) : e
  }, r.range = function() {
    return t.map((n, i) => e(i / (t.length - 1)))
  }, r.quantiles = function(n) {
    return Array.from({
      length: n + 1
    }, (i, o) => Eu(t, o / n))
  }, r.copy = function() {
    return es(e).domain(t)
  }, Ee.apply(r, arguments)
}

function rs() {
  var t = 0,
    e = .5,
    r = 1,
    n = 1,
    i, o, a, u, s, l = Bt,
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
      return arguments.length ? ([x, w, S] = v, l = Lu(m, [x, w, S]), d) : [l(0), l(.5), l(1)]
    }
  }
  return d.range = y(fe), d.rangeRound = y(Vr), d.unknown = function(m) {
      return arguments.length ? (p = m, d) : p
    },
    function(m) {
      return f = m, i = m(t), o = m(e), a = m(r), u = i === o ? 0 : .5 / (o - i), s = o === a ? 0 : .5 / (a - o), n = o < i ? -1 : 1, d
    }
}

function ns() {
  var t = ie(rs()(Bt));
  return t.copy = function() {
    return dr(t, ns())
  }, Ee.apply(t, arguments)
}

function Hf() {
  var t = bo(rs()).domain([.1, 1, 10]);
  return t.copy = function() {
    return dr(t, Hf()).base(t.base())
  }, Ee.apply(t, arguments)
}

function Gf() {
  var t = xo(rs());
  return t.copy = function() {
    return dr(t, Gf()).constant(t.constant())
  }, Ee.apply(t, arguments)
}

function is() {
  var t = wo(rs());
  return t.copy = function() {
    return dr(t, is()).exponent(t.exponent())
  }, Ee.apply(t, arguments)
}

function Tw() {
  return is.apply(null, arguments).exponent(.5)
}
var Ro = Q(Iw()),
  Lo = Q(Rw()),
  me = Q(xe()),
  ni = Q(It()),
  a1 = Q(Na()),
  lp = Q(Dr()),
  u1 = Q(Ww()),
  ps = Q(Pl()),
  s1 = Q(Xa()),
  l1 = Q(Eo()),
  c1 = Q(hu());
var St = Q(Vf());

function eW(t) {
  return oW(t) || iW(t) || nW(t) || rW()
}

function rW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function nW(t, e) {
  if (t) {
    if (typeof t == "string") return Xf(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Xf(t, e)
  }
}

function iW(t) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(t)) return Array.from(t)
}

function oW(t) {
  if (Array.isArray(t)) return Xf(t)
}

function Xf(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var aW = function(e) {
    return e
  },
  Uw = {
    "@@functional/placeholder": !0
  },
  Hw = function(e) {
    return e === Uw
  },
  $w = function(e) {
    return function r() {
      return arguments.length === 0 || arguments.length === 1 && Hw(arguments.length <= 0 ? void 0 : arguments[0]) ? r : e.apply(void 0, arguments)
    }
  },
  uW = function t(e, r) {
    return e === 1 ? r : $w(function() {
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      var a = i.filter(function(u) {
        return u !== Uw
      }).length;
      return a >= e ? r.apply(void 0, i) : t(e - a, $w(function() {
        for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++) s[l] = arguments[l];
        var f = i.map(function(c) {
          return Hw(c) ? s.shift() : c
        });
        return r.apply(void 0, eW(f).concat(s))
      }))
    })
  },
  jo = function(e) {
    return uW(e.length, e)
  },
  Mo = function(e, r) {
    for (var n = [], i = e; i < r; ++i) n[i - e] = i;
    return n
  },
  Yf = jo(function(t, e) {
    return Array.isArray(e) ? e.map(t) : Object.keys(e).map(function(r) {
      return e[r]
    }).map(t)
  }),
  Zf = function() {
    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
    if (!r.length) return aW;
    var i = r.reverse(),
      o = i[0],
      a = i.slice(1);
    return function() {
      return a.reduce(function(u, s) {
        return s(u)
      }, o.apply(void 0, arguments))
    }
  },
  Co = function(e) {
    return Array.isArray(e) ? e.reverse() : e.split("").reverse.join("")
  },
  us = function(e) {
    var r = null,
      n = null;
    return function() {
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
      return r && o.every(function(u, s) {
        return u === r[s]
      }) || (r = o, n = e.apply(void 0, o)), n
    }
  };
var Jf = Q(Vf());

function sW(t) {
  var e;
  return t === 0 ? e = 1 : e = Math.floor(new Jf.default(t).abs().log(10).toNumber()) + 1, e
}

function lW(t, e, r) {
  for (var n = new Jf.default(t), i = 0, o = []; n.lt(e) && i < 1e5;) o.push(n.toNumber()), n = n.add(r), i++;
  return o
}
var cW = jo(function(t, e, r) {
    var n = +t,
      i = +e;
    return n + r * (i - n)
  }),
  fW = jo(function(t, e, r) {
    var n = e - +t;
    return n = n || 1 / 0, (r - t) / n
  }),
  pW = jo(function(t, e, r) {
    var n = e - +t;
    return n = n || 1 / 0, Math.max(0, Math.min(1, (r - t) / n))
  }),
  Io = {
    rangeStep: lW,
    getDigitCount: sW,
    interpolateNumber: cW,
    uninterpolateNumber: fW,
    uninterpolateTruncation: pW
  };

function Qf(t) {
  return hW(t) || mW(t) || Gw(t) || dW()
}

function dW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function mW(t) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(t)) return Array.from(t)
}

function hW(t) {
  if (Array.isArray(t)) return tp(t)
}

function on(t, e) {
  return gW(t) || vW(t, e) || Gw(t, e) || yW()
}

function yW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Gw(t, e) {
  if (t) {
    if (typeof t == "string") return tp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return tp(t, e)
  }
}

function tp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function vW(t, e) {
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

function gW(t) {
  if (Array.isArray(t)) return t
}

function ep(t) {
  var e = on(t, 2),
    r = e[0],
    n = e[1],
    i = r,
    o = n;
  return r > n && (i = n, o = r), [i, o]
}

function rp(t, e, r) {
  if (t.lte(0)) return new St.default(0);
  var n = Io.getDigitCount(t.toNumber()),
    i = new St.default(10).pow(n),
    o = t.div(i),
    a = n !== 1 ? .05 : .1,
    u = new St.default(Math.ceil(o.div(a).toNumber())).add(r).mul(a),
    s = u.mul(i);
  return e ? s : new St.default(Math.ceil(s))
}

function Kw(t, e, r) {
  var n = 1,
    i = new St.default(t);
  if (!i.isint() && r) {
    var o = Math.abs(t);
    o < 1 ? (n = new St.default(10).pow(Io.getDigitCount(t) - 1), i = new St.default(Math.floor(i.div(n).toNumber())).mul(n)) : o > 1 && (i = new St.default(Math.floor(t)))
  } else t === 0 ? i = new St.default(Math.floor((e - 1) / 2)) : r || (i = new St.default(Math.floor(t)));
  var a = Math.floor((e - 1) / 2),
    u = Zf(Yf(function(s) {
      return i.add(new St.default(s - a).mul(n)).toNumber()
    }), Mo);
  return u(0, e)
}

function Vw(t, e, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((e - t) / (r - 1))) return {
    step: new St.default(0),
    tickMin: new St.default(0),
    tickMax: new St.default(0)
  };
  var o = rp(new St.default(e).sub(t).div(r - 1), n, i),
    a;
  t <= 0 && e >= 0 ? a = new St.default(0) : (a = new St.default(t).add(e).div(2), a = a.sub(new St.default(a).mod(o)));
  var u = Math.ceil(a.sub(t).div(o).toNumber()),
    s = Math.ceil(new St.default(e).sub(a).div(o).toNumber()),
    l = u + s + 1;
  return l > r ? Vw(t, e, r, n, i + 1) : (l < r && (s = e > 0 ? s + (r - l) : s, u = e > 0 ? u : u + (r - l)), {
    step: o,
    tickMin: a.sub(new St.default(u).mul(o)),
    tickMax: a.add(new St.default(s).mul(o))
  })
}

function bW(t) {
  var e = on(t, 2),
    r = e[0],
    n = e[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = ep([r, n]),
    s = on(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) {
    var c = f === 1 / 0 ? [l].concat(Qf(Mo(0, i - 1).map(function() {
      return 1 / 0
    }))) : [].concat(Qf(Mo(0, i - 1).map(function() {
      return -1 / 0
    })), [f]);
    return r > n ? Co(c) : c
  }
  if (l === f) return Kw(l, i, o);
  var p = Vw(l, f, a, o),
    d = p.step,
    y = p.tickMin,
    m = p.tickMax,
    v = Io.rangeStep(y, m.add(new St.default(.1).mul(d)), d);
  return r > n ? Co(v) : v
}

function xW(t) {
  var e = on(t, 2),
    r = e[0],
    n = e[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = ep([r, n]),
    s = on(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) return [r, n];
  if (l === f) return Kw(l, i, o);
  var c = rp(new St.default(f).sub(l).div(a - 1), o, 0),
    p = Zf(Yf(function(y) {
      return new St.default(l).add(new St.default(y).mul(c)).toNumber()
    }), Mo),
    d = p(0, a).filter(function(y) {
      return y >= l && y <= f
    });
  return r > n ? Co(d) : d
}

function wW(t, e) {
  var r = on(t, 2),
    n = r[0],
    i = r[1],
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = ep([n, i]),
    u = on(a, 2),
    s = u[0],
    l = u[1];
  if (s === -1 / 0 || l === 1 / 0) return [n, i];
  if (s === l) return [s];
  var f = Math.max(e, 2),
    c = rp(new St.default(l).sub(s).div(f - 1), o, 0),
    p = [].concat(Qf(Io.rangeStep(new St.default(s), new St.default(l).sub(new St.default(.99).mul(c)), c)), [l]);
  return n > i ? Co(p) : p
}
var np = us(bW),
  OW = us(xW),
  ip = us(wW);
import ss from "./react-shim-eraudit.js";
var SW = !0,
  op = "Invariant failed";

function Re(t, e) {
  if (!t) {
    if (SW) throw new Error(op);
    var r = typeof e == "function" ? e() : e,
      n = r ? "".concat(op, ": ").concat(r) : op;
    throw new Error(n)
  }
}
var AW = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];

function ei(t) {
  "@babel/helpers - typeof";
  return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ei(t)
}

function ls() {
  return ls = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, ls.apply(this, arguments)
}

function _W(t, e) {
  return jW(t) || EW(t, e) || TW(t, e) || PW()
}

function PW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function TW(t, e) {
  if (t) {
    if (typeof t == "string") return Xw(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Xw(t, e)
  }
}

function Xw(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function EW(t, e) {
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

function jW(t) {
  if (Array.isArray(t)) return t
}

function MW(t, e) {
  if (t == null) return {};
  var r = CW(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function CW(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function IW(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Yw(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Qw(n.key), n)
  }
}

function kW(t, e, r) {
  return e && Yw(t.prototype, e), r && Yw(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function DW(t, e, r) {
  return e = cs(e), NW(t, Zw() ? Reflect.construct(e, r || [], cs(t).constructor) : e.apply(t, r))
}

function NW(t, e) {
  if (e && (ei(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return RW(t)
}

function RW(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Zw() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Zw = function() {
    return !!t
  })()
}

function cs(t) {
  return cs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, cs(t)
}

function LW(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && ap(t, e)
}

function ap(t, e) {
  return ap = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, ap(t, e)
}

function Jw(t, e, r) {
  return e = Qw(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Qw(t) {
  var e = BW(t, "string");
  return ei(e) == "symbol" ? e : e + ""
}

function BW(t, e) {
  if (ei(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var _r = function(t) {
  function e() {
    return IW(this, e), DW(this, e, arguments)
  }
  return LW(e, t), kW(e, [{
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
        p = MW(n, AW),
        d = at(p, !1);
      this.props.direction === "x" && f.type !== "number" && Re(!1);
      var y = s.map(function(m) {
        var v = l(m, u),
          x = v.x,
          w = v.y,
          S = v.value,
          _ = v.errorVal;
        if (!_) return null;
        var h = [],
          g, A;
        if (Array.isArray(_)) {
          var C = _W(_, 2);
          g = C[0], A = C[1]
        } else g = A = _;
        if (o === "vertical") {
          var D = f.scale,
            q = w + i,
            W = q + a,
            L = q - a,
            H = D(S - g),
            F = D(S + A);
          h.push({
            x1: F,
            y1: W,
            x2: F,
            y2: L
          }), h.push({
            x1: H,
            y1: q,
            x2: F,
            y2: q
          }), h.push({
            x1: H,
            y1: W,
            x2: H,
            y2: L
          })
        } else if (o === "horizontal") {
          var z = c.scale,
            b = x + i,
            O = b - a,
            E = b + a,
            P = z(S - g),
            j = z(S + A);
          h.push({
            x1: O,
            y1: j,
            x2: E,
            y2: j
          }), h.push({
            x1: b,
            y1: P,
            x2: b,
            y2: j
          }), h.push({
            x1: O,
            y1: P,
            x2: E,
            y2: P
          })
        }
        return ss.createElement(bt, ls({
          className: "recharts-errorBar",
          key: "bar-".concat(h.map(function(T) {
            return "".concat(T.x1, "-").concat(T.x2, "-").concat(T.y1, "-").concat(T.y2)
          }))
        }, d), h.map(function(T) {
          return ss.createElement("line", ls({}, T, {
            key: "line-".concat(T.x1, "-").concat(T.x2, "-").concat(T.y1, "-").concat(T.y2)
          }))
        }))
      });
      return ss.createElement(bt, {
        className: "recharts-errorBars"
      }, y)
    }
  }])
}(ss.Component);
Jw(_r, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
Jw(_r, "displayName", "ErrorBar");

function ko(t) {
  "@babel/helpers - typeof";
  return ko = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ko(t)
}

function t1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function an(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? t1(Object(r), !0).forEach(function(n) {
      qW(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : t1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function qW(t, e, r) {
  return e = WW(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function WW(t) {
  var e = zW(t, "string");
  return ko(e) == "symbol" ? e : e + ""
}

function zW(t, e) {
  if (ko(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ko(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var fs = function(e) {
  var r = e.children,
    n = e.formattedGraphicalItems,
    i = e.legendWidth,
    o = e.legendContent,
    a = Vt(r, Te);
  if (!a) return null;
  var u = Te.defaultProps,
    s = u !== void 0 ? an(an({}, u), a.props) : {},
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
      d = p !== void 0 ? an(an({}, p), c.props) : {},
      y = d.dataKey,
      m = d.name,
      v = d.legendType,
      x = d.hide;
    return {
      inactive: x,
      dataKey: y,
      type: s.iconType || v || "square",
      color: Do(c),
      value: m || y,
      payload: d
    }
  }), an(an(an({}, s), Te.getWithHeight(a, i)), {}, {
    payload: l,
    item: a
  })
};

function No(t) {
  "@babel/helpers - typeof";
  return No = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, No(t)
}

function e1(t) {
  return HW(t) || UW(t) || $W(t) || FW()
}

function FW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function $W(t, e) {
  if (t) {
    if (typeof t == "string") return sp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return sp(t, e)
  }
}

function UW(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function HW(t) {
  if (Array.isArray(t)) return sp(t)
}

function sp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function r1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Mt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? r1(Object(r), !0).forEach(function(n) {
      ri(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : r1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ri(t, e, r) {
  return e = GW(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function GW(t) {
  var e = KW(t, "string");
  return No(e) == "symbol" ? e : e + ""
}

function KW(t, e) {
  if (No(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (No(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Ut(t, e, r) {
  return (0, me.default)(t) || (0, me.default)(e) ? r : Tt(e) ? (0, lp.default)(t, e, r) : (0, ni.default)(e) ? e(t) : r
}

function ii(t, e, r, n) {
  var i = (0, u1.default)(t, function(u) {
    return Ut(u, e)
  });
  if (r === "number") {
    var o = i.filter(function(u) {
      return X(u) || parseFloat(u)
    });
    return o.length ? [(0, Lo.default)(o), (0, Ro.default)(o)] : [1 / 0, -1 / 0]
  }
  var a = n ? i.filter(function(u) {
    return !(0, me.default)(u)
  }) : i;
  return a.map(function(u) {
    return Tt(u) || u instanceof Date ? u : ""
  })
}
var f1 = function(e) {
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
        if (Kt(c - f) !== Kt(p - c)) {
          var y = [];
          if (Kt(p - c) === Kt(s[1] - s[0])) {
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
        for (var _ = 0; _ < u; _++)
          if (_ === 0 && e <= (n[_].coordinate + n[_ + 1].coordinate) / 2 || _ > 0 && _ < u - 1 && e > (n[_].coordinate + n[_ - 1].coordinate) / 2 && e <= (n[_].coordinate + n[_ + 1].coordinate) / 2 || _ === u - 1 && e > (n[_].coordinate + n[_ - 1].coordinate) / 2) {
            a = n[_].index;
            break
          } return a
  },
  Do = function(e) {
    var r, n = e,
      i = n.type.displayName,
      o = (r = e.type) !== null && r !== void 0 && r.defaultProps ? Mt(Mt({}, e.type.defaultProps), e.props) : e.props,
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
  p1 = function(e) {
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
          x = m.filter(function(A) {
            return Oe(A.type).indexOf("Bar") >= 0
          });
        if (x && x.length) {
          var w = x[0].type.defaultProps,
            S = w !== void 0 ? Mt(Mt({}, w), x[0].props) : x[0].props,
            _ = S.barSize,
            h = S[v];
          a[h] || (a[h] = []);
          var g = (0, me.default)(_) ? r : _;
          a[h].push({
            item: x[0],
            stackList: x.slice(1),
            barSize: (0, me.default)(g) ? void 0 : ke(g, n, 0)
          })
        }
      }
    return a
  },
  d1 = function(e) {
    var r = e.barGap,
      n = e.barCategoryGap,
      i = e.bandSize,
      o = e.sizeList,
      a = o === void 0 ? [] : o,
      u = e.maxBarSize,
      s = a.length;
    if (s < 1) return null;
    var l = ke(r, i, 0, !0),
      f, c = [];
    if (a[0].barSize === +a[0].barSize) {
      var p = !1,
        d = i / s,
        y = a.reduce(function(_, h) {
          return _ + h.barSize || 0
        }, 0);
      y += (s - 1) * l, y >= i && (y -= (s - 1) * l, l = 0), y >= i && d > 0 && (p = !0, d *= .9, y = s * d);
      var m = (i - y) / 2 >> 0,
        v = {
          offset: m - l,
          size: 0
        };
      f = a.reduce(function(_, h) {
        var g = {
            item: h.item,
            position: {
              offset: v.offset + v.size + l,
              size: p ? d : h.barSize
            }
          },
          A = [].concat(e1(_), [g]);
        return v = A[A.length - 1].position, h.stackList && h.stackList.length && h.stackList.forEach(function(C) {
          A.push({
            item: C,
            position: v
          })
        }), A
      }, c)
    } else {
      var x = ke(n, i, 0, !0);
      i - 2 * x - (s - 1) * l <= 0 && (l = 0);
      var w = (i - 2 * x - (s - 1) * l) / s;
      w > 1 && (w >>= 0);
      var S = u === +u ? Math.min(w, u) : w;
      f = a.reduce(function(_, h, g) {
        var A = [].concat(e1(_), [{
          item: h.item,
          position: {
            offset: x + (w + l) * g + (w - S) / 2,
            size: S
          }
        }]);
        return h.stackList && h.stackList.length && h.stackList.forEach(function(C) {
          A.push({
            item: C,
            position: A[A.length - 1].position
          })
        }), A
      }, c)
    }
    return f
  },
  m1 = function(e, r, n, i) {
    var o = n.children,
      a = n.width,
      u = n.margin,
      s = a - (u.left || 0) - (u.right || 0),
      l = fs({
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
      if ((m === "vertical" || m === "horizontal" && y === "middle") && d !== "center" && X(e[d])) return Mt(Mt({}, e), {}, ri({}, d, e[d] + (c || 0)));
      if ((m === "horizontal" || m === "vertical" && d === "center") && y !== "middle" && X(e[y])) return Mt(Mt({}, e), {}, ri({}, y, e[y] + (p || 0)))
    }
    return e
  },
  VW = function(e, r, n) {
    return (0, me.default)(r) ? !0 : e === "horizontal" ? r === "yAxis" : e === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0
  },
  h1 = function(e, r, n, i, o) {
    var a = r.props.children,
      u = Lt(a, _r).filter(function(l) {
        return VW(i, o, l.props.direction)
      });
    if (u && u.length) {
      var s = u.map(function(l) {
        return l.props.dataKey
      });
      return e.reduce(function(l, f) {
        var c = Ut(f, n);
        if ((0, me.default)(c)) return l;
        var p = Array.isArray(c) ? [(0, Lo.default)(c), (0, Ro.default)(c)] : [c, c],
          d = s.reduce(function(y, m) {
            var v = Ut(f, m, 0),
              x = p[0] - Math.abs(Array.isArray(v) ? v[0] : v),
              w = p[1] + Math.abs(Array.isArray(v) ? v[1] : v);
            return [Math.min(x, y[0]), Math.max(w, y[1])]
          }, [1 / 0, -1 / 0]);
        return [Math.min(d[0], l[0]), Math.max(d[1], l[1])]
      }, [1 / 0, -1 / 0])
    }
    return null
  },
  y1 = function(e, r, n, i, o) {
    var a = r.map(function(u) {
      return h1(e, u, n, o, i)
    }).filter(function(u) {
      return !(0, me.default)(u)
    });
    return a && a.length ? a.reduce(function(u, s) {
      return [Math.min(u[0], s[0]), Math.max(u[1], s[1])]
    }, [1 / 0, -1 / 0]) : null
  },
  cp = function(e, r, n, i, o) {
    var a = r.map(function(s) {
      var l = s.props.dataKey;
      return n === "number" && l && h1(e, s, l, i) || ii(e, l, n, o)
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
  fp = function(e, r) {
    return e === "horizontal" && r === "xAxis" || e === "vertical" && r === "yAxis" || e === "centric" && r === "angleAxis" || e === "radial" && r === "radiusAxis"
  },
  pp = function(e, r, n, i) {
    if (i) return e.map(function(s) {
      return s.coordinate
    });
    var o, a, u = e.map(function(s) {
      return s.coordinate === r && (o = !0), s.coordinate === n && (a = !0), s.coordinate
    });
    return o || u.push(r), a || u.push(n), u
  },
  he = function(e, r, n) {
    if (!e) return null;
    var i = e.scale,
      o = e.duplicateDomain,
      a = e.type,
      u = e.range,
      s = e.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2,
      l = (r || n) && a === "category" && i.bandwidth ? i.bandwidth() / s : 0;
    if (l = e.axisType === "angleAxis" && u?.length >= 2 ? Kt(u[0] - u[1]) * 2 * l : l, r && (e.ticks || e.niceTicks)) {
      var f = (e.ticks || e.niceTicks).map(function(c) {
        var p = o ? o.indexOf(c) : c;
        return {
          coordinate: i(p) + l,
          value: c,
          offset: l
        }
      });
      return f.filter(function(c) {
        return !(0, ps.default)(c.coordinate)
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
  up = new WeakMap,
  Bo = function(e, r) {
    if (typeof r != "function") return e;
    up.has(e) || up.set(e, new WeakMap);
    var n = up.get(e);
    if (n.has(r)) return n.get(r);
    var i = function() {
      e.apply(void 0, arguments), r.apply(void 0, arguments)
    };
    return n.set(r, i), i
  },
  v1 = function(e, r, n) {
    var i = e.scale,
      o = e.type,
      a = e.layout,
      u = e.axisType;
    if (i === "auto") return a === "radial" && u === "radiusAxis" ? {
      scale: gr(),
      realScaleType: "band"
    } : a === "radial" && u === "angleAxis" ? {
      scale: Jr(),
      realScaleType: "linear"
    } : o === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: br(),
      realScaleType: "point"
    } : o === "category" ? {
      scale: gr(),
      realScaleType: "band"
    } : {
      scale: Jr(),
      realScaleType: "linear"
    };
    if ((0, a1.default)(i)) {
      var s = "scale".concat((0, s1.default)(i));
      return {
        scale: (os[s] || br)(),
        realScaleType: os[s] ? s : "point"
      }
    }
    return (0, ni.default)(i) ? {
      scale: i
    } : {
      scale: br(),
      realScaleType: "point"
    }
  },
  n1 = 1e-4,
  g1 = function(e) {
    var r = e.domain();
    if (!(!r || r.length <= 2)) {
      var n = r.length,
        i = e.range(),
        o = Math.min(i[0], i[1]) - n1,
        a = Math.max(i[0], i[1]) + n1,
        u = e(r[0]),
        s = e(r[n - 1]);
      (u < o || u > a || s < o || s > a) && e.domain([r[0], r[n - 1]])
    }
  },
  b1 = function(e, r) {
    if (!e) return null;
    for (var n = 0, i = e.length; n < i; n++)
      if (e[n].item === r) return e[n].position;
    return null
  },
  x1 = function(e, r) {
    if (!r || r.length !== 2 || !X(r[0]) || !X(r[1])) return e;
    var n = Math.min(r[0], r[1]),
      i = Math.max(r[0], r[1]),
      o = [e[0], e[1]];
    return (!X(e[0]) || e[0] < n) && (o[0] = n), (!X(e[1]) || e[1] > i) && (o[1] = i), o[0] > i && (o[0] = i), o[1] < n && (o[1] = n), o
  },
  XW = function(e) {
    var r = e.length;
    if (!(r <= 0))
      for (var n = 0, i = e[0].length; n < i; ++n)
        for (var o = 0, a = 0, u = 0; u < r; ++u) {
          var s = (0, ps.default)(e[u][n][1]) ? e[u][n][0] : e[u][n][1];
          s >= 0 ? (e[u][n][0] = o, e[u][n][1] = o + s, o = e[u][n][1]) : (e[u][n][0] = a, e[u][n][1] = a + s, a = e[u][n][1])
        }
  },
  YW = function(e) {
    var r = e.length;
    if (!(r <= 0))
      for (var n = 0, i = e[0].length; n < i; ++n)
        for (var o = 0, a = 0; a < r; ++a) {
          var u = (0, ps.default)(e[a][n][1]) ? e[a][n][0] : e[a][n][1];
          u >= 0 ? (e[a][n][0] = o, e[a][n][1] = o + u, o = e[a][n][1]) : (e[a][n][0] = 0, e[a][n][1] = 0)
        }
  },
  ZW = {
    sign: XW,
    expand: mc,
    none: _e,
    silhouette: hc,
    wiggle: yc,
    positive: YW
  },
  JW = function(e, r, n) {
    var i = r.map(function(u) {
        return u.props.dataKey
      }),
      o = ZW[n],
      a = dc().keys(i).value(function(u, s) {
        return +Ut(u, s, 0)
      }).order(En).offset(o);
    return a(e)
  },
  w1 = function(e, r, n, i, o, a) {
    if (!e) return null;
    var u = a ? r.reverse() : r,
      s = {},
      l = u.reduce(function(c, p) {
        var d, y = (d = p.type) !== null && d !== void 0 && d.defaultProps ? Mt(Mt({}, p.type.defaultProps), p.props) : p.props,
          m = y.stackId,
          v = y.hide;
        if (v) return c;
        var x = y[n],
          w = c[x] || {
            hasStack: !1,
            stackGroups: {}
          };
        if (Tt(m)) {
          var S = w.stackGroups[m] || {
            numericAxisId: n,
            cateAxisId: i,
            items: []
          };
          S.items.push(p), w.hasStack = !0, w.stackGroups[m] = S
        } else w.stackGroups[Ge("_stackId_")] = {
          numericAxisId: n,
          cateAxisId: i,
          items: [p]
        };
        return Mt(Mt({}, c), {}, ri({}, x, w))
      }, s),
      f = {};
    return Object.keys(l).reduce(function(c, p) {
      var d = l[p];
      if (d.hasStack) {
        var y = {};
        d.stackGroups = Object.keys(d.stackGroups).reduce(function(m, v) {
          var x = d.stackGroups[v];
          return Mt(Mt({}, m), {}, ri({}, v, {
            numericAxisId: n,
            cateAxisId: i,
            items: x.items,
            stackedData: JW(e, x.items, o)
          }))
        }, y)
      }
      return Mt(Mt({}, c), {}, ri({}, p, d))
    }, f)
  },
  O1 = function(e, r) {
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
      var f = np(l, o, u);
      return e.domain([(0, Lo.default)(f), (0, Ro.default)(f)]), {
        niceTicks: f
      }
    }
    if (o && i === "number") {
      var c = e.domain(),
        p = ip(c, o, u);
      return {
        niceTicks: p
      }
    }
    return null
  };

function dp(t) {
  var e = t.axis,
    r = t.ticks,
    n = t.bandSize,
    i = t.entry,
    o = t.index,
    a = t.dataKey;
  if (e.type === "category") {
    if (!e.allowDuplicatedCategory && e.dataKey && !(0, me.default)(i[e.dataKey])) {
      var u = bn(r, "value", i[e.dataKey]);
      if (u) return u.coordinate + n / 2
    }
    return r[o] ? r[o].coordinate + n / 2 : null
  }
  var s = Ut(i, (0, me.default)(a) ? e.dataKey : a);
  return (0, me.default)(s) ? null : e.scale(s)
}
var mp = function(e) {
    var r = e.axis,
      n = e.ticks,
      i = e.offset,
      o = e.bandSize,
      a = e.entry,
      u = e.index;
    if (r.type === "category") return n[u] ? n[u].coordinate + i : null;
    var s = Ut(a, r.dataKey, r.domain[u]);
    return (0, me.default)(s) ? null : r.scale(s) - o / 2 + i
  },
  S1 = function(e) {
    var r = e.numericAxis,
      n = r.scale.domain();
    if (r.type === "number") {
      var i = Math.min(n[0], n[1]),
        o = Math.max(n[0], n[1]);
      return i <= 0 && o >= 0 ? 0 : o < 0 ? o : i
    }
    return n[0]
  },
  A1 = function(e, r) {
    var n, i = (n = e.type) !== null && n !== void 0 && n.defaultProps ? Mt(Mt({}, e.type.defaultProps), e.props) : e.props,
      o = i.stackId;
    if (Tt(o)) {
      var a = r[o];
      if (a) {
        var u = a.items.indexOf(e);
        return u >= 0 ? a.stackedData[u] : null
      }
    }
    return null
  },
  QW = function(e) {
    return e.reduce(function(r, n) {
      return [(0, Lo.default)(n.concat([r[0]]).filter(X)), (0, Ro.default)(n.concat([r[1]]).filter(X))]
    }, [1 / 0, -1 / 0])
  },
  hp = function(e, r, n) {
    return Object.keys(e).reduce(function(i, o) {
      var a = e[o],
        u = a.stackedData,
        s = u.reduce(function(l, f) {
          var c = QW(f.slice(r, n + 1));
          return [Math.min(l[0], c[0]), Math.max(l[1], c[1])]
        }, [1 / 0, -1 / 0]);
      return [Math.min(s[0], i[0]), Math.max(s[1], i[1])]
    }, [1 / 0, -1 / 0]).map(function(i) {
      return i === 1 / 0 || i === -1 / 0 ? 0 : i
    })
  },
  i1 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  o1 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  ds = function(e, r, n) {
    if ((0, ni.default)(e)) return e(r, n);
    if (!Array.isArray(e)) return r;
    var i = [];
    if (X(e[0])) i[0] = n ? e[0] : Math.min(e[0], r[0]);
    else if (i1.test(e[0])) {
      var o = +i1.exec(e[0])[1];
      i[0] = r[0] - o
    } else(0, ni.default)(e[0]) ? i[0] = e[0](r[0]) : i[0] = r[0];
    if (X(e[1])) i[1] = n ? e[1] : Math.max(e[1], r[1]);
    else if (o1.test(e[1])) {
      var a = +o1.exec(e[1])[1];
      i[1] = r[1] + a
    } else(0, ni.default)(e[1]) ? i[1] = e[1](r[1]) : i[1] = r[1];
    return i
  },
  oi = function(e, r, n) {
    if (e && e.scale && e.scale.bandwidth) {
      var i = e.scale.bandwidth();
      if (!n || i > 0) return i
    }
    if (e && r && r.length >= 2) {
      for (var o = (0, c1.default)(r, function(c) {
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
  yp = function(e, r, n) {
    return !e || !e.length || (0, l1.default)(e, (0, lp.default)(n, "type.defaultProps.domain")) ? r : e
  },
  ms = function(e, r) {
    var n = e.type.defaultProps ? Mt(Mt({}, e.type.defaultProps), e.props) : e.props,
      i = n.dataKey,
      o = n.name,
      a = n.unit,
      u = n.formatter,
      s = n.tooltipType,
      l = n.chartType,
      f = n.hide;
    return Mt(Mt({}, at(e, !1)), {}, {
      dataKey: i,
      unit: a,
      formatter: u,
      name: o || i,
      color: Do(e),
      value: Ut(r, i),
      type: s,
      payload: r,
      chartType: l,
      hide: f
    })
  };

function qo(t) {
  "@babel/helpers - typeof";
  return qo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, qo(t)
}

function _1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function P1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? _1(Object(r), !0).forEach(function(n) {
      tz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : _1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function tz(t, e, r) {
  return e = ez(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function ez(t) {
  var e = rz(t, "string");
  return qo(e) == "symbol" ? e : e + ""
}

function rz(t, e) {
  if (qo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (qo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Wo = Math.PI / 180;
var oz = function(e) {
    return e * 180 / Math.PI
  },
  Ct = function(e, r, n, i) {
    return {
      x: e + Math.cos(-Wo * i) * n,
      y: r + Math.sin(-Wo * i) * n
    }
  };
var az = function(e, r) {
    var n = e.x,
      i = e.y,
      o = r.x,
      a = r.y;
    return Math.sqrt(Math.pow(n - o, 2) + Math.pow(i - a, 2))
  },
  uz = function(e, r) {
    var n = e.x,
      i = e.y,
      o = r.cx,
      a = r.cy,
      u = az({
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
      angle: oz(l),
      angleInRadian: l
    }
  },
  sz = function(e) {
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
  lz = function(e, r) {
    var n = r.startAngle,
      i = r.endAngle,
      o = Math.floor(n / 360),
      a = Math.floor(i / 360),
      u = Math.min(o, a);
    return e + u * 360
  },
  vp = function(e, r) {
    var n = e.x,
      i = e.y,
      o = uz({
        x: n,
        y: i
      }, r),
      a = o.radius,
      u = o.angle,
      s = r.innerRadius,
      l = r.outerRadius;
    if (a < s || a > l) return !1;
    if (a === 0) return !0;
    var f = sz(r),
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
    return y ? P1(P1({}, r), {}, {
      radius: a,
      angle: lz(d, r)
    }) : null
  };

function zo(t) {
  "@babel/helpers - typeof";
  return zo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, zo(t)
}
var cz = ["offset"];

function fz(t) {
  return hz(t) || mz(t) || dz(t) || pz()
}

function pz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function dz(t, e) {
  if (t) {
    if (typeof t == "string") return gp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return gp(t, e)
  }
}

function mz(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function hz(t) {
  if (Array.isArray(t)) return gp(t)
}

function gp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function yz(t, e) {
  if (t == null) return {};
  var r = vz(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function vz(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function T1(t, e) {
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
    e % 2 ? T1(Object(r), !0).forEach(function(n) {
      gz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : T1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function gz(t, e, r) {
  return e = bz(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function bz(t) {
  var e = xz(t, "string");
  return zo(e) == "symbol" ? e : e + ""
}

function xz(t, e) {
  if (zo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (zo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Fo() {
  return Fo = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Fo.apply(this, arguments)
}
var Oz = function(e) {
    var r = e.value,
      n = e.formatter,
      i = (0, $o.default)(e.children) ? r : e.children;
    return (0, Uo.default)(n) ? n(i) : i
  },
  Sz = function(e, r) {
    var n = Kt(r - e),
      i = Math.min(Math.abs(r - e), 360);
    return n * i
  },
  Az = function(e, r, n) {
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
      x = Sz(d, y),
      w = x >= 0 ? 1 : -1,
      S, _;
    i === "insideStart" ? (S = d + w * a, _ = m) : i === "insideEnd" ? (S = y - w * a, _ = !m) : i === "end" && (S = y + w * a, _ = m), _ = x <= 0 ? _ : !_;
    var h = Ct(l, f, v, S),
      g = Ct(l, f, v, S + (_ ? 1 : -1) * 359),
      A = "M".concat(h.x, ",").concat(h.y, `
    A`).concat(v, ",").concat(v, ",0,1,").concat(_ ? 0 : 1, `,
    `).concat(g.x, ",").concat(g.y),
      C = (0, $o.default)(e.id) ? Ge("recharts-radial-line-") : e.id;
    return tr.createElement("text", Fo({}, n, {
      dominantBaseline: "central",
      className: ot("recharts-radial-bar-label", u)
    }), tr.createElement("defs", null, tr.createElement("path", {
      id: C,
      d: A
    })), tr.createElement("textPath", {
      xlinkHref: "#".concat(C)
    }, r))
  },
  _z = function(e) {
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
      var d = Ct(a, u, l + n, p),
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
      x = Ct(a, u, v, p),
      w = x.x,
      S = x.y;
    return {
      x: w,
      y: S,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }
  },
  Pz = function(e) {
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
      return qt(qt({}, S), n ? {
        height: Math.max(s - n.y, 0),
        width: l
      } : {})
    }
    if (o === "bottom") {
      var _ = {
        x: u + l / 2,
        y: s + f + p,
        textAnchor: "middle",
        verticalAnchor: y
      };
      return qt(qt({}, _), n ? {
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
      return qt(qt({}, h), n ? {
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
      return qt(qt({}, g), n ? {
        width: Math.max(n.x + n.width - g.x, 0),
        height: f
      } : {})
    }
    var A = n ? {
      width: l,
      height: f
    } : {};
    return o === "insideLeft" ? qt({
      x: u + v,
      y: s + f / 2,
      textAnchor: w,
      verticalAnchor: "middle"
    }, A) : o === "insideRight" ? qt({
      x: u + l - v,
      y: s + f / 2,
      textAnchor: x,
      verticalAnchor: "middle"
    }, A) : o === "insideTop" ? qt({
      x: u + l / 2,
      y: s + p,
      textAnchor: "middle",
      verticalAnchor: y
    }, A) : o === "insideBottom" ? qt({
      x: u + l / 2,
      y: s + f - p,
      textAnchor: "middle",
      verticalAnchor: d
    }, A) : o === "insideTopLeft" ? qt({
      x: u + v,
      y: s + p,
      textAnchor: w,
      verticalAnchor: y
    }, A) : o === "insideTopRight" ? qt({
      x: u + l - v,
      y: s + p,
      textAnchor: x,
      verticalAnchor: y
    }, A) : o === "insideBottomLeft" ? qt({
      x: u + v,
      y: s + f - p,
      textAnchor: w,
      verticalAnchor: d
    }, A) : o === "insideBottomRight" ? qt({
      x: u + l - v,
      y: s + f - p,
      textAnchor: x,
      verticalAnchor: d
    }, A) : (0, xp.default)(o) && (X(o.x) || or(o.x)) && (X(o.y) || or(o.y)) ? qt({
      x: u + ke(o.x, l),
      y: s + ke(o.y, f),
      textAnchor: "end",
      verticalAnchor: "end"
    }, A) : qt({
      x: u + l / 2,
      y: s + f / 2,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }, A)
  },
  Tz = function(e) {
    return "cx" in e && X(e.cx)
  };

function kt(t) {
  var e = t.offset,
    r = e === void 0 ? 5 : e,
    n = yz(t, cz),
    i = qt({
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
  if (!o || (0, $o.default)(u) && (0, $o.default)(s) && !hs(l) && !(0, Uo.default)(l)) return null;
  if (hs(l)) return bp(l, i);
  var d;
  if ((0, Uo.default)(l)) {
    if (d = wz(l, i), hs(d)) return d
  } else d = Oz(i);
  var y = Tz(o),
    m = at(i, !0);
  if (y && (a === "insideStart" || a === "insideEnd" || a === "end")) return Az(i, d, m);
  var v = y ? _z(i) : Pz(i);
  return tr.createElement($r, Fo({
    className: ot("recharts-label", c)
  }, m, v, {
    breakAll: p
  }), d)
}
kt.displayName = "Label";
var E1 = function(e) {
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
  Ez = function(e, r) {
    return e ? e === !0 ? tr.createElement(kt, {
      key: "label-implicit",
      viewBox: r
    }) : Tt(e) ? tr.createElement(kt, {
      key: "label-implicit",
      viewBox: r,
      value: e
    }) : hs(e) ? e.type === kt ? bp(e, {
      key: "label-implicit",
      viewBox: r
    }) : tr.createElement(kt, {
      key: "label-implicit",
      content: e,
      viewBox: r
    }) : (0, Uo.default)(e) ? tr.createElement(kt, {
      key: "label-implicit",
      content: e,
      viewBox: r
    }) : (0, xp.default)(e) ? tr.createElement(kt, Fo({
      viewBox: r
    }, e, {
      key: "label-implicit"
    })) : null : null
  },
  jz = function(e, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!e || !e.children && n && !e.label) return null;
    var i = e.children,
      o = E1(e),
      a = Lt(i, kt).map(function(s, l) {
        return bp(s, {
          viewBox: r || o,
          key: "label-".concat(l)
        })
      });
    if (!n) return a;
    var u = Ez(e.label, r || o);
    return [u].concat(fz(a))
  };
kt.parseViewBox = E1;
kt.renderCallByParent = jz;
var ys = Q(xe()),
  D1 = Q(be()),
  N1 = Q(It()),
  R1 = Q(M1());
import ai, {
  cloneElement as Fz
} from "./react-shim-eraudit.js";

function Ho(t) {
  "@babel/helpers - typeof";
  return Ho = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ho(t)
}
var Cz = ["valueAccessor"],
  Iz = ["data", "dataKey", "clockWise", "id", "textBreakAll"];

function kz(t) {
  return Lz(t) || Rz(t) || Nz(t) || Dz()
}

function Dz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function Nz(t, e) {
  if (t) {
    if (typeof t == "string") return wp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return wp(t, e)
  }
}

function Rz(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function Lz(t) {
  if (Array.isArray(t)) return wp(t)
}

function wp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
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

function C1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function I1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? C1(Object(r), !0).forEach(function(n) {
      Bz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : C1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Bz(t, e, r) {
  return e = qz(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function qz(t) {
  var e = Wz(t, "string");
  return Ho(e) == "symbol" ? e : e + ""
}

function Wz(t, e) {
  if (Ho(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ho(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function k1(t, e) {
  if (t == null) return {};
  var r = zz(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function zz(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var $z = function(e) {
  return Array.isArray(e.value) ? (0, R1.default)(e.value) : e.value
};

function er(t) {
  var e = t.valueAccessor,
    r = e === void 0 ? $z : e,
    n = k1(t, Cz),
    i = n.data,
    o = n.dataKey,
    a = n.clockWise,
    u = n.id,
    s = n.textBreakAll,
    l = k1(n, Iz);
  return !i || !i.length ? null : ai.createElement(bt, {
    className: "recharts-label-list"
  }, i.map(function(f, c) {
    var p = (0, ys.default)(o) ? r(f, c) : Ut(f && f.payload, o),
      d = (0, ys.default)(u) ? {} : {
        id: "".concat(u, "-").concat(c)
      };
    return ai.createElement(kt, vs({}, at(f, !0), l, d, {
      parentViewBox: f.parentViewBox,
      value: p,
      textBreakAll: s,
      viewBox: kt.parseViewBox((0, ys.default)(a) ? f : I1(I1({}, f), {}, {
        clockWise: a
      })),
      key: "label-".concat(c),
      index: c
    }))
  }))
}
er.displayName = "LabelList";

function Uz(t, e) {
  return t ? t === !0 ? ai.createElement(er, {
    key: "labelList-implicit",
    data: e
  }) : ai.isValidElement(t) || (0, N1.default)(t) ? ai.createElement(er, {
    key: "labelList-implicit",
    data: e,
    content: t
  }) : (0, D1.default)(t) ? ai.createElement(er, vs({
    data: e
  }, t, {
    key: "labelList-implicit"
  })) : null : null
}

function Hz(t, e) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && r && !t.label) return null;
  var n = t.children,
    i = Lt(n, er).map(function(a, u) {
      return Fz(a, {
        data: e,
        key: "labelList-".concat(u)
      })
    });
  if (!r) return i;
  var o = Uz(t.label, e);
  return [o].concat(kz(i))
}
er.renderCallByParent = Hz;
import Xz from "./react-shim-eraudit.js";

function Go(t) {
  "@babel/helpers - typeof";
  return Go = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Go(t)
}

function Op() {
  return Op = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Op.apply(this, arguments)
}

function L1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function B1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? L1(Object(r), !0).forEach(function(n) {
      Gz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : L1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Gz(t, e, r) {
  return e = Kz(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Kz(t) {
  var e = Vz(t, "string");
  return Go(e) == "symbol" ? e : e + ""
}

function Vz(t, e) {
  if (Go(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Go(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Yz = function(e, r) {
    var n = Kt(r - e),
      i = Math.min(Math.abs(r - e), 359.999);
    return n * i
  },
  gs = function(e) {
    var r = e.cx,
      n = e.cy,
      i = e.radius,
      o = e.angle,
      a = e.sign,
      u = e.isExternal,
      s = e.cornerRadius,
      l = e.cornerIsExternal,
      f = s * (u ? 1 : -1) + i,
      c = Math.asin(s / f) / Wo,
      p = l ? o : o + a * c,
      d = Ct(r, n, f, p),
      y = Ct(r, n, i, p),
      m = l ? o - a * c : o,
      v = Ct(r, n, f * Math.cos(c * Wo), m);
    return {
      center: d,
      circleTangency: y,
      lineTangency: v,
      theta: c
    }
  },
  q1 = function(e) {
    var r = e.cx,
      n = e.cy,
      i = e.innerRadius,
      o = e.outerRadius,
      a = e.startAngle,
      u = e.endAngle,
      s = Yz(a, u),
      l = a + s,
      f = Ct(r, n, o, a),
      c = Ct(r, n, o, l),
      p = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(o, ",").concat(o, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(a > l), `,
    `).concat(c.x, ",").concat(c.y, `
  `);
    if (i > 0) {
      var d = Ct(r, n, i, a),
        y = Ct(r, n, i, l);
      p += "L ".concat(y.x, ",").concat(y.y, `
            A `).concat(i, ",").concat(i, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(a <= l), `,
            `).concat(d.x, ",").concat(d.y, " Z")
    } else p += "L ".concat(r, ",").concat(n, " Z");
    return p
  },
  Zz = function(e) {
    var r = e.cx,
      n = e.cy,
      i = e.innerRadius,
      o = e.outerRadius,
      a = e.cornerRadius,
      u = e.forceCornerRadius,
      s = e.cornerIsExternal,
      l = e.startAngle,
      f = e.endAngle,
      c = Kt(f - l),
      p = gs({
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
      v = gs({
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
      _ = s ? Math.abs(l - f) : Math.abs(l - f) - m - S;
    if (_ < 0) return u ? "M ".concat(y.x, ",").concat(y.y, `
        a`).concat(a, ",").concat(a, ",0,0,1,").concat(a * 2, `,0
        a`).concat(a, ",").concat(a, ",0,0,1,").concat(-a * 2, `,0
      `) : q1({
      cx: r,
      cy: n,
      innerRadius: i,
      outerRadius: o,
      startAngle: l,
      endAngle: f
    });
    var h = "M ".concat(y.x, ",").concat(y.y, `
    A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(d.x, ",").concat(d.y, `
    A`).concat(o, ",").concat(o, ",0,").concat(+(_ > 180), ",").concat(+(c < 0), ",").concat(x.x, ",").concat(x.y, `
    A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(w.x, ",").concat(w.y, `
  `);
    if (i > 0) {
      var g = gs({
          cx: r,
          cy: n,
          radius: i,
          angle: l,
          sign: c,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s
        }),
        A = g.circleTangency,
        C = g.lineTangency,
        D = g.theta,
        q = gs({
          cx: r,
          cy: n,
          radius: i,
          angle: f,
          sign: -c,
          isExternal: !0,
          cornerRadius: a,
          cornerIsExternal: s
        }),
        W = q.circleTangency,
        L = q.lineTangency,
        H = q.theta,
        F = s ? Math.abs(l - f) : Math.abs(l - f) - D - H;
      if (F < 0 && a === 0) return "".concat(h, "L").concat(r, ",").concat(n, "Z");
      h += "L".concat(L.x, ",").concat(L.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(W.x, ",").concat(W.y, `
      A`).concat(i, ",").concat(i, ",0,").concat(+(F > 180), ",").concat(+(c > 0), ",").concat(A.x, ",").concat(A.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(C.x, ",").concat(C.y, "Z")
    } else h += "L".concat(r, ",").concat(n, "Z");
    return h
  },
  Jz = {
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
  bs = function(e) {
    var r = B1(B1({}, Jz), e),
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
    var d = ot("recharts-sector", p),
      y = a - o,
      m = ke(u, y, 0, !0),
      v;
    return m > 0 && Math.abs(f - c) < 360 ? v = Zz({
      cx: n,
      cy: i,
      innerRadius: o,
      outerRadius: a,
      cornerRadius: Math.min(m, y / 2),
      forceCornerRadius: s,
      cornerIsExternal: l,
      startAngle: f,
      endAngle: c
    }) : v = q1({
      cx: n,
      cy: i,
      innerRadius: o,
      outerRadius: a,
      startAngle: f,
      endAngle: c
    }), Xz.createElement("path", Op({}, at(r, !0), {
      className: d,
      d: v,
      role: "img"
    }))
  };
import * as $1 from "./react-shim-eraudit.js";
var U1 = Q(Xa()),
  H1 = Q(It());

function Xo(t) {
  "@babel/helpers - typeof";
  return Xo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Xo(t)
}

function Sp() {
  return Sp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Sp.apply(this, arguments)
}

function W1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function z1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? W1(Object(r), !0).forEach(function(n) {
      Qz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : W1(Object(r)).forEach(function(n) {
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
  return Xo(e) == "symbol" ? e : e + ""
}

function eF(t, e) {
  if (Xo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Xo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var F1 = {
    curveBasisClosed: nc,
    curveBasisOpen: ic,
    curveBasis: rc,
    curveBumpX: Gl,
    curveBumpY: Kl,
    curveLinearClosed: oc,
    curveLinear: vr,
    curveMonotoneX: uc,
    curveMonotoneY: sc,
    curveNatural: lc,
    curveStep: cc,
    curveStepAfter: pc,
    curveStepBefore: fc
  },
  xs = function(e) {
    return e.x === +e.x && e.y === +e.y
  },
  Ko = function(e) {
    return e.x
  },
  Vo = function(e) {
    return e.y
  },
  rF = function(e, r) {
    if ((0, H1.default)(e)) return e;
    var n = "curve".concat((0, U1.default)(e));
    return (n === "curveMonotone" || n === "curveBump") && r ? F1["".concat(n).concat(r === "vertical" ? "Y" : "X")] : F1[n] || vr
  },
  nF = function(e) {
    var r = e.type,
      n = r === void 0 ? "linear" : r,
      i = e.points,
      o = i === void 0 ? [] : i,
      a = e.baseLine,
      u = e.layout,
      s = e.connectNulls,
      l = s === void 0 ? !1 : s,
      f = rF(n, u),
      c = l ? o.filter(function(m) {
        return xs(m)
      }) : o,
      p;
    if (Array.isArray(a)) {
      var d = l ? a.filter(function(m) {
          return xs(m)
        }) : a,
        y = c.map(function(m, v) {
          return z1(z1({}, m), {}, {
            base: d[v]
          })
        });
      return u === "vertical" ? p = An().y(Vo).x1(Ko).x0(function(m) {
        return m.base.x
      }) : p = An().x(Ko).y1(Vo).y0(function(m) {
        return m.base.y
      }), p.defined(xs).curve(f), p(y)
    }
    return u === "vertical" && X(a) ? p = An().y(Vo).x1(Ko).x0(a) : X(a) ? p = An().x(Ko).y1(Vo).y0(a) : p = Hi().x(Ko).y(Vo), p.defined(xs).curve(f), p(c)
  },
  Yo = function(e) {
    var r = e.className,
      n = e.points,
      i = e.path,
      o = e.pathRef;
    if ((!n || !n.length) && !i) return null;
    var a = n && n.length ? nF(e) : i;
    return $1.createElement("path", Sp({}, at(e, !1), Nr(e), {
      className: ot("recharts-curve", r),
      d: a,
      ref: o
    }))
  };
import Es, {
  useEffect as U3,
  useRef as H3,
  useState as G3
} from "./react-shim-eraudit.js";
var wt = Q(Q1());
import k3, {
  PureComponent as D3,
  cloneElement as N3,
  Children as kp
} from "./react-shim-eraudit.js";
var {
  getOwnPropertyNames: aF,
  getOwnPropertySymbols: uF
} = Object, {
  hasOwnProperty: sF
} = Object.prototype;

function Ap(t, e) {
  return function(n, i, o) {
    return t(n, i, o) && e(n, i, o)
  }
}

function ws(t) {
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

function lF(t) {
  return t?.[Symbol.toStringTag]
}

function tO(t) {
  return aF(t).concat(uF(t))
}
var cF = Object.hasOwn || ((t, e) => sF.call(t, e));

function un(t, e) {
  return t === e || !t && !e && t !== t && e !== e
}
var fF = "__v",
  pF = "__o",
  dF = "_owner",
  {
    getOwnPropertyDescriptor: eO,
    keys: rO
  } = Object;

function mF(t, e) {
  return t.byteLength === e.byteLength && Os(new Uint8Array(t), new Uint8Array(e))
}

function hF(t, e, r) {
  let n = t.length;
  if (e.length !== n) return !1;
  for (; n-- > 0;)
    if (!r.equals(t[n], e[n], n, n, t, e, r)) return !1;
  return !0
}

function yF(t, e) {
  return t.byteLength === e.byteLength && Os(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), new Uint8Array(e.buffer, e.byteOffset, e.byteLength))
}

function vF(t, e) {
  return un(t.getTime(), e.getTime())
}

function gF(t, e) {
  return t.name === e.name && t.message === e.message && t.cause === e.cause && t.stack === e.stack
}

function bF(t, e) {
  return t === e
}

function nO(t, e, r) {
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
var xF = un;

function wF(t, e, r) {
  let n = rO(t),
    i = n.length;
  if (rO(e).length !== i) return !1;
  for (; i-- > 0;)
    if (!oO(t, e, r, n[i])) return !1;
  return !0
}

function Zo(t, e, r) {
  let n = tO(t),
    i = n.length;
  if (tO(e).length !== i) return !1;
  let o, a, u;
  for (; i-- > 0;)
    if (o = n[i], !oO(t, e, r, o) || (a = eO(t, o), u = eO(e, o), (a || u) && (!a || !u || a.configurable !== u.configurable || a.enumerable !== u.enumerable || a.writable !== u.writable))) return !1;
  return !0
}

function OF(t, e) {
  return un(t.valueOf(), e.valueOf())
}

function SF(t, e) {
  return t.source === e.source && t.flags === e.flags
}

function iO(t, e, r) {
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

function Os(t, e) {
  let r = t.byteLength;
  if (e.byteLength !== r || t.byteOffset !== e.byteOffset) return !1;
  for (; r-- > 0;)
    if (t[r] !== e[r]) return !1;
  return !0
}

function AF(t, e) {
  return t.hostname === e.hostname && t.pathname === e.pathname && t.protocol === e.protocol && t.port === e.port && t.hash === e.hash && t.username === e.username && t.password === e.password
}

function oO(t, e, r, n) {
  return (n === dF || n === pF || n === fF) && (t.$$typeof || e.$$typeof) ? !0 : cF(e, n) && r.equals(t[n], e[n], n, n, t, e, r)
}
var _F = "[object ArrayBuffer]",
  PF = "[object Arguments]",
  TF = "[object Boolean]",
  EF = "[object DataView]",
  jF = "[object Date]",
  MF = "[object Error]",
  CF = "[object Map]",
  IF = "[object Number]",
  kF = "[object Object]",
  DF = "[object RegExp]",
  NF = "[object Set]",
  RF = "[object String]",
  LF = {
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
  BF = "[object URL]",
  qF = Object.prototype.toString;

function WF({
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
    let _ = v.constructor;
    if (_ !== x.constructor) return !1;
    if (_ === Object) return s(v, x, w);
    if (Array.isArray(v)) return e(v, x, w);
    if (_ === Date) return n(v, x, w);
    if (_ === RegExp) return f(v, x, w);
    if (_ === Map) return a(v, x, w);
    if (_ === Set) return c(v, x, w);
    let h = qF.call(v);
    if (h === jF) return n(v, x, w);
    if (h === DF) return f(v, x, w);
    if (h === CF) return a(v, x, w);
    if (h === NF) return c(v, x, w);
    if (h === kF) return typeof v.then != "function" && typeof x.then != "function" && s(v, x, w);
    if (h === BF) return d(v, x, w);
    if (h === MF) return i(v, x, w);
    if (h === PF) return s(v, x, w);
    if (LF[h]) return p(v, x, w);
    if (h === _F) return t(v, x, w);
    if (h === EF) return r(v, x, w);
    if (h === TF || h === IF || h === RF) return l(v, x, w);
    if (y) {
      let g = y[h];
      if (!g) {
        let A = lF(v);
        A && (g = y[A])
      }
      if (g) return g(v, x, w)
    }
    return !1
  }
}

function zF({
  circular: t,
  createCustomConfig: e,
  strict: r
}) {
  let n = {
    areArrayBuffersEqual: mF,
    areArraysEqual: r ? Zo : hF,
    areDataViewsEqual: yF,
    areDatesEqual: vF,
    areErrorsEqual: gF,
    areFunctionsEqual: bF,
    areMapsEqual: r ? Ap(nO, Zo) : nO,
    areNumbersEqual: xF,
    areObjectsEqual: r ? Zo : wF,
    arePrimitiveWrappersEqual: OF,
    areRegExpsEqual: SF,
    areSetsEqual: r ? Ap(iO, Zo) : iO,
    areTypedArraysEqual: r ? Ap(Os, Zo) : Os,
    areUrlsEqual: AF,
    unknownTagComparators: void 0
  };
  if (e && (n = Object.assign({}, n, e(n))), t) {
    let i = ws(n.areArraysEqual),
      o = ws(n.areMapsEqual),
      a = ws(n.areObjectsEqual),
      u = ws(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: i,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: u
    })
  }
  return n
}

function FF(t) {
  return function(e, r, n, i, o, a, u) {
    return t(e, r, u)
  }
}

function $F({
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
var aO = Pr(),
  Stt = Pr({
    strict: !0
  }),
  Att = Pr({
    circular: !0
  }),
  _tt = Pr({
    circular: !0,
    strict: !0
  }),
  Ptt = Pr({
    createInternalComparator: () => un
  }),
  Ttt = Pr({
    strict: !0,
    createInternalComparator: () => un
  }),
  Ett = Pr({
    circular: !0,
    createInternalComparator: () => un
  }),
  jtt = Pr({
    circular: !0,
    createInternalComparator: () => un,
    strict: !0
  });

function Pr(t = {}) {
  let {
    circular: e = !1,
    createInternalComparator: r,
    createState: n,
    strict: i = !1
  } = t, o = zF(t), a = WF(o), u = r ? r(a) : FF(a);
  return $F({
    circular: e,
    comparator: a,
    createState: n,
    equals: u,
    strict: i
  })
}

function UF(t) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(t)
}

function Ss(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    r = -1,
    n = function i(o) {
      r < 0 && (r = o), o - r > e ? (t(o), r = -1) : UF(i)
    };
  requestAnimationFrame(n)
}

function _p(t) {
  "@babel/helpers - typeof";
  return _p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, _p(t)
}

function HF(t) {
  return XF(t) || VF(t) || KF(t) || GF()
}

function GF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function KF(t, e) {
  if (t) {
    if (typeof t == "string") return uO(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return uO(t, e)
  }
}

function uO(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function VF(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function XF(t) {
  if (Array.isArray(t)) return t
}

function Pp() {
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
            u = HF(a),
            s = u[0],
            l = u.slice(1);
          if (typeof s == "number") {
            Ss(i.bind(null, l), s);
            return
          }
          i(s), Ss(i.bind(null, l));
          return
        }
        _p(o) === "object" && (t = o, e(t)), typeof o == "function" && o()
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

function Jo(t) {
  "@babel/helpers - typeof";
  return Jo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Jo(t)
}

function sO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function lO(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? sO(Object(r), !0).forEach(function(n) {
      cO(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : sO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function cO(t, e, r) {
  return e = YF(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function YF(t) {
  var e = ZF(t, "string");
  return Jo(e) === "symbol" ? e : String(e)
}

function ZF(t, e) {
  if (Jo(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Jo(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var fO = function(e, r) {
    return [Object.keys(e), Object.keys(r)].reduce(function(n, i) {
      return n.filter(function(o) {
        return i.includes(o)
      })
    })
  },
  pO = function(e) {
    return e
  },
  JF = function(e) {
    return e.replace(/([A-Z])/g, function(r) {
      return "-".concat(r.toLowerCase())
    })
  };
var ui = function(e, r) {
    return Object.keys(r).reduce(function(n, i) {
      return lO(lO({}, n), {}, cO({}, i, e(i, r[i])))
    }, {})
  },
  Tp = function(e, r, n) {
    return e.map(function(i) {
      return "".concat(JF(i), " ").concat(r, "ms ").concat(n)
    }).join(",")
  },
  QF = !1,
  Qo = function(e, r, n, i, o, a, u, s) {
    if (QF && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !e))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var l = [n, i, o, a, u, s],
          f = 0;
        console.warn(r.replace(/%s/g, function() {
          return l[f++]
        }))
      }
  };

function t3(t, e) {
  return n3(t) || r3(t, e) || hO(t, e) || e3()
}

function e3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function r3(t, e) {
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

function n3(t) {
  if (Array.isArray(t)) return t
}

function i3(t) {
  return u3(t) || a3(t) || hO(t) || o3()
}

function o3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function hO(t, e) {
  if (t) {
    if (typeof t == "string") return Ep(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ep(t, e)
  }
}

function a3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function u3(t) {
  if (Array.isArray(t)) return Ep(t)
}

function Ep(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var As = 1e-4,
  yO = function(e, r) {
    return [0, 3 * e, 3 * r - 6 * e, 3 * e - 3 * r + 1]
  },
  vO = function(e, r) {
    return e.map(function(n, i) {
      return n * Math.pow(r, i)
    }).reduce(function(n, i) {
      return n + i
    })
  },
  dO = function(e, r) {
    return function(n) {
      var i = yO(e, r);
      return vO(i, n)
    }
  },
  s3 = function(e, r) {
    return function(n) {
      var i = yO(e, r),
        o = [].concat(i3(i.map(function(a, u) {
          return a * u
        }).slice(1)), [0]);
      return vO(o, n)
    }
  },
  mO = function() {
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
            f = t3(l, 4);
          i = f[0], o = f[1], a = f[2], u = f[3]
        } else Qo(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r)
      }
    }
    Qo([i, a, o, u].every(function(v) {
      return typeof v == "number" && v >= 0 && v <= 1
    }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
    var c = dO(i, a),
      p = dO(o, u),
      d = s3(i, a),
      y = function(x) {
        return x > 1 ? 1 : x < 0 ? 0 : x
      },
      m = function(x) {
        for (var w = x > 1 ? 1 : x, S = w, _ = 0; _ < 8; ++_) {
          var h = c(S) - w,
            g = d(S);
          if (Math.abs(h - w) < As || g < As) return p(S);
          S = y(S - h / g)
        }
        return p(S)
      };
    return m.isStepper = !1, m
  },
  l3 = function() {
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
        return Math.abs(v - c) < As && Math.abs(m) < As ? [c, 0] : [v, m]
      };
    return s.isStepper = !0, s.dt = u, s
  },
  gO = function() {
    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
    var i = r[0];
    if (typeof i == "string") switch (i) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return mO(i);
      case "spring":
        return l3();
      default:
        if (i.split("(")[0] === "cubic-bezier") return mO(i);
        Qo(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r)
    }
    return typeof i == "function" ? i : (Qo(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null)
  };

function ta(t) {
  "@babel/helpers - typeof";
  return ta = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ta(t)
}

function bO(t) {
  return p3(t) || f3(t) || wO(t) || c3()
}

function c3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function f3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function p3(t) {
  if (Array.isArray(t)) return Mp(t)
}

function xO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ht(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? xO(Object(r), !0).forEach(function(n) {
      jp(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : xO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function jp(t, e, r) {
  return e = d3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function d3(t) {
  var e = m3(t, "string");
  return ta(e) === "symbol" ? e : String(e)
}

function m3(t, e) {
  if (ta(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ta(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function h3(t, e) {
  return g3(t) || v3(t, e) || wO(t, e) || y3()
}

function y3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function wO(t, e) {
  if (t) {
    if (typeof t == "string") return Mp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Mp(t, e)
  }
}

function Mp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function v3(t, e) {
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

function g3(t) {
  if (Array.isArray(t)) return t
}
var _s = function(e, r, n) {
    return e + (r - e) * n
  },
  Cp = function(e) {
    var r = e.from,
      n = e.to;
    return r !== n
  },
  b3 = function t(e, r, n) {
    var i = ui(function(o, a) {
      if (Cp(a)) {
        var u = e(a.from, a.to, a.velocity),
          s = h3(u, 2),
          l = s[0],
          f = s[1];
        return Ht(Ht({}, a), {}, {
          from: l,
          velocity: f
        })
      }
      return a
    }, r);
    return n < 1 ? ui(function(o, a) {
      return Cp(a) ? Ht(Ht({}, a), {}, {
        velocity: _s(a.velocity, i[o].velocity, n),
        from: _s(a.from, i[o].from, n)
      }) : a
    }, r) : t(e, i, n - 1)
  },
  OO = function(t, e, r, n, i) {
    var o = fO(t, e),
      a = o.reduce(function(v, x) {
        return Ht(Ht({}, v), {}, jp({}, x, [t[x], e[x]]))
      }, {}),
      u = o.reduce(function(v, x) {
        return Ht(Ht({}, v), {}, jp({}, x, {
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
        return ui(function(x, w) {
          return w.from
        }, u)
      },
      d = function() {
        return !Object.values(u).filter(Cp).length
      },
      y = function(x) {
        l || (l = x);
        var w = x - l,
          S = w / r.dt;
        u = b3(r, u, S), i(Ht(Ht(Ht({}, t), e), p(u))), l = x, d() || (s = requestAnimationFrame(c))
      },
      m = function(x) {
        f || (f = x);
        var w = (x - f) / n,
          S = ui(function(h, g) {
            return _s.apply(void 0, bO(g).concat([r(w)]))
          }, a);
        if (i(Ht(Ht(Ht({}, t), e), S)), w < 1) s = requestAnimationFrame(c);
        else {
          var _ = ui(function(h, g) {
            return _s.apply(void 0, bO(g).concat([r(1)]))
          }, a);
          i(Ht(Ht(Ht({}, t), e), _))
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

function si(t) {
  "@babel/helpers - typeof";
  return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, si(t)
}
var x3 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];

function w3(t, e) {
  if (t == null) return {};
  var r = O3(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function O3(t, e) {
  if (t == null) return {};
  var r = {},
    n = Object.keys(t),
    i, o;
  for (o = 0; o < n.length; o++) i = n[o], !(e.indexOf(i) >= 0) && (r[i] = t[i]);
  return r
}

function Ip(t) {
  return P3(t) || _3(t) || A3(t) || S3()
}

function S3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function A3(t, e) {
  if (t) {
    if (typeof t == "string") return Dp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Dp(t, e)
  }
}

function _3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function P3(t) {
  if (Array.isArray(t)) return Dp(t)
}

function Dp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function SO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Le(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? SO(Object(r), !0).forEach(function(n) {
      ea(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : SO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ea(t, e, r) {
  return e = _O(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function T3(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function AO(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, _O(n.key), n)
  }
}

function E3(t, e, r) {
  return e && AO(t.prototype, e), r && AO(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function _O(t) {
  var e = j3(t, "string");
  return si(e) === "symbol" ? e : String(e)
}

function j3(t, e) {
  if (si(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (si(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function M3(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Np(t, e)
}

function Np(t, e) {
  return Np = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Np(t, e)
}

function C3(t) {
  var e = I3();
  return function() {
    var n = Ps(t),
      i;
    if (e) {
      var o = Ps(this).constructor;
      i = Reflect.construct(n, arguments, o)
    } else i = n.apply(this, arguments);
    return Rp(this, i)
  }
}

function Rp(t, e) {
  if (e && (si(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Lp(t)
}

function Lp(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function I3() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
  } catch {
    return !1
  }
}

function Ps(t) {
  return Ps = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ps(t)
}
var Ts = function(t) {
  M3(r, t);
  var e = C3(r);

  function r(n, i) {
    var o;
    T3(this, r), o = e.call(this, n, i);
    var a = o.props,
      u = a.isActive,
      s = a.attributeName,
      l = a.from,
      f = a.to,
      c = a.steps,
      p = a.children,
      d = a.duration;
    if (o.handleStyleChange = o.handleStyleChange.bind(Lp(o)), o.changeStyle = o.changeStyle.bind(Lp(o)), !u || d <= 0) return o.state = {
      style: {}
    }, typeof p == "function" && (o.state = {
      style: f
    }), Rp(o);
    if (c && c.length) o.state = {
      style: c[0].style
    };
    else if (l) {
      if (typeof p == "function") return o.state = {
        style: l
      }, Rp(o);
      o.state = {
        style: s ? ea({}, s, l) : l
      }
    } else o.state = {
      style: {}
    };
    return o
  }
  return E3(r, [{
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
            style: s ? ea({}, s, f) : f
          };
          this.state && p && (s && p[s] !== f || !s && p !== f) && this.setState(d);
          return
        }
        if (!(aO(i.to, f) && i.canBegin && i.isActive)) {
          var y = !i.canBegin || !i.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var m = y || l ? c : i.to;
          if (this.state && p) {
            var v = {
              style: s ? ea({}, s, m) : m
            };
            (s && p[s] !== m || !s && p !== m) && this.setState(v)
          }
          this.runAnimation(Le(Le({}, this.props), {}, {
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
        d = OO(a, u, gO(l), s, this.changeStyle),
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
            _ = S === void 0 ? "ease" : S,
            h = v.style,
            g = v.properties,
            A = v.onAnimationEnd,
            C = x > 0 ? a[x - 1] : v,
            D = g || Object.keys(h);
          if (typeof _ == "function" || _ === "spring") return [].concat(Ip(m), [o.runJSAnimation.bind(o, {
            from: C.style,
            to: h,
            duration: w,
            easing: _
          }), w]);
          var q = Tp(D, w, _),
            W = Le(Le(Le({}, C.style), h), {}, {
              transition: q
            });
          return [].concat(Ip(m), [W, w, A]).filter(pO)
        };
      return this.manager.start([s].concat(Ip(a.reduce(d, [f, Math.max(p, u)])), [i.onAnimationEnd]))
    }
  }, {
    key: "runAnimation",
    value: function(i) {
      this.manager || (this.manager = Pp());
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
      var m = u ? ea({}, u, s) : s,
        v = Tp(Object.keys(m), a, l);
      y.start([f, o, Le(Le({}, m), {}, {
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
        w = w3(i, x3),
        S = kp.count(o),
        _ = this.state.style;
      if (typeof o == "function") return o(_);
      if (!f || S === 0 || u <= 0) return o;
      var h = function(A) {
        var C = A.props,
          D = C.style,
          q = D === void 0 ? {} : D,
          W = C.className,
          L = N3(A, Le(Le({}, w), {}, {
            style: Le(Le({}, q), _),
            className: W
          }));
        return L
      };
      return S === 1 ? h(kp.only(o)) : k3.createElement("div", null, kp.map(o, function(g) {
        return h(g)
      }))
    }
  }]), r
}(D3);
Ts.displayName = "Animate";
Ts.defaultProps = {
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
Ts.propTypes = {
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
var PO = Ts;
var rr = PO;

function ra(t) {
  "@babel/helpers - typeof";
  return ra = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ra(t)
}

function js() {
  return js = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, js.apply(this, arguments)
}

function R3(t, e) {
  return W3(t) || q3(t, e) || B3(t, e) || L3()
}

function L3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function B3(t, e) {
  if (t) {
    if (typeof t == "string") return TO(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return TO(t, e)
  }
}

function TO(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function q3(t, e) {
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

function W3(t) {
  if (Array.isArray(t)) return t
}

function EO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function jO(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? EO(Object(r), !0).forEach(function(n) {
      z3(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : EO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function z3(t, e, r) {
  return e = F3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function F3(t) {
  var e = $3(t, "string");
  return ra(e) == "symbol" ? e : e + ""
}

function $3(t, e) {
  if (ra(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ra(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var MO = function(e, r, n, i, o) {
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
  CO = function(e, r) {
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
  K3 = {
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
  li = function(e) {
    var r = jO(jO({}, K3), e),
      n = H3(),
      i = G3(-1),
      o = R3(i, 2),
      a = o[0],
      u = o[1];
    U3(function() {
      if (n.current && n.current.getTotalLength) try {
        var _ = n.current.getTotalLength();
        _ && u(_)
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
    var S = ot("recharts-rectangle", d);
    return w ? Es.createElement(rr, {
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
    }, function(_) {
      var h = _.width,
        g = _.height,
        A = _.x,
        C = _.y;
      return Es.createElement(rr, {
        canBegin: a > 0,
        from: "0px ".concat(a === -1 ? 1 : a, "px"),
        to: "".concat(a, "px 0px"),
        attributeName: "strokeDasharray",
        begin: v,
        duration: m,
        isActive: x,
        easing: y
      }, Es.createElement("path", js({}, at(r, !0), {
        className: S,
        d: MO(A, C, h, g, p),
        ref: n
      })))
    }) : Es.createElement("path", js({}, at(r, !0), {
      className: S,
      d: MO(s, l, f, c, p)
    }))
  };
import * as IO from "./react-shim-eraudit.js";

function Bp() {
  return Bp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Bp.apply(this, arguments)
}
var ci = function(e) {
  var r = e.cx,
    n = e.cy,
    i = e.r,
    o = e.className,
    a = ot("recharts-dot", o);
  return r === +r && n === +n && i === +i ? IO.createElement("circle", Bp({}, at(e, !1), Nr(e), {
    className: a,
    cx: r,
    cy: n,
    r: i
  })) : null
};
import e8 from "./react-shim-eraudit.js";

function na(t) {
  "@babel/helpers - typeof";
  return na = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, na(t)
}
var V3 = ["x", "y", "top", "left", "width", "height", "className"];

function qp() {
  return qp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, qp.apply(this, arguments)
}

function kO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function X3(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? kO(Object(r), !0).forEach(function(n) {
      Y3(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : kO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Y3(t, e, r) {
  return e = Z3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Z3(t) {
  var e = J3(t, "string");
  return na(e) == "symbol" ? e : e + ""
}

function J3(t, e) {
  if (na(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (na(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Q3(t, e) {
  if (t == null) return {};
  var r = t8(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function t8(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var r8 = function(e, r, n, i, o, a) {
    return "M".concat(e, ",").concat(o, "v").concat(i, "M").concat(a, ",").concat(r, "h").concat(n)
  },
  DO = function(e) {
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
      m = Q3(e, V3),
      v = X3({
        x: n,
        y: o,
        top: u,
        left: l,
        width: c,
        height: d
      }, m);
    return !X(n) || !X(o) || !X(c) || !X(d) || !X(u) || !X(l) ? null : e8.createElement("path", qp({}, at(v, !0), {
      className: ot("recharts-cross", y),
      d: r8(n, o, c, d, u, l)
    }))
  };
var YO = Q(It()),
  ZO = Q(qO()),
  JO = Q(zO()),
  QO = Q(Eo());
import sn, {
  isValidElement as XO,
  cloneElement as R8
} from "./react-shim-eraudit.js";
import ia, {
  useEffect as P8,
  useRef as T8,
  useState as E8
} from "./react-shim-eraudit.js";

function oa(t) {
  "@babel/helpers - typeof";
  return oa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, oa(t)
}

function Ms() {
  return Ms = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ms.apply(this, arguments)
}

function g8(t, e) {
  return O8(t) || w8(t, e) || x8(t, e) || b8()
}

function b8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function x8(t, e) {
  if (t) {
    if (typeof t == "string") return FO(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return FO(t, e)
  }
}

function FO(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function w8(t, e) {
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

function O8(t) {
  if (Array.isArray(t)) return t
}

function $O(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function UO(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? $O(Object(r), !0).forEach(function(n) {
      S8(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : $O(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function S8(t, e, r) {
  return e = A8(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function A8(t) {
  var e = _8(t, "string");
  return oa(e) == "symbol" ? e : e + ""
}

function _8(t, e) {
  if (oa(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (oa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var HO = function(e, r, n, i, o) {
    var a = n - i,
      u;
    return u = "M ".concat(e, ",").concat(r), u += "L ".concat(e + n, ",").concat(r), u += "L ".concat(e + n - a / 2, ",").concat(r + o), u += "L ".concat(e + n - a / 2 - i, ",").concat(r + o), u += "L ".concat(e, ",").concat(r, " Z"), u
  },
  j8 = {
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
  GO = function(e) {
    var r = UO(UO({}, j8), e),
      n = T8(),
      i = E8(-1),
      o = g8(i, 2),
      a = o[0],
      u = o[1];
    P8(function() {
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
    var w = ot("recharts-trapezoid", d);
    return x ? ia.createElement(rr, {
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
      var _ = S.upperWidth,
        h = S.lowerWidth,
        g = S.height,
        A = S.x,
        C = S.y;
      return ia.createElement(rr, {
        canBegin: a > 0,
        from: "0px ".concat(a === -1 ? 1 : a, "px"),
        to: "".concat(a, "px 0px"),
        attributeName: "strokeDasharray",
        begin: v,
        duration: m,
        easing: y
      }, ia.createElement("path", Ms({}, at(r, !0), {
        className: w,
        d: HO(A, C, _, h, g),
        ref: n
      })))
    }) : ia.createElement("g", null, ia.createElement("path", Ms({}, at(r, !0), {
      className: w,
      d: HO(s, l, f, c, p)
    })))
  };
var M8 = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];

function aa(t) {
  "@babel/helpers - typeof";
  return aa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, aa(t)
}

function C8(t, e) {
  if (t == null) return {};
  var r = I8(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function I8(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function KO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Cs(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? KO(Object(r), !0).forEach(function(n) {
      k8(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : KO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function k8(t, e, r) {
  return e = D8(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function D8(t) {
  var e = N8(t, "string");
  return aa(e) == "symbol" ? e : e + ""
}

function N8(t, e) {
  if (aa(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (aa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function L8(t, e) {
  return Cs(Cs({}, e), t)
}

function B8(t, e) {
  return t === "symbols"
}

function VO(t) {
  var e = t.shapeType,
    r = t.elementProps;
  switch (e) {
    case "rectangle":
      return sn.createElement(li, r);
    case "trapezoid":
      return sn.createElement(GO, r);
    case "sector":
      return sn.createElement(bs, r);
    case "symbols":
      if (B8(e, r)) return sn.createElement(Ki, r);
      break;
    default:
      return null
  }
}

function q8(t) {
  return XO(t) ? t.props : t
}

function tS(t) {
  var e = t.option,
    r = t.shapeType,
    n = t.propTransformer,
    i = n === void 0 ? L8 : n,
    o = t.activeClassName,
    a = o === void 0 ? "recharts-active-shape" : o,
    u = t.isActive,
    s = C8(t, M8),
    l;
  if (XO(e)) l = R8(e, Cs(Cs({}, s), q8(e)));
  else if ((0, YO.default)(e)) l = e(s);
  else if ((0, ZO.default)(e) && !(0, JO.default)(e)) {
    var f = i(e, s);
    l = sn.createElement(VO, {
      shapeType: r,
      elementProps: f
    })
  } else {
    var c = s;
    l = sn.createElement(VO, {
      shapeType: r,
      elementProps: c
    })
  }
  return u ? sn.createElement(bt, {
    className: a
  }, l) : l
}

function ua(t, e) {
  return e != null && "trapezoids" in t.props
}

function sa(t, e) {
  return e != null && "sectors" in t.props
}

function fi(t, e) {
  return e != null && "points" in t.props
}

function W8(t, e) {
  var r, n, i = t.x === (e == null || (r = e.labelViewBox) === null || r === void 0 ? void 0 : r.x) || t.x === e.x,
    o = t.y === (e == null || (n = e.labelViewBox) === null || n === void 0 ? void 0 : n.y) || t.y === e.y;
  return i && o
}

function z8(t, e) {
  var r = t.endAngle === e.endAngle,
    n = t.startAngle === e.startAngle;
  return r && n
}

function F8(t, e) {
  var r = t.x === e.x,
    n = t.y === e.y,
    i = t.z === e.z;
  return r && n && i
}

function $8(t, e) {
  var r;
  return ua(t, e) ? r = W8 : sa(t, e) ? r = z8 : fi(t, e) && (r = F8), r
}

function U8(t, e) {
  var r;
  return ua(t, e) ? r = "trapezoids" : sa(t, e) ? r = "sectors" : fi(t, e) && (r = "points"), r
}

function H8(t, e) {
  if (ua(t, e)) {
    var r;
    return (r = e.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload
  }
  if (sa(t, e)) {
    var n;
    return (n = e.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload
  }
  return fi(t, e) ? e.payload : {}
}

function eS(t) {
  var e = t.activeTooltipItem,
    r = t.graphicalItem,
    n = t.itemData,
    i = U8(r, e),
    o = H8(r, e),
    a = n.filter(function(s, l) {
      var f = (0, QO.default)(o, s),
        c = r.props[i].filter(function(y) {
          var m = $8(r, e);
          return m(y, e)
        }),
        p = r.props[i].indexOf(c[c.length - 1]),
        d = l === p;
      return f && d
    }),
    u = n.indexOf(a[a.length - 1]);
  return u
}
import Xt, {
  PureComponent as d$,
  Children as m$
} from "./react-shim-eraudit.js";
var Hp = Q(It()),
  gS = Q(Fp());

function la(t) {
  "@babel/helpers - typeof";
  return la = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, la(t)
}

function lS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function cS(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? lS(Object(r), !0).forEach(function(n) {
      fS(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : lS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function fS(t, e, r) {
  return e = n$(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function n$(t) {
  var e = i$(t, "string");
  return la(e) == "symbol" ? e : e + ""
}

function i$(t, e) {
  if (la(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (la(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var o$ = ["Webkit", "Moz", "O", "ms"],
  pS = function(e, r) {
    if (!e) return null;
    var n = e.replace(/(\w)/, function(o) {
        return o.toUpperCase()
      }),
      i = o$.reduce(function(o, a) {
        return cS(cS({}, o), {}, fS({}, a + n, r))
      }, {});
    return i[e] = r, i
  };

function pi(t) {
  "@babel/helpers - typeof";
  return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, pi(t)
}

function Is() {
  return Is = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Is.apply(this, arguments)
}

function dS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function $p(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? dS(Object(r), !0).forEach(function(n) {
      ye(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : dS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function a$(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function mS(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, vS(n.key), n)
  }
}

function u$(t, e, r) {
  return e && mS(t.prototype, e), r && mS(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function s$(t, e, r) {
  return e = ks(e), l$(t, yS() ? Reflect.construct(e, r || [], ks(t).constructor) : e.apply(t, r))
}

function l$(t, e) {
  if (e && (pi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return c$(t)
}

function c$(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function yS() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (yS = function() {
    return !!t
  })()
}

function ks(t) {
  return ks = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ks(t)
}

function f$(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Up(t, e)
}

function Up(t, e) {
  return Up = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Up(t, e)
}

function ye(t, e, r) {
  return e = vS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function vS(t) {
  var e = p$(t, "string");
  return pi(e) == "symbol" ? e : e + ""
}

function p$(t, e) {
  if (pi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var h$ = function(e) {
    var r = e.data,
      n = e.startIndex,
      i = e.endIndex,
      o = e.x,
      a = e.width,
      u = e.travellerWidth;
    if (!r || !r.length) return {};
    var s = r.length,
      l = br().domain((0, gS.default)(0, s)).range([o, o + a - u]),
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
  hS = function(e) {
    return e.changedTouches && !!e.changedTouches.length
  },
  ln = function(t) {
    function e(r) {
      var n;
      return a$(this, e), n = s$(this, e, [r]), ye(n, "handleDrag", function(i) {
        n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(i) : n.state.isSlideMoving && n.handleSlideDrag(i)
      }), ye(n, "handleTouchMove", function(i) {
        i.changedTouches != null && i.changedTouches.length > 0 && n.handleDrag(i.changedTouches[0])
      }), ye(n, "handleDragEnd", function() {
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
      }), ye(n, "handleLeaveWrapper", function() {
        (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut))
      }), ye(n, "handleEnterSlideOrTraveller", function() {
        n.setState({
          isTextActive: !0
        })
      }), ye(n, "handleLeaveSlideOrTraveller", function() {
        n.setState({
          isTextActive: !1
        })
      }), ye(n, "handleSlideDragStart", function(i) {
        var o = hS(i) ? i.changedTouches[0] : i;
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
    return f$(e, t), u$(e, [{
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
          s = Ut(o[n], u, n);
        return (0, Hp.default)(a) ? a(s, n) : s
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
        var o = hS(i) ? i.changedTouches[0] : i;
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
          _ = S.startIndex,
          h = S.endIndex,
          g = function() {
            var C = v.length - 1;
            return a === "startX" && (u > s ? _ % m === 0 : h % m === 0) || u < s && h === C || a === "endX" && (u > s ? h % m === 0 : _ % m === 0) || u > s && h === C
          };
        this.setState(ye(ye({}, a, l + w), "brushMoveStartX", n.pageX), function() {
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
            i === "startX" && d >= l || i === "endX" && d <= s || this.setState(ye({}, i, d), function() {
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
        return Xt.createElement("rect", {
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
          c = m$.only(l);
        return c ? Xt.cloneElement(c, {
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
          w = $p($p({}, at(this.props, !1)), {}, {
            x,
            y: l,
            width: f,
            height: c
          }),
          S = d || "Min value: ".concat((o = y[m]) === null || o === void 0 ? void 0 : o.name, ", Max value: ").concat((a = y[v]) === null || a === void 0 ? void 0 : a.name);
        return Xt.createElement(bt, {
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
        return Xt.createElement("rect", {
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
        return Xt.createElement(bt, {
          className: "recharts-brush-texts"
        }, Xt.createElement($r, Is({
          textAnchor: "end",
          verticalAnchor: "middle",
          x: Math.min(c, p) - d,
          y: a + u / 2
        }, y), this.getTextOfTick(i)), Xt.createElement($r, Is({
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
        var S = ot("recharts-brush", o),
          _ = Xt.Children.count(a) === 1,
          h = pS("userSelect", "none");
        return Xt.createElement(bt, {
          className: S,
          onMouseLeave: this.handleLeaveWrapper,
          onTouchMove: this.handleTouchMove,
          style: h
        }, this.renderBackground(), _ && this.renderPanorama(), this.renderSlide(d, y), this.renderTravellerLayer(d, "startX"), this.renderTravellerLayer(y, "endX"), (m || v || x || w || c) && this.renderText())
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
        return Xt.createElement(Xt.Fragment, null, Xt.createElement("rect", {
          x: i,
          y: o,
          width: a,
          height: u,
          fill: s,
          stroke: "none"
        }), Xt.createElement("line", {
          x1: i + 1,
          y1: l,
          x2: i + a - 1,
          y2: l,
          fill: "none",
          stroke: "#fff"
        }), Xt.createElement("line", {
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
        return Xt.isValidElement(n) ? o = Xt.cloneElement(n, i) : (0, Hp.default)(n) ? o = n(i) : o = e.renderDefaultTraveller(i), o
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
        if (o !== i.prevData || l !== i.prevUpdateId) return $p({
          prevData: o,
          prevTravellerWidth: s,
          prevUpdateId: l,
          prevX: u,
          prevWidth: a
        }, o && o.length ? h$({
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
  }(d$);
ye(ln, "displayName", "Brush");
ye(ln, "defaultProps", {
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
var AA = Q(It()),
  _A = Q(OS());
import vi from "./react-shim-eraudit.js";
var se = function(e, r) {
  var n = e.alwaysShow,
    i = e.ifOverflow;
  return n && (i = "extendDomain"), i === r
};
var HS = Q(TS()),
  GS = Q(Gp());
import Me, {
  PureComponent as r6
} from "./react-shim-eraudit.js";
var WS = Q(Eo()),
  zS = Q(xe());
import U$ from "./react-shim-eraudit.js";
var B$ = ["x", "y"];

function fa(t) {
  "@babel/helpers - typeof";
  return fa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, fa(t)
}

function Kp() {
  return Kp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Kp.apply(this, arguments)
}

function kS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ca(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? kS(Object(r), !0).forEach(function(n) {
      q$(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : kS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function q$(t, e, r) {
  return e = W$(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function W$(t) {
  var e = z$(t, "string");
  return fa(e) == "symbol" ? e : e + ""
}

function z$(t, e) {
  if (fa(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (fa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function F$(t, e) {
  if (t == null) return {};
  var r = $$(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function $$(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function H$(t, e) {
  var r = t.x,
    n = t.y,
    i = F$(t, B$),
    o = "".concat(r),
    a = parseInt(o, 10),
    u = "".concat(n),
    s = parseInt(u, 10),
    l = "".concat(e.height || i.height),
    f = parseInt(l, 10),
    c = "".concat(e.width || i.width),
    p = parseInt(c, 10);
  return ca(ca(ca(ca(ca({}, e), i), a ? {
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

function Vp(t) {
  return U$.createElement(tS, Kp({
    shapeType: "rectangle",
    propTransformer: H$,
    activeClassName: "recharts-active-bar"
  }, t))
}
var DS = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, i) {
    if (typeof e == "number") return e;
    var o = X(n) || wh(n);
    return o ? e(n, i) : (o || Re(!1), r)
  }
};
var G$ = ["value", "background"],
  LS;

function di(t) {
  "@babel/helpers - typeof";
  return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, di(t)
}

function K$(t, e) {
  if (t == null) return {};
  var r = V$(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function V$(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Ds() {
  return Ds = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ds.apply(this, arguments)
}

function NS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Nt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? NS(Object(r), !0).forEach(function(n) {
      Tr(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : NS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function X$(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function RS(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, qS(n.key), n)
  }
}

function Y$(t, e, r) {
  return e && RS(t.prototype, e), r && RS(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function Z$(t, e, r) {
  return e = Ns(e), J$(t, BS() ? Reflect.construct(e, r || [], Ns(t).constructor) : e.apply(t, r))
}

function J$(t, e) {
  if (e && (di(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Q$(t)
}

function Q$(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function BS() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (BS = function() {
    return !!t
  })()
}

function Ns(t) {
  return Ns = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ns(t)
}

function t6(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Xp(t, e)
}

function Xp(t, e) {
  return Xp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Xp(t, e)
}

function Tr(t, e, r) {
  return e = qS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function qS(t) {
  var e = e6(t, "string");
  return di(e) == "symbol" ? e : e + ""
}

function e6(t, e) {
  if (di(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Be = function(t) {
  function e() {
    var r;
    X$(this, e);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = Z$(this, e, [].concat(i)), Tr(r, "state", {
      isAnimationFinished: !1
    }), Tr(r, "id", Ge("recharts-bar-")), Tr(r, "handleAnimationEnd", function() {
      var a = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), a && a()
    }), Tr(r, "handleAnimationStart", function() {
      var a = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), a && a()
    }), r
  }
  return t6(e, t), Y$(e, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var i = this,
        o = this.props,
        a = o.shape,
        u = o.dataKey,
        s = o.activeIndex,
        l = o.activeBar,
        f = at(this.props, !1);
      return n && n.map(function(c, p) {
        var d = p === s,
          y = d ? l : a,
          m = Nt(Nt(Nt({}, f), c), {}, {
            isActive: d,
            option: y,
            index: p,
            dataKey: u,
            onAnimationStart: i.handleAnimationStart,
            onAnimationEnd: i.handleAnimationEnd
          });
        return Me.createElement(bt, Ds({
          className: "recharts-bar-rectangle"
        }, Rr(i.props, c, p), {
          key: "rectangle-".concat(c?.x, "-").concat(c?.y, "-").concat(c?.value, "-").concat(p)
        }), Me.createElement(Vp, m))
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
      return Me.createElement(rr, {
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
              var S = ce(w.x, v.x),
                _ = ce(w.y, v.y),
                h = ce(w.width, v.width),
                g = ce(w.height, v.height);
              return Nt(Nt({}, v), {}, {
                x: S(y),
                y: _(y),
                width: h(y),
                height: g(y)
              })
            }
            if (a === "horizontal") {
              var A = ce(0, v.height),
                C = A(y);
              return Nt(Nt({}, v), {}, {
                y: v.y + v.height - C,
                height: C
              })
            }
            var D = ce(0, v.width),
              q = D(y);
            return Nt(Nt({}, v), {}, {
              width: q
            })
          });
        return Me.createElement(bt, null, n.renderRectanglesStatically(m))
      })
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props,
        i = n.data,
        o = n.isAnimationActive,
        a = this.state.prevData;
      return o && i && i.length && (!a || !(0, WS.default)(a, i)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(i)
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this,
        i = this.props,
        o = i.data,
        a = i.dataKey,
        u = i.activeIndex,
        s = at(this.props.background, !1);
      return o.map(function(l, f) {
        var c = l.value,
          p = l.background,
          d = K$(l, G$);
        if (!p) return null;
        var y = Nt(Nt(Nt(Nt(Nt({}, d), {}, {
          fill: "#eee"
        }, p), s), Rr(n.props, l, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: a,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return Me.createElement(Vp, Ds({
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
        c = Lt(f, _r);
      if (!c) return null;
      var p = l === "vertical" ? a[0].height / 2 : a[0].width / 2,
        d = function(v, x) {
          var w = Array.isArray(v.value) ? v.value[1] : v.value;
          return {
            x: v.x,
            y: v.y,
            value: w,
            errorVal: Ut(v, x)
          }
        },
        y = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return Me.createElement(bt, y, c.map(function(m) {
        return Me.cloneElement(m, {
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
        x = ot("recharts-bar", a),
        w = u && u.allowDataOverflow,
        S = s && s.allowDataOverflow,
        _ = w || S,
        h = (0, zS.default)(m) ? this.id : m;
      return Me.createElement(bt, {
        className: x
      }, w || S ? Me.createElement("defs", null, Me.createElement("clipPath", {
        id: "clipPath-".concat(h)
      }, Me.createElement("rect", {
        x: w ? l : l - c / 2,
        y: S ? f : f - p / 2,
        width: w ? c : c * 2,
        height: S ? p : p * 2
      }))) : null, Me.createElement(bt, {
        className: "recharts-bar-rectangles",
        clipPath: _ ? "url(#clipPath-".concat(h, ")") : null
      }, y ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(_, h), (!d || v) && er.renderCallByParent(this.props, o))
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
}(r6);
LS = Be;
Tr(Be, "displayName", "Bar");
Tr(Be, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !re.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
Tr(Be, "getComposedData", function(t) {
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
    d = b1(n, r);
  if (!d) return null;
  var y = e.layout,
    m = r.type.defaultProps,
    v = m !== void 0 ? Nt(Nt({}, m), r.props) : r.props,
    x = v.dataKey,
    w = v.children,
    S = v.minPointSize,
    _ = y === "horizontal" ? a : o,
    h = l ? _.scale.domain() : null,
    g = S1({
      numericAxis: _
    }),
    A = Lt(w, lf),
    C = c.map(function(D, q) {
      var W, L, H, F, z, b;
      l ? W = x1(l[f + q], h) : (W = Ut(D, x), Array.isArray(W) || (W = [g, W]));
      var O = DS(S, LS.defaultProps.minPointSize)(W[1], q);
      if (y === "horizontal") {
        var E, P = [a.scale(W[0]), a.scale(W[1])],
          j = P[0],
          T = P[1];
        L = mp({
          axis: o,
          ticks: u,
          bandSize: i,
          offset: d.offset,
          entry: D,
          index: q
        }), H = (E = T ?? j) !== null && E !== void 0 ? E : void 0, F = d.size;
        var R = j - T;
        if (z = Number.isNaN(R) ? 0 : R, b = {
            x: L,
            y: a.y,
            width: F,
            height: a.height
          }, Math.abs(O) > 0 && Math.abs(z) < Math.abs(O)) {
          var B = Kt(z || O) * (Math.abs(O) - Math.abs(z));
          H -= B, z += B
        }
      } else {
        var G = [o.scale(W[0]), o.scale(W[1])],
          Z = G[0],
          J = G[1];
        if (L = Z, H = mp({
            axis: a,
            ticks: s,
            bandSize: i,
            offset: d.offset,
            entry: D,
            index: q
          }), F = J - Z, z = d.size, b = {
            x: o.x,
            y: H,
            width: o.width,
            height: z
          }, Math.abs(O) > 0 && Math.abs(F) < Math.abs(O)) {
          var V = Kt(F || O) * (Math.abs(O) - Math.abs(F));
          F += V
        }
      }
      return Nt(Nt(Nt({}, D), {}, {
        x: L,
        y: H,
        width: F,
        height: z,
        value: l ? W : W[1],
        payload: D,
        background: b
      }, A && A[q] && A[q].props), {}, {
        tooltipPayload: [ms(r, D)],
        tooltipPosition: {
          x: L + F / 2,
          y: H + z / 2
        }
      })
    });
  return Nt({
    data: C,
    layout: y
  }, p)
});

function pa(t) {
  "@babel/helpers - typeof";
  return pa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, pa(t)
}

function n6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function FS(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, US(n.key), n)
  }
}

function i6(t, e, r) {
  return e && FS(t.prototype, e), r && FS(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function $S(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function qe(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? $S(Object(r), !0).forEach(function(n) {
      Rs(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : $S(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Rs(t, e, r) {
  return e = US(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function US(t) {
  var e = o6(t, "string");
  return pa(e) == "symbol" ? e : e + ""
}

function o6(t, e) {
  if (pa(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (pa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Ls = function(e, r, n, i, o) {
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
      p = !!Vt(l, Be);
    return f.reduce(function(d, y) {
      var m = r[y],
        v = m.orientation,
        x = m.domain,
        w = m.padding,
        S = w === void 0 ? {} : w,
        _ = m.mirror,
        h = m.reversed,
        g = "".concat(v).concat(_ ? "Mirror" : ""),
        A, C, D, q, W;
      if (m.type === "number" && (m.padding === "gap" || m.padding === "no-gap")) {
        var L = x[1] - x[0],
          H = 1 / 0,
          F = m.categoricalDomain.sort(Sh);
        if (F.forEach(function(G, Z) {
            Z > 0 && (H = Math.min((G || 0) - (F[Z - 1] || 0), H))
          }), Number.isFinite(H)) {
          var z = H / L,
            b = m.layout === "vertical" ? n.height : n.width;
          if (m.padding === "gap" && (A = z * b / 2), m.padding === "no-gap") {
            var O = ke(e.barCategoryGap, z * b),
              E = z * b / 2;
            A = E - O - (E - O) / b * O
          }
        }
      }
      i === "xAxis" ? C = [n.left + (S.left || 0) + (A || 0), n.left + n.width - (S.right || 0) - (A || 0)] : i === "yAxis" ? C = s === "horizontal" ? [n.top + n.height - (S.bottom || 0), n.top + (S.top || 0)] : [n.top + (S.top || 0) + (A || 0), n.top + n.height - (S.bottom || 0) - (A || 0)] : C = m.range, h && (C = [C[1], C[0]]);
      var P = v1(m, o, p),
        j = P.scale,
        T = P.realScaleType;
      j.domain(x).range(C), g1(j);
      var R = O1(j, qe(qe({}, m), {}, {
        realScaleType: T
      }));
      i === "xAxis" ? (W = v === "top" && !_ || v === "bottom" && _, D = n.left, q = c[g] - W * m.height) : i === "yAxis" && (W = v === "left" && !_ || v === "right" && _, D = c[g] - W * m.width, q = n.top);
      var B = qe(qe(qe({}, m), R), {}, {
        realScaleType: T,
        x: D,
        y: q,
        scale: j,
        width: i === "xAxis" ? n.width : m.width,
        height: i === "yAxis" ? n.height : m.height
      });
      return B.bandSize = oi(B, R), !m.hide && i === "xAxis" ? c[g] += (W ? -1 : 1) * B.height : m.hide || (c[g] += (W ? -1 : 1) * B.width), qe(qe({}, d), {}, Rs({}, y, B))
    }, {})
  },
  Yp = function(e, r) {
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
  KS = function(e) {
    var r = e.x1,
      n = e.y1,
      i = e.x2,
      o = e.y2;
    return Yp({
      x: r,
      y: n
    }, {
      x: i,
      y: o
    })
  },
  VS = function() {
    function t(e) {
      n6(this, t), this.scale = e
    }
    return i6(t, [{
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
Rs(VS, "EPS", 1e-4);
var mi = function(e) {
  var r = Object.keys(e).reduce(function(n, i) {
    return qe(qe({}, n), {}, Rs({}, i, VS.create(e[i])))
  }, {});
  return qe(qe({}, r), {}, {
    apply: function(i) {
      var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        a = o.bandAware,
        u = o.position;
      return (0, HS.default)(i, function(s, l) {
        return r[l].apply(s, {
          bandAware: a,
          position: u
        })
      })
    },
    isInRange: function(i) {
      return (0, GS.default)(i, function(o, a) {
        return r[a].isInRange(o)
      })
    }
  })
};

function a6(t) {
  return (t % 180 + 180) % 180
}
var XS = function(e) {
  var r = e.width,
    n = e.height,
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    o = a6(i),
    a = o * Math.PI / 180,
    u = Math.atan(n / r),
    s = a > u && a < Math.PI - u ? n / Math.sin(a) : r / Math.cos(a);
  return Math.abs(s)
};
import cn, {
  createContext as fn,
  useContext as mr
} from "./react-shim-eraudit.js";
var aA = Q(nA()),
  uA = Q(Gp());
var iA = Q(xl()),
  oA = (0, iA.default)(function(t) {
    return {
      x: t.left,
      y: t.top,
      width: t.width,
      height: t.height
    }
  }, function(t) {
    return ["l", t.left, "t", t.top, "w", t.width, "h", t.height].join("")
  });
var Zp = fn(void 0),
  Jp = fn(void 0),
  sA = fn(void 0),
  lA = fn({}),
  cA = fn(void 0),
  fA = fn(0),
  pA = fn(0),
  Qp = function(e) {
    var r = e.state,
      n = r.xAxisMap,
      i = r.yAxisMap,
      o = r.offset,
      a = e.clipPathId,
      u = e.children,
      s = e.width,
      l = e.height,
      f = oA(o);
    return cn.createElement(Zp.Provider, {
      value: n
    }, cn.createElement(Jp.Provider, {
      value: i
    }, cn.createElement(lA.Provider, {
      value: o
    }, cn.createElement(sA.Provider, {
      value: f
    }, cn.createElement(cA.Provider, {
      value: a
    }, cn.createElement(fA.Provider, {
      value: l
    }, cn.createElement(pA.Provider, {
      value: s
    }, u)))))))
  },
  dA = function() {
    return mr(cA)
  };
var Bs = function(e) {
    var r = mr(Zp);
    r == null && Re(!1);
    var n = r[e];
    return n == null && Re(!1), n
  },
  mA = function() {
    var e = mr(Zp);
    return Ke(e)
  };
var hA = function() {
    var e = mr(Jp),
      r = (0, aA.default)(e, function(n) {
        return (0, uA.default)(n.domain, Number.isFinite)
      });
    return r || Ke(e)
  },
  qs = function(e) {
    var r = mr(Jp);
    r == null && Re(!1);
    var n = r[e];
    return n == null && Re(!1), n
  },
  yA = function() {
    var e = mr(sA);
    return e
  },
  vA = function() {
    return mr(lA)
  },
  hi = function() {
    return mr(pA)
  },
  yi = function() {
    return mr(fA)
  };

function gi(t) {
  "@babel/helpers - typeof";
  return gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, gi(t)
}

function w6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function gA(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, SA(n.key), n)
  }
}

function O6(t, e, r) {
  return e && gA(t.prototype, e), r && gA(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function S6(t, e, r) {
  return e = Ws(e), A6(t, OA() ? Reflect.construct(e, r || [], Ws(t).constructor) : e.apply(t, r))
}

function A6(t, e) {
  if (e && (gi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return _6(t)
}

function _6(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function OA() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (OA = function() {
    return !!t
  })()
}

function Ws(t) {
  return Ws = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ws(t)
}

function P6(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && td(t, e)
}

function td(t, e) {
  return td = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, td(t, e)
}

function bA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function xA(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? bA(Object(r), !0).forEach(function(n) {
      rd(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : bA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function rd(t, e, r) {
  return e = SA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function SA(t) {
  var e = T6(t, "string");
  return gi(e) == "symbol" ? e : e + ""
}

function T6(t, e) {
  if (gi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (gi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function E6(t, e) {
  return I6(t) || C6(t, e) || M6(t, e) || j6()
}

function j6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function M6(t, e) {
  if (t) {
    if (typeof t == "string") return wA(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return wA(t, e)
  }
}

function wA(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function C6(t, e) {
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

function I6(t) {
  if (Array.isArray(t)) return t
}

function ed() {
  return ed = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, ed.apply(this, arguments)
}
var k6 = function(e, r) {
    var n;
    return vi.isValidElement(e) ? n = vi.cloneElement(e, r) : (0, AA.default)(e) ? n = e(r) : n = vi.createElement("line", ed({}, r, {
      className: "recharts-reference-line-line"
    })), n
  },
  D6 = function(e, r, n, i, o, a, u, s, l) {
    var f = o.x,
      c = o.y,
      p = o.width,
      d = o.height;
    if (n) {
      var y = l.y,
        m = e.y.apply(y, {
          position: a
        });
      if (se(l, "discard") && !e.y.isInRange(m)) return null;
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
      if (se(l, "discard") && !e.x.isInRange(w)) return null;
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
      var _ = l.segment,
        h = _.map(function(g) {
          return e.apply(g, {
            position: a
          })
        });
      return se(l, "discard") && (0, _A.default)(h, function(g) {
        return !e.isInRange(g)
      }) ? null : h
    }
    return null
  };

function N6(t) {
  var e = t.x,
    r = t.y,
    n = t.segment,
    i = t.xAxisId,
    o = t.yAxisId,
    a = t.shape,
    u = t.className,
    s = t.alwaysShow,
    l = dA(),
    f = Bs(i),
    c = qs(o),
    p = yA();
  if (!l || !p) return null;
  ee(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var d = mi({
      x: f.scale,
      y: c.scale
    }),
    y = Tt(e),
    m = Tt(r),
    v = n && n.length === 2,
    x = D6(d, y, m, v, p, t.position, f.orientation, c.orientation, t);
  if (!x) return null;
  var w = E6(x, 2),
    S = w[0],
    _ = S.x,
    h = S.y,
    g = w[1],
    A = g.x,
    C = g.y,
    D = se(t, "hidden") ? "url(#".concat(l, ")") : void 0,
    q = xA(xA({
      clipPath: D
    }, at(t, !0)), {}, {
      x1: _,
      y1: h,
      x2: A,
      y2: C
    });
  return vi.createElement(bt, {
    className: ot("recharts-reference-line", u)
  }, k6(a, q), kt.renderCallByParent(t, KS({
    x1: _,
    y1: h,
    x2: A,
    y2: C
  })))
}
var zs = function(t) {
  function e() {
    return w6(this, e), S6(this, e, arguments)
  }
  return P6(e, t), O6(e, [{
    key: "render",
    value: function() {
      return vi.createElement(N6, this.props)
    }
  }])
}(vi.Component);
rd(zs, "displayName", "ReferenceLine");
rd(zs, "defaultProps", {
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
var CA = Q(It());
import da from "./react-shim-eraudit.js";

function nd() {
  return nd = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, nd.apply(this, arguments)
}

function bi(t) {
  "@babel/helpers - typeof";
  return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, bi(t)
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
      $s(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : PA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function R6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function EA(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, MA(n.key), n)
  }
}

function L6(t, e, r) {
  return e && EA(t.prototype, e), r && EA(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function B6(t, e, r) {
  return e = Fs(e), q6(t, jA() ? Reflect.construct(e, r || [], Fs(t).constructor) : e.apply(t, r))
}

function q6(t, e) {
  if (e && (bi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return W6(t)
}

function W6(t) {
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

function Fs(t) {
  return Fs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Fs(t)
}

function z6(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && id(t, e)
}

function id(t, e) {
  return id = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, id(t, e)
}

function $s(t, e, r) {
  return e = MA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function MA(t) {
  var e = F6(t, "string");
  return bi(e) == "symbol" ? e : e + ""
}

function F6(t, e) {
  if (bi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var $6 = function(e) {
    var r = e.x,
      n = e.y,
      i = e.xAxis,
      o = e.yAxis,
      a = mi({
        x: i.scale,
        y: o.scale
      }),
      u = a.apply({
        x: r,
        y: n
      }, {
        bandAware: !0
      });
    return se(e, "discard") && !a.isInRange(u) ? null : u
  },
  ma = function(t) {
    function e() {
      return R6(this, e), B6(this, e, arguments)
    }
    return z6(e, t), L6(e, [{
      key: "render",
      value: function() {
        var n = this.props,
          i = n.x,
          o = n.y,
          a = n.r,
          u = n.alwaysShow,
          s = n.clipPathId,
          l = Tt(i),
          f = Tt(o);
        if (ee(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !l || !f) return null;
        var c = $6(this.props);
        if (!c) return null;
        var p = c.x,
          d = c.y,
          y = this.props,
          m = y.shape,
          v = y.className,
          x = se(this.props, "hidden") ? "url(#".concat(s, ")") : void 0,
          w = TA(TA({
            clipPath: x
          }, at(this.props, !0)), {}, {
            cx: p,
            cy: d
          });
        return da.createElement(bt, {
          className: ot("recharts-reference-dot", v)
        }, e.renderDot(m, w), kt.renderCallByParent(this.props, {
          x: p - a,
          y: d - a,
          width: 2 * a,
          height: 2 * a
        }))
      }
    }])
  }(da.Component);
$s(ma, "displayName", "ReferenceDot");
$s(ma, "defaultProps", {
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
$s(ma, "renderDot", function(t, e) {
  var r;
  return da.isValidElement(t) ? r = da.cloneElement(t, e) : (0, CA.default)(t) ? r = t(e) : r = da.createElement(ci, nd({}, e, {
    cx: e.cx,
    cy: e.cy,
    className: "recharts-reference-dot-dot"
  })), r
});
var LA = Q(It());
import ha from "./react-shim-eraudit.js";

function od() {
  return od = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, od.apply(this, arguments)
}

function xi(t) {
  "@babel/helpers - typeof";
  return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, xi(t)
}

function IA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function kA(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? IA(Object(r), !0).forEach(function(n) {
      Hs(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : IA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function U6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function DA(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, RA(n.key), n)
  }
}

function H6(t, e, r) {
  return e && DA(t.prototype, e), r && DA(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function G6(t, e, r) {
  return e = Us(e), K6(t, NA() ? Reflect.construct(e, r || [], Us(t).constructor) : e.apply(t, r))
}

function K6(t, e) {
  if (e && (xi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return V6(t)
}

function V6(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function NA() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (NA = function() {
    return !!t
  })()
}

function Us(t) {
  return Us = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Us(t)
}

function X6(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && ad(t, e)
}

function ad(t, e) {
  return ad = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, ad(t, e)
}

function Hs(t, e, r) {
  return e = RA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function RA(t) {
  var e = Y6(t, "string");
  return xi(e) == "symbol" ? e : e + ""
}

function Y6(t, e) {
  if (xi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (xi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Z6 = function(e, r, n, i, o) {
    var a = o.x1,
      u = o.x2,
      s = o.y1,
      l = o.y2,
      f = o.xAxis,
      c = o.yAxis;
    if (!f || !c) return null;
    var p = mi({
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
    return se(o, "discard") && (!p.isInRange(d) || !p.isInRange(y)) ? null : Yp(d, y)
  },
  ya = function(t) {
    function e() {
      return U6(this, e), G6(this, e, arguments)
    }
    return X6(e, t), H6(e, [{
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
        ee(l === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
        var c = Tt(i),
          p = Tt(o),
          d = Tt(a),
          y = Tt(u),
          m = this.props.shape;
        if (!c && !p && !d && !y && !m) return null;
        var v = Z6(c, p, d, y, this.props);
        if (!v && !m) return null;
        var x = se(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
        return ha.createElement(bt, {
          className: ot("recharts-reference-area", s)
        }, e.renderRect(m, kA(kA({
          clipPath: x
        }, at(this.props, !0)), v)), kt.renderCallByParent(this.props, v))
      }
    }])
  }(ha.Component);
Hs(ya, "displayName", "ReferenceArea");
Hs(ya, "defaultProps", {
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
Hs(ya, "renderRect", function(t, e) {
  var r;
  return ha.isValidElement(t) ? r = ha.cloneElement(t, e) : (0, LA.default)(t) ? r = t(e) : r = ha.createElement(li, od({}, e, {
    className: "recharts-reference-area-rect"
  })), r
});
var Ks = Q(It()),
  ld = Q(Dr());
import Er, {
  Component as mU
} from "./react-shim-eraudit.js";
var $A = Q(It());

function Gs(t, e, r) {
  if (e < 1) return [];
  if (e === 1 && r === void 0) return t;
  for (var n = [], i = 0; i < t.length; i += e)
    if (r === void 0 || r(t[i]) === !0) n.push(t[i]);
    else return;
  return n
}

function BA(t, e, r) {
  var n = {
    width: t.width + e.width,
    height: t.height + e.height
  };
  return XS(n, r)
}

function qA(t, e, r) {
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

function wi(t, e, r, n, i) {
  if (t * e < t * n || t * e > t * i) return !1;
  var o = r();
  return t * (e - t * o / 2 - n) >= 0 && t * (e + t * o / 2 - i) <= 0
}

function WA(t, e) {
  return Gs(t, e + 1)
}

function zA(t, e, r, n, i) {
  for (var o = (n || []).slice(), a = e.start, u = e.end, s = 0, l = 1, f = a, c = function() {
      var y = n?.[s];
      if (y === void 0) return {
        v: Gs(n, l)
      };
      var m = s,
        v, x = function() {
          return v === void 0 && (v = r(y, m)), v
        },
        w = y.coordinate,
        S = s === 0 || wi(t, w, x, f, u);
      S || (s = 0, f = a, l += 1), S && (f = w + t * (x() / 2 + i), s += l)
    }, p; l <= o.length;)
    if (p = c(), p) return p.v;
  return []
}

function va(t) {
  "@babel/helpers - typeof";
  return va = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, va(t)
}

function FA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Yt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? FA(Object(r), !0).forEach(function(n) {
      J6(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : FA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function J6(t, e, r) {
  return e = Q6(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Q6(t) {
  var e = tU(t, "string");
  return va(e) == "symbol" ? e : e + ""
}

function tU(t, e) {
  if (va(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (va(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function eU(t, e, r, n, i) {
  for (var o = (n || []).slice(), a = o.length, u = e.start, s = e.end, l = function(p) {
      var d = o[p],
        y, m = function() {
          return y === void 0 && (y = r(d, p)), y
        };
      if (p === a - 1) {
        var v = t * (d.coordinate + t * m() / 2 - s);
        o[p] = d = Yt(Yt({}, d), {}, {
          tickCoord: v > 0 ? d.coordinate - v * t : d.coordinate
        })
      } else o[p] = d = Yt(Yt({}, d), {}, {
        tickCoord: d.coordinate
      });
      var x = wi(t, d.tickCoord, m, u, s);
      x && (s = d.tickCoord - t * (m() / 2 + i), o[p] = Yt(Yt({}, d), {}, {
        isShow: !0
      }))
    }, f = a - 1; f >= 0; f--) l(f);
  return o
}

function rU(t, e, r, n, i, o) {
  var a = (n || []).slice(),
    u = a.length,
    s = e.start,
    l = e.end;
  if (o) {
    var f = n[u - 1],
      c = r(f, u - 1),
      p = t * (f.coordinate + t * c / 2 - l);
    a[u - 1] = f = Yt(Yt({}, f), {}, {
      tickCoord: p > 0 ? f.coordinate - p * t : f.coordinate
    });
    var d = wi(t, f.tickCoord, function() {
      return c
    }, s, l);
    d && (l = f.tickCoord - t * (c / 2 + i), a[u - 1] = Yt(Yt({}, f), {}, {
      isShow: !0
    }))
  }
  for (var y = o ? u - 1 : u, m = function(w) {
      var S = a[w],
        _, h = function() {
          return _ === void 0 && (_ = r(S, w)), _
        };
      if (w === 0) {
        var g = t * (S.coordinate - t * h() / 2 - s);
        a[w] = S = Yt(Yt({}, S), {}, {
          tickCoord: g < 0 ? S.coordinate - g * t : S.coordinate
        })
      } else a[w] = S = Yt(Yt({}, S), {}, {
        tickCoord: S.coordinate
      });
      var A = wi(t, S.tickCoord, h, s, l);
      A && (s = S.tickCoord + t * (h() / 2 + i), a[w] = Yt(Yt({}, S), {}, {
        isShow: !0
      }))
    }, v = 0; v < y; v++) m(v);
  return a
}

function ga(t, e, r) {
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
  if (X(s) || re.isSsr) return WA(i, typeof s == "number" && X(s) ? s : 0);
  var p = [],
    d = u === "top" || u === "bottom" ? "width" : "height",
    y = f && d === "width" ? Fr(f, {
      fontSize: e,
      letterSpacing: r
    }) : {
      width: 0,
      height: 0
    },
    m = function(S, _) {
      var h = (0, $A.default)(l) ? l(S.value, _) : S.value;
      return d === "width" ? BA(Fr(h, {
        fontSize: e,
        letterSpacing: r
      }), y, c) : Fr(h, {
        fontSize: e,
        letterSpacing: r
      })[d]
    },
    v = i.length >= 2 ? Kt(i[1].coordinate - i[0].coordinate) : 1,
    x = qA(o, v, d);
  return s === "equidistantPreserveStart" ? zA(v, x, m, i, a) : (s === "preserveStart" || s === "preserveStartEnd" ? p = rU(v, x, m, i, a, s === "preserveStartEnd") : p = eU(v, x, m, i, a), p.filter(function(w) {
    return w.isShow
  }))
}
var nU = ["viewBox"],
  iU = ["viewBox"],
  oU = ["ticks"];

function Si(t) {
  "@babel/helpers - typeof";
  return Si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Si(t)
}

function Oi() {
  return Oi = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Oi.apply(this, arguments)
}

function UA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Wt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? UA(Object(r), !0).forEach(function(n) {
      cd(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : UA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ud(t, e) {
  if (t == null) return {};
  var r = aU(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function aU(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function uU(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function HA(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, KA(n.key), n)
  }
}

function sU(t, e, r) {
  return e && HA(t.prototype, e), r && HA(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function lU(t, e, r) {
  return e = Vs(e), cU(t, GA() ? Reflect.construct(e, r || [], Vs(t).constructor) : e.apply(t, r))
}

function cU(t, e) {
  if (e && (Si(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return fU(t)
}

function fU(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function GA() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (GA = function() {
    return !!t
  })()
}

function Vs(t) {
  return Vs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Vs(t)
}

function pU(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && sd(t, e)
}

function sd(t, e) {
  return sd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, sd(t, e)
}

function cd(t, e, r) {
  return e = KA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function KA(t) {
  var e = dU(t, "string");
  return Si(e) == "symbol" ? e : e + ""
}

function dU(t, e) {
  if (Si(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Si(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var hr = function(t) {
  function e(r) {
    var n;
    return uU(this, e), n = lU(this, e, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n
  }
  return pU(e, t), sU(e, [{
    key: "shouldComponentUpdate",
    value: function(n, i) {
      var o = n.viewBox,
        a = ud(n, nU),
        u = this.props,
        s = u.viewBox,
        l = ud(u, iU);
      return !ar(o, s) || !ar(a, l) || !ar(i, this.state)
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
        _ = n.tickSize || f,
        h = X(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (l) {
        case "top":
          d = y = n.coordinate, v = a + +!c * s, m = v - S * _, w = m - S * p, x = h;
          break;
        case "left":
          m = v = n.coordinate, y = o + +!c * u, d = y - S * _, x = d - S * p, w = h;
          break;
        case "right":
          m = v = n.coordinate, y = o + +c * u, d = y + S * _, x = d + S * p, w = h;
          break;
        default:
          d = y = n.coordinate, v = a + +c * s, m = v + S * _, w = m + S * p, x = h;
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
        c = Wt(Wt(Wt({}, at(this.props, !1)), at(f, !1)), {}, {
          fill: "none"
        });
      if (s === "top" || s === "bottom") {
        var p = +(s === "top" && !l || s === "bottom" && l);
        c = Wt(Wt({}, c), {}, {
          x1: i,
          y1: o + p * u,
          x2: i + a,
          y2: o + p * u
        })
      } else {
        var d = +(s === "left" && !l || s === "right" && l);
        c = Wt(Wt({}, c), {}, {
          x1: i + d * a,
          y1: o,
          x2: i + d * a,
          y2: o + u
        })
      }
      return Er.createElement("line", Oi({}, c, {
        className: ot("recharts-cartesian-axis-line", (0, ld.default)(f, "className"))
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
        d = ga(Wt(Wt({}, this.props), {}, {
          ticks: n
        }), i, o),
        y = this.getTickTextAnchor(),
        m = this.getTickVerticalAnchor(),
        v = at(this.props, !1),
        x = at(f, !1),
        w = Wt(Wt({}, v), {}, {
          fill: "none"
        }, at(s, !1)),
        S = d.map(function(_, h) {
          var g = a.getTickLineCoord(_),
            A = g.line,
            C = g.tick,
            D = Wt(Wt(Wt(Wt({
              textAnchor: y,
              verticalAnchor: m
            }, v), {}, {
              stroke: "none",
              fill: l
            }, x), C), {}, {
              index: h,
              payload: _,
              visibleTicksCount: d.length,
              tickFormatter: c
            });
          return Er.createElement(bt, Oi({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(_.value, "-").concat(_.coordinate, "-").concat(_.tickCoord)
          }, Rr(a.props, _, h)), s && Er.createElement("line", Oi({}, w, A, {
            className: ot("recharts-cartesian-axis-tick-line", (0, ld.default)(s, "className"))
          })), f && e.renderTickItem(f, D, "".concat((0, Ks.default)(c) ? c(_.value, h) : _.value).concat(p || "")))
        });
      return Er.createElement("g", {
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
        d = ud(c, oU),
        y = p;
      return (0, Ks.default)(s) && (y = p && p.length > 0 ? s(this.props) : s(d)), a <= 0 || u <= 0 || !y || !y.length ? null : Er.createElement(bt, {
        className: ot("recharts-cartesian-axis", l),
        ref: function(v) {
          n.layerReference = v
        }
      }, o && this.renderAxisLine(), this.renderTicks(y, this.state.fontSize, this.state.letterSpacing), kt.renderCallByParent(this.props))
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, o) {
      var a, u = ot(i.className, "recharts-cartesian-axis-tick-value");
      return Er.isValidElement(n) ? a = Er.cloneElement(n, Wt(Wt({}, i), {}, {
        className: u
      })) : (0, Ks.default)(n) ? a = n(Wt(Wt({}, i), {}, {
        className: u
      })) : a = Er.createElement($r, Oi({}, i, {
        className: "recharts-cartesian-axis-tick-value"
      }), o), a
    }
  }])
}(mU);
cd(hr, "displayName", "CartesianAxis");
cd(hr, "defaultProps", {
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
var Xs = Q(It());
import Jt from "./react-shim-eraudit.js";
var hU = ["x1", "y1", "x2", "y2", "key"],
  yU = ["offset"];

function dn(t) {
  "@babel/helpers - typeof";
  return dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, dn(t)
}

function VA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Zt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? VA(Object(r), !0).forEach(function(n) {
      vU(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : VA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function vU(t, e, r) {
  return e = gU(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function gU(t) {
  var e = bU(t, "string");
  return dn(e) == "symbol" ? e : e + ""
}

function bU(t, e) {
  if (dn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (dn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function pn() {
  return pn = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, pn.apply(this, arguments)
}

function XA(t, e) {
  if (t == null) return {};
  var r = xU(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function xU(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var wU = function(e) {
  var r = e.fill;
  if (!r || r === "none") return null;
  var n = e.fillOpacity,
    i = e.x,
    o = e.y,
    a = e.width,
    u = e.height,
    s = e.ry;
  return Jt.createElement("rect", {
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

function YA(t, e) {
  var r;
  if (Jt.isValidElement(t)) r = Jt.cloneElement(t, e);
  else if ((0, Xs.default)(t)) r = t(e);
  else {
    var n = e.x1,
      i = e.y1,
      o = e.x2,
      a = e.y2,
      u = e.key,
      s = XA(e, hU),
      l = at(s, !1),
      f = l.offset,
      c = XA(l, yU);
    r = Jt.createElement("line", pn({}, c, {
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

function OU(t) {
  var e = t.x,
    r = t.width,
    n = t.horizontal,
    i = n === void 0 ? !0 : n,
    o = t.horizontalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = Zt(Zt({}, t), {}, {
      x1: e,
      y1: u,
      x2: e + r,
      y2: u,
      key: "line-".concat(s),
      index: s
    });
    return YA(i, l)
  });
  return Jt.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, a)
}

function SU(t) {
  var e = t.y,
    r = t.height,
    n = t.vertical,
    i = n === void 0 ? !0 : n,
    o = t.verticalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = Zt(Zt({}, t), {}, {
      x1: u,
      y1: e,
      x2: u,
      y2: e + r,
      key: "line-".concat(s),
      index: s
    });
    return YA(i, l)
  });
  return Jt.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, a)
}

function AU(t) {
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
    return Jt.createElement("rect", {
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
  return Jt.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, c)
}

function _U(t) {
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
    return Jt.createElement("rect", {
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
  return Jt.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, c)
}
var PU = function(e, r) {
    var n = e.xAxis,
      i = e.width,
      o = e.height,
      a = e.offset;
    return pp(ga(Zt(Zt(Zt({}, hr.defaultProps), n), {}, {
      ticks: he(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.left, a.left + a.width, r)
  },
  TU = function(e, r) {
    var n = e.yAxis,
      i = e.width,
      o = e.height,
      a = e.offset;
    return pp(ga(Zt(Zt(Zt({}, hr.defaultProps), n), {}, {
      ticks: he(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.top, a.top + a.height, r)
  },
  Ai = {
    horizontal: !0,
    vertical: !0,
    horizontalPoints: [],
    verticalPoints: [],
    stroke: "#ccc",
    fill: "none",
    verticalFill: [],
    horizontalFill: []
  };

function ba(t) {
  var e, r, n, i, o, a, u = hi(),
    s = yi(),
    l = vA(),
    f = Zt(Zt({}, t), {}, {
      stroke: (e = t.stroke) !== null && e !== void 0 ? e : Ai.stroke,
      fill: (r = t.fill) !== null && r !== void 0 ? r : Ai.fill,
      horizontal: (n = t.horizontal) !== null && n !== void 0 ? n : Ai.horizontal,
      horizontalFill: (i = t.horizontalFill) !== null && i !== void 0 ? i : Ai.horizontalFill,
      vertical: (o = t.vertical) !== null && o !== void 0 ? o : Ai.vertical,
      verticalFill: (a = t.verticalFill) !== null && a !== void 0 ? a : Ai.verticalFill,
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
    w = mA(),
    S = hA();
  if (!X(d) || d <= 0 || !X(y) || y <= 0 || !X(c) || c !== +c || !X(p) || p !== +p) return null;
  var _ = f.verticalCoordinatesGenerator || PU,
    h = f.horizontalCoordinatesGenerator || TU,
    g = f.horizontalPoints,
    A = f.verticalPoints;
  if ((!g || !g.length) && (0, Xs.default)(h)) {
    var C = v && v.length,
      D = h({
        yAxis: S ? Zt(Zt({}, S), {}, {
          ticks: C ? v : S.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, C ? !0 : m);
    ee(Array.isArray(D), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(dn(D), "]")), Array.isArray(D) && (g = D)
  }
  if ((!A || !A.length) && (0, Xs.default)(_)) {
    var q = x && x.length,
      W = _({
        xAxis: w ? Zt(Zt({}, w), {}, {
          ticks: q ? x : w.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, q ? !0 : m);
    ee(Array.isArray(W), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(dn(W), "]")), Array.isArray(W) && (A = W)
  }
  return Jt.createElement("g", {
    className: "recharts-cartesian-grid"
  }, Jt.createElement(wU, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), Jt.createElement(OU, pn({}, f, {
    offset: l,
    horizontalPoints: g,
    xAxis: w,
    yAxis: S
  })), Jt.createElement(SU, pn({}, f, {
    offset: l,
    verticalPoints: A,
    xAxis: w,
    yAxis: S
  })), Jt.createElement(AU, pn({}, f, {
    horizontalPoints: g
  })), Jt.createElement(_U, pn({}, f, {
    verticalPoints: A
  })))
}
ba.displayName = "CartesianGrid";
import le, {
  PureComponent as FU
} from "./react-shim-eraudit.js";
var r_ = Q(It()),
  Zs = Q(xe()),
  n_ = Q(Eo());
var EU = ["type", "layout", "connectNulls", "ref"],
  jU = ["key"];

function Pi(t) {
  "@babel/helpers - typeof";
  return Pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Pi(t)
}

function ZA(t, e) {
  if (t == null) return {};
  var r = MU(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function MU(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function xa() {
  return xa = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, xa.apply(this, arguments)
}

function JA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ve(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? JA(Object(r), !0).forEach(function(n) {
      We(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : JA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function _i(t) {
  return DU(t) || kU(t) || IU(t) || CU()
}

function CU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function IU(t, e) {
  if (t) {
    if (typeof t == "string") return fd(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return fd(t, e)
  }
}

function kU(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function DU(t) {
  if (Array.isArray(t)) return fd(t)
}

function fd(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function NU(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function QA(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, e_(n.key), n)
  }
}

function RU(t, e, r) {
  return e && QA(t.prototype, e), r && QA(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function LU(t, e, r) {
  return e = Ys(e), BU(t, t_() ? Reflect.construct(e, r || [], Ys(t).constructor) : e.apply(t, r))
}

function BU(t, e) {
  if (e && (Pi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return qU(t)
}

function qU(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function t_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (t_ = function() {
    return !!t
  })()
}

function Ys(t) {
  return Ys = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ys(t)
}

function WU(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && pd(t, e)
}

function pd(t, e) {
  return pd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, pd(t, e)
}

function We(t, e, r) {
  return e = e_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function e_(t) {
  var e = zU(t, "string");
  return Pi(e) == "symbol" ? e : e + ""
}

function zU(t, e) {
  if (Pi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var jr = function(t) {
  function e() {
    var r;
    NU(this, e);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = LU(this, e, [].concat(i)), We(r, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), We(r, "generateSimpleStrokeDasharray", function(a, u) {
      return "".concat(u, "px ").concat(a - u, "px")
    }), We(r, "getStrokeDasharray", function(a, u, s) {
      var l = s.reduce(function(x, w) {
        return x + w
      });
      if (!l) return r.generateSimpleStrokeDasharray(u, a);
      for (var f = Math.floor(a / l), c = a % l, p = u - a, d = [], y = 0, m = 0; y < s.length; m += s[y], ++y)
        if (m + s[y] > c) {
          d = [].concat(_i(s.slice(0, y)), [c - m]);
          break
        } var v = d.length % 2 === 0 ? [0, p] : [p];
      return [].concat(_i(e.repeat(s, f)), _i(d), v).map(function(x) {
        return "".concat(x, "px")
      }).join(", ")
    }), We(r, "id", Ge("recharts-line-")), We(r, "pathRef", function(a) {
      r.mainCurve = a
    }), We(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      }), r.props.onAnimationEnd && r.props.onAnimationEnd()
    }), We(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      }), r.props.onAnimationStart && r.props.onAnimationStart()
    }), r
  }
  return WU(e, t), RU(e, [{
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
        c = Lt(f, _r);
      if (!c) return null;
      var p = function(m, v) {
          return {
            x: m.x,
            y: m.y,
            value: m.value,
            errorVal: Ut(m.payload, v)
          }
        },
        d = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return le.createElement(bt, d, c.map(function(y) {
        return le.cloneElement(y, {
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
        c = at(this.props, !1),
        p = at(s, !0),
        d = l.map(function(m, v) {
          var x = ve(ve(ve({
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
      return le.createElement(bt, xa({
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
        p = ZA(u, EU),
        d = ve(ve(ve({}, at(p, !0)), {}, {
          fill: "none",
          className: "recharts-line-curve",
          clipPath: i ? "url(#clipPath-".concat(o, ")") : null,
          points: n
        }, a), {}, {
          type: s,
          layout: l,
          connectNulls: f
        });
      return le.createElement(Yo, xa({}, d, {
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
      return le.createElement(rr, {
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
      }, function(_) {
        var h = _.t;
        if (w) {
          var g = w.length / u.length,
            A = u.map(function(L, H) {
              var F = Math.floor(H * g);
              if (w[F]) {
                var z = w[F],
                  b = ce(z.x, L.x),
                  O = ce(z.y, L.y);
                return ve(ve({}, L), {}, {
                  x: b(h),
                  y: O(h)
                })
              }
              if (y) {
                var E = ce(m * 2, L.x),
                  P = ce(v / 2, L.y);
                return ve(ve({}, L), {}, {
                  x: E(h),
                  y: P(h)
                })
              }
              return ve(ve({}, L), {}, {
                x: L.x,
                y: L.y
              })
            });
          return o.renderCurveStatically(A, n, i)
        }
        var C = ce(0, S),
          D = C(h),
          q;
        if (s) {
          var W = "".concat(s).split(/[,\s]+/gim).map(function(L) {
            return parseFloat(L)
          });
          q = o.getStrokeDasharray(D, S, W)
        } else q = o.generateSimpleStrokeDasharray(S, D);
        return o.renderCurveStatically(u, n, i, {
          strokeDasharray: q
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
      return u && a && a.length && (!l && f > 0 || !(0, n_.default)(l, a)) ? this.renderCurveWithAnimation(n, i) : this.renderCurveStatically(a, n, i)
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
        S = ot("recharts-line", s),
        _ = l && l.allowDataOverflow,
        h = f && f.allowDataOverflow,
        g = _ || h,
        A = (0, Zs.default)(v) ? this.id : v,
        C = (n = at(a, !1)) !== null && n !== void 0 ? n : {
          r: 3,
          strokeWidth: 2
        },
        D = C.r,
        q = D === void 0 ? 3 : D,
        W = C.strokeWidth,
        L = W === void 0 ? 2 : W,
        H = Dh(a) ? a : {},
        F = H.clipDot,
        z = F === void 0 ? !0 : F,
        b = q * 2 + L;
      return le.createElement(bt, {
        className: S
      }, _ || h ? le.createElement("defs", null, le.createElement("clipPath", {
        id: "clipPath-".concat(A)
      }, le.createElement("rect", {
        x: _ ? p : p - d / 2,
        y: h ? c : c - y / 2,
        width: _ ? d : d * 2,
        height: h ? y : y * 2
      })), !z && le.createElement("clipPath", {
        id: "clipPath-dots-".concat(A)
      }, le.createElement("rect", {
        x: p - b / 2,
        y: c - b / 2,
        width: d + b,
        height: y + b
      }))) : null, !w && this.renderCurve(g, A), this.renderErrorBar(g, A), (w || a) && this.renderDots(g, z, A), (!m || x) && er.renderCallByParent(this.props, u))
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
      for (var o = n.length % 2 !== 0 ? [].concat(_i(n), [0]) : n, a = [], u = 0; u < i; ++u) a = [].concat(_i(a), _i(o));
      return a
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var o;
      if (le.isValidElement(n)) o = le.cloneElement(n, i);
      else if ((0, r_.default)(n)) o = n(i);
      else {
        var a = i.key,
          u = ZA(i, jU),
          s = ot("recharts-line-dot", typeof n != "boolean" ? n.className : "");
        o = le.createElement(ci, xa({
          key: a
        }, u, {
          className: s
        }))
      }
      return o
    }
  }])
}(FU);
We(jr, "displayName", "Line");
We(jr, "defaultProps", {
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
  isAnimationActive: !re.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
});
We(jr, "getComposedData", function(t) {
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
      var y = Ut(p, a);
      return f === "horizontal" ? {
        x: dp({
          axis: r,
          ticks: i,
          bandSize: u,
          entry: p,
          index: d
        }),
        y: (0, Zs.default)(y) ? null : n.scale(y),
        value: y,
        payload: p
      } : {
        x: (0, Zs.default)(y) ? null : r.scale(y),
        y: dp({
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
  return ve({
    points: c,
    layout: f
  }, l)
});
import * as wa from "./react-shim-eraudit.js";

function Ti(t) {
  "@babel/helpers - typeof";
  return Ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ti(t)
}

function $U(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function i_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, u_(n.key), n)
  }
}

function UU(t, e, r) {
  return e && i_(t.prototype, e), r && i_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function HU(t, e, r) {
  return e = Js(e), GU(t, o_() ? Reflect.construct(e, r || [], Js(t).constructor) : e.apply(t, r))
}

function GU(t, e) {
  if (e && (Ti(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return KU(t)
}

function KU(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function o_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (o_ = function() {
    return !!t
  })()
}

function Js(t) {
  return Js = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Js(t)
}

function VU(t, e) {
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

function a_(t, e, r) {
  return e = u_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function u_(t) {
  var e = XU(t, "string");
  return Ti(e) == "symbol" ? e : e + ""
}

function XU(t, e) {
  if (Ti(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function md() {
  return md = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, md.apply(this, arguments)
}

function YU(t) {
  var e = t.xAxisId,
    r = hi(),
    n = yi(),
    i = Bs(e);
  return i == null ? null : wa.createElement(hr, md({}, i, {
    className: ot("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
    viewBox: {
      x: 0,
      y: 0,
      width: r,
      height: n
    },
    ticksGenerator: function(a) {
      return he(a, !0)
    }
  }))
}
var nr = function(t) {
  function e() {
    return $U(this, e), HU(this, e, arguments)
  }
  return VU(e, t), UU(e, [{
    key: "render",
    value: function() {
      return wa.createElement(YU, this.props)
    }
  }])
}(wa.Component);
a_(nr, "displayName", "XAxis");
a_(nr, "defaultProps", {
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
import * as Oa from "./react-shim-eraudit.js";

function Ei(t) {
  "@babel/helpers - typeof";
  return Ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ei(t)
}

function ZU(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function s_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, f_(n.key), n)
  }
}

function JU(t, e, r) {
  return e && s_(t.prototype, e), r && s_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function QU(t, e, r) {
  return e = Qs(e), t4(t, l_() ? Reflect.construct(e, r || [], Qs(t).constructor) : e.apply(t, r))
}

function t4(t, e) {
  if (e && (Ei(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return e4(t)
}

function e4(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function l_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (l_ = function() {
    return !!t
  })()
}

function Qs(t) {
  return Qs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Qs(t)
}

function r4(t, e) {
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

function c_(t, e, r) {
  return e = f_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function f_(t) {
  var e = n4(t, "string");
  return Ei(e) == "symbol" ? e : e + ""
}

function n4(t, e) {
  if (Ei(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function yd() {
  return yd = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, yd.apply(this, arguments)
}
var i4 = function(e) {
    var r = e.yAxisId,
      n = hi(),
      i = yi(),
      o = qs(r);
    return o == null ? null : Oa.createElement(hr, yd({}, o, {
      className: ot("recharts-".concat(o.axisType, " ").concat(o.axisType), o.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: i
      },
      ticksGenerator: function(u) {
        return he(u, !0)
      }
    }))
  },
  ir = function(t) {
    function e() {
      return ZU(this, e), QU(this, e, arguments)
    }
    return r4(e, t), JU(e, [{
      key: "render",
      value: function() {
        return Oa.createElement(i4, this.props)
      }
    }])
  }(Oa.Component);
c_(ir, "displayName", "YAxis");
c_(ir, "defaultProps", {
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
var Mi = Q(xe()),
  Fe = Q(It()),
  sl = Q(Fp()),
  Ci = Q(Dr()),
  D_ = Q(hu()),
  N_ = Q(uf());
import Ce, {
  Component as R4,
  cloneElement as ze,
  isValidElement as L4,
  forwardRef as B4
} from "./react-shim-eraudit.js";

function p_(t) {
  return s4(t) || u4(t) || a4(t) || o4()
}

function o4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function a4(t, e) {
  if (t) {
    if (typeof t == "string") return vd(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return vd(t, e)
  }
}

function u4(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function s4(t) {
  if (Array.isArray(t)) return vd(t)
}

function vd(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var tl = function(e, r, n, i, o) {
  var a = Lt(e, zs),
    u = Lt(e, ma),
    s = [].concat(p_(a), p_(u)),
    l = Lt(e, ya),
    f = "".concat(i, "Id"),
    c = i[0],
    p = r;
  if (s.length && (p = s.reduce(function(m, v) {
      if (v.props[f] === n && se(v.props, "extendDomain") && X(v.props[c])) {
        var x = v.props[c];
        return [Math.min(m[0], x), Math.max(m[1], x)]
      }
      return m
    }, p)), l.length) {
    var d = "".concat(c, "1"),
      y = "".concat(c, "2");
    p = l.reduce(function(m, v) {
      if (v.props[f] === n && se(v.props, "extendDomain") && X(v.props[d]) && X(v.props[y])) {
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
var h_ = Q(m_()),
  rl = new h_.default;
var nl = "recharts.syncMouseEvents";

function Aa(t) {
  "@babel/helpers - typeof";
  return Aa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Aa(t)
}

function f4(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function y_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, v_(n.key), n)
  }
}

function p4(t, e, r) {
  return e && y_(t.prototype, e), r && y_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function bd(t, e, r) {
  return e = v_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function v_(t) {
  var e = d4(t, "string");
  return Aa(e) == "symbol" ? e : e + ""
}

function d4(t, e) {
  if (Aa(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Aa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var g_ = function() {
  function t() {
    f4(this, t), bd(this, "activeIndex", 0), bd(this, "coordinateList", []), bd(this, "layout", "horizontal")
  }
  return p4(t, [{
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

function b_(t, e, r) {
  if (r === "number" && e === !0 && Array.isArray(t)) {
    var n = t?.[0],
      i = t?.[1];
    if (n && i && X(n) && X(i)) return !0
  }
  return !1
}
import {
  cloneElement as v4,
  createElement as g4,
  isValidElement as b4
} from "./react-shim-eraudit.js";

function x_(t, e, r, n) {
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

function il(t) {
  var e = t.cx,
    r = t.cy,
    n = t.radius,
    i = t.startAngle,
    o = t.endAngle,
    a = Ct(e, r, n, i),
    u = Ct(e, r, n, o);
  return {
    points: [a, u],
    cx: e,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: o
  }
}

function w_(t, e, r) {
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
        p = Ct(u, s, l, c),
        d = Ct(u, s, f, c);
      n = p.x, i = p.y, o = d.x, a = d.y
    } else return il(e);
  return [{
    x: n,
    y: i
  }, {
    x: o,
    y: a
  }]
}

function _a(t) {
  "@babel/helpers - typeof";
  return _a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, _a(t)
}

function O_(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ol(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? O_(Object(r), !0).forEach(function(n) {
      m4(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : O_(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function m4(t, e, r) {
  return e = h4(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function h4(t) {
  var e = y4(t, "string");
  return _a(e) == "symbol" ? e : e + ""
}

function y4(t, e) {
  if (_a(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (_a(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function S_(t) {
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
  var y, m = Yo;
  if (p === "ScatterChart") y = a, m = DO;
  else if (p === "BarChart") y = x_(c, a, s, f), m = li;
  else if (c === "radial") {
    var v = il(a),
      x = v.cx,
      w = v.cy,
      S = v.radius,
      _ = v.startAngle,
      h = v.endAngle;
    y = {
      cx: x,
      cy: w,
      startAngle: _,
      endAngle: h,
      innerRadius: S,
      outerRadius: S
    }, m = bs
  } else y = {
    points: w_(c, a, s)
  }, m = Yo;
  var g = ol(ol(ol(ol({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), y), at(d, !1)), {}, {
    payload: u,
    payloadIndex: l,
    className: ot("recharts-tooltip-cursor", d.className)
  });
  return b4(d) ? v4(d, g) : g4(m, g)
}
var x4 = ["item"],
  w4 = ["children", "className", "width", "height", "style", "compact", "title", "desc"];

function Ii(t) {
  "@babel/helpers - typeof";
  return Ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ii(t)
}

function ji() {
  return ji = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, ji.apply(this, arguments)
}

function A_(t, e) {
  return A4(t) || S4(t, e) || I_(t, e) || O4()
}

function O4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function S4(t, e) {
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

function A4(t) {
  if (Array.isArray(t)) return t
}

function __(t, e) {
  if (t == null) return {};
  var r = _4(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function _4(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function P4(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function P_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, k_(n.key), n)
  }
}

function T4(t, e, r) {
  return e && P_(t.prototype, e), r && P_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function E4(t, e, r) {
  return e = ul(e), j4(t, C_() ? Reflect.construct(e, r || [], ul(t).constructor) : e.apply(t, r))
}

function j4(t, e) {
  if (e && (Ii(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return M4(t)
}

function M4(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function C_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (C_ = function() {
    return !!t
  })()
}

function ul(t) {
  return ul = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ul(t)
}

function C4(t, e) {
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

function ki(t) {
  return D4(t) || k4(t) || I_(t) || I4()
}

function I4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function I_(t, e) {
  if (t) {
    if (typeof t == "string") return wd(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return wd(t, e)
  }
}

function k4(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function D4(t) {
  if (Array.isArray(t)) return wd(t)
}

function wd(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function T_(t, e) {
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
    e % 2 ? T_(Object(r), !0).forEach(function(n) {
      ct(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : T_(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ct(t, e, r) {
  return e = k_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function k_(t) {
  var e = N4(t, "string");
  return Ii(e) == "symbol" ? e : e + ""
}

function N4(t, e) {
  if (Ii(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var q4 = {
    xAxis: ["bottom", "top"],
    yAxis: ["left", "right"]
  },
  W4 = {
    width: "100%",
    height: "100%"
  },
  R_ = {
    x: 0,
    y: 0
  };

function al(t) {
  return t
}
var z4 = function(e, r) {
    return r === "horizontal" ? e.x : r === "vertical" ? e.y : r === "centric" ? e.angle : e.radius
  },
  F4 = function(e, r, n, i) {
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
        return U(U(U({}, i), Ct(i.cx, i.cy, u, a)), {}, {
          angle: a,
          radius: u
        })
      }
      var s = o.coordinate,
        l = i.angle;
      return U(U(U({}, i), Ct(i.cx, i.cy, s, l)), {}, {
        angle: l,
        radius: s
      })
    }
    return R_
  },
  ll = function(e, r) {
    var n = r.graphicalItems,
      i = r.dataStartIndex,
      o = r.dataEndIndex,
      a = (n ?? []).reduce(function(u, s) {
        var l = s.props.data;
        return l && l.length ? [].concat(ki(u), ki(l)) : u
      }, []);
    return a.length > 0 ? a : e && e.length && X(i) && X(o) ? e.slice(i, o + 1) : []
  };

function L_(t) {
  return t === "number" ? [0, "auto"] : void 0
}
var Od = function(e, r, n, i) {
    var o = e.graphicalItems,
      a = e.tooltipAxis,
      u = ll(r, e);
    return n < 0 || !o || !o.length || n >= u.length ? null : o.reduce(function(s, l) {
      var f, c = (f = l.props.data) !== null && f !== void 0 ? f : r;
      c && e.dataStartIndex + e.dataEndIndex !== 0 && e.dataEndIndex - e.dataStartIndex >= n && (c = c.slice(e.dataStartIndex, e.dataEndIndex + 1));
      var p;
      if (a.dataKey && !a.allowDuplicatedCategory) {
        var d = c === void 0 ? u : c;
        p = bn(d, a.dataKey, i)
      } else p = c && c[n] || u[n];
      return p ? [].concat(ki(s), [ms(l, p)]) : s
    }, [])
  },
  E_ = function(e, r, n, i) {
    var o = i || {
        x: e.chartX,
        y: e.chartY
      },
      a = z4(o, n),
      u = e.orderedTooltipTicks,
      s = e.tooltipAxis,
      l = e.tooltipTicks,
      f = f1(a, u, l, s);
    if (f >= 0 && l) {
      var c = l[f] && l[f].value,
        p = Od(e, r, f, c),
        d = F4(n, u, f, o);
      return {
        activeTooltipIndex: f,
        activeLabel: c,
        activePayload: p,
        activeCoordinate: d
      }
    }
    return null
  },
  $4 = function(e, r) {
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
      d = fp(f, o);
    return n.reduce(function(y, m) {
      var v, x = m.type.defaultProps !== void 0 ? U(U({}, m.type.defaultProps), m.props) : m.props,
        w = x.type,
        S = x.dataKey,
        _ = x.allowDataOverflow,
        h = x.allowDuplicatedCategory,
        g = x.scale,
        A = x.ticks,
        C = x.includeHidden,
        D = x[a];
      if (y[D]) return y;
      var q = ll(e.data, {
          graphicalItems: i.filter(function(R) {
            var B, G = a in R.props ? R.props[a] : (B = R.type.defaultProps) === null || B === void 0 ? void 0 : B[a];
            return G === D
          }),
          dataStartIndex: s,
          dataEndIndex: l
        }),
        W = q.length,
        L, H, F;
      b_(x.domain, _, w) && (L = ds(x.domain, null, _), d && (w === "number" || g !== "auto") && (F = ii(q, S, "category")));
      var z = L_(w);
      if (!L || L.length === 0) {
        var b, O = (b = x.domain) !== null && b !== void 0 ? b : z;
        if (S) {
          if (L = ii(q, S, w), w === "category" && d) {
            var E = Oh(L);
            h && E ? (H = L, L = (0, sl.default)(0, W)) : h || (L = yp(O, L, m).reduce(function(R, B) {
              return R.indexOf(B) >= 0 ? R : [].concat(ki(R), [B])
            }, []))
          } else if (w === "category") h ? L = L.filter(function(R) {
            return R !== "" && !(0, Mi.default)(R)
          }) : L = yp(O, L, m).reduce(function(R, B) {
            return R.indexOf(B) >= 0 || B === "" || (0, Mi.default)(B) ? R : [].concat(ki(R), [B])
          }, []);
          else if (w === "number") {
            var P = y1(q, i.filter(function(R) {
              var B, G, Z = a in R.props ? R.props[a] : (B = R.type.defaultProps) === null || B === void 0 ? void 0 : B[a],
                J = "hide" in R.props ? R.props.hide : (G = R.type.defaultProps) === null || G === void 0 ? void 0 : G.hide;
              return Z === D && (C || !J)
            }), S, o, f);
            P && (L = P)
          }
          d && (w === "number" || g !== "auto") && (F = ii(q, S, "category"))
        } else d ? L = (0, sl.default)(0, W) : u && u[D] && u[D].hasStack && w === "number" ? L = p === "expand" ? [0, 1] : hp(u[D].stackGroups, s, l) : L = cp(q, i.filter(function(R) {
          var B = a in R.props ? R.props[a] : R.type.defaultProps[a],
            G = "hide" in R.props ? R.props.hide : R.type.defaultProps.hide;
          return B === D && (C || !G)
        }), w, f, !0);
        if (w === "number") L = tl(c, L, D, o, A), O && (L = ds(O, L, _));
        else if (w === "category" && O) {
          var j = O,
            T = L.every(function(R) {
              return j.indexOf(R) >= 0
            });
          T && (L = j)
        }
      }
      return U(U({}, y), {}, ct({}, D, U(U({}, x), {}, {
        axisType: o,
        domain: L,
        categoricalDomain: F,
        duplicateDomain: H,
        originalDomain: (v = x.domain) !== null && v !== void 0 ? v : z,
        isCategorical: d,
        layout: f
      })))
    }, {})
  },
  U4 = function(e, r) {
    var n = r.graphicalItems,
      i = r.Axis,
      o = r.axisType,
      a = r.axisIdKey,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = e.layout,
      c = e.children,
      p = ll(e.data, {
        graphicalItems: n,
        dataStartIndex: s,
        dataEndIndex: l
      }),
      d = p.length,
      y = fp(f, o),
      m = -1;
    return n.reduce(function(v, x) {
      var w = x.type.defaultProps !== void 0 ? U(U({}, x.type.defaultProps), x.props) : x.props,
        S = w[a],
        _ = L_("number");
      if (!v[S]) {
        m++;
        var h;
        return y ? h = (0, sl.default)(0, d) : u && u[S] && u[S].hasStack ? (h = hp(u[S].stackGroups, s, l), h = tl(c, h, S, o)) : (h = ds(_, cp(p, n.filter(function(g) {
          var A, C, D = a in g.props ? g.props[a] : (A = g.type.defaultProps) === null || A === void 0 ? void 0 : A[a],
            q = "hide" in g.props ? g.props.hide : (C = g.type.defaultProps) === null || C === void 0 ? void 0 : C.hide;
          return D === S && !q
        }), "number", f), i.defaultProps.allowDataOverflow), h = tl(c, h, S, o)), U(U({}, v), {}, ct({}, S, U(U({
          axisType: o
        }, i.defaultProps), {}, {
          hide: !0,
          orientation: (0, Ci.default)(q4, "".concat(o, ".").concat(m % 2), null),
          domain: h,
          originalDomain: _,
          isCategorical: y,
          layout: f
        })))
      }
      return v
    }, {})
  },
  H4 = function(e, r) {
    var n = r.axisType,
      i = n === void 0 ? "xAxis" : n,
      o = r.AxisComp,
      a = r.graphicalItems,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = e.children,
      c = "".concat(i, "Id"),
      p = Lt(f, o),
      d = {};
    return p && p.length ? d = $4(e, {
      axes: p,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    }) : a && a.length && (d = U4(e, {
      Axis: o,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    })), d
  },
  G4 = function(e) {
    var r = Ke(e),
      n = he(r, !1, !0);
    return {
      tooltipTicks: n,
      orderedTooltipTicks: (0, D_.default)(n, function(i) {
        return i.coordinate
      }),
      tooltipAxis: r,
      tooltipAxisBandSize: oi(r, n)
    }
  },
  j_ = function(e) {
    var r = e.children,
      n = e.defaultShowTooltip,
      i = Vt(r, ln),
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
  K4 = function(e) {
    return !e || !e.length ? !1 : e.some(function(r) {
      var n = Oe(r && r.type);
      return n && n.indexOf("Bar") >= 0
    })
  },
  M_ = function(e) {
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
  V4 = function(e, r) {
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
      d = Vt(c, ln),
      y = Vt(c, Te),
      m = Object.keys(s).reduce(function(h, g) {
        var A = s[g],
          C = A.orientation;
        return !A.mirror && !A.hide ? U(U({}, h), {}, ct({}, C, h[C] + A.width)) : h
      }, {
        left: p.left || 0,
        right: p.right || 0
      }),
      v = Object.keys(a).reduce(function(h, g) {
        var A = a[g],
          C = A.orientation;
        return !A.mirror && !A.hide ? U(U({}, h), {}, ct({}, C, (0, Ci.default)(h, "".concat(C)) + A.height)) : h
      }, {
        top: p.top || 0,
        bottom: p.bottom || 0
      }),
      x = U(U({}, v), m),
      w = x.bottom;
    d && (x.bottom += d.props.height || ln.defaultProps.height), y && r && (x = m1(x, i, n, r));
    var S = l - x.left - x.right,
      _ = f - x.top - x.bottom;
    return U(U({
      brushBottom: w
    }, x), {}, {
      width: Math.max(S, 0),
      height: Math.max(_, 0)
    })
  },
  X4 = function(e, r) {
    if (r === "xAxis") return e[r].width;
    if (r === "yAxis") return e[r].height
  },
  cl = function(e) {
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
          _ = w.stackGroups,
          h = w.offset,
          g = w.updateId,
          A = w.dataStartIndex,
          C = w.dataEndIndex,
          D = x.barSize,
          q = x.layout,
          W = x.barGap,
          L = x.barCategoryGap,
          H = x.maxBarSize,
          F = M_(q),
          z = F.numericAxisName,
          b = F.cateAxisName,
          O = K4(S),
          E = [];
        return S.forEach(function(P, j) {
          var T = ll(x.data, {
              graphicalItems: [P],
              dataStartIndex: A,
              dataEndIndex: C
            }),
            R = P.type.defaultProps !== void 0 ? U(U({}, P.type.defaultProps), P.props) : P.props,
            B = R.dataKey,
            G = R.maxBarSize,
            Z = R["".concat(z, "Id")],
            J = R["".concat(b, "Id")],
            V = {},
            dt = s.reduce(function(ht, pt) {
              var lt, it, ut = w["".concat(pt.axisType, "Map")],
                vt = R["".concat(pt.axisType, "Id")];
              ut && ut[vt] || pt.axisType === "zAxis" || Re(!1);
              var yt = ut[vt];
              return U(U({}, ht), {}, ct(ct({}, pt.axisType, yt), "".concat(pt.axisType, "Ticks"), he(yt)))
            }, V),
            K = dt[b],
            st = dt["".concat(b, "Ticks")],
            tt = _ && _[Z] && _[Z].hasStack && A1(P, _[Z].stackGroups),
            k = Oe(P.type).indexOf("Bar") >= 0,
            gt = oi(K, st),
            ft = [],
            _t = O && p1({
              barSize: D,
              stackGroups: _,
              totalSize: X4(dt, b)
            });
          if (k) {
            var N, et, rt = (0, Mi.default)(G) ? H : G,
              Y = (N = (et = oi(K, st, !0)) !== null && et !== void 0 ? et : rt) !== null && N !== void 0 ? N : 0;
            ft = d1({
              barGap: W,
              barCategoryGap: L,
              bandSize: Y !== gt ? Y : gt,
              sizeList: _t[J],
              maxBarSize: rt
            }), Y !== gt && (ft = ft.map(function(ht) {
              return U(U({}, ht), {}, {
                position: U(U({}, ht.position), {}, {
                  offset: ht.position.offset - Y / 2
                })
              })
            }))
          }
          var nt = P && P.type && P.type.getComposedData;
          nt && E.push({
            props: U(U({}, nt(U(U({}, dt), {}, {
              displayedData: T,
              props: x,
              dataKey: B,
              item: P,
              bandSize: gt,
              barPosition: ft,
              offset: h,
              stackedData: tt,
              layout: q,
              dataStartIndex: A,
              dataEndIndex: C
            }))), {}, ct(ct(ct({
              key: P.key || "item-".concat(j)
            }, z, dt[z]), b, dt[b]), "animationId", g)),
            childIndex: Rh(P, x.children),
            item: P
          })
        }), E
      },
      d = function(x, w) {
        var S = x.props,
          _ = x.dataStartIndex,
          h = x.dataEndIndex,
          g = x.updateId;
        if (!Nl({
            props: S
          })) return null;
        var A = S.children,
          C = S.layout,
          D = S.stackOffset,
          q = S.data,
          W = S.reverseStackOrder,
          L = M_(C),
          H = L.numericAxisName,
          F = L.cateAxisName,
          z = Lt(A, n),
          b = w1(q, z, "".concat(H, "Id"), "".concat(F, "Id"), D, W),
          O = s.reduce(function(R, B) {
            var G = "".concat(B.axisType, "Map");
            return U(U({}, R), {}, ct({}, G, H4(S, U(U({}, B), {}, {
              graphicalItems: z,
              stackGroups: B.axisType === H && b,
              dataStartIndex: _,
              dataEndIndex: h
            }))))
          }, {}),
          E = V4(U(U({}, O), {}, {
            props: S,
            graphicalItems: z
          }), w?.legendBBox);
        Object.keys(O).forEach(function(R) {
          O[R] = f(S, O[R], E, R.replace("Map", ""), r)
        });
        var P = O["".concat(F, "Map")],
          j = G4(P),
          T = p(S, U(U({}, O), {}, {
            dataStartIndex: _,
            dataEndIndex: h,
            updateId: g,
            graphicalItems: z,
            stackGroups: b,
            offset: E
          }));
        return U(U({
          formattedGraphicalItems: T,
          graphicalItems: z,
          offset: E,
          stackGroups: b
        }, j), O)
      },
      y = function(v) {
        function x(w) {
          var S, _, h;
          return P4(this, x), h = E4(this, x, [w]), ct(h, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), ct(h, "accessibilityManager", new g_), ct(h, "handleLegendBBoxUpdate", function(g) {
            if (g) {
              var A = h.state,
                C = A.dataStartIndex,
                D = A.dataEndIndex,
                q = A.updateId;
              h.setState(U({
                legendBBox: g
              }, d({
                props: h.props,
                dataStartIndex: C,
                dataEndIndex: D,
                updateId: q
              }, U(U({}, h.state), {}, {
                legendBBox: g
              }))))
            }
          }), ct(h, "handleReceiveSyncEvent", function(g, A, C) {
            if (h.props.syncId === g) {
              if (C === h.eventEmitterSymbol && typeof h.props.syncMethod != "function") return;
              h.applySyncEvent(A)
            }
          }), ct(h, "handleBrushChange", function(g) {
            var A = g.startIndex,
              C = g.endIndex;
            if (A !== h.state.dataStartIndex || C !== h.state.dataEndIndex) {
              var D = h.state.updateId;
              h.setState(function() {
                return U({
                  dataStartIndex: A,
                  dataEndIndex: C
                }, d({
                  props: h.props,
                  dataStartIndex: A,
                  dataEndIndex: C,
                  updateId: D
                }, h.state))
              }), h.triggerSyncEvent({
                dataStartIndex: A,
                dataEndIndex: C
              })
            }
          }), ct(h, "handleMouseEnter", function(g) {
            var A = h.getMouseInfo(g);
            if (A) {
              var C = U(U({}, A), {}, {
                isTooltipActive: !0
              });
              h.setState(C), h.triggerSyncEvent(C);
              var D = h.props.onMouseEnter;
              (0, Fe.default)(D) && D(C, g)
            }
          }), ct(h, "triggeredAfterMouseMove", function(g) {
            var A = h.getMouseInfo(g),
              C = A ? U(U({}, A), {}, {
                isTooltipActive: !0
              }) : {
                isTooltipActive: !1
              };
            h.setState(C), h.triggerSyncEvent(C);
            var D = h.props.onMouseMove;
            (0, Fe.default)(D) && D(C, g)
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
            var A = {
              isTooltipActive: !1
            };
            h.setState(A), h.triggerSyncEvent(A);
            var C = h.props.onMouseLeave;
            (0, Fe.default)(C) && C(A, g)
          }), ct(h, "handleOuterEvent", function(g) {
            var A = Nh(g),
              C = (0, Ci.default)(h.props, "".concat(A));
            if (A && (0, Fe.default)(C)) {
              var D, q;
              /.*touch.*/i.test(A) ? q = h.getMouseInfo(g.changedTouches[0]) : q = h.getMouseInfo(g), C((D = q) !== null && D !== void 0 ? D : {}, g)
            }
          }), ct(h, "handleClick", function(g) {
            var A = h.getMouseInfo(g);
            if (A) {
              var C = U(U({}, A), {}, {
                isTooltipActive: !0
              });
              h.setState(C), h.triggerSyncEvent(C);
              var D = h.props.onClick;
              (0, Fe.default)(D) && D(C, g)
            }
          }), ct(h, "handleMouseDown", function(g) {
            var A = h.props.onMouseDown;
            if ((0, Fe.default)(A)) {
              var C = h.getMouseInfo(g);
              A(C, g)
            }
          }), ct(h, "handleMouseUp", function(g) {
            var A = h.props.onMouseUp;
            if ((0, Fe.default)(A)) {
              var C = h.getMouseInfo(g);
              A(C, g)
            }
          }), ct(h, "handleTouchMove", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.throttleTriggeredAfterMouseMove(g.changedTouches[0])
          }), ct(h, "handleTouchStart", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.handleMouseDown(g.changedTouches[0])
          }), ct(h, "handleTouchEnd", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.handleMouseUp(g.changedTouches[0])
          }), ct(h, "handleDoubleClick", function(g) {
            var A = h.props.onDoubleClick;
            if ((0, Fe.default)(A)) {
              var C = h.getMouseInfo(g);
              A(C, g)
            }
          }), ct(h, "handleContextMenu", function(g) {
            var A = h.props.onContextMenu;
            if ((0, Fe.default)(A)) {
              var C = h.getMouseInfo(g);
              A(C, g)
            }
          }), ct(h, "triggerSyncEvent", function(g) {
            h.props.syncId !== void 0 && rl.emit(nl, h.props.syncId, g, h.eventEmitterSymbol)
          }), ct(h, "applySyncEvent", function(g) {
            var A = h.props,
              C = A.layout,
              D = A.syncMethod,
              q = h.state.updateId,
              W = g.dataStartIndex,
              L = g.dataEndIndex;
            if (g.dataStartIndex !== void 0 || g.dataEndIndex !== void 0) h.setState(U({
              dataStartIndex: W,
              dataEndIndex: L
            }, d({
              props: h.props,
              dataStartIndex: W,
              dataEndIndex: L,
              updateId: q
            }, h.state)));
            else if (g.activeTooltipIndex !== void 0) {
              var H = g.chartX,
                F = g.chartY,
                z = g.activeTooltipIndex,
                b = h.state,
                O = b.offset,
                E = b.tooltipTicks;
              if (!O) return;
              if (typeof D == "function") z = D(E, g);
              else if (D === "value") {
                z = -1;
                for (var P = 0; P < E.length; P++)
                  if (E[P].value === g.activeLabel) {
                    z = P;
                    break
                  }
              }
              var j = U(U({}, O), {}, {
                  x: O.left,
                  y: O.top
                }),
                T = Math.min(H, j.x + j.width),
                R = Math.min(F, j.y + j.height),
                B = E[z] && E[z].value,
                G = Od(h.state, h.props.data, z),
                Z = E[z] ? {
                  x: C === "horizontal" ? E[z].coordinate : T,
                  y: C === "horizontal" ? R : E[z].coordinate
                } : R_;
              h.setState(U(U({}, g), {}, {
                activeLabel: B,
                activeCoordinate: Z,
                activePayload: G,
                activeTooltipIndex: z
              }))
            } else h.setState(g)
          }), ct(h, "renderCursor", function(g) {
            var A, C = h.state,
              D = C.isTooltipActive,
              q = C.activeCoordinate,
              W = C.activePayload,
              L = C.offset,
              H = C.activeTooltipIndex,
              F = C.tooltipAxisBandSize,
              z = h.getTooltipEventType(),
              b = (A = g.props.active) !== null && A !== void 0 ? A : D,
              O = h.props.layout,
              E = g.key || "_recharts-cursor";
            return Ce.createElement(S_, {
              key: E,
              activeCoordinate: q,
              activePayload: W,
              activeTooltipIndex: H,
              chartName: r,
              element: g,
              isActive: b,
              layout: O,
              offset: L,
              tooltipAxisBandSize: F,
              tooltipEventType: z
            })
          }), ct(h, "renderPolarAxis", function(g, A, C) {
            var D = (0, Ci.default)(g, "type.axisType"),
              q = (0, Ci.default)(h.state, "".concat(D, "Map")),
              W = g.type.defaultProps,
              L = W !== void 0 ? U(U({}, W), g.props) : g.props,
              H = q && q[L["".concat(D, "Id")]];
            return ze(g, U(U({}, H), {}, {
              className: ot(D, H.className),
              key: g.key || "".concat(A, "-").concat(C),
              ticks: he(H, !0)
            }))
          }), ct(h, "renderPolarGrid", function(g) {
            var A = g.props,
              C = A.radialLines,
              D = A.polarAngles,
              q = A.polarRadius,
              W = h.state,
              L = W.radiusAxisMap,
              H = W.angleAxisMap,
              F = Ke(L),
              z = Ke(H),
              b = z.cx,
              O = z.cy,
              E = z.innerRadius,
              P = z.outerRadius;
            return ze(g, {
              polarAngles: Array.isArray(D) ? D : he(z, !0).map(function(j) {
                return j.coordinate
              }),
              polarRadius: Array.isArray(q) ? q : he(F, !0).map(function(j) {
                return j.coordinate
              }),
              cx: b,
              cy: O,
              innerRadius: E,
              outerRadius: P,
              key: g.key || "polar-grid",
              radialLines: C
            })
          }), ct(h, "renderLegend", function() {
            var g = h.state.formattedGraphicalItems,
              A = h.props,
              C = A.children,
              D = A.width,
              q = A.height,
              W = h.props.margin || {},
              L = D - (W.left || 0) - (W.right || 0),
              H = fs({
                children: C,
                formattedGraphicalItems: g,
                legendWidth: L,
                legendContent: l
              });
            if (!H) return null;
            var F = H.item,
              z = __(H, x4);
            return ze(F, U(U({}, z), {}, {
              chartWidth: D,
              chartHeight: q,
              margin: W,
              onBBoxUpdate: h.handleLegendBBoxUpdate
            }))
          }), ct(h, "renderTooltip", function() {
            var g, A = h.props,
              C = A.children,
              D = A.accessibilityLayer,
              q = Vt(C, ae);
            if (!q) return null;
            var W = h.state,
              L = W.isTooltipActive,
              H = W.activeCoordinate,
              F = W.activePayload,
              z = W.activeLabel,
              b = W.offset,
              O = (g = q.props.active) !== null && g !== void 0 ? g : L;
            return ze(q, {
              viewBox: U(U({}, b), {}, {
                x: b.left,
                y: b.top
              }),
              active: O,
              label: z,
              payload: O ? F : [],
              coordinate: H,
              accessibilityLayer: D
            })
          }), ct(h, "renderBrush", function(g) {
            var A = h.props,
              C = A.margin,
              D = A.data,
              q = h.state,
              W = q.offset,
              L = q.dataStartIndex,
              H = q.dataEndIndex,
              F = q.updateId;
            return ze(g, {
              key: g.key || "_recharts-brush",
              onChange: Bo(h.handleBrushChange, g.props.onChange),
              data: D,
              x: X(g.props.x) ? g.props.x : W.left,
              y: X(g.props.y) ? g.props.y : W.top + W.height + W.brushBottom - (C.bottom || 0),
              width: X(g.props.width) ? g.props.width : W.width,
              startIndex: L,
              endIndex: H,
              updateId: "brush-".concat(F)
            })
          }), ct(h, "renderReferenceElement", function(g, A, C) {
            if (!g) return null;
            var D = h,
              q = D.clipPathId,
              W = h.state,
              L = W.xAxisMap,
              H = W.yAxisMap,
              F = W.offset,
              z = g.type.defaultProps || {},
              b = g.props,
              O = b.xAxisId,
              E = O === void 0 ? z.xAxisId : O,
              P = b.yAxisId,
              j = P === void 0 ? z.yAxisId : P;
            return ze(g, {
              key: g.key || "".concat(A, "-").concat(C),
              xAxis: L[E],
              yAxis: H[j],
              viewBox: {
                x: F.left,
                y: F.top,
                width: F.width,
                height: F.height
              },
              clipPathId: q
            })
          }), ct(h, "renderActivePoints", function(g) {
            var A = g.item,
              C = g.activePoint,
              D = g.basePoint,
              q = g.childIndex,
              W = g.isRange,
              L = [],
              H = A.props.key,
              F = A.item.type.defaultProps !== void 0 ? U(U({}, A.item.type.defaultProps), A.item.props) : A.item.props,
              z = F.activeDot,
              b = F.dataKey,
              O = U(U({
                index: q,
                dataKey: b,
                cx: C.x,
                cy: C.y,
                r: 4,
                fill: Do(A.item),
                strokeWidth: 2,
                stroke: "#fff",
                payload: C.payload,
                value: C.value
              }, at(z, !1)), Nr(z));
            return L.push(x.renderActiveDot(z, O, "".concat(H, "-activePoint-").concat(q))), D ? L.push(x.renderActiveDot(z, U(U({}, O), {}, {
              cx: D.x,
              cy: D.y
            }), "".concat(H, "-basePoint-").concat(q))) : W && L.push(null), L
          }), ct(h, "renderGraphicChild", function(g, A, C) {
            var D = h.filterFormatItem(g, A, C);
            if (!D) return null;
            var q = h.getTooltipEventType(),
              W = h.state,
              L = W.isTooltipActive,
              H = W.tooltipAxis,
              F = W.activeTooltipIndex,
              z = W.activeLabel,
              b = h.props.children,
              O = Vt(b, ae),
              E = D.props,
              P = E.points,
              j = E.isRange,
              T = E.baseLine,
              R = D.item.type.defaultProps !== void 0 ? U(U({}, D.item.type.defaultProps), D.item.props) : D.item.props,
              B = R.activeDot,
              G = R.hide,
              Z = R.activeBar,
              J = R.activeShape,
              V = !!(!G && L && O && (B || Z || J)),
              dt = {};
            q !== "axis" && O && O.props.trigger === "click" ? dt = {
              onClick: Bo(h.handleItemMouseEnter, g.props.onClick)
            } : q !== "axis" && (dt = {
              onMouseLeave: Bo(h.handleItemMouseLeave, g.props.onMouseLeave),
              onMouseEnter: Bo(h.handleItemMouseEnter, g.props.onMouseEnter)
            });
            var K = ze(g, U(U({}, D.props), dt));

            function st(pt) {
              return typeof H.dataKey == "function" ? H.dataKey(pt.payload) : null
            }
            if (V)
              if (F >= 0) {
                var tt, k;
                if (H.dataKey && !H.allowDuplicatedCategory) {
                  var gt = typeof H.dataKey == "function" ? st : "payload.".concat(H.dataKey.toString());
                  tt = bn(P, gt, z), k = j && T && bn(T, gt, z)
                } else tt = P?.[F], k = j && T && T[F];
                if (J || Z) {
                  var ft = g.props.activeIndex !== void 0 ? g.props.activeIndex : F;
                  return [ze(g, U(U(U({}, D.props), dt), {}, {
                    activeIndex: ft
                  })), null, null]
                }
                if (!(0, Mi.default)(tt)) return [K].concat(ki(h.renderActivePoints({
                  item: D,
                  activePoint: tt,
                  basePoint: k,
                  childIndex: F,
                  isRange: j
                })))
              } else {
                var _t, N = (_t = h.getItemByXY(h.state.activeCoordinate)) !== null && _t !== void 0 ? _t : {
                    graphicalItem: K
                  },
                  et = N.graphicalItem,
                  rt = et.item,
                  Y = rt === void 0 ? g : rt,
                  nt = et.childIndex,
                  ht = U(U(U({}, D.props), dt), {}, {
                    activeIndex: nt
                  });
                return [ze(Y, ht), null, null]
              } return j ? [K, null, null] : [K, null]
          }), ct(h, "renderCustomized", function(g, A, C) {
            return ze(g, U(U({
              key: "recharts-customized-".concat(C)
            }, h.props), h.state))
          }), ct(h, "renderMap", {
            CartesianGrid: {
              handler: al,
              once: !0
            },
            ReferenceArea: {
              handler: h.renderReferenceElement
            },
            ReferenceLine: {
              handler: al
            },
            ReferenceDot: {
              handler: h.renderReferenceElement
            },
            XAxis: {
              handler: al
            },
            YAxis: {
              handler: al
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
          }), h.clipPathId = "".concat((S = w.id) !== null && S !== void 0 ? S : Ge("recharts"), "-clip"), h.throttleTriggeredAfterMouseMove = (0, N_.default)(h.triggeredAfterMouseMove, (_ = w.throttleDelay) !== null && _ !== void 0 ? _ : 1e3 / 60), h.state = {}, h
        }
        return C4(x, v), T4(x, [{
          key: "componentDidMount",
          value: function() {
            var S, _;
            this.addListener(), this.accessibilityManager.setDetails({
              container: this.container,
              offset: {
                left: (S = this.props.margin.left) !== null && S !== void 0 ? S : 0,
                top: (_ = this.props.margin.top) !== null && _ !== void 0 ? _ : 0
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
              _ = S.children,
              h = S.data,
              g = S.height,
              A = S.layout,
              C = Vt(_, ae);
            if (C) {
              var D = C.props.defaultIndex;
              if (!(typeof D != "number" || D < 0 || D > this.state.tooltipTicks.length - 1)) {
                var q = this.state.tooltipTicks[D] && this.state.tooltipTicks[D].value,
                  W = Od(this.state, h, D, q),
                  L = this.state.tooltipTicks[D].coordinate,
                  H = (this.state.offset.top + g) / 2,
                  F = A === "horizontal",
                  z = F ? {
                    x: L,
                    y: H
                  } : {
                    y: L,
                    x: H
                  },
                  b = this.state.formattedGraphicalItems.find(function(E) {
                    var P = E.item;
                    return P.type.name === "Scatter"
                  });
                b && (z = U(U({}, z), b.props.points[D].tooltipPosition), W = b.props.points[D].tooltipPayload);
                var O = {
                  activeTooltipIndex: D,
                  isTooltipActive: !0,
                  activeLabel: q,
                  activePayload: W,
                  activeCoordinate: z
                };
                this.setState(O), this.renderCursor(C), this.accessibilityManager.setIndex(D)
              }
            }
          }
        }, {
          key: "getSnapshotBeforeUpdate",
          value: function(S, _) {
            if (!this.props.accessibilityLayer) return null;
            if (this.state.tooltipTicks !== _.tooltipTicks && this.accessibilityManager.setDetails({
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
            Va([Vt(S.children, ae)], [Vt(this.props.children, ae)]) || this.displayDefaultTooltip()
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel()
          }
        }, {
          key: "getTooltipEventType",
          value: function() {
            var S = Vt(this.props.children, ae);
            if (S && typeof S.props.shared == "boolean") {
              var _ = S.props.shared ? "axis" : "item";
              return u.indexOf(_) >= 0 ? _ : o
            }
            return o
          }
        }, {
          key: "getMouseInfo",
          value: function(S) {
            if (!this.container) return null;
            var _ = this.container,
              h = _.getBoundingClientRect(),
              g = Hx(h),
              A = {
                chartX: Math.round(S.pageX - g.left),
                chartY: Math.round(S.pageY - g.top)
              },
              C = h.width / _.offsetWidth || 1,
              D = this.inRange(A.chartX, A.chartY, C);
            if (!D) return null;
            var q = this.state,
              W = q.xAxisMap,
              L = q.yAxisMap,
              H = this.getTooltipEventType(),
              F = E_(this.state, this.props.data, this.props.layout, D);
            if (H !== "axis" && W && L) {
              var z = Ke(W).scale,
                b = Ke(L).scale,
                O = z && z.invert ? z.invert(A.chartX) : null,
                E = b && b.invert ? b.invert(A.chartY) : null;
              return U(U({}, A), {}, {
                xValue: O,
                yValue: E
              }, F)
            }
            return F ? U(U({}, A), F) : null
          }
        }, {
          key: "inRange",
          value: function(S, _) {
            var h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
              g = this.props.layout,
              A = S / h,
              C = _ / h;
            if (g === "horizontal" || g === "vertical") {
              var D = this.state.offset,
                q = A >= D.left && A <= D.left + D.width && C >= D.top && C <= D.top + D.height;
              return q ? {
                x: A,
                y: C
              } : null
            }
            var W = this.state,
              L = W.angleAxisMap,
              H = W.radiusAxisMap;
            if (L && H) {
              var F = Ke(L);
              return vp({
                x: A,
                y: C
              }, F)
            }
            return null
          }
        }, {
          key: "parseEventsOfWrapper",
          value: function() {
            var S = this.props.children,
              _ = this.getTooltipEventType(),
              h = Vt(S, ae),
              g = {};
            h && _ === "axis" && (h.props.trigger === "click" ? g = {
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
            var A = Nr(this.props, this.handleOuterEvent);
            return U(U({}, A), g)
          }
        }, {
          key: "addListener",
          value: function() {
            rl.on(nl, this.handleReceiveSyncEvent)
          }
        }, {
          key: "removeListener",
          value: function() {
            rl.removeListener(nl, this.handleReceiveSyncEvent)
          }
        }, {
          key: "filterFormatItem",
          value: function(S, _, h) {
            for (var g = this.state.formattedGraphicalItems, A = 0, C = g.length; A < C; A++) {
              var D = g[A];
              if (D.item === S || D.props.key === S.key || _ === Oe(D.item.type) && h === D.childIndex) return D
            }
            return null
          }
        }, {
          key: "renderClipPath",
          value: function() {
            var S = this.clipPathId,
              _ = this.state.offset,
              h = _.left,
              g = _.top,
              A = _.height,
              C = _.width;
            return Ce.createElement("defs", null, Ce.createElement("clipPath", {
              id: S
            }, Ce.createElement("rect", {
              x: h,
              y: g,
              height: A,
              width: C
            })))
          }
        }, {
          key: "getXScales",
          value: function() {
            var S = this.state.xAxisMap;
            return S ? Object.entries(S).reduce(function(_, h) {
              var g = A_(h, 2),
                A = g[0],
                C = g[1];
              return U(U({}, _), {}, ct({}, A, C.scale))
            }, {}) : null
          }
        }, {
          key: "getYScales",
          value: function() {
            var S = this.state.yAxisMap;
            return S ? Object.entries(S).reduce(function(_, h) {
              var g = A_(h, 2),
                A = g[0],
                C = g[1];
              return U(U({}, _), {}, ct({}, A, C.scale))
            }, {}) : null
          }
        }, {
          key: "getXScaleByAxisId",
          value: function(S) {
            var _;
            return (_ = this.state.xAxisMap) === null || _ === void 0 || (_ = _[S]) === null || _ === void 0 ? void 0 : _.scale
          }
        }, {
          key: "getYScaleByAxisId",
          value: function(S) {
            var _;
            return (_ = this.state.yAxisMap) === null || _ === void 0 || (_ = _[S]) === null || _ === void 0 ? void 0 : _.scale
          }
        }, {
          key: "getItemByXY",
          value: function(S) {
            var _ = this.state,
              h = _.formattedGraphicalItems,
              g = _.activeItem;
            if (h && h.length)
              for (var A = 0, C = h.length; A < C; A++) {
                var D = h[A],
                  q = D.props,
                  W = D.item,
                  L = W.type.defaultProps !== void 0 ? U(U({}, W.type.defaultProps), W.props) : W.props,
                  H = Oe(W.type);
                if (H === "Bar") {
                  var F = (q.data || []).find(function(E) {
                    return CO(S, E)
                  });
                  if (F) return {
                    graphicalItem: D,
                    payload: F
                  }
                } else if (H === "RadialBar") {
                  var z = (q.data || []).find(function(E) {
                    return vp(S, E)
                  });
                  if (z) return {
                    graphicalItem: D,
                    payload: z
                  }
                } else if (ua(D, g) || sa(D, g) || fi(D, g)) {
                  var b = eS({
                      graphicalItem: D,
                      activeTooltipItem: g,
                      itemData: L.data
                    }),
                    O = L.activeIndex === void 0 ? b : L.activeIndex;
                  return {
                    graphicalItem: U(U({}, D), {}, {
                      childIndex: O
                    }),
                    payload: fi(D, g) ? L.data[b] : D.props.data[b]
                  }
                }
              }
            return null
          }
        }, {
          key: "render",
          value: function() {
            var S = this;
            if (!Nl(this)) return null;
            var _ = this.props,
              h = _.children,
              g = _.className,
              A = _.width,
              C = _.height,
              D = _.style,
              q = _.compact,
              W = _.title,
              L = _.desc,
              H = __(_, w4),
              F = at(H, !1);
            if (q) return Ce.createElement(Qp, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, Ce.createElement($i, ji({}, F, {
              width: A,
              height: C,
              title: W,
              desc: L
            }), this.renderClipPath(), Rl(h, this.renderMap)));
            if (this.props.accessibilityLayer) {
              var z, b;
              F.tabIndex = (z = this.props.tabIndex) !== null && z !== void 0 ? z : 0, F.role = (b = this.props.role) !== null && b !== void 0 ? b : "application", F.onKeyDown = function(E) {
                S.accessibilityManager.keyboardEvent(E)
              }, F.onFocus = function() {
                S.accessibilityManager.focus()
              }
            }
            var O = this.parseEventsOfWrapper();
            return Ce.createElement(Qp, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, Ce.createElement("div", ji({
              className: ot("recharts-wrapper", g),
              style: U({
                position: "relative",
                cursor: "default",
                width: A,
                height: C
              }, D)
            }, O, {
              ref: function(P) {
                S.container = P
              }
            }), Ce.createElement($i, ji({}, F, {
              width: A,
              height: C,
              title: W,
              desc: L,
              style: W4
            }), this.renderClipPath(), Rl(h, this.renderMap)), this.renderLegend(), this.renderTooltip()))
          }
        }])
      }(R4);
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
        _ = v.children,
        h = v.width,
        g = v.height,
        A = v.layout,
        C = v.stackOffset,
        D = v.margin,
        q = x.dataStartIndex,
        W = x.dataEndIndex;
      if (x.updateId === void 0) {
        var L = j_(v);
        return U(U(U({}, L), {}, {
          updateId: 0
        }, d(U(U({
          props: v
        }, L), {}, {
          updateId: 0
        }), x)), {}, {
          prevDataKey: w,
          prevData: S,
          prevWidth: h,
          prevHeight: g,
          prevLayout: A,
          prevStackOffset: C,
          prevMargin: D,
          prevChildren: _
        })
      }
      if (w !== x.prevDataKey || S !== x.prevData || h !== x.prevWidth || g !== x.prevHeight || A !== x.prevLayout || C !== x.prevStackOffset || !ar(D, x.prevMargin)) {
        var H = j_(v),
          F = {
            chartX: x.chartX,
            chartY: x.chartY,
            isTooltipActive: x.isTooltipActive
          },
          z = U(U({}, E_(x, S, A)), {}, {
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
          prevLayout: A,
          prevStackOffset: C,
          prevMargin: D,
          prevChildren: _
        })
      }
      if (!Va(_, x.prevChildren)) {
        var O, E, P, j, T = Vt(_, ln),
          R = T && (O = (E = T.props) === null || E === void 0 ? void 0 : E.startIndex) !== null && O !== void 0 ? O : q,
          B = T && (P = (j = T.props) === null || j === void 0 ? void 0 : j.endIndex) !== null && P !== void 0 ? P : W,
          G = R !== q || B !== W,
          Z = !(0, Mi.default)(S),
          J = Z && !G ? x.updateId : x.updateId + 1;
        return U(U({
          updateId: J
        }, d(U(U({
          props: v
        }, x), {}, {
          updateId: J,
          dataStartIndex: R,
          dataEndIndex: B
        }), x)), {}, {
          prevChildren: _,
          dataStartIndex: R,
          dataEndIndex: B
        })
      }
      return null
    }), ct(y, "renderActiveDot", function(v, x, w) {
      var S;
      return L4(v) ? S = ze(v, x) : (0, Fe.default)(v) ? S = v(x) : S = Ce.createElement(ci, x), Ce.createElement(bt, {
        className: "recharts-active-dot",
        key: w
      }, S)
    });
    var m = B4(function(x, w) {
      return Ce.createElement(y, ji({}, x, {
        ref: w
      }))
    });
    return m.displayName = y.displayName, m
  };
var Sd = cl({
  chartName: "LineChart",
  GraphicalChild: jr,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: nr
  }, {
    axisType: "yAxis",
    AxisComp: ir
  }],
  formatAxisMap: Ls
});
var Ad = cl({
  chartName: "BarChart",
  GraphicalChild: Be,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: nr
  }, {
    axisType: "yAxis",
    AxisComp: ir
  }],
  formatAxisMap: Ls
});
import "./react-shim-eraudit.js";
import {
  jsx as fl,
  jsxs as _d
} from "./react-jsx-shim-eraudit.js";

function Pd({
  data: t,
  title: e = "AI Intelligence"
}) {
  if (!t) return null;
  let r = Array.isArray(t?.sections) ? t.sections : Y4(t);
  return r.length ? _d("div", {
    className: "rounded-lg my-3",
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      boxShadow: "var(--md-shadow-sm)",
      padding: "1rem 1.25rem"
    },
    children: [_d("h3", {
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
      children: [fl("span", {
        "aria-hidden": "true",
        children: "\u2728"
      }), e]
    }), fl("div", {
      className: "space-y-2",
      children: r.map((n, i) => _d("div", {
        children: [n.title && fl("div", {
          style: {
            fontSize: "var(--fs-xs)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--md-text-tertiary)",
            marginBottom: 4
          },
          children: n.title
        }), fl("p", {
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

function Y4(t) {
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
  Fragment as Ea,
  jsx as M,
  jsxs as $
} from "./react-jsx-shim-eraudit.js";

function mt(t, e = 0) {
  return t == null || t === "" || isNaN(t) ? "\u2014" : Number(t).toLocaleString("th-TH", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  })
}

function Mr(t) {
  return t == null || isNaN(t) ? "\u2014" : `${Number(t).toFixed(1)}%`
}

function B_(t, e) {
  return e > 0 ? Math.round((t - e) / e * 100) : t > 0 ? 100 : 0
}
async function Cr(t, e) {
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
var Ta = ["#94a3b8", "#7c3aed", "#0284c7"],
  q_ = ["#0284c7", "#7c3aed", "#db2777", "#ea580c", "#059669", "#d97706", "#4f46e5", "#0891b2", "#be123c", "#65a30d"];

function J4() {
  let t = new Date,
    e = t.getMonth() + 1,
    r = t.getFullYear();
  return `${e>=10?r:r-1}-10-01`
}

function W_() {
  let t = new Date,
    e = t.getFullYear(),
    r = String(t.getMonth() + 1).padStart(2, "0");
  return `${e}-${r}-01`
}
var Ir = () => new Date().toISOString().slice(0, 10),
  Di = ["#10b981", "#84cc16", "#eab308", "#f97316", "#dc2626"],
  pl = ["aging_0_30", "aging_31_60", "aging_61_90", "aging_91_180", "aging_180_plus"],
  dl = ["0-30 \u0E27\u0E31\u0E19", "31-60 \u0E27\u0E31\u0E19", "61-90 \u0E27\u0E31\u0E19", "91-180 \u0E27\u0E31\u0E19", ">180 \u0E27\u0E31\u0E19"],
  Ni = {
    drug: "#7c3aed",
    lab: "#0284c7",
    xray: "#059669"
  };

function Q4() {
  let [t, e] = Gt(null), [r, n] = Gt(null), [i, o] = Gt(null), [a, u] = Gt(null), [s, l] = Gt(null), [f, c] = Gt(null), [p, d] = Gt(!0), [y, m] = Gt(null), [v, x] = Gt("overview"), [w, S] = Gt(null), [_, h] = Gt(null), g = Z4(null), [A, C] = Gt(W_()), [D, q] = Gt(Ir()), [W, L] = Gt(null), [H, F] = Gt(null), [z, b] = Gt("outstanding"), [O, E] = Gt(!1), P = $e(async () => {
    d(!0), m(null);
    try {
      let [N, et] = await Promise.all([Cr(`/api/customer-insight/screening-summary?_t=${Date.now()}`, {
        credentials: "include"
      }), Cr(`/api/customer-insight/monthly-trend?_t=${Date.now()}`, {
        credentials: "include"
      })]);
      e(N), n(et), Cr("/api/ai/customer/segmentation", {
        credentials: "include"
      }).then(h).catch(() => {})
    } catch (N) {
      m(N.message)
    }
    d(!1)
  }, []), j = $e(async N => {
    try {
      let et = N ? `&pttype=${N}` : "",
        rt = await Cr(`/api/customer-insight/top-diagnosis?${et}&_t=${Date.now()}`, {
          credentials: "include"
        });
      o(rt)
    } catch (et) {
      m(et.message)
    }
  }, []), T = $e(async () => {
    try {
      let N = await Cr(`/api/customer-insight/patient-insight?_t=${Date.now()}`, {
        credentials: "include"
      });
      u(N)
    } catch (N) {
      m(N.message)
    }
  }, []), R = $e(async () => {
    try {
      let N = await Cr(`/api/customer-insight/aging?_t=${Date.now()}`, {
        credentials: "include"
      });
      l(N)
    } catch (N) {
      m(N.message)
    }
  }, []), B = $e(async () => {
    d(!0), m(null);
    try {
      let N = await Cr(`/api/customer-insight/screening-custom?from=${A}&to=${D}&_t=${Date.now()}`, {
        credentials: "include"
      });
      c(N)
    } catch (N) {
      m(N.message)
    }
    d(!1)
  }, [A, D]), G = $e(async N => {
    E(!0);
    try {
      let et = await Cr(`/api/customer-insight/payer-patients?pttype=${N}&sort_by=${z}&_t=${Date.now()}`, {
        credentials: "include"
      });
      F(et)
    } catch (et) {
      F({
        patients: [],
        error: et.message
      })
    }
    E(!1)
  }, [z]), Z = $e(N => {
    L(N), F(null), G(N.pttype_code)
  }, [G]), J = $e(() => {
    L(null), F(null)
  }, []);
  Pa(() => {
    P()
  }, [P]), Pa(() => {
    v === "diagnosis" && j(w)
  }, [v, w, j]), Pa(() => {
    v === "patient-insight" && !a && T()
  }, [v, a, T]), Pa(() => {
    v === "aging" && !s && R()
  }, [v, s, R]), Pa(() => {
    W && G(W.pttype_code)
  }, [z, W, G]);
  let V = t?.fiscal_years || [],
    dt = V.map(N => N.be),
    K = $e(() => {
      if (!g.current) return;
      let N = window.open("", "_blank");
      N.document.write(`<!DOCTYPE html><html><head><title>Customer Insight \u2014 3 \u0E1B\u0E35\u0E07\u0E1A</title>
      <style>body{font-family:Sarabun,sans-serif;padding:20px}table{border-collapse:collapse;width:100%;font-size:10px}
      th,td{border:1px solid #ccc;padding:3px 6px;text-align:right}th{background:#f0f4f8;font-weight:800}
      td:first-child,th:first-child{text-align:left}</style></head><body>`), N.document.write(g.current.outerHTML), N.document.write("</body></html>"), N.document.close(), N.print()
    }, []),
    st = $e(() => {
      if (!t?.payers || V.length < 3) return;
      let N = "\uFEFF",
        et = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let lt of V) et.push(`${lt.be} OPD`, `${lt.be} IPD`, `${lt.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${lt.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${lt.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${lt.be} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      et.push("Growth %");
      let rt = t.payers.map(lt => {
          let it = [lt.pttype_code, lt.pttype_name];
          for (let ut of V) {
            let vt = lt.fys[ut.be];
            it.push(vt.opd_visits, vt.ipd_admissions, vt.total_income, vt.total_paid, vt.total_outstanding, vt.collection_rate)
          }
          return it.push(lt.income_growth), it
        }),
        Y = N + [et, ...rt].map(lt => lt.join(",")).join(`
`),
        nt = new Blob([Y], {
          type: "text/csv;charset=utf-8"
        }),
        ht = URL.createObjectURL(nt),
        pt = document.createElement("a");
      pt.href = ht, pt.download = "BCH360_CustomerInsight_3FY.csv", pt.click(), URL.revokeObjectURL(ht)
    }, [t, V]),
    tt = $e(async () => {
      if (!t?.payers || V.length < 3) return;
      let N = await import("./xlsx-BuHXVOW6.js"),
        et = N.utils.book_new(),
        rt = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let yt of V) rt.push(`${yt.be} \u0E04\u0E23\u0E31\u0E49\u0E07`, `${yt.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${yt.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${yt.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${yt.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      rt.push("Growth %");
      let Y = t.payers.map(yt => {
          let Dt = [yt.pttype_code, yt.pttype_name];
          for (let Rt of V) {
            let zt = yt.fys[Rt.be];
            Dt.push(zt.opd_visits + zt.ipd_admissions, zt.total_income, zt.total_paid, zt.total_outstanding, zt.collection_rate)
          }
          return Dt.push(yt.income_growth), Dt
        }),
        nt = N.utils.aoa_to_sheet([rt, ...Y]);
      nt["!cols"] = rt.map(yt => ({
        wch: Math.min(Math.max(yt.length + 4, 12), 28)
      })), N.utils.book_append_sheet(et, nt, "\u0E2A\u0E23\u0E38\u0E1B\u0E2A\u0E34\u0E17\u0E18\u0E34 3 \u0E1B\u0E35\u0E07\u0E1A");
      let ht = V[2].be,
        pt = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 Xray", "% \u0E22\u0E32", "% Lab", "% Xray"],
        lt = t.payers.map(yt => {
          let Dt = yt.fys[ht],
            Rt = Dt.total_income || 0;
          return [yt.pttype_code, yt.pttype_name, Rt, Dt.opd_drug || 0, Dt.opd_lab || 0, Dt.opd_xray || 0, Rt > 0 ? Math.round(Dt.opd_drug / Rt * 1e3) / 10 : 0, Rt > 0 ? Math.round(Dt.opd_lab / Rt * 1e3) / 10 : 0, Rt > 0 ? Math.round(Dt.opd_xray / Rt * 1e3) / 10 : 0]
        }),
        it = N.utils.aoa_to_sheet([pt, ...lt]);
      if (it["!cols"] = pt.map(yt => ({
          wch: Math.min(Math.max(yt.length + 4, 12), 28)
        })), N.utils.book_append_sheet(et, it, `Service Mix ${ht}`), r?.comparison) {
        let yt = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...V.map(zt => `${zt.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`), ...V.map(zt => `${zt.be} \u0E04\u0E23\u0E31\u0E49\u0E07`)],
          Dt = r.comparison.map(zt => {
            let ge = [zt.month];
            for (let Ri of V) ge.push(zt[`fy${Ri.be}`]?.income || 0);
            for (let Ri of V) ge.push(zt[`fy${Ri.be}`]?.visits || 0);
            return ge
          }),
          Rt = N.utils.aoa_to_sheet([yt, ...Dt]);
        Rt["!cols"] = yt.map(zt => ({
          wch: 14
        })), N.utils.book_append_sheet(et, Rt, "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19")
      }
      if (s?.payers) {
        let yt = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", ...dl, "\u0E23\u0E27\u0E21\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"],
          Dt = s.payers.map(ge => [ge.pttype_code, ge.pttype_name, ...pl.map(Ri => ge[Ri] || 0), ge.total_outstanding || 0]),
          Rt = s.grand_total || {};
        Dt.push(["", "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", ...pl.map(ge => Rt[ge] || 0), Rt.total_outstanding || 0]);
        let zt = N.utils.aoa_to_sheet([yt, ...Dt]);
        zt["!cols"] = yt.map(ge => ({
          wch: Math.min(Math.max(ge.length + 4, 14), 24)
        })), N.utils.book_append_sheet(et, zt, "Aging \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30")
      }
      let ut = [
          ["BCH 360\xB0 Intelligence \u2014 Customer Insight Report"],
          [],
          ["\u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", `${dt.join(" \xB7 ")}`],
          ["\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", t.data_source],
          ["\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E40\u0E21\u0E37\u0E48\u0E2D", new Date().toLocaleString("th-TH")],
          ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34", `${t.payers.length}`],
          ["\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E35\u0E48 Flag", `${t.flagged_count}`],
          [],
          ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team \xB7 BOSSART"]
        ],
        vt = N.utils.aoa_to_sheet(ut);
      vt["!cols"] = [{
        wch: 22
      }, {
        wch: 60
      }], N.utils.book_append_sheet(et, vt, "Meta"), N.writeFile(et, "BCH360_CustomerInsight_3FY.xlsx")
    }, [t, V, dt, r, s]),
    k = {
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
      badge: (N, et) => ({
        fontSize: "9px",
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: "99px",
        background: N,
        color: et
      })
    },
    gt = ({
      label: N,
      icon: et,
      values: rt,
      unit: Y = "",
      accent: nt = "#0284c7",
      reverse: ht = !1
    }) => {
      let pt = rt[2],
        lt = rt[1],
        it = B_(pt, lt),
        ut = ht ? it <= 0 ? "#059669" : "#dc2626" : it >= 0 ? "#059669" : "#dc2626";
      return $("div", {
        className: "rounded-2xl p-4",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          flex: "1 1 200px",
          minWidth: "190px"
        },
        children: [$("div", {
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
            children: et
          }), M("span", {
            style: {
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: N
          })]
        }), $("div", {
          style: {
            fontSize: "20px",
            fontWeight: 900,
            color: nt
          },
          children: [mt(pt), " ", M("span", {
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
          children: dt.map((vt, yt) => $("span", {
            style: {
              color: yt === 2 ? nt : "var(--md-text-tertiary)"
            },
            children: [vt, ": ", mt(rt[yt])]
          }, vt))
        }), lt > 0 && $("div", {
          style: {
            marginTop: "4px",
            fontSize: "10px",
            fontWeight: 800,
            color: ut
          },
          children: [it >= 0 ? "+" : "", it, "% vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"]
        })]
      })
    },
    ft = ({
      active: N,
      payload: et,
      label: rt
    }) => !N || !et?.length ? null : $("div", {
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
        children: rt
      }), et.map((Y, nt) => $("div", {
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
        }), $("span", {
          style: {
            fontWeight: 600,
            color: "var(--md-text-secondary)"
          },
          children: [Y.name, ":"]
        }), M("span", {
          style: {
            fontWeight: 800
          },
          children: mt(Y.value)
        })]
      }, nt))]
    }),
    _t = ({
      value: N
    }) => {
      if (N == null || isNaN(N)) return null;
      let et = N >= 0 ? "#059669" : "#dc2626";
      return $("span", {
        style: {
          fontSize: "9px",
          fontWeight: 800,
          color: et
        },
        children: [N >= 0 ? "+" : "", N, "%"]
      })
    };
  return $("div", {
    className: "space-y-5 animate-fade-in pb-10",
    children: [$("div", {
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
        style: k.badge("rgba(124,58,237,.1)", "#7c3aed"),
        children: "\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \xB7 \u0E2B\u0E25\u0E31\u0E01\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2F"
      }), V.length === 3 && $("span", {
        style: k.badge("rgba(2,132,199,.1)", "#0284c7"),
        children: ["3 \u0E1B\u0E35\u0E07\u0E1A: ", dt[0], " \xB7 ", dt[1], " \xB7 ", dt[2]]
      })]
    }), $("div", {
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
        onClick: P,
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
        onClick: K,
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
      }), M("button", {
        onClick: st,
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
      }), M("button", {
        onClick: tt,
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
    }), $("div", {
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
        value: A,
        max: D,
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
        value: D,
        min: A,
        max: Ir(),
        onChange: N => q(N.target.value),
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
        onClick: B,
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
        from: Ir(),
        to: Ir()
      }, {
        id: "mtd",
        label: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
        from: W_(),
        to: Ir()
      }, {
        id: "last30",
        label: "30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
        from: (() => {
          let N = new Date;
          return N.setDate(N.getDate() - 30), N.toISOString().slice(0, 10)
        })(),
        to: Ir()
      }, {
        id: "last90",
        label: "90 \u0E27\u0E31\u0E19",
        from: (() => {
          let N = new Date;
          return N.setDate(N.getDate() - 90), N.toISOString().slice(0, 10)
        })(),
        to: Ir()
      }, {
        id: "ytd",
        label: "\u0E1B\u0E35\u0E07\u0E1A\u0E19\u0E35\u0E49",
        from: J4(),
        to: Ir()
      }].map(N => M("button", {
        onClick: () => {
          C(N.from), q(N.to)
        },
        style: {
          padding: "4px 10px",
          borderRadius: "6px",
          fontSize: "11px",
          fontWeight: 700,
          cursor: "pointer",
          border: A === N.from && D === N.to ? "1.5px solid #d97706" : "1px solid var(--md-border)",
          background: A === N.from && D === N.to ? "rgba(217,119,6,.08)" : "var(--md-surface)",
          color: A === N.from && D === N.to ? "#d97706" : "var(--md-text-secondary)"
        },
        children: N.label
      }, N.id)), f && $("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          color: "#d97706",
          marginLeft: "auto"
        },
        children: ["\u2713 ", f.window?.from, " \u2192 ", f.window?.to, " \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ", mt(f.grand_total?.total_income), " \u0E1A. \xB7 \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A ", Mr(f.grand_total?.collection_rate)]
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
    }), !p && t && V.length === 3 && v === "overview" && (() => {
      let N = t.grand_totals,
        et = Y => V.map(nt => N[nt.be]?.[Y] || 0),
        rt = (r?.comparison || []).map(Y => {
          let nt = {
            month: Y.month
          };
          for (let ht of V) nt[`fy${ht.be}`] = Y[`fy${ht.be}`]?.income || 0;
          return nt
        }).filter(Y => V.some(nt => Y[`fy${nt.be}`] > 0));
      return $(Ea, {
        children: [$("div", {
          style: {
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          },
          children: [M(gt, {
            icon: "\u{1F465}",
            label: "OPD Visits",
            values: et("opd_visits"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#0284c7"
          }), M(gt, {
            icon: "\u{1F3E5}",
            label: "IPD Admissions",
            values: et("ipd_admissions"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#7c3aed"
          }), M(gt, {
            icon: "\u{1F4B0}",
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
            values: et("total_income"),
            unit: "\u0E1A\u0E32\u0E17",
            accent: "#059669"
          }), M(gt, {
            icon: "\u{1F4CA}",
            label: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A",
            values: V.map(Y => N[Y.be]?.collection_rate || 0),
            unit: "%",
            accent: "#0284c7"
          }), M(gt, {
            icon: "\u{1F6A9}",
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21",
            values: [0, 0, t.flagged_count],
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            accent: "#dc2626"
          })]
        }), rt.length > 0 && $("div", {
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
          }), M(xu, {
            width: "100%",
            height: 300,
            children: $(Sd, {
              data: rt,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [M(ba, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), M(nr, {
                dataKey: "month",
                tick: {
                  fontSize: 11,
                  fontWeight: 700
                }
              }), M(ir, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: Y => Y >= 1e6 ? `${(Y/1e6).toFixed(1)}M` : Y >= 1e3 ? `${(Y/1e3).toFixed(0)}K` : Y
              }), M(ae, {
                content: M(ft, {})
              }), M(Te, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), V.map((Y, nt) => M(jr, {
                type: "monotone",
                dataKey: `fy${Y.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${Y.be}`,
                stroke: Ta[nt],
                strokeWidth: nt === 2 ? 3 : 1.5,
                strokeDasharray: nt === 0 ? "5 5" : void 0,
                dot: {
                  r: nt === 2 ? 4 : 2
                }
              }, Y.be))]
            })
          })]
        }), $("div", {
          className: "rounded-2xl",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            overflow: "hidden"
          },
          ref: g,
          children: [$("div", {
            style: {
              padding: "14px 20px",
              borderBottom: "2px solid var(--md-border)",
              background: "linear-gradient(135deg, rgba(124,58,237,.04), rgba(2,132,199,.04))"
            },
            children: [$("div", {
              style: {
                fontSize: "15px",
                fontWeight: 900,
                color: "var(--md-text-primary)"
              },
              children: ["\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34 \u2014 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 (", dt.join(" \xB7 "), ")"]
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
            children: $("table", {
              style: {
                width: "100%",
                borderCollapse: "collapse"
              },
              children: [$("thead", {
                children: [$("tr", {
                  style: {
                    background: "var(--md-surface-2, rgba(0,0,0,.02))"
                  },
                  children: [M("th", {
                    rowSpan: 2,
                    style: {
                      ...k.th,
                      textAlign: "left",
                      paddingLeft: "14px",
                      borderRight: "2px solid var(--md-border)",
                      verticalAlign: "bottom"
                    },
                    children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                  }), V.map((Y, nt) => $("th", {
                    colSpan: 4,
                    style: {
                      ...k.th,
                      textAlign: "center",
                      borderRight: "2px solid var(--md-border)",
                      background: `${Ta[nt]}10`,
                      color: Ta[nt],
                      fontSize: "11px"
                    },
                    children: ["\u0E1B\u0E35\u0E07\u0E1A ", Y.be]
                  }, Y.be)), M("th", {
                    rowSpan: 2,
                    style: {
                      ...k.th,
                      textAlign: "center",
                      verticalAlign: "bottom"
                    },
                    children: "Growth"
                  }), M("th", {
                    rowSpan: 2,
                    style: {
                      ...k.th,
                      textAlign: "center",
                      verticalAlign: "bottom"
                    },
                    children: "\u0E2A\u0E16\u0E32\u0E19\u0E30"
                  })]
                }), M("tr", {
                  style: {
                    background: "var(--md-surface-2, rgba(0,0,0,.02))"
                  },
                  children: V.map(Y => $(ml.Fragment, {
                    children: [M("th", {
                      style: {
                        ...k.th,
                        fontSize: "9px"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), M("th", {
                      style: {
                        ...k.th,
                        fontSize: "9px"
                      },
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), M("th", {
                      style: {
                        ...k.th,
                        fontSize: "9px"
                      },
                      children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                    }), M("th", {
                      style: {
                        ...k.th,
                        fontSize: "9px",
                        borderRight: "2px solid var(--md-border)"
                      },
                      children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                    })]
                  }, Y.be))
                })]
              }), M("tbody", {
                children: t.payers.map((Y, nt) => {
                  let ht = Y.flag_low_collection || Y.flag_high_outstanding,
                    pt = ht ? "rgba(220,38,38,.04)" : nt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))";
                  return $("tr", {
                    style: {
                      background: pt
                    },
                    children: [$("td", {
                      style: {
                        ...k.tdName,
                        paddingLeft: "14px",
                        borderRight: "2px solid var(--md-border)"
                      },
                      children: [M("span", {
                        style: {
                          fontWeight: 800
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
                      })]
                    }), V.map(lt => {
                      let it = Y.fys[lt.be];
                      return $(ml.Fragment, {
                        children: [M("td", {
                          style: k.td,
                          children: mt(it.opd_visits + it.ipd_admissions)
                        }), M("td", {
                          style: {
                            ...k.td,
                            fontWeight: 700
                          },
                          children: mt(it.total_income)
                        }), M("td", {
                          style: {
                            ...k.td,
                            color: it.total_outstanding > 0 ? "#dc2626" : "inherit"
                          },
                          children: mt(it.total_outstanding)
                        }), M("td", {
                          style: {
                            ...k.td,
                            fontWeight: 800,
                            borderRight: "2px solid var(--md-border)",
                            color: it.collection_rate >= 90 ? "#059669" : it.collection_rate >= 80 ? "#d97706" : it.total_income > 0 ? "#dc2626" : "inherit"
                          },
                          children: it.total_income > 0 ? Mr(it.collection_rate) : "\u2014"
                        })]
                      }, lt.be)
                    }), M("td", {
                      style: {
                        ...k.td,
                        textAlign: "center"
                      },
                      children: M(_t, {
                        value: Y.income_growth
                      })
                    }), M("td", {
                      style: {
                        ...k.td,
                        textAlign: "center"
                      },
                      children: ht ? M("span", {
                        style: k.badge("rgba(220,38,38,.1)", "#dc2626"),
                        children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                      }) : M("span", {
                        style: k.badge("rgba(5,150,105,.1)", "#059669"),
                        children: "\u0E1B\u0E01\u0E15\u0E34"
                      })
                    })]
                  }, Y.pttype_code)
                })
              }), M("tfoot", {
                children: $("tr", {
                  style: {
                    background: "rgba(14,165,233,.06)"
                  },
                  children: [M("td", {
                    style: {
                      ...k.td,
                      textAlign: "left",
                      paddingLeft: "14px",
                      fontWeight: 900,
                      borderRight: "2px solid var(--md-border)",
                      borderTop: "2px solid var(--md-border)"
                    },
                    children: "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
                  }), V.map(Y => {
                    let nt = N[Y.be];
                    return $(ml.Fragment, {
                      children: [M("td", {
                        style: {
                          ...k.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: mt(nt.opd_visits + nt.ipd_admissions)
                      }), M("td", {
                        style: {
                          ...k.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: mt(nt.total_income)
                      }), M("td", {
                        style: {
                          ...k.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)",
                          color: "#dc2626"
                        },
                        children: mt(nt.total_outstanding)
                      }), M("td", {
                        style: {
                          ...k.td,
                          fontWeight: 900,
                          borderRight: "2px solid var(--md-border)",
                          borderTop: "2px solid var(--md-border)",
                          color: nt.collection_rate >= 80 ? "#059669" : "#dc2626"
                        },
                        children: Mr(nt.collection_rate)
                      })]
                    }, Y.be)
                  }), M("td", {
                    style: {
                      ...k.td,
                      textAlign: "center",
                      fontWeight: 900,
                      borderTop: "2px solid var(--md-border)"
                    },
                    children: M(_t, {
                      value: B_(N[V[2].be]?.total_income, N[V[1].be]?.total_income)
                    })
                  }), M("td", {
                    style: {
                      ...k.td,
                      borderTop: "2px solid var(--md-border)"
                    }
                  })]
                })
              })]
            })
          })]
        })]
      })
    })(), !p && t && V.length === 3 && v === "payer-detail" && (() => {
      let et = t.payers.filter(rt => rt._sort_income > 0).slice(0, 12).map(rt => {
        let Y = {
          name: rt.pttype_code
        };
        for (let nt of V) Y[`fy${nt.be}`] = rt.fys[nt.be].total_income;
        return Y
      });
      return $(Ea, {
        children: [$("div", {
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
          }), M(xu, {
            width: "100%",
            height: 350,
            children: $(Ad, {
              data: et,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [M(ba, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), M(nr, {
                dataKey: "name",
                tick: {
                  fontSize: 10,
                  fontWeight: 700
                },
                interval: 0,
                angle: -30,
                textAnchor: "end",
                height: 50
              }), M(ir, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: rt => rt >= 1e6 ? `${(rt/1e6).toFixed(1)}M` : rt >= 1e3 ? `${(rt/1e3).toFixed(0)}K` : rt
              }), M(ae, {
                content: M(ft, {})
              }), M(Te, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), V.map((rt, Y) => M(Be, {
                dataKey: `fy${rt.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${rt.be}`,
                fill: Ta[Y],
                radius: [3, 3, 0, 0]
              }, rt.be))]
            })
          })]
        }), M("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "12px"
          },
          children: t.payers.filter(rt => rt._sort_income > 0).slice(0, 20).map((rt, Y) => {
            let nt = rt.flag_low_collection || rt.flag_high_outstanding,
              ht = rt.fys[V[2].be];
            return $("div", {
              className: "rounded-2xl p-4",
              style: {
                background: "var(--md-surface)",
                border: nt ? "1.5px solid rgba(220,38,38,.3)" : "1px solid var(--md-border)"
              },
              children: [$("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px"
                },
                children: [$("button", {
                  onClick: () => Z(rt),
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
                      color: q_[Y % q_.length],
                      textDecoration: "underline dotted"
                    },
                    children: rt.pttype_code
                  }), M("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-secondary)",
                      marginLeft: "6px"
                    },
                    children: rt.pttype_name
                  }), M("span", {
                    style: {
                      marginLeft: "6px",
                      fontSize: "10px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: "\u{1F50D}"
                  })]
                }), nt ? M("span", {
                  style: k.badge("rgba(220,38,38,.1)", "#dc2626"),
                  children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                }) : M("span", {
                  style: k.badge("rgba(5,150,105,.1)", "#059669"),
                  children: "\u0E1B\u0E01\u0E15\u0E34"
                })]
              }), (() => {
                let pt = rt.fys[V[2].be],
                  lt = pt.opd_drug || 0,
                  it = pt.opd_lab || 0,
                  ut = pt.opd_xray || 0,
                  vt = lt + it + ut;
                if (vt === 0) return null;
                let yt = lt / vt * 100,
                  Dt = it / vt * 100,
                  Rt = ut / vt * 100;
                return $("div", {
                  style: {
                    marginBottom: "8px"
                  },
                  children: [$("div", {
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
                    }), $("span", {
                      children: [mt(vt), " \u0E1A\u0E32\u0E17"]
                    })]
                  }), $("div", {
                    style: {
                      display: "flex",
                      height: "8px",
                      borderRadius: "99px",
                      overflow: "hidden",
                      background: "var(--md-surface-2, rgba(0,0,0,.04))"
                    },
                    children: [lt > 0 && M("div", {
                      style: {
                        width: `${yt}%`,
                        background: Ni.drug
                      },
                      title: `\u{1F48A} \u0E04\u0E48\u0E32\u0E22\u0E32: ${mt(lt)} \u0E1A\u0E32\u0E17 (${yt.toFixed(1)}%)`
                    }), it > 0 && M("div", {
                      style: {
                        width: `${Dt}%`,
                        background: Ni.lab
                      },
                      title: `\u{1F52C} \u0E04\u0E48\u0E32 Lab: ${mt(it)} \u0E1A\u0E32\u0E17 (${Dt.toFixed(1)}%)`
                    }), ut > 0 && M("div", {
                      style: {
                        width: `${Rt}%`,
                        background: Ni.xray
                      },
                      title: `\u2622\uFE0F \u0E04\u0E48\u0E32 X-ray: ${mt(ut)} \u0E1A\u0E32\u0E17 (${Rt.toFixed(1)}%)`
                    })]
                  }), $("div", {
                    style: {
                      display: "flex",
                      gap: "10px",
                      fontSize: "9px",
                      fontWeight: 700,
                      marginTop: "3px"
                    },
                    children: [lt > 0 && $("span", {
                      style: {
                        color: Ni.drug
                      },
                      children: ["\u{1F48A} \u0E22\u0E32 ", yt.toFixed(0), "%"]
                    }), it > 0 && $("span", {
                      style: {
                        color: Ni.lab
                      },
                      children: ["\u{1F52C} Lab ", Dt.toFixed(0), "%"]
                    }), ut > 0 && $("span", {
                      style: {
                        color: Ni.xray
                      },
                      children: ["\u2622\uFE0F Xray ", Rt.toFixed(0), "%"]
                    })]
                  })]
                })
              })(), $("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "10px"
                },
                children: [M("thead", {
                  children: $("tr", {
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
                  children: V.map((pt, lt) => {
                    let it = rt.fys[pt.be];
                    return $("tr", {
                      style: {
                        fontWeight: lt === 2 ? 800 : 600
                      },
                      children: [M("td", {
                        style: {
                          textAlign: "left",
                          padding: "3px 4px",
                          color: Ta[lt]
                        },
                        children: pt.be
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: mt(it.opd_visits + it.ipd_admissions)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: mt(it.total_income)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: it.total_outstanding > 0 ? "#dc2626" : "inherit"
                        },
                        children: mt(it.total_outstanding)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: it.collection_rate >= 90 ? "#059669" : it.collection_rate >= 80 ? "#d97706" : "#dc2626"
                        },
                        children: it.total_income > 0 ? Mr(it.collection_rate) : "\u2014"
                      })]
                    }, pt.be)
                  })
                })]
              }), $("div", {
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
                }), M(_t, {
                  value: rt.income_growth
                }), ht.ipd_avg_rw > 0 && $("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["Avg RW: ", M("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: ht.ipd_avg_rw.toFixed(2)
                  })]
                }), ht.ipd_avg_los > 0 && $("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["LOS: ", $("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: [ht.ipd_avg_los.toFixed(1), "d"]
                  })]
                })]
              })]
            }, rt.pttype_code)
          })
        })]
      })
    })(), !p && v === "diagnosis" && $(Ea, {
      children: [$("div", {
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
        }), $("select", {
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
          }), (t?.payers || []).map(N => $("option", {
            value: N.pttype_code,
            children: [N.pttype_code, " \u2014 ", N.pttype_name]
          }, N.pttype_code))]
        })]
      }), i?.diagnoses && $("div", {
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
          children: $("div", {
            style: {
              fontSize: "15px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: ["Top \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23 \u2014 \u0E1B\u0E35\u0E07\u0E1A ", i.fiscal_year?.be || dt[2], w && $("span", {
              style: {
                ...k.badge("rgba(124,58,237,.1)", "#7c3aed"),
                marginLeft: "8px"
              },
              children: ["\u0E2A\u0E34\u0E17\u0E18\u0E34: ", w]
            })]
          })
        }), M("div", {
          style: {
            overflowX: "auto"
          },
          children: $("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse"
            },
            children: [M("thead", {
              children: $("tr", {
                style: {
                  background: "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("th", {
                  style: {
                    ...k.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), M("th", {
                  style: {
                    ...k.th,
                    textAlign: "left"
                  },
                  children: "ICD-10"
                }), M("th", {
                  style: {
                    ...k.th,
                    textAlign: "left"
                  },
                  children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23"
                }), M("th", {
                  style: k.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), M("th", {
                  style: k.th,
                  children: "\u0E04\u0E19"
                }), M("th", {
                  style: k.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                }), M("th", {
                  style: k.th,
                  children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                }), M("th", {
                  style: k.th,
                  children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                })]
              })
            }), M("tbody", {
              children: i.diagnoses.map((N, et) => $("tr", {
                style: {
                  background: et % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("td", {
                  style: {
                    ...k.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: et + 1
                }), M("td", {
                  style: {
                    ...k.td,
                    textAlign: "left",
                    fontWeight: 800,
                    fontFamily: "monospace"
                  },
                  children: N.icd10
                }), M("td", {
                  style: k.tdName,
                  children: N.name
                }), M("td", {
                  style: k.td,
                  children: mt(N.visits)
                }), M("td", {
                  style: k.td,
                  children: mt(N.patients)
                }), M("td", {
                  style: k.td,
                  children: mt(N.income)
                }), M("td", {
                  style: {
                    ...k.td,
                    color: (N.outstanding || N.remain || 0) > 0 ? "#dc2626" : "inherit",
                    fontWeight: (N.outstanding || N.remain || 0) > 0 ? 800 : 600
                  },
                  children: mt(N.outstanding || N.remain || 0)
                }), M("td", {
                  style: {
                    ...k.td,
                    fontWeight: 800,
                    color: N.collection_rate >= 90 ? "#059669" : N.collection_rate >= 80 ? "#d97706" : "#dc2626"
                  },
                  children: Mr(N.collection_rate)
                })]
              }, N.icd10))
            })]
          })
        })]
      })]
    }), !p && v === "patient-insight" && (a ? (() => {
      let N = a.loyalty,
        et = a.demographics,
        rt = a.inactive,
        Y = a.fiscal_year?.be,
        nt = et.age_bands,
        ht = nt.lt18 + nt.a18_34 + nt.a35_59 + nt.gte60,
        pt = et.sex.male + et.sex.female,
        lt = N.total_unique - pt,
        it = ut => ut ? new Date(ut).toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }) : "\u2014";
      return $(Ea, {
        children: [$("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px"
          },
          children: [$("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #0284c7"
            },
            children: [$("div", {
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
              children: mt(N.total_unique)
            }), $("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [mt(N.total_visits), " visits \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", M("b", {
                children: N.avg_visits_per_patient
              }), " \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19"]
            })]
          }), $("div", {
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
              children: mt(N.new_patients)
            }), $("div", {
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
                children: Mr(N.new_pct)
              }), " \u0E02\u0E2D\u0E07 ", mt(N.total_unique), " \u0E23\u0E32\u0E22"]
            })]
          }), $("div", {
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
              children: mt(N.returning_patients)
            }), $("div", {
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
                children: Mr(N.returning_pct)
              }), " \xB7 Retention rate"]
            })]
          }), $("div", {
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
              children: mt(N.total_income)
            }), $("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: ["\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", M("b", {
                children: mt(N.total_unique > 0 ? Math.round(N.total_income / N.total_unique) : 0)
              }), " \u0E1A\u0E32\u0E17/\u0E04\u0E19"]
            })]
          })]
        }), $("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "12px"
          },
          children: [$("div", {
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
              val: nt.lt18,
              color: "#3b82f6"
            }, {
              label: "18-34 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19\u0E15\u0E49\u0E19)",
              val: nt.a18_34,
              color: "#10b981"
            }, {
              label: "35-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E01\u0E25\u0E32\u0E07)",
              val: nt.a35_59,
              color: "#f59e0b"
            }, {
              label: "60+ \u0E1B\u0E35 (\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38)",
              val: nt.gte60,
              color: "#ef4444"
            }].map(ut => {
              let vt = ht > 0 ? ut.val / ht * 100 : 0;
              return $("div", {
                style: {
                  marginBottom: "10px"
                },
                children: [$("div", {
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
                    children: ut.label
                  }), $("span", {
                    style: {
                      color: ut.color,
                      fontVariantNumeric: "tabular-nums"
                    },
                    children: [mt(ut.val), " ", $("span", {
                      style: {
                        color: "var(--md-text-tertiary)",
                        fontWeight: 600
                      },
                      children: ["(", vt.toFixed(1), "%)"]
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
                      width: `${vt}%`,
                      height: "100%",
                      background: ut.color,
                      borderRadius: "99px",
                      transition: "width .4s ease"
                    }
                  })
                })]
              }, ut.label)
            })]
          }), $("div", {
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
            }), $("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              },
              children: [
                [{
                  label: "\u0E0A\u0E32\u0E22",
                  val: et.sex.male,
                  color: "#3b82f6",
                  icon: "\u2642"
                }, {
                  label: "\u0E2B\u0E0D\u0E34\u0E07",
                  val: et.sex.female,
                  color: "#ec4899",
                  icon: "\u2640"
                }].map(ut => {
                  let vt = pt > 0 ? ut.val / pt * 100 : 0;
                  return $("div", {
                    children: [$("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "4px"
                      },
                      children: [$("span", {
                        style: {
                          fontSize: "12px",
                          fontWeight: 700,
                          color: ut.color
                        },
                        children: [ut.icon, " ", ut.label]
                      }), M("span", {
                        style: {
                          fontSize: "14px",
                          fontWeight: 900,
                          color: ut.color,
                          fontVariantNumeric: "tabular-nums"
                        },
                        children: mt(ut.val)
                      })]
                    }), $("div", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        marginBottom: "4px"
                      },
                      children: [vt.toFixed(1), "%"]
                    }), M("div", {
                      style: {
                        height: "6px",
                        background: "var(--md-surface-2, rgba(0,0,0,.04))",
                        borderRadius: "99px",
                        overflow: "hidden"
                      },
                      children: M("div", {
                        style: {
                          width: `${vt}%`,
                          height: "100%",
                          background: ut.color,
                          borderRadius: "99px"
                        }
                      })
                    })]
                  }, ut.label)
                }), lt > 0 && $("div", {
                  style: {
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: ["\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38: ", mt(lt), " \u0E23\u0E32\u0E22"]
                })
              ]
            })]
          })]
        }), $("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [$("div", {
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
            }), $("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: ["Total \u0E17\u0E35\u0E48\u0E40\u0E04\u0E22\u0E21\u0E32\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", mt(rt.total_patients_ever), " \u0E23\u0E32\u0E22"]
            })]
          }), M("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px"
            },
            children: [{
              label: "\u0E02\u0E32\u0E14 3-6 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: rt.inactive_3_6mo,
              color: "#d97706",
              hint: "\u0E43\u0E01\u0E25\u0E49\u0E40\u0E02\u0E49\u0E32\u0E19\u0E31\u0E14 \xB7 proactive call"
            }, {
              label: "\u0E02\u0E32\u0E14 6-12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: rt.inactive_6_12mo,
              color: "#dc2626",
              hint: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35 \xB7 NCD/chronic risk"
            }, {
              label: "\u0E02\u0E32\u0E14 >12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: rt.inactive_12mo_plus,
              color: "#7c3aed",
              hint: "\u0E23\u0E2D\u0E1A recall \u0E43\u0E2B\u0E0D\u0E48 \xB7 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E2B\u0E32\u0E22\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27"
            }].map(ut => $("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: `${ut.color}08`,
                border: `1px solid ${ut.color}25`
              },
              children: [M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 700,
                  color: ut.color,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  marginBottom: "4px"
                },
                children: ut.label
              }), M("div", {
                style: {
                  fontSize: "22px",
                  fontWeight: 900,
                  color: ut.color,
                  fontVariantNumeric: "tabular-nums"
                },
                children: mt(ut.val)
              }), M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-secondary)",
                  marginTop: "4px"
                },
                children: ut.hint
              })]
            }, ut.label))
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
          }].map(ut => $("div", {
            className: "rounded-2xl",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              overflow: "hidden"
            },
            children: [$("div", {
              style: {
                padding: "12px 16px",
                borderBottom: "2px solid var(--md-border)",
                background: `linear-gradient(135deg, ${ut.accent}08, transparent)`
              },
              children: [M("div", {
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                  color: ut.accent
                },
                children: ut.title
              }), M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: ut.hint
              })]
            }), M("div", {
              style: {
                overflowX: "auto",
                maxHeight: "480px",
                overflowY: "auto"
              },
              children: $("table", {
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
                  children: $("tr", {
                    children: [M("th", {
                      style: {
                        ...k.th,
                        textAlign: "center",
                        width: "32px"
                      },
                      children: "#"
                    }), M("th", {
                      style: {
                        ...k.th,
                        textAlign: "left"
                      },
                      children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                    }), M("th", {
                      style: k.th,
                      children: "\u0E2D\u0E32\u0E22\u0E38"
                    }), M("th", {
                      style: k.th,
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), M("th", {
                      style: k.th,
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), M("th", {
                      style: {
                        ...k.th,
                        textAlign: "left"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                    })]
                  })
                }), $("tbody", {
                  children: [(ut.list || []).map((vt, yt) => $("tr", {
                    style: {
                      background: yt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                    },
                    children: [M("td", {
                      style: {
                        ...k.td,
                        textAlign: "center",
                        color: "var(--md-text-tertiary)"
                      },
                      children: yt + 1
                    }), $("td", {
                      style: k.tdName,
                      children: [M("div", {
                        style: {
                          fontFamily: "monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "var(--md-text-tertiary)"
                        },
                        children: vt.hn
                      }), M("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: 700
                        },
                        children: vt.pt_name || "\u2014"
                      })]
                    }), M("td", {
                      style: k.td,
                      children: vt.age || "\u2014"
                    }), M("td", {
                      style: {
                        ...k.td,
                        fontWeight: 800,
                        color: ut.accent
                      },
                      children: mt(vt.visit_count)
                    }), M("td", {
                      style: {
                        ...k.td,
                        fontWeight: 800
                      },
                      children: mt(vt.total_income)
                    }), M("td", {
                      style: {
                        ...k.td,
                        textAlign: "left",
                        fontSize: "10px",
                        color: "var(--md-text-secondary)"
                      },
                      children: it(vt.last_visit)
                    })]
                  }, vt.hn)), (!ut.list || ut.list.length === 0) && M("tr", {
                    children: M("td", {
                      colSpan: 6,
                      style: {
                        ...k.td,
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
          }, ut.title))
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
        et = s.grand_total || {},
        rt = et.total_outstanding || 0;
      return $(Ea, {
        children: [$("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [$("div", {
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
            }), $("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: [s.window?.from, " \u2192 ", s.window?.to, " \xB7 \u0E19\u0E31\u0E1A\u0E08\u0E32\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E21\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"]
            })]
          }), $("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "10px"
            },
            children: [pl.map((Y, nt) => {
              let ht = et[Y] || 0,
                pt = rt > 0 ? ht / rt * 100 : 0;
              return $("div", {
                style: {
                  padding: "12px",
                  borderRadius: "10px",
                  background: `${Di[nt]}10`,
                  borderLeft: `4px solid ${Di[nt]}`
                },
                children: [M("div", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 800,
                    color: Di[nt],
                    textTransform: "uppercase",
                    letterSpacing: ".04em"
                  },
                  children: dl[nt]
                }), M("div", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    fontFamily: "monospace",
                    marginTop: "4px"
                  },
                  children: mt(ht)
                }), $("div", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: Di[nt],
                    marginTop: "2px"
                  },
                  children: [pt.toFixed(1), "%"]
                })]
              }, Y)
            }), $("div", {
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
                children: mt(rt)
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
        }), $("div", {
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
          }), $("div", {
            style: {
              padding: "12px 18px"
            },
            children: [N.map((Y, nt) => {
              let ht = pl.map((pt, lt) => ({
                v: Y[pt] || 0,
                color: Di[lt],
                label: dl[lt]
              }));
              return $("div", {
                style: {
                  marginBottom: "12px"
                },
                children: [$("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "4px"
                  },
                  children: [$("button", {
                    onClick: () => Z(Y),
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
                  }), $("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 900,
                      fontFamily: "monospace",
                      color: "var(--md-text-primary)"
                    },
                    children: [mt(Y.total_outstanding), " \u0E1A\u0E32\u0E17"]
                  })]
                }), M("div", {
                  style: {
                    display: "flex",
                    height: "24px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "var(--md-surface-2, rgba(0,0,0,.04))"
                  },
                  children: ht.map((pt, lt) => {
                    if (pt.v === 0) return null;
                    let it = Y.total_outstanding > 0 ? pt.v / Y.total_outstanding * 100 : 0;
                    return M("div", {
                      style: {
                        width: `${it}%`,
                        background: pt.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                      },
                      title: `${pt.label}: ${mt(pt.v)} \u0E1A\u0E32\u0E17 (${it.toFixed(1)}%)`,
                      children: it >= 8 && $("span", {
                        style: {
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#fff",
                          textShadow: "0 0 3px rgba(0,0,0,.3)"
                        },
                        children: [it.toFixed(0), "%"]
                      })
                    }, lt)
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
          children: dl.map((Y, nt) => $("div", {
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
                background: Di[nt]
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
      onClick: J,
      children: $("div", {
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
        children: [$("div", {
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
          children: [$("div", {
            children: [$("div", {
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
          }), $("div", {
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
            }), $("select", {
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
              onClick: J,
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
          }) : H?.patients?.length ? $("table", {
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
              children: $("tr", {
                children: [M("th", {
                  style: {
                    ...k.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), M("th", {
                  style: {
                    ...k.th,
                    textAlign: "left"
                  },
                  children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                }), M("th", {
                  style: k.th,
                  children: "\u0E2D\u0E32\u0E22\u0E38"
                }), M("th", {
                  style: k.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), M("th", {
                  style: k.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                }), M("th", {
                  style: k.th,
                  children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                }), M("th", {
                  style: k.th,
                  children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                }), M("th", {
                  style: {
                    ...k.th,
                    textAlign: "left"
                  },
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                })]
              })
            }), M("tbody", {
              children: H.patients.map((N, et) => $("tr", {
                style: {
                  background: et % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("td", {
                  style: {
                    ...k.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: et + 1
                }), $("td", {
                  style: k.tdName,
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
                  style: k.td,
                  children: N.age || "\u2014"
                }), M("td", {
                  style: k.td,
                  children: mt(N.visit_count)
                }), M("td", {
                  style: {
                    ...k.td,
                    fontWeight: 800
                  },
                  children: mt(N.total_income)
                }), M("td", {
                  style: {
                    ...k.td,
                    fontWeight: 800,
                    color: N.total_outstanding > 0 ? "#dc2626" : "inherit"
                  },
                  children: mt(N.total_outstanding)
                }), M("td", {
                  style: {
                    ...k.td,
                    fontWeight: 800,
                    color: N.collection_rate >= 90 ? "#059669" : N.collection_rate >= 80 ? "#d97706" : "#dc2626"
                  },
                  children: Mr(N.collection_rate)
                }), M("td", {
                  style: {
                    ...k.td,
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
        }), $("div", {
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
    }), M(Pd, {
      data: _,
      theme: "customer",
      title: "AI Customer Intelligence"
    }), !p && t && $("div", {
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
var Wot = ml.memo(Q4);
export {
  Wot as
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