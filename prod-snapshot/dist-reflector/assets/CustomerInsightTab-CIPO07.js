var X_ = Object.create;
var Al = Object.defineProperty;
var Y_ = Object.getOwnPropertyDescriptor;
var Z_ = Object.getOwnPropertyNames;
var J_ = Object.getPrototypeOf,
  Q_ = Object.prototype.hasOwnProperty;
var I = (t, e) => () => (e || t((e = {
    exports: {}
  }).exports, e), e.exports),
  tP = (t, e) => {
    for (var r in e) Al(t, r, {
      get: e[r],
      enumerable: !0
    })
  },
  eP = (t, e, r, n) => {
    if (e && typeof e == "object" || typeof e == "function")
      for (let i of Z_(e)) !Q_.call(t, i) && i !== r && Al(t, i, {
        get: () => e[i],
        enumerable: !(n = Y_(e, i)) || n.enumerable
      });
    return t
  };
var et = (t, e, r) => (r = t != null ? X_(J_(t)) : {}, eP(e || !t || !t.__esModule ? Al(r, "default", {
  value: t,
  enumerable: !0
}) : r, t));
var ae = I((f4, Ld) => {
  var nP = Array.isArray;
  Ld.exports = nP
});
var _l = I((p4, Bd) => {
  var iP = typeof global == "object" && global && global.Object === Object && global;
  Bd.exports = iP
});
var We = I((d4, qd) => {
  var oP = _l(),
    aP = typeof self == "object" && self && self.Object === Object && self,
    uP = oP || aP || Function("return this")();
  qd.exports = uP
});
var Sn = I((m4, Wd) => {
  var sP = We(),
    lP = sP.Symbol;
  Wd.exports = lP
});
var Ud = I((h4, $d) => {
  var zd = Sn(),
    Fd = Object.prototype,
    cP = Fd.hasOwnProperty,
    fP = Fd.toString,
    Hi = zd ? zd.toStringTag : void 0;

  function pP(t) {
    var e = cP.call(t, Hi),
      r = t[Hi];
    try {
      t[Hi] = void 0;
      var n = !0
    } catch {}
    var i = fP.call(t);
    return n && (e ? t[Hi] = r : delete t[Hi]), i
  }
  $d.exports = pP
});
var Gd = I((y4, Hd) => {
  var dP = Object.prototype,
    mP = dP.toString;

  function hP(t) {
    return mP.call(t)
  }
  Hd.exports = hP
});
var Ze = I((v4, Xd) => {
  var Kd = Sn(),
    yP = Ud(),
    vP = Gd(),
    gP = "[object Null]",
    bP = "[object Undefined]",
    Vd = Kd ? Kd.toStringTag : void 0;

  function xP(t) {
    return t == null ? t === void 0 ? bP : gP : Vd && Vd in Object(t) ? yP(t) : vP(t)
  }
  Xd.exports = xP
});
var Je = I((g4, Yd) => {
  function wP(t) {
    return t != null && typeof t == "object"
  }
  Yd.exports = wP
});
var Wr = I((b4, Zd) => {
  var OP = Ze(),
    SP = Je(),
    AP = "[object Symbol]";

  function _P(t) {
    return typeof t == "symbol" || SP(t) && OP(t) == AP
  }
  Zd.exports = _P
});
var Ba = I((x4, Jd) => {
  var PP = ae(),
    TP = Wr(),
    EP = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    jP = /^\w*$/;

  function MP(t, e) {
    if (PP(t)) return !1;
    var r = typeof t;
    return r == "number" || r == "symbol" || r == "boolean" || t == null || TP(t) ? !0 : jP.test(t) || !EP.test(t) || e != null && t in Object(e)
  }
  Jd.exports = MP
});
var _e = I((w4, Qd) => {
  function CP(t) {
    var e = typeof t;
    return t != null && (e == "object" || e == "function")
  }
  Qd.exports = CP
});
var Bt = I((O4, tm) => {
  var IP = Ze(),
    kP = _e(),
    DP = "[object AsyncFunction]",
    NP = "[object Function]",
    RP = "[object GeneratorFunction]",
    LP = "[object Proxy]";

  function BP(t) {
    if (!kP(t)) return !1;
    var e = IP(t);
    return e == NP || e == RP || e == DP || e == LP
  }
  tm.exports = BP
});
var rm = I((S4, em) => {
  var qP = We(),
    WP = qP["__core-js_shared__"];
  em.exports = WP
});
var om = I((A4, im) => {
  var Pl = rm(),
    nm = function() {
      var t = /[^.]+$/.exec(Pl && Pl.keys && Pl.keys.IE_PROTO || "");
      return t ? "Symbol(src)_1." + t : ""
    }();

  function zP(t) {
    return !!nm && nm in t
  }
  im.exports = zP
});
var Tl = I((_4, am) => {
  var FP = Function.prototype,
    $P = FP.toString;

  function UP(t) {
    if (t != null) {
      try {
        return $P.call(t)
      } catch {}
      try {
        return t + ""
      } catch {}
    }
    return ""
  }
  am.exports = UP
});
var sm = I((P4, um) => {
  var HP = Bt(),
    GP = om(),
    KP = _e(),
    VP = Tl(),
    XP = /[\\^$.*+?()[\]{}|]/g,
    YP = /^\[object .+?Constructor\]$/,
    ZP = Function.prototype,
    JP = Object.prototype,
    QP = ZP.toString,
    tT = JP.hasOwnProperty,
    eT = RegExp("^" + QP.call(tT).replace(XP, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

  function rT(t) {
    if (!KP(t) || GP(t)) return !1;
    var e = HP(t) ? eT : YP;
    return e.test(VP(t))
  }
  um.exports = rT
});
var cm = I((T4, lm) => {
  function nT(t, e) {
    return t?.[e]
  }
  lm.exports = nT
});
var Sr = I((E4, fm) => {
  var iT = sm(),
    oT = cm();

  function aT(t, e) {
    var r = oT(t, e);
    return iT(r) ? r : void 0
  }
  fm.exports = aT
});
var Gi = I((j4, pm) => {
  var uT = Sr(),
    sT = uT(Object, "create");
  pm.exports = sT
});
var hm = I((M4, mm) => {
  var dm = Gi();

  function lT() {
    this.__data__ = dm ? dm(null) : {}, this.size = 0
  }
  mm.exports = lT
});
var vm = I((C4, ym) => {
  function cT(t) {
    var e = this.has(t) && delete this.__data__[t];
    return this.size -= e ? 1 : 0, e
  }
  ym.exports = cT
});
var bm = I((I4, gm) => {
  var fT = Gi(),
    pT = "__lodash_hash_undefined__",
    dT = Object.prototype,
    mT = dT.hasOwnProperty;

  function hT(t) {
    var e = this.__data__;
    if (fT) {
      var r = e[t];
      return r === pT ? void 0 : r
    }
    return mT.call(e, t) ? e[t] : void 0
  }
  gm.exports = hT
});
var wm = I((k4, xm) => {
  var yT = Gi(),
    vT = Object.prototype,
    gT = vT.hasOwnProperty;

  function bT(t) {
    var e = this.__data__;
    return yT ? e[t] !== void 0 : gT.call(e, t)
  }
  xm.exports = bT
});
var Sm = I((D4, Om) => {
  var xT = Gi(),
    wT = "__lodash_hash_undefined__";

  function OT(t, e) {
    var r = this.__data__;
    return this.size += this.has(t) ? 0 : 1, r[t] = xT && e === void 0 ? wT : e, this
  }
  Om.exports = OT
});
var _m = I((N4, Am) => {
  var ST = hm(),
    AT = vm(),
    _T = bm(),
    PT = wm(),
    TT = Sm();

  function An(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }
  An.prototype.clear = ST;
  An.prototype.delete = AT;
  An.prototype.get = _T;
  An.prototype.has = PT;
  An.prototype.set = TT;
  Am.exports = An
});
var Tm = I((R4, Pm) => {
  function ET() {
    this.__data__ = [], this.size = 0
  }
  Pm.exports = ET
});
var qa = I((L4, Em) => {
  function jT(t, e) {
    return t === e || t !== t && e !== e
  }
  Em.exports = jT
});
var Ki = I((B4, jm) => {
  var MT = qa();

  function CT(t, e) {
    for (var r = t.length; r--;)
      if (MT(t[r][0], e)) return r;
    return -1
  }
  jm.exports = CT
});
var Cm = I((q4, Mm) => {
  var IT = Ki(),
    kT = Array.prototype,
    DT = kT.splice;

  function NT(t) {
    var e = this.__data__,
      r = IT(e, t);
    if (r < 0) return !1;
    var n = e.length - 1;
    return r == n ? e.pop() : DT.call(e, r, 1), --this.size, !0
  }
  Mm.exports = NT
});
var km = I((W4, Im) => {
  var RT = Ki();

  function LT(t) {
    var e = this.__data__,
      r = RT(e, t);
    return r < 0 ? void 0 : e[r][1]
  }
  Im.exports = LT
});
var Nm = I((z4, Dm) => {
  var BT = Ki();

  function qT(t) {
    return BT(this.__data__, t) > -1
  }
  Dm.exports = qT
});
var Lm = I((F4, Rm) => {
  var WT = Ki();

  function zT(t, e) {
    var r = this.__data__,
      n = WT(r, t);
    return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this
  }
  Rm.exports = zT
});
var Vi = I(($4, Bm) => {
  var FT = Tm(),
    $T = Cm(),
    UT = km(),
    HT = Nm(),
    GT = Lm();

  function _n(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }
  _n.prototype.clear = FT;
  _n.prototype.delete = $T;
  _n.prototype.get = UT;
  _n.prototype.has = HT;
  _n.prototype.set = GT;
  Bm.exports = _n
});
var Wa = I((U4, qm) => {
  var KT = Sr(),
    VT = We(),
    XT = KT(VT, "Map");
  qm.exports = XT
});
var Fm = I((H4, zm) => {
  var Wm = _m(),
    YT = Vi(),
    ZT = Wa();

  function JT() {
    this.size = 0, this.__data__ = {
      hash: new Wm,
      map: new(ZT || YT),
      string: new Wm
    }
  }
  zm.exports = JT
});
var Um = I((G4, $m) => {
  function QT(t) {
    var e = typeof t;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null
  }
  $m.exports = QT
});
var Xi = I((K4, Hm) => {
  var tE = Um();

  function eE(t, e) {
    var r = t.__data__;
    return tE(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map
  }
  Hm.exports = eE
});
var Km = I((V4, Gm) => {
  var rE = Xi();

  function nE(t) {
    var e = rE(this, t).delete(t);
    return this.size -= e ? 1 : 0, e
  }
  Gm.exports = nE
});
var Xm = I((X4, Vm) => {
  var iE = Xi();

  function oE(t) {
    return iE(this, t).get(t)
  }
  Vm.exports = oE
});
var Zm = I((Y4, Ym) => {
  var aE = Xi();

  function uE(t) {
    return aE(this, t).has(t)
  }
  Ym.exports = uE
});
var Qm = I((Z4, Jm) => {
  var sE = Xi();

  function lE(t, e) {
    var r = sE(this, t),
      n = r.size;
    return r.set(t, e), this.size += r.size == n ? 0 : 1, this
  }
  Jm.exports = lE
});
var za = I((J4, th) => {
  var cE = Fm(),
    fE = Km(),
    pE = Xm(),
    dE = Zm(),
    mE = Qm();

  function Pn(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }
  Pn.prototype.clear = cE;
  Pn.prototype.delete = fE;
  Pn.prototype.get = pE;
  Pn.prototype.has = dE;
  Pn.prototype.set = mE;
  th.exports = Pn
});
var jl = I((Q4, rh) => {
  var eh = za(),
    hE = "Expected a function";

  function El(t, e) {
    if (typeof t != "function" || e != null && typeof e != "function") throw new TypeError(hE);
    var r = function() {
      var n = arguments,
        i = e ? e.apply(this, n) : n[0],
        o = r.cache;
      if (o.has(i)) return o.get(i);
      var a = t.apply(this, n);
      return r.cache = o.set(i, a) || o, a
    };
    return r.cache = new(El.Cache || eh), r
  }
  El.Cache = eh;
  rh.exports = El
});
var ih = I((t9, nh) => {
  var yE = jl(),
    vE = 500;

  function gE(t) {
    var e = yE(t, function(n) {
        return r.size === vE && r.clear(), n
      }),
      r = e.cache;
    return e
  }
  nh.exports = gE
});
var ah = I((e9, oh) => {
  var bE = ih(),
    xE = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    wE = /\\(\\)?/g,
    OE = bE(function(t) {
      var e = [];
      return t.charCodeAt(0) === 46 && e.push(""), t.replace(xE, function(r, n, i, o) {
        e.push(i ? o.replace(wE, "$1") : n || r)
      }), e
    });
  oh.exports = OE
});
var Fa = I((r9, uh) => {
  function SE(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length, i = Array(n); ++r < n;) i[r] = e(t[r], r, t);
    return i
  }
  uh.exports = SE
});
var dh = I((n9, ph) => {
  var sh = Sn(),
    AE = Fa(),
    _E = ae(),
    PE = Wr(),
    TE = 1 / 0,
    lh = sh ? sh.prototype : void 0,
    ch = lh ? lh.toString : void 0;

  function fh(t) {
    if (typeof t == "string") return t;
    if (_E(t)) return AE(t, fh) + "";
    if (PE(t)) return ch ? ch.call(t) : "";
    var e = t + "";
    return e == "0" && 1 / t == -TE ? "-0" : e
  }
  ph.exports = fh
});
var Ml = I((i9, mh) => {
  var EE = dh();

  function jE(t) {
    return t == null ? "" : EE(t)
  }
  mh.exports = jE
});
var Cl = I((o9, hh) => {
  var ME = ae(),
    CE = Ba(),
    IE = ah(),
    kE = Ml();

  function DE(t, e) {
    return ME(t) ? t : CE(t, e) ? [t] : IE(kE(t))
  }
  hh.exports = DE
});
var Yi = I((a9, yh) => {
  var NE = Wr(),
    RE = 1 / 0;

  function LE(t) {
    if (typeof t == "string" || NE(t)) return t;
    var e = t + "";
    return e == "0" && 1 / t == -RE ? "-0" : e
  }
  yh.exports = LE
});
var $a = I((u9, vh) => {
  var BE = Cl(),
    qE = Yi();

  function WE(t, e) {
    e = BE(e, t);
    for (var r = 0, n = e.length; t != null && r < n;) t = t[qE(e[r++])];
    return r && r == n ? t : void 0
  }
  vh.exports = WE
});
var zr = I((s9, gh) => {
  var zE = $a();

  function FE(t, e, r) {
    var n = t == null ? void 0 : zE(t, e);
    return n === void 0 ? r : n
  }
  gh.exports = FE
});
var Pe = I((l9, bh) => {
  function $E(t) {
    return t == null
  }
  bh.exports = $E
});
var Ua = I((c9, xh) => {
  var UE = Ze(),
    HE = ae(),
    GE = Je(),
    KE = "[object String]";

  function VE(t) {
    return typeof t == "string" || !HE(t) && GE(t) && UE(t) == KE
  }
  xh.exports = VE
});
var Oh = I(Pt => {
  "use strict";
  var Il = Symbol.for("react.element"),
    kl = Symbol.for("react.portal"),
    Ha = Symbol.for("react.fragment"),
    Ga = Symbol.for("react.strict_mode"),
    Ka = Symbol.for("react.profiler"),
    Va = Symbol.for("react.provider"),
    Xa = Symbol.for("react.context"),
    XE = Symbol.for("react.server_context"),
    Ya = Symbol.for("react.forward_ref"),
    Za = Symbol.for("react.suspense"),
    Ja = Symbol.for("react.suspense_list"),
    Qa = Symbol.for("react.memo"),
    tu = Symbol.for("react.lazy"),
    YE = Symbol.for("react.offscreen"),
    wh;
  wh = Symbol.for("react.module.reference");

  function Te(t) {
    if (typeof t == "object" && t !== null) {
      var e = t.$$typeof;
      switch (e) {
        case Il:
          switch (t = t.type, t) {
            case Ha:
            case Ka:
            case Ga:
            case Za:
            case Ja:
              return t;
            default:
              switch (t = t && t.$$typeof, t) {
                case XE:
                case Xa:
                case Ya:
                case tu:
                case Qa:
                case Va:
                  return t;
                default:
                  return e
              }
          }
        case kl:
          return e
      }
    }
  }
  Pt.ContextConsumer = Xa;
  Pt.ContextProvider = Va;
  Pt.Element = Il;
  Pt.ForwardRef = Ya;
  Pt.Fragment = Ha;
  Pt.Lazy = tu;
  Pt.Memo = Qa;
  Pt.Portal = kl;
  Pt.Profiler = Ka;
  Pt.StrictMode = Ga;
  Pt.Suspense = Za;
  Pt.SuspenseList = Ja;
  Pt.isAsyncMode = function() {
    return !1
  };
  Pt.isConcurrentMode = function() {
    return !1
  };
  Pt.isContextConsumer = function(t) {
    return Te(t) === Xa
  };
  Pt.isContextProvider = function(t) {
    return Te(t) === Va
  };
  Pt.isElement = function(t) {
    return typeof t == "object" && t !== null && t.$$typeof === Il
  };
  Pt.isForwardRef = function(t) {
    return Te(t) === Ya
  };
  Pt.isFragment = function(t) {
    return Te(t) === Ha
  };
  Pt.isLazy = function(t) {
    return Te(t) === tu
  };
  Pt.isMemo = function(t) {
    return Te(t) === Qa
  };
  Pt.isPortal = function(t) {
    return Te(t) === kl
  };
  Pt.isProfiler = function(t) {
    return Te(t) === Ka
  };
  Pt.isStrictMode = function(t) {
    return Te(t) === Ga
  };
  Pt.isSuspense = function(t) {
    return Te(t) === Za
  };
  Pt.isSuspenseList = function(t) {
    return Te(t) === Ja
  };
  Pt.isValidElementType = function(t) {
    return typeof t == "string" || typeof t == "function" || t === Ha || t === Ka || t === Ga || t === Za || t === Ja || t === YE || typeof t == "object" && t !== null && (t.$$typeof === tu || t.$$typeof === Qa || t.$$typeof === Va || t.$$typeof === Xa || t.$$typeof === Ya || t.$$typeof === wh || t.getModuleId !== void 0)
  };
  Pt.typeOf = Te
});
var Ah = I((p9, Sh) => {
  "use strict";
  Sh.exports = Oh()
});
var Dl = I((d9, _h) => {
  var ZE = Ze(),
    JE = Je(),
    QE = "[object Number]";

  function tj(t) {
    return typeof t == "number" || JE(t) && ZE(t) == QE
  }
  _h.exports = tj
});
var Nl = I((m9, Ph) => {
  var ej = Dl();

  function rj(t) {
    return ej(t) && t != +t
  }
  Ph.exports = rj
});
var Vh = I((k9, Kh) => {
  function wj(t, e, r) {
    var n = -1,
      i = t.length;
    e < 0 && (e = -e > i ? 0 : i + e), r = r > i ? i : r, r < 0 && (r += i), i = e > r ? 0 : r - e >>> 0, e >>>= 0;
    for (var o = Array(i); ++n < i;) o[n] = t[n + e];
    return o
  }
  Kh.exports = wj
});
var Yh = I((D9, Xh) => {
  var Oj = Vh();

  function Sj(t, e, r) {
    var n = t.length;
    return r = r === void 0 ? n : r, !e && r >= n ? t : Oj(t, e, r)
  }
  Xh.exports = Sj
});
var Xl = I((N9, Zh) => {
  var Aj = "\\ud800-\\udfff",
    _j = "\\u0300-\\u036f",
    Pj = "\\ufe20-\\ufe2f",
    Tj = "\\u20d0-\\u20ff",
    Ej = _j + Pj + Tj,
    jj = "\\ufe0e\\ufe0f",
    Mj = "\\u200d",
    Cj = RegExp("[" + Mj + Aj + Ej + jj + "]");

  function Ij(t) {
    return Cj.test(t)
  }
  Zh.exports = Ij
});
var Qh = I((R9, Jh) => {
  function kj(t) {
    return t.split("")
  }
  Jh.exports = kj
});
var uy = I((L9, ay) => {
  var ty = "\\ud800-\\udfff",
    Dj = "\\u0300-\\u036f",
    Nj = "\\ufe20-\\ufe2f",
    Rj = "\\u20d0-\\u20ff",
    Lj = Dj + Nj + Rj,
    Bj = "\\ufe0e\\ufe0f",
    qj = "[" + ty + "]",
    Yl = "[" + Lj + "]",
    Zl = "\\ud83c[\\udffb-\\udfff]",
    Wj = "(?:" + Yl + "|" + Zl + ")",
    ey = "[^" + ty + "]",
    ry = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    ny = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    zj = "\\u200d",
    iy = Wj + "?",
    oy = "[" + Bj + "]?",
    Fj = "(?:" + zj + "(?:" + [ey, ry, ny].join("|") + ")" + oy + iy + ")*",
    $j = oy + iy + Fj,
    Uj = "(?:" + [ey + Yl + "?", Yl, ry, ny, qj].join("|") + ")",
    Hj = RegExp(Zl + "(?=" + Zl + ")|" + Uj + $j, "g");

  function Gj(t) {
    return t.match(Hj) || []
  }
  ay.exports = Gj
});
var ly = I((B9, sy) => {
  var Kj = Qh(),
    Vj = Xl(),
    Xj = uy();

  function Yj(t) {
    return Vj(t) ? Xj(t) : Kj(t)
  }
  sy.exports = Yj
});
var fy = I((q9, cy) => {
  var Zj = Yh(),
    Jj = Xl(),
    Qj = ly(),
    tM = Ml();

  function eM(t) {
    return function(e) {
      e = tM(e);
      var r = Jj(e) ? Qj(e) : void 0,
        n = r ? r[0] : e.charAt(0),
        i = r ? Zj(r, 1).join("") : e.slice(1);
      return n[t]() + i
    }
  }
  cy.exports = eM
});
var iu = I((W9, py) => {
  var rM = fy(),
    nM = rM("toUpperCase");
  py.exports = nM
});
var Ly = I((UG, Ry) => {
  var DM = Vi();

  function NM() {
    this.__data__ = new DM, this.size = 0
  }
  Ry.exports = NM
});
var qy = I((HG, By) => {
  function RM(t) {
    var e = this.__data__,
      r = e.delete(t);
    return this.size = e.size, r
  }
  By.exports = RM
});
var zy = I((GG, Wy) => {
  function LM(t) {
    return this.__data__.get(t)
  }
  Wy.exports = LM
});
var $y = I((KG, Fy) => {
  function BM(t) {
    return this.__data__.has(t)
  }
  Fy.exports = BM
});
var Hy = I((VG, Uy) => {
  var qM = Vi(),
    WM = Wa(),
    zM = za(),
    FM = 200;

  function $M(t, e) {
    var r = this.__data__;
    if (r instanceof qM) {
      var n = r.__data__;
      if (!WM || n.length < FM - 1) return n.push([t, e]), this.size = ++r.size, this;
      r = this.__data__ = new zM(n)
    }
    return r.set(t, e), this.size = r.size, this
  }
  Uy.exports = $M
});
var Cc = I((XG, Gy) => {
  var UM = Vi(),
    HM = Ly(),
    GM = qy(),
    KM = zy(),
    VM = $y(),
    XM = Hy();

  function qn(t) {
    var e = this.__data__ = new UM(t);
    this.size = e.size
  }
  qn.prototype.clear = HM;
  qn.prototype.delete = GM;
  qn.prototype.get = KM;
  qn.prototype.has = VM;
  qn.prototype.set = XM;
  Gy.exports = qn
});
var Vy = I((YG, Ky) => {
  var YM = "__lodash_hash_undefined__";

  function ZM(t) {
    return this.__data__.set(t, YM), this
  }
  Ky.exports = ZM
});
var Yy = I((ZG, Xy) => {
  function JM(t) {
    return this.__data__.has(t)
  }
  Xy.exports = JM
});
var Ic = I((JG, Zy) => {
  var QM = za(),
    tC = Vy(),
    eC = Yy();

  function du(t) {
    var e = -1,
      r = t == null ? 0 : t.length;
    for (this.__data__ = new QM; ++e < r;) this.add(t[e])
  }
  du.prototype.add = du.prototype.push = tC;
  du.prototype.has = eC;
  Zy.exports = du
});
var kc = I((QG, Jy) => {
  function rC(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length; ++r < n;)
      if (e(t[r], r, t)) return !0;
    return !1
  }
  Jy.exports = rC
});
var Dc = I((t7, Qy) => {
  function nC(t, e) {
    return t.has(e)
  }
  Qy.exports = nC
});
var Nc = I((e7, tv) => {
  var iC = Ic(),
    oC = kc(),
    aC = Dc(),
    uC = 1,
    sC = 2;

  function lC(t, e, r, n, i, o) {
    var a = r & uC,
      u = t.length,
      s = e.length;
    if (u != s && !(a && s > u)) return !1;
    var l = o.get(t),
      f = o.get(e);
    if (l && f) return l == e && f == t;
    var c = -1,
      p = !0,
      d = r & sC ? new iC : void 0;
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
        if (!oC(e, function(x, w) {
            if (!aC(d, w) && (y === x || i(y, x, r, n, o))) return d.push(w)
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
  tv.exports = lC
});
var rv = I((r7, ev) => {
  var cC = We(),
    fC = cC.Uint8Array;
  ev.exports = fC
});
var iv = I((n7, nv) => {
  function pC(t) {
    var e = -1,
      r = Array(t.size);
    return t.forEach(function(n, i) {
      r[++e] = [i, n]
    }), r
  }
  nv.exports = pC
});
var mu = I((i7, ov) => {
  function dC(t) {
    var e = -1,
      r = Array(t.size);
    return t.forEach(function(n) {
      r[++e] = n
    }), r
  }
  ov.exports = dC
});
var cv = I((o7, lv) => {
  var av = Sn(),
    uv = rv(),
    mC = qa(),
    hC = Nc(),
    yC = iv(),
    vC = mu(),
    gC = 1,
    bC = 2,
    xC = "[object Boolean]",
    wC = "[object Date]",
    OC = "[object Error]",
    SC = "[object Map]",
    AC = "[object Number]",
    _C = "[object RegExp]",
    PC = "[object Set]",
    TC = "[object String]",
    EC = "[object Symbol]",
    jC = "[object ArrayBuffer]",
    MC = "[object DataView]",
    sv = av ? av.prototype : void 0,
    Rc = sv ? sv.valueOf : void 0;

  function CC(t, e, r, n, i, o, a) {
    switch (r) {
      case MC:
        if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
        t = t.buffer, e = e.buffer;
      case jC:
        return !(t.byteLength != e.byteLength || !o(new uv(t), new uv(e)));
      case xC:
      case wC:
      case AC:
        return mC(+t, +e);
      case OC:
        return t.name == e.name && t.message == e.message;
      case _C:
      case TC:
        return t == e + "";
      case SC:
        var u = yC;
      case PC:
        var s = n & gC;
        if (u || (u = vC), t.size != e.size && !s) return !1;
        var l = a.get(t);
        if (l) return l == e;
        n |= bC, a.set(t, e);
        var f = hC(u(t), u(e), n, i, o, a);
        return a.delete(t), f;
      case EC:
        if (Rc) return Rc.call(t) == Rc.call(e)
    }
    return !1
  }
  lv.exports = CC
});
var Lc = I((a7, fv) => {
  function IC(t, e) {
    for (var r = -1, n = e.length, i = t.length; ++r < n;) t[i + r] = e[r];
    return t
  }
  fv.exports = IC
});
var dv = I((u7, pv) => {
  var kC = Lc(),
    DC = ae();

  function NC(t, e, r) {
    var n = e(t);
    return DC(t) ? n : kC(n, r(t))
  }
  pv.exports = NC
});
var hv = I((s7, mv) => {
  function RC(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length, i = 0, o = []; ++r < n;) {
      var a = t[r];
      e(a, r, t) && (o[i++] = a)
    }
    return o
  }
  mv.exports = RC
});
var vv = I((l7, yv) => {
  function LC() {
    return []
  }
  yv.exports = LC
});
var xv = I((c7, bv) => {
  var BC = hv(),
    qC = vv(),
    WC = Object.prototype,
    zC = WC.propertyIsEnumerable,
    gv = Object.getOwnPropertySymbols,
    FC = gv ? function(t) {
      return t == null ? [] : (t = Object(t), BC(gv(t), function(e) {
        return zC.call(t, e)
      }))
    } : qC;
  bv.exports = FC
});
var Ov = I((f7, wv) => {
  function $C(t, e) {
    for (var r = -1, n = Array(t); ++r < t;) n[r] = e(r);
    return n
  }
  wv.exports = $C
});
var Av = I((p7, Sv) => {
  var UC = Ze(),
    HC = Je(),
    GC = "[object Arguments]";

  function KC(t) {
    return HC(t) && UC(t) == GC
  }
  Sv.exports = KC
});
var hu = I((d7, Tv) => {
  var _v = Av(),
    VC = Je(),
    Pv = Object.prototype,
    XC = Pv.hasOwnProperty,
    YC = Pv.propertyIsEnumerable,
    ZC = _v(function() {
      return arguments
    }()) ? _v : function(t) {
      return VC(t) && XC.call(t, "callee") && !YC.call(t, "callee")
    };
  Tv.exports = ZC
});
var jv = I((m7, Ev) => {
  function JC() {
    return !1
  }
  Ev.exports = JC
});
var Bc = I((no, Wn) => {
  var QC = We(),
    tI = jv(),
    Iv = typeof no == "object" && no && !no.nodeType && no,
    Mv = Iv && typeof Wn == "object" && Wn && !Wn.nodeType && Wn,
    eI = Mv && Mv.exports === Iv,
    Cv = eI ? QC.Buffer : void 0,
    rI = Cv ? Cv.isBuffer : void 0,
    nI = rI || tI;
  Wn.exports = nI
});
var yu = I((h7, kv) => {
  var iI = 9007199254740991,
    oI = /^(?:0|[1-9]\d*)$/;

  function aI(t, e) {
    var r = typeof t;
    return e = e ?? iI, !!e && (r == "number" || r != "symbol" && oI.test(t)) && t > -1 && t % 1 == 0 && t < e
  }
  kv.exports = aI
});
var vu = I((y7, Dv) => {
  var uI = 9007199254740991;

  function sI(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= uI
  }
  Dv.exports = sI
});
var Rv = I((v7, Nv) => {
  var lI = Ze(),
    cI = vu(),
    fI = Je(),
    pI = "[object Arguments]",
    dI = "[object Array]",
    mI = "[object Boolean]",
    hI = "[object Date]",
    yI = "[object Error]",
    vI = "[object Function]",
    gI = "[object Map]",
    bI = "[object Number]",
    xI = "[object Object]",
    wI = "[object RegExp]",
    OI = "[object Set]",
    SI = "[object String]",
    AI = "[object WeakMap]",
    _I = "[object ArrayBuffer]",
    PI = "[object DataView]",
    TI = "[object Float32Array]",
    EI = "[object Float64Array]",
    jI = "[object Int8Array]",
    MI = "[object Int16Array]",
    CI = "[object Int32Array]",
    II = "[object Uint8Array]",
    kI = "[object Uint8ClampedArray]",
    DI = "[object Uint16Array]",
    NI = "[object Uint32Array]",
    Ct = {};
  Ct[TI] = Ct[EI] = Ct[jI] = Ct[MI] = Ct[CI] = Ct[II] = Ct[kI] = Ct[DI] = Ct[NI] = !0;
  Ct[pI] = Ct[dI] = Ct[_I] = Ct[mI] = Ct[PI] = Ct[hI] = Ct[yI] = Ct[vI] = Ct[gI] = Ct[bI] = Ct[xI] = Ct[wI] = Ct[OI] = Ct[SI] = Ct[AI] = !1;

  function RI(t) {
    return fI(t) && cI(t.length) && !!Ct[lI(t)]
  }
  Nv.exports = RI
});
var qc = I((g7, Lv) => {
  function LI(t) {
    return function(e) {
      return t(e)
    }
  }
  Lv.exports = LI
});
var qv = I((io, zn) => {
  var BI = _l(),
    Bv = typeof io == "object" && io && !io.nodeType && io,
    oo = Bv && typeof zn == "object" && zn && !zn.nodeType && zn,
    qI = oo && oo.exports === Bv,
    Wc = qI && BI.process,
    WI = function() {
      try {
        var t = oo && oo.require && oo.require("util").types;
        return t || Wc && Wc.binding && Wc.binding("util")
      } catch {}
    }();
  zn.exports = WI
});
var zc = I((b7, Fv) => {
  var zI = Rv(),
    FI = qc(),
    Wv = qv(),
    zv = Wv && Wv.isTypedArray,
    $I = zv ? FI(zv) : zI;
  Fv.exports = $I
});
var Uv = I((x7, $v) => {
  var UI = Ov(),
    HI = hu(),
    GI = ae(),
    KI = Bc(),
    VI = yu(),
    XI = zc(),
    YI = Object.prototype,
    ZI = YI.hasOwnProperty;

  function JI(t, e) {
    var r = GI(t),
      n = !r && HI(t),
      i = !r && !n && KI(t),
      o = !r && !n && !i && XI(t),
      a = r || n || i || o,
      u = a ? UI(t.length, String) : [],
      s = u.length;
    for (var l in t)(e || ZI.call(t, l)) && !(a && (l == "length" || i && (l == "offset" || l == "parent") || o && (l == "buffer" || l == "byteLength" || l == "byteOffset") || VI(l, s))) && u.push(l);
    return u
  }
  $v.exports = JI
});
var Gv = I((w7, Hv) => {
  var QI = Object.prototype;

  function tk(t) {
    var e = t && t.constructor,
      r = typeof e == "function" && e.prototype || QI;
    return t === r
  }
  Hv.exports = tk
});
var Fc = I((O7, Kv) => {
  function ek(t, e) {
    return function(r) {
      return t(e(r))
    }
  }
  Kv.exports = ek
});
var Xv = I((S7, Vv) => {
  var rk = Fc(),
    nk = rk(Object.keys, Object);
  Vv.exports = nk
});
var Zv = I((A7, Yv) => {
  var ik = Gv(),
    ok = Xv(),
    ak = Object.prototype,
    uk = ak.hasOwnProperty;

  function sk(t) {
    if (!ik(t)) return ok(t);
    var e = [];
    for (var r in Object(t)) uk.call(t, r) && r != "constructor" && e.push(r);
    return e
  }
  Yv.exports = sk
});
var Fn = I((_7, Jv) => {
  var lk = Bt(),
    ck = vu();

  function fk(t) {
    return t != null && ck(t.length) && !lk(t)
  }
  Jv.exports = fk
});
var ao = I((P7, Qv) => {
  var pk = Uv(),
    dk = Zv(),
    mk = Fn();

  function hk(t) {
    return mk(t) ? pk(t) : dk(t)
  }
  Qv.exports = hk
});
var eg = I((T7, tg) => {
  var yk = dv(),
    vk = xv(),
    gk = ao();

  function bk(t) {
    return yk(t, gk, vk)
  }
  tg.exports = bk
});
var ig = I((E7, ng) => {
  var rg = eg(),
    xk = 1,
    wk = Object.prototype,
    Ok = wk.hasOwnProperty;

  function Sk(t, e, r, n, i, o) {
    var a = r & xk,
      u = rg(t),
      s = u.length,
      l = rg(e),
      f = l.length;
    if (s != f && !a) return !1;
    for (var c = s; c--;) {
      var p = u[c];
      if (!(a ? p in e : Ok.call(e, p))) return !1
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
  ng.exports = Sk
});
var ag = I((j7, og) => {
  var Ak = Sr(),
    _k = We(),
    Pk = Ak(_k, "DataView");
  og.exports = Pk
});
var sg = I((M7, ug) => {
  var Tk = Sr(),
    Ek = We(),
    jk = Tk(Ek, "Promise");
  ug.exports = jk
});
var $c = I((C7, lg) => {
  var Mk = Sr(),
    Ck = We(),
    Ik = Mk(Ck, "Set");
  lg.exports = Ik
});
var fg = I((I7, cg) => {
  var kk = Sr(),
    Dk = We(),
    Nk = kk(Dk, "WeakMap");
  cg.exports = Nk
});
var bg = I((k7, gg) => {
  var Uc = ag(),
    Hc = Wa(),
    Gc = sg(),
    Kc = $c(),
    Vc = fg(),
    vg = Ze(),
    $n = Tl(),
    pg = "[object Map]",
    Rk = "[object Object]",
    dg = "[object Promise]",
    mg = "[object Set]",
    hg = "[object WeakMap]",
    yg = "[object DataView]",
    Lk = $n(Uc),
    Bk = $n(Hc),
    qk = $n(Gc),
    Wk = $n(Kc),
    zk = $n(Vc),
    Kr = vg;
  (Uc && Kr(new Uc(new ArrayBuffer(1))) != yg || Hc && Kr(new Hc) != pg || Gc && Kr(Gc.resolve()) != dg || Kc && Kr(new Kc) != mg || Vc && Kr(new Vc) != hg) && (Kr = function(t) {
    var e = vg(t),
      r = e == Rk ? t.constructor : void 0,
      n = r ? $n(r) : "";
    if (n) switch (n) {
      case Lk:
        return yg;
      case Bk:
        return pg;
      case qk:
        return dg;
      case Wk:
        return mg;
      case zk:
        return hg
    }
    return e
  });
  gg.exports = Kr
});
var Tg = I((D7, Pg) => {
  var Xc = Cc(),
    Fk = Nc(),
    $k = cv(),
    Uk = ig(),
    xg = bg(),
    wg = ae(),
    Og = Bc(),
    Hk = zc(),
    Gk = 1,
    Sg = "[object Arguments]",
    Ag = "[object Array]",
    gu = "[object Object]",
    Kk = Object.prototype,
    _g = Kk.hasOwnProperty;

  function Vk(t, e, r, n, i, o) {
    var a = wg(t),
      u = wg(e),
      s = a ? Ag : xg(t),
      l = u ? Ag : xg(e);
    s = s == Sg ? gu : s, l = l == Sg ? gu : l;
    var f = s == gu,
      c = l == gu,
      p = s == l;
    if (p && Og(t)) {
      if (!Og(e)) return !1;
      a = !0, f = !1
    }
    if (p && !f) return o || (o = new Xc), a || Hk(t) ? Fk(t, e, r, n, i, o) : $k(t, e, s, r, n, i, o);
    if (!(r & Gk)) {
      var d = f && _g.call(t, "__wrapped__"),
        y = c && _g.call(e, "__wrapped__");
      if (d || y) {
        var m = d ? t.value() : t,
          v = y ? e.value() : e;
        return o || (o = new Xc), i(m, v, r, n, o)
      }
    }
    return p ? (o || (o = new Xc), Uk(t, e, r, n, i, o)) : !1
  }
  Pg.exports = Vk
});
var bu = I((N7, Mg) => {
  var Xk = Tg(),
    Eg = Je();

  function jg(t, e, r, n, i) {
    return t === e ? !0 : t == null || e == null || !Eg(t) && !Eg(e) ? t !== t && e !== e : Xk(t, e, r, n, jg, i)
  }
  Mg.exports = jg
});
var Ig = I((R7, Cg) => {
  var Yk = Cc(),
    Zk = bu(),
    Jk = 1,
    Qk = 2;

  function t2(t, e, r, n) {
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
        var c = new Yk;
        if (n) var p = n(l, f, s, t, e, c);
        if (!(p === void 0 ? Zk(f, l, Jk | Qk, n, c) : p)) return !1
      }
    }
    return !0
  }
  Cg.exports = t2
});
var Yc = I((L7, kg) => {
  var e2 = _e();

  function r2(t) {
    return t === t && !e2(t)
  }
  kg.exports = r2
});
var Ng = I((B7, Dg) => {
  var n2 = Yc(),
    i2 = ao();

  function o2(t) {
    for (var e = i2(t), r = e.length; r--;) {
      var n = e[r],
        i = t[n];
      e[r] = [n, i, n2(i)]
    }
    return e
  }
  Dg.exports = o2
});
var Zc = I((q7, Rg) => {
  function a2(t, e) {
    return function(r) {
      return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r))
    }
  }
  Rg.exports = a2
});
var Bg = I((W7, Lg) => {
  var u2 = Ig(),
    s2 = Ng(),
    l2 = Zc();

  function c2(t) {
    var e = s2(t);
    return e.length == 1 && e[0][2] ? l2(e[0][0], e[0][1]) : function(r) {
      return r === t || u2(r, t, e)
    }
  }
  Lg.exports = c2
});
var Wg = I((z7, qg) => {
  function f2(t, e) {
    return t != null && e in Object(t)
  }
  qg.exports = f2
});
var Fg = I((F7, zg) => {
  var p2 = Cl(),
    d2 = hu(),
    m2 = ae(),
    h2 = yu(),
    y2 = vu(),
    v2 = Yi();

  function g2(t, e, r) {
    e = p2(e, t);
    for (var n = -1, i = e.length, o = !1; ++n < i;) {
      var a = v2(e[n]);
      if (!(o = t != null && r(t, a))) break;
      t = t[a]
    }
    return o || ++n != i ? o : (i = t == null ? 0 : t.length, !!i && y2(i) && h2(a, i) && (m2(t) || d2(t)))
  }
  zg.exports = g2
});
var Ug = I(($7, $g) => {
  var b2 = Wg(),
    x2 = Fg();

  function w2(t, e) {
    return t != null && x2(t, e, b2)
  }
  $g.exports = w2
});
var Gg = I((U7, Hg) => {
  var O2 = bu(),
    S2 = zr(),
    A2 = Ug(),
    _2 = Ba(),
    P2 = Yc(),
    T2 = Zc(),
    E2 = Yi(),
    j2 = 1,
    M2 = 2;

  function C2(t, e) {
    return _2(t) && P2(e) ? T2(E2(t), e) : function(r) {
      var n = S2(r, t);
      return n === void 0 && n === e ? A2(r, t) : O2(e, n, j2 | M2)
    }
  }
  Hg.exports = C2
});
var Vr = I((H7, Kg) => {
  function I2(t) {
    return t
  }
  Kg.exports = I2
});
var Xg = I((G7, Vg) => {
  function k2(t) {
    return function(e) {
      return e?.[t]
    }
  }
  Vg.exports = k2
});
var Zg = I((K7, Yg) => {
  var D2 = $a();

  function N2(t) {
    return function(e) {
      return D2(e, t)
    }
  }
  Yg.exports = N2
});
var Qg = I((V7, Jg) => {
  var R2 = Xg(),
    L2 = Zg(),
    B2 = Ba(),
    q2 = Yi();

  function W2(t) {
    return B2(t) ? R2(q2(t)) : L2(t)
  }
  Jg.exports = W2
});
var mr = I((X7, tb) => {
  var z2 = Bg(),
    F2 = Gg(),
    $2 = Vr(),
    U2 = ae(),
    H2 = Qg();

  function G2(t) {
    return typeof t == "function" ? t : t == null ? $2 : typeof t == "object" ? U2(t) ? F2(t[0], t[1]) : z2(t) : H2(t)
  }
  tb.exports = G2
});
var Jc = I((Y7, eb) => {
  function K2(t, e, r, n) {
    for (var i = t.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
      if (e(t[o], o, t)) return o;
    return -1
  }
  eb.exports = K2
});
var nb = I((Z7, rb) => {
  function V2(t) {
    return t !== t
  }
  rb.exports = V2
});
var ob = I((J7, ib) => {
  function X2(t, e, r) {
    for (var n = r - 1, i = t.length; ++n < i;)
      if (t[n] === e) return n;
    return -1
  }
  ib.exports = X2
});
var ub = I((Q7, ab) => {
  var Y2 = Jc(),
    Z2 = nb(),
    J2 = ob();

  function Q2(t, e, r) {
    return e === e ? J2(t, e, r) : Y2(t, Z2, r)
  }
  ab.exports = Q2
});
var lb = I((tK, sb) => {
  var tD = ub();

  function eD(t, e) {
    var r = t == null ? 0 : t.length;
    return !!r && tD(t, e, 0) > -1
  }
  sb.exports = eD
});
var fb = I((eK, cb) => {
  function rD(t, e, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i;)
      if (r(e, t[n])) return !0;
    return !1
  }
  cb.exports = rD
});
var db = I((rK, pb) => {
  function nD() {}
  pb.exports = nD
});
var hb = I((nK, mb) => {
  var Qc = $c(),
    iD = db(),
    oD = mu(),
    aD = 1 / 0,
    uD = Qc && 1 / oD(new Qc([, -0]))[1] == aD ? function(t) {
      return new Qc(t)
    } : iD;
  mb.exports = uD
});
var vb = I((iK, yb) => {
  var sD = Ic(),
    lD = lb(),
    cD = fb(),
    fD = Dc(),
    pD = hb(),
    dD = mu(),
    mD = 200;

  function hD(t, e, r) {
    var n = -1,
      i = lD,
      o = t.length,
      a = !0,
      u = [],
      s = u;
    if (r) a = !1, i = cD;
    else if (o >= mD) {
      var l = e ? null : pD(t);
      if (l) return dD(l);
      a = !1, i = fD, s = new sD
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
  yb.exports = hD
});
var bb = I((oK, gb) => {
  var yD = mr(),
    vD = vb();

  function gD(t, e) {
    return t && t.length ? vD(t, yD(e, 2)) : []
  }
  gb.exports = gD
});
var jb = I((pK, Eb) => {
  var Pb = Sn(),
    ID = hu(),
    kD = ae(),
    Tb = Pb ? Pb.isConcatSpreadable : void 0;

  function DD(t) {
    return kD(t) || ID(t) || !!(Tb && t && t[Tb])
  }
  Eb.exports = DD
});
var rf = I((dK, Cb) => {
  var ND = Lc(),
    RD = jb();

  function Mb(t, e, r, n, i) {
    var o = -1,
      a = t.length;
    for (r || (r = RD), i || (i = []); ++o < a;) {
      var u = t[o];
      e > 0 && r(u) ? e > 1 ? Mb(u, e - 1, r, n, i) : ND(i, u) : n || (i[i.length] = u)
    }
    return i
  }
  Cb.exports = Mb
});
var kb = I((mK, Ib) => {
  function LD(t) {
    return function(e, r, n) {
      for (var i = -1, o = Object(e), a = n(e), u = a.length; u--;) {
        var s = a[t ? u : ++i];
        if (r(o[s], s, o) === !1) break
      }
      return e
    }
  }
  Ib.exports = LD
});
var Nb = I((hK, Db) => {
  var BD = kb(),
    qD = BD();
  Db.exports = qD
});
var nf = I((yK, Rb) => {
  var WD = Nb(),
    zD = ao();

  function FD(t, e) {
    return t && WD(t, e, zD)
  }
  Rb.exports = FD
});
var Bb = I((vK, Lb) => {
  var $D = Fn();

  function UD(t, e) {
    return function(r, n) {
      if (r == null) return r;
      if (!$D(r)) return t(r, n);
      for (var i = r.length, o = e ? i : -1, a = Object(r);
        (e ? o-- : ++o < i) && n(a[o], o, a) !== !1;);
      return r
    }
  }
  Lb.exports = UD
});
var Su = I((gK, qb) => {
  var HD = nf(),
    GD = Bb(),
    KD = GD(HD);
  qb.exports = KD
});
var of = I((bK, Wb) => {
  var VD = Su(),
    XD = Fn();

  function YD(t, e) {
    var r = -1,
      n = XD(t) ? Array(t.length) : [];
    return VD(t, function(i, o, a) {
      n[++r] = e(i, o, a)
    }), n
  }
  Wb.exports = YD
});
var Fb = I((xK, zb) => {
  function ZD(t, e) {
    var r = t.length;
    for (t.sort(e); r--;) t[r] = t[r].value;
    return t
  }
  zb.exports = ZD
});
var Hb = I((wK, Ub) => {
  var $b = Wr();

  function JD(t, e) {
    if (t !== e) {
      var r = t !== void 0,
        n = t === null,
        i = t === t,
        o = $b(t),
        a = e !== void 0,
        u = e === null,
        s = e === e,
        l = $b(e);
      if (!u && !l && !o && t > e || o && a && s && !u && !l || n && a && s || !r && s || !i) return 1;
      if (!n && !o && !l && t < e || l && r && i && !n && !o || u && r && i || !a && i || !s) return -1
    }
    return 0
  }
  Ub.exports = JD
});
var Kb = I((OK, Gb) => {
  var QD = Hb();

  function tN(t, e, r) {
    for (var n = -1, i = t.criteria, o = e.criteria, a = i.length, u = r.length; ++n < a;) {
      var s = QD(i[n], o[n]);
      if (s) {
        if (n >= u) return s;
        var l = r[n];
        return s * (l == "desc" ? -1 : 1)
      }
    }
    return t.index - e.index
  }
  Gb.exports = tN
});
var Xb = I((SK, Vb) => {
  var af = Fa(),
    eN = $a(),
    rN = mr(),
    nN = of(),
    iN = Fb(),
    oN = qc(),
    aN = Kb(),
    uN = Vr(),
    sN = ae();

  function lN(t, e, r) {
    e.length ? e = af(e, function(o) {
      return sN(o) ? function(a) {
        return eN(a, o.length === 1 ? o[0] : o)
      } : o
    }) : e = [uN];
    var n = -1;
    e = af(e, oN(rN));
    var i = nN(t, function(o, a, u) {
      var s = af(e, function(l) {
        return l(o)
      });
      return {
        criteria: s,
        index: ++n,
        value: o
      }
    });
    return iN(i, function(o, a) {
      return aN(o, a, r)
    })
  }
  Vb.exports = lN
});
var Zb = I((AK, Yb) => {
  function cN(t, e, r) {
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
  Yb.exports = cN
});
var tx = I((_K, Qb) => {
  var fN = Zb(),
    Jb = Math.max;

  function pN(t, e, r) {
    return e = Jb(e === void 0 ? t.length - 1 : e, 0),
      function() {
        for (var n = arguments, i = -1, o = Jb(n.length - e, 0), a = Array(o); ++i < o;) a[i] = n[e + i];
        i = -1;
        for (var u = Array(e + 1); ++i < e;) u[i] = n[i];
        return u[e] = r(a), fN(t, this, u)
      }
  }
  Qb.exports = pN
});
var rx = I((PK, ex) => {
  function dN(t) {
    return function() {
      return t
    }
  }
  ex.exports = dN
});
var uf = I((TK, nx) => {
  var mN = Sr(),
    hN = function() {
      try {
        var t = mN(Object, "defineProperty");
        return t({}, "", {}), t
      } catch {}
    }();
  nx.exports = hN
});
var ax = I((EK, ox) => {
  var yN = rx(),
    ix = uf(),
    vN = Vr(),
    gN = ix ? function(t, e) {
      return ix(t, "toString", {
        configurable: !0,
        enumerable: !1,
        value: yN(e),
        writable: !0
      })
    } : vN;
  ox.exports = gN
});
var sx = I((jK, ux) => {
  var bN = 800,
    xN = 16,
    wN = Date.now;

  function ON(t) {
    var e = 0,
      r = 0;
    return function() {
      var n = wN(),
        i = xN - (n - r);
      if (r = n, i > 0) {
        if (++e >= bN) return arguments[0]
      } else e = 0;
      return t.apply(void 0, arguments)
    }
  }
  ux.exports = ON
});
var cx = I((MK, lx) => {
  var SN = ax(),
    AN = sx(),
    _N = AN(SN);
  lx.exports = _N
});
var px = I((CK, fx) => {
  var PN = Vr(),
    TN = tx(),
    EN = cx();

  function jN(t, e) {
    return EN(TN(t, e, PN), t + "")
  }
  fx.exports = jN
});
var so = I((IK, dx) => {
  var MN = qa(),
    CN = Fn(),
    IN = yu(),
    kN = _e();

  function DN(t, e, r) {
    if (!kN(r)) return !1;
    var n = typeof e;
    return (n == "number" ? CN(r) && IN(e, r.length) : n == "string" && e in r) ? MN(r[e], t) : !1
  }
  dx.exports = DN
});
var Au = I((kK, hx) => {
  var NN = rf(),
    RN = Xb(),
    LN = px(),
    mx = so(),
    BN = LN(function(t, e) {
      if (t == null) return [];
      var r = e.length;
      return r > 1 && mx(t, e[0], e[1]) ? e = [] : r > 2 && mx(e[0], e[1], e[2]) && (e = [e[0]]), RN(t, NN(e, 1), [])
    });
  hx.exports = BN
});
var Rx = I((ZK, Nx) => {
  var bR = We(),
    xR = function() {
      return bR.Date.now()
    };
  Nx.exports = xR
});
var Bx = I((JK, Lx) => {
  var wR = /\s/;

  function OR(t) {
    for (var e = t.length; e-- && wR.test(t.charAt(e)););
    return e
  }
  Lx.exports = OR
});
var Wx = I((QK, qx) => {
  var SR = Bx(),
    AR = /^\s+/;

  function _R(t) {
    return t && t.slice(0, SR(t) + 1).replace(AR, "")
  }
  qx.exports = _R
});
var mf = I((tV, $x) => {
  var PR = Wx(),
    zx = _e(),
    TR = Wr(),
    Fx = NaN,
    ER = /^[-+]0x[0-9a-f]+$/i,
    jR = /^0b[01]+$/i,
    MR = /^0o[0-7]+$/i,
    CR = parseInt;

  function IR(t) {
    if (typeof t == "number") return t;
    if (TR(t)) return Fx;
    if (zx(t)) {
      var e = typeof t.valueOf == "function" ? t.valueOf() : t;
      t = zx(e) ? e + "" : e
    }
    if (typeof t != "string") return t === 0 ? t : +t;
    t = PR(t);
    var r = jR.test(t);
    return r || MR.test(t) ? CR(t.slice(2), r ? 2 : 8) : ER.test(t) ? Fx : +t
  }
  $x.exports = IR
});
var Gx = I((eV, Hx) => {
  var kR = _e(),
    hf = Rx(),
    Ux = mf(),
    DR = "Expected a function",
    NR = Math.max,
    RR = Math.min;

  function LR(t, e, r) {
    var n, i, o, a, u, s, l = 0,
      f = !1,
      c = !1,
      p = !0;
    if (typeof t != "function") throw new TypeError(DR);
    e = Ux(e) || 0, kR(r) && (f = !!r.leading, c = "maxWait" in r, o = c ? NR(Ux(r.maxWait) || 0, e) : o, p = "trailing" in r ? !!r.trailing : p);

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
      return c ? RR(k, o - C) : k
    }

    function v(g) {
      var _ = g - s,
        C = g - l;
      return s === void 0 || _ >= e || _ < 0 || c && C >= o
    }

    function x() {
      var g = hf();
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
      return u === void 0 ? a : w(hf())
    }

    function h() {
      var g = hf(),
        _ = v(g);
      if (n = arguments, i = this, s = g, _) {
        if (u === void 0) return y(s);
        if (c) return clearTimeout(u), u = setTimeout(x, e), d(s)
      }
      return u === void 0 && (u = setTimeout(x, e)), a
    }
    return h.cancel = S, h.flush = P, h
  }
  Hx.exports = LR
});
var yf = I((rV, Kx) => {
  var BR = Gx(),
    qR = _e(),
    WR = "Expected a function";

  function zR(t, e, r) {
    var n = !0,
      i = !0;
    if (typeof t != "function") throw new TypeError(WR);
    return qR(r) && (n = "leading" in r ? !!r.leading : n, i = "trailing" in r ? !!r.trailing : i), BR(t, e, {
      leading: n,
      maxWait: e,
      trailing: i
    })
  }
  Kx.exports = zR
});
var rp = I((bQ, Lw) => {
  var zq = Wr();

  function Fq(t, e, r) {
    for (var n = -1, i = t.length; ++n < i;) {
      var o = t[n],
        a = e(o);
      if (a != null && (u === void 0 ? a === a && !zq(a) : r(a, u))) var u = a,
        s = o
    }
    return s
  }
  Lw.exports = Fq
});
var qw = I((xQ, Bw) => {
  function $q(t, e) {
    return t > e
  }
  Bw.exports = $q
});
var zw = I((wQ, Ww) => {
  var Uq = rp(),
    Hq = qw(),
    Gq = Vr();

  function Kq(t) {
    return t && t.length ? Uq(t, Gq, Hq) : void 0
  }
  Ww.exports = Kq
});
var $w = I((OQ, Fw) => {
  function Vq(t, e) {
    return t < e
  }
  Fw.exports = Vq
});
var Hw = I((SQ, Uw) => {
  var Xq = rp(),
    Yq = $w(),
    Zq = Vr();

  function Jq(t) {
    return t && t.length ? Xq(t, Zq, Yq) : void 0
  }
  Uw.exports = Jq
});
var Kw = I((AQ, Gw) => {
  var Qq = Fa(),
    tW = mr(),
    eW = of(),
    rW = ae();

  function nW(t, e) {
    var r = rW(t) ? Qq : eW;
    return r(t, tW(e, 3))
  }
  Gw.exports = nW
});
var Xw = I((_Q, Vw) => {
  var iW = rf(),
    oW = Kw();

  function aW(t, e) {
    return iW(oW(t, e), 1)
  }
  Vw.exports = aW
});
var Ro = I((PQ, Yw) => {
  var uW = bu();

  function sW(t, e) {
    return uW(t, e)
  }
  Yw.exports = sW
});
var np = I((Zw, hs) => {
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
        it = J.constructor,
        gt = J.d,
        K = (b = new it(b)).d;
      if (!J.s || !b.s) return new it(0);
      for (b.s *= J.s, T = J.e + b.e, G = gt.length, Z = K.length, G < Z && (E = gt, gt = K, K = E, D = G, G = Z, Z = D), E = [], D = G + Z, A = D; A--;) E.push(0);
      for (A = Z; --A >= 0;) {
        for (O = 0, j = G + A; j > A;) L = E[j] + K[A] * gt[j - A - 1] + O, E[j--] = L % c | 0, O = L / c | 0;
        E[j] = (E[j] + O) % c | 0
      }
      for (; !E[--D];) E.pop();
      return O ? ++T : E.shift(), b.d = E, b.e = T, n ? B(b, it.precision) : b
    }, m.toDecimalPlaces = m.todp = function(b, O) {
      var T = this,
        A = T.constructor;
      return T = new A(T), b === void 0 ? T : (x(b, 0, e), O === void 0 ? O = A.rounding : x(O, 0, 8), B(T, b + h(T) + 1, O))
    }, m.toExponential = function(b, O) {
      var T, A = this,
        j = A.constructor;
      return b === void 0 ? T = N(A, !0) : (x(b, 0, e), O === void 0 ? O = j.rounding : x(O, 0, 8), A = B(new j(A), b + 1, O), T = N(A, !0, b + 1)), T
    }, m.toFixed = function(b, O) {
      var T, A, j = this,
        E = j.constructor;
      return b === void 0 ? N(j) : (x(b, 0, e), O === void 0 ? O = E.rounding : x(O, 0, 8), A = B(new E(j), b + h(j) + 1, O), T = N(A.abs(), !1, b + h(A) + 1), j.isneg() && !j.isZero() ? "-" + T : T)
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
      return b === void 0 ? (T = h(j), A = N(j, T <= E.toExpNeg || T >= E.toExpPos)) : (x(b, 1, e), O === void 0 ? O = E.rounding : x(O, 0, 8), j = B(new E(j), b, O), T = h(j), A = N(j, b <= T || T <= E.toExpNeg, b)), A
    }, m.toSignificantDigits = m.tosd = function(b, O) {
      var T = this,
        A = T.constructor;
      return b === void 0 ? (b = A.precision, O = A.rounding) : (x(b, 1, e), O === void 0 ? O = A.rounding : x(O, 0, 8)), B(new A(T), b, O)
    }, m.toString = m.valueOf = m.val = m.toJSON = function() {
      var b = this,
        O = h(b),
        T = b.constructor;
      return N(b, O <= T.toExpNeg || O >= T.toExpPos)
    };

    function v(b, O) {
      var T, A, j, E, D, L, G, Z, J = b.constructor,
        it = J.precision;
      if (!b.s || !O.s) return O.s || (O = new J(b)), n ? B(O, it) : O;
      if (G = b.d, Z = O.d, D = b.e, j = O.e, G = G.slice(), E = D - j, E) {
        for (E < 0 ? (A = G, E = -E, L = Z.length) : (A = Z, j = D, L = G.length), D = Math.ceil(it / p), L = D > L ? D + 1 : L + 1, E > L && (E = L, A.length = 1), A.reverse(); E--;) A.push(0);
        A.reverse()
      }
      for (L = G.length, E = Z.length, L - E < 0 && (E = L, A = Z, Z = G, G = A), T = 0; E;) T = (G[--E] = G[E] + Z[E] + T) / c | 0, G[E] %= c;
      for (T && (G.unshift(T), ++j), L = G.length; G[--L] == 0;) G.pop();
      return O.d = G, O.e = j, n ? B(O, it) : O
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
        var L, G, Z, J, it, gt, K, ct, tt, $, St, Q, bt, Et, Lt, pe, V, ie, oe = A.constructor,
          qe = A.s == j.s ? 1 : -1,
          R = A.d,
          rt = j.d;
        if (!A.s) return new oe(A);
        if (!j.s) throw Error(i + "Division by zero");
        for (G = A.e - j.e, V = rt.length, Lt = R.length, K = new oe(qe), ct = K.d = [], Z = 0; rt[Z] == (R[Z] || 0);) ++Z;
        if (rt[Z] > (R[Z] || 0) && --G, E == null ? Q = E = oe.precision : D ? Q = E + (h(A) - h(j)) + 1 : Q = E, Q < 0) return new oe(0);
        if (Q = Q / p + 2 | 0, Z = 0, V == 1)
          for (J = 0, rt = rt[0], Q++;
            (Z < Lt || J) && Q--; Z++) bt = J * c + (R[Z] || 0), ct[Z] = bt / rt | 0, J = bt % rt | 0;
        else {
          for (J = c / (rt[0] + 1) | 0, J > 1 && (rt = b(rt, J), R = b(R, J), V = rt.length, Lt = R.length), Et = V, tt = R.slice(0, V), $ = tt.length; $ < V;) tt[$++] = 0;
          ie = rt.slice(), ie.unshift(0), pe = rt[0], rt[1] >= c / 2 && ++pe;
          do J = 0, L = O(rt, tt, V, $), L < 0 ? (St = tt[0], V != $ && (St = St * c + (tt[1] || 0)), J = St / pe | 0, J > 1 ? (J >= c && (J = c - 1), it = b(rt, J), gt = it.length, $ = tt.length, L = O(it, tt, gt, $), L == 1 && (J--, T(it, V < gt ? ie : rt, gt))) : (J == 0 && (L = J = 1), it = rt.slice()), gt = it.length, gt < $ && it.unshift(0), T(tt, it, $), L == -1 && ($ = tt.length, L = O(rt, tt, V, $), L < 1 && (J++, T(tt, V < $ ? ie : rt, $))), $ = tt.length) : L === 0 && (J++, tt = [0]), ct[Z++] = J, L && tt[0] ? tt[$++] = R[Et] || 0 : (tt = [R[Et]], $ = 1); while ((Et++ < Lt || tt[0] !== void 0) && Q--)
        }
        return ct[0] || ct.shift(), K.e = G, B(K, D ? E + h(K) + 1 : E)
      }
    }();

    function P(b, O) {
      var T, A, j, E, D, L, G = 0,
        Z = 0,
        J = b.constructor,
        it = J.precision;
      if (h(b) > 16) throw Error(a + h(b));
      if (!b.s) return new J(f);
      for (O == null ? (n = !1, L = it) : L = O, D = new J(.03125); b.abs().gte(.1);) b = b.times(D), Z += 5;
      for (A = Math.log(s(2, Z)) / Math.LN10 * 2 + 5 | 0, L += A, T = j = E = new J(f), J.precision = L;;) {
        if (j = B(j.times(b), L), T = T.times(++G), D = E.plus(S(j, T, L)), w(D.d).slice(0, L) === w(E.d).slice(0, L)) {
          for (; Z--;) E = B(E.times(E), L);
          return J.precision = it, O == null ? (n = !0, B(E, it)) : E
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
      var T, A, j, E, D, L, G, Z, J, it = 1,
        gt = 10,
        K = b,
        ct = K.d,
        tt = K.constructor,
        $ = tt.precision;
      if (K.s < 1) throw Error(i + (K.s ? "NaN" : "-Infinity"));
      if (K.eq(f)) return new tt(0);
      if (O == null ? (n = !1, Z = $) : Z = O, K.eq(10)) return O == null && (n = !0), g(tt, Z);
      if (Z += gt, tt.precision = Z, T = w(ct), A = T.charAt(0), E = h(K), Math.abs(E) < 15e14) {
        for (; A < 7 && A != 1 || A == 1 && T.charAt(1) > 3;) K = K.times(b), T = w(K.d), A = T.charAt(0), it++;
        E = h(K), A > 1 ? (K = new tt("0." + T), E++) : K = new tt(A + "." + T.slice(1))
      } else return G = g(tt, Z + 2, $).times(E + ""), K = C(new tt(A + "." + T.slice(1)), Z - gt).plus(G), tt.precision = $, O == null ? (n = !0, B(K, $)) : K;
      for (L = D = K = S(K.minus(f), K.plus(f), Z), J = B(K.times(K), Z), j = 3;;) {
        if (D = B(D.times(J), Z), G = L.plus(S(D, new tt(j), Z)), w(G.d).slice(0, Z) === w(L.d).slice(0, Z)) return L = L.times(2), E !== 0 && (L = L.plus(g(tt, Z + 2, $).times(E + ""))), L = S(L, new tt(it), Z), tt.precision = $, O == null ? (n = !0, B(L, $)) : L;
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
      var A, j, E, D, L, G, Z, J, it = b.d;
      for (D = 1, E = it[0]; E >= 10; E /= 10) D++;
      if (A = O - D, A < 0) A += p, j = O, Z = it[J = 0];
      else {
        if (J = Math.ceil((A + 1) / p), E = it.length, J >= E) return b;
        for (Z = E = it[J], D = 1; E >= 10; E /= 10) D++;
        A %= p, j = A - p + D
      }
      if (T !== void 0 && (E = s(10, D - j - 1), L = Z / E % 10 | 0, G = O < 0 || it[J + 1] !== void 0 || Z % E, G = T < 4 ? (L || G) && (T == 0 || T == (b.s < 0 ? 3 : 2)) : L > 5 || L == 5 && (T == 4 || G || T == 6 && (A > 0 ? j > 0 ? Z / s(10, D - j) : 0 : it[J - 1]) % 10 & 1 || T == (b.s < 0 ? 8 : 7))), O < 1 || !it[0]) return G ? (E = h(b), it.length = 1, O = O - E - 1, it[0] = s(10, (p - O % p) % p), b.e = u(-O / p) || 0) : (it.length = 1, it[0] = b.e = b.s = 0), b;
      if (A == 0 ? (it.length = J, E = 1, J--) : (it.length = J + 1, E = s(10, p - A), it[J] = j > 0 ? (Z / s(10, D - j) % s(10, j) | 0) * E : 0), G)
        for (;;)
          if (J == 0) {
            (it[0] += E) == c && (it[0] = 1, ++b.e);
            break
          } else {
            if (it[J] += E, it[J] != c) break;
            it[J--] = 0, E = 1
          } for (A = it.length; it[--A] === 0;) it.pop();
      if (n && (b.e > y || b.e < -y)) throw Error(a + h(b));
      return b
    }

    function W(b, O) {
      var T, A, j, E, D, L, G, Z, J, it, gt = b.constructor,
        K = gt.precision;
      if (!b.s || !O.s) return O.s ? O.s = -O.s : O = new gt(b), n ? B(O, K) : O;
      if (G = b.d, it = O.d, A = O.e, Z = b.e, G = G.slice(), D = Z - A, D) {
        for (J = D < 0, J ? (T = G, D = -D, L = it.length) : (T = it, A = Z, L = G.length), j = Math.max(Math.ceil(K / p), L) + 2, D > j && (D = j, T.length = 1), T.reverse(), j = D; j--;) T.push(0);
        T.reverse()
      } else {
        for (j = G.length, L = it.length, J = j < L, J && (L = j), j = 0; j < L; j++)
          if (G[j] != it[j]) {
            J = G[j] < it[j];
            break
          } D = 0
      }
      for (J && (T = G, G = it, it = T, O.s = -O.s), L = G.length, j = it.length - L; j > 0; --j) G[L++] = 0;
      for (j = it.length; j > D;) {
        if (G[--j] < it[j]) {
          for (E = j; E && G[--E] === 0;) G[E] = c - 1;
          --G[E], G[j] += c
        }
        G[j] -= it[j]
      }
      for (; G[--L] === 0;) G.pop();
      for (; G[0] === 0; G.shift()) --A;
      return G[0] ? (O.d = G, O.e = A, n ? B(O, K) : O) : new gt(0)
    }

    function N(b, O, T) {
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
      var O, T, A, j = ["precision", 1, e, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
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
    }) : typeof hs < "u" && hs.exports ? hs.exports = r : (t || (t = typeof self < "u" && self && self.self == self ? self : Function("return this")()), t.Decimal = r)
  })(Zw)
});
var q1 = I((stt, B1) => {
  function Bz(t) {
    var e = t == null ? 0 : t.length;
    return e ? t[e - 1] : void 0
  }
  B1.exports = Bz
});
var rO = I((Ttt, eO) => {
  "use strict";
  var pF = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  eO.exports = pF
});
var aO = I((Ett, oO) => {
  "use strict";
  var dF = rO();

  function nO() {}

  function iO() {}
  iO.resetWarningCache = nO;
  oO.exports = function() {
    function t(n, i, o, a, u, s) {
      if (s !== dF) {
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
      checkPropTypes: iO,
      resetWarningCache: nO
    };
    return r.PropTypes = r, r
  }
});
var sO = I((Ctt, uO) => {
  uO.exports = aO()();
  var jtt, Mtt
});
var HO = I((get, UO) => {
  var f8 = Fc(),
    p8 = f8(Object.getPrototypeOf, Object);
  UO.exports = p8
});
var VO = I((bet, KO) => {
  var d8 = Ze(),
    m8 = HO(),
    h8 = Je(),
    y8 = "[object Object]",
    v8 = Function.prototype,
    g8 = Object.prototype,
    GO = v8.toString,
    b8 = g8.hasOwnProperty,
    x8 = GO.call(Object);

  function w8(t) {
    if (!h8(t) || d8(t) != y8) return !1;
    var e = m8(t);
    if (e === null) return !0;
    var r = b8.call(e, "constructor") && e.constructor;
    return typeof r == "function" && r instanceof r && GO.call(r) == x8
  }
  KO.exports = w8
});
var YO = I((xet, XO) => {
  var O8 = Ze(),
    S8 = Je(),
    A8 = "[object Boolean]";

  function _8(t) {
    return t === !0 || t === !1 || S8(t) && O8(t) == A8
  }
  XO.exports = _8
});
var pS = I((Det, fS) => {
  var t$ = Math.ceil,
    e$ = Math.max;

  function r$(t, e, r, n) {
    for (var i = -1, o = e$(t$((e - t) / (r || 1)), 0), a = Array(o); o--;) a[n ? o : ++i] = t, t += r;
    return a
  }
  fS.exports = r$
});
var Xp = I((Net, mS) => {
  var n$ = mf(),
    dS = 1 / 0,
    i$ = 17976931348623157e292;

  function o$(t) {
    if (!t) return t === 0 ? t : 0;
    if (t = n$(t), t === dS || t === -dS) {
      var e = t < 0 ? -1 : 1;
      return e * i$
    }
    return t === t ? t : 0
  }
  mS.exports = o$
});
var yS = I((Ret, hS) => {
  var a$ = pS(),
    u$ = so(),
    Yp = Xp();

  function s$(t) {
    return function(e, r, n) {
      return n && typeof n != "number" && u$(e, r, n) && (r = n = void 0), e = Yp(e), r === void 0 ? (r = e, e = 0) : r = Yp(r), n = n === void 0 ? e < r ? 1 : -1 : Yp(n), a$(e, r, n, t)
    }
  }
  hS.exports = s$
});
var Zp = I((Let, vS) => {
  var l$ = yS(),
    c$ = l$();
  vS.exports = c$
});
var jS = I((Xet, ES) => {
  var A$ = Su();

  function _$(t, e) {
    var r;
    return A$(t, function(n, i, o) {
      return r = e(n, i, o), !r
    }), !!r
  }
  ES.exports = _$
});
var CS = I((Yet, MS) => {
  var P$ = kc(),
    T$ = mr(),
    E$ = jS(),
    j$ = ae(),
    M$ = so();

  function C$(t, e, r) {
    var n = j$(t) ? P$ : E$;
    return r && M$(t, e, r) && (e = void 0), n(t, T$(e, 3))
  }
  MS.exports = C$
});
var DS = I((Jet, kS) => {
  var IS = uf();

  function I$(t, e, r) {
    e == "__proto__" && IS ? IS(t, e, {
      configurable: !0,
      enumerable: !0,
      value: r,
      writable: !0
    }) : t[e] = r
  }
  kS.exports = I$
});
var RS = I((Qet, NS) => {
  var k$ = DS(),
    D$ = nf(),
    N$ = mr();

  function R$(t, e) {
    var r = {};
    return e = N$(e, 3), D$(t, function(n, i, o) {
      k$(r, i, e(n, i, o))
    }), r
  }
  NS.exports = R$
});
var BS = I((trt, LS) => {
  function L$(t, e) {
    for (var r = -1, n = t == null ? 0 : t.length; ++r < n;)
      if (!e(t[r], r, t)) return !1;
    return !0
  }
  LS.exports = L$
});
var WS = I((ert, qS) => {
  var B$ = Su();

  function q$(t, e) {
    var r = !0;
    return B$(t, function(n, i, o) {
      return r = !!e(n, i, o), r
    }), r
  }
  qS.exports = q$
});
var ed = I((rrt, zS) => {
  var W$ = BS(),
    z$ = WS(),
    F$ = mr(),
    $$ = ae(),
    U$ = so();

  function H$(t, e, r) {
    var n = $$(t) ? W$ : z$;
    return r && U$(t, e, r) && (e = void 0), n(t, F$(e, 3))
  }
  zS.exports = H$
});
var aA = I((Trt, oA) => {
  var h6 = mr(),
    y6 = Fn(),
    v6 = ao();

  function g6(t) {
    return function(e, r, n) {
      var i = Object(e);
      if (!y6(e)) {
        var o = h6(r, 3);
        e = v6(e), r = function(u) {
          return o(i[u], u, i)
        }
      }
      var a = t(e, r, n);
      return a > -1 ? i[o ? e[a] : a] : void 0
    }
  }
  oA.exports = g6
});
var sA = I((Ert, uA) => {
  var b6 = Xp();

  function x6(t) {
    var e = b6(t),
      r = e % 1;
    return e === e ? r ? e - r : e : 0
  }
  uA.exports = x6
});
var cA = I((jrt, lA) => {
  var w6 = Jc(),
    O6 = mr(),
    S6 = sA(),
    A6 = Math.max;

  function _6(t, e, r) {
    var n = t == null ? 0 : t.length;
    if (!n) return -1;
    var i = r == null ? 0 : S6(r);
    return i < 0 && (i = A6(n + i, 0)), w6(t, O6(e, 3), i)
  }
  lA.exports = _6
});
var pA = I((Mrt, fA) => {
  var P6 = aA(),
    T6 = cA(),
    E6 = P6(T6);
  fA.exports = E6
});
var S_ = I((_it, Td) => {
  "use strict";
  var v5 = Object.prototype.hasOwnProperty,
    fe = "~";

  function Ca() {}
  Object.create && (Ca.prototype = Object.create(null), new Ca().__proto__ || (fe = !1));

  function g5(t, e, r) {
    this.fn = t, this.context = e, this.once = r || !1
  }

  function O_(t, e, r, n, i) {
    if (typeof r != "function") throw new TypeError("The listener must be a function");
    var o = new g5(r, n || t, i),
      a = fe ? fe + e : e;
    return t._events[a] ? t._events[a].fn ? t._events[a] = [t._events[a], o] : t._events[a].push(o) : (t._events[a] = o, t._eventsCount++), t
  }

  function cl(t, e) {
    --t._eventsCount === 0 ? t._events = new Ca : delete t._events[e]
  }

  function ne() {
    this._events = new Ca, this._eventsCount = 0
  }
  ne.prototype.eventNames = function() {
    var e = [],
      r, n;
    if (this._eventsCount === 0) return e;
    for (n in r = this._events) v5.call(r, n) && e.push(fe ? n.slice(1) : n);
    return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(r)) : e
  };
  ne.prototype.listeners = function(e) {
    var r = fe ? fe + e : e,
      n = this._events[r];
    if (!n) return [];
    if (n.fn) return [n.fn];
    for (var i = 0, o = n.length, a = new Array(o); i < o; i++) a[i] = n[i].fn;
    return a
  };
  ne.prototype.listenerCount = function(e) {
    var r = fe ? fe + e : e,
      n = this._events[r];
    return n ? n.fn ? 1 : n.length : 0
  };
  ne.prototype.emit = function(e, r, n, i, o, a) {
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
  ne.prototype.on = function(e, r, n) {
    return O_(this, e, r, n, !1)
  };
  ne.prototype.once = function(e, r, n) {
    return O_(this, e, r, n, !0)
  };
  ne.prototype.removeListener = function(e, r, n, i) {
    var o = fe ? fe + e : e;
    if (!this._events[o]) return this;
    if (!r) return cl(this, o), this;
    var a = this._events[o];
    if (a.fn) a.fn === r && (!i || a.once) && (!n || a.context === n) && cl(this, o);
    else {
      for (var u = 0, s = [], l = a.length; u < l; u++)(a[u].fn !== r || i && !a[u].once || n && a[u].context !== n) && s.push(a[u]);
      s.length ? this._events[o] = s.length === 1 ? s[0] : s : cl(this, o)
    }
    return this
  };
  ne.prototype.removeAllListeners = function(e) {
    var r;
    return e ? (r = fe ? fe + e : e, this._events[r] && cl(this, r)) : (this._events = new Ca, this._eventsCount = 0), this
  };
  ne.prototype.off = ne.prototype.removeListener;
  ne.prototype.addListener = ne.prototype.on;
  ne.prefixed = fe;
  ne.EventEmitter = ne;
  typeof Td < "u" && (Td.exports = ne)
});
import wn, {
  useState as Gt,
  useEffect as Da,
  useCallback as Be,
  useRef as o4
} from "./react-shim-eraudit.js";
import Gl from "./react-shim-eraudit.js";

function Rd(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var i = t.length;
      for (e = 0; e < i; e++) t[e] && (r = Rd(t[e])) && (n && (n += " "), n += r)
    } else
      for (r in t) t[r] && (n && (n += " "), n += r);
  return n
}

function rP() {
  for (var t, e, r = 0, n = "", i = arguments.length; r < i; r++)(t = arguments[r]) && (e = Rd(t)) && (n && (n += " "), n += e);
  return n
}
var ut = rP;
var zl = et(zr()),
  jn = et(Pe()),
  qh = et(Ua()),
  Wh = et(Bt()),
  zh = et(_e()),
  Fh = et(Ah());
import {
  Children as Fl,
  isValidElement as cj
} from "./react-shim-eraudit.js";
var Tn = et(Ua()),
  Rl = et(Nl()),
  Th = et(zr()),
  Eh = et(Dl()),
  jh = et(Pe()),
  Zt = function(e) {
    return e === 0 ? 0 : e > 0 ? 1 : -1
  },
  pr = function(e) {
    return (0, Tn.default)(e) && e.indexOf("%") === e.length - 1
  },
  X = function(e) {
    return (0, Eh.default)(e) && !(0, Rl.default)(e)
  },
  Mh = function(e) {
    return (0, jh.default)(e)
  },
  Mt = function(e) {
    return X(e) || (0, Tn.default)(e)
  },
  nj = 0,
  Qe = function(e) {
    var r = ++nj;
    return "".concat(e || "").concat(r)
  },
  ze = function(e, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if (!X(e) && !(0, Tn.default)(e)) return n;
    var o;
    if (pr(e)) {
      var a = e.indexOf("%");
      o = r * parseFloat(e.slice(0, a)) / 100
    } else o = +e;
    return (0, Rl.default)(o) && (o = n), i && o > r && (o = r), o
  },
  tr = function(e) {
    if (!e) return null;
    var r = Object.keys(e);
    return r && r.length ? e[r[0]] : null
  },
  Ch = function(e) {
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

function En(t, e, r) {
  return !t || !t.length ? null : t.find(function(n) {
    return n && (typeof e == "function" ? e(n) : (0, Th.default)(n, e)) === r
  })
}
var Ih = function(e, r) {
  return X(e) && X(r) ? e - r : (0, Tn.default)(e) && (0, Tn.default)(r) ? e.localeCompare(r) : e instanceof Date && r instanceof Date ? e.getTime() - r.getTime() : String(e).localeCompare(String(r))
};

function dr(t, e) {
  for (var r in t)
    if ({}.hasOwnProperty.call(t, r) && (!{}.hasOwnProperty.call(e, r) || t[r] !== e[r])) return !1;
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n) && !{}.hasOwnProperty.call(t, n)) return !1;
  return !0
}
var Bl = et(_e());
import {
  isValidElement as ij
} from "./react-shim-eraudit.js";

function Ll(t) {
  "@babel/helpers - typeof";
  return Ll = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ll(t)
}
var oj = ["viewBox", "children"],
  Dh = ["aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "className", "color", "height", "id", "lang", "max", "media", "method", "min", "name", "style", "target", "width", "role", "tabIndex", "accentHeight", "accumulate", "additive", "alignmentBaseline", "allowReorder", "alphabetic", "amplitude", "arabicForm", "ascent", "attributeName", "attributeType", "autoReverse", "azimuth", "baseFrequency", "baselineShift", "baseProfile", "bbox", "begin", "bias", "by", "calcMode", "capHeight", "clip", "clipPath", "clipPathUnits", "clipRule", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "contentScriptType", "contentStyleType", "cursor", "cx", "cy", "d", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominantBaseline", "dur", "dx", "dy", "edgeMode", "elevation", "enableBackground", "end", "exponent", "externalResourcesRequired", "fill", "fillOpacity", "fillRule", "filter", "filterRes", "filterUnits", "floodColor", "floodOpacity", "focusable", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "format", "from", "fx", "fy", "g1", "g2", "glyphName", "glyphOrientationHorizontal", "glyphOrientationVertical", "glyphRef", "gradientTransform", "gradientUnits", "hanging", "horizAdvX", "horizOriginX", "href", "ideographic", "imageRendering", "in2", "in", "intercept", "k1", "k2", "k3", "k4", "k", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letterSpacing", "lightingColor", "limitingConeAngle", "local", "markerEnd", "markerHeight", "markerMid", "markerStart", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "mode", "numOctaves", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlinePosition", "overlineThickness", "paintOrder", "panose1", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointerEvents", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "r", "radius", "refX", "refY", "renderingIntent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "result", "rotate", "rx", "ry", "seed", "shapeRendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stopColor", "stopOpacity", "strikethroughPosition", "strikethroughThickness", "string", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textAnchor", "textDecoration", "textLength", "textRendering", "to", "transform", "u1", "u2", "underlinePosition", "underlineThickness", "unicode", "unicodeBidi", "unicodeRange", "unitsPerEm", "vAlphabetic", "values", "vectorEffect", "version", "vertAdvY", "vertOriginX", "vertOriginY", "vHanging", "vIdeographic", "viewTarget", "visibility", "vMathematical", "widths", "wordSpacing", "writingMode", "x1", "x2", "x", "xChannelSelector", "xHeight", "xlinkActuate", "xlinkArcrole", "xlinkHref", "xlinkRole", "xlinkShow", "xlinkTitle", "xlinkType", "xmlBase", "xmlLang", "xmlns", "xmlnsXlink", "xmlSpace", "y1", "y2", "y", "yChannelSelector", "z", "zoomAndPan", "ref", "key", "angle"],
  kh = ["points", "pathLength"],
  eu = {
    svg: oj,
    polygon: kh,
    polyline: kh
  },
  ru = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"],
  Fr = function(e, r) {
    if (!e || typeof e == "function" || typeof e == "boolean") return null;
    var n = e;
    if (ij(e) && (n = e.props), !(0, Bl.default)(n)) return null;
    var i = {};
    return Object.keys(n).forEach(function(o) {
      ru.includes(o) && (i[o] = r || function(a) {
        return n[o](n, a)
      })
    }), i
  },
  aj = function(e, r, n) {
    return function(i) {
      return e(r, n, i), null
    }
  },
  $r = function(e, r, n) {
    if (!(0, Bl.default)(e) || Ll(e) !== "object") return null;
    var i = null;
    return Object.keys(e).forEach(function(o) {
      var a = e[o];
      ru.includes(o) && typeof a == "function" && (i || (i = {}), i[o] = aj(a, r, n))
    }), i
  };
var uj = ["children"],
  sj = ["children"];

function Nh(t, e) {
  if (t == null) return {};
  var r = lj(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function lj(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Wl(t) {
  "@babel/helpers - typeof";
  return Wl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Wl(t)
}
var Rh = {
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
var Ee = function(e) {
    return typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : ""
  },
  Lh = null,
  ql = null,
  $l = function t(e) {
    if (e === Lh && Array.isArray(ql)) return ql;
    var r = [];
    return Fl.forEach(e, function(n) {
      (0, jn.default)(n) || ((0, Fh.isFragment)(n) ? r = r.concat(t(n.props.children)) : r.push(n))
    }), ql = r, Lh = e, r
  };

function Ft(t, e) {
  var r = [],
    n = [];
  return Array.isArray(e) ? n = e.map(function(i) {
    return Ee(i)
  }) : n = [Ee(e)], $l(t).forEach(function(i) {
    var o = (0, zl.default)(i, "type.displayName") || (0, zl.default)(i, "type.name");
    n.indexOf(o) !== -1 && r.push(i)
  }), r
}

function Jt(t, e) {
  var r = Ft(t, e);
  return r && r[0]
}
var Ul = function(e) {
    if (!e || !e.props) return !1;
    var r = e.props,
      n = r.width,
      i = r.height;
    return !(!X(n) || n <= 0 || !X(i) || i <= 0)
  },
  fj = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"],
  pj = function(e) {
    return e && e.type && (0, qh.default)(e.type) && fj.indexOf(e.type) >= 0
  },
  $h = function(e) {
    return e && Wl(e) === "object" && "clipDot" in e
  },
  dj = function(e, r, n, i) {
    var o, a = (o = eu === null || eu === void 0 ? void 0 : eu[i]) !== null && o !== void 0 ? o : [];
    return r.startsWith("data-") || !(0, Wh.default)(e) && (i && a.includes(r) || Dh.includes(r)) || n && ru.includes(r)
  };
var st = function(e, r, n) {
    if (!e || typeof e == "function" || typeof e == "boolean") return null;
    var i = e;
    if (cj(e) && (i = e.props), !(0, zh.default)(i)) return null;
    var o = {};
    return Object.keys(i).forEach(function(a) {
      var u;
      dj((u = i) === null || u === void 0 ? void 0 : u[a], a, r, n) && (o[a] = i[a])
    }), o
  },
  nu = function t(e, r) {
    if (e === r) return !0;
    var n = Fl.count(e);
    if (n !== Fl.count(r)) return !1;
    if (n === 0) return !0;
    if (n === 1) return Bh(Array.isArray(e) ? e[0] : e, Array.isArray(r) ? r[0] : r);
    for (var i = 0; i < n; i++) {
      var o = e[i],
        a = r[i];
      if (Array.isArray(o) || Array.isArray(a)) {
        if (!t(o, a)) return !1
      } else if (!Bh(o, a)) return !1
    }
    return !0
  },
  Bh = function(e, r) {
    if ((0, jn.default)(e) && (0, jn.default)(r)) return !0;
    if (!(0, jn.default)(e) && !(0, jn.default)(r)) {
      var n = e.props || {},
        i = n.children,
        o = Nh(n, uj),
        a = r.props || {},
        u = a.children,
        s = Nh(a, sj);
      return i && u ? dr(o, s) && nu(i, u) : !i && !u ? dr(o, s) : !1
    }
    return !1
  },
  Hl = function(e, r) {
    var n = [],
      i = {};
    return $l(e).forEach(function(o, a) {
      if (pj(o)) n.push(o);
      else if (o) {
        var u = Ee(o.type),
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
  Uh = function(e) {
    var r = e && e.type;
    return r && Rh[r] ? Rh[r] : null
  },
  Hh = function(e, r) {
    return $l(r).indexOf(e)
  };
var mj = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];

function Kl() {
  return Kl = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Kl.apply(this, arguments)
}

function hj(t, e) {
  if (t == null) return {};
  var r = yj(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function yj(t, e) {
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
    l = hj(t, mj),
    f = i || {
      width: r,
      height: n,
      x: 0,
      y: 0
    },
    c = ut("recharts-surface", o);
  return Gl.createElement("svg", Kl({}, st(l, !0, "svg"), {
    className: c,
    width: r,
    height: n,
    style: a,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), Gl.createElement("title", null, u), Gl.createElement("desc", null, s), e)
}
import Gh from "./react-shim-eraudit.js";
var vj = ["children", "className"];

function Vl() {
  return Vl = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Vl.apply(this, arguments)
}

function gj(t, e) {
  if (t == null) return {};
  var r = bj(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function bj(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var xt = Gh.forwardRef(function(t, e) {
  var r = t.children,
    n = t.className,
    i = gj(t, vj),
    o = ut("recharts-layer", n);
  return Gh.createElement("g", Vl({
    className: o
  }, st(i, !0), {
    ref: e
  }), r)
});
import uo, {
  PureComponent as jD
} from "./react-shim-eraudit.js";
var Mc = et(Bt());
import er, {
  PureComponent as kM
} from "./react-shim-eraudit.js";
var xj = !1,
  ue = function(e, r) {
    for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) i[o - 2] = arguments[o];
    if (xj && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !e))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var a = 0;
        console.warn(r.replace(/%s/g, function() {
          return i[a++]
        }))
      }
  };
var Tc = et(iu());
import xM from "./react-shim-eraudit.js";

function At(t) {
  return function() {
    return t
  }
}
var Jl = Math.cos;
var Ji = Math.sin,
  Kt = Math.sqrt;
var Ur = Math.PI,
  F9 = Ur / 2,
  Mn = 2 * Ur;
var Ql = Math.PI,
  tc = 2 * Ql,
  Hr = 1e-6,
  iM = tc - Hr;

function dy(t) {
  this._ += t[0];
  for (let e = 1, r = t.length; e < r; ++e) this._ += arguments[e] + t[e]
}

function oM(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return dy;
  let r = 10 ** e;
  return function(n) {
    this._ += n[0];
    for (let i = 1, o = n.length; i < o; ++i) this._ += Math.round(arguments[i] * r) / r + n[i]
  }
}
var Gr = class {
  constructor(e) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? dy : oM(e)
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
          S = o * Math.tan((Ql - Math.acos((m + p - v) / (2 * x * w))) / 2),
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
    this._x1 === null ? this._append`M${l},${f}` : (Math.abs(this._x1 - l) > Hr || Math.abs(this._y1 - f) > Hr) && this._append`L${l},${f}`, n && (p < 0 && (p = p % tc + tc), p > iM ? this._append`A${n},${n},0,1,${c},${e-u},${r-s}A${n},${n},0,1,${c},${this._x1=l},${this._y1=f}` : p > Hr && this._append`A${n},${n},0,${+(p>=Ql)},${c},${this._x1=e+n*Math.cos(o)},${this._y1=r+n*Math.sin(o)}`)
  }
  rect(e, r, n, i) {
    this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+r}h${n=+n}v${+i}h${-n}Z`
  }
  toString() {
    return this._
  }
};

function my() {
  return new Gr
}
my.prototype = Gr.prototype;

function Cn(t) {
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
var Y9 = Array.prototype.slice;

function In(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t)
}

function hy(t) {
  this._context = t
}
hy.prototype = {
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

function Ar(t) {
  return new hy(t)
}

function ou(t) {
  return t[0]
}

function au(t) {
  return t[1]
}

function Qi(t, e) {
  var r = At(!0),
    n = null,
    i = Ar,
    o = null,
    a = Cn(u);
  t = typeof t == "function" ? t : t === void 0 ? ou : At(t), e = typeof e == "function" ? e : e === void 0 ? au : At(e);

  function u(s) {
    var l, f = (s = In(s)).length,
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

function kn(t, e, r) {
  var n = null,
    i = At(!0),
    o = null,
    a = Ar,
    u = null,
    s = Cn(l);
  t = typeof t == "function" ? t : t === void 0 ? ou : At(+t), e = typeof e == "function" ? e : e === void 0 ? At(0) : At(+e), r = typeof r == "function" ? r : r === void 0 ? au : At(+r);

  function l(c) {
    var p, d, y, m = (c = In(c)).length,
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
var uu = class {
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

function ec(t) {
  return new uu(t, !0)
}

function rc(t) {
  return new uu(t, !1)
}
var Dn = {
  draw(t, e) {
    let r = Kt(e / Ur);
    t.moveTo(r, 0), t.arc(0, 0, r, 0, Mn)
  }
};
var nc = {
  draw(t, e) {
    let r = Kt(e / 5) / 2;
    t.moveTo(-3 * r, -r), t.lineTo(-r, -r), t.lineTo(-r, -3 * r), t.lineTo(r, -3 * r), t.lineTo(r, -r), t.lineTo(3 * r, -r), t.lineTo(3 * r, r), t.lineTo(r, r), t.lineTo(r, 3 * r), t.lineTo(-r, 3 * r), t.lineTo(-r, r), t.lineTo(-3 * r, r), t.closePath()
  }
};
var yy = Kt(1 / 3),
  aM = yy * 2,
  ic = {
    draw(t, e) {
      let r = Kt(e / aM),
        n = r * yy;
      t.moveTo(0, -r), t.lineTo(n, 0), t.lineTo(0, r), t.lineTo(-n, 0), t.closePath()
    }
  };
var oc = {
  draw(t, e) {
    let r = Kt(e),
      n = -r / 2;
    t.rect(n, n, r, r)
  }
};
var uM = .8908130915292852,
  vy = Ji(Ur / 10) / Ji(7 * Ur / 10),
  sM = Ji(Mn / 10) * vy,
  lM = -Jl(Mn / 10) * vy,
  ac = {
    draw(t, e) {
      let r = Kt(e * uM),
        n = sM * r,
        i = lM * r;
      t.moveTo(0, -r), t.lineTo(n, i);
      for (let o = 1; o < 5; ++o) {
        let a = Mn * o / 5,
          u = Jl(a),
          s = Ji(a);
        t.lineTo(s * r, -u * r), t.lineTo(u * n - s * i, s * n + u * i)
      }
      t.closePath()
    }
  };
var uc = Kt(3),
  sc = {
    draw(t, e) {
      let r = -Kt(e / (uc * 3));
      t.moveTo(0, r * 2), t.lineTo(-uc * r, -r), t.lineTo(uc * r, -r), t.closePath()
    }
  };
var je = -.5,
  Me = Kt(3) / 2,
  lc = 1 / Kt(12),
  cM = (lc / 2 + 1) * 3,
  cc = {
    draw(t, e) {
      let r = Kt(e / cM),
        n = r / 2,
        i = r * lc,
        o = n,
        a = r * lc + r,
        u = -o,
        s = a;
      t.moveTo(n, i), t.lineTo(o, a), t.lineTo(u, s), t.lineTo(je * n - Me * i, Me * n + je * i), t.lineTo(je * o - Me * a, Me * o + je * a), t.lineTo(je * u - Me * s, Me * u + je * s), t.lineTo(je * n + Me * i, je * i - Me * n), t.lineTo(je * o + Me * a, je * a - Me * o), t.lineTo(je * u + Me * s, je * s - Me * u), t.closePath()
    }
  };

function su(t, e) {
  let r = null,
    n = Cn(i);
  t = typeof t == "function" ? t : At(t || Dn), e = typeof e == "function" ? e : At(e === void 0 ? 64 : +e);

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

function Nn() {}

function Rn(t, e, r) {
  t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + e) / 6, (t._y0 + 4 * t._y1 + r) / 6)
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
    switch (this._point) {
      case 3:
        Rn(this, this._x1, this._y1);
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
        Rn(this, t, e);
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
  areaStart: Nn,
  areaEnd: Nn,
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
        Rn(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function pc(t) {
  return new by(t)
}

function xy(t) {
  this._context = t
}
xy.prototype = {
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
        Rn(this, t, e);
        break
    }
    this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
  }
};

function dc(t) {
  return new xy(t)
}

function wy(t) {
  this._context = t
}
wy.prototype = {
  areaStart: Nn,
  areaEnd: Nn,
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

function mc(t) {
  return new wy(t)
}

function Oy(t) {
  return t < 0 ? -1 : 1
}

function Sy(t, e, r) {
  var n = t._x1 - t._x0,
    i = e - t._x1,
    o = (t._y1 - t._y0) / (n || i < 0 && -0),
    a = (r - t._y1) / (i || n < 0 && -0),
    u = (o * i + a * n) / (n + i);
  return (Oy(o) + Oy(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0
}

function Ay(t, e) {
  var r = t._x1 - t._x0;
  return r ? (3 * (t._y1 - t._y0) / r - e) / 2 : e
}

function hc(t, e, r) {
  var n = t._x0,
    i = t._y0,
    o = t._x1,
    a = t._y1,
    u = (o - n) / 3;
  t._context.bezierCurveTo(n + u, i + u * e, o - u, a - u * r, o, a)
}

function lu(t) {
  this._context = t
}
lu.prototype = {
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
        hc(this, this._t0, Ay(this, this._t0));
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
          this._point = 3, hc(this, Ay(this, r = Sy(this, t, e)), r);
          break;
        default:
          hc(this, this._t0, r = Sy(this, t, e));
          break
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = r
    }
  }
};

function _y(t) {
  this._context = new Py(t)
}(_y.prototype = Object.create(lu.prototype)).point = function(t, e) {
  lu.prototype.point.call(this, e, t)
};

function Py(t) {
  this._context = t
}
Py.prototype = {
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

function yc(t) {
  return new lu(t)
}

function vc(t) {
  return new _y(t)
}

function Ey(t) {
  this._context = t
}
Ey.prototype = {
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
        for (var n = Ty(t), i = Ty(e), o = 0, a = 1; a < r; ++o, ++a) this._context.bezierCurveTo(n[0][o], i[0][o], n[1][o], i[1][o], t[a], e[a]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
  },
  point: function(t, e) {
    this._x.push(+t), this._y.push(+e)
  }
};

function Ty(t) {
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

function gc(t) {
  return new Ey(t)
}

function cu(t, e) {
  this._context = t, this._t = e
}
cu.prototype = {
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

function bc(t) {
  return new cu(t, .5)
}

function xc(t) {
  return new cu(t, 0)
}

function wc(t) {
  return new cu(t, 1)
}

function Ce(t, e) {
  if ((a = t.length) > 1)
    for (var r = 1, n, i, o = t[e[0]], a, u = o.length; r < a; ++r)
      for (i = o, o = t[e[r]], n = 0; n < u; ++n) o[n][1] += o[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1]
}

function Ln(t) {
  for (var e = t.length, r = new Array(e); --e >= 0;) r[e] = e;
  return r
}

function fM(t, e) {
  return t[e]
}

function pM(t) {
  let e = [];
  return e.key = t, e
}

function Oc() {
  var t = At([]),
    e = Ln,
    r = Ce,
    n = fM;

  function i(o) {
    var a = Array.from(t.apply(this, arguments), pM),
      u, s = a.length,
      l = -1,
      f;
    for (let c of o)
      for (u = 0, ++l; u < s; ++u)(a[u][l] = [0, +n(c, a[u].key, l, o)]).data = c;
    for (u = 0, f = In(e(a)); u < s; ++u) a[f[u]].index = u;
    return r(a, f), a
  }
  return i.keys = function(o) {
    return arguments.length ? (t = typeof o == "function" ? o : At(Array.from(o)), i) : t
  }, i.value = function(o) {
    return arguments.length ? (n = typeof o == "function" ? o : At(+o), i) : n
  }, i.order = function(o) {
    return arguments.length ? (e = o == null ? Ln : typeof o == "function" ? o : At(Array.from(o)), i) : e
  }, i.offset = function(o) {
    return arguments.length ? (r = o ?? Ce, i) : r
  }, i
}

function Sc(t, e) {
  if ((n = t.length) > 0) {
    for (var r, n, i = 0, o = t[0].length, a; i < o; ++i) {
      for (a = r = 0; r < n; ++r) a += t[r][i][1] || 0;
      if (a)
        for (r = 0; r < n; ++r) t[r][i][1] /= a
    }
    Ce(t, e)
  }
}

function Ac(t, e) {
  if ((i = t.length) > 0) {
    for (var r = 0, n = t[e[0]], i, o = n.length; r < o; ++r) {
      for (var a = 0, u = 0; a < i; ++a) u += t[a][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2
    }
    Ce(t, e)
  }
}

function _c(t, e) {
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
    i[n - 1][1] += i[n - 1][0] = r, Ce(t, e)
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
var mM = ["type", "size", "sizeType"];

function Pc() {
  return Pc = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Pc.apply(this, arguments)
}

function jy(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function My(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? jy(Object(r), !0).forEach(function(n) {
      hM(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : jy(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function hM(t, e, r) {
  return e = yM(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function yM(t) {
  var e = vM(t, "string");
  return to(e) == "symbol" ? e : e + ""
}

function vM(t, e) {
  if (to(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (to(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function gM(t, e) {
  if (t == null) return {};
  var r = bM(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function bM(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var Cy = {
    symbolCircle: Dn,
    symbolCross: nc,
    symbolDiamond: ic,
    symbolSquare: oc,
    symbolStar: ac,
    symbolTriangle: sc,
    symbolWye: cc
  },
  wM = Math.PI / 180,
  OM = function(e) {
    var r = "symbol".concat((0, Tc.default)(e));
    return Cy[r] || Dn
  },
  SM = function(e, r, n) {
    if (r === "area") return e;
    switch (n) {
      case "cross":
        return 5 * e * e / 9;
      case "diamond":
        return .5 * e * e / Math.sqrt(3);
      case "square":
        return e * e;
      case "star": {
        var i = 18 * wM;
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
  AM = function(e, r) {
    Cy["symbol".concat((0, Tc.default)(e))] = r
  },
  eo = function(e) {
    var r = e.type,
      n = r === void 0 ? "circle" : r,
      i = e.size,
      o = i === void 0 ? 64 : i,
      a = e.sizeType,
      u = a === void 0 ? "area" : a,
      s = gM(e, mM),
      l = My(My({}, s), {}, {
        type: n,
        size: o,
        sizeType: u
      }),
      f = function() {
        var v = OM(n),
          x = su().type(v).size(SM(o, u, n));
        return x()
      },
      c = l.className,
      p = l.cx,
      d = l.cy,
      y = st(l, !0);
    return p === +p && d === +d && o === +o ? xM.createElement("path", Pc({}, y, {
      className: ut("recharts-symbols", c),
      transform: "translate(".concat(p, ", ").concat(d, ")"),
      d: f()
    })) : null
  };
eo.registerSymbol = AM;

function Bn(t) {
  "@babel/helpers - typeof";
  return Bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Bn(t)
}

function Ec() {
  return Ec = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ec.apply(this, arguments)
}

function Iy(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function _M(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Iy(Object(r), !0).forEach(function(n) {
      ro(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Iy(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function PM(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function ky(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Ny(n.key), n)
  }
}

function TM(t, e, r) {
  return e && ky(t.prototype, e), r && ky(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function EM(t, e, r) {
  return e = fu(e), jM(t, Dy() ? Reflect.construct(e, r || [], fu(t).constructor) : e.apply(t, r))
}

function jM(t, e) {
  if (e && (Bn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return MM(t)
}

function MM(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Dy() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Dy = function() {
    return !!t
  })()
}

function fu(t) {
  return fu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, fu(t)
}

function CM(t, e) {
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
  return jc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, jc(t, e)
}

function ro(t, e, r) {
  return e = Ny(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Ny(t) {
  var e = IM(t, "string");
  return Bn(e) == "symbol" ? e : e + ""
}

function IM(t, e) {
  if (Bn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Bn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Ie = 32,
  pu = function(t) {
    function e() {
      return PM(this, e), EM(this, e, arguments)
    }
    return CM(e, t), TM(e, [{
      key: "renderIcon",
      value: function(n) {
        var i = this.props.inactiveColor,
          o = Ie / 2,
          a = Ie / 6,
          u = Ie / 3,
          s = n.inactive ? i : n.color;
        if (n.type === "plainline") return er.createElement("line", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          strokeDasharray: n.payload.strokeDasharray,
          x1: 0,
          y1: o,
          x2: Ie,
          y2: o,
          className: "recharts-legend-icon"
        });
        if (n.type === "line") return er.createElement("path", {
          strokeWidth: 4,
          fill: "none",
          stroke: s,
          d: "M0,".concat(o, "h").concat(u, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * u, ",").concat(o, `
            H`).concat(Ie, "M").concat(2 * u, ",").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(u, ",").concat(o),
          className: "recharts-legend-icon"
        });
        if (n.type === "rect") return er.createElement("path", {
          stroke: "none",
          fill: s,
          d: "M0,".concat(Ie / 8, "h").concat(Ie, "v").concat(Ie * 3 / 4, "h").concat(-Ie, "z"),
          className: "recharts-legend-icon"
        });
        if (er.isValidElement(n.legendIcon)) {
          var l = _M({}, n);
          return delete l.legendIcon, er.cloneElement(n.legendIcon, l)
        }
        return er.createElement(eo, {
          fill: s,
          cx: o,
          cy: o,
          size: Ie,
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
            width: Ie,
            height: Ie
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
          var x = (0, Mc.default)(d.value) ? null : d.value;
          ue(!(0, Mc.default)(d.value), `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`);
          var w = d.inactive ? l : d.color;
          return er.createElement("li", Ec({
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
  }(kM);
ro(pu, "displayName", "Legend");
ro(pu, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var tf = et(bb()),
  xb = et(Bt());

function xu(t, e, r) {
  return e === !0 ? (0, tf.default)(t, r) : (0, xb.default)(e) ? (0, tf.default)(t, e) : t
}

function Un(t) {
  "@babel/helpers - typeof";
  return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Un(t)
}
var bD = ["ref"];

function wb(t, e) {
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
    e % 2 ? wb(Object(r), !0).forEach(function(n) {
      Ou(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : wb(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function xD(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Ob(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, _b(n.key), n)
  }
}

function wD(t, e, r) {
  return e && Ob(t.prototype, e), r && Ob(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function OD(t, e, r) {
  return e = wu(e), SD(t, Ab() ? Reflect.construct(e, r || [], wu(t).constructor) : e.apply(t, r))
}

function SD(t, e) {
  if (e && (Un(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return AD(t)
}

function AD(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Ab() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Ab = function() {
    return !!t
  })()
}

function wu(t) {
  return wu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, wu(t)
}

function _D(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && ef(t, e)
}

function ef(t, e) {
  return ef = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, ef(t, e)
}

function Ou(t, e, r) {
  return e = _b(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function _b(t) {
  var e = PD(t, "string");
  return Un(e) == "symbol" ? e : e + ""
}

function PD(t, e) {
  if (Un(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Un(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function TD(t, e) {
  if (t == null) return {};
  var r = ED(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function ED(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function MD(t) {
  return t.value
}

function CD(t, e) {
  if (uo.isValidElement(t)) return uo.cloneElement(t, e);
  if (typeof t == "function") return uo.createElement(t, e);
  var r = e.ref,
    n = TD(e, bD);
  return uo.createElement(pu, n)
}
var Sb = 1,
  ke = function(t) {
    function e() {
      var r;
      xD(this, e);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = OD(this, e, [].concat(i)), Ou(r, "lastBoundingBox", {
        width: -1,
        height: -1
      }), r
    }
    return _D(e, t), wD(e, [{
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
        i ? (Math.abs(i.width - this.lastBoundingBox.width) > Sb || Math.abs(i.height - this.lastBoundingBox.height) > Sb) && (this.lastBoundingBox.width = i.width, this.lastBoundingBox.height = i.height, n && n(i)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null))
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
        }, CD(o, hr(hr({}, this.props), {}, {
          payload: xu(f, l, MD)
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
  }(jD);
Ou(ke, "displayName", "Legend");
Ou(ke, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
import po, {
  PureComponent as yR
} from "./react-shim-eraudit.js";
var gx = et(Au()),
  bx = et(Pe());
import yr from "./react-shim-eraudit.js";

function lo(t) {
  "@babel/helpers - typeof";
  return lo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, lo(t)
}

function lf() {
  return lf = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, lf.apply(this, arguments)
}

function qN(t, e) {
  return $N(t) || FN(t, e) || zN(t, e) || WN()
}

function WN() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function zN(t, e) {
  if (t) {
    if (typeof t == "string") return yx(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return yx(t, e)
  }
}

function yx(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function FN(t, e) {
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

function $N(t) {
  if (Array.isArray(t)) return t
}

function vx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function sf(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? vx(Object(r), !0).forEach(function(n) {
      UN(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : vx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function UN(t, e, r) {
  return e = HN(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function HN(t) {
  var e = GN(t, "string");
  return lo(e) == "symbol" ? e : e + ""
}

function GN(t, e) {
  if (lo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (lo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function KN(t) {
  return Array.isArray(t) && Mt(t[0]) && Mt(t[1]) ? t.join(" ~ ") : t
}
var xx = function(e) {
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
        var N = {
            padding: 0,
            margin: 0
          },
          H = (p ? (0, gx.default)(f, p) : f).map(function(F, z) {
            if (F.type === "none") return null;
            var b = sf({
                display: "block",
                paddingTop: 4,
                paddingBottom: 4,
                color: F.color || "#000"
              }, u),
              O = F.formatter || c || KN,
              T = F.value,
              A = F.name,
              j = T,
              E = A;
            if (O && j != null && E != null) {
              var D = O(T, A, F, z, f);
              if (Array.isArray(D)) {
                var L = qN(D, 2);
                j = L[0], E = L[1]
              } else j = D
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
            }, j), yr.createElement("span", {
              className: "recharts-tooltip-item-unit"
            }, F.unit || ""))
          });
        return yr.createElement("ul", {
          className: "recharts-tooltip-item-list",
          style: N
        }, H)
      }
      return null
    },
    P = sf({
      margin: 0,
      padding: 10,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      whiteSpace: "nowrap"
    }, o),
    h = sf({
      margin: 0
    }, l),
    g = !(0, bx.default)(m),
    _ = g ? m : "",
    C = ut("recharts-default-tooltip", d),
    k = ut("recharts-tooltip-label", y);
  g && v && f !== void 0 && f !== null && (_ = v(m, f));
  var B = w ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return yr.createElement("div", lf({
    className: C,
    style: P
  }, B), yr.createElement("p", {
    className: k,
    style: h
  }, yr.isValidElement(_) ? _ : "".concat(_)), S())
};
import aR, {
  PureComponent as uR
} from "./react-shim-eraudit.js";

function fo(t) {
  "@babel/helpers - typeof";
  return fo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, fo(t)
}

function _u(t, e, r) {
  return e = VN(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function VN(t) {
  var e = XN(t, "string");
  return fo(e) == "symbol" ? e : e + ""
}

function XN(t, e) {
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
  YN = {
    visibility: "hidden"
  };

function ZN(t) {
  var e = t.coordinate,
    r = t.translateX,
    n = t.translateY;
  return ut(co, _u(_u(_u(_u({}, "".concat(co, "-right"), X(r) && e && X(e.x) && r >= e.x), "".concat(co, "-left"), X(r) && e && X(e.x) && r < e.x), "".concat(co, "-bottom"), X(n) && e && X(e.y) && n >= e.y), "".concat(co, "-top"), X(n) && e && X(e.y) && n < e.y))
}

function wx(t) {
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

function JN(t) {
  var e = t.translateX,
    r = t.translateY,
    n = t.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(e, "px, ").concat(r, "px, 0)") : "translate(".concat(e, "px, ").concat(r, "px)")
  }
}

function Ox(t) {
  var e = t.allowEscapeViewBox,
    r = t.coordinate,
    n = t.offsetTopLeft,
    i = t.position,
    o = t.reverseDirection,
    a = t.tooltipBox,
    u = t.useTranslate3d,
    s = t.viewBox,
    l, f, c;
  return a.height > 0 && a.width > 0 && r ? (f = wx({
    allowEscapeViewBox: e,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), c = wx({
    allowEscapeViewBox: e,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: i,
    reverseDirection: o,
    tooltipDimension: a.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), l = JN({
    translateX: f,
    translateY: c,
    useTranslate3d: u
  })) : l = YN, {
    cssProperties: l,
    cssClasses: ZN({
      translateX: f,
      translateY: c,
      coordinate: r
    })
  }
}

function Hn(t) {
  "@babel/helpers - typeof";
  return Hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Hn(t)
}

function Sx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ax(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Sx(Object(r), !0).forEach(function(n) {
      ff(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Sx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function QN(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function _x(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Ex(n.key), n)
  }
}

function tR(t, e, r) {
  return e && _x(t.prototype, e), r && _x(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function eR(t, e, r) {
  return e = Pu(e), rR(t, Tx() ? Reflect.construct(e, r || [], Pu(t).constructor) : e.apply(t, r))
}

function rR(t, e) {
  if (e && (Hn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return nR(t)
}

function nR(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function Tx() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (Tx = function() {
    return !!t
  })()
}

function Pu(t) {
  return Pu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Pu(t)
}

function iR(t, e) {
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
  return e = Ex(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Ex(t) {
  var e = oR(t, "string");
  return Hn(e) == "symbol" ? e : e + ""
}

function oR(t, e) {
  if (Hn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Hn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Px = 1,
  jx = function(t) {
    function e() {
      var r;
      QN(this, e);
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      return r = eR(this, e, [].concat(i)), ff(r, "state", {
        dismissed: !1,
        dismissedAtCoordinate: {
          x: 0,
          y: 0
        },
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      }), ff(r, "handleKeyDown", function(a) {
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
    return iR(e, t), tR(e, [{
      key: "updateBBox",
      value: function() {
        if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
          var n = this.wrapperNode.getBoundingClientRect();
          (Math.abs(n.width - this.state.lastBoundingBox.width) > Px || Math.abs(n.height - this.state.lastBoundingBox.height) > Px) && this.setState({
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
          S = Ox({
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
          g = Ax(Ax({
            transition: p && o ? "transform ".concat(u, "ms ").concat(s) : void 0
          }, h), {}, {
            pointerEvents: "none",
            visibility: !this.state.dismissed && o && c ? "visible" : "hidden",
            position: "absolute",
            top: 0,
            left: 0
          }, w);
        return aR.createElement("div", {
          tabIndex: -1,
          className: P,
          style: g,
          ref: function(C) {
            n.wrapperNode = C
          }
        }, l)
      }
    }])
  }(uR);
var sR = function() {
    return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
  },
  se = {
    isSsr: sR(),
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

function Gn(t) {
  "@babel/helpers - typeof";
  return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Gn(t)
}

function Mx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Cx(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Mx(Object(r), !0).forEach(function(n) {
      df(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Mx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function lR(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Ix(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Dx(n.key), n)
  }
}

function cR(t, e, r) {
  return e && Ix(t.prototype, e), r && Ix(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function fR(t, e, r) {
  return e = Tu(e), pR(t, kx() ? Reflect.construct(e, r || [], Tu(t).constructor) : e.apply(t, r))
}

function pR(t, e) {
  if (e && (Gn(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return dR(t)
}

function dR(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function kx() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (kx = function() {
    return !!t
  })()
}

function Tu(t) {
  return Tu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Tu(t)
}

function mR(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && pf(t, e)
}

function pf(t, e) {
  return pf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, pf(t, e)
}

function df(t, e, r) {
  return e = Dx(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Dx(t) {
  var e = hR(t, "string");
  return Gn(e) == "symbol" ? e : e + ""
}

function hR(t, e) {
  if (Gn(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Gn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function vR(t) {
  return t.dataKey
}

function gR(t, e) {
  return po.isValidElement(t) ? po.cloneElement(t, e) : typeof t == "function" ? po.createElement(t, e) : po.createElement(xx, e)
}
var de = function(t) {
  function e() {
    return lR(this, e), fR(this, e, arguments)
  }
  return mR(e, t), cR(e, [{
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
      c && h.length && (h = xu(y.filter(function(_) {
        return _.value != null && (_.hide !== !0 || n.props.includeHidden)
      }), m, vR));
      var g = h.length > 0;
      return po.createElement(jx, {
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
      }, gR(l, Cx(Cx({}, this.props), {}, {
        payload: h
      })))
    }
  }])
}(yR);
df(de, "displayName", "Tooltip");
df(de, "defaultProps", {
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
var Zx = et(yf());
import vf, {
  forwardRef as YR,
  cloneElement as ZR,
  useState as JR,
  useImperativeHandle as QR,
  useRef as Yx,
  useEffect as tL,
  useMemo as eL,
  useCallback as rL
} from "./react-shim-eraudit.js";

function mo(t) {
  "@babel/helpers - typeof";
  return mo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, mo(t)
}

function Vx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Eu(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Vx(Object(r), !0).forEach(function(n) {
      FR(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Vx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function FR(t, e, r) {
  return e = $R(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function $R(t) {
  var e = UR(t, "string");
  return mo(e) == "symbol" ? e : e + ""
}

function UR(t, e) {
  if (mo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (mo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function HR(t, e) {
  return XR(t) || VR(t, e) || KR(t, e) || GR()
}

function GR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function KR(t, e) {
  if (t) {
    if (typeof t == "string") return Xx(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Xx(t, e)
  }
}

function Xx(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function VR(t, e) {
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

function XR(t) {
  if (Array.isArray(t)) return t
}
var ju = YR(function(t, e) {
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
    h = Yx(null),
    g = Yx();
  g.current = w, QR(e, function() {
    return Object.defineProperty(h.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), h.current
      },
      configurable: !0
    })
  });
  var _ = JR({
      containerWidth: i.width,
      containerHeight: i.height
    }),
    C = HR(_, 2),
    k = C[0],
    B = C[1],
    W = rL(function(H, F) {
      B(function(z) {
        var b = Math.round(H),
          O = Math.round(F);
        return z.containerWidth === b && z.containerHeight === O ? z : {
          containerWidth: b,
          containerHeight: O
        }
      })
    }, []);
  tL(function() {
    var H = function(A) {
      var j, E = A[0].contentRect,
        D = E.width,
        L = E.height;
      W(D, L), (j = g.current) === null || j === void 0 || j.call(g, D, L)
    };
    m > 0 && (H = (0, Zx.default)(H, m, {
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
  var N = eL(function() {
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
    var O = !Array.isArray(d) && Ee(d.type).endsWith("Chart");
    return vf.Children.map(d, function(T) {
      return vf.isValidElement(T) ? ZR(T, Eu({
        width: z,
        height: b
      }, O ? {
        style: Eu({
          height: "100%",
          width: "100%",
          maxHeight: b,
          maxWidth: z
        }, T.props.style)
      } : {})) : T
    })
  }, [r, d, s, p, c, f, k, a]);
  return vf.createElement("div", {
    id: v ? "".concat(v) : void 0,
    className: ut("recharts-responsive-container", x),
    style: Eu(Eu({}, P), {}, {
      width: a,
      height: s,
      minWidth: f,
      minHeight: c,
      maxHeight: p
    }),
    ref: h
  }, N)
});
var gf = function(e) {
  return null
};
gf.displayName = "Cell";
var wf = et(Pe());
import f0, {
  useMemo as CL
} from "./react-shim-eraudit.js";

function ho(t) {
  "@babel/helpers - typeof";
  return ho = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ho(t)
}

function Jx(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function bf(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Jx(Object(r), !0).forEach(function(n) {
      nL(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Jx(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function nL(t, e, r) {
  return e = iL(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function iL(t) {
  var e = oL(t, "string");
  return ho(e) == "symbol" ? e : e + ""
}

function oL(t, e) {
  if (ho(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ho(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Kn = {
    widthCache: {},
    cacheCount: 0
  },
  aL = 2e3,
  uL = {
    position: "absolute",
    top: "-20000px",
    left: 0,
    padding: 0,
    margin: 0,
    border: "none",
    whiteSpace: "pre"
  };
var Qx = "recharts_measurement_span";

function sL(t) {
  var e = bf({}, t);
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
    var n = sL(r),
      i = JSON.stringify({
        text: e,
        copyStyle: n
      });
    if (Kn.widthCache[i]) return Kn.widthCache[i];
    try {
      var o = document.getElementById(Qx);
      o || (o = document.createElement("span"), o.setAttribute("id", Qx), o.setAttribute("aria-hidden", "true"), document.body.appendChild(o));
      var a = bf(bf({}, uL), n);
      Object.assign(o.style, a), o.textContent = "".concat(e);
      var u = o.getBoundingClientRect(),
        s = {
          width: u.width,
          height: u.height
        };
      return Kn.widthCache[i] = s, ++Kn.cacheCount > aL && (Kn.cacheCount = 0, Kn.widthCache = {}), s
    } catch {
      return {
        width: 0,
        height: 0
      }
    }
  },
  t0 = function(e) {
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

function Cu(t, e) {
  return pL(t) || fL(t, e) || cL(t, e) || lL()
}

function lL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function cL(t, e) {
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

function fL(t, e) {
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

function pL(t) {
  if (Array.isArray(t)) return t
}

function dL(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function r0(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, hL(n.key), n)
  }
}

function mL(t, e, r) {
  return e && r0(t.prototype, e), r && r0(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function hL(t) {
  var e = yL(t, "string");
  return yo(e) == "symbol" ? e : e + ""
}

function yL(t, e) {
  if (yo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (yo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var n0 = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  i0 = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  vL = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  gL = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  a0 = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1
  },
  bL = Object.keys(a0),
  Vn = "NaN";

function xL(t, e) {
  return t * a0[e]
}
var Mu = function() {
  function t(e, r) {
    dL(this, t), this.num = e, this.unit = r, this.num = e, this.unit = r, Number.isNaN(e) && (this.unit = ""), r !== "" && !vL.test(r) && (this.num = NaN, this.unit = ""), bL.includes(r) && (this.num = xL(e, r), this.unit = "px")
  }
  return mL(t, [{
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
      var n, i = (n = gL.exec(r)) !== null && n !== void 0 ? n : [],
        o = Cu(i, 3),
        a = o[1],
        u = o[2];
      return new t(parseFloat(a), u ?? "")
    }
  }])
}();

function u0(t) {
  if (t.includes(Vn)) return Vn;
  for (var e = t; e.includes("*") || e.includes("/");) {
    var r, n = (r = n0.exec(e)) !== null && r !== void 0 ? r : [],
      i = Cu(n, 4),
      o = i[1],
      a = i[2],
      u = i[3],
      s = Mu.parse(o ?? ""),
      l = Mu.parse(u ?? ""),
      f = a === "*" ? s.multiply(l) : s.divide(l);
    if (f.isNaN()) return Vn;
    e = e.replace(n0, f.toString())
  }
  for (; e.includes("+") || /.-\d+(?:\.\d+)?/.test(e);) {
    var c, p = (c = i0.exec(e)) !== null && c !== void 0 ? c : [],
      d = Cu(p, 4),
      y = d[1],
      m = d[2],
      v = d[3],
      x = Mu.parse(y ?? ""),
      w = Mu.parse(v ?? ""),
      S = m === "+" ? x.add(w) : x.subtract(w);
    if (S.isNaN()) return Vn;
    e = e.replace(i0, S.toString())
  }
  return e
}
var o0 = /\(([^()]*)\)/;

function wL(t) {
  for (var e = t; e.includes("(");) {
    var r = o0.exec(e),
      n = Cu(r, 2),
      i = n[1];
    e = e.replace(o0, u0(i))
  }
  return e
}

function OL(t) {
  var e = t.replace(/\s+/g, "");
  return e = wL(e), e = u0(e), e
}

function SL(t) {
  try {
    return OL(t)
  } catch {
    return Vn
  }
}

function Iu(t) {
  var e = SL(t.slice(5, -1));
  return e === Vn ? "" : e
}
var AL = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"],
  _L = ["dx", "dy", "angle", "className", "breakAll"];

function xf() {
  return xf = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, xf.apply(this, arguments)
}

function s0(t, e) {
  if (t == null) return {};
  var r = PL(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function PL(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function l0(t, e) {
  return ML(t) || jL(t, e) || EL(t, e) || TL()
}

function TL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function EL(t, e) {
  if (t) {
    if (typeof t == "string") return c0(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return c0(t, e)
  }
}

function c0(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function jL(t, e) {
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

function ML(t) {
  if (Array.isArray(t)) return t
}
var m0 = /[ \f\n\r\t\v\u2028\u2029]+/,
  h0 = function(e) {
    var r = e.children,
      n = e.breakAll,
      i = e.style;
    try {
      var o = [];
      (0, wf.default)(r) || (n ? o = r.toString().split("") : o = r.toString().split(m0));
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
  IL = function(e, r, n, i, o) {
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
          O = h0({
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
        C = l0(_, 2),
        k = C[0],
        B = C[1],
        W = v(h),
        N = l0(W, 1),
        H = N[0];
      if (!k && !H && (x = h + 1), k && H && (w = h - 1), !k && H) {
        P = B;
        break
      }
      S++
    }
    return P || d
  },
  p0 = function(e) {
    var r = (0, wf.default)(e) ? [] : e.toString().split(m0);
    return [{
      words: r
    }]
  },
  kL = function(e) {
    var r = e.width,
      n = e.scaleToFit,
      i = e.children,
      o = e.style,
      a = e.breakAll,
      u = e.maxLines;
    if ((r || n) && !se.isSsr) {
      var s, l, f = h0({
        breakAll: a,
        children: i,
        style: o
      });
      if (f) {
        var c = f.wordsWithComputedWidth,
          p = f.spaceWidth;
        s = c, l = p
      } else return p0(i);
      return IL({
        breakAll: a,
        children: i,
        maxLines: u,
        style: o
      }, s, l, r, n)
    }
    return p0(i)
  },
  d0 = "#808080",
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
      x = v === void 0 ? d0 : v,
      w = s0(e, AL),
      S = CL(function() {
        return kL({
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
      k = s0(w, _L);
    if (!Mt(n) || !Mt(o)) return null;
    var B = n + (X(P) ? P : 0),
      W = o + (X(h) ? h : 0),
      N;
    switch (m) {
      case "start":
        N = Iu("calc(".concat(l, ")"));
        break;
      case "middle":
        N = Iu("calc(".concat((S.length - 1) / 2, " * -").concat(u, " + (").concat(l, " / 2))"));
        break;
      default:
        N = Iu("calc(".concat(S.length - 1, " * -").concat(u, ")"));
        break
    }
    var H = [];
    if (c) {
      var F = S[0].width,
        z = w.width;
      H.push("scale(".concat((X(z) ? z / F : 1) / F, ")"))
    }
    return g && H.push("rotate(".concat(g, ", ").concat(B, ", ").concat(W, ")")), H.length && (k.transform = H.join(" ")), f0.createElement("text", xf({}, st(k, !0), {
      x: B,
      y: W,
      className: ut("recharts-text", _),
      textAnchor: d,
      fill: x.includes("url") ? d0 : x
    }), S.map(function(b, O) {
      var T = b.words.join(C ? "" : " ");
      return f0.createElement("tspan", {
        x: B,
        dy: O === 0 ? N : u,
        key: "".concat(T, "-").concat(O)
      }, T)
    }))
  };
var Zo = et(Pe()),
  Jo = et(Bt()),
  jp = et(_e());
import ur, {
  cloneElement as Ep,
  isValidElement as As,
  createElement as jz
} from "./react-shim-eraudit.js";
var fz = et(Pe()),
  pz = et(Bt());
import {
  isValidElement as QQ
} from "./react-shim-eraudit.js";
var ms = {};
tP(ms, {
  scaleBand: () => _r,
  scaleDiverging: () => ps,
  scaleDivergingLog: () => tp,
  scaleDivergingPow: () => ds,
  scaleDivergingSqrt: () => Rw,
  scaleDivergingSymlog: () => ep,
  scaleIdentity: () => Yu,
  scaleImplicit: () => qu,
  scaleLinear: () => an,
  scaleLog: () => Zu,
  scaleOrdinal: () => Zn,
  scalePoint: () => Pr,
  scalePow: () => Mo,
  scaleQuantile: () => ts,
  scaleQuantize: () => es,
  scaleRadial: () => Qu,
  scaleSequential: () => ss,
  scaleSequentialLog: () => Jf,
  scaleSequentialPow: () => ls,
  scaleSequentialQuantile: () => cs,
  scaleSequentialSqrt: () => Nw,
  scaleSequentialSymlog: () => Qf,
  scaleSqrt: () => nw,
  scaleSymlog: () => Ju,
  scaleThreshold: () => rs,
  scaleTime: () => Yf,
  scaleUtc: () => Zf,
  tickFormat: () => _o
});

function le(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}

function Of(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}

function Zr(t) {
  let e, r, n;
  t.length !== 2 ? (e = le, r = (u, s) => le(t(u), s), n = (u, s) => t(u) - s) : (e = t === le || t === Of ? t : DL, r = t, n = t);

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

function DL() {
  return 0
}

function vo(t) {
  return t === null ? NaN : +t
}

function* y0(t, e) {
  if (e === void 0)
    for (let r of t) r != null && (r = +r) >= r && (yield r);
  else {
    let r = -1;
    for (let n of t)(n = e(n, ++r, t)) != null && (n = +n) >= n && (yield n)
  }
}
var v0 = Zr(le),
  g0 = v0.right,
  NL = v0.left,
  RL = Zr(vo).center,
  Fe = g0;
var Xn = class extends Map {
  constructor(e, r = qL) {
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
    return super.get(b0(this, e))
  }
  has(e) {
    return super.has(b0(this, e))
  }
  set(e, r) {
    return super.set(LL(this, e), r)
  }
  delete(e) {
    return super.delete(BL(this, e))
  }
};

function b0({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) ? t.get(n) : r
}

function LL({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) ? t.get(n) : (t.set(n, r), r)
}

function BL({
  _intern: t,
  _key: e
}, r) {
  let n = e(r);
  return t.has(n) && (r = t.get(n), t.delete(n)), r
}

function qL(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t
}

function x0(t = le) {
  if (t === le) return Sf;
  if (typeof t != "function") throw new TypeError("compare is not a function");
  return (e, r) => {
    let n = t(e, r);
    return n || n === 0 ? n : (t(r, r) === 0) - (t(e, e) === 0)
  }
}

function Sf(t, e) {
  return (t == null || !(t >= t)) - (e == null || !(e >= e)) || (t < e ? -1 : t > e ? 1 : 0)
}
var WL = Math.sqrt(50),
  zL = Math.sqrt(10),
  FL = Math.sqrt(2);

function ku(t, e, r) {
  let n = (e - t) / Math.max(0, r),
    i = Math.floor(Math.log10(n)),
    o = n / Math.pow(10, i),
    a = o >= WL ? 10 : o >= zL ? 5 : o >= FL ? 2 : 1,
    u, s, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, u = Math.round(t * l), s = Math.round(e * l), u / l < t && ++u, s / l > e && --s, l = -l) : (l = Math.pow(10, i) * a, u = Math.round(t / l), s = Math.round(e / l), u * l < t && ++u, s * l > e && --s), s < u && .5 <= r && r < 2 ? ku(t, e, r * 2) : [u, s, l]
}

function Jr(t, e, r) {
  if (e = +e, t = +t, r = +r, !(r > 0)) return [];
  if (t === e) return [t];
  let n = e < t,
    [i, o, a] = n ? ku(e, t, r) : ku(t, e, r);
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
  return e = +e, t = +t, r = +r, ku(t, e, r)[2]
}

function Yn(t, e, r) {
  e = +e, t = +t, r = +r;
  let n = e < t,
    i = n ? go(e, t, r) : go(t, e, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i)
}

function Du(t, e) {
  let r;
  if (e === void 0)
    for (let n of t) n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of t)(i = e(i, ++n, t)) != null && (r < i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Nu(t, e) {
  let r;
  if (e === void 0)
    for (let n of t) n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of t)(i = e(i, ++n, t)) != null && (r > i || r === void 0 && i >= i) && (r = i)
  }
  return r
}

function Ru(t, e, r = 0, n = 1 / 0, i) {
  if (e = Math.floor(e), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(t.length - 1, n)), !(r <= e && e <= n)) return t;
  for (i = i === void 0 ? Sf : x0(i); n > r;) {
    if (n - r > 600) {
      let s = n - r + 1,
        l = e - r + 1,
        f = Math.log(s),
        c = .5 * Math.exp(2 * f / 3),
        p = .5 * Math.sqrt(f * c * (s - c) / s) * (l - s / 2 < 0 ? -1 : 1),
        d = Math.max(r, Math.floor(e - l * c / s + p)),
        y = Math.min(n, Math.floor(e + (s - l) * c / s + p));
      Ru(t, e, d, y, i)
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

function Lu(t, e, r) {
  if (t = Float64Array.from(y0(t, r)), !(!(n = t.length) || isNaN(e = +e))) {
    if (e <= 0 || n < 2) return Nu(t);
    if (e >= 1) return Du(t);
    var n, i = (n - 1) * e,
      o = Math.floor(i),
      a = Du(Ru(t, o).subarray(0, o + 1)),
      u = Nu(t.subarray(o + 1));
    return a + (u - a) * (i - o)
  }
}

function Af(t, e, r = vo) {
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

function Bu(t, e, r) {
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

function De(t, e) {
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
var qu = Symbol("implicit");

function Zn() {
  var t = new Xn,
    e = [],
    r = [],
    n = qu;

  function i(o) {
    let a = t.get(o);
    if (a === void 0) {
      if (n !== qu) return n;
      t.set(o, a = e.push(o) - 1)
    }
    return r[a % r.length]
  }
  return i.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [], t = new Xn;
    for (let a of o) t.has(a) || t.set(a, e.push(a) - 1);
    return i
  }, i.range = function(o) {
    return arguments.length ? (r = Array.from(o), i) : r.slice()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return Zn(e, r).unknown(n)
  }, kt.apply(i, arguments), i
}

function _r() {
  var t = Zn().unknown(void 0),
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
    var v = Bu(p).map(function(x) {
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
    return _r(e(), [n, i]).round(u).paddingInner(s).paddingOuter(l).align(f)
  }, kt.apply(c(), arguments)
}

function w0(t) {
  var e = t.copy;
  return t.padding = t.paddingOuter, delete t.paddingInner, delete t.paddingOuter, t.copy = function() {
    return w0(e())
  }, t
}

function Pr() {
  return w0(_r.apply(null, arguments).paddingInner(1))
}

function Wu(t, e, r) {
  t.prototype = e.prototype = r, r.constructor = t
}

function _f(t, e) {
  var r = Object.create(t.prototype);
  for (var n in e) r[n] = e[n];
  return r
}

function Oo() {}
var xo = .7,
  $u = 1 / xo,
  Jn = "\\s*([+-]?\\d+)\\s*",
  wo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  rr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  $L = /^#([0-9a-f]{3,8})$/,
  UL = new RegExp(`^rgb\\(${Jn},${Jn},${Jn}\\)$`),
  HL = new RegExp(`^rgb\\(${rr},${rr},${rr}\\)$`),
  GL = new RegExp(`^rgba\\(${Jn},${Jn},${Jn},${wo}\\)$`),
  KL = new RegExp(`^rgba\\(${rr},${rr},${rr},${wo}\\)$`),
  VL = new RegExp(`^hsl\\(${wo},${rr},${rr}\\)$`),
  XL = new RegExp(`^hsla\\(${wo},${rr},${rr},${wo}\\)$`),
  O0 = {
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
Wu(Oo, Tr, {
  copy(t) {
    return Object.assign(new this.constructor, this, t)
  },
  displayable() {
    return this.rgb().displayable()
  },
  hex: S0,
  formatHex: S0,
  formatHex8: YL,
  formatHsl: ZL,
  formatRgb: A0,
  toString: A0
});

function S0() {
  return this.rgb().formatHex()
}

function YL() {
  return this.rgb().formatHex8()
}

function ZL() {
  return M0(this).formatHsl()
}

function A0() {
  return this.rgb().formatRgb()
}

function Tr(t) {
  var e, r;
  return t = (t + "").trim().toLowerCase(), (e = $L.exec(t)) ? (r = e[1].length, e = parseInt(e[1], 16), r === 6 ? _0(e) : r === 3 ? new me(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : r === 8 ? zu(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : r === 4 ? zu(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = UL.exec(t)) ? new me(e[1], e[2], e[3], 1) : (e = HL.exec(t)) ? new me(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = GL.exec(t)) ? zu(e[1], e[2], e[3], e[4]) : (e = KL.exec(t)) ? zu(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = VL.exec(t)) ? E0(e[1], e[2] / 100, e[3] / 100, 1) : (e = XL.exec(t)) ? E0(e[1], e[2] / 100, e[3] / 100, e[4]) : O0.hasOwnProperty(t) ? _0(O0[t]) : t === "transparent" ? new me(NaN, NaN, NaN, 0) : null
}

function _0(t) {
  return new me(t >> 16 & 255, t >> 8 & 255, t & 255, 1)
}

function zu(t, e, r, n) {
  return n <= 0 && (t = e = r = NaN), new me(t, e, r, n)
}

function JL(t) {
  return t instanceof Oo || (t = Tr(t)), t ? (t = t.rgb(), new me(t.r, t.g, t.b, t.opacity)) : new me
}

function Qn(t, e, r, n) {
  return arguments.length === 1 ? JL(t) : new me(t, e, r, n ?? 1)
}

function me(t, e, r, n) {
  this.r = +t, this.g = +e, this.b = +r, this.opacity = +n
}
Wu(me, Qn, _f(Oo, {
  brighter(t) {
    return t = t == null ? $u : Math.pow($u, t), new me(this.r * t, this.g * t, this.b * t, this.opacity)
  },
  darker(t) {
    return t = t == null ? xo : Math.pow(xo, t), new me(this.r * t, this.g * t, this.b * t, this.opacity)
  },
  rgb() {
    return this
  },
  clamp() {
    return new me(tn(this.r), tn(this.g), tn(this.b), Uu(this.opacity))
  },
  displayable() {
    return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
  },
  hex: P0,
  formatHex: P0,
  formatHex8: QL,
  formatRgb: T0,
  toString: T0
}));

function P0() {
  return `#${Qr(this.r)}${Qr(this.g)}${Qr(this.b)}`
}

function QL() {
  return `#${Qr(this.r)}${Qr(this.g)}${Qr(this.b)}${Qr((isNaN(this.opacity)?1:this.opacity)*255)}`
}

function T0() {
  let t = Uu(this.opacity);
  return `${t===1?"rgb(":"rgba("}${tn(this.r)}, ${tn(this.g)}, ${tn(this.b)}${t===1?")":`, ${t})`}`
}

function Uu(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t))
}

function tn(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0))
}

function Qr(t) {
  return t = tn(t), (t < 16 ? "0" : "") + t.toString(16)
}

function E0(t, e, r, n) {
  return n <= 0 ? t = e = r = NaN : r <= 0 || r >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new $e(t, e, r, n)
}

function M0(t) {
  if (t instanceof $e) return new $e(t.h, t.s, t.l, t.opacity);
  if (t instanceof Oo || (t = Tr(t)), !t) return new $e;
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

function C0(t, e, r, n) {
  return arguments.length === 1 ? M0(t) : new $e(t, e, r, n ?? 1)
}

function $e(t, e, r, n) {
  this.h = +t, this.s = +e, this.l = +r, this.opacity = +n
}
Wu($e, C0, _f(Oo, {
  brighter(t) {
    return t = t == null ? $u : Math.pow($u, t), new $e(this.h, this.s, this.l * t, this.opacity)
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
    return new me(Pf(t >= 240 ? t - 240 : t + 120, i, n), Pf(t, i, n), Pf(t < 120 ? t + 240 : t - 120, i, n), this.opacity)
  },
  clamp() {
    return new $e(j0(this.h), Fu(this.s), Fu(this.l), Uu(this.opacity))
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
  },
  formatHsl() {
    let t = Uu(this.opacity);
    return `${t===1?"hsl(":"hsla("}${j0(this.h)}, ${Fu(this.s)*100}%, ${Fu(this.l)*100}%${t===1?")":`, ${t})`}`
  }
}));

function j0(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t
}

function Fu(t) {
  return Math.max(0, Math.min(1, t || 0))
}

function Pf(t, e, r) {
  return (t < 60 ? e + (r - e) * t / 60 : t < 180 ? r : t < 240 ? e + (r - e) * (240 - t) / 60 : e) * 255
}

function Tf(t, e, r, n, i) {
  var o = t * t,
    a = o * t;
  return ((1 - 3 * t + 3 * o - a) * e + (4 - 6 * o + 3 * a) * r + (1 + 3 * t + 3 * o - 3 * a) * n + a * i) / 6
}

function I0(t) {
  var e = t.length - 1;
  return function(r) {
    var n = r <= 0 ? r = 0 : r >= 1 ? (r = 1, e - 1) : Math.floor(r * e),
      i = t[n],
      o = t[n + 1],
      a = n > 0 ? t[n - 1] : 2 * i - o,
      u = n < e - 1 ? t[n + 2] : 2 * o - i;
    return Tf((r - n / e) * e, a, i, o, u)
  }
}

function k0(t) {
  var e = t.length;
  return function(r) {
    var n = Math.floor(((r %= 1) < 0 ? ++r : r) * e),
      i = t[(n + e - 1) % e],
      o = t[n % e],
      a = t[(n + 1) % e],
      u = t[(n + 2) % e];
    return Tf((r - n / e) * e, i, o, a, u)
  }
}
var So = t => () => t;

function tB(t, e) {
  return function(r) {
    return t + r * e
  }
}

function eB(t, e, r) {
  return t = Math.pow(t, r), e = Math.pow(e, r) - t, r = 1 / r,
    function(n) {
      return Math.pow(t + n * e, r)
    }
}

function D0(t) {
  return (t = +t) == 1 ? Hu : function(e, r) {
    return r - e ? eB(e, r, t) : So(isNaN(e) ? r : e)
  }
}

function Hu(t, e) {
  var r = e - t;
  return r ? tB(t, r) : So(isNaN(t) ? e : t)
}
var Ef = function t(e) {
  var r = D0(e);

  function n(i, o) {
    var a = r((i = Qn(i)).r, (o = Qn(o)).r),
      u = r(i.g, o.g),
      s = r(i.b, o.b),
      l = Hu(i.opacity, o.opacity);
    return function(f) {
      return i.r = a(f), i.g = u(f), i.b = s(f), i.opacity = l(f), i + ""
    }
  }
  return n.gamma = t, n
}(1);

function N0(t) {
  return function(e) {
    var r = e.length,
      n = new Array(r),
      i = new Array(r),
      o = new Array(r),
      a, u;
    for (a = 0; a < r; ++a) u = Qn(e[a]), n[a] = u.r || 0, i[a] = u.g || 0, o[a] = u.b || 0;
    return n = t(n), i = t(i), o = t(o), u.opacity = 1,
      function(s) {
        return u.r = n(s), u.g = i(s), u.b = o(s), u + ""
      }
  }
}
var AX = N0(I0),
  _X = N0(k0);

function R0(t, e) {
  e || (e = []);
  var r = t ? Math.min(e.length, t.length) : 0,
    n = e.slice(),
    i;
  return function(o) {
    for (i = 0; i < r; ++i) n[i] = t[i] * (1 - o) + e[i] * o;
    return n
  }
}

function L0(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView)
}

function B0(t, e) {
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

function q0(t, e) {
  var r = new Date;
  return t = +t, e = +e,
    function(n) {
      return r.setTime(t * (1 - n) + e * n), r
    }
}

function Er(t, e) {
  return t = +t, e = +e,
    function(r) {
      return t * (1 - r) + e * r
    }
}

function W0(t, e) {
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
var Mf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  jf = new RegExp(Mf.source, "g");

function rB(t) {
  return function() {
    return t
  }
}

function nB(t) {
  return function(e) {
    return t(e) + ""
  }
}

function z0(t, e) {
  var r = Mf.lastIndex = jf.lastIndex = 0,
    n, i, o, a = -1,
    u = [],
    s = [];
  for (t = t + "", e = e + "";
    (n = Mf.exec(t)) && (i = jf.exec(e));)(o = i.index) > r && (o = e.slice(r, o), u[a] ? u[a] += o : u[++a] = o), (n = n[0]) === (i = i[0]) ? u[a] ? u[a] += i : u[++a] = i : (u[++a] = null, s.push({
    i: a,
    x: Er(n, i)
  })), r = jf.lastIndex;
  return r < e.length && (o = e.slice(r), u[a] ? u[a] += o : u[++a] = o), u.length < 2 ? s[0] ? nB(s[0].x) : rB(e) : (e = s.length, function(l) {
    for (var f = 0, c; f < e; ++f) u[(c = s[f]).i] = c.x(l);
    return u.join("")
  })
}

function ge(t, e) {
  var r = typeof e,
    n;
  return e == null || r === "boolean" ? So(e) : (r === "number" ? Er : r === "string" ? (n = Tr(e)) ? (e = n, Ef) : z0 : e instanceof Tr ? Ef : e instanceof Date ? q0 : L0(e) ? R0 : Array.isArray(e) ? B0 : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? W0 : Er)(t, e)
}

function en(t, e) {
  return t = +t, e = +e,
    function(r) {
      return Math.round(t * (1 - r) + e * r)
    }
}

function Gu(t, e) {
  e === void 0 && (e = t, t = ge);
  for (var r = 0, n = e.length - 1, i = e[0], o = new Array(n < 0 ? 0 : n); r < n;) o[r] = t(i, i = e[++r]);
  return function(a) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(a *= n)));
    return o[u](a - u)
  }
}

function Cf(t) {
  return function() {
    return t
  }
}

function jr(t) {
  return +t
}
var F0 = [0, 1];

function $t(t) {
  return t
}

function If(t, e) {
  return (e -= t = +t) ? function(r) {
    return (r - t) / e
  } : Cf(isNaN(e) ? NaN : .5)
}

function iB(t, e) {
  var r;
  return t > e && (r = t, t = e, e = r),
    function(n) {
      return Math.max(t, Math.min(e, n))
    }
}

function oB(t, e, r) {
  var n = t[0],
    i = t[1],
    o = e[0],
    a = e[1];
  return i < n ? (n = If(i, n), o = r(a, o)) : (n = If(n, i), o = r(o, a)),
    function(u) {
      return o(n(u))
    }
}

function aB(t, e, r) {
  var n = Math.min(t.length, e.length) - 1,
    i = new Array(n),
    o = new Array(n),
    a = -1;
  for (t[n] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a < n;) i[a] = If(t[a], t[a + 1]), o[a] = r(e[a], e[a + 1]);
  return function(u) {
    var s = Fe(t, u, 1, n) - 1;
    return o[s](i[s](u))
  }
}

function nr(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())
}

function rn() {
  var t = F0,
    e = F0,
    r = ge,
    n, i, o, a = $t,
    u, s, l;

  function f() {
    var p = Math.min(t.length, e.length);
    return a !== $t && (a = iB(t[0], t[p - 1])), u = p > 2 ? aB : oB, s = l = null, c
  }

  function c(p) {
    return p == null || isNaN(p = +p) ? o : (s || (s = u(t.map(n), e, r)))(n(a(p)))
  }
  return c.invert = function(p) {
      return a(i((l || (l = u(e, t.map(n), Er)))(p)))
    }, c.domain = function(p) {
      return arguments.length ? (t = Array.from(p, jr), f()) : t.slice()
    }, c.range = function(p) {
      return arguments.length ? (e = Array.from(p), f()) : e.slice()
    }, c.rangeRound = function(p) {
      return e = Array.from(p), r = en, f()
    }, c.clamp = function(p) {
      return arguments.length ? (a = p ? !0 : $t, f()) : a !== $t
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
  return rn()($t, $t)
}

function $0(t) {
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

function U0(t, e) {
  return function(r, n) {
    for (var i = r.length, o = [], a = 0, u = t[0], s = 0; i > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), o.push(r.substring(i -= u, i + u)), !((s += u + 1) > n));) u = t[a = (a + 1) % t.length];
    return o.reverse().join(e)
  }
}

function H0(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(r) {
      return t[+r]
    })
  }
}
var uB = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function or(t) {
  if (!(e = uB.exec(t))) throw new Error("invalid format: " + t);
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
or.prototype = Ku.prototype;

function Ku(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + ""
}
Ku.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type
};

function G0(t) {
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

function K0(t, e) {
  var r = on(t, e);
  if (!r) return Ao = void 0, t.toPrecision(e);
  var n = r[0],
    i = r[1],
    o = i - (Ao = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    a = n.length;
  return o === a ? n : o > a ? n + new Array(o - a + 1).join("0") : o > 0 ? n.slice(0, o) + "." + n.slice(o) : "0." + new Array(1 - o).join("0") + on(t, Math.max(0, e + o - 1))[0]
}

function kf(t, e) {
  var r = on(t, e);
  if (!r) return t + "";
  var n = r[0],
    i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0")
}
var Df = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: t => Math.round(t).toString(2),
  c: t => t + "",
  d: $0,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: t => Math.round(t).toString(8),
  p: (t, e) => kf(t * 100, e),
  r: kf,
  s: K0,
  X: t => Math.round(t).toString(16).toUpperCase(),
  x: t => Math.round(t).toString(16)
};

function Nf(t) {
  return t
}
var V0 = Array.prototype.map,
  X0 = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function Y0(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Nf : U0(V0.call(t.grouping, Number), t.thousands + ""),
    r = t.currency === void 0 ? "" : t.currency[0] + "",
    n = t.currency === void 0 ? "" : t.currency[1] + "",
    i = t.decimal === void 0 ? "." : t.decimal + "",
    o = t.numerals === void 0 ? Nf : H0(V0.call(t.numerals, String)),
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
    g === "n" ? (S = !0, g = "g") : Df[g] || (P === void 0 && (P = 12), h = !0, g = "g"), (x || d === "0" && y === "=") && (x = !0, d = "0", y = "=");
    var _ = (p && p.prefix !== void 0 ? p.prefix : "") + (v === "$" ? r : v === "#" && /[boxX]/.test(g) ? "0" + g.toLowerCase() : ""),
      C = (v === "$" ? n : /[%p]/.test(g) ? a : "") + (p && p.suffix !== void 0 ? p.suffix : ""),
      k = Df[g],
      B = /[defgprs%]/.test(g);
    P = P === void 0 ? 6 : /[gprs]/.test(g) ? Math.max(1, Math.min(21, P)) : Math.max(0, Math.min(20, P));

    function W(N) {
      var H = _,
        F = C,
        z, b, O;
      if (g === "c") F = k(N) + F, N = "";
      else {
        N = +N;
        var T = N < 0 || 1 / N < 0;
        if (N = isNaN(N) ? s : k(Math.abs(N), P), h && (N = G0(N)), T && +N == 0 && m !== "+" && (T = !1), H = (T ? m === "(" ? m : u : m === "-" || m === "(" ? "" : m) + H, F = (g === "s" && !isNaN(N) && Ao !== void 0 ? X0[8 + Ao / 3] : "") + F + (T && m === "(" ? ")" : ""), B) {
          for (z = -1, b = N.length; ++z < b;)
            if (O = N.charCodeAt(z), 48 > O || O > 57) {
              F = (O === 46 ? i + N.slice(z + 1) : N.slice(z)) + F, N = N.slice(0, z);
              break
            }
        }
      }
      S && !x && (N = e(N, 1 / 0));
      var A = H.length + N.length + F.length,
        j = A < w ? new Array(w - A + 1).join(d) : "";
      switch (S && x && (N = e(j + N, j.length ? w - F.length : 1 / 0), j = ""), y) {
        case "<":
          N = H + N + F + j;
          break;
        case "=":
          N = H + j + N + F;
          break;
        case "^":
          N = j.slice(0, A = j.length >> 1) + H + N + F + j.slice(A);
          break;
        default:
          N = j + H + N + F;
          break
      }
      return o(N)
    }
    return W.toString = function() {
      return c + ""
    }, W
  }

  function f(c, p) {
    var d = Math.max(-8, Math.min(8, Math.floor(ir(p) / 3))) * 3,
      y = Math.pow(10, -d),
      m = l((c = or(c), c.type = "f", c), {
        suffix: X0[8 + d / 3]
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
var Vu, ti, Xu;
Rf({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function Rf(t) {
  return Vu = Y0(t), ti = Vu.format, Xu = Vu.formatPrefix, Vu
}

function Lf(t) {
  return Math.max(0, -ir(Math.abs(t)))
}

function Bf(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(ir(e) / 3))) * 3 - ir(Math.abs(t)))
}

function qf(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, ir(e) - ir(t)) + 1
}

function _o(t, e, r, n) {
  var i = Yn(t, e, r),
    o;
  switch (n = or(n ?? ",f"), n.type) {
    case "s": {
      var a = Math.max(Math.abs(t), Math.abs(e));
      return n.precision == null && !isNaN(o = Bf(i, a)) && (n.precision = o), Xu(n, a)
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(o = qf(i, Math.max(Math.abs(t), Math.abs(e)))) && (n.precision = o - (n.type === "e"));
      break
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(o = Lf(i)) && (n.precision = o - (n.type === "%") * 2);
      break
    }
  }
  return ti(n)
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

function Yu(t) {
  var e;

  function r(n) {
    return n == null || isNaN(n = +n) ? e : n
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (t = Array.from(n, jr), r) : t.slice()
  }, r.unknown = function(n) {
    return arguments.length ? (e = n, r) : e
  }, r.copy = function() {
    return Yu(t).unknown(e)
  }, t = arguments.length ? Array.from(t, jr) : [0, 1], ce(r)
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

function Z0(t) {
  return Math.log(t)
}

function J0(t) {
  return Math.exp(t)
}

function sB(t) {
  return -Math.log(-t)
}

function lB(t) {
  return -Math.exp(-t)
}

function cB(t) {
  return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t
}

function fB(t) {
  return t === 10 ? cB : t === Math.E ? Math.exp : e => Math.pow(t, e)
}

function pB(t) {
  return t === Math.E ? Math.log : t === 10 && Math.log10 || t === 2 && Math.log2 || (t = Math.log(t), e => Math.log(e) / t)
}

function Q0(t) {
  return (e, r) => -t(-e, r)
}

function To(t) {
  let e = t(Z0, J0),
    r = e.domain,
    n = 10,
    i, o;

  function a() {
    return i = pB(n), o = fB(n), r()[0] < 0 ? (i = Q0(i), o = Q0(o), t(sB, lB)) : t(Z0, J0), e
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
    if (u == null && (u = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = or(s)).precision == null && (s.trim = !0), s = ti(s)), u === 1 / 0) return s;
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

function Zu() {
  let t = To(rn()).domain([1, 10]);
  return t.copy = () => nr(t, Zu()).base(t.base()), kt.apply(t, arguments), t
}

function tw(t) {
  return function(e) {
    return Math.sign(e) * Math.log1p(Math.abs(e / t))
  }
}

function ew(t) {
  return function(e) {
    return Math.sign(e) * Math.expm1(Math.abs(e)) * t
  }
}

function Eo(t) {
  var e = 1,
    r = t(tw(e), ew(e));
  return r.constant = function(n) {
    return arguments.length ? t(tw(e = +n), ew(e)) : e
  }, ce(r)
}

function Ju() {
  var t = Eo(rn());
  return t.copy = function() {
    return nr(t, Ju()).constant(t.constant())
  }, kt.apply(t, arguments)
}

function rw(t) {
  return function(e) {
    return e < 0 ? -Math.pow(-e, t) : Math.pow(e, t)
  }
}

function dB(t) {
  return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t)
}

function mB(t) {
  return t < 0 ? -t * t : t * t
}

function jo(t) {
  var e = t($t, $t),
    r = 1;

  function n() {
    return r === 1 ? t($t, $t) : r === .5 ? t(dB, mB) : t(rw(r), rw(1 / r))
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

function nw() {
  return Mo.apply(null, arguments).exponent(.5)
}

function iw(t) {
  return Math.sign(t) * t * t
}

function hB(t) {
  return Math.sign(t) * Math.sqrt(Math.abs(t))
}

function Qu() {
  var t = nn(),
    e = [0, 1],
    r = !1,
    n;

  function i(o) {
    var a = hB(t(o));
    return isNaN(a) ? n : r ? Math.round(a) : a
  }
  return i.invert = function(o) {
    return t.invert(iw(o))
  }, i.domain = function(o) {
    return arguments.length ? (t.domain(o), i) : t.domain()
  }, i.range = function(o) {
    return arguments.length ? (t.range((e = Array.from(o, jr)).map(iw)), i) : e.slice()
  }, i.rangeRound = function(o) {
    return i.range(o).round(!0)
  }, i.round = function(o) {
    return arguments.length ? (r = !!o, i) : r
  }, i.clamp = function(o) {
    return arguments.length ? (t.clamp(o), i) : t.clamp()
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n
  }, i.copy = function() {
    return Qu(t.domain(), e).round(r).clamp(t.clamp()).unknown(n)
  }, kt.apply(i, arguments), ce(i)
}

function ts() {
  var t = [],
    e = [],
    r = [],
    n;

  function i() {
    var a = 0,
      u = Math.max(1, e.length);
    for (r = new Array(u - 1); ++a < u;) r[a - 1] = Af(t, a / u);
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
    return ts().domain(t).range(e).unknown(n)
  }, kt.apply(o, arguments)
}

function es() {
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
    return es().domain([t, e]).range(i).unknown(o)
  }, kt.apply(ce(a), arguments)
}

function rs() {
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
    return rs().domain(t).range(e).unknown(r)
  }, kt.apply(i, arguments)
}
var Wf = new Date,
  zf = new Date;

function Tt(t, e, r, n) {
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
  }, i.filter = o => Tt(a => {
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
  }), r && (i.count = (o, a) => (Wf.setTime(+o), zf.setTime(+a), t(Wf), t(zf), Math.floor(r(Wf, zf))), i.every = o => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(n ? a => n(a) % o === 0 : a => i.count(0, a) % o === 0) : i)), i
}
var Co = Tt(() => {}, (t, e) => {
  t.setTime(+t + e)
}, (t, e) => e - t);
Co.every = t => (t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? Tt(e => {
  e.setTime(Math.floor(e / t) * t)
}, (e, r) => {
  e.setTime(+e + r * t)
}, (e, r) => (r - e) / t) : Co);
var NZ = Co.range;
var Ne = Tt(t => {
    t.setTime(t - t.getMilliseconds())
  }, (t, e) => {
    t.setTime(+t + e * 1e3)
  }, (t, e) => (e - t) / 1e3, t => t.getUTCSeconds()),
  ow = Ne.range;
var ei = Tt(t => {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * 1e3)
  }, (t, e) => {
    t.setTime(+t + e * 6e4)
  }, (t, e) => (e - t) / 6e4, t => t.getMinutes()),
  yB = ei.range,
  ri = Tt(t => {
    t.setUTCSeconds(0, 0)
  }, (t, e) => {
    t.setTime(+t + e * 6e4)
  }, (t, e) => (e - t) / 6e4, t => t.getUTCMinutes()),
  vB = ri.range;
var ni = Tt(t => {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * 1e3 - t.getMinutes() * 6e4)
  }, (t, e) => {
    t.setTime(+t + e * 36e5)
  }, (t, e) => (e - t) / 36e5, t => t.getHours()),
  gB = ni.range,
  ii = Tt(t => {
    t.setUTCMinutes(0, 0, 0)
  }, (t, e) => {
    t.setTime(+t + e * 36e5)
  }, (t, e) => (e - t) / 36e5, t => t.getUTCHours()),
  bB = ii.range;
var vr = Tt(t => t.setHours(0, 0, 0, 0), (t, e) => t.setDate(t.getDate() + e), (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 864e5, t => t.getDate() - 1),
  xB = vr.range,
  ln = Tt(t => {
    t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCDate(t.getUTCDate() + e)
  }, (t, e) => (e - t) / 864e5, t => t.getUTCDate() - 1),
  wB = ln.range,
  ns = Tt(t => {
    t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCDate(t.getUTCDate() + e)
  }, (t, e) => (e - t) / 864e5, t => Math.floor(t / 864e5)),
  OB = ns.range;

function cn(t) {
  return Tt(e => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0)
  }, (e, r) => {
    e.setDate(e.getDate() + r * 7)
  }, (e, r) => (r - e - (r.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 6048e5)
}
var gr = cn(0),
  oi = cn(1),
  uw = cn(2),
  sw = cn(3),
  Mr = cn(4),
  lw = cn(5),
  cw = cn(6),
  fw = gr.range,
  SB = oi.range,
  AB = uw.range,
  _B = sw.range,
  PB = Mr.range,
  TB = lw.range,
  EB = cw.range;

function fn(t) {
  return Tt(e => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0)
  }, (e, r) => {
    e.setUTCDate(e.getUTCDate() + r * 7)
  }, (e, r) => (r - e) / 6048e5)
}
var br = fn(0),
  ai = fn(1),
  pw = fn(2),
  dw = fn(3),
  Cr = fn(4),
  mw = fn(5),
  hw = fn(6),
  yw = br.range,
  jB = ai.range,
  MB = pw.range,
  CB = dw.range,
  IB = Cr.range,
  kB = mw.range,
  DB = hw.range;
var ui = Tt(t => {
    t.setDate(1), t.setHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setMonth(t.getMonth() + e)
  }, (t, e) => e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12, t => t.getMonth()),
  NB = ui.range,
  si = Tt(t => {
    t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCMonth(t.getUTCMonth() + e)
  }, (t, e) => e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12, t => t.getUTCMonth()),
  RB = si.range;
var be = Tt(t => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e)
}, (t, e) => e.getFullYear() - t.getFullYear(), t => t.getFullYear());
be.every = t => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : Tt(e => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
}, (e, r) => {
  e.setFullYear(e.getFullYear() + r * t)
});
var LB = be.range,
  xe = Tt(t => {
    t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
  }, (t, e) => {
    t.setUTCFullYear(t.getUTCFullYear() + e)
  }, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), t => t.getUTCFullYear());
xe.every = t => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : Tt(e => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
}, (e, r) => {
  e.setUTCFullYear(e.getUTCFullYear() + r * t)
});
var BB = xe.range;

function gw(t, e, r, n, i, o) {
  let a = [
    [Ne, 1, 1e3],
    [Ne, 5, 5 * 1e3],
    [Ne, 15, 15 * 1e3],
    [Ne, 30, 30 * 1e3],
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
    if (d === a.length) return t.every(Yn(l / 31536e6, f / 31536e6, c));
    if (d === 0) return Co.every(Math.max(Yn(l, f, c), 1));
    let [y, m] = a[p / a[d - 1][2] < a[d][2] / p ? d - 1 : d];
    return y.every(m)
  }
  return [u, s]
}
var [Ff, $f] = gw(xe, si, br, ns, ii, ri), [Uf, Hf] = gw(be, ui, gr, vr, ni, ei);

function Gf(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
}

function Kf(t) {
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

function Vf(t) {
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
      B: j,
      c: null,
      d: Aw,
      e: Aw,
      f: sq,
      g: gq,
      G: xq,
      H: oq,
      I: aq,
      j: uq,
      L: jw,
      m: lq,
      M: cq,
      p: E,
      q: D,
      Q: Tw,
      s: Ew,
      S: fq,
      u: pq,
      U: dq,
      V: mq,
      w: hq,
      W: yq,
      x: null,
      X: null,
      y: vq,
      Y: bq,
      Z: wq,
      "%": Pw
    },
    P = {
      a: L,
      A: G,
      b: Z,
      B: J,
      c: null,
      d: _w,
      e: _w,
      f: _q,
      g: Nq,
      G: Lq,
      H: Oq,
      I: Sq,
      j: Aq,
      L: Cw,
      m: Pq,
      M: Tq,
      p: it,
      q: gt,
      Q: Tw,
      s: Ew,
      S: Eq,
      u: jq,
      U: Mq,
      V: Cq,
      w: Iq,
      W: kq,
      x: null,
      X: null,
      y: Dq,
      Y: Rq,
      Z: Bq,
      "%": Pw
    },
    h = {
      a: B,
      A: W,
      b: N,
      B: H,
      c: F,
      d: Ow,
      e: Ow,
      f: eq,
      g: ww,
      G: xw,
      H: Sw,
      I: Sw,
      j: ZB,
      L: tq,
      m: YB,
      M: JB,
      p: k,
      q: XB,
      Q: nq,
      s: iq,
      S: QB,
      u: UB,
      U: HB,
      V: GB,
      w: $B,
      W: KB,
      x: z,
      X: b,
      y: ww,
      Y: xw,
      Z: VB,
      "%": rq
    };
  S.x = g(r, S), S.X = g(n, S), S.c = g(e, S), P.x = g(r, P), P.X = g(n, P), P.c = g(e, P);

  function g(K, ct) {
    return function(tt) {
      var $ = [],
        St = -1,
        Q = 0,
        bt = K.length,
        Et, Lt, pe;
      for (tt instanceof Date || (tt = new Date(+tt)); ++St < bt;) K.charCodeAt(St) === 37 && ($.push(K.slice(Q, St)), (Lt = bw[Et = K.charAt(++St)]) != null ? Et = K.charAt(++St) : Lt = Et === "e" ? " " : "0", (pe = ct[Et]) && (Et = pe(tt, Lt)), $.push(Et), Q = St + 1);
      return $.push(K.slice(Q, St)), $.join("")
    }
  }

  function _(K, ct) {
    return function(tt) {
      var $ = ko(1900, void 0, 1),
        St = C($, K, tt += "", 0),
        Q, bt;
      if (St != tt.length) return null;
      if ("Q" in $) return new Date($.Q);
      if ("s" in $) return new Date($.s * 1e3 + ("L" in $ ? $.L : 0));
      if (ct && !("Z" in $) && ($.Z = 0), "p" in $ && ($.H = $.H % 12 + $.p * 12), $.m === void 0 && ($.m = "q" in $ ? $.q : 0), "V" in $) {
        if ($.V < 1 || $.V > 53) return null;
        "w" in $ || ($.w = 1), "Z" in $ ? (Q = Kf(ko($.y, 0, 1)), bt = Q.getUTCDay(), Q = bt > 4 || bt === 0 ? ai.ceil(Q) : ai(Q), Q = ln.offset(Q, ($.V - 1) * 7), $.y = Q.getUTCFullYear(), $.m = Q.getUTCMonth(), $.d = Q.getUTCDate() + ($.w + 6) % 7) : (Q = Gf(ko($.y, 0, 1)), bt = Q.getDay(), Q = bt > 4 || bt === 0 ? oi.ceil(Q) : oi(Q), Q = vr.offset(Q, ($.V - 1) * 7), $.y = Q.getFullYear(), $.m = Q.getMonth(), $.d = Q.getDate() + ($.w + 6) % 7)
      } else("W" in $ || "U" in $) && ("w" in $ || ($.w = "u" in $ ? $.u % 7 : "W" in $ ? 1 : 0), bt = "Z" in $ ? Kf(ko($.y, 0, 1)).getUTCDay() : Gf(ko($.y, 0, 1)).getDay(), $.m = 0, $.d = "W" in $ ? ($.w + 6) % 7 + $.W * 7 - (bt + 5) % 7 : $.w + $.U * 7 - (bt + 6) % 7);
      return "Z" in $ ? ($.H += $.Z / 100 | 0, $.M += $.Z % 100, Kf($)) : Gf($)
    }
  }

  function C(K, ct, tt, $) {
    for (var St = 0, Q = ct.length, bt = tt.length, Et, Lt; St < Q;) {
      if ($ >= bt) return -1;
      if (Et = ct.charCodeAt(St++), Et === 37) {
        if (Et = ct.charAt(St++), Lt = h[Et in bw ? ct.charAt(St++) : Et], !Lt || ($ = Lt(K, tt, $)) < 0) return -1
      } else if (Et != tt.charCodeAt($++)) return -1
    }
    return $
  }

  function k(K, ct, tt) {
    var $ = l.exec(ct.slice(tt));
    return $ ? (K.p = f.get($[0].toLowerCase()), tt + $[0].length) : -1
  }

  function B(K, ct, tt) {
    var $ = d.exec(ct.slice(tt));
    return $ ? (K.w = y.get($[0].toLowerCase()), tt + $[0].length) : -1
  }

  function W(K, ct, tt) {
    var $ = c.exec(ct.slice(tt));
    return $ ? (K.w = p.get($[0].toLowerCase()), tt + $[0].length) : -1
  }

  function N(K, ct, tt) {
    var $ = x.exec(ct.slice(tt));
    return $ ? (K.m = w.get($[0].toLowerCase()), tt + $[0].length) : -1
  }

  function H(K, ct, tt) {
    var $ = m.exec(ct.slice(tt));
    return $ ? (K.m = v.get($[0].toLowerCase()), tt + $[0].length) : -1
  }

  function F(K, ct, tt) {
    return C(K, e, ct, tt)
  }

  function z(K, ct, tt) {
    return C(K, r, ct, tt)
  }

  function b(K, ct, tt) {
    return C(K, n, ct, tt)
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

  function it(K) {
    return i[+(K.getUTCHours() >= 12)]
  }

  function gt(K) {
    return 1 + ~~(K.getUTCMonth() / 3)
  }
  return {
    format: function(K) {
      var ct = g(K += "", S);
      return ct.toString = function() {
        return K
      }, ct
    },
    parse: function(K) {
      var ct = _(K += "", !1);
      return ct.toString = function() {
        return K
      }, ct
    },
    utcFormat: function(K) {
      var ct = g(K += "", P);
      return ct.toString = function() {
        return K
      }, ct
    },
    utcParse: function(K) {
      var ct = _(K += "", !0);
      return ct.toString = function() {
        return K
      }, ct
    }
  }
}
var bw = {
    "-": "",
    _: " ",
    0: "0"
  },
  Vt = /^\s*\d+/,
  WB = /^%/,
  zB = /[\\^$*+?|[\]().{}]/g;

function wt(t, e, r) {
  var n = t < 0 ? "-" : "",
    i = (n ? -t : t) + "",
    o = i.length;
  return n + (o < r ? new Array(r - o + 1).join(e) + i : i)
}

function FB(t) {
  return t.replace(zB, "\\$&")
}

function Do(t) {
  return new RegExp("^(?:" + t.map(FB).join("|") + ")", "i")
}

function No(t) {
  return new Map(t.map((e, r) => [e.toLowerCase(), r]))
}

function $B(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 1));
  return n ? (t.w = +n[0], r + n[0].length) : -1
}

function UB(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 1));
  return n ? (t.u = +n[0], r + n[0].length) : -1
}

function HB(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 2));
  return n ? (t.U = +n[0], r + n[0].length) : -1
}

function GB(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 2));
  return n ? (t.V = +n[0], r + n[0].length) : -1
}

function KB(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 2));
  return n ? (t.W = +n[0], r + n[0].length) : -1
}

function xw(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 4));
  return n ? (t.y = +n[0], r + n[0].length) : -1
}

function ww(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 2));
  return n ? (t.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1
}

function VB(t, e, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
  return n ? (t.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1
}

function XB(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 1));
  return n ? (t.q = n[0] * 3 - 3, r + n[0].length) : -1
}

function YB(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 2));
  return n ? (t.m = n[0] - 1, r + n[0].length) : -1
}

function Ow(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 2));
  return n ? (t.d = +n[0], r + n[0].length) : -1
}

function ZB(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 3));
  return n ? (t.m = 0, t.d = +n[0], r + n[0].length) : -1
}

function Sw(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 2));
  return n ? (t.H = +n[0], r + n[0].length) : -1
}

function JB(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 2));
  return n ? (t.M = +n[0], r + n[0].length) : -1
}

function QB(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 2));
  return n ? (t.S = +n[0], r + n[0].length) : -1
}

function tq(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 3));
  return n ? (t.L = +n[0], r + n[0].length) : -1
}

function eq(t, e, r) {
  var n = Vt.exec(e.slice(r, r + 6));
  return n ? (t.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1
}

function rq(t, e, r) {
  var n = WB.exec(e.slice(r, r + 1));
  return n ? r + n[0].length : -1
}

function nq(t, e, r) {
  var n = Vt.exec(e.slice(r));
  return n ? (t.Q = +n[0], r + n[0].length) : -1
}

function iq(t, e, r) {
  var n = Vt.exec(e.slice(r));
  return n ? (t.s = +n[0], r + n[0].length) : -1
}

function Aw(t, e) {
  return wt(t.getDate(), e, 2)
}

function oq(t, e) {
  return wt(t.getHours(), e, 2)
}

function aq(t, e) {
  return wt(t.getHours() % 12 || 12, e, 2)
}

function uq(t, e) {
  return wt(1 + vr.count(be(t), t), e, 3)
}

function jw(t, e) {
  return wt(t.getMilliseconds(), e, 3)
}

function sq(t, e) {
  return jw(t, e) + "000"
}

function lq(t, e) {
  return wt(t.getMonth() + 1, e, 2)
}

function cq(t, e) {
  return wt(t.getMinutes(), e, 2)
}

function fq(t, e) {
  return wt(t.getSeconds(), e, 2)
}

function pq(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e
}

function dq(t, e) {
  return wt(gr.count(be(t) - 1, t), e, 2)
}

function Mw(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Mr(t) : Mr.ceil(t)
}

function mq(t, e) {
  return t = Mw(t), wt(Mr.count(be(t), t) + (be(t).getDay() === 4), e, 2)
}

function hq(t) {
  return t.getDay()
}

function yq(t, e) {
  return wt(oi.count(be(t) - 1, t), e, 2)
}

function vq(t, e) {
  return wt(t.getFullYear() % 100, e, 2)
}

function gq(t, e) {
  return t = Mw(t), wt(t.getFullYear() % 100, e, 2)
}

function bq(t, e) {
  return wt(t.getFullYear() % 1e4, e, 4)
}

function xq(t, e) {
  var r = t.getDay();
  return t = r >= 4 || r === 0 ? Mr(t) : Mr.ceil(t), wt(t.getFullYear() % 1e4, e, 4)
}

function wq(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + wt(e / 60 | 0, "0", 2) + wt(e % 60, "0", 2)
}

function _w(t, e) {
  return wt(t.getUTCDate(), e, 2)
}

function Oq(t, e) {
  return wt(t.getUTCHours(), e, 2)
}

function Sq(t, e) {
  return wt(t.getUTCHours() % 12 || 12, e, 2)
}

function Aq(t, e) {
  return wt(1 + ln.count(xe(t), t), e, 3)
}

function Cw(t, e) {
  return wt(t.getUTCMilliseconds(), e, 3)
}

function _q(t, e) {
  return Cw(t, e) + "000"
}

function Pq(t, e) {
  return wt(t.getUTCMonth() + 1, e, 2)
}

function Tq(t, e) {
  return wt(t.getUTCMinutes(), e, 2)
}

function Eq(t, e) {
  return wt(t.getUTCSeconds(), e, 2)
}

function jq(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e
}

function Mq(t, e) {
  return wt(br.count(xe(t) - 1, t), e, 2)
}

function Iw(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Cr(t) : Cr.ceil(t)
}

function Cq(t, e) {
  return t = Iw(t), wt(Cr.count(xe(t), t) + (xe(t).getUTCDay() === 4), e, 2)
}

function Iq(t) {
  return t.getUTCDay()
}

function kq(t, e) {
  return wt(ai.count(xe(t) - 1, t), e, 2)
}

function Dq(t, e) {
  return wt(t.getUTCFullYear() % 100, e, 2)
}

function Nq(t, e) {
  return t = Iw(t), wt(t.getUTCFullYear() % 100, e, 2)
}

function Rq(t, e) {
  return wt(t.getUTCFullYear() % 1e4, e, 4)
}

function Lq(t, e) {
  var r = t.getUTCDay();
  return t = r >= 4 || r === 0 ? Cr(t) : Cr.ceil(t), wt(t.getUTCFullYear() % 1e4, e, 4)
}

function Bq() {
  return "+0000"
}

function Pw() {
  return "%"
}

function Tw(t) {
  return +t
}

function Ew(t) {
  return Math.floor(+t / 1e3)
}
var li, is, kw, os, Dw;
Xf({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function Xf(t) {
  return li = Vf(t), is = li.format, kw = li.parse, os = li.utcFormat, Dw = li.utcParse, li
}

function qq(t) {
  return new Date(t)
}

function Wq(t) {
  return t instanceof Date ? +t : +new Date(+t)
}

function as(t, e, r, n, i, o, a, u, s, l) {
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
    return arguments.length ? p(Array.from(g, Wq)) : p().map(qq)
  }, f.ticks = function(g) {
    var _ = p();
    return t(_[0], _[_.length - 1], g ?? 10)
  }, f.tickFormat = function(g, _) {
    return _ == null ? h : l(_)
  }, f.nice = function(g) {
    var _ = p();
    return (!g || typeof g.range != "function") && (g = e(_[0], _[_.length - 1], g ?? 10)), g ? p(Po(_, g)) : f
  }, f.copy = function() {
    return nr(f, as(t, e, r, n, i, o, a, u, s, l))
  }, f
}

function Yf() {
  return kt.apply(as(Uf, Hf, be, ui, gr, vr, ni, ei, Ne, is).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments)
}

function Zf() {
  return kt.apply(as(Ff, $f, xe, si, br, ln, ii, ri, Ne, os).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments)
}

function us() {
  var t = 0,
    e = 1,
    r, n, i, o, a = $t,
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

function ss() {
  var t = ce(us()($t));
  return t.copy = function() {
    return xr(t, ss())
  }, De.apply(t, arguments)
}

function Jf() {
  var t = To(us()).domain([1, 10]);
  return t.copy = function() {
    return xr(t, Jf()).base(t.base())
  }, De.apply(t, arguments)
}

function Qf() {
  var t = Eo(us());
  return t.copy = function() {
    return xr(t, Qf()).constant(t.constant())
  }, De.apply(t, arguments)
}

function ls() {
  var t = jo(us());
  return t.copy = function() {
    return xr(t, ls()).exponent(t.exponent())
  }, De.apply(t, arguments)
}

function Nw() {
  return ls.apply(null, arguments).exponent(.5)
}

function cs() {
  var t = [],
    e = $t;

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
    }, (i, o) => Lu(t, o / n))
  }, r.copy = function() {
    return cs(e).domain(t)
  }, De.apply(r, arguments)
}

function fs() {
  var t = 0,
    e = .5,
    r = 1,
    n = 1,
    i, o, a, u, s, l = $t,
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
      return arguments.length ? ([x, w, S] = v, l = Gu(m, [x, w, S]), d) : [l(0), l(.5), l(1)]
    }
  }
  return d.range = y(ge), d.rangeRound = y(en), d.unknown = function(m) {
      return arguments.length ? (p = m, d) : p
    },
    function(m) {
      return f = m, i = m(t), o = m(e), a = m(r), u = i === o ? 0 : .5 / (o - i), s = o === a ? 0 : .5 / (a - o), n = o < i ? -1 : 1, d
    }
}

function ps() {
  var t = ce(fs()($t));
  return t.copy = function() {
    return xr(t, ps())
  }, De.apply(t, arguments)
}

function tp() {
  var t = To(fs()).domain([.1, 1, 10]);
  return t.copy = function() {
    return xr(t, tp()).base(t.base())
  }, De.apply(t, arguments)
}

function ep() {
  var t = Eo(fs());
  return t.copy = function() {
    return xr(t, ep()).constant(t.constant())
  }, De.apply(t, arguments)
}

function ds() {
  var t = jo(fs());
  return t.copy = function() {
    return xr(t, ds()).exponent(t.exponent())
  }, De.apply(t, arguments)
}

function Rw() {
  return ds.apply(null, arguments).exponent(.5)
}
var Uo = et(zw()),
  Ho = et(Hw()),
  we = et(Pe()),
  pi = et(Bt()),
  h1 = et(Ua()),
  gp = et(zr()),
  y1 = et(Xw()),
  ws = et(Nl()),
  v1 = et(iu()),
  g1 = et(Ro()),
  b1 = et(Au());
var _t = et(np());

function lW(t) {
  return dW(t) || pW(t) || fW(t) || cW()
}

function cW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function fW(t, e) {
  if (t) {
    if (typeof t == "string") return ip(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ip(t, e)
  }
}

function pW(t) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(t)) return Array.from(t)
}

function dW(t) {
  if (Array.isArray(t)) return ip(t)
}

function ip(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var mW = function(e) {
    return e
  },
  Qw = {
    "@@functional/placeholder": !0
  },
  t1 = function(e) {
    return e === Qw
  },
  Jw = function(e) {
    return function r() {
      return arguments.length === 0 || arguments.length === 1 && t1(arguments.length <= 0 ? void 0 : arguments[0]) ? r : e.apply(void 0, arguments)
    }
  },
  hW = function t(e, r) {
    return e === 1 ? r : Jw(function() {
      for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
      var a = i.filter(function(u) {
        return u !== Qw
      }).length;
      return a >= e ? r.apply(void 0, i) : t(e - a, Jw(function() {
        for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++) s[l] = arguments[l];
        var f = i.map(function(c) {
          return t1(c) ? s.shift() : c
        });
        return r.apply(void 0, lW(f).concat(s))
      }))
    })
  },
  Lo = function(e) {
    return hW(e.length, e)
  },
  Bo = function(e, r) {
    for (var n = [], i = e; i < r; ++i) n[i - e] = i;
    return n
  },
  op = Lo(function(t, e) {
    return Array.isArray(e) ? e.map(t) : Object.keys(e).map(function(r) {
      return e[r]
    }).map(t)
  }),
  ap = function() {
    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
    if (!r.length) return mW;
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
  ys = function(e) {
    var r = null,
      n = null;
    return function() {
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
      return r && o.every(function(u, s) {
        return u === r[s]
      }) || (r = o, n = e.apply(void 0, o)), n
    }
  };
var up = et(np());

function yW(t) {
  var e;
  return t === 0 ? e = 1 : e = Math.floor(new up.default(t).abs().log(10).toNumber()) + 1, e
}

function vW(t, e, r) {
  for (var n = new up.default(t), i = 0, o = []; n.lt(e) && i < 1e5;) o.push(n.toNumber()), n = n.add(r), i++;
  return o
}
var gW = Lo(function(t, e, r) {
    var n = +t,
      i = +e;
    return n + r * (i - n)
  }),
  bW = Lo(function(t, e, r) {
    var n = e - +t;
    return n = n || 1 / 0, (r - t) / n
  }),
  xW = Lo(function(t, e, r) {
    var n = e - +t;
    return n = n || 1 / 0, Math.max(0, Math.min(1, (r - t) / n))
  }),
  Wo = {
    rangeStep: vW,
    getDigitCount: yW,
    interpolateNumber: gW,
    uninterpolateNumber: bW,
    uninterpolateTruncation: xW
  };

function sp(t) {
  return SW(t) || OW(t) || e1(t) || wW()
}

function wW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function OW(t) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(t)) return Array.from(t)
}

function SW(t) {
  if (Array.isArray(t)) return lp(t)
}

function pn(t, e) {
  return PW(t) || _W(t, e) || e1(t, e) || AW()
}

function AW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function e1(t, e) {
  if (t) {
    if (typeof t == "string") return lp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return lp(t, e)
  }
}

function lp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function _W(t, e) {
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

function PW(t) {
  if (Array.isArray(t)) return t
}

function cp(t) {
  var e = pn(t, 2),
    r = e[0],
    n = e[1],
    i = r,
    o = n;
  return r > n && (i = n, o = r), [i, o]
}

function fp(t, e, r) {
  if (t.lte(0)) return new _t.default(0);
  var n = Wo.getDigitCount(t.toNumber()),
    i = new _t.default(10).pow(n),
    o = t.div(i),
    a = n !== 1 ? .05 : .1,
    u = new _t.default(Math.ceil(o.div(a).toNumber())).add(r).mul(a),
    s = u.mul(i);
  return e ? s : new _t.default(Math.ceil(s))
}

function r1(t, e, r) {
  var n = 1,
    i = new _t.default(t);
  if (!i.isint() && r) {
    var o = Math.abs(t);
    o < 1 ? (n = new _t.default(10).pow(Wo.getDigitCount(t) - 1), i = new _t.default(Math.floor(i.div(n).toNumber())).mul(n)) : o > 1 && (i = new _t.default(Math.floor(t)))
  } else t === 0 ? i = new _t.default(Math.floor((e - 1) / 2)) : r || (i = new _t.default(Math.floor(t)));
  var a = Math.floor((e - 1) / 2),
    u = ap(op(function(s) {
      return i.add(new _t.default(s - a).mul(n)).toNumber()
    }), Bo);
  return u(0, e)
}

function n1(t, e, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((e - t) / (r - 1))) return {
    step: new _t.default(0),
    tickMin: new _t.default(0),
    tickMax: new _t.default(0)
  };
  var o = fp(new _t.default(e).sub(t).div(r - 1), n, i),
    a;
  t <= 0 && e >= 0 ? a = new _t.default(0) : (a = new _t.default(t).add(e).div(2), a = a.sub(new _t.default(a).mod(o)));
  var u = Math.ceil(a.sub(t).div(o).toNumber()),
    s = Math.ceil(new _t.default(e).sub(a).div(o).toNumber()),
    l = u + s + 1;
  return l > r ? n1(t, e, r, n, i + 1) : (l < r && (s = e > 0 ? s + (r - l) : s, u = e > 0 ? u : u + (r - l)), {
    step: o,
    tickMin: a.sub(new _t.default(u).mul(o)),
    tickMax: a.add(new _t.default(s).mul(o))
  })
}

function TW(t) {
  var e = pn(t, 2),
    r = e[0],
    n = e[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = cp([r, n]),
    s = pn(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) {
    var c = f === 1 / 0 ? [l].concat(sp(Bo(0, i - 1).map(function() {
      return 1 / 0
    }))) : [].concat(sp(Bo(0, i - 1).map(function() {
      return -1 / 0
    })), [f]);
    return r > n ? qo(c) : c
  }
  if (l === f) return r1(l, i, o);
  var p = n1(l, f, a, o),
    d = p.step,
    y = p.tickMin,
    m = p.tickMax,
    v = Wo.rangeStep(y, m.add(new _t.default(.1).mul(d)), d);
  return r > n ? qo(v) : v
}

function EW(t) {
  var e = pn(t, 2),
    r = e[0],
    n = e[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = Math.max(i, 2),
    u = cp([r, n]),
    s = pn(u, 2),
    l = s[0],
    f = s[1];
  if (l === -1 / 0 || f === 1 / 0) return [r, n];
  if (l === f) return r1(l, i, o);
  var c = fp(new _t.default(f).sub(l).div(a - 1), o, 0),
    p = ap(op(function(y) {
      return new _t.default(l).add(new _t.default(y).mul(c)).toNumber()
    }), Bo),
    d = p(0, a).filter(function(y) {
      return y >= l && y <= f
    });
  return r > n ? qo(d) : d
}

function jW(t, e) {
  var r = pn(t, 2),
    n = r[0],
    i = r[1],
    o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    a = cp([n, i]),
    u = pn(a, 2),
    s = u[0],
    l = u[1];
  if (s === -1 / 0 || l === 1 / 0) return [n, i];
  if (s === l) return [s];
  var f = Math.max(e, 2),
    c = fp(new _t.default(l).sub(s).div(f - 1), o, 0),
    p = [].concat(sp(Wo.rangeStep(new _t.default(s), new _t.default(l).sub(new _t.default(.99).mul(c)), c)), [l]);
  return n > i ? qo(p) : p
}
var pp = ys(TW),
  MW = ys(EW),
  dp = ys(jW);
import vs from "./react-shim-eraudit.js";
var CW = !0,
  mp = "Invariant failed";

function Ue(t, e) {
  if (!t) {
    if (CW) throw new Error(mp);
    var r = typeof e == "function" ? e() : e,
      n = r ? "".concat(mp, ": ").concat(r) : mp;
    throw new Error(n)
  }
}
var IW = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];

function ci(t) {
  "@babel/helpers - typeof";
  return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ci(t)
}

function gs() {
  return gs = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, gs.apply(this, arguments)
}

function kW(t, e) {
  return LW(t) || RW(t, e) || NW(t, e) || DW()
}

function DW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function NW(t, e) {
  if (t) {
    if (typeof t == "string") return i1(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return i1(t, e)
  }
}

function i1(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function RW(t, e) {
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

function LW(t) {
  if (Array.isArray(t)) return t
}

function BW(t, e) {
  if (t == null) return {};
  var r = qW(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function qW(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function WW(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function o1(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, s1(n.key), n)
  }
}

function zW(t, e, r) {
  return e && o1(t.prototype, e), r && o1(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function FW(t, e, r) {
  return e = bs(e), $W(t, a1() ? Reflect.construct(e, r || [], bs(t).constructor) : e.apply(t, r))
}

function $W(t, e) {
  if (e && (ci(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return UW(t)
}

function UW(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function a1() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (a1 = function() {
    return !!t
  })()
}

function bs(t) {
  return bs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, bs(t)
}

function HW(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && hp(t, e)
}

function hp(t, e) {
  return hp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, hp(t, e)
}

function u1(t, e, r) {
  return e = s1(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function s1(t) {
  var e = GW(t, "string");
  return ci(e) == "symbol" ? e : e + ""
}

function GW(t, e) {
  if (ci(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Ir = function(t) {
  function e() {
    return WW(this, e), FW(this, e, arguments)
  }
  return HW(e, t), zW(e, [{
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
        p = BW(n, IW),
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
          var C = kW(P, 2);
          g = C[0], _ = C[1]
        } else g = _ = P;
        if (o === "vertical") {
          var k = f.scale,
            B = w + i,
            W = B + a,
            N = B - a,
            H = k(S - g),
            F = k(S + _);
          h.push({
            x1: F,
            y1: W,
            x2: F,
            y2: N
          }), h.push({
            x1: H,
            y1: B,
            x2: F,
            y2: B
          }), h.push({
            x1: H,
            y1: W,
            x2: H,
            y2: N
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
        return vs.createElement(xt, gs({
          className: "recharts-errorBar",
          key: "bar-".concat(h.map(function(E) {
            return "".concat(E.x1, "-").concat(E.x2, "-").concat(E.y1, "-").concat(E.y2)
          }))
        }, d), h.map(function(E) {
          return vs.createElement("line", gs({}, E, {
            key: "line-".concat(E.x1, "-").concat(E.x2, "-").concat(E.y1, "-").concat(E.y2)
          }))
        }))
      });
      return vs.createElement(xt, {
        className: "recharts-errorBars"
      }, y)
    }
  }])
}(vs.Component);
u1(Ir, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
u1(Ir, "displayName", "ErrorBar");

function zo(t) {
  "@babel/helpers - typeof";
  return zo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, zo(t)
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

function dn(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? l1(Object(r), !0).forEach(function(n) {
      KW(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : l1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function KW(t, e, r) {
  return e = VW(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function VW(t) {
  var e = XW(t, "string");
  return zo(e) == "symbol" ? e : e + ""
}

function XW(t, e) {
  if (zo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (zo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var xs = function(e) {
  var r = e.children,
    n = e.formattedGraphicalItems,
    i = e.legendWidth,
    o = e.legendContent,
    a = Jt(r, ke);
  if (!a) return null;
  var u = ke.defaultProps,
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
  }), dn(dn(dn({}, s), ke.getWithHeight(a, i)), {}, {
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

function c1(t) {
  return QW(t) || JW(t) || ZW(t) || YW()
}

function YW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function ZW(t, e) {
  if (t) {
    if (typeof t == "string") return vp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return vp(t, e)
  }
}

function JW(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function QW(t) {
  if (Array.isArray(t)) return vp(t)
}

function vp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function f1(t, e) {
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
    e % 2 ? f1(Object(r), !0).forEach(function(n) {
      fi(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : f1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function fi(t, e, r) {
  return e = tz(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function tz(t) {
  var e = ez(t, "string");
  return $o(e) == "symbol" ? e : e + ""
}

function ez(t, e) {
  if ($o(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if ($o(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Xt(t, e, r) {
  return (0, we.default)(t) || (0, we.default)(e) ? r : Mt(e) ? (0, gp.default)(t, e, r) : (0, pi.default)(e) ? e(t) : r
}

function di(t, e, r, n) {
  var i = (0, y1.default)(t, function(u) {
    return Xt(u, e)
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
var x1 = function(e) {
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
        if (Zt(c - f) !== Zt(p - c)) {
          var y = [];
          if (Zt(p - c) === Zt(s[1] - s[0])) {
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
      o = (r = e.type) !== null && r !== void 0 && r.defaultProps ? Nt(Nt({}, e.type.defaultProps), e.props) : e.props,
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
  w1 = function(e) {
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
            return Ee(_.type).indexOf("Bar") >= 0
          });
        if (x && x.length) {
          var w = x[0].type.defaultProps,
            S = w !== void 0 ? Nt(Nt({}, w), x[0].props) : x[0].props,
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
  O1 = function(e) {
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
          _ = [].concat(c1(P), [g]);
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
        var _ = [].concat(c1(P), [{
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
  S1 = function(e, r, n, i) {
    var o = n.children,
      a = n.width,
      u = n.margin,
      s = a - (u.left || 0) - (u.right || 0),
      l = xs({
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
      if ((m === "vertical" || m === "horizontal" && y === "middle") && d !== "center" && X(e[d])) return Nt(Nt({}, e), {}, fi({}, d, e[d] + (c || 0)));
      if ((m === "horizontal" || m === "vertical" && d === "center") && y !== "middle" && X(e[y])) return Nt(Nt({}, e), {}, fi({}, y, e[y] + (p || 0)))
    }
    return e
  },
  rz = function(e, r, n) {
    return (0, we.default)(r) ? !0 : e === "horizontal" ? r === "yAxis" : e === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0
  },
  A1 = function(e, r, n, i, o) {
    var a = r.props.children,
      u = Ft(a, Ir).filter(function(l) {
        return rz(i, o, l.props.direction)
      });
    if (u && u.length) {
      var s = u.map(function(l) {
        return l.props.dataKey
      });
      return e.reduce(function(l, f) {
        var c = Xt(f, n);
        if ((0, we.default)(c)) return l;
        var p = Array.isArray(c) ? [(0, Ho.default)(c), (0, Uo.default)(c)] : [c, c],
          d = s.reduce(function(y, m) {
            var v = Xt(f, m, 0),
              x = p[0] - Math.abs(Array.isArray(v) ? v[0] : v),
              w = p[1] + Math.abs(Array.isArray(v) ? v[1] : v);
            return [Math.min(x, y[0]), Math.max(w, y[1])]
          }, [1 / 0, -1 / 0]);
        return [Math.min(d[0], l[0]), Math.max(d[1], l[1])]
      }, [1 / 0, -1 / 0])
    }
    return null
  },
  _1 = function(e, r, n, i, o) {
    var a = r.map(function(u) {
      return A1(e, u, n, o, i)
    }).filter(function(u) {
      return !(0, we.default)(u)
    });
    return a && a.length ? a.reduce(function(u, s) {
      return [Math.min(u[0], s[0]), Math.max(u[1], s[1])]
    }, [1 / 0, -1 / 0]) : null
  },
  bp = function(e, r, n, i, o) {
    var a = r.map(function(s) {
      var l = s.props.dataKey;
      return n === "number" && l && A1(e, s, l, i) || di(e, l, n, o)
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
  xp = function(e, r) {
    return e === "horizontal" && r === "xAxis" || e === "vertical" && r === "yAxis" || e === "centric" && r === "angleAxis" || e === "radial" && r === "radiusAxis"
  },
  wp = function(e, r, n, i) {
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
    if (l = e.axisType === "angleAxis" && u?.length >= 2 ? Zt(u[0] - u[1]) * 2 * l : l, r && (e.ticks || e.niceTicks)) {
      var f = (e.ticks || e.niceTicks).map(function(c) {
        var p = o ? o.indexOf(c) : c;
        return {
          coordinate: i(p) + l,
          value: c,
          offset: l
        }
      });
      return f.filter(function(c) {
        return !(0, ws.default)(c.coordinate)
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
  yp = new WeakMap,
  Go = function(e, r) {
    if (typeof r != "function") return e;
    yp.has(e) || yp.set(e, new WeakMap);
    var n = yp.get(e);
    if (n.has(r)) return n.get(r);
    var i = function() {
      e.apply(void 0, arguments), r.apply(void 0, arguments)
    };
    return n.set(r, i), i
  },
  P1 = function(e, r, n) {
    var i = e.scale,
      o = e.type,
      a = e.layout,
      u = e.axisType;
    if (i === "auto") return a === "radial" && u === "radiusAxis" ? {
      scale: _r(),
      realScaleType: "band"
    } : a === "radial" && u === "angleAxis" ? {
      scale: an(),
      realScaleType: "linear"
    } : o === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: Pr(),
      realScaleType: "point"
    } : o === "category" ? {
      scale: _r(),
      realScaleType: "band"
    } : {
      scale: an(),
      realScaleType: "linear"
    };
    if ((0, h1.default)(i)) {
      var s = "scale".concat((0, v1.default)(i));
      return {
        scale: (ms[s] || Pr)(),
        realScaleType: ms[s] ? s : "point"
      }
    }
    return (0, pi.default)(i) ? {
      scale: i
    } : {
      scale: Pr(),
      realScaleType: "point"
    }
  },
  p1 = 1e-4,
  T1 = function(e) {
    var r = e.domain();
    if (!(!r || r.length <= 2)) {
      var n = r.length,
        i = e.range(),
        o = Math.min(i[0], i[1]) - p1,
        a = Math.max(i[0], i[1]) + p1,
        u = e(r[0]),
        s = e(r[n - 1]);
      (u < o || u > a || s < o || s > a) && e.domain([r[0], r[n - 1]])
    }
  },
  E1 = function(e, r) {
    if (!e) return null;
    for (var n = 0, i = e.length; n < i; n++)
      if (e[n].item === r) return e[n].position;
    return null
  },
  j1 = function(e, r) {
    if (!r || r.length !== 2 || !X(r[0]) || !X(r[1])) return e;
    var n = Math.min(r[0], r[1]),
      i = Math.max(r[0], r[1]),
      o = [e[0], e[1]];
    return (!X(e[0]) || e[0] < n) && (o[0] = n), (!X(e[1]) || e[1] > i) && (o[1] = i), o[0] > i && (o[0] = i), o[1] < n && (o[1] = n), o
  },
  nz = function(e) {
    var r = e.length;
    if (!(r <= 0))
      for (var n = 0, i = e[0].length; n < i; ++n)
        for (var o = 0, a = 0, u = 0; u < r; ++u) {
          var s = (0, ws.default)(e[u][n][1]) ? e[u][n][0] : e[u][n][1];
          s >= 0 ? (e[u][n][0] = o, e[u][n][1] = o + s, o = e[u][n][1]) : (e[u][n][0] = a, e[u][n][1] = a + s, a = e[u][n][1])
        }
  },
  iz = function(e) {
    var r = e.length;
    if (!(r <= 0))
      for (var n = 0, i = e[0].length; n < i; ++n)
        for (var o = 0, a = 0; a < r; ++a) {
          var u = (0, ws.default)(e[a][n][1]) ? e[a][n][0] : e[a][n][1];
          u >= 0 ? (e[a][n][0] = o, e[a][n][1] = o + u, o = e[a][n][1]) : (e[a][n][0] = 0, e[a][n][1] = 0)
        }
  },
  oz = {
    sign: nz,
    expand: Sc,
    none: Ce,
    silhouette: Ac,
    wiggle: _c,
    positive: iz
  },
  az = function(e, r, n) {
    var i = r.map(function(u) {
        return u.props.dataKey
      }),
      o = oz[n],
      a = Oc().keys(i).value(function(u, s) {
        return +Xt(u, s, 0)
      }).order(Ln).offset(o);
    return a(e)
  },
  M1 = function(e, r, n, i, o, a) {
    if (!e) return null;
    var u = a ? r.reverse() : r,
      s = {},
      l = u.reduce(function(c, p) {
        var d, y = (d = p.type) !== null && d !== void 0 && d.defaultProps ? Nt(Nt({}, p.type.defaultProps), p.props) : p.props,
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
        return Nt(Nt({}, c), {}, fi({}, x, w))
      }, s),
      f = {};
    return Object.keys(l).reduce(function(c, p) {
      var d = l[p];
      if (d.hasStack) {
        var y = {};
        d.stackGroups = Object.keys(d.stackGroups).reduce(function(m, v) {
          var x = d.stackGroups[v];
          return Nt(Nt({}, m), {}, fi({}, v, {
            numericAxisId: n,
            cateAxisId: i,
            items: x.items,
            stackedData: az(e, x.items, o)
          }))
        }, y)
      }
      return Nt(Nt({}, c), {}, fi({}, p, d))
    }, f)
  },
  C1 = function(e, r) {
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
      var f = pp(l, o, u);
      return e.domain([(0, Ho.default)(f), (0, Uo.default)(f)]), {
        niceTicks: f
      }
    }
    if (o && i === "number") {
      var c = e.domain(),
        p = dp(c, o, u);
      return {
        niceTicks: p
      }
    }
    return null
  };

function Op(t) {
  var e = t.axis,
    r = t.ticks,
    n = t.bandSize,
    i = t.entry,
    o = t.index,
    a = t.dataKey;
  if (e.type === "category") {
    if (!e.allowDuplicatedCategory && e.dataKey && !(0, we.default)(i[e.dataKey])) {
      var u = En(r, "value", i[e.dataKey]);
      if (u) return u.coordinate + n / 2
    }
    return r[o] ? r[o].coordinate + n / 2 : null
  }
  var s = Xt(i, (0, we.default)(a) ? e.dataKey : a);
  return (0, we.default)(s) ? null : e.scale(s)
}
var Sp = function(e) {
    var r = e.axis,
      n = e.ticks,
      i = e.offset,
      o = e.bandSize,
      a = e.entry,
      u = e.index;
    if (r.type === "category") return n[u] ? n[u].coordinate + i : null;
    var s = Xt(a, r.dataKey, r.domain[u]);
    return (0, we.default)(s) ? null : r.scale(s) - o / 2 + i
  },
  I1 = function(e) {
    var r = e.numericAxis,
      n = r.scale.domain();
    if (r.type === "number") {
      var i = Math.min(n[0], n[1]),
        o = Math.max(n[0], n[1]);
      return i <= 0 && o >= 0 ? 0 : o < 0 ? o : i
    }
    return n[0]
  },
  k1 = function(e, r) {
    var n, i = (n = e.type) !== null && n !== void 0 && n.defaultProps ? Nt(Nt({}, e.type.defaultProps), e.props) : e.props,
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
  uz = function(e) {
    return e.reduce(function(r, n) {
      return [(0, Ho.default)(n.concat([r[0]]).filter(X)), (0, Uo.default)(n.concat([r[1]]).filter(X))]
    }, [1 / 0, -1 / 0])
  },
  Ap = function(e, r, n) {
    return Object.keys(e).reduce(function(i, o) {
      var a = e[o],
        u = a.stackedData,
        s = u.reduce(function(l, f) {
          var c = uz(f.slice(r, n + 1));
          return [Math.min(l[0], c[0]), Math.max(l[1], c[1])]
        }, [1 / 0, -1 / 0]);
      return [Math.min(s[0], i[0]), Math.max(s[1], i[1])]
    }, [1 / 0, -1 / 0]).map(function(i) {
      return i === 1 / 0 || i === -1 / 0 ? 0 : i
    })
  },
  d1 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  m1 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  Os = function(e, r, n) {
    if ((0, pi.default)(e)) return e(r, n);
    if (!Array.isArray(e)) return r;
    var i = [];
    if (X(e[0])) i[0] = n ? e[0] : Math.min(e[0], r[0]);
    else if (d1.test(e[0])) {
      var o = +d1.exec(e[0])[1];
      i[0] = r[0] - o
    } else(0, pi.default)(e[0]) ? i[0] = e[0](r[0]) : i[0] = r[0];
    if (X(e[1])) i[1] = n ? e[1] : Math.max(e[1], r[1]);
    else if (m1.test(e[1])) {
      var a = +m1.exec(e[1])[1];
      i[1] = r[1] + a
    } else(0, pi.default)(e[1]) ? i[1] = e[1](r[1]) : i[1] = r[1];
    return i
  },
  mi = function(e, r, n) {
    if (e && e.scale && e.scale.bandwidth) {
      var i = e.scale.bandwidth();
      if (!n || i > 0) return i
    }
    if (e && r && r.length >= 2) {
      for (var o = (0, b1.default)(r, function(c) {
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
  _p = function(e, r, n) {
    return !e || !e.length || (0, g1.default)(e, (0, gp.default)(n, "type.defaultProps.domain")) ? r : e
  },
  Ss = function(e, r) {
    var n = e.type.defaultProps ? Nt(Nt({}, e.type.defaultProps), e.props) : e.props,
      i = n.dataKey,
      o = n.name,
      a = n.unit,
      u = n.formatter,
      s = n.tooltipType,
      l = n.chartType,
      f = n.hide;
    return Nt(Nt({}, st(e, !1)), {}, {
      dataKey: i,
      unit: a,
      formatter: u,
      name: o || i,
      color: Fo(e),
      value: Xt(r, i),
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

function N1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? D1(Object(r), !0).forEach(function(n) {
      sz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : D1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function sz(t, e, r) {
  return e = lz(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function lz(t) {
  var e = cz(t, "string");
  return Ko(e) == "symbol" ? e : e + ""
}

function cz(t, e) {
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
var dz = function(e) {
    return e * 180 / Math.PI
  },
  Rt = function(e, r, n, i) {
    return {
      x: e + Math.cos(-Vo * i) * n,
      y: r + Math.sin(-Vo * i) * n
    }
  };
var mz = function(e, r) {
    var n = e.x,
      i = e.y,
      o = r.x,
      a = r.y;
    return Math.sqrt(Math.pow(n - o, 2) + Math.pow(i - a, 2))
  },
  hz = function(e, r) {
    var n = e.x,
      i = e.y,
      o = r.cx,
      a = r.cy,
      u = mz({
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
      angle: dz(l),
      angleInRadian: l
    }
  },
  yz = function(e) {
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
  vz = function(e, r) {
    var n = r.startAngle,
      i = r.endAngle,
      o = Math.floor(n / 360),
      a = Math.floor(i / 360),
      u = Math.min(o, a);
    return e + u * 360
  },
  Pp = function(e, r) {
    var n = e.x,
      i = e.y,
      o = hz({
        x: n,
        y: i
      }, r),
      a = o.radius,
      u = o.angle,
      s = r.innerRadius,
      l = r.outerRadius;
    if (a < s || a > l) return !1;
    if (a === 0) return !0;
    var f = yz(r),
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
    return y ? N1(N1({}, r), {}, {
      radius: a,
      angle: vz(d, r)
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
var gz = ["offset"];

function bz(t) {
  return Sz(t) || Oz(t) || wz(t) || xz()
}

function xz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function wz(t, e) {
  if (t) {
    if (typeof t == "string") return Tp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Tp(t, e)
  }
}

function Oz(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function Sz(t) {
  if (Array.isArray(t)) return Tp(t)
}

function Tp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function Az(t, e) {
  if (t == null) return {};
  var r = _z(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function _z(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function R1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ut(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? R1(Object(r), !0).forEach(function(n) {
      Pz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : R1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Pz(t, e, r) {
  return e = Tz(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Tz(t) {
  var e = Ez(t, "string");
  return Xo(e) == "symbol" ? e : e + ""
}

function Ez(t, e) {
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
var Mz = function(e) {
    var r = e.value,
      n = e.formatter,
      i = (0, Zo.default)(e.children) ? r : e.children;
    return (0, Jo.default)(n) ? n(i) : i
  },
  Cz = function(e, r) {
    var n = Zt(r - e),
      i = Math.min(Math.abs(r - e), 360);
    return n * i
  },
  Iz = function(e, r, n) {
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
      x = Cz(d, y),
      w = x >= 0 ? 1 : -1,
      S, P;
    i === "insideStart" ? (S = d + w * a, P = m) : i === "insideEnd" ? (S = y - w * a, P = !m) : i === "end" && (S = y + w * a, P = m), P = x <= 0 ? P : !P;
    var h = Rt(l, f, v, S),
      g = Rt(l, f, v, S + (P ? 1 : -1) * 359),
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
  kz = function(e) {
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
      var d = Rt(a, u, l + n, p),
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
      x = Rt(a, u, v, p),
      w = x.x,
      S = x.y;
    return {
      x: w,
      y: S,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }
  },
  Dz = function(e) {
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
      return Ut(Ut({}, S), n ? {
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
      return Ut(Ut({}, P), n ? {
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
      return Ut(Ut({}, h), n ? {
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
      return Ut(Ut({}, g), n ? {
        width: Math.max(n.x + n.width - g.x, 0),
        height: f
      } : {})
    }
    var _ = n ? {
      width: l,
      height: f
    } : {};
    return o === "insideLeft" ? Ut({
      x: u + v,
      y: s + f / 2,
      textAnchor: w,
      verticalAnchor: "middle"
    }, _) : o === "insideRight" ? Ut({
      x: u + l - v,
      y: s + f / 2,
      textAnchor: x,
      verticalAnchor: "middle"
    }, _) : o === "insideTop" ? Ut({
      x: u + l / 2,
      y: s + p,
      textAnchor: "middle",
      verticalAnchor: y
    }, _) : o === "insideBottom" ? Ut({
      x: u + l / 2,
      y: s + f - p,
      textAnchor: "middle",
      verticalAnchor: d
    }, _) : o === "insideTopLeft" ? Ut({
      x: u + v,
      y: s + p,
      textAnchor: w,
      verticalAnchor: y
    }, _) : o === "insideTopRight" ? Ut({
      x: u + l - v,
      y: s + p,
      textAnchor: x,
      verticalAnchor: y
    }, _) : o === "insideBottomLeft" ? Ut({
      x: u + v,
      y: s + f - p,
      textAnchor: w,
      verticalAnchor: d
    }, _) : o === "insideBottomRight" ? Ut({
      x: u + l - v,
      y: s + f - p,
      textAnchor: x,
      verticalAnchor: d
    }, _) : (0, jp.default)(o) && (X(o.x) || pr(o.x)) && (X(o.y) || pr(o.y)) ? Ut({
      x: u + ze(o.x, l),
      y: s + ze(o.y, f),
      textAnchor: "end",
      verticalAnchor: "end"
    }, _) : Ut({
      x: u + l / 2,
      y: s + f / 2,
      textAnchor: "middle",
      verticalAnchor: "middle"
    }, _)
  },
  Nz = function(e) {
    return "cx" in e && X(e.cx)
  };

function qt(t) {
  var e = t.offset,
    r = e === void 0 ? 5 : e,
    n = Az(t, gz),
    i = Ut({
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
  if (!o || (0, Zo.default)(u) && (0, Zo.default)(s) && !As(l) && !(0, Jo.default)(l)) return null;
  if (As(l)) return Ep(l, i);
  var d;
  if ((0, Jo.default)(l)) {
    if (d = jz(l, i), As(d)) return d
  } else d = Mz(i);
  var y = Nz(o),
    m = st(i, !0);
  if (y && (a === "insideStart" || a === "insideEnd" || a === "end")) return Iz(i, d, m);
  var v = y ? kz(i) : Dz(i);
  return ur.createElement(Yr, Yo({
    className: ut("recharts-label", c)
  }, m, v, {
    breakAll: p
  }), d)
}
qt.displayName = "Label";
var L1 = function(e) {
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
  Rz = function(e, r) {
    return e ? e === !0 ? ur.createElement(qt, {
      key: "label-implicit",
      viewBox: r
    }) : Mt(e) ? ur.createElement(qt, {
      key: "label-implicit",
      viewBox: r,
      value: e
    }) : As(e) ? e.type === qt ? Ep(e, {
      key: "label-implicit",
      viewBox: r
    }) : ur.createElement(qt, {
      key: "label-implicit",
      content: e,
      viewBox: r
    }) : (0, Jo.default)(e) ? ur.createElement(qt, {
      key: "label-implicit",
      content: e,
      viewBox: r
    }) : (0, jp.default)(e) ? ur.createElement(qt, Yo({
      viewBox: r
    }, e, {
      key: "label-implicit"
    })) : null : null
  },
  Lz = function(e, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (!e || !e.children && n && !e.label) return null;
    var i = e.children,
      o = L1(e),
      a = Ft(i, qt).map(function(s, l) {
        return Ep(s, {
          viewBox: r || o,
          key: "label-".concat(l)
        })
      });
    if (!n) return a;
    var u = Rz(e.label, r || o);
    return [u].concat(bz(a))
  };
qt.parseViewBox = L1;
qt.renderCallByParent = Lz;
var _s = et(Pe()),
  $1 = et(_e()),
  U1 = et(Bt()),
  H1 = et(q1());
import hi, {
  cloneElement as Yz
} from "./react-shim-eraudit.js";

function Qo(t) {
  "@babel/helpers - typeof";
  return Qo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Qo(t)
}
var qz = ["valueAccessor"],
  Wz = ["data", "dataKey", "clockWise", "id", "textBreakAll"];

function zz(t) {
  return Hz(t) || Uz(t) || $z(t) || Fz()
}

function Fz() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function $z(t, e) {
  if (t) {
    if (typeof t == "string") return Mp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Mp(t, e)
  }
}

function Uz(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function Hz(t) {
  if (Array.isArray(t)) return Mp(t)
}

function Mp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function Ps() {
  return Ps = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ps.apply(this, arguments)
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
      Gz(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : W1(Object(r)).forEach(function(n) {
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
  return Qo(e) == "symbol" ? e : e + ""
}

function Vz(t, e) {
  if (Qo(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Qo(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function F1(t, e) {
  if (t == null) return {};
  var r = Xz(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function Xz(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var Zz = function(e) {
  return Array.isArray(e.value) ? (0, H1.default)(e.value) : e.value
};

function sr(t) {
  var e = t.valueAccessor,
    r = e === void 0 ? Zz : e,
    n = F1(t, qz),
    i = n.data,
    o = n.dataKey,
    a = n.clockWise,
    u = n.id,
    s = n.textBreakAll,
    l = F1(n, Wz);
  return !i || !i.length ? null : hi.createElement(xt, {
    className: "recharts-label-list"
  }, i.map(function(f, c) {
    var p = (0, _s.default)(o) ? r(f, c) : Xt(f && f.payload, o),
      d = (0, _s.default)(u) ? {} : {
        id: "".concat(u, "-").concat(c)
      };
    return hi.createElement(qt, Ps({}, st(f, !0), l, d, {
      parentViewBox: f.parentViewBox,
      value: p,
      textBreakAll: s,
      viewBox: qt.parseViewBox((0, _s.default)(a) ? f : z1(z1({}, f), {}, {
        clockWise: a
      })),
      key: "label-".concat(c),
      index: c
    }))
  }))
}
sr.displayName = "LabelList";

function Jz(t, e) {
  return t ? t === !0 ? hi.createElement(sr, {
    key: "labelList-implicit",
    data: e
  }) : hi.isValidElement(t) || (0, U1.default)(t) ? hi.createElement(sr, {
    key: "labelList-implicit",
    data: e,
    content: t
  }) : (0, $1.default)(t) ? hi.createElement(sr, Ps({
    data: e
  }, t, {
    key: "labelList-implicit"
  })) : null : null
}

function Qz(t, e) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && r && !t.label) return null;
  var n = t.children,
    i = Ft(n, sr).map(function(a, u) {
      return Yz(a, {
        data: e,
        key: "labelList-".concat(u)
      })
    });
  if (!r) return i;
  var o = Jz(t.label, e);
  return [o].concat(zz(i))
}
sr.renderCallByParent = Qz;
import nF from "./react-shim-eraudit.js";

function ta(t) {
  "@babel/helpers - typeof";
  return ta = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ta(t)
}

function Cp() {
  return Cp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Cp.apply(this, arguments)
}

function G1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function K1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? G1(Object(r), !0).forEach(function(n) {
      tF(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : G1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function tF(t, e, r) {
  return e = eF(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function eF(t) {
  var e = rF(t, "string");
  return ta(e) == "symbol" ? e : e + ""
}

function rF(t, e) {
  if (ta(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ta(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var iF = function(e, r) {
    var n = Zt(r - e),
      i = Math.min(Math.abs(r - e), 359.999);
    return n * i
  },
  Ts = function(e) {
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
      d = Rt(r, n, f, p),
      y = Rt(r, n, i, p),
      m = l ? o - a * c : o,
      v = Rt(r, n, f * Math.cos(c * Vo), m);
    return {
      center: d,
      circleTangency: y,
      lineTangency: v,
      theta: c
    }
  },
  V1 = function(e) {
    var r = e.cx,
      n = e.cy,
      i = e.innerRadius,
      o = e.outerRadius,
      a = e.startAngle,
      u = e.endAngle,
      s = iF(a, u),
      l = a + s,
      f = Rt(r, n, o, a),
      c = Rt(r, n, o, l),
      p = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(o, ",").concat(o, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(a > l), `,
    `).concat(c.x, ",").concat(c.y, `
  `);
    if (i > 0) {
      var d = Rt(r, n, i, a),
        y = Rt(r, n, i, l);
      p += "L ".concat(y.x, ",").concat(y.y, `
            A `).concat(i, ",").concat(i, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(a <= l), `,
            `).concat(d.x, ",").concat(d.y, " Z")
    } else p += "L ".concat(r, ",").concat(n, " Z");
    return p
  },
  oF = function(e) {
    var r = e.cx,
      n = e.cy,
      i = e.innerRadius,
      o = e.outerRadius,
      a = e.cornerRadius,
      u = e.forceCornerRadius,
      s = e.cornerIsExternal,
      l = e.startAngle,
      f = e.endAngle,
      c = Zt(f - l),
      p = Ts({
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
      v = Ts({
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
      `) : V1({
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
      var g = Ts({
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
        B = Ts({
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
        N = B.lineTangency,
        H = B.theta,
        F = s ? Math.abs(l - f) : Math.abs(l - f) - k - H;
      if (F < 0 && a === 0) return "".concat(h, "L").concat(r, ",").concat(n, "Z");
      h += "L".concat(N.x, ",").concat(N.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(W.x, ",").concat(W.y, `
      A`).concat(i, ",").concat(i, ",0,").concat(+(F > 180), ",").concat(+(c > 0), ",").concat(_.x, ",").concat(_.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(c < 0), ",").concat(C.x, ",").concat(C.y, "Z")
    } else h += "L".concat(r, ",").concat(n, "Z");
    return h
  },
  aF = {
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
  Es = function(e) {
    var r = K1(K1({}, aF), e),
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
    return m > 0 && Math.abs(f - c) < 360 ? v = oF({
      cx: n,
      cy: i,
      innerRadius: o,
      outerRadius: a,
      cornerRadius: Math.min(m, y / 2),
      forceCornerRadius: s,
      cornerIsExternal: l,
      startAngle: f,
      endAngle: c
    }) : v = V1({
      cx: n,
      cy: i,
      innerRadius: o,
      outerRadius: a,
      startAngle: f,
      endAngle: c
    }), nF.createElement("path", Cp({}, st(r, !0), {
      className: d,
      d: v,
      role: "img"
    }))
  };
import * as J1 from "./react-shim-eraudit.js";
var Q1 = et(iu()),
  tO = et(Bt());

function na(t) {
  "@babel/helpers - typeof";
  return na = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, na(t)
}

function Ip() {
  return Ip = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ip.apply(this, arguments)
}

function X1(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Y1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? X1(Object(r), !0).forEach(function(n) {
      uF(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : X1(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function uF(t, e, r) {
  return e = sF(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function sF(t) {
  var e = lF(t, "string");
  return na(e) == "symbol" ? e : e + ""
}

function lF(t, e) {
  if (na(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (na(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Z1 = {
    curveBasisClosed: pc,
    curveBasisOpen: dc,
    curveBasis: fc,
    curveBumpX: ec,
    curveBumpY: rc,
    curveLinearClosed: mc,
    curveLinear: Ar,
    curveMonotoneX: yc,
    curveMonotoneY: vc,
    curveNatural: gc,
    curveStep: bc,
    curveStepAfter: wc,
    curveStepBefore: xc
  },
  js = function(e) {
    return e.x === +e.x && e.y === +e.y
  },
  ea = function(e) {
    return e.x
  },
  ra = function(e) {
    return e.y
  },
  cF = function(e, r) {
    if ((0, tO.default)(e)) return e;
    var n = "curve".concat((0, Q1.default)(e));
    return (n === "curveMonotone" || n === "curveBump") && r ? Z1["".concat(n).concat(r === "vertical" ? "Y" : "X")] : Z1[n] || Ar
  },
  fF = function(e) {
    var r = e.type,
      n = r === void 0 ? "linear" : r,
      i = e.points,
      o = i === void 0 ? [] : i,
      a = e.baseLine,
      u = e.layout,
      s = e.connectNulls,
      l = s === void 0 ? !1 : s,
      f = cF(n, u),
      c = l ? o.filter(function(m) {
        return js(m)
      }) : o,
      p;
    if (Array.isArray(a)) {
      var d = l ? a.filter(function(m) {
          return js(m)
        }) : a,
        y = c.map(function(m, v) {
          return Y1(Y1({}, m), {}, {
            base: d[v]
          })
        });
      return u === "vertical" ? p = kn().y(ra).x1(ea).x0(function(m) {
        return m.base.x
      }) : p = kn().x(ea).y1(ra).y0(function(m) {
        return m.base.y
      }), p.defined(js).curve(f), p(y)
    }
    return u === "vertical" && X(a) ? p = kn().y(ra).x1(ea).x0(a) : X(a) ? p = kn().x(ea).y1(ra).y0(a) : p = Qi().x(ea).y(ra), p.defined(js).curve(f), p(c)
  },
  ia = function(e) {
    var r = e.className,
      n = e.points,
      i = e.path,
      o = e.pathRef;
    if ((!n || !n.length) && !i) return null;
    var a = n && n.length ? fF(e) : i;
    return J1.createElement("path", Ip({}, st(e, !1), Fr(e), {
      className: ut("recharts-curve", r),
      d: a,
      ref: o
    }))
  };
import Ls, {
  useEffect as J3,
  useRef as Q3,
  useState as t8
} from "./react-shim-eraudit.js";
var Ot = et(sO());
import z3, {
  PureComponent as F3,
  cloneElement as $3,
  Children as Fp
} from "./react-shim-eraudit.js";
var {
  getOwnPropertyNames: mF,
  getOwnPropertySymbols: hF
} = Object, {
  hasOwnProperty: yF
} = Object.prototype;

function kp(t, e) {
  return function(n, i, o) {
    return t(n, i, o) && e(n, i, o)
  }
}

function Ms(t) {
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

function vF(t) {
  return t?.[Symbol.toStringTag]
}

function lO(t) {
  return mF(t).concat(hF(t))
}
var gF = Object.hasOwn || ((t, e) => yF.call(t, e));

function mn(t, e) {
  return t === e || !t && !e && t !== t && e !== e
}
var bF = "__v",
  xF = "__o",
  wF = "_owner",
  {
    getOwnPropertyDescriptor: cO,
    keys: fO
  } = Object;

function OF(t, e) {
  return t.byteLength === e.byteLength && Cs(new Uint8Array(t), new Uint8Array(e))
}

function SF(t, e, r) {
  let n = t.length;
  if (e.length !== n) return !1;
  for (; n-- > 0;)
    if (!r.equals(t[n], e[n], n, n, t, e, r)) return !1;
  return !0
}

function AF(t, e) {
  return t.byteLength === e.byteLength && Cs(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), new Uint8Array(e.buffer, e.byteOffset, e.byteLength))
}

function _F(t, e) {
  return mn(t.getTime(), e.getTime())
}

function PF(t, e) {
  return t.name === e.name && t.message === e.message && t.cause === e.cause && t.stack === e.stack
}

function TF(t, e) {
  return t === e
}

function pO(t, e, r) {
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
var EF = mn;

function jF(t, e, r) {
  let n = fO(t),
    i = n.length;
  if (fO(e).length !== i) return !1;
  for (; i-- > 0;)
    if (!mO(t, e, r, n[i])) return !1;
  return !0
}

function oa(t, e, r) {
  let n = lO(t),
    i = n.length;
  if (lO(e).length !== i) return !1;
  let o, a, u;
  for (; i-- > 0;)
    if (o = n[i], !mO(t, e, r, o) || (a = cO(t, o), u = cO(e, o), (a || u) && (!a || !u || a.configurable !== u.configurable || a.enumerable !== u.enumerable || a.writable !== u.writable))) return !1;
  return !0
}

function MF(t, e) {
  return mn(t.valueOf(), e.valueOf())
}

function CF(t, e) {
  return t.source === e.source && t.flags === e.flags
}

function dO(t, e, r) {
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

function Cs(t, e) {
  let r = t.byteLength;
  if (e.byteLength !== r || t.byteOffset !== e.byteOffset) return !1;
  for (; r-- > 0;)
    if (t[r] !== e[r]) return !1;
  return !0
}

function IF(t, e) {
  return t.hostname === e.hostname && t.pathname === e.pathname && t.protocol === e.protocol && t.port === e.port && t.hash === e.hash && t.username === e.username && t.password === e.password
}

function mO(t, e, r, n) {
  return (n === wF || n === xF || n === bF) && (t.$$typeof || e.$$typeof) ? !0 : gF(e, n) && r.equals(t[n], e[n], n, n, t, e, r)
}
var kF = "[object ArrayBuffer]",
  DF = "[object Arguments]",
  NF = "[object Boolean]",
  RF = "[object DataView]",
  LF = "[object Date]",
  BF = "[object Error]",
  qF = "[object Map]",
  WF = "[object Number]",
  zF = "[object Object]",
  FF = "[object RegExp]",
  $F = "[object Set]",
  UF = "[object String]",
  HF = {
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
  GF = "[object URL]",
  KF = Object.prototype.toString;

function VF({
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
    let h = KF.call(v);
    if (h === LF) return n(v, x, w);
    if (h === FF) return f(v, x, w);
    if (h === qF) return a(v, x, w);
    if (h === $F) return c(v, x, w);
    if (h === zF) return typeof v.then != "function" && typeof x.then != "function" && s(v, x, w);
    if (h === GF) return d(v, x, w);
    if (h === BF) return i(v, x, w);
    if (h === DF) return s(v, x, w);
    if (HF[h]) return p(v, x, w);
    if (h === kF) return t(v, x, w);
    if (h === RF) return r(v, x, w);
    if (h === NF || h === WF || h === UF) return l(v, x, w);
    if (y) {
      let g = y[h];
      if (!g) {
        let _ = vF(v);
        _ && (g = y[_])
      }
      if (g) return g(v, x, w)
    }
    return !1
  }
}

function XF({
  circular: t,
  createCustomConfig: e,
  strict: r
}) {
  let n = {
    areArrayBuffersEqual: OF,
    areArraysEqual: r ? oa : SF,
    areDataViewsEqual: AF,
    areDatesEqual: _F,
    areErrorsEqual: PF,
    areFunctionsEqual: TF,
    areMapsEqual: r ? kp(pO, oa) : pO,
    areNumbersEqual: EF,
    areObjectsEqual: r ? oa : jF,
    arePrimitiveWrappersEqual: MF,
    areRegExpsEqual: CF,
    areSetsEqual: r ? kp(dO, oa) : dO,
    areTypedArraysEqual: r ? kp(Cs, oa) : Cs,
    areUrlsEqual: IF,
    unknownTagComparators: void 0
  };
  if (e && (n = Object.assign({}, n, e(n))), t) {
    let i = Ms(n.areArraysEqual),
      o = Ms(n.areMapsEqual),
      a = Ms(n.areObjectsEqual),
      u = Ms(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: i,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: u
    })
  }
  return n
}

function YF(t) {
  return function(e, r, n, i, o, a, u) {
    return t(e, r, u)
  }
}

function ZF({
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
var hO = kr(),
  Itt = kr({
    strict: !0
  }),
  ktt = kr({
    circular: !0
  }),
  Dtt = kr({
    circular: !0,
    strict: !0
  }),
  Ntt = kr({
    createInternalComparator: () => mn
  }),
  Rtt = kr({
    strict: !0,
    createInternalComparator: () => mn
  }),
  Ltt = kr({
    circular: !0,
    createInternalComparator: () => mn
  }),
  Btt = kr({
    circular: !0,
    createInternalComparator: () => mn,
    strict: !0
  });

function kr(t = {}) {
  let {
    circular: e = !1,
    createInternalComparator: r,
    createState: n,
    strict: i = !1
  } = t, o = XF(t), a = VF(o), u = r ? r(a) : YF(a);
  return ZF({
    circular: e,
    comparator: a,
    createState: n,
    equals: u,
    strict: i
  })
}

function JF(t) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(t)
}

function Is(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    r = -1,
    n = function i(o) {
      r < 0 && (r = o), o - r > e ? (t(o), r = -1) : JF(i)
    };
  requestAnimationFrame(n)
}

function Dp(t) {
  "@babel/helpers - typeof";
  return Dp = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Dp(t)
}

function QF(t) {
  return n3(t) || r3(t) || e3(t) || t3()
}

function t3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function e3(t, e) {
  if (t) {
    if (typeof t == "string") return yO(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return yO(t, e)
  }
}

function yO(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function r3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function n3(t) {
  if (Array.isArray(t)) return t
}

function Np() {
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
            u = QF(a),
            s = u[0],
            l = u.slice(1);
          if (typeof s == "number") {
            Is(i.bind(null, l), s);
            return
          }
          i(s), Is(i.bind(null, l));
          return
        }
        Dp(o) === "object" && (t = o, e(t)), typeof o == "function" && o()
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

function vO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function gO(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? vO(Object(r), !0).forEach(function(n) {
      bO(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : vO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function bO(t, e, r) {
  return e = i3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function i3(t) {
  var e = o3(t, "string");
  return aa(e) === "symbol" ? e : String(e)
}

function o3(t, e) {
  if (aa(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (aa(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var xO = function(e, r) {
    return [Object.keys(e), Object.keys(r)].reduce(function(n, i) {
      return n.filter(function(o) {
        return i.includes(o)
      })
    })
  },
  wO = function(e) {
    return e
  },
  a3 = function(e) {
    return e.replace(/([A-Z])/g, function(r) {
      return "-".concat(r.toLowerCase())
    })
  };
var yi = function(e, r) {
    return Object.keys(r).reduce(function(n, i) {
      return gO(gO({}, n), {}, bO({}, i, e(i, r[i])))
    }, {})
  },
  Rp = function(e, r, n) {
    return e.map(function(i) {
      return "".concat(a3(i), " ").concat(r, "ms ").concat(n)
    }).join(",")
  },
  u3 = !1,
  ua = function(e, r, n, i, o, a, u, s) {
    if (u3 && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !e))
      if (r === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      else {
        var l = [n, i, o, a, u, s],
          f = 0;
        console.warn(r.replace(/%s/g, function() {
          return l[f++]
        }))
      }
  };

function s3(t, e) {
  return f3(t) || c3(t, e) || AO(t, e) || l3()
}

function l3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function c3(t, e) {
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

function f3(t) {
  if (Array.isArray(t)) return t
}

function p3(t) {
  return h3(t) || m3(t) || AO(t) || d3()
}

function d3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function AO(t, e) {
  if (t) {
    if (typeof t == "string") return Lp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Lp(t, e)
  }
}

function m3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function h3(t) {
  if (Array.isArray(t)) return Lp(t)
}

function Lp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var ks = 1e-4,
  _O = function(e, r) {
    return [0, 3 * e, 3 * r - 6 * e, 3 * e - 3 * r + 1]
  },
  PO = function(e, r) {
    return e.map(function(n, i) {
      return n * Math.pow(r, i)
    }).reduce(function(n, i) {
      return n + i
    })
  },
  OO = function(e, r) {
    return function(n) {
      var i = _O(e, r);
      return PO(i, n)
    }
  },
  y3 = function(e, r) {
    return function(n) {
      var i = _O(e, r),
        o = [].concat(p3(i.map(function(a, u) {
          return a * u
        }).slice(1)), [0]);
      return PO(o, n)
    }
  },
  SO = function() {
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
            f = s3(l, 4);
          i = f[0], o = f[1], a = f[2], u = f[3]
        } else ua(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r)
      }
    }
    ua([i, a, o, u].every(function(v) {
      return typeof v == "number" && v >= 0 && v <= 1
    }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
    var c = OO(i, a),
      p = OO(o, u),
      d = y3(i, a),
      y = function(x) {
        return x > 1 ? 1 : x < 0 ? 0 : x
      },
      m = function(x) {
        for (var w = x > 1 ? 1 : x, S = w, P = 0; P < 8; ++P) {
          var h = c(S) - w,
            g = d(S);
          if (Math.abs(h - w) < ks || g < ks) return p(S);
          S = y(S - h / g)
        }
        return p(S)
      };
    return m.isStepper = !1, m
  },
  v3 = function() {
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
        return Math.abs(v - c) < ks && Math.abs(m) < ks ? [c, 0] : [v, m]
      };
    return s.isStepper = !0, s.dt = u, s
  },
  TO = function() {
    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
    var i = r[0];
    if (typeof i == "string") switch (i) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return SO(i);
      case "spring":
        return v3();
      default:
        if (i.split("(")[0] === "cubic-bezier") return SO(i);
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

function EO(t) {
  return x3(t) || b3(t) || MO(t) || g3()
}

function g3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function b3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function x3(t) {
  if (Array.isArray(t)) return qp(t)
}

function jO(t, e) {
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
    e % 2 ? jO(Object(r), !0).forEach(function(n) {
      Bp(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : jO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Bp(t, e, r) {
  return e = w3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function w3(t) {
  var e = O3(t, "string");
  return sa(e) === "symbol" ? e : String(e)
}

function O3(t, e) {
  if (sa(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (sa(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function S3(t, e) {
  return P3(t) || _3(t, e) || MO(t, e) || A3()
}

function A3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function MO(t, e) {
  if (t) {
    if (typeof t == "string") return qp(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return qp(t, e)
  }
}

function qp(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function _3(t, e) {
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

function P3(t) {
  if (Array.isArray(t)) return t
}
var Ds = function(e, r, n) {
    return e + (r - e) * n
  },
  Wp = function(e) {
    var r = e.from,
      n = e.to;
    return r !== n
  },
  T3 = function t(e, r, n) {
    var i = yi(function(o, a) {
      if (Wp(a)) {
        var u = e(a.from, a.to, a.velocity),
          s = S3(u, 2),
          l = s[0],
          f = s[1];
        return Yt(Yt({}, a), {}, {
          from: l,
          velocity: f
        })
      }
      return a
    }, r);
    return n < 1 ? yi(function(o, a) {
      return Wp(a) ? Yt(Yt({}, a), {}, {
        velocity: Ds(a.velocity, i[o].velocity, n),
        from: Ds(a.from, i[o].from, n)
      }) : a
    }, r) : t(e, i, n - 1)
  },
  CO = function(t, e, r, n, i) {
    var o = xO(t, e),
      a = o.reduce(function(v, x) {
        return Yt(Yt({}, v), {}, Bp({}, x, [t[x], e[x]]))
      }, {}),
      u = o.reduce(function(v, x) {
        return Yt(Yt({}, v), {}, Bp({}, x, {
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
        return yi(function(x, w) {
          return w.from
        }, u)
      },
      d = function() {
        return !Object.values(u).filter(Wp).length
      },
      y = function(x) {
        l || (l = x);
        var w = x - l,
          S = w / r.dt;
        u = T3(r, u, S), i(Yt(Yt(Yt({}, t), e), p(u))), l = x, d() || (s = requestAnimationFrame(c))
      },
      m = function(x) {
        f || (f = x);
        var w = (x - f) / n,
          S = yi(function(h, g) {
            return Ds.apply(void 0, EO(g).concat([r(w)]))
          }, a);
        if (i(Yt(Yt(Yt({}, t), e), S)), w < 1) s = requestAnimationFrame(c);
        else {
          var P = yi(function(h, g) {
            return Ds.apply(void 0, EO(g).concat([r(1)]))
          }, a);
          i(Yt(Yt(Yt({}, t), e), P))
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

function vi(t) {
  "@babel/helpers - typeof";
  return vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, vi(t)
}
var E3 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];

function j3(t, e) {
  if (t == null) return {};
  var r = M3(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function M3(t, e) {
  if (t == null) return {};
  var r = {},
    n = Object.keys(t),
    i, o;
  for (o = 0; o < n.length; o++) i = n[o], !(e.indexOf(i) >= 0) && (r[i] = t[i]);
  return r
}

function zp(t) {
  return D3(t) || k3(t) || I3(t) || C3()
}

function C3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function I3(t, e) {
  if (t) {
    if (typeof t == "string") return $p(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return $p(t, e)
  }
}

function k3(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function D3(t) {
  if (Array.isArray(t)) return $p(t)
}

function $p(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function IO(t, e) {
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
    e % 2 ? IO(Object(r), !0).forEach(function(n) {
      la(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : IO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function la(t, e, r) {
  return e = DO(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function N3(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function kO(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, DO(n.key), n)
  }
}

function R3(t, e, r) {
  return e && kO(t.prototype, e), r && kO(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function DO(t) {
  var e = L3(t, "string");
  return vi(e) === "symbol" ? e : String(e)
}

function L3(t, e) {
  if (vi(t) !== "object" || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (vi(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function B3(t, e) {
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

function q3(t) {
  var e = W3();
  return function() {
    var n = Ns(t),
      i;
    if (e) {
      var o = Ns(this).constructor;
      i = Reflect.construct(n, arguments, o)
    } else i = n.apply(this, arguments);
    return Hp(this, i)
  }
}

function Hp(t, e) {
  if (e && (vi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Gp(t)
}

function Gp(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function W3() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
  } catch {
    return !1
  }
}

function Ns(t) {
  return Ns = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Ns(t)
}
var Rs = function(t) {
  B3(r, t);
  var e = q3(r);

  function r(n, i) {
    var o;
    N3(this, r), o = e.call(this, n, i);
    var a = o.props,
      u = a.isActive,
      s = a.attributeName,
      l = a.from,
      f = a.to,
      c = a.steps,
      p = a.children,
      d = a.duration;
    if (o.handleStyleChange = o.handleStyleChange.bind(Gp(o)), o.changeStyle = o.changeStyle.bind(Gp(o)), !u || d <= 0) return o.state = {
      style: {}
    }, typeof p == "function" && (o.state = {
      style: f
    }), Hp(o);
    if (c && c.length) o.state = {
      style: c[0].style
    };
    else if (l) {
      if (typeof p == "function") return o.state = {
        style: l
      }, Hp(o);
      o.state = {
        style: s ? la({}, s, l) : l
      }
    } else o.state = {
      style: {}
    };
    return o
  }
  return R3(r, [{
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
        if (!(hO(i.to, f) && i.canBegin && i.isActive)) {
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
        d = CO(a, u, TO(l), s, this.changeStyle),
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
          if (typeof P == "function" || P === "spring") return [].concat(zp(m), [o.runJSAnimation.bind(o, {
            from: C.style,
            to: h,
            duration: w,
            easing: P
          }), w]);
          var B = Rp(k, w, P),
            W = He(He(He({}, C.style), h), {}, {
              transition: B
            });
          return [].concat(zp(m), [W, w, _]).filter(wO)
        };
      return this.manager.start([s].concat(zp(a.reduce(d, [f, Math.max(p, u)])), [i.onAnimationEnd]))
    }
  }, {
    key: "runAnimation",
    value: function(i) {
      this.manager || (this.manager = Np());
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
        v = Rp(Object.keys(m), a, l);
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
        w = j3(i, E3),
        S = Fp.count(o),
        P = this.state.style;
      if (typeof o == "function") return o(P);
      if (!f || S === 0 || u <= 0) return o;
      var h = function(_) {
        var C = _.props,
          k = C.style,
          B = k === void 0 ? {} : k,
          W = C.className,
          N = $3(_, He(He({}, w), {}, {
            style: He(He({}, B), P),
            className: W
          }));
        return N
      };
      return S === 1 ? h(Fp.only(o)) : z3.createElement("div", null, Fp.map(o, function(g) {
        return h(g)
      }))
    }
  }]), r
}(F3);
Rs.displayName = "Animate";
Rs.defaultProps = {
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
Rs.propTypes = {
  from: Ot.default.oneOfType([Ot.default.object, Ot.default.string]),
  to: Ot.default.oneOfType([Ot.default.object, Ot.default.string]),
  attributeName: Ot.default.string,
  duration: Ot.default.number,
  begin: Ot.default.number,
  easing: Ot.default.oneOfType([Ot.default.string, Ot.default.func]),
  steps: Ot.default.arrayOf(Ot.default.shape({
    duration: Ot.default.number.isRequired,
    style: Ot.default.object.isRequired,
    easing: Ot.default.oneOfType([Ot.default.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), Ot.default.func]),
    properties: Ot.default.arrayOf("string"),
    onAnimationEnd: Ot.default.func
  })),
  children: Ot.default.oneOfType([Ot.default.node, Ot.default.func]),
  isActive: Ot.default.bool,
  canBegin: Ot.default.bool,
  onAnimationEnd: Ot.default.func,
  shouldReAnimate: Ot.default.bool,
  onAnimationStart: Ot.default.func,
  onAnimationReStart: Ot.default.func
};
var NO = Rs;
var lr = NO;

function ca(t) {
  "@babel/helpers - typeof";
  return ca = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ca(t)
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

function U3(t, e) {
  return V3(t) || K3(t, e) || G3(t, e) || H3()
}

function H3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function G3(t, e) {
  if (t) {
    if (typeof t == "string") return RO(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return RO(t, e)
  }
}

function RO(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function K3(t, e) {
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

function V3(t) {
  if (Array.isArray(t)) return t
}

function LO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function BO(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? LO(Object(r), !0).forEach(function(n) {
      X3(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : LO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function X3(t, e, r) {
  return e = Y3(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function Y3(t) {
  var e = Z3(t, "string");
  return ca(e) == "symbol" ? e : e + ""
}

function Z3(t, e) {
  if (ca(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ca(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var qO = function(e, r, n, i, o) {
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
  WO = function(e, r) {
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
  gi = function(e) {
    var r = BO(BO({}, e8), e),
      n = Q3(),
      i = t8(-1),
      o = U3(i, 2),
      a = o[0],
      u = o[1];
    J3(function() {
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
    return w ? Ls.createElement(lr, {
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
      return Ls.createElement(lr, {
        canBegin: a > 0,
        from: "0px ".concat(a === -1 ? 1 : a, "px"),
        to: "".concat(a, "px 0px"),
        attributeName: "strokeDasharray",
        begin: v,
        duration: m,
        isActive: x,
        easing: y
      }, Ls.createElement("path", Bs({}, st(r, !0), {
        className: S,
        d: qO(_, C, h, g, p),
        ref: n
      })))
    }) : Ls.createElement("path", Bs({}, st(r, !0), {
      className: S,
      d: qO(s, l, f, c, p)
    }))
  };
import * as zO from "./react-shim-eraudit.js";

function Kp() {
  return Kp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Kp.apply(this, arguments)
}
var bi = function(e) {
  var r = e.cx,
    n = e.cy,
    i = e.r,
    o = e.className,
    a = ut("recharts-dot", o);
  return r === +r && n === +n && i === +i ? zO.createElement("circle", Kp({}, st(e, !1), Fr(e), {
    className: a,
    cx: r,
    cy: n,
    r: i
  })) : null
};
import l8 from "./react-shim-eraudit.js";

function fa(t) {
  "@babel/helpers - typeof";
  return fa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, fa(t)
}
var r8 = ["x", "y", "top", "left", "width", "height", "className"];

function Vp() {
  return Vp = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Vp.apply(this, arguments)
}

function FO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function n8(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? FO(Object(r), !0).forEach(function(n) {
      i8(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : FO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function i8(t, e, r) {
  return e = o8(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function o8(t) {
  var e = a8(t, "string");
  return fa(e) == "symbol" ? e : e + ""
}

function a8(t, e) {
  if (fa(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (fa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function u8(t, e) {
  if (t == null) return {};
  var r = s8(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function s8(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var c8 = function(e, r, n, i, o, a) {
    return "M".concat(e, ",").concat(o, "v").concat(i, "M").concat(a, ",").concat(r, "h").concat(n)
  },
  $O = function(e) {
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
      m = u8(e, r8),
      v = n8({
        x: n,
        y: o,
        top: u,
        left: l,
        width: c,
        height: d
      }, m);
    return !X(n) || !X(o) || !X(c) || !X(d) || !X(u) || !X(l) ? null : l8.createElement("path", Vp({}, st(v, !0), {
      className: ut("recharts-cross", y),
      d: c8(n, o, c, d, u, l)
    }))
  };
var oS = et(Bt()),
  aS = et(VO()),
  uS = et(YO()),
  sS = et(Ro());
import hn, {
  isValidElement as iS,
  cloneElement as U8
} from "./react-shim-eraudit.js";
import pa, {
  useEffect as D8,
  useRef as N8,
  useState as R8
} from "./react-shim-eraudit.js";

function da(t) {
  "@babel/helpers - typeof";
  return da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, da(t)
}

function qs() {
  return qs = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, qs.apply(this, arguments)
}

function P8(t, e) {
  return M8(t) || j8(t, e) || E8(t, e) || T8()
}

function T8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function E8(t, e) {
  if (t) {
    if (typeof t == "string") return ZO(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ZO(t, e)
  }
}

function ZO(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function j8(t, e) {
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

function M8(t) {
  if (Array.isArray(t)) return t
}

function JO(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function QO(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? JO(Object(r), !0).forEach(function(n) {
      C8(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : JO(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function C8(t, e, r) {
  return e = I8(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function I8(t) {
  var e = k8(t, "string");
  return da(e) == "symbol" ? e : e + ""
}

function k8(t, e) {
  if (da(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (da(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var tS = function(e, r, n, i, o) {
    var a = n - i,
      u;
    return u = "M ".concat(e, ",").concat(r), u += "L ".concat(e + n, ",").concat(r), u += "L ".concat(e + n - a / 2, ",").concat(r + o), u += "L ".concat(e + n - a / 2 - i, ",").concat(r + o), u += "L ".concat(e, ",").concat(r, " Z"), u
  },
  L8 = {
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
  eS = function(e) {
    var r = QO(QO({}, L8), e),
      n = N8(),
      i = R8(-1),
      o = P8(i, 2),
      a = o[0],
      u = o[1];
    D8(function() {
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
      }, pa.createElement("path", qs({}, st(r, !0), {
        className: w,
        d: tS(_, C, P, h, g),
        ref: n
      })))
    }) : pa.createElement("g", null, pa.createElement("path", qs({}, st(r, !0), {
      className: w,
      d: tS(s, l, f, c, p)
    })))
  };
var B8 = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];

function ma(t) {
  "@babel/helpers - typeof";
  return ma = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ma(t)
}

function q8(t, e) {
  if (t == null) return {};
  var r = W8(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function W8(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function rS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Ws(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? rS(Object(r), !0).forEach(function(n) {
      z8(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : rS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function z8(t, e, r) {
  return e = F8(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function F8(t) {
  var e = $8(t, "string");
  return ma(e) == "symbol" ? e : e + ""
}

function $8(t, e) {
  if (ma(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ma(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function H8(t, e) {
  return Ws(Ws({}, e), t)
}

function G8(t, e) {
  return t === "symbols"
}

function nS(t) {
  var e = t.shapeType,
    r = t.elementProps;
  switch (e) {
    case "rectangle":
      return hn.createElement(gi, r);
    case "trapezoid":
      return hn.createElement(eS, r);
    case "sector":
      return hn.createElement(Es, r);
    case "symbols":
      if (G8(e, r)) return hn.createElement(eo, r);
      break;
    default:
      return null
  }
}

function K8(t) {
  return iS(t) ? t.props : t
}

function lS(t) {
  var e = t.option,
    r = t.shapeType,
    n = t.propTransformer,
    i = n === void 0 ? H8 : n,
    o = t.activeClassName,
    a = o === void 0 ? "recharts-active-shape" : o,
    u = t.isActive,
    s = q8(t, B8),
    l;
  if (iS(e)) l = U8(e, Ws(Ws({}, s), K8(e)));
  else if ((0, oS.default)(e)) l = e(s);
  else if ((0, aS.default)(e) && !(0, uS.default)(e)) {
    var f = i(e, s);
    l = hn.createElement(nS, {
      shapeType: r,
      elementProps: f
    })
  } else {
    var c = s;
    l = hn.createElement(nS, {
      shapeType: r,
      elementProps: c
    })
  }
  return u ? hn.createElement(xt, {
    className: a
  }, l) : l
}

function ha(t, e) {
  return e != null && "trapezoids" in t.props
}

function ya(t, e) {
  return e != null && "sectors" in t.props
}

function xi(t, e) {
  return e != null && "points" in t.props
}

function V8(t, e) {
  var r, n, i = t.x === (e == null || (r = e.labelViewBox) === null || r === void 0 ? void 0 : r.x) || t.x === e.x,
    o = t.y === (e == null || (n = e.labelViewBox) === null || n === void 0 ? void 0 : n.y) || t.y === e.y;
  return i && o
}

function X8(t, e) {
  var r = t.endAngle === e.endAngle,
    n = t.startAngle === e.startAngle;
  return r && n
}

function Y8(t, e) {
  var r = t.x === e.x,
    n = t.y === e.y,
    i = t.z === e.z;
  return r && n && i
}

function Z8(t, e) {
  var r;
  return ha(t, e) ? r = V8 : ya(t, e) ? r = X8 : xi(t, e) && (r = Y8), r
}

function J8(t, e) {
  var r;
  return ha(t, e) ? r = "trapezoids" : ya(t, e) ? r = "sectors" : xi(t, e) && (r = "points"), r
}

function Q8(t, e) {
  if (ha(t, e)) {
    var r;
    return (r = e.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload
  }
  if (ya(t, e)) {
    var n;
    return (n = e.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload
  }
  return xi(t, e) ? e.payload : {}
}

function cS(t) {
  var e = t.activeTooltipItem,
    r = t.graphicalItem,
    n = t.itemData,
    i = J8(r, e),
    o = Q8(r, e),
    a = n.filter(function(s, l) {
      var f = (0, sS.default)(o, s),
        c = r.props[i].filter(function(y) {
          var m = Z8(r, e);
          return m(y, e)
        }),
        p = r.props[i].indexOf(c[c.length - 1]),
        d = l === p;
      return f && d
    }),
    u = n.indexOf(a[a.length - 1]);
  return u
}
import Qt, {
  PureComponent as w$,
  Children as O$
} from "./react-shim-eraudit.js";
var td = et(Bt()),
  TS = et(Zp());

function va(t) {
  "@babel/helpers - typeof";
  return va = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, va(t)
}

function gS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function bS(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? gS(Object(r), !0).forEach(function(n) {
      xS(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : gS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function xS(t, e, r) {
  return e = f$(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function f$(t) {
  var e = p$(t, "string");
  return va(e) == "symbol" ? e : e + ""
}

function p$(t, e) {
  if (va(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (va(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var d$ = ["Webkit", "Moz", "O", "ms"],
  wS = function(e, r) {
    if (!e) return null;
    var n = e.replace(/(\w)/, function(o) {
        return o.toUpperCase()
      }),
      i = d$.reduce(function(o, a) {
        return bS(bS({}, o), {}, xS({}, a + n, r))
      }, {});
    return i[e] = r, i
  };

function wi(t) {
  "@babel/helpers - typeof";
  return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, wi(t)
}

function zs() {
  return zs = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, zs.apply(this, arguments)
}

function OS(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function Jp(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? OS(Object(r), !0).forEach(function(n) {
      Se(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : OS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function m$(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function SS(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, PS(n.key), n)
  }
}

function h$(t, e, r) {
  return e && SS(t.prototype, e), r && SS(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function y$(t, e, r) {
  return e = Fs(e), v$(t, _S() ? Reflect.construct(e, r || [], Fs(t).constructor) : e.apply(t, r))
}

function v$(t, e) {
  if (e && (wi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return g$(t)
}

function g$(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function _S() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (_S = function() {
    return !!t
  })()
}

function Fs(t) {
  return Fs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Fs(t)
}

function b$(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Qp(t, e)
}

function Qp(t, e) {
  return Qp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Qp(t, e)
}

function Se(t, e, r) {
  return e = PS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function PS(t) {
  var e = x$(t, "string");
  return wi(e) == "symbol" ? e : e + ""
}

function x$(t, e) {
  if (wi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var S$ = function(e) {
    var r = e.data,
      n = e.startIndex,
      i = e.endIndex,
      o = e.x,
      a = e.width,
      u = e.travellerWidth;
    if (!r || !r.length) return {};
    var s = r.length,
      l = Pr().domain((0, TS.default)(0, s)).range([o, o + a - u]),
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
  AS = function(e) {
    return e.changedTouches && !!e.changedTouches.length
  },
  yn = function(t) {
    function e(r) {
      var n;
      return m$(this, e), n = y$(this, e, [r]), Se(n, "handleDrag", function(i) {
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
        var o = AS(i) ? i.changedTouches[0] : i;
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
    return b$(e, t), h$(e, [{
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
          s = Xt(o[n], u, n);
        return (0, td.default)(a) ? a(s, n) : s
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
        var o = AS(i) ? i.changedTouches[0] : i;
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
        return Qt.createElement("rect", {
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
          c = O$.only(l);
        return c ? Qt.cloneElement(c, {
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
          w = Jp(Jp({}, st(this.props, !1)), {}, {
            x,
            y: l,
            width: f,
            height: c
          }),
          S = d || "Min value: ".concat((o = y[m]) === null || o === void 0 ? void 0 : o.name, ", Max value: ").concat((a = y[v]) === null || a === void 0 ? void 0 : a.name);
        return Qt.createElement(xt, {
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
        return Qt.createElement("rect", {
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
        return Qt.createElement(xt, {
          className: "recharts-brush-texts"
        }, Qt.createElement(Yr, zs({
          textAnchor: "end",
          verticalAnchor: "middle",
          x: Math.min(c, p) - d,
          y: a + u / 2
        }, y), this.getTextOfTick(i)), Qt.createElement(Yr, zs({
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
          P = Qt.Children.count(a) === 1,
          h = wS("userSelect", "none");
        return Qt.createElement(xt, {
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
        return Qt.createElement(Qt.Fragment, null, Qt.createElement("rect", {
          x: i,
          y: o,
          width: a,
          height: u,
          fill: s,
          stroke: "none"
        }), Qt.createElement("line", {
          x1: i + 1,
          y1: l,
          x2: i + a - 1,
          y2: l,
          fill: "none",
          stroke: "#fff"
        }), Qt.createElement("line", {
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
        return Qt.isValidElement(n) ? o = Qt.cloneElement(n, i) : (0, td.default)(n) ? o = n(i) : o = e.renderDefaultTraveller(i), o
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
        if (o !== i.prevData || l !== i.prevUpdateId) return Jp({
          prevData: o,
          prevTravellerWidth: s,
          prevUpdateId: l,
          prevX: u,
          prevWidth: a
        }, o && o.length ? S$({
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
  }(w$);
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
var kA = et(Bt()),
  DA = et(CS());
import Pi from "./react-shim-eraudit.js";
var he = function(e, r) {
  var n = e.alwaysShow,
    i = e.ifOverflow;
  return n && (i = "extendDomain"), i === r
};
var tA = et(RS()),
  eA = et(ed());
import Re, {
  PureComponent as c6
} from "./react-shim-eraudit.js";
var XS = et(Ro()),
  YS = et(Pe());
import J$ from "./react-shim-eraudit.js";
var G$ = ["x", "y"];

function ba(t) {
  "@babel/helpers - typeof";
  return ba = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ba(t)
}

function rd() {
  return rd = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, rd.apply(this, arguments)
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

function ga(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? FS(Object(r), !0).forEach(function(n) {
      K$(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : FS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function K$(t, e, r) {
  return e = V$(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function V$(t) {
  var e = X$(t, "string");
  return ba(e) == "symbol" ? e : e + ""
}

function X$(t, e) {
  if (ba(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ba(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function Y$(t, e) {
  if (t == null) return {};
  var r = Z$(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function Z$(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function Q$(t, e) {
  var r = t.x,
    n = t.y,
    i = Y$(t, G$),
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

function nd(t) {
  return J$.createElement(lS, rd({
    shapeType: "rectangle",
    propTransformer: Q$,
    activeClassName: "recharts-active-bar"
  }, t))
}
var $S = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, i) {
    if (typeof e == "number") return e;
    var o = X(n) || Mh(n);
    return o ? e(n, i) : (o || Ue(!1), r)
  }
};
var t6 = ["value", "background"],
  GS;

function Oi(t) {
  "@babel/helpers - typeof";
  return Oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Oi(t)
}

function e6(t, e) {
  if (t == null) return {};
  var r = r6(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function r6(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function $s() {
  return $s = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, $s.apply(this, arguments)
}

function US(t, e) {
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
    e % 2 ? US(Object(r), !0).forEach(function(n) {
      Dr(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : US(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function n6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function HS(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, VS(n.key), n)
  }
}

function i6(t, e, r) {
  return e && HS(t.prototype, e), r && HS(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function o6(t, e, r) {
  return e = Us(e), a6(t, KS() ? Reflect.construct(e, r || [], Us(t).constructor) : e.apply(t, r))
}

function a6(t, e) {
  if (e && (Oi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return u6(t)
}

function u6(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function KS() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (KS = function() {
    return !!t
  })()
}

function Us(t) {
  return Us = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Us(t)
}

function s6(t, e) {
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

function Dr(t, e, r) {
  return e = VS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function VS(t) {
  var e = l6(t, "string");
  return Oi(e) == "symbol" ? e : e + ""
}

function l6(t, e) {
  if (Oi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Oi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Ge = function(t) {
  function e() {
    var r;
    n6(this, e);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = o6(this, e, [].concat(i)), Dr(r, "state", {
      isAnimationFinished: !1
    }), Dr(r, "id", Qe("recharts-bar-")), Dr(r, "handleAnimationEnd", function() {
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
  return s6(e, t), i6(e, [{
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
          m = Wt(Wt(Wt({}, f), c), {}, {
            isActive: d,
            option: y,
            index: p,
            dataKey: u,
            onAnimationStart: i.handleAnimationStart,
            onAnimationEnd: i.handleAnimationEnd
          });
        return Re.createElement(xt, $s({
          className: "recharts-bar-rectangle"
        }, $r(i.props, c, p), {
          key: "rectangle-".concat(c?.x, "-").concat(c?.y, "-").concat(c?.value, "-").concat(p)
        }), Re.createElement(nd, m))
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
      return Re.createElement(lr, {
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
              return Wt(Wt({}, v), {}, {
                x: S(y),
                y: P(y),
                width: h(y),
                height: g(y)
              })
            }
            if (a === "horizontal") {
              var _ = ve(0, v.height),
                C = _(y);
              return Wt(Wt({}, v), {}, {
                y: v.y + v.height - C,
                height: C
              })
            }
            var k = ve(0, v.width),
              B = k(y);
            return Wt(Wt({}, v), {}, {
              width: B
            })
          });
        return Re.createElement(xt, null, n.renderRectanglesStatically(m))
      })
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props,
        i = n.data,
        o = n.isAnimationActive,
        a = this.state.prevData;
      return o && i && i.length && (!a || !(0, XS.default)(a, i)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(i)
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
          d = e6(l, t6);
        if (!p) return null;
        var y = Wt(Wt(Wt(Wt(Wt({}, d), {}, {
          fill: "#eee"
        }, p), s), $r(n.props, l, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: a,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return Re.createElement(nd, $s({
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
        c = Ft(f, Ir);
      if (!c) return null;
      var p = l === "vertical" ? a[0].height / 2 : a[0].width / 2,
        d = function(v, x) {
          var w = Array.isArray(v.value) ? v.value[1] : v.value;
          return {
            x: v.x,
            y: v.y,
            value: w,
            errorVal: Xt(v, x)
          }
        },
        y = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return Re.createElement(xt, y, c.map(function(m) {
        return Re.cloneElement(m, {
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
        h = (0, YS.default)(m) ? this.id : m;
      return Re.createElement(xt, {
        className: x
      }, w || S ? Re.createElement("defs", null, Re.createElement("clipPath", {
        id: "clipPath-".concat(h)
      }, Re.createElement("rect", {
        x: w ? l : l - c / 2,
        y: S ? f : f - p / 2,
        width: w ? c : c * 2,
        height: S ? p : p * 2
      }))) : null, Re.createElement(xt, {
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
}(c6);
GS = Ge;
Dr(Ge, "displayName", "Bar");
Dr(Ge, "defaultProps", {
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
Dr(Ge, "getComposedData", function(t) {
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
    d = E1(n, r);
  if (!d) return null;
  var y = e.layout,
    m = r.type.defaultProps,
    v = m !== void 0 ? Wt(Wt({}, m), r.props) : r.props,
    x = v.dataKey,
    w = v.children,
    S = v.minPointSize,
    P = y === "horizontal" ? a : o,
    h = l ? P.scale.domain() : null,
    g = I1({
      numericAxis: P
    }),
    _ = Ft(w, gf),
    C = c.map(function(k, B) {
      var W, N, H, F, z, b;
      l ? W = j1(l[f + B], h) : (W = Xt(k, x), Array.isArray(W) || (W = [g, W]));
      var O = $S(S, GS.defaultProps.minPointSize)(W[1], B);
      if (y === "horizontal") {
        var T, A = [a.scale(W[0]), a.scale(W[1])],
          j = A[0],
          E = A[1];
        N = Sp({
          axis: o,
          ticks: u,
          bandSize: i,
          offset: d.offset,
          entry: k,
          index: B
        }), H = (T = E ?? j) !== null && T !== void 0 ? T : void 0, F = d.size;
        var D = j - E;
        if (z = Number.isNaN(D) ? 0 : D, b = {
            x: N,
            y: a.y,
            width: F,
            height: a.height
          }, Math.abs(O) > 0 && Math.abs(z) < Math.abs(O)) {
          var L = Zt(z || O) * (Math.abs(O) - Math.abs(z));
          H -= L, z += L
        }
      } else {
        var G = [o.scale(W[0]), o.scale(W[1])],
          Z = G[0],
          J = G[1];
        if (N = Z, H = Sp({
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
          var it = Zt(F || O) * (Math.abs(O) - Math.abs(F));
          F += it
        }
      }
      return Wt(Wt(Wt({}, k), {}, {
        x: N,
        y: H,
        width: F,
        height: z,
        value: l ? W : W[1],
        payload: k,
        background: b
      }, _ && _[B] && _[B].props), {}, {
        tooltipPayload: [Ss(r, k)],
        tooltipPosition: {
          x: N + F / 2,
          y: H + z / 2
        }
      })
    });
  return Wt({
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

function f6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function ZS(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, QS(n.key), n)
  }
}

function p6(t, e, r) {
  return e && ZS(t.prototype, e), r && ZS(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function JS(t, e) {
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
    e % 2 ? JS(Object(r), !0).forEach(function(n) {
      Hs(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : JS(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Hs(t, e, r) {
  return e = QS(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function QS(t) {
  var e = d6(t, "string");
  return xa(e) == "symbol" ? e : e + ""
}

function d6(t, e) {
  if (xa(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (xa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Gs = function(e, r, n, i, o) {
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
      p = !!Jt(l, Ge);
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
        var N = x[1] - x[0],
          H = 1 / 0,
          F = m.categoricalDomain.sort(Ih);
        if (F.forEach(function(G, Z) {
            Z > 0 && (H = Math.min((G || 0) - (F[Z - 1] || 0), H))
          }), Number.isFinite(H)) {
          var z = H / N,
            b = m.layout === "vertical" ? n.height : n.width;
          if (m.padding === "gap" && (_ = z * b / 2), m.padding === "no-gap") {
            var O = ze(e.barCategoryGap, z * b),
              T = z * b / 2;
            _ = T - O - (T - O) / b * O
          }
        }
      }
      i === "xAxis" ? C = [n.left + (S.left || 0) + (_ || 0), n.left + n.width - (S.right || 0) - (_ || 0)] : i === "yAxis" ? C = s === "horizontal" ? [n.top + n.height - (S.bottom || 0), n.top + (S.top || 0)] : [n.top + (S.top || 0) + (_ || 0), n.top + n.height - (S.bottom || 0) - (_ || 0)] : C = m.range, h && (C = [C[1], C[0]]);
      var A = P1(m, o, p),
        j = A.scale,
        E = A.realScaleType;
      j.domain(x).range(C), T1(j);
      var D = C1(j, Ke(Ke({}, m), {}, {
        realScaleType: E
      }));
      i === "xAxis" ? (W = v === "top" && !P || v === "bottom" && P, k = n.left, B = c[g] - W * m.height) : i === "yAxis" && (W = v === "left" && !P || v === "right" && P, k = c[g] - W * m.width, B = n.top);
      var L = Ke(Ke(Ke({}, m), D), {}, {
        realScaleType: E,
        x: k,
        y: B,
        scale: j,
        width: i === "xAxis" ? n.width : m.width,
        height: i === "yAxis" ? n.height : m.height
      });
      return L.bandSize = mi(L, D), !m.hide && i === "xAxis" ? c[g] += (W ? -1 : 1) * L.height : m.hide || (c[g] += (W ? -1 : 1) * L.width), Ke(Ke({}, d), {}, Hs({}, y, L))
    }, {})
  },
  od = function(e, r) {
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
  rA = function(e) {
    var r = e.x1,
      n = e.y1,
      i = e.x2,
      o = e.y2;
    return od({
      x: r,
      y: n
    }, {
      x: i,
      y: o
    })
  },
  nA = function() {
    function t(e) {
      f6(this, t), this.scale = e
    }
    return p6(t, [{
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
Hs(nA, "EPS", 1e-4);
var Si = function(e) {
  var r = Object.keys(e).reduce(function(n, i) {
    return Ke(Ke({}, n), {}, Hs({}, i, nA.create(e[i])))
  }, {});
  return Ke(Ke({}, r), {}, {
    apply: function(i) {
      var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        a = o.bandAware,
        u = o.position;
      return (0, tA.default)(i, function(s, l) {
        return r[l].apply(s, {
          bandAware: a,
          position: u
        })
      })
    },
    isInRange: function(i) {
      return (0, eA.default)(i, function(o, a) {
        return r[a].isInRange(o)
      })
    }
  })
};

function m6(t) {
  return (t % 180 + 180) % 180
}
var iA = function(e) {
  var r = e.width,
    n = e.height,
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    o = m6(i),
    a = o * Math.PI / 180,
    u = Math.atan(n / r),
    s = a > u && a < Math.PI - u ? n / Math.sin(a) : r / Math.cos(a);
  return Math.abs(s)
};
import vn, {
  createContext as gn,
  useContext as wr
} from "./react-shim-eraudit.js";
var hA = et(pA()),
  yA = et(ed());
var dA = et(jl()),
  mA = (0, dA.default)(function(t) {
    return {
      x: t.left,
      y: t.top,
      width: t.width,
      height: t.height
    }
  }, function(t) {
    return ["l", t.left, "t", t.top, "w", t.width, "h", t.height].join("")
  });
var ad = gn(void 0),
  ud = gn(void 0),
  vA = gn(void 0),
  gA = gn({}),
  bA = gn(void 0),
  xA = gn(0),
  wA = gn(0),
  sd = function(e) {
    var r = e.state,
      n = r.xAxisMap,
      i = r.yAxisMap,
      o = r.offset,
      a = e.clipPathId,
      u = e.children,
      s = e.width,
      l = e.height,
      f = mA(o);
    return vn.createElement(ad.Provider, {
      value: n
    }, vn.createElement(ud.Provider, {
      value: i
    }, vn.createElement(gA.Provider, {
      value: o
    }, vn.createElement(vA.Provider, {
      value: f
    }, vn.createElement(bA.Provider, {
      value: a
    }, vn.createElement(xA.Provider, {
      value: l
    }, vn.createElement(wA.Provider, {
      value: s
    }, u)))))))
  },
  OA = function() {
    return wr(bA)
  };
var Ks = function(e) {
    var r = wr(ad);
    r == null && Ue(!1);
    var n = r[e];
    return n == null && Ue(!1), n
  },
  SA = function() {
    var e = wr(ad);
    return tr(e)
  };
var AA = function() {
    var e = wr(ud),
      r = (0, hA.default)(e, function(n) {
        return (0, yA.default)(n.domain, Number.isFinite)
      });
    return r || tr(e)
  },
  Vs = function(e) {
    var r = wr(ud);
    r == null && Ue(!1);
    var n = r[e];
    return n == null && Ue(!1), n
  },
  _A = function() {
    var e = wr(vA);
    return e
  },
  PA = function() {
    return wr(gA)
  },
  Ai = function() {
    return wr(wA)
  },
  _i = function() {
    return wr(xA)
  };

function Ti(t) {
  "@babel/helpers - typeof";
  return Ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ti(t)
}

function j6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function TA(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, IA(n.key), n)
  }
}

function M6(t, e, r) {
  return e && TA(t.prototype, e), r && TA(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function C6(t, e, r) {
  return e = Xs(e), I6(t, CA() ? Reflect.construct(e, r || [], Xs(t).constructor) : e.apply(t, r))
}

function I6(t, e) {
  if (e && (Ti(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return k6(t)
}

function k6(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function CA() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (CA = function() {
    return !!t
  })()
}

function Xs(t) {
  return Xs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Xs(t)
}

function D6(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && ld(t, e)
}

function ld(t, e) {
  return ld = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, ld(t, e)
}

function EA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function jA(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? EA(Object(r), !0).forEach(function(n) {
      fd(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : EA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function fd(t, e, r) {
  return e = IA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function IA(t) {
  var e = N6(t, "string");
  return Ti(e) == "symbol" ? e : e + ""
}

function N6(t, e) {
  if (Ti(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function R6(t, e) {
  return W6(t) || q6(t, e) || B6(t, e) || L6()
}

function L6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function B6(t, e) {
  if (t) {
    if (typeof t == "string") return MA(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return MA(t, e)
  }
}

function MA(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function q6(t, e) {
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

function W6(t) {
  if (Array.isArray(t)) return t
}

function cd() {
  return cd = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, cd.apply(this, arguments)
}
var z6 = function(e, r) {
    var n;
    return Pi.isValidElement(e) ? n = Pi.cloneElement(e, r) : (0, kA.default)(e) ? n = e(r) : n = Pi.createElement("line", cd({}, r, {
      className: "recharts-reference-line-line"
    })), n
  },
  F6 = function(e, r, n, i, o, a, u, s, l) {
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
      return he(l, "discard") && (0, DA.default)(h, function(g) {
        return !e.isInRange(g)
      }) ? null : h
    }
    return null
  };

function $6(t) {
  var e = t.x,
    r = t.y,
    n = t.segment,
    i = t.xAxisId,
    o = t.yAxisId,
    a = t.shape,
    u = t.className,
    s = t.alwaysShow,
    l = OA(),
    f = Ks(i),
    c = Vs(o),
    p = _A();
  if (!l || !p) return null;
  ue(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var d = Si({
      x: f.scale,
      y: c.scale
    }),
    y = Mt(e),
    m = Mt(r),
    v = n && n.length === 2,
    x = F6(d, y, m, v, p, t.position, f.orientation, c.orientation, t);
  if (!x) return null;
  var w = R6(x, 2),
    S = w[0],
    P = S.x,
    h = S.y,
    g = w[1],
    _ = g.x,
    C = g.y,
    k = he(t, "hidden") ? "url(#".concat(l, ")") : void 0,
    B = jA(jA({
      clipPath: k
    }, st(t, !0)), {}, {
      x1: P,
      y1: h,
      x2: _,
      y2: C
    });
  return Pi.createElement(xt, {
    className: ut("recharts-reference-line", u)
  }, z6(a, B), qt.renderCallByParent(t, rA({
    x1: P,
    y1: h,
    x2: _,
    y2: C
  })))
}
var Ys = function(t) {
  function e() {
    return j6(this, e), C6(this, e, arguments)
  }
  return D6(e, t), M6(e, [{
    key: "render",
    value: function() {
      return Pi.createElement($6, this.props)
    }
  }])
}(Pi.Component);
fd(Ys, "displayName", "ReferenceLine");
fd(Ys, "defaultProps", {
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
var WA = et(Bt());
import wa from "./react-shim-eraudit.js";

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

function NA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function RA(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? NA(Object(r), !0).forEach(function(n) {
      Js(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : NA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function U6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function LA(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, qA(n.key), n)
  }
}

function H6(t, e, r) {
  return e && LA(t.prototype, e), r && LA(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function G6(t, e, r) {
  return e = Zs(e), K6(t, BA() ? Reflect.construct(e, r || [], Zs(t).constructor) : e.apply(t, r))
}

function K6(t, e) {
  if (e && (Ei(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return V6(t)
}

function V6(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function BA() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (BA = function() {
    return !!t
  })()
}

function Zs(t) {
  return Zs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Zs(t)
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
  }), e && dd(t, e)
}

function dd(t, e) {
  return dd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, dd(t, e)
}

function Js(t, e, r) {
  return e = qA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function qA(t) {
  var e = Y6(t, "string");
  return Ei(e) == "symbol" ? e : e + ""
}

function Y6(t, e) {
  if (Ei(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Z6 = function(e) {
    var r = e.x,
      n = e.y,
      i = e.xAxis,
      o = e.yAxis,
      a = Si({
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
      return U6(this, e), G6(this, e, arguments)
    }
    return X6(e, t), H6(e, [{
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
        var c = Z6(this.props);
        if (!c) return null;
        var p = c.x,
          d = c.y,
          y = this.props,
          m = y.shape,
          v = y.className,
          x = he(this.props, "hidden") ? "url(#".concat(s, ")") : void 0,
          w = RA(RA({
            clipPath: x
          }, st(this.props, !0)), {}, {
            cx: p,
            cy: d
          });
        return wa.createElement(xt, {
          className: ut("recharts-reference-dot", v)
        }, e.renderDot(m, w), qt.renderCallByParent(this.props, {
          x: p - a,
          y: d - a,
          width: 2 * a,
          height: 2 * a
        }))
      }
    }])
  }(wa.Component);
Js(Oa, "displayName", "ReferenceDot");
Js(Oa, "defaultProps", {
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
Js(Oa, "renderDot", function(t, e) {
  var r;
  return wa.isValidElement(t) ? r = wa.cloneElement(t, e) : (0, WA.default)(t) ? r = t(e) : r = wa.createElement(bi, pd({}, e, {
    cx: e.cx,
    cy: e.cy,
    className: "recharts-reference-dot-dot"
  })), r
});
var GA = et(Bt());
import Sa from "./react-shim-eraudit.js";

function md() {
  return md = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, md.apply(this, arguments)
}

function ji(t) {
  "@babel/helpers - typeof";
  return ji = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, ji(t)
}

function zA(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function FA(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? zA(Object(r), !0).forEach(function(n) {
      tl(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : zA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function J6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function $A(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, HA(n.key), n)
  }
}

function Q6(t, e, r) {
  return e && $A(t.prototype, e), r && $A(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function tU(t, e, r) {
  return e = Qs(e), eU(t, UA() ? Reflect.construct(e, r || [], Qs(t).constructor) : e.apply(t, r))
}

function eU(t, e) {
  if (e && (ji(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return rU(t)
}

function rU(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function UA() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (UA = function() {
    return !!t
  })()
}

function Qs(t) {
  return Qs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, Qs(t)
}

function nU(t, e) {
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

function tl(t, e, r) {
  return e = HA(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function HA(t) {
  var e = iU(t, "string");
  return ji(e) == "symbol" ? e : e + ""
}

function iU(t, e) {
  if (ji(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ji(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var oU = function(e, r, n, i, o) {
    var a = o.x1,
      u = o.x2,
      s = o.y1,
      l = o.y2,
      f = o.xAxis,
      c = o.yAxis;
    if (!f || !c) return null;
    var p = Si({
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
    return he(o, "discard") && (!p.isInRange(d) || !p.isInRange(y)) ? null : od(d, y)
  },
  Aa = function(t) {
    function e() {
      return J6(this, e), tU(this, e, arguments)
    }
    return nU(e, t), Q6(e, [{
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
        var v = oU(c, p, d, y, this.props);
        if (!v && !m) return null;
        var x = he(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
        return Sa.createElement(xt, {
          className: ut("recharts-reference-area", s)
        }, e.renderRect(m, FA(FA({
          clipPath: x
        }, st(this.props, !0)), v)), qt.renderCallByParent(this.props, v))
      }
    }])
  }(Sa.Component);
tl(Aa, "displayName", "ReferenceArea");
tl(Aa, "defaultProps", {
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
tl(Aa, "renderRect", function(t, e) {
  var r;
  return Sa.isValidElement(t) ? r = Sa.cloneElement(t, e) : (0, GA.default)(t) ? r = t(e) : r = Sa.createElement(gi, md({}, e, {
    className: "recharts-reference-area-rect"
  })), r
});
var rl = et(Bt()),
  gd = et(zr());
import Nr, {
  Component as OU
} from "./react-shim-eraudit.js";
var JA = et(Bt());

function el(t, e, r) {
  if (e < 1) return [];
  if (e === 1 && r === void 0) return t;
  for (var n = [], i = 0; i < t.length; i += e)
    if (r === void 0 || r(t[i]) === !0) n.push(t[i]);
    else return;
  return n
}

function KA(t, e, r) {
  var n = {
    width: t.width + e.width,
    height: t.height + e.height
  };
  return iA(n, r)
}

function VA(t, e, r) {
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

function Mi(t, e, r, n, i) {
  if (t * e < t * n || t * e > t * i) return !1;
  var o = r();
  return t * (e - t * o / 2 - n) >= 0 && t * (e + t * o / 2 - i) <= 0
}

function XA(t, e) {
  return el(t, e + 1)
}

function YA(t, e, r, n, i) {
  for (var o = (n || []).slice(), a = e.start, u = e.end, s = 0, l = 1, f = a, c = function() {
      var y = n?.[s];
      if (y === void 0) return {
        v: el(n, l)
      };
      var m = s,
        v, x = function() {
          return v === void 0 && (v = r(y, m)), v
        },
        w = y.coordinate,
        S = s === 0 || Mi(t, w, x, f, u);
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

function te(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ZA(Object(r), !0).forEach(function(n) {
      aU(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : ZA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function aU(t, e, r) {
  return e = uU(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function uU(t) {
  var e = sU(t, "string");
  return _a(e) == "symbol" ? e : e + ""
}

function sU(t, e) {
  if (_a(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (_a(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function lU(t, e, r, n, i) {
  for (var o = (n || []).slice(), a = o.length, u = e.start, s = e.end, l = function(p) {
      var d = o[p],
        y, m = function() {
          return y === void 0 && (y = r(d, p)), y
        };
      if (p === a - 1) {
        var v = t * (d.coordinate + t * m() / 2 - s);
        o[p] = d = te(te({}, d), {}, {
          tickCoord: v > 0 ? d.coordinate - v * t : d.coordinate
        })
      } else o[p] = d = te(te({}, d), {}, {
        tickCoord: d.coordinate
      });
      var x = Mi(t, d.tickCoord, m, u, s);
      x && (s = d.tickCoord - t * (m() / 2 + i), o[p] = te(te({}, d), {}, {
        isShow: !0
      }))
    }, f = a - 1; f >= 0; f--) l(f);
  return o
}

function cU(t, e, r, n, i, o) {
  var a = (n || []).slice(),
    u = a.length,
    s = e.start,
    l = e.end;
  if (o) {
    var f = n[u - 1],
      c = r(f, u - 1),
      p = t * (f.coordinate + t * c / 2 - l);
    a[u - 1] = f = te(te({}, f), {}, {
      tickCoord: p > 0 ? f.coordinate - p * t : f.coordinate
    });
    var d = Mi(t, f.tickCoord, function() {
      return c
    }, s, l);
    d && (l = f.tickCoord - t * (c / 2 + i), a[u - 1] = te(te({}, f), {}, {
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
        a[w] = S = te(te({}, S), {}, {
          tickCoord: g < 0 ? S.coordinate - g * t : S.coordinate
        })
      } else a[w] = S = te(te({}, S), {}, {
        tickCoord: S.coordinate
      });
      var _ = Mi(t, S.tickCoord, h, s, l);
      _ && (s = S.tickCoord + t * (h() / 2 + i), a[w] = te(te({}, S), {}, {
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
  if (X(s) || se.isSsr) return XA(i, typeof s == "number" && X(s) ? s : 0);
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
      var h = (0, JA.default)(l) ? l(S.value, P) : S.value;
      return d === "width" ? KA(Xr(h, {
        fontSize: e,
        letterSpacing: r
      }), y, c) : Xr(h, {
        fontSize: e,
        letterSpacing: r
      })[d]
    },
    v = i.length >= 2 ? Zt(i[1].coordinate - i[0].coordinate) : 1,
    x = VA(o, v, d);
  return s === "equidistantPreserveStart" ? YA(v, x, m, i, a) : (s === "preserveStart" || s === "preserveStartEnd" ? p = cU(v, x, m, i, a, s === "preserveStartEnd") : p = lU(v, x, m, i, a), p.filter(function(w) {
    return w.isShow
  }))
}
var fU = ["viewBox"],
  pU = ["viewBox"],
  dU = ["ticks"];

function Ii(t) {
  "@babel/helpers - typeof";
  return Ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ii(t)
}

function Ci() {
  return Ci = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Ci.apply(this, arguments)
}

function QA(t, e) {
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
    e % 2 ? QA(Object(r), !0).forEach(function(n) {
      bd(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : QA(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function yd(t, e) {
  if (t == null) return {};
  var r = mU(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function mU(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function hU(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function t_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, r_(n.key), n)
  }
}

function yU(t, e, r) {
  return e && t_(t.prototype, e), r && t_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function vU(t, e, r) {
  return e = nl(e), gU(t, e_() ? Reflect.construct(e, r || [], nl(t).constructor) : e.apply(t, r))
}

function gU(t, e) {
  if (e && (Ii(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return bU(t)
}

function bU(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function e_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (e_ = function() {
    return !!t
  })()
}

function nl(t) {
  return nl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, nl(t)
}

function xU(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && vd(t, e)
}

function vd(t, e) {
  return vd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, vd(t, e)
}

function bd(t, e, r) {
  return e = r_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function r_(t) {
  var e = wU(t, "string");
  return Ii(e) == "symbol" ? e : e + ""
}

function wU(t, e) {
  if (Ii(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Or = function(t) {
  function e(r) {
    var n;
    return hU(this, e), n = vU(this, e, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n
  }
  return xU(e, t), yU(e, [{
    key: "shouldComponentUpdate",
    value: function(n, i) {
      var o = n.viewBox,
        a = yd(n, fU),
        u = this.props,
        s = u.viewBox,
        l = yd(u, pU);
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
        c = Ht(Ht(Ht({}, st(this.props, !1)), st(f, !1)), {}, {
          fill: "none"
        });
      if (s === "top" || s === "bottom") {
        var p = +(s === "top" && !l || s === "bottom" && l);
        c = Ht(Ht({}, c), {}, {
          x1: i,
          y1: o + p * u,
          x2: i + a,
          y2: o + p * u
        })
      } else {
        var d = +(s === "left" && !l || s === "right" && l);
        c = Ht(Ht({}, c), {}, {
          x1: i + d * a,
          y1: o,
          x2: i + d * a,
          y2: o + u
        })
      }
      return Nr.createElement("line", Ci({}, c, {
        className: ut("recharts-cartesian-axis-line", (0, gd.default)(f, "className"))
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
        d = Pa(Ht(Ht({}, this.props), {}, {
          ticks: n
        }), i, o),
        y = this.getTickTextAnchor(),
        m = this.getTickVerticalAnchor(),
        v = st(this.props, !1),
        x = st(f, !1),
        w = Ht(Ht({}, v), {}, {
          fill: "none"
        }, st(s, !1)),
        S = d.map(function(P, h) {
          var g = a.getTickLineCoord(P),
            _ = g.line,
            C = g.tick,
            k = Ht(Ht(Ht(Ht({
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
          return Nr.createElement(xt, Ci({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(P.value, "-").concat(P.coordinate, "-").concat(P.tickCoord)
          }, $r(a.props, P, h)), s && Nr.createElement("line", Ci({}, w, _, {
            className: ut("recharts-cartesian-axis-tick-line", (0, gd.default)(s, "className"))
          })), f && e.renderTickItem(f, k, "".concat((0, rl.default)(c) ? c(P.value, h) : P.value).concat(p || "")))
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
        d = yd(c, dU),
        y = p;
      return (0, rl.default)(s) && (y = p && p.length > 0 ? s(this.props) : s(d)), a <= 0 || u <= 0 || !y || !y.length ? null : Nr.createElement(xt, {
        className: ut("recharts-cartesian-axis", l),
        ref: function(v) {
          n.layerReference = v
        }
      }, o && this.renderAxisLine(), this.renderTicks(y, this.state.fontSize, this.state.letterSpacing), qt.renderCallByParent(this.props))
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, o) {
      var a, u = ut(i.className, "recharts-cartesian-axis-tick-value");
      return Nr.isValidElement(n) ? a = Nr.cloneElement(n, Ht(Ht({}, i), {}, {
        className: u
      })) : (0, rl.default)(n) ? a = n(Ht(Ht({}, i), {}, {
        className: u
      })) : a = Nr.createElement(Yr, Ci({}, i, {
        className: "recharts-cartesian-axis-tick-value"
      }), o), a
    }
  }])
}(OU);
bd(Or, "displayName", "CartesianAxis");
bd(Or, "defaultProps", {
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
var il = et(Bt());
import re from "./react-shim-eraudit.js";
var SU = ["x1", "y1", "x2", "y2", "key"],
  AU = ["offset"];

function xn(t) {
  "@babel/helpers - typeof";
  return xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, xn(t)
}

function n_(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ee(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? n_(Object(r), !0).forEach(function(n) {
      _U(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : n_(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function _U(t, e, r) {
  return e = PU(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function PU(t) {
  var e = TU(t, "string");
  return xn(e) == "symbol" ? e : e + ""
}

function TU(t, e) {
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

function i_(t, e) {
  if (t == null) return {};
  var r = EU(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function EU(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}
var jU = function(e) {
  var r = e.fill;
  if (!r || r === "none") return null;
  var n = e.fillOpacity,
    i = e.x,
    o = e.y,
    a = e.width,
    u = e.height,
    s = e.ry;
  return re.createElement("rect", {
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

function o_(t, e) {
  var r;
  if (re.isValidElement(t)) r = re.cloneElement(t, e);
  else if ((0, il.default)(t)) r = t(e);
  else {
    var n = e.x1,
      i = e.y1,
      o = e.x2,
      a = e.y2,
      u = e.key,
      s = i_(e, SU),
      l = st(s, !1),
      f = l.offset,
      c = i_(l, AU);
    r = re.createElement("line", bn({}, c, {
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

function MU(t) {
  var e = t.x,
    r = t.width,
    n = t.horizontal,
    i = n === void 0 ? !0 : n,
    o = t.horizontalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = ee(ee({}, t), {}, {
      x1: e,
      y1: u,
      x2: e + r,
      y2: u,
      key: "line-".concat(s),
      index: s
    });
    return o_(i, l)
  });
  return re.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, a)
}

function CU(t) {
  var e = t.y,
    r = t.height,
    n = t.vertical,
    i = n === void 0 ? !0 : n,
    o = t.verticalPoints;
  if (!i || !o || !o.length) return null;
  var a = o.map(function(u, s) {
    var l = ee(ee({}, t), {}, {
      x1: u,
      y1: e,
      x2: u,
      y2: e + r,
      key: "line-".concat(s),
      index: s
    });
    return o_(i, l)
  });
  return re.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, a)
}

function IU(t) {
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
    return re.createElement("rect", {
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
  return re.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, c)
}

function kU(t) {
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
    return re.createElement("rect", {
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
  return re.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, c)
}
var DU = function(e, r) {
    var n = e.xAxis,
      i = e.width,
      o = e.height,
      a = e.offset;
    return wp(Pa(ee(ee(ee({}, Or.defaultProps), n), {}, {
      ticks: Oe(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.left, a.left + a.width, r)
  },
  NU = function(e, r) {
    var n = e.yAxis,
      i = e.width,
      o = e.height,
      a = e.offset;
    return wp(Pa(ee(ee(ee({}, Or.defaultProps), n), {}, {
      ticks: Oe(n, !0),
      viewBox: {
        x: 0,
        y: 0,
        width: i,
        height: o
      }
    })), a.top, a.top + a.height, r)
  },
  ki = {
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
  var e, r, n, i, o, a, u = Ai(),
    s = _i(),
    l = PA(),
    f = ee(ee({}, t), {}, {
      stroke: (e = t.stroke) !== null && e !== void 0 ? e : ki.stroke,
      fill: (r = t.fill) !== null && r !== void 0 ? r : ki.fill,
      horizontal: (n = t.horizontal) !== null && n !== void 0 ? n : ki.horizontal,
      horizontalFill: (i = t.horizontalFill) !== null && i !== void 0 ? i : ki.horizontalFill,
      vertical: (o = t.vertical) !== null && o !== void 0 ? o : ki.vertical,
      verticalFill: (a = t.verticalFill) !== null && a !== void 0 ? a : ki.verticalFill,
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
    w = SA(),
    S = AA();
  if (!X(d) || d <= 0 || !X(y) || y <= 0 || !X(c) || c !== +c || !X(p) || p !== +p) return null;
  var P = f.verticalCoordinatesGenerator || DU,
    h = f.horizontalCoordinatesGenerator || NU,
    g = f.horizontalPoints,
    _ = f.verticalPoints;
  if ((!g || !g.length) && (0, il.default)(h)) {
    var C = v && v.length,
      k = h({
        yAxis: S ? ee(ee({}, S), {}, {
          ticks: C ? v : S.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, C ? !0 : m);
    ue(Array.isArray(k), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(xn(k), "]")), Array.isArray(k) && (g = k)
  }
  if ((!_ || !_.length) && (0, il.default)(P)) {
    var B = x && x.length,
      W = P({
        xAxis: w ? ee(ee({}, w), {}, {
          ticks: B ? x : w.ticks
        }) : void 0,
        width: u,
        height: s,
        offset: l
      }, B ? !0 : m);
    ue(Array.isArray(W), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(xn(W), "]")), Array.isArray(W) && (_ = W)
  }
  return re.createElement("g", {
    className: "recharts-cartesian-grid"
  }, re.createElement(jU, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), re.createElement(MU, bn({}, f, {
    offset: l,
    horizontalPoints: g,
    xAxis: w,
    yAxis: S
  })), re.createElement(CU, bn({}, f, {
    offset: l,
    verticalPoints: _,
    xAxis: w,
    yAxis: S
  })), re.createElement(IU, bn({}, f, {
    horizontalPoints: g
  })), re.createElement(kU, bn({}, f, {
    verticalPoints: _
  })))
}
Ta.displayName = "CartesianGrid";
import ye, {
  PureComponent as YU
} from "./react-shim-eraudit.js";
var f_ = et(Bt()),
  al = et(Pe()),
  p_ = et(Ro());
var RU = ["type", "layout", "connectNulls", "ref"],
  LU = ["key"];

function Ni(t) {
  "@babel/helpers - typeof";
  return Ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ni(t)
}

function a_(t, e) {
  if (t == null) return {};
  var r = BU(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function BU(t, e) {
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

function u_(t, e) {
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
    e % 2 ? u_(Object(r), !0).forEach(function(n) {
      Ve(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : u_(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function Di(t) {
  return FU(t) || zU(t) || WU(t) || qU()
}

function qU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function WU(t, e) {
  if (t) {
    if (typeof t == "string") return xd(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return xd(t, e)
  }
}

function zU(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function FU(t) {
  if (Array.isArray(t)) return xd(t)
}

function xd(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function $U(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function s_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, c_(n.key), n)
  }
}

function UU(t, e, r) {
  return e && s_(t.prototype, e), r && s_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function HU(t, e, r) {
  return e = ol(e), GU(t, l_() ? Reflect.construct(e, r || [], ol(t).constructor) : e.apply(t, r))
}

function GU(t, e) {
  if (e && (Ni(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return KU(t)
}

function KU(t) {
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

function ol(t) {
  return ol = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ol(t)
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
  }), e && wd(t, e)
}

function wd(t, e) {
  return wd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, wd(t, e)
}

function Ve(t, e, r) {
  return e = c_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function c_(t) {
  var e = XU(t, "string");
  return Ni(e) == "symbol" ? e : e + ""
}

function XU(t, e) {
  if (Ni(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var Rr = function(t) {
  function e() {
    var r;
    $U(this, e);
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
    return r = HU(this, e, [].concat(i)), Ve(r, "state", {
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
          d = [].concat(Di(s.slice(0, y)), [c - m]);
          break
        } var v = d.length % 2 === 0 ? [0, p] : [p];
      return [].concat(Di(e.repeat(s, f)), Di(d), v).map(function(x) {
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
  return VU(e, t), UU(e, [{
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
        c = Ft(f, Ir);
      if (!c) return null;
      var p = function(m, v) {
          return {
            x: m.x,
            y: m.y,
            value: m.value,
            errorVal: Xt(m.payload, v)
          }
        },
        d = {
          clipPath: n ? "url(#clipPath-".concat(i, ")") : null
        };
      return ye.createElement(xt, d, c.map(function(y) {
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
      return ye.createElement(xt, Ea({
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
        p = a_(u, RU),
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
            _ = u.map(function(N, H) {
              var F = Math.floor(H * g);
              if (w[F]) {
                var z = w[F],
                  b = ve(z.x, N.x),
                  O = ve(z.y, N.y);
                return Ae(Ae({}, N), {}, {
                  x: b(h),
                  y: O(h)
                })
              }
              if (y) {
                var T = ve(m * 2, N.x),
                  A = ve(v / 2, N.y);
                return Ae(Ae({}, N), {}, {
                  x: T(h),
                  y: A(h)
                })
              }
              return Ae(Ae({}, N), {}, {
                x: N.x,
                y: N.y
              })
            });
          return o.renderCurveStatically(_, n, i)
        }
        var C = ve(0, S),
          k = C(h),
          B;
        if (s) {
          var W = "".concat(s).split(/[,\s]+/gim).map(function(N) {
            return parseFloat(N)
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
      return u && a && a.length && (!l && f > 0 || !(0, p_.default)(l, a)) ? this.renderCurveWithAnimation(n, i) : this.renderCurveStatically(a, n, i)
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
        _ = (0, al.default)(v) ? this.id : v,
        C = (n = st(a, !1)) !== null && n !== void 0 ? n : {
          r: 3,
          strokeWidth: 2
        },
        k = C.r,
        B = k === void 0 ? 3 : k,
        W = C.strokeWidth,
        N = W === void 0 ? 2 : W,
        H = $h(a) ? a : {},
        F = H.clipDot,
        z = F === void 0 ? !0 : F,
        b = B * 2 + N;
      return ye.createElement(xt, {
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
      for (var o = n.length % 2 !== 0 ? [].concat(Di(n), [0]) : n, a = [], u = 0; u < i; ++u) a = [].concat(Di(a), Di(o));
      return a
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var o;
      if (ye.isValidElement(n)) o = ye.cloneElement(n, i);
      else if ((0, f_.default)(n)) o = n(i);
      else {
        var a = i.key,
          u = a_(i, LU),
          s = ut("recharts-line-dot", typeof n != "boolean" ? n.className : "");
        o = ye.createElement(bi, Ea({
          key: a
        }, u, {
          className: s
        }))
      }
      return o
    }
  }])
}(YU);
Ve(Rr, "displayName", "Line");
Ve(Rr, "defaultProps", {
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
Ve(Rr, "getComposedData", function(t) {
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
      var y = Xt(p, a);
      return f === "horizontal" ? {
        x: Op({
          axis: r,
          ticks: i,
          bandSize: u,
          entry: p,
          index: d
        }),
        y: (0, al.default)(y) ? null : n.scale(y),
        value: y,
        payload: p
      } : {
        x: (0, al.default)(y) ? null : r.scale(y),
        y: Op({
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

function Ri(t) {
  "@babel/helpers - typeof";
  return Ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ri(t)
}

function ZU(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function d_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, y_(n.key), n)
  }
}

function JU(t, e, r) {
  return e && d_(t.prototype, e), r && d_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function QU(t, e, r) {
  return e = ul(e), t5(t, m_() ? Reflect.construct(e, r || [], ul(t).constructor) : e.apply(t, r))
}

function t5(t, e) {
  if (e && (Ri(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return e5(t)
}

function e5(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function m_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (m_ = function() {
    return !!t
  })()
}

function ul(t) {
  return ul = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, ul(t)
}

function r5(t, e) {
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

function h_(t, e, r) {
  return e = y_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function y_(t) {
  var e = n5(t, "string");
  return Ri(e) == "symbol" ? e : e + ""
}

function n5(t, e) {
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

function i5(t) {
  var e = t.xAxisId,
    r = Ai(),
    n = _i(),
    i = Ks(e);
  return i == null ? null : ja.createElement(Or, Sd({}, i, {
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
    return ZU(this, e), QU(this, e, arguments)
  }
  return r5(e, t), JU(e, [{
    key: "render",
    value: function() {
      return ja.createElement(i5, this.props)
    }
  }])
}(ja.Component);
h_(cr, "displayName", "XAxis");
h_(cr, "defaultProps", {
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

function Li(t) {
  "@babel/helpers - typeof";
  return Li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Li(t)
}

function o5(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function v_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, x_(n.key), n)
  }
}

function a5(t, e, r) {
  return e && v_(t.prototype, e), r && v_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function u5(t, e, r) {
  return e = sl(e), s5(t, g_() ? Reflect.construct(e, r || [], sl(t).constructor) : e.apply(t, r))
}

function s5(t, e) {
  if (e && (Li(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return l5(t)
}

function l5(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function g_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (g_ = function() {
    return !!t
  })()
}

function sl(t) {
  return sl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, sl(t)
}

function c5(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Ad(t, e)
}

function Ad(t, e) {
  return Ad = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, Ad(t, e)
}

function b_(t, e, r) {
  return e = x_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function x_(t) {
  var e = f5(t, "string");
  return Li(e) == "symbol" ? e : e + ""
}

function f5(t, e) {
  if (Li(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function _d() {
  return _d = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, _d.apply(this, arguments)
}
var p5 = function(e) {
    var r = e.yAxisId,
      n = Ai(),
      i = _i(),
      o = Vs(r);
    return o == null ? null : Ma.createElement(Or, _d({}, o, {
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
      return o5(this, e), u5(this, e, arguments)
    }
    return c5(e, t), a5(e, [{
      key: "render",
      value: function() {
        return Ma.createElement(p5, this.props)
      }
    }])
  }(Ma.Component);
b_(fr, "displayName", "YAxis");
b_(fr, "defaultProps", {
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
var qi = et(Pe()),
  Ye = et(Bt()),
  vl = et(Zp()),
  Wi = et(zr()),
  $_ = et(Au()),
  U_ = et(yf());
import Le, {
  Component as U5,
  cloneElement as Xe,
  isValidElement as H5,
  forwardRef as G5
} from "./react-shim-eraudit.js";

function w_(t) {
  return y5(t) || h5(t) || m5(t) || d5()
}

function d5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function m5(t, e) {
  if (t) {
    if (typeof t == "string") return Pd(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Pd(t, e)
  }
}

function h5(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function y5(t) {
  if (Array.isArray(t)) return Pd(t)
}

function Pd(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}
var ll = function(e, r, n, i, o) {
  var a = Ft(e, Ys),
    u = Ft(e, Oa),
    s = [].concat(w_(a), w_(u)),
    l = Ft(e, Aa),
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
var A_ = et(S_()),
  fl = new A_.default;
var pl = "recharts.syncMouseEvents";

function Ia(t) {
  "@babel/helpers - typeof";
  return Ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, Ia(t)
}

function b5(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function __(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, P_(n.key), n)
  }
}

function x5(t, e, r) {
  return e && __(t.prototype, e), r && __(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function Ed(t, e, r) {
  return e = P_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function P_(t) {
  var e = w5(t, "string");
  return Ia(e) == "symbol" ? e : e + ""
}

function w5(t, e) {
  if (Ia(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (Ia(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var T_ = function() {
  function t() {
    b5(this, t), Ed(this, "activeIndex", 0), Ed(this, "coordinateList", []), Ed(this, "layout", "horizontal")
  }
  return x5(t, [{
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

function E_(t, e, r) {
  if (r === "number" && e === !0 && Array.isArray(t)) {
    var n = t?.[0],
      i = t?.[1];
    if (n && i && X(n) && X(i)) return !0
  }
  return !1
}
import {
  cloneElement as _5,
  createElement as P5,
  isValidElement as T5
} from "./react-shim-eraudit.js";

function j_(t, e, r, n) {
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

function dl(t) {
  var e = t.cx,
    r = t.cy,
    n = t.radius,
    i = t.startAngle,
    o = t.endAngle,
    a = Rt(e, r, n, i),
    u = Rt(e, r, n, o);
  return {
    points: [a, u],
    cx: e,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: o
  }
}

function M_(t, e, r) {
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
        p = Rt(u, s, l, c),
        d = Rt(u, s, f, c);
      n = p.x, i = p.y, o = d.x, a = d.y
    } else return dl(e);
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

function C_(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function ml(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? C_(Object(r), !0).forEach(function(n) {
      O5(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : C_(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function O5(t, e, r) {
  return e = S5(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function S5(t) {
  var e = A5(t, "string");
  return ka(e) == "symbol" ? e : e + ""
}

function A5(t, e) {
  if (ka(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (ka(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}

function I_(t) {
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
  if (p === "ScatterChart") y = a, m = $O;
  else if (p === "BarChart") y = j_(c, a, s, f), m = gi;
  else if (c === "radial") {
    var v = dl(a),
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
    }, m = Es
  } else y = {
    points: M_(c, a, s)
  }, m = ia;
  var g = ml(ml(ml(ml({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), y), st(d, !1)), {}, {
    payload: u,
    payloadIndex: l,
    className: ut("recharts-tooltip-cursor", d.className)
  });
  return T5(d) ? _5(d, g) : P5(m, g)
}
var E5 = ["item"],
  j5 = ["children", "className", "width", "height", "style", "compact", "title", "desc"];

function zi(t) {
  "@babel/helpers - typeof";
  return zi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  }, zi(t)
}

function Bi() {
  return Bi = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
    return t
  }, Bi.apply(this, arguments)
}

function k_(t, e) {
  return I5(t) || C5(t, e) || z_(t, e) || M5()
}

function M5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function C5(t, e) {
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

function I5(t) {
  if (Array.isArray(t)) return t
}

function D_(t, e) {
  if (t == null) return {};
  var r = k5(t, e),
    n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n])
  }
  return r
}

function k5(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n]
    } return r
}

function D5(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function N_(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, F_(n.key), n)
  }
}

function N5(t, e, r) {
  return e && N_(t.prototype, e), r && N_(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function R5(t, e, r) {
  return e = yl(e), L5(t, W_() ? Reflect.construct(e, r || [], yl(t).constructor) : e.apply(t, r))
}

function L5(t, e) {
  if (e && (zi(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return B5(t)
}

function B5(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function W_() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
  } catch {}
  return (W_ = function() {
    return !!t
  })()
}

function yl(t) {
  return yl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r)
  }, yl(t)
}

function q5(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && jd(t, e)
}

function jd(t, e) {
  return jd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n
  }, jd(t, e)
}

function Fi(t) {
  return F5(t) || z5(t) || z_(t) || W5()
}

function W5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}

function z_(t, e) {
  if (t) {
    if (typeof t == "string") return Md(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Md(t, e)
  }
}

function z5(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
}

function F5(t) {
  if (Array.isArray(t)) return Md(t)
}

function Md(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n
}

function R_(t, e) {
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
    e % 2 ? R_(Object(r), !0).forEach(function(n) {
      ft(t, n, r[n])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : R_(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
    })
  }
  return t
}

function ft(t, e, r) {
  return e = F_(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}

function F_(t) {
  var e = $5(t, "string");
  return zi(e) == "symbol" ? e : e + ""
}

function $5(t, e) {
  if (zi(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (zi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return (e === "string" ? String : Number)(t)
}
var K5 = {
    xAxis: ["bottom", "top"],
    yAxis: ["left", "right"]
  },
  V5 = {
    width: "100%",
    height: "100%"
  },
  H_ = {
    x: 0,
    y: 0
  };

function hl(t) {
  return t
}
var X5 = function(e, r) {
    return r === "horizontal" ? e.x : r === "vertical" ? e.y : r === "centric" ? e.angle : e.radius
  },
  Y5 = function(e, r, n, i) {
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
        return U(U(U({}, i), Rt(i.cx, i.cy, u, a)), {}, {
          angle: a,
          radius: u
        })
      }
      var s = o.coordinate,
        l = i.angle;
      return U(U(U({}, i), Rt(i.cx, i.cy, s, l)), {}, {
        angle: l,
        radius: s
      })
    }
    return H_
  },
  gl = function(e, r) {
    var n = r.graphicalItems,
      i = r.dataStartIndex,
      o = r.dataEndIndex,
      a = (n ?? []).reduce(function(u, s) {
        var l = s.props.data;
        return l && l.length ? [].concat(Fi(u), Fi(l)) : u
      }, []);
    return a.length > 0 ? a : e && e.length && X(i) && X(o) ? e.slice(i, o + 1) : []
  };

function G_(t) {
  return t === "number" ? [0, "auto"] : void 0
}
var Cd = function(e, r, n, i) {
    var o = e.graphicalItems,
      a = e.tooltipAxis,
      u = gl(r, e);
    return n < 0 || !o || !o.length || n >= u.length ? null : o.reduce(function(s, l) {
      var f, c = (f = l.props.data) !== null && f !== void 0 ? f : r;
      c && e.dataStartIndex + e.dataEndIndex !== 0 && e.dataEndIndex - e.dataStartIndex >= n && (c = c.slice(e.dataStartIndex, e.dataEndIndex + 1));
      var p;
      if (a.dataKey && !a.allowDuplicatedCategory) {
        var d = c === void 0 ? u : c;
        p = En(d, a.dataKey, i)
      } else p = c && c[n] || u[n];
      return p ? [].concat(Fi(s), [Ss(l, p)]) : s
    }, [])
  },
  L_ = function(e, r, n, i) {
    var o = i || {
        x: e.chartX,
        y: e.chartY
      },
      a = X5(o, n),
      u = e.orderedTooltipTicks,
      s = e.tooltipAxis,
      l = e.tooltipTicks,
      f = x1(a, u, l, s);
    if (f >= 0 && l) {
      var c = l[f] && l[f].value,
        p = Cd(e, r, f, c),
        d = Y5(n, u, f, o);
      return {
        activeTooltipIndex: f,
        activeLabel: c,
        activePayload: p,
        activeCoordinate: d
      }
    }
    return null
  },
  Z5 = function(e, r) {
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
      d = xp(f, o);
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
      var B = gl(e.data, {
          graphicalItems: i.filter(function(D) {
            var L, G = a in D.props ? D.props[a] : (L = D.type.defaultProps) === null || L === void 0 ? void 0 : L[a];
            return G === k
          }),
          dataStartIndex: s,
          dataEndIndex: l
        }),
        W = B.length,
        N, H, F;
      E_(x.domain, P, w) && (N = Os(x.domain, null, P), d && (w === "number" || g !== "auto") && (F = di(B, S, "category")));
      var z = G_(w);
      if (!N || N.length === 0) {
        var b, O = (b = x.domain) !== null && b !== void 0 ? b : z;
        if (S) {
          if (N = di(B, S, w), w === "category" && d) {
            var T = Ch(N);
            h && T ? (H = N, N = (0, vl.default)(0, W)) : h || (N = _p(O, N, m).reduce(function(D, L) {
              return D.indexOf(L) >= 0 ? D : [].concat(Fi(D), [L])
            }, []))
          } else if (w === "category") h ? N = N.filter(function(D) {
            return D !== "" && !(0, qi.default)(D)
          }) : N = _p(O, N, m).reduce(function(D, L) {
            return D.indexOf(L) >= 0 || L === "" || (0, qi.default)(L) ? D : [].concat(Fi(D), [L])
          }, []);
          else if (w === "number") {
            var A = _1(B, i.filter(function(D) {
              var L, G, Z = a in D.props ? D.props[a] : (L = D.type.defaultProps) === null || L === void 0 ? void 0 : L[a],
                J = "hide" in D.props ? D.props.hide : (G = D.type.defaultProps) === null || G === void 0 ? void 0 : G.hide;
              return Z === k && (C || !J)
            }), S, o, f);
            A && (N = A)
          }
          d && (w === "number" || g !== "auto") && (F = di(B, S, "category"))
        } else d ? N = (0, vl.default)(0, W) : u && u[k] && u[k].hasStack && w === "number" ? N = p === "expand" ? [0, 1] : Ap(u[k].stackGroups, s, l) : N = bp(B, i.filter(function(D) {
          var L = a in D.props ? D.props[a] : D.type.defaultProps[a],
            G = "hide" in D.props ? D.props.hide : D.type.defaultProps.hide;
          return L === k && (C || !G)
        }), w, f, !0);
        if (w === "number") N = ll(c, N, k, o, _), O && (N = Os(O, N, P));
        else if (w === "category" && O) {
          var j = O,
            E = N.every(function(D) {
              return j.indexOf(D) >= 0
            });
          E && (N = j)
        }
      }
      return U(U({}, y), {}, ft({}, k, U(U({}, x), {}, {
        axisType: o,
        domain: N,
        categoricalDomain: F,
        duplicateDomain: H,
        originalDomain: (v = x.domain) !== null && v !== void 0 ? v : z,
        isCategorical: d,
        layout: f
      })))
    }, {})
  },
  J5 = function(e, r) {
    var n = r.graphicalItems,
      i = r.Axis,
      o = r.axisType,
      a = r.axisIdKey,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = e.layout,
      c = e.children,
      p = gl(e.data, {
        graphicalItems: n,
        dataStartIndex: s,
        dataEndIndex: l
      }),
      d = p.length,
      y = xp(f, o),
      m = -1;
    return n.reduce(function(v, x) {
      var w = x.type.defaultProps !== void 0 ? U(U({}, x.type.defaultProps), x.props) : x.props,
        S = w[a],
        P = G_("number");
      if (!v[S]) {
        m++;
        var h;
        return y ? h = (0, vl.default)(0, d) : u && u[S] && u[S].hasStack ? (h = Ap(u[S].stackGroups, s, l), h = ll(c, h, S, o)) : (h = Os(P, bp(p, n.filter(function(g) {
          var _, C, k = a in g.props ? g.props[a] : (_ = g.type.defaultProps) === null || _ === void 0 ? void 0 : _[a],
            B = "hide" in g.props ? g.props.hide : (C = g.type.defaultProps) === null || C === void 0 ? void 0 : C.hide;
          return k === S && !B
        }), "number", f), i.defaultProps.allowDataOverflow), h = ll(c, h, S, o)), U(U({}, v), {}, ft({}, S, U(U({
          axisType: o
        }, i.defaultProps), {}, {
          hide: !0,
          orientation: (0, Wi.default)(K5, "".concat(o, ".").concat(m % 2), null),
          domain: h,
          originalDomain: P,
          isCategorical: y,
          layout: f
        })))
      }
      return v
    }, {})
  },
  Q5 = function(e, r) {
    var n = r.axisType,
      i = n === void 0 ? "xAxis" : n,
      o = r.AxisComp,
      a = r.graphicalItems,
      u = r.stackGroups,
      s = r.dataStartIndex,
      l = r.dataEndIndex,
      f = e.children,
      c = "".concat(i, "Id"),
      p = Ft(f, o),
      d = {};
    return p && p.length ? d = Z5(e, {
      axes: p,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    }) : a && a.length && (d = J5(e, {
      Axis: o,
      graphicalItems: a,
      axisType: i,
      axisIdKey: c,
      stackGroups: u,
      dataStartIndex: s,
      dataEndIndex: l
    })), d
  },
  t4 = function(e) {
    var r = tr(e),
      n = Oe(r, !1, !0);
    return {
      tooltipTicks: n,
      orderedTooltipTicks: (0, $_.default)(n, function(i) {
        return i.coordinate
      }),
      tooltipAxis: r,
      tooltipAxisBandSize: mi(r, n)
    }
  },
  B_ = function(e) {
    var r = e.children,
      n = e.defaultShowTooltip,
      i = Jt(r, yn),
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
  e4 = function(e) {
    return !e || !e.length ? !1 : e.some(function(r) {
      var n = Ee(r && r.type);
      return n && n.indexOf("Bar") >= 0
    })
  },
  q_ = function(e) {
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
  r4 = function(e, r) {
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
      d = Jt(c, yn),
      y = Jt(c, ke),
      m = Object.keys(s).reduce(function(h, g) {
        var _ = s[g],
          C = _.orientation;
        return !_.mirror && !_.hide ? U(U({}, h), {}, ft({}, C, h[C] + _.width)) : h
      }, {
        left: p.left || 0,
        right: p.right || 0
      }),
      v = Object.keys(a).reduce(function(h, g) {
        var _ = a[g],
          C = _.orientation;
        return !_.mirror && !_.hide ? U(U({}, h), {}, ft({}, C, (0, Wi.default)(h, "".concat(C)) + _.height)) : h
      }, {
        top: p.top || 0,
        bottom: p.bottom || 0
      }),
      x = U(U({}, v), m),
      w = x.bottom;
    d && (x.bottom += d.props.height || yn.defaultProps.height), y && r && (x = S1(x, i, n, r));
    var S = l - x.left - x.right,
      P = f - x.top - x.bottom;
    return U(U({
      brushBottom: w
    }, x), {}, {
      width: Math.max(S, 0),
      height: Math.max(P, 0)
    })
  },
  n4 = function(e, r) {
    if (r === "xAxis") return e[r].width;
    if (r === "yAxis") return e[r].height
  },
  bl = function(e) {
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
          N = x.barCategoryGap,
          H = x.maxBarSize,
          F = q_(B),
          z = F.numericAxisName,
          b = F.cateAxisName,
          O = e4(S),
          T = [];
        return S.forEach(function(A, j) {
          var E = gl(x.data, {
              graphicalItems: [A],
              dataStartIndex: _,
              dataEndIndex: C
            }),
            D = A.type.defaultProps !== void 0 ? U(U({}, A.type.defaultProps), A.props) : A.props,
            L = D.dataKey,
            G = D.maxBarSize,
            Z = D["".concat(z, "Id")],
            J = D["".concat(b, "Id")],
            it = {},
            gt = s.reduce(function(oe, qe) {
              var R, rt, at = w["".concat(qe.axisType, "Map")],
                mt = D["".concat(qe.axisType, "Id")];
              at && at[mt] || qe.axisType === "zAxis" || Ue(!1);
              var yt = at[mt];
              return U(U({}, oe), {}, ft(ft({}, qe.axisType, yt), "".concat(qe.axisType, "Ticks"), Oe(yt)))
            }, it),
            K = gt[b],
            ct = gt["".concat(b, "Ticks")],
            tt = P && P[Z] && P[Z].hasStack && k1(A, P[Z].stackGroups),
            $ = Ee(A.type).indexOf("Bar") >= 0,
            St = mi(K, ct),
            Q = [],
            bt = O && w1({
              barSize: k,
              stackGroups: P,
              totalSize: n4(gt, b)
            });
          if ($) {
            var Et, Lt, pe = (0, qi.default)(G) ? H : G,
              V = (Et = (Lt = mi(K, ct, !0)) !== null && Lt !== void 0 ? Lt : pe) !== null && Et !== void 0 ? Et : 0;
            Q = O1({
              barGap: W,
              barCategoryGap: N,
              bandSize: V !== St ? V : St,
              sizeList: bt[J],
              maxBarSize: pe
            }), V !== St && (Q = Q.map(function(oe) {
              return U(U({}, oe), {}, {
                position: U(U({}, oe.position), {}, {
                  offset: oe.position.offset - V / 2
                })
              })
            }))
          }
          var ie = A && A.type && A.type.getComposedData;
          ie && T.push({
            props: U(U({}, ie(U(U({}, gt), {}, {
              displayedData: E,
              props: x,
              dataKey: L,
              item: A,
              bandSize: St,
              barPosition: Q,
              offset: h,
              stackedData: tt,
              layout: B,
              dataStartIndex: _,
              dataEndIndex: C
            }))), {}, ft(ft(ft({
              key: A.key || "item-".concat(j)
            }, z, gt[z]), b, gt[b]), "animationId", g)),
            childIndex: Hh(A, x.children),
            item: A
          })
        }), T
      },
      d = function(x, w) {
        var S = x.props,
          P = x.dataStartIndex,
          h = x.dataEndIndex,
          g = x.updateId;
        if (!Ul({
            props: S
          })) return null;
        var _ = S.children,
          C = S.layout,
          k = S.stackOffset,
          B = S.data,
          W = S.reverseStackOrder,
          N = q_(C),
          H = N.numericAxisName,
          F = N.cateAxisName,
          z = Ft(_, n),
          b = M1(B, z, "".concat(H, "Id"), "".concat(F, "Id"), k, W),
          O = s.reduce(function(D, L) {
            var G = "".concat(L.axisType, "Map");
            return U(U({}, D), {}, ft({}, G, Q5(S, U(U({}, L), {}, {
              graphicalItems: z,
              stackGroups: L.axisType === H && b,
              dataStartIndex: P,
              dataEndIndex: h
            }))))
          }, {}),
          T = r4(U(U({}, O), {}, {
            props: S,
            graphicalItems: z
          }), w?.legendBBox);
        Object.keys(O).forEach(function(D) {
          O[D] = f(S, O[D], T, D.replace("Map", ""), r)
        });
        var A = O["".concat(F, "Map")],
          j = t4(A),
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
          return D5(this, x), h = R5(this, x, [w]), ft(h, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), ft(h, "accessibilityManager", new T_), ft(h, "handleLegendBBoxUpdate", function(g) {
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
          }), ft(h, "handleReceiveSyncEvent", function(g, _, C) {
            if (h.props.syncId === g) {
              if (C === h.eventEmitterSymbol && typeof h.props.syncMethod != "function") return;
              h.applySyncEvent(_)
            }
          }), ft(h, "handleBrushChange", function(g) {
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
          }), ft(h, "handleMouseEnter", function(g) {
            var _ = h.getMouseInfo(g);
            if (_) {
              var C = U(U({}, _), {}, {
                isTooltipActive: !0
              });
              h.setState(C), h.triggerSyncEvent(C);
              var k = h.props.onMouseEnter;
              (0, Ye.default)(k) && k(C, g)
            }
          }), ft(h, "triggeredAfterMouseMove", function(g) {
            var _ = h.getMouseInfo(g),
              C = _ ? U(U({}, _), {}, {
                isTooltipActive: !0
              }) : {
                isTooltipActive: !1
              };
            h.setState(C), h.triggerSyncEvent(C);
            var k = h.props.onMouseMove;
            (0, Ye.default)(k) && k(C, g)
          }), ft(h, "handleItemMouseEnter", function(g) {
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
          }), ft(h, "handleItemMouseLeave", function() {
            h.setState(function() {
              return {
                isTooltipActive: !1
              }
            })
          }), ft(h, "handleMouseMove", function(g) {
            g.persist(), h.throttleTriggeredAfterMouseMove(g)
          }), ft(h, "handleMouseLeave", function(g) {
            h.throttleTriggeredAfterMouseMove.cancel();
            var _ = {
              isTooltipActive: !1
            };
            h.setState(_), h.triggerSyncEvent(_);
            var C = h.props.onMouseLeave;
            (0, Ye.default)(C) && C(_, g)
          }), ft(h, "handleOuterEvent", function(g) {
            var _ = Uh(g),
              C = (0, Wi.default)(h.props, "".concat(_));
            if (_ && (0, Ye.default)(C)) {
              var k, B;
              /.*touch.*/i.test(_) ? B = h.getMouseInfo(g.changedTouches[0]) : B = h.getMouseInfo(g), C((k = B) !== null && k !== void 0 ? k : {}, g)
            }
          }), ft(h, "handleClick", function(g) {
            var _ = h.getMouseInfo(g);
            if (_) {
              var C = U(U({}, _), {}, {
                isTooltipActive: !0
              });
              h.setState(C), h.triggerSyncEvent(C);
              var k = h.props.onClick;
              (0, Ye.default)(k) && k(C, g)
            }
          }), ft(h, "handleMouseDown", function(g) {
            var _ = h.props.onMouseDown;
            if ((0, Ye.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ft(h, "handleMouseUp", function(g) {
            var _ = h.props.onMouseUp;
            if ((0, Ye.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ft(h, "handleTouchMove", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.throttleTriggeredAfterMouseMove(g.changedTouches[0])
          }), ft(h, "handleTouchStart", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.handleMouseDown(g.changedTouches[0])
          }), ft(h, "handleTouchEnd", function(g) {
            g.changedTouches != null && g.changedTouches.length > 0 && h.handleMouseUp(g.changedTouches[0])
          }), ft(h, "handleDoubleClick", function(g) {
            var _ = h.props.onDoubleClick;
            if ((0, Ye.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ft(h, "handleContextMenu", function(g) {
            var _ = h.props.onContextMenu;
            if ((0, Ye.default)(_)) {
              var C = h.getMouseInfo(g);
              _(C, g)
            }
          }), ft(h, "triggerSyncEvent", function(g) {
            h.props.syncId !== void 0 && fl.emit(pl, h.props.syncId, g, h.eventEmitterSymbol)
          }), ft(h, "applySyncEvent", function(g) {
            var _ = h.props,
              C = _.layout,
              k = _.syncMethod,
              B = h.state.updateId,
              W = g.dataStartIndex,
              N = g.dataEndIndex;
            if (g.dataStartIndex !== void 0 || g.dataEndIndex !== void 0) h.setState(U({
              dataStartIndex: W,
              dataEndIndex: N
            }, d({
              props: h.props,
              dataStartIndex: W,
              dataEndIndex: N,
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
                G = Cd(h.state, h.props.data, z),
                Z = T[z] ? {
                  x: C === "horizontal" ? T[z].coordinate : E,
                  y: C === "horizontal" ? D : T[z].coordinate
                } : H_;
              h.setState(U(U({}, g), {}, {
                activeLabel: L,
                activeCoordinate: Z,
                activePayload: G,
                activeTooltipIndex: z
              }))
            } else h.setState(g)
          }), ft(h, "renderCursor", function(g) {
            var _, C = h.state,
              k = C.isTooltipActive,
              B = C.activeCoordinate,
              W = C.activePayload,
              N = C.offset,
              H = C.activeTooltipIndex,
              F = C.tooltipAxisBandSize,
              z = h.getTooltipEventType(),
              b = (_ = g.props.active) !== null && _ !== void 0 ? _ : k,
              O = h.props.layout,
              T = g.key || "_recharts-cursor";
            return Le.createElement(I_, {
              key: T,
              activeCoordinate: B,
              activePayload: W,
              activeTooltipIndex: H,
              chartName: r,
              element: g,
              isActive: b,
              layout: O,
              offset: N,
              tooltipAxisBandSize: F,
              tooltipEventType: z
            })
          }), ft(h, "renderPolarAxis", function(g, _, C) {
            var k = (0, Wi.default)(g, "type.axisType"),
              B = (0, Wi.default)(h.state, "".concat(k, "Map")),
              W = g.type.defaultProps,
              N = W !== void 0 ? U(U({}, W), g.props) : g.props,
              H = B && B[N["".concat(k, "Id")]];
            return Xe(g, U(U({}, H), {}, {
              className: ut(k, H.className),
              key: g.key || "".concat(_, "-").concat(C),
              ticks: Oe(H, !0)
            }))
          }), ft(h, "renderPolarGrid", function(g) {
            var _ = g.props,
              C = _.radialLines,
              k = _.polarAngles,
              B = _.polarRadius,
              W = h.state,
              N = W.radiusAxisMap,
              H = W.angleAxisMap,
              F = tr(N),
              z = tr(H),
              b = z.cx,
              O = z.cy,
              T = z.innerRadius,
              A = z.outerRadius;
            return Xe(g, {
              polarAngles: Array.isArray(k) ? k : Oe(z, !0).map(function(j) {
                return j.coordinate
              }),
              polarRadius: Array.isArray(B) ? B : Oe(F, !0).map(function(j) {
                return j.coordinate
              }),
              cx: b,
              cy: O,
              innerRadius: T,
              outerRadius: A,
              key: g.key || "polar-grid",
              radialLines: C
            })
          }), ft(h, "renderLegend", function() {
            var g = h.state.formattedGraphicalItems,
              _ = h.props,
              C = _.children,
              k = _.width,
              B = _.height,
              W = h.props.margin || {},
              N = k - (W.left || 0) - (W.right || 0),
              H = xs({
                children: C,
                formattedGraphicalItems: g,
                legendWidth: N,
                legendContent: l
              });
            if (!H) return null;
            var F = H.item,
              z = D_(H, E5);
            return Xe(F, U(U({}, z), {}, {
              chartWidth: k,
              chartHeight: B,
              margin: W,
              onBBoxUpdate: h.handleLegendBBoxUpdate
            }))
          }), ft(h, "renderTooltip", function() {
            var g, _ = h.props,
              C = _.children,
              k = _.accessibilityLayer,
              B = Jt(C, de);
            if (!B) return null;
            var W = h.state,
              N = W.isTooltipActive,
              H = W.activeCoordinate,
              F = W.activePayload,
              z = W.activeLabel,
              b = W.offset,
              O = (g = B.props.active) !== null && g !== void 0 ? g : N;
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
          }), ft(h, "renderBrush", function(g) {
            var _ = h.props,
              C = _.margin,
              k = _.data,
              B = h.state,
              W = B.offset,
              N = B.dataStartIndex,
              H = B.dataEndIndex,
              F = B.updateId;
            return Xe(g, {
              key: g.key || "_recharts-brush",
              onChange: Go(h.handleBrushChange, g.props.onChange),
              data: k,
              x: X(g.props.x) ? g.props.x : W.left,
              y: X(g.props.y) ? g.props.y : W.top + W.height + W.brushBottom - (C.bottom || 0),
              width: X(g.props.width) ? g.props.width : W.width,
              startIndex: N,
              endIndex: H,
              updateId: "brush-".concat(F)
            })
          }), ft(h, "renderReferenceElement", function(g, _, C) {
            if (!g) return null;
            var k = h,
              B = k.clipPathId,
              W = h.state,
              N = W.xAxisMap,
              H = W.yAxisMap,
              F = W.offset,
              z = g.type.defaultProps || {},
              b = g.props,
              O = b.xAxisId,
              T = O === void 0 ? z.xAxisId : O,
              A = b.yAxisId,
              j = A === void 0 ? z.yAxisId : A;
            return Xe(g, {
              key: g.key || "".concat(_, "-").concat(C),
              xAxis: N[T],
              yAxis: H[j],
              viewBox: {
                x: F.left,
                y: F.top,
                width: F.width,
                height: F.height
              },
              clipPathId: B
            })
          }), ft(h, "renderActivePoints", function(g) {
            var _ = g.item,
              C = g.activePoint,
              k = g.basePoint,
              B = g.childIndex,
              W = g.isRange,
              N = [],
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
            return N.push(x.renderActiveDot(z, O, "".concat(H, "-activePoint-").concat(B))), k ? N.push(x.renderActiveDot(z, U(U({}, O), {}, {
              cx: k.x,
              cy: k.y
            }), "".concat(H, "-basePoint-").concat(B))) : W && N.push(null), N
          }), ft(h, "renderGraphicChild", function(g, _, C) {
            var k = h.filterFormatItem(g, _, C);
            if (!k) return null;
            var B = h.getTooltipEventType(),
              W = h.state,
              N = W.isTooltipActive,
              H = W.tooltipAxis,
              F = W.activeTooltipIndex,
              z = W.activeLabel,
              b = h.props.children,
              O = Jt(b, de),
              T = k.props,
              A = T.points,
              j = T.isRange,
              E = T.baseLine,
              D = k.item.type.defaultProps !== void 0 ? U(U({}, k.item.type.defaultProps), k.item.props) : k.item.props,
              L = D.activeDot,
              G = D.hide,
              Z = D.activeBar,
              J = D.activeShape,
              it = !!(!G && N && O && (L || Z || J)),
              gt = {};
            B !== "axis" && O && O.props.trigger === "click" ? gt = {
              onClick: Go(h.handleItemMouseEnter, g.props.onClick)
            } : B !== "axis" && (gt = {
              onMouseLeave: Go(h.handleItemMouseLeave, g.props.onMouseLeave),
              onMouseEnter: Go(h.handleItemMouseEnter, g.props.onMouseEnter)
            });
            var K = Xe(g, U(U({}, k.props), gt));

            function ct(qe) {
              return typeof H.dataKey == "function" ? H.dataKey(qe.payload) : null
            }
            if (it)
              if (F >= 0) {
                var tt, $;
                if (H.dataKey && !H.allowDuplicatedCategory) {
                  var St = typeof H.dataKey == "function" ? ct : "payload.".concat(H.dataKey.toString());
                  tt = En(A, St, z), $ = j && E && En(E, St, z)
                } else tt = A?.[F], $ = j && E && E[F];
                if (J || Z) {
                  var Q = g.props.activeIndex !== void 0 ? g.props.activeIndex : F;
                  return [Xe(g, U(U(U({}, k.props), gt), {}, {
                    activeIndex: Q
                  })), null, null]
                }
                if (!(0, qi.default)(tt)) return [K].concat(Fi(h.renderActivePoints({
                  item: k,
                  activePoint: tt,
                  basePoint: $,
                  childIndex: F,
                  isRange: j
                })))
              } else {
                var bt, Et = (bt = h.getItemByXY(h.state.activeCoordinate)) !== null && bt !== void 0 ? bt : {
                    graphicalItem: K
                  },
                  Lt = Et.graphicalItem,
                  pe = Lt.item,
                  V = pe === void 0 ? g : pe,
                  ie = Lt.childIndex,
                  oe = U(U(U({}, k.props), gt), {}, {
                    activeIndex: ie
                  });
                return [Xe(V, oe), null, null]
              } return j ? [K, null, null] : [K, null]
          }), ft(h, "renderCustomized", function(g, _, C) {
            return Xe(g, U(U({
              key: "recharts-customized-".concat(C)
            }, h.props), h.state))
          }), ft(h, "renderMap", {
            CartesianGrid: {
              handler: hl,
              once: !0
            },
            ReferenceArea: {
              handler: h.renderReferenceElement
            },
            ReferenceLine: {
              handler: hl
            },
            ReferenceDot: {
              handler: h.renderReferenceElement
            },
            XAxis: {
              handler: hl
            },
            YAxis: {
              handler: hl
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
          }), h.clipPathId = "".concat((S = w.id) !== null && S !== void 0 ? S : Qe("recharts"), "-clip"), h.throttleTriggeredAfterMouseMove = (0, U_.default)(h.triggeredAfterMouseMove, (P = w.throttleDelay) !== null && P !== void 0 ? P : 1e3 / 60), h.state = {}, h
        }
        return q5(x, v), N5(x, [{
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
              C = Jt(P, de);
            if (C) {
              var k = C.props.defaultIndex;
              if (!(typeof k != "number" || k < 0 || k > this.state.tooltipTicks.length - 1)) {
                var B = this.state.tooltipTicks[k] && this.state.tooltipTicks[k].value,
                  W = Cd(this.state, h, k, B),
                  N = this.state.tooltipTicks[k].coordinate,
                  H = (this.state.offset.top + g) / 2,
                  F = _ === "horizontal",
                  z = F ? {
                    x: N,
                    y: H
                  } : {
                    y: N,
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
            nu([Jt(S.children, de)], [Jt(this.props.children, de)]) || this.displayDefaultTooltip()
          }
        }, {
          key: "componentWillUnmount",
          value: function() {
            this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel()
          }
        }, {
          key: "getTooltipEventType",
          value: function() {
            var S = Jt(this.props.children, de);
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
              g = t0(h),
              _ = {
                chartX: Math.round(S.pageX - g.left),
                chartY: Math.round(S.pageY - g.top)
              },
              C = h.width / P.offsetWidth || 1,
              k = this.inRange(_.chartX, _.chartY, C);
            if (!k) return null;
            var B = this.state,
              W = B.xAxisMap,
              N = B.yAxisMap,
              H = this.getTooltipEventType(),
              F = L_(this.state, this.props.data, this.props.layout, k);
            if (H !== "axis" && W && N) {
              var z = tr(W).scale,
                b = tr(N).scale,
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
              N = W.angleAxisMap,
              H = W.radiusAxisMap;
            if (N && H) {
              var F = tr(N);
              return Pp({
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
              h = Jt(S, de),
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
            fl.on(pl, this.handleReceiveSyncEvent)
          }
        }, {
          key: "removeListener",
          value: function() {
            fl.removeListener(pl, this.handleReceiveSyncEvent)
          }
        }, {
          key: "filterFormatItem",
          value: function(S, P, h) {
            for (var g = this.state.formattedGraphicalItems, _ = 0, C = g.length; _ < C; _++) {
              var k = g[_];
              if (k.item === S || k.props.key === S.key || P === Ee(k.item.type) && h === k.childIndex) return k
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
            return Le.createElement("defs", null, Le.createElement("clipPath", {
              id: S
            }, Le.createElement("rect", {
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
              var g = k_(h, 2),
                _ = g[0],
                C = g[1];
              return U(U({}, P), {}, ft({}, _, C.scale))
            }, {}) : null
          }
        }, {
          key: "getYScales",
          value: function() {
            var S = this.state.yAxisMap;
            return S ? Object.entries(S).reduce(function(P, h) {
              var g = k_(h, 2),
                _ = g[0],
                C = g[1];
              return U(U({}, P), {}, ft({}, _, C.scale))
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
                  N = W.type.defaultProps !== void 0 ? U(U({}, W.type.defaultProps), W.props) : W.props,
                  H = Ee(W.type);
                if (H === "Bar") {
                  var F = (B.data || []).find(function(T) {
                    return WO(S, T)
                  });
                  if (F) return {
                    graphicalItem: k,
                    payload: F
                  }
                } else if (H === "RadialBar") {
                  var z = (B.data || []).find(function(T) {
                    return Pp(S, T)
                  });
                  if (z) return {
                    graphicalItem: k,
                    payload: z
                  }
                } else if (ha(k, g) || ya(k, g) || xi(k, g)) {
                  var b = cS({
                      graphicalItem: k,
                      activeTooltipItem: g,
                      itemData: N.data
                    }),
                    O = N.activeIndex === void 0 ? b : N.activeIndex;
                  return {
                    graphicalItem: U(U({}, k), {}, {
                      childIndex: O
                    }),
                    payload: xi(k, g) ? N.data[b] : k.props.data[b]
                  }
                }
              }
            return null
          }
        }, {
          key: "render",
          value: function() {
            var S = this;
            if (!Ul(this)) return null;
            var P = this.props,
              h = P.children,
              g = P.className,
              _ = P.width,
              C = P.height,
              k = P.style,
              B = P.compact,
              W = P.title,
              N = P.desc,
              H = D_(P, j5),
              F = st(H, !1);
            if (B) return Le.createElement(sd, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, Le.createElement(Zi, Bi({}, F, {
              width: _,
              height: C,
              title: W,
              desc: N
            }), this.renderClipPath(), Hl(h, this.renderMap)));
            if (this.props.accessibilityLayer) {
              var z, b;
              F.tabIndex = (z = this.props.tabIndex) !== null && z !== void 0 ? z : 0, F.role = (b = this.props.role) !== null && b !== void 0 ? b : "application", F.onKeyDown = function(T) {
                S.accessibilityManager.keyboardEvent(T)
              }, F.onFocus = function() {
                S.accessibilityManager.focus()
              }
            }
            var O = this.parseEventsOfWrapper();
            return Le.createElement(sd, {
              state: this.state,
              width: this.props.width,
              height: this.props.height,
              clipPathId: this.clipPathId
            }, Le.createElement("div", Bi({
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
            }), Le.createElement(Zi, Bi({}, F, {
              width: _,
              height: C,
              title: W,
              desc: N,
              style: V5
            }), this.renderClipPath(), Hl(h, this.renderMap)), this.renderLegend(), this.renderTooltip()))
          }
        }])
      }(U5);
    ft(y, "displayName", r), ft(y, "defaultProps", U({
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
    }, c)), ft(y, "getDerivedStateFromProps", function(v, x) {
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
        var N = B_(v);
        return U(U(U({}, N), {}, {
          updateId: 0
        }, d(U(U({
          props: v
        }, N), {}, {
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
        var H = B_(v),
          F = {
            chartX: x.chartX,
            chartY: x.chartY,
            isTooltipActive: x.isTooltipActive
          },
          z = U(U({}, L_(x, S, _)), {}, {
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
      if (!nu(P, x.prevChildren)) {
        var O, T, A, j, E = Jt(P, yn),
          D = E && (O = (T = E.props) === null || T === void 0 ? void 0 : T.startIndex) !== null && O !== void 0 ? O : B,
          L = E && (A = (j = E.props) === null || j === void 0 ? void 0 : j.endIndex) !== null && A !== void 0 ? A : W,
          G = D !== B || L !== W,
          Z = !(0, qi.default)(S),
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
    }), ft(y, "renderActiveDot", function(v, x, w) {
      var S;
      return H5(v) ? S = Xe(v, x) : (0, Ye.default)(v) ? S = v(x) : S = Le.createElement(bi, x), Le.createElement(xt, {
        className: "recharts-active-dot",
        key: w
      }, S)
    });
    var m = G5(function(x, w) {
      return Le.createElement(y, Bi({}, x, {
        ref: w
      }))
    });
    return m.displayName = y.displayName, m
  };
var Id = bl({
  chartName: "LineChart",
  GraphicalChild: Rr,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: cr
  }, {
    axisType: "yAxis",
    AxisComp: fr
  }],
  formatAxisMap: Gs
});
var kd = bl({
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
  formatAxisMap: Gs
});
import "./react-shim-eraudit.js";
import {
  jsx as xl,
  jsxs as Dd
} from "./react-jsx-shim-eraudit.js";

function Nd({
  data: t,
  title: e = "AI Intelligence"
}) {
  if (!t) return null;
  let r = Array.isArray(t?.sections) ? t.sections : i4(t);
  return r.length ? Dd("div", {
    className: "rounded-lg my-3",
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      boxShadow: "var(--md-shadow-sm)",
      padding: "1rem 1.25rem"
    },
    children: [Dd("h3", {
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
      children: [xl("span", {
        "aria-hidden": "true",
        children: "\u2728"
      }), e]
    }), xl("div", {
      className: "space-y-2",
      children: r.map((n, i) => Dd("div", {
        children: [n.title && xl("div", {
          style: {
            fontSize: "var(--fs-xs)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--md-text-tertiary)",
            marginBottom: 4
          },
          children: n.title
        }), xl("p", {
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
  Fragment as La,
  jsx as M,
  jsxs as q
} from "./react-jsx-shim-eraudit.js";

function dt(t, e = 0) {
  return t == null || t === "" || isNaN(t) ? "\u2014" : Number(t).toLocaleString("th-TH", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  })
}

function Na(t) {
  return t == null || isNaN(t) ? "\u2014" : `${Number(t).toFixed(1)}%`
}

function a4(t, e) {
  return e > 0 ? Math.round((t - e) / e * 100) : t > 0 ? 100 : 0
}
async function Lr(t, e) {
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
var Ra = ["#94a3b8", "#7c3aed", "#0284c7"],
  K_ = ["#0284c7", "#7c3aed", "#db2777", "#ea580c", "#059669", "#d97706", "#4f46e5", "#0891b2", "#be123c", "#65a30d"];

function u4() {
  let t = new Date,
    e = t.getMonth() + 1,
    r = t.getFullYear();
  return `${e>=10?r:r-1}-10-01`
}

function V_() {
  let t = new Date,
    e = t.getFullYear(),
    r = String(t.getMonth() + 1).padStart(2, "0");
  return `${e}-${r}-01`
}
var Br = () => new Date().toISOString().slice(0, 10),
  $i = ["#10b981", "#84cc16", "#eab308", "#f97316", "#dc2626"],
  wl = ["aging_0_30", "aging_31_60", "aging_61_90", "aging_91_180", "aging_180_plus"],
  Ol = ["0-30 \u0E27\u0E31\u0E19", "31-60 \u0E27\u0E31\u0E19", "61-90 \u0E27\u0E31\u0E19", "91-180 \u0E27\u0E31\u0E19", ">180 \u0E27\u0E31\u0E19"],
  Ui = {
    drug: "#7c3aed",
    lab: "#0284c7",
    xray: "#059669"
  };

function s4() {
  let [t, e] = Gt(null), [r, n] = Gt(null), [i, o] = Gt(null), [a, u] = Gt(null), [s, l] = Gt(null), [f, c] = Gt(null), [p, d] = Gt(!0), [y, m] = Gt(null), [v, x] = Gt("overview"), [w, S] = Gt(null), [P, h] = Gt(null), g = o4(null), [_, C] = Gt(V_()), [k, B] = Gt(Br()), [W, N] = Gt(null), [H, F] = Gt(null), [z, b] = Gt("outstanding"), [O, T] = Gt(!1), [A, j] = Gt("groups"), [E, D] = Gt(new Set), L = Be(R => {
    D(rt => {
      let at = new Set(rt);
      return at.has(R) ? at.delete(R) : at.add(R), at
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
  }, Z = R => G[R] || "#94a3b8", J = Be(async () => {
    d(!0), m(null);
    try {
      let [R, rt] = await Promise.all([Lr(`/api/customer-insight/screening-summary?_t=${Date.now()}`, {
        credentials: "include"
      }), Lr(`/api/customer-insight/monthly-trend?_t=${Date.now()}`, {
        credentials: "include"
      })]);
      e(R), n(rt), Lr("/api/ai/customer/segmentation", {
        credentials: "include"
      }).then(h).catch(() => {})
    } catch (R) {
      m(R.message)
    }
    d(!1)
  }, []), it = Be(async R => {
    try {
      let rt = R ? `&pttype=${R}` : "",
        at = await Lr(`/api/customer-insight/top-diagnosis?${rt}&_t=${Date.now()}`, {
          credentials: "include"
        });
      o(at)
    } catch (rt) {
      m(rt.message)
    }
  }, []), gt = Be(async () => {
    try {
      let R = await Lr(`/api/customer-insight/patient-insight?_t=${Date.now()}`, {
        credentials: "include"
      });
      u(R)
    } catch (R) {
      m(R.message)
    }
  }, []), K = Be(async () => {
    try {
      let R = await Lr(`/api/customer-insight/aging?_t=${Date.now()}`, {
        credentials: "include"
      });
      l(R)
    } catch (R) {
      m(R.message)
    }
  }, []), ct = Be(async () => {
    d(!0), m(null);
    try {
      let R = await Lr(`/api/customer-insight/screening-custom?from=${_}&to=${k}&_t=${Date.now()}`, {
        credentials: "include"
      });
      c(R)
    } catch (R) {
      m(R.message)
    }
    d(!1)
  }, [_, k]), tt = Be(async R => {
    T(!0);
    try {
      let rt = await Lr(`/api/customer-insight/payer-patients?pttype=${R}&sort_by=${z}&_t=${Date.now()}`, {
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
  }, [z]), $ = Be(R => {
    N(R), F(null), tt(R.pttype_code)
  }, [tt]), St = Be(() => {
    N(null), F(null)
  }, []);
  Da(() => {
    J()
  }, [J]), Da(() => {
    v === "diagnosis" && it(w)
  }, [v, w, it]), Da(() => {
    v === "patient-insight" && !a && gt()
  }, [v, a, gt]), Da(() => {
    v === "aging" && !s && K()
  }, [v, s, K]), Da(() => {
    W && tt(W.pttype_code)
  }, [z, W, tt]);
  let Q = t?.fiscal_years || [],
    bt = Q.map(R => R.be),
    Et = Be(() => {
      if (!g.current) return;
      let R = window.open("", "_blank");
      R.document.write(`<!DOCTYPE html><html><head><title>Customer Insight \u2014 3 \u0E1B\u0E35\u0E07\u0E1A</title>
      <style>body{font-family:Sarabun,sans-serif;padding:20px}table{border-collapse:collapse;width:100%;font-size:10px}
      th,td{border:1px solid #ccc;padding:3px 6px;text-align:right}th{background:#f0f4f8;font-weight:800}
      td:first-child,th:first-child{text-align:left}</style></head><body>`), R.document.write(g.current.outerHTML), R.document.write("</body></html>"), R.document.close(), R.print()
    }, []),
    Lt = Be(() => {
      if (!t?.payers || Q.length < 3) return;
      let R = "\uFEFF",
        rt = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let ot of Q) rt.push(`${ot.be} OPD`, `${ot.be} IPD`, `${ot.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${ot.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${ot.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${ot.be} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      rt.push("Growth %");
      let at = t.payers.map(ot => {
          let lt = [ot.pttype_code, ot.pttype_name];
          for (let nt of Q) {
            let pt = ot.fys[nt.be];
            lt.push(pt.opd_visits, pt.ipd_admissions, pt.total_income, pt.total_paid, pt.total_outstanding, pt.collection_rate)
          }
          return lt.push(ot.income_growth), lt
        }),
        mt = R + [rt, ...at].map(ot => ot.join(",")).join(`
`),
        yt = new Blob([mt], {
          type: "text/csv;charset=utf-8"
        }),
        Dt = URL.createObjectURL(yt),
        Y = document.createElement("a");
      Y.href = Dt, Y.download = "BCH360_CustomerInsight_3FY.csv", Y.click(), URL.revokeObjectURL(Dt)
    }, [t, Q]),
    pe = Be(async () => {
      if (!t?.payers || Q.length < 3) return;
      let R = await import("./xlsx-BuHXVOW6.js"),
        rt = R.utils.book_new(),
        at = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (let ht of Q) at.push(`${ht.be} \u0E04\u0E23\u0E31\u0E49\u0E07`, `${ht.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${ht.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${ht.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${ht.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      at.push("Growth %");
      let mt = t.payers.map(ht => {
          let vt = [ht.pttype_code, ht.pttype_name];
          for (let jt of Q) {
            let It = ht.fys[jt.be];
            vt.push(It.opd_visits + It.ipd_admissions, It.total_income, It.total_paid, It.total_outstanding, It.collection_rate)
          }
          return vt.push(ht.income_growth), vt
        }),
        yt = R.utils.aoa_to_sheet([at, ...mt]);
      yt["!cols"] = at.map(ht => ({
        wch: Math.min(Math.max(ht.length + 4, 12), 28)
      })), R.utils.book_append_sheet(rt, yt, "\u0E2A\u0E23\u0E38\u0E1B\u0E2A\u0E34\u0E17\u0E18\u0E34 3 \u0E1B\u0E35\u0E07\u0E1A");
      let Dt = Q[2].be,
        Y = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 Xray", "% \u0E22\u0E32", "% Lab", "% Xray"],
        ot = t.payers.map(ht => {
          let vt = ht.fys[Dt],
            jt = vt.total_income || 0;
          return [ht.pttype_code, ht.pttype_name, jt, vt.opd_drug || 0, vt.opd_lab || 0, vt.opd_xray || 0, jt > 0 ? Math.round(vt.opd_drug / jt * 1e3) / 10 : 0, jt > 0 ? Math.round(vt.opd_lab / jt * 1e3) / 10 : 0, jt > 0 ? Math.round(vt.opd_xray / jt * 1e3) / 10 : 0]
        }),
        lt = R.utils.aoa_to_sheet([Y, ...ot]);
      if (lt["!cols"] = Y.map(ht => ({
          wch: Math.min(Math.max(ht.length + 4, 12), 28)
        })), R.utils.book_append_sheet(rt, lt, `Service Mix ${Dt}`), r?.comparison) {
        let ht = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...Q.map(It => `${It.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`), ...Q.map(It => `${It.be} \u0E04\u0E23\u0E31\u0E49\u0E07`)],
          vt = r.comparison.map(It => {
            let zt = [It.month];
            for (let qr of Q) zt.push(It[`fy${qr.be}`]?.income || 0);
            for (let qr of Q) zt.push(It[`fy${qr.be}`]?.visits || 0);
            return zt
          }),
          jt = R.utils.aoa_to_sheet([ht, ...vt]);
        jt["!cols"] = ht.map(It => ({
          wch: 14
        })), R.utils.book_append_sheet(rt, jt, "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19")
      }
      if (s?.payers) {
        let ht = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34", ...Ol, "\u0E23\u0E27\u0E21\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"],
          vt = s.payers.map(zt => [zt.pttype_code, zt.pttype_name, ...wl.map(qr => zt[qr] || 0), zt.total_outstanding || 0]),
          jt = s.grand_total || {};
        vt.push(["", "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", ...wl.map(zt => jt[zt] || 0), jt.total_outstanding || 0]);
        let It = R.utils.aoa_to_sheet([ht, ...vt]);
        It["!cols"] = ht.map(zt => ({
          wch: Math.min(Math.max(zt.length + 4, 14), 24)
        })), R.utils.book_append_sheet(rt, It, "Aging \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30")
      }
      let nt = [
          ["BCH 360\xB0 Intelligence \u2014 Customer Insight Report"],
          [],
          ["\u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", `${bt.join(" \xB7 ")}`],
          ["\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", t.data_source],
          ["\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E40\u0E21\u0E37\u0E48\u0E2D", new Date().toLocaleString("th-TH")],
          ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34", `${t.payers.length}`],
          ["\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E35\u0E48 Flag", `${t.flagged_count}`],
          [],
          ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team \xB7 BOSSART"]
        ],
        pt = R.utils.aoa_to_sheet(nt);
      pt["!cols"] = [{
        wch: 22
      }, {
        wch: 60
      }], R.utils.book_append_sheet(rt, pt, "Meta"), R.writeFile(rt, "BCH360_CustomerInsight_3FY.xlsx")
    }, [t, Q, bt, r, s]),
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
      badge: (R, rt) => ({
        fontSize: "9px",
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: "99px",
        background: R,
        color: rt
      })
    },
    ie = ({
      label: R,
      icon: rt,
      values: at,
      unit: mt = "",
      accent: yt = "#0284c7",
      reverse: Dt = !1
    }) => {
      let Y = at[2],
        ot = at[1],
        lt = a4(Y, ot),
        nt = Dt ? lt <= 0 ? "#059669" : "#dc2626" : lt >= 0 ? "#059669" : "#dc2626";
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
            children: rt
          }), M("span", {
            style: {
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: R
          })]
        }), q("div", {
          style: {
            fontSize: "20px",
            fontWeight: 900,
            color: yt
          },
          children: [dt(Y), " ", M("span", {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)"
            },
            children: mt
          })]
        }), M("div", {
          style: {
            display: "flex",
            gap: "8px",
            marginTop: "6px",
            fontSize: "10px",
            fontWeight: 700
          },
          children: bt.map((pt, ht) => q("span", {
            style: {
              color: ht === 2 ? yt : "var(--md-text-tertiary)"
            },
            children: [pt, ": ", dt(at[ht])]
          }, pt))
        }), ot > 0 && q("div", {
          style: {
            marginTop: "4px",
            fontSize: "10px",
            fontWeight: 800,
            color: nt
          },
          children: [lt >= 0 ? "+" : "", lt, "% vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"]
        })]
      })
    },
    oe = ({
      active: R,
      payload: rt,
      label: at
    }) => !R || !rt?.length ? null : q("div", {
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
        children: at
      }), rt.map((mt, yt) => q("div", {
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
            background: mt.color
          }
        }), q("span", {
          style: {
            fontWeight: 600,
            color: "var(--md-text-secondary)"
          },
          children: [mt.name, ":"]
        }), M("span", {
          style: {
            fontWeight: 800
          },
          children: dt(mt.value)
        })]
      }, yt))]
    }),
    qe = ({
      value: R
    }) => {
      if (R == null || isNaN(R)) return null;
      let rt = R >= 0 ? "#059669" : "#dc2626";
      return q("span", {
        style: {
          fontSize: "9px",
          fontWeight: 800,
          color: rt
        },
        children: [R >= 0 ? "+" : "", R, "%"]
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
        children: ["3 \u0E1B\u0E35\u0E07\u0E1A: ", bt[0], " \xB7 ", bt[1], " \xB7 ", bt[2]]
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
      }].map(R => M("button", {
        onClick: () => x(R.id),
        style: {
          padding: "5px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          cursor: "pointer",
          border: v === R.id ? "1.5px solid #7c3aed" : "1px solid var(--md-border)",
          background: v === R.id ? "rgba(124,58,237,.08)" : "var(--md-surface)",
          color: v === R.id ? "#7c3aed" : "var(--md-text-secondary)"
        },
        children: R.label
      }, R.id)), M("div", {
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
        onClick: Et,
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
        onClick: Lt,
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
        onChange: R => C(R.target.value),
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
        onChange: R => B(R.target.value),
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
        onClick: ct,
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
        from: V_(),
        to: Br()
      }, {
        id: "last30",
        label: "30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
        from: (() => {
          let R = new Date;
          return R.setDate(R.getDate() - 30), R.toISOString().slice(0, 10)
        })(),
        to: Br()
      }, {
        id: "last90",
        label: "90 \u0E27\u0E31\u0E19",
        from: (() => {
          let R = new Date;
          return R.setDate(R.getDate() - 90), R.toISOString().slice(0, 10)
        })(),
        to: Br()
      }, {
        id: "ytd",
        label: "\u0E1B\u0E35\u0E07\u0E1A\u0E19\u0E35\u0E49",
        from: u4(),
        to: Br()
      }].map(R => M("button", {
        onClick: () => {
          C(R.from), B(R.to)
        },
        style: {
          padding: "4px 10px",
          borderRadius: "6px",
          fontSize: "11px",
          fontWeight: 700,
          cursor: "pointer",
          border: _ === R.from && k === R.to ? "1.5px solid #d97706" : "1px solid var(--md-border)",
          background: _ === R.from && k === R.to ? "rgba(217,119,6,.08)" : "var(--md-surface)",
          color: _ === R.from && k === R.to ? "#d97706" : "var(--md-text-secondary)"
        },
        children: R.label
      }, R.id)), f && q("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          color: "#d97706",
          marginLeft: "auto"
        },
        children: ["\u2713 ", f.window?.from, " \u2192 ", f.window?.to, " \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ", dt(f.grand_total?.total_income), " \u0E1A. \xB7 \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A ", Na(f.grand_total?.collection_rate)]
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
    }), !p && t && Q.length === 3 && v === "overview" && (() => {
      let R = t.grand_totals,
        rt = Y => Q.map(ot => R[ot.be]?.[Y] || 0),
        at = t.months_elapsed || 12,
        mt = (Y, ot) => {
          if (ot === 0) return null;
          let lt = Y[Q[ot].be]?.total_income || 0,
            nt = Y[Q[ot - 1].be]?.total_income || 0;
          if (ot === 2) {
            let pt = at > 0 ? Math.round(nt * at / 12) : nt;
            return pt > 0 ? Math.round((lt - pt) / pt * 100) : lt > 0 ? 100 : 0
          }
          return nt > 0 ? Math.round((lt - nt) / nt * 100) : lt > 0 ? 100 : 0
        },
        yt = (Y, ot, lt) => {
          if (Y === null) return M("td", {
            style: {
              ...V.td,
              borderRight: "2px solid var(--md-border)",
              color: "var(--md-text-tertiary)"
            },
            children: "\u2014"
          }, `${ot}-d${lt}`);
          let nt = Y > 0 ? "#059669" : Y < 0 ? "#dc2626" : "var(--md-text-tertiary)",
            pt = Y > 0 ? "\u25B2" : Y < 0 ? "\u25BC" : "\xB7";
          return q("td", {
            style: {
              ...V.td,
              fontWeight: 800,
              borderRight: "2px solid var(--md-border)",
              color: nt
            },
            children: [pt, " ", Math.abs(Y), "%"]
          }, `${ot}-d${lt}`)
        },
        Dt = (r?.comparison || []).map(Y => {
          let ot = {
            month: Y.month
          };
          for (let lt of Q) ot[`fy${lt.be}`] = Y[`fy${lt.be}`]?.income || 0;
          return ot
        }).filter(Y => Q.some(ot => Y[`fy${ot.be}`] > 0));
      return q(La, {
        children: [q("div", {
          style: {
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          },
          children: [M(ie, {
            icon: "\u{1F465}",
            label: "OPD Visits",
            values: rt("opd_visits"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#0284c7"
          }), M(ie, {
            icon: "\u{1F3E5}",
            label: "IPD Admissions",
            values: rt("ipd_admissions"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#7c3aed"
          }), M(ie, {
            icon: "\u{1F4B0}",
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
            values: rt("total_income"),
            unit: "\u0E1A\u0E32\u0E17",
            accent: "#059669"
          }), M(ie, {
            icon: "\u{1F4CA}",
            label: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A",
            values: Q.map(Y => R[Y.be]?.collection_rate || 0),
            unit: "%",
            accent: "#0284c7"
          }), M(ie, {
            icon: "\u{1F6A9}",
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21",
            values: [0, 0, t.flagged_count],
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            accent: "#dc2626"
          })]
        }), Dt.length > 0 && q("div", {
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
          }), M(ju, {
            width: "100%",
            height: 300,
            children: q(Id, {
              data: Dt,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [M(Ta, {
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
              }), M(de, {
                content: M(oe, {})
              }), M(ke, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), Q.map((Y, ot) => M(Rr, {
                type: "monotone",
                dataKey: `fy${Y.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${Y.be}`,
                stroke: Ra[ot],
                strokeWidth: ot === 2 ? 3 : 1.5,
                strokeDasharray: ot === 0 ? "5 5" : void 0,
                dot: {
                  r: ot === 2 ? 4 : 2
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
                children: ["\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E41\u0E22\u0E01\u0E15\u0E32\u0E21", A === "groups" ? "\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C (9 \u0E2B\u0E21\u0E27\u0E14)" : "\u0E2A\u0E34\u0E17\u0E18\u0E34", " \u2014 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 (", bt.join(" \xB7 "), ")"]
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
                  }), Q.map((Y, ot) => q("th", {
                    colSpan: 3,
                    style: {
                      ...V.th,
                      textAlign: "center",
                      borderRight: "2px solid var(--md-border)",
                      background: `${Ra[ot]}10`,
                      color: Ra[ot],
                      fontSize: "11px"
                    },
                    children: ["\u0E1B\u0E35\u0E07\u0E1A ", Y.be, ot === 2 ? " (\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19)" : ""]
                  }, Y.be)), M("th", {
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
                  children: Q.map((Y, ot) => q(wn.Fragment, {
                    children: [M("th", {
                      style: {
                        ...V.th,
                        fontSize: "9px"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), M("th", {
                      style: {
                        ...V.th,
                        fontSize: "9px"
                      },
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), M("th", {
                      style: {
                        ...V.th,
                        fontSize: "9px",
                        borderRight: "2px solid var(--md-border)"
                      },
                      children: ot === 0 ? "\u2014" : `\u0394% vs ${Q[ot-1].be}`
                    })]
                  }, Y.be))
                })]
              }), M("tbody", {
                children: A === "groups" ? (t.groups || []).map((Y, ot) => {
                  let lt = Y.flag_low_collection || Y.flag_high_outstanding,
                    nt = Z(Y.group_name),
                    pt = E.has(Y.group_name),
                    ht = t.payers.filter(vt => vt.group_name === Y.group_name);
                  return q(wn.Fragment, {
                    children: [q("tr", {
                      style: {
                        background: `${nt}10`,
                        borderTop: `2px solid ${nt}40`,
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
                              background: nt,
                              display: "inline-block"
                            }
                          }), M("span", {
                            style: {
                              fontSize: "13px",
                              fontWeight: 900,
                              color: nt
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
                            children: pt ? "\u25BC" : "\u25B6"
                          })]
                        })
                      }), Q.map((vt, jt) => {
                        let It = Y.fys[vt.be],
                          zt = mt(Y.fys, jt);
                        return q(wn.Fragment, {
                          children: [M("td", {
                            style: {
                              ...V.td,
                              fontWeight: 800
                            },
                            children: dt(It.opd_visits + It.ipd_admissions)
                          }), M("td", {
                            style: {
                              ...V.td,
                              fontWeight: 800
                            },
                            children: dt(It.total_income)
                          }), yt(zt, `gh${ot}`, jt)]
                        }, vt.be)
                      }), M("td", {
                        style: {
                          ...V.td,
                          textAlign: "center"
                        },
                        children: lt ? M("span", {
                          style: V.badge("rgba(220,38,38,.1)", "#dc2626"),
                          children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                        }) : M("span", {
                          style: V.badge("rgba(5,150,105,.1)", "#059669"),
                          children: "\u0E1B\u0E01\u0E15\u0E34"
                        })
                      })]
                    }), pt && ht.map((vt, jt) => {
                      let It = vt.flag_low_collection || vt.flag_high_outstanding;
                      return q("tr", {
                        style: {
                          background: jt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
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
                            children: vt.pttype_code
                          }), M("span", {
                            style: {
                              marginLeft: "4px",
                              fontWeight: 500,
                              color: "var(--md-text-secondary)"
                            },
                            children: vt.pttype_name
                          }), M("button", {
                            onClick: zt => {
                              zt.stopPropagation(), $(vt)
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
                        }), Q.map((zt, qr) => {
                          let Sl = vt.fys[zt.be],
                            On = mt(vt.fys, qr);
                          return q(wn.Fragment, {
                            children: [M("td", {
                              style: {
                                ...V.td,
                                fontSize: "10px"
                              },
                              children: dt(Sl.opd_visits + Sl.ipd_admissions)
                            }), M("td", {
                              style: {
                                ...V.td,
                                fontSize: "10px"
                              },
                              children: dt(Sl.total_income)
                            }), On === null ? M("td", {
                              style: {
                                ...V.td,
                                fontSize: "10px",
                                borderRight: "2px solid var(--md-border)",
                                color: "var(--md-text-tertiary)"
                              },
                              children: "\u2014"
                            }) : q("td", {
                              style: {
                                ...V.td,
                                fontSize: "10px",
                                fontWeight: 700,
                                borderRight: "2px solid var(--md-border)",
                                color: On > 0 ? "#059669" : On < 0 ? "#dc2626" : "var(--md-text-tertiary)"
                              },
                              children: [On > 0 ? "\u25B2" : On < 0 ? "\u25BC" : "\xB7", " ", Math.abs(On), "%"]
                            })]
                          }, zt.be)
                        }), M("td", {
                          style: {
                            ...V.td,
                            textAlign: "center",
                            fontSize: "9px"
                          },
                          children: It ? M("span", {
                            style: V.badge("rgba(220,38,38,.08)", "#dc2626"),
                            children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                          }) : M("span", {
                            style: V.badge("rgba(5,150,105,.08)", "#059669"),
                            children: "\u0E1B\u0E01\u0E15\u0E34"
                          })
                        })]
                      }, `${Y.group_name}-${vt.pttype_code}`)
                    })]
                  }, Y.group_name)
                }) : t.payers.map((Y, ot) => {
                  let lt = Y.flag_low_collection || Y.flag_high_outstanding,
                    nt = lt ? "rgba(220,38,38,.04)" : ot % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))";
                  return q("tr", {
                    style: {
                      background: nt
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
                    }), Q.map((pt, ht) => {
                      let vt = Y.fys[pt.be],
                        jt = mt(Y.fys, ht);
                      return q(wn.Fragment, {
                        children: [M("td", {
                          style: V.td,
                          children: dt(vt.opd_visits + vt.ipd_admissions)
                        }), M("td", {
                          style: {
                            ...V.td,
                            fontWeight: 700
                          },
                          children: dt(vt.total_income)
                        }), yt(jt, `p${ot}`, ht)]
                      }, pt.be)
                    }), M("td", {
                      style: {
                        ...V.td,
                        textAlign: "center"
                      },
                      children: lt ? M("span", {
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
                  }), Q.map((Y, ot) => {
                    let lt = R[Y.be],
                      nt = mt(R, ot),
                      pt = nt > 0 ? "#059669" : nt < 0 ? "#dc2626" : "var(--md-text-tertiary)",
                      ht = nt > 0 ? "\u25B2" : nt < 0 ? "\u25BC" : "\xB7";
                    return q(wn.Fragment, {
                      children: [M("td", {
                        style: {
                          ...V.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: dt(lt.opd_visits + lt.ipd_admissions)
                      }), M("td", {
                        style: {
                          ...V.td,
                          fontWeight: 900,
                          borderTop: "2px solid var(--md-border)"
                        },
                        children: dt(lt.total_income)
                      }), M("td", {
                        style: {
                          ...V.td,
                          fontWeight: 900,
                          borderRight: "2px solid var(--md-border)",
                          borderTop: "2px solid var(--md-border)",
                          color: nt === null ? "var(--md-text-tertiary)" : pt
                        },
                        children: nt === null ? "\u2014" : `${ht} ${Math.abs(nt)}%`
                      })]
                    }, Y.be)
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
    })(), !p && t && Q.length === 3 && v === "payer-detail" && (() => {
      let rt = t.payers.filter(at => at._sort_income > 0).slice(0, 12).map(at => {
        let mt = {
          name: at.pttype_code
        };
        for (let yt of Q) mt[`fy${yt.be}`] = at.fys[yt.be].total_income;
        return mt
      });
      return q(La, {
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
          }), M(ju, {
            width: "100%",
            height: 350,
            children: q(kd, {
              data: rt,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [M(Ta, {
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
                tickFormatter: at => at >= 1e6 ? `${(at/1e6).toFixed(1)}M` : at >= 1e3 ? `${(at/1e3).toFixed(0)}K` : at
              }), M(de, {
                content: M(oe, {})
              }), M(ke, {
                wrapperStyle: {
                  fontSize: "11px",
                  fontWeight: 700
                }
              }), Q.map((at, mt) => M(Ge, {
                dataKey: `fy${at.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${at.be}`,
                fill: Ra[mt],
                radius: [3, 3, 0, 0]
              }, at.be))]
            })
          })]
        }), M("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "12px"
          },
          children: t.payers.filter(at => at._sort_income > 0).slice(0, 20).map((at, mt) => {
            let yt = at.flag_low_collection || at.flag_high_outstanding,
              Dt = at.fys[Q[2].be];
            return q("div", {
              className: "rounded-2xl p-4",
              style: {
                background: "var(--md-surface)",
                border: yt ? "1.5px solid rgba(220,38,38,.3)" : "1px solid var(--md-border)"
              },
              children: [q("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px"
                },
                children: [q("button", {
                  onClick: () => $(at),
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
                      color: K_[mt % K_.length],
                      textDecoration: "underline dotted"
                    },
                    children: at.pttype_code
                  }), M("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-secondary)",
                      marginLeft: "6px"
                    },
                    children: at.pttype_name
                  }), M("span", {
                    style: {
                      marginLeft: "6px",
                      fontSize: "10px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: "\u{1F50D}"
                  })]
                }), yt ? M("span", {
                  style: V.badge("rgba(220,38,38,.1)", "#dc2626"),
                  children: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
                }) : M("span", {
                  style: V.badge("rgba(5,150,105,.1)", "#059669"),
                  children: "\u0E1B\u0E01\u0E15\u0E34"
                })]
              }), (() => {
                let Y = at.fys[Q[2].be],
                  ot = Y.opd_drug || 0,
                  lt = Y.opd_lab || 0,
                  nt = Y.opd_xray || 0,
                  pt = ot + lt + nt;
                if (pt === 0) return null;
                let ht = ot / pt * 100,
                  vt = lt / pt * 100,
                  jt = nt / pt * 100;
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
                      children: [dt(pt), " \u0E1A\u0E32\u0E17"]
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      height: "8px",
                      borderRadius: "99px",
                      overflow: "hidden",
                      background: "var(--md-surface-2, rgba(0,0,0,.04))"
                    },
                    children: [ot > 0 && M("div", {
                      style: {
                        width: `${ht}%`,
                        background: Ui.drug
                      },
                      title: `\u{1F48A} \u0E04\u0E48\u0E32\u0E22\u0E32: ${dt(ot)} \u0E1A\u0E32\u0E17 (${ht.toFixed(1)}%)`
                    }), lt > 0 && M("div", {
                      style: {
                        width: `${vt}%`,
                        background: Ui.lab
                      },
                      title: `\u{1F52C} \u0E04\u0E48\u0E32 Lab: ${dt(lt)} \u0E1A\u0E32\u0E17 (${vt.toFixed(1)}%)`
                    }), nt > 0 && M("div", {
                      style: {
                        width: `${jt}%`,
                        background: Ui.xray
                      },
                      title: `\u2622\uFE0F \u0E04\u0E48\u0E32 X-ray: ${dt(nt)} \u0E1A\u0E32\u0E17 (${jt.toFixed(1)}%)`
                    })]
                  }), q("div", {
                    style: {
                      display: "flex",
                      gap: "10px",
                      fontSize: "9px",
                      fontWeight: 700,
                      marginTop: "3px"
                    },
                    children: [ot > 0 && q("span", {
                      style: {
                        color: Ui.drug
                      },
                      children: ["\u{1F48A} \u0E22\u0E32 ", ht.toFixed(0), "%"]
                    }), lt > 0 && q("span", {
                      style: {
                        color: Ui.lab
                      },
                      children: ["\u{1F52C} Lab ", vt.toFixed(0), "%"]
                    }), nt > 0 && q("span", {
                      style: {
                        color: Ui.xray
                      },
                      children: ["\u2622\uFE0F Xray ", jt.toFixed(0), "%"]
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
                  children: Q.map((Y, ot) => {
                    let lt = at.fys[Y.be];
                    return q("tr", {
                      style: {
                        fontWeight: ot === 2 ? 800 : 600
                      },
                      children: [M("td", {
                        style: {
                          textAlign: "left",
                          padding: "3px 4px",
                          color: Ra[ot]
                        },
                        children: Y.be
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: dt(lt.opd_visits + lt.ipd_admissions)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: dt(lt.total_income)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: lt.total_outstanding > 0 ? "#dc2626" : "inherit"
                        },
                        children: dt(lt.total_outstanding)
                      }), M("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: lt.collection_rate >= 90 ? "#059669" : lt.collection_rate >= 80 ? "#d97706" : "#dc2626"
                        },
                        children: lt.total_income > 0 ? Na(lt.collection_rate) : "\u2014"
                      })]
                    }, Y.be)
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
                }), M(qe, {
                  value: at.income_growth
                }), Dt.ipd_avg_rw > 0 && q("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["Avg RW: ", M("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: Dt.ipd_avg_rw.toFixed(2)
                  })]
                }), Dt.ipd_avg_los > 0 && q("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["LOS: ", q("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: [Dt.ipd_avg_los.toFixed(1), "d"]
                  })]
                })]
              })]
            }, at.pttype_code)
          })
        })]
      })
    })(), !p && v === "diagnosis" && q(La, {
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
          onChange: R => S(R.target.value || null),
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
          }), (t?.payers || []).map(R => q("option", {
            value: R.pttype_code,
            children: [R.pttype_code, " \u2014 ", R.pttype_name]
          }, R.pttype_code))]
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
            children: ["Top \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23 \u2014 \u0E1B\u0E35\u0E07\u0E1A ", i.fiscal_year?.be || bt[2], w && q("span", {
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
              children: i.diagnoses.map((R, rt) => q("tr", {
                style: {
                  background: rt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("td", {
                  style: {
                    ...V.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: rt + 1
                }), M("td", {
                  style: {
                    ...V.td,
                    textAlign: "left",
                    fontWeight: 800,
                    fontFamily: "monospace"
                  },
                  children: R.icd10
                }), M("td", {
                  style: V.tdName,
                  children: R.name
                }), M("td", {
                  style: V.td,
                  children: dt(R.visits)
                }), M("td", {
                  style: V.td,
                  children: dt(R.patients)
                }), M("td", {
                  style: {
                    ...V.td,
                    fontWeight: 700
                  },
                  children: dt(R.income)
                })]
              }, R.icd10))
            })]
          })
        })]
      })]
    }), !p && v === "patient-insight" && (a ? (() => {
      let R = a.loyalty,
        rt = a.demographics,
        at = a.inactive,
        mt = a.fiscal_year?.be,
        yt = rt.age_bands,
        Dt = yt.lt18 + yt.a18_34 + yt.a35_59 + yt.gte60,
        Y = rt.sex.male + rt.sex.female,
        ot = R.total_unique - Y,
        lt = nt => nt ? new Date(nt).toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }) : "\u2014";
      return q(La, {
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
              children: ["\u{1F465} \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E1B\u0E35\u0E07\u0E1A ", mt]
            }), M("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#0284c7",
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: dt(R.total_unique)
            }), q("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: [dt(R.total_visits), " visits \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", M("b", {
                children: R.avg_visits_per_patient
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
              children: dt(R.new_patients)
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
                children: Na(R.new_pct)
              }), " \u0E02\u0E2D\u0E07 ", dt(R.total_unique), " \u0E23\u0E32\u0E22"]
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
              children: dt(R.returning_patients)
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
                children: Na(R.returning_pct)
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
              children: dt(R.total_income)
            }), q("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: ["\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", M("b", {
                children: dt(R.total_unique > 0 ? Math.round(R.total_income / R.total_unique) : 0)
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
              val: yt.lt18,
              color: "#3b82f6"
            }, {
              label: "18-34 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19\u0E15\u0E49\u0E19)",
              val: yt.a18_34,
              color: "#10b981"
            }, {
              label: "35-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E01\u0E25\u0E32\u0E07)",
              val: yt.a35_59,
              color: "#f59e0b"
            }, {
              label: "60+ \u0E1B\u0E35 (\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38)",
              val: yt.gte60,
              color: "#ef4444"
            }].map(nt => {
              let pt = Dt > 0 ? nt.val / Dt * 100 : 0;
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
                    children: nt.label
                  }), q("span", {
                    style: {
                      color: nt.color,
                      fontVariantNumeric: "tabular-nums"
                    },
                    children: [dt(nt.val), " ", q("span", {
                      style: {
                        color: "var(--md-text-tertiary)",
                        fontWeight: 600
                      },
                      children: ["(", pt.toFixed(1), "%)"]
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
                      width: `${pt}%`,
                      height: "100%",
                      background: nt.color,
                      borderRadius: "99px",
                      transition: "width .4s ease"
                    }
                  })
                })]
              }, nt.label)
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
                  val: rt.sex.male,
                  color: "#3b82f6",
                  icon: "\u2642"
                }, {
                  label: "\u0E2B\u0E0D\u0E34\u0E07",
                  val: rt.sex.female,
                  color: "#ec4899",
                  icon: "\u2640"
                }].map(nt => {
                  let pt = Y > 0 ? nt.val / Y * 100 : 0;
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
                          color: nt.color
                        },
                        children: [nt.icon, " ", nt.label]
                      }), M("span", {
                        style: {
                          fontSize: "14px",
                          fontWeight: 900,
                          color: nt.color,
                          fontVariantNumeric: "tabular-nums"
                        },
                        children: dt(nt.val)
                      })]
                    }), q("div", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        marginBottom: "4px"
                      },
                      children: [pt.toFixed(1), "%"]
                    }), M("div", {
                      style: {
                        height: "6px",
                        background: "var(--md-surface-2, rgba(0,0,0,.04))",
                        borderRadius: "99px",
                        overflow: "hidden"
                      },
                      children: M("div", {
                        style: {
                          width: `${pt}%`,
                          height: "100%",
                          background: nt.color,
                          borderRadius: "99px"
                        }
                      })
                    })]
                  }, nt.label)
                }), ot > 0 && q("div", {
                  style: {
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: ["\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38: ", dt(ot), " \u0E23\u0E32\u0E22"]
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
              children: ["Total \u0E17\u0E35\u0E48\u0E40\u0E04\u0E22\u0E21\u0E32\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", dt(at.total_patients_ever), " \u0E23\u0E32\u0E22"]
            })]
          }), M("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px"
            },
            children: [{
              label: "\u0E02\u0E32\u0E14 3-6 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: at.inactive_3_6mo,
              color: "#d97706",
              hint: "\u0E43\u0E01\u0E25\u0E49\u0E40\u0E02\u0E49\u0E32\u0E19\u0E31\u0E14 \xB7 proactive call"
            }, {
              label: "\u0E02\u0E32\u0E14 6-12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: at.inactive_6_12mo,
              color: "#dc2626",
              hint: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35 \xB7 NCD/chronic risk"
            }, {
              label: "\u0E02\u0E32\u0E14 >12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
              val: at.inactive_12mo_plus,
              color: "#7c3aed",
              hint: "\u0E23\u0E2D\u0E1A recall \u0E43\u0E2B\u0E0D\u0E48 \xB7 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E2B\u0E32\u0E22\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27"
            }].map(nt => q("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: `${nt.color}08`,
                border: `1px solid ${nt.color}25`
              },
              children: [M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 700,
                  color: nt.color,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  marginBottom: "4px"
                },
                children: nt.label
              }), M("div", {
                style: {
                  fontSize: "22px",
                  fontWeight: 900,
                  color: nt.color,
                  fontVariantNumeric: "tabular-nums"
                },
                children: dt(nt.val)
              }), M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-secondary)",
                  marginTop: "4px"
                },
                children: nt.hint
              })]
            }, nt.label))
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
          }].map(nt => q("div", {
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
                background: `linear-gradient(135deg, ${nt.accent}08, transparent)`
              },
              children: [M("div", {
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                  color: nt.accent
                },
                children: nt.title
              }), M("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: nt.hint
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
                  children: [(nt.list || []).map((pt, ht) => q("tr", {
                    style: {
                      background: ht % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                    },
                    children: [M("td", {
                      style: {
                        ...V.td,
                        textAlign: "center",
                        color: "var(--md-text-tertiary)"
                      },
                      children: ht + 1
                    }), q("td", {
                      style: V.tdName,
                      children: [M("div", {
                        style: {
                          fontFamily: "monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "var(--md-text-tertiary)"
                        },
                        children: pt.hn
                      }), M("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: 700
                        },
                        children: pt.pt_name || "\u2014"
                      })]
                    }), M("td", {
                      style: V.td,
                      children: pt.age || "\u2014"
                    }), M("td", {
                      style: {
                        ...V.td,
                        fontWeight: 800,
                        color: nt.accent
                      },
                      children: dt(pt.visit_count)
                    }), M("td", {
                      style: {
                        ...V.td,
                        fontWeight: 800
                      },
                      children: dt(pt.total_income)
                    }), M("td", {
                      style: {
                        ...V.td,
                        textAlign: "left",
                        fontSize: "10px",
                        color: "var(--md-text-secondary)"
                      },
                      children: lt(pt.last_visit)
                    })]
                  }, pt.hn)), (!nt.list || nt.list.length === 0) && M("tr", {
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
          }, nt.title))
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
      let R = s.payers || [],
        rt = s.grand_total || {},
        at = rt.total_outstanding || 0;
      return q(La, {
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
            children: [wl.map((mt, yt) => {
              let Dt = rt[mt] || 0,
                Y = at > 0 ? Dt / at * 100 : 0;
              return q("div", {
                style: {
                  padding: "12px",
                  borderRadius: "10px",
                  background: `${$i[yt]}10`,
                  borderLeft: `4px solid ${$i[yt]}`
                },
                children: [M("div", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 800,
                    color: $i[yt],
                    textTransform: "uppercase",
                    letterSpacing: ".04em"
                  },
                  children: Ol[yt]
                }), M("div", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    fontFamily: "monospace",
                    marginTop: "4px"
                  },
                  children: dt(Dt)
                }), q("div", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: $i[yt],
                    marginTop: "2px"
                  },
                  children: [Y.toFixed(1), "%"]
                })]
              }, mt)
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
                children: dt(at)
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
            children: [R.map((mt, yt) => {
              let Dt = wl.map((Y, ot) => ({
                v: mt[Y] || 0,
                color: $i[ot],
                label: Ol[ot]
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
                    onClick: () => $(mt),
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
                      children: mt.pttype_code
                    }), M("span", {
                      style: {
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--md-text-secondary)",
                        marginLeft: "6px"
                      },
                      children: mt.pttype_name
                    })]
                  }), q("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 900,
                      fontFamily: "monospace",
                      color: "var(--md-text-primary)"
                    },
                    children: [dt(mt.total_outstanding), " \u0E1A\u0E32\u0E17"]
                  })]
                }), M("div", {
                  style: {
                    display: "flex",
                    height: "24px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "var(--md-surface-2, rgba(0,0,0,.04))"
                  },
                  children: Dt.map((Y, ot) => {
                    if (Y.v === 0) return null;
                    let lt = mt.total_outstanding > 0 ? Y.v / mt.total_outstanding * 100 : 0;
                    return M("div", {
                      style: {
                        width: `${lt}%`,
                        background: Y.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                      },
                      title: `${Y.label}: ${dt(Y.v)} \u0E1A\u0E32\u0E17 (${lt.toFixed(1)}%)`,
                      children: lt >= 8 && q("span", {
                        style: {
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#fff",
                          textShadow: "0 0 3px rgba(0,0,0,.3)"
                        },
                        children: [lt.toFixed(0), "%"]
                      })
                    }, ot)
                  })
                })]
              }, mt.pttype_code)
            }), R.length === 0 && M("div", {
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
          children: Ol.map((mt, yt) => q("div", {
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
                background: $i[yt]
              }
            }), M("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--md-text-secondary)"
              },
              children: mt
            })]
          }, mt))
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
      onClick: St,
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
        onClick: R => R.stopPropagation(),
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
              onChange: R => b(R.target.value),
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
              onClick: St,
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
              children: H.patients.map((R, rt) => q("tr", {
                style: {
                  background: rt % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [M("td", {
                  style: {
                    ...V.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: rt + 1
                }), q("td", {
                  style: V.tdName,
                  children: [M("div", {
                    style: {
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: R.hn
                  }), M("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700
                    },
                    children: R.pt_name || "\u2014"
                  })]
                }), M("td", {
                  style: V.td,
                  children: R.age || "\u2014"
                }), M("td", {
                  style: V.td,
                  children: dt(R.visit_count)
                }), M("td", {
                  style: {
                    ...V.td,
                    fontWeight: 800
                  },
                  children: dt(R.total_income)
                }), M("td", {
                  style: {
                    ...V.td,
                    fontWeight: 800,
                    color: R.total_outstanding > 0 ? "#dc2626" : "inherit"
                  },
                  children: dt(R.total_outstanding)
                }), M("td", {
                  style: {
                    ...V.td,
                    fontWeight: 800,
                    color: R.collection_rate >= 90 ? "#059669" : R.collection_rate >= 80 ? "#d97706" : "#dc2626"
                  },
                  children: Na(R.collection_rate)
                }), M("td", {
                  style: {
                    ...V.td,
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
    }), M(Nd, {
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
var Xot = wn.memo(s4);
export {
  Xot as
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